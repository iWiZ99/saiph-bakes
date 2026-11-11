/* ==========================================================================
   SAiPH Bakes — Client state
   Cart, wishlist, recently viewed, saved addresses, orders, account session
   and abandoned-cart nudging. Persisted to localStorage, event-driven so any
   component can subscribe without polling.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = (global.SAIPH = global.SAIPH || {});
  var KEY = "saiph.state.v1";

  var listeners = {};

  function emit(name, payload) {
    (listeners[name] || []).forEach(function (fn) {
      try { fn(payload); } catch (e) { /* a bad listener must not break the app */ }
    });
    (listeners["*"] || []).forEach(function (fn) {
      try { fn({ type: name, payload: payload }); } catch (e) {}
    });
  }

  function on(name, fn) {
    (listeners[name] = listeners[name] || []).push(fn);
    return function off() {
      listeners[name] = listeners[name].filter(function (f) { return f !== fn; });
    };
  }

  var blank = {
    cart: [],
    wishlist: [],
    recent: [],
    coupon: null,
    orders: [],
    addresses: [],
    account: null,
    lastTouch: null,
    nudged: false,
    subscriptions: []
  };

  function read() {
    try {
      var raw = global.localStorage.getItem(KEY);
      if (!raw) return JSON.parse(JSON.stringify(blank));
      var parsed = JSON.parse(raw);
      Object.keys(blank).forEach(function (k) {
        if (!(k in parsed)) parsed[k] = JSON.parse(JSON.stringify(blank[k]));
      });
      return parsed;
    } catch (e) {
      return JSON.parse(JSON.stringify(blank));
    }
  }

  var state = read();

  function persist() {
    state.lastTouch = Date.now();
    try { global.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* Keep tabs in sync — a cart edited in one tab updates the header in another. */
  global.addEventListener("storage", function (e) {
    if (e.key !== KEY) return;
    state = read();
    emit("cart:change", state.cart);
    emit("wishlist:change", state.wishlist);
    emit("sync", state);
  });

  /* --------------------------------- Cart ------------------------------- */
  function lineKey(item) {
    return [item.id, item.variant || "", item.flavour || "", item.message || "", (item.addons || []).join("|"), item.eggless ? "e" : ""].join("::");
  }

  function resolve(id) {
    return (SAIPH.query && SAIPH.query.byId(id)) || null;
  }

  function priceOf(item) {
    var p = resolve(item.id);
    if (!p) return item.price || 0;
    var v = p.variants.filter(function (x) { return x.id === item.variant; })[0] || p.variants[0];
    var total = v.price;
    var addons = SAIPH.data && SAIPH.data.cakeAddons ? SAIPH.data.cakeAddons : [];
    (item.addons || []).forEach(function (a) {
      var rec = addons.filter(function (x) { return x.id === a; })[0];
      if (rec) total += rec.price;
    });
    if (item.eggless) total += 0;
    return total;
  }

  var cart = {
    all: function () { return state.cart.slice(); },
    count: function () {
      return state.cart.reduce(function (n, i) { return n + i.qty; }, 0);
    },
    lines: function () { return state.cart.length; },
    add: function (item, opts) {
      opts = opts || {};
      var entry = {
        id: item.id,
        variant: item.variant || (resolve(item.id) ? resolve(item.id).variants[0].id : "std"),
        flavour: item.flavour || null,
        message: item.message || null,
        addons: item.addons || [],
        eggless: !!item.eggless,
        note: item.note || null,
        qty: Math.max(1, item.qty || 1),
        custom: item.custom || null,
        addedAt: Date.now()
      };
      var key = lineKey(entry);
      var existing = state.cart.filter(function (l) { return lineKey(l) === key; })[0];
      if (existing && !opts.forceNew) existing.qty += entry.qty;
      else state.cart.push(entry);
      state.nudged = false;
      persist();
      emit("cart:add", entry);
      emit("cart:change", state.cart);
      return entry;
    },
    update: function (index, patch) {
      var line = state.cart[index];
      if (!line) return;
      Object.keys(patch).forEach(function (k) { line[k] = patch[k]; });
      if (line.qty < 1) return cart.remove(index);
      persist();
      emit("cart:change", state.cart);
    },
    setQty: function (index, qty) {
      cart.update(index, { qty: Math.max(0, qty) });
    },
    remove: function (index) {
      var removed = state.cart.splice(index, 1)[0];
      persist();
      emit("cart:remove", removed);
      emit("cart:change", state.cart);
      return removed;
    },
    clear: function () {
      state.cart = [];
      state.coupon = null;
      persist();
      emit("cart:change", state.cart);
    },
    detail: function () {
      return state.cart.map(function (line, index) {
        var p = resolve(line.id);
        var unit = priceOf(line);
        var v = p ? (p.variants.filter(function (x) { return x.id === line.variant; })[0] || p.variants[0]) : null;
        return {
          index: index,
          line: line,
          product: p,
          variant: v,
          unit: unit,
          total: unit * line.qty
        };
      });
    },
    /* Cake-studio builds arrive here as a synthetic product line. */
    addCustomCake: function (build) {
      var entry = {
        id: build.baseId || "chocolate-truffle-cake",
        variant: build.variant,
        flavour: build.flavour,
        message: build.message,
        addons: build.addons || [],
        eggless: !!build.eggless,
        qty: 1,
        custom: {
          occasion: build.occasion,
          date: build.date,
          slot: build.slot,
          reference: build.reference || null,
          instructions: build.instructions || null
        },
        addedAt: Date.now()
      };
      state.cart.push(entry);
      persist();
      emit("cart:add", entry);
      emit("cart:change", state.cart);
      return entry;
    }
  };

  /* -------------------------------- Totals ------------------------------ */
  function totals(opts) {
    opts = opts || {};
    var detail = cart.detail();
    var subtotal = detail.reduce(function (n, d) { return n + d.total; }, 0);
    var co = state.coupon ? SAIPH.query.couponByCode(state.coupon) : null;
    var discount = 0;
    var freeShip = false;

    if (co && subtotal >= (co.min || 0)) {
      var eligible = subtotal;
      if (co.brand) {
        eligible = detail
          .filter(function (d) { return d.product && d.product.brand === co.brand; })
          .reduce(function (n, d) { return n + d.total; }, 0);
      }
      if (co.type === "percent") discount = Math.min(Math.round(eligible * co.value / 100), co.cap || Infinity);
      else if (co.type === "flat") discount = Math.min(co.value, eligible);
      else if (co.type === "shipping") freeShip = true;
    }

    var company = SAIPH.data.company;
    var afterDiscount = Math.max(0, subtotal - discount);
    var shipping = 0;
    if (subtotal > 0 && opts.mode !== "pickup") {
      shipping = freeShip || afterDiscount >= company.freeShipThreshold ? 0 : company.shippingFlat;
    }
    var slotFee = opts.slot === "midnight" ? 199 : 0;
    var packaging = subtotal > 0 ? 0 : 0;
    var grand = afterDiscount + shipping + slotFee + packaging;

    return {
      count: cart.count(),
      subtotal: subtotal,
      discount: discount,
      coupon: co,
      couponApplied: !!(co && subtotal >= (co.min || 0)),
      shipping: shipping,
      slotFee: slotFee,
      freeShipRemaining: Math.max(0, company.freeShipThreshold - afterDiscount),
      freeShipProgress: Math.min(100, Math.round((afterDiscount / company.freeShipThreshold) * 100)),
      grand: grand
    };
  }

  /* ------------------------------- Coupon ------------------------------- */
  var coupon = {
    get: function () { return state.coupon; },
    apply: function (code) {
      var rec = SAIPH.query.couponByCode(code);
      if (!rec) return { ok: false, reason: "That code is not recognised." };
      var sub = cart.detail().reduce(function (n, d) { return n + d.total; }, 0);
      if (sub < (rec.min || 0)) {
        return { ok: false, reason: "Add " + SAIPH.util.money((rec.min || 0) - sub) + " more to use " + rec.code + "." };
      }
      if (rec.brand) {
        var has = cart.detail().some(function (d) { return d.product && d.product.brand === rec.brand; });
        if (!has) return { ok: false, reason: rec.code + " applies to " + SAIPH.query.brandById(rec.brand).name + " products only." };
      }
      state.coupon = rec.code;
      persist();
      emit("cart:change", state.cart);
      return { ok: true, coupon: rec };
    },
    clear: function () {
      state.coupon = null;
      persist();
      emit("cart:change", state.cart);
    }
  };

  /* ------------------------------ Wishlist ------------------------------ */
  var wishlist = {
    all: function () { return state.wishlist.slice(); },
    count: function () { return state.wishlist.length; },
    has: function (id) { return state.wishlist.indexOf(id) > -1; },
    toggle: function (id) {
      var i = state.wishlist.indexOf(id);
      var added = i === -1;
      if (added) state.wishlist.unshift(id);
      else state.wishlist.splice(i, 1);
      persist();
      emit("wishlist:change", state.wishlist);
      emit(added ? "wishlist:add" : "wishlist:remove", id);
      return added;
    },
    remove: function (id) {
      state.wishlist = state.wishlist.filter(function (x) { return x !== id; });
      persist();
      emit("wishlist:change", state.wishlist);
    },
    clear: function () {
      state.wishlist = [];
      persist();
      emit("wishlist:change", state.wishlist);
    }
  };

  /* --------------------------- Recently viewed -------------------------- */
  var recent = {
    all: function () { return state.recent.slice(); },
    push: function (id) {
      state.recent = [id].concat(state.recent.filter(function (x) { return x !== id; })).slice(0, 14);
      persist();
      emit("recent:change", state.recent);
    },
    products: function (excludeId) {
      return state.recent
        .filter(function (id) { return id !== excludeId; })
        .map(function (id) { return SAIPH.query.byId(id); })
        .filter(Boolean);
    }
  };

  /* ------------------------------- Orders ------------------------------- */
  function orderId() {
    var n = 24080 + state.orders.length + 1;
    return "SB-" + n;
  }

  var orders = {
    all: function () { return state.orders.slice(); },
    latest: function () { return state.orders[0] || null; },
    byId: function (id) {
      return state.orders.filter(function (o) { return o.id === id; })[0] || null;
    },
    place: function (payload) {
      var t = totals({ mode: payload.mode, slot: payload.slot });
      var order = {
        id: orderId(),
        placedAt: Date.now(),
        items: cart.detail().map(function (d) {
          return {
            id: d.line.id,
            name: d.product ? d.product.name : d.line.id,
            brand: d.product ? d.product.brandName : "",
            variant: d.variant ? d.variant.label : "",
            flavour: d.line.flavour,
            message: d.line.message,
            addons: d.line.addons,
            eggless: d.line.eggless,
            qty: d.line.qty,
            unit: d.unit,
            total: d.total,
            custom: d.line.custom || null
          };
        }),
        totals: t,
        mode: payload.mode,
        store: payload.store || null,
        address: payload.address || null,
        date: payload.date,
        slot: payload.slot,
        slotLabel: payload.slotLabel,
        instructions: payload.instructions || "",
        contact: payload.contact,
        payment: payload.payment,
        gstin: payload.gstin || "",
        status: "placed",
        timeline: [
          { key: "placed", title: "Order confirmed", note: "Payment received and sent to the kitchen.", done: true },
          { key: "baking", title: "In production", note: "Your order is being made fresh.", done: false },
          { key: "quality", title: "Quality check & packing", note: "Chef sign-off, then boxed with care.", done: false },
          { key: "out", title: payload.mode === "pickup" ? "Ready for pickup" : "Out for delivery", note: payload.mode === "pickup" ? "Collect from your chosen store." : "Rider will call before arriving.", done: false },
          { key: "done", title: payload.mode === "pickup" ? "Collected" : "Delivered", note: "We hope it was worth celebrating.", done: false }
        ]
      };
      state.orders.unshift(order);
      cart.clear();
      persist();
      emit("order:placed", order);
      return order;
    },
    /* Demo helper: advances a placed order so tracking has something to show. */
    advance: function (id) {
      var o = orders.byId(id);
      if (!o) return null;
      var next = o.timeline.filter(function (n) { return !n.done; })[0];
      if (!next) return o;
      next.done = true;
      next.at = Date.now();
      o.status = next.key === "done" ? "delivered" : next.key;
      persist();
      emit("order:update", o);
      return o;
    },
    setStatus: function (id, status, note) {
      var o = orders.byId(id);
      if (!o) return null;
      o.status = status;
      var stageOrder = ["placed", "baking", "quality", "out", "done", "delivered"];
      var targetIdx = stageOrder.indexOf(status === "delivered" ? "done" : status);
      if (targetIdx > -1 && o.timeline) {
        o.timeline.forEach(function (n, idx) {
          if (idx <= targetIdx) {
            n.done = true;
            n.at = n.at || Date.now();
            if (idx === targetIdx && note) n.note = note;
          } else {
            n.done = false;
          }
        });
      }
      if (status === "cancelled") {
        o.cancelledAt = Date.now();
        o.cancelReason = note || "Cancelled by store team";
      }
      persist();
      emit("order:update", o);
      return o;
    },
    addManual: function (order) {
      state.orders.unshift(order);
      persist();
      emit("order:placed", order);
      return order;
    }
  };

  /* ------------------------------ Addresses ----------------------------- */
  var addresses = {
    all: function () { return state.addresses.slice(); },
    save: function (addr) {
      var existing = state.addresses.filter(function (a) { return a.id === addr.id; })[0];
      if (existing) Object.keys(addr).forEach(function (k) { existing[k] = addr[k]; });
      else {
        addr.id = addr.id || "addr-" + Date.now();
        state.addresses.unshift(addr);
      }
      persist();
      emit("address:change", state.addresses);
      return addr;
    },
    remove: function (id) {
      state.addresses = state.addresses.filter(function (a) { return a.id !== id; });
      persist();
      emit("address:change", state.addresses);
    },
    primary: function () { return state.addresses[0] || null; }
  };

  /* ------------------------------- Account ------------------------------ */
  var account = {
    get: function () { return state.account; },
    signedIn: function () { return !!state.account; },
    signIn: function (profile) {
      state.account = {
        name: profile.name || "Guest",
        email: profile.email || "",
        phone: profile.phone || "",
        since: state.account && state.account.since ? state.account.since : Date.now(),
        tier: "Connoisseur",
        points: (state.account && state.account.points) || 1240
      };
      persist();
      emit("account:change", state.account);
      return state.account;
    },
    signOut: function () {
      state.account = null;
      persist();
      emit("account:change", null);
    }
  };

  /* ---------------------------- Subscriptions --------------------------- */
  var subscriptions = {
    all: function () { return state.subscriptions.slice(); },
    add: function (sub) {
      sub.id = "sub-" + Date.now();
      sub.active = true;
      state.subscriptions.unshift(sub);
      persist();
      emit("subscription:change", state.subscriptions);
      return sub;
    },
    toggle: function (id) {
      var s = state.subscriptions.filter(function (x) { return x.id === id; })[0];
      if (s) { s.active = !s.active; persist(); emit("subscription:change", state.subscriptions); }
    },
    remove: function (id) {
      state.subscriptions = state.subscriptions.filter(function (x) { return x.id !== id; });
      persist();
      emit("subscription:change", state.subscriptions);
    }
  };

  /* -------------------------- Abandoned cart ---------------------------- */
  /* One gentle nudge per session if a filled cart goes quiet, plus a
     beforeunload marker a real backend would pick up for email recovery. */
  function watchAbandonment(onNudge) {
    var timer = null;
    function arm() {
      clearTimeout(timer);
      if (!cart.count() || state.nudged) return;
      timer = setTimeout(function () {
        if (!cart.count() || state.nudged) return;
        state.nudged = true;
        persist();
        onNudge(totals());
      }, 45000);
    }
    on("cart:change", arm);
    ["mousemove", "keydown", "scroll", "touchstart"].forEach(function (ev) {
      global.addEventListener(ev, arm, { passive: true, once: false });
    });
    arm();

    global.addEventListener("beforeunload", function () {
      if (!cart.count()) return;
      try {
        global.localStorage.setItem("saiph.abandoned", JSON.stringify({
          at: Date.now(),
          count: cart.count(),
          value: totals().grand,
          items: state.cart.map(function (l) { return l.id; })
        }));
      } catch (e) {}
    });
  }

  function abandonedSnapshot() {
    try { return JSON.parse(global.localStorage.getItem("saiph.abandoned") || "null"); }
    catch (e) { return null; }
  }

  SAIPH.store = {
    on: on,
    emit: emit,
    cart: cart,
    coupon: coupon,
    wishlist: wishlist,
    recent: recent,
    orders: orders,
    addresses: addresses,
    account: account,
    subscriptions: subscriptions,
    totals: totals,
    priceOf: priceOf,
    watchAbandonment: watchAbandonment,
    abandonedSnapshot: abandonedSnapshot,
    reset: function () {
      state = JSON.parse(JSON.stringify(blank));
      persist();
      emit("cart:change", state.cart);
      emit("wishlist:change", state.wishlist);
    },
    raw: function () { return state; }
  };
})(typeof window !== "undefined" ? window : this);

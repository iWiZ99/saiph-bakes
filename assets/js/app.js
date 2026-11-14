/* ==========================================================================
   SAiPH Bakes — App shell
   Header behaviour, search, cart drawer, wishlist, quick view/add, mobile nav,
   forms and the page dispatcher.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  var doc = global.document;
  var ui = SAIPH.ui;
  var store = SAIPH.store;
  var util = SAIPH.util;
  var data = SAIPH.data;
  var query = SAIPH.query;

  doc.documentElement.classList.remove("no-js");

  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }

  /* =========================== Sticky header ============================ */
  function initHeader() {
    var header = $("[data-header]");
    if (!header) return;
    var last = 0;
    function onScroll() {
      var y = global.scrollY;
      header.classList.toggle("is-stuck", y > 12);
      last = y;
    }
    global.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mark the current nav item so the underline persists on inner pages. */
    var here = global.location.pathname.split("/").pop() || "index.html";
    $$("[data-nav-match]", header).forEach(function (item) {
      var list = item.dataset.navMatch.split(",");
      if (list.indexOf(here) > -1) item.classList.add("is-current");
    });
    $$(".bottom-nav__item").forEach(function (a) {
      var match = (a.dataset.navMatch || "").split(",");
      if (match.indexOf(here) > -1) a.classList.add("is-current");
    });
  }

  /* ============================ Counter pips ============================ */
  function paintCounts(bump) {
    var cartN = store.cart.count();
    var wishN = store.wishlist.count();
    $$("[data-cart-count]").forEach(function (el) {
      el.textContent = cartN;
      el.classList.toggle("is-visible", cartN > 0);
      if (bump === "cart" && cartN > 0) {
        el.classList.remove("is-bump");
        void el.offsetWidth;
        el.classList.add("is-bump");
      }
    });
    $$("[data-wish-count]").forEach(function (el) {
      el.textContent = wishN;
      el.classList.toggle("is-visible", wishN > 0);
    });
    $$("[data-wish]").forEach(function (btn) {
      var on = store.wishlist.has(btn.dataset.wish);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute("aria-label", (on ? "Remove from" : "Add to") + " wishlist");
    });
  }

  /* ============================ Cart drawer ============================= */
  function cartLineHTML(d) {
    var p = d.product;
    if (!p) return "";
    var attrs = [];
    if (d.variant && d.variant.label && d.variant.label !== "Standard") attrs.push(["Size", d.variant.label]);
    if (d.line.flavour) attrs.push(["Flavour", d.line.flavour]);
    if (d.line.eggless) attrs.push(["Base", "Eggless"]);
    if (d.line.message) attrs.push(["Message", '"' + d.line.message + '"']);
    if (d.line.custom && d.line.custom.occasion) attrs.push(["Occasion", d.line.custom.occasion]);
    if (d.line.addons && d.line.addons.length) {
      attrs.push(["Add-ons", d.line.addons.map(function (a) {
        var rec = data.cakeAddons.filter(function (x) { return x.id === a; })[0];
        return rec ? rec.name : a;
      }).join(", ")]);
    }

    return '<div class="line-item" data-line="' + d.index + '">' +
      '<a class="line-item__media" href="' + p.url + '">' + ui.media(p, { ratio: "square" }) + "</a>" +
      "<div>" +
        '<a href="' + p.url + '"><span class="line-item__title">' + util.esc(p.name) + "</span></a>" +
        '<div class="product-card__brand"><span class="brandname">' + util.esc(p.brandName) + "</span></div>" +
        (attrs.length ? '<dl class="line-item__attrs">' + attrs.map(function (a) {
          return "<div><dt>" + util.esc(a[0]) + ":</dt> <dd>" + util.esc(a[1]) + "</dd></div>";
        }).join("") + "</dl>" : "") +
        '<div class="row row--between" style="margin-top:.6rem">' +
          '<div class="stepper">' +
            '<button type="button" data-qty="-1" aria-label="Reduce quantity">' + ui.icon("minus") + "</button>" +
            '<input type="number" value="' + d.line.qty + '" min="1" max="30" aria-label="Quantity" data-qty-input>' +
            '<button type="button" data-qty="1" aria-label="Increase quantity">' + ui.icon("plus") + "</button>" +
          "</div>" +
          '<button class="link" type="button" data-line-remove style="font-size:.6rem">Remove</button>' +
        "</div>" +
      "</div>" +
      '<div class="line-item__price">' + util.money(d.total) +
        (d.line.qty > 1 ? '<br><small class="faint" style="font-weight:400">' + util.money(d.unit) + " each</small>" : "") +
      "</div>" +
    "</div>";
  }

  function renderCartDrawer() {
    var body = $("[data-cart-body]");
    var foot = $("[data-cart-foot]");
    var titleN = $("[data-cart-title-count]");
    if (!body) return;

    var detail = store.cart.detail();
    var t = store.totals();
    if (titleN) titleN.textContent = t.count ? t.count + (t.count === 1 ? " item" : " items") : "";

    if (!detail.length) {
      body.innerHTML =
        '<div class="cart-empty">' +
          '<span class="cart-empty__glyph">' + ui.icon("bag") + "</span>" +
          "<h4>Your cart is waiting</h4>" +
          '<p class="muted" style="font-size:var(--fs-sm);max-width:24ch">Nothing in here yet. Start with a bestseller or build a cake from scratch.</p>' +
          '<a class="btn btn--sm" href="shop.html">Shop bestsellers</a>' +
          '<a class="link" href="cakes.html">Create your cake ' + ui.icon("arrowRight") + "</a>" +
        "</div>";
      if (foot) foot.innerHTML = "";
      return;
    }

    body.innerHTML =
      (t.freeShipRemaining > 0
        ? '<div class="freeship"><div class="row row--between"><span>Add <b>' + util.money(t.freeShipRemaining) +
          "</b> for free delivery</span><b>" + t.freeShipProgress + '%</b></div>' +
          '<div class="freeship__track"><div class="freeship__fill" style="width:' + t.freeShipProgress + '%"></div></div></div>'
        : '<div class="freeship"><div class="row row--tight" style="color:var(--success)">' + ui.icon("truck") +
          "<b>Free delivery unlocked</b></div></div>") +
      detail.map(cartLineHTML).join("");

    if (foot) {
      foot.innerHTML =
        '<div class="cart-summary">' +
          '<div class="cart-summary__row"><span>Subtotal</span><b>' + util.money(t.subtotal) + "</b></div>" +
          (t.discount ? '<div class="cart-summary__row" style="color:var(--success)"><span>' +
            util.esc(t.coupon.code) + " applied</span><b>−" + util.money(t.discount) + "</b></div>" : "") +
          '<div class="cart-summary__row"><span>Delivery</span><b>' +
            (t.shipping ? util.money(t.shipping) : "Free") + "</b></div>" +
          '<div class="cart-summary__row cart-summary__row--total"><span>Total</span><b>' + util.money(t.grand) + "</b></div>" +
        "</div>" +
        '<a class="btn btn--accent btn--block" href="checkout.html">Proceed to checkout</a>' +
        '<a class="link" href="cart.html" style="justify-self:center">View full cart ' + ui.icon("arrowRight") + "</a>";
    }
  }

  function initCartDrawer() {
    var drawer = $("[data-cart-drawer]");
    if (!drawer) return;
    drawer.addEventListener("click", function (e) {
      var lineEl = e.target.closest("[data-line]");
      var index = lineEl ? parseInt(lineEl.dataset.line, 10) : -1;

      var qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn && index > -1) {
        var delta = parseInt(qtyBtn.dataset.qty, 10);
        var line = store.cart.all()[index];
        store.cart.setQty(index, line.qty + delta);
        return;
      }
      if (e.target.closest("[data-line-remove]") && index > -1) {
        var removed = store.cart.all()[index];
        var p = query.byId(removed.id);
        store.cart.remove(index);
        ui.toast({ title: "Removed from cart", note: p ? p.name : "", icon: "trash" });
        return;
      }
    });
    drawer.addEventListener("change", function (e) {
      var input = e.target.closest("[data-qty-input]");
      if (!input) return;
      var lineEl = input.closest("[data-line]");
      store.cart.setQty(parseInt(lineEl.dataset.line, 10), parseInt(input.value, 10) || 1);
    });
  }

  /* ============================== Search =============================== */
  function searchResultHTML(p) {
    return '<a class="search-result" href="' + p.url + '">' +
      ui.media(p, { ratio: "square" }) +
      "<span>" +
        '<span class="search-result__name">' + util.esc(p.name) + "</span><br>" +
        '<span class="search-result__meta"><span class="brandname">' + util.esc(p.brandName) + "</span> · " + util.esc(p.catNames[0] || "") + "</span>" +
      "</span>" +
      '<span class="search-result__price">' + util.money(p.price) + "</span>" +
    "</a>";
  }

  function initSearch() {
    var overlay = $("[data-search-overlay]");
    if (!overlay) return;
    var input = $("[data-search-input]", overlay);
    var out = $("[data-search-results]", overlay);
    var trending = ["Kunafa croissant", "Truffle cake", "Assam tea cookies", "Gold leaf cheesecake", "Gift hamper", "Sourdough"];

    function blank() {
      out.innerHTML =
        '<div class="stack stack--sm">' +
          '<span class="eyebrow eyebrow--muted">Trending searches</span>' +
          '<div class="row row--tight">' + trending.map(function (t) {
            return '<button class="chip" type="button" data-search-term="' + util.esc(t) + '">' + util.esc(t) + "</button>";
          }).join("") + "</div>" +
        "</div>" +
        '<div class="stack stack--sm" style="margin-top:1.5rem">' +
          '<span class="eyebrow eyebrow--muted">Most loved right now</span>' +
          query.byBadge("BESTSELLER").slice(0, 4).map(searchResultHTML).join("") +
        "</div>";
    }

    var run = util.debounce(function () {
      var term = input.value.trim();
      if (!term) return blank();
      var results = query.search(term, 8);
      if (!results.length) {
        out.innerHTML = '<div class="empty-state">' + ui.icon("search") +
          "<h4>No matches for &ldquo;" + util.esc(term) + "&rdquo;</h4>" +
          '<p class="muted" style="font-size:var(--fs-sm)">Try a brand, a flavour or an occasion.</p>' +
          '<a class="btn btn--sm btn--outline" href="shop.html">Browse everything</a></div>';
        return;
      }
      out.innerHTML =
        '<div class="stack stack--sm">' +
          '<span class="eyebrow eyebrow--muted">' + results.length + " result" + (results.length > 1 ? "s" : "") + "</span>" +
          results.map(searchResultHTML).join("") +
          '<a class="link" href="shop.html' + util.qs({ q: term }) + '" style="margin-top:.5rem">See all results for &ldquo;' +
            util.esc(term) + "&rdquo; " + ui.icon("arrowRight") + "</a>" +
        "</div>";
    }, 140);

    input.addEventListener("input", run);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = out.querySelector(".search-result");
        if (input.value.trim()) {
          global.location.href = "shop.html" + util.qs({ q: input.value.trim() });
        } else if (first) first.click();
      }
    });
    out.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-search-term]");
      if (!chip) return;
      input.value = chip.dataset.searchTerm;
      run();
      input.focus();
    });
    blank();
  }

  /* ============================= Quick view ============================= */
  function quickView(id) {
    var p = query.byId(id);
    if (!p) return;
    var v0 = p.variants[0];

    var html =
      '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr));gap:0">' +
        ui.media(p, { ratio: "square" }) +
        '<div class="stack" style="padding:clamp(1.25rem,1rem+1.5vw,2.25rem);align-content:start;gap:.9rem">' +
          '<div class="pdp__brandline">' + util.esc(p.brandFull) + "</div>" +
          "<h3>" + util.esc(p.name) + "</h3>" +
          '<div class="row row--tight">' + ui.rating(p.rating, p.reviews) + "</div>" +
          '<div class="pdp__price" data-qv-price>' + util.money(v0.price) +
            (v0.mrp ? "<del>" + util.money(v0.mrp) + "</del>" : "") + "</div>" +
          '<p class="muted" style="font-size:var(--fs-sm);line-height:1.6">' + util.esc(p.desc) + "</p>" +
          (p.nutrition
            ? '<div class="pdp__macro-bar" style="padding:.5rem .75rem;margin:.25rem 0">' +
                '<span class="macro-pill"><span class="macro-pill__val">' + p.nutrition.calories + '</span><span class="macro-pill__lbl">kcal</span></span>' +
                '<span class="macro-pill"><span class="macro-pill__val">' + p.nutrition.protein + 'g</span><span class="macro-pill__lbl">Protein</span></span>' +
                '<span class="macro-pill"><span class="macro-pill__val">' + p.nutrition.netCarbs + 'g</span><span class="macro-pill__lbl">Net Carbs</span></span>' +
                '<span class="macro-pill macro-pill--highlight"><span class="macro-pill__val">0g</span><span class="macro-pill__lbl">Sugar</span></span>' +
              '</div>'
            : "") +
          (p.ingredients
            ? '<p class="muted" style="font-size:var(--fs-xs);line-height:1.5"><strong>Ingredients:</strong> ' + util.esc(p.ingredients) + '</p>'
            : "") +
          (p.variants.length > 1
            ? '<div class="variant-row"><span class="variant-row__label">Size</span><div class="swatches" data-qv-variants>' +
              p.variants.map(function (v, i) {
                return '<label class="swatch"><input type="radio" name="qv-variant" value="' + v.id + '"' +
                  (i === 0 ? " checked" : "") + '>' + util.esc(v.label) +
                  (v.servings ? "<small>serves " + util.esc(v.servings) + "</small>" : "") + "</label>";
              }).join("") + "</div></div>"
            : "") +
          (p.flavours
            ? '<div class="field"><label class="field__label" for="qv-flavour">Flavour</label>' +
              '<select class="select" id="qv-flavour" data-qv-flavour>' +
              p.flavours.map(function (f) { return '<option value="' + util.esc(f) + '">' + util.esc(f) + "</option>"; }).join("") +
              "</select></div>"
            : "") +
          '<div class="note">' + ui.icon("clock") + "<span>" + util.esc(p.cutoff) + "</span></div>" +
          '<div class="row row--tight" style="margin-top:.35rem">' +
            '<button class="btn btn--accent" type="button" data-qv-add="' + p.id + '">Add to cart</button>' +
            '<a class="btn btn--outline" href="' + p.url + '">Full details</a>' +
          "</div>" +
        "</div>" +
      "</div>";

    var el = ui.modal(html, { brand: p.theme, label: "Quick view: " + p.name });

    function currentVariant() {
      var sel = el.querySelector('[name="qv-variant"]:checked');
      var id2 = sel ? sel.value : v0.id;
      return p.variants.filter(function (v) { return v.id === id2; })[0] || v0;
    }
    el.addEventListener("change", function (e) {
      if (e.target.name !== "qv-variant") return;
      var v = currentVariant();
      var priceEl = el.querySelector("[data-qv-price]");
      priceEl.innerHTML = util.money(v.price) + (v.mrp ? "<del>" + util.money(v.mrp) + "</del>" : "");
    });
    el.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-qv-add]");
      if (!btn) return;
      var flavourSel = el.querySelector("[data-qv-flavour]");
      store.cart.add({
        id: p.id,
        variant: currentVariant().id,
        flavour: flavourSel ? flavourSel.value : null,
        qty: 1
      });
      ui.closeOverlay(el);
      ui.toast({
        title: "Added to cart",
        note: p.name + " · " + currentVariant().label,
        product: p,
        action: { href: "checkout.html", label: "Checkout" }
      });
    });
  }

  /* ============================== Quick add ============================= */
  function quickAdd(id, sourceEl) {
    var p = query.byId(id);
    if (!p) return;
    /* Customisable cakes need choices — send those to quick view instead. */
    if (p.customisable && p.variants.length > 1) return quickView(id);
    store.cart.add({ id: p.id, variant: p.variants[0].id, qty: 1 });
    ui.flyToCart(sourceEl, p);
    ui.toast({
      title: "Added to cart",
      note: p.name,
      product: p,
      action: { href: "checkout.html", label: "Checkout" }
    });
  }

  /* ============================ Global clicks =========================== */
  function initGlobalHandlers() {
    doc.addEventListener("click", function (e) {
      var t = e.target;

      var openCart = t.closest("[data-cart-open]");
      if (openCart) { e.preventDefault(); ui.openOverlay($("[data-cart-drawer]")); return; }

      var openSearch = t.closest("[data-search-open]");
      if (openSearch) {
        e.preventDefault();
        ui.openOverlay($("[data-search-overlay]"), { scrim: false });
        return;
      }

      var openNav = t.closest("[data-nav-open]");
      if (openNav) {
        e.preventDefault();
        var nav = $("[data-mobile-nav]");
        openNav.setAttribute("aria-expanded", "true");
        ui.openOverlay(nav);
        return;
      }

      if (t.closest("[data-overlay-close]")) {
        e.preventDefault();
        var host = t.closest(".drawer, .modal, .search-overlay");
        ui.closeOverlay(host);
        $$("[data-nav-open]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
        return;
      }

      if (t.closest("[data-scrim]")) {
        ui.closeAllOverlays();
        $$("[data-nav-open]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
        return;
      }

      var wishBtn = t.closest("[data-wish]");
      if (wishBtn) {
        e.preventDefault();
        var pid = wishBtn.dataset.wish;
        var added = store.wishlist.toggle(pid);
        wishBtn.classList.remove("is-pop");
        void wishBtn.offsetWidth;
        wishBtn.classList.add("is-pop");
        var prod = query.byId(pid);
        ui.toast({
          title: added ? "Saved to wishlist" : "Removed from wishlist",
          note: prod ? prod.name : "",
          icon: "heart",
          action: added ? { href: "wishlist.html", label: "View" } : null
        });
        return;
      }

      var qa = t.closest("[data-quickadd]");
      if (qa) { e.preventDefault(); quickAdd(qa.dataset.quickadd, qa); return; }

      var qv = t.closest("[data-quickview]");
      if (qv) { e.preventDefault(); quickView(qv.dataset.quickview); return; }

      var scrollTo = t.closest("[data-scroll-to]");
      if (scrollTo) {
        var target = $(scrollTo.dataset.scrollTo);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
        return;
      }
    });

    /* Announcement bar rotation keeps the promise line and offers visible. */
    var track = $("[data-announce-rotate]");
    if (track) {
      var lines = [
        "<b>Freshly Crafted</b> <span class='announce__dot'>•</span> Premium Ingredients <span class='announce__dot'>•</span> Delivered With Care",
        "Free delivery above <b>₹999</b> <span class='announce__dot'>•</span> Same-day slots in Dibrugarh",
        "Use <b>FIRSTBITE</b> for 15% off your first order",
        "Midnight birthday delivery <span class='announce__dot'>•</span> Dibrugarh"
      ];
      var i = 0;
      setInterval(function () {
        i = (i + 1) % lines.length;
        track.style.opacity = "0";
        setTimeout(function () {
          track.innerHTML = lines[i];
          track.style.opacity = "1";
        }, 260);
      }, 5200);
      track.style.transition = "opacity 260ms var(--ease)";
    }
  }

  /* ================================ Forms =============================== */
  function initForms() {
    $$("[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true;
        $$("[required]", form).forEach(function (input) {
          var field = input.closest(".field") || input.parentElement;
          var valid = input.type === "checkbox" ? input.checked : String(input.value).trim().length > 0;
          if (valid && input.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value);
          if (valid && input.dataset.pattern) valid = new RegExp(input.dataset.pattern).test(input.value);
          if (!valid) ok = false;
          if (field.classList) field.classList.toggle("has-error", !valid);
        });
        if (!ok) {
          ui.toast({ title: "Check the highlighted fields", variant: "error", icon: "alert" });
          var firstBad = $(".has-error input, .has-error select, .has-error textarea", form);
          if (firstBad) firstBad.focus();
          return;
        }

        var btn = $('[type="submit"]', form);
        if (btn) btn.classList.add("btn--loading");

        /* Front-end demo: no backend attached. Swap this timeout for a fetch()
           to your order/enquiry endpoint — the success handling stays the same. */
        setTimeout(function () {
          if (btn) btn.classList.remove("btn--loading");
          var kind = form.dataset.form;
          var success = form.dataset.success;
          if (success) {
            var panel = $(success);
            if (panel) {
              form.hidden = true;
              panel.hidden = false;
              panel.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }

          /* Persist enquiry / review into local admin store */
          try {
            if (global.localStorage) {
              if (kind === "review") {
                var pId = (global.location.search || "").replace("?id=", "").split("&")[0] || "chocolate-truffle-cake";
                var rName = (form.querySelector('[name="name"], #rv-name') || {}).value || "Valued Customer";
                var rTitle = (form.querySelector('[name="title"], #rv-title') || {}).value || "Delicious bake";
                var rBody = (form.querySelector('[name="body"], #rv-body, textarea') || {}).value || "";
                var rRating = parseInt((form.querySelector('[name="rating"]:checked, #rv-rating') || {}).value || "5", 10);
                var newRev = {
                  product: pId,
                  name: rName,
                  city: "Dibrugarh",
                  rating: rRating,
                  title: rTitle,
                  comment: rBody,
                  date: new Date().toISOString().slice(0, 10),
                  verified: true,
                  status: "pending"
                };
                var existingRevs = JSON.parse(global.localStorage.getItem("saiph.admin_pending_reviews.v1") || "[]");
                existingRevs.unshift(newRev);
                global.localStorage.setItem("saiph.admin_pending_reviews.v1", JSON.stringify(existingRevs));
              } else if (kind !== "newsletter") {
                var who = (form.querySelector('[name="name"], #name, [id*="name"]') || {}).value || "Partner";
                var email = (form.querySelector('[name="email"], #email, [type="email"]') || {}).value || "";
                var phone = (form.querySelector('[name="phone"], #phone, [type="tel"]') || {}).value || "";
                var city = (form.querySelector('[name="city"], #city, select') || {}).value || "Dibrugarh";
                var detail = (form.querySelector('textarea, [name="message"], #message, [name="requirement"]') || {}).value || (kind + " enquiry");
                var enqType = kind === "franchise" ? "Franchise" : kind === "corporate" ? "Corporate" : kind === "wholesale" ? "Wholesale" : "General";
                var newEnq = {
                  id: "ENQ-" + Date.now().toString(36).toUpperCase(),
                  type: enqType,
                  who: who,
                  email: email,
                  phone: phone,
                  city: city,
                  detail: detail,
                  when: "Just now",
                  status: "New",
                  receivedAt: Date.now()
                };
                var existingEnqs = JSON.parse(global.localStorage.getItem("saiph.admin_enquiries.v1") || "[]");
                existingEnqs.unshift(newEnq);
                global.localStorage.setItem("saiph.admin_enquiries.v1", JSON.stringify(existingEnqs));
              }
            }
          } catch (e) {}

          if (kind === "newsletter") {
            var nEmail = (form.querySelector('[name="email"], #email, [type="email"]') || {}).value || "";
            if (nEmail && typeof fetch === "function") {
              fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: nEmail })
              }).catch(function () {});
            }
            ui.toast({ title: "Welcome to the list", note: "Your 10% welcome code is on its way.", variant: "success" });
            form.reset();
          } else if (kind === "review") {
            ui.toast({ title: "Review submitted", note: "Thank you — it appears after moderation in Admin.", variant: "success" });
            form.reset();
          } else {
            var eWho = (form.querySelector('[name="name"], #name, [id*="name"]') || {}).value || "Customer";
            var eEmail = (form.querySelector('[name="email"], #email, [type="email"]') || {}).value || "";
            var ePhone = (form.querySelector('[name="phone"], #phone, [type="tel"]') || {}).value || "";
            var eMsg = (form.querySelector('textarea, [name="message"], #message, [name="requirement"]') || {}).value || (kind + " inquiry");
            if (eEmail && typeof fetch === "function") {
              fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: eWho,
                  email: eEmail,
                  phone: ePhone,
                  subject: kind + " inquiry",
                  type: kind,
                  message: eMsg
                })
              }).catch(function () {});
            }
            ui.toast({
              title: "Enquiry received",
              note: "Our team replies within one working day. Tracked in Admin.",
              variant: "success"
            });
            if (!success) form.reset();
          }
        }, 700);
      });

      form.addEventListener("input", function (e) {
        var field = e.target.closest(".field");
        if (field && field.classList.contains("has-error")) field.classList.remove("has-error");
      });
    });
  }

  /* ========================= Abandoned cart nudge ======================= */
  function initAbandonment() {
    store.watchAbandonment(function (t) {
      if (!store.cart.count()) return;
      ui.toast({
        title: "Still thinking it over?",
        note: t.count + " item" + (t.count > 1 ? "s" : "") + " held for you · " + util.money(t.grand) +
          ". Use SAIPH10 for 10% off.",
        icon: "bag",
        duration: 9000,
        action: { href: "checkout.html", label: "Finish order" }
      });
    });
  }

  /* ============================== Page hooks ============================ */
  function runPage() {
    var name = doc.body.dataset.page;
    var fn = SAIPH.pages && SAIPH.pages[name];
    if (typeof fn === "function") {
      try { fn(); } catch (err) { console.error("[SAiPH] page init failed:", name, err); }
    }
  }

  /* ============================== Bootstrap ============================= */
  function boot() {
    initHeader();
    initCartDrawer();
    initSearch();
    initGlobalHandlers();
    initForms();
    ui.bindAccordions();
    ui.bindTabs();
    ui.bindCounters();
    ui.reveal();

    store.on("cart:change", function () {
      renderCartDrawer();
      paintCounts("cart");
    });
    store.on("cart:add", function () {
      var drawer = $("[data-cart-drawer]");
      if (drawer && !drawer.classList.contains("is-open") && doc.body.dataset.page !== "cart") {
        /* Nudge, don't hijack: the toast carries the CTA instead. */
      }
    });
    store.on("wishlist:change", function () { paintCounts(); });
    store.on("account:change", function (acct) {
      $$("[data-account-name]").forEach(function (el) {
        el.textContent = acct ? acct.name.split(" ")[0] : "Account";
      });
    });

    renderCartDrawer();
    paintCounts();
    var acct = store.account.get();
    if (acct) {
      $$("[data-account-name]").forEach(function (el) { el.textContent = acct.name.split(" ")[0]; });
    }

    runPage();
    initAbandonment();
  }

  SAIPH.app = {
    renderCartDrawer: renderCartDrawer,
    paintCounts: paintCounts,
    quickView: quickView,
    quickAdd: quickAdd,
    $: $,
    $$: $$
  };

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})(typeof window !== "undefined" ? window : this);

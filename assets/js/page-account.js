/* ==========================================================================
   SAiPH Bakes — Account controller
   Sign-in (client-side demo), orders, addresses, subscriptions, gift cards
   and saved items.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.account = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    var SECTIONS = [
      { id: "orders", name: "Orders", icon: "package" },
      { id: "wishlist", name: "Saved items", icon: "heart" },
      { id: "addresses", name: "Addresses", icon: "mappin" },
      { id: "subscriptions", name: "Subscriptions", icon: "refresh" },
      { id: "giftcards", name: "Gift cards", icon: "gift" },
      { id: "profile", name: "Profile", icon: "user" }
    ];

    var current = (global.location.hash || "#orders").replace("#", "");
    if (!SECTIONS.some(function (s) { return s.id === current; })) current = "orders";

    /* ------------------------------ Sign in ------------------------------ */
    function signInPanel() {
      return '<div class="cart-layout">' +
        '<form class="checkout-block" data-signin novalidate>' +
          '<h2 class="checkout-block__title"><i>' + ui.icon("user") + "</i> Sign in or create an account</h2>" +
          '<p class="muted" style="font-size:var(--fs-sm)">This build stores your session in this browser only — no server, no password required. Wire it to your auth provider when you connect a backend.</p>' +
          '<div class="field-grid">' +
            '<div class="field"><label class="field__label" for="ac-name">Name <span class="req">*</span></label>' +
              '<input class="input" id="ac-name" required autocomplete="name" placeholder="Ananya Barua">' +
              '<p class="field__error">Tell us your name.</p></div>' +
            '<div class="field"><label class="field__label" for="ac-email">Email <span class="req">*</span></label>' +
              '<input class="input" id="ac-email" type="email" required autocomplete="email" placeholder="you@example.com">' +
              '<p class="field__error">A valid email, please.</p></div>' +
            '<div class="field"><label class="field__label" for="ac-phone">Mobile</label>' +
              '<input class="input" id="ac-phone" type="tel" autocomplete="tel" placeholder="98640 00000"></div>' +
          "</div>" +
          '<button class="btn btn--accent" type="submit">Continue</button>' +
        "</form>" +
        '<aside class="summary-panel">' +
          '<h2 class="summary-panel__title">Why sign in</h2>' +
          '<div class="stack stack--sm" style="font-size:var(--fs-sm);color:var(--text-muted)">' +
            '<span class="row row--tight" style="align-items:flex-start">' + ui.icon("package") + "<span>Track every order and reorder in two taps</span></span>" +
            '<span class="row row--tight" style="align-items:flex-start">' + ui.icon("mappin") + "<span>Save addresses for faster checkout</span></span>" +
            '<span class="row row--tight" style="align-items:flex-start">' + ui.icon("refresh") + "<span>Manage bread and pantry subscriptions</span></span>" +
            '<span class="row row--tight" style="align-items:flex-start">' + ui.icon("award") + "<span>Earn a point per ₹10 — 1,000 points is ₹250 off</span></span>" +
          "</div>" +
          '<div class="note">' + ui.icon("info") + "<span>Guest checkout is always available — an account is a convenience, never a requirement.</span></div>" +
        "</aside>" +
      "</div>";
    }

    /* ------------------------------- Panels ------------------------------ */
    function ordersPanel() {
      var orders = store.orders.all();
      if (!orders.length) {
        return emptyPanel("package", "No orders yet",
          "When you place an order it appears here with live status and a one-tap reorder.",
          "shop.html", "Start shopping");
      }
      return orders.map(function (o) {
        var done = o.timeline.every(function (n) { return n.done; });
        var lastDone = o.timeline.filter(function (n) { return n.done; }).pop();
        return '<article class="order-row">' +
          '<div class="order-row__head">' +
            "<div><span class=\"order-row__id\">" + util.esc(o.id) + "</span><br>" +
            '<span class="order-row__date">Placed ' + util.fmtWhen(o.placedAt) + "</span></div>" +
            '<span class="spacer"></span>' +
            '<span class="status ' + (done ? "status--delivered" : "status--baking") + '">' +
              util.esc(lastDone ? lastDone.title : "Confirmed") + "</span>" +
          "</div>" +
          '<div class="row row--between row--top">' +
            '<div class="order-row__thumbs">' + o.items.slice(0, 4).map(function (i) {
              var p = query.byId(i.id);
              return p ? ui.media(p, { ratio: "square" }) : "";
            }).join("") + "</div>" +
            "<div style=\"text-align:right\"><b>" + util.money(o.totals.grand) + "</b><br>" +
            '<span class="order-row__date">' + o.items.length + (o.items.length === 1 ? " item" : " items") + "</span></div>" +
          "</div>" +
          '<p style="font-size:var(--fs-sm);color:var(--text-muted)">' +
            o.items.map(function (i) { return util.esc(i.name) + " × " + i.qty; }).join(" · ") + "</p>" +
          '<p style="font-size:var(--fs-xs);color:var(--text-faint)">' +
            (o.mode === "pickup" ? "Pickup" : "Delivery") + " · " + util.fmtDate(o.date) + " · " + util.esc(o.slotLabel) + "</p>" +
          '<div class="row row--tight">' +
            '<a class="btn btn--sm btn--outline" href="track-order.html?order=' + o.id + '">Track</a>' +
            '<button class="btn btn--sm btn--ghost" type="button" data-reorder="' + o.id + '">Reorder</button>' +
            '<button class="btn btn--sm btn--ghost" type="button" data-invoice="' + o.id + '">Invoice</button>' +
          "</div>" +
        "</article>";
      }).join("");
    }

    function wishlistPanel() {
      var items = store.wishlist.all().map(function (id) { return query.byId(id); }).filter(Boolean);
      if (!items.length) {
        return emptyPanel("heart", "Nothing saved yet",
          "Tap the heart on any product to keep it here across visits.",
          "shop.html", "Browse products");
      }
      return '<div class="product-grid">' + ui.productGrid(items) + "</div>";
    }

    function addressesPanel() {
      var list = store.addresses.all();
      return '<div class="grid grid--2">' +
        list.map(function (a) {
          return '<article class="card card--pad">' +
            '<div class="row row--between"><span class="badge badge--outline">' + util.esc(a.label || "Address") + "</span>" +
            '<button class="link" type="button" data-del-addr="' + a.id + '" style="font-size:.6rem;color:var(--text-faint)">Remove</button></div>' +
            '<p style="font-family:var(--font-display);font-size:var(--fs-md);margin-top:.6rem">' + util.esc(a.name || "") + "</p>" +
            '<p class="muted" style="font-size:var(--fs-sm);line-height:1.55">' +
              util.esc([a.line, a.landmark, a.city, a.pin].filter(Boolean).join(", ")) + "</p>" +
            (a.phone ? '<p class="faint" style="font-size:var(--fs-sm);margin-top:.35rem">' + util.esc(a.phone) + "</p>" : "") +
          "</article>";
        }).join("") +
        '<form class="card card--pad stack stack--sm" data-addr-form novalidate>' +
          '<h3 style="font-size:var(--fs-md)">Add an address</h3>' +
          '<div class="field"><label class="field__label" for="ad-label">Label</label>' +
            '<select class="select" id="ad-label"><option>Home</option><option>Office</option><option>Other</option></select></div>' +
          '<div class="field"><label class="field__label" for="ad-name">Name <span class="req">*</span></label>' +
            '<input class="input" id="ad-name" required><p class="field__error">Required.</p></div>' +
          '<div class="field"><label class="field__label" for="ad-line">Address <span class="req">*</span></label>' +
            '<input class="input" id="ad-line" required><p class="field__error">Required.</p></div>' +
          '<div class="field-grid">' +
            '<div class="field"><label class="field__label" for="ad-city">City</label>' +
              '<select class="select" id="ad-city">' + data.deliveryCities.map(function (c) {
                return "<option>" + c + "</option>";
              }).join("") + "</select></div>" +
            '<div class="field"><label class="field__label" for="ad-pin">PIN</label>' +
              '<input class="input" id="ad-pin" inputmode="numeric"></div>' +
          "</div>" +
          '<div class="field"><label class="field__label" for="ad-phone">Mobile</label>' +
            '<input class="input" id="ad-phone" type="tel"></div>' +
          '<button class="btn btn--sm btn--accent" type="submit">Save address</button>' +
        "</form>" +
      "</div>";
    }

    function subscriptionsPanel() {
      var subs = store.subscriptions.all();
      var presets = [
        { name: "Weekly bread box", note: "Two loaves, every Saturday morning", price: 510, discount: "10% off", cadence: "Weekly" },
        { name: "Breakfast viennoiserie", note: "Six croissants, twice a week before 8am", price: 765, discount: "12% off", cadence: "Twice weekly" },
        { name: "Khowdy pantry", note: "Two cookie jars and a tin of tea, monthly", price: 1150, discount: "8% off", cadence: "Monthly" },
        { name: "Office pantry box", note: "Cookies, brownies and tea for the team", price: 2400, discount: "GST invoiced", cadence: "Weekly" }
      ];

      return (subs.length
        ? '<div class="stack stack--sm">' + subs.map(function (s) {
          return '<article class="order-row"><div class="row row--between">' +
            "<div><b>" + util.esc(s.name) + "</b><br><span class=\"order-row__date\">" +
            util.esc(s.cadence) + " · " + util.money(s.price) + " per delivery</span></div>" +
            '<div class="row row--tight">' +
              '<span class="status ' + (s.active ? "status--delivered" : "status--placed") + '">' +
                (s.active ? "Active" : "Paused") + "</span>" +
              '<button class="btn btn--sm btn--ghost" type="button" data-toggle-sub="' + s.id + '">' +
                (s.active ? "Pause" : "Resume") + "</button>" +
              '<button class="btn btn--sm btn--ghost" type="button" data-del-sub="' + s.id + '">Cancel</button>' +
            "</div></div></article>";
        }).join("") + "</div>"
        : '<div class="note">' + ui.icon("info") + "<span>No active subscriptions. Start one below — pause or cancel any time, no notice period.</span></div>") +
        '<div class="value-grid" style="margin-top:1.5rem">' + presets.map(function (p, i) {
          return '<article class="value">' +
            '<span class="value__icon">' + ui.icon("refresh") + "</span>" +
            '<h3 class="value__title">' + util.esc(p.name) + "</h3>" +
            '<p class="value__text">' + util.esc(p.note) + "</p>" +
            '<div class="row row--between" style="margin-top:.5rem">' +
              "<b>" + util.money(p.price) + '<small class="faint" style="font-weight:400"> / delivery</small></b>' +
              '<span class="badge badge--eggless">' + util.esc(p.discount) + "</span>" +
            "</div>" +
            '<button class="btn btn--sm btn--outline" type="button" data-start-sub="' + i + '" style="margin-top:.75rem">Start ' +
              util.esc(p.cadence.toLowerCase()) + "</button>" +
          "</article>";
        }).join("") + "</div>";
    }

    function giftCardsPanel() {
      var gc = query.byId("saiph-gift-card");
      return '<div class="cart-layout">' +
        '<div class="stack stack--lg">' +
          '<div class="checkout-block">' +
            '<h2 class="checkout-block__title"><i>' + ui.icon("gift") + "</i> Your gift cards</h2>" +
            '<div class="note">' + ui.icon("info") +
              "<span>No gift cards on this account yet. Buy one below, or redeem a code you have received.</span></div>" +
            '<form class="coupon-row" data-redeem-form>' +
              '<label class="sr-only" for="gc-code">Gift card code</label>' +
              '<input class="input" id="gc-code" placeholder="SAIPH-XXXX-XXXX-XXXX">' +
              '<button class="btn btn--outline" type="submit">Redeem</button></form>' +
          "</div>" +
          '<div class="checkout-block">' +
            '<h2 class="checkout-block__title"><i>' + ui.icon("card") + "</i> How they work</h2>" +
            '<ul class="prose" style="font-size:var(--fs-sm)">' +
              "<li>Any amount from ₹500, in ₹100 steps</li>" +
              "<li>Redeemable online and in our stores</li>" +
              "<li>Valid twelve months from purchase</li>" +
              "<li>Balance carries forward across visits</li>" +
              "<li>Delivered by email instantly, or scheduled for a date</li>" +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<aside class="summary-panel">' +
          '<h2 class="summary-panel__title">Buy a gift card</h2>' +
          (gc ? ui.media(gc, { ratio: "landscape" }) : "") +
          '<p class="muted" style="font-size:var(--fs-sm)">Let them choose their own indulgence across all three brands.</p>' +
          '<a class="btn btn--accent btn--block" href="product.html?id=saiph-gift-card">Buy a gift card</a>' +
        "</aside>" +
      "</div>";
    }

    function profilePanel() {
      var acct = store.account.get();
      return '<div class="cart-layout">' +
        '<form class="checkout-block" data-profile-form>' +
          '<h2 class="checkout-block__title"><i>' + ui.icon("user") + "</i> Profile</h2>" +
          '<div class="field-grid">' +
            '<div class="field"><label class="field__label" for="pf-name">Name</label>' +
              '<input class="input" id="pf-name" value="' + util.esc(acct.name) + '"></div>' +
            '<div class="field"><label class="field__label" for="pf-email">Email</label>' +
              '<input class="input" id="pf-email" type="email" value="' + util.esc(acct.email) + '"></div>' +
            '<div class="field"><label class="field__label" for="pf-phone">Mobile</label>' +
              '<input class="input" id="pf-phone" type="tel" value="' + util.esc(acct.phone || "") + '"></div>' +
          "</div>" +
          '<div class="stack stack--sm">' +
            '<span class="field__label">Communication preferences</span>' +
            '<label class="check"><input type="checkbox" checked><span>Order updates by SMS and WhatsApp</span></label>' +
            '<label class="check"><input type="checkbox" checked><span>New launches and seasonal collections by email</span></label>' +
            '<label class="check"><input type="checkbox"><span>Offers and discount codes</span></label>' +
          "</div>" +
          '<div class="row row--tight">' +
            '<button class="btn btn--sm btn--accent" type="submit">Save changes</button>' +
            '<button class="btn btn--sm btn--ghost" type="button" data-signout>' + ui.icon("logout") + " Sign out</button>" +
          "</div>" +
        "</form>" +
        '<aside class="summary-panel">' +
          '<h2 class="summary-panel__title">Rewards</h2>' +
          '<div class="stack stack--xs" style="text-align:center">' +
            '<span class="eyebrow">' + util.esc(acct.tier) + "</span>" +
            '<p style="font-family:var(--font-editorial);font-size:2.75rem;line-height:1;color:var(--heading)">' +
              acct.points.toLocaleString("en-IN") + "</p>" +
            '<span class="faint" style="font-size:var(--fs-xs);letter-spacing:.12em;text-transform:uppercase">Points earned</span>' +
          "</div>" +
          '<div class="freeship"><div class="row row--between"><span>' +
            (1500 - acct.points % 1500) + " points to your next ₹250 voucher</span></div>" +
            '<div class="freeship__track"><div class="freeship__fill" style="width:' +
            Math.round((acct.points % 1500) / 15) + '%"></div></div></div>' +
          '<p class="faint" style="font-size:var(--fs-xs)">One point per ₹10 spent, online or in store. 1,000 points converts to ₹250 off any order.</p>' +
          '<p class="faint" style="font-size:var(--fs-xs)">Member since ' + util.fmtDate(new Date(acct.since).toISOString().slice(0, 10)) + "</p>" +
        "</aside>" +
      "</div>";
    }

    function emptyPanel(icon, title, text, href, cta) {
      return '<div class="empty-state">' + ui.icon(icon) +
        "<h2 style=\"font-size:var(--fs-h4)\">" + title + "</h2>" +
        '<p class="muted" style="font-size:var(--fs-sm);max-width:44ch">' + text + "</p>" +
        '<a class="btn btn--sm" href="' + href + '">' + cta + "</a></div>";
    }

    /* ------------------------------- Render ------------------------------ */
    function render() {
      var acct = store.account.get();
      var nav = $("[data-acct-nav]");
      var panels = $("[data-acct-panels]");

      if (!acct) {
        nav.innerHTML = "";
        panels.innerHTML = signInPanel();
        $("[data-acct-title]").textContent = "Sign in";
        $("[data-acct-eyebrow]").textContent = "Customer Account";
        $("[data-acct-lede]").textContent = "Sign in to track orders, save addresses and manage subscriptions. Guest checkout is always available.";
        return;
      }

      $("[data-acct-title]").textContent = "Hello, " + acct.name.split(" ")[0];
      $("[data-acct-eyebrow]").textContent = acct.tier + " · " + acct.points.toLocaleString("en-IN") + " points";
      $("[data-acct-lede]").textContent = "Orders, addresses, subscriptions, gift card balance and saved items — all in one place.";

      nav.innerHTML = SECTIONS.map(function (s) {
        var counts = {
          orders: store.orders.all().length,
          wishlist: store.wishlist.count(),
          addresses: store.addresses.all().length,
          subscriptions: store.subscriptions.all().length
        };
        var n = counts[s.id];
        return '<a href="#' + s.id + '" class="' + (s.id === current ? "is-active" : "") + '" data-acct-link="' + s.id + '">' +
          ui.icon(s.icon) + "<span>" + s.name + "</span>" +
          (n ? '<span class="spacer"></span><span class="faint" style="font-size:var(--fs-xs)">' + n + "</span>" : "") +
        "</a>";
      }).join("") +
      '<button class="account-nav-signout link" type="button" data-signout style="margin-top:1rem;padding:.8rem 1rem">' +
        ui.icon("logout") + " Sign out</button>";

      var body = {
        orders: ordersPanel,
        wishlist: wishlistPanel,
        addresses: addressesPanel,
        subscriptions: subscriptionsPanel,
        giftcards: giftCardsPanel,
        profile: profilePanel
      }[current];

      var section = SECTIONS.filter(function (s) { return s.id === current; })[0];
      panels.innerHTML =
        '<div class="section-head" style="margin-bottom:1.25rem">' +
          '<span class="eyebrow">Account</span><h2 style="font-size:var(--fs-h3)">' + section.name + "</h2></div>" +
        body();

      SAIPH.app.paintCounts();
      ui.reveal();
    }

    /* ------------------------------- Events ------------------------------ */
    global.addEventListener("hashchange", function () {
      var next = (global.location.hash || "#orders").replace("#", "");
      if (SECTIONS.some(function (s) { return s.id === next; })) {
        current = next;
        render();
      }
    });

    doc.addEventListener("submit", function (e) {
      var signin = e.target.closest("[data-signin]");
      if (signin) {
        e.preventDefault();
        var name = $("#ac-name"), email = $("#ac-email");
        var ok = true;
        [name, email].forEach(function (f) {
          var valid = f.value.trim().length > 0 &&
            (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value));
          f.closest(".field").classList.toggle("has-error", !valid);
          if (!valid) ok = false;
        });
        if (!ok) return;
        store.account.signIn({
          name: name.value.trim(),
          email: email.value.trim(),
          phone: $("#ac-phone").value.trim()
        });
        ui.toast({ title: "Signed in", note: "Welcome to SAiPH Bakes.", variant: "success" });
        render();
        return;
      }

      var addrForm = e.target.closest("[data-addr-form]");
      if (addrForm) {
        e.preventDefault();
        var nm = $("#ad-name"), ln = $("#ad-line");
        var valid = nm.value.trim() && ln.value.trim();
        nm.closest(".field").classList.toggle("has-error", !nm.value.trim());
        ln.closest(".field").classList.toggle("has-error", !ln.value.trim());
        if (!valid) return;
        store.addresses.save({
          label: $("#ad-label").value,
          name: nm.value.trim(),
          line: ln.value.trim(),
          city: $("#ad-city").value,
          pin: $("#ad-pin").value.trim(),
          phone: $("#ad-phone").value.trim()
        });
        ui.toast({ title: "Address saved", variant: "success" });
        render();
        return;
      }

      var profileForm = e.target.closest("[data-profile-form]");
      if (profileForm) {
        e.preventDefault();
        store.account.signIn({
          name: $("#pf-name").value.trim() || store.account.get().name,
          email: $("#pf-email").value.trim(),
          phone: $("#pf-phone").value.trim()
        });
        ui.toast({ title: "Profile updated", variant: "success" });
        render();
        return;
      }

      var redeem = e.target.closest("[data-redeem-form]");
      if (redeem) {
        e.preventDefault();
        ui.toast({
          title: "Gift card not recognised",
          note: "Codes look like SAIPH-XXXX-XXXX-XXXX. Check your email, or call support.",
          variant: "error", icon: "alert"
        });
      }
    });

    doc.addEventListener("click", function (e) {
      var link = e.target.closest("[data-acct-link]");
      if (link) { current = link.dataset.acctLink; setTimeout(render, 0); return; }

      if (e.target.closest("[data-signout]")) {
        store.account.signOut();
        ui.toast({ title: "Signed out" });
        render();
        return;
      }

      var reorder = e.target.closest("[data-reorder]");
      if (reorder) {
        var o = store.orders.byId(reorder.dataset.reorder);
        if (!o) return;
        o.items.forEach(function (i) {
          var prod = query.byId(i.id);
          var match = prod && prod.variants.filter(function (v) { return v.label === i.variant; })[0];
          store.cart.add({
            id: i.id,
            variant: match ? match.id : null,
            flavour: i.flavour,
            eggless: i.eggless,
            message: i.message,
            addons: i.addons,
            qty: i.qty
          });
        });
        ui.toast({
          title: "Added to cart",
          note: o.items.length + " item" + (o.items.length > 1 ? "s" : "") + " from " + o.id,
          variant: "success",
          action: { href: "checkout.html", label: "Checkout" }
        });
        return;
      }

      var inv = e.target.closest("[data-invoice]");
      if (inv) {
        ui.toast({
          title: "Invoice emailed",
          note: "A GST invoice for " + inv.dataset.invoice + " is on its way to your inbox.",
          variant: "success", icon: "mail"
        });
        return;
      }

      var delAddr = e.target.closest("[data-del-addr]");
      if (delAddr) { store.addresses.remove(delAddr.dataset.delAddr); render(); return; }

      var startSub = e.target.closest("[data-start-sub]");
      if (startSub) {
        var presets = [
          { name: "Weekly bread box", cadence: "Weekly", price: 510 },
          { name: "Breakfast viennoiserie", cadence: "Twice weekly", price: 765 },
          { name: "Khowdy pantry", cadence: "Monthly", price: 1150 },
          { name: "Office pantry box", cadence: "Weekly", price: 2400 }
        ];
        var pick = presets[parseInt(startSub.dataset.startSub, 10)];
        store.subscriptions.add(pick);
        ui.toast({ title: "Subscription started", note: pick.name + " · " + pick.cadence, variant: "success" });
        render();
        return;
      }

      var toggleSub = e.target.closest("[data-toggle-sub]");
      if (toggleSub) { store.subscriptions.toggle(toggleSub.dataset.toggleSub); render(); return; }

      var delSub = e.target.closest("[data-del-sub]");
      if (delSub) { store.subscriptions.remove(delSub.dataset.delSub); render(); return; }
    });

    render();
  };
})(typeof window !== "undefined" ? window : this);

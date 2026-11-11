/* ==========================================================================
   SAiPH Bakes — Cart page controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.cart = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    function lineHTML(d) {
      var p = d.product;
      if (!p) return "";
      var attrs = [];
      if (d.variant && d.variant.label !== "Standard") attrs.push(["Size", d.variant.label + (d.variant.servings ? " · serves " + d.variant.servings : "")]);
      if (d.line.flavour) attrs.push(["Flavour", d.line.flavour]);
      if (d.line.eggless) attrs.push(["Base", "Eggless"]);
      if (d.line.message) attrs.push(["Message", "“" + d.line.message + "”"]);
      if (d.line.custom) {
        if (d.line.custom.occasion) attrs.push(["Occasion", d.line.custom.occasion]);
        if (d.line.custom.date) attrs.push(["Delivery", util.fmtDate(d.line.custom.date)]);
        if (d.line.custom.reference) attrs.push(["Reference", d.line.custom.reference]);
        if (d.line.custom.instructions) attrs.push(["Notes", d.line.custom.instructions]);
      }
      if (d.line.addons && d.line.addons.length) {
        attrs.push(["Add-ons", d.line.addons.map(function (a) {
          var rec = data.cakeAddons.filter(function (x) { return x.id === a; })[0];
          return rec ? rec.name : a;
        }).join(", ")]);
      }

      return '<div class="line-item" data-line="' + d.index + '">' +
        '<a class="line-item__media" href="' + p.url + '">' + ui.media(p, { ratio: "square" }) + "</a>" +
        "<div>" +
          '<div class="product-card__brand"><span class="brandname">' + util.esc(p.brandName) + "</span></div>" +
          '<a href="' + p.url + '"><span class="line-item__title">' + util.esc(p.name) + "</span></a>" +
          (attrs.length ? '<dl class="line-item__attrs" style="margin-top:.35rem">' + attrs.map(function (a) {
            return "<div><dt>" + util.esc(a[0]) + ":</dt> <dd>" + util.esc(a[1]) + "</dd></div>";
          }).join("") + "</dl>" : "") +
          '<div class="row" style="margin-top:.75rem">' +
            '<div class="stepper">' +
              '<button type="button" data-qty="-1" aria-label="Reduce quantity">' + ui.icon("minus") + "</button>" +
              '<input type="number" value="' + d.line.qty + '" min="1" max="30" data-qty-input aria-label="Quantity">' +
              '<button type="button" data-qty="1" aria-label="Increase quantity">' + ui.icon("plus") + "</button>" +
            "</div>" +
            '<button class="link" type="button" data-line-remove style="font-size:.6rem">Remove</button>' +
            '<button class="link" type="button" data-line-wish style="font-size:.6rem">Save for later</button>' +
          "</div>" +
        "</div>" +
        '<div class="line-item__price">' + util.money(d.total) +
          (d.line.qty > 1 ? '<br><small class="faint" style="font-weight:400">' + util.money(d.unit) + " each</small>" : "") +
        "</div>" +
      "</div>";
    }

    function render() {
      var detail = store.cart.detail();
      var t = store.totals();
      var linesEl = $("[data-cart-lines]");

      if (!detail.length) {
        linesEl.innerHTML =
          '<div class="cart-empty">' +
            '<span class="cart-empty__glyph">' + ui.icon("bag") + "</span>" +
            "<h2 style=\"font-size:var(--fs-h3)\">Your cart is empty</h2>" +
            '<p class="muted" style="max-width:40ch">Nothing in here yet. Start with a bestseller, build a cake from scratch, or send someone a hamper.</p>' +
            '<div class="row row--center">' +
              '<a class="btn" href="shop.html?badge=BESTSELLER">Shop bestsellers</a>' +
              '<a class="btn btn--outline" href="cakes.html">Create your cake</a>' +
            "</div>" +
          "</div>";
        $("[data-cart-totals]").innerHTML = '<p class="muted" style="font-size:var(--fs-sm)">Add something to see your total.</p>';
        $("[data-coupon-area]").innerHTML = "";
        $("[data-checkout-btn]").setAttribute("aria-disabled", "true");
        $("[data-checkout-btn]").classList.add("btn--outline");
        $("[data-cart-lede]").textContent = "Your cart is empty — here is where to start.";
      } else {
        linesEl.innerHTML =
          (t.freeShipRemaining > 0
            ? '<div class="freeship" style="margin-bottom:1rem"><div class="row row--between"><span>Add <b>' +
              util.money(t.freeShipRemaining) + "</b> more for free delivery</span><b>" + t.freeShipProgress + "%</b></div>" +
              '<div class="freeship__track"><div class="freeship__fill" style="width:' + t.freeShipProgress + '%"></div></div></div>'
            : '<div class="freeship" style="margin-bottom:1rem"><div class="row row--tight" style="color:var(--success)">' +
              ui.icon("truck") + "<b>Free delivery unlocked</b></div></div>") +
          detail.map(lineHTML).join("");

        $("[data-checkout-btn]").removeAttribute("aria-disabled");
        $("[data-checkout-btn]").classList.remove("btn--outline");
        $("[data-cart-lede]").textContent = t.count + (t.count === 1 ? " item" : " items") +
          " in your cart. Review, apply a coupon, then choose delivery or store pickup at checkout.";

        $("[data-cart-totals]").innerHTML =
          '<div class="cart-summary__row"><span>Subtotal (' + t.count + " items)</span><b>" + util.money(t.subtotal) + "</b></div>" +
          (t.discount ? '<div class="cart-summary__row" style="color:var(--success)"><span>Discount · ' +
            util.esc(t.coupon.code) + "</span><b>−" + util.money(t.discount) + "</b></div>" : "") +
          '<div class="cart-summary__row"><span>Delivery</span><b>' + (t.shipping ? util.money(t.shipping) : "Free") + "</b></div>" +
          '<div class="cart-summary__row"><span>Packaging &amp; handling</span><b>Included</b></div>' +
          '<div class="cart-summary__row cart-summary__row--total"><span>Total payable</span><b>' + util.money(t.grand) + "</b></div>" +
          '<p class="faint" style="font-size:var(--fs-xs);margin-top:.25rem">Inclusive of all taxes. Midnight slot surcharge, if chosen, is added at checkout.</p>';

        var applied = store.coupon.get();
        $("[data-coupon-area]").innerHTML = applied && t.couponApplied
          ? '<div class="applied-coupon">' + ui.icon("percent") +
            "<span><b>" + util.esc(applied) + "</b> applied — you saved " + util.money(t.discount) + "</span>" +
            '<button type="button" data-remove-coupon>Remove</button></div>'
          : '<form class="coupon-row" data-coupon-form>' +
            '<label class="sr-only" for="coupon">Coupon code</label>' +
            '<input class="input" id="coupon" placeholder="Coupon code" autocomplete="off">' +
            '<button class="btn btn--outline" type="submit">Apply</button></form>';
      }

      $("[data-offer-list]").innerHTML = data.coupons.slice(0, 4).map(function (c) {
        return '<button class="row row--tight" type="button" data-use-coupon="' + c.code + '" ' +
          'style="font-size:var(--fs-xs);color:var(--text-muted);text-align:left">' +
          '<span class="badge badge--outline">' + c.code + "</span><span>" + util.esc(c.label) + "</span></button>";
      }).join("");

      var suggestEl = $("[data-suggest]");
      var basis = detail.length ? detail[0].line.id : "chocolate-truffle-cake";
      suggestEl.innerHTML = ui.productGrid(query.related(basis, 4));

      b.renderRecent($("[data-recent-rail]"), $("[data-recent-section]"));
      SAIPH.app.paintCounts();
      ui.reveal();
    }

    /* ------------------------------- Events ------------------------------- */
    doc.addEventListener("click", function (e) {
      var lineEl = e.target.closest("[data-cart-page] [data-line]");
      var index = lineEl ? parseInt(lineEl.dataset.line, 10) : -1;

      var qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn && index > -1) {
        var line = store.cart.all()[index];
        store.cart.setQty(index, line.qty + parseInt(qtyBtn.dataset.qty, 10));
        return;
      }
      if (e.target.closest("[data-line-remove]") && index > -1) {
        var removed = store.cart.all()[index];
        var p = query.byId(removed.id);
        store.cart.remove(index);
        ui.toast({ title: "Removed from cart", note: p ? p.name : "", icon: "trash" });
        return;
      }
      if (e.target.closest("[data-line-wish]") && index > -1) {
        var l = store.cart.all()[index];
        if (!store.wishlist.has(l.id)) store.wishlist.toggle(l.id);
        store.cart.remove(index);
        ui.toast({ title: "Saved for later", note: "Moved to your wishlist.", icon: "heart", action: { href: "wishlist.html", label: "View" } });
        return;
      }
      if (e.target.closest("[data-clear-cart]")) {
        if (!store.cart.count()) return;
        store.cart.clear();
        ui.toast({ title: "Cart emptied", icon: "trash" });
        return;
      }
      if (e.target.closest("[data-remove-coupon]")) {
        store.coupon.clear();
        ui.toast({ title: "Coupon removed" });
        return;
      }
      var use = e.target.closest("[data-use-coupon]");
      if (use) {
        applyCode(use.dataset.useCoupon);
        return;
      }
    });

    doc.addEventListener("change", function (e) {
      var input = e.target.closest("[data-cart-page] [data-qty-input]");
      if (!input) return;
      var lineEl = input.closest("[data-line]");
      store.cart.setQty(parseInt(lineEl.dataset.line, 10), parseInt(input.value, 10) || 1);
    });

    doc.addEventListener("submit", function (e) {
      var form = e.target.closest("[data-coupon-form]");
      if (!form) return;
      e.preventDefault();
      applyCode(form.querySelector("input").value);
    });

    function applyCode(code) {
      var res = store.coupon.apply(code);
      if (res.ok) {
        ui.toast({ title: res.coupon.code + " applied", note: res.coupon.label, variant: "success", icon: "percent" });
      } else {
        ui.toast({ title: "Could not apply that code", note: res.reason, variant: "error", icon: "alert" });
      }
    }

    store.on("cart:change", render);
    render();
  };
})(typeof window !== "undefined" ? window : this);

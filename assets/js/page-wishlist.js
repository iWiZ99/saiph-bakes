/* ==========================================================================
   SAiPH Bakes — Wishlist controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.wishlist = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var doc = global.document;
    var $ = b.$;

    function render() {
      var ids = store.wishlist.all();
      var items = ids.map(function (id) { return query.byId(id); }).filter(Boolean);
      var grid = $("[data-wish-grid]");
      var toolbar = $("[data-wish-toolbar]");

      if (!items.length) {
        toolbar.hidden = true;
        $("[data-wish-lede]").textContent = "Nothing saved yet. Tap the heart on any product to keep it here.";
        grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">' + ui.icon("heart") +
          "<h2 style=\"font-size:var(--fs-h4)\">Your wishlist is empty</h2>" +
          '<p class="muted" style="font-size:var(--fs-sm);max-width:44ch">Tap the heart on any product and it waits here — across visits, on this device.</p>' +
          '<a class="btn btn--sm" href="shop.html">Browse the catalogue</a></div>';
      } else {
        toolbar.hidden = false;
        $("[data-wish-total]").textContent = items.length;
        $("[data-wish-lede]").textContent = items.length + (items.length === 1 ? " item" : " items") +
          " saved, ready to move into the cart when the moment arrives.";
        grid.innerHTML = ui.productGrid(items);
      }

      var suggest = query.byBadge("BESTSELLER").filter(function (p) {
        return ids.indexOf(p.id) === -1;
      }).slice(0, 4);
      $("[data-wish-suggest]").innerHTML = ui.productGrid(suggest);

      SAIPH.app.paintCounts();
      ui.reveal();
    }

    doc.addEventListener("click", function (e) {
      if (e.target.closest("[data-add-all]")) {
        var ids = store.wishlist.all();
        var added = 0;
        ids.forEach(function (id) {
          var p = query.byId(id);
          if (!p) return;
          store.cart.add({ id: p.id, variant: p.variants[0].id, qty: 1 });
          added++;
        });
        ui.toast({
          title: added + (added === 1 ? " item" : " items") + " added to cart",
          note: "Sizes and flavours can still be changed in the cart.",
          variant: "success",
          action: { href: "checkout.html", label: "Checkout" }
        });
        return;
      }
      if (e.target.closest("[data-clear-wish]")) {
        if (!store.wishlist.count()) return;
        store.wishlist.clear();
        ui.toast({ title: "Wishlist cleared", icon: "trash" });
      }
    });

    store.on("wishlist:change", render);
    render();
  };
})(typeof window !== "undefined" ? window : this);

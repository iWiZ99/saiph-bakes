/* ==========================================================================
   SAiPH Bakes — SEO landing page controller
   Hydrates the product grid, store cards and bestseller rail on the generated
   category and city landing pages. All copy on those pages is server-rendered;
   this only fills the commerce blocks.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.collection = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var query = SAIPH.query;
    var data = SAIPH.data;
    var $ = b.$;

    var grid = $("[data-collection]");
    if (grid) {
      var cats = grid.dataset.collection.split(",");
      var seen = {};
      var list = [];
      cats.forEach(function (c) {
        query.byCat(c).forEach(function (p) {
          if (seen[p.id]) return;
          seen[p.id] = 1;
          list.push(p);
        });
      });
      list.sort(function (a, c) {
        var w = function (p) {
          return (p.badges.indexOf("BESTSELLER") > -1 ? 3 : 0) +
            (p.badges.indexOf("SIGNATURE") > -1 ? 2 : 0) +
            (p.badges.indexOf("NEW") > -1 ? 1 : 0);
        };
        return w(c) - w(a) || c.rating - a.rating;
      });
      grid.innerHTML = list.length
        ? ui.productGrid(list)
        : '<div class="empty-state" style="grid-column:1/-1">' + ui.icon("package") +
          "<h3>Nothing listed here just yet</h3>" +
          '<a class="btn btn--sm" href="shop.html">Browse the full catalogue</a></div>';
    }

    var best = $("[data-collection-bestsellers]");
    if (best) best.innerHTML = ui.productGrid(query.byBadge("BESTSELLER").slice(0, 4));

    var storesEl = $("[data-city-stores]");
    if (storesEl) {
      var ids = storesEl.dataset.cityStores.split(",");
      storesEl.innerHTML = ids
        .map(function (id) { return query.storeById(id); })
        .filter(Boolean)
        .map(b.storeCard)
        .join("");
    }

    ui.bindAccordions();
    ui.reveal();
    SAIPH.app.paintCounts();
  };
})(typeof window !== "undefined" ? window : this);

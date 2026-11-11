/* ==========================================================================
   SAiPH Bakes — Brand landing controller
   One controller for all three brand pages; the brand comes from
   body[data-brand] so the markup stays declarative.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.brand = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var data = SAIPH.data;
    var query = SAIPH.query;
    var doc = global.document;
    var $ = b.$;

    var theme = doc.body.dataset.brand;
    var brand = data.brands.filter(function (x) { return x.theme === theme; })[0];
    if (!brand) return;

    var products = query.byBrand(brand.id);

    var grid = $("[data-brand-grid]");
    if (grid) grid.innerHTML = ui.productGrid(products.slice(0, 8));

    var cats = $("[data-brand-cats]");
    if (cats) {
      var own = data.categories.filter(function (c) {
        return c.brands.indexOf(brand.id) > -1 && query.byCat(c.id).some(function (p) {
          return p.brand === brand.id;
        });
      });
      cats.innerHTML = own.map(function (c) {
        return b.categoryCard(c, { brand: brand.id });
      }).join("");
    }

    ui.reveal();
    SAIPH.app.paintCounts();
  };
})(typeof window !== "undefined" ? window : this);

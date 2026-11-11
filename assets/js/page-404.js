/* ==========================================================================
   SAiPH Bakes — 404 controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.notfound = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var query = SAIPH.query;
    var el = b.$("[data-404-products]");
    if (el) el.innerHTML = ui.productGrid(query.byBadge("BESTSELLER").slice(0, 4));
    SAIPH.app.paintCounts();
    ui.reveal();
  };
})(typeof window !== "undefined" ? window : this);

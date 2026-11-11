/* ==========================================================================
   SAiPH Bakes — Store locator controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.stores = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    var filter = { brand: "", term: "" };

    var retail = data.stores.filter(function (s) { return !s.unit; });
    var units = data.stores.filter(function (s) { return s.unit; });

    $("[data-store-filters]").innerHTML =
      '<button class="chip is-active" type="button" data-store-brand="">All brands</button>' +
      data.brands.filter(function (x) { return x.id !== "saiph"; }).map(function (x) {
        return '<button class="chip" type="button" data-store-brand="' + x.id + '">' + util.esc(x.name) + "</button>";
      }).join("");

    $("[data-city-chips]").innerHTML = data.deliveryCities.map(function (c) {
      return '<span class="chip" style="cursor:default">' + ui.icon("mappin") + util.esc(c) + "</span>";
    }).join("");

    $("[data-unit-grid]").innerHTML = units.map(b.storeCard).join("");

    function render() {
      var list = retail.filter(function (s) {
        if (filter.brand && s.brands.indexOf(filter.brand) === -1) return false;
        if (!filter.term) return true;
        var hay = (s.name + " " + s.city + " " + s.addr + " " + s.services.join(" ")).toLowerCase();
        return hay.indexOf(filter.term.toLowerCase()) > -1;
      });
      $("[data-store-grid]").innerHTML = list.map(b.storeCard).join("");
      $("[data-store-empty]").hidden = list.length > 0;
      ui.reveal();
    }

    doc.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-store-brand]");
      if (!chip) return;
      filter.brand = chip.dataset.storeBrand;
      $$("[data-store-brand]").forEach(function (c) {
        c.classList.toggle("is-active", c === chip);
      });
      render();
    });

    doc.addEventListener("input", util.debounce(function (e) {
      var input = e.target.closest("[data-store-search]");
      if (!input) return;
      filter.term = input.value.trim();
      render();
    }, 180));

    render();
  };
})(typeof window !== "undefined" ? window : this);

/* ==========================================================================
   SAiPH Bakes — Gifting page controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.gifting = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var query = SAIPH.query;
    var $ = b.$;

    b.renderGiftGrid($("[data-gift-grid]"));

    var hampers = query.byCat("hampers")
      .concat(query.byCat("corporate-gifting"))
      .concat(query.byCat("chocolates"))
      .filter(function (p, i, arr) { return arr.indexOf(p) === i; })
      .sort(function (a, c) { return c.rating - a.rating; })
      .slice(0, 8);
    $("[data-gift-products]").innerHTML = ui.productGrid(hampers);

    b.renderFaqs($("[data-gift-faq]"), [
      {
        q: "Can you deliver hampers to several different addresses?",
        a: "Yes. For corporate and festival programmes we accept a spreadsheet of recipients and dispatch to each address individually, with delivery confirmations back to you and a single consolidated GST invoice."
      },
      {
        q: "What is the minimum order for branded packaging?",
        a: "Twenty-five units for a foiled logo on the lid, fifty for printed sleeves and inserts, and fifty for monogrammed wedding favours. Branded programmes need three weeks from artwork approval."
      },
      {
        q: "Do hampers include a price tag or invoice inside?",
        a: "Never. Gift orders ship without any pricing in the box. The invoice goes to the purchaser by email only."
      },
      {
        q: "How far ahead should I plan festival gifting?",
        a: "Start in August for Diwali and early January for Bihu. Large programmes book out our packing capacity, and artwork plus approval typically takes two weeks before production even begins."
      },
      {
        q: "Can hampers ship outside your delivery cities?",
        a: "Khowdy packaged hampers ship pan-India in three to six working days. Hampers containing fresh cake or cream-based items are limited to our Dibrugarh."
      },
      {
        q: "What if a recipient is not home?",
        a: "The rider calls before arriving. If nobody answers we hold the hamper at the nearest store and reattempt the next day at no charge, or deliver to an alternative address you nominate."
      }
    ]);

    ui.bindAccordions();
    ui.bindCounters();
    ui.reveal();
    SAIPH.app.paintCounts();
  };
})(typeof window !== "undefined" ? window : this);

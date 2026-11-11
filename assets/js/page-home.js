/* ==========================================================================
   SAiPH Bakes — Homepage controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.home = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var query = SAIPH.query;
    var $ = b.$;

    /* Categories, gifting, steps, stores, pillars, proof, social */
    b.renderCategoryGrid($("[data-category-grid]"), { feature: true });
    b.renderGiftGrid($("[data-gift-grid]"));
    b.renderSteps($("[data-steps]"));
    b.renderStoreGrid($("[data-store-grid]"));
    b.renderPillars($("[data-pillars]"));
    b.renderTestimonials($("[data-testimonials]"), SAIPH.data.company.rating.verified ? 4 : 6);
    b.renderInsta($("[data-insta]"), 12);
    b.renderOccasionRail($("[data-occasion-rail]"));
    /* The rating panel is evidence, not decoration: it is built here only when
       the figures come from real review data, so an unverified rating is never
       rendered or crawlable. */
    var slot = $("[data-rating-slot]");
    var rating = SAIPH.data.company.rating;
    if (slot && rating.verified) {
      slot.hidden = false;
      slot.className = "google-rating";
      slot.innerHTML =
        '<span class="eyebrow eyebrow--muted">' + SAIPH.util.esc(rating.source) + "</span>" +
        '<p class="google-rating__score">' + rating.score.toFixed(1) + "<sup>/5</sup></p>" +
        '<span class="rating rating--lg">' + SAIPH.ui.stars(rating.score) + "</span>" +
        '<p class="muted" style="font-size:var(--fs-sm)">Across <b>' +
          rating.count.toLocaleString("en-IN") + "</b> verified reviews</p>";
    } else {
      var proof = $("[data-testimonials]");
      if (proof && proof.parentElement) proof.parentElement.style.gridTemplateColumns = "1fr";
    }

    /* Featured products, per brand tab */
    var featured = {
      all: dedupe(
        query.byBadge("BESTSELLER").concat(query.byBadge("NEW"))
      ).slice(0, 8),
      signature: query.byBrand("signature").slice(0, 8),
      doughremi: query.byBrand("doughremi").slice(0, 8),
      khowdy: query.byBrand("khowdy").slice(0, 8)
    };
    Object.keys(featured).forEach(function (key) {
      var el = $('[data-featured="' + key + '"]');
      if (el) el.innerHTML = ui.productGrid(featured[key]);
    });

    b.renderRecent($("[data-recent-rail]"), $("[data-recent-section]"));

    /* Newly injected cards need reveal + wishlist state applied */
    ui.reveal();
    SAIPH.app && SAIPH.app.paintCounts();

    function dedupe(list) {
      var seen = {};
      return list.filter(function (p) {
        if (seen[p.id]) return false;
        seen[p.id] = 1;
        return true;
      });
    }
  };
})(typeof window !== "undefined" ? window : this);

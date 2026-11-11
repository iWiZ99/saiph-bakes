/* ==========================================================================
   SAiPH Bakes — About page controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.about = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var $ = b.$;

    var icons = ["chef", "award", "sparkles", "headphones"];
    $("[data-pillar-cards]").innerHTML = data.aboutPillars.map(function (p, i) {
      return '<article class="value">' +
        '<span class="value__icon">' + ui.icon(icons[i] || "award") + "</span>" +
        '<h3 class="value__title">' + util.esc(p.title) + "</h3>" +
        '<p class="value__text">' + util.esc(p.text) + "</p>" +
      "</article>";
    }).join("");

    var motifs = { doughremi: "croissant", signature: "bonbon", khowdy: "tea" };
    $("[data-brand-cards]").innerHTML = data.brands
      .filter(function (x) { return x.id !== "saiph"; })
      .map(function (x) {
        var tones = data.tones[x.id] || data.tones.saiph;
        return '<article class="brand-card" data-brand="' + x.theme + '">' +
          '<div class="brand-card__media"><div class="media media--landscape">' +
            ui.art("about-" + x.id, tones, motifs[x.id]) +
            '<span class="media__grain"></span><span class="media__scrim"></span></div>' +
            '<span class="brand-card__stamp"><span class="brandname">by SAiPH Bakes</span></span></div>' +
          '<div class="brand-card__body">' +
            '<span class="brand-card__tag">' + util.esc(x.tag) + "</span>" +
            '<h3 class="brand-card__name">' + util.esc(x.name) + "</h3>" +
            '<p class="brand-card__desc">' + util.esc(x.desc) + "</p>" +
            '<div class="brand-card__rail">' + (x.keywords || []).map(function (k) {
              return "<span>" + util.esc(k) + "</span>";
            }).join("") + "</div>" +
            '<div class="brand-card__cta"><a class="btn btn--sm" href="' + x.url + '">' +
              util.esc(x.cta || "Explore") + "</a></div>" +
          "</div>" +
        "</article>";
      }).join("");

    b.renderTestimonials($("[data-testimonials]"), 6);
    ui.bindCounters();
    ui.reveal();
  };
})(typeof window !== "undefined" ? window : this);

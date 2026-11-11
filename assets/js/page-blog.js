/* ==========================================================================
   SAiPH Bakes — Journal controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.blog = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var $ = b.$;

    var tones = {
      Craft: data.tones.doughremi,
      Sourcing: data.tones.khowdy,
      Kitchen: data.tones.saiph,
      Signature: data.tones.signature
    };
    var motifs = { Craft: "croissant", Sourcing: "tea", Kitchen: "cake", Signature: "chocolate" };

    $("[data-post-grid]").innerHTML = data.blogPosts.map(function (p) {
      return '<article class="post-card">' +
        '<a href="blog.html#' + p.id + '"><div class="media media--landscape">' +
          ui.art("post-" + p.id, tones[p.cat] || tones.Kitchen, motifs[p.cat] || "cake") +
          '<span class="media__grain"></span></div></a>' +
        '<span class="post-card__cat">' + util.esc(p.cat) + "</span>" +
        '<h2 class="post-card__title"><a href="blog.html#' + p.id + '">' + util.esc(p.title) + "</a></h2>" +
        '<p class="post-card__excerpt">' + util.esc(p.excerpt) + "</p>" +
        '<p class="post-card__meta">' + util.esc(p.date) + " · " + util.esc(p.read) + " read</p>" +
      "</article>";
    }).join("");

    ui.reveal();
  };
})(typeof window !== "undefined" ? window : this);

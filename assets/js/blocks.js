/* ==========================================================================
   SAiPH Bakes — Shared block renderers
   Composite sections used on more than one page: category cards, gift cards,
   store cards, testimonials, the Instagram wall, ordering steps, brand pillars
   and the recently-viewed rail.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  var ui = SAIPH.ui;
  var util = SAIPH.util;
  var data = SAIPH.data;
  var query = SAIPH.query;
  var store = SAIPH.store;
  var doc = global.document;

  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }

  /* --------------------------- Category cards --------------------------- */
  var catMotif = {
    "birthday-cakes": "cake", "celebration-cakes": "cake", "pastries": "tart",
    "croissants": "croissant", "brownies": "chocolate", "chocolates": "chocolate",
    "cookies": "cookie", "breads": "bread", "hampers": "hamper",
    "assamese": "tea", "healthy-snacks": "cookie", "corporate-gifting": "hamper",
    "cupcakes": "cupcake", "coffee": "tea", "gift-cards": "hamper"
  };

  var catImages = {
    "birthday-cakes": "assets/img/products/triple-chocolate-crunch-cake-1.jpg",
    "celebration-cakes": "assets/img/products/chocolate-caramel-noir-cake.jpg",
    "pastries": "assets/img/collections/cinnamon-rolls.jpg",
    "croissants": "assets/img/products/dark-chocolate-babka.png",
    "brownies": "assets/img/products/chocolate-overload-brownie.jpg",
    "chocolates": "assets/img/products/pistachio-chocolate-fudge-bites.jpg",
    "cookies": "assets/img/products/gooey-chocolate-cookie-box.jpg",
    "breads": "assets/img/collections/almond-loaf.png",
    "hampers": "assets/img/products/basque-cheesecake-hamper.png",
    "assamese": "assets/img/products/kesar-rabdi-basque-cheesecake.jpg",
    "healthy-snacks": "assets/img/products/sugar-free-almond-butter.jpg",
    "corporate-gifting": "assets/img/products/mini-diwali-gift-hamper.jpg",
    "cupcakes": "assets/img/products/gooey-chocolate-muffins.jpg",
    "coffee": "assets/img/products/filter-coffee-fudge-bites.jpg",
    "gift-cards": "assets/img/collections/gifting.jpg",
    "burgers": "assets/img/products/paprika-and-garlic-crackers.jpg",
    "bakhar-khani": "assets/img/products/pistachio-babka.png",
    "pizza": "assets/img/products/herb-and-cheese-crackers.jpg",
    "patties-rolls": "assets/img/products/ragi-loaf.png",
    "hot-dogs": "assets/img/products/multi-grain-loaf.png",
    "savouries": "assets/img/products/mixed-seed-loaf.png",
    "desserts": "assets/img/products/pistachio-basque-cheesecake.jpg",
    "macarons": "assets/img/products/berry-chantilly-cake.jpg",
    "muffins": "assets/img/products/vanilla-roasted-almond-muffins.jpg"
  };

  function categoryCard(cat, opts) {
    opts = opts || {};
    var count = opts.brand
      ? query.byCat(cat.id).filter(function (p) { return p.brand === opts.brand; }).length
      : query.catCount(cat.id);
    var brand = opts.brand || (cat.brands && cat.brands[0] !== "saiph" ? cat.brands[0] : "saiph");
    var tones = data.tones[brand] || data.tones.saiph;
    var artInner = catImages[cat.id]
      ? '<img src="' + catImages[cat.id] + '" alt="' + util.esc(cat.name) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;">'
      : ui.art("cat-" + cat.id, tones, catMotif[cat.id] || "default");
    return '<a class="cat-card' + (opts.wide ? " cat-card--wide" : "") + '" href="shop.html' +
      util.qs({ cat: cat.id, brand: opts.brand }) + '">' +
      '<span class="cat-card__art">' + artInner + "</span>" +
      '<span class="cat-card__arrow">' + ui.icon("arrowRight") + "</span>" +
      '<span><span class="cat-card__name">' + util.esc(cat.name) + "</span>" +
      '<span class="cat-card__count">' + count + " product" + (count === 1 ? "" : "s") + "</span></span>" +
    "</a>";
  }

  function renderCategoryGrid(el, opts) {
    if (!el) return;
    opts = opts || {};
    var list = data.categories;
    if (opts.limit) list = list.slice(0, opts.limit);
    el.innerHTML = list.map(function (c, i) {
      return categoryCard(c, { wide: opts.feature && (i === 0 || i === 7) });
    }).join("");
  }

  /* ----------------------------- Gift cards ----------------------------- */
  var giftImages = {
    "chocolate-boxes": "assets/img/products/mini-diwali-gift-hamper.jpg",
    "tea-dessert": "assets/img/products/basque-cheesecake-hamper.png",
    "festival-hampers": "assets/img/products/assorted-diwali-mithai-barks-hamper.png",
    "corporate-packs": "assets/img/products/assorted-mithai-box-of-15.jpg",
    "all": "assets/img/collections/gifting.jpg"
  };

  function giftCard(g, i) {
    var brand = g.brand || (g.id === "chocolate-boxes" ? "signature" : g.id === "tea-dessert" ? "khowdy" : "doughremi");
    var tones = data.tones[brand] || data.tones.saiph;
    var href = "shop.html" + util.qs({ cat: g.cat, occasion: g.occasion, brand: g.brand });
    var giftImg = giftImages[g.id] || "assets/img/collections/gifting.jpg";
    return '<a class="gift-card' + (i === 0 ? " gift-card--tall" : "") + '" href="' + href + '">' +
      '<span class="gift-card__art"><img src="' + giftImg + '" alt="' + util.esc(g.name) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></span>' +
      '<span class="gift-card__from">From ' + util.money(g.from) + "</span>" +
      '<span class="gift-card__name">' + util.esc(g.name) + "</span>" +
      '<span class="gift-card__note">' + util.esc(g.note) + "</span>" +
    "</a>";
  }

  function renderGiftGrid(el) {
    if (!el) return;
    el.innerHTML = data.giftCollections.map(giftCard).join("");
  }

  /* ----------------------------- Store cards ---------------------------- */
  function storeCard(s) {
    return '<article class="store-card" data-store="' + s.id + '">' +
      '<div class="stack stack--xs">' +
        '<span class="store-card__city">' + util.esc(s.city) + (s.flagship ? " · Flagship" : s.unit ? " · Production" : "") + "</span>" +
        '<h3 class="store-card__name">' + util.esc(s.name) + "</h3>" +
        '<p class="store-card__addr">' + util.esc(s.addr) + "</p>" +
      "</div>" +
      '<div class="store-card__meta">' +
        "<div>" + ui.icon("clock") + "<span>" + util.esc(s.hours) + "</span></div>" +
        '<div>' + ui.icon("phone") + '<a href="tel:' + s.phone.replace(/\s/g, "") + '">' + util.esc(s.phone) + "</a></div>" +
        '<div><span class="store-open' + (s.open ? "" : " store-open--shut") + '"><i></i>' +
          (s.open ? "Open now" : "Closed now") + "</span></div>" +
      "</div>" +
      '<div class="store-card__services">' + s.services.map(function (x) {
        return "<span>" + util.esc(x) + "</span>";
      }).join("") + "</div>" +
      '<div class="store-card__actions">' +
        '<a class="btn btn--sm" href="shop.html' + util.qs({ pickup: s.id }) + '">Order online</a>' +
        '<a class="btn btn--sm btn--outline" href="' + s.maps + '" target="_blank" rel="noopener">Directions</a>' +
      "</div>" +
    "</article>";
  }

  function renderStoreGrid(el, opts) {
    if (!el) return;
    opts = opts || {};
    var list = data.stores.filter(function (s) { return opts.includeUnit || !s.unit; });
    var limit = parseInt(el.dataset.limit || "0", 10) || opts.limit;
    if (limit) list = list.slice(0, limit);
    el.innerHTML = list.map(storeCard).join("");
  }

  /* ---------------------------- Testimonials ---------------------------- */
  function testimonial(t) {
    return '<article class="testi">' +
      '<span class="rating">' + ui.stars(t.rating) + "</span>" +
      '<p class="testi__text">' + util.esc(t.text) + "</p>" +
      '<div class="testi__who">' +
        '<span class="testi__avatar">' + util.esc(t.name.charAt(0)) + "</span>" +
        "<span><span class=\"testi__name\">" + util.esc(t.name) + "</span><br>" +
        '<span class="testi__meta">' + util.esc(t.meta) + "</span></span>" +
      "</div>" +
    "</article>";
  }

  function renderTestimonials(el, limit) {
    if (!el) return;
    el.innerHTML = data.testimonials.slice(0, limit || 6).map(testimonial).join("");
  }

  /* ------------------------------ Instagram ----------------------------- */
  function instaTile(post, i) {
    var brand = post.tag === "#SAiPHSignature" ? "signature"
      : post.tag === "#DoughReMi" ? "doughremi"
      : post.tag === "#Khowdy" ? "khowdy" : "saiph";
    var tones = data.tones[brand] || data.tones.saiph;
    var motifs = ["cake", "croissant", "tea", "chocolate", "bread", "cookie", "bonbon", "hamper", "tart", "cupcake"];
    return '<a class="insta-tile" href="https://www.instagram.com/" target="_blank" rel="noopener" ' +
      'aria-label="' + util.esc(post.cap) + '">' +
      '<span class="insta-tile__art">' + ui.art("insta-" + i, tones, motifs[i % motifs.length]) + "</span>" +
      (post.video ? '<span class="insta-tile__play">' + ui.icon("play") + "</span>" : "") +
      '<span class="insta-tile__overlay">' + ui.icon("instagram") +
        "<span>" + util.esc(post.cap) + "<br><b>" + util.esc(post.tag) + "</b></span></span>" +
    "</a>";
  }

  function renderInsta(el, limit) {
    if (!el) return;
    el.innerHTML = data.insta.slice(0, limit || 12).map(instaTile).join("");
  }

  /* --------------------------- Ordering steps --------------------------- */
  function renderSteps(el) {
    if (!el) return;
    el.innerHTML = data.orderSteps.map(function (s) {
      return '<div class="step"><p class="step__title">' + util.esc(s.title) + "</p>" +
        '<p class="step__text">' + util.esc(s.text) + "</p></div>";
    }).join("");
  }

  /* ---------------------------- Brand pillars --------------------------- */
  function renderPillars(el) {
    if (!el) return;
    el.innerHTML = data.aboutPillars.map(function (p, i) {
      return '<div class="ecosystem__row">' +
        '<span class="ecosystem__num">0' + (i + 1) + "</span>" +
        "<div><p class=\"ecosystem__title\">" + util.esc(p.title) + "</p>" +
        '<p class="ecosystem__text">' + util.esc(p.text) + "</p></div>" +
      "</div>";
    }).join("");
  }

  /* --------------------------- Occasion rail ---------------------------- */
  function renderOccasionRail(el) {
    if (!el) return;
    el.innerHTML = data.occasions.map(function (o) {
      return '<a class="chip" href="cakes.html' + util.qs({ occasion: o.id }) + '">' +
        '<span aria-hidden="true">' + o.icon + "</span>" + util.esc(o.name) + "</a>";
    }).join("");
  }

  /* -------------------------- Recently viewed --------------------------- */
  function renderRecent(railEl, sectionEl, excludeId) {
    if (!railEl) return;
    var list = store.recent.products(excludeId).slice(0, 10);
    if (!list.length) {
      if (sectionEl) sectionEl.hidden = true;
      return;
    }
    if (sectionEl) sectionEl.hidden = false;
    railEl.innerHTML = list.map(function (p) {
      return '<a class="rv-card" href="' + p.url + '">' +
        ui.media(p, { ratio: "square" }) +
        '<span class="rv-card__name">' + util.esc(p.name) + "</span>" +
        '<span class="rv-card__price">' + util.money(p.price) + "</span>" +
      "</a>";
    }).join("");
  }

  /* ------------------------- Product rail / grid ------------------------ */
  function renderRail(el, list, opts) {
    if (!el) return;
    el.innerHTML = list.map(function (p) {
      return ui.productCard(p, Object.assign({ rail: true }, opts || {}));
    }).join("");
  }

  /* ------------------------------ FAQ list ------------------------------ */
  function renderFaqs(el, list) {
    if (!el) return;
    (list || data.faqs).forEach(function (f, i) {
      var item = doc.createElement("div");
      item.className = "accordion__item" + (i === 0 ? " is-open" : "");
      item.innerHTML = '<button class="accordion__btn" type="button" aria-expanded="' + (i === 0 ? "true" : "false") + '">' +
        "<span>" + util.esc(f.q) + "</span><i aria-hidden=\"true\"></i></button>" +
        '<div class="accordion__panel"><div class="accordion__inner">' + util.esc(f.a) + "</div></div>";
      el.appendChild(item);
    });
  }

  /* ------------------------- Delivery date strip ------------------------ */
  function renderDateStrip(el, opts) {
    if (!el) return;
    opts = opts || {};
    var leadDays = Math.ceil((opts.leadHours || 0) / 24);
    var days = util.dates(14, 0);
    el.innerHTML = days.map(function (d, i) {
      var disabled = i < leadDays;
      return '<label class="date-pill">' +
        '<input type="radio" name="' + (opts.name || "delivery-date") + '" value="' + d.iso + '"' +
          (disabled ? " disabled" : "") + (i === leadDays ? " checked" : "") + ">" +
        '<span class="date-pill__dow">' + d.dow + "</span>" +
        '<span class="date-pill__day">' + d.day + "</span>" +
        '<span class="date-pill__mon">' + d.mon + "</span>" +
      "</label>";
    }).join("");
  }

  function renderSlots(el, opts) {
    if (!el) return;
    opts = opts || {};
    el.innerHTML = data.deliverySlots.map(function (s, i) {
      return '<label class="option"><input type="radio" name="' + (opts.name || "slot") + '" value="' + s.id + '"' +
        (i === 3 ? " checked" : "") + '><span class="option__mark" aria-hidden="true"></span>' +
        '<span class="option__body"><span class="option__title">' + util.esc(s.label) + "</span>" +
        (s.note ? '<span class="option__note">' + util.esc(s.note) + "</span>" : "") + "</span></label>";
    }).join("");
  }

  /* ---------------------------- Google stars ---------------------------- */
  function renderGoogleStars(el) {
    if (!el) return;
    el.innerHTML = '<span class="rating rating--lg">' + ui.stars(data.company.rating.score) + "</span>";
  }

  /* ---------------------------- Year stamp ------------------------------ */
  function stampYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }
  stampYear();

  /* ------------------------- Statutory registrations ---------------------
     Printed only once real numbers exist in SAIPH.data.company. Until then
     nothing is claimed, rather than a plausible-looking invention. */
  function stampRegistrations() {
    var c = data.company;
    var bits = [];
    if (c.fssai) bits.push("FSSAI " + c.fssai);
    if (c.gst) bits.push("GSTIN " + c.gst);
    if (c.cin) bits.push("CIN " + c.cin);

    $$("[data-registrations]").forEach(function (el) {
      el.innerHTML = bits.length
        ? bits.map(function (b) { return " &nbsp;&bull;&nbsp; " + util.esc(b); }).join("")
        : "";
    });
    $$("[data-registrations-block]").forEach(function (el) {
      el.innerHTML = bits.length
        ? "<br>" + bits.map(util.esc).join("<br>")
        : '<br><span class="faint">FSSAI, GSTIN and CIN to be added</span>';
    });
  }
  stampRegistrations();

  SAIPH.blocks = {
    categoryCard: categoryCard,
    renderCategoryGrid: renderCategoryGrid,
    giftCard: giftCard,
    renderGiftGrid: renderGiftGrid,
    storeCard: storeCard,
    renderStoreGrid: renderStoreGrid,
    testimonial: testimonial,
    renderTestimonials: renderTestimonials,
    instaTile: instaTile,
    renderInsta: renderInsta,
    renderSteps: renderSteps,
    renderPillars: renderPillars,
    renderOccasionRail: renderOccasionRail,
    renderRecent: renderRecent,
    renderRail: renderRail,
    renderFaqs: renderFaqs,
    renderDateStrip: renderDateStrip,
    renderSlots: renderSlots,
    renderGoogleStars: renderGoogleStars,
    $: $, $$: $$
  };
})(typeof window !== "undefined" ? window : this);

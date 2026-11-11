/* ==========================================================================
   SAiPH Bakes — Product detail controller
   Renders the PDP from ?id=, wires variants/flavour/message/add-ons, delivery
   date + slot, gallery zoom, reviews and Product JSON-LD.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.product = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    /* Canonical origin follows the host actually serving the page, so PDP
       canonicals and schema stay correct on any domain. */
    var ORIGIN = global.location.origin.indexOf("http") === 0
      ? global.location.origin
      : "https://saiph-bakes.vercel.app";

    var id = util.param("id") || "gold-leaf-saffron-cheesecake";
    var p = query.byId(id);

    if (!p) {
      $("[data-pdp]").innerHTML =
        '<div class="empty-state" style="grid-column:1/-1">' + ui.icon("alert") +
        "<h2>We could not find that product</h2>" +
        '<p class="muted">It may have been renamed or retired. The catalogue is one click away.</p>' +
        '<a class="btn" href="shop.html">Browse the catalogue</a></div>';
      return;
    }

    /* Theme the page to the product's brand */
    if (p.theme) {
      doc.documentElement.setAttribute("data-brand", p.theme);
      doc.body.setAttribute("data-brand", p.theme);
    }
    doc.title = p.name + " — " + p.brandFull + " | SAiPH Bakes";
    var metaDesc = doc.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", p.desc + " " + p.shelfLife + " Order online with slot-timed delivery from SAiPH Bakes.");
    var canon = doc.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute("href", ORIGIN + "/product.html?id=" + p.id);

    store.recent.push(p.id);

    /* --------------------------- Selection state -------------------------- */
    var sel = {
      variant: p.variants[0].id,
      flavour: p.flavours ? p.flavours[0] : null,
      eggless: false,
      message: "",
      addons: [],
      qty: 1,
      date: "",
      slot: "evening",
      image: 0
    };

    function variant() {
      return p.variants.filter(function (v) { return v.id === sel.variant; })[0] || p.variants[0];
    }

    function addonTotal() {
      return sel.addons.reduce(function (n, a) {
        var rec = data.cakeAddons.filter(function (x) { return x.id === a; })[0];
        return n + (rec ? rec.price : 0);
      }, 0);
    }

    function unitPrice() { return variant().price + addonTotal(); }

    /* ------------------------------- Render ------------------------------- */
    function crumbs() {
      var cat = p.cats[0] ? query.catById(p.cats[0]) : null;
      $("[data-crumbs]").innerHTML =
        '<li><a href="index.html">Home</a></li>' +
        '<li><a href="shop.html">Shop</a></li>' +
        (cat ? '<li><a href="shop.html' + util.qs({ cat: cat.id }) + '">' + util.esc(cat.name) + "</a></li>" : "") +
        '<li aria-current="page">' + util.esc(p.name) + "</li>";
    }

    function galleryMarkup() {
      /* Four framings of the same piece stand in for a photo set. */
      var motifs = [ui.motifFor(p), "chocolate", "tart", "hamper"];
      var thumbs = motifs.map(function (m, i) {
        return '<button class="gallery__thumb" type="button" data-thumb="' + i + '" ' +
          'aria-selected="' + (i === sel.image ? "true" : "false") + '" aria-label="View image ' + (i + 1) + '">' +
          ui.media(p, { ratio: "square", seed: p.id + "-" + i, motif: m }) + "</button>";
      }).join("");
      return '<div class="gallery">' +
        '<div class="gallery__main" data-gallery-main>' +
          ui.media(p, { ratio: "square", seed: p.id + "-" + sel.image, motif: motifs[sel.image], eager: true }) +
          '<div class="gallery__badges">' + ui.badges(p.badges) + "</div>" +
          '<span class="gallery__zoom-note">' + ui.icon("zoom") + "Click to zoom</span>" +
        "</div>" +
        '<div class="gallery__thumbs">' + thumbs + "</div>" +
      "</div>";
    }

    function infoMarkup() {
      var v = variant();
      var wished = store.wishlist.has(p.id);
      var save = v.mrp && v.mrp > v.price ? Math.round(((v.mrp - v.price) / v.mrp) * 100) : 0;
      var lowStock = v.stock <= 6;

      return '<div class="pdp__info">' +
        '<div class="pdp__brandline"><span class="brandname">' + util.esc(p.brandName) +
          '</span> <span class="brandname" style="letter-spacing:.02em">by SAiPH Bakes</span></div>' +
        "<h1>" + util.esc(p.name) + "</h1>" +
        '<div class="row row--tight">' + ui.rating(p.rating, p.reviews, { lg: true }) +
          '<a class="link" href="#reviews-title" style="font-size:.6rem">Read reviews</a></div>' +
        '<div class="pdp__price" data-price>' + util.money(v.price) +
          (v.mrp ? "<del>" + util.money(v.mrp) + "</del>" : "") +
          (save ? '<span class="save">Save ' + save + "%</span>" : "") + "</div>" +
        '<p class="pdp__tax">Inclusive of all taxes' + (p.variants.length > 1 ? " · price updates with size" : "") + "</p>" +
        '<p class="pdp__desc">' + util.esc(p.desc) + "</p>" +

        /* Macro Nutrients Snapshot */
        (p.nutrition
          ? '<div class="pdp__macro-bar" aria-label="Nutritional snapshot per 100g">' +
              '<span class="macro-pill"><span class="macro-pill__val">' + p.nutrition.calories + '</span><span class="macro-pill__lbl">kcal Energy</span></span>' +
              '<span class="macro-pill"><span class="macro-pill__val">' + p.nutrition.protein + 'g</span><span class="macro-pill__lbl">Protein</span></span>' +
              '<span class="macro-pill"><span class="macro-pill__val">' + p.nutrition.netCarbs + 'g</span><span class="macro-pill__lbl">Net Carbs</span></span>' +
              '<span class="macro-pill"><span class="macro-pill__val">' + p.nutrition.fat + 'g</span><span class="macro-pill__lbl">Healthy Fats</span></span>' +
              '<span class="macro-pill macro-pill--highlight"><span class="macro-pill__val">0g</span><span class="macro-pill__lbl">Refined Sugar</span></span>' +
            '</div>'
          : "") +

        /* Size */
        (p.variants.length > 1
          ? '<div class="variant-row"><span class="variant-row__label">Size / Weight <b data-variant-label>' +
            util.esc(v.label) + "</b></span>" +
            '<div class="swatches">' + p.variants.map(function (x) {
              return '<label class="swatch"><input type="radio" name="pdp-variant" value="' + x.id + '"' +
                (x.id === sel.variant ? " checked" : "") + (x.stock <= 0 ? " disabled" : "") + ">" +
                util.esc(x.label) + (x.servings ? "<small>serves " + util.esc(x.servings) + "</small>" : "") +
                "</label>";
            }).join("") + "</div></div>"
          : "") +

        /* Flavour */
        (p.flavours
          ? '<div class="variant-row"><span class="variant-row__label">Flavour</span>' +
            '<div class="swatches">' + p.flavours.map(function (f, i) {
              return '<label class="swatch"><input type="radio" name="pdp-flavour" value="' + util.esc(f) + '"' +
                (i === 0 ? " checked" : "") + ">" + util.esc(f) + "</label>";
            }).join("") + "</div></div>"
          : "") +

        /* Eggless + message for customisable cakes */
        (p.customisable
          ? '<div class="stack stack--sm">' +
            '<label class="check"><input type="checkbox" data-eggless><span><strong>Make it eggless</strong> — no extra charge, same crumb</span></label>' +
            '<div class="field"><label class="field__label" for="pdp-message">Message on cake <span class="field__hint" style="text-transform:none;letter-spacing:0">(piped by hand, free)</span></label>' +
            '<input class="input" id="pdp-message" maxlength="32" placeholder="Happy Birthday, Ananya" data-message>' +
            '<p class="field__hint">Up to 32 characters <span data-msg-count>0/32</span></p></div>' +
            '<div class="msg-preview" data-msg-preview data-empty="Your message appears here"></div>' +
            "</div>"
          : "") +

        /* Add-ons */
        (p.customisable
          ? '<div class="variant-row"><span class="variant-row__label">Add personalisation</span>' +
            '<div class="option-grid">' + data.cakeAddons.slice(0, 6).map(function (a) {
              return '<label class="option"><input type="checkbox" data-addon value="' + a.id + '">' +
                '<span class="option__mark" aria-hidden="true"></span>' +
                '<span class="option__body"><span class="option__title">' + util.esc(a.name) + "</span>" +
                '<span class="option__note">' + (a.price ? "+" + util.money(a.price) : util.esc(a.note || "Free")) +
                "</span></span></label>";
            }).join("") + "</div></div>"
          : "") +

        /* Buy box */
        '<div class="pdp__buybox">' +
          '<div class="pdp__delivery">' +
            '<div class="row row--between"><span class="variant-row__label" style="margin:0">Delivery date</span>' +
              '<span class="badge badge--outline">' + util.esc(p.cutoff) + "</span></div>" +
            '<div class="date-strip" data-pdp-dates></div>' +
            '<div class="field"><label class="field__label" for="pdp-slot">Time slot</label>' +
              '<select class="select" id="pdp-slot" data-slot>' + data.deliverySlots.map(function (s) {
                return '<option value="' + s.id + '"' + (s.id === "evening" ? " selected" : "") + ">" +
                  util.esc(s.label) + (s.note ? " — " + util.esc(s.note) : "") + "</option>";
              }).join("") + "</select></div>" +
          "</div>" +
          '<div class="row row--between row--nowrap">' +
            '<div class="stepper">' +
              '<button type="button" data-pdp-qty="-1" aria-label="Reduce quantity">' + ui.icon("minus") + "</button>" +
              '<input type="number" value="1" min="1" max="30" data-qty-field aria-label="Quantity">' +
              '<button type="button" data-pdp-qty="1" aria-label="Increase quantity">' + ui.icon("plus") + "</button>" +
            "</div>" +
            '<span class="' + (lowStock ? "badge badge--limited" : "faint") + '" style="font-size:var(--fs-xs)" data-stock>' +
              (lowStock ? "Only " + v.stock + " left this week" : "In stock") + "</span>" +
          "</div>" +
          '<div class="pdp__buyrow">' +
            '<button class="btn btn--accent" type="button" data-add-to-cart>Add to cart — <span data-total>' + util.money(v.price) + "</span></button>" +
            '<button class="btn btn--outline pdp__wishbtn" type="button" data-wish="' + p.id + '" ' +
              'aria-pressed="' + (wished ? "true" : "false") + '" aria-label="Add to wishlist">' + ui.icon("heart") + "</button>" +
          "</div>" +
          '<button class="btn btn--outline btn--block" type="button" data-buy-now>Buy now</button>' +
          '<div class="note">' + ui.icon("truck") +
            "<span>Free delivery above ₹999 · Store pickup available at the counter · Cold-chain packed with gel packs</span></div>" +
        "</div>" +

        /* Specification list */
        '<dl class="pdp__meta-list">' +
          "<div><dt>Brand</dt><dd>" + util.esc(p.brandFull) + "</dd></div>" +
          (v.weight ? "<div><dt>Weight / size</dt><dd data-weight>" + util.esc(v.weight) + "</dd></div>" : "") +
          (v.servings ? "<div><dt>Servings</dt><dd data-servings>" + util.esc(v.servings) + " people</dd></div>" : "") +
          (p.cats.indexOf("celebration-cakes") > -1 || p.cats.indexOf("birthday-cakes") > -1 || p.id.indexOf("cake") > -1
            ? "<div><dt>Flour</dt><dd>French T45 Pastry Flour (Zero Bleached Maida)</dd></div>"
            : "") +
          "<div><dt>Shelf life</dt><dd>" + util.esc(p.shelfLife) + "</dd></div>" +
          "<div><dt>Allergens</dt><dd>" + (p.allergens.length ? p.allergens.join(", ") : "None declared") + "</dd></div>" +
          "<div><dt>Category</dt><dd>" + p.catNames.map(function (c, i) {
            return '<a href="shop.html' + util.qs({ cat: p.cats[i] }) + '">' + util.esc(c) + "</a>";
          }).join(", ") + "</dd></div>" +
        "</dl>" +
      "</div>";
    }

    function render() {
      crumbs();
      $("[data-pdp]").innerHTML = galleryMarkup() + infoMarkup();
      renderDates();
      renderTabs();
      renderReviews();
      renderRelated();
      b.renderRecent($("[data-recent-rail]"), $("[data-recent-section]"), p.id);
      injectJsonLd();
      ui.bindTabs();
      ui.reveal();
      SAIPH.app.paintCounts();
      $("[data-sticky-name]").textContent = p.name;
      $("[data-sticky-price]").textContent = util.money(unitPrice());
    }

    function renderDates() {
      b.renderDateStrip($("[data-pdp-dates]"), { leadHours: p.leadHours, name: "pdp-date" });
      var checked = $('[name="pdp-date"]:checked');
      if (checked) sel.date = checked.value;
    }

    function renderTabs() {
      var isCake = p.cats.indexOf("celebration-cakes") > -1 || p.cats.indexOf("birthday-cakes") > -1 || p.id.indexOf("cake") > -1;
      $("[data-pdp-tabs]").hidden = false;
      $("[data-tab-detail]").innerHTML =
        "<p>" + util.esc(p.long) + "</p>" +
        (isCake ? "<p style=\"padding:.6rem .85rem;background:color-mix(in srgb,var(--surface-2) 90%,transparent);border-left:3px solid var(--accent);border-radius:var(--r-xs);font-size:var(--fs-sm);margin:1rem 0\"><strong>Artisan Flour Standard:</strong> Baked exclusively with imported French T45 pastry flour and almond flour — famed in French patisserie for an ultra-fine, velvety crumb with zero commercial bleached maida.</p>" : "") +
        "<h3>Why we make it this way</h3>" +
        "<ul>" + p.tags.map(function (t) {
          return "<li>" + util.esc(t.charAt(0).toUpperCase() + t.slice(1)) + "</li>";
        }).join("") + "</ul>" +
        "<p class=\"muted\" style=\"font-size:var(--fs-sm)\">Made fresh at our Dibrugarh kitchen.</p>";

      var nutHtml = "";
      if (p.nutrition) {
        var n = p.nutrition;
        nutHtml =
          '<div class="nutrition-card">' +
            '<div class="nutrition-card__head">' +
              '<h3 style="font-size:var(--fs-h4);margin:0">Nutritional Information</h3>' +
              '<span class="nutrition-card__serving">' + util.esc(n.servingDesc || ("Per " + n.serving)) + '</span>' +
            '</div>' +
            '<table class="nutrition-table" aria-label="Nutritional facts per 100g">' +
              '<tbody>' +
                '<tr class="is-primary"><td>Energy</td><td>' + n.calories + ' kcal / ' + n.kj + ' kJ</td></tr>' +
                '<tr class="is-primary"><td>Protein</td><td>' + n.protein + ' g</td></tr>' +
                '<tr class="is-primary"><td>Total Carbohydrates</td><td>' + n.carbs + ' g</td></tr>' +
                '<tr class="is-sub"><td>Dietary Fibre</td><td>' + n.fiber + ' g</td></tr>' +
                '<tr class="is-sub"><td>Net Carbohydrates</td><td>' + n.netCarbs + ' g</td></tr>' +
                '<tr class="is-sub"><td>Naturally Occurring Sugars</td><td>' + n.sugar + ' g</td></tr>' +
                '<tr class="is-sub" style="color:var(--success,#2e7d32);font-weight:600"><td>Refined / Added White Sugar</td><td>0 g (Zero)</td></tr>' +
                '<tr class="is-primary"><td>Total Fat</td><td>' + n.fat + ' g</td></tr>' +
                '<tr class="is-sub"><td>Saturated Fatty Acids</td><td>' + n.saturatedFat + ' g</td></tr>' +
                '<tr class="is-sub"><td>Trans Fatty Acids</td><td>0 g (Zero)</td></tr>' +
                '<tr><td>Cholesterol</td><td>' + n.cholesterol + ' mg</td></tr>' +
                '<tr><td>Sodium</td><td>' + n.sodium + ' mg</td></tr>' +
              '</tbody>' +
            '</table>' +
          '</div>';
      }

      $("[data-tab-ingredients]").innerHTML =
        nutHtml +
        '<div class="ingredient-box">' +
          '<h3 style="font-size:var(--fs-h4);margin:0">Pure &amp; Wholesome Ingredients</h3>' +
          '<p class="ingredient-box__list">' + util.esc(p.ingredients) + '</p>' +
          '<div class="ingredient-pillars">' +
            '<div class="pillar-badge"><b>T45 FLOUR</b><span>French T45 Pastry Flour &bull; Zero Maida</span></div>' +
            '<div class="pillar-badge"><b>NO REFINED SUGAR</b><span>Naturally Sweetened</span></div>' +
            '<div class="pillar-badge"><b>GLUTEN-FREE</b><span>Gentle Digestive Formulation</span></div>' +
            '<div class="pillar-badge"><b>100% EGGLESS</b><span>Pure Vegetarian Crumb</span></div>' +
            '<div class="pillar-badge"><b>NO PRESERVATIVES</b><span>Zero Artificial Additives</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="stack stack--sm"><h3 style="font-size:var(--fs-h4)">Allergen declaration</h3>' +
          '<div class="allergen-list">' + (p.allergens.length
            ? p.allergens.map(function (a) { return '<span class="badge badge--outline">' + util.esc(a) + "</span>"; }).join("")
            : '<span class="badge badge--eggless">None declared</span>') + "</div>" +
          '<div class="note note--warn">' + ui.icon("alert") +
          "<span>Our kitchen handles milk, soy, sesame, gluten-free grains, and tree nuts (almonds, cashews, pistachios, hazelnuts). We cannot guarantee an allergen-free environment. For severe allergies, please call our kitchen on +91 98640 00000 before ordering.</span></div></div>" +
        (p.diet.length ? '<div class="row row--tight">' + p.diet.map(function (d) {
          var rec = data.diets.filter(function (x) { return x.id === d; })[0];
          return '<span class="badge badge--eggless">' + util.esc(rec ? rec.name : d) + "</span>";
        }).join("") + "</div>" : "");

      $("[data-tab-storage]").innerHTML =
        '<div class="stack stack--sm"><h3 style="font-size:var(--fs-h4)">Storage instructions</h3>' +
          '<p class="muted">' + util.esc(p.storage) + "</p></div>" +
        '<div class="stack stack--sm"><h3 style="font-size:var(--fs-h4)">Shelf life</h3>' +
          '<p class="muted">' + util.esc(p.shelfLife) + "</p></div>" +
        '<div class="note">' + ui.icon("thermometer") +
        "<span>Cream, ganache and glazed items travel in insulated boxes with gel packs. Refrigerate within 30 minutes of delivery.</span></div>";

      $("[data-tab-delivery]").innerHTML =
        '<div class="stack stack--sm"><h3 style="font-size:var(--fs-h4)">Lead time &amp; cutoff</h3>' +
          '<p class="muted">' + util.esc(p.cutoff) + ". " +
          (p.leadHours ? "This item needs " + p.leadHours + " hours' notice." : "Ships same day when ordered before 4:00 PM.") + "</p></div>" +
        '<div class="stack stack--sm"><h3 style="font-size:var(--fs-h4)">Where we deliver</h3>' +
          '<div class="row row--tight">' + data.deliveryCities.map(function (c) {
            return '<span class="badge badge--outline">' + util.esc(c) + "</span>";
          }).join("") + "</div>" +
          '<p class="muted" style="font-size:var(--fs-sm)">Khowdy packaged products ship pan-India in 3–6 working days. Fresh cakes and pastries are limited to the cities above.</p></div>' +
        '<div class="stack stack--sm"><h3 style="font-size:var(--fs-h4)">Slots</h3>' +
          '<div class="row row--tight">' + data.deliverySlots.map(function (s) {
            return '<span class="badge badge--outline">' + util.esc(s.label) + "</span>";
          }).join("") + "</div></div>" +
        '<div class="note">' + ui.icon("store") + "<span>Prefer to collect? Choose store pickup at checkout — no delivery charge, and your order is held at the counter for two hours after your slot.</span></div>";
    }

    function renderReviews() {
      var list = query.reviewsFor(p.id);
      var section = $("[data-reviews-section]");
      section.hidden = false;

      var dist = [5, 4, 3, 2, 1].map(function (n) {
        var c = list.filter(function (r) { return r.rating === n; }).length;
        return { n: n, c: c };
      });
      var total = list.length || 1;

      $("[data-review-summary]").innerHTML =
        '<div class="review-summary">' +
          '<div class="review-summary__score">' +
            "<b>" + p.rating.toFixed(1) + "</b>" +
            ui.stars(p.rating) +
            '<span class="faint" style="font-size:var(--fs-xs)">' + p.reviews.toLocaleString("en-IN") + " reviews</span>" +
          "</div>" +
          '<div class="review-bars">' + dist.map(function (d) {
            var pct = Math.round((d.c / total) * 100);
            return '<div class="review-bar"><span>' + d.n + " ★</span>" +
              '<span class="review-bar__track"><span class="review-bar__fill" style="width:' + pct + '%"></span></span>' +
              "<span>" + pct + "%</span></div>";
          }).join("") + "</div>" +
        "</div>";

      $("[data-review-list]").innerHTML = list.length
        ? list.map(function (r) {
          return '<article class="review">' +
            '<div class="review__head">' +
              '<span class="rating">' + ui.stars(r.rating) + "</span>" +
              '<span class="review__name">' + util.esc(r.name) + "</span>" +
              (r.verified ? '<span class="review__verified">' + ui.icon("checkCircle") + "Verified purchase</span>" : "") +
              '<span class="review__date">' + util.fmtDate(r.date) + " · " + util.esc(r.city) + "</span>" +
            "</div>" +
            '<h3 class="review__title">' + util.esc(r.title) + "</h3>" +
            '<p class="review__text">' + util.esc(r.text) + "</p>" +
            (r.photos ? '<div class="review__photos">' + Array.apply(null, Array(r.photos)).map(function (_, i) {
              return ui.media(p, { ratio: "square", seed: p.id + "-rev-" + r.name + i });
            }).join("") + "</div>" : "") +
          "</article>";
        }).join("")
        : '<div class="empty-state">' + ui.icon("message") + "<h3>No written reviews yet</h3>" +
          '<p class="muted" style="font-size:var(--fs-sm)">This one is rated ' + p.rating.toFixed(1) +
          " by " + p.reviews.toLocaleString("en-IN") + " customers. Be the first to write about it.</p>" +
          '<button class="btn btn--sm btn--outline" type="button" data-write-review>Write a review</button></div>';
    }

    function renderRelated() {
      var rel = query.related(p.id, 4);
      if (!rel.length) return;
      $("[data-related-section]").hidden = false;
      $("[data-related]").innerHTML = ui.productGrid(rel);
    }

    function injectJsonLd() {
      var v = variant();
      var reviewList = query.reviewsFor(p.id).slice(0, 5);
      var node = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: p.long,
        sku: p.id.toUpperCase(),
        brand: { "@type": "Brand", name: p.brandFull },
        category: p.catNames.join(" > "),
        image: [ORIGIN + "/assets/img/og-cover.svg"],

        offers: p.variants.map(function (x) {
          return {
            "@type": "Offer",
            name: x.label,
            price: x.price,
            priceCurrency: "INR",
            availability: x.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: ORIGIN + "/product.html?id=" + p.id,
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@type": "Organization", name: "SAiPH Bakes" }
          };
        }),

        additionalProperty: [
          { "@type": "PropertyValue", name: "Weight", value: v.weight || "n/a" },
          { "@type": "PropertyValue", name: "Allergens", value: p.allergens.join(", ") || "None declared" },
          { "@type": "PropertyValue", name: "Shelf life", value: p.shelfLife }
        ]
      };
      /* Rating and review markup is only emitted once the underlying review
         data is real. Publishing invented aggregateRating or Review nodes
         breaks Google's structured-data policy and earns a manual action. */
      if (data.company.rating.verified) {
        node.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: p.rating,
          reviewCount: p.reviews,
          bestRating: 5
        };
        node.review = reviewList.map(function (r) {
          return {
            "@type": "Review",
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
            author: { "@type": "Person", name: r.name },
            datePublished: r.date,
            name: r.title,
            reviewBody: r.text
          };
        });
      }

      var breadcrumbNode = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN + "/" },
          { "@type": "ListItem", position: 2, name: "Shop", item: ORIGIN + "/shop.html" },
          { "@type": "ListItem", position: 3, name: p.name }
        ]
      };
      ["pdp-jsonld", "pdp-crumb-jsonld"].forEach(function (elId, i) {
        var s = doc.getElementById(elId) || doc.createElement("script");
        s.id = elId;
        s.type = "application/ld+json";
        s.textContent = JSON.stringify(i === 0 ? node : breadcrumbNode);
        doc.head.appendChild(s);
      });
    }

    /* ------------------------------ Pricing ------------------------------ */
    function repaintPrice() {
      var v = variant();
      var unit = unitPrice();
      var save = v.mrp && v.mrp > v.price ? Math.round(((v.mrp - v.price) / v.mrp) * 100) : 0;
      var priceEl = $("[data-price]");
      if (priceEl) {
        priceEl.innerHTML = util.money(v.price) +
          (v.mrp ? "<del>" + util.money(v.mrp) + "</del>" : "") +
          (save ? '<span class="save">Save ' + save + "%</span>" : "");
      }
      var totalEl = $("[data-total]");
      if (totalEl) totalEl.textContent = util.money(unit * sel.qty);
      var label = $("[data-variant-label]");
      if (label) label.textContent = v.label;
      var w = $("[data-weight]");
      if (w) w.textContent = v.weight;
      var s = $("[data-servings]");
      if (s) s.textContent = v.servings + " people";
      var stock = $("[data-stock]");
      if (stock) {
        var low = v.stock <= 6;
        stock.className = low ? "badge badge--limited" : "faint";
        stock.style.fontSize = "var(--fs-xs)";
        stock.textContent = low ? "Only " + v.stock + " left this week" : "In stock";
      }
      $("[data-sticky-price]").textContent = util.money(unit * sel.qty);
    }

    function addToCart(opts) {
      opts = opts || {};
      var line = store.cart.add({
        id: p.id,
        variant: sel.variant,
        flavour: sel.flavour,
        eggless: sel.eggless,
        message: sel.message || null,
        addons: sel.addons.slice(),
        qty: sel.qty,
        custom: sel.date ? { date: sel.date, slot: sel.slot } : null
      });
      if (opts.buyNow) {
        global.location.href = "checkout.html";
        return line;
      }
      ui.toast({
        title: "Added to cart",
        note: p.name + " · " + variant().label + (sel.qty > 1 ? " × " + sel.qty : ""),
        product: p,
        action: { href: "checkout.html", label: "Checkout" }
      });
      return line;
    }

    /* ------------------------------- Events ------------------------------ */
    doc.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "pdp-variant") { sel.variant = t.value; repaintPrice(); return; }
      if (t.name === "pdp-flavour") { sel.flavour = t.value; return; }
      if (t.name === "pdp-date") { sel.date = t.value; return; }
      if (t.closest("[data-slot]")) { sel.slot = t.value; return; }
      if (t.closest("[data-eggless]")) { sel.eggless = t.checked; return; }
      if (t.closest("[data-addon]")) {
        var v = t.value;
        if (t.checked) sel.addons.push(v);
        else sel.addons = sel.addons.filter(function (x) { return x !== v; });
        repaintPrice();
        return;
      }
      if (t.closest("[data-qty-field]")) {
        sel.qty = util.clamp(parseInt(t.value, 10) || 1, 1, 30);
        t.value = sel.qty;
        repaintPrice();
      }
    });

    doc.addEventListener("input", function (e) {
      var msg = e.target.closest("[data-message]");
      if (!msg) return;
      sel.message = msg.value;
      $("[data-msg-preview]").textContent = msg.value;
      $("[data-msg-count]").textContent = msg.value.length + "/32";
    });

    doc.addEventListener("click", function (e) {
      var qtyBtn = e.target.closest("[data-pdp-qty]");
      if (qtyBtn) {
        sel.qty = util.clamp(sel.qty + parseInt(qtyBtn.dataset.pdpQty, 10), 1, 30);
        $("[data-qty-field]").value = sel.qty;
        repaintPrice();
        return;
      }
      var thumb = e.target.closest("[data-thumb]");
      if (thumb) {
        sel.image = parseInt(thumb.dataset.thumb, 10);
        var motifs = [ui.motifFor(p), "chocolate", "tart", "hamper"];
        var main = $("[data-gallery-main]");
        main.classList.remove("is-zoomed");
        main.querySelector(".media").outerHTML =
          ui.media(p, { ratio: "square", seed: p.id + "-" + sel.image, motif: motifs[sel.image] });
        $$("[data-thumb]").forEach(function (x) {
          x.setAttribute("aria-selected", x === thumb ? "true" : "false");
        });
        return;
      }
      var main2 = e.target.closest("[data-gallery-main]");
      if (main2) {
        main2.classList.toggle("is-zoomed");
        return;
      }
      if (e.target.closest("[data-add-to-cart]")) { addToCart(); return; }
      if (e.target.closest("[data-sticky-add]")) { addToCart(); return; }
      if (e.target.closest("[data-buy-now]")) { addToCart({ buyNow: true }); return; }
      if (e.target.closest("[data-write-review]")) { openReviewForm(); return; }
    });

    /* Zoom follows the pointer for a loupe feel */
    doc.addEventListener("mousemove", function (e) {
      var main = e.target.closest(".gallery__main.is-zoomed");
      if (!main) return;
      var r = main.getBoundingClientRect();
      main.style.setProperty("--ox", ((e.clientX - r.left) / r.width) * 100 + "%");
      main.style.setProperty("--oy", ((e.clientY - r.top) / r.height) * 100 + "%");
    });

    /* Sticky mobile bar appears once the buy box scrolls away */
    var stickyBar = $("[data-sticky-buy]");
    global.addEventListener("scroll", function () {
      var box = $(".pdp__buybox");
      if (!box) return;
      var past = box.getBoundingClientRect().bottom < 0;
      stickyBar.classList.toggle("is-visible", past);
    }, { passive: true });

    function openReviewForm() {
      ui.modal(
        '<div style="padding:clamp(1.5rem,1rem+2vw,2.5rem)">' +
          '<span class="eyebrow">Write a review</span>' +
          "<h3 style=\"margin:.35rem 0 1.25rem\">" + util.esc(p.name) + "</h3>" +
          '<form class="stack" data-form="review" data-success="#review-thanks">' +
            '<div class="field"><label class="field__label" for="rv-rating">Your rating <span class="req">*</span></label>' +
              '<select class="select" id="rv-rating" required>' +
                '<option value="5">5 — Exceptional</option><option value="4">4 — Very good</option>' +
                '<option value="3">3 — Fine</option><option value="2">2 — Disappointing</option>' +
                '<option value="1">1 — Poor</option></select></div>' +
            '<div class="field"><label class="field__label" for="rv-title">Headline <span class="req">*</span></label>' +
              '<input class="input" id="rv-title" required maxlength="60" placeholder="Worth every rupee">' +
              '<p class="field__error">Add a short headline.</p></div>' +
            '<div class="field"><label class="field__label" for="rv-text">Your review <span class="req">*</span></label>' +
              '<textarea class="textarea" id="rv-text" required placeholder="What did you order, and how was it?"></textarea>' +
              '<p class="field__error">Tell us a little about it.</p></div>' +
            '<div class="field-grid">' +
              '<div class="field"><label class="field__label" for="rv-name">Name <span class="req">*</span></label>' +
                '<input class="input" id="rv-name" required autocomplete="name"><p class="field__error">Your name, please.</p></div>' +
              '<div class="field"><label class="field__label" for="rv-city">City</label>' +
                '<input class="input" id="rv-city" autocomplete="address-level2"></div>' +
            "</div>" +
            '<button class="btn btn--accent" type="submit">Submit review</button>' +
            '<p class="field__hint">Reviews appear after moderation, usually within a day.</p>' +
          "</form>" +
          '<div id="review-thanks" hidden class="note note--ok" style="margin-top:1rem">' + ui.icon("checkCircle") +
            "<span><strong>Thank you.</strong> Your review has been submitted for moderation.</span></div>" +
        "</div>",
        { size: "sm", label: "Write a review", brand: p.theme }
      );
      /* The freshly injected form needs the global validator bound to it. */
      var form = doc.querySelector('#saiph-modal [data-form="review"]');
      if (form) bindLateForm(form);
    }

    function bindLateForm(form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true;
        $$("[required]", form).forEach(function (input) {
          var field = input.closest(".field");
          var valid = String(input.value).trim().length > 0;
          if (!valid) ok = false;
          if (field) field.classList.toggle("has-error", !valid);
        });
        if (!ok) return;
        var btn = form.querySelector('[type="submit"]');
        btn.classList.add("btn--loading");
        setTimeout(function () {
          btn.classList.remove("btn--loading");
          form.hidden = true;
          doc.getElementById("review-thanks").hidden = false;
          ui.toast({ title: "Review submitted", note: "Thank you — it appears after moderation.", variant: "success" });
        }, 700);
      });
    }

    render();
  };
})(typeof window !== "undefined" ? window : this);

/* ==========================================================================
   SAiPH Bakes — Cake studio controller
   Live-priced custom cake builder: occasion → base → size → flavour → message
   → add-ons → reference → date/slot → instructions → cart.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.cakes = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    var bases = data.products.filter(function (p) {
      return p.customisable && p.sizeSet === "cake";
    });

    var build = {
      occasion: util.param("occasion") || "birthday",
      base: bases[0].id,
      size: bases[0].variants[1] ? bases[0].variants[1].id : bases[0].variants[0].id,
      flavour: null,
      eggless: false,
      message: "",
      addons: [],
      reference: null,
      date: "",
      slot: "evening",
      instructions: ""
    };

    function baseProduct() { return query.byId(build.base); }
    function variant() {
      var p = baseProduct();
      return p.variants.filter(function (v) { return v.id === build.size; })[0] || p.variants[0];
    }
    function addonRecords() {
      return build.addons.map(function (id) {
        return data.cakeAddons.filter(function (a) { return a.id === id; })[0];
      }).filter(Boolean);
    }
    function total() {
      var slotFee = build.slot === "midnight" ? 199 : 0;
      return variant().price + addonRecords().reduce(function (n, a) { return n + a.price; }, 0) + slotFee;
    }

    /* ------------------------------- Render ------------------------------- */
    function renderOccasions() {
      $("[data-occasions]").innerHTML = data.occasions.map(function (o) {
        return '<label class="option option--center"><input type="radio" name="occasion" value="' + o.id + '"' +
          (o.id === build.occasion ? " checked" : "") + ">" +
          '<span class="option__icon" aria-hidden="true">' + o.icon + "</span>" +
          '<span class="option__body"><span class="option__title">' + util.esc(o.name) + "</span></span></label>";
      }).join("");
    }

    function renderBases() {
      $("[data-bases]").innerHTML = bases.map(function (p) {
        return '<label class="swatch" style="min-width:9rem"><input type="radio" name="base" value="' + p.id + '"' +
          (p.id === build.base ? " checked" : "") + ">" + util.esc(p.name) +
          "<small>from " + util.money(p.priceFrom) + "</small></label>";
      }).join("");
      var p = baseProduct();
      $("[data-base-note]").textContent = p.desc + " " + p.brandFull + ".";
    }

    function renderSizes() {
      var p = baseProduct();
      $("[data-sizes]").innerHTML = p.variants.map(function (v) {
        return '<label class="swatch"><input type="radio" name="size" value="' + v.id + '"' +
          (v.id === build.size ? " checked" : "") + ">" + util.esc(v.label) +
          "<small>serves " + util.esc(v.servings) + " · " + util.money(v.price) + "</small></label>";
      }).join("");
    }

    function renderFlavours() {
      var p = baseProduct();
      var list = p.flavours || data.flavourSets.doughremi;
      if (!build.flavour || list.indexOf(build.flavour) === -1) build.flavour = list[0];
      $("[data-flavours]").innerHTML = list.map(function (f) {
        return '<label class="swatch" style="min-width:9rem"><input type="radio" name="flavour" value="' + util.esc(f) + '"' +
          (f === build.flavour ? " checked" : "") + ">" + util.esc(f) + "</label>";
      }).join("");
    }

    function renderAddons() {
      $("[data-addons]").innerHTML = data.cakeAddons.map(function (a) {
        var free = !a.price;
        return '<label class="option"><input type="checkbox" name="addon" value="' + a.id + '"' +
          (build.addons.indexOf(a.id) > -1 ? " checked" : "") + (free ? " checked disabled" : "") + ">" +
          '<span class="option__mark" aria-hidden="true"></span>' +
          '<span class="option__body"><span class="option__title">' + util.esc(a.name) + "</span>" +
          '<span class="option__note">' + (a.price ? "+" + util.money(a.price) : util.esc(a.note || "Included")) +
          "</span></span></label>";
      }).join("");
    }

    function renderDates() {
      var p = baseProduct();
      b.renderDateStrip($("[data-dates]"), { leadHours: p.leadHours, name: "cake-date" });
      var checked = $('[name="cake-date"]:checked');
      build.date = checked ? checked.value : "";
      b.renderSlots($("[data-slots]"), { name: "cake-slot" });
      var leadNote = $("[data-lead-note] span");
      var hrs = p.leadHours;
      leadNote.innerHTML = "<strong>" + util.esc(p.cutoff) + ".</strong> " +
        (hrs >= 48
          ? "Signature builds need two clear days — earlier dates are greyed out."
          : "Same-day is possible before the cutoff, but a day's notice gets you the best of the kitchen.");
    }

    function renderPreview() {
      var p = baseProduct();
      var v = variant();
      var occ = data.occasions.filter(function (o) { return o.id === build.occasion; })[0];

      $("[data-preview-art]").innerHTML = ui.art("cake-" + build.base + "-" + build.size,
        p.art, ui.motifFor(p));
      $("[data-preview-name]").textContent = p.name + (build.eggless ? " (Eggless)" : "");

      var rows = [
        ["Occasion", occ ? occ.name : "—"],
        ["Size", v.label + " · serves " + v.servings],
        ["Flavour", build.flavour || "—"],
        ["Base", build.eggless ? "Eggless" : "Classic"],
        ["Message", build.message ? "“" + build.message + "”" : "None"],
        ["Delivery", build.date ? util.fmtDate(build.date) : "Choose a date"],
        ["Slot", (data.deliverySlots.filter(function (s) { return s.id === build.slot; })[0] || {}).label || "—"]
      ];
      var addons = addonRecords();
      if (addons.length) rows.push(["Add-ons", addons.map(function (a) { return a.name; }).join(", ")]);
      if (build.reference) rows.push(["Reference", build.reference]);

      $("[data-preview-spec]").innerHTML = rows.map(function (r) {
        return "<div><dt>" + util.esc(r[0]) + "</dt><dd>" + util.esc(r[1]) + "</dd></div>";
      }).join("");

      $("[data-preview-total]").textContent = util.money(total());
    }

    function renderAll() {
      renderOccasions();
      renderBases();
      renderSizes();
      renderFlavours();
      renderAddons();
      renderDates();
      renderPreview();
    }

    /* ------------------------------- Events ------------------------------- */
    doc.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "occasion") { build.occasion = t.value; renderPreview(); return; }
      if (t.name === "base") {
        build.base = t.value;
        var p = baseProduct();
        if (!p.variants.filter(function (v) { return v.id === build.size; }).length) {
          build.size = p.variants[1] ? p.variants[1].id : p.variants[0].id;
        }
        build.flavour = null;
        renderBases();
        renderSizes();
        renderFlavours();
        renderDates();
        renderPreview();
        return;
      }
      if (t.name === "size") { build.size = t.value; renderSizes(); renderPreview(); return; }
      if (t.name === "flavour") { build.flavour = t.value; renderPreview(); return; }
      if (t.name === "cake-date") { build.date = t.value; renderPreview(); return; }
      if (t.name === "cake-slot") { build.slot = t.value; renderPreview(); return; }
      if (t.closest("[data-eggless]")) { build.eggless = t.checked; renderPreview(); return; }
      if (t.name === "addon") {
        if (t.disabled) return;
        if (t.checked) build.addons.push(t.value);
        else build.addons = build.addons.filter(function (x) { return x !== t.value; });
        renderPreview();
        return;
      }
      if (t.closest("[data-reference]")) {
        var file = t.files && t.files[0];
        build.reference = file ? file.name : null;
        var prev = $("[data-ref-preview]");
        if (file) {
          var url = URL.createObjectURL(file);
          prev.innerHTML = '<div class="note note--ok">' + ui.icon("checkCircle") +
            "<span><strong>" + util.esc(file.name) + "</strong> attached (" +
            Math.round(file.size / 1024) + " KB). Our studio will match the spirit of it.</span></div>" +
            '<div class="media media--landscape" style="border-radius:var(--r-md);margin-top:.75rem">' +
            '<img src="' + url + '" alt="Your reference image"></div>';
        } else prev.innerHTML = "";
        renderPreview();
        return;
      }
    });

    doc.addEventListener("input", function (e) {
      var msg = e.target.closest("[data-message]");
      if (msg) {
        build.message = msg.value;
        $("[data-msg-count]").textContent = msg.value.length;
        $("[data-msg-preview]").textContent = msg.value;
        renderPreview();
        return;
      }
      var notes = e.target.closest("[data-instructions]");
      if (notes) { build.instructions = notes.value; }
    });

    doc.addEventListener("click", function (e) {
      var add = e.target.closest("[data-add-cake]");
      var go = e.target.closest("[data-checkout-cake]");
      if (!add && !go) return;

      if (!build.date) {
        ui.toast({ title: "Pick a delivery date", note: "Scroll to step 8 to choose your date and slot.", variant: "error", icon: "calendar" });
        $("[data-dates]").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      var occ = data.occasions.filter(function (o) { return o.id === build.occasion; })[0];
      store.cart.addCustomCake({
        baseId: build.base,
        variant: build.size,
        flavour: build.flavour,
        message: build.message,
        addons: build.addons.slice(),
        eggless: build.eggless,
        occasion: occ ? occ.name : build.occasion,
        date: build.date,
        slot: build.slot,
        reference: build.reference,
        instructions: build.instructions
      });

      if (go) { global.location.href = "checkout.html"; return; }
      ui.toast({
        title: "Custom cake added",
        note: baseProduct().name + " · " + variant().label + " · " + util.fmtDate(build.date),
        product: baseProduct(),
        action: { href: "checkout.html", label: "Checkout" }
      });
    });

    /* -------------------------- Supporting blocks ------------------------- */
    $("[data-cake-grid]").innerHTML = ui.productGrid(
      query.byCat("celebration-cakes").concat(query.byCat("birthday-cakes"))
        .filter(function (p, i, arr) { return arr.indexOf(p) === i; })
        .slice(0, 4)
    );

    b.renderFaqs($("[data-cake-faq]"), [
      data.faqs[0], data.faqs[1], data.faqs[3], data.faqs[4], data.faqs[7]
    ]);

    renderAll();
    ui.bindAccordions();
    ui.reveal();
    SAIPH.app.paintCounts();
  };
})(typeof window !== "undefined" ? window : this);

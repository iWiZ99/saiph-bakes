/* ==========================================================================
   SAiPH Bakes — Catalogue controller
   URL-driven filter state so every filtered view is linkable, shareable and
   crawlable (?cat=, ?brand=, ?occasion=, ?diet=, ?badge=, ?q=, ?min=, ?max=,
   ?date=, ?sort=, ?page=).
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.shop = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var query = SAIPH.query;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    var PER_PAGE = 12;
    var priceBounds = bounds();

    var state = readState();

    /* ------------------------------ State -------------------------------- */
    function bounds() {
      var prices = data.products.map(function (p) { return p.priceFrom; });
      return { min: 0, max: Math.ceil(Math.max.apply(null, prices) / 500) * 500 };
    }

    function list(v) { return v ? String(v).split(",").filter(Boolean) : []; }

    function readState() {
      var p = util.params();
      return {
        q: p.q || "",
        cat: list(p.cat),
        brand: list(p.brand),
        occasion: list(p.occasion),
        diet: list(p.diet),
        badge: list(p.badge),
        min: p.min ? parseInt(p.min, 10) : priceBounds.min,
        max: p.max ? parseInt(p.max, 10) : priceBounds.max,
        date: p.date || "",
        sort: p.sort || "featured",
        page: Math.max(1, parseInt(p.page || "1", 10)),
        layout: p.layout || "grid",
        pickup: p.pickup || ""
      };
    }

    function writeState(opts) {
      opts = opts || {};
      var qs = util.qs({
        q: state.q,
        cat: state.cat,
        brand: state.brand,
        occasion: state.occasion,
        diet: state.diet,
        badge: state.badge,
        min: state.min !== priceBounds.min ? state.min : "",
        max: state.max !== priceBounds.max ? state.max : "",
        date: state.date,
        sort: state.sort !== "featured" ? state.sort : "",
        page: state.page > 1 ? state.page : "",
        layout: state.layout !== "grid" ? state.layout : "",
        pickup: state.pickup
      });
      var url = global.location.pathname + qs;
      if (opts.replace) global.history.replaceState(state, "", url);
      else global.history.pushState(state, "", url);
    }

    /* ----------------------------- Filtering ----------------------------- */
    function apply() {
      var out = state.q ? query.search(state.q, 200) : data.products.slice();

      if (state.cat.length) {
        out = out.filter(function (p) {
          return state.cat.some(function (c) { return p.cats.indexOf(c) > -1; });
        });
      }
      if (state.brand.length) {
        out = out.filter(function (p) { return state.brand.indexOf(p.brand) > -1; });
      }
      if (state.occasion.length) {
        out = out.filter(function (p) {
          return state.occasion.some(function (o) { return p.occasions.indexOf(o) > -1; });
        });
      }
      if (state.diet.length) {
        out = out.filter(function (p) {
          return state.diet.every(function (d) { return p.diet.indexOf(d) > -1; });
        });
      }
      if (state.badge.length) {
        out = out.filter(function (p) {
          return state.badge.some(function (x) { return p.badges.indexOf(x) > -1; });
        });
      }
      out = out.filter(function (p) {
        return p.priceFrom >= state.min && p.priceFrom <= state.max;
      });
      /* A delivery date filters out anything whose lead time cannot make it. */
      if (state.date) {
        var days = Math.max(0, Math.round((new Date(state.date + "T00:00:00") - startOfToday()) / 86400000));
        out = out.filter(function (p) { return Math.ceil(p.leadHours / 24) <= days; });
      }
      return sort(out);
    }

    function startOfToday() {
      var d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    }

    function sort(out) {
      var by = state.sort;
      if (by === "price-asc") return out.sort(function (a, c) { return a.priceFrom - c.priceFrom; });
      if (by === "price-desc") return out.sort(function (a, c) { return c.priceFrom - a.priceFrom; });
      if (by === "rating") return out.sort(function (a, c) { return c.rating - a.rating || c.reviews - a.reviews; });
      if (by === "bestselling") return out.sort(function (a, c) { return c.reviews - a.reviews; });
      if (by === "az") return out.sort(function (a, c) { return a.name.localeCompare(c.name); });
      if (by === "newest") {
        return out.sort(function (a, c) {
          return (c.badges.indexOf("NEW") > -1) - (a.badges.indexOf("NEW") > -1) || c.rating - a.rating;
        });
      }
      /* featured: badge weight, then rating */
      var weight = function (p) {
        return (p.badges.indexOf("BESTSELLER") > -1 ? 4 : 0) +
          (p.badges.indexOf("SIGNATURE") > -1 ? 2 : 0) +
          (p.badges.indexOf("NEW") > -1 ? 1 : 0);
      };
      return out.sort(function (a, c) { return weight(c) - weight(a) || c.rating - a.rating; });
    }

    /* ---------------------------- Filter UI ------------------------------ */
    function countFor(kind, id) {
      var probe = JSON.parse(JSON.stringify(state));
      probe.page = 1;
      var saved = state;
      state = probe;
      state[kind] = [id];
      var n = apply().length;
      state = saved;
      return n;
    }

    function group(title, key, items, opts) {
      opts = opts || {};
      var open = opts.open || state[key] && state[key].length;
      return '<div class="filter-group' + (open ? " is-open" : "") + '">' +
        '<button class="filter-group__btn" type="button" aria-expanded="' + (open ? "true" : "false") + '">' +
          util.esc(title) + '<i aria-hidden="true"></i></button>' +
        '<div class="filter-group__panel">' +
          items.map(function (it) {
            var on = (state[key] || []).indexOf(it.id) > -1;
            return '<label class="check"><input type="checkbox" data-filter="' + key + '" value="' + it.id + '"' +
              (on ? " checked" : "") + "><span>" + util.esc(it.name) +
              ' <span class="filter-count">(' + it.count + ")</span></span></label>";
          }).join("") +
        "</div>" +
      "</div>";
    }

    function filterMarkup() {
      var brandItems = data.brands.filter(function (x) { return x.id !== "saiph"; }).map(function (x) {
        return { id: x.id, name: x.name, count: query.byBrand(x.id).length };
      });
      var catItems = data.categories.map(function (c) {
        return { id: c.id, name: c.name, count: query.catCount(c.id) };
      }).filter(function (c) { return c.count > 0; });
      var occItems = data.occasions.map(function (o) {
        return { id: o.id, name: o.name, count: query.byOccasion(o.id).length };
      }).filter(function (o) { return o.count > 0; });
      var dietItems = data.diets.map(function (d) {
        return {
          id: d.id, name: d.name,
          count: data.products.filter(function (p) { return p.diet.indexOf(d.id) > -1; }).length
        };
      }).filter(function (d) { return d.count > 0; });
      var badgeItems = ["BESTSELLER", "NEW", "SIGNATURE", "LIMITED EDITION"].map(function (x) {
        return { id: x, name: x === "LIMITED EDITION" ? "Limited Edition" : x.charAt(0) + x.slice(1).toLowerCase(), count: query.byBadge(x).length };
      }).filter(function (x) { return x.count > 0; });

      var dates = util.dates(8, 0);

      return group("Brand", "brand", brandItems, { open: true }) +
        group("Category", "cat", catItems, { open: true }) +
        group("Occasion", "occasion", occItems) +
        group("Dietary preference", "diet", dietItems) +
        group("Availability", "badge", badgeItems) +
        '<div class="filter-group is-open">' +
          '<button class="filter-group__btn" type="button" aria-expanded="true">Price<i aria-hidden="true"></i></button>' +
          '<div class="filter-group__panel"><div class="range">' +
            '<input type="range" min="' + priceBounds.min + '" max="' + priceBounds.max + '" step="100" value="' + state.max + '" data-price-range aria-label="Maximum price">' +
            '<div class="range__inputs">' +
              '<input class="input" type="number" inputmode="numeric" value="' + state.min + '" min="' + priceBounds.min + '" max="' + priceBounds.max + '" data-price-min aria-label="Minimum price">' +
              '<span class="faint">to</span>' +
              '<input class="input" type="number" inputmode="numeric" value="' + state.max + '" min="' + priceBounds.min + '" max="' + priceBounds.max + '" data-price-max aria-label="Maximum price">' +
            "</div>" +
            '<p class="field__hint">Showing ' + util.money(state.min) + " – " + util.money(state.max) + "</p>" +
          "</div></div>" +
        "</div>" +
        '<div class="filter-group' + (state.date ? " is-open" : "") + '">' +
          '<button class="filter-group__btn" type="button" aria-expanded="' + (state.date ? "true" : "false") + '">Delivery date<i aria-hidden="true"></i></button>' +
          '<div class="filter-group__panel"><div class="stack stack--sm">' +
            '<p class="field__hint">Only show what can reach you on:</p>' +
            '<select class="select" data-date-filter>' +
              '<option value="">Any date</option>' +
              dates.map(function (d) {
                return '<option value="' + d.iso + '"' + (state.date === d.iso ? " selected" : "") + ">" + d.label + "</option>";
              }).join("") +
            "</select>" +
          "</div></div>" +
        "</div>";
    }

    /* --------------------------- Active chips ---------------------------- */
    function chipsMarkup() {
      var chips = [];
      if (state.q) chips.push({ label: "“" + state.q + "”", kind: "q", id: state.q });
      state.brand.forEach(function (id) {
        var r = query.brandById(id);
        chips.push({ label: r ? r.name : id, kind: "brand", id: id });
      });
      state.cat.forEach(function (id) {
        var r = query.catById(id);
        chips.push({ label: r ? r.name : id, kind: "cat", id: id });
      });
      state.occasion.forEach(function (id) {
        var r = data.occasions.filter(function (o) { return o.id === id; })[0];
        chips.push({ label: r ? r.name : id, kind: "occasion", id: id });
      });
      state.diet.forEach(function (id) {
        var r = data.diets.filter(function (d) { return d.id === id; })[0];
        chips.push({ label: r ? r.name : id, kind: "diet", id: id });
      });
      state.badge.forEach(function (id) { chips.push({ label: id, kind: "badge", id: id }); });
      if (state.min !== priceBounds.min || state.max !== priceBounds.max) {
        chips.push({ label: util.money(state.min) + " – " + util.money(state.max), kind: "price", id: "price" });
      }
      if (state.date) chips.push({ label: "Delivers " + util.fmtDate(state.date), kind: "date", id: state.date });
      if (state.pickup) {
        var s = query.storeById(state.pickup);
        chips.push({ label: "Pickup: " + (s ? s.name.replace("SAiPH Bakes — ", "") : state.pickup), kind: "pickup", id: state.pickup });
      }
      if (!chips.length) return "";
      return chips.map(function (c) {
        return '<button class="chip is-active" type="button" data-chip-kind="' + c.kind + '" data-chip-id="' +
          util.esc(c.id) + '">' + util.esc(c.label) + '<span class="chip__x" aria-hidden="true">×</span>' +
          '<span class="sr-only">Remove filter</span></button>';
      }).join("") + '<button class="chip" type="button" data-clear-filters>Clear all</button>';
    }

    /* ------------------------------ Render ------------------------------- */
    function headline() {
      var titleEl = $("[data-shop-title]");
      var eyebrowEl = $("[data-shop-eyebrow]");
      var blurbEl = $("[data-shop-blurb]");
      var crumb = $("[data-crumb-current]");
      if (!titleEl) return;

      var title = "Shop All", eyebrow = "The Full Catalogue", blurb = blurbEl.dataset.default || blurbEl.textContent;
      blurbEl.dataset.default = blurb;

      if (state.q) {
        eyebrow = "Search";
        title = "Results for “" + state.q + "”";
        blurb = "Matches across all three brands, ranked by relevance.";
      } else if (state.cat.length === 1) {
        var c = query.catById(state.cat[0]);
        if (c) {
          eyebrow = "Category";
          title = c.name;
          blurb = c.blurb + " Filter by brand, occasion, diet and price, or set a delivery date to see only what can arrive in time.";
        }
      } else if (state.brand.length === 1) {
        var br = query.brandById(state.brand[0]);
        if (br) {
          eyebrow = br.tag;
          title = br.name;
          blurb = br.desc;
        }
      } else if (state.occasion.length === 1) {
        var o = data.occasions.filter(function (x) { return x.id === state.occasion[0]; })[0];
        if (o) {
          eyebrow = "Occasion";
          title = o.name + " Collection";
          blurb = "Everything from our three kitchens suited to a " + o.name.toLowerCase() + ", with personalisation and slot-timed delivery.";
        }
      } else if (state.badge.length === 1) {
        eyebrow = "Collection";
        title = state.badge[0] === "BESTSELLER" ? "Bestsellers" :
          state.badge[0] === "NEW" ? "New Arrivals" :
          state.badge[0] === "SIGNATURE" ? "The Signature Collection" : "Limited Editions";
        blurb = "Hand-picked and ranked by what our customers keep coming back for.";
      }

      titleEl.textContent = title;
      eyebrowEl.textContent = eyebrow;
      blurbEl.textContent = blurb;
      if (crumb) crumb.textContent = title;
      doc.title = title + " | SAiPH Bakes";
    }

    function render(opts) {
      opts = opts || {};
      var results = apply();
      var pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
      if (state.page > pages) state.page = pages;
      var slice = results.slice((state.page - 1) * PER_PAGE, state.page * PER_PAGE);

      headline();

      $$("[data-shop-count]").forEach(function (el) { el.textContent = data.products.length; });
      $("[data-result-count]").textContent = results.length;
      $("[data-result-word]").textContent = results.length === 1 ? "product" : "products";
      var fabCount = $("[data-fab-count]");
      var activeN = state.brand.length + state.cat.length + state.occasion.length + state.diet.length +
        state.badge.length + (state.date ? 1 : 0) +
        (state.min !== priceBounds.min || state.max !== priceBounds.max ? 1 : 0);
      if (fabCount) fabCount.textContent = activeN ? "(" + activeN + ")" : "";
      var drawerCount = $("[data-drawer-count]");
      if (drawerCount) drawerCount.textContent = results.length;

      var grid = $("[data-results]");
      grid.className = "product-grid" + (state.layout === "dense" ? " product-grid--dense" : "");
      grid.innerHTML = slice.length
        ? ui.productGrid(slice)
        : '<div class="empty-state" style="grid-column:1/-1">' + ui.icon("search") +
          "<h3>Nothing matches those filters</h3>" +
          '<p class="muted" style="font-size:var(--fs-sm);max-width:44ch">Try widening the price range, clearing a dietary filter, or removing the delivery-date constraint.</p>' +
          '<button class="btn btn--sm btn--outline" type="button" data-clear-filters>Clear all filters</button></div>';

      $("[data-active-filters]").innerHTML = chipsMarkup();

      /* Pager */
      var pager = $("[data-pager]");
      if (pages <= 1) pager.innerHTML = "";
      else {
        var btns = "";
        btns += '<button class="pager__btn" type="button" data-pager-page="' + (state.page - 1) + '"' +
          (state.page === 1 ? " disabled" : "") + ' aria-label="Previous page">' + ui.icon("chevronLeft") + "</button>";
        for (var i = 1; i <= pages; i++) {
          if (pages > 7 && i !== 1 && i !== pages && Math.abs(i - state.page) > 1) {
            if (Math.abs(i - state.page) === 2) btns += '<span class="pager__btn" style="border:0;pointer-events:none">…</span>';
            continue;
          }
          btns += '<button class="pager__btn" type="button" data-pager-page="' + i + '"' +
            (i === state.page ? ' aria-current="page"' : "") + ">" + i + "</button>";
        }
        btns += '<button class="pager__btn" type="button" data-pager-page="' + (state.page + 1) + '"' +
          (state.page === pages ? " disabled" : "") + ' aria-label="Next page">' + ui.icon("chevronRight") + "</button>";
        pager.innerHTML = btns;
      }

      /* Filter panels: rebuild so counts stay honest */
      if (!opts.keepFilters) {
        var markup = filterMarkup();
        $("[data-filter-groups]").innerHTML = markup;
        var mob = $("[data-filter-groups-mobile]");
        if (mob) mob.innerHTML = markup;
      }

      $$("[data-sort]").forEach(function (s) { s.value = state.sort; });
      $$("[data-layout]").forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn.dataset.layout === state.layout ? "true" : "false");
      });

      ui.reveal();
      SAIPH.app.paintCounts();
      if (opts.scroll) global.scrollTo({ top: $(".shop-layout").offsetTop - 120, behavior: "smooth" });
    }

    /* ------------------------------ Events ------------------------------- */
    doc.addEventListener("change", function (e) {
      var cb = e.target.closest("[data-filter]");
      if (cb) {
        var key = cb.dataset.filter;
        var v = cb.value;
        var arr = state[key];
        var i = arr.indexOf(v);
        if (cb.checked && i === -1) arr.push(v);
        if (!cb.checked && i > -1) arr.splice(i, 1);
        state.page = 1;
        writeState();
        render();
        return;
      }
      var sortSel = e.target.closest("[data-sort]");
      if (sortSel) {
        state.sort = sortSel.value;
        state.page = 1;
        writeState();
        render({ keepFilters: true });
        return;
      }
      var dateSel = e.target.closest("[data-date-filter]");
      if (dateSel) {
        state.date = dateSel.value;
        state.page = 1;
        writeState();
        render();
        return;
      }
      var pmin = e.target.closest("[data-price-min]");
      var pmax = e.target.closest("[data-price-max]");
      var prange = e.target.closest("[data-price-range]");
      if (pmin || pmax || prange) {
        if (pmin) state.min = util.clamp(parseInt(pmin.value, 10) || 0, priceBounds.min, state.max);
        if (pmax) state.max = util.clamp(parseInt(pmax.value, 10) || priceBounds.max, state.min, priceBounds.max);
        if (prange) state.max = util.clamp(parseInt(prange.value, 10), state.min + 100, priceBounds.max);
        state.page = 1;
        writeState();
        render();
      }
    });

    doc.addEventListener("input", function (e) {
      var prange = e.target.closest("[data-price-range]");
      if (!prange) return;
      var hint = prange.closest(".range").querySelector(".field__hint");
      if (hint) hint.textContent = "Showing " + util.money(state.min) + " – " + util.money(prange.value);
    });

    doc.addEventListener("click", function (e) {
      var clear = e.target.closest("[data-clear-filters]");
      if (clear) {
        state = {
          q: "", cat: [], brand: [], occasion: [], diet: [], badge: [],
          min: priceBounds.min, max: priceBounds.max, date: "", sort: state.sort,
          page: 1, layout: state.layout, pickup: ""
        };
        writeState();
        render();
        return;
      }

      var chip = e.target.closest("[data-chip-kind]");
      if (chip) {
        var kind = chip.dataset.chipKind, id = chip.dataset.chipId;
        if (kind === "q") state.q = "";
        else if (kind === "price") { state.min = priceBounds.min; state.max = priceBounds.max; }
        else if (kind === "date") state.date = "";
        else if (kind === "pickup") state.pickup = "";
        else state[kind] = state[kind].filter(function (x) { return x !== id; });
        state.page = 1;
        writeState();
        render();
        return;
      }

      /* Scoped to the pager: a bare [data-page] would also match body[data-page]. */
      var pageBtn = e.target.closest(".pager [data-pager-page]");
      if (pageBtn) {
        state.page = parseInt(pageBtn.dataset.pagerPage, 10);
        writeState();
        render({ keepFilters: true, scroll: true });
        return;
      }

      var layoutBtn = e.target.closest("[data-layout]");
      if (layoutBtn) {
        state.layout = layoutBtn.dataset.layout;
        writeState({ replace: true });
        render({ keepFilters: true });
        return;
      }

      var fab = e.target.closest("[data-filter-fab]");
      if (fab) {
        ui.openOverlay($("[data-filter-drawer]"));
        return;
      }
    });

    global.addEventListener("popstate", function () {
      state = readState();
      render();
    });

    b.renderRecent($("[data-recent-rail]"), $("[data-recent-section]"));
    render({ scroll: false });
  };
})(typeof window !== "undefined" ? window : this);

/* ==========================================================================
   SAiPH Bakes — Business & contact pages controller
   Shared by corporate.html, wholesale.html, franchise.html, contact.html and
   careers.html. Populates data-driven blocks; validation and submission are
   handled by the global form handler in app.js.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  function fill() {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var $ = b.$;

    /* ------------------------------ Corporate ---------------------------- */
    var corp = $("[data-corporate-services]");
    if (corp) {
      var icons = ["cake", "gift", "coffee", "box", "package", "sparkles", "tag", "headphones"];
      corp.innerHTML = data.corporateServices.map(function (s, i) {
        return '<article class="value">' +
          '<span class="value__icon">' + ui.icon(icons[i] === "coffee" ? "store" : icons[i] || "briefcase") + "</span>" +
          '<h3 class="value__title">' + util.esc(s.title) + "</h3>" +
          '<p class="value__text">' + util.esc(s.text) + "</p>" +
        "</article>";
      }).join("");
    }

    /* ------------------------------ Wholesale ---------------------------- */
    var segs = $("[data-wholesale-segments]");
    if (segs) {
      var segIcons = ["store", "chef", "package", "grid", "users", "briefcase", "truck", "tag"];
      segs.innerHTML = data.wholesaleSegments.map(function (s, i) {
        return '<article class="value">' +
          '<span class="value__icon">' + ui.icon(segIcons[i] || "package") + "</span>" +
          '<h3 class="value__title">' + util.esc(s.name) + "</h3>" +
          '<p class="value__text">' + util.esc(s.text) + "</p>" +
        "</article>";
      }).join("");
    }

    var segSel = $("[data-segment-select]");
    if (segSel) {
      segSel.innerHTML = '<option value="">Select</option>' +
        data.wholesaleSegments.map(function (s) {
          return "<option>" + util.esc(s.name) + "</option>";
        }).join("") + "<option>Other</option>";
    }

    /* ------------------------------ Franchise ---------------------------- */
    var table = $("[data-formats-table]");
    if (table) {
      table.innerHTML = "<table>" +
        '<caption class="sr-only">Franchise formats with area, investment, team size and payback</caption>' +
        "<thead><tr><th scope=\"col\">Format</th><th scope=\"col\">Area</th><th scope=\"col\">Investment</th>" +
        "<th scope=\"col\">Team</th><th scope=\"col\">Payback</th><th scope=\"col\">Brands carried</th></tr></thead><tbody>" +
        data.franchiseFormats.map(function (f) {
          return "<tr><th scope=\"row\">" + util.esc(f.name) + "</th>" +
            "<td>" + util.esc(f.area) + "</td>" +
            "<td><b>" + util.esc(f.invest) + "</b></td>" +
            "<td>" + util.esc(f.team) + " people</td>" +
            "<td>" + util.esc(f.payback) + "</td>" +
            "<td>" + util.esc(f.brands) + "</td></tr>";
        }).join("") +
        "</tbody></table>";
    }

    var support = $("[data-support-grid]");
    if (support) {
      var supIcons = ["mappin", "chef", "truck", "trending", "settings", "shield"];
      support.innerHTML = data.franchiseSupport.map(function (s, i) {
        return '<article class="value">' +
          '<span class="value__icon">' + ui.icon(supIcons[i] || "award") + "</span>" +
          '<h3 class="value__title">' + util.esc(s.title) + "</h3>" +
          '<p class="value__text">' + util.esc(s.text) + "</p>" +
        "</article>";
      }).join("");
    }

    var formatSel = $("[data-format-select]");
    if (formatSel) {
      formatSel.innerHTML = '<option value="">Select</option>' +
        data.franchiseFormats.map(function (f) {
          return "<option>" + util.esc(f.name) + " — " + util.esc(f.invest) + "</option>";
        }).join("") + "<option>Not sure yet</option>";
    }

    b.renderFaqs($("[data-franchise-faq]"), [
      {
        q: "What exactly does the investment cover?",
        a: "Fit-out and civil work, kitchen and counter equipment, furniture, signage, POS hardware, opening inventory, launch marketing and the one-time franchise fee. It excludes property deposit, rent and working capital, which you should budget separately at roughly two months of operating cost."
      },
      {
        q: "Do I need to be a baker?",
        a: "No. Central production means your store finishes and serves rather than bakes from scratch. You do need to complete four weeks of training at our Dibrugarh kitchen and be present in the store daily for the first year — we do not grant territories to absentee investors."
      },
      {
        q: "What are the ongoing fees?",
        a: "A royalty on net sales and a contribution to the national marketing fund, both disclosed in full during the discovery call. There are no hidden equipment or software charges, and supply is invoiced at the published partner rate card."
      },
      {
        q: "How is territory exclusivity defined?",
        a: "By a mapped catchment, not by a city name. You get exclusivity within that boundary for the term of the agreement, and a first right of refusal on adjacent catchments as they open."
      },
      {
        q: "How long is the agreement?",
        a: "Five years, renewable for a further five at a reduced fee subject to audit performance. Either side can exit earlier under the terms set out in the agreement."
      },
      {
        q: "What if my city is outside your cold-chain reach?",
        a: "Then we will tell you so and put you on the waitlist rather than take your money. Frozen par-bake and packaged Khowdy travel well; fresh cream cakes do not. Supply capability is the first thing we check."
      }
    ]);

    /* ------------------------------- Careers ----------------------------- */
    var roles = $("[data-roles]");
    if (roles) {
      var openings = [
        { title: "Pastry Chef de Partie", team: "SAiPH Signature", loc: "Dibrugarh", type: "Full-time", exp: "3–6 years" },
        { title: "Head Baker — Viennoiserie", team: "DoughReMi", loc: "Dibrugarh", type: "Full-time", exp: "5+ years" },
        { title: "Chocolatier", team: "SAiPH Signature", loc: "Dibrugarh", type: "Full-time", exp: "2–5 years" },
        { title: "Store Manager", team: "Retail", loc: "Dibrugarh", type: "Full-time", exp: "4+ years" },
        { title: "Production Planner", team: "Supply Chain", loc: "Dibrugarh", type: "Full-time", exp: "3+ years" },
        { title: "Cold-Chain Coordinator", team: "Logistics", loc: "Dibrugarh", type: "Full-time", exp: "2+ years" },
        { title: "Performance Marketing Executive", team: "Marketing", loc: "Dibrugarh", type: "Full-time", exp: "2–4 years" },
        { title: "Counter Associate", team: "Retail", loc: "Dibrugarh", type: "Full-time", exp: "Freshers welcome" },
        { title: "Bakery Trainee", team: "Production", loc: "Dibrugarh", type: "Apprenticeship", exp: "No experience needed" }
      ];
      roles.innerHTML = openings.map(function (r) {
        return '<article class="order-row">' +
          '<div class="row row--between row--top">' +
            "<div><span class=\"eyebrow\">" + util.esc(r.team) + "</span>" +
            '<h3 style="font-family:var(--font-display);font-size:var(--fs-lg);margin:.2rem 0 .35rem">' +
              util.esc(r.title) + "</h3>" +
            '<div class="row row--tight" style="font-size:var(--fs-xs);color:var(--text-faint)">' +
              '<span class="badge badge--outline">' + util.esc(r.loc) + "</span>" +
              '<span class="badge badge--outline">' + util.esc(r.type) + "</span>" +
              '<span class="badge badge--outline">' + util.esc(r.exp) + "</span>" +
            "</div></div>" +
            '<a class="btn btn--sm btn--outline" href="#apply-role" data-scroll-to="#apply-role">Apply</a>' +
          "</div>" +
        "</article>";
      }).join("");

      var roleSel = $("[data-role-select]");
      if (roleSel) {
        roleSel.innerHTML = '<option value="">Select a role</option>' +
          openings.map(function (r) {
            return "<option>" + util.esc(r.title) + " — " + util.esc(r.loc) + "</option>";
          }).join("") + "<option>General application</option>";
      }
    }

    /* ------------------------------- Contact ----------------------------- */
    var storeList = $("[data-contact-stores]");
    if (storeList) {
      storeList.innerHTML = data.stores.filter(function (s) { return !s.unit; })
        .map(b.storeCard).join("");
    }

    var faqShort = $("[data-contact-faq]");
    if (faqShort) b.renderFaqs(faqShort, data.faqs.slice(0, 5));

    ui.bindAccordions();
    ui.bindCounters();
    ui.reveal();
  }

  SAIPH.pages.corporate = fill;
  SAIPH.pages.wholesale = fill;
  SAIPH.pages.franchise = fill;
  SAIPH.pages.contact = fill;
  SAIPH.pages.careers = fill;
})(typeof window !== "undefined" ? window : this);

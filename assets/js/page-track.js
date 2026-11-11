/* ==========================================================================
   SAiPH Bakes — Order tracking controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.track = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    var host = $("[data-track-result]");

    function statusClass(status) {
      return {
        placed: "status--placed", baking: "status--baking", quality: "status--baking",
        out: "status--out", delivered: "status--delivered", done: "status--delivered",
        cancelled: "status--cancelled"
      }[status] || "status--placed";
    }

    function statusLabel(order) {
      var last = order.timeline.filter(function (n) { return n.done; }).pop();
      return last ? last.title : "Order confirmed";
    }

    function orderCard(order) {
      var eta = order.timeline.every(function (n) { return n.done; })
        ? "Completed"
        : util.fmtDate(order.date) + " · " + order.slotLabel;

      return '<div class="checkout-block" data-order-card="' + order.id + '">' +
        '<div class="row row--between">' +
          "<div><span class=\"eyebrow eyebrow--muted\">Order</span>" +
          '<h2 style="font-family:var(--font-sans);font-size:var(--fs-lg);letter-spacing:.06em">' + util.esc(order.id) + "</h2></div>" +
          '<span class="status ' + statusClass(order.status) + '">' + util.esc(statusLabel(order)) + "</span>" +
        "</div>" +
        '<dl class="pdp__meta-list">' +
          "<div><dt>" + (order.mode === "pickup" ? "Pickup from" : "Delivering to") + "</dt><dd>" +
            (order.mode === "pickup"
              ? util.esc(order.store ? order.store.name : "Store")
              : util.esc([order.address.line, order.address.city, order.address.pin].filter(Boolean).join(", "))) +
            "</dd></div>" +
          "<div><dt>Expected</dt><dd>" + util.esc(eta) + "</dd></div>" +
          "<div><dt>Items</dt><dd>" + order.items.map(function (i) {
            return util.esc(i.name) + " × " + i.qty;
          }).join("<br>") + "</dd></div>" +
          "<div><dt>Total</dt><dd>" + util.money(order.totals.grand) + "</dd></div>" +
        "</dl>" +
        '<div class="row row--tight">' + order.items.slice(0, 5).map(function (i) {
          var p = query.byId(i.id);
          return p ? '<span style="width:3.25rem;border-radius:var(--r-xs);overflow:hidden">' +
            ui.media(p, { ratio: "square" }) + "</span>" : "";
        }).join("") + "</div>" +
        '<div class="track-timeline" style="margin-top:.5rem">' + order.timeline.map(function (n, i) {
          var isCurrent = !n.done && order.timeline[i - 1] && order.timeline[i - 1].done;
          return '<div class="track-node' + (n.done ? " is-done" : isCurrent ? " is-current" : "") + '">' +
            '<p class="track-node__title">' + util.esc(n.title) + "</p>" +
            '<p class="track-node__text">' + util.esc(n.note) + "</p>" +
            (n.done ? '<p class="track-node__meta">' + util.fmtWhen(n.at || order.placedAt) + "</p>" : "") +
          "</div>";
        }).join("") + "</div>" +
        '<div class="row row--tight">' +
          (order.timeline.every(function (n) { return n.done; })
            ? '<a class="btn btn--sm btn--outline" href="shop.html">Order again</a>'
            : '<button class="btn btn--sm btn--outline" type="button" data-advance="' + order.id + '">Refresh status</button>') +
          '<a class="btn btn--sm btn--ghost" href="tel:+919864000000">' + ui.icon("phone") + " Call support</a>" +
        "</div>" +
        '<p class="field__hint">Status refresh is simulated in this demo build — a live deployment polls the order API or receives a webhook push.</p>' +
      "</div>";
    }

    function render(orders, note) {
      if (!orders.length) {
        host.innerHTML = '<div class="empty-state">' + ui.icon("package") +
          "<h2 style=\"font-size:var(--fs-h4)\">No orders found</h2>" +
          '<p class="muted" style="font-size:var(--fs-sm);max-width:44ch">' +
          (note || "Orders placed in this browser show here automatically. If you ordered on another device, use the order ID from your confirmation email.") +
          "</p><a class=\"btn btn--sm\" href=\"shop.html\">Start an order</a></div>";
        return;
      }
      host.innerHTML = orders.map(orderCard).join("");
    }

    doc.addEventListener("submit", function (e) {
      var form = e.target.closest("[data-track-form]");
      if (!form) return;
      e.preventDefault();
      var idField = $("#tr-id"), phoneField = $("#tr-phone");
      var ok = true;
      [idField, phoneField].forEach(function (f) {
        var valid = f.value.trim().length > 0;
        f.closest(".field").classList.toggle("has-error", !valid);
        if (!valid) ok = false;
      });
      if (!ok) return;

      var id = idField.value.trim().toUpperCase();
      var found = store.orders.byId(id);
      if (found) {
        render([found]);
        host.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        render([], "We could not find " + util.esc(id) + " in this browser. Check the ID, or call +91 98640 00000 and we will look it up for you.");
      }
    });

    doc.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-advance]");
      if (!btn) return;
      btn.classList.add("btn--loading");
      setTimeout(function () {
        var updated = store.orders.advance(btn.dataset.advance);
        render(store.orders.all());
        if (updated) {
          ui.toast({ title: "Status updated", note: updated.timeline.filter(function (n) { return n.done; }).pop().title });
        }
      }, 600);
    });

    var param = util.param("order");
    if (param) {
      var o = store.orders.byId(param.toUpperCase());
      $("#tr-id").value = param.toUpperCase();
      render(o ? [o] : [], "That order ID is not in this browser's history.");
    } else {
      render(store.orders.all());
    }

    ui.reveal();
  };
})(typeof window !== "undefined" ? window : this);

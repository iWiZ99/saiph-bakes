/* ==========================================================================
   SAiPH Bakes — Order confirmation controller
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.confirmation = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var $ = b.$;

    var id = util.param("order");
    var order = id ? store.orders.byId(id) : store.orders.latest();
    var host = $("[data-confirmation]");

    if (!order) {
      host.innerHTML =
        '<div class="empty-state">' + ui.icon("package") +
        "<h2 style=\"font-size:var(--fs-h3)\">No order to show</h2>" +
        '<p class="muted">We could not find that order in this browser. If you have just paid, check your email for the confirmation, or track it with your order ID.</p>' +
        '<div class="row row--center"><a class="btn" href="track-order.html">Track an order</a>' +
        '<a class="btn btn--outline" href="shop.html">Back to shop</a></div></div>';
      return;
    }

    var payLabel = {
      upi: "UPI", card: "Card", netbanking: "Net banking", cod: "Cash on delivery"
    }[order.payment] || order.payment;

    host.innerHTML =
      '<div class="order-success">' +
        '<span class="order-success__tick">' + ui.icon("check") + "</span>" +
        '<span class="eyebrow">Order confirmed</span>' +
        "<p class=\"display\" style=\"font-size:var(--fs-h1);line-height:1.05;color:var(--heading)\">Thank you, " + util.esc(order.contact.name.split(" ")[0]) + "</p>" +
        '<p class="lede" style="text-align:center">Your order is with the kitchen. We have emailed the confirmation to <b>' +
          util.esc(order.contact.email) + "</b> and will call " + util.esc(order.contact.phone) + " before " +
          (order.mode === "pickup" ? "it is ready" : "the rider arrives") + ".</p>" +
        '<span class="order-id">' + util.esc(order.id) + "</span>" +
        '<div class="row row--center">' +
          '<a class="btn btn--accent" href="track-order.html?order=' + order.id + '">Track this order</a>' +
          '<a class="btn btn--outline" href="shop.html">Continue shopping</a>' +
        "</div>" +
      "</div>" +

      '<div class="cart-layout" style="margin-top:clamp(2.5rem,2rem+3vw,4rem)">' +
        '<div class="stack stack--lg">' +
          '<div class="checkout-block">' +
            '<h2 class="checkout-block__title"><i>' + ui.icon("box") + "</i> What is coming</h2>" +
            order.items.map(function (it) {
              var p = query.byId(it.id);
              var bits = [it.variant, it.flavour, it.eggless ? "Eggless" : null]
                .filter(Boolean).join(" · ");
              return '<div class="line-item">' +
                '<span class="line-item__media">' + (p ? ui.media(p, { ratio: "square" }) : "") + "</span>" +
                "<div><span class=\"line-item__title\">" + util.esc(it.name) + "</span>" +
                '<div class="product-card__brand"><span class="brandname">' + util.esc(it.brand) + "</span></div>" +
                (bits ? '<p class="line-item__attrs" style="margin-top:.3rem">' + util.esc(bits) + "</p>" : "") +
                (it.message ? '<p class="line-item__attrs">Message: “' + util.esc(it.message) + "”</p>" : "") +
                (it.addons && it.addons.length ? '<p class="line-item__attrs">Add-ons: ' + util.esc(it.addons.join(", ")) + "</p>" : "") +
                (it.custom && it.custom.instructions ? '<p class="line-item__attrs">Notes: ' + util.esc(it.custom.instructions) + "</p>" : "") +
                '<p class="line-item__attrs">Qty ' + it.qty + "</p></div>" +
                '<div class="line-item__price">' + util.money(it.total) + "</div>" +
              "</div>";
            }).join("") +
          "</div>" +

          '<div class="checkout-block">' +
            '<h2 class="checkout-block__title"><i>' + ui.icon(order.mode === "pickup" ? "store" : "truck") + "</i> " +
              (order.mode === "pickup" ? "Pickup details" : "Delivery details") + "</h2>" +
            '<dl class="pdp__meta-list">' +
              "<div><dt>" + (order.mode === "pickup" ? "Store" : "Address") + "</dt><dd>" +
                (order.mode === "pickup"
                  ? util.esc(order.store ? order.store.name : "") + "<br>" + util.esc(order.store ? order.store.addr : "")
                  : util.esc([order.address.line, order.address.landmark, order.address.city, order.address.pin]
                      .filter(Boolean).join(", "))) +
              "</dd></div>" +
              "<div><dt>Date</dt><dd>" + util.fmtDate(order.date) + "</dd></div>" +
              "<div><dt>Slot</dt><dd>" + util.esc(order.slotLabel) + "</dd></div>" +
              (order.instructions ? "<div><dt>Instructions</dt><dd>" + util.esc(order.instructions) + "</dd></div>" : "") +
              "<div><dt>Payment</dt><dd>" + util.esc(payLabel) +
                (order.payment === "cod" ? " — please keep " + util.money(order.totals.grand) + " ready" : " — paid") + "</dd></div>" +
              (order.gstin ? "<div><dt>GSTIN</dt><dd>" + util.esc(order.gstin) + "</dd></div>" : "") +
            "</dl>" +
            '<div class="note">' + ui.icon("info") +
              "<span>Need to change something? Call <a href=\"tel:+919864000000\">+91 98640 00000</a> quoting " +
              util.esc(order.id) + ". Changes are possible until the order enters production.</span></div>" +
          "</div>" +

          '<div class="checkout-block">' +
            '<h2 class="checkout-block__title"><i>' + ui.icon("calendar") + "</i> What happens next</h2>" +
            '<div class="track-timeline">' + order.timeline.map(function (n, i) {
              return '<div class="track-node' + (n.done ? " is-done" : i === 1 ? " is-current" : "") + '">' +
                '<p class="track-node__title">' + util.esc(n.title) + "</p>" +
                '<p class="track-node__text">' + util.esc(n.note) + "</p>" +
                (n.done ? '<p class="track-node__meta">' + util.fmtWhen(n.at || order.placedAt) + "</p>" : "") +
              "</div>";
            }).join("") + "</div>" +
          "</div>" +
        "</div>" +

        '<aside class="summary-panel">' +
          '<h2 class="summary-panel__title">Payment Summary</h2>' +
          '<div class="cart-summary">' +
            '<div class="cart-summary__row"><span>Subtotal</span><b>' + util.money(order.totals.subtotal) + "</b></div>" +
            (order.totals.discount ? '<div class="cart-summary__row" style="color:var(--success)"><span>Discount' +
              (order.totals.coupon ? " · " + util.esc(order.totals.coupon.code) : "") + "</span><b>−" +
              util.money(order.totals.discount) + "</b></div>" : "") +
            '<div class="cart-summary__row"><span>' + (order.mode === "pickup" ? "Store pickup" : "Delivery") +
              "</span><b>" + (order.totals.shipping ? util.money(order.totals.shipping) : "Free") + "</b></div>" +
            (order.totals.slotFee ? '<div class="cart-summary__row"><span>Midnight slot</span><b>' +
              util.money(order.totals.slotFee) + "</b></div>" : "") +
            '<div class="cart-summary__row cart-summary__row--total"><span>Total</span><b>' +
              util.money(order.totals.grand) + "</b></div>" +
          "</div>" +
          '<a class="btn btn--outline btn--block" href="account.html#orders">View all orders</a>' +
          '<div class="stack stack--xs" style="font-size:var(--fs-xs);color:var(--text-faint)">' +
            '<span class="row row--tight">' + ui.icon("mail") + " Invoice emailed within 15 minutes</span>" +
            '<span class="row row--tight">' + ui.icon("headphones") + " Support: +91 98640 00000, 8am–10pm</span>" +
          "</div>" +
        "</aside>" +
      "</div>";

    /* Suggestions from the same brands the customer just bought from */
    var basis = order.items[0] ? order.items[0].id : null;
    if (basis) {
      $("[data-next-section]").hidden = false;
      $("[data-next-products]").innerHTML = ui.productGrid(query.related(basis, 4));
    }

    SAIPH.app.paintCounts();
    ui.reveal();
  };
})(typeof window !== "undefined" ? window : this);

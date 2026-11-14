/* ==========================================================================
   SAiPH Bakes — Checkout controller
   Delivery vs pickup, date + slot honouring the longest lead time in the cart,
   coupons, live totals, validation and order placement.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.checkout = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var query = SAIPH.query;
    var store = SAIPH.store;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    if (!store.cart.count()) {
      $("[data-checkout]").innerHTML =
        '<div class="empty-state">' + ui.icon("bag") +
        "<h2>Nothing to check out</h2>" +
        '<p class="muted">Your cart is empty. Pick something first — it takes a minute.</p>' +
        '<div class="row row--center"><a class="btn" href="shop.html">Shop the catalogue</a>' +
        '<a class="btn btn--outline" href="cakes.html">Create your cake</a></div></div>';
      $("[data-summary-lines]").innerHTML = "";
      $("[data-summary-totals]").innerHTML = "";
      return;
    }

    var form = {
      mode: "delivery",
      store: null,
      date: "",
      slot: "evening",
      payment: "upi"
    };

    /* The cart's longest lead time drives the earliest selectable date. */
    var maxLead = store.cart.detail().reduce(function (n, d) {
      return Math.max(n, d.product ? d.product.leadHours : 0);
    }, 0);
    var cutoffText = store.cart.detail().reduce(function (txt, d) {
      if (!d.product) return txt;
      return d.product.leadHours === maxLead ? d.product.cutoff : txt;
    }, "");

    /* ------------------------------ Rendering ---------------------------- */
    function renderCity() {
      $("[data-city]").innerHTML =
        '<option value="">Select city</option>' +
        data.deliveryCities.map(function (c) {
          return '<option value="' + c + '" selected>' + c + "</option>";
        }).join("");
    }

    function renderPickupStores() {
      $("[data-pickup-stores]").innerHTML = data.stores
        .filter(function (s) { return !s.unit; })
        .map(function (s, i) {
          return '<label class="option option--stack"><input type="radio" name="pickup-store" value="' + s.id + '"' +
            (i === 0 ? " checked" : "") + '><span class="option__body">' +
            '<span class="option__title">' + util.esc(s.name) + "</span>" +
            '<span class="option__note">' + util.esc(s.addr) + " · " + util.esc(s.hours) + "</span></span></label>";
        }).join("");
      form.store = data.stores.filter(function (s) { return !s.unit; })[0].id;
    }

    function renderDates() {
      b.renderDateStrip($("[data-checkout-dates]"), { leadHours: maxLead, name: "co-date" });
      var checked = $('[name="co-date"]:checked');
      form.date = checked ? checked.value : "";
      $("[data-lead-badge]").textContent = maxLead >= 48
        ? "Earliest: " + Math.ceil(maxLead / 24) + " days from today"
        : maxLead > 0 ? maxLead + " hours' notice needed" : "Same-day possible";
      $("[data-cutoff-note] span").innerHTML = "<strong>" + util.esc(cutoffText || "Order before 8:00 PM for next-day delivery.") +
        "</strong> Dates before that window are greyed out. Midnight slots carry a ₹199 surcharge and are available in Dibrugarh.";
    }

    function renderSlots() {
      b.renderSlots($("[data-checkout-slots]"), { name: "co-slot" });
      var checked = $('[name="co-slot"]:checked');
      form.slot = checked ? checked.value : "evening";
    }

    function renderAccountRow() {
      var acct = store.account.get();
      $("[data-account-row]").innerHTML = acct
        ? '<span class="row row--tight" style="font-size:var(--fs-sm)">' + ui.icon("checkCircle") +
          "<span>Signed in as <b>" + util.esc(acct.name) + "</b> · " + util.esc(acct.email) + "</span></span>" +
          '<button class="link" type="button" data-signout style="font-size:.6rem">Sign out</button>'
        : '<span class="row row--tight muted" style="font-size:var(--fs-sm)">' + ui.icon("user") +
          "<span>Checking out as a guest — no account needed.</span></span>" +
          '<a class="link" href="account.html" style="font-size:.6rem">Sign in instead</a>';
      if (acct) {
        var n = $("#co-name"), e = $("#co-email"), p = $("#co-phone");
        if (n && !n.value) n.value = acct.name;
        if (e && !e.value) e.value = acct.email;
        if (p && !p.value) p.value = acct.phone;
      }
    }

    function renderSummary() {
      var detail = store.cart.detail();
      $("[data-summary-lines]").innerHTML = detail.map(function (d) {
        var p = d.product;
        if (!p) return "";
        var bits = [];
        if (d.variant && d.variant.label !== "Standard") bits.push(d.variant.label);
        if (d.line.flavour) bits.push(d.line.flavour);
        if (d.line.eggless) bits.push("Eggless");
        return '<div class="row row--nowrap" style="gap:.75rem;align-items:flex-start">' +
          '<span style="width:3rem;flex:none;border-radius:var(--r-xs);overflow:hidden">' +
            ui.media(p, { ratio: "square" }) + "</span>" +
          '<span style="flex:1;min-width:0">' +
            '<span style="font-family:var(--font-display);font-size:var(--fs-sm);display:block;line-height:1.25">' +
              util.esc(p.name) + "</span>" +
            '<span class="faint" style="font-size:var(--fs-xs)">' +
              (bits.length ? util.esc(bits.join(" · ")) + " · " : "") + "Qty " + d.line.qty + "</span>" +
          "</span>" +
          '<span style="font-weight:600;font-variant-numeric:tabular-nums;font-size:var(--fs-sm)">' +
            util.money(d.total) + "</span>" +
        "</div>";
      }).join("");

      var applied = store.coupon.get();
      var t = store.totals({ mode: form.mode, slot: form.slot });
      $("[data-coupon-area]").innerHTML = applied && t.couponApplied
        ? '<div class="applied-coupon">' + ui.icon("percent") +
          "<span><b>" + util.esc(applied) + "</b> — saved " + util.money(t.discount) + "</span>" +
          '<button type="button" data-remove-coupon>Remove</button></div>'
        : '<form class="coupon-row" data-coupon-form>' +
          '<label class="sr-only" for="co-coupon">Coupon code</label>' +
          '<input class="input" id="co-coupon" placeholder="Coupon code" autocomplete="off">' +
          '<button class="btn btn--outline" type="submit">Apply</button></form>';

      $("[data-summary-totals]").innerHTML =
        '<div class="cart-summary__row"><span>Subtotal</span><b>' + util.money(t.subtotal) + "</b></div>" +
        (t.discount ? '<div class="cart-summary__row" style="color:var(--success)"><span>Discount</span><b>−' +
          util.money(t.discount) + "</b></div>" : "") +
        '<div class="cart-summary__row"><span>' + (form.mode === "pickup" ? "Store pickup" : "Delivery") + "</span><b>" +
          (form.mode === "pickup" ? "Free" : t.shipping ? util.money(t.shipping) : "Free") + "</b></div>" +
        (t.slotFee ? '<div class="cart-summary__row"><span>Midnight slot</span><b>' + util.money(t.slotFee) + "</b></div>" : "") +
        '<div class="cart-summary__row cart-summary__row--total"><span>Total payable</span><b>' + util.money(t.grand) + "</b></div>";

      $("[data-pay-total]").textContent = util.money(t.grand);
    }

    /* ------------------------------- Events ------------------------------ */
    doc.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "mode") {
        form.mode = t.value;
        $("[data-delivery-fields]").hidden = form.mode === "pickup";
        $("[data-pickup-fields]").hidden = form.mode !== "pickup";
        /* Address fields must not block submission when picking up in store. */
        $$("[data-delivery-fields] [required]").forEach(function (input) {
          input.dataset.wasRequired = "1";
          if (form.mode === "pickup") input.removeAttribute("required");
          else input.setAttribute("required", "");
        });
        renderSummary();
        return;
      }
      if (t.name === "pickup-store") { form.store = t.value; return; }
      if (t.name === "co-date") { form.date = t.value; return; }
      if (t.name === "co-slot") { form.slot = t.value; renderSummary(); return; }
      if (t.name === "payment") {
        form.payment = t.value;
        if (t.value === "cod") {
          var hasCustom = store.cart.all().some(function (l) { return !!l.custom; });
          if (hasCustom) {
            ui.toast({
              title: "COD not available on custom cakes",
              note: "Custom builds are prepaid so the kitchen can start on time.",
              variant: "error", icon: "alert"
            });
            $('[name="payment"][value="upi"]').checked = true;
            form.payment = "upi";
          }
        }
        return;
      }
      var city = t.closest("[data-city]");
      if (city) {
        var note = $("[data-city-note]");
        note.textContent = city.value
          ? "Same-day and midnight slots available in " + city.value + "."
          : "Select a city to see available slots.";
        return;
      }
      var acctBox = t.closest("[data-create-account]");
      if (acctBox && acctBox.checked) {
        ui.toast({ title: "Account will be created", note: "We set it up with your email after payment." });
      }
    });

    doc.addEventListener("click", function (e) {
      if (e.target.closest("[data-remove-coupon]")) {
        store.coupon.clear();
        renderSummary();
        return;
      }
      if (e.target.closest("[data-signout]")) {
        store.account.signOut();
        renderAccountRow();
        return;
      }
    });

    doc.addEventListener("submit", function (e) {
      var couponForm = e.target.closest("[data-coupon-form]");
      if (couponForm) {
        e.preventDefault();
        var res = store.coupon.apply(couponForm.querySelector("input").value);
        if (res.ok) ui.toast({ title: res.coupon.code + " applied", note: res.coupon.label, variant: "success", icon: "percent" });
        else ui.toast({ title: "Could not apply that code", note: res.reason, variant: "error", icon: "alert" });
        renderSummary();
        return;
      }

      var checkoutForm = e.target.closest("[data-checkout]");
      if (!checkoutForm) return;
      e.preventDefault();

      var ok = true;
      $$("[required]", checkoutForm).forEach(function (input) {
        if (input.closest("[hidden]")) return;
        var field = input.closest(".field") || input.closest(".check");
        var valid = input.type === "checkbox" ? input.checked : String(input.value).trim().length > 0;
        if (valid && input.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value);
        if (valid && input.dataset.pattern) valid = new RegExp(input.dataset.pattern).test(input.value);
        if (!valid) ok = false;
        if (field && field.classList.contains("field")) field.classList.toggle("has-error", !valid);
        if (field && field.classList.contains("check")) field.style.color = valid ? "" : "var(--danger)";
      });
      if (!form.date) {
        ok = false;
        ui.toast({ title: "Choose a delivery date", variant: "error", icon: "calendar" });
      }
      if (!ok) {
        var bad = $(".has-error input, .has-error select", checkoutForm);
        if (bad) bad.scrollIntoView({ behavior: "smooth", block: "center" });
        else if (!form.date) $("[data-checkout-dates]").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      var btn = $("[data-place-order]");
      btn.classList.add("btn--loading");

      /* Replace this timeout with your payment-gateway handoff. On success the
         gateway callback should call store.orders.place(...) exactly as below. */
      setTimeout(function () {
        var slotRec = data.deliverySlots.filter(function (s) { return s.id === form.slot; })[0];
        var wantsAccount = $("[data-create-account]").checked;
        var contact = {
          name: $("#co-name").value.trim(),
          phone: $("#co-phone").value.trim(),
          email: $("#co-email").value.trim()
        };

        var address = form.mode === "pickup" ? null : {
          line: $("#co-addr").value.trim(),
          landmark: $("#co-landmark").value.trim(),
          city: $("#co-city").value,
          pin: $("#co-pin").value.trim(),
          type: $("#co-type").value
        };

        if (wantsAccount) store.account.signIn(contact);
        if (address) {
          store.addresses.save({
            label: address.type,
            name: contact.name,
            phone: contact.phone,
            line: address.line,
            landmark: address.landmark,
            city: address.city,
            pin: address.pin
          });
        }

        var order = store.orders.place({
          mode: form.mode,
          store: form.mode === "pickup" ? query.storeById(form.store) : null,
          address: address,
          date: form.date,
          slot: form.slot,
          slotLabel: slotRec ? slotRec.label : "",
          instructions: $("#co-instructions").value.trim(),
          contact: contact,
          payment: form.payment,
          gstin: $("#co-gstin").value.trim()
        });

        /* Sync to Vercel Postgres Database */
        if (typeof fetch === "function") {
          try {
            fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderNumber: order.id,
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
                address: address ? (address.line + ", " + (address.landmark ? address.landmark + ", " : "") + address.city + " - " + address.pin) : "Store Pickup",
                city: address ? address.city : "Mumbai",
                pincode: address ? address.pin : "",
                date: form.date,
                slot: slotRec ? slotRec.label : form.slot,
                cakeMessage: $("#co-instructions").value.trim(),
                items: order.lines || order.items || [],
                subtotal: order.subtotal || 0,
                discount: order.discount || 0,
                shipping: order.shipping || 0,
                total: order.total || order.grand || 0,
                paymentMethod: form.payment || "cod",
                paymentStatus: "paid",
                notes: $("#co-instructions").value.trim()
              })
            }).catch(function (err) {
              console.warn("Postgres order sync notice:", err);
            });
          } catch (e) {}
        }

        global.location.href = "order-confirmation.html?order=" + order.id;
      }, 1100);
    });

    renderCity();
    renderPickupStores();
    renderDates();
    renderSlots();
    renderAccountRow();
    renderSummary();
    ui.reveal();
  };
})(typeof window !== "undefined" ? window : this);

/* ==========================================================================
   SAiPH Bakes — FAQ controller
   Searchable, topic-filtered accordion plus FAQPage JSON-LD.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = global.SAIPH;
  SAIPH.pages = SAIPH.pages || {};

  SAIPH.pages.faq = function () {
    var ui = SAIPH.ui;
    var b = SAIPH.blocks;
    var util = SAIPH.util;
    var data = SAIPH.data;
    var doc = global.document;
    var $ = b.$, $$ = b.$$;

    /* Topic tags derived from the question text — keeps data.js free of
       presentation concerns while giving the page real filters. */
    var TOPICS = [
      { id: "all", name: "All questions", match: function () { return true; } },
      { id: "ordering", name: "Ordering", match: /order|advance|custom|subscription/i },
      { id: "delivery", name: "Delivery", match: /deliver|slot|cities|date/i },
      { id: "diet", name: "Dietary", match: /eggless|allerg/i },
      { id: "business", name: "Business", match: /gst|corporate|invoice/i },
      { id: "aftercare", name: "After your order", match: /return|replace|refund|gift card/i }
    ];

    var state = { topic: "all", term: "" };

    $("[data-faq-topics]").innerHTML = TOPICS.map(function (t) {
      return '<button class="chip' + (t.id === "all" ? " is-active" : "") + '" type="button" data-topic="' +
        t.id + '">' + util.esc(t.name) + "</button>";
    }).join("");

    function matches(f) {
      var topic = TOPICS.filter(function (t) { return t.id === state.topic; })[0];
      var inTopic = topic.id === "all" ||
        (topic.match instanceof RegExp ? topic.match.test(f.q + " " + f.a) : topic.match(f));
      if (!inTopic) return false;
      if (!state.term) return true;
      return (f.q + " " + f.a).toLowerCase().indexOf(state.term.toLowerCase()) > -1;
    }

    function render() {
      var list = data.faqs.filter(matches);
      var host = $("[data-faq-list]");
      host.innerHTML = "";
      b.renderFaqs(host, list);
      $("[data-faq-empty]").hidden = list.length > 0;
      host.hidden = list.length === 0;
      ui.bindAccordions();
    }

    doc.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-topic]");
      if (!chip) return;
      state.topic = chip.dataset.topic;
      $$("[data-topic]").forEach(function (c) { c.classList.toggle("is-active", c === chip); });
      render();
    });

    doc.addEventListener("input", util.debounce(function (e) {
      var input = e.target.closest("[data-faq-search]");
      if (!input) return;
      state.term = input.value.trim();
      render();
    }, 160));

    /* FAQPage structured data for rich results */
    var node = doc.createElement("script");
    node.type = "application/ld+json";
    node.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(function (f) {
        return {
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        };
      })
    });
    doc.head.appendChild(node);

    render();
    ui.reveal();
  };
})(typeof window !== "undefined" ? window : this);

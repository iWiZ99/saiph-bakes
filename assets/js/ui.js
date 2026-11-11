/* ==========================================================================
   SAiPH Bakes — UI kit
   Icons, art-directed image placeholders, product cards, ratings, toasts,
   drawers, modals and scroll reveal. No dependencies.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = (global.SAIPH = global.SAIPH || {});
  var doc = global.document;

  /* ------------------------------- Utils -------------------------------- */
  var util = {
    money: function (n, opts) {
      opts = opts || {};
      var v = Math.round(Number(n) || 0);
      var s = v.toLocaleString("en-IN");
      return (opts.bare ? "" : "₹") + s;
    },
    slug: function (s) {
      return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    },
    esc: function (s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    },
    hash: function (str) {
      var h = 2166136261;
      for (var i = 0; i < String(str).length; i++) {
        h ^= String(str).charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return Math.abs(h);
    },
    param: function (name) {
      return new URLSearchParams(global.location.search).get(name);
    },
    params: function () {
      var o = {};
      new URLSearchParams(global.location.search).forEach(function (v, k) { o[k] = v; });
      return o;
    },
    qs: function (obj) {
      var p = new URLSearchParams();
      Object.keys(obj).forEach(function (k) {
        var v = obj[k];
        if (v == null || v === "" || (Array.isArray(v) && !v.length)) return;
        p.set(k, Array.isArray(v) ? v.join(",") : v);
      });
      var s = p.toString();
      return s ? "?" + s : "";
    },
    debounce: function (fn, ms) {
      var t;
      return function () {
        var args = arguments, self = this;
        clearTimeout(t);
        t = setTimeout(function () { fn.apply(self, args); }, ms || 200);
      };
    },
    dates: function (n, startOffset) {
      var out = [];
      var base = new Date();
      base.setHours(0, 0, 0, 0);
      for (var i = startOffset || 0; i < (startOffset || 0) + n; i++) {
        var d = new Date(base.getTime() + i * 86400000);
        out.push({
          iso: d.toISOString().slice(0, 10),
          dow: d.toLocaleDateString("en-IN", { weekday: "short" }),
          day: d.getDate(),
          mon: d.toLocaleDateString("en-IN", { month: "short" }),
          label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
          offset: i
        });
      }
      return out;
    },
    fmtDate: function (iso) {
      if (!iso) return "";
      var d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
      if (isNaN(d)) return iso;
      return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    },
    fmtWhen: function (ts) {
      var d = new Date(ts);
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) +
        " · " + d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
    },
    clamp: function (n, min, max) { return Math.min(max, Math.max(min, n)); }
  };
  SAIPH.util = util;

  /* ------------------------------- Icons -------------------------------- */
  var paths = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    heart: '<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4l8.8 8.8 8.8-8.8a5.2 5.2 0 0 0 0-7.4z"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    cart: '<circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h2.4l2.6 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    chevronLeft: '<path d="m15 6-6 6 6 6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    star: '<path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    truck: '<path d="M1 3h11v13H1z"/><path d="M12 8h5l4 4v4h-9z"/><circle cx="5.5" cy="19" r="2"/><circle cx="17.5" cy="19" r="2"/>',
    check: '<path d="m5 13 4 4L19 7"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    eye: '<path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12S19 18.5 12 18.5 1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/>',
    zoom: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6"/>',
    gift: '<path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 21V7"/><path d="M12 7S9.5 7 8 5.5A2.5 2.5 0 0 1 12 3a2.5 2.5 0 0 1 4 2.5C14.5 7 12 7 12 7z"/>',
    cake: '<path d="M3 20h18"/><path d="M4 20v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6"/><path d="M12 8V5"/><path d="M12 5a1.6 1.6 0 0 0 0-3 1.6 1.6 0 0 0 0 3z"/><path d="M4 15c2 1.4 3.6 1.4 5.3 0 1.7 1.4 3.4 1.4 5.4 0 1.6 1.4 3.3 1.4 5.3 0"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 10-4 16-9 16z"/><path d="M4 21c3-6 7-9 12-11"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14.5-1.5 7 5-2.6 5 2.6-1.5-7"/>',
    shield: '<path d="M12 22s8-3.4 8-10V5.5L12 2 4 5.5V12c0 6.6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/><path d="M5 15l.6 1.6L7.2 17l-1.6.6L5 19.2l-.6-1.6L2.8 17l1.6-.4z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    box: '<path d="m12 2 9 5v10l-9 5-9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
    filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 9v5M12 17h.01"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>',
    wheat: '<path d="M12 22V9"/><path d="M12 9c0-3 2-5 5-5 0 3-2 5-5 5z"/><path d="M12 9c0-3-2-5-5-5 0 3 2 5 5 5z"/><path d="M12 15c0-3 2-5 5-5 0 3-2 5-5 5z"/><path d="M12 15c0-3-2-5-5-5 0 3 2 5 5 5z"/>',
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    package: '<path d="m12 2 9 5v10l-9 5-9-5V7z"/><path d="M7.5 4.5 16.5 9.5M3 7l9 5 9-5"/><path d="M12 12v10"/>',
    headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M4 15h3v6H5a1 1 0 0 1-1-1zM20 15h-3v6h2a1 1 0 0 0 1-1z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20"/>',
    store: '<path d="M3 9v11h18V9"/><path d="m2 9 2.5-5h15L22 9z"/><path d="M9 20v-6h6v6"/>',
    trending: '<path d="m3 17 6-6 4 4 8-8"/><path d="M17 7h4v4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
    tag: '<path d="M20.6 13.4 12 22 2 12V4a2 2 0 0 1 2-2h8l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.4"/><circle cx="17" cy="17" r="2.4"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m4 19 5-5 3 3 3-3 5 5"/>',
    upload: '<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/><path d="M12 3v12M8 7l4-4 4 4"/>',
    mail: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    message: '<path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-5A8 8 0 1 1 21 12z"/>',
    play: '<path d="M7 4l12 8-12 8z"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 9V7a2 2 0 0 1 2-2h2V2h-3a5 5 0 0 0-5 5v2H8v3h2v10h4V12h3l.5-3z"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
    pinterest: '<circle cx="12" cy="12" r="9"/><path d="M9.5 20c1-2 1.4-3.6 1.8-5.4"/><path d="M8.5 11.5c0-2.2 1.7-4 4-4s3.5 1.5 3.5 3.6c0 2.4-1.4 4.2-3.2 4.2-1 0-1.7-.8-1.4-1.8"/>',
    linkedin: '<rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M10 21V9h4v1.8A4 4 0 0 1 22 14v7h-4v-6a2 2 0 0 0-4 0v6z"/>',
    whatsapp: '<path d="M20 12a8 8 0 0 1-11.8 7L3 21l2-5.2A8 8 0 1 1 20 12z"/><path d="M8.8 9.4c0 2.6 2.2 4.8 4.8 4.8l1-1-1.6-1-.8.7a4 4 0 0 1-2.1-2.1l.7-.8-1-1.6z" fill="currentColor" stroke="none"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
    chef: '<path d="M6 21h12v-7H6z"/><path d="M6 14a4 4 0 0 1-1-7.9A4.5 4.5 0 0 1 12 3.5a4.5 4.5 0 0 1 7 2.6A4 4 0 0 1 18 14"/>',
    thermometer: '<path d="M14 14.8V4a2 2 0 1 0-4 0v10.8a4 4 0 1 0 4 0z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    key: '<path d="m21 2-2 2m-1.5 1.5L16 7l-4 4-2-2-4 4 2 2-3 3-2-2-2 2 3 3 7-7 4-4"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>'
  };

  function icon(name, cls) {
    var d = paths[name];
    if (!d) return "";
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (cls ? ' class="' + cls + '"' : "") + ">" + d + "</svg>";
  }

  /* --------------------------- Placeholder art --------------------------
     Deterministic, art-directed SVG stands in for photography. Every product
     gets a stable composition from its id, tinted with its brand tones and
     carrying a line-art motif that matches the product type. Drop real
     photography in by giving a product an `image` property — media() prefers
     it automatically.
     ------------------------------------------------------------------- */
  var motifs = {
    cake: '<path d="M18 78h64M24 78V52a8 8 0 0 1 8-8h36a8 8 0 0 1 8 8v26M24 60c6 4 11 4 16 0s10 4 16 0 10 4 16 0M50 44V30M50 30a4 4 0 0 0 0-8 4 4 0 0 0 0 8" />',
    croissant: '<path d="M14 60c8-22 30-34 52-30 8 1.5 12 8 10 15-3 10-14 18-30 21-12 2.5-24 0-32-6z"/><path d="M28 52c6 4 14 6 22 5M36 40c4 5 10 8 17 9M22 62c5 3 12 4 18 3"/>',
    cookie: '<circle cx="50" cy="50" r="26"/><circle cx="42" cy="42" r="3.2"/><circle cx="57" cy="46" r="2.6"/><circle cx="47" cy="58" r="3"/><circle cx="60" cy="58" r="2.2"/><circle cx="38" cy="55" r="2"/>',
    bread: '<path d="M20 62c0-14 13-24 30-24s30 10 30 24a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4z"/><path d="M36 44l-6 12M50 40l-6 14M64 44l-6 12"/>',
    chocolate: '<rect x="26" y="28" width="48" height="44" rx="3"/><path d="M26 43h48M26 57h48M42 28v44M58 28v44"/>',
    tart: '<path d="M20 56h60l-4 10a6 6 0 0 1-6 4H30a6 6 0 0 1-6-4z"/><path d="M24 56c2-14 12-22 26-22s24 8 26 22"/><circle cx="42" cy="48" r="3"/><circle cx="56" cy="45" r="3"/><circle cx="50" cy="53" r="2.4"/>',
    hamper: '<rect x="22" y="42" width="56" height="34" rx="4"/><path d="M22 54h56"/><path d="M50 42v34"/><path d="M50 42c-6-10-16-12-20-6 3 5 12 6 20 6zM50 42c6-10 16-12 20-6-3 5-12 6-20 6z"/>',
    tea: '<path d="M50 78V44"/><path d="M50 44c0-12 8-20 20-20 0 12-8 20-20 20z"/><path d="M50 52c0-11-8-18-18-18 0 11 8 18 18 18z"/><path d="M32 78h36"/>',
    bonbon: '<path d="M22 66a28 28 0 0 1 56 0z"/><path d="M22 66h56"/><path d="M36 52c4-6 10-9 14-9M56 46c4 2 7 5 9 9"/>',
    cupcake: '<path d="M30 52h40l-6 26H36z"/><path d="M28 52c0-10 10-16 22-16s22 6 22 16z"/><path d="M50 36V26M50 26a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>',
    coffee: '<path d="M24 40h40v20a14 14 0 0 1-14 14H38a14 14 0 0 1-14-14z"/><path d="M64 44h6a8 8 0 0 1 0 16h-6"/><path d="M22 80h48"/>',
    default: '<circle cx="50" cy="50" r="24"/><path d="M50 26v48M26 50h48"/>'
  };

  function motifFor(product) {
    if (!product) return "default";
    var c = product.cats || [];
    var map = [
      ["croissants", "croissant"], ["cookies", "cookie"], ["breads", "bread"],
      ["chocolates", "chocolate"], ["cupcakes", "cupcake"], ["hampers", "hamper"],
      ["assamese", "tea"], ["coffee", "tea"], ["healthy-snacks", "cookie"],
      ["gift-cards", "hamper"], ["corporate-gifting", "hamper"],
      ["birthday-cakes", "cake"], ["celebration-cakes", "cake"], ["pastries", "tart"],
      ["brownies", "chocolate"], ["burgers", "bread"], ["pizza", "bread"],
      ["bakhar-khani", "croissant"], ["patties-rolls", "croissant"],
      ["hot-dogs", "bread"], ["savouries", "bread"], ["desserts", "tart"],
      ["macarons", "cookie"], ["muffins", "cupcake"]
    ];
    for (var i = 0; i < map.length; i++) {
      if (c.indexOf(map[i][0]) > -1) return map[i][1];
    }
    return "default";
  }

  /* Grain texture reused by every media frame (set once on :root). */
  function installGrain() {
    if (doc.documentElement.style.getPropertyValue("--grain")) return;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">' +
      '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>' +
      '<feColorMatrix type="saturate" values="0"/></filter>' +
      '<rect width="180" height="180" filter="url(#n)" opacity="0.42"/></svg>';
    doc.documentElement.style.setProperty("--grain", 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svg) + '")');
  }

  /* A tinted plate with a small emblem — reads as art direction rather than a
     blown-up icon. Composition is deterministic from the seed, so a product
     always looks the same, and every frame differs from its neighbours. */
  function art(seed, tones, motif) {
    var h = util.hash(seed || "saiph");
    var t = tones || (SAIPH.data && SAIPH.data.tones ? SAIPH.data.tones.saiph : ["#1b2a45", "#a98a52", "#f2e6d0"]);
    var id = "a" + (h % 100000);
    var ax = 16 + (h % 30);
    var ay = 12 + ((h >> 3) % 26);
    var bx = 56 + ((h >> 5) % 32);
    var by = 54 + ((h >> 7) % 30);
    var rot = ((h >> 9) % 14) - 7;
    var scale = (30 + ((h >> 11) % 9)) / 100;      /* 0.30 – 0.38 of the frame */
    var ring = 20 + ((h >> 13) % 4);
    var m = motifs[motif || "default"] || motifs.default;
    var emblem = "translate(50 50) rotate(" + rot + ") scale(" + scale + ") translate(-50 -50)";

    return '<svg class="media__art" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" ' +
      'role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">' +
      "<defs>" +
        '<linearGradient id="' + id + 'g" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="' + t[0] + '"/>' +
          '<stop offset="55%" stop-color="' + t[1] + '"/>' +
          '<stop offset="100%" stop-color="' + t[2] + '"/>' +
        "</linearGradient>" +
        '<radialGradient id="' + id + 'r1" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="' + t[2] + '" stop-opacity="0.55"/>' +
          '<stop offset="100%" stop-color="' + t[2] + '" stop-opacity="0"/>' +
        "</radialGradient>" +
        '<radialGradient id="' + id + 'r2" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="' + t[0] + '" stop-opacity="0.75"/>' +
          '<stop offset="100%" stop-color="' + t[0] + '" stop-opacity="0"/>' +
        "</radialGradient>" +
        /* vignette gives the flat gradient photographic depth */
        '<radialGradient id="' + id + 'v" cx="50%" cy="46%" r="62%">' +
          '<stop offset="55%" stop-color="' + t[0] + '" stop-opacity="0"/>' +
          '<stop offset="100%" stop-color="' + t[0] + '" stop-opacity="0.5"/>' +
        "</radialGradient>" +
      "</defs>" +
      '<rect width="100" height="100" fill="url(#' + id + 'g)"/>' +
      '<circle cx="' + ax + '" cy="' + ay + '" r="40" fill="url(#' + id + 'r1)"/>' +
      '<circle cx="' + bx + '" cy="' + by + '" r="44" fill="url(#' + id + 'r2)"/>' +
      '<circle cx="50" cy="50" r="' + ring + '" fill="none" stroke="' + t[2] +
        '" stroke-opacity="0.16" stroke-width="0.5"/>' +
      '<g transform="' + emblem + '" fill="none" stroke="' + t[2] +
        '" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + m + "</g>" +
      '<rect width="100" height="100" fill="url(#' + id + 'v)"/>' +
      "</svg>";
  }

  /* media(product, {ratio, scrim, seed, tones, motif}) */
  function media(product, opts) {
    opts = opts || {};
    var ratio = opts.ratio || "square";
    var cls = "media media--" + ratio + (opts.className ? " " + opts.className : "");
    var inner;
    if (product && product.image) {
      var src = product.image;
      if (global.location && global.location.pathname.indexOf("/admin") > -1 && src.indexOf("../") !== 0 && src.indexOf("/") !== 0 && src.indexOf("http") !== 0) {
        src = "../" + src;
      }
      inner = '<img src="' + util.esc(src) + '" alt="' + util.esc(opts.alt || product.name) +
        '" loading="' + (opts.eager ? "eager" : "lazy") + '" decoding="async" width="800" height="800">';
    } else {
      inner = art(
        opts.seed || (product ? product.id : "saiph"),
        opts.tones || (product ? product.art : null),
        opts.motif || motifFor(product)
      );
    }
    return '<div class="' + cls + '">' + inner +
      '<span class="media__grain"></span>' +
      (opts.scrim ? '<span class="media__scrim' + (opts.scrim === "full" ? " media__scrim--full" : "") + '"></span>' : "") +
      "</div>";
  }

  /* ------------------------------- Rating ------------------------------- */
  function stars(value, size) {
    var full = Math.floor(value);
    var half = value - full >= 0.4;
    var out = "";
    for (var i = 1; i <= 5; i++) {
      var isOn = i <= full || (i === full + 1 && half);
      out += '<svg viewBox="0 0 24 24" fill="' + (isOn ? "currentColor" : "none") +
        '" stroke="currentColor" stroke-width="1.4" class="' + (isOn ? "" : "is-empty") +
        '" aria-hidden="true">' + paths.star + "</svg>";
    }
    return '<span class="rating__stars' + (size === "lg" ? " rating__stars--lg" : "") + '">' + out + "</span>";
  }

  function rating(value, count, opts) {
    opts = opts || {};
    return '<span class="rating' + (opts.lg ? " rating--lg" : "") + '" aria-label="Rated ' + value + ' out of 5">' +
      stars(value) +
      '<span class="rating__value">' + value.toFixed(1) + "</span>" +
      (count != null ? '<span class="rating__count">(' + count.toLocaleString("en-IN") + ")</span>" : "") +
      "</span>";
  }

  /* ------------------------------- Badges ------------------------------- */
  var badgeClass = {
    BESTSELLER: "badge--bestseller",
    NEW: "badge--new",
    SIGNATURE: "badge--signature",
    "LIMITED EDITION": "badge--limited",
    "SUGAR-FREE": "badge--sugarfree",
    "KETO": "badge--keto",
    "VEGAN": "badge--vegan",
    "GLUTEN-FREE": "badge--glutenfree"
  };

  function badges(list, extra) {
    var out = (list || []).map(function (b) {
      return '<span class="badge ' + (badgeClass[b] || "") + '">' + util.esc(b) + "</span>";
    });
    (extra || []).forEach(function (e) { out.push(e); });
    return out.join("");
  }

  /* ---------------------------- Product card ---------------------------- */
  function priceBlock(product, cls) {
    var save = product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
    var from = product.variants.length > 1 ? '<span class="product-card__weight">from</span> ' : "";
    return '<span class="' + (cls || "product-card__price") + '">' + from +
      util.money(product.price) +
      (product.mrp ? "<del>" + util.money(product.mrp) + "</del>" : "") +
      (save ? '<span class="save">' + save + "% off</span>" : "") +
      "</span>";
  }

  function productCard(product, opts) {
    opts = opts || {};
    var wished = SAIPH.store && SAIPH.store.wishlist.has(product.id);
    var eggless = product.diet.indexOf("eggless") > -1
      ? '<span class="badge badge--eggless">Eggless</span>' : "";
    var v0 = product.variants[0];
    /* Customisable cakes cannot be added blind — quickAdd routes them to quick
       view, so the button must say so rather than promising a one-tap add. */
    var needsChoice = product.customisable && product.variants.length > 1;

    return '<article class="product-card' + (opts.rail ? " product-card--rail" : "") + '" data-product="' + product.id + '"' +
        (product.theme ? ' data-brand="' + product.theme + '"' : "") + ">" +
      '<div class="product-card__media">' +
        '<a class="product-card__link" href="' + product.url + '" aria-label="' + util.esc(product.name) + '">' +
          media(product, { ratio: opts.ratio || "square" }) +
        "</a>" +
        '<div class="product-card__badges">' + badges(product.badges, eggless ? [eggless] : []) + "</div>" +
        '<button class="product-card__wish" type="button" data-wish="' + product.id + '" ' +
          'aria-pressed="' + (wished ? "true" : "false") + '" ' +
          'aria-label="' + (wished ? "Remove from" : "Add to") + ' wishlist">' + icon("heart") + "</button>" +
        '<div class="product-card__hover">' +
          '<button class="product-card__quick" type="button" data-quickview="' + product.id + '">' +
            icon("eye") + "Quick View</button>" +
          '<button class="product-card__quick product-card__quick--primary" type="button" ' +
            'data-quickadd="' + product.id + '">' +
            icon(needsChoice ? "sparkles" : "plus") +
            (needsChoice ? "Choose Options" : "Quick Add") + "</button>" +
        "</div>" +
      "</div>" +
      '<div class="product-card__body">' +
        '<span class="product-card__brand"><span class="brandname">' + util.esc(product.brandName) + "</span></span>" +
        '<h3 class="product-card__name"><a href="' + product.url + '">' + util.esc(product.name) + "</a></h3>" +
        '<p class="product-card__desc">' + util.esc(product.desc) + "</p>" +
        '<div class="product-card__meta">' +
          '<div class="row row--between row--nowrap">' +
            priceBlock(product) +
            rating(product.rating, product.reviews) +
          "</div>" +
          (v0.weight ? '<span class="product-card__weight">' + util.esc(v0.weight) +
            (v0.servings ? " · serves " + util.esc(v0.servings) : "") + "</span>" : "") +
        "</div>" +
      "</div>" +
    "</article>";
  }

  function productGrid(list, opts) {
    opts = opts || {};
    return list.map(function (p) { return productCard(p, opts); }).join("");
  }

  /* -------------------------------- Toasts ------------------------------ */
  var toaster = null;
  function ensureToaster() {
    if (toaster) return toaster;
    toaster = doc.createElement("div");
    toaster.className = "toaster";
    toaster.setAttribute("role", "status");
    toaster.setAttribute("aria-live", "polite");
    doc.body.appendChild(toaster);
    return toaster;
  }

  function toast(opts) {
    if (typeof opts === "string") opts = { title: opts };
    var el = doc.createElement("div");
    el.className = "toast" + (opts.variant ? " toast--" + opts.variant : "");
    el.innerHTML =
      (opts.product ? '<span class="toast__media">' + media(opts.product, { ratio: "square" }) + "</span>"
        : '<span style="color:var(--gold-300);display:grid">' + icon(opts.icon || "checkCircle") + "</span>") +
      '<span><span class="toast__title">' + util.esc(opts.title) + "</span>" +
      (opts.note ? '<br><span class="toast__note">' + util.esc(opts.note) + "</span>" : "") + "</span>" +
      (opts.action ? '<a class="toast__action" href="' + opts.action.href + '">' + util.esc(opts.action.label) + "</a>"
        : '<button class="toast__action" data-toast-close type="button">Close</button>');
    ensureToaster().appendChild(el);

    var life = setTimeout(close, opts.duration || 4200);
    function close() {
      clearTimeout(life);
      el.classList.add("is-out");
      setTimeout(function () { el.remove(); }, 280);
    }
    el.addEventListener("click", function (e) {
      if (e.target.closest("[data-toast-close]")) close();
    });
    return { close: close };
  }

  /* --------------------------- Fly to cart ------------------------------ */
  function flyToCart(sourceEl, product) {
    if (!sourceEl || global.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var target = doc.querySelector("[data-cart-open]");
    if (!target) return;
    var from = sourceEl.getBoundingClientRect();
    var to = target.getBoundingClientRect();
    var ghost = doc.createElement("div");
    ghost.className = "fly-ghost";
    ghost.innerHTML = media(product, { ratio: "square" });
    ghost.style.left = from.left + from.width / 2 - 36 + "px";
    ghost.style.top = from.top + from.height / 2 - 36 + "px";
    doc.body.appendChild(ghost);
    requestAnimationFrame(function () {
      ghost.style.transform = "translate(" +
        (to.left + to.width / 2 - (from.left + from.width / 2)) + "px," +
        (to.top + to.height / 2 - (from.top + from.height / 2)) + "px) scale(0.18)";
      ghost.style.opacity = "0.15";
    });
    setTimeout(function () { ghost.remove(); }, 760);
  }

  /* --------------------------- Overlay control -------------------------- */
  var openStack = [];

  function lockScroll(on) {
    doc.body.classList.toggle("is-locked", !!on);
  }

  function trapFocus(panel, e) {
    if (e.key !== "Tab") return;
    var f = panel.querySelectorAll('a[href],button:not([disabled]),input:not([type="hidden"]),select,textarea,[tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openOverlay(el, opts) {
    opts = opts || {};
    if (!el || el.classList.contains("is-open")) return;
    var returnTo = doc.activeElement;
    el.classList.add("is-open");
    el.removeAttribute("aria-hidden");
    if (opts.scrim !== false) {
      var scrim = doc.querySelector("[data-scrim]");
      if (scrim) scrim.classList.add("is-open");
    }
    lockScroll(true);

    function onKey(e) {
      if (e.key === "Escape") closeOverlay(el);
      trapFocus(el, e);
    }
    doc.addEventListener("keydown", onKey);
    openStack.push({ el: el, onKey: onKey, returnTo: returnTo, opts: opts });

    var focusTarget = el.querySelector("[data-autofocus]") ||
      el.querySelector('input:not([type="hidden"]), button, a[href]');
    setTimeout(function () { if (focusTarget) focusTarget.focus({ preventScroll: true }); }, 120);
    SAIPH.store && SAIPH.store.emit("overlay:open", el);
  }

  function closeOverlay(el) {
    var idx = -1;
    for (var i = openStack.length - 1; i >= 0; i--) {
      if (!el || openStack[i].el === el) { idx = i; break; }
    }
    if (idx === -1) return;
    var rec = openStack.splice(idx, 1)[0];
    rec.el.classList.remove("is-open");
    rec.el.setAttribute("aria-hidden", "true");
    doc.removeEventListener("keydown", rec.onKey);
    if (!openStack.length) {
      lockScroll(false);
      var scrim = doc.querySelector("[data-scrim]");
      if (scrim) scrim.classList.remove("is-open");
    }
    if (rec.returnTo && rec.returnTo.focus) rec.returnTo.focus({ preventScroll: true });
  }

  function closeAllOverlays() {
    while (openStack.length) closeOverlay(openStack[openStack.length - 1].el);
  }

  /* ------------------------------- Modal -------------------------------- */
  function modal(html, opts) {
    opts = opts || {};
    var el = doc.getElementById("saiph-modal");
    if (!el) {
      el = doc.createElement("div");
      el.id = "saiph-modal";
      el.className = "modal";
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-modal", "true");
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = '<div class="modal__panel" data-modal-panel>' +
        '<button class="modal__close" type="button" data-modal-close aria-label="Close">' + icon("x") + "</button>" +
        '<div data-modal-body></div></div>';
      doc.body.appendChild(el);
      el.addEventListener("click", function (e) {
        if (e.target === el || e.target.closest("[data-modal-close]")) closeOverlay(el);
      });
    }
    var panel = el.querySelector("[data-modal-panel]");
    panel.className = "modal__panel" + (opts.size === "sm" ? " modal__panel--sm" : "");
    if (opts.brand) panel.setAttribute("data-brand", opts.brand); else panel.removeAttribute("data-brand");
    el.querySelector("[data-modal-body]").innerHTML = html;
    if (opts.label) el.setAttribute("aria-label", opts.label);
    openOverlay(el);
    return el;
  }

  /* --------------------------- Scroll reveal ---------------------------- */
  function reveal(root) {
    var nodes = (root || doc).querySelectorAll("[data-reveal]:not(.is-in)");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in global)) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    nodes.forEach(function (n, i) {
      if (!n.style.getPropertyValue("--reveal-delay")) {
        n.style.setProperty("--reveal-delay", ((i % 6) * 65) + "ms");
      }
      io.observe(n);
    });
  }

  /* --------------------------- Accordion / tabs ------------------------- */
  function bindAccordions(root) {
    (root || doc).querySelectorAll("[data-accordion]").forEach(function (acc) {
      if (acc.dataset.bound) return;
      acc.dataset.bound = "1";
      acc.addEventListener("click", function (e) {
        var btn = e.target.closest(".accordion__btn, .filter-group__btn, .mobile-nav__link");
        if (!btn) return;
        var item = btn.closest(".accordion__item, .filter-group, .mobile-nav__group");
        if (!item) return;
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (acc.dataset.accordion === "single" && open) {
          Array.prototype.forEach.call(acc.children, function (sib) {
            if (sib !== item) {
              sib.classList.remove("is-open");
              var b = sib.querySelector(".accordion__btn");
              if (b) b.setAttribute("aria-expanded", "false");
            }
          });
        }
      });
    });
  }

  function bindTabs(root) {
    (root || doc).querySelectorAll("[data-tabs]").forEach(function (wrap) {
      if (wrap.dataset.bound) return;
      wrap.dataset.bound = "1";
      var tabs = wrap.querySelectorAll('[role="tab"]');
      wrap.addEventListener("click", function (e) {
        var tab = e.target.closest('[role="tab"]');
        if (!tab) return;
        select(tab);
      });
      wrap.addEventListener("keydown", function (e) {
        var tab = e.target.closest('[role="tab"]');
        if (!tab) return;
        var list = Array.prototype.slice.call(tabs);
        var i = list.indexOf(tab);
        if (e.key === "ArrowRight") { e.preventDefault(); select(list[(i + 1) % list.length], true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); select(list[(i - 1 + list.length) % list.length], true); }
      });
      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.tabIndex = on ? 0 : -1;
          var panel = doc.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
      }
    });
  }

  /* ------------------------------ Counters ------------------------------ */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    if (isNaN(target) || global.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var suffix = el.dataset.countSuffix || "";
    var dp = (el.dataset.countDp | 0);
    var start = performance.now();
    var dur = 1400;
    function tick(now) {
      var t = util.clamp((now - start) / dur, 0, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(dp).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function bindCounters(root) {
    var nodes = (root || doc).querySelectorAll("[data-count]");
    if (!nodes.length || !("IntersectionObserver" in global)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  installGrain();

  SAIPH.ui = {
    icon: icon,
    icons: paths,
    art: art,
    media: media,
    motifFor: motifFor,
    stars: stars,
    rating: rating,
    badges: badges,
    priceBlock: priceBlock,
    productCard: productCard,
    productGrid: productGrid,
    toast: toast,
    flyToCart: flyToCart,
    modal: modal,
    openOverlay: openOverlay,
    closeOverlay: closeOverlay,
    closeAllOverlays: closeAllOverlays,
    reveal: reveal,
    bindAccordions: bindAccordions,
    bindTabs: bindTabs,
    bindCounters: bindCounters
  };
})(typeof window !== "undefined" ? window : this);

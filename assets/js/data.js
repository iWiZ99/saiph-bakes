/* ==========================================================================
   SAiPH Bakes — Data layer
   Single source of truth for brands, categories, catalogue, stores and content.
   Swap this file for API calls when wiring a real backend: every consumer
   reads through SAIPH.data.* and SAIPH.query.*.
   ========================================================================== */
(function (global) {
  "use strict";

  var SAIPH = (global.SAIPH = global.SAIPH || {});

  /* ------------------------------- Company ------------------------------ */
  var company = {
    name: "SAiPH Bakes",
    legal: "SAiPH Bakes Foods Pvt. Ltd.",
    tagline: "Healthy & Sugar-Free Artisanal Bakes",
    promise: "Zero Refined Sugar • Premium Pure Ingredients • Guilt-Free Indulgence",
    phone: "+91 98640 00000",
    phoneHref: "+919864000000",
    wholesalePhone: "+91 98640 00011",
    email: "hello@saiphbakes.com",
    corporateEmail: "corporate@saiphbakes.com",
    wholesaleEmail: "wholesale@saiphbakes.com",
    franchiseEmail: "franchise@saiphbakes.com",
    hq: "SAiPH Bakes, Chowkidinghee, RKB Path, Dibrugarh, Assam 786001",
    founded: 2019,
    currency: "INR",
    currencySymbol: "₹",
    /* Registration numbers: leave blank until the real ones are issued —
       a fabricated FSSAI or GSTIN on a live site is a legal exposure. */
    gst: "",
    fssai: "",
    cin: "",
    freeShipThreshold: 999,
    shippingFlat: 79,
    social: {
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      youtube: "https://www.youtube.com/",
      pinterest: "https://www.pinterest.com/",
      linkedin: "https://www.linkedin.com/"
    },
    /* Set verified:true only when score and count come from real review data.
       Until then the rating panel and every aggregateRating in structured data
       stay off, because inventing them breaks Google's policies and misleads
       customers. */
    rating: { score: 4.8, count: 3412, source: "Google Reviews", verified: false }
  };

  /* -------------------------------- Brands ------------------------------ */
  var brands = [
    {
      id: "saiph",
      key: "saiph",
      name: "SAiPH Bakes",
      full: "SAiPH Bakes",
      tag: "The Master Brand",
      theme: null,
      dot: "#c19a4c",
      url: "about.html",
      short: "A modern bakery and food company crafting everyday delight and once-in-a-lifetime celebration.",
      desc: "SAiPH Bakes is the parent house behind DoughReMi, SAiPH Signature and Khowdy — one craft kitchen, one standard of quality, three ways to enjoy it."
    },
    {
      id: "doughremi",
      key: "doughremi",
      name: "DoughReMi",
      full: "DoughReMi by SAiPH Bakes",
      tag: "Everyday Bakery & Café",
      theme: "doughremi",
      dot: "#b57334",
      url: "brand-doughremi.html",
      short: "Fresh breads, pastries, cakes, coffee and everyday favourites.",
      desc: "The neighbourhood counter of the SAiPH family — baked through the day, priced for every day, never compromised.",
      cta: "Shop DoughReMi",
      keywords: ["Baked hourly", "Café counter", "Family sizes", "Everyday pricing"],
      stats: [
        { n: "6am", l: "First bake" },
        { n: "42", l: "Daily SKUs" },
        { n: "100%", l: "Same-day fresh" }
      ]
    },
    {
      id: "signature",
      key: "signature",
      name: "SAiPH Signature",
      full: "SAiPH Signature by SAiPH Bakes",
      tag: "Luxury Pâtisserie",
      theme: "signature",
      dot: "#d8be85",
      url: "brand-signature.html",
      short: "Handcrafted cakes, entremets, chocolates and celebration desserts.",
      desc: "Our couture kitchen. Single-origin chocolate, seasonal fruit, mirror glazes and gold leaf — finished by hand, numbered by batch.",
      cta: "Explore Signature",
      keywords: ["Hand-finished", "Single origin", "Numbered batches", "48h notice"],
      stats: [
        { n: "24k", l: "Edible gold leaf" },
        { n: "72h", l: "Entremet build" },
        { n: "9", l: "Component layers" }
      ]
    },
    {
      id: "khowdy",
      key: "khowdy",
      name: "Khowdy",
      full: "Khowdy by SAiPH Bakes",
      tag: "Taste. Tradition. Naturally.",
      theme: "khowdy",
      dot: "#2f6a45",
      url: "brand-khowdy.html",
      short: "Assam-inspired snacks, premium cookies and healthy packaged foods.",
      desc: "Assamese pantry classics, reimagined clean: single-estate tea, black rice, millets and jaggery — no palm oil, no maida shortcuts.",
      cta: "Discover Khowdy",
      keywords: ["Assam sourced", "No palm oil", "Millet-first", "Shelf stable"],
      stats: [
        { n: "14", l: "Partner estates" },
        { n: "0", l: "Palm oil" },
        { n: "6mo", l: "Shelf life" }
      ]
    }
  ];

  /* ------------------------------ Categories ---------------------------- */
  var categories = [
    { id: "birthday-cakes", name: "Birthday Cakes", brands: ["doughremi", "signature"], blurb: "Candles, chocolate and a name piped by hand." },
    { id: "celebration-cakes", name: "Celebration Cakes", brands: ["signature", "doughremi"], blurb: "Anniversaries, weddings and every milestone between." },
    { id: "pastries", name: "Pastries", brands: ["doughremi", "signature"], blurb: "Single-serve indulgence from the daily counter." },
    { id: "croissants", name: "Croissants", brands: ["doughremi", "signature"], blurb: "Laminated over three days, baked to order." },
    { id: "brownies", name: "Brownies", brands: ["doughremi"], blurb: "Fudge centre, crackled top, Belgian couverture." },
    { id: "chocolates", name: "Chocolates", brands: ["signature"], blurb: "Bonbons, bars and pralines from our chocolate room." },
    { id: "cookies", name: "Cookies", brands: ["khowdy", "doughremi"], blurb: "Tea-time jars worth keeping on the counter." },
    { id: "breads", name: "Breads", brands: ["doughremi"], blurb: "Slow ferment, wood-fired crust, nothing artificial." },
    { id: "hampers", name: "Gift Hampers", brands: ["signature", "khowdy", "doughremi"], blurb: "Curated, ribboned and ready to gift." },
    { id: "assamese", name: "Assamese Specialities", brands: ["khowdy"], blurb: "Regional recipes made with estate-fresh ingredients." },
    { id: "healthy-snacks", name: "Healthy Snacks", brands: ["khowdy"], blurb: "Millet, jaggery and cold-pressed goodness." },
    { id: "corporate-gifting", name: "Corporate Gifting", brands: ["signature", "khowdy"], blurb: "Branded, bulk-ready and beautifully presented." },
    { id: "cupcakes", name: "Cupcakes", brands: ["doughremi"], blurb: "Party-ready boxes of six and twelve." },
    { id: "coffee", name: "Coffee & Beverages", brands: ["doughremi", "khowdy"], blurb: "Estate tea and single-origin espresso." },
    { id: "gift-cards", name: "Gift Cards", brands: ["saiph"], blurb: "Let them choose their own indulgence." },
    { id: "burgers", name: "Burgers & Buns", brands: ["doughremi"], blurb: "Freshly baked soft buns filled with savoury patties, cheese & sauces." },
    { id: "bakhar-khani", name: "Bakhar Khani", brands: ["doughremi"], blurb: "Traditional flaky laminated bakery crust with sweet and savoury twists." },
    { id: "pizza", name: "Artisan Pizzas", brands: ["doughremi"], blurb: "Stone-baked hand-stretched crusts topped with molten cheese & fresh toppings." },
    { id: "patties-rolls", name: "Patties & Rolls", brands: ["doughremi"], blurb: "Flaky golden puff pastries, stuffed rolls and sweet coconut pops." },
    { id: "hot-dogs", name: "Hot Dogs", brands: ["doughremi"], blurb: "Warm brioche buns packed with seasoned fillings and spicy peri-peri glazes." },
    { id: "savouries", name: "Bakery Savouries", brands: ["doughremi"], blurb: "Freshly prepared comfort savouries, baked samosas and flaky parathas." },
    { id: "desserts", name: "Pâtisserie Desserts", brands: ["signature", "doughremi"], blurb: "Artisan pies, tarts, and luxury confectionery." },
    { id: "macarons", name: "French Macarons", brands: ["signature"], blurb: "Delicate French almond shells with velvety ganache fillings." },
    { id: "muffins", name: "Muffins & Teacakes", brands: ["doughremi"], blurb: "Moist, domed bakery muffins loaded with chocolate chips and berries." },
  ];

  var occasions = [
    { id: "birthday", name: "Birthday", icon: "🎂" },
    { id: "anniversary", name: "Anniversary", icon: "🥂" },
    { id: "wedding", name: "Wedding", icon: "💍" },
    { id: "baby-shower", name: "Baby Shower", icon: "🍼" },
    { id: "graduation", name: "Graduation", icon: "🎓" },
    { id: "corporate", name: "Corporate", icon: "💼" },
    { id: "festival", name: "Festival", icon: "🪔" },
    { id: "custom", name: "Custom Celebration", icon: "✨" }
  ];

  var diets = [
    { id: "sugar-free", name: "Sugar Free" },
    { id: "keto", name: "Keto Friendly" },
    { id: "gluten-free", name: "Gluten Free" },
    { id: "vegan", name: "Vegan" },
    { id: "eggless", name: "Eggless" },
    { id: "high-protein", name: "High Protein" },
    { id: "nut-free", name: "Nut Free" }
  ];

  /* --------------------------- Art tone palettes -------------------------
     One source of truth for the generated placeholder imagery, so brand
     colour never drifts between product cards, category tiles, hero
     backdrops and the build-time renderer.
     --------------------------------------------------------------------- */
  var tones = {
    saiph: ["#1b2a45", "#a98a52", "#f2e6d0"],
    signature: ["#100d12", "#2b2028", "#d8be85"],
    doughremi: ["#5e3a20", "#c08a50", "#f6e7d2"],
    khowdy: ["#22402c", "#7d6140", "#e9e3cd"]
  };

  /* ------------------------- Catalogue defaults ------------------------- */
  var brandDefaults = {
    signature: {
      storage: "Refrigerate at 2–4°C. Bring to room temperature for 15 minutes before serving.",
      shelfLife: "Best enjoyed within 48 hours of delivery.",
      allergens: ["Milk", "Wheat", "Eggs", "Soy"],
      leadHours: 48,
      cutoff: "6:00 PM, two days prior",
      art: tones.signature
    },
    doughremi: {
      storage: "Store in a cool, dry place. Refrigerate cream-based items.",
      shelfLife: "Freshest on the day of delivery; 2 days refrigerated.",
      allergens: ["Milk", "Wheat", "Eggs"],
      leadHours: 6,
      cutoff: "8:00 PM for next-day delivery",
      art: tones.doughremi
    },
    khowdy: {
      storage: "Store in an airtight container away from direct sunlight.",
      shelfLife: "6 months from date of packing.",
      allergens: ["Wheat", "Milk"],
      leadHours: 0,
      cutoff: "Ships same day if ordered before 4:00 PM",
      art: tones.khowdy
    }
  };

  var sizeSets = {
    poundCake: [
      { id: "1lb", label: "1 Pound (approx. 500g)", weight: "500 g", servings: "4–6", mult: 1 },
      { id: "2lb", label: "2 Pound (approx. 1 kg)", weight: "1 kg", servings: "8–10", mult: 1.85 },
      { id: "3lb", label: "3 Pound (approx. 1.5 kg)", weight: "1.5 kg", servings: "14–16", mult: 2.7 },
      { id: "4lb", label: "4 Pound (approx. 2 kg)", weight: "2 kg", servings: "18–22", mult: 3.5 }
    ],
    cake: [
      { id: "500g", label: "500 g", weight: "500 g", servings: "4–6", mult: 0.62 },
      { id: "1kg", label: "1 kg", weight: "1 kg", servings: "8–10", mult: 1 },
      { id: "1.5kg", label: "1.5 kg", weight: "1.5 kg", servings: "14–16", mult: 1.44 },
      { id: "2kg", label: "2 kg", weight: "2 kg", servings: "18–22", mult: 1.86 }
    ],
    box: [
      { id: "box6", label: "Box of 6", weight: "6 pc", servings: "6", mult: 1 },
      { id: "box12", label: "Box of 12", weight: "12 pc", servings: "12", mult: 1.88 },
      { id: "box24", label: "Box of 24", weight: "24 pc", servings: "24", mult: 3.6 }
    ],
    jar: [
      { id: "150g", label: "150 g", weight: "150 g", servings: "5–6", mult: 1 },
      { id: "300g", label: "300 g", weight: "300 g", servings: "10–12", mult: 1.85 },
      { id: "pack3", label: "Pack of 3", weight: "450 g", servings: "15–18", mult: 2.6 }
    ],
        loaf: [{ id: "loaf", label: "Loaf (400g)", weight: "400 g", servings: "8–10 slices", mult: 1 }],
    teacake: [{ id: "loaf", label: "Loaf (350g)", weight: "350 g", servings: "4–6", mult: 1 }],
    pizza: [
      { id: "8in", label: "8-inch Personal", weight: "8 inch", servings: "1–2", mult: 1 },
      { id: "11in", label: "11-inch Medium", weight: "11 inch", servings: "2–3", mult: 1.6 }
    ],
    pack2: [
      { id: "pc2", label: "Pack of 2", weight: "2 pc", servings: "2", mult: 1 },
      { id: "pc4", label: "Pack of 4", weight: "4 pc", servings: "4", mult: 1.85 }
    ],
    patties: [
      { id: "pc1", label: "1 pc", weight: "1 pc", servings: "1", mult: 1 },
      { id: "pc4", label: "Box of 4", weight: "4 pc", servings: "4", mult: 3.7 }
    ],
    pie: [
      { id: "slice", label: "Large Slice (200g)", weight: "200 g", servings: "1", mult: 1 },
      { id: "whole", label: "Whole Pie (8-inch)", weight: "750 g", servings: "6–8", mult: 2.5 }
    ],
    perKg: [
      { id: "1kg", label: "1 kg", weight: "1 kg", servings: "16–20", mult: 1 },
      { id: "500g", label: "500 g", weight: "500 g", servings: "8–10", mult: 0.5 },
      { id: "250g", label: "250 g", weight: "250 g", servings: "4–6", mult: 0.25 }
    ],
    piece: [
      { id: "1pc", label: "1 Piece", weight: "1 pc", servings: "1", mult: 1 },
      { id: "2pc", label: "Box of 2", weight: "2 pc", servings: "2", mult: 2 },
      { id: "4pc", label: "Box of 4", weight: "4 pc", servings: "4", mult: 4 }
    ],
    glass: [
      { id: "1glass", label: "1 Glass", weight: "1 glass", servings: "1", mult: 1 },
      { id: "2glass", label: "Set of 2", weight: "2 glass", servings: "2", mult: 2 },
      { id: "4glass", label: "Set of 4", weight: "4 glass", servings: "4", mult: 3.9 }
    ],
    donut: [
      { id: "1pc", label: "1 Piece", weight: "1 pc", servings: "1", mult: 1 },
      { id: "2pc", label: "Box of 2", weight: "2 pc", servings: "2", mult: 2 },
      { id: "4pc", label: "Box of 4", weight: "4 pc", servings: "4", mult: 4 },
      { id: "6pc", label: "Box of 6", weight: "6 pc", servings: "6", mult: 5.6 }
    ],
    single: [{ id: "std", label: "Standard", weight: "", servings: "", mult: 1 }]
  };

  var flavourSets = {
    signature: ["Dark 70% Chocolate", "Assam Tea & Caramel", "Saffron Pistachio", "Raspberry Rose", "Hazelnut Praline", "Passionfruit Mango"],
    doughremi: ["Belgian Chocolate", "Vanilla Bean", "Red Velvet", "Butterscotch", "Fresh Strawberry", "Coffee Walnut"],
    khowdy: ["Assam Tea", "Black Rice", "Millet Jaggery", "Coconut Cardamom"]
  };

  /* ------------------------------ Products ------------------------------ */
  /* price = base price for the default size; mrp optional (shows strikethrough) */
  var rawProducts = [
    {
      "id": "vanilla-cake",
      "name": "Vanilla Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 142,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Freshly baked artisan vanilla sponge made with fragrant pure Madagascar vanilla beans, whipped cream, and zero refined sugar. 100% eggless and gluten-free.",
      "long": "Freshly baked artisan vanilla sponge made with fragrant pure Madagascar vanilla beans, whipped cream, and zero refined sugar. Crafted with no maida, no artificial preservatives, and premium pure ingredients for mindful celebration. 100% Egg-Free and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, oat flour, pure Madagascar vanilla bean, natural erythritol & stevia blend, dairy cream, cold-pressed oils.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/vanilla-cake.jpg",
      "images": [
        "assets/img/products/vanilla-cake.jpg"
      ],
      "tags": [
        "cake",
        "vanilla",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "chocolate-cake",
      "name": "Chocolate Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 5,
      "reviews": 218,
      "badges": [
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Decadent dark chocolate layers enveloped in silky smooth Belgian chocolate ganache. Refined sugar-free, gluten-free, and maida-free indulgence.",
      "long": "Decadent dark chocolate layers enveloped in silky smooth Belgian chocolate ganache. Handcrafted using single-origin cocoa with zero maida and zero refined sugar. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin cacao, dark chocolate 70%, natural plant sweetener, fresh cream, grass-fed butter.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-cake.jpg",
      "images": [
        "assets/img/products/chocolate-cake.jpg"
      ],
      "tags": [
        "cake",
        "chocolate",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "butter-scotch-cake",
      "name": "Butter Scotch Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 850,
      "mrp": 980,
      "rating": 4.9,
      "reviews": 96,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Layers of moist golden sponge filled with rich handcrafted butterscotch cream and crunchy sugar-free praline crisps. 100% eggless and guilt-free.",
      "long": "Layers of moist golden sponge filled with rich handcrafted butterscotch cream and crunchy sugar-free praline crisps. Made with pure brown butter and zero artificial essences. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, brown butter, handcrafted sugar-free butterscotch caramel, natural erythritol blend, fresh cream.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/butterscotch-cake.jpg",
      "images": [
        "assets/img/products/butterscotch-cake.jpg"
      ],
      "tags": [
        "cake",
        "butterscotch",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "nutella-cake",
      "name": "Nutella Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1200,
      "mrp": 1380,
      "rating": 5,
      "reviews": 164,
      "badges": [
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Velvety chocolate hazelnut sponge filled with luscious artisanal sugar-free Nutella spread and toasted roasted hazelnuts.",
      "long": "Velvety chocolate hazelnut sponge filled with luscious artisanal sugar-free Nutella spread and toasted roasted hazelnuts. Decadent, rich, and guilt-free. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, pure hazelnut butter, Belgian cocoa, natural stevia sweetener, fresh cream, roasted hazelnuts.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (hazelnut, almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/pistachio-nutella-cake-2.jpg",
      "images": [
        "assets/img/products/pistachio-nutella-cake-2.jpg"
      ],
      "tags": [
        "cake",
        "nutella",
        "hazelnut",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "marble-cake",
      "name": "Marble Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 900,
      "mrp": 1035,
      "rating": 4.8,
      "reviews": 88,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Artistic swirls of rich dark chocolate and fragrant vanilla bean sponge, finished with a smooth marbled ganache. Wholesome, gluten-free, and eggless.",
      "long": "Artistic swirls of rich dark chocolate and fragrant vanilla bean sponge, finished with a smooth marbled ganache. Wholesome, gluten-free, and eggless with zero refined sugar. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, Madagascar vanilla, dark cocoa, erythritol blend, grass-fed butter, fresh cream.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/marble-opulence-cake.jpg",
      "images": [
        "assets/img/products/marble-opulence-cake.jpg"
      ],
      "tags": [
        "cake",
        "marble",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "oreo-cake",
      "name": "Oreo Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1000,
      "mrp": 1150,
      "rating": 4.9,
      "reviews": 110,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Cookies-and-cream perfection featuring crushed artisan chocolate biscuit crumbs folded into vanilla cream cheese frosting between moist chocolate layers.",
      "long": "Cookies-and-cream perfection featuring crushed artisan gluten-free chocolate biscuit crumbs folded into vanilla cream cheese frosting between moist chocolate layers. 100% Eggless and refined sugar-free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, gluten-free dark cacao biscuit crumble, cream cheese, natural plant sweetener, vanilla bean.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/oreo-cake.jpg",
      "images": [
        "assets/img/products/oreo-cake.jpg"
      ],
      "tags": [
        "cake",
        "oreo",
        "cookies-and-cream",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "black-forest-cake",
      "name": "Black Forest Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 178,
      "badges": [
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Airy chocolate sponge layered with tart cherry compote, fresh vanilla chantilly cream, and dark chocolate shavings. A mindful classic.",
      "long": "Airy chocolate sponge layered with tart cherry compote, fresh vanilla chantilly cream, and dark chocolate shavings. Baked without refined sugar or maida. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, dark cocoa, red sour cherries, Madagascar vanilla, dairy cream, natural erythritol.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/black-forest-cake.jpg",
      "images": [
        "assets/img/products/black-forest-cake.jpg"
      ],
      "tags": [
        "cake",
        "black-forest",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "white-forest-cake",
      "name": "White Forest Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.8,
      "reviews": 92,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Delicate vanilla sponge filled with juicy cherries, white chocolate curls, and light whipped cream. 100% eggless, gluten-free, and zero refined sugar.",
      "long": "Delicate vanilla sponge filled with juicy cherries, white chocolate curls, and light whipped cream. 100% eggless, gluten-free, and zero refined sugar. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, sugar-free white chocolate, sweet cherries, fresh dairy cream, natural stevia blend.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/white-forest-cake.jpg",
      "images": [
        "assets/img/products/white-forest-cake.jpg"
      ],
      "tags": [
        "cake",
        "white-forest",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "plum-cake-non-alcoholic",
      "name": "Plum Cake (Non Alcoholic)",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1250,
      "mrp": 1435,
      "rating": 5,
      "reviews": 135,
      "badges": [
        "SIGNATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "festival",
        "birthday",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Traditional rich festive fruit cake loaded with spiced black currants, raisins, dates, figs, and toasted nuts steeped in spiced citrus reduction. 100% non-alcoholic.",
      "long": "Traditional rich festive fruit cake loaded with spiced black currants, raisins, dates, figs, and toasted nuts steeped in spiced citrus reduction. 100% non-alcoholic, egg-free, and refined sugar-free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, black raisins, dates, figs, candied orange peel, cinnamon, nutmeg, ginger, walnuts, cold-pressed oils.",
      "allergens": [
        "Tree nuts (walnut, almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/plum-cake-non-alcoholic.jpg",
      "images": [
        "assets/img/products/plum-cake-non-alcoholic.jpg"
      ],
      "tags": [
        "cake",
        "plum-cake",
        "festive",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "raspberry-velvet-cake",
      "name": "Raspberry Velvet Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1200,
      "mrp": 1380,
      "rating": 4.9,
      "reviews": 84,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Sumptuous pink velvet sponge layered with tangy wild raspberry coulis and delicate cream frosting. Bright, refreshing, and sugar-free.",
      "long": "Sumptuous pink velvet sponge layered with tangy wild raspberry coulis and delicate cream frosting. Bright, refreshing, and sugar-free. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, fresh raspberry reduction, vanilla cream, natural erythritol blend, cold-pressed oils.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/pistachio-raspberry-cake.jpg",
      "images": [
        "assets/img/products/pistachio-raspberry-cake.jpg"
      ],
      "tags": [
        "cake",
        "raspberry",
        "velvet",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "lavender-berry-cake",
      "name": "Lavender Berry Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1200,
      "mrp": 1380,
      "rating": 5,
      "reviews": 76,
      "badges": [
        "SIGNATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "An ethereal floral and fruit pairing: culinary French lavender-infused sponge layered with mixed berry compote and whipped chantilly frosting.",
      "long": "An ethereal floral and fruit pairing: culinary French lavender-infused sponge layered with mixed berry compote and whipped chantilly frosting. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, organic culinary lavender, blueberries, blackberries, fresh dairy cream, natural plant sweetener.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/berry-chantilly-cake.jpg",
      "images": [
        "assets/img/products/berry-chantilly-cake.jpg"
      ],
      "tags": [
        "cake",
        "lavender",
        "berry",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "pineapple-cake",
      "name": "Pineapple Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 150,
      "badges": [
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Classic tropical celebration cake: tender vanilla sponge soaked in real pineapple nectar, layered with slow-simmered pineapple compote and fresh cream.",
      "long": "Classic tropical celebration cake: tender vanilla sponge soaked in real pineapple nectar, layered with slow-simmered pineapple compote and fresh cream. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, fresh Queen pineapple, dairy cream, Madagascar vanilla, natural erythritol blend.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/pineapple-cream-cake.jpg",
      "images": [
        "assets/img/products/pineapple-cream-cake.jpg"
      ],
      "tags": [
        "cake",
        "pineapple",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "mango-cake",
      "name": "Mango Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 114,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Sun-ripened Alphonso mango pulp layered with light sponge and mango-infused mascarpone cream. Pure tropical delight with zero added sugar.",
      "long": "Sun-ripened Alphonso mango pulp layered with light sponge and mango-infused mascarpone cream. Pure tropical delight with zero added sugar. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, Alphonso mango puree, mascarpone cream, natural stevia sweetener, fresh cream.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/mango-cake.jpg",
      "images": [
        "assets/img/products/mango-cake.jpg"
      ],
      "tags": [
        "cake",
        "mango",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "strawberry-cake",
      "name": "Strawberry Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 128,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Juicy handpicked strawberries cooked into a velvety compote between light sponge layers and whipped vanilla cream.",
      "long": "Juicy handpicked strawberries cooked into a velvety compote between light sponge layers and whipped vanilla cream. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, fresh strawberries, dairy cream, Madagascar vanilla, natural erythritol blend.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/strawberry-cake.jpg",
      "images": [
        "assets/img/products/strawberry-cake.jpg"
      ],
      "tags": [
        "cake",
        "strawberry",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "fresh-fruit-cake",
      "name": "Fruit Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.8,
      "reviews": 102,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "A colourful festival of fresh seasonal exotic fruits over a luscious cream-covered vanilla sponge.",
      "long": "A colourful festival of fresh seasonal exotic fruits (kiwi, pomegranate, orange, berries) over a luscious cream-covered vanilla sponge. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, fresh seasonal fruits, vanilla cream, natural plant sweetener, cold-pressed oils.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/tropical-delight-cake.jpg",
      "images": [
        "assets/img/products/tropical-delight-cake.jpg"
      ],
      "tags": [
        "cake",
        "fruit-cake",
        "fresh-fruit",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "biscoff-cake",
      "name": "Biscoff Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 900,
      "mrp": 1035,
      "rating": 5,
      "reviews": 140,
      "badges": [
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Warmly spiced speculoos cookie butter folded into smooth cream frosting with spiced biscuit crumbs over tender cinnamon-infused sponge.",
      "long": "Warmly spiced speculoos cookie butter folded into smooth cream frosting with spiced biscuit crumbs over tender cinnamon-infused sponge. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, sugar-free spiced speculoos butter, cinnamon, dairy cream, natural erythritol blend.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/biscoff-cake.jpg",
      "images": [
        "assets/img/products/biscoff-cake.jpg"
      ],
      "tags": [
        "cake",
        "biscoff",
        "speculoos",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "bee-cake-honey",
      "name": "Bee Cake Honey",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 89,
      "badges": [
        "SIGNATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Inspired by the classic Medovik: delicate multi-layered honey biscuits caramelized to perfection and filled with tangy sour cream honey frosting.",
      "long": "Inspired by the classic Medovik: delicate multi-layered honey biscuits caramelized to perfection and filled with tangy sour cream honey frosting. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, pure organic raw wild honey, sour cream, grass-fed butter, natural erythritol.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/bee-cake-honey.jpg",
      "images": [
        "assets/img/products/bee-cake-honey.jpg"
      ],
      "tags": [
        "cake",
        "honey-cake",
        "medovik",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "toffee-caramel-cake",
      "name": "Toffee Caramel Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 950,
      "mrp": 1090,
      "rating": 4.9,
      "reviews": 118,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Deep golden English toffee sauce swirled into fluffy sponge with sea-salted caramel buttercream and sugar-free toffee brittle.",
      "long": "Deep golden English toffee sauce swirled into fluffy sponge with sea-salted caramel buttercream and sugar-free toffee brittle. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, browned grass-fed butter, handcrafted sugar-free toffee caramel, Himalayan pink salt, fresh cream.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-caramel-noir-cake.jpg",
      "images": [
        "assets/img/products/chocolate-caramel-noir-cake.jpg"
      ],
      "tags": [
        "cake",
        "toffee",
        "caramel",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "caramel-hazelnut-chocolate-cake",
      "name": "Caramel Hazelnut Chocolate",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1200,
      "mrp": 1380,
      "rating": 5,
      "reviews": 172,
      "badges": [
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "The ultimate trio: rich chocolate sponge, slow-cooked caramel drizzle, and roasted hazelnut praline crunch draped in dark chocolate ganache.",
      "long": "The ultimate trio: rich chocolate sponge, slow-cooked caramel drizzle, and roasted hazelnut praline crunch draped in dark chocolate ganache. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, almond flour, roasted hazelnuts, dark chocolate 70%, sea salt caramel, natural plant sweetener, fresh cream.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (hazelnut, almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/triple-chocolate-crunch-cake-1.jpg",
      "images": [
        "assets/img/products/triple-chocolate-crunch-cake-1.jpg"
      ],
      "tags": [
        "cake",
        "caramel",
        "hazelnut",
        "chocolate",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "nutella-hazelnut-cake",
      "name": "Nutella Hazelnut Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1250,
      "mrp": 1435,
      "rating": 5,
      "reviews": 230,
      "badges": [
        "SIGNATURE",
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Our flagship celebration cake featured on the SAiPH Bakes menu: decadent chocolate hazelnut sponge crowned with hazelnut truffles and chocolate drip.",
      "long": "Our flagship celebration cake featured on the official SAiPH Bakes menu: decadent chocolate hazelnut sponge crowned with hazelnut truffles and signature chocolate drip. Handcrafted with zero maida and zero refined sugar. 100% Eggless and Gluten-Free. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, pure roasted hazelnuts, artisanal sugar-free Nutella, Belgian cacao, dairy cream, stevia.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (hazelnut, almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/nutella-hazelnut-cake.jpg",
      "images": [
        "assets/img/products/nutella-hazelnut-cake.jpg"
      ],
      "tags": [
        "cake",
        "nutella",
        "hazelnut",
        "signature-menu",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "sugar-free-almond-butter",
      "name": "Sugar Free Almond Butter",
      "brand": "khowdy",
      "cats": [
        "healthy-snacks"
      ],
      "price": 750,
      "mrp": 862,
      "rating": 4.9,
      "reviews": 160,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "jar",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Stone-ground slow-roasted California almonds crafted into a creamy, nutrient-rich spread with zero added sugars, oils, or preservatives.",
      "long": "Crafted exclusively from 100% slow-roasted California almonds stone-ground into a silky, golden-brown butter. Naturally rich in vitamin E, plant protein, and healthy monounsaturated fats with zero added sugar, palm oil, or preservatives. Drizzle over warm sourdough toast, swirl into morning oatmeal, or enjoy straight from the spoon.",
      "ingredients": "100% slow-roasted California almonds, touch of Himalayan pink salt.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/sugar-free-almond-butter.jpg",
      "images": [
        "assets/img/products/sugar-free-almond-butter.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "sugar-free-tiramisu-spread",
      "name": "Sugar Free Tiramisu Spread",
      "brand": "khowdy",
      "cats": [
        "healthy-snacks"
      ],
      "price": 550,
      "mrp": 632,
      "rating": 4.9,
      "reviews": 161,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "jar",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Luxurious sugar-free dessert spread blending rich Italian espresso, roasted cashew cream, and single-origin dark cocoa solids.",
      "long": "Inspired by the timeless romance of Venetian tiramisu: slow-simmered roasted cashew butter infused with bold dark-roast espresso and single-origin cocoa. Naturally sweetened with organic stevia and erythritol for a velvety, aromatic spread. Perfect on warm brioche, crepes, or fresh fruit.",
      "ingredients": "Roasted cashews, single-origin cocoa solids, dark espresso beans, natural stevia & erythritol blend, cold-pressed coconut oil.",
      "allergens": [
        "Processed in a facility handling tree nuts and dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/sugar-free-tiramisu-spread.jpg",
      "images": [
        "assets/img/products/sugar-free-tiramisu-spread.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "sugar-free-hazelnut-spread",
      "name": "Sugar Free Hazelnut Spread",
      "brand": "khowdy",
      "cats": [
        "healthy-snacks"
      ],
      "price": 650,
      "mrp": 747,
      "rating": 4.8,
      "reviews": 221,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "jar",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Velvety sugar-free chocolate hazelnut spread crafted with 100% roasted Turkish hazelnuts, dark cocoa, and zero palm oil.",
      "long": "A mindful tribute to classic gianduja: slow-roasted Turkish hazelnuts stone-ground into a rich, velvety butter folded with 70% dark Belgian cocoa. Sweetened gently with stevia and completely free from palm oil, hydrogenated fats, and refined sugar. Decadent, glossy, and deeply satisfying.",
      "ingredients": "Roasted Turkish hazelnuts (65%), single-origin cocoa solids, natural stevia extract, cocoa butter, sunflower lecithin.",
      "allergens": [
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/sugar-free-hazelnut-spread.jpg",
      "images": [
        "assets/img/products/sugar-free-hazelnut-spread.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "assorted-diwali-mithai-barks-hamper",
      "name": "Assorted Diwali Mithai & Barks Hamper",
      "brand": "signature",
      "cats": [
        "hampers",
        "corporate-gifting"
      ],
      "price": 1800,
      "mrp": 2070,
      "rating": 4.9,
      "reviews": 116,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Curated festive gift hamper featuring sugar-free motichoor laddoos, pistachio laddoos, rose kaju katlis, and chocolate barks.",
      "long": "A thoughtfully curated festive assortment celebrating Indian culinary heritage with mindful luxury: features two pieces each of our signature sugar-free Motichoor Laddoos, Pistachio Praline Laddoos, and Rose Kaju Katlis, paired with handcrafted Dark Chocolate Praline Bark. Housed in an embossed royal gold keepsake gift box.",
      "ingredients": "Almond flour, gram flour, cashew nuts, pistachios, dark chocolate 70%, saffron, rose water, ghee, natural plant sweetener.",
      "allergens": [
        "Tree nuts (pistachio)"
      ],
      "customisable": false,
      "image": "assets/img/products/assorted-diwali-mithai-barks-hamper.png",
      "images": [
        "assets/img/products/assorted-diwali-mithai-barks-hamper.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "basque-cheesecake-hamper",
      "name": "Basque Cheesecake Hamper",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "desserts"
      ],
      "price": 1500,
      "mrp": 1724,
      "rating": 4.8,
      "reviews": 270,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free"
      ],
      "desc": "Luxury dessert hamper featuring your choice of Pistachio Basque Cheesecake or Kesar Rabdi Basque Cheesecake.",
      "long": "Celebrate with artisanal European flair: choose between our caramelized Pistachio Basque Cheesecake infused with pure pistachio butter or our regal Kesar Rabdi Basque Cheesecake crowned with saffron rabdi. Housed in a custom ribbon-tied hamper box. 100% Gluten-Free.",
      "ingredients": "Cream cheese, fresh dairy cream, almond flour, pistachios, saffron, full-fat milk reduction, natural sweeteners.",
      "allergens": [
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/basque-cheesecake-hamper.png",
      "images": [
        "assets/img/products/basque-cheesecake-hamper.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "mini-diwali-gift-hamper",
      "name": "Mini Diwali Gift Hamper",
      "brand": "signature",
      "cats": [
        "hampers",
        "corporate-gifting"
      ],
      "price": 3500,
      "mrp": 4024,
      "rating": 4.8,
      "reviews": 58,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free"
      ],
      "desc": "Luxury festive hamper pairing your choice of Basque cheesecake with dark chocolate fudge bites and savoury crackers.",
      "long": "A balanced festive celebration box: includes your choice of our signature Pistachio or Kesar Rabdi Basque Cheesecake, paired with 6 melt-in-mouth dark chocolate fudge bites and crispy paprika garlic crackers. Presented in a luxury ribboned box. 100% Refined sugar-free.",
      "ingredients": "Cream cheese, dark chocolate, almond flour, pistachios, saffron, dairy cream, olive oil, natural sweeteners.",
      "allergens": [
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/mini-diwali-gift-hamper.jpg",
      "images": [
        "assets/img/products/mini-diwali-gift-hamper.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "assorted-mithai-box-of-6",
      "name": "Assorted Mithai Box of 6",
      "brand": "signature",
      "cats": [
        "hampers",
        "corporate-gifting"
      ],
      "price": 800,
      "mrp": 919,
      "rating": 5,
      "reviews": 228,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Handcrafted luxury mithai box featuring 6 artisanal sugar-free sweets: motichoor, pistachio praline, and rose kaju katli.",
      "long": "Six handcrafted festive treasures: includes two each of our signature sugar-free motichoor laddoos, roasted pistachio praline sweets, and organic rose kaju katlis. Made with premium nuts and zero refined sugar. Presented in a luxury gift box. 100% Eggless.",
      "ingredients": "Gram flour, roasted pistachios, cashew nuts, saffron, organic rose petals, ghee, natural stevia & erythritol blend.",
      "allergens": [
        "Tree nuts (pistachio)"
      ],
      "customisable": false,
      "image": "assets/img/products/assorted-mithai-box-of-6.jpg",
      "images": [
        "assets/img/products/assorted-mithai-box-of-6.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "assorted-vegan-mithai-box-of-15",
      "name": "Assorted Vegan Mithai Box of 15",
      "brand": "signature",
      "cats": [
        "hampers",
        "corporate-gifting"
      ],
      "price": 1800,
      "mrp": 2070,
      "rating": 4.9,
      "reviews": 223,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Grand 15-piece festive gift box of pure vegan, sugar-free Indian sweets: motichoor, pistachio praline, and rose kaju katlis.",
      "long": "A majestic 15-piece festive assortment crafted entirely plant-based and refined sugar-free: five each of our signature motichoor laddoos, roasted pistachio praline sweets, and fragrant rose kaju katlis made with virgin coconut oil and premium nuts. 100% Vegan and gluten-free.",
      "ingredients": "Cashew nuts, roasted pistachios, gram flour, cold-pressed coconut oil, saffron, rose water, natural plant sweetener.",
      "allergens": [
        "Tree nuts (pistachio)"
      ],
      "customisable": false,
      "image": "assets/img/products/assorted-vegan-mithai-box-of-15.jpg",
      "images": [
        "assets/img/products/assorted-vegan-mithai-box-of-15.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "assorted-mithai-box-of-15",
      "name": "Assorted Mithai Box of 15",
      "brand": "signature",
      "cats": [
        "hampers",
        "corporate-gifting"
      ],
      "price": 1800,
      "mrp": 2070,
      "rating": 4.9,
      "reviews": 99,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free"
      ],
      "desc": "Grand 15-piece luxury mithai selection: Mysore Pak, pistachio praline, motichoor, rose kaju katli, and malai peda.",
      "long": "An opulent collection of 15 royal Indian sweets made with zero refined sugar: three each of melt-in-mouth Mysore Pak, pistachio praline laddoo, saffron motichoor, rose kaju katli, and dark chocolate malai peda. Housed in a signature keepsake gold box. 100% Eggless.",
      "ingredients": "Gram flour, cashews, pistachios, full-cream milk solids, dark chocolate, saffron, cardamom, ghee, natural plant sweetener.",
      "allergens": [
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/assorted-mithai-box-of-15.jpg",
      "images": [
        "assets/img/products/assorted-mithai-box-of-15.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "paprika-and-garlic-crackers",
      "name": "Paprika and Garlic Crackers",
      "brand": "khowdy",
      "cats": [
        "healthy-snacks"
      ],
      "price": 400,
      "mrp": 459,
      "rating": 4.9,
      "reviews": 157,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "jar",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Crispy golden artisan crackers infused with smoked Spanish paprika, slow-roasted garlic, and cold-pressed olive oil.",
      "long": "Golden-baked artisan crackers rolled thin for a sharp, delicate snap: seasoned with fragrant smoked pimentón paprika, roasted garlic chips, and cold-pressed oils. Wholesome, gluten-free, and vegan. An essential accompaniment for artisanal cheese boards, hummus dips, and evening grazing.",
      "ingredients": "Almond flour, tapioca starch, smoked paprika, roasted garlic, cold-pressed olive oil, flaxseeds, sea salt.",
      "allergens": [
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/paprika-and-garlic-crackers.jpg",
      "images": [
        "assets/img/products/paprika-and-garlic-crackers.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "herb-and-cheese-crackers",
      "name": "Herb and Cheese Crackers",
      "brand": "khowdy",
      "cats": [
        "healthy-snacks"
      ],
      "price": 450,
      "mrp": 517,
      "rating": 5,
      "reviews": 116,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "jar",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Crisp savoury crackers baked with aged white cheddar, fragrant Mediterranean rosemary, oregano, and toasted seeds.",
      "long": "Delicate, golden-baked savoury crackers packed with sharp aged cheddar, crushed dried oregano, wild thyme, and toasted sesame seeds. Delivers a robust savory crunch in every bite with zero refined flour or trans fats. Perfect for dips, wine pairings, and mindful snacking.",
      "ingredients": "Almond flour, aged white cheddar, dried Mediterranean herbs (oregano, rosemary, thyme), olive oil, sea salt.",
      "allergens": [
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/herb-and-cheese-crackers.jpg",
      "images": [
        "assets/img/products/herb-and-cheese-crackers.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "chocolate-kaju-katli-tart",
      "name": "Chocolate Kaju Katli Tart",
      "brand": "doughremi",
      "cats": [
        "desserts",
        "pastries"
      ],
      "price": 600,
      "mrp": 690,
      "rating": 4.9,
      "reviews": 231,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Buttery almond tart shell filled with velvety dark Belgian chocolate ganache and crowned with traditional silver-foiled kaju katli.",
      "long": "An exquisite fusion of French patisserie and royal Indian confection: a crisp almond flour tart shell filled with 70% dark chocolate ganache, crowned with hand-cut cashew marzipan katli and edible silver foil. 100% Eggless, gluten-free, and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, cashew nuts, dark chocolate 70%, dairy cream, natural plant sweeteners, edible silver leaf.",
      "allergens": [
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/chocolate-kaju-katli-tart.jpg",
      "images": [
        "assets/img/products/chocolate-kaju-katli-tart.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "kesar-rabdi-basque-cheesecake",
      "name": "Kesar Rabdi Basque Cheesecake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "desserts"
      ],
      "price": 1100,
      "mrp": 1265,
      "rating": 4.9,
      "reviews": 175,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free"
      ],
      "desc": "Caramelized Basque cheesecake infused with royal Kashmiri saffron, layered with slow-simmered sugar-free rabdi and pistachios.",
      "long": "A regal celebration dessert merging Spanish culinary craft with Awadhi heritage: slow-baked Basque cheesecake infused with fragrant saffron threads, finished with a rich layer of creamy sugar-free rabdi and toasted Iranian pistachios. 100% Gluten-free, eggless, and refined sugar-free.",
      "ingredients": "Cream cheese, fresh dairy cream, almond flour, Kashmiri saffron, full-fat milk reduction (rabdi), erythritol & stevia blend, pistachios.",
      "allergens": [
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/kesar-rabdi-basque-cheesecake.jpg",
      "images": [
        "assets/img/products/kesar-rabdi-basque-cheesecake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "pistachio-basque-cheesecake",
      "name": "Pistachio Basque Cheesecake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "desserts"
      ],
      "price": 1300,
      "mrp": 1494,
      "rating": 4.8,
      "reviews": 229,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free"
      ],
      "desc": "Velvety Spanish Basque cheesecake infused with pure Sicilian pistachio paste, finished with a caramelized burnt top.",
      "long": "Slow-baked at high temperature to achieve the iconic caramelized Basque exterior while keeping the center silken and molten. Infused throughout with 100% pure pistachio butter, whipped cream cheese, and natural sweeteners. 100% Eggless, gluten-free, and refined sugar-free.",
      "ingredients": "Cream cheese, dairy cream, pure roasted pistachio butter, almond flour, natural erythritol blend, crushed pistachios.",
      "allergens": [
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/pistachio-basque-cheesecake.jpg",
      "images": [
        "assets/img/products/pistachio-basque-cheesecake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "pistachio-chocolate-fudge-bites",
      "name": "Pistachio Chocolate Fudge Bites",
      "brand": "doughremi",
      "cats": [
        "chocolates",
        "desserts"
      ],
      "price": 1100,
      "mrp": 1265,
      "rating": 4.8,
      "reviews": 116,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Twelve melt-in-mouth dark chocolate fudge squares topped with roasted pistachio praline and crisp cocoa feuilletine.",
      "long": "Intensely rich bite-sized squares of 70% dark Belgian chocolate fudge, blended with roasted pistachio butter and finished with a crunchy pistachio praline crown. Box of 12 pieces. 100% Eggless, gluten-free, and refined sugar-free.",
      "ingredients": "Dark chocolate 70%, roasted pistachio butter, dairy cream, coconut oil, natural erythritol, roasted pistachios.",
      "allergens": [
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/pistachio-chocolate-fudge-bites.jpg",
      "images": [
        "assets/img/products/pistachio-chocolate-fudge-bites.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "rasmalai-fudge-bites",
      "name": "Rasmalai Fudge Bites",
      "brand": "doughremi",
      "cats": [
        "chocolates",
        "desserts"
      ],
      "price": 1000,
      "mrp": 1150,
      "rating": 5,
      "reviews": 216,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Delicate white chocolate fudge squares infused with saffron milk, green cardamom, and toasted almond slivers.",
      "long": "A contemporary tribute to royal rasmalai: velvety white cocoa butter fudge infused with saffron threads, crushed cardamom, and rose water, studded with toasted almond flakes. 100% Eggless, gluten-free, and sweetened without refined sugar.",
      "ingredients": "Cocoa butter, dairy milk solids, Kashmiri saffron, green cardamom, roasted almonds, erythritol blend.",
      "allergens": [
        "Processed in a facility handling tree nuts and dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/rasmalai-fudge-bites.jpg",
      "images": [
        "assets/img/products/rasmalai-fudge-bites.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-praline-barks",
      "name": "Chocolate Praline Barks",
      "brand": "doughremi",
      "cats": [
        "healthy-snacks",
        "desserts"
      ],
      "price": 550,
      "mrp": 632,
      "rating": 5,
      "reviews": 98,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Crisp shards of dark chocolate bark layered with caramelized hazelnut praline and sprinkled with Maldon sea salt.",
      "long": "Hand-poured artisan dark chocolate slabs generously studded with crunchy roasted hazelnut praline, almond crisps, and flaky sea salt. Broken into rustic shards for a sublime texture contrast. Sweetened with stevia. 100% Gluten-Free and vegan.",
      "ingredients": "Dark chocolate 70%, roasted hazelnuts, almond flour, coconut oil, natural plant sweetener, sea salt.",
      "allergens": [
        "Processed in a facility handling tree nuts and dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/chocolate-praline-barks.jpg",
      "images": [
        "assets/img/products/chocolate-praline-barks.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "motichoor-barks",
      "name": "Motichoor Barks",
      "brand": "doughremi",
      "cats": [
        "healthy-snacks",
        "desserts"
      ],
      "price": 500,
      "mrp": 575,
      "rating": 4.8,
      "reviews": 212,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Festive dark chocolate bark embedded with golden sugar-free motichoor pearls and toasted pistachio crisps.",
      "long": "A showstopping festive delicacy: glossy dark chocolate slabs embedded with delicate pearls of sugar-free saffron motichoor and crushed green pistachios. Offers an irresistible contrast of creamy chocolate and spiced besan pearls. 100% Gluten-Free.",
      "ingredients": "Dark chocolate 70%, gram flour (besan), ghee, saffron, natural erythritol sweetener, roasted pistachios.",
      "allergens": [
        "Processed in a facility handling tree nuts and dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/motichoor-barks.jpg",
      "images": [
        "assets/img/products/motichoor-barks.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "hazelnut-mocha-opera-pastry",
      "name": "Hazelnut Mocha Opera Pastry",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 540,
      "mrp": 621,
      "rating": 4.7,
      "reviews": 248,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Refined French opera slice featuring almond sponge soaked in espresso, hazelnut buttercream, and dark chocolate ganache.",
      "long": "Classic French pâtisserie artistry: thin layers of almond joconde sponge soaked in dark roast espresso syrup, layered with smooth hazelnut praline buttercream and dark chocolate ganache. Baked with French T45 flour and zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, roasted hazelnuts, espresso reduction, dark chocolate 70%, dairy cream, erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/hazelnut-mocha-opera-pastry.jpg",
      "images": [
        "assets/img/products/hazelnut-mocha-opera-pastry.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "mocha-caramel-crunch-mini-cake",
      "name": "Mocha Caramel Crunch Mini Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 690,
      "mrp": 793,
      "rating": 4.8,
      "reviews": 83,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Petite celebration cake with mocha-infused sponge, slow-cooked caramel buttercream, and crunchy cashew brittle.",
      "long": "A rich dessert centerpiece: moist cocoa-espresso sponge layered with whipped mocha cream, slow-simmered sugar-free salted caramel, and roasted cashew brittle. Baked with French T45 flour with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin cacao, dark espresso, house-made salted caramel, dairy cream, cashews.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/mocha-caramel-crunch-mini-cake.jpg",
      "images": [
        "assets/img/products/mocha-caramel-crunch-mini-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "vanilla-basque-cheesecake",
      "name": "Vanilla Basque Cheesecake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "desserts"
      ],
      "price": 1700,
      "mrp": 1954,
      "rating": 5,
      "reviews": 66,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Classic burnt Basque cheesecake made with pure Madagascar Bourbon vanilla beans and rich whipped cream cheese.",
      "long": "The purest expression of the Basque tradition: velvety cream cheese infused with aromatic Madagascar vanilla beans, baked to deep golden caramelized perfection. Intensely creamy at the center with gentle caramelized notes on the crust. 100% Gluten-Free and refined sugar-free.",
      "ingredients": "Cream cheese, fresh dairy cream, almond flour, Madagascar Bourbon vanilla bean, natural stevia & erythritol blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/vanilla-basque-cheesecake.jpg",
      "images": [
        "assets/img/products/vanilla-basque-cheesecake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "chocolate-basque-cheesecake",
      "name": "Chocolate Basque Cheesecake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "desserts"
      ],
      "price": 1600,
      "mrp": 1839,
      "rating": 4.9,
      "reviews": 52,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Decadent dark chocolate Basque cheesecake featuring a crackled caramelized crust and molten 70% cocoa core.",
      "long": "Rich 70% Belgian dark chocolate folded into creamy cream cheese and baked until deeply caramelized on top while retaining a soft, fudge-like interior. Crafted without maida or refined sugars. 100% Eggless and gluten-free.",
      "ingredients": "Cream cheese, dark Belgian chocolate 70%, fresh cream, almond flour, single-origin cacao, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-basque-cheesecake.jpg",
      "images": [
        "assets/img/products/chocolate-basque-cheesecake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "multi-grain-loaf",
      "name": "Multi Grain Loaf",
      "brand": "khowdy",
      "cats": [
        "breads"
      ],
      "price": 315,
      "mrp": 362,
      "rating": 5,
      "reviews": 177,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Nutrient-packed artisan sandwich loaf baked with whole wheat, oats, barley, millet, and roasted seeds.",
      "long": "An everyday staple elevated to artisan standards: slow-fermented five-grain loaf packed with whole wheat, rolled oats, pearl barley, finger millet, and toasted seeds. Yields a tender, fragrant crumb with zero refined sugar. 100% Vegan.",
      "ingredients": "Whole wheat flour, rolled oats, pearl barley, ragi, flaxseeds, sunflower seeds, olive oil, yeast, sea salt.",
      "allergens": [
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/multi-grain-loaf.png",
      "images": [
        "assets/img/products/multi-grain-loaf.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "triple-chocolate-crunch-mini-cake",
      "name": "Triple Chocolate Crunch Mini Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 765,
      "mrp": 879,
      "rating": 4.9,
      "reviews": 237,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Three layers of dark, milk, and white chocolate mousse over cocoa sponge with a crisp praline crunch base.",
      "long": "An architectural chocolate triumph: layers of airy dark, milk, and white chocolate cream resting upon a moist cocoa sponge and a feuilletine praline crunch base. Crafted with zero maida and zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark chocolate 70%, milk chocolate, white chocolate, fresh cream, hazelnut praline.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/triple-chocolate-crunch-mini-cake.jpg",
      "images": [
        "assets/img/products/triple-chocolate-crunch-mini-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "blueberry-cream-mini-cake",
      "name": "Blueberry Cream Mini Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 650,
      "mrp": 747,
      "rating": 4.8,
      "reviews": 129,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Fluffy vanilla sponge layered with wild blueberry compote and light whipped chantilly cream.",
      "long": "Delicate, golden vanilla sponge crafted with French T45 flour, layered with slow-simmered wild blueberry compote and clouds of whipped chantilly cream. Bright, fruity, and naturally sweetened with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, wild blueberries, dairy cream, Madagascar vanilla bean, natural stevia & erythritol blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/blueberry-cream-mini-cake.jpg",
      "images": [
        "assets/img/products/blueberry-cream-mini-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-blueberry-mini-cake",
      "name": "Chocolate Blueberry Mini Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 765,
      "mrp": 879,
      "rating": 4.8,
      "reviews": 276,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Dark Belgian chocolate sponge layered with tart blueberry compote and rich 70% cocoa ganache.",
      "long": "The harmonious balance of deep dark chocolate and tangy wild berries: moist cocoa sponge made with French T45 flour, enveloped in 70% dark Belgian chocolate ganache and tart blueberry reduction. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, dark chocolate 70%, blueberries, fresh cream, single-origin cocoa, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-blueberry-mini-cake.jpg",
      "images": [
        "assets/img/products/chocolate-blueberry-mini-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "mix-fruit-mini-cake",
      "name": "Mix Fruit Mini Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 765,
      "mrp": 879,
      "rating": 4.8,
      "reviews": 170,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Delicate vanilla sponge layered with whipped mascarpone cream and an abundance of fresh seasonal fruits.",
      "long": "A vibrant celebration cake: tender vanilla sponge layered with light dairy cream and crowned with freshly sliced strawberries, kiwi, pomegranate, and seasonal fruit. Light, refreshing, and free from refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, fresh seasonal fruits, dairy cream, Madagascar vanilla, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/mix-fruit-mini-cake.jpg",
      "images": [
        "assets/img/products/mix-fruit-mini-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "hazelnut-crunch-mini-cake",
      "name": "Hazelnut Crunch Mini Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 670,
      "mrp": 770,
      "rating": 5,
      "reviews": 69,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Moist cocoa sponge layered with stone-ground roasted hazelnut praline butter and silky dark chocolate ganache.",
      "long": "Layers of tender chocolate sponge filled with stone-ground sugar-free hazelnut butter, dark chocolate ganache, and caramelized hazelnut crunch. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, Turkish hazelnuts, dark chocolate 70%, dairy cream, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/hazelnut-crunch-mini-cake.jpg",
      "images": [
        "assets/img/products/hazelnut-crunch-mini-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "pineapple-cream-mini-cake",
      "name": "Pineapple Cream Mini Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 530,
      "mrp": 609,
      "rating": 4.7,
      "reviews": 52,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Tender sponge soaked in real pineapple nectar, layered with slow-simmered pineapple compote and fresh cream.",
      "long": "A nostalgic tropical favourite: light sponge crafted with French T45 flour, layered with juicy pineapple compote and velvety whipped dairy cream, topped with dehydrated pineapple blossoms. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, fresh pineapple compote, dairy cream, Madagascar vanilla, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/pineapple-cream-mini-cake.jpg",
      "images": [
        "assets/img/products/pineapple-cream-mini-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "belgian-chocolate-mini-cake",
      "name": "Belgian Chocolate Mini Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 620,
      "mrp": 713,
      "rating": 4.8,
      "reviews": 244,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Intensely rich chocolate cake layered with 70% Callebaut dark chocolate mousse and mirror glaze.",
      "long": "Pure unadulterated Belgian chocolate luxury: moist cocoa sponge made with French T45 flour, layered with airy dark chocolate mousse and draped in a glossy dark glaze. Decadent, silky, and free from refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, Callebaut 70% dark chocolate, single-origin cacao, fresh cream, erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/belgian-chocolate-mini-cake.jpg",
      "images": [
        "assets/img/products/belgian-chocolate-mini-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "tiramisu-brownies",
      "name": "Tiramisu Brownies",
      "brand": "doughremi",
      "cats": [
        "brownies",
        "pastries"
      ],
      "price": 1530,
      "mrp": 1759,
      "rating": 4.8,
      "reviews": 66,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "8 pcs of fudgy almond flour brownies loaded with dark chocolate and layered with delicate tiramisu biscuits, bold espres.",
      "long": "8 pcs of fudgy almond flour brownies loaded with dark chocolate and layered with delicate tiramisu biscuits, bold espresso and sugar free tiramisu cream. Rich, gooey and irresistibly indulgent.",
      "ingredients": "Almond flour, vegan butter, dark chocolate, cookie dough, chocolate chips, sweetened with stevia.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/tiramisu-brownies.jpg",
      "images": [
        "assets/img/products/tiramisu-brownies.jpg",
        "assets/img/products/tiramisu-brownies-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "triple-chocolate-crunch-cake-1",
      "name": "Triple Chocolate Crunch Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1710,
      "mrp": 1966,
      "rating": 4.8,
      "reviews": 231,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Decadent celebration cake featuring dark, milk, and white chocolate mousse layers over a crisp praline base.",
      "long": "A breathtaking tiered chocolate masterpiece: layered with dark, milk, and white chocolate cream, cocoa sponge, and crunchy hazelnut praline. Baked fresh with French T45 flour with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark chocolate, milk chocolate, white chocolate, hazelnut praline, dairy cream.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/triple-chocolate-crunch-cake-1.jpg",
      "images": [
        "assets/img/products/triple-chocolate-crunch-cake-1.jpg",
        "assets/img/products/triple-chocolate-crunch-cake-1-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-caramel-noir-mini-cake",
      "name": "Chocolate Caramel Noir Mini Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1200,
      "mrp": 1380,
      "rating": 4.9,
      "reviews": 90,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Dark chocolate sponge layered with sea-salted caramel cream, dark ganache, and caramelized crunch.",
      "long": "Deep cocoa sponge layered with rich dark chocolate ganache, house-made sea-salted caramel, and caramelized popcorn crisps. Sophisticated, bittersweet, and completely refined sugar-free. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark chocolate 70%, sea-salted caramel, dairy cream, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-caramel-noir-mini-cake.jpg",
      "images": [
        "assets/img/products/chocolate-caramel-noir-mini-cake.jpg",
        "assets/img/products/chocolate-caramel-noir-mini-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "berry-chantilly-mini-cake",
      "name": "Berry Chantilly Mini Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1500,
      "mrp": 1724,
      "rating": 4.9,
      "reviews": 274,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Featherlight vanilla sponge layered with mixed forest berry compote and delicate French chantilly cream.",
      "long": "Light vanilla bean sponge crafted with French T45 flour, layered with a ruby compote of raspberries, blackberries, and strawberries, finished with clouds of chantilly frosting. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, raspberries, blackberries, strawberries, dairy cream, Madagascar vanilla.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/berry-chantilly-mini-cake.jpg",
      "images": [
        "assets/img/products/berry-chantilly-mini-cake.jpg",
        "assets/img/products/berry-chantilly-mini-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "marble-opulence-mini-cake",
      "name": "Marble Opulence Mini Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1350,
      "mrp": 1552,
      "rating": 4.7,
      "reviews": 155,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Swirled dark chocolate and vanilla sponge layered with baked cheesecake cream and marbled chocolate curls.",
      "long": "An artistic fusion of two classics: tender swirls of dark cocoa and Bourbon vanilla sponge, filled with smooth baked cheesecake cream and draped in marbled chocolate ganache. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, cream cheese, dark chocolate, dairy cream, Madagascar vanilla, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/marble-opulence-mini-cake.jpg",
      "images": [
        "assets/img/products/marble-opulence-mini-cake.jpg",
        "assets/img/products/marble-opulence-mini-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "chocolate-caramel-noir-cake",
      "name": "Chocolate Caramel Noir Cake",
      "brand": "signature",
      "cats": [
        "muffins"
      ],
      "price": 4000,
      "mrp": 4600,
      "rating": 4.7,
      "reviews": 168,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Grand celebration cake layered with single-origin dark chocolate, sea-salted caramel, and caramelized praline.",
      "long": "An opulent dark chocolate showstopper: moist cocoa sponge crafted with French T45 flour, filled with dark ganache, slow-simmered sea-salted caramel, and crunchy hazelnut praline. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin cocoa, dark chocolate 70%, salted caramel, dairy cream, hazelnuts.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-caramel-noir-cake.jpg",
      "images": [
        "assets/img/products/chocolate-caramel-noir-cake.jpg",
        "assets/img/products/chocolate-caramel-noir-cake-2.jpg",
        "assets/img/products/chocolate-caramel-noir-cake-3.jpg",
        "assets/img/products/chocolate-caramel-noir-cake-4.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "berry-chantilly-cake",
      "name": "Berry Chantilly Cake",
      "brand": "signature",
      "cats": [
        "muffins"
      ],
      "price": 5000,
      "mrp": 5750,
      "rating": 4.7,
      "reviews": 192,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Grand celebration cake layered with wild berry compote, whipped chantilly cream, and fresh forest berries.",
      "long": "Elegant, refreshing, and celebration-ready: tender vanilla sponge layered with ruby forest berry reduction and clouds of French chantilly cream, crowned with fresh berries. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, forest berries, dairy cream, Madagascar vanilla bean, natural stevia & erythritol blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/berry-chantilly-cake.jpg",
      "images": [
        "assets/img/products/berry-chantilly-cake.jpg",
        "assets/img/products/berry-chantilly-cake-2.jpg",
        "assets/img/products/berry-chantilly-cake-3.jpg",
        "assets/img/products/berry-chantilly-cake-4.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "marble-opulence-cake",
      "name": "Marble Opulence Cake",
      "brand": "signature",
      "cats": [
        "muffins"
      ],
      "price": 4500,
      "mrp": 5175,
      "rating": 5,
      "reviews": 226,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Artisan celebration cake featuring intricate swirls of Belgian cocoa and vanilla sponge with chocolate cheesecake frosting.",
      "long": "A majestic cake combining rich Belgian chocolate and fragrant vanilla bean sponge, filled with velvety cheesecake mousse and glossy marbled ganache. Zero refined sugar, zero maida, 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, cream cheese, Belgian dark chocolate, dairy cream, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/marble-opulence-cake.jpg",
      "images": [
        "assets/img/products/marble-opulence-cake.jpg",
        "assets/img/products/marble-opulence-cake-2.jpg",
        "assets/img/products/marble-opulence-cake-3.jpg",
        "assets/img/products/marble-opulence-cake-4.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "brown-butter-cookie-box",
      "name": "Brown Butter Cookie Box",
      "brand": "khowdy",
      "cats": [
        "cookies"
      ],
      "price": 765,
      "mrp": 879,
      "rating": 4.9,
      "reviews": 89,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Melt-in-mouth French shortbread cookies baked with nut-brown butter, almond flour, and a pinch of fleur de sel.",
      "long": "Slowly browned grass-fed butter gives these delicate shortbread biscuits their intoxicating hazelnut aroma and rich golden crumb. Baked with almond flour and natural sweetness. Box of 8 artisan cookies. 100% Eggless and gluten-free.",
      "ingredients": "Almond flour, grass-fed brown butter, natural erythritol blend, vanilla bean, sea salt.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/brown-butter-cookie-box.jpg",
      "images": [
        "assets/img/products/brown-butter-cookie-box.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "gooey-chocolate-muffins",
      "name": "Gooey Chocolate Muffins",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1260,
      "mrp": 1449,
      "rating": 4.7,
      "reviews": 64,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Rich dark chocolate almond muffins with a molten chocolate fudge center and crisp chocolate chip crown.",
      "long": "Baked with single-origin cocoa and stone-ground almond flour, these decadent muffins feature a rich, fudgy center that turns molten when warmed. Naturally sweetened with zero refined sugar. Box of 4 muffins. 100% Eggless.",
      "ingredients": "Almond flour, dark chocolate 70%, single-origin cocoa, dairy butter, natural plant sweetener, cold-pressed oils.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/gooey-chocolate-muffins.jpg",
      "images": [
        "assets/img/products/gooey-chocolate-muffins.jpg",
        "assets/img/products/gooey-chocolate-muffins-2.jpg",
        "assets/img/products/gooey-chocolate-muffins-3.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "classic-cinnamon-roll",
      "name": "Classic Cinnamon Roll",
      "brand": "doughremi",
      "cats": [
        "healthy-snacks",
        "desserts"
      ],
      "price": 270,
      "mrp": 310,
      "rating": 4.9,
      "reviews": 62,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Warm, pillowy brioche roll swirled with fragrant Ceylon cinnamon and topped with silky cream cheese glaze.",
      "long": "Soft, slow-fermented enriched dough rolled with brown butter and Ceylon cinnamon, baked golden and drizzled with a decadent sugar-free vanilla cream cheese glaze. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butter, Ceylon cinnamon, cream cheese, natural erythritol blend, milk.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/classic-cinnamon-roll.jpg",
      "images": [
        "assets/img/products/classic-cinnamon-roll.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "hazelnut-cinnamon-roll",
      "name": "Hazelnut Cinnamon Roll",
      "brand": "doughremi",
      "cats": [
        "healthy-snacks",
        "desserts"
      ],
      "price": 315,
      "mrp": 362,
      "rating": 4.9,
      "reviews": 243,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Soft bakery cinnamon roll swirled with roasted Turkish hazelnut butter and dark chocolate drizzle.",
      "long": "Pillowy brioche dough swirled with aromatic cinnamon and stone-ground hazelnut butter, finished with crushed roasted hazelnuts and dark chocolate glaze. Zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butter, Ceylon cinnamon, roasted hazelnuts, dark chocolate, cream cheese, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/hazelnut-cinnamon-roll.jpg",
      "images": [
        "assets/img/products/hazelnut-cinnamon-roll.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "tiramisu-cinnamon-roll",
      "name": "Tiramisu Cinnamon Roll",
      "brand": "doughremi",
      "cats": [
        "healthy-snacks",
        "desserts"
      ],
      "price": 360,
      "mrp": 413,
      "rating": 4.8,
      "reviews": 200,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Decadent bakery roll infused with dark roast espresso, cinnamon butter, and whipped mascarpone frosting.",
      "long": "A brilliant coffeehouse marriage: cinnamon brioche dough soaked with dark espresso syrup, layered with sweet mascarpone frosting and dusted with dark cocoa. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butter, espresso reduction, Ceylon cinnamon, mascarpone cream, dark cocoa, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/tiramisu-cinnamon-roll.jpg",
      "images": [
        "assets/img/products/tiramisu-cinnamon-roll.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "pistachio-cinnamon-roll",
      "name": "Pistachio Cinnamon Roll",
      "brand": "doughremi",
      "cats": [
        "healthy-snacks",
        "desserts"
      ],
      "price": 360,
      "mrp": 413,
      "rating": 4.8,
      "reviews": 139,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Artisan cinnamon swirl roll filled with pure pistachio cream and topped with crushed Iranian pistachios.",
      "long": "Slow-fermented brioche dough rolled with fragrant cinnamon butter and luscious pure pistachio paste, finished with a smooth cream glaze and chopped green pistachios. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, butter, pure pistachio paste, Ceylon cinnamon, cream cheese, pistachios, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/pistachio-cinnamon-roll.jpg",
      "images": [
        "assets/img/products/pistachio-cinnamon-roll.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "brookie-box",
      "name": "Brookie Box",
      "brand": "doughremi",
      "cats": [
        "brownies",
        "pastries"
      ],
      "price": 1350,
      "mrp": 1552,
      "rating": 4.8,
      "reviews": 104,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "The ultimate hybrid treat: chewy chocolate chip cookie dough baked together with fudgy dark chocolate brownie.",
      "long": "Why choose between a cookie and a brownie? Enjoy the best of both worlds with our signature brookies: a golden chewy chocolate chip cookie crust fused with a dense, melt-in-the-mouth dark chocolate brownie core. Box of 8 pieces. 100% Gluten-Free.",
      "ingredients": "Almond flour, dark chocolate 70%, vegan butter, chocolate chips, natural stevia & erythritol blend, flaxseeds.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/brookie-box.png",
      "images": [
        "assets/img/products/brookie-box.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "hazelnut-melt-cookie-box",
      "name": "Hazelnut Melt Cookie Box",
      "brand": "doughremi",
      "cats": [
        "cookies"
      ],
      "price": 855,
      "mrp": 983,
      "rating": 5,
      "reviews": 246,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Decadent chocolate cookies filled with a molten sugar-free hazelnut center and studded with roasted hazelnuts.",
      "long": "Thick, bakery-style dark chocolate cookies with a crisp exterior and a warm molten hazelnut core. Baked with almond flour, pure cocoa, and roasted Turkish hazelnuts with zero refined sugar. Box of 6 cookies. 100% Eggless.",
      "ingredients": "Almond flour, roasted hazelnuts, dark chocolate, coconut oil, natural erythritol, sea salt.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/hazelnut-melt-cookie-box.png",
      "images": [
        "assets/img/products/hazelnut-melt-cookie-box.png",
        "assets/img/products/hazelnut-melt-cookie-box-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "pistachio-chocolate-cookie-box",
      "name": "Pistachio Chocolate Cookie Box",
      "brand": "doughremi",
      "cats": [
        "cookies"
      ],
      "price": 810,
      "mrp": 931,
      "rating": 4.9,
      "reviews": 250,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Chunky artisan cookies loaded with roasted pistachios, dark chocolate chunks, and stone-ground almond flour.",
      "long": "Generously packed with roasted green pistachios and 70% dark chocolate chunks: a buttery, golden-baked cookie with a rich nutty aroma and tender center. 100% Eggless, gluten-free, and refined sugar-free. Box of 6 cookies.",
      "ingredients": "Almond flour, roasted pistachios, dark chocolate 70%, butter, natural plant sweetener, sea salt.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/pistachio-chocolate-cookie-box.jpg",
      "images": [
        "assets/img/products/pistachio-chocolate-cookie-box.jpg",
        "assets/img/products/pistachio-chocolate-cookie-box-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "double-chocolate-cookie-box",
      "name": "Double Chocolate Cookie Box",
      "brand": "doughremi",
      "cats": [
        "cookies"
      ],
      "price": 765,
      "mrp": 879,
      "rating": 5,
      "reviews": 185,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Deeply fudgy dark cocoa cookies loaded with molten dark chocolate chips and a sprinkle of sea salt.",
      "long": "Double the chocolate, double the indulgence: rich cocoa dough baked to a chewy, fudge-like center and studded with dark chocolate chunks and sea salt flakes. Box of 6 cookies. 100% Eggless and gluten-free.",
      "ingredients": "Almond flour, dark chocolate chips, single-origin cacao, grass-fed butter, natural erythritol blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/double-chocolate-cookie-box.jpg",
      "images": [
        "assets/img/products/double-chocolate-cookie-box.jpg",
        "assets/img/products/double-chocolate-cookie-box-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "cacao-butter-cake",
      "name": "Cacao Butter Cake",
      "brand": "khowdy",
      "cats": [
        "muffins"
      ],
      "price": 1395,
      "mrp": 1604,
      "rating": 4.9,
      "reviews": 278,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Rich, tender tea loaf baked with pure cocoa butter, dark chocolate chips, and aromatic vanilla bean.",
      "long": "An exceptionally moist morning teacake: baked with pure cocoa butter, stone-ground almond flour, and dark chocolate chips. Delivers a deep chocolate aroma and velvety crumb. Perfect with afternoon tea. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, cocoa butter, dark chocolate chips, dairy milk, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/cacao-butter-cake.jpg",
      "images": [
        "assets/img/products/cacao-butter-cake.jpg",
        "assets/img/products/cacao-butter-cake-2.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "filter-coffee-fudge-bites",
      "name": "Filter Coffee Fudge Bites",
      "brand": "khowdy",
      "cats": [
        "chocolates",
        "desserts"
      ],
      "price": 900,
      "mrp": 1035,
      "rating": 5,
      "reviews": 149,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Bite-sized squares of dark chocolate fudge infused with South Indian chicory-rich filter coffee.",
      "long": "A celebration of South Indian coffee culture: rich dark chocolate fudge steeped with intensely aromatic filter coffee decoction. Smooth, bittersweet, and decadent. Box of 12 pieces. 100% Eggless and refined sugar-free.",
      "ingredients": "Dark chocolate 70%, filter coffee decoction, dairy cream, coconut oil, natural erythritol, cocoa butter.",
      "allergens": [
        "Processed in a facility handling tree nuts and dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/filter-coffee-fudge-bites.jpg",
      "images": [
        "assets/img/products/filter-coffee-fudge-bites.jpg",
        "assets/img/products/filter-coffee-fudge-bites-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "dark-chocolate-praline-fudge-bites",
      "name": "Dark Chocolate Praline Fudge Bites",
      "brand": "khowdy",
      "cats": [
        "chocolates",
        "desserts"
      ],
      "price": 1000,
      "mrp": 1150,
      "rating": 4.8,
      "reviews": 187,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Velvety dark chocolate fudge squares studded with caramelized almond and cashew praline.",
      "long": "Rich 70% Belgian chocolate fudge blended with golden caramelized nut praline for an exquisite contrast of silky fudge and crunchy nut crisps. Box of 12 pieces. 100% Eggless, gluten-free, and sugar-free.",
      "ingredients": "Dark chocolate 70%, roasted almonds, cashews, dairy cream, cocoa butter, natural stevia & erythritol blend.",
      "allergens": [
        "Processed in a facility handling tree nuts and dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/dark-chocolate-praline-fudge-bites.jpg",
      "images": [
        "assets/img/products/dark-chocolate-praline-fudge-bites.jpg",
        "assets/img/products/dark-chocolate-praline-fudge-bites-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "dark-chocolate-babka",
      "name": "Dark Chocolate Babka",
      "brand": "khowdy",
      "cats": [
        "breads"
      ],
      "price": 1400,
      "mrp": 1609,
      "rating": 4.8,
      "reviews": 164,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Artisan brioche babka loaf twisted with endless ribbons of 70% dark Belgian chocolate and roasted almonds.",
      "long": "A traditional Jewish bakery masterpiece: slow-fermented enriched dough ribboned with dark chocolate ganache, rolled and twisted by hand before baking to a golden, glossy finish. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butter, dark chocolate 70%, almond slivers, milk, natural plant sweetener, yeast.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/dark-chocolate-babka.png",
      "images": [
        "assets/img/products/dark-chocolate-babka.png",
        "assets/img/products/dark-chocolate-babka-2.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "pistachio-babka",
      "name": "Pistachio Babka",
      "brand": "khowdy",
      "cats": [
        "breads"
      ],
      "price": 1600,
      "mrp": 1839,
      "rating": 5,
      "reviews": 264,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Golden twisted artisan babka loaf filled with house-made sugar-free pistachio butter and toasted pistachios.",
      "long": "Slow-fermented bakery dough layered with creamy green pistachio butter and toasted pistachio slivers, braided into a stunning marbled loaf. Aromatic, buttery, and baked fresh with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butter, pure pistachio butter, roasted pistachios, milk, natural sweetener, yeast.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/pistachio-babka.png",
      "images": [
        "assets/img/products/pistachio-babka.png",
        "assets/img/products/pistachio-babka-2.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "ragi-loaf",
      "name": "Ragi Loaf",
      "brand": "khowdy",
      "cats": [
        "breads"
      ],
      "price": 350,
      "mrp": 402,
      "rating": 4.8,
      "reviews": 208,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Hearty, nutrient-dense daily loaf crafted with sprouted finger millet (ragi), whole grains, and flaxseeds.",
      "long": "Packed with calcium, dietary fiber, and ancient grain goodness: slow-fermented sprouted ragi loaf with a tender, moist crumb and earthy nutty flavor. Ideal for wholesome morning toast and savoury sandwiches. Zero maida, zero sugar.",
      "ingredients": "Sprouted ragi (finger millet) flour, whole wheat flour, golden flaxseed, olive oil, yeast, sea salt, water.",
      "allergens": [
        "Processed in a facility handling tree nuts and dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/ragi-loaf.png",
      "images": [
        "assets/img/products/ragi-loaf.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "mixed-seed-loaf",
      "name": "Mixed Seed Loaf",
      "brand": "khowdy",
      "cats": [
        "breads"
      ],
      "price": 500,
      "mrp": 575,
      "rating": 5,
      "reviews": 98,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Crusty artisan loaf packed with roasted pumpkin, sunflower, sesame, and golden flaxseeds.",
      "long": "A nutrient-rich everyday sandwich bread: studded inside and crust-coated with a roasted quartet of pumpkin, sunflower, flax, and sesame seeds. Baked with zero maida and no chemical dough conditioners. 100% Vegan.",
      "ingredients": "Whole wheat flour, oat flour, roasted pumpkin seeds, sunflower seeds, flaxseeds, sesame seeds, olive oil, sea salt, yeast.",
      "allergens": [
        "Processed in a facility handling tree nuts and dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/mixed-seed-loaf.png",
      "images": [
        "assets/img/products/mixed-seed-loaf.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "almond-loaf",
      "name": "Almond Loaf",
      "brand": "khowdy",
      "cats": [
        "breads"
      ],
      "price": 800,
      "mrp": 919,
      "rating": 4.8,
      "reviews": 263,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Wholesome, tender daily sandwich loaf crafted from 100% pure stone-ground almond flour and golden flaxseed.",
      "long": "Our signature grain-free daily loaf: baked exclusively with premium blanched almond flour, cold-pressed oils, and golden flaxseeds. Naturally low in carbs, high in clean protein, and completely free from gluten, maida, and refined sugars. Ideal for toast and sandwiches.",
      "ingredients": "100% blanched almond flour, cold-pressed oils, golden flaxseed, psyllium husk, baking powder, sea salt, water.",
      "allergens": [
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/almond-loaf.png",
      "images": [
        "assets/img/products/almond-loaf.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "brown-butter-cake",
      "name": "Brown Butter Cake",
      "brand": "khowdy",
      "cats": [
        "muffins"
      ],
      "price": 1395,
      "mrp": 1604,
      "rating": 4.7,
      "reviews": 179,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Moist, fragrant afternoon tea loaf baked with slow-caramelized grass-fed brown butter and pure vanilla.",
      "long": "The deep, nutty aroma of browned grass-fed butter infuses every crumb of this delicate loaf teacake. Baked with French T45 flour and almond flour with natural plant sweetness. Perfect with morning coffee or tea. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, grass-fed brown butter, dairy milk, Madagascar vanilla, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/brown-butter-cake.png",
      "images": [
        "assets/img/products/brown-butter-cake.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "triple-chocolate-cheesecake-brownie",
      "name": "Triple Chocolate Cheesecake Brownie",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "desserts"
      ],
      "price": 1600,
      "mrp": 1839,
      "rating": 4.8,
      "reviews": 132,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free"
      ],
      "desc": "Fudgy dark chocolate almond brownie swirled with rich New York-style baked cheesecake.",
      "long": "The ultimate dessert collision: dense 70% dark Belgian chocolate brownie swirled with a creamy vanilla bean baked cheesecake layer. Rich, fudgy, and naturally sweetened with zero refined sugar. 100% Gluten-free and eggless.",
      "ingredients": "Almond flour, cream cheese, dark chocolate 70%, butter, fresh dairy cream, natural erythritol & stevia blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/triple-chocolate-cheesecake-brownie.jpg",
      "images": [
        "assets/img/products/triple-chocolate-cheesecake-brownie.jpg",
        "assets/img/products/triple-chocolate-cheesecake-brownie-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "chocolate-flourless-cake",
      "name": "Chocolate Flourless Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1530,
      "mrp": 1759,
      "rating": 4.8,
      "reviews": 282,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Intensely rich molten dark chocolate cake baked with almond flour, cocoa butter, and zero grain flours.",
      "long": "For pure chocolate purists: an intensely decadent flourless cake made with 70% Belgian chocolate, almond flour, and pure cocoa butter. Features a velvety crackled crust and a warm molten core. 100% Gluten-Free and eggless.",
      "ingredients": "Dark chocolate 70%, almond flour, vegan butter, single-origin cacao, flaxseed, natural stevia & erythritol blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-flourless-cake.jpg",
      "images": [
        "assets/img/products/chocolate-flourless-cake.jpg",
        "assets/img/products/chocolate-flourless-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-banana-walnut-teacake",
      "name": "Banana Walnut Teacake",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1500,
      "mrp": 1724,
      "rating": 4.8,
      "reviews": 116,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Moist dark cocoa teacake packed with naturally sweet ripe bananas and toasted California walnuts.",
      "long": "The unbeatable pairing of ripe bananas, rich cocoa, and crunchy toasted walnuts: a dense, comforting loaf teacake baked with French T45 flour and zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, ripe bananas, dark cocoa, toasted walnuts, butter, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-banana-walnut-teacake.jpg",
      "images": [
        "assets/img/products/chocolate-banana-walnut-teacake.jpg",
        "assets/img/products/chocolate-banana-walnut-teacake-2.jpg",
        "assets/img/products/chocolate-banana-walnut-teacake-3.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "rakhi-cake",
      "name": "Chocolate Mousse Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1700,
      "mrp": 1954,
      "rating": 4.7,
      "reviews": 245,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free"
      ],
      "desc": "Festive triple chocolate mousse cake featuring dark, milk, and white chocolate layers over a gluten-free sponge.",
      "long": "An elegant celebration centerpiece: three airy layers of dark, milk, and white chocolate mousse resting upon a soft almond cocoa sponge, crowned with delicate chocolate filigree. Zero refined sugar and 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark chocolate, milk chocolate, white chocolate, fresh dairy cream, erythritol.",
      "allergens": [
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/rakhi-cake.jpg",
      "images": [
        "assets/img/products/rakhi-cake.jpg",
        "assets/img/products/rakhi-cake-2.jpg",
        "assets/img/products/rakhi-cake-3.jpg",
        "assets/img/products/rakhi-cake-4.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "opera-cake",
      "name": "Hazelnut Mocha Opera Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1530,
      "mrp": 1759,
      "rating": 5,
      "reviews": 48,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Signature French Opera cake with espresso-soaked almond sponge, hazelnut buttercream, and dark ganache.",
      "long": "Seven exquisite layers of almond joconde sponge soaked in bold espresso, layered with silky hazelnut praline buttercream and dark chocolate ganache, finished with dark mirror glaze. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark espresso, dark chocolate 70%, hazelnut butter, fresh cream, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/opera-cake.jpg",
      "images": [
        "assets/img/products/opera-cake.jpg",
        "assets/img/products/opera-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "mocha-caramel-crunch-cake",
      "name": "Mocha Caramel Crunch Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1700,
      "mrp": 1954,
      "rating": 5,
      "reviews": 198,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Rich dark chocolate sponge layered with espresso mocha cream, sea-salted caramel, and cashew praline.",
      "long": "A symphony of bold coffee, dark chocolate, and golden caramel: tender cocoa sponge layered with whipped mocha mousse, house-made salted caramel drizzle, and crunchy cashew brittle. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, dark cocoa, dark espresso, salted caramel, cashew praline, dairy cream.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/mocha-caramel-crunch-cake.png",
      "images": [
        "assets/img/products/mocha-caramel-crunch-cake.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "apple-cinnamon-teacake",
      "name": "Apple Cinnamon Teacake",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1500,
      "mrp": 1724,
      "rating": 5,
      "reviews": 137,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Tender spiced loaf teacake studded with caramelized Granny Smith apples and Ceylon cinnamon.",
      "long": "Slow-baked with caramelized spiced apple compote, warm Ceylon cinnamon, and French T45 flour: a tender, fragrant teacake that fills the bakery with warm autumn aromas. Zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Granny Smith apples, Ceylon cinnamon, butter, dairy milk, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/apple-cinnamon-teacake.jpg",
      "images": [
        "assets/img/products/apple-cinnamon-teacake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "dessert-table",
      "name": "Grazing Table",
      "brand": "doughremi",
      "cats": [
        "healthy-snacks",
        "desserts"
      ],
      "price": 18000,
      "mrp": 20700,
      "rating": 4.7,
      "reviews": 112,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free"
      ],
      "desc": "Bespoke luxury dessert grazing assortment curated for weddings, corporate galas, and intimate celebrations.",
      "long": "A lavish dessert curation featuring an opulent array of artisanal mini entremets, chocolate bonbons, macaron towers, and tartlets. Fully customized for your event theme and dietary preferences with full GST corporate billing.",
      "ingredients": "Assorted luxury bakery selection: dark Belgian chocolate, French T45 pastry flour, seasonal fruits, premium nuts.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (pistachio)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/dessert-table.jpg",
      "images": [
        "assets/img/products/dessert-table.jpg",
        "assets/img/products/dessert-table-2.jpg",
        "assets/img/products/dessert-table-3.png"
      ],
      "tags": [
        "sugar-free",
        "doughremi"
      ]
    },
    {
      "id": "vanilla-roasted-almond-muffins",
      "name": "Vanilla Roasted Almond Muffins",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1260,
      "mrp": 1449,
      "rating": 4.7,
      "reviews": 184,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Fluffy Madagascar vanilla muffins packed with toasted sliced almonds and white chocolate chips.",
      "long": "Golden-baked muffins infused with pure Bourbon vanilla and crowned with toasted sliced almonds and sugar-free white chocolate chips. Tender, moist, and baked fresh every morning. 100% Eggless. Box of 4.",
      "ingredients": "French T45 pastry flour, almond flour, toasted almonds, white chocolate chips, butter, Madagascar vanilla, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/vanilla-roasted-almond-muffins.jpg",
      "images": [
        "assets/img/products/vanilla-roasted-almond-muffins.jpg",
        "assets/img/products/vanilla-roasted-almond-muffins-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-sinner-cake",
      "name": "Chocolate Sinner Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1800,
      "mrp": 2070,
      "rating": 4.7,
      "reviews": 112,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto"
      ],
      "desc": "Ultimate decadent cake: layers of dark chocolate mousse, hazelnut cheesecake, and caramelized praline crunch.",
      "long": "For true chocolate devotees: rich cocoa sponge layered with 70% dark chocolate mousse, velvety hazelnut cheesecake, and crunchy hazelnut praline, draped in chocolate ganache. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, cream cheese, dark chocolate 70%, hazelnut praline, dairy cream, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-sinner-cake.jpg",
      "images": [
        "assets/img/products/chocolate-sinner-cake.jpg",
        "assets/img/products/chocolate-sinner-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-blueberry-tart",
      "name": "Chocolate Blueberry Tart",
      "brand": "signature",
      "cats": [
        "desserts",
        "pastries"
      ],
      "price": 2600,
      "mrp": 2989,
      "rating": 4.9,
      "reviews": 67,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Crisp almond tart shell filled with dark Belgian chocolate ganache and slow-cooked wild blueberry compote.",
      "long": "Buttery, crisp almond shortcrust tart filled with a layer of tart wild blueberry reduction and rich 70% dark chocolate ganache, topped with fresh blueberries. 100% Eggless, gluten-free, and refined sugar-free.",
      "ingredients": "Almond flour, dark chocolate 70%, wild blueberries, dairy cream, butter, natural stevia & erythritol blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/chocolate-blueberry-tart.jpg",
      "images": [
        "assets/img/products/chocolate-blueberry-tart.jpg",
        "assets/img/products/chocolate-blueberry-tart-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "dark-chocolate-hazelnut-tart",
      "name": "Dark Chocolate Hazelnut Tart",
      "brand": "signature",
      "cats": [
        "desserts",
        "pastries"
      ],
      "price": 2300,
      "mrp": 2645,
      "rating": 4.8,
      "reviews": 128,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Crisp pastry tart filled with silky dark chocolate ganache and roasted Turkish hazelnut praline.",
      "long": "A timeless European classic: crisp almond shortcrust pastry filled with stone-ground roasted hazelnut butter, glossy dark chocolate ganache, and crowned with whole roasted hazelnuts. 100% Eggless and refined sugar-free.",
      "ingredients": "Almond flour, Turkish hazelnuts, dark chocolate 70%, dairy cream, cocoa butter, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/dark-chocolate-hazelnut-tart.jpg",
      "images": [
        "assets/img/products/dark-chocolate-hazelnut-tart.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "pistachio-raspberry-cake",
      "name": "Pistachio Raspberry Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1800,
      "mrp": 2070,
      "rating": 4.9,
      "reviews": 217,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Tender pistachio sponge layered with tart wild raspberry compote and whipped pistachio chantilly cream.",
      "long": "An elegant pairing of earthy Sicilian pistachios and vibrant red raspberries: moist pistachio sponge layered with ruby raspberry compote and whipped pistachio cream. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure pistachio paste, wild raspberries, dairy cream, almond flour, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/pistachio-raspberry-cake.jpg",
      "images": [
        "assets/img/products/pistachio-raspberry-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "gooey-double-chocolate-cookies",
      "name": "Gooey Chocolate Cookie Box",
      "brand": "doughremi",
      "cats": [
        "cookies"
      ],
      "price": 810,
      "mrp": 931,
      "rating": 4.8,
      "reviews": 106,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Thick, fudgy dark chocolate cookies baked with 70% Callebaut chocolate chunks and flaky sea salt.",
      "long": "Baked to a crisp crinkled edge with a rich, gooey chocolate center: packed with dark chocolate chunks and finished with Maldon sea salt. Box of 6 cookies. 100% Eggless and gluten-free.",
      "ingredients": "Almond flour, Callebaut 70% dark chocolate, butter, single-origin cacao, natural plant sweetener, sea salt.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/gooey-double-chocolate-cookies.png",
      "images": [
        "assets/img/products/gooey-double-chocolate-cookies.png",
        "assets/img/products/gooey-double-chocolate-cookies-2.jpg",
        "assets/img/products/gooey-double-chocolate-cookies-3.jpg",
        "assets/img/products/gooey-double-chocolate-cookies-4.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "hazelnut-butter-brownies",
      "name": "Hazelnut Butter Brownies",
      "brand": "khowdy",
      "cats": [
        "brownies",
        "pastries"
      ],
      "price": 1350,
      "mrp": 1552,
      "rating": 5,
      "reviews": 85,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Fudgy dark chocolate brownies layered with stone-ground roasted hazelnut butter and crunchy hazelnut flakes.",
      "long": "Box of 8 intensely rich, fudgy almond flour brownies swirled with creamy house-made hazelnut butter and topped with toasted hazelnut flakes. Naturally sweetened with stevia. 100% Gluten-free and eggless.",
      "ingredients": "Almond flour, dark chocolate 70%, pure hazelnut butter, vegan butter, natural stevia & erythritol blend, hazelnuts.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/hazelnut-butter-brownies.jpg",
      "images": [
        "assets/img/products/hazelnut-butter-brownies.jpg",
        "assets/img/products/hazelnut-butter-brownies-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "choco-almond-crunch-brownies",
      "name": "Choco Almond Crunch Brownies",
      "brand": "doughremi",
      "cats": [
        "brownies",
        "pastries"
      ],
      "price": 1300,
      "mrp": 1494,
      "rating": 4.8,
      "reviews": 81,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Dense cocoa brownies loaded with dark chocolate chunks and crowned with crisp toasted almond flakes.",
      "long": "Box of 8 deeply fudgy brownies baked with 70% dark chocolate and stone-ground almond flour, crowned with a generous blanket of toasted sliced almonds for a satisfying crunch. 100% Eggless and refined sugar-free.",
      "ingredients": "Almond flour, dark chocolate 70%, toasted almond flakes, dairy butter, single-origin cocoa, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/choco-almond-crunch-brownies.jpg",
      "images": [
        "assets/img/products/choco-almond-crunch-brownies.jpg",
        "assets/img/products/choco-almond-crunch-brownies-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "dark-chocolate-orange-brownies",
      "name": "Dark Chocolate Orange Brownies",
      "brand": "doughremi",
      "cats": [
        "brownies",
        "pastries"
      ],
      "price": 1400,
      "mrp": 1609,
      "rating": 4.8,
      "reviews": 96,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Fudgy dark chocolate brownies infused with fresh organic orange zest and dark chocolate chips.",
      "long": "The sophisticated pairing of bittersweet cocoa and vibrant citrus: dense almond flour brownies infused with cold-pressed orange oil and fresh zest, studded with dark chocolate chunks. Box of 8. 100% Gluten-Free.",
      "ingredients": "Almond flour, dark chocolate 70%, fresh orange zest, orange oil, vegan butter, natural erythritol blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/dark-chocolate-orange-brownies.jpg",
      "images": [
        "assets/img/products/dark-chocolate-orange-brownies.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "fudgy-walnut-brownies",
      "name": "Fudgy Walnut Brownies",
      "brand": "doughremi",
      "cats": [
        "brownies",
        "pastries"
      ],
      "price": 1400,
      "mrp": 1609,
      "rating": 4.9,
      "reviews": 192,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Classic dense dark chocolate brownies loaded with toasted California walnuts for a rich, fudgy bite.",
      "long": "Box of 8 classic American-style fudge brownies baked with 70% Belgian chocolate and generous handfuls of buttery toasted California walnuts. Delivers a crackly crust and gooey center. 100% Gluten-Free and eggless.",
      "ingredients": "Almond flour, dark chocolate 70%, toasted California walnuts, dairy butter, natural stevia & erythritol blend.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/fudgy-walnut-brownies.jpg",
      "images": [
        "assets/img/products/fudgy-walnut-brownies.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "date-and-walnut-teacake",
      "name": "Date and Walnut Teacake",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1450,
      "mrp": 1667,
      "rating": 4.9,
      "reviews": 82,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Naturally sweet teacake packed with Medjool dates, toasted walnuts, and warm aromatic spices.",
      "long": "Slow-baked with luscious Medjool date puree, toasted California walnuts, and warm winter spices: rich, moist, and naturally sweet with zero refined sugar. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Medjool dates, toasted walnuts, butter, milk, cinnamon, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/date-and-walnut-teacake.jpg",
      "images": [
        "assets/img/products/date-and-walnut-teacake.jpg",
        "assets/img/products/date-and-walnut-teacake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "carrot-teacake",
      "name": "Carrot Teacake",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1400,
      "mrp": 1609,
      "rating": 4.9,
      "reviews": 230,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Moist spiced carrot teacake loaded with freshly grated carrots, roasted walnuts, and cream cheese drizzle.",
      "long": "Tender teacake packed with sweet grated carrots, roasted walnuts, and aromatic nutmeg, finished with a delicate cream cheese glaze. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, fresh carrots, walnuts, cream cheese, butter, cinnamon, nutmeg, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/carrot-teacake.jpg",
      "images": [
        "assets/img/products/carrot-teacake.jpg",
        "assets/img/products/carrot-teacake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "drak-chocolate-orange-teacake",
      "name": "Dark Chocolate Orange Teacake",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1400,
      "mrp": 1609,
      "rating": 4.7,
      "reviews": 60,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Moist dark cocoa loaf teacake infused with fresh orange zest, citrus reduction, and dark chocolate chips.",
      "long": "Deep Dutch cocoa teacake infused with aromatic orange zest and studded with dark chocolate chips. Moist, bittersweet, and baked fresh with French T45 flour with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin cocoa, fresh orange zest, dark chocolate chips, butter, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/drak-chocolate-orange-teacake.jpg",
      "images": [
        "assets/img/products/drak-chocolate-orange-teacake.jpg",
        "assets/img/products/drak-chocolate-orange-teacake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "gooey-choco-chips-teacake",
      "name": "Gooey Chocolate Teacake",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1450,
      "mrp": 1667,
      "rating": 4.9,
      "reviews": 74,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Decadent golden vanilla teacake generously studded with gooey molten dark chocolate chips.",
      "long": "A bakery favourite: moist golden teacake loaded with 70% dark chocolate chips that turn gooey when gently warmed. Baked with French T45 flour and Madagascar vanilla. 100% Eggless.",
      "ingredients": "French T45 pastry flour, dark chocolate chips, butter, milk, Madagascar vanilla, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/gooey-choco-chips-teacake.jpg",
      "images": [
        "assets/img/products/gooey-choco-chips-teacake.jpg",
        "assets/img/products/gooey-choco-chips-teacake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "choco-nutty-tea-loaf",
      "name": "Choco Nutty Tea Loaf",
      "brand": "khowdy",
      "cats": [
        "muffins"
      ],
      "price": 1400,
      "mrp": 1609,
      "rating": 4.7,
      "reviews": 155,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Wholesome chocolate almond loaf teacake packed with toasted almonds, walnuts, and dark chocolate chunks.",
      "long": "A rich, nutrient-dense breakfast teacake: baked with almond flour, pure cocoa, and a generous mix of roasted almonds and walnuts. Naturally sweetened with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark cocoa, roasted almonds, walnuts, butter, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/choco-nutty-tea-loaf.jpg",
      "images": [
        "assets/img/products/choco-nutty-tea-loaf.jpg",
        "assets/img/products/choco-nutty-tea-loaf-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "choco-latte-tea-loaf",
      "name": "Choco Latte Tea Loaf",
      "brand": "khowdy",
      "cats": [
        "muffins"
      ],
      "price": 1450,
      "mrp": 1667,
      "rating": 4.7,
      "reviews": 191,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Tender cocoa teacake infused with dark roast espresso, dark chocolate chips, and almond flour.",
      "long": "The harmonious union of chocolate and bold morning coffee: tender loaf cake baked with dark espresso, almond flour, and dark chocolate chips. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark espresso reduction, dark chocolate chips, butter, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/choco-latte-tea-loaf.jpg",
      "images": [
        "assets/img/products/choco-latte-tea-loaf.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "pineapple-coconut-tea-loaf",
      "name": "Pineapple Coconut Tea Loaf",
      "brand": "khowdy",
      "cats": [
        "muffins"
      ],
      "price": 1350,
      "mrp": 1552,
      "rating": 4.8,
      "reviews": 248,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Tropical loaf teacake infused with desiccated coconut, juicy pineapple chunks, and pure Madagascar vanilla.",
      "long": "Sun-drenched tropical flavours: moist teacake baked with toasted coconut flakes, juicy sweet pineapple chunks, and Bourbon vanilla. Wholesome, aromatic, and baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, toasted coconut, fresh pineapple compote, butter, milk, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/pineapple-coconut-tea-loaf.jpg",
      "images": [
        "assets/img/products/pineapple-coconut-tea-loaf.jpg",
        "assets/img/products/pineapple-coconut-tea-loaf-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "lemon-blueberry-teaccake",
      "name": "Lemon Blueberry Teacake",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 1500,
      "mrp": 1724,
      "rating": 4.9,
      "reviews": 245,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Bright, zesty lemon teacake studded with sweet wild blueberries and drizzled with lemon glaze.",
      "long": "Zesty organic lemon oil and wild blueberries come together in this exceptionally moist loaf: finished with a tangy sugar-free lemon glaze. Baked fresh with French T45 flour and pure butter. 100% Eggless.",
      "ingredients": "French T45 pastry flour, wild blueberries, fresh lemon zest & juice, butter, milk, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/lemon-blueberry-teaccake.jpg",
      "images": [
        "assets/img/products/lemon-blueberry-teaccake.jpg",
        "assets/img/products/lemon-blueberry-teaccake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "vanilla-roasted-almond-teacake",
      "name": "Vanilla Roasted Almond Tea Loaf",
      "brand": "khowdy",
      "cats": [
        "muffins"
      ],
      "price": 1350,
      "mrp": 1552,
      "rating": 4.8,
      "reviews": 66,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "loaf",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Soft Madagascar vanilla loaf teacake crowned with toasted roasted almond flakes and chocolate chips.",
      "long": "A beloved bakery staple: tender vanilla bean sponge baked with pure butter, studded with dark chocolate chips, and generously topped with toasted sliced almonds. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, toasted almonds, chocolate chips, butter, Madagascar vanilla, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/vanilla-roasted-almond-teacake.jpg",
      "images": [
        "assets/img/products/vanilla-roasted-almond-teacake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "khowdy"
      ]
    },
    {
      "id": "pistachio-nutella-cake",
      "name": "Pistachio Nutella Melt Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 3200,
      "mrp": 3679,
      "rating": 4.8,
      "reviews": 122,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "vegan"
      ],
      "desc": "Decadent celebration cake layered with pistachio sponge, house-made sugar-free Nutella, and dark ganache.",
      "long": "A showstopping centerpiece: moist pistachio brownie sponge soaked in almond milk, layered with velvety sugar-free hazelnut Nutella, dark chocolate ganache, and light pistachio mousse. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, pure pistachio paste, hazelnut butter, dark chocolate 70%, dairy cream, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (pistachio)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/pistachio-nutella-cake.jpg",
      "images": [
        "assets/img/products/pistachio-nutella-cake.jpg",
        "assets/img/products/pistachio-nutella-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "tropical-delight-cake",
      "name": "Mix Fruit Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1530,
      "mrp": 1759,
      "rating": 4.7,
      "reviews": 290,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Delicate sponge layered with light dairy cream, fresh tropical fruits, and mango-passionfruit coulis.",
      "long": "A bright celebration of fresh exotic fruits: airy vanilla sponge layered with whipped cream, freshly sliced kiwi, strawberries, pineapple, and passionfruit drizzle. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, fresh seasonal fruits, passionfruit reduction, dairy cream, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/tropical-delight-cake.jpg",
      "images": [
        "assets/img/products/tropical-delight-cake.jpg",
        "assets/img/products/tropical-delight-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "classic-tiramisu-cake",
      "name": "Classic Tiramisu Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1440,
      "mrp": 1655,
      "rating": 4.9,
      "reviews": 99,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Traditional Italian tiramisu celebration cake with espresso-soaked sponge and sugar-free mascarpone cream.",
      "long": "Classic Venetian indulgence made mindful: delicate vanilla sponge soaked in dark roast espresso syrup, layered with whipped mascarpone cream and dusted with 70% dark cocoa. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark espresso, mascarpone cheese, fresh dairy cream, dark cocoa, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/classic-tiramisu-cake.jpg",
      "images": [
        "assets/img/products/classic-tiramisu-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-tiramisu",
      "name": "Hot Chocolate Tiramisu",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 2700,
      "mrp": 3104,
      "rating": 4.9,
      "reviews": 245,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Decadent hot chocolate tiramisu cake layered with espresso-soaked cocoa sponge and silky mascarpone cream.",
      "long": "Our customer-favourite signature: moist cocoa sponge soaked in hot chocolate and bold espresso, layered with cloud-like mascarpone cream and dark chocolate curls. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark cocoa, espresso, mascarpone cheese, dairy cream, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/chocolate-tiramisu.jpg",
      "images": [
        "assets/img/products/chocolate-tiramisu.jpg",
        "assets/img/products/chocolate-tiramisu-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "french-opera",
      "name": "French Opera",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1650,
      "mrp": 1897,
      "rating": 4.9,
      "reviews": 200,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Classic Parisian Opera gateau featuring seven delicate layers of espresso joconde, chocolate cream, and ganache.",
      "long": "Handcrafted to strict French pâtisserie traditions: wafer-thin almond sponge soaked in dark coffee syrup, layered with mocha buttercream and 70% dark Belgian chocolate ganache, finished with mirror glaze. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark espresso, dark chocolate 70%, dairy cream, grass-fed butter, erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/french-opera.jpg",
      "images": [
        "assets/img/products/french-opera.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "mix-cream-cake",
      "name": "Blueberry Cream Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1530,
      "mrp": 1759,
      "rating": 4.9,
      "reviews": 255,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Tender vanilla sponge layered with slow-simmered wild blueberry compote and light whipped cream.",
      "long": "Delicate, golden vanilla bean sponge layered with luscious blueberry reduction and fluffy whipped dairy cream. Light, refreshing, and completely free from refined sugar. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, wild blueberries, dairy cream, Madagascar vanilla bean, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/mix-cream-cake.jpg",
      "images": [
        "assets/img/products/mix-cream-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-mix-berry-cake",
      "name": "Chocolate Blueberry Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1800,
      "mrp": 2070,
      "rating": 4.8,
      "reviews": 221,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Rich dark chocolate cake layered with Belgian ganache and tart wild blueberries and raspberries.",
      "long": "The irresistible harmony of bittersweet cocoa and tart forest berries: moist cocoa sponge made with French T45 flour, filled with dark chocolate ganache and bursts of fresh blueberries. 100% Eggless and sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, dark chocolate 70%, blueberries, raspberries, dairy cream, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-mix-berry-cake.jpg",
      "images": [
        "assets/img/products/chocolate-mix-berry-cake.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "salted-caramel-brownie",
      "name": "Salted Caramel Brownie",
      "brand": "doughremi",
      "cats": [
        "brownies",
        "pastries"
      ],
      "price": 1600,
      "mrp": 1839,
      "rating": 5,
      "reviews": 155,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Dense, fudgy dark chocolate brownies layered with slow-cooked sugar-free sea-salted caramel.",
      "long": "Box of 8 rich almond flour brownies baked with 70% Callebaut chocolate, swirled with house-made golden sea-salted caramel. The perfect balance of sweet, salty, and deeply chocolatey. 100% Gluten-free and eggless.",
      "ingredients": "Almond flour, dark chocolate 70%, house-made salted caramel, dairy butter, natural stevia & erythritol blend, sea salt.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/salted-caramel-brownie.jpg",
      "images": [
        "assets/img/products/salted-caramel-brownie.jpg",
        "assets/img/products/salted-caramel-brownie-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "chocolate-overload-brownie",
      "name": "Chocolate Overload Brownie",
      "brand": "doughremi",
      "cats": [
        "brownies",
        "pastries"
      ],
      "price": 1530,
      "mrp": 1759,
      "rating": 4.7,
      "reviews": 192,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "box",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Ultra-fudgy double dark chocolate brownies packed with molten chocolate chunks and dark cocoa.",
      "long": "Box of 8 intensely rich double chocolate brownies baked with single-origin cocoa and loaded with dark chocolate chunks for a gooey molten center. Naturally sweetened with zero refined sugar. 100% Gluten-free and eggless.",
      "ingredients": "Almond flour, dark chocolate 70%, dark chocolate chunks, single-origin cacao, butter, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": false,
      "image": "assets/img/products/chocolate-overload-brownie.jpg",
      "images": [
        "assets/img/products/chocolate-overload-brownie.jpg",
        "assets/img/products/chocolate-overload-brownie-2.jpg",
        "assets/img/products/chocolate-overload-brownie-3.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "pineapple-cream-cake",
      "name": "Pineapple Cream Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1440,
      "mrp": 1655,
      "rating": 4.7,
      "reviews": 108,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Nostalgic bakery celebration cake with pineapple nectar-soaked sponge, pineapple compote, and whipped cream.",
      "long": "A timeless tropical celebration cake: tender vanilla sponge soaked in real pineapple nectar, layered with slow-cooked pineapple compote and fresh dairy cream. Baked fresh with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, fresh pineapple compote, dairy cream, Madagascar vanilla, natural erythritol.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/pineapple-cream-cake.jpg",
      "images": [
        "assets/img/products/pineapple-cream-cake.jpg",
        "assets/img/products/pineapple-cream-cake-2.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "belgian-chocolate-cake-1",
      "name": "Belgian Chocolate Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1440,
      "mrp": 1655,
      "rating": 4.8,
      "reviews": 165,
      "badges": [
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Opulent celebration cake enveloped in silky 70% Callebaut Belgian dark chocolate ganache.",
      "long": "Pure chocolate decadence: moist cocoa sponge made with French T45 flour, layered with velvety dark Belgian chocolate ganache and chocolate curls. Deep, bittersweet, and refined sugar-free. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, Callebaut 70% dark chocolate, single-origin cacao, dairy cream, natural sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/belgian-chocolate-cake-1.jpg",
      "images": [
        "assets/img/products/belgian-chocolate-cake-1.jpg",
        "assets/img/products/belgian-chocolate-cake-1-2.png"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "belgian-chocolate-cake",
      "name": "Hazelnut Crunch Cake",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1660,
      "mrp": 1908,
      "rating": 4.9,
      "reviews": 59,
      "badges": [
        "BESTSELLER",
        "SUGAR-FREE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "keto",
        "vegan"
      ],
      "desc": "Rich cocoa sponge cake layered with stone-ground roasted hazelnut praline butter and dark chocolate ganache.",
      "long": "Layers of tender chocolate sponge filled with stone-ground sugar-free hazelnut butter, dark chocolate ganache, and caramelized hazelnut crunch. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, Turkish hazelnuts, dark chocolate 70%, dairy cream, natural plant sweetener.",
      "allergens": [
        "Tree nuts (almond)",
        "Tree nuts (hazelnut)",
        "Milk / Dairy"
      ],
      "customisable": true,
      "image": "assets/img/products/belgian-chocolate-cake.jpg",
      "images": [
        "assets/img/products/belgian-chocolate-cake.jpg",
        "assets/img/products/belgian-chocolate-cake-1.jpg",
        "assets/img/products/belgian-chocolate-cake-2.jpg",
        "assets/img/products/belgian-chocolate-cake-3.jpg"
      ],
      "tags": [
        "sugar-free",
        "gluten-free",
        "doughremi"
      ]
    },
    {
      "id": "gold-leaf-saffron-cheesecake",
      "name": "Gold Leaf Saffron Cheesecake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 3250,
      "mrp": 3650,
      "rating": 4.9,
      "reviews": 214,
      "badges": [
        "SIGNATURE",
        "BESTSELLER"
      ],
      "sizes": "cake",
      "occasions": [
        "anniversary",
        "wedding",
        "corporate",
        "festival"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Kashmiri saffron custard over a pistachio sablé base, finished with 24k edible gold leaf.",
      "long": "A regal dessert masterpiece: rich baked cheesecake custard infused with aromatic Kashmiri saffron threads over a crisp pistachio sablé crust, finished with hand-applied 24k edible gold leaf. 100% Gluten-free and eggless.",
      "ingredients": "Cream cheese, fresh dairy cream, almond flour, Kashmiri saffron, pistachios, 24k edible gold leaf, natural erythritol blend.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Tree nuts (pistachio)"
      ],
      "customisable": true,
      "image": "assets/img/products/kesar-rabdi-basque-cheesecake.jpg",
      "tags": [
        "mirror glaze",
        "gold leaf",
        "saffron"
      ]
    },
    {
      "id": "assam-tea-opera",
      "name": "Assam Tea Opera",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "pastries"
      ],
      "price": 2450,
      "rating": 4.8,
      "reviews": 168,
      "badges": [
        "SIGNATURE"
      ],
      "sizes": "cake",
      "occasions": [
        "anniversary",
        "corporate",
        "festival"
      ],
      "desc": "Seven layers of joconde sponge soaked in second-flush orthodox Assam tea, tea buttercream, and dark ganache.",
      "long": "A signature tribute to our Assam heritage: delicate almond joconde sponge soaked in fragrant single-estate second-flush black tea, layered with tea-infused buttercream and 70% dark chocolate ganache. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, single-estate Assam orthodox tea, dark chocolate 70%, butter, dairy cream, natural sweetener.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/opera-cake.jpg",
      "tags": [
        "opera",
        "assam tea",
        "layered"
      ]
    },
    {
      "id": "pistachio-kunafa-croissant",
      "name": "Pistachio Kunafa Croissant",
      "brand": "signature",
      "cats": [
        "croissants",
        "pastries"
      ],
      "price": 420,
      "rating": 4.9,
      "reviews": 402,
      "badges": [
        "BESTSELLER",
        "LIMITED EDITION"
      ],
      "sizes": "box",
      "occasions": [],
      "desc": "Three-day laminated butter croissant filled with pure pistachio cream and topped with crispy toasted kunafa.",
      "long": "Our iconic viral creation: three-day butter laminated croissant crafted with French T45 flour, filled with velvety 100% pure pistachio cream, and crowned with crisp golden toasted kunafa pastry and crushed pistachios. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure butter, pure pistachio paste, crispy kunafa pastry, milk, natural sweetener.",
      "allergens": [
        "Milk",
        "Wheat",
        "Tree nuts (pistachio)"
      ],
      "leadHours": 24,
      "image": "assets/img/products/pistachio-kunafa-croissant.jpg",
      "tags": [
        "viral",
        "kunafa",
        "laminated"
      ]
    },
    {
      "id": "dark-chocolate-entremet",
      "name": "Dark Chocolate Entremet",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "chocolates"
      ],
      "price": 2950,
      "rating": 4.9,
      "reviews": 141,
      "badges": [
        "SIGNATURE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "corporate"
      ],
      "desc": "Nine components of single-origin 70% Ghana chocolate under a hand-poured dark mirror glaze.",
      "long": "A haute patisserie showpiece: single-origin 70% chocolate mousse, soft chocolate sponge made with French T45 flour, crunchy praline feuilletine base, and glossy mirror glaze. Intensely rich, refined, and 100% Eggless.",
      "ingredients": "French T45 pastry flour, single-origin 70% Ghana chocolate, almond flour, dairy cream, hazelnut praline, cocoa glaze.",
      "allergens": [
        "Milk",
        "Eggs",
        "Soy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-cake.jpg",
      "tags": [
        "entremet",
        "single origin",
        "mirror glaze"
      ]
    },
    {
      "id": "raspberry-entremet",
      "name": "Raspberry Entremet",
      "brand": "signature",
      "cats": [
        "celebration-cakes"
      ],
      "price": 2850,
      "rating": 4.8,
      "reviews": 96,
      "badges": [
        "NEW",
        "SIGNATURE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "baby-shower",
        "wedding"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Raspberry confit, white chocolate rose mousse, and French T45 sponge with a velvet spray finish.",
      "long": "A delicate, ethereal patisserie creation: vibrant raspberry fruit confit paired with silky white chocolate rose mousse over tender French T45 sponge, finished with an artisan velvet spray. 100% Eggless.",
      "ingredients": "French T45 pastry flour, wild raspberries, white chocolate, organic rose water, dairy cream, almond flour, natural sweetener.",
      "allergens": [
        "Milk",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/pistachio-raspberry-cake.jpg",
      "tags": [
        "velvet finish",
        "raspberry",
        "eggless"
      ]
    },
    {
      "id": "signature-chocolate-bonbons",
      "name": "Signature Chocolate Bonbons",
      "brand": "signature",
      "cats": [
        "chocolates",
        "hampers",
        "corporate-gifting"
      ],
      "price": 1450,
      "mrp": 1650,
      "rating": 4.9,
      "reviews": 287,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "box",
      "occasions": [
        "corporate",
        "festival",
        "anniversary"
      ],
      "desc": "Artisanal Signature Chocolate Bonbons handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Twelve bonbons, twelve fillings — Assam tea ganache, salted jaggery caramel, passionfruit, hazelnut praline, black sesame and more. Each shell is airbrushed with coloured cocoa butter and tempered to a clean snap. Presented in a magnetic keepsake box.",
      "ingredients": "Couverture chocolate (dark 64%, milk 38%, white 33%), fresh cream, butter, jaggery, fruit purées, hazelnut, sesame, Assam tea, cocoa butter colours.",
      "allergens": [
        "Milk",
        "Soy",
        "Tree nuts",
        "Sesame"
      ],
      "tags": [
        "gifting",
        "bonbons",
        "hand painted"
      ],
      "image": "assets/img/products/signature-chocolate-bonbons.jpg",
      "images": [
        "assets/img/products/signature-chocolate-bonbons.jpg"
      ]
    },
    {
      "id": "wedding-tier-couture",
      "name": "Couture Wedding Tier",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "hampers"
      ],
      "price": 18500,
      "rating": 5,
      "reviews": 38,
      "badges": [
        "SIGNATURE",
        "LIMITED EDITION"
      ],
      "sizes": "single",
      "occasions": [
        "wedding"
      ],
      "desc": "Three-tier bespoke couture wedding cake with hand-piped lace, sugar florals, and 24k gold leaf detailing.",
      "long": "Our premier bespoke wedding commission: three towering tiers of French T45 sponge layered with your choice of gourmet fillings, draped in pristine white chocolate fondant with delicate hand-piped lace and edible 24k gold leaf. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dark Belgian chocolate, Madagascar vanilla, fresh cream, edible 24k gold leaf.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Tree nuts"
      ],
      "customisable": true,
      "leadHours": 336,
      "image": "assets/img/products/signature-chocolate-bonbons.jpg",
      "tags": [
        "wedding",
        "commission",
        "tiered"
      ]
    },
    {
      "id": "passionfruit-mango-tart",
      "name": "Passionfruit Mango Tart",
      "brand": "signature",
      "cats": [
        "pastries"
      ],
      "price": 380,
      "rating": 4.7,
      "reviews": 122,
      "badges": [
        "NEW"
      ],
      "sizes": "box",
      "occasions": [],
      "desc": "Crisp almond tart shell filled with tart passionfruit curd, Alphonso mango compote, and fresh fruit.",
      "long": "Sun-drenched tropical flavours in a crisp French T45 pastry shell: filled with tangy passionfruit curd, sweet Alphonso mango reduction, and fresh seasonal fruit. Bright, refreshing, and 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, passionfruit pulp, Alphonso mango, pure butter, dairy cream, natural sweetener.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs"
      ],
      "image": "assets/img/products/passionfruit-mango-tart.jpg",
      "tags": [
        "tart",
        "seasonal",
        "meringue"
      ]
    },
    {
      "id": "hazelnut-paris-brest",
      "name": "Hazelnut Paris-Brest",
      "brand": "signature",
      "cats": [
        "pastries"
      ],
      "price": 395,
      "rating": 4.8,
      "reviews": 88,
      "badges": [],
      "sizes": "box",
      "occasions": [],
      "desc": "Golden choux pastry ring filled with roasted hazelnut praline mousseline and toasted hazelnuts.",
      "long": "The classic French bicycling tribute: crisp choux pastry ring baked with French T45 flour, generously piped with silky roasted hazelnut praline mousseline cream and dusted with toasted almonds. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure butter, roasted Turkish hazelnuts, hazelnut praline, dairy cream, milk, vanilla.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Tree nuts (hazelnut)"
      ],
      "image": "assets/img/products/hazelnut-paris-brest.jpg",
      "tags": [
        "choux",
        "praline"
      ]
    },
    {
      "id": "signature-tasting-hamper",
      "name": "Signature Tasting Hamper",
      "brand": "signature",
      "cats": [
        "hampers",
        "corporate-gifting",
        "chocolates"
      ],
      "price": 4850,
      "mrp": 5400,
      "rating": 4.9,
      "reviews": 74,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "single",
      "occasions": [
        "corporate",
        "festival",
        "wedding",
        "anniversary"
      ],
      "desc": "Bonbons, chocolate bars, tea and a Signature entremet in a keepsake presentation box.",
      "long": "Our flagship gift: a 12-piece bonbon box, two single-origin bars, a tin of second-flush Assam, salted caramel spread and a 500g Signature entremet, nested in a linen-lined keepsake box with a hand-written card. Corporate branding available from 25 units.",
      "ingredients": "See individual components; full declaration enclosed.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Soy",
        "Tree nuts",
        "Sesame"
      ],
      "leadHours": 72,
      "image": "assets/img/products/mini-diwali-gift-hamper.jpg",
      "tags": [
        "hamper",
        "keepsake",
        "corporate"
      ]
    },
    {
      "id": "fresh-croissant",
      "name": "Fresh Croissant",
      "brand": "doughremi",
      "cats": [
        "croissants",
        "breads"
      ],
      "price": 145,
      "rating": 4.7,
      "reviews": 631,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "box",
      "occasions": [],
      "desc": "Three-day laminated French butter croissant with a crisp golden honeycomb shell and tender buttery interior.",
      "long": "Crafted over three days to true European standards: laminated with French T45 flour and 84% Normandy-style butter to achieve hundreds of paper-thin flaky layers and a featherlight honeycomb interior. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure butter 84%, whole milk, yeast, raw cane sugar, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "leadHours": 12,
      "image": "assets/img/products/fresh-croissant.jpg",
      "tags": [
        "laminated",
        "breakfast",
        "butter"
      ]
    },
    {
      "id": "belgian-chocolate-brownie",
      "name": "Belgian Chocolate Brownie",
      "brand": "doughremi",
      "cats": [
        "brownies"
      ],
      "price": 165,
      "mrp": 195,
      "rating": 4.8,
      "reviews": 918,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "box",
      "occasions": [
        "birthday"
      ],
      "desc": "Fudge center, crackled top crust, 54% Belgian couverture chocolate, and toasted California walnuts.",
      "long": "Our flagship bakery brownie: crafted with French T45 flour, 54% Callebaut dark chocolate, and generous handfuls of toasted California walnuts. Intensely chocolatey with a delicate crackle top. 100% Eggless.",
      "ingredients": "French T45 pastry flour, 54% Belgian dark chocolate, butter, toasted walnuts, Dutch cocoa, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Tree nuts (walnut)"
      ],
      "image": "assets/img/products/chocolate-overload-brownie.jpg",
      "tags": [
        "fudgy",
        "walnut",
        "teatime"
      ]
    },
    {
      "id": "red-velvet-cake",
      "name": "Red Velvet Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 1000,
      "mrp": 1150,
      "rating": 5,
      "reviews": 145,
      "badges": [
        "MENU-FEATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "birthday",
        "anniversary",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Crimson-hued cocoa sponge paired with tangy cream cheese frosting, baked with French T45 flour.",
      "long": "Velvety cocoa sponge naturally colored and baked with French T45 flour and almond flour, layered with whipped Philadelphia-style cream cheese frosting. Elegant, tangy, and 100% Eggless with zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin cacao, cream cheese, dairy butter, natural plant sweetener.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": true,
      "image": "assets/img/products/red-velvet-cake.jpg",
      "images": [
        "assets/img/products/signature-chocolate-bonbons.jpg"
      ],
      "tags": [
        "cake",
        "red-velvet",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "fresh-cream-pastry",
      "name": "Fresh Cream Pastry",
      "brand": "doughremi",
      "cats": [
        "pastries"
      ],
      "price": 95,
      "rating": 4.6,
      "reviews": 774,
      "badges": [],
      "sizes": "box",
      "occasions": [],
      "desc": "Airy vanilla sponge layered with fluffy dairy cream, tropical fruit coulis, and white chocolate curls.",
      "long": "Delicate, golden sponge baked fresh with French T45 flour, layered with slow-whipped fresh dairy cream and sweet fruit compote. Light, airy, and baked fresh every morning. 100% Eggless.",
      "ingredients": "French T45 pastry flour, fresh dairy cream, Madagascar vanilla, fruit compote, white chocolate curls, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs"
      ],
      "tags": [
        "nostalgic",
        "dairy cream"
      ],
      "image": "assets/img/products/mix-cream-cake.jpg",
      "images": [
        "assets/img/products/mix-cream-cake.jpg"
      ]
    },
    {
      "id": "artisan-sourdough",
      "name": "Artisan Sourdough Loaf",
      "brand": "doughremi",
      "cats": [
        "breads"
      ],
      "price": 285,
      "rating": 4.8,
      "reviews": 389,
      "badges": [
        "NEW"
      ],
      "sizes": "single",
      "occasions": [],
      "diet": [
        "vegan"
      ],
      "desc": "Traditional 36-hour slow-fermented sourdough loaf with a blistered crust and open, chewy crumb.",
      "long": "Crafted over 36 hours with our mature sourdough starter: blended with French T45 flour, stone-ground whole wheat, and spring water. Features a deeply caramelized blistered crust and a complex, tangy crumb. 100% Vegan.",
      "ingredients": "French T45 flour, stone-ground whole wheat flour, wild sourdough culture, spring water, sea salt.",
      "allergens": [
        "Wheat"
      ],
      "image": "assets/img/products/mix-cream-cake.jpg",
      "tags": [
        "sourdough",
        "vegan",
        "stone baked"
      ]
    },
    {
      "id": "celebration-cupcakes",
      "name": "Celebration Cupcakes",
      "brand": "doughremi",
      "cats": [
        "cupcakes",
        "birthday-cakes"
      ],
      "price": 480,
      "rating": 4.7,
      "reviews": 296,
      "badges": [],
      "sizes": "box",
      "occasions": [
        "birthday",
        "baby-shower",
        "graduation",
        "corporate"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Box of 6 artisan cupcakes with rich cocoa and Bourbon vanilla sponge topped with buttercream swirls.",
      "long": "Assortment of 6 freshly baked celebration cupcakes crafted with French T45 flour: includes dark chocolate, vanilla bean, and red velvet bases crowned with silky buttercream swirls and edible pearls. 100% Eggless.",
      "ingredients": "French T45 pastry flour, dark cocoa, pure butter, fresh cream, Madagascar vanilla, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs"
      ],
      "customisable": true,
      "image": "assets/img/products/vanilla-roasted-almond-muffins-2.jpg",
      "tags": [
        "party",
        "buttercream",
        "mix flavours"
      ]
    },
    {
      "id": "butter-croissant-almond",
      "name": "Almond Croissant",
      "brand": "doughremi",
      "cats": [
        "croissants",
        "pastries"
      ],
      "price": 175,
      "rating": 4.8,
      "reviews": 244,
      "badges": [],
      "sizes": "box",
      "occasions": [],
      "desc": "Twice-baked butter croissant filled with almond frangipane cream and topped with toasted almond flakes.",
      "long": "A classic French bakery indulgence: our three-day laminated croissant filled with rich almond frangipane, baked a second time to crisp perfection and dusted with toasted sliced almonds. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure butter, almond flour, toasted sliced almonds, vanilla, milk, sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Tree nuts (almond)"
      ],
      "leadHours": 12,
      "tags": [
        "frangipane",
        "breakfast"
      ],
      "image": "assets/img/products/butter-croissant-almond.jpg",
      "images": [
        "assets/img/products/butter-croissant-almond.jpg"
      ]
    },
    {
      "id": "chocolate-truffle-cake",
      "name": "Chocolate Truffle Cake",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "celebration-cakes"
      ],
      "price": 849,
      "mrp": 999,
      "rating": 4.8,
      "reviews": 1102,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "graduation"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Artisan Chocolate Truffle Cake crafted with French T45 flour, layered with velvety whipped cream and zero refined sugar. 100% Eggless.",
      "long": "Three layers of moist chocolate sponge, a generous 54% dark ganache between and around, finished with chocolate curls and a ganache drip. Your message piped by hand at no charge. Eggless on request. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, dark couverture 54%, fresh cream, butter, cane sugar, cocoa, pasteurised eggs (optional), milk.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs"
      ],
      "customisable": true,
      "tags": [
        "ganache",
        "most ordered",
        "eggless option"
      ],
      "image": "assets/img/products/belgian-chocolate-cake.jpg",
      "images": [
        "assets/img/products/belgian-chocolate-cake.jpg"
      ]
    },
    {
      "id": "cinnamon-swirl-bun",
      "name": "Cinnamon Swirl Bun",
      "brand": "doughremi",
      "cats": [
        "breads",
        "pastries"
      ],
      "price": 135,
      "rating": 4.7,
      "reviews": 318,
      "badges": [],
      "sizes": "box",
      "occasions": [],
      "desc": "Enriched brioche dough swirled with Ceylon cinnamon and finished with melted cream cheese glaze.",
      "long": "Pillowy, slow-fermented brioche dough rolled with fragrant Ceylon cinnamon and brown butter, baked golden and topped with silky cream cheese frosting. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butter, Ceylon cinnamon, cream cheese, milk, natural cane sugar, yeast.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs"
      ],
      "leadHours": 12,
      "tags": [
        "breakfast",
        "cinnamon"
      ],
      "image": "assets/img/products/classic-cinnamon-roll.jpg",
      "images": [
        "assets/img/products/classic-cinnamon-roll.jpg"
      ]
    },
    {
      "id": "multigrain-seed-loaf",
      "name": "Multigrain Seed Loaf",
      "brand": "doughremi",
      "cats": [
        "breads",
        "healthy-snacks"
      ],
      "price": 245,
      "rating": 4.6,
      "reviews": 187,
      "badges": [],
      "sizes": "single",
      "occasions": [],
      "diet": [
        "vegan",
        "high-protein"
      ],
      "desc": "Five ancient grains, four toasted seeds, no bleached maida, and zero artificial improvers.",
      "long": "A nutrient-rich everyday sandwich bread: slow-fermented with whole wheat, oats, barley, ragi, and amaranth, loaded with pumpkin, sunflower, flax, and sesame seeds. Baked with French T45 flour. 100% Vegan.",
      "ingredients": "Whole wheat flour, French T45 flour, rolled oats, ragi, amaranth, pumpkin seeds, sunflower seeds, flaxseeds, olive oil, yeast, sea salt.",
      "allergens": [
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/classic-cinnamon-roll.jpg",
      "tags": [
        "wholegrain",
        "no maida",
        "vegan"
      ]
    },
    {
      "id": "coffee-walnut-loaf",
      "name": "Coffee Walnut Loaf",
      "brand": "doughremi",
      "cats": [
        "pastries",
        "coffee"
      ],
      "price": 425,
      "rating": 4.6,
      "reviews": 141,
      "badges": [],
      "sizes": "single",
      "occasions": [],
      "desc": "Rich espresso teacake loaf packed with toasted California walnuts and a bittersweet coffee glaze.",
      "long": "Baked with French T45 flour, single-origin espresso reduction, and generous handfuls of crunchy toasted walnuts: finished with a delicate espresso-infused glaze. Incomparably aromatic with morning coffee. 100% Eggless.",
      "ingredients": "French T45 pastry flour, toasted California walnuts, dark espresso, butter, milk, raw cane sugar, vanilla.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Tree nuts (walnut)"
      ],
      "image": "assets/img/products/date-and-walnut-teacake.jpg",
      "tags": [
        "loaf",
        "coffee",
        "keeps well"
      ]
    },
    {
      "id": "assam-tea-cookies",
      "name": "Assam Tea Cookies",
      "brand": "khowdy",
      "cats": [
        "cookies",
        "assamese",
        "healthy-snacks"
      ],
      "price": 395,
      "mrp": 449,
      "rating": 4.8,
      "reviews": 512,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "jar",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "eggless",
        "nut-free"
      ],
      "desc": "Crisp, buttery Assam Tea Cookies baked to a golden melt-in-the-mouth crumb with pure slow-churned butter and wholesome ingredients.",
      "long": "We grind whole second-flush Assam leaf from partner estates in Jorhat into a cold-butter shortbread, so the tea is in the crumb rather than sprinkled on it. Malty, floral and just sweet enough. Eggless, no palm oil, no preservatives.",
      "ingredients": "Wheat flour, butter, cane sugar, second-flush Assam tea leaf, milk solids, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "tags": [
        "assam",
        "shortbread",
        "eggless"
      ],
      "image": "assets/img/products/brown-butter-cookie-box.jpg",
      "images": [
        "assets/img/products/brown-butter-cookie-box.jpg"
      ]
    },
    {
      "id": "black-rice-cookies",
      "name": "Black Rice Cookies",
      "brand": "khowdy",
      "cats": [
        "cookies",
        "assamese",
        "healthy-snacks"
      ],
      "price": 425,
      "rating": 4.7,
      "reviews": 288,
      "badges": [
        "NEW"
      ],
      "sizes": "jar",
      "occasions": [
        "festival"
      ],
      "diet": [
        "eggless",
        "gluten-free"
      ],
      "desc": "Crisp, buttery Black Rice Cookies baked to a golden melt-in-the-mouth crumb with pure slow-churned butter and wholesome ingredients.",
      "long": "Chakhao — the aromatic black rice of the Northeast — stone-milled and baked with jaggery and cold-pressed coconut oil. Naturally gluten free, deep purple, faintly nutty, and rich in anthocyanins. Sourced directly from growers in Majuli.",
      "ingredients": "Chakhao black rice flour, jaggery, cold-pressed coconut oil, coconut milk, cardamom, sea salt.",
      "allergens": [],
      "image": "assets/img/products/double-chocolate-cookie-box.jpg",
      "tags": [
        "gluten free",
        "heirloom rice",
        "majuli"
      ]
    },
    {
      "id": "millet-cookies",
      "name": "Millet Cookies",
      "brand": "khowdy",
      "cats": [
        "cookies",
        "healthy-snacks"
      ],
      "price": 375,
      "rating": 4.6,
      "reviews": 341,
      "badges": [],
      "sizes": "jar",
      "occasions": [],
      "diet": [
        "eggless",
        "high-protein",
        "sugar-free"
      ],
      "desc": "Crisp, buttery Millet Cookies baked to a golden melt-in-the-mouth crumb with pure slow-churned butter and wholesome ingredients.",
      "long": "Built for the 4pm slump: three millets, date paste instead of sugar, a little ghee for shortness and roasted sesame for crunch. Nine grams of protein per serving and genuinely good with tea.",
      "ingredients": "Ragi flour, jowar flour, bajra flour, date paste, ghee, sesame seed, cardamom, sea salt.",
      "allergens": [
        "Milk",
        "Sesame"
      ],
      "image": "assets/img/products/pistachio-chocolate-cookie-box.jpg",
      "tags": [
        "no refined sugar",
        "millet",
        "protein"
      ]
    },
    {
      "id": "premium-tea-time-box",
      "name": "Premium Tea-Time Box",
      "brand": "khowdy",
      "cats": [
        "hampers",
        "corporate-gifting",
        "cookies"
      ],
      "price": 1250,
      "mrp": 1450,
      "rating": 4.8,
      "reviews": 176,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate",
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Single-estate premium Premium Tea-Time Box boasting delicate aromatic notes, golden liquor, and authentic regional terroir.",
      "long": "Assam tea cookies, black rice cookies and millet cookies with a 100g tin of single-estate second-flush Assam, presented in a jute-bound box with a hand-stamped card. Our most-gifted Khowdy box for Bihu and Diwali.",
      "ingredients": "See individual components; full declaration enclosed.",
      "allergens": [
        "Milk",
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/brookie-box.png",
      "tags": [
        "gifting",
        "assam tea",
        "jute box"
      ]
    },
    {
      "id": "assamese-snack-box",
      "name": "Assamese Snack Box",
      "brand": "khowdy",
      "cats": [
        "assamese",
        "healthy-snacks",
        "hampers"
      ],
      "price": 1450,
      "rating": 4.7,
      "reviews": 132,
      "badges": [],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Artisanal Assamese Snack Box handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "A guided tour of the Assamese pantry: coconut til pitha, sesame-jaggery laru, komal chira granola clusters and cashews tossed in a controlled amount of bhoot jolokia. Regional recipes, cleaner methods, no palm oil.",
      "ingredients": "Rice flour, coconut, jaggery, sesame, komal chira (soft flattened rice), cashew, bhoot jolokia, mustard oil, sea salt.",
      "allergens": [
        "Sesame",
        "Tree nuts (cashew)",
        "Mustard"
      ],
      "image": "assets/img/products/herb-and-cheese-crackers.jpg",
      "tags": [
        "regional",
        "bihu",
        "pitha"
      ]
    },
    {
      "id": "single-estate-assam-tea",
      "name": "Single-Estate Assam Tea",
      "brand": "khowdy",
      "cats": [
        "coffee",
        "assamese",
        "hampers"
      ],
      "price": 550,
      "rating": 4.9,
      "reviews": 264,
      "badges": [],
      "sizes": "jar",
      "occasions": [
        "corporate",
        "festival"
      ],
      "diet": [
        "vegan"
      ],
      "desc": "Single-estate premium Single-Estate Assam Tea boasting delicate aromatic notes, golden liquor, and authentic regional terroir.",
      "long": "One garden, one flush, one picking window. Golden-tipped orthodox leaf with the malt and honey character second-flush Assam is famous for. Whole leaf, never dust, packed within ten days of plucking in a nitrogen-flushed tin.",
      "ingredients": "100% orthodox second-flush Assam tea leaf.",
      "allergens": [],
      "image": "assets/img/products/single-estate-assam-tea.jpg",
      "tags": [
        "single estate",
        "orthodox",
        "second flush"
      ]
    },
    {
      "id": "jaggery-granola",
      "name": "Komal Chira Granola",
      "brand": "khowdy",
      "cats": [
        "healthy-snacks",
        "assamese"
      ],
      "price": 465,
      "rating": 4.6,
      "reviews": 158,
      "badges": [
        "NEW"
      ],
      "sizes": "jar",
      "occasions": [],
      "diet": [
        "vegan",
        "high-protein"
      ],
      "desc": "Artisanal Komal Chira Granola handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Komal chira — Assam's soft flattened rice — clustered with rolled oats, jaggery syrup, cold-pressed coconut oil and four seeds. Baked low and slow for clusters that survive the milk. Vegan, no palm oil, no refined sugar.",
      "ingredients": "Komal chira, rolled oats, jaggery, cold-pressed coconut oil, pumpkin seed, sunflower seed, flaxseed, coconut flakes, cinnamon.",
      "allergens": [],
      "image": "assets/img/products/jaggery-granola.jpg",
      "tags": [
        "breakfast",
        "vegan",
        "clusters"
      ]
    },
    {
      "id": "bhoot-jolokia-cashews",
      "name": "Bhoot Jolokia Cashews",
      "brand": "khowdy",
      "cats": [
        "healthy-snacks",
        "assamese"
      ],
      "price": 495,
      "rating": 4.7,
      "reviews": 203,
      "badges": [],
      "sizes": "jar",
      "occasions": [
        "corporate"
      ],
      "diet": [
        "vegan",
        "gluten-free"
      ],
      "desc": "Artisanal Bhoot Jolokia Cashews handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Artisanal Bhoot Jolokia Cashews handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "Cashew W240, cold-pressed mustard oil, bhoot jolokia, black salt, curry leaf, turmeric.",
      "allergens": [
        "Tree nuts (cashew)",
        "Mustard"
      ],
      "image": "assets/img/products/paprika-and-garlic-crackers.jpg",
      "tags": [
        "spicy",
        "roasted",
        "bar snack"
      ]
    },
    {
      "id": "til-pitha-box",
      "name": "Til Pitha Box",
      "brand": "khowdy",
      "cats": [
        "assamese",
        "hampers"
      ],
      "price": 385,
      "rating": 4.8,
      "reviews": 149,
      "badges": [],
      "sizes": "box",
      "occasions": [
        "festival"
      ],
      "diet": [
        "vegan",
        "gluten-free"
      ],
      "desc": "Artisanal Til Pitha Box handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Sticky bora rice, ground and griddled thin, rolled around roasted black sesame and jaggery while still warm. The Bihu classic, made by hand in small batches by the same three women who taught us the recipe.",
      "ingredients": "Bora sticky rice, black sesame, jaggery, coconut, sea salt.",
      "allergens": [
        "Sesame"
      ],
      "tags": [
        "bihu",
        "handmade",
        "gluten free"
      ],
      "image": "assets/img/products/motichoor-barks.jpg",
      "images": [
        "assets/img/products/motichoor-barks.jpg"
      ]
    },
    {
      "id": "birthday-celebration-hamper",
      "name": "Birthday Celebration Hamper",
      "brand": "doughremi",
      "cats": [
        "hampers",
        "birthday-cakes"
      ],
      "price": 2250,
      "mrp": 2600,
      "rating": 4.8,
      "reviews": 187,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "single",
      "occasions": [
        "birthday"
      ],
      "desc": "Artisanal Birthday Celebration Hamper handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Everything a doorstep birthday needs: a 500g chocolate truffle cake, four brownies, six cupcakes, candles, a party knife and a hand-written card in your words. Choose a delivery slot and we handle the surprise.",
      "ingredients": "See individual components; full declaration enclosed.",
      "allergens": [
        "Milk",
        "Wheat",
        "Eggs",
        "Tree nuts"
      ],
      "leadHours": 24,
      "image": "assets/img/products/motichoor-barks.jpg",
      "tags": [
        "surprise",
        "hamper",
        "birthday"
      ]
    },
    {
      "id": "corporate-diwali-hamper",
      "name": "Corporate Festival Hamper",
      "brand": "khowdy",
      "cats": [
        "hampers",
        "corporate-gifting"
      ],
      "price": 1850,
      "rating": 4.8,
      "reviews": 214,
      "badges": [],
      "sizes": "single",
      "occasions": [
        "festival",
        "corporate"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Artisanal Corporate Festival Hamper handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Built for gifting at scale: Khowdy cookies, Assam tea, laru, dry fruit and a Signature chocolate bar in a co-branded box with your logo foiled on the lid. Minimum 25 units, GST invoice, pan-India dispatch with per-address delivery.",
      "ingredients": "See individual components; full declaration enclosed.",
      "allergens": [
        "Milk",
        "Wheat",
        "Sesame",
        "Tree nuts"
      ],
      "leadHours": 168,
      "image": "assets/img/products/assorted-mithai-box-of-15.jpg",
      "tags": [
        "b2b",
        "co-branded",
        "bulk"
      ]
    },
    {
      "id": "wedding-favour-box",
      "name": "Wedding Favour Box",
      "brand": "signature",
      "cats": [
        "hampers",
        "corporate-gifting",
        "chocolates"
      ],
      "price": 650,
      "rating": 4.9,
      "reviews": 96,
      "badges": [
        "SIGNATURE"
      ],
      "sizes": "single",
      "occasions": [
        "wedding",
        "custom"
      ],
      "desc": "Artisanal Wedding Favour Box handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Four hand-painted bonbons in a rigid box foiled with your monogram, names and wedding date, tied with silk ribbon in your palette. Minimum 50 boxes, three weeks' notice, tasting box sent before you commit.",
      "ingredients": "Couverture chocolate, fresh cream, butter, fruit purées, nuts, cocoa butter colours.",
      "allergens": [
        "Milk",
        "Soy",
        "Tree nuts"
      ],
      "leadHours": 504,
      "image": "assets/img/products/assorted-mithai-box-of-6.jpg",
      "tags": [
        "favours",
        "monogram",
        "wedding"
      ]
    },
    {
      "id": "saiph-gift-card",
      "name": "SAiPH Gift Card",
      "brand": "saiph",
      "cats": [
        "gift-cards",
        "hampers",
        "corporate-gifting"
      ],
      "price": 1000,
      "rating": 4.9,
      "reviews": 421,
      "badges": [],
      "sizes": "single",
      "occasions": [
        "birthday",
        "corporate",
        "festival",
        "custom"
      ],
      "desc": "Artisanal SAiPH Gift Card handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Redeemable across DoughReMi, SAiPH Signature and Khowdy — online and in every store. Choose an amount, add a message, schedule the send. Valid twelve months, never expires mid-order, and the balance carries across visits.",
      "ingredients": "Not applicable.",
      "allergens": [],
      "leadHours": 0,
      "tags": [
        "instant",
        "digital",
        "flexible"
      ],
      "image": "assets/img/products/saiph-gift-card.jpg",
      "images": [
        "assets/img/products/saiph-gift-card.jpg"
      ]
    },
    {
      "id": "classic-vanilla-cake",
      "name": "Vanilla Cake",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "celebration-cakes"
      ],
      "price": 650,
      "mrp": 750,
      "rating": 4.8,
      "reviews": 142,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Delicate golden sponge infused with Bourbon vanilla beans, finished with fluffy whipped dairy cream.",
      "long": "Our classic celebration centerpiece: tender golden sponge baked fresh with French T45 flour, infused with slow-steeped Madagascar Bourbon vanilla, and layered with light whipped dairy cream. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Madagascar vanilla beans, fresh dairy cream, butter, milk, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "customisable": true,
      "image": "assets/img/products/saiph-gift-card.jpg",
      "tags": [
        "vanilla",
        "birthday cake",
        "eggless cake"
      ]
    },
    {
      "id": "rich-chocolate-cake",
      "name": "Chocolate Cake",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "celebration-cakes"
      ],
      "price": 750,
      "mrp": 850,
      "rating": 4.9,
      "reviews": 218,
      "badges": [
        "BESTSELLER",
        "POPULAR"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary",
        "celebration"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Deep, moist chocolate sponge layered with 55% Belgian chocolate ganache and fluffy cocoa cream.",
      "long": "A classic birthday favourite: rich chocolate sponge baked with French T45 flour and Dutch cocoa, generously frosted with silky Belgian chocolate ganache and chocolate curls. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Belgian dark chocolate, Dutch cocoa, fresh cream, butter, milk, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "customisable": true,
      "image": "assets/img/products/chocolate-cake.jpg",
      "tags": [
        "chocolate",
        "ganache",
        "birthday cake"
      ]
    },
    {
      "id": "golden-butterscotch-cake",
      "name": "Butter scotch Cake",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "celebration-cakes"
      ],
      "price": 700,
      "mrp": 800,
      "rating": 4.8,
      "reviews": 116,
      "badges": [
        "FAVOURITE"
      ],
      "sizes": "cake",
      "occasions": [
        "birthday",
        "anniversary"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Moist sponge layered with rich butterscotch cream and crunchy golden cashew praline.",
      "long": "A nostalgic crowd favourite: tender golden sponge baked with French T45 flour, filled with slow-cooked butterscotch caramel and topped with crisp caramelized cashew praline. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butterscotch caramel, roasted cashews, fresh dairy cream, butter, milk, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Tree nuts (cashew)"
      ],
      "customisable": true,
      "image": "assets/img/products/butterscotch-cake.jpg",
      "tags": [
        "butterscotch",
        "praline",
        "crunch"
      ]
    },
    {
      "id": "tea-cake-vanilla",
      "name": "Tea cake - Vanilla",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "muffins"
      ],
      "price": 280,
      "mrp": 320,
      "rating": 4.7,
      "reviews": 64,
      "badges": [
        "FRESH BAKE"
      ],
      "sizes": "teacake",
      "occasions": [
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Tender, buttery breakfast loaf infused with Madagascar vanilla bean and dusted with icing sugar.",
      "long": "Classic English morning teacake: baked with French T45 flour and slow-churned dairy butter, scented with aromatic Bourbon vanilla. Moist, tender, and perfect with tea. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure dairy butter, Madagascar vanilla extract, milk, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/vanilla-roasted-almond-teacake.jpg",
      "tags": [
        "tea cake",
        "vanilla loaf",
        "breakfast"
      ]
    },
    {
      "id": "tea-cake-chocolate",
      "name": "Tea cake - Chocolate",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "muffins"
      ],
      "price": 320,
      "mrp": 360,
      "rating": 4.8,
      "reviews": 82,
      "badges": [
        "POPULAR"
      ],
      "sizes": "teacake",
      "occasions": [
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Decadent cocoa loaf teacake baked with Dutch cocoa, dark chocolate chips, and pure butter.",
      "long": "Rich and deeply chocolatey: moist loaf teacake baked with French T45 flour, rich Dutch cocoa, and studded throughout with dark chocolate chips. Baked fresh daily. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Dutch cocoa, dark chocolate chips, dairy butter, milk, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/chocolate-banana-walnut-teacake.jpg",
      "tags": [
        "tea cake",
        "chocolate loaf",
        "choco chip"
      ]
    },
    {
      "id": "tea-cake-butterscotch",
      "name": "Tea cake - Butterscotch",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "muffins"
      ],
      "price": 310,
      "mrp": 350,
      "rating": 4.7,
      "reviews": 58,
      "sizes": "teacake",
      "occasions": [
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Rich brown butter teacake studded with caramelized butterscotch chips and roasted nuts.",
      "long": "A golden, comforting morning teacake: baked with French T45 flour and browned butter, studded with sweet caramelized butterscotch chips. Warm, aromatic, and 100% Eggless.",
      "ingredients": "French T45 pastry flour, dairy butter, butterscotch chips, milk, raw cane sugar, vanilla extract.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/butterscotch-cake.jpg",
      "tags": [
        "tea cake",
        "butterscotch",
        "snack"
      ]
    },
    {
      "id": "tea-cake-plain",
      "name": "Tea cake - Plain",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "muffins"
      ],
      "price": 250,
      "mrp": 290,
      "rating": 4.6,
      "reviews": 43,
      "sizes": "teacake",
      "occasions": [
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Traditional golden English-style teacake with a delicate crumb and warm vanilla aroma.",
      "long": "An everyday luxury: golden teacake baked to a fine, tender crumb using French T45 flour and pure slow-churned butter. Simple, comforting, and baked fresh every morning. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure dairy butter, milk, raw cane sugar, Madagascar vanilla.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/cacao-butter-cake.jpg",
      "tags": [
        "tea cake",
        "plain",
        "classic"
      ]
    },
    {
      "id": "tea-cake-butter",
      "name": "Tea cake - Butter",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "muffins"
      ],
      "price": 300,
      "mrp": 340,
      "rating": 4.8,
      "reviews": 76,
      "badges": [
        "CHEF PICK"
      ],
      "sizes": "teacake",
      "occasions": [
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Crafted with pure slow-churned dairy butter for an incomparably rich, melt-in-mouth texture.",
      "long": "The purest celebration of dairy butter: slow-baked loaf teacake made with generous lashings of farm butter and French T45 flour. Melts softly on the palate with a rich golden crumb. 100% Eggless.",
      "ingredients": "French T45 pastry flour, slow-churned dairy butter, whole milk, raw cane sugar, vanilla bean.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/brown-butter-cake.png",
      "tags": [
        "tea cake",
        "butter",
        "rich"
      ]
    },
    {
      "id": "artisan-fruit-cake",
      "name": "Fruit cake (All/Any fruit)",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 420,
      "mrp": 480,
      "rating": 4.9,
      "reviews": 95,
      "badges": [
        "SIGNATURE"
      ],
      "sizes": "cake",
      "occasions": [
        "festival",
        "custom",
        "birthday"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Golden pound cake studded with candied citrus peels, cherries, golden sultanas, and currants.",
      "long": "A colourful festival of fruits: traditional golden pound cake baked with French T45 flour, loaded with soaked cherries, golden sultanas, candied orange peel, and black currants. 100% Eggless.",
      "ingredients": "French T45 pastry flour, candied fruits, golden sultanas, black currants, dairy butter, spices, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/tropical-delight-cake.jpg",
      "tags": [
        "fruit cake",
        "candied fruit",
        "tutti frutti"
      ]
    },
    {
      "id": "traditional-plum-cake",
      "name": "Plum cake (Non-alcoholic)",
      "brand": "doughremi",
      "cats": [
        "celebration-cakes",
        "birthday-cakes"
      ],
      "price": 480,
      "mrp": 550,
      "rating": 4.9,
      "reviews": 134,
      "badges": [
        "SEASONAL",
        "BESTSELLER"
      ],
      "sizes": "cake",
      "occasions": [
        "festival",
        "anniversary",
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Spiced festive dark cake infused with fruit juice-soaked raisins, prunes, dates, and aromatic winter spices.",
      "long": "Traditional festive fruit cake: dark, rich, and fragrant with Ceylon cinnamon, nutmeg, and cloves, packed with dates, raisins, and prunes soaked in spiced fruit reduction. 100% Non-alcoholic and eggless.",
      "ingredients": "French T45 pastry flour, soaked raisins, prunes, dates, fruit juice reduction, butter, winter spices, molasses.",
      "allergens": [
        "Milk",
        "Wheat",
        "Tree nuts (almond)"
      ],
      "image": "assets/img/products/plum-cake-non-alcoholic.jpg",
      "tags": [
        "plum cake",
        "festive",
        "non alcoholic",
        "christmas"
      ]
    },
    {
      "id": "butter-plain-cake",
      "name": "Butter Plain Cake",
      "brand": "doughremi",
      "cats": [
        "birthday-cakes",
        "celebration-cakes"
      ],
      "price": 350,
      "mrp": 400,
      "rating": 4.7,
      "reviews": 52,
      "sizes": "cake",
      "occasions": [
        "birthday",
        "custom"
      ],
      "diet": [
        "eggless"
      ],
      "desc": "Old-fashioned round butter cake baked to a golden crust with a soft, velvety crumb.",
      "long": "A bakery heritage recipe: round butter pound cake baked with French T45 flour and cultured dairy butter. Scented with warm vanilla with a tender golden crumb. 100% Eggless.",
      "ingredients": "French T45 pastry flour, cultured dairy butter, milk, raw cane sugar, pure vanilla extract.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/brown-butter-cake.png",
      "tags": [
        "butter cake",
        "sponge",
        "round cake"
      ]
    },
    {
      "id": "no-bake-cheese-cream-cake",
      "name": "No Bake Cheese Cream Cake",
      "brand": "signature",
      "cats": [
        "celebration-cakes",
        "birthday-cakes",
        "desserts"
      ],
      "price": 1550,
      "mrp": 1780,
      "rating": 5,
      "reviews": 182,
      "badges": [
        "SIGNATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "poundCake",
      "occasions": [
        "anniversary",
        "birthday",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Ultra-silky cream cheese mousse over a buttery almond crust, infused with fragrant Madagascar vanilla.",
      "long": "A cloud-like chilled cheesecake: whipped Philadelphia cream cheese layered over a crisp, buttery almond crust, finished with fragrant Bourbon vanilla bean. Light, velvety, and completely refined sugar-free. 100% Eggless.",
      "ingredients": "Cream cheese, fresh dairy cream, almond flour, butter, Madagascar vanilla, natural stevia & erythritol blend.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "image": "assets/img/products/vanilla-basque-cheesecake.jpg",
      "images": [
        "assets/img/products/saiph-gift-card.jpg"
      ],
      "tags": [
        "cake",
        "cheesecake",
        "no-bake",
        "eggless",
        "gluten-free",
        "signature"
      ]
    },
    {
      "id": "sweet-burger-tea-cake-buns",
      "name": "Sweet Burger (Tea Cake Buns)",
      "brand": "doughremi",
      "cats": [
        "burgers",
        "desserts"
      ],
      "price": 120,
      "mrp": 140,
      "rating": 4.7,
      "reviews": 38,
      "badges": [
        "NEW"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Artisan Sweet Burger (Tea Cake Buns) crafted with French T45 flour, layered with velvety whipped cream and zero refined sugar. 100% Eggless.",
      "long": "A delightful sweet twist! Soft golden teacake brioche buns halved and filled with chantilly cream, strawberry compote and chocolate drizzle. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, Teacake brioche, whipped cream, berry compote, chocolate ganache.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/sweet-burger-tea-cake-buns.jpg",
      "tags": [
        "sweet burger",
        "teacake bun",
        "dessert burger"
      ]
    },
    {
      "id": "classic-plain-burger",
      "name": "Plain burger",
      "brand": "doughremi",
      "cats": [
        "burgers"
      ],
      "price": 90,
      "mrp": 110,
      "rating": 4.5,
      "reviews": 29,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Toasted artisan brioche bun filled with savory gourmet patty, crisp garden greens, and spiced house sauce.",
      "long": "Toasted artisan brioche bun filled with savory gourmet patty, crisp garden greens, and spiced house sauce. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "Brioche bun, sesame seeds, herb butter, house relish.",
      "allergens": [
        "Milk",
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/classic-plain-burger.jpg",
      "tags": [
        "burger",
        "plain burger",
        "sesame bun"
      ]
    },
    {
      "id": "crispy-veg-burger",
      "name": "Veg Burger",
      "brand": "doughremi",
      "cats": [
        "burgers"
      ],
      "price": 130,
      "mrp": 150,
      "rating": 4.8,
      "reviews": 84,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Crispy golden vegetable patty, crisp lettuce, garden tomato, red onion and creamy house sauce.",
      "long": "Crispy golden vegetable patty, crisp lettuce, garden tomato, red onion and creamy house sauce. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "Sesame bun, potato-herb patty, iceberg lettuce, tomato, onion, eggless burger mayo.",
      "allergens": [
        "Milk",
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/crispy-veg-burger.jpg",
      "tags": [
        "veg burger",
        "crispy patty",
        "burger"
      ]
    },
    {
      "id": "spiced-paneer-burger",
      "name": "Paneer Burger",
      "brand": "doughremi",
      "cats": [
        "burgers"
      ],
      "price": 160,
      "mrp": 180,
      "rating": 4.9,
      "reviews": 92,
      "badges": [
        "POPULAR"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Grilled malai paneer steak marinated in tandoori spices with crisp greens and mint mayo.",
      "long": "Grilled malai paneer steak marinated in tandoori spices with crisp greens and mint mayo. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "Sesame brioche, fresh paneer, tandoori spices, mint mayo, lettuce, tomato.",
      "allergens": [
        "Milk",
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/spiced-paneer-burger.jpg",
      "tags": [
        "paneer burger",
        "tandoori",
        "cottage cheese"
      ]
    },
    {
      "id": "loaded-cheese-burger",
      "name": "Cheese Burger",
      "brand": "doughremi",
      "cats": [
        "burgers"
      ],
      "price": 150,
      "mrp": 175,
      "rating": 4.8,
      "reviews": 77,
      "badges": [
        "CHEESY"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Crisp vegetable patty topped with a double layer of melted cheddar and cream cheese sauce.",
      "long": "Crisp vegetable patty topped with a double layer of melted cheddar and cream cheese sauce. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "Brioche bun, cheddar cheese slice, cheese sauce, vegetable patty, lettuce.",
      "allergens": [
        "Milk",
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/loaded-cheese-burger.jpg",
      "tags": [
        "cheese burger",
        "cheddar",
        "double cheese"
      ]
    },
    {
      "id": "bakhar-khani-plain",
      "name": "Bakhar Khani - Plain",
      "brand": "doughremi",
      "cats": [
        "bakhar-khani"
      ],
      "price": 80,
      "mrp": 95,
      "rating": 4.8,
      "reviews": 62,
      "badges": [
        "TRADITIONAL"
      ],
      "sizes": "pack2",
      "diet": [
        "eggless"
      ],
      "desc": "Traditional multi-layered flaky flatbread baked crisp with clarified butter and sesame seeds.",
      "long": "Traditional multi-layered flaky flatbread baked crisp with clarified butter and sesame seeds. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "Refined wheat flour, clarified butter (ghee), milk, sesame seeds, sea salt.",
      "allergens": [
        "Milk",
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/bakhar-khani-plain.jpg",
      "tags": [
        "bakhar khani",
        "flaky",
        "traditional"
      ]
    },
    {
      "id": "bakhar-khani-cheese",
      "name": "Bakhar Khani - Cheese",
      "brand": "doughremi",
      "cats": [
        "bakhar-khani"
      ],
      "price": 110,
      "mrp": 130,
      "rating": 4.8,
      "reviews": 49,
      "badges": [
        "CHEF PICK"
      ],
      "sizes": "pack2",
      "diet": [
        "eggless"
      ],
      "desc": "Artisanal Bakhar Khani - Cheese handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Artisanal Bakhar Khani - Cheese handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "Wheat flour, ghee, blended cheddar cheese, oregano, sea salt.",
      "allergens": [
        "Milk",
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/bakhar-khani-cheese.jpg",
      "tags": [
        "bakhar khani",
        "cheese",
        "savoury"
      ]
    },
    {
      "id": "bakhar-khani-chocolate",
      "name": "Bakhar Khani - Chocolate",
      "brand": "doughremi",
      "cats": [
        "bakhar-khani"
      ],
      "price": 120,
      "mrp": 140,
      "rating": 4.9,
      "reviews": 55,
      "badges": [
        "NEW"
      ],
      "sizes": "pack2",
      "diet": [
        "eggless"
      ],
      "desc": "Artisanal Bakhar Khani - Chocolate handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Artisanal Bakhar Khani - Chocolate handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "Wheat flour, dark cocoa, chocolate chips, ghee, cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/bakhar-khani-chocolate.jpg",
      "tags": [
        "bakhar khani",
        "chocolate",
        "sweet"
      ]
    },
    {
      "id": "paneer-artisan-pizza",
      "name": "Pizza - Paneer",
      "brand": "doughremi",
      "cats": [
        "pizza"
      ],
      "price": 260,
      "mrp": 300,
      "rating": 4.9,
      "reviews": 104,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "pizza",
      "diet": [
        "eggless"
      ],
      "desc": "Thin-crust artisan pizza topped with spiced marinated malai paneer tikka, crunchy peppers, and melted cheese.",
      "long": "Slow-fermented artisan crust baked with French T45 flour, topped with tandoori-marinated malai paneer cubes, roasted bell peppers, red onions, and melted mozzarella over spiced herb marinara. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, malai paneer, mozzarella, capsicum, red onion, tandoori spices, olive oil, tomato sauce.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/paneer-artisan-pizza.jpg",
      "tags": [
        "pizza",
        "paneer pizza",
        "tandoori"
      ]
    },
    {
      "id": "garden-fresh-veg-pizza",
      "name": "Pizza - Veg",
      "brand": "doughremi",
      "cats": [
        "pizza"
      ],
      "price": 240,
      "mrp": 280,
      "rating": 4.8,
      "reviews": 88,
      "sizes": "pizza",
      "diet": [
        "eggless"
      ],
      "desc": "Crisp artisan pizza loaded with crunchy bell peppers, sweet corn, red onions, mushrooms, and melted mozzarella.",
      "long": "Hand-stretched thin-crust pizza baked with French T45 flour: loaded with farm-fresh capsicum, sweet golden corn, red onions, button mushrooms, and creamy mozzarella over herb tomato sauce. Fresh, wholesome, and delicious.",
      "ingredients": "French T45 pastry flour, mozzarella, tomato marinara, capsicum, sweet corn, button mushrooms, red onions, olive oil, oregano.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/garden-fresh-veg-pizza.jpg",
      "tags": [
        "pizza",
        "veg pizza",
        "mozzarella"
      ]
    },
    {
      "id": "classic-margherita-pizza",
      "name": "Pizza - Cheese",
      "brand": "doughremi",
      "cats": [
        "pizza"
      ],
      "price": 220,
      "mrp": 260,
      "rating": 4.8,
      "reviews": 73,
      "badges": [
        "CLASSIC"
      ],
      "sizes": "pizza",
      "diet": [
        "eggless"
      ],
      "desc": "Artisan thin-crust pizza topped with slow-simmered San Marzano tomato sauce, fresh mozzarella, and dried basil.",
      "long": "Slow-fermented thin-crust artisan pizza baked with French T45 flour: topped with aromatic garlic herb tomato sauce, melted mozzarella, and fragrant dried basil. Baked to a blistered crust with zero chemical dough conditioners. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, whole wheat flour, mozzarella cheese, San Marzano tomato sauce, extra virgin olive oil, basil, yeast.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/classic-margherita-pizza.jpg",
      "tags": [
        "pizza",
        "margherita",
        "cheese pizza"
      ]
    },
    {
      "id": "flaky-veg-patties",
      "name": "Veg Patties",
      "brand": "doughremi",
      "cats": [
        "patties-rolls",
        "savouries"
      ],
      "price": 45,
      "mrp": 55,
      "rating": 4.8,
      "reviews": 130,
      "badges": [
        "POPULAR"
      ],
      "sizes": "patties",
      "diet": [
        "eggless"
      ],
      "desc": "Traditional Indian bakery puff pastry loaded with spiced green peas, diced potatoes, and fresh coriander.",
      "long": "A timeless teatime classic: ultra-flaky, multi-layered puff pastry baked to golden perfection with French T45 flour and pure butter, filled with aromatic spiced potatoes, sweet green peas, and fresh herbs. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, potatoes, green peas, butter, cumin, garam masala, fresh coriander, sea salt.",
      "allergens": [
        "Wheat"
      ],
      "image": "assets/img/products/flaky-veg-patties.jpg",
      "tags": [
        "patties",
        "veg patties",
        "puff pastry"
      ]
    },
    {
      "id": "flaky-paneer-patties",
      "name": "Paneer Patties",
      "brand": "doughremi",
      "cats": [
        "patties-rolls",
        "savouries"
      ],
      "price": 60,
      "mrp": 70,
      "rating": 4.9,
      "reviews": 146,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "patties",
      "diet": [
        "eggless"
      ],
      "desc": "Crisp multi-layered golden puff pastry packed with tandoori-spiced malai paneer cubes and sweet peppers.",
      "long": "Featherlight, flaky puff pastry shell encasing a flavorful filling of crumbled malai paneer, roasted cumin, ginger, and aromatic spices. Golden, crispy, and baked fresh every morning with French T45 flour. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, malai paneer, butter, ginger, green chilies, roasted cumin, fresh herbs, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/flaky-paneer-patties.jpg",
      "tags": [
        "patties",
        "paneer patties",
        "puff"
      ]
    },
    {
      "id": "spiced-paneer-roll",
      "name": "Paneer Roll",
      "brand": "doughremi",
      "cats": [
        "patties-rolls",
        "savouries"
      ],
      "price": 70,
      "mrp": 80,
      "rating": 4.8,
      "reviews": 88,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Crispy golden bakery pastry roll wrapped around a savory core of spiced crumbled malai paneer and roasted bell peppers.",
      "long": "Handcrafted bakery puff roll: flaky multi-layered pastry baked with French T45 flour and pure butter, wrapped around a rich filling of spiced malai paneer, sautéed red onions, and sweet bell peppers. Baked fresh daily with zero artificial colors. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, fresh malai paneer, butter, red bell peppers, onions, aromatic Indian spices, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/spiced-paneer-roll.jpg",
      "tags": [
        "paneer roll",
        "roll",
        "bakery roll"
      ]
    },
    {
      "id": "caramelized-onion-roll",
      "name": "Onion Roll",
      "brand": "doughremi",
      "cats": [
        "patties-rolls",
        "savouries"
      ],
      "price": 60,
      "mrp": 70,
      "rating": 4.7,
      "reviews": 54,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Flaky golden bakery roll stuffed with slow-caramelized sweet onions, herbs, and mild melted cheese.",
      "long": "Delicate puff pastry rolled around slow-simmered caramelized brown onions, fragrant thyme, and mild melting cheese. Crispy, golden, and deeply comforting warm out of the bakery oven. Baked fresh with French T45 flour. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, sweet onions, butter, white cheddar, thyme, cracked black pepper, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/caramelized-onion-roll.jpg",
      "tags": [
        "onion roll",
        "roll",
        "savoury"
      ]
    },
    {
      "id": "sweet-coconut-pop",
      "name": "Sweet Coconut Pop",
      "brand": "doughremi",
      "cats": [
        "patties-rolls",
        "desserts"
      ],
      "price": 50,
      "mrp": 60,
      "rating": 4.8,
      "reviews": 67,
      "sizes": "pack2",
      "diet": [
        "eggless"
      ],
      "desc": "Crisp golden puff pastry turnover filled with sweet desiccated coconut, green cardamom, and golden raisins.",
      "long": "A nostalgic bakery sweet: flaky golden puff pastry baked with French T45 flour, stuffed with sweet toasted coconut, fragrant green cardamom, and plump golden sultanas. Gently glazed for a delicate crunch. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, desiccated coconut, butter, green cardamom, golden raisins, raw cane sugar, milk.",
      "allergens": [
        "Wheat"
      ],
      "image": "assets/img/products/sweet-coconut-pop.jpg",
      "tags": [
        "coconut pop",
        "sweet pop",
        "coconut"
      ]
    },
    {
      "id": "round-pop-sweet",
      "name": "Round Pop Sweet",
      "brand": "doughremi",
      "cats": [
        "patties-rolls",
        "desserts"
      ],
      "price": 50,
      "mrp": 60,
      "rating": 4.7,
      "reviews": 48,
      "sizes": "pack2",
      "diet": [
        "eggless"
      ],
      "desc": "Delicate spherical puff pastry bun filled with sweetened cardamom mawa, toasted coconut, and almonds.",
      "long": "Crispy layered puff pastry sphere filled with rich sweetened khoya mawa, toasted coconut shreds, and slivered almonds. Baked golden and fragrant with green cardamom. Baked fresh with French T45 flour. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, khoya (mawa), desiccated coconut, almond slivers, green cardamom, butter, raw cane sugar.",
      "allergens": [
        "Wheat"
      ],
      "image": "assets/img/products/round-pop-sweet.jpg",
      "tags": [
        "round pop",
        "sweet puff",
        "pastry pop"
      ]
    },
    {
      "id": "belgian-chocolate-pastry",
      "name": "Pastry - Chocolate",
      "brand": "doughremi",
      "cats": [
        "pastries"
      ],
      "price": 110,
      "mrp": 130,
      "rating": 4.9,
      "reviews": 154,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Rich chocolate sponge layered with smooth 55% couverture chocolate mousse and dark ganache.",
      "long": "Our top-selling single-portion indulgence. Dark cocoa sponge soaked in cocoa syrup and stacked with velvety Belgian chocolate mousse. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "Dark chocolate 55%, dairy cream, cocoa powder, French T45 pastry flour, cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/chocolate-caramel-noir-mini-cake.jpg",
      "tags": [
        "pastry",
        "chocolate pastry",
        "belgian chocolate"
      ]
    },
    {
      "id": "classic-black-forest-pastry",
      "name": "Pastry - Black Forest",
      "brand": "doughremi",
      "cats": [
        "pastries"
      ],
      "price": 120,
      "mrp": 140,
      "rating": 4.8,
      "reviews": 112,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Chocolate sponge layered with Madagascar whipped cream, tart cherry compote and chocolate shavings.",
      "long": "The timeless German classic. Light chocolate sponge, layers of vanilla cream, sour cherry reduction and dark chocolate curls. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, cream, cherries, chocolate curls, cocoa, sugar.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/black-forest-cake.jpg",
      "tags": [
        "pastry",
        "black forest",
        "cherry"
      ]
    },
    {
      "id": "nutella-hazelnut-pastry",
      "name": "Pastry - Nutella",
      "brand": "doughremi",
      "cats": [
        "pastries"
      ],
      "price": 140,
      "mrp": 160,
      "rating": 4.9,
      "reviews": 138,
      "badges": [
        "POPULAR"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Velvety Nutella hazelnut mousse sandwiched between dark cocoa sponge and roasted hazelnut praline.",
      "long": "Irresistible Italian hazelnut cocoa spread blended with fresh whipped cream and layered with chocolate sponge and roasted hazelnut crunch. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, Nutella spread, hazelnuts, cocoa sponge, dairy cream, dark chocolate.",
      "allergens": [
        "Milk",
        "Wheat",
        "Tree nuts (hazelnut)",
        "Soy"
      ],
      "image": "assets/img/products/nutella-hazelnut-cake.jpg",
      "tags": [
        "pastry",
        "nutella",
        "hazelnut"
      ]
    },
    {
      "id": "marble-sponge-pastry",
      "name": "Pastry - Marble Pastry",
      "brand": "doughremi",
      "cats": [
        "pastries"
      ],
      "price": 115,
      "mrp": 130,
      "rating": 4.7,
      "reviews": 58,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Artisanal Pastry - Marble Pastry handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives.",
      "long": "Swirled ribbons of dark chocolate and golden vanilla sponge layered with two-tone cream and chocolate marble disc on top. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, cocoa, vanilla, dairy cream, butter, sugar.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/marble-opulence-mini-cake.jpg",
      "tags": [
        "pastry",
        "marble",
        "swirl"
      ]
    },
    {
      "id": "cookies-cream-oreo-pastry",
      "name": "Pastry - Oreo Pastry",
      "brand": "doughremi",
      "cats": [
        "pastries"
      ],
      "price": 125,
      "mrp": 145,
      "rating": 4.8,
      "reviews": 94,
      "badges": [
        "KIDS FAVOURITE"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Crushed Oreo cookie buttercream layered with dark cocoa sponge, topped with a whole mini Oreo.",
      "long": "Crushed Oreo cookie buttercream layered with dark cocoa sponge, topped with a whole mini Oreo. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, Oreo biscuits, dark cocoa sponge, dairy cream, white chocolate.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/oreo-cake.jpg",
      "tags": [
        "pastry",
        "oreo",
        "cookies and cream"
      ]
    },
    {
      "id": "butterscotch-crunch-pastry",
      "name": "Pastry - Butterscotch",
      "brand": "doughremi",
      "cats": [
        "pastries"
      ],
      "price": 110,
      "mrp": 130,
      "rating": 4.8,
      "reviews": 82,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Fluffy vanilla sponge layered with butterscotch cream and generous golden praline crunch.",
      "long": "Fluffy vanilla sponge layered with butterscotch cream and generous golden praline crunch. Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, cream, butterscotch praline, cashews, brown sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Tree nuts (cashew)"
      ],
      "image": "assets/img/products/butterscotch-cake.jpg",
      "tags": [
        "pastry",
        "butterscotch",
        "crunch"
      ]
    },
    {
      "id": "red-velvet-pastry",
      "name": "Pastry - Red Velvet",
      "brand": "doughremi",
      "cats": [
        "pastries"
      ],
      "price": 135,
      "mrp": 155,
      "rating": 4.9,
      "reviews": 148,
      "badges": [
        "SIGNATURE"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Crimson cocoa sponge layered with tangy Philadelphia cream cheese frosting and velvet crumb dust.",
      "long": "Velvety crimson cocoa sponge with buttermilk tang, layered with genuine cream cheese frosting and dusted with red velvet crumbs. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, cream cheese, dairy cream, cocoa, buttermilk, vanilla.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/red-velvet-cake.jpg",
      "tags": [
        "pastry",
        "red velvet",
        "cream cheese"
      ]
    },
    {
      "id": "lotus-biscoff-pastry",
      "name": "Pastry - Biscoff Pastry",
      "brand": "signature",
      "cats": [
        "pastries"
      ],
      "price": 160,
      "mrp": 180,
      "rating": 4.9,
      "reviews": 166,
      "badges": [
        "SIGNATURE",
        "POPULAR"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Caramelised speculoos cookie butter mousse layered with spiced sponge and crunchy Biscoff biscuit crust.",
      "long": "Luxury pâtisserie slice. Made with original Belgian Lotus Biscoff spread, speculoos crumb base and whipped cinnamon cookie butter cream. Baked fresh with French T45 pastry flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, Lotus Biscoff spread, Biscoff biscuits, cream cheese, dairy cream, cinnamon sponge.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/biscoff-cake.jpg",
      "tags": [
        "pastry",
        "biscoff",
        "speculoos",
        "lotus"
      ]
    },
    {
      "id": "artisan-brown-bread",
      "name": "Brown Bread",
      "brand": "doughremi",
      "cats": [
        "breads"
      ],
      "price": 65,
      "mrp": 75,
      "rating": 4.8,
      "reviews": 89,
      "sizes": "loaf",
      "diet": [
        "eggless"
      ],
      "desc": "Slow-fermented 100% whole wheat loaf with malted grains and honeyed warmth. No artificial preservatives.",
      "long": "Slow-fermented whole wheat bread crafted with stone-ground grains, malted barley, and a touch of French T45 flour for structural elegance. Baked daily with zero artificial improvers or preservatives. 100% Vegan.",
      "ingredients": "100% whole wheat flour, French T45 flour, malted barley, olive oil, yeast, sea salt, water.",
      "allergens": [
        "Wheat"
      ],
      "image": "assets/img/products/multi-grain-loaf.png",
      "tags": [
        "bread",
        "brown bread",
        "whole wheat"
      ]
    },
    {
      "id": "golden-butter-bread",
      "name": "Butter Bread",
      "brand": "doughremi",
      "cats": [
        "breads"
      ],
      "price": 75,
      "mrp": 85,
      "rating": 4.8,
      "reviews": 74,
      "sizes": "loaf",
      "diet": [
        "eggless"
      ],
      "desc": "Enriched Japanese shokupan-style pullman loaf made with pure dairy butter for a cloud-like texture.",
      "long": "An exceptionally soft, featherlight milk-and-butter loaf inspired by Japanese shokupan baking methods: made with French T45 flour and slow-churned butter. Melts in the mouth and toasts to a golden glow. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, pure dairy butter, whole milk, yeast, raw cane sugar, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/almond-loaf.png",
      "tags": [
        "bread",
        "butter bread",
        "shokupan"
      ]
    },
    {
      "id": "soft-milk-bread",
      "name": "Milk Bread",
      "brand": "doughremi",
      "cats": [
        "breads"
      ],
      "price": 60,
      "mrp": 70,
      "rating": 4.7,
      "reviews": 95,
      "sizes": "loaf",
      "diet": [
        "eggless"
      ],
      "desc": "Classic bakery white loaf prepared with fresh dairy milk for natural tenderness and gentle sweetness.",
      "long": "Everyday bakery excellence: soft, fluffy pullman sandwich loaf prepared with whole milk, French T45 flour, and pure butter. Naturally tender with an even crumb. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, fresh dairy milk, butter, yeast, raw cane sugar, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/almond-loaf.png",
      "tags": [
        "bread",
        "milk bread",
        "soft loaf"
      ]
    },
    {
      "id": "classic-white-bread",
      "name": "White Bread",
      "brand": "doughremi",
      "cats": [
        "breads"
      ],
      "price": 50,
      "mrp": 60,
      "rating": 4.6,
      "reviews": 62,
      "sizes": "loaf",
      "diet": [
        "eggless"
      ],
      "desc": "Everyday sandwich loaf with a thin golden crust and even crumb, baked fresh each dawn.",
      "long": "The ideal everyday sandwich loaf: baked fresh each morning with French T45 flour and a touch of cold-pressed oil for a golden crust and soft, sliceable interior. Free from chemical softeners. 100% Vegan.",
      "ingredients": "French T45 pastry flour, filtered water, cold-pressed sunflower oil, yeast, pinch of sugar, sea salt.",
      "allergens": [
        "Wheat"
      ],
      "image": "assets/img/products/ragi-loaf.png",
      "tags": [
        "bread",
        "white bread",
        "sandwich loaf"
      ]
    },
    {
      "id": "hearty-multigrain-bread",
      "name": "Multigrain Bread",
      "brand": "doughremi",
      "cats": [
        "breads"
      ],
      "price": 85,
      "mrp": 95,
      "rating": 4.9,
      "reviews": 108,
      "badges": [
        "HEALTHY"
      ],
      "sizes": "loaf",
      "diet": [
        "eggless"
      ],
      "desc": "Nutrient-dense loaf packed with oats, barley, millet, whole wheat, and cracked rye.",
      "long": "A robust, wholesome artisan bread: slow-fermented with whole wheat, rolled oats, pearl barley, and finger millet with French T45 flour. Nutty, satisfying, and high in natural dietary fiber. 100% Vegan.",
      "ingredients": "Whole wheat flour, French T45 flour, rolled oats, pearl barley, ragi, olive oil, yeast, sea salt.",
      "allergens": [
        "Wheat",
        "Oats"
      ],
      "image": "assets/img/products/multi-grain-loaf.png",
      "tags": [
        "bread",
        "multigrain",
        "healthy bread"
      ]
    },
    {
      "id": "roasted-multiseeds-bread",
      "name": "Multiseeds Bread",
      "brand": "doughremi",
      "cats": [
        "breads"
      ],
      "price": 95,
      "mrp": 110,
      "rating": 4.9,
      "reviews": 122,
      "badges": [
        "CHEF PICK"
      ],
      "sizes": "loaf",
      "diet": [
        "eggless"
      ],
      "desc": "Crusty loaf coated inside and out with toasted pumpkin seeds, sunflower seeds, flaxseeds, and white sesame.",
      "long": "An aromatic seed-crusted artisan loaf: studded throughout with toasted pumpkin, sunflower, flax, and sesame seeds. Baked with French T45 flour and whole grains for a nutritious, crunchy bite. 100% Vegan.",
      "ingredients": "French T45 pastry flour, whole wheat flour, roasted pumpkin seeds, sunflower seeds, flaxseeds, sesame, olive oil, yeast, sea salt.",
      "allergens": [
        "Wheat",
        "Sesame"
      ],
      "image": "assets/img/products/mixed-seed-loaf.png",
      "tags": [
        "bread",
        "multiseeds",
        "seeds loaf"
      ]
    },
    {
      "id": "peri-peri-veg-hotdog",
      "name": "Hot Dog - Peri Peri - Veg",
      "brand": "doughremi",
      "cats": [
        "hot-dogs"
      ],
      "price": 130,
      "mrp": 150,
      "rating": 4.7,
      "reviews": 64,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Soft bakery brioche hotdog roll filled with a spicy peri-peri vegetable sausage, crisp slaw, and herb mayo.",
      "long": "Freshly baked golden brioche hot dog bun made with French T45 flour: loaded with a spiced vegetable sausage, zesty peri-peri glaze, crunchy pickled cabbage, and creamy herb mayonnaise. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, butter, vegetable sausage, peri-peri spice blend, cabbage, cucumber, mayonnaise, milk.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/peri-peri-veg-hotdog.jpg",
      "tags": [
        "hot dog",
        "peri peri",
        "veg hot dog"
      ]
    },
    {
      "id": "peri-peri-paneer-hotdog",
      "name": "Hot Dog - Peri Peri - Paneer",
      "brand": "doughremi",
      "cats": [
        "hot-dogs"
      ],
      "price": 155,
      "mrp": 175,
      "rating": 4.9,
      "reviews": 89,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Toasted brioche hotdog roll stuffed with grilled peri-peri malai paneer fingers, fresh greens, and spicy mayo.",
      "long": "Artisan brioche roll baked with French T45 flour and pure butter: stuffed with tender fingers of malai paneer tossed in fiery African peri-peri spices, topped with crisp lettuce, pickled onions, and garlic aioli. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, malai paneer, butter, peri-peri spices, lettuce, onions, garlic mayonnaise, milk.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/peri-peri-paneer-hotdog.jpg",
      "tags": [
        "hot dog",
        "peri peri paneer",
        "paneer hotdog"
      ]
    },
    {
      "id": "flaky-aloo-paratha",
      "name": "Savouries - Aloo Paratha",
      "brand": "doughremi",
      "cats": [
        "savouries"
      ],
      "price": 70,
      "mrp": 85,
      "rating": 4.8,
      "reviews": 78,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Flaky multi-layered bakery paratha stuffed with spiced mashed potatoes, fresh green chilies, and roasted cumin.",
      "long": "Traditional North Indian comfort with bakery lamination: crisp, flaky flatbread prepared with whole wheat and French T45 flour, stuffed with spiced potato mash, roasted cumin, and fresh herbs. Baked golden on the griddle with pure butter. 100% Vegetarian.",
      "ingredients": "Whole wheat flour, French T45 flour, potatoes, butter, green chilies, cumin, coriander, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/flaky-aloo-paratha.jpg",
      "tags": [
        "paratha",
        "aloo paratha",
        "savoury"
      ]
    },
    {
      "id": "golden-baked-samosa",
      "name": "Savouries - Baked Samosa",
      "brand": "doughremi",
      "cats": [
        "savouries"
      ],
      "price": 40,
      "mrp": 50,
      "rating": 4.8,
      "reviews": 142,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "patties",
      "diet": [
        "eggless"
      ],
      "desc": "Golden-baked flaky pastry cone stuffed with aromatic spiced potatoes, green peas, and toasted cashews.",
      "long": "A lighter, guilt-free bakery version of India's favourite snack: baked to crisp golden perfection with French T45 flour instead of deep-frying. Stuffed with diced spiced potatoes, sweet peas, and toasted cashews. 100% Vegetarian.",
      "ingredients": "French T45 pastry flour, potatoes, green peas, cashews, ajwain seeds, butter, Indian spices, sea salt.",
      "allergens": [
        "Wheat",
        "Tree nuts (cashew)"
      ],
      "image": "assets/img/products/golden-baked-samosa.jpg",
      "tags": [
        "samosa",
        "baked samosa",
        "snack"
      ]
    },
    {
      "id": "traditional-lattice-apple-pie",
      "name": "Apple Pie",
      "brand": "doughremi",
      "cats": [
        "desserts"
      ],
      "price": 380,
      "mrp": 440,
      "rating": 4.9,
      "reviews": 97,
      "badges": [
        "SIGNATURE"
      ],
      "sizes": "pie",
      "diet": [
        "eggless"
      ],
      "desc": "Classic buttery shortcrust pie filled with slow-cooked spiced Granny Smith apples and a woven lattice top.",
      "long": "A timeless patisserie centerpiece: buttery French T45 shortcrust pastry filled with tender Granny Smith apples simmered in Ceylon cinnamon, brown sugar, and nutmeg, finished with an artisan woven lattice crust. Baked fresh daily. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Granny Smith apples, pure dairy butter, Ceylon cinnamon, nutmeg, raw cane sugar, lemon juice.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/traditional-lattice-apple-pie.jpg",
      "tags": [
        "apple pie",
        "pie",
        "cinnamon apple",
        "dessert"
      ]
    },
    {
      "id": "french-macaron-box-veg",
      "name": "Macaron - Veg",
      "brand": "signature",
      "cats": [
        "macarons"
      ],
      "price": 450,
      "mrp": 520,
      "rating": 4.8,
      "reviews": 79,
      "badges": [
        "EGGLESS",
        "SIGNATURE"
      ],
      "sizes": "box",
      "diet": [
        "eggless"
      ],
      "desc": "Six delicate French almond macarons filled with chocolate ganache, pistachio cream, and fruit compotes.",
      "long": "Authentic French confectionery crafted 100% eggless: featherlight almond flour shells with delicate ruffled feet, filled with decadent Belgian chocolate ganache, pure pistachio cream, and wild raspberry coulis. Box of 6 macarons. 100% Vegetarian.",
      "ingredients": "Finely ground almond flour, aquafaba, dark chocolate 70%, pistachio paste, raspberry reduction, natural sweetener.",
      "allergens": [
        "Milk",
        "Tree nuts (almond, pistachio)"
      ],
      "image": "assets/img/products/french-macaron-box-veg.jpg",
      "tags": [
        "macaron",
        "eggless macaron",
        "french patisserie"
      ]
    },
    {
      "id": "classic-french-macaron-egg",
      "name": "Macaron - Egg",
      "brand": "signature",
      "cats": [
        "macarons"
      ],
      "price": 480,
      "mrp": 550,
      "rating": 4.9,
      "reviews": 115,
      "badges": [
        "LUXURY",
        "PARISIAN"
      ],
      "sizes": "box",
      "diet": [],
      "desc": "Authentic Parisian macarons with crisp meringue shells and luxurious ganache centers in assorted flavours.",
      "long": "Handcrafted to Parisian pâtisserie standards: smooth, crisp meringue shells made with finely ground California almond flour, filled with single-origin chocolate ganache, Madagascar vanilla buttercream, and salted caramel. Box of 6 macarons.",
      "ingredients": "Almond flour, egg whites, single-origin chocolate, dairy cream, butter, Madagascar vanilla, natural fruit purees.",
      "allergens": [
        "Milk",
        "Eggs",
        "Tree nuts (almond)"
      ],
      "image": "assets/img/products/classic-french-macaron-egg.jpg",
      "tags": [
        "macaron",
        "parisian macaron",
        "french macaron"
      ]
    },
    {
      "id": "fudge-chocolate-brownie",
      "name": "Brownie - Chocolate",
      "brand": "doughremi",
      "cats": [
        "brownies"
      ],
      "price": 120,
      "mrp": 140,
      "rating": 4.9,
      "reviews": 168,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Dense, fudgy dark chocolate brownie with a shiny crinkly top crust, baked with 70% Callebaut chocolate.",
      "long": "Intensely fudgy center with a paper-thin crackly crust: baked with pure Callebaut 70% dark Belgian couverture chocolate, French T45 flour, and a pinch of Maldon sea salt. Decadent, rich, and 100% Eggless.",
      "ingredients": "French T45 pastry flour, Callebaut 70% dark chocolate, pure butter, Dutch cocoa, raw cane sugar, sea salt.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/fudgy-walnut-brownies.jpg",
      "tags": [
        "brownie",
        "fudge brownie",
        "chocolate brownie"
      ]
    },
    {
      "id": "classic-plain-brownie",
      "name": "Brownie - Plain",
      "brand": "doughremi",
      "cats": [
        "brownies"
      ],
      "price": 100,
      "mrp": 120,
      "rating": 4.7,
      "reviews": 62,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Chewy, rich cocoa brownie with a light flake crust and tender, melt-in-mouth chocolate center.",
      "long": "A pure chocolate classic: baked with French T45 flour, Dutch cocoa, and farm butter for a chewy edge and dense, fudgy center with zero artificial flavourings. 100% Eggless.",
      "ingredients": "French T45 pastry flour, dark cocoa powder, pure butter, milk, raw cane sugar, vanilla extract, sea salt.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/choco-almond-crunch-brownies.jpg",
      "tags": [
        "brownie",
        "plain brownie",
        "chewy"
      ]
    },
    {
      "id": "crushed-oreo-brownie",
      "name": "Brownie - Oreo",
      "brand": "doughremi",
      "cats": [
        "brownies"
      ],
      "price": 135,
      "mrp": 155,
      "rating": 4.9,
      "reviews": 126,
      "badges": [
        "POPULAR"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Fudge chocolate brownie baked over a bed of whole Oreo cookies and topped with crunchy Oreo chunks.",
      "long": "Decadent dark chocolate brownie baked over a layer of whole chocolate sandwich cookies, topped with extra crunchy cookie crumbs. Fudgy, crunchy, and baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Callebaut dark chocolate, Oreo cookies, butter, cocoa powder, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/triple-chocolate-cheesecake-brownie.jpg",
      "tags": [
        "brownie",
        "oreo brownie",
        "cookies and cream"
      ]
    },
    {
      "id": "classic-golden-muffin",
      "name": "Muffin - Plain",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 70,
      "mrp": 85,
      "rating": 4.7,
      "reviews": 48,
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Tender golden breakfast muffin infused with Bourbon vanilla bean and baked with pure slow-churned butter.",
      "long": "A timeless bakery staple: fluffy, moist breakfast muffin baked to a high domed crown with French T45 flour, whole milk, and fragrant Bourbon vanilla. Baked fresh every morning. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure dairy butter, whole milk, Madagascar vanilla, raw cane sugar, baking powder.",
      "allergens": [
        "Milk",
        "Wheat"
      ],
      "image": "assets/img/products/vanilla-roasted-almond-muffins.jpg",
      "tags": [
        "muffin",
        "plain muffin",
        "breakfast muffin"
      ]
    },
    {
      "id": "double-chocolate-muffin",
      "name": "Muffin - Chocolate",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 85,
      "mrp": 100,
      "rating": 4.9,
      "reviews": 114,
      "badges": [
        "BESTSELLER"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Deep dark cocoa muffin studded with molten Belgian dark chocolate chips and a craggy top.",
      "long": "Rich and deeply indulgent: dark cocoa batter baked with French T45 flour and generous handfuls of 70% dark Belgian chocolate chips that melt when warmed. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Dutch cocoa, dark chocolate chips, dairy butter, whole milk, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/gooey-chocolate-muffins.jpg",
      "tags": [
        "muffin",
        "chocolate muffin",
        "double chocolate"
      ]
    },
    {
      "id": "choco-chips-muffin",
      "name": "Muffin - Choco Chips",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 80,
      "mrp": 95,
      "rating": 4.8,
      "reviews": 98,
      "badges": [
        "POPULAR"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Fluffy golden vanilla muffin loaded with dark chocolate chips and a delicate caramelized crust.",
      "long": "Tender golden muffin batter baked with French T45 flour and Bourbon vanilla, bursting with pockets of dark chocolate chips throughout. Perfect for school tiffins and teatime snacks. 100% Eggless.",
      "ingredients": "French T45 pastry flour, dark chocolate chips, butter, whole milk, Madagascar vanilla, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/gooey-chocolate-muffins-2.jpg",
      "tags": [
        "muffin",
        "choco chips",
        "chocolate chip muffin"
      ]
    },
    {
      "id": "oreo-crunch-muffin",
      "name": "Muffin - Oreo",
      "brand": "doughremi",
      "cats": [
        "muffins"
      ],
      "price": 95,
      "mrp": 110,
      "rating": 4.8,
      "reviews": 86,
      "badges": [
        "NEW"
      ],
      "sizes": "single",
      "diet": [
        "eggless"
      ],
      "desc": "Airy vanilla and cocoa muffin packed with crushed Oreo cookies and creamy vanilla cream pockets.",
      "long": "The ultimate cookies-and-cream treat: fluffy vanilla muffin batter swirled with crushed Oreo biscuits and dark cocoa, crowned with crunchy Oreo chunks. Baked fresh with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, crushed Oreo cookies, dark cocoa, butter, milk, vanilla extract, raw cane sugar.",
      "allergens": [
        "Milk",
        "Wheat",
        "Soy"
      ],
      "image": "assets/img/products/gooey-chocolate-muffins-3.jpg",
      "tags": [
        "muffin",
        "oreo muffin",
        "cookies and cream"
      ]
    },
    {
      "id": "butter-sesame-mix",
      "name": "Butter Sesame Mix",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "healthy-snacks",
        "assamese"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 112,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Melt-in-mouth golden butter cookies coated with toasted white and black sesame seeds.",
      "long": "Rich bakery shortbread cookies baked with slow-churned butter and rolled in fragrant toasted sesame seeds: crisp on the edges with a tender, buttery melt-in-the-mouth center. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, dairy butter, toasted white & black sesame seeds, milk, natural cane sugar, vanilla.",
      "allergens": [
        "Milk / Dairy",
        "Sesame",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/butter-sesame-mix.jpg",
      "images": [
        "assets/img/products/butter-sesame-mix.jpg"
      ],
      "tags": [
        "cookies",
        "sesame",
        "butter",
        "eggless",
        "healthy-snack"
      ]
    },
    {
      "id": "butterscotch-cookies",
      "name": "Butterscotch Cookies",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "healthy-snacks"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 88,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "birthday",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Golden butter cookies studded with crunchy caramelized butterscotch chips and roasted cashew praline.",
      "long": "Crispy golden cookies packed with rich butterscotch bits and toasted cashew praline: infused with brown butter and natural Bourbon vanilla. Baked fresh with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butter, handcrafted butterscotch chips, roasted cashews, milk, Madagascar vanilla.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/butterscotch-cookies.jpg",
      "images": [
        "assets/img/products/butterscotch-cookies.jpg"
      ],
      "tags": [
        "cookies",
        "butterscotch",
        "crunch",
        "eggless",
        "snack"
      ]
    },
    {
      "id": "choco-mix-cookies",
      "name": "Choco Mix Cookies",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "chocolates"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 5,
      "reviews": 146,
      "badges": [
        "NEW",
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Crunchy dark cocoa cookies studded with a decadent mix of dark, milk, and white chocolate chips.",
      "long": "A triple-chocolate celebration: rich Dutch cocoa cookie dough baked with French T45 flour, generously loaded with dark, milk, and white chocolate chips for a rich, textured bite. 100% Eggless.",
      "ingredients": "French T45 pastry flour, dark chocolate chips, milk chocolate chips, white chocolate chips, cocoa powder, butter, milk.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/choco-mix-cookies.jpg",
      "images": [
        "assets/img/products/choco-mix-cookies.jpg"
      ],
      "tags": [
        "cookies",
        "chocolate",
        "marble",
        "eggless",
        "bestseller"
      ]
    },
    {
      "id": "chocochips-pastry",
      "name": "Chocochips Pastry",
      "brand": "signature",
      "cats": [
        "pastries",
        "desserts"
      ],
      "price": 80,
      "mrp": 95,
      "rating": 4.9,
      "reviews": 194,
      "badges": [
        "NEW",
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "piece",
      "occasions": [
        "birthday",
        "celebration",
        "teatime"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Decadent dark chocolate sponge layered with velvety Belgian chocolate mousse and loaded with crisp chocolate chips.",
      "long": "A signature patisserie slice featuring airy cocoa sponge crafted with French T45 flour, single-origin cacao, and almond flour, coated in dark chocolate ganache and studded with crunchy chocolate chips. 100% Eggless and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin cacao 70%, dark chocolate chips, dairy cream, natural erythritol & stevia blend.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/chocochips-pastry.jpg",
      "images": [
        "assets/img/products/chocochips-pastry.jpg"
      ],
      "tags": [
        "pastry",
        "chocochips",
        "chocolate",
        "eggless",
        "signature"
      ]
    },
    {
      "id": "chocolate-choco-mix",
      "name": "Chocolate Choco Mix",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "chocolates"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 5,
      "reviews": 132,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Intense double chocolate artisan cookies loaded with dark cocoa and chunky chocolate drops.",
      "long": "For serious chocolate lovers: deep cocoa cookies baked to a crisp edge and chewy center, packed with dark chocolate drops and pure cocoa butter. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, dark cocoa, chocolate drops, pure butter, milk, natural cane sugar, vanilla.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/chocolate-choco-mix.jpg",
      "images": [
        "assets/img/products/chocolate-choco-mix.jpg"
      ],
      "tags": [
        "cookies",
        "double-chocolate",
        "cocoa",
        "eggless"
      ]
    },
    {
      "id": "artisan-chocolate-cookies",
      "name": "Chocolate Cookies",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "chocolates"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.8,
      "reviews": 76,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "snack"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Classic crispy chocolate biscuits baked with pure Dutch cocoa, grass-fed butter, and chocolate chips.",
      "long": "Timeless bakery-style chocolate cookies with an irresistible snap: crafted with rich Dutch cocoa, pure dairy butter, and dark chocolate chips. Perfect alongside morning espresso or milk. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, Dutch cocoa, butter, dark chocolate chips, milk, raw cane sugar, sea salt.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/artisan-chocolate-cookies.jpg",
      "images": [
        "assets/img/products/artisan-chocolate-cookies.jpg"
      ],
      "tags": [
        "cookies",
        "chocolate",
        "classic",
        "eggless"
      ]
    },
    {
      "id": "coconut-butter-mix",
      "name": "Coconut Butter Mix",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "healthy-snacks"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 98,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Golden butter cookies enriched with toasted desiccated coconut and aromatic vanilla bean.",
      "long": "Delicate, crumbly butter cookies loaded with aromatic toasted coconut shreds: delivers a tropical warmth and golden crunch in every bite. Baked fresh with French T45 flour and slow-churned butter. 100% Eggless.",
      "ingredients": "French T45 pastry flour, toasted desiccated coconut, pure dairy butter, milk, Madagascar vanilla, raw cane sugar.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/coconut-butter-mix.jpg",
      "images": [
        "assets/img/products/coconut-butter-mix.jpg"
      ],
      "tags": [
        "cookies",
        "coconut",
        "butter",
        "eggless",
        "healthy-snack"
      ]
    },
    {
      "id": "artisan-coconut-cookies",
      "name": "Coconut Cookies",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "healthy-snacks"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 115,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "festival"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Crispy traditional bakery coconut biscuits with a golden caramelized crust and rich coconut aroma.",
      "long": "A classic Indian bakery favourite: crisp golden biscuits packed with grated coconut, pure butter, and a touch of cardamom. Incomparably crunchy and fragrant. Baked fresh with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, desiccated coconut, dairy butter, milk, green cardamom, raw cane sugar.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/artisan-coconut-cookies.jpg",
      "images": [
        "assets/img/products/artisan-coconut-cookies.jpg"
      ],
      "tags": [
        "cookies",
        "coconut",
        "traditional",
        "eggless"
      ]
    },
    {
      "id": "coconut-laccha",
      "name": "Coconut Laccha",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "healthy-snacks",
        "assamese"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 5,
      "reviews": 128,
      "badges": [
        "NEW",
        "SIGNATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "festival",
        "corporate"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Crisp ribbon-cut coconut pastry biscuits caramelized to a golden brown with aromatic spices.",
      "long": "Traditional bakery laccha biscuits rolled with ribboned coconut shreds, butter, and fragrant cardamom: baked crisp with delicate caramelized edges and a flaky, crumbly bite. Baked with French T45 flour. 100% Eggless.",
      "ingredients": "French T45 pastry flour, shredded coconut, pure butter, milk, cardamom, raw cane sugar.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/coconut-laccha.jpg",
      "images": [
        "assets/img/products/coconut-laccha.jpg"
      ],
      "tags": [
        "cookies",
        "coconut-laccha",
        "assamese",
        "signature",
        "eggless"
      ]
    },
    {
      "id": "artisanal-glazed-donut",
      "name": "Artisanal Glazed Donut",
      "brand": "signature",
      "cats": [
        "desserts",
        "pastries"
      ],
      "price": 50,
      "mrp": 60,
      "rating": 4.9,
      "reviews": 165,
      "badges": [
        "NEW",
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "donut",
      "occasions": [
        "birthday",
        "celebration",
        "teatime",
        "snack"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Fluffy brioche donut baked to golden perfection with a glossy Madagascar vanilla bean and dark chocolate glaze.",
      "long": "Cloud-like, airy brioche donut baked with French T45 flour and grass-fed butter, finished with your choice of silky dark chocolate ganache or Bourbon vanilla bean glaze. Baked rather than fried for pure, clean indulgence. 100% Eggless.",
      "ingredients": "French T45 pastry flour, butter, whole milk, Madagascar vanilla, dark chocolate 70%, natural cane sugar, yeast.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/artisanal-glazed-donut.jpg",
      "images": [
        "assets/img/products/artisanal-glazed-donut.jpg"
      ],
      "tags": [
        "donut",
        "dessert",
        "chocolate-glaze",
        "baked",
        "eggless"
      ]
    },
    {
      "id": "glass-cake",
      "name": "Glass Cake",
      "brand": "signature",
      "cats": [
        "desserts",
        "pastries",
        "celebration-cakes"
      ],
      "price": 100,
      "mrp": 120,
      "rating": 5,
      "reviews": 210,
      "badges": [
        "NEW",
        "SIGNATURE",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "glass",
      "occasions": [
        "birthday",
        "celebration",
        "corporate",
        "gifting"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Stunning individual dessert cup featuring layers of French T45 vanilla sponge, fresh fruit coulis, and whipped cream.",
      "long": "An elegant modern dessert presentation: layers of delicate vanilla sponge baked with French T45 flour, alternating with tart wild berry compote, Belgian chocolate mousse, and clouds of whipped chantilly cream in an artisanal dessert glass. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, dairy cream, wild berries, dark chocolate, Madagascar vanilla, natural sweetener.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (hazelnut, almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/glass-cake.jpg",
      "images": [
        "assets/img/products/glass-cake.jpg"
      ],
      "tags": [
        "glass-cake",
        "jar-cake",
        "dessert",
        "chocolate",
        "signature"
      ]
    },
    {
      "id": "jeera-biscuits",
      "name": "Jeera Biscuits",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "savouries",
        "healthy-snacks"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 142,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "snack"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Crisp, melt-in-mouth savoury butter cookies studded with toasted whole cumin seeds and flaky sea salt.",
      "long": "A quintessential Indian teatime biscuit: golden-baked with French T45 flour and pure slow-churned dairy butter, generously studded with fragrant roasted cumin seeds and a hint of rock salt. Delivers a delicate savoury crunch with hot tea. 100% Eggless.",
      "ingredients": "French T45 pastry flour, pure dairy butter, roasted cumin seeds (jeera), rock salt, milk, touch of raw cane sugar.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/jeera-biscuits.jpg",
      "images": [
        "assets/img/products/jeera-biscuits.jpg"
      ],
      "tags": [
        "biscuits",
        "jeera",
        "cumin",
        "savory",
        "eggless",
        "chai"
      ]
    },
    {
      "id": "peanut-cookies",
      "name": "Peanut Cookies",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "healthy-snacks"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.8,
      "reviews": 84,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "snack"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Chunky artisan cookies packed with slow-roasted peanuts, natural peanut butter, and stone-ground flour.",
      "long": "Wholesome, protein-packed cookies loaded with roasted golden peanut chunks and stone-ground peanut butter: delivers a deeply satisfying nutty crunch with every bite. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, roasted peanuts, natural peanut butter, butter, natural erythritol blend, sea salt.",
      "allergens": [
        "Milk / Dairy",
        "Peanuts",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/peanut-cookies.jpg",
      "images": [
        "assets/img/products/peanut-cookies.jpg"
      ],
      "tags": [
        "cookies",
        "peanut",
        "nutty",
        "protein",
        "eggless"
      ]
    },
    {
      "id": "seeds-butter-mix",
      "name": "Seeds Butter Mix",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "healthy-snacks"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 5,
      "reviews": 118,
      "badges": [
        "NEW",
        "BESTSELLER",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "healthy-snack"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Nutrient-packed artisan butter cookies loaded with roasted pumpkin, sunflower, flax, and chia seeds.",
      "long": "A powerhouse of wholesome crunch: golden butter cookies baked with French T45 flour and packed with a nutrient-rich quartet of roasted pumpkin, sunflower, golden flax, and chia seeds. Wholesome, rich in omega-3s, and 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, roasted pumpkin seeds, sunflower seeds, chia seeds, flaxseeds, butter, erythritol.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/seeds-butter-mix.jpg",
      "images": [
        "assets/img/products/seeds-butter-mix.jpg"
      ],
      "tags": [
        "cookies",
        "seeds",
        "superfood",
        "crunch",
        "eggless"
      ]
    },
    {
      "id": "stick-jeera-biscuit",
      "name": "Stick Jeera Biscuits",
      "brand": "doughremi",
      "cats": [
        "cookies",
        "savouries",
        "healthy-snacks"
      ],
      "price": 800,
      "mrp": 920,
      "rating": 4.9,
      "reviews": 105,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "perKg",
      "occasions": [
        "teatime",
        "snack"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Crispy cumin-spiced finger biscuits baked golden with French T45 flour, pure butter, and roasted cumin.",
      "long": "Slender, crunchy bakery finger biscuits infused with aromatic whole roasted cumin and pure butter: baked to a crisp golden brown, perfect for dipping into morning Assam milk tea. Zero trans fats. 100% Eggless.",
      "ingredients": "French T45 pastry flour, dairy butter, roasted cumin seeds, Himalayan pink salt, cold-pressed vegetable oil.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/stick-jeera-biscuit.jpg",
      "images": [
        "assets/img/products/stick-jeera-biscuit.jpg"
      ],
      "tags": [
        "biscuits",
        "jeera-sticks",
        "savory",
        "snack",
        "eggless"
      ]
    },
    {
      "id": "strawberry-pastry",
      "name": "Strawberry Pastry",
      "brand": "signature",
      "cats": [
        "pastries",
        "desserts"
      ],
      "price": 80,
      "mrp": 95,
      "rating": 4.9,
      "reviews": 158,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "piece",
      "occasions": [
        "birthday",
        "celebration",
        "teatime"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Light, fluffy vanilla sponge layered with luscious real strawberry compote and whipped dairy cream.",
      "long": "An elegant patisserie slice: tender vanilla sponge crafted with French T45 flour, layered with slow-simmered strawberry coulis, whipped dairy chantilly, and finished with a ruby strawberry glaze. 100% Eggless and freshly baked daily.",
      "ingredients": "French T45 pastry flour, almond flour, fresh strawberries, dairy cream, Madagascar vanilla bean, natural plant sweetener.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/strawberry-pastry.jpg",
      "images": [
        "assets/img/products/strawberry-pastry.jpg"
      ],
      "tags": [
        "pastry",
        "strawberry",
        "fresh-cream",
        "eggless",
        "signature"
      ]
    },
    {
      "id": "vanilla-pastry",
      "name": "Vanilla Pastry",
      "brand": "signature",
      "cats": [
        "pastries",
        "desserts"
      ],
      "price": 80,
      "mrp": 95,
      "rating": 4.8,
      "reviews": 126,
      "badges": [
        "NEW",
        "EGGLESS",
        "GLUTEN-FREE",
        "NO-MAIDA",
        "SUGAR-FREE"
      ],
      "sizes": "piece",
      "occasions": [
        "birthday",
        "celebration",
        "teatime"
      ],
      "diet": [
        "sugar-free",
        "gluten-free",
        "eggless",
        "no-maida"
      ],
      "desc": "Classic delicate vanilla sponge infused with pure Madagascar vanilla bean and velvety whipped cream.",
      "long": "A timeless French patisserie classic: airy vanilla bean sponge baked with French T45 flour, layered with clouds of whipped chantilly cream and delicate white chocolate shavings. Pure, refined, and 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, pure Madagascar vanilla bean, dairy cream, white chocolate curls, natural sweetener.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "customisable": false,
      "image": "assets/img/products/vanilla-pastry.jpg",
      "images": [
        "assets/img/products/vanilla-pastry.jpg"
      ],
      "tags": [
        "pastry",
        "vanilla",
        "classic",
        "eggless",
        "signature"
      ]
    }
  ];

  /* ------------------------- Product normaliser ------------------------- */
  function money(n) { return Math.round(n / 5) * 5; }

  function deriveNutrition(p) {
    if (p.cats && p.cats.indexOf("gift-cards") > -1) return null;
    if (p.nutrition) {
      var n = Object.assign({}, p.nutrition);
      n.serving = n.serving || "100g";
      n.servingDesc = n.servingDesc || "Per 100g (Approx. 1 serving / slice)";
      n.netCarbs = typeof n.netCarbs === "number" ? n.netCarbs : +(Math.max(0, (n.carbs || 0) - (n.fiber || 0))).toFixed(1);
      n.kj = n.kj || Math.round((n.calories || 0) * 4.184);
      n.addedSugar = 0;
      n.transFat = 0;
      return n;
    }

    var id = (p.id || "").toLowerCase();
    var cat = (p.cats && p.cats[0]) || "";

    var cal = 275, prot = 7.2, carbs = 22.0, fiber = 4.2, sugar = 3.5, fat = 17.5, satFat = 5.8, chol = 25, sod = 95;

    if (cat === "coffee" || id.indexOf("tea") > -1 || id.indexOf("coffee") > -1) {
      cal = 2; prot = 0.1; carbs = 0.3; fiber = 0; sugar = 0; fat = 0; satFat = 0; chol = 0; sod = 5;
    } else if (id.indexOf("almond-butter") > -1 || id.indexOf("nut-butter") > -1) {
      cal = 585; prot = 21.2; carbs = 18.5; fiber = 10.4; sugar = 4.2; fat = 50.6; satFat = 4.2; chol = 0; sod = 45;
    } else if (cat === "chocolates" || id.indexOf("fudge") > -1 || id.indexOf("bark") > -1 || id.indexOf("truffle") > -1) {
      cal = 460; prot = 7.0; carbs = 22.0; fiber = 7.2; sugar = 4.8; fat = 38.5; satFat = 18.2; chol = 18; sod = 45;
    } else if (id.indexOf("cheesecake") > -1 || id.indexOf("cheese-cream") > -1) {
      cal = 310; prot = 9.4; carbs = 14.5; fiber = 3.2; sugar = 2.8; fat = 24.8; satFat = 11.2; chol = 55; sod = 140;
    } else if (id.indexOf("nutella") > -1 || id.indexOf("hazelnut") > -1) {
      cal = 335; prot = 8.6; carbs = 21.5; fiber = 5.4; sugar = 3.9; fat = 24.2; satFat = 7.5; chol = 28; sod = 90;
    } else if (id.indexOf("chocolate") > -1 || id.indexOf("cacao") > -1 || cat === "brownies") {
      cal = 325; prot = 8.0; carbs = 20.5; fiber = 6.0; sugar = 3.4; fat = 23.5; satFat = 7.8; chol = 25; sod = 88;
    } else if (id.indexOf("honey") > -1 || id.indexOf("medovik") > -1) {
      cal = 295; prot = 6.2; carbs = 28.5; fiber = 3.4; sugar = 8.5; fat = 16.8; satFat = 6.0; chol = 30; sod = 90;
    } else if (id.indexOf("mango") > -1 || id.indexOf("strawberry") > -1 || id.indexOf("raspberry") > -1 || id.indexOf("pineapple") > -1 || id.indexOf("fruit") > -1 || id.indexOf("berry") > -1) {
      cal = 245; prot = 5.9; carbs = 24.2; fiber = 4.6; sugar = 6.2; fat = 14.2; satFat = 4.5; chol = 20; sod = 85;
    } else if (id.indexOf("caramel") > -1 || id.indexOf("butter-scotch") > -1 || id.indexOf("toffee") > -1) {
      cal = 295; prot = 6.5; carbs = 25.0; fiber = 4.0; sugar = 4.5; fat = 18.8; satFat = 6.5; chol = 32; sod = 105;
    } else if (id.indexOf("biscoff") > -1 || id.indexOf("cookie") > -1 || cat === "cookies") {
      cal = 365; prot = 7.8; carbs = 25.5; fiber = 4.8; sugar = 3.6; fat = 26.5; satFat = 8.2; chol = 22; sod = 110;
    } else if (cat === "breads" || id.indexOf("loaf") > -1 || id.indexOf("bread") > -1 || id.indexOf("sourdough") > -1) {
      cal = 225; prot = 9.8; carbs = 32.5; fiber = 6.8; sugar = 1.8; fat = 5.6; satFat = 1.2; chol = 0; sod = 195;
    } else if (cat === "savouries" || cat === "burgers" || cat === "pizza" || cat === "patties-rolls" || cat === "hot-dogs") {
      cal = 240; prot = 8.5; carbs = 26.0; fiber = 4.2; sugar = 2.2; fat = 11.5; satFat = 4.5; chol = 15; sod = 290;
    } else if (cat === "assamese") {
      cal = 270; prot = 6.0; carbs = 36.0; fiber = 4.5; sugar = 5.5; fat = 11.0; satFat = 3.5; chol = 5; sod = 120;
    }

    var netC = +(Math.max(0, carbs - fiber)).toFixed(1);

    return {
      serving: "100g",
      servingDesc: "Per 100g (Approx. 1 serving / slice)",
      calories: Math.round(cal),
      kj: Math.round(cal * 4.184),
      protein: +prot.toFixed(1),
      carbs: +carbs.toFixed(1),
      fiber: +fiber.toFixed(1),
      netCarbs: netC,
      sugar: +sugar.toFixed(1),
      addedSugar: 0,
      fat: +fat.toFixed(1),
      saturatedFat: +satFat.toFixed(1),
      transFat: 0,
      cholesterol: Math.round(chol),
      sodium: Math.round(sod)
    };
  }

  var products = rawProducts.map(function (p) {
    var d = brandDefaults[p.brand] || brandDefaults.doughremi;
    var setKey = p.sizes || "single";
    var set = sizeSets[setKey] || sizeSets.single;
    var brandRec = brands.filter(function (b) { return b.id === p.brand; })[0] || brands[0];

    var variants = set.map(function (s, i) {
      return {
        id: s.id,
        label: s.label,
        weight: s.weight,
        servings: s.servings,
        price: money(p.price * s.mult),
        mrp: p.mrp ? money(p.mrp * s.mult) : null,
        stock: i === set.length - 1 && p.brand === "signature" ? 4 : 40 - i * 6
      };
    });

    var flavours = p.customisable ? (flavourSets[p.brand] || flavourSets.doughremi) : null;

    return {
      id: p.id,
      slug: p.id,
      name: p.name,
      brand: p.brand,
      brandName: brandRec.name,
      brandFull: brandRec.full,
      brandTag: brandRec.tag,
      theme: brandRec.theme,
      url: "product.html?id=" + p.id,
      cats: p.cats || [],
      catNames: (p.cats || []).map(function (c) {
        var m = categories.filter(function (x) { return x.id === c; })[0];
        return m ? m.name : c;
      }),
      price: variants[0].price,
      mrp: variants[0].mrp,
      priceFrom: Math.min.apply(null, variants.map(function (v) { return v.price; })),
      rating: p.rating,
      reviews: p.reviews,
      badges: p.badges || [],
      sizeSet: setKey,
      variants: variants,
      flavours: flavours,
      occasions: p.occasions || [],
      diet: p.diet || [],
      desc: p.desc,
      long: p.long,
      ingredients: p.ingredients,
      nutrition: deriveNutrition(p),
      allergens: p.allergens && p.allergens.length ? p.allergens : d.allergens,
      storage: p.storage || d.storage,
      shelfLife: p.shelfLife || d.shelfLife,
      leadHours: typeof p.leadHours === "number" ? p.leadHours : d.leadHours,
      cutoff: p.cutoff || d.cutoff,
      customisable: !!p.customisable,
      art: p.art || d.art,
      image: p.image || null,
      tags: p.tags || [],
      inStock: true,
      keywords: [p.name, brandRec.name, (p.tags || []).join(" "), (p.cats || []).join(" ")].join(" ").toLowerCase()
    };
  });

  /* ------------------------------- Stores ------------------------------- */
  /* Single location: the Dibrugarh shop and the kitchen behind it are the
     same premises. Replace the address, phone and hours with the real ones. */
  var stores = [
    {
      id: "dibrugarh", name: "SAiPH Bakes — Dibrugarh", city: "Dibrugarh",
      addr: "Chowkidinghee, RKB Path, Dibrugarh, Assam 786001",
      phone: "+91 98640 00000", hours: "8:30 AM – 9:30 PM", open: true,
      services: ["Signature Counter", "Café Seating", "Cake Studio", "Khowdy Pantry", "Store Pickup", "Corporate Desk"],
      brands: ["doughremi", "signature", "khowdy"],
      maps: "https://maps.google.com/?q=Chowkidinghee+RKB+Path+Dibrugarh",
      lat: 27.4728, lng: 94.9120, flagship: true
    }
  ];

  var deliveryCities = ["Dibrugarh"];

  /* ------------------------------ Coupons ------------------------------- */
  var coupons = [
    { code: "SAIPH10", type: "percent", value: 10, min: 999, label: "10% off orders above ₹999", cap: 500 },
    { code: "FIRSTBITE", type: "percent", value: 15, min: 1499, label: "15% off your first order", cap: 750 },
    { code: "SIGNATURE500", type: "flat", value: 500, min: 3999, label: "₹500 off Signature orders above ₹3,999" },
    { code: "KHOWDY20", type: "percent", value: 20, min: 799, label: "20% off Khowdy pantry", brand: "khowdy", cap: 400 },
    { code: "FREESHIP", type: "shipping", value: 0, min: 499, label: "Free delivery above ₹499" }
  ];

  /* ------------------------------ Reviews ------------------------------- */
  var reviews = [
    { product: "gold-leaf-saffron-cheesecake", name: "Ananya Barua", city: "Dibrugarh", rating: 5, date: "2026-07-28", title: "Worth every rupee", text: "Ordered for my parents' 30th anniversary. The saffron is real and you can taste it — not a hint, an actual flavour. The gold leaf made my mother emotional. Delivered exactly in the slot promised, cold and perfect.", verified: true, photos: 2 },
    { product: "gold-leaf-saffron-cheesecake", name: "Rohit Menon", city: "Dibrugarh", rating: 5, date: "2026-06-14", title: "Restaurant quality at home", text: "I have had cheesecake at three five-stars in Kolkata. This is better. The pistachio base is the detail everyone misses.", verified: true },
    { product: "gold-leaf-saffron-cheesecake", name: "Priyanka D.", city: "Tinsukia", rating: 4, date: "2026-05-30", title: "Beautiful, slightly rich", text: "Stunning presentation and clearly handmade. A little rich for my family — the 500g would have been enough for six of us, not four.", verified: true },
    { product: "chocolate-truffle-cake", name: "Nabanita Saikia", city: "Dibrugarh", rating: 5, date: "2026-08-02", title: "My default birthday cake now", text: "Third order this year. The ganache is not that sickly sweet stuff — it is actual dark chocolate. They piped my daughter's name beautifully and did not charge for it.", verified: true },
    { product: "chocolate-truffle-cake", name: "Imran Hussain", city: "Dibrugarh", rating: 5, date: "2026-07-11", title: "Eggless and nobody could tell", text: "Ordered eggless for a mixed group. Not one person guessed. Soft, moist, held up in the Dibrugarh heat.", verified: true },
    { product: "pistachio-kunafa-croissant", name: "Sneha Kapoor", city: "Duliajan", rating: 5, date: "2026-08-09", title: "The crunch is unreal", text: "Went twice in one week. Get there before noon — they genuinely sell out. The kunafa stays crisp which I did not expect from a delivery.", verified: true, photos: 1 },
    { product: "pistachio-kunafa-croissant", name: "Dev Sharma", city: "Dibrugarh", rating: 5, date: "2026-07-19", title: "Better than the Dubai original", text: "Had the viral one in Dubai. This has more pistachio and less sugar. Lamination is proper — you can count the layers.", verified: true },
    { product: "assam-tea-cookies", name: "Bhaskar Deka", city: "Jorhat", rating: 5, date: "2026-08-04", title: "Finally, tea IN the cookie", text: "I work in tea. Most tea-flavoured things use essence. This is actual second flush ground into the dough — you get the malt. I now send these to clients abroad.", verified: true },
    { product: "assam-tea-cookies", name: "Meghna Roy", city: "Kolkata", rating: 5, date: "2026-06-25", title: "Gifted 12 boxes for Diwali", text: "Every single person asked where they were from. The jute box makes it look far more expensive than it is.", verified: true },
    { product: "black-rice-cookies", name: "Dr. Anjali Nath", city: "Guwahati", rating: 5, date: "2026-07-30", title: "Gluten free that tastes like a treat", text: "Coeliac household. Usually gluten free means cardboard. Chakhao rice gives it a real nutty depth and my kids finish the jar in two days.", verified: true },
    { product: "fresh-croissant", name: "Karan Bhattacharya", city: "Naharkatia", rating: 5, date: "2026-08-12", title: "Paris standard, GS Road price", text: "Shatters properly when you bite it. Honeycomb inside. I have stopped ordering croissants anywhere else in the city.", verified: true },
    { product: "belgian-chocolate-brownie", name: "Ritu Agarwal", city: "Dibrugarh", rating: 5, date: "2026-07-22", title: "Dangerous", text: "Ordered a box of six. There are two left and it has been forty minutes. The fudge centre is exactly right.", verified: true },
    { product: "red-velvet-cake", name: "Farhan Ali", city: "Dibrugarh", rating: 4, date: "2026-06-18", title: "Great frosting, wanted more tang", text: "The cream cheese frosting is genuinely made with cream cheese, which is rare here. I like mine sharper but that is personal taste.", verified: true },
    { product: "dark-chocolate-entremet", name: "Vikram Choudhury", city: "Dibrugarh", rating: 5, date: "2026-08-06", title: "This is patisserie work", text: "Nine components and you can identify every one. The salted caramel insert cuts the 70% perfectly. Bought it for a client dinner and it closed the deal.", verified: true, photos: 1 },
    { product: "signature-chocolate-bonbons", name: "Tanya Bordoloi", city: "Dibrugarh", rating: 5, date: "2026-07-15", title: "Hand painted, actually", text: "You can see the brush strokes in the cocoa butter. The Assam tea ganache one is the standout. Box is genuinely keepsake quality.", verified: true },
    { product: "millet-cookies", name: "Rajeev Kalita", city: "Tezpur", rating: 4, date: "2026-07-08", title: "Good for a no-sugar cookie", text: "Date paste instead of sugar works better than I expected. Slightly dense but that is the millet. My gym-going son goes through a jar a week.", verified: true },
    { product: "premium-tea-time-box", name: "Sudeshna Ghosh", city: "Kolkata", rating: 5, date: "2026-08-11", title: "Corporate gifting sorted", text: "Sent 40 of these to clients. SAiPH handled per-address dispatch and GST invoicing without a single follow-up from me.", verified: true },
    { product: "artisan-sourdough", name: "Michael D'Souza", city: "Tinsukia", rating: 5, date: "2026-08-01", title: "Real levain, real crust", text: "Blistered, dark, properly open crumb. Three ingredients on the label and nothing else. This is the only sourdough in Guwahati I would call sourdough.", verified: true },
    { product: "assamese-snack-box", name: "Pallabi Choudhury", city: "Jorhat", rating: 5, date: "2026-07-26", title: "Tastes like my grandmother's", text: "The til laru is exactly right. I did not expect a packaged version to get the jaggery ratio correct. Sent one to my sister in Bangalore.", verified: true },
    { product: "saiph-gift-card", name: "Arindam Bose", city: "Guwahati", rating: 5, date: "2026-08-14", title: "Instant and actually works in store", text: "Bought at 11pm, in her inbox by 11:01. She used it at the Zoo Road counter the next morning with no drama.", verified: true }
  ];

  /* --------------------------- Testimonials ----------------------------- */
  var testimonials = [
    { name: "Ananya Barua", meta: "Anniversary · Dibrugarh", rating: 5, text: "Ordered the saffron cheesecake for my parents' 30th. The gold leaf made my mother cry. Delivered in the exact slot, cold and flawless." },
    { name: "Vikram Choudhury", meta: "Corporate · Kolkata", rating: 5, text: "I have used SAiPH for three client dinners now. Signature entremets get a reaction that a bottle of wine simply does not." },
    { name: "Bhaskar Deka", meta: "Gifting · Jorhat", rating: 5, text: "As someone in the tea trade: Khowdy is the first brand that treats Assam tea as an ingredient rather than a label." },
    { name: "Sneha Kapoor", meta: "Everyday · Dibrugarh", rating: 5, text: "The DoughReMi counter at 7am is the best twenty minutes of my week. Get the kunafa croissant before noon." },
    { name: "Dr. Anjali Nath", meta: "Family · Dibrugarh", rating: 5, text: "Coeliac household. The black rice cookies are the first gluten-free thing my children ask for by name." },
    { name: "Sudeshna Ghosh", meta: "Corporate Gifting · Kolkata", rating: 5, text: "Forty hampers, forty addresses, one invoice, zero follow-ups. Their corporate desk simply works." }
  ];

  var insta = [
    { cap: "Mirror glaze at 32°C — no second attempts", tag: "#SAiPHSignature", video: true },
    { cap: "6:04am. First tray out.", tag: "#DoughReMi" },
    { cap: "Second flush, straight from Jorhat", tag: "#Khowdy" },
    { cap: "Nine layers. Three days. One cut.", tag: "#SAiPHSignature", video: true },
    { cap: "Sourdough scoring, take forty-one", tag: "#DoughReMi" },
    { cap: "Bihu pitha, rolled by hand", tag: "#Khowdy" },
    { cap: "24k gold, applied with a brush", tag: "#SAiPHSignature" },
    { cap: "Her face when the box opened", tag: "#SAiPHMoments", video: true },
    { cap: "Chocolate room, 18°C, always", tag: "#SAiPHSignature" },
    { cap: "Croissant cross-section appreciation", tag: "#DoughReMi" },
    { cap: "Black rice from Majuli", tag: "#Khowdy" },
    { cap: "Wedding tier, 80 guests, 4am finish", tag: "#SAiPHSignature" }
  ];

  /* --------------------------- Editorial copy --------------------------- */
  var giftCollections = [
    { id: "birthday-hampers", name: "Birthday Hampers", note: "Cake, candles, brownies and a hand-written card.", from: 1450, cat: "hampers", occasion: "birthday" },
    { id: "chocolate-boxes", name: "Premium Chocolate Boxes", note: "Hand-painted bonbons in a keepsake box.", from: 1450, cat: "chocolates", brand: "signature" },
    { id: "corporate-hampers", name: "Corporate Hampers", note: "Co-branded, bulk-ready, GST invoiced.", from: 1850, cat: "corporate-gifting" },
    { id: "festival-hampers", name: "Festival Hampers", note: "Bihu, Diwali and Christmas collections.", from: 1250, cat: "hampers", occasion: "festival" },
    { id: "wedding-gifts", name: "Wedding Gifts", note: "Monogrammed favours from 50 boxes.", from: 650, cat: "hampers", occasion: "wedding" },
    { id: "tea-dessert", name: "Assam Tea & Dessert Collections", note: "Single-estate tea with cookies and laru.", from: 1250, cat: "assamese", brand: "khowdy" }
  ];

  var orderSteps = [
    { title: "Browse", text: "Shop by brand, occasion or category — or search the whole catalogue." },
    { title: "Customise", text: "Pick size, flavour, message and personalisation on eligible products." },
    { title: "Choose a date", text: "Select delivery or pickup, then a date and two-hour slot." },
    { title: "Checkout", text: "Guest or account, coupons applied, secure payment in one screen." },
    { title: "Track", text: "Live status from kitchen to doorstep, with a call before arrival." }
  ];

  var franchiseFormats = [
    { name: "SAiPH Express Kiosk", area: "120–200 sq ft", invest: "₹12–18 L", team: "2–3", payback: "14–18 months", brands: "DoughReMi, Khowdy" },
    { name: "DoughReMi Café", area: "600–900 sq ft", invest: "₹35–48 L", team: "6–9", payback: "20–26 months", brands: "DoughReMi, Khowdy" },
    { name: "SAiPH Bakes Flagship", area: "1,400–2,000 sq ft", invest: "₹75 L–1.1 Cr", team: "14–20", payback: "28–36 months", brands: "All three brands" },
    { name: "Signature Boutique", area: "400–650 sq ft", invest: "₹42–58 L", team: "4–6", payback: "24–30 months", brands: "SAiPH Signature" }
  ];

  var franchiseSupport = [
    { title: "Site & Design", text: "Territory mapping, footfall study, and a turnkey design kit from fascia to lighting temperature." },
    { title: "Training", text: "Four weeks at our Dibrugarh kitchen for owner and head baker, plus annual refreshers." },
    { title: "Supply Chain", text: "Cold-chain dispatch twice weekly, frozen par-bake for consistency, single-invoice ordering." },
    { title: "Marketing", text: "National brand campaigns, local launch kit, and managed performance spend for your catchment." },
    { title: "Technology", text: "POS, inventory, delivery aggregator integration and a franchisee dashboard with live P&L." },
    { title: "Operations Audit", text: "Monthly quality and hygiene audits with a named regional operations partner." }
  ];

  var wholesaleSegments = [
    { name: "Hotels & Resorts", text: "Breakfast viennoiserie, banquet desserts, in-room amenities." },
    { name: "Restaurants", text: "Plated dessert programmes, par-baked breads, private-label options." },
    { name: "Cafés & QSR", text: "Croissants, cookies and brownies, frozen par-bake with 20-minute finish." },
    { name: "Supermarkets", text: "Khowdy packaged range with barcoded retail-ready cartons." },
    { name: "Schools & Institutions", text: "No-maida, no-palm-oil snack programmes with nutrition declarations." },
    { name: "Corporate Offices", text: "Pantry subscriptions, meeting boxes and festival gifting." },
    { name: "Airlines & Rail", text: "Sealed portion packs with extended shelf life and QA documentation." },
    { name: "Retailers & Distributors", text: "Territory rights, margin structures and marketing co-op." }
  ];

  var corporateServices = [
    { title: "Corporate Cakes", text: "Milestones, launches and anniversaries with logo work in tempered chocolate." },
    { title: "Employee Gifting", text: "Onboarding, birthday and reward boxes shipped to home addresses." },
    { title: "Meeting Snacks", text: "Standing orders for boardroom platters, viennoiserie and tea service." },
    { title: "Bulk Bakery", text: "Volume pricing on cookies, brownies and breads with scheduled dispatch." },
    { title: "Premium Hampers", text: "Signature and Khowdy hampers with per-address delivery." },
    { title: "Festival Gifting", text: "Bihu, Diwali and Christmas programmes planned from August." },
    { title: "Custom Branded Gifts", text: "Foiled boxes, printed sleeves, insert cards and edible logos." },
    { title: "Dedicated Desk", text: "A named account manager, GST invoicing and 30-day credit on approval." }
  ];

  var aboutPillars = [
    { title: "Craftsmanship", text: "Everything is made by hand in our Dibrugarh craft bakery. Lamination is done cold, ganache is emulsified by hand, and nothing leaves without a chef signing off." },
    { title: "Quality", text: "Cultured French butter, single-origin couverture, single-estate Assam tea, no palm oil and no artificial preservatives. If we cannot source it well, we do not make it." },
    { title: "Innovation", text: "A dedicated product-development kitchen runs eight trials a week. Roughly one in twelve makes the menu — the rest teach us something." },
    { title: "Hospitality", text: "A bakery is a service business. Delivery slots we keep, a call before we arrive, and a replacement with no argument if we get it wrong." }
  ];

  var faqs = [
    { q: "How far in advance should I order a cake?", a: "DoughReMi cakes need 6 hours' notice for same-day and are best ordered the evening before. SAiPH Signature entremets and cheesecakes need 48 hours. Tiered and wedding commissions need two to three weeks so we can hold a tasting first." },
    { q: "Do you deliver on a specific date and time slot?", a: "Yes. At checkout you choose delivery or store pickup, a date, and a two-hour slot. Midnight slots (11:30 PM – 12:30 AM) are available in Dibrugarh for birthdays at a small surcharge." },
    { q: "Which cities do you deliver to?", a: "We deliver fresh cakes, pastries and breads across Dibrugarh, and you can collect from the shop at no charge. Khowdy packaged products — cookies, tea, granola and snack boxes — ship pan-India in 3–6 working days." },
    { q: "Are eggless options available?", a: "Every DoughReMi cake is available eggless at no extra charge. Several Signature desserts are eggless by construction, including the Raspberry Entremet and the Gold Leaf Saffron Cheesecake. Look for the Eggless badge on the product page." },
    { q: "How do I order a fully custom cake?", a: "Use Create Your Cake to choose occasion, size, flavour, message and personalisation, and upload a reference image. Our cake studio confirms feasibility and final pricing within four working hours." },
    { q: "Can I get a GST invoice for a corporate order?", a: "Yes. Add your GSTIN at checkout, or use the corporate enquiry form for bulk orders where our team raises a proforma invoice first. Thirty-day credit is available on approval." },
    { q: "What is your returns and replacement policy?", a: "Fresh food cannot be returned, but if an item arrives damaged, incorrect or below standard, report it within 4 hours with a photo and we replace it or refund in full. Packaged Khowdy products can be returned unopened within 7 days." },
    { q: "Do you cater to allergies?", a: "Every product page lists allergens and full ingredients. Our kitchen handles wheat, milk, eggs, soy, sesame and tree nuts, so we cannot guarantee an allergen-free environment. For severe allergies, call us before ordering." },
    { q: "Do you offer subscriptions?", a: "Yes. Bread, breakfast viennoiserie, Khowdy pantry and office pantry boxes can be scheduled weekly or fortnightly with a standing discount. Pause or cancel any time from your account." },
    { q: "How do gift cards work?", a: "Choose any amount from ₹500, add a message and schedule the send. It arrives by email, is valid twelve months, works online and in every store, and the balance carries forward across visits." }
  ];

  var deliverySlots = [
    { id: "morning", label: "9:00 AM – 11:00 AM", note: "Fresh bake" },
    { id: "midday", label: "11:00 AM – 1:00 PM", note: "" },
    { id: "afternoon", label: "1:00 PM – 4:00 PM", note: "" },
    { id: "evening", label: "4:00 PM – 7:00 PM", note: "Most popular" },
    { id: "night", label: "7:00 PM – 9:30 PM", note: "" },
    { id: "midnight", label: "11:30 PM – 12:30 AM", note: "+₹199 surcharge" }
  ];

  var cakeAddons = [
    { id: "candles", name: "Candles & knife set", price: 0, note: "Included free" },
    { id: "topper", name: "Custom acrylic topper", price: 249 },
    { id: "photo-print", name: "Edible photo print", price: 399 },
    { id: "gold-leaf", name: "24k gold leaf finish", price: 599 },
    { id: "flowers", name: "Fresh flower crown", price: 449 },
    { id: "card", name: "Hand-written card", price: 0, note: "Included free" },
    { id: "sparkler", name: "Cold sparkler candles", price: 199 },
    { id: "box", name: "Premium keepsake box", price: 349 }
  ];

  /* ---------------------------- Admin fixtures -------------------------- */
  var adminRoles = [
    { id: "super", name: "Super Admin", scope: "Everything, including billing, roles and store creation." },
    { id: "store", name: "Store Manager", scope: "Own store orders, inventory, slots, staff and local offers." },
    { id: "production", name: "Production Manager", scope: "Production queue, recipes, inventory and cutoff windows." },
    { id: "orders", name: "Order Manager", scope: "All orders, refunds, delivery assignment and customer contact." },
    { id: "marketing", name: "Marketing Manager", scope: "Banners, blog, coupons, gift cards, reviews and campaigns." }
  ];

  var adminModules = [
    { id: "products", name: "Products", perms: { super: 2, store: 1, production: 1, orders: 0, marketing: 1 } },
    { id: "categories", name: "Categories & Brands", perms: { super: 2, store: 0, production: 0, orders: 0, marketing: 1 } },
    { id: "orders", name: "Orders", perms: { super: 2, store: 2, production: 1, orders: 2, marketing: 0 } },
    { id: "customers", name: "Customers", perms: { super: 2, store: 1, production: 0, orders: 2, marketing: 1 } },
    { id: "inventory", name: "Inventory", perms: { super: 2, store: 2, production: 2, orders: 0, marketing: 0 } },
    { id: "slots", name: "Delivery Slots", perms: { super: 2, store: 2, production: 2, orders: 2, marketing: 0 } },
    { id: "stores", name: "Store Locations", perms: { super: 2, store: 1, production: 0, orders: 0, marketing: 0 } },
    { id: "coupons", name: "Coupons & Discounts", perms: { super: 2, store: 1, production: 0, orders: 1, marketing: 2 } },
    { id: "giftcards", name: "Gift Cards", perms: { super: 2, store: 1, production: 0, orders: 1, marketing: 2 } },
    { id: "reviews", name: "Reviews", perms: { super: 2, store: 1, production: 0, orders: 1, marketing: 2 } },
    { id: "banners", name: "Homepage Banners", perms: { super: 2, store: 0, production: 0, orders: 0, marketing: 2 } },
    { id: "blog", name: "Blog", perms: { super: 2, store: 0, production: 0, orders: 0, marketing: 2 } },
    { id: "franchise", name: "Franchise Enquiries", perms: { super: 2, store: 0, production: 0, orders: 0, marketing: 1 } },
    { id: "corporate", name: "Corporate Enquiries", perms: { super: 2, store: 1, production: 0, orders: 1, marketing: 1 } },
    { id: "wholesale", name: "Wholesale Enquiries", perms: { super: 2, store: 0, production: 1, orders: 0, marketing: 1 } }
  ];

  var adminOrders = [
    { id: "SB-24081", customer: "Ananya Barua", items: 3, brand: "Signature", total: 4820, status: "baking", slot: "24 Aug · 4–7 PM", channel: "Web", store: "Dibrugarh" },
    { id: "SB-24080", customer: "Vikram Choudhury", items: 1, brand: "Signature", total: 2950, status: "out", slot: "24 Aug · 1–4 PM", channel: "Web", store: "Dibrugarh" },
    { id: "SB-24079", customer: "Sneha Kapoor", items: 6, brand: "DoughReMi", total: 1180, status: "delivered", slot: "24 Aug · 9–11 AM", channel: "App", store: "Dibrugarh" },
    { id: "SB-24078", customer: "Nabanita Saikia", items: 2, brand: "DoughReMi", total: 1049, status: "placed", slot: "25 Aug · 4–7 PM", channel: "Web", store: "Dibrugarh" },
    { id: "SB-24077", customer: "TechNova Pvt Ltd", items: 40, brand: "Khowdy", total: 74000, status: "baking", slot: "26 Aug · Dispatch", channel: "Corporate", store: "Dibrugarh" },
    { id: "SB-24076", customer: "Bhaskar Deka", items: 3, brand: "Khowdy", total: 1215, status: "delivered", slot: "23 Aug · Courier", channel: "Web", store: "Dibrugarh" },
    { id: "SB-24075", customer: "Imran Hussain", items: 1, brand: "DoughReMi", total: 849, status: "cancelled", slot: "23 Aug · 7–9 PM", channel: "App", store: "Dibrugarh" },
    { id: "SB-24074", customer: "Sudeshna Ghosh", items: 12, brand: "Signature", total: 17400, status: "delivered", slot: "22 Aug · Dispatch", channel: "Corporate", store: "Dibrugarh" }
  ];

  var adminKpis = [
    { l: "Revenue today", n: "₹2.84 L", d: "+18.2%", up: true, spark: [40, 52, 44, 61, 58, 73, 88] },
    { l: "Orders today", n: "214", d: "+11.4%", up: true, spark: [55, 48, 62, 58, 71, 66, 80] },
    { l: "Avg. order value", n: "₹1,327", d: "+6.1%", up: true, spark: [60, 58, 64, 61, 68, 70, 74] },
    { l: "Cakes in production", n: "38", d: "9 due < 2h", up: true, spark: [30, 44, 38, 52, 60, 55, 68] },
    { l: "Abandoned carts", n: "47", d: "-8.3%", up: false, spark: [70, 66, 62, 58, 54, 50, 46] },
    { l: "Low-stock SKUs", n: "6", d: "2 critical", up: false, spark: [20, 26, 30, 28, 34, 40, 44] }
  ];

  var adminEnquiries = [
    { type: "Franchise", who: "R. Bhuyan", detail: "DoughReMi Café · Tezpur", when: "2h ago", status: "New" },
    { type: "Corporate", who: "Oil India Ltd", detail: "600 Diwali hampers", when: "4h ago", status: "Quoted" },
    { type: "Wholesale", who: "Hotel Brahmaputra", detail: "Daily viennoiserie", when: "Yesterday", status: "In review" },
    { type: "Franchise", who: "S. Agarwal", detail: "Signature Boutique · Siliguri", when: "Yesterday", status: "Call booked" },
    { type: "Corporate", who: "NEDFi", detail: "Employee birthday programme", when: "2 days ago", status: "Won" }
  ];

  var blogPosts = [
    { id: "why-72-hour-croissant", cat: "Craft", title: "Why our croissant takes seventy-two hours", excerpt: "Lamination is a temperature problem, not a strength problem. Here is what three days of cold ferment actually does to butter.", date: "12 Aug 2026", read: "6 min" },
    { id: "assam-tea-as-ingredient", cat: "Sourcing", title: "Treating Assam tea as an ingredient, not a label", excerpt: "Second flush has malt and honey notes that survive baking. Essence does not. A note from our Jorhat sourcing trips.", date: "28 Jul 2026", read: "5 min" },
    { id: "eggless-without-apology", cat: "Kitchen", title: "Eggless without apology", excerpt: "Aquafaba, curd, flax and the emulsification tricks that let our eggless cakes go out on the same shelf as the rest.", date: "09 Jul 2026", read: "7 min" },
    { id: "mirror-glaze-32-degrees", cat: "Signature", title: "The 32° rule of mirror glaze", excerpt: "Two degrees either way and the pour is ruined. Inside the least forgiving five minutes in our Signature kitchen.", date: "21 Jun 2026", read: "4 min" }
  ];

  function byId(id) {
    if (!id) return null;
    var direct = products.filter(function (p) { return p.id === id || p.slug === id; })[0];
    if (direct) return direct;
    var clean = String(id).toLowerCase().replace(/[^a-z0-9]/g, "");
    return products.filter(function (p) {
      return p.id.replace(/[^a-z0-9]/g, "") === clean ||
             p.name.toLowerCase().replace(/[^a-z0-9]/g, "") === clean ||
             p.id.indexOf(id) > -1 || id.indexOf(p.id) > -1;
    })[0] || null;
  }
  function byBrand(brand) { return products.filter(function (p) { return p.brand === brand; }); }
  function byCat(cat) { return products.filter(function (p) { return p.cats.indexOf(cat) > -1; }); }
  function byBadge(badge) { return products.filter(function (p) { return p.badges.indexOf(badge) > -1; }); }
  function byOccasion(occ) { return products.filter(function (p) { return p.occasions.indexOf(occ) > -1; }); }
  function reviewsFor(id) { return reviews.filter(function (r) { return r.product === id; }); }
  function related(id, n) {
    var p = byId(id);
    if (!p) return products.slice(0, n || 4);
    var scored = products
      .filter(function (x) { return x.id !== id; })
      .map(function (x) {
        var s = 0;
        if (x.brand === p.brand) s += 3;
        x.cats.forEach(function (c) { if (p.cats.indexOf(c) > -1) s += 2; });
        x.tags.forEach(function (t) { if (p.tags.indexOf(t) > -1) s += 1; });
        return { p: x, s: s };
      })
      .sort(function (a, b) { return b.s - a.s || b.p.rating - a.p.rating; });
    return scored.slice(0, n || 4).map(function (x) { return x.p; });
  }
  function search(term, limit) {
    var q = String(term || "").trim().toLowerCase();
    if (!q) return [];
    var words = q.split(/\s+/);
    return products
      .map(function (p) {
        var score = 0;
        words.forEach(function (w) {
          if (p.name.toLowerCase().indexOf(w) === 0) score += 10;
          else if (p.name.toLowerCase().indexOf(w) > -1) score += 6;
          if (p.brandName.toLowerCase().indexOf(w) > -1) score += 3;
          if (p.keywords.indexOf(w) > -1) score += 2;
          if (p.desc.toLowerCase().indexOf(w) > -1) score += 1;
        });
        return { p: p, score: score };
      })
      .filter(function (x) { return x.score > 0; })
      .sort(function (a, b) { return b.score - a.score || b.p.rating - a.p.rating; })
      .slice(0, limit || 8)
      .map(function (x) { return x.p; });
  }
  function catCount(cat) { return byCat(cat).length; }
  function couponByCode(code) {
    var c = String(code || "").trim().toUpperCase();
    return coupons.filter(function (x) { return x.code === c; })[0] || null;
  }
  function storeById(id) { return stores.filter(function (s) { return s.id === id; })[0] || null; }
  function brandById(id) { return brands.filter(function (b) { return b.id === id; })[0] || null; }
  function catById(id) { return categories.filter(function (c) { return c.id === id; })[0] || null; }

  SAIPH.data = {
    company: company,
    tones: tones,
    brands: brands,
    categories: categories,
    occasions: occasions,
    diets: diets,
    products: products,
    stores: stores,
    deliveryCities: deliveryCities,
    coupons: coupons,
    reviews: reviews,
    testimonials: testimonials,
    insta: insta,
    giftCollections: giftCollections,
    orderSteps: orderSteps,
    franchiseFormats: franchiseFormats,
    franchiseSupport: franchiseSupport,
    wholesaleSegments: wholesaleSegments,
    corporateServices: corporateServices,
    aboutPillars: aboutPillars,
    faqs: faqs,
    deliverySlots: deliverySlots,
    cakeAddons: cakeAddons,
    sizeSets: sizeSets,
    flavourSets: flavourSets,
    adminRoles: adminRoles,
    adminModules: adminModules,
    adminOrders: adminOrders,
    adminKpis: adminKpis,
    adminEnquiries: adminEnquiries,
    blogPosts: blogPosts
  };

  SAIPH.query = {
    byId: byId,
    byBrand: byBrand,
    byCat: byCat,
    byBadge: byBadge,
    byOccasion: byOccasion,
    reviewsFor: reviewsFor,
    related: related,
    search: search,
    catCount: catCount,
    couponByCode: couponByCode,
    storeById: storeById,
    brandById: brandById,
    catById: catById
  };
})(typeof window !== "undefined" ? window : this);

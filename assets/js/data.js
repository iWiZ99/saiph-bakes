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
    /* ========================= ARTISANAL SUGAR-FREE CATALOGUE ========================= */
    /* ===== SAiPH BAKES PREMIUM CAKE MENU (22 FLAVOURS) ===== */
    {
      id: "vanilla-cake", name: "Vanilla Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 4.9, reviews: 142,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Freshly baked artisan vanilla sponge made with fragrant pure Madagascar vanilla beans, whipped cream, and zero refined sugar. 100% eggless and gluten-free.",
      long: "Freshly baked artisan vanilla sponge made with fragrant pure Madagascar vanilla beans, whipped cream, and zero refined sugar. Crafted with no maida, no artificial preservatives, and premium pure ingredients for mindful celebration. 100% Egg-Free and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, oat flour, pure Madagascar vanilla bean, natural erythritol & stevia blend, dairy cream, cold-pressed oils.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/vanilla-cake.jpg", images: ["assets/img/products/vanilla-cake.jpg"],
      tags: ["cake", "vanilla", "eggless", "gluten-free", "signature"]
    },
    {
      id: "chocolate-cake", name: "Chocolate Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 5.0, reviews: 218,
      badges: ["BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Decadent dark chocolate layers enveloped in silky smooth Belgian chocolate ganache. Refined sugar-free, gluten-free, and maida-free indulgence.",
      long: "Decadent dark chocolate layers enveloped in silky smooth Belgian chocolate ganache. Handcrafted using single-origin cocoa with zero maida and zero refined sugar. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, single-origin cacao, dark chocolate 70%, natural plant sweetener, fresh cream, grass-fed butter.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/chocolate-cake.jpg", images: ["assets/img/products/chocolate-cake.jpg"],
      tags: ["cake", "chocolate", "eggless", "gluten-free", "signature"]
    },
    {
      id: "butter-scotch-cake", name: "Butter Scotch Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 850, mrp: 980, rating: 4.9, reviews: 96,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Layers of moist golden sponge filled with rich handcrafted butterscotch cream and crunchy sugar-free praline crisps. 100% eggless and guilt-free.",
      long: "Layers of moist golden sponge filled with rich handcrafted butterscotch cream and crunchy sugar-free praline crisps. Made with pure brown butter and zero artificial essences. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, brown butter, handcrafted sugar-free butterscotch caramel, natural erythritol blend, fresh cream.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/butterscotch-cake.jpg", images: ["assets/img/products/butterscotch-cake.jpg"],
      tags: ["cake", "butterscotch", "eggless", "gluten-free", "signature"]
    },
    {
      id: "nutella-cake", name: "Nutella Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1200, mrp: 1380, rating: 5.0, reviews: 164,
      badges: ["BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Velvety chocolate hazelnut sponge filled with luscious artisanal sugar-free Nutella spread and toasted roasted hazelnuts.",
      long: "Velvety chocolate hazelnut sponge filled with luscious artisanal sugar-free Nutella spread and toasted roasted hazelnuts. Decadent, rich, and guilt-free. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, pure hazelnut butter, Belgian cocoa, natural stevia sweetener, fresh cream, roasted hazelnuts.",
      allergens: ["Milk / Dairy", "Tree nuts (hazelnut, almond)"],
      customisable: true, image: "assets/img/products/pistachio-nutella-cake-2.jpg", images: ["assets/img/products/pistachio-nutella-cake-2.jpg"],
      tags: ["cake", "nutella", "hazelnut", "eggless", "gluten-free", "signature"]
    },
    {
      id: "marble-cake", name: "Marble Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 900, mrp: 1035, rating: 4.8, reviews: 88,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Artistic swirls of rich dark chocolate and fragrant vanilla bean sponge, finished with a smooth marbled ganache. Wholesome, gluten-free, and eggless.",
      long: "Artistic swirls of rich dark chocolate and fragrant vanilla bean sponge, finished with a smooth marbled ganache. Wholesome, gluten-free, and eggless with zero refined sugar.",
      ingredients: "French T45 pastry flour, almond flour, Madagascar vanilla, dark cocoa, erythritol blend, grass-fed butter, fresh cream.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/marble-opulence-cake.jpg", images: ["assets/img/products/marble-opulence-cake.jpg"],
      tags: ["cake", "marble", "eggless", "gluten-free", "signature"]
    },
    {
      id: "oreo-cake", name: "Oreo Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1000, mrp: 1150, rating: 4.9, reviews: 110,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Cookies-and-cream perfection featuring crushed artisan chocolate biscuit crumbs folded into vanilla cream cheese frosting between moist chocolate layers.",
      long: "Cookies-and-cream perfection featuring crushed artisan gluten-free chocolate biscuit crumbs folded into vanilla cream cheese frosting between moist chocolate layers. 100% Eggless and refined sugar-free.",
      ingredients: "French T45 pastry flour, almond flour, gluten-free dark cacao biscuit crumble, cream cheese, natural plant sweetener, vanilla bean.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/oreo-cake.jpg", images: ["assets/img/products/oreo-cake.jpg"],
      tags: ["cake", "oreo", "cookies-and-cream", "eggless", "gluten-free", "signature"]
    },
    {
      id: "black-forest-cake", name: "Black Forest Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 4.9, reviews: 178,
      badges: ["BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Airy chocolate sponge layered with tart cherry compote, fresh vanilla chantilly cream, and dark chocolate shavings. A mindful classic.",
      long: "Airy chocolate sponge layered with tart cherry compote, fresh vanilla chantilly cream, and dark chocolate shavings. Baked without refined sugar or maida. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, dark cocoa, red sour cherries, Madagascar vanilla, dairy cream, natural erythritol.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/black-forest-cake.jpg", images: ["assets/img/products/black-forest-cake.jpg"],
      tags: ["cake", "black-forest", "eggless", "gluten-free", "signature"]
    },
    {
      id: "white-forest-cake", name: "White Forest Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 4.8, reviews: 92,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Delicate vanilla sponge filled with juicy cherries, white chocolate curls, and light whipped cream. 100% eggless, gluten-free, and zero refined sugar.",
      long: "Delicate vanilla sponge filled with juicy cherries, white chocolate curls, and light whipped cream. 100% eggless, gluten-free, and zero refined sugar.",
      ingredients: "French T45 pastry flour, almond flour, sugar-free white chocolate, sweet cherries, fresh dairy cream, natural stevia blend.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/white-forest-cake.jpg", images: ["assets/img/products/white-forest-cake.jpg"],
      tags: ["cake", "white-forest", "eggless", "gluten-free", "signature"]
    },
    {
      id: "plum-cake-non-alcoholic", name: "Plum Cake (Non Alcoholic)", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1250, mrp: 1435, rating: 5.0, reviews: 135,
      badges: ["SIGNATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["festival", "birthday", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Traditional rich festive fruit cake loaded with spiced black currants, raisins, dates, figs, and toasted nuts steeped in spiced citrus reduction. 100% non-alcoholic.",
      long: "Traditional rich festive fruit cake loaded with spiced black currants, raisins, dates, figs, and toasted nuts steeped in spiced citrus reduction. 100% non-alcoholic, egg-free, and refined sugar-free.",
      ingredients: "French T45 pastry flour, almond flour, black raisins, dates, figs, candied orange peel, cinnamon, nutmeg, ginger, walnuts, cold-pressed oils.",
      allergens: ["Tree nuts (walnut, almond)"],
      customisable: true, image: "assets/img/products/plum-cake-non-alcoholic.jpg", images: ["assets/img/products/plum-cake-non-alcoholic.jpg"],
      tags: ["cake", "plum-cake", "festive", "eggless", "gluten-free", "signature"]
    },
    {
      id: "raspberry-velvet-cake", name: "Raspberry Velvet Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1200, mrp: 1380, rating: 4.9, reviews: 84,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Sumptuous pink velvet sponge layered with tangy wild raspberry coulis and delicate cream frosting. Bright, refreshing, and sugar-free.",
      long: "Sumptuous pink velvet sponge layered with tangy wild raspberry coulis and delicate cream frosting. Bright, refreshing, and sugar-free. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, fresh raspberry reduction, vanilla cream, natural erythritol blend, cold-pressed oils.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/pistachio-raspberry-cake.jpg", images: ["assets/img/products/pistachio-raspberry-cake.jpg"],
      tags: ["cake", "raspberry", "velvet", "eggless", "gluten-free", "signature"]
    },
    {
      id: "lavender-berry-cake", name: "Lavender Berry Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1200, mrp: 1380, rating: 5.0, reviews: 76,
      badges: ["SIGNATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "An ethereal floral and fruit pairing: culinary French lavender-infused sponge layered with mixed berry compote and whipped chantilly frosting.",
      long: "An ethereal floral and fruit pairing: culinary French lavender-infused sponge layered with mixed berry compote and whipped chantilly frosting. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, organic culinary lavender, blueberries, blackberries, fresh dairy cream, natural plant sweetener.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/berry-chantilly-cake.jpg", images: ["assets/img/products/berry-chantilly-cake.jpg"],
      tags: ["cake", "lavender", "berry", "eggless", "gluten-free", "signature"]
    },
    {
      id: "pineapple-cake", name: "Pineapple Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 4.9, reviews: 150,
      badges: ["BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Classic tropical celebration cake: tender vanilla sponge soaked in real pineapple nectar, layered with slow-simmered pineapple compote and fresh cream.",
      long: "Classic tropical celebration cake: tender vanilla sponge soaked in real pineapple nectar, layered with slow-simmered pineapple compote and fresh cream. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, fresh Queen pineapple, dairy cream, Madagascar vanilla, natural erythritol blend.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/pineapple-cream-cake.jpg", images: ["assets/img/products/pineapple-cream-cake.jpg"],
      tags: ["cake", "pineapple", "eggless", "gluten-free", "signature"]
    },
    {
      id: "mango-cake", name: "Mango Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 4.9, reviews: 114,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Sun-ripened Alphonso mango pulp layered with light sponge and mango-infused mascarpone cream. Pure tropical delight with zero added sugar.",
      long: "Sun-ripened Alphonso mango pulp layered with light sponge and mango-infused mascarpone cream. Pure tropical delight with zero added sugar. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, Alphonso mango puree, mascarpone cream, natural stevia sweetener, fresh cream.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/mango-cake.jpg", images: ["assets/img/products/mango-cake.jpg"],
      tags: ["cake", "mango", "eggless", "gluten-free", "signature"]
    },
    {
      id: "strawberry-cake", name: "Strawberry Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 4.9, reviews: 128,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Juicy handpicked strawberries cooked into a velvety compote between light sponge layers and whipped vanilla cream.",
      long: "Juicy handpicked strawberries cooked into a velvety compote between light sponge layers and whipped vanilla cream. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, fresh strawberries, dairy cream, Madagascar vanilla, natural erythritol blend.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/strawberry-cake.jpg", images: ["assets/img/products/strawberry-cake.jpg"],
      tags: ["cake", "strawberry", "eggless", "gluten-free", "signature"]
    },
    {
      id: "fresh-fruit-cake", name: "Fruit Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 4.8, reviews: 102,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "A colourful festival of fresh seasonal exotic fruits over a luscious cream-covered vanilla sponge.",
      long: "A colourful festival of fresh seasonal exotic fruits (kiwi, pomegranate, orange, berries) over a luscious cream-covered vanilla sponge. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, fresh seasonal fruits, vanilla cream, natural plant sweetener, cold-pressed oils.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/tropical-delight-cake.jpg", images: ["assets/img/products/tropical-delight-cake.jpg"],
      tags: ["cake", "fruit-cake", "fresh-fruit", "eggless", "gluten-free", "signature"]
    },
    {
      id: "biscoff-cake", name: "Biscoff Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 900, mrp: 1035, rating: 5.0, reviews: 140,
      badges: ["BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Warmly spiced speculoos cookie butter folded into smooth cream frosting with spiced biscuit crumbs over tender cinnamon-infused sponge.",
      long: "Warmly spiced speculoos cookie butter folded into smooth cream frosting with spiced biscuit crumbs over tender cinnamon-infused sponge. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, sugar-free spiced speculoos butter, cinnamon, dairy cream, natural erythritol blend.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/biscoff-cake.jpg", images: ["assets/img/products/biscoff-cake.jpg"],
      tags: ["cake", "biscoff", "speculoos", "eggless", "gluten-free", "signature"]
    },
    {
      id: "bee-cake-honey", name: "Bee Cake Honey", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 800, mrp: 920, rating: 4.9, reviews: 89,
      badges: ["SIGNATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["gluten-free", "eggless", "no-maida"],
      desc: "Inspired by the classic Medovik: delicate multi-layered honey biscuits caramelized to perfection and filled with tangy sour cream honey frosting.",
      long: "Inspired by the classic Medovik: delicate multi-layered honey biscuits caramelized to perfection and filled with tangy sour cream honey frosting. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, pure organic raw wild honey, sour cream, grass-fed butter, natural erythritol.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/bee-cake-honey.jpg", images: ["assets/img/products/bee-cake-honey.jpg"],
      tags: ["cake", "honey-cake", "medovik", "eggless", "gluten-free", "signature"]
    },
    {
      id: "toffee-caramel-cake", name: "Toffee Caramel Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 950, mrp: 1090, rating: 4.9, reviews: 118,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Deep golden English toffee sauce swirled into fluffy sponge with sea-salted caramel buttercream and sugar-free toffee brittle.",
      long: "Deep golden English toffee sauce swirled into fluffy sponge with sea-salted caramel buttercream and sugar-free toffee brittle. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, browned grass-fed butter, handcrafted sugar-free toffee caramel, Himalayan pink salt, fresh cream.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/chocolate-caramel-noir-cake.jpg", images: ["assets/img/products/chocolate-caramel-noir-cake.jpg"],
      tags: ["cake", "toffee", "caramel", "eggless", "gluten-free", "signature"]
    },
    {
      id: "caramel-hazelnut-chocolate-cake", name: "Caramel Hazelnut Chocolate", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1200, mrp: 1380, rating: 5.0, reviews: 172,
      badges: ["BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "The ultimate trio: rich chocolate sponge, slow-cooked caramel drizzle, and roasted hazelnut praline crunch draped in dark chocolate ganache.",
      long: "The ultimate trio: rich chocolate sponge, slow-cooked caramel drizzle, and roasted hazelnut praline crunch draped in dark chocolate ganache. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, roasted hazelnuts, dark chocolate 70%, sea salt caramel, natural plant sweetener, fresh cream.",
      allergens: ["Milk / Dairy", "Tree nuts (hazelnut, almond)"],
      customisable: true, image: "assets/img/products/triple-chocolate-crunch-cake-1.jpg", images: ["assets/img/products/triple-chocolate-crunch-cake-1.jpg"],
      tags: ["cake", "caramel", "hazelnut", "chocolate", "eggless", "gluten-free", "signature"]
    },
    {
      id: "nutella-hazelnut-cake", name: "Nutella Hazelnut Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1250, mrp: 1435, rating: 5.0, reviews: 230,
      badges: ["SIGNATURE", "BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Our flagship celebration cake featured on the SAiPH Bakes menu: decadent chocolate hazelnut sponge crowned with hazelnut truffles and chocolate drip.",
      long: "Our flagship celebration cake featured on the official SAiPH Bakes menu: decadent chocolate hazelnut sponge crowned with hazelnut truffles and signature chocolate drip. Handcrafted with zero maida and zero refined sugar. 100% Eggless and Gluten-Free.",
      ingredients: "French T45 pastry flour, almond flour, pure roasted hazelnuts, artisanal sugar-free Nutella, Belgian cacao, dairy cream, stevia.",
      allergens: ["Milk / Dairy", "Tree nuts (hazelnut, almond)"],
      customisable: true, image: "assets/img/products/nutella-hazelnut-cake.jpg", images: ["assets/img/products/nutella-hazelnut-cake.jpg"],
      tags: ["cake", "nutella", "hazelnut", "signature-menu", "eggless", "gluten-free", "signature"]
    },
    {
      id: "sugar-free-almond-butter", name: "Sugar Free Almond Butter", brand: "khowdy",
      cats: ["healthy-snacks"], price: 750, mrp: 862, rating: 4.9, reviews: 160,
      badges: ["SUGAR-FREE"], sizes: "jar", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "Made with 100% pure roasted almonds, our signature Almond Butter celebrates the natural richness and goodness of almonds in their simplest f...",
      long: "Made with 100% pure roasted almonds, our signature Almond Butter celebrates the natural richness and goodness of almonds in their simplest form. Smooth, creamy, and naturally nutty, it delivers a deliciously wholesome flavour without the need for added sugar, oils, or preservatives. Thoughtfully crafted to let the natural taste of roasted almonds shine through, this versatile spread is perfect for spreading over toast, blending into smoothies, pairing with fresh fruit, or adding to your favourite breakfast bowls and recipes. Whether enjoyed as part of your daily routine or straight from the jar, it\u2019s a simple, delicious way to bring the goodness of almonds into your everyday indulgence. Refined Sugar-Free | Gluten-Free | Vegan | No Added Oils or Preservatives",
      ingredients: "Dry-roasted California almonds, organic vanilla bean, stevia leaf extract, Himalayan pink salt.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/sugar-free-almond-butter.jpg", images: ["assets/img/products/sugar-free-almond-butter.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "sugar-free-tiramisu-spread", name: "Sugar Free Tiramisu Spread", brand: "khowdy",
      cats: ["healthy-snacks"], price: 550, mrp: 632, rating: 4.9, reviews: 161,
      badges: ["SUGAR-FREE"], sizes: "jar", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "Inspired by the timeless indulgence of classic tiramisu, our Sugar-Free Tiramisu Spread brings together the rich notes of coffee and cocoa i...",
      long: "Inspired by the timeless indulgence of classic tiramisu, our Sugar-Free Tiramisu Spread brings together the rich notes of coffee and cocoa in a smooth, creamy blend. Sweetened with stevia and thoughtfully crafted without refined sugar, it delivers a beautifully balanced flavour with the perfect touch of coffee-inspired indulgence. Spread it over toast, drizzle it over pancakes, pair it with fresh fruit, or use it to add a delicious twist to your favourite desserts. Whether enjoyed as part of your breakfast or as a little afternoon treat, this versatile spread brings a touch of indulgence to every moment. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Dry-roasted California almonds, organic vanilla bean, stevia leaf extract, Himalayan pink salt.",
      allergens: ["Processed in a facility handling tree nuts and dairy"],
      customisable: false, image: "assets/img/products/sugar-free-tiramisu-spread.jpg", images: ["assets/img/products/sugar-free-tiramisu-spread.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "sugar-free-hazelnut-spread", name: "Sugar Free Hazelnut Spread", brand: "khowdy",
      cats: ["healthy-snacks"], price: 650, mrp: 747, rating: 4.8, reviews: 221,
      badges: ["SUGAR-FREE"], sizes: "jar", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "Indulge in the rich, irresistible combination of chocolate and hazelnuts with our signature Sugar-Free Hazelnut Spread. Crafted with 100% na...",
      long: "Indulge in the rich, irresistible combination of chocolate and hazelnuts with our signature Sugar-Free Hazelnut Spread. Crafted with 100% natural hazelnut butter, roasted hazelnuts, and cocoa solids, this smooth and creamy spread delivers a deep chocolatey flavour complemented by the natural nuttiness of hazelnuts. Sweetened with stevia and made without refined sugar, it offers a deliciously indulgent experience with a mindful twist. Spread it over toast, drizzle it over pancakes, pair it with fresh fruit, or enjoy a spoonful straight from the jar whenever a chocolate craving strikes. Versatile, decadent, and thoughtfully crafted, it's an everyday favourite for those who believe mindful indulgence should never compromise on flavour. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Dry-roasted California almonds, organic vanilla bean, stevia leaf extract, Himalayan pink salt.",
      allergens: ["Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/sugar-free-hazelnut-spread.jpg", images: ["assets/img/products/sugar-free-hazelnut-spread.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "assorted-diwali-mithai-barks-hamper", name: "Assorted Diwali Mithai & Barks Hamper", brand: "signature",
      cats: ["hampers", "corporate-gifting"], price: 1800, mrp: 2070, rating: 4.9, reviews: 116,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "A thoughtfully curated festive assortment that brings together the timeless charm of Indian mithai and the indulgence of handcrafted chocola...",
      long: "A thoughtfully curated festive assortment that brings together the timeless charm of Indian mithai and the indulgence of handcrafted chocolate barks. Featuring two pieces each of our signature sugar-free Motichoor Laddoos, Pistachio Praline Laddoos, and Rose Kaju Katlis, this box offers a delightful blend of traditional flavours and contemporary indulgence. Complete your festive selection with your choice of our Motichoor Bark or Chocolate Praline Bark, adding a delicious finishing touch to this thoughtfully crafted assortment. Perfect for festive gifting or sharing with loved ones, it\u2019s a beautiful way to celebrate the season with mindful indulgence. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (pistachio)"],
      customisable: false, image: "assets/img/products/assorted-diwali-mithai-barks-hamper.png", images: ["assets/img/products/assorted-diwali-mithai-barks-hamper.png"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "basque-cheesecake-hamper", name: "Basque Cheesecake Hamper", brand: "signature",
      cats: ["celebration-cakes", "desserts"], price: 1500, mrp: 1724, rating: 4.8, reviews: 270,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free"],
      desc: "Choose between our two signature Basque cheesecakes, each crafted to bring a touch of indulgence to your festive celebrations. Enjoy the ric...",
      long: "Choose between our two signature Basque cheesecakes, each crafted to bring a touch of indulgence to your festive celebrations. Enjoy the rich, creamy Pistachio Basque Cheesecake, infused with pistachio cream cheese and topped with sugar-free pistachio butter and crushed pistachios, or savour our Kesar Rabdi Basque Cheesecake, featuring kesar-infused cheesecake finished with a luscious layer of sugar-free rabdi sweetened with stevia. Both offer a delicious fusion of rich flavours and festive indulgence, making them a perfect addition to your celebrations. Refined Sugar-Free | Gluten-Free | Contains Dairy",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/basque-cheesecake-hamper.png", images: ["assets/img/products/basque-cheesecake-hamper.png"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "mini-diwali-gift-hamper", name: "Mini Diwali Gift Hamper", brand: "signature",
      cats: ["hampers", "corporate-gifting"], price: 3500, mrp: 4024, rating: 4.8, reviews: 58,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free"],
      desc: "A thoughtfully curated festive assortment featuring the perfect balance of indulgent desserts and savoury bites. Enjoy your choice of a rich...",
      long: "A thoughtfully curated festive assortment featuring the perfect balance of indulgent desserts and savoury bites. Enjoy your choice of a rich Pistachio Basque Cheesecake or Kesar Rabdi Basque Cheesecake, paired with a selection of our signature fudge bites and crisp, flavourful crackers. From creamy cheesecakes and melt-in-your-mouth fudge to deliciously savoury crackers, every element is thoughtfully chosen to make festive gifting extra special. Refined Sugar-Free | Gluten-Free",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/mini-diwali-gift-hamper.jpg", images: ["assets/img/products/mini-diwali-gift-hamper.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "assorted-mithai-box-of-6", name: "Assorted Mithai Box of 6", brand: "signature",
      cats: ["hampers", "corporate-gifting"], price: 800, mrp: 919, rating: 5.0, reviews: 228,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "A thoughtfully curated assortment of festive favourites, bringing together the timeless charm of Indian mithai with a mindful twist. Featuri...",
      long: "A thoughtfully curated assortment of festive favourites, bringing together the timeless charm of Indian mithai with a mindful twist. Featuring six pieces, with two each of our signature sugar-free motichoor laddoos, pistachio praline laddoos, and rose kaju katlis, this box offers a delightful blend of traditional flavours and contemporary indulgence. From the delicate sweetness of motichoor to the nutty richness of pistachio praline and the subtle floral notes of rose, every bite is crafted to make your festive moments a little more special. Perfect for thoughtful gifting or sharing a little sweetness with loved ones, this assortment is a beautiful addition to your celebrations. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (pistachio)"],
      customisable: false, image: "assets/img/products/assorted-mithai-box-of-6.jpg", images: ["assets/img/products/assorted-mithai-box-of-6.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "assorted-vegan-mithai-box-of-15", name: "Assorted Vegan Mithai Box of 15", brand: "signature",
      cats: ["hampers", "corporate-gifting"], price: 1800, mrp: 2070, rating: 4.9, reviews: 223,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "A thoughtfully curated assortment of festive favourites, bringing together the timeless charm of Indian mithai with a mindful twist. Featuri...",
      long: "A thoughtfully curated assortment of festive favourites, bringing together the timeless charm of Indian mithai with a mindful twist. Featuring 15 pieces, with five each of our signature sugar-free motichoor laddoos, pistachio praline laddoos, and rose kaju katlis, this box offers a delightful blend of traditional flavours and contemporary indulgence. From the delicate sweetness of motichoor to the nutty richness of pistachio praline and the subtle floral notes of rose, every bite is crafted to make your festive celebrations a little more special. Perfect for gifting loved ones or sharing with family, this assortment is a beautiful way to celebrate the season with thoughtfully made treats. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (pistachio)"],
      customisable: false, image: "assets/img/products/assorted-vegan-mithai-box-of-15.jpg", images: ["assets/img/products/assorted-vegan-mithai-box-of-15.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "assorted-mithai-box-of-15", name: "Assorted Mithai Box of 15", brand: "signature",
      cats: ["hampers", "corporate-gifting"], price: 1800, mrp: 2070, rating: 4.9, reviews: 99,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free"],
      desc: "A thoughtfully curated assortment of festive favourites, bringing together the richness of traditional Indian mithai with a mindful twist. F...",
      long: "A thoughtfully curated assortment of festive favourites, bringing together the richness of traditional Indian mithai with a mindful twist. Featuring 15 pieces, with three each of our signature sugar-free Mysore Pak, pistachio praline laddoo, motichoor laddoo, rose kaju katli, and malai chocolate peda, this box celebrates a beautiful blend of classic flavours and contemporary indulgence. From the nutty richness of pistachio praline to the delicate floral notes of rose and the indulgent touch of malai chocolate, every sweet is crafted to make your festive moments extra special. Perfect for gifting loved ones or sharing with family, this assortment brings a thoughtful touch to every celebration. Refined Sugar-Free | Gluten-Free | Contains Dairy",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/assorted-mithai-box-of-15.jpg", images: ["assets/img/products/assorted-mithai-box-of-15.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "paprika-and-garlic-crackers", name: "Paprika and Garlic Crackers", brand: "khowdy",
      cats: ["healthy-snacks"], price: 400, mrp: 459, rating: 4.9, reviews: 157,
      badges: ["SUGAR-FREE"], sizes: "jar", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "(120 gms) Crisp, golden-baked crackers infused with the bold, aromatic flavours of smoky garlic and blended with vegan butter for a deliciou...",
      long: "(120 gms) Crisp, golden-baked crackers infused with the bold, aromatic flavours of smoky garlic and blended with vegan butter for a deliciously savoury finish. Each bite delivers a satisfying crunch, complemented by the rich, smoky notes of garlic, creating a beautifully balanced flavour that keeps you coming back for more. Thoughtfully crafted for those who enjoy savoury snacking, these crackers are perfect for pairing with your favourite dips, adding to a festive grazing platter, or enjoying straight out of the pack whenever a craving strikes. Gluten-Free | Vegan",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Milk / Dairy"],
      customisable: false, image: "assets/img/products/paprika-and-garlic-crackers.jpg", images: ["assets/img/products/paprika-and-garlic-crackers.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "herb-and-cheese-crackers", name: "Herb and Cheese Crackers", brand: "khowdy",
      cats: ["healthy-snacks"], price: 450, mrp: 517, rating: 5.0, reviews: 116,
      badges: ["SUGAR-FREE"], sizes: "jar", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "(120 gms) Crisp, golden-baked crackers crafted with a delicious blend of aromatic herbs, garlic powder, and rich white cheddar, brought toge...",
      long: "(120 gms) Crisp, golden-baked crackers crafted with a delicious blend of aromatic herbs, garlic powder, and rich white cheddar, brought together with vegan butter for a perfectly savoury bite. Each cracker offers a satisfying crunch, complemented by the earthy notes of herbs, the subtle warmth of garlic, and the creamy, cheesy flavour of white cheddar. Thoughtfully crafted to make everyday snacking a little more indulgent, these crackers are perfect for pairing with your favourite dips, serving on a festive grazing platter, or enjoying on their own whenever a savoury craving strikes. Gluten-Free | Contains Dairy",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Milk / Dairy"],
      customisable: false, image: "assets/img/products/herb-and-cheese-crackers.jpg", images: ["assets/img/products/herb-and-cheese-crackers.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "chocolate-kaju-katli-tart", name: "Chocolate Kaju Katli Tart", brand: "doughremi",
      cats: ["desserts", "pastries"], price: 600, mrp: 690, rating: 4.9, reviews: 231,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "(110 gms) A festive creation that brings together the richness of decadent chocolate and the timeless charm of Indian mithai. Crafted with a...",
      long: "(110 gms) A festive creation that brings together the richness of decadent chocolate and the timeless charm of Indian mithai. Crafted with a delicate almond flour tart shell, this indulgent treat features a smooth, rich dark chocolate ganache filling, finished with a layer of kaju katli for a traditional touch. Each bite offers a beautiful contrast of textures and flavours, from the delicate crunch of the tart shell to the velvety chocolate ganache and the familiar, nutty sweetness of kaju katli. A contemporary take on festive favourites, thoughtfully crafted to make every celebration a little more special. Perfect for festive gifting or savouring as an indulgent treat, this tart celebrates the best of Indian tradition and modern patisserie. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Almond flour, Belgian couverture chocolate, erythritol, grass-fed butter, fresh cream, vanilla.",
      allergens: ["Tree nuts (almond)"],
      customisable: false, image: "assets/img/products/chocolate-kaju-katli-tart.jpg", images: ["assets/img/products/chocolate-kaju-katli-tart.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "kesar-rabdi-basque-cheesecake", name: "Kesar Rabdi Basque Cheesecake", brand: "signature",
      cats: ["celebration-cakes", "desserts"], price: 1100, mrp: 1265, rating: 4.9, reviews: 175,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free"],
      desc: "(300 gms) A festive indulgence that brings together the richness of a classic Basque cheesecake and the timeless flavours of Indian mithai. ...",
      long: "(300 gms) A festive indulgence that brings together the richness of a classic Basque cheesecake and the timeless flavours of Indian mithai. Infused with the delicate aroma of kesar, this creamy cheesecake features a beautifully caramelised top and a luscious, melt-in-your-mouth texture. Finished with a generous layer of our house-made rabdi, sweetened with stevia and crafted without refined sugar, every bite brings together the warmth of saffron and the rich, creamy notes of traditional rabdi. This thoughtful fusion of Indian flavours and contemporary indulgence makes it a delightful addition to your festive celebrations. Perfect for sharing with loved ones or savouring as a special treat, it offers a mindful twist on a beloved festive favourite Refined Sugar-Free | Gluten-Free | Contains Dairy",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Milk / Dairy"],
      customisable: true, image: "assets/img/products/kesar-rabdi-basque-cheesecake.jpg", images: ["assets/img/products/kesar-rabdi-basque-cheesecake.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "pistachio-basque-cheesecake", name: "Pistachio Basque Cheesecake", brand: "signature",
      cats: ["celebration-cakes", "desserts"], price: 1300, mrp: 1494, rating: 4.8, reviews: 229,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free"],
      desc: "(300 gms) A decadent assortment of 12 rich dark chocolate fudge bites, topped with a delicate feuilletine crunch and our house-made sugar-fr...",
      long: "(300 gms) A decadent assortment of 12 rich dark chocolate fudge bites, topped with a delicate feuilletine crunch and our house-made sugar-free pistachio butter. Each bite brings together the deep, indulgent notes of dark chocolate, the nutty richness of pistachio, and a light, irresistible crunch for a beautifully balanced flavour experience. Thoughtfully crafted to combine indulgence with texture, these bite-sized treats are perfect for festive gifting, sharing with loved ones, or adding a touch of luxury to your celebrations. A modern take on festive indulgence, made to be savoured one bite at a time. Refined Sugar-Free | Gluten-Free | Contains Dairy",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/pistachio-basque-cheesecake.jpg", images: ["assets/img/products/pistachio-basque-cheesecake.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "pistachio-chocolate-fudge-bites", name: "Pistachio Chocolate Fudge Bites", brand: "doughremi",
      cats: ["chocolates", "desserts"], price: 1100, mrp: 1265, rating: 4.8, reviews: 116,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "(200 gms) A decadent assortment of 12 rich dark chocolate fudge bites, topped with a delicate feuilletine crunch and our house-made sugar-fr...",
      long: "(200 gms) A decadent assortment of 12 rich dark chocolate fudge bites, topped with a delicate feuilletine crunch and our house-made sugar-free pistachio butter. Each bite brings together the deep, indulgent notes of dark chocolate, the nutty richness of pistachio, and a light, irresistible crunch for a beautifully balanced flavour experience. Thoughtfully crafted to combine indulgence with texture, these bite-sized treats are perfect for festive gifting, sharing with loved ones, or adding a touch of luxury to your celebrations. A modern take on festive indulgence, made to be savoured one bite at a time. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Almond flour, Belgian couverture chocolate, erythritol, grass-fed butter, fresh cream, vanilla.",
      allergens: ["Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/pistachio-chocolate-fudge-bites.jpg", images: ["assets/img/products/pistachio-chocolate-fudge-bites.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "rasmalai-fudge-bites", name: "Rasmalai Fudge Bites", brand: "doughremi",
      cats: ["chocolates", "desserts"], price: 1000, mrp: 1150, rating: 5.0, reviews: 216,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "(200 gms) Inspired by the timeless indulgence of traditional rasmalai, these creamy, melt-in-your-mouth fudge bites bring together the nosta...",
      long: "(200 gms) Inspired by the timeless indulgence of traditional rasmalai, these creamy, melt-in-your-mouth fudge bites bring together the nostalgic flavours of a beloved Indian dessert in a delightful, contemporary form. Each bite is thoughtfully crafted to deliver a rich, smooth texture and a delicate sweetness, making it a festive treat to savour and share. Featuring 12 bite-sized pieces, this indulgent assortment is perfect for adding a touch of Indian tradition to your festive celebrations. Whether enjoyed after a festive meal, shared with loved ones, or presented as a thoughtful gift, these fudge bites make every occasion feel a little more special. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Processed in a facility handling tree nuts and dairy"],
      customisable: false, image: "assets/img/products/rasmalai-fudge-bites.jpg", images: ["assets/img/products/rasmalai-fudge-bites.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-praline-barks", name: "Chocolate Praline Barks", brand: "doughremi",
      cats: ["healthy-snacks", "desserts"], price: 550, mrp: 632, rating: 5.0, reviews: 98,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "(175 gms) A decadent chocolate indulgence topped with our house made sugar free cashew praline, sweetened with stevia for the perfect balanc...",
      long: "(175 gms) A decadent chocolate indulgence topped with our house made sugar free cashew praline, sweetened with stevia for the perfect balance of rich chocolate and nutty crunch. Crafted to bring together irresistible textures and deep, indulgent flavours, this festive bark is a thoughtful twist on a classic treat. Perfect for festive gifting or sharing with loved ones, it\u2019s a little moment of indulgence made for mindful celebrations. Refined Sugar-Free | Gluten-Free | Vegan",
      ingredients: "Almond flour, Belgian couverture chocolate, erythritol, grass-fed butter, fresh cream, vanilla.",
      allergens: ["Processed in a facility handling tree nuts and dairy"],
      customisable: false, image: "assets/img/products/chocolate-praline-barks.jpg", images: ["assets/img/products/chocolate-praline-barks.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "motichoor-barks", name: "Motichoor Barks", brand: "doughremi",
      cats: ["healthy-snacks", "desserts"], price: 500, mrp: 575, rating: 4.8, reviews: 212,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "(175 gms) A festive indulgence that brings together the charm of traditional Indian mithai and the delight of modern chocolate. Featuring a ...",
      long: "(175 gms) A festive indulgence that brings together the charm of traditional Indian mithai and the delight of modern chocolate. Featuring a smooth, creamy white chocolate base topped with delicate, sugar-free motichoor made from chickpea flour, this thoughtfully crafted bark offers a beautiful blend of creamy textures and nostalgic festive flavours. Perfect for festive gifting or sharing with loved ones, it\u2019s a contemporary twist on a classic favourite, crafted to make every celebration a little more special. Refined Sugar Free | Gluten Free | Vegan",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Processed in a facility handling tree nuts and dairy"],
      customisable: false, image: "assets/img/products/motichoor-barks.jpg", images: ["assets/img/products/motichoor-barks.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "hazelnut-mocha-opera-pastry", name: "Hazelnut Mocha Opera Pastry", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 540, mrp: 621, rating: 4.7, reviews: 248,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(300 gms) A decadent combination of sugar-free hazelnut mousse, dark chocolate cream, cashew praline and tiramisu cream,...",
      long: "(300 gms) A decadent combination of sugar-free hazelnut mousse, dark chocolate cream, cashew praline and tiramisu cream, layered together for the perfect balance of chocolate, hazelnut and coffee.",
      ingredients: "Almond flour, vegan butter, almond chocolate sponge, dairy free cream, tiramisu cream, dark chocolate cream, dark chocolate ganache, cocoa powder, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/hazelnut-mocha-opera-pastry.jpg", images: ["assets/img/products/hazelnut-mocha-opera-pastry.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "mocha-caramel-crunch-mini-cake", name: "Mocha Caramel Crunch Mini Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 690, mrp: 793, rating: 4.8, reviews: 83,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(350 gms) Decadent almond chocolate sponge layered with airy mocha mousse, house-made sugar-free caramel and delicate ca...",
      long: "(350 gms) Decadent almond chocolate sponge layered with airy mocha mousse, house-made sugar-free caramel and delicate cashew praline, all enrobed in a rich dark chocolate ganache",
      ingredients: "Almond flour, vegan butter, almond chocolate sponge, dairy free cream, mocha mousse, in house sugar free caramel sauce, sugar free cashew praline, dark chocolate ganache sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/mocha-caramel-crunch-mini-cake.jpg", images: ["assets/img/products/mocha-caramel-crunch-mini-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "vanilla-basque-cheesecake", name: "Vanilla Basque Cheesecake", brand: "signature",
      cats: ["celebration-cakes", "desserts"], price: 1700, mrp: 1954, rating: 5.0, reviews: 66,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "Creamy almond flour sugar free cream cheesecake with the signature burnt top and a perfectly caramelized finish. Enjoy i...",
      long: "Creamy almond flour sugar free cream cheesecake with the signature burnt top and a perfectly caramelized finish. Enjoy it as is or add our in house sugar free blueberry compote for a fruity, tangy finish (Contains Dairy)",
      ingredients: "Almond flour, butter, cream cheese, vanilla, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/vanilla-basque-cheesecake.jpg", images: ["assets/img/products/vanilla-basque-cheesecake.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "chocolate-basque-cheesecake", name: "Chocolate Basque Cheesecake", brand: "signature",
      cats: ["celebration-cakes", "desserts"], price: 1600, mrp: 1839, rating: 4.9, reviews: 52,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "Creamy almond chocolate cheesecake baked to create the classic caramelised Basque finish. (Contains Dairy) Ingredients A...",
      long: "Creamy almond chocolate cheesecake baked to create the classic caramelised Basque finish. (Contains Dairy)",
      ingredients: "Almond flour, butter, cream cheese, dark chocolate, chocolate ganache, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/chocolate-basque-cheesecake.jpg", images: ["assets/img/products/chocolate-basque-cheesecake.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "multi-grain-loaf", name: "Multi Grain Loaf", brand: "khowdy",
      cats: ["breads"], price: 315, mrp: 362, rating: 5.0, reviews: 177,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(480 gms) A soft multigrain loaf packed with the goodness of grains - perfect for everyday sandwiches and toast. (Contai...",
      long: "(480 gms) A soft multigrain loaf packed with the goodness of grains - perfect for everyday sandwiches and toast. (Contains Dairy) Shelf life and Storage Store in the fridge and consume within 10 days upon receiving. Dietary preference Refined sugar free | Gluten Free | Diabetic Friendly",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Milk / Dairy"],
      customisable: false, image: "assets/img/products/multi-grain-loaf.png", images: ["assets/img/products/multi-grain-loaf.png"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "triple-chocolate-crunch-mini-cake", name: "Triple Chocolate Crunch Mini Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 765, mrp: 879, rating: 4.9, reviews: 237,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A decadent trio of dark chocolate, milk chocolate and almond chocolate sponge, layered with rich cashew praline for a nu...",
      long: "A decadent trio of dark chocolate, milk chocolate and almond chocolate sponge, layered with rich cashew praline for a nutty crunch and finished with our signature cocoa biscuits. Deeply chocolatey, creamy and delightfully crunchy.",
      ingredients: "Almond flour, vegan butter, almond chocolate sponge, dark chocolate, milk chocolate, in house sugar free cashew praline, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/triple-chocolate-crunch-mini-cake.jpg", images: ["assets/img/products/triple-chocolate-crunch-mini-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "blueberry-cream-mini-cake", name: "Blueberry Cream Mini Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 650, mrp: 747, rating: 4.8, reviews: 129,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(300 gms) Delicate vanilla almond sponge layered with smooth dairy free cream and juicy blueberries, creating a light, c...",
      long: "(300 gms) Delicate vanilla almond sponge layered with smooth dairy free cream and juicy blueberries, creating a light, creamy and refreshingly fruity dessert.",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, fresh blueberries, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/blueberry-cream-mini-cake.jpg", images: ["assets/img/products/blueberry-cream-mini-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-blueberry-mini-cake", name: "Chocolate Blueberry Mini Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 765, mrp: 879, rating: 4.8, reviews: 276,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(300 gms) Rich almond chocolate sponge layered with indulgent dark chocolate ganache and bursts of juicy blueberries for...",
      long: "(300 gms) Rich almond chocolate sponge layered with indulgent dark chocolate ganache and bursts of juicy blueberries for the perfect balance of intense chocolate and refreshing berry flavour",
      ingredients: "Almond flour, vegan butter, almond chocolate sponge, dairy free cream, fresh blueberries, chocolate ganache, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/chocolate-blueberry-mini-cake.jpg", images: ["assets/img/products/chocolate-blueberry-mini-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "mix-fruit-mini-cake", name: "Mix Fruit Mini Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 765, mrp: 879, rating: 4.8, reviews: 170,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(320 gms) Delicate almond flour sponge with a hints of dairy free cream, layered with juicy berries, bright citrus and t...",
      long: "(320 gms) Delicate almond flour sponge with a hints of dairy free cream, layered with juicy berries, bright citrus and tropical pineapple - light, creamy and refreshingly fruity.",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, blueberries, oranges, pineapples, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/mix-fruit-mini-cake.jpg", images: ["assets/img/products/mix-fruit-mini-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "hazelnut-crunch-mini-cake", name: "Hazelnut Crunch Mini Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 670, mrp: 770, rating: 5.0, reviews: 69,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(300 gms) Layers of our almond chocolate sponge, centre - filled with creamy sugar free hazelnut butter, dark chocolate ...",
      long: "(300 gms) Layers of our almond chocolate sponge, centre - filled with creamy sugar free hazelnut butter, dark chocolate ganache and our in house hazelnut praline.",
      ingredients: "Almond flour, vegan butter, dark chocolate, dairy free cream, sugar free hazelnut praline, roasted hazelnuts, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/hazelnut-crunch-mini-cake.jpg", images: ["assets/img/products/hazelnut-crunch-mini-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "pineapple-cream-mini-cake", name: "Pineapple Cream Mini Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 530, mrp: 609, rating: 4.7, reviews: 52,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(300 gms) Layers of vanilla almond sponge layered with smooth dairy free cream and juicy fresh pineapple, topped with cr...",
      long: "(300 gms) Layers of vanilla almond sponge layered with smooth dairy free cream and juicy fresh pineapple, topped with crisp dehydrated pineapple for a refreshing burst of tropical flavour.",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, fresh pineapples, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/pineapple-cream-mini-cake.jpg", images: ["assets/img/products/pineapple-cream-mini-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "belgian-chocolate-mini-cake", name: "Belgian Chocolate Mini Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 620, mrp: 713, rating: 4.8, reviews: 244,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(300 gms) Layers of almond chocolate sponge enveloped in Belgian dark chocolate ganache for an irresistibly decadent fin...",
      long: "(300 gms) Layers of almond chocolate sponge enveloped in Belgian dark chocolate ganache for an irresistibly decadent finish",
      ingredients: "Almond flour, vegan butter, dark chocolate, dairy free cream, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/belgian-chocolate-mini-cake.jpg", images: ["assets/img/products/belgian-chocolate-mini-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "tiramisu-brownies", name: "Tiramisu Brownies", brand: "doughremi",
      cats: ["brownies", "pastries"], price: 1530, mrp: 1759, rating: 4.8, reviews: 66,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "8 pcs of fudgy almond flour brownies loaded with dark chocolate and layered with delicate tiramisu biscuits, bold espres...",
      long: "8 pcs of fudgy almond flour brownies loaded with dark chocolate and layered with delicate tiramisu biscuits, bold espresso and sugar free tiramisu cream. Rich, gooey and irresistibly indulgent.",
      ingredients: "Almond flour, vegan butter, dark chocolate, cookie dough, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/tiramisu-brownies.jpg", images: ["assets/img/products/tiramisu-brownies.jpg", "assets/img/products/tiramisu-brownies-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "triple-chocolate-crunch-cake-1", name: "Triple Chocolate Crunch Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1710, mrp: 1966, rating: 4.8, reviews: 231,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A decadent trio of dark chocolate, milk chocolate and almond chocolate sponge, layered with rich cashew praline for a nu...",
      long: "A decadent trio of dark chocolate, milk chocolate and almond chocolate sponge, layered with rich cashew praline for a nutty crunch and finished with our signature cocoa biscuits. Deeply chocolatey, creamy and delightfully crunchy.",
      ingredients: "Almond flour, vegan butter, almond chocolate sponge, dark chocolate, milk chocolate, in house sugar free cashew praline, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/triple-chocolate-crunch-cake-1.jpg", images: ["assets/img/products/triple-chocolate-crunch-cake-1.jpg", "assets/img/products/triple-chocolate-crunch-cake-1-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-caramel-noir-mini-cake", name: "Chocolate Caramel Noir Mini Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1200, mrp: 1380, rating: 4.9, reviews: 90,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Moist chocolate almond sponge meets dark chocolate ganache and light, creamy caramel, topped with caramel popcorn and cr...",
      long: "Moist chocolate almond sponge meets dark chocolate ganache and light, creamy caramel, topped with caramel popcorn and crisp sugar-free honeycomb for the perfect play of rich, creamy and crunchy.",
      ingredients: "Chocolate almond sponge, dark chocolate ganache, whipped sugar free caramel topped with caramel popcorn and sugar free honeycomb, sweetened with stevia.",
      allergens: ["Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/chocolate-caramel-noir-mini-cake.jpg", images: ["assets/img/products/chocolate-caramel-noir-mini-cake.jpg", "assets/img/products/chocolate-caramel-noir-mini-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "berry-chantilly-mini-cake", name: "Berry Chantilly Mini Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1500, mrp: 1724, rating: 4.9, reviews: 274,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(500 gms) Soft vanilla almond sponge meets dairy free chantilly cream and vibrant mixed berry jam, layered with fresh be...",
      long: "(500 gms) Soft vanilla almond sponge meets dairy free chantilly cream and vibrant mixed berry jam, layered with fresh berries and finished with delicate sugar-free meringue. Light, creamy and bursting with berry goodness.",
      ingredients: "Vanilla almond sponge, dairy free chantilly, sugar free mixed berry jam, fresh berries, sugar free meringue, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/berry-chantilly-mini-cake.jpg", images: ["assets/img/products/berry-chantilly-mini-cake.jpg", "assets/img/products/berry-chantilly-mini-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "marble-opulence-mini-cake", name: "Marble Opulence Mini Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1350, mrp: 1552, rating: 4.7, reviews: 155,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(500 gms) Layers of delicate marble almond sponge, rich dark chocolate ganache and creamy baked cheesecake, finished wit...",
      long: "(500 gms) Layers of delicate marble almond sponge, rich dark chocolate ganache and creamy baked cheesecake, finished with our housemade white chocolate mousse and sugar free almond praline. Topped with more white chocolate mousse and crunchy almond praline for the perfect balance of creamy, nutty and chocolatey. (Contains Dairy)",
      ingredients: "Marble almond sponge, sugar free baked cheesecake, dark chocolate ganache, white chocolate mousse, almond praline, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/marble-opulence-mini-cake.jpg", images: ["assets/img/products/marble-opulence-mini-cake.jpg", "assets/img/products/marble-opulence-mini-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "chocolate-caramel-noir-cake", name: "Chocolate Caramel Noir Cake", brand: "signature",
      cats: ["muffins"], price: 4000, mrp: 4600, rating: 4.7, reviews: 168,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(1500 gms) Moist chocolate almond sponge meets luscious dark chocolate ganache and light, creamy caramel, topped with ca...",
      long: "(1500 gms) Moist chocolate almond sponge meets luscious dark chocolate ganache and light, creamy caramel, topped with caramel popcorn and crisp sugar-free honeycomb for the perfect play of rich, creamy and crunchy. (Contains Dairy)",
      ingredients: "Chocolate almond sponge, dark chocolate ganache, whipped sugar free caramel topped with caramel popcorn and sugar free honeycomb, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/chocolate-caramel-noir-cake.jpg", images: ["assets/img/products/chocolate-caramel-noir-cake.jpg", "assets/img/products/chocolate-caramel-noir-cake-2.jpg", "assets/img/products/chocolate-caramel-noir-cake-3.jpg", "assets/img/products/chocolate-caramel-noir-cake-4.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "berry-chantilly-cake", name: "Berry Chantilly Cake", brand: "signature",
      cats: ["muffins"], price: 5000, mrp: 5750, rating: 4.7, reviews: 192,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(1500 gms) Soft vanilla almond sponge meets dairy free chantilly cream and vibrant mixed berry jam, layered with fresh b...",
      long: "(1500 gms) Soft vanilla almond sponge meets dairy free chantilly cream and vibrant mixed berry jam, layered with fresh berries and finished with delicate sugar-free meringue. Light, creamy and bursting with berry goodness.",
      ingredients: "Vanilla almond sponge, dairy free chantilly, sugar free mixed berry jam, fresh berries, sugar free meringue, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/berry-chantilly-cake.jpg", images: ["assets/img/products/berry-chantilly-cake.jpg", "assets/img/products/berry-chantilly-cake-2.jpg", "assets/img/products/berry-chantilly-cake-3.jpg", "assets/img/products/berry-chantilly-cake-4.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "marble-opulence-cake", name: "Marble Opulence Cake", brand: "signature",
      cats: ["muffins"], price: 4500, mrp: 5175, rating: 5.0, reviews: 226,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(1500 gms) Layers of delicate marble almond sponge, rich dark chocolate ganache and creamy baked cheesecake, finished wi...",
      long: "(1500 gms) Layers of delicate marble almond sponge, rich dark chocolate ganache and creamy baked cheesecake, finished with our housemade white chocolate mousse and sugar free almond praline. Topped with more white chocolate mousse and crunchy almond praline for the perfect balance of creamy, nutty and chocolatey. (Contains Dairy)",
      ingredients: "Marble almond sponge, sugar free baked cheesecake, dark chocolate ganache, white chocolate mousse, almond praline, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/marble-opulence-cake.jpg", images: ["assets/img/products/marble-opulence-cake.jpg", "assets/img/products/marble-opulence-cake-2.jpg", "assets/img/products/marble-opulence-cake-3.jpg", "assets/img/products/marble-opulence-cake-4.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "brown-butter-cookie-box", name: "Brown Butter Cookie Box", brand: "khowdy",
      cats: ["cookies"], price: 765, mrp: 879, rating: 4.9, reviews: 89,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 6 baked almond flour cookies made with vegan brown butter and loaded with chocolate chunks, bringing rich, nutty ...",
      long: "Box of 6 baked almond flour cookies made with vegan brown butter and loaded with chocolate chunks, bringing rich, nutty flavour and delicate caramel-like notes in every bite. (75 gms each)",
      ingredients: "Almond flour, vegan brown butter, dark chocolate chunks, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/brown-butter-cookie-box.jpg", images: ["assets/img/products/brown-butter-cookie-box.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "gooey-chocolate-muffins", name: "Gooey Chocolate Muffins", brand: "doughremi",
      cats: ["muffins"], price: 1260, mrp: 1449, rating: 4.7, reviews: 64,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 8 healthy chocolate muffins are incredibly rich and loaded with chocolate chips in every single bite (50 gms each...",
      long: "Box of 8 healthy chocolate muffins are incredibly rich and loaded with chocolate chips in every single bite (50 gms each)",
      ingredients: "Almond flour, vegan butter, dark chocolate, cacao, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/gooey-chocolate-muffins.jpg", images: ["assets/img/products/gooey-chocolate-muffins.jpg", "assets/img/products/gooey-chocolate-muffins-2.jpg", "assets/img/products/gooey-chocolate-muffins-3.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "classic-cinnamon-roll", name: "Classic Cinnamon Roll", brand: "doughremi",
      cats: ["healthy-snacks", "desserts"], price: 270, mrp: 310, rating: 4.9, reviews: 62,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(180 gms) Tender almond flour roll with generous layers of warm cinnamon and finished with a cream cheese frosting. The ...",
      long: "(180 gms) Tender almond flour roll with generous layers of warm cinnamon and finished with a cream cheese frosting. The kind of comfort you\u2019ll want on repeat. (Contains Dairy)",
      ingredients: "Almond flour, butter, cinnamon, cream cheese, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/classic-cinnamon-roll.jpg", images: ["assets/img/products/classic-cinnamon-roll.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "hazelnut-cinnamon-roll", name: "Hazelnut Cinnamon Roll", brand: "doughremi",
      cats: ["healthy-snacks", "desserts"], price: 315, mrp: 362, rating: 4.9, reviews: 243,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(190 gms) A soft-baked almond flour cinnamon roll layered with warm cinnamon and sugar free hazelnut butter, finished wi...",
      long: "(190 gms) A soft-baked almond flour cinnamon roll layered with warm cinnamon and sugar free hazelnut butter, finished with a rich, indulgent hazelnut praline and roasted hazelnuts. (Contains Dairy)",
      ingredients: "Almond flour, butter, cinnamon, sugar free hazelnut butter, sugar free hazelnut praline, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/hazelnut-cinnamon-roll.jpg", images: ["assets/img/products/hazelnut-cinnamon-roll.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "tiramisu-cinnamon-roll", name: "Tiramisu Cinnamon Roll", brand: "doughremi",
      cats: ["healthy-snacks", "desserts"], price: 360, mrp: 413, rating: 4.8, reviews: 200,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(190 gms) A soft-baked almond flour cinnamon roll infused with rich espresso and finished with a cream cheese frosting, ...",
      long: "(190 gms) A soft-baked almond flour cinnamon roll infused with rich espresso and finished with a cream cheese frosting, generously dusted with cocoa powder. Tiramisu meets cinnamon roll in the most delicious way. (Contains Dairy)",
      ingredients: "Almond flour, butter, cinnamon, sugar free tiramisu cream, cream cheese, dusted cocoa powder, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/tiramisu-cinnamon-roll.jpg", images: ["assets/img/products/tiramisu-cinnamon-roll.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "pistachio-cinnamon-roll", name: "Pistachio Cinnamon Roll", brand: "doughremi",
      cats: ["healthy-snacks", "desserts"], price: 360, mrp: 413, rating: 4.8, reviews: 139,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(185 gms) An almond flour cinnamon roll layered with cinnamon and sugar free pistachio butter, in house sugar free pista...",
      long: "(185 gms) An almond flour cinnamon roll layered with cinnamon and sugar free pistachio butter, in house sugar free pistachio praline and topped with crunchy crushed pistachios. (Contains Dairy)",
      ingredients: "Almond flour, butter, cinnamon, sugar free pistachio praline, sugar free pistachio butter, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/pistachio-cinnamon-roll.jpg", images: ["assets/img/products/pistachio-cinnamon-roll.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "brookie-box", name: "Brookie Box", brand: "doughremi",
      cats: ["brownies", "pastries"], price: 1350, mrp: 1552, rating: 4.8, reviews: 104,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Cookie or brownie? Why choose? 8 pcs of our almond flour brookies that give you the best of both worlds Ingredients Almo...",
      long: "Cookie or brownie? Why choose? 8 pcs of our almond flour brookies that give you the best of both worlds",
      ingredients: "Almond flour, vegan butter, dark chocolate, cookie dough, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/brookie-box.png", images: ["assets/img/products/brookie-box.png"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "hazelnut-melt-cookie-box", name: "Hazelnut Melt Cookie Box", brand: "doughremi",
      cats: ["cookies"], price: 855, mrp: 983, rating: 5.0, reviews: 246,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 6 soft baked almond flour cookies with a creamy hazelnut butter centre - made to melt in your mouth. (75 gms each...",
      long: "Box of 6 soft baked almond flour cookies with a creamy hazelnut butter centre - made to melt in your mouth. (75 gms each)",
      ingredients: "Almond flour, vegan butter, sugar free hazelnut butter, roasted hazelnuts, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/hazelnut-melt-cookie-box.png", images: ["assets/img/products/hazelnut-melt-cookie-box.png", "assets/img/products/hazelnut-melt-cookie-box-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "pistachio-chocolate-cookie-box", name: "Pistachio Chocolate Cookie Box", brand: "doughremi",
      cats: ["cookies"], price: 810, mrp: 931, rating: 4.9, reviews: 250,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Soft baked almond flour cookies with chocolate and roasted pistachios, sugar free pistachio butter for the perfect balan...",
      long: "Soft baked almond flour cookies with chocolate and roasted pistachios, sugar free pistachio butter for the perfect balance of chocolate and nutty crunch. (75 gms each)",
      ingredients: "Almond flour, vegan butter, sugar free pistachio butter, sugar free pistachio praline, dark chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/pistachio-chocolate-cookie-box.jpg", images: ["assets/img/products/pistachio-chocolate-cookie-box.jpg", "assets/img/products/pistachio-chocolate-cookie-box-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "double-chocolate-cookie-box", name: "Double Chocolate Cookie Box", brand: "doughremi",
      cats: ["cookies"], price: 765, mrp: 879, rating: 5.0, reviews: 185,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 6 soft baked almond flour chocolate cookies loaded with rich chocolate chunks for a double dose of chocolate in e...",
      long: "Box of 6 soft baked almond flour chocolate cookies loaded with rich chocolate chunks for a double dose of chocolate in every bite. (75 gms each)",
      ingredients: "Almond flour, vegan butter, dark chocolate, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/double-chocolate-cookie-box.jpg", images: ["assets/img/products/double-chocolate-cookie-box.jpg", "assets/img/products/double-chocolate-cookie-box-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "cacao-butter-cake", name: "Cacao Butter Cake", brand: "khowdy",
      cats: ["muffins"], price: 1395, mrp: 1604, rating: 4.9, reviews: 278,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "For those who like their desserts simple, with just the right touch of chocolate a soft almond flour cake made with rich...",
      long: "For those who like their desserts simple, with just the right touch of chocolate a soft almond flour cake made with rich cacao for a naturally chocolatey flavour and finished with chocolate chips",
      ingredients: "Almond flour, vegan butter, unsweetened cocoa powder, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/cacao-butter-cake.jpg", images: ["assets/img/products/cacao-butter-cake.jpg", "assets/img/products/cacao-butter-cake-2.png"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "filter-coffee-fudge-bites", name: "Filter Coffee Fudge Bites", brand: "khowdy",
      cats: ["chocolates", "desserts"], price: 900, mrp: 1035, rating: 5.0, reviews: 149,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "For the sibling who takes their coffee seriously. Sugar free fudge bites infused with the comforting flavour of classic filter coffee. A sin...",
      long: "For the sibling who takes their coffee seriously. Sugar free fudge bites infused with the comforting flavour of classic filter coffee. A single coffee-flavoured variety in bite-sized pieces. Sugar free, Gluten free & Vegan.",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Processed in a facility handling tree nuts and dairy"],
      customisable: false, image: "assets/img/products/filter-coffee-fudge-bites.jpg", images: ["assets/img/products/filter-coffee-fudge-bites.jpg", "assets/img/products/filter-coffee-fudge-bites-2.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "dark-chocolate-praline-fudge-bites", name: "Dark Chocolate Praline Fudge Bites", brand: "khowdy",
      cats: ["chocolates", "desserts"], price: 1000, mrp: 1150, rating: 4.8, reviews: 187,
      badges: ["SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "A festive Rakhi indulgence made of dark chocolate fudge, topped with our housemade sugar-free cashew praline. A single rich variety, crafted...",
      long: "A festive Rakhi indulgence made of dark chocolate fudge, topped with our housemade sugar-free cashew praline. A single rich variety, crafted for moments worth sharing. Sugar free, Gluten free & Vegan.",
      ingredients: "Almond flour, Belgian couverture chocolate, erythritol, grass-fed butter, fresh cream, vanilla.",
      allergens: ["Processed in a facility handling tree nuts and dairy"],
      customisable: false, image: "assets/img/products/dark-chocolate-praline-fudge-bites.jpg", images: ["assets/img/products/dark-chocolate-praline-fudge-bites.jpg", "assets/img/products/dark-chocolate-praline-fudge-bites-2.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "dark-chocolate-babka", name: "Dark Chocolate Babka", brand: "khowdy",
      cats: ["breads"], price: 1400, mrp: 1609, rating: 4.8, reviews: 164,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(580 gms) Our take on the classic babka - a soft almond flour dough, decadent dark chocolate and endless chocolatey swir...",
      long: "(580 gms) Our take on the classic babka - a soft almond flour dough, decadent dark chocolate and endless chocolatey swirls in every slice",
      ingredients: "Almond flour, vegan butter, dark chocolate ganache, cacao, milk, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/dark-chocolate-babka.png", images: ["assets/img/products/dark-chocolate-babka.png", "assets/img/products/dark-chocolate-babka-2.png"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "pistachio-babka", name: "Pistachio Babka", brand: "khowdy",
      cats: ["breads"], price: 1600, mrp: 1839, rating: 5.0, reviews: 264,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(520 gms) A soft baked almond flour babka layered with our in house sugar free pistachio butter in every swirl. Nutty, b...",
      long: "(520 gms) A soft baked almond flour babka layered with our in house sugar free pistachio butter in every swirl. Nutty, buttery and decadent, without the added sugar.",
      ingredients: "Almond flour, vegan butter, sugar free pistachio butter, milk, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/pistachio-babka.png", images: ["assets/img/products/pistachio-babka.png", "assets/img/products/pistachio-babka-2.png"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "ragi-loaf", name: "Ragi Loaf", brand: "khowdy",
      cats: ["breads"], price: 350, mrp: 402, rating: 4.8, reviews: 208,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(350 gms) A soft, wholesome ragi loaf made for everyday eating \u2013 perfect for your sandwiches, tost and more, the healthi...",
      long: "(350 gms) A soft, wholesome ragi loaf made for everyday eating \u2013 perfect for your sandwiches, tost and more, the healthier way Shelf life and Storage Store in the fridge and consume within 10 days upon receiving. Dietary preference Refined sugar free | Gluten Free | Diabetic Friendly",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Processed in a facility handling tree nuts and dairy"],
      customisable: false, image: "assets/img/products/ragi-loaf.png", images: ["assets/img/products/ragi-loaf.png"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "mixed-seed-loaf", name: "Mixed Seed Loaf", brand: "khowdy",
      cats: ["breads"], price: 500, mrp: 575, rating: 5.0, reviews: 98,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(550 gms) A soft, wholesome loaf packed with a mix of seeds for a nutritious crunch - perfect for everyday sandwiches an...",
      long: "(550 gms) A soft, wholesome loaf packed with a mix of seeds for a nutritious crunch - perfect for everyday sandwiches and toast. Shelf life and Storage Store in the fridge and consume within 10 days upon receiving. Dietary preference Refined sugar free | Gluten Free | Diabetic Friendly",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Processed in a facility handling tree nuts and dairy"],
      customisable: false, image: "assets/img/products/mixed-seed-loaf.png", images: ["assets/img/products/mixed-seed-loaf.png"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "almond-loaf", name: "Almond Loaf", brand: "khowdy",
      cats: ["breads"], price: 800, mrp: 919, rating: 4.8, reviews: 263,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "(480 gms) Our OG ingredient, now in a loaf. Soft, tender and naturally nutty, this wholesome almond flour bread brings t...",
      long: "(480 gms) Our OG ingredient, now in a loaf. Soft, tender and naturally nutty, this wholesome almond flour bread brings the signature artisanal goodness to your everyday slice. Shelf life and Storage Store in the fridge and consume within 10 days upon receiving. Dietary preference Refined sugar free | Gluten Free | Diabetic Friendly Suitable for a Keto Friendly Diet",
      ingredients: "now in a loaf. Soft, tender and naturally nutty, this wholesome almond flour bread brings the signature artisanal goodness to your everyday slice.",
      allergens: ["Tree nuts (almond)"],
      customisable: false, image: "assets/img/products/almond-loaf.png", images: ["assets/img/products/almond-loaf.png"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "brown-butter-cake", name: "Brown Butter Cake", brand: "khowdy",
      cats: ["muffins"], price: 1395, mrp: 1604, rating: 4.7, reviews: 179,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Almond flour cake with a rich, nutty flavour, subtle caramel-like notes and generous chocolate chips throughout Ingredie...",
      long: "Almond flour cake with a rich, nutty flavour, subtle caramel-like notes and generous chocolate chips throughout",
      ingredients: "Almond flour, vegan brown butter, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/brown-butter-cake.png", images: ["assets/img/products/brown-butter-cake.png"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "triple-chocolate-cheesecake-brownie", name: "Triple Chocolate Cheesecake Brownie", brand: "signature",
      cats: ["celebration-cakes", "desserts"], price: 1600, mrp: 1839, rating: 4.8, reviews: 132,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free"],
      desc: "An almond flour\u2013based, sugar-free triple chocolate brownie layered with a smooth cheesecake center. Rich cocoa depth meets fudgy texture in ...",
      long: "An almond flour\u2013based, sugar-free triple chocolate brownie layered with a smooth cheesecake center. Rich cocoa depth meets fudgy texture in every bite, balanced by a creamy contrast that melts seamlessly into the brownie beneath. Completely gluten-free and made without refined sugar, this decadent dessert delivers bold chocolate flavour and elegant indulgence- crafted for those who crave something deeply satisfying yet thoughtfully made. Sugar & Gluten Free",
      ingredients: "Almond flour, Belgian couverture chocolate, erythritol, grass-fed butter, fresh cream, vanilla.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/triple-chocolate-cheesecake-brownie.jpg", images: ["assets/img/products/triple-chocolate-cheesecake-brownie.jpg", "assets/img/products/triple-chocolate-cheesecake-brownie-2.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "chocolate-flourless-cake", name: "Chocolate Flourless Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1530, mrp: 1759, rating: 4.8, reviews: 282,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A rich and gooey dark chocolate cake with a molten chocolate centre Ingredients Almond flour, vegan butter, flaxseeds, d...",
      long: "A rich and gooey dark chocolate cake with a molten chocolate centre",
      ingredients: "Almond flour, vegan butter, flaxseeds, dark chocolate, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/chocolate-flourless-cake.jpg", images: ["assets/img/products/chocolate-flourless-cake.jpg", "assets/img/products/chocolate-flourless-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-banana-walnut-teacake", name: "Banana Walnut Teacake", brand: "doughremi",
      cats: ["muffins"], price: 1500, mrp: 1724, rating: 4.8, reviews: 116,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Our signature teacake and our forever bestseller, made with the wholesome goodness of almond flour, ripe bananas, r...",
      long: "Our signature teacake and our forever bestseller, made with the wholesome goodness of almond flour, ripe bananas, rich dark chocolate and crunchy walnuts. Moist, comforting and deeply indulgent, this is the one to choose if you\u2019re trying just one of our teacakes.",
      ingredients: "Almond flour, vegan butter, ripe bananas, dark chocolate, walnuts, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/chocolate-banana-walnut-teacake.jpg", images: ["assets/img/products/chocolate-banana-walnut-teacake.jpg", "assets/img/products/chocolate-banana-walnut-teacake-2.jpg", "assets/img/products/chocolate-banana-walnut-teacake-3.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "rakhi-cake", name: "Chocolate Mousse Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1700, mrp: 1954, rating: 4.7, reviews: 245,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free"],
      desc: "Three layers of milk, white and dark chocolate with a crisp praline center on a soft gluten free sponge base. Sugar & gluten free. Celebrate...",
      long: "Three layers of milk, white and dark chocolate with a crisp praline center on a soft gluten free sponge base. Sugar & gluten free. Celebrate the special bond of Rakhi with our expertly crafted Rakhi Cake.",
      ingredients: "Almond flour, Belgian couverture chocolate, erythritol, grass-fed butter, fresh cream, vanilla.",
      allergens: ["Milk / Dairy"],
      customisable: true, image: "assets/img/products/rakhi-cake.jpg", images: ["assets/img/products/rakhi-cake.jpg", "assets/img/products/rakhi-cake-2.jpg", "assets/img/products/rakhi-cake-3.jpg", "assets/img/products/rakhi-cake-4.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "opera-cake", name: "Hazelnut Mocha Opera Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1530, mrp: 1759, rating: 5.0, reviews: 48,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A decadent combination of sugar-free hazelnut mousse, dark chocolate cream, cashew praline and tiramisu cream, layered t...",
      long: "A decadent combination of sugar-free hazelnut mousse, dark chocolate cream, cashew praline and tiramisu cream, layered together for the perfect balance of chocolate, hazelnut and coffee.",
      ingredients: "Almond flour, vegan butter, almond chocolate sponge, dairy free cream, tiramisu cream, dark chocolate cream, dark chocolate ganache, cocoa powder, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/opera-cake.jpg", images: ["assets/img/products/opera-cake.jpg", "assets/img/products/opera-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "mocha-caramel-crunch-cake", name: "Mocha Caramel Crunch Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1700, mrp: 1954, rating: 5.0, reviews: 198,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Decadent almond chocolate sponge layered with airy mocha mousse, house-made sugar-free caramel and delicate cashew prali...",
      long: "Decadent almond chocolate sponge layered with airy mocha mousse, house-made sugar-free caramel and delicate cashew praline, all enrobed in a rich dark chocolate ganache",
      ingredients: "Almond flour, vegan butter, almond chocolate sponge, dairy free cream, mocha mousse, in house sugar free caramel sauce, sugar free cashew praline, dark chocolate ganache sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/mocha-caramel-crunch-cake.png", images: ["assets/img/products/mocha-caramel-crunch-cake.png"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "apple-cinnamon-teacake", name: "Apple Cinnamon Teacake", brand: "doughremi",
      cats: ["muffins"], price: 1500, mrp: 1724, rating: 5.0, reviews: 137,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Almond flour based moist sponge with our in house sugar free apple sauce filling, topped with a cinnamon and apple crumb...",
      long: "Almond flour based moist sponge with our in house sugar free apple sauce filling, topped with a cinnamon and apple crumble",
      ingredients: "Almond flour, vegan butter, sugar free apple sauce, apples, cinnamon.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/apple-cinnamon-teacake.jpg", images: ["assets/img/products/apple-cinnamon-teacake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "dessert-table", name: "Grazing Table", brand: "doughremi",
      cats: ["healthy-snacks", "desserts"], price: 18000, mrp: 20700, rating: 4.7, reviews: 112,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free"],
      desc: "This grazing table inlcudes: Mini dense triple chocolate brownies Short glasses -Rose pistachio rabbi mousse, Blueberry cheesecake, Chocolat...",
      long: "This grazing table inlcudes: Mini dense triple chocolate brownies Short glasses -Rose pistachio rabbi mousse, Blueberry cheesecake, Chocolate pistachio mousse and Triple chocolate (12 no. - 3 each flavour) Mini chocolate bundt cake (12 no.) Donuts - Milk & Dark chocolate and Hazelnut rocher (10 no. - 5 each flavour) Mini Teacakes - Masala chai, Orange pistachio and Chocolate banana walnut (12 no. - 4 each flavour) Cheese Platter (This includes 25 cheese crackers, 25 mix seed chilli crackers, Chives & chilli cheese block (100g), Truffle pepper cheese block (100g), Roasted bell pepper hummus (200g), Pesto (200g), Grapes, Blueberries Kiwi and Roasted almonds",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (almond)", "Tree nuts (pistachio)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/dessert-table.jpg", images: ["assets/img/products/dessert-table.jpg", "assets/img/products/dessert-table-2.jpg", "assets/img/products/dessert-table-3.png"],
      tags: ["sugar-free", "doughremi"]
    },
    {
      id: "vanilla-roasted-almond-muffins", name: "Vanilla Roasted Almond Muffins", brand: "doughremi",
      cats: ["muffins"], price: 1260, mrp: 1449, rating: 4.7, reviews: 184,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 8 almond based muffins with a soft milk chocolate centre along with an almond crunch (50 gms each) Ingredients Al...",
      long: "Box of 8 almond based muffins with a soft milk chocolate centre along with an almond crunch (50 gms each)",
      ingredients: "Almond flour, vegan butter, milk chocolate, roasted almond flakes, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/vanilla-roasted-almond-muffins.jpg", images: ["assets/img/products/vanilla-roasted-almond-muffins.jpg", "assets/img/products/vanilla-roasted-almond-muffins-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-sinner-cake", name: "Chocolate Sinner Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1800, mrp: 2070, rating: 4.7, reviews: 112,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto"],
      desc: "Dense chocolate mousse | Hazelnut cheesecake | Hazelnut praline | Milk chocolate ganache | Dark chocolate ganache...",
      long: "Dense chocolate mousse | Hazelnut cheesecake | Hazelnut praline | Milk chocolate ganache | Dark chocolate ganache",
      ingredients: "Almond flour, hazelnuts, dark chocolate, cacao, coconut oil, sugar free milk chocolate, hazelnut butter, sweetner, cashew, and coconut cream.",
      allergens: ["Tree nuts (almond)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/chocolate-sinner-cake.jpg", images: ["assets/img/products/chocolate-sinner-cake.jpg", "assets/img/products/chocolate-sinner-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-blueberry-tart", name: "Chocolate Blueberry Tart", brand: "signature",
      cats: ["desserts", "pastries"], price: 2600, mrp: 2989, rating: 4.9, reviews: 67,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(750 gms) Almond crust filled with rich belgian chocolate ganache, topped with fresh blueberries and raspberries. (Raspb...",
      long: "(750 gms) Almond crust filled with rich belgian chocolate ganache, topped with fresh blueberries and raspberries. (Raspberries only on availability)",
      ingredients: "Almond flour, vegan butter, dark chocolate ganache, fresh blueberries, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/chocolate-blueberry-tart.jpg", images: ["assets/img/products/chocolate-blueberry-tart.jpg", "assets/img/products/chocolate-blueberry-tart-2.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "dark-chocolate-hazelnut-tart", name: "Dark Chocolate Hazelnut Tart", brand: "signature",
      cats: ["desserts", "pastries"], price: 2300, mrp: 2645, rating: 4.8, reviews: 128,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(750 gms) Almond flour crust, filled with dark chocolate ganache, sugar free hazelnut butter, sugar free hazelnut pralin...",
      long: "(750 gms) Almond flour crust, filled with dark chocolate ganache, sugar free hazelnut butter, sugar free hazelnut praline and roasted hazelnuts",
      ingredients: "Almond flour, vegan butter, dark chocolate ganache, sugar free hazelnut butter, sugar free hazelnut praline, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/dark-chocolate-hazelnut-tart.jpg", images: ["assets/img/products/dark-chocolate-hazelnut-tart.jpg"],
      tags: ["sugar-free", "gluten-free", "signature"]
    },
    {
      id: "pistachio-raspberry-cake", name: "Pistachio Raspberry Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1800, mrp: 2070, rating: 4.9, reviews: 217,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Layers of moist almond pistachio-infused sponge paired with our housemade sugar free raspberry compote, bringing togethe...",
      long: "Layers of moist almond pistachio-infused sponge paired with our housemade sugar free raspberry compote, bringing together the delicate nuttiness of pistachio with the vibrant sweet tart freshness of raspberries.",
      ingredients: "Almond flour, vegan butter, almond pistachio sponge, dairy free cream, raspberries, sugar free raspberry compote, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/pistachio-raspberry-cake.jpg", images: ["assets/img/products/pistachio-raspberry-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "gooey-double-chocolate-cookies", name: "Gooey Chocolate Cookie Box", brand: "doughremi",
      cats: ["cookies"], price: 810, mrp: 931, rating: 4.8, reviews: 106,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 6 almond flour cookies loaded with chocolate chunks (75 gms each) Ingredients Almond flour, vegan butter, dark ch...",
      long: "Box of 6 almond flour cookies loaded with chocolate chunks (75 gms each)",
      ingredients: "Almond flour, vegan butter, dark chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/gooey-double-chocolate-cookies.png", images: ["assets/img/products/gooey-double-chocolate-cookies.png", "assets/img/products/gooey-double-chocolate-cookies-2.jpg", "assets/img/products/gooey-double-chocolate-cookies-3.jpg", "assets/img/products/gooey-double-chocolate-cookies-4.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "hazelnut-butter-brownies", name: "Hazelnut Butter Brownies", brand: "khowdy",
      cats: ["brownies", "pastries"], price: 1350, mrp: 1552, rating: 5.0, reviews: 85,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 8 gooey almond chocolate brownies finished with toasted almond flakes for a delicious crunch in every bite...",
      long: "Box of 8 gooey almond chocolate brownies finished with toasted almond flakes for a delicious crunch in every bite",
      ingredients: "Almond flour, vegan butter, dark chocolate, roasted almonds, roasted almond flakes, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/hazelnut-butter-brownies.jpg", images: ["assets/img/products/hazelnut-butter-brownies.jpg", "assets/img/products/hazelnut-butter-brownies-2.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "choco-almond-crunch-brownies", name: "Choco Almond Crunch Brownies", brand: "doughremi",
      cats: ["brownies", "pastries"], price: 1300, mrp: 1494, rating: 4.8, reviews: 81,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 8 gooey almond chocolate brownies finished with toasted almond flakes for a delicious crunch in every bite...",
      long: "Box of 8 gooey almond chocolate brownies finished with toasted almond flakes for a delicious crunch in every bite",
      ingredients: "Almond flour, vegan butter, dark chocolate, roasted almonds, roasted almond flakes, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/choco-almond-crunch-brownies.jpg", images: ["assets/img/products/choco-almond-crunch-brownies.jpg", "assets/img/products/choco-almond-crunch-brownies-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "dark-chocolate-orange-brownies", name: "Dark Chocolate Orange Brownies", brand: "doughremi",
      cats: ["brownies", "pastries"], price: 1400, mrp: 1609, rating: 4.8, reviews: 96,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 8 fudgy dark chocolate almond flour based brownies with fresh orange juice and zest topped with dark chocolate ch...",
      long: "Box of 8 fudgy dark chocolate almond flour based brownies with fresh orange juice and zest topped with dark chocolate chunks",
      ingredients: "Almond flour, vegan butter, dark chocolate, fresh orange zest, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/dark-chocolate-orange-brownies.jpg", images: ["assets/img/products/dark-chocolate-orange-brownies.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "fudgy-walnut-brownies", name: "Fudgy Walnut Brownies", brand: "doughremi",
      cats: ["brownies", "pastries"], price: 1400, mrp: 1609, rating: 4.9, reviews: 192,
      badges: ["SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 8 almond flour chocolate brownies loaded with roasted walnuts for a fudgy centre and a satisfying crunch in every...",
      long: "Box of 8 almond flour chocolate brownies loaded with roasted walnuts for a fudgy centre and a satisfying crunch in every bite",
      ingredients: "Almond flour, vegan butter, dark chocolate, roasted walnuts, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/fudgy-walnut-brownies.jpg", images: ["assets/img/products/fudgy-walnut-brownies.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "date-and-walnut-teacake", name: "Date and Walnut Teacake", brand: "doughremi",
      cats: ["muffins"], price: 1450, mrp: 1667, rating: 4.9, reviews: 82,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Naturally sweet dates and roasted walnuts come together in this moist, tender cake finished with a delicious crunch in e...",
      long: "Naturally sweet dates and roasted walnuts come together in this moist, tender cake finished with a delicious crunch in every bite.",
      ingredients: "Almond flour, vegan butter, dates, walnuts, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/date-and-walnut-teacake.jpg", images: ["assets/img/products/date-and-walnut-teacake.jpg", "assets/img/products/date-and-walnut-teacake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "carrot-teacake", name: "Carrot Teacake", brand: "doughremi",
      cats: ["muffins"], price: 1400, mrp: 1609, rating: 4.9, reviews: 230,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A classic moist almond flour sponge infused with shredded carrots and walnuts Ingredients Almond flour, vegan butter, ca...",
      long: "A classic moist almond flour sponge infused with shredded carrots and walnuts",
      ingredients: "Almond flour, vegan butter, carrots, walnuts, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/carrot-teacake.jpg", images: ["assets/img/products/carrot-teacake.jpg", "assets/img/products/carrot-teacake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "drak-chocolate-orange-teacake", name: "Dark Chocolate Orange Teacake", brand: "doughremi",
      cats: ["muffins"], price: 1400, mrp: 1609, rating: 4.7, reviews: 60,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A gooey chocolate teacake infused with candied oranges, fresh orange juice and zest, topped with dark chocolate chunks I...",
      long: "A gooey chocolate teacake infused with candied oranges, fresh orange juice and zest, topped with dark chocolate chunks",
      ingredients: "Almond flour, vegan butter, candied oranges, fresh orange juice, orange zest, dark chocolate, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/drak-chocolate-orange-teacake.jpg", images: ["assets/img/products/drak-chocolate-orange-teacake.jpg", "assets/img/products/drak-chocolate-orange-teacake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "gooey-choco-chips-teacake", name: "Gooey Chocolate Teacake", brand: "doughremi",
      cats: ["muffins"], price: 1450, mrp: 1667, rating: 4.9, reviews: 74,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Almond flour based gooey chocolate teacake with dark chocolate chunks Ingredients Almond flour, vegan butter, unsweetene...",
      long: "Almond flour based gooey chocolate teacake with dark chocolate chunks",
      ingredients: "Almond flour, vegan butter, unsweetened cacao powder, dark chocolate, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/gooey-choco-chips-teacake.jpg", images: ["assets/img/products/gooey-choco-chips-teacake.jpg", "assets/img/products/gooey-choco-chips-teacake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "choco-nutty-tea-loaf", name: "Choco Nutty Tea Loaf", brand: "khowdy",
      cats: ["muffins"], price: 1400, mrp: 1609, rating: 4.7, reviews: 155,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A soft chocolate almond teacake loaded with roasted nuts and chocolate chips for a deliciously nutty, chocolatey bite. I...",
      long: "A soft chocolate almond teacake loaded with roasted nuts and chocolate chips for a deliciously nutty, chocolatey bite.",
      ingredients: "Almond flour, vegan butter, roasted nuts, chocolate chips, roasted almond flakes, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/choco-nutty-tea-loaf.jpg", images: ["assets/img/products/choco-nutty-tea-loaf.jpg", "assets/img/products/choco-nutty-tea-loaf-2.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "choco-latte-tea-loaf", name: "Choco Latte Tea Loaf", brand: "khowdy",
      cats: ["muffins"], price: 1450, mrp: 1667, rating: 4.7, reviews: 191,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A soft chocolate almond teacake infused with coffee for the perfect chocolate-coffee combination Ingredients Almond flou...",
      long: "A soft chocolate almond teacake infused with coffee for the perfect chocolate-coffee combination",
      ingredients: "Almond flour, vegan butter, espresso, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/choco-latte-tea-loaf.jpg", images: ["assets/img/products/choco-latte-tea-loaf.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "pineapple-coconut-tea-loaf", name: "Pineapple Coconut Tea Loaf", brand: "khowdy",
      cats: ["muffins"], price: 1350, mrp: 1552, rating: 4.8, reviews: 248,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "An almond flour teacake infused with coconut and juicy pineapple for a light, tropical flavour in every bite Ingredients...",
      long: "An almond flour teacake infused with coconut and juicy pineapple for a light, tropical flavour in every bite",
      ingredients: "Almond flour, vegan butter, coconut cream, coconut milk, pineapples, dehydrated pineapples, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/pineapple-coconut-tea-loaf.jpg", images: ["assets/img/products/pineapple-coconut-tea-loaf.jpg", "assets/img/products/pineapple-coconut-tea-loaf-2.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "lemon-blueberry-teaccake", name: "Lemon Blueberry Teacake", brand: "doughremi",
      cats: ["muffins"], price: 1500, mrp: 1724, rating: 4.9, reviews: 245,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Zesty lemon and juicy blueberries come together in this moist, tender sponge - a bright and refreshing match made in hea...",
      long: "Zesty lemon and juicy blueberries come together in this moist, tender sponge - a bright and refreshing match made in heaven.",
      ingredients: "Almond flour, vegan butter, lemon zest, blueberries, topped with dairy free cream sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/lemon-blueberry-teaccake.jpg", images: ["assets/img/products/lemon-blueberry-teaccake.jpg", "assets/img/products/lemon-blueberry-teaccake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "vanilla-roasted-almond-teacake", name: "Vanilla Roasted Almond Tea Loaf", brand: "khowdy",
      cats: ["muffins"], price: 1350, mrp: 1552, rating: 4.8, reviews: 66,
      badges: ["SUGAR-FREE"], sizes: "loaf", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A soft vanilla almond tea loaf with chocolate chips and roasted almond flakes - a favourite ever since we launched it. I...",
      long: "A soft vanilla almond tea loaf with chocolate chips and roasted almond flakes - a favourite ever since we launched it.",
      ingredients: "Almond flour, vegan butter, vanilla, chocolate chips, roasted almond flakes, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/vanilla-roasted-almond-teacake.jpg", images: ["assets/img/products/vanilla-roasted-almond-teacake.jpg"],
      tags: ["sugar-free", "gluten-free", "khowdy"]
    },
    {
      id: "pistachio-nutella-cake", name: "Pistachio Nutella Melt Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 3200, mrp: 3679, rating: 4.8, reviews: 122,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "vegan"],
      desc: "Super moist cake with layers of pistachio brownie soaked in nut milk, vegan nutella, dark chocolate ganache, pistachio mousse and butter and...",
      long: "Super moist cake with layers of pistachio brownie soaked in nut milk, vegan nutella, dark chocolate ganache, pistachio mousse and butter and almond crunch served with chocolate ganache and pistachio spread in a jar. Sugar & Gluten Free.",
      ingredients: "Almond flour, natural erythritol blend, dairy cream, grass-fed butter, cold-pressed oils.",
      allergens: ["Tree nuts (almond)", "Tree nuts (pistachio)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/pistachio-nutella-cake.jpg", images: ["assets/img/products/pistachio-nutella-cake.jpg", "assets/img/products/pistachio-nutella-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "tropical-delight-cake", name: "Mix Fruit Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1530, mrp: 1759, rating: 4.7, reviews: 290,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Delicate almond flour sponge with a hints of dairy free cream, layered with juicy berries, bright citrus and tropical pi...",
      long: "Delicate almond flour sponge with a hints of dairy free cream, layered with juicy berries, bright citrus and tropical pineapple - light, creamy and refreshingly fruity.",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, blueberries, oranges, pineapples, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/tropical-delight-cake.jpg", images: ["assets/img/products/tropical-delight-cake.jpg", "assets/img/products/tropical-delight-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "classic-tiramisu-cake", name: "Classic Tiramisu Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1440, mrp: 1655, rating: 4.9, reviews: 99,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "A classic almond vanilla sponge layered with sugar free coffee cream, tiramisu biscuits and dusted with cocoa powder Ing...",
      long: "A classic almond vanilla sponge layered with sugar free coffee cream, tiramisu biscuits and dusted with cocoa powder",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, coffee cream, tiramisu biscuits, cocoa powder, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/classic-tiramisu-cake.jpg", images: ["assets/img/products/classic-tiramisu-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-tiramisu", name: "Hot Chocolate Tiramisu", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 2700, mrp: 3104, rating: 4.9, reviews: 245,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "(750 gms) Our bestseller for years - soft almond vanilla sponge soaked in espresso, layered with sugar free tiramisu cre...",
      long: "(750 gms) Our bestseller for years - soft almond vanilla sponge soaked in espresso, layered with sugar free tiramisu cream, tiramisu biscuits, smooth dairy-free cream and rich dark chocolate ganache. Truly, a decadent take on the classic tiramisu.",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, espresso, sugar free tiramisu cream, tiramisu biscuits, chocolate ganache, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/chocolate-tiramisu.jpg", images: ["assets/img/products/chocolate-tiramisu.jpg", "assets/img/products/chocolate-tiramisu-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "french-opera", name: "French Opera", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1650, mrp: 1897, rating: 4.9, reviews: 200,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Delicate almond vanilla sponge layered with tiramisu cream, chocolate cream, rich dark chocolate ganache and coffee - a ...",
      long: "Delicate almond vanilla sponge layered with tiramisu cream, chocolate cream, rich dark chocolate ganache and coffee - a decadent blend of chocolate and coffee in every layer",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, tiramisu cream, chocolate cream, dark chocolate ganache, cocoa powder, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/french-opera.jpg", images: ["assets/img/products/french-opera.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "mix-cream-cake", name: "Blueberry Cream Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1530, mrp: 1759, rating: 4.9, reviews: 255,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Delicate vanilla almond sponge layered with smooth dairy free cream and juicy blueberries, creating a light, creamy and ...",
      long: "Delicate vanilla almond sponge layered with smooth dairy free cream and juicy blueberries, creating a light, creamy and refreshingly fruity dessert.",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, fresh blueberries, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/mix-cream-cake.jpg", images: ["assets/img/products/mix-cream-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-mix-berry-cake", name: "Chocolate Blueberry Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1800, mrp: 2070, rating: 4.8, reviews: 221,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Rich almond chocolate sponge layered with indulgent dark chocolate ganache and bursts of juicy blueberries for the perfe...",
      long: "Rich almond chocolate sponge layered with indulgent dark chocolate ganache and bursts of juicy blueberries for the perfect balance of intense chocolate and refreshing berry flavour",
      ingredients: "Almond flour, vegan butter, almond chocolate sponge, dairy free cream, fresh blueberries, chocolate ganache, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/chocolate-mix-berry-cake.jpg", images: ["assets/img/products/chocolate-mix-berry-cake.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "salted-caramel-brownie", name: "Salted Caramel Brownie", brand: "doughremi",
      cats: ["brownies", "pastries"], price: 1600, mrp: 1839, rating: 5.0, reviews: 155,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 8 rich almond flour brownies layered with our signature sugar free salted caramel for the perfect balance of swee...",
      long: "Box of 8 rich almond flour brownies layered with our signature sugar free salted caramel for the perfect balance of sweet-salty indulgence that too guilt-free",
      ingredients: "Almond flour, vegan butter, in house sugar free caramel sauce, milk chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/salted-caramel-brownie.jpg", images: ["assets/img/products/salted-caramel-brownie.jpg", "assets/img/products/salted-caramel-brownie-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "chocolate-overload-brownie", name: "Chocolate Overload Brownie", brand: "doughremi",
      cats: ["brownies", "pastries"], price: 1530, mrp: 1759, rating: 4.7, reviews: 192,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "box", occasions: ["festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Box of 8 almond flour double chocolate gooey brownies, loaded with dark chocolate chunks for a rich, fudgy centre and ch...",
      long: "Box of 8 almond flour double chocolate gooey brownies, loaded with dark chocolate chunks for a rich, fudgy centre and chocolate in every bite",
      ingredients: "Almond flour, vegan butter, unsweetened cocoa powder, dark chocolate, chocolate chips, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: false, image: "assets/img/products/chocolate-overload-brownie.jpg", images: ["assets/img/products/chocolate-overload-brownie.jpg", "assets/img/products/chocolate-overload-brownie-2.jpg", "assets/img/products/chocolate-overload-brownie-3.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "pineapple-cream-cake", name: "Pineapple Cream Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1440, mrp: 1655, rating: 4.7, reviews: 108,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Layers of vanilla almond sponge layered with smooth dairy free cream and juicy fresh pineapple, topped with crisp dehydr...",
      long: "Layers of vanilla almond sponge layered with smooth dairy free cream and juicy fresh pineapple, topped with crisp dehydrated pineapple for a refreshing burst of tropical flavour.",
      ingredients: "Almond flour, vegan butter, almond vanilla sponge, dairy free cream, fresh pineapples, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/pineapple-cream-cake.jpg", images: ["assets/img/products/pineapple-cream-cake.jpg", "assets/img/products/pineapple-cream-cake-2.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "belgian-chocolate-cake-1", name: "Belgian Chocolate Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1440, mrp: 1655, rating: 4.8, reviews: 165,
      badges: ["SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Layers of almond chocolate sponge enveloped in Belgian dark chocolate ganache for an irresistibly decadent finish...",
      long: "Layers of almond chocolate sponge enveloped in Belgian dark chocolate ganache for an irresistibly decadent finish",
      ingredients: "Almond flour, vegan butter, dark chocolate, dairy free cream, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/belgian-chocolate-cake-1.jpg", images: ["assets/img/products/belgian-chocolate-cake-1.jpg", "assets/img/products/belgian-chocolate-cake-1-2.png"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },
    {
      id: "belgian-chocolate-cake", name: "Hazelnut Crunch Cake", brand: "doughremi",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1660, mrp: 1908, rating: 4.9, reviews: 59,
      badges: ["BESTSELLER", "SUGAR-FREE"], sizes: "cake", occasions: ["birthday", "anniversary", "festival", "corporate"],
      diet: ["sugar-free", "gluten-free", "keto", "vegan"],
      desc: "Layers of our almond chocolate sponge, centre - filled with creamy sugar free hazelnut butter, dark chocolate ganache an...",
      long: "Layers of our almond chocolate sponge, centre - filled with creamy sugar free hazelnut butter, dark chocolate ganache and our in house hazelnut praline.",
      ingredients: "Almond flour, vegan butter, dark chocolate, dairy free cream, sugar free hazelnut praline, roasted hazelnuts, sweetened with stevia.",
      allergens: ["Tree nuts (almond)", "Tree nuts (hazelnut)", "Milk / Dairy"],
      customisable: true, image: "assets/img/products/belgian-chocolate-cake.jpg", images: ["assets/img/products/belgian-chocolate-cake.jpg", "assets/img/products/belgian-chocolate-cake-1.jpg", "assets/img/products/belgian-chocolate-cake-2.jpg", "assets/img/products/belgian-chocolate-cake-3.jpg"],
      tags: ["sugar-free", "gluten-free", "doughremi"]
    },

    /* ========================= CORE ARCHIVE PRODUCTS ========================= */
    /* ------------------------- SAiPH Signature ------------------------- */
    {
      id: "gold-leaf-saffron-cheesecake", name: "Gold Leaf Saffron Cheesecake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 3250, mrp: 3650, rating: 4.9, reviews: 214,
      badges: ["SIGNATURE", "BESTSELLER"], sizes: "cake", occasions: ["anniversary", "wedding", "corporate", "festival"],
      diet: ["eggless"],
      desc: "Kashmiri saffron custard over a pistachio sablé base, finished with 24k edible gold leaf.",
      long: "Our most requested Signature centrepiece. Kashmiri saffron is bloomed in warm cream overnight, folded through a Philadelphia-style baked custard and set over a hand-pressed pistachio sablé. The top is mirror-glazed, dressed with candied rose petals and finished with a single sheet of 24k edible gold leaf applied by hand in our chocolate room.",
      ingredients: "Cream cheese, fresh cream, cane sugar, pasteurised eggs, French T45 pastry flour, clarified butter, Kashmiri saffron, pistachio, white couverture chocolate, gelatine (bovine-free), edible 24k gold leaf, rose petals.",
      allergens: ["Milk", "Wheat", "Eggs", "Tree nuts (pistachio)"],
      customisable: true, image: "assets/img/products/kesar-rabdi-basque-cheesecake.jpg", tags: ["mirror glaze", "gold leaf", "saffron"]
    },
    {
      id: "assam-tea-opera", name: "Assam Tea Opera", brand: "signature",
      cats: ["celebration-cakes", "pastries"], price: 2450, rating: 4.8, reviews: 168,
      badges: ["SIGNATURE"], sizes: "cake", occasions: ["anniversary", "corporate", "festival"],
      desc: "Seven layers of joconde soaked in second-flush Assam, tea buttercream and dark ganache.",
      long: "A tribute to the valley we come from. Almond joconde is brushed with a strong second-flush Assam infusion, layered with tea-infused French buttercream and 64% ganache, then glazed to a mirror finish and marked with our monogram in tempered chocolate. Seven layers, cut to the millimetre.",
      ingredients: "Almond flour, pasteurised eggs, cane sugar, butter, second-flush Assam tea, dark couverture 64%, fresh cream, glucose, French T45 pastry flour.",
      allergens: ["Milk", "Wheat", "Eggs", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/opera-cake.jpg", tags: ["opera", "assam tea", "layered"]
    },
    {
      id: "pistachio-kunafa-croissant", name: "Pistachio Kunafa Croissant", brand: "signature",
      cats: ["croissants", "pastries"], price: 420, rating: 4.9, reviews: 402,
      badges: ["BESTSELLER", "LIMITED EDITION"], sizes: "box", occasions: [],
      desc: "Three-day laminated croissant filled with pistachio cream and toasted kunafa.",
      long: "Seventy-two hours of lamination, then split and filled with our Sicilian pistachio cream, packed with butter-toasted kunafa threads and finished with a pistachio glaze and crushed nut. Baked in small batches twice daily — it sells out most afternoons.",
      ingredients: "Wheat flour, cultured French butter (82%), pistachio paste, kunafa (shredded phyllo), cane sugar, milk, sea salt, yeast.",
      allergens: ["Milk", "Wheat", "Tree nuts (pistachio)"],
      leadHours: 24, image: "assets/img/products/pistachio-kunafa-croissant.jpg", tags: ["viral", "kunafa", "laminated"]
    },
    {
      id: "dark-chocolate-entremet", name: "Dark Chocolate Entremet", brand: "signature",
      cats: ["celebration-cakes", "chocolates"], price: 2950, rating: 4.9, reviews: 141,
      badges: ["SIGNATURE"], sizes: "cake", occasions: ["birthday", "anniversary", "corporate"],
      desc: "Nine components of single-origin 70% Ghana chocolate under a hand-poured mirror glaze.",
      long: "Our pastry team's benchmark. Flourless chocolate biscuit, cocoa nib feuilletine, salted caramel insert, 70% Ghana crémeux and a chocolate chantilly — nine components built over three days and sealed under a hand-poured mirror glaze at exactly 32°C.",
      ingredients: "Single-origin 70% Ghana couverture, fresh cream, butter, pasteurised eggs, cane sugar, cocoa nibs, glucose, gelatine (bovine-free), sea salt.",
      allergens: ["Milk", "Eggs", "Soy"],
      customisable: true, image: "assets/img/products/chocolate-cake.jpg", tags: ["entremet", "single origin", "mirror glaze"]
    },
    {
      id: "raspberry-entremet", name: "Raspberry Entremet", brand: "signature",
      cats: ["celebration-cakes"], price: 2850, rating: 4.8, reviews: 96,
      badges: ["NEW", "SIGNATURE"], sizes: "cake", occasions: ["birthday", "anniversary", "baby-shower", "wedding"],
      diet: ["eggless"],
      desc: "Raspberry confit, white chocolate rose mousse and a velvet spray finish.",
      long: "A pale rose dome of Valrhona Ivoire mousse over sharp raspberry confit and a lychee-rose insert, on an almond dacquoise. Finished with a velvet cocoa-butter spray and fresh berries. Naturally eggless.",
      ingredients: "White couverture, fresh cream, raspberry purée, lychee, rose water, almond flour, cane sugar, cocoa butter, gelatine (bovine-free).",
      allergens: ["Milk", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/pistachio-raspberry-cake.jpg", tags: ["velvet finish", "raspberry", "eggless"]
    },
    {
      id: "signature-chocolate-bonbons", name: "Signature Chocolate Bonbons", brand: "signature",
      cats: ["chocolates", "hampers", "corporate-gifting"], price: 1450, mrp: 1650, rating: 4.9, reviews: 287,
      badges: ["BESTSELLER"], sizes: "box", occasions: ["corporate", "festival", "anniversary"],
      desc: "Hand-painted couverture shells, twelve fillings, tempered to a glass snap.",
      long: "Twelve bonbons, twelve fillings — Assam tea ganache, salted jaggery caramel, passionfruit, hazelnut praline, black sesame and more. Each shell is airbrushed with coloured cocoa butter and tempered to a clean snap. Presented in a magnetic keepsake box.",
      ingredients: "Couverture chocolate (dark 64%, milk 38%, white 33%), fresh cream, butter, jaggery, fruit purées, hazelnut, sesame, Assam tea, cocoa butter colours.",
      allergens: ["Milk", "Soy", "Tree nuts", "Sesame"],
      tags: ["gifting", "bonbons", "hand painted"],
      image: "assets/img/products/signature-chocolate-bonbons.jpg", images: ["assets/img/products/signature-chocolate-bonbons.jpg"]
    },
    {
      id: "wedding-tier-couture", name: "Couture Wedding Tier", brand: "signature",
      cats: ["celebration-cakes", "hampers"], price: 18500, rating: 5.0, reviews: 38,
      badges: ["SIGNATURE", "LIMITED EDITION"], sizes: "single", occasions: ["wedding"],
      desc: "Three-tier commission with hand-piped lace, sugar florals and gold detailing.",
      long: "A commissioned piece designed with you over a tasting consultation: three tiers, your choice of Signature flavours per tier, hand-piped royal lace, sugar florals sculpted to your bouquet and 24k gold detailing. Price shown is the starting point for a three-tier build serving 60–80.",
      ingredients: "Varies by chosen flavour profile — confirmed at tasting.",
      allergens: ["Milk", "Wheat", "Eggs", "Tree nuts"],
      customisable: true, leadHours: 336, image: "assets/img/products/signature-chocolate-bonbons.jpg", tags: ["wedding", "commission", "tiered"]
    },
    {
      id: "passionfruit-mango-tart", name: "Passionfruit Mango Tart", brand: "signature",
      cats: ["pastries"], price: 380, rating: 4.7, reviews: 122,
      badges: ["NEW"], sizes: "box", occasions: [],
      desc: "Crisp sablé shell, Alphonso mango cremeux and torched passionfruit meringue.",
      long: "Sweet sablé blind-baked to a snap, filled with Alphonso mango cremeux and a sharp passionfruit curd, crowned with Italian meringue torched to order. Bright, sharp and deliberately not too sweet.",
      ingredients: "Wheat flour, butter, pasteurised eggs, Alphonso mango, passionfruit, cane sugar, white couverture, vanilla.",
      allergens: ["Milk", "Wheat", "Eggs"],
      image: "assets/img/products/passionfruit-mango-tart.jpg", tags: ["tart", "seasonal", "meringue"]
    },
    {
      id: "hazelnut-paris-brest", name: "Hazelnut Paris-Brest", brand: "signature",
      cats: ["pastries"], price: 395, rating: 4.8, reviews: 88,
      badges: [], sizes: "box", occasions: [],
      desc: "Craquelin choux ring piped with Piedmont hazelnut praline mousseline.",
      long: "A choux ring baked under crisp craquelin, split and piped generously with hazelnut praline mousseline made from Piedmont IGP hazelnuts we roast and grind in-house. Dusted, halved and finished with caramelised nibs.",
      ingredients: "Wheat flour, butter, pasteurised eggs, milk, Piedmont hazelnut, cane sugar, vanilla, sea salt.",
      allergens: ["Milk", "Wheat", "Eggs", "Tree nuts (hazelnut)"],
      image: "assets/img/products/hazelnut-paris-brest.jpg", tags: ["choux", "praline"]
    },
    {
      id: "signature-tasting-hamper", name: "Signature Tasting Hamper", brand: "signature",
      cats: ["hampers", "corporate-gifting", "chocolates"], price: 4850, mrp: 5400, rating: 4.9, reviews: 74,
      badges: ["BESTSELLER"], sizes: "single", occasions: ["corporate", "festival", "wedding", "anniversary"],
      desc: "Bonbons, chocolate bars, tea and a Signature entremet in a keepsake presentation box.",
      long: "Our flagship gift: a 12-piece bonbon box, two single-origin bars, a tin of second-flush Assam, salted caramel spread and a 500g Signature entremet, nested in a linen-lined keepsake box with a hand-written card. Corporate branding available from 25 units.",
      ingredients: "See individual components; full declaration enclosed.",
      allergens: ["Milk", "Wheat", "Eggs", "Soy", "Tree nuts", "Sesame"],
      leadHours: 72, image: "assets/img/products/mini-diwali-gift-hamper.jpg", tags: ["hamper", "keepsake", "corporate"]
    },

    /* --------------------------- DoughReMi ---------------------------- */
    {
      id: "fresh-croissant", name: "Fresh Croissant", brand: "doughremi",
      cats: ["croissants", "breads"], price: 145, rating: 4.7, reviews: 631,
      badges: ["BESTSELLER"], sizes: "box", occasions: [],
      desc: "Cultured French butter, 27 layers, baked every morning at six.",
      long: "The one we judge ourselves by. A three-day process — poolish, overnight cold ferment, then lamination with cultured French butter to twenty-seven layers. Baked at 6am, on the counter by 7, and honestly best before ten.",
      ingredients: "Wheat flour, cultured French butter (82% fat), milk, cane sugar, sea salt, fresh yeast.",
      allergens: ["Milk", "Wheat"],
      leadHours: 12, image: "assets/img/products/fresh-croissant.jpg", tags: ["laminated", "breakfast", "butter"]
    },
    {
      id: "belgian-chocolate-brownie", name: "Belgian Chocolate Brownie", brand: "doughremi",
      cats: ["brownies"], price: 165, mrp: 195, rating: 4.8, reviews: 918,
      badges: ["BESTSELLER"], sizes: "box", occasions: ["birthday"],
      desc: "Fudge centre, crackled top, 54% Belgian couverture and toasted walnut.",
      long: "No cocoa powder shortcuts — melted 54% Belgian couverture, brown butter and just enough flour to hold it together. Baked to a crackled top with a deliberately underbaked fudge centre, studded with toasted walnuts. Warm it for eleven seconds. Trust us.",
      ingredients: "Belgian couverture 54%, butter, cane sugar, pasteurised eggs, wheat flour, walnut, cocoa, sea salt, vanilla.",
      allergens: ["Milk", "Wheat", "Eggs", "Tree nuts (walnut)"],
      image: "assets/img/products/chocolate-overload-brownie.jpg", tags: ["fudgy", "walnut", "teatime"]
    },
    {
      id: "red-velvet-cake", name: "Red Velvet Cake", brand: "signature",
      cats: ["celebration-cakes", "birthday-cakes"], price: 1000, mrp: 1150, rating: 5.0, reviews: 145,
      badges: ["MENU-FEATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"], sizes: "poundCake", occasions: ["birthday", "anniversary", "festival"],
      diet: ["sugar-free", "gluten-free", "eggless", "no-maida"],
      desc: "Crimson-hued cocoa sponge paired with tangy Philadelphia-style cream cheese frosting. Naturally colored with beetroot, 100% eggless, and free from maida.",
      long: "Crimson-hued cocoa sponge paired with tangy Philadelphia-style cream cheese frosting. Naturally colored with beetroot, 100% eggless, and free from maida with zero refined sugar.",
      ingredients: "French T45 pastry flour, almond flour, raw beetroot extract, cacao, cream cheese, pure vanilla bean, natural plant sweetener.",
      allergens: ["Milk / Dairy", "Tree nuts (almond)"],
      customisable: true, image: "assets/img/products/red-velvet-cake.jpg", images: ["assets/img/products/signature-chocolate-bonbons.jpg"],
      tags: ["cake", "red-velvet", "eggless", "gluten-free", "signature"]
    },
    {
      id: "fresh-cream-pastry", name: "Fresh Cream Pastry", brand: "doughremi",
      cats: ["pastries"], price: 95, rating: 4.6, reviews: 774,
      badges: [], sizes: "box", occasions: [],
      desc: "The after-school classic — vanilla sponge, whipped cream, seasonal fruit.",
      long: "Soft vanilla sponge soaked in light sugar syrup, layered with cold-whipped dairy cream and whatever fruit is best that week. Nostalgic on purpose, made properly with real dairy — no vegetable cream, ever.",
      ingredients: "Wheat flour, fresh dairy cream, cane sugar, pasteurised eggs, seasonal fruit, vanilla.",
      allergens: ["Milk", "Wheat", "Eggs"],
      tags: ["nostalgic", "dairy cream"],
      image: "assets/img/products/mix-cream-cake.jpg", images: ["assets/img/products/mix-cream-cake.jpg"]
    },
    {
      id: "artisan-sourdough", name: "Artisan Sourdough Loaf", brand: "doughremi",
      cats: ["breads"], price: 285, rating: 4.8, reviews: 389,
      badges: ["NEW"], sizes: "single", occasions: [],
      diet: ["vegan"],
      desc: "36-hour levain, blistered crust, open crumb. Three ingredients only.",
      long: "Flour, water, salt and time — thirty-six hours of it. Our levain has been running since 2019. Baked directly on stone for a blistered, deeply caramelised crust and an open, chewy crumb. Naturally vegan.",
      ingredients: "Stoneground wheat flour, water, sea salt, wild levain.",
      allergens: ["Wheat"],
      image: "assets/img/products/mix-cream-cake.jpg", tags: ["sourdough", "vegan", "stone baked"]
    },
    {
      id: "celebration-cupcakes", name: "Celebration Cupcakes", brand: "doughremi",
      cats: ["cupcakes", "birthday-cakes"], price: 480, rating: 4.7, reviews: 296,
      badges: [], sizes: "box", occasions: ["birthday", "baby-shower", "graduation", "corporate"],
      diet: ["eggless"],
      desc: "Party-ready boxes with piped buttercream, sprinkles and toppers.",
      long: "Six or twelve cupcakes in your choice of up to three flavours, piped with Swiss meringue buttercream and finished with sprinkles, edible glitter or custom toppers. Add a personalised message card at checkout.",
      ingredients: "French T45 pastry flour, butter, cane sugar, pasteurised eggs (or eggless base), milk, chocolate, vanilla, food-safe colours.",
      allergens: ["Milk", "Wheat", "Eggs"],
      customisable: true, image: "assets/img/products/vanilla-roasted-almond-muffins-2.jpg", tags: ["party", "buttercream", "mix flavours"]
    },
    {
      id: "butter-croissant-almond", name: "Almond Croissant", brand: "doughremi",
      cats: ["croissants", "pastries"], price: 175, rating: 4.8, reviews: 244,
      badges: [], sizes: "box", occasions: [],
      desc: "Day-old croissant reborn with frangipane and flaked almonds.",
      long: "The classic French thrift: yesterday's croissant, split and soaked in orange-blossom syrup, filled with almond frangipane, re-baked with flaked almonds until the edges caramelise. Better than the original and we will argue about it.",
      ingredients: "Wheat flour, cultured butter, almond flour, pasteurised eggs, cane sugar, orange blossom water, milk.",
      allergens: ["Milk", "Wheat", "Eggs", "Tree nuts (almond)"],
      leadHours: 12, tags: ["frangipane", "breakfast"],
      image: "assets/img/products/butter-croissant-almond.jpg", images: ["assets/img/products/butter-croissant-almond.jpg"]
    },
    {
      id: "chocolate-truffle-cake", name: "Chocolate Truffle Cake", brand: "doughremi",
      cats: ["birthday-cakes", "celebration-cakes"], price: 849, mrp: 999, rating: 4.8, reviews: 1102,
      badges: ["BESTSELLER"], sizes: "cake", occasions: ["birthday", "anniversary", "graduation"],
      diet: ["eggless"],
      desc: "The most-ordered cake in the house. Dark ganache, soft crumb, name piped free.",
      long: "Three layers of moist chocolate sponge, a generous 54% dark ganache between and around, finished with chocolate curls and a ganache drip. Your message piped by hand at no charge. Eggless on request.",
      ingredients: "French T45 pastry flour, dark couverture 54%, fresh cream, butter, cane sugar, cocoa, pasteurised eggs (optional), milk.",
      allergens: ["Milk", "Wheat", "Eggs"],
      customisable: true, tags: ["ganache", "most ordered", "eggless option"],
      image: "assets/img/products/belgian-chocolate-cake.jpg", images: ["assets/img/products/belgian-chocolate-cake.jpg"]
    },
    {
      id: "cinnamon-swirl-bun", name: "Cinnamon Swirl Bun", brand: "doughremi",
      cats: ["breads", "pastries"], price: 135, rating: 4.7, reviews: 318,
      badges: [], sizes: "box", occasions: [],
      desc: "Enriched dough, Ceylon cinnamon, cream cheese glaze that melts in.",
      long: "Soft enriched dough rolled with brown butter and Ceylon cinnamon, proofed slowly for a pull-apart crumb, and glazed with cream cheese while still warm so it soaks into the spiral.",
      ingredients: "Wheat flour, butter, milk, cane sugar, Ceylon cinnamon, cream cheese, pasteurised eggs, yeast, salt.",
      allergens: ["Milk", "Wheat", "Eggs"],
      leadHours: 12, tags: ["breakfast", "cinnamon"],
      image: "assets/img/products/classic-cinnamon-roll.jpg", images: ["assets/img/products/classic-cinnamon-roll.jpg"]
    },
    {
      id: "multigrain-seed-loaf", name: "Multigrain Seed Loaf", brand: "doughremi",
      cats: ["breads", "healthy-snacks"], price: 245, rating: 4.6, reviews: 187,
      badges: [], sizes: "single", occasions: [],
      diet: ["vegan", "high-protein"],
      desc: "Five grains, four seeds, no maida, no sugar, no improvers.",
      long: "Whole wheat, ragi, oats, barley and jowar with sunflower, flax, pumpkin and sesame seeds. Long ferment for digestibility, zero refined flour, zero added sugar. Slices beautifully for toast.",
      ingredients: "Whole wheat, ragi, oats, barley, jowar, sunflower seed, flaxseed, pumpkin seed, sesame, sea salt, levain.",
      allergens: ["Wheat", "Sesame"],
      image: "assets/img/products/classic-cinnamon-roll.jpg", tags: ["wholegrain", "no maida", "vegan"]
    },
    {
      id: "coffee-walnut-loaf", name: "Coffee Walnut Loaf", brand: "doughremi",
      cats: ["pastries", "coffee"], price: 425, rating: 4.6, reviews: 141,
      badges: [], sizes: "single", occasions: [],
      desc: "Single-origin Coorg espresso in the crumb, candied walnuts on top.",
      long: "A proper tea-loaf: brown-butter batter spiked with a double shot of single-origin Coorg espresso, folded with candied walnuts and finished with a coffee glaze. Keeps for four days and gets better on the second.",
      ingredients: "Wheat flour, butter, cane sugar, pasteurised eggs, Coorg espresso, walnut, milk, baking powder.",
      allergens: ["Milk", "Wheat", "Eggs", "Tree nuts (walnut)"],
      image: "assets/img/products/date-and-walnut-teacake.jpg", tags: ["loaf", "coffee", "keeps well"]
    },

    /* ----------------------------- Khowdy ----------------------------- */
    {
      id: "assam-tea-cookies", name: "Assam Tea Cookies", brand: "khowdy",
      cats: ["cookies", "assamese", "healthy-snacks"], price: 395, mrp: 449, rating: 4.8, reviews: 512,
      badges: ["BESTSELLER"], sizes: "jar", occasions: ["festival", "corporate"],
      diet: ["eggless", "nut-free"],
      desc: "Second-flush Assam leaf ground into a buttery shortbread. Eggless.",
      long: "We grind whole second-flush Assam leaf from partner estates in Jorhat into a cold-butter shortbread, so the tea is in the crumb rather than sprinkled on it. Malty, floral and just sweet enough. Eggless, no palm oil, no preservatives.",
      ingredients: "Wheat flour, butter, cane sugar, second-flush Assam tea leaf, milk solids, sea salt.",
      allergens: ["Milk", "Wheat"],
      tags: ["assam", "shortbread", "eggless"],
      image: "assets/img/products/brown-butter-cookie-box.jpg", images: ["assets/img/products/brown-butter-cookie-box.jpg"]
    },
    {
      id: "black-rice-cookies", name: "Black Rice Cookies", brand: "khowdy",
      cats: ["cookies", "assamese", "healthy-snacks"], price: 425, rating: 4.7, reviews: 288,
      badges: ["NEW"], sizes: "jar", occasions: ["festival"],
      diet: ["eggless", "gluten-free"],
      desc: "Assam's heirloom Chakhao black rice, jaggery and cold-pressed coconut oil.",
      long: "Chakhao — the aromatic black rice of the Northeast — stone-milled and baked with jaggery and cold-pressed coconut oil. Naturally gluten free, deep purple, faintly nutty, and rich in anthocyanins. Sourced directly from growers in Majuli.",
      ingredients: "Chakhao black rice flour, jaggery, cold-pressed coconut oil, coconut milk, cardamom, sea salt.",
      allergens: [],
      image: "assets/img/products/double-chocolate-cookie-box.jpg", tags: ["gluten free", "heirloom rice", "majuli"]
    },
    {
      id: "millet-cookies", name: "Millet Cookies", brand: "khowdy",
      cats: ["cookies", "healthy-snacks"], price: 375, rating: 4.6, reviews: 341,
      badges: [], sizes: "jar", occasions: [],
      diet: ["eggless", "high-protein", "sugar-free"],
      desc: "Ragi, jowar and bajra with date paste — no refined sugar, no maida.",
      long: "Built for the 4pm slump: three millets, date paste instead of sugar, a little ghee for shortness and roasted sesame for crunch. Nine grams of protein per serving and genuinely good with tea.",
      ingredients: "Ragi flour, jowar flour, bajra flour, date paste, ghee, sesame seed, cardamom, sea salt.",
      allergens: ["Milk", "Sesame"],
      image: "assets/img/products/pistachio-chocolate-cookie-box.jpg", tags: ["no refined sugar", "millet", "protein"]
    },
    {
      id: "premium-tea-time-box", name: "Premium Tea-Time Box", brand: "khowdy",
      cats: ["hampers", "corporate-gifting", "cookies"], price: 1250, mrp: 1450, rating: 4.8, reviews: 176,
      badges: ["BESTSELLER"], sizes: "single", occasions: ["festival", "corporate", "custom"],
      diet: ["eggless"],
      desc: "Three cookie jars and a tin of single-estate Assam in a jute-bound box.",
      long: "Assam tea cookies, black rice cookies and millet cookies with a 100g tin of single-estate second-flush Assam, presented in a jute-bound box with a hand-stamped card. Our most-gifted Khowdy box for Bihu and Diwali.",
      ingredients: "See individual components; full declaration enclosed.",
      allergens: ["Milk", "Wheat", "Sesame"],
      image: "assets/img/products/brookie-box.png", tags: ["gifting", "assam tea", "jute box"]
    },
    {
      id: "assamese-snack-box", name: "Assamese Snack Box", brand: "khowdy",
      cats: ["assamese", "healthy-snacks", "hampers"], price: 1450, rating: 4.7, reviews: 132,
      badges: [], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["eggless"],
      desc: "Pitha, til laru, komal chira granola and bhoot jolokia cashews.",
      long: "A guided tour of the Assamese pantry: coconut til pitha, sesame-jaggery laru, komal chira granola clusters and cashews tossed in a controlled amount of bhoot jolokia. Regional recipes, cleaner methods, no palm oil.",
      ingredients: "Rice flour, coconut, jaggery, sesame, komal chira (soft flattened rice), cashew, bhoot jolokia, mustard oil, sea salt.",
      allergens: ["Sesame", "Tree nuts (cashew)", "Mustard"],
      image: "assets/img/products/herb-and-cheese-crackers.jpg", tags: ["regional", "bihu", "pitha"]
    },
    {
      id: "single-estate-assam-tea", name: "Single-Estate Assam Tea", brand: "khowdy",
      cats: ["coffee", "assamese", "hampers"], price: 550, rating: 4.9, reviews: 264,
      badges: [], sizes: "jar", occasions: ["corporate", "festival"],
      diet: ["vegan"],
      desc: "Second-flush golden-tipped orthodox leaf from a single Jorhat garden.",
      long: "One garden, one flush, one picking window. Golden-tipped orthodox leaf with the malt and honey character second-flush Assam is famous for. Whole leaf, never dust, packed within ten days of plucking in a nitrogen-flushed tin.",
      ingredients: "100% orthodox second-flush Assam tea leaf.",
      allergens: [],
      image: "assets/img/products/single-estate-assam-tea.jpg", tags: ["single estate", "orthodox", "second flush"]
    },
    {
      id: "jaggery-granola", name: "Komal Chira Granola", brand: "khowdy",
      cats: ["healthy-snacks", "assamese"], price: 465, rating: 4.6, reviews: 158,
      badges: ["NEW"], sizes: "jar", occasions: [],
      diet: ["vegan", "high-protein"],
      desc: "Soft flattened rice, oats, jaggery and pumpkin seed. No palm oil.",
      long: "Komal chira — Assam's soft flattened rice — clustered with rolled oats, jaggery syrup, cold-pressed coconut oil and four seeds. Baked low and slow for clusters that survive the milk. Vegan, no palm oil, no refined sugar.",
      ingredients: "Komal chira, rolled oats, jaggery, cold-pressed coconut oil, pumpkin seed, sunflower seed, flaxseed, coconut flakes, cinnamon.",
      allergens: [],
      image: "assets/img/products/jaggery-granola.jpg", tags: ["breakfast", "vegan", "clusters"]
    },
    {
      id: "bhoot-jolokia-cashews", name: "Bhoot Jolokia Cashews", brand: "khowdy",
      cats: ["healthy-snacks", "assamese"], price: 495, rating: 4.7, reviews: 203,
      badges: [], sizes: "jar", occasions: ["corporate"],
      diet: ["vegan", "gluten-free"],
      desc: "W240 cashews, mustard oil roast, a measured hit of the world's fiercest chilli.",
      long: "Whole W240 cashews slow-roasted in cold-pressed mustard oil, then tossed with bhoot jolokia, black salt and curry leaf. Hot, but engineered to stop just before it ruins your tea.",
      ingredients: "Cashew W240, cold-pressed mustard oil, bhoot jolokia, black salt, curry leaf, turmeric.",
      allergens: ["Tree nuts (cashew)", "Mustard"],
      image: "assets/img/products/paprika-and-garlic-crackers.jpg", tags: ["spicy", "roasted", "bar snack"]
    },
    {
      id: "til-pitha-box", name: "Til Pitha Box", brand: "khowdy",
      cats: ["assamese", "hampers"], price: 385, rating: 4.8, reviews: 149,
      badges: [], sizes: "box", occasions: ["festival"],
      diet: ["vegan", "gluten-free"],
      desc: "Bora rice crepes rolled with black sesame and jaggery, made the Bihu way.",
      long: "Sticky bora rice, ground and griddled thin, rolled around roasted black sesame and jaggery while still warm. The Bihu classic, made by hand in small batches by the same three women who taught us the recipe.",
      ingredients: "Bora sticky rice, black sesame, jaggery, coconut, sea salt.",
      allergens: ["Sesame"],
      tags: ["bihu", "handmade", "gluten free"],
      image: "assets/img/products/motichoor-barks.jpg", images: ["assets/img/products/motichoor-barks.jpg"]
    },

    /* ---------------------------- Hampers ------------------------------ */
    {
      id: "birthday-celebration-hamper", name: "Birthday Celebration Hamper", brand: "doughremi",
      cats: ["hampers", "birthday-cakes"], price: 2250, mrp: 2600, rating: 4.8, reviews: 187,
      badges: ["BESTSELLER"], sizes: "single", occasions: ["birthday"],
      desc: "500g truffle cake, brownies, cupcakes, candles and a hand-written card.",
      long: "Everything a doorstep birthday needs: a 500g chocolate truffle cake, four brownies, six cupcakes, candles, a party knife and a hand-written card in your words. Choose a delivery slot and we handle the surprise.",
      ingredients: "See individual components; full declaration enclosed.",
      allergens: ["Milk", "Wheat", "Eggs", "Tree nuts"],
      leadHours: 24, image: "assets/img/products/motichoor-barks.jpg", tags: ["surprise", "hamper", "birthday"]
    },
    {
      id: "corporate-diwali-hamper", name: "Corporate Festival Hamper", brand: "khowdy",
      cats: ["hampers", "corporate-gifting"], price: 1850, rating: 4.8, reviews: 214,
      badges: [], sizes: "single", occasions: ["festival", "corporate"],
      diet: ["eggless"],
      desc: "Co-branded festival gifting from 25 units, GST invoiced, pan-India dispatch.",
      long: "Built for gifting at scale: Khowdy cookies, Assam tea, laru, dry fruit and a Signature chocolate bar in a co-branded box with your logo foiled on the lid. Minimum 25 units, GST invoice, pan-India dispatch with per-address delivery.",
      ingredients: "See individual components; full declaration enclosed.",
      allergens: ["Milk", "Wheat", "Sesame", "Tree nuts"],
      leadHours: 168, image: "assets/img/products/assorted-mithai-box-of-15.jpg", tags: ["b2b", "co-branded", "bulk"]
    },
    {
      id: "wedding-favour-box", name: "Wedding Favour Box", brand: "signature",
      cats: ["hampers", "corporate-gifting", "chocolates"], price: 650, rating: 4.9, reviews: 96,
      badges: ["SIGNATURE"], sizes: "single", occasions: ["wedding", "custom"],
      desc: "Four bonbons in a foiled box with your names, monogram and date.",
      long: "Four hand-painted bonbons in a rigid box foiled with your monogram, names and wedding date, tied with silk ribbon in your palette. Minimum 50 boxes, three weeks' notice, tasting box sent before you commit.",
      ingredients: "Couverture chocolate, fresh cream, butter, fruit purées, nuts, cocoa butter colours.",
      allergens: ["Milk", "Soy", "Tree nuts"],
      leadHours: 504, image: "assets/img/products/assorted-mithai-box-of-6.jpg", tags: ["favours", "monogram", "wedding"]
    },
    {
      id: "saiph-gift-card", name: "SAiPH Gift Card", brand: "saiph",
      cats: ["gift-cards", "hampers", "corporate-gifting"], price: 1000, rating: 4.9, reviews: 421,
      badges: [], sizes: "single", occasions: ["birthday", "corporate", "festival", "custom"],
      desc: "Any amount from ₹500. Delivered by email instantly, valid 12 months.",
      long: "Redeemable across DoughReMi, SAiPH Signature and Khowdy — online and in every store. Choose an amount, add a message, schedule the send. Valid twelve months, never expires mid-order, and the balance carries across visits.",
      ingredients: "Not applicable.",
      allergens: [],
      leadHours: 0, tags: ["instant", "digital", "flexible"],
      image: "assets/img/products/saiph-gift-card.jpg", images: ["assets/img/products/saiph-gift-card.jpg"]
    },
    /* ------------------------- Live Fresh Catalogue (Google Sheet) ------------------------- */
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
      "desc": "Delicate golden sponge infused with Bourbon vanilla, finished with fluffy whipped cream.",
      "long": "Our classic birthday centerpiece. Baked with premium Madagascar vanilla beans, layered with slow-whipped dairy cream and masked with crisp white chocolate pearls.",
      "ingredients": "French T45 pastry flour, condensed milk, butter, fresh cream, Madagascar vanilla extract, white chocolate pearls.",
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
      "desc": "Deep moist chocolate sponge layered with 55% Belgian chocolate ganache and chocolate cream.",
      "long": "The ultimate indulgence for chocolate lovers. Layer upon layer of dense dark cocoa sponge drenched in cocoa syrup and smothered in silky couverture chocolate ganache.",
      "ingredients": "French T45 pastry flour, Dutch cocoa powder, dark couverture chocolate 55%, butter, fresh dairy cream, cane sugar.",
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
      "long": "Golden vanilla sponge soaked in butterscotch syrup, filled with hand-whipped cream and generously studded with our signature house-made cashew-praline crunch.",
      "ingredients": "French T45 pastry flour, brown sugar, dairy cream, butterscotch crunch, cashews, dairy butter, caramel glaze.",
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
      "long": "A traditional morning accompaniment. Moist, tender crumb scented with warm vanilla bean, baked daily at dawn to pair with Assam tea.",
      "ingredients": "French T45 pastry flour, butter, cane sugar, milk, vanilla extract, sea salt.",
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
      "desc": "Decadent cocoa loaf cake baked with Dutch cocoa and dark chocolate chips.",
      "long": "Rich, dense chocolate loaf baked to perfection with Dutch processed cocoa powder and studded with Callebaut dark chocolate chips.",
      "ingredients": "French T45 pastry flour, Dutch cocoa, dark chocolate chips, dairy butter, cane sugar, milk.",
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
      "desc": "Rich brown sugar tea cake studded with caramelized butterscotch chips.",
      "long": "Warm caramelized aroma with every slice. Baked with muscovado sugar and golden butterscotch bits that melt into the crumb.",
      "ingredients": "French T45 pastry flour, butter, brown sugar, butterscotch chips, milk, vanilla.",
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
      "desc": "Traditional golden English-style tea cake with a delicate crumb and warm aroma.",
      "long": "The unadorned classic. Simple, wholesome and baked with pure table butter for pure tea-time nostalgia.",
      "ingredients": "French T45 pastry flour, butter, cane sugar, milk, baking powder.",
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
      "long": "Our richest loaf bake. Made with 100% slow-churned dairy butter, giving a golden crumb and unmatched aroma.",
      "ingredients": "Slow-churned butter, French T45 pastry flour, cane sugar, whole milk, sea salt.",
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
      "desc": "Golden pound cake studded with candied citrus peels, cherries, golden sultanas and black currants.",
      "long": "Packed with hand-soaked candied orange peel, glazed red cherries, golden sultanas and tutti frutti for a celebratory jewel-studded slice.",
      "ingredients": "French T45 pastry flour, candied cherries, orange peel, black currants, golden sultanas, butter, cane sugar.",
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
      "long": "A heritage recipe made without alcohol. Premium dry fruits, California prunes, and Arabian dates steeped in spiced fruit reduction and folded into a dark cinnamon-nutmeg batter.",
      "ingredients": "French T45 pastry flour, prunes, dates, raisins, orange zest, cinnamon, nutmeg, cloves, butter, brown sugar.",
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
      "desc": "Old-fashioned round butter cake baked to a golden crust with a soft velvety crumb.",
      "long": "Simple perfection. A round golden tea-cake round made with pure churned butter, ready to slice or frost at home.",
      "ingredients": "French T45 pastry flour, pure butter, cane sugar, milk, vanilla.",
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
      "rating": 5.0,
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
      "desc": "Ultra-silky Philadelphia cream cheese mousse over a buttery almond crust, chilled to creamy perfection with fragrant Madagascar vanilla.",
      "long": "Ultra-silky Philadelphia cream cheese mousse over a buttery almond crust, chilled to creamy perfection with fragrant Madagascar vanilla. 100% Eggless and Gluten-Free.",
      "ingredients": "Almond crust, Philadelphia-style cream cheese, heavy dairy cream, pure Madagascar vanilla bean, natural erythritol.",
      "allergens": [
        "Milk / Dairy",
        "Tree nuts (almond)"
      ],
      "image": "assets/img/products/vanilla-basque-cheesecake.jpg",
      "images": ["assets/img/products/saiph-gift-card.jpg"],
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
      "desc": "Sweet vanilla teacake buns filled with light whipped cream and berry fruit compote.",
      "long": "A delightful sweet twist! Soft golden teacake brioche buns halved and filled with chantilly cream, strawberry compote and chocolate drizzle.",
      "ingredients": "Teacake brioche, whipped cream, berry compote, chocolate ganache.",
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
      "desc": "Soft toasted sesame brioche bun with house herb butter and spiced relish spread.",
      "long": "Simple and warm. Fresh bakery-baked sesame bun lightly griddled with garlic-herb butter and our savoury house tomato-onion relish.",
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
      "long": "Freshly assembled bakery burger. Crisp potato-pea-carrot patty fried golden, loaded with lettuce, tomato, onions and smoky mayonnaise in a soft brioche bun.",
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
      "long": "Generous thick slab of malai cottage cheese griddled with aromatic tandoori masala, accompanied by crunchy onion rings, pickled jalapeños and mint-coriander mayonnaise.",
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
      "long": "For serious cheese enthusiasts. Golden veggie patty crowned with sharp cheddar slice and warm melted cheese sauce in our signature toasted bun.",
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
      "long": "Authentic bakery craftsmanship. Hundred-layered laminated pastry disc baked golden in high heat, crisp on the edges and delicately flaky within.",
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
      "desc": "Flaky laminated layers baked with an aged sharp cheese blend and dried oregano.",
      "long": "A modern savoury evolution. Laminated with clarified butter and aged cheese, crisp and golden with melted cheese crisps baked into the surface.",
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
      "desc": "Crisp laminated bakery pastry rolled with Belgian dark cocoa and chocolate chips.",
      "long": "Decadent sweet variety. Layered with Dutch cocoa and dark chocolate chips that melt during the bake, producing caramelized crispy chocolate pastry.",
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
      "desc": "Stone-baked pizza with tomato sauce, spiced paneer tikka chunks, bell peppers and molten mozzarella.",
      "long": "Hand-stretched artisan sourdough pizza base topped with slow-cooked herb tomato sauce, fresh spiced paneer cubes, crisp capsicum, onions and 100% dairy mozzarella.",
      "ingredients": "Sourdough crust, mozzarella cheese, spiced paneer tikka, tomato passata, capsicum, oregano.",
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
      "desc": "Loaded with black olives, sweet corn, crisp capsicum, onions, mushrooms and herb-infused mozzarella.",
      "long": "Vibrant garden harvest on a blistered crust. Abundantly loaded with sweet American corn, Spanish black olives, button mushrooms, capsicum and melted mozzarella.",
      "ingredients": "Artisan pizza base, mozzarella, black olives, sweet corn, capsicum, mushrooms, tomato sauce.",
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
      "desc": "Hand-stretched sourdough base, slow-simmered herb tomato passata, double mozzarella and fresh basil.",
      "long": "The authentic Italian simplicity. Double layer of creamy Fior di Latte mozzarella over our 24-hour slow-fermented crust and seasoned tomato sauce.",
      "ingredients": "Fermented pizza base, double mozzarella cheese, San Marzano tomato sauce, basil, extra virgin olive oil.",
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
      "desc": "Golden-baked layered puff pastry pocket filled with spiced potato, carrots and green peas.",
      "long": "The quintessential Indian bakery treat. Super-flaky puff pastry made with pure vegetable shortening, encasing a savoury potato-pea-carrot filling seasoned with cumin, coriander and garam masala.",
      "ingredients": "Wheat flour, potato, green peas, carrots, vegetable shortening, cumin, garam masala, salt.",
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
      "desc": "Buttery puff pastry shell encasing fresh cottage cheese cubes seasoned with cumin and garam masala.",
      "long": "Fresh malai paneer seasoned with aromatic roasted spices, tucked inside golden, paper-thin laminated puff pastry and baked crisp every hour.",
      "ingredients": "Wheat flour, fresh paneer, shortening, cumin, turmeric, garam masala, sea salt.",
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
      "desc": "Golden bakery pastry roll wrapped around a spicy crumbled paneer and roasted bell pepper core.",
      "long": "Crispy cylindrical pastry roll packed with spiced crumbled paneer, sautéed onions and diced capsicum.",
      "ingredients": "Wheat flour, cottage cheese, capsicum, onion, aromatic spices, butter.",
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
      "desc": "Soft baked roll rolled with slow-caramelized onions, cracked black pepper and melted cheese.",
      "long": "Sweet and savoury comfort. Sautéed pink onions slow-caramelized with black pepper, rolled in soft enriched dough and baked to a deep golden glaze.",
      "ingredients": "Wheat flour, caramelized onions, black pepper, butter, cheese, salt.",
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
      "desc": "Crunchy puffed bite glazed with aromatic jaggery and freshly grated roasted coconut.",
      "long": "Delightful tea-time pastry puff coated with caramelised organic jaggery glaze and rolled in toasted desiccated coconut.",
      "ingredients": "Wheat flour, desiccated coconut, jaggery, vegetable oil, cardamom.",
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
      "desc": "Traditional sweetened bakery puff dumplings with a crisp caramelized golden shell.",
      "long": "Bite-sized spherical puff pastries with a hollow flaky shell and light sugar crystal glaze.",
      "ingredients": "Wheat flour, shortening, cane sugar, cardamom.",
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
      "long": "Our top-selling single-portion indulgence. Dark cocoa sponge soaked in cocoa syrup and stacked with velvety Belgian chocolate mousse.",
      "ingredients": "Dark chocolate 55%, dairy cream, cocoa powder, wheat flour, cane sugar.",
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
      "long": "The timeless German classic. Light chocolate sponge, layers of vanilla cream, sour cherry reduction and dark chocolate curls.",
      "ingredients": "Wheat flour, cream, cherries, chocolate curls, cocoa, sugar.",
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
      "long": "Irresistible Italian hazelnut cocoa spread blended with fresh whipped cream and layered with chocolate sponge and roasted hazelnut crunch.",
      "ingredients": "Nutella spread, hazelnuts, cocoa sponge, dairy cream, dark chocolate.",
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
      "desc": "Artisan vanilla-chocolate swirl sponge layered with duo-tone Chantilly cream.",
      "long": "Swirled ribbons of dark chocolate and golden vanilla sponge layered with two-tone cream and chocolate marble disc on top.",
      "ingredients": "Wheat flour, cocoa, vanilla, dairy cream, butter, sugar.",
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
      "long": "Generous chunks of real Oreo cookies folded into airy whipped cream, layered between dark cocoa sponge layers.",
      "ingredients": "Oreo biscuits, dark cocoa sponge, dairy cream, white chocolate.",
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
      "long": "Tender vanilla cake slice loaded with caramel butterscotch mousse and hand-crushed roasted cashew praline.",
      "ingredients": "Wheat flour, cream, butterscotch praline, cashews, brown sugar.",
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
      "long": "Velvety crimson cocoa sponge with buttermilk tang, layered with genuine cream cheese frosting and dusted with red velvet crumbs.",
      "ingredients": "Wheat flour, cream cheese, dairy cream, cocoa, buttermilk, vanilla.",
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
      "long": "Luxury pâtisserie slice. Made with original Belgian Lotus Biscoff spread, speculoos crumb base and whipped cinnamon cookie butter cream.",
      "ingredients": "Lotus Biscoff spread, Biscoff biscuits, cream cheese, dairy cream, cinnamon sponge.",
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
      "long": "Baked daily at dawn. Sourced from single-origin stoneground whole wheat flour with natural wheat bran for healthy fiber and honest flavor.",
      "ingredients": "Stoneground whole wheat flour, water, yeast, malt extract, sea salt.",
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
      "long": "Featherlight and golden. Enriched with slow-melted dairy butter, giving an ultra-tender crumb that toasts to golden perfection.",
      "ingredients": "Wheat flour, pure butter, milk, yeast, cane sugar, sea salt.",
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
      "long": "Everyday breakfast favourite. Kneaded with full-fat dairy milk instead of water, creating an extraordinarily soft and fluffy sandwich bread.",
      "ingredients": "Wheat flour, fresh dairy milk, yeast, butter, cane sugar, salt.",
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
      "long": "The kitchen staple. Perfect for morning toast or tea sandwiches with an even crumb and clean, unbleached flour base.",
      "ingredients": "Unbleached wheat flour, water, yeast, vegetable oil, salt, cane sugar.",
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
      "desc": "Nutrient-dense loaf packed with oats, barley, millet, whole wheat and cracked rye.",
      "long": "Slow-fermented five-grain artisan loaf. Infused with rolled oats, malted barley, barnyard millet and cracked rye for sustained energy.",
      "ingredients": "Whole wheat flour, rolled oats, barley, millet, cracked rye, yeast, sea salt.",
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
      "desc": "Crusty loaf coated inside and out with toasted pumpkin seeds, sunflower seeds, flaxseeds and white sesame.",
      "long": "Crunchy roasted seeds in every bite. Coated with roasted pumpkin seeds, sunflower kernels, golden flaxseeds and white sesame seeds.",
      "ingredients": "Whole wheat, pumpkin seeds, sunflower seeds, flaxseeds, sesame, yeast, salt.",
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
      "desc": "Warm brioche hot dog bun loaded with grilled spiced vegetable roll and smoky fiery peri-peri drizzle.",
      "long": "Toasted elongated brioche bun filled with a grilled potato-corn-pea sausage, drizzled with fiery African peri-peri mayonnaise and jalapeños.",
      "ingredients": "Brioche roll, vegetable sausage, peri-peri sauce, eggless mayo, pickled jalapeño.",
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
      "desc": "Grilled malai paneer sausage nestled in a toasted brioche bun with pickled jalapeños and spicy peri-peri mayo.",
      "long": "Generous cottage cheese seekh roll grilled with tandoori spices, stuffed into a butter-toasted brioche bun with peri-peri glaze and crisp onions.",
      "ingredients": "Brioche roll, paneer sausage, peri-peri glaze, butter, jalapeños, onions.",
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
      "desc": "Pan-roasted flaky layered flatbread stuffed with spiced potato mash, coriander, green chilies and amchur.",
      "long": "Freshly roasted in pure ghee. Multi-layered flaky dough filled with mashed potatoes tempered with cumin, carom seeds (ajwain), and mango powder.",
      "ingredients": "Whole wheat flour, potato, ghee, green chillies, coriander, spices.",
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
      "desc": "Oven-baked crisp triangle pastry stuffed with cumin-spiced potatoes, cashew nuts and peas. Less oil, maximum crunch.",
      "long": "Healthy baked version of India's favourite snack. Crisp, flaky pastry baked in our convection ovens rather than deep fried, filled with aromatic spiced potatoes and peas.",
      "ingredients": "Wheat flour, potato, green peas, cashews, cumin, ginger, spices.",
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
      "desc": "Flaky hand-crimped butter pastry crust loaded with cinnamon-spiced Himalayan apples and brown sugar reduction.",
      "long": "Classic American pâtisserie. Golden flaky lattice butter crust baked with caramelized tart green apples, Sri Lankan cinnamon, nutmeg and a glistening sugar glaze.",
      "ingredients": "Himalayan apples, wheat flour, dairy butter, brown sugar, cinnamon, nutmeg, lemon juice.",
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
      "desc": "Delicate eggless almond meringue shells filled with dark chocolate ganache, raspberry and pistachio buttercreams.",
      "long": "Crafted in our temperature-controlled pastry laboratory using aquafaba meringue and French almond flour. Filled with 64% Madagascar ganache, raspberry coulis and pistachio cream.",
      "ingredients": "Almond flour, icing sugar, aquafaba, dark chocolate ganache, pistachio paste, raspberry compote.",
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
      "desc": "Authentic French patisserie macarons with delicate ruffled pied, smooth shells and velvety fruit and chocolate ganaches.",
      "long": "Authentic Parisian macarons made with whipped egg-white meringue and California almond meal. Features salted caramel, lavender blackcurrant and dark chocolate ganaches.",
      "ingredients": "Almond flour, pasteurised egg whites, sugar, cream, dark chocolate, fruit ganache.",
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
      "desc": "Dense fudgy dark chocolate brownie with a shiny crinkly top crust, baked with 70% Callebaut chocolate.",
      "long": "Intensely fudgy center with paper-thin crackly crust. Baked with pure Callebaut 70% dark Belgian couverture chocolate and a pinch of Maldon sea salt.",
      "ingredients": "Callebaut dark chocolate 70%, dairy butter, cocoa powder, wheat flour, cane sugar, sea salt.",
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
      "desc": "Chewy, rich cocoa brownie with a light flake crust and tender chocolate center.",
      "long": "Wholesome bakery brownie made with Dutch cocoa powder, delivering a balanced cocoa sweetness and chewy cake-fudge texture.",
      "ingredients": "Wheat flour, Dutch cocoa, dairy butter, sugar, milk, vanilla.",
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
      "long": "The ultimate combination. Double chocolate fudge brownie batter poured over Oreo cookies and finished with crushed cookies-and-cream topping.",
      "ingredients": "Oreo biscuits, dark chocolate 60%, dairy butter, wheat flour, cane sugar.",
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
      "desc": "Light and moist breakfast muffin baked to a high golden dome with a sprinkle of crystal sugar.",
      "long": "Baked fresh every morning. High-domed vanilla bakery muffin with a tender, moist crumb and crunchy sugar crown.",
      "ingredients": "Wheat flour, butter, milk, sugar, vanilla, coarse sugar crystals.",
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
      "desc": "Decadent Dutch cocoa muffin with a moist cakey crumb and rich molten chocolate core.",
      "long": "Deep chocolate flavor in every bite. Prepared with dark Dutch cocoa and a gooey chocolate center that warms up deliciously.",
      "ingredients": "Wheat flour, dark cocoa, chocolate ganache, milk, butter, sugar.",
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
      "desc": "Vanilla-infused bakery muffin studded throughout with semi-sweet dark chocolate chips.",
      "long": "Generously packed with semi-sweet chocolate chips that stay studded throughout the fluffy vanilla muffin sponge.",
      "ingredients": "Wheat flour, semi-sweet chocolate chips, butter, milk, cane sugar, vanilla.",
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
      "desc": "Cookies-and-cream muffin loaded with crushed dark Oreo biscuits and white chocolate chips.",
      "long": "Vanilla muffin batter marbled with Oreo cookie crumbs and studded with chunks of chocolate sandwich cookies and white chocolate drops.",
      "ingredients": "Oreo biscuits, wheat flour, white chocolate chips, milk, butter, sugar.",
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

    }
,
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
      "desc": "Crisp artisanal golden butter cookies loaded with fragrant roasted white and black sesame seeds. Rich, nutty, and completely guilt-free.",
      "long": "Handcrafted using traditional slow-baking techniques, our Butter Sesame Mix pairs pure grass-fed dairy butter with toasted black and white sesame seeds. Crafted with French T45 flour and almond flour, zero refined sugar, and no artificial preservatives. 100% Eggless and Gluten-Free indulgence.",
      "ingredients": "French T45 pastry flour, almond flour, pure grass-fed butter, roasted white & black sesame seeds, natural erythritol & stevia blend, cold-pressed vegetable oils, sea salt.",
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
      "desc": "Melt-in-the-mouth golden butter cookies embedded with crunchy handcrafted sugar-free butterscotch bits and browned butter praline.",
      "long": "Infused with rich caramelized butter notes and crunchy handcrafted sugar-free butterscotch crisps. Baked using French T45 pastry flour and nutrient-rich almond flour with zero refined sugar. 100% Egg-Free and guilt-free tea-time bliss.",
      "ingredients": "French T45 pastry flour, almond flour, brown butter, handcrafted sugar-free butterscotch praline, natural plant sweetener blend, pure vanilla extract.",
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
      "rating": 5.0,
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
      "desc": "Marbled artisan cocoa cookies swirled with dark chocolate ganache ribbons and crunchy Belgian chocolate chunks.",
      "long": "An irresistible swirl of deep dark chocolate and golden vanilla butter dough baked into tender, crumbly cookies. Made with single-origin cocoa, French T45 flour, and almond flour with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin dark cocoa, dark chocolate chunks 70%, pure dairy butter, natural erythritol & stevia blend.",
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
      "desc": "Decadent dark chocolate sponge layered with velvety Belgian chocolate mousse and loaded with crisp dark chocolate chips.",
      "long": "A signature patisserie slice featuring airy cocoa sponge crafted with French T45 flour, single-origin cacao, and almond flour, coated in dark chocolate ganache and studded with crunchy chocolate chips. 100% Eggless, gluten-free, and refined sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin cacao 70%, dark chocolate chips, dairy cream, natural erythritol & stevia blend, cold-pressed oils.",
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
      "rating": 5.0,
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
      "desc": "Double chocolate artisan cookies baked with rich Dutch cocoa and packed with molten chocolate chips in every bite.",
      "long": "For intense chocolate lovers: a deeply decadent dark cocoa biscuit dough packed with crunchy and melty sugar-free chocolate chips. Baked to perfection with French T45 flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, Dutch cocoa powder, dark chocolate morsels, pure grass-fed butter, natural plant sweetener.",
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
      "desc": "Classic crumbly dark chocolate butter cookies crafted with fine cocoa and pure dairy butter. Pure nostalgic crunch.",
      "long": "A timeless bakery favourite reinvented: rich cocoa butter cookies baked with French T45 flour and zero refined sugar. Crisp edges, delicate crumbly center, and subtle Madagascar vanilla finish.",
      "ingredients": "French T45 pastry flour, almond flour, single-origin cacao, pure dairy butter, natural erythritol & stevia blend, vanilla bean.",
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
      "desc": "Fragrant toasted coconut flakes blended into golden grass-fed butter cookies. Sweet, tropical, and delightfully crumbly.",
      "long": "Slow-roasted coconut flakes folded into rich cultured butter dough made with French T45 pastry flour and almond flour. Every bite delivers a satisfying tropical aroma and delicate crumb.",
      "ingredients": "French T45 pastry flour, almond flour, roasted desiccated coconut, pure butter, cold-pressed coconut oil, natural plant sweetener.",
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
      "desc": "Golden baked artisanal coconut biscuits rolled in fresh coconut shreds with a whisper of cardamom. Pure homestyle warmth.",
      "long": "An authentic Indian bakery classic made healthy: fresh grated coconut mixed with almond flour and French T45 flour, sweetened naturally with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, freshly grated coconut, pure dairy butter, green cardamom, natural erythritol & stevia blend.",
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
      "rating": 5.0,
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
      "desc": "Long hand-shredded coconut strands (laccha) baked into crunchy golden caramelized biscuit clusters.",
      "long": "A regional artisanal masterpiece: long shreds of tender coconut slowly roasted and baked with French T45 flour and almond flour. Crispy, chewy, caramelized coconut texture without any refined sugar.",
      "ingredients": "Hand-shredded coconut laccha strands, French T45 pastry flour, almond flour, pure grass-fed butter, natural erythritol & stevia blend.",
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
      "desc": "Soft oven-baked artisanal donut coated in rich dark Belgian chocolate glaze with delicate roasted sprinkles. Baked, never fried.",
      "long": "Fluffy, tender, and oven-baked to golden perfection with zero deep-frying. Crafted using French T45 pastry flour and almond flour, dipped in warm dark chocolate glaze and sweetened with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, oat flour, single-origin dark cocoa glaze, fresh milk, pure butter, natural plant sweetener.",
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
      "rating": 5.0,
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
      "desc": "Gourmet layered dessert served in a crystal glass jar: moist vanilla-chocolate sponge, dark chocolate ganache, and velvety cream.",
      "long": "An exquisite single-serve dessert in an elegant glass jar. Alternating layers of moist cocoa sponge, airy whipped cream, rich Belgian chocolate ganache, and roasted hazelnut praline. Made with French T45 flour and zero refined sugar.",
      "ingredients": "French T45 pastry flour, almond flour, dairy cream, Belgian dark chocolate 70%, roasted hazelnuts, natural erythritol & stevia blend.",
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
      "desc": "Savory-sweet Indian tea biscuits loaded with freshly roasted whole cumin seeds and a hint of pink rock salt.",
      "long": "The quintessential chai partner baked the healthy way: aromatic roasted cumin (jeera) blended into flaky butter biscuit dough with French T45 flour and almond flour. Melt-in-the-mouth crumb with crisp spiced edges. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, pure grass-fed butter, roasted whole cumin seeds (jeera), Himalayan pink salt, natural stevia touch.",
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
      "desc": "Crunchy roasted peanut cookies crafted with pure peanut butter and toasted peanut chunks. High protein and nutrient-packed.",
      "long": "Packed with real roasted peanuts and stone-ground peanut butter, these hearty cookies provide wholesome energy without refined sugar. Baked with French T45 pastry flour and almond flour for a rich, crumbly texture.",
      "ingredients": "Roasted peanuts, stone-ground peanut butter, French T45 pastry flour, almond flour, pure butter, natural plant sweetener, sea salt.",
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
      "rating": 5.0,
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
      "desc": "Power-packed artisan butter cookies loaded with roasted pumpkin, sunflower, flax, and chia seeds for satisfying superfood crunch.",
      "long": "A nutritional powerhouse: golden butter cookies loaded with an artisanal quartet of roasted pumpkin, sunflower, flax, and chia seeds. Baked with French T45 flour and almond flour with zero refined sugar. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, roasted pumpkin seeds, sunflower seeds, chia seeds, flax seeds, grass-fed butter, natural erythritol.",
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
      "desc": "Slender, crispy cumin-spiced finger biscuits with a delicate butter crunch. Perfect for dipping into morning Assam tea.",
      "long": "A beloved bakery tradition in finger-biscuit form: slender roasted cumin biscuits baked to golden snap with French T45 flour, pure butter, and sea salt. 100% Eggless, gluten-free, and sugar-free.",
      "ingredients": "French T45 pastry flour, almond flour, roasted whole cumin seeds, pure dairy butter, Himalayan rock salt, natural stevia touch.",
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
      "desc": "Light, fluffy vanilla sponge layered with luscious real strawberry compote and whipped dairy cream, crowned with strawberry glaze.",
      "long": "A delicate berry delight: light-as-air vanilla sponge baked with French T45 flour and almond flour, layered with handmade sugar-free strawberry compote and silky whipped cream. 100% Egg-Free and guilt-free.",
      "ingredients": "French T45 pastry flour, almond flour, real strawberry puree, dairy cream, natural erythritol & stevia blend, Madagascar vanilla.",
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
      "desc": "Classic delicate vanilla sponge infused with pure Madagascar vanilla bean, layered with velvety whipped cream and white chocolate.",
      "long": "Elegance in simplicity: moist vanilla sponge crafted with French T45 flour, real Madagascar vanilla beans, and almond flour, filled with whipped dairy cream and sugar-free white chocolate curls. 100% Eggless.",
      "ingredients": "French T45 pastry flour, almond flour, pure Madagascar vanilla bean, fresh dairy cream, sugar-free white chocolate shavings, natural plant sweetener.",
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

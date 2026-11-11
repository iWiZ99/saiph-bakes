/* ==========================================================================
   SAiPH Bakes — SEO landing page definitions
   Static, crawlable landing pages for major categories and delivery cities.
   Each renders real copy server-side (H1/H2, FAQ schema, internal links) with
   a JS-rendered product grid filtered to the collection.
   ========================================================================== */

export const CATEGORY_PAGES = [
  {
    file: "birthday-cakes.html",
    cat: "birthday-cakes",
    title: "Birthday Cakes Online — Cake Delivery | SAiPH Bakes",
    h1: "Birthday Cakes, Made For The Moment",
    desc: "Order birthday cakes online from SAiPH Bakes — chocolate truffle, red velvet, saffron cheesecake and custom designs. Eggless options, free hand-piped message, midnight delivery in Dibrugarh.",
    lede: "Chocolate truffle, red velvet, saffron cheesecake and fully custom builds — with the name piped by hand at no charge, an eggless base on request, and midnight slots for the moment the date actually turns.",
    art: ["cake-birthday", "doughremi", "cake"],
    sections: [
      {
        h2: "What makes a SAiPH birthday cake different",
        p: "Most birthday cakes in India are built around a whipped vegetable-fat cream that holds a shape and tastes of very little. Ours are not. DoughReMi cakes use real dairy cream and cream cheese whipped to order, sponges baked with certified French T45 pastry flour and almond flour rather than bleached commercial maida, and 54% Belgian couverture rather than cocoa powder. SAiPH Signature takes the same occasion somewhere else entirely — saffron bloomed overnight, mirror glaze poured at 32°C, 24k gold leaf applied by hand.",
        list: [
          "Baked with French T45 pastry flour — zero bleached maida",
          "Message piped by hand, always free",
          "Eggless available on every DoughReMi cake at no extra cost",
          "Sizes from 500g (serves 4–6) to 2kg (serves 18–22)",
          "Candles, knife and hand-written card included"
        ]
      },
      {
        h2: "How far ahead to order",
        p: "DoughReMi birthday cakes need six hours for same-day delivery, and are at their best ordered the evening before. SAiPH Signature cheesecakes and entremets need forty-eight hours because the components genuinely take that long to set. Fully custom builds go through our cake studio, which confirms feasibility and final pricing within four working hours."
      },
      {
        h2: "Midnight birthday delivery",
        p: "The 11:30 PM – 12:30 AM slot is available in Dibrugarh for a ₹199 surcharge. The rider calls you, not the recipient, so a surprise stays a surprise — add that instruction at checkout and we will not announce ourselves at the door."
      }
    ],
    faqs: [
      { q: "What flour do you use in your cakes?", a: "We bake our cake sponges exclusively with imported French T45 pastry flour and almond flour. T45 is the European patisserie standard for delicate, fine-crumbed sponges and has zero artificial bleaching agents or heavy commercial maida." },
      { q: "Can I get a birthday cake delivered the same day?", a: "Yes, in Dibrugarh for DoughReMi cakes ordered at least six hours before your slot. Signature cakes need forty-eight hours." },
      { q: "Is there an extra charge for an eggless birthday cake?", a: "No. Every DoughReMi cake is available eggless at the same price, using aquafaba and curd-based emulsification rather than a substitute mix." },
      { q: "Can you print a photo on the cake?", a: "Yes — an edible photo print is ₹399 and needs twenty-four hours. Upload the image in the cake studio or send it on WhatsApp with your order ID." },
      { q: "What size cake do I need?", a: "500g serves four to six, 1kg serves eight to ten, 1.5kg serves fourteen to sixteen and 2kg serves eighteen to twenty-two. For anything larger we would suggest two cakes or a tiered commission." }
    ],
    related: ["celebration-cakes.html", "cupcakes-and-pastries.html", "chocolate-gifts.html"]
  },
  {
    file: "celebration-cakes.html",
    cat: "celebration-cakes",
    title: "Celebration & Anniversary Cakes — Luxury Cake Delivery | SAiPH Bakes",
    h1: "Celebration Cakes For The Big Ones",
    desc: "Anniversary, wedding, baby shower and milestone cakes from SAiPH Bakes and SAiPH Signature. Entremets, cheesecakes, tiered commissions and custom designs with slot-timed delivery across Dibrugarh.",
    lede: "Anniversaries, weddings, baby showers and the milestones that only come round once. Entremets built over three days, cheesecakes finished with gold leaf, and tiered commissions designed with you over a tasting.",
    art: ["cake-celebration", "signature", "cake"],
    sections: [
      {
        h2: "When a cake has to carry the occasion",
        p: "A thirtieth anniversary is not the moment for a cake that photographs well and eats badly. SAiPH Signature exists for exactly these occasions: nine-component entremets, single-origin couverture, Kashmiri saffron, second-flush Assam tea, and a finish applied by hand rather than pressed from a mould. Every piece is photographed and chef-signed before it leaves the kitchen.",
        list: [
          "Nine components per entremet, built over 72 hours",
          "Mirror glaze poured at exactly 32°C",
          "Sugar florals and monograms sculpted by hand",
          "Delivered cold, assembled on site for tiered work"
        ]
      },
      {
        h2: "Tiered and wedding commissions",
        p: "A commission starts with a tasting — six flavours, sketches, and a firm quote per tier and guest count. Sugar work begins a week out, the structure is dry-fitted and photographed for your approval, and on the day our team assembles at the venue with a chef staying until the cut. Allow two to three weeks."
      },
      {
        h2: "Eggless without apology",
        p: "Several Signature desserts are eggless by construction rather than by substitution — the Raspberry Entremet and the Gold Leaf Saffron Cheesecake among them. Every DoughReMi celebration cake is available eggless at no extra charge."
      }
    ],
    faqs: [
      { q: "How much notice do you need for a wedding cake?", a: "Two to three weeks for a tiered commission, beginning with a tasting consultation. Larger structures and peak wedding dates book out further ahead — talk to us as early as you can." },
      { q: "Do you deliver and assemble at the venue?", a: "Yes, for tiered commissions. The cake travels cold, our team assembles on site, and a chef stays until the cutting so nothing is left to chance." },
      { q: "Can we taste before committing?", a: "For commissions, yes — a tasting of six flavours is part of the design consultation. For wedding favour boxes we send a sample box before you place the full order." },
      { q: "What is the largest cake you have made?", a: "A three-tier couture commission serving eighty, with hand-piped royal lace and sugar florals matched to the bouquet. Larger is possible with more notice." }
    ],
    related: ["birthday-cakes.html", "chocolate-gifts.html", "corporate-gifting-india.html"]
  },
  {
    file: "croissants-and-breads.html",
    cat: "croissants",
    extraCats: ["breads"],
    title: "Croissants & Artisan Breads | DoughReMi by SAiPH Bakes",
    h1: "Croissants & Artisan Breads",
    desc: "Three-day laminated croissants, 36-hour levain sourdough, multigrain seed loaves and the viral pistachio kunafa croissant. Baked from 6am at our Dibrugarh kitchen.",
    lede: "Three days of lamination with cultured French butter, a levain that has been running since 2019, and a pistachio kunafa croissant that sells out most afternoons.",
    art: ["croissant-bread", "doughremi", "croissant"],
    sections: [
      {
        h2: "Why the croissant takes seventy-two hours",
        p: "Lamination is a temperature problem, not a strength problem. A poolish overnight, a cold ferment the next day, then butter at 82% fat folded into twenty-seven layers at a temperature where neither the dough nor the butter wins. Table butter cannot do this — it shatters cold and leaks warm, and we stopped pretending otherwise in month four.",
        list: [
          "27 layers, cultured French butter at 82% fat",
          "Baked at 6am and again mid-morning",
          "Almond croissants made from yesterday's, as the French intended",
          "Pistachio kunafa croissant in limited batches, twice daily"
        ]
      },
      {
        h2: "Bread with three ingredients and a lot of time",
        p: "Our sourdough is flour, water, salt and thirty-six hours. Baked directly on stone for a blistered crust and an open, chewy crumb. The multigrain seed loaf uses five grains and four seeds with no refined flour and no added sugar — it slices beautifully for toast and keeps for four days."
      },
      {
        h2: "Subscribe and stop thinking about it",
        p: "A weekly bread box of two loaves every Saturday morning at 10% off, or breakfast viennoiserie twice a week before 8am at 12% off. Pause or cancel any time from your account, no notice period."
      }
    ],
    faqs: [
      { q: "What time are croissants freshest?", a: "The first tray is out at 6am and on the counter by 7. Honestly, they are best before ten — after that we would rather you had the almond croissant, which is made from the previous day's and is arguably better." },
      { q: "Is your sourdough real sourdough?", a: "Yes. Wild levain only, no commercial yeast, thirty-six hours of fermentation and three ingredients on the label. If it says sourdough on our shelf it was made that way." },
      { q: "Do you deliver bread daily?", a: "Yes, across Dibrugarh. A standing subscription guarantees your loaves are reserved before the counter opens." },
      { q: "Is anything vegan?", a: "The artisan sourdough and the multigrain seed loaf are both naturally vegan. Viennoiserie is butter-based and is not." }
    ],
    related: ["cupcakes-and-pastries.html", "healthy-snacks-online.html", "birthday-cakes.html"]
  },
  {
    file: "cupcakes-and-pastries.html",
    cat: "pastries",
    extraCats: ["cupcakes", "brownies"],
    title: "Pastries, Brownies & Cupcakes Online | SAiPH Bakes",
    h1: "Pastries, Brownies & Cupcakes",
    desc: "Fudge-centred Belgian chocolate brownies, fresh cream pastries, passionfruit mango tarts, hazelnut Paris-Brest and party-ready cupcake boxes from SAiPH Bakes.",
    lede: "Single-serve indulgence from the daily counter — a fudge-centred brownie worth eleven seconds in the microwave, tarts torched to order, and cupcake boxes sized for a party.",
    art: ["pastries-brownies", "doughremi", "tart"],
    sections: [
      {
        h2: "The brownie argument",
        p: "No cocoa powder shortcuts. Melted 54% Belgian couverture, brown butter, and just enough flour to hold it together, baked to a crackled top with a deliberately underbaked centre and toasted walnuts through it. Warm it for eleven seconds before you eat it. We will not be taking questions.",
        list: [
          "Belgian couverture, never compound chocolate",
          "Real dairy cream in every pastry — no vegetable fat",
          "Tarts blind-baked to a snap and torched to order",
          "Cupcake boxes of six or twelve, up to three flavours"
        ]
      },
      {
        h2: "Party-ready cupcake boxes",
        p: "Six or twelve cupcakes in up to three flavours, piped with Swiss meringue buttercream and finished with sprinkles, edible glitter or custom acrylic toppers. Add a personalised message card at checkout. Available eggless."
      },
      {
        h2: "From the Signature counter",
        p: "If the occasion warrants it, the pâtisserie case has passionfruit mango tarts with torched Italian meringue and a hazelnut Paris-Brest piped with Piedmont praline mousseline we roast and grind ourselves."
      }
    ],
    faqs: [
      { q: "How long do brownies keep?", a: "Three days in an airtight container at room temperature, or a week refrigerated. They are best on day one and day two, and genuinely fine on day three." },
      { q: "Can I mix flavours in a cupcake box?", a: "Yes, up to three flavours in a box of six or twelve. Choose them at checkout or leave a note and we will call you." },
      { q: "Are pastries made with fresh cream?", a: "Yes — real dairy cream, whipped cold and to order. We do not use vegetable-fat cream in anything, which is also why our pastries need refrigeration within thirty minutes." },
      { q: "Do you do dessert platters for events?", a: "Yes. Talk to our corporate desk for boardroom and event platters, including standing weekly orders." }
    ],
    related: ["croissants-and-breads.html", "chocolate-gifts.html", "birthday-cakes.html"]
  },
  {
    file: "chocolate-gifts.html",
    cat: "chocolates",
    extraCats: ["hampers"],
    title: "Luxury Chocolates & Gift Hampers | SAiPH Signature",
    h1: "Chocolates & Gift Hampers",
    desc: "Hand-painted couverture bonbons, single-origin bars, keepsake tasting hampers and monogrammed wedding favours from SAiPH Signature. Corporate branding from 25 units, pan-India dispatch.",
    lede: "Twelve fillings, twelve hand-painted shells, tempered to a glass snap in a room held at 18°C — and the hampers built around them.",
    art: ["chocolate-gifts", "signature", "bonbon"],
    sections: [
      {
        h2: "Inside the chocolate room",
        p: "Cocoa butter is a fussy material. It sets into six different crystal forms and only one of them snaps, shines and releases cleanly from the mould. Our chocolate room is held at 18°C with humidity under 50% so tempering is reproducible rather than lucky, and every shell is airbrushed with coloured cocoa butter by hand before it is filled.",
        list: [
          "Assam tea ganache, salted jaggery caramel, passionfruit, black sesame",
          "Single-origin couverture from Ghana, Madagascar and Vietnam",
          "Magnetic keepsake boxes, not disposable packaging",
          "Corporate branding — foiled lids, chocolate plaques, printed sleeves"
        ]
      },
      {
        h2: "Hampers that are actually kept",
        p: "The Signature Tasting Hamper pairs a twelve-piece bonbon box with single-origin bars, a tin of second-flush Assam, salted caramel spread and a 500g entremet, in a linen-lined keepsake box with a hand-written card. The Khowdy Premium Tea-Time Box does the same job at a different price point, jute-bound and shipped pan-India."
      },
      {
        h2: "Wedding favours and corporate gifting",
        p: "Four hand-painted bonbons in a rigid box foiled with your monogram, names and date, tied in your palette — minimum fifty boxes with three weeks' notice, and a tasting box sent before you commit. Corporate branding starts at twenty-five units."
      }
    ],
    faqs: [
      { q: "How should chocolates be stored?", a: "Cool and dry at 16–18°C, away from direct sunlight and strong smells. Refrigeration causes sugar bloom and dulls the shine — if you must refrigerate in peak summer, seal the box first and bring it back to room temperature before opening." },
      { q: "Can you put our company logo on the box?", a: "Yes — a foiled logo on the lid from twenty-five units, printed sleeves and inserts from fifty, and an edible tempered-chocolate plaque inside the box at any quantity." },
      { q: "Do hampers ship outside your delivery cities?", a: "Shelf-stable hampers ship pan-India in three to six working days. Anything containing fresh cake or cream is limited to our Dibrugarh." },
      { q: "Is there pricing inside a gift box?", a: "Never. Gift orders ship without any pricing in the box — the invoice goes to the purchaser by email only." }
    ],
    related: ["corporate-gifting-india.html", "celebration-cakes.html", "assam-tea-cookies.html"]
  },
  {
    file: "assam-tea-cookies.html",
    cat: "cookies",
    extraCats: ["assamese"],
    title: "Assam Tea Cookies & Assamese Snacks | Khowdy",
    h1: "Assam Tea Cookies & Regional Specialities",
    desc: "Second-flush Assam tea cookies, Chakhao black rice cookies, millet cookies, til pitha, komal chira granola and single-estate Assam tea. No palm oil, no refined flour. Ships pan-India.",
    lede: "Second-flush Assam ground into the dough rather than sprinkled on top, Chakhao black rice from Majuli growers, and til pitha rolled by hand the way Bihu intends.",
    art: ["assam-cookies", "khowdy", "cookie"],
    sections: [
      {
        h2: "Tea as an ingredient, not a label",
        p: "Most tea-flavoured food in India uses essence. We grind whole second-flush orthodox leaf from partner gardens in Jorhat directly into a cold-butter shortbread, so the malt and honey character sits in the crumb where you can actually taste it. It costs more and it is the entire point of the product.",
        list: [
          "Fourteen partner tea gardens, one flush, one picking window",
          "Chakhao black rice bought direct from Majuli growers",
          "Jaggery and date paste instead of refined sugar",
          "Cold-pressed coconut and mustard oil — no palm oil, anywhere"
        ]
      },
      {
        h2: "Gluten free that tastes like a treat",
        p: "The black rice cookie is naturally gluten free — stone-milled Chakhao, jaggery, cold-pressed coconut oil and cardamom. Deep purple, faintly nutty, rich in anthocyanins, and the first gluten-free thing a lot of our customers' children ask for by name."
      },
      {
        h2: "The Assamese pantry, packaged properly",
        p: "Til pitha rolled by hand in small batches, sesame-jaggery laru, komal chira granola clusters and cashews tossed in a measured amount of bhoot jolokia. Regional recipes, cleaner methods, six-month shelf life, batch and plucking dates printed on every label."
      }
    ],
    faqs: [
      { q: "Are Khowdy products eggless?", a: "Yes, the entire Khowdy range is eggless. Several items are also vegan — the granola, the single-estate tea, the black rice cookies and the til pitha among them." },
      { q: "Do you ship outside Assam?", a: "Yes. Khowdy packaged products ship pan-India in three to six working days, with tracking emailed on dispatch." },
      { q: "What does no palm oil actually mean here?", a: "That we use cold-pressed coconut oil, mustard oil and ghee instead — which costs more, behaves differently in baking, and gives roughly the same shelf life once the packing is nitrogen-flushed." },
      { q: "Can I stock Khowdy in my store?", a: "Yes. We supply retail-ready barcoded cartons and grant territory distributorships. Start with the wholesale enquiry form." }
    ],
    related: ["healthy-snacks-online.html", "chocolate-gifts.html", "corporate-gifting-india.html"]
  },
  {
    file: "healthy-snacks-online.html",
    cat: "healthy-snacks",
    title: "Healthy Snacks Online — Millet Cookies | Khowdy",
    h1: "Healthy Snacks That Are Actually Worth Eating",
    desc: "Millet cookies with no refined sugar, komal chira granola, multigrain seed loaves and bhoot jolokia cashews from Khowdy by SAiPH Bakes. No palm oil, no maida, no compromises on taste.",
    lede: "Millets, jaggery, date paste and cold-pressed oil — built for the 4pm slump rather than for a label on the front of a pack.",
    art: ["healthy-snacks", "khowdy", "cookie"],
    sections: [
      {
        h2: "What we leave out, and why",
        p: "No palm oil, because it is cheap rather than good. No refined flour where a millet does the job better. No refined sugar in the millet cookie, where date paste turns out to work better than the substitute sweeteners everyone else reaches for. And no protein claims we cannot put a number against.",
        list: [
          "Ragi, jowar and bajra in the millet cookie — 9g protein per serving",
          "Komal chira granola clustered with jaggery syrup, not glucose",
          "Multigrain seed loaf with five grains, four seeds and zero maida",
          "Naturally gluten-free options in the black rice range"
        ]
      },
      {
        h2: "Snacks for offices and schools",
        p: "Our institutional programme supplies no-maida, no-palm-oil snacks with full nutrition declarations and allergen matrices for schools and corporate pantries. Standing weekly orders are invoiced monthly with GST."
      }
    ],
    faqs: [
      { q: "Is the millet cookie really sugar-free?", a: "It has no refined sugar — sweetness comes from date paste. It is not calorie-free or carbohydrate-free, and we would rather say so than let the label imply otherwise." },
      { q: "Which products are gluten free?", a: "The black rice cookies and til pitha are naturally gluten free. Our kitchen handles wheat, so we cannot certify a gluten-free environment — call us before ordering if you are coeliac." },
      { q: "How long do packaged snacks keep?", a: "Six months from the date of packing, printed on every label along with the batch code." },
      { q: "Do you supply schools and offices?", a: "Yes, through the wholesale desk, with nutrition declarations and allergen documentation for institutional procurement." }
    ],
    related: ["assam-tea-cookies.html", "croissants-and-breads.html", "corporate-gifting-india.html"]
  },
  {
    file: "corporate-gifting-india.html",
    cat: "corporate-gifting",
    extraCats: ["hampers"],
    title: "Corporate Gifting — Branded Hampers | SAiPH Bakes",
    h1: "Corporate Gifting, Handled End To End",
    desc: "Co-branded corporate hampers, employee gifting, festival programmes and client boxes from SAiPH Bakes. Branding from 25 units, per-address dispatch across India, GST invoicing and 30-day credit.",
    lede: "Six hundred hampers, six hundred addresses, one invoice. Artwork, packing, dispatch, delivery confirmations and replacements — run by a desk that does this every festival season.",
    art: ["corporate-gifting", "signature", "hamper"],
    sections: [
      {
        h2: "What the corporate desk actually does",
        p: "Most corporate gifting fails on logistics rather than on the gift. Ours is built around the part that goes wrong: address validation before dispatch, per-address delivery confirmations back to you, replacements handled without a claims process, and a single consolidated GST invoice at the end rather than six hundred receipts.",
        list: [
          "Foiled logo on the lid from 25 units, printed sleeves from 50",
          "Edible tempered-chocolate plaques at any quantity",
          "Per-address dispatch with confirmations back to you",
          "GST invoicing and 30-day credit on approval"
        ]
      },
      {
        h2: "Plan festival gifting early",
        p: "Start in August for Diwali and early January for Bihu. Packing capacity books out before ingredients do, and artwork plus approval typically takes two weeks before production begins. A sample box is couriered to you before you commit."
      },
      {
        h2: "Beyond hampers",
        p: "Milestone cakes with your logo in tempered chocolate, boardroom platters on standing weekly order, onboarding and birthday boxes shipped to employees' home addresses, and bulk bakery on scheduled dispatch."
      }
    ],
    faqs: [
      { q: "What is the minimum order for corporate gifting?", a: "Twenty-five units for a foiled logo on the lid, fifty for printed sleeves and inserts. Below that we can still supply un-branded hampers at any quantity." },
      { q: "Can you deliver to employees' home addresses?", a: "Yes. Send a spreadsheet of recipients — we validate PIN codes, flag undeliverable addresses, dispatch individually and report confirmations back to you." },
      { q: "Do you offer credit terms?", a: "Thirty-day credit is available on approval, typically for repeat clients. First orders are 50% advance with the balance before dispatch." },
      { q: "How long does a corporate order take?", a: "Seven days for un-branded boxes, ten to fourteen for branded programmes from artwork approval, and longer during Diwali and Bihu peaks. Plan early." }
    ],
    related: ["chocolate-gifts.html", "assam-tea-cookies.html", "celebration-cakes.html"]
  }
];

export const LOCATION_PAGES = [
  {
    file: "cake-delivery-in-dibrugarh.html",
    city: "Dibrugarh",
    storeIds: ["dibrugarh"],
    title: "Cake Delivery in Dibrugarh — Order Cakes Online | SAiPH Bakes",
    h1: "Cake Delivery in Dibrugarh",
    desc: "Order cakes, pastries, croissants, chocolates and Khowdy snacks online in Dibrugarh. SAiPH Bakes on RKB Path, Chowkidinghee — same-day slots, midnight delivery and free store pickup.",
    lede: "One shop on RKB Path, one kitchen behind it, and every slot we offer — including 11:30 PM to 12:30 AM — available across the city.",
    intro: "Dibrugarh is where SAiPH Bakes is, and that is the whole advantage. Everything is baked at Chowkidinghee and delivered across the city by our own riders, which means shorter journeys, colder deliveries and same-day slots. Order six hours ahead for a DoughReMi cake, or by 8:00 PM for next-day. SAiPH Signature entremets and cheesecakes need forty-eight hours, wherever you are.",
    highlights: [
      { t: "Same-day slots", d: "Six hours' notice on DoughReMi cakes, seven days a week." },
      { t: "Midnight delivery", d: "11:30 PM – 12:30 AM for ₹199 — the birthday-at-midnight option." },
      { t: "Free above ₹999", d: "Flat ₹79 below that, and store pickup is always free." },
      { t: "Baked here", d: "The counter and the kitchen are the same address on RKB Path." }
    ],
    areas: ["Chowkidinghee", "RKB Path", "Graham Bazar", "Amolapatty", "Mancotta Road", "Naliapool", "Jalan Nagar", "Lahowal", "Mohanbari", "Bogibeel", "Khalihamari", "Milanpur"],
    faqs: [
      { q: "Do you offer midnight cake delivery in Dibrugarh?", a: "Yes. The 11:30 PM – 12:30 AM slot is available across Dibrugarh for a ₹199 surcharge. The rider calls you rather than the recipient, so a surprise stays a surprise." },
      { q: "Which areas of Dibrugarh do you deliver to?", a: "The whole city and its immediate surroundings, including Chowkidinghee, Graham Bazar, Amolapatty, Mancotta Road, Naliapool, Jalan Nagar, Lahowal, Mohanbari, Bogibeel, Khalihamari and Milanpur. Serviceability is confirmed by PIN code at checkout." },
      { q: "Can I collect from the shop instead?", a: "Yes, and it is free. Your order is held at the counter for two hours past your chosen slot — call us if you are running later than that and we will keep it back." },
      { q: "What is the fastest you can deliver a cake in Dibrugarh?", a: "Six hours for a DoughReMi cake — that is a real production constraint, not a policy. Signature entremets and cheesecakes need forty-eight hours because the components genuinely take that long to set." },
      { q: "Do you deliver outside Dibrugarh?", a: "Fresh cakes and cream-based desserts are Dibrugarh only, because they do not travel well. Khowdy packaged products — cookies, tea, granola and snack boxes — ship pan-India in three to six working days." }
    ]
  }
];

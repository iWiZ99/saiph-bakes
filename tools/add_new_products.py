import json

NEW_PRODUCTS = [
    {
        "id": "butter-sesame-mix",
        "name": "Butter Sesame Mix",
        "brand": "doughremi",
        "cats": ["cookies", "healthy-snacks", "assamese"],
        "price": 800,
        "mrp": 920,
        "rating": 4.9,
        "reviews": 112,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "festival", "corporate"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Crisp artisanal golden butter cookies loaded with fragrant roasted white and black sesame seeds. Rich, nutty, and completely guilt-free.",
        "long": "Handcrafted using traditional slow-baking techniques, our Butter Sesame Mix pairs pure grass-fed dairy butter with toasted black and white sesame seeds. Crafted with French T45 flour and almond flour, zero refined sugar, and no artificial preservatives. 100% Eggless and Gluten-Free indulgence.",
        "ingredients": "French T45 pastry flour, almond flour, pure grass-fed butter, roasted white & black sesame seeds, natural erythritol & stevia blend, cold-pressed vegetable oils, sea salt.",
        "allergens": ["Milk / Dairy", "Sesame", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/butter-sesame-mix.jpg",
        "images": ["assets/img/products/butter-sesame-mix.jpg"],
        "tags": ["cookies", "sesame", "butter", "eggless", "healthy-snack"]
    },
    {
        "id": "butterscotch-cookies",
        "name": "Butterscotch Cookies",
        "brand": "doughremi",
        "cats": ["cookies", "healthy-snacks"],
        "price": 800,
        "mrp": 920,
        "rating": 4.9,
        "reviews": 88,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "birthday", "festival"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Melt-in-the-mouth golden butter cookies embedded with crunchy handcrafted sugar-free butterscotch bits and browned butter praline.",
        "long": "Infused with rich caramelized butter notes and crunchy handcrafted sugar-free butterscotch crisps. Baked using French T45 pastry flour and nutrient-rich almond flour with zero refined sugar. 100% Egg-Free and guilt-free tea-time bliss.",
        "ingredients": "French T45 pastry flour, almond flour, brown butter, handcrafted sugar-free butterscotch praline, natural plant sweetener blend, pure vanilla extract.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/butterscotch-cookies.jpg",
        "images": ["assets/img/products/butterscotch-cookies.jpg"],
        "tags": ["cookies", "butterscotch", "crunch", "eggless", "snack"]
    },
    {
        "id": "choco-mix-cookies",
        "name": "Choco Mix Cookies",
        "brand": "doughremi",
        "cats": ["cookies", "chocolates"],
        "price": 800,
        "mrp": 920,
        "rating": 5.0,
        "reviews": 146,
        "badges": ["NEW", "BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "festival", "corporate"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Marbled artisan cocoa cookies swirled with dark chocolate ganache ribbons and crunchy Belgian chocolate chunks.",
        "long": "An irresistible swirl of deep dark chocolate and golden vanilla butter dough baked into tender, crumbly cookies. Made with single-origin cocoa, French T45 flour, and almond flour with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, single-origin dark cocoa, dark chocolate chunks 70%, pure dairy butter, natural erythritol & stevia blend.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/choco-mix-cookies.jpg",
        "images": ["assets/img/products/choco-mix-cookies.jpg"],
        "tags": ["cookies", "chocolate", "marble", "eggless", "bestseller"]
    },
    {
        "id": "chocochips-pastry",
        "name": "Chocochips Pastry",
        "brand": "signature",
        "cats": ["pastries", "desserts"],
        "price": 80,
        "mrp": 95,
        "rating": 4.9,
        "reviews": 194,
        "badges": ["NEW", "BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "piece",
        "occasions": ["birthday", "celebration", "teatime"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Decadent dark chocolate sponge layered with velvety Belgian chocolate mousse and loaded with crisp dark chocolate chips.",
        "long": "A signature patisserie slice featuring airy cocoa sponge crafted with French T45 flour, single-origin cacao, and almond flour, coated in dark chocolate ganache and studded with crunchy chocolate chips. 100% Eggless, gluten-free, and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, single-origin cacao 70%, dark chocolate chips, dairy cream, natural erythritol & stevia blend, cold-pressed oils.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/chocochips-pastry.jpg",
        "images": ["assets/img/products/chocochips-pastry.jpg"],
        "tags": ["pastry", "chocochips", "chocolate", "eggless", "signature"]
    },
    {
        "id": "chocolate-choco-mix",
        "name": "Chocolate Choco Mix",
        "brand": "doughremi",
        "cats": ["cookies", "chocolates"],
        "price": 800,
        "mrp": 920,
        "rating": 5.0,
        "reviews": 132,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "festival", "corporate"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Double chocolate artisan cookies baked with rich Dutch cocoa and packed with molten chocolate chips in every bite.",
        "long": "For intense chocolate lovers: a deeply decadent dark cocoa biscuit dough packed with crunchy and melty sugar-free chocolate chips. Baked to perfection with French T45 flour and zero refined sugar.",
        "ingredients": "French T45 pastry flour, almond flour, Dutch cocoa powder, dark chocolate morsels, pure grass-fed butter, natural plant sweetener.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/chocolate-choco-mix.jpg",
        "images": ["assets/img/products/chocolate-choco-mix.jpg"],
        "tags": ["cookies", "double-chocolate", "cocoa", "eggless"]
    },
    {
        "id": "artisan-chocolate-cookies",
        "name": "Chocolate Cookies",
        "brand": "doughremi",
        "cats": ["cookies", "chocolates"],
        "price": 800,
        "mrp": 920,
        "rating": 4.8,
        "reviews": 76,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "snack"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Classic crumbly dark chocolate butter cookies crafted with fine cocoa and pure dairy butter. Pure nostalgic crunch.",
        "long": "A timeless bakery favourite reinvented: rich cocoa butter cookies baked with French T45 flour and zero refined sugar. Crisp edges, delicate crumbly center, and subtle Madagascar vanilla finish.",
        "ingredients": "French T45 pastry flour, almond flour, single-origin cacao, pure dairy butter, natural erythritol & stevia blend, vanilla bean.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/artisan-chocolate-cookies.jpg",
        "images": ["assets/img/products/artisan-chocolate-cookies.jpg"],
        "tags": ["cookies", "chocolate", "classic", "eggless"]
    },
    {
        "id": "coconut-butter-mix",
        "name": "Coconut Butter Mix",
        "brand": "doughremi",
        "cats": ["cookies", "healthy-snacks"],
        "price": 800,
        "mrp": 920,
        "rating": 4.9,
        "reviews": 98,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "festival"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Fragrant toasted coconut flakes blended into golden grass-fed butter cookies. Sweet, tropical, and delightfully crumbly.",
        "long": "Slow-roasted coconut flakes folded into rich cultured butter dough made with French T45 pastry flour and almond flour. Every bite delivers a satisfying tropical aroma and delicate crumb.",
        "ingredients": "French T45 pastry flour, almond flour, roasted desiccated coconut, pure butter, cold-pressed coconut oil, natural plant sweetener.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/coconut-butter-mix.jpg",
        "images": ["assets/img/products/coconut-butter-mix.jpg"],
        "tags": ["cookies", "coconut", "butter", "eggless", "healthy-snack"]
    },
    {
        "id": "artisan-coconut-cookies",
        "name": "Coconut Cookies",
        "brand": "doughremi",
        "cats": ["cookies", "healthy-snacks"],
        "price": 800,
        "mrp": 920,
        "rating": 4.9,
        "reviews": 115,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "festival"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Golden baked artisanal coconut biscuits rolled in fresh coconut shreds with a whisper of cardamom. Pure homestyle warmth.",
        "long": "An authentic Indian bakery classic made healthy: fresh grated coconut mixed with almond flour and French T45 flour, sweetened naturally with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, freshly grated coconut, pure dairy butter, green cardamom, natural erythritol & stevia blend.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/artisan-coconut-cookies.jpg",
        "images": ["assets/img/products/artisan-coconut-cookies.jpg"],
        "tags": ["cookies", "coconut", "traditional", "eggless"]
    },
    {
        "id": "coconut-laccha",
        "name": "Coconut Laccha",
        "brand": "doughremi",
        "cats": ["cookies", "healthy-snacks", "assamese"],
        "price": 800,
        "mrp": 920,
        "rating": 5.0,
        "reviews": 128,
        "badges": ["NEW", "SIGNATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "festival", "corporate"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Long hand-shredded coconut strands (laccha) baked into crunchy golden caramelized biscuit clusters.",
        "long": "A regional artisanal masterpiece: long shreds of tender coconut slowly roasted and baked with French T45 flour and almond flour. Crispy, chewy, caramelized coconut texture without any refined sugar.",
        "ingredients": "Hand-shredded coconut laccha strands, French T45 pastry flour, almond flour, pure grass-fed butter, natural erythritol & stevia blend.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/coconut-laccha.jpg",
        "images": ["assets/img/products/coconut-laccha.jpg"],
        "tags": ["cookies", "coconut-laccha", "assamese", "signature", "eggless"]
    },
    {
        "id": "artisanal-glazed-donut",
        "name": "Artisanal Glazed Donut",
        "brand": "signature",
        "cats": ["desserts", "pastries"],
        "price": 50,
        "mrp": 60,
        "rating": 4.9,
        "reviews": 165,
        "badges": ["NEW", "BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "donut",
        "occasions": ["birthday", "celebration", "teatime", "snack"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Soft oven-baked artisanal donut coated in rich dark Belgian chocolate glaze with delicate roasted sprinkles. Baked, never fried.",
        "long": "Fluffy, tender, and oven-baked to golden perfection with zero deep-frying. Crafted using French T45 pastry flour and almond flour, dipped in warm dark chocolate glaze and sweetened with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, oat flour, single-origin dark cocoa glaze, fresh milk, pure butter, natural plant sweetener.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/artisanal-glazed-donut.jpg",
        "images": ["assets/img/products/artisanal-glazed-donut.jpg"],
        "tags": ["donut", "dessert", "chocolate-glaze", "baked", "eggless"]
    },
    {
        "id": "glass-cake",
        "name": "Glass Cake",
        "brand": "signature",
        "cats": ["desserts", "pastries", "celebration-cakes"],
        "price": 100,
        "mrp": 120,
        "rating": 5.0,
        "reviews": 210,
        "badges": ["NEW", "SIGNATURE", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "glass",
        "occasions": ["birthday", "celebration", "corporate", "gifting"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Gourmet layered dessert served in a crystal glass jar: moist vanilla-chocolate sponge, dark chocolate ganache, and velvety cream.",
        "long": "An exquisite single-serve dessert in an elegant glass jar. Alternating layers of moist cocoa sponge, airy whipped cream, rich Belgian chocolate ganache, and roasted hazelnut praline. Made with French T45 flour and zero refined sugar.",
        "ingredients": "French T45 pastry flour, almond flour, dairy cream, Belgian dark chocolate 70%, roasted hazelnuts, natural erythritol & stevia blend.",
        "allergens": ["Milk / Dairy", "Tree nuts (hazelnut, almond)"],
        "customisable": False,
        "image": "assets/img/products/glass-cake.jpg",
        "images": ["assets/img/products/glass-cake.jpg"],
        "tags": ["glass-cake", "jar-cake", "dessert", "chocolate", "signature"]
    },
    {
        "id": "jeera-biscuits",
        "name": "Jeera Biscuits",
        "brand": "doughremi",
        "cats": ["cookies", "savouries", "healthy-snacks"],
        "price": 800,
        "mrp": 920,
        "rating": 4.9,
        "reviews": 142,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "snack"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Savory-sweet Indian tea biscuits loaded with freshly roasted whole cumin seeds and a hint of pink rock salt.",
        "long": "The quintessential chai partner baked the healthy way: aromatic roasted cumin (jeera) blended into flaky butter biscuit dough with French T45 flour and almond flour. Melt-in-the-mouth crumb with crisp spiced edges. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, pure grass-fed butter, roasted whole cumin seeds (jeera), Himalayan pink salt, natural stevia touch.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/jeera-biscuits.jpg",
        "images": ["assets/img/products/jeera-biscuits.jpg"],
        "tags": ["biscuits", "jeera", "cumin", "savory", "eggless", "chai"]
    },
    {
        "id": "peanut-cookies",
        "name": "Peanut Cookies",
        "brand": "doughremi",
        "cats": ["cookies", "healthy-snacks"],
        "price": 800,
        "mrp": 920,
        "rating": 4.8,
        "reviews": 84,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "snack"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Crunchy roasted peanut cookies crafted with pure peanut butter and toasted peanut chunks. High protein and nutrient-packed.",
        "long": "Packed with real roasted peanuts and stone-ground peanut butter, these hearty cookies provide wholesome energy without refined sugar. Baked with French T45 pastry flour and almond flour for a rich, crumbly texture.",
        "ingredients": "Roasted peanuts, stone-ground peanut butter, French T45 pastry flour, almond flour, pure butter, natural plant sweetener, sea salt.",
        "allergens": ["Milk / Dairy", "Peanuts", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/peanut-cookies.jpg",
        "images": ["assets/img/products/peanut-cookies.jpg"],
        "tags": ["cookies", "peanut", "nutty", "protein", "eggless"]
    },
    {
        "id": "seeds-butter-mix",
        "name": "Seeds Butter Mix",
        "brand": "doughremi",
        "cats": ["cookies", "healthy-snacks"],
        "price": 800,
        "mrp": 920,
        "rating": 5.0,
        "reviews": 118,
        "badges": ["NEW", "BESTSELLER", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "healthy-snack"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Power-packed artisan butter cookies loaded with roasted pumpkin, sunflower, flax, and chia seeds for satisfying superfood crunch.",
        "long": "A nutritional powerhouse: golden butter cookies loaded with an artisanal quartet of roasted pumpkin, sunflower, flax, and chia seeds. Baked with French T45 flour and almond flour with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, roasted pumpkin seeds, sunflower seeds, chia seeds, flax seeds, grass-fed butter, natural erythritol.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/seeds-butter-mix.jpg",
        "images": ["assets/img/products/seeds-butter-mix.jpg"],
        "tags": ["cookies", "seeds", "superfood", "crunch", "eggless"]
    },
    {
        "id": "stick-jeera-biscuit",
        "name": "Stick Jeera Biscuits",
        "brand": "doughremi",
        "cats": ["cookies", "savouries", "healthy-snacks"],
        "price": 800,
        "mrp": 920,
        "rating": 4.9,
        "reviews": 105,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "perKg",
        "occasions": ["teatime", "snack"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Slender, crispy cumin-spiced finger biscuits with a delicate butter crunch. Perfect for dipping into morning Assam tea.",
        "long": "A beloved bakery tradition in finger-biscuit form: slender roasted cumin biscuits baked to golden snap with French T45 flour, pure butter, and sea salt. 100% Eggless, gluten-free, and sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, roasted whole cumin seeds, pure dairy butter, Himalayan rock salt, natural stevia touch.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/stick-jeera-biscuit.jpg",
        "images": ["assets/img/products/stick-jeera-biscuit.jpg"],
        "tags": ["biscuits", "jeera-sticks", "savory", "snack", "eggless"]
    },
    {
        "id": "strawberry-pastry",
        "name": "Strawberry Pastry",
        "brand": "signature",
        "cats": ["pastries", "desserts"],
        "price": 80,
        "mrp": 95,
        "rating": 4.9,
        "reviews": 158,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "piece",
        "occasions": ["birthday", "celebration", "teatime"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Light, fluffy vanilla sponge layered with luscious real strawberry compote and whipped dairy cream, crowned with strawberry glaze.",
        "long": "A delicate berry delight: light-as-air vanilla sponge baked with French T45 flour and almond flour, layered with handmade sugar-free strawberry compote and silky whipped cream. 100% Egg-Free and guilt-free.",
        "ingredients": "French T45 pastry flour, almond flour, real strawberry puree, dairy cream, natural erythritol & stevia blend, Madagascar vanilla.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/strawberry-pastry.jpg",
        "images": ["assets/img/products/strawberry-pastry.jpg"],
        "tags": ["pastry", "strawberry", "fresh-cream", "eggless", "signature"]
    },
    {
        "id": "vanilla-pastry",
        "name": "Vanilla Pastry",
        "brand": "signature",
        "cats": ["pastries", "desserts"],
        "price": 80,
        "mrp": 95,
        "rating": 4.8,
        "reviews": 126,
        "badges": ["NEW", "EGGLESS", "GLUTEN-FREE", "NO-MAIDA", "SUGAR-FREE"],
        "sizes": "piece",
        "occasions": ["birthday", "celebration", "teatime"],
        "diet": ["sugar-free", "gluten-free", "eggless", "no-maida"],
        "desc": "Classic delicate vanilla sponge infused with pure Madagascar vanilla bean, layered with velvety whipped cream and white chocolate.",
        "long": "Elegance in simplicity: moist vanilla sponge crafted with French T45 flour, real Madagascar vanilla beans, and almond flour, filled with whipped dairy cream and sugar-free white chocolate curls. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, pure Madagascar vanilla bean, fresh dairy cream, sugar-free white chocolate shavings, natural plant sweetener.",
        "allergens": ["Milk / Dairy", "Tree nuts (almond)"],
        "customisable": False,
        "image": "assets/img/products/vanilla-pastry.jpg",
        "images": ["assets/img/products/vanilla-pastry.jpg"],
        "tags": ["pastry", "vanilla", "classic", "eggless", "signature"]
    }
]

print(f"Prepared {len(NEW_PRODUCTS)} new products.")

with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Ensure sizeSets contains perKg, piece, glass, donut
if 'perKg:' not in text:
    old_single = 'single: [{ id: "std", label: "Standard", weight: "", servings: "", mult: 1 }]'
    new_sizes = '''perKg: [
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
    single: [{ id: "std", label: "Standard", weight: "", servings: "", mult: 1 }]'''
    text = text.replace(old_single, new_sizes)
    print("Added perKg, piece, glass, donut to sizeSets.")

# 2. Append new products right before "  ];\n\n  /* ------------------------- Product normaliser ------------------------- */"
marker = '  ];\n\n  /* ------------------------- Product normaliser ------------------------- */'
if marker not in text:
    # Try alternate indentation or line endings
    idx = text.find('/* ------------------------- Product normaliser ------------------------- */')
    if idx != -1:
        # find the preceding "];"
        close_idx = text.rfind('];', 0, idx)
        if close_idx != -1:
            marker = text[close_idx:idx]
            print(f"Found dynamic marker: repr={repr(marker)}")

if marker not in text:
    print("Could not find rawProducts end marker!")
    exit(1)

products_js_lines = []
for p in NEW_PRODUCTS:
    p_json = json.dumps(p, indent=6)
    products_js_lines.append("    " + p_json)

new_products_block = ",\n" + ",\n".join(products_js_lines) + "\n  "

text = text.replace(marker, new_products_block + marker)

with open('assets/js/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print(f"Successfully added {len(NEW_PRODUCTS)} products to assets/js/data.js!")

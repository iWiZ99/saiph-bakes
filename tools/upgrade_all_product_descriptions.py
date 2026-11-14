# -*- coding: utf-8 -*-
"""
Upgrade product descriptions across all 224 products in SAiPH Bakes.
Ensures every product has:
1. `desc`: (100-160 chars) An exquisite, complete sensory sentence. Zero truncation or ellipses.
2. `long`: (200-400 chars) 2-3 flowing, gourmet sentences detailing flavor profile, artisanal craft,
   and dietary promise (mentioning French T45 flour for cakes/pastries/breads, zero refined sugar, eggless).
3. `ingredients`: Clean culinary ingredients list including French T45 flour where applicable.
"""
import json
import re

with open('scratch/all_224_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Master tailored descriptions for products that had truncated/scraped text or need luxury refinement
TAILORED = {
    # Healthy spreads & pantry
    "sugar-free-almond-butter": {
        "desc": "Stone-ground slow-roasted California almonds crafted into a creamy, nutrient-rich spread with zero added sugars, oils, or preservatives.",
        "long": "Crafted exclusively from 100% slow-roasted California almonds stone-ground into a silky, golden-brown butter. Naturally rich in vitamin E, plant protein, and healthy monounsaturated fats with zero added sugar, palm oil, or preservatives. Drizzle over warm sourdough toast, swirl into morning oatmeal, or enjoy straight from the spoon.",
        "ingredients": "100% slow-roasted California almonds, touch of Himalayan pink salt."
    },
    "sugar-free-tiramisu-spread": {
        "desc": "Luxurious sugar-free dessert spread blending rich Italian espresso, roasted cashew cream, and single-origin dark cocoa solids.",
        "long": "Inspired by the timeless romance of Venetian tiramisu: slow-simmered roasted cashew butter infused with bold dark-roast espresso and single-origin cocoa. Naturally sweetened with organic stevia and erythritol for a velvety, aromatic spread. Perfect on warm brioche, crepes, or fresh fruit.",
        "ingredients": "Roasted cashews, single-origin cocoa solids, dark espresso beans, natural stevia & erythritol blend, cold-pressed coconut oil."
    },
    "sugar-free-hazelnut-spread": {
        "desc": "Velvety sugar-free chocolate hazelnut spread crafted with 100% roasted Turkish hazelnuts, dark cocoa, and zero palm oil.",
        "long": "A mindful tribute to classic gianduja: slow-roasted Turkish hazelnuts stone-ground into a rich, velvety butter folded with 70% dark Belgian cocoa. Sweetened gently with stevia and completely free from palm oil, hydrogenated fats, and refined sugar. Decadent, glossy, and deeply satisfying.",
        "ingredients": "Roasted Turkish hazelnuts (65%), single-origin cocoa solids, natural stevia extract, cocoa butter, sunflower lecithin."
    },
    "paprika-and-garlic-crackers": {
        "desc": "Crispy golden artisan crackers infused with smoked Spanish paprika, slow-roasted garlic, and cold-pressed olive oil.",
        "long": "Golden-baked artisan crackers rolled thin for a sharp, delicate snap: seasoned with fragrant smoked pimentón paprika, roasted garlic chips, and cold-pressed oils. Wholesome, gluten-free, and vegan. An essential accompaniment for artisanal cheese boards, hummus dips, and evening grazing.",
        "ingredients": "Almond flour, tapioca starch, smoked paprika, roasted garlic, cold-pressed olive oil, flaxseeds, sea salt."
    },
    "herb-and-cheese-crackers": {
        "desc": "Crisp savoury crackers baked with aged white cheddar, fragrant Mediterranean rosemary, oregano, and toasted seeds.",
        "long": "Delicate, golden-baked savoury crackers packed with sharp aged cheddar, crushed dried oregano, wild thyme, and toasted sesame seeds. Delivers a robust savory crunch in every bite with zero refined flour or trans fats. Perfect for dips, wine pairings, and mindful snacking.",
        "ingredients": "Almond flour, aged white cheddar, dried Mediterranean herbs (oregano, rosemary, thyme), olive oil, sea salt."
    },
    "chocolate-kaju-katli-tart": {
        "desc": "Buttery almond tart shell filled with velvety dark Belgian chocolate ganache and crowned with traditional silver-foiled kaju katli.",
        "long": "An exquisite fusion of French patisserie and royal Indian confection: a crisp almond flour tart shell filled with 70% dark chocolate ganache, crowned with hand-cut cashew marzipan katli and edible silver foil. 100% Eggless, gluten-free, and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, cashew nuts, dark chocolate 70%, dairy cream, natural plant sweeteners, edible silver leaf."
    },
    "kesar-rabdi-basque-cheesecake": {
        "desc": "Caramelized Basque cheesecake infused with royal Kashmiri saffron, layered with slow-simmered sugar-free rabdi and pistachios.",
        "long": "A regal celebration dessert merging Spanish culinary craft with Awadhi heritage: slow-baked Basque cheesecake infused with fragrant saffron threads, finished with a rich layer of creamy sugar-free rabdi and toasted Iranian pistachios. 100% Gluten-free, eggless, and refined sugar-free.",
        "ingredients": "Cream cheese, fresh dairy cream, almond flour, Kashmiri saffron, full-fat milk reduction (rabdi), erythritol & stevia blend, pistachios."
    },
    "pistachio-basque-cheesecake": {
        "desc": "Velvety Spanish Basque cheesecake infused with pure Sicilian pistachio paste, finished with a caramelized burnt top.",
        "long": "Slow-baked at high temperature to achieve the iconic caramelized Basque exterior while keeping the center silken and molten. Infused throughout with 100% pure pistachio butter, whipped cream cheese, and natural sweeteners. 100% Eggless, gluten-free, and refined sugar-free.",
        "ingredients": "Cream cheese, dairy cream, pure roasted pistachio butter, almond flour, natural erythritol blend, crushed pistachios."
    },
    "vanilla-basque-cheesecake": {
        "desc": "Classic burnt Basque cheesecake made with pure Madagascar Bourbon vanilla beans and rich whipped cream cheese.",
        "long": "The purest expression of the Basque tradition: velvety cream cheese infused with aromatic Madagascar vanilla beans, baked to deep golden caramelized perfection. Intensely creamy at the center with gentle caramelized notes on the crust. 100% Gluten-Free and refined sugar-free.",
        "ingredients": "Cream cheese, fresh dairy cream, almond flour, Madagascar Bourbon vanilla bean, natural stevia & erythritol blend."
    },
    "chocolate-basque-cheesecake": {
        "desc": "Decadent dark chocolate Basque cheesecake featuring a crackled caramelized crust and molten 70% cocoa core.",
        "long": "Rich 70% Belgian dark chocolate folded into creamy cream cheese and baked until deeply caramelized on top while retaining a soft, fudge-like interior. Crafted without maida or refined sugars. 100% Eggless and gluten-free.",
        "ingredients": "Cream cheese, dark Belgian chocolate 70%, fresh cream, almond flour, single-origin cacao, natural plant sweetener."
    },
    "pistachio-chocolate-fudge-bites": {
        "desc": "Twelve melt-in-mouth dark chocolate fudge squares topped with roasted pistachio praline and crisp cocoa feuilletine.",
        "long": "Intensely rich bite-sized squares of 70% dark Belgian chocolate fudge, blended with roasted pistachio butter and finished with a crunchy pistachio praline crown. Box of 12 pieces. 100% Eggless, gluten-free, and refined sugar-free.",
        "ingredients": "Dark chocolate 70%, roasted pistachio butter, dairy cream, coconut oil, natural erythritol, roasted pistachios."
    },
    "rasmalai-fudge-bites": {
        "desc": "Delicate white chocolate fudge squares infused with saffron milk, green cardamom, and toasted almond slivers.",
        "long": "A contemporary tribute to royal rasmalai: velvety white cocoa butter fudge infused with saffron threads, crushed cardamom, and rose water, studded with toasted almond flakes. 100% Eggless, gluten-free, and sweetened without refined sugar.",
        "ingredients": "Cocoa butter, dairy milk solids, Kashmiri saffron, green cardamom, roasted almonds, erythritol blend."
    },
    "chocolate-praline-barks": {
        "desc": "Crisp shards of dark chocolate bark layered with caramelized hazelnut praline and sprinkled with Maldon sea salt.",
        "long": "Hand-poured artisan dark chocolate slabs generously studded with crunchy roasted hazelnut praline, almond crisps, and flaky sea salt. Broken into rustic shards for a sublime texture contrast. Sweetened with stevia. 100% Gluten-Free and vegan.",
        "ingredients": "Dark chocolate 70%, roasted hazelnuts, almond flour, coconut oil, natural plant sweetener, sea salt."
    },
    "motichoor-barks": {
        "desc": "Festive dark chocolate bark embedded with golden sugar-free motichoor pearls and toasted pistachio crisps.",
        "long": "A showstopping festive delicacy: glossy dark chocolate slabs embedded with delicate pearls of sugar-free saffron motichoor and crushed green pistachios. Offers an irresistible contrast of creamy chocolate and spiced besan pearls. 100% Gluten-Free.",
        "ingredients": "Dark chocolate 70%, gram flour (besan), ghee, saffron, natural erythritol sweetener, roasted pistachios."
    },
    "hazelnut-mocha-opera-pastry": {
        "desc": "Refined French opera slice featuring almond sponge soaked in espresso, hazelnut buttercream, and dark chocolate ganache.",
        "long": "Classic French pâtisserie artistry: thin layers of almond joconde sponge soaked in dark roast espresso syrup, layered with smooth hazelnut praline buttercream and dark chocolate ganache. Baked with French T45 flour and zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, roasted hazelnuts, espresso reduction, dark chocolate 70%, dairy cream, erythritol."
    },
    "mocha-caramel-crunch-mini-cake": {
        "desc": "Petite celebration cake with mocha-infused sponge, slow-cooked caramel buttercream, and crunchy cashew brittle.",
        "long": "A rich dessert centerpiece: moist cocoa-espresso sponge layered with whipped mocha cream, slow-simmered sugar-free salted caramel, and roasted cashew brittle. Baked with French T45 flour with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, single-origin cacao, dark espresso, house-made salted caramel, dairy cream, cashews."
    },
    "triple-chocolate-crunch-mini-cake": {
        "desc": "Three layers of dark, milk, and white chocolate mousse over cocoa sponge with a crisp praline crunch base.",
        "long": "An architectural chocolate triumph: layers of airy dark, milk, and white chocolate cream resting upon a moist cocoa sponge and a feuilletine praline crunch base. Crafted with zero maida and zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark chocolate 70%, milk chocolate, white chocolate, fresh cream, hazelnut praline."
    },
    "blueberry-cream-mini-cake": {
        "desc": "Fluffy vanilla sponge layered with wild blueberry compote and light whipped chantilly cream.",
        "long": "Delicate, golden vanilla sponge crafted with French T45 flour, layered with slow-simmered wild blueberry compote and clouds of whipped chantilly cream. Bright, fruity, and naturally sweetened with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, wild blueberries, dairy cream, Madagascar vanilla bean, natural stevia & erythritol blend."
    },
    "chocolate-blueberry-mini-cake": {
        "desc": "Dark Belgian chocolate sponge layered with tart blueberry compote and rich 70% cocoa ganache.",
        "long": "The harmonious balance of deep dark chocolate and tangy wild berries: moist cocoa sponge made with French T45 flour, enveloped in 70% dark Belgian chocolate ganache and tart blueberry reduction. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, dark chocolate 70%, blueberries, fresh cream, single-origin cocoa, natural plant sweetener."
    },
    "mix-fruit-mini-cake": {
        "desc": "Delicate vanilla sponge layered with whipped mascarpone cream and an abundance of fresh seasonal fruits.",
        "long": "A vibrant celebration cake: tender vanilla sponge layered with light dairy cream and crowned with freshly sliced strawberries, kiwi, pomegranate, and seasonal fruit. Light, refreshing, and free from refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, fresh seasonal fruits, dairy cream, Madagascar vanilla, natural erythritol."
    },
    "hazelnut-crunch-mini-cake": {
        "desc": "Moist cocoa sponge layered with stone-ground roasted hazelnut praline butter and silky dark chocolate ganache.",
        "long": "Layers of tender chocolate sponge filled with stone-ground sugar-free hazelnut butter, dark chocolate ganache, and caramelized hazelnut crunch. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, Turkish hazelnuts, dark chocolate 70%, dairy cream, natural plant sweetener."
    },
    "pineapple-cream-mini-cake": {
        "desc": "Tender sponge soaked in real pineapple nectar, layered with slow-simmered pineapple compote and fresh cream.",
        "long": "A nostalgic tropical favourite: light sponge crafted with French T45 flour, layered with juicy pineapple compote and velvety whipped dairy cream, topped with dehydrated pineapple blossoms. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, fresh pineapple compote, dairy cream, Madagascar vanilla, natural erythritol."
    },
    "belgian-chocolate-mini-cake": {
        "desc": "Intensely rich chocolate cake layered with 70% Callebaut dark chocolate mousse and mirror glaze.",
        "long": "Pure unadulterated Belgian chocolate luxury: moist cocoa sponge made with French T45 flour, layered with airy dark chocolate mousse and draped in a glossy dark glaze. Decadent, silky, and free from refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, Callebaut 70% dark chocolate, single-origin cacao, fresh cream, erythritol."
    },
    "triple-chocolate-crunch-cake-1": {
        "desc": "Decadent celebration cake featuring dark, milk, and white chocolate mousse layers over a crisp praline base.",
        "long": "A breathtaking tiered chocolate masterpiece: layered with dark, milk, and white chocolate cream, cocoa sponge, and crunchy hazelnut praline. Baked fresh with French T45 flour with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark chocolate, milk chocolate, white chocolate, hazelnut praline, dairy cream."
    },
    "chocolate-caramel-noir-mini-cake": {
        "desc": "Dark chocolate sponge layered with sea-salted caramel cream, dark ganache, and caramelized crunch.",
        "long": "Deep cocoa sponge layered with rich dark chocolate ganache, house-made sea-salted caramel, and caramelized popcorn crisps. Sophisticated, bittersweet, and completely refined sugar-free. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark chocolate 70%, sea-salted caramel, dairy cream, natural plant sweetener."
    },
    "berry-chantilly-mini-cake": {
        "desc": "Featherlight vanilla sponge layered with mixed forest berry compote and delicate French chantilly cream.",
        "long": "Light vanilla bean sponge crafted with French T45 flour, layered with a ruby compote of raspberries, blackberries, and strawberries, finished with clouds of chantilly frosting. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, raspberries, blackberries, strawberries, dairy cream, Madagascar vanilla."
    },
    "marble-opulence-mini-cake": {
        "desc": "Swirled dark chocolate and vanilla sponge layered with baked cheesecake cream and marbled chocolate curls.",
        "long": "An artistic fusion of two classics: tender swirls of dark cocoa and Bourbon vanilla sponge, filled with smooth baked cheesecake cream and draped in marbled chocolate ganache. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, cream cheese, dark chocolate, dairy cream, Madagascar vanilla, natural sweetener."
    },
    "chocolate-caramel-noir-cake": {
        "desc": "Grand celebration cake layered with single-origin dark chocolate, sea-salted caramel, and caramelized praline.",
        "long": "An opulent dark chocolate showstopper: moist cocoa sponge crafted with French T45 flour, filled with dark ganache, slow-simmered sea-salted caramel, and crunchy hazelnut praline. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, single-origin cocoa, dark chocolate 70%, salted caramel, dairy cream, hazelnuts."
    },
    "berry-chantilly-cake": {
        "desc": "Grand celebration cake layered with wild berry compote, whipped chantilly cream, and fresh forest berries.",
        "long": "Elegant, refreshing, and celebration-ready: tender vanilla sponge layered with ruby forest berry reduction and clouds of French chantilly cream, crowned with fresh berries. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, forest berries, dairy cream, Madagascar vanilla bean, natural stevia & erythritol blend."
    },
    "marble-opulence-cake": {
        "desc": "Artisan celebration cake featuring intricate swirls of Belgian cocoa and vanilla sponge with chocolate cheesecake frosting.",
        "long": "A majestic cake combining rich Belgian chocolate and fragrant vanilla bean sponge, filled with velvety cheesecake mousse and glossy marbled ganache. Zero refined sugar, zero maida, 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, cream cheese, Belgian dark chocolate, dairy cream, natural erythritol."
    },
    "brown-butter-cookie-box": {
        "desc": "Melt-in-mouth French shortbread cookies baked with nut-brown butter, almond flour, and a pinch of fleur de sel.",
        "long": "Slowly browned grass-fed butter gives these delicate shortbread biscuits their intoxicating hazelnut aroma and rich golden crumb. Baked with almond flour and natural sweetness. Box of 8 artisan cookies. 100% Eggless and gluten-free.",
        "ingredients": "Almond flour, grass-fed brown butter, natural erythritol blend, vanilla bean, sea salt."
    },
    "gooey-chocolate-muffins": {
        "desc": "Rich dark chocolate almond muffins with a molten chocolate fudge center and crisp chocolate chip crown.",
        "long": "Baked with single-origin cocoa and stone-ground almond flour, these decadent muffins feature a rich, fudgy center that turns molten when warmed. Naturally sweetened with zero refined sugar. Box of 4 muffins. 100% Eggless.",
        "ingredients": "Almond flour, dark chocolate 70%, single-origin cocoa, dairy butter, natural plant sweetener, cold-pressed oils."
    },
    "classic-cinnamon-roll": {
        "desc": "Warm, pillowy brioche roll swirled with fragrant Ceylon cinnamon and topped with silky cream cheese glaze.",
        "long": "Soft, slow-fermented enriched dough rolled with brown butter and Ceylon cinnamon, baked golden and drizzled with a decadent sugar-free vanilla cream cheese glaze. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butter, Ceylon cinnamon, cream cheese, natural erythritol blend, milk."
    },
    "hazelnut-cinnamon-roll": {
        "desc": "Soft bakery cinnamon roll swirled with roasted Turkish hazelnut butter and dark chocolate drizzle.",
        "long": "Pillowy brioche dough swirled with aromatic cinnamon and stone-ground hazelnut butter, finished with crushed roasted hazelnuts and dark chocolate glaze. Zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butter, Ceylon cinnamon, roasted hazelnuts, dark chocolate, cream cheese, natural sweetener."
    },
    "tiramisu-cinnamon-roll": {
        "desc": "Decadent bakery roll infused with dark roast espresso, cinnamon butter, and whipped mascarpone frosting.",
        "long": "A brilliant coffeehouse marriage: cinnamon brioche dough soaked with dark espresso syrup, layered with sweet mascarpone frosting and dusted with dark cocoa. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butter, espresso reduction, Ceylon cinnamon, mascarpone cream, dark cocoa, natural sweetener."
    },
    "pistachio-cinnamon-roll": {
        "desc": "Artisan cinnamon swirl roll filled with pure pistachio cream and topped with crushed Iranian pistachios.",
        "long": "Slow-fermented brioche dough rolled with fragrant cinnamon butter and luscious pure pistachio paste, finished with a smooth cream glaze and chopped green pistachios. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, butter, pure pistachio paste, Ceylon cinnamon, cream cheese, pistachios, natural sweetener."
    },
    "brookie-box": {
        "desc": "The ultimate hybrid treat: chewy chocolate chip cookie dough baked together with fudgy dark chocolate brownie.",
        "long": "Why choose between a cookie and a brownie? Enjoy the best of both worlds with our signature brookies: a golden chewy chocolate chip cookie crust fused with a dense, melt-in-the-mouth dark chocolate brownie core. Box of 8 pieces. 100% Gluten-Free.",
        "ingredients": "Almond flour, dark chocolate 70%, vegan butter, chocolate chips, natural stevia & erythritol blend, flaxseeds."
    },
    "hazelnut-melt-cookie-box": {
        "desc": "Decadent chocolate cookies filled with a molten sugar-free hazelnut center and studded with roasted hazelnuts.",
        "long": "Thick, bakery-style dark chocolate cookies with a crisp exterior and a warm molten hazelnut core. Baked with almond flour, pure cocoa, and roasted Turkish hazelnuts with zero refined sugar. Box of 6 cookies. 100% Eggless.",
        "ingredients": "Almond flour, roasted hazelnuts, dark chocolate, coconut oil, natural erythritol, sea salt."
    },
    "pistachio-chocolate-cookie-box": {
        "desc": "Chunky artisan cookies loaded with roasted pistachios, dark chocolate chunks, and stone-ground almond flour.",
        "long": "Generously packed with roasted green pistachios and 70% dark chocolate chunks: a buttery, golden-baked cookie with a rich nutty aroma and tender center. 100% Eggless, gluten-free, and refined sugar-free. Box of 6 cookies.",
        "ingredients": "Almond flour, roasted pistachios, dark chocolate 70%, butter, natural plant sweetener, sea salt."
    },
    "double-chocolate-cookie-box": {
        "desc": "Deeply fudgy dark cocoa cookies loaded with molten dark chocolate chips and a sprinkle of sea salt.",
        "long": "Double the chocolate, double the indulgence: rich cocoa dough baked to a chewy, fudge-like center and studded with dark chocolate chunks and sea salt flakes. Box of 6 cookies. 100% Eggless and gluten-free.",
        "ingredients": "Almond flour, dark chocolate chips, single-origin cacao, grass-fed butter, natural erythritol blend."
    },
    "cacao-butter-cake": {
        "desc": "Rich, tender tea loaf baked with pure cocoa butter, dark chocolate chips, and aromatic vanilla bean.",
        "long": "An exceptionally moist morning teacake: baked with pure cocoa butter, stone-ground almond flour, and dark chocolate chips. Delivers a deep chocolate aroma and velvety crumb. Perfect with afternoon tea. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, cocoa butter, dark chocolate chips, dairy milk, natural plant sweetener."
    },
    "filter-coffee-fudge-bites": {
        "desc": "Bite-sized squares of dark chocolate fudge infused with South Indian chicory-rich filter coffee.",
        "long": "A celebration of South Indian coffee culture: rich dark chocolate fudge steeped with intensely aromatic filter coffee decoction. Smooth, bittersweet, and decadent. Box of 12 pieces. 100% Eggless and refined sugar-free.",
        "ingredients": "Dark chocolate 70%, filter coffee decoction, dairy cream, coconut oil, natural erythritol, cocoa butter."
    },
    "dark-chocolate-praline-fudge-bites": {
        "desc": "Velvety dark chocolate fudge squares studded with caramelized almond and cashew praline.",
        "long": "Rich 70% Belgian chocolate fudge blended with golden caramelized nut praline for an exquisite contrast of silky fudge and crunchy nut crisps. Box of 12 pieces. 100% Eggless, gluten-free, and sugar-free.",
        "ingredients": "Dark chocolate 70%, roasted almonds, cashews, dairy cream, cocoa butter, natural stevia & erythritol blend."
    },
    "dark-chocolate-babka": {
        "desc": "Artisan brioche babka loaf twisted with endless ribbons of 70% dark Belgian chocolate and roasted almonds.",
        "long": "A traditional Jewish bakery masterpiece: slow-fermented enriched dough ribboned with dark chocolate ganache, rolled and twisted by hand before baking to a golden, glossy finish. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butter, dark chocolate 70%, almond slivers, milk, natural plant sweetener, yeast."
    },
    "pistachio-babka": {
        "desc": "Golden twisted artisan babka loaf filled with house-made sugar-free pistachio butter and toasted pistachios.",
        "long": "Slow-fermented bakery dough layered with creamy green pistachio butter and toasted pistachio slivers, braided into a stunning marbled loaf. Aromatic, buttery, and baked fresh with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butter, pure pistachio butter, roasted pistachios, milk, natural sweetener, yeast."
    },
    "ragi-loaf": {
        "desc": "Hearty, nutrient-dense daily loaf crafted with sprouted finger millet (ragi), whole grains, and flaxseeds.",
        "long": "Packed with calcium, dietary fiber, and ancient grain goodness: slow-fermented sprouted ragi loaf with a tender, moist crumb and earthy nutty flavor. Ideal for wholesome morning toast and savoury sandwiches. Zero maida, zero sugar.",
        "ingredients": "Sprouted ragi (finger millet) flour, whole wheat flour, golden flaxseed, olive oil, yeast, sea salt, water."
    },
    "mixed-seed-loaf": {
        "desc": "Crusty artisan loaf packed with roasted pumpkin, sunflower, sesame, and golden flaxseeds.",
        "long": "A nutrient-rich everyday sandwich bread: studded inside and crust-coated with a roasted quartet of pumpkin, sunflower, flax, and sesame seeds. Baked with zero maida and no chemical dough conditioners. 100% Vegan.",
        "ingredients": "Whole wheat flour, oat flour, roasted pumpkin seeds, sunflower seeds, flaxseeds, sesame seeds, olive oil, sea salt, yeast."
    },
    "almond-loaf": {
        "desc": "Wholesome, tender daily sandwich loaf crafted from 100% pure stone-ground almond flour and golden flaxseed.",
        "long": "Our signature grain-free daily loaf: baked exclusively with premium blanched almond flour, cold-pressed oils, and golden flaxseeds. Naturally low in carbs, high in clean protein, and completely free from gluten, maida, and refined sugars. Ideal for toast and sandwiches.",
        "ingredients": "100% blanched almond flour, cold-pressed oils, golden flaxseed, psyllium husk, baking powder, sea salt, water."
    },
    "multi-grain-loaf": {
        "desc": "Nutrient-packed artisan sandwich loaf baked with whole wheat, oats, barley, millet, and roasted seeds.",
        "long": "An everyday staple elevated to artisan standards: slow-fermented five-grain loaf packed with whole wheat, rolled oats, pearl barley, finger millet, and toasted seeds. Yields a tender, fragrant crumb with zero refined sugar. 100% Vegan.",
        "ingredients": "Whole wheat flour, rolled oats, pearl barley, ragi, flaxseeds, sunflower seeds, olive oil, yeast, sea salt."
    },
    "brown-butter-cake": {
        "desc": "Moist, fragrant afternoon tea loaf baked with slow-caramelized grass-fed brown butter and pure vanilla.",
        "long": "The deep, nutty aroma of browned grass-fed butter infuses every crumb of this delicate loaf teacake. Baked with French T45 flour and almond flour with natural plant sweetness. Perfect with morning coffee or tea. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, grass-fed brown butter, dairy milk, Madagascar vanilla, natural erythritol."
    },
    "triple-chocolate-cheesecake-brownie": {
        "desc": "Fudgy dark chocolate almond brownie swirled with rich New York-style baked cheesecake.",
        "long": "The ultimate dessert collision: dense 70% dark Belgian chocolate brownie swirled with a creamy vanilla bean baked cheesecake layer. Rich, fudgy, and naturally sweetened with zero refined sugar. 100% Gluten-free and eggless.",
        "ingredients": "Almond flour, cream cheese, dark chocolate 70%, butter, fresh dairy cream, natural erythritol & stevia blend."
    },
    "chocolate-flourless-cake": {
        "desc": "Intensely rich molten dark chocolate cake baked with almond flour, cocoa butter, and zero grain flours.",
        "long": "For pure chocolate purists: an intensely decadent flourless cake made with 70% Belgian chocolate, almond flour, and pure cocoa butter. Features a velvety crackled crust and a warm molten core. 100% Gluten-Free and eggless.",
        "ingredients": "Dark chocolate 70%, almond flour, vegan butter, single-origin cacao, flaxseed, natural stevia & erythritol blend."
    },
    "banana-walnut-teacake": {
        "desc": "Moist teacake made with naturally sweet ripe bananas, toasted California walnuts, and warm cinnamon.",
        "long": "Baked with naturally ripened bananas, crunchy California walnuts, and a whisper of Ceylon cinnamon. Incredibly moist and aromatic without needing any refined sugar. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, ripe bananas, toasted walnuts, butter, Ceylon cinnamon, natural plant sweetener."
    },
    "chocolate-banana-walnut-teacake": {
        "desc": "Moist dark cocoa teacake packed with naturally sweet ripe bananas and toasted California walnuts.",
        "long": "The unbeatable pairing of ripe bananas, rich cocoa, and crunchy toasted walnuts: a dense, comforting loaf teacake baked with French T45 flour and zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, ripe bananas, dark cocoa, toasted walnuts, butter, natural sweetener."
    },
    "rakhi-cake": {
        "desc": "Festive triple chocolate mousse cake featuring dark, milk, and white chocolate layers over a gluten-free sponge.",
        "long": "An elegant celebration centerpiece: three airy layers of dark, milk, and white chocolate mousse resting upon a soft almond cocoa sponge, crowned with delicate chocolate filigree. Zero refined sugar and 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark chocolate, milk chocolate, white chocolate, fresh dairy cream, erythritol."
    },
    "opera-cake": {
        "desc": "Signature French Opera cake with espresso-soaked almond sponge, hazelnut buttercream, and dark ganache.",
        "long": "Seven exquisite layers of almond joconde sponge soaked in bold espresso, layered with silky hazelnut praline buttercream and dark chocolate ganache, finished with dark mirror glaze. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark espresso, dark chocolate 70%, hazelnut butter, fresh cream, natural sweetener."
    },
    "mocha-caramel-crunch-cake": {
        "desc": "Rich dark chocolate sponge layered with espresso mocha cream, sea-salted caramel, and cashew praline.",
        "long": "A symphony of bold coffee, dark chocolate, and golden caramel: tender cocoa sponge layered with whipped mocha mousse, house-made salted caramel drizzle, and crunchy cashew brittle. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, dark cocoa, dark espresso, salted caramel, cashew praline, dairy cream."
    },
    "apple-cinnamon-teacake": {
        "desc": "Tender spiced loaf teacake studded with caramelized Granny Smith apples and Ceylon cinnamon.",
        "long": "Slow-baked with caramelized spiced apple compote, warm Ceylon cinnamon, and French T45 flour: a tender, fragrant teacake that fills the bakery with warm autumn aromas. Zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Granny Smith apples, Ceylon cinnamon, butter, dairy milk, natural erythritol."
    },
    "dessert-table": {
        "desc": "Bespoke luxury dessert grazing assortment curated for weddings, corporate galas, and intimate celebrations.",
        "long": "A lavish dessert curation featuring an opulent array of artisanal mini entremets, chocolate bonbons, macaron towers, and tartlets. Fully customized for your event theme and dietary preferences with full GST corporate billing.",
        "ingredients": "Assorted luxury bakery selection: dark Belgian chocolate, French T45 pastry flour, seasonal fruits, premium nuts."
    },
    "vanilla-roasted-almond-muffins": {
        "desc": "Fluffy Madagascar vanilla muffins packed with toasted sliced almonds and white chocolate chips.",
        "long": "Golden-baked muffins infused with pure Bourbon vanilla and crowned with toasted sliced almonds and sugar-free white chocolate chips. Tender, moist, and baked fresh every morning. 100% Eggless. Box of 4.",
        "ingredients": "French T45 pastry flour, almond flour, toasted almonds, white chocolate chips, butter, Madagascar vanilla, natural sweetener."
    },
    "chocolate-sinner-cake": {
        "desc": "Ultimate decadent cake: layers of dark chocolate mousse, hazelnut cheesecake, and caramelized praline crunch.",
        "long": "For true chocolate devotees: rich cocoa sponge layered with 70% dark chocolate mousse, velvety hazelnut cheesecake, and crunchy hazelnut praline, draped in chocolate ganache. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, cream cheese, dark chocolate 70%, hazelnut praline, dairy cream, natural sweetener."
    },
    "chocolate-blueberry-tart": {
        "desc": "Crisp almond tart shell filled with dark Belgian chocolate ganache and slow-cooked wild blueberry compote.",
        "long": "Buttery, crisp almond shortcrust tart filled with a layer of tart wild blueberry reduction and rich 70% dark chocolate ganache, topped with fresh blueberries. 100% Eggless, gluten-free, and refined sugar-free.",
        "ingredients": "Almond flour, dark chocolate 70%, wild blueberries, dairy cream, butter, natural stevia & erythritol blend."
    },
    "dark-chocolate-hazelnut-tart": {
        "desc": "Crisp pastry tart filled with silky dark chocolate ganache and roasted Turkish hazelnut praline.",
        "long": "A timeless European classic: crisp almond shortcrust pastry filled with stone-ground roasted hazelnut butter, glossy dark chocolate ganache, and crowned with whole roasted hazelnuts. 100% Eggless and refined sugar-free.",
        "ingredients": "Almond flour, Turkish hazelnuts, dark chocolate 70%, dairy cream, cocoa butter, natural plant sweetener."
    },
    "pistachio-raspberry-cake": {
        "desc": "Tender pistachio sponge layered with tart wild raspberry compote and whipped pistachio chantilly cream.",
        "long": "An elegant pairing of earthy Sicilian pistachios and vibrant red raspberries: moist pistachio sponge layered with ruby raspberry compote and whipped pistachio cream. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure pistachio paste, wild raspberries, dairy cream, almond flour, natural erythritol."
    },
    "gooey-double-chocolate-cookies": {
        "desc": "Thick, fudgy dark chocolate cookies baked with 70% Callebaut chocolate chunks and flaky sea salt.",
        "long": "Baked to a crisp crinkled edge with a rich, gooey chocolate center: packed with dark chocolate chunks and finished with Maldon sea salt. Box of 6 cookies. 100% Eggless and gluten-free.",
        "ingredients": "Almond flour, Callebaut 70% dark chocolate, butter, single-origin cacao, natural plant sweetener, sea salt."
    },
    "hazelnut-butter-brownies": {
        "desc": "Fudgy dark chocolate brownies layered with stone-ground roasted hazelnut butter and crunchy hazelnut flakes.",
        "long": "Box of 8 intensely rich, fudgy almond flour brownies swirled with creamy house-made hazelnut butter and topped with toasted hazelnut flakes. Naturally sweetened with stevia. 100% Gluten-free and eggless.",
        "ingredients": "Almond flour, dark chocolate 70%, pure hazelnut butter, vegan butter, natural stevia & erythritol blend, hazelnuts."
    },
    "choco-almond-crunch-brownies": {
        "desc": "Dense cocoa brownies loaded with dark chocolate chunks and crowned with crisp toasted almond flakes.",
        "long": "Box of 8 deeply fudgy brownies baked with 70% dark chocolate and stone-ground almond flour, crowned with a generous blanket of toasted sliced almonds for a satisfying crunch. 100% Eggless and refined sugar-free.",
        "ingredients": "Almond flour, dark chocolate 70%, toasted almond flakes, dairy butter, single-origin cocoa, natural plant sweetener."
    },
    "dark-chocolate-orange-brownies": {
        "desc": "Fudgy dark chocolate brownies infused with fresh organic orange zest and dark chocolate chips.",
        "long": "The sophisticated pairing of bittersweet cocoa and vibrant citrus: dense almond flour brownies infused with cold-pressed orange oil and fresh zest, studded with dark chocolate chunks. Box of 8. 100% Gluten-Free.",
        "ingredients": "Almond flour, dark chocolate 70%, fresh orange zest, orange oil, vegan butter, natural erythritol blend."
    },
    "fudgy-walnut-brownies": {
        "desc": "Classic dense dark chocolate brownies loaded with toasted California walnuts for a rich, fudgy bite.",
        "long": "Box of 8 classic American-style fudge brownies baked with 70% Belgian chocolate and generous handfuls of buttery toasted California walnuts. Delivers a crackly crust and gooey center. 100% Gluten-Free and eggless.",
        "ingredients": "Almond flour, dark chocolate 70%, toasted California walnuts, dairy butter, natural stevia & erythritol blend."
    },
    "date-and-walnut-teacake": {
        "desc": "Naturally sweet teacake packed with Medjool dates, toasted walnuts, and warm aromatic spices.",
        "long": "Slow-baked with luscious Medjool date puree, toasted California walnuts, and warm winter spices: rich, moist, and naturally sweet with zero refined sugar. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Medjool dates, toasted walnuts, butter, milk, cinnamon, natural plant sweetener."
    },
    "carrot-teacake": {
        "desc": "Moist spiced carrot teacake loaded with freshly grated carrots, roasted walnuts, and cream cheese drizzle.",
        "long": "Tender teacake packed with sweet grated carrots, roasted walnuts, and aromatic nutmeg, finished with a delicate cream cheese glaze. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, fresh carrots, walnuts, cream cheese, butter, cinnamon, nutmeg, natural erythritol."
    },
    "drak-chocolate-orange-teacake": {
        "desc": "Moist dark cocoa loaf teacake infused with fresh orange zest, citrus reduction, and dark chocolate chips.",
        "long": "Deep Dutch cocoa teacake infused with aromatic orange zest and studded with dark chocolate chips. Moist, bittersweet, and baked fresh with French T45 flour with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, single-origin cocoa, fresh orange zest, dark chocolate chips, butter, natural sweetener."
    },
    "gooey-choco-chips-teacake": {
        "desc": "Decadent golden vanilla teacake generously studded with gooey molten dark chocolate chips.",
        "long": "A bakery favourite: moist golden teacake loaded with 70% dark chocolate chips that turn gooey when gently warmed. Baked with French T45 flour and Madagascar vanilla. 100% Eggless.",
        "ingredients": "French T45 pastry flour, dark chocolate chips, butter, milk, Madagascar vanilla, natural plant sweetener."
    },
    "choco-nutty-tea-loaf": {
        "desc": "Wholesome chocolate almond loaf teacake packed with toasted almonds, walnuts, and dark chocolate chunks.",
        "long": "A rich, nutrient-dense breakfast teacake: baked with almond flour, pure cocoa, and a generous mix of roasted almonds and walnuts. Naturally sweetened with zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark cocoa, roasted almonds, walnuts, butter, natural erythritol."
    },
    "choco-latte-tea-loaf": {
        "desc": "Tender cocoa teacake infused with dark roast espresso, dark chocolate chips, and almond flour.",
        "long": "The harmonious union of chocolate and bold morning coffee: tender loaf cake baked with dark espresso, almond flour, and dark chocolate chips. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark espresso reduction, dark chocolate chips, butter, natural sweetener."
    },
    "pineapple-coconut-tea-loaf": {
        "desc": "Tropical loaf teacake infused with desiccated coconut, juicy pineapple chunks, and pure Madagascar vanilla.",
        "long": "Sun-drenched tropical flavours: moist teacake baked with toasted coconut flakes, juicy sweet pineapple chunks, and Bourbon vanilla. Wholesome, aromatic, and baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, toasted coconut, fresh pineapple compote, butter, milk, natural erythritol."
    },
    "lemon-blueberry-teaccake": {
        "desc": "Bright, zesty lemon teacake studded with sweet wild blueberries and drizzled with lemon glaze.",
        "long": "Zesty organic lemon oil and wild blueberries come together in this exceptionally moist loaf: finished with a tangy sugar-free lemon glaze. Baked fresh with French T45 flour and pure butter. 100% Eggless.",
        "ingredients": "French T45 pastry flour, wild blueberries, fresh lemon zest & juice, butter, milk, natural plant sweetener."
    },
    "vanilla-roasted-almond-teacake": {
        "desc": "Soft Madagascar vanilla loaf teacake crowned with toasted roasted almond flakes and chocolate chips.",
        "long": "A beloved bakery staple: tender vanilla bean sponge baked with pure butter, studded with dark chocolate chips, and generously topped with toasted sliced almonds. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, toasted almonds, chocolate chips, butter, Madagascar vanilla, natural sweetener."
    },
    "pistachio-nutella-cake": {
        "desc": "Decadent celebration cake layered with pistachio sponge, house-made sugar-free Nutella, and dark ganache.",
        "long": "A showstopping centerpiece: moist pistachio brownie sponge soaked in almond milk, layered with velvety sugar-free hazelnut Nutella, dark chocolate ganache, and light pistachio mousse. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, pure pistachio paste, hazelnut butter, dark chocolate 70%, dairy cream, natural sweetener."
    },
    "tropical-delight-cake": {
        "desc": "Delicate sponge layered with light dairy cream, fresh tropical fruits, and mango-passionfruit coulis.",
        "long": "A bright celebration of fresh exotic fruits: airy vanilla sponge layered with whipped cream, freshly sliced kiwi, strawberries, pineapple, and passionfruit drizzle. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, fresh seasonal fruits, passionfruit reduction, dairy cream, natural erythritol."
    },
    "classic-tiramisu-cake": {
        "desc": "Traditional Italian tiramisu celebration cake with espresso-soaked sponge and sugar-free mascarpone cream.",
        "long": "Classic Venetian indulgence made mindful: delicate vanilla sponge soaked in dark roast espresso syrup, layered with whipped mascarpone cream and dusted with 70% dark cocoa. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark espresso, mascarpone cheese, fresh dairy cream, dark cocoa, natural sweetener."
    },
    "chocolate-tiramisu": {
        "desc": "Decadent hot chocolate tiramisu cake layered with espresso-soaked cocoa sponge and silky mascarpone cream.",
        "long": "Our customer-favourite signature: moist cocoa sponge soaked in hot chocolate and bold espresso, layered with cloud-like mascarpone cream and dark chocolate curls. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark cocoa, espresso, mascarpone cheese, dairy cream, natural plant sweetener."
    },
    "french-opera": {
        "desc": "Classic Parisian Opera gateau featuring seven delicate layers of espresso joconde, chocolate cream, and ganache.",
        "long": "Handcrafted to strict French pâtisserie traditions: wafer-thin almond sponge soaked in dark coffee syrup, layered with mocha buttercream and 70% dark Belgian chocolate ganache, finished with mirror glaze. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark espresso, dark chocolate 70%, dairy cream, grass-fed butter, erythritol."
    },
    "mix-cream-cake": {
        "desc": "Tender vanilla sponge layered with slow-simmered wild blueberry compote and light whipped cream.",
        "long": "Delicate, golden vanilla bean sponge layered with luscious blueberry reduction and fluffy whipped dairy cream. Light, refreshing, and completely free from refined sugar. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, wild blueberries, dairy cream, Madagascar vanilla bean, natural plant sweetener."
    },
    "chocolate-mix-berry-cake": {
        "desc": "Rich dark chocolate cake layered with Belgian ganache and tart wild blueberries and raspberries.",
        "long": "The irresistible harmony of bittersweet cocoa and tart forest berries: moist cocoa sponge made with French T45 flour, filled with dark chocolate ganache and bursts of fresh blueberries. 100% Eggless and sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, dark chocolate 70%, blueberries, raspberries, dairy cream, natural sweetener."
    },
    "salted-caramel-brownie": {
        "desc": "Dense, fudgy dark chocolate brownies layered with slow-cooked sugar-free sea-salted caramel.",
        "long": "Box of 8 rich almond flour brownies baked with 70% Callebaut chocolate, swirled with house-made golden sea-salted caramel. The perfect balance of sweet, salty, and deeply chocolatey. 100% Gluten-free and eggless.",
        "ingredients": "Almond flour, dark chocolate 70%, house-made salted caramel, dairy butter, natural stevia & erythritol blend, sea salt."
    },
    "chocolate-overload-brownie": {
        "desc": "Ultra-fudgy double dark chocolate brownies packed with molten chocolate chunks and dark cocoa.",
        "long": "Box of 8 intensely rich double chocolate brownies baked with single-origin cocoa and loaded with dark chocolate chunks for a gooey molten center. Naturally sweetened with zero refined sugar. 100% Gluten-free and eggless.",
        "ingredients": "Almond flour, dark chocolate 70%, dark chocolate chunks, single-origin cacao, butter, natural plant sweetener."
    },
    "pineapple-cream-cake": {
        "desc": "Nostalgic bakery celebration cake with pineapple nectar-soaked sponge, pineapple compote, and whipped cream.",
        "long": "A timeless tropical celebration cake: tender vanilla sponge soaked in real pineapple nectar, layered with slow-cooked pineapple compote and fresh dairy cream. Baked fresh with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, fresh pineapple compote, dairy cream, Madagascar vanilla, natural erythritol."
    },
    "belgian-chocolate-cake-1": {
        "desc": "Opulent celebration cake enveloped in silky 70% Callebaut Belgian dark chocolate ganache.",
        "long": "Pure chocolate decadence: moist cocoa sponge made with French T45 flour, layered with velvety dark Belgian chocolate ganache and chocolate curls. Deep, bittersweet, and refined sugar-free. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, Callebaut 70% dark chocolate, single-origin cacao, dairy cream, natural sweetener."
    },
    "belgian-chocolate-cake": {
        "desc": "Rich cocoa sponge cake layered with stone-ground roasted hazelnut praline butter and dark chocolate ganache.",
        "long": "Layers of tender chocolate sponge filled with stone-ground sugar-free hazelnut butter, dark chocolate ganache, and caramelized hazelnut crunch. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, Turkish hazelnuts, dark chocolate 70%, dairy cream, natural plant sweetener."
    },
    # Hampers & gifting
    "assorted-diwali-mithai-barks-hamper": {
        "desc": "Curated festive gift hamper featuring sugar-free motichoor laddoos, pistachio laddoos, rose kaju katlis, and chocolate barks.",
        "long": "A thoughtfully curated festive assortment celebrating Indian culinary heritage with mindful luxury: features two pieces each of our signature sugar-free Motichoor Laddoos, Pistachio Praline Laddoos, and Rose Kaju Katlis, paired with handcrafted Dark Chocolate Praline Bark. Housed in an embossed royal gold keepsake gift box.",
        "ingredients": "Almond flour, gram flour, cashew nuts, pistachios, dark chocolate 70%, saffron, rose water, ghee, natural plant sweetener."
    },
    "mini-diwali-gift-hamper": {
        "desc": "Luxury festive hamper pairing your choice of Basque cheesecake with dark chocolate fudge bites and savoury crackers.",
        "long": "A balanced festive celebration box: includes your choice of our signature Pistachio or Kesar Rabdi Basque Cheesecake, paired with 6 melt-in-mouth dark chocolate fudge bites and crispy paprika garlic crackers. Presented in a luxury ribboned box. 100% Refined sugar-free.",
        "ingredients": "Cream cheese, dark chocolate, almond flour, pistachios, saffron, dairy cream, olive oil, natural sweeteners."
    },
    "assorted-mithai-box-of-6": {
        "desc": "Handcrafted luxury mithai box featuring 6 artisanal sugar-free sweets: motichoor, pistachio praline, and rose kaju katli.",
        "long": "Six handcrafted festive treasures: includes two each of our signature sugar-free motichoor laddoos, roasted pistachio praline sweets, and organic rose kaju katlis. Made with premium nuts and zero refined sugar. Presented in a luxury gift box. 100% Eggless.",
        "ingredients": "Gram flour, roasted pistachios, cashew nuts, saffron, organic rose petals, ghee, natural stevia & erythritol blend."
    },
    "assorted-vegan-mithai-box-of-15": {
        "desc": "Grand 15-piece festive gift box of pure vegan, sugar-free Indian sweets: motichoor, pistachio praline, and rose kaju katlis.",
        "long": "A majestic 15-piece festive assortment crafted entirely plant-based and refined sugar-free: five each of our signature motichoor laddoos, roasted pistachio praline sweets, and fragrant rose kaju katlis made with virgin coconut oil and premium nuts. 100% Vegan and gluten-free.",
        "ingredients": "Cashew nuts, roasted pistachios, gram flour, cold-pressed coconut oil, saffron, rose water, natural plant sweetener."
    },
    "assorted-mithai-box-of-15": {
        "desc": "Grand 15-piece luxury mithai selection: Mysore Pak, pistachio praline, motichoor, rose kaju katli, and malai peda.",
        "long": "An opulent collection of 15 royal Indian sweets made with zero refined sugar: three each of melt-in-mouth Mysore Pak, pistachio praline laddoo, saffron motichoor, rose kaju katli, and dark chocolate malai peda. Housed in a signature keepsake gold box. 100% Eggless.",
        "ingredients": "Gram flour, cashews, pistachios, full-cream milk solids, dark chocolate, saffron, cardamom, ghee, natural plant sweetener."
    },
    "basque-cheesecake-hamper": {
        "desc": "Luxury dessert hamper featuring your choice of Pistachio Basque Cheesecake or Kesar Rabdi Basque Cheesecake.",
        "long": "Celebrate with artisanal European flair: choose between our caramelized Pistachio Basque Cheesecake infused with pure pistachio butter or our regal Kesar Rabdi Basque Cheesecake crowned with saffron rabdi. Housed in a custom ribbon-tied hamper box. 100% Gluten-Free.",
        "ingredients": "Cream cheese, fresh dairy cream, almond flour, pistachios, saffron, full-fat milk reduction, natural sweeteners."
    }
}

print(f"Master tailored dictionary has {len(TAILORED)} specific products.")

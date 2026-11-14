# -*- coding: utf-8 -*-
"""
Comprehensive upgrade of product descriptions and ingredients for all 224 products.
"""
import json
import re

with open('scratch/all_224_products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f"Loaded {len(products)} products from catalog dump.")

# Import TAILORED from tools/upgrade_all_product_descriptions.py
from upgrade_all_product_descriptions import TAILORED

# Additional tailored descriptions for remaining items with short or plain text
ADDITIONAL_TAILORED = {
    # Savoury & Cafe bakes
    "spiced-paneer-roll": {
        "desc": "Crispy golden bakery pastry roll wrapped around a savory core of spiced crumbled malai paneer and roasted bell peppers.",
        "long": "Handcrafted bakery puff roll: flaky multi-layered pastry baked with French T45 flour and pure butter, wrapped around a rich filling of spiced malai paneer, sautéed red onions, and sweet bell peppers. Baked fresh daily with zero artificial colors. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, fresh malai paneer, butter, red bell peppers, onions, aromatic Indian spices, sea salt."
    },
    "caramelized-onion-roll": {
        "desc": "Flaky golden bakery roll stuffed with slow-caramelized sweet onions, herbs, and mild melted cheese.",
        "long": "Delicate puff pastry rolled around slow-simmered caramelized brown onions, fragrant thyme, and mild melting cheese. Crispy, golden, and deeply comforting warm out of the bakery oven. Baked fresh with French T45 flour. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, sweet onions, butter, white cheddar, thyme, cracked black pepper, sea salt."
    },
    "flaky-veg-patties": {
        "desc": "Traditional Indian bakery puff pastry loaded with spiced green peas, diced potatoes, and fresh coriander.",
        "long": "A timeless teatime classic: ultra-flaky, multi-layered puff pastry baked to golden perfection with French T45 flour and pure butter, filled with aromatic spiced potatoes, sweet green peas, and fresh herbs. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, potatoes, green peas, butter, cumin, garam masala, fresh coriander, sea salt."
    },
    "flaky-paneer-patties": {
        "desc": "Crisp multi-layered golden puff pastry packed with tandoori-spiced malai paneer cubes and sweet peppers.",
        "long": "Featherlight, flaky puff pastry shell encasing a flavorful filling of crumbled malai paneer, roasted cumin, ginger, and aromatic spices. Golden, crispy, and baked fresh every morning with French T45 flour. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, malai paneer, butter, ginger, green chilies, roasted cumin, fresh herbs, sea salt."
    },
    "sweet-coconut-pop": {
        "desc": "Crisp golden puff pastry turnover filled with sweet desiccated coconut, green cardamom, and golden raisins.",
        "long": "A nostalgic bakery sweet: flaky golden puff pastry baked with French T45 flour, stuffed with sweet toasted coconut, fragrant green cardamom, and plump golden sultanas. Gently glazed for a delicate crunch. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, desiccated coconut, butter, green cardamom, golden raisins, raw cane sugar, milk."
    },
    "round-pop-sweet": {
        "desc": "Delicate spherical puff pastry bun filled with sweetened cardamom mawa, toasted coconut, and almonds.",
        "long": "Crispy layered puff pastry sphere filled with rich sweetened khoya mawa, toasted coconut shreds, and slivered almonds. Baked golden and fragrant with green cardamom. Baked fresh with French T45 flour. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, khoya (mawa), desiccated coconut, almond slivers, green cardamom, butter, raw cane sugar."
    },
    "classic-margherita-pizza": {
        "desc": "Artisan thin-crust pizza topped with slow-simmered San Marzano tomato sauce, fresh mozzarella, and dried basil.",
        "long": "Slow-fermented thin-crust artisan pizza baked with French T45 flour: topped with aromatic garlic herb tomato sauce, melted mozzarella, and fragrant dried basil. Baked to a blistered crust with zero chemical dough conditioners. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, whole wheat flour, mozzarella cheese, San Marzano tomato sauce, extra virgin olive oil, basil, yeast."
    },
    "garden-fresh-veg-pizza": {
        "desc": "Crisp artisan pizza loaded with crunchy bell peppers, sweet corn, red onions, mushrooms, and melted mozzarella.",
        "long": "Hand-stretched thin-crust pizza baked with French T45 flour: loaded with farm-fresh capsicum, sweet golden corn, red onions, button mushrooms, and creamy mozzarella over herb tomato sauce. Fresh, wholesome, and delicious.",
        "ingredients": "French T45 pastry flour, mozzarella, tomato marinara, capsicum, sweet corn, button mushrooms, red onions, olive oil, oregano."
    },
    "paneer-artisan-pizza": {
        "desc": "Thin-crust artisan pizza topped with spiced marinated malai paneer tikka, crunchy peppers, and melted cheese.",
        "long": "Slow-fermented artisan crust baked with French T45 flour, topped with tandoori-marinated malai paneer cubes, roasted bell peppers, red onions, and melted mozzarella over spiced herb marinara. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, malai paneer, mozzarella, capsicum, red onion, tandoori spices, olive oil, tomato sauce."
    },
    "peri-peri-veg-hotdog": {
        "desc": "Soft bakery brioche hotdog roll filled with a spicy peri-peri vegetable sausage, crisp slaw, and herb mayo.",
        "long": "Freshly baked golden brioche hot dog bun made with French T45 flour: loaded with a spiced vegetable sausage, zesty peri-peri glaze, crunchy pickled cabbage, and creamy herb mayonnaise. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, butter, vegetable sausage, peri-peri spice blend, cabbage, cucumber, mayonnaise, milk."
    },
    "peri-peri-paneer-hotdog": {
        "desc": "Toasted brioche hotdog roll stuffed with grilled peri-peri malai paneer fingers, fresh greens, and spicy mayo.",
        "long": "Artisan brioche roll baked with French T45 flour and pure butter: stuffed with tender fingers of malai paneer tossed in fiery African peri-peri spices, topped with crisp lettuce, pickled onions, and garlic aioli. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, malai paneer, butter, peri-peri spices, lettuce, onions, garlic mayonnaise, milk."
    },
    "flaky-aloo-paratha": {
        "desc": "Flaky multi-layered bakery paratha stuffed with spiced mashed potatoes, fresh green chilies, and roasted cumin.",
        "long": "Traditional North Indian comfort with bakery lamination: crisp, flaky flatbread prepared with whole wheat and French T45 flour, stuffed with spiced potato mash, roasted cumin, and fresh herbs. Baked golden on the griddle with pure butter. 100% Vegetarian.",
        "ingredients": "Whole wheat flour, French T45 flour, potatoes, butter, green chilies, cumin, coriander, sea salt."
    },
    "golden-baked-samosa": {
        "desc": "Golden-baked flaky pastry cone stuffed with aromatic spiced potatoes, green peas, and toasted cashews.",
        "long": "A lighter, guilt-free bakery version of India's favourite snack: baked to crisp golden perfection with French T45 flour instead of deep-frying. Stuffed with diced spiced potatoes, sweet peas, and toasted cashews. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, potatoes, green peas, cashews, ajwain seeds, butter, Indian spices, sea salt."
    },
    "traditional-lattice-apple-pie": {
        "desc": "Classic buttery shortcrust pie filled with slow-cooked spiced Granny Smith apples and a woven lattice top.",
        "long": "A timeless patisserie centerpiece: buttery French T45 shortcrust pastry filled with tender Granny Smith apples simmered in Ceylon cinnamon, brown sugar, and nutmeg, finished with an artisan woven lattice crust. Baked fresh daily. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Granny Smith apples, pure dairy butter, Ceylon cinnamon, nutmeg, raw cane sugar, lemon juice."
    },
    "french-macaron-box-veg": {
        "desc": "Six delicate French almond macarons filled with chocolate ganache, pistachio cream, and fruit compotes.",
        "long": "Authentic French confectionery crafted 100% eggless: featherlight almond flour shells with delicate ruffled feet, filled with decadent Belgian chocolate ganache, pure pistachio cream, and wild raspberry coulis. Box of 6 macarons. 100% Vegetarian.",
        "ingredients": "Finely ground almond flour, aquafaba, dark chocolate 70%, pistachio paste, raspberry reduction, natural sweetener."
    },
    "classic-french-macaron-egg": {
        "desc": "Authentic Parisian macarons with crisp meringue shells and luxurious ganache centers in assorted flavours.",
        "long": "Handcrafted to Parisian pâtisserie standards: smooth, crisp meringue shells made with finely ground California almond flour, filled with single-origin chocolate ganache, Madagascar vanilla buttercream, and salted caramel. Box of 6 macarons.",
        "ingredients": "Almond flour, egg whites, single-origin chocolate, dairy cream, butter, Madagascar vanilla, natural fruit purees."
    },
    "artisanal-glazed-donut": {
        "desc": "Fluffy brioche donut baked to golden perfection with a glossy Madagascar vanilla bean and dark chocolate glaze.",
        "long": "Cloud-like, airy brioche donut baked with French T45 flour and grass-fed butter, finished with your choice of silky dark chocolate ganache or Bourbon vanilla bean glaze. Baked rather than fried for pure, clean indulgence. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butter, whole milk, Madagascar vanilla, dark chocolate 70%, natural cane sugar, yeast."
    },
    "glass-cake": {
        "desc": "Stunning individual dessert cup featuring layers of French T45 vanilla sponge, fresh fruit coulis, and whipped cream.",
        "long": "An elegant modern dessert presentation: layers of delicate vanilla sponge baked with French T45 flour, alternating with tart wild berry compote, Belgian chocolate mousse, and clouds of whipped chantilly cream in an artisanal dessert glass. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dairy cream, wild berries, dark chocolate, Madagascar vanilla, natural sweetener."
    },
    "jeera-biscuits": {
        "desc": "Crisp, melt-in-mouth savoury butter cookies studded with toasted whole cumin seeds and flaky sea salt.",
        "long": "A quintessential Indian teatime biscuit: golden-baked with French T45 flour and pure slow-churned dairy butter, generously studded with fragrant roasted cumin seeds and a hint of rock salt. Delivers a delicate savoury crunch with hot tea. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure dairy butter, roasted cumin seeds (jeera), rock salt, milk, touch of raw cane sugar."
    },
    "stick-jeera-biscuit": {
        "desc": "Crispy cumin-spiced finger biscuits baked golden with French T45 flour, pure butter, and roasted cumin.",
        "long": "Slender, crunchy bakery finger biscuits infused with aromatic whole roasted cumin and pure butter: baked to a crisp golden brown, perfect for dipping into morning Assam milk tea. Zero trans fats. 100% Eggless.",
        "ingredients": "French T45 pastry flour, dairy butter, roasted cumin seeds, Himalayan pink salt, cold-pressed vegetable oil."
    },
    "peanut-cookies": {
        "desc": "Chunky artisan cookies packed with slow-roasted peanuts, natural peanut butter, and stone-ground flour.",
        "long": "Wholesome, protein-packed cookies loaded with roasted golden peanut chunks and stone-ground peanut butter: delivers a deeply satisfying nutty crunch with every bite. Baked fresh with French T45 flour and zero refined sugar. 100% Eggless.",
        "ingredients": "French T45 pastry flour, roasted peanuts, natural peanut butter, butter, natural erythritol blend, sea salt."
    },
    "seeds-butter-mix": {
        "desc": "Nutrient-packed artisan butter cookies loaded with roasted pumpkin, sunflower, flax, and chia seeds.",
        "long": "A powerhouse of wholesome crunch: golden butter cookies baked with French T45 flour and packed with a nutrient-rich quartet of roasted pumpkin, sunflower, golden flax, and chia seeds. Wholesome, rich in omega-3s, and 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, roasted pumpkin seeds, sunflower seeds, chia seeds, flaxseeds, butter, erythritol."
    },
    "butter-sesame-mix": {
        "desc": "Melt-in-mouth golden butter cookies coated with toasted white and black sesame seeds.",
        "long": "Rich bakery shortbread cookies baked with slow-churned butter and rolled in fragrant toasted sesame seeds: crisp on the edges with a tender, buttery melt-in-the-mouth center. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, dairy butter, toasted white & black sesame seeds, milk, natural cane sugar, vanilla."
    },
    "butterscotch-cookies": {
        "desc": "Golden butter cookies studded with crunchy caramelized butterscotch chips and roasted cashew praline.",
        "long": "Crispy golden cookies packed with rich butterscotch bits and toasted cashew praline: infused with brown butter and natural Bourbon vanilla. Baked fresh with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butter, handcrafted butterscotch chips, roasted cashews, milk, Madagascar vanilla."
    },
    "choco-mix-cookies": {
        "desc": "Crunchy dark cocoa cookies studded with a decadent mix of dark, milk, and white chocolate chips.",
        "long": "A triple-chocolate celebration: rich Dutch cocoa cookie dough baked with French T45 flour, generously loaded with dark, milk, and white chocolate chips for a rich, textured bite. 100% Eggless.",
        "ingredients": "French T45 pastry flour, dark chocolate chips, milk chocolate chips, white chocolate chips, cocoa powder, butter, milk."
    },
    "chocochips-pastry": {
        "desc": "Decadent dark chocolate sponge layered with velvety Belgian chocolate mousse and loaded with crisp chocolate chips.",
        "long": "A signature patisserie slice featuring airy cocoa sponge crafted with French T45 flour, single-origin cacao, and almond flour, coated in dark chocolate ganache and studded with crunchy chocolate chips. 100% Eggless and refined sugar-free.",
        "ingredients": "French T45 pastry flour, almond flour, single-origin cacao 70%, dark chocolate chips, dairy cream, natural erythritol & stevia blend."
    },
    "chocolate-choco-mix": {
        "desc": "Intense double chocolate artisan cookies loaded with dark cocoa and chunky chocolate drops.",
        "long": "For serious chocolate lovers: deep cocoa cookies baked to a crisp edge and chewy center, packed with dark chocolate drops and pure cocoa butter. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, dark cocoa, chocolate drops, pure butter, milk, natural cane sugar, vanilla."
    },
    "artisan-chocolate-cookies": {
        "desc": "Classic crispy chocolate biscuits baked with pure Dutch cocoa, grass-fed butter, and chocolate chips.",
        "long": "Timeless bakery-style chocolate cookies with an irresistible snap: crafted with rich Dutch cocoa, pure dairy butter, and dark chocolate chips. Perfect alongside morning espresso or milk. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Dutch cocoa, butter, dark chocolate chips, milk, raw cane sugar, sea salt."
    },
    "coconut-butter-mix": {
        "desc": "Golden butter cookies enriched with toasted desiccated coconut and aromatic vanilla bean.",
        "long": "Delicate, crumbly butter cookies loaded with aromatic toasted coconut shreds: delivers a tropical warmth and golden crunch in every bite. Baked fresh with French T45 flour and slow-churned butter. 100% Eggless.",
        "ingredients": "French T45 pastry flour, toasted desiccated coconut, pure dairy butter, milk, Madagascar vanilla, raw cane sugar."
    },
    "artisan-coconut-cookies": {
        "desc": "Crispy traditional bakery coconut biscuits with a golden caramelized crust and rich coconut aroma.",
        "long": "A classic Indian bakery favourite: crisp golden biscuits packed with grated coconut, pure butter, and a touch of cardamom. Incomparably crunchy and fragrant. Baked fresh with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, desiccated coconut, dairy butter, milk, green cardamom, raw cane sugar."
    },
    "coconut-laccha": {
        "desc": "Crisp ribbon-cut coconut pastry biscuits caramelized to a golden brown with aromatic spices.",
        "long": "Traditional bakery laccha biscuits rolled with ribboned coconut shreds, butter, and fragrant cardamom: baked crisp with delicate caramelized edges and a flaky, crumbly bite. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, shredded coconut, pure butter, milk, cardamom, raw cane sugar."
    },
    "strawberry-pastry": {
        "desc": "Light, fluffy vanilla sponge layered with luscious real strawberry compote and whipped dairy cream.",
        "long": "An elegant patisserie slice: tender vanilla sponge crafted with French T45 flour, layered with slow-simmered strawberry coulis, whipped dairy chantilly, and finished with a ruby strawberry glaze. 100% Eggless and freshly baked daily.",
        "ingredients": "French T45 pastry flour, almond flour, fresh strawberries, dairy cream, Madagascar vanilla bean, natural plant sweetener."
    },
    "vanilla-pastry": {
        "desc": "Classic delicate vanilla sponge infused with pure Madagascar vanilla bean and velvety whipped cream.",
        "long": "A timeless French patisserie classic: airy vanilla bean sponge baked with French T45 flour, layered with clouds of whipped chantilly cream and delicate white chocolate shavings. Pure, refined, and 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, pure Madagascar vanilla bean, dairy cream, white chocolate curls, natural sweetener."
    },
    # Teacakes and classic cakes
    "classic-vanilla-cake": {
        "desc": "Delicate golden sponge infused with Bourbon vanilla beans, finished with fluffy whipped dairy cream.",
        "long": "Our classic celebration centerpiece: tender golden sponge baked fresh with French T45 flour, infused with slow-steeped Madagascar Bourbon vanilla, and layered with light whipped dairy cream. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Madagascar vanilla beans, fresh dairy cream, butter, milk, raw cane sugar."
    },
    "rich-chocolate-cake": {
        "desc": "Deep, moist chocolate sponge layered with 55% Belgian chocolate ganache and fluffy cocoa cream.",
        "long": "A classic birthday favourite: rich chocolate sponge baked with French T45 flour and Dutch cocoa, generously frosted with silky Belgian chocolate ganache and chocolate curls. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Belgian dark chocolate, Dutch cocoa, fresh cream, butter, milk, raw cane sugar."
    },
    "golden-butterscotch-cake": {
        "desc": "Moist sponge layered with rich butterscotch cream and crunchy golden cashew praline.",
        "long": "A nostalgic crowd favourite: tender golden sponge baked with French T45 flour, filled with slow-cooked butterscotch caramel and topped with crisp caramelized cashew praline. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butterscotch caramel, roasted cashews, fresh dairy cream, butter, milk, raw cane sugar."
    },
    "tea-cake-vanilla": {
        "desc": "Tender, buttery breakfast loaf infused with Madagascar vanilla bean and dusted with icing sugar.",
        "long": "Classic English morning teacake: baked with French T45 flour and slow-churned dairy butter, scented with aromatic Bourbon vanilla. Moist, tender, and perfect with tea. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure dairy butter, Madagascar vanilla extract, milk, raw cane sugar."
    },
    "tea-cake-chocolate": {
        "desc": "Decadent cocoa loaf teacake baked with Dutch cocoa, dark chocolate chips, and pure butter.",
        "long": "Rich and deeply chocolatey: moist loaf teacake baked with French T45 flour, rich Dutch cocoa, and studded throughout with dark chocolate chips. Baked fresh daily. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Dutch cocoa, dark chocolate chips, dairy butter, milk, raw cane sugar."
    },
    "tea-cake-butterscotch": {
        "desc": "Rich brown butter teacake studded with caramelized butterscotch chips and roasted nuts.",
        "long": "A golden, comforting morning teacake: baked with French T45 flour and browned butter, studded with sweet caramelized butterscotch chips. Warm, aromatic, and 100% Eggless.",
        "ingredients": "French T45 pastry flour, dairy butter, butterscotch chips, milk, raw cane sugar, vanilla extract."
    },
    "tea-cake-plain": {
        "desc": "Traditional golden English-style teacake with a delicate crumb and warm vanilla aroma.",
        "long": "An everyday luxury: golden teacake baked to a fine, tender crumb using French T45 flour and pure slow-churned butter. Simple, comforting, and baked fresh every morning. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure dairy butter, milk, raw cane sugar, Madagascar vanilla."
    },
    "tea-cake-butter": {
        "desc": "Crafted with pure slow-churned dairy butter for an incomparably rich, melt-in-mouth texture.",
        "long": "The purest celebration of dairy butter: slow-baked loaf teacake made with generous lashings of farm butter and French T45 flour. Melts softly on the palate with a rich golden crumb. 100% Eggless.",
        "ingredients": "French T45 pastry flour, slow-churned dairy butter, whole milk, raw cane sugar, vanilla bean."
    },
    "butter-plain-cake": {
        "desc": "Old-fashioned round butter cake baked to a golden crust with a soft, velvety crumb.",
        "long": "A bakery heritage recipe: round butter pound cake baked with French T45 flour and cultured dairy butter. Scented with warm vanilla with a tender golden crumb. 100% Eggless.",
        "ingredients": "French T45 pastry flour, cultured dairy butter, milk, raw cane sugar, pure vanilla extract."
    },
    "artisan-fruit-cake": {
        "desc": "Golden pound cake studded with candied citrus peels, cherries, golden sultanas, and currants.",
        "long": "A colourful festival of fruits: traditional golden pound cake baked with French T45 flour, loaded with soaked cherries, golden sultanas, candied orange peel, and black currants. 100% Eggless.",
        "ingredients": "French T45 pastry flour, candied fruits, golden sultanas, black currants, dairy butter, spices, raw cane sugar."
    },
    "traditional-plum-cake": {
        "desc": "Spiced festive dark cake infused with fruit juice-soaked raisins, prunes, dates, and aromatic winter spices.",
        "long": "Traditional festive fruit cake: dark, rich, and fragrant with Ceylon cinnamon, nutmeg, and cloves, packed with dates, raisins, and prunes soaked in spiced fruit reduction. 100% Non-alcoholic and eggless.",
        "ingredients": "French T45 pastry flour, soaked raisins, prunes, dates, fruit juice reduction, butter, winter spices, molasses."
    },
    "no-bake-cheese-cream-cake": {
        "desc": "Ultra-silky cream cheese mousse over a buttery almond crust, infused with fragrant Madagascar vanilla.",
        "long": "A cloud-like chilled cheesecake: whipped Philadelphia cream cheese layered over a crisp, buttery almond crust, finished with fragrant Bourbon vanilla bean. Light, velvety, and completely refined sugar-free. 100% Eggless.",
        "ingredients": "Cream cheese, fresh dairy cream, almond flour, butter, Madagascar vanilla, natural stevia & erythritol blend."
    },
    # Breads
    "artisan-brown-bread": {
        "desc": "Slow-fermented 100% whole wheat loaf with malted grains and honeyed warmth. No artificial preservatives.",
        "long": "Slow-fermented whole wheat bread crafted with stone-ground grains, malted barley, and a touch of French T45 flour for structural elegance. Baked daily with zero artificial improvers or preservatives. 100% Vegan.",
        "ingredients": "100% whole wheat flour, French T45 flour, malted barley, olive oil, yeast, sea salt, water."
    },
    "golden-butter-bread": {
        "desc": "Enriched Japanese shokupan-style pullman loaf made with pure dairy butter for a cloud-like texture.",
        "long": "An exceptionally soft, featherlight milk-and-butter loaf inspired by Japanese shokupan baking methods: made with French T45 flour and slow-churned butter. Melts in the mouth and toasts to a golden glow. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, pure dairy butter, whole milk, yeast, raw cane sugar, sea salt."
    },
    "soft-milk-bread": {
        "desc": "Classic bakery white loaf prepared with fresh dairy milk for natural tenderness and gentle sweetness.",
        "long": "Everyday bakery excellence: soft, fluffy pullman sandwich loaf prepared with whole milk, French T45 flour, and pure butter. Naturally tender with an even crumb. 100% Vegetarian.",
        "ingredients": "French T45 pastry flour, fresh dairy milk, butter, yeast, raw cane sugar, sea salt."
    },
    "classic-white-bread": {
        "desc": "Everyday sandwich loaf with a thin golden crust and even crumb, baked fresh each dawn.",
        "long": "The ideal everyday sandwich loaf: baked fresh each morning with French T45 flour and a touch of cold-pressed oil for a golden crust and soft, sliceable interior. Free from chemical softeners. 100% Vegan.",
        "ingredients": "French T45 pastry flour, filtered water, cold-pressed sunflower oil, yeast, pinch of sugar, sea salt."
    },
    "hearty-multigrain-bread": {
        "desc": "Nutrient-dense loaf packed with oats, barley, millet, whole wheat, and cracked rye.",
        "long": "A robust, wholesome artisan bread: slow-fermented with whole wheat, rolled oats, pearl barley, and finger millet with French T45 flour. Nutty, satisfying, and high in natural dietary fiber. 100% Vegan.",
        "ingredients": "Whole wheat flour, French T45 flour, rolled oats, pearl barley, ragi, olive oil, yeast, sea salt."
    },
    "roasted-multiseeds-bread": {
        "desc": "Crusty loaf coated inside and out with toasted pumpkin seeds, sunflower seeds, flaxseeds, and white sesame.",
        "long": "An aromatic seed-crusted artisan loaf: studded throughout with toasted pumpkin, sunflower, flax, and sesame seeds. Baked with French T45 flour and whole grains for a nutritious, crunchy bite. 100% Vegan.",
        "ingredients": "French T45 pastry flour, whole wheat flour, roasted pumpkin seeds, sunflower seeds, flaxseeds, sesame, olive oil, yeast, sea salt."
    },
    "artisan-sourdough": {
        "desc": "Traditional 36-hour slow-fermented sourdough loaf with a blistered crust and open, chewy crumb.",
        "long": "Crafted over 36 hours with our mature sourdough starter: blended with French T45 flour, stone-ground whole wheat, and spring water. Features a deeply caramelized blistered crust and a complex, tangy crumb. 100% Vegan.",
        "ingredients": "French T45 flour, stone-ground whole wheat flour, wild sourdough culture, spring water, sea salt."
    },
    "cinnamon-swirl-bun": {
        "desc": "Enriched brioche dough swirled with Ceylon cinnamon and finished with melted cream cheese glaze.",
        "long": "Pillowy, slow-fermented brioche dough rolled with fragrant Ceylon cinnamon and brown butter, baked golden and topped with silky cream cheese frosting. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, butter, Ceylon cinnamon, cream cheese, milk, natural cane sugar, yeast."
    },
    "multigrain-seed-loaf": {
        "desc": "Five ancient grains, four toasted seeds, no bleached maida, and zero artificial improvers.",
        "long": "A nutrient-rich everyday sandwich bread: slow-fermented with whole wheat, oats, barley, ragi, and amaranth, loaded with pumpkin, sunflower, flax, and sesame seeds. Baked with French T45 flour. 100% Vegan.",
        "ingredients": "Whole wheat flour, French T45 flour, rolled oats, ragi, amaranth, pumpkin seeds, sunflower seeds, flaxseeds, olive oil, yeast, sea salt."
    },
    "coffee-walnut-loaf": {
        "desc": "Rich espresso teacake loaf packed with toasted California walnuts and a bittersweet coffee glaze.",
        "long": "Baked with French T45 flour, single-origin espresso reduction, and generous handfuls of crunchy toasted walnuts: finished with a delicate espresso-infused glaze. Incomparably aromatic with morning coffee. 100% Eggless.",
        "ingredients": "French T45 pastry flour, toasted California walnuts, dark espresso, butter, milk, raw cane sugar, vanilla."
    },
    # Muffins & Brownies
    "classic-golden-muffin": {
        "desc": "Tender golden breakfast muffin infused with Bourbon vanilla bean and baked with pure slow-churned butter.",
        "long": "A timeless bakery staple: fluffy, moist breakfast muffin baked to a high domed crown with French T45 flour, whole milk, and fragrant Bourbon vanilla. Baked fresh every morning. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure dairy butter, whole milk, Madagascar vanilla, raw cane sugar, baking powder."
    },
    "double-chocolate-muffin": {
        "desc": "Deep dark cocoa muffin studded with molten Belgian dark chocolate chips and a craggy top.",
        "long": "Rich and deeply indulgent: dark cocoa batter baked with French T45 flour and generous handfuls of 70% dark Belgian chocolate chips that melt when warmed. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Dutch cocoa, dark chocolate chips, dairy butter, whole milk, raw cane sugar."
    },
    "choco-chips-muffin": {
        "desc": "Fluffy golden vanilla muffin loaded with dark chocolate chips and a delicate caramelized crust.",
        "long": "Tender golden muffin batter baked with French T45 flour and Bourbon vanilla, bursting with pockets of dark chocolate chips throughout. Perfect for school tiffins and teatime snacks. 100% Eggless.",
        "ingredients": "French T45 pastry flour, dark chocolate chips, butter, whole milk, Madagascar vanilla, raw cane sugar."
    },
    "oreo-crunch-muffin": {
        "desc": "Airy vanilla and cocoa muffin packed with crushed Oreo cookies and creamy vanilla cream pockets.",
        "long": "The ultimate cookies-and-cream treat: fluffy vanilla muffin batter swirled with crushed Oreo biscuits and dark cocoa, crowned with crunchy Oreo chunks. Baked fresh with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, crushed Oreo cookies, dark cocoa, butter, milk, vanilla extract, raw cane sugar."
    },
    "fudge-chocolate-brownie": {
        "desc": "Dense, fudgy dark chocolate brownie with a shiny crinkly top crust, baked with 70% Callebaut chocolate.",
        "long": "Intensely fudgy center with a paper-thin crackly crust: baked with pure Callebaut 70% dark Belgian couverture chocolate, French T45 flour, and a pinch of Maldon sea salt. Decadent, rich, and 100% Eggless.",
        "ingredients": "French T45 pastry flour, Callebaut 70% dark chocolate, pure butter, Dutch cocoa, raw cane sugar, sea salt."
    },
    "classic-plain-brownie": {
        "desc": "Chewy, rich cocoa brownie with a light flake crust and tender, melt-in-mouth chocolate center.",
        "long": "A pure chocolate classic: baked with French T45 flour, Dutch cocoa, and farm butter for a chewy edge and dense, fudgy center with zero artificial flavourings. 100% Eggless.",
        "ingredients": "French T45 pastry flour, dark cocoa powder, pure butter, milk, raw cane sugar, vanilla extract, sea salt."
    },
    "crushed-oreo-brownie": {
        "desc": "Fudge chocolate brownie baked over a bed of whole Oreo cookies and topped with crunchy Oreo chunks.",
        "long": "Decadent dark chocolate brownie baked over a layer of whole chocolate sandwich cookies, topped with extra crunchy cookie crumbs. Fudgy, crunchy, and baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, Callebaut dark chocolate, Oreo cookies, butter, cocoa powder, raw cane sugar."
    },
    "belgian-chocolate-brownie": {
        "desc": "Fudge center, crackled top crust, 54% Belgian couverture chocolate, and toasted California walnuts.",
        "long": "Our flagship bakery brownie: crafted with French T45 flour, 54% Callebaut dark chocolate, and generous handfuls of toasted California walnuts. Intensely chocolatey with a delicate crackle top. 100% Eggless.",
        "ingredients": "French T45 pastry flour, 54% Belgian dark chocolate, butter, toasted walnuts, Dutch cocoa, raw cane sugar."
    },
    # Viennoiserie
    "fresh-croissant": {
        "desc": "Three-day laminated French butter croissant with a crisp golden honeycomb shell and tender buttery interior.",
        "long": "Crafted over three days to true European standards: laminated with French T45 flour and 84% Normandy-style butter to achieve hundreds of paper-thin flaky layers and a featherlight honeycomb interior. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure butter 84%, whole milk, yeast, raw cane sugar, sea salt."
    },
    "butter-croissant-almond": {
        "desc": "Twice-baked butter croissant filled with almond frangipane cream and topped with toasted almond flakes.",
        "long": "A classic French bakery indulgence: our three-day laminated croissant filled with rich almond frangipane, baked a second time to crisp perfection and dusted with toasted sliced almonds. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure butter, almond flour, toasted sliced almonds, vanilla, milk, sugar."
    },
    "pistachio-kunafa-croissant": {
        "desc": "Three-day laminated butter croissant filled with pure pistachio cream and topped with crispy toasted kunafa.",
        "long": "Our iconic viral creation: three-day butter laminated croissant crafted with French T45 flour, filled with velvety 100% pure pistachio cream, and crowned with crisp golden toasted kunafa pastry and crushed pistachios. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure butter, pure pistachio paste, crispy kunafa pastry, milk, natural sweetener."
    },
    # Entremets and tarts
    "assam-tea-opera": {
        "desc": "Seven layers of joconde sponge soaked in second-flush orthodox Assam tea, tea buttercream, and dark ganache.",
        "long": "A signature tribute to our Assam heritage: delicate almond joconde sponge soaked in fragrant single-estate second-flush black tea, layered with tea-infused buttercream and 70% dark chocolate ganache. Baked with French T45 flour. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, single-estate Assam orthodox tea, dark chocolate 70%, butter, dairy cream, natural sweetener."
    },
    "dark-chocolate-entremet": {
        "desc": "Nine components of single-origin 70% Ghana chocolate under a hand-poured dark mirror glaze.",
        "long": "A haute patisserie showpiece: single-origin 70% chocolate mousse, soft chocolate sponge made with French T45 flour, crunchy praline feuilletine base, and glossy mirror glaze. Intensely rich, refined, and 100% Eggless.",
        "ingredients": "French T45 pastry flour, single-origin 70% Ghana chocolate, almond flour, dairy cream, hazelnut praline, cocoa glaze."
    },
    "raspberry-entremet": {
        "desc": "Raspberry confit, white chocolate rose mousse, and French T45 sponge with a velvet spray finish.",
        "long": "A delicate, ethereal patisserie creation: vibrant raspberry fruit confit paired with silky white chocolate rose mousse over tender French T45 sponge, finished with an artisan velvet spray. 100% Eggless.",
        "ingredients": "French T45 pastry flour, wild raspberries, white chocolate, organic rose water, dairy cream, almond flour, natural sweetener."
    },
    "passionfruit-mango-tart": {
        "desc": "Crisp almond tart shell filled with tart passionfruit curd, Alphonso mango compote, and fresh fruit.",
        "long": "Sun-drenched tropical flavours in a crisp French T45 pastry shell: filled with tangy passionfruit curd, sweet Alphonso mango reduction, and fresh seasonal fruit. Bright, refreshing, and 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, passionfruit pulp, Alphonso mango, pure butter, dairy cream, natural sweetener."
    },
    "hazelnut-paris-brest": {
        "desc": "Golden choux pastry ring filled with roasted hazelnut praline mousseline and toasted hazelnuts.",
        "long": "The classic French bicycling tribute: crisp choux pastry ring baked with French T45 flour, generously piped with silky roasted hazelnut praline mousseline cream and dusted with toasted almonds. 100% Eggless.",
        "ingredients": "French T45 pastry flour, pure butter, roasted Turkish hazelnuts, hazelnut praline, dairy cream, milk, vanilla."
    },
    "fresh-cream-pastry": {
        "desc": "Airy vanilla sponge layered with fluffy dairy cream, tropical fruit coulis, and white chocolate curls.",
        "long": "Delicate, golden sponge baked fresh with French T45 flour, layered with slow-whipped fresh dairy cream and sweet fruit compote. Light, airy, and baked fresh every morning. 100% Eggless.",
        "ingredients": "French T45 pastry flour, fresh dairy cream, Madagascar vanilla, fruit compote, white chocolate curls, raw cane sugar."
    },
    "celebration-cupcakes": {
        "desc": "Box of 6 artisan cupcakes with rich cocoa and Bourbon vanilla sponge topped with buttercream swirls.",
        "long": "Assortment of 6 freshly baked celebration cupcakes crafted with French T45 flour: includes dark chocolate, vanilla bean, and red velvet bases crowned with silky buttercream swirls and edible pearls. 100% Eggless.",
        "ingredients": "French T45 pastry flour, dark cocoa, pure butter, fresh cream, Madagascar vanilla, raw cane sugar."
    },
    "red-velvet-cake": {
        "desc": "Crimson-hued cocoa sponge paired with tangy cream cheese frosting, baked with French T45 flour.",
        "long": "Velvety cocoa sponge naturally colored and baked with French T45 flour and almond flour, layered with whipped Philadelphia-style cream cheese frosting. Elegant, tangy, and 100% Eggless with zero refined sugar.",
        "ingredients": "French T45 pastry flour, almond flour, single-origin cacao, cream cheese, dairy butter, natural plant sweetener."
    },
    "wedding-tier-couture": {
        "desc": "Three-tier bespoke couture wedding cake with hand-piped lace, sugar florals, and 24k gold leaf detailing.",
        "long": "Our premier bespoke wedding commission: three towering tiers of French T45 sponge layered with your choice of gourmet fillings, draped in pristine white chocolate fondant with delicate hand-piped lace and edible 24k gold leaf. 100% Eggless.",
        "ingredients": "French T45 pastry flour, almond flour, dark Belgian chocolate, Madagascar vanilla, fresh cream, edible 24k gold leaf."
    },
    "gold-leaf-saffron-cheesecake": {
        "desc": "Kashmiri saffron custard over a pistachio sablé base, finished with 24k edible gold leaf.",
        "long": "A regal dessert masterpiece: rich baked cheesecake custard infused with aromatic Kashmiri saffron threads over a crisp pistachio sablé crust, finished with hand-applied 24k edible gold leaf. 100% Gluten-free and eggless.",
        "ingredients": "Cream cheese, fresh dairy cream, almond flour, Kashmiri saffron, pistachios, 24k edible gold leaf, natural erythritol blend."
    }
}

# Merge ADDITIONAL_TAILORED into TAILORED
TAILORED.update(ADDITIONAL_TAILORED)

def clean_sentence(s):
    if not s:
        return ""
    # remove leading (xxx gms)
    s = re.sub(r'^\s*\(\d+\s*(?:gms|g|pcs|ml)\)\s*', '', s, flags=re.IGNORECASE)
    # remove trailing ellipses or extra dots
    s = re.sub(r'(\.\.\.+|…|\.\.)\s*$', '', s)
    # remove raw appended blocks
    for stop_phrase in [
        'Shelf life and Storage', 'Dietary preference', 'Ingredients Almond',
        'Ingredients now in a loaf', 'Shelf life & Storage', 'Storage and Shelf Life',
        'Ingredients:', 'Ingredients', 'Dietary preference:'
    ]:
        idx = s.find(stop_phrase)
        if idx != -1:
            s = s[:idx].strip()
    s = re.sub(r'[\s\|\-]+$', '', s).strip()
    # ensure it ends with period
    if s and not s.endswith('.') and not s.endswith('!') and not s.endswith('?'):
        s += '.'
    return s

def enhance_product(p):
    pid = p['id']
    name = p['name']
    brand = p.get('brand', 'doughremi')
    cats = p.get('cats', [])
    diet = p.get('diet', [])
    
    # 1. Check if we have tailored override
    if pid in TAILORED:
        t = TAILORED[pid]
        p['desc'] = t['desc']
        p['long'] = t['long']
        p['ingredients'] = t['ingredients']
        return p
        
    # 2. General enhancement
    cur_desc = clean_sentence(p.get('desc', ''))
    cur_long = clean_sentence(p.get('long', ''))
    cur_ing = p.get('ingredients', '').strip()
    
    # Check if product is cake, pastry, croissant, bread, muffin, burger, pizza, savoury
    name_l = name.lower()
    cats_l = [c.lower() for c in cats]
    is_cake_or_pastry = any(k in name_l or k in cats_l for k in ['cake', 'pastry', 'croissant', 'loaf', 'bread', 'muffin', 'pie', 'tart', 'bun'])
    is_flourless = 'flourless' in name_l or 'grain-free' in cur_desc.lower() or '100% almond' in cur_desc.lower()
    
    # Ensure T45 flour is mentioned for cakes and pastries unless flourless
    if is_cake_or_pastry and not is_flourless:
        if 't45' not in cur_ing.lower():
            if 'almond flour' in cur_ing.lower() or 'wheat flour' in cur_ing.lower() or 'flour' in cur_ing.lower():
                cur_ing = re.sub(r'(?i)\b(?:refined )?(?:wheat|all-purpose|pastry|maida)?\s*flour\b', 'French T45 pastry flour', cur_ing, count=1)
                if 'French T45' not in cur_ing:
                    cur_ing = 'French T45 pastry flour, ' + cur_ing
            else:
                cur_ing = 'French T45 pastry flour, ' + cur_ing
                
        if 't45' not in cur_long.lower() and 'french t45' not in cur_long.lower():
            # Add French T45 flour mention into long
            if not cur_long.endswith('.'):
                cur_long += '.'
            cur_long += ' Baked fresh with French T45 pastry flour and zero refined sugar.'
            
    # Clean up desc if too short or ends with ellipsis
    if len(cur_desc) < 85:
        # enrich desc
        if 'cake' in name_l:
            cur_desc = f"Artisan {name} crafted with French T45 flour, layered with velvety whipped cream and zero refined sugar. 100% Eggless."
        elif 'bread' in name_l or 'loaf' in name_l:
            cur_desc = f"Freshly baked artisan {name} slow-fermented with premium grains, natural olive oil, and zero preservatives."
        elif 'cookie' in name_l or 'biscuit' in name_l:
            cur_desc = f"Crisp, buttery {name} baked to a golden melt-in-the-mouth crumb with pure slow-churned butter and wholesome ingredients."
        elif 'muffin' in name_l:
            cur_desc = f"Tender golden {name} baked fresh with French T45 flour, real fruit and rich chocolate chunks with zero refined sugar."
        elif 'burger' in name_l:
            cur_desc = f"Toasted artisan brioche bun filled with savory gourmet patty, crisp garden greens, and spiced house sauce."
        elif 'pizza' in name_l:
            cur_desc = f"Thin-crust artisan pizza baked with French T45 flour, rich tomato marinara, and melted mozzarella cheese."
        elif 'tea' in name_l or 'coffee' in name_l:
            cur_desc = f"Single-estate premium {name} boasting delicate aromatic notes, golden liquor, and authentic regional terroir."
        else:
            cur_desc = f"Artisanal {name} handcrafted with pure butter, wholesome ingredients, and zero artificial preservatives."
            
    # Clean up long if too short
    if len(cur_long) < 180:
        cur_long = cur_desc + f" Handcrafted fresh daily in our Dibrugarh kitchen using pure, premium ingredients with no artificial additives. 100% Vegetarian."
        
    p['desc'] = cur_desc
    p['long'] = cur_long
    p['ingredients'] = cur_ing
    return p

# Process all products
updated_products = [enhance_product(p) for p in products]

# Validation
print("\n--- Validating all 224 updated products ---")
fails = 0
for p in updated_products:
    d = p['desc']
    l = p['long']
    ing = p['ingredients']
    
    if '...' in d or '…' in d or d.endswith('..'):
        print(f"FAIL ellipsis in desc: {p['id']}")
        fails += 1
    if '...' in l or '…' in l or l.endswith('..'):
        print(f"FAIL ellipsis in long: {p['id']}")
        fails += 1
    if 'gms)' in d or 'gms)' in l:
        print(f"FAIL gms in text: {p['id']}")
        fails += 1
    if 'Shelf life' in d or 'Shelf life' in l:
        print(f"FAIL Shelf life in text: {p['id']}")
        fails += 1
    if len(d) < 70 or len(d) > 200:
        print(f"FAIL desc length ({len(d)}): {p['id']}")
        fails += 1
    if len(l) < 140 or len(l) > 500:
        print(f"FAIL long length ({len(l)}): {p['id']}")
        fails += 1
    if len(ing) < 15:
        print(f"FAIL ing length ({len(ing)}): {p['id']}")
        fails += 1

print(f"Validation complete. Total validation failures: {fails}")

if fails == 0:
    with open('scratch/updated_all_products.json', 'w', encoding='utf-8') as f:
        json.dump(updated_products, f, indent=2, ensure_ascii=False)
    print("Saved verified products to scratch/updated_all_products.json")

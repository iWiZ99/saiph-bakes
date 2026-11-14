const fs = require('fs');
const vm = require('vm');

const sandbox = { console, Math, JSON, Date, Object, Array, String, Number, Boolean, RegExp };
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('assets/js/data.js', 'utf8'), sandbox);
const prods = sandbox.SAIPH.data.products;

const list = prods.map(p => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  brandName: p.brandName,
  cats: p.cats,
  price: p.price,
  desc: p.desc,
  long: p.long,
  ingredients: p.ingredients,
  diet: p.diet,
  badges: p.badges
}));

fs.writeFileSync('scratch/catalog_dump.json', JSON.stringify(list, null, 2), 'utf8');
console.log('Dumped', list.length, 'products to scratch/catalog_dump.json');

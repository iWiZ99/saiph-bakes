const fs = require('fs');
const vm = require('vm');

const content = fs.readFileSync('assets/js/data.js', 'utf8');
const sMarker = 'var rawProducts = [';
const eMarker = '/* ------------------------- Product normaliser ------------------------- */';
const sIdx = content.indexOf(sMarker);
const eIdx = content.indexOf(eMarker);
const block = content.slice(sIdx + sMarker.length - 1, eIdx);
const code = block.slice(0, block.lastIndexOf('];') + 1);
const products = vm.runInContext(code, vm.createContext({}));

const lines = products.map((p, i) => `${i + 1}. [${p.id}] ${p.name} | brand:${p.brand} | cats:${(p.cats || []).join(',')}`);
fs.writeFileSync('scratch/product_inventory.txt', lines.join('\n'), 'utf8');
console.log('Wrote', products.length, 'products to scratch/product_inventory.txt');

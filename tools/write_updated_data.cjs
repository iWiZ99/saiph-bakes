const fs = require('fs');
const vm = require('vm');

const content = fs.readFileSync('assets/js/data.js', 'utf8');
const sMarker = 'var rawProducts = [';
const eMarker = '/* ------------------------- Product normaliser ------------------------- */';
const sIdx = content.indexOf(sMarker);
const eIdx = content.indexOf(eMarker);

if (sIdx === -1 || eIdx === -1) {
  console.error('Could not find markers in assets/js/data.js');
  process.exit(1);
}

const block = content.slice(sIdx + sMarker.length - 1, eIdx);
const lastBracket = block.lastIndexOf('];');
const code = block.slice(0, lastBracket + 1);

const context = {};
vm.createContext(context);
const rawProducts = vm.runInContext(code, context);
console.log('Original rawProducts count:', rawProducts.length);

const updatedDump = JSON.parse(fs.readFileSync('scratch/updated_all_products.json', 'utf8'));
const updateMap = new Map();
for (const u of updatedDump) {
  updateMap.set(u.id, u);
}

let updatedCount = 0;
for (const p of rawProducts) {
  const u = updateMap.get(p.id);
  if (u) {
    p.desc = u.desc;
    p.long = u.long;
    p.ingredients = u.ingredients;
    updatedCount++;
  } else {
    console.warn('Warning: product ID not found in updates:', p.id);
  }
}
console.log('Successfully updated properties for', updatedCount, 'products.');

// Serialize rawProducts with elegant formatting
function formatProduct(p) {
  const jsonStr = JSON.stringify(p, null, 2);
  // indent with 4 spaces
  return jsonStr.split('\n').map((line, i) => i === 0 ? '    ' + line : '    ' + line).join('\n');
}

const formattedArray = 'var rawProducts = [\n' +
  rawProducts.map(formatProduct).join(',\n') +
  '\n  ];\n\n  ';

const newContent = content.slice(0, sIdx) + formattedArray + content.slice(eIdx);

fs.writeFileSync('assets/js/data.js', newContent, 'utf8');
console.log('Successfully updated assets/js/data.js! New length:', newContent.length);

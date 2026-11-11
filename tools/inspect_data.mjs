import fs from 'fs';

const content = fs.readFileSync('assets/js/data.js', 'utf8');

// Find products array definition
const startMarker = 'var catalogue = [';
const altMarker = 'var products = [';
let marker = content.indexOf(startMarker);
if (marker === -1) {
  marker = content.indexOf(altMarker);
}

console.log('Marker index:', marker);

// Let's see lines around line 50-100 or wherever products are defined
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('var catalogue =') || line.includes('var products =') || line.includes('catalogue:')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});


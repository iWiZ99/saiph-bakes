import re, json

with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's find every product block in rawProducts
start_idx = text.find('var rawProducts = [')
end_idx = text.find('var products = rawProducts.map')
block = text[start_idx:end_idx]

# Split by product boundary. Each product object starts with { and has id: "..."
id_matches = list(re.finditer(r'["\']?id["\']?\s*:\s*["\']([^"\']+)["\']', block))
print(f"Total IDs matched: {len(id_matches)}")

products = []
for i in range(len(id_matches)):
    start = id_matches[i].start()
    end = id_matches[i+1].start() if i + 1 < len(id_matches) else len(block)
    chunk = block[start:end]
    
    pid = id_matches[i].group(1)
    
    name_m = re.search(r'["\']?name["\']?\s*:\s*["\']([^"\']+)["\']', chunk)
    img_m = re.search(r'["\']?image["\']?\s*:\s*(["\']([^"\']+)["\']|null)', chunk)
    cats_m = re.search(r'["\']?cats["\']?\s*:\s*\[([^\]]*)\]', chunk)
    
    name = name_m.group(1) if name_m else ''
    if img_m:
        img = img_m.group(2) if img_m.group(2) else 'null'
    else:
        img = 'null'
        
    cats = [c.strip(' "\'') for c in cats_m.group(1).split(',')] if cats_m and cats_m.group(1).strip() else []
    
    products.append({'id': pid, 'name': name, 'image': img, 'cats': cats})

print(f"Total parsed: {len(products)}")

targets = [p for p in products if p['image'] == 'null' or p['image'].endswith('.svg')]
print(f"Total targets (SVG or null): {len(targets)}")

with open('tools/targets.json', 'w', encoding='utf-8') as f:
    json.dump(targets, f, indent=2)

for idx, p in enumerate(targets):
    print(f"{idx+1:2d}. {p['id']:32s} | {p['name']:30s} | {p['image']:40s} | {','.join(p['cats'])}")

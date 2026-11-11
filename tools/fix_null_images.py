import re

with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

from map_all_products import MAPPING

null_ids = [
    'signature-chocolate-bonbons',
    'fresh-cream-pastry',
    'butter-croissant-almond',
    'chocolate-truffle-cake',
    'cinnamon-swirl-bun',
    'assam-tea-cookies',
    'til-pitha-box',
    'saiph-gift-card'
]

print(f"Adding images to {len(null_ids)} null-image products...")

for pid in null_ids:
    new_img = MAPPING[pid]
    # Find chunk for pid
    # Match id: "pid" ... until the closing }
    pattern = re.compile(r'((?:id|"id")\s*:\s*["\']' + re.escape(pid) + r'["\'][\s\S]*?)(\n\s*\})')
    m = pattern.search(text)
    if m:
        prefix = m.group(1).rstrip()
        closing = m.group(2)
        # Check if trailing comma is needed
        if not prefix.endswith(','):
            prefix += ','
        addition = f'\n      image: "{new_img}", images: ["{new_img}"]'
        replacement = prefix + addition + closing
        text = text[:m.start()] + replacement + text[m.end():]
        print(f"  [OK] Added image to {pid} -> {new_img}")
    else:
        print(f"  [ERR] Could not find chunk for {pid}")

with open('assets/js/data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Finished updating null products.")


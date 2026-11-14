import json

with open('scratch/catalog_dump.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

print(f'Total products in dump: {len(products)}')

cats = {}
for p in products:
    c = p['cats'][0] if p['cats'] else 'other'
    cats.setdefault(c, []).append(p)

for c, items in sorted(cats.items()):
    print(f"\n=== Category: {c} ({len(items)} items) ===")
    for item in items:
        has_ellipsis = '...' in item['desc'] or '…' in item['desc']
        is_short = len(item['desc']) < 60
        mark = ' [FIX]' if has_ellipsis or is_short else ''
        print(f"  {item['id']}: {item['name']}{mark}")
        print(f"     desc: {item['desc']}")

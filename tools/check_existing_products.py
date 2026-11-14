import re, json

with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Load all product IDs and names from data.js
products = re.findall(r'(?:id|"id")\s*:\s*["\']([^"\']+)["\'][\s\S]*?(?:name|"name")\s*:\s*["\']([^"\']+)["\']', text)

print(f"Total products in data.js: {len(products)}")

queries = [
    'sesame', 'butterscotch', 'choco', 'pastry', 'coconut',
    'donut', 'glass', 'jeera', 'peanut', 'seeds', 'strawberry', 'vanilla'
]

for pid, name in products:
    for q in queries:
        if q in pid.lower() or q in name.lower():
            if any(k in pid for k in ['biscuit', 'cookie', 'mix', 'donut', 'glass', 'jeera', 'laccha']):
                print(f"  Match: {pid} | {name}")
                break


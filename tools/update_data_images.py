import json, re

with open('assets/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Load mapping
from map_all_products import MAPPING

print(f"Loaded mapping for {len(MAPPING)} products.")

# In assets/js/data.js, rawProducts is between:
start_marker = 'var rawProducts = ['
end_marker = 'var products = rawProducts.map'

start_idx = text.find(start_marker)
end_idx = text.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Error locating rawProducts in assets/js/data.js")
    exit(1)

block = text[start_idx:end_idx]

# For each product in MAPPING, update its image and images in block
updated_count = 0
for pid, new_img in MAPPING.items():
    # Match the product chunk starting with id: "pid" or "id": "pid"
    # and continuing until the next product or end of array
    pattern = re.compile(r'((?:id|"id")\s*:\s*["\']' + re.escape(pid) + r'["\'][\s\S]*?)(?:image|"image")\s*:\s*(?:["\'][^"\']*["\']|null)')
    
    m = pattern.search(block)
    if m:
        # Check if "images" is also present right after or nearby
        # Replace image property
        sub_pattern = r'((?:id|"id")\s*:\s*["\']' + re.escape(pid) + r'["\'][\s\S]*?)(?:image|"image")\s*:\s*(?:["\'][^"\']*["\']|null)'
        # Let's replace just the image part
        def repl(match):
            prefix = match.group(1)
            # detect quotes style
            if '"id"' in prefix:
                return f'{prefix}"image": "{new_img}"'
            else:
                return f'{prefix}image: "{new_img}"'
        
        block, count = pattern.subn(repl, block, count=1)
        if count > 0:
            updated_count += 1
            
            # Also update images array if present in the chunk
            # e.g., images: ["..."] or "images": ["..."]
            chunk_re = re.compile(r'((?:id|"id")\s*:\s*["\']' + re.escape(pid) + r'["\'][\s\S]*?)(?:images|"images")\s*:\s*\[[^\]]*\]')
            def repl_images(match):
                prefix = match.group(1)
                if '"id"' in prefix:
                    return f'{prefix}"images": ["{new_img}"]'
                else:
                    return f'{prefix}images: ["{new_img}"]'
            block = chunk_re.sub(repl_images, block, count=1)
    else:
        print(f"Could not find pattern for {pid}")

print(f"Updated {updated_count} products in block.")

new_text = text[:start_idx] + block + text[end_idx:]

with open('assets/js/data.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("assets/js/data.js successfully written!")


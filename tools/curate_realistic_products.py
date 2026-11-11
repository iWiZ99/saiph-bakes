import urllib.request
import os
import io
from PIL import Image

# Curated, royalty-free, ultra-high-resolution commercial bakery photographs (Unsplash CDN)
# Selected specifically to match SAiPH Bakes gourmet luxury aesthetic:
# Warm natural bakery lighting, marble/wood artisan backgrounds, mouth-watering realism.

ITEMS_TO_FETCH = {
    # 1. Croissants & Viennoiserie
    'butter-croissant-almond.jpg': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&h=896&q=85',
    'passionfruit-mango-tart.jpg': 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&h=896&q=85',
    'hazelnut-paris-brest.jpg': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&h=896&q=85',
    'signature-chocolate-bonbons.jpg': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&h=896&q=85',
    
    # 2. Artisan Buns & Burgers
    'sweet-burger-tea-cake-buns.jpg': 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&h=896&q=85',
    'classic-plain-burger.jpg': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&h=896&q=85',
    'spiced-paneer-burger.jpg': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&h=896&q=85',
    'loaded-cheese-burger.jpg': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&h=896&q=85',
    
    # 3. Flaky Traditional Bakes & Savouries
    'bakhar-khani-plain.jpg': 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1200&h=896&q=85',
    'bakhar-khani-cheese.jpg': 'https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?auto=format&fit=crop&w=1200&h=896&q=85',
    'bakhar-khani-chocolate.jpg': 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&h=896&q=85',
    'flaky-veg-patties.jpg': 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1200&h=896&q=85',
    'flaky-paneer-patties.jpg': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&h=896&q=85',
    'golden-baked-samosa.jpg': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&h=896&q=85',
    'spiced-paneer-roll.jpg': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&h=896&q=85',
    'caramelized-onion-roll.jpg': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&h=896&q=85',
    'flaky-aloo-paratha.jpg': 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=1200&h=896&q=85',
    'peri-peri-veg-hotdog.jpg': 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=1200&h=896&q=85',
    'peri-peri-paneer-hotdog.jpg': 'https://images.unsplash.com/photo-1627054234614-72213e4b7be2?auto=format&fit=crop&w=1200&h=896&q=85',
    
    # 4. Woodfired Pizzas
    'classic-margherita-pizza.jpg': 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1200&h=896&q=85',
    'garden-fresh-veg-pizza.jpg': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&h=896&q=85',
    'paneer-artisan-pizza.jpg': 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1200&h=896&q=85',
    
    # 5. Macarons, Pies, Pops & Specialties
    'french-macaron-box-veg.jpg': 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=1200&h=896&q=85',
    'classic-french-macaron-egg.jpg': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&h=896&q=85',
    'traditional-lattice-apple-pie.jpg': 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?auto=format&fit=crop&w=1200&h=896&q=85',
    'sweet-coconut-pop.jpg': 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=1200&h=896&q=85',
    'round-pop-sweet.jpg': 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&h=896&q=85',
    'single-estate-assam-tea.jpg': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&h=896&q=85',
    'jaggery-granola.jpg': 'https://images.unsplash.com/photo-1517093708173-77be1c21bb62?auto=format&fit=crop&w=1200&h=896&q=85',
    'saiph-gift-card.jpg': 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&h=896&q=85'
}

dest_dir = 'assets/img/products'
os.makedirs(dest_dir, exist_ok=True)

print(f"Downloading {len(ITEMS_TO_FETCH)} realistic commercial bakery photos...")
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for fname, url in ITEMS_TO_FETCH.items():
    out_path = os.path.join(dest_dir, fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            im = Image.open(io.BytesIO(data)).convert('RGB')
            # Normalize to standard catalog aspect ratio 1200x896
            im_resized = im.resize((1200, 896), Image.Resampling.LANCZOS)
            im_resized.save(out_path, quality=90, optimize=True)
            print(f"  [OK] {fname} ({os.path.getsize(out_path):,} bytes)")
    except Exception as e:
        print(f"  [ERR] {fname}: {e}")

print("Download and optimization complete.")


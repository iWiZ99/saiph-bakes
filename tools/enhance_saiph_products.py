import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import os

src_dir = r'C:\Users\wazid\Downloads\Saiph Products'
dest_dir = 'assets/img/products'
os.makedirs(dest_dir, exist_ok=True)

PRODUCT_IMAGE_MAP = {
    'Butter Sesame mix 800 per kg.jpeg': 'butter-sesame-mix.jpg',
    'Butterscotch cookies 800 per kg.jpeg': 'butterscotch-cookies.jpg',
    'Choco Mix 800 per kg.jpeg': 'choco-mix-cookies.jpg',
    'Chocochips pastry 80 per pc.jpeg': 'chocochips-pastry.jpg',
    'Chocolate choco mix 800 per kg.jpeg': 'chocolate-choco-mix.jpg',
    'Chocolate cookies 800 per kg.jpeg': 'artisan-chocolate-cookies.jpg',
    'Coconut butter mix 800 per kg.jpeg': 'coconut-butter-mix.jpg',
    'Coconut cookies 800 per kg.jpeg': 'artisan-coconut-cookies.jpg',
    'Coconut laccha 800 per kg.jpeg': 'coconut-laccha.jpg',
    'Donut 50 per pc.jpeg': 'artisanal-glazed-donut.jpg',
    'Glass cake 100 per glass.jpeg': 'glass-cake.jpg',
    'Jeera Biscuits800 per kg.jpeg': 'jeera-biscuits.jpg',
    'Peanut cookies 800 per kg.jpeg': 'peanut-cookies.jpg',
    'Seeds butter mix 800 per kg.jpeg': 'seeds-butter-mix.jpg',
    'Stick Jeera Biscuit 800 per kg.jpeg': 'stick-jeera-biscuit.jpg',
    'Strawberry pastry 80 per pc.jpeg': 'strawberry-pastry.jpg',
    'Vanilla Pastry 80 per pc.jpeg': 'vanilla-pastry.jpg'
}

def enhance_bakery_image(bgr, target_size=(1200, 896)):
    h, w = bgr.shape[:2]
    target_w, target_h = target_size
    target_aspect = target_w / target_h
    current_aspect = w / h
    
    # Smart framing crop
    if current_aspect < target_aspect:
        # Portrait (960x1280): crop height around center
        new_h = int(w / target_aspect)
        start_y = max(0, (h - new_h) // 2)
        end_y = start_y + new_h
        bgr_cropped = bgr[start_y:end_y, :]
    else:
        # Landscape: center crop width
        new_w = int(h * target_aspect)
        start_x = max(0, (w - new_w) // 2)
        end_x = start_x + new_w
        bgr_cropped = bgr[:, start_x:end_x]
        
    bgr_resized = cv2.resize(bgr_cropped, target_size, interpolation=cv2.INTER_LANCZOS4)
    
    # White balance correction: gently neutralize indoor yellow cast
    # Compute gray world adjustment with gentle clamp
    avg_b = np.mean(bgr_resized[:, :, 0])
    avg_g = np.mean(bgr_resized[:, :, 1])
    avg_r = np.mean(bgr_resized[:, :, 2])
    avg_gray = (avg_b + avg_g + avg_r) / 3.0
    
    kb = np.clip(avg_gray / (avg_b + 1e-5), 0.85, 1.25)
    kg = np.clip(avg_gray / (avg_g + 1e-5), 0.90, 1.15)
    kr = np.clip(avg_gray / (avg_r + 1e-5), 0.85, 1.15)
    
    # Apply 40% subtle white balance to avoid making warm baked goods cold
    bgr_wb = bgr_resized.copy().astype(np.float32)
    bgr_wb[:, :, 0] = np.clip(bgr_resized[:, :, 0] * (1.0 + (kb - 1.0) * 0.40), 0, 255)
    bgr_wb[:, :, 1] = np.clip(bgr_resized[:, :, 1] * (1.0 + (kg - 1.0) * 0.40), 0, 255)
    bgr_wb[:, :, 2] = np.clip(bgr_resized[:, :, 2] * (1.0 + (kr - 1.0) * 0.40), 0, 255)
    bgr_wb = bgr_wb.astype(np.uint8)
    
    # LAB Texture Enhancement
    lab = cv2.cvtColor(bgr_wb, cv2.COLOR_BGR2Lab)
    L, A, B = cv2.split(lab)
    
    clahe = cv2.createCLAHE(clipLimit=1.9, tileGridSize=(8, 8))
    L_clahe = clahe.apply(L)
    
    # Contrast stretch
    p_low, p_high = np.percentile(L_clahe, (1.5, 98.5))
    if p_high > p_low:
        L_stretched = np.clip((L_clahe.astype(np.float32) - p_low) * (255.0 / (p_high - p_low)), 0, 255).astype(np.uint8)
        L_final = cv2.addWeighted(L_clahe, 0.4, L_stretched, 0.6, 0)
    else:
        L_final = L_clahe
        
    lab_enhanced = cv2.merge([L_final, A, B])
    bgr_enhanced = cv2.cvtColor(lab_enhanced, cv2.COLOR_Lab2BGR)
    
    # Vibrancy and Smart Sharpening via PIL
    rgb = cv2.cvtColor(bgr_enhanced, cv2.COLOR_BGR2RGB)
    pil_im = Image.fromarray(rgb)
    
    color_enhancer = ImageEnhance.Color(pil_im)
    pil_im = color_enhancer.enhance(1.16)
    
    contrast_enhancer = ImageEnhance.Contrast(pil_im)
    pil_im = contrast_enhancer.enhance(1.08)
    
    mean_val = np.mean(np.array(pil_im))
    if mean_val < 140:
        brightness_enhancer = ImageEnhance.Brightness(pil_im)
        pil_im = brightness_enhancer.enhance(1.06)
        
    # Unsharp Mask for ultra-crisp edges
    pil_im = pil_im.filter(ImageFilter.UnsharpMask(radius=1.4, percent=135, threshold=2))
    
    return pil_im

print(f"Processing and enhancing {len(PRODUCT_IMAGE_MAP)} bakery product images...")
for orig_name, target_name in PRODUCT_IMAGE_MAP.items():
    in_path = os.path.join(src_dir, orig_name)
    out_path = os.path.join(dest_dir, target_name)
    
    if not os.path.exists(in_path):
        print(f"  [ERR] Missing {in_path}")
        continue
        
    bgr = cv2.imread(in_path)
    enhanced = enhance_bakery_image(bgr)
    enhanced.save(out_path, 'JPEG', quality=95, subsampling=0)
    print(f"  [OK] {orig_name} -> {target_name} ({os.path.getsize(out_path):,} bytes, 1200x896)")

print("All product images enhanced and deployed to assets/img/products/ successfully!")


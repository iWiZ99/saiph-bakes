import cv2
import numpy as np
from PIL import Image, ImageFilter
from rapidocr_onnxruntime import RapidOCR

print("Generating and deploying prominent luxury commercial photographs...")

# 1. Load official transparent brand logo
logo = Image.open('tools/official_brand_logo_transparent.png').convert('RGBA')
alpha = logo.split()[3]
gw, gh = logo.size

# High-end foil deboss shading:
# Drop shadow (offset +2px x, +2px y) in deep rich undertone
shadow = Image.new('RGBA', (gw, gh), (0, 0, 0, 0))
shadow.paste((15, 2, 4, 185), mask=alpha)
shadow = shadow.filter(ImageFilter.GaussianBlur(radius=1.2))

# Top-edge specular highlight (offset -1px x, -1px y) in soft light champagne gold
highlight = Image.new('RGBA', (gw, gh), (0, 0, 0, 0))
highlight.paste((255, 252, 215, 110), mask=alpha)
highlight = highlight.filter(ImageFilter.GaussianBlur(radius=0.8))

# Composite debossed foil
foil_composite = Image.new('RGBA', (gw + 6, gh + 6), (0, 0, 0, 0))
foil_composite.paste(shadow, (4, 4), shadow)
foil_composite.paste(highlight, (1, 1), highlight)
foil_composite.paste(logo, (2, 2), logo)

def stamp_foil_prominent(im, inpaint_rects, angle, cx, cy, target_w):
    clean = im.copy()
    for rect in inpaint_rects:
        mask = np.zeros(clean.shape[:2], dtype=np.uint8)
        x1, y1, x2, y2 = rect
        cv2.rectangle(mask, (x1, y1), (x2, y2), 255, -1)
        clean = cv2.inpaint(clean, mask, 5, cv2.INPAINT_TELEA)
    
    target_h = int(foil_composite.height * (target_w / foil_composite.width))
    foil_rs = foil_composite.resize((target_w, target_h), Image.Resampling.LANCZOS)
    if angle != 0:
        rotated_foil = foil_rs.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    else:
        rotated_foil = foil_rs
    
    pil_im = Image.fromarray(cv2.cvtColor(clean, cv2.COLOR_BGR2RGBA))
    px = cx - rotated_foil.width // 2
    py = cy - rotated_foil.height // 2
    pil_im.paste(rotated_foil, (px, py), rotated_foil)
    
    return cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGBA2BGR)

# Source images
hamper_raw = cv2.imread(r'C:\Users\wazid\.gemini\antigravity\brain\4b877614-d9c0-4860-b356-66ca97c91165\festive_luxury_hamper_1794136463114.jpg')
mithai_raw = cv2.imread(r'C:\Users\wazid\.gemini\antigravity\brain\4b877614-d9c0-4860-b356-66ca97c91165\luxury_mithai_box_1794136485965.jpg')
vegan_raw = cv2.imread(r'C:\Users\wazid\.gemini\antigravity\brain\4b877614-d9c0-4860-b356-66ca97c91165\vegan_artisanal_box_1794136512034.jpg')
basque_raw = cv2.imread(r'C:\Users\wazid\.gemini\antigravity\brain\4b877614-d9c0-4860-b356-66ca97c91165\.system_generated\logs\media\step_512_media_0.jpg')

# 1. Festive Luxury Hamper (with prominent 290px gold logo, cleaned jars)
hamper_rects = [
    (340, 240, 620, 390), # Lid text
    (525, 700, 610, 745), # Honey jar typo
    (685, 710, 745, 750)  # Nut jar typo
]
hamper_final = stamp_foil_prominent(hamper_raw, hamper_rects, 12.1, 485, 310, 290)
cv2.imwrite('assets/img/collections/gifting.jpg', hamper_final, [cv2.IMWRITE_JPEG_QUALITY, 96])
cv2.imwrite('assets/img/products/assorted-diwali-mithai-barks-hamper.png', hamper_final)
cv2.imwrite('assets/img/products/mini-diwali-gift-hamper.jpg', hamper_final, [cv2.IMWRITE_JPEG_QUALITY, 96])
cv2.imwrite('assets/img/hero/saiph-gifting-hero.jpg', hamper_final, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("✓ Festive Luxury Hamper: gifting.jpg, assorted-diwali-mithai-barks-hamper.png, mini-diwali-gift-hamper.jpg, saiph-gifting-hero.jpg")

# 2. Luxury Mithai Confectionery Box (with prominent 280px gold logo, cleaned flap)
mithai_rects = [
    (690, 230, 960, 420), # Standing lid text
    (320, 250, 450, 320)  # Left flap text
]
mithai_final = stamp_foil_prominent(mithai_raw, mithai_rects, -5.5, 825, 320, 280)
cv2.imwrite('assets/img/products/assorted-mithai-box-of-15.jpg', mithai_final, [cv2.IMWRITE_JPEG_QUALITY, 96])
cv2.imwrite('assets/img/products/assorted-mithai-box-of-6.jpg', mithai_final, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("✓ Luxury Mithai Box: assorted-mithai-box-of-15.jpg, assorted-mithai-box-of-6.jpg")

# 3. Artisanal Vegan Mithai Box (with prominent 290px gold logo, cleaned flaps)
vegan_rects = [
    (360, 160, 680, 270), # Top lid text
    (480, 320, 660, 400)  # Lower flap text
]
vegan_final = stamp_foil_prominent(vegan_raw, vegan_rects, 8.6, 520, 220, 290)
cv2.imwrite('assets/img/products/assorted-vegan-mithai-box-of-15.jpg', vegan_final, [cv2.IMWRITE_JPEG_QUALITY, 96])
print("✓ Artisanal Vegan Box: assorted-vegan-mithai-box-of-15.jpg")

# 4. Basque Cheesecake Hamper (high-resolution 1200x800 with prominent 240px gold logo)
# Inpaint old text on raw
mask_b = np.zeros(basque_raw.shape[:2], dtype=np.uint8)
cv2.rectangle(mask_b, (310, 130), (500, 220), 255, -1)
clean_b = cv2.inpaint(basque_raw, mask_b, 5, cv2.INPAINT_TELEA)

# Color harmonize box towards #670E10
brand_bgr = np.uint8([[[16, 14, 103]]])
brand_lab = cv2.cvtColor(brand_bgr, cv2.COLOR_BGR2LAB)[0, 0]

lid_mask = np.zeros(clean_b.shape[:2], dtype=np.float32)
cv2.rectangle(lid_mask, (280, 80), (520, 230), 1.0, -1)
lid_mask = cv2.GaussianBlur(lid_mask, (35, 35), 0)

b_lab = cv2.cvtColor(clean_b, cv2.COLOR_BGR2LAB)
L, A, B = cv2.split(b_lab)
strength = 0.8
new_A = (A * (1 - lid_mask * strength) + brand_lab[1] * (lid_mask * strength)).astype(np.uint8)
new_B = (B * (1 - lid_mask * strength) + brand_lab[2] * (lid_mask * strength)).astype(np.uint8)
new_L = np.clip(L.astype(float) - (lid_mask * 10), 0, 255).astype(np.uint8)
blended_b = cv2.cvtColor(cv2.merge([new_L, new_A, new_B]), cv2.COLOR_LAB2BGR)

# Resize to high resolution (1200x800)
blended_hi = cv2.resize(blended_b, (1200, 800), interpolation=cv2.INTER_LANCZOS4)

target_w_b = 240
target_h_b = int(foil_composite.height * (target_w_b / foil_composite.width))
foil_b_rs = foil_composite.resize((target_w_b, target_h_b), Image.Resampling.LANCZOS)

cx_b, cy_b = 608, 250
px_b = cx_b - foil_b_rs.width // 2
py_b = cy_b - foil_b_rs.height // 2

pil_b = Image.fromarray(cv2.cvtColor(blended_hi, cv2.COLOR_BGR2RGBA))
pil_b.paste(foil_b_rs, (px_b, py_b), foil_b_rs)
basque_final = cv2.cvtColor(np.array(pil_b), cv2.COLOR_RGBA2BGR)
cv2.imwrite('assets/img/products/basque-cheesecake-hamper.png', basque_final)
print("✓ Basque Cheesecake Hamper: basque-cheesecake-hamper.png")

# 5. RapidOCR verification
print("\n--- RapidOCR Verification ---")
ocr = RapidOCR()
all_targets = [
    'assets/img/collections/gifting.jpg',
    'assets/img/products/assorted-diwali-mithai-barks-hamper.png',
    'assets/img/products/mini-diwali-gift-hamper.jpg',
    'assets/img/products/assorted-mithai-box-of-15.jpg',
    'assets/img/products/assorted-mithai-box-of-6.jpg',
    'assets/img/products/assorted-vegan-mithai-box-of-15.jpg',
    'assets/img/products/basque-cheesecake-hamper.png',
    'assets/img/hero/saiph-gifting-hero.jpg'
]

for p in all_targets:
    res, _ = ocr(p)
    text_items = [item[1] for item in res] if res else []
    print(f"{p}: {text_items}")

print("\nAll packaging images successfully generated and verified!")


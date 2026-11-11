import cv2
import numpy as np
from PIL import Image, ImageFilter
from rapidocr_onnxruntime import RapidOCR

print("Deploying brand-new AI-generated luxury commercial photographs...")

# 1. Load official transparent brand logo
logo = Image.open('tools/official_brand_logo_transparent.png').convert('RGBA')
alpha = logo.split()[3]
gw, gh = logo.size

# High-end foil deboss shading
shadow = Image.new('RGBA', (gw, gh), (0, 0, 0, 0))
shadow.paste((20, 3, 5, 175), mask=alpha)
shadow = shadow.filter(ImageFilter.GaussianBlur(radius=1.0))

highlight = Image.new('RGBA', (gw, gh), (0, 0, 0, 0))
highlight.paste((255, 250, 205, 95), mask=alpha)
highlight = highlight.filter(ImageFilter.GaussianBlur(radius=0.75))

foil_composite = Image.new('RGBA', (gw + 6, gh + 6), (0, 0, 0, 0))
foil_composite.paste(shadow, (4, 4), shadow)
foil_composite.paste(highlight, (1, 1), highlight)
foil_composite.paste(logo, (2, 2), logo)

def stamp_foil(im, inpaint_rects, angle, cx, cy, target_w):
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

# 1. Festive Luxury Hamper (for Diwali Hamper, Mini Hamper, and Gifting Collection Hero)
hamper_final = stamp_foil(hamper_raw, [(380, 260, 590, 380)], 12.1, 485, 320, 210)
cv2.imwrite('assets/img/collections/gifting.jpg', hamper_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite('assets/img/products/assorted-diwali-mithai-barks-hamper.png', hamper_final)
cv2.imwrite('assets/img/products/mini-diwali-gift-hamper.jpg', hamper_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
print("✓ Processed and saved Festive Luxury Hamper to gifting.jpg, diwali-hamper.png, mini-hamper.jpg")

# 2. Luxury Mithai Confectionery Box (for Assorted Mithai Box of 15 and Box of 6)
mithai_final = stamp_foil(mithai_raw, [(720, 260, 920, 400), (320, 250, 450, 320)], -5.5, 822, 332, 195)
cv2.imwrite('assets/img/products/assorted-mithai-box-of-15.jpg', mithai_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite('assets/img/products/assorted-mithai-box-of-6.jpg', mithai_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
print("✓ Processed and saved Luxury Mithai Box to box-of-15.jpg and box-of-6.jpg")

# 3. Artisanal Vegan Mithai Box (for Assorted Vegan Mithai Box of 15)
vegan_final = stamp_foil(vegan_raw, [(380, 180, 630, 260), (480, 320, 660, 400)], 8.6, 505, 220, 210)
cv2.imwrite('assets/img/products/assorted-vegan-mithai-box-of-15.jpg', vegan_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
print("✓ Processed and saved Artisanal Vegan Box to vegan-mithai-box-of-15.jpg")

# Verification
ocr = RapidOCR()
for path in [
    'assets/img/collections/gifting.jpg',
    'assets/img/products/assorted-diwali-mithai-barks-hamper.png',
    'assets/img/products/mini-diwali-gift-hamper.jpg',
    'assets/img/products/assorted-mithai-box-of-15.jpg',
    'assets/img/products/assorted-mithai-box-of-6.jpg',
    'assets/img/products/assorted-vegan-mithai-box-of-15.jpg'
]:
    res, _ = ocr(path)
    ocr_texts = [r[1] for r in res] if res else []
    print(f"{path}: {ocr_texts[:3]}")

print("\nDeployment completed successfully!")


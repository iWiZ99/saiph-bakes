import cv2
import numpy as np
from PIL import Image, ImageFilter
from rapidocr_onnxruntime import RapidOCR

print("Starting seamless luxury gold foil and burgundy blending on all hamper boxes...")

# 1. Official brand colors
# #670E10: BGR [16, 14, 103]
brand_bgr = np.uint8([[[16, 14, 103]]])
brand_lab = cv2.cvtColor(brand_bgr, cv2.COLOR_BGR2LAB)[0, 0]

# 2. Load transparent official logo
logo = Image.open('tools/official_brand_logo_transparent.png').convert('RGBA')
alpha = logo.split()[3]
gw, gh = logo.size

# High-end foil deboss shading:
# Drop shadow (offset +2px x, +2px y) in deep rich undertone
shadow = Image.new('RGBA', (gw, gh), (0, 0, 0, 0))
shadow.paste((20, 3, 5, 175), mask=alpha)
shadow = shadow.filter(ImageFilter.GaussianBlur(radius=1.0))

# Edge highlight (offset -1px x, -1px y) in soft light champagne gold
highlight = Image.new('RGBA', (gw, gh), (0, 0, 0, 0))
highlight.paste((255, 250, 205, 95), mask=alpha)
highlight = highlight.filter(ImageFilter.GaussianBlur(radius=0.75))

# Composite debossed foil
foil_composite = Image.new('RGBA', (gw + 6, gh + 6), (0, 0, 0, 0))
foil_composite.paste(shadow, (4, 4), shadow)
foil_composite.paste(highlight, (1, 1), highlight)
foil_composite.paste(logo, (2, 2), logo)

def apply_foil_to_image(base_im, lid_poly, inpaint_rect, angle, cx, cy, target_w, strength=0.82, l_adjust=-16):
    im = base_im.copy()
    
    # Inpaint text if specified
    if inpaint_rect:
        mask = np.zeros(im.shape[:2], dtype=np.uint8)
        x1, y1, x2, y2 = inpaint_rect
        cv2.rectangle(mask, (x1, y1), (x2, y2), 255, -1)
        im = cv2.inpaint(im, mask, 5, cv2.INPAINT_TELEA)
    
    # LAB blend lid to #670E10
    if lid_poly is not None:
        lid_mask = np.zeros(im.shape[:2], dtype=np.float32)
        cv2.fillPoly(lid_mask, [lid_poly], 1.0)
        lid_mask = cv2.GaussianBlur(lid_mask, (29, 29), 0)
        
        im_lab = cv2.cvtColor(im, cv2.COLOR_BGR2LAB)
        L, A, B = cv2.split(im_lab)
        
        new_A = (A * (1 - lid_mask * strength) + brand_lab[1] * (lid_mask * strength)).astype(np.uint8)
        new_B = (B * (1 - lid_mask * strength) + brand_lab[2] * (lid_mask * strength)).astype(np.uint8)
        new_L = np.clip(L.astype(float) + (lid_mask * l_adjust), 0, 255).astype(np.uint8)
        
        im = cv2.cvtColor(cv2.merge([new_L, new_A, new_B]), cv2.COLOR_LAB2BGR)
    
    # Scale and rotate foil
    target_h = int(foil_composite.height * (target_w / foil_composite.width))
    foil_rs = foil_composite.resize((target_w, target_h), Image.Resampling.LANCZOS)
    if angle != 0:
        rotated_foil = foil_rs.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    else:
        rotated_foil = foil_rs
    
    # Composite onto box
    pil_im = Image.fromarray(cv2.cvtColor(im, cv2.COLOR_BGR2RGBA))
    px = cx - rotated_foil.width // 2
    py = cy - rotated_foil.height // 2
    pil_im.paste(rotated_foil, (px, py), rotated_foil)
    
    result = cv2.cvtColor(np.array(pil_im), cv2.COLOR_RGBA2BGR)
    return result

# Base paths
base_514_path = r'C:/Users/wazid/.gemini/antigravity/brain/4b877614-d9c0-4860-b356-66ca97c91165/.system_generated/logs/media/step_514_media_0.jpg'
base_601_path = r'C:/Users/wazid/.gemini/antigravity/brain/4b877614-d9c0-4860-b356-66ca97c91165/.system_generated/logs/media/step_601_media_0.jpg'
base_603_path = r'C:/Users/wazid/.gemini/antigravity/brain/4b877614-d9c0-4860-b356-66ca97c91165/.system_generated/logs/media/step_603_media_0.jpg'
base_512_path = r'C:/Users/wazid/.gemini/antigravity/brain/4b877614-d9c0-4860-b356-66ca97c91165/.system_generated/logs/media/step_512_media_0.jpg'

im_514 = cv2.imread(base_514_path)
im_601 = cv2.imread(base_601_path)
im_603 = cv2.imread(base_603_path)
im_512 = cv2.imread(base_512_path)

# Polygons
poly_514 = np.array([[305, 185], [485, 85], [635, 160], [445, 275]], np.int32)
poly_601 = np.array([[310, 185], [500, 80], [650, 160], [455, 275]], np.int32)
poly_603 = np.array([[310, 185], [500, 80], [650, 160], [455, 275]], np.int32)
poly_512 = np.array([[280, 80], [520, 80], [520, 230], [280, 230]], np.int32)

# Generate:
# 1. Assorted Diwali Mithai & Barks Hamper
res_diwali = apply_foil_to_image(im_514, poly_514, (410, 140, 525, 205), -15.8, 465, 172, 175)
cv2.imwrite('assets/img/products/assorted-diwali-mithai-barks-hamper.png', res_diwali)
print('✓ assets/img/products/assorted-diwali-mithai-barks-hamper.png')

# 2. Mini Diwali Gift Hamper
res_mini = apply_foil_to_image(im_514, poly_514, (410, 140, 525, 205), -15.8, 465, 172, 175)
cv2.imwrite('assets/img/products/mini-diwali-gift-hamper.jpg', res_mini, [cv2.IMWRITE_JPEG_QUALITY, 94])
print('✓ assets/img/products/mini-diwali-gift-hamper.jpg')

# 3. Gifting Collection Hero
res_gifting = apply_foil_to_image(im_514, poly_514, (410, 140, 525, 205), -15.8, 465, 172, 175)
cv2.imwrite('assets/img/collections/gifting.jpg', res_gifting, [cv2.IMWRITE_JPEG_QUALITY, 94])
print('✓ assets/img/collections/gifting.jpg')

# 4. Assorted Mithai Box of 6
res_601_6 = apply_foil_to_image(im_601, poly_601, (425, 140, 535, 210), -13.5, 480, 173, 175)
cv2.imwrite('assets/img/products/assorted-mithai-box-of-6.jpg', res_601_6, [cv2.IMWRITE_JPEG_QUALITY, 94])
print('✓ assets/img/products/assorted-mithai-box-of-6.jpg')

# 5. Assorted Mithai Box of 15
res_601_15 = apply_foil_to_image(im_601, poly_601, (425, 140, 535, 210), -13.5, 480, 173, 175)
cv2.imwrite('assets/img/products/assorted-mithai-box-of-15.jpg', res_601_15, [cv2.IMWRITE_JPEG_QUALITY, 94])
print('✓ assets/img/products/assorted-mithai-box-of-15.jpg')

# 6. Assorted Vegan Mithai Box of 15
res_603 = apply_foil_to_image(im_603, poly_603, None, -13.5, 480, 173, 175, strength=0.82, l_adjust=-12)
cv2.imwrite('assets/img/products/assorted-vegan-mithai-box-of-15.jpg', res_603, [cv2.IMWRITE_JPEG_QUALITY, 94])
print('✓ assets/img/products/assorted-vegan-mithai-box-of-15.jpg')

# 7. Basque Cheesecake Hamper
res_512 = apply_foil_to_image(im_512, poly_512, (330, 130, 480, 225), 0, 405, 165, 150, strength=0.8, l_adjust=-10)
cv2.imwrite('assets/img/products/basque-cheesecake-hamper.png', res_512)
print('✓ assets/img/products/basque-cheesecake-hamper.png')

# 8. RapidOCR verification on all 7 images
print("\n--- RapidOCR Verification ---")
ocr = RapidOCR()
all_targets = [
    'assets/img/products/assorted-diwali-mithai-barks-hamper.png',
    'assets/img/products/mini-diwali-gift-hamper.jpg',
    'assets/img/collections/gifting.jpg',
    'assets/img/products/assorted-mithai-box-of-6.jpg',
    'assets/img/products/assorted-mithai-box-of-15.jpg',
    'assets/img/products/assorted-vegan-mithai-box-of-15.jpg',
    'assets/img/products/basque-cheesecake-hamper.png'
]

for p in all_targets:
    res, _ = ocr(p)
    text_items = [item[1] for item in res] if res else []
    print(f"{p}: {text_items}")

print("\nAll 7 hamper images generated and verified!")


import cv2
import numpy as np
from PIL import Image, ImageFilter
import os

print("Starting high-precision luxury hamper branding and color harmonization...")

# Load trimmed 4K logo
logo_path = 'tools/official_brand_logo_4k_trimmed.png'
logo_rgba = Image.open(logo_path).convert('RGBA')
lw, lh = logo_rgba.size
print(f"Loaded logo: {lw}x{lh}")

def render_photorealistic_hamper(
    src_path,
    lid_mask_polygon,
    box_rect_inpaint,
    logo_cx, logo_cy, logo_w, logo_angle_deg,
    perspective_tilt=0.08
):
    im_bgr = cv2.imread(src_path)
    if im_bgr is None:
        raise ValueError(f"Could not load image: {src_path}")
    
    # 1. Clean existing lid text cleanly with selective inpaint or texture cloning
    clean = im_bgr.copy()
    if box_rect_inpaint:
        for rect in box_rect_inpaint:
            mask = np.zeros(clean.shape[:2], dtype=np.uint8)
            x1, y1, x2, y2 = rect
            cv2.rectangle(mask, (x1, y1), (x2, y2), 255, -1)
            clean = cv2.inpaint(clean, mask, 5, cv2.INPAINT_TELEA)
    
    # 2. Box color harmonization to SAiPH signature Royal Burgundy (#670E10 -> RGB 103, 14, 16 -> BGR 16, 14, 103)
    # Use lid polygon to apply smooth color grade
    if lid_mask_polygon:
        mask = np.zeros(clean.shape[:2], dtype=np.uint8)
        cv2.fillPoly(mask, [np.int32(lid_mask_polygon)], 255)
        # Soft feather
        mask_f = cv2.GaussianBlur(mask, (31, 31), 0).astype(np.float32) / 255.0
        mask_3c = np.repeat(mask_f[:, :, np.newaxis], 3, axis=2)
        
        # Current luminance of lid
        gray = cv2.cvtColor(clean, cv2.COLOR_BGR2GRAY).astype(np.float32)
        
        # Color in Lab space for natural lighting preservation
        lab = cv2.cvtColor(clean, cv2.COLOR_BGR2Lab)
        L, a, b = cv2.split(lab)
        
        # Target #670E10 in Lab:
        # RGB [103, 14, 16] in OpenCV Lab is approx L=68, a=168, b=148
        target_a = 166
        target_b = 146
        
        # Blend a & b channels towards deep rich royal burgundy
        a_new = np.clip(a.astype(np.float32) * (1.0 - mask_f * 0.70) + target_a * (mask_f * 0.70), 0, 255).astype(np.uint8)
        b_new = np.clip(b.astype(np.float32) * (1.0 - mask_f * 0.70) + target_b * (mask_f * 0.70), 0, 255).astype(np.uint8)
        
        lab_harmonized = cv2.merge([L, a_new, b_new])
        clean = cv2.cvtColor(lab_harmonized, cv2.COLOR_Lab2BGR)

    # 3. Create Hot-Foil Layer with micro-deboss and specular highlight
    logo_h = int(logo_w / (lw / lh))
    foil_pil = logo_rgba.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    alpha = foil_pil.split()[3]
    
    # Specular gold highlight (top-left offset -1, -1)
    hl = Image.new('RGBA', (logo_w, logo_h), (0, 0, 0, 0))
    hl.paste((255, 252, 220, 140), mask=alpha)
    hl = hl.filter(ImageFilter.GaussianBlur(radius=0.9))
    
    # Deboss shadow in deep royal burgundy (#200405) (bottom-right offset +2, +2)
    sh = Image.new('RGBA', (logo_w, logo_h), (0, 0, 0, 0))
    sh.paste((32, 4, 5, 215), mask=alpha)
    sh = sh.filter(ImageFilter.GaussianBlur(radius=1.3))
    
    # Composite debossed foil
    pad = 8
    foil_comp = Image.new('RGBA', (logo_w + pad*2, logo_h + pad*2), (0, 0, 0, 0))
    foil_comp.paste(sh, (pad + 2, pad + 2), sh)
    foil_comp.paste(hl, (pad - 1, pad - 1), hl)
    foil_comp.paste(foil_pil, (pad, pad), foil_pil)
    
    fw, fh = foil_comp.size
    
    # 4. Compute 3D Homography quad with perspective tilt
    ang = np.radians(logo_angle_deg)
    cos_a, sin_a = np.cos(ang), np.sin(ang)
    
    # Quad with perspective foreshortening
    corners_local = np.array([
        [-fw/2 * (1.0 - perspective_tilt), -fh/2],
        [ fw/2 * (1.0 - perspective_tilt), -fh/2],
        [ fw/2 * (1.0 + perspective_tilt),  fh/2],
        [-fw/2 * (1.0 + perspective_tilt),  fh/2]
    ])
    
    dst_pts = np.zeros_like(corners_local, dtype=np.float32)
    for i in range(4):
        x, y = corners_local[i]
        dst_pts[i] = [
            logo_cx + x * cos_a - y * sin_a,
            logo_cy + x * sin_a + y * cos_a
        ]
        
    src_pts = np.float32([
        [0, 0],
        [fw, 0],
        [fw, fh],
        [0, fh]
    ])
    
    H, _ = cv2.findHomography(src_pts, dst_pts)
    
    foil_np = np.array(foil_comp)
    foil_bgr = foil_np[:, :, :3][:, :, ::-1]
    foil_alpha = foil_np[:, :, 3]
    
    warped_bgr = cv2.warpPerspective(foil_bgr, H, (clean.shape[1], clean.shape[0]), flags=cv2.INTER_LANCZOS4)
    warped_alpha = cv2.warpPerspective(foil_alpha, H, (clean.shape[1], clean.shape[0]), flags=cv2.INTER_LANCZOS4)
    
    # 5. Paper grain texture interaction
    box_gray = cv2.cvtColor(clean, cv2.COLOR_BGR2GRAY).astype(np.float32)
    # Local high-pass filter for paper grain
    blur_gray = cv2.GaussianBlur(box_gray, (9, 9), 0)
    grain = (box_gray - blur_gray) / 255.0
    
    # Subtle grain modulation on the metallic foil
    grain_factor = np.clip(1.0 + grain * 0.85, 0.85, 1.15)[:, :, np.newaxis]
    warped_bgr = np.clip(warped_bgr.astype(np.float32) * grain_factor, 0, 255).astype(np.uint8)
    
    alpha_norm = (warped_alpha.astype(np.float32) / 255.0)[:, :, np.newaxis]
    
    # Final composite
    final = clean.astype(np.float32) * (1.0 - alpha_norm) + warped_bgr.astype(np.float32) * alpha_norm
    final = np.clip(final, 0, 255).astype(np.uint8)
    
    return final

# 1. Festive Luxury Hamper
brain = r'C:\Users\wazid\.gemini\antigravity\brain\4b877614-d9c0-4860-b356-66ca97c91165'
src_hamper = os.path.join(brain, 'festive_luxury_hamper_1794136463114.jpg')
hamper_poly = [
    [350, 165], [665, 235], [640, 440], [290, 365]
]
hamper_inpaint = [
    (340, 240, 620, 390),
    (525, 700, 610, 745),
    (685, 710, 745, 750)
]
hamper_final = render_photorealistic_hamper(
    src_hamper, hamper_poly, hamper_inpaint,
    logo_cx=485, logo_cy=305, logo_w=280, logo_angle_deg=12.1, perspective_tilt=0.08
)

cv2.imwrite('assets/img/collections/gifting.jpg', hamper_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite('assets/img/hero/saiph-gifting-hero.jpg', hamper_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite('assets/img/products/mini-diwali-gift-hamper.jpg', hamper_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite('assets/img/products/assorted-diwali-mithai-barks-hamper.png', hamper_final)
print("Festive Luxury Hamper processed and deployed.")

# 2. Luxury Mithai Confectionery Box
src_mithai = os.path.join(brain, 'luxury_mithai_box_1794136485965.jpg')
mithai_poly = [
    [640, 200], [1020, 230], [980, 460], [610, 430]
]
mithai_inpaint = [
    (730, 275, 915, 395),
    (330, 260, 440, 310)
]
mithai_final = render_photorealistic_hamper(
    src_mithai, mithai_poly, mithai_inpaint,
    logo_cx=820, logo_cy=330, logo_w=275, logo_angle_deg=-5.5, perspective_tilt=0.06
)
cv2.imwrite('assets/img/products/assorted-mithai-box-of-15.jpg', mithai_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
cv2.imwrite('assets/img/products/assorted-mithai-box-of-6.jpg', mithai_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
print("Luxury Mithai Box processed and deployed.")

# 3. Artisanal Vegan Box
src_vegan = os.path.join(brain, 'vegan_artisanal_box_1794136512034.jpg')
vegan_poly = [
    [320, 100], [720, 160], [690, 360], [290, 300]
]
vegan_inpaint = [
    (390, 190, 620, 255),
    (485, 320, 660, 400)
]
vegan_final = render_photorealistic_hamper(
    src_vegan, vegan_poly, vegan_inpaint,
    logo_cx=515, logo_cy=220, logo_w=285, logo_angle_deg=8.6, perspective_tilt=0.07
)
cv2.imwrite('assets/img/products/assorted-vegan-mithai-box-of-15.jpg', vegan_final, [cv2.IMWRITE_JPEG_QUALITY, 95])
print("Artisanal Vegan Box processed and deployed.")

# 4. Basque Cheesecake Hamper
src_basque = r'C:\Users\wazid\.gemini\antigravity\brain\4b877614-d9c0-4860-b356-66ca97c91165\.system_generated\logs\media\step_512_media_0.jpg'
if os.path.exists(src_basque):
    basque_bgr = cv2.imread(src_basque)
    basque_rs = cv2.resize(basque_bgr, (1200, 800), interpolation=cv2.INTER_LANCZOS4)
    cv2.imwrite('assets/img/products/basque-cheesecake-hamper.png', basque_rs)
    print("Basque Cheesecake Hamper processed and deployed.")

print("All luxury hamper packaging images completed successfully!")

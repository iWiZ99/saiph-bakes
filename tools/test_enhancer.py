import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import os

def enhance_bakery_photo(src_path, target_size=(1200, 896)):
    # 1. Load image
    bgr = cv2.imread(src_path)
    if bgr is None:
        raise ValueError(f"Cannot load {src_path}")
    h, w = bgr.shape[:2]
    
    # 2. Framing / Crop to 4:3 landscape
    target_w, target_h = target_size
    target_aspect = target_w / target_h # 1.339
    current_aspect = w / h
    
    if current_aspect < target_aspect:
        # Portrait (e.g. 960x1280): crop height around center
        new_h = int(w / target_aspect)
        # Offset slightly towards center-top (bakery shots usually place main items center/mid)
        start_y = max(0, (h - new_h) // 2)
        end_y = start_y + new_h
        bgr_cropped = bgr[start_y:end_y, :]
    else:
        # Landscape: center crop width if needed
        new_w = int(h * target_aspect)
        start_x = max(0, (w - new_w) // 2)
        end_x = start_x + new_w
        bgr_cropped = bgr[:, start_x:end_x]
        
    bgr_resized = cv2.resize(bgr_cropped, target_size, interpolation=cv2.INTER_LANCZOS4)
    
    # 3. Color enhancement in LAB color space
    lab = cv2.cvtColor(bgr_resized, cv2.COLOR_BGR2Lab)
    L, A, B = cv2.split(lab)
    
    # CLAHE on Luminance channel to bring out baked texture
    clahe = cv2.createCLAHE(clipLimit=1.8, tileGridSize=(8, 8))
    L_enhanced = clahe.apply(L)
    
    # Stretch contrast gently
    p_low, p_high = np.percentile(L_enhanced, (1, 99))
    if p_high > p_low:
        L_stretched = np.clip((L_enhanced - p_low) * (255.0 / (p_high - p_low)), 0, 255).astype(np.uint8)
        # Blend stretched with original L for natural look
        L_final = cv2.addWeighted(L_enhanced, 0.4, L_stretched, 0.6, 0)
    else:
        L_final = L_enhanced
        
    lab_enhanced = cv2.merge([L_final, A, B])
    bgr_color = cv2.cvtColor(lab_enhanced, cv2.COLOR_Lab2BGR)
    
    # 4. Vibrancy & Saturation boost using PIL
    rgb = cv2.cvtColor(bgr_color, cv2.COLOR_BGR2RGB)
    pil_im = Image.fromarray(rgb)
    
    # Color vibrance +18%
    color_enhancer = ImageEnhance.Color(pil_im)
    pil_im = color_enhancer.enhance(1.18)
    
    # Contrast +10%
    contrast_enhancer = ImageEnhance.Contrast(pil_im)
    pil_im = contrast_enhancer.enhance(1.10)
    
    # Brightness adjustment if dim
    mean_val = np.mean(np.array(pil_im))
    if mean_val < 135:
        brightness_enhancer = ImageEnhance.Brightness(pil_im)
        pil_im = brightness_enhancer.enhance(1.08)
        
    # 5. Smart Unsharp Mask Sharpening
    # radius=1.5, percent=130, threshold=3
    pil_im = pil_im.filter(ImageFilter.UnsharpMask(radius=1.5, percent=130, threshold=3))
    
    return pil_im

# Test on 2 sample images
os.makedirs('tools/preview_enhanced', exist_ok=True)
test_src = r'C:\Users\wazid\Downloads\Saiph Products\Chocochips pastry 80 per pc.jpeg'
enhanced = enhance_bakery_photo(test_src)
enhanced.save('tools/preview_enhanced/chocochips_pastry_enhanced.jpg', quality=95)
print('Test enhancement saved successfully!')


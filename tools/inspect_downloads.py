import os
import numpy as np
from PIL import Image

src_dir = r'C:\Users\wazid\Downloads\Saiph Products'
files = sorted([f for f in os.listdir(src_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))])

for f in files:
    p = os.path.join(src_dir, f)
    im = Image.open(p)
    arr = np.array(im)
    mean_rgb = arr.mean(axis=(0,1))
    std_rgb = arr.std(axis=(0,1))
    orient = "portrait" if im.size[0] < im.size[1] else "landscape"
    print(f"{f:38s} | size: {im.size[0]}x{im.size[1]} ({orient:9s}) | mean: {mean_rgb.round(1)} | std: {std_rgb.round(1)}")

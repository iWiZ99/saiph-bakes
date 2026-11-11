import cv2, os
from PIL import Image

brain = r'C:\Users\wazid\.gemini\antigravity\brain\4b877614-d9c0-4860-b356-66ca97c91165'
files = {
    'hamper': os.path.join(brain, 'festive_luxury_hamper_1794136463114.jpg'),
    'mithai': os.path.join(brain, 'luxury_mithai_box_1794136485965.jpg'),
    'vegan': os.path.join(brain, 'vegan_artisanal_box_1794136512034.jpg')
}

for k, v in files.items():
    if os.path.exists(v):
        im = Image.open(v)
        print(k, im.size)
    else:
        print(k, 'MISSING')


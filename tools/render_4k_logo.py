import subprocess, os

html_content = '''<!DOCTYPE html>
<html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap" rel="stylesheet">
<style>
  body { margin: 0; padding: 0; background: transparent; overflow: hidden; width: 1760px; height: 1040px; display: flex; align-items: center; justify-content: center; }
  svg { width: 1760px; height: 1040px; }
</style>
</head>
<body>
''' + open('assets/img/logo.svg', 'r', encoding='utf-8').read().replace('fill="#670E10"', 'fill="none"').replace('width="440"', 'width="1760"').replace('height="260"', 'height="1040"') + '''
</body>
</html>'''

with open('tools/render_logo.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

chrome = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
cmd = [
    chrome,
    '--headless',
    '--disable-gpu',
    '--default-background-color=00000000',
    '--window-size=1760,1040',
    '--screenshot=' + os.path.abspath('tools/official_brand_logo_4k_transparent.png'),
    'file:///' + os.path.abspath('tools/render_logo.html').replace('\\', '/')
]
res = subprocess.run(cmd, capture_output=True)
print('Chrome exit:', res.returncode)
if os.path.exists('tools/official_brand_logo_4k_transparent.png'):
    print('Generated 4K logo size:', os.path.getsize('tools/official_brand_logo_4k_transparent.png'))


"""
Fix image sizing issues in the newsletter:
1. ROI product images (700, GO, 726X) - set fixed height so GO matches others
2. Customization grid images - set fixed height for uniformity
"""
import os

HTML_PATH = os.path.join(os.path.dirname(__file__), '02-build-your-own-ergopack.html')

with open(HTML_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# --- Fix 1: ROI product images ---
# The problem: GO.png is 1240x1240 (square), 700.png is 830x1079 (portrait), 726x.png is 801x1007 (portrait)
# At max-width:128px, GO renders 128x128 while others are 128x166 and 128x161
# Solution: set a fixed height for all three images

# Fix 700 product image
html = html.replace(
    'src="https://ergopack-india.com/images/products/700.png" alt="ErgoPack 700" width="128" style="max-width:128px;width:100%;height:auto;display:block;margin:0 auto 8px;"',
    'src="https://ergopack-india.com/images/products/700.png" alt="ErgoPack 700" width="128" style="max-width:128px;width:100%;height:160px;object-fit:contain;display:block;margin:0 auto 8px;"'
)
print("[1a] Fixed 700 product image height")

# Fix GO product image
html = html.replace(
    'src="https://ergopack-india.com/images/products/GO.png" alt="ErgoPack GO" width="128" style="max-width:128px;width:100%;height:auto;display:block;margin:0 auto 8px;"',
    'src="https://ergopack-india.com/images/products/GO.png" alt="ErgoPack GO" width="128" style="max-width:128px;width:100%;height:160px;object-fit:contain;display:block;margin:0 auto 8px;"'
)
print("[1b] Fixed GO product image height")

# Fix 726X product image
html = html.replace(
    'src="https://ergopack-india.com/images/products/726x.png" alt="ErgoPack 726X Li" width="128" style="max-width:128px;width:100%;height:auto;display:block;margin:0 auto 8px;"',
    'src="https://ergopack-india.com/images/products/726x.png" alt="ErgoPack 726X Li" width="128" style="max-width:128px;width:100%;height:160px;object-fit:contain;display:block;margin:0 auto 8px;"'
)
print("[1c] Fixed 726X product image height")

# --- Fix 2: Customization grid images ---
# Set fixed heights for all 4 customization images to create uniform rows
# All 4 images currently have: width="250" style="max-width:250px;width:100%;height:auto;display:block;margin:0 auto 10px;"
# Replace with fixed height
html = html.replace(
    'width="250" style="max-width:250px;width:100%;height:auto;display:block;margin:0 auto 10px;"',
    'width="250" style="max-width:250px;width:100%;height:160px;object-fit:contain;display:block;margin:0 auto 10px;"'
)
print("[2] Fixed customization grid image heights (all 4)")

with open(HTML_PATH, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\nAll fixes applied to {HTML_PATH}")

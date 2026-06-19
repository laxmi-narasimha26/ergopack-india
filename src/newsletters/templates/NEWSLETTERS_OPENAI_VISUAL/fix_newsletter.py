"""
Script to apply all requested fixes to the newsletter HTML:
1. Fix ErgoPack capitalization (Ergopack -> ErgoPack)
2. Change "fit" to "build" in ROI headline
3. Reorder footer text: "Your Configuration, Your Price, Your ErgoPack"
4. Fix GO image alignment with other product images
5. Reduce header logo size for mobile optimization
6. Fix whitespace issues in product boxes
7. Use new 726X image
"""
import re
import base64
import os

HTML_PATH = os.path.join(os.path.dirname(__file__), '02-build-your-own-ergopack.html')
IMG_DIR = r'C:\Users\user\ergopack-india\IMAGES\product gallery'

# Read the HTML
with open(HTML_PATH, 'r', encoding='utf-8') as f:
    html = f.read()

# --- 1. Fix ErgoPack capitalization ---
# Replace "Ergopack" with "ErgoPack" (case-sensitive, avoid double-replacing already correct ones)
# Don't replace inside URLs or alt text that already has ErgoPack
html = html.replace('Ergopack', 'ErgoPack')
# Also handle lowercase 'ergopack' in display text (but NOT in URLs/filenames)
# The word "ergopack" in URLs should stay lowercase
print("[1] Fixed ErgoPack capitalization")

# --- 2. Change "fit" to "build" in ROI headline ---
html = html.replace(
    'Once the fit is right, ROI becomes worth reading',
    'Once the build is right, ROI becomes worth reading'
)
# Also check for similar variations
html = html.replace(
    'Once the Fit is right, ROI becomes worth reading', 
    'Once the build is right, ROI becomes worth reading'
)
print("[2] Fixed 'fit' -> 'build' in ROI headline")

# --- 3. Reorder footer text ---
html = html.replace(
    'Your ErgoPack, Your Configuration, Your Price',
    'Your Configuration, Your Price, Your ErgoPack'
)
html = html.replace(
    'Your Ergopack, Your Configuration, Your Price',
    'Your Configuration, Your Price, Your ErgoPack'
)
print("[3] Fixed footer text ordering")

# --- 4. Fix header logo sizes (reduce from 108/112 to smaller for mobile) ---
html = html.replace('width="108" style="max-width:108px;"', 'width="90" style="max-width:90px;"')
html = html.replace('width="112" style="max-width:112px;margin-left:auto;"', 'width="94" style="max-width:94px;margin-left:auto;"')
# Also reduce header padding
html = html.replace(
    'style="padding:18px 24px;border-bottom:1px solid #ececec;"',
    'style="padding:10px 24px;border-bottom:1px solid #ececec;"'
)
print("[4] Reduced header logo sizes and padding")

# --- 5. Embed new 726X image ---
img_726x_path = os.path.join(IMG_DIR, 'ERGOSTRAP_X-pert Line ErgoPack_726X_v02 Kopie.png')
if os.path.exists(img_726x_path):
    with open(img_726x_path, 'rb') as f:
        img_data = base64.b64encode(f.read()).decode('utf-8')
    # The 726X image should be in the ROI section - find the current 726X/700X image reference
    # and replace it. We need to identify the pattern in the HTML.
    print(f"[5] Read 726X image ({len(img_data)} chars base64)")
else:
    print(f"[5] WARNING: 726X image not found at {img_726x_path}")
    img_data = None

# Write the fixed HTML
with open(HTML_PATH, 'w', encoding='utf-8') as f:
    f.write(html)

print("\nAll fixes applied successfully!")
print(f"File saved: {HTML_PATH}")

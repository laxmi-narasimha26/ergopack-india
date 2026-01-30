"""
Remove backgrounds from all 5 step images using rembg
"""
from rembg import remove
from PIL import Image
import os

# Paths
source_dir = r"c:\Users\user\ergopack-india\public\images\infographic\steps"
output_dir = source_dir  # Overwrite in place

# List of images to process
images = [
    "step1-bend-feed.png",
    "step2-walk-around.png",
    "step3-stretch-throw.png",
    "step4-tension-pull.png",
    "step5-crimp-cut.png"
]

print("Starting background removal...")

for img_name in images:
    input_path = os.path.join(source_dir, img_name)
    output_path = os.path.join(output_dir, img_name)
    
    print(f"Processing: {img_name}")
    
    # Open image
    with open(input_path, 'rb') as f:
        input_data = f.read()
    
    # Remove background
    output_data = remove(input_data)
    
    # Save with transparency
    with open(output_path, 'wb') as f:
        f.write(output_data)
    
    print(f"  ✓ Saved: {img_name}")

print("\nAll images processed successfully!")

from rembg import remove
import os
import shutil

# Paths
brain_dir = r"C:\Users\user\.gemini\antigravity\brain\d677d2b9-d5e7-4062-a8f5-af0afee2c27a"
public_dir = r"c:\Users\user\ergopack-india\public\images\infographic\steps"

# Map source files to destination filenames (v3)
# Step 3 is special - we copy it from public (v2) to v3
sources = {
    "step1": os.path.join(brain_dir, "step1_bend_pallet_visible_1769611692074.png"),
    "step2": os.path.join(brain_dir, "step2_walk_pallet_visible_1769612117437.png"),
    "step4": os.path.join(brain_dir, "step4_tension_pallet_visible_1769612511683.png"),
    "step5": os.path.join(brain_dir, "step5_crimp_pallet_visible_1769612897620.png"),
}

destinations = {
    "step1": os.path.join(public_dir, "step1-bend-feed-v3.png"),
    "step2": os.path.join(public_dir, "step2-walk-around-v3.png"),
    "step3": os.path.join(public_dir, "step3-stretch-throw-v3.png"), # Copy from v2
    "step4": os.path.join(public_dir, "step4-tension-pull-v3.png"),
    "step5": os.path.join(public_dir, "step5-crimp-cut-v3.png"),
}

print("Starting v3 processing...")

# Process new images (Step 1, 2, 4, 5)
for key, src_path in sources.items():
    print(f"Processing {key}...")
    dest_path = destinations[key]
    
    with open(src_path, 'rb') as f:
        input_data = f.read()
    
    result = remove(input_data)
    
    with open(dest_path, 'wb') as f:
        f.write(result)
    print(f"  ✓ Saved to {dest_path}")

# Copy Step 3
print("Copying Step 3 (v2 -> v3)...")
src_v2 = os.path.join(public_dir, "step3-stretch-throw-v2.png")
dest_v3 = destinations["step3"]
try:
    shutil.copy2(src_v2, dest_v3)
    print(f"  ✓ Copied Step 3 to {dest_v3}")
except FileNotFoundError:
    print(f"  X Could not find Step 3 v2 at {src_v2}")

print("Done!")

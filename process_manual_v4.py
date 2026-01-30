from rembg import remove
import os

# Paths
base_dir = r"c:\Users\user\ergopack-india"
source_dir = os.path.join(base_dir, "usecases")
target_dir = os.path.join(base_dir, "public", "images", "infographic", "steps")

# Ensure output dir exists
os.makedirs(target_dir, exist_ok=True)

# Mapping
image_map = {
    "1st.png": "step1-bend-feed-v4.png",
    "2nd.png": "step2-walk-around-v4.png",
    "3rd.png": "step3-stretch-throw-v4.png",
    "4th.png": "step4-tension-pull-v4.png",
    "5th.png": "step5-crimp-cut-v4.png"
}

print("Starting Manual Steps V4 Processing...")

for src_name, dest_name in image_map.items():
    src_path = os.path.join(source_dir, src_name)
    dest_path = os.path.join(target_dir, dest_name)
    
    print(f"Processing {src_name} -> {dest_name}...")
    
    if not os.path.exists(src_path):
        print(f"ERROR: Source file not found: {src_path}")
        continue
        
    with open(src_path, 'rb') as f:
        input_data = f.read()
    
    # Standard removal (usually good for people + objects)
    result = remove(input_data)
    
    with open(dest_path, 'wb') as f:
        f.write(result)
    print(f"  ✓ Saved to {dest_path}")

print("Done!")

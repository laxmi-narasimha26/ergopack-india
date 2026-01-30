from rembg import remove
import os

# Paths
brain_dir = r"C:\Users\user\.gemini\antigravity\brain\d677d2b9-d5e7-4062-a8f5-af0afee2c27a"
public_dir = r"c:\Users\user\ergopack-india\public\images\infographic\ergopack-steps"

# Ensure output dir exists
os.makedirs(public_dir, exist_ok=True)

# Sources
sources = {
    "step1": os.path.join(brain_dir, "ergopack_step1_position_1769686709308.png"),
    "step2": os.path.join(brain_dir, "ergopack_step2_retrieve_1769686726258.png"),
    "step3": os.path.join(brain_dir, "ergopack_step3_tension_1769686762209.png"),
}

destinations = {
    "step1": os.path.join(public_dir, "step1-position-feed.png"),
    "step2": os.path.join(public_dir, "step2-retrieve-insert.png"),
    "step3": os.path.join(public_dir, "step3-tension-seal.png"),
}

print("Starting ErgoPack background removal...")

for key, src_path in sources.items():
    print(f"Processing {key}...")
    dest_path = destinations[key]
    
    with open(src_path, 'rb') as f:
        input_data = f.read()
    
    result = remove(input_data)
    
    with open(dest_path, 'wb') as f:
        f.write(result)
    print(f"  ✓ Saved to {dest_path}")

print("Done!")

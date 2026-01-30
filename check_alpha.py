from PIL import Image

img = Image.open(r"c:\Users\user\ergopack-india\public\images\infographic\steps\step1-bend-feed.png")
print(f"Mode: {img.mode}")
print(f"Has alpha: {'A' in img.mode}")
print(f"Size: {img.size}")

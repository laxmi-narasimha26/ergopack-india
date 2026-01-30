from PIL import Image

img = Image.open(r"c:\Users\user\ergopack-india\public\images\infographic\steps\step1-bend-feed.png")
pixel = img.getpixel((0, 0))
print(f"Top-left pixel: {pixel}")

from PIL import Image, ImageOps
import os

source_path = r"src/newsletters/eg/Gemini_Generated_Image_i77nldi77nldi77n.png"
output_dir = r"src/newsletters/footers/final_resized"
target_sizes = [
    (1200, 200),
    (600, 150),
    (1000, 300),
    (1200, 400)
]

def resize_contain(image_path, target_width, target_height, save_path):
    with Image.open(image_path) as img:
        # Create a new blank image with the target dimensions
        # Use a background color extrapolated from the edges or white/custom
        
        # Method 1: Get dominant edge color (simple approach: top-left pixel)
        # If the image is transparent, we might need to handle that, but assuming PNG/JPG footer
        if img.mode != 'RGB':
            img = img.convert('RGB')
            
        bg_color = img.getpixel((0, 0))
        
        # Calculate aspect ratios
        img_ratio = img.width / img.height
        target_ratio = target_width / target_height

        if img_ratio > target_ratio:
            # Image is wider than target relative to height -> fit to width
            new_width = target_width
            new_height = int(target_width / img_ratio)
        else:
            # Image is taller than target relative to width -> fit to height
            new_height = target_height
            new_width = int(target_height * img_ratio)
            
        resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Create canvas
        new_img = Image.new('RGB', (target_width, target_height), bg_color)
        
        # Paste centered
        x_offset = (target_width - new_width) // 2
        y_offset = (target_height - new_height) // 2
        
        new_img.paste(resized_img, (x_offset, y_offset))
        
        new_img.save(save_path, quality=95)
        print(f"Saved: {save_path}")

try:
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for w, h in target_sizes:
        filename = f"logimat_footer_{w}x{h}_fit.jpg"
        save_path = os.path.join(output_dir, filename)
        resize_contain(source_path, w, h, save_path)
        
    print("All images resized (fit/pad) successfully.")

except Exception as e:
    print(f"Error: {e}")

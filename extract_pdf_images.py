import fitz  # PyMuPDF
import os
from PIL import Image
import io

# PDFs to extract images from
pdfs_to_extract = [
    ('713X_Technical_Data.pdf', '713x_extracted.png'),
    ('713E_Technical_Data.pdf', '713e_extracted.png'),
    ('745X_Technical_Data.pdf', '745x_extracted.png'),
    ('745E_Technical_Data.pdf', '745e_extracted.png'),
]

pdf_dir = r'c:\Users\user\ergopack-india\public\pdfs'
output_dir = r'c:\Users\user\ergopack-india\public\images\products'

for pdf_name, output_name in pdfs_to_extract:
    pdf_path = os.path.join(pdf_dir, pdf_name)
    
    if not os.path.exists(pdf_path):
        print(f"PDF not found: {pdf_path}")
        continue
    
    print(f"\nProcessing: {pdf_name}")
    
    doc = fitz.open(pdf_path)
    
    # Get images from first page (usually contains the main product image)
    page = doc[0]
    images = page.get_images(full=True)
    
    print(f"  Found {len(images)} images on page 1")
    
    # Find the largest image (likely the main product image)
    largest_image = None
    largest_size = 0
    
    for img_index, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        # Get image size
        pil_image = Image.open(io.BytesIO(image_bytes))
        size = pil_image.width * pil_image.height
        
        print(f"    Image {img_index}: {pil_image.width}x{pil_image.height} ({image_ext})")
        
        if size > largest_size:
            largest_size = size
            largest_image = pil_image
    
    if largest_image:
        # Convert to PNG and save
        output_path = os.path.join(output_dir, output_name)
        
        # Convert to RGBA if needed and save
        if largest_image.mode != 'RGBA':
            largest_image = largest_image.convert('RGBA')
        
        largest_image.save(output_path, 'PNG')
        print(f"  Saved: {output_path}")
    else:
        print(f"  No images found in {pdf_name}")
    
    doc.close()

print("\nDone!")

import fitz  # PyMuPDF
import os
from PIL import Image
import io

# Check all PDFs for unique images
pdf_dir = r'c:\Users\user\ergopack-india\public\pdfs'
output_dir = r'c:\Users\user\ergopack-india\public\images\products'

# List all PDFs
for pdf_file in os.listdir(pdf_dir):
    if not pdf_file.endswith('.pdf'):
        continue
    if 'p&g' in pdf_file.lower():
        continue
        
    pdf_path = os.path.join(pdf_dir, pdf_file)
    
    print(f"\n{'='*50}")
    print(f"PDF: {pdf_file}")
    print(f"{'='*50}")
    
    doc = fitz.open(pdf_path)
    
    for page_num in range(min(2, len(doc))):  # Check first 2 pages
        page = doc[page_num]
        images = page.get_images(full=True)
        
        print(f"\n  Page {page_num + 1}: {len(images)} images")
        
        for img_index, img in enumerate(images):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            
            pil_image = Image.open(io.BytesIO(image_bytes))
            size = pil_image.width * pil_image.height
            
            if size > 100000:  # Only show large images (likely product images)
                print(f"    Image {img_index}: {pil_image.width}x{pil_image.height} - {len(image_bytes)} bytes")
    
    doc.close()

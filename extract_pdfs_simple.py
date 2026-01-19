import os
import PyPDF2
import json

pdf_dir = r"c:\Users\user\ergopack-india\public\pdfs\p&g"
output = {}

for filename in os.listdir(pdf_dir):
    if filename.endswith(".pdf"):
        filepath = os.path.join(pdf_dir, filename)
        try:
            reader = PyPDF2.PdfReader(filepath)
            text = ""
            # Read first 5 pages only to get the gist/intro without being overwhelmed
            for i in range(min(5, len(reader.pages))):
                text += reader.pages[i].extract_text()
            output[filename] = text[:2000] # Limit chars
        except Exception as e:
            output[filename] = str(e)

print(json.dumps(output, indent=2))

import sys
import io
from PyPDF2 import PdfReader

# Set stdout to UTF-8
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def extract_text(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n\n"
        return text
    except Exception as e:
        return f"Error extracting text: {str(e)}"

if __name__ == "__main__":
    # Hardcoded path for testing 700
    pdf_path = r"c:\Users\user\ergopack-india\product-pdfs\technical-datasheets\Technical Datasheet PDF's\700 Technical Data Sheet.pdf"
    print(f"Extracting from: {pdf_path}")
    content = extract_text(pdf_path)
    print("--- START CONTENT ---")
    print(content)
    print("--- END CONTENT ---")

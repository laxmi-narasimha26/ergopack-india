
import openpyxl
import os

file_path = r"c:\Users\user\ergopack-india\Technical Datasheet PDF's\Mobile_Strapping_ROI_Calculator.xlsx"

if not os.path.exists(file_path):
    print(f"File not found: {file_path}")
    exit(1)

wb = openpyxl.load_workbook(file_path, data_only=False)
sheet = wb.active # Assuming the first sheet is the one we want

print(f"Active Sheet: {sheet.title}")

print("-" * 50)
print("CONSTANTS & INPUTS (Guessing based on structure)")
print("-" * 50)

# Iterate through rows and print data
# We'll print key-value pairs if they look like inputs, or just the whole grid to be safe
for row in sheet.iter_rows(values_only=False):
    row_data = []
    for cell in row:
        val = cell.value
        # If it's a formula, print it as such
        if cell.data_type == 'f':
            val = f"FORMULA: {val}"
        row_data.append(str(val) if val is not None else "")
    
    # Filter out empty rows
    if any(row_data):
        print(" | ".join(row_data))

print("-" * 50)
print("DONE")

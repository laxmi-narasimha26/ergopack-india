
import openpyxl
import os

file_path = r"c:\Users\user\ergopack-india\Technical Datasheet PDF's\Mobile_Strapping_ROI_Calculator.xlsx"
wb = openpyxl.load_workbook(file_path, data_only=False)
sheet = wb["ROI Calculator"]

print(f"Analyzing Sheet: {sheet.title}")

# Store all non-empty cells
cells = []
for row in sheet.iter_rows():
    for cell in row:
        if cell.value:
            cells.append((cell.row, cell.column, cell.value))

# Function to find value near a label
def find_near(label_part):
    print(f"\n--- Searching for '{label_part}' ---")
    matches = [c for c in cells if str(c[2]).lower().find(label_part.lower()) != -1]
    for m in matches:
        r, c, val = m
        print(f"Found at ({r}, {c}): {val}")
        # Print neighbors
        neighbors = []
        for n in cells:
            if abs(n[0] - r) <= 2 and abs(n[1] - c) <= 5: # localized grid
                neighbors.append(n)
        
        # Sort by row then col
        neighbors.sort(key=lambda x: (x[0], x[1]))
        
        # Print grid
        current_r = None
        line = ""
        for n in neighbors:
            if n[0] != current_r:
                if line: print(line)
                current_r = n[0]
                line = f"R{current_r}: "
            val_str = str(n[2])
            if str(n[2]).startswith('='):
                 val_str = f"FORMULA[{val_str}]"
            line += f"C{n[1]}[{val_str}]  |  "
        print(line)

keywords = [
    "Machine Price", "Select Machine", "700", "712", "725", "740", # Machine models
    "Number of lines",
    "People per line",
    "Number of shifts",
    "Monthly Cost",
    "Pallet per shift",
    "Minutes to strap",
    "People(Machines Deployed)", # User mentioned exact string
    "ROI Summary",
    "Payback",
    "Savings"
]

for k in keywords:
    find_near(k)

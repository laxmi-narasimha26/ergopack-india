
import openpyxl

file_path = r"c:\Users\user\ergopack-india\Technical Datasheet PDF's\Mobile_Strapping_ROI_Calculator.xlsx"
wb = openpyxl.load_workbook(file_path, data_only=False)
sheet = wb["ROI Calculator"]

print("Reading range C3:H30")
for r in range(3, 31):
    row_vals = []
    for c in range(3, 9): # C is 3, H is 8
        cell = sheet.cell(row=r, column=c)
        val = cell.value
        if cell.data_type == 'f':
            val = f"={val}"
        row_vals.append(str(val) if val is not None else "")
    print(f"Row {r}: " + " | ".join(row_vals))

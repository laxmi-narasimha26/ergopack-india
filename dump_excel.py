
import openpyxl

file_path = r"c:\Users\user\ergopack-india\Technical Datasheet PDF's\Mobile_Strapping_ROI_Calculator.xlsx"
wb = openpyxl.load_workbook(file_path, data_only=False)
sheet = wb["ROI Calculator"]

with open("roi_dump.txt", "w", encoding="utf-8") as f:
    f.write(f"SHEET: {sheet.title}\n")
    
    # 1. Print Data Validations (Dropdowns)
    f.write("\n--- DATA VALIDATIONS ---\n")
    if sheet.data_validations:
        for dv in sheet.data_validations.dataValidation:
            f.write(f"Type: {dv.type}, Formula: {dv.formula1}, Ranges: {dv.sqref}\n")

    # 2. Print All Cells
    f.write("\n--- CELLS ---\n")
    for r in range(1, 50): # First 50 rows
        row_str = f"R{r}: "
        has_data = False
        for c in range(1, 15): # Columns A to N
            cell = sheet.cell(row=r, column=c)
            val = cell.value
            if val is not None:
                has_data = True
                if cell.data_type == 'f':
                    val = f"FORMULA[{val}]"
                row_str += f"C{c}({val}) | "
            else:
                row_str += " | "
        if has_data:
            f.write(row_str + "\n")

print("Dumped to roi_dump.txt")

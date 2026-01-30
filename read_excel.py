import pandas as pd
import os

# Get the Excel file path
excel_path = os.path.join("Technical Datasheet PDF's", "Mobile_Strapping_ROI_Calculator.xlsx")

# Read Excel file
df = pd.read_excel(excel_path, sheet_name='ROI Calculator', header=None)

# Create output
output = []
output.append("=" * 100)
output.append("EXCEL ROI CALCULATOR - FULL ANALYSIS")
output.append("=" * 100)

for idx, row in df.iterrows():
    row_vals = []
    for col_idx, val in enumerate(row.values):
        if pd.notna(val):
            row_vals.append(f"Col{col_idx}:{val}")
    if row_vals:
        output.append(f"Row {idx}: {row_vals}")

# Write to file
with open('excel_full_analysis.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print("Analysis written to excel_full_analysis.md")

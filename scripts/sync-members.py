import zipfile
import xml.etree.ElementTree as ET
import json
import os

# Base paths
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
XLSX_PATH = os.path.join(BASE_DIR, 'public', 'GDG-Core Member Profile.xlsx')
OUTPUT_JSON_PATH = os.path.join(BASE_DIR, 'src', 'data', 'teamMembers.json')

if not os.path.exists(XLSX_PATH):
    print(f"Error: Excel file not found at {XLSX_PATH}")
    exit(1)

with zipfile.ZipFile(XLSX_PATH, 'r') as z:
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            text_parts = [t.text for t in si.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text]
            shared_strings.append("".join(text_parts))

    sheet_xml = z.read('xl/worksheets/sheet1.xml')
    tree = ET.fromstring(sheet_xml)
    ns = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
    
    rows = tree.findall(f'.//{ns}row')
    sheet_data = []
    for row in rows:
        row_vals = {}
        for c in row.findall(f'{ns}c'):
            r_attr = c.attrib.get('r', '')
            col_letter = "".join([ch for ch in r_attr if ch.isalpha()])
            t_attr = c.attrib.get('t', '')
            v = c.find(f'{ns}v')
            val = None
            if v is not None and v.text is not None:
                if t_attr == 's':
                    val = shared_strings[int(v.text)]
                else:
                    val = v.text
            elif c.find(f'{ns}is/{ns}t') is not None:
                val = c.find(f'{ns}is/{ns}t').text
            row_vals[col_letter] = val
        sheet_data.append(row_vals)

members = []
for idx, r in enumerate(sheet_data[1:], start=1):
    raw_name = (r.get('A') or '').strip()
    if raw_name.startswith('PriyankaPriyanka'):
        raw_name = raw_name.replace('PriyankaPriyanka', 'Priyanka')

    raw_github = (r.get('B') or '').strip()
    raw_linkedin = (r.get('C') or '').strip()
    raw_image = (r.get('D') or '').strip()
    raw_role = (r.get('E') or '').strip()

    academic_year = None
    role_lower = raw_role.lower()
    if 'final year' in role_lower and 'pre' not in role_lower:
        academic_year = 'Final Year'
    elif 'pre-final' in role_lower or 'pre final' in role_lower:
        academic_year = 'Pre-Final Year'

    members.append({
        'id': idx,
        'name': raw_name,
        'github': raw_github,
        'linkedin': raw_linkedin,
        'image': raw_image,
        'role': raw_role,
        'academicYear': academic_year
    })

os.makedirs(os.path.dirname(OUTPUT_JSON_PATH), exist_ok=True)
with open(OUTPUT_JSON_PATH, 'w', encoding='utf-8') as f:
    json.dump(members, f, indent=2, ensure_ascii=False)

print(f"Synced {len(members)} team members from Excel to {OUTPUT_JSON_PATH}")

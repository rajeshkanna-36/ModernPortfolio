import json

def extract_text(node, depth=0):
    if not isinstance(node, dict): return []
    lines = []
    indent = "  " * depth
    
    if node.get('type') == 'TEXT':
        text = node.get('text', '').replace('\n', ' ')
        lines.append(f"{indent}- Text: \"{text}\"")
    elif 'name' in node:
        name = node['name']
        if not any(x in name for x in ['Margin', 'Container', 'Background', 'Frame']):
            lines.append(f"{indent}- Section: {name}")
            
    for child in node.get('children', []):
        lines.extend(extract_text(child, depth + 1))
        
    return lines

try:
    with open('figma_simple.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    md_lines = extract_text(data)
    with open('figma_text_summary.md', 'w', encoding='utf-8') as f:
        f.write('\n'.join(md_lines))
    print("Summarized text in figma_text_summary.md")
except Exception as e:
    print("Error:", e)

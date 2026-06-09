import urllib.request, json

def simplify_node(node, depth=0):
    if depth > 10:
        return "..."
    simple = {
        'type': node.get('type'),
        'name': node.get('name')
    }
    if 'characters' in node:
        simple['text'] = node['characters']
    children = node.get('children', [])
    if children:
        simple['children'] = [simplify_node(c, depth + 1) for c in children]
    return simple

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
    req = urllib.request.Request('https://api.figma.com/v1/files/ue2IjVA0KR5KN3PFpbHBkM/nodes?ids=72:31', headers={'X-Figma-Token': 'YOUR_FIGMA_TOKEN_HERE'})
    res = urllib.request.urlopen(req)
    data = json.loads(res.read())
    nodes = data.get('nodes', {})
    root_node = nodes.get('72:31', {}).get('document', {})
    
    simple_tree = simplify_node(root_node)
    md_lines = extract_text(simple_tree)
    
    with open('figma_casestudy_summary.md', 'w', encoding='utf-8') as f:
        f.write('\n'.join(md_lines))
    print("Summarized case study in figma_casestudy_summary.md")
except Exception as e:
    print("Error:", e)

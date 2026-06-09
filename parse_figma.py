import json

def rgb_to_hex(r, g, b, a=1):
    def to_hex(c):
        return f"{int(c * 255):02X}"
    hex_str = f"#{to_hex(r)}{to_hex(g)}{to_hex(b)}"
    if a < 1:
        hex_str += to_hex(a)
    return hex_str

def get_color(fills):
    if not fills: return None
    colors = []
    for f in fills:
        if f.get('type') == 'SOLID':
            color = f.get('color', {})
            opacity = f.get('opacity', 1)
            colors.append(rgb_to_hex(color.get('r', 0), color.get('g', 0), color.get('b', 0), opacity))
    return colors

def simplify_node(node, depth=0):
    if depth > 10:
        return "..."
    simple = {
        'type': node.get('type'),
        'name': node.get('name')
    }
    
    # Text content
    if 'characters' in node:
        simple['text'] = node['characters']
        if 'style' in node:
            st = node['style']
            simple['font'] = st.get('fontFamily')
            simple['fontSize'] = st.get('fontSize')
            simple['fontWeight'] = st.get('fontWeight')
    
    # Colors
    fills = get_color(node.get('fills', []))
    if fills:
        simple['fills'] = fills
        
    strokes = get_color(node.get('strokes', []))
    if strokes:
        simple['strokes'] = strokes
        
    # Layout
    if 'absoluteBoundingBox' in node:
        box = node['absoluteBoundingBox']
        simple['w'] = box.get('width')
        simple['h'] = box.get('height')
        
    if node.get('layoutMode'):
        simple['layout'] = node.get('layoutMode')
        simple['padding'] = [
            node.get('paddingTop', 0),
            node.get('paddingRight', 0),
            node.get('paddingBottom', 0),
            node.get('paddingLeft', 0)
        ]
        simple['gap'] = node.get('itemSpacing', 0)
        
    children = node.get('children', [])
    if children:
        simple['children'] = [simplify_node(c, depth + 1) for c in children]
        
    return simple

try:
    with open('figma_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    nodes = data.get('nodes', {})
    node_id = '0:1'
    if node_id in nodes:
        root_node = nodes[node_id].get('document', {})
        simple_tree = simplify_node(root_node)
        with open('figma_simple.json', 'w', encoding='utf-8') as out:
            json.dump(simple_tree, out, indent=2)
        print("Successfully extracted simple tree to figma_simple.json")
    else:
        print(f"Node {node_id} not found in nodes. Available nodes: {list(nodes.keys())}")
except Exception as e:
    print("Error:", str(e))

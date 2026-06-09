import urllib.request, json
req = urllib.request.Request('https://api.figma.com/v1/files/ue2IjVA0KR5KN3PFpbHBkM?depth=2', headers={'X-Figma-Token': 'YOUR_FIGMA_TOKEN_HERE'})
res = urllib.request.urlopen(req)
data = json.loads(res.read())
doc = data.get('document', {})
for page in doc.get('children', []):
    print(f"Page: {page.get('name')} (id: {page.get('id')})")
    for frame in page.get('children', []):
        print(f"  - Frame: {frame.get('name')} (id: {frame.get('id')})")

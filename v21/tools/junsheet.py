# before/after sheet of Juniper-on-the-right story crops: python3 junsheet.py W -> v21/qc/junmirror_<W>.jpg
import sys, os, glob
from PIL import Image, ImageDraw, ImageFont
W = sys.argv[1]; D = '/workspace/wt21/v21/qc/junmirror/'
names = sorted(os.path.basename(f)[len('after_'):] for f in glob.glob(D + f'after_{W}_*.png'))
names = [n for n in names if os.path.exists(D + 'before_' + n)] or names
import json
BM = {h[4][len('before_'):]: h[3].startswith('matrix(-') for h in json.load(open(D + f'before_{W}.json'))} if os.path.exists(D + f'before_{W}.json') else {}
th = 420; F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 22)
rows = []
for n in names:
    ims = [Image.open(D + p + n).convert('RGB') for p in ('before_', 'after_') if os.path.exists(D + p + n)]
    ims = [i.resize((int(i.width * th / i.height), th)) for i in ims]
    r = Image.new('RGB', (sum(i.width for i in ims) + 30 * len(ims) + 10, th + 40), 'white'); x = 10; d = ImageDraw.Draw(r)
    for lab, i in zip([('BEFORE: MIRRORED' if BM.get(n) else 'BEFORE: ok (mid-bounce)'), 'AFTER'] if len(ims) == 2 else ['AFTER'], ims):
        r.paste(i, (x, 36)); d.text((x, 6), f"{lab}  {n[:-4]}", fill='red' if 'MIRRORED' in lab else 'green', font=F); x += i.width + 30
    rows.append(r)
cols = 2; cw = max(r.width for r in rows); rh = rows[0].height
S = Image.new('RGB', (cw * cols, rh * ((len(rows) + cols - 1) // cols)), 'white')
for k, r in enumerate(rows): S.paste(r, ((k % cols) * cw, (k // cols) * rh))
S.save(f'/workspace/wt21/v21/qc/junmirror_{W}.jpg', quality=85); print(S.size, len(rows))

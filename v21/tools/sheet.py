# contact sheets: python3 sheet.py W cols scale per -> v21/qc/sheet_<W>_<n>.png
import sys, glob, os
from PIL import Image, ImageDraw
W, cols, sc, per = sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), int(sys.argv[4])
fs = sorted(glob.glob(f'/workspace/wt21/v21/qc/raw/{W}_*.png'))
for k in range(0, len(fs), per):
    ims = [Image.open(f).convert('RGB') for f in fs[k:k + per]]; w, h = int(ims[0].width * sc), int(ims[0].height * sc)
    rows = (len(ims) + cols - 1) // cols; S = Image.new('RGB', (cols * (w + 6), rows * (h + 26)), 'white'); d = ImageDraw.Draw(S)
    for i, (im, f) in enumerate(zip(ims, fs[k:k + per])):
        x, y = (i % cols) * (w + 6), (i // cols) * (h + 26); S.paste(im.resize((w, h)), (x, y + 22)); d.text((x + 4, y + 4), os.path.basename(f)[:-4], fill='black')
    S.save(f'/workspace/wt21/v21/qc/sheet_{W}_{k // per:02d}.jpg', quality=82); print(f'sheet_{W}_{k // per:02d}', [os.path.basename(f) for f in fs[k:k + per]])

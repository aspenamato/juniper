# story frame sheets: python3 storysheet.py W cols scale per -> v21/qc/stories_<W>_<n>.jpg
import glob, os, sys
from PIL import Image, ImageDraw
W, C, sc, per = sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), int(sys.argv[4])
fs = sorted(glob.glob(f'/workspace/wt21/v21/qc/stories/{W}_*.png'))
for k in range(0, len(fs), per):
    ims = fs[k:k + per]; i0 = Image.open(ims[0]); w, h = int(i0.width * sc), int(i0.height * sc); R = (len(ims) + C - 1) // C
    S = Image.new('RGB', (C * (w + 6), R * (h + 22)), 'white'); d = ImageDraw.Draw(S)
    for i, f in enumerate(ims):
        x, y = (i % C) * (w + 6), (i // C) * (h + 22); S.paste(Image.open(f).convert('RGB').resize((w, h)), (x, y + 20)); d.text((x + 4, y + 4), os.path.basename(f), fill='black')
    S.save(f'/workspace/wt21/v21/qc/stories_{W}_{k // per:02d}.jpg', quality=84); print(k // per, os.path.basename(ims[0]), len(ims))

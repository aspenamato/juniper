# Skating World wearables for Aspen: exact-fit colour variants of her QC'd skating items (same pixels/alpha, new colours),
# so every dress-up layer and all 8 spin views fit exactly like the originals. Writes art/wear, art/wear18, art/spin files
# and v21/wear_variants.json (spin entries) for skate21.js.
import json, hashlib, os, shutil, numpy as np
from PIL import Image
R = '/workspace/wt21/art/'
WEAR17 = {'a_scarf', 'a_skates', 'a_strophy'}
V = {  # new id: (base id, mode, name, boss)
  'a_pscarf': ('a_scarf', 'pink', 'Pink Snowflake Scarf', 'skate:1'),
  'a_rmedal': ('a_smedal', 'rainbowR', 'Rainbow Star Medal', 'skate:4'),
  'a_xmedal': ('a_smedal', 'silver', 'Silver Snowflake Medal', 'skate:6'),
  'a_ascarf': ('a_scarf', 'aurora', 'Aurora Scarf', 'skate:8'),
  'a_atiara': ('a_tiara', 'tiara', 'Aurora Ice Tiara', 'skate:11')}
def hsv(rgb):
    r, g, b = [rgb[..., i] for i in range(3)]; mx = rgb.max(-1); mn = rgb.min(-1); d = mx - mn + 1e-6
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    s = np.where(mx > 0, (mx - mn) / (mx + 1e-6), 0); return h, s, mx
def rgbof(h, s, v):
    c = v * s; x = c * (1 - np.abs((h / 60) % 2 - 1)); m = v - c; z = np.zeros_like(h); k = (h // 60).astype(int) % 6
    r = np.select([k == 0, k == 1, k == 2, k == 3, k == 4, k == 5], [c, x, z, z, x, c]); g = np.select([k == 0, k == 1, k == 2, k == 3, k == 4, k == 5], [x, c, c, x, z, z]); b = np.select([k == 0, k == 1, k == 2, k == 3, k == 4, k == 5], [z, z, x, c, c, x])
    return np.stack([r + m, g + m, b + m], -1)
def recolor(im, mode):
    a = np.asarray(im.convert('RGBA')).astype(np.float32) / 255; rgb = a[..., :3]; h, s, v = hsv(rgb)
    H, W = h.shape; yy, xx = np.mgrid[0:H, 0:W]; ys, xs = np.nonzero(a[..., 3] > 0.1)
    x0, x1 = (xs.min(), xs.max()) if len(xs) else (0, W); fx = np.clip((xx - x0) / max(1, x1 - x0), 0, 1)
    blue = (h > 165) & (h < 255) & (s > 0.12)
    if mode == 'pink': nh = np.full_like(h, 328); ns = np.clip(s * 1.05, 0, 1); m = blue
    elif mode == 'aurora': nh = 175 + fx * 120; ns = np.clip(s * 1.25, 0, 1); m = blue
    elif mode == 'tiara': nh = 185 + fx * 140; m = (h > 165) & (h < 255) & (s > 0.09); ns = np.clip(s * 2.2 + 0.12, 0, 1)
    elif mode == 'rainbowR':
        y0, y1 = (ys.min(), ys.max()) if len(ys) else (0, H); fy = (yy - y0) / max(1, y1 - y0); nh = (fx * 300) % 360; ns = np.clip(s * 1.35 + 0.08, 0, 1); m = (blue | (((h > 290) | (h < 25)) & (s > 0.15))) & (fy < 0.5)
    elif mode == 'rainbow': nh = (330 + fx * 300) % 360; ns = np.clip(s * 1.35 + 0.08, 0, 1); m = blue
    elif mode == 'silver':
        gold = (h > 18) & (h < 62) & (s > 0.2); nh = np.full_like(h, 215); ns = s * 0.1; m = gold; v = np.clip(v * 1.08 + 0.04, 0, 1)
    out = rgb.copy(); new = rgbof(np.where(m, nh, h), np.where(m, ns, s), v); out[m] = new[m]
    o = np.concatenate([out, a[..., 3:]], -1); return Image.fromarray((o * 255).round().astype(np.uint8), 'RGBA')
def save(im, p): im.save(p, 'WEBP', quality=92, method=6)
s = open('/workspace/sk21/src/spin19_data.js').read(); D = json.loads(s[s.index('{'):s.rindex('}') + 1])
spin = {}
for vid, (b, mode, nm, boss) in V.items():
    save(recolor(Image.open(R + f'wear/{b}{"_v17" if b in WEAR17 else ""}.webp'), mode), R + f'wear/{vid}.webp')
    save(recolor(Image.open(R + f'wear18/asp__{b}.webp'), mode), R + f'wear18/asp__{vid}.webp')
    for ang, A in D['a']['ang'].items():
        e = A['i'].get(b)
        if not e: continue
        im = recolor(Image.open(R + 'spin/' + e['f']), mode); tmp = '/tmp/_v.webp'; save(im, tmp)
        hh = hashlib.md5(open(tmp, 'rb').read()).hexdigest()[:10]; fn = f'a_{ang}__{vid}.{hh}.webp'; shutil.move(tmp, R + 'spin/' + fn)
        spin.setdefault(vid, {})[ang] = dict(e, f=fn)
json.dump({'items': {k: list(v) for k, v in V.items()}, 'spin': spin}, open('/workspace/wt21/v21/wear_variants.json', 'w'), indent=0)
print({k: len(v) for k, v in spin.items()})

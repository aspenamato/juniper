# t106u: cut a 4x2 sticker sheet into die-cut stickers (rembg alpha per cell + fresh white border), and make cast stickers from cutouts
import sys, numpy as np, cv2, os
from PIL import Image, ImageFilter
from scipy import ndimage as ndi
from rembg import new_session, remove
OUT='/workspace/wt21/art/stickers/'; SES=new_session('isnet-general-use')
def border(rgba, px=9, H=260):
    a=np.array(rgba)[...,3]; pad=px+6
    im=Image.new('RGBA',(rgba.width+2*pad,rgba.height+2*pad),(0,0,0,0)); im.alpha_composite(rgba,(pad,pad)); A=np.array(im)[...,3]
    m=(A>110).astype(np.uint8); k=cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*px+1,2*px+1)); d=cv2.dilate(m,k)
    d=ndi.binary_fill_holes(d).astype(np.uint8); d=cv2.GaussianBlur(d.astype(np.float32),(3,3),0)
    base=np.zeros((im.height,im.width,4),np.uint8); base[...,:3]=255; base[...,3]=(d*255).clip(0,255).astype(np.uint8)
    out=Image.fromarray(base); out.alpha_composite(im)
    bb=out.getbbox(); out=out.crop(bb); s=H/max(out.width,out.height); return out.resize((max(1,round(out.width*s)),max(1,round(out.height*s))),Image.LANCZOS)
def sheet(path, ids, cols=4, rows=2):
    src=Image.open(path).convert('RGB'); W,H=src.size
    for k,i in enumerate(ids):
        if i=='skip': continue
        r,c=divmod(k,cols); cell=src.crop((c*W//cols,r*H//rows,(c+1)*W//cols,(r+1)*H//rows))
        a=np.array(remove(cell,session=SES))[...,3]; m=a>128; l,n=ndi.label(m)
        if n>1: sz=ndi.sum(m,l,range(1,n+1)); keepl=[j+1 for j,s in enumerate(sz) if s>0.04*sz.max()]; a=np.where(np.isin(l,keepl)|( (a>10)&ndi.binary_dilation(np.isin(l,keepl),iterations=4)),a,0)
        rgba=Image.fromarray(np.dstack([np.array(cell),a.astype(np.uint8)])); rgba=rgba.crop(rgba.getbbox())
        border(rgba,px=7).save(OUT+i+'.webp',quality=92); print(i)
def cast(char, sid):
    im=Image.open('/workspace/wt21/art/chars/'+char+'.webp').convert('RGBA'); border(im,px=10).save(OUT+sid+'.webp',quality=92); print(sid)
if __name__=='__main__':
    if sys.argv[1]=='sheet': sheet(sys.argv[2], sys.argv[3].split(','))
    else:
        for pair in sys.argv[2:]: c,s=pair.split('='); cast(c,s)

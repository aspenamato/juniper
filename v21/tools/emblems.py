# t106u: rink emblems (round badges cut from each rink's map painting, gold ring) -> art/emblems/sk_<rink>.webp
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
K='dobson vvillage rock wollman bryant sharks dtice louise rideau somerset zermatt tahoe'.split()
S=240; SS=4; R=S*SS
def ring():
    y,x=np.mgrid[0:R,0:R]; cx=cy=R/2; d=np.hypot(x-cx,y-cy); ang=np.arctan2(y-cy,x-cx)
    t=(np.sin(ang*1.0-0.8)+1)/2
    g1=np.array([255,236,150]); g2=np.array([214,140,20]); col=(g1*t[...,None]+g2*(1-t[...,None]))
    a=((d<R/2-2)&(d>R/2-R*0.085)).astype(np.uint8)*255
    inner=((d<=R/2-R*0.085)&(d>R/2-R*0.105)).astype(np.uint8)*255
    img=np.zeros((R,R,4),np.uint8); img[...,:3]=col.astype(np.uint8); img[...,3]=a
    wi=np.zeros((R,R,4),np.uint8); wi[...,:3]=255; wi[...,3]=inner
    return Image.fromarray(img), Image.fromarray(wi)
rg,wi=ring()
for k in K:
    m=Image.open(f'art/map/skate_{k}.webp').convert('RGB'); w,h=m.size; s=min(w,h)
    c=m.crop(((w-s)//2,int(h*0.18),(w-s)//2+s,int(h*0.18)+s)).resize((R,R),Image.LANCZOS)
    mask=Image.new('L',(R,R),0); ImageDraw.Draw(mask).ellipse((R*0.08,R*0.08,R*0.92,R*0.92),fill=255)
    out=Image.new('RGBA',(R,R),(0,0,0,0)); out.paste(c,(0,0),mask)
    gl=Image.new('RGBA',(R,R),(0,0,0,0)); ImageDraw.Draw(gl).ellipse((R*0.16,R*0.1,R*0.84,R*0.46),fill=(255,255,255,46)); out.alpha_composite(gl)
    out.alpha_composite(wi); out.alpha_composite(rg)
    d=ImageDraw.Draw(out); import math
    def star(cx,cy,r,fill):
        pts=[(cx+(r if i%2==0 else r*0.45)*math.sin(i*math.pi/5),cy-(r if i%2==0 else r*0.45)*math.cos(i*math.pi/5)) for i in range(10)]; d.polygon(pts,fill=fill,outline=(150,90,0),width=SS*2)
    star(R/2,R*0.06+R*0.02,R*0.075,(255,224,90))
    out.resize((S,S),Image.LANCZOS).save(f'art/emblems/sk_{k}.webp',quality=92)
print('ok')

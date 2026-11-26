# remove the white halo on cut-outs: shrink alpha 1px and un-mix white from semi-transparent edge pixels
import sys, numpy as np, cv2
from PIL import Image
for f in sys.argv[1:]:
    a=np.array(Image.open(f).convert('RGBA')).astype(np.float32)
    al=a[...,3]/255; al=cv2.erode(al,np.ones((3,3),np.uint8),iterations=1); al=cv2.GaussianBlur(al,(3,3),0)
    rgb=a[...,:3]; e=(al>0.02)&(al<0.98); A=np.maximum(al,0.05)[...,None]
    un=np.clip((rgb-(1-A)*255)/A,0,255); rgb=np.where(e[...,None],un,rgb)
    # pull edge colour toward the nearest solid interior colour so no light rim stays
    solid=(al>0.97).astype(np.uint8); blur=cv2.blur(rgb*solid[...,None],(7,7)); cnt=cv2.blur(solid.astype(np.float32),(7,7))[...,None]
    near=np.where(cnt>0.05,blur/np.maximum(cnt,1e-3),rgb); rgb=np.where(e[...,None],0.5*rgb+0.5*near,rgb)
    out=np.dstack([rgb,al*255]).clip(0,255).astype(np.uint8); Image.fromarray(out).save(f,quality=88)
print('ok',len(sys.argv)-1)

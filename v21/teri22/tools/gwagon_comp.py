# Composite only the new Teri (driver) from the regenerated G-wagon onto the original
# cutout, so GiGi, the fox, Juniper, car and trail stay pixel-identical.
import cv2, numpy as np, sys
from PIL import Image
D='/workspace/wt21/v21/teri22/'
orig=np.array(Image.open(D+'before/gwagon_idle.webp').convert('RGBA'))
ref=cv2.cvtColor(np.array(Image.open(D+'ref/gwagon_idle.png').convert('RGB')),cv2.COLOR_RGB2BGR)
gen=cv2.imread(D+'gen/gwagon_idle.jpg')
# register gen -> ref on regions excluding the driver (car body etc)
o=cv2.ORB_create(6000)
m1=np.full(ref.shape[:2],255,np.uint8); m1[:130,140:300]=0
k1,d1=o.detectAndCompute(cv2.cvtColor(ref,cv2.COLOR_BGR2GRAY),m1)
k2,d2=o.detectAndCompute(cv2.cvtColor(gen,cv2.COLOR_BGR2GRAY),None)
bf=cv2.BFMatcher(cv2.NORM_HAMMING,crossCheck=True)
ms=sorted(bf.match(d2,d1),key=lambda m:m.distance)[:800]
src=np.float32([k2[m.queryIdx].pt for m in ms]); dst=np.float32([k1[m.trainIdx].pt for m in ms])
M,inl=cv2.estimateAffinePartial2D(src,dst,ransacReprojThreshold=3)
print('affine',M.round(3).tolist(),'inliers',int(inl.sum()))
H,W=ref.shape[:2]
wg=cv2.warpAffine(gen,M,(W,H),flags=cv2.INTER_LANCZOS4,borderValue=(255,255,255))
cv2.imwrite('/tmp/gw_warp.png',wg)
# mask: driver region polygon (window left side), feathered
x0,y0,x1,y1=[int(v) for v in sys.argv[1:5]] if len(sys.argv)>4 else (150,8,292,122)
mask=np.zeros((H,W),np.float32); mask[y0:y1,x0:x1]=1
mask=cv2.GaussianBlur(mask,(0,0),3)
out=orig.copy().astype(np.float32)
wgr=cv2.cvtColor(wg,cv2.COLOR_BGR2RGB).astype(np.float32)
for c in range(3): out[...,c]=out[...,c]*(1-mask)+wgr[...,c]*mask
# alpha: keep original alpha except where glow stick extends above roof -> use whiteness of warped gen
wa=(255-wgr.min(axis=2)); wa=np.clip(wa*3,0,255)
# inside the mask, alpha comes from the generated image (white bg -> transparent); un-blend white from colors
a=wa/255.0
for c in range(3):
    dec=np.where(a>0.02,(wgr[...,c]-255*(1-a))/np.maximum(a,0.02),wgr[...,c])
    out[...,c]=orig[...,c]*(1-mask)+np.clip(dec,0,255)*mask
# solid where the original car was solid and gen is not white; fill enclosed holes (glow-stick white core)
wa=np.where((orig[...,3]>200)&(wa>60),255,wa)
cl=cv2.morphologyEx(wa.astype(np.uint8),cv2.MORPH_CLOSE,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(7,7))).astype(np.float32)
cl[62:,:]=wa[62:,:]
filled=(cl>wa+30)
wa=np.maximum(wa,cl)
for c in range(3): out[...,c]=np.where(filled&(mask>0.5),wgr[...,c],out[...,c])
b=(wa>40).astype(np.uint8); ff=b.copy(); fm=np.zeros((H+2,W+2),np.uint8); cv2.floodFill(ff,fm,(0,0),2)
hole=(ff==0)
wa=np.where(hole,255,wa)
for c in range(3): out[...,c]=np.where(hole&(mask>0.5),wgr[...,c],out[...,c])
out[...,3]=orig[...,3]*(1-mask)+wa*mask
Image.fromarray(out.clip(0,255).astype(np.uint8)).save('/tmp/gw_comp.png')
Image.fromarray(out.clip(0,255).astype(np.uint8)).save(D+'gen/gwagon_comp.webp',quality=92)

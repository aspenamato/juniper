# cut N poses using rembg alpha only (for pale characters on white, e.g. the Fog Phantom)
import sys, numpy as np, cv2, os
from PIL import Image
from scipy import ndimage as ndi
from rembg import new_session, remove
G='/workspace/wt21/v21/gen/cast/'; OUT=os.environ.get('OUT','/workspace/wt21/art/chars/'); name=sys.argv[1]; poses=sys.argv[2].split(','); PFX=os.environ.get('PFX','')
src=Image.open(G+name+'.jpg').convert('RGB'); im=np.array(src)
a=np.array(remove(src,session=new_session('isnet-general-use')))[...,3].astype(np.float32)/255
m=a>0.5; l,n=ndi.label(m); sz=ndi.sum(m,l,range(1,n+1)); keep=[i+1 for i,s in enumerate(sz) if s>300]
big=sorted(keep,key=lambda i:-sz[i-1])[:len(poses)]; cents=sorted([np.where((l==b).any(0))[0].mean() for b in big])
asg={k:int(np.argmin([abs(np.where((l==k).any(0))[0].mean()-c) for c in cents])) for k in keep}
for pi,p in enumerate(poses):
    mm=ndi.binary_dilation(np.isin(l,[k for k,v in asg.items() if v==pi]),iterations=3); al=np.where(mm,a,0)
    ys,xs=np.where(al>0.02); y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max()
    Image.fromarray(np.dstack([im,(al*255).astype(np.uint8)])[max(0,y0-6):y1+9,max(0,x0-6):x1+7]).save(OUT+f'{PFX}{name}_{p}.webp',quality=90)
print(name,'ok')

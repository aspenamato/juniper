# cut a 3-pose winter sheet on white into transparent trimmed poses -> art/chars/w<name>_<pose>.webp
# usage: python3 cut3.py name pose1,pose2,pose3   (pose 'skip' drops that figure)
import sys, numpy as np, cv2
from PIL import Image
from scipy import ndimage as ndi
import os; PFX=os.environ.get('PFX','w')
G='/workspace/wt21/v21/gen/cast/'; OUT='/workspace/wt21/art/chars/'
def cut(name, poses, tol=int(sys.argv[3]) if len(sys.argv)>3 else 12):
    im=np.array(Image.open(G+name+'.jpg').convert('RGB')).astype(np.int16); h,w,_=im.shape
    d=(255-im).max(2)
    near=d<=tol
    lab,_=ndi.label(near); border=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
    fg=~np.isin(lab,list(border))
    fg=ndi.binary_opening(fg,iterations=1); fg=ndi.binary_fill_holes(fg)
    l2,n=ndi.label(fg); sz=ndi.sum(fg,l2,range(1,n+1)); keep=[i+1 for i,s in enumerate(sz) if s>300]
    # 3 figure centers from the biggest components' column mass
    cols=fg.sum(0).astype(float); third=w/3
    cents=[]
    big=sorted(keep,key=lambda i:-sz[i-1])[:len(poses)]
    for b in big: xs=np.where((l2==b).any(0))[0]; cents.append((xs[0]+xs[-1])/2)
    cents=sorted(cents)
    assign={k:int(np.argmin([abs(((np.where((l2==k).any(0))[0]).mean())-c) for c in cents])) for k in keep}
    from rembg import new_session, remove
    RB=np.array(remove(Image.open(G+name+'.jpg').convert('RGB'),session=new_session('isnet-general-use')))[...,3].astype(np.float32)/255
    soft=np.clip((d.astype(np.float32)-2)/14,0,1)  # anti-aliased edge alpha from distance to white
    res=[]
    for pi,p in enumerate(poses):
        if p=='skip': continue
        m=np.isin(l2,[k for k,v in assign.items() if v==pi])
        # drop soft grey ground shadows: low-chroma light pixels in the bottom 22% of the figure
        ys_,xs_=np.where(m); fy0,fy1=ys_.min(),ys_.max(); yb=int(fy1-0.22*(fy1-fy0))
        shad=(RB<0.5)&(d<70); shad[:yb]=False   # rembg says background and pixel is light -> ground shadow
        m=m&~shad; m=ndi.binary_opening(m,iterations=1)
        l3,n3=ndi.label(m)
        if n3>1:
            s3=ndi.sum(m,l3,range(1,n3+1)); m=np.isin(l3,[i+1 for i,v in enumerate(s3) if v>max(400,0.004*s3.max())])
        md=ndi.binary_dilation(m,iterations=2)
        a=np.where(m,1.0,np.where(md,soft,0.0)); a=cv2.GaussianBlur(a.astype(np.float32),(3,3),0)
        ys,xs=np.where(a>0.02); y0,y1,x0,x1=ys.min(),ys.max(),xs.min(),xs.max()
        rgba=np.dstack([im.astype(np.uint8),(a*255).astype(np.uint8)])[max(0,y0-6):y1+9,max(0,x0-6):x1+7]
        Image.fromarray(rgba).save(OUT+f'{PFX}{name}_{p}.webp',quality=90); res.append((p,rgba.shape[1],rgba.shape[0]))
    print(name,res)
cut(sys.argv[1], sys.argv[2].split(','))

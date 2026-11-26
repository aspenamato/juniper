# before/after sheet for the t112u Teri redesign: assets (before row / after row) + in-app crops at 1180x820 and 390x844
from PIL import Image, ImageDraw, ImageFont
D='/workspace/wt21/v21/teri22/'; A=['teri_wave','teri_point','wteri_wave','wteri_cheer','wteri_idle','c_teri','sk_cteri','gwagon_idle']
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
def load(p,h,bg=(236,240,250)):
    i=Image.open(p).convert('RGBA'); i=i.resize((max(1,int(i.width*h/i.height)),h),Image.LANCZOS); c=Image.new('RGB',i.size,bg); c.paste(i,(0,0),i); return c
rows=[]
for lab,src in [('BEFORE',D+'before/'),('AFTER',D+'new/')]:
    ims=[load(src+a+'.webp',420) for a in A]; rows.append((lab,ims))
apps=[load(D+'qc/'+f,420) for f in ['1180_story_trip0_0.png','1180_story_skate0_1.png','1180_passport_p3.png','390_story_skate0_1.png','390_story_trip0_0.png','390_hub_skate.png']]
W=max(sum(i.width+16 for i in r[1]) for r in rows+[('APP',apps)])+160
H=3*(420+50)+20; S=Image.new('RGB',(W,H),(255,255,255)); d=ImageDraw.Draw(S); y=10
for lab,ims in rows+[('IN APP (new)',apps)]:
    d.text((10,y+180),lab,fill=(60,30,90),font=F); x=160
    for i in ims: S.paste(i,(x,y)); x+=i.width+16
    y+=470
S.save(D+'../qc/teri22_before_after.jpg',quality=88); print(S.size)

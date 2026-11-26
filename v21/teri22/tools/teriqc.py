# t112u Teri QC: open every screen Teri appears on, full screenshot + large crops of every Teri/G-wagon image.
# python3 teriqc.py W H [URL]
import sys, json
from playwright.sync_api import sync_playwright
W,H=int(sys.argv[1]),int(sys.argv[2]); U=sys.argv[3] if len(sys.argv)>3 else 'http://127.0.0.1:8822/learn/'
O='/workspace/wt21/v21/teri22/qc/'; errs=[]; found={}
FIND="""(()=>{const out=[];document.querySelectorAll('img,image').forEach(e=>{const s=e.getAttribute('src')||e.getAttribute('href')||'';const m=/(teri_wave|teri_point|wteri_\\w+|c_teri|sk_cteri|gwagon_idle)\\.webp/.exec(s);if(!m)return;const r=e.getBoundingClientRect();const vis=r.width>4&&r.height>4&&r.bottom>0&&r.right>0&&r.top<innerHeight&&r.left<innerWidth;let p=e,hid=false;while(p&&p.nodeType===1){const cs=getComputedStyle(p);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0){hid=true;break}p=p.parentElement}if(vis&&!hid)out.push([m[1],r.x,r.y,r.width,r.height,s])});return out})()"""
SC=[
 ('home', "JLP.goHome()"),
 ('meet_skate', "JLP.goHome(); JLP.ST.met.skate=0; document.getElementById('tSkate').click()"),
]+[(f'story_trip{k}', f"JLP.goHome(); JLP.playStory('trip',{k},()=>{{}})") for k in range(6)]+[
 ('map_trip', "JLP.openMap('trip')"),
 ('hub_skate', "JLP.goHome(); JLP.ST.met.skate=1; JLPSK.openHub('main')"),
 ('map_skate', "JLP.goHome(); JLPSK.openHub('main'); setTimeout(()=>document.querySelector('.skcard.c-map').click(),300)"),
 ('teri_pop', "JLP.goHome(); JLP.startActivity('sk_score1','path',{world:'skate',level:2,sec:'skate:1'}); setTimeout(()=>{const g=document.querySelector('#introGo'); g&&g.click(); setTimeout(()=>{JLP.rightNow(); setTimeout(()=>{JLP.rightNow(); setTimeout(()=>JLP.rightNow(),900)},900)},700)},400)"),
 ('stickers_my', "JLP.goHome(); JLPSTK.openStickers('my')"),
 ('passport_cover', "JLP.goHome(); PP21.open({quiet:1,open:1})"),
]+[(f'passport_p{i}', "document.querySelectorAll('#infoov.on').forEach(e=>e.classList.remove('on')); document.getElementById('ppNext').click()") for i in range(1,12)]+[
]
SKS=[f'story_skate{k}' for k in range(12)]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome'); pg=b.new_context(viewport={'width':W,'height':H},has_touch=True).new_page(); J=pg.evaluate
    pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.goto(U+'?nosw=1'); J("localStorage.clear(); localStorage.setItem('juniperLearn', JSON.stringify({v:3,stars:50,boss:{},relics:{},outfit:{},met:{park:1,skate:1,trip:1},wp:{trip:6,skate:1},stk:{got:{c_teri:1,sk_cteri:1,c_gigi:1}}}))"); pg.reload(); pg.wait_for_timeout(1200)
    pg.click('#playBtn'); pg.wait_for_timeout(900); J("JLP.ST.voice=false")
    allsc=SC+[(n,f"JLP.goHome(); JLP.playStory('skate',{int(n[11:])},()=>{{}})") for n in SKS]
    for name,js in allsc:
        J("document.querySelectorAll('.tjrev,.stkrev,.rwcele,.skemb,.skrev').forEach(e=>e.remove()); document.querySelectorAll('.reveal.on').forEach(e=>e.className='reveal'); document.querySelectorAll('.on').forEach(e=>{if(e.id==='meet'||e.id==='story'||e.id==='infoov')e.classList.remove('on')})")
        try: J(js)
        except Exception as e: print(name,'ERR',str(e)[:120]); continue
        pg.wait_for_timeout(4200 if name=='teri_pop' else 1600)
        for step in range(8 if name.startswith('story') else 1):
            hits=J(FIND)
            if hits or step==0:
                tag=name+(f'_{step}' if name.startswith('story') else '')
                if not hits and not name.startswith('story'): pg.screenshot(path=O+f'{W}_{tag}_NOHIT.png')
                if hits:
                    pg.screenshot(path=O+f'{W}_{tag}.png')
                    for i,(k,x,y,w,h,s) in enumerate(hits):
                        pad=max(w,h)*0.25; clip={'x':max(0,x-pad),'y':max(0,y-pad)}; clip['width']=min(W,x+w+pad)-clip['x']; clip['height']=min(H,y+h+pad)-clip['y']
                        if clip['width']>8 and clip['height']>8: pg.screenshot(path=O+f'{W}_{tag}_crop{i}_{k}.png',clip=clip)
                        found.setdefault(k,[]).append(tag); 
                    print(tag,[(h[0],round(h[3]),round(h[4]),h[5].split('art/')[-1]) for h in hits],flush=True)
            if not name.startswith('story'): break
            if not J("document.getElementById('story').classList.contains('on')"): break
            J("document.getElementById('stNext').click()"); pg.wait_for_timeout(900)
    # any old art bytes? all art loaded must be the new files (size check)
    sizes=J("""(()=>[...document.querySelectorAll('img,image')].map(e=>e.getAttribute('src')||e.getAttribute('href')||'').filter(s=>/teri|gwagon/.test(s)))()""")
    print('found',json.dumps({k:len(v) for k,v in found.items()})); print('errs',errs)

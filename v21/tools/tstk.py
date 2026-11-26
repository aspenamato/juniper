# P7 sticker book tests
import sys, json
from playwright.sync_api import sync_playwright
W,H=int(sys.argv[1]),int(sys.argv[2]); U=sys.argv[3] if len(sys.argv)>3 else 'http://localhost:8771/learn/'
fails=[]; errs=[]
def ok(c,m): print(('PASS ' if c else 'FAIL ')+m, flush=True); (None if c else fails.append(m))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome'); ctx=b.new_context(viewport={'width':W,'height':H},has_touch=True); pg=ctx.new_page(); pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(U); pg.evaluate("localStorage.clear(); localStorage.setItem('juniperLearn', JSON.stringify({v:3,stars:12,boss:{'park:0':{r:2,n:1,acc:1}},relics:{moonstone:2}}))"); pg.reload(); pg.wait_for_timeout(900); pg.click('#playBtn'); pg.wait_for_timeout(900); J=pg.evaluate
    J("JLP.ST.voice=false; window.__said=[]; window.__vsink=s=>window.__said.push(JSON.parse(s))"); said=lambda: [x[0] if isinstance(x,list) else str(x) for x in J("window.__said.splice(0)") if x]
    D=J("JLPSTK.STK_DEF"); ids=list(D)
    ok(len(ids)>=60, f'{len(ids)} stickers (>=60)')
    tiers={}; [tiers.__setitem__(v[1],tiers.get(v[1],0)+1) for v in D.values()]; print('TIERS',tiers,'ANIM',sum(1 for v in D.values() if len(v)>3))
    ok(all(tiers.get(t,0)>=6 for t in ['common','holo','puffy','gold']), 'all four tiers used')
    ok(all(J(f"!!JLPSTK.STK_EARN['{i}']") for i in ids), 'every sticker has a skill-based way to earn it')
    ok(J("JLP.ST.stars")==12 and J("!!JLP.ST.boss['park:0']"), 'old save kept (stars, bosses)')
    ok(J("JLPSTK.stkState().got.c_oscar")==1, 'boss already beaten -> Oscar sticker owned after migration')
    ok(J("!!document.querySelector('#tStk')"), 'home has Sticker Book tile')
    pg.click('#tStk'); pg.wait_for_timeout(900)
    ok(J("document.querySelector('#stk').classList.contains('on')"), 'tile opens the book')
    ok(J("document.querySelectorAll('#stkTabs .stktab').length")==J("JLPSTK.STK_PAGES.length+(JLPSTK.STK_PAGES.some(p=>p.id==='my')?0:1)"), 'all pages incl My Page')
    # images load
    J("document.body.insertAdjacentHTML('beforeend','<div id=imgt style=\"position:fixed;left:-9999px\">'+JLPSTK.STK_IDS.map(i=>'<img src=\"../art/stickers/'+i+'.webp\">').join('')+'</div>')"); pg.wait_for_timeout(2500)
    bad=J("[...document.querySelectorAll('#imgt img')].filter(i=>!i.naturalWidth).map(i=>i.src)"); ok(not bad, 'all sticker images load '+str(bad[:3])); J("document.getElementById('imgt').remove()")
    J("JLPSTK.V.page='park'; JLPSTK.renderStk()"); pg.wait_for_timeout(400)
    ok(J("document.querySelectorAll('#stkPg .placed.ghost').length")==8, 'empty park page shows 8 silhouettes')
    pg.screenshot(path=f'v16/shots/T_stk_empty_{W}.png'); said()
    print('HIT',J("(()=>{const e=document.querySelector('#stkPg .placed.ghost');const r=e.getBoundingClientRect();const t=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return [t.className,t.id,r.x,r.y]})()"))
    pg.click('#stkPg .placed.ghost',force=True); pg.wait_for_timeout(400); s=said(); ok(any('to earn this sticker' in x for x in s), 'tap silhouette -> voiced hint '+str(s[:1]))
    # time trial: play Plus Dash fast with one mistake
    J("JLPSTK.startTrial('add')"); pg.wait_for_timeout(300); J("(()=>{})()")
    for _ in range(60):
        if J("!!(JLPSTK.TR&&JLPSTK.TR.t0)"): break
        pg.wait_for_timeout(200)
    ok(J("!!(JLPSTK.TR&&JLPSTK.TR.t0)"), 'trial clock starts after ready-set-go')
    pg.screenshot(path=f'v16/shots/T_trial_{W}.png')
    first=True
    for i in range(10):
        q=J("({ans:JLPSTK.TR.q.ans,opts:JLPSTK.TR.q.opts})")
        if first:
            w=[o for o in q['opts'] if o!=q['ans']][0]; idx=q['opts'].index(w); pg.locator('#trOpts .tropt').nth(idx).tap(); pg.wait_for_timeout(150); first=False
            ok(J("JLPSTK.TR.pen")==3, 'wrong answer adds 3 second penalty')
        idx=q['opts'].index(q['ans']); pg.locator('#trOpts .tropt').nth(idx).tap(); pg.wait_for_timeout(300)
    pg.wait_for_timeout(600)
    tt=J("JLP.ST.stk.tt.add"); ok(tt and tt['med']==3, f'fast run = gold medal {tt}')
    ok(all(J(f"!!JLP.ST.stk.got['{s}']") for s in ['gball','gflag','hole1']), 'gold earns bronze+silver+gold Plus Dash stickers')
    ok(J("!!JLP.ST.stk.got.skate"), 'first gold time -> golds sticker')
    pg.screenshot(path=f'v16/shots/T_trialend_{W}.png')
    pg.wait_for_timeout(4500)
    ok(J("!!document.querySelector('.stkrev')"), 'pack reveal plays'); pg.wait_for_timeout(1800); pg.screenshot(path=f'v16/shots/T_reveal_{W}.png')
    for _ in range(8):
        if not J("!!document.querySelector('.stkrev .rvgo')"): break
        J("document.querySelector('.stkrev .rvgo').click()"); pg.wait_for_timeout(2200)
    ok(J("JLP.ST.stk.pend.length")==0, 'all reveals done')
    # slow run -> no medal upgrade, personal best logic
    J("JLP.ST.stk.tt.sub={best:60,med:1,runs:1}; JLP.ST.stk.pbn=0"); J("(()=>{JLPSTK.startTrial('sub')})()"); pg.wait_for_timeout(200)
    J("const T=JLPSTK.TR; T.t0=performance.now()-45000; T.i=10;"); r=J("JLPSTK.trialEnd()")
    ok(r['med']==2 and r['pb'] and J("JLP.ST.stk.pbn")==1 and J("JLP.ST.stk.tt.sub.best")==45, f'45s Take-Away = silver + new personal best {r}')
    J("document.querySelector('.trend') && document.querySelector('.trend').remove(); JLP.ST.stk.pend=[]; document.querySelectorAll('.stkrev').forEach(e=>e.remove())")
    # placing: drag + rotate/resize on album page
    J("JLPSTK.openStickers('golf')"); pg.wait_for_timeout(700)
    el=pg.locator('#stkPg .placed:not(.ghost)').first; bb=el.bounding_box(); x0=J("JLP.ST.stk.lay.golf[0].x")
    pg.mouse.move(bb['x']+bb['width']/2,bb['y']+bb['height']/2); pg.mouse.down(); pg.mouse.move(bb['x']+bb['width']/2+80,bb['y']+bb['height']/2+40,steps=8); pg.mouse.up(); pg.wait_for_timeout(300)
    x1=J("JLP.ST.stk.lay.golf[0].x"); ok(x1>x0+0.03, f'drag moves sticker ({x0:.2f}->{x1:.2f})')
    pg.mouse.click(bb['x']+bb['width']/2+80,bb['y']+bb['height']/2+40); pg.wait_for_timeout(200)
    hd=pg.locator('#stkPg .placed.sel .hdl').bounding_box(); s0,r0=J("[JLP.ST.stk.lay.golf[0].s,JLP.ST.stk.lay.golf[0].r]")
    pg.mouse.move(hd['x']+17,hd['y']+17); pg.mouse.down(); pg.mouse.move(hd['x']-30,hd['y']+110,steps=8); pg.mouse.up(); pg.wait_for_timeout(300)
    s1,r1=J("[JLP.ST.stk.lay.golf[0].s,JLP.ST.stk.lay.golf[0].r]"); ok(s1>s0*1.1 and abs(r1-r0)>3, f'pink handle resizes+rotates ({s0:.2f},{r0:.0f})->({s1:.2f},{r1:.0f})')
    pg.screenshot(path=f'v16/shots/T_place_{W}.png')
    # my page: drag from tray
    J("JLPSTK.V.page='my'; JLPSTK.renderStk()"); pg.wait_for_timeout(400)
    t=pg.locator('#stkTray .stk.tr').first.bounding_box(); P=pg.locator('#stkPg').bounding_box()
    pg.mouse.move(t['x']+t['width']/2,t['y']+t['height']/2); pg.mouse.down(); pg.mouse.move(P['x']+P['width']*.5,P['y']+P['height']*.5,steps=10); pg.mouse.up(); pg.wait_for_timeout(400)
    ok(J("JLP.ST.stk.my.length")==1, 'drag from tray places sticker on My Page')
    pg.locator('#stkPg .mybg').click(); pg.wait_for_timeout(500); ok(J("JLP.ST.stk.bg")==1, 'My Page backdrop changes')
    pg.screenshot(path=f'v16/shots/T_mypage_{W}.png')
    # streak hook
    J("JLP.goHome()"); J("JLP.startActivity('m_count','free',{})"); pg.wait_for_timeout(200); J("JLP.go()"); pg.wait_for_timeout(600)
    J("JLP.ST.stk.streak=4"); J("JLP.rightNow()"); pg.wait_for_timeout(300); ok(J("JLP.ST.stk.best")>=5 and J("!!JLP.ST.stk.got.gelato"), 'streak of 5 earns gelato sticker')
    J("JLP.goHome()"); pg.wait_for_timeout(2600); ok(J("!!document.querySelector('.stkrev')"), 'earned-in-game sticker reveals when back home')
    J("document.querySelectorAll('.stkrev').forEach(e=>e.remove())")
    lay=J("JSON.stringify(JLP.ST.stk.lay.golf[0])"); pg.reload(); pg.wait_for_timeout(1200)
    ok(J("JSON.stringify(JSON.parse(localStorage.getItem('juniperLearn')).stk.lay.golf[0])")==lay, 'layout saved in localStorage after reload')
    ok(J("JSON.parse(localStorage.getItem('juniperLearn')).stars")>=12, 'stars kept')
    # shelves still fine
    pg.click('#playBtn'); pg.wait_for_timeout(600); J("JLP.openShelves()"); pg.wait_for_timeout(500); ok(J("document.querySelectorAll('#shelves .topbar button, #sTabs button').length")>2, 'shelves tabs still render')
    ok(not errs, 'no page errors '+str(errs[:3]))
    print('FAILS',len(fails)); b.close()

# P6 dress-up tests
import sys
from playwright.sync_api import sync_playwright
W,H=int(sys.argv[1]),int(sys.argv[2]); U=sys.argv[3] if len(sys.argv)>3 else 'http://localhost:8771/learn/'
fails=[]; errs=[]
def ok(c,m): print(('PASS ' if c else 'FAIL ')+m, flush=True); (None if c else fails.append(m))
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome'); ctx=b.new_context(viewport={'width':W,'height':H},has_touch=True); pg=ctx.new_page(); pg.on('pageerror',lambda e:errs.append(str(e)))
    bad=[]; pg.on('response',lambda r: (r.status>=400 and '/wear/' in r.url) and bad.append(r.url))
    pg.goto(U); pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(800); pg.click('#playBtn'); pg.wait_for_timeout(800); J=pg.evaluate
    J("JLP.ST.voice=false; window.__said=[]; window.__vsink=s=>window.__said.push(JSON.parse(s)); JLP.goHome()"); pg.wait_for_timeout(500)
    said=lambda: [x for x in J("window.__said.splice(0)") if x]
    ok(J("JLPDRESS.JW.length")>=20, f'{J("JLPDRESS.JW.length")} Juniper jewelry/clothes items')
    ok(J("JLPDRESS.AI.length")>=18, f'{J("JLPDRESS.AI.length")} Aspen items')
    BI="JLPDRESS.AI.filter(o=>!String(o.boss).startsWith('tj:'))"  # t106u: Travel Journal items unlock from journal stamps, not bosses
    ok(len(set(J(BI+".map(o=>o.boss)")))==J(BI+".length") and J(BI+".every(o=>JLP.BOSSES.some(b=>b.id===o.boss))"), 'each Aspen item tied to a different real boss')
    J("JLP.openDress()"); pg.wait_for_timeout(900); n=J("document.querySelectorAll('#closet .cl').length"); ok(n>=48, f'closet shows {n} items')
    J("JLP.ST.stars=500; JLP.openDress()"); pg.wait_for_timeout(600)
    for i,o in enumerate(J("JLPDRESS.JW.map(o=>o.id)")):
        pg.locator(f'#closet .cl[data-id="{o}"]').click(); pg.wait_for_timeout(120)
        ok(J(f"!!document.querySelector('#dressFox [data-w=\"{o}\"], #dressFox image[href*=\"wear/{o}\"]')"), f'{o}: worn on Juniper')
        if o in ('j_lei','j_wings','j_sunhat'): pg.screenshot(path=f'v16/shots/T_jw_{o}_{W}.png')
    J("JLP.goHome()"); pg.wait_for_timeout(500); ok(J("document.querySelectorAll('#homeFox image[href*=\"wear/\"]').length")>=1, 'look shows on home')
    J("JLP.openDress()"); pg.wait_for_timeout(500); pg.screenshot(path=f'v16/shots/T_jw_closet_{W}.png')
    ok(J("!!document.querySelector('#aspBtn')"), 'Dress Up Aspen button on closet'); said(); pg.click('#aspBtn'); pg.wait_for_timeout(900)
    NB=":not([data-id^=\"a_tj\"])"  # t106u: journal items say "Earn N Travel Journal stamps to unlock"
    ok(J(f"document.querySelectorAll('#aspCl .aspit{NB}').length")==J(BI+'.length') and J(f"document.querySelectorAll('#aspCl .aspit.locked{NB}').length")==J(BI+'.length'), 'all Aspen items locked at start')
    ok(J(f"[...document.querySelectorAll('#aspCl .aspit.locked{NB} small')].every(e=>/^Beat .+ to unlock$/.test(e.textContent))"), 'locked labels say Beat <villain> to unlock')
    ok(J("[...document.querySelectorAll('#aspCl .aspit.locked[data-id^=\"a_tj\"] small')].every(e=>/Travel Journal stamps to unlock$/.test(e.textContent))"), 'journal items say how to unlock')
    pg.screenshot(path=f'v16/shots/T_asp_locked_{W}.png')
    pg.locator('#aspCl .aspit').first.click(); pg.wait_for_timeout(200); s=said(); ok(any(x[0].startswith('Beat ') for x in s), 'tapping locked item voices the boss')
    ok(not J("JLPDRESS.aspState().on.head"), 'locked item not worn')
    # beat a boss -> unlock shown on reward chest
    J("JLP.startBoss(JLP.BOSSES.find(b=>b.id==='park:4'))"); pg.wait_for_timeout(1500)
    for _ in range(60):
        if J("!!document.querySelector('#chest.on')"): break
        if not J("!!(JLP.RUN&&JLP.RUN.mode==='boss')"): pg.wait_for_timeout(500); continue
        if J("!!(JLP.RUN&&JLP.RUN.shield)"): J("document.getElementById('pRelic').click()"); pg.wait_for_timeout(3500); continue
        J("JLP.rightNow()"); pg.wait_for_timeout(1300)
    pg.wait_for_timeout(5600); ok(J("!!document.querySelector('#chest .ch-asp.pop')"), 'boss reward shows the new Dress Up Aspen item')
    pg.screenshot(path=f'v16/shots/T_asp_reward_{W}.png'); s=said(); ok(any('Dress Up Aspen' in x[0] for x in s), 'unlock voiced')
    J("document.getElementById('chGo').click()"); pg.wait_for_timeout(800); J("document.querySelectorAll('.overlay.on,.reveal,.stkrev,.infoov.on').forEach(o=>o.classList.contains('reveal')||o.classList.contains('stkrev')?o.remove():o.classList.remove('on'))")
    J("JLP.ST.boss=Object.fromEntries(JLP.BOSSES.map(b=>[b.id,{r:2,n:1}])); JLPDRESS.openAspen()"); pg.wait_for_timeout(700)
    ok(J("document.querySelectorAll('#aspCl .aspit.locked:not([data-id^=\"a_tj\"])').length")==0, 'all unlocked after bosses')
    pg.wait_for_timeout(1500); J("document.querySelectorAll('#infoov.on,#story.on,#meet.on').forEach(o=>o.classList.remove('on')); document.querySelectorAll('.reveal,.stkrev').forEach(o=>o.remove()); JLPDRESS.openAspen()"); pg.wait_for_timeout(500)
    for o in ['a_helmet','a_rosette','a_brush','a_saddle']: J(f"document.querySelector('#aspCl .aspit[data-id=\"{o}\"]').click()"); pg.wait_for_timeout(150)
    ok(J("document.querySelectorAll('#aspStage [data-w]').length")==4, 'Aspen wears 4 items (head, neck, hand, side)'); pg.wait_for_timeout(600); J("document.querySelectorAll('#infoov.on,#story.on,#meet.on').forEach(o=>o.classList.remove('on'))"); pg.wait_for_timeout(300); pg.screenshot(path=f'v16/shots/T_asp_unlocked_{W}.png')
    ok(J("(()=>{const r=document.querySelector('#aspStage svg').getBoundingClientRect();return r.width>100&&r.bottom<=innerHeight+2})()"), 'Aspen visible on screen')
    ok(J("[...document.querySelectorAll('#aspCl .aspit')].every(e=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1})"), 'items fit width')
    pg.reload(); pg.wait_for_timeout(1000); ok(J("Object.keys(JLP.ST.asp.on).length")==4, 'Aspen look saved')
    ok(not bad, f'all wear art loads {bad[:3]}'); ok(not errs, f'no page errors {errs[:3]}')
    print('FAILS',len(fails)); b.close()

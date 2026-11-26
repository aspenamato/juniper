# Large-crop visual QC capture of every skate screen: python3 v21/tools/qcsk.py W H  -> v21/qc/raw/<W>_<name>.png
import sys, json
from playwright.sync_api import sync_playwright
W, H = int(sys.argv[1]), int(sys.argv[2]); U = 'http://127.0.0.1:8821/learn/?nosw=1'; O = '/workspace/wt21/v21/qc/raw/'
errs = []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome')
    pg = b.new_context(viewport={'width': W, 'height': H}, has_touch=True).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)))
    J = pg.evaluate
    pg.goto(U); J("localStorage.clear(); localStorage.setItem('juniperLearn', JSON.stringify({v:3,stars:120,boss:{'park:0':{r:2,n:1,acc:1}},relics:{moonstone:2},outfit:{},met:{park:1,skate:1}}))"); pg.reload(); pg.wait_for_timeout(1200)
    pg.click('#playBtn'); pg.wait_for_timeout(900); J("JLP.ST.voice=false")
    def shot(n, w=900): pg.wait_for_timeout(w); pg.screenshot(path=O + f'{W}_{n}.png')
    def clear(): J("document.querySelectorAll('#infoov.on,#story.on,#bossIntro.on').forEach(e=>e.classList.remove('on')); try{JLPARC.arcStop()}catch(e){}")
    TAIL = len(sys.argv) > 3 and sys.argv[3] == 'tail'
    shot('home')
    RK = J("JLPSK.RK.map(r=>({k:r.k,nodes:r.nodes.split(' ')}))")
    for v in ([] if TAIL else ['main', 'games', 'album', 'forge', 'practice']):
        J(f"JLPSK.openHub('{v}')"); shot('hub_' + v)
    J("JLP.ST.seenStory=Object.assign(JLP.ST.seenStory||{},Object.fromEntries([...Array(12)].map((_,i)=>['skate:'+i,1])))")
    J("JLP.openMap('skate')"); pg.wait_for_timeout(1500)
    for si, r in enumerate([] if TAIL else RK):
        J(f"(()=>{{const g=document.querySelectorAll('#mapSvg .banner')[{si}]; g&&g.scrollIntoView({{block:'center'}})}})()"); shot(f'map{si:02d}_{r["k"]}', 700)
    for si, r in enumerate([] if TAIL else RK):
        clear(); J(f"JLP.playStory('skate',{si},()=>{{}})"); shot(f'story{si:02d}_{r["k"]}', 1200)
        J("document.getElementById('stNext')&&document.getElementById('stNext').click()"); shot(f'story{si:02d}b_{r["k"]}', 900)
        clear()
        for j, n in enumerate(r['nodes']):
            clear(); J(f"JLP.startActivity('sk_{n}','free')"); pg.wait_for_timeout(700)
            J("document.querySelectorAll('#infoov.on').forEach(e=>e.classList.remove('on')); document.querySelector('#introGo')&&document.querySelector('#intro.on')&&document.querySelector('#introGo').click()")
            shot(f'drill{si:02d}{j}_{n}', 1300)
        J("JLP.goHome()")
    J("JLPSK.SKX.tb=1")
    for bi in [] if TAIL else J("JLP.BOSSES.filter(b=>/^skate:/.test(b.id)).map(b=>b.id)"):
        clear(); J(f"JLP.goHome(); JLP.openBossIntro(JLP.BOSSES.find(x=>x.id==='{bi}'))"); shot('bossintro_' + bi.replace(':', ''), 1200)
        J(f"JLP.goHome(); JLPSK.startBoss(JLP.BOSSES.find(x=>x.id==='{bi}'))"); pg.wait_for_timeout(1500)
        J("document.querySelector('#introGo')&&document.querySelector('#intro.on')&&document.querySelector('#introGo').click()"); shot('boss_' + bi.replace(':', ''), 1500)
    J("JLPSK.SKX.tb=0"); clear(); J("JLP.goHome()")
    J("JLPSK.openHub('main')"); pg.wait_for_timeout(500)
    for i, c in enumerate(J("[...document.querySelectorAll('#skBody .skc')].map(e=>e.className)")):
        pg.locator('#skBody .skc').nth(i).screenshot(path=O + f'{W}_cast{i}_' + c.split('c-')[-1] + '.png') if pg.locator('#skBody .skc').nth(i).is_visible() else None
    for g in ['skcombo', 'skjudge', 'skrink']:
        J(f"JLPARC.arcStart('{g}')"); shot('game_' + g, 4300); J("try{JLPARC.arcStop()}catch(e){}; JLP.goHome()")
    J("Object.assign(JLP.ST.relics,{sksilver:3,skstar:2,skwave:1,skmaple:3,skaurora:4}); JLP.ST.sk.cr=40; Object.assign(JLP.ST.sk.em,Object.fromEntries(JLPSK.RK.map((r,i)=>[r.k,1+i%3]))); JLPSK.openHub('forge')"); shot('hub_forge_full')
    J("JLPSK.openHub('album')"); shot('hub_album_full')
    print('errs', errs)

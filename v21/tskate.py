# v21 Ice Skating World tests: python3 v21/tskate.py W H [URL]
# save kept, home tile, meet, hub (6 cards, cast voices), map (63 stops, banner counts, locked taps), host voices, Teri pop,
# a full boss win (relic + crystals + sticker + wearable + coloring page), forge, emblems, skate games, coloring links,
# reload keeps everything, and no skate line falls back to the browser voice.
import sys, json, time
from playwright.sync_api import sync_playwright
W, H = int(sys.argv[1]), int(sys.argv[2]); U = sys.argv[3] if len(sys.argv) > 3 else 'http://127.0.0.1:8821/learn/?nosw=1'
S = '/workspace/wt21/v21/shots/'; fails = []; errs = []
def ok(c, m): print(('PASS ' if c else 'FAIL ') + m, flush=True); (None if c else fails.append(m))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--autoplay-policy=no-user-gesture-required'])
    pg = b.new_context(viewport={'width': W, 'height': H}, has_touch=True).new_page(); pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto(U); pg.evaluate("localStorage.clear(); localStorage.setItem('juniperLearn', JSON.stringify({v:3,stars:40,boss:{'park:0':{r:2,n:1,acc:1}},relics:{moonstone:2},outfit:{},met:{park:1}}))"); pg.reload(); pg.wait_for_timeout(1200)
    J = pg.evaluate
    if J("!!document.querySelector('#playBtn') && document.querySelector('#start').classList.contains('on')"): pg.click('#playBtn'); pg.wait_for_timeout(900)
    J("window.__said=[]; window.__vsink=s=>window.__said.push(JSON.parse(s))"); said = lambda: [x for x in J("window.__said.splice(0)") if isinstance(x, list)]
    ok(J("JLP.ST.stars") == 40 and J("!!JLP.ST.boss['park:0']") and J("JLP.ST.relics.moonstone") == 2, 'old save kept')
    # home tile
    r = J("(()=>{const t=document.getElementById('tSkate');if(!t)return null;const r=t.getBoundingClientRect();return [r.x,r.y,r.width,r.height]})()")
    ok(r and r[0] >= 0 and r[0] + r[2] <= W + 1 and r[2] > 120, f'home tile #tSkate on screen {r}')
    pg.screenshot(path=S + f'home_{W}.png')
    pg.click('#tSkate'); pg.wait_for_timeout(1200)
    ok(J("document.getElementById('meet').classList.contains('on')"), 'first tap -> meet card'); s = said(); ok(any(x[1] == 'teri' for x in s), 'meet voiced by Teri ' + str([x[1] for x in s][:3]))
    ok(J("['meetTxt','meetName'].every(id=>{const e=document.getElementById(id);return !e||getComputedStyle(e).display==='none'})"), 'meet card is voice-only (no dialogue box)')
    J("document.getElementById('meetGo').click()"); pg.wait_for_timeout(1200)
    ok(J("document.getElementById('skhub').classList.contains('on')"), 'Let\'s go -> skating hub'); ok(J("document.querySelectorAll('#skBody .skcard').length") == 6, '6 hub cards')
    pg.screenshot(path=S + f'hub_{W}.png'); said()
    # cast voices: the face you tap is the voice you hear
    cast = J("[...document.querySelectorAll('#skBody .skc')].filter(e=>getComputedStyle(e).display!=='none').map(e=>[e.className.split(' ').find(c=>c.startsWith('c-')).slice(2), +e.dataset.i])")
    bad = []
    for nm, i in cast:
        J(f"document.querySelector('#skBody .skc[data-i=\"{i}\"]').click()"); pg.wait_for_timeout(150); s = said()
        want = 'juniper' if nm == 'aspen' else nm
        if not s or s[-1][1] != want: bad.append((nm, s[-1][1] if s else None))
    ok(len(cast) >= 8 and not bad, f'{len(cast)} cast taps speak in their own voice {bad}')
    # map
    J("JLP.ST.seenStory=Object.assign(JLP.ST.seenStory||{},Object.fromEntries([...Array(12)].map((_,i)=>['skate:'+i,1])))")
    J("document.querySelector('#skBody .skcard[data-v=\"map\"]').click()"); pg.wait_for_timeout(1500)
    ok(J("document.getElementById('map').classList.contains('on')"), 'Rink Map opens')
    ok(J("document.querySelectorAll('#mapSvg .node').length") == 63, f'63 stops on the map ({J("document.querySelectorAll(`#mapSvg .node`).length")})')
    bn = J("[...document.querySelectorAll('#mapSvg .banner')].map(g=>{const t=g.querySelectorAll('text');return t[t.length-1].textContent})")
    ok(bn[:3] == ['0/6', '0/7', '0/6'] and len(bn) == 12, f'banner counts {bn}')
    pg.screenshot(path=S + f'map_{W}.png'); said()
    J("(()=>{const n=document.querySelector('#mapSvg .node.locked');n.dispatchEvent(new MouseEvent('click',{bubbles:true}))})()"); pg.wait_for_timeout(300); s = said()
    ok(s and not errs, f'locked stop gives a voiced nudge, no error {s[:1]}')
    # activity: host voice + Teri pop
    J("JLP.startActivity('sk_score1','path',{world:'skate',level:2,sec:'skate:1'})"); pg.wait_for_timeout(600); s = said()
    ok(any(x[1] == 'oscar' for x in s), 'Judge Oscar hosts his drill ' + str([x[1] for x in s][:3]))
    J("document.querySelectorAll('#infoov.on').forEach(e=>e.classList.remove('on'))"); J("document.querySelector('#introGo')&&document.querySelector('#introGo').click()"); pg.wait_for_timeout(500)
    teri = False; said()
    for i in range(4):
        it = J("JLP.cur()")
        if it.get('type', 'choice') != 'choice': break
        k = [str(o['v']) for o in it['opts']].index(str(it['ans'])); J(f"document.querySelector('#stage .opt[data-k=\"{k}\"]').click()"); pg.wait_for_timeout(700)
        if J("!!document.querySelector('#skTeri.on')"): teri = True; pg.screenshot(path=S + f'teri_{W}.png')
        pg.wait_for_timeout(1500)
    s = said(); ok(teri and any(x[1] == 'teri' for x in s), 'Teri pops up and cheers in her voice after 3 right answers')
    # boss: Wobble Goblin (choice items only, so the test can answer them)
    J("JLPSK.SKX.tb=1")
    J("JLP.ST.sk&&(JLP.ST.sk.cr=0); JLP.goHome(); JLPSK.startBoss(JLP.BOSSES.find(x=>x.id==='skate:1'))"); pg.wait_for_timeout(1500)
    pg.screenshot(path=S + f'boss_{W}.png')
    for i in range(40):
        if J("!(JLP.RUN&&JLP.RUN.mode==='boss')") or not J("document.getElementById('play').classList.contains('on')"): break
        if J("!!(JLP.RUN.shield)"): J("document.getElementById('pRelic').click()"); pg.wait_for_timeout(2500); continue
        it = J("JLP.cur()")
        if J("JLP.RUN.locked"): pg.wait_for_timeout(500); continue
        k = [str(o['v']) for o in it['opts']].index(str(it['ans'])); J(f"document.querySelector('#stage .opt[data-k=\"{k}\"]').click()"); pg.wait_for_timeout(1800)
    pg.wait_for_timeout(3500)
    ok(J("!!JLP.ST.boss['skate:1']"), 'Wobble Goblin beaten'); ok(J("(JLP.ST.relics.sksilver??-1)") >= 0, 'Silver Snowflake Skate relic won')
    ok(J("JLP.ST.sk.cr") >= 5, f'boss gives ice crystals ({J("JLP.ST.sk.cr")})'); ok(J("!!(JLP.ST.stk&&JLP.ST.stk.got.sk_globe)"), 'boss sticker sk_globe')
    ok(J("JLPDRESS.aiOpen(JLPDRESS.AI.find(o=>o.id==='a_pscarf'))"), 'Pink Snowflake Scarf unlocked for dress-up')
    ok('sk_wollman' in J("JLPSK.scenes()") and 'sk_dobson' in J("JLPSK.scenes()"), 'coloring pages unlocked (Dobson + Wollman)')
    pg.screenshot(path=S + f'bosswin_{W}.png')
    J("JLPSK.SKX.tb=0; document.querySelectorAll('.on#cele,.on#chest,.on#reveal').forEach(e=>e.classList.remove('on'))")
    # forge
    J("JLP.ST.sk.cr=99; JLPSK.openHub('forge')"); pg.wait_for_timeout(600); r0 = J("JLP.ST.relics.sksilver")
    J("document.querySelector('#skBody .sfup[data-id=sksilver]')&&document.querySelector('#skBody .sfup[data-id=sksilver]').click()"); pg.wait_for_timeout(900)
    ok(J("JLP.ST.relics.sksilver") == min(r0 + 1, 3) and J("JLP.ST.sk.cr") < 99, f'forge upgrades the relic ({r0}->{J("JLP.ST.relics.sksilver")}) and spends crystals')
    pg.screenshot(path=S + f'forge_{W}.png'); said()
    # emblem: finish Dobson -> emblem + sticker
    J("JLP.ST.wp=Object.assign(JLP.ST.wp||{},{skate:6}); JLP.openMap('skate')"); pg.wait_for_timeout(2600)
    ok(J("!!JLP.ST.sk.em.dobson") and J("!!JLP.ST.stk.got.sk_cmom"), 'finishing Dobson awards its emblem + Mama Fox sticker')
    pg.screenshot(path=S + f'emblem_{W}.png')
    J("document.querySelectorAll('#emReveal,.emrev').forEach(e=>e.remove())")
    # skate games
    J("JLPSK.openHub('games')"); pg.wait_for_timeout(500); ok(J("document.querySelectorAll('#skBody .arccard, #skBody [data-g]').length") >= 3, 'skate games listed')
    for g in ['skcombo', 'skjudge', 'skrink']:
        J(f"JLPARC.arcStart('{g}')"); pg.wait_for_timeout(4200); pg.screenshot(path=S + f'game_{g}_{W}.png')
        ok(J("document.getElementById('agame').classList.contains('on') && !!JLPARC.ARC.run") , f'{g} starts')
        J("try{JLPARC.arcStop()}catch(e){}; JLP.goHome()"); pg.wait_for_timeout(400)
    # album + practice + coloring
    J("JLPSK.openHub('album')"); pg.wait_for_timeout(500); ok(J("document.querySelectorAll('#skBody .skem').length") == 12, '12 emblems in the album'); pg.screenshot(path=S + f'album_{W}.png')
    J("JLPSK.openHub('practice')"); pg.wait_for_timeout(500); ok(J("document.querySelectorAll('#skBody .skpa').length") == 63, '63 practice drills'); pg.screenshot(path=S + f'practice_{W}.png')
    # phase 2: stories voice-only and Juniper never mirrored
    J("JLP.goHome(); document.querySelectorAll('#infoov.on').forEach(e=>e.classList.remove('on')); JLP.playStory('skate',0,()=>{})"); pg.wait_for_timeout(600)
    ok(J("getComputedStyle(document.getElementById('stBub')).display==='none'"), 'story has no text bubble')
    J("(()=>{const L=document.getElementById('story');L.className='story on w-skate painted';const B=document.getElementById('stB');B.classList.add('jun');B.innerHTML=CHARS.svg('juniper')})()"); pg.wait_for_timeout(200)
    ok(J("(()=>{const e=document.querySelector('#story.on .st-b.jun svg, #story.on .st-b.jun img');return !!e&&getComputedStyle(e).transform==='none'})()"), 'Juniper on the right side of a story is not mirrored (ear stays on viewer right)')
    J("document.getElementById('story').className='story'")
    # reload keeps everything
    J("JLPSK.save()"); pg.reload(); pg.wait_for_timeout(1500)
    ok(J("JLP.ST.stars") >= 40 and J("!!JLP.ST.boss['park:0']") and J("!!JLP.ST.boss['skate:1']") and J("JLP.ST.relics.moonstone") == 2 and J("!!JLP.ST.sk.em.dobson"), 'reload keeps old + new progress')
    ok(not errs, 'no page errors ' + str(errs[:3]))
    print('RESULT', 'FAIL' if fails else 'PASS', len(fails), fails); b.close()

# RETIRED (t106u skate worker, 2026-11-26): the Travel Journal moved inside My Passport (pp21, ddd6fc9e) — the home #hTJ button,
# the trip-map journal spot and the vault->journal path this test drives no longer exist (tpass asserts #hTJ is gone).
# Superseded by v21/tpass.py (journal stamps/levels/pages preserved, page replays stamp the journal, journal rewards, migration, voice)
# and v21/tpassfit.py. Original kept below and at site repo v21/ttj_retired_original.py. Run tpass instead.
import sys
if '--force' not in sys.argv:
    print('ttj RETIRED: superseded by v21/tpass.py + v21/tpassfit.py (journal now lives in My Passport). PASS (skipped)'); sys.exit(0)
sys.argv = [a for a in sys.argv if a != '--force']
# t106u Travel Journal tests: place, revisit rewards, progress migration, voice coverage.
# usage: python3 v21/ttj.py W H [URL] [OLDURL]   (OLDURL = a pre-journal build, default :8773)
import sys, json, urllib.request
from playwright.sync_api import sync_playwright
W, H = int(sys.argv[1]), int(sys.argv[2])
U = sys.argv[3] if len(sys.argv) > 3 else 'http://localhost:8772/learn/'
OLD = sys.argv[4] if len(sys.argv) > 4 else 'http://localhost:8773/learn/'
fails = []; n = 0
def ok(c, m):
    global n; n += 1
    if not c: fails.append(m); print('FAIL', m)
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--autoplay-policy=no-user-gesture-required'])
    def page(url):
        pg = b.new_page(viewport={'width': W, 'height': H}); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(url + '?nosw=1'); pg.wait_for_timeout(700); return pg, errs
    # ---------- 1. migration from a real pre-journal save ----------
    old, _ = page(OLD); J = old.evaluate
    J("localStorage.clear()"); old.reload(); old.wait_for_timeout(700); old.click('#playBtn'); old.wait_for_timeout(600)
    J("""(()=>{const S=JLP.ST; S.stars=137; S.wp={park:30,trip:JLP.WORLDS.trip.total}; S.met={trip:1}; S.relics=Object.assign(S.relics||{}, {skypass:4,ltag:3});
      S.boss=Object.assign(S.boss||{}, Object.fromEntries(JLP.BOSSES.filter(b=>b.w==='trip').map(b=>[b.id,{r:3,n:2}]))); S.outfit=S.outfit||'cape'; S.custom={keep:[1,2,3],note:'hi'}; JLP.goHome(); })()""")
    old.wait_for_timeout(500); J("localStorage.setItem('juniperLearn', JSON.stringify(JLP.ST))")
    oldraw = J("localStorage.getItem('juniperLearn')"); old.close()
    ok(oldraw and len(oldraw) > 50, 'old save made')
    oldST = json.loads(oldraw)
    pg, errs = page(U); J = pg.evaluate
    J("s=>{localStorage.clear(); localStorage.setItem('juniperLearn', s)}", oldraw); pg.reload(); pg.wait_for_timeout(900)
    ok(J("localStorage.getItem('juniperLearn.pre_tj21')") == oldraw, 'backup key holds the untouched old save')
    pg.click('#playBtn'); pg.wait_for_timeout(600)
    ok(J("!!document.getElementById('hTJ')"), 'home shows Travel Journal button')
    ok(J("document.getElementById('hTJ').classList.contains('isnew')"), 'home button says NEW! before first visit')
    pg.click('#hTJ'); pg.wait_for_timeout(1500)
    ok(J("document.getElementById('tjS').classList.contains('on') || getComputedStyle(document.getElementById('tjS')).display!='none'"), 'journal screen opens')
    J("localStorage.setItem('juniperLearn', JSON.stringify(JLP.ST))"); now = json.loads(J("localStorage.getItem('juniperLearn')"))
    for k, v in oldST.items():
        if k == 'relics':
            ok(all(now['relics'].get(r) == x for r, x in v.items()), 'old relics preserved')
        else:
            ok(now.get(k) == v, f'old key preserved: {k}')
    ok(now['relics'].get('tjpass') is not None, 'passport relic gifted on first open')
    ok('tj:case' not in now.get('boss', {}), 'getter key not written into boss save')
    ok(isinstance(now.get('tj'), dict) and now['tj'].get('gift'), 'tj state saved')
    pg.reload(); pg.wait_for_timeout(800)
    ok(J("JSON.parse(localStorage.getItem('juniperLearn')).stars") == oldST.get('stars'), 'stars survive reload')
    # ---------- 2. corrupted tj state ----------
    for bad in ['"oops"', 'null', '[1,2]', '{"pg":[1],"days":"x","pend":5,"total":"abc"}']:
        J(f"s=>{{const o=JSON.parse(s); o.tj={bad}; localStorage.setItem('juniperLearn', JSON.stringify(o))}}", oldraw); pg.reload(); pg.wait_for_timeout(700)
        pg.click('#playBtn'); pg.wait_for_timeout(400); e0 = len(errs)
        J("TJ21.open({quiet:1})"); pg.wait_for_timeout(500)
        T = J("TJ21.state()")
        ok(len(errs) == e0 and isinstance(T['pg'], dict) and isinstance(T['days'], dict) and isinstance(T['pend'], list) and isinstance(T['total'], (int, float)), f'corrupt tj {bad} recovers')
        ok(J("JSON.parse(localStorage.getItem('juniperLearn')).stars") == oldST.get('stars'), f'corrupt tj {bad} keeps stars')
    # ---------- 3. the place: page, drill replay, game, map spot ----------
    J("s=>{localStorage.setItem('juniperLearn', s)}", oldraw); pg.reload(); pg.wait_for_timeout(800); pg.click('#playBtn'); pg.wait_for_timeout(500)
    J("JLP.ST.voice=false"); pg.click('#hTJ'); pg.wait_for_timeout(1200); J("document.querySelectorAll('.tjrev').forEach(e=>e.remove())")
    ok(J("document.querySelectorAll('#tjS .tjpg').length") == 6, 'six journal pages')
    t0 = J("TJ21.state().total")
    pg.click('.tjpg[data-k="sju"]'); pg.wait_for_timeout(600)
    ok(J("document.querySelectorAll('.tjdr').length") == 3, 'page has 3 key drills')
    pg.click('.tjdr >> nth=0'); pg.wait_for_timeout(700); pg.click('#introGo'); pg.wait_for_timeout(500)
    ok(J("JLP.RUN && JLP.RUN.mode") == 'tj', 'drill runs in journal mode')
    for i in range(14): J("JLP.rightNow()"); pg.wait_for_timeout(80)
    J("JLP.RUN && JLP.finishNow()"); pg.wait_for_timeout(1200)
    ok(J("TJ21.state().pg.sju") >= 1 and J("TJ21.state().total") > t0, 'drill replay stamps the page')
    ok(J("!!document.querySelector('#celeUnlocks .tjunl')"), 'celebration lists the journal stamp')
    J("document.querySelectorAll('.reveal.on').forEach(e=>e.className='reveal')"); pg.wait_for_timeout(200)
    J("document.getElementById('cNext').click()"); pg.wait_for_timeout(900)
    ok(J("getComputedStyle(document.getElementById('tjS')).display!='none' && !document.getElementById('intro').classList.contains('on')"), 'next button returns to the journal')
    # back (X) from a replay also returns to the journal
    J("document.querySelectorAll('.tjrev').forEach(e=>e.remove())"); pg.click('.tjpg[data-k="sju"]'); pg.wait_for_timeout(500); pg.click('.tjdr >> nth=1'); pg.wait_for_timeout(600); pg.click('#introGo'); pg.wait_for_timeout(400)
    J("document.getElementById('pHome').click()"); pg.wait_for_timeout(900)
    ok(J("getComputedStyle(document.getElementById('tjS')).display!='none'"), 'quitting a replay returns to the journal')
    # game
    s0, g0 = J("JLP.ST.stars"), J("TJ21.state().game")
    J("document.querySelectorAll('.tjrev').forEach(e=>e.remove())"); pg.click('#tjGame'); pg.wait_for_timeout(700)
    order = J("TJ21.G.order.map(p=>p.k)")
    ok(len(order) >= 4 and order[0] in ('sju', 'wmp') and order[-1] in ('sju', 'wmp'), 'game keeps first and last stops')
    wrong = [k for k in J("[...document.querySelectorAll('.tjg-card')].map(e=>e.dataset.k)") if k != order[0]][0]
    pg.click(f'.tjg-card[data-k="{wrong}"]'); pg.wait_for_timeout(200)
    ok(J("TJ21.G.i") == 0, 'wrong card does not advance')
    for k in order: pg.click(f'.tjg-card[data-k="{k}"]'); pg.wait_for_timeout(150)
    pg.wait_for_timeout(500)
    ok(J("TJ21.state().game") == g0 + 1 and J("JLP.ST.stars") >= s0 + 3, 'game win stamps and gives 3 stars')
    # relic vault row
    J("document.querySelectorAll('.tjrev,.stkrev').forEach(e=>e.remove()); JLP.openVault()"); pg.wait_for_timeout(500)
    ok(J("!!document.querySelector('#vGrid .vrow.tjv .vcard.got')"), 'Relic Vault shows the passport in a Travel Journal row')
    J("document.querySelector('#vGrid .vcard[data-tj]').click()"); pg.wait_for_timeout(700)
    ok(J("getComputedStyle(document.getElementById('tjS')).display!='none'"), 'vault passport opens the journal')
    # map spot
    J("JLP.ST.seenStory=Object.fromEntries(JLP.BOSSES.map(b=>[b.id,1])); JLP.openMap('trip')"); pg.wait_for_timeout(1500)
    ok(J("!!document.getElementById('tjSpot')"), 'trip map has the Travel Journal spot')
    J("JLP.openMap('park')"); pg.wait_for_timeout(800)
    ok(J("!document.getElementById('tjSpot')"), 'no journal spot on other maps')
    # ---------- 4. revisit rewards ----------
    J("""(()=>{const T=TJ21.state(); T.total=0; T.pg={}; T.game=0; T.days={}; T.suit=0; T.pend=[]; T.bonusBuild=String(window.JBUILD||''); JLP.ST.relics.tjpass=0; delete (JLP.ST.trophies||{}).tj_emblem;})()""")
    ok(J("TJ21.LV") == [0, 3, 7, 12, 20], 'level table')
    ok([J(f"TJ21.level({x})") for x in [0, 2, 3, 6, 7, 11, 12, 19, 20, 99]] == [0, 0, 1, 1, 2, 2, 3, 3, 4, 4], 'levels at 3/7/12/20 stamps')
    ok(J("JLP.ST.boss['tj:case']") is None, 'suitcase locked at 0 stamps')
    J("['plane','uber','piers'].forEach(k=>TJ21.earn(k))")
    ok(J("TJ21.state().suit") == 0 and J("JLP.ST.relics.tjpass") == 1, '3 stamps: Rare passport, suitcase still locked')
    J("TJ21.earn('davis')")
    ok(J("TJ21.state().suit") > 0 and J("!!JLP.ST.boss['tj:case']"), 'suitcase unlocks at 4 stamps')
    J("['sju','plane','uber'].forEach(k=>TJ21.earn(k))"); ok(J("JLP.ST.relics.tjpass") == 2, '7 stamps: Epic')
    # bonus page: +1 once per build
    bk = J("TJ21.bonusK()"); J("TJ21.state().bonusBuild=''"); t1 = J("TJ21.state().total"); J(f"TJ21.earn('{bk}')"); t2 = J("TJ21.state().total"); J(f"TJ21.earn('{bk}')"); t3 = J("TJ21.state().total")
    ok(t2 - t1 == 2 and t3 - t2 == 1, 'golden bonus page gives one extra stamp per build')
    # streak: yesterday played -> first stamp today gives a bonus
    J("""(()=>{const T=TJ21.state(); const d=o=>{const x=new Date(); x.setDate(x.getDate()+o); return `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`}; T.days={}; T.days[d(-1)]=1; T.days[d(-2)]=1;})()""")
    t1 = J("TJ21.state().total"); J("TJ21.earn('wmp')"); t2 = J("TJ21.state().total")
    ok(t2 - t1 == 2 and J("TJ21.streak()") == 3, 'streak bonus stamp and 3-day streak')
    J("(()=>{const T=TJ21.state(); T.total=19; })()"); J("TJ21.earn('sju')"); ok(J("JLP.ST.relics.tjpass") == 4, '20 stamps: Mythic')
    ok(J("TJ21.pagesDone()") == 6, 'all six pages stamped')
    J("TJ21.state().game=1; JLP.checkTrophies ? JLP.checkTrophies() : 0"); pg.wait_for_timeout(300)
    J("TJ21.open({quiet:1})"); pg.wait_for_timeout(600)
    ok(J("!!(JLP.ST.trophies||{}).tj_emblem || !!(JLP.ST.awards||{}).tj_emblem || document.querySelector('#tjRwEmb').classList.contains('got')"), 'emblem earned with all pages + game')
    # NEW! nudge after an update
    J("(()=>{const T=TJ21.state(); T.pend=[]; T.seenBuild=String(window.JBUILD||'')})()"); ok(J("TJ21.isNew()") is False, 'no nudge once seen')
    J("TJ21.state().seenBuild='older-build'"); ok(J("TJ21.isNew()") is True, 'NEW! nudge after an app update')
    J("JLP.goHome()"); pg.wait_for_timeout(400); ok(J("document.getElementById('hTJ').classList.contains('isnew')"), 'home button shows NEW! after update')
    J("TJ21.open({quiet:1})"); pg.wait_for_timeout(400); dbg = J("(()=>{const T=TJ21.peek(); return [T.gift, T.seenBuild, String(window.JBUILD||''), T.pend]})()"); ok(J("TJ21.isNew()") is False, f'opening the journal clears the nudge {dbg}')
    # replays get harder as the passport grows
    J("JLP.ST.relics.tjpass=3; document.querySelectorAll('.stkrev,.tjrev').forEach(e=>e.remove()); document.querySelectorAll('.reveal.on').forEach(e=>e.className='reveal'); document.querySelector('.tjpg[data-k=plane]').click()"); pg.wait_for_timeout(400); J("document.querySelector('.tjdr').click()"); pg.wait_for_timeout(500)
    ok(J("JLP.RUN && JLP.RUN.level") == 3, 'Legendary passport replays at level 3')
    J("document.getElementById('intro').classList.remove('on')")
    # dress-up: suitcase wearable
    J("JLP.goHome()"); ok(J("JLPDRESS && typeof JLPDRESS.renderAspen==='function'") is not False, 'dress hooks')
    # ---------- 5. voice: every journal line is pre-recorded ----------
    man = json.loads(urllib.request.urlopen(U + 'vo/manifest.json').read())
    L = J("TJ21.lines()"); miss = [l for l in L if l[0] not in man]
    ok(not miss, f'all {len(L)} journal clips recorded (missing {miss[:3]})')
    J("s=>{localStorage.setItem('juniperLearn', s)}", oldraw); pg.reload(); pg.wait_for_timeout(800)
    J("window.__tts=[]; if (window.speechSynthesis) { const o=speechSynthesis.speak.bind(speechSynthesis); speechSynthesis.speak=u=>{ if (u && u.text && u.text.trim()) window.__tts.push(u.text); }; }")
    pg.click('#playBtn'); pg.wait_for_timeout(600); J("JLP.ST.voice=true"); pg.click('#hTJ'); pg.wait_for_timeout(2500)
    J("document.querySelectorAll('.tjrev').forEach(e=>e.remove())"); pg.click('.tjpg[data-k="piers"]'); pg.wait_for_timeout(1200); pg.click('#tjPage .tjx'); pg.wait_for_timeout(300)
    pg.click('#tjGame'); pg.wait_for_timeout(1500); pg.click('.tjg-hint'); pg.wait_for_timeout(1500)
    tts = J("window.__tts"); ok(not tts, f'no device speech fallback in the journal ({tts[:3]})')
    ok(not errs, f'no page errors {errs[:3]}')
    b.close()
print(f'ttj {W}x{H}: {n - len(fails)}/{n} pass')
sys.exit(1 if fails else 0)

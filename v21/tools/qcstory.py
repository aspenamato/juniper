# Every frame of all 12 skate stories (voice on, so the story does not auto-finish): python3 qcstory.py W H -> v21/qc/stories/<W>_s<si>_<k>.png
import sys
from playwright.sync_api import sync_playwright
W, H = int(sys.argv[1]), int(sys.argv[2]); O = '/workspace/wt21/v21/qc/stories/'; errs = []; bad = []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--autoplay-policy=no-user-gesture-required'])
    pg = b.new_context(viewport={'width': W, 'height': H}, has_touch=True).new_page(); pg.on('pageerror', lambda e: errs.append(str(e))); J = pg.evaluate
    pg.goto('http://127.0.0.1:8821/learn/?nosw=1'); J("localStorage.clear(); localStorage.setItem('juniperLearn', JSON.stringify({v:3,stars:50,boss:{},relics:{},outfit:{},met:{park:1,skate:1}}))"); pg.reload(); pg.wait_for_timeout(1200)
    pg.click('#playBtn'); pg.wait_for_timeout(900)
    J("window.__said=[]; window.__vsink=s=>window.__said.push(JSON.parse(s))")
    for si in range(12):
        J("JLP.goHome()"); pg.wait_for_timeout(1700); J("document.querySelectorAll('#infoov.on').forEach(e=>e.classList.remove('on'))"); J(f"JLP.playStory('skate',{si},()=>{{}})"); pg.wait_for_timeout(200)
        n = J("document.querySelectorAll('#story .st-dots i').length")
        for k in range(n):
            pg.wait_for_timeout(1100)
            if not J("document.getElementById('story').classList.contains('on')"): bad.append((si, k, 'story closed')); break
            pg.screenshot(path=O + f'{W}_s{si:02d}_{k}.png')
            info = J("(()=>{const on=[...document.querySelectorAll('#story .st-dots i.on')].length; const vis=e=>e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>0; return [on, vis(document.getElementById('stBub'))]})()")
            if info[0] != k + 1: bad.append((si, k, 'dot', info[0]))
            if info[1]: bad.append((si, k, 'text bubble visible'))
            J("document.getElementById('stNext').click()")
        print(si, n, 'frames', flush=True)
    print('bad', bad); print('errs', errs)

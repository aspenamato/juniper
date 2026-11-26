# Every story frame (all worlds) where Juniper stands on the RIGHT (#stB.jun): large crop + computed transform.
# python3 qcjunmirror.py W H PORT TAG -> v21/qc/junmirror/<TAG>_<W>_<w>_<si>_<k>.png ; prints JSON summary
import sys, json, os
from playwright.sync_api import sync_playwright
W, H, PORT, TAG = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3], sys.argv[4]
O = '/workspace/wt21/v21/qc/junmirror/'; os.makedirs(O, exist_ok=True); errs = []; hits = []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--autoplay-policy=no-user-gesture-required'])
    pg = b.new_context(viewport={'width': W, 'height': H}, has_touch=True).new_page(); pg.on('pageerror', lambda e: errs.append(str(e))); J = pg.evaluate
    pg.goto(f'http://127.0.0.1:{PORT}/learn/?nosw=1'); J("localStorage.clear(); localStorage.setItem('juniperLearn', JSON.stringify({v:3,stars:50,boss:{},relics:{},outfit:{},met:{park:1,skate:1}}))"); pg.reload(); pg.wait_for_timeout(1200)
    pg.click('#playBtn'); pg.wait_for_timeout(900)
    keys = [f'{w}:{si}' for w in J("JLP.WKEYS") for si in range(16)]
    for key in keys:
        w, si = key.rsplit(':', 1)
        J("JLP.goHome()"); pg.wait_for_timeout(500); J("document.querySelectorAll('#infoov.on').forEach(e=>e.classList.remove('on'))")
        J(f"JLP.playStory({json.dumps(w)},{si},()=>{{}})"); pg.wait_for_timeout(150)
        n = J("document.getElementById('story').classList.contains('on') ? document.querySelectorAll('#story .st-dots i').length : 0")
        for k in range(n):
            pg.wait_for_timeout(450)
            if not J("document.getElementById('story').classList.contains('on')"): break
            r = J("(()=>{const b=document.getElementById('stB'); if(!b||!b.classList.contains('jun')) return null; const a=b.querySelector('svg,img'); const R=b.getBoundingClientRect(); return {t:a?getComputedStyle(a).transform:'', x:R.x,y:R.y,w:R.width,h:R.height}})()")
            if r:
                f = f'{TAG}_{W}_{w}_{si}_{k}.png'; x0 = max(0, r['x'] - 20); y0 = max(0, r['y'] - 20)
                pg.screenshot(path=O + f, clip={'x': x0, 'y': y0, 'width': min(W - x0, r['w'] + 40), 'height': min(H - y0, r['h'] + 40)})
                hits.append([w, int(si), k, r['t'], f])
            J("document.getElementById('stNext').click()")
    mir = [h for h in hits if h[3] not in ('none', '')]
    print(json.dumps({'hits': len(hits), 'mirrored': len(mir), 'worlds': sorted(set(h[0] for h in hits)), 'mirrored_list': mir[:40], 'errs': errs[:5]}))
    json.dump(hits, open(O + f'{TAG}_{W}.json', 'w'))

# harvest every VO line of the local wt21 build (skate world included) -> v21/vo/lines_all.json
import json, sys
from playwright.sync_api import sync_playwright
N = int(sys.argv[1]) if len(sys.argv) > 1 else 60
with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/usr/bin/google-chrome'); pg = b.new_page(); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://127.0.0.1:8821/learn/?nosw=1'); pg.wait_for_timeout(1200)
    lines = pg.evaluate(f'JLP.voLines({N})')
    try: extra = json.load(open('/workspace/juniper-learn/vo/extra.json'))
    except Exception: extra = []
    if extra:
        lines += pg.evaluate('(ex) => { const m = new Map(); ex.forEach(([t, ch, es]) => JLP.VO.need(t, ch, es).forEach(x => m.set(x[0], x))); return [...m.values()]; }', [[t, ch, {'es': es, 'full': True}] for t, ch, es in extra])
    print('errors', errs)
    d = {k: [k, v, s] for k, v, s in lines}
    json.dump(list(d.values()), open('/workspace/wt21/v21/vo/lines_all.json', 'w'), ensure_ascii=False)
    from collections import Counter
    print(len(d), Counter(v for k, v, s in d.values())); b.close()

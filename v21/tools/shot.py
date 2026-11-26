import sys
from playwright.sync_api import sync_playwright
U='http://127.0.0.1:8821/learn/'; W,H=int(sys.argv[1]),int(sys.argv[2]); out=sys.argv[3]; js=sys.argv[4:]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome'); pg=b.new_context(viewport={'width':W,'height':H},has_touch=True).new_page(); J=pg.evaluate
    errs=[]; pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.goto(U+'?nosw=1'); J("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(800); pg.click('#playBtn'); pg.wait_for_timeout(800)
    J("JLP.ST.voice=false"); 
    for i,s in enumerate(js):
        if s.startswith('click:'): pg.click(s[6:],force=True)
        elif s.startswith('wait:'): pg.wait_for_timeout(int(s[5:]))
        elif s.startswith('shot:'): pg.screenshot(path=out+'_'+s[5:]+'.png')
        else: print(J(s))
        pg.wait_for_timeout(400)
    print('errs',errs)

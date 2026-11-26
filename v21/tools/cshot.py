import sys
from playwright.sync_api import sync_playwright
W,H=int(sys.argv[1]),int(sys.argv[2]); out=sys.argv[3]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome'); pg=b.new_page(viewport={'width':W,'height':H}); errs=[]
    pg.on('pageerror',lambda e: errs.append(str(e)))
    pg.goto('http://127.0.0.1:8821/'); pg.wait_for_timeout(800)
    pg.evaluate("localStorage.setItem('juniperRewards',JSON.stringify({stickers:[],scenes:['sk_dobson','sk_rock','sk_cocoa','sk_wollman']})); localStorage.setItem('jcp_seenScenes',JSON.stringify(['sk_dobson','sk_rock','sk_cocoa','sk_wollman']))")
    pg.goto('http://127.0.0.1:8821/?book=skate'); pg.wait_for_timeout(2500)
    pg.screenshot(path=out+'_grid.png')
    pg.click('.card[data-page=sk_rock]'); pg.wait_for_timeout(2500); pg.screenshot(path=out+'_page.png')
    pg.mouse.click(W//2, H//2); pg.wait_for_timeout(500); pg.screenshot(path=out+'_fill.png')
    print('errs',errs)

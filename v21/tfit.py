# banner/label overflow test — python3 v21/tfit.py W H [url]
# Fails when a banner, ribbon, title, tile, button or label clips, overflows, ellipsizes a name, or breaks a single word.
import sys, json, os
from playwright.sync_api import sync_playwright

W,H=int(sys.argv[1]),int(sys.argv[2])
U=sys.argv[3] if len(sys.argv)>3 else 'http://127.0.0.1:8841/learn/?nosw=1'

UNLOCK=r"""()=>{
  const ST=JLP.ST; ST.voice=false; ST.stars=480; ST.path=9999;
  ST.wp=Object.assign({},ST.wp||{},{park:99,trip:99,pr:99,nyc:99,vail:99,sc:99,skate:99});
  ST.met=Object.assign({},ST.met||{},{trip:1,pr:1,nyc:1,vail:1,sc:1,skate:1});
  try{TJ21.home()}catch(e){}
  try{JLPSK.tile()}catch(e){}
}"""
DISMISS=r"""()=>{
  document.querySelectorAll('.ic-close,#meetGo,.sk-meet .bigbtn,#serGo,.ser-card .bigbtn').forEach(b=>{try{b.click()}catch(e){}});
  document.querySelectorAll('#cele.on,.infocard,.skemrev,.stkrev,.meet.on').forEach(e=>{e.classList.remove('on');});
}"""
CHK=r"""()=>{
  const out=[], seen=new Set();
  const push=o=>{const k=JSON.stringify(o); if(!seen.has(k)){seen.add(k); out.push(o);}};
  const root=[...document.querySelectorAll('.screen.on')].pop()||document.body;
  const sid=(root.id||'').toString();
  const skip='script,style,.bubble,.chatbub,#chatBub,.hintbub,.introline,.bb-bub,.st-bub,#bubble';
  const sels='.maptitle,#hHello,.hello,.hdr,.st-title,.tile b,.tile small,.accard b,.acsteps span,.pc-name,.pc-special,.tjpg-nm,.tjrw-i b,.tjrw-i small,.arcard b,.skcard b,.card b,.vc-n,.tjh-l';
  const vis=r=>r && r.width>1 && r.height>1;

  for(const el of root.querySelectorAll(sels)){
    if(el.closest(skip)) continue;
    const cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0) continue;
    const t=(el.innerText||el.textContent||'').replace(/\s+/g,' ').trim();
    if(!t||t.length>80) continue;
    const info={screen:sid, el:(el.id||el.className||el.tagName).toString().slice(0,40), text:t.slice(0,48)};
    // ellipsis actually cutting a name
    if((cs.textOverflow==='ellipsis') && el.scrollWidth>el.clientWidth+1)
      push(Object.assign({},info,{kind:'ellipsis',sw:el.scrollWidth,cw:el.clientWidth}));
    // hidden overflow cutting glyphs
    if((cs.overflowX==='hidden'||cs.overflow==='hidden') && el.scrollWidth>el.clientWidth+2)
      push(Object.assign({},info,{kind:'scroll',sw:el.scrollWidth,cw:el.clientWidth}));
    // text rects clearly outside the label's own box (2px slop, no radius inset)
    const pr=el.getBoundingClientRect();
    if(vis(pr)){
      const rg=document.createRange();
      for(const n of el.childNodes){
        if(n.nodeType!==3 || !n.textContent.trim()) continue;
        try{ rg.selectNodeContents(n); }catch(e){ continue; }
        for(const r of rg.getClientRects()){
          if(r.width<2) continue;
          if(r.left<pr.left-2 || r.right>pr.right+2)
            { push(Object.assign({},info,{kind:'outside'})); break; }
        }
      }
    }
    // a single word split across lines
    const rg=document.createRange();
    for(const n of el.childNodes){
      if(n.nodeType!==3) continue;
      const s=n.textContent||''; const re=/[^\s]{4,}/g; let m;
      while((m=re.exec(s))){
        try{ rg.setStart(n,m.index); rg.setEnd(n,m.index+m[0].length);
          const rs=[...rg.getClientRects()].filter(r=>r.height>0.5);
          if(rs.length>=2 && Math.max(...rs.map(r=>r.top))-Math.min(...rs.map(r=>r.top))>5)
            { push(Object.assign({},info,{kind:'wordbreak',word:m[0].slice(0,24)})); break; }
        }catch(e){}
      }
    }
  }

  // SVG map banners: title (and subtitle) must sit inside the ribbon
  const scope=document.getElementById('mapSvg')||root;
  scope.querySelectorAll('g.banner').forEach(g=>{
    const texts=[...g.querySelectorAll('text')];
    const body=[...g.querySelectorAll('rect')].find(r=>+r.getAttribute('width')>=400);
    const max=(body?+body.getAttribute('width'):500)-36;
    texts.slice(0,2).forEach((t,i)=>{
      const name=(t.textContent||'').replace(/\s+/g,' ').trim(); if(!name) return;
      let len=0; try{ len=t.getComputedTextLength(); }catch(e){ return; }
      const sw=parseFloat(t.getAttribute('stroke-width')||0)||0;
      if(len+sw*0.6>max+1)
        push({screen:sid, el:'svg:banner', text:name.slice(0,48), kind:'svg', len:Math.round(len+sw*0.6), max:Math.round(max)});
    });
  });
  // stop names must not be shortened with an ellipsis
  scope.querySelectorAll('g.node text, g.bnode text').forEach(t=>{
    const name=(t.textContent||'').trim();
    if(/…|\.\.\./.test(name))
      push({screen:sid, el:'svg:node', text:name.slice(0,48), kind:'truncated'});
  });
  return out;
}"""

SCREENS=[
    ('home','JLP.goHome()'),
    ('arcade','JLPARC.openArcade()'),
    ('stickers','JLPSTK.openStickers()'),
    ('trials','JLPSTK.openTrials()'),
    ('acad','JLPACAD.openAcademy()'),
    ('dress','JLP.openDress()'),
    ('aspen','JLPDRESS.openAspen()'),
    ('vault','JLP.openVault()'),
    ('tmap','JLPRW.openTMap()'),
    ('trophies','JLP.openTrophies()'),
    ('worlds','JLP.openWorlds()'),
    ('journal','try{TJ21.open({quiet:1})}catch(e){}'),
    ('skhub','try{JLPSK.openHub()}catch(e){}'),
    ('skgames','try{JLPSK.openHub("games")}catch(e){}'),
    ('skpractice','try{JLPSK.openHub("practice")}catch(e){}'),
]
MAPS=['park','trip','pr','nyc','vail','sc','skate']

fails=0; tot=0
with sync_playwright() as p:
    b=p.webkit.launch() if os.environ.get('WK') else p.chromium.launch(executable_path='/usr/bin/google-chrome')
    pg=b.new_page(viewport={'width':W,'height':H})
    pg.goto(U, wait_until='domcontentloaded'); pg.wait_for_timeout(1100)
    if pg.query_selector('#playBtn'):
        pg.click('#playBtn', force=True); pg.wait_for_timeout(700)
    pg.evaluate("try{JLP.ST.voice=false}catch(e){}")
    pg.evaluate(UNLOCK); pg.wait_for_timeout(200)
    pg.evaluate("try{JLP.goHome()}catch(e){}"); pg.wait_for_timeout(350)
    pg.evaluate(UNLOCK)
    def check(name):
        global fails,tot
        pg.evaluate(DISMISS); pg.wait_for_timeout(150)
        try: pg.evaluate("if(window.JLPFIT21)JLPFIT21.run()")
        except Exception: pass
        pg.wait_for_timeout(200)
        r=pg.evaluate(CHK)
        tot+=1
        print(('FAIL ' if r else 'ok   ')+name, json.dumps(r[:8], ensure_ascii=False) if r else '', flush=True)
        fails+=len(r)
        return r
    for name,fn in SCREENS:
        try:
            pg.evaluate("try{JLP.ST.voice=false}catch(e){};"+fn)
            pg.wait_for_timeout(600)
            check(name)
            pg.evaluate("try{JLP.goHome()}catch(e){}"); pg.wait_for_timeout(200)
        except Exception as e:
            print('ERR  '+name, type(e).__name__, str(e)[:160], flush=True); tot+=1; fails+=1
    for wk in MAPS:
        try:
            pg.evaluate(f"try{{JLP.ST.voice=false; JLP.openMap({wk!r})}}catch(e){{}}")
            pg.wait_for_timeout(800)
            for _ in range(3):
                pg.evaluate(DISMISS); pg.wait_for_timeout(120)
            try: pg.evaluate("if(window.JLPFIT21)JLPFIT21.run()")
            except Exception: pass
            pg.wait_for_timeout(200)
            check('map-'+wk)
            pg.evaluate("try{JLP.goHome()}catch(e){}"); pg.wait_for_timeout(180)
        except Exception as e:
            print('ERR  map-'+wk, type(e).__name__, str(e)[:160], flush=True); tot+=1; fails+=1
    # coloring home
    try:
        cu=U.replace('/learn/','/').replace('/learn','/')
        if '?nosw' in cu: cu=cu.split('?')[0]
        pg.goto(cu, wait_until='domcontentloaded'); pg.wait_for_timeout(900)
        r=pg.evaluate(CHK); tot+=1
        print(('FAIL ' if r else 'ok   ')+'color-home', json.dumps(r[:6], ensure_ascii=False) if r else '', flush=True)
        fails+=len(r)
    except Exception as e:
        print('ERR  color-home', type(e).__name__, str(e)[:160], flush=True); tot+=1; fails+=1
    b.close()
print(f'tfit {W}x{H}: screens {tot} FAILS {fails}')
raise SystemExit(1 if fails else 0)

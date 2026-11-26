import re, json, os, time, hashlib
S='/workspace/sk21/src/'; CS='/workspace/juniper-coloring/src/'; OUT=os.environ.get('LEARN_OUT','/workspace/wt21/learn/');
OUT=os.path.join(os.path.abspath(OUT),'')  # ensure trailing slash
VO=json.load(open(S+'voices.json'))
app=open(S+'app.js').read()
for ph,f in [('//@@AWARDS','awards.js'),('//@@WORLDS','worlds.js'),('//@@BOSS','boss.js'),('//@@RELICS','relics.js'),('//@@STORY','story.js'),('//@@MAP3','map3.js'),('//@@V4','v4.js'),('//@@VOLINES','volines.js'),('//@@VO\n','vo.js'),('//@@MUSIC','music.js'),('//@@FX','fx.js'),('//@@V15','v15.js'),('//@@V16','v16.js'),('//@@HINTS16','hints16.js'),('//@@ARCADE','arcade.js'),('//@@ACAD','academy.js'),('//@@DRESS16','dress16.js'),('//@@STK','stickers.js'),('//@@RW16','rewards16.js'),('//@@V17','v17.js'),('//@@FIT17','fit17.js'),('//@@FIT18D','fit18_data.js'),('//@@FIT18','fit18.js'),('//@@SPIN19D','spin19_data.js'),('//@@SPIN19','spin19.js')]:
    if ph in app: app=app.replace(ph,((open(S+'map4.js').read()+'\n' if f=='map3.js' and os.path.exists(S+'map4.js') else '')+open(S+f).read() if os.path.exists(S+f) else '')+('\n' if ph.endswith('\n') else ''))
# t106u Travel Journal (tj21): inserted inside the app closure right before boot; css appended. Keep this hook.
if os.path.exists(S+'tj21.js'): app=app.replace('\nbuildTitle(); bootWait();','\n'+open(S+'tj21.js').read()+'\nbuildTitle(); bootWait();',1)
# t106u Ice Skating World (skate21): app code before boot (after tj21), content generators inside CONTENT, css appended. Keep this hook.
if os.path.exists(S+'skate21.js'): app=app.replace('\nbuildTitle(); bootWait();','\n'+open(S+'skate21.js').read()+'\nbuildTitle(); bootWait();',1)
# t107u My Passport (pp21): after skate21 (reads its rinks). Keep this hook.
if os.path.exists(S+'pp21.js'): app=app.replace('\nbuildTitle(); bootWait();','\n'+open(S+'pp21.js').read()+'\nbuildTitle(); bootWait();',1)
# t108u label/banner fit (fit21): after pp21/skate so it can wrap renderMap. Keep this hook.
if os.path.exists(S+'fit21.js'): app=app.replace('\nbuildTitle(); bootWait();','\n'+open(S+'fit21.js').read()+'\nbuildTitle(); bootWait();',1)
app=app.replace('/*VOICES*/{}',json.dumps(VO,separators=(',',':')))
css=open(S+'style.css').read()+open(S+'v2.css').read()+(open(S+'v3.css').read() if os.path.exists(S+'v3.css') else '')+(open(S+'v4.css').read() if os.path.exists(S+'v4.css') else '')+open(S+'art.css').read()+open(S+'fx.css').read()+(open(S+'v6.css').read() if os.path.exists(S+'v6.css') else '')+(open(S+'v15.css').read() if os.path.exists(S+'v15.css') else '')+''.join(open(S+c).read() for c in ['v16.css','hints16.css','academy.css','arcade.css','stickers.css','rewards16.css','dress16.css','v17.css','v18.css','spin19.css'] if os.path.exists(S+c))
css+=(open(S+'tj21.css').read() if os.path.exists(S+'tj21.css') else '')  # t106u Travel Journal
css+=(open(S+'skate21.css').read() if os.path.exists(S+'skate21.css') else '')  # t106u Ice Skating World
css+=(open(S+'pp21.css').read() if os.path.exists(S+'pp21.css') else '')  # t107u My Passport
css+=(open(S+'fit21.css').read() if os.path.exists(S+'fit21.css') else '')  # t108u label/banner fit
parts={'CSS':css,'ART':open(CS+'art.js').read(),'EXTRA':open(CS+'extra_stickers.js').read(),'VOICE':open(CS+'voice.js').read(),
 'ICONS':open(S+'icons.js').read(),'CHARS':open(S+'chars2.js').read().replace('//@@CHARS3',(open(S+'chars3.js').read() if os.path.exists(S+'chars3.js') else '')+(open(S+'chars4.js').read() if os.path.exists(S+'chars4.js') else '')+(open(S+'chars5.js').read() if os.path.exists(S+'chars5.js') else '')),'DATA':json.dumps(json.load(open('/workspace/juniper-learn/data/content.json')),ensure_ascii=False,separators=(',',':')),
 'CONTENT':open(S+'content.js').read().replace('//@@TRAVEL',open(S+'travel.js').read()+(open(S+'skate21c.js').read() if os.path.exists(S+'skate21c.js') else '')),'APP':app}
h=open(S+'shell.html').read()
h=re.sub(r'/\*(CSS|ART|EXTRA|VOICE|ICONS|CHARS|DATA|CONTENT|APP)\*/',lambda m:parts[m.group(1)].replace('</script','<\\/script'),h)
build=time.strftime('%Y%m%d%H%M%S')+'-'+hashlib.sha1(h.encode()).hexdigest()[:6]
h=h.replace('/*BUILD*/',build)
os.makedirs(OUT,exist_ok=True)
open(OUT+'index.html','w').write(h)
open(OUT+'sw.js','w').write(open(S+'sw.js').read().replace('/*BUILD*/',build))
json.dump({'v':build},open(OUT+'version.json','w'))
print(len(h),build)

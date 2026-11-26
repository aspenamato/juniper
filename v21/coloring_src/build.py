import re
src='/workspace/juniper-coloring/src/'
h=open(src+'shell.html').read()
h=h.replace('/*CSS*/',open(src+'style.css').read()+open('/workspace/juniper-learn/src/fx.css').read()).replace('/*ART*/',open(src+'art.js').read()+'\n'+open(src+'art3.js').read()+'\n'+open(src+'art2.js').read()+'\n'+open(src+'art4.js').read()+'\n'+open(src+'art6.js').read()+'\n'+open(src+'art5.js').read()).replace('/*EXTRA*/',open(src+'extra_stickers.js').read()).replace('/*VOICE*/',open(src+'voice.js').read()).replace('/*APP*/',open(src+'app.js').read().replace('//@@MUSIC',open('/workspace/juniper-learn/src/music.js').read()).replace('//@@FX',open('/workspace/juniper-learn/src/fx.js').read()))
import time,hashlib,json
stamp=time.strftime('%Y%m%d%H%M%S')+'-'+hashlib.md5(h.encode()).hexdigest()[:6]
h=h.replace('/*CBUILD*/',stamp)
open('/workspace/juniper-coloring/index.html','w').write(h)
open('/workspace/juniper-coloring/cversion.json','w').write(json.dumps({'v':stamp}))
print(stamp)
print(len(h))

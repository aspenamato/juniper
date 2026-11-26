# t106u Ice Skating World: add the new speakers to a voices.json (idempotent). usage: python3 voices_add.py path/to/voices.json
import json,sys
p=sys.argv[1]; d=json.load(open(p)); V=d['V']; CH=d['CH']
newV={'val':['en-US-MichelleNeural','+6%','+24Hz'],'eval':['es-PR-KarinaNeural','+8%','+30Hz'],
 'nik':['en-US-BrianMultilingualNeural','+8%','+30Hz'],'enik':['es-PR-VictorNeural','+10%','+30Hz'],
 'lan':['en-US-EricNeural','+10%','+36Hz'],'elan':['es-PR-VictorNeural','+12%','+38Hz'],
 'oli':['en-CA-ClaraNeural','+6%','+30Hz'],'eoli':['es-PR-KarinaNeural','+6%','+36Hz'],
 'sof':['en-US-AriaNeural','+6%','+28Hz'],'esof':['es-PR-KarinaNeural','+4%','+22Hz'],
 'vwb':['en-KE-ChilembaNeural','+10%','+18Hz'],'vbu':['en-TZ-ElimuNeural','+8%','+12Hz'],'vfg':['en-NZ-MollyNeural','-10%','-6Hz'],
 'vch':['en-CA-LiamNeural','+6%','+14Hz'],'vau':['en-SG-LunaNeural','+4%','+10Hz']}
newCH={'valentina':['val','eval'],'nikko':['nik','enik'],'landen':['lan','elan'],'olivia':['oli','eoli'],'sofia':['sof','esof'],
 'vwobble':['vwb','ves'],'vbumpy':['vbu','ves'],'vfog':['vfg','ves'],'vchomp':['vch','ves'],'vaurora':['vau','ves']}
for k,v in newV.items(): V.setdefault(k,v)
for k,v in newCH.items(): CH.setdefault(k,v)
json.dump(d,open(p,'w'),ensure_ascii=False,separators=(',',':'))
print('voices ok',len(V),len(CH))

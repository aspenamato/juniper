# whisper only clips added since a manifest snapshot: python3 whisper_new.py OLD_MANIFEST
import json, sys, subprocess, difflib, re, numpy as np
from faster_whisper import WhisperModel
def load(f): a = np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],capture_output=True).stdout,np.int16).astype(np.float32)/32768; return np.concatenate([np.zeros(8000,np.float32),a,np.zeros(16000,np.float32)])
norm = lambda t: ' '.join(re.sub(r'[^a-z0-9ñáéíóúü ]',' ',t.lower().replace('-',' ')).split())
old = json.load(open(sys.argv[1])); L = json.load(open('/workspace/wt21/v21/vo/lines_all.json'))
items = L.items() if isinstance(L, dict) else [(x[0], x) for x in L]
EN = WhisperModel('small.en',device='cpu',compute_type='float32',cpu_threads=8); ES = WhisperModel('small',device='cpu',compute_type='float32',cpu_threads=8)
out=[]
for k, r in items:
    if k in old: continue
    v, s = (r[1], r[2]) if isinstance(r, list) else (r['v'], r['t'])
    es = v in ('jes','ves','eter','igig') or v.startswith('e') and v not in ('eter',)
    M, kw = (ES, {'language':'es'}) if v in ('jes','ves','eter','igig') else (EN, {})
    t = ' '.join(x.text.strip() for x in M.transcribe(load(f'/workspace/wt21/learn/vo/{k}.mp3'),condition_on_previous_text=False,**kw)[0])
    sc = round(difflib.SequenceMatcher(None,norm(s),norm(t)).ratio(),2); out.append([k,v,s,t,sc])
out.sort(key=lambda x:x[4]); json.dump(out,open('/workspace/wt21/v21/vo/whisper_2b.json','w'),ensure_ascii=False,indent=0)
print(len(out),'checked, <0.8:',sum(x[4]<0.8 for x in out))
for x in out[:15]: print(x)

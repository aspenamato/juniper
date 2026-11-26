# Whisper (small.en AND medium.en; small for es) every clip added since OLD manifest: python3 whisper_new2.py OLD OUT.json
import json, sys, subprocess, difflib, re, numpy as np
from faster_whisper import WhisperModel
def load(f): a = np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],capture_output=True).stdout,np.int16).astype(np.float32)/32768; return np.concatenate([np.zeros(8000,np.float32),a,np.zeros(16000,np.float32)])
norm = lambda t: ' '.join(re.sub(r'[^a-z0-9ñáéíóúü ]',' ',t.lower().replace('ò','o').replace('-',' ')).split())
old = json.load(open(sys.argv[1])); L = [x for x in json.load(open('/workspace/wt21/v21/vo/lines_all.json')) if x[0] not in old]
ES = ('jes','ves','eter','igig','les','mes'); M = [WhisperModel(m,device='cpu',compute_type='float32',cpu_threads=8) for m in ('small.en','medium.en')]; MS = WhisperModel('small',device='cpu',compute_type='float32',cpu_threads=8)
out = []
for k, v, s in L:
    a = load(f'/workspace/wt21/learn/vo/{k}.mp3'); isES = v in ES or (v.startswith('e') and v not in ('eter',) and len(v) == 4)
    ts = [' '.join(x.text.strip() for x in MS.transcribe(a, language='es', condition_on_previous_text=False)[0])] if isES else [' '.join(x.text.strip() for x in m.transcribe(a, beam_size=5, condition_on_previous_text=False)[0]) for m in M]
    sc = [round(difflib.SequenceMatcher(None, norm(s), norm(t)).ratio(), 2) for t in ts]
    asp = all(re.search(r'\baspen', t.lower()) for t in ts) if 'aspen' in s.lower() and not isES else None
    out.append([k, v, s, ts, sc, asp]); print(out[-1], flush=True)
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=0)

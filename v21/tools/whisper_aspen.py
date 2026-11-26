# every clip whose text says "Aspen": does Whisper hear "Aspen"? small.en, then base.en/medium.en second opinion on misses -> v21/vo/whisper_aspen.json
import json, subprocess, re, numpy as np, os
from faster_whisper import WhisperModel
def load(f): a = np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],capture_output=True).stdout,np.int16).astype(np.float32)/32768; return np.concatenate([np.zeros(8000,np.float32),a,np.zeros(16000,np.float32)])
L = [x for x in json.load(open('/workspace/wt21/v21/vo/lines_all.json')) if 'aspen' in x[2].lower() and os.path.exists(f'/workspace/wt21/learn/vo/{x[0]}.mp3')]
ES = ('jes','ves','eter','igig')
M = WhisperModel('small.en',device='cpu',compute_type='float32',cpu_threads=8); MS = WhisperModel('small',device='cpu',compute_type='float32',cpu_threads=8)
heard = lambda t: bool(re.search(r'\baspen', t.lower()))
out = []; miss = []
for k, v, s in L:
    m, kw = (MS, {'language':'es'}) if v in ES else (M, {})
    a = load(f'/workspace/wt21/learn/vo/{k}.mp3'); t = ' '.join(x.text.strip() for x in m.transcribe(a, condition_on_previous_text=False, **kw)[0])
    r = [k, v, s, t, heard(t)]; out.append(r)
    if not r[4]: miss.append((r, a))
print(len(out), 'checked; small misses', len(miss), flush=True)
B = WhisperModel('medium.en',device='cpu',compute_type='float32',cpu_threads=8)
for r, a in miss:
    if r[1] in ES: continue
    t2 = ' '.join(x.text.strip() for x in B.transcribe(a, beam_size=5, condition_on_previous_text=False)[0]); r.append(t2); r[4] = heard(t2)
json.dump(out, open('/workspace/wt21/v21/vo/whisper_aspen.json','w'), ensure_ascii=False, indent=0)
bad = [r for r in out if not r[4]]; print('still not heard', len(bad))
for r in bad: print(r)

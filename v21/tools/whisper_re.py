# second pass on flagged clips: base.en float32 (English) / small (Spanish), padded; prints what still looks wrong
import json, subprocess, difflib, re, numpy as np
from faster_whisper import WhisperModel
def load(f): a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-f', 's16le', '-ac', '1', '-ar', '16000', '-'], capture_output=True).stdout, np.int16).astype(np.float32) / 32768; return np.concatenate([np.zeros(8000, np.float32), a, np.zeros(16000, np.float32)])
d = json.load(open('/workspace/wt21/v21/vo/whisper.json'))
norm = lambda t: ' '.join(re.sub(r'[^a-z0-9ñáéíóúü ]', ' ', t.lower().replace('-', ' ')).split())
EN = WhisperModel('base.en', device='cpu', compute_type='float32', cpu_threads=8); ES = WhisperModel('small', device='cpu', compute_type='float32', cpu_threads=8)
still = []
for r in d:
    if r[4] >= 0.75: continue
    k, v, s = r[:3]; es = v in ('jes', 'ves', 'eter', 'igig')
    best = r[4]; bt = r[3]
    for M, kw in ([(ES, {'language': 'es'})] if es else [(EN, {}), (EN, {'beam_size': 5})]):
        t = ' '.join(x.text.strip() for x in M.transcribe(load(f'/workspace/wt21/learn/vo/{k}.mp3'), condition_on_previous_text=False, **kw)[0])
        sc = difflib.SequenceMatcher(None, norm(s), norm(t)).ratio()
        if sc > best: best, bt = sc, t
    r[3], r[4] = bt, round(best, 2)
    if best < 0.75: still.append(r)
json.dump(d, open('/workspace/wt21/v21/vo/whisper.json', 'w'), ensure_ascii=False, indent=0)
print('still', len(still), 'of', len(d))
for x in still: print(x)

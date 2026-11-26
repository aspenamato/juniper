# whisper-check new skate clips: every clip of the new voices + a sample of the rest; flags word-level mismatches
import json, random, re, sys, subprocess, numpy as np
def load(f): return np.frombuffer(subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f, '-f', 's16le', '-ac', '1', '-ar', '16000', '-'], capture_output=True).stdout, np.int16).astype(np.float32) / 32768
from faster_whisper import WhisperModel
a = json.load(open('/workspace/wt21/v21/vo/added.json')); random.seed(7)
NEW = {'val', 'sof', 'oli', 'nik', 'lan', 'vfg', 'vwb', 'vch', 'vau', 'vbu', 'jes', 'ves', 'eter', 'igig'}
pick = [l for l in a if l[1] in NEW] + random.sample([l for l in a if l[1] not in NEW], 160)
m = WhisperModel('small', device='cpu', compute_type='int8')
norm = lambda t: re.sub(r'[^a-z0-9ñáéíóúü ]', ' ', t.lower().replace('-', ' ')).split()
bad = []; out = []
for k, v, s in pick:
    es = v in ('jes', 'ves', 'eter', 'igig') or v.startswith('e') and v not in ('eval',)
    au = load(f'/workspace/wt21/learn/vo/{k}.mp3'); au = np.concatenate([np.zeros(8000, np.float32), au, np.zeros(16000, np.float32)])
    segs, _ = m.transcribe(au, language='es' if es else 'en', beam_size=5, condition_on_previous_text=False)
    t = ' '.join(x.text for x in segs).strip(); A, B = norm(s), norm(t)
    import difflib; score = difflib.SequenceMatcher(None, ' '.join(A), ' '.join(B)).ratio()
    out.append([k, v, s, t, round(score, 2)])
    if score < 0.75: bad.append([k, v, s, t, round(score, 2)])
json.dump(out, open('/workspace/wt21/v21/vo/whisper.json', 'w'), ensure_ascii=False, indent=0)
print('checked', len(out), 'flagged', len(bad))
for b in bad: print(b)

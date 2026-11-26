# phase 2: Whisper-check EVERY skate clip (v21/vo/skate_lines.json). English: base.en f32 (+beam5 and small.en retry); Spanish: small f32 'es'; Italian: small 'it'.
# -> v21/vo/whisper_full.json [key, voice, text, heard, score]; prints flagged (< 0.75)
import json, subprocess, difflib, re, sys, numpy as np
from faster_whisper import WhisperModel
def load(f): a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-f', 's16le', '-ac', '1', '-ar', '16000', '-'], capture_output=True).stdout, np.int16).astype(np.float32) / 32768; return np.concatenate([np.zeros(8000, np.float32), a, np.zeros(16000, np.float32)])
num = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'five','6':'six','7':'seven','8':'eight','9':'nine','10':'ten','20':'twenty','30':'thirty'}
def norm(t):
    t = re.sub(r'[«»]', '', t.lower()).replace('-', ' ').replace('’', "'")
    w = re.sub(r"[^a-z0-9ñáéíóúüòàèì' ]", ' ', t).split(); return ' '.join(num.get(x, x) for x in w)
L = json.load(open(sys.argv[1] if len(sys.argv) > 1 else '/workspace/wt21/v21/vo/skate_lines.json'))
OUTF = sys.argv[2] if len(sys.argv) > 2 else '/workspace/wt21/v21/vo/whisper_full.json'
SP = {'jes', 'ves', 'eter', 'mes', 'escr', 'eted', 'ewin', 'ecoq', 'eflu', 'equi', 'etou', 'enic', 'emrg', 'eosc', 'eroc', 'eprl', 'evcu', 'eval', 'enik', 'elan', 'eoli', 'esof', 'les'}
EN = WhisperModel('base.en', device='cpu', compute_type='float32', cpu_threads=8); EN2 = None; SM = WhisperModel('small', device='cpu', compute_type='float32', cpu_threads=8)
out = []; bad = []
def tr(M, au, **kw): return ' '.join(x.text.strip() for x in M.transcribe(au, condition_on_previous_text=False, **kw)[0])
for i, (k, v, s) in enumerate(L):
    au = load(f'/workspace/wt21/learn/vo/{k}.mp3'); lang = 'es' if v in SP else 'it' if v == 'igig' else 'en'
    tries = [(SM, {'language': lang, 'beam_size': 5})] if lang != 'en' else [(EN, {}), (EN, {'beam_size': 5})]
    best, bt = -1, ''
    for j, (M, kw) in enumerate(tries):
        t = tr(M, au, **kw); sc = difflib.SequenceMatcher(None, norm(s), norm(t)).ratio()
        if sc > best: best, bt = sc, t
        if best >= 0.85: break
    if best < 0.75 and lang == 'en':
        if EN2 is None: EN2 = WhisperModel('small.en', device='cpu', compute_type='float32', cpu_threads=8)
        t = tr(EN2, au, beam_size=5); sc = difflib.SequenceMatcher(None, norm(s), norm(t)).ratio()
        if sc > best: best, bt = sc, t
    r = [k, v, s, bt, round(best, 2)]; out.append(r)
    if best < 0.75: bad.append(r)
    if i % 100 == 0: print(i, len(bad), flush=True); json.dump(out, open(OUTF, 'w'), ensure_ascii=False, indent=0)
json.dump(out, open(OUTF, 'w'), ensure_ascii=False, indent=0)
print('checked', len(out), 'flagged', len(bad))
for b in bad: print(b)

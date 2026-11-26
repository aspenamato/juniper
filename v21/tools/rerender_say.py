# Re-render specific clips (same key = same canon text) from a spoken-text override, best of N takes, Whisper-verified.
# python3 rerender_say.py jobs.json   jobs: [[key, voice, canon_text, say_text, [required words...]], ...]
# Overwrites the shared vo_cache + wt21/learn/vo copy and updates the manifest size. NOTE: devices that already cached the old clip keep it (sw caches clips forever).
import asyncio, json, os, sys, re, subprocess, tempfile, shutil, difflib, numpy as np, edge_tts
from faster_whisper import WhisperModel
VO = json.load(open('/workspace/sk21/src/voices.json'))['V']; CACHE = '/workspace/juniper-learn/vo_cache/'; OUT = '/workspace/wt21/learn/vo/'
AF = 'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.06,areverse'
M = [WhisperModel(m, device='cpu', compute_type='float32', cpu_threads=8) for m in ('small.en', 'medium.en')]
norm = lambda t: ' '.join(re.sub(r'[^a-z0-9 ]', ' ', t.lower().replace('ò', 'o').replace('-', ' ')).split())
def load(f): a = np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],capture_output=True).stdout,np.int16).astype(np.float32)/32768; return np.concatenate([np.zeros(8000,np.float32),a,np.zeros(16000,np.float32)])
man = json.load(open(OUT + 'manifest.json')); res = []
for k, v, canon, say, req in json.load(open(sys.argv[1])):
    voice, rate, pitch = VO[v]; best = None
    for take in range(int(os.environ.get('TAKES', 8))):
        raw = tempfile.mktemp(suffix='.mp3'); f = tempfile.mktemp(suffix='.mp3')
        asyncio.run(edge_tts.Communicate(say, voice, rate=rate, pitch=pitch).save(raw))
        subprocess.run(['ffmpeg','-loglevel','error','-y','-i',raw,'-af',AF,'-ac','1','-ar','24000','-c:a','libmp3lame','-b:a','24k',f]); a = load(f)
        ts = [' '.join(x.text.strip() for x in m.transcribe(a, beam_size=5, condition_on_previous_text=False)[0]) for m in M]
        ok = sum(all(re.search(r'\b' + w, norm(t)) for w in req) for t in ts); sc = min(difflib.SequenceMatcher(None, norm(canon), norm(t)).ratio() for t in ts)
        if best is None or (ok, sc) > (best[0], best[1]): best = (ok, sc, f, ts)
        if ok == len(M) and sc >= 0.85: break
    ok, sc, f, ts = best; res.append([k, v, canon, say, ok, round(sc, 2), ts])
    if ok >= int(os.environ.get('MINOK', 1)): shutil.copyfile(f, CACHE + k + '.mp3'); shutil.copyfile(f, OUT + k + '.mp3'); man[k] = round(os.path.getsize(f) * 8 / 32)
    print(res[-1], flush=True)
json.dump(man, open(OUT + 'manifest.json', 'w'), separators=(',', ':'))
json.dump(res, open('/workspace/wt21/v21/vo/rerender_say.json', 'a'), ensure_ascii=False); print('done')

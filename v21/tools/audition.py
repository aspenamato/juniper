# audition voice configs: render test lines through the real pipeline, Whisper small.en + medium.en, count clear "Aspen" -> v21/vo/audition/result.json
import json, asyncio, edge_tts, subprocess, re, numpy as np, os
from faster_whisper import WhisperModel
AF = 'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.06,areverse'
O = '/workspace/wt21/v21/vo/audition/'
C = json.load(open(O + 'candidates.json')); T = ["Go, Aspen!", "Hi Aspen!", "Glide with me, Aspen!", "You can do it, Aspen!", "Lace up, Aspen!", "Yay, Aspen!", "Tap it, Aspen!", "Only in San Jose, Aspen!"]
M = [WhisperModel(m, device='cpu', compute_type='float32', cpu_threads=8) for m in ('small.en', 'medium.en')]
def load(f): a = np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i',f,'-f','s16le','-ac','1','-ar','16000','-'],capture_output=True).stdout,np.int16).astype(np.float32)/32768; return np.concatenate([np.zeros(8000,np.float32),a,np.zeros(16000,np.float32)])
res = {}
for name, (who, voice, rate, pitch) in C.items():
    ok = 0; outs = []
    for i, s in enumerate(T):
        f = O + f'{name}_{i}.mp3'; raw = f + '.raw.mp3'
        for att in range(4):
            try: asyncio.run(edge_tts.Communicate(s, voice, rate=rate, pitch=pitch).save(raw)); break
            except Exception: import time; time.sleep(2)
        subprocess.run(['ffmpeg','-loglevel','error','-y','-i',raw,'-af',AF,'-ac','1','-ar','24000','-c:a','libmp3lame','-b:a','24k',f]); os.remove(raw)
        a = load(f); ts = [' '.join(x.text.strip() for x in m.transcribe(a, beam_size=5, condition_on_previous_text=False)[0]) for m in M]
        h = sum(bool(re.search(r'\baspen', t.lower())) for t in ts); ok += h; outs.append([s, h, ts])
    res[name] = [who, voice, rate, pitch, ok, 2 * len(T), outs]; print(name, voice, rate, pitch, f'{ok}/{2*len(T)}', [o[2] for o in outs if o[1] < 2], flush=True)
old = json.load(open(O + 'result.json')) if os.path.exists(O + 'result.json') else {}; old.update(res); json.dump(old, open(O + 'result.json', 'w'), indent=1)

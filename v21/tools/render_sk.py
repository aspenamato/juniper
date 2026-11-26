# render missing clips with edge-tts into the shared cache, publish ADD-ONLY into wt21/learn/vo and MERGE the manifest
import asyncio, json, os, sys, shutil, tempfile
import edge_tts
VO = json.load(open('/workspace/sk21/src/voices.json'))['V']
CACHE = '/workspace/juniper-learn/vo_cache/'; OUT = '/workspace/wt21/learn/vo/'
lines = json.load(open('/workspace/wt21/v21/vo/lines_all.json'))
man = json.load(open(OUT + 'manifest.json'))
need = [l for l in lines if l[0] not in man]
todo = [l for l in need if not os.path.exists(CACHE + l[0] + '.mp3')]
print('lines', len(lines), 'not in manifest', len(need), 'to render', len(todo), flush=True)
AF = 'silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.06,areverse'
fails = []
async def one(sem, k, v, s):
    voice, rate, pitch = VO[v]
    async with sem:
        for attempt in range(4):
            try:
                tmp = tempfile.mktemp(suffix='.mp3', dir='/tmp')
                await edge_tts.Communicate(s, voice, rate=rate, pitch=pitch).save(tmp)
                if os.path.getsize(tmp) < 500: raise Exception('tiny')
                p = await asyncio.create_subprocess_exec('ffmpeg', '-loglevel', 'error', '-y', '-i', tmp, '-af', AF, '-ac', '1', '-ar', '24000', '-c:a', 'libmp3lame', '-b:a', '24k', CACHE + k + '.part.mp3')
                await p.wait(); os.remove(tmp)
                if p.returncode: raise Exception('ffmpeg')
                os.replace(CACHE + k + '.part.mp3', CACHE + k + '.mp3'); return
            except Exception:
                await asyncio.sleep(1 + attempt * 2)
        fails.append([k, v, s])
async def main():
    sem = asyncio.Semaphore(int(sys.argv[1]) if len(sys.argv) > 1 else 10)
    done = 0
    for f in asyncio.as_completed([one(sem, *l) for l in todo]):
        await f; done += 1
        if done % 250 == 0: print('done', done, 'fails', len(fails), flush=True)
asyncio.run(main())
add = 0
for k, v, s in need:
    f = CACHE + k + '.mp3'
    if not os.path.exists(f): continue
    shutil.copyfile(f, OUT + k + '.mp3'); man[k] = round(os.path.getsize(f) * 8 / 32); add += 1
json.dump(man, open(OUT + 'manifest.json', 'w'), separators=(',', ':'))
json.dump(fails, open('/workspace/wt21/v21/vo/fails.json', 'w'), ensure_ascii=False)
json.dump([l for l in need], open('/workspace/wt21/v21/vo/added.json', 'w'), ensure_ascii=False)
print('added', add, 'manifest', len(man), 'fails', len(fails))

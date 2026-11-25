// Juniper's Learning Park service worker: always fetch the newest app, keep voice clips cached.
const V = '20261124210839-60f137'; const APPC = 'jl-app-' + V, VOC = 'jl-vo';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('jl-app-') && k !== APPC).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => { const req = e.request; if (req.method !== 'GET') return; const u = new URL(req.url); if (u.origin !== location.origin) return;
  if (/\/vo\/[a-z0-9]+\.mp3$/.test(u.pathname)) { // clip names are content hashes, so a cached clip never goes stale
    // only whole 200 clips are kept (never opaque or partial 206 ones that fail to decode); a cache hiccup falls back to the network
    const clean = new Request(u.origin + u.pathname);
    e.respondWith(caches.open(VOC).then(c => c.match(clean).then(r => r || fetch(clean).then(res => { if (res.status === 200 && res.type === 'basic') { const cl = res.clone(); cl.arrayBuffer().then(ab => { if (ab.byteLength > 200) c.put(clean, new Response(ab, { status: 200, headers: { 'Content-Type': 'audio/mpeg' } })); }).catch(() => {}); } return res; })))
      .catch(() => fetch(req))); return; }
  if (u.pathname.endsWith('version.json')) return;
  e.respondWith(fetch(req, { cache: 'no-store' }).then(res => { if (res.ok) { const cl = res.clone(); caches.open(APPC).then(c => c.put(req, cl)); } return res; }).catch(() => caches.match(req, { ignoreSearch: true }))); });

(() => {
'use strict';
const W = 1024, H = 768, N = W * H;
const $ = id => document.getElementById(id);
const svgWrap = (inner, vb = '0 0 48 48') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" stroke="#3b2a20" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
const ICON = {
  home: svgWrap('<path d="M8 24 L24 9 L40 24" fill="none"/><path d="M13 21 V39 H35 V21" fill="#ffcc80"/><rect x="20" y="28" width="8" height="11" fill="#8d5524"/>'),
  undo: svgWrap('<path d="M18 12 L8 20 L18 28" fill="none" stroke-width="4"/><path d="M9 20 H28 A11 11 0 0 1 28 42 H18" fill="none" stroke-width="4"/>'),
  redo: svgWrap('<path d="M30 12 L40 20 L30 28" fill="none" stroke-width="4"/><path d="M39 20 H20 A11 11 0 0 0 20 42 H30" fill="none" stroke-width="4"/>'),
  magic: svgWrap('<path d="M10 40 L30 20" stroke-width="5" stroke="#5d4037"/><path d="M30 20 L34 16" stroke-width="5" stroke="#fff"/><path d="M33 4 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" fill="#fdd835"/><circle cx="12" cy="12" r="3" fill="#f48fb1"/><circle cx="40" cy="30" r="2.5" fill="#81d4fa"/>'),
  clear: svgWrap('<rect x="9" y="7" width="30" height="36" rx="4" fill="#fff"/><path d="M15 15 h18 M15 22 h18 M15 29 h12" stroke="#c9b5a5"/><path d="M33 33 l8 8 M41 33 l-8 8" stroke="#e53935" stroke-width="4"/>'),
  music: svgWrap('<path d="M18 33 V12 L36 8 V29" fill="none" stroke-width="3.5"/><ellipse cx="14" cy="34" rx="6" ry="4.6" fill="#ffcc80"/><ellipse cx="32" cy="30" rx="6" ry="4.6" fill="#ffcc80"/><path d="M18 16 L36 12" stroke-width="3.5"/>'),
  musicOff: svgWrap('<path d="M18 33 V12 L36 8 V29" fill="none" stroke-width="3.5" opacity=".55"/><ellipse cx="14" cy="34" rx="6" ry="4.6" fill="#ffcc80" opacity=".55"/><ellipse cx="32" cy="30" rx="6" ry="4.6" fill="#ffcc80" opacity=".55"/><path d="M8 8 L40 40" stroke="#e53935" stroke-width="4"/>'),
  soundOn: svgWrap('<path d="M8 19 H15 L25 10 V38 L15 29 H8 Z" fill="#ffcc80"/><path d="M31 17 q5 7 0 14 M35 12 q9 12 0 24" fill="none"/>'),
  soundOff: svgWrap('<path d="M8 19 H15 L25 10 V38 L15 29 H8 Z" fill="#ffcc80"/><path d="M31 18 l10 12 M41 18 l-10 12" stroke="#e53935" stroke-width="3.5"/>'),
  speak: svgWrap('<path d="M6 10 h36 a3 3 0 0 1 3 3 v18 a3 3 0 0 1 -3 3 H22 l-9 8 v-8 H6 a3 3 0 0 1 -3 -3 V13 a3 3 0 0 1 3 -3z" fill="#81d4fa"/><text x="24" y="28" font-size="14" font-weight="900" text-anchor="middle" fill="#3b2a20" stroke="none" font-family="Arial">ES</text>'),
  done: svgWrap('<path d="M24 3 l6 13 14 1.5 -10.5 9.5 3 14 -12.5 -7 -12.5 7 3 -14 L4 17.5 18 16z" fill="#fff59d" stroke-width="3"/><path d="M16 25 l6 6 11 -12" fill="none" stroke="#43a047" stroke-width="4.5"/>'),
  free: svgWrap('<path d="M30 6 L42 18 L22 38 L10 26 Z" fill="#f48fb1"/><path d="M10 26 L22 38 L12 42 L6 36 Z" fill="#ffcc99"/><path d="M6 36 L12 42 L4 44 Z" fill="#3b2a20"/><path d="M30 6 L42 18" stroke="#e91e63" stroke-width="5"/>'),
  num: svgWrap('<circle cx="14" cy="14" r="10" fill="#e53935"/><circle cx="34" cy="14" r="10" fill="#fdd835"/><circle cx="24" cy="34" r="10" fill="#1e88e5"/><text x="14" y="19" font-size="13" font-weight="900" text-anchor="middle" fill="#fff" stroke="none" font-family="Arial">1</text><text x="34" y="19" font-size="13" font-weight="900" text-anchor="middle" fill="#3b2a20" stroke="none" font-family="Arial">2</text><text x="24" y="39" font-size="13" font-weight="900" text-anchor="middle" fill="#fff" stroke="none" font-family="Arial">3</text>'),
  gallery: svgWrap('<rect x="5" y="8" width="38" height="32" rx="4" fill="#fff8e1" stroke-width="3"/><rect x="10" y="13" width="28" height="22" fill="#81d4fa"/><path d="M10 35 l9 -10 6 6 5 -4 8 8z" fill="#43a047"/><circle cx="30" cy="19" r="3.5" fill="#fdd835"/>'),
  down: svgWrap('<path d="M24 6 V30 M14 21 L24 31 L34 21" fill="none" stroke-width="4.5" stroke="#1e88e5"/><path d="M8 32 V40 H40 V32" fill="none" stroke-width="4"/>'),
  trash: svgWrap('<path d="M12 14 H36 L33 42 H15 Z" fill="#cfd8dc"/><path d="M8 13 H40 M19 9 H29" stroke-width="3.5"/><path d="M20 20 V36 M28 20 V36"/>'),
  close: svgWrap('<path d="M12 12 L36 36 M36 12 L12 36" stroke-width="5" stroke="#e53935"/>'),
  more: svgWrap('<path d="M30 6 L42 18 L22 38 L10 26 Z" fill="#81d4fa"/><path d="M10 26 L22 38 L12 42 L6 36 Z" fill="#ffcc99"/><path d="M6 36 L12 42 L4 44 Z" fill="#3b2a20"/>'),
  fill: svgWrap('<path d="M10 20 L24 8 L38 22 L24 36 Z" fill="#cfd8dc"/><path d="M12 22 L36 22 L24 34 Z" fill="var(--c,#e53935)" stroke="none"/><path d="M10 20 L24 8 L38 22 L24 36 Z" fill="none"/><path d="M40 26 q4 6 0 10 q-4 -4 0 -10z" fill="var(--c,#e53935)"/>'),
  crayon: svgWrap('<path d="M14 34 L34 14 L40 20 L20 40 Z" fill="var(--c,#e53935)"/><path d="M14 34 L20 40 L8 44 Z" fill="#fbe7c8"/><path d="M8 44 l3 -6 3 3z" fill="var(--c,#e53935)"/><path d="M22 26 l6 6 M28 20 l6 6" stroke="#fff" stroke-width="2"/>'),
  marker: svgWrap('<rect x="18" y="14" width="14" height="28" rx="4" fill="#fff" transform="rotate(40 25 28)"/><path d="M9 39 L14 34 L18 38 L13 43z" fill="var(--c,#e53935)"/><rect x="27" y="3" width="14" height="14" rx="4" fill="var(--c,#e53935)" transform="rotate(40 34 10)"/>'),
  glitter: svgWrap('<path d="M18 4 l3 10 10 3 -10 3 -3 10 -3 -10 -10 -3 10 -3z" fill="#fdd835"/><path d="M36 24 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" fill="#f48fb1"/><path d="M14 34 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" fill="#81d4fa"/>'),
  eraser: svgWrap('<path d="M6 30 L24 12 L40 28 L28 40 H16 Z" fill="#f48fb1"/><path d="M6 30 L16 40 H28 L18 22" fill="#fff"/><path d="M14 44 H42" stroke="#c9b5a5"/>'),
  sticker: svgWrap('<path d="M24 4 l6 13 14 1.5 -10.5 9.5 3 14 -12.5 -7 -12.5 7 3 -14 L4 17.5 18 16z" fill="#fdd835"/><circle cx="19" cy="23" r="2" fill="#3b2a20"/><circle cx="29" cy="23" r="2" fill="#3b2a20"/><path d="M19 29 q5 4 10 0" fill="none"/>'),
};
const lineup = ICON;
// ---------- stickers (original) ----------
const sw = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#222" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${inner}</svg>`;
const STICKERS = {
  star: sw('<path d="M50 6 l13 27 30 3 -22 20 6 30 -27 -15 -27 15 6 -30 -22 -20 30 -3z" fill="#fdd835"/><circle cx="41" cy="48" r="4" fill="#222"/><circle cx="59" cy="48" r="4" fill="#222"/><path d="M42 60 q8 7 16 0" fill="none"/><ellipse cx="34" cy="57" rx="5" ry="3" fill="#f48fb1" stroke="none"/><ellipse cx="66" cy="57" rx="5" ry="3" fill="#f48fb1" stroke="none"/>'),
  heart: sw('<path d="M50 88 C10 62 6 30 26 18 C40 10 50 22 50 30 C50 22 60 10 74 18 C94 30 90 62 50 88 Z" fill="#e91e63"/><ellipse cx="32" cy="34" rx="7" ry="4" fill="#fff" stroke="none" transform="rotate(-30 32 34)"/>'),
  golf: sw('<path d="M38 70 L62 70 L56 92 L44 92 Z" fill="#c68642"/><circle cx="50" cy="42" r="32" fill="#fff"/><g fill="#cfd8dc" stroke="none"><circle cx="38" cy="30" r="4"/><circle cx="52" cy="26" r="4"/><circle cx="64" cy="34" r="4"/><circle cx="44" cy="44" r="4"/><circle cx="58" cy="48" r="4"/><circle cx="34" cy="52" r="4"/><circle cx="48" cy="60" r="4"/></g>'),
  skate: sw('<path d="M24 10 H50 L52 46 Q80 48 84 66 V74 H24 Z" fill="#fff"/><path d="M30 22 h16 M30 32 h16 M30 42 h18" stroke="#e91e63"/><path d="M28 74 V84 M74 74 V84" /><rect x="14" y="82" width="80" height="8" rx="4" fill="#cfd8dc"/>'),
  blade: sw('<path d="M22 8 H48 L50 42 Q78 44 82 62 V68 H22 Z" fill="#8e24aa"/><rect x="18" y="68" width="68" height="10" rx="5" fill="#90a4ae"/><circle cx="30" cy="86" r="9" fill="#e91e63"/><circle cx="52" cy="86" r="9" fill="#26c6da"/><circle cx="74" cy="86" r="9" fill="#c0ca33"/><path d="M30 70 l-6 -6 M74 70 l6 -6" stroke="#fdd835" stroke-width="3"/>'),
  acorn: sw('<ellipse cx="50" cy="60" rx="26" ry="32" fill="#c68642"/><path d="M46 10 h8 v14 h-8z" fill="#5d4037"/><path d="M18 46 Q18 18 50 18 Q82 18 82 46 Z" fill="#8d5524"/><path d="M30 38 l8 -10 M46 38 l8 -12 M62 38 l8 -10"/>'),
  carnation: sw('<path d="M50 56 Q54 76 50 96" fill="none" stroke="#2e7d32" stroke-width="6"/><path d="M50 80 q-24 -14 -30 4 q18 8 30 -4z" fill="#43a047"/><path d="M50 8 l8 10 12 -4 2 12 12 2 -4 12 10 8 -10 8 4 12 -12 2 -2 12 -12 -4 -8 10 -8 -10 -12 4 -2 -12 -12 -2 4 -12 -10 -8 10 -8 -4 -12 12 -2 2 -12 12 4z" fill="#7cb342" transform="translate(0 -6) scale(1 .9) translate(0 4)"/><circle cx="50" cy="40" r="12" fill="#43a047"/>'),
  coqui: sw('<ellipse cx="50" cy="62" rx="34" ry="24" fill="#c68642"/><ellipse cx="50" cy="46" rx="34" ry="24" fill="#c68642"/><circle cx="32" cy="28" r="14" fill="#c68642"/><circle cx="68" cy="28" r="14" fill="#c68642"/><circle cx="32" cy="28" r="9" fill="#fdd835"/><circle cx="68" cy="28" r="9" fill="#fdd835"/><circle cx="32" cy="28" r="5" fill="#222"/><circle cx="68" cy="28" r="5" fill="#222"/><path d="M36 54 q14 10 28 0" fill="none"/><ellipse cx="30" cy="50" rx="5" ry="3" fill="#f48fb1" stroke="none"/><ellipse cx="70" cy="50" rx="5" ry="3" fill="#f48fb1" stroke="none"/>'),
  horseshoe: sw('<path d="M18 20 Q14 86 50 88 Q86 86 82 20 L66 20 Q70 70 50 72 Q30 70 34 20 Z" fill="#cfd8dc"/><g fill="#222" stroke="none"><circle cx="24" cy="40" r="3"/><circle cx="76" cy="40" r="3"/><circle cx="30" cy="62" r="3"/><circle cx="70" cy="62" r="3"/></g>'),
  rainbow: sw('<path d="M8 76 A42 42 0 0 1 92 76 H80 A30 30 0 0 0 20 76 Z" fill="#e53935"/><path d="M20 76 A30 30 0 0 1 80 76 H70 A20 20 0 0 0 30 76 Z" fill="#fdd835"/><path d="M30 76 A20 20 0 0 1 70 76 H60 A10 10 0 0 0 40 76 Z" fill="#1e88e5"/><ellipse cx="18" cy="80" rx="16" ry="10" fill="#fff"/><ellipse cx="82" cy="80" rx="16" ry="10" fill="#fff"/>'),
  paw: sw('<ellipse cx="50" cy="66" rx="22" ry="18" fill="#5d4037"/><ellipse cx="24" cy="40" rx="9" ry="12" fill="#5d4037"/><ellipse cx="42" cy="26" rx="9" ry="12" fill="#5d4037"/><ellipse cx="60" cy="26" rx="9" ry="12" fill="#5d4037"/><ellipse cx="78" cy="40" rx="9" ry="12" fill="#5d4037"/>'),
  fox: sw('<path d="M18 40 L14 6 L40 28 Z" fill="#f57c00"/><path d="M60 28 L72 10 L96 18 L82 40 Z" fill="#f57c00"/><path d="M72 10 L96 18 L80 22 Z" fill="#5d4037"/><path d="M12 48 C10 24 34 22 50 22 C66 22 90 24 88 48 C86 70 64 82 50 82 C36 82 14 70 12 48 Z" fill="#f57c00"/><path d="M12 50 C26 58 40 58 50 54 C60 58 74 58 88 50 C84 70 64 82 50 82 C36 82 16 70 12 50 Z" fill="#fbe7c8"/><ellipse cx="34" cy="44" rx="5" ry="7" fill="#222"/><ellipse cx="66" cy="44" rx="5" ry="7" fill="#222"/><ellipse cx="50" cy="58" rx="7" ry="5" fill="#222"/>'),
  flower: sw('<g fill="#f48fb1"><circle cx="50" cy="24" r="16"/><circle cx="74" cy="42" r="16"/><circle cx="66" cy="70" r="16"/><circle cx="34" cy="70" r="16"/><circle cx="26" cy="42" r="16"/></g><circle cx="50" cy="50" r="13" fill="#fdd835"/>'),
  sparkle: sw('<path d="M50 4 Q54 46 96 50 Q54 54 50 96 Q46 54 4 50 Q46 46 50 4 Z" fill="#81d4fa"/><path d="M50 30 Q52 48 70 50 Q52 52 50 70 Q48 52 30 50 Q48 48 50 30 Z" fill="#fff" stroke="none"/>'),
  moon: sw('<path d="M64 10 A40 40 0 1 0 90 72 A32 32 0 1 1 64 10 Z" fill="#fdd835"/><circle cx="40" cy="52" r="3" fill="#222"/><path d="M36 64 q6 4 12 0" fill="none"/>'),
};
const stickerImgs = {};
for (const k in STICKERS) { const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(STICKERS[k]); stickerImgs[k] = im; }
// ---------- reward stickers from Juniper's Learning Park (same origin, shared localStorage) ----------
function rewardIds() { try { const r = JSON.parse(localStorage.getItem('juniperRewards') || 'null'); return r && Array.isArray(r.stickers) ? r.stickers : []; } catch (e) { return []; } }
function applyRewards(announce) {
  if (typeof EXTRA_STICKERS === 'undefined') return 0; const ids = rewardIds(); let added = 0;
  EXTRA_STICKERS.forEach(x => { const k = 'r_' + x.id; if (ids.includes(x.id) && !STICKERS[k]) { STICKERS[k] = x.svg; const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(x.svg); stickerImgs[k] = im; added++; } });
  if (added && announce) { const t = document.getElementById('toast'); if (t) { t.innerHTML = STICKERS.star + `<b style="font-size:20px">+${added}</b>`; t.style.display = 'flex'; t.style.alignItems = 'center'; t.style.gap = '6px'; setTimeout(() => { t.style.display = 'none'; }, 2600); }
    if (typeof S !== 'undefined' && S.tool === 'sticker' && document.getElementById('paint').classList.contains('on')) buildPalette(); }
  return added;
}
applyRewards(false);

// ---------- state ----------
const LS = { get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } } };
const prefs = Object.assign({ sound: true, speak: false, magic: true, mode: 'free' }, LS.get('jcp_prefs', {}));
const savePrefs = () => LS.set('jcp_prefs', prefs);
const S = { page: null, tool: 'fill', color: PALETTE[0][2], colorIdx: 0, size: 1, sticker: 'star', mode: prefs.mode,
  undo: [], redo: [], an: null, filled: null, selNum: 1, galId: null, drawing: false };
const SIZES = [8, 18, 34, 56];
const STK_SIZES = [70, 110, 160, 220];
const work = {}; // in-memory progress per page+mode

const cvPaint = $('cv-paint'), cvLines = $('cv-lines'), cvStick = $('cv-stick'), cvNums = $('cv-nums');
const xP = cvPaint.getContext('2d', { willReadFrequently: true }), xL = cvLines.getContext('2d'), xS = cvStick.getContext('2d', { willReadFrequently: true }), xN = cvNums.getContext('2d');
const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = H; const xT = tmp.getContext('2d');
const maskC = document.createElement('canvas'); maskC.width = W; maskC.height = H; const xM = maskC.getContext('2d');

// ---------- sound ----------
let AC = null;
// v5: revive the audio after iOS suspends/interrupts it (screen lock, app switch), rebuild it if closed
function ac() { if (!AC || AC.state === 'closed') { try { AC = new (window.AudioContext || window.webkitAudioContext)(); if (window.MUSIC) MUSIC.rebuild(); } catch (e) { AC = null; } }
  if (AC && AC.state !== 'running') { try { const p = AC.resume(); if (p && p.catch) p.catch(() => {}); } catch (e) {} } return AC; }
//@@MUSIC
//@@FX
MUSIC.init(ac); MUSIC.setMode('calm'); MUSIC.setLevel(0.075);
const musicGo = () => { ac(); if (MUSIC.on && prefs.sound) MUSIC.start(); };
['touchstart', 'touchend', 'pointerdown', 'click'].forEach(ev => document.addEventListener(ev, musicGo, { capture: true, passive: true }));
['visibilitychange', 'pageshow', 'focus'].forEach(ev => window.addEventListener(ev, () => { if (!document.hidden && AC) ac(); }));
try { const sp = speechSynthesis.speak.bind(speechSynthesis); speechSynthesis.speak = u => { MUSIC.duck(true); const end = () => MUSIC.duck(false); try { u.addEventListener('end', end); u.addEventListener('error', end); } catch (e) {} setTimeout(end, 4000); return sp(u); }; } catch (e) {}
function tone(f, t0, dur, type = 'sine', vol = 0.18) {
  const a = ac(); if (!a || !prefs.sound) return;
  const o = a.createOscillator(), g = a.createGain(); o.type = type; o.frequency.value = f;
  const t = a.currentTime + t0; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.05);
}
const SND = {
  pop() { tone(520 + Math.random() * 200, 0, 0.12, 'triangle', 0.2); tone(900, 0.03, 0.1, 'sine', 0.08); },
  stamp() { tone(660, 0, 0.1, 'square', 0.06); tone(990, 0.08, 0.18, 'sine', 0.15); },
  tick() { tone(1200, 0, 0.04, 'sine', 0.05); },
  nope() { tone(220, 0, 0.15, 'triangle', 0.15); tone(180, 0.12, 0.2, 'triangle', 0.12); },
  ding() { tone(880, 0, 0.2, 'sine', 0.2); tone(1320, 0.1, 0.3, 'sine', 0.15); },
  fanfare() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i * 0.13, i === 5 ? 0.7 : 0.18, 'triangle', 0.2)); [1568, 2093].forEach((f, i) => tone(f, 0.8 + i * 0.1, 0.4, 'sine', 0.08)); },
};
// recorded Spanish clips in Juniper's Learning Park voice (device speech only if a clip cannot load)
const CVO = {"rojo": "35b84fdb64", "naranja": "6979af58c0", "amarillo": "dd2f065653", "verde lima": "1208310753", "verde": "359083888e", "verde oscuro": "5fd2e2596e", "turquesa": "8e9757af85", "celeste": "1cf9897bf7", "azul": "7247c3b860", "azul marino": "86ebafb8fa", "morado": "a7831f6579", "lila": "4b30b1955d", "rosa": "0de24f8d87", "fucsia": "0eaab56d4d", "melocotón": "9859ae07f9", "crema": "853b2f1964", "canela": "81d6ff5232", "marrón": "35511c3417", "marrón oscuro": "a213df882b", "gris claro": "a99897945f", "gris": "6144353cb0", "negro": "11638cbd46", "blanco": "6ed23b70b8", "arcoíris": "abb0a06bd7", "brillo": "913e81532c", "¡Hola, Aspen! Vamos a colorear.": "e93a253fe2", "¡Muy bien, Aspen! ¡Excelente!": "ae0b502db9"};
const CBUF = {}; let CSRC = null;
function sayClip(txt) { const f = CVO[txt]; const a = f && ac(); if (!a) return false;
  const get = CBUF[f] || (CBUF[f] = fetch('cvo/' + f + '.mp3').then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); }).then(b => new Promise((res, rej) => a.decodeAudioData(b, res, rej))));
  get.then(buf => { try { if (CSRC) CSRC.stop(); } catch (e) {} const s = a.createBufferSource(); s.buffer = buf; s.connect(a.destination); MUSIC.duck(true); s.onended = () => { if (CSRC === s) CSRC = null; MUSIC.duck(false); }; CSRC = s; s.start(); window.__cvoPlayed = (window.__cvoPlayed || 0) + 1; })
    .catch(() => { delete CBUF[f]; sayDevice(txt); }); return true; }
function say(txt) { if (!prefs.speak) return; if (sayClip(txt)) return; sayDevice(txt); }
function sayDevice(txt) { window.__cvoTts = (window.__cvoTts || 0) + 1;
  if (!prefs.speak || !('speechSynthesis' in window)) return;
  try { speechSynthesis.cancel(); const u = typeof JVOICE !== 'undefined' ? JVOICE.utter(txt, true) : new SpeechSynthesisUtterance(txt); if (typeof JVOICE === 'undefined') { u.lang = 'es-MX'; u.rate = 0.9; u.pitch = 1.3; } speechSynthesis.speak(u); } catch (e) {}
}

// ---------- page analysis ----------
const cache = {};
function loadImg(svgStr) { return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr); }); }
function loadUrl(u, tries = 3) { return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => tries > 1 ? setTimeout(() => loadUrl(u, tries - 1).then(res, rej), 600) : rej(new Error('img ' + u)); im.src = u; }); }
async function analyze(page) {
  if (cache[page.id]) return cache[page.id];
  let li, ri, wi;
  if (page.line) { try { [li, ri, wi] = await Promise.all([loadUrl(page.line), loadUrl(page.color), loadUrl(page.wall)]); } catch (e) { li = null; } }
  if (!li) [li, ri, wi] = await Promise.all([loadImg(ART.toLine(page.svg)), loadImg(page.svg), loadImg(ART.toWall ? ART.toWall(page.svg) : ART.toLine(page.svg))]);
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d', { willReadFrequently: true });
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(li, 0, 0, W, H); const ld = x.getImageData(0, 0, W, H).data;
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(ri, 0, 0, W, H); const rd = x.getImageData(0, 0, W, H).data;
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.drawImage(wi, 0, 0, W, H); const wd = x.getImageData(0, 0, W, H).data;
  const wall = new Uint8Array(N); const lineImg = new ImageData(W, H); const lo = lineImg.data;
  for (let i = 0, j = 0; i < N; i++, j += 4) {
    const lum = (ld[j] * 299 + ld[j + 1] * 587 + ld[j + 2] * 114) / 1000;
    if ((wd[j] * 299 + wd[j + 1] * 587 + wd[j + 2] * 114) / 1000 < 170) wall[i] = 1;
    lo[j] = 34; lo[j + 1] = 34; lo[j + 2] = 34; lo[j + 3] = Math.min(255, Math.max(0, (255 - lum) * 1.25));
  }
  // label regions (4-connected)
  const lab = new Int32Array(N); const stack = new Int32Array(N); let nl = 0; const reg = [null];
  for (let s = 0; s < N; s++) {
    if (wall[s] || lab[s]) continue;
    nl++; let sp = 0; stack[sp++] = s; lab[s] = nl; let area = 0, x0 = W, y0 = H, x1 = 0, y1 = 0;
    while (sp) { const p = stack[--sp]; area++; const px = p % W, py = (p / W) | 0;
      if (px < x0) x0 = px; if (px > x1) x1 = px; if (py < y0) y0 = py; if (py > y1) y1 = py;
      if (px > 0 && !wall[p - 1] && !lab[p - 1]) { lab[p - 1] = nl; stack[sp++] = p - 1; }
      if (px < W - 1 && !wall[p + 1] && !lab[p + 1]) { lab[p + 1] = nl; stack[sp++] = p + 1; }
      if (py > 0 && !wall[p - W] && !lab[p - W]) { lab[p - W] = nl; stack[sp++] = p - W; }
      if (py < H - 1 && !wall[p + W] && !lab[p + W]) { lab[p + W] = nl; stack[sp++] = p + W; } }
    reg.push({ id: nl, area, x0, y0, x1, y1, d: 0, cx: 0, cy: 0 });
  }
  // chamfer distance to nearest wall/border
  const dist = new Float32Array(N); const BIG = 1e6;
  for (let i = 0; i < N; i++) dist[i] = wall[i] ? 0 : BIG;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (!dist[i]) continue;
    let d = Math.min(x + 1, y + 1, dist[i]); if (x > 0) d = Math.min(d, dist[i - 1] + 1); if (y > 0) { d = Math.min(d, dist[i - W] + 1); if (x > 0) d = Math.min(d, dist[i - W - 1] + 1.414); if (x < W - 1) d = Math.min(d, dist[i - W + 1] + 1.414); } dist[i] = d; }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; if (!dist[i]) continue;
    let d = Math.min(dist[i], W - x, H - y); if (x < W - 1) d = Math.min(d, dist[i + 1] + 1); if (y < H - 1) { d = Math.min(d, dist[i + W] + 1); if (x < W - 1) d = Math.min(d, dist[i + W + 1] + 1.414); if (x > 0) d = Math.min(d, dist[i + W - 1] + 1.414); } dist[i] = d;
    const r = reg[lab[i]]; if (r && d > r.d) { r.d = d; r.cx = x; r.cy = y; } }
  // reference color per region
  const pal = PALETTE.map(p => [p[2], parseInt(p[2].slice(1, 3), 16), parseInt(p[2].slice(3, 5), 16), parseInt(p[2].slice(5, 7), 16)]);
  // reference color per region = most common palette color inside it (ignoring ink from decorative detail lines)
  const hist = new Int32Array((nl + 1) * pal.length); const ncache = new Map();
  for (let i = 0, j = 0; i < N; i++, j += 4) { const k = lab[i]; if (!k) continue; const R0 = rd[j], G0 = rd[j + 1], B0 = rd[j + 2];
    if (Math.abs(R0 - 34) + Math.abs(G0 - 34) + Math.abs(B0 - 34) < 40) continue;
    const key = (R0 << 16) | (G0 << 8) | B0; let best = ncache.get(key);
    if (best === undefined) { let bd = 1e9; best = 0; for (let q = 0; q < pal.length; q++) { const dd = (pal[q][1] - R0) ** 2 + (pal[q][2] - G0) ** 2 + (pal[q][3] - B0) ** 2; if (dd < bd) { bd = dd; best = q; } } ncache.set(key, best); }
    hist[k * pal.length + best]++; }
  for (let k = 1; k <= nl; k++) { const r = reg[k]; let best = -1, bc = 0;
    for (let q = 0; q < pal.length; q++) { const v = hist[k * pal.length + q]; if (v > bc) { bc = v; best = q; } }
    if (best < 0) { const j = (r.cy * W + r.cx) * 4; let bd = 1e9; best = 0; for (let q = 0; q < pal.length; q++) { const dd = (pal[q][1] - rd[j]) ** 2 + (pal[q][2] - rd[j + 1]) ** 2 + (pal[q][3] - rd[j + 2]) ** 2; if (dd < bd) { bd = dd; best = q; } } }
    r.ref = best; }
  // color-by-number assignment
  const numbered = reg.filter(r => r && r.d >= 9 && r.area >= 160);
  const areaBy = {}; numbered.forEach(r => areaBy[r.ref] = (areaBy[r.ref] || 0) + r.area);
  const order = Object.keys(areaBy).map(Number).sort((a, b) => areaBy[b] - areaBy[a]);
  const numOf = {}; order.forEach((q, i) => numOf[q] = i + 1);
  numbered.forEach(r => r.num = numOf[r.ref]);
  const an = { wall, lab, reg, nl, lineImg, numColors: order, masks: {} };
  cache[page.id] = an; return an;
}
function regionMask(an, id) {
  if (an.masks[id]) return an.masks[id];
  const r = an.reg[id], { lab, wall } = an, out = []; const R = 3;
  const x0 = Math.max(0, r.x0 - R), y0 = Math.max(0, r.y0 - R), x1 = Math.min(W - 1, r.x1 + R), y1 = Math.min(H - 1, r.y1 + R);
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) { const i = y * W + x;
    if (lab[i] === id) { out.push(i); continue; }
    if (!wall[i]) continue;
    let hit = false; for (let dy = -R; dy <= R && !hit; dy++) { const yy = y + dy; if (yy < 0 || yy >= H) continue;
      for (let dx = -R; dx <= R; dx++) { const xx = x + dx; if (xx < 0 || xx >= W) continue; if (lab[yy * W + xx] === id) { hit = true; break; } } }
    if (hit) out.push(i); }
  const m = { idx: Int32Array.from(out), x0, y0, x1, y1 }; an.masks[id] = m; return m;
}
const hexRGB = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
function hsl2rgb(h, s, l) { s /= 100; l /= 100; const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l); const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return [255 * f(0), 255 * f(8), 255 * f(4)].map(Math.round); }
function fillRegion(id, color) {
  const an = S.an, m = regionMask(an, id); const img = xP.getImageData(m.x0, m.y0, m.x1 - m.x0 + 1, m.y1 - m.y0 + 1); const d = img.data, bw = m.x1 - m.x0 + 1;
  const rgb = color.startsWith('#') ? hexRGB(color) : null;
  for (const i of m.idx) { const x = i % W, y = (i / W) | 0; const j = ((y - m.y0) * bw + (x - m.x0)) * 4; let c;
    if (color === 'rainbow') c = hsl2rgb(((x + y) * 0.6) % 360, 90, 60);
    else if (color === 'glitter') { const r = Math.random(); c = r < 0.06 ? [255, 255, 255] : r < 0.12 ? [255, 236, 140] : r < 0.15 ? [248, 187, 208] : [212 + ((x * 7 + y * 13) % 30), 175 + ((x * 3 + y * 5) % 30), 55]; }
    else c = rgb;
    d[j] = c[0]; d[j + 1] = c[1]; d[j + 2] = c[2]; d[j + 3] = 255; }
  xP.putImageData(img, m.x0, m.y0);
}
// ---------- undo ----------
function snap(layers) { const s = {}; if (layers.includes('p')) s.p = xP.getImageData(0, 0, W, H); if (layers.includes('s')) s.s = xS.getImageData(0, 0, W, H); if (S.filled) s.f = new Set(S.filled); return s; }
function pushUndo(layers) { S.undo.push(snap(layers)); if (S.undo.length > 18) S.undo.shift(); S.redo.length = 0; updUndo(); }
function restore(s) { if (s.p) xP.putImageData(s.p, 0, 0); if (s.s) xS.putImageData(s.s, 0, 0); if (s.f) S.filled = new Set(s.f); drawNums(); }
function doUndo() { const s = S.undo.pop(); if (!s) return; S.redo.push(snap((s.p ? 'p' : '') + (s.s ? 's' : ''))); restore(s); SND.tick(); updUndo(); }
function doRedo() { const s = S.redo.pop(); if (!s) return; S.undo.push(snap((s.p ? 'p' : '') + (s.s ? 's' : ''))); restore(s); SND.tick(); updUndo(); }
function updUndo() { $('bUndo').classList.toggle('off', !S.undo.length); $('bRedo').classList.toggle('off', !S.redo.length); }

// ---------- numbers overlay ----------
function drawNums() {
  xN.clearRect(0, 0, W, H); if (S.mode !== 'num' || !S.an) return; const an = S.an;
  const ov = xN.createImageData(W, H), o = ov.data; const sel = new Uint8Array(an.nl + 1);
  for (const r of an.reg) if (r && r.num === S.selNum && !S.filled.has(r.id)) sel[r.id] = 1;
  for (let i = 0, j = 0; i < N; i++, j += 4) if (sel[an.lab[i]]) { const x = i % W, y = (i / W) | 0; const st = ((x + y) >> 3) & 1; o[j] = st ? 120 : 160; o[j + 1] = st ? 120 : 160; o[j + 2] = st ? 140 : 180; o[j + 3] = 70; }
  xN.putImageData(ov, 0, 0);
  xN.textAlign = 'center'; xN.textBaseline = 'middle';
  for (const r of an.reg) { if (!r || !r.num || S.filled.has(r.id)) continue; const fs = Math.max(13, Math.min(34, r.d * 1.3));
    xN.font = `800 ${fs}px Arial, sans-serif`; xN.lineWidth = 4; xN.strokeStyle = 'rgba(255,255,255,.9)'; xN.strokeText(r.num, r.cx, r.cy + 1); xN.fillStyle = r.num === S.selNum ? '#222' : '#777'; xN.fillText(r.num, r.cx, r.cy + 1); }
}
// ---------- UI build ----------
function setIcon(el, svg) { el.innerHTML = svg; }
[['bHome', 'home'], ['bUndo', 'undo'], ['bRedo', 'redo'], ['bMagic', 'magic'], ['bClear', 'clear'], ['bSpeak', 'speak'], ['bDone', 'done'], ['modeFree', 'free'], ['modeNum', 'num'], ['openGallery', 'gallery'], ['gHome', 'home'], ['cDown', 'down'], ['cGal', 'gallery'], ['cMore', 'more'], ['cHome', 'home'], ['vDown', 'down'], ['vDel', 'trash'], ['vClose', 'close']].forEach(([id, ic]) => setIcon($(id), ICON[ic]));
$('logoFox').innerHTML = `<img src="apple-touch-icon.png?v=5" alt="" style="width:54px;height:54px;border-radius:22%;box-shadow:0 3px 10px rgba(120,60,20,.3);display:block" onerror="this.parentNode.innerHTML=STICKERS.fox">`; $('galIcon').innerHTML = ICON.gallery;
$('cStars').innerHTML = (STICKERS.star).repeat(3);
// ---------- v3 storybook chrome (soft-3D art library) ----------
const UI3 = n => `<img class="ui3" src="art/ui/${n}.webp" alt="" draggable="false">`;
function chrome3() {
  [['modeFree', 'brush'], ['openGallery', 'gallery'], ['gHome', 'home'], ['cGal', 'gallery'], ['cHome', 'home'], ['bHome', 'home']].forEach(([id, n]) => { const el = $(id); if (el) { el.innerHTML = UI3(n); el.classList.add('has3'); } });
  $('galIcon').innerHTML = UI3('gallery');
  $('cStars').innerHTML = UI3('star').repeat(3);
  const hb = document.querySelector('#home .homebar');
  if (hb && !hb.querySelector('.hero-fox')) { hb.classList.add('hero3');
    hb.insertAdjacentHTML('beforeend', '<img class="hero-fox" src="art/chars/juniper_wave.webp" alt="" draggable="false">'); }
}
chrome3();
function updToggles() { setIcon($('bSound'), prefs.sound ? ICON.soundOn : ICON.soundOff); $('bSpeak').classList.toggle('off', !prefs.speak); $('bMagic').classList.toggle('off', !prefs.magic); }
const TOOLS = ['fill', 'crayon', 'marker', 'glitter', 'eraser', 'sticker'];
function buildTools() {
  const t = $('tools'); t.innerHTML = '';
  if (S.mode === 'num') { t.style.display = 'none'; $('bMagic').style.display = 'none'; return; }
  t.style.display = ''; $('bMagic').style.display = '';
  TOOLS.forEach(name => { const b = document.createElement('button'); b.className = 'tool' + (S.tool === name ? ' sel' : ''); b.dataset.tool = name; b.setAttribute('aria-label', name); b.innerHTML = ICON[name];
    b.onclick = () => { S.tool = name; SND.tick(); buildTools(); buildPalette(); }; t.appendChild(b); });
  const sz = document.createElement('div'); sz.className = 'sizes';
  SIZES.forEach((s, i) => { const b = document.createElement('button'); b.className = 'size' + (S.size === i ? ' sel' : ''); b.setAttribute('aria-label', 'size ' + (i + 1)); const d = 8 + i * 8; b.innerHTML = `<i style="width:${d}px;height:${d}px"></i>`;
    b.onclick = () => { S.size = i; SND.tick(); buildTools(); }; sz.appendChild(b); });
  if (S.tool !== 'fill') t.appendChild(sz);
  t.style.setProperty('--c', S.color.startsWith('#') ? S.color : '#e53935');
}
function swatchStyle(col) { if (col === 'rainbow') return 'background:conic-gradient(#e53935,#fb8c00,#fdd835,#43a047,#1e88e5,#8e24aa,#e53935)';
  if (col === 'glitter') return 'background:radial-gradient(circle at 30% 30%,#fff 0 8%,transparent 9%),radial-gradient(circle at 70% 60%,#fff 0 6%,transparent 7%),radial-gradient(circle at 40% 75%,#fff7b0 0 7%,transparent 8%),linear-gradient(135deg,#f9d976,#d4a017,#f6e27a,#c9971a)';
  return 'background:' + col; }
function buildPalette() {
  const p = $('palette'); p.innerHTML = '';
  if (S.mode === 'num' && S.an) {
    p.classList.remove('withnames');
    S.an.numColors.forEach((q, i) => { const num = i + 1; const b = document.createElement('button'); b.className = 'sw' + (S.selNum === num ? ' sel' : '') + (numDone(num) ? ' doneN' : ''); b.style.cssText = swatchStyle(PALETTE[q][2]); b.dataset.num = num;
      b.innerHTML = `<span class="num">${num}</span>`; b.setAttribute('aria-label', 'number ' + num);
      b.onclick = () => { S.selNum = num; SND.tick(); say(PALETTE[q][0]); buildPalette(); drawNums(); }; p.appendChild(b); });
    return;
  }
  p.classList.add('withnames');
  if (S.tool === 'sticker') {
    const st = document.createElement('div'); st.className = 'stickers'; st.style.display = 'grid';
    Object.keys(STICKERS).forEach(k => { const b = document.createElement('button'); b.className = 'stk' + (S.sticker === k ? ' sel' : ''); b.setAttribute('aria-label', k + ' sticker'); b.innerHTML = `<img src="${stickerImgs[k].src}" alt="">`;
      b.onclick = () => { S.sticker = k; SND.tick(); buildPalette(); }; st.appendChild(b); });
    p.appendChild(st); p.classList.remove('withnames'); return;
  }
  const list = PALETTE.map((x, i) => [x[2], x[0], i]).concat([['rainbow', 'arcoíris', -1], ['glitter', 'brillo', -2]]);
  list.forEach(([col, es]) => { const b = document.createElement('button'); b.className = 'sw' + (S.color === col ? ' sel' : ''); b.style.cssText = swatchStyle(col); b.setAttribute('aria-label', es);
    b.innerHTML = prefs.speak ? `<span class="es">${es}</span>` : ''; b.onclick = () => { S.color = col; SND.tick(); say(es); if (S.tool === 'eraser') S.tool = 'crayon'; buildTools(); buildPalette(); }; p.appendChild(b); });
  if (!prefs.speak) p.classList.remove('withnames');
}
function numDone(num) { if (!S.an || !S.filled) return false; return S.an.reg.every(r => !r || r.num !== num || S.filled.has(r.id)); }

// ---------- home ----------
function thumb(page) { return page.thumb || 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(ART.toLine(page.svg)); }
function peek() { const pg = S.page; if (!pg || !pg.color) return; let ov = $('peekOv'); if (!ov) { ov = document.createElement('div'); ov.id = 'peekOv'; ov.className = 'peek-ov'; ov.innerHTML = '<div class="peek-card"><img alt="Example colors"><button class="peek-x" aria-label="Close">✕</button></div>'; document.body.appendChild(ov); ov.onclick = () => ov.classList.remove('on'); }
  ov.querySelector('img').src = pg.color; ov.classList.add('on'); try { SND.tick(); } catch (e) {} }
function updPeek() { const b = $('bPeek'); if (!b) return; const pg = S.page; b.style.display = pg && pg.color ? '' : 'none'; if (pg && pg.cthumb) b.innerHTML = `<img src="${pg.cthumb}" alt="">`; }
// ---------- world scenes earned in Juniper's Learning Park ----------
function rewardScenes() { try { const r = JSON.parse(localStorage.getItem('juniperRewards') || 'null'); return r && Array.isArray(r.scenes) ? r.scenes : []; } catch (e) { return []; } }
const sceneOpen = pg => !pg.world || rewardScenes().includes(pg.id);
function celebrateScenes() { const seen = LS.get('jcp_seenScenes', null); const now = ART.pages.filter(p => p.world && sceneOpen(p)).map(p => p.id);
  const fresh = now.filter(id => !(seen || []).includes(id)); if (!fresh.length) return; LS.set('jcp_seenScenes', now);
  const pg = ART.pages.find(p => p.id === fresh[0]); let ov = $('sceneCele'); if (!ov) { ov = document.createElement('div'); ov.id = 'sceneCele'; ov.className = 'scene-cele'; document.body.appendChild(ov); }
  ov.innerHTML = `<div class="sc-card"><div class="sc-burst"></div><b>New coloring page${fresh.length > 1 ? 's' : ''}!</b><img src="${thumb(pg)}" alt=""><span>${pg.title}${fresh.length > 1 ? ` + ${fresh.length - 1} more` : ''}</span><button class="sc-go">Color it!</button><button class="sc-x" aria-label="Close">✕</button></div>`;
  ov.classList.add('on'); try { SND.yay ? SND.yay() : SND.tick(); } catch (e) {}
  ov.querySelector('.sc-go').onclick = () => { ov.classList.remove('on'); openPage(pg); }; ov.querySelector('.sc-x').onclick = () => ov.classList.remove('on'); if (typeof buildHome === 'function') buildHome(); }
function buildHome() {
  $('modeFree').classList.toggle('sel', S.mode === 'free'); $('modeNum').classList.toggle('sel', S.mode === 'num');
  const g = $('pageGrid'); g.innerHTML = '';
  ART.pages.forEach(pg => { if (S.mode === 'num' && pg.id === 'blank') return;
    const b = document.createElement('button'); b.className = 'card'; b.dataset.page = pg.id; b.setAttribute('aria-label', pg.title);
    const open = sceneOpen(pg); if (!open) b.classList.add('locked');
    b.innerHTML = `<img src="${thumb(pg)}" alt="">` + (open ? `<div class="cap">${pg.es}</div>` : `<div class="cap lockcap">Earn me in Juniper Learn: ${pg.need}</div>`) + (S.mode === 'num' && open ? `<span class="badge">${ICON.num}</span>` : '') + (pg.world ? `<span class="wtag w-${pg.world}">${{ nyc: 'NYC', vail: 'Vail', sc: 'California', pr: 'Puerto Rico', skate: 'Skating' }[pg.world]}</span>` : '');
    b.onclick = () => { if (!open) { try { SND.tick(); } catch (e) {} b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope'); const t = $('toast'); if (t) { t.textContent = 'Earn me in Juniper Learn: ' + pg.need + '!'; t.style.display = 'flex'; clearTimeout(b._t); b._t = setTimeout(() => { t.style.display = 'none'; }, 2600); } return; } openPage(pg); }; g.appendChild(b); });
}
$('modeFree').onclick = () => { S.mode = prefs.mode = 'free'; savePrefs(); SND.tick(); buildHome(); };
$('modeNum').onclick = () => { S.mode = prefs.mode = 'num'; savePrefs(); SND.tick(); buildHome(); };
function show(id) { const was = document.querySelector('.screen.on'); if (window.FX && was && was.id !== id) FX.screen(); document.querySelectorAll('.screen').forEach(s => s.classList.toggle('on', s.id === id)); }
// ---------- open page ----------
function storeWork() { if (!S.page) return; work[S.page.id + ':' + S.mode] = { p: xP.getImageData(0, 0, W, H), s: xS.getImageData(0, 0, W, H), f: S.filled ? new Set(S.filled) : null, galId: S.galId }; }
async function openPage(pg) {
  ac(); show('paint'); S.page = pg; S.undo = []; S.redo = []; updUndo();
  xP.clearRect(0, 0, W, H); xS.clearRect(0, 0, W, H); xL.clearRect(0, 0, W, H); xN.clearRect(0, 0, W, H);
  const an = await analyze(pg); S.an = an; xL.putImageData(an.lineImg, 0, 0);
  const w = work[pg.id + ':' + S.mode];
  S.filled = S.mode === 'num' ? new Set() : null; S.galId = null; S.selNum = 1;
  if (w) { xP.putImageData(w.p, 0, 0); xS.putImageData(w.s, 0, 0); if (w.f) S.filled = new Set(w.f); S.galId = w.galId; }
  else if (S.mode === 'num') { for (const r of an.reg) if (r && !r.num) fillRegion(r.id, PALETTE[r.ref][2]); }
  if (S.mode === 'num') { for (let k = 1; k <= an.numColors.length; k++) if (!numDone(k)) { S.selNum = k; break; } }
  buildTools(); buildPalette(); drawNums(); updToggles(); updPeek(); fitBoard();
}
function fitBoard() { const st = $('stage'), b = $('board'); const sw = st.clientWidth - 16, sh = st.clientHeight - 16; const w = Math.min(sw, sh * 4 / 3); b.style.width = w + 'px'; b.style.height = (w * 3 / 4) + 'px'; }
window.addEventListener('resize', fitBoard);
// ---------- drawing ----------
const board = $('board');
function pt(e) { const r = board.getBoundingClientRect(); return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height }; }
let last = null, hue = 0, clipOn = false, strokeLayer = null;
function regionAt(p) { const x = Math.round(p.x), y = Math.round(p.y); if (x < 0 || y < 0 || x >= W || y >= H) return 0; let id = S.an.lab[y * W + x];
  if (!id) { for (let r = 1; r <= 9 && !id; r++) for (const [dx, dy] of [[r, 0], [-r, 0], [0, r], [0, -r]]) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H && S.an.lab[yy * W + xx]) { id = S.an.lab[yy * W + xx]; break; } } }
  return id; }
function brushColor(dist) { if (S.color === 'rainbow') { hue = (hue + dist * 0.8) % 360; return `hsl(${hue},90%,58%)`; } if (S.color === 'glitter') return '#e0b23a'; return S.color; }
function seg(ctx, a, b) {
  const w = SIZES[S.size]; const dx = b.x - a.x, dy = b.y - a.y, dist = Math.hypot(dx, dy); const col = brushColor(dist);
  if (S.tool === 'marker' || S.tool === 'eraser') { ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = w; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x + 0.01, b.y); ctx.stroke(); }
  else if (S.tool === 'crayon') { ctx.fillStyle = col; const steps = Math.max(1, dist / 2); for (let s = 0; s <= steps; s++) { const cx = a.x + dx * s / steps, cy = a.y + dy * s / steps; const k = Math.ceil(w * 0.9);
      for (let q = 0; q < k; q++) { const ang = Math.random() * 6.283, rr = Math.sqrt(Math.random()) * w / 2; ctx.globalAlpha = 0.35 + Math.random() * 0.5; const sz = 1.5 + Math.random() * 2; ctx.fillRect(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, sz, sz); } } ctx.globalAlpha = 1; }
  else if (S.tool === 'glitter') { ctx.lineCap = 'round'; ctx.lineWidth = w; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x + 0.01, b.y); ctx.stroke();
    const k = Math.ceil(dist * w / 60) + 1; const cols = ['#ffffff', '#fff59d', '#f8bbd0', '#b3e5fc'];
    for (let q = 0; q < k; q++) { const t = Math.random(), ang = Math.random() * 6.283, rr = Math.random() * w / 2; const x = a.x + dx * t + Math.cos(ang) * rr, y = a.y + dy * t + Math.sin(ang) * rr; const s = 1 + Math.random() * Math.max(2, w / 10);
      ctx.fillStyle = cols[q % 4]; ctx.beginPath(); ctx.moveTo(x, y - s * 2); ctx.lineTo(x + s * 0.5, y - s * 0.5); ctx.lineTo(x + s * 2, y); ctx.lineTo(x + s * 0.5, y + s * 0.5); ctx.lineTo(x, y + s * 2); ctx.lineTo(x - s * 0.5, y + s * 0.5); ctx.lineTo(x - s * 2, y); ctx.lineTo(x - s * 0.5, y - s * 0.5); ctx.fill(); } }
}
function drawSeg(a, b) {
  const w = SIZES[S.size] / 2 + 12; const bx = Math.max(0, Math.floor(Math.min(a.x, b.x) - w)), by = Math.max(0, Math.floor(Math.min(a.y, b.y) - w));
  const bw = Math.min(W, Math.ceil(Math.max(a.x, b.x) + w)) - bx, bh = Math.min(H, Math.ceil(Math.max(a.y, b.y) + w)) - by; if (bw <= 0 || bh <= 0) return;
  if (S.tool === 'eraser') { for (const x of [xP, xS]) { x.save(); x.globalCompositeOperation = 'destination-out'; seg(x, a, b); x.restore(); } return; }
  if (!clipOn) { seg(xP, a, b); return; }
  xT.clearRect(bx, by, bw, bh); seg(xT, a, b); xT.save(); xT.globalCompositeOperation = 'destination-in'; xT.drawImage(maskC, bx, by, bw, bh, bx, by, bw, bh); xT.restore();
  xP.drawImage(tmp, bx, by, bw, bh, bx, by, bw, bh);
}
function placeSticker(p) {
  const im = stickerImgs[S.sticker]; const s = STK_SIZES[S.size]; pushUndo('s');
  xS.save(); xS.translate(p.x, p.y); xS.rotate((Math.random() - 0.5) * 0.5); xS.drawImage(im, -s / 2, -s / 2, s, s); xS.restore(); SND.stamp(); sparkleBurst(p, 10);
}
board.addEventListener('pointerdown', e => {
  if (!S.an) return; e.preventDefault(); ac(); const p = pt(e);
  if (S.mode === 'num') { numTap(p); return; }
  if (S.tool === 'fill') { const id = regionAt(p); if (!id) return; pushUndo('p'); fillRegion(id, S.color); SND.pop(); sparkleBurst(p, 6); return; }
  if (S.tool === 'sticker') { placeSticker(p); return; }
  board.setPointerCapture(e.pointerId); S.drawing = true; pushUndo(S.tool === 'eraser' ? 'ps' : 'p');
  clipOn = false; if (prefs.magic && S.tool !== 'eraser') { const id = regionAt(p); if (id) { const m = regionMask(S.an, id); const md = xM.createImageData(W, H); for (const i of m.idx) md.data[i * 4 + 3] = 255; xM.putImageData(md, 0, 0); clipOn = true; } }
  last = p; drawSeg(p, { x: p.x + 0.1, y: p.y });
});
board.addEventListener('pointermove', e => { if (!S.drawing) return; e.preventDefault(); const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e]; for (const ev of (evs.length ? evs : [e])) { const p = pt(ev); drawSeg(last, p); last = p; } });
const endStroke = () => { S.drawing = false; last = null; };
board.addEventListener('pointerup', endStroke); board.addEventListener('pointercancel', endStroke);
function numTap(p) {
  const id = regionAt(p); if (!id) return; const r = S.an.reg[id];
  if (!r.num || S.filled.has(id)) return;
  if (r.num !== S.selNum) { SND.nope(); const b = document.querySelector(`.sw[data-num="${r.num}"]`); if (b) { b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); } return; }
  pushUndo('p'); fillRegion(id, PALETTE[r.ref][2]); S.filled.add(id); SND.pop(); sparkleBurst(p, 8);
  if (numDone(S.selNum)) { SND.ding(); for (let k = 1; k <= S.an.numColors.length; k++) if (!numDone(k)) { S.selNum = k; break; } }
  buildPalette(); drawNums();
  if (S.an.reg.every(r => !r || !r.num || S.filled.has(r.id))) setTimeout(finish, 400);
}
// ---------- buttons ----------
$('bHome').onclick = () => { storeWork(); SND.tick(); S.an = null; show('home'); buildHome(); };
$('bUndo').onclick = doUndo; $('bRedo').onclick = doRedo;
$('bMagic').onclick = () => { prefs.magic = !prefs.magic; savePrefs(); updToggles(); SND.tick(); };
$('bSound').onclick = () => { prefs.sound = !prefs.sound; savePrefs(); updToggles(); SND.tick(); if (!prefs.sound) MUSIC.stop(); else musicGo(); };
$('cMusic').onclick = () => { MUSIC.toggle(); musicBtn(); };
function musicBtn() { setIcon($('cMusic'), MUSIC.on ? ICON.music : ICON.musicOff); $('cMusic').classList.toggle('off', !MUSIC.on); } musicBtn();
$('bSpeak').onclick = () => { prefs.speak = !prefs.speak; savePrefs(); updToggles(); buildPalette(); say('¡Hola, Aspen! Vamos a colorear.'); };
$('bClear').onclick = () => { pushUndo('ps'); xP.clearRect(0, 0, W, H); xS.clearRect(0, 0, W, H); if (S.mode === 'num') { S.filled = new Set(); for (const r of S.an.reg) if (r && !r.num) fillRegion(r.id, PALETTE[r.ref][2]); S.selNum = 1; buildPalette(); drawNums(); } SND.tick(); };
$('bDone').onclick = () => finish();
// ---------- composite / gallery ----------
function composite(scale = 1) { const c = document.createElement('canvas'); c.width = W * scale; c.height = H * scale; const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
  x.drawImage(cvPaint, 0, 0, c.width, c.height); x.drawImage(cvLines, 0, 0, c.width, c.height); x.drawImage(cvStick, 0, 0, c.width, c.height); return c; }
function gallery() { return LS.get('jcp_gallery', []); }
function saveGallery(list) { while (list.length) { if (LS.set('jcp_gallery', list)) return true; list.shift(); } return false; }
function saveToGallery() {
  const url = composite().toDataURL('image/jpeg', 0.85); const list = gallery(); const item = { id: S.galId || ('g' + Date.now()), page: S.page.id, t: Date.now(), img: url };
  const k = list.findIndex(g => g.id === item.id); if (k >= 0) list.splice(k, 1); list.push(item); S.galId = item.id; saveGallery(list); return url;
}
function finish() { const url = saveToGallery(); storeWork(); $('cImg').src = url; $('celebrate').classList.add('on'); SND.fanfare(); confetti(); say('¡Muy bien, Aspen! ¡Excelente!'); }
async function download(url, name) {
  try { const blob = await (await fetch(url)).blob(); const file = new File([blob], name, { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [file] }) && /iPad|iPhone|Macintosh/.test(navigator.userAgent) && 'ontouchend' in document) { await navigator.share({ files: [file] }); return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
  } catch (e) { window.open(url, '_blank'); }
}
function pngName() { const d = new Date(); return `juniper-${S.page ? S.page.id : 'art'}-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}.png`; }
$('cDown').onclick = () => download(composite().toDataURL('image/png'), pngName());
$('cMore').onclick = () => { $('celebrate').classList.remove('on'); };
$('cHome').onclick = () => { $('celebrate').classList.remove('on'); $('bHome').onclick(); };
$('cGal').onclick = () => { $('celebrate').classList.remove('on'); storeWork(); S.an = null; openGallery(); };
function openGallery() {
  show('gallery'); const g = $('galGrid'); g.innerHTML = ''; const list = gallery().slice().reverse();
  if (!list.length) { g.innerHTML = `<div class="empty empty3" style="grid-column:1/-1;text-align:center"><img src="art/chars/juniper_think.webp" alt=""><p class="emptyMsg">No pictures yet!<br><span>Finish a coloring page and it will hang here.</span></p><div>${UI3('palette')}${UI3('brush')}</div></div>`; return; }
  list.forEach(it => { const b = document.createElement('button'); b.className = 'card'; b.innerHTML = `<img src="${it.img}" alt="">`;
    b.onclick = () => { viewing = it; $('vImg').src = it.img; $('viewer').classList.add('on'); SND.tick(); }; g.appendChild(b); });
}
let viewing = null;
$('openGallery').onclick = () => { SND.tick(); openGallery(); };
$('gHome').onclick = () => { show('home'); buildHome(); };
$('vClose').onclick = () => $('viewer').classList.remove('on');
$('vDel').onclick = () => { if (!viewing) return; saveGallery(gallery().filter(g => g.id !== viewing.id)); $('viewer').classList.remove('on'); openGallery(); };
$('vDown').onclick = () => { if (!viewing) return; const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; c.getContext('2d').drawImage(im, 0, 0); download(c.toDataURL('image/png'), `juniper-${viewing.page}-${viewing.id}.png`); }; im.src = viewing.img; };
// ---------- fx ----------
const fx = $('fx'), xF = fx.getContext('2d'); let parts = [], fxOn = false;
function fxSize() { fx.width = innerWidth; fx.height = innerHeight; } fxSize(); window.addEventListener('resize', fxSize);
function fxLoop() { xF.clearRect(0, 0, fx.width, fx.height); parts = parts.filter(p => p.life > 0);
  for (const p of parts) { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.99; p.rot += p.vr; p.life--; xF.save(); xF.globalAlpha = Math.min(1, p.life / 30); xF.translate(p.x, p.y); xF.rotate(p.rot); xF.fillStyle = p.c;
    if (p.star) { xF.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? p.s * 0.4 : p.s, a = i * Math.PI / 5; xF.lineTo(Math.cos(a) * r, Math.sin(a) * r); } xF.fill(); } else xF.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); xF.restore(); }
  if (parts.length) requestAnimationFrame(fxLoop); else fxOn = false; }
function kick() { if (!fxOn) { fxOn = true; requestAnimationFrame(fxLoop); } }
const CONF = ['#e53935', '#f57c00', '#fdd835', '#43a047', '#1e88e5', '#8e24aa', '#f48fb1', '#26c6da'];
function confetti() { for (let i = 0; i < 180; i++) parts.push({ x: fx.width / 2 + (Math.random() - 0.5) * 200, y: fx.height * 0.55, vx: (Math.random() - 0.5) * 22, vy: -8 - Math.random() * 16, g: 0.35, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, s: 8 + Math.random() * 10, c: CONF[i % 8], life: 120 + Math.random() * 60, star: i % 5 === 0 }); kick(); }
function sparkleBurst(p, n) { const r = board.getBoundingClientRect(); const x = r.left + p.x * r.width / W, y = r.top + p.y * r.height / H;
  for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = 2 + Math.random() * 4; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 0.05, rot: 0, vr: 0.2, s: 5 + Math.random() * 6, c: CONF[(Math.random() * 8) | 0], life: 30 + Math.random() * 20, star: true }); } kick(); }
// ---------- start ----------
updToggles(); buildHome();
// ?book=<world> (from Juniper Learn's world hubs): jump to that world's pages
(() => { let bk = null; try { bk = new URLSearchParams(location.search).get('book'); } catch (e) {} if (!bk) return; setTimeout(() => { const cards = [...document.querySelectorAll('#pageGrid .card')].filter(c => { const pg = ART.pages.find(p => p.id === c.dataset.page); return pg && pg.world === bk; }); if (!cards.length) return; cards[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); cards.forEach(c => c.classList.add('bookhi')); }, 500); })();
const _rw = () => { applyRewards(true); celebrateScenes(); }; document.addEventListener('visibilitychange', () => { if (!document.hidden) _rw(); }); window.addEventListener('pageshow', _rw); window.addEventListener('storage', e => { if (e.key === 'juniperRewards') _rw(); });
if ($('toLearn')) { $('toLearn').innerHTML = `<img src="learn/apple-touch-icon.png?v=5" alt="" style="width:56px;height:56px;border-radius:14px" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'🦊',style:'font-size:40px;line-height:56px'}))">`; }
{ const pb = $('bPeek'); if (pb) pb.onclick = peek; }
window.JCP = { S, analyze, peek, openPage, finish, gallery, pages: ART.pages, STICKERS, applyRewards, celebrateScenes, buildHome };
})();

// ---------- auto-update: poll cversion.json, reload when a new build is live ----------
const CBUILD = '/*CBUILD*/';
function checkUpdate() { if (location.protocol === 'file:') return; fetch('cversion.json?t=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(j => { if (j && j.v && j.v !== CBUILD && !document.getElementById('paint').classList.contains('on')) location.reload(); }).catch(() => {}); }
document.addEventListener('visibilitychange', () => { if (!document.hidden) checkUpdate(); }); setInterval(checkUpdate, 5 * 60 * 1000); setTimeout(checkUpdate, 3000);
setTimeout(() => window.JCP && JCP.celebrateScenes(), 600);

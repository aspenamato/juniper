// Juniper's Learning Park v2 - original character art: soft rounded shapes, flat warm colours,
// saturated sparkle highlights. Every character has parts tagged for idle / talk animation.
// v7: glossy soft-3D storybook art (art library at ../art). Characters in the library are drawn as
// <svg class="chr"> wrappers holding an <image>, so every layout box and tap target keeps its size.
const SART = (() => { const base = '../art/';
  const POSES = ['idle', 'wave', 'cheer', 'think', 'point', 'princess', 'skate', 'riding', 'golf', 'ski'];
  const ITEMS = ['moonstone', 'compass', 'spoon', 'skate', 'tee', 'lantern', 'coqui', 'sunkey', 'amulet', 'acorn', 'prism', 'torch', 'glacier', 'mirror', 'crown', 'lens', 'seed', 'chip', 'ltag', 'wings', 'taxilight', 'pearlball', 'snowglobe', 'skypass'];
  const DEFPOSE = { juniper: 'wave' };
  const pose = (n, p) => { p = POSES.includes(p) ? p : (DEFPOSE[n] || 'idle'); return SZ[n + '_' + p] ? p : (SZ[n + '_idle'] ? 'idle' : 'wave'); };
  const SZ = {"teri_wave":[278,560],"teri_point":[290,560],"gigi_wave":[262,560],"gigi_point":[298,560],"bro1_idle":[200,420],"bro2_idle":[186,420],"bro3_idle":[195,420],"troll_idle":[282,350],"twister_idle":[286,350],"jamgoblin_idle":[284,350],"sneak_idle":[291,350],"slush_idle":[365,350],"jetlag_idle":[304,350],"gwagon_idle":[712,360],"juniper_tutu":[299,468],"juniper_blades":[271,468],"juniper_hightops":[282,468],"juniper_icegown":[321,468],"juniper_goldgown":[321,468],"abominable_cheer":[325,368],"abominable_idle":[280,367],"abominable_point":[273,366],"abominable_think":[229,372],"abominable_wave":[288,365],"aspen_cheer":[318,584],"aspen_idle":[246,581],"aspen_point":[268,582],"aspen_think":[233,581],"aspen_wave":[270,580],"barnacle_cheer":[317,341],"barnacle_idle":[259,340],"barnacle_point":[274,349],"barnacle_think":[232,347],"barnacle_wave":[280,349],"coqui_cheer":[340,423],"coqui_idle":[249,292],"coqui_point":[261,418],"coqui_think":[227,413],"coqui_wave":[272,425],"cucocloud_cheer":[270,215],"cucocloud_idle":[248,218],"cucocloud_point":[255,214],"cucocloud_think":[239,217],"cucocloud_wave":[250,215],"drstatic_cheer":[334,526],"drstatic_idle":[238,514],"drstatic_point":[266,512],"drstatic_think":[234,511],"drstatic_wave":[265,508],"ermine_cheer":[272,474],"ermine_idle":[257,399],"ermine_point":[263,441],"ermine_think":[242,456],"ermine_wave":[314,447],"flurry_cheer":[284,444],"flurry_idle":[235,430],"flurry_point":[261,431],"flurry_think":[230,438],"flurry_wave":[264,439],"gargoyle_cheer":[303,357],"gargoyle_idle":[256,352],"gargoyle_point":[270,368],"gargoyle_think":[251,372],"gargoyle_wave":[279,370],"glitch_cheer":[316,440],"glitch_idle":[215,433],"glitch_point":[243,432],"glitch_think":[205,430],"glitch_wave":[257,430],"goblin_cheer":[311,364],"goblin_idle":[270,340],"goblin_point":[282,339],"goblin_think":[258,338],"goblin_wave":[277,334],"gremlin_cheer":[292,436],"gremlin_idle":[289,377],"gremlin_point":[278,375],"gremlin_think":[272,363],"gremlin_wave":[268,368],"hag_cheer":[264,432],"hag_idle":[241,440],"hag_point":[263,440],"hag_think":[234,430],"hag_wave":[254,426],"icequeen_cheer":[283,446],"icequeen_idle":[266,430],"icequeen_point":[264,426],"icequeen_think":[248,428],"icequeen_wave":[266,424],"juniper_cheer":[310,453],"juniper_golf":[306,468],"juniper_idle":[274,468],"juniper_point":[288,453],"juniper_princess":[321,468],"juniper_riding":[270,468],"juniper_riding_gold":[270,468],"juniper_skate":[296,468],"juniper_ski":[310,468],"juniper_think":[254,456],"juniper_wave":[292,451],"lola_cheer":[332,389],"lola_idle":[212,399],"lola_point":[295,391],"lola_think":[222,395],"lola_wave":[278,395],"mamafox_cheer":[306,569],"mamafox_idle":[253,572],"mamafox_point":[291,579],"mamafox_think":[257,578],"mamafox_wave":[302,575],"marcus_cheer":[279,393],"marcus_idle":[254,397],"marcus_point":[278,392],"marcus_think":[218,396],"marcus_wave":[267,392],"marengo_cheer":[253,434],"marengo_idle":[299,416],"marengo_point":[265,413],"marengo_think":[252,417],"marengo_wave":[257,412],"nicolo_cheer":[336,544],"nicolo_idle":[234,541],"nicolo_point":[274,544],"nicolo_think":[207,542],"nicolo_wave":[295,538],"oscar_cheer":[314,409],"oscar_idle":[231,360],"oscar_point":[282,363],"oscar_think":[230,374],"oscar_wave":[273,366],"pearl_cheer":[326,449],"pearl_idle":[248,448],"pearl_point":[309,450],"pearl_think":[249,452],"pearl_wave":[304,449],"pickle_cheer":[304,396],"pickle_idle":[258,445],"pickle_point":[288,444],"pickle_think":[232,443],"pickle_wave":[264,447],"quinn_cheer":[327,452],"quinn_idle":[229,454],"quinn_point":[266,456],"quinn_think":[246,454],"quinn_wave":[285,453],"ratking_cheer":[303,458],"ratking_idle":[256,470],"ratking_point":[293,467],"ratking_think":[246,469],"ratking_wave":[260,462],"rocco_cheer":[289,451],"rocco_idle":[259,451],"rocco_point":[299,448],"rocco_think":[245,452],"rocco_wave":[291,450],"scramble_cheer":[293,438],"scramble_idle":[294,434],"scramble_point":[300,430],"scramble_think":[241,436],"scramble_wave":[292,435],"smoke_cheer":[275,330],"smoke_idle":[246,320],"smoke_point":[260,327],"smoke_think":[242,326],"smoke_wave":[264,330],"teddy_cheer":[266,455],"teddy_idle":[273,422],"teddy_point":[277,440],"teddy_think":[260,456],"teddy_wave":[268,441],"toulouse_cheer":[288,458],"toulouse_idle":[253,454],"toulouse_point":[271,460],"toulouse_think":[246,459],"toulouse_wave":[278,454],"weasel_cheer":[328,464],"weasel_idle":[276,454],"weasel_point":[282,476],"weasel_think":[250,498],"weasel_wave":[265,498],"weevil_cheer":[297,372],"weevil_idle":[256,399],"weevil_point":[252,399],"weevil_think":[237,394],"weevil_wave":[297,397],"winnie_cheer":[287,418],"winnie_idle":[256,410],"winnie_point":[276,410],"winnie_think":[247,416],"winnie_wave":[279,412],"witch_cheer":[289,538],"witch_idle":[258,492],"witch_point":[265,481],"witch_think":[245,478],"witch_wave":[277,480],"wolf_cheer":[303,463],"wolf_idle":[271,473],"wolf_point":[293,481],"wolf_think":[250,484],"wolf_wave":[296,480]};
  const chr = (n, vb, o = {}) => { const p = pose(n, o.pose), z = SZ[n + '_' + p] || [300, 440]; return `<svg class="chr art chr-${o.cname || n} ${o.cls || ''}" viewBox="0 0 ${z[0]} ${z[1]}" xmlns="http://www.w3.org/2000/svg"><g class="art-bob"><image href="${base}chars/${n}_${p}.webp" width="${z[0]}" height="${z[1]}"/></g></svg>`; };
  return { base, ITEMS, SZ, hasChr: n => !!(SZ[n + '_idle'] || SZ[n + '_wave']), hasItem: id => ITEMS.includes(id), chr, pose, ui: n => `${base}ui/${n}.webp`, bg: (w, sm = true) => `${base}bg/${w}${sm ? '_sm' : ''}.webp` }; })();
const CHARS = (() => {
const OL = '#3b2147';
const p = (d, f = 'none', x = '') => `<path d="${d}" fill="${f}" ${x}/>`;
const e = (cx, cy, rx, ry, f, x = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${x}/>`;
const c = (cx, cy, r, f, x = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${x}/>`;
const r = (x, y, w, h, rr, f, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rr}" fill="${f}" ${ex}/>`;
const g = (cls, inner, ex = '') => `<g class="${cls}" ${ex}>${inner}</g>`;
const sheen = (cx, cy, rx, ry, rot = -20, op = 0.38) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="none" opacity="${op}" transform="rotate(${rot} ${cx} ${cy})"/>`;
const blush = (x, y, rx = 11, ry = 7) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#ff7eb6" stroke="none" opacity=".75"/>`;
function eye(x, y, s = 1, iris = '#ff4fa3') { return `${e(x, y, 10 * s, 13 * s, '#2a1838')}<path d="M${x - 8 * s} ${y + 4 * s} Q${x} ${y + 14 * s} ${x + 8 * s} ${y + 4 * s} Q${x} ${y + 9 * s} ${x - 8 * s} ${y + 4 * s} Z" fill="${iris}" stroke="none" opacity=".9"/>${c(x - 3 * s, y - 5 * s, 4.2 * s, '#fff', 'stroke="none"')}${c(x + 3.5 * s, y + 3 * s, 1.8 * s, '#fff', 'stroke="none"')}`; }
const eyes = (x1, x2, y, s, iris) => g('ch-eyes', eye(x1, y, s, iris) + eye(x2, y, s, iris));
function mouth(x, y, w = 14, tongue = '#ff7aa8') {
  const closed = `<path class="m-closed" d="M${x - w} ${y - 2} Q${x - w / 2} ${y + w * 0.75} ${x} ${y - 2} Q${x + w / 2} ${y + w * 0.75} ${x + w} ${y - 2}" fill="none" stroke-width="4.5"/>`;
  const open = `<g class="m-open"><path d="M${x - w} ${y - 3} Q${x} ${y - 6} ${x + w} ${y - 3} Q${x + w * 0.8} ${y + w * 1.3} ${x} ${y + w * 1.35} Q${x - w * 0.8} ${y + w * 1.3} ${x - w} ${y - 3} Z" fill="#7d1d45" stroke-width="4"/><ellipse cx="${x}" cy="${y + w * 0.95}" rx="${w * 0.55}" ry="${w * 0.32}" fill="${tongue}" stroke="none"/></g>`;
  return g('ch-mouth', closed + open); }
const spark = (x, y, s, col = '#fff59d') => `<path class="ch-spark" d="M${x} ${y - 12 * s} Q${x + 2 * s} ${y - 2 * s} ${x + 12 * s} ${y} Q${x + 2 * s} ${y + 2 * s} ${x} ${y + 12 * s} Q${x - 2 * s} ${y + 2 * s} ${x - 12 * s} ${y} Q${x - 2 * s} ${y - 2 * s} ${x} ${y - 12 * s} Z" fill="${col}" stroke="none"/>`;
const wrap = (name, vb, inner, extra = '', cls = '') => `<svg class="chr chr-${name} ${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" ${extra}><g stroke="${OL}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${inner}</g></svg>`;
// ---------------- palette ----------------
const FOX = '#ff7a2e', FOXD = '#e2541a', CRM = '#fff1dc', EARIN = '#ffc4c9', SOCK = '#5b2b3a', TIP = '#a2381c';
// ---------------- Juniper ----------------
function foxHeadInner(o = {}) { let s = '';
  // her RIGHT ear (viewer's left): straight
  s += g('ch-earR', p('M-72 -46 C-90 -96 -84 -138 -64 -152 C-42 -128 -24 -100 -18 -76 Z', FOX) + p('M-64 -152 C-56 -142 -48 -132 -42 -122 C-52 -122 -62 -126 -72 -130 C-72 -138 -68 -146 -64 -152 Z', TIP) + p('M-60 -62 C-70 -94 -68 -116 -60 -126 C-48 -110 -38 -94 -34 -80 Z', EARIN, 'stroke="none"'));
  // her LEFT ear (viewer's right): crooked, tip folds over and points sideways
  s += g('ch-earL', p('M18 -78 C30 -104 50 -126 72 -126 C92 -124 110 -112 118 -96 C102 -94 88 -92 80 -88 C78 -74 74 -60 72 -46 Z', FOX) + p('M72 -126 C92 -124 110 -112 118 -96 C104 -95 90 -93 80 -88 C80 -102 78 -116 72 -126 Z', TIP) + p('M32 -78 C42 -98 56 -112 68 -112 C70 -96 66 -76 62 -60 Z', EARIN, 'stroke="none"'));
  s += p('M-84 -30 C-88 -82 -46 -102 0 -102 C46 -102 88 -82 84 -30 C84 -8 94 4 102 10 C82 13 72 22 60 27 C40 39 20 41 0 41 C-20 41 -40 39 -60 27 C-72 22 -82 13 -102 10 C-94 4 -84 -8 -84 -30 Z', FOX);
  s += p('M-96 9 C-72 -4 -44 -2 -26 -16 C-14 -7 -6 -5 0 -5 C6 -5 14 -7 26 -16 C44 -2 72 -4 96 9 C76 15 64 24 54 29 C36 39 18 41 0 41 C-18 41 -36 39 -54 29 C-64 24 -76 15 -96 9 Z', CRM);
  s += p('M-10 -100 Q0 -84 10 -100', 'none', `stroke="${FOXD}" stroke-width="5"`);
  s += sheen(-34, -80, 24, 10, -15) + sheen(40, -84, 10, 5, 15, 0.3);
  if (o.helmet) s += p('M-88 -48 C-88 -124 88 -124 88 -48 Q0 -66 -88 -48 Z', o.helmet) + sheen(-30, -100, 26, 9, -12, 0.5) + p('M-40 -104 q40 -16 80 0', 'none');
  s += eyes(-32, 32, -40, 1.15, '#ff4fa3');
  s += p('M-13 -18 Q0 -25 13 -18 Q11 -6 0 -2 Q-11 -6 -13 -18 Z', '#2a1838') + c(-4, -18, 3, '#fff', 'stroke="none" opacity=".8"');
  s += mouth(0, 6, 13);
  s += blush(-58, -12) + blush(58, -12);
  return s; }
function foot(type) {
  if (type === 'skate') return p('M-16 -6 L16 -6 L18 16 Q40 18 42 32 L42 40 L-16 40 Z', '#ffffff') + sheen(-4, 6, 6, 12, 0, 0.6) + p('M-8 4 l14 0 M-8 14 l16 0', 'none', 'stroke="#ff4fa3" stroke-width="4"') + p('M-8 40 L-8 50 M32 40 L32 50', 'none') + r(-24, 48, 72, 8, 4, '#b8c7ff') + sheen(10, 50, 24, 2, 0, 0.9);
  if (type === 'blade') { let s = p('M-16 -6 L16 -6 L18 16 Q40 18 42 32 L42 40 L-16 40 Z', '#8e44ff') + sheen(-4, 6, 6, 12, 0, 0.45) + r(-20, 40, 64, 10, 5, '#5b5f7a');
    [[-10, '#ff2fa0'], [14, '#26e0ff'], [38, '#c6ff3a']].forEach(([x, f]) => { s += `<g class="ch-wheel">${c(x, 64, 22, f, 'stroke="none" opacity=".35"')}${c(x, 64, 13, f)}${c(x, 64, 4, '#fff')}</g>`; }); return s; }
  if (type === 'boot') return p('M-18 -8 L18 -8 L20 10 Q42 12 42 28 L42 32 L-18 32 Z', '#2b1d1a') + r(-20, 28, 64, 8, 3, '#120c0b') + sheen(-6, 2, 6, 8, 0, 0.4);
  return p('M-16 -4 L16 -4 L18 10 Q40 12 40 28 L-16 28 Z', SOCK) + sheen(0, 4, 10, 4, 0, 0.3); }
// light-up ring: gold band with a glowing gem that pulses and twinkles (animated in CSS: .ch-ring)
function ringSvg(x, y) { return `<g class="ch-ring" transform="translate(${x} ${y})"><circle r="26" fill="#ff7ad9" opacity=".28" stroke="none" class="rg-glow"/><ellipse rx="15" ry="6" fill="none" stroke="#ffd34d" stroke-width="5"/><path d="M0 -20 L9 -9 L0 0 L-9 -9 Z" fill="#7ee8ff" stroke-width="3" class="rg-gem"/><path d="M-3 -14 L0 -17 L3 -14" stroke="#fff" stroke-width="2" fill="none"/><path d="M14 -24 l3 -8 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 Z" fill="#fff" stroke="none" class="rg-tw"/><path d="M-22 -10 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z" fill="#fff36b" stroke="none" class="rg-tw2"/></g>`; }
function juniperInner(o = {}) { const feet = o.feet || 'shoe'; let s = o.back || '';
  s += g('ch-tail', p('M-26 0 C-92 22 -152 -8 -168 -70 C-178 -112 -150 -136 -120 -122 C-128 -82 -100 -46 -30 -32 Z', FOX) + p('M-168 -70 C-178 -112 -150 -136 -120 -122 C-128 -106 -134 -90 -132 -76 C-146 -70 -156 -68 -168 -70 Z', CRM) + sheen(-120, -60, 26, 8, -30, 0.3));
  s += g('ch-legs', r(-38, 6, 32, 86, 16, FOX) + r(6, 6, 32, 86, 16, FOX) + r(-38, 62, 32, 30, 12, SOCK, 'stroke="none"') + r(6, 62, 32, 30, 12, SOCK, 'stroke="none"') + r(-38, 6, 32, 86, 16, 'none') + r(6, 6, 32, 86, 16, 'none') + (feet === 'boot' ? r(-40, 38, 36, 60, 10, '#2b1d1a') + r(4, 38, 36, 60, 10, '#2b1d1a') + r(-40, 38, 36, 9, 4, '#8a5a3b') + r(4, 38, 36, 9, 4, '#8a5a3b') + sheen(-28, 62, 4, 16, 0, 0.35) + sheen(16, 62, 4, 16, 0, 0.35) : '') + `<g transform="translate(-22 96)">${foot(feet)}</g><g transform="translate(22 96)">${foot(feet)}</g>`);
  let body = p('M-52 -8 C-58 -62 -30 -84 0 -84 C30 -84 58 -62 52 -8 C50 22 30 36 0 36 C-30 36 -50 22 -52 -8 Z', FOX) + e(0, -2, 30, 40, CRM, 'stroke="none"') + sheen(-26, -56, 14, 8, -30, 0.35);
  const arm = (side, ang, cls) => `<g transform="translate(${side * 36} -52)"><g class="${cls}"><g transform="rotate(${ang})">` + r(side > 0 ? -2 : -70, -12, 72, 28, 14, o.sleeve || FOX) + (o.sleeve && o.cuff ? r(side > 0 ? 44 : -54, -12, 10, 28, 3, o.cuff) : '') + c(side > 0 ? 68 : -68, 2, 16, o.glove || SOCK) + (o.glove ? p(`M${side * 60} -8 l${side * 10} 0`, 'none', 'stroke-width="3"') : '') + (side > 0 && o.ring ? ringSvg(68, 2) : '') + `</g></g></g>`;
  if (o.dress) body += o.dress;
  if (o.golf) body += `<g class="golfclub" transform="translate(-70 0) rotate(${o.golf} 0 -30)">` + r(-6, -40, 13, 158, 6, '#c9d2ee') + r(-3, -36, 4, 150, 2, '#ffffff', 'stroke="none" opacity=".7"') + p('M-14 112 L46 108 Q58 108 58 120 L58 132 Q58 138 50 138 L-14 138 Z', '#eef2ff') + r(-11, -54, 26, 50, 9, '#ff4fa3') + p('M-11 -40 h26 M-11 -28 h26 M-11 -16 h26', 'none', 'stroke-width="3"') + `</g>` + c(-12, 142, 11, '#fff');
  if (o.scarf) body += p('M-50 -74 Q0 -52 50 -74 L52 -54 Q0 -30 -52 -54 Z', o.scarf) + r(14, -56, 24, 58, 9, o.scarf) + sheen(-20, -64, 16, 4, 5, 0.4) + p('M20 -4 L20 6 M27 -4 L27 6 M34 -4 L34 6', 'none');
  const arms = arm(-1, o.armL ?? -25, 'ch-armL') + arm(1, o.armR ?? 25, 'ch-armR');
  s += g('ch-body', body + (o.bodyExtra || '') + `<g transform="translate(0 -108) scale(.92)">${g('ch-head', foxHeadInner({ helmet: o.helmet }) + (o.headExtra || ''))}</g>` + arms);
  return s; }
function mamaInner() { let s = '';
  s += g('ch-tail', p('M40 70 C130 80 176 20 160 -44 C150 -80 112 -84 108 -58 C122 -16 100 38 40 42 Z', FOX) + p('M160 -44 C150 -80 112 -84 108 -58 C120 -46 138 -38 162 -34 Z', CRM));
  s += g('ch-body', p('M-62 104 C-72 30 -44 -26 0 -30 C44 -26 72 30 62 104 Z', FOX) + p('M-26 -20 C-10 8 10 8 26 -20 C38 30 28 72 0 82 C-28 72 -38 30 -26 -20 Z', CRM) + r(-44, 40, 30, 64, 15, FOX) + r(14, 40, 30, 64, 15, FOX) + r(-44, 84, 30, 22, 10, SOCK) + r(14, 84, 30, 22, 10, SOCK) + sheen(-34, 10, 10, 26, 10, 0.3)
    + p('M-30 -24 Q0 -6 30 -24', 'none', 'stroke="#ffd34d" stroke-width="7"') + c(0, -12, 8, '#7ee8ff') + sheen(-2, -14, 3, 2, 0, 0.9)
    + `<g transform="translate(0 -72) scale(1.02)">${g('ch-head', mamaHead())}</g>`);
  return s; }
function mamaHead() { let s = '';
  s += g('ch-earR', p('M-72 -46 C-92 -98 -84 -140 -64 -154 C-42 -128 -24 -100 -18 -76 Z', FOX) + p('M-60 -62 C-70 -94 -68 -118 -60 -128 C-48 -110 -38 -94 -34 -80 Z', EARIN, 'stroke="none"'));
  s += g('ch-earL', p('M72 -46 C92 -98 84 -140 64 -154 C42 -128 24 -100 18 -76 Z', FOX) + p('M60 -62 C70 -94 68 -118 60 -128 C48 -110 38 -94 34 -80 Z', EARIN, 'stroke="none"'));
  s += p('M-80 -30 C-84 -82 -44 -100 0 -100 C44 -100 84 -82 80 -30 C80 -4 90 6 96 12 C76 14 66 24 54 30 C36 42 18 46 0 48 C-18 46 -36 42 -54 30 C-66 24 -76 14 -96 12 C-90 6 -80 -4 -80 -30 Z', FOX);
  s += p('M-90 11 C-68 -2 -42 0 -24 -14 C-12 -6 -6 -4 0 -4 C6 -4 12 -6 24 -14 C42 0 68 -2 90 11 C70 16 60 26 50 32 C32 42 16 46 0 48 C-16 46 -32 42 -50 32 C-60 26 -70 16 -90 11 Z', CRM) + sheen(-30, -78, 22, 9, -15);
  s += g('ch-eyes', eye(-30, -38, 1, '#7ee8ff') + eye(30, -38, 1, '#7ee8ff')) + p('M-44 -56 Q-30 -64 -18 -58 M18 -58 Q30 -64 44 -56', 'none', 'stroke-width="4"');
  s += p('M-12 -16 Q0 -23 12 -16 Q10 -5 0 -1 Q-10 -5 -12 -16 Z', '#2a1838') + mouth(0, 8, 12) + blush(-54, -10) + blush(54, -10);
  return s; }
// ---------------- Marcus the tortoise ----------------
function marcusInner() { const SK = '#9be15d', SH = '#22b573', PL = '#7fe0a0'; let s = '';
  s += g('ch-tail', p('M-120 6 Q-152 0 -160 22 Q-140 28 -118 24 Z', SK));
  s += g('ch-legs', e(-82, 52, 26, 30, SK) + e(-30, 60, 22, 26, SK) + e(42, 60, 22, 26, SK) + e(92, 52, 26, 30, SK));
  let sh = p('M-124 22 C-124 -88 -68 -118 0 -118 C68 -118 124 -88 124 22 Z', SH);
  sh += p('M-38 -84 L38 -84 L60 -40 L38 4 L-38 4 L-60 -40 Z', PL) + p('M-104 -10 L-70 -64 L-60 -40 L-38 4 L-62 18 Z', PL) + p('M104 -10 L70 -64 L60 -40 L38 4 L62 18 Z', PL) + p('M-50 -104 Q0 -124 50 -104 L38 -84 L-38 -84 Z', PL);
  sh += sheen(-50, -82, 34, 12, -25, 0.45) + c(70, -70, 6, '#fff', 'stroke="none" opacity=".7"') + r(-136, 10, 272, 26, 13, '#ffc85c') + sheen(0, 16, 110, 4, 0, 0.5);
  s += g('ch-body', sh);
  let hd = p('M104 -4 C128 -30 150 -46 176 -60 L200 2 C170 14 140 26 108 26 Z', SK) + e(196, -36, 52, 46, SK) + sheen(178, -64, 20, 8, -20) ;
  hd += g('ch-eyes', eye(178, -44, 0.9, '#2fe0c8') + eye(214, -44, 0.9, '#2fe0c8')) + p('M164 -62 Q178 -70 190 -64 M202 -64 Q214 -70 226 -62', 'none', 'stroke-width="4"');
  hd += mouth(196, -14, 12) + blush(166, -22, 9, 6) + blush(232, -24, 8, 6);
  s += g('ch-head', hd);
  return s; }
// ---------------- Oscar the owl (green carnation) ----------------
function oscarInner() { const BR = '#a2643c', BL = '#f3c98f', FD = '#fde3b8'; let s = '';
  s += g('ch-earR', p('M-70 -96 L-92 -150 L-40 -112 Z', BR)) + g('ch-earL', p('M70 -96 L92 -150 L40 -112 Z', BR));
  let b = p('M-92 30 C-98 -76 -52 -124 0 -124 C52 -124 98 -76 92 30 C88 108 44 140 0 140 C-44 140 -88 108 -92 30 Z', BR) + p('M-54 30 C-56 -6 -28 -18 0 -18 C28 -18 56 -6 54 30 C52 86 28 112 0 112 C-28 112 -52 86 -54 30 Z', BL);
  b += [[-24, 20], [0, 30], [24, 20], [-14, 56], [14, 56], [0, 82]].map(([x, y]) => p(`M${x - 8} ${y} Q${x} ${y + 9} ${x + 8} ${y}`, 'none', 'stroke-width="3.5"')).join('');
  b += sheen(-50, -80, 24, 10, -30) + p('M-26 140 l-6 14 M-14 140 l0 16 M-2 140 l6 14 M14 140 l-6 14 M26 140 l0 16 M38 140 l6 14', 'none', 'stroke="#ff9f1c" stroke-width="7"');
  // carnation (green) on chest
  b += `<g transform="translate(46 26)">${p('M0 14 Q4 34 -2 52', 'none', 'stroke="#2e9e4f" stroke-width="5"')}${p('M-24 0 Q-26 -20 -10 -22 Q-6 -34 8 -28 Q24 -30 24 -12 Q34 0 22 12 Q16 26 0 22 Q-16 28 -22 14 Q-34 6 -24 0 Z', '#3ddc84')}${p('M-12 -2 Q-10 -12 0 -12 Q12 -12 12 -2 Q14 8 4 10 Q-8 12 -12 -2 Z', '#b6ff7a')}${sheen(-8, -14, 8, 4, -20, 0.6)}</g>`;
  s += g('ch-armR', p('M-90 -10 C-120 20 -118 70 -86 96 C-84 60 -80 20 -76 -6 Z', '#8a5230')) + g('ch-armL', p('M90 -10 C120 20 118 70 86 96 C84 60 80 20 76 -6 Z', '#8a5230'));
  let f = c(-36, -64, 34, FD) + c(36, -64, 34, FD) + g('ch-eyes', eye(-36, -64, 1.6, '#ffb300') + eye(36, -64, 1.6, '#ffb300'));
  f += g('ch-mouth', `<path class="m-closed" d="M-12 -40 L12 -40 L0 -16 Z" fill="#ff9f1c"/><g class="m-open"><path d="M-13 -42 L13 -42 L0 -30 Z" fill="#ff9f1c"/><path d="M-11 -26 L11 -26 L0 -10 Z" fill="#ff9f1c"/><path d="M-9 -30 L9 -30 L0 -24 Z" fill="#7d1d45" stroke="none"/></g>`);
  s += g('ch-body', b + g('ch-head', f));
  return s; }
// ---------------- Scramble the squirrel ----------------
function scrambleInner() { const FUR = '#d2692e', LT = '#ffd9a8', DK = '#9c4520'; let s = '';
  s += g('ch-tail', p('M30 90 C110 100 150 30 128 -40 C110 -100 40 -120 30 -70 C20 -30 80 -20 84 20 C88 50 60 70 30 70 Z', FUR) + p('M60 -84 C90 -84 120 -60 126 -30 C110 -50 90 -60 70 -58 Z', LT, 'stroke="none"') + sheen(110, 10, 10, 30, 10, 0.3));
  let b = p('M-60 110 C-70 40 -44 -10 0 -12 C44 -10 70 40 60 110 Z', FUR) + p('M-28 0 C-12 24 12 24 28 0 C38 40 28 84 0 92 C-28 84 -38 40 -28 0 Z', LT) + e(-34, 110, 24, 12, FUR) + e(34, 110, 24, 12, FUR);
  b += `<g transform="translate(0 30)">${e(0, 10, 18, 22, '#c98a4b')}${p('M-20 2 Q-20 -18 0 -18 Q20 -18 20 2 Z', '#7a4a2a')}${r(-3, -28, 6, 12, 3, '#5a3520')}${sheen(-6, 6, 4, 8, 0, 0.5)}</g>` + e(-22, 34, 12, 10, FUR) + e(22, 34, 12, 10, FUR);
  let hd = g('ch-earR', p('M-44 -92 L-58 -138 L-20 -106 Z', FUR) ) + g('ch-earL', p('M44 -92 L58 -138 L20 -106 Z', FUR) );
  hd += p('M-60 -50 C-62 -100 -30 -116 0 -116 C30 -116 62 -100 60 -50 C60 -16 34 -2 0 -2 C-34 -2 -60 -16 -60 -50 Z', FUR) + e(0, -30, 32, 22, LT, 'stroke="none"') + sheen(-26, -96, 16, 7, -20);
  hd += eyes(-24, 24, -62, 1, '#ffb300') + e(0, -42, 9, 6, '#2a1838') + mouth(0, -30, 10) + r(-6, -28, 12, 9, 3, '#fff', 'stroke-width="3"') + blush(-42, -40, 8, 5) + blush(42, -40, 8, 5);
  s += g('ch-body', b + g('ch-head', hd));
  return s; }
// ---------------- Pearl the pigeon ----------------
function pearlInner() { const BD = '#b3b0e6', DK = '#8d88cc'; let s = '';
  s += g('ch-tail', p('M-110 20 L-176 -10 L-170 30 L-180 54 L-110 44 Z', DK));
  s += g('ch-legs', p('M-20 80 L-24 112 M-24 112 l-12 6 M-24 112 l10 8 M20 80 L18 112 M18 112 l-12 6 M18 112 l12 6', 'none', 'stroke="#ff7aa8" stroke-width="6"'));
  let b = p('M-124 30 C-120 -30 -50 -50 20 -40 C80 -30 110 10 100 50 C90 90 40 96 -20 92 C-80 88 -126 70 -124 30 Z', BD) + sheen(-50, -20, 34, 10, -8, 0.4);
  b += g('ch-armR', p('M-80 0 C-40 -14 30 -4 50 30 C10 50 -50 50 -84 34 Z', DK) + p('M-60 20 Q-20 30 20 26 M-56 34 Q-20 42 14 38', 'none', 'stroke-width="3.5"'));
  let hd = p('M30 -40 C40 -70 60 -78 80 -74 C108 -70 118 -40 104 -14 C96 0 70 4 50 0 Z', '#2fd6c8') + p('M44 -10 C70 -4 96 -8 104 -14 C100 4 80 16 56 14 Z', '#b86bff', 'stroke="none"');
  hd += e(80, -96, 42, 38, BD) + sheen(66, -118, 16, 6, -20) + g('ch-eyes', eye(70, -100, 0.85, '#ff7a2e') + eye(98, -100, 0.85, '#ff7a2e'));
  hd += g('ch-mouth', `<path class="m-closed" d="M110 -86 Q136 -82 124 -72 Q114 -70 106 -76 Z" fill="#ffb347"/><g class="m-open"><path d="M110 -90 Q138 -92 126 -82 Q116 -82 108 -84 Z" fill="#ffb347"/><path d="M108 -76 Q132 -66 120 -60 Q112 -60 106 -70 Z" fill="#ffb347"/></g>`) + c(114, -88, 3, '#fff', 'stroke="none"') + blush(56, -80, 7, 5);
  s += g('ch-body', b + g('ch-head', hd));
  return s; }
// ---------------- dogs: Toulouse (black poodle), Winnie (goldendoodle), Teddy (malshie) ----------------
const puff = (cx, cy, rx, ry, n, f, x = '') => p(ART.parts.scallop(cx, cy, rx, ry, n, 0.22), f, x);
function dogInner(k) { const C0 = k.fur, C1 = k.fur2, FACE = k.face; let s = '';
  s += g('ch-tail', k.pomTail ? p('M58 60 Q92 40 98 6', 'none', `stroke="${C0}" stroke-width="12"`) + puff(100, -4, 22, 22, 8, C0) + sheen(94, -12, 7, 4, -20, 0.35) : puff(84, 30, 40, 20, 8, C0, 'transform="rotate(-40 84 30)"'));
  let b = puff(0, 52, 70, 54, 11, C0) + puff(0, 60, 40, 32, 8, C1, 'stroke="none"') + sheen(-34, 24, 18, 8, -20, 0.3);
  b += r(-50, 80, 26, 46, 12, C0) + r(24, 80, 26, 46, 12, C0) + (k.pomFeet ? puff(-37, 124, 20, 13, 7, C0) + puff(37, 124, 20, 13, 7, C0) : e(-37, 124, 18, 10, C0) + e(37, 124, 18, 10, C0));
  if (k.bandana) b += p('M-42 0 Q0 18 42 0 L4 44 Q0 48 -4 44 Z', k.bandana) + c(-14, 10, 3, '#fff', 'stroke="none"') + c(10, 14, 3, '#fff', 'stroke="none"') + c(0, 28, 3, '#fff', 'stroke="none"');
  if (k.collar) b += p('M-40 2 Q0 22 40 2', 'none', `stroke="${k.collar}" stroke-width="10"`) + c(0, 18, 8, '#ffd34d') + sheen(-2, 16, 3, 2, 0, 0.9);
  let hd = g('ch-earR', puff(-62, -36, 26, 46, 9, k.ear || C0)) + g('ch-earL', puff(62, -36, 26, 46, 9, k.ear || C0));
  hd += puff(0, -60, 60, 54, 12, C0) + (k.topknot ? puff(0, -112, 30, 22, 8, C0) : '') + e(0, -40, 40, 36, FACE) + sheen(-24, -92, 16, 6, -20, 0.35);
  if (k.bow) hd += p('M0 -126 L-26 -142 L-24 -114 Z M0 -126 L26 -142 L24 -114 Z', k.bow) + c(0, -126, 7, '#ff2fa0');
  const ir = k.iris || '#7ee8ff'; hd += k.eyeRing ? c(-20, -52, 15, '#5d5885', 'stroke="none"') + c(20, -52, 15, '#5d5885', 'stroke="none"') : '';
  hd += eyes(-20, 20, -52, 0.95, ir) + e(0, -30, 11, 8, '#1b1028') + sheen(-3, -32, 3, 2, 0, 0.8) + mouth(0, -18, 11) + blush(-34, -28, 8, 5) + blush(34, -28, 8, 5);
  s += g('ch-body', b + g('ch-head', hd));
  return s; }
const TOULOUSE = { fur: '#2b2740', fur2: '#3f3a5e', face: '#47426a', ear: '#2b2740', bandana: '#e53935', pomTail: true, pomFeet: true, topknot: true, iris: '#c98a3a' }; // Toulouse is a BOY: red bandana, no pink
const WINNIE = { fur: '#f2ae48', fur2: '#ffd27a', face: '#ffd99a', ear: '#e39a34', collar: '#26c6ff', iris: '#ff7a2e' };
const TEDDY = { fur: '#fffaf2', fur2: '#f4ece0', face: '#fffdf8', ear: '#f0d2a8', bow: '#ff7eb6', iris: '#7ee8ff', topknot: true };
// ---------------- Marengo the horse ----------------
function marengoInner() { const H = '#b4582e', HD = '#8a3d1e', M = '#3a2030'; let s = '';
  s += g('ch-tail', p('M-150 -40 C-200 -20 -210 60 -186 120 C-170 80 -160 30 -140 0 Z', M) + sheen(-178, 40, 5, 26, 10, 0.25));
  s += g('ch-legs', r(-130, 30, 30, 110, 14, H) + r(-84, 34, 30, 106, 14, HD) + r(50, 34, 30, 106, 14, HD) + r(96, 30, 30, 110, 14, H) + [-130, -84, 50, 96].map(x => r(x - 2, 128, 34, 18, 7, '#2a1838')).join(''));
  let b = p('M-160 -40 C-164 -96 -100 -110 -20 -108 C60 -108 120 -100 140 -60 C150 -20 140 40 80 50 C20 58 -80 58 -130 46 C-160 36 -158 0 -160 -40 Z', H) + sheen(-80, -86, 50, 12, -4, 0.35);
  let hd = p('M90 -80 C110 -150 150 -196 196 -190 C226 -186 252 -150 262 -106 C268 -84 252 -70 232 -76 C210 -84 196 -96 180 -80 C160 -40 120 -40 100 -50 Z', H);
  hd += g('ch-earR', p('M168 -182 L174 -224 L196 -188 Z', H)) + g('ch-earL', p('M196 -188 L214 -222 L222 -180 Z', H));
  hd += p('M200 -186 Q220 -150 244 -110 Q232 -104 226 -112 Q206 -148 190 -182 Z', '#fff', 'stroke="none"');
  hd += g('ch-mane', p('M150 -186 C120 -170 96 -130 84 -80 C70 -40 60 -20 40 -10 C80 -30 110 -60 130 -100 C140 -130 160 -160 176 -178 Z', M) + sheen(120, -130, 5, 26, 30, 0.25));
  hd += g('ch-eyes', eye(196, -144, 0.95, '#ffb300')) + e(250, -96, 6, 4, '#2a1838') + mouth(232, -80, 10) + blush(214, -110, 9, 6) + sheen(176, -172, 14, 5, -30, 0.4);
  s += g('ch-body', b + g('ch-head', hd));
  return s; }
// ---------------- Old Nicolò ----------------
function nicoloInner() { const SKN = '#ffcfab'; let s = '';
  let b = p('M-70 220 C-80 120 -64 70 0 64 C64 70 80 120 70 220 Z', '#3f7be0') + p('M-44 90 L44 90 L50 220 L-50 220 Z', '#fff') + p('M-44 90 Q0 110 44 90', 'none') + r(-26, 140, 52, 30, 8, '#ffe1ec') + sheen(-56, 120, 8, 30, 8, 0.3);
  b += g('ch-armR', r(-106, 90, 36, 90, 18, '#3f7be0') + c(-88, 186, 16, SKN)) + g('ch-armL', `<g transform="rotate(-30 88 96)">${r(70, 90, 36, 90, 18, '#3f7be0')}${c(88, 186, 16, SKN)}</g>` + `<g transform="translate(150 150)">${p('M-22 -20 L22 -20 L18 18 Q0 26 -18 18 Z', '#fff')}${p('M22 -10 Q36 -8 34 4 Q32 12 20 10', 'none')}${p('M-8 -32 q6 -8 0 -16 M6 -32 q6 -8 0 -16', 'none', 'stroke="#c9b8ff" stroke-width="4"')}</g>`);
  let hd = e(0, 0, 56, 62, SKN) + c(-58, 6, 12, SKN) + c(58, 6, 12, SKN);
  hd += p('M-58 -4 C-70 -40 -50 -40 -46 -20 M58 -4 C70 -40 50 -40 46 -20', '#e8e8f2', 'stroke-width="4"');
  hd += p('M-62 -26 C-60 -70 60 -70 62 -26 Q0 -42 -62 -26 Z', '#4b5f9c') + p('M-60 -28 Q0 -44 74 -22 L70 -12 Q0 -30 -60 -18 Z', '#3b4b80') + sheen(-24, -54, 22, 6, -6, 0.4);
  hd += p('M-34 -14 Q-22 -20 -10 -14 M10 -14 Q22 -20 34 -14', 'none', 'stroke="#e8e8f2" stroke-width="6"') + g('ch-eyes', eye(-22, -2, 0.7, '#7ee8ff') + eye(22, -2, 0.7, '#7ee8ff'));
  hd += e(0, 14, 10, 9, '#f2a07a') + mouth(0, 40, 10) + p('M-40 28 Q-20 16 0 24 Q20 16 40 28 Q30 40 14 34 Q0 30 -14 34 Q-30 40 -40 28 Z', '#f4f4fb') + blush(-36, 16, 8, 5) + blush(36, 16, 8, 5);
  s += g('ch-body', b + g('ch-head', hd));
  return s; }
// ---------------- Coquí ----------------
function coquiInner() { const F = '#d98b4a', L = '#ffd3a1'; let s = '';
  let b = e(0, 40, 90, 64, F) + e(0, 56, 56, 38, L, 'stroke="none"') + e(-74, 92, 34, 14, F) + e(74, 92, 34, 14, F) + sheen(-40, 10, 22, 8, -20);
  let hd = c(-48, -24, 30, F) + c(48, -24, 30, F) + g('ch-eyes', eye(-48, -26, 1.3, '#3ddc84') + eye(48, -26, 1.3, '#3ddc84')) + mouth(0, 30, 22) + blush(-56, 18, 10, 6) + blush(56, 18, 10, 6);
  s += g('ch-body', b + g('ch-head', hd));
  return s; }
// ---------------- world friends ----------------
function beak(x, y, col = '#f3e7c9') { // lower beak that drops open when talking
  const closed = `<path class="m-closed" d="M${x - 11} ${y} Q${x} ${y + 9} ${x + 11} ${y} Q${x + 4} ${y + 13} ${x} ${y + 15} Q${x - 4} ${y + 13} ${x - 11} ${y} Z" fill="${col}"/>`;
  const open = `<g class="m-open"><path d="M${x - 12} ${y - 2} Q${x} ${y + 4} ${x + 12} ${y - 2} Q${x + 8} ${y + 14} ${x} ${y + 16} Q${x - 8} ${y + 14} ${x - 12} ${y - 2} Z" fill="#7d1d45"/><path d="M${x - 10} ${y + 8} Q${x} ${y + 15} ${x + 10} ${y + 8} Q${x + 4} ${y + 22} ${x} ${y + 24} Q${x - 4} ${y + 22} ${x - 10} ${y + 8} Z" fill="${col}"/></g>`;
  return g('ch-mouth', closed + open); }
function lolaInner() { const G1 = '#33cf5c', G2 = '#9bf07e', BL = '#2a7cff', RD = '#ff3b4a'; let s = '';
  s += g('ch-tail', p('M-26 88 L-46 168 L-8 142 L0 176 L14 140 L46 164 L26 88 Z', G1) + p('M-46 168 L-8 142 L0 176 L14 140 L46 164 L36 140 L-36 142 Z', BL, 'stroke="none"'));
  let b = p('M-56 104 C-76 40 -64 -36 0 -46 C64 -36 76 40 56 104 Q0 118 -56 104 Z', G1) + p('M-30 0 C-14 -10 14 -10 30 0 C40 40 30 86 0 96 C-30 86 -40 40 -30 0 Z', G2, 'stroke="none"') + sheen(-30, 10, 10, 26, 10, 0.3);
  b += p('M-26 104 l-8 18 M-26 104 l4 20 M26 104 l8 18 M26 104 l-4 20', 'none', 'stroke="#ff8f6b" stroke-width="7"');
  b += g('ch-armL', p('M-46 -14 C-92 6 -94 70 -60 104 C-56 64 -50 24 -46 -14 Z', G1) + p('M-80 60 C-86 80 -74 96 -60 104 C-62 86 -64 70 -66 56 Z', BL, 'stroke="none"'));
  b += g('ch-armR', p('M46 -14 C92 6 94 70 60 104 C56 64 50 24 46 -14 Z', G1) + p('M80 60 C86 80 74 96 60 104 C62 86 64 70 66 56 Z', BL, 'stroke="none"'));
  let hd = p('M-12 -150 Q-4 -176 8 -186 Q8 -168 4 -150 Z M4 -150 Q18 -172 34 -176 Q26 -160 16 -146 Z', G1) + c(0, -96, 60, G1) + sheen(-26, -132, 18, 8, -25);
  hd += p('M-30 -118 Q0 -136 30 -118 Q24 -104 0 -102 Q-24 -104 -30 -118 Z', RD) + c(-28, -92, 19, '#fff') + c(28, -92, 19, '#fff') + g('ch-eyes', eye(-28, -92, 0.85, '#ffb300') + eye(28, -92, 0.85, '#ffb300'));
  hd += p('M-16 -82 Q0 -94 16 -82 Q14 -62 2 -52 Q-6 -64 -16 -82 Z', '#f3e7c9') + beak(0, -60) + blush(-44, -70, 9, 6) + blush(44, -70, 9, 6);
  s += g('ch-body', b + g('ch-head', hd));
  return s + spark(-96, -150, 0.9, '#9bf07e') + spark(100, -40, 0.7, '#7ee8ff'); }
function roccoInner() { let s = scrambleInner().split('#d2692e').join('#8f95ab').split('#ffd9a8').join('#f4f1fa').split('#9c4520').join('#5d6274');
  const cap = p('M-38 -100 Q-36 -132 0 -134 Q36 -132 38 -100 Q0 -110 -38 -100 Z', '#2a7cff') + p('M-4 -104 Q40 -116 66 -100 Q42 -92 -4 -98 Z', '#1d58c4') + c(0, -134, 6, '#ffd93b') + sheen(-16, -122, 10, 4, -20, 0.5);
  s = s.slice(0, -8) + cap + '</g></g>';
  return s + spark(110, -140, 0.8, '#ffd93b'); }
function flurryInner() { const W = '#f8f9ff', SH = '#dfe6ff', PK = '#ffb3d1', GR = '#9aa3bd'; let s = '';
  s += g('ch-tail', c(-62, 70, 22, W) + sheen(-68, 62, 8, 4));
  let b = p('M-56 112 C-70 40 -48 -24 0 -26 C48 -24 70 40 56 112 Q0 124 -56 112 Z', W) + p('M-26 10 C-10 0 10 0 26 10 C36 50 28 92 0 100 C-28 92 -36 50 -26 10 Z', SH, 'stroke="none"');
  b += e(-36, 116, 34, 14, W) + e(36, 116, 34, 14, W) + e(-60, 50, 14, 24, W) + e(60, 50, 14, 24, W);
  b += p('M-44 -18 Q0 6 44 -18 L46 2 Q0 26 -46 2 Z', '#22c3c9') + p('M20 0 L30 50 L48 46 L36 -2 Z', '#22c3c9') + p('M24 18 L42 14 M27 32 L45 28', 'none', 'stroke="#fff" stroke-width="5"');
  let hd = g('ch-earR', p('M-40 -110 C-62 -170 -60 -230 -34 -236 C-10 -230 -12 -170 -20 -112 Z', W) + p('M-34 -120 C-46 -170 -46 -210 -34 -220 C-24 -210 -24 -170 -28 -122 Z', PK, 'stroke="none"') + p('M-46 -214 C-44 -230 -26 -236 -24 -222 Q-36 -218 -46 -214 Z', GR, 'stroke="none"'));
  hd += g('ch-earL', p('M40 -110 C62 -170 60 -230 34 -236 C10 -230 12 -170 20 -112 Z', W) + p('M34 -120 C46 -170 46 -210 34 -220 C24 -210 24 -170 28 -122 Z', PK, 'stroke="none"') + p('M46 -214 C44 -230 26 -236 24 -222 Q36 -218 46 -214 Z', GR, 'stroke="none"'));
  hd += p('M-62 -66 C-64 -110 -34 -132 0 -132 C34 -132 64 -110 62 -66 C60 -34 34 -20 0 -20 C-34 -20 -60 -34 -62 -66 Z', W) + sheen(-28, -112, 16, 7, -20);
  hd += p('M-60 -104 Q0 -124 60 -104', 'none', 'stroke="#9b5cff" stroke-width="10"') + r(-46, -124, 40, 26, 12, '#7ee8ff') + r(6, -124, 40, 26, 12, '#7ee8ff') + sheen(-34, -116, 8, 4, -20, 0.7) + sheen(18, -116, 8, 4, -20, 0.7);
  hd += eyes(-24, 24, -72, 1, '#7ee8ff') + e(0, -52, 9, 6, PK) + mouth(0, -42, 10) + blush(-44, -50, 9, 6) + blush(44, -50, 9, 6);
  s += g('ch-body', b + g('ch-head', hd));
  return s + spark(-90, -40, 0.8, '#ffffff') + spark(96, -150, 0.9, '#cfe9ff'); }
function quinnInner() { const BG = '#8b9cc0', DK = '#5e6d93', CR = '#f6e3bd', BR = '#b9773f'; let s = '';
  s += g('ch-tail', p('M-84 30 L-130 10 L-120 44 Z', DK));
  let b = e(0, 30, 92, 80, BG) + p('M-60 40 C-40 100 40 100 60 40 C40 70 -40 70 -60 40 Z', CR, 'stroke="none"');
  [[-30, 66], [0, 76], [30, 66], [-14, 90], [16, 90]].forEach(([x, y]) => { b += p(`M${x - 8} ${y} Q${x} ${y + 8} ${x + 8} ${y}`, 'none', `stroke="${BR}" stroke-width="3.5"`); });
  b += p('M-20 106 l-6 26 M20 106 l6 26', 'none', 'stroke="#ff8f6b" stroke-width="7"') + sheen(-40, -10, 22, 9, -20);
  b += g('ch-armR', p('M30 -10 C90 0 100 60 70 90 C60 50 40 20 30 -10 Z', DK) + p('M56 30 Q74 50 70 76 M44 20 Q62 40 60 64', 'none', 'stroke="#fff" stroke-width="3.5" opacity=".7"'));
  let hd = g('ch-earL', p('M2 -124 C-4 -156 14 -190 40 -186 C52 -184 52 -170 40 -168 C26 -166 18 -150 16 -124 Z', '#2a1838'));
  hd += c(0, -80, 54, BG) + sheen(-24, -112, 16, 7, -20) + p('M-34 -76 Q0 -26 34 -76 Q24 -36 0 -30 Q-24 -36 -34 -76 Z', '#2a1838') + p('M-40 -78 Q0 -24 40 -78', 'none', 'stroke="#fff" stroke-width="6"') + p('M-44 -100 Q-24 -110 -8 -102 M8 -102 Q24 -110 44 -100', 'none', 'stroke="#fff" stroke-width="6"');
  hd += g('ch-eyes', eye(-22, -86, 0.85, '#ffb300') + eye(22, -86, 0.85, '#ffb300')) + p('M-10 -70 Q0 -78 10 -70 Q4 -62 0 -60 Q-4 -62 -10 -70 Z', '#3b2147') + beak(0, -62, '#3b2147') + blush(-40, -66, 8, 5) + blush(40, -66, 8, 5);
  hd += r(-30, -134, 60, 16, 8, '#ff3fa4') + c(-12, -126, 9, '#7ee8ff') + c(12, -126, 9, '#7ee8ff');
  s += g('ch-body', b + g('ch-head', hd));
  return s + spark(-100, -120, 0.8, '#ffd93b') + spark(110, -20, 0.7, '#7ee8ff'); }
// ---------------- registry ----------------
const DEF = {
  juniper: ['-200 -330 400 520', o => juniperInner(o)],
  juniperhead: ['-128 -170 256 230', () => g('ch-head', foxHeadInner())],
  mamafox: ['-110 -240 290 360', () => mamaInner()],
  marcus: ['-180 -130 450 230', () => marcusInner()],
  oscar: ['-135 -165 270 340', () => oscarInner()],
  scramble: ['-110 -165 270 300', () => scrambleInner()],
  pearl: ['-190 -150 340 280', () => pearlInner()],
  toulouse: ['-110 -160 240 300', () => dogInner(TOULOUSE)],
  winnie: ['-110 -130 240 270', () => dogInner(WINNIE)],
  teddy: ['-110 -160 240 300', () => dogInner(TEDDY)],
  marengo: ['-215 -235 490 395', () => marengoInner()],
  nicolo: ['-130 -80 300 310', () => nicoloInner()],
  coqui: ['-130 -70 260 190', () => coquiInner()],
  lola: ['-125 -200 250 385', () => lolaInner()],
  rocco: ['-110 -165 270 300', () => roccoInner()],
  flurry: ['-120 -250 240 390', () => flurryInner()],
  quinn: ['-140 -200 280 340', () => quinnInner()],
};
//@@CHARS3
DEF.horse = DEF.marengo; DEF.owl = DEF.oscar; DEF.squirrel = DEF.scramble; DEF.pigeon = DEF.pearl; DEF.tortoise = DEF.marcus; DEF.fox = DEF.juniper; DEF.foxhead = DEF.juniperhead;
function svg(name, o = {}, extra = '') { const d = DEF[name]; if (!d) return null; return wrap(name, o.vb || d[0], d[1](o) + (o.after || ''), extra, o.cls || ''); }
function svgArt(name, o = {}, extra = '') { const d = DEF[name]; const an = SART.hasChr(name) ? name : /^v/.test(name) && SART.hasChr(name.slice(1)) ? name.slice(1) : null; if (an && !o.raw && !o.form) return SART.chr(an, o.vb || (d ? d[0] : '-200 -330 400 520'), Object.assign({}, o, { cname: name })); return svg(name, o, extra); }
return { svg: svgArt, raw: svg, has: n => !!DEF[n], DEF, foxHeadInner, juniperInner, spark, sheen, OL, FOX, CRM };
})();

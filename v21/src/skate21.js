// ---------- v21 (t106u): Ice Skating World. Coach Juniper, Coach Mama Fox and Teri (her biggest fan) take Aspen to her home rinks
// in Vail, New York and San Jose, then to the dream rinks of the world. Everyone wears winter gear here (art/chars/w<name>_*).
// State lives in ST.sk (created lazily, merge-only). Nothing else in ST is reset or rewritten. ----------
const SK21 = (() => {
  const SZ21 = {"valentina_cheer":[341,560],"valentina_idle":[234,560],"valentina_wave":[301,560],"nikko_cheer":[343,560],"nikko_idle":[250,560],"nikko_wave":[282,560],"landen_cheer":[351,560],"landen_point":[270,560],"landen_wave":[288,560],"olivia_cheer":[343,560],"olivia_idle":[314,560],"olivia_wave":[293,560],"sofia_cheer":[354,560],"sofia_idle":[274,560],"sofia_wave":[314,560],"waspen_cheer":[349,560],"waspen_idle":[351,560],"waspen_wave":[297,560],"wjuniper_cheer":[373,560],"wjuniper_wave":[332,560],"wmamafox_cheer":[314,560],"wmamafox_point":[312,560],"wmamafox_wave":[306,560],"wteri_cheer":[338,560],"wteri_idle":[201,560],"wteri_wave":[263,560],"wgigi_cheer":[326,560],"wgigi_point":[214,560],"wgigi_wave":[248,560],"wteddy_cheer":[385,545],"wteddy_idle":[351,553],"wteddy_wave":[360,560],"wtoulouse_cheer":[354,560],"wtoulouse_idle":[283,560],"wtoulouse_wave":[321,560],"wwinnie_cheer":[430,528],"wwinnie_idle":[346,541],"wwinnie_wave":[359,560],"wscramble_cheer":[385,560],"wscramble_idle":[306,560],"wscramble_wave":[362,560],"wpearl_cheer":[424,560],"wpearl_idle":[302,560],"wpearl_wave":[394,560],"wnicolo_cheer":[386,560],"wnicolo_idle":[333,560],"wnicolo_wave":[349,560],"wmarcus_idle":[304,560],"wmarcus_think":[261,560],"wmarcus_wave":[352,560],"woscar_idle":[390,473],"woscar_point":[414,471],"woscar_wave":[436,468],"wbro_idle":[240,560],"wbro_point":[271,560],"wbro_wave":[283,560],"wobble_cheer":[323,469],"wobble_idle":[260,465],"wobble_point":[266,470],"wobble_think":[247,470],"wobble_wave":[297,468],"bumpy_cheer":[312,470],"bumpy_idle":[291,470],"bumpy_point":[274,470],"bumpy_think":[247,470],"bumpy_wave":[273,470],"fog_cheer":[301,470],"fog_idle":[248,411],"fog_point":[268,430],"fog_think":[232,437],"fog_wave":[268,427],"chomp_cheer":[314,470],"chomp_idle":[246,470],"chomp_point":[257,470],"chomp_think":[229,470],"chomp_wave":[249,470],"aurora_cheer":[279,470],"aurora_idle":[221,470],"aurora_point":[235,470],"aurora_think":[191,470],"aurora_wave":[230,470]};
  Object.assign(SART.SZ, SZ21);
  const RLC = ['sksilver', 'skstar', 'skwave', 'skmaple', 'skaurora'];
  RLC.forEach(i => { if (!SART.ITEMS.includes(i)) SART.ITEMS.push(i); });
  // ---------- the rinks ----------
  const RK = [
    { k: 'dobson', name: 'Dobson Ice Arena', sub: 'Vail, Colorado', col: '#2a9cff', level: 2, nodes: 'sprint1 sight1 combo1 laps1 build1 es1', stk: 'sk_cmom',
      lm: [['mamafox', -170, 120, 'Lace them tight, Aspen. Coach Mama Fox is right here!'], ['teri', 160, 110, "Go, Aspen, go! I'm your biggest fan!"]] },
    { k: 'vvillage', name: 'Vail Village Rink', sub: 'Solaris Plaza, Vail', col: '#7b4fd6', level: 2, nodes: 'score1 wfind1 who1 cocoa1 fix1 spins1', stk: 'sk_csof',
      lm: [['sofia', -160, 100, "Aspen! It's me, Sofia, from across the street! Let's skate in Vail Village!"], ['teddy', 160, 90, "Brrr! I've got my woolly hat on, Aspen!"]] },
    { k: 'rock', name: 'Rockefeller Center', sub: 'New York City', col: '#e53935', level: 3, nodes: 'bros1 read1 order1 clock1 vocab1 sprint2', stk: 'sk_cval',
      lm: [['gigi', -160, 110, '«Ciao, Aspen!» Under the big tree, the finance bros count every lap!'], ['valentina', 160, 100, "Look at the giant tree, Aspen! Let's spin under the lights!"]] },
    { k: 'wollman', name: 'Wollman Rink', sub: 'Central Park, New York', col: '#2fae4f', level: 3, nodes: 'line1 sud1 rink1 mix1 laps2 sight2', stk: 'sk_cnic',
      lm: [['nikko', -160, 100, 'Race you around Wollman Rink, Aspen!'], ['nicolo', 160, 120, "Hot cocoa, Aspen! Old Nicolò's cocoa stand is open!"]] },
    { k: 'bryant', name: 'Bryant Park Winter Village', sub: 'Midtown, New York', col: '#ff8f2e', level: 3, nodes: 'combo2 build2 es2 score2 who2 bros2', stk: 'sk_coli',
      lm: [['olivia', -160, 100, 'Bryant Park is so sparkly, Aspen! Hold my hand!'], ['bro2', 160, 100, "Bro, this rink math is ice cold! Let's crunch it!"]] },
    { k: 'sharks', name: 'Sharks Ice', sub: 'San Jose, California', col: '#00a5b5', level: 3, nodes: 'wfind2 cocoa2 fix2 spins2 read2 order2', stk: 'sk_clan',
      lm: [['landen', -160, 100, 'Sharks Ice is where the hockey stars play, Aspen!'], ['toulouse', 160, 90, 'Bonjour, Aspen! Even a poodle can glide in San Jose!']] },
    { k: 'dtice', name: 'Downtown Ice', sub: 'San Jose, California', col: '#ff3fa4', level: 3, nodes: 'clock2 vocab2 line2 sud2 rink2 mix2', stk: 'sk_cnik',
      lm: [['winnie', -160, 90, 'Palm trees and ice skating? Only in San Jose, Aspen!'], ['scramble', 160, 90, "Wheee! I'm sliding on my tummy, Aspen!"]] },
    { k: 'louise', name: 'Lake Louise', sub: 'Dream Rink · Canada', col: '#1e88e5', level: 4, nodes: 'sprint3 sight3 combo3 laps3 build3', stk: 'sk_cjun', dream: 1,
      lm: [['juniper', -160, 120, 'Coach Juniper says: arms out, knees bent, and glide, Aspen!'], ['pearl', 160, 90, 'Coo! A frozen lake in the mountains! So beautiful, Aspen!']] },
    { k: 'rideau', name: 'Rideau Canal', sub: 'Dream Rink · Ottawa', col: '#8d5524', level: 4, nodes: 'es3 score3 wfind3 who3 cocoa3', stk: 'sk_cmar', dream: 1,
      lm: [['oscar', -160, 100, 'Hoo! The Rideau Canal is one long, long rink, Aspen!'], ['nikko', 160, 100, "Let's skate all the way to school, Aspen!"]] },
    { k: 'somerset', name: 'Somerset House', sub: 'Dream Rink · London', col: '#9b5cff', level: 4, nodes: 'fix3 spins3 bros3 read3', stk: 'sk_cbro', dream: 1,
      lm: [['marcus', -160, 110, 'Patience, Aspen. A great skater practices slowly first.', 0, 1], ['olivia', 160, 100, 'This rink is in a palace courtyard, Aspen!']] },
    { k: 'zermatt', name: 'Zermatt', sub: 'Dream Rink · Switzerland', col: '#c62828', level: 4, nodes: 'order3 clock3 vocab3 line3', stk: 'sk_cteri', dream: 1,
      lm: [['teri', -160, 110, 'Look at the Matterhorn, Aspen! Now land that jump for me!'], ['valentina', 160, 100, 'The mountain looks like a giant ice cream cone, Aspen!']] },
    { k: 'tahoe', name: 'Lake Tahoe', sub: 'Dream Rink · California', col: '#0d47a1', level: 4, nodes: 'sud3 rink3 mix3', stk: 'sk_casp', dream: 1,
      lm: [['mamafox', -160, 120, 'This is the last rink, Aspen. I am so proud of you.'], ['sofia', 160, 100, 'We skated all the way around the world, Aspen!']] }];
  RK.forEach(r => { r.ids = r.nodes.split(' ').map(x => 'sk_' + x); });
  const tierOfSk = id => +id.slice(-1);
  RK.forEach(r => r.ids.forEach(id => { TIER[id] = tierOfSk(id) + 1; }));
  ['sk_mix1', 'sk_mix2', 'sk_mix3'].forEach(id => { TIER[id] = Math.min(4, tierOfSk(id) + 1); });
  WORLDS.skate = { name: 'Ice Skating World', short: 'Ice Skating', friend: 'teri', friend2: 'juniper', fname: 'Coach Juniper and Teri', stars: 0, bg: '#e3f4ff', sky: ['#9fd4ff', '#eaf8ff'], ground: '#ffffff',
    need: () => [1, 1], needTxt: 'lace up your skates',
    hello: "«¡Hola, Aspen!» I'm Teri, your biggest fan! Juniper is your skating coach, and Mama Fox is your coach too. We will skate at your home rinks in Vail, New York and San Jose, then at the most beautiful rinks in the world! Every time you land a trick, I will cheer!",
    cheer: ['Lace up, Aspen!', 'Glide time, Aspen!', 'Skates on, brain on, Aspen!'],
    secs: RK.map(r => ({ name: r.name, sub: r.sub, scene: 'pond', col: r.col, g1: '#eef6ff', g2: '#dcebff', level: r.level, nodes: r.ids.filter(id => C.BY[id]), lm: r.lm.map(a => L_(...a)) })) };
  { const w = WORLDS.skate; w.total = w.secs.reduce((a, s) => a + s.nodes.length, 0); }
  if (!WKEYS.includes('skate')) WKEYS.push('skate');
  THEME4.skate = RK.map(r => r.k); RK.forEach(r => MAPART.add('skate:' + r.k)); PROPSET.skate = PROPSET.vail;
  // ---------- story ----------
  Object.assign(STORY, {
    'skate:0': [['juniper', 'Welcome to Dobson Ice Arena, Aspen! I am your skating coach today.'], ['mamafox', 'And I am your coach too, sweetheart. Helmet on, strap under your chin.'], ['teri', 'And I am your biggest fan! Every trick you land, I cheer!'], ['juniper', 'Warm-up first. Glide, glide, stop. Then we solve puzzles on the ice!']],
    'skate:1': [['sofia', 'Aspen! Vail Village is so pretty with all the lights!'], ['vwobble', 'Wibble wobble! I am the Wobble Goblin! I make every skater wobble and fall!'], ['juniper', 'Strong ankles and a strong brain, Aspen. Answer right and his wobble stops!']],
    'skate:2': [['gigi', '«Ciao, Aspen!» Welcome to New York! This is Rockefeller Center!'], ['gigi', 'The finance bros came too. When the math gets big, tap me and I will call them!'], ['valentina', 'Look up, Aspen! The biggest Christmas tree in the whole city!']],
    'skate:3': [['nikko', 'Wollman Rink is right inside Central Park, Aspen!'], ['nicolo', 'Ciao, Aspen! Old Nicolò brought his hot cocoa stand. Count your coins!'], ['marcus', 'Patience, Aspen. Sip slowly and think slowly.']],
    'skate:4': [['olivia', 'Bryant Park has a whole winter village, Aspen!'], ['vbumpy', 'Heh heh! I am the Bumpy Ice Bandit! I made the ice all bumpy and I took the Rainbow Star!'], ['teri', 'Smooth answers make smooth ice! You can do it, Aspen!']],
    'skate:5': [['landen', 'San Jose! Sharks Ice is where the hockey players train, Aspen!'], ['toulouse', 'Bonjour! I wore my best scarf for California ice!'], ['juniper', 'Bigger numbers and longer sentences now, Aspen. You are ready!']],
    'skate:6': [['winnie', 'Downtown Ice has palm trees around the rink, Aspen!'], ['vfog', 'Ooooh. I am the Fog Phantom. I fog up the rink so nobody can see. Who can think in my fog?'], ['mamafox', 'Clear thinking clears the fog, Aspen. One step at a time.']],
    'skate:7': [['juniper', 'Aspen! Your skating unlocked the dream rinks of the world!'], ['pearl', 'Coo! Lake Louise in Canada! A frozen lake with mountains all around!'], ['teri', 'Champion Edition puzzles now, Aspen. The hardest ones yet!']],
    'skate:8': [['oscar', 'Hoo! The Rideau Canal in Ottawa freezes into one long, long rink.'], ['vchomp', 'Chomp chomp! I am Captain Chomp! I nibbled the Golden Maple Leaf right off the canal sign!'], ['nikko', 'Beat him, Aspen, and we all get beaver tails!']],
    'skate:9': [['olivia', 'Somerset House in London! The rink is in a palace courtyard!'], ['bro1', 'Bro, London math is next level. We got you, Aspen!'], ['juniper', 'Read carefully, Aspen. These stories are long.']],
    'skate:10': [['teri', 'Zermatt, Switzerland! That pointy mountain is the Matterhorn!'], ['valentina', 'It looks like a giant snow cone, Aspen!'], ['marcus', 'Patience, Aspen. Big mountains are climbed one step at a time.']],
    'skate:11': [['mamafox', 'Lake Tahoe, Aspen. The last rink of the whole journey.'], ['vaurora', 'Twinkle twinkle! I am the Aurora Trickster! My lights trick every skater. Can you see through my colors?'], ['teri', 'This is it, Aspen! Your biggest fan is cheering the loudest ever!']] });
  // ---------- bosses and the best relics yet ----------
  const NB = [
    V_('skate:1', 'wobble', 'the Wobble Goblin', 'of Vail Village', 'sksilver', 8, "Wibble wobble! I'm the Wobble Goblin! I make skaters wobble, wobble, wobble. Think fast or you will wobble too!", 'Whoa, whoa, whoa! You never wobbled once! Take the Silver Snowflake Skate.', ['Wobble! You got it!', 'My knees are knocking!', 'You are steady as a rock!', 'No wobble at all!', 'Wibble! Right again!'], 'Wobble shield! Wibble wobble!', 'Wobble wobble! Try again!'),
    V_('skate:4', 'bumpy', 'the Bumpy Ice Bandit', 'of Bryant Park', 'skstar', 9, "Heh heh! I'm the Bumpy Ice Bandit! I made the rink all bumpy and swiped the Rainbow Star from the big tree. Glide past my puzzles!", 'Smooth as glass! Here is the Rockefeller Rainbow Star.', ['Bump! You got it!', 'My bumps are melting flat!', 'Smooth move!', 'You glided right over me!', 'No more bumps!'], 'Bumpy shield! Bump bump!', 'Bumpity! Try again!'),
    V_('skate:6', 'fog', 'the Fog Phantom', 'of Downtown Ice', 'skwave', 10, "Ooooh. I'm the Fog Phantom. I float over the rink and fog up every answer. Can you see through my fog?", 'My fog is gone! The sun is out in San Jose. Take the Pacific Pearl Wave.', ['Oooh! You saw it!', 'My fog is thinning!', 'Too clear for me!', 'You can see right through me!', 'Oooh... right again!'], 'Fog shield! Ooooh!', 'Lost in the fog! Try again!'),
    V_('skate:8', 'chomp', 'Captain Chomp', 'of the Rideau Canal', 'skmaple', 11, "Chomp chomp! I'm Captain Chomp, the beaver captain of the canal! I nibbled the Golden Maple Leaf. Out-think my teeth!", 'Gnaw way! You beat me, eh? Take the Golden Maple Leaf.', ['Chomp! You got it!', 'My teeth are chattering!', 'Timber! Good one!', 'You are too sharp for my teeth!', 'Gnaw! Right again!'], 'Log dam shield! Chomp!', 'Chomp chomp! Try again!'),
    V_('skate:11', 'aurora', 'the Aurora Trickster', 'of Lake Tahoe', 'skaurora', 12, "Twinkle twinkle! I'm the Aurora Trickster. My magic lights turn every answer a different color. Only a champion can see the truth!", 'My lights shine for you now, Champion Aspen! Take the Aurora Ice Tiara, the best treasure of all.', ['Twinkle! You got it!', 'My colors are fading!', 'Shining bright, Aspen!', 'You saw through my lights!', 'Sparkle! Right again!'], 'Rainbow light shield!', 'Tricked you! Try again!')
  ].map(b => ({ ...b, name: b.name.replace(/^the /, ''), form: 0, w: b.id.split(':')[0], si: +b.id.split(':')[1] }));
  NB.forEach(b => { if (BOSS[b.id]) return; BOSSES.push(b); BOSS[b.id] = b; BOSS_LINES[b.ch] = b.lines; BOSSCH[b.ch] = b.name; });
  Object.assign(RELICS, {
    sksilver: { name: 'Silver Snowflake Skate', power: 'Snowflake Count', does: '', lore: 'A tiny silver skate from Vail with a snowflake on its boot. It shows counting dots whenever numbers get tricky.' },
    skstar: { name: 'Rockefeller Rainbow Star', power: 'Star Light', does: '', lore: 'The rainbow star from the top of the big tree at Rockefeller Center. Its light makes the important words glow.' },
    skwave: { name: 'Pacific Pearl Wave', power: 'Pearl Path', does: '', lore: 'A swirl of Pacific Ocean ice with a pearl on top, from San Jose. It shows one small step at a time.' },
    skmaple: { name: 'Golden Maple Leaf', power: 'Maple Whisper', does: '', lore: 'A golden maple leaf with a tiny skate, from the Rideau Canal in Canada. It whispers the first sound of the answer.' },
    skaurora: { name: 'Aurora Ice Tiara', power: 'Northern Lights', does: '', lore: 'A tiara of glowing aurora crystals, the rarest treasure on the ice. Its lights fade away wrong answers in every subject.' } });
  Object.assign(HK, { sksilver: 'dots', skstar: 'spot', skwave: 'step', skmaple: 'sound', skaurora: 'two' });
  Object.assign(RFIT, { sksilver: ['math', 'dots'], skstar: ['read', 'spot'], skwave: ['logic', 'step'], skmaple: ['spanish', 'sound'], skaurora: ['any', 'two'] });
  RLC.forEach(id => { RELICS[id].does = HKD[HK[id]]; });
  Object.assign(STK_BOSS, { 'skate:1': 'sk_globe', 'skate:4': 'sk_tree', 'skate:6': 'sk_zam', 'skate:8': 'sk_btail', 'skate:11': 'sk_crystal' });
  // ---------- stickers: a new Ice Skating World page ----------
  if (!STK_PAGES.some(p => p.id === 'rinks')) STK_PAGES.splice(STK_PAGES.findIndex(p => p.id === 'friends'), 0, { id: 'rinks', name: 'Ice Skating World', short: 'Rinks', c1: '#e6f6ff', c2: '#a9d8ff', ic: 'sk_gskate' });
  Object.assign(STK_DEF, {
    sk_cmom: ['rinks', 'holo', 'Coach Mama Fox'], sk_csof: ['rinks', 'puffy', 'Sofia on Ice'], sk_cval: ['rinks', 'puffy', 'Valentina on Ice'], sk_cnic: ['rinks', 'holo', "Old Nicolò's Cocoa"],
    sk_coli: ['rinks', 'puffy', 'Olivia on Ice'], sk_clan: ['rinks', 'puffy', 'Landen on Ice'], sk_cnik: ['rinks', 'puffy', 'Nikko on Ice'], sk_cjun: ['rinks', 'gold', 'Coach Juniper', 'bob'],
    sk_cmar: ['rinks', 'holo', 'Marcus with Cocoa'], sk_cbro: ['rinks', 'holo', 'Finance Bro on Ice'], sk_cteri: ['rinks', 'gold', 'Teri, Biggest Fan', 'bob'], sk_casp: ['rinks', 'gold', 'Champion Aspen', 'twinkle'],
    sk_globe: ['rinks', 'holo', 'Rink Snow Globe'], sk_tree: ['rinks', 'gold', 'The Big Tree', 'twinkle'], sk_zam: ['rinks', 'puffy', 'Zippy the Ice Machine', 'bob'], sk_btail: ['rinks', 'puffy', 'Beaver Tail Treat'],
    sk_crystal: ['rinks', 'gold', 'Aurora Crystal', 'spinglow'], sk_pom: ['rinks', 'puffy', "Teri's Pom-Poms", 'wiggle'], sk_gskate: ['rinks', 'gold', 'Golden Skate'], sk_cgigi: ['rinks', 'holo', 'GiGi on Ice'], sk_coins: ['rinks', 'holo', 'Bro Coins'] });
  ['sk_globe', 'sk_tree', 'sk_zam', 'sk_btail', 'sk_crystal'].forEach((s, i) => { STK_EARN[s] = { t: 'boss', b: NB[i].id }; });
  // how-to-earn lines for the skating stickers (the base text only knows the 6 main-arcade games)
  const _sh = stkHow; stkHow = function (id) { if (!/^sk_/.test(id)) return _sh(id);
    const r = RK.find(x => x.stk === id); if (r) return `Finish every stop at ${r.name} to earn this sticker!`;
    if (id === 'sk_coins') return 'Call the finance bros for help ten times to earn this sticker!';
    const e = STK_EARN[id]; if (e && e.t === 'arcade') { const G = ARC_G.find(g => g.id === e.g); return `Win a silver time in ${G ? G.name : 'a skate game'} in Skate Games to earn this sticker!`; }
    return _sh(id); };
  RK.forEach(r => { if (r.stk) STK_EARN[r.stk] = { t: 'skrink', k: r.k }; }); STK_EARN.sk_coins = { t: 'skbros', n: 10 }; // awarded by the skating code itself
  // an 'any subject' relic (Aurora Ice Tiara) glows ready in every subject, like the Golden Passport
  { const _rbs = relicBtn; relicBtn = function () { _rbs.apply(this, arguments); const b = $('pRelic'); if (!b || !RUN || !RUN.relic) return; if (RUN.charges > 0 && relicFit(RUN.relic.id).best === 'any') b.classList.add('ready'); }; }
  STK_EARN.sk_pom = { t: 'arcade', g: 'skcombo' }; STK_EARN.sk_gskate = { t: 'arcade', g: 'skjudge' }; STK_EARN.sk_cgigi = { t: 'arcade', g: 'skrink' };
  Object.keys(STK_DEF).filter(id => /^sk_/.test(id) && !STK_IDS.includes(id)).forEach(id => STK_IDS.push(id));
  // ---------- state ----------
  const S = () => { const d = { cr: 0, em: {}, sec: {}, got: {}, bros: 0, teri: 0, forge: 0, seen: 0 }; ST.sk = Object.assign(d, ST.sk || {}); ['em', 'sec', 'got'].forEach(k => { if (!ST.sk[k] || typeof ST.sk[k] !== 'object') ST.sk[k] = {}; }); return ST.sk; };
  // boss-less sections are never gated (only the five bosses gate the next rink)
  const gateFix = () => { ST.grand = ST.grand || {}; RK.forEach((r, si) => { if (si > 0 && !BOSS['skate:' + (si - 1)]) ST.grand['skate:' + si] = 1; }); };
  // ---------- winter art everywhere in this world ----------
  const SKX = { f: 0, swap: null, hub: false };
  const onS = id => { const e = $(id); return !!(e && e.classList.contains('on')); };
  const skRun = () => !!RUN && (RUN.world === 'skate' || (RUN.boss && RUN.boss.w === 'skate') || /^sk_/.test((RUN.a && RUN.a.id) || '') || !!RUN.sk);
  const skOn = () => SKX.f > 0 || (onS('map') && MAPW === 'skate') || onS('skhub') || (RUN && skRun() && (onS('play') || onS('cele') || onS('intro'))) || (($('story') || {}).className || '').includes('on w-skate') || (onS('agame') && ARC && ARC.G && ARC.G.sk);
  const W1 = { bro1: ['wbro', 'idle'], bro2: ['wbro', 'wave'], bro3: ['wbro', 'point'] };
  const _svg = CHARS.svg;
  CHARS.svg = function (name, o = {}, extra) { if (skOn() && !o.raw && !o.form) { const m = W1[name]; const n = m ? m[0] : 'w' + name; if (SART.hasChr(n)) return SART.chr(n, o.vb || '-200 -330 400 520', Object.assign({}, o, { pose: o.pose || (m && m[1]), cname: name })); } return _svg(name, o, extra); };
  const _jsvg = juniperSvg;
  juniperSvg = function (outfit = ST.outfit, pose = 'stand', vb = '-200 -330 400 520', cls = '') { if (skOn() && !/\brig\b/.test(cls)) return SART.chr('wjuniper', vb, { pose: /cheer|jump|yay/.test(pose) ? 'cheer' : 'wave', cname: 'juniper', cls: 'pose-' + pose + ' ' + cls }); return _jsvg(outfit, pose, vb, cls); };
  const inSK = (f) => function (...a) { SKX.f++; try { return f.apply(this, a); } finally { SKX.f--; } };
  // ---------- world plumbing: map, postcard, story, meet, activities ----------
  const _post = postcard; postcard = function (k) { if (k !== 'skate') return _post(k); return `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg"><image href="${SART.bg('skate')}" width="400" height="240" preserveAspectRatio="xMidYMid slice"/></svg>`; };
  const _rm = renderMap; renderMap = function (...a) { const M = $('map'); if (MAPW !== 'skate') { if (M.dataset.sk) { M.style.background = ''; delete M.dataset.sk; M.classList.remove('sk-map'); } return _rm.apply(this, a); } M.dataset.sk = 1; M.classList.add('sk-map'); gateFix(); SKX.f++; try { _rm.apply(this, a); } finally { SKX.f--; }
    $('map').style.background = `linear-gradient(rgba(255,255,255,.22),rgba(255,255,255,.22)),url(${SART.bg('skate', false)}) center/cover fixed, #e3f4ff`;
    const ac = $('mapSvg').querySelector('.ambclip'); if (ac && !ac.querySelector('.amb-snow')) ac.insertAdjacentHTML('beforeend', '<div class="amb-snow"></div>');
    bannerFix(); setTimeout(emblemCheck, 900); };
  // rinks without a boss: the base banner counts a boss stop (n+1), so show the real stop count
  function bannerFix() { const BS = [1, 4, 6, 8, 11]; $('mapSvg').querySelectorAll('.banner').forEach(g => { const tx = g.querySelectorAll('text'); const si = WORLDS.skate.secs.findIndex(x => x.name === tx[0].textContent); if (si < 0 || BS.includes(si)) return; const ct = tx[tx.length - 1], m = /^(\d+)\/(\d+)$/.exec(ct.textContent.trim()); if (!m) return; const got = +m[1], tot = +m[2] - 1; ct.textContent = got + '/' + tot; const bar = g.querySelector('.bar'); if (bar) bar.setAttribute('width', Math.max(0, 292 * got / tot)); }); }
  // a locked stop in a boss-less rink: say which stop comes first (the base handler expects a boss there)
  { const ms = $('mapSvg'); if (ms) ms.addEventListener('click', e => { if (MAPW !== 'skate') return; const g = e.target.closest && e.target.closest('.node.locked'); if (!g) return; e.stopPropagation(); SND.boop(); wiggle(g.querySelector('.lk'));
    const si = secOfGi(+g.dataset.gi), gate = gateOf('skate'); const pb = gate <= si && BOSS['skate:' + (gate - 1)]; speak(pb ? `Beat ${bossThe(pb)} to open this part of the map!` : 'Finish the stops before this one first. Poco a poco!', { who: $('mapJun') }); }, true); }
  const secOfGi = gi => { let n = 0; for (let si = 0; si < WORLDS.skate.secs.length; si++) { n += WORLDS.skate.secs[si].nodes.length; if (gi < n) return si; } return WORLDS.skate.secs.length - 1; };
  const _ps = playStory; playStory = function (w, si, then) { if (w !== 'skate') return _ps(w, si, then); return inSK(_ps)(w, si, then); };
  const _mf = meetFriend; meetFriend = function (k) { if (k !== 'skate') return _mf(k); inSK(_mf)(k); $('meetGo').onclick = () => { SND.pop(); $('meet').classList.remove('on'); openHub(); }; };
  const _sa = startActivity; startActivity = function (id, mode = 'free', ctx = {}) { const sk = (ctx && ctx.world === 'skate') || /^sk_/.test(id); if (!sk) return _sa(id, mode, ctx);
    const w = WORLDS.skate, f0 = w.friend, a = C.BY[id]; w.friend = a && (CHARS.has(a.who) || SART.hasChr(a.who)) ? a.who : 'juniper'; SKX.f++; try { _sa(id, mode, ctx); } finally { SKX.f--; w.friend = f0; } if (RUN) RUN.sk = 1; if (SKX.practice) { backTo = 'skhub'; } };
  const _gb = goBack; goBack = function () { if (backTo === 'skhub') { openHub('practice'); return; } return _gb(); };
  // ---------- Teri, the biggest fan: she pops in and cheers when Aspen lands a trick ----------
  const TERI_W = ['Woo hoo! Go, Aspen! You landed it!', "That's my skater! Pom-poms up!", 'Aspen, you nailed it! I am your biggest fan!', 'Spin queen! Yay, Aspen!', 'Triple trick! Teri is cheering so loud!', 'Glow sticks and pom-poms for Aspen!'];
  const teriPop = () => { let t = $('skTeri'); if (!t) { t = h('div', 'skteri'); t.id = 'skTeri'; $('play').appendChild(t); } t.innerHTML = CHARS.svg('teri', { pose: 'cheer' }); t.classList.remove('on'); void t.offsetWidth; t.classList.add('on'); clearTimeout(teriPop.tm); teriPop.tm = setTimeout(() => t.classList.remove('on'), 2600); return t; };
  const _cor = correct; correct = function (sayFirst) { if (!RUN || RUN.locked || !skRun() || RUN.mode === 'boss') return _cor(sayFirst);
    RUN.skSt = (RUN.skSt || 0) + 1; const big = !RUN.itemMiss && (RUN.skSt % 3 === 0 || RUN.i === RUN.items.length - 1);
    if (big) { const el = teriPop(); SKX.swap = { line: TERI_W[(S().teri++) % TERI_W.length], who: el }; if (window.FX && FX.burst) FX.burst(12, 78, false); }
    try { return _cor(sayFirst); } finally { SKX.swap = null; } };
  const _sp = speak; speak = function (text, opts = {}) { if (SKX.swap && opts && opts.onend && !opts.who && RUN && !opts.ch) { const sw = SKX.swap; SKX.swap = null; return _sp(sw.line, Object.assign({}, opts, { who: sw.who, ch: 'teri' })); } return _sp(text, opts); };
  // ---------- GiGi + the finance bros, and Teri's ice vision, on every skate question ----------
  const SKG = ['Finance bros, lace up! Aspen needs rink math help!', '«Mamma mia!» Big math on ice? I know some guys! Bros, skate over here!', 'Calling the finance bros of the rink!'];
  const SKT = ['Ice vision! I froze a wrong one!', 'Super fan vision! That one is a trap!', 'Brrr! I froze a tricky answer for you!'];
  const SKTD = ['Pom-pom power! Now just two are left! You pick!', 'Cheer, spin, glow! Only two left, Aspen!'];
  const _th = tripHelpers; tripHelpers = function (it, host, box) { _th(it, host, box); if (tripOn() || !skRun() || !it.opts || it.opts.length < 3 || RUN.mode === 'boss') return;
    const subj = (RUN.a && RUN.a.subj) || ''; const math = subj === 'math' || !!it.bro; const row = h('div', 'triphelp skhelp');
    const btn = h('button', 'thbtn ' + (math ? 'gigi' : 'teri'), `${CHARS.svg(math ? 'gigi' : 'teri')}<b>${math ? 'GiGi' : 'Teri'}</b><small>${math ? 'Call the bros' : 'Ice vision'}</small>`);
    row.appendChild(btn); host.insertBefore(row, box); let uses = 0;
    const wrongs = () => [...box.querySelectorAll('.opt')].filter(b => String(it.opts[+b.dataset.k].v) !== String(it.ans) && !b.classList.contains('dim'));
    btn.onclick = () => { if (RUN.locked) return; SND.pop(); RUN.hinted = true; uses++;
      if (!math) { const traps = it.ice || []; const w = wrongs(); if (w.length < 2) { btn.disabled = true; speak('Two choices left! Look carefully and pick!', { who: btn, ch: 'teri' }); return; } const t = w.find(b => traps.includes(String(it.opts[+b.dataset.k].v))) || w[0];
        if (uses === 1) { t.classList.add('dim', 'iced'); sparkEl(t, 14); speak(pick0(SKT), { who: btn, ch: 'teri' }); return; }
        const w2 = wrongs(); w2.slice(0, Math.max(0, w2.length - 1)).forEach(b => b.classList.add('dim', 'iced')); speak(pick0(SKTD), { who: btn, ch: 'teri' }); btn.disabled = true; return; }
      S().bros++; save(); if (S().bros >= 10) { if (stkAward('sk_coins')) setTimeout(() => stkReveal && stkReveal(), 2500); }
      const line = pick0(BRO_L) + (window.__safeHint || ((a, b) => b))(it, it.bro || String(it.hint || '').replace(/^Patience, Aspen\.\s*/, ''));
      speak(pick0(SKG), { who: btn, ch: 'gigi', onend: () => { if (RUN && RUN.cur === it && !RUN.locked) broOn(line); } });
      const w = wrongs(); if (w.length > 1) w[0].classList.add('dim', 'iced'); if (uses >= 2) btn.disabled = true; }; };
  // ---------- crystals, emblems and section stickers ----------
  const _fin = finish; finish = function () { const sk = RUN && skRun(), boss = RUN && RUN.mode === 'boss', id = RUN && RUN.id, prev = id ? medalOf(id) : null; const r = _fin.apply(this, arguments);
    if (sk) { const s = S(); let add = boss ? 5 : 1; if (!boss && medalOf(id) === 'gold' && prev !== 'gold') add += 1; s.cr += add; s.got[id] = (s.got[id] || 0) + 1; save(); } return r; };
  const MEDV = { bronze: 1, silver: 2, gold: 3 };
  const secLevel = si => { const ids = WORLDS.skate.secs[si].nodes; return Math.min(...ids.map(id => MEDV[medalOf(id)] || 1)); };
  function emblemCheck() { if (MAPW !== 'skate' || !onS('map')) return; const s = S(), pos = wPos('skate'); const fresh = [];
    RK.forEach((r, si) => { if (pos < secEnd('skate', si)) return; const lv = secLevel(si); if (!s.em[r.k]) { s.em[r.k] = lv; s.cr += 3; fresh.push(r); if (r.stk) stkAward(r.stk); } else if (lv > s.em[r.k]) { s.cr += lv - s.em[r.k]; s.em[r.k] = lv; } });
    if (fresh.length) { save(); emReveal(fresh[0], () => { if (typeof stkReveal === 'function') stkReveal(); }); } }
  function emReveal(r, done) { const L = h('div', 'skemrev', `<div class="ser-card"><div class="ser-rays"></div><img class="ser-em em${S().em[r.k] || 1}" src="${SART.base}emblems/sk_${r.k}.webp" alt=""><b>${r.name}</b><small>New rink emblem · +3 ice crystals</small><button class="bigbtn go" id="serGo">${ICON.next || '➜'}</button></div>`);
    document.body.appendChild(L); requestAnimationFrame(() => L.classList.add('on')); SND.fanfare(); confetti(); speak(`New rink emblem: ${r.name}!`, { who: null });
    $('serGo').onclick = () => { SND.pop(); hush(); L.remove(); if (done) done(); }; }
  // ---------- forge: upgrade the skate relics with ice crystals (Legendary at most; Mythic only from a perfect boss) ----------
  const COST = [4, 6, 9];
  function forgeUp(id) { const s = S(), r = ST.relics[id]; if (r == null || r >= 3) return false; const c = COST[r]; if (s.cr < c) return false; s.cr -= c; ST.relics[id] = r + 1; s.forge++; save(); return true; }
  // ---------- home tile ----------
  const nextName = () => { const pos = wPos('skate'); for (let si = 0; si < RK.length; si++) if (pos < secEnd('skate', si)) return RK[si].name; return null; };
  function tile() { const tiles = document.querySelector('#home .tiles'); if (!tiles) return; let b = $('tSkate');
    if (!b) { b = h('button', 'tile t-skate', `<span class="skbadge">New World</span><span class="tic" id="tSkateIc"></span><b>Ice Skating World</b><small id="tSkateSub"></small>`); b.id = 'tSkate'; const tt = $('tTrip'); tiles.insertBefore(b, tt ? tt.nextSibling : tiles.firstChild); b.onclick = () => { SND.tap(); hush(); b.classList.remove('callout'); if (!(ST.met || {}).skate) meetFriend('skate'); else openHub(); }; }
    $('tSkateIc').innerHTML = `<img class="artui sk-a" src="${SART.base}chars/waspen_cheer.webp" alt=""><img class="artui sk-j" src="${SART.base}chars/wjuniper_wave.webp" alt="">`;
    const p = wPos('skate'), t = WORLDS.skate.total, nn = nextName(); $('tSkateSub').textContent = p >= t ? 'Champion! Every rink skated!' : p ? `Next: ${nn} (${p}/${t})` : 'Vail · New York · San Jose'; }
  const _gh = goHome; goHome = function (...a) { SKX.practice = false; const r = _gh.apply(this, a); try { tile(); } catch (e) {} return r; };
  // ---------- the Skate Hub ----------
  const CAST = [['aspen', "That's you, Aspen! Black sparkle helmet, tiara, and skates. Ready!"], ['juniper', 'I am Coach Juniper! Knees bent, arms out, and glide!'], ['mamafox', 'Coach Mama Fox is here. Strap under your chin, sweetheart.'], ['teri', "I'm Teri, your biggest fan! Land a trick and I cheer!"], ['gigi', '«Ciao!» Big rink math? I call the finance bros!'],
    ['valentina', 'Hi Aspen! Valentina is ready to spin!'], ['nikko', 'Nikko here! Race you, Aspen!'], ['landen', 'Landen is ready for hockey stops!'], ['olivia', 'Olivia loves twirls! Twirl with me, Aspen!'], ['sofia', 'Hi Aspen! Sofia from across the street! Let\'s skate!'],
    ['marcus', 'Patience, Aspen. Slow and steady on the ice.'], ['nicolo', 'Ciao, Aspen! Hot cocoa from Old Nicolò!'], ['bro3', 'Bro! Rink math is my favorite cardio!'], ['toulouse', 'Bonjour, Aspen! I am wearing my warmest scarf!'], ['teddy', 'Brrr! Teddy has a woolly hat!'], ['winnie', 'Winnie is ready to glide!'], ['scramble', 'Wheee! Scramble slides on his tummy!'], ['pearl', 'Coo! Pearl loves the snowflakes!'], ['oscar', 'Hoo! Oscar is the judge today!']];
  const HUB_L = { main: 'Welcome to the Ice Skating World, Aspen! Pick the rink map, skate games, your album, or the relic forge!', games: 'Skate games! Be fast and careful to win gold!', album: 'Your skating album! Rink emblems and skating stickers!', forge: 'The Relic Forge! Use ice crystals to make your skating relics stronger!', practice: 'The practice rink! Warm-up, Step-up, and Champion Edition drills!' };
  function hubScreen() { if ($('skhub')) return; const s = h('div', 'screen skhub', `<div class="topbar"><button class="tb" id="skHome" aria-label="Home">${ICON.home}</button><div class="hdr" id="skHdr">Ice Skating World</div><div class="skcr" id="skCr"></div><div class="starcount" id="skStars"></div></div><div class="skbody" id="skBody"></div>`); s.id = 'skhub'; document.body.appendChild(s);
    $('skHome').onclick = () => { SND.tap(); if (SKV.view !== 'main') openHub(); else goHome(); }; }
  const SKV = { view: 'main' };
  const crHtml = () => `<img src="${SART.base}stickers/sk_crystal.webp" alt=""><b>${S().cr}</b>`;
  function openHub(view = 'main') { S(); hubScreen(); SKV.view = view; SKX.practice = false; SKX.hub = true; setStars(); show('skhub'); renderHub(); speak(HUB_L[view] || HUB_L.main, { who: $('skGuide') || null, ch: 'juniper' }); }
  function renderHub() { const v = SKV.view, B = $('skBody'); $('skStars').innerHTML = `${ICON.star}<b>${ST.stars}</b>`; $('skCr').innerHTML = crHtml(); $('skHdr').textContent = { main: 'Ice Skating World', games: 'Skate Games', album: 'Skating Album', forge: 'Relic Forge', practice: 'Practice Rink' }[v];
    B.className = 'skbody v-' + v; SKX.f++; try {
    if (v === 'main') { const p = wPos('skate'), t = WORLDS.skate.total, ne = Object.keys(S().em).length;
      B.innerHTML = `<div class="skhero" style="background-image:url(${SART.bg('skate', false)})"><div class="skcast">${[3, 1, 6, 7, 0, 8, 9, 2, 5, 4].map(i => `<button class="skc c-${CAST[i][0]}" data-i="${i}">${CHARS.svg(CAST[i][0])}</button>`).join('')}</div><div class="skguide" id="skGuide">${juniperSvg(ST.outfit, 'wave')}</div></div>
      <div class="skcards"><button class="skcard c-map" data-v="map"><span class="ski"><img src="${SART.base}emblems/sk_rock.webp" alt=""></span><b>Rink Map</b><small>${p >= t ? 'Every rink skated!' : `${p}/${t} stops · Next: ${nextName()}`}</small></button>
      <button class="skcard c-games" data-v="games"><span class="ski">${stkEl('sk_pom', { still: 1 }).outerHTML}</span><b>Skate Games</b><small>Trick Combo · Jump Judge · Rink Builder</small></button>
      <button class="skcard c-album" data-v="album"><span class="ski">${stkEl('sk_gskate', { still: 1 }).outerHTML}</span><b>Skating Album</b><small>${ne}/12 emblems · ${STK_IDS.filter(id => /^sk_/.test(id) && ST.stk && ST.stk.got[id]).length}/21 stickers</small></button>
      <button class="skcard c-forge" data-v="forge"><span class="ski"><img src="${SART.base}items/skaurora.webp" alt=""></span><b>Relic Forge</b><small>${RLC.filter(hasRelic).length}/5 relics · ${S().cr} ice crystals</small></button>
      <button class="skcard c-practice" data-v="practice"><span class="ski"><img src="${SART.base}items/skstar.webp" alt=""></span><b>Practice Rink</b><small>Warm-up · Step-up · ★ Champion Edition</small></button>
      <button class="skcard c-color" data-v="color"><span class="ski"><img src="${SART.base}stickers/sk_globe.webp" alt=""></span><b>Skating Coloring Book</b><small>Color the rinks and the cast</small></button></div>`;
      B.querySelectorAll('.skc').forEach(b => b.onclick = () => { const c = CAST[+b.dataset.i]; SND.pop(); bounceChr(b); if (c[0] === 'aspen') speak(c[1], { who: null, ch: 'juniper' }); else speak(c[1], { who: b }); });
      $('skGuide').onclick = () => { SND.pop(); speak(HUB_L.main, { who: $('skGuide'), ch: 'juniper' }); };
      B.querySelectorAll('.skcard').forEach(b => b.onclick = () => { SND.tap(); const k = b.dataset.v; if (k === 'map') { if (!(ST.met || {}).skate) meetFriend('skate'); else openMap('skate'); } else if (k === 'color') openColor(); else openHub(k); }); }
    else if (v === 'games') { B.innerHTML = `<div class="skgrid">${ARC_G.filter(g => g.sk).map(G => { const a = (ST.stk && ST.stk.arc[G.id]) || {}; return `<button class="arcard skg" data-g="${G.id}" style="--c1:${G.c1};--c2:${G.c2}"><div class="arart">${stkEl(G.st, { still: 1 }).outerHTML}</div><b>${G.name}</b><small>${G.learn}</small><div class="armeds">${[1, 2, 3].map(m => `<span class="${(a.med || 0) >= m ? 'got' : ''}">${medalSvg(MEDN[m])}</span>`).join('')}</div><span class="arlvl">Level ${arcLvl(G.id)}</span>${a.best ? `<span class="arbest">⏱ ${a.best.toFixed(1)}s</span>` : ''}</button>`; }).join('')}</div>`;
      B.querySelectorAll('.skg').forEach(b => b.onclick = () => { SND.tap(); SKX.hubGame = true; arcStart(b.dataset.g); }); }
    else if (v === 'album') { const s = S(); B.innerHTML = `<div class="skems">${RK.map(r => { const lv = s.em[r.k]; return `<button class="skem${lv ? ' got em' + lv : ''}" data-k="${r.k}"><img src="${SART.base}emblems/sk_${r.k}.webp" alt=""><b>${r.name}</b><small>${lv ? ['', 'Bronze', 'Silver', 'Gold'][lv] + ' emblem' : r.sub}</small></button>`; }).join('')}</div>
      <div class="skstks">${STK_IDS.filter(id => /^sk_/.test(id)).map(id => `<span class="skst${ST.stk && ST.stk.got[id] ? ' got' : ''}" data-id="${id}">${stkEl(id, { still: 1, ghost: !(ST.stk && ST.stk.got[id]) }).outerHTML}</span>`).join('')}</div><button class="bigbtn go skbook" id="skBook">Open Sticker Book</button>`;
      B.querySelectorAll('.skem').forEach(b => b.onclick = () => { const r = RK.find(x => x.k === b.dataset.k), lv = s.em[r.k]; SND.pop(); sparkEl(b, 10); speak(lv ? `${r.name}! ${['', 'Bronze', 'Silver', 'Gold'][lv]} emblem!` : `Finish ${r.name} to win this emblem!`); });
      B.querySelectorAll('.skst').forEach(b => b.onclick = () => { const id = b.dataset.id; SND.pop(); speak(ST.stk && ST.stk.got[id] ? STK_DEF[id][2] + '!' : stkHow(id)); });
      $('skBook').onclick = () => { SND.tap(); openStickers('rinks'); }; }
    else if (v === 'forge') { const s = S(); B.innerHTML = `<div class="skforge">${NB.map(b => { const id = b.relic, has = hasRelic(id), r = has ? ST.relics[id] : 0, c = COST[r];
        return `<div class="skfr${has ? ' got r' + r : ' locked'}${ST.equip === id ? ' eq' : ''}" data-id="${id}"><span class="sfa">${relicArt(id, r, { sil: !has })}</span><b>${has ? relicName(id, r) : '???'}</b>${has ? `<span class="rpill r${r}">${RAR[r].n}</span><em>${RELICS[id].power}: it ${RELICS[id].does}</em>` : `<small>Beat ${bossThe(b)}</small>`}
        ${has ? `<div class="sfb">${r < 3 ? `<button class="sfup${s.cr >= c ? '' : ' poor'}" data-id="${id}"><img src="${SART.base}stickers/sk_crystal.webp" alt="">${c} · Upgrade</button>` : `<span class="sfmax">${r >= 4 ? 'Mythic!' : 'Legendary! Beat the boss with no misses for Mythic'}</span>`}<button class="sfeq" data-id="${id}">${ST.equip === id ? 'Equipped' : 'Equip'}</button></div>` : ''}</div>`; }).join('')}</div>`;
      B.querySelectorAll('.sfup').forEach(b => b.onclick = e => { e.stopPropagation(); const id = b.dataset.id; if (!forgeUp(id)) { SND.boop(); wiggle(b); speak(`You need ${COST[ST.relics[id]]} ice crystals. Finish skating stops to earn more!`); return; }
        const r = ST.relics[id]; tierFanfare(Math.min(5, r + 1)); confetti(); renderHub(); const c = $('skBody').querySelector(`.skfr[data-id="${id}"]`); if (c) { c.classList.add('upnow'); sparkEl(c, 30); } speak(`Your relic is now ${RAR[r].n}! ${relicName(id, r)}!`); });
      B.querySelectorAll('.sfeq').forEach(b => b.onclick = e => { e.stopPropagation(); ST.equip = b.dataset.id; save(); SND.medal(); renderHub(); speak(`${RELICS[b.dataset.id].power} is ready!`); });
      B.querySelectorAll('.skfr').forEach(b => b.onclick = () => { const id = b.dataset.id; SND.pop(); speak(hasRelic(id) ? `${relicName(id, ST.relics[id])}. ${RELICS[id].lore}` : `Beat ${bossThe(NB.find(x => x.relic === id))} to find this treasure!`); }); }
    else if (v === 'practice') { const T = [['Warm-Up', 1], ['Step-Up', 2], ['★ Champion Edition', 3]];
      B.innerHTML = T.map(([nm, t]) => `<div class="skprow"><div class="skph t${t}">${nm}</div><div class="skpi">${C.A.filter(a => /^sk_/.test(a.id) && tierOfSk(a.id) === t).map(a => { const md = medalOf(a.id); return `<button class="skpa" data-id="${a.id}"><span class="ic">${ICONS.icon(a.icon) || ''}</span><b>${a.title.replace(' ★ Champion', '')}</b>${md ? `<span class="pm">${medalSvg(md)}</span>` : ''}</button>`; }).join('')}</div></div>`).join('');
      B.querySelectorAll('.skpa').forEach(b => b.onclick = () => { SND.tap(); SKX.practice = true; startActivity(b.dataset.id, 'free'); }); }
    } finally { SKX.f--; } }
  function openColor() { const any = typeof openColoring === 'function'; speak('Color the skating pages, Aspen! The rinks and the whole cast are waiting!'); try { syncRewards(); } catch (e) {} setTimeout(() => { if (any) openColoring('skate'); else location.href = '../?book=skate'; }, 1400); }
  // arcade: the three skate games live in the Skate Hub (the main arcade keeps its six)
  const _ra = renderArcade; renderArcade = function () { const mine = ARC_G.filter(g => g.sk); mine.forEach(g => ARC_G.splice(ARC_G.indexOf(g), 1)); try { _ra(); } finally { ARC_G.push(...mine); } };
  const _oa = openArcade; openArcade = function () { if (SKX.hubGame) { SKX.hubGame = false; openHub('games'); return; } return _oa(); };
  // ---------- voice: every line this world can say ----------
  const _xv = extraVoLines; extraVoLines = function (add, gen) { _xv(add, gen);
    TERI_W.forEach(t => add(t, 'teri')); SKG.forEach(t => add(t, 'gigi')); SKT.forEach(t => add(t, 'teri')); SKTD.forEach(t => add(t, 'teri')); add('Two choices left! Look carefully and pick!', 'teri');
    CAST.forEach(([c, t]) => add(t, c === 'aspen' ? 'juniper' : c.replace(/[0-9]/g, ''))); Object.values(HUB_L).forEach(t => add(t)); add('Color the skating pages, Aspen! The rinks and the whole cast are waiting!');
    RK.forEach(r => { add(`New rink emblem: ${r.name}!`); add(`Finish ${r.name} to win this emblem!`); ['Bronze', 'Silver', 'Gold'].forEach(m => add(`${r.name}! ${m} emblem!`)); });
    STK_IDS.filter(id => /^sk_/.test(id)).forEach(id => { add(STK_DEF[id][2] + '!'); add(stkHow(id)); });
    NB.forEach(b => { add(b.intro, b.ch); add(b.defeat, b.ch); const id = b.relic; add(`Beat ${bossThe(b)} to find this treasure!`); add(`Beat ${bossThe(b)} to open this part of the map!`); add(`${RELICS[id].power} is ready!`);
      for (let r = 0; r <= 4; r++) { add(`${relicName(id, r)}. ${RELICS[id].lore}`); add(`Your relic is now ${RAR[r].n}! ${relicName(id, r)}!`); add(`You found ${relicThe(id, r)}! It is ${RAR[r].n === 'Epic' ? 'an' : 'a'} ${RAR[r].n} relic!`); } });
    COST.forEach(c => add(`You need ${c} ice crystals. Finish skating stops to earn more!`, 'juniper', { full: true }));
    const w = WORLDS.skate; C.A.filter(a => /^sk_/.test(a.id)).forEach(a => { const who = CHARS.has(a.who) || SART.hasChr(a.who) ? a.who : 'juniper'; const intro = `${a.title}${/[.!?]$/.test(a.title) ? '' : '.'} ${a.line}`; add(intro, who); w.cheer.forEach(c => add(c, who)); });
    ARC_G.filter(g => g.sk).forEach(G => add(G.say + ' Ready, set, go!')); SKGL.forEach(t => add(t));
    if (window.SKV21) window.SKV21().forEach(([t, c]) => add(t, c, { full: true }));
    ['You solved it.', 'Every row, every column, every box.', 'They went skating.', 'scarf', 'no.', 'black.', 'asking.', 'telling.', 'Landen.', 'Nikko.', 'Sofia.', 'Valentina.', 'Olivia.', 'Aspen.'].forEach(t => add(t));
    // bro steps for the skate math questions
    C.A.filter(a => /^sk_/.test(a.id)).forEach(a => { for (let sd = 1; sd <= 60; sd++) { C.setSeed(sd * 7919 + a.id.length * 13); let items; try { items = C.makeItems(a); } catch (e) { continue; }
      items.forEach(it => { (it.opts || []).forEach(o => { const t = String(o.say || o.v || '').trim(); if (t && !/^\d+$/.test(t)) { add(t, 'juniper', gen); add(/[.!?]$/.test(t) ? t : t + '.', 'juniper', gen); } }); if (!it.opts || it.opts.length < 3) return; if (it.bro) add(it.bro, 'bro', gen); else if (a.subj === 'math' && it.hint) add(String(it.hint).replace(/^Patience, Aspen\.\s*/, ''), 'bro', gen); }); } }); };
  // ---------- skate games (arcade engine, timed, 10 rounds) ----------
  const SKGL = ['The pattern repeats. Find the part that repeats, then say it again.', 'Add the scores. Count the dots with me!', 'Look at the glowing row. Which picture is missing from it?'];
  const TRK = ['spin', 'jump', 'glide', 'spiral'];
  const icS = n => `<span class="ic">${ICONS.icon(n) || ''}</span>`;
  ARC_G.push(
    { id: 'skcombo', name: 'Trick Combo', learn: 'Patterns', st: 'sk_pom', t: [70, 48, 34], c1: '#cfe9ff', c2: '#8a6cff', say: 'Trick Combo! Tap the trick that comes next in the pattern!', sk: 1 },
    { id: 'skjudge', name: 'Jump Judge', learn: 'Adding scores', st: 'sk_gskate', t: [75, 52, 38], c1: '#fff1b0', c2: '#ff9a3c', say: 'Jump Judge! Add up the scores and hold up the right paddle!', sk: 1 },
    { id: 'skrink', name: 'Rink Builder', learn: 'Logic grids', st: 'sk_cgigi', t: [85, 60, 44], c1: '#d7fbe8', c2: '#22b8cf', say: 'Rink Builder! Every row and every column needs one of each picture. Which tile fits?', sk: 1 });
  Object.assign(GAMES, {
    skcombo: { init(A) { A.innerHTML = `<div class="skg-ice"></div><div class="skg-seq" id="scSeq"></div><div class="skg-opts" id="scOpts"></div><div class="skg-fan" id="scFan">${CHARS.svg('teri', { pose: 'cheer' })}</div>`; },
      next() { const L = ARC.lvl, U = [['AB', 'AAB', 'ABB'], ['ABC', 'AABB', 'ABAC', 'ABBC'], ['ABCD', 'ABBA', 'AABC', 'ABCB']][L - 1]; const u = U[arR(U.length)]; const tr = arShuf(TRK); const m = {}; [...new Set(u)].forEach((c, i) => m[c] = tr[i]);
        const seq = []; while (seq.length < 12) for (const c of u) seq.push(m[c]); const n = L === 3 ? 8 : 6, ans = seq[n]; ARC.q = { k: 'pat', u: u.length, ans };
        $('scSeq').innerHTML = seq.slice(0, n).map((x, i) => `<i class="sq" data-i="${i}">${icS(x)}</i>`).join('') + `<i class="sq qm"><b>?</b></i>`;
        const opts = arShuf(L === 1 ? TRK : TRK.filter(x => Object.values(m).includes(x) || TRK.length < 4)).slice(0, 4); if (!opts.includes(ans)) opts[0] = ans;
        $('scOpts').innerHTML = arShuf(opts).map(x => `<button class="sco" data-v="${x}">${icS(x)}</button>`).join('');
        $('scOpts').querySelectorAll('.sco').forEach(b => b.onclick = () => { if (b.disabled) return; if (b.dataset.v === ans) { b.classList.add('ok'); const f = $('scFan'); if (f) { f.classList.remove('jump'); void f.offsetWidth; f.classList.add('jump'); } if (arcRight(b)) arcLater(() => this.next(), 420); } else { b.disabled = true; b.classList.add('no'); arcWrong(b); } }); } },
    skjudge: { init(A) { A.innerHTML = `<div class="skg-ice"></div><div class="skj-card" id="sjCard"></div><div class="skj-judge">${CHARS.svg('oscar')}</div><div class="skg-opts paddles" id="sjOpts"></div>`; },
      next() { const L = ARC.lvl; let parts; if (L === 1) parts = [1 + arR(5), 1 + arR(5)]; else if (L === 2) parts = [2 + arR(6), 1 + arR(7), 1 + arR(6)]; else parts = [10 * (1 + arR(4)), 10 * (1 + arR(3)), 1 + arR(9)];
        const ans = parts.reduce((s, v) => s + v, 0); ARC.q = parts.length === 2 ? { k: '+', a: parts[0], b: parts[1], ans } : { k: 'sum3', parts, ans };
        $('sjCard').innerHTML = parts.map((v, i) => `<span class="sjc">${icS(TRK[i % 4])}<b>${v}</b></span>`).join('<em>+</em>');
        const opts = arOpts(ans); $('sjOpts').innerHTML = opts.map(v => `<button class="sjp" data-v="${v}"><b>${v}</b></button>`).join('');
        $('sjOpts').querySelectorAll('.sjp').forEach(b => b.onclick = () => { if (b.disabled) return; if (+b.dataset.v === ans) { b.classList.add('ok'); if (arcRight(b)) arcLater(() => this.next(), 420); } else { b.disabled = true; b.classList.add('no'); arcWrong(b); } }); } },
    skrink: { init(A) { A.innerHTML = `<div class="skg-ice"></div><div class="skr-g" id="srG"></div><div class="skg-opts" id="srOpts"></div>`; },
      next() { const L = ARC.lvl, N = L === 3 ? 4 : 3; const P = arShuf(['snowflake', 'star', 'heart', 'mitten']).slice(0, N); const sh = arShuf([...Array(N).keys()]); const rows = [...Array(N).keys()].map(r => [...Array(N).keys()].map(c => sh[(c + r) % N])); const g = arShuf(rows);
        const holes = arShuf([...Array(N * N).keys()]).slice(0, L); const tgt = holes[0], tr = Math.floor(tgt / N), ans = P[g[tr][tgt % N]]; ARC.q = { k: 'grid', row: tr, ans };
        const G = $('srG'); G.style.setProperty('--n', N); G.innerHTML = [...Array(N * N).keys()].map(k => { const r = Math.floor(k / N), c = k % N; return k === tgt ? `<i class="src tgt" data-r="${r}"><b>?</b></i>` : holes.includes(k) ? `<i class="src hole" data-r="${r}"></i>` : `<i class="src" data-r="${r}">${icS(P[g[r][c]])}</i>`; }).join('');
        $('srOpts').innerHTML = arShuf(P).map(x => `<button class="sro" data-v="${x}">${icS(x)}</button>`).join('');
        $('srOpts').querySelectorAll('.sro').forEach(b => b.onclick = () => { if (b.disabled) return; if (b.dataset.v === ans) { b.classList.add('ok'); if (arcRight(b)) arcLater(() => this.next(), 420); } else { b.disabled = true; b.classList.add('no'); arcWrong(b); } }); } } });
  ARC_G.filter(g => g.sk).forEach(G => { STK_EARN[G.st] = { t: 'arcade', g: G.id }; });
  // relic hints for the skate games: a nudge, never the answer
  const _arl = arcRelic; arcRelic = function () { const q = ARC && ARC.q; if (!q || !['pat', 'sum3', 'grid'].includes(q.k) || !ARC.run || !ARC.t0 || ARC.hinted) return _arl();
    ARC.hinted = true; $('agRelic').classList.add('used'); SND.pop(); sparkEl($('agRelic'), 10); const eq = ST.equip; const pw = eq && RELICS[eq] ? RELICS[eq].power + '! ' : ''; let say = '';
    if (q.k === 'pat') { $('scSeq').querySelectorAll('.sq').forEach((e, i) => { if (i < q.u) e.classList.add('v16spot'); }); say = SKGL[0]; }
    else if (q.k === 'sum3') { const p = h('div', 'v16hint arhint', q.parts.map((v, i) => v <= 10 ? dotsRow(v, ['#ff5fb8', '#4fb3ff', '#ffb300'][i]) : `<b class="hop">${v / 10} tens</b>`).join('<b class="hop">+</b>')); $('agArea').appendChild(p); say = SKGL[1]; }
    else { $('srG').querySelectorAll(`.src[data-r="${q.row}"]`).forEach(e => e.classList.add('v16spot')); say = SKGL[2]; }
    const rb = $('agRelic'); if (pw) speak(pw + 'Here is a hint!', { who: rb, onend: () => { if (ARC && ARC.q === q) speak(say, { who: rb }); } }); else speak(say, { who: rb }); };
  try { tile(); } catch (e) {}
  // ---------- skating coloring book: 8 painted pages unlock in the Coloring Park as she skates ----------
  const SKSC = [['sk_dobson', 'Skating at Dobson Arena', () => !!(ST.met && ST.met.skate) || wPos('skate') > 0],
    ['sk_rock', 'Rockefeller Center Rink', () => wPos('skate') >= secEnd('skate', 0)],
    ['sk_cocoa', "GiGi's Cocoa Stand", () => S().bros >= 3],
    ['sk_wollman', 'Wollman Rink Friends', () => beaten('skate:1')],
    ['sk_dtice', 'Downtown Ice with Mama Fox', () => beaten('skate:4')],
    ['sk_rideau', 'Captain Chomp on the Canal', () => beaten('skate:6')],
    ['sk_louise', 'Lake Louise Ice Castle', () => beaten('skate:8')],
    ['sk_tahoe', 'The Aurora Trickster', () => beaten('skate:11')]];
  SKSC.forEach(([id, nm]) => { SCENE_NAME[id] = nm; });
  const _se = scenesEarned; scenesEarned = function () { const out = _se(); try { SKSC.forEach(([id, , ok]) => { if (ok()) out.push(id); }); } catch (e) {} return out; };
  // ---------- Skating wearables for Aspen: exact-fit colour variants of her QC'd skating items, one per skate boss.
  // Geometry comes from the base item (dress-up layers and all 8 spin views), only the colour files differ (v21/tools/wear_variants.py). ----------
  const WV = {"items":{"a_pscarf":["a_scarf","pink","Pink Snowflake Scarf","skate:1"],"a_rmedal":["a_smedal","rainbowR","Rainbow Star Medal","skate:4"],"a_xmedal":["a_smedal","silver","Silver Snowflake Medal","skate:6"],"a_ascarf":["a_scarf","aurora","Aurora Scarf","skate:8"],"a_atiara":["a_tiara","tiara","Aurora Ice Tiara","skate:11"]},"spin":{"a_pscarf":{"000":{"f":"a_000__a_pscarf.b14aad2e62.webp","x":192,"y":299},"045":{"f":"a_045__a_pscarf.c70adaffbc.webp","x":187,"y":301},"090":{"f":"a_090__a_pscarf.53cb361283.webp","x":207,"y":306},"135":{"f":"a_135__a_pscarf.d1697c9c2a.webp","x":204,"y":313},"180":{"f":"a_180__a_pscarf.7e71e3ee4b.webp","x":209,"y":319},"225":{"f":"a_225__a_pscarf.71466ed915.webp","x":227,"y":313},"270":{"f":"a_270__a_pscarf.5ac318055a.webp","x":210,"y":300},"315":{"f":"a_315__a_pscarf.19d11fd15d.webp","x":205,"y":294}},"a_rmedal":{"000":{"f":"a_000__a_rmedal.33df6324eb.webp","x":244,"y":347},"045":{"f":"a_045__a_rmedal.ff85cc7657.webp","x":225,"y":335},"090":{"f":"a_090__a_rmedal.80a2e89e4f.webp","x":237,"y":326},"135":{"f":"a_135__a_rmedal.c38c8bcc58.webp","x":240,"y":335},"180":{"f":"a_180__a_rmedal.b4765c5800.webp","x":235,"y":344},"225":{"f":"a_225__a_rmedal.49ad8b4fab.webp","x":282,"y":329},"270":{"f":"a_270__a_rmedal.77a922b193.webp","x":230,"y":323},"315":{"f":"a_315__a_rmedal.e61824e635.webp","x":257,"y":337}},"a_xmedal":{"000":{"f":"a_000__a_xmedal.1cb4c5ea8c.webp","x":244,"y":347},"045":{"f":"a_045__a_xmedal.2fdc09a79d.webp","x":225,"y":335},"090":{"f":"a_090__a_xmedal.db9f0666c9.webp","x":237,"y":326},"135":{"f":"a_135__a_xmedal.e2ef29b047.webp","x":240,"y":335},"180":{"f":"a_180__a_xmedal.f0f1687cf7.webp","x":235,"y":344},"225":{"f":"a_225__a_xmedal.3e79817fb7.webp","x":282,"y":329},"270":{"f":"a_270__a_xmedal.6b724c84b0.webp","x":230,"y":323},"315":{"f":"a_315__a_xmedal.8c9f26da70.webp","x":257,"y":337}},"a_ascarf":{"000":{"f":"a_000__a_ascarf.8ffb322447.webp","x":192,"y":299},"045":{"f":"a_045__a_ascarf.cfe23a9641.webp","x":187,"y":301},"090":{"f":"a_090__a_ascarf.3bf49f4bff.webp","x":207,"y":306},"135":{"f":"a_135__a_ascarf.7bda3675f2.webp","x":204,"y":313},"180":{"f":"a_180__a_ascarf.436a6abe51.webp","x":209,"y":319},"225":{"f":"a_225__a_ascarf.fafc96081b.webp","x":227,"y":313},"270":{"f":"a_270__a_ascarf.ca798b4efe.webp","x":210,"y":300},"315":{"f":"a_315__a_ascarf.a7222ff47b.webp","x":205,"y":294}},"a_atiara":{"000":{"f":"a_000__a_atiara.77b1970293.webp","x":182,"y":49,"e":"a_000__a_tiara.e.29ef5b49a0.webp","ex":189,"ey":59},"045":{"f":"a_045__a_atiara.dee5611287.webp","x":159,"y":53,"e":"a_045__a_tiara.e.9c3f27e5f7.webp","ex":157,"ey":52},"090":{"f":"a_090__a_atiara.01caf6a899.webp","x":218,"y":57,"e":"a_090__a_tiara.e.6f346e3e8b.webp","ex":211,"ey":63},"135":{"f":"a_135__a_atiara.70a7724adf.webp","x":186,"y":44,"e":"a_135__a_tiara.e.21307a199c.webp","ex":198,"ey":58},"180":{"f":"a_180__a_atiara.0b76254c15.webp","x":183,"y":46,"e":"a_180__a_tiara.e.7b19e0b104.webp","ex":235,"ey":69},"225":{"f":"a_225__a_atiara.bc526ec77d.webp","x":220,"y":56,"e":"a_225__a_tiara.e.f403e93fed.webp","ex":235,"ey":58},"270":{"f":"a_270__a_atiara.e4340e47d7.webp","x":225,"y":53,"e":"a_270__a_tiara.e.d80f97eac3.webp","ex":219,"ey":70},"315":{"f":"a_315__a_atiara.202b42332c.webp","x":224,"y":42,"e":"a_315__a_tiara.e.60ae6cc2f9.webp","ex":252,"ey":52}}}};
  try { Object.entries(WV.items).forEach(([id, [b, , name, boss]]) => { const o = Object.assign({}, AIOF[b], { id, name, boss, base: b }); if (AIOF[id]) return; AI.push(o); AIOF[id] = o; });
    const SA = SPIN19.a; Object.entries(WV.spin).forEach(([id, an]) => { Object.entries(an).forEach(([a, e]) => { SA.ang[a].i[id] = e; }); const b = WV.items[id][0];
      if (Array.isArray(SA.order)) { const k = SA.order.indexOf(b); if (k >= 0 && !SA.order.includes(id)) SA.order.splice(k + 1, 0, id); }
      Object.values(SA.hide || {}).forEach(l => { if (l.includes(b) && !l.includes(id)) l.push(id); }); });
    const _aav = aspenArt; aspenArt = function (on = aspState().on, cls = '') { const sw = []; const on2 = {}; Object.entries(on || {}).forEach(([k, id]) => { const v = WV.items[id]; if (v) { sw.push([v[0], id]); on2[k] = v[0]; } else on2[k] = id; });
      let s = _aav.call(this, on2, cls); sw.forEach(([b, id]) => { s = s.split(`asp__${b}.webp`).join(`asp__${id}.webp`).split(`wear/${b}${WEAR17.has(b) ? '_v17' : ''}.webp`).join(`wear/${id}.webp`).split(`data-w="${b}"`).join(`data-w="${id}"`); }); return s; };
    try { JLPDRESS.aspenArt = aspenArt; } catch (e) {} } catch (e) { console.warn('skate wear', e); }
  return { RK, NB, SKX, skOn, openHub, renderHub, forgeUp, emblemCheck, S, COST, tile, TERI_W, SKG, SKT, CAST, SKV };
})();
window.JLPSK = SK21;

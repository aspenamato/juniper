// ---------- v21 Ice Skating World coloring book: 8 painted pages (raster line/color from /workspace/juniper-art, wired by art5.js) ----------
(() => {
const SK = [
  ['sk_dobson', 'Skating at Dobson Arena', 'Patinar en Dobson', 'open the Ice Skating World'],
  ['sk_rock', 'Rockefeller Center Rink', 'La pista de Rockefeller', 'finish Dobson Ice Arena'],
  ['sk_cocoa', "GiGi's Cocoa Stand", 'El chocolate de GiGi', 'call the finance bros 3 times'],
  ['sk_wollman', 'Wollman Rink Friends', 'Amigos en Wollman', 'beat the Wobble Goblin'],
  ['sk_dtice', 'Downtown Ice with Mama Fox', 'Downtown Ice con Mamá Zorra', 'beat the Bumpy Ice Bandit'],
  ['sk_rideau', 'Captain Chomp on the Canal', 'El Capitán Chomp', 'beat the Fog Phantom'],
  ['sk_louise', 'Lake Louise Ice Castle', 'El castillo de hielo', 'beat Captain Chomp'],
  ['sk_tahoe', 'The Aurora Trickster', 'La bromista de la aurora', 'beat the Aurora Trickster']];
const blank = ART.pages.find(p => p.id === 'blank');
const bi = ART.pages.indexOf(blank);
ART.pages.splice(bi < 0 ? ART.pages.length : bi, 0, ...SK.map(([id, title, es, need]) => ({ id, world: 'skate', title, es, need, svg: blank ? blank.svg : '' })));
})();

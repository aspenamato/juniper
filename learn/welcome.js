// Welcome splash: a random friend waves hello each time the app opens (cold launch or back after 3+ minutes away).
(function () {
  var CH = [['juniper','Juniper'],['toulouse','Toulouse'],['marcus','Marcus'],['winnie','Winnie'],['scramble','Scramble'],['pearl','Pearl'],['oscar','Oscar'],['marengo','Marengo'],['teddy','Teddy'],['mamafox','Mama Fox'],['nicolo','Old Nicolò'],['aspen','Aspen'],['coqui','Coquí']];
  var BASE = '../art/chars/', KEY = 'jWelcomeLast', AWAY = 180000, hiddenAt = 0, lastShow = 0;
  var css = '#jwel{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;' +
    'background:radial-gradient(circle at 50% 42%,#fffbe8 0,#ffd9f0 28%,#c9b8ff 58%,#7fd8ff 100%);transition:opacity .45s ease;font-family:inherit}' +
    '#jwel.out{opacity:0;pointer-events:none}' +
    '#jwel .rb{position:absolute;left:50%;top:58%;width:150vmin;height:150vmin;margin:-75vmin 0 0 -75vmin;border-radius:50%;opacity:.55;' +
    'background:radial-gradient(circle,transparent 38%,#ff5c8a 38%,#ff5c8a 41%,#ffa53d 41%,#ffa53d 44%,#ffe14d 44%,#ffe14d 47%,#5ee08a 47%,#5ee08a 50%,#4fb6ff 50%,#4fb6ff 53%,#a77bff 53%,#a77bff 56%,transparent 56%);animation:jwrb 1.6s ease-out both}' +
    '#jwel img{position:relative;height:min(52vh,58vw);max-width:80vw;object-fit:contain;filter:drop-shadow(0 10px 18px rgba(80,40,120,.35));animation:jwpop .7s cubic-bezier(.2,1.6,.4,1) both,jwwave 1.2s ease-in-out .7s infinite}' +
    '#jwel .hi{position:relative;margin-top:2vh;font-weight:900;font-size:min(10vw,64px);color:#fff;letter-spacing:.02em;text-shadow:0 3px 0 #b04ab8,0 6px 14px rgba(120,40,140,.45);animation:jwpop .6s .25s cubic-bezier(.2,1.6,.4,1) both}' +
    '#jwel .who{position:relative;font-weight:800;font-size:min(5vw,28px);color:#6b3fa0;animation:jwpop .6s .4s both}' +
    '#jwel .sp{position:absolute;color:#fff;text-shadow:0 0 8px #fff,0 0 16px #ffe14d;animation:jwtw 1.4s ease-in-out infinite}' +
    '@keyframes jwpop{0%{transform:scale(.2);opacity:0}100%{transform:scale(1);opacity:1}}' +
    '@keyframes jwwave{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg) translateY(-6px)}}' +
    '@keyframes jwrb{0%{transform:scale(.3);opacity:0}100%{transform:scale(1);opacity:.55}}' +
    '@keyframes jwtw{0%,100%{transform:scale(.4) rotate(0);opacity:.3}50%{transform:scale(1.2) rotate(40deg);opacity:1}}' +
    '.jwbuddy{position:absolute;right:-6%;bottom:2%;height:46%;max-height:220px;pointer-events:none;filter:drop-shadow(0 6px 10px rgba(0,0,0,.2));animation:jwpop .6s cubic-bezier(.2,1.6,.4,1) both,jwwave 2.4s ease-in-out .6s infinite;z-index:2}';
  function pick() {
    var last = ''; try { last = localStorage.getItem(KEY) || ''; } catch (e) {}
    var pool = CH.filter(function (c) { return c[0] !== last; }), c = pool[Math.floor(Math.random() * pool.length)];
    try { localStorage.setItem(KEY, c[0]); } catch (e) {}
    return c;
  }
  function buddy(c) {
    var w = document.querySelector('.homefoxwrap'); if (!w || c[0] === 'juniper') { var o = document.querySelector('.jwbuddy'); if (o) o.remove(); return; }
    if (getComputedStyle(w).position === 'static') w.style.position = 'relative';
    var b = w.querySelector('.jwbuddy'); if (!b) { b = document.createElement('img'); b.className = 'jwbuddy'; b.alt = ''; w.appendChild(b); }
    b.onerror = function () { b.remove(); }; b.src = BASE + c[0] + '_wave.webp';
  }
  function show() {
    var now = Date.now(); if (now - lastShow < 20000) return; lastShow = now;
    try { var t = +sessionStorage.getItem('jWelcomeAt') || 0; if (now - t < 20000) return; sessionStorage.setItem('jWelcomeAt', String(now)); } catch (e) {}
    var c = pick(), old = document.getElementById('jwel'); if (old) old.remove();
    var d = document.createElement('div'); d.id = 'jwel'; d.setAttribute('aria-hidden', 'true');
    var h = '<div class="rb"></div>';
    for (var i = 0; i < 14; i++) h += '<span class="sp" style="left:' + (5 + Math.random() * 90) + '%;top:' + (5 + Math.random() * 85) + '%;font-size:' + (14 + Math.random() * 26) + 'px;animation-delay:' + (Math.random() * 1.2).toFixed(2) + 's">✦</span>';
    h += '<img alt="" src="' + BASE + c[0] + '_wave.webp"><div class="hi">Hi Aspen!</div><div class="who">' + c[1] + ' says hello</div>';
    d.innerHTML = h;
    var done = false, gone = function () { if (done) return; done = true; d.classList.add('out'); setTimeout(function () { d.remove(); }, 500); };
    d.querySelector('img').onerror = function () { gone(); };
    d.addEventListener('pointerdown', gone); d.addEventListener('click', gone);
    document.body.appendChild(d); setTimeout(gone, 1600); setTimeout(function () { if (d.parentNode) d.remove(); }, 2600);
    buddy(c);
  }
  function init() {
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    if (/[?&]nosplash/.test(location.search) || (navigator.webdriver && !/[?&]splash/.test(location.search))) { buddy(pick()); return; }
    show();
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) hiddenAt = Date.now(); else if (hiddenAt && Date.now() - hiddenAt > AWAY) { hiddenAt = 0; show(); }
    });
  }
  if (document.body) init(); else document.addEventListener('DOMContentLoaded', init);
})();

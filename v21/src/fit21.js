// ---------- v21 t108u: auto-fit map banners, restore full stop names, shrink-to-fit labels ----------
(function fit21() {
  const MIN_BANNER = 24, MIN_SUB = 14, MIN_NODE = 15;
  const fitSvgText = (el, maxW, minFs, startFs) => {
    if (!el) return 0;
    let fs = startFs || parseFloat(el.getAttribute('font-size')) || 20;
    const apply = () => {
      el.setAttribute('font-size', String(fs));
      let len = 0; try { len = el.getComputedTextLength(); } catch (e) { return 0; }
      const sw = parseFloat(el.getAttribute('stroke-width') || 0) || 0;
      return len + sw * 0.6;
    };
    let w = apply();
    while (w > maxW && fs > minFs) { fs -= 0.8; w = apply(); }
    return w;
  };
  const wrapSvgText = (el, str, maxW, fs) => {
    if (!el || !str) return;
    const parts = String(str).trim().split(/\s+/);
    if (parts.length < 2) { el.textContent = str; return; }
    // pick a split that keeps both lines short
    let best = 1, bestScore = 1e9;
    for (let i = 1; i < parts.length; i++) {
      const a = parts.slice(0, i).join(' '), b = parts.slice(i).join(' ');
      const score = Math.max(a.length, b.length) + Math.abs(a.length - b.length) * 0.15;
      if (score < bestScore) { bestScore = score; best = i; }
    }
    const a = parts.slice(0, best).join(' '), b = parts.slice(best).join(' ');
    const sw = el.getAttribute('stroke-width') || '0';
    const fill = el.getAttribute('fill') || '#fff';
    const stroke = el.getAttribute('stroke') || 'none';
    const po = el.getAttribute('paint-order') || '';
    const ff = el.getAttribute('font-family') || '';
    const fw = el.getAttribute('font-weight') || '900';
    const anc = el.getAttribute('text-anchor') || 'middle';
    const x = el.getAttribute('x') || '0';
    const y = parseFloat(el.getAttribute('y') || 0);
    el.textContent = '';
    const mk = (t, dy) => {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      s.setAttribute('x', x); s.setAttribute('dy', dy);
      s.textContent = t; el.appendChild(s);
    };
    mk(a, '0'); mk(b, String(fs * 1.12));
    el.setAttribute('font-size', String(fs));
    // shift up a bit so two lines stay in the banner
    el.setAttribute('y', String(y - fs * 0.45));
    el.setAttribute('stroke-width', sw); el.setAttribute('fill', fill);
    el.setAttribute('stroke', stroke); if (po) el.setAttribute('paint-order', po);
    el.setAttribute('font-family', ff); el.setAttribute('font-weight', fw);
    el.setAttribute('text-anchor', anc);
  };
  const widenBanner = (g, extra) => {
    const rects = [...g.querySelectorAll('rect')];
    const body = rects.find(r => +r.getAttribute('width') >= 400);
    if (!body) return +((body && body.getAttribute('width')) || 500);
    const w = +body.getAttribute('width') + extra;
    const x = -w / 2;
    body.setAttribute('x', String(x));
    body.setAttribute('width', String(w));
    const shine = rects.find(r => r !== body && +r.getAttribute('height') <= 50);
    if (shine) { shine.setAttribute('x', String(x + 10)); shine.setAttribute('width', String(w - 20)); }
    const paths = [...g.querySelectorAll('path')];
    // swallowtails sit at ±270/300 for a 500-wide body (half = 250). Shift by extra/2.
    const dx = extra / 2;
    paths.forEach(p => {
      const d = p.getAttribute('d') || '';
      if (/M-270|M270/.test(d)) {
        p.setAttribute('d', d.replace(/(-?)(240|270|300)/g, (_, s, n) => s + (parseInt(n, 10) + dx)));
      }
    });
    return w;
  };
  const fitBanners = () => {
    const svg = document.querySelector('#mapSvg svg, #map svg, svg.hallbg') || document.querySelector('#mapSvg')?.querySelector?.('svg');
    const root = document.querySelector('#mapSvg') || document.getElementById('mapSvg');
    const scope = root || document;
    scope.querySelectorAll('g.banner').forEach(g => {
      const texts = [...g.querySelectorAll('text')];
      if (!texts.length) return;
      const title = texts[0], sub = texts[1];
      const body = [...g.querySelectorAll('rect')].find(r => +r.getAttribute('width') >= 400);
      let max = (body ? +body.getAttribute('width') : 500) - 40;
      let w = fitSvgText(title, max, MIN_BANNER, parseFloat(title.getAttribute('font-size')) || 42);
      if (w > max) {
        const need = Math.ceil(w - max + 8);
        const cap = 160;
        const extra = Math.min(need, cap);
        const nw = widenBanner(g, extra);
        max = nw - 40;
        w = fitSvgText(title, max, MIN_BANNER, parseFloat(title.getAttribute('font-size')) || 42);
      }
      if (w > max && (title.textContent || '').trim().split(/\s+/).length > 1) {
        const fs = Math.max(MIN_BANNER, parseFloat(title.getAttribute('font-size')) || 28);
        wrapSvgText(title, [...title.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('') || title.textContent, max, fs);
        // after wrap, shrink if still wide
        try {
          const len = title.getComputedTextLength();
          if (len > max) fitSvgText(title, max, 20, fs);
        } catch (e) {}
      }
      if (sub) fitSvgText(sub, max, MIN_SUB, parseFloat(sub.getAttribute('font-size')) || 22);
    });
    // restore full activity names on nodes (map3.js shortens at 22 chars)
    const BY = (window.JLP && JLP.C && JLP.C.BY) || {};
    scope.querySelectorAll('g.node').forEach(g => {
      const id = g.getAttribute('data-id');
      const a = BY[id]; if (!a || !a.title) return;
      const t = g.querySelector('text'); if (!t) return;
      const cur = (t.textContent || '').replace(/\s+/g, ' ').trim();
      if (cur !== a.title) t.textContent = a.title;
      const plate = [...g.querySelectorAll('rect')].find(r => +r.getAttribute('width') >= 80);
      let max = plate ? Math.max(80, +plate.getAttribute('width') - 16) : 200;
      let fs = parseFloat(t.getAttribute('font-size')) || (plate ? 22 : 21);
      let w = fitSvgText(t, max, MIN_NODE, fs);
      if (w > max && plate) {
        const extra = Math.min(120, Math.ceil(w - max + 12));
        const nw = +plate.getAttribute('width') + extra;
        plate.setAttribute('width', String(nw));
        plate.setAttribute('x', String(-nw / 2));
        max = nw - 16;
        w = fitSvgText(t, max, MIN_NODE, fs);
      }
      if (w > max && a.title.split(/\s+/).length > 1) {
        wrapSvgText(t, a.title, max, Math.max(MIN_NODE, parseFloat(t.getAttribute('font-size')) || 18));
      }
    });
    // boss name plates already size to length; still shrink if a long name overflows
    scope.querySelectorAll('g.bnode text').forEach(t => {
      const plate = t.parentElement && t.parentElement.querySelector('rect');
      if (!plate) return;
      fitSvgText(t, +plate.getAttribute('width') - 16, 16, parseFloat(t.getAttribute('font-size')) || 24);
    });
  };

  const fitHtml = (el, min, lines) => {
    if (!el) return;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || +cs.opacity === 0) return;
    const box = el.closest('.tile, .accard, .tjrw-i, .tjpg, .pcard, .arcard, .skcard, .card, .topbar, button, a.tile') || el.parentElement || el;
    const roomW = () => {
      const r = box.getBoundingClientRect();
      const pcs = getComputedStyle(box);
      const pad = (parseFloat(pcs.paddingLeft) || 0) + (parseFloat(pcs.paddingRight) || 0);
      return Math.max(8, r.width - pad - 4);
    };
    el.style.textOverflow = 'clip';
    el.style.overflow = 'visible';
    el.style.lineHeight = '1.12';
    let fs = parseFloat(cs.fontSize);
    const shrink = () => { fs = Math.max(min, fs - 0.5); el.style.fontSize = fs + 'px'; };
    if (lines > 1) {
      // wrap first — never leave nowrap on a tile/label that is allowed two lines
      el.style.whiteSpace = 'normal';
      let guard = 24;
      while (guard-- && el.scrollWidth > roomW() && fs > min) shrink();
    } else {
      el.style.whiteSpace = 'nowrap';
      let guard = 24;
      const tooWide = () => el.scrollWidth > Math.max(el.clientWidth, roomW()) + 1;
      while (guard-- && tooWide() && fs > min) shrink();
    }
  };

  const fitChrome = () => {
    fitHtml(document.getElementById('hHello'), 12, 1);
    document.querySelectorAll('.topbar .hdr, .maptitle, .st-title').forEach(el => fitHtml(el, 12, 2));
    document.querySelectorAll('#home .tile b, #home .tile small, .accard b, .tjrw-i b, .tjrw-i small, .tjpg-nm, .pc-name').forEach(el => fitHtml(el, 9, 2));
    document.querySelectorAll('.acsteps span').forEach(el => fitHtml(el, 8, 1));
  };

  const run = () => { try { fitBanners(); } catch (e) {} try { fitChrome(); } catch (e) {} };

  const hook = (obj, name) => {
    if (!obj || typeof obj[name] !== 'function' || obj[name]._fit21) return;
    const orig = obj[name];
    const wrapped = function () { const r = orig.apply(this, arguments); requestAnimationFrame(run); return r; };
    wrapped._fit21 = 1; obj[name] = wrapped;
  };

  // hook after skate/tj have already wrapped these
  hook(window, 'renderMap');
  if (typeof renderMap === 'function') {
    hook({ renderMap }, 'renderMap');
    // wrap the global directly
    if (!renderMap._fit21) {
      const orig = renderMap;
      renderMap = function () { const r = orig.apply(this, arguments); requestAnimationFrame(run); return r; };
      renderMap._fit21 = 1;
    }
  }
  if (window.JLP) hook(JLP, 'openMap');
  if (window.JLP) hook(JLP, 'goHome');
  if (window.JLP) hook(JLP, 'openWorlds');
  if (window.JLPACAD) hook(JLPACAD, 'openAcademy');
  if (window.JLPARC) hook(JLPARC, 'openArcade');
  if (window.TJ21) hook(TJ21, 'open');
  if (window.JLPSK) hook(JLPSK, 'openHub');
  if (window.JLPSK) hook(JLPSK, 'renderHub');

  window.addEventListener('resize', () => { clearTimeout(window.__fit21t); window.__fit21t = setTimeout(run, 80); });
  if (document.readyState === 'complete') setTimeout(run, 400);
  else window.addEventListener('load', () => setTimeout(run, 400));
  window.JLPFIT21 = { run, fitBanners, fitChrome };
})();

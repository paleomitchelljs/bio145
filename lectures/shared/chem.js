/* Drawing helpers that return SVG markup (strings), so a figure can be written as a template. Every color is a CSS
 * class from lecture.css, so the drawings recolor with the whiteboard / chalkboard toggle.
 *
 *   Deck.chem.mol({ atoms: [[el, x, y, hide?]], bonds: [[i, j, order?, 'dash'?]], s: scale, x, y, cls })
 *      a structural formula: element letters and bond lines (hide: draw the bonds but not the letter, as for carbon)
 *   Deck.chem.balls({ atoms: [[el, x, y, r?]], bonds: [[i, j]], s, x, y })   ball-and-stick
 *   Deck.chem.bohr(x, y, { p, n, e, r })   nucleus with p protons and n neutrons, e electrons in shells of 2, 8, 8
 *   Deck.chem.water(x, y, { a: angle, s: scale, d: show δ })   one water molecule, ball-and-stick
 *   Deck.chem.arrow(x1, y1, x2, y2, cls)   a straight arrow
 */
(function () {
  'use strict';
  const D = window.Deck;
  const R = { H: 15, C: 22, N: 21, O: 21, P: 25, S: 25, Na: 30, Cl: 28, Fe: 28 };
  const light = new Set(['H']);
  const n2 = (x) => Math.round(x * 10) / 10;

  function line(x1, y1, x2, y2, cls) { return `<line class="${cls || 'ch-bond'}" x1="${n2(x1)}" y1="${n2(y1)}" x2="${n2(x2)}" y2="${n2(y2)}"/>`; }

  function mol(o) {
    const s = o.s || 1, ox = o.x || 0, oy = o.y || 0, gap = o.gap != null ? o.gap : 20;
    const A = o.atoms.map((a) => ({ e: a[0], x: ox + a[1] * s, y: oy + a[2] * s, hide: !!a[3] }));
    let out = `<g class="${o.cls || ''}">`;
    for (const b of o.bonds) {
      const a = A[b[0]], c = A[b[1]], order = b[2] || 1, dx = c.x - a.x, dy = c.y - a.y, L = Math.hypot(dx, dy) || 1;
      const ux = dx / L, uy = dy / L, sa = a.hide ? 0 : gap, sc = c.hide ? 0 : gap;
      const x1 = a.x + ux * sa, y1 = a.y + uy * sa, x2 = c.x - ux * sc, y2 = c.y - uy * sc, px = -uy * 6, py = ux * 6;
      const cls = 'ch-bond' + (b[3] === 'dash' ? ' dash' : '');
      if (order === 1) out += line(x1, y1, x2, y2, cls);
      else if (order === 2) out += line(x1 + px, y1 + py, x2 + px, y2 + py, cls) + line(x1 - px, y1 - py, x2 - px, y2 - py, cls);
      else out += line(x1, y1, x2, y2, cls) + line(x1 + 1.6 * px, y1 + 1.6 * py, x2 + 1.6 * px, y2 + 1.6 * py, cls) + line(x1 - 1.6 * px, y1 - 1.6 * py, x2 - 1.6 * px, y2 - 1.6 * py, cls);
    }
    for (const a of A) if (!a.hide) out += `<text class="ch-lab el-${a.e.replace(/[^A-Za-z]/g, '')}" x="${n2(a.x)}" y="${n2(a.y)}"${o.fs ? ` style="font-size:${o.fs}px"` : ''}>${a.e}</text>`;
    return out + '</g>';
  }

  function balls(o) {
    const s = o.s || 1, ox = o.x || 0, oy = o.y || 0;
    const A = o.atoms.map((a) => ({ e: a[0], x: ox + a[1] * s, y: oy + a[2] * s, r: (a[3] || R[a[0]] || 20) * (o.rs || 1) }));
    let out = `<g class="${o.cls || ''}">`;
    for (const b of o.bonds || []) out += line(A[b[0]].x, A[b[0]].y, A[b[1]].x, A[b[1]].y, 'ch-bond');
    for (const a of A) {
      out += `<circle class="ch-ball el-${a.e}" cx="${n2(a.x)}" cy="${n2(a.y)}" r="${n2(a.r)}"/>`;
      if (!o.noLab) out += `<text class="ch-ballt${light.has(a.e) ? ' on-light' : ''}" x="${n2(a.x)}" y="${n2(a.y)}" style="font-size:${n2(a.r * 0.95)}px">${a.e}</text>`;
    }
    return out + '</g>';
  }

  function bohr(x, y, o) {
    const p = o.p || 1, n = o.n || 0, e = o.e != null ? o.e : p, r0 = o.r || 40;
    let out = '<g>';
    const caps = [2, 8, 8, 18];
    let left = e, shell = 0;
    const shells = [];
    while (left > 0 && shell < caps.length) { const k = Math.min(caps[shell], left); shells.push(k); left -= k; shell++; }
    const rings = Math.max(shells.length, o.minShells || 1);
    for (let i = 0; i < rings; i++) out += `<circle class="f-thin" cx="${x}" cy="${y}" r="${r0 + 44 + i * 52}"/>`;
    shells.forEach((k, i) => {
      const rr = r0 + 44 + i * 52, outer = i === shells.length - 1;
      for (let j = 0; j < k; j++) {
        const a = -Math.PI / 2 + j * 2 * Math.PI / (i === 0 ? 2 : 8) + (i === 0 ? 0 : (j >= 4 ? 0 : 0));
        const ang = i === 0 ? -Math.PI / 2 + j * Math.PI : -Math.PI / 2 + Math.floor(j / 2) * Math.PI / 2 + (j % 2 ? 0.2 : -0.2);
        out += `<circle class="${outer ? 'k6' : 'k1'}" cx="${n2(x + rr * Math.cos(ang))}" cy="${n2(y + rr * Math.sin(ang))}" r="10"/>`;
      }
    });
    // nucleus: protons and neutrons packed in a small disc
    const tot = p + n, pts = [];
    for (let i = 0; i < tot; i++) { const a = i * 2.4, rad = Math.sqrt(i) * (r0 / Math.sqrt(Math.max(tot, 1))) * 0.9; pts.push([x + rad * Math.cos(a), y + rad * Math.sin(a)]); }
    const order = pts.map((q, i) => i).sort((a, b) => ((a * 7) % tot) - ((b * 7) % tot));
    pts.forEach((q, i) => { const isP = order.indexOf(i) < p; out += `<circle class="${isP ? 'k2' : 'f-board2'}" style="${isP ? '' : 'stroke:var(--muted);stroke-width:2'}" cx="${n2(q[0])}" cy="${n2(q[1])}" r="${Math.max(6, Math.min(11, r0 / Math.sqrt(Math.max(tot, 1)) * 0.9))}"/>`; });
    return out + '</g>';
  }

  function water(x, y, o) {
    o = o || {};
    const s = o.s || 1, a = (o.a || 0) * Math.PI / 180, half = 52.25 * Math.PI / 180, L = 46 * s;
    const h1 = [x + L * Math.sin(a - half), y + L * Math.cos(a - half)], h2 = [x + L * Math.sin(a + half), y + L * Math.cos(a + half)];
    let out = `<g class="${o.cls || ''}">` + line(x, y, h1[0], h1[1]) + line(x, y, h2[0], h2[1]);
    out += `<circle class="ch-ball el-O" cx="${n2(x)}" cy="${n2(y)}" r="${21 * s}"/><circle class="ch-ball el-H" cx="${n2(h1[0])}" cy="${n2(h1[1])}" r="${14 * s}"/><circle class="ch-ball el-H" cx="${n2(h2[0])}" cy="${n2(h2[1])}" r="${14 * s}"/>`;
    if (o.lab) out += `<text class="ch-ballt" x="${n2(x)}" y="${n2(y)}" style="font-size:${20 * s}px">O</text>`;
    if (o.d) {
      out += `<text class="ch-delta neg" x="${n2(x - 34 * s * Math.sin(a))}" y="${n2(y - 34 * s * Math.cos(a) + 8)}">δ−</text>`;
      out += `<text class="ch-delta pos" x="${n2(h1[0] + 22 * s * Math.sin(a - half))}" y="${n2(h1[1] + 22 * s * Math.cos(a - half) + 8)}">δ+</text>`;
      out += `<text class="ch-delta pos" x="${n2(h2[0] + 22 * s * Math.sin(a + half))}" y="${n2(h2[1] + 22 * s * Math.cos(a + half) + 8)}">δ+</text>`;
    }
    return out + '</g>';
  }

  function arrow(x1, y1, x2, y2, cls) {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 16;
    return `<g class="${cls || 'f-ink'}"><path d="M${n2(x1)} ${n2(y1)}L${n2(x2)} ${n2(y2)}"/><path d="M${n2(x2 - h * Math.cos(a - 0.45))} ${n2(y2 - h * Math.sin(a - 0.45))}L${n2(x2)} ${n2(y2)}L${n2(x2 - h * Math.cos(a + 0.45))} ${n2(y2 - h * Math.sin(a + 0.45))}"/></g>`;
  }

  /* a step wrapper: <g class="st" data-s="n"> */
  const st = (s, inner, u) => `<g class="st" data-s="${s}"${u != null ? ` data-u="${u}"` : ''}>${inner}</g>`;
  const svg = (w, h, inner) => `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
  const t = (x, y, s, cls) => `<text class="${cls || 'f-t'}" x="${x}" y="${y}">${s}</text>`;

  D.chem = { mol, balls, bohr, water, arrow, line, st, svg, t };
})();

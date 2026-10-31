/* Figures more than one lecture uses. Loaded by every deck before its own figs.js. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs = D.figs || {}, { svg, st, water, arrow, mol, balls } = D.chem;

  /* a tent and a house: prokaryote and eukaryote */
  F.tentHouse = () => svg(1400, 520,
    st(0, `<g transform="translate(330 260)"><rect class="k3s" x="-220" y="-90" width="440" height="180" rx="90"/><path class="f-ink2 k1l" style="stroke-width:4" d="M-120 0c30-50 60 50 90 0s60 50 90 0 60 50 90 0"/><text class="f-tb f-mid" y="160">Prokaryote</text><text class="f-t2 f-mid" y="205">one room: a tent</text></g>`) +
    st(1, `<g transform="translate(1030 260)"><rect class="k5s" x="-260" y="-150" width="520" height="300" rx="60"/><circle class="k1s" cx="-90" cy="-10" r="70"/><circle class="f-thin" cx="-90" cy="-10" r="20"/>` +
      `<rect class="k4s" x="40" y="-90" width="140" height="56" rx="28"/><rect class="k4s" x="70" y="30" width="120" height="50" rx="25"/><path class="f-ink2" d="M-30 100c40-20 80 20 120 0s80 20 120 0"/>` +
      `<text class="f-tb f-mid" y="200">Eukaryote</text><text class="f-t2 f-mid" y="245">rooms with walls: a house</text></g>`));

  /* salt: a dry crystal, then ions pulled apart by water */
  F.saltWater = () => {
    let crystal = '';
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const na = (i + j) % 2 === 0, x = 120 + i * 62, y = 170 + j * 62; crystal += `<circle class="ch-ball ${na ? 'el-Na' : 'el-Cl'}" cx="${x}" cy="${y}" r="${na ? 22 : 28}"/>`; }
    const shell = (cx, cy, ion) => {
      let o = `<circle class="ch-ball ${ion === 'Na' ? 'el-Na' : 'el-Cl'}" cx="${cx}" cy="${cy}" r="${ion === 'Na' ? 26 : 32}"/><text class="ch-ballt" x="${cx}" y="${cy}" style="font-size:22px">${ion === 'Na' ? 'Na⁺' : 'Cl⁻'}</text>`;
      for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3, r = 95, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); const face = ion === 'Na' ? (a * 180 / Math.PI) - 90 : (a * 180 / Math.PI) + 90; o += water(x, y, { a: face, s: 0.62 }); }
      return o;
    };
    return svg(1440, 520,
      st(0, `${crystal}<text class="f-t2 f-mid" x="213" y="460">dry: strong</text>`) +
      st(1, arrow(450, 260, 580, 260) + shell(760, 200, 'Na') + shell(1060, 330, 'Cl') + `<text class="f-t2 f-mid" x="910" y="500">in water: each ion wrapped in waters</text>`));
  };

  /* water molecules held by hydrogen bonds */
  F.hbonds = () => {
    const c = [700, 260];
    const around = [[700, 110, 0], [850, 330, 120], [550, 330, 240], [880, 140, 60]];
    let o = water(c[0], c[1], { a: 180, s: 1.2, d: true });
    around.forEach(([x, y, a], i) => { o += st(i + 1, water(x, y, { a, s: 1 }) + `<path class="f-hb" d="M${(c[0] + x) / 2 + (i % 2 ? 10 : -10)} ${(c[1] + y) / 2}l${(x - c[0]) / 5} ${(y - c[1]) / 5}"/>`); });
    return svg(1400, 520, st(0, o));
  };

  /* glucose ring, alpha or beta at carbon 1 (Haworth, simplified) */
  F.glucose = (o) => {
    const x = o.x || 300, y = o.y || 220, s = o.s || 1, beta = !!o.beta;
    const P = [[-110, -10], [-50, 40], [50, 40], [110, -10], [60, -60], [-60, -60]].map(([a, b]) => [x + a * s, y + b * s]);
    let g = `<path class="f-ink" style="stroke-width:5" d="M${P.map((p) => p.join(' ')).join('L')}Z"/>`;
    g += `<text class="ch-lab el-O" x="${P[4][0] + 18 * s}" y="${P[4][1] - 4 * s}" style="font-size:${30 * s}px">O</text>`;
    const tag = (p, up, txt, cls) => `<path class="ch-bond" d="M${p[0]} ${p[1]}v${up ? -50 * s : 50 * s}"/><text class="ch-lab ${cls || ''}" x="${p[0]}" y="${p[1] + (up ? -72 : 72) * s}" style="font-size:${26 * s}px">${txt}</text>`;
    g += tag(P[0], beta, 'OH', 'el-O') + tag(P[0], !beta, 'H') + tag(P[1], false, 'OH', 'el-O') + tag(P[2], true, 'OH', 'el-O') + tag(P[3], false, 'OH', 'el-O') + tag(P[5], true, 'CH₂OH');
    g += `<text class="f-tm" x="${P[0][0] - 46 * s}" y="${P[0][1] + 8}">1</text><text class="f-tm" x="${P[3][0] + 18 * s}" y="${P[3][1] + 8}">4</text>`;
    return g;
  };

  /* a phospholipid: head and two tails (one kinked) */
  F.lipidGlyph = (x, y, s, flip, kink) => {
    const d = flip ? -1 : 1;
    return `<g transform="translate(${x} ${y}) scale(${s} ${s * d})"><circle class="k1s" cx="0" cy="0" r="16"/>` +
      `<path class="f-ink2 lip" style="fill:none;stroke:var(--lipid);stroke-width:5" d="M-6 16v56"/><path style="fill:none;stroke:var(--lipid);stroke-width:5" d="M6 16v24${kink ? 'l10 14v18' : 'v32'}"/></g>`;
  };
})();

/* Figures more than one lecture uses. Loaded by every deck before its own figs.js. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs = D.figs || {}, { svg, st, water, arrow, mol, balls } = D.chem;
  const txt = (x, y, s, cls, style) => `<text class="${cls || 'f-t'}" x="${x}" y="${y}"${style ? ` style="${style}"` : ''}>${s}</text>`;

  /* a tent and a house: prokaryote and eukaryote */
  F.tentHouse = () => svg(1400, 520,
    st(0, `<g transform="translate(330 260)"><rect class="k3s" x="-220" y="-90" width="440" height="180" rx="90"/><path class="f-ink2 k1l" style="stroke-width:4" d="M-120 0c30-50 60 50 90 0s60 50 90 0 60 50 90 0"/><text class="f-tb f-mid" y="160">Prokaryote</text><text class="f-t2 f-mid" y="205">one room: a tent</text></g>`) +
    st(1, `<g transform="translate(1030 260)"><rect class="k5s" x="-260" y="-150" width="520" height="300" rx="60"/><circle class="k1s" cx="-90" cy="-10" r="70"/><circle class="f-thin" cx="-90" cy="-10" r="20"/>` +
      `<rect class="k4s" x="40" y="-90" width="140" height="56" rx="28"/><rect class="k4s" x="70" y="30" width="120" height="50" rx="25"/><path class="f-ink2" d="M-30 100c40-20 80 20 120 0s80 20 120 0"/>` +
      `<text class="f-tb f-mid" y="200">Eukaryote</text><text class="f-t2 f-mid" y="245">rooms with walls: a house</text></g>`));

  /* salt: a dry crystal, then ions pulled apart by water. opts.dry, opts.wet: the two captions */
  F.saltWater = (o) => {
    o = o || {};
    let crystal = '';
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const na = (i + j) % 2 === 0, x = 120 + i * 62, y = 170 + j * 62; crystal += `<circle class="ch-ball ${na ? 'el-Na' : 'el-Cl'}" cx="${x}" cy="${y}" r="${na ? 22 : 28}"/>`; }
    const shell = (cx, cy, ion) => {
      let o = `<circle class="ch-ball ${ion === 'Na' ? 'el-Na' : 'el-Cl'}" cx="${cx}" cy="${cy}" r="${ion === 'Na' ? 26 : 32}"/><text class="ch-ballt" x="${cx}" y="${cy}" style="font-size:22px">${ion === 'Na' ? 'Na⁺' : 'Cl⁻'}</text>`;
      for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3, r = 95, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); const face = ion === 'Na' ? (a * 180 / Math.PI) - 90 : (a * 180 / Math.PI) + 90; o += water(x, y, { a: face, s: 0.62 }); }
      return o;
    };
    return svg(1440, 520,
      st(0, `${crystal}<text class="f-t2 f-mid" x="213" y="460">${o.dry || 'dry: strong'}</text>`) +
      st(1, arrow(450, 260, 580, 260) + shell(760, 200, 'Na') + shell(1060, 330, 'Cl') + `<text class="f-t2 f-mid" x="910" y="500">${o.wet || 'in water: each ion wrapped in waters'}</text>`));
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
  /* lectures 2 and 4: a protein chain bent by two hydrogen bonds and locked by a disulfide bridge */
  F.fold = () => {
    const top = [], bot = [];
    for (let i = 0; i < 9; i++) { top.push([200 + i * 100, 160]); bot.push([1000 - i * 100, 380]); }
    const turn = [[1080, 200], [1110, 270], [1080, 340]], pts = top.concat(turn, bot);
    const path = 'M' + pts.map((p) => p.join(' ')).join('L');
    return svg(1400, 520,
      `<path class="f-ink2" style="stroke-width:4" d="${path}"/>` + pts.map(([x, y]) => `<circle class="k3s" cx="${x}" cy="${y}" r="22"/>`).join('') +
      `<path class="f-hb" d="M300 184V356M500 184V356"/>` + txt(400, 275, 'hydrogen bonds', 'f-t2 f-mid') +
      `<circle class="k6" cx="800" cy="160" r="22"/><circle class="k6" cx="800" cy="380" r="22"/>` + txt(800, 168, 'S', 'f-tb f-mid', 'font-size:24px') + txt(800, 388, 'S', 'f-tb f-mid', 'font-size:24px') +
      `<path class="f-ink k6l" style="stroke-width:6" d="M800 184V356"/>` + txt(822, 262, 'disulfide bridge', 'f-t2') + txt(822, 292, '(covalent)', 'f-t2') +
      txt(200, 110, 'a protein: a string of amino acids', 'f-t2'));
  };

  /* lectures 3 and 4: the functional groups, one per step */
  F.groups = () => {
    const G = [
      ['Hydroxyl', 'polar; alcohols (cholesterol has one)', { atoms: [['R', 0, 0], ['O', 80, 0], ['H', 150, 0]], bonds: [[0, 1], [1, 2]] }],
      ['Carbonyl', 'aldehyde at an end, ketone in the middle', { atoms: [['R', 0, 0], ['C', 80, 0], ['O', 80, -70], ['H', 160, 0]], bonds: [[0, 1], [1, 2, 2], [1, 3]] }],
      ['Carboxyl', 'organic acids', { atoms: [['R', 0, 0], ['C', 80, 0], ['O', 80, -70], ['O', 160, 0], ['H', 230, 0]], bonds: [[0, 1], [1, 2, 2], [1, 3], [3, 4]] }],
      ['Amino', 'amines', { atoms: [['R', 0, 0], ['N', 80, 0], ['H', 140, -50], ['H', 140, 50]], bonds: [[0, 1], [1, 2], [1, 3]] }],
      ['Phosphate', 'phosphate esters, as in ATP', { atoms: [['R', 0, 0], ['O', 75, 0], ['P', 150, 0], ['O', 150, -62], ['O⁻', 150, 58], ['O⁻', 225, 0]], bonds: [[0, 1], [1, 2], [2, 3, 2], [2, 4], [2, 5]] }],
      ['Sulfhydryl', 'thiols: stabilize proteins', { atoms: [['R', 0, 0], ['S', 80, 0], ['H', 150, 0]], bonds: [[0, 1], [1, 2]] }]
    ];
    return svg(1500, 640, txt(40, 30, 'R: the rest of the molecule', 'f-t2') + G.map(([n, what, m], i) => {
      const x = 40 + (i % 3) * 490, y = 60 + Math.floor(i / 3) * 290;
      return st(i, `<rect class="f-card" x="${x}" y="${y}" width="450" height="260" rx="20"/><text class="f-tb" x="${x + 24}" y="${y + 50}">${n}</text><text class="f-t2" x="${x + 24}" y="${y + 240}">${what}</text>` + mol(Object.assign({ x: x + 110, y: y + 145, fs: 32 }, m)));
    }).join(''));
  };

})();

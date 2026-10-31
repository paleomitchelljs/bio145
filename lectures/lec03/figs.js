/* Lecture 3 figures, the pH scale and the blood buffer (after homework 3). Each figure is what JM draws or describes;
 * the words on a figure are labels, not his sentences. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, mol, balls, water, arrow } = D.chem;
  const txt = (x, y, s, cls, style) => `<text class="${cls || 'f-t'}" x="${x}" y="${y}"${style ? ` style="${style}"` : ''}>${s}</text>`;

  /* the middle of the water is pulled every way; the surface has nothing above it */
  F.surface = () => {
    const ring = (cx, cy, angs) => angs.map((a) => { const r = a * Math.PI / 180, x = cx + 125 * Math.cos(r), y = cy + 125 * Math.sin(r); return water(x, y, { a: (a + 90) % 360, s: 0.62 }) + `<path class="f-hb" d="M${(cx + 40 * Math.cos(r)).toFixed(1)} ${(cy + 40 * Math.sin(r)).toFixed(1)}L${(cx + 88 * Math.cos(r)).toFixed(1)} ${(cy + 88 * Math.sin(r)).toFixed(1)}"/>`; }).join('');
    return svg(960, 620,
      `<rect class="wat" style="stroke:none" x="20" y="170" width="920" height="400"/><path style="stroke:var(--water);stroke-width:4" d="M20 170H940"/>` + txt(40, 150, 'air', 'f-t2') +
      st(0, water(260, 420, { a: 0, s: 0.75 }) + ring(260, 420, [0, 60, 120, 180, 240, 300]) + txt(260, 605, 'in the middle: pulled every way', 'f-t2 f-mid')) +
      st(1, water(700, 230, { a: 0, s: 0.75 }) + ring(700, 230, [0, 60, 120, 180]) + txt(700, 605, 'at the surface: nothing above', 'f-t2 f-mid')));
  };

  /* temperature is how fast the molecules move */
  F.speed = () => {
    const P = [[60, 70, 20], [180, 50, 160], [120, 150, 250], [230, 170, 60], [70, 250, 300], [200, 260, 200], [140, 330, 110], [250, 340, 30]];
    const box = (x, len, label) => `<rect class="f-card" x="${x}" y="80" width="320" height="320" rx="16"/>` + txt(x + 160, 60, label, 'f-tb f-mid') +
      P.map(([px, py, a]) => { const r = a * Math.PI / 180, cx = x + px + 20, cy = 110 + py * 0.8; return `<path class="f-thin" style="stroke-width:4" d="M${cx} ${cy}l${(-len * Math.cos(r)).toFixed(1)} ${(-len * Math.sin(r)).toFixed(1)}"/><circle class="k1" cx="${cx}" cy="${cy}" r="12"/>`; }).join('');
    return svg(1400, 520,
      st(0, box(260, 18, '50 °F') + box(820, 60, '70 °F')) +
      st(1, txt(700, 480, 'temperature: how fast the molecules move', 'f-t f-mid')));
  };

  /* a three-year-old alone gets knocked over; linked arms soak up the push */
  F.kids = () => {
    const kid = (x, y, tilt) => `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(1.4)" class="f-ink k5l" style="stroke-width:5"><circle cx="0" cy="-118" r="22" style="fill:var(--k5-soft)"/><path d="M0-96v62M0-34l-20 34M0-34l20 34M0-80l-26 22M0-80l26 22"/></g>`;
    const push = (x, y) => `<g class="f-ink k2l" style="stroke-width:6">${arrow(x - 110, y, x - 20, y, 'f-ink k2l')}</g>` + txt(x - 70, y - 20, 'push', 'f-t2 f-mid', 'fill:var(--k2)');
    let row = '';
    for (let i = 0; i < 5; i++) row += kid(820 + i * 130, 440, 0) + (i < 4 ? `<path class="f-hb" style="stroke-width:5" d="M${856 + i * 130} 359h58"/>` : '');
    return svg(1480, 560,
      kid(330, 440, 28) + push(290, 330) + txt(300, 520, 'alone: over he goes', 'f-t f-mid') +
      row + push(790, 330) + txt(1080, 520, 'arms linked: the push gets soaked up', 'f-t f-mid') + txt(1080, 200, 'weak links: hydrogen bonds', 'f-t2 f-mid', 'fill:var(--accent-ink)'));
  };

  /* the same sun on metal and on water: water warms slowly */
  F.heatCurve = () => svg(1400, 520,
    `<path class="f-ink2" d="M160 60V440H1300"/>` + txt(170, 60, 'temperature', 'f-t2') + txt(1300, 480, 'time in the sun', 'f-t2 f-end') +
    `<path class="f-ink k2l" style="stroke-width:6" d="M160 420C400 300 600 140 1200 100"/>` + txt(1220, 108, 'metal', 'f-tb', 'fill:var(--k2)') +
    `<path class="f-ink k1l" style="stroke-width:6" d="M160 420C500 400 900 360 1200 330"/>` + txt(1220, 338, 'water', 'f-tb', 'fill:var(--k1)'));

  /* ice floats and insulates the river; if it sank, the river would freeze from the bottom up */
  F.river = () => {
    const fish = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse class="k4" cx="0" cy="0" rx="34" ry="15"/><path class="k4" d="M30 0l26-16v32z"/><circle cx="-18" cy="-4" r="3.5" style="fill:var(--board)"/></g>`;
    const bed = (x) => `<path class="k6s" d="M${x} 120h40v340h520v-340h40v400h-600z"/>`;
    return svg(1480, 600,
      st(0, txt(340, 70, 'ice floats', 'f-tb f-mid') + bed(40) + `<rect class="wat" style="stroke:none" x="80" y="190" width="520" height="270"/>` +
        `<rect class="f-card" x="80" y="150" width="520" height="40" style="stroke:var(--k1);stroke-width:3"/>` + txt(340, 178, 'ice', 'f-t2 f-mid') + fish(250, 300, 1) + fish(430, 380, 0.8)) +
      st(2, txt(340, 445, 'the densest water, 4 °C, at the bottom', 'f-t2 f-mid')) +
      st(1, txt(1140, 70, 'if ice sank', 'f-tb f-mid') + bed(840) + `<rect class="f-card" x="880" y="250" width="520" height="210" style="stroke:var(--k1);stroke-width:3"/>` +
        `<rect class="wat" style="stroke:none" x="880" y="150" width="520" height="100"/>` + txt(1140, 370, 'ice, building up from the bottom', 'f-t2 f-mid') + fish(1100, 200, 0.8) +
        arrow(1170, 240, 1170, 175, 'f-ink k2l') + txt(1140, 570, 'the fish get pushed up', 'f-t f-mid')));
  };

  /* steam, liquid, ice: ice holds its molecules farther apart than liquid does */
  F.states = () => {
    let gas = '', liq = '', ice = '';
    [[60, 120, 20], [300, 90, 140], [180, 280, 250], [340, 330, 60], [90, 420, 200]].forEach(([x, y, a]) => { gas += water(40 + x, y, { a, s: 0.7 }); });
    [[60, 100, 20], [160, 80, 140], [270, 110, 250], [370, 90, 60], [90, 200, 200], [200, 190, 300], [310, 210, 110], [110, 300, 30], [230, 290, 180], [350, 300, 240], [60, 400, 90], [170, 390, 330], [290, 400, 150], [390, 380, 270]].forEach(([x, y, a]) => { liq += water(520 + x, y, { a, s: 0.7 }); });
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const x = 1060 + c * 140 + (r % 2) * 70, y = 120 + r * 150; ice += water(x, y, { a: (r + c) % 2 ? 0 : 180, s: 0.7 }) + (c < 2 ? `<path class="f-hb" d="M${x + 30} ${y}h80"/>` : ''); }
    return svg(1480, 560,
      gas + txt(250, 520, 'steam: far apart', 'f-t f-mid') + liq + txt(760, 520, 'liquid: packed close', 'f-t f-mid') + ice + txt(1240, 520, 'ice: a lattice, more room', 'f-t f-mid') +
      `<path class="f-thin" d="M490 60V480M990 60V480"/>`);
  };

  /* a hydrogen atom is a proton and an electron; H+ is just the proton */
  F.hplus = () => svg(1300, 420,
    `<circle class="f-thin" cx="300" cy="190" r="110"/><circle class="k2" cx="300" cy="190" r="26"/><circle class="k1" cx="410" cy="190" r="12"/>` + txt(300, 360, 'hydrogen: one proton, one electron', 'f-t f-mid') +
    arrow(520, 190, 700, 190) + `<circle class="k2" cx="950" cy="190" r="26"/>` + txt(950, 360, 'H⁺: just the proton', 'f-t f-mid'));

  /* an acid and a base make water and salt */
  F.neutralize = () => {
    const hcl = balls({ atoms: [['H', -30, 0, 18], ['Cl', 26, 0, 32]], bonds: [[0, 1]], x: 210, y: 220 });
    const naoh = balls({ atoms: [['Na', -40, 0, 30], ['O', 18, 0, 24], ['H', 56, 0, 16]], bonds: [[1, 2]], x: 560, y: 220 });
    const h2o = water(930, 210, { a: 0, s: 1.1 }), nacl = balls({ atoms: [['Na', -34, 0, 30], ['Cl', 34, 0, 32]], bonds: [], x: 1240, y: 220 });
    const plus = (x) => txt(x, 234, '+', 'f-tb f-mid', 'font-size:48px');
    return svg(1480, 440,
      hcl + plus(380) + naoh + arrow(700, 220, 820, 220) + h2o + plus(1080) + nacl +
      txt(210, 330, 'HCl: an acid', 'f-t f-mid') + txt(210, 370, 'gives up H⁺', 'f-t2 f-mid') + txt(560, 330, 'NaOH: a base', 'f-t f-mid') + txt(560, 370, 'takes H⁺', 'f-t2 f-mid') +
      txt(930, 330, 'H₂O', 'f-t f-mid') + txt(1240, 330, 'NaCl: salt', 'f-t f-mid'));
  };

  /* the homeostasis dial: too low, the right dose, too much */
  F.dial = () => {
    const cx = 700, cy = 470, r = 320, P = (a) => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)].map((v) => v.toFixed(1));
    const arc = (a1, a2, col) => `<path style="fill:none;stroke:${col};stroke-width:46" d="M${P(a1).join(' ')}A${r} ${r} 0 0 1 ${P(a2).join(' ')}"/>`;
    const needle = (a, label) => { const [x, y] = [cx + 280 * Math.cos(a * Math.PI / 180), cy - 280 * Math.sin(a * Math.PI / 180)]; return `<path class="f-ink" style="stroke-width:10" d="M${cx} ${cy}L${x.toFixed(1)} ${y.toFixed(1)}"/><circle class="f-acc" cx="${cx}" cy="${cy}" r="22"/>` + (label ? txt(cx, cy + 80, label, 'f-tb f-mid') : ''); };
    return svg(1400, 580,
      arc(180, 128, 'var(--k2-soft)') + arc(128, 52, 'var(--k3-soft)') + arc(52, 0, 'var(--k2-soft)') +
      txt(cx, 110, 'homeostasis', 'f-t f-mid', 'fill:var(--k3)') + txt(250, 300, 'too low', 'f-t f-mid', 'fill:var(--k2)') + txt(1150, 300, 'too much', 'f-t f-mid', 'fill:var(--k2)') +
      st(0, needle(160, ''), 1) + st(1, needle(90, 'the right dose'), 2) + st(2, needle(22, 'a bigger dose')));
  };

  /* water splits itself, a little, and always evenly */
  F.waterSplit = () => {
    const w = (x) => water(x, 200, { a: 0, s: 1 });
    const h3o = balls({ atoms: [['O', 0, 0], ['H', -40, 30, 14], ['H', 40, 30, 14], ['H', 0, -46, 14]], bonds: [[0, 1], [0, 2], [0, 3]], x: 900, y: 205 });
    const oh = balls({ atoms: [['O', 0, 0], ['H', 46, 0, 14]], bonds: [[0, 1]], x: 1200, y: 205 });
    return svg(1480, 420,
      w(220) + txt(320, 214, '+', 'f-tb f-mid', 'font-size:48px') + w(420) +
      `<path class="f-ink" d="M600 190h130l-16-12M730 222H600l16 12"/>` +
      h3o + txt(1040, 214, '+', 'f-tb f-mid', 'font-size:48px') + oh +
      txt(320, 320, 'two waters', 'f-t f-mid') + txt(900, 320, 'H₃O⁺', 'f-t f-mid') + txt(1210, 320, 'OH⁻', 'f-t f-mid') +
      txt(1050, 380, 'in pure water: always equal numbers', 'f-t2 f-mid'));
  };

  /* what to look at in an organic molecule */
  F.lookFor = () => {
    const m = mol({ atoms: [['O', -100, 30], ['C', 0, 0], ['C', 100, -50], ['C', 200, 0], ['C', 300, -50], ['N', 400, 0]], bonds: [[0, 1], [1, 2], [2, 3, 2], [3, 4], [4, 5]], x: 540, y: 300, fs: 40 });
    return svg(1480, 560,
      st(0, m + txt(40, 70, 'carbon backbones: C, H, O, N, now and then S and P', 'f-t2')) +
      st(1, `<circle class="f-hb" style="stroke-dasharray:4 6" cx="440" cy="330" r="40"/><circle class="f-hb" style="stroke-dasharray:4 6" cx="940" cy="300" r="40"/>` + txt(690, 450, 'where the O and N are', 'f-t f-mid') +
        `<path class="f-ink2" d="M440 372L620 420M940 342L760 420"/>` +
        txt(690, 180, 'double bonds', 'f-t f-mid') + `<path class="f-ink2" d="M690 190v40"/>` +
        `<path class="f-ink2" d="M520 520h420"/>` + txt(730, 550, 'the shape the carbons make', 'f-t f-mid')));
  };

  /* methane, four ways; then the line to write down */
  F.represent = () => {
    const col = (x, h) => txt(x, 70, h, 'f-t2 f-mid');
    return svg(1480, 560,
      st(0, col(190, 'molecular formula') + txt(190, 260, 'CH₄', 'f-tb f-mid', 'font-size:72px')) +
      st(1, col(550, 'structural formula') + mol({ atoms: [['C', 0, 0], ['H', 0, -80], ['H', 80, 0], ['H', 0, 80], ['H', -80, 0]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], x: 550, y: 240, fs: 40 })) +
      st(2, col(910, 'ball and stick') + balls({ atoms: [['C', 0, 0], ['H', 0, -90], ['H', 84, 30], ['H', -84, 30], ['H', 10, 80]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], x: 910, y: 240, rs: 1.4 })) +
      st(3, col(1270, 'space-filling') + balls({ atoms: [['H', 0, -55, 34], ['H', 52, 22, 34], ['H', -52, 22, 34], ['C', 0, 0, 52], ['H', 8, 50, 34]], bonds: [], x: 1270, y: 240, noLab: true })) +
      st(4, `<rect class="f-accsoft" x="180" y="430" width="1120" height="90" rx="18"/>` + txt(740, 488, 'The shape of a molecule is very important.', 'f-tb f-mid')));
  };

  /* count the bonds: methane, ethane, ethene */
  F.count = () => {
    const name = (x, a, v, b) => `<text class="f-tb f-mid" x="${x}" y="470">${a}<tspan style="fill:var(--accent-ink)">${v}</tspan>${b}</text>`;
    return svg(1480, 560,
      st(0, mol({ atoms: [['C', 0, 0], ['H', 0, -80], ['H', 80, 0], ['H', 0, 80], ['H', -80, 0]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], x: 240, y: 250, fs: 38 }) + name(240, 'meth', 'a', 'ne') + txt(240, 515, 'CH₄', 'f-t2 f-mid')) +
      st(1, mol({ atoms: [['C', 0, 0], ['C', 100, 0], ['H', 0, -80], ['H', 0, 80], ['H', -80, 0], ['H', 100, -80], ['H', 100, 80], ['H', 180, 0]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 7]], x: 690, y: 250, fs: 38 }) + name(740, 'eth', 'a', 'ne') + txt(740, 515, 'C₂H₆: three H on each C', 'f-t2 f-mid')) +
      st(2, mol({ atoms: [['C', 0, 0], ['C', 110, 0], ['H', -60, -60], ['H', -60, 60], ['H', 170, -60], ['H', 170, 60]], bonds: [[0, 1, 2], [0, 2], [0, 3], [1, 4], [1, 5]], x: 1180, y: 250, fs: 38 }) + name(1235, 'eth', 'e', 'ne') + txt(1235, 515, 'C₂H₄: a double bond, two H on each C', 'f-t2 f-mid')));
  };

  /* the same carbons, varied: length, branching, where the double bond sits, rings (hydrogens not drawn) */
  F.skeletons = () => {
    const chain = (x, y, n, dbl) => mol({ atoms: Array.from({ length: n }, (_, i) => ['C', i * 80, 0]), bonds: Array.from({ length: n - 1 }, (_, i) => [i, i + 1, dbl === i ? 2 : 1]), x, y, fs: 32 });
    const hex = (cx, cy, dbl) => { const p = Array.from({ length: 6 }, (_, k) => [cx + 70 * Math.cos((k * 60 - 90) * Math.PI / 180), cy + 70 * Math.sin((k * 60 - 90) * Math.PI / 180)]);
      return `<path class="ch-bond" style="fill:none" d="M${p.map((q) => q.map((v) => v.toFixed(1)).join(' ')).join('L')}Z"/>` + (dbl ? [0, 2, 4].map((k) => { const a = p[k], b = p[(k + 1) % 6], ix = cx + (a[0] + b[0] - 2 * cx) * 0.38, iy = cy + (a[1] + b[1] - 2 * cy) * 0.38, dx = (b[0] - a[0]) * 0.3, dy = (b[1] - a[1]) * 0.3; return `<path class="ch-bond" d="M${(ix - dx).toFixed(1)} ${(iy - dy).toFixed(1)}L${(ix + dx).toFixed(1)} ${(iy + dy).toFixed(1)}"/>`; }).join('') : ''); };
    return svg(1480, 660,
      `<path class="f-thin" d="M740 40V620M40 330H1440"/>` +
      st(0, txt(60, 70, 'length', 'f-tb') + chain(90, 140, 2) + txt(220, 145, 'ethane', 'f-t2') + chain(90, 210, 3) + txt(300, 215, 'propane', 'f-t2') + chain(90, 280, 7) + txt(600, 285, '…', 'f-tb')) +
      st(1, txt(780, 70, 'branching', 'f-tb') + chain(800, 170, 4) + txt(860, 225, 'butane, C₄H₁₀', 'f-t2') +
        mol({ atoms: [['C', 0, 0], ['C', 80, 0], ['C', 160, 0], ['C', 80, -70]], bonds: [[0, 1], [1, 2], [1, 3]], x: 1180, y: 200, fs: 32 }) + txt(1180, 280, 'isobutane, C₄H₁₀', 'f-t2')) +
      st(2, txt(60, 370, 'where the double bond is', 'f-tb') + chain(90, 450, 4, 0) + txt(380, 455, '1-butene', 'f-t2') + chain(90, 540, 4, 1) + txt(380, 545, '2-butene', 'f-t2')) +
      st(3, txt(90, 610, '"3-butene" is just 1-butene, flipped', 'f-t2', 'fill:var(--accent-ink)')) +
      st(4, txt(780, 370, 'rings', 'f-tb') + hex(930, 480, false) + txt(930, 600, 'cyclohexane', 'f-t2 f-mid') + hex(1230, 480, true) + txt(1230, 600, 'benzene', 'f-t2 f-mid')) +
      txt(1440, 650, 'hydrogens not drawn', 'f-tm f-end'));
  };

  /* same atoms, different layout: structural isomers; same bonds, flipped across a double bond: geometric isomers */
  F.isomers = () => {
    const ethanol = mol({ atoms: [['C', 0, 0], ['C', 90, 0], ['O', 180, 0], ['H', 260, 0], ['H', 0, -70], ['H', 0, 70], ['H', -75, 0], ['H', 90, -70], ['H', 90, 70]], bonds: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8]], x: 170, y: 160, fs: 32 });
    const ether = mol({ atoms: [['C', 0, 0], ['O', 90, 0], ['C', 180, 0], ['H', 0, -70], ['H', 0, 70], ['H', -75, 0], ['H', 180, -70], ['H', 180, 70], ['H', 255, 0]], bonds: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5], [2, 6], [2, 7], [2, 8]], x: 900, y: 160, fs: 32 });
    const butene = (x, cis) => mol({ atoms: [['C', 0, 0], ['C', 90, 0], ['CH₃', -60, -60], cis ? ['CH₃', 150, -60] : ['H', 140, -60], ['H', -50, 60], cis ? ['H', 140, 60] : ['CH₃', 150, 60]], bonds: [[0, 1, 2], [0, 2], [1, 3], [0, 4], [1, 5]], x, y: 450, fs: 30 });
    return svg(1480, 600,
      st(0, txt(40, 50, 'structural isomers', 'f-tb') + ethanol + txt(250, 275, 'ethanol: OH on the end', 'f-t f-mid') + ether + txt(990, 275, 'dimethyl ether: O in the middle, no OH', 'f-t f-mid') +
        txt(1440, 60, 'both C₂H₆O', 'f-t2 f-end') + `<path class="f-thin" d="M40 315H1440"/>`) +
      st(1, txt(40, 355, 'geometric isomers', 'f-tb') + butene(300, true) + txt(345, 570, 'cis: the CH₃ groups on the same side', 'f-t f-mid') + butene(1000, false) + txt(1045, 570, 'trans: across', 'f-t f-mid')));
  };

  /* handedness: hands, then spirals */
  const hand = (x, y, flip, cls) => `<g transform="translate(${x} ${y}) scale(${flip ? -1.6 : 1.6} 1.6)"><path class="${cls}" d="M-70 60v-70q0-30 20-30v-40q0-14 12-14t12 14v-20q0-14 12-14t12 14v12q0-14 12-14t12 14v14q0-14 12-14t12 14v80q0 60-60 60z"/></g>`;
  F.hands = () => {
    const spiral = (cx, cy, dir) => { let d = ''; for (let t = 0; t <= 6 * Math.PI; t += 0.15) { const r = 8 + 9 * t, a = dir * t; d += (d ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1); } return `<path class="f-ink k4l" style="stroke-width:6" d="${d}"/>`; };
    return svg(1480, 600,
      st(0, hand(250, 300, false, 'k4s') + hand(560, 300, true, 'k5s') + `<path class="f-dash" d="M405 120v360"/>` + txt(405, 540, 'chiral: handedness', 'f-tb f-mid') + txt(405, 585, 'mirror images that don\'t stack', 'f-t2 f-mid')) +
      st(1, spiral(970, 300, 1) + spiral(1290, 300, -1) + `<path class="f-dash" d="M1130 120v360"/>` + txt(1130, 560, 'spirals and snail shells too', 'f-t f-mid')));
  };

  /* linalool and its mirror image smell different, because each fits a different receptor */
  F.linalool = () => {
    const m = (x, flip) => { const f = flip ? -1 : 1; return `<g transform="translate(${x} 200) scale(${f} 1)">` +
      `<path class="ch-bond" d="M0 0L-90 -60M0 0L95 -50M0 0L-20 100M0 0L80 70"/><circle class="k6" cx="0" cy="0" r="12"/></g>` +
      txt(x - 110 * f, 130, 'OH', 'ch-lab el-O', 'font-size:30px') + txt(x + 125 * f, 140, 'CH₃', 'ch-lab', 'font-size:28px') +
      txt(x - 22 * f, 330, 'the chain', 'f-t2 f-mid') + txt(x + 150 * f, 285, 'CH=CH₂', 'ch-lab', 'font-size:26px'); };
    const key = (x, y, flip, cls) => `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><path class="${cls}" d="M-40 -30h50l30 30-30 30h-50z"/></g>`;
    const cup = (x, flip, cls) => `<g transform="translate(${x} 520) scale(${flip ? -1 : 1} 1)"><path class="${cls}" d="M-90 -60h40v30h40l30 30-30 30h-40v30h-40z" style="fill-opacity:0.35"/></g>`;
    return svg(1480, 640,
      st(0, m(380, false) + m(1100, true) + `<path class="f-dash" d="M740 90v300"/>` + txt(380, 400, 'smells like orange', 'f-tb f-mid', 'fill:var(--k4)') + txt(1100, 400, 'smells like lavender', 'f-tb f-mid', 'fill:var(--k5)')) +
      st(2, txt(740, 470, 'receptors in your nose', 'f-t2 f-mid') + cup(420, false, 'k4s') + cup(1060, true, 'k5s') + key(460, 520, false, 'k4') + key(1020, 520, true, 'k5') +
        txt(420, 620, 'the orange receptor', 'f-t2 f-mid') + txt(1060, 620, 'the lavender receptor', 'f-t2 f-mid')));
  };

  /* the functional groups, one per step */
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

  /* ---------------- the pH scale ---------------- */
  const THINGS = [[0, 'battery acid'], [2, 'lemon juice, stomach acid'], [5, 'black coffee'], [7, 'pure water'], [7.4, 'blood'], [8.3, 'baking soda'], [10, 'soapy water'], [12.5, 'bleach']];
  D.parts.phScale = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1500 330', width: 1500, height: 330 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [60, 360, 1400]);
    const s = () => D.get('ph-' + def.id, () => ({ ph: 7 }));
    const sl = D.slider(ctl, { label: 'pH', lo: 0, hi: 14, step: 0.1, value: s().ph, width: 700, fmt: (v) => v.toFixed(1), change: (v) => { s().ph = v; D.save(); paint(); } });
    const out = D.el('div', 'dm-read', ctl);
    function paint() {
      const ph = s().ph, X = (v) => 60 + v / 14 * 1380, h = Math.pow(10, -ph), times = h / 1e-7;
      let g = '<defs><linearGradient id="phg" x1="0" x2="1"><stop offset="0" style="stop-color:var(--k2)"/><stop offset="0.5" style="stop-color:var(--k3)"/><stop offset="1" style="stop-color:var(--k1)"/></linearGradient></defs>';
      g += `<rect x="60" y="150" width="1380" height="40" rx="20" fill="url(#phg)"/>`;
      for (let v = 0; v <= 14; v++) g += `<text class="f-tm f-mid" x="${X(v)}" y="225">${v}</text>`;
      THINGS.forEach(([v, n], i) => { g += `<path class="f-thin" d="M${X(v)} 145v${i % 2 ? -50 : -20}"/><text class="f-tm f-mid" x="${X(v)}" y="${i % 2 ? 85 : 115}">${n}</text>`; });
      g += `<path class="f-acc" d="M${X(ph)} 200l-18 40h36z"/><text class="f-tb f-mid" x="${X(ph)}" y="290">${ph.toFixed(1)}</text>`;
      pic.innerHTML = g;
      out.innerHTML = `[H⁺] = <b>10<sup>${(-ph).toFixed(1)}</sup></b> mol/L · ${ph < 6.95 ? 'acidic' : ph > 7.05 ? 'basic' : 'neutral'} · <b>${times >= 1 ? (times >= 100 ? Math.round(times).toLocaleString() : times.toPrecision(2)) + '×' : '1/' + (1 / times >= 100 ? Math.round(1 / times).toLocaleString() : (1 / times).toPrecision(2))}</b> the H⁺ of pure water`;
    }
    return { show() { sl.set(s().ph); paint(); }, reset() { sl.set(s().ph); paint(); } };
  };

  /* ---------------- the blood buffer: breathing and acid ---------------- */
  D.parts.buffer = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1500 300', width: 1500, height: 300 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [60, 330, 1400]);
    const s = () => D.get('buf-' + def.id, () => ({ co2: 40, acid: 0, buf: true }));
    const bufRow = D.el('div', 'dm-row', ctl), bOn = D.el('button', 'dm-btn', bufRow, 'Blood (buffered)'), bOff = D.el('button', 'dm-btn', bufRow, 'Plain water');
    bOn.onclick = () => { s().buf = true; D.save(); paint(); }; bOff.onclick = () => { s().buf = false; D.save(); paint(); };
    const a = D.slider(ctl, { label: 'Acid added', lo: 0, hi: 20, step: 0.5, value: s().acid, width: 520, fmt: (v) => v + ' mmol/L', change: (v) => { s().acid = v; D.save(); paint(); } });
    const c = D.slider(ctl, { label: 'CO₂ (breathing)', lo: 15, hi: 80, step: 1, value: s().co2, width: 520, fmt: (v) => v + ' mmHg', change: (v) => { s().co2 = v; D.save(); paint(); } });
    const out = D.el('div', 'dm-read', ctl);
    function paint() {
      const { co2, acid, buf } = s();
      const ph = buf ? 6.1 + Math.log10(Math.max(0.5, 24 - acid) / (0.03 * co2)) : (acid <= 0 ? 7 : Math.max(1, -Math.log10(acid / 1000 + 1e-7)));
      bOn.classList.toggle('on', buf); bOff.classList.toggle('on', !buf); c.row.style.opacity = buf ? 1 : 0.35;
      const X = (v) => 60 + v / 14 * 1380;
      pic.innerHTML = '<defs><linearGradient id="phb" x1="0" x2="1"><stop offset="0" style="stop-color:var(--k2)"/><stop offset="0.5" style="stop-color:var(--k3)"/><stop offset="1" style="stop-color:var(--k1)"/></linearGradient></defs>' +
        `<rect x="60" y="120" width="1380" height="40" rx="20" fill="url(#phb)"/><rect x="${X(7.35)}" y="104" width="${X(7.45) - X(7.35)}" height="72" style="fill:none;stroke:var(--outline);stroke-width:3"/>` +
        `<text class="f-tm f-mid" x="${X(7.4)}" y="90">healthy blood</text><path class="f-acc" d="M${X(ph)} 170l-18 40h36z"/><text class="f-tb f-mid" x="${X(ph)}" y="260">${ph.toFixed(2)}</text>` +
        `<text class="f-t2" x="60" y="40">CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻</text>`;
      out.innerHTML = buf ? (ph > 7.45 ? '<b>Alkalosis</b>: CO₂ blown off, pH up' : ph < 7.35 ? '<b>Acidosis</b>' : 'In range: the buffer soaks up the change') : 'No buffer: every proton stays free';
    }
    return { show() { a.set(s().acid); c.set(s().co2); paint(); }, reset() { a.set(s().acid); c.set(s().co2); paint(); } };
  };
})();

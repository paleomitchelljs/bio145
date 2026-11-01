/* Lecture 4 figures, joining monomers, and packing fat. Each figure is what JM draws or describes; the words on a
 * figure are labels, not his sentences. The functional groups and the protein fold come from shared/figs-common.js. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, mol, water, arrow } = D.chem;
  const txt = (x, y, s, cls, style) => `<text class="${cls || 'f-t'}" x="${x}" y="${y}"${style ? ` style="${style}"` : ''}>${s}</text>`;
  const hl = (s, col) => `<tspan style="fill:var(--${col || 'accent-ink'})">${s}</tspan>`;
  const hex = (x, y, r, cls) => `<polygon class="${cls}" points="${[0, 1, 2, 3, 4, 5].map((k) => [x + r * Math.cos((k * 60 + 30) * Math.PI / 180), y + r * Math.sin((k * 60 + 30) * Math.PI / 180)].map((v) => v.toFixed(1)).join(',')).join(' ')}"/>`;
  const link = (x1, x2, y) => `<path class="ch-bond" d="M${x1} ${y}H${x2}"/>`;

  /* a molecule's shape says when and where it reacts; the group on its end says what reaction */
  F.shapeGroup = () => {
    const pts = Array.from({ length: 11 }, (_, i) => [200 + i * 80, i % 2 ? 230 : 290]);
    return svg(1480, 520,
      st(0, `<path class="f-ink" style="stroke-width:6" d="M${pts.map((p) => p.join(' ')).join('L')}"/><path class="f-ink2" d="M200 170V150H1000V170"/>` + txt(600, 125, 'the shape: when and where it reacts', 'f-t f-mid')) +
      st(1, `<path class="ch-bond" d="M1000 290L1056 326"/>` + txt(1098, 346, 'OH', 'ch-lab el-O', 'font-size:44px') + `<circle class="f-hb" cx="1098" cy="346" r="58"/>` + txt(1098, 460, 'the group: what reaction', 'f-t f-mid')));
  };

  /* ATP: snap a phosphate off and energy comes out; put it back on and energy goes in */
  F.atp = () => {
    const P = (x) => `<circle class="k4s" cx="${x}" cy="210" r="34"/>` + txt(x, 221, 'P', 'f-tb f-mid');
    return svg(1480, 400,
      `<rect class="k5s" x="80" y="160" width="300" height="100" rx="20"/>` + txt(230, 222, 'adenosine', 'f-tb f-mid') + `<path class="ch-bond" d="M380 210H426M494 210H526"/>` + P(460) + P(560) +
      st(0, `<path class="ch-bond" d="M594 210H626"/>` + P(660) + txt(380, 340, 'ATP: three phosphates', 'f-t f-mid'), 1) +
      st(1, P(960) + arrow(690, 150, 900, 150, 'f-ink k4l') + txt(795, 128, 'snap one off: energy out', 'f-t2 f-mid', 'fill:var(--k4)') +
        arrow(900, 280, 690, 280, 'f-ink k1l') + txt(795, 320, 'snap it back on: energy in', 'f-t2 f-mid', 'fill:var(--k1)') + txt(380, 340, 'ADP: two', 'f-t f-mid')));
  };

  /* the words: lysis, lysosome, hydrolysis, dehydration */
  F.words = () => {
    const row = (y, word, gloss) => `<text class="f-tb" x="120" y="${y}" style="font-size:56px">${word}</text>` + txt(720, y - 8, gloss, 'f-t');
    return svg(1480, 480,
      st(0, row(110, hl('lysis'), 'break apart') + row(210, `${hl('lyso')}·some`, 'a break-apart body')) +
      st(1, row(340, `hydro·${hl('lysis')}`, 'water breaks it apart') + row(440, 'de·hydr·ation', 'water out')));
  };

  /* dehydration: an OH and an H leave as water, and the two open bonds join */
  F.zip = () => svg(1480, 560,
    st(0, hex(300, 240, 60, 'k6s') + `<path class="ch-bond" d="M352 240H412"/>` + txt(452, 240, 'OH', 'ch-lab el-O') +
      hex(780, 240, 60, 'k6s') + `<path class="ch-bond" d="M728 240H668"/>` + txt(626, 240, 'HO', 'ch-lab el-O'), 2) +
    st(1, `<circle class="f-hb" cx="452" cy="240" r="40"/><circle class="f-hb" cx="612" cy="240" r="24"/>` + arrow(470, 285, 520, 360, 'f-ink k1l') + arrow(605, 270, 565, 360, 'f-ink k1l'), 2) +
    st(1, water(545, 410, { a: 0, s: 1.1 }) + txt(545, 500, 'H₂O', 'f-t2 f-mid')) +
    st(2, hex(390, 240, 60, 'k6s') + `<path class="ch-bond" d="M442 240H508M552 240H618"/>` + txt(530, 240, 'O', 'ch-lab el-O') + hex(670, 240, 60, 'k6s') +
      txt(530, 110, 'one water out, one bond in', 'f-t f-mid')));

  /* the activity: methyl acetate and water become acetic acid and methanol */
  F.ester = () => svg(1480, 560,
    mol({ atoms: [['CH₃', 0, 0], ['C', 90, 0], ['O', 90, -70], ['O', 180, 0], ['CH₃', 270, 0]], bonds: [[0, 1], [1, 2, 2], [1, 3], [3, 4]], x: 90, y: 250, fs: 32 }) +
    txt(450, 262, '+', 'f-tb f-mid', 'font-size:48px') + mol({ atoms: [['O', 0, 0], ['H', -50, 40], ['H', 50, 40]], bonds: [[0, 1], [0, 2]], x: 560, y: 235, fs: 32 }) +
    arrow(660, 250, 780, 250) +
    mol({ atoms: [['CH₃', 0, 0], ['C', 90, 0], ['O', 90, -70], ['O', 180, 0], ['H', 250, 0]], bonds: [[0, 1], [1, 2, 2], [1, 3], [3, 4]], x: 830, y: 250, fs: 32 }) +
    txt(1140, 262, '+', 'f-tb f-mid', 'font-size:48px') + mol({ atoms: [['H', -60, 0], ['O', 0, 0], ['CH₃', 90, 0]], bonds: [[0, 1], [1, 2]], x: 1270, y: 250, fs: 32 }) +
    txt(740, 400, 'CH₃COOCH₃ + H₂O → CH₃COOH + CH₃OH', 'f-t f-mid') +
    st(1, `<circle class="f-hb" cx="315" cy="250" r="42"/>` + txt(740, 500, 'hydrolysis: water in, one molecule into two', 'f-tacc f-mid', 'font-size:34px')));

  /* four kinds of macromolecule: monomers strung into polymers (lipids the odd one) */
  F.macro = () => {
    const bead = (x, y, cls) => `<circle class="${cls}" cx="${x}" cy="${y}" r="20"/>`;
    const nuc = (x, y) => `<circle class="k4s" cx="${x}" cy="${y - 28}" r="12"/><polygon class="k6s" points="${x - 18},${y} ${x + 18},${y} ${x + 24},${y + 22} ${x},${y + 36} ${x - 24},${y + 22}"/><rect class="k5s" x="${x + 26}" y="${y + 6}" width="34" height="22" rx="4"/>`;
    const tails = (x, y) => `<rect class="k5s" x="${x}" y="${y - 40}" width="40" height="80" rx="10"/>` + [-28, 0, 28].map((d) => `<path style="fill:none;stroke:var(--lipid);stroke-width:7;stroke-linecap:round" d="M${x + 40} ${y + d}h120"/>`).join('');
    const name = (y, n, how) => txt(980, y + 4, n, 'f-tb') + txt(980, y + 40, how, 'f-t2');
    const CL = ['k1s', 'k2s', 'k3s', 'k5s'];
    return svg(1480, 680,
      txt(180, 40, 'monomer', 'f-t2 f-mid') + txt(680, 40, 'polymer', 'f-t2 f-mid') +
      st(0, hex(180, 120, 30, 'k6s') + arrow(260, 120, 400, 120) + [0, 1, 2, 3, 4].map((i) => (i ? link(460 + i * 100 - 70, 460 + i * 100 - 30, 120) : '') + hex(460 + i * 100, 120, 30, 'k6s')).join('') + name(120, 'carbohydrates', 'sugars, by glycosidic linkages')) +
      st(1, bead(180, 270, 'k3s') + arrow(260, 270, 400, 270) + `<path class="ch-bond" d="M460 270H880"/>` + Array.from({ length: 8 }, (_, i) => bead(460 + i * 60, 270, CL[i % 4])).join('') + name(270, 'proteins', 'amino acids, by peptide bonds')) +
      st(2, nuc(180, 410) + arrow(260, 420, 400, 420) + `<path class="ch-bond" d="M460 382H850"/>` + [0, 1, 2, 3].map((i) => nuc(460 + i * 130, 410)).join('') + name(420, 'nucleic acids', 'nucleotides: sugar, base, phosphate')) +
      st(3, tails(140, 580) + arrow(330, 580, 400, 580) + tails(460, 580) + name(580, 'lipids', 'glycerol plus fatty acids: not a long string')));
  };

  /* -ose; aldoses and ketoses; three, five, six carbons */
  F.oses = () => {
    const chain = (cx, top, n, keto) => mol({ atoms: Array.from({ length: n }, (_, i) => ['C', 0, i * 40]).concat([['O', 52, keto ? 40 : 0]]), bonds: Array.from({ length: n - 1 }, (_, i) => [i, i + 1]).concat([[keto ? 1 : 0, n, 2]]), x: cx, y: top, fs: 26, gap: 13 });
    const cols = [[520, 3, 'triose'], [860, 5, 'pentose'], [1200, 6, 'hexose']];
    const names = [['glyceraldehyde', 'ribose', 'glucose, galactose'], ['dihydroxyacetone', 'ribulose', 'fructose']];
    return svg(1480, 740,
      st(0, `<text class="f-tb" x="40" y="60" style="font-size:44px">gluc${hl('ose')}  fruct${hl('ose')}  rib${hl('ose')}  lact${hl('ose')}</text>` + txt(1440, 56, '-ose: a carbohydrate', 'f-t f-end')) +
      st(1, txt(40, 240, 'aldoses', 'f-tb') + txt(40, 278, 'C=O at the end', 'f-t2') + cols.map(([x, n], i) => chain(x, 160, n, false) + txt(x + 20, 430, names[0][i], 'f-t2 f-mid')).join('')) +
      st(2, txt(40, 540, 'ketoses', 'f-tb') + txt(40, 578, 'C=O in the middle', 'f-t2') + cols.map(([x, n], i) => chain(x, 470, n, true) + txt(x + 20, 735, names[1][i], 'f-t2 f-mid')).join('')) +
      st(3, cols.map(([x, n, w]) => txt(x + 20, 128, `${n} carbons: ${w}`, 'f-t f-mid', 'fill:var(--accent-ink)')).join('')));
  };

  /* the chain closes into a ring: carbon 5's oxygen bonds to carbon 1; numbered 1 to 6 */
  F.ringClose = () => {
    const C = Array.from({ length: 6 }, (_, i) => [130 + i * 84, 280]);
    const chainSvg = C.map(([x, y], i) => txt(x, y, 'C', 'ch-lab', 'font-size:30px') + (i ? txt(x, y - 30, i + 1, 'f-tm f-mid') : txt(x - 34, y + 8, 1, 'f-tm f-mid')) + (i < 5 ? `<path class="ch-bond" d="M${x + 18} ${y}H${x + 66}"/>` : '')).join('') +
      `<path class="ch-bond" d="M124 262V212M136 262V212"/>` + txt(130, 192, 'O', 'ch-lab el-O', 'font-size:30px') + `<path class="ch-bond" d="M466 298V340"/>` + txt(466, 366, 'OH', 'ch-lab el-O', 'font-size:28px');
    const V = [330, 30, 90, 150, 210, 270].map((a) => [1080 + 110 * Math.cos(a * Math.PI / 180), 290 + 110 * Math.sin(a * Math.PI / 180)]);
    const lab = ['O', '1', '2', '3', '4', '5'];
    const ring = `<path class="f-ink" style="stroke-width:5" d="M${V.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join('L')}Z"/>` +
      V.map(([x, y], i) => i === 0 ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="20" style="fill:var(--board)"/>` + txt(x.toFixed(1), y.toFixed(1), 'O', 'ch-lab el-O', 'font-size:30px') : i === 5 ? txt((x - 28).toFixed(1), (y + 2).toFixed(1), '5', 'f-tm f-mid') : txt((x + (x - 1080) * 0.28).toFixed(1), (y + (y - 290) * 0.28 + 8).toFixed(1), lab[i], 'f-tm f-mid')).join('') +
      `<path class="ch-bond" d="M${V[5][0].toFixed(1)} ${V[5][1].toFixed(1)}v-70"/>` + txt(V[5][0].toFixed(1), (V[5][1] - 86).toFixed(1), '6', 'f-tm f-mid');
    return svg(1480, 520,
      st(0, chainSvg) +
      st(1, `<path class="f-hb" style="stroke-width:4" d="M466 384C466 470 130 470 130 300"/>` + arrow(140, 330, 130, 302, 'f-ink k6l')) +
      st(2, `<path class="f-ink" d="M640 270h150l-16-12M790 306H640l16 12"/>` + ring + txt(1080, 470, 'the same atoms, as a ring', 'f-t2 f-mid')));
  };

  /* alpha and beta glucose side by side: carbon 1's OH flips */
  F.alphaBeta = () => svg(1400, 520,
    st(0, F.glucose({ x: 360, y: 260, s: 1.15 }) + `<text class="f-tb f-mid" x="360" y="470">α-glucose</text><text class="f-t2 f-mid" x="360" y="510">carbon 1's OH: down</text>`) +
    st(1, F.glucose({ x: 1040, y: 260, s: 1.15, beta: true }) + `<text class="f-tb f-mid" x="1040" y="470">β-glucose</text><text class="f-t2 f-mid" x="1040" y="510">carbon 1's OH: up</text>`));

  /* a glycosidic linkage: the OHs on carbon 1 and carbon 4 face each other, a water leaves, an O bridges them */
  F.glyco = () => {
    const ring = (cx) => { const V = [330, 30, 90, 150, 210, 270].map((a) => [cx + 70 * Math.cos(a * Math.PI / 180), 230 + 70 * Math.sin(a * Math.PI / 180)]);
      return `<path class="k6s" d="M${V.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join('L')}Z"/>` + txt(V[0][0].toFixed(1), V[0][1].toFixed(1), 'O', 'ch-lab el-O', 'font-size:26px') +
        txt((V[1][0] + 18).toFixed(1), (V[1][1] - 6).toFixed(1), '1', 'f-tm') + txt((V[4][0] - 30).toFixed(1), (V[4][1] - 6).toFixed(1), '4', 'f-tm'); };
    const oh = (x, y, s) => `<path class="ch-bond" d="M${x} ${y}v55"/>` + txt(x, y + 75, s, 'ch-lab el-O', 'font-size:26px');
    const A = 380, B = 820, a1 = A + 60.6, b4 = B - 60.6, yv = 265;
    return svg(1480, 640,
      ring(A) + ring(B) + oh(A - 60.6, yv, 'HO') + oh(B + 60.6, yv, 'OH') +
      st(0, oh(a1, yv, 'OH') + oh(b4, yv, 'HO'), 2) +
      st(1, `<circle class="f-hb" cx="${a1}" cy="${yv + 75}" r="30"/><circle class="f-hb" cx="${b4}" cy="${yv + 75}" r="30"/>`, 2) +
      st(2, `<path class="ch-bond" style="fill:none" d="M${a1} ${yv}L600 330L${b4} ${yv}"/><circle cx="600" cy="330" r="18" style="fill:var(--board)"/>` + txt(600, 330, 'O', 'ch-lab el-O', 'font-size:28px') +
        water(600, 480, { a: 0, s: 1 }) + txt(600, 560, 'water out', 'f-t2 f-mid') + txt(600, 110, 'a 1–4 glycosidic linkage', 'f-t f-mid')) +
      st(3, txt(980, 200, 'glucose + glucose: maltose', 'f-t') + txt(980, 260, 'glucose + fructose: sucrose', 'f-t') + txt(980, 296, 'table sugar', 'f-t2') +
        txt(980, 380, 'add water (hydrolysis): apart again', 'f-t2')));
  };

  /* alpha chains are starch; beta chains, every other one flipped, are cellulose */
  F.chains = () => {
    const chain = (y, flip) => Array.from({ length: 8 }, (_, i) => { const x = 300 + i * 110, up = flip && i % 2; return (i ? link(x - 76, x - 34, y) : '') + hex(x, y, 34, flip ? 'k3s' : 'k6s') + `<path class="ch-bond" d="M${x} ${up ? y - 34 : y + 34}v${up ? -26 : 26}"/>`; }).join('');
    return svg(1480, 620,
      st(0, txt(40, 172, 'α-glucose', 'f-tb') + chain(160, false) + txt(300, 280, 'starch: pasta, sticky rice, potatoes', 'f-t')) +
      st(1, txt(40, 432, 'β-glucose', 'f-tb') + chain(420, true) + txt(300, 540, 'cellulose', 'f-t')) +
      st(2, txt(300, 585, 'fiber: you can\'t digest it', 'f-t')));
  };

  /* storing glucose: amylose (a chain) and amylopectin (branched) in plants, glycogen (more branched) in animals and fungi */
  F.storage = () => {
    const bead = (x, y, cls) => hex(x, y, 15, cls);
    const run = (x, y, n, dx, dy, cls) => Array.from({ length: n }, (_, i) => bead(x + i * dx, y + i * dy, cls)).join('');
    const amylose = run(80, 220, 12, 30, 0, 'k6s');
    const amylopectin = run(520, 220, 9, 30, 0, 'k6s') + run(610, 194, 4, 22, -26, 'k6s') + run(730, 246, 4, 22, 26, 'k6s');
    const glycogen = run(1000, 220, 8, 30, 0, 'k4s') + run(1060, 194, 4, 22, -26, 'k4s') + run(1120, 246, 4, 22, 26, 'k4s') + run(1150, 194, 3, 26, -26, 'k4s') + run(1210, 246, 3, 26, 26, 'k4s') + run(1090, 140, 3, 28, -10, 'k4s') + run(1180, 300, 3, 28, 10, 'k4s');
    return svg(1480, 460,
      st(0, txt(80, 70, 'plants: starch', 'f-tb') + amylose + txt(80, 390, 'amylose: a chain', 'f-t') + amylopectin + txt(520, 390, 'amylopectin: branched', 'f-t')) +
      st(1, txt(1000, 70, 'animals and fungi', 'f-tb') + glycogen + txt(1000, 420, 'glycogen: more branched', 'f-t')));
  };

  /* a plant makes glucose from air and sunlight, then uses it as fuel (alpha, starch) or structure (beta, cellulose) */
  F.plantSugar = () => {
    let rays = '';
    for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; rays += `<path class="f-ink k4l" style="stroke-width:4" d="M${(170 + 62 * Math.cos(a)).toFixed(1)} ${(150 + 62 * Math.sin(a)).toFixed(1)}l${(20 * Math.cos(a)).toFixed(1)} ${(20 * Math.sin(a)).toFixed(1)}"/>`; }
    return svg(1480, 520,
      rays + `<circle class="k4" cx="170" cy="150" r="48"/>` + txt(170, 260, 'sunlight', 'f-t2 f-mid') + txt(170, 400, 'CO₂ from the air', 'f-t2 f-mid') + arrow(260, 390, 380, 330) + arrow(240, 190, 380, 270) +
      `<path class="k3s" d="M420 300c40-90 160-90 200 0-40 90-160 90-200 0z"/>` + arrow(640, 300, 760, 300) + hex(830, 300, 46, 'k6s') + txt(830, 400, 'glucose', 'f-t2 f-mid') +
      arrow(900, 270, 1010, 180) + arrow(900, 330, 1010, 420) +
      txt(1030, 176, 'α → starch: fuel', 'f-tb') + txt(1030, 440, 'β → cellulose: structure', 'f-tb') + txt(1030, 480, 'wood, stalks', 'f-t2'));
  };

  /* -ose is the sugar; -ase is the enzyme (a protein) that breaks it */
  F.oseAse = () => {
    const w = (x, y, stem, end, col) => `<text class="f-tb" x="${x}" y="${y}" style="font-size:52px">${stem}${hl(end, col)}</text>`;
    const q = (y) => txt(760, y, '?', 'f-tb', 'font-size:52px;fill:var(--muted)');
    return svg(1480, 520,
      txt(120, 50, 'the sugar', 'f-t2') + txt(760, 50, 'the enzyme that breaks it', 'f-t2') +
      st(0, w(120, 140, 'cellul', 'ose', 'k6') + arrow(560, 125, 700, 125) + w(760, 140, 'cellul', 'ase', 'k5') + txt(1200, 135, 'only microbes make it', 'f-t2')) +
      st(1, w(120, 290, 'amyl', 'ose', 'k6') + arrow(560, 275, 700, 275)) + st(1, q(290), 2) +
      st(2, w(760, 290, 'amyl', 'ase', 'k5') + txt(1200, 285, 'in your saliva', 'f-t2')) +
      st(3, w(120, 440, 'lact', 'ose', 'k6') + arrow(560, 425, 700, 425)) + st(3, q(440), 4) +
      st(4, w(760, 440, 'lact', 'ase', 'k5') + txt(1200, 422, 'none as an adult:', 'f-t2') + txt(1200, 456, 'lactose intolerant', 'f-t2')));
  };

  /* cellulose chains lie side by side, OH to OH, into fibers */
  F.fibers = () => {
    let o = '';
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 9; i++) o += (i ? link(240 + i * 110 - 76, 240 + i * 110 - 34, 160 + r * 130) : '') + hex(240 + i * 110, 160 + r * 130, 34, 'k3s');
      if (r < 2) for (let i = 0; i < 9; i += 2) o += `<path class="f-hb" style="stroke-width:4" d="M${240 + i * 110} ${196 + r * 130}v58"/>`;
    }
    return svg(1480, 520, o + txt(740, 480, 'chain to chain, OH to OH: fibers, then cell walls', 'f-t f-mid'));
  };

  /* chitin: glucose with an amine on it, chained */
  F.chitin = () => {
    const unit = (x, y) => hex(x, y, 40, 'k5s') + `<path class="ch-bond" d="M${x} ${y + 40}v30"/>` + txt(x, y + 90, 'N', 'ch-lab el-N', 'font-size:28px');
    return svg(1480, 560,
      st(0, unit(260, 220) + txt(400, 210, 'gluco- + -amine:', 'f-t') + txt(400, 250, 'glucose with a nitrogen on it', 'f-t2'), 1) +
      st(1, [0, 1, 2, 3, 4, 5].map((i) => (i ? link(260 + i * 180 - 136, 260 + i * 180 - 106, 220) + link(260 + i * 180 - 74, 260 + i * 180 - 44, 220) + txt(260 + i * 180 - 90, 220, 'O', 'ch-lab el-O', 'font-size:24px') : '') + unit(260 + i * 180, 220)).join('') +
        txt(740, 460, 'chained by glycosidic linkages: chitin', 'f-t f-mid')));
  };

  /* lipids in a steak: the marbling */
  F.steak = () => svg(1400, 560,
    `<path class="k2s" d="M160 300c-20-120 120-200 280-190s300 40 320 160-60 220-260 230-320-40-340-200z"/>` +
    `<path class="lips" d="M160 300c-20-120 120-200 280-190l-6 30c-140-8-246 60-236 160z"/>` +
    [`M300 230c60 30 120-20 180 20s90 30 120 0`, `M260 330c80-20 140 40 220 10s120-10 170 30`, `M380 420c40-30 100 10 150-10`, `M560 200c20 40-10 80 30 110`].map((d) => `<path style="fill:none;stroke:var(--lipid);stroke-width:7;stroke-linecap:round" d="${d}"/>`).join('') +
    st(0, `<path class="f-ink2" d="M640 250L860 200"/>` + txt(870, 206, 'the marbling: lipid', 'f-t')) +
    st(1, txt(870, 330, 'fats', 'f-tb') + txt(870, 380, 'phospholipids', 'f-tb') + txt(870, 430, 'steroids', 'f-tb')));

  /* fatty acids: straight (saturated), kinked (unsaturated); omega counts from the methyl end */
  F.fattyAcids = () => {
    const zig = (x, y, n, kinkAt) => { let p = `M${x} ${y}`, cx = x, cy = y, ang = 0; for (let i = 0; i < n; i++) { if (i === kinkAt) ang += 0.6; cx += 34 * Math.cos(ang); cy += (i % 2 ? -18 : 18) + 34 * Math.sin(ang); p += `L${cx.toFixed(1)} ${cy.toFixed(1)}`; } return `<path class="f-ink" style="stroke:var(--lipid);stroke-width:7" d="${p}"/>`; };
    const head = (x, y) => mol({ atoms: [['C', 0, 0], ['O', -50, -40], ['OH', -60, 40]], bonds: [[0, 1, 2], [0, 2]], x, y, fs: 28 });
    const V = Array.from({ length: 14 }, (_, i) => [160 + i * 38, 540 + (i % 2 ? -18 : 18)]), n = V.length;
    const omega = `<path class="f-ink" style="stroke:var(--lipid);stroke-width:7" d="M${V.map((p) => p.join(' ')).join('L')}"/>` +
      `<path class="f-ink" style="stroke:var(--k2);stroke-width:5" d="M${V[n - 3][0]} ${V[n - 3][1] - 12}L${V[n - 4][0]} ${V[n - 4][1] - 12}"/>` +
      [1, 2, 3].map((k) => txt(V[n - k][0], V[n - k][1] + (V[n - k][1] > 540 ? 40 : -24), k, 'f-tm f-mid')).join('') + txt(V[n - 1][0] + 20, V[n - 1][1] + 8, 'CH₃ end', 'f-t2');
    return svg(1500, 640,
      st(0, head(140, 120) + zig(160, 120, 16) + txt(760, 120, 'saturated: all single bonds, straight', 'f-t') + txt(760, 160, 'solid: butter. Mammals make these.', 'f-t2')) +
      st(1, head(140, 320) + zig(160, 320, 16, 8) + txt(760, 310, 'unsaturated: a C=C double bond, a kink', 'f-t') + txt(760, 350, 'liquid: corn oil', 'f-t2')) +
      st(2, omega + txt(800, 530, 'omega-3: the first double bond is', 'f-t') + txt(800, 568, '3 carbons from the CH₃ end', 'f-t') + txt(800, 610, 'omega-3s and omega-6s: you have to eat them', 'f-t2')));
  };

  /* a fat: glycerol and three fatty acids, joined by ester linkages */
  F.triglyceride = () => {
    let o = `<rect class="k5s" x="120" y="80" width="120" height="340" rx="20"/>` + txt(180, 460, 'glycerol', 'f-tb f-mid') + txt(180, 495, '3 carbons, 3 OH', 'f-t2 f-mid');
    [140, 250, 360].forEach((y, i) => {
      o += st(i + 1, `<circle class="k2" cx="290" cy="${y}" r="14"/>` + txt(270, y - 24, 'ester', 'f-tm') + `<path style="fill:none;stroke:var(--lipid);stroke-width:12;stroke-linecap:round" d="M300 ${y}h${i === 1 ? 300 : 560}${i === 1 ? 'l80 50h180' : ''}"/>` + water(1050 + i * 120, 120, { s: 0.8 }));
    });
    return svg(1500, 520, st(0, o) + st(4, txt(1000, 300, 'three waters out', 'f-t2') + txt(1000, 360, 'energy storage', 'f-tacc')));
  };

  /* hydrophilic and hydrophobic, then which end of a phospholipid is which */
  F.philic = () => {
    const row = (y, word, gloss, eg) => `<text class="f-tb" x="80" y="${y}" style="font-size:56px">${word}</text>` + txt(520, y - 8, gloss, 'f-t') + txt(520, y + 30, eg, 'f-t2');
    return svg(1480, 560,
      st(0, row(150, `hydro${hl('philic')}`, 'water-loving', 'a biblio·phile loves books')) +
      st(1, row(330, `hydro${hl('phobic', 'k2')}`, 'water-fearing', 'an arachno·phobe fears spiders')) +
      st(2, F.lipidGlyph(1020, 150, 3.4, false, false) + txt(1100, 160, 'polar head: hydrophilic', 'f-t') + txt(1100, 360, 'nonpolar tails: hydrophobic', 'f-t')));
  };

  /* phospholipids in water: loose, then a bilayer, a barrier */
  F.bilayer = () => {
    let top = '', bot = '', loose = '';
    for (let i = 0; i < 18; i++) { top += F.lipidGlyph(140 + i * 70, 190, 1.4, false, i % 3 === 1); bot += F.lipidGlyph(140 + i * 70, 420, 1.4, true, i % 4 === 2); }
    const rnd = [[200, 160, 30], [420, 300, 120], [700, 180, 200], [900, 380, 300], [1150, 220, 80], [1300, 420, 250], [560, 440, 340], [1000, 120, 160]];
    rnd.forEach(([x, y, a], i) => { loose += `<g transform="rotate(${a} ${x} ${y})">${F.lipidGlyph(x, y, 1.4, false, i % 2)}</g>`; });
    return svg(1500, 560,
      `<rect class="wat" x="40" y="20" width="1420" height="520" rx="30" style="stroke:none"/>` +
      st(0, loose + txt(60, 70, 'phospholipids loose in water', 'f-t2'), 1) +
      st(1, top + bot + txt(60, 70, 'a bilayer: heads out to the water, tails in', 'f-t2')) +
      st(2, txt(60, 520, 'functionally impermeable', 'f-tacc')));
  };

  /* one layer, closed into a ball: fat carried inside, through watery blood */
  F.micelle = () => {
    let ring = '';
    for (let k = 0; k < 20; k++) { const a = k * 18, r = a * Math.PI / 180, x = 520 + 190 * Math.cos(r), y = 280 + 190 * Math.sin(r); ring += `<g transform="rotate(${a + 90} ${x.toFixed(1)} ${y.toFixed(1)})">${F.lipidGlyph(x, y, 1.5, false, k % 3 === 1)}</g>`; }
    return svg(1400, 560,
      `<rect class="wat" x="40" y="20" width="1320" height="520" rx="30" style="stroke:none"/>` + txt(60, 70, 'blood: mostly water', 'f-t2') +
      `<circle class="lips" cx="520" cy="280" r="70"/>` + txt(520, 288, 'fat', 'f-t f-mid') + ring +
      txt(820, 270, 'one layer, heads out:', 'f-t') + txt(820, 310, 'fat carried inside', 'f-t'));
  };

  /* ---------------- join and split: dehydration synthesis and hydrolysis ---------------- */
  D.parts.joiner = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1500 420', width: 1500, height: 420 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [60, 450, 1400]);
    const s = () => D.get('join-' + def.id, () => ({ n: 4, joined: 0 }));
    const row = D.el('div', 'dm-row', ctl);
    const bJ = D.el('button', 'dm-btn', row, 'Join one (dehydration)'), bS = D.el('button', 'dm-btn', row, 'Split one (hydrolysis)'), bA = D.el('button', 'dm-btn', row, 'Another monomer');
    const out = D.el('div', 'dm-read', ctl);
    bJ.onclick = () => { const v = s(); if (v.joined < v.n - 1) v.joined++; D.save(); paint(); };
    bS.onclick = () => { const v = s(); if (v.joined > 0) v.joined--; D.save(); paint(); };
    bA.onclick = () => { const v = s(); if (v.n < 8) v.n++; D.save(); paint(); };
    function paint() {
      const { n, joined } = s(); let g = '', x = 80;
      for (let i = 0; i < n; i++) {
        const linked = i < joined;
        g += `<g transform="translate(${x} 160)"><text class="f-t" x="-34" y="10">${i === 0 || !(i - 1 < joined) ? 'HO' : ''}</text><polygon class="k6s" points="0,-40 50,-40 70,0 50,40 0,40 -20,0" transform="translate(30 0)"/><text class="f-t" x="${linked ? 110 : 100}" y="10">${linked ? '–O–' : 'H'}</text></g>`;
        x += linked ? 175 : 200;
      }
      for (let k = 0; k < joined; k++) g += water(120 + k * 120, 340, { s: 0.85 });
      g += `<text class="f-t2" x="80" y="300">${joined ? 'water released:' : ''}</text>`;
      pic.innerHTML = g;
      out.innerHTML = `${n} monomers, <b>${joined}</b> bonds, <b>${joined}</b> waters out` + (joined === n - 1 ? ' · one polymer' : '');
    }
    return { show() { paint(); }, reset() { paint(); } };
  };

  /* ---------------- how tightly do the tails pack? ---------------- */
  D.parts.fatPack = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1500 420', width: 1500, height: 420 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [60, 450, 1400]);
    const s = () => D.get('fat-' + def.id, () => ({ u: 0 }));
    const sl = D.slider(ctl, { label: 'Kinked (unsaturated) tails', lo: 0, hi: 100, step: 5, value: s().u, width: 600, fmt: (v) => v + '%', change: (v) => { s().u = v; D.save(); paint(); } });
    const out = D.el('div', 'dm-read', ctl);
    function paint() {
      const u = s().u; let g = '', x = 80;
      for (let i = 0; i < 24; i++) {
        const kink = ((i * 37) % 100) < u, w = kink ? 70 : 42;
        g += `<path style="fill:none;stroke:var(--lipid);stroke-width:8;stroke-linecap:round" d="M${x} 60v${kink ? 130 : 280}${kink ? 'l36 50v100' : ''}"/>`;
        x += w; if (x > 1440) break;
      }
      pic.innerHTML = g;
      out.innerHTML = u < 30 ? '<b>Packs tight</b>: solid at room temperature (butter)' : u < 70 ? '<b>Soft</b>: some kinks keep the tails apart' : '<b>Can\'t pack</b>: liquid at room temperature (olive oil)';
    }
    return { show() { sl.set(s().u); paint(); }, reset() { sl.set(s().u); paint(); } };
  };
})();

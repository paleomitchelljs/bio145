/* Lecture 2 figures, the atom builder, the electronegativity tug-of-war and the bend-a-molecule demo (after homework 2,
 * stage B). Each figure is what JM draws or describes; the words on a figure are labels, not his sentences. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, mol, balls, bohr, water, arrow } = D.chem;
  const txt = (x, y, s, cls, style) => `<text class="${cls || 'f-t'}" x="${x}" y="${y}"${style ? ` style="${style}"` : ''}>${s}</text>`;
  const strike = (x1, x2, y) => `<path class="f-ink k2l" style="stroke-width:6" d="M${x1} ${y}H${x2}"/>`;

  /* ---------- the periodic table, periods 1-4, colored by where each element came from, or by what life uses ---------- */
  const ROWS = [['H', 1, 1], ['He', 1, 18],
    ['Li', 2, 1], ['Be', 2, 2], ['B', 2, 13], ['C', 2, 14], ['N', 2, 15], ['O', 2, 16], ['F', 2, 17], ['Ne', 2, 18],
    ['Na', 3, 1], ['Mg', 3, 2], ['Al', 3, 13], ['Si', 3, 14], ['P', 3, 15], ['S', 3, 16], ['Cl', 3, 17], ['Ar', 3, 18]]
    .concat('K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr'.split(' ').map((s, i) => [s, 4, i + 1]));
  const TX = (c) => 40 + (c - 1) * 78, TY = (r) => 20 + (r - 1) * 84;
  const tile = (el, r, c, cls) => `<rect class="${cls}" x="${TX(c)}" y="${TY(r)}" width="74" height="78" rx="8"/>`;
  F.ptable = (o) => {
    const life = o.mode === 'life';
    const base = ROWS.map(([el, r, c]) => tile(el, r, c, 'f-card')).join('');
    const lab = ROWS.map(([el, r, c], i) => txt(TX(c) + 8, TY(r) + 22, i + 1, 'f-tm', 'font-size:18px') + txt(TX(c) + 37, TY(r) + 62, el, 'f-tb f-mid', 'font-size:30px')).join('');
    const paint = (set, cls) => ROWS.filter(([el]) => set.includes(el)).map(([el, r, c]) => tile(el, r, c, cls)).join('');
    const key = (x, cls, s) => `<rect class="${cls}" x="${x}" y="395" width="34" height="34" rx="6"/>` + txt(x + 46, 422, s, 'f-t');
    if (!life) {
      const rest = ROWS.map(([el]) => el).filter((el) => !['H', 'He', 'Li', 'Be', 'B'].includes(el));
      return svg(1480, 580, base +
        st(1, paint(['H', 'He'], 'k1s') + key(40, 'k1s', 'the Big Bang')) +
        st(2, paint(['Li', 'Be', 'B'], 'k5s') + key(330, 'k5s', 'cosmic rays')) +
        st(3, paint(rest, 'k4s') + key(590, 'k4s', 'stars, dying and exploding')) + lab +
        st(4, `<rect class="f-card" x="1250" y="400" width="160" height="170" rx="14" style="stroke:var(--accent-ink);stroke-width:4"/>` +
          txt(1268, 442, '6', 'f-tb', 'font-size:38px;fill:var(--accent-ink)') + txt(1330, 530, 'C', 'f-tb f-mid', 'font-size:80px') +
          txt(1180, 520, 'number of protons', 'f-t f-end') + arrow(1188, 508, 1262, 446)));
    }
    const bar = (x, w, cls) => `<rect class="${cls}" x="${x}" y="430" width="${w}" height="56" rx="4"/>`;
    return svg(1480, 600, base +
      st(0, paint(['H', 'C', 'N', 'O'], 'k2s') + txt(40, 412, 'you, by mass', 'f-t2') + bar(40, 1344, 'k2s') + txt(712, 468, 'C, O, H, N: about 96%', 'f-tb f-mid')) +
      st(1, paint(['Na', 'P', 'S', 'Cl', 'K', 'Ca'], 'k6s') + bar(1384, 50, 'k6s') + `<path class="f-ink2" d="M1409 490v26"/>` + txt(1440, 540, 'P, S, Ca, Cl, Na, K: most of the other 4%', 'f-t2 f-end')) +
      st(2, paint(['Fe'], 'k1s') + bar(1434, 6, 'k1s') + `<path class="f-ink2" d="M1437 490v60"/>` + txt(1440, 580, '14 more, iron among them: under 1%', 'f-t2 f-end')) + lab);
  };

  /* how many connections each can make; water from those numbers; carbon's four */
  F.valence = () => {
    const A = [['H', 200, 1, [0]], ['O', 540, 2, [210, 330]], ['N', 880, 3, [200, 270, 340]], ['C', 1220, 4, [45, 135, 225, 315]]];
    const atomG = ([el, x, n, angs]) => angs.map((a) => { const r = a * Math.PI / 180; return `<path class="ch-bond" d="M${(x + 50 * Math.cos(r)).toFixed(1)} ${(170 + 50 * Math.sin(r)).toFixed(1)}L${(x + 92 * Math.cos(r)).toFixed(1)} ${(170 + 92 * Math.sin(r)).toFixed(1)}"/>`; }).join('') +
      `<circle class="ch-ball el-${el}" cx="${x}" cy="170" r="48"/><text class="ch-ballt${el === 'H' ? ' on-light' : ''}" x="${x}" y="170" style="font-size:44px">${el}</text>` + txt(x, 330, n, 'f-tb f-mid', 'font-size:52px');
    return svg(1480, 600,
      st(0, A.map(atomG).join('') + txt(740, 50, 'valence: how many connections', 'f-t f-mid')) +
      st(1, mol({ atoms: [['O', 0, 0], ['H', -70, 55], ['H', 70, 55]], bonds: [[0, 1], [0, 2]], x: 540, y: 450, fs: 40 }) + txt(540, 580, 'H₂O', 'f-tb f-mid')) +
      st(2, mol({ atoms: [['C', 0, 0], ['H', 0, -75], ['H', 75, 0], ['H', 0, 75], ['H', -75, 0]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], x: 1040, y: 470, fs: 36 }) +
        mol({ atoms: [['C', 0, 0], ['O', 90, 0], ['H', -55, -55], ['H', -55, 55]], bonds: [[0, 1, 2], [0, 2], [0, 3]], x: 1300, y: 470, fs: 36 }) + txt(1040, 590, 'four single bonds', 'f-t2 f-mid') + txt(1330, 590, 'or a double bond', 'f-t2 f-mid')));
  };

  /* an element: the same whether it came out of sea salt or blood; known long before anyone saw an atom */
  F.alchemy = () => {
    let crystals = '';
    [[0, 0], [36, 0], [72, 0], [18, -32], [54, -32], [36, -64]].forEach(([dx, dy]) => { crystals += `<rect class="f-card" x="${170 + dx}" y="${150 + dy}" width="32" height="30" style="stroke:var(--ink-2)"/>`; });
    const dot = (x, s) => `<circle class="f-acc" cx="${x}" cy="520" r="12"/>`;
    return svg(1480, 600,
      `<path class="f-ink2" d="M80 520H1440"/>` +
      st(0, dot(1320) + txt(1440, 490, '1955: first pictures of single atoms', 'f-t f-end')) +
      st(1, dot(160) + txt(80, 490, 'alchemists: distilling things apart', 'f-t') + dot(800) + txt(800, 570, '1869: the periodic table', 'f-t f-mid')) +
      st(2, crystals + txt(220, 210, 'sea salt', 'f-t2 f-mid') + `<path class="k2s" d="M220 250c-30 44-38 66-38 82a38 38 0 0 0 76 0c0-16-8-38-38-82z"/>` + txt(220, 400, 'blood', 'f-t2 f-mid') +
        arrow(270, 160, 560, 260) + arrow(270, 320, 560, 300) + `<rect class="f-accsoft" x="570" y="236" width="260" height="84" rx="16"/>` + txt(700, 290, 'sodium', 'f-tb f-mid') +
        txt(700, 360, 'the same sodium either way', 'f-t2 f-mid')) +
      st(3, txt(900, 280, 'an element: can\'t be broken down by chemistry', 'f-t2')));
  };

  /* the three particles */
  F.particles = () => {
    const row = (y, glyph, name, q, m, where) => glyph + txt(130, y + 12, name, 'f-tb') + txt(560, y + 12, q, 'f-tb f-mid') + txt(780, y + 12, m, 'f-tb f-mid') + txt(1020, y + 12, where, 'f-t');
    return svg(1300, 420,
      txt(560, 60, 'charge', 'f-t2 f-mid') + txt(780, 60, 'mass', 'f-t2 f-mid') + txt(1020, 60, 'where', 'f-t2') + `<path class="f-thin" d="M40 84H1260"/>` +
      row(150, `<circle class="k2" cx="80" cy="150" r="24"/>`, 'proton', '+', '1', 'nucleus') +
      row(250, `<circle class="f-board2" cx="80" cy="250" r="24" style="stroke:var(--muted);stroke-width:3"/>`, 'neutron', '0', '1', 'nucleus') +
      row(350, `<circle class="k1" cx="80" cy="350" r="11"/>`, 'electron', '−', 'about 0', 'around it, always moving'));
  };

  /* the paddleball: an electron's average distance, a harder hit, a snapped string */
  const GHOST = [[-150, 0.92], [-135, 1.18], [-122, 0.8], [-110, 1.08], [-98, 0.88], [-86, 1.22], [-74, 0.95], [-62, 1.1], [-50, 0.84], [-40, 1.15], [-30, 0.98]];
  const paddle = (x, y) => `<path class="f-ink" style="stroke-width:14" d="M${x} ${y + 80}v56"/><ellipse class="k4s" cx="${x}" cy="${y}" rx="64" ry="84"/>`;
  F.paddle = () => {
    const panel = (x, y, R, ballCls, ghosts) => {
      const a = -62 * Math.PI / 180, bx = x + R * Math.cos(a), by = y + R * Math.sin(a);
      return paddle(x, y) + `<path class="f-ink2" style="stroke-dasharray:2 7" d="M${x} ${y}L${bx.toFixed(1)} ${by.toFixed(1)}"/><circle class="${ballCls}" cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="20"/>` +
        (ghosts ? GHOST.map(([g, k]) => { const r = g * Math.PI / 180; return `<circle class="${ballCls}" style="opacity:0.22" cx="${(x + R * k * Math.cos(r)).toFixed(1)}" cy="${(y + R * k * Math.sin(r)).toFixed(1)}" r="16"/>`; }).join('') : '');
    };
    return svg(1480, 680,
      st(0, panel(240, 400, 170, 'k1', false) + txt(330, 210, 'the electron', 'f-t2') + txt(240, 590, 'string: the pull of the nucleus', 'f-t2 f-mid')) +
      st(1, GHOST.map(([g, k]) => { const r = g * Math.PI / 180; return `<circle class="k1" style="opacity:0.22" cx="${(240 + 170 * k * Math.cos(r)).toFixed(1)}" cy="${(400 + 170 * k * Math.sin(r)).toFixed(1)}" r="16"/>`; }).join('') +
        `<path class="f-dash" d="M${240 - 170} 400A170 170 0 0 1 ${240 + 170} 400"/>` + txt(240, 630, 'on average this far: the orbital', 'f-t2 f-mid')) +
      st(2, panel(760, 470, 280, 'k6', true) + txt(760, 660, 'hit harder (a photon): farther out', 'f-t2 f-mid')) +
      st(4, paddle(1250, 470) + `<path class="f-ink2" style="stroke-dasharray:2 7" d="M1250 470l40-70"/><path class="f-ink2" style="stroke-dasharray:2 7" d="M1340 330l30-50"/>` +
        `<circle class="k2" cx="1420" cy="230" r="20"/>` + arrow(1385, 268, 1440, 200, 'f-ink k2l') + txt(1250, 660, 'snap the string: a plasma', 'f-t2 f-mid')));
  };

  /* the ring model against the cloud */
  F.ringCloud = () => svg(1300, 520,
    `<defs><radialGradient id="l2cloud"><stop offset="0" style="stop-color:var(--k1);stop-opacity:0.55"/><stop offset="0.6" style="stop-color:var(--k1);stop-opacity:0.25"/><stop offset="1" style="stop-color:var(--k1);stop-opacity:0"/></radialGradient></defs>` +
    `<circle class="f-ink2" cx="330" cy="240" r="150"/><circle class="k2" cx="330" cy="240" r="22"/><circle class="k1" cx="180" cy="240" r="12"/><circle class="k1" cx="480" cy="240" r="12"/>` +
    `<path class="f-ink k2l" style="stroke-width:6" d="M230 460l24 24M254 460l-24 24"/>` + txt(280, 482, 'a fixed ring', 'f-t') +
    `<circle cx="950" cy="240" r="190" fill="url(#l2cloud)"/><circle class="k2" cx="950" cy="240" r="22"/>` +
    `<path class="f-ink k3l" style="stroke-width:6" d="M880 474l10 11 20-24"/>` + txt(925, 482, 'a cloud', 'f-t'));

  /* shells: energy in moves an electron out, energy lost lets it fall back; the outermost are the valence electrons */
  F.shells = () => {
    const band = (r, cls, w, op) => `<circle class="${cls}" style="fill:none;stroke-width:${w};opacity:${op || 0.25}" cx="320" cy="300" r="${r}"/>`;
    return svg(1400, 600,
      band(95, 'k1l', 26) + band(175, 'k1l', 26) + `<circle cx="320" cy="300" r="22" class="k2"/>` +
      st(0, band(255, 'k1l', 26) + `<circle class="k6" cx="415" cy="290" r="12"/>` + arrow(430, 270, 486, 270, 'f-ink k4l') + `<circle class="k6" cx="575" cy="330" r="12"/>` + arrow(560, 330, 504, 330, 'f-ink k1l') +
        txt(640, 278, 'energy absorbed: out a shell', 'f-t2', 'fill:var(--k4)') + txt(640, 338, 'energy lost: back in', 'f-t2', 'fill:var(--k1)')) +
      st(1, band(255, 'k6l', 26, 0.6) + txt(640, 470, 'valence electrons: the farthest out,', 'f-t') + txt(640, 510, 'the least tightly held', 'f-t')));
  };

  /* covalent: two paddles sharing one ball; H2 shares a pair; co-valent; O2 shares two pairs */
  F.share = () => {
    const ring = (x, y, r, cls) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
    return svg(1480, 620,
      st(0, `<g transform="rotate(-70 170 230)">${paddle(170, 230)}</g><g transform="rotate(70 550 230)">${paddle(550, 230)}</g>` +
        `<path class="f-ink2" style="stroke-dasharray:3 9" d="M250 200Q360 90 470 200"/><circle class="k1" cx="360" cy="146" r="18"/>` + txt(360, 360, 'one ball, two paddles', 'f-t2 f-mid')) +
      st(1, ring(960, 210, 100, 'k1s') + ring(1100, 210, 100, 'k1s') + `<circle class="k2" cx="960" cy="210" r="13"/><circle class="k2" cx="1100" cy="210" r="13"/>` +
        `<circle class="k6" cx="1030" cy="186" r="11"/><circle class="k6" cx="1030" cy="234" r="11"/>` + txt(1030, 355, 'H–H: one shared pair', 'f-t f-mid')) +
      st(2, txt(360, 500, '<tspan style="fill:var(--accent-ink)">co</tspan>-valent', 'f-tb f-mid', 'font-size:64px') + txt(360, 560, 'co-owning valence electrons', 'f-t2 f-mid')) +
      st(3, ring(985, 490, 78, 'k2s') + ring(1075, 490, 78, 'k2s') + `<circle class="k2" cx="985" cy="490" r="12"/><circle class="k2" cx="1075" cy="490" r="12"/>` +
        [460, 480, 500, 520].map((y) => `<circle class="k6" cx="1030" cy="${y}" r="9"/>`).join('') + txt(1030, 605, 'O=O: two shared pairs. Stronger, shorter.', 'f-t f-mid')));
  };

  /* the roommates: the bigger, hungrier one gets more of the shared groceries */
  F.roommates = () => {
    const person = (x, head, w, top) => `<circle class="k5s" cx="${x}" cy="${top}" r="${head}"/><rect class="k5s" x="${x - w / 2}" y="${top + head + 10}" width="${w}" height="${470 - top - head - 10}" rx="${w / 3}"/>`;
    return svg(1400, 580,
      person(330, 62, 190, 110) + person(1070, 38, 100, 230) +
      `<path class="k4s" d="M560 470l18-120h124l18 120z"/><path class="f-ink2" d="M598 350c0-30 84-30 84 0"/>` +
      `<ellipse class="k6s" cx="610" cy="335" rx="30" ry="14"/><circle class="k2s" cx="660" cy="332" r="16"/>` +
      arrow(520, 420, 450, 420) + txt(330, 520, 'oxygen: 8 protons', 'f-t f-mid') + txt(330, 560, 'more electronegative: pulls the pair harder', 'f-t2 f-mid') + txt(1070, 520, 'hydrogen: 1 proton', 'f-t f-mid') + txt(640, 520, 'the shared pair', 'f-t2 f-mid'));
  };

  /* water is bent and lopsided; methane is symmetric */
  F.waterMethane = () => svg(1400, 520,
    st(0, water(380, 220, { a: 180, s: 2.2, d: true, lab: true }) + `<text class="f-tb f-mid" x="380" y="450">water: bent, polar</text>`) +
    st(1, balls({ atoms: [['C', 0, 0], ['H', 0, -95], ['H', 90, 30], ['H', -90, 30], ['H', 0, 85]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], x: 1020, y: 230, rs: 1.6 }) + `<text class="f-tb f-mid" x="1020" y="450">methane: symmetric, nonpolar</text>`));

  /* sodium is oxidized (loses an electron), chlorine reduced (gains it); always paired */
  F.redox = () => svg(1480, 600,
    st(0, bohr(300, 310, { p: 11, n: 12, e: 10, r: 30 }) + `<circle class="k6" cx="520" cy="210" r="11" style="stroke:var(--outline);stroke-width:2"/>` + arrow(440, 260, 506, 220, 'f-ink k4l') +
      txt(300, 90, 'Na → Na⁺', 'f-tb f-mid') + txt(300, 530, '11 protons, 10 electrons', 'f-t2 f-mid') + txt(300, 580, 'oxidation: gains + charge (loses an electron)', 'f-t f-mid')) +
    st(1, bohr(1150, 310, { p: 17, n: 18, e: 18, r: 30 }) + txt(1150, 90, 'Cl → Cl⁻', 'f-tb f-mid') + txt(1150, 530, '17 protons, 18 electrons', 'f-t2 f-mid') +
      txt(1150, 580, 'reduction: loses + charge (gains an electron)', 'f-t f-mid')) +
    st(2, `<path class="f-hb" style="stroke-width:5" d="M560 190Q740 40 930 170"/>` + arrow(900, 150, 932, 172, 'f-ink') + txt(745, 60, 'always paired', 'f-tacc f-mid', 'font-size:34px')));

  /* why the names are backwards: we first guessed that positive charge moved */
  F.backwards = () => {
    const wire = (y, sym, cls) => `<path class="f-ink2" style="stroke-width:10;opacity:0.35" d="M80 ${y}H620"/>` + [160, 300, 440].map((x) => `<circle class="${cls}" cx="${x}" cy="${y}" r="20"/><text class="f-tb f-mid" x="${x}" y="${y + 11}" style="fill:var(--board)">${sym}</text>`).join('') + arrow(500, y, 600, y, 'f-ink');
    return svg(1400, 460,
      txt(80, 70, 'first guess: positive charge moves', 'f-t') + wire(150, '+', 'k2') + strike(70, 520, 60) +
      txt(80, 290, 'actually: electrons move', 'f-t') + wire(370, '−', 'k1'));
  };

  /* the semester's thread: sunlight pays to move electrons, and moving electrons lets a cell persist */
  F.throughline = () => {
    let rays = '';
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6; rays += `<path class="f-ink k4l" style="stroke-width:5" d="M${(200 + 95 * Math.cos(a)).toFixed(1)} ${(240 + 95 * Math.sin(a)).toFixed(1)}l${(28 * Math.cos(a)).toFixed(1)} ${(28 * Math.sin(a)).toFixed(1)}"/>`; }
    const m = (x) => `<circle class="k5s" cx="${x}" cy="240" r="46"/>`;
    return svg(1480, 480,
      rays + `<circle class="k4" cx="200" cy="240" r="72"/>` + txt(200, 400, 'the sun: disorder goes up there', 'f-t2 f-mid') + arrow(340, 240, 440, 240) +
      m(540) + m(720) + m(900) + `<circle class="k6" cx="${600}" cy="196" r="10"/>` + `<path class="f-hb" d="M560 200Q630 150 700 200M740 200Q810 150 880 200"/>` + arrow(860, 186, 882, 200, 'f-ink') +
      txt(720, 340, 'electrons moved, molecule to molecule', 'f-t2 f-mid') + txt(720, 380, 'photosynthesis · respiration · ATP', 'f-tm f-mid') + arrow(990, 240, 1090, 240) +
      `<path class="k3s" d="M1150 180c60-60 200-40 220 30s-30 120-120 110-150-80-100-140z"/>` + txt(1260, 400, 'a cell persists', 'f-t2 f-mid'));
  };

  /* ions: a cation and an anion, attracted, sharing nothing */
  F.ions = () => svg(1300, 460,
    `<circle class="ch-ball el-Na" cx="400" cy="210" r="62"/><text class="ch-ballt" x="400" y="210" style="font-size:40px">Na⁺</text>` +
    `<circle class="ch-ball el-Cl" cx="880" cy="210" r="76"/><text class="ch-ballt" x="880" y="210" style="font-size:40px">Cl⁻</text>` +
    arrow(500, 200, 590, 200) + arrow(780, 200, 690, 200) + txt(640, 150, 'attract', 'f-t2 f-mid') +
    txt(400, 340, 'cation: + charge', 'f-t f-mid') + txt(880, 340, 'anion: − charge', 'f-t f-mid'));

  /* the balloon: stuck to the wall by static (ionic), or fused into latex wallpaper (covalent) */
  F.balloon = () => {
    const wall = (x, cls) => `<rect class="${cls}" x="${x}" y="70" width="40" height="420"/>`;
    return svg(1480, 580,
      st(0, wall(120, 'f-board2') + `<path class="f-ink2" d="M160 70V490"/><ellipse class="k2s" cx="262" cy="250" rx="100" ry="120"/><path class="f-ink2" d="M262 370c-10 40 20 70 0 110"/>` +
        [190, 240, 290].map((y) => txt(145, y + 8, '+', 'f-tb f-mid', 'font-size:28px;fill:var(--k1)') + txt(185, y + 8, '−', 'f-tb f-mid', 'font-size:28px;fill:var(--k2)')).join('') +
        txt(300, 545, 'rubbed on your hair: stuck by static', 'f-t f-mid')) +
      st(1, wall(840, 'k2s') + `<path class="k2s" d="M880 160c80-30 200 0 200 100s-80 140-120 140c-30 0-60-20-80-30z"/><path class="f-ink2" d="M960 400c-10 40 20 60 0 90"/>` +
        txt(1000, 545, 'melted into latex wallpaper: shared', 'f-t f-mid')) +
      st(0, txt(300, 40, 'ionic', 'f-tb f-mid')) + st(1, txt(1000, 40, 'covalent', 'f-tb f-mid')));
  };

  /* how strong each kind is, schematic: drawn once without the hydrogen bond, once with */
  F.ladder = () => {
    const row = (y, name, w, cls, note) => txt(470, y + 10, name, 'f-t f-end') + `<rect class="${cls}" x="490" y="${y - 24}" width="${w}" height="48" rx="8"/>` + (note ? txt(500 + w, y + 10, note, 'f-tm') : '');
    return svg(1400, 520,
      arrow(490, 40, 1350, 40) + txt(1350, 26, 'stronger', 'f-t2 f-end') +
      row(120, 'double covalent', 820, 'k1s') + row(210, 'single covalent', 600, 'k1s') + row(300, 'ionic, in water', 220, 'k2s', ' (a dry crystal: stronger than covalent)') +
      st(1, row(390, 'hydrogen', 90, 'k6s', ' weakest')) + txt(490, 480, 'not to scale', 'f-tm'));
  };

  /* like dissolves like: salt in water; nonpolar in nonpolar; oil on vinegar */
  F.likeLike = () => {
    const glass = (x) => `<path class="f-ink2" style="stroke-width:4" d="M${x - 110} 120l20 300h180l20-300"/>`;
    const fill = (x, top, cls) => `<path class="${cls}" style="stroke:none" d="M${x - 110 + 20 * (top - 120) / 300} ${top}L${x + 110 - 20 * (top - 120) / 300} ${top}L${x + 90} 420H${x - 90}z"/>`;
    const dots = (x, cls) => [[-50, 220], [10, 250], [55, 210], [-30, 300], [40, 330], [-60, 370], [5, 390], [60, 280]].map(([dx, y]) => `<circle class="${cls}" cx="${x + dx}" cy="${y}" r="9"/>`).join('');
    return svg(1480, 540,
      st(0, glass(250) + fill(250, 180, 'wat') + dots(250, 'k1') + txt(250, 480, 'polar in polar: dissolves', 'f-t f-mid') + txt(250, 520, 'salt in water', 'f-t2 f-mid')) +
      st(1, glass(740) + fill(740, 180, 'lips') + dots(740, 'k4') + txt(740, 480, 'nonpolar in nonpolar: dissolves', 'f-t f-mid')) +
      st(2, glass(1230) + fill(1230, 180, 'lips') + fill(1230, 290, 'wat') + `<path class="f-ink2" d="M${1230 - 101} 290H${1230 + 101}"/>` +
        txt(1230, 480, 'polar and nonpolar: stay apart', 'f-t f-mid') + txt(1230, 520, 'oil on vinegar', 'f-t2 f-mid')));
  };

  /* a hydrogen bond: a δ+ hydrogen near a δ− nitrogen; next to a full ionic +1/−1 for scale */
  F.hbond = () => svg(1400, 520,
    st(0, water(300, 370, { a: 142.25, s: 1.6, d: true }) + `<path class="f-hb" d="M414 370H492"/>` +
      balls({ atoms: [['N', 0, 0], ['H', 62, -42], ['H', 74, 18], ['H', 30, 66]], bonds: [[0, 1], [0, 2], [0, 3]], x: 525, y: 370, rs: 1.3 }) +
      `<text class="ch-delta neg" x="520" y="320">δ−</text>` + txt(720, 362, 'a hydrogen bond:', 'f-t') + txt(720, 400, 'partial charges, δ+ and δ−', 'f-t2')) +
    st(1, `<circle class="ch-ball el-Na" cx="300" cy="140" r="34"/><text class="ch-ballt" x="300" y="140" style="font-size:24px">Na⁺</text>` +
      `<path class="f-hb" style="stroke:var(--muted)" d="M340 140H476"/><circle class="ch-ball el-Cl" cx="520" cy="140" r="42"/><text class="ch-ballt" x="520" y="140" style="font-size:24px">Cl⁻</text>` +
      txt(720, 132, 'ionic:', 'f-t') + txt(720, 170, 'full charges, +1 and −1', 'f-t2')));

  /* heat breaks bonds: an egg white sets (hydrogen bonds); boiling water stays H2O (covalent bonds hold) */
  F.heat = () => {
    const pan = (x) => `<ellipse class="f-board2" cx="${x}" cy="330" rx="160" ry="56" style="stroke:var(--ink-2);stroke-width:4"/><path class="f-ink" style="stroke-width:16" d="M${x + 156} 325h80"/>`;
    return svg(1480, 560,
      st(0, pan(220) + `<ellipse cx="200" cy="322" rx="92" ry="34" style="fill:var(--water-soft);stroke:var(--water);stroke-width:3"/><circle class="k6" cx="200" cy="318" r="22"/>` +
        arrow(390, 200, 520, 200) + txt(455, 180, 'heat', 'f-t2 f-mid') +
        pan(700) +
        `<ellipse cx="680" cy="322" rx="96" ry="36" style="fill:var(--card);stroke:var(--rule);stroke-width:3"/><circle class="k6" cx="680" cy="318" r="22"/>` +
        txt(470, 470, 'a little heat: hydrogen bonds break, the white sets', 'f-t f-mid')) +
      st(1, `<path class="f-ink2" style="stroke-width:5" d="M1110 230v180q0 30 30 30h200q30 0 30-30V230"/><path class="wat" style="stroke:none" d="M1113 270h254v140q0 27-27 27h-200q-27 0-27-27z"/>` +
        [[1170, 380], [1240, 330], [1310, 390], [1200, 300], [1290, 290]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" style="fill:var(--card);stroke:var(--water);stroke-width:3"/>`).join('') +
        [1180, 1250, 1320].map((x) => `<path class="f-thin" style="stroke-width:4" d="M${x} 210c-20-30 20-50 0-80s20-50 0-70"/>`).join('') +
        txt(1240, 500, 'boiling: molecules fly apart,', 'f-t f-mid') + txt(1240, 538, 'each H₂O stays whole', 'f-t f-mid')));
  };

  /* ---------------- the atom builder: protons, neutrons, electrons ---------------- */
  const EL = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
  const NAME = ['', 'hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium', 'aluminum', 'silicon', 'phosphorus', 'sulfur', 'chlorine', 'argon', 'potassium', 'calcium'];
  const COMMON_N = [0, 0, 2, 4, 5, 6, 6, 7, 8, 10, 10, 12, 12, 14, 14, 16, 16, 18, 22, 20, 20];
  D.parts.atomBuilder = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 700 600', width: 700, height: 600 }, box);
    pic.style.position = 'absolute'; pic.style.left = '20px'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [780, 30, 720]);
    const s = () => D.get('atom-' + def.id, () => Object.assign({ p: 6, n: 6, e: 6 }, def.start));
    const row = (k, lab) => {
      const r = D.el('div', 'dm-row', ctl, `<span style="width:190px">${lab}</span>`);
      const minus = D.el('button', 'dm-btn', r, '−'), val = D.el('span', 'dm-big', r), plus = D.el('button', 'dm-btn', r, '+');
      val.style.minWidth = '90px'; val.style.textAlign = 'center';
      minus.onclick = () => { s()[k] = Math.max(k === 'p' ? 1 : 0, s()[k] - 1); D.save(); paint(); };
      plus.onclick = () => { s()[k] = Math.min(20, s()[k] + 1); D.save(); paint(); };
      return val;
    };
    const vp = row('p', 'Protons'), vn = row('n', 'Neutrons'), ve = row('e', 'Electrons');
    const out = D.el('div', 'dm-read', ctl), note = D.el('div', 'dm-note', ctl);
    function paint() {
      const { p, n, e } = s(), q = p - e, mass = p + n;
      vp.textContent = p; vn.textContent = n; ve.textContent = e;
      pic.innerHTML = bohr(330, 300, { p, n, e, r: 42 });
      const ion = q === 0 ? 'neutral atom' : (q > 0 ? 'cation' : 'anion') + ', charge ' + (q > 0 ? '+' : '−') + Math.abs(q);
      const iso = n === COMMON_N[p] ? 'the common isotope' : 'an isotope (' + (n > COMMON_N[p] ? 'heavier' : 'lighter') + ' than usual)';
      out.innerHTML = `<b>${NAME[p]}</b>-${mass} &nbsp;·&nbsp; ${ion}<br>${iso}`;
      note.textContent = 'Protons: the element. Neutrons: the weight. Electrons: the charge.';
    }
    return { show() { paint(); }, reset() { paint(); } };
  };

  /* ---------------- the tug of war over a shared pair ---------------- */
  const EN = { H: 2.20, C: 2.55, N: 3.04, O: 3.44, Na: 0.93, Cl: 3.16, K: 0.82, S: 2.58 };
  D.parts.tug = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1500 360', width: 1500, height: 360 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [60, 380, 1400]);
    const s = () => D.get('tug-' + def.id, () => Object.assign({ a: 'C', b: 'H' }, def.start));
    const pickRow = (k, lab) => {
      const r = D.el('div', 'dm-row', ctl, `<span style="width:150px">${lab}</span>`), btns = {};
      Object.keys(EN).forEach((el) => { const b = D.el('button', 'dm-btn', r, el); b.onclick = () => { s()[k] = el; D.save(); paint(); }; btns[el] = b; });
      return btns;
    };
    const A = pickRow('a', 'Left atom'), B = pickRow('b', 'Right atom'), out = D.el('div', 'dm-read', ctl);
    function paint() {
      const { a, b } = s(), d = EN[b] - EN[a], ad = Math.abs(d), kind = ad < 0.4 ? 'nonpolar covalent' : ad < 1.7 ? 'polar covalent' : 'ionic';
      Object.entries(A).forEach(([k, e]) => e.classList.toggle('on', k === a)); Object.entries(B).forEach(([k, e]) => e.classList.toggle('on', k === b));
      const share = ad >= 1.7 ? (d > 0 ? 1 : 0) : 0.5 + 0.38 * d / 1.7, xa = 430, xb = 1070, px = xa + (xb - xa) * share;
      const ball = (x, el) => `<circle class="ch-ball el-${el}" cx="${x}" cy="180" r="${el === 'H' ? 60 : el === 'Na' || el === 'K' ? 95 : 80}"/><text class="ch-ballt${el === 'H' ? ' on-light' : ''}" x="${x}" y="180" style="font-size:52px">${el}</text>`;
      let dl = '';
      if (kind !== 'nonpolar covalent') { const neg = d > 0 ? xb : xa, pos = d > 0 ? xa : xb, sym = kind === 'ionic' ? ['−', '+'] : ['δ−', 'δ+']; dl = `<text class="ch-delta neg" x="${neg}" y="60" style="font-size:44px">${sym[0]}</text><text class="ch-delta pos" x="${pos}" y="60" style="font-size:44px">${sym[1]}</text>`; }
      pic.innerHTML = `<path class="ch-bond" d="M${xa} 180H${xb}"/>` + ball(xa, a) + ball(xb, b) + `<circle class="k6" cx="${px}" cy="150" r="16" style="stroke:var(--outline);stroke-width:3"/><circle class="k6" cx="${px}" cy="210" r="16" style="stroke:var(--outline);stroke-width:3"/>` + dl +
        `<text class="f-tm f-mid" x="${xa}" y="320">pull ${EN[a].toFixed(2)}</text><text class="f-tm f-mid" x="${xb}" y="320">pull ${EN[b].toFixed(2)}</text>`;
      out.innerHTML = a === b ? `Same atom, same pull: <b>${kind}</b>` : `<b>${kind}</b>` + (kind === 'ionic' ? ': the electron leaves entirely' : kind === 'polar covalent' ? `: the pair sits nearer ${d > 0 ? b : a}` : ': shared about evenly');
    }
    return { show() { paint(); }, reset() { paint(); } };
  };

  /* ---------------- bend a molecule: the two O–H pulls cancel when straight, add up when bent ---------------- */
  D.parts.bend = function (def, host) {
    const W = 1500, Hh = 600, O = [520, 250], L = 170;
    const pic = D.svg('svg', { viewBox: `0 0 ${W} ${Hh}`, width: W, height: Hh }, host);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0'; pic.style.touchAction = 'none';
    const ctl = D.el('div', 'dm-ctl', host); D.place(ctl, [960, 120, 520]);
    const read = D.el('div', 'dm-big', ctl), note = D.el('div', 'dm-read', ctl), row = D.el('div', 'dm-row', ctl);
    const bStraight = D.el('button', 'dm-btn', row, 'Straight'), bReal = D.el('button', 'dm-btn', row, 'Real water');
    const s = () => D.get('bend-' + def.id, () => ({ ang: def.start || 180 }));
    bStraight.onclick = () => { s().ang = 180; D.save(); paint(); };
    bReal.onclick = () => { s().ang = 104.5; D.save(); paint(); };
    function paint() {
      const ang = s().ang, h = ang / 2 * Math.PI / 180;
      const H1 = [O[0] - L * Math.sin(h), O[1] + L * Math.cos(h)], H2 = [O[0] + L * Math.sin(h), O[1] + L * Math.cos(h)];
      const pull = (Hp) => { const dx = O[0] - Hp[0], dy = O[1] - Hp[1], n = Math.hypot(dx, dy), px = -dy / n * 30, py = dx / n * 30; return arrow(Hp[0] + dx * 0.25 + px, Hp[1] + dy * 0.25 + py, Hp[0] + dx * 0.7 + px, Hp[1] + dy * 0.7 + py, 'f-ink k2l'); };
      const net = 2 * Math.cos(h), nx = 150, cy = O[1] + 40, len = net * 150;
      const fmt = (v) => v.toFixed(1);
      pic.innerHTML = `<path class="ch-bond" d="M${fmt(H1[0])} ${fmt(H1[1])}L${O[0]} ${O[1]}L${fmt(H2[0])} ${fmt(H2[1])}"/>` +
        `<circle class="ch-ball el-O" cx="${O[0]}" cy="${O[1]}" r="52"/><text class="ch-ballt" x="${O[0]}" y="${O[1]}" style="font-size:44px">O</text>` +
        [H1, H2].map((p, i) => `<circle class="ch-ball el-H" data-h="${i}" style="cursor:grab" cx="${fmt(p[0])}" cy="${fmt(p[1])}" r="38"/><text class="ch-ballt on-light" x="${fmt(p[0])}" y="${fmt(p[1])}" style="font-size:34px">H</text>`).join('') +
        pull(H1) + pull(H2) +
        (len > 6 ? arrow(nx, cy + len / 2, nx, cy - len / 2, 'f-ink').replace('f-ink', 'f-ink" style="stroke-width:7') + `<text class="f-t2 f-mid" x="${nx}" y="${cy + len / 2 + 40}">all the pulls</text>` : `<text class="f-t2 f-mid" x="${nx}" y="${cy + 8}">the pulls cancel</text>`) +
        (len > 6 ? `<text class="ch-delta neg" x="${O[0]}" y="${O[1] - 70}" style="font-size:40px">δ−</text>` : '');
      read.textContent = Math.round(ang) + '°';
      note.innerHTML = len > 6 ? '<b>polar</b>: a − end and a + end' : '<b>nonpolar</b>: no ends';
      bStraight.classList.toggle('on', ang > 179); bReal.classList.toggle('on', Math.abs(ang - 104.5) < 0.6);
    }
    let drag = false;
    pic.addEventListener('pointerdown', (e) => { if (!e.target.dataset || e.target.dataset.h == null) return; drag = true; pic.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation(); });
    pic.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const p = D.local(pic, e), a = Math.atan2(Math.abs(p.x - O[0]), p.y - O[1]) * 180 / Math.PI * 2;
      s().ang = D.clamp(a, 60, 180); paint();
    });
    pic.addEventListener('pointerup', () => { if (drag) D.save(); drag = false; });
    return { show() { paint(); }, reset() { paint(); } };
  };
})();

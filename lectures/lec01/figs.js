/* Lecture 1 figures, the agenda, and the null-hypothesis demo. Drawn from scratch so they recolor with the theme.
 * Each figure is what JM draws or describes on the board. The words on a figure are labels, not his sentences:
 * he says the sentences. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, arrow } = D.chem;

  const txt = (x, y, s, cls, style) => `<text class="${cls || 'f-t'}" x="${x}" y="${y}"${style ? ` style="${style}"` : ''}>${s}</text>`;
  const strike = (x1, x2, y) => `<path class="f-ink k2l" style="stroke-width:6" d="M${x1} ${y}H${x2}"/>`;
  /* marks for the yes / no grids: y yes, n no, s sort of, q unknown */
  const mark = {
    y: (x, y) => `<path class="f-ink k3l" style="stroke-width:6" d="M${x - 15} ${y}l10 11 20-24"/>`,
    n: (x, y) => `<path class="f-ink k2l" style="stroke-width:6" d="M${x - 11} ${y - 11}l22 22M${x + 11} ${y - 11}l-22 22"/>`,
    s: (x, y) => `<path class="f-ink k6l" style="stroke-width:6" d="M${x - 16} ${y + 2}c5-9 10-9 16 0s11 9 16 0"/>`,
    q: (x, y) => `<text class="f-tb f-mid" style="fill:var(--k5)" x="${x}" y="${y + 12}">?</text>`
  };

  /* the three questions of chapter 1, crossed off as the lecture goes (JM crosses them off on the board) */
  D.parts.agenda = function (def, host) {
    const items = ['What is life?', 'What is science?', 'Kinds of biology'];
    host.innerHTML = '<div style="display:flex;flex-direction:column;justify-content:center;gap:36px;height:100%">' + items.map((s, i) => {
      const done = i < (def.done || 0), now = i === def.now;
      return `<div style="display:flex;align-items:center;gap:32px;font:700 72px/1.1 var(--font-ui);color:${done ? 'var(--muted)' : now ? 'var(--accent-ink)' : 'var(--ink)'}">` +
        `<span style="flex:none;display:grid;place-items:center;width:84px;height:84px;border-radius:50%;border:4px solid currentColor;font-size:44px">${i + 1}</span>` +
        `<span style="${done ? 'text-decoration:line-through;text-decoration-color:var(--k2);text-decoration-thickness:7px' : ''}">${D.esc(s)}</span></div>`;
    }).join('') + '</div>';
  };

  /* made of cells; a cell is the smallest unit of life; a cell has organelles; an organelle is part of a cell; contains DNA */
  F.circular = () => {
    const node = (x, y, s, w) => `<rect class="f-card" x="${x - w / 2}" y="${y - 50}" width="${w}" height="100" rx="20"/><text class="f-tb f-mid" x="${x}" y="${y + 12}">${s}</text>`;
    const loop = (d, hx, y1, y2) => `<path class="f-ink k2l" style="stroke-width:5" d="${d}"/>` + arrow(hx, y1, hx, y2, 'f-ink k2l');
    return svg(1480, 640,
      st(0, node(250, 250, 'life', 260)) +
      st(1, arrow(385, 250, 615, 250) + txt(500, 232, 'made of', 'f-t2 f-mid') + node(750, 250, 'cells', 260)) +
      st(2, loop('M750 198C750 70 250 70 250 180', 250, 170, 197) + txt(500, 66, 'a cell: the smallest unit of life', 'f-t f-mid')) +
      st(3, arrow(885, 250, 1065, 250) + txt(975, 232, 'have', 'f-t2 f-mid') + node(1230, 250, 'organelles', 320)) +
      st(4, loop('M1230 302C1230 430 750 430 750 320', 750, 330, 303) + txt(990, 455, 'an organelle: a part of a cell', 'f-t f-mid')) +
      st(5, arrow(250, 305, 250, 486) + txt(270, 405, 'contains', 'f-t2') + node(250, 540, 'DNA', 260)) +
      st(6, txt(415, 550, 'the way life on Earth encodes proteins')) +
      st(7, `<rect class="f-accsoft" x="930" y="500" width="500" height="88" rx="18"/>` + txt(1180, 556, 'describing, not defining', 'f-tacc f-mid', 'font-size:34px')));
  };

  /* one match lights four different fires; a copier makes copies of the original. Then what each one has. */
  F.fireCopier = () => {
    /* a flame with two side tongues and a pale core; cls is a solid science color (k1..k6) */
    const flame = (x, y, s, cls) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" d="M0 0C-28 0-44-18-42-42C-40-60-28-70-26-88C-16-78-12-70-10-62C-6-80 2-96 0-118C16-100 30-80 30-62C34-70 38-76 40-84C50-64 46-40 40-26C34-8 20 0 0 0Z"/>` +
      `<path style="fill:var(--card);opacity:0.6" d="M0-6C-14-6-22-16-20-30C-18-44-8-50-4-66C6-54 14-42 14-28C14-14 10-6 0-6Z"/></g>`;
    const fires = [[150, 0.65, 'k4', 'paper'], [265, 0.85, 'k6', 'a dry stick'], [395, 1.05, 'k2', 'pine needles'], [505, 0.75, 'k1', 'steel wool']];
    const fire = ([y, s, cls, what]) => arrow(215, 225, 392, y - 40) + flame(450, y, s, cls) + txt(510, y - 28, what, 'f-t2');
    const page = (x) => `<g transform="translate(${x} 110)"><rect class="f-card" width="150" height="200" rx="8"/>` +
      [44, 74, 104, 134].map((y) => `<path class="f-thin" d="M22 ${y}h${y === 44 ? 70 : 106}"/>`).join('') +
      `<circle class="k5" cx="118" cy="44" r="13"/><path class="f-ink k2l" style="stroke-width:4" d="M24 170c10-14 20 14 30 0s20 14 30 0"/></g>`;
    const row = (x, y, m, s) => mark[m](x + 15, y - 9) + txt(x + 46, y, s);
    return svg(1500, 660,
      st(0, `<path class="f-ink2" style="stroke-width:8" d="M70 360L158 282"/><ellipse class="k2" cx="164" cy="277" rx="13" ry="10"/>` + flame(168, 272, 0.65, 'k4') + txt(60, 410, 'a match', 'f-t2')) +
      st(1, fire(fires[0])) +
      st(2, `<path class="f-thin" d="M770 40V640"/>` + page(820) + arrow(980, 210, 1050, 210) + page(1060) + txt(895, 350, 'the original', 'f-t2 f-mid') + txt(1135, 350, 'a copy', 'f-t2 f-mid')) +
      st(4, fires.slice(1).map(fire).join('') + row(40, 590, 'n', 'heredity: traits come from the fuel')) +
      st(5, arrow(1220, 210, 1290, 210) + page(1300) + txt(1375, 350, 'a copy', 'f-t2 f-mid') + row(810, 590, 'y', 'heredity: traits come from the original')) +
      st(7, row(810, 645, 'n', 'grows, consumes')) +
      st(8, row(40, 645, 'y', 'grows, consumes')));
  };

  /* the code evolved here, once: start over (or look on Mars) and you get a different one */
  F.reruns = () => {
    const tree = (x, tips, cls) => `<path class="f-ink" style="stroke-width:5" d="M${x} 526V330${tips.map((t) => `M${x} 330L${t} 205`).join('')}"/>` +
      tips.map((t) => `<circle class="${cls}" cx="${t}" cy="205" r="9"/>`).join('');
    const bubble = (x, cls) => `<circle class="${cls}" cx="${x}" cy="560" r="34"/><path class="f-ink k5l" style="stroke-width:4" d="M${x - 20} 560c7-10 13 10 20 0s13 10 20 0"/>`;
    const tag = (x, s, cls) => `<rect class="${cls}" x="${x - 115}" y="138" width="230" height="48" rx="12"/>` + txt(x, 171, s, 'f-t2 f-mid', 'fill:var(--ink)');
    const rover = (x, y) => `<rect class="f-card" x="${x - 60}" y="${y}" width="120" height="44" rx="8"/><path class="f-ink2" d="M${x + 40} ${y}v-40M${x + 28} ${y - 52}h26v16h-26z"/>` +
      [-45, 0, 45].map((d) => `<circle class="f-board2" style="stroke:var(--ink-2);stroke-width:3" cx="${x + d}" cy="${y + 58}" r="16"/>`).join('');
    const earth = [130, 380, 630];
    return svg(1480, 620,
      st(0, tree(380, earth, 'k3') + bubble(380, 'k6s') +
        txt(430, 568, 'RNA copying itself, in a bubble of lipids', 'f-t2') + txt(400, 450, 'a genetic code evolves', 'f-t2') + txt(400, 355, 'DNA', 'f-t2') +
        txt(130, 115, 'you', 'f-t f-mid') + txt(380, 115, 'a bacterium', 'f-t f-mid') + txt(630, 115, 'a mushroom', 'f-t f-mid')) +
      st(1, tree(1100, [900, 1100, 1300], 'k1') + bubble(1100, 'k1s') + txt(1100, 115, 'start life over', 'f-tb f-mid') + tag(1100, 'a different code', 'f-card')) +
      st(2, rover(1370, 470) + txt(1370, 600, 'or on Mars', 'f-t2 f-mid')) +
      st(3, earth.map((x) => tag(x, 'ACT → threonine', 'f-accsoft')).join('')));
  };

  /* live sperm, live egg, live zygote; live parents, back to the origin; on into a kid */
  F.chain = () => {
    const c = (x, y, r) => `<circle class="k3s" cx="${x}" cy="${y}" r="${r}"/>`;
    const R = [30, 20, 20, 20, 30];   /* the radius of each circle on a line: the origin, three ancestors, a parent */
    const line = (pts) => pts.slice(1).map((p, i) => {
      const [x1, y1] = pts[i], dx = p[0] - x1, dy = p[1] - y1, L = Math.hypot(dx, dy), a = R[i] / L, b = 1 - R[i + 1] / L;
      return `<path class="${i === 1 ? 'f-dash' : 'f-ink2'}" d="M${(x1 + a * dx).toFixed(1)} ${(y1 + a * dy).toFixed(1)}L${(x1 + b * dx).toFixed(1)} ${(y1 + b * dy).toFixed(1)}"/>`;
    }).join('');
    const up = [[150, 300], [330, 232], [520, 205], [700, 192], [870, 190]], down = [[150, 300], [330, 368], [520, 395], [700, 408], [870, 410]];
    const sperm = `<ellipse class="k3s" cx="1062" cy="190" rx="16" ry="11"/><path class="f-ink2" style="stroke:var(--k3)" d="M1046 190c-12-9-22 9-34 0s-22 9-34 0"/>`;
    return svg(1500, 600,
      st(0, sperm + c(1062, 410, 34) + c(1240, 300, 40) + arrow(1080, 200, 1203, 278) + arrow(1098, 396, 1203, 322) +
        txt(1062, 145, 'a live sperm', 'f-t2 f-mid') + txt(1062, 478, 'a live egg', 'f-t2 f-mid') + txt(1240, 372, 'a live zygote', 'f-t2 f-mid') + txt(1240, 406, 'you', 'f-t f-mid')) +
      st(1, line(up) + line(down) + [up, down].map((p) => p.slice(1, 4).map(([x, y]) => c(x, y, 20)).join('')).join('') +
        c(150, 300, 30) + c(870, 190, 30) + c(870, 410, 30) + arrow(902, 190, 974, 190) + arrow(902, 410, 1022, 410) +
        txt(870, 140, 'your father', 'f-t2 f-mid') + txt(870, 478, 'your mother', 'f-t2 f-mid') +
        txt(60, 375, 'the origin of life', 'f-t2') + txt(60, 407, '3.5 billion years ago', 'f-t2')) +
      st(2, txt(560, 560, 'never not alive', 'f-tacc f-mid', 'font-size:36px')) +
      st(3, arrow(1282, 300, 1384, 300) + c(1416, 300, 30) + txt(1416, 360, 'a kid', 'f-t2 f-mid')));
  };

  /* the time machine: one cell in your father divided, and one side of it became you */
  F.divide = () => svg(1400, 560,
    `<rect class="f-card" x="100" y="50" width="540" height="460" rx="30"/>` + txt(130, 100, 'your father', 'f-t2') +
    `<circle class="k3s" cx="260" cy="280" r="56"/>` + arrow(322, 250, 432, 196) + arrow(322, 310, 432, 364) +
    `<circle class="k3s" cx="480" cy="180" r="40"/><circle class="k3s" cx="480" cy="380" r="40"/>` + txt(260, 380, 'one cell divides', 'f-t2 f-mid') +
    `<path class="f-dash" d="M522 180H900M522 380H900"/>` + txt(770, 160, 'many divisions later', 'f-tm f-mid') +
    `<circle class="k3s" cx="950" cy="180" r="40"/><circle class="k3s" cx="950" cy="380" r="40"/>` + txt(1010, 190, 'you') + txt(1010, 390, 'your sibling'));

  /* homeo, same; stasis, stay. A level held steady: salt goes up, bring it down */
  F.homeo = () => svg(1480, 650,
    st(0, txt(735, 130, 'homeo', 'f-tb f-end', 'font-size:80px;fill:var(--k1)') + txt(745, 130, 'stasis', 'f-tb', 'font-size:80px;fill:var(--k5)') +
      txt(625, 195, 'same', 'f-t f-mid') + txt(865, 195, 'stay', 'f-t f-mid')) +
    st(1, `<path class="f-dash" d="M160 430H1390"/>` + txt(40, 438, 'steady', 'f-t2') +
      `<path class="f-ink k1l" style="stroke-width:5" d="M160 430C260 430 330 330 420 330C500 330 520 430 600 430C680 430 740 520 820 520C900 520 920 430 1000 430C1080 430 1120 345 1200 345C1280 345 1300 430 1390 430"/>` +
      arrow(420, 255, 420, 312, 'f-ink k3l') + txt(420, 240, 'salt up', 'f-t2 f-mid') +
      arrow(820, 600, 820, 540, 'f-ink k3l') + txt(820, 636, 'salt down', 'f-t2 f-mid') +
      arrow(1200, 270, 1200, 327, 'f-ink k3l') + txt(1200, 255, 'too much water', 'f-t2 f-mid')));

  /* left alone it runs down; staying the same means paying for repairs */
  F.repair = () => svg(1480, 600,
    `<path class="f-ink2" d="M140 70V520H1420"/>` + txt(160, 70, 'condition', 'f-t2') + txt(1420, 560, 'time', 'f-t2 f-end') +
    st(0, `<path class="f-ink k2l" style="stroke-width:5;stroke-dasharray:4 12" d="M150 130C500 200 900 330 1380 470"/>` + txt(1100, 476, 'left alone: entropy', 'f-t2 f-end', 'fill:var(--k2)')) +
    st(1, `<path class="f-ink k3l" style="stroke-width:5" d="M150 130L400 195V135L650 200V135L900 200V135L1150 200V135L1380 195"/>` +
      [400, 650, 900, 1150].map((x) => arrow(x + 16, 205, x + 16, 148, 'f-ink k4l')).join('') + txt(430, 260, 'energy in', 'f-t2', 'fill:var(--k4)')));

  /* "this little diagram here is life": metabolism pays for homeostasis, reproduction and growth */
  F.bills = () => {
    const box = (x, y, w, s, cls) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="90" rx="18"/><text class="f-tb f-mid" x="${x + w / 2}" y="${y + 57}">${s}</text>`;
    return svg(1500, 600,
      st(0, box(40, 255, 260, 'energy in', 'k4s') + arrow(310, 300, 400, 300) + box(410, 255, 300, 'metabolism', 'f-accsoft')) +
      st(1, arrow(720, 285, 890, 140) + box(900, 90, 360, 'homeostasis', 'k1s')) +
      st(2, arrow(720, 300, 890, 300) + box(900, 255, 360, 'reproduction', 'k5s')) +
      st(3, arrow(720, 315, 890, 460) + box(900, 420, 360, 'growth', 'k3s')) +
      st(4, txt(1290, 147, 'stay the same') + `<path class="f-ink2" d="M1278 262h20v248h-20"/>` + txt(1316, 396, 'change')) +
      st(5, txt(1080, 220, 'running from a tiger counts', 'f-tm f-mid')));
  };

  /* what each one has: a bacterium, then fire and the copy again, then the edge cases */
  F.scorecard = () => {
    const cols = [520, 760, 980, 1180], V = 1370, ys = [165, 260, 355, 450, 545];
    const rows = [['a bacterium', 'yyyy', 'yes'], ['fire', 'nssy', 'no'], ['a photocopy', 'ynnn', 'no'], ['a virus', 'ynnn', 'not really'], ['a program that copies itself', 'yqyy', '?']];
    const marks = (i) => txt(40, ys[i] + 10, rows[i][0]) + [...rows[i][1]].map((m, j) => mark[m](cols[j], ys[i])).join('');
    const verdict = (i) => txt(V, ys[i] + 11, rows[i][2], 'f-tb f-mid', rows[i][2] === 'yes' ? 'fill:var(--k3)' : '');
    const head = txt(520, 52, 'reproduces', 'f-t2 f-mid') + txt(520, 82, 'with heredity', 'f-t2 f-mid') + txt(760, 82, 'metabolism', 'f-t2 f-mid') +
      txt(980, 82, 'homeostasis', 'f-t2 f-mid') + txt(1180, 82, 'growth', 'f-t2 f-mid') + txt(V, 82, 'alive?', 'f-t2 f-mid') + `<path class="f-thin" d="M30 106H1470M1270 30V590"/>`;
    return svg(1500, 610,
      st(0, head + marks(0) + verdict(0)) + st(1, marks(1) + verdict(1)) + st(2, marks(2) + verdict(2)) +
      st(3, marks(3)) + st(4, verdict(3)) + st(5, marks(4)) + st(6, verdict(4)));
  };

  /* the pots, as JM writes them on the board: weights at time 0, 1 and 2 */
  F.pots = () => {
    const T = [690, 940, 1210], ys = [140, 245, 350, 460, 550];
    const pot = (y) => `<g transform="translate(110 ${y})"><path class="k4s" d="M-32-14h64l-10 40h-44z"/><path class="f-ink k3l" style="stroke-width:4" d="M0-14v-24"/><ellipse class="k3s" cx="9" cy="-36" rx="11" ry="6"/></g>`;
    const val = (c, r, s, style) => txt(T[c], ys[r] + 12, s, 'f-tb f-mid', style);
    const lab = (r, s) => txt(180, ys[r] + 10, s);
    return svg(1500, 600,
      txt(T[0], 50, 'time 0', 'f-t2 f-mid') + txt(T[1], 50, 'time 1', 'f-t2 f-mid') + txt(T[2], 50, 'time 2', 'f-t2 f-mid') + `<path class="f-thin" d="M40 74H1460"/>` +
      st(0, pot(ys[0]) + pot(ys[1]) + pot(ys[2]) + [0, 1, 2].map((r) => val(0, r, 'X')).join('')) +
      st(1, [0, 1, 2].map((r) => val(1, r, '1.2X')).join('')) +
      st(2, lab(0, 'control') + lab(1, 'in a vacuum tube') + lab(2, 'covered with paper') +
        `<path class="f-thin" style="stroke-width:3" d="M70 ${ys[1] + 28}V${ys[1] - 40}q40-26 80 0V${ys[1] + 28}"/><path class="f-ink2" style="stroke-width:5" d="M68 ${ys[2] - 48}h84"/>` +
        val(2, 0, '1.5X') + val(2, 1, 'dead', 'fill:var(--k2)') + val(2, 2, '1.35X')) +
      st(4, `<path class="f-thin" d="M40 405H1460"/>` + pot(ys[3]) + pot(ys[4]) + lab(3, 'less soil') + lab(4, 'more soil') +
        val(0, 3, 'Y &lt; X') + val(0, 4, 'Z &gt; X') + val(2, 3, 'grew less') + val(2, 4, 'grew no more')));
  };

  /* where the mass could come from, struck off one at a time */
  F.suspects = () => {
    const rows = [['light', 'no mass'], ['soil', 'weigh the soil before and after: no change'], ['water', 'harder: it evaporates'], ['air', 'what\'s left']];
    const ys = [100, 225, 350, 475], w = (s) => s.length * 27 + 20;
    return svg(1500, 560,
      st(5, `<rect class="f-accsoft" x="30" y="${ys[3] - 58}" width="520" height="84" rx="16"/>`) +
      st(0, rows.map(([s], i) => txt(60, ys[i], s, 'f-tb', 'font-size:52px')).join('')) +
      st(1, strike(50, 60 + w('light'), ys[0] - 16) + txt(330, ys[0] - 4, rows[0][1])) +
      st(3, strike(50, 60 + w('soil'), ys[1] - 16) + txt(330, ys[1] - 4, rows[1][1])) +
      st(4, txt(330, ys[2] - 4, rows[2][1])) +
      st(5, txt(330, ys[3] - 4, rows[3][1], 'f-tacc', 'font-size:34px')));
  };

  /* ---------------- the null hypothesis ---------------- */
  const lizard = (x, y, s, k) => `<g transform="translate(${x} ${y}) scale(${s})" style="fill:var(--${k});stroke:var(--${k})">` +
    `<ellipse rx="42" ry="13" style="stroke:none"/><ellipse cx="50" cy="-2" rx="17" ry="10" style="stroke:none"/>` +
    `<path d="M-38 0C-58 4-74 14-98 8" style="fill:none;stroke-width:7;stroke-linecap:round"/>` +
    `<path d="M-22 6l-12 18M-22-6l-12-18M22 6l12 18M22-6l12-18" style="fill:none;stroke-width:6;stroke-linecap:round"/></g>`;

  /* two lizard populations; the null says they differ by exactly zero; two dice never land six at exactly the same rate */
  F.nullFig = () => {
    const pop = (y, k, sizes) => sizes.map((s, i) => lizard(170 + i * 175, y, s, k)).join('');
    const die = (x) => `<rect class="f-card" x="${x}" y="130" width="150" height="150" rx="22" style="stroke:var(--ink-2);stroke-width:4"/>` +
      [[40, 35], [110, 35], [40, 75], [110, 75], [40, 115], [110, 115]].map(([a, b]) => `<circle cx="${x + a}" cy="${130 + b}" r="12" style="fill:var(--ink)"/>`).join('');
    return svg(1500, 620,
      st(0, txt(60, 70, 'population 1', 'f-t2') + pop(140, 'k1', [0.85, 1.05, 0.95, 0.8]) + txt(60, 240, 'population 2', 'f-t2') + pop(305, 'k2', [0.95, 0.85, 1.05, 0.9])) +
      st(1, txt(60, 430, 'null hypothesis: the difference in mass is', 'f-t2') + txt(60, 520, '0.0000000000000…', 'f-tb', 'font-size:64px')) +
      st(2, `<path class="f-thin" d="M800 40V600"/>` + txt(1145, 95, 'chance of a six', 'f-t2 f-mid') + die(915) + die(1225) +
        txt(990, 330, '1 in 5.9999999…', 'f-t f-mid') + txt(1300, 330, '1 in 6.0000001…', 'f-t f-mid')));
  };

  /* the two outcomes, as JM writes them on the board; then what failing to reject means */
  F.ptable = () => {
    const col = (x, head) =>`<rect class="f-card" x="${x}" y="20" width="640" height="500" rx="24"/>` + txt(x + 40, 100, head, 'f-tb', 'font-size:56px');
    const say = (x, y, main, sub) => txt(x + 40, y, main, 'f-t', 'font-size:34px') + txt(x + 40, y + 44, sub, 'f-t2', 'font-size:26px');
    return svg(1400, 540,
      col(40, 'p &gt; 0.05') + col(720, 'p &lt; 0.05') +
      st(0, say(40, 190, 'close enough to call them the same', 'if the assumptions hold') + say(720, 190, 'clearly different', 'given my sample size, assumptions, setup')) +
      st(1, say(40, 340, 'fail to reject', 'weak, and it never proves the null')));
  };

  /* drug 1 and drug 2 against the control; are they different from each other? */
  F.drugs = () => {
    const bar = (x, top, cls, s) => `<rect class="${cls}" x="${x}" y="${top}" width="200" height="${520 - top}" rx="6"/>` + txt(x + 100, 560, s, 'f-t f-mid');
    return svg(1480, 600,
      `<path class="f-ink2" d="M150 60V520H1300"/>` + txt(165, 60, 'blood pressure', 'f-t2') +
      bar(220, 150, 'k1s', 'control') + bar(600, 260, 'k5s', 'drug 1') + bar(980, 272, 'k5s', 'drug 2') +
      txt(700, 240, 'p = 0.051', 'f-t f-mid', 'fill:var(--muted)') + txt(1080, 252, 'p = 0.049', 'f-t f-mid', 'fill:var(--accent-ink)') +
      txt(1200, 330, 'p: each vs. control', 'f-t2') +
      `<path class="f-ink" d="M700 200V170H1080V200"/>` + txt(890, 150, '?', 'f-tb f-mid', 'font-size:64px;fill:var(--k2)'));
  };

  /* a smaller and smaller pool: soil and light out, air left; then the gas tanks: oxygen and nitrogen out, CO2 left */
  F.pool = () => {
    const xs = [220, 520, 820, 1120], names = ['light', 'soil', 'water', 'air'];
    const J = [[360, 'O₂', 'all oxygen: dies'], [760, 'N₂', 'all nitrogen: dies'], [1160, 'CO₂', 'all carbon dioxide: lives']];
    const jar = (c, gas, alive) => `<rect class="f-card" x="${c - 95}" y="240" width="190" height="230" rx="26"/>` + txt(c, 290, gas, 'f-tb f-mid') +
      (alive ? `<path class="f-ink k3l" style="stroke-width:5" d="M${c} 462V380"/><ellipse class="k3s" cx="${c - 18}" cy="405" rx="20" ry="9"/><ellipse class="k3s" cx="${c + 18}" cy="388" rx="20" ry="9"/>`
        : `<path class="f-ink2" style="stroke-width:5" d="M${c} 462C${c} 428 ${c + 6} 410 ${c + 28} 406C${c + 44} 404 ${c + 50} 414 ${c + 50} 428"/>` +
          `<ellipse class="k6s" cx="${c + 50}" cy="443" rx="7" ry="15"/><ellipse class="k6s" transform="rotate(30 ${c - 6} 444)" cx="${c - 6}" cy="444" rx="7" ry="15"/>`);
    return svg(1500, 600,
      st(0, `<rect class="f-accsoft" x="${xs[3] - 80}" y="40" width="160" height="70" rx="14"/>` +
        names.map((s, i) => txt(xs[i], 92, s, 'f-tb f-mid', i === 2 ? 'fill:var(--muted)' : '')).join('') +
        strike(xs[0] - 70, xs[0] + 70, 78) + strike(xs[1] - 56, xs[1] + 56, 78)) +
      st(2, `<rect class="f-accsoft" x="990" y="225" width="340" height="330" rx="30"/>`) +
      st(1, arrow(1120, 118, 1120, 176) + `<path class="f-ink2" d="M360 200V180H1160V200"/>` + J.map(([c, g, s], i) => jar(c, g, i === 2) + txt(c, 520, s, 'f-t2 f-mid')).join('')) +
      st(2, strike(255, 465, 512) + strike(645, 875, 512)));
  };

  /* the demo: a true difference that is never zero, and a sample size; enough lizards and p falls under 0.05 */
  const erf = (x) => { const s = Math.sign(x); x = Math.abs(x); const k = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * k - 1.453152027) * k) + 1.421413741) * k - 0.284496736) * k + 0.254829592) * k * Math.exp(-x * x)); };
  const pval = (d, n, sd) => Math.max(1e-12, 1 - erf(d / (sd * Math.sqrt(2 / n)) / Math.SQRT2));
  D.parts.nullhyp = function (def, host) {
    const SD = 6, box = D.el('div', 'dm', host);
    const plot = D.svg('svg', { viewBox: '0 0 900 560', width: 900, height: 560 }, box); plot.style.position = 'absolute'; plot.style.left = '0'; plot.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [930, 60, 560]);
    const read = D.el('div', 'dm-read', ctl), verdict = D.el('div', 'dm-big', ctl), note = D.el('div', 'dm-note', ctl);
    const s = () => D.get('null-' + def.id, () => ({ d: 0.5, x: 1.3 }));
    const n = () => Math.round(Math.pow(10, s().x));
    const dS = D.slider(ctl, { label: 'True difference', lo: 0.05, hi: 3, step: 0.05, value: s().d, width: 300, fmt: (v) => v.toFixed(2) + ' g', change: (v) => { s().d = v; D.save(); paint(); } });
    const nS = D.slider(ctl, { label: 'Lizards each', lo: 0.7, hi: 6, step: 0.05, value: s().x, width: 300, fmt: (v) => Math.round(Math.pow(10, v)).toLocaleString(), change: (v) => { s().x = v; D.save(); paint(); } });
    ctl.appendChild(read); ctl.appendChild(verdict); ctl.appendChild(note);
    function paint() {
      const d = s().d, N = n(), p = pval(d, N, SD), g = (x, m) => Math.exp(-0.5 * Math.pow((x - m) / SD, 2)), X = (v) => 40 + (v - 58) / 46 * 820;
      let a = '', b = '';
      for (let v = 58; v <= 104; v += 0.5) { a += (a ? 'L' : 'M') + X(v).toFixed(1) + ' ' + (300 - 220 * g(v, 80)).toFixed(1); b += (b ? 'L' : 'M') + X(v).toFixed(1) + ' ' + (300 - 220 * g(v, 80 + d)).toFixed(1); }
      const lp = Math.max(-8, Math.log10(p)), PX = (l) => 40 + (-l) / 8 * 820, cut = PX(Math.log10(0.05));
      plot.innerHTML = `<path d="${a}" style="fill:none;stroke:var(--k1);stroke-width:5"/><path d="${b}" style="fill:none;stroke:var(--k2);stroke-width:5"/>` +
        `<text class="f-t2" x="40" y="340">body mass of each population (g)</text>` +
        `<rect x="40" y="420" width="820" height="18" rx="9" style="fill:var(--hide)"/><path d="M${cut} 400v58" style="stroke:var(--critical);stroke-width:4"/>` +
        `<text class="f-tm" x="${cut - 24}" y="392">0.05</text><text class="f-tm" x="40" y="480">p = 1</text><text class="f-tm f-end" x="860" y="480">p = 10⁻⁸</text>` +
        `<circle cx="${PX(lp)}" cy="429" r="16" style="fill:${p < 0.05 ? 'var(--k3)' : 'var(--ink-2)'};stroke:var(--outline);stroke-width:3"/>`;
      read.innerHTML = `p = <b>${p < 0.0001 ? p.toExponential(1) : p.toFixed(4)}</b>`;
      verdict.textContent = p < 0.05 ? 'Reject the null' : 'Fail to reject';
      note.textContent = p < 0.05 ? 'Clearly different.' : (d >= 2 ? 'A real difference; too few lizards to see it clearly.' : 'Close enough. Not proof of no difference.');
    }
    return { show() { dS.set(s().d); nS.set(s().x); paint(); }, reset() { dS.set(s().d); nS.set(s().x); paint(); } };
  };
})();

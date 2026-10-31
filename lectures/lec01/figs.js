/* Lecture 1 figures and the null-hypothesis demo. Drawn from scratch so they recolor with the theme. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, t, arrow } = D.chem;

  /* the circle: life is made of cells; a cell is the smallest unit of life */
  F.circular = () => {
    const node = (x, y, s, i) => st(i, `<rect class="f-card" x="${x - 220}" y="${y - 50}" width="440" height="100" rx="20"/><text class="f-t f-mid" x="${x}" y="${y + 10}">${s}</text>`);
    return svg(1400, 560, node(700, 80, 'What is life?', 0) + st(1, arrow(700, 140, 700, 220)) + node(700, 280, 'Made up of cells', 1) +
      st(2, arrow(700, 340, 700, 420)) + node(700, 480, 'A cell: the smallest unit of life', 2) +
      st(3, `<path class="f-ink k2l" style="stroke-width:5;fill:none" d="M930 480C1180 480 1180 80 930 80"/>`) + st(3, arrow(960, 80, 925, 80, 'f-ink k2l')) + st(3, `<text class="f-tacc" x="1130" y="290">circular</text>`));
  };

  /* a fire's traits come from what it burns; a copy's from what it copies */
  F.fireCopier = () => {
    const flame = (x, y, s, cls) => `<path class="${cls}" transform="translate(${x} ${y}) scale(${s})" d="M0 0c-26 0-38-22-30-44 6-16 18-22 16-44 22 14 34 40 30 58 8-6 10-14 10-22 16 18 18 52-26 52z"/>`;
    const page = (x, smudges) => `<g transform="translate(${x} 330)"><rect class="f-card" width="140" height="180" rx="8"/>` +
      [30, 60, 90, 120, 150].map((y) => `<path class="f-thin" d="M22 ${y}h96"/>`).join('') + smudges.map(([sx, sy]) => `<circle class="k2" cx="${sx}" cy="${sy}" r="9"/>`).join('') + '</g>';
    return svg(1500, 560,
      st(0, `<path class="f-ink2" style="stroke-width:6" d="M80 230l90-60"/>${flame(185, 180, 1.1, 'k4s')}<text class="f-t2" x="60" y="290">a match</text>` +
        arrow(260, 160, 420, 70) + arrow(260, 180, 420, 180) + arrow(260, 200, 420, 290) +
        `${flame(480, 110, 0.9, 'k4s')}<text class="f-t2" x="540" y="90">paper</text>${flame(480, 220, 1.5, 'k1s')}<text class="f-t2" x="560" y="190">steel wool</text>${flame(480, 320, 1.1, 'k2s')}<text class="f-t2" x="540" y="300">pine needles</text>`) +
      st(1, `<rect class="f-accsoft" x="760" y="70" width="700" height="150" rx="18"/><text class="f-tacc" x="790" y="128">Reproduction with no heredity</text><text class="f-t2" x="790" y="178">each fire takes its traits from what it's burning</text>`) +
      st(2, `${page(80, [[110, 60]])}${arrow(240, 420, 320, 420)}${page(340, [[110, 60]])}${arrow(500, 420, 580, 420)}${page(600, [[110, 60]])}<text class="f-t2" x="800" y="430">a copier: pure inheritance</text>`) +
      st(3, `<text class="f-t2" x="800" y="480">but paper doesn't do anything else</text>`));
  };

  /* metabolism pays three bills */
  F.bills = () => {
    const box = (x, y, w, txt, cls) => `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="90" rx="18"/><text class="f-t f-mid" x="${x + w / 2}" y="${y + 56}">${txt}</text>`;
    return svg(1440, 560,
      st(0, box(40, 230, 300, 'food or light', 'k4s') + arrow(350, 275, 470, 275) + box(480, 230, 300, 'metabolism', 'f-accsoft')) +
      st(1, arrow(790, 255, 960, 110) + box(970, 60, 400, 'homeostasis', 'k1s')) +
      st(2, arrow(790, 275, 960, 275) + box(970, 230, 400, 'growth', 'k3s')) +
      st(3, arrow(790, 295, 960, 440) + box(970, 400, 400, 'reproduction', 'k5s')));
  };

  /* an unbroken chain of cells, origin to you */
  F.chain = () => {
    let cells = '';
    for (let i = 0; i < 9; i++) { const x = 120 + i * 140; cells += `<circle class="k3s" cx="${x}" cy="200" r="36"/>` + (i < 8 ? `<path class="f-ink2" d="M${x + 38} 200h64"/>` : ''); }
    return svg(1500, 520,
      st(0, `<circle class="k1s" cx="980" cy="330" r="22"/><path class="f-ink2" d="M1002 330q50 0 90-80"/><circle class="k2s" cx="1160" cy="340" r="40"/><path class="f-ink2" d="M1150 300 1220 236"/>` +
        `<text class="f-t2" x="900" y="420">a live sperm, a live egg: a live zygote</text>`) +
      st(1, `<text class="f-t2" x="70" y="120">about 3,500 million years ago</text>${cells}<text class="f-t2 f-end" x="1300" y="120">you</text><path class="f-dash" d="M420 200h40"/><path class="f-dash" d="M700 200h40"/>`) +
      st(2, `<text class="f-tacc" x="70" y="470">never not alive</text>`));
  };

  /* bacteria, archaea, eukaryotes */
  F.tree = () => svg(1400, 560,
    st(0, `<path class="f-ink" d="M700 520V420M700 420H260V120M700 420H1000V300"/><text class="f-tb f-mid" x="260" y="100">Bacteria</text>`) +
    st(1, `<path class="f-ink" d="M1000 300H760V120M1000 300H1180V220"/><text class="f-tb f-mid" x="760" y="100">Archaea</text>`) +
    st(2, `<path class="f-ink" d="M1180 220H1040V120M1180 220H1300V160M1300 160H1240V120M1300 160H1360V120"/><text class="f-t f-mid" x="1040" y="100">Plants</text><text class="f-t f-mid" x="1240" y="100">Fungi</text><text class="f-t f-mid" x="1360" y="100">Animals</text>` +
      `<text class="f-tacc f-mid" x="1200" y="270">Eukaryotes</text>`));

  /* the plant-mass experiment, and the suspects struck off one at a time */
  F.pots = () => {
    const pot = (x, label, plant, cover, soil) => `<g transform="translate(${x} 0)"><path class="k4s" d="M-70 330h140l-20 120h-100z"/><path class="f-ink2" d="M-74 330h148"/>` +
      (soil ? `<rect class="k6s" x="-56" y="${452 - soil}" width="112" height="${soil}" style="stroke:none"/>` : '') + `${plant}${cover}<text class="f-t2 f-mid" y="500">${label}</text></g>`;
    const plant = (h) => `<path class="f-ink k3l" style="stroke-width:5" d="M0 330V${330 - h}"/><path class="k3s" d="M0 ${330 - h * 0.6}c${-h * 0.45} -4 ${-h * 0.55} ${-h * 0.35} ${-h * 0.5} ${-h * 0.55} ${h * 0.3} 0 ${h * 0.5} ${h * 0.25} ${h * 0.5} ${h * 0.55}z"/>`;
    const dead = `<path class="f-ink2" d="M0 330c0-30 20-40 40-30"/>`;
    return svg(1500, 540,
      st(0, pot(120, 'X → 1.2X', plant(150), '') + `<text class="f-t2" x="40" y="60">weigh, plant a seed, wait, weigh again</text>`) +
      st(1, pot(400, 'vacuum tube: dead', dead, `<path class="f-thin" d="M-110 460V120q110-60 220 0v340"/>`)) +
      st(2, pot(680, 'paper: grows less', plant(90), `<path class="f-ink2" d="M-110 230h220"/>`)) +
      st(3, pot(1000, 'less soil: less', plant(90), '', 25) + pot(1300, 'more soil: no more', plant(150), '', 95)));
  };
  F.suspects = () => {
    const rows = [['Light', 'it has no mass'], ['Soil', 'weigh it before and after: the same'], ['Water', 'harder: it evaporates'], ['Air', 'what\'s left']];
    return svg(1000, 540, rows.map(([w, why], i) => {
      const y = 70 + i * 120, last = i === 3;
      const struck = i < 2;   /* light and soil are excluded; water is only hard to exclude; air is what is left */
      return `<text class="f-tb" x="40" y="${y}">${w}</text>` +
        (last ? st(4, `<rect class="f-accsoft" x="20" y="${y - 50}" width="880" height="72" rx="14"/><text class="f-tb" x="40" y="${y}">${w}</text><text class="f-t2" x="260" y="${y}">${why}</text>`)
          : st(i + 1, (struck ? `<path class="f-ink k2l" style="stroke-width:5" d="M30 ${y - 12}h${w.length * 22 + 30}"/>` : '') + `<text class="f-t2" x="260" y="${y}">${why}</text>`));
    }).join(''));
  };

  /* ---------------- the null hypothesis: two lizard populations ---------------- */
  const erf = (x) => { const s = Math.sign(x); x = Math.abs(x); const k = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * k - 1.453152027) * k) + 1.421413741) * k - 0.284496736) * k + 0.254829592) * k * Math.exp(-x * x)); };
  const pval = (d, n, sd) => Math.max(1e-12, 1 - erf(d / (sd * Math.sqrt(2 / n)) / Math.SQRT2));
  D.parts.nullhyp = function (def, host) {
    const SD = 6, box = D.el('div', 'dm', host);
    const plot = D.svg('svg', { viewBox: '0 0 900 560', width: 900, height: 560 }, box); plot.style.position = 'absolute'; plot.style.left = '0'; plot.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [930, 60, 560]);
    const read = D.el('div', 'dm-read', ctl), verdict = D.el('div', 'dm-big', ctl), note = D.el('div', 'dm-note', ctl);
    const s = () => D.get('null-' + def.id, () => ({ d: 0.5, x: 1.3 }));
    const n = () => Math.round(Math.pow(10, s().x));
    const dS = D.slider(ctl, { label: 'True difference', lo: 0, hi: 3, step: 0.05, value: s().d, width: 300, fmt: (v) => v.toFixed(2) + ' g', change: (v) => { s().d = v; D.save(); paint(); } });
    const nS = D.slider(ctl, { label: 'Lizards each', lo: 0.7, hi: 4.2, step: 0.05, value: s().x, width: 300, fmt: (v) => Math.round(Math.pow(10, v)).toLocaleString(), change: (v) => { s().x = v; D.save(); paint(); } });
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
      note.textContent = p < 0.05 ? 'Clearly different, given the sample size, the assumptions, the setup.' : (d >= 2 ? 'A real difference, and too few lizards to see it clearly.' : 'Close enough. Not proof there\'s no difference.');
    }
    return { show() { dS.set(s().d); nS.set(s().x); paint(); }, reset() { dS.set(s().d); nS.set(s().x); paint(); } };
  };
})();

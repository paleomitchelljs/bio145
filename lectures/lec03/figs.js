/* Lecture 3 figures, the pH scale and the blood buffer. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, mol, balls, water, arrow } = D.chem;

  /* liquid water against ice: ice holds its molecules farther apart */
  F.ice = () => {
    let liq = '', ice = '';
    const pts = [[90, 120, 20], [190, 90, 140], [150, 200, 250], [260, 180, 60], [80, 290, 200], [210, 300, 300], [300, 260, 110], [120, 380, 30], [260, 390, 180], [330, 350, 240]];
    pts.forEach(([x, y, a]) => { liq += water(x + 40, y, { a, s: 0.8 }); });
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = 900 + c * 140 + (r % 2) * 70, y = 130 + r * 130; ice += water(x, y, { a: (r + c) % 2 ? 0 : 180, s: 0.8 }) + (c < 3 ? `<path class="f-hb" d="M${x + 30} ${y}h80"/>` : ''); }
    return svg(1500, 520, st(0, liq + `<text class="f-tb" x="80" y="490">Liquid: packed, bonds breaking and re-forming</text>`) + st(1, ice + `<text class="f-tb" x="880" y="490">Ice: held apart, so it floats</text>`));
  };

  /* how many ways to write one molecule */
  F.represent = () => svg(1500, 520,
    st(0, `<text class="f-tm f-mid" x="200" y="60">formula</text><text class="f-tb f-mid" x="200" y="260" style="font-size:64px">C₂H₆O</text>`) +
    st(1, `<text class="f-tm f-mid" x="660" y="60">structural formula</text>` + mol({ atoms: [['C', 0, 0], ['C', 90, 0], ['O', 180, 0], ['H', 270, 0], ['H', 0, -80], ['H', 0, 80], ['H', -80, 0], ['H', 90, -80], ['H', 90, 80]], bonds: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8]], x: 560, y: 260, fs: 34 })) +
    st(2, `<text class="f-tm f-mid" x="1200" y="60">ball and stick</text>` + balls({ atoms: [['C', 0, 0], ['C', 80, -30], ['O', 160, 0], ['H', 210, -40], ['H', -20, 60], ['H', -40, -40], ['H', 40, 50], ['H', 90, -100], ['H', 110, 40]], bonds: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8]], x: 1110, y: 270, rs: 1.3 })) +
    st(3, `<rect class="f-accsoft" x="60" y="400" width="1380" height="90" rx="18"/><text class="f-tb f-mid" x="750" y="458">The formula tells you least. Shape is what matters.</text>`));

  /* the same carbons, four ways */
  F.skeletons = () => {
    const chain = (x, y, n, extra) => { const a = []; for (let i = 0; i < n; i++) a.push(['C', i * 70, i % 2 ? -35 : 0, true]); return mol({ atoms: a.concat(extra ? extra.atoms : []), bonds: a.slice(1).map((_, i) => [i, i + 1, extra && extra.dbl === i ? 2 : 1]).concat(extra ? extra.bonds : []), x, y }); };
    const ring = `<path class="ch-bond" style="fill:none" d="M1200 380l60 -35 60 35v70l-60 35-60-35z"/>`;
    return svg(1500, 560,
      st(0, `<text class="f-t" x="60" y="80">Length</text>` + chain(80, 180, 3) + chain(380, 180, 5)) +
      st(1, `<text class="f-t" x="820" y="80">Branching</text>` + chain(840, 180, 4) + mol({ atoms: [['C', 0, 0, true], ['C', 70, -35, true], ['C', 140, 0, true], ['C', 70, -110, true]], bonds: [[0, 1], [1, 2], [1, 3]], x: 1160, y: 200 }) + `<text class="f-tm" x="840" y="250">butane</text><text class="f-tm" x="1160" y="250">isobutane</text>`) +
      st(2, `<text class="f-t" x="60" y="340">Where the double bond sits</text>` + chain(80, 450, 4, { dbl: 0, atoms: [], bonds: [] }) + chain(380, 450, 4, { dbl: 1, atoms: [], bonds: [] })) +
      st(3, `<text class="f-t" x="1100" y="320">Rings</text>${ring}`));
  };

  /* three kinds of isomer */
  F.isomers = () => svg(1500, 560,
    st(0, `<text class="f-tb" x="40" y="60">Structural: different bonds</text>` +
      mol({ atoms: [['C', 0, 0], ['C', 80, 0], ['O', 160, 0], ['H', 230, 0]], bonds: [[0, 1], [1, 2], [2, 3]], x: 80, y: 150 }) + `<text class="f-tm" x="80" y="210">ethanol: a drink</text>` +
      mol({ atoms: [['C', 0, 0], ['O', 80, 0], ['C', 160, 0]], bonds: [[0, 1], [1, 2]], x: 420, y: 150 }) + `<text class="f-tm" x="420" y="210">dimethyl ether: a gas</text><text class="f-tm" x="80" y="250">both C₂H₆O</text>`) +
    st(1, `<text class="f-tb" x="800" y="60">Geometric: flipped across a double bond</text>` +
      mol({ atoms: [['C', 0, 0], ['C', 90, 0], ['CH₃', -60, -60], ['CH₃', 150, -60], ['H', -50, 60], ['H', 140, 60]], bonds: [[0, 1, 2], [0, 2], [1, 3], [0, 4], [1, 5]], x: 880, y: 180, fs: 30 }) + `<text class="f-tm" x="850" y="290">cis: same side</text>` +
      mol({ atoms: [['C', 0, 0], ['C', 90, 0], ['CH₃', -60, -60], ['H', 140, -60], ['H', -50, 60], ['CH₃', 150, 60]], bonds: [[0, 1, 2], [0, 2], [1, 3], [0, 4], [1, 5]], x: 1200, y: 180, fs: 30 }) + `<text class="f-tm" x="1170" y="290">trans: opposite sides</text>`) +
    st(2, `<text class="f-tb" x="40" y="360">Chiral: mirror images, like hands</text>` +
      `<g transform="translate(220 460)"><path class="k4s" d="M-70 60v-70q0-30 20-30v-40q0-14 12-14t12 14v-20q0-14 12-14t12 14v12q0-14 12-14t12 14v14q0-14 12-14t12 14v80q0 60-60 60z"/></g>` +
      `<g transform="translate(470 460) scale(-1 1)"><path class="k5s" d="M-70 60v-70q0-30 20-30v-40q0-14 12-14t12 14v-20q0-14 12-14t12 14v12q0-14 12-14t12 14v14q0-14 12-14t12 14v80q0 60-60 60z"/></g>` +
      `<path class="f-dash" d="M345 380v170"/><text class="f-t2" x="620" y="440">linalool, left-handed: orange</text><text class="f-t2" x="620" y="480">linalool, right-handed: lavender</text><text class="f-tacc" x="620" y="530">receptors read shape</text>`));

  /* the functional groups, one per step */
  F.groups = () => {
    const G = [
      ['Hydroxyl', 'alcohol', { atoms: [['R', 0, 0], ['O', 80, 0], ['H', 150, 0]], bonds: [[0, 1], [1, 2]] }],
      ['Carbonyl', 'aldehyde (end), ketone (middle)', { atoms: [['R', 0, 0], ['C', 80, 0], ['O', 80, -80], ['H', 160, 0]], bonds: [[0, 1], [1, 2, 2], [1, 3]] }],
      ['Carboxyl', 'organic acid', { atoms: [['R', 0, 0], ['C', 80, 0], ['O', 80, -80], ['O', 160, 0], ['H', 230, 0]], bonds: [[0, 1], [1, 2, 2], [1, 3], [3, 4]] }],
      ['Amino', 'amine', { atoms: [['R', 0, 0], ['N', 80, 0], ['H', 140, -50], ['H', 140, 50]], bonds: [[0, 1], [1, 2], [1, 3]] }],
      ['Phosphate', 'as in ATP', { atoms: [['R', 0, 0], ['O', 75, 0], ['P', 150, 0], ['O', 150, -75], ['O⁻', 150, 75], ['O⁻', 225, 0]], bonds: [[0, 1], [1, 2], [2, 3, 2], [2, 4], [2, 5]] }],
      ['Sulfhydryl', 'thiol: holds proteins together', { atoms: [['R', 0, 0], ['S', 80, 0], ['H', 150, 0]], bonds: [[0, 1], [1, 2]] }]
    ];
    return svg(1500, 600, G.map(([n, what, m], i) => {
      const x = 40 + (i % 3) * 490, y = 40 + Math.floor(i / 3) * 280;
      return st(i, `<rect class="f-card" x="${x}" y="${y}" width="450" height="250" rx="20"/><text class="f-tb" x="${x + 24}" y="${y + 50}">${n}</text><text class="f-t2" x="${x + 24}" y="${y + 230}">${what}</text>` + mol(Object.assign({ x: x + 70, y: y + 140, fs: 32 }, m)));
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

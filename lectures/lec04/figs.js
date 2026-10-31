/* Lecture 4 figures, joining monomers, and packing fat. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, mol, water, arrow } = D.chem;

  /* alpha and beta glucose side by side: one OH flips */
  F.alphaBeta = () => svg(1400, 520,
    st(0, F.glucose({ x: 360, y: 260, s: 1.15 }) + `<text class="f-tb f-mid" x="360" y="470">α-glucose</text><text class="f-t2 f-mid" x="360" y="510">OH on carbon 1 points down</text>`) +
    st(1, F.glucose({ x: 1040, y: 260, s: 1.15, beta: true }) + `<text class="f-tb f-mid" x="1040" y="470">β-glucose</text><text class="f-t2 f-mid" x="1040" y="510">same atoms; OH on carbon 1 points up</text>`));

  /* chains of glucose: starch coils, glycogen branches, cellulose lies straight and stacks */
  F.polysacc = () => {
    const bead = (x, y, cls) => `<polygon class="${cls}" points="${[0, 1, 2, 3, 4, 5].map((k) => [x + 16 * Math.cos(k * Math.PI / 3), y + 16 * Math.sin(k * Math.PI / 3)].join(',')).join(' ')}"/>`;
    let starch = '', glyco = '', cell = '';
    for (let i = 0; i < 16; i++) { const a = i * 0.7; starch += bead(120 + i * 22, 190 + 50 * Math.sin(a), 'k6s'); }
    const br = (x, y, n, dx, dy) => { let o = ''; for (let i = 0; i < n; i++) o += bead(x + i * dx, y + i * dy, 'k4s'); return o; };
    glyco = br(620, 200, 6, 28, 0) + br(704, 172, 4, 20, -24) + br(760, 228, 4, 24, 24) + br(788, 200, 4, 28, 0) + br(872, 172, 3, 20, -24);
    for (let r = 0; r < 3; r++) { for (let i = 0; i < 9; i++) cell += bead(1090 + i * 34, 140 + r * 50, 'k3s'); if (r < 2) for (let i = 0; i < 9; i += 2) cell += `<path class="f-hb" d="M${1090 + i * 34} ${158 + r * 50}v14"/>`; }
    return svg(1500, 520,
      st(0, starch + `<text class="f-tb" x="120" y="330">Starch</text><text class="f-t2" x="120" y="370">α-glucose; plants store it</text><text class="f-tm" x="120" y="405">amylose coils, amylopectin branches</text>`) +
      st(1, glyco + `<text class="f-tb" x="620" y="330">Glycogen</text><text class="f-t2" x="620" y="370">α-glucose; animals store it</text><text class="f-tm" x="620" y="405">heavily branched</text>`) +
      st(2, cell + `<text class="f-tb" x="1090" y="330">Cellulose</text><text class="f-t2" x="1090" y="370">β-glucose; straight chains</text><text class="f-tm" x="1090" y="405">hydrogen-bonded into fibers</text>`) +
      st(3, `<rect class="f-accsoft" x="60" y="440" width="1380" height="70" rx="16"/><text class="f-t f-mid" x="750" y="486">Same sugar. The turn of one OH decides whether you can digest it.</text>`));
  };

  /* fatty acids: straight and kinked */
  F.fattyAcids = () => {
    const zig = (x, y, n, kinkAt) => { let p = `M${x} ${y}`, cx = x, cy = y, ang = 0; for (let i = 0; i < n; i++) { if (i === kinkAt) ang += 0.6; cx += 34 * Math.cos(ang) ; cy += (i % 2 ? -18 : 18) + 34 * Math.sin(ang); p += `L${cx.toFixed(1)} ${cy.toFixed(1)}`; } return `<path class="f-ink" style="stroke:var(--lipid);stroke-width:7" d="${p}"/>`; };
    const head = (x, y) => mol({ atoms: [['C', 0, 0], ['O', -50, -40], ['OH', -60, 40]], bonds: [[0, 1, 2], [0, 2]], x, y, fs: 28 });
    return svg(1500, 520,
      st(0, head(140, 140) + zig(160, 140, 16) + `<text class="f-tb" x="760" y="140">Saturated</text><text class="f-t2" x="760" y="180">all single bonds: straight, packs tight</text><text class="f-tm" x="760" y="215">butter, lard: solid. Mammals make these.</text>`) +
      st(1, head(140, 380) + zig(160, 380, 16, 8) + `<text class="f-tb" x="760" y="370">Unsaturated</text><text class="f-t2" x="760" y="410">a C=C double bond: a kink</text><text class="f-tm" x="760" y="445">plant oils: liquid. Omega-3, omega-6: where the last double bond sits.</text>`));
  };

  /* a triglyceride: glycerol and three fatty acids, joined by ester bonds */
  F.triglyceride = () => {
    let o = `<rect class="k5s" x="120" y="80" width="120" height="340" rx="20"/><text class="f-tb f-mid" x="180" y="460">glycerol</text>`;
    [140, 250, 360].forEach((y, i) => {
      o += st(i + 1, `<circle class="k2" cx="290" cy="${y}" r="14"/><text class="f-tm" x="270" y="${y - 24}">ester</text><path style="fill:none;stroke:var(--lipid);stroke-width:12;stroke-linecap:round" d="M300 ${y}h${i === 1 ? 300 : 560}${i === 1 ? 'l80 50h180' : ''}"/>` + st(i + 1, water(1050 + i * 120, 120, { s: 0.8 })));
    });
    return svg(1500, 520, st(0, o) + st(4, `<text class="f-t2" x="860" y="300">three waters out: dehydration synthesis</text><text class="f-tacc" x="860" y="360">dense energy storage</text>`));
  };

  /* phospholipids assemble themselves into a bilayer */
  F.bilayer = () => {
    let top = '', bot = '', loose = '';
    for (let i = 0; i < 18; i++) { top += F.lipidGlyph(140 + i * 70, 190, 1.4, false, i % 3 === 1); bot += F.lipidGlyph(140 + i * 70, 420, 1.4, true, i % 4 === 2); }
    const rnd = [[200, 160, 30], [420, 300, 120], [700, 180, 200], [900, 380, 300], [1150, 220, 80], [1300, 420, 250], [560, 440, 340], [1000, 120, 160]];
    rnd.forEach(([x, y, a], i) => { loose += `<g transform="rotate(${a} ${x} ${y})">${F.lipidGlyph(x, y, 1.4, false, i % 2)}</g>`; });
    return svg(1500, 560,
      `<rect class="wat" x="40" y="20" width="1420" height="520" rx="30" style="stroke:none"/>` +
      st(0, loose + `<text class="f-t2" x="60" y="70">phospholipids loose in water</text>`, 1) +
      st(1, top + bot + `<text class="f-t2" x="60" y="70">heads face water, tails hide from it: a bilayer, with nobody assembling it</text>`));
  };

  /* HDL and LDL: two trucks */
  F.trucks = () => {
    const truck = (x, label, sub, cls, n) => {
      let o = `<g transform="translate(${x} 140)"><circle class="${cls}" cx="150" cy="150" r="${n}"/>`;
      for (let k = 0; k < 14; k++) { const a = k * Math.PI / 7; o += `<circle class="k1s" cx="${150 + n * Math.cos(a)}" cy="${150 + n * Math.sin(a)}" r="10"/>`; }
      return o + `<text class="f-tb f-mid" x="150" y="${190 + n + 40}">${label}</text><text class="f-t2 f-mid" x="150" y="${190 + n + 80}">${sub}</text></g>`;
    };
    return svg(1400, 560, st(0, truck(120, 'LDL', 'delivers fat and cholesterol out to tissues', 'lips', 120)) + st(1, truck(760, 'HDL', 'collects the surplus, back to the liver', 'k3s', 80)));
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

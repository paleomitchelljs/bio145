/* Lecture 6 figures, folding (and unfolding) a chain, and pairing bases. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, mol } = D.chem;

  /* four things that hold a fold together */
  F.forces = () => {
    const card = (i, x, y, title, body) => st(i, `<rect class="f-card" x="${x}" y="${y}" width="680" height="240" rx="22"/><text class="f-tb" x="${x + 30}" y="${y + 55}">${title}</text>${body}`);
    return svg(1440, 540,
      card(0, 20, 20, 'Disulfide bridge', `<text class="ch-lab el-S" x="200" y="160">S</text><text class="ch-lab el-S" x="300" y="160">S</text><path class="ch-bond" d="M220 160h60M140 160h40M320 160h40"/><text class="f-t2" x="400" y="170">covalent: cysteine to cysteine</text>`) +
      card(1, 740, 20, 'Ionic bond', `<circle class="k1s" cx="920" cy="160" r="34"/><text class="f-tb f-mid" x="920" y="172">+</text><circle class="k2s" cx="1040" cy="160" r="34"/><text class="f-tb f-mid" x="1040" y="172">−</text><text class="f-t2" x="1110" y="170">charged side chains</text>`) +
      card(2, 20, 290, 'Hydrogen bond', `<text class="ch-lab el-O" x="200" y="430">O</text><text class="ch-lab" x="300" y="430">H</text><text class="ch-lab el-N" x="350" y="430">N</text><path class="f-hb" d="M220 430h60"/><text class="f-t2" x="400" y="440">polar side chains</text>`) +
      card(3, 740, 290, 'Hydrophobic interaction', `<circle class="k6s" cx="910" cy="425" r="28"/><circle class="k6s" cx="960" cy="410" r="28"/><circle class="k6s" cx="950" cy="458" r="28"/><text class="f-t2" x="1030" y="440">nonpolar ones hide together</text>`));
  };

  /* a nucleotide: phosphate, sugar, base */
  F.nucleotide = () => svg(1440, 540,
    st(0, `<circle class="k4s" cx="260" cy="270" r="70"/><text class="f-tb f-mid" x="260" y="282">P</text><text class="f-t2 f-mid" x="260" y="390">phosphate</text>`) +
    st(1, `<path class="ch-bond" d="M330 270h80"/><path class="k5s" d="M420 230l70-50 70 50-26 80h-88z"/><text class="f-t2 f-mid" x="490" y="390">sugar</text>`) +
    st(2, `<path class="ch-bond" d="M560 240h90"/><rect class="k1s" x="660" y="190" width="150" height="100" rx="14"/><text class="f-t2 f-mid" x="735" y="390">base</text>`) +
    st(3, `<text class="f-t2" x="900" y="200">ribose: RNA</text><text class="f-t2" x="900" y="250">deoxyribose: DNA, one oxygen fewer</text><text class="f-t2" x="900" y="330">joined phosphate to sugar:</text><text class="f-tacc" x="900" y="375">phosphodiester backbone</text>`));

  /* purines and pyrimidines: two rings, one ring */
  F.purPyr = () => {
    const hex = (cx, cy, r) => `<polygon class="k1s" points="${[0, 1, 2, 3, 4, 5].map((k) => [cx + r * Math.cos(Math.PI / 6 + k * Math.PI / 3), cy + r * Math.sin(Math.PI / 6 + k * Math.PI / 3)].map((v) => v.toFixed(1)).join(',')).join(' ')}"/>`;
    const pent = (cx, cy, r) => `<polygon class="k1s" points="${[0, 1, 2, 3, 4].map((k) => [cx + r * Math.cos(k * 2 * Math.PI / 5), cy + r * Math.sin(k * 2 * Math.PI / 5)].map((v) => v.toFixed(1)).join(',')).join(' ')}"/>`;
    return svg(1440, 520,
      st(0, hex(300, 220, 70) + pent(410, 220, 58) + `<text class="f-tb" x="200" y="380">Purines: two rings</text><text class="f-t2" x="200" y="425">A and G</text>`) +
      st(1, hex(1000, 220, 70) + `<text class="f-tb" x="880" y="380">Pyrimidines: one ring</text><text class="f-t2" x="880" y="425">C, T, U: "cut pie"</text>`));
  };

  /* tRNA, simplified: an anticodon at one end, an amino acid at the other */
  F.trna = () => svg(1400, 560,
    st(0, `<path class="k3s" d="M700 80v120c-120-10-160 80-80 110-60 40-20 120 40 100v70h80v-70c60 20 100-60 40-100 80-30 40-120-80-110V80z"/>` +
      `<text class="f-t2" x="830" y="90">amino acid end</text><circle class="k6" cx="740" cy="60" r="20" style="stroke:var(--outline);stroke-width:3"/>`) +
    st(1, `<rect class="f-accsoft" x="650" y="480" width="180" height="56" rx="12"/><text class="f-tb f-mid" x="740" y="520">U A C</text><text class="f-t2" x="860" y="520">anticodon</text>`) +
    st(2, `<text class="f-t2" x="60" y="200">Swap the amino acid on one tRNA,</text><text class="f-t2" x="60" y="245">and every protein changes.</text><text class="f-tacc" x="60" y="300">A frozen accident.</text>`));

  /* ATP and cyclic AMP: nucleotides with other jobs */
  F.atp = () => svg(1400, 460,
    st(0, `<rect class="k1s" x="80" y="160" width="140" height="90" rx="12"/><text class="f-t f-mid" x="150" y="215">adenine</text><path class="k5s" d="M260 220l60-44 60 44-22 70h-76z"/>` +
      [0, 1, 2].map((k) => `<circle class="k4s" cx="${470 + k * 110}" cy="200" r="44"/><text class="f-tb f-mid" x="${470 + k * 110}" y="212">P</text>`).join('') + `<text class="f-tb" x="80" y="380">ATP: the cell's cash</text>`) +
    st(1, `<g transform="translate(900 0)"><rect class="k1s" x="0" y="160" width="140" height="90" rx="12"/><text class="f-t f-mid" x="70" y="215">adenine</text><path class="k5s" d="M180 220l60-44 60 44-22 70h-76z"/><circle class="k4s" cx="330" cy="300" r="40"/><text class="f-tb f-mid" x="330" y="312">P</text><path class="f-ink2" d="M300 260q40 0 30 0"/><text class="f-tb" x="0" y="380">cAMP: a signal</text></g>`));

  /* ---------------- fold a chain in water, then heat it ---------------- */
  const SEQ = 'PNPPNNPNPPNNPNPP';   /* P polar, N nonpolar */
  D.parts.fold = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1000 560', width: 1000, height: 560 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [1040, 60, 480]);
    const s = () => D.get('fold-' + def.id, () => ({ fold: 0, heat: 37 }));
    const row = D.el('div', 'dm-row', ctl), bU = D.el('button', 'dm-btn', row, 'Stretch it out'), bF = D.el('button', 'dm-btn', row, 'Let it fold');
    const h = D.slider(ctl, { label: 'Heat', lo: 20, hi: 90, step: 1, value: s().heat, width: 260, fmt: (v) => v + ' °C', change: (v) => { s().heat = v; D.save(); paint(); } });
    const out = D.el('div', 'dm-read', ctl), note = D.el('div', 'dm-note', ctl);
    bU.onclick = () => { s().fold = 0; D.save(); paint(); }; bF.onclick = () => { s().fold = 1; D.save(); paint(); };
    function paint() {
      const { fold, heat } = s(), melt = D.clamp((heat - 55) / 20, 0, 1), k = fold * (1 - melt);
      const n = SEQ.length, cx = 500, cy = 280;
      const pts = SEQ.split('').map((t, i) => {
        const line = [80 + i * 56, 280 + 30 * Math.sin(i * 1.3 + heat * 0.05)];
        const inside = t === 'N', a = i * 2 * Math.PI / n * 2.2, r = inside ? 60 + (i % 3) * 18 : 150 + (i % 2) * 20;
        const ball = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
        return [line[0] + (ball[0] - line[0]) * k, line[1] + (ball[1] - line[1]) * k, t];
      });
      let g = `<rect class="wat" x="10" y="20" width="980" height="520" rx="30" style="stroke:none"/>`;
      g += `<path class="f-ink2" style="stroke-width:4" d="M${pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L')}"/>`;
      pts.forEach((p) => { g += `<circle class="${p[2] === 'N' ? 'k6s' : 'k1s'}" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="20"/>`; });
      pic.innerHTML = g;
      out.innerHTML = melt > 0.6 && fold ? '<b>Denatured</b>: sequence intact, shape gone' : fold ? (k > 0.9 ? '<b>Folded</b>: nonpolar inside, polar out' : '<b>Loosening</b>') : '<b>Stretched</b>';
      note.textContent = 'Gold: nonpolar. Blue: polar. Nobody folds it: water does. Frying an egg breaks the hydrogen bonds.';
    }
    return { show() { h.set(s().heat); paint(); }, reset() { h.set(s().heat); paint(); } };
  };

  /* ---------------- why a purine pairs with a pyrimidine ---------------- */
  D.parts.basePair = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1500 420', width: 1500, height: 420 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [60, 440, 1400]);
    const s = () => D.get('bp-' + def.id, () => ({ p: 'AT' }));
    const row = D.el('div', 'dm-row', ctl), btns = {};
    [['AT', 'A–T'], ['GC', 'G–C'], ['AG', 'A–G (two purines)'], ['CT', 'C–T (two pyrimidines)']].forEach(([k, lab]) => { const b = D.el('button', 'dm-btn', row, lab); b.onclick = () => { s().p = k; D.save(); paint(); }; btns[k] = b; });
    const out = D.el('div', 'dm-read', ctl);
    const PUR = new Set(['A', 'G']);
    function paint() {
      const p = s().p, w = (b) => PUR.has(b) ? 2 : 1, total = w(p[0]) + w(p[1]), unit = 150, left = 300, right = 1200, mid = left + (right - left) / 2;
      Object.entries(btns).forEach(([k, b]) => b.classList.toggle('on', k === p));
      const width = total * unit, x0 = mid - width / 2;
      let g = `<path class="f-ink" style="stroke-width:10" d="M${left} 40v340M${right} 40v340"/><text class="f-tm f-mid" x="${left}" y="410">backbone</text><text class="f-tm f-mid" x="${right}" y="410">backbone</text>`;
      g += `<rect class="${PUR.has(p[0]) ? 'k1s' : 'k6s'}" x="${x0}" y="160" width="${w(p[0]) * unit}" height="100" rx="14"/><text class="f-tb f-mid" x="${x0 + w(p[0]) * unit / 2}" y="222">${p[0]}</text>`;
      g += `<rect class="${PUR.has(p[1]) ? 'k1s' : 'k6s'}" x="${x0 + w(p[0]) * unit}" y="160" width="${w(p[1]) * unit}" height="100" rx="14"/><text class="f-tb f-mid" x="${x0 + w(p[0]) * unit + w(p[1]) * unit / 2}" y="222">${p[1]}</text>`;
      g += `<path class="f-dash" d="M${left} 210H${x0}M${x0 + width} 210H${right}"/>`;
      pic.innerHTML = g;
      out.innerHTML = total === 3 ? 'One purine, one pyrimidine: <b>fits the rails exactly</b>' : total === 4 ? '<b>Too wide</b>: the helix bulges' : '<b>Too narrow</b>: the helix pinches';
    }
    return { show() { paint(); }, reset() { paint(); } };
  };
})();

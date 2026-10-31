/* Lecture 5 figures and the steroid key blank. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, mol } = D.chem;

  /* the four-ring steroid core, drawn as hexagons and a pentagon; returns ring vertices so groups can hang off them */
  function core(x, y, s) {
    const hex = (cx, cy) => [0, 1, 2, 3, 4, 5].map((k) => [cx + s * Math.cos(Math.PI / 6 + k * Math.PI / 3), cy + s * Math.sin(Math.PI / 6 + k * Math.PI / 3)]);
    const dx = s * Math.sqrt(3);
    const A = hex(x, y), B = hex(x + dx, y - 1.5 * s), C = hex(x + 2 * dx, y), pc = [x + 2 * dx + 0.95 * dx, y - 1.5 * s * 1.05];
    const P = [0, 1, 2, 3, 4].map((k) => [pc[0] + 0.88 * s * Math.cos(Math.PI / 10 + k * 2 * Math.PI / 5 + Math.PI), pc[1] + 0.88 * s * Math.sin(Math.PI / 10 + k * 2 * Math.PI / 5 + Math.PI)]);
    const path = (pts) => `<path class="f-ink" style="stroke-width:5" d="M${pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join('L')}Z"/>`;
    return { svg: path(A) + path(B) + path(C) + path(P), A, B, C, P };
  }
  const HORMONES = {
    cholesterol: { name: 'Cholesterol', note: 'the blank: liver makes what you need', left: 'HO', right: 'tail', mid: '' },
    cortisol: { name: 'Cortisol', note: 'stress; three hydroxyls', left: 'O=', right: 'C(=O)CH₂OH', mid: 'HO', extra: 'OH' },
    aldosterone: { name: 'Aldosterone', note: 'salt and water balance', left: 'O=', right: 'C(=O)CH₂OH', mid: 'HO', extra: 'CHO' },
    progesterone: { name: 'Progesterone', note: 'pregnancy; cortisol without its three OHs', left: 'O=', right: 'C(=O)CH₃', mid: '' },
    testosterone: { name: 'Testosterone', note: 'one change from progesterone', left: 'O=', right: 'OH', mid: '' },
    estradiol: { name: 'Estradiol', note: 'ring A made aromatic', left: 'HO', right: 'OH', mid: '', arom: true }
  };
  F.steroidCore = () => svg(1400, 520, st(0, `<g>${core(420, 300, 70).svg}</g><text class="f-t2" x="900" y="220">four fused rings: a key blank</text><text class="f-t2" x="900" y="270">the groups stuck on: the teeth</text>`));

  D.parts.steroid = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1100 560', width: 1100, height: 560 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [1120, 40, 400]);
    const s = () => D.get('ster-' + def.id, () => ({ h: 'cholesterol' }));
    const btns = {};
    Object.keys(HORMONES).forEach((k) => { const b = D.el('button', 'dm-btn', ctl, HORMONES[k].name); b.onclick = () => { s().h = k; D.save(); paint(); }; btns[k] = b; });
    const out = D.el('div', 'dm-read', ctl);
    function paint() {
      const h = HORMONES[s().h], c = core(260, 330, 72);
      Object.entries(btns).forEach(([k, b]) => b.classList.toggle('on', k === s().h));
      const lab = (p, dx, dy, txt, cls) => txt ? `<path class="ch-bond" d="M${p[0]} ${p[1]}l${dx * 0.6} ${dy * 0.6}"/><text class="ch-lab ${cls}" x="${p[0] + dx}" y="${p[1] + dy}" style="font-size:30px">${txt}</text>` : '';
      let g = c.svg;
      g += lab(c.A[3], -50, 10, h.left, /O/.test(h.left) ? 'el-O' : '');
      g += lab(c.P[2], 40, -60, h.right === 'tail' ? '' : h.right, 'el-O');
      if (h.right === 'tail') g += `<path class="ch-bond" d="M${c.P[2][0]} ${c.P[2][1]}l30 -50l60 0l30 -40l60 0"/>`;
      if (h.mid) g += lab(c.C[4], -20, -60, h.mid, 'el-O');
      if (h.extra) g += lab(c.C[5], 50, -40, h.extra, 'el-O');
      if (h.arom) g += `<circle class="f-ink2" cx="${260}" cy="${330}" r="38"/>`;
      g += `<text class="f-tb" x="40" y="80">${h.name}</text><text class="f-t2" x="40" y="125">${h.note}</text>`;
      pic.innerHTML = g;
      out.innerHTML = 'Same four rings. The groups decide which receptor it fits.';
    }
    return { show() { paint(); }, reset() { paint(); } };
  };

  /* which bond holds which macromolecule */
  F.bondTable = () => {
    const rows = [['Carbohydrates', 'glycosidic', 'k6s'], ['Lipids (fats)', 'ester', 'lips'], ['Proteins', 'peptide', 'k2s'], ['Nucleic acids', 'phosphodiester', 'k1s']];
    return svg(1400, 560, rows.map(([m, b, cls], i) => st(i, `<rect class="${cls}" x="120" y="${30 + i * 130}" width="1160" height="110" rx="20"/><text class="f-tb" x="160" y="${100 + i * 130}">${m}</text><text class="f-tb f-end" x="1240" y="${100 + i * 130}">${b}</text>`)).join(''));
  };

  /* an amino acid, and the three kinds of side chain */
  F.aminoAcid = () => svg(1400, 560,
    st(0, mol({ atoms: [['H₂N', -150, 0], ['C', 0, 0], ['C', 150, 0], ['O', 210, -80], ['OH', 240, 50], ['H', 0, 110], ['R', 0, -120]], bonds: [[0, 1], [1, 2], [2, 3, 2], [2, 4], [1, 5], [1, 6]], x: 450, y: 300, fs: 40 }) +
      `<rect class="k1s" x="250" y="260" width="140" height="80" rx="14" style="fill:none"/><text class="f-tm f-mid" x="320" y="380">amino</text>` +
      `<rect class="k2s" x="580" y="190" width="200" height="200" rx="14" style="fill:none"/><text class="f-tm f-mid" x="680" y="420">carboxyl</text>`) +
    st(1, `<circle class="f-accsoft" cx="450" cy="180" r="44"/><text class="f-tacc" x="520" y="170">R: the side chain, the only part that varies</text>`) +
    st(2, `<text class="f-t2" x="900" y="300">20 used by every living thing</text><text class="f-t2" x="900" y="345">hundreds exist</text><text class="f-t2" x="900" y="390">"essential": the ones you can't make</text>`));

  F.sideChains = () => {
    const col = (x, h, cls, names) => `<rect class="${cls}" x="${x}" y="40" width="420" height="440" rx="22"/><text class="f-tb f-mid" x="${x + 210}" y="100">${h}</text>` + names.map((n, i) => `<text class="f-t f-mid" x="${x + 210}" y="${170 + i * 52}">${n}</text>`).join('');
    return svg(1440, 520, st(0, col(40, 'Nonpolar', 'k6s', ['alanine', 'valine', 'leucine', 'phenylalanine', 'glycine (no side chain)', 'proline (a kink)'])) +
      st(1, col(510, 'Polar', 'k1s', ['serine', 'threonine', 'cysteine (–SH)', 'glutamine'])) + st(2, col(980, 'Charged', 'k2s', ['lysine (+)', 'arginine (+)', 'aspartate (−)', 'glutamate (−)'])));
  };

  /* a peptide bond: carboxyl meets amino, water out */
  F.peptide = () => svg(1500, 520,
    st(0, mol({ atoms: [['H₂N', -100, 0], ['C', 0, 0], ['C', 100, 0], ['O', 140, -70], ['OH', 180, 50], ['R', 0, -90]], bonds: [[0, 1], [1, 2], [2, 3, 2], [2, 4], [1, 5]], x: 200, y: 260, fs: 34 }) +
      mol({ atoms: [['H', -60, 0], ['N', 0, 0], ['H', 0, 70], ['C', 100, 0], ['C', 200, 0], ['O', 240, -70], ['OH', 280, 50], ['R', 100, -90]], bonds: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5, 2], [4, 6], [3, 7]], x: 760, y: 260, fs: 34 })) +
    st(1, `<rect class="k1s" x="350" y="270" width="80" height="70" rx="12" style="fill:none"/><rect class="k1s" x="680" y="230" width="60" height="60" rx="12" style="fill:none"/><text class="f-tacc" x="470" y="420">OH + H leave as H₂O</text>`) +
    st(2, `<path class="f-ink k2l" style="stroke-width:8" d="M420 200C520 120 640 120 720 220"/><text class="f-tb" x="460" y="110">peptide bond</text><text class="f-t2" x="1000" y="420">and again, and again: a chain</text><text class="f-tm" x="1000" y="460">hydrolysis puts the water back</text>`));

  /* four levels of structure */
  F.levels = () => {
    let beads = ''; const cls = ['k1', 'k2', 'k3', 'k4', 'k5', 'k6'];
    for (let i = 0; i < 14; i++) beads += `<circle class="${cls[(i * 5) % 6]}" cx="${60 + i * 26}" cy="120" r="12"/>`;
    let helix = ''; for (let i = 0; i < 40; i++) helix += (i ? 'L' : 'M') + (420 + i * 6) + ' ' + (120 + 34 * Math.sin(i * 0.8)).toFixed(1);
    const sheet = [0, 1, 2].map((k) => `<path class="f-ink2" style="stroke-width:10" d="M${420 + k * 0} ${200 + k * 34}h${k % 2 ? -0 : 0}h200"/>${D.chem.arrow(600, 200 + k * 34, 625, 200 + k * 34, 'f-ink2')}`).join('');
    const blob = `<path class="k3s" d="M780 90c80-60 200-20 210 60s-60 150-150 130-140-70-130-120 30-50 70-70z"/><path class="f-ink2" d="M820 120c40 30 80-20 120 20s-30 60 10 80"/>`;
    const quat = `<path class="k3s" d="M1080 100c60-40 140-10 140 50s-50 100-110 90-90-100-30-140z"/><path class="k5s" d="M1240 110c60-40 140-10 140 50s-50 100-110 90-90-100-30-140z"/>`;
    return svg(1440, 360,
      st(0, beads + `<text class="f-tb" x="40" y="320">Primary</text><text class="f-tm" x="40" y="350">the sequence</text>`) +
      st(1, `<path class="f-ink2" style="stroke-width:6" d="${helix}"/>` + sheet + `<text class="f-tb" x="420" y="320">Secondary</text><text class="f-tm" x="420" y="350">helices, sheets</text>`) +
      st(2, blob + `<text class="f-tb" x="780" y="320">Tertiary</text><text class="f-tm" x="780" y="350">the whole fold</text>`) +
      st(3, quat + `<text class="f-tb" x="1080" y="320">Quaternary</text><text class="f-tm" x="1080" y="350">several chains</text>`));
  };
})();

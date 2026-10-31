/* Lecture 8 figures and the cell map. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, arrow } = D.chem;

  /* organelles drawn in one place so the map and the figures agree */
  const O = {
    nucleus: (x, y) => `<circle class="k1s" cx="${x}" cy="${y}" r="90"/><circle class="k1" cx="${x + 20}" cy="${y - 10}" r="26" style="opacity:.5"/>`,
    rer: (x, y) => [0, 1, 2, 3].map((k) => `<path class="k5s" style="fill:none;stroke-width:9" d="M${x} ${y + k * 26}q60 -20 120 0t120 0"/>` + [0, 1, 2, 3, 4, 5].map((j) => `<circle class="k5" cx="${x + 10 + j * 44}" cy="${y + k * 26 - 10}" r="4"/>`).join('')).join(''),
    ser: (x, y) => `<path class="k3s" style="fill:none;stroke-width:9" d="M${x} ${y}c30-40 60 40 90 0s60 40 90 0M${x + 10} ${y + 34}c30-40 60 40 90 0s60 40 90 0"/>`,
    golgi: (x, y) => [0, 1, 2, 3].map((k) => `<path class="k4s" style="fill:none;stroke-width:10" d="M${x} ${y + k * 22}q90 ${-30 + k * 4} 180 0"/>`).join(''),
    mito: (x, y, r) => `<g transform="rotate(${r || 0} ${x} ${y})"><rect class="k2s" x="${x - 60}" y="${y - 28}" width="120" height="56" rx="28"/><path class="f-ink2 k2l" d="M${x - 40} ${y + 20}v-26m20 26v-26m20 26v-26m20 26v-26m20 26v-26"/></g>`,
    lyso: (x, y) => `<circle class="k6s" cx="${x}" cy="${y}" r="26"/><circle class="k6" cx="${x - 6}" cy="${y - 4}" r="4"/><circle class="k6" cx="${x + 8}" cy="${y + 6}" r="4"/>`,
    perox: (x, y) => `<circle class="k3s" cx="${x}" cy="${y}" r="22"/><rect class="k3" x="${x - 8}" y="${y - 8}" width="16" height="16" style="opacity:.6"/>`,
    ribo: (x, y) => [0, 1, 2, 3, 4, 5, 6].map((k) => `<circle class="k5" cx="${x + (k * 37) % 90}" cy="${y + (k * 23) % 60}" r="5"/>`).join(''),
    centri: (x, y) => `<rect class="f-ink2" x="${x}" y="${y}" width="16" height="44" style="fill:var(--k4-soft)"/><rect class="f-ink2" x="${x + 26}" y="${y + 14}" width="44" height="16" style="fill:var(--k4-soft)"/>`,
    vacuole: (x, y) => `<rect class="wat" x="${x}" y="${y}" width="300" height="200" rx="80"/>`,
    chloro: (x, y) => `<ellipse class="k3s" cx="${x}" cy="${y}" rx="64" ry="34"/>` + [0, 1, 2].map((k) => `<rect class="k3" x="${x - 40 + k * 28}" y="${y - 14}" width="18" height="28" rx="3"/>`).join('')
  };

  /* ---------------- the cell map: click a part, read its job ---------------- */
  const PARTS = {
    nucleus: ['Nucleus', 'holds the DNA; the nucleolus builds ribosomes', 'both'],
    rer: ['Rough ER', 'ribosome-studded; makes proteins for export and membranes', 'both'],
    ser: ['Smooth ER', 'makes lipids; detoxifies (lots in liver)', 'both'],
    golgi: ['Golgi', 'reads sugar tags; ships to the surface, out, or to lysosomes', 'both'],
    mito: ['Mitochondrion', 'glucose into ATP: the currency exchange', 'both'],
    ribo: ['Ribosomes', 'build proteins from mRNA', 'both'],
    perox: ['Peroxisome', 'catalase: hydrogen peroxide into water and oxygen', 'both'],
    lyso: ['Lysosome', 'hydrolytic enzymes; recycling', 'animal'],
    centri: ['Centrioles', 'organize microtubules', 'animal'],
    vacuole: ['Central vacuole', 'water and solutes; turgor pressure', 'plant'],
    chloro: ['Chloroplast', 'light into sugar', 'plant'],
    wall: ['Cell wall', 'a box outside the membrane', 'plant']
  };
  D.parts.cellMap = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1000 620', width: 1000, height: 620 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [1030, 40, 500]);
    const s = () => D.get('cell-' + def.id, () => ({ plant: false, pick: null }));
    const row = D.el('div', 'dm-row', ctl), bA = D.el('button', 'dm-btn', row, 'Animal'), bP = D.el('button', 'dm-btn', row, 'Plant');
    const name = D.el('div', 'dm-big', ctl), job = D.el('div', 'dm-read', ctl), where = D.el('div', 'dm-note', ctl);
    bA.onclick = () => { s().plant = false; s().pick = null; D.save(); paint(); }; bP.onclick = () => { s().plant = true; s().pick = null; D.save(); paint(); };
    function paint() {
      const { plant, pick } = s();
      bA.classList.toggle('on', !plant); bP.classList.toggle('on', plant);
      const g = (k, inner) => `<g data-k="${k}" style="cursor:pointer;opacity:${pick && pick !== k ? 0.35 : 1}">${inner}</g>`;
      let o = plant ? g('wall', `<rect x="20" y="20" width="960" height="580" rx="40" style="fill:none;stroke:var(--k3);stroke-width:18"/>`) + `<rect x="44" y="44" width="912" height="532" rx="30" style="fill:var(--card);stroke:var(--ink-2);stroke-width:3"/>`
        : `<ellipse cx="500" cy="310" rx="470" ry="280" style="fill:var(--card);stroke:var(--ink-2);stroke-width:3"/>`;
      if (plant) o += g('vacuole', O.vacuole(560, 300)) + g('chloro', O.chloro(200, 470) + O.chloro(850, 150) + O.chloro(820, 520));
      o += g('nucleus', O.nucleus(300, 230)) + g('rer', O.rer(140, 380)) + g('ser', O.ser(430, 470)) + g('golgi', O.golgi(plant ? 640 : 560, plant ? 90 : 160));
      o += g('mito', O.mito(plant ? 440 : 760, plant ? 120 : 330, 20) + O.mito(plant ? 160 : 650, plant ? 110 : 470, -30));
      o += g('ribo', O.ribo(470, 300)) + g('perox', O.perox(plant ? 900 : 820, plant ? 330 : 200));
      if (!plant) o += g('lyso', O.lyso(870, 420) + O.lyso(600, 330)) + g('centri', O.centri(450, 140));
      pic.innerHTML = o;
      pic.querySelectorAll('[data-k]').forEach((e) => e.addEventListener('click', (ev) => { ev.stopPropagation(); s().pick = s().pick === e.dataset.k ? null : e.dataset.k; D.save(); paint(); }));
      const p = pick && PARTS[pick];
      name.textContent = p ? p[0] : (plant ? 'A plant cell' : 'An animal cell');
      job.textContent = p ? p[1] : 'Click a part.';
      where.textContent = p ? (p[2] === 'both' ? 'plants and animals' : p[2] + ' cells only') : (plant ? 'Plants have mitochondria too. The chloroplast is a bonus.' : 'A made-up cell: real ones are never this tidy.');
    }
    return { show() { paint(); }, reset() { paint(); } };
  };

  /* DNA to mRNA to protein: generic machine, specific instructions */
  F.dogma = () => svg(1500, 500,
    st(0, `<rect class="k1s" x="40" y="200" width="300" height="90" rx="18"/><text class="f-tb f-mid" x="190" y="257">DNA</text><text class="f-tm f-mid" x="190" y="330">the blueprint, in the nucleus</text>`) +
    st(1, arrow(350, 245, 520, 245) + `<text class="f-t2 f-mid" x="435" y="220">transcription</text><rect class="k5s" x="530" y="210" width="300" height="70" rx="16"/><text class="f-tb f-mid" x="680" y="257">mRNA</text>`) +
    st(2, arrow(840, 245, 1010, 245) + `<text class="f-t2 f-mid" x="925" y="220">translation</text><ellipse class="k4s" cx="1100" cy="245" rx="90" ry="70"/><text class="f-t f-mid" x="1100" y="255">ribosome</text>` + arrow(1200, 245, 1300, 245) + `<path class="k2s" d="M1320 230c40-50 90 40 130 0s20 60-40 60-100-20-90-60z"/><text class="f-t2 f-mid" x="1380" y="340">protein</text>`) +
    st(3, `<rect class="f-accsoft" x="300" y="390" width="900" height="80" rx="16"/><text class="f-t f-mid" x="750" y="440">Generic machine, specific mRNA: a 3D printer. Two mRNAs, two proteins.</text>`));

  /* the route out: ER, vesicle, Golgi, vesicle, membrane */
  F.secretion = () => svg(1500, 560,
    `<path d="M1460 40V520" style="stroke:var(--ink-2);stroke-width:8"/><text class="f-tm" x="1300" y="545">plasma membrane</text>` +
    st(0, O.nucleus(150, 280) + `<text class="f-t2 f-mid" x="150" y="420">mRNA out of the nucleus</text>`) +
    st(1, O.rer(260, 200) + `<text class="f-t2" x="270" y="330">rough ER: made inside</text>`) +
    st(2, `<circle class="k5s" cx="610" cy="250" r="22"/>${arrow(560, 250, 585, 250, 'f-ink2')}<text class="f-t2 f-mid" x="610" y="320">vesicle</text>`) +
    st(3, O.golgi(700, 200) + `<text class="f-tm" x="690" y="190">cis</text><text class="f-tm" x="850" y="300">trans</text><text class="f-t2" x="700" y="360">Golgi: sugar tag read, sorted</text>`) +
    st(4, `<circle class="k4s" cx="1050" cy="150" r="22"/><circle class="k4s" cx="1200" cy="250" r="22"/><circle class="k6s" cx="1080" cy="430" r="26"/>` +
      arrow(900, 220, 1025, 160, 'f-ink2') + arrow(910, 240, 1175, 250, 'f-ink2') + arrow(900, 270, 1060, 410, 'f-ink2') +
      `<text class="f-t2" x="1090" y="120">out of the cell</text><text class="f-t2" x="1230" y="300">into the membrane</text><text class="f-t2" x="1120" y="470">to a lysosome</text>`));

  /* turgor: crisp and wilted */
  F.turgor = () => svg(1400, 500,
    st(0, `<rect class="f-ink2" x="100" y="60" width="400" height="320" rx="16" style="fill:none;stroke:var(--k3);stroke-width:12"/><rect class="wat" x="130" y="90" width="340" height="260" rx="30"/><text class="f-tb f-mid" x="300" y="440">crisp: the vacuole pushes on the wall</text>`) +
    st(1, `<rect class="f-ink2" x="860" y="60" width="400" height="320" rx="16" style="fill:none;stroke:var(--k3);stroke-width:12"/><path class="wat" d="M930 160q60 -40 140 0t140 20v120q-80 30-140 0t-140 -20z"/><text class="f-tb f-mid" x="1060" y="440">wilted: water gone, nothing pushes</text>`));

  /* gold and dollars */
  F.money = () => svg(1500, 480,
    st(0, `<ellipse class="k3s" cx="200" cy="220" rx="150" ry="80"/><text class="f-tb f-mid" x="200" y="232">chloroplast</text><text class="f-t2 f-mid" x="200" y="350">the mine</text>`) +
    st(1, arrow(360, 220, 520, 220) + `<circle class="k6s" cx="620" cy="220" r="70"/><text class="f-tb f-mid" x="620" y="232">glucose</text><text class="f-t2 f-mid" x="620" y="350">gold</text>`) +
    st(2, arrow(700, 220, 860, 220) + `<rect class="k2s" x="870" y="160" width="280" height="120" rx="60"/><text class="f-tb f-mid" x="1010" y="232">mitochondrion</text><text class="f-t2 f-mid" x="1010" y="350">the exchange</text>`) +
    st(3, arrow(1160, 220, 1290, 220) + `<rect class="k1s" x="1300" y="170" width="160" height="100" rx="16"/><text class="f-tb f-mid" x="1380" y="232">ATP</text><text class="f-t2 f-mid" x="1380" y="350">dollars</text><text class="f-tm f-mid" x="750" y="440">McDonald's can't take gold.</text>`));
})();

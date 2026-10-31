/* Lecture 2 figures, the atom builder and the electronegativity tug-of-war. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, mol, balls, bohr, water, arrow } = D.chem;

  /* what a body is made of, against what Earth is made of (percent of mass) */
  F.bodyEarth = () => {
    const bar = (x, label, parts) => {
      let y = 520, o = `<text class="f-tb f-mid" x="${x + 90}" y="560">${label}</text>`;
      parts.forEach(([el, pct, cls]) => { const h = pct * 4.4; y -= h; o += `<rect class="${cls}" x="${x}" y="${y}" width="180" height="${h}"/>` + (pct > 6 ? `<text class="f-t f-mid" x="${x + 90}" y="${y + h / 2 + 10}" style="fill:#fff">${el} ${pct}%</text>` : ''); });
      return o;
    };
    return svg(1400, 600,
      st(0, bar(200, 'You', [['O', 65, 'k2'], ['C', 18, 'k5'], ['H', 10, 'k1'], ['N', 3, 'k3'], ['', 4, 'f-board2']]) + `<text class="f-t2" x="420" y="330">C, H, O, N: about 96%</text><text class="f-t2" x="420" y="370">P, S, Ca, Na, K, Cl: most of the rest</text><text class="f-t2" x="420" y="410">iron in hemoglobin, a trace</text>`) +
      st(1, bar(1000, 'Earth', [['Fe', 32, 'k4'], ['O', 30, 'k2'], ['Si', 15, 'k6'], ['Mg', 14, 'k3'], ['', 9, 'f-board2']]) + `<text class="f-t2" x="1000" y="80">Fe, O, Si, Mg: about 92%</text>`));
  };

  /* the paddleball: an electron's average distance, and a harder hit */
  F.paddle = () => {
    const pad = (x, y, len, ball) => `<g transform="translate(${x} ${y})"><ellipse class="k4s" cx="0" cy="0" rx="70" ry="90"/><path class="f-ink" style="stroke-width:12" d="M0 90v110"/>` +
      `<path class="f-dash" d="M0 0Q${len * 0.4} ${-len * 0.6} ${len} ${-len * 0.3}"/><circle class="${ball}" cx="${len}" cy="${-len * 0.3}" r="22"/></g>`;
    return svg(1300, 520, st(0, pad(260, 300, 220, 'k1') + `<text class="f-t2" x="120" y="80">ball: electron · string: pull of the nucleus</text>`) +
      st(1, pad(820, 300, 380, 'k6') + `<text class="f-t2" x="760" y="80">hit it harder (add energy, like a photon):</text><text class="f-t2" x="760" y="115">it travels farther from the nucleus</text>`));
  };

  /* sharing a pair: H2, then O2 with a double bond */
  F.covalent = () => {
    const ring = (x, y, r, cls) => `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
    return svg(1440, 520,
      st(0, `<text class="f-t2" x="60" y="70">two hydrogens, one electron each</text>` + ring(240, 230, 80, 'k1s') + ring(380, 230, 80, 'k1s') + `<circle class="k2" cx="240" cy="230" r="12"/><circle class="k2" cx="380" cy="230" r="12"/>` +
        `<circle class="k6" cx="310" cy="205" r="11"/><circle class="k6" cx="310" cy="255" r="11"/><text class="f-tb f-mid" x="310" y="390">H–H</text><text class="f-t2 f-mid" x="310" y="430">one shared pair: a single bond</text>`) +
      st(1, `<text class="f-t2" x="760" y="70">two oxygens, six valence electrons each</text>` + ring(960, 230, 100, 'k2s') + ring(1140, 230, 100, 'k2s') + `<circle class="k2" cx="960" cy="230" r="14"/><circle class="k2" cx="1140" cy="230" r="14"/>` +
        [190, 215, 245, 270].map((y) => `<circle class="k6" cx="1050" cy="${y}" r="10"/>`).join('') + `<text class="f-tb f-mid" x="1050" y="390">O=O</text><text class="f-t2 f-mid" x="1050" y="430">two shared pairs: a double bond</text>`));
  };

  /* water is bent and lopsided; methane is symmetric */
  F.waterMethane = () => svg(1400, 520,
    st(0, water(380, 220, { a: 180, s: 2.2, d: true, lab: true }) + `<text class="f-tb f-mid" x="380" y="450">Water: bent, polar</text>`) +
    st(1, balls({ atoms: [['C', 0, 0], ['H', 0, -95], ['H', 90, 30], ['H', -90, 30], ['H', 0, 85]], bonds: [[0, 1], [0, 2], [0, 3], [0, 4]], x: 1020, y: 230, rs: 1.6 }) + `<text class="f-tb f-mid" x="1020" y="450">Methane: symmetric, nonpolar</text>`));

  /* sodium hands an electron to chlorine */
  F.redox = () => svg(1440, 560,
    st(0, bohr(260, 250, { p: 11, n: 12, e: 11, r: 34 }) + `<text class="f-tb f-mid" x="260" y="520">Na: 11 p, 11 e⁻</text>`) +
    st(0, bohr(1100, 250, { p: 17, n: 18, e: 17, r: 38 }) + `<text class="f-tb f-mid" x="1100" y="520">Cl: 17 p, 17 e⁻</text>`) +
    st(1, `<path class="f-hb" style="stroke-width:5" d="M430 120Q680 0 930 120"/>${arrow(900, 104, 935, 122, 'f-ink')}<text class="f-tacc f-mid" x="680" y="70">one electron moves</text>`) +
    st(2, `<rect class="k2s" x="140" y="20" width="240" height="60" rx="14"/><text class="f-t f-mid" x="260" y="60">oxidized: Na⁺</text><rect class="k1s" x="980" y="20" width="240" height="60" rx="14"/><text class="f-t f-mid" x="1100" y="60">reduced: Cl⁻</text>`));

  /* ---------------- the atom builder ---------------- */
  const EL = ['', 'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
  const NAME = ['', 'hydrogen', 'helium', 'lithium', 'beryllium', 'boron', 'carbon', 'nitrogen', 'oxygen', 'fluorine', 'neon', 'sodium', 'magnesium', 'aluminum', 'silicon', 'phosphorus', 'sulfur', 'chlorine', 'argon', 'potassium', 'calcium'];
  const COMMON_N = [0, 0, 2, 4, 5, 6, 6, 7, 8, 10, 10, 12, 12, 14, 14, 16, 16, 18, 22, 20, 20];
  D.parts.atomBuilder = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 700 600', width: 700, height: 600 }, box);
    pic.style.position = 'absolute'; pic.style.left = '20px'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [780, 30, 720]);
    const s = () => D.get('atom-' + def.id, () => ({ p: 6, n: 6, e: 6 }));
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
      note.textContent = 'Protons set the element. Neutrons set the mass. Electrons set the charge.';
    }
    return { show() { paint(); }, reset() { paint(); } };
  };

  /* ---------------- the tug of war over a shared pair ---------------- */
  const EN = { H: 2.20, C: 2.55, N: 3.04, O: 3.44, Na: 0.93, Cl: 3.16, K: 0.82, S: 2.58 };
  D.parts.tug = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1500 360', width: 1500, height: 360 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [60, 380, 1400]);
    const s = () => D.get('tug-' + def.id, () => ({ a: 'C', b: 'H' }));
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
})();

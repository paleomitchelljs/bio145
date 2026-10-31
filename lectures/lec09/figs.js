/* Lecture 9 figures and the walking kinesin. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, arrow } = D.chem;

  /* inside a mitochondrion and a chloroplast */
  F.inside = () => {
    let cristae = ''; for (let i = 0; i < 6; i++) cristae += `<path class="f-ink2 k2l" style="stroke-width:5" d="M${150 + i * 55} 320v-${i % 2 ? 90 : 120}"/>`;
    let grana = ''; for (let g = 0; g < 4; g++) for (let k = 0; k < 4; k++) grana += `<rect class="k3" x="${880 + g * 110}" y="${230 + k * 22 - (g % 2) * 30}" width="70" height="16" rx="6"/>`;
    return svg(1500, 520,
      st(0, `<rect class="k2s" x="80" y="140" width="500" height="240" rx="120"/><rect class="f-thin" x="105" y="165" width="450" height="190" rx="95"/>${cristae}` +
        `<text class="f-tb" x="80" y="80">Mitochondrion</text><text class="f-t2" x="80" y="440">double membrane; the inner one folded into cristae</text>`) +
      st(1, `<ellipse class="k3s" cx="1080" cy="260" rx="330" ry="150"/><ellipse class="f-thin" cx="1080" cy="260" rx="306" ry="128"/>${grana}` +
        `<text class="f-tb" x="760" y="80">Chloroplast</text><text class="f-t2" x="760" y="460">double membrane; thylakoids stacked into grana</text>`));
  };

  /* three fibers, to scale */
  F.fibers = () => svg(1500, 520,
    st(0, `<rect class="k1s" x="60" y="70" width="1100" height="100" rx="50"/><rect x="80" y="100" width="1060" height="40" rx="20" style="fill:var(--board)"/><text class="f-tb" x="1200" y="110">Microtubules</text><text class="f-t2" x="1200" y="150">25 nm, hollow: tubulin</text>`) +
    st(1, `<rect class="k4s" x="60" y="240" width="1100" height="40" rx="20"/><text class="f-tb" x="1200" y="260">Intermediate filaments</text><text class="f-t2" x="1200" y="300">~10 nm, rope: keratin and others</text>`) +
    st(2, `<path class="k2l" style="fill:none;stroke-width:12" d="M60 400c40-20 80 20 120 0s80 20 120 0 80 20 120 0 80 20 120 0 80 20 120 0 80 20 120 0 80 20 120 0 80 20 120 0 80 20 120 0"/><text class="f-tb" x="1200" y="390">Microfilaments</text><text class="f-t2" x="1200" y="430">7 nm, solid: two twisted strands of actin</text>`) +
    st(3, `<text class="f-tacc" x="60" y="500">The naming is backwards: a tubule is hollow, a filament solid. Microtubules are the big ones.</text>`));

  /* a microtubule grows at the plus end */
  F.tubulin = () => {
    let col = ''; for (let i = 0; i < 12; i++) col += `<rect class="${i % 2 ? 'k1' : 'k5'}" x="${200 + i * 70}" y="200" width="68" height="70" rx="12"/>`;
    return svg(1500, 480,
      st(0, col + `<text class="f-t2" x="200" y="330">α and β tubulin dimers; 13 protofilaments around a hollow center</text>`) +
      st(1, `<rect class="k1" x="1060" y="200" width="68" height="70" rx="12" style="opacity:.6"/><rect class="k5" x="1130" y="200" width="68" height="70" rx="12" style="opacity:.6"/>${arrow(1240, 160, 1180, 195, 'f-ink2')}<text class="f-tacc" x="1080" y="140">+ end: added</text>`) +
      st(2, `${arrow(190, 235, 110, 235, 'f-ink2')}<text class="f-tacc" x="40" y="180">− end: removed</text><text class="f-t2" x="200" y="420">Something can move with nothing to push against.</text>`));
  };

  /* nine pairs around two: a cilium in cross section */
  F.cilium = () => {
    let o = `<circle class="f-card" cx="400" cy="260" r="220"/>`;
    for (let k = 0; k < 9; k++) { const a = k * 2 * Math.PI / 9, x = 400 + 160 * Math.cos(a), y = 260 + 160 * Math.sin(a); o += `<circle class="k1s" cx="${x - 14 * Math.sin(a)}" cy="${y + 14 * Math.cos(a)}" r="20"/><circle class="k1s" cx="${x + 14 * Math.sin(a)}" cy="${y - 14 * Math.cos(a)}" r="20"/>`; o += st(1, `<path class="f-ink2 k4l" style="stroke-width:5" d="M${x} ${y}l${-30 * Math.cos(a + 0.6)} ${-30 * Math.sin(a + 0.6)}"/>`); }
    o += `<circle class="k1s" cx="380" cy="260" r="20"/><circle class="k1s" cx="420" cy="260" r="20"/>`;
    return svg(1400, 520, st(0, o + `<text class="f-tb" x="720" y="160">9 + 2</text><text class="f-t2" x="720" y="210">nine pairs around two</text>`) +
      st(1, `<text class="f-t2" x="720" y="290">dynein arms (orange) walk on the neighbors:</text><text class="f-t2" x="720" y="330">sliding, held at the base, becomes bending</text>`) +
      st(2, `<text class="f-t2" x="720" y="420">anchored in a basal body (9 triplets, like a centriole)</text>`));
  };

  /* the extracellular matrix and integrins */
  F.ecm = () => {
    let mem = ''; for (let i = 0; i < 24; i++) mem += F.lipidGlyph(80 + i * 55, 270, 1.1, false, i % 4 === 1) + F.lipidGlyph(80 + i * 55, 380, 1.1, true, i % 5 === 2);
    return svg(1500, 560,
      st(0, mem + `<text class="f-tm" x="60" y="480">plasma membrane</text>`) +
      st(1, `<path class="k6l" style="fill:none;stroke-width:8" d="M60 120c200-60 400 60 700 0s500-50 700 10"/><path class="k6l" style="fill:none;stroke-width:8" d="M80 170c300 50 500-40 800 0s400 40 600-10"/><text class="f-t2" x="60" y="70">outside: fibronectin and collagen, a sugary glycocalyx</text>`) +
      st(2, `<rect class="k5s" x="700" y="150" width="40" height="300" rx="14"/><rect class="k5s" x="760" y="150" width="40" height="300" rx="14"/><text class="f-tacc" x="830" y="240">integrin</text><text class="f-t2" x="830" y="280">grips the matrix outside and the actin inside</text>`) +
      st(3, `<path class="k2l" style="fill:none;stroke-width:10" d="M750 450c-40 40-200 60-400 70M750 450c60 40 300 50 500 60"/><text class="f-t2" x="300" y="545">actin (microfilaments) inside: anchor to push</text>`));
  };

  /* a plant cell wall, layer by layer outward */
  F.wall = () => {
    const layer = (x, w, cls, name, sub, i) => st(i, `<rect class="${cls}" x="${x}" y="60" width="${w}" height="380"/><text class="f-t f-mid" x="${x + w / 2}" y="480">${name}</text><text class="f-tm f-mid" x="${x + w / 2}" y="510">${sub}</text>`);
    return svg(1500, 540, `<rect class="f-board2" x="40" y="60" width="200" height="380"/><text class="f-t2 f-mid" x="140" y="260">cytoplasm</text>` +
      layer(240, 30, 'k1', '', '', 0) + `<text class="f-tm" x="200" y="40">membrane</text>` +
      layer(270, 260, 'k6s', 'secondary wall', 'rigid, lignin; laid down last', 1) + layer(530, 200, 'k3s', 'primary wall', 'thin, flexible, growing', 2) +
      layer(730, 120, 'k4s', 'middle lamella', 'pectin: jelly', 3) + layer(850, 200, 'k3s', 'next cell', 'its primary wall', 4) +
      st(5, `<rect class="f-accsoft" x="1090" y="160" width="370" height="150" rx="16"/><text class="f-t2" x="1110" y="215">like a growing bone:</text><text class="f-t2" x="1110" y="260">flexible while it grows,</text><text class="f-t2" x="1110" y="300">rigid once it stops</text>`));
  };

  /* a crawling cell: actin built at the front, taken apart at the back */
  F.crawl = () => {
    let mesh = '';
    for (let i = 0; i < 26; i++) { const a = -0.9 + i * 0.07, r = 200 + (i % 3) * 8; mesh += `<path class="f-ink2 k2l" style="stroke-width:3" d="M${380 + (r - 70) * Math.cos(a)} ${300 + (r - 70) * Math.sin(a)}L${380 + r * Math.cos(a)} ${300 + r * Math.sin(a)}"/>`; }
    return svg(760, 620,
      st(0, `<path class="k5s" d="M120 300c0-120 120-170 260-170 140 0 220 70 220 170s-80 170-220 170c-140 0-260-50-260-170z"/><circle class="k1s" cx="300" cy="300" r="60"/>` + mesh +
        D.chem.arrow(620, 300, 720, 300, 'f-ink') + `<text class="f-t2" x="40" y="70">actin built at the leading edge pushes it forward</text><text class="f-tm" x="40" y="560">and taken apart at the back: no motor needed to crawl</text>`));
  };

  /* ---------------- kinesin walks: one ATP a step ---------------- */
  D.parts.kinesin = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 1500 460', width: 1500, height: 460 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [60, 480, 1400]);
    const s = () => D.get('kin-' + def.id, () => ({ steps: 0 }));
    const row = D.el('div', 'dm-row', ctl), bS = D.el('button', 'dm-btn', row, 'One ATP: step'), bR = D.el('button', 'dm-btn', row, 'Back to start');
    const out = D.el('div', 'dm-read', ctl);
    let anim = 0, k = 1, stop = () => {};
    bS.onclick = () => { if (s().steps >= 12) return; s().steps++; D.save(); stop(); k = 0; stop = D.tween(600, (t) => { k = t; paint(); }); };
    bR.onclick = () => { s().steps = 0; D.save(); k = 1; paint(); };
    function paint() {
      const n = s().steps, step = 92, base = 160, lead = base + (n + (n % 2 ? 0 : 0)) * step;
      let g = '';
      for (let i = 0; i < 15; i++) g += `<rect class="${i % 2 ? 'k1' : 'k5'}" x="${60 + i * 92}" y="330" width="90" height="50" rx="10"/>`;
      g += `<text class="f-tm" x="60" y="420">− end</text><text class="f-tm f-end" x="1440" y="420">+ end</text><text class="f-t2" x="560" y="420">the microtubule does not move</text>`;
      const front = base + n * step, back = front - step, swing = Math.sin(Math.PI * Math.min(1, k)) * 80;
      const moving = n % 2 ? 'a' : 'b';
      const feet = { a: n % 2 ? front - step * (1 - k) : back, b: n % 2 ? back : front - step * (1 - k) };
      const hipX = (feet.a + feet.b) / 2 + 45, hipY = 170;
      ['a', 'b'].forEach((f) => { const x = feet[f] + 45, lift = f === moving && k < 1 ? swing : 0; g += `<path class="f-ink" style="stroke-width:10" d="M${hipX} ${hipY}L${x} ${300 - lift}"/><ellipse class="k4s" cx="${x}" cy="${310 - lift}" rx="40" ry="22"/>`; });
      g += `<path class="f-ink" style="stroke-width:8" d="M${hipX} ${hipY}V90"/><circle class="k3s" cx="${hipX}" cy="60" r="40"/><text class="f-tm f-mid" x="${hipX}" y="66">cargo</text>`;
      pic.innerHTML = g;
      out.innerHTML = `<b>${n}</b> steps, <b>${n}</b> ATP, about <b>${n * 8}</b> nm toward the + end` + (n >= 12 ? ' · end of the track' : '');
    }
    return { show() { paint(); }, hide() { stop(); }, reset() { k = 1; paint(); } };
  };
})();

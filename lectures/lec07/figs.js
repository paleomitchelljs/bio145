/* Lecture 7 figures, diffusion, and the cube. */
(function () {
  'use strict';
  const D = window.Deck, F = D.figs, { svg, st, arrow } = D.chem;

  /* small is not one thing: pairs at the same ratio */
  F.ratios = () => {
    const pair = (y, a, ra, b, rb, c, d, i) => st(i, `<circle class="k1s" cx="160" cy="${y}" r="${ra}"/><text class="f-t" x="220" y="${y + 10}">${a}</text><text class="f-tm" x="560" y="${y + 10}">:</text>` +
      `<circle class="k5s" cx="${640 + rb}" cy="${y}" r="${rb}"/><text class="f-t" x="${660 + 2 * rb}" y="${y + 10}">${b}</text><text class="f-tacc" x="1060" y="${y + 10}">as ${c} to ${d}</text>`);
    return svg(1500, 520, pair(110, 'a virus', 6, 'an animal cell', 60, 'a person', 'a cruise ship', 0) + pair(290, 'a bacterium', 18, 'an animal cell', 60, 'a person', 'a van', 1) +
      st(2, `<text class="f-t2" x="160" y="460">and a mitochondrion is about the size of a bacterium (no accident)</text>`));
  };

  /* light, TEM, SEM */
  F.scopes = () => svg(1440, 520,
    st(0, `<rect class="f-card" x="20" y="20" width="440" height="470" rx="22"/><text class="f-tb" x="50" y="80">Light</text><text class="f-t2" x="50" y="140">light through the cells,</text><text class="f-t2" x="50" y="180">glass lenses</text><text class="f-t2" x="50" y="250">stains: hematoxylin (purple)</text><text class="f-t2" x="50" y="290">and eosin (pink)</text><text class="f-tm" x="50" y="460">living cells; ~0.2 µm at best</text>`) +
    st(1, `<rect class="f-card" x="500" y="20" width="440" height="470" rx="22"/><text class="f-tb" x="530" y="80">TEM</text><text class="f-t2" x="530" y="140">electrons fired</text><text class="f-t2" x="530" y="180">through a thin slice</text><text class="f-tm" x="530" y="460">dead, in a vacuum; far finer detail</text>`) +
    st(2, `<rect class="f-card" x="980" y="20" width="440" height="470" rx="22"/><text class="f-tb" x="1010" y="80">SEM</text><text class="f-t2" x="1010" y="140">electrons scattered</text><text class="f-t2" x="1010" y="180">off the surface</text><text class="f-tm" x="1010" y="420">electrons have no color:</text><text class="f-tm" x="1010" y="460">any color is added later</text>`));

  /* endosymbiosis, one step at a time */
  F.endo = () => {
    const bact = (x, y, cls) => `<rect class="${cls}" x="${x - 40}" y="${y - 22}" width="80" height="44" rx="22"/>`;
    return svg(1500, 560,
      st(0, `<circle class="k5s" cx="250" cy="280" r="150"/><path class="f-ink2" d="M160 260c40-30 90 40 130 0"/><text class="f-t2 f-mid" x="250" y="480">an early cell; its membrane folds in</text>`) +
      st(1, `<circle class="k5s" cx="700" cy="280" r="150"/>${bact(830, 150, 'k4s')}${arrow(870, 120, 840, 140, 'f-ink2')}<text class="f-t2 f-mid" x="700" y="480">it engulfs a bacterium</text>`) +
      st(2, `<circle class="k5s" cx="1180" cy="280" r="150"/><ellipse class="f-thin" cx="1220" cy="250" rx="62" ry="40"/>${bact(1220, 250, 'k4s')}<text class="f-t2 f-mid" x="1180" y="480">kept, not digested: a mitochondrion</text>`) +
      st(3, `<rect class="f-accsoft" x="980" y="20" width="460" height="70" rx="14"/><text class="f-tacc" x="1000" y="68">a second time: a chloroplast</text>`));
  };

  /* ---------------- diffusion: dots in two chambers ---------------- */
  D.parts.diffuse = function (def, host) {
    const W = 1000, H = 520, box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: `0 0 ${W} ${H}`, width: W, height: H }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [1040, 40, 480]);
    const s = () => D.get('dif-' + def.id, () => ({ wall: 1 }));
    const row = D.el('div', 'dm-row', ctl), bR = D.el('button', 'dm-btn', row, 'Start over'), bW = D.el('button', 'dm-btn', row, 'Membrane');
    const out = D.el('div', 'dm-read', ctl), note = D.el('div', 'dm-note', ctl, 'Nothing pushes them. Each dot jiggles at random.');
    let dots = [], raf = 0, on = false;
    const seed = () => { dots = Array.from({ length: 160 }, () => ({ x: 20 + Math.random() * 300, y: 20 + Math.random() * (H - 40) })); };
    seed();
    bR.onclick = seed; bW.onclick = () => { s().wall = s().wall ? 0 : 1; D.save(); };
    const mid = W / 2;
    function stepDraw() {
      const wall = s().wall;
      bW.classList.toggle('on', !!wall); bW.textContent = wall ? 'Membrane: closed' : 'Membrane: open';
      for (const d of dots) {
        const nx = d.x + (Math.random() - 0.5) * 14, ny = d.y + (Math.random() - 0.5) * 14;
        const cross = (d.x < mid) !== (nx < mid);
        if (!(wall && cross)) d.x = D.clamp(nx, 8, W - 8);
        d.y = D.clamp(ny, 8, H - 8);
      }
      const left = dots.filter((d) => d.x < mid).length;
      pic.innerHTML = `<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="20" style="fill:var(--card);stroke:var(--rule);stroke-width:3"/>` +
        `<path d="M${mid} 0V${H}" style="stroke:${wall ? 'var(--ink)' : 'var(--rule)'};stroke-width:${wall ? 8 : 3};stroke-dasharray:${wall ? 'none' : '10 10'}"/>` +
        dots.map((d) => `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="7" style="fill:var(--k2)"/>`).join('');
      out.innerHTML = `left <b>${left}</b> · right <b>${dots.length - left}</b>`;
      if (on && !D.reduced) raf = requestAnimationFrame(stepDraw);
    }
    return {
      show() { if (!on) { on = true; stepDraw(); } },
      hide() { on = false; cancelAnimationFrame(raf); },
      reset() { seed(); }
    };
  };

  /* ---------------- surface area and volume: one big cube or many small ones ---------------- */
  D.parts.cube = function (def, host) {
    const box = D.el('div', 'dm', host), pic = D.svg('svg', { viewBox: '0 0 820 560', width: 820, height: 560 }, box);
    pic.style.position = 'absolute'; pic.style.left = '0'; pic.style.top = '0';
    const ctl = D.el('div', 'dm-ctl', box); D.place(ctl, [860, 60, 660]);
    const s = () => D.get('cube-' + def.id, () => ({ side: 1, cut: 1 }));
    const sideS = D.slider(ctl, { label: 'Side', lo: 1, hi: 10, step: 1, value: s().side, width: 320, fmt: (v) => v + ' units', change: (v) => { s().side = v; if (s().cut > v) s().cut = v; D.save(); paint(); } });
    const cutS = D.slider(ctl, { label: 'Cut into', lo: 1, hi: 10, step: 1, value: s().cut, width: 320, fmt: (v) => v === 1 ? 'one cube' : `${v * v * v} cubes`, change: (v) => { s().cut = Math.min(v, s().side); D.save(); paint(); } });
    const out = D.el('div', 'dm-read', ctl), note = D.el('div', 'dm-note', ctl);
    function paint() {
      const { side, cut } = s(), a = side / cut, n = cut * cut * cut, sa = 6 * a * a * n, vol = side * side * side, px = 36;
      const L = side * px, ox = 380 - L / 2, oy = 330 + L / 2, d = L * 0.45;
      let g = '';
      const face = (pts, cls) => `<polygon class="${cls}" points="${pts.map((p) => p.join(',')).join(' ')}" style="stroke-width:2"/>`;
      g += face([[ox, oy], [ox + L, oy], [ox + L, oy - L], [ox, oy - L]], 'k3s') + face([[ox, oy - L], [ox + L, oy - L], [ox + L + d, oy - L - d * 0.6], [ox + d, oy - L - d * 0.6]], 'k3s') + face([[ox + L, oy], [ox + L + d, oy - d * 0.6], [ox + L + d, oy - L - d * 0.6], [ox + L, oy - L]], 'k3s');
      if (cut > 1) for (let i = 1; i < cut; i++) { const f = i / cut; g += `<path class="f-thin" d="M${ox + L * f} ${oy}V${oy - L}L${ox + L * f + d} ${oy - L - d * 0.6}M${ox} ${oy - L * f}H${ox + L}L${ox + L + d} ${oy - L * f - d * 0.6}"/>`; }
      pic.innerHTML = g;
      out.innerHTML = `surface <b>${sa.toLocaleString()}</b> · volume <b>${vol.toLocaleString()}</b><br>surface per volume <b>${(sa / vol).toFixed(2)}</b>`;
      note.textContent = cut > 1 ? `Same volume, ${cut}× the surface: room for more, faster exchange.` : 'Area grows with the side squared, volume with it cubed.';
    }
    return { show() { sideS.set(s().side); cutS.set(s().cut); paint(); }, reset() { sideS.set(s().side); cutS.set(s().cut); paint(); } };
  };
})();

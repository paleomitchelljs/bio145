/* General parts for the lecture decks. content.js places them; each lecture's figs.js adds figures (Deck.figs) and
 * its own interactive parts. Item fields every part gets from deck.js: kind, box [x, y, w, h], at / until / builds.
 *
 *   title    text, kick (small line above), sub (line below)
 *   points   lines: ['text', { t, sub, at }]; line i arrives at build (at || 0) + i unless it says its own at.
 *            cls: 'big' | 'small' | 'plain'
 *   fig      fig: a name in Deck.figs, opts; the figure's elements with class st and data-s="n" show from local step n
 *            (local step = build - from, or the item's nth build), data-u="n" hides them again from step n; all: every step at once
 *   photo    img (under ../img, committed: openly licensed, see img/CREDITS.md) or src (under ../media, local only),
 *            alt, credit, diagram (inverts on the chalkboard)
 *   vote     id, q, opts, ans (index), why. Keys 1-n add a hand, shift takes one back; P shows the answer
 *   cmp      cols: [{ h, cls, lines: ['text' | { t, sub, at }] }]; lines arrive one per build from at, column by column
 *   sort     id, bins: [{ t, box }], tray: box, chips: [{ t, bin }]. Drag chips; P marks them right or wrong
 *   quote    t, who
 */
(function () {
  'use strict';
  const D = window.Deck;
  D.figs = D.figs || {};

  D.fmt = function (s) {
    return D.esc(s || '').replace(/_([^_]+)_/g, '<i>$1</i>').replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\^([^^]+)\^/g, '<sup>$1</sup>').replace(/~([^~]+)~/g, '<sub>$1</sub>');
  };
  const localStep = (def, b) => def.builds ? def.builds.filter((x) => x <= b).length - 1 : b - (def.from != null ? def.from : (def.at || 0));

  /* Drag an absolutely positioned element inside host (stage pixels). */
  D.drag = function (el, host, o) {
    el.classList.add('grab');
    el.addEventListener('pointerdown', (ev) => {
      if (ev.button) return;
      ev.preventDefault(); ev.stopPropagation();
      el.setPointerCapture(ev.pointerId);
      const p0 = D.local(host, ev), x0 = el.offsetLeft, y0 = el.offsetTop;
      let x = x0, y = y0;
      el.classList.add('dragging');
      const move = (m) => {
        const p = D.local(host, m);
        x = x0 + p.x - p0.x; y = y0 + p.y - p0.y;
        el.style.left = x + 'px'; el.style.top = y + 'px';
        if (o.move) o.move(x, y);
      };
      const up = () => {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        el.classList.remove('dragging');
        if (o.end) o.end(x, y);
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  };

  /* A slider: a track and a knob, value from lo to hi in steps. Returns { set(v), get() }. */
  D.slider = function (parent, o) {
    const row = D.el('div', 'dm-row', parent);
    if (o.label) D.el('span', '', row, D.fmt(o.label));
    const track = D.el('div', 'dm-track', row), knob = D.el('div', 'dm-knob', track), out = D.el('span', 'dm-read', row);
    if (o.width) track.style.width = o.width + 'px';
    let v = o.value != null ? o.value : o.lo;
    const snap = (x) => { const s = o.step || 1; return D.clamp(Math.round((x - o.lo) / s) * s + o.lo, o.lo, o.hi); };
    const paint = () => { knob.style.left = ((v - o.lo) / (o.hi - o.lo) * 100) + '%'; out.innerHTML = o.fmt ? o.fmt(v) : String(v); };
    const fromX = (ev) => { const r = track.getBoundingClientRect(); return snap(o.lo + D.clamp((ev.clientX - r.left) / r.width, 0, 1) * (o.hi - o.lo)); };
    const set = (x, quiet) => { v = snap(x); paint(); if (!quiet && o.change) o.change(v); };
    const grab = (ev) => {
      ev.preventDefault(); ev.stopPropagation();
      track.setPointerCapture(ev.pointerId); set(fromX(ev));
      const move = (m) => set(fromX(m));
      const up = () => { track.removeEventListener('pointermove', move); track.removeEventListener('pointerup', up); };
      track.addEventListener('pointermove', move); track.addEventListener('pointerup', up);
    };
    track.addEventListener('pointerdown', grab);
    paint();
    return { set: (x) => set(x, true), get: () => v, row };
  };

  /* ---------- title ---------- */
  D.parts.title = function (def, host) {
    host.innerHTML = (def.kick ? `<div class="tt-kick">${D.fmt(def.kick)}</div>` : '') + `<div class="tt-main">${D.fmt(def.text)}</div>` +
      (def.sub ? `<div class="tt-sub">${D.fmt(def.sub)}</div>` : '');
    return { show(b, how) { if (how === 'step' || how === 'jump') D.replay(host, 'play'); } };
  };

  /* ---------- points ---------- */
  D.parts.points = function (def, host) {
    const box = D.el('div', 'pts ' + (def.cls || ''), host);
    const lines = def.lines.map((l, i) => {
      const o = typeof l === 'string' ? { t: l } : l;
      const e = D.el('div', 'pt', box, D.fmt(o.t) + (o.sub ? `<span class="sub">${D.fmt(o.sub)}</span>` : ''));
      return { e, at: o.at != null ? o.at : (def.at || 0) + i };
    });
    return {
      show(b) {
        const newest = Math.max(-1, ...lines.filter((l) => l.at <= b).map((l) => l.at));
        lines.forEach((l) => { l.e.classList.toggle('on', l.at <= b); l.e.classList.toggle('lit', l.at === newest && b === newest && !def.noLit); });
      }
    };
  };

  /* ---------- a drawn figure ---------- */
  D.parts.fig = function (def, host) {
    const make = D.figs[def.fig];
    host.innerHTML = make ? make(def.opts || {}, def) : `<div class="photo-miss">figure "${D.esc(def.fig)}" not drawn yet</div>`;
    const steps = [...host.querySelectorAll('.st')];
    return {
      show(b) {
        const k = def.all ? Infinity : localStep(def, b);
        steps.forEach((e) => {
          const s = +(e.dataset.s || 0), u = e.dataset.u != null ? +e.dataset.u : Infinity;
          e.classList.toggle('on', k >= s && k < u);
        });
      }
    };
  };

  /* ---------- a photo from the PowerPoints ---------- */
  D.parts.photo = function (def, host) {
    const fig = D.el('figure', 'photo-fig', host);
    const img = D.el('img', 'photo' + (def.diagram ? ' diagram' : ''), fig);
    img.alt = def.alt || ''; img.draggable = false;
    img.addEventListener('error', () => {
      img.remove();
      const m = D.el('div', 'photo-miss', null, def.img ? `${D.esc(def.alt || def.img)}<br><span style="font-size:19px">img/${D.esc(def.img)} is missing</span>`
        : `${D.esc(def.alt || def.src)}<br><span style="font-size:19px">media/${D.esc(def.src)} (local only: run tools/pull_media.py)</span>`);
      fig.insertBefore(m, fig.firstChild);
    });
    img.src = def.img ? '../img/' + def.img : '../media/' + def.src;
    if (def.credit) D.el('figcaption', '', fig, D.esc(def.credit));
  };

  /* ---------- the room votes ---------- */
  D.parts.vote = function (def, host) {
    const st = () => D.get('vote-' + def.id, () => ({ n: def.opts.map(() => 0) }));
    const box = D.el('div', 'vt', host);
    if (def.q) D.el('div', 'vt-q', box, D.fmt(def.q));
    const rows = def.opts.map((o, i) => {
      const r = D.el('div', 'vt-row', box, `<div class="vt-bar"></div><b>${i + 1}</b><div class="vt-t">${D.fmt(o)}</div><div class="vt-n"></div>`);
      r.addEventListener('click', (e) => { add(i, e.shiftKey ? -1 : 1); });
      return r;
    });
    const why = def.why ? D.el('div', 'vt-why', box) : null;
    function paint() {
      const n = st().n, tot = n.reduce((a, x) => a + x, 0), show = D.flags.answers && def.ans != null;
      rows.forEach((r, i) => {
        r.querySelector('.vt-n').textContent = tot ? n[i] : '';
        r.querySelector('.vt-bar').style.width = tot ? (100 * n[i] / Math.max(...n)) + '%' : '0';
        r.classList.toggle('right', show && i === def.ans); r.classList.toggle('wrong', show && i !== def.ans);
      });
      if (why) why.innerHTML = show ? D.fmt(def.why) : '';
    }
    function add(i, d) { const s = st(); s.n[i] = Math.max(0, s.n[i] + d); D.save(); paint(); }
    return {
      show() { paint(); },
      digit(k, shift) { if (k >= 1 && k <= def.opts.length) add(k - 1, shift ? -1 : 1); },
      reset() { paint(); }
    };
  };
  D.on('answers', () => {});

  /* ---------- columns that fill in ---------- */
  D.parts.cmp = function (def, host) {
    const box = D.el('div', 'cmp', host);
    box.style.gridTemplateColumns = `repeat(${def.cols.length}, 1fr)`;
    let k = def.at || 0;
    const lines = [];
    def.cols.forEach((c) => {
      const col = D.el('div', 'cmp-col ' + (c.cls || ''), box);
      D.el('div', 'cmp-h', col, D.fmt(c.h));
      c.lines.forEach((l) => {
        const o = typeof l === 'string' ? { t: l } : l;
        const e = D.el('div', 'cmp-l', col, D.fmt(o.t) + (o.sub ? `<span class="sub">${D.fmt(o.sub)}</span>` : ''));
        lines.push({ e, at: o.at != null ? o.at : (def.together ? def.at || 0 : k++) });
      });
    });
    return { show(b) { lines.forEach((l) => l.e.classList.toggle('on', l.at <= b)); } };
  };

  /* ---------- the room sorts chips into bins ---------- */
  D.parts.sort = function (def, host) {
    const st = () => D.get('sort-' + def.id, () => ({ at: {} }));
    const box = D.el('div', 'srt', host);
    def.bins.forEach((b) => { const e = D.el('div', 'srt-bin', box, `<h4>${D.fmt(b.t)}</h4>`); D.place(e, b.box); });
    const tray = D.el('div', 'srt-tray', box); D.place(tray, def.tray);
    const home = (i) => {
      const per = Math.max(1, Math.floor(def.tray[2] / 380)), row = Math.floor(i / per), col = i % per;
      return { x: def.tray[0] + 16 + col * (def.tray[2] - 32) / per, y: def.tray[1] + 14 + row * 66 };
    };
    const chips = def.chips.map((c, i) => {
      const e = D.el('div', 'srt-chip', box, D.fmt(c.t));
      D.drag(e, box, { end(x, y) { st().at[i] = [x, y]; D.save(); mark(); } });
      return { e, c, i };
    });
    function binOf(x, y) {
      return def.bins.findIndex((b) => x + 20 >= b.box[0] && x + 20 <= b.box[0] + b.box[2] && y + 20 >= b.box[1] && y + 20 <= b.box[1] + b.box[3]);
    }
    function mark() {
      chips.forEach(({ e, c, i }) => {
        const p = st().at[i], bin = p ? binOf(p[0], p[1]) : -1, show = D.flags.answers && bin >= 0;
        e.classList.toggle('right', show && bin === c.bin); e.classList.toggle('wrong', show && bin !== c.bin);
      });
    }
    function lay() {
      chips.forEach(({ e, i }) => { const p = st().at[i] || [home(i).x, home(i).y]; e.style.left = p[0] + 'px'; e.style.top = p[1] + 'px'; });
      mark();
    }
    lay();
    return { show() { lay(); }, reset() { lay(); } };
  };

  /* ---------- a quote ---------- */
  D.parts.quote = function (def, host) {
    host.innerHTML = `<div class="qt"><div class="qt-t">${D.fmt(def.t)}</div>${def.who ? `<div class="qt-who">${D.fmt(def.who)}</div>` : ''}</div>`;
  };

  /* answers shown or hidden: redraw the parts that mark things */
  D.on('go', () => {});
})();

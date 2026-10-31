/* BIO 145 lesson kit: builds a whole lesson from a config, so the drafted lessons share one set of engines.
   Every lesson is some manipulation stages, then a typed drill last (the completion code is earned there).

     Kit.run({ id: "b145_lesson3", num: 3, stages: [
       { type: "sort",  title, tip, voice: ["draft bullet", ...], bins: ["a","b"], items: [["text", 0], ["text", "b"]] },
       { type: "order", title, voice, items: ["first", "second", ...] },                 correct order; shown shuffled
       { type: "pick",  title, voice, qs: [ { q, ok: "right", no: ["wrong", ...], why, draw?, after?, w?, h? } | { make: () => qobj } ] },
                        after: a drawing shown once the question is answered right (predict, then see)
       { type: "sim",   title, voice, w, h, controls: [ {id,label,min,max,step,val,fmt?} | {id,label,type:"check",val} |
                        {id,label,type:"select",opts:[[value,label],...],val} ], draw(ctx,w,h,S), readout?(S) -> html,
                        goals: [ {text, test(S) -> bool} ] },
       { type: "classify", title, voice, bins: ["a","b"], items: [["text", 0], { q: "html", draw, w, h, bin: 1 }, ...] }
                        or make: () => ({ q, draw?, w?, h?, bin }), n: how many to place right; ratio: true shows the counts relative to the smallest,
                        a number (4, 16) scales them to that total
       { type: "drill", title, voice, cards: [...], bank: [...] }                         cards as in drill.js
     ] });
   Any stage may carry `solved`: a sentence shown in its solved banner once it is beaten (the finding, held back until then).

   Scoring: one first-try bit per sorted item / ordered slot / pick question / classified card / drill card; a sim goal
   scores when first met.
   Instructor bypass and Study Mode come from stage.js as in the other lessons. */
const Kit = (function () {
  const LET = "ABCDEFGH";
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const tipH = (t, tip) => tip ? '<span class="info" tabindex="0">' + t + '<span class="tip"><span>' + tip + "</span></span></span>" : t;


  /* one stage's section markup. prev/next are the neighbouring stages' visible labels (null at the ends) */
  function sectionHtml(st, prev, next, num) {
    const lab = st.label || st.k;
    return '<section class="stage stage-locked" id="stage' + st.k + '"><h2 class="stage-h">' + lab + "</h2>" +
      '<div class="lock-banner">' + (prev ? "Finish Stage " + prev + " to unlock this section." : "Enter your name above to start.") + "</div>" +
      '<div class="panel stage-intro"><div class="voice"><ul>' + (st.voice || []).map(v => "<li>" + v + "</li>").join("") + "</ul></div></div>" +
      '<div class="stage-body grid"><div class="col"><div class="panel"><h3>' + tipH(st.title || "", st.tip) + '</h3><div id="' + st.k + '_main"></div></div></div>' +
      '<div class="col">' + (st.type === "drill" ? '<div class="panel"><h3>Word bank</h3><div id="' + st.k + '_bank"></div></div>' : "") +
      '<div class="panel"><h3>To finish</h3><ul class="tasks" id="tasks' + st.k + '"></ul><div class="solved-banner" id="solved' + st.k + '">' +
      (st.solved ? st.solved + " " : "") + (next ? "Stage " + next + " is open." : "Lesson " + num + " is done.") + "</div></div></div></div></section>";
  }

  const T = {};
    const task = (st, id, text) => $("tasks" + st.k).insertAdjacentHTML("beforeend", '<li data-task="' + id + '">' + text + ' <span class="hint" id="' + st.k + "_" + id + '_now"></span></li>');

    /* ---------- sort: drag cards into bins ---------- */
    T.sort = function (st) {
      const items = st.items.map(([t, b]) => ({ t, b: typeof b === "number" ? b : st.bins.indexOf(b) }));
      items.forEach(it => { if (it.b < 0) throw new Error("bad bin for " + it.t); });
      st.bits = items.length;
      const m = $(st.k + "_main"), seen = new Set();
      m.innerHTML = '<div class="tiles kit-tray" id="' + st.k + '_tray"></div><div class="kit-bins">' +
        st.bins.map((b, i) => '<div class="kit-bin"><div class="kit-binh">' + b + '</div><div class="tiles" data-bin="' + i + '"></div></div>').join("") +
        '</div><div class="buttons"><button class="accent" id="' + st.k + '_chk">Check</button></div><div class="verdict" id="' + st.k + '_v"></div>';
      const tray = $(st.k + "_tray");
      shuffle(items.map((it, i) => i)).forEach(i => { const d = document.createElement("div"); d.className = "tile"; d.dataset.i = i; d.textContent = items[i].t; tray.appendChild(d); });
      Tiles.wire($("stage" + st.k), () => Lesson.bump(st.k));
      task(st, "m", "Every card in the right place");
      $(st.k + "_chk").onclick = () => {
        if (tray.children.length) { $(st.k + "_v").innerHTML = '<span class="off">Place every card first.</span>'; return; }
        let right = 0;
        m.querySelectorAll(".kit-bin .tile").forEach(t => {
          const i = +t.dataset.i, ok = +t.parentElement.dataset.bin === items[i].b;
          t.classList.toggle("right", ok); t.classList.toggle("wrong", !ok); if (ok) right++;
          if (!seen.has(i)) { seen.add(i); Lesson.record(st.off + i, ok); }
        });
        Lesson.tick(st.k, "m", right === items.length, right + " of " + items.length);
        $(st.k + "_v").innerHTML = right === items.length ? '<span class="ok">✓ All placed correctly.</span>' : '<span class="off">✗ ' + (items.length - right) + " in the wrong place</span> (red). Move them and check again.";
        if (right === items.length) Lesson.finish(st.k);
      };
      st.reveal = () => Lesson.tick(st.k, "m", true, "done");
    };

    /* ---------- order: drag steps into numbered slots ---------- */
    /* ---------- classify: one card at a time, dragged (or clicked) into a bin; after evo lesson 17, Stage D ----------
       A fixed list: every card must go in right once; a miss is recorded, shown, and the card comes back at the end.
       Generated cards (make): place n right; the first n cards shown are the scored ones. Each bin counts the cards that
       belong in it as they are placed, so where the cards are offspring or cells the counts are the data. */
    T.classify = function (st) {
      const fixed = !st.make, items = fixed ? st.items.map(it => Array.isArray(it) ? { q: esc(it[0]), bin: typeof it[1] === "number" ? it[1] : st.bins.indexOf(it[1]) } : Object.assign({}, it, { bin: typeof it.bin === "number" ? it.bin : st.bins.indexOf(it.bin) })) : null;
      if (fixed) items.forEach(it => { if (it.bin < 0) throw new Error("bad bin in classify " + st.k); });
      const n = fixed ? items.length : st.n || 20; st.bits = n;
      const m = $(st.k + "_main"), counts = st.bins.map(() => 0);
      let queue = fixed ? shuffle(items.map((_, i) => i)) : [], cur = null, shown = 0, right = 0, done = false; const dots = [], tried = new Set();
      m.innerHTML = '<div class="kit-cwrap"><div class="kit-card" id="' + st.k + '_card"></div></div><div class="kit-dots" id="' + st.k + '_dots"></div>' +
        '<div class="kit-cbins">' + st.bins.map((b, i) => '<div class="kit-cbin" data-bin="' + i + '"><div class="kit-binh">' + b + '</div><div class="kit-cnt">0</div></div>').join("") + "</div>" +
        '<div class="kit-ratio" id="' + st.k + '_ratio"></div><div class="verdict" id="' + st.k + '_v"></div>';
      task(st, "m", fixed ? "Place every card right" : "Place " + n + " right");
      const card = $(st.k + "_card"), binEls = [...m.querySelectorAll(".kit-cbin")];
      function paintCounts() {
        binEls.forEach((el, i) => el.querySelector(".kit-cnt").textContent = counts[i]);
        if (st.ratio) {
          const tot = counts.reduce((x, y) => x + y, 0), nz = counts.filter(c => c > 0), lo = nz.length ? Math.min(...nz) : 0;
          $(st.k + "_ratio").innerHTML = !tot ? "" : typeof st.ratio === "number"
            ? "counts " + counts.join(" : ") + " &nbsp;≈&nbsp; " + counts.map(c => (c / tot * st.ratio).toFixed(1)).join(" : ") + " out of " + st.ratio
            : "counts " + counts.join(" : ") + " &nbsp;≈&nbsp; " + counts.map(c => (c / lo).toFixed(1)).join(" : ");
        }
        $(st.k + "_dots").innerHTML = dots.map(d => '<span class="' + (d ? "r" : "w") + '"></span>').join("") + (done ? "" : '<span class="cur"></span>');
      }
      function next() {
        if (done) return;
        if (fixed) { if (!queue.length) { finish(); return; } cur = { i: queue.shift() }; Object.assign(cur, items[cur.i]); }
        else { cur = Object.assign({ i: shown }, st.make()); }
        card.innerHTML = '<div class="kit-cq">' + (cur.q || "") + "</div>";
        if (cur.draw) { const c = document.createElement("canvas"); c.width = cur.w || 300; c.height = cur.h || 140; card.appendChild(c); const g = hiDPI(c); cur.draw(g.ctx, g.w, g.h); }
        card.classList.remove("gone"); paintCounts();
      }
      function finish() { done = true; card.innerHTML = '<div class="kit-cq"><b>Done.</b></div>'; card.classList.add("gone"); paintCounts(); Lesson.tick(st.k, "m", true, fixed ? items.length + " of " + items.length : right + " of " + n); Lesson.finish(st.k); }
      function place(b) {
        if (done || !cur) return;
        const ok = b === cur.bin; Lesson.bump(st.k);
        const key = fixed ? cur.i : shown;
        if (!tried.has(key) && key < n) { tried.add(key); Lesson.record(st.off + key, ok); }
        dots.push(ok); if (ok || !fixed) counts[cur.bin]++;
        if (ok) right++; else if (fixed) queue.push(cur.i);
        $(st.k + "_v").innerHTML = ok ? '<span class="ok">✓ Correct.</span>' : '<span class="off">✗ Incorrect.</span> It goes in <b>' + st.bins[cur.bin] + "</b>" + (fixed ? "; it will come back." : ".");
        const fb = binEls[cur.bin]; fb.classList.add("flash"); setTimeout(() => fb.classList.remove("flash"), 450);
        shown++;
        Lesson.tick(st.k, "m", false, right + " of " + n);
        if (!fixed && right >= n) { finish(); return; }
        if (fixed && !queue.length) { finish(); return; }
        next();
      }
      m.querySelector(".kit-cbins").addEventListener("click", e => { const b = e.target.closest(".kit-cbin"); if (b) place(+b.dataset.bin); });
      let ghost = null, over = -1;
      card.addEventListener("pointerdown", e => {
        if (done) return; e.preventDefault();
        ghost = card.cloneNode(true); ghost.classList.add("kit-ghost"); Object.assign(ghost.style, { position: "fixed", pointerEvents: "none", zIndex: 60, width: card.offsetWidth + "px", left: e.clientX - card.offsetWidth / 2 + "px", top: e.clientY - 20 + "px" });
        const cv = card.querySelector("canvas"), gcv = ghost.querySelector("canvas"); if (cv && gcv) { gcv.getContext("2d").drawImage(cv, 0, 0); }
        document.body.appendChild(ghost); card.classList.add("lift");
      });
      window.addEventListener("pointermove", e => {
        if (!ghost) return; ghost.style.left = e.clientX - ghost.offsetWidth / 2 + "px"; ghost.style.top = e.clientY - 20 + "px";
        const u = document.elementFromPoint(e.clientX, e.clientY), b = u && u.closest(".kit-cbin"); over = b && m.contains(b) ? +b.dataset.bin : -1;
        binEls.forEach((el, i) => el.classList.toggle("over", i === over));
      });
      window.addEventListener("pointerup", () => {
        if (!ghost) return; ghost.remove(); ghost = null; card.classList.remove("lift"); binEls.forEach(el => el.classList.remove("over"));
        if (over >= 0) { const b = over; over = -1; place(b); }
      });
      st.start = () => { if (!cur && !done) next(); };
      st.reveal = () => { if (!done) { done = true; card.innerHTML = '<div class="kit-cq"><b>Done.</b></div>'; } Lesson.tick(st.k, "m", true, "done"); };
    };

    T.order = function (st) {
      const n = st.items.length; st.bits = n;
      const m = $(st.k + "_main"), seen = new Set();
      m.innerHTML = '<div class="tiles kit-tray" id="' + st.k + '_tray"></div><div class="kit-slots">' +
        st.items.map((_, i) => '<div class="slot" data-pos="' + i + '"><b>' + (i + 1) + "</b></div>").join("") +
        '</div><div class="buttons"><button class="accent" id="' + st.k + '_chk">Check</button></div><div class="verdict" id="' + st.k + '_v"></div>';
      const tray = $(st.k + "_tray");
      shuffle(st.items.map((_, i) => i)).forEach(i => { const d = document.createElement("div"); d.className = "tile"; d.dataset.i = i; d.textContent = st.items[i]; tray.appendChild(d); });
      Tiles.wire($("stage" + st.k), () => Lesson.bump(st.k));
      task(st, "m", "Every step in order");
      $(st.k + "_chk").onclick = () => {
        const slots = [...m.querySelectorAll(".slot")];
        if (slots.some(s => !s.querySelector(".tile"))) { $(st.k + "_v").innerHTML = '<span class="off">Fill every slot first.</span>'; return; }
        let right = 0;
        slots.forEach((s, p) => {
          const t = s.querySelector(".tile"), ok = +t.dataset.i === p; t.classList.toggle("right", ok); t.classList.toggle("wrong", !ok); if (ok) right++;
          if (!seen.has(p)) { seen.add(p); Lesson.record(st.off + p, ok); }
        });
        Lesson.tick(st.k, "m", right === n, right + " of " + n);
        $(st.k + "_v").innerHTML = right === n ? '<span class="ok">✓ In order.</span>' : '<span class="off">✗ ' + (n - right) + " out of place</span> (red). Swap and check again.";
        if (right === n) Lesson.finish(st.k);
      };
      st.reveal = () => Lesson.tick(st.k, "m", true, "done");
    };

    /* ---------- pick: one question at a time ---------- */
    T.pick = function (st) {
      const n = st.qs.length; st.bits = n; let qi = 0, missed = false, answered = 0;
      const m = $(st.k + "_main");
      m.innerHTML = '<div class="kit-q" id="' + st.k + '_q"></div><div class="kit-cv" id="' + st.k + '_cv"></div><div class="kit-opts" id="' + st.k + '_o"></div><div class="verdict" id="' + st.k + '_v"></div><div class="buttons"><button class="ghost" id="' + st.k + '_nx" hidden>Next</button></div>';
      task(st, "m", "Answer every question");
      let cur = null;
      function show() {
        const q = st.qs[qi]; cur = q.make ? q.make() : q; missed = false;
        $(st.k + "_q").innerHTML = '<span class="kit-n">' + (qi + 1) + " of " + n + "</span> " + cur.q;
        const cv = $(st.k + "_cv"); cv.innerHTML = "";
        if (cur.draw) { const c = document.createElement("canvas"); c.width = cur.w || 380; c.height = cur.h || 150; cv.appendChild(c); const g = hiDPI(c); cur.draw(g.ctx, g.w, g.h); }
        $(st.k + "_o").innerHTML = shuffle([cur.ok].concat(cur.no)).map(o => '<button data-o="' + esc(o).replace(/"/g, "&quot;") + '">' + esc(o) + "</button>").join("");
        $(st.k + "_v").textContent = ""; $(st.k + "_nx").hidden = true;
      }
      $(st.k + "_o").onclick = e => {
        const b = e.target.closest("button"); if (!b || b.disabled || $(st.k + "_nx").hidden === false) return;
        const ok = b.dataset.o === cur.ok; Lesson.bump(st.k);
        if (!missed) Lesson.record(st.off + qi, ok);
        if (!ok) { missed = true; b.classList.add("wrong"); b.disabled = true; $(st.k + "_v").innerHTML = '<span class="off">✗ Not that one.</span> Try again.'; return; }
        b.classList.add("right"); answered++;
        if (cur.after) { const cv = $(st.k + "_cv"); cv.innerHTML = ""; const c = document.createElement("canvas"); c.width = cur.w || 380; c.height = cur.h || 150; cv.appendChild(c); const g = hiDPI(c); cur.after(g.ctx, g.w, g.h); }
        $(st.k + "_o").querySelectorAll("button").forEach(x => x.disabled = true);
        $(st.k + "_v").innerHTML = '<span class="ok">✓ ' + esc(cur.ok) + ".</span> " + (cur.why || "");
        Lesson.tick(st.k, "m", answered === n, answered + " of " + n);
        if (answered === n) { Lesson.finish(st.k); return; }
        $(st.k + "_nx").hidden = false;
      };
      $(st.k + "_nx").onclick = () => { qi++; show(); };
      show();
      st.reveal = () => Lesson.tick(st.k, "m", true, "done");
    };

    /* ---------- sim: controls, a canvas, goals ---------- */
    T.sim = function (st) {
      const goals = st.goals; st.bits = goals.length;
      const m = $(st.k + "_main"), met = goals.map(() => false), state = {};
      m.innerHTML = '<canvas id="' + st.k + '_cv" width="' + (st.w || 620) + '" height="' + (st.h || 280) + '"></canvas><div class="kit-read" id="' + st.k + '_r"></div><div class="kit-ctl" id="' + st.k + '_c"></div>';
      $(st.k + "_c").innerHTML = st.controls.map(c => {
        if (c.type === "check") return '<label class="kit-row"><input type="checkbox" data-id="' + c.id + '"' + (c.val ? " checked" : "") + "> " + tipH(c.label, c.tip) + "</label>";
        if (c.type === "select") return '<label class="kit-row">' + tipH(c.label, c.tip) + ' <select data-id="' + c.id + '">' + c.opts.map(o => '<option value="' + o[0] + '"' + (o[0] === c.val ? " selected" : "") + ">" + o[1] + "</option>").join("") + "</select></label>";
        return '<label class="kit-row">' + tipH(c.label, c.tip) + ' <input type="range" data-id="' + c.id + '" min="' + c.min + '" max="' + c.max + '" step="' + c.step + '" value="' + c.val + '"> <span class="kit-val" data-v="' + c.id + '"></span></label>';
      }).join("");
      goals.forEach((g, i) => task(st, "g" + i, g.text));
      function read() {
        st.controls.forEach(c => {
          const el = m.querySelector('[data-id="' + c.id + '"]');
          state[c.id] = c.type === "check" ? el.checked : c.type === "select" ? el.value : +el.value;
          const v = m.querySelector('[data-v="' + c.id + '"]'); if (v) v.textContent = c.fmt ? c.fmt(state[c.id]) : state[c.id];
        });
      }
      function paint(user) {
        read(); const g = hiDPI($(st.k + "_cv")); st.draw(g.ctx, g.w, g.h, state);
        if (st.readout) $(st.k + "_r").innerHTML = st.readout(state);
        if (!user || !Lesson.isOpen(st.k)) return;
        goals.forEach((go, i) => { if (!met[i] && go.test(state)) { met[i] = true; Lesson.record(st.off + i, true); Lesson.tick(st.k, "g" + i, true, "✓"); } });
        if (met.every(x => x)) Lesson.finish(st.k);
      }
      m.querySelector(".kit-ctl").addEventListener("input", () => { Lesson.bump(st.k); paint(true); });
      st.paint = () => paint(false);
      paint(false);
      st.reveal = () => goals.forEach((_, i) => Lesson.tick(st.k, "g" + i, true, "✓"));
    };

    /* ---------- drill ---------- */
    T.drill = function (st) {
      st.bits = st.cards.length; let D = null;
      task(st, "m", "Master every card");
      st.start = () => { if (D) return; D = Drill.make({ mount: $(st.k + "_main"), bankMount: $(st.k + "_bank"), bank: st.bank, cards: st.cards, onFirst: (i, ok) => Lesson.record(st.off + i, ok), onProgress: (k, nn) => Lesson.tick(st.k, "m", k === nn, k + " of " + nn), onDone: () => Lesson.finish(st.k) }); };
      st.reveal = () => { st.start(); D.reveal(); };
    };


  function run(cfg) {
    const S = cfg.stages, N = S.length; window.__kit = cfg;
    let off = 0;
    S.forEach((st, i) => { st.k = LET[i]; st.i = i; });
    /* ---------- DOM ---------- */
    $("toc").innerHTML = S.map((st, i) => '<a href="#stage' + st.k + '" id="toc' + st.k + '"' + (i ? ' class="locked"' : "") + ">" + (st.label || st.k) + "</a>").join(" ");
    $("kit").innerHTML = S.map((st, i) => sectionHtml(st, i ? S[i - 1].label || S[i - 1].k : null, i < N - 1 ? S[i + 1].label || S[i + 1].k : null, cfg.num)).join("");
    $("done-banner").innerHTML = "<h2>Good job!</h2><p>That is all of Lesson " + cfg.num + ". Your completion code is below: copy it and hand it in.</p>";

    S.forEach(st => { st.off = off; T[st.type](st); off += st.bits; });
    Lesson.init({ id: cfg.id, version: cfg.version || 1, stages: S.map(s => s.k), required: S[N - 1].k, bits: off,
      onOpen: s => { const st = S.find(x => x.k === s); if (st.start) st.start(); if (st.paint) st.paint(); },
      onReveal: () => { S.forEach(st => st.reveal && st.reveal()); S.forEach(st => Lesson.finish(st.k)); } });
    window.addEventListener("resize", () => S.forEach(st => st.paint && st.paint()));
  }

  /* Add kit stages into a hand-built lesson. opts: before (id of the stage element they go in front of, e.g. "stageC"),
     off (first free scoring bit), stages (each with a unique key and a visible label), prev / next (visible labels of the
     neighbouring stages, for the banners). Returns { keys, bits, open(s), reveal(), resize() } for the lesson's own Lesson.init. */
  function extra(opts) {
    const S = opts.stages; let off = opts.off; S.forEach(st => { st.k = st.key || st.k; });
    (window.__kitExtras = window.__kitExtras || []).push(S);
    const before = $(opts.before), tocBefore = $("toc" + opts.before.slice(5));
    S.forEach((st, i) => {
      st.i = i; before.insertAdjacentHTML("beforebegin", sectionHtml(st, i ? S[i - 1].label || S[i - 1].k : opts.prev, i < S.length - 1 ? S[i + 1].label || S[i + 1].k : opts.next, 0));
      tocBefore.insertAdjacentHTML("beforebegin", '<a href="#stage' + st.k + '" id="toc' + st.k + '" class="locked">' + (st.label || st.k) + "</a> ");
      st.off = off; T[st.type](st); off += st.bits;
    });
    return { keys: S.map(s => s.k), bits: off - opts.off,
      open: s => { const st = S.find(x => x.k === s); if (st) { if (st.start) st.start(); if (st.paint) st.paint(); } },
      reveal: () => S.forEach(st => st.reveal && st.reveal()),
      resize: () => S.forEach(st => st.paint && st.paint()) };
  }
  return { run, extra };
})();

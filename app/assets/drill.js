/* BIO 145 typed mastery drill. A card asks; the student types; a card is mastered after `need` right in a row
   (default 2). A miss sends it back two or three cards later and resets its run; a near-miss in spelling gets one
   free second try. After a real miss the right answer is shown as a picture (a PNG, so it cannot be copied) and must
   be typed once before moving on. The word bank, if any, is a PNG too: visible, spellable, not pasteable.

     const D = Drill.make({
       mount: $("C_drill"),                  the panel body to build inside
       bankMount: $("C_bank"),               optional; where the word-bank picture goes
       bank: ["helicase", ...],              optional; defaults to every card's first answer
       need: 2,
       cards: [ { q: "html", a: ["answer", "also ok"] },
                { q: "html", a: "x", draw: (ctx, w, h) => {...}, w: 320, h: 140 },   a picture under the prompt
                { make: () => ({ q, a, draw }) } ],                                   a fresh instance each time it comes up
       onFirst: (i, ok) => Lesson.record(BIT0 + i, ok),
       onProgress: (mastered, total) => ...,
       onDone: () => ...
     });
     D.reveal()    every card mastered (instructor bypass)
*/
const Drill = (function () {
  function norm(s) {
    return String(s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .replace(/[’‘`′]/g, "'").replace(/[–—]/g, "-").replace(/\s*-\s*|\s+/g, " ").replace(/^(a|an|the) /, "").replace(/[.!?,;:]+$/g, "").trim();
  }
  function lev(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i]);
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  /* text -> PNG data URL (a picture of words, so it can be read but not selected or pasted) */
  function textPng(lines, o) {
    o = o || {}; const fs = o.size || 15, pad = 8, r = 2, font = (o.bold ? "600 " : "") + fs + "px -apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif";
    const c = document.createElement("canvas"), x = c.getContext("2d"); x.font = font;
    const cols = o.cols || 1, colW = Math.max(...lines.map(l => x.measureText(l).width)) + 22, rows = Math.ceil(lines.length / cols), lh = fs * 1.55;
    c.width = (pad * 2 + colW * cols) * r; c.height = (pad * 2 + rows * lh) * r;
    x.scale(r, r); x.fillStyle = o.bg || "#fff"; x.fillRect(0, 0, c.width, c.height);
    x.font = font; x.fillStyle = o.ink || "#1d1d1b"; x.textBaseline = "middle";
    lines.forEach((l, i) => { const col = Math.floor(i / rows), row = i % rows; x.fillText(l, pad + col * colW, pad + row * lh + lh / 2); });
    return { src: c.toDataURL("image/png"), w: c.width / r, h: c.height / r };
  }
  function img(p) { return '<img alt="" draggable="false" src="' + p.src + '" width="' + p.w + '" height="' + p.h + '">'; }
  function bankHtml(words, mountWidth) {
    const ws = [...new Set(words)].sort((a, b) => a.localeCompare(b));
    const cols = Math.max(1, Math.min(4, Math.floor((mountWidth || 420) / 150)));
    return img(textPng(ws, { cols, size: 14 }));
  }

  function make(o) {
    const need = o.need || 2, cards = o.cards, n = cards.length;
    const st = cards.map(() => ({ run: 0, done: false, tried: false }));
    let queue = shuffle(cards.map((_, i) => i)), cur = null, inst = null, mode = "ask", spellTry = false, last = -1;
    const m = o.mount; m.classList.add("drill");
    m.innerHTML = '<div class="dq"></div><div class="drow"><input class="dans" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type your answer">' +
      '<button class="accent dgo">Check</button></div><div class="dfeed"></div><div class="dbar"><i></i></div><div class="dstat"></div><div class="ddots"></div>';
    const q = m.querySelector(".dq"), inp = m.querySelector(".dans"), go = m.querySelector(".dgo"), fb = m.querySelector(".dfeed"),
      bar = m.querySelector(".dbar > i"), stat = m.querySelector(".dstat"), dots = m.querySelector(".ddots");
    inp.addEventListener("paste", e => e.preventDefault());
    inp.addEventListener("drop", e => e.preventDefault());
    if (o.bankMount) {
      const words = o.bank || cards.filter(c => !c.make).map(c => [].concat(c.a)[0]);
      o.bankMount.classList.add("bank"); o.bankMount.innerHTML = bankHtml(words, o.bankMount.clientWidth);
    }
    const answers = () => [].concat(inst.a).map(norm);
    function paintDots() {
      const k = st.filter(s => s.done).length;
      bar.style.width = (100 * k / n) + "%";
      stat.textContent = k + " of " + n + " mastered · " + need + " right in a row each";
      dots.innerHTML = st.map((s, i) => '<span class="' + (s.done ? "m" : s.run >= 2 ? "s2" : s.run === 1 ? "s1" : "") + (i === cur && mode !== "done" ? " cur" : "") + '"></span>').join("");
      if (o.onProgress) o.onProgress(k, n);
    }
    function show() {
      if (!queue.length) { mode = "done"; q.innerHTML = "<b>All " + n + " mastered.</b>"; inp.disabled = go.disabled = true; fb.textContent = ""; paintDots(); if (o.onDone) o.onDone(); return; }
      let k = 0; if (queue[0] === last && queue.length > 1) k = 1;
      cur = queue.splice(k, 1)[0]; last = cur;
      const c = cards[cur]; inst = c.make ? c.make() : c;
      q.innerHTML = inst.q || "";
      if (inst.draw) { const cv = document.createElement("canvas"); cv.width = inst.w || 340; cv.height = inst.h || 150; q.appendChild(cv); const g = hiDPI(cv); inst.draw(g.ctx, g.w, g.h); }
      mode = "ask"; spellTry = false; inp.value = ""; inp.disabled = go.disabled = false; go.textContent = "Check"; fb.innerHTML = "";
      paintDots(); inp.focus({ preventScroll: true });
    }
    function put(i, pos) { queue.splice(Math.min(pos, queue.length), 0, i); }
    function check() {
      const v = norm(inp.value); if (!v && mode !== "next") return;
      if (mode === "next") { show(); return; }
      const A = answers(), ok = A.includes(v);
      if (mode === "retype") {
        if (ok) { fb.innerHTML = '<span class="ok">✓ Got it.</span> It will come back soon.'; mode = "next"; go.textContent = "Next"; inp.disabled = true; go.focus(); }
        else { fb.querySelector(".again") ? 0 : fb.insertAdjacentHTML("beforeend", '<div class="again off">Not quite. Copy it letter by letter.</div>'); inp.select(); }
        return;
      }
      const s = st[cur];
      if (!ok && !spellTry && A.some(a => a.length > 3 && lev(a, v) <= Math.max(1, Math.floor(a.length / 7)))) {
        spellTry = true; fb.innerHTML = '<span class="off">Close: check the spelling.</span>'; inp.select(); return;
      }
      if (!s.tried) { s.tried = true; if (o.onFirst) o.onFirst(cur, ok && !spellTry); }
      if (ok) {
        s.run++; if (s.run >= need) s.done = true; else put(cur, rint(3, 6));
        fb.innerHTML = '<span class="ok">✓ Correct.</span>' + (s.done ? " Mastered." : "");
        mode = "next"; go.textContent = "Next"; inp.disabled = true; go.focus(); paintDots();
      } else {
        s.run = 0; put(cur, rint(2, 3));
        fb.innerHTML = '<span class="off">✗ Incorrect.</span> The answer:' + img(textPng([[].concat(inst.a)[0]], { size: 17, bold: true, bg: "#fbf7ea" })) + "Type it to go on.";
        mode = "retype"; inp.value = ""; inp.focus(); paintDots();
      }
    }
    go.addEventListener("click", check);
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); check(); } });
    go.addEventListener("keydown", e => { if (e.key === "Enter" && mode === "next") { e.preventDefault(); show(); } });
    show();
    return {
      reveal() { st.forEach(s => { s.done = true; s.run = need; }); queue = []; show(); },
      mastered: () => st.filter(s => s.done).length
    };
  }
  return { make, textPng, norm };
})();

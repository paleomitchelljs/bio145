/* BIO 145 stage furniture. Everything evo (BIO 202) lesson 20 does by hand at the top of its script, once:
   the gates (a stage opens the next by being worked through), the task ticks, the first-try bits, the
   manipulation counts, the instructor bypass / study mode, the completion code, the R panel.

     Lesson.init({ id:"lesson3", version:1, stages:["A","B","C"], required:"C", bits:24,
                   onOpen: s => {...}, onReveal: () => {...} });
     Lesson.record(bit, ok)        first try at a scored item only; later tries change nothing
     Lesson.tick("A", "rounds", done, "3 of 6")
     Lesson.finish("A")            the solved banner, the next stage open; the code once `required` is done
     Lesson.bump("A")              one control moved
     Lesson.isOpen("B")
     codeInto("codeA", [["key","x <- 1  # note"], ...]); hiR("codeA", "key")
     downloadText("lesson3_stageA.R", RTEXT.codeA)
     Tiles.wire(root, onChange)    drag .tile elements between .tiles trays and .slot boxes inside root
*/
const $ = id => document.getElementById(id);
const RTEXT = {};
const rnd = (a, b) => a + Math.random() * (b - a);
const rint = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
/* a canvas drawn at the screen's pixel density, sized to its CSS box (or its width/height attributes) */
function hiDPI(cv) {
  if (!cv.dataset.w) { cv.dataset.w = cv.getAttribute("width"); cv.dataset.h = cv.getAttribute("height"); }
  const r = window.devicePixelRatio || 1, pw = cv.parentElement ? cv.parentElement.clientWidth : 0;
  const w = Math.min(+cv.dataset.w, pw > 50 ? pw : +cv.dataset.w), h = +cv.dataset.h;
  const W = Math.round(w * r), H = Math.round(h * r);
  if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
  cv.style.width = w + "px"; cv.style.height = h + "px";
  const ctx = cv.getContext("2d"); ctx.setTransform(r, 0, 0, r, 0, 0); ctx.clearRect(0, 0, w, h);
  return { ctx, w, h };
}
/* where a pointer event sits in a canvas's CSS pixels */
function canvasXY(cv, e) { const b = cv.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; }

const Lesson = (function () {
  let cfg = null; const G = {};
  const has = f => typeof Score !== "undefined" && typeof Score[f] === "function";
  function open(s) {
    if (!G[s]) return; G[s].open = true;
    const el = $("stage" + s); if (el) el.classList.remove("stage-locked");
    const t = $("toc" + s); if (t) t.classList.remove("locked");
    if (cfg.onOpen) cfg.onOpen(s);
  }
  function finish(s) {
    if (!G[s] || G[s].done) return; G[s].done = true;
    const b = $("solved" + s); if (b) b.classList.add("shown");
    if (s === cfg.required) { const d = $("done-banner"); if (d) d.classList.add("shown"); if (has("finish")) Score.finish(); }
    const i = cfg.stages.indexOf(s), nx = cfg.stages[i + 1];
    if (nx) open(nx);
  }
  function record(pos, ok) {
    if (pos == null || !has("recordCheckpoint")) return;
    if (has("isAnswered") && Score.isAnswered("scaffold", pos)) return;
    Score.recordCheckpoint(pos, ok ? 1 : 0);
    if (cfg.required && G[cfg.required] && G[cfg.required].done && has("finish")) Score.finish();
  }
  function reveal() {
    const study = has("isStudy") && Score.isStudy();
    cfg.stages.forEach(open);
    if (!study) { for (let i = 0; i < cfg.bits; i++) record(i, true); if (cfg.onReveal) cfg.onReveal(); }
  }
  function init(o) {
    cfg = o; o.stages.forEach(s => G[s] = { open: false, done: false });
    document.addEventListener("score:bypass", reveal);
    Score.init({
      moduleId: o.id, version: o.version, scaffold: o.bits,
      mountNamePrompt: "#score-name", mountFinalCode: "#score-final",
      onReady: () => { open(o.stages[0]); if (has("isStudy") && Score.isStudy()) reveal(); }
    });
  }
  function tick(stage, task, on, hint) {
    const li = document.querySelector("#tasks" + stage + ' li[data-task="' + task + '"]'); if (li) li.classList.toggle("done", !!on);
    const h = $(stage + "_" + task + "_now"); if (h && hint != null) h.textContent = hint;
  }
  function bump(s) { if (has("bumpManipulation")) Score.bumpManipulation(s); }
  return { init, open, finish, record, tick, bump, isOpen: s => !!(G[s] && G[s].open), isDone: s => !!(G[s] && G[s].done) };
})();

function codeInto(id, lines) {
  RTEXT[id] = lines.map(l => l[1]).join("\n") + "\n";
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  $(id).innerHTML = lines.map(([k, s]) => {
    const c = s.indexOf("#"), body = c < 0 ? s : s.slice(0, c), com = c < 0 ? "" : s.slice(c);
    return '<span class="line"' + (k ? ' data-line="' + k + '"' : "") + ">" +
      esc(body).replace(/\b([a-z_.]+)\(/g, '<span class="fn">$1</span>(') + (com ? '<span class="com">' + esc(com) + "</span>" : "") + "</span>";
  }).join("");
}
function hiR(id, key) { if (!$(id)) return; for (const l of $(id).querySelectorAll(".line")) l.classList.toggle("hi", l.dataset.line === key); }
function downloadText(name, text) {
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" })); a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

/* drag tiles between trays (.tiles) and slots (.slot); a slot holds one tile, a dropped tile swaps the old one out */
const Tiles = {
  wire(root, onChange) {
    let drag = null, ghost = null, from = null;
    root.addEventListener("pointerdown", e => {
      const t = e.target.closest(".tile"); if (!t || !root.contains(t) || t.classList.contains("fixed")) return;
      e.preventDefault(); drag = t; from = t.parentElement; t.classList.add("dragging");
      ghost = t.cloneNode(true); Object.assign(ghost.style, { position: "fixed", pointerEvents: "none", zIndex: 60, left: e.clientX - 20 + "px", top: e.clientY - 14 + "px", opacity: .9 });
      document.body.appendChild(ghost);
    });
    window.addEventListener("pointermove", e => {
      if (!drag) return; ghost.style.left = e.clientX - 20 + "px"; ghost.style.top = e.clientY - 14 + "px";
      for (const s of root.querySelectorAll(".slot.over")) s.classList.remove("over");
      const u = document.elementFromPoint(e.clientX, e.clientY), s = u && u.closest(".slot"); if (s && root.contains(s)) s.classList.add("over");
    });
    window.addEventListener("pointerup", e => {
      if (!drag) return;
      const u = document.elementFromPoint(e.clientX, e.clientY), dst = u && (u.closest(".slot") || u.closest(".tiles"));
      for (const s of root.querySelectorAll(".slot.over")) s.classList.remove("over");
      if (dst && root.contains(dst) && dst !== from) {
        if (dst.classList.contains("slot")) { const old = dst.querySelector(".tile"); if (old) from.appendChild(old); }
        dst.appendChild(drag);
      }
      drag.classList.remove("dragging"); ghost.remove(); drag = ghost = null;
      for (const t of root.querySelectorAll(".tile")) t.classList.remove("right", "wrong");
      if (onChange) onChange();
    });
  }
};

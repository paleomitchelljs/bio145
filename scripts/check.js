// Check every lesson without a browser (jsdom). Needs `npm install` once (jsdom only).
//   node scripts/check.js              all lessons
//   node scripts/check.js 3 25         lessons 3 and 25
//   node scripts/check.js --labels 2   also print each stage's letter, lock banner and solved banner
// For each lesson, twice: as a student (no script errors, stage A opens) and as the instructor bypass
// (every stage opens, a completion code is minted). For kit stages (Kit.run and Kit.extra) it also checks content:
// every pick question has one right answer among distinct options, and every sim goal is reachable on a sweep of
// the controls. A sweep is a grid, so a narrow goal can be missed; check those by hand before believing a failure.
// Canvas is stubbed: nothing here sees a drawing. Drawing and dragging still need a real browser.
const { JSDOM, VirtualConsole } = require("jsdom");
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2), labels = args.includes("--labels"), which = args.filter(a => /^\d+$/.test(a));
const files = (which.length ? which.map(n => "lesson" + n + ".html") : fs.readdirSync(path.join(ROOT, "app/lessons")).filter(f => /^lesson\d+\.html$/.test(f)))
  .sort((a, b) => parseInt(a.slice(6)) - parseInt(b.slice(6)));
const ctxStub = () => new Proxy({}, {
  get: (t, k) => k === "measureText" ? () => ({ width: 40 }) : k === "createLinearGradient" || k === "createRadialGradient" ? () => ({ addColorStop() {} })
    : k === "getImageData" ? () => ({ data: new Uint8ClampedArray(4) }) : k in t ? t[k] : () => {},
  set: (t, k, v) => (t[k] = v, true)
});
const wait = ms => new Promise(r => setTimeout(r, ms));

function load(f) {
  const errs = [], vc = new VirtualConsole();
  vc.on("jsdomError", e => errs.push(String((e.detail && e.detail.message) || e.message).slice(0, 200)));
  vc.on("error", m => errs.push(String(m).slice(0, 200)));
  const file = path.join(ROOT, "app/lessons", f);
  const dom = new JSDOM(fs.readFileSync(file, "utf8"), {
    url: "file://" + file, runScripts: "dangerously", resources: "usable", virtualConsole: vc, pretendToBeVisual: true,
    beforeParse(w) {
      w.HTMLCanvasElement.prototype.getContext = function () { return this._c || (this._c = ctxStub()); };
      w.HTMLCanvasElement.prototype.toDataURL = () => "data:,";
      w.fetch = () => Promise.reject(new Error("no fetch in checks"));
      w.matchMedia = w.matchMedia || (() => ({ matches: false, addListener() {}, addEventListener() {} }));
      w.scrollTo = () => {};
      Object.defineProperty(w, "crypto", { value: require("crypto").webcrypto, configurable: true });
      w.TextEncoder = TextEncoder;
      const m = {}; Object.defineProperty(w, "localStorage", { value: { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; } } });
    }
  });
  return { dom, errs };
}

/* every value a control can take, thinned so a sweep stays under ~200,000 settings */
function sweep(controls) {
  const ranges = controls.filter(c => c.type !== "check" && c.type !== "select").length;
  const fixed = controls.reduce((a, c) => a * (c.type === "check" ? 2 : c.type === "select" ? c.opts.length : 1), 1);
  const per = Math.max(5, Math.floor(Math.pow(200000 / fixed, 1 / Math.max(1, ranges))));
  return controls.map(c => {
    if (c.type === "check") return [false, true];
    if (c.type === "select") return c.opts.map(o => o[0]);
    const n = Math.round((c.max - c.min) / c.step) + 1, k = Math.min(n, per), out = [];
    for (let i = 0; i < k; i++) out.push(+(c.min + Math.round(i * (n - 1) / Math.max(1, k - 1)) * c.step).toFixed(6));
    return out;
  });
}
function checkStages(stages, out) {
  for (const st of stages) {
    if (st.type === "pick") st.qs.forEach((q, i) => {
      for (let r = 0; r < (q.make ? 20 : 1); r++) {
        const g = q.make ? q.make() : q;
        if (!g.ok || !g.no || !g.no.length || g.no.includes(g.ok) || new Set(g.no).size !== g.no.length) { out.push("pick " + st.k + " q" + (i + 1) + ": answer and options clash: " + String(g.q).slice(0, 60)); break; }
      }
    });
    if (st.type === "sim") {
      const cs = st.controls, vals = sweep(cs), idx = cs.map(() => 0), hit = st.goals.map(() => false);
      for (;;) {
        const S = {}; cs.forEach((c, i) => S[c.id] = vals[i][idx[i]]);
        st.goals.forEach((g, gi) => { if (!hit[gi]) { try { if (g.test(S)) hit[gi] = true; } catch (e) { out.push("sim " + st.k + " goal " + (gi + 1) + " throws: " + e.message); hit[gi] = true; } } });
        let j = 0; while (j < cs.length && ++idx[j] === vals[j].length) idx[j++] = 0; if (j === cs.length) break;
      }
      hit.forEach((h, gi) => { if (!h) out.push("sim " + st.k + " goal " + (gi + 1) + " not reached on the sweep: " + st.goals[gi].text); });
    }
    if (st.type === "classify" && st.make) for (let r = 0; r < 40; r++) { const g = st.make(); if (!(g.bin >= 0 && g.bin < st.bins.length)) { out.push("classify " + st.k + ": make() gave bin " + g.bin); break; } }
    if (st.type === "drill") st.cards.forEach((c, i) => { const g = c.make ? c.make() : c; if (!g.a || ![].concat(g.a).every(a => String(a).trim())) out.push("drill " + st.k + " card " + (i + 1) + " has an empty answer"); });
  }
}

(async () => {
  let bad = 0;
  for (const f of files) {
    for (const who of ["Test Student", "JMitchell"]) {
      const { dom, errs } = load(f), d = dom.window.document;
      await wait(500);
      const inp = d.getElementById("score-name-input"), btn = d.getElementById("score-name-confirm");
      if (!inp || !btn) { console.log(f.padEnd(14), who.padEnd(13), "NO NAME PROMPT", errs.slice(0, 2).join(" | ")); bad++; dom.window.close(); continue; }
      inp.value = who; btn.click();
      await wait(700);
      const secs = [...d.querySelectorAll("section.stage")], locked = secs.filter(s => s.classList.contains("stage-locked")).map(s => s.id);
      const code = (d.getElementById("score-final") || {}).textContent || "";
      const ok = who === "JMitchell" ? locked.length === 0 && /v\d+\./.test(code) : secs.length && !locked.includes(secs[0].id);
      const notes = [];
      if (who === "JMitchell") {
        const w = dom.window;
        if (w.__kit) checkStages(w.__kit.stages, notes);
        (w.__kitExtras || []).forEach(S => checkStages(S, notes));
        const toc = [...d.querySelectorAll("nav.toc a")].map(a => a.textContent.trim());
        if (toc.length !== secs.length) notes.push("nav has " + toc.length + " letters for " + secs.length + " stages");
        if (labels) secs.forEach(s => console.log("   ", s.id.padEnd(8), (s.querySelector(".stage-h") || {}).textContent, "|", (s.querySelector(".lock-banner") || {}).textContent, "|", (s.querySelector(".solved-banner") || {}).textContent));
      }
      if (errs.length || !ok || notes.length) bad++;
      console.log(f.padEnd(14), who.padEnd(13), errs.length ? "ERR " + errs.slice(0, 3).join(" | ") : "ok", ok ? "" : " stages locked: " + locked.join(","));
      notes.forEach(n => console.log("    " + f + ": " + n));
      dom.window.close();
    }
  }
  process.exit(bad ? 1 : 0);
})();

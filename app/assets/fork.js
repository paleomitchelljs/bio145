/* BIO 145 replication fork: one picture of a fork at any step, with any one molecule missing. Lesson 7 walks it; its drill
   asks from the same pictures; lesson 8 can reuse it for the strands' fate.

     Fork.STEPS                      [{ key, name, alias, does }] in the order they act
     Fork.draw(ctx, w, h, k, o)      the fork after step k (0 = nothing yet, 9 = done)
                                     o: { labels: true, missing: "ligase" (that step never happens; later steps still do) }
*/
const Fork = (function () {
  const pol3 = ["dna polymerase iii", "dna polymerase 3", "dna pol iii", "dna pol 3", "polymerase iii", "polymerase 3", "pol iii", "pol 3"];
  const pol1 = ["dna polymerase i", "dna polymerase 1", "dna pol i", "dna pol 1", "polymerase i", "polymerase 1", "pol i", "pol 1"];
  const STEPS = [
    { key: "topo", name: "topoisomerase", alias: ["topoisomerase", "topoisomerase i", "gyrase", "dna gyrase"], does: "The DNA ahead of the fork is wound too tight." },
    { key: "helicase", name: "helicase", alias: ["helicase", "dna helicase"], does: "The two strands need to be pulled apart." },
    { key: "ssb", name: "single-strand binding protein", alias: ["single-strand binding protein", "single strand binding protein", "single-stranded binding protein", "single stranded binding protein", "ssb", "ssbs", "single-strand binding proteins", "single strand binding proteins"], does: "The separated strands will snap back together unless held apart." },
    { key: "primase1", name: "primase", alias: ["primase"], does: "Nothing can extend a new strand on the top template until a short starter is laid down." },
    { key: "pol3a", name: "DNA polymerase III", alias: pol3, does: "The top template has a starter. Now the new strand must be built, toward the fork." },
    { key: "primase2", name: "primase", alias: ["primase"], does: "The bottom template runs the other way. It needs starters too, one at a time, as it opens." },
    { key: "pol3b", name: "DNA polymerase III", alias: pol3, does: "Each starter on the bottom template must be extended, away from the fork, in pieces." },
    { key: "pol1", name: "DNA polymerase I", alias: pol1, does: "The starters are RNA. They must be swapped for DNA." },
    { key: "ligase", name: "DNA ligase", alias: ["dna ligase", "ligase"], does: "The pieces on the bottom are all DNA now, but there are gaps between them." }
  ];
  const DECOYS = ["RNA polymerase", "ribosome", "telomerase", "reverse transcriptase"];
  function draw(ctx, w, h, k, o) {
    o = o || {}; const miss = o.missing, did = key => { const i = STEPS.findIndex(s => s.key === key); return i < k && STEPS[i].key !== miss && !(miss === "primase" && (key === "primase1" || key === "primase2")); };
    const open = did("helicase"), held = did("ssb"), fx = w * 0.6, cy = h / 2, spread = open ? (held ? 105 : 30) : 0;
    const ink = "#1d1d1b", newc = "#2f6b8f", rna = "#e8730c";
    ctx.save(); ctx.lineCap = "round";
    /* the parent duplex ahead of the fork, twisted tight unless topoisomerase has acted */
    const tight = !did("topo"), xs = open ? fx : w * 0.12;
    for (let s = 0; s < 2; s++) {
      ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.beginPath();
      for (let x = xs; x <= w - 16; x += 2) { const per = tight ? 14 : 34, a = Math.sin((x - xs) / per * Math.PI) * 9; ctx[x === xs ? "moveTo" : "lineTo"](x, cy + (s ? a : -a)); }
      ctx.stroke();
    }
    if (tight && open) { ctx.fillStyle = "#a8331a"; ctx.font = "11px -apple-system,sans-serif"; ctx.textAlign = "center"; ctx.fillText("overwound", (fx + w) / 2, cy - 22); }
    if (!open) { ctx.fillStyle = "#6b6b68"; ctx.font = "12px -apple-system,sans-serif"; ctx.textAlign = "center"; ctx.fillText(o.labels ? "the parent DNA, still closed" : "", w / 2, cy + 40); ctx.restore(); return; }
    /* the two templates leaving the fork */
    const top = x => cy - spread * (fx - x) / (fx - 30), bot = x => cy + spread * (fx - x) / (fx - 30);
    ctx.strokeStyle = ink; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(fx, cy); ctx.lineTo(30, top(30)); ctx.stroke(); ctx.beginPath(); ctx.moveTo(fx, cy); ctx.lineTo(30, bot(30)); ctx.stroke();
    if (!held && spread < 30) { ctx.strokeStyle = "#a8331a"; ctx.setLineDash([3, 3]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(fx - 120, top(fx - 120) + 4); ctx.lineTo(fx - 120, bot(fx - 120) - 4); ctx.stroke(); ctx.setLineDash([]); }
    ctx.fillStyle = "#6b6b68"; ctx.font = "11px ui-monospace,Menlo,monospace"; ctx.textAlign = "left";
    ctx.fillText("3′", 12, top(30) + 4); ctx.fillText("5′", 12, bot(30) + 4); ctx.fillText("5′", w - 14, cy - 14); ctx.fillText("3′", w - 14, cy + 22);
    if (held) for (let x = 60; x < fx - 40; x += 46) for (const f of [top, bot]) { ctx.fillStyle = "#c9b8e8"; ctx.beginPath(); ctx.arc(x, f(x) + (f === top ? -7 : 7), 4.5, 0, 7); ctx.fill(); }
    /* new strands sit just inside their templates */
    const inT = x => top(x) + 9, inB = x => bot(x) - 9;
    const seg = (f, x1, x2, col, wd) => { ctx.strokeStyle = col; ctx.lineWidth = wd || 4; ctx.beginPath(); ctx.moveTo(x1, f(x1)); ctx.lineTo(x2, f(x2)); ctx.stroke(); };
    const primed = did("primase1"), primed2 = did("primase2"), lead = did("pol3a"), lag = did("pol3b"), swapped = did("pol1"), sealed = did("ligase");
    /* leading strand: one primer at the far left, then DNA toward the fork */
    if (primed) seg(inT, 40, 70, swapped ? newc : rna);
    if (primed && lead) seg(inT, 70, fx - 30, newc);
    /* lagging strand: a primer at the fork end of each piece, each piece built leftward from it */
    const pieces = [[40, 150], [160, 270], [280, fx - 40]];
    if (primed2) pieces.forEach(([a, b]) => {
      seg(inB, b - 24, b, swapped ? newc : rna);
      if (lag) seg(inB, a, b - 24, newc);
      if (lag && !sealed && b < fx - 40) { ctx.fillStyle = "#a8331a"; ctx.font = "600 11px -apple-system,sans-serif"; ctx.textAlign = "center"; ctx.fillText("gap", b + 5, inB(b + 5) - 8); }
    });
    if (lag && sealed) seg(inB, 40, fx - 40, newc);
    if (o.labels) {
      ctx.font = "11.5px -apple-system,sans-serif"; ctx.textAlign = "center"; ctx.fillStyle = "#1d1d1b";
      const lab = (x, y, t) => { ctx.fillText(t, x, y); };
      if (did("topo")) lab((fx + w) / 2, cy - 26, "topoisomerase acted here");
      lab(fx + 6, cy + 36, "fork"); if (held) lab(110, bot(110) + 40, "SSBs (purple)");
      if (primed && !swapped) lab(55, inT(55) + 18, "RNA primer"); if (lead) lab(fx - 160, top(fx - 160) - 12, "leading strand →");
      if (lag) lab(210, bot(210) + 24, sealed ? "← lagging strand" : "← Okazaki fragments");
    }
    ctx.restore();
  }
  return { STEPS, DECOYS, draw };
})();

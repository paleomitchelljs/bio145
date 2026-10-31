/* BIO 145 genetic code: the table, complementing, translating, and a clickable codon wheel. Lesson 30; any later lesson that
   reads a sequence.

     Code.aa("AUG")                 "Met" ("Stop" for a stop codon)
     Code.mrnaFromTemplate("TAC")   "AUG"   (template written 3'->5', mRNA 5'->3')
     Code.translate("GGAUGUUU...")  { start, codons: [...], aas: [...], stopAt } from the first AUG
     Code.wheel(ctx, cx, cy, R, hi) draw the wheel; hi: a codon to light up. Code.wheelHit(x, y, cx, cy, R) -> codon or null
*/
const Code = (function () {
  const B = "UCAG";
  const T = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
  const THREE = { F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", "*": "Stop", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg", I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly" };
  const FULL = { Phe: "phenylalanine", Leu: "leucine", Ser: "serine", Tyr: "tyrosine", Cys: "cysteine", Trp: "tryptophan", Pro: "proline", His: "histidine", Gln: "glutamine", Arg: "arginine", Ile: "isoleucine", Met: "methionine", Thr: "threonine", Asn: "asparagine", Lys: "lysine", Val: "valine", Ala: "alanine", Asp: "aspartic acid", Glu: "glutamic acid", Gly: "glycine", Stop: "stop" };
  const idx = c => B.indexOf(c[0]) * 16 + B.indexOf(c[1]) * 4 + B.indexOf(c[2]);
  const aa = c => THREE[T[idx(c)]];
  const PAIR_T = { A: "U", T: "A", G: "C", C: "G" }, PAIR_R = { A: "U", U: "A", G: "C", C: "G" };
  const mrnaFromTemplate = s => [...s].map(b => PAIR_T[b]).join("");
  const anticodon = c => [...c].map(b => PAIR_R[b]).join("");
  function translate(m) {
    const st = m.indexOf("AUG"); if (st < 0) return { start: -1, codons: [], aas: [], stopAt: -1 };
    const codons = [], aas = []; let stopAt = -1;
    for (let i = st; i + 3 <= m.length; i += 3) { const c = m.slice(i, i + 3), a = aa(c); codons.push(c); aas.push(a); if (a === "Stop") { stopAt = i; break; } }
    return { start: st, codons, aas, stopAt };
  }
  const COL = { U: "#e8f0f6", C: "#f6efe0", A: "#eef5e4", G: "#f6e6e8" };
  function wheel(ctx, cx, cy, R, hi) {
    const r1 = R * 0.22, r2 = R * 0.44, r3 = R * 0.66, r4 = R * 0.98;
    ctx.save(); ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const wedge = (a0, a1, ri, ro, fill) => { ctx.beginPath(); ctx.arc(cx, cy, ro, a0, a1); ctx.arc(cx, cy, ri, a1, a0, true); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.stroke(); };
    const lab = (a, r, t, f) => { ctx.font = f; ctx.fillStyle = "#1d1d1b"; ctx.fillText(t, cx + Math.cos(a) * r, cy + Math.sin(a) * r); };
    const A0 = -Math.PI / 2, step = Math.PI * 2 / 64;
    for (let i = 0; i < 4; i++) { wedge(A0 + i * 16 * step, A0 + (i + 1) * 16 * step, 0, r1, COL[B[i]]); lab(A0 + (i * 16 + 8) * step, r1 * 0.55, B[i], "600 " + Math.round(R * 0.07) + "px -apple-system,sans-serif"); }
    for (let i = 0; i < 16; i++) { wedge(A0 + i * 4 * step, A0 + (i + 1) * 4 * step, r1, r2, COL[B[i % 4]]); lab(A0 + (i * 4 + 2) * step, (r1 + r2) / 2, B[i % 4], "600 " + Math.round(R * 0.05) + "px -apple-system,sans-serif"); }
    for (let i = 0; i < 64; i++) {
      const c = B[Math.floor(i / 16)] + B[Math.floor(i / 4) % 4] + B[i % 4], on = hi && hi === c;
      wedge(A0 + i * step, A0 + (i + 1) * step, r2, r3, on ? "#2f6b8f" : COL[B[i % 4]]);
      ctx.save(); ctx.translate(cx + Math.cos(A0 + (i + 0.5) * step) * (r2 + r3) / 2, cy + Math.sin(A0 + (i + 0.5) * step) * (r2 + r3) / 2); ctx.rotate(A0 + (i + 0.5) * step);
      ctx.font = "600 " + Math.round(R * 0.042) + "px -apple-system,sans-serif"; ctx.fillStyle = on ? "#fff" : "#1d1d1b"; ctx.fillText(B[i % 4], 0, 0); ctx.restore();
    }
    /* amino acid labels: one per run of codons coding for it */
    let i = 0;
    while (i < 64) {
      let j = i; while (j + 1 < 64 && T[j + 1] === T[i] && Math.floor((j + 1) / 4) === Math.floor(i / 4)) j++;
      const a = A0 + (i + j + 1) / 2 * step, on = hi && T[idx(hi)] === T[i] && Math.floor(idx(hi) / 4) === Math.floor(i / 4);
      wedge(A0 + i * step, A0 + (j + 1) * step, r3, r4, on ? "#d0e1ed" : T[i] === "*" ? "#f4d3d7" : T[i] === "M" ? "#e4efd4" : "#fbfaf6");
      ctx.save(); ctx.translate(cx + Math.cos(a) * (r3 + r4) / 2, cy + Math.sin(a) * (r3 + r4) / 2); let rot = a; if (Math.cos(a) < 0) rot += Math.PI; ctx.rotate(rot);
      ctx.font = "600 " + Math.round(R * 0.045) + "px -apple-system,sans-serif"; ctx.fillStyle = "#1d1d1b"; ctx.fillText(THREE[T[i]], 0, 0); ctx.restore();
      i = j + 1;
    }
    ctx.restore();
  }
  function wheelHit(x, y, cx, cy, R) {
    const d = Math.hypot(x - cx, y - cy); if (d < R * 0.44 || d > R * 0.98) return null;
    let a = Math.atan2(y - cy, x - cx) + Math.PI / 2; if (a < 0) a += Math.PI * 2;
    const i = Math.floor(a / (Math.PI * 2 / 64)) % 64;
    return B[Math.floor(i / 16)] + B[Math.floor(i / 4) % 4] + B[i % 4];
  }
  return { aa, FULL, THREE, mrnaFromTemplate, anticodon, translate, wheel, wheelHit, T, B };
})();

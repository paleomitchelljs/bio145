/* BIO 145 crosses: one engine for lessons 10 (parents to F1 to F2), 11 (mystery crosses) and 12 (hit the ratio).

   A spec names the loci and how they show:
     { loci: [ { dom: "Y", rec: "y", ph: ["yellow", "green"], mode: "complete" | "incomplete" | "codominant",
                 het: "lavender",            the in-between look (incomplete / codominant)
                 x: true },                  on the X chromosome (males carry one copy)
               ... ],
       linked: 0.17 }                        loci 0 and 1 on one chromosome, this far apart (recombinant share); omit = independent

   An individual: { sex: "F" | "M", c: [hapA, hapB] }, each hap an array with one allele per locus; a male's hapB holds null at
   X loci (his Y). Alleles are the letters themselves.

     Cross.gametes(spec, ind)       [{ h, y, p }]    y: true for a Y-bearing sperm
     Cross.offspring(spec, mom, dad) Map key -> { ind, p }
     Cross.phenoDist(spec, dist)     { label: share }
     Cross.next(spec, dist)          the next generation from random mating within dist
     Cross.sample(dist, n)           n individuals drawn from dist
     Cross.pheno(spec, ind)          "yellow round", "white-eyed male", ...
     Cross.geno(spec, ind)           "Yy Rr", "XʳY", ...
*/
const Cross = (function () {
  function gametes(spec, ind) {
    const L = spec.loci.length, out = [];
    const isX = spec.loci.map(l => !!l.x), male = ind.sex === "M", anyX = isX.some(Boolean);
    /* the choices: for each locus which homolog (0/1); a male with X loci sends either his X (hap 0 at X loci) or his Y */
    const combos = [];
    (function rec(i, pick, p) {
      if (i === L) { combos.push({ pick: pick.slice(), p }); return; }
      if (spec.linked != null && i === 1 && !(isX[0] !== isX[1])) {   /* locus 1 follows locus 0 unless they cross over */
        const r = spec.linked; pick.push(pick[0]); rec(i + 1, pick, p * (1 - r)); pick.pop(); pick.push(1 - pick[0]); rec(i + 1, pick, p * r); pick.pop(); return;
      }
      if (male && isX[i]) {   /* every X locus rides with the same X-or-Y choice: decided at the first X locus */
        const first = isX.indexOf(true);
        if (i !== first) { pick.push(pick[first]); rec(i + 1, pick, p); pick.pop(); return; }
      }
      for (const k of [0, 1]) { pick.push(k); rec(i + 1, pick, p * 0.5); pick.pop(); }
    })(0, [], 1);
    for (const { pick, p } of combos) {
      const h = pick.map((k, i) => ind.c[k][i]);
      const y = male && anyX && pick[isX.indexOf(true)] === 1;
      out.push({ h, y, p });
    }
    return out;
  }
  function geno(spec, ind) {
    return spec.loci.map((l, i) => {
      const a = ind.c[0][i], b = ind.c[1][i];
      if (l.x) return ind.sex === "M" ? "X" + sup(a) + "Y" : "X" + sup(order(a, b, l)[0]) + "X" + sup(order(a, b, l)[1]);
      return order(a, b, l).join("");
    }).join(" ");
  }
  const SUP = { a: "ᵃ", b: "ᵇ", c: "ᶜ", d: "ᵈ", e: "ᵉ", r: "ʳ", w: "ʷ", R: "ᴿ", W: "ᵂ", B: "ᴮ", A: "ᴬ", D: "ᴰ", E: "ᴱ", N: "ᴺ", n: "ⁿ" };
  const sup = a => a == null ? "" : (SUP[a] || a);
  const order = (a, b, l) => (a === l.dom || b !== l.dom) ? [a, b] : [b, a];
  function key(spec, ind) { return ind.sex + "|" + spec.loci.map((l, i) => l.x && ind.sex === "M" ? ind.c[0][i] : order(ind.c[0][i], ind.c[1][i], l).join("")).join("|") + (spec.linked != null ? "|" + ind.c[0].slice(0, 2).join("") + ind.c[1].slice(0, 2).join("") : ""); }
  function offspring(spec, mom, dad) {
    const out = new Map(), anyX = spec.loci.some(l => l.x);
    for (const e of gametes(spec, mom)) for (const s of gametes(spec, dad)) {
      const sexes = anyX ? [s.y ? "M" : "F"] : ["F", "M"], w = anyX ? 1 : 0.5;
      for (const sex of sexes) {
        const hb = s.h.map((a, i) => spec.loci[i].x && sex === "M" ? null : a);
        const ind = { sex, c: [e.h.slice(), hb] }, k = key(spec, ind), p = e.p * s.p * w;
        if (out.has(k)) out.get(k).p += p; else out.set(k, { ind, p });
      }
    }
    return out;
  }
  function phenoLocus(l, a, b, male) {
    if (l.lethal && a === l.dom && b === l.dom) return null;
    if (l.x && male) return a === l.dom ? l.ph[0] : l.ph[1];
    const n = (a === l.dom) + (b === l.dom);
    if (n === 2) return l.ph[0]; if (n === 0) return l.ph[1];
    return l.mode === "incomplete" || l.mode === "codominant" ? l.het : l.ph[0];
  }
  function pheno(spec, ind) {
    const parts = spec.loci.map((l, i) => phenoLocus(l, ind.c[0][i], ind.c[1][i], ind.sex === "M"));
    if (parts.includes(null)) return null;   /* does not survive */
    return parts.join(" ") + (spec.loci.some(l => l.x) || spec.bySex ? (ind.sex === "M" ? " male" : " female") : "");
  }
  function phenoDist(spec, dist) {
    const o = {}; let alive = 0;
    for (const { ind, p } of dist.values()) { const ph = pheno(spec, ind); if (ph == null) continue; o[ph] = (o[ph] || 0) + p; alive += p; }
    for (const k in o) o[k] /= alive;
    return o;
  }
  function next(spec, dist) {   /* random mating: every female genotype with every male genotype, weighted by their shares */
    const fem = [...dist.values()].filter(d => d.ind.sex === "F" && pheno(spec, d.ind) != null), mal = [...dist.values()].filter(d => d.ind.sex === "M" && pheno(spec, d.ind) != null);
    const fs = fem.reduce((s, d) => s + d.p, 0), ms = mal.reduce((s, d) => s + d.p, 0), out = new Map();
    for (const f of fem) for (const m of mal) for (const [k, v] of offspring(spec, f.ind, m.ind)) {
      const p = f.p / fs * m.p / ms * v.p; if (out.has(k)) out.get(k).p += p; else out.set(k, { ind: v.ind, p });
    }
    return out;
  }
  function sample(dist, n) {
    const arr = [...dist.values()], out = [];
    for (let i = 0; i < n; i++) { let u = Math.random(), j = 0; while (j < arr.length - 1 && (u -= arr[j].p) > 0) j++; out.push(JSON.parse(JSON.stringify(arr[j].ind))); }
    return out;
  }
  /* exact comparison of two phenotype distributions */
  function same(a, b, tol) { tol = tol == null ? 0.005 : tol; const ks = new Set(Object.keys(a).concat(Object.keys(b))); for (const k of ks) if (Math.abs((a[k] || 0) - (b[k] || 0)) > tol) return false; return true; }
  /* a parent drawn as chromosome pairs; with edit, each allele is a button that flips dominant <-> recessive */
  function card(spec, ind, o) {
    o = o || {}; const L = spec.loci.length, groups = [];
    if (spec.linked != null) groups.push([0, 1]); for (let i = spec.linked != null ? 2 : 0; i < L; i++) groups.push([i]);
    const pairs = groups.map(g => {
      const isX = spec.loci[g[0]].x, chrom = k => {
        const y = isX && ind.sex === "M" && k === 1;
        return '<div class="chrom' + (y ? " ychrom" : "") + '">' + (y ? '<span class="cl">Y</span>' : g.map(i => '<button class="al" ' + (o.edit ? "" : "disabled ") + 'data-k="' + k + '" data-i="' + i + '">' + ind.c[k][i] + "</button>").join("")) + "</div>";
      };
      return '<div class="pair">' + chrom(0) + chrom(1) + '<div class="cl">' + (isX ? "X" + (ind.sex === "M" ? " Y" : " X") : "") + "</div></div>";
    }).join("");
    return '<div class="pcard"><div class="sex">' + (ind.sex === "F" ? "♀" : "♂") + '</div><div class="pairs">' + pairs + '</div><div class="pph">' + (pheno(spec, ind) || "does not survive") + "</div></div>";
  }
  function wireCard(el, spec, get, onChange) {
    el.addEventListener("click", e => { const b = e.target.closest("button.al"); if (!b || b.disabled) return; const ind = get(), i = +b.dataset.i, k = +b.dataset.k, l = spec.loci[i];
      ind.c[k][i] = ind.c[k][i] === l.dom ? l.rec : l.dom; onChange(); });
  }
  return { card, wireCard, gametes, offspring, phenoDist, next, sample, pheno, geno, key, same, sup };
})();

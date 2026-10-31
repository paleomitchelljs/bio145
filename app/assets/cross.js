/* BIO 145 crosses: one engine for lessons 11 (parents to F1 to F2), 12 (mystery crosses) and 13 (hit the ratio), built on
   lesson 10's meiosis (BIO 202 lesson 9's bench, copied).

   A spec names the loci and how they show:
     { loci: [ { dom: "Y", rec: "y", ph: ["yellow", "green"], mode: "complete" | "incomplete" | "codominant",
                 het: "lavender",            the in-between look (incomplete / codominant)
                 x: true },                  on the X chromosome (males carry one copy)
               ... ],
       linked: 0.17 }                        loci 0 and 1 on one chromosome, this far apart (recombinant share); omit = independent

   An individual: { sex: "F" | "M", c: [hapA, hapB] }, each hap an array with one allele per locus; a male's hapB holds null at
   X loci (his Y). Alleles are the letters themselves.

     Cross.meiosis(spec, ind)       the four gametes of one meiosis   Cross.oneGamete(spec, ind)  one of them at random
     Cross.gametes(spec, ind)       [{ h, y, p }]    every gamete and its share; y: true for a Y-bearing sperm
     Cross.offspring(spec, mom, dad) Map key -> { ind, p }
     Cross.phenoDist(spec, dist)     { label: share }
     Cross.next(spec, dist)          the next generation from random mating within dist
     Cross.sample(dist, n)           n individuals drawn from dist
     Cross.pheno(spec, ind)          "yellow round", "white-eyed male", ...
     Cross.geno(spec, ind)           "Yy Rr", "XʳY", ...
*/
const Cross = (function () {
  /* ---- meiosis, copied from BIO 202 lesson 9's bench ------------------------------------------------------------
     A chromosome pair replicates into four chromatids, [copy A, copy A, copy B, copy B]. A crossover joins the two inner
     chromatids (1 and 2) and swaps everything past the cut (lesson 9's chromatids()). Division I sends the homologs to
     opposite poles, each pair choosing its side on its own (independent assortment); division II splits the sisters
     (lesson 9's newPlan / dealOrder). Here a pair is a "group": one locus on its own, the two linked loci, or the X
     (in a male the X and the Y, his Y carrying nothing).
     `spec.linked` is still the recombinant share a test cross shows; a crossover between the two loci happens in a
     meiosis with chance 2 x linked, and only two of its four chromatids come out recombinant. */
  function groups(spec) {
    const L = spec.loci.length, gs = [], used = new Set();
    if (spec.linked != null) { gs.push([0, 1]); used.add(0); used.add(1); }
    const xs = []; for (let i = 0; i < L; i++) if (!used.has(i) && spec.loci[i].x) { xs.push(i); used.add(i); }
    if (xs.length) gs.push(xs);
    for (let i = 0; i < L; i++) if (!used.has(i)) gs.push([i]);
    return gs;
  }
  function chromatids(ind, g, cut) {   /* lesson 9: k 0,1 one copy, k 2,3 the other; a cut swaps chromatids 1 and 2 past it */
    const cs = [0, 0, 1, 1].map(k => g.map(i => ind.c[k][i]));
    if (cut) for (let j = 1; j < g.length; j++) { const t = cs[1][j]; cs[1][j] = cs[2][j]; cs[2][j] = t; }
    return cs;
  }
  function newPlan(rng) { return { side: rng() < 0.5 ? 1 : 0, flip: [rng() < 0.5 ? 1 : 0, rng() < 0.5 ? 1 : 0] }; }
  function dealOrder(plan) {
    const L = plan.side ? [2, 3] : [0, 1], R = plan.side ? [0, 1] : [2, 3];
    const l = plan.flip[0] ? [L[1], L[0]] : L, r = plan.flip[1] ? [R[1], R[0]] : R;
    return [l[0], l[1], r[0], r[1]];
  }
  /* one meiosis: the four gametes it makes, each { h, y } */
  function meiosis(spec, ind, rng) {
    rng = rng || Math.random; const L = spec.loci.length, gs = groups(spec), out = [0, 1, 2, 3].map(() => ({ h: Array(L).fill(null), y: false }));
    for (const g of gs) {
      const cut = g.length > 1 && spec.linked != null && g[0] === 0 && g[1] === 1 && rng() < 2 * spec.linked;
      const cs = chromatids(ind, g, cut), ord = dealOrder(newPlan(rng));
      ord.forEach((k, gi) => { g.forEach((i, j) => out[gi].h[i] = cs[k][j]); if (spec.loci[g[0]].x && ind.sex === "M" && k >= 2) out[gi].y = true; });
    }
    return out;
  }
  const oneGamete = (spec, ind, rng) => meiosis(spec, ind, rng)[Math.floor((rng || Math.random)() * 4)];
  /* every gamete and its share: each group's four chromatids (cut and uncut), a quarter each, groups independent.
     The same chromatids() the bench and meiosis() use, so the exact ratios cannot say one thing while sampling does another. */
  function gametes(spec, ind) {
    const L = spec.loci.length, gs = groups(spec);
    let parts = [{ h: Array(L).fill(null), y: false, p: 1 }];
    for (const g of gs) {
      const linked = g.length > 1 && spec.linked != null && g[0] === 0 && g[1] === 1, opts = [];
      for (const [cut, pc] of linked ? [[false, 1 - 2 * spec.linked], [true, 2 * spec.linked]] : [[false, 1]]) {
        if (pc <= 0) continue;
        chromatids(ind, g, cut).forEach((c, k) => opts.push({ c, y: spec.loci[g[0]].x && ind.sex === "M" && k >= 2, p: pc / 4 }));
      }
      const nx = [];
      for (const a of parts) for (const o of opts) { const h = a.h.slice(); g.forEach((i, j) => h[i] = o.c[j]); nx.push({ h, y: a.y || o.y, p: a.p * o.p }); }
      parts = nx;
    }
    const m = new Map();   /* merge identical gametes */
    for (const x of parts) { const k = x.h.join(",") + "|" + x.y; if (m.has(k)) m.get(k).p += x.p; else m.set(k, x); }
    return [...m.values()];
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
  /* n offspring, each from one egg and one sperm, every gamete a real meiosis (one of its four, at random) */
  function breed(spec, mom, dad, n) {
    const anyX = spec.loci.some(l => l.x), out = [];
    for (let i = 0; i < n; i++) {
      const e = oneGamete(spec, mom), sp = oneGamete(spec, dad), sex = anyX ? (sp.y ? "M" : "F") : (Math.random() < 0.5 ? "F" : "M");
      out.push({ sex, c: [e.h.slice(), sp.h.map((a, j) => spec.loci[j].x && sex === "M" ? null : a)] });
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
  return { meiosis, oneGamete, breed, card, wireCard, gametes, offspring, phenoDist, next, sample, pheno, geno, key, same, sup };
})();

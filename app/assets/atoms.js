/* BIO 145 atoms: electronegativity as the course's recurring widget (JM: "Electronegativity as an organizing principle
   and recurring theme/widget"). One table, one way of drawing a bond's shared pair, one way of drawing a molecule with
   its partial charges and pull arrows. Lessons 2 (bonds, shape, water), 4 (functional groups), 6 (side chains) and
   28-30 (base pairs) draw with it.

     Atoms.EN.O                       3.44 (Pauling)
     Atoms.kind("C", "O")             "polar" | "nonpolar" | "ionic"
     Atoms.share("O", "H")            where the pair sits from the first atom (0) to the second (1)
     Atoms.drawBond(ctx, x1, y1, x2, y2, "O", "H", { r: 30 })
     Atoms.drawMol(ctx, mol, opts)    mol = { atoms: [{ el, x, y }], bonds: [[i, j, order]] }
                                      opts: { scale, ox, oy, charges, arrows, net, hbonds }; returns { q: [...], net: {x, y, len} }
*/
const Atoms = (function () {
  const EN = { H: 2.20, Li: 0.98, C: 2.55, N: 3.04, O: 3.44, F: 3.98, Na: 0.93, Mg: 1.31, P: 2.19, S: 2.58, Cl: 3.16, K: 0.82, Ca: 1.00 };
  const COL = { H: "#f4f4f1", C: "#4b4b48", N: "#3b5bdb", O: "#c92a2a", F: "#8fcf5a", Na: "#7048e8", Mg: "#2b8a3e", P: "#e8730c", S: "#e0b000", Cl: "#2f9e44", K: "#5f3dc4", Ca: "#868e96", Li: "#9c36b5" };
  const INK = { H: "#1d1d1b", S: "#1d1d1b", F: "#1d1d1b" };
  const RAD = { H: 0.62, C: 0.85, N: 0.82, O: 0.8, F: 0.75, Na: 1.1, Mg: 1.05, P: 1.0, S: 1.0, Cl: 0.98, K: 1.2, Ca: 1.1, Li: 1.0 };
  const NAME = { H: "hydrogen", C: "carbon", N: "nitrogen", O: "oxygen", F: "fluorine", Na: "sodium", Mg: "magnesium", P: "phosphorus", S: "sulfur", Cl: "chlorine", K: "potassium", Ca: "calcium", Li: "lithium" };
  const d = (a, b) => EN[b] - EN[a];
  function kind(a, b) { const x = Math.abs(d(a, b)); return x < 0.4 ? "nonpolar" : x < 1.7 ? "polar" : "ionic"; }
  function share(a, b) { const x = d(a, b); if (Math.abs(x) >= 1.7) return x > 0 ? 1 : 0; return 0.5 + 0.38 * x / 1.7; }

  function atom(ctx, x, y, el, r, halo) {
    if (halo) {   /* halo: partial charge, red for negative, blue for positive */
      const g = ctx.createRadialGradient(x, y, r * 0.6, x, y, r * 1.9), c = halo > 0 ? "47,107,143" : "178,58,72", a = Math.min(0.55, Math.abs(halo) * 0.5);
      g.addColorStop(0, "rgba(" + c + "," + a + ")"); g.addColorStop(1, "rgba(" + c + ",0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.9, 0, 7); ctx.fill();
    }
    ctx.fillStyle = COL[el] || "#999"; ctx.strokeStyle = "#1d1d1b"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = INK[el] || "#fff"; ctx.font = "600 " + Math.round(r * 0.9) + "px -apple-system,sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(el, x, y + 1);
  }

  /* one bond, big: two atoms, the shared pair drawn where the pull leaves it, a cloud around the pair, the partial charges */
  function drawBond(ctx, x1, y1, x2, y2, a, b, o) {
    o = o || {}; const R = o.r || 34, r1 = R * RAD[a], r2 = R * RAD[b], k = kind(a, b), s = share(a, b);
    const ux = (x2 - x1), uy = (y2 - y1), L = Math.hypot(ux, uy), nx = ux / L, ny = uy / L;
    const ax = x1 + nx * r1 * 0.7, ay = y1 + ny * r1 * 0.7, bx = x2 - nx * r2 * 0.7, by = y2 - ny * r2 * 0.7;
    const px = ax + (bx - ax) * s, py = ay + (by - ay) * s;
    ctx.save();
    const g = ctx.createRadialGradient(px, py, 2, px, py, L * 0.42);
    g.addColorStop(0, "rgba(47,107,143,0.38)"); g.addColorStop(1, "rgba(47,107,143,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(px, py, L * 0.42, R * 0.9, Math.atan2(uy, ux), 0, 7); ctx.fill();
    if (k !== "ionic") { ctx.strokeStyle = "#1d1d1b"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
    atom(ctx, x1, y1, a, r1); atom(ctx, x2, y2, b, r2);
    ctx.fillStyle = "#2f6b8f"; for (const off of [-5, 5]) { ctx.beginPath(); ctx.arc(px - ny * off, py + nx * off, 4.2, 0, 7); ctx.fill(); }
    ctx.font = "600 17px -apple-system,sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const lab = (x, y, rr, sgn) => { ctx.fillStyle = sgn < 0 ? "#b23a48" : "#2f6b8f"; ctx.fillText(k === "ionic" ? (sgn < 0 ? "−" : "+") : (sgn < 0 ? "δ−" : "δ+"), x, y - rr - 13); };
    if (k !== "nonpolar") { const sa = d(a, b) > 0 ? 1 : -1; lab(x1, y1, r1, sa); lab(x2, y2, r2, -sa); }
    ctx.restore();
    return { kind: k, share: s, diff: Math.abs(d(a, b)) };
  }

  /* partial charges: each bond moves charge toward its more electronegative atom, by the difference */
  function charges(mol) {
    const q = mol.atoms.map(() => 0);
    for (const [i, j] of mol.bonds) { const x = d(mol.atoms[i].el, mol.atoms[j].el); q[i] += x * 0.5; q[j] -= x * 0.5; }
    return q;   /* positive: electron-poor (δ+) */
  }
  function arrowTo(ctx, x1, y1, x2, y2, col, w) {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 6 + w * 1.5;
    ctx.strokeStyle = ctx.fillStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * h * 0.8, y2 - Math.sin(a) * h * 0.8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - h * Math.cos(a - 0.45), y2 - h * Math.sin(a - 0.45)); ctx.lineTo(x2 - h * Math.cos(a + 0.45), y2 - h * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
  }
  function drawMol(ctx, mol, o) {
    o = o || {}; const S = o.scale || 40, ox = o.ox || 0, oy = o.oy || 0, R = S * 0.42;
    const P = mol.atoms.map(a => ({ x: ox + a.x * S, y: oy + a.y * S }));
    const q = charges(mol);
    ctx.save(); ctx.lineCap = "round";
    for (const [i, j, ord] of mol.bonds) {
      const A = P[i], B = P[j], L = Math.hypot(B.x - A.x, B.y - A.y) || 1, nx = -(B.y - A.y) / L, ny = (B.x - A.x) / L;
      const offs = ord === 3 ? [-5, 0, 5] : ord === 2 ? [-3.5, 3.5] : [0];
      ctx.strokeStyle = (o.badBonds && o.badBonds.has(i + "-" + j)) ? "#a8331a" : "#1d1d1b"; ctx.lineWidth = 2.4;
      for (const f of offs) { ctx.beginPath(); ctx.moveTo(A.x + nx * f, A.y + ny * f); ctx.lineTo(B.x + nx * f, B.y + ny * f); ctx.stroke(); }
    }
    if (o.hbonds) for (const [A, B] of o.hbonds) {   /* dashed hydrogen bonds, between two points in molecule units */
      ctx.setLineDash([4, 4]); ctx.strokeStyle = "#2f6b8f"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox + A.x * S, oy + A.y * S); ctx.lineTo(ox + B.x * S, oy + B.y * S); ctx.stroke(); ctx.setLineDash([]);
    }
    mol.atoms.forEach((a, i) => atom(ctx, P[i].x, P[i].y, a.el, R * RAD[a.el], o.charges ? q[i] : 0));
    if (o.charges) mol.atoms.forEach((a, i) => {
      if (Math.abs(q[i]) < 0.25) return;
      ctx.fillStyle = q[i] > 0 ? "#2f6b8f" : "#b23a48"; ctx.font = "600 13px -apple-system,sans-serif"; ctx.textAlign = "center";
      ctx.fillText(q[i] > 0 ? "δ+" : "δ−", P[i].x + R * 0.95, P[i].y - R * 0.95);
    });
    let nx = 0, ny = 0;
    for (const [i, j] of mol.bonds) {   /* each bond's pull, from the electron-poor atom toward the greedy one */
      const x = d(mol.atoms[i].el, mol.atoms[j].el); if (Math.abs(x) < 0.4) continue;
      const [f, t] = x > 0 ? [i, j] : [j, i], A = P[f], B = P[t], L = Math.hypot(B.x - A.x, B.y - A.y) || 1;
      nx += (B.x - A.x) / L * Math.abs(x); ny += (B.y - A.y) / L * Math.abs(x);
      if (o.arrows) { const px = -(B.y - A.y) / L * 11, py = (B.x - A.x) / L * 11; arrowTo(ctx, A.x + (B.x - A.x) * 0.3 + px, A.y + (B.y - A.y) * 0.3 + py, A.x + (B.x - A.x) * 0.72 + px, A.y + (B.y - A.y) * 0.72 + py, "#b23a48", 2); }
    }
    const len = Math.hypot(nx, ny);
    if (o.net && len > 0.15) {
      const cx = P.reduce((s, p) => s + p.x, 0) / P.length, cy = P.reduce((s, p) => s + p.y, 0) / P.length, k = S * 0.9;
      arrowTo(ctx, cx - nx / len * Math.min(k, len * k) * 0.5, cy - ny / len * Math.min(k, len * k) * 0.5 + S * 1.4, cx + nx / len * Math.min(k, len * k) * 0.5, cy + ny / len * Math.min(k, len * k) * 0.5 + S * 1.4, "#1d1d1b", 4);
    }
    ctx.restore();
    return { q, net: { x: nx, y: ny, len }, P };
  }
  return { EN, COL, NAME, kind, share, atom, drawBond, drawMol, charges, arrowTo };
})();

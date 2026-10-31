// Walk every build of every lecture deck in jsdom: no script errors, every item's part exists, both themes.
//   node lectures/tools/check_decks.js            all decks
//   node lectures/tools/check_decks.js 01 02      some
// Canvas and layout are not checked: open the decks in a browser for that.
const path = require('path'), fs = require('fs');
const ROOT = path.resolve(__dirname, '..');
const { JSDOM, VirtualConsole } = require(path.resolve(ROOT, '..', 'node_modules', 'jsdom'));
const want = process.argv.slice(2);
const decks = fs.readdirSync(ROOT).filter((d) => /^lec\d\d$/.test(d) && (!want.length || want.includes(d.slice(3)))).sort();
(async () => {
  let bad = 0;
  for (const d of decks) {
    const file = path.join(ROOT, d, 'index.html'), errs = [], vc = new VirtualConsole();
    vc.on('jsdomError', (e) => /Could not load link/.test(e.message) || errs.push(String((e.detail && e.detail.stack) || e.message).split('\n').slice(0, 2).join(' ')));
    const dom = new JSDOM(fs.readFileSync(file, 'utf8'), { url: 'file://' + file, runScripts: 'dangerously', resources: 'usable', virtualConsole: vc, pretendToBeVisual: true,
      beforeParse(w) { w.matchMedia = () => ({ matches: false, addEventListener() {}, addListener() {} }); w.scrollTo = () => {}; } });
    await new Promise((r) => setTimeout(r, 600));
    const w = dom.window, D = w.Deck, notes = [];
    if (!D || !D.content) { console.log(d, 'DID NOT START', errs.slice(0, 3)); bad++; continue; }
    const segs = D.content.segments; let builds = 0;
    segs.forEach((s, i) => s.items.forEach((it) => { if (!D.parts[it.kind]) notes.push(`segment ${i} (${s.id}): no part "${it.kind}"`); if (it.kind === 'fig' && !D.figs[it.fig]) notes.push(`segment ${i}: no figure "${it.fig}"`); }));
    const poke = () => {   /* press every button and clickable part on screen, twice */
      for (let r = 0; r < 2; r++) w.document.querySelectorAll('#stage .seg:not(.off) .item:not(.off) .dm-btn, #stage .seg:not(.off) .item:not(.off) [data-k], #stage .seg:not(.off) .item:not(.off) .vt-row').forEach((e) => e.dispatchEvent(new w.MouseEvent('click', { bubbles: true })));
    };
    poke();
    for (let k = 0; k < 400; k++) { const a = D.where(); D.next(); builds++; const b = D.where(); if (a.s === b.s && a.b === b.b) break; poke(); }
    w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 't' }));
    w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'p' }));
    for (let k = 0; k < 400; k++) { const a = D.where(); D.prev(); const b = D.where(); if (a.s === b.s && a.b === b.b) break; }
    const mins = segs.map((s) => s.mins[1]).pop();
    if (errs.length || notes.length) bad++;
    console.log(d.padEnd(6), `${segs.length} segments, ${builds} builds, plan ${mins} min`, errs.length ? 'ERR ' + errs.slice(0, 3).join(' | ') : 'ok');
    notes.forEach((n) => console.log('   ', n));
    w.close();
  }
  process.exit(bad ? 1 : 0);
})();

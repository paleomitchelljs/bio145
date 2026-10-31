// Smoke test: every lesson in headless Chromium. Confirms a student name, checks for uncaught errors, then reloads
// as the instructor bypass and checks every stage opens and a completion code is minted.
//   node scripts/smoke.js                 all lessons
//   node scripts/smoke.js lesson3         one
const { chromium } = require("playwright");
const http = require("http"), fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".txt": "text/plain", ".json": "application/json" };
const server = http.createServer((q, r) => {
  const p = path.join(ROOT, decodeURIComponent(q.url.split("?")[0]));
  fs.readFile(p, (e, b) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { "Content-Type": TYPES[path.extname(p)] || "application/octet-stream" }); r.end(b); });
});
(async () => {
  await new Promise(ok => server.listen(8765, ok));
  const only = process.argv[2];
  const files = fs.readdirSync(path.join(ROOT, "app/lessons")).filter(f => /^lesson\d+\.html$/.test(f) && (!only || f === only + ".html"))
    .sort((a, b) => parseInt(a.slice(6)) - parseInt(b.slice(6)));
  const browser = await chromium.launch();
  let bad = 0;
  for (const f of files) {
    for (const who of ["Test Student", "jmitchell"]) {
      const page = await browser.newPage({ viewport: { width: 1300, height: 900 } });
      const errs = [];
      page.on("pageerror", e => errs.push(String(e)));
      page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
      await page.goto("http://localhost:8765/app/lessons/" + f);
      await page.fill("#score-name-input", who); await page.click("#score-name-confirm");
      await page.waitForTimeout(600);
      const st = await page.evaluate(() => ({
        locked: [...document.querySelectorAll("section.stage.stage-locked")].map(s => s.id),
        first: (document.querySelector("section.stage") || {}).id,
        code: (document.querySelector("#score-final") || {}).textContent || ""
      }));
      const okOpen = who === "jmitchell" ? st.locked.length === 0 && /v\d+\./.test(st.code) : !st.locked.includes(st.first);
      const line = f.padEnd(14) + who.padEnd(14) + (errs.length ? "ERR " + errs.slice(0, 3).join(" | ") : "ok") + (okOpen ? "" : "  STAGES " + st.locked.join(","));
      if (errs.length || !okOpen) bad++;
      console.log(line);
      if (process.env.SHOT) await page.screenshot({ path: path.join(process.env.SHOT, f.replace(".html", "_" + who.split(" ")[0] + ".png")), fullPage: true });
      await page.close();
    }
  }
  await browser.close(); server.close();
  process.exit(bad ? 1 : 0);
})();

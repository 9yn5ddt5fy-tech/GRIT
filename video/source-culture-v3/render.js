// usage: node render6.js <dir> <w> <h> keys <t1,t2,..>   |   node render6.js <dir> <w> <h> full <fps> <outdir>
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const [dir, w, h, mode, arg, out] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('file://' + path.join(dir, 'reel.html') + `?w=${w}&h=${h}`, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.reload({ waitUntil: 'networkidle' }); await pg.evaluate(() => document.fonts.ready);
  if (mode === 'keys') {
    for (const t of arg.split(',')) { await pg.evaluate(t => render(+t), t); await pg.screenshot({ path: path.join(dir, `k_${w}_${t}.jpg`), type: 'jpeg', quality: 80 }); }
  } else {
    const fps = +arg, dur = await pg.evaluate(() => DUR); fs.mkdirSync(out, { recursive: true });
    const n = Math.round(dur * fps);
    for (let f = 0; f < n; f++) { await pg.evaluate(t => render(t), f / fps); await pg.screenshot({ path: path.join(out, String(f).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 90 }); }
    console.log('frames', n);
  }
  console.log('errors', errs);
  await b.close();
})();

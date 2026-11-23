// usage: node render.js <dir> <html> <slides> [prefix]   -> <dir>/<prefix>-<n>.jpg at 1080x1350
const { chromium } = require('playwright'); const path = require('path');
const [dir, html, n, prefix = 'slide'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  for (let s = 1; s <= +n; s++) {
    await pg.goto('file://' + path.join(dir, html) + '?s=' + s, { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
    await pg.screenshot({ path: path.join(dir, `${prefix}-${s}.jpg`), type: 'jpeg', quality: 92 });
  }
  console.log('errors', errs); await b.close();
})();

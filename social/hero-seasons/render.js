// usage: node render.js <season> <desktop|mobile>  -> hero-<season>-<mode>.jpg
const { chromium } = require('playwright'); const path = require('path');
const [season, mode] = process.argv.slice(2); const D = mode === 'desktop';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: D ? 2560 : 1080, height: D ? 1440 : 1660 } });
  await p.goto('file://' + path.join(__dirname, `hero-${season}-${mode}.html`), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(__dirname, `hero-${season}-${mode}.jpg`), type: 'jpeg', quality: 82 });
  await b.close(); console.log('rendered', season, mode);
})();

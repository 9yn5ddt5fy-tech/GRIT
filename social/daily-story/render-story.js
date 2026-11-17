// Render story-<no>.html to story-<no>.jpg (1080x1920). Usage: node render-story.js 17
const { chromium } = require('playwright'), path = require('path');
(async () => {
  const no = process.argv[2];
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.join(__dirname, `story-${no}.html`), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(__dirname, `story-${no}.jpg`), type: 'jpeg', quality: 92 });
  await b.close(); console.log('saved', `story-${no}.jpg`);
})();

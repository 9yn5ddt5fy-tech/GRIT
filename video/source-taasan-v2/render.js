const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
const dir = process.argv[2], mode = process.argv[3] || 'keys';
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await pg.goto('file://' + path.join(dir, 'reel.html'), { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  if (mode === 'keys') {
    const ts = process.argv[4].split(',').map(Number);
    for (const t of ts) { await pg.evaluate(t => render(t), t); await pg.screenshot({ path: path.join(dir, `k_${t}.jpg`), type: 'jpeg', quality: 80 }); }
  } else {
    const fps = 30, dur = await pg.evaluate(() => DUR); fs.mkdirSync(path.join(dir, 'frames'), { recursive: true });
    for (let f = 0; f < Math.round(dur * fps); f++) { await pg.evaluate(t => render(t), f / fps); await pg.screenshot({ path: path.join(dir, 'frames', String(f).padStart(4, '0') + '.jpg'), type: 'jpeg', quality: 92 }); }
    console.log('frames', Math.round(dur * fps));
  }
  await b.close();
})();

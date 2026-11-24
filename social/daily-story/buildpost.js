// Daily word story (1080x1920) in the style of the game's own share card
// (culture/taasan-uu): black background, cross-stitch corners, the GRIT horse,
// "GRIT × Culture", a large "Таасан уу?" and cream tiles.
// Usage: node buildpost.js story-<no>.json  -> story-<no>.html (render with render-story.js)
const fs = require('fs'), path = require('path');
const cfgPath = process.argv[2];
const c = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '');

// The horse outline and the corner pattern come straight from the game, so both stay identical.
const game = fs.readFileSync(path.join(__dirname, '../../culture/taasan-uu/index.html'), 'utf8');
const HORSE = game.match(/const HORSE='([^']+)'/)[1];
const CORNER = JSON.parse('[' + game.match(/const CORNER=\[([\s\S]*?)\];/)[1] + ']');
const stitches = (pat, cell) => {
  let d = '';
  pat.forEach((r, y) => [...r].forEach((ch, x) => {
    if (ch !== 'X') return;
    const a = x * cell + cell * 0.2, b = y * cell + cell * 0.2, e = x * cell + cell * 0.8, f = y * cell + cell * 0.8;
    d += `M${a} ${b}L${e} ${f}M${e} ${b}L${a} ${f}`;
  }));
  return `<svg width="${pat[0].length * cell}" height="${pat.length * cell}"><path d="${d}" stroke="#f4f2ed" stroke-width="4" stroke-linecap="round"/></svg>`;
};
const rot = (p) => p.map((_, y) => [...p[0]].map((_, x) => p[p.length - 1 - y][p[0].length - 1 - x]).join(''));

const tiles = [...c.word].map((ch) => `<span class="tile">${esc(ch)}</span>`).join('');
const infoSize = c.info.length > 260 ? 32 : c.info.length > 190 ? 35 : 38;
const titleSize = c.title.length > 22 ? 52 : 60;

const html = `<!doctype html>
<html lang="mn"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#000}
.s{position:relative;width:1080px;height:1920px;overflow:hidden;background:#000;color:#f4f2ed;font-family:Onest,Arial,sans-serif;text-align:center}
.c1{position:absolute;left:70px;top:70px}.c2{position:absolute;right:70px;bottom:70px}
.logo{position:absolute;left:465px;top:200px;width:150px;height:150px}
.brand{position:absolute;left:0;right:0;top:392px;display:flex;justify-content:center;align-items:center;gap:22px;font-weight:700;font-size:38px}
.brand svg{width:26px;height:26px}
h1{position:absolute;left:0;right:0;top:458px;font-weight:800;font-size:132px;letter-spacing:-6px;line-height:1}
.meta{position:absolute;left:0;right:0;top:622px;font-weight:500;font-size:40px;color:rgba(244,242,237,.55)}
.tiles{position:absolute;left:0;right:0;top:760px;display:flex;justify-content:center;gap:14px}
.tile{display:flex;align-items:center;justify-content:center;width:132px;height:132px;border-radius:8px;background:#f4f2ed;color:#000;font-weight:800;font-size:80px}
.title{position:absolute;left:80px;right:80px;top:960px;font-weight:800;font-size:${titleSize}px;letter-spacing:-.02em;line-height:1.1}
.cat{margin-top:16px;font-weight:500;font-size:34px;color:rgba(244,242,237,.55)}
.info{margin:44px auto 0;max-width:860px;font-weight:500;font-size:${infoSize}px;line-height:1.5;color:rgba(244,242,237,.86)}
.ask{position:absolute;left:0;right:0;top:1588px;font-weight:600;font-size:44px}
.url{position:absolute;left:0;right:0;top:1656px;font-weight:800;font-size:46px}
</style></head><body>
<section class="s">
  <div class="c1">${stitches(CORNER, 22)}</div><div class="c2">${stitches(rot(CORNER), 22)}</div>
  <svg class="logo" viewBox="0 0 100 100"><path d="${HORSE}" fill="#f4f2ed" fill-rule="evenodd"/></svg>
  <div class="brand"><span>GRIT</span><svg viewBox="0 0 26 26"><path d="M2 2L24 24M24 2L2 24" stroke="#f4f2ed" stroke-width="5" stroke-linecap="round"/></svg><span>Culture</span></div>
  <h1>Таасан уу?</h1>
  <div class="meta">№${c.no}, ${esc(c.label.toLowerCase())}</div>
  <div class="tiles">${tiles}</div>
  <div class="title">${esc(c.title)}<div class="cat">${esc(cap(c.cat))}${c.era ? `, ${esc(c.era)}` : ''}</div><p class="info">${esc(c.info)}</p></div>
  <div class="ask">${esc(c.cta)}</div>
  <div class="url">grit.mn/culture/taasan-uu</div>
</section>
</body></html>`;
const out = path.join(path.dirname(path.resolve(cfgPath)), `story-${c.no}.html`);
fs.writeFileSync(out, html);
console.log('wrote', path.basename(out));

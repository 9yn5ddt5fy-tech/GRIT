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
const infoSize = c.info.length > 260 ? 30 : c.info.length > 190 ? 33 : 36;
const titleSize = c.title.length > 22 ? 54 : 66;

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
.tiles{position:absolute;left:0;right:0;top:744px;display:flex;justify-content:center;gap:14px}
.tile{display:flex;align-items:center;justify-content:center;width:132px;height:132px;border-radius:8px;background:#f4f2ed;color:#000;font-weight:800;font-size:80px}
.rule{position:absolute;left:0;right:0;top:932px;display:flex;justify-content:center}
.title{position:absolute;left:80px;right:80px;top:992px;height:540px;overflow:hidden;font-weight:800;font-size:${titleSize}px;letter-spacing:-.025em;line-height:1.08}
.chips{margin-top:26px;display:flex;justify-content:center;gap:14px}
.chip{padding:12px 26px;border:2px dashed rgba(244,242,237,.5);border-radius:8px;font-weight:600;font-size:30px;color:rgba(244,242,237,.85)}
.card{position:relative;margin:48px auto 0;max-width:900px;padding:40px 44px 42px;border-radius:12px;background:#121212;text-align:left}
.card h3{display:flex;align-items:center;gap:14px;font-weight:800;font-size:32px}
.card h3 svg{width:26px;height:26px}
.info{margin-top:16px;font-weight:500;font-size:${infoSize}px;line-height:1.5;color:rgba(244,242,237,.86)}
.ask{position:absolute;left:0;right:0;top:1566px;font-weight:600;font-size:42px}
.url{position:absolute;left:0;right:0;top:1630px;display:flex;justify-content:center}
.url span{padding:22px 46px;border-radius:12px;background:#f4f2ed;color:#000;font-weight:800;font-size:40px}
</style></head><body>
<section class="s">
  <div class="c1">${stitches(CORNER, 22)}</div><div class="c2">${stitches(rot(CORNER), 22)}</div>
  <svg class="logo" viewBox="0 0 100 100"><path d="${HORSE}" fill="#f4f2ed" fill-rule="evenodd"/></svg>
  <div class="brand"><span>GRIT</span><svg viewBox="0 0 26 26"><path d="M2 2L24 24M24 2L2 24" stroke="#f4f2ed" stroke-width="5" stroke-linecap="round"/></svg><span>Culture</span></div>
  <h1>Таасан уу?</h1>
  <div class="meta">№${c.no}, ${esc(c.label.toLowerCase())}</div>
  <div class="tiles">${tiles}</div>
  <div class="rule">${stitches(['X.X.X.X.X.X.X'], 18)}</div>
  <div class="title">${esc(c.title)}
    <div class="chips"><span class="chip">${esc(cap(c.cat))}</span>${c.era ? `<span class="chip">${esc(c.era)}</span>` : ''}</div>
    <div class="card"><h3>${stitches(['X'], 26)}Юу вэ?</h3><p class="info">${esc(c.info)}</p></div>
  </div>
  <div class="ask">${esc(c.cta)}</div>
  <div class="url"><span>grit.mn/culture/taasan-uu</span></div>
</section>
<script>
// shrink the explanation until the middle block fits above the call to action
const box = document.querySelector('.title'), info = document.querySelector('.info');
let fs = parseFloat(getComputedStyle(info).fontSize);
document.fonts.ready.then(() => { while (box.scrollHeight > box.clientHeight && fs > 22) { fs -= 1; info.style.fontSize = fs + 'px'; } });
</script>
</body></html>`;
const out = path.join(path.dirname(path.resolve(cfgPath)), `story-${c.no}.html`);
fs.writeFileSync(out, html);
console.log('wrote', path.basename(out));

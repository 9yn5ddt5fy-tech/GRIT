// Хэн бэ? story (1080x1920) in the same style as the word story (buildpost.js):
// black background, cross-stitch corners, the GRIT horse, the person's name and short story.
// Usage: node buildpost-hb.js story-hb-<n>.json  -> story-hb-<n>.html (render with render-story.js hb-<n>)
const fs = require('fs'), path = require('path');
const cfgPath = process.argv[2];
const c = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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
const nameSize = c.name.length > 18 ? 76 : c.name.length > 12 ? 96 : 118;

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
.mid{position:absolute;left:80px;right:80px;top:720px;height:820px;overflow:hidden;display:flex;flex-direction:column;align-items:center}
.name{display:inline-block;padding:22px 40px;border-radius:12px;background:#f4f2ed;color:#000;font-weight:800;font-size:${nameSize}px;letter-spacing:-.035em;line-height:1.05}
.rule{margin-top:34px}
.chips{margin-top:26px;display:flex;justify-content:center;gap:14px}
.chip{padding:12px 26px;border:2px dashed rgba(244,242,237,.5);border-radius:8px;font-weight:600;font-size:30px;color:rgba(244,242,237,.85)}
.card{margin-top:40px;width:100%;max-width:900px;padding:40px 44px 42px;border-radius:12px;background:#121212;text-align:left}
.card h3{display:flex;align-items:center;gap:14px;font-weight:800;font-size:32px}
.card h3 svg{width:26px;height:26px}
.info{margin-top:16px;font-weight:500;font-size:36px;line-height:1.5;color:rgba(244,242,237,.86)}
.ask{position:absolute;left:0;right:0;top:1566px;font-weight:600;font-size:42px}
.url{position:absolute;left:0;right:0;top:1630px;display:flex;justify-content:center}
.url span{padding:22px 46px;border-radius:12px;background:#f4f2ed;color:#000;font-weight:800;font-size:40px}
</style></head><body>
<section class="s">
  <div class="c1">${stitches(CORNER, 22)}</div><div class="c2">${stitches(rot(CORNER), 22)}</div>
  <svg class="logo" viewBox="0 0 100 100"><path d="${HORSE}" fill="#f4f2ed" fill-rule="evenodd"/></svg>
  <div class="brand"><span>GRIT</span><svg viewBox="0 0 26 26"><path d="M2 2L24 24M24 2L2 24" stroke="#f4f2ed" stroke-width="5" stroke-linecap="round"/></svg><span>Culture</span></div>
  <h1>Хэн бэ?</h1>
  <div class="meta">№${c.no}, ${esc(c.label.toLowerCase())}</div>
  <div class="mid">
    <div class="name">${esc(c.name)}</div>
    <div class="rule">${stitches(['X.X.X.X.X.X.X'], 18)}</div>
    <div class="chips"><span class="chip">${esc(c.era)}</span></div>
    <div class="card"><h3>${stitches(['X'], 26)}Товч түүх</h3><p class="info">${esc(c.info)}</p></div>
  </div>
  <div class="ask">${esc(c.cta)}</div>
  <div class="url"><span>grit.mn/culture/hen-be</span></div>
</section>
<script>
// shrink the story until the middle block fits above the call to action
const box = document.querySelector('.mid'), info = document.querySelector('.info');
let fs = parseFloat(getComputedStyle(info).fontSize);
document.fonts.ready.then(() => { while (box.scrollHeight > box.clientHeight && fs > 24) { fs -= 1; info.style.fontSize = fs + 'px'; } });
</script>
</body></html>`;
const out = path.join(path.dirname(path.resolve(cfgPath)), `story-hb-${c.day}.html`);
fs.writeFileSync(out, html);
console.log('wrote', path.basename(out));

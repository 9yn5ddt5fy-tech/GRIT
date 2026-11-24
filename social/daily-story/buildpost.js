// Daily word story (1080x1920) in the same style as the word posts in social/word-post:
// green background with the alkhan key pattern, gold letter tiles, bold cream title.
// Usage: node buildpost.js story-<no>.json  -> story-<no>.html (render with render-story.js)
const fs = require('fs'), path = require('path');
const cfgPath = process.argv[2];
const c = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tiles = [...c.word].map((ch) => `<span class="tile">${esc(ch)}</span>`).join('');
const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : '');
const md = c.date.split('.').slice(1).join('.');
// long explanations get a slightly smaller type size so they always fit the card
const infoSize = c.info.length > 260 ? 31 : c.info.length > 190 ? 34 : 37;
const titleSize = c.title.length > 22 ? 70 : 82;

const html = `<!doctype html>
<html lang="mn"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800;900&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:#000}
.s{position:relative;width:1080px;height:1920px;overflow:hidden;font-family:Onest,sans-serif;color:#f5f1e6;
  background:radial-gradient(ellipse at 30% 18%,#2a5a3b 0%,#173a26 45%,#0f2a1b 100%)}
.s::before{content:"";position:absolute;inset:0;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M6 54V6h48v36H24V24h12' fill='none' stroke='%23f5f1e6' stroke-width='3'/%3E%3C/svg%3E");background-size:60px 60px}
.brand{position:absolute;left:72px;top:190px;display:flex;align-items:center;gap:14px;font-weight:800;font-size:32px;letter-spacing:-.02em}
.brand img{height:46px}
.meta{position:absolute;right:72px;top:198px;display:flex;gap:22px;font-weight:700;font-size:28px;letter-spacing:.04em;color:rgba(245,241,230,.75)}
.top{position:absolute;left:0;right:0;top:350px;text-align:center}
.label{font-weight:700;font-size:34px;letter-spacing:.22em;color:#e5ad41;text-transform:uppercase}
.tiles{margin-top:50px}
.tile{display:inline-flex;align-items:center;justify-content:center;width:166px;height:166px;border-radius:28px;margin:0 7px;font-weight:900;font-size:100px;background:linear-gradient(160deg,#ffdd8a,#e5ad41);color:#1b1305;box-shadow:0 26px 44px -18px rgba(0,0,0,.55),inset 0 2px 0 rgba(255,255,255,.5)}
h1{margin:70px auto 0;max-width:920px;font-weight:900;font-size:${titleSize}px;letter-spacing:-.04em;line-height:1.12}
h1 span{padding:0 10px;background:linear-gradient(transparent 68%,rgba(229,173,65,.45) 68%,rgba(229,173,65,.45) 92%,transparent 92%);-webkit-box-decoration-break:clone;box-decoration-break:clone}
.chips{margin-top:34px;display:flex;justify-content:center;gap:14px}
.chip{display:inline-block;padding:13px 28px;border-radius:999px;background:rgba(245,241,230,.12);border:1px solid rgba(245,241,230,.25);font-weight:700;font-size:28px}
.card{margin:80px 72px 0;text-align:left;padding:44px 48px;border-radius:28px;background:rgba(245,241,230,.07);border:1px solid rgba(245,241,230,.16)}
.card h3{display:flex;align-items:center;gap:16px;font-weight:800;font-size:32px;text-transform:uppercase;letter-spacing:.02em}
.card h3 i{width:24px;height:24px;border-radius:6px;background:#e5ad41;flex:none}
.card p{margin-top:18px;font-size:${infoSize}px;line-height:1.5;color:rgba(245,241,230,.92)}
.cta{position:absolute;left:0;right:0;bottom:230px;text-align:center}
.cta b{display:block;font-weight:900;font-size:54px;letter-spacing:-.035em;line-height:1.1}
.pill{display:inline-block;margin-top:34px;padding:24px 54px;border-radius:999px;background:linear-gradient(160deg,#ffdd8a,#e5ad41);color:#1b1305;font-weight:800;font-size:38px}
.handle{margin-top:22px;font-weight:600;font-size:26px;color:rgba(245,241,230,.65)}
</style></head><body>
<section class="s">
  <div class="brand"><img src="../word-post/icon-horse.svg" alt=""><span>GRIT Culture</span></div>
  <div class="meta"><span>№${c.no}</span><span>${esc(md)}</span></div>
  <div class="top">
    <div class="label">${esc(c.label)}</div>
    <div class="tiles">${tiles}</div>
    <h1><span>${esc(c.title)}</span></h1>
    <div class="chips"><span class="chip">${esc(cap(c.cat))}</span>${c.era ? `<span class="chip">${esc(c.era)}</span>` : ''}</div>
    <div class="card"><h3><i></i>Юу вэ?</h3><p>${esc(c.info)}</p></div>
  </div>
  <div class="cta"><b>${esc(c.cta)}</b><span class="pill">grit.mn/culture/taasan-uu</span><div class="handle">@grit_edu_</div></div>
</section>
</body></html>`;
const out = path.join(path.dirname(path.resolve(cfgPath)), `story-${c.no}.html`);
fs.writeFileSync(out, html);
console.log('wrote', path.basename(out));

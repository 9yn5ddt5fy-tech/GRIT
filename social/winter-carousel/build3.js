// Builds winter.html: a painterly GRIT Culture winter post, drawn in SVG (no AI imagery).
const fs = require('fs');
const HORSE = fs.readFileSync(__dirname + '/horse.txt', 'utf8');
const W = 3240, H = 1440;
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// soft, lumpy cloud made of overlapping discs + spiral curls (üülen)
function cloud(cx, cy, s, tone = 'lt') {
  const c = tone === 'lt' ? ['#e9eef7', '#b9c6dd', '#8796b4'] : tone === 'mid' ? ['#9fadc8', '#75839f', '#4f5b78'] : ['#6c7894', '#4d5772', '#343c55'];
  const id = 'cg' + Math.round(cx) + Math.round(cy);
  let o = `<radialGradient id="${id}" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="${c[0]}"/><stop offset=".45" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient>`;
  let d = `<ellipse cx="${cx}" cy="${cy + 70 * s}" rx="${150 * s}" ry="${30 * s}" fill="#141a2e" opacity=".22" filter="url(#blur30)"/>`;
  const blobs = [[-1.1, .25, .55], [-.55, -.2, .7], [.1, -.35, .82], [.75, -.1, .66], [1.2, .3, .5], [0, .35, .6], [-.6, .45, .45], [.6, .45, .48]];
  for (const [x, y, r] of blobs) d += `<circle cx="${cx + x * 100 * s}" cy="${cy + y * 100 * s}" r="${r * 100 * s}" fill="url(#${id})"/>`;
  for (const [x, y, r] of blobs) if (y < .2) d += `<path d="M${cx + (x - r * .75) * 100 * s} ${cy + (y - r * .1) * 100 * s} A${r * 100 * s} ${r * 100 * s} 0 0 1 ${cx + (x + r * .2) * 100 * s} ${cy + (y - r * .98) * 100 * s}" fill="none" stroke="#ffffff" stroke-width="${7 * s}" stroke-linecap="round" opacity=".35" filter="url(#blur2)"/>`;
  // spiral curls on the front
  const curl = (x, y, r) => `<path d="M${x} ${y} m${r} 0 a${r} ${r} 0 1 0 ${-r * .3} ${r * .95} a${r * .65} ${r * .65} 0 1 0 ${r * .1} ${-r * 1.15} a${r * .35} ${r * .35} 0 1 0 ${-r * .3} ${r * .5}" fill="none" stroke="${c[0]}" stroke-width="${5 * s}" stroke-linecap="round" opacity=".85"/>`;
  d += curl(cx + 35 * s, cy - 5 * s, 34 * s) + curl(cx - 70 * s, cy + 20 * s, 22 * s);
  return { defs: o, body: `<g filter="url(#paintSoft)">${d}</g>` };
}

// toono: hub with cross bars, roof poles as light beams, outer ring with curl ornament
function toono(cx, cy, R = 430, r0 = 150) {
  let s = '';
  // glow behind
  s += `<circle cx="${cx}" cy="${cy}" r="${R + 60}" fill="url(#halo)"/>`;
  s += `<g opacity=".22" filter="url(#blur30)">` + Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, b = a + .07; return `<path d="M${cx} ${cy} L${cx + Math.cos(a) * 900} ${cy + Math.sin(a) * 900} L${cx + Math.cos(b) * 900} ${cy + Math.sin(b) * 900}Z" fill="#cfe6ff"/>`; }).join('') + `</g>`;
  // outer ring (thick, pale blue) with curl ornament
  s += `<g filter="url(#paint)"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#a9d2f2" stroke-width="40" opacity=".9"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#e8f4ff" stroke-width="3" stroke-dasharray="2 22" opacity=".9"/>`;
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    s += `<path transform="translate(${x} ${y}) rotate(${a * 180 / Math.PI + 90})" d="M-9 4 q0 -12 9 -12 q9 0 9 8 q0 6 -6 6 q-5 0 -5 -4" fill="none" stroke="#5f86b8" stroke-width="3.2" stroke-linecap="round"/>`;
  }
  s += `</g>`;
  // roof poles (uni) as tapered beams with white bands
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.13, ca = Math.cos(a), sa = Math.sin(a);
    const x1 = cx + ca * r0, y1 = cy + sa * r0, x2 = cx + ca * (R - 20), y2 = cy + sa * (R - 20);
    const nx = -sa, ny = ca;
    s += `<path d="M${x1 + nx * 7} ${y1 + ny * 7} L${x2 + nx * 15} ${y2 + ny * 15} L${x2 - nx * 15} ${y2 - ny * 15} L${x1 - nx * 7} ${y1 - ny * 7}Z" fill="url(#beam)" opacity=".85" filter="url(#paint)"/>`;
    for (const t of [.55, .62]) { const bx = cx + ca * (r0 + (R - r0) * t), by = cy + sa * (r0 + (R - r0) * t); s += `<path d="M${bx + nx * 12} ${by + ny * 12} L${bx - nx * 12} ${by - ny * 12}" stroke="#ffffff" stroke-width="7" opacity=".9" stroke-linecap="round"/>`; }
  }
  // hub ring
  s += `<g filter="url(#paint)"><circle cx="${cx}" cy="${cy}" r="${r0}" fill="#20304f" fill-opacity=".55" stroke="#bfe0fb" stroke-width="22"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r0 - 26}" fill="none" stroke="#7fa8d6" stroke-width="4" stroke-dasharray="3 12"/></g>`;
  // GRIT horse, frosted, inside the hub
  const k = 0.52;
  s += `<g transform="translate(${cx - 176 * k} ${cy - 221 * k - 6}) scale(${k})" filter="url(#glowSoft)"><path d="${HORSE}" fill="#eef4fb"/></g>`;
  s += `<g transform="translate(${cx - 176 * k} ${cy - 221 * k - 6}) scale(${k})" opacity=".55"><path d="${HORSE}" fill="url(#frost)"/></g>`;
  return s;
}

function ger(x, y, k) {
  // snowy ger with warm door light and smoke
  return `<g transform="translate(${x} ${y}) scale(${k})" filter="url(#paint)">
    <ellipse cx="0" cy="8" rx="190" ry="22" fill="#3a4166" opacity=".2"/>
    <path d="M-160 0 V-90 Q-160 -100 -150 -102 H150 Q160 -100 160 -90 V0Z" fill="#c7cfdc"/>
    <path d="M-160 -60 H160" stroke="#8d6a8f" stroke-width="10" opacity=".7"/>
    <path d="M-176 -96 Q-80 -190 0 -200 Q80 -190 176 -96 Q90 -110 0 -110 Q-90 -110 -176 -96Z" fill="#eef2f8"/>
    <path d="M-176 -96 Q-80 -190 0 -200 Q80 -190 176 -96" fill="none" stroke="#9eb0cc" stroke-width="5"/>
    <ellipse cx="0" cy="-40" rx="120" ry="90" fill="#ffcf7a" opacity=".28" filter="url(#blur30)"/>
    <rect x="-28" y="-95" width="56" height="95" rx="4" fill="#f2b84b"/>
    <rect x="-28" y="-95" width="56" height="95" rx="4" fill="url(#door)"/>
    <path d="M-12 -200 C -40 -260 30 -300 0 -360 C -30 -420 40 -450 10 -520" fill="none" stroke="#dfe6f2" stroke-width="22" stroke-linecap="round" opacity=".35"/>
  </g>`;
}

// ---- 3-slide winter carousel: Winter is here · Legends · Taasan uu?
const DEFS = fs.readFileSync(__dirname + '/parts_defs.txt', 'utf8')
  .replace(/width="\$\{W\}" height="\$\{H\}"/g, `width="${W}" height="${H}"`);

const clouds = [
  cloud(420, 520, 1.5, 'mid'), cloud(1240, 300, 1.4, 'dk'), cloud(2050, 330, 1.5, 'dk'), cloud(2900, 470, 1.6, 'mid'),
  cloud(60, 980, 1.3, 'mid'), cloud(1130, 980, 1.25, 'lt'), cloud(2140, 990, 1.3, 'lt'), cloud(3200, 980, 1.3, 'mid'),
];
let snow = '';
for (let i = 0; i < 620; i++) { const x = rnd() * W, y = rnd() * H, r = rnd() < .86 ? 1.2 + rnd() * 2.6 : 4 + rnd() * 4; snow += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffffff" opacity="${(.35 + rnd() * .55).toFixed(2)}"${r > 4 ? ' filter="url(#blur2)"' : ''}/>`; }

// distant mountain silhouettes along the whole panorama
let mtn = 'M0 1120';
let x = 0, k = 0;
while (x < W) { const w = 150 + ((k * 97) % 5) * 40, h = 70 + ((k * 61) % 4) * 45; mtn += ` L${x + w / 2} ${1120 - h} L${x + w} ${1120 - ((k * 37) % 3) * 12}`; x += w; k++; }
mtn += ` L${W} 1300 L0 1300Z`;

// ice tiles for Taasan uu?
const tile = (x, y, ch, kind) => {
  const fill = kind === 'ok' ? 'url(#iceGold)' : kind === 'pr' ? 'rgba(235,244,255,.25)' : kind === 'no' ? 'rgba(30,36,70,.55)' : 'rgba(235,244,255,.14)';
  const stroke = kind === 'pr' ? 'stroke="#e9f3ff" stroke-width="4" stroke-dasharray="10 7"' : 'stroke="rgba(235,244,255,.55)" stroke-width="3"';
  const col = kind === 'ok' ? '#2a1f12' : kind === 'no' ? 'rgba(235,244,255,.35)' : '#f4f8ff';
  return `<g filter="url(#paint)"><rect x="${x}" y="${y}" width="118" height="118" rx="14" fill="${fill}" ${stroke}/></g>` +
    `<path d="M${x + 14} ${y + 16} h46" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>` +
    (ch ? `<text x="${x + 59}" y="${y + 84}" text-anchor="middle" font-family="Onest" font-weight="800" font-size="66" fill="${col}">${ch}</text>` : '');
};
const tiles = (x0, y0) => {
  const rows = [['У', 'pr'], ['Л', 'pr'], ['А', 'no'], ['А', 'no'], ['Н', 'no']];
  const ok = ['Т', 'У', 'У', 'Л', 'Ь'];
  let o = '';
  rows.forEach(([c, k], i) => (o += tile(x0 + i * 132, y0, c, k)));
  ok.forEach((c, i) => (o += tile(x0 + i * 132, y0 + 132, c, 'ok')));
  return o;
};

const RIB = 'M-120 1050 C 400 1090, 800 960, 1100 1000 S 1500 1130, 1720 1100 S 2100 950, 2400 930 S 2900 1020, 3360 960';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${DEFS}
  <linearGradient id="iceGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#e9b44c"/></linearGradient>
  <radialGradient id="vig" cx=".5" cy=".5" r=".8"><stop offset=".62" stop-color="#0b0c1c" stop-opacity="0"/><stop offset="1" stop-color="#0b0c1c" stop-opacity=".5"/></radialGradient>
  <path id="rib" d="${RIB}"/>
  ${clouds.map((c) => c.defs).join('')}
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect width="${W}" height="${H}" filter="url(#wash)" opacity=".55"/>
<g filter="url(#paint)"><circle cx="880" cy="250" r="88" fill="url(#moon)"/></g>
<circle cx="880" cy="250" r="160" fill="#f6e08a" opacity=".12" filter="url(#blur30)"/>
${clouds[1].body}${clouds[2].body}${clouds[0].body}${clouds[3].body}
${toono(1620, 640, 380, 132)}
<path d="${mtn}" fill="#6f6d98" opacity=".85" filter="url(#paint)"/>
<path d="M0 1150 Q500 1100 1000 1140 T2000 1130 T3240 1140 V1440 H0Z" fill="#9b9cc0" filter="url(#paint)"/>
<path d="M0 1190 Q600 1140 1200 1180 T2400 1170 T3240 1180 V1440 H0Z" fill="url(#ground)" filter="url(#paint)"/>
${clouds[4].body}${clouds[5].body}${clouds[6].body}${clouds[7].body}
<use href="#rib" fill="none" stroke="rgba(20,24,52,.25)" stroke-width="112" transform="translate(0 10)"/>
<use href="#rib" fill="none" stroke="#eef3fb" stroke-width="106" opacity=".93" filter="url(#paintSoft)"/>
<use href="#rib" fill="none" stroke="#c9d6ec" stroke-width="4" transform="translate(0 44)" opacity=".8"/>
<text font-family="Onest" font-weight="800" font-size="40" letter-spacing="5" fill="#2d2f5c" dy="14"><textPath href="#rib">ДОМОГ СОНС ✦ ТҮҮХЭЭ МЭД ✦ ТААСАН УУ? ✦ ӨДӨР БҮР НЭГ ҮГ ✦ ДОМОГ СОНС ✦ ТҮҮХЭЭ МЭД ✦ ТААСАН УУ? ✦ ӨДӨР БҮР НЭГ ҮГ ✦ ДОМОГ СОНС ✦</textPath></text>
${ger(300, 1300, .95)}${ger(560, 1330, .7)}${ger(3000, 1310, .8)}
${tiles(2365, 400)}
<rect width="${W}" height="${H}" filter="url(#frostF)" mask="url(#frostMask)" opacity=".35"/>
${snow}
<rect width="${W}" height="${H}" fill="url(#vig)"/>
<rect width="${W}" height="${H}" filter="url(#grain)" opacity=".18" style="mix-blend-mode:overlay"/>
</svg>`;

const html = `<!doctype html><html lang="mn"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bad+Script&family=Onest:wght@600;700;800&display=block" rel="stylesheet">
<style>*{margin:0;padding:0}html,body{width:${W}px;height:${H}px;overflow:hidden;background:#000}
#c{position:relative;width:${W}px;height:${H}px;overflow:hidden}
.t{position:absolute;font-family:'Bad Script',cursive;color:#f4f8ff;white-space:nowrap;text-shadow:0 0 18px rgba(190,220,255,.65),0 2px 0 rgba(30,40,70,.35)}
.s{position:absolute;font-family:Onest,sans-serif;font-weight:800;color:#fff;letter-spacing:-.02em;text-shadow:0 2px 14px rgba(20,30,60,.75)}
.m{position:absolute;font-family:Onest,sans-serif;font-weight:700;color:#e9eefb;text-shadow:0 2px 10px rgba(20,30,60,.8)}
</style></head><body><div id="c">${svg}
<img src="logo.png" style="position:absolute;left:56px;top:56px;height:64px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.4))">
<!-- slide 1 -->
<div class="t" style="left:70px;top:190px;font-size:150px;line-height:1;transform:rotate(-8deg)">Өвөл ирлээ</div>
<div class="s" style="left:80px;top:470px;width:640px;font-size:48px;line-height:1.15">Урт шөнө —<br>домог сонсох цаг</div>
<div class="m" style="left:82px;top:620px;font-size:28px;opacity:.9">GRIT Culture · Цуврал</div>
<!-- slide 2 -->
<div class="t" style="left:1080px;width:1080px;text-align:center;top:70px;font-size:120px;line-height:1">Домог</div>
<div class="s" style="left:1080px;width:1080px;text-align:center;top:1255px;font-size:32px;line-height:1.35;color:#2d2f5c;text-shadow:none;font-weight:700">Өгийнуур · Тэрхийн Цагаан нуур · Тайхар чулуу<br>Бурхан Халдун · Хөдөө арал · Хархорум</div>
<!-- slide 3 -->
<div class="t" style="left:2160px;width:1080px;text-align:center;top:150px;font-size:140px;line-height:1;transform:rotate(-5deg)">Таасан уу?</div>
<div class="s" style="left:2160px;width:1080px;text-align:center;top:690px;font-size:44px;line-height:1.2">Өдөр бүр нэг түүхэн үг</div>
<div class="m" style="left:2160px;width:1080px;text-align:center;top:756px;font-size:28px;opacity:.95">6 оролдлого · сэжүүр · таасны дараа түүх нь</div>
<div class="s" style="left:2160px;width:1080px;text-align:center;top:1340px;font-size:30px;color:#2d2f5c;text-shadow:none;font-weight:700">grit.mn/culture · @grit_edu_</div>
</div></body></html>`;
fs.writeFileSync(__dirname + '/winter3.html', html.replace('src="logo.png"', 'src="../../assets/img/logo.png"'));
console.log('ok');

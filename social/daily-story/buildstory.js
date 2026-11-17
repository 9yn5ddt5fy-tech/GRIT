// Builds winter.html: a painterly GRIT Culture winter post, drawn in SVG (no AI imagery).
const fs = require('fs');
const HORSE = fs.readFileSync(__dirname + '/horse.txt', 'utf8');
const W = 0, H = 0;
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
  s += `<g filter="url(#paint)"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#a9d2f2" stroke-width="${40 * R / 430}" opacity=".9"/>`;
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
    const nx = -sa * R / 430, ny = ca * R / 430;
    s += `<path d="M${x1 + nx * 7} ${y1 + ny * 7} L${x2 + nx * 15} ${y2 + ny * 15} L${x2 - nx * 15} ${y2 - ny * 15} L${x1 - nx * 7} ${y1 - ny * 7}Z" fill="url(#beam)" opacity=".85" filter="url(#paint)"/>`;
    for (const t of [.55, .62]) { const bx = cx + ca * (r0 + (R - r0) * t), by = cy + sa * (r0 + (R - r0) * t); s += `<path d="M${bx + nx * 12} ${by + ny * 12} L${bx - nx * 12} ${by - ny * 12}" stroke="#ffffff" stroke-width="${7 * R / 430}" opacity=".9" stroke-linecap="round"/>`; }
  }
  // hub ring
  s += `<g filter="url(#paint)"><circle cx="${cx}" cy="${cy}" r="${r0}" fill="#20304f" fill-opacity=".55" stroke="#bfe0fb" stroke-width="${22 * r0 / 150}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r0 - 26}" fill="none" stroke="#7fa8d6" stroke-width="4" stroke-dasharray="3 12"/></g>`;
  // GRIT horse, frosted, inside the hub
  const k = 0.52 * r0 / 150;
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

// ---- Daily "word of the day" Instagram story (1080x1920), painterly winter night.
// Usage: node buildstory.js story.json  ->  writes story-<no>.html
const CFG = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const W3 = 1080, H3 = 1920;
const DEFS3 = fs.readFileSync(__dirname + '/parts_defs.txt', 'utf8').replace(/\$\{W\}/g, W3).replace(/\$\{H\}/g, H3);
// palette rotates by puzzle number so consecutive days look a little different
const SKIES = [
  ['#14162f', '#2d2f5c', '#4f4f82', '#7c7aa6', '#a7a9c8'],
  ['#101a30', '#203a5c', '#3d5f85', '#6f8fb0', '#a9bfd6'],
  ['#1a1430', '#3a2a5c', '#5e4682', '#8a72a6', '#b9a9c8'],
];
const SK = SKIES[(CFG.no - 1) % SKIES.length];
seed = 100 + CFG.no;
const cl3 = [cloud(70, 360, 1.1, 'mid'), cloud(1010, 300, 1.2, 'mid'), cloud(540, 150, .8, 'dk'), cloud(980, 1500, 1.15, 'lt'), cloud(60, 1560, 1.05, 'mid')];
let snow3 = '';
for (let i = 0; i < 170; i++) { const x = rnd() * W3, y = rnd() * H3, r = rnd() < .86 ? 1.2 + rnd() * 2.4 : 4 + rnd() * 3.5; snow3 += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffffff" opacity="${(.3 + rnd() * .55).toFixed(2)}"${r > 4 ? ' filter="url(#blur2)"' : ''}/>`; }
const letters = [...CFG.word];
const TS = 158, GAP = 18, tw = letters.length * TS + (letters.length - 1) * GAP, tx0 = (W3 - tw) / 2, ty0 = 590;
const tiles3 = letters.map((ch, i) => {
  const x = tx0 + i * (TS + GAP);
  return `<g filter="url(#paint)"><rect x="${x}" y="${ty0}" width="${TS}" height="${TS}" rx="18" fill="url(#iceGold3)" stroke="#fff4cf" stroke-width="3"/></g>` +
    `<path d="M${x + 18} ${ty0 + 22} h60" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".55"/>` +
    `<text x="${x + TS / 2}" y="${ty0 + 112}" text-anchor="middle" font-family="Onest" font-weight="900" font-size="92" fill="#2a1f12">${ch}</text>`;
}).join('');
const hz3 = 1600;
let mt3 = `M0 ${hz3}`, mx3 = 0, mk3 = 0;
while (mx3 < W3) { const w = 120 + ((mk3 * 97) % 5) * 34, h = 50 + ((mk3 * 61) % 4) * 36; mt3 += ` L${mx3 + w / 2} ${hz3 - h} L${mx3 + w} ${hz3 - ((mk3 * 37) % 3) * 10}`; mx3 += w; mk3++; }
mt3 += ` L${W3} ${hz3 + 150} L0 ${hz3 + 150}Z`;

const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" width="${W3}" height="${H3}" viewBox="0 0 ${W3} ${H3}">
<defs>${DEFS3}
  <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">${SK.map((c, i) => `<stop offset="${[0, .3, .58, .82, 1][i]}" stop-color="${c}"/>`).join('')}</linearGradient>
  <linearGradient id="iceGold3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="1" stop-color="#e5ad41"/></linearGradient>
  <linearGradient id="groundN3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3a4c8"/><stop offset=".4" stop-color="#7f80aa"/><stop offset="1" stop-color="#4d4d7a"/></linearGradient>
  <radialGradient id="vig3" cx=".5" cy=".45" r=".8"><stop offset=".6" stop-color="#0b0c1c" stop-opacity="0"/><stop offset="1" stop-color="#0b0c1c" stop-opacity=".5"/></radialGradient>
  ${cl3.map((c) => c.defs).join('')}
</defs>
<rect width="${W3}" height="${H3}" fill="url(#sky3)"/>
<rect width="${W3}" height="${H3}" filter="url(#wash)" opacity=".5"/>
<g filter="url(#paint)"><circle cx="905" cy="150" r="58" fill="url(#moon)"/></g>
<circle cx="905" cy="150" r="130" fill="#f6e08a" opacity=".12" filter="url(#blur30)"/>
<path d="M0 1700 Q270 1650 540 1675 T1080 1660 V1920 H0Z" fill="url(#groundN3)" filter="url(#paint)"/>
<path d="M0 1700 Q270 1650 540 1675 T1080 1660" fill="none" stroke="#e7ebf6" stroke-width="8" opacity=".5" filter="url(#paint)"/>
${tiles3}
${snow3}
<rect width="${W3}" height="${H3}" fill="url(#vig3)"/>
<rect width="${W3}" height="${H3}" filter="url(#grain)" opacity=".16" style="mix-blend-mode:overlay"/>
</svg>`;

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const html3 = `<!doctype html><html lang="mn"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bad+Script&family=Onest:wght@500;600;700;800;900&display=block" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W3}px;height:${H3}px;overflow:hidden;background:#000}
#c{position:relative;width:${W3}px;height:${H3}px;overflow:hidden;font-family:Onest,sans-serif;color:#fff}
.abs{position:absolute}
.script{font-family:'Bad Script',cursive;color:#f4f8ff;white-space:nowrap;text-shadow:0 0 18px rgba(190,220,255,.65),0 2px 0 rgba(30,40,70,.35)}
.chip{display:inline-flex;align-items:center;gap:14px;padding:12px 26px;border-radius:999px;background:rgba(255,255,255,.14);border:2px solid rgba(255,255,255,.35);backdrop-filter:blur(10px);font-weight:700;font-size:30px}
.card{position:absolute;left:96px;right:96px;top:900px;text-align:center}
.card h3{font-family:'Bad Script',cursive;font-weight:400;font-size:60px;color:#ffe9a8;line-height:1}
.card i{display:block;width:80px;height:3px;margin:26px auto 0;background:rgba(255,255,255,.45);border-radius:2px}
.card p{margin-top:26px;font-size:38px;line-height:1.45;font-weight:500;color:#eef1fa}
</style></head><body><div id="c">${svg3}
<img src="${CFG.logo || 'logo.png'}" class="abs" style="left:64px;top:250px;height:62px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.4))">
<div class="abs" style="right:64px;top:264px;font-weight:700;font-size:28px;letter-spacing:.06em;opacity:.9">№${CFG.no} · ${esc(CFG.date)}</div>
<div class="abs script" style="left:0;right:0;text-align:center;top:350px;font-size:116px;line-height:1">${esc(CFG.label)}</div>
<div class="abs" style="left:0;right:0;text-align:center;top:500px;font-weight:600;font-size:28px;letter-spacing:.08em;opacity:.75">${esc(CFG.cat + ' · ' + CFG.era).toUpperCase()}</div>
${'' /* tiles live in the SVG */}
<div class="card"><h3>${esc(CFG.title)}</h3><i></i><p>${esc(CFG.info).replace(/(\S+-\S+)/g, '<span style="white-space:nowrap">$1</span>')}</p></div>
<div class="abs" style="left:0;right:0;text-align:center;top:1450px;font-weight:800;font-size:44px;letter-spacing:-.02em;text-shadow:0 2px 14px rgba(20,30,60,.8)">${esc(CFG.cta)}</div>
<div class="abs" style="left:0;right:0;text-align:center;top:1506px;font-weight:600;font-size:30px;opacity:.92;text-shadow:0 2px 10px rgba(20,30,60,.8)">grit.mn/culture/taasan-uu</div>
</div></body></html>`;
fs.writeFileSync(__dirname + `/story-${CFG.no}.html`, html3);
console.log('ok', CFG.no);

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

// ---- Home hero background: winter night, no baked-in UI text except the script title (desktop only)
const MODE = process.argv[2] || 'desktop';
const DESK = MODE === 'desktop';
const W2 = DESK ? 2560 : 1080, H2 = DESK ? 1440 : 1660;
const DEFS = fs.readFileSync(__dirname + '/parts_defs.txt', 'utf8').replace(/\$\{W\}/g, W2).replace(/\$\{H\}/g, H2);

const L = DESK
  ? { moon: [700, 230, 74], toono: [1660, 610, 350, 122], horizon: 1010,
      clouds: [cloud(260, 430, 1.5, 'mid'), cloud(1120, 230, 1.2, 'dk'), cloud(2330, 330, 1.6, 'mid'), cloud(2480, 900, 1.3, 'lt'), cloud(120, 930, 1.2, 'mid'), cloud(1080, 930, 1.05, 'lt')],
      gers: [[1660, 1235, .95], [1420, 1268, .62]], title: [130, 400, 124] }
  : { moon: [905, 245, 46], toono: [540, 360, 158, 56], horizon: 1060,
      clouds: [cloud(60, 470, .9, 'mid'), cloud(1040, 520, .9, 'mid'), cloud(300, 210, .6, 'dk'), cloud(980, 1050, 1.1, 'lt'), cloud(60, 1080, 1, 'mid')],
      gers: [[760, 1330, .8]], title: null };

let snowH = '';
for (let i = 0; i < (DESK ? 420 : 230); i++) { const x = rnd() * W2, y = rnd() * H2, r = rnd() < .86 ? 1.2 + rnd() * 2.4 : 4 + rnd() * 3.5; snowH += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffffff" opacity="${(.3 + rnd() * .55).toFixed(2)}"${r > 4 ? ' filter="url(#blur2)"' : ''}/>`; }


// ---- winter livestock shelter, sheep and goats (painterly, desktop hero)
function shelter(x, y, k) {
  let fence = '';
  for (let i = -6; i <= 7; i++) { if (i >= -1 && i <= 2) continue; const fx = i * 34; fence += `<path d="M${fx} 0 V-58" stroke="#5a4552" stroke-width="7" stroke-linecap="round"/><path d="M${fx - 5} -60 h10" stroke="#f1f4fb" stroke-width="7" stroke-linecap="round"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${k})" filter="url(#paint)">
    <ellipse cx="20" cy="10" rx="300" ry="26" fill="#3a3f66" opacity=".22"/>
    ${fence}
    <path d="M-220 -40 H260 M-220 -18 H260" stroke="#6b5363" stroke-width="7" stroke-linecap="round"/>
    <path d="M-222 -46 H262" stroke="#eef2fa" stroke-width="5" stroke-linecap="round" opacity=".9"/>
    <path d="M-40 0 V-96 L150 -104 V0Z" fill="#5d4858"/>
    <path d="M-40 0 V-96 L-80 -84 V0Z" fill="#4a3946"/>
    ${[-20, 10, 40, 70, 100, 130].map((px) => `<path d="M${px} -4 V-96" stroke="#4a3946" stroke-width="3" opacity=".6"/>`).join('')}
    <path d="M-10 0 V-62 H70 V0Z" fill="#262840" opacity=".85"/>
    <path d="M-92 -86 L-48 -116 L168 -124 L182 -100 Z" fill="#f3f6fc"/>
    <path d="M-92 -86 L182 -100" stroke="#b9c6dd" stroke-width="6"/>
    <path d="M-60 -112 q40 -14 90 -6 q60 -12 120 -4" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity=".8"/>
  </g>`;
}
function sheepW(x, y, k, f = 1) {
  return `<g transform="translate(${x} ${y}) scale(${k * f} ${k})" filter="url(#paint)">
    <ellipse cx="0" cy="4" rx="34" ry="7" fill="#3a3f66" opacity=".22"/>
    <path d="M-16 -6 V6 M-6 -6 V7 M10 -6 V6 M18 -6 V6" stroke="#3b3346" stroke-width="4" stroke-linecap="round"/>
    ${[[-16, -22, 13], [-3, -27, 15], [12, -24, 13], [-10, -14, 12], [8, -14, 12]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="#ece7dc"/>`).join('')}
    <path d="M-26 -30 q16 -10 40 -6" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>
    <ellipse cx="27" cy="-24" rx="8" ry="10" fill="#2f2a36" transform="rotate(18 27 -24)"/>
    <path d="M22 -32 l-6 -4" stroke="#2f2a36" stroke-width="4" stroke-linecap="round"/>
  </g>`;
}
function goat(x, y, k, f = 1, c = '#6e5a52') {
  return `<g transform="translate(${x} ${y}) scale(${k * f} ${k})" filter="url(#paint)">
    <ellipse cx="0" cy="4" rx="30" ry="6" fill="#3a3f66" opacity=".22"/>
    <path d="M-14 -10 V6 M-6 -10 V7 M10 -10 V6 M16 -10 V6" stroke="#2f2a36" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M-22 -16 Q-22 -32 0 -32 Q20 -32 22 -18 Q20 -8 0 -8 Q-20 -8 -22 -16Z" fill="${c}"/>
    <path d="M-20 -26 q14 -8 34 -4" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".55"/>
    <path d="M18 -26 L30 -42 Q38 -44 38 -36 L30 -24Z" fill="${c}"/>
    <path d="M31 -42 q-2 -12 -10 -16 M34 -42 q2 -12 -4 -18" stroke="#d8cbb8" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M37 -30 l-2 8" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
    <path d="M-22 -18 l-6 -6" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
  </g>`;
}
const hz = L.horizon;
let mtnH = `M0 ${hz}`, mx = 0, mk = 0;
while (mx < W2) { const w = 140 + ((mk * 97) % 5) * 40, h = 60 + ((mk * 61) % 4) * 42; mtnH += ` L${mx + w / 2} ${hz - h} L${mx + w} ${hz - ((mk * 37) % 3) * 12}`; mx += w; mk++; }
mtnH += ` L${W2} ${hz + 200} L0 ${hz + 200}Z`;

const svgH = `<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}">
<defs>${DEFS}
  <linearGradient id="groundN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3a4c8"/><stop offset=".35" stop-color="#7f80aa"/><stop offset="1" stop-color="#4d4d7a"/></linearGradient>
  <radialGradient id="vigH" cx=".5" cy=".45" r=".8"><stop offset=".6" stop-color="#0b0c1c" stop-opacity="0"/><stop offset="1" stop-color="#0b0c1c" stop-opacity=".45"/></radialGradient>
  ${L.clouds.map((c) => c.defs).join('')}
</defs>
<rect width="${W2}" height="${H2}" fill="url(#sky)"/>
<rect width="${W2}" height="${H2}" filter="url(#wash)" opacity=".55"/>
<g filter="url(#paint)"><circle cx="${L.moon[0]}" cy="${L.moon[1]}" r="${L.moon[2]}" fill="url(#moon)"/></g>
<circle cx="${L.moon[0]}" cy="${L.moon[1]}" r="${L.moon[2] * 1.9}" fill="#f6e08a" opacity=".12" filter="url(#blur30)"/>
${L.clouds[2].body}${L.clouds[0].body}${L.clouds[1].body}
${toono(...L.toono)}
<path d="${mtnH}" fill="#6a6894" opacity=".9" filter="url(#paint)"/>
<path d="M0 ${hz + 40} Q${W2 * .25} ${hz} ${W2 * .5} ${hz + 30} T${W2} ${hz + 20} V${H2} H0Z" fill="#8c8cb4" filter="url(#paint)"/>
<path d="M0 ${hz + 90} Q${W2 * .3} ${hz + 50} ${W2 * .6} ${hz + 80} T${W2} ${hz + 70} V${H2} H0Z" fill="url(#groundN)" filter="url(#paint)"/>
${L.clouds.slice(3).map((c) => c.body).join('')}
${DESK ? `<path d="M1900 ${hz + 60} Q2100 ${hz - 70} 2330 ${hz - 95} Q2480 ${hz - 100} ${W2} ${hz - 60} V${hz + 90} H1900Z" fill="#9c9dc4" filter="url(#paint)"/><path d="M1960 ${hz + 30} Q2140 ${hz - 70} 2340 ${hz - 88} Q2480 ${hz - 92} ${W2} ${hz - 54}" fill="none" stroke="#e7ebf6" stroke-width="10" opacity=".55" filter="url(#paint)"/>` + shelter(2220, hz - 72, .9) + goat(2010, hz - 14, 1.05, 1, '#6e5a52') + sheepW(2090, hz - 28, 1.1, -1) + sheepW(2165, hz - 24, 1, 1) + goat(2240, hz - 20, .95, -1, '#3e3540') + sheepW(2325, hz - 32, 1.05, 1) + goat(2400, hz - 36, .9, -1, '#8a7a6c') + sheepW(1945, hz + 2, .9, 1) : ''}
${L.gers.map(([x, y, k]) => ger(x, y, k)).join('')}
${snowH}
<rect width="${W2}" height="${H2}" fill="url(#vigH)"/>
<rect width="${W2}" height="${H2}" filter="url(#grain)" opacity=".16" style="mix-blend-mode:overlay"/>
</svg>`;

const htmlH = `<!doctype html><html lang="mn"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bad+Script&display=block" rel="stylesheet">
<style>*{margin:0;padding:0}html,body{width:${W2}px;height:${H2}px;overflow:hidden;background:#000}#c{position:relative;width:${W2}px;height:${H2}px;overflow:hidden}
.t{position:absolute;font-family:'Bad Script',cursive;color:#f4f8ff;white-space:nowrap;text-shadow:0 0 18px rgba(190,220,255,.65),0 2px 0 rgba(30,40,70,.35)}</style></head>
<body><div id="c">${svgH}${L.title ? `<div class="t" style="left:${L.title[0]}px;top:${L.title[1]}px;font-size:${L.title[2]}px;line-height:1;transform:rotate(-8deg);transform-origin:left center">Өвөл ирлээ</div>` : ''}</div></body></html>`;
fs.writeFileSync(__dirname + `/hero-${MODE}.html`, htmlH);
console.log('ok', MODE);

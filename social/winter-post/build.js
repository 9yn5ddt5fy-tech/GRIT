// Builds winter.html: a painterly GRIT Culture winter post, drawn in SVG (no AI imagery).
const fs = require('fs');
const HORSE = fs.readFileSync(__dirname + '/horse.txt', 'utf8');
const W = 1080, H = 1920;
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
function toono(cx, cy) {
  let s = '';
  const R = 430, r0 = 150;
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
    <ellipse cx="0" cy="8" rx="190" ry="26" fill="#1c2235" opacity=".45"/>
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

const clouds = [
  cloud(120, 470, 1.9, 'mid'), cloud(980, 520, 1.6, 'mid'), cloud(540, 300, 1.5, 'dk'), cloud(180, 1180, 1.7, 'mid'),
  cloud(950, 1330, 1.7, 'lt'), cloud(-20, 1420, 1.2, 'lt'),
];
let snow = '';
for (let i = 0; i < 260; i++) { const x = rnd() * W, y = rnd() * H, r = rnd() < .85 ? 1.2 + rnd() * 2.6 : 4 + rnd() * 4; snow += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#ffffff" opacity="${(.35 + rnd() * .55).toFixed(2)}"${r > 4 ? ' filter="url(#blur2)"' : ''}/>`; }

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14162f"/><stop offset=".35" stop-color="#2d2f5c"/><stop offset=".62" stop-color="#4f4f82"/><stop offset=".85" stop-color="#7c7aa6"/><stop offset="1" stop-color="#a7a9c8"/></linearGradient>
  <radialGradient id="halo"><stop offset="0" stop-color="#d9efff" stop-opacity=".55"/><stop offset=".55" stop-color="#8ec2f0" stop-opacity=".22"/><stop offset="1" stop-color="#8ec2f0" stop-opacity="0"/></radialGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e6f4ff"/><stop offset="1" stop-color="#7fb6ea"/></linearGradient>
  <radialGradient id="moon" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#f6e08a"/><stop offset="1" stop-color="#d9b54a"/></radialGradient>
  <linearGradient id="frost" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#bcd6f2"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
  <linearGradient id="door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".9"/><stop offset="1" stop-color="#e08a2c" stop-opacity=".6"/></linearGradient>
  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd8e8"/><stop offset="1" stop-color="#eef2f9"/></linearGradient>
  <filter id="paint" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".018" numOctaves="3" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter>
  <filter id="paintSoft" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="20" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="1.6"/></filter>
  <filter id="glowSoft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="blur2"><feGaussianBlur stdDeviation="2"/></filter>
  <filter id="blur30"><feGaussianBlur stdDeviation="30"/></filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0"/></filter>
  <filter id="wash" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".0045" numOctaves="4" seed="21"/><feColorMatrix values="0 0 0 0 .85  0 0 0 0 .9  0 0 0 0 1  0 0 0 .5 -.12"/></filter>
  <filter id="frostF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="4" seed="3"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 14 -7.6"/></filter>
  <linearGradient id="frostMaskG" x1="0" y1="0" x2="0" y2="1"><stop offset=".86" stop-color="#000"/><stop offset=".97" stop-color="#fff"/></linearGradient>
  <mask id="frostMask"><rect width="${W}" height="${H}" fill="url(#frostMaskG)"/></mask>
  ${clouds.map((c) => c.defs).join('')}
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect width="${W}" height="${H}" filter="url(#wash)" opacity=".55"/>
<g filter="url(#paint)"><circle cx="820" cy="330" r="96" fill="url(#moon)"/></g>
<circle cx="820" cy="330" r="170" fill="#f6e08a" opacity=".12" filter="url(#blur30)"/>
${clouds[2].body}${clouds[0].body}${clouds[1].body}
${toono(540, 1000)}
${clouds[3].body}
<path d="M0 1450 L120 1380 L210 1420 L330 1330 L470 1430 L600 1360 L720 1410 L860 1320 L980 1400 L1080 1360 V1600 H0Z" fill="#6f6d98" opacity=".85" filter="url(#paint)"/><path d="M330 1330 L300 1362 L322 1356 L340 1372 L360 1350 Z M860 1320 L830 1352 L852 1346 L872 1362 L890 1340 Z M600 1360 L578 1384 L598 1380 L616 1392 Z" fill="#dfe3f2" filter="url(#paint)"/><path d="M0 1480 Q200 1430 420 1470 T860 1450 T1080 1470 V1600 H0Z" fill="#9b9cc0" filter="url(#paint)"/><path d="M0 1500 Q270 1440 540 1470 T1080 1450 V1920 H0Z" fill="url(#ground)" filter="url(#paint)"/>
<path d="M0 1560 Q300 1520 600 1550 T1080 1530" fill="none" stroke="#b7c3d8" stroke-width="10" opacity=".6" filter="url(#paint)"/>
${clouds[4].body}${clouds[5].body}
${ger(330, 1585, 1.3)}
<rect width="${W}" height="${H}" filter="url(#frostF)" mask="url(#frostMask)" opacity=".85"/>
${snow}
<radialGradient id="vig" cx=".5" cy=".48" r=".75"><stop offset=".6" stop-color="#0b0c1c" stop-opacity="0"/><stop offset="1" stop-color="#0b0c1c" stop-opacity=".55"/></radialGradient><rect width="${W}" height="${H}" fill="url(#vig)"/>
${[[90,620,16],[1000,880,22],[160,1260,12],[940,1640,18],[60,1830,26],[1030,300,14]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity=".55" filter="url(#blur2)"/>`).join('')}
<rect width="${W}" height="${H}" filter="url(#grain)" opacity=".18" style="mix-blend-mode:overlay"/>
</svg>`;

const html = `<!doctype html><html lang="mn"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bad+Script&family=Onest:wght@600;800&display=block" rel="stylesheet">
<style>*{margin:0;padding:0}html,body{width:${W}px;height:${H}px;overflow:hidden;background:#000}
#c{position:relative;width:${W}px;height:${H}px;overflow:hidden}
.t{position:absolute;font-family:'Bad Script',cursive;color:#f4f8ff;text-shadow:0 0 18px rgba(190,220,255,.65),0 2px 0 rgba(30,40,70,.35)}
.s{position:absolute;left:0;right:0;text-align:center;font-family:Onest,sans-serif;font-weight:800;color:#fff;letter-spacing:-.02em;text-shadow:0 2px 14px rgba(20,30,60,.7)}
</style></head><body><div id="c">${svg}
<div class="t" style="left:40px;right:40px;top:250px;text-align:center;font-size:178px;line-height:1;white-space:nowrap;transform:rotate(-8deg)">Өвөл ирлээ</div>
<div class="s" style="top:1690px;font-size:52px;line-height:1.15">Урт шөнө — домог сонсох цаг</div>
<div class="s" style="top:1780px;font-size:30px;font-weight:600;opacity:.9;letter-spacing:.02em">GRIT Culture · grit.mn/culture</div>
<img src="logo.png" style="position:absolute;left:56px;top:60px;height:70px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.4))">
</div></body></html>`;
fs.writeFileSync(__dirname + '/winter.html', html.replace('src="logo.png"', 'src="../../assets/img/logo.png"'));
console.log('ok', html.length);

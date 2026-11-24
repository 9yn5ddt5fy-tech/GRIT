// ---- Home hero background: winter night, no baked-in UI text except the script title (desktop only)
const MODE = process.argv[2] || 'desktop';
const DESK = MODE === 'desktop';
const W2 = DESK ? 2560 : 1080, H2 = DESK ? 1440 : 1660;
const DEFS = fs.readFileSync(__dirname + '/../parts_defs.txt', 'utf8').replace(/\$\{W\}/g, W2).replace(/\$\{H\}/g, H2);

const L = DESK
  ? { moon: [700, 230, 74], toono: [1660, 610, 350, 122], horizon: 1010,
      clouds: [cloud(260, 430, 1.5, 'mid'), cloud(1120, 230, 1.2, 'dk'), cloud(2330, 330, 1.6, 'mid'), cloud(2480, 900, 1.3, 'lt'), cloud(120, 930, 1.2, 'mid'), cloud(1080, 930, 1.05, 'lt')],
      gers: [[1660, 1235, .95], [1420, 1268, .62]], title: [130, 400, 124] }
  : { moon: [905, 245, 46], toono: [540, 360, 158, 56], horizon: 1060,
      clouds: [cloud(60, 470, .9, 'mid'), cloud(1040, 520, .9, 'mid'), cloud(300, 210, .6, 'dk'), cloud(980, 1050, 1.1, 'lt'), cloud(60, 1080, 1, 'mid')],
      gers: [[720, 1330, .8]], title: null };

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

let hillTex = '';
for (let i = 0; i < 260; i++) { const x = rnd() * 1480, y = hz - 240 + rnd() * 440, sc = .7 + rnd() * .8; hillTex += `<path d="M${(x - 16 * sc).toFixed(1)} ${y.toFixed(1)} q${(16 * sc).toFixed(1)} ${(-6 * sc).toFixed(1)} ${(32 * sc).toFixed(1)} 0" stroke="${['#eef2fa', '#c9d4e8', '#ffffff'][i % 3]}" stroke-width="${(2.2 * sc).toFixed(1)}" fill="none" stroke-linecap="round" opacity=".45"/>`; }
const LF = require(__dirname + '/../life.js')({ C: { vignette: '#1a1d36' }, SEASON: 'winter', W: W2, H: H2, hz, DESK, rnd });
const svgH = `<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}">
<defs>${DEFS}
  <linearGradient id="groundN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3a4c8"/><stop offset=".35" stop-color="#7f80aa"/><stop offset="1" stop-color="#4d4d7a"/></linearGradient>
  <clipPath id="hillClipW"><path d="M-20 ${hz + 40} Q150 ${hz - 120} 420 ${hz - 200} Q640 ${hz - 250} 900 ${hz - 175} Q1160 ${hz - 100} 1480 ${hz + 120} V${hz + 190} H-20Z"/></clipPath>
  <radialGradient id="vigH" cx=".5" cy=".45" r=".8"><stop offset=".6" stop-color="#0b0c1c" stop-opacity="0"/><stop offset="1" stop-color="#0b0c1c" stop-opacity=".45"/></radialGradient>
  ${L.clouds.map((c) => c.defs).join('')}
</defs>
<rect width="${W2}" height="${H2}" fill="url(#sky)"/>
<rect width="${W2}" height="${H2}" filter="url(#wash)" opacity=".55"/>
<g filter="url(#paint)"><circle cx="${L.moon[0]}" cy="${L.moon[1]}" r="${L.moon[2]}" fill="url(#moon)"/></g>
<circle cx="${L.moon[0]}" cy="${L.moon[1]}" r="${L.moon[2] * 1.9}" fill="#f6e08a" opacity=".12" filter="url(#blur30)"/>
${L.clouds[2].body}${L.clouds[0].body}${L.clouds[1].body}
${toono(...L.toono)}
${LF.sky}
<path d="${mtnH}" fill="#6a6894" opacity=".9" filter="url(#paint)"/>
${LF.ridge}
<path d="M0 ${hz + 40} Q${W2 * .25} ${hz} ${W2 * .5} ${hz + 30} T${W2} ${hz + 20} V${H2} H0Z" fill="#8c8cb4" filter="url(#paint)"/>
<path d="M0 ${hz + 90} Q${W2 * .3} ${hz + 50} ${W2 * .6} ${hz + 80} T${W2} ${hz + 70} V${H2} H0Z" fill="url(#groundN)" filter="url(#paint)"/>
${LF.ground}
${L.clouds.slice(3).map((c) => c.body).join('')}
${DESK ? `<g transform="translate(0 -70)"><path d="M-20 ${hz + 40} Q150 ${hz - 120} 420 ${hz - 200} Q640 ${hz - 250} 900 ${hz - 175} Q1160 ${hz - 100} 1480 ${hz + 120} V${hz + 190} H-20Z" fill="#9c9dc4" filter="url(#paint)"/><g clip-path="url(#hillClipW)">${hillTex}<ellipse cx="380" cy="${hz - 150}" rx="420" ry="90" fill="#ffffff" opacity=".18" filter="url(#blur30)"/></g><path d="M40 ${hz - 40} Q240 ${hz - 175} 470 ${hz - 215} Q660 ${hz - 248} 880 ${hz - 182}" fill="none" stroke="#e7ebf6" stroke-width="10" opacity=".55" filter="url(#paint)"/>` + shelter(560, hz - 205, .85) + sheepW(250, hz - 150, 1, 1) + goat(330, hz - 168, .95, 1, '#6e5a52') + sheepW(410, hz - 182, 1.05, -1) + sheepW(735, hz - 196, 1, 1) + goat(805, hz - 186, .95, -1, '#3e3540') + sheepW(880, hz - 170, 1, -1) + goat(955, hz - 150, .9, 1, '#8a7a6c') + `</g>` : ''}
${LF.hill}
${L.gers.map(([x, y, k]) => ger(x, y, k)).join('')}
${LF.mid}
${snowH}
${LF.front}
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

// Seasonal versions of the grit.mn home hero (spring, summer, autumn), painted in SVG
// in the same style as the winter hero: a glowing toono with the GRIT horse, clouds
// with curls, a hill with animals on the left, gers, and a hand-written title.
// Usage: node build.js <spring|summer|autumn|winter> <desktop|mobile>  -> hero-<season>-<mode>.html
const fs = require('fs');
const HORSE = fs.readFileSync(__dirname + '/horse.txt', 'utf8');
const SEASON = process.argv[2] || 'spring';
const MODE = process.argv[3] || 'desktop';
const DESK = MODE === 'desktop';
const W = DESK ? 2560 : 1080, H = DESK ? 1440 : 1660;
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// ---------------------------------------------------------------- palettes
const P = {
  spring: {
    title: 'Хавар ирлээ', titleCol: '#fffaf2', titleGlow: 'rgba(110,70,120,.7)',
    sky: ['#45608f', '#7c9cc7', '#c9b8cf', '#f2c8b8', '#fde3cc'], sun: ['#fff1c9', '#f7c98a'], sunR: 1.1, moon: false,
    clouds: { lt: ['#fffaf7', '#f6e0dc', '#d9bcc6'], mid: ['#fbf0f3', '#e6ccd6', '#bea2b6'], dk: ['#f0e0e8', '#cfb4c6', '#a58aa6'] },
    mtn: '#8d8fb8', hill2: '#a9c98d', ground: ['#b9dc8f', '#8cc06a', '#5f9a48'], hill: '#9fcd7c', hillRim: '#e4f3c9',
    ring: '#ffd9c9', ringDot: '#fff3ea', curl: '#c98a9c', beam: ['#fff6ef', '#ffc9b4'], band: '#ffffff', hub: '#4a5a7a', hubRing: '#ffe1d3', hubDash: '#d99aa8', halo: ['#ffe8dc', '#ffb9a1'], horse: '#fff8f2',
    gerWall: '#efe8dc', gerRoof: '#f7f1e6', gerRim: '#c9b49c', snowRoof: false,
    particles: 'petals', grain: .14, vignette: '#3a2a3e',
  },
  summer: {
    title: 'Зун ирлээ', titleCol: '#ffffff', titleGlow: 'rgba(120,180,230,.8)',
    sky: ['#1f5fae', '#3f86cf', '#78b4e4', '#b4dcf2', '#e8f6fb'], sun: ['#fff8c4', '#ffd24a'], sunR: 1.25, moon: false,
    clouds: { lt: ['#ffffff', '#e4eef8', '#b7c9dd'], mid: ['#f4f8fc', '#cddbe9', '#9fb2c8'], dk: ['#dfe8f2', '#b3c3d6', '#8a9cb3'] },
    mtn: '#6f8fb8', hill2: '#76b35a', ground: ['#8ccf5c', '#5fae45', '#3f8a37'], hill: '#7cc152', hillRim: '#c9ec9a',
    ring: '#ffe7a3', ringDot: '#fffbe9', curl: '#d79a2b', beam: ['#fffdf2', '#ffd970'], band: '#ffffff', hub: '#2f5a3a', hubRing: '#fff0bd', hubDash: '#e5ad41', halo: ['#fff6cf', '#ffe08a'], horse: '#fffef6',
    gerWall: '#f5f1e8', gerRoof: '#fbf8f1', gerRim: '#cdb894', snowRoof: false,
    particles: 'sparkle', grain: .12, vignette: '#123a2a',
  },
  autumn: {
    title: 'Намар ирлээ', titleCol: '#fff6e6', titleGlow: 'rgba(255,190,120,.75)',
    sky: ['#2b2546', '#5c3d63', '#a65a5c', '#e08d52', '#f6c77d'], sun: ['#ffe2a6', '#f08a3c'], sunR: 1.35, moon: false,
    clouds: { lt: ['#ffe7cf', '#e9b597', '#b57d76'], mid: ['#d6a091', '#a8736f', '#7a5058'], dk: ['#9c6f74', '#734f5c', '#4f3647'] },
    mtn: '#7a5a78', hill2: '#c79a4e', ground: ['#e0b864', '#c08f45', '#8e6233'], hill: '#d7a95a', hillRim: '#f6dca0',
    ring: '#ffc98a', ringDot: '#fff0d8', curl: '#b9632f', beam: ['#fff3df', '#ffb46a'], band: '#fff6e6', hub: '#5a3326', hubRing: '#ffd9a8', hubDash: '#d9823e', halo: ['#ffe2bf', '#ff9f5a'], horse: '#fff6ea',
    gerWall: '#ece0cc', gerRoof: '#f3e9d6', gerRim: '#b8936a', snowRoof: false,
    particles: 'leaves', grain: .15, vignette: '#2a1424',
  },
};
const C = P[SEASON];

// ---------------------------------------------------------------- shared painterly parts
function cloud(cx, cy, s, tone = 'lt') {
  const c = C.clouds[tone];
  const id = 'cg' + Math.round(cx) + Math.round(cy);
  const o = `<radialGradient id="${id}" cx=".38" cy=".28" r=".8"><stop offset="0" stop-color="${c[0]}"/><stop offset=".45" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient>`;
  let d = `<ellipse cx="${cx}" cy="${cy + 70 * s}" rx="${150 * s}" ry="${30 * s}" fill="${C.vignette}" opacity=".16" filter="url(#blur30)"/>`;
  const blobs = [[-1.1, .25, .55], [-.55, -.2, .7], [.1, -.35, .82], [.75, -.1, .66], [1.2, .3, .5], [0, .35, .6], [-.6, .45, .45], [.6, .45, .48]];
  for (const [x, y, r] of blobs) d += `<circle cx="${cx + x * 100 * s}" cy="${cy + y * 100 * s}" r="${r * 100 * s}" fill="url(#${id})"/>`;
  for (const [x, y, r] of blobs) if (y < .2) d += `<path d="M${cx + (x - r * .75) * 100 * s} ${cy + (y - r * .1) * 100 * s} A${r * 100 * s} ${r * 100 * s} 0 0 1 ${cx + (x + r * .2) * 100 * s} ${cy + (y - r * .98) * 100 * s}" fill="none" stroke="#ffffff" stroke-width="${7 * s}" stroke-linecap="round" opacity=".4" filter="url(#blur2)"/>`;
  const curl = (x, y, r) => `<path d="M${x} ${y} m${r} 0 a${r} ${r} 0 1 0 ${-r * .3} ${r * .95} a${r * .65} ${r * .65} 0 1 0 ${r * .1} ${-r * 1.15} a${r * .35} ${r * .35} 0 1 0 ${-r * .3} ${r * .5}" fill="none" stroke="${c[0]}" stroke-width="${5 * s}" stroke-linecap="round" opacity=".85"/>`;
  d += curl(cx + 35 * s, cy - 5 * s, 34 * s) + curl(cx - 70 * s, cy + 20 * s, 22 * s);
  return { defs: o, body: `<g filter="url(#paintSoft)">${d}</g>` };
}

function toono(cx, cy, R = 430, r0 = 150) {
  let s = `<circle cx="${cx}" cy="${cy}" r="${R + 60}" fill="url(#halo)"/>`;
  s += `<g opacity=".2" filter="url(#blur30)">` + Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2, b = a + .07; return `<path d="M${cx} ${cy} L${cx + Math.cos(a) * 900} ${cy + Math.sin(a) * 900} L${cx + Math.cos(b) * 900} ${cy + Math.sin(b) * 900}Z" fill="${C.halo[0]}"/>`; }).join('') + `</g>`;
  s += `<g filter="url(#paint)"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.ring}" stroke-width="${40 * R / 430}" opacity=".92"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.ringDot}" stroke-width="3" stroke-dasharray="2 22" opacity=".9"/>`;
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
    s += `<path transform="translate(${x} ${y}) rotate(${a * 180 / Math.PI + 90})" d="M-9 4 q0 -12 9 -12 q9 0 9 8 q0 6 -6 6 q-5 0 -5 -4" fill="none" stroke="${C.curl}" stroke-width="3.2" stroke-linecap="round"/>`;
  }
  s += `</g>`;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 + 0.13, ca = Math.cos(a), sa = Math.sin(a);
    const x1 = cx + ca * r0, y1 = cy + sa * r0, x2 = cx + ca * (R - 20), y2 = cy + sa * (R - 20);
    const nx = -sa * R / 430, ny = ca * R / 430;
    s += `<path d="M${x1 + nx * 7} ${y1 + ny * 7} L${x2 + nx * 15} ${y2 + ny * 15} L${x2 - nx * 15} ${y2 - ny * 15} L${x1 - nx * 7} ${y1 - ny * 7}Z" fill="url(#beam)" opacity=".88" filter="url(#paint)"/>`;
    for (const t of [.55, .62]) { const bx = cx + ca * (r0 + (R - r0) * t), by = cy + sa * (r0 + (R - r0) * t); s += `<path d="M${bx + nx * 12} ${by + ny * 12} L${bx - nx * 12} ${by - ny * 12}" stroke="${C.band}" stroke-width="${7 * R / 430}" opacity=".9" stroke-linecap="round"/>`; }
  }
  s += `<g filter="url(#paint)"><circle cx="${cx}" cy="${cy}" r="${r0}" fill="${C.hub}" fill-opacity=".6" stroke="${C.hubRing}" stroke-width="${22 * r0 / 150}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r0 - 26}" fill="none" stroke="${C.hubDash}" stroke-width="4" stroke-dasharray="3 12"/></g>`;
  const k = 0.52 * r0 / 150;
  s += `<g transform="translate(${cx - 176 * k} ${cy - 221 * k - 6}) scale(${k})" filter="url(#glowSoft)"><path d="${HORSE}" fill="${C.horse}"/></g>`;
  return s;
}

function ger(x, y, k) {
  return `<g transform="translate(${x} ${y}) scale(${k})" filter="url(#paint)">
    <ellipse cx="0" cy="8" rx="190" ry="22" fill="${C.vignette}" opacity=".2"/>
    <path d="M-160 0 V-90 Q-160 -100 -150 -102 H150 Q160 -100 160 -90 V0Z" fill="${C.gerWall}"/>
    <path d="M-160 -60 H160" stroke="#b8433a" stroke-width="10" opacity=".75"/>
    <path d="M-176 -96 Q-80 -190 0 -200 Q80 -190 176 -96 Q90 -110 0 -110 Q-90 -110 -176 -96Z" fill="${C.gerRoof}"/>
    <path d="M-176 -96 Q-80 -190 0 -200 Q80 -190 176 -96" fill="none" stroke="${C.gerRim}" stroke-width="5"/>
    <path d="M-120 -120 L-60 -170 M-40 -150 L0 -196 M40 -150 L0 -196 M120 -120 L60 -170" stroke="${C.gerRim}" stroke-width="5" opacity=".55"/>
    <rect x="-28" y="-95" width="56" height="95" rx="4" fill="#e3843a"/>
    <path d="M-18 -80 h36 M-18 -50 h36 M0 -90 v80" stroke="#ffd27a" stroke-width="4" opacity=".8"/>
    <path d="M-12 -200 C -40 -260 30 -300 0 -360 C -30 -420 40 -450 10 -520" fill="none" stroke="#ffffff" stroke-width="22" stroke-linecap="round" opacity=".3"/>
  </g>`;
}

// animals
function sheep(x, y, k, f = 1, wool = '#f3eee3') {
  return `<g transform="translate(${x} ${y}) scale(${k * f} ${k})" filter="url(#paint)">
    <ellipse cx="0" cy="4" rx="34" ry="7" fill="${C.vignette}" opacity=".2"/>
    <path d="M-16 -6 V6 M-6 -6 V7 M10 -6 V6 M18 -6 V6" stroke="#3b3346" stroke-width="4" stroke-linecap="round"/>
    ${[[-16, -22, 13], [-3, -27, 15], [12, -24, 13], [-10, -14, 12], [8, -14, 12]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}" fill="${wool}"/>`).join('')}
    <ellipse cx="27" cy="-24" rx="8" ry="10" fill="#2f2a36" transform="rotate(18 27 -24)"/>
    <path d="M22 -32 l-6 -4" stroke="#2f2a36" stroke-width="4" stroke-linecap="round"/>
  </g>`;
}
function goat(x, y, k, f = 1, c = '#6e5a52') {
  return `<g transform="translate(${x} ${y}) scale(${k * f} ${k})" filter="url(#paint)">
    <ellipse cx="0" cy="4" rx="30" ry="6" fill="${C.vignette}" opacity=".2"/>
    <path d="M-14 -10 V6 M-6 -10 V7 M10 -10 V6 M16 -10 V6" stroke="#2f2a36" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M-22 -16 Q-22 -32 0 -32 Q20 -32 22 -18 Q20 -8 0 -8 Q-20 -8 -22 -16Z" fill="${c}"/>
    <path d="M18 -26 L30 -42 Q38 -44 38 -36 L30 -24Z" fill="${c}"/>
    <path d="M31 -42 q-2 -12 -10 -16 M34 -42 q2 -12 -4 -18" stroke="#d8cbb8" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M37 -30 l-2 8" stroke="${c}" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}
function horse(x, y, k, f = 1, c = '#8a5a3c', mane = '#3a2418') {
  return `<g transform="translate(${x} ${y}) scale(${k * f} ${k})" filter="url(#paint)">
    <ellipse cx="0" cy="6" rx="46" ry="8" fill="${C.vignette}" opacity=".2"/>
    <path d="M-36 -40 Q-56 -30 -50 0 Q-44 -18 -38 -28" fill="${mane}"/>
    <path d="M-26 -24 L-30 6 M-16 -24 L-14 6 M18 -24 L16 6 M28 -24 L32 6" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="0" cy="-36" rx="40" ry="18" fill="${c}"/>
    <path d="M22 -48 Q34 -62 44 -70 L58 -64 Q48 -50 36 -30Z" fill="${c}"/>
    <path d="M42 -72 Q60 -80 76 -66 Q80 -58 72 -55 L56 -58 Q48 -62 42 -72Z" fill="${c}"/>
    <path d="M47 -74 l2 -11 l6 9" fill="${c}"/>
    <path d="M42 -72 Q30 -64 22 -48 Q30 -56 38 -57Z" fill="${mane}"/>
    <circle cx="60" cy="-68" r="2" fill="#1a1210"/>
  </g>`;
}
function lamb(x, y, k, f = 1) { return sheep(x, y, k * .62, f, '#fffaf0'); }

// extras
function flowers(x0, x1, yf, n, cols, s = 1) {
  let o = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + rnd() * (x1 - x0), y = yf(x) + rnd() * 40 * s, c = cols[i % cols.length], r = (4 + rnd() * 5) * s;
    o += `<path d="M${x} ${y} v${10 * s}" stroke="#4f7d3a" stroke-width="${2 * s}"/>`;
    for (let p = 0; p < 5; p++) { const a = p / 5 * Math.PI * 2; o += `<circle cx="${(x + Math.cos(a) * r * .8).toFixed(1)}" cy="${(y + Math.sin(a) * r * .8).toFixed(1)}" r="${(r * .6).toFixed(1)}" fill="${c}"/>`; }
    o += `<circle cx="${x}" cy="${y}" r="${(r * .35).toFixed(1)}" fill="#ffe27a"/>`;
  }
  return `<g filter="url(#paint)">${o}</g>`;
}
function larch(x, y, h, col) {
  const w = h * .32;
  return `<g filter="url(#paint)"><path d="M${x} ${y} V${y - h * .2}" stroke="#5a3b2a" stroke-width="${h * .05}"/>` +
    [0, 1, 2, 3].map((i) => { const yy = y - h * .15 - i * h * .2, ww = w * (1 - i * .2); return `<path d="M${x - ww} ${yy} L${x} ${yy - h * .32} L${x + ww} ${yy}Z" fill="${col}"/>`; }).join('') + `</g>`;
}
function haystack(x, y, k) {
  return `<g transform="translate(${x} ${y}) scale(${k})" filter="url(#paint)"><ellipse cx="0" cy="6" rx="80" ry="12" fill="${C.vignette}" opacity=".2"/>
    <path d="M-70 0 Q-74 -70 0 -96 Q74 -70 70 0Z" fill="#d9a948"/><path d="M-50 -30 q50 -20 100 0 M-56 -60 q56 -22 112 0" stroke="#b5832f" stroke-width="6" fill="none"/>
    <path d="M-40 -88 q40 -16 80 0" stroke="#f3d38a" stroke-width="8" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
}
function birds(pts, col = '#3a3049') {
  return `<g stroke="${col}" stroke-width="5" fill="none" stroke-linecap="round">` + pts.map(([x, y, s = 1]) => `<path d="M${x - 22 * s} ${y} q${11 * s} -12 ${22 * s} 0 q${11 * s} -12 ${22 * s} 0"/>`).join('') + `</g>`;
}
function pen(x, y, k) {
  let f = '';
  for (let i = -5; i <= 6; i++) { if (i >= -1 && i <= 1) continue; const fx = i * 34; f += `<path d="M${fx} 0 V-58" stroke="#6b4a36" stroke-width="7" stroke-linecap="round"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${k})" filter="url(#paint)">${f}<path d="M-180 -40 H220 M-180 -18 H220" stroke="#7d5940" stroke-width="7" stroke-linecap="round"/></g>`;
}

// ---------------------------------------------------------------- layout (same as the winter hero)
const L = DESK
  ? { sun: [700, 260, 74], toono: [1660, 610, 350, 122], horizon: 1010,
      clouds: [cloud(260, 430, 1.5, 'mid'), cloud(1120, 230, 1.2, 'dk'), cloud(2330, 330, 1.6, 'mid'), cloud(2480, 900, 1.3, 'lt'), cloud(120, 930, 1.2, 'mid'), cloud(1080, 930, 1.05, 'lt')],
      gers: [[1660, 1235, .95], [1420, 1268, .62]], title: [130, 400, 124] }
  : { sun: [905, 245, 46], toono: [540, 360, 158, 56], horizon: 1060,
      clouds: [cloud(60, 470, .9, 'mid'), cloud(1040, 520, .9, 'mid'), cloud(300, 210, .6, 'dk'), cloud(980, 1050, 1.1, 'lt'), cloud(60, 1080, 1, 'mid')],
      gers: [[760, 1330, .8]], title: null };
const hz = L.horizon;
let mtn = `M0 ${hz}`, mx = 0, mk = 0;
while (mx < W) { const w = 140 + ((mk * 97) % 5) * 40, h = 60 + ((mk * 61) % 4) * 42; mtn += ` L${mx + w / 2} ${hz - h} L${mx + w} ${hz - ((mk * 37) % 3) * 12}`; mx += w; mk++; }
mtn += ` L${W} ${hz + 200} L0 ${hz + 200}Z`;

// floating particles: petals (spring), light motes (summer), leaves (autumn)
let parts = '';
const NP = DESK ? 160 : 90;
for (let i = 0; i < NP; i++) {
  const x = rnd() * W, y = rnd() * H * .95, r = 2 + rnd() * 5, a = rnd() * 180;
  if (C.particles === 'petals') parts += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(r * 1.4).toFixed(1)}" ry="${(r * .8).toFixed(1)}" transform="rotate(${a.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${['#ffd6dc', '#ffffff', '#f6b9c8'][i % 3]}" opacity="${(.45 + rnd() * .45).toFixed(2)}"/>`;
  else if (C.particles === 'leaves') parts += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${(r * 1.2).toFixed(1)} ${(-r).toFixed(1)} ${(r * 2.6).toFixed(1)} 0 q${(-r * 1.4).toFixed(1)} ${(r * 1.1).toFixed(1)} ${(-r * 2.6).toFixed(1)} 0Z" transform="rotate(${a.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${['#f2a33a', '#e0662f', '#f6cf5a', '#b84a2a'][i % 4]}" opacity="${(.55 + rnd() * .4).toFixed(2)}"/>`;
  else if (i % 2) parts += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * .5).toFixed(1)}" fill="#fffbe0" opacity="${(.3 + rnd() * .4).toFixed(2)}" filter="url(#blur2)"/>`;
}

// the left hill and what stands on it
const hill = (dy = 0) => `<path d="M-20 ${hz + 40 + dy} Q150 ${hz - 120 + dy} 420 ${hz - 200 + dy} Q640 ${hz - 250 + dy} 900 ${hz - 175 + dy} Q1120 ${hz - 110 + dy} 1320 ${hz + 30 + dy} V${hz + 190 + dy} H-20Z" fill="${C.hill}" filter="url(#paint)"/><path d="M40 ${hz - 40 + dy} Q240 ${hz - 175 + dy} 470 ${hz - 215 + dy} Q660 ${hz - 248 + dy} 880 ${hz - 182 + dy}" fill="none" stroke="${C.hillRim}" stroke-width="10" opacity=".6" filter="url(#paint)"/>`;
let herd = '';
if (DESK) {
  const yh = (x) => hz - 70 - (x < 470 ? 40 + (x - 40) / 430 * 175 : 215 - (x - 470) / 410 * 30);
  if (SEASON === 'spring') herd = pen(560, hz - 275, .8) + sheep(250, hz - 220, 1) + lamb(300, hz - 222, 1, -1) + goat(360, hz - 240, .95) + sheep(450, hz - 258, 1.05, -1) + lamb(500, hz - 262, 1) + sheep(735, hz - 266, 1) + lamb(790, hz - 262, 1, -1) + goat(870, hz - 244, .95, -1, '#3e3540') + flowers(80, 1200, yh, 46, ['#8f6bd6', '#b28be8', '#ffffff'], 1.3);
  if (SEASON === 'summer') herd = horse(330, hz - 230, 1.15) + horse(470, hz - 262, 1, -1, '#e9dcc0', '#6b5a44') + horse(640, hz - 276, 1.1, 1, '#3a2a20', '#1d140f') + sheep(800, hz - 262, 1) + sheep(860, hz - 250, .95, -1) + goat(930, hz - 236, .9) + flowers(80, 1200, yh, 54, ['#ffe25a', '#ffffff', '#ff8a5a', '#8fb0ff'], 1.2);
  if (SEASON === 'autumn') herd = haystack(560, hz - 262, 1.05) + haystack(700, hz - 262, .8) + sheep(250, hz - 220, 1) + goat(330, hz - 238, .95, 1, '#6e5a52') + sheep(410, hz - 252, 1.05, -1) + sheep(830, hz - 254, 1, -1) + goat(905, hz - 236, .95, -1, '#3e3540') + larch(140, hz - 175, 170, '#e7a43a') + larch(1060, hz - 200, 150, '#d9822e') + larch(1150, hz - 160, 120, '#f0b84a');
  herd = `<g transform="translate(0 -70)">${hill()}</g>` + herd;
} else {
  // phone: a few animals on the near ground
  const gy = hz + 250;
  if (SEASON === 'spring') herd = sheep(170, gy, 1.1) + lamb(230, gy + 4, 1.1, -1) + goat(320, gy - 6, 1) + flowers(40, 1040, () => gy + 40, 26, ['#8f6bd6', '#b28be8', '#ffffff'], 1.4);
  if (SEASON === 'summer') herd = horse(210, gy, 1.2) + horse(360, gy - 10, 1, -1, '#e9dcc0', '#6b5a44') + flowers(40, 1040, () => gy + 40, 30, ['#ffe25a', '#ffffff', '#ff8a5a'], 1.3);
  if (SEASON === 'autumn') herd = haystack(230, gy, 1) + sheep(380, gy + 4, 1.1, -1) + larch(80, gy - 30, 200, '#e7a43a') + larch(980, gy - 60, 160, '#d9822e');
}
const flock = SEASON === 'autumn' ? birds(DESK ? [[1080, 520, 1.4], [1140, 560, 1.2], [1200, 600, 1.1], [1020, 560, 1.2], [960, 600, 1.1], [1260, 640, 1]] : [[640, 760, 1], [690, 790, .9], [590, 790, .9]], '#3b2a3a')
  : SEASON === 'spring' ? birds(DESK ? [[2150, 620, 1.3], [2210, 650, 1.1], [2090, 660, 1.1]] : [[860, 760, 1], [910, 790, .9]], '#4a4060')
  : birds(DESK ? [[980, 560, 1], [1030, 590, .8]] : [[860, 760, .9]], '#2d4a6a');

const DEFS = fs.readFileSync(__dirname + '/parts_defs.txt', 'utf8').replace(/\$\{W\}/g, W).replace(/\$\{H\}/g, H)
  .replace(/<linearGradient id="sky"[^]*?<\/linearGradient>/, `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">${C.sky.map((c, i) => `<stop offset="${[0, .3, .58, .82, 1][i]}" stop-color="${c}"/>`).join('')}</linearGradient>`)
  .replace(/<radialGradient id="halo">[^]*?<\/radialGradient>/, `<radialGradient id="halo"><stop offset="0" stop-color="${C.halo[0]}" stop-opacity=".55"/><stop offset=".55" stop-color="${C.halo[1]}" stop-opacity=".22"/><stop offset="1" stop-color="${C.halo[1]}" stop-opacity="0"/></radialGradient>`)
  .replace(/<linearGradient id="beam"[^]*?<\/linearGradient>/, `<linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.beam[0]}"/><stop offset="1" stop-color="${C.beam[1]}"/></linearGradient>`)
  .replace(/<radialGradient id="moon"[^]*?<\/radialGradient>/, `<radialGradient id="moon" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="${C.sun[0]}"/><stop offset="1" stop-color="${C.sun[1]}"/></radialGradient>`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${DEFS}
  <linearGradient id="groundS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ground[0]}"/><stop offset=".4" stop-color="${C.ground[1]}"/><stop offset="1" stop-color="${C.ground[2]}"/></linearGradient>
  <radialGradient id="vigS" cx=".5" cy=".45" r=".8"><stop offset=".62" stop-color="${C.vignette}" stop-opacity="0"/><stop offset="1" stop-color="${C.vignette}" stop-opacity=".38"/></radialGradient>
  ${L.clouds.map((c) => c.defs).join('')}
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<rect width="${W}" height="${H}" filter="url(#wash)" opacity=".35"/>
<circle cx="${L.sun[0]}" cy="${L.sun[1]}" r="${L.sun[2] * C.sunR * 2.4}" fill="${C.sun[0]}" opacity=".22" filter="url(#blur30)"/>
<g filter="url(#paint)"><circle cx="${L.sun[0]}" cy="${L.sun[1]}" r="${L.sun[2] * C.sunR}" fill="url(#moon)"/></g>
${L.clouds[2].body}${L.clouds[0].body}${L.clouds[1].body}
${flock}
${toono(...L.toono)}
<path d="${mtn}" fill="${C.mtn}" opacity=".9" filter="url(#paint)"/>
<path d="M0 ${hz + 40} Q${W * .25} ${hz} ${W * .5} ${hz + 30} T${W} ${hz + 20} V${H} H0Z" fill="${C.hill2}" filter="url(#paint)"/>
<path d="M0 ${hz + 90} Q${W * .3} ${hz + 50} ${W * .6} ${hz + 80} T${W} ${hz + 70} V${H} H0Z" fill="url(#groundS)" filter="url(#paint)"/>
${L.clouds.slice(3).map((c) => c.body).join('')}
${herd}
${L.gers.map(([x, y, k]) => ger(x, y, k)).join('')}
${parts}
<rect width="${W}" height="${H}" fill="url(#vigS)"/>
<rect width="${W}" height="${H}" filter="url(#grain)" opacity="${C.grain}" style="mix-blend-mode:overlay"/>
</svg>`;

const html = `<!doctype html><html lang="mn"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bad+Script&display=block" rel="stylesheet">
<style>*{margin:0;padding:0}html,body{width:${W}px;height:${H}px;overflow:hidden;background:#000}#c{position:relative;width:${W}px;height:${H}px;overflow:hidden}
.t{position:absolute;font-family:'Bad Script',cursive;color:${C.titleCol};white-space:nowrap;text-shadow:0 0 18px ${C.titleGlow},0 2px 0 rgba(30,30,50,.3)}</style></head>
<body><div id="c">${svg}${L.title ? `<div class="t" style="left:${L.title[0]}px;top:${L.title[1]}px;font-size:${L.title[2]}px;line-height:1;transform:rotate(-8deg);transform-origin:left center">${C.title}</div>` : ''}</div></body></html>`;
fs.writeFileSync(__dirname + `/hero-${SEASON}-${MODE}.html`, html);
console.log('ok', SEASON, MODE);

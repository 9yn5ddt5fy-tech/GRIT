// Builds winter.html: a painterly GRIT Culture winter post, drawn in SVG (no AI imagery).
const fs = require('fs');
const HORSE = fs.readFileSync(__dirname + '/../horse.txt', 'utf8');
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

const ger = require(__dirname + '/../ger.js')({
  wall: '#c7cfdc', roof: '#eef2f8', shade: '#9eabc2', skirt: '#8f9bb5', rope: '#4d4660',
  band: '#2c5aa0', band2: '#e8eef8', door: '#e08a2c', frame: '#6a3a22', ornament: '#ffe2a0', ink: '#1a1d36',
  snow: '#ffffff', glow: '#ffcf7a',
});


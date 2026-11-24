// A Mongol ger drawn the way it is built: a low wall of lattice (хана) under a white canvas
// cover with three ropes (бүслүүр) and a darker skirt at the ground (хаяавч), a shallow
// straight cone roof on roof poles (унь) with a patterned band at its edge, the crown
// (тооно) half covered by its felt flap (өрх), the stove pipe (яндан) with smoke, and a
// low, painted wooden door (хаалга) facing the viewer.
// Usage: const ger = require('./ger.js')({ wall, roof, shade, rope, band, band2, door, frame, snow, glow, ink });
module.exports = (G) => function ger(x, y, k) {
  const id = 'gr' + Math.round(x) + Math.round(y);
  const Wd = 176, Wh = 112, Rx = 186, Ry = -Wh - 6, Tx = 34, Ty = -184; // half width, wall height, roof edge, toono
  // the wall bottom and ropes follow the cylinder: a gentle smile when seen from a little above
  const arc = (yy, bow = 7) => `M${-Wd} ${yy} Q0 ${yy + bow} ${Wd} ${yy}`;
  let s = `<defs><linearGradient id="${id}w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${G.shade}"/><stop offset=".35" stop-color="${G.wall}"/><stop offset=".65" stop-color="${G.wall}"/><stop offset="1" stop-color="${G.shade}"/></linearGradient>
    <linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${G.shade}"/><stop offset=".45" stop-color="${G.roof}"/><stop offset="1" stop-color="${G.shade}"/></linearGradient></defs>`;
  s += `<g transform="translate(${x} ${y}) scale(${k})" filter="url(#paint)">`;
  s += `<ellipse cx="10" cy="10" rx="${Wd + 40}" ry="24" fill="${G.ink}" opacity=".18"/>`;
  // wall with canvas cover
  s += `<path d="M${-Wd} 0 V${-Wh} Q0 ${-Wh + 8} ${Wd} ${-Wh} V0 Q0 8 ${-Wd} 0Z" fill="url(#${id}w)"/>`;
  // skirt (хаяавч)
  s += `<path d="M${-Wd} -16 Q0 -8 ${Wd} -16 V0 Q0 8 ${-Wd} 0Z" fill="${G.skirt || G.shade}" opacity=".9"/>`;
  // three ropes around the wall (бүслүүр)
  for (const yy of [-40, -66, -92]) s += `<path d="${arc(yy)}" fill="none" stroke="${G.rope}" stroke-width="4.5" stroke-linecap="round"/>`;
  // roof: shallow straight cone
  s += `<path d="M${-Rx} ${Ry} L${-Tx} ${Ty} Q0 ${Ty - 4} ${Tx} ${Ty} L${Rx} ${Ry} Q0 ${Ry + 14} ${-Rx} ${Ry}Z" fill="url(#${id}r)"/>`;
  // canvas seams down the roof
  for (const t of [-.55, .55]) s += `<path d="M${Tx * t * 1.6} ${Ty + 3} L${Rx * t} ${Ry + 8}" stroke="${G.shade}" stroke-width="2.5" opacity=".8"/>`;
  // patterned band along the roof edge
  s += `<path d="M${-Rx} ${Ry} Q0 ${Ry + 14} ${Rx} ${Ry} L${Rx - 14} ${Ry - 14} Q0 ${Ry} ${-Rx + 14} ${Ry - 14}Z" fill="${G.band}"/>`;
  for (let i = -6; i <= 6; i++) { const bx = i * 26, by = Ry - 4 + 7 * (1 - (bx / Rx) ** 2); s += `<path d="M${bx - 7} ${by + 3} v-8 h12 v6 h-6 v-3" fill="none" stroke="${G.band2}" stroke-width="2.4"/>`; }
  // snow on the roof
  if (G.snow) s += `<path d="M${-Rx + 10} ${Ry - 12} L${-Tx} ${Ty + 2} Q0 ${Ty - 2} ${Tx} ${Ty + 2} L${Rx - 10} ${Ry - 12} Q${Rx * .5} ${Ry - 30} ${Rx * .2} ${Ry - 22} Q0 ${Ry - 36} ${-Rx * .3} ${Ry - 24} Q${-Rx * .6} ${Ry - 34} ${-Rx + 10} ${Ry - 12}Z" fill="${G.snow}"/>`;
  // crown (тооно) with the felt flap (өрх) folded back and its corner ropes
  s += `<ellipse cx="0" cy="${Ty}" rx="${Tx}" ry="9" fill="${G.frame}"/><ellipse cx="0" cy="${Ty - 1}" rx="${Tx - 7}" ry="5" fill="${G.ink}" opacity=".55"/>`;
  s += `<path d="M${-Tx - 4} ${Ty - 2} L${-Tx + 12} ${Ty - 26} L${Tx - 4} ${Ty - 24} L${Tx - 10} ${Ty - 4}Z" fill="${G.roof}" stroke="${G.shade}" stroke-width="2"/>`;
  s += `<path d="M${-Tx + 12} ${Ty - 26} L${-Tx - 30} ${Ry + 20} M${Tx - 4} ${Ty - 24} L${Tx + 40} ${Ry + 18}" stroke="${G.rope}" stroke-width="2.5" opacity=".7"/>`;
  // stove pipe and smoke
  s += `<rect x="14" y="${Ty - 52}" width="9" height="48" fill="#5b5652"/><rect x="12" y="${Ty - 56}" width="13" height="6" fill="#47423f"/>`;
  s += `<path d="M18 ${Ty - 62} C -6 ${Ty - 110} 46 ${Ty - 150} 16 ${Ty - 205} C -8 ${Ty - 250} 38 ${Ty - 290} 18 ${Ty - 340}" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" opacity=".28"/>`;
  // door: low wooden frame with painted panels and an endless-knot ornament
  if (G.glow) s += `<ellipse cx="0" cy="-40" rx="110" ry="70" fill="${G.glow}" opacity=".3" filter="url(#blur30)"/>`;
  s += `<rect x="-34" y="-100" width="68" height="100" rx="3" fill="${G.frame}"/>`;
  s += `<rect x="-27" y="-93" width="26" height="90" fill="${G.door}"/><rect x="1" y="-93" width="26" height="90" fill="${G.door}"/>`;
  for (const dx of [-14, 14]) s += `<path d="M${dx - 7} -62 h14 v14 h-14z M${dx - 3} -62 v-5 h6 v5 M${dx - 3} -48 v5 h6 v-5 M${dx - 7} -58 h-4 v6 h4 M${dx + 7} -58 h4 v6 h-4" fill="none" stroke="${G.ornament}" stroke-width="2.2"/><path d="M${dx - 9} -86 h18 M${dx - 9} -16 h18" stroke="${G.ornament}" stroke-width="2.4"/>`;
  s += `<rect x="-38" y="-4" width="76" height="6" fill="${G.frame}"/>`;
  return s + `</g>`;
};

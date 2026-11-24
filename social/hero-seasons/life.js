// Extra life for the seasonal heroes: forested foothills, a winding river, grass texture
// and sun patches, an ovoo with blue khadag on the hill, a rider at a gallop, horses at the
// hitching line, an eagle, butterflies and tall grass in the foreground.
module.exports = function life({ C, SEASON, W, H, hz, DESK, rnd, horse }) {
  const WIN = SEASON === 'winter';
  horse = horse || ((x, y, k, f = 1, c = '#8a5a3c', mane = '#3a2418') => `<g transform="translate(${x} ${y}) scale(${k * f} ${k})" filter="url(#paint)">
    <ellipse cx="0" cy="6" rx="46" ry="8" fill="#1a1d36" opacity=".2"/>
    <path d="M-36 -40 Q-56 -30 -50 0 Q-44 -18 -38 -28" fill="${mane}"/>
    <path d="M-26 -24 L-30 6 M-16 -24 L-14 6 M18 -24 L16 6 M28 -24 L32 6" stroke="${c}" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="0" cy="-36" rx="41" ry="19" fill="${c}"/>
    <path d="M22 -48 Q34 -62 44 -70 L58 -64 Q48 -50 36 -30Z" fill="${c}"/>
    <path d="M42 -72 Q60 -80 76 -66 Q80 -58 72 -55 L56 -58 Q48 -62 42 -72Z" fill="${c}"/>
    <path d="M47 -74 l2 -11 l6 9" fill="${c}"/>
    <path d="M42 -72 Q30 -64 22 -48 Q30 -56 38 -57Z" fill="${mane}"/>
    <path d="M-30 -52 q30 -10 60 -2" stroke="#ffffff" stroke-width="5" fill="none" opacity=".8" stroke-linecap="round"/>
  </g>`);
  const X = {
    spring: { forest: '#6fa35a', forestDk: '#4f7f45', water: ['#9cc8e8', '#e9f6ff'], grass: ['#a6d47c', '#7fb85f', '#c9e8a2'], patch: '#f6ffd9', deel: '#7a4fa0', sash: '#f2c14e' },
    summer: { forest: '#2f6b3f', forestDk: '#1f4f2e', water: ['#3f9bd6', '#d6f1ff'], grass: ['#6fbf45', '#4f9f3a', '#a8e070'], patch: '#fbffd0', deel: '#2c5aa0', sash: '#e3843a' },
    winter: { forest: '#3b6a5a', forestDk: '#24463d', water: ['#cfe3f2', '#ffffff'], grass: ['#eef2fa', '#c9d4e8', '#ffffff'], patch: '#ffffff', deel: '#2c5aa0', sash: '#e3843a' },
    autumn: { forest: '#d98a2e', forestDk: '#a7612a', water: ['#6f8fb0', '#ffd9a6'], grass: ['#d9ac55', '#b9873f', '#f0cf7a'], patch: '#fff0c4', deel: '#b8322a', sash: '#2c5aa0' },
  }[SEASON];
  const f1 = (v) => +v.toFixed(1);
  const out = { ridge: '', ground: '', hill: '', mid: '', front: '', sky: '' };

  // forested foothills in front of the far mountains
  {
    let d = `M0 ${hz + 10}`, x = 0, k = 0;
    while (x < W) { const w = 180 + ((k * 53) % 4) * 60; d += ` Q${x + w / 2} ${hz - 70 - ((k * 37) % 3) * 22} ${x + w} ${hz + 6}`; x += w; k++; }
    d += ` L${W} ${hz + 80} L0 ${hz + 80}Z`;
    out.ridge += `<path d="${d}" fill="${X.forestDk}" opacity=".85" filter="url(#paint)"/>`;
    let trees = '';
    for (let i = 0; i < (DESK ? 150 : 70); i++) {
      const tx = rnd() * W, ty = hz - 8 - rnd() * 40, th = 26 + rnd() * 30;
      trees += `<path d="M${f1(tx)} ${f1(ty - th)} L${f1(tx + th * .3)} ${f1(ty)} L${f1(tx - th * .3)} ${f1(ty)}Z" fill="${rnd() < .5 ? X.forest : X.forestDk}"/>`;
      if (WIN) trees += `<path d="M${f1(tx)} ${f1(ty - th)} L${f1(tx + th * .14)} ${f1(ty - th * .55)} L${f1(tx - th * .14)} ${f1(ty - th * .55)}Z M${f1(tx - th * .26)} ${f1(ty - th * .12)} H${f1(tx + th * .26)}" fill="#ffffff" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>`;
    }
    out.ridge += `<g filter="url(#paint)" opacity=".9">${trees}</g>`;
  }

  // sun patches and grass texture on the near ground
  for (let i = 0; i < 5; i++) out.ground += `<ellipse cx="${f1(rnd() * W)}" cy="${f1(hz + 140 + rnd() * (H - hz - 200))}" rx="${f1(220 + rnd() * 260)}" ry="${f1(40 + rnd() * 40)}" fill="${X.patch}" opacity=".22" filter="url(#blur30)"/>`;
  let strokes = '';
  for (let i = 0; i < (DESK ? 900 : 420); i++) {
    const x = rnd() * W, y = hz + 90 + Math.pow(rnd(), .7) * (H - hz - 90), s = .5 + (y - hz) / (H - hz) * 1.3, c = X.grass[i % 3];
    if (WIN && i % 3) continue;
    if (WIN) { strokes += `<path d="M${f1(x - 16 * s)} ${f1(y)} q${f1(16 * s)} ${f1(-6 * s)} ${f1(32 * s)} 0" stroke="${c}" stroke-width="${f1(2.2 * s)}" fill="none" stroke-linecap="round" opacity=".55"/>`; if (i % 9 === 0) strokes += `<circle cx="${f1(x)}" cy="${f1(y - 4)}" r="${f1(1.6 * s)}" fill="#ffffff" opacity=".9"/>`; continue; }
    strokes += `<path d="M${f1(x)} ${f1(y)} q${f1(-3 * s)} ${f1(-9 * s)} ${f1(-1 * s)} ${f1(-18 * s)} M${f1(x + 4 * s)} ${f1(y)} q${f1(2 * s)} ${f1(-8 * s)} ${f1(6 * s)} ${f1(-14 * s)}" stroke="${c}" stroke-width="${f1(2 * s)}" fill="none" stroke-linecap="round" opacity=".7"/>`;
  }
  out.ground += `<g>${strokes}</g>`;

  // a river winding from the foothills to the front right
  {
    const pts = DESK ? [[2080, hz + 30], [1960, hz + 70], [2150, hz + 120], [2020, hz + 190], [2300, hz + 280], [2200, hz + 360], [2560, H]] : [[760, hz + 40], [700, hz + 90], [860, hz + 160], [780, hz + 240], [1080, H - 60]];
    const wd = (t) => (DESK ? 10 + t * 150 : 8 + t * 90);
    const L = [], R = [];
    for (let i = 0; i < pts.length; i++) {
      const [x, y] = pts[i], t = i / (pts.length - 1), [nx0, ny0] = pts[Math.min(i + 1, pts.length - 1)], [px, py] = pts[Math.max(i - 1, 0)];
      let dx = nx0 - px, dy = ny0 - py; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
      L.push([x - dy * wd(t), y + dx * wd(t)]); R.push([x + dy * wd(t), y - dx * wd(t)]);
    }
    const line = (P) => P.map(([x, y], i) => (i ? 'L' : 'M') + f1(x) + ' ' + f1(y)).join(' ');
    const poly = line(L) + ' ' + line(R.slice().reverse()).replace(/^M/, 'L') + 'Z';
    out.ground += `<path d="${poly}" fill="${X.water[0]}" filter="url(#paint)"/>`;
    out.ground += `<path d="${line(pts)}" fill="none" stroke="${X.water[1]}" stroke-width="${DESK ? 8 : 5}" stroke-dasharray="40 60 12 50" opacity=".7" filter="url(#paint)"/>`;
    if (WIN) { let cr = ''; for (let i = 1; i < pts.length - 1; i++) { const [x, y] = pts[i]; cr += `<path d="M${f1(x - 30)} ${f1(y - 6)} l22 8 l14 -10 l20 12" stroke="#9fbfd8" stroke-width="${DESK ? 3 : 2}" fill="none"/>`; } out.ground += cr + `<path d="${line(L)}" fill="none" stroke="#ffffff" stroke-width="${DESK ? 12 : 8}" opacity=".85" filter="url(#paint)"/><path d="${line(R)}" fill="none" stroke="#ffffff" stroke-width="${DESK ? 10 : 6}" opacity=".7" filter="url(#paint)"/>`; }
    out.ground += `<path d="${line(L)}" fill="none" stroke="${X.forestDk}" stroke-width="${DESK ? 6 : 4}" opacity=".35" filter="url(#paint)"/>`;
  }

  // ovoo with blue khadag on the hill (desktop)
  if (DESK) {
    const ox = 1010, oy = hz - 70 - 120;
    out.hill += `<g filter="url(#paint)"><path d="M${ox - 44} ${oy} Q${ox - 30} ${oy - 40} ${ox} ${oy - 52} Q${ox + 30} ${oy - 40} ${ox + 44} ${oy}Z" fill="#9c958c"/>`;
    out.hill += `<path d="M${ox - 30} ${oy - 18} q14 -6 26 0 M${ox + 4} ${oy - 30} q14 -6 22 2" stroke="#c9c2b8" stroke-width="5" fill="none"/>`;
    if (WIN) out.hill += `<path d="M${ox - 34} ${oy - 22} Q${ox - 20} ${oy - 46} ${ox} ${oy - 54} Q${ox + 20} ${oy - 46} ${ox + 34} ${oy - 22} Q${ox} ${oy - 30} ${ox - 34} ${oy - 22}Z" fill="#ffffff"/>`;
    out.hill += `<path d="M${ox} ${oy - 50} V${oy - 130}" stroke="#6b4a36" stroke-width="5"/>`;
    for (const [dx, dy, c] of [[44, 20, '#3f86cf'], [36, 34, '#ffffff'], [-40, 26, '#3f86cf'], [30, 48, '#f2c14e']]) out.hill += `<path d="M${ox} ${oy - 126 + dy * .3} q${dx * .5} ${dy * .4} ${dx} ${dy}" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    out.hill += `</g>`;
  }

  // a rider at a gallop and horses at the hitching line
  const rider = (x, y, k, f = 1) => `<g transform="translate(${x} ${y}) scale(${k * f} ${k})" filter="url(#paint)">
    <ellipse cx="0" cy="8" rx="56" ry="9" fill="${C.vignette}" opacity=".22"/>
    <path d="M-40 -40 Q-62 -44 -70 -24" stroke="#3a2418" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M-28 -30 L-52 -6 M-18 -28 L-34 2 M20 -28 L44 -6 M30 -30 L56 -16" stroke="#7a4a2c" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="0" cy="-40" rx="44" ry="17" fill="#7a4a2c"/>
    <path d="M30 -48 Q44 -66 58 -74 L70 -66 Q56 -54 42 -32Z" fill="#7a4a2c"/>
    <path d="M56 -76 Q74 -82 86 -66 Q88 -58 80 -56 L66 -60 Q60 -66 56 -76Z" fill="#7a4a2c"/>
    <path d="M56 -76 Q40 -70 30 -50 Q42 -58 48 -60Z" fill="#3a2418"/>
    <path d="M-12 -56 L12 -56 L8 -96 Q0 -104 -8 -96Z" fill="${X.deel}"/>
    <path d="M-12 -70 H10" stroke="${X.sash}" stroke-width="6"/>
    <path d="M8 -88 L34 -70" stroke="${X.deel}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="0" cy="-108" r="10" fill="#e9b48a"/>
    ${WIN ? '<path d="M-14 -110 Q-16 -130 0 -132 Q16 -130 14 -110Z" fill="#6b4a36"/><path d="M-15 -112 h30" stroke="#a07a5a" stroke-width="6" stroke-linecap="round"/>' : '<path d="M-12 -112 Q0 -132 12 -112Z" fill="#b8322a"/><circle cx="0" cy="-128" r="3" fill="#b8322a"/>'}
    <path d="M-4 -56 L-14 -30" stroke="${X.deel}" stroke-width="7" stroke-linecap="round"/>
  </g>`;
  if (DESK) {
    out.mid += rider(1990, 1048, 1) + rider(2210, 1032, .72, 1);
    out.mid += `<g filter="url(#paint)"><path d="M1840 1262 V1200 M2010 1262 V1200" stroke="#6b4a36" stroke-width="8" stroke-linecap="round"/><path d="M1840 1206 Q1925 1222 2010 1206" stroke="#5b4636" stroke-width="4" fill="none"/></g>`;
    out.mid += horse(1880, 1268, 1.05, -1, '#e9dcc0', '#6b5a44') + horse(1965, 1272, 1.1, 1, '#4a3222', '#1d140f');
  } else {
    out.mid += rider(300, hz + 230, 1, 1);
  }

  // an eagle overhead, butterflies in summer
  const eagle = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M-70 -6 Q-40 -26 -10 -8 L0 -2 L10 -8 Q40 -26 70 -6 Q40 -10 14 4 L0 14 L-14 4 Q-40 -10 -70 -6Z" fill="#3a2f2a" opacity=".85"/>`;
  out.sky += DESK ? eagle(1240, 360, 1.1) : eagle(240, 640, .8);
  if (SEASON === 'summer') {
    let b = '';
    for (const [x, y, c] of (DESK ? [[620, 640, '#ffd24a'], [760, 610, '#ffffff'], [880, 700, '#ff8a5a'], [2380, 1240, '#ffd24a']] : [[220, 1300, '#ffd24a'], [880, 1350, '#ffffff']])) b += `<g transform="translate(${x} ${y})"><ellipse cx="-7" cy="0" rx="8" ry="5" fill="${c}" transform="rotate(-25)"/><ellipse cx="7" cy="0" rx="8" ry="5" fill="${c}" transform="rotate(25)"/><path d="M0 -4 V5" stroke="#2f2a36" stroke-width="2"/></g>`;
    out.sky += b;
  }

  // tall grass and flowers in the near foreground (right corner, clear of the headline)
  {
    let g = '';
    const x0 = DESK ? 2180 : 760, x1 = W, yb = H;
    for (let i = 0; i < (DESK ? 70 : 40); i++) {
      const x = x0 + rnd() * (x1 - x0), h = (DESK ? 90 : 70) + rnd() * (DESK ? 120 : 90), bend = (rnd() - .5) * 60;
      if (WIN) { g += `<path d="M${f1(x)} ${yb} q${f1(bend * .3)} ${f1(-h * .5)} ${f1(bend)} ${f1(-h)}" stroke="${['#c9a86a', '#a9884f', '#d9bd85'][i % 3]}" stroke-width="${f1(3 + rnd() * 3)}" fill="none" stroke-linecap="round"/><ellipse cx="${f1(x + bend)}" cy="${f1(yb - h + 3)}" rx="7" ry="4" fill="#ffffff"/>`; continue; }
      g += `<path d="M${f1(x)} ${yb} q${f1(bend * .3)} ${f1(-h * .5)} ${f1(bend)} ${f1(-h)}" stroke="${X.grass[i % 3]}" stroke-width="${f1(4 + rnd() * 4)}" fill="none" stroke-linecap="round"/>`;
      if (i % 6 === 0) g += `<circle cx="${f1(x + bend)}" cy="${f1(yb - h)}" r="${f1(7 + rnd() * 5)}" fill="${SEASON === 'autumn' ? '#e0662f' : SEASON === 'spring' ? '#9b7ad8' : '#ffd24a'}"/>`;
    }
    out.front += `<g filter="url(#paint)">${g}</g>`;
  }
  return out;
};

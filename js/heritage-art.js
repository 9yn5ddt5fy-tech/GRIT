// GRIT Heritage: picture-book illustrations, drawn as SVG in code.
// Style: bright Mongolian palette (red, cobalt, mustard, teal), thin ink
// outlines, curly "üülen" clouds, a red frame with a key (alkhan) pattern
// and a light paper grain.
// SCENES.name() returns an <svg> string. Add a scene by combining the
// helpers below. Used by js/heritage.js (browser) and to build
// assets/img/heritage-cover.svg (node js/heritage-art.js > file).
(function (root) {
  const K = {
    ink: "#2a1d1a",
    paper: "#fbf3e2",
    red: "#c8352b",
    redDk: "#8e1d18",
    orange: "#e8692f",
    gold: "#eaa628",
    goldLt: "#f7d46a",
    cobalt: "#1f4fbf",
    blue: "#3b7fd4",
    teal: "#17806f",
    tealLt: "#2fa58a",
    green: "#3f9a4a",
    greenLt: "#7cc04f",
    grass: "#9fd05a",
    snow: "#fffaf2",
    felt: "#f1e4c4",
    rope: "#b8915a",
    wood: "#7a4627",
    woodLt: "#a5643a",
    skin: "#f1b88c",
    blush: "#e9796a",
    hair: "#22140f",
    boot: "#3b211a",
    stone: "#9c918a",
    stoneLt: "#bdb2a8",
    stoneDk: "#6d625d",
    water: "#47a6dc",
    waterLt: "#8fd0ee",
    waterDk: "#1f6fb3",
    purple: "#6a3f93",
    pink: "#e7839b",
    silver: "#d4dbe3",
  };
  // [top, middle, bottom] sky colours and the mountain tint for each mood.
  const MOOD = {
    day: { sky: ["#2d6cc4", "#7fbdee", "#dff1f6"], mtn: "#7c8fd6", mtnLt: "#a8b6ea", cloud: "#2b5aa8" },
    dusk: { sky: ["#3a2a72", "#d64a3b", "#f6ad4c"], mtn: "#7b4f9a", mtnLt: "#a77bbd", cloud: "#8e2a3a" },
    dawn: { sky: ["#e05a4a", "#f39b55", "#fde2ae"], mtn: "#b0679a", mtnLt: "#d494b6", cloud: "#b8443a" },
    night: { sky: ["#0b1440", "#1c2b6e", "#3b4a95"], mtn: "#3c4790", mtnLt: "#5662ad", cloud: "#1c2b6e" },
    storm: { sky: ["#26345a", "#4f6390", "#93a7c6"], mtn: "#5a6795", mtnLt: "#7886b4", cloud: "#26345a" },
  };
  const O = `stroke="${K.ink}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"`;
  const O2 = `stroke="${K.ink}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"`;
  let uid = 0;
  const rnd = (seed) => {
    let s = seed * 9301 + 49297;
    return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  };

  // ---------------------------------------------------------------- nature
  // Curly Mongolian cloud (üülen khee).
  const cloud = (x, y, k, line) =>
    `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="${line}" stroke-width="1.5" stroke-linecap="round"><path d="M-30 7 Q-36 -5 -22 -8 Q-21 -22 -5 -20 Q5 -33 21 -21 Q36 -22 34 -5 Q45 1 35 8 Z" fill="#fff8ea"/><path d="M-16 1 a7 7 0 1 1 7 7 a3.5 3.5 0 1 1 -3.5 -3.5"/><path d="M14 -6 a8 8 0 1 0 -8 8 a4 4 0 1 0 4 -4"/><path d="M35 8 Q52 11 60 3 Q64 -4 57 -6 Q53 -6 54 -2"/><path d="M-30 7 Q-44 9 -50 2"/></g>`;

  const sparkle = (x, y, r) => `<path d="M${x} ${y - r} L${x + r * 0.25} ${y - r * 0.25} L${x + r} ${y} L${x + r * 0.25} ${y + r * 0.25} L${x} ${y + r} L${x - r * 0.25} ${y + r * 0.25} L${x - r} ${y} L${x - r * 0.25} ${y - r * 0.25}Z" fill="#fff4c8"/>`;

  function sun(x, y, r) {
    let rays = "";
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      const x1 = x + Math.cos(a) * (r + 4), y1 = y + Math.sin(a) * (r + 4);
      const x2 = x + Math.cos(a + 0.13) * (r + 4), y2 = y + Math.sin(a + 0.13) * (r + 4);
      const xt = x + Math.cos(a + 0.065) * (r + 13), yt = y + Math.sin(a + 0.065) * (r + 13);
      rays += `M${x1.toFixed(1)} ${y1.toFixed(1)} L${xt.toFixed(1)} ${yt.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}Z `;
    }
    return `<path d="${rays}" fill="${K.goldLt}" opacity="0.9"/><circle cx="${x}" cy="${y}" r="${r}" fill="${K.gold}" stroke="${K.orange}" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="${r * 0.62}" fill="${K.goldLt}"/>`;
  }

  // Jagged far range with snow caps.
  function range(W, base, m, seed) {
    const r = rnd(seed);
    let s = "";
    let x = -30;
    while (x < W + 30) {
      const w = 60 + r() * 80, h = 26 + r() * 44, px = x + w / 2;
      s += `<path d="M${x} ${base} L${px} ${base - h} L${x + w} ${base}Z" fill="${m.mtn}"/>`;
      s += `<path d="M${px} ${base - h} L${x + w} ${base} L${px + w * 0.08} ${base}Z" fill="${m.mtnLt}" opacity="0.55"/>`;
      const c = h * 0.28;
      s += `<path d="M${px} ${base - h} L${px + (w / 2) * (c / h)} ${base - h + c} L${px + 4} ${base - h + c - 5} L${px - 3} ${base - h + c + 2} L${px - (w / 2) * (c / h)} ${base - h + c}Z" fill="${K.snow}"/>`;
      x += w * 0.62;
    }
    return s;
  }

  // Smooth hill band; returns the path.
  function hill(W, H, y, amp, seed, fill, rim) {
    const r = rnd(seed);
    const n = Math.max(3, Math.round(W / 130));
    let d = `M-10 ${y}`;
    for (let i = 1; i <= n; i++) {
      const x = (W / n) * i + 10;
      const cx = x - W / n / 2;
      d += ` Q${cx.toFixed(1)} ${(y - amp * (0.5 + r())).toFixed(1)} ${x.toFixed(1)} ${(y + (r() - 0.5) * amp * 0.5).toFixed(1)}`;
    }
    return `<path d="${d} V${H} H-10Z" fill="${fill}"/><path d="${d}" fill="none" stroke="${rim}" stroke-width="2.2" opacity="0.8"/>`;
  }

  // Siberian larch, the tree of the Khangai.
  const larch = (x, y, h = 22, c = "#1f6b4a") =>
    `<g transform="translate(${x} ${y})"><path d="M0 0 V${-h * 0.25}" stroke="${K.wood}" stroke-width="2"/><path d="M0 ${-h} L${h * 0.28} ${-h * 0.62} L${h * 0.14} ${-h * 0.62} L${h * 0.36} ${-h * 0.25} L${-h * 0.36} ${-h * 0.25} L${-h * 0.14} ${-h * 0.62} L${-h * 0.28} ${-h * 0.62}Z" fill="${c}" ${O2}/></g>`;

  function meadow(W, H, g, seed, night) {
    const r = rnd(seed);
    let s = "";
    for (let i = 0; i < 26; i++) {
      const x = r() * W, y = g + 8 + r() * (H - g - 14);
      s += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} l-2 -5 M${x.toFixed(1)} ${y.toFixed(1)} l0 -6 M${x.toFixed(1)} ${y.toFixed(1)} l2 -5" stroke="${night ? "#2c5a3a" : "#4f8f34"}" stroke-width="1.1"/>`;
      if (i % 3 === 0 && !night) s += `<circle cx="${(x + 6).toFixed(1)}" cy="${(y - 2).toFixed(1)}" r="1.6" fill="${["#fff3c4", K.red, K.gold, "#c9a6f0"][i % 4]}"/>`;
    }
    return s;
  }

  function base(W, H, o) {
    const id = "h" + ++uid;
    const m = MOOD[o.sky || "day"];
    const night = o.sky === "night";
    const g = H * (o.ground || 0.7);
    let s = `<defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${m.sky[0]}"/><stop offset="0.55" stop-color="${m.sky[1]}"/><stop offset="1" stop-color="${m.sky[2]}"/></linearGradient><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${night ? "#3f6b48" : K.grass}"/><stop offset="1" stop-color="${night ? "#2c4f36" : "#6fb043"}"/></linearGradient></defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#${id}s)"/>`;
    if (night) {
      const r = rnd(7);
      for (let i = 0; i < 22; i++) s += sparkle(r() * W, r() * H * 0.45 + 6, 1.5 + r() * 2.5);
      s += `<circle cx="${W * 0.8}" cy="${H * 0.17}" r="15" fill="#fff1c2"/><circle cx="${W * 0.8 + 7}" cy="${H * 0.17 - 5}" r="13" fill="${m.sky[0]}"/>`;
    } else if (o.sun !== false) {
      const low = o.sky === "dusk" || o.sky === "dawn";
      s += sun(o.sunX != null ? o.sunX : W * 0.8, low ? g - 58 : H * 0.2, low ? 22 : 15);
    }
    if (o.clouds !== false) s += cloud(W * 0.2, H * 0.17, 0.75, m.cloud) + cloud(W * 0.58, H * 0.1, 0.55, m.cloud);
    if (o.mountains !== false) s += range(W, g - 30, m, o.seed || 3);
    s += hill(W, H, g - 26, 16, 5, night ? "#1f4f4a" : K.teal, night ? "#2f6b60" : K.tealLt);
    if (o.forest !== false) {
      const r = rnd((o.seed || 3) + 11);
      for (let x = 8; x < W; x += 16 + r() * 22) if (r() > 0.35) s += larch(x, g - 18 - r() * 8, 12 + r() * 8, night ? "#163a33" : "#145c45");
    }
    s += hill(W, H, g - 8, 12, 9, night ? "#2f5b3c" : K.green, night ? "#3f7048" : K.greenLt);
    s += `<rect y="${g}" width="${W}" height="${H - g}" fill="url(#${id}g)"/>`;
    s += meadow(W, H, g, 13, night);
    return { s, g, id };
  }

  // Grain, mood tint and the ornamental frame go on top of everything.
  function finish(W, H, id, o) {
    let s = '<g pointer-events="none">';
    if (o.sky === "night") s += `<rect width="${W}" height="${H}" fill="#0b1440" opacity="0.28"/>`;
    if (o.sky === "storm") s += `<rect width="${W}" height="${H}" fill="#26345a" opacity="0.12"/>`;
    s += `<filter id="${id}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.16  0 0 0 0 0.11  0 0 0 0 0.08  0 0 0 0.55 0"/></filter><rect width="${W}" height="${H}" filter="url(#${id}n)" opacity="0.32"/>`;
    if (o.frame !== false) {
      const b = Math.round(Math.min(W, H) * 0.036);
      s += `<pattern id="${id}p" width="${b}" height="${b}" patternUnits="userSpaceOnUse"><rect width="${b}" height="${b}" fill="${K.red}"/><path d="M${b * 0.1} ${b * 0.9} V${b * 0.1} H${b * 0.9} V${b * 0.7} H${b * 0.4} V${b * 0.4} H${b * 0.6}" fill="none" stroke="${K.goldLt}" stroke-width="${b * 0.11}"/></pattern>`;
      s += `<path fill-rule="evenodd" d="M0 0 H${W} V${H} H0Z M${b} ${b} V${H - b} H${W - b} V${b}Z" fill="url(#${id}p)"/>`;
      s += `<rect x="${b}" y="${b}" width="${W - 2 * b}" height="${H - 2 * b}" fill="none" stroke="${K.gold}" stroke-width="1.6"/><rect x="${b + 2}" y="${b + 2}" width="${W - 2 * b - 4}" height="${H - 2 * b - 4}" fill="none" stroke="${K.ink}" stroke-width="0.8" opacity="0.6"/><rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${K.redDk}"/>`;
      [[0, 0], [W - b, 0], [0, H - b], [W - b, H - b]].forEach(([x, y]) => (s += `<rect x="${x}" y="${y}" width="${b}" height="${b}" fill="${K.redDk}"/><circle cx="${x + b / 2}" cy="${y + b / 2}" r="${b * 0.28}" fill="${K.gold}"/>`));
    }
    return s + "</g>";
  }

  const wrap = (W, H, inner, label, slice = true) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"${slice ? ' preserveAspectRatio="xMidYMid slice"' : ""} role="img" aria-label="${label || ""}">${inner}</svg>`;

  // ---------------------------------------------------------------- people & animals
  const arm = (x0, y0, x1, y1, deel, cuff) =>
    `<path d="M${x0} ${y0} L${x1} ${y1}" stroke="${K.ink}" stroke-width="7.4" stroke-linecap="round"/><path d="M${x0} ${y0} L${x1} ${y1}" stroke="${deel}" stroke-width="5" stroke-linecap="round"/><circle cx="${x1}" cy="${y1}" r="3" fill="${cuff}" ${O2}/><circle cx="${x1 + (x1 > x0 ? 1.5 : -1.5)}" cy="${y1 + 1.5}" r="2.4" fill="${K.skin}" ${O2}/>`;

  // A person in a deel. pose: stand | wave | throw | bend | point.
  // look: { trim, sash, hat (colour or false), braids, boots }
  function person(x, y, k = 1, deel = K.cobalt, pose = "stand", look = {}) {
    const trim = look.trim || K.goldLt, sash = look.sash || K.orange;
    const hands = {
      stand: [[-11, -16], [11, -16]],
      wave: [[-11, -16], [15, -50]],
      throw: [[-13, -54], [13, -54]],
      bend: [[-6, -9], [8, -9]],
      point: [[-11, -16], [22, -36]],
    }[pose] || [[-11, -16], [11, -16]];
    let s = `<g transform="translate(${x} ${y}) scale(${k})">`;
    s += `<path d="M-11 0 Q-14 -1 -12 -4 L-10 -9 H-3 V0Z M11 0 Q14 -1 12 -4 L10 -9 H3 V0Z" fill="${look.boots || K.boot}" ${O2}/>`;
    s += `<path d="M-9 -37 Q-12 -20 -14 -7 Q0 -3 14 -7 Q12 -20 9 -37 Q0 -41 -9 -37Z" fill="${deel}" ${O}/>`;
    s += `<path d="M-14 -7 Q0 -3 14 -7" fill="none" stroke="${trim}" stroke-width="2.4"/><path d="M-2 -38 Q4 -31 9 -27" fill="none" stroke="${trim}" stroke-width="2.6"/>`;
    s += `<path d="M-10.5 -25 Q0 -22 10.5 -25 L11 -20 Q0 -17 -11 -20Z" fill="${sash}" ${O2}/><path d="M7 -20 l1 7 M9 -20 l2 6" stroke="${sash}" stroke-width="1.6"/>`;
    s += arm(-8, -33, hands[0][0], hands[0][1], deel, trim) + arm(8, -33, hands[1][0], hands[1][1], deel, trim);
    s += `<path d="M-3 -40 h6 v4 h-6z" fill="${K.skin}"/><circle cx="0" cy="-45" r="7.5" fill="${K.skin}" ${O}/>`;
    s += `<path d="M-7.5 -46 Q-7 -54 0 -53.5 Q7 -54 7.5 -46 Q4 -50 0 -49.5 Q-4 -50 -7.5 -46Z" fill="${K.hair}"/>`;
    if (look.braids) s += `<path d="M-7 -46 Q-9 -36 -7 -28 M7 -46 Q9 -36 7 -28" stroke="${K.hair}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="-7" cy="-28" r="1.6" fill="${K.red}"/><circle cx="7" cy="-28" r="1.6" fill="${K.red}"/>`;
    s += `<circle cx="-2.7" cy="-45" r="0.95" fill="${K.ink}"/><circle cx="2.7" cy="-45" r="0.95" fill="${K.ink}"/><circle cx="-4.3" cy="-42.3" r="1.5" fill="${K.blush}" opacity="0.7"/><circle cx="4.3" cy="-42.3" r="1.5" fill="${K.blush}" opacity="0.7"/><path d="M-1.6 -41.6 Q0 -40.4 1.6 -41.6" stroke="${K.ink}" stroke-width="0.8" fill="none"/>`;
    if (look.hat !== false) {
      const hc = look.hat || K.red;
      s += `<path d="M-6.5 -51 Q0 -66 6.5 -51Z" fill="${hc}" ${O2}/><path d="M-10 -49 Q0 -45 10 -49 Q10 -53.5 0 -53.5 Q-10 -53.5 -10 -49Z" fill="#7a4a2c" ${O2}/><path d="M0 -63 V-67" stroke="${K.red}" stroke-width="1.6"/><circle cx="0" cy="-67.5" r="1.8" fill="${K.red}" ${O2}/>`;
    }
    return s + `</g>`;
  }

  const leg = (x0, y0, x1, y1, c) =>
    `<path d="M${x0} ${y0} L${x1} ${y1}" stroke="${K.ink}" stroke-width="5.4" stroke-linecap="round"/><path d="M${x0} ${y0} L${x1} ${y1}" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/><path d="M${x1 - 2} ${y1} h4" stroke="${K.ink}" stroke-width="2.6"/>`;

  // Mongolian horse, facing right (flip with k < 0).
  function horse(x, y, k = 1, c = "#9a5a30", saddle = true) {
    const mane = "#2a1810";
    let s = `<g transform="translate(${x} ${y}) scale(${k} ${Math.abs(k)})">`;
    s += leg(-15, -18, -17, 0, c) + leg(-9, -18, -7, 0, c) + leg(9, -18, 7, 0, c) + leg(15, -18, 18, 0, c);
    s += `<path d="M-21 -26 Q-34 -22 -31 -6 Q-27 -14 -23 -20" fill="${mane}" ${O2}/>`;
    s += `<ellipse cx="0" cy="-25" rx="22" ry="10" fill="${c}" ${O}/>`;
    s += `<path d="M14 -30 Q19 -42 25 -48 L33 -44 Q27 -34 21 -20Z" fill="${c}" ${O}/><path d="M24 -49 Q32 -54 39 -45 Q41 -40 37 -39 L30 -40 Q26 -43 24 -49Z" fill="${c}" ${O}/>`;
    s += `<path d="M24 -49 Q18 -44 14 -32 Q19 -38 22 -37 Q21 -43 26 -46Z" fill="${mane}"/><circle cx="31" cy="-46" r="1.1" fill="${K.ink}"/><path d="M27 -51 l1 -4 l2 3" fill="${c}" ${O2}/>`;
    if (saddle) s += `<path d="M-9 -34 Q0 -37 9 -34 L10 -27 Q0 -25 -10 -27Z" fill="${K.red}" ${O2}/><path d="M-8 -30 H8" stroke="${K.gold}" stroke-width="1.6"/><path d="M-4 -35 Q0 -40 4 -35" fill="${K.wood}" ${O2}/>`;
    return s + `</g>`;
  }

  // Bactrian camel with a load.
  function camel(x, y, k = 1) {
    const c = "#c99456";
    let s = `<g transform="translate(${x} ${y}) scale(${k})">`;
    s += leg(-14, -20, -15, 0, c) + leg(-8, -20, -7, 0, c) + leg(8, -20, 7, 0, c) + leg(14, -20, 15, 0, c);
    s += `<path d="M-22 -24 Q-24 -36 -14 -36 Q-12 -48 -4 -38 Q2 -48 8 -38 Q20 -40 22 -28 Q20 -18 0 -18 Q-20 -18 -22 -24Z" fill="${c}" ${O}/>`;
    s += `<path d="M18 -30 Q28 -36 26 -50 L34 -52 Q36 -36 24 -24Z" fill="${c}" ${O}/><ellipse cx="34" cy="-52" rx="6" ry="4" fill="${c}" ${O}/><circle cx="35" cy="-53" r="0.9" fill="${K.ink}"/>`;
    s += `<rect x="-18" y="-34" width="12" height="12" rx="2" fill="${K.red}" ${O2}/><rect x="4" y="-33" width="12" height="11" rx="2" fill="${K.cobalt}" ${O2}/><path d="M-16 -28 h8 M6 -27 h8" stroke="${K.goldLt}" stroke-width="1.4"/>`;
    return s + `</g>`;
  }

  function ger(x, y, k = 1) {
    let s = `<g transform="translate(${x} ${y}) scale(${k})">`;
    s += `<path d="M-6 -40 Q-14 -50 -6 -58 Q2 -64 -2 -72" stroke="#e9e3da" stroke-width="2.4" fill="none" opacity="0.85"/>`;
    s += `<rect x="-25" y="-20" width="50" height="20" fill="${K.snow}" ${O}/>`;
    s += `<path d="M-25 -6 H25 M-25 -17 H25" stroke="${K.red}" stroke-width="1.4"/>`;
    s += `<path d="M-28 -19 Q-16 -33 -6 -38 H6 Q16 -33 28 -19Z" fill="${K.felt}" ${O}/>`;
    s += `<path d="M-4 -37 L-20 -21 M-1.5 -38 L-8 -20 M1.5 -38 L8 -20 M4 -37 L20 -21" stroke="${K.rope}" stroke-width="1"/><path d="M-27 -20 Q0 -24 27 -20" stroke="${K.red}" stroke-width="2" fill="none"/>`;
    s += `<ellipse cx="0" cy="-38" rx="6" ry="2.2" fill="${K.woodLt}" ${O2}/>`;
    s += `<rect x="-6" y="-15" width="12" height="15" fill="${K.orange}" ${O}/><path d="M-3.5 -11 h7 v7 h-7z M0 -11 v7 M-3.5 -7.5 h7" stroke="${K.goldLt}" stroke-width="1" fill="none"/>`;
    return s + `</g>`;
  }

  // ---------------------------------------------------------------- water & land
  let wid = 0;
  function lake(cx, cy, rx, ry) {
    const id = "lk" + ++wid;
    let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${K.waterLt}"/><stop offset="1" stop-color="${K.water}"/></linearGradient></defs>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx + 4}" ry="${ry + 3}" fill="#d9c58f" ${O2}/>`;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id})" stroke="${K.waterDk}" stroke-width="1.3"/>`;
    for (let i = 0; i < 6; i++) {
      const x = cx - rx * 0.7 + (i * rx * 1.4) / 5 + (i % 2) * 8;
      const y = cy - ry * 0.35 + (i % 3) * ry * 0.3;
      s += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q3 -3 6 0 q3 -3 6 0" stroke="#fff" stroke-width="1.3" fill="none" opacity="0.9"/>`;
    }
    return s;
  }

  const river = (W, y) =>
    `<path d="M-10 ${y + 18} Q${W * 0.25} ${y - 6} ${W * 0.45} ${y + 10} T${W + 10} ${y}" stroke="${K.waterDk}" stroke-width="19" fill="none"/><path d="M-10 ${y + 18} Q${W * 0.25} ${y - 6} ${W * 0.45} ${y + 10} T${W + 10} ${y}" stroke="${K.water}" stroke-width="15.5" fill="none"/><path d="M-10 ${y + 17} Q${W * 0.25} ${y - 7} ${W * 0.45} ${y + 9} T${W + 10} ${y - 1}" stroke="${K.waterLt}" stroke-width="4" fill="none" stroke-dasharray="14 18" stroke-linecap="round"/>`;

  function volcano(x, y, k = 1, broken) {
    const top = broken ? -56 : -74;
    let s = `<g transform="translate(${x} ${y}) scale(${k})">`;
    s += `<path d="M-78 0 L-24 ${top} ${broken ? "L24 " + top : "L0 -82 L24 " + top} L78 0Z" fill="#8a5a4a" ${O}/>`;
    s += `<path d="M-24 ${top} L-10 -34 L-34 0 H-78Z" fill="#a8705a"/><path d="M24 ${top} L40 -20 L78 0 H44Z" fill="#6e4236"/>`;
    s += `<path d="M-50 -20 l8 -6 M-30 -12 l10 -8 M30 -30 l8 6 M50 -14 l10 4" stroke="${K.ink}" stroke-width="1" opacity="0.5"/>`;
    if (broken) s += `<ellipse cx="0" cy="${top}" rx="24" ry="6" fill="#3d231d" ${O2}/><path d="M-24 ${top} Q0 ${top + 7} 24 ${top}" stroke="#c48a6e" stroke-width="2" fill="none"/>`;
    s += larch(-60, 2, 16) + larch(-48, 4, 13) + larch(56, 3, 15) + larch(66, 4, 12);
    return s + `</g>`;
  }

  const island = (cx, cy, k = 1) =>
    `<g transform="translate(${cx} ${cy}) scale(${k})"><path d="M-24 0 Q-18 -14 -6 -16 Q8 -18 16 -10 Q22 -6 24 0Z" fill="#8a5a4a" ${O}/><path d="M-6 -16 Q8 -18 16 -10 Q4 -10 -6 -16Z" fill="#a8705a"/>${larch(-12, -8, 16)}${larch(-2, -12, 18)}${larch(10, -8, 14)}</g>`;

  const well = (x, y) =>
    `<g transform="translate(${x} ${y})"><path d="M-14 -8 V-34 M14 -8 V-34" stroke="${K.wood}" stroke-width="3.4"/><path d="M-18 -34 H18" stroke="${K.ink}" stroke-width="4.6" stroke-linecap="round"/><path d="M-18 -34 H18" stroke="${K.woodLt}" stroke-width="2.8" stroke-linecap="round"/><path d="M0 -34 V-18" stroke="#5a3a26" stroke-width="1"/><path d="M-4 -19 h8 l-1 6 h-6z" fill="${K.woodLt}" ${O2}/><path d="M-18 0 V-9 H18 V0Z" fill="${K.stone}" ${O}/><path d="M-18 -4 H18 M-10 -9 V-4 M2 -9 V-4 M12 -9 V-4 M-4 -4 V0 M8 -4 V0" stroke="${K.stoneDk}" stroke-width="0.9"/><ellipse cx="0" cy="-9" rx="18" ry="5" fill="${K.stoneLt}" ${O}/><ellipse cx="0" cy="-9" rx="12" ry="3" fill="${K.waterDk}"/></g>`;

  const spring = (x, y) =>
    `<g transform="translate(${x} ${y})" fill="none" stroke-linecap="round"><g stroke="${K.waterDk}" stroke-width="7"><path d="M0 -4 Q-10 -36 -30 -30"/><path d="M0 -4 Q0 -50 8 -54"/><path d="M0 -4 Q12 -36 32 -28"/></g><g stroke="${K.waterLt}" stroke-width="4"><path d="M0 -4 Q-10 -36 -30 -30"/><path d="M0 -4 Q0 -50 8 -54"/><path d="M0 -4 Q12 -36 32 -28"/></g><g stroke="${K.waterDk}" stroke-width="1.6"><path d="M-30 -30 a5 5 0 1 0 5 5"/><path d="M8 -54 a5 5 0 1 1 -5 5"/><path d="M32 -28 a5 5 0 1 1 -5 5"/></g></g>`;

  const serpent = (x, y, k = 1) => {
    const d = "M-90 0 Q-70 -28 -48 0 T-6 0 T36 0 Q54 -24 64 -32";
    return `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke-linecap="round"><path d="${d}" stroke="${K.ink}" stroke-width="17"/><path d="${d}" stroke="#2e6b3a" stroke-width="14"/><path d="${d}" stroke="#5aa04a" stroke-width="6"/><path d="${d}" stroke="${K.goldLt}" stroke-width="5" stroke-dasharray="1.5 9"/><path d="M60 -38 Q66 -48 80 -42 Q90 -36 82 -28 Q74 -24 62 -28Z" fill="#2e6b3a" stroke="${K.ink}" stroke-width="1.3"/><path d="M66 -44 l-6 -8 l9 4 M74 -44 l0 -9 l5 7" fill="${K.gold}" stroke="${K.ink}" stroke-width="1"/><circle cx="76" cy="-38" r="3" fill="${K.goldLt}" stroke="${K.ink}" stroke-width="1"/><circle cx="76.6" cy="-38" r="1.2" fill="${K.ink}"/><path d="M86 -31 l9 1 l-4 -3 M95 -30 l-4 3" stroke="${K.red}" stroke-width="1.8"/></g>`;
  };

  function boulder(x, y, k = 1, marks) {
    let s = `<g transform="translate(${x} ${y}) scale(${k})">`;
    s += `<path d="M-74 0 Q-84 -48 -46 -80 Q-4 -104 44 -84 Q84 -60 76 0Z" fill="${K.stone}" ${O}/>`;
    s += `<path d="M-46 -80 Q-4 -104 44 -84 Q20 -82 -4 -70 Q-34 -52 -50 -20 Q-58 -6 -60 0 H-74 Q-84 -48 -46 -80Z" fill="${K.stoneLt}"/>`;
    s += `<path d="M44 -84 Q84 -60 76 0 H52 Q66 -40 44 -84Z" fill="${K.stoneDk}"/>`;
    s += `<path d="M-10 -96 Q-4 -70 -18 -50 M20 -60 Q30 -40 24 -10 M-40 -30 Q-30 -26 -28 -10" stroke="${K.ink}" stroke-width="1.2" fill="none" opacity="0.55"/>`;
    s += `<path d="M-70 -4 Q-60 -14 -48 -6 Q-40 -12 -30 -4Z M40 -2 Q50 -10 62 -4Z" fill="#5d9a3f" ${O2}/>`;
    if (marks) s += `<g stroke="#5a2a1d" stroke-width="1.6" fill="none"><path d="M-34 -62 v10 M-28 -64 v12 M-22 -61 v8 M-38 -46 h18 M-30 -42 v8 M8 -66 l4 6 l4 -6 M20 -64 v12 M-6 -34 q4 -6 8 0 q4 6 8 0 M10 -48 v8 M14 -50 v10"/></g>`;
    s += `<path d="M-90 2 q6 -8 12 0Z M84 2 q5 -7 10 0Z" fill="${K.stoneLt}" ${O2}/>`;
    return s + `</g>`;
  }

  const rockHeld = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-22 0 Q-26 -18 -9 -27 Q11 -32 22 -17 Q26 0 -22 0Z" fill="${K.stone}" ${O}/><path d="M-9 -27 Q11 -32 22 -17 Q5 -19 -9 -27Z" fill="${K.stoneLt}"/><path d="M10 -18 Q16 -10 14 -2" stroke="${K.ink}" stroke-width="1" fill="none" opacity="0.5"/><path d="M-30 -6 q-6 -2 -10 2 M-28 -16 q-8 -4 -12 0 M28 -10 q6 0 10 4" stroke="#fff" stroke-width="1.6" fill="none" opacity="0.8"/></g>`;

  // ---------------------------------------------------------------- buildings
  function wall(x, y, w, h, c = "#d9b37a") {
    let s = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${c}" ${O}/>`;
    for (let i = x + 2; i < x + w - 6; i += 12) s += `<rect x="${i}" y="${y - h - 6}" width="7" height="6" fill="${c}" ${O2}/>`;
    for (let r = 1; r < h / 8; r++) s += `<path d="M${x} ${y - r * 8} H${x + w}" stroke="#b8925a" stroke-width="0.8"/>`;
    return s;
  }

  // Chinese-style hall with upturned eaves (as in Karakorum).
  const hall = (x, y, w, roof = K.red) =>
    `<g transform="translate(${x} ${y})"><rect x="${-w / 2 + 6}" y="-24" width="${w - 12}" height="24" fill="${K.snow}" ${O}/>${[-0.35, -0.12, 0.12, 0.35]
      .map((f) => `<rect x="${w * f - 2}" y="-24" width="4" height="24" fill="${K.red}" ${O2}/>`)
      .join("")}<rect x="-6" y="-16" width="12" height="16" fill="${K.wood}" ${O2}/><path d="M${-w / 2 - 8} -20 Q${-w / 2} -24 ${-w / 2 + 2} -28 H${w / 2 - 2} Q${w / 2} -24 ${w / 2 + 8} -20 Q0 -26 ${-w / 2 - 8} -20Z" fill="${roof}" ${O}/><path d="M${-w / 2 + 4} -28 L${-w / 2 + 12} -40 H${w / 2 - 12} L${w / 2 - 4} -28Z" fill="${roof}" ${O}/><path d="M${-w / 2 + 4} -40 Q${-w / 2 + 10} -42 ${-w / 2 + 14} -46 H${w / 2 - 14} Q${w / 2 - 10} -42 ${w / 2 - 4} -40Z" fill="${roof}" ${O}/><path d="M${-w / 2 + 14} -46 H${w / 2 - 14}" stroke="${K.gold}" stroke-width="2.4"/></g>`;

  // Mongolian monastery temple: white walls, red-brown band, green roof, gold top.
  const temple = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-34 0 L-31 -32 H31 L34 0Z" fill="${K.snow}" ${O}/><rect x="-31" y="-38" width="62" height="7" fill="${K.redDk}" ${O2}/><path d="M-27 -34.5 h54" stroke="${K.gold}" stroke-width="1" stroke-dasharray="2 3"/><rect x="-8" y="-20" width="16" height="20" fill="${K.red}" ${O2}/><path d="M-8 -20 h16" stroke="${K.gold}" stroke-width="2"/><rect x="-24" y="-24" width="8" height="10" fill="${K.ink}"/><rect x="16" y="-24" width="8" height="10" fill="${K.ink}"/><path d="M-26 -24 h12 M14 -24 h12" stroke="${K.red}" stroke-width="2"/><path d="M-42 -38 Q-34 -40 -30 -46 H30 Q34 -40 42 -38 Q0 -44 -42 -38Z" fill="#2f8a5a" ${O}/><path d="M-26 -46 L-20 -56 H20 L26 -46Z" fill="#2f8a5a" ${O}/><path d="M-28 -56 Q-22 -57 -18 -62 H18 Q22 -57 28 -56 Q0 -60 -28 -56Z" fill="#2f8a5a" ${O}/><path d="M-3 -62 L0 -74 L3 -62Z" fill="${K.gold}" ${O2}/><circle cx="0" cy="-75" r="2.6" fill="${K.gold}" ${O2}/></g>`;

  const stupa = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-9 0 V-4 H-7 V-8 H7 V-4 H9 V0Z" fill="${K.snow}" ${O2}/><path d="M-7 -8 Q-8 -19 0 -21 Q8 -19 7 -8Z" fill="${K.snow}" ${O2}/><path d="M-6.5 -12 H6.5" stroke="${K.red}" stroke-width="1.4"/><path d="M-2.6 -21 L-1.6 -33 H1.6 L2.6 -21Z" fill="${K.gold}" ${O2}/><path d="M-2.2 -25 h4.4 M-2 -29 h4" stroke="${K.ink}" stroke-width="0.7"/><circle cx="0" cy="-35" r="1.8" fill="${K.gold}" ${O2}/></g>`;

  const stupaWall = (x0, x1, y, k = 1) => {
    let s = `<rect x="${x0}" y="${y - 12 * k}" width="${x1 - x0}" height="${12 * k}" fill="#efe6d2" ${O}/><path d="M${x0} ${y - 12 * k} H${x1}" stroke="${K.redDk}" stroke-width="${2 * k}"/>`;
    for (let x = x0 + 9 * k; x < x1 - 4; x += 17 * k) s += stupa(x, y - 12 * k, k * 0.8);
    return s;
  };

  function turtle(x, y, k = 1, slab) {
    let s = `<g transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="0" rx="44" ry="6" fill="#4d7a35" opacity="0.5"/>`;
    s += `<path d="M-28 -2 l-8 4 l4 -10Z M24 -2 l8 4 l-4 -10Z" fill="${K.stone}" ${O2}/>`;
    s += `<path d="M-36 0 Q-34 -32 0 -36 Q34 -32 36 0Z" fill="${K.stone}" ${O}/><path d="M-36 0 Q-34 -32 0 -36 Q-20 -26 -24 0Z" fill="${K.stoneLt}"/>`;
    s += `<path d="M-20 -6 L-11 -25 H11 L20 -6Z M-11 -25 L0 -33 L11 -25 M-20 -6 L-30 -8 M20 -6 L30 -8" stroke="${K.stoneDk}" stroke-width="1.5" fill="none"/>`;
    s += `<path d="M34 -8 Q48 -14 52 -4 Q50 4 34 2Z" fill="${K.stone}" ${O}/><circle cx="46" cy="-6" r="1.4" fill="${K.ink}"/>`;
    if (slab)
      s += `<rect x="-13" y="-112" width="26" height="80" fill="${K.stoneLt}" ${O}/><path d="M-13 -112 Q-13 -128 0 -128 Q13 -128 13 -112Z" fill="${K.stoneLt}" ${O}/><path d="M-6 -118 a4 4 0 1 1 4 4 M6 -118 a4 4 0 1 0 -4 4" stroke="${K.stoneDk}" stroke-width="1.2" fill="none"/><g stroke="#4a3a30" stroke-width="1.3"><path d="M-7 -102 v8 M-7 -88 l3 4 l3 -4 M-7 -76 v8 M-7 -64 l4 -4 M-7 -54 v6 M5 -102 l-3 6 M5 -90 v8 M5 -78 l-3 4 l3 4 M5 -64 v8 M5 -52 v6"/></g>`;
    else s += `<rect x="-6" y="-40" width="12" height="6" fill="${K.stoneDk}" ${O2}/>`;
    return s + `</g>`;
  }

  const waterfall = (x, y) =>
    `<g transform="translate(${x} ${y})"><path d="M-130 0 V-74 Q-90 -92 -30 -84 L-24 0Z" fill="#5a4a6a" ${O}/><path d="M130 0 V-78 Q90 -94 30 -84 L24 0Z" fill="#4a3b5a" ${O}/><path d="M-110 -70 V0 M-90 -78 V0 M-70 -82 V0 M-50 -84 V0 M60 -86 V0 M80 -84 V0 M100 -80 V0" stroke="#7a6a8e" stroke-width="1.4"/><path d="M-30 -84 H30 L24 0 H-24Z" fill="${K.water}" ${O}/><path d="M-20 -82 V-4 M-8 -84 V-2 M6 -84 V-4 M18 -82 V-2" stroke="#e8f8ff" stroke-width="3.2" stroke-linecap="round"/><path d="M-60 6 Q-40 -10 -20 2 Q0 -12 20 2 Q40 -10 60 6Z" fill="#f4fbff" ${O2}/><path d="M-30 -2 a5 5 0 1 1 5 5 M18 -4 a5 5 0 1 0 -5 5" stroke="${K.waterDk}" stroke-width="1.2" fill="none"/>${larch(-110, -76, 18)}${larch(-92, -82, 22)}${larch(-62, -86, 16)}${larch(70, -88, 20)}${larch(96, -84, 16)}</g>`;

  const ruins = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})" fill="#d4a86a" stroke="${K.ink}" stroke-width="1.2" stroke-linejoin="round"><path d="M-62 0 V-26 L-56 -32 L-50 -26 L-44 -30 V0Z"/><rect x="-36" y="-14" width="30" height="14"/><path d="M2 0 V-34 L9 -40 L16 -34 V0Z"/><rect x="24" y="-18" width="34" height="18"/><path d="M-36 -7 H-6 M24 -9 H58 M-56 -14 h10 M4 -20 h10" stroke="#a8804a" fill="none"/></g>`;

  const birds = (pts) =>
    pts.map(([x, y, k = 1]) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-10 -1 Q-5 -7 0 -1 Q5 -7 10 -1" stroke="${K.ink}" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="0" cy="-0.5" r="1.4" fill="${K.ink}"/></g>`).join("");

  const fish = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-11 0 l-8 -6 v12Z" fill="${K.orange}" ${O2}/><ellipse cx="0" cy="0" rx="11" ry="5.5" fill="${K.gold}" ${O2}/><path d="M-3 -5 v10 M2 -5 v10" stroke="${K.orange}" stroke-width="1.2"/><circle cx="6" cy="-1" r="1.2" fill="${K.ink}"/></g>`;

  const trash = (x, y) =>
    `<g transform="translate(${x} ${y})"><rect x="0" y="-14" width="7" height="14" rx="2" fill="#d8f0f5" ${O2}/><rect x="1.5" y="-17" width="4" height="3" fill="${K.cobalt}" ${O2}/><rect x="14" y="-7" width="11" height="7" rx="1" fill="${K.red}" ${O2} transform="rotate(-20 19 -3)"/><rect x="-17" y="-6" width="13" height="6" rx="1" fill="${K.silver}" ${O2} transform="rotate(10 -10 -2)"/></g>`;

  const bag = (x, y, c = K.cobalt) =>
    `<g transform="translate(${x} ${y})"><path d="M-11 0 Q-13 -19 -4 -23 L4 -23 Q13 -19 11 0Z" fill="${c}" ${O}/><path d="M-4 -23 l-2 -5 M4 -23 l2 -5" stroke="${K.ink}" stroke-width="1.4"/><path d="M-4 -10 l4 -5 l4 5 M-3 -6 h6" stroke="#fff" stroke-width="1.5" fill="none"/></g>`;

  function silverTree(x, y, k = 1) {
    const leaves = [[-56, -112], [-42, -100], [52, -118], [38, -104], [-18, -134], [22, -136], [0, -126], [-32, -122], [34, -130], [-50, -126], [48, -132]];
    let s = `<g transform="translate(${x} ${y}) scale(${k})">`;
    s += `<path d="M-44 0 h88 v-6 h-88z" fill="#9aa6b4" ${O}/>`;
    s += `<path d="M-6 -6 V-92 H6 V-6Z" fill="${K.silver}" ${O}/><path d="M-2 -10 V-88" stroke="#fff" stroke-width="2"/>`;
    s += `<g fill="none" stroke-linecap="round"><path d="M0 -70 Q-40 -86 -56 -112 M0 -76 Q36 -90 52 -118 M0 -90 Q-20 -112 -18 -134 M0 -90 Q18 -112 22 -136" stroke="${K.ink}" stroke-width="8.4"/><path d="M0 -70 Q-40 -86 -56 -112 M0 -76 Q36 -90 52 -118 M0 -90 Q-20 -112 -18 -134 M0 -90 Q18 -112 22 -136" stroke="${K.silver}" stroke-width="6"/></g>`;
    s += leaves.map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="8" ry="4.5" transform="rotate(-25 ${a} ${b})" fill="#eef2f6" ${O2}/>`).join("");
    s += `<g fill="none" stroke-linecap="round"><path d="M-6 -40 H-30 V-22 M6 -46 H30 V-26 M-6 -58 H-40 V-40 M6 -62 H40 V-42" stroke="${K.ink}" stroke-width="4.2"/><path d="M-6 -40 H-30 V-22 M6 -46 H30 V-26 M-6 -58 H-40 V-40 M6 -62 H40 V-42" stroke="#aab4c0" stroke-width="2.4"/></g>`;
    s += [[-30, -18, "#8a1f3a"], [30, -22, "#fff6e4"], [-40, -36, K.gold], [40, -38, "#f2e2b0"]].map(([a, b, c]) => `<path d="M${a} ${b - 3} q-3 4 0 7 q3 -3 0 -7Z" fill="${c}" ${O2}/>`).join("");
    s += [[-30, -4], [30, -4], [-40, -4], [40, -4]].map(([a, b]) => `<path d="M${a - 6} ${b - 6} h12 l-2 6 h-8z" fill="${K.gold}" ${O2}/>`).join("");
    s += `<g transform="translate(0 -146)"><path d="M-6 -2 Q-22 -12 -20 4 Q-12 0 -6 2Z M6 -2 Q22 -12 20 4 Q12 0 6 2Z" fill="#fff8ea" ${O2}/><path d="M-6 -4 H6 L9 14 H-9Z" fill="#fff8ea" ${O2}/><circle cx="0" cy="-10" r="5.5" fill="${K.skin}" ${O2}/><path d="M-5 -13 Q0 -18 5 -13" stroke="${K.gold}" stroke-width="2" fill="none"/><path d="M4 -9 L20 -16 L22 -11Z" fill="${K.gold}" ${O2}/></g>`;
    return s + `</g>`;
  }

  // Open book with vertical Mongol-script-like lines.
  function book(x, y, k = 1) {
    let lines = "";
    for (let i = 0; i < 4; i++) lines += `<path d="M${-28 + i * 7} -2 q2 4 0 8 q-2 4 0 8 q2 3 0 6" /><path d="M${8 + i * 7} -2 q2 4 0 8 q-2 4 0 8 q2 3 0 6" />`;
    return `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0 -6 Q-20 -14 -38 -8 V22 Q-20 16 0 24 Q20 16 38 22 V-8 Q20 -14 0 -6Z" fill="${K.red}" ${O}/><path d="M0 -4 Q-18 -12 -34 -6 V18 Q-18 12 0 20Z" fill="${K.paper}" ${O2}/><path d="M0 -4 Q18 -12 34 -6 V18 Q18 12 0 20Z" fill="#f4e6c8" ${O2}/><g stroke="${K.ink}" stroke-width="1.1" fill="none">${lines}</g></g>`;
  }

  const globe = (x, y, r) =>
    `<g transform="translate(${x} ${y})"><circle r="${r + 8}" fill="none" stroke="${K.gold}" stroke-width="3" stroke-dasharray="2 5"/><circle r="${r}" fill="${K.blue}" ${O}/><path d="M${-r * 0.55} ${-r * 0.45} q${r * 0.3} ${-r * 0.3} ${r * 0.62} ${-r * 0.1} q${r * 0.22} ${r * 0.4} ${-r * 0.1} ${r * 0.6} q${-r * 0.42} ${r * 0.1} ${-r * 0.52} ${-r * 0.5}Z M${r * 0.12} ${r * 0.18} q${r * 0.44} ${-r * 0.12} ${r * 0.56} ${r * 0.3} q${-r * 0.2} ${r * 0.42} ${-r * 0.54} ${r * 0.22}Z" fill="${K.greenLt}" ${O2}/><ellipse rx="${r}" ry="${r * 0.36}" fill="none" stroke="#fff" stroke-width="1" opacity="0.7"/><ellipse rx="${r * 0.42}" ry="${r}" fill="none" stroke="#fff" stroke-width="1" opacity="0.7"/><path d="M${-r - 18} ${r * 0.2} q-6 -${r * 0.6} 4 -${r * 1.1} M${r + 18} ${r * 0.2} q6 -${r * 0.6} -4 -${r * 1.1}" stroke="${K.green}" stroke-width="2.4" fill="none"/>${[0.0, 0.3, 0.6, 0.9].map((f) => `<ellipse cx="${-r - 16 + f * 2}" cy="${r * 0.1 - f * r * 1.0}" rx="4" ry="2" fill="${K.greenLt}" ${O2}/><ellipse cx="${r + 16 - f * 2}" cy="${r * 0.1 - f * r * 1.0}" rx="4" ry="2" fill="${K.greenLt}" ${O2}/>`).join("")}</g>`;

  const flames = (x, y) =>
    `<g transform="translate(${x} ${y})"><path d="M0 0 Q-14 -22 0 -46 Q14 -22 0 0Z" fill="${K.orange}" ${O2}/><path d="M0 -4 Q-6 -18 0 -32 Q6 -18 0 -4Z" fill="${K.goldLt}"/><path d="M16 0 Q6 -16 16 -30 Q26 -16 16 0Z M-16 0 Q-24 -12 -16 -26 Q-8 -12 -16 0Z" fill="${K.gold}" ${O2}/></g>`;

  // Banner (tug) with a white horse-hair plume.
  const tug = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0 0 V-58" stroke="${K.wood}" stroke-width="2.4"/><path d="M-7 -50 Q0 -36 7 -50 Q0 -46 -7 -50Z" fill="${K.snow}" ${O2}/><path d="M-3 -58 L0 -66 L3 -58Z" fill="${K.gold}" ${O2}/><path d="M0 -44 h16 l-4 6 l4 6 h-16" fill="${K.red}" ${O2}/></g>`;

  // ---------------------------------------------------------------- scenes
  const W = 400,
    H = 250;
  let sceneNo = 0;
  const scene = (opts, draw, label) => {
    opts.seed = opts.seed || (sceneNo += 7);
    return () => sceneBody(opts, draw, label);
  };
  const sceneBody = (opts, draw, label) => {
    const b = base(W, H, opts);
    return wrap(W, H, b.s + draw(b.g) + finish(W, H, b.id, opts), label);
  };
  const P = person;

  const SCENES = {
    // Terkhiin Tsagaan Lake
    "valley-well": scene({ sky: "day" }, (g) => ger(105, g + 18, 1.25) + ger(165, g + 10, 0.8) + well(250, g + 34) + P(212, g + 40, 0.95, K.red, "point", { hat: false, braids: true, trim: K.goldLt, sash: K.cobalt }) + P(292, g + 42, 0.95, K.cobalt, "stand", { hat: K.red }) + horse(55, g + 46, 0.85) + horse(345, g + 36, -0.7, "#e9dcc0", false)),
    "well-flood": scene({ sky: "storm", sun: false }, (g) => lake(230, g + 40, 158, 26) + well(240, g + 34) + spring(240, g + 18) + ger(78, g + 22, 1.15) + P(128, g + 46, 0.95, K.red, "wave", { hat: false, braids: true, sash: K.cobalt }) + birds([[320, 60], [340, 52, 0.8]])),
    "hero-mountain": scene({ sky: "dusk" }, (g) => volcano(305, g + 8, 1.15, true) + lake(250, g + 50, 140, 16) + rockHeld(140, g - 54, 1.3) + P(140, g + 48, 1.25, K.cobalt, "throw", { hat: K.gold, sash: K.red }) + horse(72, g + 50, 0.85)),
    "lake-island": scene({ sky: "day" }, (g) => volcano(328, g + 2, 0.85, true) + lake(185, g + 40, 175, 32) + island(178, g + 40, 1.1) + birds([[96, 64], [116, 56, 0.8], [262, 48]]) + ger(372, g + 52, 0.6)),
    "volcano-lava": scene({ sky: "dawn", forest: false }, (g) => volcano(130, g + 8, 1.3) + flames(130, g - 92) + `<path d="M150 ${g - 36} Q200 ${g - 4} 240 ${g + 12} Q285 ${g + 24} 335 ${g + 18}" stroke="${K.ink}" stroke-width="12.5" fill="none" stroke-linecap="round"/><path d="M150 ${g - 36} Q200 ${g - 4} 240 ${g + 12} Q285 ${g + 24} 335 ${g + 18}" stroke="${K.orange}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M160 ${g - 30} Q200 ${g - 4} 240 ${g + 12}" stroke="${K.goldLt}" stroke-width="3" fill="none" stroke-dasharray="6 8" stroke-linecap="round"/>` + lake(330, g + 44, 60, 14)),

    // Taikhar Rock
    "serpent-valley": scene({ sky: "storm", sun: false }, (g) => river(W, g + 46) + serpent(210, g + 26, 1.05) + ger(340, g + 24, 0.85) + P(58, g + 48, 0.85, K.red, "wave", { hat: false, braids: true, sash: K.gold }) + P(84, g + 50, 0.7, K.cobalt, "stand", { hat: K.gold })),
    "strong-man": scene({ sky: "day" }, (g) => ger(70, g + 18, 0.95) + ger(340, g + 20, 0.85) + P(200, g + 54, 1.55, K.cobalt, "stand", { hat: K.red, sash: K.gold, trim: K.goldLt }) + horse(280, g + 50, 0.8) + P(120, g + 44, 0.7, K.red, "wave", { hat: false, braids: true }) + birds([[250, 50]])),
    "rock-throw": scene({ sky: "dusk" }, (g) => river(W, g + 52) + serpent(270, g + 36, 0.85) + rockHeld(255, g - 44, 1.9) + P(92, g + 50, 1.3, K.cobalt, "throw", { hat: K.red, sash: K.gold })),
    "taikhar-rock": scene({ sky: "day" }, (g) => river(W, g + 50) + boulder(200, g + 36, 1.15) + P(310, g + 46, 0.6, K.red, "stand", { hat: false, braids: true }) + horse(340, g + 48, 0.55) + birds([[80, 52], [102, 46, 0.8]])),
    "rock-writing": scene({ sky: "day" }, (g) => boulder(165, g + 40, 1.25, true) + `<path d="M140 ${g - 24} q8 -10 16 0 q8 10 16 0 q6 -8 12 0" stroke="${K.cobalt}" stroke-width="3.4" fill="none" stroke-linecap="round"/><circle cx="318" cy="${g - 10}" r="22" fill="#fff" stroke="${K.red}" stroke-width="5"/><path d="M302 ${g + 6} L334 ${g - 26}" stroke="${K.red}" stroke-width="5"/><path d="M308 ${g - 18} q4 -6 8 0 q4 6 8 0" stroke="${K.cobalt}" stroke-width="2.4" fill="none"/>` + P(320, g + 50, 0.8, K.cobalt, "point", { hat: K.gold })),

    // Karakorum
    "karakorum-city": scene({ sky: "day" }, (g) => wall(36, g + 30, 328, 30) + `<rect x="184" y="${g - 14}" width="32" height="44" fill="#d9b37a" ${O}/><path d="M192 ${g + 30} V${g + 10} Q200 ${g} 208 ${g + 10} V${g + 30}Z" fill="${K.ink}"/>` + hall(200, g - 16, 44, "#2f8a5a") + hall(100, g - 2, 64) + hall(300, g - 2, 64, K.cobalt) + tug(40, g + 30, 0.8) + tug(360, g + 30, 0.8) + ger(150, g - 2, 0.5) + turtle(70, g + 52, 0.42) + P(250, g + 54, 0.6, K.red, "stand", { hat: K.gold })),
    market: scene({ sky: "day" }, (g) => hall(305, g + 12, 84) + `<path d="M40 ${g + 10} h70 l6 -14 h-82z" fill="${K.gold}" ${O}/><path d="M40 ${g + 10} v26 M110 ${g + 10} v26" stroke="${K.wood}" stroke-width="2.4"/><path d="M50 ${g - 4} l-4 14 M66 ${g - 4} l-2 14 M82 ${g - 4} l0 14 M98 ${g - 4} l2 14" stroke="${K.red}" stroke-width="5"/>` + camel(165, g + 52, 0.95) + camel(110, g + 54, 0.75) + P(232, g + 54, 0.95, K.cobalt, "point", { hat: K.red }) + P(262, g + 54, 0.95, K.purple, "stand", { hat: K.gold, sash: K.teal }) + P(292, g + 56, 0.9, K.red, "wave", { hat: false, braids: true, sash: K.cobalt }) + P(330, g + 56, 0.9, K.teal, "stand", { hat: K.cobalt })),
    "silver-tree": scene({ sky: "dusk", clouds: false, mountains: false, forest: false }, (g) => `<rect x="42" y="${g - 132}" width="316" height="${H - g + 132}" fill="#f2dfb8" ${O}/><rect x="42" y="${g - 132}" width="316" height="16" fill="${K.red}" ${O}/><path d="M42 ${g - 124} h316" stroke="${K.goldLt}" stroke-width="2" stroke-dasharray="6 4"/>` + [60, 340].map((x) => `<rect x="${x - 7}" y="${g - 116}" width="14" height="${H - g + 116}" fill="${K.red}" ${O}/><path d="M${x - 7} ${g - 100} h14 M${x - 7} ${g - 96} h14" stroke="${K.gold}" stroke-width="2"/>`).join("") + `<rect x="42" y="${g + 34}" width="316" height="${H - g - 34}" fill="#b8763e" ${O}/>` + silverTree(200, g + 40, 1.02) + P(98, g + 64, 0.7, K.cobalt, "point", { hat: K.red }) + P(304, g + 64, 0.7, K.purple, "stand", { hat: false, braids: true, sash: K.gold })),
    "traveler-book": scene({ sky: "dawn" }, (g) => `<path d="M138 ${g - 34} V${g + 48}" stroke="${K.ink}" stroke-width="4.2"/><path d="M138 ${g - 34} V${g + 48}" stroke="${K.woodLt}" stroke-width="2.6"/>` + P(120, g + 50, 1.3, "#7a4a2c", "point", { hat: false, trim: "#c9a06a", sash: "#5a3a26" }) + book(255, g + 6, 1.7) + horse(340, g + 54, -0.7, "#e9dcc0") + birds([[230, 40], [250, 34, 0.8]])),
    "turtle-stone": scene({ sky: "day" }, (g) => stupaWall(232, 410, g + 14, 0.75) + turtle(160, g + 52, 1.45) + P(300, g + 54, 0.7, K.red, "point", { hat: false, braids: true, sash: K.gold }) + P(326, g + 56, 0.55, K.cobalt, "stand", { hat: K.gold }) + birds([[90, 62]])),

    // Erdene Zuu
    "ruins-build": scene({ sky: "dawn" }, (g) => ruins(100, g + 34) + temple(285, g + 30, 1.05) + `<rect x="196" y="${g + 34}" width="16" height="10" fill="#d4a86a" ${O2}/><rect x="214" y="${g + 38}" width="14" height="8" fill="#d4a86a" ${O2}/>` + P(180, g + 50, 0.95, K.red, "bend", { hat: K.gold, sash: K.cobalt }) + P(150, g + 52, 0.8, K.cobalt, "point", { hat: K.red })),
    "stupa-wall": scene({ sky: "day" }, (g) => temple(200, g + 14, 0.95) + stupaWall(14, 386, g + 44, 1.35) + P(320, g + 64, 0.6, K.red, "stand", { hat: false, braids: true })),
    temples: scene({ sky: "day" }, (g) => temple(100, g + 38, 1.15) + temple(300, g + 38, 1.15) + hall(200, g + 26, 70, "#2f8a5a") + stupa(200, g + 58, 1.5) + P(152, g + 60, 0.6, K.red, "stand", { hat: K.gold }) + P(250, g + 60, 0.6, K.cobalt, "wave", { hat: false, braids: true })),
    "hard-times": scene({ sky: "night", clouds: false }, (g) => ruins(110, g + 40) + ruins(300, g + 44) + stupaWall(150, 262, g + 42, 1) + temple(206, g + 16, 0.6)),
    "erdenezuu-today": scene({ sky: "dawn" }, (g) => temple(130, g + 20, 0.9) + temple(270, g + 20, 0.9) + stupaWall(18, 382, g + 40, 1.2) + P(300, g + 66, 0.7, K.red, "wave", { hat: false, braids: true, sash: K.gold }) + P(326, g + 66, 0.6, K.cobalt, "point", { hat: K.gold }) + P(350, g + 68, 0.45, K.teal, "stand", { hat: K.red })),

    // Orkhon Valley
    "orkhon-river": scene({ sky: "day" }, (g) => river(W, g + 28) + horse(84, g + 66, 0.8) + horse(126, g + 70, 0.7, "#e9dcc0", false) + horse(160, g + 64, 0.6, "#3a2a20", false) + ger(300, g + 62, 0.85) + ger(346, g + 58, 0.6) + birds([[262, 52], [284, 46, 0.8]])),
    waterfall: scene({ sky: "day", mountains: false }, (g) => waterfall(200, g + 44)),
    steles: scene({ sky: "dawn" }, (g) => turtle(130, g + 54, 0.88, true) + turtle(270, g + 54, 0.88, true) + P(200, g + 56, 0.65, K.cobalt, "point", { hat: K.red })),
    "valley-layers": scene({ sky: "day" }, (g) => `<path d="M290 ${g + 14} Q330 ${g - 64} 370 ${g + 14}Z" fill="#8a5a4a" ${O}/>` + temple(330, g - 36, 0.45) + ruins(78, g + 32) + stupaWall(150, 262, g + 30, 0.8) + temple(206, g + 8, 0.5) + river(W, g + 54) + tug(30, g + 40, 0.6)),
    "world-heritage": scene({ sky: "day", sun: false }, (g) => globe(200, g - 66, 44) + stupaWall(36, 364, g + 42, 1) + birds([[86, 44], [318, 50]])),

    // Ugii Lake
    "ugii-lake": scene({ sky: "day" }, (g) => lake(200, g + 40, 186, 32) + ger(64, g + 22, 0.85) + ger(350, g + 16, 0.6) + birds([[150, 62], [170, 56, 0.8], [250, 72], [270, 66, 0.8]])),
    "birds-migrate": scene({ sky: "dusk" }, (g) => lake(200, g + 44, 188, 26) + birds([[56, 76, 1.4], [86, 66, 1.3], [116, 58, 1.2], [146, 52, 1.1], [176, 46, 1], [86, 96, 1], [116, 90, 1], [146, 84, 1], [210, 40, 0.9]])),
    fishing: scene({ sky: "day" }, (g) => lake(214, g + 44, 180, 30) + fish(170, g + 46, 1.2) + fish(250, g + 52, 1) + `<path d="M98 ${g - 16} Q150 ${g - 60} 176 ${g + 36}" stroke="${K.ink}" stroke-width="1.2" fill="none"/><path d="M84 ${g + 6} L100 ${g - 18}" stroke="${K.wood}" stroke-width="2.6"/>` + P(72, g + 54, 1, K.cobalt, "point", { hat: K.red }) + horse(342, g + 22, 0.62) + birds([[300, 50]])),
    litter: scene({ sky: "storm", sun: false }, (g) => lake(240, g + 44, 160, 24) + trash(64, g + 54) + trash(138, g + 62) + trash(318, g + 64) + trash(200, g + 58) + birds([[300, 70]])),
    cleanup: scene({ sky: "day" }, (g) => lake(310, g + 40, 104, 20) + P(70, g + 60, 0.95, K.cobalt, "bend", { hat: K.gold, sash: K.red }) + P(128, g + 60, 0.95, K.red, "wave", { hat: false, braids: true, sash: K.cobalt }) + P(186, g + 60, 0.95, K.teal, "bend", { hat: K.red, sash: K.gold }) + bag(226, g + 62) + bag(248, g + 64, K.green) + bag(270, g + 62, K.gold)),

    // Games
    "game-quiz": scene({ sky: "day" }, (g) => book(130, g + 6, 2.1) + P(266, g + 54, 1.15, K.red, "wave", { hat: false, braids: true, sash: K.cobalt }) + stupa(336, g + 54, 1.6) + `<circle cx="300" cy="${g - 34}" r="14" fill="#fff" ${O}/><path d="M295 ${g - 38} q5 -7 10 0 q0 4 -5 6 v3" stroke="${K.red}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="300" cy="${g - 25}" r="1.6" fill="${K.red}"/>`),
    "game-timeline": scene({ sky: "dawn" }, (g) => `<path d="M30 ${g - 30} H370" stroke="${K.ink}" stroke-width="3"/>` + [60, 140, 220, 300, 360].map((x, i) => `<circle cx="${x}" cy="${g - 30}" r="9" fill="${[K.red, K.gold, K.green, K.cobalt, K.purple][i]}" ${O}/>`).join("") + turtle(80, g + 54, 0.6) + stupa(200, g + 54, 1.5) + ger(318, g + 50, 0.9)),
  };

  // ---------------------------------------------------------------- isometric map
  // A diorama of the heritage region for the page hero. World units 0..100
  // on both axes; the back corner (0,0) is at the top of the picture.
  // opts.pins: [{ id, x, y, label }] become clickable markers (data-open=id).
  const MAP_W = 1200,
    MAP_H = 620,
    MS = 6.1;
  const iso = (x, y, z = 0) => [MAP_W / 2 + (x - y) * 0.866 * MS, 30 + (x + y) * 0.5 * MS - z * MS];
  const pt = (x, y, z) => iso(x, y, z).map((v) => v.toFixed(1)).join(" ");
  const isoEllipse = (x, y, r, attrs) => {
    const [cx, cy] = iso(x, y);
    return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(1.2247 * r * MS).toFixed(1)}" ry="${(0.7071 * r * MS).toFixed(1)}" ${attrs}/>`;
  };
  // Smooth path through world points.
  const isoPath = (pts) => {
    const p = pts.map(([x, y]) => iso(x, y));
    let d = `M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;
    for (let i = 1; i < p.length - 1; i++) {
      const mx = (p[i][0] + p[i + 1][0]) / 2, my = (p[i][1] + p[i + 1][1]) / 2;
      d += ` Q${p[i][0].toFixed(1)} ${p[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    const l = p[p.length - 1];
    return d + ` L${l[0].toFixed(1)} ${l[1].toFixed(1)}`;
  };
  const isoLake = (x, y, r) => {
    const [cx, cy] = iso(x, y);
    let w = "";
    for (let i = 0; i < 4; i++) w += `<path d="M${(cx - r * 4 + i * r * 2.2).toFixed(1)} ${(cy - 3 + (i % 2) * 7).toFixed(1)} q3 -3 6 0 q3 -3 6 0" stroke="#fff" stroke-width="1.4" fill="none"/>`;
    return isoEllipse(x, y, r + 1.2, `fill="#e3cf92" ${O}`) + isoEllipse(x, y, r, `fill="${K.water}" stroke="${K.waterDk}" stroke-width="1.4"`) + isoEllipse(x - r * 0.15, y - r * 0.15, r * 0.6, `fill="${K.waterLt}" opacity="0.55"`) + w;
  };
  const at = (x, y, fn) => {
    const [sx, sy] = iso(x, y);
    return fn(+sx.toFixed(1), +sy.toFixed(1));
  };

  function isoMap(opts = {}) {
    const id = "m" + ++uid;
    const items = []; // [depth, svg]
    const put = (x, y, fn) => items.push([x + y, at(x, y, fn)]);
    let s = `<defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f86d6"/><stop offset="1" stop-color="#cfeaf4"/></linearGradient><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fcf55"/><stop offset="1" stop-color="#5fae3f"/></linearGradient></defs>`;
    s += `<rect width="${MAP_W}" height="${MAP_H}" fill="url(#${id}s)"/>`;
    s += `<g class="map-clouds">${cloud(140, 90, 1.1, MOOD.day.cloud)}${cloud(1040, 70, 0.9, MOOD.day.cloud)}${cloud(1080, 300, 0.7, MOOD.day.cloud)}${cloud(110, 330, 0.6, MOOD.day.cloud)}</g>`;
    s += sun(1060, 120, 22);

    // Plate: two soil faces under the grass top.
    const T = 5.5;
    s += `<path d="M${pt(0, 100, 0)} L${pt(100, 100, 0)} L${pt(100, 100, -T)} L${pt(0, 100, -T)}Z" fill="#a8693d" ${O}/>`;
    s += `<path d="M${pt(100, 0, 0)} L${pt(100, 100, 0)} L${pt(100, 100, -T)} L${pt(100, 0, -T)}Z" fill="#8a5230" ${O}/>`;
    for (const z of [-2, -3.8]) s += `<path d="M${pt(0, 100, z)} L${pt(100, 100, z)} L${pt(100, 0, z)}" stroke="#6e3f22" stroke-width="1.2" fill="none" stroke-dasharray="10 6"/>`;
    s += `<path d="M${pt(0, 0, 0)} L${pt(100, 0, 0)} L${pt(100, 100, 0)} L${pt(0, 100, 0)}Z" fill="url(#${id}g)" ${O}/>`;
    s += `<path d="M${pt(0, 100, 0)} L${pt(100, 100, 0)} L${pt(100, 0, 0)}" stroke="${K.greenLt}" stroke-width="4" fill="none"/>`;

    // Ground patches and hills (flat layer).
    const r = rnd(21);
    for (let i = 0; i < 26; i++) {
      const x = 6 + r() * 88, y = 6 + r() * 88;
      s += isoEllipse(x, y, 2 + r() * 4, `fill="${["#7cc04f", "#a6d860", "#6ab443"][i % 3]}" opacity="0.6"`);
    }
    // Rivers: Orkhon (with the waterfall off the front edge) and Tamir.
    const orkhon = [[38, 100], [42, 88], [52, 82], [58, 70], [56, 56], [62, 44], [58, 32], [56, 24]];
    const tamir = [[0, 46], [12, 50], [24, 56], [36, 60], [48, 62], [56, 60]];
    for (const pts of [orkhon, tamir]) {
      const d = isoPath(pts);
      s += `<path d="${d}" stroke="${K.waterDk}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${K.water}" stroke-width="9.5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${K.waterLt}" stroke-width="2.5" fill="none" stroke-dasharray="10 14" stroke-linecap="round" class="map-flow"/>`;
    }
    s += isoLake(17, 27, 8.5) + isoLake(57, 17, 9);
    // Waterfall pouring off the front-left edge.
    {
      const [wx, wy] = iso(38, 100, 0);
      s += `<path d="M${wx - 9} ${wy} h18 l3 ${T * MS + 26} h-24Z" fill="${K.water}" ${O}/><path d="M${wx - 4} ${wy + 2} v${T * MS + 22} M${wx + 3} ${wy + 2} v${T * MS + 22}" stroke="#e8f8ff" stroke-width="2.4" class="map-flow"/><path d="M${wx - 30} ${wy + T * MS + 30} q10 -14 22 -4 q10 -12 22 0 q12 -10 20 6Z" fill="#f4fbff" ${O2}/>`;
    }

    // Dirt roads between the sites.
    for (const road of [[[56, 88], [46, 72], [36, 62], [28, 46], [22, 36]], [[72, 80], [76, 62], [70, 44], [64, 28], [60, 24]], [[64, 72], [56, 66], [44, 66], [30, 70], [18, 80]]]) {
      const d = isoPath(road);
      s += `<path d="${d}" stroke="#c9a46a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#e8d3a2" stroke-width="2" fill="none" stroke-dasharray="6 6" stroke-linecap="round"/>`;
    }
    // Rounded hills.
    const dome = (x, y, rr, h, c, cl) =>
      put(x, y, (sx, sy) => {
        const rx = 1.2247 * rr * MS, ry = 0.7071 * rr * MS;
        h *= 1.5;
        return `<path d="M${sx - rx} ${sy} Q${sx - rx * 0.8} ${sy - h} ${sx} ${sy - h} Q${sx + rx * 0.8} ${sy - h} ${sx + rx} ${sy} A${rx} ${ry} 0 0 1 ${sx - rx} ${sy}Z" fill="${c}" ${O}/><path d="M${sx + rx * 0.15} ${sy - h * 0.98} Q${sx + rx * 0.8} ${sy - h} ${sx + rx} ${sy} A${rx} ${ry} 0 0 1 ${sx + rx * 0.2} ${sy + ry * 0.98} Q${sx + rx * 0.5} ${sy - h * 0.4} ${sx + rx * 0.15} ${sy - h * 0.98}Z" fill="#000" opacity="0.12"/><path d="M${sx - rx * 0.55} ${sy - h * 0.62} Q${sx - rx * 0.25} ${sy - h * 0.95} ${sx + rx * 0.1} ${sy - h * 0.92}" stroke="${cl}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      });
    [[14, 44, 7, 30], [40, 22, 6, 26], [70, 14, 7, 32], [88, 30, 6, 26], [44, 48, 5, 20], [94, 58, 5, 22], [10, 70, 6, 26], [34, 88, 5, 18], [90, 46, 5, 20]].forEach(([x, y, rr, h], i) => dome(x, y, rr, h, i % 2 ? "#4f9d4f" : "#5fae4a", "#8fd060"));
    // Sheep and goats grazing.
    const flock = (x0, y0, n, seed) => {
      const q = rnd(seed);
      for (let i = 0; i < n; i++) put(x0 + q() * 6, y0 + q() * 6, (sx, sy) => `<ellipse cx="${sx}" cy="${sy - 3}" rx="4.2" ry="3" fill="${i % 4 ? "#fffaf0" : "#6b4a3a"}" ${O2}/><circle cx="${sx + 4}" cy="${sy - 4}" r="1.6" fill="${K.ink}"/>`);
    };
    flock(46, 30, 9, 31);
    flock(20, 60, 7, 32);
    flock(80, 72, 6, 33);
    flock(64, 52, 6, 34);
    // Ovoo (stone cairn) on a pass, with a blue khadag.
    const ovoo = (sx, sy) => `<path d="M${sx - 12} ${sy} L${sx} ${sy - 20} L${sx + 12} ${sy}Z" fill="${K.stone}" ${O}/><path d="M${sx - 7} ${sy - 7} h14 M${sx - 4} ${sy - 13} h8" stroke="${K.stoneDk}" stroke-width="1"/><path d="M${sx} ${sy - 20} V${sy - 32}" stroke="${K.wood}" stroke-width="1.6"/><path d="M${sx} ${sy - 30} q8 2 12 8 M${sx} ${sy - 28} q-8 3 -10 9" stroke="${K.blue}" stroke-width="2.2" fill="none"/>`;
    put(34, 38, ovoo);
    put(84, 40, ovoo);

    // Mountains along the two back edges.
    const mtn = (x, y, h, w) =>
      put(x, y, (sx, sy) => `<path d="M${sx - w} ${sy} L${sx} ${sy - h} L${sx + w} ${sy}Z" fill="#7c8fd6" ${O}/><path d="M${sx} ${sy - h} L${sx + w} ${sy} L${sx + w * 0.15} ${sy}Z" fill="#5a6cb8"/><path d="M${sx} ${sy - h} L${sx + w * 0.3} ${sy - h * 0.7} L${sx + 4} ${sy - h * 0.76} L${sx - 4} ${sy - h * 0.66} L${sx - w * 0.3} ${sy - h * 0.7}Z" fill="${K.snow}" ${O2}/>`);
    [[4, 1, 74, 46], [14, 1, 96, 56], [26, 2, 70, 44], [38, 1, 88, 52], [50, 2, 60, 40], [62, 1, 78, 48], [74, 2, 66, 44], [86, 1, 84, 50], [97, 3, 66, 40], [1, 12, 86, 50], [2, 26, 66, 42], [1, 40, 80, 48], [2, 54, 62, 40], [1, 68, 74, 44], [2, 84, 58, 38]].forEach((m) => mtn(...m));
    // Larch forests.
    const forest = (x0, y0, n, seed) => {
      const q = rnd(seed);
      for (let i = 0; i < n; i++) {
        const x = x0 + q() * 12, y = y0 + q() * 12;
        put(x, y, (sx, sy) => larch(sx, sy, 14 + q() * 10, ["#145c45", "#1f6b4a", "#2a7a4f"][i % 3]));
      }
    };
    forest(28, 8, 12, 1);
    forest(6, 60, 10, 2);
    forest(84, 50, 9, 3);
    forest(16, 86, 8, 4);
    forest(84, 8, 9, 5);
    forest(6, 34, 7, 6);
    forest(64, 2, 7, 7);

    // Terkhiin Tsagaan Lake and Khorgo.
    put(17, 27, (sx, sy) => island(sx, sy, 0.6));
    put(27, 15, (sx, sy) => volcano(sx, sy, 0.62, true));
    // Taikhar Rock by the Tamir.
    put(28, 52, (sx, sy) => boulder(sx, sy, 0.36));
    // Ugii Lake: gers and birds.
    put(46, 13, (sx, sy) => ger(sx, sy, 0.45));
    put(50, 9, (sx, sy) => ger(sx, sy, 0.38));
    put(57, 17, (sx, sy) => birds([[sx - 20, sy - 44, 0.8], [sx, sy - 52, 0.7], [sx + 18, sy - 46, 0.8]]));
    // Khöshöö Tsaidam steles.
    put(74, 30, (sx, sy) => turtle(sx, sy, 0.3, true));
    put(80, 26, (sx, sy) => turtle(sx, sy, 0.3, true));
    // Erdene Zuu: square wall with stupas, temples inside.
    const ez = [62, 62, 82, 82];
    const side = (x0, y0, x1, y1) => {
      const n = 8;
      for (let i = 0; i <= n; i++) {
        const x = x0 + ((x1 - x0) * i) / n, y = y0 + ((y1 - y0) * i) / n;
        put(x, y, (sx, sy) => stupa(sx, sy - 5, 0.48));
      }
    };
    s += `<path d="M${pt(ez[0], ez[1], 0)} L${pt(ez[2], ez[1], 0)} L${pt(ez[2], ez[3], 0)} L${pt(ez[0], ez[3], 0)}Z" fill="#e6d8a8" ${O}/>`;
    const wallH = 1.1;
    const wallFace = (a, b) => `<path d="M${pt(...a, 0)} L${pt(...b, 0)} L${pt(...b, wallH)} L${pt(...a, wallH)}Z" fill="#f3ead6" ${O2}/>`;
    items.push([ez[0] + ez[1] - 0.5, wallFace([ez[0], ez[1]], [ez[2], ez[1]]) + wallFace([ez[0], ez[1]], [ez[0], ez[3]])]);
    items.push([ez[2] + ez[3] + 0.4, wallFace([ez[0], ez[3]], [ez[2], ez[3]]) + wallFace([ez[2], ez[1]], [ez[2], ez[3]])]);
    side(ez[0], ez[1], ez[2], ez[1]);
    side(ez[0], ez[1], ez[0], ez[3]);
    side(ez[0], ez[3], ez[2], ez[3]);
    side(ez[2], ez[1], ez[2], ez[3]);
    put(70, 70, (sx, sy) => temple(sx - 28, sy + 2, 0.5) + temple(sx + 28, sy + 2, 0.5));
    put(73, 73, (sx, sy) => temple(sx, sy, 0.68));
    // Karakorum: ruins, the stone turtle, a banner and gers.
    put(52, 76, (sx, sy) => ruins(sx, sy, 0.6));
    put(58, 86, (sx, sy) => turtle(sx, sy, 0.34));
    put(50, 84, (sx, sy) => tug(sx, sy, 0.55));
    put(86, 86, (sx, sy) => ger(sx, sy, 0.45));
    put(88, 80, (sx, sy) => ger(sx, sy, 0.38));
    // Herders and horses.
    put(40, 40, (sx, sy) => horse(sx, sy, 0.36) + horse(sx + 18, sy + 6, 0.32, "#e9dcc0", false));
    put(74, 52, (sx, sy) => horse(sx, sy, -0.34, "#3a2a20", false));
    put(26, 74, (sx, sy) => ger(sx, sy, 0.42) + person(sx + 18, sy + 4, 0.3, K.red, "wave", { hat: false, braids: true }));
    put(62, 92, (sx, sy) => person(sx, sy, 0.32, K.cobalt, "point", { hat: K.gold }));
    put(40, 92, (sx, sy) => ger(sx, sy, 0.45) + ger(sx + 30, sy + 4, 0.4));
    put(92, 92, (sx, sy) => horse(sx, sy, 0.36) + horse(sx + 20, sy - 4, 0.32, "#e9dcc0", false) + horse(sx - 18, sy + 6, 0.3, "#3a2a20", false));
    put(76, 94, (sx, sy) => person(sx, sy, 0.3, K.red, "wave", { hat: false, braids: true }) + person(sx + 12, sy + 2, 0.24, K.teal, "stand", { hat: K.red }));
    put(48, 54, (sx, sy) => person(sx, sy, 0.3, K.purple, "stand", { hat: K.cobalt }) + horse(sx + 16, sy, 0.34));

    items.sort((a, b) => a[0] - b[0]);
    s += items.map((i) => i[1]).join("");

    // Pins.
    (opts.pins || []).forEach((p, n) => {
      const [sx, sy] = iso(p.x, p.y);
      const w = Math.round(p.label.length * 8.4 + 30);
      const left = p.side === "left";
      const lx = left ? sx - 16 - w : sx + 16;
      s += `<g class="map-pin" data-open="${p.id}" role="button" tabindex="0" aria-label="${p.label}" style="--d:${n * 0.35}s"><path d="M${sx} ${sy} V${sy - 58}" stroke="${K.ink}" stroke-width="2"/><ellipse cx="${sx}" cy="${sy}" rx="7" ry="3.5" fill="${K.ink}" opacity="0.3"/><g class="map-pin__head"><circle cx="${sx}" cy="${sy - 64}" r="13" fill="${K.red}" stroke="${K.ink}" stroke-width="1.6"/><circle cx="${sx}" cy="${sy - 64}" r="8" fill="none" stroke="${K.goldLt}" stroke-width="2"/><text x="${sx}" y="${sy - 59.5}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#fff" font-family="Inter Tight, Inter, sans-serif">${n + 1}</text></g><g class="map-pin__label"><rect x="${lx}" y="${sy - 79}" width="${w}" height="30" rx="15" fill="#fffaf0" stroke="${K.ink}" stroke-width="1.4"/><text x="${lx + w / 2}" y="${sy - 59}" text-anchor="middle" font-size="14.5" font-weight="600" fill="${K.ink}" font-family="Inter Tight, Inter, sans-serif">${p.label}</text></g></g>`;
    });
    return wrap(MAP_W, MAP_H, s + finish(MAP_W, MAP_H, id, { frame: false }), opts.label || "Illustrated map of the heritage sites of Arkhangai and Uvurkhangai", false);
  }

  // The horse from the GRIT logo (traced), facing left. Box 352.0 x 442.0.
  const LOGO_HORSE = "M109.0 0.0 L108.0 1.0 L109.0 15.5 L112.0 21.0 L113.0 34.5 L116.0 41.0 L117.0 50.5 L112.5 55.0 L99.0 56.0 L97.0 59.0 L98.0 74.5 L99.0 75.0 L99.0 93.5 L98.0 94.0 L98.0 107.5 L95.0 112.0 L94.0 119.5 L92.0 121.0 L91.0 126.5 L88.0 130.0 L86.0 136.5 L84.0 137.0 L84.0 139.5 L80.0 144.0 L79.0 147.5 L77.0 148.0 L76.0 151.5 L72.0 155.0 L72.0 156.5 L54.5 173.0 L52.0 173.0 L48.5 177.0 L46.0 177.0 L43.5 180.0 L40.0 180.0 L37.5 183.0 L31.0 184.0 L27.5 187.0 L17.0 188.0 L10.5 191.0 L1.0 191.0 L0.0 192.0 L0.0 213.5 L1.0 214.0 L1.0 225.5 L2.0 226.0 L2.0 236.5 L3.0 237.0 L3.0 263.5 L4.0 265.5 L88.5 265.5 L89.0 266.5 L92.5 266.5 L96.5 262.5 L96.5 257.0 L98.5 251.0 L100.5 249.5 L100.5 245.0 L104.5 240.5 L104.5 238.0 L107.5 234.5 L108.5 231.0 L110.5 230.5 L111.5 228.0 L114.5 226.5 L114.5 225.0 L118.5 222.5 L120.0 219.5 L121.5 219.5 L125.0 215.5 L127.5 215.5 L130.0 212.5 L136.5 211.5 L139.0 208.5 L145.5 208.5 L151.0 206.5 L164.5 206.5 L165.0 207.5 L170.5 207.5 L171.0 208.5 L177.5 208.5 L180.0 211.5 L186.5 212.5 L189.0 215.5 L192.5 216.5 L193.0 218.5 L194.5 218.5 L204.0 228.0 L204.0 229.5 L207.0 232.0 L208.0 236.5 L211.0 240.0 L211.0 246.5 L214.0 253.0 L214.0 262.5 L211.0 269.0 L210.0 277.5 L208.0 279.0 L204.0 287.5 L201.0 289.0 L200.0 291.5 L193.5 297.0 L183.0 302.0 L181.5 304.0 L178.0 304.0 L171.5 308.0 L165.0 308.0 L158.5 311.0 L149.0 311.0 L146.0 313.0 L146.0 317.5 L145.0 318.0 L146.0 320.0 L145.0 321.0 L145.0 441.5 L235.5 441.5 L235.5 411.0 L242.0 405.5 L245.5 405.5 L249.0 402.5 L253.5 401.5 L256.0 398.5 L260.5 397.5 L262.0 394.5 L264.5 394.5 L268.0 390.5 L270.5 390.5 L276.5 384.5 L271.5 375.0 L264.5 367.5 L264.5 365.0 L254.5 353.5 L253.5 350.0 L249.5 345.5 L249.5 343.0 L247.5 342.0 L249.5 340.5 L251.0 342.5 L252.5 342.5 L255.0 346.5 L257.5 347.5 L259.0 350.5 L266.0 357.0 L266.0 358.5 L276.0 369.0 L276.0 370.5 L283.0 377.5 L285.5 378.5 L310.5 353.5 L312.5 349.0 L315.5 347.5 L315.5 343.0 L295.5 327.0 L294.0 327.0 L285.5 319.0 L284.0 319.0 L278.5 313.5 L278.5 312.0 L281.5 310.5 L290.0 317.5 L292.5 317.5 L296.0 321.5 L298.5 321.5 L301.0 324.5 L304.5 325.5 L313.0 332.5 L315.5 332.5 L317.0 335.5 L322.5 336.5 L322.5 335.0 L326.5 331.5 L326.5 328.0 L328.0 325.5 L329.5 325.5 L330.5 320.0 L333.5 317.5 L334.5 312.0 L337.5 308.5 L337.5 304.0 L341.5 298.5 L341.5 293.0 L338.5 290.0 L330.0 289.0 L326.5 286.0 L321.0 286.0 L316.5 283.0 L309.0 282.0 L305.5 279.0 L299.0 279.0 L296.5 277.5 L296.5 275.0 L299.0 273.5 L304.5 273.5 L313.0 277.5 L320.5 277.5 L330.0 281.5 L336.5 281.5 L339.5 282.5 L341.0 284.5 L344.5 284.5 L348.5 272.5 L348.5 262.0 L350.5 256.5 L351.5 242.0 L342.0 241.0 L341.5 240.0 L328.0 240.0 L327.5 239.0 L302.0 239.0 L298.5 237.5 L298.5 235.0 L301.0 233.5 L347.5 233.5 L350.5 232.5 L351.5 228.0 L350.5 227.5 L350.5 222.0 L348.5 216.5 L348.5 206.0 L345.5 200.5 L344.5 190.0 L343.5 189.0 L338.0 189.0 L335.5 191.0 L328.0 191.0 L317.5 195.0 L309.0 195.0 L300.5 199.0 L293.0 198.0 L292.5 195.0 L295.0 193.5 L302.5 193.5 L309.0 189.5 L315.5 189.5 L320.0 186.5 L326.5 186.5 L334.0 182.5 L339.5 182.5 L341.5 179.0 L337.5 172.5 L337.5 169.0 L334.5 165.5 L332.5 159.0 L330.5 157.5 L329.5 153.0 L323.5 145.5 L322.5 141.0 L321.0 141.0 L318.5 137.0 L317.0 137.0 L314.5 140.0 L310.0 141.0 L306.5 144.0 L304.0 144.0 L301.5 147.0 L296.0 148.0 L293.5 151.0 L291.0 151.0 L287.5 154.0 L283.0 155.0 L280.5 158.0 L277.5 159.0 L272.5 158.5 L274.0 154.5 L278.5 153.5 L282.0 149.5 L285.5 149.5 L290.0 145.5 L292.5 145.5 L295.0 142.5 L297.5 142.5 L300.0 139.5 L304.5 138.5 L307.0 135.5 L310.5 134.5 L313.5 131.5 L313.5 129.0 L308.5 123.5 L308.5 122.0 L306.0 121.0 L305.5 119.0 L301.5 115.5 L301.5 114.0 L282.5 96.0 L278.0 96.0 L258.0 116.0 L258.0 117.5 L256.0 118.0 L255.0 120.5 L247.0 127.0 L246.5 129.0 L244.0 129.0 L242.5 127.5 L242.5 126.0 L249.5 119.5 L249.5 118.0 L256.5 111.5 L256.5 110.0 L272.5 93.5 L273.5 89.0 L266.0 85.0 L263.5 82.0 L260.0 81.0 L257.5 78.0 L253.0 77.0 L252.5 75.0 L247.0 74.0 L244.5 71.0 L241.0 71.0 L235.5 67.0 L227.0 66.0 L225.0 71.5 L222.0 75.0 L222.0 77.5 L219.0 80.0 L218.0 84.5 L215.0 87.0 L215.0 90.5 L211.0 94.0 L211.0 98.5 L208.0 100.0 L206.5 98.5 L206.5 94.0 L209.5 91.5 L209.5 87.0 L212.5 83.5 L213.5 78.0 L217.5 72.5 L217.5 69.0 L220.5 65.5 L220.5 62.0 L217.5 60.0 L211.0 60.0 L203.5 56.0 L195.0 56.0 L187.5 53.0 L175.0 52.0 L173.5 50.5 L173.5 45.0 L171.5 43.5 L169.5 37.0 L166.5 34.5 L166.5 32.0 L154.5 19.0 L151.5 17.5 L151.5 16.0 L149.0 16.0 L140.5 9.0 L135.0 8.0 L132.5 5.0 L127.0 5.0 L123.5 2.0Z";
  // A board-game piece: the logo horse on a gold base. Origin = base centre.
  const horseToken = () =>
    `<ellipse cx="0" cy="3" rx="19" ry="7" fill="${K.ink}" opacity="0.28"/><ellipse cx="0" cy="1" rx="16" ry="7.5" fill="#b8801d" stroke="${K.ink}" stroke-width="1.3"/><ellipse cx="0" cy="-3" rx="16" ry="7.5" fill="${K.gold}" stroke="${K.ink}" stroke-width="1.3"/><ellipse cx="0" cy="-3" rx="10" ry="4.5" fill="none" stroke="${K.goldLt}" stroke-width="1.4"/><g class="map-horse__body"><path d="${LOGO_HORSE}" transform="translate(-17 -48) scale(0.098)" fill="#1f4d2e" stroke="#fffaf0" stroke-width="26" stroke-linejoin="round" paint-order="stroke"/></g>`;

  // Map positions for each story's pin.
  const MAP_PINS = {
    terkh: { x: 17, y: 27, side: "left" },
    taikhar: { x: 28, y: 52, side: "left" },
    ugii: { x: 57, y: 17 },
    orkhon: { x: 38, y: 99, side: "left" },
    karakorum: { x: 56, y: 86, side: "left" },
    erdenezuu: { x: 82, y: 63 },
  };

  // Static picture for the home-page project card (and the hero without JS).
  function cover() {
    return isoMap({});
  }

  const api = { SCENES, cover, isoMap, MAP_PINS, mapIso: iso, horseToken };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
    if (require.main === module) process.stdout.write(cover() + "\n");
  } else root.HERITAGE_ART = api;
})(this);

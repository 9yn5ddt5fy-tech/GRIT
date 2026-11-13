// GRIT Heritage: picture-book illustrations, drawn as SVG in code.
// Each scene is a small landscape (sky, hills, ground) plus a few figures.
// SCENES.name() returns an <svg> string; add a new scene by combining the
// helpers below. Used by js/heritage.js (browser) and to build
// assets/img/heritage-cover.svg (node js/heritage-art.js > file).
(function (root) {
  const C = {
    far: "#bcd3b0",
    near: "#93b884",
    ground: "#a9c992",
    water: "#86bcd6",
    waterDeep: "#5f9fc0",
    rock: "#a39d92",
    rockDark: "#7f786d",
    ink: "#2f3a2c",
    white: "#fbfaf5",
    felt: "#ece5d3",
    red: "#c4553b",
    gold: "#d9a53f",
    wood: "#8a5a3b",
    deel: "#3f6fa0",
    deel2: "#b2473a",
    skin: "#e6b98f",
    silver: "#c9ced3",
    serpent: "#4d6b3a",
  };
  const SKY = {
    day: ["#cfe6f1", "#f4f7ea"],
    dusk: ["#f2b98c", "#f8e7cf"],
    dawn: ["#f6d4b4", "#eef3e6"],
    night: ["#1f2c49", "#40557a"],
    storm: ["#9fb0b8", "#dfe4dc"],
  };
  let uid = 0;

  // Rolling hills across the full width.
  function hills(W, y, amp, color, seed, H) {
    let d = `M0 ${y}`;
    const n = Math.max(3, Math.round(W / 140));
    for (let i = 1; i <= n; i++) {
      const x = (W / n) * i;
      const cx = x - W / n / 2;
      const up = Math.sin(i * 1.7 + seed) * amp;
      d += ` Q${cx.toFixed(1)} ${(y - amp - up).toFixed(1)} ${x.toFixed(1)} ${(y + Math.cos(i + seed) * amp * 0.3).toFixed(1)}`;
    }
    return `<path d="${d} V${H} H0Z" fill="${color}"/>`;
  }

  function base(W, H, o) {
    const id = "hg" + ++uid;
    const sky = SKY[o.sky || "day"];
    const g = H * (o.ground || 0.76);
    let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs>`;
    s += `<rect width="${W}" height="${H}" fill="url(#${id})"/>`;
    if (o.sky === "night") {
      for (let i = 0; i < 18; i++) {
        const x = (i * 97 + 31) % W;
        const y = ((i * 53) % (H * 0.45)) + 8;
        s += `<circle cx="${x}" cy="${y}" r="${i % 3 ? 1 : 1.6}" fill="#fff" opacity="0.8"/>`;
      }
      s += `<circle cx="${W * 0.82}" cy="${H * 0.18}" r="16" fill="#f3efd8"/><circle cx="${W * 0.82 + 7}" cy="${H * 0.18 - 4}" r="14" fill="${sky[0]}"/>`;
    } else if (o.sun !== false) {
      const sx = o.sunX != null ? o.sunX : W * 0.8;
      const sy = o.sky === "dusk" || o.sky === "dawn" ? H * 0.5 : H * 0.2;
      s += `<circle cx="${sx}" cy="${sy}" r="${o.sky === "dusk" || o.sky === "dawn" ? 26 : 18}" fill="${o.sky === "dusk" ? "#f7d27a" : "#fbe7a1"}"/>`;
    }
    if (o.clouds !== false && o.sky !== "night") {
      s += cloud(W * 0.18, H * 0.16, 1) + cloud(W * 0.55, H * 0.1, 0.8);
    }
    const dim = o.sky === "night" ? 0.55 : 1;
    s += `<g opacity="${dim === 1 ? 1 : 0.9}">`;
    s += hills(W, g - 52, 18, o.sky === "night" ? "#4b5f63" : C.far, 0.4, H);
    s += hills(W, g - 22, 14, o.sky === "night" ? "#3e5544" : C.near, 2.1, H);
    s += `<rect y="${g}" width="${W}" height="${H - g}" fill="${o.sky === "night" ? "#4a6347" : C.ground}"/>`;
    s += `</g>`;
    return { s, g };
  }

  const cloud = (x, y, k) =>
    `<g fill="#fff" opacity="0.85" transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="0" rx="26" ry="9"/><ellipse cx="14" cy="-6" rx="16" ry="10"/><ellipse cx="-12" cy="-4" rx="12" ry="8"/></g>`;

  const wrap = (W, H, inner, label) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label || ""}">${inner}</svg>`;

  // ---------------------------------------------------------------- figures
  const ger = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-22" y="-18" width="44" height="18" rx="2" fill="${C.white}" stroke="#d6cfbd"/><path d="M-26 -17 Q0 -36 26 -17Z" fill="${C.felt}" stroke="#d6cfbd"/><rect x="-5" y="-13" width="10" height="13" fill="${C.red}"/><path d="M-22 -9 H22" stroke="${C.red}" stroke-width="1.2"/><ellipse cx="0" cy="-29" rx="4" ry="2" fill="#d6cfbd"/></g>`;

  const well = (x, y) =>
    `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="16" ry="5" fill="#6d7f86"/><path d="M-16 0 V-8 H16 V0" fill="${C.rock}"/><ellipse cx="0" cy="-8" rx="16" ry="5" fill="#8ea6ae" stroke="${C.rockDark}"/><path d="M-12 -8 V-30 M12 -8 V-30 M-15 -30 H15" stroke="${C.wood}" stroke-width="2.5" fill="none"/><path d="M0 -30 V-14" stroke="#6b5240"/><rect x="-3" y="-15" width="6" height="5" fill="${C.wood}"/></g>`;

  const spring = (x, y) =>
    `<g transform="translate(${x} ${y})" fill="${C.waterDeep}"><path d="M0 -6 Q-10 -34 -26 -26 M0 -6 Q2 -44 6 -46 M0 -6 Q12 -32 28 -24" stroke="#9fd0e6" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="-26" cy="-24" r="3"/><circle cx="28" cy="-22" r="3"/><circle cx="6" cy="-46" r="3"/></g>`;

  const lake = (cx, cy, rx, ry) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${C.water}"/><path d="M${cx - rx * 0.6} ${cy - 2} h${rx * 0.25} M${cx + rx * 0.1} ${cy + ry * 0.35} h${rx * 0.3}" stroke="#d7eef6" stroke-width="2" stroke-linecap="round"/>`;

  const volcano = (x, y, k = 1, broken) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-70 0 L-22 ${broken ? -54 : -70} ${broken ? "L22 -54" : "L0 -78 L22 -70"} L70 0Z" fill="#8a7f72"/><path d="M-22 ${broken ? -54 : -70} L-8 -30 L-30 0 H-70Z" fill="#9c9184"/>${broken ? `<ellipse cx="0" cy="-54" rx="22" ry="5" fill="#4f463e"/>` : ""}</g>`;

  const island = (cx, cy, k = 1) =>
    `<g transform="translate(${cx} ${cy}) scale(${k})"><path d="M-20 0 Q-14 -16 -2 -18 Q14 -16 20 0Z" fill="#8a7f72"/><path d="M-12 -8 l4 -10 l4 10Z M2 -10 l4 -10 l4 10Z" fill="#4f7a4a"/></g>`;

  const person = (x, y, k = 1, color = C.deel, pose = "stand") => {
    const arms =
      pose === "throw"
        ? `<path d="M-6 -30 L-14 -46 M6 -30 L14 -46" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`
        : pose === "wave"
          ? `<path d="M-6 -30 L-12 -18 M6 -30 L14 -44" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`
          : pose === "bend"
            ? `<path d="M-5 -28 L-10 -10 M5 -28 L12 -10" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`
            : `<path d="M-6 -30 L-10 -16 M6 -30 L10 -16" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`;
    return `<g transform="translate(${x} ${y}) scale(${k})">${arms}<path d="M-8 -34 H8 L12 0 H-12Z" fill="${color}"/><path d="M-8 -26 H8" stroke="${C.gold}" stroke-width="2"/><circle cx="0" cy="-41" r="7" fill="${C.skin}"/><path d="M-8 -44 Q0 -54 8 -44Z" fill="${C.ink}"/></g>`;
  };

  const horse = (x, y, k = 1, color = "#8b5e3c") =>
    `<g transform="translate(${x} ${y}) scale(${k})" fill="${color}"><ellipse cx="0" cy="-22" rx="20" ry="9"/><path d="M14 -26 L24 -42 L30 -40 L22 -22Z"/><path d="M-14 -16 V0 M-8 -16 V0 M8 -16 V0 M14 -16 V0" stroke="${color}" stroke-width="4"/><path d="M-20 -24 Q-30 -20 -26 -8" stroke="#3a2a1d" stroke-width="3" fill="none"/></g>`;

  const serpent = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-80 0 Q-60 -26 -40 0 T0 0 T40 0 Q56 -22 64 -30" stroke="${C.serpent}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M-80 0 Q-60 -26 -40 0 T0 0 T40 0" stroke="#7d9a55" stroke-width="4" fill="none" stroke-dasharray="3 6"/><ellipse cx="68" cy="-33" rx="13" ry="9" fill="${C.serpent}"/><circle cx="72" cy="-36" r="2.4" fill="#f5d34a"/><path d="M80 -32 l8 2 l-8 2" stroke="${C.red}" stroke-width="2" fill="none"/></g>`;

  const boulder = (x, y, k = 1, marks) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-70 0 Q-80 -50 -40 -78 Q0 -100 44 -80 Q82 -56 72 0Z" fill="${C.rock}"/><path d="M-40 -78 Q-10 -94 30 -86 Q-6 -70 -30 -40 Q-50 -20 -60 0 H-70 Q-80 -50 -40 -78Z" fill="#b6b0a5"/><path d="M44 -80 Q82 -56 72 0 H50 Q66 -40 44 -80Z" fill="${C.rockDark}"/>${
      marks
        ? `<g stroke="#5a544b" stroke-width="1.6" fill="none"><path d="M-30 -56 v10 M-24 -58 v12 M-18 -55 v8 M-34 -40 h16 M10 -60 l4 6 l4 -6 M22 -58 v12 M-4 -30 q4 -6 8 0 q4 6 8 0"/></g>`
        : ""
    }</g>`;

  const rockHeld = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-20 0 Q-24 -18 -8 -26 Q10 -30 20 -16 Q24 0 -20 0Z" fill="${C.rock}"/><path d="M-8 -26 Q10 -30 20 -16 Q4 -18 -8 -26Z" fill="#b6b0a5"/></g>`;

  const river = (W, y) =>
    `<path d="M0 ${y + 18} Q${W * 0.25} ${y - 6} ${W * 0.45} ${y + 10} T${W} ${y}" stroke="${C.water}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M${W * 0.1} ${y + 12} h18 M${W * 0.6} ${y + 4} h22" stroke="#d7eef6" stroke-width="2"/>`;

  const wall = (x, y, w, h, color = "#c9b48e") => {
    let s = `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${color}"/>`;
    for (let i = x; i < x + w - 4; i += 12) s += `<rect x="${i}" y="${y - h - 5}" width="7" height="5" fill="${color}"/>`;
    return s;
  };

  const roof = (x, y, w, color = C.red) =>
    `<g transform="translate(${x} ${y})"><rect x="${-w / 2 + 6}" y="-22" width="${w - 12}" height="22" fill="${C.white}"/><rect x="${-w / 2 + 12}" y="-16" width="6" height="10" fill="${C.wood}"/><rect x="${w / 2 - 18}" y="-16" width="6" height="10" fill="${C.wood}"/><path d="M${-w / 2 - 4} -22 Q0 -30 ${w / 2 + 4} -22 L${w / 2 - 6} -36 H${-w / 2 + 6}Z" fill="${color}"/><path d="M${-w / 2 + 2} -36 Q0 -42 ${w / 2 - 2} -36 L${w / 2 - 12} -46 H${-w / 2 + 12}Z" fill="${color}"/></g>`;

  const temple = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-30" y="-30" width="60" height="30" fill="${C.white}"/><rect x="-8" y="-20" width="16" height="20" fill="${C.red}"/><path d="M-42 -30 Q0 -38 42 -30 L30 -46 H-30Z" fill="#3f7a5a"/><path d="M-30 -46 Q0 -52 30 -46 L20 -58 H-20Z" fill="#3f7a5a"/><circle cx="0" cy="-62" r="4" fill="${C.gold}"/></g>`;

  const stupa = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-8" y="-8" width="16" height="8" fill="${C.white}" stroke="#d8d2c2"/><path d="M-7 -8 Q-8 -20 0 -22 Q8 -20 7 -8Z" fill="${C.white}" stroke="#d8d2c2"/><path d="M-2 -22 L0 -34 L2 -22Z" fill="${C.gold}"/><circle cx="0" cy="-35" r="1.6" fill="${C.gold}"/></g>`;

  const stupaWall = (x0, x1, y, k = 1) => {
    let s = `<rect x="${x0}" y="${y - 12 * k}" width="${x1 - x0}" height="${12 * k}" fill="#e7e2d4" stroke="#cfc8b6"/>`;
    for (let x = x0 + 8 * k; x < x1 - 4; x += 18 * k) s += stupa(x, y - 12 * k, k * 0.8);
    return s;
  };

  const turtle = (x, y, k = 1, slab) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="-2" rx="40" ry="6" fill="#7f786d" opacity="0.5"/><path d="M-34 0 Q-32 -30 0 -34 Q32 -30 34 0Z" fill="#9c968a"/><path d="M-20 -6 L-10 -24 H10 L20 -6Z M-10 -24 L0 -32 L10 -24" stroke="#7d776c" stroke-width="1.6" fill="none"/><path d="M34 -6 Q48 -10 50 -2 Q46 4 34 2Z" fill="#9c968a"/><circle cx="44" cy="-4" r="1.5" fill="${C.ink}"/>${
      slab
        ? `<rect x="-12" y="-110" width="24" height="80" rx="3" fill="#a8a296"/><path d="M-12 -110 Q0 -122 12 -110Z" fill="#a8a296"/><g stroke="#5a544b" stroke-width="1.4"><path d="M-6 -100 v8 M-6 -86 l3 4 l3 -4 M-6 -74 v8 M-6 -62 l4 -4 M-6 -52 v6 M4 -100 l-3 6 M4 -88 v8 M4 -76 l-3 4 l3 4 M4 -62 v8 M4 -50 v6"/></g>`
        : `<rect x="-6" y="-38" width="12" height="6" fill="#7d776c"/>`
    }</g>`;

  const waterfall = (x, y) =>
    `<g transform="translate(${x} ${y})"><path d="M-110 0 V-70 Q-80 -86 -30 -80 L-24 0Z" fill="#8a6f5a"/><path d="M110 0 V-74 Q80 -88 30 -80 L24 0Z" fill="#7a6150"/><path d="M-30 -80 H30 L24 0 H-24Z" fill="${C.water}"/><path d="M-20 -78 V-4 M-8 -80 V-2 M6 -80 V-4 M18 -78 V-2" stroke="#e8f6fb" stroke-width="3" opacity="0.8"/><ellipse cx="0" cy="0" rx="46" ry="10" fill="#f2fafc" opacity="0.9"/><path d="M-80 -70 l6 -10 l6 10Z M70 -76 l6 -12 l6 12Z M86 -74 l5 -9 l5 9Z" fill="#3f6b44"/></g>`;

  const ruins = (x, y) =>
    `<g transform="translate(${x} ${y})" fill="#b9a585"><rect x="-60" y="-26" width="18" height="26"/><rect x="-36" y="-14" width="30" height="14"/><rect x="4" y="-34" width="14" height="34"/><rect x="24" y="-18" width="34" height="18"/><path d="M-60 -26 l6 -6 l6 6 M4 -34 l7 -8 l7 8" fill="#a38f71"/></g>`;

  const birds = (pts) =>
    pts.map(([x, y, k = 1]) => `<path d="M${x - 8 * k} ${y} q${4 * k} ${-5 * k} ${8 * k} 0 q${4 * k} ${-5 * k} ${8 * k} 0" stroke="${C.ink}" stroke-width="1.6" fill="none"/>`).join("");

  const fish = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="0" rx="10" ry="5" fill="#e2a24a"/><path d="M-10 0 l-7 -5 v10Z" fill="#e2a24a"/><circle cx="5" cy="-1" r="1.2" fill="${C.ink}"/></g>`;

  const trash = (x, y) =>
    `<g transform="translate(${x} ${y})"><rect x="0" y="-12" width="6" height="12" rx="1.5" fill="#cfe3ea" stroke="#8fb0bd"/><rect x="1.5" y="-15" width="3" height="3" fill="#3f6fa0"/><rect x="14" y="-6" width="10" height="6" rx="1" fill="${C.red}" transform="rotate(-20 19 -3)"/><rect x="-16" y="-5" width="12" height="5" rx="1" fill="#c9ced3" transform="rotate(10 -10 -2)"/></g>`;

  const bag = (x, y, color = "#3f6fa0") =>
    `<g transform="translate(${x} ${y})"><path d="M-10 0 Q-12 -18 -4 -22 L4 -22 Q12 -18 10 0Z" fill="${color}"/><path d="M-4 -22 l-2 -5 M4 -22 l2 -5" stroke="${color}" stroke-width="2"/><path d="M-3 -12 l3 -4 l3 4 M-2 -8 h4" stroke="#fff" stroke-width="1.4" fill="none"/></g>`;

  const silverTree = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><rect x="-6" y="-90" width="12" height="90" fill="${C.silver}" stroke="#9aa1a8"/><path d="M0 -70 Q-40 -86 -54 -110 M0 -76 Q36 -90 50 -116 M0 -90 Q-20 -112 -18 -130 M0 -90 Q18 -110 22 -132" stroke="${C.silver}" stroke-width="6" fill="none" stroke-linecap="round"/><g fill="#e3e6ea">${[
      [-54, -112], [-40, -100], [50, -118], [36, -104], [-18, -132], [22, -134], [0, -124], [-30, -120], [32, -128],
    ]
      .map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="7" ry="4" transform="rotate(-20 ${a} ${b})"/>`)
      .join("")}</g><path d="M-6 -40 H-30 V-26 M6 -46 H30 V-30 M-6 -58 H-40 V-44 M6 -62 H40 V-46" stroke="#9aa1a8" stroke-width="3" fill="none"/><g><circle cx="-30" cy="-20" r="3" fill="#7a2a3a"/><circle cx="30" cy="-24" r="3" fill="#f3efe6" stroke="#ccc"/><circle cx="-40" cy="-38" r="3" fill="${C.gold}"/><circle cx="40" cy="-40" r="3" fill="#f2e7c4"/></g><g transform="translate(0 -142)"><circle cx="0" cy="-10" r="5" fill="${C.skin}"/><path d="M-6 -4 H6 L8 12 H-8Z" fill="#f2f0ea"/><path d="M-6 0 Q-20 -8 -18 4 M6 0 Q20 -8 18 4" fill="#e7e2d4"/><path d="M4 -10 L18 -16 L20 -12Z" fill="${C.gold}"/></g><rect x="-40" y="-4" width="80" height="6" rx="2" fill="#9aa1a8"/></g>`;

  const book = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0 -4 Q-18 -12 -34 -6 V18 Q-18 12 0 20Z" fill="${C.white}" stroke="#cdbf9f"/><path d="M0 -4 Q18 -12 34 -6 V18 Q18 12 0 20Z" fill="#f5efe0" stroke="#cdbf9f"/><path d="M-28 0 h20 M-28 6 h20 M-28 12 h14 M8 0 h20 M8 6 h20 M8 12 h16" stroke="#a7977a" stroke-width="1.2"/></g>`;

  const globe = (x, y, r) =>
    `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#8cc0d8" stroke="#fff" stroke-width="3"/><path d="M${-r * 0.5} ${-r * 0.4} q${r * 0.3} ${-r * 0.3} ${r * 0.6} ${-r * 0.1} q${r * 0.2} ${r * 0.4} ${-r * 0.1} ${r * 0.6} q${-r * 0.4} ${r * 0.1} ${-r * 0.5} ${-r * 0.5}Z M${r * 0.15} ${r * 0.2} q${r * 0.4} ${-r * 0.1} ${r * 0.5} ${r * 0.3} q${-r * 0.2} ${r * 0.4} ${-r * 0.5} ${r * 0.2}Z" fill="#7fae7a"/><ellipse rx="${r}" ry="${r * 0.35}" fill="none" stroke="#fff" stroke-width="1" opacity="0.6"/><ellipse rx="${r * 0.4}" ry="${r}" fill="none" stroke="#fff" stroke-width="1" opacity="0.6"/></g>`;

  const caravan = (x, y, k = 1) =>
    `<g transform="translate(${x} ${y}) scale(${k})" fill="#b98a55"><ellipse cx="0" cy="-26" rx="22" ry="10"/><path d="M-6 -36 q6 -14 12 0Z M8 -36 q6 -14 12 0Z"/><path d="M18 -30 Q30 -40 28 -54 L34 -54 Q36 -36 22 -22Z"/><path d="M-14 -18 V0 M-6 -18 V0 M8 -18 V0 M16 -18 V0" stroke="#b98a55" stroke-width="4"/><rect x="-14" y="-44" width="12" height="10" fill="${C.red}"/></g>`;

  const flames = (x, y) =>
    `<g transform="translate(${x} ${y})" opacity="0.85"><path d="M0 0 Q-10 -20 0 -40 Q10 -20 0 0Z" fill="#e0773d"/><path d="M14 0 Q6 -14 14 -28 Q22 -14 14 0Z" fill="#f0a24a"/><path d="M-14 0 Q-20 -10 -14 -22 Q-8 -10 -14 0Z" fill="#f0a24a"/></g>`;

  // ---------------------------------------------------------------- scenes
  const W = 400,
    H = 250;
  const scene = (opts, draw, label) => () => {
    const b = base(W, H, opts);
    return wrap(W, H, b.s + draw(b.g), label);
  };

  const SCENES = {
    // Terkhiin Tsagaan Lake
    "valley-well": scene({ sky: "day" }, (g) => ger(110, g + 6, 1.3) + well(250, g + 22) + person(210, g + 24, 0.9, C.deel2) + person(290, g + 26, 0.9, C.deel) + horse(70, g + 30, 0.8)),
    "well-flood": scene({ sky: "storm", sun: false }, (g) => lake(230, g + 26, 150, 22) + well(240, g + 18) + spring(240, g + 2) + ger(80, g + 8, 1.2) + person(120, g + 30, 0.9, C.deel2, "wave")),
    "hero-mountain": scene({ sky: "dusk" }, (g) => volcano(300, g - 4, 1.2, true) + rockHeld(150, g - 70, 1.3) + person(150, g + 26, 1.2, C.deel, "throw") + lake(250, g + 34, 130, 14)),
    "lake-island": scene({ sky: "day" }, (g) => volcano(320, g - 10, 0.9, true) + lake(190, g + 24, 170, 30) + island(180, g + 24, 1.1) + birds([[90, 60], [110, 52, 0.8], [260, 44]])),
    "volcano-lava": scene({ sky: "dawn" }, (g) => volcano(130, g, 1.3) + flames(130, g - 100) + `<path d="M150 ${g - 40} Q200 ${g - 10} 240 ${g + 4} Q280 ${g + 14} 330 ${g + 8}" stroke="#c4553b" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.8"/>` + lake(320, g + 30, 70, 14)),

    // Taikhar rock
    "serpent-valley": scene({ sky: "storm", sun: false }, (g) => river(W, g + 30) + serpent(210, g + 8, 1.1) + ger(330, g + 6, 0.9) + person(60, g + 30, 0.8, C.deel2, "wave")),
    "strong-man": scene({ sky: "day" }, (g) => person(200, g + 34, 1.5, C.deel) + ger(80, g + 6, 1) + ger(330, g + 8, 0.9) + horse(280, g + 34, 0.8)),
    "rock-throw": scene({ sky: "dusk" }, (g) => serpent(260, g + 22, 0.9) + rockHeld(250, g - 60, 2) + person(90, g + 32, 1.3, C.deel, "throw") + river(W, g + 40)),
    "taikhar-rock": scene({ sky: "day" }, (g) => river(W, g + 36) + boulder(200, g + 20, 1.25) + person(300, g + 30, 0.6, C.deel2) + birds([[80, 50], [100, 44, 0.8]])),
    "rock-writing": scene({ sky: "day" }, (g) => boulder(170, g + 26, 1.35, true) + `<path d="M150 ${g - 36} q8 -10 16 0 q8 10 16 0" stroke="${C.red}" stroke-width="3" fill="none"/><path d="M300 ${g - 20} l26 26 M326 ${g - 20} l-26 26" stroke="${C.red}" stroke-width="5" stroke-linecap="round"/>` + person(320, g + 32, 0.8, C.deel)),

    // Karakorum
    "karakorum-city": scene({ sky: "day" }, (g) => wall(40, g + 20, 320, 34) + roof(120, g - 14, 70) + roof(250, g - 14, 90, "#3f7a5a") + ger(330, g - 12, 0.7) + turtle(60, g + 34, 0.5) + river(W, g + 40)),
    "market": scene({ sky: "day" }, (g) => caravan(90, g + 30, 1) + caravan(160, g + 26, 0.8) + person(240, g + 32, 1, C.deel) + person(280, g + 32, 1, "#7a5a8a") + person(320, g + 32, 1, C.deel2) + roof(300, g - 10, 80)),
    "silver-tree": scene({ sky: "dusk", clouds: false }, (g) => `<rect x="60" y="${g - 120}" width="280" height="${H - g + 120}" fill="#e9dcc2"/><rect x="60" y="${g - 120}" width="280" height="14" fill="${C.red}"/>` + silverTree(200, g + 30, 1.05)),
    "traveler-book": scene({ sky: "dawn" }, (g) => person(120, g + 32, 1.3, "#6b5a4a") + `<path d="M138 ${g - 30} V${g + 32}" stroke="${C.wood}" stroke-width="3"/>` + book(250, g - 10, 1.6) + horse(330, g + 34, 0.7)),
    "turtle-stone": scene({ sky: "day" }, (g) => turtle(200, g + 32, 1.6) + stupaWall(250, 400, g - 2, 0.7) + birds([[90, 60]])),

    // Erdene Zuu
    "ruins-build": scene({ sky: "dawn" }, (g) => ruins(110, g + 20) + temple(280, g + 18, 1.1) + person(190, g + 32, 0.9, C.deel2, "bend") + `<rect x="196" y="${g + 18}" width="14" height="10" fill="#b9a585"/>`),
    "stupa-wall": scene({ sky: "day" }, (g) => stupaWall(10, 390, g + 26, 1.4) + temple(200, g - 4, 0.9)),
    "temples": scene({ sky: "day" }, (g) => temple(110, g + 24, 1.2) + temple(290, g + 24, 1.2) + roof(200, g + 18, 74) + stupa(200, g + 40, 1.4)),
    "hard-times": scene({ sky: "night", clouds: false }, (g) => ruins(120, g + 24) + ruins(290, g + 30) + stupaWall(150, 260, g + 28, 1)),
    "erdenezuu-today": scene({ sky: "dawn" }, (g) => stupaWall(20, 380, g + 20, 1.2) + temple(140, g - 2, 0.9) + temple(260, g - 2, 0.9) + person(330, g + 40, 0.7, C.deel2) + person(350, g + 40, 0.6, C.deel)),

    // Orkhon Valley
    "orkhon-river": scene({ sky: "day" }, (g) => river(W, g + 14) + horse(90, g + 46, 0.8) + horse(130, g + 50, 0.7, "#d8c9a8") + ger(300, g + 40, 0.9) + birds([[260, 50], [280, 44, 0.8]])),
    "waterfall": scene({ sky: "day", clouds: false }, (g) => waterfall(200, g + 30)),
    "steles": scene({ sky: "dawn" }, (g) => turtle(130, g + 36, 0.9, true) + turtle(270, g + 36, 0.9, true)),
    "valley-layers": scene({ sky: "day" }, (g) => ruins(80, g + 20) + stupaWall(160, 260, g + 18, 0.8) + temple(330, g - 10, 0.7) + `<path d="M300 ${g - 4} Q330 ${g - 60} 360 ${g - 4}Z" fill="#8a7f72"/>` + temple(330, g - 34, 0.5) + river(W, g + 40)),
    "world-heritage": scene({ sky: "day", sun: false }, (g) => globe(200, g - 70, 48) + stupaWall(40, 360, g + 28, 1) + birds([[90, 40], [320, 46]])),

    // Ugii Lake
    "ugii-lake": scene({ sky: "day" }, (g) => lake(200, g + 26, 190, 30) + ger(70, g + 6, 0.9) + birds([[150, 60], [170, 54, 0.8], [250, 70], [270, 64, 0.8]])),
    "birds-migrate": scene({ sky: "dusk" }, (g) => lake(200, g + 30, 190, 24) + birds([[60, 70, 1.4], [90, 60, 1.3], [120, 52, 1.2], [150, 46, 1.1], [180, 40, 1], [90, 90, 1], [120, 84, 1], [150, 78, 1]])),
    "fishing": scene({ sky: "day" }, (g) => lake(200, g + 30, 190, 28) + fish(160, g + 30, 1.2) + fish(240, g + 36, 1) + person(80, g + 10, 1, C.deel) + `<path d="M88 ${g - 30} Q140 ${g - 70} 170 ${g + 20}" stroke="${C.wood}" stroke-width="2" fill="none"/>` + horse(330, g + 10, 0.7)),
    "litter": scene({ sky: "storm", sun: false }, (g) => lake(240, g + 30, 160, 22) + trash(70, g + 38) + trash(140, g + 46) + trash(320, g + 48) + birds([[300, 70]])),
    "cleanup": scene({ sky: "day" }, (g) => lake(300, g + 26, 110, 18) + person(80, g + 36, 0.9, C.deel, "bend") + person(140, g + 36, 0.9, C.deel2, "wave") + person(200, g + 36, 0.9, "#4b7a4f", "bend") + bag(240, g + 40) + bag(260, g + 42, "#4b7a4f")),

    // Games
    "game-quiz": scene({ sky: "day" }, (g) => book(130, g - 30, 2) + person(270, g + 34, 1.2, C.deel2, "wave") + stupa(340, g + 34, 1.6)),
    "game-timeline": scene({ sky: "dawn" }, (g) => `<path d="M30 ${g - 40} H370" stroke="${C.ink}" stroke-width="3"/>` + [60, 140, 220, 300].map((x, i) => `<circle cx="${x}" cy="${g - 40}" r="8" fill="${[C.red, C.gold, "#3f7a5a", C.deel][i]}"/>`).join("") + turtle(80, g + 34, 0.6) + stupa(200, g + 34, 1.4) + ger(320, g + 30, 0.9)),
  };

  // Wide picture for the page hero and the home-page project card.
  function cover() {
    const CW = 1200,
      CH = 520;
    const b = base(CW, CH, { sky: "dawn", sunX: 640, ground: 0.6 });
    const g = b.g;
    const inner =
      b.s +
      `<g transform="translate(0 ${g}) scale(1.35) translate(0 ${-g})">` +
      volcano(840, g + 4, 1.3, true) +
      lake(740, g + 70, 200, 30) +
      island(750, g + 66, 1.5) +
      stupaWall(30, 380, g + 60, 1.5) +
      temple(205, g + 28, 1.2) +
      turtle(450, g + 112, 1) +
      ger(540, g + 52, 1.1) +
      person(500, g + 116, 1, C.deel2) +
      horse(600, g + 118, 0.9) +
      `</g>` +
      birds([[420, 90, 1.4], [450, 80, 1.2], [480, 72, 1.1], [860, 60, 1.2]]);
    return wrap(CW, CH, inner, "Illustration: Erdene Zuu's stupa wall, a stone turtle, a ger and a lake with an island").replace('preserveAspectRatio="xMidYMid slice" ', "");
  }

  const api = { SCENES, cover };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
    if (require.main === module) process.stdout.write(cover() + "\n");
  } else root.HERITAGE_ART = api;
})(this);

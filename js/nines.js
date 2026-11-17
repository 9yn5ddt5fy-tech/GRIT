/* Winter's nine nines (Өвлийн есөн ес): 81 days counted in nine 9-day blocks from
   the winter solstice (22 December). Renders the full section into #nines and a
   compact teaser into #nines-mini. Text lives here as {en, mn}; containers carry
   translate="no" so js/i18n.js leaves them alone. Test a date with ?es-date=2027-01-12 */
(function () {
  const full = document.getElementById("nines");
  const mini = document.getElementById("nines-mini");
  if (!full && !mini) return;
  const root = document.documentElement;
  const lang = () => (root.getAttribute("data-lang") === "mn" ? "mn" : "en");
  const t = (o) => (typeof o === "string" ? o : o[lang()]);

  const NINES = [
    { mn: "Нэг ес", en: "First nine", say: "Нэрмэл архи хөлдөнө", tr: "Milk vodka freezes", cold: 3,
      note: { mn: "Хүйтэн эхэлж, сүүнээс нэрсэн архи ч хөлдөнө.", en: "The cold sets in — even milk vodka freezes." } },
    { mn: "Хоёр ес", en: "Second nine", say: "Хорз архи хөлдөнө", tr: "Twice-distilled vodka freezes", cold: 4,
      note: { mn: "Хүйтэн чангарч, давхар нэрсэн хорз ч хөлдөнө.", en: "The cold deepens — even twice-distilled vodka freezes." } },
    { mn: "Гурван ес", en: "Third nine", say: "Гунан үхрийн эвэр хуга хөлдөнө", tr: "A three-year-old ox's horns freeze and crack", cold: 5,
      note: { mn: "Жилийн хамгийн хүйтэн үе — үхрийн эвэр хүйтэнд хагарна.", en: "The coldest stretch of the year — horns crack in the frost." } },
    { mn: "Дөрвөн ес", en: "Fourth nine", say: "Дөнөн үхрийн эвэр хуга хөлдөнө", tr: "A four-year-old ox's horns freeze and crack", cold: 5,
      note: { mn: "Хүйтний оргил үргэлжилсээр.", en: "The peak of the cold goes on." } },
    { mn: "Таван ес", en: "Fifth nine", say: "Тавьсан будаа хөлдөхгүй", tr: "Porridge set out no longer freezes", cold: 4,
      note: { mn: "Хүйтэн сулрах эхлэл.", en: "The cold begins to ease." } },
    { mn: "Зургаан ес", en: "Sixth nine", say: "Зурайсан зам гарна", tr: "Tracks show through the snow", cold: 3,
      note: { mn: "Нар илчтэй болж, цасан дундуур зам зурайна.", en: "The sun gains strength and paths appear in the snow." } },
    { mn: "Долоон ес", en: "Seventh nine", say: "Довын толгой борлоно", tr: "Hilltops turn brown", cold: 2,
      note: { mn: "Довын толгойн цас хайлж, бор шороо ил гарна.", en: "Snow melts off the hillocks and bare ground shows." } },
    { mn: "Найман ес", en: "Eighth nine", say: "Нал шал болно", tr: "Everything turns to slush", cold: 1,
      note: { mn: "Цас хайлж, хаа сайгүй нойтон болно.", en: "The snow melts and the ground turns wet." } },
    { mn: "Есөн ес", en: "Ninth nine", say: "Ердийн дулаан болно", tr: "Ordinary warmth returns", cold: 1,
      note: { mn: "Хүйтэн дуусаж, ердийн дулаан цаг ирнэ.", en: "The cold is over and warm days return." } },
  ];
  const DAY = 86400000;
  const MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function today() {
    const q = new URLSearchParams(location.search).get("es-date");
    const d = q && /^\d{4}-\d{2}-\d{2}$/.test(q) ? new Date(q + "T12:00:00") : new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  // The season that is running now, or the next one if none is.
  function season(now) {
    const y = now.getFullYear();
    let start = new Date(y, 11, 22);
    if (now < start) {
      const prev = new Date(y - 1, 11, 22);
      if ((now - prev) / DAY < 81) start = prev;
    }
    const day = Math.round((now - start) / DAY); // 0-based; <0 = not started yet
    return { start, day, active: day >= 0 && day < 81 };
  }
  const add = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  function range(a, b) {
    if (lang() === "mn") {
      const f = (d) => `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, "0")}`;
      return `${f(a)} – ${f(b)}`;
    }
    return a.getMonth() === b.getMonth()
      ? `${a.getDate()}–${b.getDate()} ${MON_EN[b.getMonth()]}`
      : `${a.getDate()} ${MON_EN[a.getMonth()]} – ${b.getDate()} ${MON_EN[b.getMonth()]}`;
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const frost = (n) =>
    `<span class="nine__frost" aria-label="${t({ en: "Cold", mn: "Хүйтэн" })} ${n}/5">${[1, 2, 3, 4, 5]
      .map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>`;

  function status(s) {
    const L = lang();
    if (!s.active) {
      const n = Math.round((s.start - today()) / DAY);
      return L === "mn"
        ? { big: `${n} хоног`, line: `үлдлээ — есөн ес ${s.start.getFullYear()} оны 12-р сарын 22-нд эхэлнэ.` }
        : { big: `${n} day${n === 1 ? "" : "s"}`, line: `to go — the nine nines begin on 22 December ${s.start.getFullYear()}.` };
    }
    const k = Math.floor(s.day / 9), d = (s.day % 9) + 1, nine = NINES[k];
    return L === "mn"
      ? { big: nine.mn, line: `${d} дэх өдөр · 81 хоногийн ${s.day + 1} дэх нь. «${nine.say}»` }
      : { big: nine.en, line: `day ${d} of 9 · day ${s.day + 1} of 81. “${nine.tr}.”` };
  }
  function bar(s) {
    if (!s.active) return "";
    return `<div class="nines__bar" aria-hidden="true">${NINES.map((_, i) => {
      const done = !s.active ? 0 : Math.max(0, Math.min(9, s.day + 1 - i * 9));
      return `<span><i style="width:${((done / 9) * 100).toFixed(1)}%"></i></span>`;
    }).join("")}</div>`;
  }

  function renderFull(s) {
    const cur = s.active ? Math.floor(s.day / 9) : -1;
    const st = status(s);
    const L = lang();
    full.innerHTML = `
      <div class="nines__head">
        <p class="nines__eyebrow">${t({ en: "Winter tradition", mn: "Өвлийн уламжлал" })}</p>
        <h2 class="nines__title">${t({ en: "The nine nines of winter", mn: "Өвлийн есөн ес" })}</h2>
        <p class="nines__lead">${t({
          en: "Herders count the coldest part of the year in nine blocks of nine days, starting at the winter solstice. Each nine has a saying that tells what the cold does — 81 days in all, from 22 December to mid-March.",
          mn: "Малчид жилийн хамгийн хүйтэн үеийг өвлийн туйлаас эхлэн есөн хоногоор есөн удаа тоолдог. Ес бүр хүйтний байдлыг илэрхийлсэн хэллэгтэй — нийт 81 хоног, 12-р сарын 22-ноос 3-р сарын дунд хүртэл.",
        })}</p>
      </div>
      <div class="nines__now">
        <p class="nines__now-k">${t(s.active ? { en: "Now", mn: "Одоо" } : { en: "Countdown", mn: "Есөн ес эхлэхэд" })}</p>
        <p class="nines__now-big">${esc(st.big)}</p>
        <p class="nines__now-line">${esc(st.line)}</p>
        ${bar(s)}
      </div>
      <ol class="nines__grid">${NINES.map((n, i) => {
        const a = add(s.start, i * 9), b = add(s.start, i * 9 + 8);
        const cls = i === cur ? " nine--now" : s.active && i < cur ? " nine--past" : "";
        return `<li class="nine${cls}">
          <div class="nine__top"><span class="nine__no">${i + 1}</span>${i === cur ? `<span class="nine__badge">${t({ en: "Now", mn: "Одоо" })}</span>` : ""}${frost(n.cold)}</div>
          <p class="nine__name">${esc(L === "mn" ? n.mn : n.en)}</p>
          <p class="nine__date">${range(a, b)}</p>
          <p class="nine__say" lang="mn">${esc(n.say)}</p>
          <p class="nine__tr">${esc(L === "mn" ? n.note.mn : n.tr)}</p>
        </li>`;
      }).join("")}</ol>
      <p class="nines__foot">${t({
        en: "A folk calendar: some families start the count on 21 December, and the sayings vary a little from region to region.",
        mn: "Ардын тооллын уламжлал тул зарим нутагт 12-р сарын 21-нээс эхэлж тоолдог, хэллэг нь ч нутаг нутагт бага зэрэг өөр байдаг.",
      })} <a href="https://www.montsame.mn/mn/read/247456" target="_blank" rel="noopener">Montsame</a> · <a href="https://www.maamuu.mn/?p=13168" target="_blank" rel="noopener">Maamuu</a></p>`;
  }

  function renderMini(s) {
    const st = status(s);
    mini.innerHTML = `
      <div class="nines-mini__text">
        <p class="nines__eyebrow">${t({ en: "Winter tradition", mn: "Өвлийн уламжлал" })}</p>
        <h3 class="nines-mini__title">${t({ en: "The nine nines of winter", mn: "Өвлийн есөн ес" })}</h3>
        <p class="nines-mini__line"><b>${esc(st.big)}</b> ${esc(st.line)}</p>
      </div>
      <div class="nines-mini__side">${bar(s)}<span class="nines-mini__link">${t({ en: "All nine sayings", mn: "Есөн есийн хэллэг" })} <span aria-hidden="true">→</span></span></div>`;
  }

  function render() {
    const s = season(today());
    if (full) renderFull(s);
    if (mini) renderMini(s);
  }
  render();
  new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ["data-lang"] });
})();

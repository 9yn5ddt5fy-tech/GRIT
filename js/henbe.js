// Хэн бэ? (Who am I?): a daily game on /culture/. One person from Mongolian history hides
// behind five clues, from hard to easy. A wrong guess (or "I don't know") opens the next clue;
// solving on clue k gives 6 - k points. The people, clues and checking live in the database
// (supabase/010_hen_be.sql), so the answer is never in this file. Needs js/tu.js.
// On /culture/ only the card's status line (#henbe-status) is filled in.
(function () {
  const root = document.getElementById("henbe");
  const statusEl = document.getElementById("henbe-status");
  if (!window.GRIT_TU || (!root && !statusEl)) return;
  const TU = window.GRIT_TU;
  const mn = () => { const d = document.documentElement; return d.hasAttribute("data-lang") ? d.getAttribute("data-lang") === "mn" : !/^en/.test(d.lang || ""); };
  const L = (m, e) => (mn() ? m : e);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nm = (o) => (o ? (mn() ? o.mn : o.en) : "");
  const ORD = ["", "1 дэх", "2 дахь", "3 дахь", "4 дэх", "5 дахь"];
  const ORD_EN = ["", "1st", "2nd", "3rd", "4th", "5th"];
  // so “сухбаатар”, “Sukhbaatar” and “Д. Сүхбаатар” all find the same person
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/ө/g, "о").replace(/ү/g, "у").replace(/ё/g, "е").replace(/[.\-()]/g, " ").replace(/\s+/g, " ").trim();

  let S = null, names = [], busy = false, quiet = false, sel = -1, list = [];

  // ------------------------------------------------------------ status line on the /culture/ card
  if (!root) {
    let st = null;
    const paint = () => {
      if (!st) { statusEl.textContent = ""; return; }
      const n = st.no, k = st.guesses.length;
      statusEl.textContent = !k ? L(`Өнөөдрийн №${n} хүн таныг хүлээж байна.`, `Today's person №${n} is waiting for you.`)
        : !st.finished ? L(`Өнөөдрийн №${n} хүн: ${k + 1}/5 сэжүүр нээгдсэн. Үргэлжлүүлээрэй!`, `Today's person №${n}: ${k + 1}/5 clues open. Keep going!`)
        : st.solved ? L(`Та өнөөдрийн №${n} хүнийг ${k}/5 сэжүүрээр таалаа. Маргааш дахин ирээрэй!`, `You found today's person №${n} with ${k}/5 clues. Come back tomorrow!`)
        : L(`Өнөөдрийн №${n} хүнийг таасангүй. Маргааш шинэ хүн гарна.`, `Today's person №${n} got away. A new one comes tomorrow.`);
    };
    const get = async () => { try { st = await TU.rpc("hb_state", TU.token ? { p_token: TU.token } : {}); } catch (e) { st = null; } paint(); };
    window.addEventListener("tu-change", get);
    new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
    get();
    return;
  }

  async function load() {
    try {
      const [n, s] = await Promise.all([
        names.length ? names : TU.rpc("hb_names"),
        TU.rpc("hb_state", TU.token ? { p_token: TU.token } : {}),
      ]);
      names = n.map((x) => ({ ...x, key: norm(x.mn) + " | " + norm(x.en) })); S = s;
    } catch (e) { S = null; }
    render();
  }

  function clueList() {
    const open = S.clues.length;
    return `<ol class="hb__clues">${[1, 2, 3, 4, 5].map((i) => i <= open
      ? `<li class="hb__clue${i === open && !S.finished ? " is-new" : ""}"><span class="hb__n">${i}</span><p>${esc(nm(S.clues[i - 1]))}</p></li>`
      : `<li class="hb__clue is-locked"><span class="hb__n">${i}</span><p>${L("Буруу таавал нээгдэнэ", "Opens after a wrong guess")}</p></li>`).join("")}</ol>`;
  }

  function guessChips() {
    if (!S.guesses.length) return "";
    return `<div class="hb__guesses">${S.guesses.map((g) => {
      const ok = S.solved && S.answer && g.id === S.answer.id;
      return `<span class="hb__chip${ok ? " is-ok" : g.id ? " is-no" : ""}">${g.id ? esc(nm(g)) : L("Мэдэхгүй", "Don't know")}</span>`;
    }).join("")}</div>`;
  }

  function nextIn() {
    const s = Math.max(0, S.next_in | 0), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return h ? L(`${h} цаг ${m} минутын дараа`, `in ${h} h ${m} min`) : L(`${m} минутын дараа`, `in ${m} min`);
  }

  function render() {
    if (!S) { root.innerHTML = `<p class="hb__msg">${L("Тоглоомыг ачаалж чадсангүй. Дараа дахин оролдоорой.", "The game could not load. Please try again later.")}</p>`; return; }
    const tries = S.guesses.length, worth = 5 - tries;
    const top = `<div class="hb__top"><span class="hb__no">№${S.no}</span>${S.finished ? "" : `<span class="hb__worth">${L(`Одоо таавал ${worth} оноо`, `Guess now for ${worth} point${worth === 1 ? "" : "s"}`)}</span>`}</div>`;
    let body;
    if (S.finished) {
      const a = S.answer, k = tries;
      const verdict = S.solved
        ? L(`Таалаа! ${ORD[k]} сэжүүрээр, +${S.points} оноо`, `You got it on the ${ORD_EN[k]} clue, +${S.points} point${S.points === 1 ? "" : "s"}`)
        : L("Энэ удаад таасангүй", "Not this time");
      body = `<div class="hb__result">
          <p class="hb__verdict${S.solved ? " is-ok" : ""}">${verdict}</p>
          <h3 class="hb__name">${esc(nm(a))}</h3>
          <p class="hb__era">${esc(mn() ? a.era_mn : a.era_en)}</p>
          <p class="hb__info">${esc(mn() ? a.info_mn : a.info_en)}</p>
          <div class="hb__actions">
            <button class="btn btn--dark hb__story" type="button">${L("Story зураг", "Story image")}</button>
            <button class="btn btn--outline hb__share" type="button">${L("Текст хуулах", "Copy text")}</button>
            ${TU.signedIn() ? "" : `<button class="btn btn--outline hb__login" type="button">${L("Нэвтэрч оноогоо хадгалах", "Sign in to keep your points")}</button>`}
          </div>
          <p class="hb__next">${L("Дараагийн хүн", "Next person")} ${nextIn()}</p>
        </div>`;
    } else {
      body = `<form class="hb__form" autocomplete="off">
          <div class="hb__field">
            <input class="hb__input" type="text" name="q" role="combobox" aria-expanded="false" aria-controls="hb-sug" aria-autocomplete="list"
              placeholder="${L("Түүхэн хүний нэрийг бичээрэй", "Type a name from history")}" aria-label="${L("Хэн бэ?", "Who am I?")}">
            <ul class="hb__sug" id="hb-sug" role="listbox" hidden></ul>
          </div>
          <button class="btn btn--dark hb__go" type="submit">${L("Таах", "Guess")}</button>
        </form>
        <button class="hb__skip" type="button">${tries < 4 ? L("Мэдэхгүй байна, дараагийн сэжүүр", "I don't know, show the next clue") : L("Мэдэхгүй байна, хариуг харах", "I don't know, show the answer")}</button>`;
    }
    root.innerHTML = top + clueList() + guessChips() + body;
    bind();
  }

  function suggest(input, box) {
    const q = norm(input.value), done = new Set(S.guesses.map((g) => g.id));
    list = q ? names.filter((x) => !done.has(x.id) && q.split(" ").every((w) => x.key.includes(w))).slice(0, 6) : [];
    sel = list.length ? 0 : -1;
    box.innerHTML = list.map((x, i) => `<li role="option" id="hb-o${i}" data-i="${i}"${i === sel ? ' aria-selected="true"' : ""}>${esc(nm(x))}</li>`).join("")
      || (q ? `<li class="is-empty">${L("Жагсаалтад ийм нэр алга", "No one by that name in the list")}</li>` : "");
    box.hidden = !q;
    input.setAttribute("aria-expanded", String(!!q));
  }

  function bind() {
    const f = root.querySelector(".hb__form");
    if (f) {
      const input = f.querySelector(".hb__input"), box = f.querySelector(".hb__sug");
      const mark = () => box.querySelectorAll("li[data-i]").forEach((li) => li.setAttribute("aria-selected", String(+li.dataset.i === sel)));
      input.addEventListener("input", () => suggest(input, box));
      input.addEventListener("keydown", (e) => {
        if (!list.length) return;
        if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % list.length; mark(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + list.length) % list.length; mark(); }
        else if (e.key === "Escape") { box.hidden = true; }
      });
      box.addEventListener("mousedown", (e) => { const li = e.target.closest("li[data-i]"); if (!li) return; e.preventDefault(); guess(list[+li.dataset.i].id); });
      f.addEventListener("submit", (e) => {
        e.preventDefault();
        if (sel >= 0 && list[sel]) guess(list[sel].id);
        else TU.toast(L("Жагсаалтаас нэг хүнийг сонгоорой", "Pick a person from the list"));
      });
    }
    root.querySelector(".hb__skip")?.addEventListener("click", () => guess(0));
    root.querySelector(".hb__login")?.addEventListener("click", () => TU.openAccount());
    root.querySelector(".hb__share")?.addEventListener("click", share);
    root.querySelector(".hb__story")?.addEventListener("click", story);
  }

  async function guess(id) {
    if (busy) return; busy = true;
    root.classList.add("is-busy");
    try {
      const r = await TU.call("hb_guess", { p_id: id });
      const wrong = !r.solved;
      S = r;
      if (TU.state && r.stats) TU.state.stats = r.stats;
      render();
      if (r.finished) {
        if (r.points > 0) TU.toast(L(`+${r.points} оноо`, `+${r.points} points`));
        quiet = true; TU.reload(); quiet = false;  // leaderboard, ranks and the header avatar
      } else {
        if (wrong && id) TU.toast(L("Буруу байна. Дараагийн сэжүүр нээгдлээ", "Not quite. The next clue is open"));
        root.querySelector(".hb__input")?.focus();
      }
    } catch (e) {
      const m = { done: ["Өнөөдрийн тоглоом дууссан", "Today's game is over"], repeat: ["Энэ хүнийг аль хэдийн таасан", "You already guessed this person"] }[e.message];
      TU.toast(m ? L(m[0], m[1]) : L("Холболт тасарлаа. Дахин оролдоорой", "Connection lost. Please try again"));
      if (e.message === "done") load();
    } finally {
      busy = false;
      root.classList.remove("is-busy");
    }
  }

  // ------------------------------------------------------------ sharing (no spoilers: only how many clues it took)
  function shareText() {
    const k = S.guesses.length;
    const row = S.guesses.map((g, i) => (S.solved && i === k - 1 ? "⬜" : "⬛")).join("");
    const rank = TU.state && TU.state.stats && TU.state.stats.rank;
    // all caps like Таасан уу?: Instagram's font draws small ү, ө oddly
    return [
      `${L("ХЭН БЭ?", "WHO AM I?")} №${S.no}`,
      `${S.solved ? k : "X"}/5`,
      "",
      row,
      "",
      rank ? `${L("ЦОЛ", "RANK")}: ${String(rank).toUpperCase()}` : "",
      "GRIT.MN/CULTURE/HEN-BE",
    ].filter((x, i) => x || i === 2 || i === 4).join("\n");
  }
  async function share() {
    const text = shareText();
    try {
      await navigator.clipboard.writeText(text);
      TU.toast(L("Хуулагдлаа", "Copied"));
    } catch (e) {
      if (navigator.share) { try { await navigator.share({ text }); } catch (er) {} }
    }
  }

  // 1080×1920 story image in the style of Таасан уу?'s: black, cross-stitch corners, the GRIT horse
  const CORNER = ["XXXXXXX", "X.X....", "XXX....", "X......", "X......", "X......", "X......"];
  const rot = (p) => p.map((_, y) => [...p[0]].map((_, x) => p[p.length - 1 - y][p[0].length - 1 - x]).join(""));
  function stitches(ctx, pat, x0, y0, cell, color, lw) {
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = "round"; ctx.beginPath();
    pat.forEach((r, y) => [...r].forEach((ch, x) => {
      if (ch !== "X") return;
      const a = x0 + x * cell + cell * 0.2, b = y0 + y * cell + cell * 0.2, e = x0 + x * cell + cell * 0.8, f = y0 + y * cell + cell * 0.8;
      ctx.moveTo(a, b); ctx.lineTo(e, f); ctx.moveTo(e, b); ctx.lineTo(a, f);
    }));
    ctx.stroke(); ctx.restore();
  }
  function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function wrap(ctx, text, maxW) {
    const out = []; let line = "";
    String(text).split(/\s+/).forEach((w) => { const t = line ? line + " " + w : w; if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t; });
    if (line) out.push(line); return out;
  }
  const loadImg = (src) => new Promise((res) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src; });
  async function makeStory() {
    try { await Promise.all([document.fonts.load("800 120px Onest"), document.fonts.load("600 40px Onest"), document.fonts.load("500 40px Onest")]); } catch (e) {}
    const W = 1080, H = 1920, c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d"), ink = "#f4f2ed", dim = "rgba(244,242,237,.55)", F = (w, px) => `${w} ${px}px Onest, Arial, sans-serif`;
    const k = S.guesses.length, won = S.solved;
    ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
    stitches(ctx, CORNER, 70, 70, 22, ink, 4); stitches(ctx, rot(CORNER), W - 70 - 7 * 22, H - 70 - 7 * 22, 22, ink, 4);
    // the GRIT horse and GRIT × Culture
    const horse = document.querySelector("#logo path, .logo path");
    if (horse) { ctx.save(); ctx.translate(W / 2 - 50, 118); ctx.scale(1, 1); ctx.fillStyle = ink; ctx.fill(new Path2D(horse.getAttribute("d")), "evenodd"); ctx.restore(); }
    ctx.font = F(700, 34); ctx.fillStyle = ink; ctx.textAlign = "left";
    const wa = ctx.measureText("GRIT").width, wb = ctx.measureText("Culture").width, gap = 50, sx = W / 2 - (wa + gap + wb) / 2, ty = 282;
    ctx.fillText("GRIT", sx, ty); ctx.fillText("Culture", sx + wa + gap, ty);
    ctx.strokeStyle = ink; ctx.lineWidth = 4.5; ctx.lineCap = "round";
    { const cx = sx + wa + gap / 2, cy = ty - 12; ctx.beginPath(); ctx.moveTo(cx - 10, cy - 10); ctx.lineTo(cx + 10, cy + 10); ctx.moveTo(cx + 10, cy - 10); ctx.lineTo(cx - 10, cy + 10); ctx.stroke(); }
    ctx.textAlign = "center";
    ctx.font = F(800, 116); ctx.save(); ctx.translate(W / 2, 408); if ("letterSpacing" in ctx) ctx.letterSpacing = "-5px"; ctx.fillText("Хэн бэ?", 0, 0); ctx.restore();
    ctx.font = F(500, 36); ctx.fillStyle = dim; ctx.fillText(`№${S.no}, өдрийн түүхэн хүн`, W / 2, 466);

    // result card: the score, what it means, points and rank
    const cardY = 512, cardH = 210;
    ctx.fillStyle = won ? ink : "#161616"; rr(ctx, 110, cardY, W - 220, cardH, 22); ctx.fill();
    const fg = won ? "#000" : ink, fgDim = won ? "rgba(0,0,0,.55)" : dim;
    ctx.textAlign = "left"; ctx.fillStyle = fg; ctx.font = F(800, 150);
    if ("letterSpacing" in ctx) ctx.letterSpacing = "-6px";
    const score = `${won ? k : "X"}/5`; ctx.fillText(score, 160, cardY + 152);
    const sw = ctx.measureText(score).width; if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
    const tx = 160 + sw + 40;
    ctx.font = F(800, 46); ctx.fillText(won ? (k === 1 ? "Эхний сэжүүрээр!" : "Таалаа!") : "Таасангүй", tx, cardY + 92);
    ctx.font = F(500, 32); ctx.fillStyle = fgDim;
    wrap(ctx, won ? `${k} сэжүүр хэрэгтэй байлаа` : "Маргааш дахин оролдоно", W - 160 - tx).slice(0, 2).forEach((l, i) => ctx.fillText(l, tx, cardY + 138 + i * 40));
    // chips: points and rank
    const st = TU.state && TU.state.stats;
    let cx2 = 160; const chipY = cardY + cardH + 28;
    const chip = async (label, icon) => {
      ctx.font = F(700, 30); const w = ctx.measureText(label).width + 48 + (icon ? 44 : 0);
      ctx.save(); ctx.strokeStyle = "rgba(244,242,237,.5)"; ctx.lineWidth = 2.5; ctx.setLineDash([10, 8]); rr(ctx, cx2, chipY, w, 64, 10); ctx.stroke(); ctx.restore();
      if (icon) ctx.drawImage(icon, cx2 + 20, chipY + 14, 36, 36);
      ctx.fillStyle = ink; ctx.textAlign = "left"; ctx.fillText(label, cx2 + 24 + (icon ? 44 : 0), chipY + 43); cx2 += w + 16;
    };
    if (won) await chip(`+${S.points} оноо`);
    if (st && st.rank) {
      const svg = TU.badge(st.lvl || 0, 64).replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
      await chip(st.rank, await loadImg("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg)));
    }
    // total width of the chips, then centre them
    const chipsW = cx2 - 16 - 160;
    if (chipsW > 0) { const img = ctx.getImageData(150, chipY - 4, chipsW + 20, 72); ctx.fillStyle = "#000"; ctx.fillRect(150, chipY - 4, chipsW + 20, 72); ctx.putImageData(img, (W - chipsW) / 2 - 10, chipY - 4); }

    // the five clues: how each was used (no names, no clue text except the first)
    const rx = 110, rw = W - 220, rh = 64, rg = 12, ry = chipY + 98;
    for (let i = 0; i < 5; i++) {
      const y = ry + i * (rh + rg), used = i < k, win = won && i === k - 1, g = S.guesses[i];
      if (win) { ctx.fillStyle = ink; rr(ctx, rx, y, rw, rh, 12); ctx.fill(); }
      else if (used) { ctx.fillStyle = "#161616"; rr(ctx, rx, y, rw, rh, 12); ctx.fill(); }
      else { ctx.save(); ctx.strokeStyle = "rgba(244,242,237,.22)"; ctx.lineWidth = 2.5; ctx.setLineDash([12, 9]); rr(ctx, rx + 1, y + 1, rw - 2, rh - 2, 12); ctx.stroke(); ctx.restore(); }
      ctx.textAlign = "left"; ctx.font = F(600, 30); ctx.fillStyle = win ? "#000" : used ? ink : "rgba(244,242,237,.4)";
      ctx.fillText(`${ORD[i + 1]} сэжүүр`, rx + 34, y + rh / 2 + 10);
      ctx.textAlign = "right";
      if (win) { ctx.font = F(800, 30); ctx.fillStyle = "#000"; ctx.fillText("Таалаа", rx + rw - 30, y + rh / 2 + 10); }
      else if (used) { ctx.font = F(600, 28); ctx.fillStyle = dim; ctx.fillText(g && g.id ? "Буруу" : "Мэдэхгүй", rx + rw - 84, y + rh / 2 + 10); stitches(ctx, ["X"], rx + rw - 66, y + rh / 2 - 18, 36, ink, 4); }
      else { ctx.font = F(500, 26); ctx.fillStyle = "rgba(244,242,237,.35)"; ctx.fillText(won ? "Хэрэггүй" : "", rx + rw - 30, y + rh / 2 + 9); }
    }
    ctx.textAlign = "center";

    // a teaser: today's first clue (everyone sees it when they open the game, so it gives nothing away)
    const qy = ry + 5 * (rh + rg) + 14, first = S.clues && S.clues[0] ? S.clues[0].mn : "";
    if (first) {
      ctx.font = F(500, 32); const lines = wrap(ctx, `“${first}”`, rw - 100).slice(0, 3);
      const qh = 86 + lines.length * 44;
      ctx.fillStyle = "#121212"; rr(ctx, rx, qy, rw, qh, 16); ctx.fill();
      ctx.textAlign = "left"; stitches(ctx, ["X"], rx + 42, qy + 30, 26, ink, 4);
      ctx.font = F(800, 28); ctx.fillStyle = ink; ctx.fillText("Өнөөдрийн эхний сэжүүр", rx + 82, qy + 52);
      ctx.font = F(500, 32); ctx.fillStyle = "rgba(244,242,237,.86)"; lines.forEach((l, i) => ctx.fillText(l, rx + 46, qy + 104 + i * 44));
      ctx.textAlign = "center";
    }
    // call to action
    ctx.fillStyle = ink; ctx.font = F(600, 42); ctx.fillText("Чи хэдэн сэжүүрээр таах вэ?", W / 2, H - 330);
    ctx.font = F(800, 40); const url = "grit.mn/culture/hen-be", uw = ctx.measureText(url).width + 92;
    ctx.fillStyle = ink; rr(ctx, (W - uw) / 2, H - 296, uw, 88, 12); ctx.fill();
    ctx.fillStyle = "#000"; ctx.fillText(url, W / 2, H - 238);
    return c;
  }
  async function story() {
    const c = await makeStory();
    const blob = await new Promise((r) => c.toBlob(r, "image/png"));
    try {
      const file = new File([blob], `hen-be-${S.no}.png`, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file] }); return; }
    } catch (e) { if (e && e.name === "AbortError") return; }
    // no file sharing (most computers): show the picture to save
    let ov = document.getElementById("hbStoryOv");
    if (!ov) {
      ov = document.createElement("div"); ov.className = "overlay"; ov.id = "hbStoryOv";
      ov.innerHTML = `<div class="sheet hb-storysheet"><button class="close" data-close aria-label="${L("Хаах", "Close")}">✕</button>
        <div class="eyebrow">Story</div><h2>${L("Зургаа хадгалаарай", "Save your picture")}</h2>
        <img alt="" style="display:block;width:100%;max-width:300px;margin:0 auto;border-radius:10px">
        <p style="margin-top:12px;text-align:center">${L("Утсан дээр зураг дээр удаан дарж хадгална.", "On a phone, press and hold the picture to save it.")}</p>
        <a class="btn btn--dark" style="margin-top:12px;width:100%;background:#000;color:#f4f2ed;text-decoration:none" download>${L("Татаж авах", "Download")}</a></div>`;
      ov.addEventListener("click", (e) => { if (e.target === ov || e.target.closest("[data-close]")) ov.classList.remove("open"); });
      document.body.append(ov);
    }
    const src = URL.createObjectURL(blob);
    ov.querySelector("img").src = src;
    const a = ov.querySelector("a[download]"); a.href = src; a.download = `hen-be-${S.no}.png`;
    ov.classList.add("open");
  }

  // reload after signing in or out (tu.js), but not right after our own finished game
  window.addEventListener("tu-change", () => { if (!quiet) load(); });
  new MutationObserver(() => S && render()).observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  document.addEventListener("click", (e) => { if (!e.target.closest(".hb__field")) root.querySelectorAll(".hb__sug").forEach((b) => (b.hidden = true)); });
  setInterval(() => { if (S && S.finished) { S.next_in -= 60; const n = root.querySelector(".hb__next"); if (n) n.textContent = `${L("Дараагийн хүн", "Next person")} ${nextIn()}`; if (S.next_in <= 0) load(); } }, 60000);
  load();
})();

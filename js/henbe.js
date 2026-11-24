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
            <button class="btn btn--dark hb__share" type="button">${L("Хуваалцах", "Share")}</button>
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

  async function share() {
    const k = S.guesses.length;
    const line = S.solved ? L(`${ORD[k]} сэжүүрээр таалаа`, `solved on the ${ORD_EN[k]} clue`) : L("энэ удаад таасангүй", "not this time");
    const text = `${L("Хэн бэ?", "Who am I?")} №${S.no}: ${line}. ${L("Та хэд дэх сэжүүрээр таах вэ?", "How many clues will you need?")}`;
    const url = "https://grit.mn/culture/hen-be/";
    try {
      if (navigator.share) { await navigator.share({ text, url }); return; }
      await navigator.clipboard.writeText(text + " " + url);
      TU.toast(L("Хуулагдлаа", "Copied"));
    } catch (e) {}
  }

  // reload after signing in or out (tu.js), but not right after our own finished game
  window.addEventListener("tu-change", () => { if (!quiet) load(); });
  new MutationObserver(() => S && render()).observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  document.addEventListener("click", (e) => { if (!e.target.closest(".hb__field")) root.querySelectorAll(".hb__sug").forEach((b) => (b.hidden = true)); });
  setInterval(() => { if (S && S.finished) { S.next_in -= 60; const n = root.querySelector(".hb__next"); if (n) n.textContent = `${L("Дараагийн хүн", "Next person")} ${nextIn()}`; if (S.next_in <= 0) load(); } }, 60000);
  load();
})();

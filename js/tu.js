// GRIT Culture account, points and leaderboard, shared by /culture/ and the word game.
// The same session token ("tu_token" in localStorage) is used on every GRIT Culture page,
// so signing in once works everywhere on grit.mn.
//   GRIT_TU.award(kind, score, total, ref)  quiz / timeline / book points
//   GRIT_TU.openAccount()                   account sheet
//   GRIT_TU.renderBoard(el, data, opts)     leaderboard markup (used by the game too)
// Set window.TU_NO_AUTO = true before loading to use only the helpers (the game does this).
(function () {
  const API = window.TU_API || { url: "https://wrjgihdvjwriurdiotih.supabase.co", key: "sb_publishable_4SDR_v8yrRdlm0k97LqwaQ_tugAqXPN", google: true };
  const SB_JS = "/js/vendor/supabase-2.45.4.js";
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  };

  // ------------------------------------------------------------ styles (work on light and dark pages)
  if (!document.getElementById("tu-css")) {
    const st = document.createElement("style"); st.id = "tu-css";
    st.textContent = `
.tu-acc{min-width:0;padding:0 14px;font-weight:600}
.tu-acc.is-in{padding:0;width:38px;height:38px;border:0;background:none;border-radius:50%;justify-content:center;overflow:hidden}
.tu-acc.is-in .tu-av{width:38px;height:38px;font-size:16px}.tu-acc.is-in .tu-av--pic{font-size:21px}
.tu-acc.is-in:hover{transform:scale(1.05)}.tu-acc.is-in:focus-visible{outline:2px solid currentColor;outline-offset:2px}
.tu-av{display:inline-grid;place-items:center;width:32px;height:32px;flex:none;border-radius:50%;color:#fff;font-weight:800;font-size:16px;line-height:1}
.tu-toast{position:fixed;left:50%;bottom:28px;z-index:1000;transform:translate(-50%,20px);opacity:0;pointer-events:none;padding:12px 20px;border-radius:999px;background:#111;color:#fff;font-weight:700;font-size:15px;box-shadow:0 10px 30px rgba(0,0,0,.25);transition:opacity .25s,transform .25s}
.tu-toast.is-on{opacity:1;transform:translate(-50%,0)}
.tu-sheet{width:min(460px,calc(100% - 24px));max-height:90vh;margin:auto;padding:0;border:0;border-radius:18px;background:var(--bg,#fff);color:var(--ink,#111);box-shadow:0 30px 80px rgba(0,0,0,.35)}
.tu-sheet::backdrop{background:rgba(0,0,0,.55)}
.tu-sheet__in{position:relative;padding:28px 24px 24px}
.tu-sheet h2{font-family:var(--font-display,inherit);font-size:26px;letter-spacing:-.02em;margin:0 0 10px}
.tu-x{position:absolute;top:16px;right:16px;width:34px;height:34px;border-radius:50%;border:1px solid color-mix(in srgb,currentColor 20%,transparent);background:none;color:inherit;cursor:pointer}
.tu-lead{font-size:15px;line-height:1.55;opacity:.85;margin:0}
.tu-who{margin:14px 0 4px;padding:14px 16px;border-radius:12px;background:color-mix(in srgb,currentColor 6%,transparent);font-size:15px}
.tu-who small{display:block;opacity:.6;margin-top:2px}
.tu-who--row{display:flex;align-items:center;gap:14px}.tu-who--row>div{flex:1;min-width:0}
.tu-edit{height:34px;padding:0 14px;border:1.5px solid color-mix(in srgb,currentColor 25%,transparent);border-radius:999px;background:none;color:inherit;font:600 13px inherit;font-family:inherit;cursor:pointer}
.tu-av--pic{font-size:19px}.tu-av--lg{width:48px;height:48px;font-size:22px}.tu-av--xl{width:84px;height:84px;font-size:42px}
.tu-preview{display:flex;justify-content:center;margin:4px 0 6px}
.tu-pick-l{margin:6px 0 0;font-size:12.5px;font-weight:600;opacity:.85}
.tu-pick{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.tu-pick button{aspect-ratio:1;border:2px solid transparent;border-radius:12px;background:color-mix(in srgb,currentColor 6%,transparent);font-size:24px;cursor:pointer}
.tu-pick button[aria-pressed=true]{border-color:#1cb0f6;background:color-mix(in srgb,#1cb0f6 14%,transparent)}
.tu-pick--c{grid-template-columns:repeat(8,1fr)}.tu-pick--c button{border-radius:50%;border:3px solid transparent}
.tu-pick--c button[aria-pressed=true]{border-color:var(--ink,#111);box-shadow:inset 0 0 0 2px var(--bg,#fff)}
.tu-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0 6px}
.tu-stats div{padding:12px 8px;border-radius:12px;background:color-mix(in srgb,currentColor 6%,transparent);text-align:center}
.tu-stats b{display:block;font-size:18px}.tu-stats .tu-stat-rank{display:flex;flex-direction:column;align-items:center;gap:3px;font-size:13.5px;line-height:1.2}.tu-stats span{font-size:12px;opacity:.65}
.tu-g{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;height:48px;margin-top:16px;border:1.5px solid color-mix(in srgb,currentColor 35%,transparent);border-radius:12px;background:none;color:inherit;font:600 15px inherit;font-family:inherit;cursor:pointer}
.tu-g svg{width:20px;height:20px}
.tu-or{display:flex;align-items:center;gap:12px;margin:16px 0 4px;font-size:12.5px;opacity:.6}
.tu-or::before,.tu-or::after{content:"";flex:1;height:1px;background:currentColor;opacity:.25}
.tu-form{display:grid;gap:10px;margin-top:10px}
.tu-form label{display:grid;gap:5px;font-size:12.5px;font-weight:600;opacity:.85}
.tu-form input{height:46px;padding:0 14px;border:1.5px solid color-mix(in srgb,currentColor 22%,transparent);border-radius:10px;background:transparent;color:inherit;font:600 16px inherit;font-family:inherit}
.tu-row{display:flex;gap:10px}
.tu-btn{flex:1;height:46px;padding:0 16px;border:1.5px solid transparent;border-radius:10px;background:var(--accent,#1f4d2e);color:#fff;font:700 15px inherit;font-family:inherit;cursor:pointer}
.tu-btn--ghost{background:none;color:inherit;border-color:color-mix(in srgb,currentColor 30%,transparent)}
.tu-sheet .tu-btn--ghost[data-tu-out]{width:100%;margin-top:14px}
.tu-btn--wide{display:block;width:100%;margin-top:14px}
.tu-note{margin-top:12px;font-size:12.5px;opacity:.6;line-height:1.5}.tu-note a{color:inherit}
.tu-lb__head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.tu-tabs{display:inline-flex;padding:3px;border-radius:999px;background:color-mix(in srgb,currentColor 7%,transparent)}
.tu-tabs button{height:34px;padding:0 16px;border:0;border-radius:999px;background:none;color:inherit;font:600 14px inherit;font-family:inherit;cursor:pointer;opacity:.7}
.tu-tabs button[aria-selected=true]{background:var(--bg,#fff);opacity:1;box-shadow:0 1px 4px rgba(0,0,0,.12)}
.tu-ends{margin:0;font-weight:700;font-size:14px;color:#e5a000}
.tu-list{list-style:none;margin:0;padding:0}
.tu-list--me{margin-top:8px;padding-top:8px;border-top:1px dashed color-mix(in srgb,currentColor 25%,transparent)}
.tu-r{display:flex;align-items:center;gap:10px;padding:6px 10px;border-radius:10px}
.tu-r + .tu-r{border-top:1px solid color-mix(in srgb,currentColor 8%,transparent)}
.tu-r.is-me{background:color-mix(in srgb,#1cb0f6 14%,transparent);border-top-color:transparent}
.tu-pos{width:28px;flex:none;text-align:center;font-weight:800;font-size:15px;opacity:.75}
.tu-pos--1,.tu-pos--2,.tu-pos--3{display:grid;place-items:center;height:28px;border-radius:50%;color:#fff;opacity:1;font-size:13px}
.tu-pos--1{background:#f4c430}.tu-pos--2{background:#aab4c0}.tu-pos--3{background:#d9915a}
.tu-n{flex:1;min-width:0;display:block}.tu-n b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:15px;max-width:100%}
.tu-n small{display:flex;align-items:center;gap:8px;font-size:12px;opacity:.75;margin-top:1px}
.tu-rank{display:flex;align-items:center;gap:6px;width:150px;flex:none;font-size:12.5px;font-weight:700;white-space:nowrap;color:#6b7480}
@media (max-width:560px){.tu-rank{width:auto}.tu-rank-t{display:none}}
.tu-rank--1{color:#4a8f00}.tu-rank--2{color:#1585bb}.tu-rank--3{color:#9050d6}.tu-rank--4{color:#cf6f00}.tu-rank--5{color:#b88700}
.tu-badge{flex:none;display:block}
.tu-fire{display:inline-flex;align-items:center;gap:3px;color:#e57c00;font-weight:700}.tu-fire svg{width:14px;height:14px}
.tu-xp{min-width:84px;text-align:right;font-weight:800;font-size:15px;white-space:nowrap}
@media (max-width:560px){.tu-xp{min-width:72px}}.tu-xp small{font-weight:600;font-size:12px;opacity:.6}
.tu-empty{padding:18px 4px;opacity:.7}
.tu-more{display:block;width:100%;margin-top:8px;padding:10px;border:0;border-radius:10px;background:color-mix(in srgb,currentColor 6%,transparent);color:inherit;font:600 14px inherit;font-family:inherit;cursor:pointer}
.tu-more:hover{background:color-mix(in srgb,currentColor 10%,transparent)}
`;
    document.head.append(st);
  }
  // Mongolian unless the page is switched to English (pages without the switch follow <html lang>)
  const mn = () => { const d = document.documentElement; return d.hasAttribute("data-lang") ? d.getAttribute("data-lang") === "mn" : !/^en/.test(d.lang || ""); };
  const L = (m, e) => (mn() ? m : e);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const quotes = (v) => typeof v === "string" ? v.replace(/«/g, "“").replace(/»/g, "”") : Array.isArray(v) ? v.map(quotes) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, quotes(x)])) : v;

  const ERR = {
    session: ["Нэвтрэлт дууссан, дахин оролдоно уу", "Your session ended, please try again"],
    handle: ["Нэр 3–20 үсэг эсвэл тооноос бүрдэнэ", "Use 3–20 letters or numbers"],
    taken: ["Энэ нэр бүртгэлтэй байна, өөр нэр сонгоно уу", "That name is taken, please choose another"],
    login: ["Нэр эсвэл PIN буруу байна", "Wrong name or PIN"],
    pin_format: ["PIN нь 4 оронтой тоо байх ёстой", "The PIN must be 4 digits"],
    locked: ["Олон удаа буруу оруулсан тул 15 минут хүлээнэ үү", "Too many tries, please wait 15 minutes"],
    class: ["Ангийн гишүүд ангийн код, нэр, PIN-ээрээ нэвтэрнэ", "Class members sign in with their class code, name and PIN"],
    auth: ["Google-ээр нэвтэрч чадсангүй", "Google sign-in did not work"],
    linked: ["Энэ бүртгэл өөр Google бүртгэлтэй холбогдсон байна", "This account is linked to another Google account"],
    network: ["Сүлжээний алдаа, дахин оролдоно уу", "Network error, please try again"],
    guest: ["Эхлээд нэвтэрнэ үү", "Please sign in first"],
    avatar: ["Энэ дүрсийг сонгох боломжгүй", "That picture is not available"],
  };
  const errMsg = (e) => { const m = ERR[e && e.message] || ERR.network; return L(m[0], m[1]); };

  async function rpc(fn, args = {}, jwt) {
    let r, j;
    try {
      const h = { "Content-Type": "application/json", apikey: API.key };
      if (jwt) h.Authorization = "Bearer " + jwt;
      r = await fetch(API.url.replace(/\/$/, "") + "/rest/v1/rpc/" + fn, { method: "POST", headers: h, body: JSON.stringify(args) });
      j = await r.json().catch(() => null);
    } catch (e) { throw new Error("network"); }
    if (!r.ok) throw new Error((j && j.message) || "network");
    if (j && j.error) throw new Error(j.error);
    return quotes(j);
  }
  let token = store.get("tu_token", null);
  let S = null; // last game state (player, stats)
  const setToken = (t) => { token = t; if (t) store.set("tu_token", t); else store.del("tu_token"); };
  async function ensure() {
    if (token) return token;
    const s = await rpc("tu_start");
    setToken(s.token); S = s; return token;
  }
  async function call(fn, args = {}) {
    await ensure();
    try { return await rpc(fn, { p_token: token, ...args }); }
    catch (e) { if (e.message !== "session") throw e; setToken(null); await ensure(); return rpc(fn, { p_token: token, ...args }); }
  }
  async function refresh() {
    if (!token) { S = null; return null; }
    try { S = await rpc("tu_state", { p_token: token }); }
    catch (e) { if (e.message === "session") { setToken(null); S = null; } }
    return S;
  }

  // ------------------------------------------------------------ small toast
  function toast(msg, ms = 2200) {
    let t = document.getElementById("tu-toast");
    if (!t) { t = document.createElement("div"); t.id = "tu-toast"; t.className = "tu-toast"; t.setAttribute("role", "status"); document.body.append(t); }
    t.textContent = msg; t.classList.add("is-on");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("is-on"), ms);
  }

  // ------------------------------------------------------------ points
  async function award(kind, score, total, ref) {
    try {
      const r = await call("tu_activity", { p_kind: kind, p_score: score, p_total: total, p_ref: ref || null });
      if (S) S.stats = r.stats;
      if (r.awarded > 0) toast(L(`+${r.awarded} оноо`, `+${r.awarded} points`));
      else if ((kind === "quiz" || kind === "timeline") && score > 0) toast(L("Өнөөдөр энэ тоглоомын оноо бүрэн тоологдсон", "Today's points for this game are already counted"), 2600);
      paintButton(); reloadBoards();
      if (!signedIn() && r.awarded > 0 && !store.get("tu_nudged", false)) {
        store.set("tu_nudged", true);
        setTimeout(() => toast(L("Оноогоо хадгалахын тулд нэвтрээрэй", "Sign in to keep your points"), 3000), 2400);
      }
      return r;
    } catch (e) { return null; }
  }

  // ------------------------------------------------------------ account
  const signedIn = () => !!(S && S.player && (S.player.class || S.player.handle || S.player.google));
  const myName = () => (S && S.player ? S.player.handle || S.player.nickname || (S.player.google ? L("Google бүртгэл", "Google account") : "") : "");
  let sb = null;
  function supa() {
    if (sb) return Promise.resolve(sb);
    return new Promise((ok, no) => {
      const sc = document.createElement("script"); sc.src = SB_JS;
      sc.onload = () => { sb = window.supabase.createClient(API.url, API.key, { auth: { flowType: "pkce", detectSessionInUrl: true, persistSession: true, storageKey: "tu_sb" } }); ok(sb); };
      sc.onerror = () => no(new Error("network")); document.head.append(sc);
    });
  }
  async function google() {
    try { const c = await supa(); store.set("tu_google_pending", true);
      await c.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } });
    } catch (e) { toast(errMsg(e), 2600); }
  }
  async function finishGoogle() {
    if (!/[?&]code=/.test(location.search) || !store.get("tu_google_pending", false)) return false;
    store.del("tu_google_pending");
    try {
      const c = await supa(); const { data } = await c.auth.getSession();
      const jwt = data && data.session && data.session.access_token; if (!jwt) throw new Error("auth");
      await ensure();
      const s = await rpc("tu_google", { p_token: token }, jwt);
      if (s.token) setToken(s.token); S = s;
      try { await c.auth.signOut({ scope: "local" }); } catch (e) {}
      history.replaceState(null, "", location.pathname + location.hash);
      toast(L("Google-ээр нэвтэрлээ", "Signed in with Google"));
      if (!S.player.handle && !S.player.class) setTimeout(() => openAccount({ edit: true }), 600); // ask for a leaderboard name
      return true;
    } catch (e) { history.replaceState(null, "", location.pathname + location.hash); toast(errMsg(e), 3000); return false; }
  }

  const G_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9h-4v3.1A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.7V6.6h-4a12 12 0 0 0 0 10.8l4-3z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"/></svg>';
  let dlg = null;
  function sheet() {
    if (dlg) return dlg;
    dlg = document.createElement("dialog"); dlg.className = "tu-sheet"; dlg.innerHTML = '<div class="tu-sheet__in"></div>';
    dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest("[data-tu-close]")) dlg.close(); });
    document.body.append(dlg); return dlg;
  }
  function statsLine() {
    if (!S || !S.stats) return "";
    const st = S.stats;
    return `<div class="tu-stats"><div><b>${st.points}</b><span>${L("Оноо", "Points")}</span></div><div><b class="tu-stat-rank">${badge(st.lvl, 22)}${esc(rankName(st.lvl, st.rank))}</b><span>${L("Цол", "Rank")}</span></div><div><b>${st.streak}</b><span>${L("Дараалсан өдөр", "Day streak")}</span></div></div>`;
  }
  function accountHTML() {
    const p = S && S.player;
    const head = `<button type="button" class="tu-x" data-tu-close aria-label="${L("Хаах", "Close")}">✕</button><h2>${L("Бүртгэл", "Account")}</h2>`;
    if (signedIn()) {
      const needName = p.google && !p.handle && !p.class;
      const who = p.class ? `<b>${esc(p.nickname)}</b>, ${esc(p.school || "")} ${esc(p.class)} ${L("анги", "class")}` : `<b>${esc(myName())}</b>${p.google ? `<small>${L("Google-ээр нэвтэрсэн", "Signed in with Google")}</small>` : ""}`;
      return head + `<p class="tu-lead">${L("Та нэвтэрсэн байна. Оноо тань аль ч төхөөрөмж дээр хадгалагдана.", "You are signed in. Your points are saved on every device.")}</p>
        <div class="tu-who tu-who--row">${av(myName(), p.avatar, "tu-av--lg")}<div>${who}</div><button type="button" class="tu-edit" data-tu-edit>${L("Засах", "Edit")}</button></div>${statsLine()}
        ${needName ? `<form class="tu-form" id="tu-name"><label>${L("Самбарт харагдах нэр (хоч)", "Name shown on the leaderboard")}<input name="handle" maxlength="20" required placeholder="${L("ж: Болд2010", "e.g. Bold2010")}"></label><button class="tu-btn" type="submit">${L("Хадгалах", "Save")}</button></form>` : ""}
        ${API.google && !p.google ? `<button type="button" class="tu-g" data-tu-google>${G_ICON}${L("Google бүртгэлээ холбох", "Link my Google account")}</button>` : ""}
        <button type="button" class="tu-btn tu-btn--ghost" data-tu-out>${L("Энэ төхөөрөмжөөс гарах", "Sign out on this device")}</button>`;
    }
    return head + `<p class="tu-lead">${L("Нэвтэрвэл “Таасан уу?”, түүхийн сорил, он дарааллын тоглоом, зурагт номоос цуглуулсан оноо тань нэг бүртгэлд хадгалагдаж, долоо хоног бүрийн онооны самбарт нэр тань гарна.", "Sign in to keep the points from “Таасан уу?”, the history quiz, the timeline game and the picture books in one account, and to appear on the weekly leaderboard.")}</p>
      ${statsLine()}
      ${API.google ? `<button type="button" class="tu-g" data-tu-google>${G_ICON}${L("Google-ээр нэвтрэх", "Continue with Google")}</button><div class="tu-or">${L("эсвэл нэр, PIN-ээр", "or with a name and PIN")}</div>` : ""}
      <form class="tu-form" id="tu-form" autocomplete="off">
        <label>${L("Нэр (хоч)", "Name")}<input name="handle" maxlength="20" required placeholder="${L("ж: Болд2010", "e.g. Bold2010")}"></label>
        <label>${L("PIN (4 тоо)", "PIN (4 digits)")}<input name="pin" inputmode="numeric" pattern="[0-9]{4}" maxlength="4" required placeholder="••••"></label>
        <div class="tu-row"><button class="tu-btn" type="submit" data-act="login">${L("Нэвтрэх", "Sign in")}</button><button class="tu-btn tu-btn--ghost" type="submit" data-act="register">${L("Бүртгүүлэх", "Create account")}</button></div>
      </form>
      <p class="tu-note">${L("Нэр, PIN-ээр бүртгүүлэхэд имэйл, утасны дугаар авахгүй.", "A name and PIN account needs no email or phone number.")} <a href="/privacy/">${L("Нууцлалын бодлого", "Privacy policy")}</a></p>`;
  }
  function editHTML() {
    const p = S.player, cur = /^([a-z]+)-([0-7])$/.exec(p.avatar || "") || [null, "horse", "0"];
    return `<button type="button" class="tu-x" data-tu-close aria-label="${L("Хаах", "Close")}">✕</button><h2>${L("Нэр, зураг", "Name and picture")}</h2>
      <form class="tu-form" id="tu-prof" autocomplete="off">
        <div class="tu-preview">${av(myName(), cur[1] + "-" + cur[2], "tu-av--xl")}</div>
        ${p.class ? `<p class="tu-note">${L("Ангийн гишүүдийн нэрийг ангийн кодоор нэвтрэхэд ашигладаг тул солих боломжгүй.", "Class members sign in with this name, so it cannot be changed here.")}</p>`
          : `<label>${L("Самбарт харагдах нэр", "Name on the leaderboard")}<input name="handle" maxlength="20" value="${esc(p.handle || "")}" required placeholder="${L("ж: Болд2010", "e.g. Bold2010")}"></label>`}
        <p class="tu-pick-l">${L("Амьтан", "Animal")}</p>
        <div class="tu-pick">${Object.entries(ANIMALS).map(([k, e]) => `<button type="button" data-animal="${k}" aria-pressed="${k === cur[1]}" aria-label="${k}">${e}</button>`).join("")}</div>
        <p class="tu-pick-l">${L("Өнгө", "Colour")}</p>
        <div class="tu-pick tu-pick--c">${PALETTE.map((c, i) => `<button type="button" data-color="${i}" aria-pressed="${String(i) === cur[2]}" style="background:${c}" aria-label="${i + 1}"></button>`).join("")}</div>
        <div class="tu-row"><button class="tu-btn tu-btn--ghost" type="button" data-tu-back>${L("Буцах", "Back")}</button><button class="tu-btn" type="submit">${L("Хадгалах", "Save")}</button></div>
      </form>`;
  }
  function openEdit(box) {
    box.innerHTML = editHTML();
    const f = box.querySelector("#tu-prof"); let a = (/^([a-z]+)-([0-7])$/.exec(S.player.avatar || "") || [null, "horse", "0"]).slice(1);
    const paint = () => {
      f.querySelectorAll("[data-animal]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.animal === a[0])));
      f.querySelectorAll("[data-color]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.color === a[1])));
      f.querySelector(".tu-preview").innerHTML = av(myName(), a[0] + "-" + a[1], "tu-av--xl");
    };
    f.querySelectorAll("[data-animal]").forEach((b) => b.addEventListener("click", () => { a[0] = b.dataset.animal; paint(); }));
    f.querySelectorAll("[data-color]").forEach((b) => b.addEventListener("click", () => { a[1] = b.dataset.color; paint(); }));
    box.querySelector("[data-tu-back]").addEventListener("click", () => openAccount());
    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      const h = f.querySelector("[name=handle]");
      try {
        const s = await call("tu_profile", { p_handle: h ? h.value : null, p_avatar: a[0] + "-" + a[1] });
        S = s; toast(L("Хадгалагдлаа", "Saved")); paintButton(); reloadBoards();
        window.dispatchEvent(new CustomEvent("tu-profile")); openAccount();
      } catch (err) { toast(errMsg(err), 2600); }
    });
  }
  async function openAccount(o = {}) {
    const d = sheet(); const box = d.querySelector(".tu-sheet__in");
    token = store.get("tu_token", token);
    if (token && (!S || o.fresh)) await refresh();
    if (o.edit && signedIn()) { openEdit(box); if (!d.open) d.showModal ? d.showModal() : d.setAttribute("open", ""); return; }
    box.innerHTML = accountHTML();
    if (!d.open) d.showModal ? d.showModal() : d.setAttribute("open", "");
    box.querySelector("[data-tu-google]")?.addEventListener("click", google);
    box.querySelector("[data-tu-edit]")?.addEventListener("click", () => openEdit(box));
    box.querySelector("[data-tu-out]")?.addEventListener("click", async () => {
      if (!confirm(L("Энэ төхөөрөмжөөс гарах уу? Дахин нэвтэрч оноогоо үргэлжлүүлж болно.", "Sign out on this device? You can sign in again later."))) return;
      try { await rpc("tu_logout", { p_token: token }); } catch (e) {}
      setToken(null); S = null; d.close(); paintButton(); reloadBoards();
    });
    const f = box.querySelector("#tu-form");
    if (f) {
      let act = "login";
      f.querySelectorAll("[data-act]").forEach((b) => b.addEventListener("click", () => (act = b.dataset.act)));
      f.addEventListener("submit", async (e) => {
        e.preventDefault(); const fd = new FormData(f);
        try {
          const s = await call(act === "register" ? "tu_register" : "tu_login", { p_handle: fd.get("handle"), p_pin: fd.get("pin") });
          if (s.token) setToken(s.token); S = s;
          toast(act === "register" ? L("Бүртгэл үүслээ", "Account created") : L("Нэвтэрлээ", "Signed in"));
          paintButton(); reloadBoards(); openAccount();
        } catch (err) { toast(errMsg(err), 2600); }
      });
    }
    const nf = box.querySelector("#tu-name");
    if (nf) nf.addEventListener("submit", async (e) => {
      e.preventDefault();
      try { const s = await call("tu_set_name", { p_handle: new FormData(nf).get("handle") }); S = s; toast(L("Нэр хадгалагдлаа", "Name saved")); paintButton(); reloadBoards(); openAccount(); }
      catch (err) { toast(errMsg(err), 2600); }
    });
  }

  // header button: "Sign in" or the player's initial
  function paintButton() {
    document.querySelectorAll("[data-tu-account]").forEach((b) => {
      if (signedIn()) {
        const n = myName() || "?";
        b.innerHTML = av(n, S.player.avatar);
        b.setAttribute("aria-label", L("Бүртгэл", "Account")); b.classList.add("is-in");
      } else { b.textContent = L("Нэвтрэх", "Sign in"); b.setAttribute("aria-label", L("Нэвтрэх", "Sign in")); b.classList.remove("is-in"); }
    });
  }

  // ------------------------------------------------------------ leaderboard
  const PALETTE = ["#ff9600", "#1cb0f6", "#ce82ff", "#ff86d0", "#58cc02", "#ff4b4b", "#2b70c9", "#e5ad41"];
  function color(name) { let h = 0; for (const ch of String(name)) h = (h * 31 + ch.codePointAt(0)) >>> 0; return PALETTE[h % PALETTE.length]; }
  // Animals of the Mongolian steppe; an avatar is "<animal>-<colour index>", e.g. "horse-3".
  const ANIMALS = { horse: "🐎", camel: "🐫", eagle: "🦅", sheep: "🐑", goat: "🐐", ox: "🐂", deer: "🦌", wolf: "🐺", fox: "🦊", leopard: "🐆", bear: "🐻", owl: "🦉" };
  function av(name, avatar, cls = "") {
    const m = /^([a-z]+)-([0-7])$/.exec(avatar || "");
    if (m && ANIMALS[m[1]]) return `<span class="tu-av tu-av--pic ${cls}" style="background:${PALETTE[+m[2]]}">${ANIMALS[m[1]]}</span>`;
    return `<span class="tu-av ${cls}" style="background:${color(name)}">${esc((shownName(name) || "?").trim()[0] || "?").toUpperCase()}</span>`;
  }
  const FLAME = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8.6 1.2c.4 2.1-.6 3.3-1.6 4.3C5.9 6.6 4.6 7.9 4.6 10a3.4 3.4 0 0 0 6.8.1c0-1.5-.7-2.4-1.3-3.2.1 1-.3 1.8-1 2.1.5-2.6-.4-5.6-1.5-7.8z" fill="#ff9600"/><path d="M8 14.2a2 2 0 0 1-2-2c0-1.2.9-1.9 1.6-2.8.3 1 1 1.3 1.5 1.6.5.3.9.7.9 1.3a2 2 0 0 1-2 1.9z" fill="#ffc800"/></svg>';
  // One badge per rank: a hexagon in the rank's colour with its own sign.
  const RANK_COL = ["#8a939e", "#58a700", "#1899d6", "#a560e8", "#e57c00", "#e0a800"];
  const RANK_SIGN = [
    '<path d="M8 16l8-8M12.2 8H16v3.8" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    '<path d="M8 13.6l4-3.2 4 3.2" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    '<path d="M8 11.4l4-3.2 4 3.2M8 15.6l4-3.2 4 3.2" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    '<path d="M8 9.6l4-3 4 3M8 13l4-3 4 3M8 16.4l4-3 4 3" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    '<path d="M12 6.6l1.6 3.4 3.7.4-2.8 2.5.8 3.7L12 14.7l-3.3 1.9.8-3.7-2.8-2.5 3.7-.4z" fill="#fff"/>',
    '<path d="M7 15.5h10l.9-6.3-3.3 2.4L12 7.2l-2.6 4.4-3.3-2.4z" fill="#fff"/><path d="M7.3 17h9.4" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>',
  ];
  // Rank and guest names come from the database in Mongolian; show them in the page language.
  const RANK_EN = ["Soldier", "Leader of Ten", "Leader of a Hundred", "Leader of a Thousand", "Leader of Ten Thousand", "Khan"];
  const rankName = (lvl, name) => (mn() ? name : RANK_EN[Math.max(0, Math.min(5, lvl || 0))] || name);
  const shownName = (n) => (mn() ? n : String(n || "").replace(/^Зочин /, "Guest ").replace(/^Тоглогч /, "Player "));
  function badge(lvl, size = 20) {
    const l = Math.max(0, Math.min(5, lvl || 0)), c = RANK_COL[l];
    return `<svg class="tu-badge" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.6l9.2 5.2v10.4L12 22.4l-9.2-5.2V6.8z" fill="${c}"/><path d="M12 3.4l7.6 4.3v8.6L12 20.6l-7.6-4.3V7.7z" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1"/>${RANK_SIGN[l]}</svg>`;
  }
  function endsIn(sec) {
    if (sec == null) return "";
    const d = Math.floor(sec / 86400), h = Math.floor((sec % 86400) / 3600);
    return d >= 1 ? L(`${d} өдөр`, `${d} day${d > 1 ? "s" : ""}`) : L(`${h} цаг`, `${h} h`);
  }
  function rowHTML(r) {
    const medal = r.pos <= 3 ? `<span class="tu-pos tu-pos--${r.pos}">${r.pos}</span>` : `<span class="tu-pos">${r.pos}</span>`;
    const sub = [r.class ? esc(r.class) + " " + L("анги", "class") : "", r.streak >= 2 ? `<span class="tu-fire">${FLAME}${L(`${r.streak} өдөр`, `${r.streak} days`)}</span>` : ""].filter(Boolean).join(" ");
    return `<li class="tu-r${r.me ? " is-me" : ""}">${medal}${av(r.name, r.avatar)}
      <span class="tu-n"><b>${esc(shownName(r.name))}</b>${sub ? `<small>${sub}</small>` : ""}</span>
      <span class="tu-rank tu-rank--${Math.min(5, r.lvl || 0)}" title="${esc(rankName(r.lvl, r.rank))}">${badge(r.lvl, 20)}<span class="tu-rank-t">${esc(rankName(r.lvl, r.rank))}</span></span><span class="tu-xp">${r.xp} <small>${L("оноо", "pts")}</small></span></li>`;
  }
  function renderBoard(el, data, opts = {}) {
    if (!data) { el.innerHTML = `<p class="tu-empty">${L("Ачаалж байна…", "Loading…")}</p>`; return; }
    const all = data.rows || [];
    const limit = opts.limit || 5, open = !!el._open;
    const rows = open ? all : all.slice(0, limit);
    const inTop = rows.some((r) => r.me);
    const meRow = !inTop ? all.find((r) => r.me) || data.me : null;
    const scope = data.scope;
    el.innerHTML = `<div class="tu-lb">
      <div class="tu-lb__head"><div class="tu-tabs" role="tablist">
        <button type="button" role="tab" data-scope="week" aria-selected="${scope === "week"}">${L("Энэ долоо хоног", "This week")}</button>
        <button type="button" role="tab" data-scope="season" aria-selected="${scope === "season"}">${L("Улирал", "Season")}</button></div>
        ${scope === "week" ? `<p class="tu-ends">${L("Дуусахад", "Ends in")} ${endsIn(data.ends_in)}</p>` : `<p class="tu-ends">${esc(data.season || "")}</p>`}</div>
      ${rows.length ? `<ol class="tu-list">${rows.map(rowHTML).join("")}</ol>` : `<p class="tu-empty">${L("Энэ долоо хоногт одоохондоо оноо авсан хүн алга. Анхных нь болоорой!", "Nobody has scored this week yet. Be the first!")}</p>`}
      ${meRow ? `<ol class="tu-list tu-list--me">${rowHTML(meRow)}</ol>` : ""}
      ${all.length > limit ? `<button type="button" class="tu-more" data-tu-more>${open ? L("Хураах", "Show less") : L(`Бүгдийг харах (${all.length})`, `Show all (${all.length})`)}</button>` : ""}
      ${opts.cta !== false && !signedIn() ? `<button type="button" class="tu-btn tu-btn--wide" data-tu-signin>${L("Нэвтэрч самбарт гарах", "Sign in to join the leaderboard")}</button>` : ""}
    </div>`;
    el.querySelectorAll("[data-scope]").forEach((b) => b.addEventListener("click", () => { el._open = false; loadBoard(el, b.dataset.scope, opts); }));
    el.querySelector("[data-tu-more]")?.addEventListener("click", () => { el._open = !open; renderBoard(el, data, opts); });
    el.querySelector("[data-tu-signin]")?.addEventListener("click", () => (opts.onSignin ? opts.onSignin() : openAccount()));
  }
  async function loadBoard(el, scope = "week", opts = {}) {
    el.dataset.scope = scope;
    token = store.get("tu_token", token); // the word game may have signed in meanwhile
    try { renderBoard(el, await rpc("tu_leaderboard", { p_token: token, p_scope: scope }), opts); }
    catch (e) { el.innerHTML = `<p class="tu-empty">${errMsg(e)}</p>`; }
  }
  function reloadBoards() { document.querySelectorAll("[data-tu-board]").forEach((el) => loadBoard(el, el.dataset.scope || "week")); }

  window.GRIT_TU = { badge, award, openAccount, renderBoard, loadBoard, rpc, call, refresh, toast, get token() { return token; }, set token(t) { setToken(t); }, get state() { return S; } };

  if (window.TU_NO_AUTO) return;
  // ------------------------------------------------------------ page wiring
  document.querySelectorAll(".header-actions").forEach((h) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "pill-btn tu-acc"; b.setAttribute("data-tu-account", "");
    h.insertBefore(b, h.querySelector(".header-cta"));
    b.addEventListener("click", openAccount);
  });
  (async () => {
    await finishGoogle();
    await refresh();
    paintButton(); reloadBoards();
  })();
  // re-render texts after the language switch
  document.addEventListener("click", (e) => { if (e.target.closest(".lang-toggle")) setTimeout(() => { paintButton(); reloadBoards(); }, 50); });
})();

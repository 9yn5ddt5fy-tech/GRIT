// GRIT EDU: “Гадаадад суралцах зам”, a grade-by-grade checklist for studying abroad.
// Ticks are saved with the GRIT session (js/tu.js): guests keep them on this device's
// session, and they move into the account when the student signs in.
(function () {
  const TU = window.GRIT_TU;
  const STAGES = [
    { id: "g9", grade: 9, title: "9-р анги: суурь тавих", sub: "Англи хэл, дүн, унших дадал", items: [
      ["g9-english", "Англи хэлээ өдөр бүр", "Өдөрт дор хаяж 20 минут англиар уншиж, сонсоорой. Бага ч гэсэн өдөр бүр хийх нь хамгийн чухал.", ["/edu/english/", "Өдрийн англи үг тоглох"]],
      ["g9-grades", "Дүнгээ анхаар", "Гадаадын их сургуулиуд 9–12-р ангийн бүх дүнг (GPA) хардаг. Одооноос сайн сурах нь хамгийн том бэлтгэл."],
      ["g9-read", "Ном унших дадал", "Сард дор хаяж нэг ном уншаарай. Уншсан номоо тэмдэглэж аваарай: эссэ, ярилцлагад хэрэг болно."],
      ["g9-interest", "Сонирхлоо ол", "Дугуйлан, клуб, олимпиад, спорт, урлагаас хамгийн дуртайгаа сонгоод тогтмол хичээллээрэй."],
    ] },
    { id: "g10", grade: 10, title: "10-р анги: өөрийгөө нээх", sub: "Үйл ажиллагаа, судалгаа", items: [
      ["g10-activity", "Үйл ажиллагаа эхлүүл", "Клубт удирдах үүрэг ав, сайн дурын ажил хий, эсвэл өөрийн жижиг төсөл эхлүүл. Өргөдөлд ихэвчлэн 10 хүртэлх үйл ажиллагааг бичдэг."],
      ["g10-log", "Амжилтаа нэг дор цуглуул", "Шагнал, батламж, гэрчилгээ, хийсэн ажлынхаа зураг, огноог нэг хавтсанд хадгалаарай."],
      ["g10-tests", "Англи хэлний шалгалтуудтай танилц", "IELTS, TOEFL iBT, Duolingo English Test-ийн ялгааг судал. Ихэнх сургууль эдгээрийн аль нэгийг хүлээн авдаг.", ["https://englishtest.duolingo.com/", "Duolingo English Test"]],
      ["g10-countries", "Улс, тэтгэлгээ харьцуул", "АНУ, Япон, Солонгос, Унгар, Турк зэрэг улсад тэтгэлгийн систем өөр өөр. Аль нь танд тохирохыг харьцуулж эхлээрэй."],
      ["g10-summer", "Зуны хөтөлбөрт хамрагд", "Зуны сургалт, олимпиад, онлайн курс таны мэдлэг, үйл ажиллагааг баяжуулна.", ["/edu.html", "GRIT EDU хөтөлбөр"]],
    ] },
    { id: "g11", grade: 11, title: "11-р анги: шалгалт ба сонголт", sub: "Шалгалт, сургуулийн жагсаалт", items: [
      ["g11-test", "Англи хэлний шалгалт өг", "Ихэнх их сургууль IELTS 6.0–7.0 буюу түүнтэй дүйцэх оноо шаарддаг. Дахин өгөх хугацаа үлдээхийн тулд 11-р ангидаа өгөөрэй.", ["https://ielts.org/", "IELTS"]],
      ["g11-sat", "SAT хэрэгтэй эсэхийг шалга", "Олон сургууль SAT-ыг заавал шаардахаа больсон ч зарим нь шаарддаг. Зорьж буй сургуулийнхаа шаардлагыг шалгаарай."],
      ["g11-list", "Сургуулийн жагсаалт гарга", "10–15 сургууль сонгоод хэцүү (reach), тохирох (match), найдвартай (safety) гэж ангил."],
      ["g11-aid", "Тэтгэлгийн нөхцөлийг шалга", "Сургууль бүр гадаад оюутанд санхүүгийн тусламж өгдөг эсэх, “need-blind” эсвэл “need-aware” эсэхийг шалгаарай."],
      ["g11-recs", "Зөвлөмж бичих багшаа сонго", "Таныг сайн мэддэг 2 багшийг сонгоод, урьдчилан ярилцаарай. Сайн зөвлөмж бичихэд хугацаа хэрэгтэй."],
      ["g11-essay", "Эссэний санаагаа цуглуул", "Таныг өөрчилсөн, сургамж өгсөн жижиг түүхүүдээ тэмдэглэж эхлээрэй."],
    ] },
    { id: "g12", grade: 12, title: "12-р анги: өргөдлийн жил", sub: "Эссэ, өргөдөл, хугацаа", items: [
      ["g12-commonapp", "Common App бүртгэл үүсгэ", "АНУ-ын олон сургууль Common App-аар өргөдөл авдаг. Шинэ жилийн өргөдөл 8-р сарын 1-нд нээгддэг.", ["https://www.commonapp.org/", "Common App"]],
      ["g12-essay", "Хувийн эссэгээ бич", "650 хүртэлх үгтэй хувийн эссэ (Personal Essay). Хэд хэдэн удаа засаж, багшдаа уншуулаарай."],
      ["g12-early", "Early хугацаагаа шийд", "Early Decision, Early Action ихэвчлэн 11-р сарын 1 эсвэл 15-нд хаагддаг. Early Decision-д тэнцвэл тэр сургуульд заавал очих үүрэгтэй."],
      ["g12-regular", "Regular хугацаанд өргөдлөө илгээ", "Ихэнх сургуулийн Regular Decision хугацаа 1-р сарын 1–15-ны хооронд байдаг."],
      ["g12-finaid", "Санхүүгийн маягтаа бөглө", "Сургуулиас хамаарч CSS Profile эсвэл ISFAA зэрэг маягт, гэр бүлийн орлогын баримт шаардана."],
      ["g12-gov", "Засгийн газрын тэтгэлгүүдийг бүү мартаарай", "Япон (MEXT), Солонгос (GKS), Турк (Türkiye Bursları), Унгар (Stipendium Hungaricum) зэрэг тэтгэлгийн хугацаа өөр. Албан сайтаас нь шалгаарай.", ["https://stipendiumhungaricum.hu/", "Stipendium Hungaricum"]],
      ["g12-interview", "Ярилцлагад бэлд", "Зарим сургууль онлайн ярилцлага хийдэг. Өөрийгөө, зорилгоо англиар 2 минутад танилцуулж сураарай."],
    ] },
    { id: "after", grade: 13, title: "Тэнцсэний дараа", sub: "Сонголт, виз, бэлтгэл", items: [
      ["after-compare", "Санал болгосон тэтгэлгээ харьцуул", "Сургалтын төлбөр, байр, хоол, нислэгийн зардлыг бүгдийг тооцоод шийдээрэй. АНУ-ын сургуулиуд ихэвчлэн 5-р сарын 1 хүртэл хариу хүлээдэг."],
      ["after-visa", "Оюутны виз мэдүүл", "Сургуулиас ирэх бичиг баримтаар (АНУ-д I-20) оюутны виз мэдүүлж, элчин сайдын яамны ярилцлагад цаг авна."],
      ["after-prepare", "Явахаасаа өмнө бэлд", "Паспорт, эрүүл мэндийн үзлэг, вакцин, банкны карт, улирлын хувцасаа бэлдээрэй."],
      ["after-giveback", "Дүү нартаа туслаарай", "Туршлагаа сумынхаа дүү нартай хуваалцаарай. GRIT EDU-д сайн дурын ментор болж болно."],
    ] },
  ];
  const ALL = STAGES.flatMap((s) => s.items.map((i) => i[0]));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = { get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  let done = new Set(store.get("rm_done", []));
  let grade = store.get("rm_grade", 9);

  const stagesEl = document.getElementById("rmStages");
  function paint() {
    const pct = Math.round((done.size / ALL.length) * 100);
    document.getElementById("rmBar").style.width = pct + "%";
    document.getElementById("rmPct").textContent = `${done.size}/${ALL.length} алхам`;
    document.getElementById("rmGrades").innerHTML = [9, 10, 11, 12].map((g) => `<button type="button" data-g="${g}" aria-pressed="${g === grade}">Би ${g}-р ангид</button>`).join("");
    stagesEl.innerHTML = STAGES.map((s, n) => {
      const c = s.items.filter((i) => done.has(i[0])).length, all = s.items.length;
      return `<details class="rm-stage${c === all ? " is-done" : ""}"${s.grade === grade ? " open" : ""}>
        <summary><span class="rm-num">${c === all ? "✓" : n + 1}</span><span class="rm-sum"><h3>${esc(s.title)}</h3><small>${esc(s.sub)}</small></span><span class="rm-count">${c}/${all}</span>
          <svg class="rm-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></summary>
        <ul class="rm-items">${s.items.map(([id, t, d, link]) => `<li class="rm-item${done.has(id) ? " is-done" : ""}">
          <input type="checkbox" id="rm-${id}" data-id="${id}"${done.has(id) ? " checked" : ""}>
          <label for="rm-${id}"><b>${esc(t)}</b><p>${esc(d)}${link ? ` <a href="${link[0]}"${/^https?:/.test(link[0]) ? ' target="_blank" rel="noopener"' : ""}>${esc(link[1])} →</a>` : ""}</p></label></li>`).join("")}</ul>
      </details>`;
    }).join("");
    const save = document.getElementById("rmSave");
    if (TU && TU.signedIn && TU.signedIn()) save.textContent = "Таны ахиц бүртгэлд тань хадгалагдаж байна.";
    else save.innerHTML = `Ахиц тань энэ төхөөрөмж дээр хадгалагдана. <button type="button" id="rmLogin">Нэвтэрвэл</button> аль ч утаснаас үргэлжлүүлнэ.`;
    const lb = document.getElementById("rmLogin"); if (lb) lb.onclick = () => TU.openAccount();
  }
  stagesEl.addEventListener("change", async (e) => {
    const cb = e.target.closest("input[data-id]"); if (!cb) return;
    const id = cb.dataset.id, on = cb.checked;
    on ? done.add(id) : done.delete(id); store.set("rm_done", [...done]);
    const openIds = [...stagesEl.querySelectorAll("details[open]")].map((d) => [...stagesEl.children].indexOf(d));
    paint(); openIds.forEach((i) => stagesEl.children[i] && (stagesEl.children[i].open = true));
    if (!TU) return;
    try { const list = await TU.call("edu_mark", { p_item: id, p_done: on }); done = new Set(list); store.set("rm_done", list); } catch (err) {}
  });
  document.getElementById("rmGrades").addEventListener("click", (e) => {
    const b = e.target.closest("[data-g]"); if (!b) return;
    grade = +b.dataset.g; store.set("rm_grade", grade); paint();
  });
  async function sync() {
    if (!TU || !TU.token) return paint();
    try {
      const list = await TU.rpc("edu_progress", { p_token: TU.token });
      // ticks made before the session existed are sent up once
      const local = [...done].filter((id) => !list.includes(id));
      for (const id of local) { try { await TU.call("edu_mark", { p_item: id, p_done: true }); } catch (e) {} }
      done = new Set([...list, ...local]); store.set("rm_done", [...done]);
    } catch (e) {}
    paint();
  }
  window.addEventListener("tu-change", sync);
  paint(); sync();
})();

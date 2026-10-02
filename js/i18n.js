// English / Mongolian switch and night mode.
// The pages are written in English. MN holds the Mongolian text for each
// English string; the switch swaps text nodes and a few attributes in place.
// To translate new text, add "English text": "Монгол текст" below.
const MN = {
  // Navigation, buttons, footer
  "Home": "Нүүр",
  "Where we work": "Бидний ажилладаг газар",
  "Success": "Амжилт",
  "Team": "Баг",
  "Coming soon": "Тун удахгүй",
  "Contact": "Холбоо барих",
  "Our projects": "Бидний төслүүд",
  "Read more": "Дэлгэрэнгүй",
  "More photos": "Бусад зураг",
  "Photos": "Зургууд",
  "Photo album": "Фото цомог",
  "13 photos": "13 зураг",
  "10 photos": "10 зураг",
  "© 2026 GRIT · Grow. Reach. Inspire. Teach.": "© 2026 GRIT · Grow. Reach. Inspire. Teach.",

  // Home: hero, statement, numbers
  "Opening the world to students from rural Mongolia.": "Орон нутгийн сурагчдад дэлхийн боломжийн үүдийг нээнэ.",
  "Why we exist": "Бидний зорилго",
  "We work in the soums of central Mongolia, where the nearest university is": "Бид Монголын төв бүсийн сумдад ажилладаг. Тэндээс хамгийн ойрын их сургууль",
  "a day's drive away": "бүтэн өдрийн замд оршдог",
  "and scholarship information rarely reaches students.": "бөгөөд тэтгэлгийн мэдээлэл сурагчдад төдийлөн хүрдэггүй.",
  "Students": "Сурагч",
  "Weeks on the ground": "Долоо хоног орон нутагт",
  "Teachers and volunteers": "Багш, сайн дурынхан",
  "Distance we travel": "Бидний туулдаг зам",

  // Home: where we work
  "UGIINUUR SOUM": "ӨГИЙНУУР СУМ",
  "KHARKHORIN SOUM": "ХАРХОРИН СУМ",
  "KHUJIRT SOUM": "ХУЖИРТ СУМ",
  "ARVAIKHEER SOUM": "АРВАЙХЭЭР",
  "We started in the community our founder grew up in, and we are expanding outward.":
    "Бид үүсгэн байгуулагчийнхаа өссөн нутгаас эхэлсэн бөгөөд цааш тэлж байна.",
  "Ugiinuur, Arkhangai": "Өгийнуур, Архангай",
  "Completed": "Хэрэгжсэн",
  "First program, 2025 · 20 students, four weeks, a team of seven.": "Анхны хөтөлбөр, 2025 · 20 сурагч, 4 долоо хоног, 7 хүний баг.",
  "Kharkhorin, Uvurkhangai": "Хархорин, Өвөрхангай",
  "In preparation": "Бэлтгэл үе шатанд",
  "Second program, 2027 · A 21-day residential summer camp for 30 students from Arvaikheer, Kharkhorin and Khujirt.":
    "Хоёр дахь хөтөлбөр, 2027 · Арвайхээр, Хархорин, Хужиртын 30 сурагчид зориулсан 21 хоногийн зуны лагерь.",

  // Home: projects
  "Projects": "Төслүүд",
  "Scholarships and learning for rural students.": "Орон нутгийн сурагчдад тэтгэлэг, боловсролын боломж.",
  "Protecting Ugii Lake and the steppe.": "Өгий нуур, тал хээрээ хамгаалъя.",

  // Home: student success
  "Student success": "Сурагчдын амжилт",
  "T. Khongorzul": "Т. Хонгорзул",
  "I. Zultsetseg": "И. Зулцэцэг",
  "G. Uugantsetseg": "Г. Ууганцэцэг",
  "N. Purevdulam": "Н. Пүрэвдулам",
  "100% scholarship": "100% тэтгэлэг",
  "50% scholarship": "50% тэтгэлэг",
  "Presidential scholarship": "Ерөнхийлөгчийн тэтгэлэг",
  "Tongmyong University": "Тонмён их сургууль",
  "“Ilgeelt 2100” program": "“Илгээлт 2100” хөтөлбөр",

  // Home: podcast, speakers, team
  "Podcast": "Подкаст",
  "A day at GRIT EDU": "GRIT EDU-гийн нэг өдөр",
  "How we spent a day in Ugiinuur": "Өгийнуурт өнгөрүүлсэн нэгэн өдөр",
  "Speakers": "Илтгэгчид",
  "Speaker name": "Илтгэгчийн нэр",
  "Title, organization": "Албан тушаал, байгууллага",
  "Meet the members of our team.": "Манай багийн гишүүдтэй танилцаарай.",
  "Bayarmagnai Usukhgerel": "Ө. Баярмагнай",
  "M. Namuunbayar": "М. Намуунбаяр",
  "B. Anar": "Б. Анар",
  "B. Munkhdalai": "Б. Мөнхдалай",
  "O. Enkhgerel": "О. Энхгэрэл",
  "B. Tulga": "Б. Тулга",
  "G. Batzorigt": "Г. Батзориг",
  "B. Nomin": "Б. Номин",
  "J. Namuun": "Ж. Намуун",
  "Founder of GRIT": "GRIT-ийн үүсгэн байгуулагч",
  "Graphic Designer, GRIT EDU program": "График дизайнер, GRIT EDU хөтөлбөр",
  "Teacher, GRIT EDU program": "Багш, GRIT EDU хөтөлбөр",
  "Manager, GRIT EDU program": "Менежер, GRIT EDU хөтөлбөр",

  // Contact
  "Have a question, want to volunteer, or support our work? Write to us — we would love to hear from you.":
    "Асуух зүйл байна уу, сайн дурын ажилтнаар ажиллах эсвэл бидний үйл ажиллагааг дэмжихийг хүсэж байна уу? Бидэнд бичээрэй — тантай холбогдоход таатай байх болно.",
  "Email": "Имэйл",
  "Phone": "Утас",
  "Name *": "Нэр *",
  "Email *": "Имэйл *",
  "Message *": "Зурвас *",
  "Your name": "Таны нэр",
  "Tell us about yourself…": "Өөрийнхөө тухай бичээрэй…",
  "Send message": "Зурвас илгээх",

  // EDU page
  "GRIT project": "GRIT төсөл",
  "Our first program": "Анхны хөтөлбөр",
  "In June 2025, GRIT EDU ran its first education program in Ugiinuur soum, Arkhangai province. One year later we surveyed the graduates to measure its results and its long-term impact.":
    "2025 оны 6-р сард GRIT EDU Архангай аймгийн Өгийнуур суманд анхны боловсролын хөтөлбөрөө хэрэгжүүлсэн. Нэг жилийн дараа төгсөгчдөөс судалгаа авч, үр дүн болон урт хугацааны нөлөөг нь хэмжлээ.",
  "This page shares the key findings, the students' own feedback, and the evidence behind our next step — expanding to a summer camp in Kharkhorin.":
    "Энэ хуудсанд гол үр дүн, сурагчдын өөрсдийн санал, мөн дараагийн алхам болох Хархорин дахь зуны лагерийн үндэслэлийг хүргэж байна.",
  "Students took part": "Сурагч хамрагдсан",
  "Would recommend it to a friend": "Найздаа санал болгоно",
  "Will join the next camp": "Дараагийн зусланд оролцоно",
  "Use English daily or several times a week": "Англи хэлийг өдөр бүр эсвэл долоо хоногт хэд хэдэн удаа хэрэглэдэг",
  "Enrolled in extra English classes": "Англи хэлний нэмэлт сургалтад хамрагдсан",
  "Started researching scholarships and universities abroad": "Гадаадын тэтгэлэг, их сургуулийн талаар судалж эхэлсэн",
  "The program didn't only raise students' English level — it changed their plans for the future, their self-confidence and their understanding of international education.":
    "Хөтөлбөр сурагчдын англи хэлний түвшинг дээшлүүлээд зогсохгүй, ирээдүйн төлөвлөгөө, өөртөө итгэх итгэл, олон улсын боловсролын тухай ойлголтыг нь өөрчилсөн.",
  "At a glance": "Товч танилцуулга",
  "Location": "Байршил",
  "Ugiinuur school, Ugiinuur soum, Arkhangai": "Өгийнуур сумын ЕБС, Архангай аймаг",
  "Dates": "Хугацаа",
  "June 2025 · 4 weeks": "2025 оны 6-р сар · 4 долоо хоног",
  "Format": "Хэлбэр",
  "Learning centre · day program": "Сургалтын төв · өдрийн хөтөлбөр",
  "20 · grades 7–11": "20 · 7–11-р анги",
  "Focus": "Гол чиглэл",
  "English (grammar, speaking, listening, reading, writing) · University applications · Advice from students studying abroad · Cognitive and teamwork workshops · Games and competitions · Information on 28 countries":
    "Англи хэл (дүрэм, ярих, сонсох, унших, бичих) · Их сургуульд өргөдөл гаргах · Гадаадад суралцаж буй оюутнуудын зөвлөгөө · Сэтгэн бодох чадвар, багаар ажиллах семинар · Тоглоом, тэмцээн · 28 улсын мэдээлэл",
  "7 people": "7 хүн",
  "Sponsors & partners": "Ивээн тэтгэгч, хамтрагч",
  "Stoic · Absolute School of English": "Stoic · Absolute School of English",
  "The team": "Баг",
  "A core team of seven ran the program: students and graduates studying abroad, a cook, a designer and a manager. With limited resources they covered everything from lessons and meals to content and safety.":
    "Хөтөлбөрийг долоон хүний үндсэн баг хэрэгжүүлсэн. Тэдний дунд гадаадад суралцаж буй оюутан, төгсөгчид, тогооч, дизайнер, менежер бий. Хязгаарлагдмал нөөцтэй ч хичээл, хоолноос эхлээд контент, аюулгүй байдал хүртэл бүгдийг хариуцан ажилласан.",
  "Name": "Нэр",
  "Role": "Үүрэг",
  "Responsible for": "Хариуцсан ажил",
  "Founder of GRIT, program lead": "GRIT-ийн үүсгэн байгуулагч, хөтөлбөрийн удирдагч",
  "Finance, organization, university application classes": "Санхүү, зохион байгуулалт, их сургуульд өргөдөл гаргах хичээл",
  "English teacher": "Англи хэлний багш",
  "English, cooking": "Англи хэл, хоол хүнс",
  "Teacher": "Багш",
  "University applications, country information": "Их сургуульд өргөдөл гаргах, улс орнуудын мэдээлэл",
  "English, country information": "Англи хэл, улс орнуудын мэдээлэл",
  "Program manager": "Хөтөлбөрийн менежер",
  "Organization, country information": "Зохион байгуулалт, улс орнуудын мэдээлэл",
  "Designer": "Дизайнер",
  "Content": "Контент",
  "What students learned": "Сурагчид юу сурсан бэ",
  "Over four weeks, students joined five tracks of lessons and activities every day.": "Дөрвөн долоо хоногийн турш сурагчид өдөр бүр таван чиглэлийн хичээл, үйл ажиллагаанд хамрагдсан.",
  "Speech series": "Илтгэлийн цуврал",
  "15+ talks by students and graduates studying abroad — Harvard, Yonsei, Vanderbilt, universities in Japan and Taiwan, the National University of Mongolia and more.":
    "Гадаадад суралцаж буй оюутан, төгсөгчдийн 15 гаруй илтгэл — Харвард, Ёнсэй, Вандербилт, Япон, Тайваний их сургуулиуд, МУИС болон бусад.",
  "English grammar": "Англи хэлний дүрэм",
  "Workshops": "Семинар",
  "University applications": "Их сургуульд өргөдөл гаргах",
  "Studying abroad": "Гадаадад суралцах",
  "Universities and scholarships in 24 countries, including the Netherlands, Taiwan, Korea, Japan, Hong Kong, Singapore, Poland, Czechia, Canada, Turkey, China, Malaysia and the USA.":
    "Нидерланд, Тайвань, Солонгос, Япон, Хонконг, Сингапур, Польш, Чех, Канад, Турк, Хятад, Малайз, АНУ зэрэг 24 орны их сургууль, тэтгэлгийн мэдээлэл.",
  "Impact, one year later": "Нэг жилийн дараах үр нөлөө",
  "In April 2026 we ran an online survey of the graduates: 16 of 20 students responded (an 80% response rate). The 16 questions covered their English level before and after, lesson quality, the concrete steps they have taken since, and how their plans for the future have changed. Because it was taken about a year after the program, it shows long-term impact.":
    "2026 оны 4-р сард төгсөгчдөөс цахим судалгаа авахад 20 сурагчаас 16 нь хариулсан (хариултын хувь 80%). Судалгааны 16 асуулт англи хэлний өмнөх болон одоогийн түвшин, хичээлийн чанар, хөтөлбөрөөс хойш хийсэн бодит алхам, ирээдүйн төлөвлөгөөний өөрчлөлтийг хамарсан. Судалгааг хөтөлбөрөөс бараг нэг жилийн дараа авсан тул урт хугацааны үр нөлөөг харуулж байна.",
  "Changed “a lot” since the program": "Хөтөлбөрийн дараа “эрс өөрчлөгдсөн” зүйлс",
  "Respondents who answered “changed a lot”": "“Эрс өөрчлөгдсөн” гэж хариулсан хүний тоо",
  "Interest in studying abroad": "Гадаадад суралцах сонирхол",
  "Confidence speaking English": "Англиар ярих итгэл",
  "Understanding of a future career": "Ирээдүйн мэргэжлийн тухай ойлголт",
  "Confidence to express themselves": "Өөрийгөө илэрхийлэх итгэл",
  "English skills that improved": "Сайжирсан англи хэлний ур чадвар",
  "Respondents who marked each skill (multiple choice)": "Ур чадвар тус бүрийг сонгосон хүний тоо (олон сонголттой)",
  "Grammar": "Дүрэм",
  "Reading": "Унших",
  "Listening": "Сонсох",
  "Writing": "Бичих",
  "Speaking": "Ярих",
  "English level before the program": "Хөтөлбөрөөс өмнөх англи хэлний түвшин",
  "Self-assessed": "Өөрийн үнэлгээгээр",
  "Beginner — letters, simple words": "Анхан — үсэг, энгийн үг",
  "Elementary — understood simple sentences": "Бага — энгийн өгүүлбэр ойлгодог",
  "Intermediate — understood simple conversation": "Дунд — энгийн яриа ойлгодог",
  "94% started at beginner or elementary level — the program truly reached beginners.": "94% нь анхан болон бага түвшнээс эхэлсэн — хөтөлбөр үнэхээр эхлэн суралцагчдад хүрсэн.",
  "Lessons rated “very helpful”": "“Маш хэрэгтэй” гэж үнэлсэн хичээл",
  "Each activity rated from 1 to 5": "Үйл ажиллагаа бүрийг 1-5 оноогоор үнэлсэн",
  "Cognitive and teamwork workshops": "Сэтгэн бодох чадвар, багаар ажиллах семинар",
  "University admissions information": "Их сургуулийн элсэлтийн мэдээлэл",
  "Advice from students studying abroad": "Гадаадад суралцаж буй оюутнуудын зөвлөгөө",
  "English lessons": "Англи хэлний хичээл",
  "Games and competitions": "Тоглоом, тэмцээн",
  "Teaching methods": "Заах арга зүй",
  "How clearly teachers explained": "Багш нар хэр ойлгомжтой тайлбарласан бэ",
  "Very good — everyone understood": "Маш сайн — бүгд ойлгосон",
  "Mostly good": "Ихэнхдээ сайн",
  "Average": "Дунд зэрэг",
  "No graduate rated the teaching negatively. Asked “What was missing?”, most answered “nothing”.":
    "Нэг ч төгсөгч заах аргыг сөрөг үнэлээгүй. “Юу дутуу байсан бэ?” гэхэд ихэнх нь “юу ч үгүй” гэж хариулсан.",
  "Respondents by grade": "Оролцогчид ангиар",
  "Grade in April 2026": "2026 оны 4-р сарын байдлаар",
  "Grade 9": "9-р анги",
  "Grade 10": "10-р анги",
  "Grade 11": "11-р анги",
  "Grade 12": "12-р анги",
  "In students' words": "Сурагчдын сэтгэгдэл",
  "All 16 graduates — 100% — said they would recommend GRIT EDU to their friends, younger siblings and people they know. Nobody said they wouldn't, and nobody was unsure. These quotes come from the survey's open questions, in full or in part.":
    "16 төгсөгч бүгд буюу 100% нь GRIT EDU-г найз, дүү, танилдаа санал болгоно гэсэн. Санал болгохгүй эсвэл эргэлзэж буй хүн нэг ч байгаагүй. Доорх сэтгэгдлүүдийг судалгааны нээлттэй асуултаас бүтнээр эсвэл хэсэгчлэн авсан.",
  "“Before, I didn't know it was possible to study abroad on a scholarship — I thought it was out of reach. Now I know so much more and understand that it's possible, so I want to study at a university abroad.”":
    "“Өмнө нь тэтгэлгээр гадаадад сурах боломжтой гэдгийг мэддэггүй, хүрэхгүй зүйл гэж боддог байсан. Одоо маш их зүйлийг мэдэж, боломжтой гэдгийг ойлгосон тул гадаадын их сургуульд сурахыг хүсэж байна.”",
  "— O. Khaliunaa · Grade 10": "— О. Халиунаа · 10-р анги",
  "“I was able to answer so many of my questions. I wanted to study abroad but didn't know where to start — what to do, whether I needed a gap year or had to finish school first. My English improved a lot too. I met so many amazing older students, connected with them and got inspiration from them.”":
    "“Олон асуултдаа хариулт авч чадсан. Гадаадад сурахыг хүсдэг ч хаанаас эхлэхээ, юу хийх, gap year авах уу эсвэл сургуулиа төгсөх үү гэдгээ мэддэггүй байсан. Англи хэл маань ч их сайжирсан. Олон гайхалтай ах эгч нартай танилцаж, холбоо тогтоож, тэднээс урам зориг авсан.”",
  "— T. Khongorzul · Grade 12": "— Т. Хонгорзул · 12-р анги",
  "“I now imagine my future on a much bigger scale.”": "“Одоо ирээдүйгээ хамаагүй том хэмжээнд төсөөлдөг болсон.”",
  "— Ganchimeg · Grade 10": "— Ганчимэг · 10-р анги",
  "“Thank you to all the teachers. You were amazing — please come back to our soum and run this program again.”":
    "“Бүх багш нартаа баярлалаа. Та нар гайхалтай байсан — манай суманд дахиад ирж энэ хөтөлбөрийг зохион байгуулаарай.”",
  "— O. Nomin-Erdene · Grade 9": "— О. Номин-Эрдэнэ · 9-р анги",
  "“I really loved the GRIT EDU program and our teachers. I hope it grows even bigger so that many, many more children can take part.”":
    "“GRIT EDU хөтөлбөр болон багш нараа үнэхээр их хайрласан. Улам томорч, илүү олон хүүхэд хамрагдаасай гэж хүсэж байна.”",
  "“If I could, I'd skip the university entrance exam just to join the program again.”": "“Боломжтой бол ЭЕШ-ээ ч өгөхгүйгээр хөтөлбөрт дахин хамрагдмаар байна.”",
  "“I now have real, active goals in life.”": "“Одоо амьдралд бодит, идэвхтэй зорилготой болсон.”",
  "— Naransolonsho · Grade 9": "— Нарансолонго · 9-р анги",
  "Challenges and lessons": "Бэрхшээл ба сургамж",
  "What we heard": "Сурагчдын санал",
  "Transport and timing": "Тээвэр, цагийн хуваарь",
  "A few students found getting there inconvenient or difficult.": "Цөөн сурагчид ирж очих нь тохиромжгүй, хүндрэлтэй байсан.",
  "Clarity of speech": "Ярианы тодорхой байдал",
  "One student felt some teachers “could have spoken a bit more clearly”.": "Нэг сурагч зарим багш “арай илүү ойлгомжтой ярьж болох байсан” гэсэн.",
  "Missed lessons": "Тасалсан хичээл",
  "One student mentioned they “couldn't attend every lesson”.": "Нэг сурагч “бүх хичээлд суух боломжгүй байсан” гэж дурдсан.",
  "Games vs. learning": "Тоглоом ба хичээл",
  "One student suggested there should be “fewer games”.": "Нэг сурагч “тоглоом арай цөөн байх” санал өгсөн.",
  "What we'll do in 2027": "2027 онд хэрэгжүүлэх өөрчлөлт",
  "Move to a residential camp (overnight, 21 days) to remove transport problems completely.": "Тээврийн асуудлыг бүрэн шийдэхийн тулд хоноглох хэлбэрийн 21 хоногийн лагерь болгоно.",
  "Make communication skills — speaking clearly and understandably — a key criterion when selecting teachers.": "Багш сонгохдоо тод, ойлгомжтой ярих харилцааны ур чадварыг гол шалгуур болгоно.",
  "Set the lesson-to-game ratio at 70:30, with games built around the lesson goals.": "Хичээл, тоглоомын харьцааг 70:30 болгож, тоглоомыг хичээлийн зорилготой уялдуулна.",
  "Few students were at intermediate level, so we recommend A2+ as a selection criterion in 2027.": "Дунд түвшний сурагч цөөн байсан тул 2027 онд A2+ түвшнийг сонгон шалгаруулалтын шалгуур болгохыг зөвлөж байна.",
  "The one-year follow-up survey proved very valuable, so the 2027 program will have the same follow-up system.": "Нэг жилийн дараах судалгаа маш үр өгөөжтэй байсан тул 2027 оны хөтөлбөрт мөн адил тогтолцоо байна.",
  "Next step — Kharkhorin 2027": "Дараагийн алхам — Хархорин 2027",
  "The first program in Ugiinuur laid the foundation of the GRIT EDU model. In 2027 we move to a deeper, more sustainable format in Kharkhorin soum, Uvurkhangai province.":
    "Өгийнуур дахь анхны хөтөлбөр GRIT EDU загварын суурийг тавьсан. 2027 онд Өвөрхангай аймгийн Хархорин суманд илүү гүнзгий, тогтвортой хэлбэрээр үргэлжилнэ.",
  "2025 · Ugiinuur": "2025 · Өгийнуур",
  "Learning centre": "Сургалтын төв",
  "20 students · 4 weeks · day program": "20 сурагч · 4 долоо хоног · өдрийн хөтөлбөр",
  "2027 · Kharkhorin": "2027 · Хархорин",
  "Summer camp": "Зуны лагерь",
  "30 students · 21 days · full board": "30 сурагч · 21 хоног · хоол, байр бүрэн",
  "Next": "Дараагийн шат",
  "2028+ · Expansion": "2028+ · Өргөжилт",
  "Nationwide": "Улсын хэмжээнд",
  "5+ provinces · 200+ students · a sustainable model": "5+ аймаг · 200+ сурагч · тогтвортой загвар",
  "Planned": "Төлөвлөж буй",
  "Thank you": "Талархал",
  "Main sponsor": "Ерөнхий ивээн тэтгэгч",
  "STOIC Ivekh Erdene LLC": "СТОИК Ивээх Эрдэнэ ХХК",
  "Advice, strategic support, funding": "Зөвлөгөө, стратегийн дэмжлэг, санхүүжилт",
  "English teaching rights, funding": "Англи хэл заах эрх, санхүүжилт",
  "We sincerely thank everyone who helped make the first program in Ugiinuur happen: the Ugiinuur soum Governor's Office, the school's leadership, parents and guardians, the students and graduates studying abroad, and our speakers.":
    "Өгийнуур дахь анхны хөтөлбөрийг бүтээхэд тусалсан Өгийнуур сумын Засаг даргын Тамгын газар, сургуулийн удирдлага, эцэг эх, асран хамгаалагчид, гадаадад суралцаж буй оюутан, төгсөгчид болон илтгэгчиддээ чин сэтгэлээсээ талархаж байна.",
  "Most of all, thank you to the team members and teachers who made this program real, and to the 20 students who took part with all their heart and shared their honest feedback. Your words and your progress are the strongest foundation for making the next program even better.":
    "Хамгийн гол нь энэ хөтөлбөрийг бодит болгосон багийн гишүүд, багш нар болон бүх сэтгэлээ зориулан оролцож, чин сэтгэлийн сэтгэгдлээ хуваалцсан 20 сурагчдаа баярлалаа. Та нарын үг, ахиц дэвшил бол дараагийн хөтөлбөрийг илүү сайн болгох хамгийн бат суурь юм.",
  "Bayarmagnai Usukhgerel · Founder of GRIT, GRIT EDU program lead": "Ө. Баярмагнай · GRIT-ийг үүсгэн байгуулагч, GRIT EDU хөтөлбөрийн удирдагч",
  "Report published April 2026 · 16 graduates responded · 80% response rate (of 20)": "Тайлан 2026 оны 4-р сард · 16 төгсөгч хариулсан · хариултын хувь 80% (20-оос)",
  "Full report": "Тайлан бүтнээрээ",
  "GRIT EDU Arkhangai · Results report · 15 pages": "GRIT EDU Архангай · Үр дүнгийн тайлан · 15 хуудас",
  "← Prev": "← Өмнөх",
  "Next →": "Дараах →",
  "Full screen": "Бүтэн дэлгэц",
  "Download PDF": "PDF татах",
  "The report is in Mongolian. Click a page corner, use the arrows, or swipe to turn pages.": "Хуудасны булан дээр дарах, сум ашиглах эсвэл шудрах замаар хуудсыг эргүүлнэ.",

  // Research page
  "Research": "Судалгаа",
  "Library": "Номын сан",
  "Research & articles": "Судалгаа, нийтлэл",
  "Our research, reports and plans — what we learn from our work in rural Mongolia.": "Бидний судалгаа, тайлан, төлөвлөгөө — хөдөө орон нутагт ажилласан туршлагаас сурсан зүйлс.",
  "Report": "Тайлан",
  "Plan": "Төлөвлөгөө",
  "Read": "Унших",
  "New research paper": "Шинэ судалгааны ажил",
  "Research by the founder of GRIT is being finalised and will be published here soon.": "GRIT-ийг үүсгэн байгуулагчийн судалгааны ажил эцэслэгдэж байгаа бөгөөд удахгүй энд нийтлэгдэнэ.",
  "Bayarmagnai Usukhgerel · 2026": "Ө. Баярмагнай · 2026",
  "GRIT EDU Arkhangai: Results report": "GRIT EDU Архангай: Үр дүнгийн тайлан",
  "One year after the 2025 Ugiinuur program: survey of 16 graduates on English level, study plans and long-term impact.": "2025 оны Өгийнуурын хөтөлбөрөөс нэг жилийн дараа: 16 төгсөгчийн англи хэл, суралцах төлөвлөгөө, урт хугацааны нөлөөний судалгаа.",
  "GRIT EDU · April 2026 · 15 pages": "GRIT EDU · 2026 оны 4-р сар · 15 хуудас",
  "GRIT EDU Uvurkhangai: Program plan": "GRIT EDU Өвөрхангай: Хөтөлбөрийн төлөвлөгөө",
  "The full plan for the 21-day summer camp for 30 students in Kharkhorin.": "Хархорин дахь 30 сурагчийн 21 хоногийн зуны лагерийн бүрэн төлөвлөгөө.",
  "GRIT EDU · 22 pages": "GRIT EDU · 22 хуудас",

  // Plan page
  "GRIT EDU Kharkhorin": "GRIT EDU Хархорин",
  "The full plan for our next program: a 21-day summer camp for 30 students in Kharkhorin, Uvurkhangai.": "Дараагийн хөтөлбөрийн бүрэн төлөвлөгөө: Өвөрхангай аймгийн Хархорин суманд 30 сурагчийн 21 хоногийн зуны лагерь.",
  "Program plan": "Хөтөлбөрийн төлөвлөгөө",
  "GRIT EDU Uvurkhangai · Program plan · 22 pages": "GRIT EDU Өвөрхангай · Хөтөлбөрийн төлөвлөгөө · 22 хуудас",

  // Environment page
  "A community recycling program on the shore of Ugii Lake.": "Өгий нуурын эрэг дээрх олон нийтийн дахин боловсруулалтын хөтөлбөр.",
  "Why Ugii Lake": "Яагаад Өгий нуур вэ",
  "Ugii Lake in Arkhangai is one of Mongolia's protected freshwater lakes and a major summer tourism destination. Every summer, camps and resorts along its shore welcome visitors — and with them comes waste that has nowhere to go.":
    "Архангай аймгийн Өгий нуур нь Монгол Улсын тусгай хамгаалалттай цэнгэг усны нууруудын нэг бөгөөд зуны аялал жуулчлалын томоохон төв юм. Зун бүр эргийн дагуух жуулчны бааз, амралтын газрууд олон зочин хүлээн авдаг ч тэдэнтэй хамт хаях газаргүй хог хаягдал ч ирдэг.",
  "GRIT Environment was founded to change that. We set up a community recycling program on the shore of the lake, working together with the local government, tourist camps and the school in Ugiinuur soum.":
    "GRIT Environment үүнийг өөрчлөх зорилгоор байгуулагдсан. Бид Өгийнуур сумын Засаг даргын Тамгын газар, жуулчны баазууд, сургуультай хамтран нуурын эрэг дээр олон нийтийн оролцоотой дахин боловсруулалтын хөтөлбөр хэрэгжүүлсэн.",
  "The first season": "Эхний улирал",
  "Raised in project funding": "Төслийн санхүүжилт татсан",
  "Tourist camps and resorts in a shared collection system": "Жуулчны бааз, амралтын газар нэгдсэн цуглуулалтын системд нэгдсэн",
  "Aluminium cans and plastic bottles collected and processed": "Хөнгөн цагаан лааз, хуванцар сав цуглуулж боловсруулсан",
  "Students trained in recycling and waste sorting": "Сурагч дахин боловсруулалт, хог ангиллын сургалтад хамрагдсан",
  "People on the project team": "Хүний бүрэлдэхүүнтэй төслийн баг",
  "Hydraulic baling machine bought and run by the project": "Төслийн хүрээнд худалдан авч ашигласан гидравлик шахагч",
  "From the shore to recycling": "Эргээс дахин боловсруулалт хүртэл",
  "How a can left at a tourist camp ends up back in use.": "Жуулчны баазад үлдсэн лааз хэрхэн дахин ашиглагддаг вэ.",
  "Collect": "Цуглуулах",
  "Waste is gathered from the lake shore and the tourist camps and loaded for transport.": "Нуурын эрэг болон жуулчны баазуудаас хог цуглуулж, тээвэрлэхээр ачина.",
  "Sort": "Ангилах",
  "Aluminium cans and plastic bottles are separated from other waste and bagged.": "Хөнгөн цагаан лааз, хуванцар савыг бусад хогноос ялгаж шуудайлна.",
  "Bale": "Шахах",
  "Our hydraulic baling machine presses them into compact, transport-ready bales.": "Гидравлик шахагчаар тээвэрлэхэд бэлэн, нягт боодол болгон шахна.",
  "Recycle": "Дахин боловсруулах",
  "The bales are delivered to recycling facilities instead of ending up in the steppe.": "Боодлуудыг тал нутагт хаягдуулахын оронд дахин боловсруулах үйлдвэрт хүргэнэ.",
  "What we did": "Бидний хийсэн ажил",
  "Partnership": "Түншлэл",
  "We built a partnership with the Soum Governor's Office and brought 17 tourist camps and resorts around the lake into one shared collection system.":
    "Сумын Засаг даргын Тамгын газартай түншлэл тогтоож, нуурын орчмын 17 жуулчны бааз, амралтын газрыг нэгдсэн цуглуулалтын системд хамруулсан.",
  "Collection and processing": "Цуглуулалт, боловсруулалт",
  "We bought and operated a hydraulic baling machine and, over one season, collected and processed more than 300 kg of aluminium cans and plastic bottles.":
    "Гидравлик шахагч худалдан авч ажиллуулан, нэг улиралд 300 гаруй кг хөнгөн цагаан лааз, хуванцар сав цуглуулж боловсруулсан.",
  "Education": "Сургалт",
  "We ran recycling and waste-sorting workshops for 118 students at the local school and for staff at the Soum Governor's Office.":
    "Сумын сургуулийн 118 сурагч болон Засаг даргын Тамгын газрын ажилтнуудад дахин боловсруулалт, хог ангиллын сургалт хийсэн.",
  "A system that lasts": "Тогтвортой систем",
  "We installed sorting bins at the school and the student dormitory, so recycling continues after the project period ends.":
    "Төсөл дууссаны дараа ч дахин боловсруулалт үргэлжлэхээр сургууль болон дотуур байранд ангилах хогийн сав байршуулсан.",
  "Results report": "Үр дүнгийн тайлан",
  "The full report is on its way": "Бүрэн тайлан удахгүй гарна",
  "We are preparing a detailed report on the results of the project. It will be published here soon.": "Төслийн үр дүнгийн дэлгэрэнгүй тайланг бэлтгэж байна. Удахгүй энд нийтлэгдэнэ.",

  // Member page (some text comes from js/team.js)
  "GRIT team · GRIT EDU program": "GRIT баг · GRIT EDU хөтөлбөр",
  "Biography": "Намтар",
  "Biography coming soon.": "Намтар удахгүй нэмэгдэнэ.",
  "At GRIT": "GRIT-д",
  "← Back to the team": "← Баг руу буцах",
  "Program": "Хөтөлбөр",
  "GRIT EDU program": "GRIT EDU хөтөлбөр",
  "Graphic Designer": "График дизайнер",
  "English Teacher": "Англи хэлний багш",
  "Program Manager": "Хөтөлбөрийн менежер",
  "Design and content": "Дизайн, контент",
  "Teaching": "Хичээл заах",
  "Program lead: finance, organization, university application classes": "Хөтөлбөрийн удирдагч: санхүү, зохион байгуулалт, их сургуулийн өргөдлийн хичээл",

  // Added: home refresh, speakers, quotes, EDU details, footer
  "12 photos": "12 зураг",
  "© GRIT · Licensed under": "© GRIT · Лицензийн нөхцөл:",
  "© 2026 GRIT · Grow. Reach. Inspire. Teach. · Photos © GRIT, all rights reserved · Reports": "© 2026 GRIT · Grow. Reach. Inspire. Teach. · Зургийн бүх эрх GRIT-д хамаарна · Тайлан",
  "© 2026 GRIT · Grow. Reach. Inspire. Teach. · Photos © GRIT, all rights reserved (cover photo: Ariungoo / Unsplash) · Reports": "© 2026 GRIT · Grow. Reach. Inspire. Teach. · Зургийн бүх эрх GRIT-д хамаарна (нүүр зураг: Ariungoo / Unsplash) · Тайлан",
  "· Code": "· Код",
  "— share unchanged with credit, non-commercial use only.": "— эх сурвалжийг дурдаж, өөрчлөлтгүйгээр, зөвхөн ашгийн бус зорилгоор түгээж болно.",
  "GRIT EDU · For educational equality": "GRIT EDU · Боловсролын тэгш боломжийн төлөө",
  "Follow": "Дагах",
  "GRIT EDU · Rural Mongolia": "GRIT EDU · Монголын орон нутаг",
  "Words that inspire us": "Урам өгөх үгс",
  "“Education is the most powerful weapon which you can use to change the world.”": "“Боловсрол бол дэлхийг өөрчлөхөд ашиглаж болох хамгийн хүчирхэг зэвсэг юм.”",
  "Nelson Mandela": "Нельсон Мандела",
  "“One child, one teacher, one book, one pen can change the world.”": "“Нэг хүүхэд, нэг багш, нэг ном, нэг үзэг дэлхийг өөрчилж чадна.”",
  "Malala Yousafzai": "Малала Юсафзай",
  "“Enthusiasm is common. Endurance is rare.”": "“Урам зориг түгээмэл. Тэсвэр тэвчээр ховор.”",
  "Angela Duckworth,": "Анжела Дакворт,",
  "“What you do makes a difference, and you have to decide what kind of difference you want to make.”": "“Таны хийж буй зүйл өөрчлөлт авчирдаг. Ямар өөрчлөлт авчрахаа та өөрөө шийднэ.”",
  "Jane Goodall": "Жейн Гудолл",
  "“If I have seen further, it is by standing on the shoulders of giants.”": "“Хэрэв би бусдаас илүү холыг харсан бол аваргуудын мөрөн дээр зогссоных юм.”",
  "Isaac Newton": "Исаак Ньютон",
  "Our programs": "Бидний хөтөлбөрүүд",
  "Podcast #02": "Подкаст #02",
  "Podcast #03": "Подкаст #03",
  "Urangoo Shinedelger": "Ш. Урангоо",
  "Garid Mendbayar": "М. Гарид",
  "Bayarmaa Altankhishig": "А. Баярмаа",
  "Anar Battogtokh": "Б. Анар",
  "Tsolmon Baasantsogt": "Б. Цолмон",
  "Tulga Bayarnyam": "Б. Тулга",
  "Anu Otgonjargal": "О. Ану",
  "Foreign Affairs Manager, Absolute School of English": "Absolute School of English, гадаад харилцааны менежер",
  "Stanford University, Class of 2028": "Стэнфордын их сургууль, 2028 онд төгсөнө",
  "Vanderbilt University, Class of 2027": "Вандербилтийн их сургууль, 2027 онд төгсөнө",
  "Bocconi University, Class of 2023": "Бокконигийн их сургууль, 2023 оны төгсөгч",
  "Cornell University, Class of 2029": "Корнеллийн их сургууль, 2029 онд төгсөнө",
  "Yonsei University, Class of 2027": "Ёнсэй их сургууль, 2027 онд төгсөнө",
  "Sungkyunkwan University, Class of 2030": "Сонгюнгван их сургууль, 2030 онд төгсөнө",
  "Scholarships & certificates": "Тэтгэлэг ба гэрчилгээ",
  "Full English course scholarships from Absolute School of English": "Absolute School of English-ээс англи хэлний сургалтын бүрэн тэтгэлэг",
  "Our partner Absolute School of English awards three GRIT EDU students a 100% scholarship to continue studying English at its centre. The scholarships go to the students who showed the most effort and progress during the program.": "Манай хамтрагч Absolute School of English сургалтын төв GRIT EDU-гийн гурван сурагчид англи хэлээ үргэлжлүүлэн суралцах 100%-ийн тэтгэлэг олгож байна. Тэтгэлгийг хөтөлбөрийн хугацаанд хамгийн их хичээл зүтгэл гаргаж, ахиц гаргасан сурагчдад олгоно.",
  "Every student who completed the program received a GRIT EDU certificate of completion.": "Хөтөлбөрийг амжилттай дүүргэсэн сурагч бүр GRIT EDU-гийн төгсөлтийн гэрчилгээ гардаж авсан.",
  "See the program plan": "Хөтөлбөрийн төлөвлөгөө үзэх",
  "Nouns · Articles (a/an/the) · Pronouns · Plural forms · Verb “to be” · Present simple / continuous · Past simple / continuous · Future tenses · Present perfect · Adjectives vs adverbs · Comparisons · Modal verbs · Infinitive vs gerund · Quantifiers · Prepositions": "Нэр үг · Артикль (a/an/the) · Төлөөний үг · Олон тоо · “to be” үйл үг · Одоо цагийн энгийн ба үргэлжилсэн хэлбэр · Өнгөрсөн цагийн энгийн ба үргэлжилсэн хэлбэр · Ирээдүй цаг · Present perfect · Тэмдэг нэр ба дайвар үг · Харьцуулах зэрэг · Модаль үйл үг · Infinitive ба gerund · Тоо хэмжээ заах үг · Угтвар үг",
  "Mission, vision & values · MBTI test · Story chain · Silent line-up · “If I were a…” · Oobleck · CV builder · Ecosystem workshop · Managing productivity · Self-talk management · Quizzes and competitions": "Эрхэм зорилго, алсын хараа, үнэт зүйл · MBTI тест · Түүхийн гинж · Чимээгүй эгнээ · “Хэрэв би … байсан бол” · Oobleck туршилт · CV бэлтгэх · Экосистемийн семинар · Бүтээмжээ удирдах · Өөртэйгөө эерэгээр ярих · Асуулт хариулт, тэмцээн",
  "Application process · Application platforms · Activities list · Common essay mistakes · Early decision vs early action vs regular · Demonstrating interest · Recommendation letters · College resume · Student loans · Financial aid · Final checklist · Personal statement structure · How admissions officers read applications · Finding and applying for scholarships": "Өргөдөл гаргах үйл явц · Өргөдлийн платформууд · Үйл ажиллагааны жагсаалт · Эссэд гаргадаг нийтлэг алдаа · Early decision, early action, regular-ийн ялгаа · Сонирхлоо илэрхийлэх · Зөвлөмж захидал · Коллежийн CV · Оюутны зээл · Санхүүгийн дэмжлэг · Эцсийн шалгах жагсаалт · Personal statement-ийн бүтэц · Элсэлтийн ажилтнууд өргөдлийг хэрхэн уншдаг вэ · Тэтгэлэг хайж, хүсэлт гаргах",
  "300+ kg": "300+ кг",
  "30M ₮": "30 сая ₮",
};

// Attribute translations (placeholders, button labels).
const MN_ATTR = {
  "Open menu": "Цэс нээх",
  "Night mode": "Шөнийн горим",
  "Day mode": "Өдрийн горим",
  "Previous page": "Өмнөх хуудас",
  "Next page": "Дараах хуудас",
  "Close": "Хаах",
  "Previous photo": "Өмнөх зураг",
  "Next photo": "Дараах зураг",
  "GRIT home": "GRIT нүүр хуудас",
  "GRIT on Instagram": "GRIT Instagram-д",
  "GRIT in numbers": "GRIT тоогоор",
  "Quotes that inspire us": "Урам өгөх ишлэлүүд",
  "Quote 1": "Ишлэл 1",
  "Quote 2": "Ишлэл 2",
  "Quote 3": "Ишлэл 3",
  "Quote 4": "Ишлэл 4",
  "Map of Mongolia showing Ugiinuur, Kharkhorin, Khujirt and Arvaikheer soums": "Өгийнуур, Хархорин, Хужирт, Арвайхээрийг харуулсан Монголын газрын зураг",
  "Program photos": "Хөтөлбөрийн зургууд",
  "Open photo": "Зураг нээх",
  "Scroll left": "Зүүн тийш гүйлгэх",
  "Scroll right": "Баруун тийш гүйлгэх",
};

// Set to false to hide the МН/EN button.
const MN_ENABLED = true;

(function () {
  const root = document.documentElement;
  const EN = {};
  Object.entries(MN).forEach(([en, mn]) => (EN[mn] = en));
  const ALL_MN = { ...MN, ...MN_ATTR };
  const ALL_EN = {};
  Object.entries(ALL_MN).forEach(([en, mn]) => (ALL_EN[mn] = en));

  function translateText(lang) {
    const map = lang === "mn" ? MN : EN;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) =>
        n.parentElement && !n.parentElement.closest("script, style") && n.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const raw = node.nodeValue;
      const key = raw.replace(/\s+/g, " ").trim();
      const next = map[key];
      if (next === undefined) return;
      const lead = raw.match(/^\s*/)[0];
      const trail = raw.match(/\s*$/)[0];
      node.nodeValue = lead + next + trail;
    });
    // Attributes: keep the English original so switching back is exact.
    document.querySelectorAll("[placeholder], [aria-label], [alt]").forEach((el) => {
      ["placeholder", "aria-label"].forEach((attr) => {
        const v = el.getAttribute(attr);
        if (!v) return;
        const store = "data-en-" + attr;
        if (lang === "mn") {
          const en = el.getAttribute(store) || v;
          let mn = ALL_MN[en];
          if (mn === undefined && en.startsWith("Open photo")) mn = ALL_MN["Open photo"];
          if (mn === undefined) return;
          el.setAttribute(store, en);
          el.setAttribute(attr, mn);
        } else if (el.hasAttribute(store)) {
          el.setAttribute(attr, el.getAttribute(store));
        } else if (ALL_EN[v] !== undefined) {
          el.setAttribute(attr, ALL_EN[v]);
        }
      });
    });
  }

  function setLang(lang, save) {
    if (lang === "mn") root.setAttribute("data-lang", "mn");
    else root.removeAttribute("data-lang");
    root.lang = lang === "mn" ? "mn" : "en";
    translateText(lang);
    document.querySelectorAll(".lang-toggle").forEach((btn) => {
      btn.textContent = lang === "mn" ? "EN" : "МН";
      btn.setAttribute("aria-label", lang === "mn" ? "Switch to English" : "Монгол хэл рүү шилжих");
    });
    if (save) {
      try {
        localStorage.setItem("grit-lang", lang);
      } catch (e) {}
    }
  }

  function setTheme(theme, save) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    const mn = root.getAttribute("data-lang") === "mn";
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      const label = theme === "dark" ? "Day mode" : "Night mode";
      btn.setAttribute("aria-label", mn ? MN_ATTR[label] : label);
    });
    if (save) {
      try {
        localStorage.setItem("grit-theme", theme);
      } catch (e) {}
    }
  }

  // Text added later by other scripts (marquee copies, counters) is translated
  // on the next switch; translate once more after everything has loaded.
  window.GRIT_I18N = { apply: () => translateText(root.getAttribute("data-lang") === "mn" ? "mn" : "en") };

  document.querySelectorAll(".lang-toggle").forEach((btn) =>
    btn.addEventListener("click", () => setLang(root.getAttribute("data-lang") === "mn" ? "en" : "mn", true))
  );
  document.querySelectorAll(".theme-toggle").forEach((btn) =>
    btn.addEventListener("click", () => setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true))
  );

  setTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light", false);
  if (MN_ENABLED) setLang(root.getAttribute("data-lang") === "mn" ? "mn" : "en", false);
  window.addEventListener("load", () => window.GRIT_I18N.apply());
})();

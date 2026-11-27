// GRIT Heritage: picture-book stories and history games.
// All text is stored in both languages ({ en, mn }) and re-rendered when the
// МН/EN button is pressed. To add a story, copy one object in STORIES; each
// page names a scene from js/heritage-art.js. To add a quiz question, add an
// object to QUIZ (the first option in `a` is shown in random order; `ok` is
// the index of the right answer). Timeline events go in EVENTS.

// ---------------------------------------------------------------- stories
const STORIES = [
  {
    id: "es",
    kind: "tradition",
    place: { en: "All of Mongolia, 22 Dec–12 Mar", mn: "Монгол даяар, 12.22–3.12" },
    title: { en: "The Nine Nines of Winter", mn: "Өвлийн есөн ес" },
    blurb: {
      en: "Why do herders say that vodka freezes, ox horns crack and hilltops turn brown? The 81 days of winter, counted in nines.",
      mn: "Архи хөлдөнө, үхрийн эвэр хагарна, довын толгой борлоно гэж малчид яагаад хэлдэг вэ? Өвлийн 81 хоногийг есөөр тоолох уламжлал.",
    },
    cover: "es-solstice",
    pages: [
      {
        scene: "es-solstice",
        en: "The longest night of the year is the winter solstice, on 22 December. From that day, Mongolians count the coldest part of winter in nine blocks of nine days — the “nine nines”. The count lasts 81 days and ends in mid-March, and each nine has its own saying.",
        mn: "Жилийн хамгийн урт шөнө бол 12 дугаар сарын 22-нд тохиодог өвлийн туйл юм. Энэ өдрөөс эхлэн монголчууд өвлийн хамгийн хүйтэн үеийг есөн хоногоор есөн удаа тоолдог. Үүнийг “есөн ес” гэнэ. Нийт 81 хоног үргэлжилж, 3 дугаар сарын дундуур дуусна. Ес бүр өөрийн гэсэн хэллэгтэй.",
      },
      {
        scene: "es-vodka",
        en: "First nine: “milk vodka freezes.” Second nine: “twice-distilled vodka freezes.” The cold grows stronger, until even vodka distilled from milk, and then the stronger twice-distilled kind, freeze outdoors. Herders insulate their gers and keep the animals in their pens at night.",
        mn: "Нэг ес: нэрмэл архи хөлдөнө. Хоёр ес: хорз архи хөлдөнө. Хүйтэн улам чангарч, сүүнээс нэрсэн архи ч, түүнийг дахин нэрсэн хүчтэй хорз ч гадаа хөлдөнө. Малчид гэрээ дулаалж, малаа хашаандаа хоноглуулна.",
      },
      {
        scene: "es-horns",
        en: "Third nine: “a three-year-old ox's horns freeze and crack.” Fourth nine: “a four-year-old ox's horns freeze and crack.” This is the coldest time of the year — it is said that even the hard horns of young cattle crack in the frost. In some places it drops below minus 40 degrees.",
        mn: "Гурван ес: гунан үхрийн эвэр хуга хөлдөнө. Дөрвөн ес: дөнөн үхрийн эвэр хуга хөлдөнө. Энэ бол жилийн хамгийн хүйтэн үе. Гурав, дөрвөн настай үхрийн хатуу эвэр ч хүйтэнд хагарна гэдэг. Зарим нутагт хасах 40 хэмээс ч доош хүйтэрдэг.",
      },
      {
        scene: "es-tracks",
        en: "Fifth nine: “porridge set outside no longer freezes.” Sixth nine: “tracks show through the snow.” The cold begins to ease, and food left outdoors stops freezing. The sun grows warmer, and paths appear as lines across the snow.",
        mn: "Таван ес: тавьсан будаа хөлдөхгүй. Зургаан ес: зурайсан зам гарна. Хүйтэн сулрах нь мэдэгдэж, гадаа тавьсан будаа хөлдөхөө больно. Нар илчтэй болж, цасан дундуур явсан замууд зурайн харагдана.",
      },
      {
        scene: "es-thaw",
        en: "Seventh nine: “hilltops turn brown.” Eighth nine: “everything turns to slush.” Snow melts off the tops of the hillocks and the brown earth shows through. Then the snow keeps melting, and the ground is wet and muddy everywhere.",
        mn: "Долоон ес: довын толгой борлоно. Найман ес: нал шал болно. Довын оройн цас хайлж, бор шороо ил гарна. Дараа нь цас хайлсаар, хаа сайгүй нойтон шавар болно.",
      },
      {
        scene: "es-spring",
        en: "Ninth nine: “ordinary warmth returns.” The 81 cold days are behind us and warm days arrive. Spring is near, and soon it will be time to welcome the newborn lambs and kids.",
        mn: "Есөн ес: ердийн дулаан болно. Хүйтний 81 хоног ард хоцорч, дулаан цаг ирнэ. Удахгүй хавар болж, мал төллөх цаг ойртоно.",
      },
      {
        scene: "es-count",
        fact: true,
        en: "Why count this way? The nine nines are a folk calendar built on herders' observations over many generations. Knowing when the cold will peak and when it will ease helps herders prepare hay, fuel and shelters in time. Some regions start the count on 21 December, and the sayings differ a little from place to place.",
        mn: "Яагаад ингэж тоолдог вэ? Есөн ес бол олон үеийн малчдын ажиглалтаас үүссэн ардын тоолол. Хүйтэн хэзээ оргилдоо хүрч, хэзээ сулрахыг мэдсэнээр малчид өвс тэжээл, түлээ, хашаа хороогоо цагт нь бэлддэг. Зарим нутагт 12 дугаар сарын 21-нээс тоолж эхэлдэг, хэллэг нь ч нутаг нутагт бага зэрэг өөр байдаг.",
      },
    ],
    check: {
      q: { en: "Which nines are the coldest time of the year?", mn: "Жилийн хамгийн хүйтэн үе аль ес вэ?" },
      a: [
        { en: "The third and fourth nines", mn: "Гурав, дөрвөн ес" },
        { en: "The first nine", mn: "Нэг ес" },
        { en: "The eighth nine", mn: "Найман ес" },
      ],
      ok: 0,
    },
  },
  {
    id: "terkh",
    kind: "legend",
    place: { en: "Arkhangai, Tariat soum", mn: "Архангай, Тариат сум" },
    title: { en: "The White Lake and the Mountain Without a Top", mn: "Тэрхийн Цагаан нуур ба оройгүй уул" },
    blurb: {
      en: "Why is there an island in Terkhiin Tsagaan Lake, and a crater on top of Mount Khorgo?",
      mn: "Тэрхийн Цагаан нуурын дунд яагаад арал байдаг, Хорго уулын оройд яагаад тогоо ангайдаг вэ?",
    },
    cover: "lake-island",
    pages: [
      {
        scene: "valley-well",
        en: "Long ago, among the Khangai mountains, there was a wide green valley. An old couple lived there with their herds, drinking from the only well in the valley. Everyone who used the well followed one rule: after drawing water, always put the lid back on.",
        mn: "Эрт урьд цагт Хангайн уулсын дунд өргөн ногоон хөндий байжээ. Тэнд нэгэн өвгөн эмгэн хоёр мал маллан, хөндийн ганц худгаас ус ундаалан амьдардаг байв. Худгийг ашигладаг хүн бүр нэг ёсыг сахидаг байлаа: ус авсныхаа дараа амсрыг нь заавал таглана.",
      },
      {
        scene: "well-flood",
        en: "One morning the old woman was in a hurry. She drew her water and forgot to cover the well. Water burst out of the ground and began to spread across the valley. Day and night it kept rising, closer and closer to the gers and the pastures.",
        mn: "Нэгэн өглөө эмгэн яаран ус авчихаад худгийн амсрыг таглахаа мартжээ. Газрын гүнээс ус оргилон гарч, хөндийгөөр тархаж эхлэв. Ус өдөр шөнөгүй нэмэгдсээр гэр, бэлчээр рүү ойртсоор байлаа.",
      },
      {
        scene: "hero-mountain",
        en: "Then a mighty hero came galloping. He tore the top off a nearby mountain and hurled it at the place where the water was gushing out. The rock landed right on the mouth of the well, and the flood stopped.",
        mn: "Тэр үед нэгэн хүчит баатар давхин ирээд, ойролцоох уулын оройг хуйхлан авч, ус оргилж буй газар руу шидэв. Чулуу яг худгийн амсар дээр бууж, үер зогсжээ.",
      },
      {
        scene: "lake-island",
        en: "The water that had filled the valley became Terkhiin Tsagaan Lake, and the mountain top became the island in the middle of it. The mountain that lost its top is Mount Khorgo — and that, the legend says, is why a great crater gapes on its summit.",
        mn: "Хөндийд хуралдсан ус Тэрхийн Цагаан нуур болж, шидсэн уулын орой нь нуурын дундах арал болжээ. Оройгоо алдсан уул бол Хорго уул. Домогт өгүүлснээр тийм учраас түүний оройд том тогоо ангайж байдаг аж.",
      },
      {
        scene: "volcano-lava",
        fact: true,
        en: "What do scientists say? Khorgo is an extinct volcano. Thousands of years ago its lava flowed into the Terkh River valley and blocked the river, and the trapped water formed the lake. The lake lies more than 2,000 metres above sea level and is protected by the state. The legend reminds us of something true, too: water is precious — look after it.",
        mn: "Эрдэмтэд юу гэдэг вэ? Хорго бол унтарсан галт уул. Олон мянган жилийн өмнө түүнээс урссан лаав Тэрх голын хөндийг хааж, тогтсон ус нь нуур болсон байна. Нуур далайн түвшнээс 2000 гаруй метрийн өндөрт оршдог бөгөөд улсын тусгай хамгаалалтад байдаг. Домог бас нэг үнэнийг сануулдаг: ус бол үнэт баялаг тул түүнийг гамнан хайрлах ёстой.",
      },
    ],
    check: {
      q: { en: "In the legend, what is the island in the lake?", mn: "Домогт өгүүлснээр нуурын дундах арал юу вэ?" },
      a: [
        { en: "The top of a mountain", mn: "Уулын орой" },
        { en: "A giant fish", mn: "Аварга загас" },
        { en: "The hero's shield", mn: "Баатрын бамбай" },
      ],
      ok: 0,
    },
  },
  {
    id: "taikhar",
    kind: "legend",
    place: { en: "Arkhangai, Ikh Tamir soum", mn: "Архангай, Их Тамир сум" },
    title: { en: "Taikhar Rock", mn: "Тайхар чулуу" },
    blurb: {
      en: "A huge granite rock stands alone on the steppe. The legend tells how it got there.",
      mn: "Тал дунд ганцаараа сүндэрлэх асар том боржин чулуу. Тэр хэрхэн тэнд гарсныг домог өгүүлнэ.",
    },
    cover: "taikhar-rock",
    pages: [
      {
        scene: "serpent-valley",
        en: "Long ago a giant serpent made its home in the Tamir River valley. It frightened and harmed people, herds and wild animals alike. Soon nobody dared even to go down to the river for water.",
        mn: "Эрт урьд цагт Тамир голын хөндийд аварга том могой үүрлэж, хүн мал, ан амьтныг айлган хорлодог байжээ. Удалгүй хүмүүс гол руу ус авахаар ч очиж зүрхлэхээ больжээ.",
      },
      {
        scene: "strong-man",
        en: "In that land lived a young wrestler named Taikhar, the strongest man anyone had ever seen. He decided to save his people and set out for the serpent's lair.",
        mn: "Тэр нутагт урьд өмнө хэн ч үзээгүй их хүчтэй Тайхар хэмээх бөх залуу байжээ. Тэрээр нутгийнхнаа аврахаар шийдэж, могойн үүр рүү зоригтойгоор явжээ.",
      },
      {
        scene: "rock-throw",
        en: "Taikhar lifted an enormous rock and threw it with all his strength. The rock came down on the serpent and pinned it to the ground for ever. From that day on, the Tamir valley was peaceful again.",
        mn: "Тайхар бөх асар том хад чулууг өргөн авч, бүх хүчээрээ шидэв. Чулуу могойн дээр унаж, түүнийг үүрд дарж орхижээ. Тэр өдрөөс хойш Тамирын хөндий дахин амар тайван болсон гэдэг.",
      },
      {
        scene: "taikhar-rock",
        en: "Today, on the bank of the Khoid Tamir River in Ikh Tamir soum, a giant granite rock rises alone from the flat steppe. It is called Taikhar Rock. The legend is told a little differently in different places — ask the elders in your family how they heard it.",
        mn: "Өнөөдөр Их Тамир сумын нутагт, Хойд Тамир голын эрэг дээр тэгш тал дунд ганцаараа сүндэрлэх асар том боржин чулуу бий. Үүнийг Тайхар чулуу гэж нэрлэдэг. Домгийг нутаг бүрт арай өөрөөр ярьдаг. Гэр бүлийнхээ ахмадуудаас энэ домгийг хэрхэн сонссоныг асуугаарай.",
      },
      {
        scene: "rock-writing",
        fact: true,
        en: "Did you know? Over many centuries, people left inscriptions on Taikhar Rock in several languages and scripts — a valuable source for historians. Sadly, some visitors now paint their names on the rock and damage the old writing. When you visit a monument, don't write on it or break anything: take photos and memories only.",
        mn: "Мэдэх үү? Олон зууны турш хүмүүс Тайхар чулуун дээр янз бүрийн хэл, бичгээр бичээс үлдээсэн нь түүхчдийн хувьд үнэт эх сурвалж юм. Харамсалтай нь зарим жуулчид чулуун дээр нэрээ будгаар бичиж, эртний бичээсийг гэмтээж байна. Дурсгалт газар очвол юу ч бүү бич, бүү эвд. Зөвхөн зураг, дурсамж аваад буцаарай.",
      },
    ],
    check: {
      q: { en: "What should you do when you visit a monument?", mn: "Дурсгалт газар очихдоо юу хийх ёстой вэ?" },
      a: [
        { en: "Write your name on it", mn: "Нэрээ бичиж үлдээх" },
        { en: "Take photos and damage nothing", mn: "Зураг авч, юуг ч гэмтээхгүй байх" },
        { en: "Take a small stone home as a souvenir", mn: "Жижиг чулуу дурсгал болгон авч явах" },
      ],
      ok: 1,
    },
  },
  {
    id: "karakorum",
    kind: "history",
    place: { en: "Uvurkhangai, Kharkhorin soum", mn: "Өвөрхангай, Хархорин сум" },
    title: { en: "Karakorum and the Silver Tree", mn: "Хархорум ба Мөнгөн мод" },
    blurb: {
      en: "The capital of the Mongol Empire, where people from all over the world met — and a fountain unlike any other.",
      mn: "Дэлхийн өнцөг булан бүрээс хүмүүс цуглардаг байсан Их Монгол Улсын нийслэл, түүний гайхамшигт усан оргилуур.",
    },
    cover: "silver-tree",
    pages: [
      {
        scene: "karakorum-city",
        en: "In 1220 Chinggis Khaan chose the Orkhon River valley as the site of the capital of the Great Mongol State. The city was called Karakorum. His son Ögedei Khaan built a wall around it in 1235 and raised a palace called Tümen Amgalan.",
        mn: "1220 онд Чингис хаан Орхон голын хөндийд Их Монгол Улсын нийслэлийг байгуулахаар шийджээ. Энэ хот Хархорум хэмээн нэрлэгдэв. Түүний хүү Өгөдэй хаан 1235 онд хотыг хэрмээр хүрээлүүлж, Түмэн амгалан хэмээх ордон бариулсан.",
      },
      {
        scene: "market",
        en: "Karakorum was a meeting place for the whole world. Merchants, craftsmen and envoys from China, Persia, Russia and Europe lived there, and mosques, Buddhist temples and a Christian church stood side by side.",
        mn: "Хархорум бол олон үндэстний хүмүүс цуглардаг хот байв. Хятад, Перс, Орос, Европоос ирсэн худалдаачин, дархан, элч нар энд амьдарч, лалын шашны сүм, буддын хийд, христийн сүм зэрэгцэн оршдог байжээ.",
      },
      {
        scene: "silver-tree",
        en: "The city's greatest wonder was the Silver Tree, made by Guillaume Boucher, a goldsmith from Paris who had been brought to Mongolia as a captive. Four pipes in the tree poured wine, airag (mare's milk), honey mead and rice wine, and on top stood an angel blowing a trumpet.",
        mn: "Хотын хамгийн гайхамшигт зүйл бол Мөнгөн мод байв. Үүнийг олзлогдон Монголд ирсэн Парисын дархан Гийом Бушье хийжээ. Модны дөрвөн цоргоор дарс, айраг, зөгийн балны ундаа, цагаан будааны архи урсдаг байсан бөгөөд оройд нь бүрээ үлээж буй тэнгэр элчийн дүрс байжээ.",
      },
      {
        scene: "traveler-book",
        en: "How do we know all this? From the travel notes of William of Rubruck, a monk sent by the King of France, who came to Karakorum in 1254. That is what a historical source is: the written account of someone who saw it with their own eyes.",
        mn: "Бид энэ бүхнийг яаж мэддэг вэ? 1254 онд Хархорумд ирсэн, Францын хааны илгээсэн христийн лам Гийом де Рубрукийн аяллын тэмдэглэлээс. Түүхийн эх сурвалж гэдэг нь чухам ийм зүйл юм: өөрийн нүдээр харсан хүний бичиж үлдээсэн гэрчлэл.",
      },
      {
        scene: "turtle-stone",
        fact: true,
        en: "Later Khubilai Khaan moved the capital to Daidu (today's Beijing), and in 1380 Karakorum was destroyed by the army of the Ming dynasty. In Kharkhorin you can still see a granite stone turtle from the old city, and archaeologists are still excavating its ruins today.",
        mn: "Хожим Хубилай хаан нийслэлээ Дайду (одоогийн Бээжин) руу шилжүүлж, 1380 онд Хархорумыг Мин улсын цэрэг сүйтгэжээ. Хархорин суманд эртний хотоос үлдсэн боржин чулуун яст мэлхий одоо ч бий бөгөөд археологичид хотын туурийг өнөөдөр ч малтан судалсаар байна.",
      },
    ],
    check: {
      q: { en: "In which year did Chinggis Khaan choose Karakorum as the capital?", mn: "Чингис хаан Хархорумыг нийслэл болгохоор хэдэн онд шийдсэн бэ?" },
      a: [
        { en: "1206", mn: "1206" },
        { en: "1220", mn: "1220" },
        { en: "1380", mn: "1380" },
      ],
      ok: 1,
    },
  },
  {
    id: "erdenezuu",
    kind: "history",
    place: { en: "Uvurkhangai, Kharkhorin soum", mn: "Өвөрхангай, Хархорин сум" },
    title: { en: "Erdene Zuu: 108 Stupas", mn: "Эрдэнэ Зуу: 108 суварга" },
    blurb: {
      en: "Mongolia's oldest surviving Buddhist monastery, built from the stones of an old capital.",
      mn: "Эртний нийслэлийн чулуугаар баригдсан, Монголд өнөөг хүртэл хадгалагдан үлдсэн хамгийн эртний буддын хийд.",
    },
    cover: "stupa-wall",
    pages: [
      {
        scene: "ruins-build",
        en: "More than two hundred years after Karakorum was destroyed, in 1585, Abtai Sain Khan of the Khalkha founded a monastery beside the ruins of the old city. It is said that stones and bricks from the ancient capital were used to build it.",
        mn: "Хархорум сүйрснээс хойш 200 гаруй жилийн дараа, 1585 онд Халхын Абтай сайн хан эртний хотын туурийн дэргэд хийд байгуулжээ. Барилгад нь эртний нийслэлийн чулуу, тоосгыг ашигласан гэдэг.",
      },
      {
        scene: "stupa-wall",
        en: "A square wall surrounds the monastery, and 108 white stupas line the top of it. In Buddhism, 108 is a sacred number. Each side of the wall is about 400 metres long.",
        mn: "Хийдийг дөрвөлжин хэрэм хүрээлж, түүн дээр 108 цагаан суварга эгнэн зогсдог. Буддын шашинд 108 бол ариун тоо. Хэрмийн тал бүр 400 орчим метр урт.",
      },
      {
        scene: "temples",
        en: "Inside the wall stand temples whose architecture mixes Mongolian, Tibetan and Chinese styles. They hold precious Buddhist images and works of art.",
        mn: "Хэрмийн дотор Монгол, Түвд, Хятадын урлагийн хэв маяг хосолсон сүм дуганууд бий. Тэдгээрт нандин шүтээн, урлагийн бүтээлүүд хадгалагддаг.",
      },
      {
        scene: "hard-times",
        en: "During the repressions of the late 1930s, hundreds of monasteries across Mongolia were destroyed. Most of Erdene Zuu's buildings were lost, but the wall and a few temples survived. In 1947 it became a museum, and since 1990 it has been a working monastery again.",
        mn: "1930-аад оны сүүлчээр өрнөсөн хэлмэгдүүлэлтийн үеэр Монгол даяар олон зуун хийдийг нурааж устгасан. Эрдэнэ Зуугийн ихэнх барилга сүйдсэн ч хэрэм болон цөөн хэдэн сүм үлджээ. 1947 онд музей болсон бөгөөд 1990 оноос хойш хийдийн үйл ажиллагаа нь дахин сэргэсэн.",
      },
      {
        scene: "erdenezuu-today",
        fact: true,
        en: "Erdene Zuu is the oldest Buddhist monastery that survives in Mongolia today. It is part of the Orkhon Valley Cultural Landscape, a UNESCO World Heritage site. Walking around the wall, try counting the stupas — do you get 108?",
        mn: "Эрдэнэ Зуу бол Монголд өнөөг хүртэл хадгалагдан үлдсэн хамгийн эртний буддын хийд юм. Энэ нь ЮНЕСКО-гийн Дэлхийн өвд бүртгэгдсэн Орхоны хөндийн соёлын дурсгалт газар нутгийн нэг хэсэг. Хэрмийг тойрон алхахдаа сувргануудыг тоолоод үзээрэй. 108 гарч байна уу?",
      },
    ],
    check: {
      q: { en: "How many stupas stand on the wall of Erdene Zuu?", mn: "Эрдэнэ Зуугийн хэрэм дээр хэдэн суварга бий вэ?" },
      a: [
        { en: "88", mn: "88" },
        { en: "108", mn: "108" },
        { en: "1,000", mn: "1000" },
      ],
      ok: 1,
    },
  },
  {
    id: "orkhon",
    kind: "nature",
    place: { en: "Arkhangai, Uvurkhangai", mn: "Архангай, Өвөрхангай" },
    title: { en: "The Orkhon Valley: Cradle of History", mn: "Орхоны хөндий: түүхийн өлгий" },
    blurb: {
      en: "A river valley where nomadic empires rose one after another — and a waterfall born of a volcano.",
      mn: "Нүүдэлчдийн гүрнүүд ээлж дараалан мандсан голын хөндий ба галт уулаас үүссэн хүрхрээ.",
    },
    cover: "waterfall",
    pages: [
      {
        scene: "orkhon-river",
        en: "The Orkhon River starts in the Khangai mountains and flows for more than 1,100 km — it is the longest river that flows entirely within Mongolia. For thousands of years the rich pastures of its valley have fed nomads and their herds.",
        mn: "Орхон гол Хангайн нуруунаас эх авч, 1100 гаруй км урсдаг. Энэ бол Монгол Улсын нутаг дэвсгэрт бүхэлдээ урсдаг хамгийн урт гол юм. Түүний хөндийн өвс ус элбэг бэлчээр мянга мянган жилийн турш нүүдэлчид, тэдний малыг тэжээж иржээ.",
      },
      {
        scene: "waterfall",
        en: "In the upper Orkhon is the Ulaan Tsutgalan waterfall. Ancient lava flows and earthquakes shaped a gorge here, and the river drops more than 20 metres into it. In a very cold winter the waterfall can freeze!",
        mn: "Орхоны дээд хэсэгт Улаан цутгалан хүрхрээ бий. Эртний галт уулын лаав, газар хөдлөлтийн улмаас үүссэн хавцал руу гол 20 гаруй метрийн өндрөөс унадаг. Хахир хүйтэн өвөл хүрхрээ бүхэлдээ хөлдөх нь ч бий.",
      },
      {
        scene: "steles",
        en: "At Khöshöö Tsaidam stand 8th-century stone steles raised for the Turkic ruler Bilge Khagan and his brother Kül Tegin. Their history is carved in Old Turkic runic script — among the oldest known texts in any Turkic language.",
        mn: "Хөшөө Цайдамд VIII зуунд Түрэгийн Билгэ хаан болон түүний дүү Күлтегинд зориулан босгосон гэрэлт хөшөөнүүд бий. Тэдгээрт эртний түрэг (руни) бичгээр түүхээ сийлсэн нь түрэг хэлний хамгийн эртний бичгийн дурсгалуудын нэг юм.",
      },
      {
        scene: "valley-layers",
        en: "In this single valley you can also find Khar Balgas, the capital of the Uighur Khaganate; Karakorum, the Mongol capital; Erdene Zuu; and Tövkhön Monastery, founded in 1653 by Zanabazar on a rocky mountain top. Each era left its mark here.",
        mn: "Энэ нэг хөндийд Уйгурын нийслэл Хар балгас, Монголын нийслэл Хархорум, Эрдэнэ Зуу хийд, 1653 онд Өндөр гэгээн Занабазарын хадан оргил дээр байгуулсан Төвхөн хийд зэрэг олон эрин үеийн дурсгал оршдог. Эрин үе бүр энд ул мөрөө үлдээжээ.",
      },
      {
        scene: "world-heritage",
        fact: true,
        en: "Because nature and history meet here in such a rare way, the Orkhon Valley Cultural Landscape was added to the UNESCO World Heritage List in 2004. It belongs to all of humanity — and it is our job to protect it.",
        mn: "Байгаль, түүхийн ийм ховор хослолын ачаар 2004 онд “Орхоны хөндийн соёлын дурсгалт газар нутаг” ЮНЕСКО-гийн Дэлхийн өвийн жагсаалтад бүртгэгдсэн. Энэ бол хүн төрөлхтний өв бөгөөд үүнийг хамгаалах нь бидний үүрэг.",
      },
    ],
    check: {
      q: { en: "When did the Orkhon Valley become a UNESCO World Heritage site?", mn: "Орхоны хөндий хэдэн онд ЮНЕСКО-гийн Дэлхийн өвд бүртгэгдсэн бэ?" },
      a: [
        { en: "1990", mn: "1990" },
        { en: "2004", mn: "2004" },
        { en: "2015", mn: "2015" },
      ],
      ok: 1,
    },
  },
  {
    id: "ugii",
    kind: "legend",
    place: { en: "Arkhangai, Ugiinuur soum", mn: "Архангай, Өгийнуур сум" },
    title: { en: "The Legend of Ugii Lake", mn: "Өгий нуурын домог" },
    blurb: {
      en: "A lake born of a girl's tears — and the birds that come to it every year.",
      mn: "Нэгэн бүсгүйн нулимсаар бүрэлдсэн нуур, түүнд жил бүр ирдэг шувуудын тухай.",
    },
    cover: "ugii-tears",
    pages: [
      {
        scene: "ugii-love",
        en: "Long ago, a rich noble had a beautiful daughter named Ögii. She fell in love with a poor young horse herder, and the two would secretly meet out on the pastures.",
        mn: "Эрт урьд цагт нэгэн баян тайж Өгий хэмээх үзэсгэлэнт охинтой байжээ. Өгий ядуу адуучин залууд сэтгэл алдарч, тэр хоёр бэлчээрт нууцаар уулздаг байв.",
      },
      {
        scene: "ugii-apart",
        en: "But the noble's servants caught them and took the young herder away. Before they were parted, he told her: 'I will become Avzaga Khairkhan mountain in my homeland, and I will give you a beautiful lake.'",
        mn: "Гэвч тайжийн зарц нар тэднийг барьж, адуучин залууг авч одов. Салахын өмнө залуу “Би нутагтаа Авзага хайрхан уул болж, харин чамд нэгэн сайхан нуур өгье” гэж хэлжээ.",
      },
      {
        scene: "ugii-tears",
        en: "Ögii wept and wept, and her tears gathered into a lake. People named it after her: Ugii Lake. They say the lake is guarded by a female spirit, so people treat it with respect and never pollute its water. The legend is told a little differently in different places.",
        mn: "Өгий уйлж гашуудан, нулимс нь хуралдсаар нуур болжээ. Хүмүүс түүнийг охины нэрээр Өгий нуур гэж нэрлэсэн гэдэг. Нуурыг эм савдаг сахидаг гэж хүмүүс хүндэтгэн, усыг нь бузарлахаас цээрлэдэг. Домгийг нутаг бүрт арай өөрөөр ярьдаг.",
      },
      {
        scene: "ugii-lake",
        en: "In Ugiinuur soum of Arkhangai lies Ugii Lake, a freshwater lake fed by the Khögshin Orkhon River. It is near here that GRIT ran its very first program.",
        mn: "Архангай аймгийн Өгийнуур суманд Хөгшин Орхон гол цутгадаг цэнгэг устай Өгий нуур оршдог. Яг энэ нуурын ойролцоо GRIT анхны хөтөлбөрөө хэрэгжүүлсэн юм.",
      },
      {
        scene: "birds-migrate",
        en: "Every spring and autumn, thousands of migrating birds stop at the lake to rest and feed on their long journey. That is why, in 1998, Ugii Lake was listed as a wetland of international importance under the Ramsar Convention.",
        mn: "Хавар, намар бүр олон мянган нүүдлийн шувуу урт аяллынхаа замд энд амарч, хооллодог. Тиймээс 1998 онд Өгий нуурыг Рамсарын конвенцоор олон улсын ач холбогдол бүхий намгархаг газрын жагсаалтад оруулсан.",
      },
      {
        scene: "litter",
        en: "But as the number of visitors grows, so does the litter on the shore. Plastic bottles and cans are dangerous for birds, fish and livestock — and a plastic bottle left in nature takes hundreds of years to break down.",
        mn: "Гэвч жуулчид олширохын хэрээр эрэг дээрх хог хаягдал ч ихэсчээ. Хуванцар сав, лааз нь шувуу, загас, малд аюултай. Байгальд хаясан нэг хуванцар сав задрахад хэдэн зуун жил шаардлагатай.",
      },
      {
        scene: "cleanup",
        fact: true,
        en: "So GRIT Environment started sorting and recycling waste together with local students and tourist camps. Protecting the lake is in our hands. What can you do to keep the nature around your home clean?",
        mn: "Иймээс GRIT Environment нутгийн сурагчид, жуулчны баазуудтай хамтран хог ангилж, дахин боловсруулах ажлыг эхлүүлсэн. Нуураа хамгаалах эсэх нь бидний гарт байна. Та гэр орныхоо ойр орчны байгалийг цэвэр байлгахын тулд юу хийж чадах вэ?",
      },
    ],
    check: {
      q: { en: "In 1998, Ugii Lake was added to which list?", mn: "1998 онд Өгий нуурыг ямар жагсаалтад оруулсан бэ?" },
      a: [
        { en: "The Ramsar list of important wetlands", mn: "Олон улсын ач холбогдол бүхий намгархаг газрын (Рамсарын) жагсаалт" },
        { en: "The Red Book of endangered species", mn: "Ховордсон амьтдын Улаан ном" },
        { en: "The list of Olympic venues", mn: "Олимпийн тэмцээний газрын жагсаалт" },
      ],
      ok: 0,
    },
  },
  {
    id: "khoshoo",
    kind: "history",
    place: { en: "Arkhangai, Khashaat soum", mn: "Архангай, Хашаат сум" },
    title: { en: "The Steles of Khöshöö Tsaidam", mn: "Хөшөө Цайдамын гэрэлт хөшөөд" },
    blurb: {
      en: "What does writing carved into stone 1,300 years ago tell us?",
      mn: "1300 жилийн өмнө чулуунд сийлсэн бичиг бидэнд юу өгүүлдэг вэ?",
    },
    cover: "runes",
    pages: [
      {
        scene: "turk-khagan",
        en: "In the 8th century the Turkic Khaganate ruled the steppe from the Orkhon Valley. The wise Bilge Khagan and his brave younger brother, prince Kül Tegin, led their people together.",
        mn: "VIII зуунд Түрэгийн хаант улс Орхоны хөндийгөөс тал нутгийг захирч байв. Мэргэн ухаант Билгэ хаан, баатар зоригт дүү Күлтегин хоёр ард түмнээ хамтдаа удирдаж байжээ.",
      },
      {
        scene: "runes",
        en: "When Kül Tegin died, a great stone stele was raised for him in 732, and another for Bilge Khagan in 735. Their deeds were carved on the stones in Old Turkic runic script, with a Chinese text on one side.",
        mn: "Күлтегинд 732 онд, Билгэ хаанд 735 онд дурсгалын том гэрэлт хөшөө босгожээ. Тэдний гавьяа үйлсийг эртний түрэг руни бичгээр сийлж, нэг талд нь хятад бичгээр бичсэн байна.",
      },
      {
        scene: "steles",
        en: "The inscriptions speak to the generations to come: stay united, remember the past, and do not leave the forested Ötüken homeland.",
        mn: "Бичээст хойч үедээ “эв нэгдлээ хадгал, өнгөрснөө бүү март, Өтүкэний ойт нутгаа бүү орхи” хэмээн сургасан байдаг.",
      },
      {
        scene: "decipher",
        en: "For more than a thousand years nobody could read these strange letters. In 1889 the Russian explorer Nikolai Yadrintsev found the steles, and in 1893 the Danish scholar Vilhelm Thomsen deciphered the script. At last the stones could speak again.",
        mn: "Мянга гаруй жилийн турш эдгээр нууцлаг үсгийг хэн ч уншиж чаддаггүй байлаа. 1889 онд Оросын судлаач Н. Ядринцев хөшөөдийг олж, 1893 онд Данийн эрдэмтэн Вильгельм Томсен бичгийг нь тайлжээ. Ингэж чулуу дахин “ярьж” эхэлсэн юм.",
      },
      {
        scene: "stele-museum",
        fact: true,
        en: "Today the steles are kept in a museum built right at the site, so that wind and rain no longer wear the letters away. They are among the oldest known texts in a Turkic language — a heritage shared by Mongolia and the Turkic peoples.",
        mn: "Өнөөдөр салхи бороонд үсэг нь элэгдэхгүйн тулд хөшөөдийг газар дээр нь барьсан музейд хадгалж байна. Эдгээр нь түрэг хэлний хамгийн эртний бичгийн дурсгалуудын нэг бөгөөд Монгол болон түрэг үндэстнүүдийн хамтын өв юм.",
      },
    ],
    check: {
      q: { en: "Who deciphered the Old Turkic runic script in 1893?", mn: "1893 онд эртний түрэг бичгийг хэн тайлсан бэ?" },
      a: [
        { en: "Vilhelm Thomsen", mn: "Вильгельм Томсен" },
        { en: "Marco Polo", mn: "Марко Поло" },
        { en: "Guillaume Boucher", mn: "Гийом Бушье" },
      ],
      ok: 0,
    },
  },
  {
    id: "kharbalgas",
    kind: "history",
    place: { en: "Arkhangai, Khotont soum", mn: "Архангай, Хотонт сум" },
    title: { en: "Khar Balgas: the Uighur Capital", mn: "Хар балгас: Уйгурын нийслэл" },
    blurb: {
      en: "A great steppe city said to have had twelve iron gates.",
      mn: "Арван хоёр төмөр хаалгатай байсан гэх тал нутгийн том хот.",
    },
    cover: "uighur-city",
    pages: [
      {
        scene: "uighur-city",
        en: "In 744 the Uighurs founded a new khaganate on the steppe. In the Orkhon Valley they built their capital, Ordu-Baliq. Today we call its ruins Khar Balgas — the 'black ruins'.",
        mn: "744 онд уйгурууд тал нутагт шинэ хаант улс байгуулжээ. Тэд Орхоны хөндийд Ордубалык хэмээх нийслэлээ барьсан бөгөөд түүний туурийг өнөөдөр Хар балгас гэж нэрлэдэг.",
      },
      {
        scene: "silk-road",
        en: "It was a busy city of merchants. An Arab traveller who came here around 821 wrote of high walls, twelve great iron gates, crowded markets and farm fields all around. Silk Road caravans passed through.",
        mn: "Энэ бол худалдаачдаар дүүрэн, хөл хөдөлгөөнтэй хот байв. 821 оны орчим ирсэн араб аялагч өндөр хэрэм, арван хоёр том төмөр хаалга, хүн ихтэй зах, эргэн тойрных нь тариан талбайн тухай бичжээ. Торгоны замын жингүүд ч энд ирдэг байв.",
      },
      {
        scene: "three-scripts",
        en: "Near the palace stood a stele carved in three scripts: Old Turkic, Sogdian and Chinese. Many peoples and many languages met in this city.",
        mn: "Ордны ойролцоо эртний түрэг, согд, хятад гэсэн гурван бичгээр сийлсэн гэрэлт хөшөө байжээ. Энэ хотод олон ард түмэн, олон хэл нийлж уулздаг байв.",
      },
      {
        scene: "city-falls",
        en: "In 840 the Kyrgyz attacked from the north. The city burned, and the Uighurs left the steppe for the south-west — the oases of today's Xinjiang and Gansu.",
        mn: "840 онд хойд зүгээс киргизүүд довтолжээ. Хот шатаж, уйгурууд тал нутгаа орхин баруун урагш, одоогийн Шинжаан, Ганьсугийн баян бүрд рүү нүүсэн байна.",
      },
      {
        scene: "khar-balgas-today",
        fact: true,
        en: "More than 1,100 years later, parts of the earthen walls and the tall citadel still rise above the valley. Mongolian and German archaeologists study the site, and it lies within the Orkhon Valley World Heritage area.",
        mn: "1100 гаруй жилийн дараа ч шороон хэрмийн хэсэг, өндөр цайзын туурь хөндийн дээгүүр сүндэрлэсээр байна. Монгол, Германы археологичид энд судалгаа хийдэг бөгөөд энэ газар Орхоны хөндийн Дэлхийн өвийн нутагт багтдаг.",
      },
    ],
    check: {
      q: { en: "Who destroyed the Uighur capital in 840?", mn: "840 онд Уйгурын нийслэлийг хэн сүйтгэсэн бэ?" },
      a: [
        { en: "The Kyrgyz", mn: "Киргизүүд" },
        { en: "The Khitans", mn: "Киданчууд" },
        { en: "The Xiongnu", mn: "Хүннү нар" },
      ],
      ok: 0,
    },
  },
  {
    id: "burkhan",
    kind: "history",
    place: { en: "Khentii, Khan Khentii range", mn: "Хэнтий, Хан Хэнтийн нуруу" },
    title: { en: "Burkhan Khaldun, the Sacred Mountain", mn: "Бурхан Халдун: тахилгат уул" },
    blurb: {
      en: "How did the mountain that saved young Temüjin become the most revered mountain of the Mongols?",
      mn: "Залуу Тэмүжиний амийг аварсан уул хэрхэн монголчуудын хамгийн дээдэлдэг уул болсон бэ?",
    },
    cover: "burkhan-today",
    pages: [
      {
        scene: "merkit-raid",
        en: "When Temüjin — the future Chinggis Khaan — was a young man, Merkit warriors raided his family's camp at dawn. There were not enough horses for everyone, and the family had to scatter.",
        mn: "Ирээдүйн Чингис хаан Тэмүжинийг залуу байхад нэгэн үүрээр мэргидийн цэрэг тэдний нутаг руу довтолжээ. Бүгдэд хүрэлцэх морь байсангүй тул гэр бүлийнхэн нь тал тал тийш бутарчээ.",
      },
      {
        scene: "hiding-forest",
        en: "Temüjin galloped into the thick forests of Burkhan Khaldun. The Merkits circled the mountain three times, but they could not find him in the dense thickets.",
        mn: "Тэмүжин Бурхан Халдуны өтгөн ой руу давхин оржээ. Мэргидүүд уулыг гурвантаа тойрон эрсэн ч өтгөн шугуйд нуугдсан түүнийг олж чадсангүй.",
      },
      {
        scene: "vow-sun",
        en: "When it was safe, Temüjin came down, hung his belt around his neck, faced the sun and knelt nine times. He promised that he and his descendants would always honour the mountain that had saved his life.",
        mn: "Аюул арилмагц Тэмүжин уулаас бууж, бүсээ хүзүүндээ зүүн, нар зүг харж есөн удаа сөгдөн мөргөжээ. Амийг нь аварсан энэ уулыг өөрөө болон үр удам нь үеийн үед тахин дээдлэхийг амласан гэдэг.",
      },
      {
        scene: "three-rivers",
        en: "Burkhan Khaldun rises in the Khentii mountains, the land where three great rivers begin: the Onon, the Kherlen and the Tuul. For the Mongols it became the sacred heart of their homeland.",
        mn: "Бурхан Халдун Хэнтийн нуруунд оршдог бөгөөд энэ нутгаас Онон, Хэрлэн, Туул гэсэн гурван том гол эх авдаг. Монголчууд энэ уулыг эх нутгийнхаа ариун дагшин газар хэмээн дээдэлдэг.",
      },
      {
        scene: "burkhan-today",
        fact: true,
        en: "In 2015 'Great Burkhan Khaldun Mountain and its surrounding sacred landscape' was added to the UNESCO World Heritage List. People still climb it to make offerings at the ovoo. Treat sacred places with respect: leave no litter and keep to the paths.",
        mn: "2015 онд “Их Бурхан Халдун уул ба түүнийг хүрээлэн буй тахилгат газар” ЮНЕСКО-гийн Дэлхийн өвийн жагсаалтад бүртгэгджээ. Хүмүүс одоо ч уулын овоог тахидаг. Тахилгат газрыг хүндэтгэж, хог бүү хая, замаас бүү гар.",
      },
    ],
    check: {
      q: { en: "Which three rivers begin in the Khentii mountains?", mn: "Хэнтийн нуруунаас эх авдаг гурван гол аль нь вэ?" },
      a: [
        { en: "Onon, Kherlen and Tuul", mn: "Онон, Хэрлэн, Туул" },
        { en: "Orkhon, Selenge and Tamir", mn: "Орхон, Сэлэнгэ, Тамир" },
        { en: "Khovd, Zavkhan and Ider", mn: "Ховд, Завхан, Идэр" },
      ],
      ok: 0,
    },
  },
  {
    id: "deluun",
    kind: "history",
    place: { en: "Khentii, Dadal soum", mn: "Хэнтий, Дадал сум" },
    title: { en: "Delüün Boldog: Where Temüjin Was Born", mn: "Дэлүүн болдог: Тэмүжиний төрсөн нутаг" },
    blurb: {
      en: "The boy who was born clutching a blood clot the size of a knucklebone.",
      mn: "Баруун гартаа шагай чинээ нөж атгаж төрсөн хүүгийн тухай.",
    },
    cover: "onon-birth",
    pages: [
      {
        scene: "onon-birth",
        en: "The Secret History of the Mongols tells that Temüjin was born at Delüün Boldog on the Onon River. His father Yesügei had just come back from fighting the Tatars, and named his son after a Tatar chief he had captured, Temüjin Üge.",
        mn: "“Монголын нууц товчоо”-нд өгүүлснээр Тэмүжин Онон голын Дэлүүн болдогт төржээ. Түүний эцэг Есүхэй баатар татаруудтай тулалдаад буцаж ирэхдээ олзолсон татарын Тэмүжин үгэ хэмээх ноёны нэрээр хүүдээ нэр хайрласан байна.",
      },
      {
        scene: "knucklebone",
        en: "The baby was born holding in his right hand a clot of blood the size of a knucklebone. People took it as a sign that he would become a great and powerful ruler.",
        mn: "Нялх хүү баруун гартаа шагай чинээ нөж атгаж төрсөн гэдэг. Хүмүүс үүнийг агуу хүчит эзэн болохын бэлгэ тэмдэг хэмээн үзжээ.",
      },
      {
        scene: "hard-childhood",
        en: "When Temüjin was about nine, his father was poisoned by the Tatars. His mother Hoelun raised the children on her own. They gathered wild fruit and roots and caught fish in the Onon to survive.",
        mn: "Тэмүжин есөн настай байхад эцгийг нь татарууд хордуулан алжээ. Эх Өэлүн хүүхдүүдээ ганцаараа өсгөжээ. Тэд жимс, үндэс түүж, Онон голоос загас барьж амь зуудаг байв.",
      },
      {
        scene: "birthplace-today",
        fact: true,
        en: "Historians still debate exactly where Delüün Boldog was. Many place it in Dadal soum of Khentii, where people come to honour Chinggis Khaan. By tradition he was born in 1162.",
        mn: "Дэлүүн болдог яг хаана байсан талаар түүхчид одоо ч маргасаар байна. Олонх нь үүнийг Хэнтий аймгийн Дадал сумын нутаг гэж үздэг бөгөөд хүмүүс Чингис хааныг хүндэтгэн тэнд очдог. Уламжлалаар тэрээр 1162 онд төрсөн гэж үздэг.",
      },
    ],
    check: {
      q: { en: "What did Temüjin hold in his hand when he was born?", mn: "Тэмүжин төрөхдөө гартаа юу атгасан байсан бэ?" },
      a: [
        { en: "A blood clot the size of a knucklebone", mn: "Шагай чинээ нөж" },
        { en: "A golden arrow", mn: "Алтан сум" },
        { en: "A white stone", mn: "Цагаан чулуу" },
      ],
      ok: 0,
    },
  },
  {
    id: "khudoo",
    kind: "history",
    place: { en: "Khentii, Delgerkhaan soum", mn: "Хэнтий, Дэлгэрхаан сум" },
    title: { en: "Khödöö Aral and the Secret History", mn: "Хөдөө арал ба “Монголын нууц товчоо”" },
    blurb: {
      en: "Where was the oldest Mongolian history book written?",
      mn: "Монголын хамгийн эртний түүхэн зохиол хаана бичигдсэн бэ?",
    },
    cover: "secret-history",
    pages: [
      {
        scene: "kherlen-plain",
        en: "Khödöö Aral is a wide plain where the Tsenkher River flows into the Kherlen. Its rich pastures made it a favourite place for the great camps and assemblies of the Mongol khans.",
        mn: "Хөдөө арал бол Цэнхэр гол Хэрлэн мөрөнд цутгадаг бэлчирт орших өргөн уудам тал юм. Өвс ус элбэг тул Монголын хаад их ордоо энд байрлуулж, их хуралдайгаа зохион байгуулдаг байжээ.",
      },
      {
        scene: "secret-history",
        en: "The last lines of The Secret History of the Mongols say it was finished during a great assembly at Khödöö Aral on the Kherlen, in a Year of the Rat. In Mongolia this is traditionally counted as 1240; many scholars think it was 1228.",
        mn: "“Монголын нууц товчоо”-ны төгсгөлд их хуралдай Хэрлэний Хөдөө аралд хуралдаж байх үед, хулгана жил бичиж дуусгав хэмээн тэмдэглэсэн байдаг. Монголд үүнийг уламжлан 1240 он гэж тооцдог бол олон эрдэмтэн 1228 он гэж үздэг.",
      },
      {
        scene: "wolf-doe",
        en: "The book begins with a legend: the ancestor of the Mongols was Börte Chino, the blue-grey wolf born by the will of Heaven, and his wife was Gua Maral, the fallow doe. They crossed a great water and settled at Burkhan Khaldun.",
        mn: "Ном нэгэн домгоор эхэлдэг: Монголчуудын дээд өвөг нь дээр тэнгэрээс заяат төрсөн Бөртэ чоно, түүний гэргий нь Гуа марал байжээ. Тэд тэнгис гэтэлж ирээд Бурхан Халдунд нутаглажээ.",
      },
      {
        scene: "five-arrows",
        en: "It also tells how the wise mother Alan Gua gave each of her five sons one arrow to break — easy! Then she bound five arrows together, and none of them could break the bundle. 'If you stand together, no one can defeat you.'",
        mn: "Мөн мэргэн эх Алан гуа таван хүүдээ нэг нэг сум хугалуулахад амархан хугарчээ. Дараа нь таван сумыг нийлүүлэн боогоод хугал гэхэд хэн нь ч хугалж чадсангүй. “Эв нэгдэлтэй байвал та нарыг хэн ч дийлэхгүй” гэж сургажээ.",
      },
      {
        scene: "khudoo-today",
        fact: true,
        en: "The original text in Mongol script was lost. The book survived because the Mongolian words had been written down in Chinese characters. Today a monument stands at Khödöö Aral, and in 1990 Mongolia celebrated the book's 750th anniversary.",
        mn: "Нууц товчооны монгол бичгийн эх нь алдагдсан ч монгол үгийн дуудлагыг хятад үсгээр тэмдэглэсэн хувилбар нь хадгалагдан үлджээ. Өнөөдөр Хөдөө аралд дурсгалын хөшөө сүндэрлэн буй бөгөөд 1990 онд Монгол Улс уг зохиолын 750 жилийн ойг тэмдэглэсэн.",
      },
    ],
    check: {
      q: { en: "What did Alan Gua teach her sons with the five arrows?", mn: "Алан гуа таван сумаар хөвгүүддээ юуг сургасан бэ?" },
      a: [
        { en: "If you stand together, no one can defeat you", mn: "Эв нэгдэлтэй бол хэн ч дийлэхгүй" },
        { en: "How to make arrows", mn: "Сум хэрхэн хийхийг" },
        { en: "How to hunt deer", mn: "Буга хэрхэн агнахыг" },
      ],
      ok: 0,
    },
  },
];

// ---------------------------------------------------------------- quiz
const QUIZ = [
  { q: { en: "Which mountain hid young Temüjin from the Merkits?", mn: "Залуу Тэмүжинийг мэргидээс нуун аварсан уул аль нь вэ?" }, a: [{ en: "Burkhan Khaldun", mn: "Бурхан Халдун" }, { en: "Otgontenger", mn: "Отгонтэнгэр" }, { en: "Khorgo", mn: "Хорго" }], ok: 0, why: { en: "Temüjin vowed that he and his descendants would always honour Burkhan Khaldun.", mn: "Тэмүжин өөрөө болон үр удам нь Бурхан Халдуныг үргэлж тахин дээдлэхээ амласан." } },
  { q: { en: "Where, according to its last lines, was the Secret History of the Mongols written?", mn: "Төгсгөлийн үгэнд нь бичсэнээр “Монголын нууц товчоо” хаана бичигдсэн бэ?" }, a: [{ en: "At Khödöö Aral on the Kherlen", mn: "Хэрлэний Хөдөө аралд" }, { en: "In Karakorum", mn: "Хархорумд" }, { en: "At Erdene Zuu", mn: "Эрдэнэ Зуу хийдэд" }], ok: 0, why: { en: "It was finished during a great assembly at Khödöö Aral, where the Tsenkher meets the Kherlen.", mn: "Цэнхэр гол Хэрлэнд цутгадаг Хөдөө аралд их хуралдайн үеэр бичиж дуусгажээ." } },
  { q: { en: "Who deciphered the Old Turkic runic script in 1893?", mn: "1893 онд эртний түрэг бичгийг хэн тайлсан бэ?" }, a: [{ en: "Vilhelm Thomsen", mn: "Вильгельм Томсен" }, { en: "Nikolai Przhevalsky", mn: "Николай Пржевальский" }, { en: "William of Rubruck", mn: "Гийом де Рубрук" }], ok: 0, why: { en: "The Danish scholar Vilhelm Thomsen read the Orkhon inscriptions in 1893.", mn: "Данийн эрдэмтэн Вильгельм Томсен 1893 онд Орхоны бичээсийг тайлжээ." } },
  { q: { en: "Who destroyed the Uighur capital Ordu-Baliq in 840?", mn: "840 онд Уйгурын нийслэл Ордубалыкийг хэн сүйтгэсэн бэ?" }, a: [{ en: "The Kyrgyz", mn: "Киргизүүд" }, { en: "The Khitans", mn: "Киданчууд" }, { en: "The Tatars", mn: "Татарууд" }], ok: 0, why: { en: "After the Kyrgyz attack, the Uighurs moved south-west to the oases of Xinjiang and Gansu.", mn: "Киргизийн довтолгооны дараа уйгурууд баруун урагш Шинжаан, Ганьсу руу нүүжээ." } },
  { q: { en: "In which year did Burkhan Khaldun become a UNESCO World Heritage site?", mn: "Бурхан Халдун уул хэдэн онд ЮНЕСКО-гийн Дэлхийн өвд бүртгэгдсэн бэ?" }, a: ["2004", "2015", "2021"], ok: 1, why: { en: "'Great Burkhan Khaldun Mountain and its surrounding sacred landscape' was inscribed in 2015.", mn: "“Их Бурхан Халдун уул ба түүнийг хүрээлэн буй тахилгат газар” 2015 онд бүртгэгджээ." } },
  { q: { en: "In which year was the Great Mongol State founded?", mn: "Их Монгол Улс хэдэн онд байгуулагдсан бэ?" }, a: ["1162", "1206", "1260"], ok: 1, why: { en: "In 1206 Temüjin was proclaimed Chinggis Khaan at a great assembly (khuraltai) by the Onon River.", mn: "1206 онд Онон голын эхэнд хуралдсан их хуралдайгаар Тэмүжинг Чингис хаан хэмээн өргөмжилсөн." } },
  { q: { en: "Which state, founded in 209 BC, is often called the first state of the steppe nomads?", mn: "МЭӨ 209 онд байгуулагдсан, тал нутгийн нүүдэлчдийн анхны төр гэгддэг улс аль нь вэ?" }, a: [{ en: "The Xiongnu (Hunnu)", mn: "Хүннү" }, { en: "The Uighur Khaganate", mn: "Уйгурын хаант улс" }, { en: "The Turkic Khaganate", mn: "Түрэгийн хаант улс" }], ok: 0, why: { en: "Modu Chanyu united the tribes and founded the Xiongnu state in 209 BC.", mn: "МЭӨ 209 онд Модун шаньюй аймгуудыг нэгтгэж Хүннү гүрнийг байгуулсан." } },
  { q: { en: "Who founded Erdene Zuu Monastery in 1585?", mn: "1585 онд Эрдэнэ Зуу хийдийг хэн байгуулсан бэ?" }, a: [{ en: "Abtai Sain Khan", mn: "Абтай сайн хан" }, { en: "Ögedei Khaan", mn: "Өгөдэй хаан" }, { en: "Zanabazar", mn: "Занабазар" }], ok: 0, why: { en: "Abtai Sain Khan of the Khalkha built it beside the ruins of Karakorum.", mn: "Халхын Абтай сайн хан эртний Хархорумын туурийн дэргэд барьсан." } },
  { q: { en: "How many stupas stand on the wall of Erdene Zuu?", mn: "Эрдэнэ Зуугийн хэрэм дээр хэдэн суварга бий вэ?" }, a: ["64", "108", "300"], ok: 1, why: { en: "108 is a sacred number in Buddhism.", mn: "Буддын шашинд 108 бол ариун тоо." } },
  { q: { en: "Who created the Soyombo script in 1686?", mn: "1686 онд Соёмбо үсгийг хэн зохиосон бэ?" }, a: [{ en: "Zanabazar", mn: "Өндөр гэгээн Занабазар" }, { en: "Chinggis Khaan", mn: "Чингис хаан" }, { en: "Abtai Sain Khan", mn: "Абтай сайн хан" }], ok: 0, why: { en: "Zanabazar, the first Jebtsundamba Khutagt, was also a great sculptor. The Soyombo symbol on our flag comes from this script.", mn: "Анхдугаар Богд Өндөр гэгээн Занабазар мөн агуу уран бүтээлч байсан. Төрийн далбаан дээрх Соёмбо тэмдэг энэ бичгээс гаралтай." } },
  { q: { en: "Which script is carved on the Kül Tegin and Bilge Khagan steles?", mn: "Күлтегин, Билгэ хааны гэрэлт хөшөөнд ямар бичгээр бичсэн бэ?" }, a: [{ en: "Old Turkic runic script", mn: "Эртний түрэг (руни) бичиг" }, { en: "Mongol script", mn: "Монгол бичиг" }, { en: "Latin script", mn: "Латин бичиг" }], ok: 0, why: { en: "These 8th-century steles in the Orkhon Valley are among the oldest Turkic texts.", mn: "Орхоны хөндийд буй VIII зууны эдгээр хөшөө түрэг хэлний хамгийн эртний бичгийн дурсгалуудын нэг." } },
  { q: { en: "Which extinct volcano stands next to Terkhiin Tsagaan Lake?", mn: "Тэрхийн Цагаан нуурын дэргэд орших унтарсан галт уул аль нь вэ?" }, a: [{ en: "Khorgo", mn: "Хорго" }, { en: "Otgontenger", mn: "Отгонтэнгэр" }, { en: "Bogd Khan", mn: "Богд хан" }], ok: 0, why: { en: "Lava from Khorgo blocked the Terkh River and formed the lake.", mn: "Хорго уулаас урссан лаав Тэрх голыг хааж, нуур үүссэн." } },
  { q: { en: "Where did Guillaume Boucher, the maker of Karakorum's Silver Tree, come from?", mn: "Хархорумын Мөнгөн модыг бүтээсэн Гийом Бушье хаанаас гаралтай вэ?" }, a: [{ en: "Paris", mn: "Парис" }, { en: "Baghdad", mn: "Багдад" }, { en: "Beijing", mn: "Бээжин" }], ok: 0, why: { en: "He was a Parisian goldsmith brought to Mongolia as a captive.", mn: "Тэрээр олзлогдон Монголд ирсэн Парисын алт мөнгөний дархан байв." } },
  { q: { en: "In which year did Mongolia declare its independence from the Qing dynasty?", mn: "Монгол Улс Чин улсаас тусгаар тогтнолоо хэдэн онд тунхагласан бэ?" }, a: ["1911", "1921", "1945"], ok: 0, why: { en: "On 29 December 1911 the Bogd Khaan was enthroned as head of an independent Mongolia.", mn: "1911 оны 12 дугаар сарын 29-нд Богд Жавзандамба хутагтыг тусгаар тогтносон Монгол Улсын хаанаар өргөмжилсөн." } },
  { q: { en: "When was Mongolia's first constitution adopted?", mn: "Монгол Улсын анхны Үндсэн хуулийг хэдэн онд баталсан бэ?" }, a: ["1924", "1960", "1992"], ok: 0, why: { en: "The first constitution was adopted in 1924; the current one dates from 1992.", mn: "Анхны Үндсэн хуулийг 1924 онд, одоогийн Үндсэн хуулийг 1992 онд баталсан." } },
  { q: { en: "In which year did Mongolia's peaceful democratic revolution take place?", mn: "Монголын тайван замын ардчилсан хувьсгал хэдэн онд болсон бэ?" }, a: ["1980", "1990", "2000"], ok: 1, why: { en: "In 1990 young people gathered peacefully on the square and Mongolia moved to democracy and a multi-party system.", mn: "1990 онд залуучуудын тайван жагсаал, цуглааны үр дүнд Монгол Улс ардчилсан, олон намын тогтолцоонд шилжсэн." } },
  { q: { en: "Which is the longest river that flows entirely within Mongolia?", mn: "Монгол Улсын нутаг дэвсгэрт бүхэлдээ урсдаг хамгийн урт гол аль нь вэ?" }, a: [{ en: "The Orkhon", mn: "Орхон" }, { en: "The Tuul", mn: "Туул" }, { en: "The Kherlen", mn: "Хэрлэн" }], ok: 0, why: { en: "The Orkhon flows for more than 1,100 km before joining the Selenge.", mn: "Орхон гол 1100 гаруй км урсаж Сэлэнгэ мөрөнд цутгадаг." } },
  { q: { en: "In which year was Karakorum destroyed by the Ming army?", mn: "Хархорумыг Мин улсын цэрэг хэдэн онд сүйтгэсэн бэ?" }, a: ["1254", "1380", "1585"], ok: 1, why: { en: "After 1380 the city lay in ruins; Erdene Zuu was later built beside them.", mn: "1380 оноос хойш хот балгас болж, хожим түүний дэргэд Эрдэнэ Зуу баригдсан." } },
  { q: { en: "Who founded Tövkhön Monastery on a rocky peak in 1653?", mn: "1653 онд хадан оргил дээр Төвхөн хийдийг хэн байгуулсан бэ?" }, a: [{ en: "Zanabazar", mn: "Занабазар" }, { en: "Abtai Sain Khan", mn: "Абтай сайн хан" }, { en: "Khubilai Khaan", mn: "Хубилай хаан" }], ok: 0, why: { en: "Zanabazar worked and created many of his sculptures there.", mn: "Занабазар тэнд бясалгаж, олон бүтээлээ туурвисан." } },
  { q: {"en": "Who was Chinggis Khaan's mother?", "mn": "Чингис хааны эх хэн бэ?"}, a: [{"en": "Hoelun", "mn": "Өэлүн"}, {"en": "Börte", "mn": "Бөртэ"}, {"en": "Mandukhai", "mn": "Мандухай"}], ok: 0, why: {"en": "Hoelun raised her children alone after Yesügei died; the Secret History praises her wisdom.", "mn": "Есүхэй баатар нас барсны дараа Өэлүн эх хүүхдүүдээ ганцаараа өсгөсөн. “Монголын нууц товчоо”-нд түүний мэргэн ухааныг магтан өгүүлдэг."} },
  { q: {"en": "Who was Chinggis Khaan's chief wife?", "mn": "Чингис хааны ахлах хатан хэн бэ?"}, a: [{"en": "Börte", "mn": "Бөртэ"}, {"en": "Hoelun", "mn": "Өэлүн"}, {"en": "Mandukhai", "mn": "Мандухай"}], ok: 0, why: {"en": "Börte üjin of the Khongirad was the mother of Jochi, Chagatai, Ögedei and Tolui.", "mn": "Хонгирад аймгийн Бөртэ үжин бол Зүчи, Цагаадай, Өгөдэй, Тулуйн эх."} },
  { q: {"en": "Who became Great Khan after Chinggis Khaan?", "mn": "Чингис хааны дараа их хаан ширээнд хэн суусан бэ?"}, a: [{"en": "Ögedei", "mn": "Өгөдэй"}, {"en": "Jochi", "mn": "Зүчи"}, {"en": "Tolui", "mn": "Тулуй"}], ok: 0, why: {"en": "Ögedei was enthroned in 1229 and built up Karakorum.", "mn": "Өгөдэй 1229 онд их хаан ширээнд суусан бөгөөд Хархорумыг нийслэл хот болгон байгуулсан."} },
  { q: {"en": "Who moved the capital from Karakorum to Daidu (Beijing)?", "mn": "Нийслэлийг Хархорумаас Дайду (Бээжин) руу хэн шилжүүлсэн бэ?"}, a: [{"en": "Khubilai Khaan", "mn": "Хубилай хаан"}, {"en": "Ögedei Khaan", "mn": "Өгөдэй хаан"}, {"en": "Möngke Khaan", "mn": "Мөнх хаан"}], ok: 0, why: {"en": "Khubilai named his state the Yuan in 1271 and ruled from Daidu.", "mn": "Хубилай 1271 онд улсаа Юань гэж нэрлэж, Дайдугаас захирчээ."} },
  { q: {"en": "In which year did the Yuan dynasty fall in China?", "mn": "Юань улсын Хятад дахь ноёрхол хэдэн онд дууссан бэ?"}, a: ["1260", "1368", "1911"], ok: 1, why: {"en": "In 1368 the Yuan court left Daidu and withdrew to the Mongolian steppe.", "mn": "1368 онд Юанийн ордон Дайдугаас гарч, монгол нутаг руу буцсан."} },
  { q: {"en": "Which grandson of Chinggis Khaan founded the Ilkhanate in Persia?", "mn": "Перс нутагт Ил хаант улсыг Чингис хааны аль ач байгуулсан бэ?"}, a: [{"en": "Hülegü", "mn": "Хүлэгү"}, {"en": "Batu", "mn": "Бат"}, {"en": "Khubilai", "mn": "Хубилай"}], ok: 0, why: {"en": "Hülegü, a son of Tolui, led the campaign to the west and founded the Ilkhanate.", "mn": "Тулуйн хүү Хүлэгү баруун зүгт аян дайн хийж Ил хаант улсыг байгуулсан."} },
  { q: {"en": "Who founded the Golden Horde?", "mn": "Алтан ордны улсыг хэн байгуулсан бэ?"}, a: [{"en": "Batu", "mn": "Бат"}, {"en": "Hülegü", "mn": "Хүлэгү"}, {"en": "Ögedei", "mn": "Өгөдэй"}], ok: 0, why: {"en": "Batu, a son of Jochi, ruled the western steppe from the Volga.", "mn": "Зүчийн хүү Бат Ижил мөрний хөвөөнөөс баруун зүгийн тал нутгийг захирчээ."} },
  { q: {"en": "Who reunited the Mongols at the end of the 15th century?", "mn": "XV зууны сүүлээр монголчуудыг дахин нэгтгэсэн хатан хэн бэ?"}, a: [{"en": "Mandukhai Setsen Khatan", "mn": "Мандухай сэцэн хатан"}, {"en": "Börte", "mn": "Бөртэ"}, {"en": "Hoelun", "mn": "Өэлүн"}], ok: 0, why: {"en": "Mandukhai placed young Dayan Khan on the throne and united the Mongols again.", "mn": "Мандухай бага насны Даян хааныг хаан ширээнд суулгаж, монголчуудыг дахин нэгтгэсэн."} },
  { q: {"en": "Which khan gave the title “Dalai Lama” in 1578?", "mn": "1578 онд “Далай лам” цолыг аль хаан өргөсөн бэ?"}, a: [{"en": "Altan Khan of the Tümed", "mn": "Түмэдийн Алтан хаан"}, {"en": "Abtai Sain Khan", "mn": "Абтай сайн хан"}, {"en": "Ligdan Khan", "mn": "Лигдэн хаан"}], ok: 0, why: {"en": "“Dalai” is a Mongolian word meaning “ocean”.", "mn": "“Далай” гэдэг нь “их тэнгис” гэсэн утгатай монгол үг."} },
  { q: {"en": "Under which khan was the Buddhist canon Ganjur translated into Mongolian (1628–29)?", "mn": "1628–1629 онд Ганжуурыг аль хааны үед монгол хэлэнд орчуулсан бэ?"}, a: [{"en": "Ligdan Khan", "mn": "Лигдэн хаан"}, {"en": "Altan Khan", "mn": "Алтан хаан"}, {"en": "Abtai Sain Khan", "mn": "Абтай сайн хан"}], ok: 0, why: {"en": "Ligdan Khan gathered scholars to translate the whole Ganjur.", "mn": "Лигдэн хаан эрдэмтдийг цуглуулж Ганжуурыг бүрэн орчуулуулжээ."} },
  { q: {"en": "Who wrote the 17th-century chronicle “Altan Tobchi”?", "mn": "XVII зууны “Алтан товч” хэмээх түүхэн бичгийг хэн зохиосон бэ?"}, a: [{"en": "Luvsandanzan", "mn": "Лувсанданзан"}, {"en": "Zanabazar", "mn": "Занабазар"}, {"en": "Rashid al-Din", "mn": "Рашид ад-Дин"}], ok: 0, why: {"en": "Altan Tobchi preserves most of the Secret History of the Mongols.", "mn": "“Алтан товч”-нд “Монголын нууц товчоо”-ны ихэнх хэсэг хадгалагдан үлджээ."} },
  { q: {"en": "In which year was the Khalkha law code “Khalkh Juram” adopted?", "mn": "“Халх журам” хуулийг хэдэн онд баталсан бэ?"}, a: ["1640", "1709", "1924"], ok: 1, why: {"en": "1640 is the Mongol-Oirat “Ikh Tsaaz”; 1924 is the first constitution.", "mn": "1640 бол “Монгол-Ойрадын Их цааз”, 1924 бол анхны Үндсэн хууль."} },
  { q: {"en": "What was the “örtöö” system?", "mn": "“Өртөө” гэж юу вэ?"}, a: [{"en": "A relay network of horse stations", "mn": "Унаа сольж явдаг өртөө харилцааны сүлжээ"}, {"en": "A tax on livestock", "mn": "Малын татвар"}, {"en": "A military rank", "mn": "Цэргийн цол"}], ok: 0, why: {"en": "Envoys changed horses at each station and carried news across the empire very fast.", "mn": "Элч нар өртөө бүрт морио сольж, мэдээг эзэнт гүрэн даяар маш хурдан хүргэдэг байв."} },
  { q: {"en": "What did a “gerege” (paiza) give the person who carried it?", "mn": "“Гэрэгэ” (пайз) барьсан хүн ямар эрхтэй байсан бэ?"}, a: [{"en": "The right to use the relay stations", "mn": "Өртөөгөөр унаа, хүнс авах эрх"}, {"en": "Freedom from army service", "mn": "Цэргийн албанаас чөлөөлөгдөх"}, {"en": "The right to trade salt", "mn": "Давс худалдах эрх"}], ok: 0, why: {"en": "A gerege was a gold, silver or wooden tablet issued by the khan.", "mn": "Гэрэгэ бол хаанаас олгодог алт, мөнгө, модон пайз."} },
  { q: {"en": "In which year was Chinggis Khaan born, by tradition?", "mn": "Уламжлалаар Чингис хаан хэдэн онд төрсөн гэж үздэг вэ?"}, a: ["1162", "1206", "1227"], ok: 0, why: {"en": "1206 is when he became Chinggis Khaan, and 1227 is the year he died.", "mn": "1206 онд Чингис хаан хэмээн өргөмжлөгдөж, 1227 онд таалал төгссөн."} },
  { q: {"en": "In which year was the Secret History of the Mongols written, by tradition?", "mn": "“Монголын нууц товчоо”-г уламжлалаар хэдэн онд бичсэн гэж үздэг вэ?"}, a: ["1162", "1240", "1585"], ok: 1, why: {"en": "Its last line names a Year of the Rat, usually read as 1240.", "mn": "Төгсгөлд нь хулгана жил гэж бичсэн нь ихэвчлэн 1240 он гэж тайлбарлагддаг."} },
  { q: {"en": "In which year did the People's Revolution take place?", "mn": "Ардын хувьсгал хэдэн онд болсон бэ?"}, a: ["1911", "1921", "1990"], ok: 1, why: {"en": "1911 is the declaration of independence and 1990 the democratic revolution.", "mn": "1911 онд тусгаар тогтнолоо тунхагласан бол 1990 онд ардчилсан хувьсгал болсон."} },
  { q: {"en": "Which leader is linked with the 1921 revolution?", "mn": "1921 оны хувьсгалын удирдагчдын нэг хэн бэ?"}, a: [{"en": "D. Sükhbaatar", "mn": "Д. Сүхбаатар"}, {"en": "Zanabazar", "mn": "Занабазар"}, {"en": "Abtai Sain Khan", "mn": "Абтай сайн хан"}], ok: 0, why: {"en": "The central square of Ulaanbaatar was named after him.", "mn": "Улаанбаатарын төв талбайг түүний нэрээр нэрлэжээ."} },
  { q: {"en": "In which year was Niislel Khüree renamed Ulaanbaatar?", "mn": "Нийслэл Хүрээг хэдэн онд Улаанбаатар гэж нэрлэсэн бэ?"}, a: ["1911", "1924", "1990"], ok: 1, why: {"en": "The name means “Red Hero”.", "mn": "Нэр нь “улаан баатар” гэсэн утгатай."} },
  { q: {"en": "In which year was the Battle of Khalkhin Gol?", "mn": "Халхын голын байлдаан хэдэн онд болсон бэ?"}, a: ["1921", "1939", "1945"], ok: 1, why: {"en": "Mongolian and Soviet troops defeated the Japanese army in 1939.", "mn": "1939 онд Монгол, Зөвлөлтийн цэрэг Японы армийг ялсан."} },
  { q: {"en": "In which year did Mongolia join the United Nations?", "mn": "Монгол Улс НҮБ-д хэдэн онд элссэн бэ?"}, a: ["1945", "1961", "1990"], ok: 1, why: {"en": "Mongolia became a UN member on 27 October 1961.", "mn": "Монгол Улс 1961 оны 10 дугаар сарын 27-нд НҮБ-ын гишүүн болсон."} },
  { q: {"en": "In which year was Mongolia's current Constitution adopted?", "mn": "Монгол Улсын одоогийн Үндсэн хуулийг хэдэн онд баталсан бэ?"}, a: ["1924", "1960", "1992"], ok: 2, why: {"en": "It was adopted after the democratic revolution, in 1992.", "mn": "Ардчилсан хувьсгалын дараа 1992 онд баталсан."} },
  { q: {"en": "When was the tögrög introduced as Mongolia's currency?", "mn": "Төгрөгийг Монгол Улсын мөнгөн тэмдэгт болгон хэдэн онд гаргасан бэ?"}, a: ["1911", "1925", "1990"], ok: 1, why: {"en": "The tögrög has been Mongolia's currency since 1925.", "mn": "Төгрөг 1925 оноос хойш Монгол Улсын мөнгөн тэмдэгт юм."} },
  { q: {"en": "How many aimags (provinces) does Mongolia have today?", "mn": "Монгол Улс өнөөдөр хэдэн аймагтай вэ?"}, a: ["18", "21", "24"], ok: 1, why: {"en": "Each aimag is divided into soums.", "mn": "Аймаг бүр сумдад хуваагддаг."} },
  { q: {"en": "Which of these is not one of the “three manly games” of Naadam?", "mn": "Аль нь “эрийн гурван наадам”-д ордоггүй вэ?"}, a: [{"en": "Chess", "mn": "Шатар"}, {"en": "Wrestling", "mn": "Бөх"}, {"en": "Archery", "mn": "Сур харваа"}], ok: 0, why: {"en": "The three manly games are wrestling, horse racing and archery.", "mn": "Эрийн гурван наадам нь бөх, морин уралдаан, сур харваа."} },
  { q: {"en": "On which day does the National Naadam begin?", "mn": "Үндэсний их баяр наадам хэдний өдөр эхэлдэг вэ?"}, a: [{"en": "11 July", "mn": "7 дугаар сарын 11"}, {"en": "29 December", "mn": "12 дугаар сарын 29"}, {"en": "1 June", "mn": "6 дугаар сарын 1"}], ok: 0, why: {"en": "Naadam marks the anniversary of the 1921 revolution.", "mn": "Үндэсний их баяр наадмыг 1921 оны Ардын хувьсгалын ойгоор тэмдэглэдэг."} },
  { q: {"en": "What is the highest peak in Mongolia?", "mn": "Монголын хамгийн өндөр оргил аль нь вэ?"}, a: [{"en": "Khüiten Peak", "mn": "Хүйтэн оргил"}, {"en": "Otgontenger", "mn": "Отгонтэнгэр"}, {"en": "Bogd Khan", "mn": "Богд хан"}], ok: 0, why: {"en": "Khüiten Peak in the Altai Tavan Bogd is 4,374 m high.", "mn": "Алтай Таван Богдын Хүйтэн оргил 4374 метр өндөр."} },
  { q: {"en": "Which lake holds most of Mongolia's fresh water?", "mn": "Монголын цэнгэг усны ихэнх нь аль нууранд байдаг вэ?"}, a: [{"en": "Khövsgöl", "mn": "Хөвсгөл"}, {"en": "Uvs", "mn": "Увс"}, {"en": "Ugii", "mn": "Өгий"}], ok: 0, why: {"en": "Uvs is the largest by area, but it is salty.", "mn": "Талбайгаараа хамгийн том нь Увс нуур боловч ус нь давстай."} },
  { q: {"en": "Which is Mongolia's largest lake by area?", "mn": "Талбайгаараа Монголын хамгийн том нуур аль нь вэ?"}, a: [{"en": "Uvs", "mn": "Увс"}, {"en": "Khövsgöl", "mn": "Хөвсгөл"}, {"en": "Terkhiin Tsagaan", "mn": "Тэрхийн Цагаан"}], ok: 0, why: {"en": "Uvs Lake is salty and lies in the far west.", "mn": "Увс нуур давстай бөгөөд баруун хязгаарт оршдог."} },
  { q: {"en": "In which direction is the traditional Mongol script written?", "mn": "Монгол бичгийг ямар чиглэлд бичдэг вэ?"}, a: [{"en": "Top to bottom", "mn": "Дээрээс доош"}, {"en": "Right to left", "mn": "Баруунаас зүүн тийш"}, {"en": "In a circle", "mn": "Тойруулан"}], ok: 0, why: {"en": "The vertical lines run from left to right.", "mn": "Мөр бүрийг дээрээс доош бичиж, мөрүүд зүүнээс баруун тийш үргэлжилнэ."} },
  { q: {"en": "What is Bayanzag (the Flaming Cliffs) famous for?", "mn": "Баянзаг юугаараа алдартай вэ?"}, a: [{"en": "Dinosaur eggs", "mn": "Үлэг гүрвэлийн өндөг"}, {"en": "A waterfall", "mn": "Хүрхрээ"}, {"en": "An ancient capital", "mn": "Эртний нийслэл"}], ok: 0, why: {"en": "In 1923 an expedition found the first known dinosaur eggs there.", "mn": "1923 онд экспедиц тэндээс шинжлэх ухаанд анх удаа үлэг гүрвэлийн өндөг олсон."} },
  { q: {"en": "Which state had its capital at Khar Balgas in the Orkhon Valley?", "mn": "Орхоны хөндийн Хар балгас аль улсын нийслэл байсан бэ?"}, a: [{"en": "The Uighur Khaganate", "mn": "Уйгурын хаант улс"}, {"en": "The Turkic Khaganate", "mn": "Түрэгийн хаант улс"}, {"en": "The Khitan state", "mn": "Кидан улс"}], ok: 0, why: {"en": "The Uighur Khaganate lasted from 744 to 840.", "mn": "Уйгурын хаант улс 744–840 онд оршсон."} },
  { q: {"en": "Who built the walls of Karakorum in 1235?", "mn": "1235 онд Хархорумыг хэн хэрэмжүүлсэн бэ?"}, a: [{"en": "Ögedei Khaan", "mn": "Өгөдэй хаан"}, {"en": "Khubilai Khaan", "mn": "Хубилай хаан"}, {"en": "Abtai Sain Khan", "mn": "Абтай сайн хан"}], ok: 0, why: {"en": "He also built the Tümen Amgalan palace.", "mn": "Тэрээр Түмэн амгалан ордныг мөн бариулсан."} },
  { q: {"en": "Which way does the door of a ger traditionally face?", "mn": "Гэрийн хаалгыг уламжлалаар аль зүг рүү харуулдаг вэ?"}, a: [{"en": "South", "mn": "Урд зүг"}, {"en": "North", "mn": "Хойд зүг"}, {"en": "West", "mn": "Баруун зүг"}], ok: 0, why: {"en": "Facing south keeps out the cold north wind and lets in the sun.", "mn": "Хаалгыг урагш харуулснаар хойд зүгийн хүйтэн салхинаас хамгаалж, нарны гэрэл гэрт ордог."} },
  { q: {"en": "What is the round opening at the top of a ger called?", "mn": "Гэрийн оройн дугуй цонхыг юу гэдэг вэ?"}, a: [{"en": "Toono", "mn": "Тооно"}, {"en": "Uni", "mn": "Унь"}, {"en": "Khana", "mn": "Хана"}], ok: 0, why: {"en": "Uni are the roof poles and khana the lattice walls.", "mn": "Унь нь гэрийн дээврийн мод, хана нь гэрийн эвхмэл торон хүрээ юм."} },
  { q: {"en": "What is the Lunar New Year called in Mongolia?", "mn": "Монголын билгийн тооллын шинэ жилийг юу гэдэг вэ?"}, a: [{"en": "Tsagaan Sar", "mn": "Цагаан сар"}, {"en": "Naadam", "mn": "Наадам"}, {"en": "Ovoo takhilga", "mn": "Овоо тахилга"}], ok: 0, why: {"en": "“Tsagaan Sar” means “White Month”.", "mn": "“Цагаан сар” нь билгийн тооллын шинэ жилийн баяр бөгөөд цагаан өнгө нь ариун, сайн сайхныг бэлгэддэг."} },
  { q: {"en": "Which game was added to UNESCO's intangible heritage list in 2014?", "mn": "2014 онд ЮНЕСКО-гийн биет бус соёлын өвд аль тоглоом бүртгэгдсэн бэ?"}, a: [{"en": "Knucklebone shooting", "mn": "Шагай харваа"}, {"en": "Chess", "mn": "Шатар"}, {"en": "Horse racing", "mn": "Морин уралдаан"}], ok: 0, why: {"en": "Players flick small marble tiles at knucklebone targets.", "mn": "Шагай харваанд гантигаар хийсэн жижиг сумаар шагайн байг товшин харвадаг."} },
  { q: {"en": "Which tribe poisoned Temüjin's father Yesügei, according to the Secret History?", "mn": "“Нууц товчоо”-нд өгүүлснээр Тэмүжиний эцэг Есүхэйг аль аймгийнхан хордуулсан бэ?"}, a: [{"en": "The Tatars", "mn": "Татар"}, {"en": "The Merkits", "mn": "Мэргэд"}, {"en": "The Naimans", "mn": "Найман"}], ok: 0, why: {"en": "Yesügei was poisoned on his way home from the Khongirad.", "mn": "Есүхэй Хонгирадаас буцах замдаа татаруудад хордуулагдсан."} },
];

// ---------------------------------------------------------------- timeline
const EVENTS = [
  { y: 735, en: "A stele is raised for Bilge Khagan at Khöshöö Tsaidam", mn: "Хөшөө Цайдамд Билгэ хааны хөшөөг босгов" },
  { y: 840, en: "The Kyrgyz destroy the Uighur capital Ordu-Baliq", mn: "Киргизүүд Уйгурын нийслэл Ордубалыкийг сүйтгэв" },
  { y: 1893, en: "Vilhelm Thomsen deciphers the Old Turkic runes", mn: "Вильгельм Томсен эртний түрэг бичгийг тайлав" },
  { y: 2015, en: "Burkhan Khaldun becomes a UNESCO World Heritage site", mn: "Бурхан Халдун уул ЮНЕСКО-гийн Дэлхийн өвд бүртгэгдэв" },
  { y: -209, en: "Modu Chanyu founds the Xiongnu state", mn: "Модун шаньюй Хүннү гүрнийг байгуулав" },
  { y: 732, en: "A stele is raised for Kül Tegin in the Orkhon Valley", mn: "Орхоны хөндийд Күлтегиний хөшөөг босгов" },
  { y: 1206, en: "The Great Mongol State is founded", mn: "Их Монгол Улс байгуулагдав" },
  { y: 1220, en: "Karakorum is chosen as the capital", mn: "Хархорумыг нийслэл болгов" },
  { y: 1254, en: "William of Rubruck visits Karakorum", mn: "Гийом де Рубрук Хархорумд ирэв" },
  { y: 1380, en: "Karakorum is destroyed", mn: "Хархорум сүйрэв" },
  { y: 1585, en: "Erdene Zuu Monastery is founded", mn: "Эрдэнэ Зуу хийд байгуулагдав" },
  { y: 1653, en: "Zanabazar founds Tövkhön Monastery", mn: "Занабазар Төвхөн хийдийг байгуулав" },
  { y: 1686, en: "Zanabazar creates the Soyombo script", mn: "Занабазар Соёмбо үсгийг зохиов" },
  { y: 1911, en: "Mongolia declares independence", mn: "Монгол Улс тусгаар тогтнолоо тунхаглав" },
  { y: 1924, en: "The first constitution is adopted", mn: "Анхны Үндсэн хууль батлагдав" },
  { y: 1990, en: "The democratic revolution", mn: "Ардчилсан хувьсгал" },
  { y: 2004, en: "The Orkhon Valley becomes World Heritage", mn: "Орхоны хөндий Дэлхийн өвд бүртгэгдэв" },
  { y: 552, en: "The Turkic Khaganate is founded", mn: "Түрэгийн хаант улс байгуулагдав" },
  { y: 744, en: "The Uighur Khaganate is founded", mn: "Уйгурын хаант улс байгуулагдав" },
  { y: 1162, en: "Temüjin is born (traditional date)", mn: "Тэмүжин мэндлэв (уламжлалт он)" },
  { y: 1227, en: "Chinggis Khaan dies", mn: "Чингис хаан таалал төгсөв" },
  { y: 1229, en: "Ögedei becomes Great Khan", mn: "Өгөдэй их хаан ширээнд суув" },
  { y: 1235, en: "Karakorum gets its walls and palace", mn: "Хархорумыг хэрэмжүүлж, ордон барив" },
  { y: 1240, en: "The Secret History is written (traditional date)", mn: "“Нууц товчоо” бичигдэв (уламжлалт он)" },
  { y: 1260, en: "Khubilai becomes khan", mn: "Хубилай хаан ширээнд суув" },
  { y: 1271, en: "Khubilai names his state the Yuan", mn: "Хубилай улсаа Юань гэж нэрлэв" },
  { y: 1368, en: "The Yuan court leaves Daidu", mn: "Юанийн ордон Дайдугаас гарав" },
  { y: 1578, en: "Altan Khan gives the title “Dalai Lama”", mn: "Алтан хаан “Далай лам” цол өргөв" },
  { y: 1628, en: "The Ganjur is translated into Mongolian (1628–29)", mn: "Ганжуурыг монголчлон орчуулав (1628–29)" },
  { y: 1639, en: "Örgöö (later Khüree) is founded for Zanabazar", mn: "Занабазарт зориулан Өргөө (хожмын Хүрээ) байгуулав" },
  { y: 1640, en: "The Mongol-Oirat code “Ikh Tsaaz” is adopted", mn: "“Монгол-Ойрадын Их цааз” батлагдав" },
  { y: 1691, en: "The Khalkha come under the Qing at Dolon Nuur", mn: "Долоннуурын чуулганаар Халх Чин улсын харьяанд оров" },
  { y: 1709, en: "The law code “Khalkh Juram” is adopted", mn: "“Халх журам” батлагдав" },
  { y: 1915, en: "The Kyakhta treaty is signed", mn: "Хиагтын гэрээ байгуулагдав" },
  { y: 1921, en: "The People's Revolution", mn: "Ардын хувьсгал" },
  { y: 1923, en: "Dinosaur eggs are found at Bayanzag", mn: "Баянзагаас үлэг гүрвэлийн өндөг олдов" },
  { y: 1925, en: "The tögrög is introduced", mn: "Төгрөг гүйлгээнд гарав" },
  { y: 1939, en: "The Battle of Khalkhin Gol", mn: "Халхын голын байлдаан" },
  { y: 1941, en: "The decision to adopt the Cyrillic script", mn: "Кирилл үсэг хэрэглэх шийдвэр гарав" },
  { y: 1961, en: "Mongolia joins the United Nations", mn: "Монгол Улс НҮБ-д элсэв" },
  { y: 1992, en: "The current Constitution is adopted", mn: "Одоогийн Үндсэн хууль батлагдав" },
  { y: 2010, en: "Naadam is added to UNESCO's intangible heritage list", mn: "Наадам ЮНЕСКО-гийн биет бус соёлын өвд бүртгэгдэв" },
];

// ---------------------------------------------------------------- UI text
const UI = {
  legend: { en: "Legend", mn: "Домог" },
  history: { en: "History", mn: "Түүх" },
  nature: { en: "Nature", mn: "Байгаль" },
  tradition: { en: "Tradition", mn: "Уламжлал" },
  all: { en: "All", mn: "Бүгд" },
  read: { en: "Read the story", mn: "Ном унших" },
  readAgain: { en: "Read again", mn: "Дахин унших" },
  done: { en: "Read", mn: "Уншсан" },
  pages: { en: "pages", mn: "хуудас" },
  progress: { en: "{n} of {t} stories read", mn: "Уншсан ном: {n} / {t}" },
  page: { en: "Page {n} of {t}", mn: "Хуудас {n} / {t}" },
  prev: { en: "Back", mn: "Өмнөх" },
  next: { en: "Next", mn: "Дараах" },
  finish: { en: "Finish", mn: "Дуусгах" },
  close: { en: "Close", mn: "Хаах" },
  fact: { en: "Did you know?", mn: "Мэдэх үү?" },
  check: { en: "Check yourself", mn: "Шалгаад үзье" },
  right: { en: "Correct!", mn: "Зөв!" },
  wrong: { en: "Not quite. The answer is: ", mn: "Буруу байна. Зөв хариулт: " },
  question: { en: "Question {n} of {t}", mn: "Асуулт {n} / {t}" },
  score: { en: "Score", mn: "Оноо" },
  nextQ: { en: "Next question", mn: "Дараагийн асуулт" },
  results: { en: "See results", mn: "Дүнгээ харах" },
  again: { en: "Play again", mn: "Дахин тоглох" },
  start: { en: "Start", mn: "Эхлэх" },
  quizEnd: { en: "You answered {n} of {t} correctly.", mn: "Зөв хариулт: {n} / {t}." },
  great: { en: "Excellent, a true history expert!", mn: "Гайхалтай! Та жинхэнэ түүхч юм." },
  good: { en: "Well done! Read a story or two and try again.", mn: "Сайн байна! Хэдэн ном уншаад дахин оролдоод үзээрэй." },
  keep: { en: "A good start. The picture books above hold many of the answers.", mn: "Сайн эхлэл. Ихэнх асуултын хариулт дээрх зурагт номнуудад бий." },
  tlHint: { en: "Tap the events from the oldest to the newest.", mn: "Хамгийн эртний үйл явдлаас эхлэн дарааллаар нь дарна уу." },
  tlYours: { en: "Your order", mn: "Таны дараалал" },
  tlEmpty: { en: "Tap an event below to place it here.", mn: "Доорх үйл явдлуудаас сонгож энд байрлуулна уу." },
  undo: { en: "Undo", mn: "Буцаах" },
  tlEnd: { en: "{n} of {t} in the right place.", mn: "Зөв байрласан: {n} / {t}." },
  bc: { en: "{y} BC", mn: "МЭӨ {y}" },
  horse: { en: "GRIT horse at", mn: "GRIT морь" },
  wgToday: { en: "Today's word №{n} is waiting for you.", mn: "Өнөөдрийн №{n} үг таныг хүлээж байна." },
  wgWon: { en: "You solved today's word №{n} in {g}/6. Come back tomorrow!", mn: "Та өнөөдрийн №{n} үгийг {g}/6 оролдлогоор таалаа. Маргааш дахин ирээрэй!" },
  wgLost: { en: "Today's word №{n} got away. A new one comes tomorrow.", mn: "Өнөөдрийн №{n} үгийг таасангүй. Маргааш шинэ үг гарна." },
  wgPlaying: { en: "Today's word №{n}: {g}/6 tries used. Keep going!", mn: "Өнөөдрийн №{n} үг: {g}/6 оролдлого хийсэн. Үргэлжлүүлээрэй!" },
  mapLabel: { en: "Illustrated map of the heritage sites. Choose a place to open its picture book.", mn: "Өв соёлын газруудын зурагт газрын зураг. Газар сонгож зурагт номыг нь нээнэ үү." },
};

(function () {
  const art = window.HERITAGE_ART;
  const root = document.documentElement;
  const lang = () => (root.getAttribute("data-lang") === "mn" ? "mn" : "en");
  const t = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang()] != null ? o[lang()] : o.en);
  const fmt = (key, vars) => t(UI[key]).replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  const year = (y) => (y < 0 ? fmt("bc", { y: -y }) : String(y));
  const shuffle = (a) => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  // A finished illustration in assets/img/heritage/<name>.jpg replaces the
  // code-drawn SVG of the same name. Add the name here when the file is added.
  const IMAGES = [];
  const scene = (name) =>
    IMAGES.includes(name)
      ? `<img src="../assets/img/heritage/${name}.jpg" alt="" loading="lazy" decoding="async">`
      : art.SCENES[name]
        ? art.SCENES[name]()
        : "";

  // Which stories this visitor has finished (only in this browser).
  const KEY = "grit-heritage-read";
  let done = [];
  try {
    done = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch (e) {}
  const markDone = (id) => {
    if (done.includes(id)) return;
    done.push(id);
    try {
      localStorage.setItem(KEY, JSON.stringify(done));
    } catch (e) {}
  };

  // ------------------------------------------------------------ story cards
  const grid = document.getElementById("stories");
  const filters = document.getElementById("story-filters");
  const progress = document.getElementById("story-progress");
  let filter = "all";

  function renderFilters() {
    if (!filters) return;
    filters.innerHTML = ["all", "legend", "history", "nature", "tradition"]
      .map((k) => `<button type="button" class="chip${filter === k ? " is-active" : ""}" data-filter="${k}" aria-pressed="${filter === k}">${t(UI[k])}</button>`)
      .join("");
  }

  // painted covers (Higgsfield, in the style of Mongol zurag); books without one keep their drawn scene
  const COVER_IMG = new Set(["es", "terkh", "taikhar", "karakorum", "erdenezuu", "orkhon", "ugii", "khoshoo", "kharbalgas", "burkhan", "deluun", "khudoo"]);
  function renderCards() {
    if (!grid) return;
    grid.innerHTML = STORIES.filter((s) => filter === "all" || s.kind === filter)
      .map((s) => {
        const read = done.includes(s.id);
        return `<article class="story">
          <button type="button" class="story__art" data-open="${s.id}" aria-label="${t(UI.read)}: ${t(s.title)}">${COVER_IMG.has(s.id) ? `<img src="/assets/img/books/${s.id}.webp?v=1" alt="" loading="lazy" decoding="async" width="800" height="500">` : scene(s.cover)}${read ? `<span class="story__done">✓ ${t(UI.done)}</span>` : ""}</button>
          <div class="story__body">
            <p class="story__meta"><span class="story__kind story__kind--${s.kind}">${t(UI[s.kind])}</span><span>${t(s.place)}</span></p>
            <h3 class="story__title">${t(s.title)}</h3>
            <p class="story__text">${t(s.blurb)}</p>
            <button type="button" class="story__link" data-open="${s.id}">${t(read ? UI.readAgain : UI.read)}</button>
          </div>
        </article>`;
      })
      .join("");
    if (progress) {
      const n = STORIES.filter((s) => done.includes(s.id)).length;
      progress.innerHTML = `<span class="hprogress__bar"><span style="width:${(n / STORIES.length) * 100}%"></span></span>${fmt("progress", { n, t: STORIES.length })}`;
    }
  }

  filters &&
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("[data-filter]");
      if (!b) return;
      filter = b.dataset.filter;
      renderFilters();
      renderCards();
    });
  grid &&
    grid.addEventListener("click", (e) => {
      const b = e.target.closest("[data-open]");
      if (b) openBook(b.dataset.open);
    });

  // ------------------------------------------------------------ book reader
  const dlg = document.getElementById("hbook");
  let story = null,
    page = 0,
    picked = null;

  function openBook(id) {
    story = STORIES.find((s) => s.id === id);
    if (!story || !dlg) return;
    page = 0;
    picked = null;
    renderBook();
    if (dlg.showModal) dlg.showModal();
    else dlg.setAttribute("open", "");
    document.body.classList.add("hbook-open");
    dlg.querySelector("[data-book-next]")?.focus();
  }

  function closeBook() {
    if (!dlg) return;
    if (dlg.close) dlg.close();
    else dlg.removeAttribute("open");
  }
  dlg &&
    dlg.addEventListener("close", () => {
      document.body.classList.remove("hbook-open");
      story = null;
    });

  function renderBook() {
    if (!story) return;
    const total = story.pages.length + 1; // + the question page
    const last = page === total - 1;
    let art = "",
      body = "";
    if (!last) {
      const p = story.pages[page];
      art = scene(p.scene);
      body = `${p.fact ? `<p class="hbook__fact">${t(UI.fact)}</p>` : ""}<p class="hbook__text">${t(p)}</p>`;
    } else {
      const c = story.check;
      art = scene(story.cover);
      body =
        `<p class="hbook__fact">${t(UI.check)}</p><p class="hbook__q">${t(c.q)}</p><div class="hbook__opts">` +
        c.a
          .map((a, i) => {
            const cls = picked == null ? "" : i === c.ok ? " is-right" : i === picked ? " is-wrong" : "";
            return `<button type="button" class="opt${cls}" data-pick="${i}"${picked != null ? " disabled" : ""}>${t(a)}</button>`;
          })
          .join("") +
        `</div>` +
        (picked != null ? `<p class="hbook__verdict">${picked === c.ok ? t(UI.right) : t(UI.wrong) + t(c.a[c.ok])}</p>` : "");
    }
    dlg.innerHTML = `<div class="hbook__inner">
      <header class="hbook__head">
        <div><p class="hbook__place">${t(story.place)}</p><h2 class="hbook__title">${t(story.title)}</h2></div>
        <button type="button" class="hbook__close" data-book-close aria-label="${t(UI.close)}">×</button>
      </header>
      <div class="hbook__page" data-swipe>
        <div class="hbook__art">${art}</div>
        <div class="hbook__body" aria-live="polite">${body}</div>
      </div>
      <footer class="hbook__foot">
        <button type="button" class="btn btn--outline btn--small" data-book-prev${page === 0 ? " disabled" : ""}>${t(UI.prev)}</button>
        <div class="hbook__dots" aria-label="${fmt("page", { n: page + 1, t: total })}">${Array.from({ length: total }, (_, i) => `<span class="${i === page ? "is-on" : ""}"></span>`).join("")}</div>
        <button type="button" class="btn btn--dark btn--small" data-book-next${last && picked == null ? " disabled" : ""}>${last ? t(UI.finish) : t(UI.next)}</button>
      </footer>
    </div>`;
  }

  function go(d) {
    if (!story) return;
    const total = story.pages.length + 1;
    if (page === total - 1 && d > 0) {
      if (picked == null) return;
      markDone(story.id);
      renderCards();
      closeBook();
      return;
    }
    page = Math.max(0, Math.min(total - 1, page + d));
    renderBook();
  }

  if (dlg) {
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg) return closeBook(); // click on the backdrop
      if (e.target.closest("[data-book-close]")) return closeBook();
      if (e.target.closest("[data-book-prev]")) return go(-1);
      if (e.target.closest("[data-book-next]")) return go(1);
      const p = e.target.closest("[data-pick]");
      if (p && picked == null) {
        picked = +p.dataset.pick;
        // points for a right answer to a book's question (counted once per book)
        if (picked === story.check.ok) window.GRIT_TU?.award("book", 1, 1, story.id);
        renderBook();
        dlg.querySelector("[data-book-next]")?.focus();
      }
    });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    });
    let x0 = null;
    dlg.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    dlg.addEventListener("touchend", (e) => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  // ------------------------------------------------------------ quiz game
  const quizEl = document.getElementById("quiz");
  const QN = 8;
  let quiz = null;

  function newQuiz() {
    quiz = {
      list: shuffle(QUIZ)
        .slice(0, QN)
        .map((q) => {
          const order = shuffle(q.a.map((_, i) => i));
          return { ...q, order };
        }),
      i: 0,
      score: 0,
      picked: null,
      over: false,
    };
  }

  function renderQuiz() {
    if (!quizEl) return;
    if (!quiz) {
      quizEl.innerHTML = `<div class="game__start">${scene("game-quiz")}<button type="button" class="btn btn--dark" data-quiz="start">${t(UI.start)}</button></div>`;
      return;
    }
    const n = quiz.list.length;
    if (quiz.over) {
      const r = quiz.score / n;
      quizEl.innerHTML = `<div class="game__end">
        <p class="game__big">${quiz.score}<small> / ${n}</small></p>
        <p>${fmt("quizEnd", { n: quiz.score, t: n })}</p>
        <p class="game__note">${t(r >= 0.85 ? UI.great : r >= 0.5 ? UI.good : UI.keep)}</p>
        <button type="button" class="btn btn--dark" data-quiz="start">${t(UI.again)}</button>
      </div>`;
      return;
    }
    const q = quiz.list[quiz.i];
    quizEl.innerHTML = `<div class="game__bar"><span>${fmt("question", { n: quiz.i + 1, t: n })}</span><span>${t(UI.score)}: ${quiz.score}</span></div>
      <div class="game__track"><span style="width:${(quiz.i / n) * 100}%"></span></div>
      <p class="game__q">${t(q.q)}</p>
      <div class="game__opts">${q.order
        .map((i) => {
          const cls = quiz.picked == null ? "" : i === q.ok ? " is-right" : i === quiz.picked ? " is-wrong" : "";
          return `<button type="button" class="opt${cls}" data-qpick="${i}"${quiz.picked != null ? " disabled" : ""}>${t(q.a[i])}</button>`;
        })
        .join("")}</div>
      ${
        quiz.picked != null
          ? `<div class="game__why" aria-live="polite"><strong>${quiz.picked === q.ok ? t(UI.right) : t(UI.wrong) + t(q.a[q.ok])}</strong> ${t(q.why)}</div>
             <button type="button" class="btn btn--dark btn--small" data-quiz="next">${quiz.i === n - 1 ? t(UI.results) : t(UI.nextQ)}</button>`
          : ""
      }`;
  }

  quizEl &&
    quizEl.addEventListener("click", (e) => {
      const a = e.target.closest("[data-quiz]");
      if (a && a.dataset.quiz === "start") {
        newQuiz();
        renderQuiz();
        quizEl.querySelector(".opt")?.focus();
        return;
      }
      if (a && a.dataset.quiz === "next") {
        quiz.i++;
        quiz.picked = null;
        if (quiz.i >= quiz.list.length) {
          quiz.over = true;
          window.GRIT_TU?.award("quiz", quiz.score, quiz.list.length);
        }
        renderQuiz();
        (quizEl.querySelector(".opt") || quizEl.querySelector("button"))?.focus();
        return;
      }
      const p = e.target.closest("[data-qpick]");
      if (p && quiz && quiz.picked == null) {
        quiz.picked = +p.dataset.qpick;
        if (quiz.picked === quiz.list[quiz.i].ok) quiz.score++;
        renderQuiz();
        quizEl.querySelector('[data-quiz="next"]')?.focus();
      }
    });

  // ------------------------------------------------------------ timeline game
  const tlEl = document.getElementById("timeline");
  const TN = 5;
  let tl = null;

  function newTimeline() {
    tl = { pool: shuffle(EVENTS).slice(0, TN), placed: [], over: false };
  }

  function renderTimeline() {
    if (!tlEl) return;
    if (!tl) {
      tlEl.innerHTML = `<div class="game__start">${scene("game-timeline")}<button type="button" class="btn btn--dark" data-tl="start">${t(UI.start)}</button></div>`;
      return;
    }
    const sorted = tl.pool.slice().sort((a, b) => a.y - b.y);
    const right = tl.placed.filter((e, i) => e === sorted[i]).length;
    const left = tl.pool.filter((e) => !tl.placed.includes(e));
    tlEl.innerHTML = `<p class="game__hint">${t(UI.tlHint)}</p>
      <p class="tl__label">${t(UI.tlYours)}</p>
      <ol class="tl__line">${
        tl.placed.length
          ? tl.placed
              .map((e, i) => {
                const ok = e === sorted[i];
                return `<li class="tl__item${tl.over ? (ok ? " is-right" : " is-wrong") : ""}"><span class="tl__year">${tl.over ? year(e.y) : i + 1}</span><span>${t(e)}</span>${tl.over ? `<span class="tl__mark" aria-hidden="true">${ok ? "✓" : "✗"}</span>` : ""}</li>`;
              })
              .join("")
          : `<li class="tl__empty">${t(UI.tlEmpty)}</li>`
      }</ol>
      ${
        tl.over
          ? `<div class="game__end game__end--inline"><p class="game__big">${right}<small> / ${TN}</small></p><p>${fmt("tlEnd", { n: right, t: TN })}</p>${
              right < TN ? `<ol class="tl__answer">${sorted.map((e) => `<li><b>${year(e.y)}</b> ${t(e)}</li>`).join("")}</ol>` : ""
            }<button type="button" class="btn btn--dark" data-tl="start">${t(UI.again)}</button></div>`
          : `<div class="tl__pool">${left.map((e) => `<button type="button" class="opt" data-tlpick="${EVENTS.indexOf(e)}">${t(e)}</button>`).join("")}</div>
             ${tl.placed.length ? `<button type="button" class="btn btn--outline btn--small" data-tl="undo">${t(UI.undo)}</button>` : ""}`
      }`;
  }

  tlEl &&
    tlEl.addEventListener("click", (e) => {
      const a = e.target.closest("[data-tl]");
      if (a) {
        if (a.dataset.tl === "start") newTimeline();
        if (a.dataset.tl === "undo") tl.placed.pop();
        renderTimeline();
        tlEl.querySelector(".tl__pool .opt")?.focus();
        return;
      }
      const p = e.target.closest("[data-tlpick]");
      if (p && tl && !tl.over) {
        tl.placed.push(EVENTS[+p.dataset.tlpick]);
        if (tl.placed.length === TN) {
          tl.over = true;
          const sorted = tl.pool.slice().sort((a, b) => a.y - b.y);
          window.GRIT_TU?.award("timeline", tl.placed.filter((x, i) => x === sorted[i]).length, TN);
        }
        renderTimeline();
        (tlEl.querySelector(".tl__pool .opt") || tlEl.querySelector("button"))?.focus();
      }
    });

  // ------------------------------------------------------------ hero map
  // Numbered by province (Arkhangai, Övörkhangai, Khentii), in the order the horse visits them.
  const MAP_LABELS = {
    terkh: { en: "Terkhiin Tsagaan Lake", mn: "Тэрхийн Цагаан нуур" },
    taikhar: { en: "Taikhar Rock", mn: "Тайхар чулуу" },
    kharbalgas: { en: "Khar Balgas", mn: "Хар балгас" },
    khoshoo: { en: "Khöshöö Tsaidam", mn: "Хөшөө Цайдам" },
    ugii: { en: "Ugii Lake", mn: "Өгий нуур" },
    karakorum: { en: "Karakorum", mn: "Хархорум" },
    erdenezuu: { en: "Erdene Zuu", mn: "Эрдэнэ Зуу" },
    orkhon: { en: "Orkhon Waterfall", mn: "Орхоны хүрхрээ" },
    burkhan: { en: "Burkhan Khaldun", mn: "Бурхан Халдун" },
    deluun: { en: "Delüün Boldog", mn: "Дэлүүн болдог" },
    khudoo: { en: "Khödöö Aral", mn: "Хөдөө арал" },
  };
  const MAP_REGIONS = [{ en: "Arkhangai", mn: "Архангай" }, { en: "Övörkhangai", mn: "Өвөрхангай" }, { en: "Khentii", mn: "Хэнтий" }];
  const mapEl = document.getElementById("hmap");
  const legendEl = document.getElementById("hmap-legend");
  function renderMap() {
    if (!mapEl || !art.isoMap) return;
    const ids = Object.keys(MAP_LABELS);
    const pins = ids.map((id) => ({ id, label: t(MAP_LABELS[id]), ...art.MAP_PINS[id] }));
    mapEl.innerHTML = art.isoMap({ pins, label: t(UI.mapLabel), regions: MAP_REGIONS.map(t) });
    if (legendEl)
      legendEl.innerHTML = ids.map((id, i) => `<button type="button" class="chip" data-open="${id}"><b>${i + 1}</b> ${t(MAP_LABELS[id])}</button>`).join("");
  }
  const openFromMap = (e) => {
    const p = e.target.closest("[data-open]");
    if (!p) return;
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    openBook(p.dataset.open);
  };
  mapEl && mapEl.addEventListener("click", openFromMap);
  mapEl && mapEl.addEventListener("keydown", openFromMap);
  legendEl && legendEl.addEventListener("click", openFromMap);

  // The GRIT horse tours the map along the roads, resting at each site and
  // lighting up its pin. Clicking the horse opens the site it stands at.
  // Each leg: world-coordinate waypoints ending at the site, then its id.
  // Bridges: Arkhangai–Övörkhangai at x 64 (y 52..60), Arkhangai–Khentii at y 32 (x 100..110).
  const TOUR = [
    [[[32, 28], [40, 29.5]], "taikhar"],
    [[[48, 31], [52, 34], [56, 39]], "kharbalgas"],
    [[[60, 44], [70, 44], [78, 40], [80, 34]], "khoshoo"],
    [[[78, 30], [76, 28], [72, 26]], "ugii"],
    [[[76, 28], [80, 34], [78, 40], [70, 44], [60, 44], [64, 51.5], [64, 60.5], [65, 65]], "karakorum"],
    [[[66, 70], [66, 90], [78, 90]], "erdenezuu"],
    [[[66, 90], [54, 92], [42, 95]], "orkhon"],
    [[[54, 92], [66, 90], [66, 70], [64, 60.5], [64, 51.5], [60, 44], [70, 44], [78, 40], [90, 34], [99.5, 32], [110.5, 32], [116, 36.5]], "burkhan"],
    [[[118, 38], [124, 40], [134, 34], [142, 28]], "deluun"],
    [[[134, 34], [124, 40], [128, 46], [133, 50]], "khudoo"],
    [[[128, 46], [124, 40], [118, 38], [110.5, 32], [99.5, 32], [90, 34], [78, 40], [70, 44], [60, 44], [52, 34], [44, 30], [32, 28], [22, 27]], "terkh"],
  ];
  const START = [22, 27];
  const SPEED = 7; // world units per second
  const REST = 2200; // ms at each site
  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const horse = { leg: 0, pts: null, seg: 0, segT: 0, pos: START.slice(), facing: 1, resting: 0, at: "terkh", visible: true, last: 0 };

  function legPoints(i) {
    const from = i === 0 ? START : TOUR[i - 1][0][TOUR[i - 1][0].length - 1];
    return [from, ...TOUR[i][0]];
  }

  function placeHorse(hop) {
    const svg = mapEl && mapEl.querySelector("svg");
    if (!svg || !art.horseToken) return;
    let g = svg.querySelector(".map-horse");
    if (!g) {
      g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", "map-horse");
      g.setAttribute("role", "button");
      g.setAttribute("tabindex", "0");
      g.innerHTML = art.horseToken();
      // Above the map, below the pins.
      const firstPin = svg.querySelector(".map-pin");
      firstPin ? firstPin.parentNode.insertBefore(g, firstPin) : svg.appendChild(g);
    }
    g.setAttribute("data-open", horse.at);
    g.setAttribute("aria-label", t(UI.horse) + ": " + t(MAP_LABELS[horse.at]));
    const [x, y] = art.mapIso(horse.pos[0], horse.pos[1]);
    g.setAttribute("transform", `translate(${x.toFixed(1)} ${(y - hop).toFixed(1)}) scale(1.6)`);
    g.querySelector(".map-horse__body").setAttribute("transform", horse.facing < 0 ? "scale(-1 1)" : "");
    svg.querySelectorAll(".map-pin").forEach((p) => p.classList.toggle("is-active", horse.resting > 0 && p.dataset.open === horse.at));
  }

  function step(now) {
    const dt = Math.min(0.05, (now - (horse.last || now)) / 1000);
    horse.last = now;
    let hop = 0;
    if (horse.resting > 0) {
      horse.resting -= dt * 1000;
      if (horse.resting <= 0) {
        horse.leg = (horse.leg + 1) % TOUR.length;
        horse.pts = null;
      }
    } else {
      if (!horse.pts) {
        horse.pts = legPoints(horse.leg);
        horse.seg = 0;
        horse.segT = 0;
      }
      const a = horse.pts[horse.seg], b = horse.pts[horse.seg + 1];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      horse.segT += (dt * SPEED) / len;
      if (horse.segT >= 1) {
        horse.seg++;
        horse.segT = 0;
        if (horse.seg >= horse.pts.length - 1) {
          horse.pos = b.slice();
          horse.at = TOUR[horse.leg][1];
          horse.resting = REST;
          placeHorse(0);
          return;
        }
      }
      const p = horse.pts[horse.seg], q = horse.pts[horse.seg + 1];
      horse.pos = [p[0] + (q[0] - p[0]) * horse.segT, p[1] + (q[1] - p[1]) * horse.segT];
      // On screen, x grows with (x - y): face right when that increases.
      const dx = q[0] - p[0] - (q[1] - p[1]);
      if (Math.abs(dx) > 0.01) horse.facing = dx > 0 ? -1 : 1;
      hop = Math.abs(Math.sin(now / 110)) * 5; // gallop
    }
    placeHorse(hop);
  }

  function loop(now) {
    if (horse.visible && !document.hidden) step(now);
    else horse.last = 0;
    requestAnimationFrame(loop);
  }
  if (mapEl) {
    horse.resting = REST;
    if ("IntersectionObserver" in window)
      new IntersectionObserver((es) => es.forEach((e) => (horse.visible = e.isIntersecting))).observe(mapEl);
    if (reduceMotion) {
      horse.resting = 1;
      placeHorse(0);
    } else requestAnimationFrame(loop);
  }

  // ------------------------------------------------------------ word game card
  // Reads the game's own saved progress (same site, same browser).
  const wgEl = document.getElementById("wordgame-status");
  function renderWordgame() {
    if (!wgEl) return;
    // Today's puzzle number, counted in Mongolian time like the game's server.
    let ymd;
    try {
      ymd = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ulaanbaatar", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    } catch (e) {
      const d = new Date();
      ymd = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
    const [y, m, dd] = ymd.split("-").map(Number);
    const n = Math.round((Date.UTC(y, m - 1, dd) - Date.UTC(2026, 10, 1)) / 86400000) + 1;
    // The game saves a small summary of today's play in this browser.
    let g = null;
    try {
      g = JSON.parse(localStorage.getItem("tu_summary") || "null");
    } catch (e) {}
    if (!g || g.no !== n || !g.tries) wgEl.textContent = fmt("wgToday", { n });
    else if (!g.finished) wgEl.textContent = fmt("wgPlaying", { n, g: g.tries });
    else if (g.solved) wgEl.textContent = fmt("wgWon", { n, g: g.tries });
    else wgEl.textContent = fmt("wgLost", { n });
  }

  // ------------------------------------------------------------ language
  function renderAll() {
    renderWordgame();
    renderMap();
    placeHorse(0);
    renderFilters();
    renderCards();
    renderQuiz();
    renderTimeline();
    if (story) renderBook();
  }
  renderAll();
  new MutationObserver(renderAll).observe(root, { attributes: true, attributeFilter: ["data-lang"] });
})();

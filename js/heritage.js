// GRIT Heritage: picture-book stories and history games.
// All text is stored in both languages ({ en, mn }) and re-rendered when the
// МН/EN button is pressed. To add a story, copy one object in STORIES; each
// page names a scene from js/heritage-art.js. To add a quiz question, add an
// object to QUIZ (the first option in `a` is shown in random order; `ok` is
// the index of the right answer). Timeline events go in EVENTS.

// ---------------------------------------------------------------- stories
const STORIES = [
  {
    id: "terkh",
    kind: "legend",
    place: { en: "Arkhangai · Tariat soum", mn: "Архангай · Тариат сум" },
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
        mn: "Хөндийд хуралдсан ус Тэрхийн Цагаан нуур болж, шидсэн уулын орой нь нуурын дундах арал болжээ. Оройгоо алдсан уул бол Хорго уул. Домгоор бол тийм учраас түүний оройд том тогоо ангайж байдаг аж.",
      },
      {
        scene: "volcano-lava",
        fact: true,
        en: "What do scientists say? Khorgo is an extinct volcano. Thousands of years ago its lava flowed into the Terkh River valley and blocked the river, and the trapped water formed the lake. The lake lies more than 2,000 metres above sea level and is protected by the state. The legend reminds us of something true, too: water is precious — look after it.",
        mn: "Эрдэмтэд юу гэдэг вэ? Хорго бол унтарсан галт уул. Олон мянган жилийн өмнө түүнээс урссан лаав Тэрх голын хөндийг хааж, тогтсон ус нь нуур болсон байна. Нуур далайн түвшнээс 2000 гаруй метрийн өндөрт оршдог бөгөөд улсын тусгай хамгаалалтад байдаг. Домог бас нэг үнэнийг сануулдаг: ус бол үнэт баялаг, түүнийг гамнаж хайрла.",
      },
    ],
    check: {
      q: { en: "In the legend, what is the island in the lake?", mn: "Домгоор бол нуурын дундах арал юу вэ?" },
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
    place: { en: "Arkhangai · Ikh Tamir soum", mn: "Архангай · Их Тамир сум" },
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
        mn: "Тэр нутагт хэний ч харж байгаагүй хүчтэй Тайхар хэмээх бөх залуу байв. Тэр нутгийнхнаа аврахаар шийдэж, могойн үүр рүү зоригтойгоор явжээ.",
      },
      {
        scene: "rock-throw",
        en: "Taikhar lifted an enormous rock and threw it with all his strength. The rock came down on the serpent and pinned it to the ground for ever. From that day on, the Tamir valley was peaceful again.",
        mn: "Тайхар бөх асар том хад чулууг өргөн авч, бүх хүчээрээ шидэв. Чулуу могойн дээр унаж, түүнийг үүрд дарж орхижээ. Тэр өдрөөс хойш Тамирын хөндий дахин амар тайван болсон гэдэг.",
      },
      {
        scene: "taikhar-rock",
        en: "Today, on the bank of the Khoid Tamir River in Ikh Tamir soum, a giant granite rock rises alone from the flat steppe. It is called Taikhar Rock. The legend is told a little differently in different places — ask the elders in your family how they heard it.",
        mn: "Өнөөдөр Их Тамир сумын нутагт, Хойд Тамир голын эрэг дээр тэгш тал дунд ганцаараа сүндэрлэх асар том боржин чулуу бий. Үүнийг Тайхар чулуу гэж нэрлэдэг. Домгийг нутаг бүрт арай өөрөөр ярьдаг. Танай гэрийн ахмадууд хэрхэн сонссоныг асуугаарай.",
      },
      {
        scene: "rock-writing",
        fact: true,
        en: "Did you know? Over many centuries, people left inscriptions on Taikhar Rock in several languages and scripts — a valuable source for historians. Sadly, some visitors now paint their names on the rock and damage the old writing. When you visit a monument, don't write on it or break anything: take photos and memories only.",
        mn: "Мэдэх үү? Олон зууны турш хүмүүс Тайхар чулуун дээр янз бүрийн хэл, бичгээр бичээс үлдээсэн нь түүхчдийн хувьд үнэт эх сурвалж юм. Харамсалтай нь зарим жуулчид чулуун дээр нэрээ будгаар бичиж, эртний бичээсийг гэмтээж байна. Дурсгалт газар очвол юу ч бүү бич, бүү эвд — зөвхөн зураг, дурсамж аваад буцаарай.",
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
    place: { en: "Uvurkhangai · Kharkhorin soum", mn: "Өвөрхангай · Хархорин сум" },
    title: { en: "Karakorum and the Silver Tree", mn: "Хархорум ба Мөнгөн мод" },
    blurb: {
      en: "The capital of the Mongol Empire, where people from all over the world met — and a fountain unlike any other.",
      mn: "Дэлхийн өнцөг булан бүрээс хүмүүс уулздаг байсан Их Монгол Улсын нийслэл ба гайхамшигт усан оргилуур.",
    },
    cover: "silver-tree",
    pages: [
      {
        scene: "karakorum-city",
        en: "In 1220 Chinggis Khaan chose the Orkhon River valley as the site of the capital of the Great Mongol State. The city was called Karakorum. His son Ögedei Khaan built a wall around it in 1235 and raised a palace called Tümen Amgalan.",
        mn: "1220 онд Чингис хаан Орхон голын хөндийд Их Монгол Улсын нийслэлийг байгуулахаар шийджээ. Энэ хот Хархорум хэмээн нэрлэгдэв. Түүний хүү Өгөдэй хаан 1235 онд хотыг хэрэмжүүлж, Түмэн амгалан хэмээх ордон бариулсан.",
      },
      {
        scene: "market",
        en: "Karakorum was a meeting place for the whole world. Merchants, craftsmen and envoys from China, Persia, Russia and Europe lived there, and mosques, Buddhist temples and a Christian church stood side by side.",
        mn: "Хархорум бол олон улсын хүмүүс уулздаг хот байв. Хятад, Перс, Орос, Европоос ирсэн худалдаачин, дархан, элч нар энд амьдарч, лалын сүм, буддын сүм, христийн сүм хажуу хажуудаа зэрэгцэн оршдог байжээ.",
      },
      {
        scene: "silver-tree",
        en: "The city's greatest wonder was the Silver Tree, made by Guillaume Boucher, a goldsmith from Paris who had been brought to Mongolia as a captive. Four pipes in the tree poured wine, airag (mare's milk), honey mead and rice wine, and on top stood an angel blowing a trumpet.",
        mn: "Хотын хамгийн гайхамшигт зүйл бол Мөнгөн мод байв. Үүнийг олзлогдон Монголд ирсэн Парисын урлаач Гийом Бушье хийжээ. Модны дөрвөн цоргоор дарс, айраг, бал ус, цагаан будааны архи урсдаг байсан бөгөөд оройд нь бүрээ үлээж буй тэнгэр элчийн дүрс байжээ.",
      },
      {
        scene: "traveler-book",
        en: "How do we know all this? From the travel notes of William of Rubruck, a monk sent by the King of France, who came to Karakorum in 1254. That is what a historical source is: the written account of someone who saw it with their own eyes.",
        mn: "Бид энэ бүхнийг яаж мэддэг вэ? 1254 онд Хархорумд ирсэн, Францын хааны илгээсэн лам Гийом де Рубрукийн аяллын тэмдэглэлээс. Түүхийн эх сурвалж гэдэг нь ийм л учиртай: өөрийн нүдээр харсан хүний бичиж үлдээсэн гэрчлэл.",
      },
      {
        scene: "turtle-stone",
        fact: true,
        en: "Later Khubilai Khaan moved the capital to Daidu (today's Beijing), and in 1380 Karakorum was destroyed by the army of the Ming dynasty. In Kharkhorin you can still see a granite stone turtle from the old city, and archaeologists are still excavating its ruins today.",
        mn: "Хожим Хубилай хаан нийслэлээ Дайду (одоогийн Бээжин) руу шилжүүлж, 1380 онд Хархорумыг Мин улсын цэрэг сүйтгэжээ. Хархорин суманд эртний хотоос үлдсэн боржин чулуун мэлхий одоо ч бий бөгөөд археологичид хотын туурийг өнөөдөр ч малтан судалсаар байна.",
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
    place: { en: "Uvurkhangai · Kharkhorin soum", mn: "Өвөрхангай · Хархорин сум" },
    title: { en: "Erdene Zuu: 108 Stupas", mn: "Эрдэнэ Зуу: 108 суварга" },
    blurb: {
      en: "Mongolia's oldest surviving Buddhist monastery, built from the stones of an old capital.",
      mn: "Эртний нийслэлийн чулуугаар баригдсан, Монголын хамгийн эртний хадгалагдан үлдсэн буддын хийд.",
    },
    cover: "stupa-wall",
    pages: [
      {
        scene: "ruins-build",
        en: "More than two hundred years after Karakorum was destroyed, in 1585, Abtai Sain Khan of the Khalkha founded a monastery beside the ruins of the old city. It is said that stones and bricks from the ancient capital were used to build it.",
        mn: "Хархорум сүйрснээс хойш 200 гаруй жилийн дараа, 1585 онд Халхын Абтай Сайн хан эртний хотын туурийн дэргэд хийд байгуулжээ. Барилгад нь эртний нийслэлийн чулуу, тоосгыг ашигласан гэдэг.",
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
        mn: "1930-аад оны сүүлчийн хэлмэгдүүлэлтийн үеэр Монгол даяар олон зуун хийд нурааж устгагдсан. Эрдэнэ Зуугийн ихэнх барилга сүйдсэн ч хэрэм болон цөөн хэдэн сүм үлджээ. 1947 онд музей болж, 1990 оноос хойш дахин хийдийн үйл ажиллагаагаа явуулж байна.",
      },
      {
        scene: "erdenezuu-today",
        fact: true,
        en: "Erdene Zuu is the oldest Buddhist monastery that survives in Mongolia today. It is part of the Orkhon Valley Cultural Landscape, a UNESCO World Heritage site. Walking around the wall, try counting the stupas — do you get 108?",
        mn: "Эрдэнэ Зуу бол Монголд өнөөг хүртэл хадгалагдан үлдсэн хамгийн эртний буддын хийд юм. Энэ нь ЮНЕСКО-гийн Дэлхийн өвд бүртгэгдсэн Орхоны хөндийн соёлын дурсгалт газар нутгийн нэг хэсэг. Хэрмийг тойрон алхахдаа сувгануудыг тоолоод үзээрэй — 108 гарч байна уу?",
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
    place: { en: "Arkhangai · Uvurkhangai", mn: "Архангай · Өвөрхангай" },
    title: { en: "The Orkhon Valley: Cradle of History", mn: "Орхоны хөндий: түүхийн өлгий" },
    blurb: {
      en: "A river valley where nomadic empires rose one after another — and a waterfall born of a volcano.",
      mn: "Нүүдэлчдийн гүрнүүд ээлж дараалан мандсан голын хөндий ба галт уулаас үүссэн хүрхрээ.",
    },
    cover: "waterfall",
    pages: [
      {
        scene: "orkhon-river",
        en: "The Orkhon River starts in the Khangai mountains and flows for more than 1,100 km — it is the longest river in Mongolia. For thousands of years the rich pastures of its valley have fed nomads and their herds.",
        mn: "Орхон гол Хангайн нуруунаас эх авч, 1100 гаруй км урсдаг. Энэ бол Монголын хамгийн урт гол. Түүний хөндийн өвс ус элбэг бэлчээр мянга мянган жилийн турш нүүдэлчид, тэдний малыг тэжээж иржээ.",
      },
      {
        scene: "waterfall",
        en: "In the upper Orkhon is the Ulaan Tsutgalan waterfall. Ancient lava flows and earthquakes shaped a gorge here, and the river drops more than 20 metres into it. In a very cold winter the waterfall can freeze!",
        mn: "Орхоны дээд хэсэгт Улаан цутгалан хүрхрээ бий. Эртний галт уулын лаав, газар хөдлөлтийн улмаас үүссэн хавцал руу гол 20 гаруй метрийн өндрөөс унадаг. Хүйтэн өвөл хүрхрээ хөлдчихдөг ч удаа бий!",
      },
      {
        scene: "steles",
        en: "At Khöshöö Tsaidam stand 8th-century stone steles raised for the Turkic ruler Bilge Khagan and his brother Kül Tegin. Their history is carved in Old Turkic runic script — among the oldest known texts in any Turkic language.",
        mn: "Хөшөө Цайдамд 8-р зуунд Түрэгийн Билгэ хаан болон түүний дүү Күлтегинд зориулан босгосон гэрэлт хөшөөнүүд бий. Тэдгээрт эртний түрэг (руни) бичгээр түүхээ сийлсэн нь түрэг хэлний хамгийн эртний бичгийн дурсгалуудын нэг юм.",
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
        mn: "Байгаль, түүх ийм ховор хосолсон тул 2004 онд «Орхоны хөндийн соёлын дурсгалт газар нутаг» ЮНЕСКО-гийн Дэлхийн өвийн жагсаалтад бүртгэгдсэн. Энэ бол хүн төрөлхтний өв — үүнийг хамгаалах нь бидний үүрэг.",
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
    kind: "nature",
    place: { en: "Arkhangai · Ugiinuur soum", mn: "Архангай · Өгийнуур сум" },
    title: { en: "Ugii Lake: A Home for Birds", mn: "Өгий нуур: шувуудын гэр" },
    blurb: {
      en: "The lake where GRIT began, and why thousands of birds stop here every year.",
      mn: "GRIT-ийн ажил эхэлсэн нуур, мянга мянган шувуу яагаад жил бүр энд буудаг вэ?",
    },
    cover: "birds-migrate",
    pages: [
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
        scene: "fishing",
        en: "The lake is rich in fish such as perch and pike. Herders graze their animals along its shores, and every summer many tourists come to visit.",
        mn: "Нуурт алгана, цурхай зэрэг загас элбэг. Эрэг дагуу нь малчид мал маллаж, зун бүр олон жуулчин ирдэг.",
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
        mn: "Иймээс GRIT Environment нутгийн сурагчид, жуулчны баазуудтай хамтран хог ангилж, дахин боловсруулах ажлыг эхлүүлсэн. Нуураа хамгаалах нь бидний гарт. Та гэр орныхоо ойр орчны байгалийг цэвэр байлгахын тулд юу хийж чадах вэ?",
      },
    ],
    check: {
      q: { en: "In 1998, Ugii Lake was added to which list?", mn: "1998 онд Өгий нуурыг ямар жагсаалтад оруулсан бэ?" },
      a: [
        { en: "The Ramsar list of important wetlands", mn: "Рамсарын чухал намгархаг газрын жагсаалт" },
        { en: "The Red Book of endangered species", mn: "Ховордсон амьтдын Улаан ном" },
        { en: "The list of Olympic venues", mn: "Олимпийн тэмцээний газрын жагсаалт" },
      ],
      ok: 0,
    },
  },
];

// ---------------------------------------------------------------- quiz
const QUIZ = [
  { q: { en: "In which year was the Great Mongol State founded?", mn: "Их Монгол Улс хэдэн онд байгуулагдсан бэ?" }, a: ["1162", "1206", "1260"], ok: 1, why: { en: "In 1206 Temüjin was proclaimed Chinggis Khaan at a great assembly (khuraltai) by the Onon River.", mn: "1206 онд Онон голын эхэнд хуралдсан их хуралдайгаар Тэмүжинг Чингис хаан хэмээн өргөмжилсөн." } },
  { q: { en: "Which state, founded in 209 BC, is often called the first state of the steppe nomads?", mn: "МЭӨ 209 онд байгуулагдсан, тал нутгийн нүүдэлчдийн анхны төр гэгддэг улс аль нь вэ?" }, a: [{ en: "The Xiongnu (Hunnu)", mn: "Хүннү" }, { en: "The Uighur Khaganate", mn: "Уйгурын хаант улс" }, { en: "The Turkic Khaganate", mn: "Түрэгийн хаант улс" }], ok: 0, why: { en: "Modu Chanyu united the tribes and founded the Xiongnu state in 209 BC.", mn: "МЭӨ 209 онд Модун шаньюй аймгуудыг нэгтгэж Хүннү гүрнийг байгуулсан." } },
  { q: { en: "Who founded Erdene Zuu Monastery in 1585?", mn: "1585 онд Эрдэнэ Зуу хийдийг хэн байгуулсан бэ?" }, a: [{ en: "Abtai Sain Khan", mn: "Абтай Сайн хан" }, { en: "Ögedei Khaan", mn: "Өгөдэй хаан" }, { en: "Zanabazar", mn: "Занабазар" }], ok: 0, why: { en: "Abtai Sain Khan of the Khalkha built it beside the ruins of Karakorum.", mn: "Халхын Абтай Сайн хан эртний Хархорумын туурийн дэргэд барьсан." } },
  { q: { en: "How many stupas stand on the wall of Erdene Zuu?", mn: "Эрдэнэ Зуугийн хэрэм дээр хэдэн суварга бий вэ?" }, a: ["64", "108", "300"], ok: 1, why: { en: "108 is a sacred number in Buddhism.", mn: "Буддын шашинд 108 бол ариун тоо." } },
  { q: { en: "Who created the Soyombo script in 1686?", mn: "1686 онд Соёмбо үсгийг хэн зохиосон бэ?" }, a: [{ en: "Zanabazar", mn: "Өндөр гэгээн Занабазар" }, { en: "Chinggis Khaan", mn: "Чингис хаан" }, { en: "Abtai Sain Khan", mn: "Абтай Сайн хан" }], ok: 0, why: { en: "Zanabazar, the first Jebtsundamba Khutagt, was also a great sculptor. The Soyombo symbol on our flag comes from this script.", mn: "Анхдугаар Богд Өндөр гэгээн Занабазар бас агуу урлаач байсан. Төрийн далбаан дээрх Соёмбо тэмдэг энэ бичгээс гаралтай." } },
  { q: { en: "Which script is carved on the Kül Tegin and Bilge Khagan steles?", mn: "Күлтегин, Билгэ хааны гэрэлт хөшөөнд ямар бичгээр бичсэн бэ?" }, a: [{ en: "Old Turkic runic script", mn: "Эртний түрэг (руни) бичиг" }, { en: "Mongol script", mn: "Монгол бичиг" }, { en: "Latin script", mn: "Латин бичиг" }], ok: 0, why: { en: "These 8th-century steles in the Orkhon Valley are among the oldest Turkic texts.", mn: "Орхоны хөндийд буй 8-р зууны эдгээр хөшөө түрэг хэлний хамгийн эртний бичгийн дурсгалуудын нэг." } },
  { q: { en: "Which extinct volcano stands next to Terkhiin Tsagaan Lake?", mn: "Тэрхийн Цагаан нуурын дэргэд орших унтарсан галт уул аль нь вэ?" }, a: [{ en: "Khorgo", mn: "Хорго" }, { en: "Otgontenger", mn: "Отгонтэнгэр" }, { en: "Bogd Khan", mn: "Богд хан" }], ok: 0, why: { en: "Lava from Khorgo blocked the Terkh River and formed the lake.", mn: "Хорго уулын лаав Тэрх голыг хааж нуур үүссэн." } },
  { q: { en: "Where did Guillaume Boucher, the maker of Karakorum's Silver Tree, come from?", mn: "Хархорумын Мөнгөн модыг бүтээсэн Гийом Бушье хаанаас гаралтай вэ?" }, a: [{ en: "Paris", mn: "Парис" }, { en: "Baghdad", mn: "Багдад" }, { en: "Beijing", mn: "Бээжин" }], ok: 0, why: { en: "He was a Parisian goldsmith brought to Mongolia as a captive.", mn: "Тэрээр олзлогдон Монголд ирсэн Парисын алт мөнгөний дархан байв." } },
  { q: { en: "In which year did Mongolia declare its independence from the Qing dynasty?", mn: "Монгол Улс Чин улсаас тусгаар тогтнолоо хэдэн онд тунхагласан бэ?" }, a: ["1911", "1921", "1945"], ok: 0, why: { en: "On 29 December 1911 the Bogd Khaan was enthroned as head of an independent Mongolia.", mn: "1911 оны 12-р сарын 29-нд Богд хааныг тусгаар Монгол Улсын тэргүүнээр өргөмжилсөн." } },
  { q: { en: "When was Mongolia's first constitution adopted?", mn: "Монгол Улсын анхны Үндсэн хуулийг хэдэн онд баталсан бэ?" }, a: ["1924", "1960", "1992"], ok: 0, why: { en: "The first constitution was adopted in 1924; the current one dates from 1992.", mn: "Анхны Үндсэн хуулийг 1924 онд, одоогийн Үндсэн хуулийг 1992 онд баталсан." } },
  { q: { en: "In which year did Mongolia's peaceful democratic revolution take place?", mn: "Монголын тайван замын ардчилсан хувьсгал хэдэн онд болсон бэ?" }, a: ["1980", "1990", "2000"], ok: 1, why: { en: "In 1990 young people gathered peacefully on the square and Mongolia moved to democracy and a multi-party system.", mn: "1990 онд залуучууд талбайд тайван замаар цугларч, Монгол Улс ардчилал, олон намын тогтолцоонд шилжсэн." } },
  { q: { en: "Which is the longest river in Mongolia?", mn: "Монголын хамгийн урт гол аль нь вэ?" }, a: [{ en: "The Orkhon", mn: "Орхон" }, { en: "The Tuul", mn: "Туул" }, { en: "The Kherlen", mn: "Хэрлэн" }], ok: 0, why: { en: "The Orkhon flows for more than 1,100 km before joining the Selenge.", mn: "Орхон гол 1100 гаруй км урсаж Сэлэнгэ мөрөнд цутгадаг." } },
  { q: { en: "In which year was Karakorum destroyed by the Ming army?", mn: "Хархорумыг Мин улсын цэрэг хэдэн онд сүйтгэсэн бэ?" }, a: ["1254", "1380", "1585"], ok: 1, why: { en: "After 1380 the city lay in ruins; Erdene Zuu was later built beside them.", mn: "1380 оноос хойш хот балгас болж, хожим түүний дэргэд Эрдэнэ Зуу баригдсан." } },
  { q: { en: "Who founded Tövkhön Monastery on a rocky peak in 1653?", mn: "1653 онд хадан оргил дээр Төвхөн хийдийг хэн байгуулсан бэ?" }, a: [{ en: "Zanabazar", mn: "Занабазар" }, { en: "Abtai Sain Khan", mn: "Абтай Сайн хан" }, { en: "Khubilai Khaan", mn: "Хубилай хаан" }], ok: 0, why: { en: "Zanabazar worked and created many of his sculptures there.", mn: "Занабазар тэнд бясалгаж, олон бүтээлээ туурвисан." } },
];

// ---------------------------------------------------------------- timeline
const EVENTS = [
  { y: -209, en: "Modu Chanyu founds the Xiongnu state", mn: "Модун шаньюй Хүннү гүрнийг байгуулав" },
  { y: 732, en: "A stele is raised for Kül Tegin in the Orkhon Valley", mn: "Орхоны хөндийд Күлтегины хөшөөг босгов" },
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
];

// ---------------------------------------------------------------- UI text
const UI = {
  legend: { en: "Legend", mn: "Домог" },
  history: { en: "History", mn: "Түүх" },
  nature: { en: "Nature", mn: "Байгаль" },
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
  great: { en: "Excellent — a true history expert!", mn: "Гайхалтай! Жинхэнэ түүхч байна." },
  good: { en: "Well done! Read a story or two and try again.", mn: "Сайн байна! Хэдэн ном уншаад дахин оролдоорой." },
  keep: { en: "A good start. The picture books above hold many of the answers.", mn: "Сайн эхлэл. Дээрх зурагт номнуудаас олон хариултыг олно." },
  tlHint: { en: "Tap the events from the oldest to the newest.", mn: "Үйл явдлуудыг хамгийн эртнээс нь эхлэн дарааллаар нь дараарай." },
  tlYours: { en: "Your order", mn: "Таны дараалал" },
  tlEmpty: { en: "Tap an event below to place it here.", mn: "Доорх үйл явдлаас дарж энд байрлуулна уу." },
  undo: { en: "Undo", mn: "Буцаах" },
  tlEnd: { en: "{n} of {t} in the right place.", mn: "Зөв байрласан: {n} / {t}." },
  bc: { en: "{y} BC", mn: "МЭӨ {y}" },
  horse: { en: "GRIT horse at", mn: "GRIT морь" },
  wgToday: { en: "Today's word №{n} is waiting for you.", mn: "Өнөөдрийн №{n} үг таныг хүлээж байна." },
  wgWon: { en: "You solved today's word №{n} in {g}/6. Come back tomorrow!", mn: "Та өнөөдрийн №{n} үгийг {g}/6 оролдлогоор таалаа. Маргааш дахин ирээрэй!" },
  wgLost: { en: "Today's word №{n} got away. A new one comes tomorrow.", mn: "Өнөөдрийн №{n} үгийг таасангүй. Маргааш шинэ үг гарна." },
  wgPlaying: { en: "Today's word №{n}: {g}/6 tries used. Keep going!", mn: "Өнөөдрийн №{n} үг: 6-аас {g} оролдлого ашигласан. Үргэлжлүүлээрэй!" },
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
    filters.innerHTML = ["all", "legend", "history", "nature"]
      .map((k) => `<button type="button" class="chip${filter === k ? " is-active" : ""}" data-filter="${k}" aria-pressed="${filter === k}">${t(UI[k])}</button>`)
      .join("");
  }

  function renderCards() {
    if (!grid) return;
    grid.innerHTML = STORIES.filter((s) => filter === "all" || s.kind === filter)
      .map((s) => {
        const read = done.includes(s.id);
        return `<article class="story">
          <button type="button" class="story__art" data-open="${s.id}" aria-label="${t(UI.read)}: ${t(s.title)}">${scene(s.cover)}${read ? `<span class="story__done">✓ ${t(UI.done)}</span>` : ""}</button>
          <div class="story__body">
            <p class="story__meta"><span class="story__kind story__kind--${s.kind}">${t(UI[s.kind])}</span><span>${t(s.place)}</span></p>
            <h3 class="story__title">${t(s.title)}</h3>
            <p class="story__text">${t(s.blurb)}</p>
            <button type="button" class="story__link" data-open="${s.id}">${t(read ? UI.readAgain : UI.read)} <span aria-hidden="true">→</span></button>
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
        <button type="button" class="btn btn--outline btn--small" data-book-prev${page === 0 ? " disabled" : ""}>← ${t(UI.prev)}</button>
        <div class="hbook__dots" aria-label="${fmt("page", { n: page + 1, t: total })}">${Array.from({ length: total }, (_, i) => `<span class="${i === page ? "is-on" : ""}"></span>`).join("")}</div>
        <button type="button" class="btn btn--dark btn--small" data-book-next${last && picked == null ? " disabled" : ""}>${last ? t(UI.finish) : t(UI.next) + " →"}</button>
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
             <button type="button" class="btn btn--dark btn--small" data-quiz="next">${quiz.i === n - 1 ? t(UI.results) : t(UI.nextQ) + " →"}</button>`
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
        if (quiz.i >= quiz.list.length) quiz.over = true;
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
        if (tl.placed.length === TN) tl.over = true;
        renderTimeline();
        (tlEl.querySelector(".tl__pool .opt") || tlEl.querySelector("button"))?.focus();
      }
    });

  // ------------------------------------------------------------ hero map
  const MAP_LABELS = {
    terkh: { en: "Terkhiin Tsagaan Lake", mn: "Тэрхийн Цагаан нуур" },
    taikhar: { en: "Taikhar Rock", mn: "Тайхар чулуу" },
    ugii: { en: "Ugii Lake", mn: "Өгий нуур" },
    orkhon: { en: "Orkhon Waterfall", mn: "Орхоны хүрхрээ" },
    karakorum: { en: "Karakorum", mn: "Хархорум" },
    erdenezuu: { en: "Erdene Zuu", mn: "Эрдэнэ Зуу" },
  };
  const mapEl = document.getElementById("hmap");
  const legendEl = document.getElementById("hmap-legend");
  function renderMap() {
    if (!mapEl || !art.isoMap) return;
    const ids = Object.keys(MAP_LABELS);
    const pins = ids.map((id) => ({ id, label: t(MAP_LABELS[id]), ...art.MAP_PINS[id] }));
    mapEl.innerHTML = art.isoMap({ pins, label: t(UI.mapLabel) });
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
  const TOUR = [
    [[[22, 36], [28, 46], [33, 56]], "taikhar"],
    [[[34, 64], [34, 80], [42, 92]], "orkhon"],
    [[[48, 90], [56, 86], [58, 82]], "karakorum"],
    [[[56, 66], [62, 58], [80, 58], [84, 60]], "erdenezuu"],
    [[[80, 50], [74, 40], [68, 30], [64, 24]], "ugii"],
    [[[56, 26], [45, 28], [32, 31], [26, 34]], "terkh"],
  ];
  const START = [26, 34];
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
    const d = new Date();
    const n = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(2026, 10, 1)) / 86400000) + 1;
    let g = null;
    try {
      g = JSON.parse(localStorage.getItem("tu_game") || "null");
    } catch (e) {}
    if (!g || g.no !== n || !g.guesses || !g.guesses.length) return (wgEl.textContent = fmt("wgToday", { n }));
    const tries = g.guesses.length;
    // When today's game ends the game sets stats.last to today's number and
    // its streak to 0 on a loss (or 1+ on a win).
    let st = {};
    try {
      st = JSON.parse(localStorage.getItem("tu_stats") || "{}") || {};
    } catch (e) {}
    if (st.last !== n) wgEl.textContent = fmt("wgPlaying", { n, g: tries });
    else if (st.streak > 0) wgEl.textContent = fmt("wgWon", { n, g: tries });
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

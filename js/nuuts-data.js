// “Монголын нууц товчоо” for children and young readers: the story of Temüjin, retold in
// plain words (Mongolian and English) from the 13th-century chronicle. Each page names its
// paragraphs (§) in the Secret History so a reader can find the original.
//
// Markup inside page text:
//   {{key}} or {{key|label}}  a hard word, explained from NT_GLOSS[key]
//   [[key]] or [[key|label]]  a person, introduced from NT_PEOPLE[key]
// Keys are always the Mongolian form; English text gives its own label. Letters written right
// after the closing brackets (Mongolian case endings) stay part of the highlighted word.
// Pictures live in /assets/img/nuuts/<img>.webp (a page's `img`, or <chapter id>-<page no>).

window.NT_GLOSS = {
  "товчоо": { en: "chronicle", mn: "Товчлон бичсэн түүх, шастир.", enx: "A short written history." },
  "Бурхан халдун": { en: "Burkhan Khaldun", mn: "Хэнтийн нуруун дахь өндөр уул. Монголчууд эрт дээр үеэс тахиж ирсэн ариун уул.", enx: "A high mountain in the Khentii range, worshipped by Mongols since ancient times." },
  "Тэнгис": { en: "Tenggis", mn: "Их ус, том нуур.", enx: "A great water, a large lake or sea." },
  "өвөг дээдэс": { en: "ancestors", mn: "Олон үеийн өмнө амьдарч байсан эцэг, өвөг, элэнц хуландаа.", enx: "Fathers, grandfathers and great-grandfathers who lived many generations ago." },
  "овог": { en: "clan", mn: "Нэг өвгөөс гаралтай олон айлын бүлэг.", enx: "A group of families descended from one ancestor." },
  "аймаг": { en: "tribe", mn: "Энд: олон овгоос бүрдсэн том бүлэг ард түмэн. Жишээ нь татар, мэргид, хэрэйд.", enx: "A large people made up of many clans, such as the Tatars, Merkits or Kereits." },
  "нүүдэл": { en: "a day's move", mn: "Нүүдэлчид нэг удаа нүүхэд туулдаг зай.", enx: "The distance nomads cover in one move of their camp." },
  "нөж": { en: "blood clot", mn: "Бүлэгнэж хатуурсан цус.", enx: "Blood that has thickened into a lump." },
  "сүйт бүсгүй": { en: "bride-to-be", mn: "Ирээдүйд гэрлэхээр ярилцаж тохирсон бүсгүй.", enx: "A girl whom the families have agreed someone will marry." },
  "хүргэн": { en: "son-in-law", mn: "Охины нөхөр. Энд: охинтой нь гэрлэхээр тохирсон хөвгүүн.", enx: "A daughter's husband; here, the boy promised to the daughter." },
  "шонхор": { en: "gyrfalcon", mn: "Махчин шувуу. Цагаан шонхрыг эрт цагаас эрхэмлэн үздэг.", enx: "A large bird of prey. White gyrfalcons were greatly prized." },
  "ёр": { en: "omen", mn: "Ирээдүйд болох зүйлийн дохио, тэмдэг.", enx: "A sign of what will happen in the future." },
  "бэлэвсэн": { en: "widowed", mn: "Нөхрөө нас барснаар ганцаараа үлдсэн эмэгтэй.", enx: "A woman whose husband has died." },
  "дөнгө": { en: "cangue", mn: "Хоригдлын хүзүүнд углаж зугтаахаас сэргийлдэг хүнд модон хавтан.", enx: "A heavy wooden board locked round a prisoner's neck so he cannot escape." },
  "шарга": { en: "light bay", mn: "Шаргал зүстэй (шар өнгөтэй) морь.", enx: "A horse with a pale yellow coat." },
  "дах": { en: "fur coat", mn: "Үсийг нь гадагш харуулж оёсон үслэг дээл.", enx: "A robe of fur sewn with the fur on the outside." },
  "булга": { en: "sable", mn: "Нандин үстэй ойн жижиг амьтан. Булган дах их үнэтэй бэлэг байжээ.", enx: "A small forest animal with precious fur. A sable coat was a very costly gift." },
  "анд": { en: "sworn brother", mn: "Ах дүү мэт бие биедээ тангараг өргөсөн дотно найз.", enx: "A close friend who has sworn to be like a brother." },
  "цулбуур": { en: "reins", mn: "Морь хөтлөх оосор, жолоо.", enx: "The straps used to lead or steer a horse." },
  "хуралдай": { en: "khuraldai", mn: "Ноёд, түшмэдийн их чуулган. Хаан өргөмжлөх зэрэг чухал хэргийг шийддэг байв.", enx: "A great assembly of nobles that decided important matters, such as choosing a khan." },
  "мянгат": { en: "thousand", mn: "Мянган цэрэг гаргадаг айл өрхийн нэгж. Түүнийг мянганы ноён удирдана.", enx: "A unit of households able to send a thousand soldiers, led by its own commander." },
  "өргөмжлөх": { en: "proclaim", mn: "Хүндэтгэн цол олгож, хаан ширээнд суулгах.", enx: "To give someone a title with honour and raise them to the throne." },
  "сачил": { en: "libation", mn: "Тэнгэр, газар, уулсад сүү, айраг өргөн цацах ёс.", enx: "The custom of sprinkling milk or airag as an offering to the sky, the land and the mountains." },
};

window.NT_PEOPLE = {
  "Бөртэ чоно": { en: "Börte Chino", mn: "Нууц товчоонд дурдагдах монголчуудын хамгийн эртний өвөг. Нэр нь “бор саарал чоно” гэсэн утгатай.", enx: "The earliest ancestor of the Mongols named in the Secret History. His name means “blue-grey wolf”." },
  "Гуа марал": { en: "Gua Maral", mn: "Бөртэ чоногийн гэргий. Нэр нь “шаргал марал” гэсэн утгатай.", enx: "Börte Chino's wife. Her name means “fallow doe”." },
  "Батцагаан": { en: "Batachiqan", mn: "Бөртэ чоно, Гуа марал хоёрын хүү.", enx: "The son of Börte Chino and Gua Maral." },
  "Дува сохор": { en: "Duwa Soqor", mn: "Добун мэргэний ах. Духан дундаа ганц нүдтэй, гурван нүүдлийн газрыг харж чаддаг байсан гэдэг.", enx: "Dobun Mergen's elder brother. He had a single eye in the middle of his forehead and could see three days' journey away." },
  "Добун мэргэн": { en: "Dobun Mergen", mn: "Дува сохорын дүү, Алун гуагийн нөхөр. “Мэргэн” гэдэг нь сайн харваач гэсэн үг.", enx: "Duwa Soqor's younger brother and Alan Gua's husband. “Mergen” means a skilled archer." },
  "Алун гуа": { en: "Alan Gua", mn: "Хори түмэдийн Хорилардай мэргэний охин, Чингис хааны өвөг эх. Таван сумны сургаалаараа алдартай.", enx: "Daughter of Qorilartai Mergen of the Qori Tumad and an ancestral mother of Chinggis Khaan, famous for the lesson of the five arrows." },
  "Хорилардай мэргэн": { en: "Qorilartai Mergen", mn: "Хори түмэд аймгийн ноён, Алун гуагийн эцэг.", enx: "A chief of the Qori Tumad and the father of Alan Gua." },
  "Бодончар": { en: "Bodonchar", mn: "Алун гуагийн отгон хүү. Чингис хааны шууд өвөг, Боржигин овгийн үндэслэгч.", enx: "Alan Gua's youngest son, a direct ancestor of Chinggis Khaan and founder of the Borjigin clan." },
  "Есүхэй": { en: "Yesügei", mn: "Тэмүжиний эцэг, Боржигин овгийн баатар.", enx: "Temüjin's father, a warrior of the Borjigin clan." },
  "Тэмүжин үгэ": { en: "Temüjin Üge", mn: "Есүхэйн олзолсон татарын ноён. Тэмүжинд түүний нэрийг өгчээ.", enx: "A Tatar chief captured by Yesügei. Temüjin was named after him." },
  "Өэлүн": { en: "Hö'elün", mn: "Тэмүжиний эх, олхонуд аймгаас гаралтай. Нөхрөө нас барсны дараа хүүхдүүдээ ганцаараа өсгөжээ.", enx: "Temüjin's mother, from the Olkhunuud tribe. She raised her children alone after her husband died." },
  "Тэмүжин": { en: "Temüjin", mn: "Чингис хааны багын нэр. 1206 онд Их Монгол Улсыг байгуулжээ.", enx: "Chinggis Khaan's name as a boy. In 1206 he founded the Great Mongol State." },
  "Чингис хаан": { en: "Chinggis Khaan", mn: "Тэмүжиний хаан цол. Тал нутгийн аймгуудыг нэгтгэж, 1206 онд Их Монгол Улсыг байгуулсан.", enx: "Temüjin's title as khan. He united the tribes of the steppe and founded the Great Mongol State in 1206." },
  "Дэй сэцэн": { en: "Dei Sechen", mn: "Хонгирад аймгийн ухаалаг ноён, Бөртэгийн эцэг. “Сэцэн” гэдэг нь мэргэн ухаантан гэсэн үг.", enx: "A wise chief of the Khongirad and Börte's father. “Sechen” means wise." },
  "Бөртэ": { en: "Börte", mn: "Тэмүжиний гэргий, Хонгирадын Дэй сэцэний охин. Хожим Бөртэ үжин хэмээн хүндлэгдсэн.", enx: "Temüjin's wife, the daughter of Dei Sechen of the Khongirad. Later honoured as Lady Börte." },
  "Мөнлөг": { en: "Mönglik", mn: "Есүхэйн итгэлт хүн. Үхэхийнхээ өмнө Есүхэй түүнд гэр бүлээ даатгажээ.", enx: "A trusted man of Yesügei, who asked him before he died to look after his family." },
  "Хасар": { en: "Qasar", mn: "Тэмүжиний дүү, нэрт мэргэн харваач.", enx: "Temüjin's younger brother, a famous archer." },
  "Бэгтэр": { en: "Begter", mn: "Тэмүжиний эцэг нэгт ах. Есүхэйн нөгөө гэргий Сочигэлийн хүү.", enx: "Temüjin's half-brother, a son of Yesügei's other wife, Sochigel." },
  "Бэлгүтэй": { en: "Belgütei", mn: "Бэгтэрийн дүү, Тэмүжиний эцэг нэгт дүү. Хожим Чингис хааны итгэлт нөхөр болсон.", enx: "Begter's younger brother and Temüjin's half-brother, who later became one of Chinggis Khaan's trusted men." },
  "Таргудай хирилтуг": { en: "Tarqutai Kiriltuq", mn: "Тайчууд аймгийн ноён.", enx: "A chief of the Tayichi'ud." },
  "Сорхон шар": { en: "Sorqan Shira", mn: "Сулдус овгийн хүн. Тайчуудын харьяат байсан ч Тэмүжинд тусалсан.", enx: "A man of the Suldus clan who served the Tayichi'ud, yet helped Temüjin escape." },
  "Чимбай": { en: "Chimbai", mn: "Сорхон шарын хүү.", enx: "A son of Sorqan Shira." },
  "Чилавун": { en: "Chila'un", mn: "Сорхон шарын хүү. Хожим Чингис хааны “дөрвөн хүлэг” жанжны нэг болсон.", enx: "A son of Sorqan Shira, later one of Chinggis Khaan's “four steeds”, his greatest generals." },
  "Хадаан": { en: "Qada'an", mn: "Сорхон шарын охин.", enx: "Sorqan Shira's daughter." },
  "Боорчу": { en: "Bo'orchu", mn: "Арулад овгийн Наху баяны хүү. Чингис хааны хамгийн анхны нөхөр, хожим нэрт жанжин.", enx: "Son of Naqu Bayan of the Arulad, Chinggis Khaan's very first companion and later a great general." },
  "Наху баян": { en: "Naqu Bayan", mn: "Боорчугийн эцэг, олон адуутай баян хүн.", enx: "Bo'orchu's father, a rich man with many horses." },
  "Цотан": { en: "Chotan", mn: "Бөртэгийн эх.", enx: "Börte's mother." },
  "Тоорил хан": { en: "To'oril Khan", mn: "Хэрэйд аймгийн хан, Есүхэйн анд. Хожим Ван хан хэмээн алдаршсан.", enx: "Khan of the Kereit and Yesügei's sworn brother, later known as Ong Khan." },
  "Жамуха": { en: "Jamuqa", mn: "Жадаран овгийн ноён, Тэмүжиний бага насны анд. Хожим түүний өрсөлдөгч болсон.", enx: "A chief of the Jadaran clan and Temüjin's childhood sworn brother, who later became his rival." },
  "Хуагчин": { en: "Qo'aqchin", mn: "Өэлүн эхийн гэрийн зарц эмгэн.", enx: "An old woman who served in Hö'elün's household." },
  "Мухулай": { en: "Muqali", mn: "Жалайр овгийн жанжин, “дөрвөн хүлэг”-ийн нэг.", enx: "A general of the Jalair clan, one of the “four steeds”." },
  "Борохул": { en: "Boroqul", mn: "Өэлүн эхийн өргөж авсан хүү, “дөрвөн хүлэг”-ийн нэг.", enx: "A boy adopted by Hö'elün, later one of the “four steeds”." },
  "Ц. Дамдинсүрэн": { en: "Ts. Damdinsüren", mn: "Монголын нэрт эрдэмтэн, зохиолч (1908–1986). Нууц товчоог өнөөгийн монгол хэлэнд хөрвүүлсэн.", enx: "A great Mongolian scholar and writer (1908–1986) who rendered the Secret History into modern Mongolian." },
};

window.NT_BOOK = [
  {
    id: "chono",
    title: { mn: "Өвөг дээдэс ба таван сум", en: "The Ancestors and the Five Arrows" },
    sub: { mn: "Бөртэ чоно, Гуа марал, Дува сохор, Алун гуа эхийн сургаал", en: "Börte Chino, Gua Maral, Duwa Soqor and Alan Gua's lesson" },
    ref: "§1–22",
    pages: [
      {
        img: "chono-1", sec: { mn: "Эхлэл", en: "Introduction" },
        mn: "Найман зуу гаруй жилийн өмнө монголчууд өөрсдийн түүхийг нэгэн номд бичиж үлдээжээ. Тэр бол “Монголын нууц {{товчоо}}”. Энэ номд [[Чингис хаан]]ы {{өвөг дээдэс}}, түүний хүнд хэцүү бага нас, хэрхэн тал нутгийг нэгтгэсэн тухай өгүүлдэг.",
        en: "More than eight hundred years ago, the Mongols wrote down their own history in a book: “The Secret History of the Mongols”, a {{товчоо|chronicle}}. It tells of the {{өвөг дээдэс|ancestors}} of [[Чингис хаан|Chinggis Khaan]], his hard childhood, and how he united the peoples of the steppe.",
      },
      {
        img: "chono-2", sec: { mn: "§1", en: "§1" },
        mn: "Ном ийм үгээр эхэлдэг: дээд тэнгэрээс заяат төрсөн [[Бөртэ чоно]] байжээ. Түүний гэргий нь [[Гуа марал]]. Эдгээр нь хүмүүсийн нэр бөгөөд “бор саарал чоно”, “шаргал марал” гэсэн утгатай. Тэд {{Тэнгис}} хэмээх их усыг гэтэлж ирээд, Онон мөрний эх, {{Бурхан халдун}} ууланд нутаглажээ. Тэднээс [[Батцагаан]] хэмээх хүү төржээ.",
        en: "The book begins like this: there was [[Бөртэ чоно|Börte Chino]], born with his destiny from Heaven above, and his wife was [[Гуа марал|Gua Maral]]. These are the names of people, meaning “blue-grey wolf” and “fallow doe”. They crossed a great water called the {{Тэнгис|Tenggis}} and settled at the source of the Onon river, on the mountain {{Бурхан халдун|Burkhan Khaldun}}. Their son was named [[Батцагаан|Batachiqan]].",
      },
      {
        img: "chono-5", sec: { mn: "§3–8", en: "§3–8" },
        mn: "Тэдний үр удмаас [[Дува сохор]], [[Добун мэргэн]] хэмээх ах дүү хоёр төржээ. Дува сохор духан дундаа ганц нүдтэй, гурван {{нүүдэл}}ийн газрыг хардаг байжээ. Нэгэн өдөр ах дүү хоёр Бурхан халдун ууланд гарав. Дува сохор холоос нүүж яваа айлуудын дунд тэргэн дээр сууж яваа нэгэн үзэсгэлэнтэй бүсгүйг олж хараад: “Хэрэв нөхөргүй бол дүү Добун мэргэндээ гуйж өгье” гэжээ. Тэр бүсгүй бол Хори түмэдийн [[Хорилардай мэргэн]]ий охин [[Алун гуа]] байлаа.",
        en: "Among their descendants were two brothers, [[Дува сохор|Duwa Soqor]] and [[Добун мэргэн|Dobun Mergen]]. Duwa Soqor had a single eye in the middle of his forehead and could see as far as three {{нүүдэл|days' moves}} away. One day the brothers climbed Burkhan Khaldun. Far away, among a group of families on the move, Duwa Soqor saw a beautiful girl sitting on a cart. “If she is not married,” he said, “let us ask for her for my younger brother Dobun Mergen.” The girl was [[Алун гуа|Alan Gua]], daughter of [[Хорилардай мэргэн|Qorilartai Mergen]] of the Qori Tumad.",
      },
      {
        img: "chono-3", sec: { mn: "§9–21", en: "§9–21" },
        mn: "Добун мэргэн, Алун гуа хоёр гэрлэж, хоёр хүүтэй болжээ. Добун мэргэнийг нас барсны дараа Алун гуа дахиад гурван хүү төрүүлэв. Таван хүү өсөж томрох үед том хоёр нь дүү нараа хардаж, хоорондоо шивнэлдэх болжээ. Нэгэн хавар Алун гуа хүүхдүүдээ дуудаж, эгнүүлэн суулгаад, тус бүрт нь нэг нэг сум өгч “Хугалаарай” гэв. Хүүхдүүд сумаа амархан хугалжээ.",
        en: "Dobun Mergen and Alan Gua married and had two sons. After Dobun Mergen died, Alan Gua had three more sons. As the five boys grew up, the two eldest grew suspicious of their younger brothers and whispered about them. One spring Alan Gua called her sons, sat them down in a row, gave each of them one arrow and said, “Break it.” Each boy snapped his arrow easily.",
      },
      {
        img: "chono-4", sec: { mn: "§22", en: "§22" },
        mn: "Дараа нь Алун гуа таван сумыг хамт боогоод “Одоо хугалаарай” гэв. Таван хүү ээлжилж оролдсон ч хэн нь ч хугалж чадсангүй. Тэгэхэд эх нь хэлэв: “Та нар нэг нэгээрээ салвал ганц сум шиг хэнд ч амархан хугална. Таван сум шиг эв нэгдэлтэй байвал хэн ч та нарыг дийлэхгүй.” Түүний отгон хүү [[Бодончар]]аас Чингис хааны овог үүсчээ.",
        en: "Then Alan Gua tied five arrows together and said, “Now break these.” The five boys took turns, but none of them could break the bundle. Their mother said, “If you go your own ways, anyone can break you, like a single arrow. If you stay together like these five arrows, no one can defeat you.” From her youngest son, [[Бодончар|Bodonchar]], came the clan of Chinggis Khaan.",
      },
      {
        fact: true, img: "chono-f",
        mn: "Бөртэ чоно, Гуа марал хоёрыг зарим хүн амьтан гэж ойлгодог. Гэвч Нууц товчоонд тэд хүмүүс бөгөөд эхнэр нөхөр хоёр, үр удамтай. Эртний нүүдэлчид хүүхдээ хүчирхэг, сэргэлэн амьтдын нэрээр нэрлэх дуртай байжээ. Бурхан халдун уул Хэнтий аймагт өнөөдөр ч бий. Таван сумны сургаалыг монголчууд одоо ч эв нэгдлийн тухай ярихдаа дурсдаг.",
        en: "Some people imagine Börte Chino and Gua Maral as animals. But in the Secret History they are people: a husband and wife with children and grandchildren. Ancient nomads liked to name their children after strong, quick animals. Burkhan Khaldun still stands in Khentii province today, and Mongols still recall the five arrows whenever they speak about unity.",
      },
    ],
    check: {
      q: { mn: "Алун гуа таван сумаар хүүхдүүддээ юуг ойлгуулсан бэ?", en: "What did Alan Gua teach her sons with the five arrows?" },
      a: [{ mn: "Сум хийхийн ач холбогдлыг", en: "Why arrows are useful" }, { mn: "Эв нэгдэлтэй байвал хүчтэй гэдгийг", en: "Together they are strong" }, { mn: "Ан агнах аргыг", en: "How to hunt" }],
      ok: 1,
    },
  },
  {
    id: "nuj",
    title: { mn: "Нөж атгасан хүү", en: "The Boy Who Held a Blood Clot" },
    sub: { mn: "Тэмүжин төрж, Бөртэтэй сүй тавьсан нь", en: "Temüjin is born and promised to Börte" },
    ref: "§59–66",
    pages: [
      {
        sec: { mn: "§59", en: "§59" },
        mn: "Олон үеийн дараа [[Есүхэй]] баатар хэмээх эр байжээ. Нэгэн удаа тэрээр татарын [[Тэмүжин үгэ]] хэмээх ноёныг олзолж иржээ. Яг тэр үед гэргий [[Өэлүн]] нь Онон голын Дэлүүн болдог хэмээх газар хүү төрүүлэв. Нярай хүү баруун гартаа шагай шиг {{нөж}} атгаж төрсөн гэдэг. Эцэг нь хүүгээ [[Тэмүжин]] гэж нэрлэжээ.",
        en: "Many generations later there lived a warrior named [[Есүхэй|Yesügei]]. One day he came home with a captured Tatar chief called [[Тэмүжин үгэ|Temüjin Üge]]. At that very time his wife [[Өэлүн|Hö'elün]] gave birth to a son at Delüün Boldog on the Onon river. It is said the baby was born holding a {{нөж|blood clot}} the size of a knucklebone in his right hand. His father named him [[Тэмүжин|Temüjin]].",
      },
      {
        sec: { mn: "§61–62", en: "§61–62" },
        mn: "Тэмүжин есөн настай болоход Есүхэй баатар хүүдээ {{сүйт бүсгүй}} хайхаар Өэлүн эхийн төрөл болох олхонуд {{аймаг}} руу дагуулан явжээ. Замдаа тэд хонгирадын [[Дэй сэцэн]] хэмээх ухаалаг хүнтэй таарав.",
        en: "When Temüjin was nine, Yesügei took him to find a {{сүйт бүсгүй|bride-to-be}} among the Olkhunuud, the {{аймаг|tribe}} of Hö'elün's family. On the way they met a wise man of the Khongirad called [[Дэй сэцэн|Dei Sechen]].",
      },
      {
        sec: { mn: "§62–65", en: "§62–65" },
        mn: "Дэй сэцэн хэлэв: “Өнгөрсөн шөнө нар, сар хоёрыг атгасан цагаан {{шонхор}} гарт минь ирж суухыг зүүдэлсэн юм. Энэ сайн {{ёр}} байжээ.” Тэрээр Тэмүжинг “нүдэндээ галтай, нүүрэндээ гэрэлтэй хүү” гэж магтаад, гэртээ урив. Дэй сэцэний охин [[Бөртэ]] арван настай, мөн л нүдэндээ галтай, нүүрэндээ гэрэлтэй бүсгүй байжээ.",
        en: "Dei Sechen said, “Last night I dreamt that a white {{шонхор|gyrfalcon}} holding the sun and the moon came and landed on my hand. It was a good {{ёр|omen}}.” He praised Temüjin as “a boy with fire in his eyes and light in his face” and invited them home. His daughter [[Бөртэ|Börte]] was ten years old, and she too had fire in her eyes and light in her face.",
      },
      {
        sec: { mn: "§66", en: "§66" },
        mn: "Хоёр эцэг тохиролцож, Тэмүжинг {{хүргэн}} болгон Дэй сэцэнийд үлдээв. Тэр үеийн ёсоор хүргэн хөвгүүн сүйт бүсгүйнхээ гэрт хэсэг хугацаанд амьдардаг байжээ. Есүхэй буцахдаа “Миний хүү нохойноос айдаг юм, нохойгоор бүү айлгаарай” гэж захисан гэдэг. Агуу хаан болох хүн ч бага насандаа айдаг зүйлтэй байжээ.",
        en: "The two fathers agreed, and Temüjin stayed with Dei Sechen's family as his future {{хүргэн|son-in-law}}. By the custom of the time, a promised boy lived for a while in his bride's home. As he left, Yesügei said, “My son is afraid of dogs. Don't let the dogs frighten him.” Even a boy who would become a great khan had things he was afraid of.",
      },
      {
        fact: true, img: "nuj-f",
        mn: "Тэмүжин хэдэн онд төрсөн бэ? Нууц товчоонд он дурдаагүй тул эрдэмтэд өөр өөр тоо гаргадаг. Монголд уламжлал ёсоор 1162 он гэж тооцдог. Түүний төрсөн Дэлүүн болдог хаана байсан талаар ч судлаачид маргадаг. Хэнтий аймгийн Дадал сумд түүний төрсөн газрын дурсгал бий.",
        en: "In what year was Temüjin born? The Secret History gives no year, so scholars suggest different dates. In Mongolia it is traditionally counted as 1162. Researchers also disagree about where Delüün Boldog was. There is a monument to his birthplace in Dadal soum, Khentii province.",
      },
    ],
    check: {
      q: { mn: "Дэй сэцэн ямар зүүд зүүдэлсэн бэ?", en: "What did Dei Sechen dream about?" },
      a: [{ mn: "Бөртэ чоно, Гуа марал хоёр", en: "Börte Chino and Gua Maral" }, { mn: "Есөн хөлт цагаан туг", en: "The Nine White Banners" }, { mn: "Нар, сар атгасан цагаан шонхор", en: "A white gyrfalcon holding the sun and the moon" }],
      ok: 2,
    },
  },
  {
    id: "uelun",
    title: { mn: "Өэлүн эх", en: "Mother Hö'elün" },
    sub: { mn: "Эцгээ алдсан гэр бүл хэрхэн амьд үлдсэн бэ", en: "How a family survived after losing its father" },
    ref: "§67–78",
    pages: [
      {
        sec: { mn: "§67–69", en: "§67–69" },
        mn: "Хүүгээ үлдээгээд буцах замдаа Есүхэй баатар Шар хээр хэмээх газар найрлаж буй татаруудтай таарав. Тал нутгийн ёсоор замын хүнийг дайлдаг байв. Гэвч татарууд түүнийг таниад, хоолонд нь хор холижээ. Есүхэй гэртээ гурван хоног явж хүрээд хүнд өвдөв. Тэрээр [[Мөнлөг]]ийг дуудаж, Тэмүжинг яаралтай авчрахыг захиад нас баржээ.",
        en: "Riding home after leaving his son, Yesügei came upon some Tatars feasting at a place called the Yellow Steppe. By steppe custom, travellers were offered food. But the Tatars recognised him and mixed poison into his meal. After three days' ride Yesügei reached home, gravely ill. He called [[Мөнлөг|Mönglik]], asked him to bring Temüjin back quickly, and died.",
      },
      {
        sec: { mn: "§70–73", en: "§70–73" },
        mn: "Есүхэйг нас барсны дараа тайчууд хэмээх хамаатнууд нь {{бэлэвсэн}} Өэлүнийг бага насны хүүхдүүдтэй нь орхиод нүүгээд явжээ. Өргөн тал дунд гэр бүл маань ганцаараа үлджээ.",
        en: "After Yesügei died, his relatives, the Tayichi'ud, moved away and abandoned the {{бэлэвсэн|widowed}} Hö'elün and her young children. The family was left alone on the wide steppe.",
      },
      {
        sec: { mn: "§74–75", en: "§74–75" },
        mn: "Гэвч Өэлүн эх бууж өгсөнгүй. Бүсээ чангалан бүсэлж, Онон голыг өгсөж уруудан гүйж, алим, мойл түүж, үндэс малтаж, зэрлэг сонгино ухаж хүүхдүүдээ тэжээжээ. Хөвгүүд нь зүү нугалж дэгээ хийгээд, голоос загас барьж ээжийгээ тэжээх болов.",
        en: "But Mother Hö'elün did not give up. She tied her belt tight and ran up and down the Onon river, picking wild apples and bird cherries, digging roots and wild onions to feed her children. Her sons bent needles into fish hooks, caught fish in the river and began to feed their mother in turn.",
      },
      {
        sec: { mn: "§76–78", en: "§76–78" },
        mn: "Хүүхдүүд өсөхийн хэрээр маргаан ч гарав. Тэмүжин, [[Хасар]] хоёр барьсан загас, шувуугаа эцэг нэгт ах [[Бэгтэр]]тээ булаалгасандаа уурлаж, хэрээс хэтэрсэн хэрэг хийж, Бэгтэрийг амь насаа алдахад хүргэжээ. Өэлүн эх их уурлаж: “Сүүдрээс өөр нөхөргүй, сүүлнээс өөр ташуургүй байхад та нар яасан бэ!” гэж зэмлэв. Тэр үед тэдэнд найдах хүн гэж өөр хоорондоо л байсан юм.",
        en: "As the children grew, quarrels began. When their half-brother [[Бэгтэр|Begter]] took the fish and the bird they had caught, Temüjin and [[Хасар|Qasar]] became so angry that they went too far, and Begter lost his life. Hö'elün was furious: “We have no friends but our shadows, no whips but our horses' tails. What have you done?” At that time the only people they could rely on were each other.",
      },
      {
        fact: true, img: "uelun-f",
        mn: "Нууц товчоо зөвхөн баатарлаг үйлсийг магтаад зогсдоггүй. Ах дүүгийн хэрүүл, алдаа, гашуун явдлыг ч нуулгүй бичсэн байдаг. Тиймээс түүхчид үүнийг их үнэ цэнтэй эх сурвалж гэж үздэг. Өэлүн эх хүнд үед гэр бүлээ авч үлдсэн тул монголчууд түүнийг эх хүний бат зоригийн бэлгэдэл болгон хүндэтгэдэг.",
        en: "The Secret History does not only praise heroic deeds. It also tells openly about quarrels between brothers, mistakes and sad events. That is why historians value it so highly. Because Hö'elün kept her family alive in the hardest times, Mongols honour her as a symbol of a mother's courage.",
      },
    ],
    check: {
      q: { mn: "Эцгээ алдсаны дараа Өэлүн эх хүүхдүүдээ юугаар тэжээсэн бэ?", en: "How did Hö'elün feed her children after their father died?" },
      a: [{ mn: "Мал сүргээрээ", en: "With her herds" }, { mn: "Жимс, үндэс түүж, загас барьж", en: "By gathering fruit and roots and catching fish" }, { mn: "Хаанаас тусламж авч", en: "With help from a khan" }],
      ok: 1,
    },
  },
  {
    id: "dongo",
    title: { mn: "Модон дөнгө", en: "The Wooden Cangue" },
    sub: { mn: "Тэмүжин олзноос оргож, Сорхон шар тусалсан нь", en: "Temüjin escapes, with help from Sorqan Shira" },
    ref: "§79–87",
    pages: [
      {
        sec: { mn: "§79–81", en: "§79–81" },
        mn: "Тэмүжин өсөж том болж байгааг тайчуудын ноён [[Таргудай хирилтуг]] ихэд болгоомжилжээ. Тэрээр Тэмүжинг баривчлаад хүзүүнд нь хүнд модон {{дөнгө}} углав. Тэмүжинг айл бүрт ээлжлэн хонуулж, хатуу хянадаг байв.",
        en: "[[Таргудай хирилтуг|Tarqutai Kiriltuq]], chief of the Tayichi'ud, grew wary as Temüjin grew up. He captured Temüjin and locked a heavy wooden {{дөнгө|cangue}} around his neck. Temüjin was made to spend each night in a different tent, under close watch.",
      },
      {
        sec: { mn: "§81", en: "§81" },
        mn: "Зуны тэргүүн сарын арван зургааны өдөр тайчууд Онон голын эрэгт найр хийгээд орой нь тараад явжээ. Тэмүжинг сул дорой нэгэн залуу ганцаар манаж үлдэв. Тэмүжин боломжийг ашиглан дөнгөөрөө манаачийг цохиод зугтав. Ойд орвол олдоно гэж бодоод Онон гол руу орж, усанд хэвтээд зөвхөн нүүрээ гаргаж нуугдав.",
        en: "On the sixteenth day of the first month of summer, the Tayichi'ud held a feast on the bank of the Onon and went home in the evening. A weak young man was left alone to guard Temüjin. Seizing his chance, Temüjin struck the guard with the cangue and ran. Thinking he would be found in the forest, he went into the Onon river, lay down in the water and hid with only his face showing.",
      },
      {
        sec: { mn: "§82–85", en: "§82–85" },
        mn: "Түүнийг хайж явсан хүмүүсийн дотроос сулдус овгийн [[Сорхон шар]] олж харав. Гэвч хэнд ч хэлсэнгүй. “Ийм ухаантай, нүдэндээ галтай учраас л тайчууд чамайг атаархаж байна. Тэндээ хэвтэж бай” гэж шивнэжээ. Шөнө нь Тэмүжин айраг бүлэх дууг чагнан, Сорхон шарын гэрийг олж очив.",
        en: "Among the searchers, [[Сорхон шар|Sorqan Shira]] of the Suldus clan spotted him. But he told no one. He whispered, “It is because you are so clever, with fire in your eyes, that the Tayichi'ud are jealous of you. Stay lying there.” That night Temüjin followed the sound of airag being churned and found Sorqan Shira's tent.",
      },
      {
        sec: { mn: "§85–87", en: "§85–87" },
        mn: "Сорхон шарын хөвгүүд [[Чимбай]], [[Чилавун]] хоёр дөнгийг нь тайлж гал руу хийж шатаав. Тэд Тэмүжинг ноос ачсан тэргэнд нууж, охин [[Хадаан]] нь харж хандав. Хайгчид ирж ноосыг ухах гэхэд Сорхон шар “Ийм халуунд ноос дотор хүн тэсэх үү?” гэжээ. Хайгчид буцав. Сорхон шар Тэмүжинд морь, хүнс, нум, хоёр сум өгч гэрт нь буцаажээ.",
        en: "Sorqan Shira's sons, [[Чимбай|Chimbai]] and [[Чилавун|Chila'un]], took off the cangue and burned it in the fire. They hid Temüjin in a cart piled with wool, and their sister [[Хадаан|Qada'an]] looked after him. When the searchers came and started poking into the wool, Sorqan Shira said, “Who could bear to sit in wool in this heat?” The searchers left. Sorqan Shira gave Temüjin a horse, food, a bow and two arrows, and sent him home.",
      },
      {
        fact: true, img: "dongo-f",
        mn: "Хүнд үед тусалсан хүмүүсээ Тэмүжин хэзээ ч мартсангүй. Сорхон шарын хүү Чилавун хожим Чингис хааны хамгийн итгэлтэй дөрвөн жанжны нэг болжээ. Тэднийг “дөрвөн хүлэг” гэдэг: [[Боорчу]], [[Мухулай]], [[Борохул]], Чилавун.",
        en: "Temüjin never forgot the people who helped him in hard times. Sorqan Shira's son Chila'un later became one of Chinggis Khaan's four most trusted generals, known as the “four steeds”: [[Боорчу|Bo'orchu]], [[Мухулай|Muqali]], [[Борохул|Boroqul]] and Chila'un.",
      },
    ],
    check: {
      q: { mn: "Сорхон шарынхан Тэмүжинг хаана нуусан бэ?", en: "Where did Sorqan Shira's family hide Temüjin?" },
      a: [{ mn: "Гэрийн шалан доор", en: "Under the floor of the tent" }, { mn: "Ноос ачсан тэргэнд", en: "In a cart full of wool" }, { mn: "Ойн агуйд", en: "In a forest cave" }],
      ok: 1,
    },
  },
  {
    id: "boorchu",
    title: { mn: "Найман шарга морь", en: "The Eight Light Bay Horses" },
    sub: { mn: "Тэмүжин, Боорчу хоёрын нөхөрлөл", en: "The friendship of Temüjin and Bo'orchu" },
    ref: "§90–93",
    pages: [
      {
        sec: { mn: "§90", en: "§90" },
        mn: "Нэгэн өдөр гэрийнх нь ойроос хулгайч нар найман {{шарга}} морийг туугаад явжээ. Энэ нь гэр бүлийн бараг бүх морь байв. [[Бэлгүтэй]] тарвага агнаад унаж ирсэн ганц морийг Тэмүжин унаж, хулгайчдын мөрийг мөшгөв.",
        en: "One day thieves drove off eight {{шарга|light bay}} horses from near the family's camp. They were almost all the horses the family had. Temüjin took the only horse left, which [[Бэлгүтэй|Belgütei]] had ridden out hunting marmots, and followed the thieves' tracks.",
      },
      {
        sec: { mn: "§90", en: "§90" },
        mn: "Гурван хоног мөшгөсний эцэст Тэмүжин их адуун сүргийн дэргэд гүү сааж буй нэгэн залуутай таарав. Тэр бол [[Наху баян]]ы хүү Боорчу байлаа. Тэмүжин морьдоо асуухад Боорчу “Өнөө өглөө нар гарахаас өмнө найман шарга морь энүүгээр туугаад явсан” гэв.",
        en: "After three days on the trail, Temüjin met a young man milking mares beside a great herd of horses. It was Bo'orchu, the son of [[Наху баян|Naqu Bayan]]. When Temüjin asked about his horses, Bo'orchu said, “This morning, before sunrise, someone drove eight light bay horses past here.”",
      },
      {
        sec: { mn: "§90–92", en: "§90–92" },
        mn: "Боорчу “Эр хүний зовлон нэг. Би чамд нөхөр болъё” гээд сүүтэй хувингаа хээр орхиж, гэрийнхэндээ ч хэлэлгүй Тэмүжинд шинэ морь өгч, хамт мордов. Тэд хэд хоног явж хулгайчдын хүрээнд хүрч, найман морио эргүүлэн туужээ.",
        en: "“Hardship is the same for every man,” said Bo'orchu. “I will be your companion.” He left his milk pails in the grass, gave Temüjin a fresh horse and rode off with him without even telling his family. After some days they reached the thieves' camp and drove the eight horses back.",
      },
      {
        sec: { mn: "§92–93", en: "§92–93" },
        mn: "Тэмүжин олзоос хуваан өгье гэхэд Боорчу татгалзав: “Чамайг зовж явахад нь туслах гэж ирсэн юм. Олз хүсээгүй.” Хүүгээ алга болсонд уйлж байсан Наху баян учрыг сонсоод “Та хоёр залуу хойшид бие биеэ бүү орхиорой” гэж захижээ.",
        en: "When Temüjin offered to share the horses with him, Bo'orchu refused: “I came because you were in trouble, not for a reward.” Naqu Bayan, who had been weeping because his son had disappeared, heard the whole story and told them, “From now on, you two young men must never abandon each other.”",
      },
      {
        fact: true, img: "boorchu-f",
        mn: "Боорчу Чингис хааны хамгийн анхны нөхөр, хожим нэрт жанжин нь болжээ. Танихгүй залууд туслахаар шийдсэн тэр өдрөөс насан туршийн нөхөрлөл эхэлсэн юм. Нууц товчоо үнэнч нөхрийн ач тусыг олон удаа онцолдог.",
        en: "Bo'orchu became Chinggis Khaan's very first companion and later one of his great generals. A lifelong friendship began on the day he decided to help a stranger. The Secret History often stresses how much a loyal friend is worth.",
      },
    ],
    check: {
      q: { mn: "Боорчу Тэмүжинд туслаад юу хүссэн бэ?", en: "What did Bo'orchu ask for in return for his help?" },
      a: [{ mn: "Хагас морийг нь", en: "Half of the horses" }, { mn: "Ноён цол", en: "A noble title" }, { mn: "Юу ч хүсээгүй", en: "Nothing at all" }],
      ok: 2,
    },
  },
  {
    id: "borte",
    title: { mn: "Бөртэг аварсан нь", en: "Rescuing Börte" },
    sub: { mn: "Мэргидийн дайралт, сарны гэрэл дэх уулзалт", en: "The Merkit raid and a meeting by moonlight" },
    ref: "§94–110",
    pages: [
      {
        sec: { mn: "§94–96", en: "§94–96" },
        mn: "Тэмүжин өсөж том болоод Дэй сэцэнийд очиж Бөртэтэй гэрлэв. Бөртэгийн ээж [[Цотан]] хүргэндээ хар {{булга}}н {{дах}} бэлэглэжээ. Тэмүжин тэр дахыг эцгийнхээ {{анд}} болох хэрэйдийн [[Тоорил хан]]д аваачиж өгөв. Тоорил хан баярлаад “Тарсан улсыг чинь хурааж өгье” гэж амлав.",
        en: "When Temüjin grew up, he went to Dei Sechen's camp and married Börte. Börte's mother, [[Цотан|Chotan]], gave her son-in-law a black {{булга|sable}} {{дах|fur coat}}. Temüjin took the coat to [[Тоорил хан|To'oril Khan]] of the Kereit, his father's {{анд|sworn brother}}. To'oril Khan was delighted and promised, “I will gather your scattered people back to you.”",
      },
      {
        sec: { mn: "§98–101", en: "§98–101" },
        mn: "Нэгэн үүрээр [[Хуагчин]] эмгэн газар доргиж буйг сонсоод “Бос! Бос! Морьтой цэрэг ирж байна!” гэж сэрээв. Мэргидийн цэрэг довтолжээ. Тэмүжин, ах дүүс нь морь унаж зугтав. Харин Бөртэд унах морь үлдсэнгүй. Хуагчин түүнийг бүхээгтэй тэргэнд нуусан ч мэргидүүд олоод авч явжээ.",
        en: "One dawn the old woman [[Хуагчин|Qo'aqchin]] heard the ground trembling and woke everyone: “Get up! Get up! Horsemen are coming!” The Merkits were attacking. Temüjin and his brothers escaped on horseback, but there was no horse left for Börte. Qo'aqchin hid her in a covered cart, but the Merkits found her and carried her away.",
      },
      {
        sec: { mn: "§102–103", en: "§102–103" },
        mn: "Тэмүжин {{Бурхан халдун}} ууланд нуугдаж аврагдав. Аюул өнгөрсний дараа тэрээр бүсээ хүзүүндээ зүүж, малгайгаа гартаа барин, наранд хандаж есөн удаа мөргөөд {{сачил}} өргөн ууландаа талархжээ. Монголчууд Бурхан халдуныг өнөөг хүртэл тахидаг.",
        en: "Temüjin hid on {{Бурхан халдун|Burkhan Khaldun}} and was saved. When the danger had passed, he hung his belt around his neck, held his hat in his hand, bowed nine times towards the sun and offered a {{сачил|libation}} to thank the mountain. Mongols still worship Burkhan Khaldun today.",
      },
      {
        sec: { mn: "§104–110", en: "§104–110" },
        mn: "Тоорил хан, [[Жамуха]] хоёр цэргээ авч ирж Тэмүжинд тусалжээ. Шөнийн довтолгооны үеэр мэргидүүд сандран зугтаж байхад Тэмүжин “Бөртэ! Бөртэ!” гэж дуудан явав. Дуугаар нь таньсан Бөртэ тэрэгнээс бууж гүйж ирээд морины нь {{цулбуур}}аас барив. Сарны гэрэлд тэд бие биеэ таньж тэврэлдэв.",
        en: "To'oril Khan and [[Жамуха|Jamuqa]] brought their armies to help Temüjin. During the night attack, as the Merkits fled in panic, Temüjin rode among them calling, “Börte! Börte!” Börte knew his voice. She jumped down from a cart, ran to him and caught hold of his horse's {{цулбуур|reins}}. In the moonlight they recognised each other and embraced.",
      },
      {
        fact: true, img: "borte-f",
        mn: "Жамуха бол Тэмүжиний бага насны {{анд}} байсан. Тэд хүүхэд байхдаа шагай, сум солилцож анд болжээ. Мэргидийг ялсны дараа тэд хэсэг хугацаанд хамт нутаглав. Хожим хэн нь тал нутгийг удирдах вэ гэдгээр өрсөлдөгч болсон юм.",
        en: "Jamuqa had been Temüjin's {{анд|sworn brother}} since childhood. As boys they swapped knucklebones and arrows and swore to be brothers. After defeating the Merkits they camped together for a while. Later they became rivals over who would lead the steppe.",
      },
    ],
    check: {
      q: { mn: "Харанхуй шөнө Бөртэ Тэмүжинг юугаар нь таньсан бэ?", en: "In the dark night, how did Börte recognise Temüjin?" },
      a: [{ mn: "Морины нь зүсээр", en: "By the colour of his horse" }, { mn: "Дуугаар нь", en: "By his voice" }, { mn: "Тугаар нь", en: "By his banner" }],
      ok: 1,
    },
  },
  {
    id: "tug",
    title: { mn: "Есөн хөлт цагаан туг", en: "The Nine White Banners" },
    sub: { mn: "Их Монгол Улс байгуулагдсан нь, ном хэрхэн бичигдсэн бэ", en: "The Great Mongol State is founded, and how the book was written" },
    ref: "§123, §202–206, §282",
    pages: [
      {
        sec: { mn: "§123", en: "§123" },
        mn: "Тэмүжиний эр зориг, шударга занг хүмүүс хүндэтгэх болж, олон айл түүний зүг нүүж ирэв. Хамаатан ноёд нь түүнийг хаан болгохоор шийдэж, “Чингис” хэмээх цол өргөжээ. Гэвч тал нутаг бүхэлдээ нэгдэхэд олон жилийн хүнд тэмцэл шаардагдав.",
        en: "People came to respect Temüjin's courage and fairness, and many families moved to join him. His noble relatives decided to make him their khan and gave him the title “Chinggis”. But uniting the whole steppe still took many years of hard struggle.",
      },
      {
        sec: { mn: "§202", en: "§202" },
        mn: "1206 онд, барс жил, Онон мөрний эхэнд их {{хуралдай}} болов. Есөн хөлт цагаан тугаа мандуулж (нэг том, найман жижиг туг), Тэмүжинг Чингис хаан хэмээн {{өргөмжлөх|өргөмжлөв}}. Тал нутгийн олон аймаг нэг улс болж, Их Монгол Улс байгуулагджээ.",
        en: "In 1206, the Year of the Tiger, a great {{хуралдай|khuraldai}} gathered at the source of the Onon river. The Nine White Banners were raised, and Temüjin was {{өргөмжлөх|proclaimed}} Chinggis Khaan. The many tribes of the steppe became one state: the Great Mongol State.",
      },
      {
        sec: { mn: "§202–206", en: "§202–206" },
        mn: "Чингис хаан улсаа ерэн таван {{мянгат}}аар зохион байгуулав. Хүнд үед дэргэд нь байсан нөхдөө мартсангүй: Боорчу, Мухулай нарыг түмний ноён болгож, Сорхон шар зэрэг тусалсан хүмүүсээ шагнажээ.",
        en: "Chinggis Khaan organised his state into ninety-five {{мянгат|thousands}}. He did not forget the companions who had stood by him in hard times: he made Bo'orchu and Muqali commanders of ten thousand, and rewarded those who had helped him, such as Sorqan Shira.",
      },
      {
        sec: { mn: "§282", en: "§282" },
        mn: "Энэ номыг хэн бичсэн бэ? Номын төгсгөлд: “Хулгана жилийн долоон сард, Хэрлэн мөрний Хөдөө аралд их хуралдай хуралдаж байхад бичиж дуусгав” гэжээ. Харин зохиогчийн нэр бичигдээгүй. Тиймээс энэ нь өнөөг хүртэл нууц хэвээр байна.",
        en: "Who wrote this book? Its last lines say: “It was finished in the seventh month of the Year of the Rat, while the great assembly was gathered at Khödöö Aral on the Kherlen river.” But the author's name is not written anywhere, so it remains a secret to this day.",
      },
      {
        fact: true, img: "tug-f",
        mn: "Нууц товчооны монгол бичгээр бичсэн эх нь алдагдсан. Харин монгол үгийн дуудлагыг хятад үсгээр тэмдэглэсэн хувилбар нь хадгалагдан үлдсэнээр өнөөдөр бид уншиж чадаж байна. Монголд үүнийг уламжлал ёсоор 1240 онд бичсэн гэж үздэг бол зарим эрдэмтэд 1228 он гэдэг. Академич [[Ц. Дамдинсүрэн]] 1947 онд өнөөгийн монгол хэлээр орчуулж, олон түмэнд хүргэсэн.",
        en: "The original text in Mongol script has been lost. We can read the book today because a version that wrote down the sound of the Mongolian words in Chinese characters survived. In Mongolia it is traditionally dated to 1240, while some scholars prefer 1228. In 1947 Academician [[Ц. Дамдинсүрэн|Ts. Damdinsüren]] rendered it into modern Mongolian and brought it to everyone.",
      },
    ],
    check: {
      q: { mn: "Тэмүжинг Чингис хаан хэмээн өргөмжилсөн их хуралдай хэдэн онд болсон бэ?", en: "In which year was Temüjin proclaimed Chinggis Khaan at the great assembly?" },
      a: [{ mn: "1206 онд", en: "In 1206" }, { mn: "1162 онд", en: "In 1162" }, { mn: "1240 онд", en: "In 1240" }],
      ok: 0,
    },
  },
];

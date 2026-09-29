# GRIT вэбсайт

Figma дизайн (Desktop 10–13)-аас энгийн HTML, CSS, JavaScript ашиглан хийсэн вэбсайт. Framework болон build алхам шаардахгүй.

## Хуудсууд

| Файл | Figma frame | Агуулга |
|---|---|---|
| `index.html` | Desktop 10 | Нүүр: hero, Where we work (газрын зураг), зургууд, Projects, Podcast, Team, Contact |
| `edu.html` | Desktop 11 | GRIT - EDU төслийн хуудас |
| `environment.html` | Desktop 12 | GRIT - ENVIRONMENT төслийн хуудас |
| `member.html` | Desktop 13 | Багийн гишүүний намтар |

```
css/style.css      бүх загвар (өнгөнүүд :root хэсэгт)
js/main.js         гар утасны цэс + татагдаагүй зургийн placeholder
assets/img/        Figma-аас гаргасан зургууд (вэбэд зориулж шахсан)
```

## Ажиллуулах

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Эсвэл `index.html`-ийг браузерт шууд нээнэ.

## Зураг солих

Одоогийн зургууд Figma дээрх ноорог зургууд. Шинэ зургаа **яг ижил нэрээр** `assets/img/` хавтаст хуулж солиход сайт дээр автоматаар солигдоно.
GitHub дээр: `assets/img` → **Add file → Upload files**. Файлын нэр ижил байвал хуучныг нь дарж бичнэ.

| Файл | Хаана харагдах | Санал болгох хэмжээ |
|---|---|---|
| `logo.png` | Цэсний зүүн дээд лого | 212×102 (тунгалаг PNG) |
| `hero.jpg` | Нүүр хуудасны том арын зураг | 2400×1260 |
| `nav-photo.jpg` | Дэд хуудсуудын цэсний арын зураг | 1440 өргөн |
| `where-card.webp` | "Where we work" картын арын зураг (нуур, гэр) | 2674×1150 |
| `map.svg` | Монголын газрын зураг | — |
| `photo-1.jpg` … `photo-4.jpg` | Гүйдэг том зургууд, EDU/Environment-ийн Photos | 800×1000 (босоо) |
| `edu-cover.jpg`, `edu-cover-2.jpg` | GRIT EDU карт (нүүр / EDU хуудас) | 760×910 (босоо) |
| `env-cover.jpg`, `env-cover-2.jpg` | GRIT ENVIRONMENT карт | 760×910 (босоо) |
| `badge.png`, `badge-env.png` | Картын баруун дээд буланд эргүүлсэн жижиг лого | 320×320 |
| `podcast.png` | Подкастын 3 карт | 830×512 |
| `member.png` | Нүүр хуудасны багийн гишүүний карт | 576×670 |
| `member-portrait.png` | Гишүүний хуудасны хөрөг | 576×670 |
| `member-photo-a.png`, `member-photo-b.png` | Гишүүний хуудасны Photos | 600×664 |
| `edu-chart.png`, `env-chart.png` | Impact график | 1420×574 |
| `footer.webp` | Contact хэсгийн арын зураг (морь) | 2886×444 |

Өөр өргөтгөлтэй (жишээ нь `.png`-ийн оронд `.jpg`) файл оруулбал HTML дотор нэрийг нь солих хэрэгтэй. Эсвэл надад хэлээрэй.

## Агуулга засах

- "Lorem ipsum", "Name", "School" зэрэг нь дизайн дахь түр текст — HTML файл дотор шууд солино.
- Багийн гишүүн нэмэхдээ `index.html` доторх `<a class="member-card">` блокийг хуулна.
- "Coming soon" цэс одоогоор холбоосгүй.
- Гар утсан дээр (900px-ээс бага) цэс хураагдаж, зургийн мөрүүд хажуу тийш гүйдэг.

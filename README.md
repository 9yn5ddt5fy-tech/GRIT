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
assets/img/        Figma-аас гаргасан зургууд
download-assets.sh зургуудыг Figma-аас татах скрипт
```

## Ажиллуулах

1. Зургуудыг татах:
   ```bash
   ./download-assets.sh
   ```
   Figma-гийн зургийн холбоос ~7 хоногийн дараа хүчингүй болно. Тэгвэл Figma дээр зураг бүрийг сонгоод Export → PNG/SVG хийж, `download-assets.sh` дотор бичсэн нэрээр нь `assets/img/` хавтаст хадгална.
2. Браузерт нээх:
   ```bash
   python3 -m http.server 8000
   # http://localhost:8000
   ```

Зураг татагдаагүй үед тухайн байрлалд цайвар ногоон placeholder харагдана.

## Агуулга засах

- "Lorem ipsum", "Name", "School" зэрэг нь дизайн дахь түр текст — HTML файл дотор шууд солино.
- Багийн гишүүн нэмэхдээ `index.html` доторх `<a class="member-card">` блокийг хуулна.
- "Coming soon" цэс одоогоор холбоосгүй.
- Гар утсан дээр (900px-ээс бага) цэс хураагдаж, зургийн мөрүүд хажуу тийш гүйдэг.

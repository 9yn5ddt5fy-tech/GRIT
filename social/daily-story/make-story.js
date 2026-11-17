// Make the "word of the day" story for a date straight from the game's word list.
// Usage: node make-story.js 2026-11-17 [label]
//   label defaults to "Өнөөдрийн үг"; use "Өчигдрийн үг" when posting the next morning.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const day = process.argv[2] || new Date().toISOString().slice(0, 10);
const label = process.argv[3] || 'Өнөөдрийн үг';
const sql = fs.readFileSync(process.env.WORDS || path.join(__dirname, '../../supabase/002_words.sql'), 'utf8');
const rows = [];
const re = /^\s*\((\d+), '((?:[^']|'')*)', '((?:[^']|'')*)', '((?:[^']|'')*)', '((?:[^']|'')*)'\)/gm;
let m; while ((m = re.exec(sql))) rows.push(m.slice(1).map((v, i) => (i ? v.replace(/''/g, "'") : +v)));
rows.sort((a, b) => a[0] - b[0]);
const EPOCH = Date.UTC(2026, 10, 1); // puzzle №1 = 2026-11-01
const [y, mo, d] = day.split('-').map(Number);
const no = Math.round((Date.UTC(y, mo - 1, d) - EPOCH) / 864e5) + 1;
const [, word, cat, info, era] = rows[(no - 1) % rows.length];
const title = word[0] + word.slice(1).toLowerCase();
const cfg = { no, date: day.replace(/-/g, '.'), label, word, cat, era, title, info, cta: 'Маргаашийн үгээ таахад бэлэн үү?', logo: process.env.LOGO };
const cfgPath = path.join(__dirname, `story-${no}.json`);
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
execFileSync('node', [path.join(__dirname, 'buildstory.js'), cfgPath], { stdio: 'inherit' });
console.log(`№${no} ${word} → story-${no}.html (open it and screenshot at 1080×1920, or run render-story.js)`);

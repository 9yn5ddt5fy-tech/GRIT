// Make the "word of the day" story for a date, using the game's word from Supabase.
// The design matches the game's own share card (black, cross-stitch corners, cream tiles).
// Usage: node make-story.js 2026-11-17 [label]
//   label defaults to "Өнөөдрийн үг"; use "Өчигдрийн үг" when posting the next morning.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const day = process.argv[2] || new Date().toISOString().slice(0, 10);
const label = process.argv[3] || 'Өнөөдрийн үг';
const EPOCH = Date.UTC(2026, 10, 1); // puzzle №1 = 2026-11-01
const [y, mo, d] = day.split('-').map(Number);
const no = Math.round((Date.UTC(y, mo - 1, d) - EPOCH) / 864e5) + 1;
// The word list is no longer in the repository (it gave away future answers).
// The day's word is read from Supabase through the management API; the token is
// injected by the session's network proxy, or set SUPABASE_TOKEN when running locally.
const q = `select row_to_json(w) from grit.word_of(${no}) w`;
const args = ['-sS', '--max-time', '30', '-X', 'POST', 'https://api.supabase.com/v1/projects/wrjgihdvjwriurdiotih/database/query', '-H', 'Content-Type: application/json', '-d', JSON.stringify({ query: q })];
if (process.env.SUPABASE_TOKEN) args.push('-H', 'Authorization: Bearer ' + process.env.SUPABASE_TOKEN);
const res = JSON.parse(execFileSync('curl', args, { encoding: 'utf8' }));
if (!Array.isArray(res) || !res[0]) throw new Error('Could not read the word: ' + JSON.stringify(res));
const q2 = (t) => (t || '').replace(/«/g, '“').replace(/»/g, '”'); // no «» quotes in our designs
const { word, cat, era } = res[0].row_to_json, info = q2(res[0].row_to_json.info);
const title = word[0] + word.slice(1).toLowerCase();
const cfg = { no, date: day.replace(/-/g, '.'), label, word, cat, era, title, info, cta: /Өчигдр/.test(label) ? 'Өнөөдрийн үгээ таахад бэлэн үү?' : 'Маргаашийн үгээ таахад бэлэн үү?', logo: process.env.LOGO };
const cfgPath = path.join(__dirname, `story-${no}.json`);
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
execFileSync('node', [path.join(__dirname, 'buildpost.js'), cfgPath], { stdio: 'inherit' });
execFileSync('node', [path.join(__dirname, 'render-story.js'), String(no)], { stdio: 'inherit' });
console.log(`№${no} → story-${no}.jpg`);

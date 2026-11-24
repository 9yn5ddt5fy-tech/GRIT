// Make the Хэн бэ? story for a date, using that day's person from Supabase.
// Usage: node make-hb-story.js 2026-11-24 [label]
//   label defaults to "Өнөөдрийн хүн"; use "Өчигдрийн хүн" when posting the next morning.
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const day = process.argv[2] || new Date().toISOString().slice(0, 10);
const label = process.argv[3] || 'Өнөөдрийн хүн';
const EPOCH = Date.UTC(2026, 10, 1); // grit day №1 = 2026-11-01
const [y, mo, d] = day.split('-').map(Number);
const n = Math.round((Date.UTC(y, mo - 1, d) - EPOCH) / 864e5) + 1;
// The people and the schedule live only in Supabase (read through the management API; the token
// is injected by the session's network proxy, or set SUPABASE_TOKEN when running locally).
const q = `select row_to_json(f) p, ${n} - (select value::int from grit.settings where key = 'hb_start') + 1 no from grit.hb_of(${n}) f`;
const args = ['-sS', '--max-time', '30', '-X', 'POST', 'https://api.supabase.com/v1/projects/wrjgihdvjwriurdiotih/database/query', '-H', 'Content-Type: application/json', '-d', JSON.stringify({ query: q })];
if (process.env.SUPABASE_TOKEN) args.push('-H', 'Authorization: Bearer ' + process.env.SUPABASE_TOKEN);
const res = JSON.parse(execFileSync('curl', args, { encoding: 'utf8' }));
if (!Array.isArray(res) || !res[0] || !res[0].p) throw new Error('No Хэн бэ? person for ' + day + ' (the game started on 2026-11-25): ' + JSON.stringify(res));
const q2 = (t) => (t || '').replace(/«/g, '“').replace(/»/g, '”'); // no «» quotes in our designs
const p = res[0].p;
const cfg = { day: n, no: res[0].no, date: day.replace(/-/g, '.'), label, name: p.name_mn, era: p.era_mn, info: q2(p.info_mn), cta: 'Маргаашийн хүнийг таахад бэлэн үү?' };
const cfgPath = path.join(__dirname, `story-hb-${n}.json`);
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
execFileSync('node', [path.join(__dirname, 'buildpost-hb.js'), cfgPath], { stdio: 'inherit' });
execFileSync('node', [path.join(__dirname, 'render-story.js'), `hb-${n}`], { stdio: 'inherit' });
console.log(`Хэн бэ? №${cfg.no} → story-hb-${n}.jpg`);

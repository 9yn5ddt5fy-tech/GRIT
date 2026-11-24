// Winter hero: node build.js <desktop|mobile> -> hero-<mode>.html (hhead.js + tailhero.js)
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'hhead.js'), 'utf8') + '\n' + fs.readFileSync(path.join(__dirname, 'tailhero.js'), 'utf8');
const m = new module.constructor(); m.paths = module.paths; m.filename = path.join(__dirname, 'combined.js');
m._compile(src, m.filename);

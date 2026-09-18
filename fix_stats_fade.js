const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(/<div class="psb-col">/g, '<div class="psb-col skeleton-fade-in">');

fs.writeFileSync('app.js', code);

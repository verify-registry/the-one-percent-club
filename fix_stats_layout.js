const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(/container\.innerHTML \= \`<div class="skeleton-fade-in" style="display:flex; width:100%; justify-content:space-evenly; align-items:center;">([\s\S]*?)<\/div>\`;/g, 'container.innerHTML = `$1`;');

fs.writeFileSync('app.js', code);

const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css += `\nbody.light-mode .medallion-symbol {\n  filter: drop-shadow(0 1.5px 1.5px rgba(156, 109, 35, 0.5));\n}\n`;

fs.writeFileSync('style.css', css);

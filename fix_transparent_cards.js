const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

code = code.replace(/\/\* Wrapper containers that hide borders\/shadows for skeletons but keep dimensions \*\/[\s\S]*?\/\* Fade In transition for real content \*\//g, '/* Fade In transition for real content */');

fs.writeFileSync('style.css', code);

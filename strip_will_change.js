const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// 1. Strip all `will-change` declarations to clean the slate of over-allocations.
code = code.replace(/^\s*will-change:[^;]+;\n/gm, '');

fs.writeFileSync('style.css', code);

const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// I will globally search for all "transition:" statements and ensure they have hardware acceleration.

code = code.replace(/will-change: transform, opacity, filter;\n  will-change: opacity;/g, 'will-change: transform, opacity, filter;');

fs.writeFileSync('style.css', code);
console.log("Patched specific transitions");

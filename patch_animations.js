const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// I will globally search for elements lacking will-change or hardware acceleration where animations/transitions happen

// We will add `transform: translateZ(0);` and `will-change` generically where transitions are present and performance critical.
code = code.replace(/transition: all (.*?);/g, 'transition: all $1;\n  transform: translateZ(0);\n  will-change: transform, opacity, filter;');

fs.writeFileSync('style.css', code);
console.log("Patched all transitions with transform: translateZ(0) and will-change");

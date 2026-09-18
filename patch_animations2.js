const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// I will globally search for all "transition:" statements and ensure they have hardware acceleration.

code = code.replace(/transition: (transform|opacity|color|background|width|height) (.*?);(?!\s*transform:\s*translateZ\(0\);)/g, 'transition: $1 $2;\n  transform: translateZ(0);\n  will-change: transform, opacity, filter;');

// Fix multiple declarations
code = code.replace(/(transform: translateZ\(0\);\n  will-change: transform, opacity, filter;\n  ){2,}/g, 'transform: translateZ(0);\n  will-change: transform, opacity, filter;\n  ');

fs.writeFileSync('style.css', code);
console.log("Patched specific transitions");

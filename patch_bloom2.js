const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const regex = /\.luxury-modal-overlay \{\n\s*transition: opacity 0\.4s cubic-bezier\(0\.16, 1, 0\.3, 1\) !important;\n\s*transform: translateZ\(0\);\n\s*will-change: transform, opacity, filter;\n\}\n\n\.luxury-modal-box \{\n\s*transition:\n\s*opacity 0\.4s cubic-bezier\(0\.16, 1, 0\.3, 1\),\n\s*transform 0\.4s cubic-bezier\(0\.16, 1, 0\.3, 1\) !important;\n\s*will-change: transform, opacity;\n\}/;

code = code.replace(regex, "");

fs.writeFileSync('style.css', code);
console.log("Removed duplicate overrides");

const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// We will remove the '.corner { transform: translateZ(10px); }' block
code = code.replace('.corner {\n  transform: translateZ(10px);\n}', '');
// Or whatever spacing it was
code = code.replace(/\.corner\s*\{\s*transform:\s*translateZ\(10px\);\s*\}/g, '');

const fixCss = `
.membership-card .corner-tl { transform: rotate(0deg) translateZ(10px) !important; }
.membership-card .corner-tr { transform: rotate(90deg) translateZ(10px) !important; }
.membership-card .corner-bl { transform: rotate(-90deg) translateZ(10px) !important; }
.membership-card .corner-br { transform: rotate(180deg) translateZ(10px) !important; }
`;

code += '\n' + fixCss;
fs.writeFileSync('style.css', code);
console.log("Parallax corners fixed.");

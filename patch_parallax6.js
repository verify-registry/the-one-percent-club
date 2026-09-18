const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /const icon = card\.querySelector\('\.boutique-card-icon'\);\n\s+\/\/ Layer 2: Text \(moves slower\)/;
code = code.replace(regex, "// Layer 2: Text (moves slower)");

fs.writeFileSync('app.js', code);
console.log("Fixed duplicate declaration");

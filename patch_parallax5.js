const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /\/\/ Layer 1: Icon \(moves faster\)\n        const icon = card\.querySelector\('\.boutique-card-icon'\);\n        \/\/ Layer 2: Text \(moves slower\)\n\n        const icon = /;
const replacement = `        // Layer 2: Text (moves slower)
        const icon = `;

code = code.replace(regex, replacement);
fs.writeFileSync('app.js', code);
console.log("Fixed duplicate declaration");

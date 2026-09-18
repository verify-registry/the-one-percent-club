const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const oldCode2 = `    const isOnline = idx < 2 ? "is-online" : "";`;
const newCode2 = `    const isOnline = index < 2 ? "is-online" : "";`;

code = code.replace(oldCode2, newCode2);
fs.writeFileSync('app.js', code);

const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const oldCode = `    const isOnline = i < 2 ? "is-online" : "";
    html += \`
    <div class="leader-item">`;

const newCode = `    const isOnline = idx < 2 ? "is-online" : "";
    html += \`
    <div class="leader-item">`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('app.js', code);

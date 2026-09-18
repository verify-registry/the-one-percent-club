const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const regex = /\.gold-confetti-particle\s*\{[\s\S]*?\}\s*@keyframes confettiFall\s*\{[\s\S]*?\}/m;

code = code.replace(regex, '');
fs.writeFileSync('style.css', code);

const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules2 = `
body.light-mode .boutique-card-icon::after {
  background: radial-gradient(ellipse at center, rgba(143, 104, 32, 0.4) 0%, transparent 70%) !important;
}
body.light-mode .member-number {
  color: #8f6820 !important;
  background: none !important;
  -webkit-text-fill-color: #8f6820 !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules2 + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success2");

const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .luxury-empty-state p {
  color: #1a1a1a !important;
}

body.light-mode .luxury-empty-state span {
  color: #4a4a4a !important;
}

body.light-mode .vault-empty-text {
  color: #1a1a1a !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success empty");

const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .nav-item {
  color: rgba(0, 0, 0, 0.4);
}
body.light-mode .nav-item.is-active {
  color: #8f6820;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success nav");

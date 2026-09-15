const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .menu-title,
body.light-mode .pnm-title span {
  color: #1a1a1a !important;
}
body.light-mode .menu-subtitle,
body.light-mode .pnm-sub span {
  color: #666 !important;
}
body.light-mode .empty-vault-card {
  background: #ffffff !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success fix title 2");

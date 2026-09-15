const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .club-room-btn.is-active {
  background: #fdfbf7 !important;
  border-color: rgba(197, 160, 89, 0.5) !important;
  color: #8f6820 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
}

body.light-mode .club-room-btn {
  background: #f4f0e6 !important;
  border-color: rgba(0,0,0,0.05) !important;
  color: #4a4a4a !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success club");

const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .club-composer {
  background: #ffffff !important;
  border: 1px solid rgba(197, 160, 89, 0.3) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
}

body.light-mode .club-composer input {
  color: #1a1a1a !important;
}
body.light-mode .club-composer input::placeholder {
  color: #888 !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success composer");

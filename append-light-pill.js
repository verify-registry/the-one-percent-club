const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .tier-pill {
  background: rgba(143, 104, 32, 0.1) !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
  color: #8f6820 !important;
  box-shadow: inset 0 0 10px rgba(197, 160, 89, 0.1) !important;
}

body.light-mode .metric-label {
  color: #888 !important;
}

body.light-mode .metric-val {
  color: #1a1a1a !important;
}

body.light-mode .card-club-name {
  color: rgba(26, 26, 26, 0.7) !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success pill");

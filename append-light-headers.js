const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .boutique-section-head h3 {
  color: #1a1a1a !important;
  text-shadow: none !important;
}

body.light-mode .boutique-section-sub {
  color: #8f6820 !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success headers");

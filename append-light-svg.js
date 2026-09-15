const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .pcs-item-image svg path,
body.light-mode .pcs-item-image svg circle,
body.light-mode .boutique-card-fallback svg path,
body.light-mode .boutique-card-fallback svg circle {
  fill: #8f6820 !important;
  stroke: #8f6820 !important;
}
body.light-mode .pcs-item-image svg [fill="url(#ringGoldGrad)"],
body.light-mode .boutique-card-fallback svg [fill="url(#ringGoldGrad)"] {
  fill: #8f6820 !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success svg");

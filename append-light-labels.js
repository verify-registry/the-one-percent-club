const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .luxury-modal-header h2,
body.light-mode .luxury-modal-header h3 {
  color: #8f6820 !important;
  text-shadow: none !important;
}
body.light-mode .edit-profile-label {
  color: #666 !important;
}
body.light-mode .pcs-item-image {
  background: transparent !important;
  border-color: rgba(197, 160, 89, 0.2) !important;
}
body.light-mode .club-pinned-title {
  color: #8f6820 !important;
}
body.light-mode .club-pinned-sub span {
  color: #666 !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success labels");

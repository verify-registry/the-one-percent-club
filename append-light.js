const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
body.light-mode .vault-card,
body.light-mode .honor-card,
body.light-mode .menu-card,
body.light-mode .stats-bar,
body.light-mode .lounge-banner,
body.light-mode .pcs-item-card,
body.light-mode .chat-input-wrapper {
  background: #ffffff !important;
  border: 1px solid rgba(197, 160, 89, 0.3) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
}

body.light-mode .chat-input-wrapper input {
  color: #1a1a1a !important;
}
body.light-mode .chat-input-wrapper input::placeholder {
  color: #888 !important;
}

body.light-mode .boutique-filter.is-active,
body.light-mode .pill-btn.is-active {
  background: #fdfbf7 !important;
  border-color: rgba(197, 160, 89, 0.5) !important;
  color: #8f6820 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
}

body.light-mode .boutique-filter,
body.light-mode .pill-btn {
  background: #f4f0e6 !important;
  border-color: rgba(0,0,0,0.05) !important;
  color: #4a4a4a !important;
}

body.light-mode .section-subtitle,
body.light-mode .category-title,
body.light-mode .club-name,
body.light-mode .boutique-card-name,
body.light-mode .honor-name {
  color: #1a1a1a !important;
}

body.light-mode .boutique-card-price,
body.light-mode .honor-desc,
body.light-mode .room-desc {
  color: #8f6820 !important;
}

body.light-mode .boutique-card-fallback,
body.light-mode .pcs-icon {
  background: radial-gradient(circle at 30% 30%, rgba(212, 175, 106, 0.1), transparent 60%) !important;
  border: 1px solid rgba(197, 160, 89, 0.3) !important;
  box-shadow: inset 0 1px 3px rgba(212, 175, 106, 0.2), 0 2px 5px rgba(0,0,0,0.05) !important;
}

body.light-mode .honor-card.is-locked {
  background: #f8f7f4 !important;
  border: 1px dashed rgba(197, 160, 89, 0.3) !important;
  opacity: 0.8;
}

body.light-mode .club-room:hover,
body.light-mode .menu-card:hover {
  background: #fdfbf7 !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
}

body.light-mode .app-main {
  color: #2c2c2c;
}
`;

// we will just append these to the end of the file or after the existing light-mode rules.
code = code.replace('body.light-mode .club-room {', additionalRules + '\nbody.light-mode .club-room {');
fs.writeFileSync('style.css', code);
console.log("Success");

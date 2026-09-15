const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const additionalRules = `
/* Light Mode Comprehensive Overrides */

/* Master Card Internal Metrics */
body.light-mode .membership-card .metric-ring {
  background: radial-gradient(ellipse at top left, #ffffff, #fdfbf7) !important;
  border: 1px solid rgba(197, 160, 89, 0.4) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode .membership-card .ring-value {
  color: #1a1a1a !important;
  text-shadow: none !important;
}
body.light-mode .membership-card .ring-label {
  color: #666 !important;
}

/* Honors Summary Header */
body.light-mode #profile-tab .prestige-honors .achievements-summary {
  background: #ffffff !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode .achievements-summary-value {
  color: #8f6820 !important;
  text-shadow: none !important;
}
body.light-mode .achievements-summary-label,
body.light-mode .pcs-view-all {
  color: #666 !important;
}
body.light-mode .achievements-summary-divider {
  background: rgba(197, 160, 89, 0.2) !important;
}

/* Honor Cards */
body.light-mode #profile-tab .prestige-honors .honor-card.is-unlocked {
  background: #ffffff !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
  box-shadow: 0 4px 15px rgba(197, 160, 89, 0.1) !important;
}
body.light-mode #profile-tab .prestige-honors .honor-card.is-unlocked .honor-icon {
  color: #8f6820 !important;
  filter: none !important;
}
body.light-mode #profile-tab .prestige-honors .honor-card.is-locked {
  background: #f8f7f4 !important;
  border-style: dashed !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
  box-shadow: none !important;
}
body.light-mode #profile-tab .prestige-honors .honor-card.is-locked .honor-icon {
  color: #a0a0a0 !important;
}

/* Profile Navigation Menu */
body.light-mode .profile-nav-menu {
  background: #ffffff !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode .pnm-item {
  border-bottom-color: rgba(0, 0, 0, 0.05) !important;
}
body.light-mode .pnm-item:hover {
  background: rgba(197, 160, 89, 0.05) !important;
}
body.light-mode .pnm-icon {
  background: rgba(197, 160, 89, 0.1) !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
  color: #8f6820 !important;
}
body.light-mode .menu-title {
  color: #1a1a1a !important;
}
body.light-mode .pnm-arrow {
  color: #aaa !important;
}

/* Profile Hero Card */
body.light-mode #profile-tab .profile-hero-card {
  background: #ffffff !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode .phc-name {
  color: #1a1a1a !important;
  text-shadow: none !important;
}
body.light-mode .phc-tier {
  color: #8f6820 !important;
  background: rgba(143, 104, 32, 0.1) !important;
  border: 1px solid rgba(197, 160, 89, 0.2) !important;
}
body.light-mode .phc-quote, 
body.light-mode .phc-meta {
  color: #666 !important;
}
body.light-mode .phc-meta-icon {
  color: #8f6820 !important;
}
body.light-mode .phc-crown-badge {
  background: #ffffff !important;
  border-color: rgba(197, 160, 89, 0.5) !important;
}
body.light-mode .phc-crown-badge svg path {
  fill: #8f6820 !important;
}

/* Profile Stats inside Hero */
body.light-mode .phc-stats {
  background: #f8f7f4 !important;
  border-color: rgba(197, 160, 89, 0.2) !important;
}
body.light-mode .phc-stat-val {
  color: #1a1a1a !important;
}
body.light-mode .phc-stat-label {
  color: #888 !important;
}
body.light-mode .phc-stat-icon {
  color: #8f6820 !important;
}
body.light-mode .phc-stat-divider {
  background: rgba(0, 0, 0, 0.05) !important;
}

/* Boutique specific overrides */
body.light-mode #boutique-tab .boutique-tabs {
  background: #f4f0e6 !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
}
body.light-mode #boutique-tab .boutique-tab {
  color: #666 !important;
}
body.light-mode #boutique-tab .boutique-tab.is-active {
  background: #ffffff !important;
  color: #8f6820 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode #boutique-tab .boutique-ownership-toggle {
  background: #f4f0e6 !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
}
body.light-mode #boutique-tab .boutique-card {
  background: #ffffff !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}

/* Modal Inputs */
body.light-mode .edit-profile-input,
body.light-mode .luxury-input {
  background: #fdfbf7 !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
  color: #1a1a1a !important;
}
body.light-mode .edit-profile-input::placeholder,
body.light-mode .luxury-input::placeholder {
  color: #aaa !important;
}
body.light-mode .modal-label,
body.light-mode .input-label,
body.light-mode .pnm-content span {
  color: #666 !important;
}
body.light-mode .modal-close {
  color: #1a1a1a !important;
}
body.light-mode .edit-profile-row span {
  color: #666 !important;
}

/* Club Pinned Banner */
body.light-mode #club-tab .club-pinned {
  background: #ffffff !important;
  border-color: rgba(197, 160, 89, 0.4) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode #club-tab .club-pinned-title {
  color: #8f6820 !important;
}
body.light-mode #club-tab .club-pinned-sub {
  color: #666 !important;
}
body.light-mode #club-tab .club-pinned-icon {
  background: rgba(197, 160, 89, 0.1) !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
}
body.light-mode #club-tab .club-pinned-icon svg path {
  fill: #8f6820 !important;
}
`;

code = code.replace('body.light-mode .app-main {', additionalRules + '\nbody.light-mode .app-main {');
fs.writeFileSync('style.css', code);
console.log("Success final overrides");

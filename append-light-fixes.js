const fs = require('fs');

const cssToAppend = `
/* ADDITIONAL LIGHT MODE CONTRAST FIXES - APPENDED LAST FOR GUARANTEED PRECEDENCE */

/* Master Card Labels */
body.light-mode .membership-card p.ring-label,
body.light-mode .membership-card .ring-label {
  color: #1a1a1a !important;
  font-weight: 600 !important;
}
body.light-mode .membership-card .equipped-ring-label {
  color: #8f6820 !important;
  font-weight: 600 !important;
}
body.light-mode .membership-card .living-core {
  color: #8f6820 !important;
}

/* Honors Summary Header */
body.light-mode #profile-tab .prestige-honors .achievements-summary {
  background: #ffffff !important;
  border: 1px solid rgba(197, 160, 89, 0.4) !important;
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

/* Leaderboard */
body.light-mode .leaderboard-list {
  background: #ffffff !important;
}
body.light-mode .leader-item {
  background: #fdfbf7 !important;
  border: 1px solid rgba(197, 160, 89, 0.3) !important;
}
body.light-mode .leader-rank {
  color: #8f6820 !important;
}
body.light-mode .leader-name {
  color: #1a1a1a !important;
}
body.light-mode .leader-tag {
  background: rgba(197, 160, 89, 0.1) !important;
  color: #8f6820 !important;
  border: 1px solid rgba(197, 160, 89, 0.3) !important;
}
body.light-mode .leader-score {
  color: #1a1a1a !important;
}

/* Club Message Credits Bar */
body.light-mode #club-tab .club-credits-display {
  background: #ffffff !important;
  border: 1px solid rgba(197, 160, 89, 0.4) !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode #club-tab #clubCreditsText {
  color: #1a1a1a !important;
}
body.light-mode #club-tab .club-credits-buy {
  background: #8f6820 !important;
  color: #ffffff !important;
  border: none !important;
}

/* Pinned Banner */
body.light-mode #club-tab .club-pinned {
  background: #ffffff !important;
  border: 1px solid rgba(197, 160, 89, 0.4) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode #club-tab .club-pinned-title {
  color: #8f6820 !important;
  text-shadow: none !important;
}
body.light-mode #club-tab .club-pinned-sub,
body.light-mode #club-tab .club-pinned-sub span {
  color: #666 !important;
}
body.light-mode #club-tab .club-pinned-icon {
  background: rgba(197, 160, 89, 0.1) !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
}
body.light-mode #club-tab .club-pinned-icon svg path {
  fill: #8f6820 !important;
}

/* Chat Bubbles */
body.light-mode .chat-bubble.is-incoming {
  background: #ffffff !important;
  border: 1px solid rgba(197, 160, 89, 0.3) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode .chat-bubble.is-outgoing {
  background: #fdfbf7 !important;
  border: 1px solid rgba(197, 160, 89, 0.5) !important;
  box-shadow: 0 4px 15px rgba(197, 160, 89, 0.1) !important;
}
body.light-mode .chat-bubble.is-incoming .chat-text,
body.light-mode .chat-bubble.is-outgoing .chat-text {
  color: #1a1a1a !important;
}
body.light-mode .chat-bubble.is-incoming .chat-time,
body.light-mode .chat-bubble.is-outgoing .chat-time {
  color: #8f6820 !important;
}
body.light-mode .chat-ticks {
  color: #8f6820 !important;
}
body.light-mode .chat-sender-header span {
  color: #8f6820 !important;
}
body.light-mode .typing-bubble {
  color: #666 !important;
}
body.light-mode #typingName {
  color: #1a1a1a !important;
}

/* Modals */
body.light-mode .luxury-modal-box {
  background: #ffffff !important;
}
body.light-mode .modal-header h3 {
  color: #1a1a1a !important;
}
body.light-mode .modal-close {
  color: #1a1a1a !important;
}
body.light-mode .info-row .info-label,
body.light-mode .modal-label,
body.light-mode .input-label {
  color: #666 !important;
}
body.light-mode .info-row .info-value,
body.light-mode .setting-desc {
  color: #1a1a1a !important;
}
body.light-mode .luxury-input,
body.light-mode .edit-profile-input {
  background: #fdfbf7 !important;
  color: #1a1a1a !important;
  border-color: rgba(197, 160, 89, 0.3) !important;
}
body.light-mode .luxury-input::placeholder,
body.light-mode .edit-profile-input::placeholder {
  color: #888 !important;
}

/* Profile Hero Card */
body.light-mode #profile-tab .profile-hero-card {
  background: #ffffff !important;
  border: 1px solid rgba(197, 160, 89, 0.4) !important;
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

/* Profile Navigation Menu */
body.light-mode .profile-nav-menu {
  background: #ffffff !important;
  border: 1px solid rgba(197, 160, 89, 0.3) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
}
body.light-mode .pnm-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}
body.light-mode .pnm-item:hover {
  background: rgba(197, 160, 89, 0.05) !important;
}
body.light-mode .pnm-icon {
  background: rgba(197, 160, 89, 0.1) !important;
  border: 1px solid rgba(197, 160, 89, 0.3) !important;
  color: #8f6820 !important;
}
body.light-mode .pnm-title span,
body.light-mode .menu-title {
  color: #1a1a1a !important;
}

/* Boutique Cards Fixes */
body.light-mode .boutique-card {
  background: #ffffff !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid rgba(197, 160, 89, 0.4) !important;
}
body.light-mode .boutique-card-name {
  color: #1a1a1a !important;
}
body.light-mode .boutique-card-desc {
  color: #666 !important;
}
body.light-mode .boutique-card-price {
  color: #8f6820 !important;
}

`;

fs.appendFileSync('style.css', '\n' + cssToAppend + '\n');
console.log('Successfully appended additional light mode fixes to the very end of style.css!');

const fs = require('fs');
let css = fs.readFileSync('/app/applet/style.css', 'utf8');

const emblemFix = `
/* ==========================================================================
   SOVEREIGN EMBLEM REFINEMENT (Polished Heraldic Treatment)
   ========================================================================== */
#membership-tab .living-core svg path {
  fill: var(--gold-primary) !important;
  stroke: var(--gold-highlight) !important;
  stroke-width: 0.5px !important;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.9)) drop-shadow(0 0 1px rgba(255,255,255,0.2)) !important;
}

body.light-mode #membership-tab .living-core svg path {
  fill: var(--gold-primary) !important;
  stroke: var(--gold-highlight) !important;
  stroke-width: 0.5px !important;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2)) drop-shadow(0 1px 0 rgba(255,255,255,0.8)) !important;
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + emblemFix + '\n');
console.log("Applied polished heraldic treatment to the sovereign emblem.");

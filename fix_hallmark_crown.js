const fs = require('fs');
let css = fs.readFileSync('/app/applet/style.css', 'utf8');

const additionalGoldVars = `
:root {
  --gold-shadow: var(--gold-antique, #5A4622);
}
body.light-mode {
  --gold-shadow: var(--gold-antique, #4A3311);
}
`;

const hallmarkCrownFix = `
/* ==========================================================================
   HALLMARK & CROWN REFINEMENT (High-Contrast Metallic Seal)
   ========================================================================== */

/* Crown Emblem Texture */
#membership-tab #equippedCrownSlot svg path {
  fill: var(--gold-primary) !important;
  stroke: var(--gold-highlight) !important;
  stroke-width: 0.5px !important;
  filter: 
    drop-shadow(0 2px 3px var(--gold-shadow)) 
    drop-shadow(0 -1px 1px rgba(255, 255, 255, 0.15)) !important;
}

body.light-mode #membership-tab #equippedCrownSlot svg path {
  filter: 
    drop-shadow(0 1px 2px var(--gold-shadow)) 
    drop-shadow(0 1px 0 rgba(255, 255, 255, 0.8)) !important;
}

/* Hallmark Line (Micro-engraved aesthetics) */
#membership-tab #cardHallmarkLine {
  opacity: 0.85 !important;
}

#membership-tab #cardHallmarkLine span {
  background: linear-gradient(90deg, transparent, var(--gold-primary), transparent) !important;
  height: 1px !important;
  opacity: 0.6 !important;
}

#membership-tab #cardHallmarkLine svg path {
  stroke: var(--gold-primary) !important;
  fill: rgba(12, 10, 8, 0.95) !important; /* Deep obsidian fill inside the shield */
  filter: drop-shadow(0 1px 2px var(--gold-shadow)) !important;
}
body.light-mode #membership-tab #cardHallmarkLine svg path {
  fill: rgba(255, 255, 255, 0.95) !important;
}

#membership-tab #cardHallmarkLine svg text {
  fill: var(--gold-highlight) !important;
  text-shadow: 0 1px 1px var(--gold-shadow) !important; /* Authentic stamped look */
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + additionalGoldVars + '\n' + hallmarkCrownFix + '\n');
console.log("Applied high-contrast metallic textures to hallmark and crown.");

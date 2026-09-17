const fs = require('fs');

const css = `
/* ==========================================================================
   PHASE — IMPERIAL IVORY LIGHT MODE (STRICT MEMBERSHIP MICRO-PASS)
   ========================================================================== */

/* 1. Page Background: Subtle warm ivory instead of clinical white */
body.light-mode {
  --oled-black: #EBE5D9; /* Warm ivory/champagne page background */
  --obsidian: #E3DCCF; 
  --obsidian-2: #DBD4C5;
  
  /* Imperial Ivory Gold System (ensuring contrast against ivory) */
  --gold-primary: #9C7225;
  --gold-highlight: #F5DEB3; 
  --gold-champagne: #C29642;
  --gold-midtone: #704F12;
  --gold-shadow: #302008;
  --gold-deep: #1A1000;
  --gold-antique: #5C3F0A;
  --gold-satin: #855C1A;
}

/* 2. Membership Card Surface (Porcelain / Ivory artifact) */
body.light-mode #membership-tab .membership-card {
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 40%) padding-box,
    radial-gradient(ellipse at 50% 30%, #F4F0E6 0%, #E8E2D5 60%, #D8D0BE 100%) padding-box,
    var(--gold-metal-polished) border-box !important;
    
  box-shadow: 
    inset 1px 1px 2px rgba(255,255,255,0.7), 
    inset -1px -1px 2px rgba(120,100,70,0.15),
    0 15px 35px -10px rgba(50, 40, 20, 0.15) !important;
}

/* 3. Wealth Index & Privileges Rectangles (Neutralizing the white cards) */
body.light-mode #membership-tab .metric-ring {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

/* 4. Metric Instrument Material (Watch dial instruments) */
body.light-mode #membership-tab .ring-track {
  stroke: rgba(0, 0, 0, 0.05) !important;
  filter: drop-shadow(0 1px 1px rgba(255,255,255,0.6)) !important;
}

body.light-mode #membership-tab .ring-progress {
  filter: 
    drop-shadow(1px 1px 0px rgba(255,255,255,0.8)) 
    drop-shadow(-1px -1px 0px rgba(0,0,0,0.15))
    drop-shadow(0 2px 3px rgba(0,0,0,0.1)) !important;
}

body.light-mode #membership-tab .ring-value {
  color: #1a1a1a !important; /* Deep obsidian text */
  text-shadow: 0 1px 0px rgba(255,255,255,0.5) !important;
}

body.light-mode #membership-tab .ring-label {
  color: #4A3A20 !important; /* Dark antique gold / charcoal */
  text-shadow: 0 1px 0px rgba(255,255,255,0.4) !important;
}

/* 5. Portrait Ring / Crown / Central Seal (Integration) */
body.light-mode #membership-tab .portrait-ring {
  box-shadow: 
    0 10px 20px -5px rgba(0, 0, 0, 0.15),
    inset 1px 1px 1px rgba(255, 255, 255, 0.6), 
    inset -1px -1px 2px rgba(50, 40, 20, 0.3) !important;
}

body.light-mode #membership-tab .living-core svg path,
body.light-mode #membership-tab #equippedCrownSlot svg path {
  filter: 
    drop-shadow(1px 1px 0px rgba(255,255,255,0.8)) 
    drop-shadow(-1px -1px 0px rgba(0,0,0,0.15))
    drop-shadow(0 2px 3px rgba(0,0,0,0.1)) !important;
}

/* 6. Buttons & Tier Pill */
body.light-mode #membership-tab .card-actions .btn,
body.light-mode #membership-tab .tier-pill {
  background: 
    linear-gradient(#F0EADF, #E6DEC9) padding-box,
    var(--gold-metal-brushed) border-box !important;
  box-shadow: 
    inset 0 1px 0px rgba(255,255,255,0.7),
    0 2px 4px rgba(0,0,0,0.08) !important;
  color: #2C200C !important; /* Dark antique text */
}

body.light-mode #membership-tab .card-actions .btn:hover {
  background: 
    linear-gradient(#E8E2D5, #E8E2D5) padding-box,
    var(--gold-metal-polished) border-box !important;
}

/* 7. Typography (Darker contrast for labels/numbers) */
body.light-mode #membership-tab .member-name {
  color: #1A1A1A !important;
  text-shadow: 0 1px 0px rgba(255,255,255,0.6) !important;
}

body.light-mode #membership-tab .member-label,
body.light-mode #membership-tab .card-tagline,
body.light-mode #membership-tab .card-tagline span {
  color: #4A3A20 !important;
}

body.light-mode #membership-tab .member-number {
  color: #5C4A2E !important;
}

body.light-mode #membership-tab .card-club-name {
  filter: drop-shadow(0 1px 0px rgba(255,255,255,0.6)) !important; 
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + css + '\n');
console.log("V4 Imperial Ivory Light Mode appended.");

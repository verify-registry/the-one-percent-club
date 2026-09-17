const fs = require('fs');
let css = fs.readFileSync('/app/applet/style.css', 'utf8');

const rootVarsMatch = css.match(/:root\s*{[^}]*}/);
let rootVars = rootVarsMatch ? rootVarsMatch[0] : ':root {}';

const goldVars = `
  /* THE 1% CLUB — GLOBAL GOLD MATERIAL SYSTEM */
  /* Centralized luxury metal language (Dark Mode Default) */
  --gold-primary: #C9A86A;       /* Authentic Champagne Gold */
  --gold-highlight: #EAE0C4;     /* Polished highlight */
  --gold-deep: #8A6D3B;          /* Rich gold body */
  --gold-antique: #5A4622;       /* Dark gold shadow / Engraving */
  --gold-micro: #A68B52;         /* Satin / Micro details */

  /* Metallic Gradients (Abstracted for reuse) */
  --gold-grad-polished: linear-gradient(135deg, var(--gold-highlight) 0%, var(--gold-primary) 40%, var(--gold-deep) 100%);
  --gold-grad-brushed: linear-gradient(180deg, var(--gold-primary) 0%, var(--gold-micro) 100%);
  --gold-grad-antique: linear-gradient(135deg, var(--gold-deep) 0%, var(--gold-antique) 100%);
`;

if (!rootVars.includes('--gold-primary')) {
  css = css.replace(':root {', ':root {\n' + goldVars);
}

const lightModeVars = `
body.light-mode {
  /* Imperial Ivory / Light Mode Gold Adjustments */
  --gold-primary: #A47A3B;       /* Deeper antique gold for contrast against ivory */
  --gold-highlight: #C29B57;     /* Subdued highlight */
  --gold-deep: #7D5A24;          /* Darker body */
  --gold-antique: #4A3311;       /* Deepest engraving */
  --gold-micro: #8C662D;         /* Satin details */
}
`;

if (!css.includes('/* Imperial Ivory / Light Mode Gold Adjustments */')) {
   css += '\n' + lightModeVars + '\n';
}

const membershipGoldRules = `
/* ==========================================================================
   PHASE MEMBERSHIP — GOLD MATERIAL SYSTEM
   Application of Global Gold Language to Membership Tab
   ========================================================================== */

/* 1. PRIMARY GOLD (Polished & Identity) */
#membership-tab .card-club-name {
  color: var(--gold-primary) !important;
  background: var(--gold-grad-polished) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  text-shadow: none !important; /* No glow, purely metallic reflection */
}

#membership-tab .tier-pill {
  color: var(--gold-primary) !important;
  border-color: rgba(201, 168, 106, 0.4) !important; /* Uses raw hex for opacity of --gold-primary */
  box-shadow: 
    inset 0 1px 0 rgba(234, 224, 196, 0.1), /* Highlight */
    0 2px 4px rgba(0,0,0,0.5) !important;
  background: linear-gradient(180deg, rgba(30,25,20,0.4) 0%, rgba(10,8,6,0.6) 100%) !important;
}
body.light-mode #membership-tab .tier-pill {
  border-color: rgba(164, 122, 59, 0.4) !important; /* Light mode opacity */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 2px 4px rgba(40,30,10,0.1) !important;
  background: linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(240,235,225,0.6) 100%) !important;
}

/* 2. SECONDARY GOLD (Brushed & Structural) */
/* Member Number (Engraved metal) */
#membership-tab .member-number {
  color: var(--gold-micro) !important;
  text-shadow: 0 1px 1px rgba(0,0,0,0.8) !important; /* Engraved depth, no glow */
}
body.light-mode #membership-tab .member-number {
  text-shadow: 0 1px 1px rgba(255,255,255,0.8) !important;
}

/* Ring Values */
#membership-tab .ring-value {
  color: var(--gold-primary) !important;
}

/* Central Star / Seal */
#membership-tab .living-core svg path {
  fill: url(#ringGoldGrad) !important; /* Re-using existing SVG gradient, but will override the visual feel of the container */
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.8)) !important;
}
body.light-mode #membership-tab .living-core svg path {
  filter: drop-shadow(0 1px 1px rgba(255,255,255,0.8)) !important;
}

/* 3. MICRO GOLD & ANTIQUE (Labels and Shadows) */
#membership-tab .member-label,
#membership-tab .ring-label {
  color: var(--gold-antique) !important; /* Very subtle and restrained */
}

/* 4. METRIC RINGS (Precision Metal Edge) */
#membership-tab .ring-track {
  stroke: rgba(90, 70, 34, 0.2) !important; /* Deep antique shadow */
}
#membership-tab .ring-progress {
  stroke: var(--gold-primary) !important;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.8)) !important; /* Physical edge, no bloom */
}
body.light-mode #membership-tab .ring-track {
  stroke: rgba(74, 51, 17, 0.1) !important;
}
body.light-mode #membership-tab .ring-progress {
  filter: drop-shadow(0 1px 1px rgba(255,255,255,0.8)) !important;
}

/* 5. BUTTON BORDERS (Brushed Metal) */
#membership-tab .card-actions .btn {
  color: var(--gold-micro) !important;
  border: 1px solid rgba(138, 109, 59, 0.4) !important; /* --gold-deep with opacity */
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.05) !important;
}
body.light-mode #membership-tab .card-actions .btn {
  border-color: rgba(125, 90, 36, 0.3) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.5) !important;
}
#membership-tab .card-actions .btn:hover {
  background: rgba(138, 109, 59, 0.05) !important;
  border-color: var(--gold-primary) !important;
  color: var(--gold-primary) !important;
}
body.light-mode #membership-tab .card-actions .btn:hover {
  background: rgba(125, 90, 36, 0.05) !important;
}
`;

if (!css.includes('PHASE MEMBERSHIP — GOLD MATERIAL SYSTEM')) {
  css += '\n' + membershipGoldRules + '\n';
  fs.writeFileSync('/app/applet/style.css', css);
  console.log("Gold Material System applied successfully.");
} else {
  console.log("Gold rules already exist.");
}

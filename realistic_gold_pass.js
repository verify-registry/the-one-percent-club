const fs = require('fs');

let css = `
/* ==========================================================================
   PHASE MEMBERSHIP — GOLD MATERIAL PASS v2
   REALISTIC POLISHED GOLD / 3D METALLIC EFFECT ONLY
   ========================================================================== */

/* 1. Global Gold Variables Refinement for Polished Metal */
:root {
  --gold-primary: #C9A86A;
  --gold-highlight: #FFF1D0; /* Brighter, narrower specular highlight */
  --gold-midtone: #B6924B;
  --gold-deep: #705524;
  --gold-shadow: #2B210D; /* Almost black-brown for realistic metal shadow */
  --gold-micro: #9A7C40;
  
  /* The Realistic Polished Gradient (Directional Light: Top-Left) */
  --gold-metal-polished: linear-gradient(
    135deg, 
    var(--gold-deep) 0%, 
    var(--gold-highlight) 15%, /* Specular */
    var(--gold-primary) 35%, 
    var(--gold-midtone) 65%, 
    var(--gold-deep) 85%, 
    var(--gold-shadow) 100%
  );
  
  /* Satin/Brushed Metal */
  --gold-metal-brushed: linear-gradient(
    145deg, 
    var(--gold-midtone) 0%, 
    var(--gold-micro) 50%, 
    var(--gold-deep) 100%
  );
}

body.light-mode {
  --gold-highlight: #F5DEAE;
  --gold-primary: #AD8331;
  --gold-midtone: #8E6821;
  --gold-deep: #5E410C;
  --gold-shadow: #332204;
}

/* 2. CARD BORDER / FRAME (Preserving precise original 6px stack geometry, adding material) */
#membership-tab .membership-card {
  box-shadow: 
    0 0 0 1px var(--gold-highlight) !important,       /* Inner highlight */
    0 0 0 2px var(--gold-primary) !important,         /* Inner metal */
    0 0 0 4px var(--obsidian) !important,             /* Gap */
    0 0 0 5px var(--gold-deep) !important,            /* Outer metal frame */
    0 0 0 6px var(--gold-shadow) !important,          /* Outer shadow edge */
    0 35px 70px -15px rgba(0, 0, 0, 0.95) !important, /* Physical shadow */
    0 15px 25px -10px rgba(0, 0, 0, 0.8) !important;
  
  filter: none !important; /* REMOVE THE YELLOW GLOW FILTER */
}

body.light-mode #membership-tab .membership-card {
  box-shadow: 
    0 0 0 1px var(--gold-highlight) !important, 
    0 0 0 2px var(--gold-primary) !important,
    0 0 0 4px var(--ivory, #FCF9F2) !important,
    0 0 0 5px var(--gold-deep) !important,
    0 0 0 6px var(--gold-shadow) !important,
    0 25px 50px -15px rgba(0, 0, 0, 0.15) !important,
    0 10px 20px -10px rgba(0, 0, 0, 0.1) !important;
  
  filter: none !important; /* REMOVE THE YELLOW GLOW FILTER */
}

/* 3. TIER PILL (Machined metal plate with subtle bevel) */
#membership-tab .tier-pill {
  border: 1px solid transparent !important;
  background-image: 
    linear-gradient(rgba(20,18,16,0.95), rgba(10,8,6,0.98)),
    var(--gold-metal-brushed) !important;
  background-origin: border-box !important;
  background-clip: padding-box, border-box !important;
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.08), /* Top bevel */
    inset 0 -1px 1px rgba(0,0,0,0.8),          /* Shadow bevel */
    0 2px 5px rgba(0,0,0,0.6) !important;      /* Physical drop */
  color: var(--gold-primary) !important;
}

body.light-mode #membership-tab .tier-pill {
  background-image: 
    linear-gradient(rgba(255,255,255,0.9), rgba(245,240,230,0.95)),
    var(--gold-metal-brushed) !important;
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 1),
    inset 0 -1px 1px rgba(0,0,0,0.1),
    0 2px 5px rgba(0,0,0,0.1) !important;
}

/* 4. BUTTONS (Brushed metal with bevel) */
#membership-tab .card-actions .btn {
  border: 1px solid transparent !important;
  background-image: 
    linear-gradient(var(--obsidian-2), var(--obsidian-2)),
    var(--gold-metal-brushed) !important;
  background-origin: border-box !important;
  background-clip: padding-box, border-box !important;
  box-shadow: 
    inset 0 1px 0px rgba(255,255,255,0.08), /* Top bevel highlight */
    inset 0 -1px 1px rgba(0,0,0,0.8), /* Bottom shadow bevel */
    0 2px 4px rgba(0,0,0,0.5) !important; /* Drop shadow */
  color: var(--gold-primary) !important;
  text-shadow: none !important;
}
#membership-tab .card-actions .btn:hover {
  background-image: 
    linear-gradient(rgba(201, 168, 106, 0.05), rgba(201, 168, 106, 0.05)),
    var(--gold-metal-polished) !important;
  color: var(--gold-highlight) !important;
}

body.light-mode #membership-tab .card-actions .btn {
  background-image: 
    linear-gradient(var(--ivory, #FCF9F2), var(--ivory, #FCF9F2)),
    var(--gold-metal-brushed) !important;
  box-shadow: 
    inset 0 1px 0px rgba(255,255,255,1), 
    inset 0 -1px 1px rgba(0,0,0,0.1),
    0 2px 4px rgba(0,0,0,0.05) !important;
}

/* 5. TEXT (Subtle metallic specular) */
#membership-tab .card-club-name {
  background: var(--gold-metal-polished) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 1px 0px var(--gold-shadow)) !important; /* Physical stamped depth */
}

body.light-mode #membership-tab .card-club-name {
  filter: drop-shadow(0 1px 0px rgba(255,255,255,0.6)) !important; 
}

/* Ensure Member Name remains visually unchanged in geometry, but respects dark/light contrast perfectly */
#membership-tab .member-name {
  text-shadow: 0 1px 2px rgba(0,0,0,0.9) !important; /* Sharp stamped drop shadow, no glow */
}
body.light-mode #membership-tab .member-name {
  text-shadow: 0 1px 0px rgba(255,255,255,0.8) !important;
}

#membership-tab .ring-value {
  color: var(--gold-primary) !important;
  text-shadow: 0 1px 1px var(--gold-shadow) !important;
}

/* 6. SOVEREIGN EMBLEM / LIVING CORE (3D Mounted Emblem) */
#membership-tab .living-core svg path {
  fill: url(#ringGoldGrad) !important;
  stroke: var(--gold-highlight) !important;
  stroke-width: 0.4px !important;
  filter: 
    drop-shadow(0 1px 1px var(--gold-shadow)) /* Inner metal edge */
    drop-shadow(0 2px 4px rgba(0,0,0,0.8)) !important; /* Cast physical shadow */
}
body.light-mode #membership-tab .living-core svg path {
  filter: 
    drop-shadow(0 1px 1px rgba(0,0,0,0.2)) 
    drop-shadow(0 1px 0 rgba(255,255,255,1)) !important;
}

/* 7. CROWN (Polished Gold Mounted) */
#membership-tab #equippedCrownSlot svg path {
  fill: url(#ringGoldGrad) !important;
  stroke: var(--gold-highlight) !important;
  stroke-width: 0.4px !important;
  filter: 
    drop-shadow(0 1px 1px var(--gold-shadow)) 
    drop-shadow(0 2px 3px rgba(0,0,0,0.8)) !important;
}
body.light-mode #membership-tab #equippedCrownSlot svg path {
  filter: 
    drop-shadow(0 1px 1px rgba(0,0,0,0.1)) 
    drop-shadow(0 1px 0 rgba(255,255,255,1)) !important;
}

/* 8. METRIC RINGS (Precision Machined) */
#membership-tab .ring-track {
  stroke: var(--gold-shadow) !important;
  stroke-width: 2px !important; 
}
body.light-mode #membership-tab .ring-track {
  stroke: rgba(0,0,0,0.05) !important; 
}

#membership-tab .ring-progress {
  stroke: url(#ringGoldGrad) !important;
  stroke-width: 1.5px !important;
  filter: 
    drop-shadow(0 1px 0px rgba(255,255,255,0.15)) /* Top highlight bevel */
    drop-shadow(0 1px 2px rgba(0,0,0,0.9)) !important; /* Cast shadow */
}
body.light-mode #membership-tab .ring-progress {
  filter: 
    drop-shadow(0 1px 0px rgba(255,255,255,0.9)) 
    drop-shadow(0 1px 2px rgba(0,0,0,0.15)) !important;
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + css + '\n');
console.log("Realistic Polished Gold CSS rules appended.");

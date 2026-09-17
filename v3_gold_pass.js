const fs = require('fs');

// 1. UPDATE HTML SVG GRADIENT
let html = fs.readFileSync('/app/applet/index.html', 'utf8');

const v3Gradient = `
      <!-- THE 1% CLUB - Realistic Metallic Gold Gradient v3 (Physical Metal) -->
      <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3A2A12" />  <!-- Dark metallic valley -->
        <stop offset="25%" stop-color="#C9A86A" /> <!-- Rich warm gold body -->
        <stop offset="38%" stop-color="#F0D59D" /> <!-- Champagne reflection -->
        <stop offset="42%" stop-color="#FFF8E7" /> <!-- Narrow bright specular highlight -->
        <stop offset="65%" stop-color="#A68442" /> <!-- Midtone gold body -->
        <stop offset="100%" stop-color="#1A1205" /> <!-- Darker opposite edge -->
      </linearGradient>
`;

if (html.includes('<linearGradient id="ringGoldGrad"')) {
    html = html.replace(/<linearGradient id="ringGoldGrad"[\s\S]*?<\/linearGradient>/, v3Gradient.trim());
    fs.writeFileSync('/app/applet/index.html', html);
    console.log("SVG linearGradient updated to V3 physical metal.");
}

// 2. APPEND V3 CSS RULES
const css = `
/* ==========================================================================
   PHASE — REAL GOLD MATERIAL REFINEMENT v3 (PHYSICAL METAL ONLY)
   ========================================================================== */

:root {
  /* Core Realistic Physical Metal Palette */
  --gold-primary: #C9A86A;
  --gold-highlight: #FFF8E7; /* Sharp, narrow specular */
  --gold-champagne: #F0D59D;
  --gold-midtone: #A68442;
  --gold-shadow: #3A2A12;    /* Dark valley */
  --gold-deep: #1A1205;      /* Recessed edge */
  --gold-antique: #7D6133;
  --gold-satin: #B39459;
  
  /* Physical Metal Polished Gradient (Matches SVG structure) */
  --gold-metal-polished: linear-gradient(
    135deg, 
    var(--gold-shadow) 0%, 
    var(--gold-primary) 25%, 
    var(--gold-champagne) 38%, 
    var(--gold-highlight) 42%, 
    var(--gold-midtone) 65%, 
    var(--gold-deep) 100%
  );
  
  /* Horizontal Micro-brush / Satin Gradient */
  --gold-metal-brushed: linear-gradient(
    90deg, 
    var(--gold-shadow) 0%, 
    var(--gold-primary) 20%, 
    var(--gold-satin) 50%, 
    var(--gold-primary) 80%, 
    var(--gold-shadow) 100%
  );
}

body.light-mode {
  /* Deeper contrast for Ivory backgrounds */
  --gold-primary: #A47B33;
  --gold-highlight: #F5E2BB; 
  --gold-champagne: #D4AD66;
  --gold-midtone: #7A571B;
  --gold-shadow: #38250A;
  --gold-deep: #1F1400;
  --gold-antique: #664917;
  --gold-satin: #8F6926;
}

/* 1. OUTER CARD FRAME (Thin physical metal edge via background-clip) */
#membership-tab .membership-card {
  border: 1px solid transparent !important;
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 40%) padding-box,
    radial-gradient(ellipse at 50% 30%, rgba(30, 25, 20, 0.95) 0%, rgba(12, 10, 8, 1) 100%) padding-box,
    var(--gold-metal-polished) border-box !important;
  
  /* 1-2px depth shadow stack (Inner bevel + Drop shadow) */
  box-shadow: 
    inset 1px 1px 1px rgba(255,255,255,0.08),  /* Inner bevel light catch */
    inset -1px -1px 1px rgba(0,0,0,0.9),       /* Inner bevel shadow */
    0 15px 35px -10px rgba(0, 0, 0, 0.95) !important; /* Physical contact shadow */
    
  filter: none !important;
}

body.light-mode #membership-tab .membership-card {
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 40%) padding-box,
    radial-gradient(ellipse at 50% 30%, #ffffff 0%, #f7f4ea 50%, #e8e2d2 100%) padding-box,
    var(--gold-metal-polished) border-box !important;
    
  box-shadow: 
    inset 1px 1px 2px rgba(255,255,255,1), 
    inset -1px -1px 2px rgba(150,120,80,0.15),
    0 15px 35px -10px rgba(40, 30, 10, 0.15) !important;
}

/* 2. PORTRAIT RING (Sharp conic reflection) */
#membership-tab .portrait-ring {
  background: conic-gradient(
    from 135deg, 
    var(--gold-shadow) 0deg, 
    var(--gold-primary) 45deg, 
    var(--gold-highlight) 60deg,
    var(--gold-primary) 75deg,
    var(--gold-shadow) 150deg, 
    var(--gold-midtone) 220deg, 
    var(--gold-highlight) 240deg,
    var(--gold-midtone) 260deg,
    var(--gold-shadow) 360deg
  ) !important;
  box-shadow: 
    0 15px 25px -5px rgba(0, 0, 0, 0.8),
    inset 1px 1px 1px rgba(255, 255, 255, 0.25), 
    inset -1px -1px 2px rgba(10, 5, 0, 0.9) !important;
}

/* 3. BUTTONS & TIER PILL (Brushed/Satin metal) */
#membership-tab .card-actions .btn,
#membership-tab .tier-pill {
  border: 1px solid transparent !important;
  background: 
    linear-gradient(rgba(18, 16, 14, 0.95), rgba(10, 8, 6, 0.98)) padding-box,
    var(--gold-metal-brushed) border-box !important;
  box-shadow: 
    inset 0 1px 0px rgba(255,255,255,0.05),
    0 1px 3px rgba(0,0,0,0.6) !important;
}
body.light-mode #membership-tab .card-actions .btn,
body.light-mode #membership-tab .tier-pill {
  background: 
    linear-gradient(rgba(255,255,255,0.9), rgba(245,240,230,0.95)) padding-box,
    var(--gold-metal-brushed) border-box !important;
  box-shadow: 
    inset 0 1px 0px rgba(255,255,255,0.8),
    0 1px 3px rgba(0,0,0,0.05) !important;
}

/* Hover state retains brush */
#membership-tab .card-actions .btn:hover {
  background: 
    linear-gradient(rgba(201, 168, 106, 0.05), rgba(201, 168, 106, 0.05)) padding-box,
    var(--gold-metal-polished) border-box !important;
}

/* 4. ANTIQUE / ENGRAVED GOLD (Microtext & Labels) */
#membership-tab .member-label,
#membership-tab .ring-label,
#membership-tab .card-tagline,
#membership-tab .card-tagline span {
  color: var(--gold-antique) !important;
  text-shadow: 0 1px 0 rgba(255,255,255,0.02) !important; /* Extremely subtle deboss */
}
body.light-mode #membership-tab .member-label,
body.light-mode #membership-tab .ring-label,
body.light-mode #membership-tab .card-tagline,
body.light-mode #membership-tab .card-tagline span {
  text-shadow: 0 1px 0 rgba(255,255,255,0.4) !important;
}
#membership-tab .member-number {
  color: var(--gold-satin) !important;
}

/* 5. METRIC RINGS (Precision Machined Edges) */
#membership-tab .ring-progress {
  stroke: url(#ringGoldGrad) !important;
  /* Directional light filter simulating 3D bevel on the stroke */
  filter: 
    drop-shadow(1px 1px 0px rgba(255,255,255,0.15)) 
    drop-shadow(-1px -1px 0px var(--gold-deep))
    drop-shadow(0 2px 3px rgba(0,0,0,0.7)) !important; 
}
body.light-mode #membership-tab .ring-progress {
  filter: 
    drop-shadow(1px 1px 0px rgba(255,255,255,0.8)) 
    drop-shadow(-1px -1px 0px var(--gold-shadow))
    drop-shadow(0 2px 3px rgba(0,0,0,0.15)) !important; 
}
#membership-tab .ring-track {
  stroke: var(--gold-shadow) !important;
  stroke-width: 1.5px !important;
}
body.light-mode #membership-tab .ring-track {
  stroke: rgba(0,0,0,0.05) !important;
}

/* 6. GOLD EMBLEMS (Mounted 3D Physical Seals) */
#membership-tab .living-core svg path,
#membership-tab #equippedCrownSlot svg path {
  fill: url(#ringGoldGrad) !important;
  stroke: var(--gold-highlight) !important;
  stroke-width: 0.2px !important; /* Extremely fine polished edge */
  filter: 
    drop-shadow(1px 1px 0px rgba(255,255,255,0.2)) 
    drop-shadow(-1px -1px 0px var(--gold-deep))
    drop-shadow(0 2px 3px rgba(0,0,0,0.85)) !important;
}
body.light-mode #membership-tab .living-core svg path,
body.light-mode #membership-tab #equippedCrownSlot svg path {
  filter: 
    drop-shadow(1px 1px 0px rgba(255,255,255,0.9)) 
    drop-shadow(-1px -1px 0px rgba(0,0,0,0.2))
    drop-shadow(0 2px 3px rgba(0,0,0,0.15)) !important;
}

/* 7. METALLIC TYPOGRAPHY (Stamping effect) */
#membership-tab .card-club-name {
  background: var(--gold-metal-polished) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 1px 0px var(--gold-deep)) !important; /* Letterpress depth */
}
body.light-mode #membership-tab .card-club-name {
  filter: drop-shadow(0 1px 0px rgba(255,255,255,0.8)) !important; 
}
#membership-tab .ring-value {
  color: var(--gold-primary) !important;
  text-shadow: 0 1px 1px var(--gold-shadow) !important;
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + css + '\n');
console.log("V3 Realistic Physical Metal appended.");

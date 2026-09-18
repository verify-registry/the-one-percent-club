const fs = require('fs');

const microPassCSS = `
/* ==========================================================================
   MICRO-PASS: LUXURY PHYSICAL MEMBERSHIP CARD MATERIAL
   ========================================================================== */

/* 1. OUTER FRAME: Authentic Polished Champagne Gold (Multi-stage bevel & Specular Highlight) */
body #membership-tab #membershipCard.membership-card {
  background-image: 
    radial-gradient(circle at 50% 30%, #16161a 0%, #0d0d10 65%, #050507 100%),
    linear-gradient(
      145deg,
      #4A3B1B 0%,      /* Darker occlusion */
      #B59A54 15%,     /* Champagne gold */
      #FDF2D0 22%,     /* Sharp specular highlight */
      #8C7335 32%,     /* Mid-tone transition */
      #2B220F 50%,     /* Deep occlusion / metallic curve */
      #C9AA62 65%,     /* Secondary light hit */
      #FDF2D0 75%,     /* Secondary specular highlight */
      #8C7335 85%,     /* Shadow fade */
      #1A1408 100%     /* Deep edge occlusion */
    ) !important;
  
  box-shadow: 
    inset 0 1px 1px rgba(253, 242, 208, 0.4), /* Outer bright micro-bevel (Specular) */
    inset 0 0 0 1px rgba(10, 8, 4, 0.95),      /* Inner dark bevel (Depth) */
    inset 0 10px 30px rgba(0, 0, 0, 0.8) !important; /* Deep interior shadow */
}

body.light-mode #membership-tab #membershipCard.membership-card {
  background-image: 
    radial-gradient(circle at 50% 30%, #f7f5ef 0%, #ebe7dc 60%, #ded9cb 100%),
    linear-gradient(
      145deg,
      #705621 0%,
      #D4B56A 12%,
      #FFFFFF 20%,     /* Extreme bright hit */
      #9C7C33 35%,
      #3B2D12 50%,     /* Core metallic shadow */
      #E3C57B 65%,
      #FFFFFF 75%,     /* Secondary bright hit */
      #A68740 85%,
      #261D0B 100%
    ) !important;
  
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 1),    /* Outer bright micro-bevel */
    inset 0 0 0 1px rgba(92, 70, 26, 0.5),     /* Inner dark bevel */
    inset 0 10px 30px rgba(50, 40, 20, 0.1) !important; /* Soft interior shadow */
}

/* 2. TEXT: THE 1% CLUB - Embossed Metallic Lettering */
#membership-tab .card-club-name {
  background: linear-gradient(
    170deg,
    #FDF2D0 0%,      /* Bright upper edge */
    #D4B56A 30%,     /* Main champagne gold */
    #8C7335 65%,     /* Metal core shadow */
    #C9AA62 85%,     /* Lower reflection */
    #4A3B1B 100%     /* Bottom edge depth */
  ) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  
  /* Embossed metal illusion: light catches top edge, shadow drops below */
  filter: 
    drop-shadow(0 -0.5px 0px rgba(253, 242, 208, 0.5))
    drop-shadow(0 1.5px 1.5px rgba(10, 8, 4, 0.9)) !important;
}

body.light-mode #membership-tab .card-club-name {
  background: linear-gradient(
    170deg,
    #FFFFFF 0%,
    #E3C57B 30%,
    #9C7C33 65%,
    #D4B56A 85%,
    #3B2D12 100%
  ) !important;
  
  filter: 
    drop-shadow(0 -0.5px 0px rgba(255, 255, 255, 0.8))
    drop-shadow(0 1.5px 1.5px rgba(60, 45, 15, 0.5)) !important;
}
`;

let css = fs.readFileSync('style.css', 'utf8');
css += '\n' + microPassCSS;
fs.writeFileSync('style.css', css);


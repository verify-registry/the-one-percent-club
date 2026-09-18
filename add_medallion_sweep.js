const fs = require('fs');

const sweepCSS = `
/* ==========================================================================
   SOLID GOLD MEDALLION - LIGHT SWEEP ANIMATION
   ========================================================================== */
.solid-gold-medallion::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(
    115deg,
    transparent 20%,
    rgba(255, 255, 255, 0.1) 45%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.1) 55%,
    transparent 80%
  );
  background-size: 250% 100%;
  background-repeat: no-repeat;
  background-position: -200% 0;
  animation: sgm-sweep-anim 6s infinite cubic-bezier(0.25, 0.1, 0.25, 1);
  pointer-events: none;
  z-index: 10;
  mix-blend-mode: overlay; /* Realistic metallic shine */
}

@keyframes sgm-sweep-anim {
  0%, 15% { background-position: -200% 0; }
  35%, 100% { background-position: 200% 0; }
}

/* Ensure the light sweep renders above the SVG children */
.solid-gold-medallion {
  z-index: 10;
}
`;

let css = fs.readFileSync('style.css', 'utf8');
css += '\n' + sweepCSS;
fs.writeFileSync('style.css', css);

console.log("Light sweep animation successfully added to .solid-gold-medallion.");

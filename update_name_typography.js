const fs = require('fs');

const cssOverride = `
/* ==========================================================================
   MEMBER NAME REFINEMENT (Specific Clamp & Tracking)
   ========================================================================== */
#membership-tab .member-name {
  font-family: 'Cormorant Garamond', 'Cinzel', 'Playfair Display', serif !important;
  font-size: clamp(1.2rem, 4vw, 1.6rem) !important;
  font-weight: 600 !important;
  letter-spacing: 0.05em !important;
  white-space: nowrap !important;
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + cssOverride + '\n');
console.log("Applied updated member-name typography.");

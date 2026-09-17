const fs = require('fs');

const css = `
/* ==========================================================================
   EDITORIAL TYPOGRAPHY FINAL PASS (Cormorant Garamond & Inter)
   ========================================================================== */

/* High-contrast serif for Member Name */
#membership-tab .member-name {
  font-family: 'Cormorant Garamond', 'Playfair Display', serif !important;
  font-size: clamp(1.2rem, 4vw, 1.6rem) !important;
  font-weight: 600 !important;
  letter-spacing: 0.05em !important;
  line-height: 1.2 !important;
  white-space: nowrap !important;
}

/* Inter for all UI labels and secondary text */
#membership-tab .tier-pill,
#membership-tab #tierName,
#membership-tab .member-label,
#membership-tab .member-number,
#membership-tab .ring-label,
#membership-tab .card-tagline,
#membership-tab .card-tagline span,
#membership-tab .card-actions .btn,
#membership-tab .card-actions .btn span,
#membership-tab .section-name,
#membership-tab .tagline {
  font-family: 'Inter', sans-serif !important;
}

/* Precise editorial-grade letter-spacing and line-heights (LTR) */
#membership-tab .member-label {
  letter-spacing: 0.25em !important;
  font-weight: 400 !important;
  font-size: 0.5rem !important;
}
#membership-tab .member-number {
  letter-spacing: 0.15em !important;
  font-weight: 400 !important;
  font-size: 0.55rem !important;
}
#membership-tab .ring-label {
  letter-spacing: 0.18em !important;
  font-weight: 400 !important;
}
#membership-tab .card-tagline {
  letter-spacing: 0.12em !important;
  line-height: 1.4 !important;
  font-weight: 400 !important;
}
#membership-tab .card-actions .btn {
  letter-spacing: 0.08em !important;
}

/* Zero letter-spacing for elegant RTL (Arabic) rendering */
html[dir="rtl"] #membership-tab .member-name,
html[dir="rtl"] #membership-tab .member-label,
html[dir="rtl"] #membership-tab .member-number,
html[dir="rtl"] #membership-tab .ring-label,
html[dir="rtl"] #membership-tab .card-tagline,
html[dir="rtl"] #membership-tab .card-actions .btn {
  letter-spacing: 0 !important;
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + css + '\n');
console.log("Editorial typography rules successfully applied.");

const fs = require('fs');

const typographyRules = `
/* ==========================================================================
   PHASE MEMBERSHIP — TYPOGRAPHY MICRO-PASS ONLY
   Precision Typography Refinement (NO LAYOUT REDESIGN)
   ========================================================================== */

/* 1. MEMBER NAME (Strongest typographic element) */
#membership-tab .member-name {
  font-family: 'Cormorant Garamond', 'Cinzel', 'Playfair Display', serif !important;
  font-weight: 500 !important;
  font-size: 1.45rem !important;
  letter-spacing: 0.12em !important;
  line-height: 1.2 !important;
  text-transform: uppercase !important;
}

/* 2. MEMBERSHIP STATUS (Refined sans-serif) */
#membership-tab .tier-pill {
  font-family: 'Inter', sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.55rem !important;
  letter-spacing: 0.15em !important;
  text-transform: uppercase !important;
  line-height: 1.1 !important;
}

#membership-tab #tierName {
  font-family: 'Inter', sans-serif !important;
  font-weight: 500 !important;
  letter-spacing: 0.15em !important;
}

/* 3. MEMBER NUMBER (Precision micro-typography) */
#membership-tab .member-label {
  font-family: 'Inter', sans-serif !important;
  font-weight: 400 !important;
  font-size: 0.5rem !important;
  letter-spacing: 0.25em !important;
  text-transform: uppercase !important;
}

#membership-tab .member-number {
  font-family: 'Inter', sans-serif !important;
  font-weight: 400 !important;
  font-size: 0.55rem !important;
  letter-spacing: 0.15em !important;
}

/* 4. METRIC NUMBERS (Premium display numerals) */
#membership-tab .ring-value {
  font-family: 'Cormorant Garamond', 'Cinzel', serif !important;
  font-weight: 500 !important;
  font-size: 0.85rem !important;
  letter-spacing: 0.02em !important;
}

/* 5. METRIC LABELS (Secondary luxury instrument labels) */
#membership-tab .ring-label {
  font-family: 'Inter', sans-serif !important;
  font-weight: 400 !important;
  font-size: 0.45rem !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
}

/* 6. THE 1% CLUB (Internal branding inside card) */
#membership-tab .card-club-name {
  font-family: 'Cormorant Garamond', 'Cinzel', serif !important;
  font-weight: 500 !important;
  font-size: 0.85rem !important;
  letter-spacing: 0.2em !important;
}

/* 7. FOOTER / MICROTEXT (Disclaimer) */
#membership-tab .card-tagline {
  font-family: 'Inter', sans-serif !important;
  font-weight: 400 !important;
  font-size: 0.55rem !important;
  letter-spacing: 0.12em !important;
  line-height: 1.4 !important;
}
#membership-tab .card-tagline span {
  font-size: 0.45rem !important;
  letter-spacing: 0.15em !important;
}

/* 8. BUTTON TYPOGRAPHY (Private banking controls) */
#membership-tab .card-actions .btn {
  font-family: 'Inter', sans-serif !important;
  font-weight: 500 !important;
  font-size: 0.65rem !important;
  letter-spacing: 0.08em !important;
  line-height: 1.2 !important;
}
#membership-tab .card-actions .btn span {
  letter-spacing: 0.08em !important;
}

/* ==========================================================================
   ARABIC / RTL (Natural elegance, no excessive tracking)
   ========================================================================== */
html[dir="rtl"] #membership-tab .member-name,
html[dir="rtl"] #membership-tab .tier-pill,
html[dir="rtl"] #membership-tab #tierName,
html[dir="rtl"] #membership-tab .member-label,
html[dir="rtl"] #membership-tab .member-number,
html[dir="rtl"] #membership-tab .ring-value,
html[dir="rtl"] #membership-tab .ring-label,
html[dir="rtl"] #membership-tab .card-club-name,
html[dir="rtl"] #membership-tab .card-tagline,
html[dir="rtl"] #membership-tab .card-tagline span,
html[dir="rtl"] #membership-tab .card-actions .btn,
html[dir="rtl"] #membership-tab .card-actions .btn span {
  letter-spacing: 0 !important;
}

/* Responsive adjustments if required (strictly isolated to Membership fonts) */
@media (max-width: 375px) {
  #membership-tab .member-name {
    font-size: 1.2rem !important;
  }
}
@media (max-width: 360px) {
  #membership-tab .member-name {
    font-size: 1.15rem !important;
  }
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + typographyRules + '\n');
console.log("Appended typography pass.");

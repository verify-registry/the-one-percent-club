const fs = require('fs');

// 1. Rewrite the HTML for the badge
let html = fs.readFileSync('index.html', 'utf8');
const oldBtnRegex = /<button class="icon-btn shield-btn force-medallion"[\s\S]*?<\/button>/;

const pristineBadgeHTML = `<button class="premium-hallmark-badge" type="button" aria-label="Verified Membership">
          <div class="hallmark-inner">
            <svg viewBox="0 0 24 24" class="hallmark-icon">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" class="hallmark-shield" />
              <path d="M9 12l2 2 4-4" class="hallmark-check" />
            </svg>
          </div>
        </button>`;

if (html.match(oldBtnRegex)) {
    html = html.replace(oldBtnRegex, pristineBadgeHTML);
} else {
    console.log("Could not find force-medallion button in HTML");
}
fs.writeFileSync('index.html', html);

// 2. Rewrite the CSS for the badge
let css = fs.readFileSync('style.css', 'utf8');

// Remove the old force-medallion and heavy-gold-medallion styles
css = css.replace(/\/\* NEW MEDALLION FORCE OVERRIDE \*\/[\s\S]*?\.force-medallion::after \{ display: none !important; \}/g, '');
css = css.replace(/\/\* ==========================================================================\n   HEAVY GOLD MEDALLION \(Header\)[\s\S]*?filter: drop-shadow\(0 -1px 1px rgba\(255, 255, 255, 0\.8\)\);\n\}/g, '');


const pristineCSS = `
/* ==========================================================================
   PREMIUM HALLMARK BADGE (Quiet Luxury)
   ========================================================================== */
.premium-hallmark-badge {
  width: 32px !important;
  height: 32px !important;
  border-radius: 50%;
  position: absolute;
  inset-inline-end: 18px;
  background: linear-gradient(135deg, #2A2A2A 0%, #0F0F0F 100%);
  border: 1px solid rgba(212, 175, 55, 0.4); /* Authentic Gold Border */
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.8), /* Deep drop shadow */
    inset 0 1px 1px rgba(255, 255, 255, 0.1), /* Top rim light */
    inset 0 -1px 2px rgba(0, 0, 0, 0.8); /* Bottom inner shadow */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.premium-hallmark-badge::before {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #1A1A1A 0%, #050505 100%);
  border: 1px solid rgba(212, 175, 55, 0.15);
  z-index: 1;
}

.hallmark-inner {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.hallmark-icon {
  width: 14px;
  height: 14px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.9));
}

.hallmark-shield {
  fill: none;
  stroke: #D4AF37; /* Antique Gold */
  stroke-width: 1.5;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.hallmark-check {
  fill: none;
  stroke: #FDF2D0; /* Champagne Gold Highlight */
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}

/* Light Mode Support */
body.light-mode .premium-hallmark-badge {
  background: linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%);
  border-color: rgba(184, 134, 11, 0.4);
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.8),
    inset 0 -1px 2px rgba(0, 0, 0, 0.1);
}

body.light-mode .premium-hallmark-badge::before {
  background: radial-gradient(circle at 30% 30%, #FFFFFF 0%, #EEEEEE 100%);
  border-color: rgba(184, 134, 11, 0.2);
}

body.light-mode .hallmark-shield {
  stroke: #B8860B; /* Darker gold for light background */
}

body.light-mode .hallmark-check {
  stroke: #8B6508;
}
`;

css += pristineCSS;
fs.writeFileSync('style.css', css);

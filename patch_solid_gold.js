const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The HTML to inject
const newBtn = `<button class="icon-btn shield-btn solid-gold-medallion" type="button" aria-label="Verified Membership">
          <svg viewBox="0 0 32 32" class="sgm-svg">
            <defs>
              <linearGradient id="gold-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFE699"/>
                <stop offset="25%" stop-color="#D4AF37"/>
                <stop offset="50%" stop-color="#996515"/>
                <stop offset="75%" stop-color="#D4AF37"/>
                <stop offset="100%" stop-color="#FFDF00"/>
              </linearGradient>
              <radialGradient id="gold-face-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#FFF3C7"/>
                <stop offset="50%" stop-color="#D4AF37"/>
                <stop offset="100%" stop-color="#A67822"/>
              </radialGradient>
              <linearGradient id="gold-shield-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFF8D6"/>
                <stop offset="40%" stop-color="#D4AF37"/>
                <stop offset="100%" stop-color="#8B6508"/>
              </linearGradient>
              <filter id="gold-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="0.8" flood-color="#593C00" flood-opacity="0.8"/>
              </filter>
            </defs>
            <!-- Rim -->
            <circle cx="16" cy="16" r="16" fill="url(#gold-rim-grad)" />
            <!-- Face -->
            <circle cx="16" cy="16" r="14.5" fill="url(#gold-face-grad)" />
            <!-- Inner ring for detail -->
            <circle cx="16" cy="16" r="13.5" fill="none" stroke="#734F00" stroke-width="0.5" opacity="0.4" />
            
            <!-- Shield Group -->
            <g transform="translate(4, 4)">
              <!-- Shield -->
              <path d="M12 2.5L18.5 5.5V11.5C18.5 15.5 16 19 12 20.5C8 19 5.5 15.5 5.5 11.5V5.5L12 2.5Z" fill="url(#gold-shield-grad)" stroke="#664400" stroke-width="1" filter="url(#gold-shadow)" stroke-linejoin="round"/>
              <!-- Checkmark -->
              <path d="M9.5 11L11.5 13L15 9" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#gold-shadow)"/>
            </g>
          </svg>
        </button>`;

// Replace old premium-hallmark-badge or any shield-btn
const regex1 = /<button class="premium-hallmark-badge"[^>]*>[\s\S]*?<\/button>/;
const regex2 = /<button class="icon-btn shield-btn[^>]*>[\s\S]*?<\/button>/;

if (html.match(regex1)) {
    html = html.replace(regex1, newBtn);
} else if (html.match(regex2)) {
    html = html.replace(regex2, newBtn);
}

fs.writeFileSync('index.html', html);

// Update CSS
let css = fs.readFileSync('style.css', 'utf8');

// Wipe old Premium Hallmark Badge css to keep file clean
css = css.replace(/\/\* ==========================================================================\n   PREMIUM HALLMARK BADGE[\s\S]*?body\.light-mode \.hallmark-check \{\n  stroke: #8B6508;\n\}/g, '');

const sgmCSS = `
/* ==========================================================================
   SOLID GOLD MEDALLION (Header)
   ========================================================================== */
.solid-gold-medallion {
  width: 32px !important;
  height: 32px !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  border-radius: 50%;
  position: absolute;
  inset-inline-end: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  overflow: visible !important;
}

.solid-gold-medallion::after { display: none !important; }

.sgm-svg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

body.light-mode .solid-gold-medallion {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(184, 134, 11, 0.3);
}
`;

css += sgmCSS;
fs.writeFileSync('style.css', css);

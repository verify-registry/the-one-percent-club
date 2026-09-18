const fs = require('fs');

const svgMarkup = `<svg viewBox="0 0 64 64" class="hgm-svg">
  <defs>
    <linearGradient id="hm-rim-out" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2B962"/>
      <stop offset="15%" stop-color="#FFF0A8"/>
      <stop offset="28%" stop-color="#5C3A11"/>
      <stop offset="45%" stop-color="#D6A54A"/>
      <stop offset="65%" stop-color="#FFF0A8"/>
      <stop offset="82%" stop-color="#472A08"/>
      <stop offset="100%" stop-color="#9E7326"/>
    </linearGradient>

    <linearGradient id="hm-rim-in" x1="100%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#E2B962"/>
      <stop offset="15%" stop-color="#FFF0A8"/>
      <stop offset="28%" stop-color="#5C3A11"/>
      <stop offset="45%" stop-color="#D6A54A"/>
      <stop offset="65%" stop-color="#FFF0A8"/>
      <stop offset="82%" stop-color="#472A08"/>
      <stop offset="100%" stop-color="#9E7326"/>
    </linearGradient>

    <radialGradient id="hm-core" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#2B1C0B"/>
      <stop offset="50%" stop-color="#120A03"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>

    <radialGradient id="hm-shield" cx="35%" cy="25%" r="75%">
      <stop offset="0%" stop-color="#FFF5C2"/>
      <stop offset="25%" stop-color="#DDAE4A"/>
      <stop offset="55%" stop-color="#8C5C16"/>
      <stop offset="80%" stop-color="#3D2506"/>
      <stop offset="100%" stop-color="#1C1002"/>
    </radialGradient>
    
    <linearGradient id="hm-shield-edge" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF0A8"/>
      <stop offset="50%" stop-color="#D6A54A"/>
      <stop offset="100%" stop-color="#472A08"/>
    </linearGradient>

    <filter id="hm-drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" flood-color="#000" flood-opacity="0.95"/>
    </filter>

    <filter id="hm-inset-shadow">
      <feOffset dx="0" dy="2.5"/>
      <feGaussianBlur stdDeviation="2" result="offset-blur"/>
      <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
      <feFlood flood-color="black" flood-opacity="0.9" result="color"/>
      <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
      <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
    </filter>
  </defs>

  <!-- Solid Backing -->
  <circle cx="32" cy="32" r="32" fill="#111" />

  <!-- Outer Rim Edge (The Bevel Down) -->
  <circle cx="32" cy="32" r="32" fill="url(#hm-rim-out)" />
  
  <!-- Inner Rim Edge (The Bevel Up) -->
  <circle cx="32" cy="32" r="28.5" fill="url(#hm-rim-in)" />
  
  <!-- Deep Dark Recessed Core -->
  <circle cx="32" cy="32" r="25.5" fill="url(#hm-core)" filter="url(#hm-inset-shadow)" />

  <!-- The Shield -->
  <g filter="url(#hm-drop-shadow)">
    <!-- Adjusted path to fit nicely within r=25.5 -->
    <path d="M32 14 L45 19 V31 C45 40 38 47 32 50 C26 47 19 40 19 31 V19 Z" fill="url(#hm-shield)" stroke="url(#hm-shield-edge)" stroke-width="1.5" stroke-linejoin="round" />
  </g>

  <!-- Deep Engraved Checkmark (Dark void inside the gold shield) -->
  <path d="M26.5 30.5 L30.5 34.5 L38.5 24.5" fill="none" stroke="#1C1002" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
  
  <!-- Highlight catching the light at the bottom of the engraving to sell the 3D depth -->
  <path d="M26.5 32.5 L30.5 36.5 L38.5 26.5" fill="none" stroke="#FFF5C2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" />
</svg>`;

let html = fs.readFileSync('index.html', 'utf8');

// Replace the old button with the new SVG based one
const btnRegex = /<button class="icon-btn shield-btn luxury-medallion-btn"[^>]*>[\s\S]*?<\/button>/;
const newBtn = `<button class="icon-btn shield-btn heavy-gold-medallion" type="button" aria-label="Registry">\n  ${svgMarkup}\n</button>`;

html = html.replace(btnRegex, newBtn);
fs.writeFileSync('index.html', html);

let css = fs.readFileSync('style.css', 'utf8');

// Remove the old medallion CSS
css = css.replace(/\/\* ==========================================================================\n   LUXURY VERIFICATION MEDALLION \(Header\)[\s\S]*?(?=\/\*|$)/, '');

const newCSS = `/* ==========================================================================
   HEAVY GOLD MEDALLION (Header)
   ========================================================================== */
.heavy-gold-medallion {
  width: 32px !important;
  height: 32px !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  border-radius: 50%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset-inline-end: 18px;
  overflow: visible !important;
}

body.light-mode .heavy-gold-medallion {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(100, 60, 10, 0.3);
}

.heavy-gold-medallion::after {
  display: none !important;
}

.hgm-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 -1px 1px rgba(255, 255, 255, 0.15));
}

body.light-mode .hgm-svg {
  filter: drop-shadow(0 -1px 1px rgba(255, 255, 255, 0.8));
}
`;

css += '\n' + newCSS;
fs.writeFileSync('style.css', css);

const fs = require('fs');

const svgMarkup = `<svg viewBox="0 0 100 100" class="hgm-svg">
  <defs>
    <!-- Sharp, high-contrast gold metallic finish -->
    <linearGradient id="gold-metal" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2B962"/>
      <stop offset="20%" stop-color="#FFF0A8"/>
      <stop offset="30%" stop-color="#5C3A11"/>
      <stop offset="50%" stop-color="#D6A54A"/>
      <stop offset="70%" stop-color="#FFF0A8"/>
      <stop offset="85%" stop-color="#472A08"/>
      <stop offset="100%" stop-color="#E2B962"/>
    </linearGradient>

    <!-- Deep shadow for the central void -->
    <radialGradient id="deep-void" cx="50%" cy="50%" r="50%">
      <stop offset="60%" stop-color="#110A03"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    
    <!-- Metallic Shield Gradient -->
    <linearGradient id="shield-metal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5C2"/>
      <stop offset="40%" stop-color="#DDAE4A"/>
      <stop offset="60%" stop-color="#8C5C16"/>
      <stop offset="100%" stop-color="#3D2506"/>
    </linearGradient>

    <filter id="drop-shadow-heavy" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- 1. Thick Outer Rim (Base Metal) -->
  <circle cx="50" cy="50" r="50" fill="url(#gold-metal)" />
  
  <!-- 2. The Steep Bevel (Inner shadow edge) -->
  <circle cx="50" cy="50" r="43" fill="#3D2506" />
  
  <!-- 3. The Deep Recessed Core -->
  <circle cx="50" cy="50" r="41" fill="url(#deep-void)" />
  
  <!-- 4. Inner Ring accent (Very thin highlight ring inside the void) -->
  <circle cx="50" cy="50" r="39" fill="none" stroke="#DDAE4A" stroke-width="0.5" opacity="0.6" />

  <!-- 5. The Shield (Sitting inside the void) -->
  <g filter="url(#drop-shadow-heavy)">
    <path d="M50 25 L65 32 V45 C65 60 58 72 50 78 C42 72 35 60 35 45 V32 Z" fill="url(#shield-metal)" stroke="#FFF5C2" stroke-width="1.5" stroke-linejoin="round" />
  </g>

  <!-- 6. Thick Solid Gold Checkmark (Not just an outline) -->
  <path d="M43 50 L48 56 L58 40" fill="none" stroke="#2B1C0B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M43 49 L48 55 L58 39" fill="none" stroke="#FFF5C2" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

let html = fs.readFileSync('index.html', 'utf8');

const btnRegex = /<button class="icon-btn shield-btn heavy-gold-medallion"[^>]*>[\s\S]*?<\/button>/;
const newBtn = `<button class="icon-btn shield-btn heavy-gold-medallion" type="button" aria-label="Registry">\n  ${svgMarkup}\n</button>`;

if (html.match(btnRegex)) {
  html = html.replace(btnRegex, newBtn);
  fs.writeFileSync('index.html', html);
} else {
    console.log("Could not find medallion in index.html");
}

let css = fs.readFileSync('style.css', 'utf8');

// Ensure the button isn't squished and looks like a solid physical object
const cssUpdate = css.replace(/\.heavy-gold-medallion \{[\s\S]*?overflow: visible !important;\n\}/, 
`.heavy-gold-medallion {
  width: 38px !important; 
  height: 38px !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset-inline-end: 18px;
  overflow: visible !important;
}`);

if(cssUpdate !== css) {
    fs.writeFileSync('style.css', cssUpdate);
}

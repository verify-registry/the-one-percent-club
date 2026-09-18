const fs = require('fs');

const svgMarkup = `<svg viewBox="0 0 100 100" style="width: 100%; height: 100%; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.6));">
  <defs>
    <!-- Strong, high-contrast gold metallic finish exactly like the image -->
    <radialGradient id="gold-rim" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#EAD189"/>
      <stop offset="40%" stop-color="#B28434"/>
      <stop offset="70%" stop-color="#6B4311"/>
      <stop offset="100%" stop-color="#3A2105"/>
    </radialGradient>

    <!-- The inner bright ring -->
    <linearGradient id="gold-ring-bright" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2BA"/>
      <stop offset="50%" stop-color="#CFA144"/>
      <stop offset="100%" stop-color="#492B0A"/>
    </linearGradient>

    <!-- Deep black void -->
    <radialGradient id="deep-black" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1A1A1A"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    
    <!-- Shield Metallic Gradient -->
    <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE6A9"/>
      <stop offset="30%" stop-color="#C2943A"/>
      <stop offset="70%" stop-color="#704712"/>
      <stop offset="100%" stop-color="#2D1903"/>
    </linearGradient>
  </defs>

  <!-- 1. The outermost dark border/shadow -->
  <circle cx="50" cy="50" r="48" fill="#2E1C05" />

  <!-- 2. The main thick gold rim -->
  <circle cx="50" cy="50" r="46" fill="url(#gold-rim)" />
  
  <!-- 3. The sharp bright inner ring -->
  <circle cx="50" cy="50" r="32" fill="url(#gold-ring-bright)" />
  
  <!-- 4. The step down to the black void -->
  <circle cx="50" cy="50" r="28" fill="#1A0F02" />
  
  <!-- 5. The deep black center -->
  <circle cx="50" cy="50" r="26" fill="url(#deep-black)" />
  
  <!-- 6. Thin gold accent ring inside the black -->
  <circle cx="50" cy="50" r="25" fill="none" stroke="#CFA144" stroke-width="0.5" opacity="0.8" />

  <!-- 7. The Shield -->
  <path d="M50 33 L59 38 V48 C59 58 54 65 50 69 C46 65 41 58 41 48 V38 Z" fill="url(#shield-grad)" stroke="#FCE6A9" stroke-width="1.2" stroke-linejoin="round" />

  <!-- 8. The Checkmark (Dark Shadow/Base) -->
  <path d="M46 51 L49 55 L55 45" fill="none" stroke="#2D1903" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
  
  <!-- 9. The Checkmark (Gold Face) -->
  <path d="M46 50 L49 54 L55 44" fill="none" stroke="#FCE6A9" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

let html = fs.readFileSync('index.html', 'utf8');

const btnRegex = /<button class="icon-btn shield-btn heavy-gold-medallion"[^>]*>[\s\S]*?<\/button>/;
const newBtn = `<button class="icon-btn shield-btn force-medallion" type="button" aria-label="Registry">\n  ${svgMarkup}\n</button>`;

if (html.match(btnRegex)) {
  html = html.replace(btnRegex, newBtn);
  fs.writeFileSync('index.html', html);
} else {
    // If it didn't find the heavy-gold-medallion, try finding ANY shield-btn
    const fallbackRegex = /<button class="icon-btn shield-btn"[^>]*>[\s\S]*?<\/button>/;
    html = html.replace(fallbackRegex, newBtn);
    fs.writeFileSync('index.html', html);
}

let css = fs.readFileSync('style.css', 'utf8');

const newCSS = `\n/* NEW MEDALLION FORCE OVERRIDE */
.force-medallion {
  width: 44px !important; 
  height: 44px !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  position: absolute;
  inset-inline-end: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
}
.force-medallion::after { display: none !important; }
`;

css += newCSS;
fs.writeFileSync('style.css', css);

const fs = require('fs');
let html = fs.readFileSync('/app/applet/index.html', 'utf8');

const v3Gradient = `
      <!-- THE 1% CLUB - Realistic Metallic Gold Gradient v3 (Physical Metal) -->
      <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="var(--gold-shadow, #3A2A12)" />  <!-- Dark metallic valley -->
        <stop offset="25%" stop-color="var(--gold-primary, #C9A86A)" /> <!-- Rich warm gold body -->
        <stop offset="38%" stop-color="var(--gold-champagne, #F0D59D)" /> <!-- Champagne reflection -->
        <stop offset="42%" stop-color="var(--gold-highlight, #FFF8E7)" /> <!-- Narrow bright specular highlight -->
        <stop offset="65%" stop-color="var(--gold-midtone, #A68442)" /> <!-- Midtone gold body -->
        <stop offset="100%" stop-color="var(--gold-deep, #1A1205)" /> <!-- Darker opposite edge -->
      </linearGradient>
`;

if (html.includes('<linearGradient id="ringGoldGrad"')) {
    html = html.replace(/<linearGradient id="ringGoldGrad"[\s\S]*?<\/linearGradient>/, v3Gradient.trim());
    fs.writeFileSync('/app/applet/index.html', html);
    console.log("SVG linearGradient updated to use CSS variables.");
}

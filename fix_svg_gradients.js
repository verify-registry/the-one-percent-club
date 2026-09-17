const fs = require('fs');
let html = fs.readFileSync('/app/applet/index.html', 'utf8');

// Replace the existing flat/bright gold SVG gradient with a realistic metallic one
const realisticGradient = `
      <!-- THE 1% CLUB - Realistic Metallic Gold Gradient -->
      <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EAE0C4" /> <!-- Highlight -->
        <stop offset="40%" stop-color="#C9A86A" /> <!-- Primary Champagne -->
        <stop offset="80%" stop-color="#8A6D3B" /> <!-- Deep Body -->
        <stop offset="100%" stop-color="#5A4622" /> <!-- Antique Shadow -->
      </linearGradient>
`;

if (html.includes('<linearGradient id="ringGoldGrad"')) {
    html = html.replace(/<linearGradient id="ringGoldGrad"[\s\S]*?<\/linearGradient>/, realisticGradient.trim());
    fs.writeFileSync('/app/applet/index.html', html);
    console.log("SVG linearGradient updated to realistic metal.");
} else {
    console.log("Could not find ringGoldGrad in index.html");
}

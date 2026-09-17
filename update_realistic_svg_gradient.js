const fs = require('fs');
let html = fs.readFileSync('/app/applet/index.html', 'utf8');

const refinedGradient = `
      <!-- THE 1% CLUB - Realistic Metallic Gold Gradient (Polished, Top-Left directional lighting) -->
      <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#705524" />  <!-- Dark top edge / Bevel -->
        <stop offset="15%" stop-color="#FFF1D0" /> <!-- Sharp Specular Highlight -->
        <stop offset="35%" stop-color="#C9A86A" /> <!-- Champagne Midtone -->
        <stop offset="70%" stop-color="#B6924B" /> <!-- Rich Body -->
        <stop offset="100%" stop-color="#2B210D" /> <!-- Dark Shadow Edge -->
      </linearGradient>
`;

if (html.includes('<linearGradient id="ringGoldGrad"')) {
    html = html.replace(/<linearGradient id="ringGoldGrad"[\s\S]*?<\/linearGradient>/, refinedGradient.trim());
    fs.writeFileSync('/app/applet/index.html', html);
    console.log("SVG linearGradient updated to strictly realistic polished metal.");
} else {
    console.log("Could not find ringGoldGrad in index.html");
}

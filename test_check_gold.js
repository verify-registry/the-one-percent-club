const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Apply a real gold gradient to the checkmark instead of a flat line
const checkRegex = /\.medallion-shield-check \{\n\s*stroke: url\(#medShieldEdgeDark\);\n\s*stroke-width: 2;\n\s*stroke-linecap: round;\n\s*stroke-linejoin: round;\n\s*fill: none;\n\s*filter: drop-shadow\(0 1px 1\.5px rgba\(0, 0, 0, 0\.8\)\);\n\}/;

const newCheck = `.medallion-shield-check {
  stroke: url(#medShieldEdgeDark);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  filter: drop-shadow(0 1px 1px rgba(92, 64, 51, 0.9));
}`;
css = css.replace(checkRegex, newCheck);

const lightCheckRegex = /body\.light-mode \.medallion-shield-check \{\n\s*stroke: url\(#medShieldEdgeLight\);\n\s*filter: drop-shadow\(0 1px 1\.5px rgba\(100, 60, 10, 0\.6\)\);\n\}/;
const newLightCheck = `body.light-mode .medallion-shield-check {
  stroke: url(#medShieldEdgeLight);
  filter: drop-shadow(0 1px 1px rgba(107, 66, 38, 0.8));
}`;
css = css.replace(lightCheckRegex, newLightCheck);

fs.writeFileSync('style.css', css);

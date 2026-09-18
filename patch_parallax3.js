const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /const offset = Math\.max\(0, -rect\.top\);/;
const replacement = `
          // Base offset is roughly where it starts (116px), so it parallaxes immediately
          const offset = 116 - rect.top; 
`;

if (code.match(regex)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('app.js', code);
    console.log("Patched Profile Hero parallax logic");
} else {
    console.log("Could not match Profile Hero parallax");
}

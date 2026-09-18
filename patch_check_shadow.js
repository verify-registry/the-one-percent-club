const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css += `
.medallion-shield-check {
  filter: drop-shadow(0 1px 1.5px rgba(0, 0, 0, 0.8));
}

body.light-mode .medallion-shield-check {
  filter: drop-shadow(0 1px 1.5px rgba(100, 60, 10, 0.6));
}
`;

fs.writeFileSync('style.css', css);

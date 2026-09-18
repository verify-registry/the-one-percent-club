const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const regex = /::-webkit-scrollbar \{\n\s*width: 6px;\n\s*height: 6px;\n\}/g;
const replacement = `::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}`;

code = code.replace(regex, replacement);

fs.writeFileSync('style.css', code);
console.log('Scrollbar width updated to 3px');

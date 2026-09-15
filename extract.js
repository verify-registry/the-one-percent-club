const fs = require('fs');

const content = fs.readFileSync('app.js', 'utf-8');
const lines = content.split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'const translations = {') {
    startIndex = i;
  }
  if (startIndex !== -1 && lines[i].trim() === '};' && i > 800) {
    endIndex = i;
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  const dictionaryLines = lines.slice(startIndex + 1, endIndex);
  const dictionaryContent = 'window.I18N = {\n' + dictionaryLines.join('\n') + '\n};\n';
  fs.writeFileSync('translations.js', dictionaryContent);

  // Remove dictionary from app.js
  const newAppJs = lines.slice(0, startIndex).join('\n') + '\n' + lines.slice(endIndex + 1).join('\n');
  fs.writeFileSync('app.js', newAppJs);
  console.log('Extraction successful.');
} else {
  console.log('Could not find boundaries.', startIndex, endIndex);
}

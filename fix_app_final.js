const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// I will clean up the tail manually
code = code.replace(/\\n\s*let btnText = "";[\s\S]*?\}"\)'`;\s*\}/, '');

fs.writeFileSync('app.js', code);

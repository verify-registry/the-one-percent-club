const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(/centerOffset \* 0\.08/g, 'centerOffset * 0.05');
code = code.replace(/centerOffset \* 0\.03/g, 'centerOffset * 0.015');
code = code.replace(/centerOffset \* 0\.06/g, 'centerOffset * 0.04');
code = code.replace(/centerOffset \* 0\.02/g, 'centerOffset * 0.01');

fs.writeFileSync('app.js', code);
console.log("Subtlety adjusted");

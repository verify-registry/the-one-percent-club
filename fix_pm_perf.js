const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

code = code.replace(
  /^\.purchase-modal \{\n  width: 100%;([\s\S]*?)transform-origin: bottom center;\n\}/m,
  `.purchase-modal {\n  width: 100%;$1transform-origin: bottom center;\n  will-change: transform, opacity;\n  backface-visibility: hidden;\n}`
);

fs.writeFileSync('style.css', code);

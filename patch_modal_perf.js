const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

code = code.replace(
  /\.luxury-modal-overlay \{([\s\S]*?)\}/,
  `.luxury-modal-overlay {$1  will-change: opacity, filter;\n}`
);

code = code.replace(
  /\.luxury-modal-box \{([\s\S]*?)\}/,
  `.luxury-modal-box {$1  will-change: transform, opacity;\n  backface-visibility: hidden;\n}`
);

code = code.replace(
  /\.purchase-modal-overlay \{([\s\S]*?)\}/,
  `.purchase-modal-overlay {$1  will-change: opacity, filter;\n}`
);

code = code.replace(
  /\.purchase-modal \{([\s\S]*?)\}/,
  `.purchase-modal {$1  will-change: transform, opacity;\n  backface-visibility: hidden;\n}`
);

fs.writeFileSync('style.css', code);

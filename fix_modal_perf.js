const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// First, revert the wrong light mode addition
code = code.replace(
  /body\.light-mode \.luxury-modal-box \{\n  background: radial-gradient\(ellipse at center, #fdfbf7, #f4f0e6\);\n  border: 1px solid rgba\(156, 109, 35, 0\.3\);\n  will-change: transform, opacity;\n  backface-visibility: hidden;\n\}/g,
  `body.light-mode .luxury-modal-box {
  background: radial-gradient(ellipse at center, #fdfbf7, #f4f0e6);
  border: 1px solid rgba(156, 109, 35, 0.3);
}`
);

// Specifically target the primary declarations by looking at the content
code = code.replace(
  /\.luxury-modal-box \{\n  width: 320px;([\s\S]*?)\}/,
  `.luxury-modal-box {\n  width: 320px;$1  will-change: transform, opacity;\n  backface-visibility: hidden;\n}`
);

fs.writeFileSync('style.css', code);

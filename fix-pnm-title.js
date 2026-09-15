const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

code = code.replace(
  'body.light-mode .pnm-content span {', 
  '/* body.light-mode .pnm-content span { removed */'
);

code = code.replace(
  'color: #666 !important;\n}',
  'color: #666 !important;\n}\nbody.light-mode .pnm-title .menu-title {\n  color: #1a1a1a !important;\n}'
);

fs.writeFileSync('style.css', code);
console.log("Success fix title");

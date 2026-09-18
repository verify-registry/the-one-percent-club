const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const regexToRemove = /@keyframes modalBloomPurchaseLight \{[\s\S]*?body\.light-mode \.purchase-modal-overlay:not\(\[hidden\]\) \.purchase-modal \{\n\s*animation: modalBloomPurchaseLight 0\.6s cubic-bezier\(0\.2, 0\.8, 0\.2, 1\) forwards;\n\}/;

code = code.replace(regexToRemove, "");

fs.writeFileSync('style.css', code);
console.log("Removed unnecessary light-mode purchase modal animation");

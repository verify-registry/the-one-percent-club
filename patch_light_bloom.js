const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const lightBloom = `
@keyframes luxuryBloomOpenLight {
  0% {
    opacity: 0;
    transform: scale(0.95) translateZ(0);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 0 0 rgba(156, 109, 35, 0);
  }
  35% {
    opacity: 1;
    transform: scale(0.985) translateZ(0);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1), 0 0 30px rgba(156, 109, 35, 0.15);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateZ(0);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(156, 109, 35, 0.05);
  }
}

body.light-mode .luxury-modal-overlay.is-open .luxury-modal-box {
  animation: luxuryBloomOpenLight 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes modalBloomPurchaseLight {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(20px) translateZ(0);
    box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05), 0 0 0 rgba(156, 109, 35, 0);
  }
  35% {
    opacity: 1;
    transform: scale(0.985) translateY(5px) translateZ(0);
    box-shadow: 0 -15px 30px rgba(0, 0, 0, 0.1), 0 -20px 30px rgba(156, 109, 35, 0.15);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0) translateZ(0);
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(156, 109, 35, 0.25);
  }
}

body.light-mode .purchase-modal-overlay:not([hidden]) .purchase-modal {
  animation: modalBloomPurchaseLight 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
`;

code += lightBloom;

fs.writeFileSync('style.css', code);
console.log("Patched light mode blooms");

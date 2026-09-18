const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const regex = /\.purchase-modal-overlay \{[\s\S]*?\}\n\.purchase-modal-overlay\[hidden\] \{\n\s*display: none;\n\}\n\.purchase-modal \{[\s\S]*?\n\s*0 0 0 1px rgba\(8, 6, 2, 0\.9\);\n\}/;

const replacement = `.purchase-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 0 env(safe-area-inset-bottom);
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
}
.purchase-modal-overlay[hidden] {
  display: none;
}
.purchase-modal-overlay:not([hidden]) {
  animation: overlayFadeIn 0.4s ease forwards;
}

@keyframes overlayFadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
    background: rgba(0, 0, 0, 0);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(6px);
    background: rgba(0, 0, 0, 0.75);
  }
}

.purchase-modal {
  width: 100%;
  max-width: 520px;
  background: linear-gradient(160deg, #141410, #0d0d0e);
  border: 1px solid var(--hairline-strong);
  border-bottom: none;
  border-radius: 24px 24px 0 0;
  padding: 24px 20px 28px;
  box-shadow:
    0 -8px 40px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(8, 6, 2, 0.9);
  transform-origin: bottom center;
}

.purchase-modal-overlay:not([hidden]) .purchase-modal {
  animation: modalBloomPurchase 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes modalBloomPurchase {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(20px) translateZ(0);
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.8), 0 0 0 rgba(212, 175, 55, 0);
  }
  35% {
    opacity: 1;
    transform: scale(0.985) translateY(5px) translateZ(0);
    box-shadow: 0 -15px 40px rgba(0, 0, 0, 0.9), 0 -20px 40px rgba(212, 175, 55, 0.15);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0) translateZ(0);
    box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(8, 6, 2, 0.9);
  }
}

@media (prefers-reduced-motion: reduce) {
  .purchase-modal-overlay:not([hidden]),
  .purchase-modal-overlay:not([hidden]) .purchase-modal {
    animation: none;
  }
}`;

if (code.match(regex)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('style.css', code);
    console.log("Patched purchase modal");
} else {
    console.log("Could not match purchase modal");
}

const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// 1. We will replace the existing .luxury-modal-overlay and .luxury-modal-box CSS
const luxuryRegex = /\.luxury-modal-overlay \{[\s\S]*?\}\n\.luxury-modal-overlay\.is-open \{[\s\S]*?\}\n\.luxury-modal-box \{[\s\S]*?\}\n\.luxury-modal-overlay\.is-open \.luxury-modal-box \{[\s\S]*?\}/;

const newLuxuryCSS = `.luxury-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease, background 0.4s ease !important;
  transform: translateZ(0);
  will-change: opacity, filter, background;
}
.luxury-modal-overlay.is-open {
  opacity: 1;
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
}
.luxury-modal-box {
  width: 320px;
  background: radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 100%);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 16px;
  
  opacity: 0;
  transform: scale(0.95) translateZ(0);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 0 rgba(212, 175, 55, 0);
  
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, box-shadow 0.3s ease !important;
  will-change: transform, opacity, box-shadow;
}

@keyframes luxuryBloomOpen {
  0% {
    opacity: 0;
    transform: scale(0.95) translateZ(0);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 0 rgba(212, 175, 55, 0);
  }
  35% {
    opacity: 1;
    transform: scale(0.985) translateZ(0);
    /* Subtle atmospheric golden blur only during entry */
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.15);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateZ(0);
    /* Settled state without glow */
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(212, 175, 55, 0.05);
  }
}

.luxury-modal-overlay.is-open .luxury-modal-box {
  opacity: 1;
  transform: scale(1) translateZ(0);
  animation: luxuryBloomOpen 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .luxury-modal-overlay.is-open .luxury-modal-box {
    animation: none;
    transition: opacity 0.3s ease !important;
    transform: scale(1) translateZ(0);
  }
}`;

code = code.replace(luxuryRegex, newLuxuryCSS);

fs.writeFileSync('style.css', code);
console.log("Patched luxury modal");

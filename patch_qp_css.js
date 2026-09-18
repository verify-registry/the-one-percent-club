const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const css = `
/* ==========================================================================
   QUICK PURCHASE MICRO-ANIMATION
   ========================================================================== */

.qp-success-btn {
  color: var(--gold-polished) !important;
  border-color: rgba(212, 175, 55, 0.4) !important;
  background: rgba(212, 175, 55, 0.05) !important;
  animation: qpBtnFade 0.3s ease forwards;
}

body.light-mode .qp-success-btn {
  color: var(--gold-deep) !important;
  border-color: rgba(156, 109, 35, 0.3) !important;
  background: rgba(156, 109, 35, 0.05) !important;
}

@keyframes qpBtnFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.boutique-card.qp-shimmer-active {
  position: relative;
  overflow: hidden;
}

.boutique-card.qp-shimmer-active::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(212, 175, 55, 0.05) 30%,
    rgba(255, 235, 160, 0.2) 50%,
    rgba(212, 175, 55, 0.05) 70%,
    transparent 100%
  );
  transform: skewX(-20deg);
  animation: qpMetallicSweep 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  pointer-events: none;
  z-index: 5;
}

body.light-mode .boutique-card.qp-shimmer-active::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(156, 109, 35, 0.03) 30%,
    rgba(212, 175, 55, 0.1) 50%,
    rgba(156, 109, 35, 0.03) 70%,
    transparent 100%
  );
}

@keyframes qpMetallicSweep {
  0% { left: -150%; }
  100% { left: 200%; }
}

@media (prefers-reduced-motion: reduce) {
  .boutique-card.qp-shimmer-active::after {
    animation: none;
    display: none;
  }
  .qp-success-btn {
    animation: none;
  }
}
`;

code += css;
fs.writeFileSync('style.css', code);

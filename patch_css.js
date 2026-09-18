const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const medallionCss = `
/* ==========================================================================
   LUXURY VERIFICATION MEDALLION (Header)
   ========================================================================== */
.luxury-medallion-btn {
  width: 32px !important;
  height: 32px !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  border-radius: 50%;
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.6),
    0 1px 3px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset-inline-end: 18px;
  overflow: visible !important;
  transform-style: preserve-3d;
  color: unset !important;
}

.luxury-medallion-btn::after {
  display: none !important;
}

.medallion-rim {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #FFF8E7 0%, 
    #D8AE5E 25%, 
    #8F6826 50%, 
    #FDF8ED 75%, 
    #3A2408 100%
  );
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 -1px 2px rgba(58, 36, 8, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.medallion-core {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #2a2a2c 0%, #0d0d0e 50%, #000000 100%);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.9),
    0 1px 1px rgba(255, 255, 255, 0.5);
  border: 0.5px solid rgba(212, 175, 55, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.medallion-symbol {
  width: 15px;
  height: 15px;
  filter: drop-shadow(0 1.5px 1.5px rgba(0, 0, 0, 0.85));
}

.medallion-shield-base {
  fill: url(#medShieldDark);
  stroke: url(#medShieldEdgeDark);
  stroke-width: 0.8;
  stroke-linejoin: round;
}

.medallion-shield-check {
  stroke: #FFF8E7;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

body.light-mode .luxury-medallion-btn {
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.15),
    0 1px 3px rgba(156, 109, 35, 0.2);
}

body.light-mode .medallion-rim {
  background: linear-gradient(
    135deg,
    #FFFFFF 0%, 
    #E6C27A 25%, 
    #A67C33 50%, 
    #FDF8ED 75%, 
    #73501A 100%
  );
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 1),
    inset 0 -1px 2px rgba(156, 109, 35, 0.6);
}

body.light-mode .medallion-core {
  background: radial-gradient(circle at 35% 35%, #FFFDF8 0%, #F4EAD3 60%, #E6C27A 100%);
  box-shadow: 
    inset 0 2px 3px rgba(156, 109, 35, 0.35),
    0 1px 1px rgba(255, 255, 255, 1);
  border: 0.5px solid rgba(156, 109, 35, 0.4);
}

body.light-mode .medallion-shield-base {
  fill: url(#medShieldLight);
  stroke: url(#medShieldEdgeLight);
}

body.light-mode .medallion-shield-check {
  stroke: #FFFFFF;
}
`;

css += "\\n" + medallionCss;
fs.writeFileSync('style.css', css);

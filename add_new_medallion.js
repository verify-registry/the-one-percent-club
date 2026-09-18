const fs = require('fs');

const newCSS = `/* ==========================================================================
   LUXURY VERIFICATION MEDALLION (Header)
   ========================================================================== */
.luxury-medallion-btn {
  width: 32px !important;
  height: 32px !important;
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset-inline-end: 18px;
  overflow: visible !important;
  transform-style: preserve-3d;
}

.luxury-medallion-btn::after { display: none !important; }

.medallion-rim {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 115deg,
    #4A3110 0%, 
    #FDF2D0 15%, 
    #9E7422 30%, 
    #241604 50%, 
    #9E7422 65%, 
    #FDF2D0 80%, 
    #4A3110 100%
  );
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.8),
    inset 0 -1px 1px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.medallion-core {
  position: absolute;
  inset: 2.5px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FDF2D0 0%, #D4AF37 30%, #9E7422 70%, #241604 100%);
  box-shadow: 
    inset 0 2px 3px rgba(253, 242, 208, 0.9),
    inset 0 -2px 4px rgba(36, 22, 4, 0.9),
    0 2px 4px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.medallion-symbol {
  width: 15px;
  height: 15px;
  filter: drop-shadow(0 2px 2px rgba(36, 22, 4, 0.9)) drop-shadow(0 -1px 1px rgba(253, 242, 208, 0.5));
}

.medallion-shield-base {
  fill: url(#medGoldDomed);
  stroke: url(#medGoldEdge);
  stroke-width: 0.8;
  stroke-linejoin: round;
}

.medallion-shield-check {
  stroke: #241604;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  filter: drop-shadow(0 1px 0px rgba(253, 242, 208, 0.7));
}

body.light-mode .luxury-medallion-btn {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(156, 109, 35, 0.2);
}

body.light-mode .medallion-rim {
  background: conic-gradient(
    from 115deg,
    #9E7422 0%, 
    #FFFFFF 15%, 
    #D4AF37 30%, 
    #4A3110 50%, 
    #D4AF37 65%, 
    #FFFFFF 80%, 
    #9E7422 100%
  );
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 1),
    inset 0 -1px 1px rgba(156, 109, 35, 0.8);
}

body.light-mode .medallion-core {
  background: radial-gradient(circle at 35% 35%, #FFFFFF 0%, #E3C588 30%, #A87B32 70%, #4A3110 100%);
  box-shadow: 
    inset 0 2px 3px rgba(255, 255, 255, 1),
    inset 0 -2px 4px rgba(74, 49, 16, 0.8),
    0 2px 4px rgba(0, 0, 0, 0.3);
}

body.light-mode .medallion-symbol {
  filter: drop-shadow(0 2px 2px rgba(74, 49, 16, 0.6)) drop-shadow(0 -1px 1px rgba(255, 255, 255, 0.9));
}

body.light-mode .medallion-shield-check {
  stroke: #311F0A;
  filter: drop-shadow(0 1px 0px rgba(255, 255, 255, 0.8));
}
`;

let css = fs.readFileSync('style.css', 'utf8');
css += '\n' + newCSS;
fs.writeFileSync('style.css', css);


const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Replace Dark Mode Core
const coreRegex = /\.medallion-core \{\n  position: absolute;\n  inset: 2\.5px;\n  border-radius: 50%;\n  background: radial-gradient\(circle at 35% 35%, #2a2a2c 0%, #151516 40%, #000000 100%\);\n  box-shadow: \n    inset 0 3px 5px rgba\(0, 0, 0, 0\.95\),\n    0 1px 1px rgba\(255, 255, 255, 0\.6\);\n  border: 0\.5px solid rgba\(42, 24, 5, 0\.8\);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2;\n\}/;

const newCore = `.medallion-core {
  position: absolute;
  inset: 2.5px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FDF8ED 0%, #D4AF37 40%, #8F6826 80%, #5A4012 100%);
  box-shadow: 
    inset 0 2px 4px rgba(90, 64, 18, 0.9),
    inset 0 -2px 4px rgba(253, 248, 237, 0.8),
    0 2px 3px rgba(0, 0, 0, 0.95);
  border: 0.5px solid rgba(253, 248, 237, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}`;

css = css.replace(coreRegex, newCore);

// Replace Light Mode Core
const lightCoreRegex = /body\.light-mode \.medallion-core \{\n  background: radial-gradient\(circle at 35% 35%, #2a2a2c 0%, #151516 40%, #000000 100%\);\n  box-shadow: \n    inset 0 3px 5px rgba\(0, 0, 0, 0\.95\),\n    0 1px 1px rgba\(255, 255, 255, 0\.8\);\n  border: 0\.5px solid rgba\(74, 48, 16, 0\.8\);\n\}/;

const newLightCore = `body.light-mode .medallion-core {
  background: radial-gradient(circle at 35% 35%, #FFFFFF 0%, #E6C27A 40%, #A67C33 80%, #73501A 100%);
  box-shadow: 
    inset 0 2px 4px rgba(115, 80, 26, 0.8),
    inset 0 -2px 4px rgba(255, 255, 255, 0.9),
    0 2px 3px rgba(0, 0, 0, 0.3);
  border: 0.5px solid rgba(255, 255, 255, 0.6);
}`;

css = css.replace(lightCoreRegex, newLightCore);

fs.writeFileSync('style.css', css);

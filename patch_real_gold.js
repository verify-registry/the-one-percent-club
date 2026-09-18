const fs = require('fs');

// --- 1. INDEX.HTML (SVG DEFS FOR THE SHIELD) ---
let html = fs.readFileSync('index.html', 'utf8');

// Replace the Dark Mode SVG Defs
const oldDefsRegex = /<linearGradient id="medShieldDark"[\s\S]*?<\/defs>/;
const newDefs = `<linearGradient id="medShieldDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <!-- Rich Warm Gold -->
                    <stop offset="0%" stop-color="#FFD700" />
                    <stop offset="20%" stop-color="#DAA520" />
                    <stop offset="45%" stop-color="#B8860B" />
                    <stop offset="50%" stop-color="#8B6508" />
                    <stop offset="55%" stop-color="#DAA520" />
                    <stop offset="80%" stop-color="#FFD700" />
                    <stop offset="100%" stop-color="#8B6508" />
                  </linearGradient>
                  <linearGradient id="medShieldEdgeDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFF8DC" />
                    <stop offset="30%" stop-color="#B8860B" />
                    <stop offset="50%" stop-color="#FFD700" />
                    <stop offset="80%" stop-color="#B8860B" />
                    <stop offset="100%" stop-color="#5C4033" />
                  </linearGradient>
                  <!-- Light Mode Gradients -->
                  <linearGradient id="medShieldLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFDF00" />
                    <stop offset="25%" stop-color="#D4AF37" />
                    <stop offset="45%" stop-color="#996515" />
                    <stop offset="50%" stop-color="#6B4226" />
                    <stop offset="55%" stop-color="#C5832B" />
                    <stop offset="80%" stop-color="#FFDF00" />
                    <stop offset="100%" stop-color="#8B5A2B" />
                  </linearGradient>
                  <linearGradient id="medShieldEdgeLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="30%" stop-color="#996515" />
                    <stop offset="50%" stop-color="#FFDF00" />
                    <stop offset="80%" stop-color="#996515" />
                    <stop offset="100%" stop-color="#4A2511" />
                  </linearGradient>
                </defs>`;

html = html.replace(oldDefsRegex, newDefs);
fs.writeFileSync('index.html', html);


// --- 2. STYLE.CSS (THE MEDALLION BASE & CORE) ---
let css = fs.readFileSync('style.css', 'utf8');

// Replace Dark Mode Rim
const rimRegex = /\.medallion-rim \{[\s\S]*?z-index: 1;\n\}/;
const newRim = `.medallion-rim {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #B8860B 0%, 
    #FFD700 20%, 
    #DAA520 40%, 
    #5C4033 50%, 
    #DAA520 60%, 
    #FFD700 80%, 
    #8B6508 100%
  );
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 -1.5px 2px rgba(92, 64, 51, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}`;
css = css.replace(rimRegex, newRim);

// Replace Dark Mode Core
const coreRegex = /\.medallion-core \{[\s\S]*?z-index: 2;\n\}/;
const newCore = `.medallion-core {
  position: absolute;
  inset: 2.5px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #FFD700 0%, #DAA520 45%, #8B6508 80%, #5C4033 100%);
  box-shadow: 
    inset 0 2px 4px rgba(92, 64, 51, 0.9),
    inset 0 -2px 3px rgba(255, 215, 0, 0.6),
    0 1.5px 3px rgba(0, 0, 0, 0.9);
  border: 0.5px solid rgba(255, 215, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}`;
css = css.replace(coreRegex, newCore);

// Replace Light Mode Rim
const lightRimRegex = /body\.light-mode \.medallion-rim \{[\s\S]*?rgba\(115, 80, 26, 0\.6\);\n\}/;
const newLightRim = `body.light-mode .medallion-rim {
  background: linear-gradient(
    135deg,
    #996515 0%, 
    #FFDF00 20%, 
    #D4AF37 40%, 
    #6B4226 50%, 
    #C5832B 60%, 
    #FFDF00 80%, 
    #8B5A2B 100%
  );
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 1),
    inset 0 -1.5px 2px rgba(107, 66, 38, 0.8);
}`;
css = css.replace(lightRimRegex, newLightRim);

// Replace Light Mode Core
const lightCoreRegex = /body\.light-mode \.medallion-core \{[\s\S]*?border: 0\.5px solid rgba\(255, 255, 255, 0\.6\);\n\}/;
const newLightCore = `body.light-mode .medallion-core {
  background: radial-gradient(circle at 30% 30%, #FFDF00 0%, #D4AF37 45%, #996515 80%, #6B4226 100%);
  box-shadow: 
    inset 0 2px 4px rgba(107, 66, 38, 0.8),
    inset 0 -2px 3px rgba(255, 223, 0, 0.7),
    0 1.5px 3px rgba(0, 0, 0, 0.4);
  border: 0.5px solid rgba(255, 255, 255, 0.4);
}`;
css = css.replace(lightCoreRegex, newLightCore);

fs.writeFileSync('style.css', css);

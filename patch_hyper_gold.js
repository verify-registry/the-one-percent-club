const fs = require('fs');

// --- 1. PATCH INDEX.HTML (SVG DEFS) ---
let html = fs.readFileSync('index.html', 'utf8');

const oldDefs = /<defs>\s*<linearGradient id="medShieldDark"[\s\S]*?<\/defs>/;
const newDefs = `<defs>
                  <linearGradient id="medShieldDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFF8E7" />
                    <stop offset="25%" stop-color="#D4AF37" />
                    <stop offset="48%" stop-color="#8F6826" />
                    <stop offset="50%" stop-color="#2A1805" />
                    <stop offset="55%" stop-color="#A67C33" />
                    <stop offset="75%" stop-color="#FDF8ED" />
                    <stop offset="100%" stop-color="#5A4012" />
                  </linearGradient>
                  <linearGradient id="medShieldEdgeDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3A2408" />
                    <stop offset="20%" stop-color="#D8AE5E" />
                    <stop offset="50%" stop-color="#FFF8E7" />
                    <stop offset="80%" stop-color="#D8AE5E" />
                    <stop offset="100%" stop-color="#3A2408" />
                  </linearGradient>
                  <linearGradient id="medShieldLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="25%" stop-color="#E6C27A" />
                    <stop offset="48%" stop-color="#A67C33" />
                    <stop offset="50%" stop-color="#4A3010" />
                    <stop offset="55%" stop-color="#C79A3E" />
                    <stop offset="75%" stop-color="#FFFFFF" />
                    <stop offset="100%" stop-color="#73501A" />
                  </linearGradient>
                  <linearGradient id="medShieldEdgeLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#5A4012" />
                    <stop offset="20%" stop-color="#E6C27A" />
                    <stop offset="50%" stop-color="#FFFFFF" />
                    <stop offset="80%" stop-color="#E6C27A" />
                    <stop offset="100%" stop-color="#5A4012" />
                  </linearGradient>
                </defs>`;

html = html.replace(oldDefs, newDefs);
fs.writeFileSync('index.html', html);


// --- 2. PATCH STYLE.CSS ---
let css = fs.readFileSync('style.css', 'utf8');

// We will replace the .medallion-rim and .medallion-core and body.light-mode versions
const rimRegex = /\.medallion-rim \{[\s\S]*?z-index: 1;\n\}/;
const coreRegex = /\.medallion-core \{[\s\S]*?z-index: 2;\n\}/;
const lightRimRegex = /body\.light-mode \.medallion-rim \{[\s\S]*?rgba\(156, 109, 35, 0\.6\);\n\}/;
const lightCoreRegex = /body\.light-mode \.medallion-core \{[\s\S]*?rgba\(156, 109, 35, 0\.4\);\n\}/;

const newRim = `.medallion-rim {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #8F6826 0%, 
    #FDF8ED 22%, 
    #D4AF37 45%, 
    #2A1805 50%, 
    #A67C33 55%, 
    #FDF8ED 78%, 
    #5A4012 100%
  );
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 -1px 2px rgba(42, 24, 5, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}`;

const newCore = `.medallion-core {
  position: absolute;
  inset: 2.5px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #2a2a2c 0%, #151516 40%, #000000 100%);
  box-shadow: 
    inset 0 3px 5px rgba(0, 0, 0, 0.95),
    0 1px 1px rgba(255, 255, 255, 0.6);
  border: 0.5px solid rgba(42, 24, 5, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}`;

const newLightRim = `body.light-mode .medallion-rim {
  background: linear-gradient(
    135deg,
    #A67C33 0%, 
    #FFFFFF 22%, 
    #E6C27A 45%, 
    #4A3010 50%, 
    #C79A3E 55%, 
    #FFFFFF 78%, 
    #73501A 100%
  );
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 1),
    inset 0 -1px 2px rgba(115, 80, 26, 0.6);
}`;

const newLightCore = `body.light-mode .medallion-core {
  background: radial-gradient(circle at 35% 35%, #2a2a2c 0%, #151516 40%, #000000 100%);
  box-shadow: 
    inset 0 3px 5px rgba(0, 0, 0, 0.95),
    0 1px 1px rgba(255, 255, 255, 0.8);
  border: 0.5px solid rgba(74, 48, 16, 0.8);
}`;

css = css.replace(rimRegex, newRim);
css = css.replace(coreRegex, newCore);
css = css.replace(lightRimRegex, newLightRim);
css = css.replace(lightCoreRegex, newLightCore);

fs.writeFileSync('style.css', css);

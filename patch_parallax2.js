const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /const info = card\.querySelector\('\.boutique-card-info'\);\n\s+if \(icon\) \{\n\s+const yIcon = centerOffset \* 0\.08;\s+icon\.style\.transform = `translate3d\(0, \$\{yIcon\}px, 0\)`;\n\s+icon\.style\.transition = 'none'; \/\/ Perfect sync with scroll\n\s+\}\n\s+if \(info\) \{\n\s+const yInfo = centerOffset \* 0\.03;\n\s+info\.style\.transform = `translate3d\(0, \$\{yInfo\}px, 0\)`;\n\s+info\.style\.transition = 'none';\n\s+\}/g;

const replacement = `
        const icon = card.querySelector('.boutique-card-icon');
        const text1 = card.querySelector('.boutique-card-name');
        const text2 = card.querySelector('.boutique-card-price');
        const btn = card.querySelector('.boutique-own-btn');
        const progress = card.querySelector('.purchase-progress-wrap');
        
        if (icon) {
          icon.style.transform = \`translate3d(0, \${centerOffset * 0.08}px, 0)\`;
          icon.style.transition = 'none'; 
        }
        
        [text1, text2, btn, progress].forEach(el => {
          if (el) {
            el.style.transform = \`translate3d(0, \${centerOffset * 0.03}px, 0)\`;
            el.style.transition = 'none';
          }
        });`;

code = code.replace(/const info = card\.querySelector\('\.boutique-card-info'\);[\s\S]*?info\.style\.transition = 'none';\n        }/, replacement);

fs.writeFileSync('app.js', code);
console.log("Patched Boutique parallax");

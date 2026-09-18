const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const regexSymbol = /\.medallion-symbol \{\n  width: 15px;\n  height: 15px;\n  filter: drop-shadow\(0 1\.5px 1\.5px rgba\(0, 0, 0, 0\.85\)\);\n\}/;
const newSymbol = `.medallion-symbol {
  width: 15px;
  height: 15px;
  filter: drop-shadow(0 1.5px 2px rgba(42, 24, 5, 0.9)) drop-shadow(0 -0.5px 0.5px rgba(255, 255, 255, 0.6));
}`;
css = css.replace(regexSymbol, newSymbol);

const regexLightSymbol = /body\.light-mode \.medallion-symbol \{\n  filter: drop-shadow\(0 1\.5px 1\.5px rgba\(156, 109, 35, 0\.5\)\);\n\}/;
const newLightSymbol = `body.light-mode .medallion-symbol {
  filter: drop-shadow(0 1.5px 2px rgba(74, 48, 16, 0.6)) drop-shadow(0 -0.5px 0.5px rgba(255, 255, 255, 0.9));
}`;
css = css.replace(regexLightSymbol, newLightSymbol);

fs.writeFileSync('style.css', css);

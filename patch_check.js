const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  /<path d="M9\.5 11L11\.5 13L15 9" class="medallion-shield-check" \/>/,
  '<path d="M9.5 11L11.5 13L15 9" class="medallion-shield-check" stroke="url(#medShieldEdgeDark)" />'
);

fs.writeFileSync('index.html', html);

let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(
  /\.medallion-shield-check \{\n\s*stroke: #FFF8E7;/g,
  '.medallion-shield-check {\n  stroke: url(#medShieldEdgeDark);'
);

css = css.replace(
  /body\.light-mode \.medallion-shield-check \{\n\s*stroke: #FFFFFF;/g,
  'body.light-mode .medallion-shield-check {\n  stroke: url(#medShieldEdgeLight);'
);

fs.writeFileSync('style.css', css);

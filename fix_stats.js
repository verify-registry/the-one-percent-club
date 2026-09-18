const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(/container\.dataset\.skeletonShown = "";\n\n\s*const container = document\.getElementById\("profileStatsBar"\);\n\s*if \(\!container\) return;/g, 'container.dataset.skeletonShown = "";');

fs.writeFileSync('app.js', code);

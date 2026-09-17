const fs = require('fs');
const js = fs.readFileSync('/app/applet/app.js', 'utf8');

// Find all occurrences of renderRing
let matches = [...js.matchAll(/renderRing/gi)];
for (let match of matches) {
    let start = Math.max(0, match.index - 100);
    let end = Math.min(js.length, match.index + 200);
    console.log(`\n--- Match at ${match.index} ---`);
    console.log(js.substring(start, end));
}

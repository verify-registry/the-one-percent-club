const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const regex = /\.page\.is-active \{\n  animation: luxuryFadeSlide 0\.5s cubic-bezier\(0\.16, 1, 0\.3, 1\) forwards !important;\n  will-change: transform, opacity;\n\}/;

if (code.match(regex)) {
    code = code.replace(regex, `/* .page.is-active animation removed in favor of bi-directional transitions */`);
    fs.writeFileSync('style.css', code);
    console.log("Patched animation override");
} else {
    console.log("Could not find animation override");
}

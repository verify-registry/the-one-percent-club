const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const regexPage = /\.page \{([\s\S]*?)transition: opacity 0\.35s cubic-bezier\(0\.2, 0\.8, 0\.2, 1\),\n              transform 0\.35s cubic-bezier\(0\.2, 0\.8, 0\.2, 1\),\n              visibility 0\.35s;([\s\S]*?)\}/;

const regexActive = /\.page\.is-active \{([\s\S]*?)transition: opacity 0\.45s cubic-bezier\(0\.2, 0\.8, 0\.2, 1\) 0\.05s,\n              transform 0\.45s cubic-bezier\(0\.2, 0\.8, 0\.2, 1\) 0\.05s,\n              visibility 0s;([\s\S]*?)\}/;

if (code.match(regexPage) && code.match(regexActive)) {
    code = code.replace(regexPage, `.page {$1transition: opacity 0.15s ease,\n              transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),\n              visibility 0.4s;$2}`);
    code = code.replace(regexActive, `.page.is-active {$1transition: opacity 0.35s ease 0.1s,\n              transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) 0.05s,\n              visibility 0s;$2}`);
    fs.writeFileSync('style.css', code);
    console.log("Patched page transitions for zero-ghosting");
} else {
    console.log("Could not match transition regex");
}

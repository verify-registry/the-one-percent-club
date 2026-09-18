const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex2 = /document\.querySelectorAll\("\.page"\)\.forEach\(\(p\) => \{\n      p\.classList\.remove\("is-active"\);\n      p\.hidden = true;\n    \}\);\n\n    const activePage = document\.getElementById\(pageId\);\n    if \(activePage\) \{\n      activePage\.classList\.add\("is-active"\);\n      activePage\.hidden = false;\n    \}/;

const replacement2 = `document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("is-active");
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
      activePage.classList.add("is-active");
    }`;

if (code.match(regex2)) {
    code = code.replace(regex2, replacement2);
    fs.writeFileSync('app.js', code);
    console.log("Patched hidden property from navigateContext");
} else {
    console.log("Could not find hidden logic in navigateContext");
}

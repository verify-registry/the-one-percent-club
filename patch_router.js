const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /document\.querySelectorAll\("\.page"\)\.forEach\(\(p\) => \{\n      p\.classList\.remove\("is-active"\);\n      p\.hidden = true;\n    \}\);\n\n    const activePage = document\.getElementById\(`\$\{tab\}-tab`\);\n    if \(activePage\) \{\n      activePage\.classList\.add\("is-active"\);\n      activePage\.hidden = false;\n    \}/;

const replacement = `document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("is-active");
    });

    const activePage = document.getElementById(\`\${tab}-tab\`);
    if (activePage) {
      activePage.classList.add("is-active");
    }`;

if (code.match(regex)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('app.js', code);
    console.log("Patched hidden property from Router");
} else {
    console.log("Could not find hidden logic");
}

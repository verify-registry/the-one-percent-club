const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /let btnText = "";\n\s*let btnClass = "";\n\s*let btnOnClick = "";\n\s*let btnPointerEvents = "pointer-events: none;";\n\s*let extraCardClass = "";\n\s*if \(item\.free\) \{\n\s*btnText = window\.t\("boutique\.ownedCheck"\);\n\s*btnClass = "btn-free";\n\s*\} else if \(false\) \{\n\s*let btnClass = "";\n\s*let btnOnClick = "";\n\s*let btnPointerEvents = "pointer-events: none;";\n\s*let extraCardClass = "";/m;

const replacement = `let btnText = "";
          let btnClass = "";
          let btnOnClick = "";
          let btnPointerEvents = "pointer-events: none;";
          let extraCardClass = "";
          
          if (item.free) {
            btnText = window.t("boutique.ownedCheck");
            btnClass = "btn-free";
          }`;

code = code.replace(regex, replacement);
fs.writeFileSync('app.js', code);

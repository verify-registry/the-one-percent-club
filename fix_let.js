const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(
  /let btnText, btnClass;\n\s*if \(item\.free\) \{\n\s*btnText = window\.t\("boutique\.ownedCheck"\);\n\s*btnClass = "btn-free";\n\s*\} else let btnText = "";/g,
  `let btnText = "";
          let btnClass = "";
          let btnOnClick = "";
          let btnPointerEvents = "pointer-events: none;";
          let extraCardClass = "";
          
          if (item.free) {
            btnText = window.t("boutique.ownedCheck");
            btnClass = "btn-free";
          } else if (false) {` // Just a dummy condition to match the \`} else if (isEquipped) {\` that follows.
);

fs.writeFileSync('app.js', code);

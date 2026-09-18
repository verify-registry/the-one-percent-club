const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

code = code.replace(
  /if \(item\.free\) \{\n\s*btnText = window\.t\("boutique\.ownedCheck"\);\n\s*btnClass = "btn-free";\n\s*\}\n\s*if \(isEquipped\) \{/m,
  `if (item.free) {
            btnText = window.t("boutique.ownedCheck");
            btnClass = "btn-free";
          } else if (isEquipped) {`
);

fs.writeFileSync('app.js', code);

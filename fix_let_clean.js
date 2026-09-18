const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// I will find the whole block from `let btnText, btnClass;` or `let btnText = "";` down to the end of the `else` block
// The best way is to match by exact string.

const regex = /let btnText = "";\n\s*let btnClass = "";\n\s*let btnOnClick = "";\n\s*let btnPointerEvents = "pointer-events: none;";\n\s*let extraCardClass = "";\n\s*if \(item\.free\) \{\n\s*btnText = window\.t\("boutique\.ownedCheck"\);\n\s*btnClass = "btn-free";\n\s*\} else if \(false\) \{\n\s*let btnClass = "";\n\s*let btnOnClick = "";\n\s*let btnPointerEvents = "pointer-events: none;";\n\s*let extraCardClass = "";/;

// Actually, let's just replace the lines manually since it's easier to grep and replace exact blocks.

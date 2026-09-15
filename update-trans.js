const fs = require('fs');
let code = fs.readFileSync('translations.js', 'utf8');

const target = `    quoteLabel: {
      en: "PROFILE QUOTE",
      ar: "النبذة",
    },`;

const replacement = `    quoteLabel: {
      en: "PROFILE QUOTE",
      ar: "النبذة",
    },
    quoteText: {
      en: "Discipline. Network. Freedom.",
      ar: "الانضباط. النفوذ. الحرية.",
    },`;

if (code.includes(target)) {
  fs.writeFileSync('translations.js', code.replace(target, replacement));
  console.log("Success");
} else {
  console.log("Failed to find target");
}

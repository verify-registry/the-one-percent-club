const fs = require('fs');
const css = `
/* Ensure portrait photo doesn't look like gold ring if empty */
body.light-mode #membership-tab .portrait-photo {
  background: radial-gradient(circle at 35% 25%, #F4F0E6 0%, #E8E2D5 45%, #D8D0BE 100%) !important;
}
`;
fs.appendFileSync('/app/applet/style.css', '\n' + css + '\n');
console.log("Portrait fix appended.");

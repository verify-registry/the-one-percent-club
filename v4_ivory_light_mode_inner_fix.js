const fs = require('fs');

const css = `
/* Fix inner frame covering the V4 ivory background */
body.light-mode #membership-tab .membership-card .card-inner-frame {
  background: transparent !important;
  box-shadow: none !important;
  border: 1px solid rgba(156, 109, 35, 0.15) !important; /* Extremely subtle inner border */
}

/* Also neutralize .portrait-photo background in light mode if it's too white */
body.light-mode #membership-tab .portrait-photo {
  background: transparent !important;
  box-shadow: inset 0 6px 12px rgba(0, 0, 0, 0.05), inset 0 -3px 8px rgba(255, 255, 255, 0.5), 0 0 25px rgba(156, 109, 35, 0.15) !important;
}
`;

fs.appendFileSync('/app/applet/style.css', '\n' + css + '\n');
console.log("V4 Imperial Ivory Inner Frame Fix appended.");

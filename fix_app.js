const fs = require('fs');
let js = fs.readFileSync('/app/applet/app.js', 'utf8');

const renderRingFn = `
function renderRing(ringId, valueId, percent) {
  const ring = document.getElementById(ringId);
  const valEl = document.getElementById(valueId);
  if (!ring || !valEl) return;
  const radius = ring.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  ring.style.strokeDasharray = \`\${circumference} \${circumference}\`;
  const offset = circumference - (percent / 100) * circumference;
  ring.style.strokeDashoffset = circumference;
  
  // Set value immediately
  valEl.textContent = parseFloat(percent).toFixed(1) + "%";
  
  // Animate with a tiny delay to ensure transition triggers
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = offset;
    });
  });
}
`;

if (!js.includes('function renderRing')) {
    js = renderRingFn + '\n' + js;
    fs.writeFileSync('/app/applet/app.js', js);
    console.log("Added renderRing function to app.js");
} else {
    console.log("renderRing already exists");
}

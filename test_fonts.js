const fs = require('fs');
const css = fs.readFileSync('/app/applet/style.css', 'utf8');

// The rules were already appended in the previous step. We are verifying they exist and match the user request.
if (css.includes("PHASE MEMBERSHIP — TYPOGRAPHY MICRO-PASS ONLY") && 
    css.includes("font-family: 'Cormorant Garamond'") && 
    css.includes("font-family: 'Inter', sans-serif")) {
    console.log("SUCCESS: The precise editorial typography rules (Cormorant Garamond & Inter) for #membership-tab are already active and applied correctly in style.css.");
} else {
    console.log("ERROR: Typography rules missing.");
}

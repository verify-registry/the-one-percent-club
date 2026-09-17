const fs = require('fs');
const css = fs.readFileSync('/app/applet/style.css', 'utf8');

if (css.includes('--gold-primary') && 
    css.includes('--gold-highlight') && 
    css.includes('--gold-antique') && 
    css.includes('--gold-deep')) {
    console.log("SUCCESS: Centralized gold material CSS variables are already defined in :root.");
} else {
    console.log("ERROR: Variables missing.");
}

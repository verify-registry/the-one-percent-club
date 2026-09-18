const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// The issue happens because #page-card.is-active has overflow: hidden (line 995-1001)
// And also .membership-card has a pseudo element edge glow which forces overflow: hidden on the card itself.

css = css.replace(/#page-card\.is-active \{\n  overflow: hidden;\n  display: flex;/g, '#page-card.is-active {\n  overflow: visible;\n  display: flex;');

// The Dynamic Edge glow wrapper sets overflow hidden on the card.
// We should remove this overflow: hidden
css = css.replace(/body #membership-tab #membershipCard\.membership-card \{\n  position: relative;\n  overflow: hidden; \/\* Keep the edge glow contained within the border radius \*\/\n\}/g, 
`body #membership-tab #membershipCard.membership-card {
  position: relative;
  /* overflow: hidden removed to stop 3D clipping during tilt */
}`);

// Also fix the main membershipCard scoped rules
css = css.replace(/#membershipCard \{\n  position: relative !important;\n  overflow: hidden !important;/g,
`#membershipCard {
  position: relative !important;
  overflow: visible !important;`);

fs.writeFileSync('style.css', css);

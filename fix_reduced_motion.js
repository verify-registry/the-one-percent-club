const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const regex = /@keyframes skeletonFadeIn \{\n\s*from \{ opacity: 0; \}\n\s*to \{ opacity: 1; \}\n\}/;
const replacement = `@keyframes skeletonFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-fade-in {
    animation: none;
    opacity: 1;
  }
}`;

if(code.match(regex)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('style.css', code);
  console.log('Fixed reduced motion');
}

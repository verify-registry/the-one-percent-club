const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const oldLoop = `let html = '';
    for(let i=0; i<4; i++) {
      html += \`
        <div class="psb-col profile-stats-skeleton">
          <div class="skeleton-shimmer-el skeleton-icon-tiny"></div>
          <div class="skeleton-shimmer-el skeleton-name"></div>
          <div class="skeleton-shimmer-el skeleton-badge"></div>
        </div>
      \`;
    }`;
    
const newLoop = `let html = '';
    for(let i=0; i<4; i++) {
      html += \`
        <div class="psb-col profile-stats-skeleton">
          <div class="skeleton-shimmer-el skeleton-icon-tiny"></div>
          <div class="skeleton-shimmer-el skeleton-name"></div>
          <div class="skeleton-shimmer-el skeleton-badge"></div>
        </div>
      \`;
      if (i < 3) html += '<div class="psb-divider"></div>';
    }`;

code = code.replace(oldLoop, newLoop);
fs.writeFileSync('app.js', code);

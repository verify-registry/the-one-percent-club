const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const parallaxCss = `
/* 3D Parallax Effect for Membership Card */
.membership-card {
  transform-style: preserve-3d;
}

.card-inner-frame {
  transform-style: preserve-3d;
  /* Push inner frame slightly forward to clear background shadows */
  transform: translateZ(5px);
}

.corner {
  transform: translateZ(10px);
}

.card-top-bar {
  transform: translateZ(15px);
}

.portrait-wrap {
  transform: translateZ(30px);
}

.card-identity-section {
  transform: translateZ(25px);
}

.card-metrics-footer {
  transform: translateZ(20px);
}

.guilloche-canvas {
  transform: translateZ(-5px);
}

.gold-dust-canvas {
  transform: translateZ(0px);
}

.card-sheen {
  transform: translateZ(2px);
}

.hallmark-layer {
  transform: translateZ(8px);
}
`;

code += '\n' + parallaxCss;
fs.writeFileSync('style.css', code);
console.log("Parallax CSS added.");

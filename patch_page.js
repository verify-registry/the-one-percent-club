const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

const pageRegex = /\.page \{\n  display: none;\n  flex-direction: column;\n  gap: 10px;\n  height: 100%;\n  min-height: 0;\n\}\n\n\.page\.is-active \{\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch;\n  animation: fadeUp 0\.4s ease forwards;\n\}/;

const pageNew = `.page {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(12px) scale(0.99);
  transition: opacity 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
              visibility 0.35s;
  will-change: transform, opacity;
  z-index: 1;
}

.page.is-active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0) scale(1);
  z-index: 2;
  transition: opacity 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) 0.05s,
              transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) 0.05s,
              visibility 0s;
}`;

if (code.match(pageRegex)) {
    code = code.replace(pageRegex, pageNew);
    fs.writeFileSync('style.css', code);
    console.log("Patched .page successfully");
} else {
    console.log("Still could not match .page");
}

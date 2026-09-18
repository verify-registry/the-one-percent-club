const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

// 1. Replace .app-main
const appMainRegex = /\.app-main \{\n  flex: 1;\n  padding: 5px 16px 80px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n\}/;
const appMainNew = `.app-main {
  flex: 1;
  padding: 5px 16px 80px;
  display: grid;
  overflow: hidden;
  position: relative;
}`;

// 2. Replace .page and .page.is-active
const pageRegex = /\.page \{\n  display: none;\n  flex-direction: column;\n  gap: 10px;\n  height: 100%;\n  min-height: 0;\n\}\n\n\.page\.is-active \{\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  overflow-y: auto;\n  overflow-x: hidden;\n\}/;
const pageNew = `.page {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  
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

// 3. Replace .nav-item
const navItemRegex = /\.nav-item \{\n  direction: rtl;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 0;\n  color: #6e695d;\n\}\n\.nav-item svg \{\n  width: 20px;\n  height: 20px;\n\}\n\.nav-item span \{\n  font-size: 8\.5px;\n  letter-spacing: 0\.08em;\n\}\n\.nav-item\.is-active \{\n  color: var\(--gold-champagne\);\n  --icon-color: var\(--icon-champagne\);\n\}/;
const navItemNew = `.nav-item {
  direction: rtl;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 4px 0;
  color: #6e695d;
  transition: color 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform, color;
}
.nav-item svg {
  width: 20px;
  height: 20px;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.4s ease;
  will-change: transform, filter;
}
.nav-item span {
  font-size: 8.5px;
  letter-spacing: 0.08em;
}
.nav-item.is-active {
  color: var(--gold-champagne);
  --icon-color: var(--icon-champagne);
  transform: translateY(-2px);
}
.nav-item.is-active svg {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 6px rgba(212, 175, 106, 0.25));
}`;

let patched = false;
if (code.match(appMainRegex)) {
    code = code.replace(appMainRegex, appMainNew);
    patched = true;
} else {
    console.log("Could not match .app-main");
}

if (code.match(pageRegex)) {
    code = code.replace(pageRegex, pageNew);
} else {
    console.log("Could not match .page");
}

if (code.match(navItemRegex)) {
    code = code.replace(navItemRegex, navItemNew);
} else {
    console.log("Could not match .nav-item");
}

fs.writeFileSync('style.css', code);
if (patched) console.log("Patched style.css successfully");

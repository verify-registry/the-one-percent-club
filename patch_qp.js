const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Add quickPurchasedItems Set and handleQuickPurchase function at the top or bottom of app.js
const qpScript = `
window.quickPurchasedItems = new Set();
window.handleQuickPurchase = function(event, item, catKey) {
  event.stopPropagation();
  event.preventDefault();
  
  const btn = event.currentTarget;
  if (btn.disabled || btn.dataset.processing === "true") return;
  btn.dataset.processing = "true";
  
  if (ClubState.purchase(item)) {
    window.quickPurchasedItems.add(item.id);
    if (window.AudioEngine) window.AudioEngine.playChime();
    
    setTimeout(() => {
      window.quickPurchasedItems.delete(item.id);
      const b = document.querySelector(\`.boutique-card[data-item-id="\${item.id}"] .boutique-own-btn\`);
      if(b) b.innerHTML = window.t("boutique.owned");
      const c = document.querySelector(\`.boutique-card[data-item-id="\${item.id}"]\`);
      if(c) c.classList.remove("qp-shimmer-active");
    }, 1500);
  } else {
    btn.dataset.processing = "";
    btn.classList.add("shake-animation");
    setTimeout(() => btn.classList.remove("shake-animation"), 400);
  }
};
`;
if (!app.includes('handleQuickPurchase')) {
  app = app + '\n' + qpScript;
}

// 2. Replace the button variables logic
const regexLogic = /if \(isEquipped\) \{[\s\S]*?btnClass = "";\n\s*\}/;
const newLogic = `
          let btnText = "";
          let btnClass = "";
          let btnOnClick = "";
          let btnPointerEvents = "pointer-events: none;";
          let extraCardClass = "";
          
          if (isEquipped) {
            btnText = window.t("boutique.equip");
            btnClass = "btn-equip";
          } else if (isOwned) {
            if (window.quickPurchasedItems && window.quickPurchasedItems.has(item.id)) {
              btnText = \`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-inline-end: 4px; vertical-align: middle;"><polyline points="20 6 9 17 4 12"></polyline></svg> \` + window.t("boutique.owned");
              btnClass = "btn-owned qp-success-btn";
              extraCardClass = " qp-shimmer-active";
            } else {
              btnText = window.t("boutique.owned");
              btnClass = "btn-owned";
            }
          } else {
            btnText = window.t("boutique.acquire");
            btnClass = "";
            btnPointerEvents = "pointer-events: auto;";
            btnOnClick = \`onclick='handleQuickPurchase(event, \${JSON.stringify(item)}, "\${catKey}")'\`;
          }
`;
app = app.replace(regexLogic, newLogic.trim());

// 3. Update the cardClass declaration
const regexCardClass = /const cardClass = \`boutique-card\$\{isOwned \? " is-owned" : ""\}\$\{isEquipped \? " is-equipped" : ""\}\`;/;
const newCardClass = 'const cardClass = `boutique-card${isOwned ? " is-owned" : ""}${isEquipped ? " is-equipped" : ""}${extraCardClass}`;';
app = app.replace(regexCardClass, newCardClass);

// 4. Update the button HTML
const regexBtn = /<button class="boutique-own-btn \$\{btnClass\}" type="button" style="pointer-events: none;">\n\s*\$\{btnText\}\n\s*<\/button>/;
const newBtn = `<button class="boutique-own-btn \${btnClass}" type="button" style="\${btnPointerEvents}" \${btnOnClick}>\n            \${btnText}\n          </button>`;
app = app.replace(regexBtn, newBtn);

fs.writeFileSync('app.js', app);

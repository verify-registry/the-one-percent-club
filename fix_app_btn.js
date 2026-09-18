const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const replacement = `          let btnText = "";
          let btnClass = "";
          let btnOnClick = "";
          let btnPointerEvents = "pointer-events: none;";
          let extraCardClass = "";
          
          if (item.free) {
            btnText = window.t("boutique.ownedCheck");
            btnClass = "btn-free";
          } else if (isEquipped) {
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
          }`;

// Let's replace by splitting lines.
let lines = code.split('\\n');
lines.splice(966, 34, replacement); // removes from 967 to 1000 and inserts replacement
fs.writeFileSync('app.js', lines.join('\\n'));

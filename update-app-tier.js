const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const regex = /this\.member\.connectionsValue = Math\.min\([\s\S]*?if \(tierNameEl\) tierNameEl\.textContent = this\.member\.tier;\s*\}/;

const replacement = `this.member.connectionsValue = Math.min(
      99,
      Math.floor(65 + totalItems * 2),
    );
    
    const oldTier = this.member.tier;

    if (totalItems >= 5 && maxRarity >= 3) {
      this.member.tier = "SOVEREIGN EXARCH";
    } else if (totalItems >= 2) {
      this.member.tier = "SOVEREIGN LUMINARY";
    } else {
      this.member.tier = "SOVEREIGN MEMBER";
    }
    
    const tierNameEl = document.getElementById("tierName");
    if (tierNameEl) tierNameEl.textContent = this.member.tier;
    
    if (oldTier && oldTier !== this.member.tier) {
      if (typeof window.triggerGoldDustMilestone === "function") {
        window.triggerGoldDustMilestone();
      }
    }
  }`;

if (regex.test(code)) {
  fs.writeFileSync('app.js', code.replace(regex, replacement));
  console.log("Success app.js");
} else {
  console.log("Failed to find target in app.js");
}

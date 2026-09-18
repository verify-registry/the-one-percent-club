const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const parallaxRegex = /class ParallaxController \{[\s\S]*?\}\n\}\n\ndocument\.addEventListener\("DOMContentLoaded", \(\) => \{\n  new ParallaxController\(\);\n\}\);/g;

const newParallax = `class ParallaxController {
  constructor() {
    this.ticking = false;
    this.init();
  }

  init() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      // Use passive listener for butter-smooth scrolling
      page.addEventListener('scroll', () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.updateParallax(page);
            this.ticking = false;
          });
          this.ticking = true;
        }
      }, { passive: true });
    });
    
    // Initial trigger
    setTimeout(() => {
        const activePage = document.querySelector('.page.is-active');
        if (activePage) this.updateParallax(activePage);
    }, 100);
  }

  updateParallax(scrollContainer) {
    const containerHeight = scrollContainer.clientHeight;
    
    // --- BOUTIQUE TAB PARALLAX ---
    if (scrollContainer.id === 'boutique-tab') {
      const cards = scrollContainer.querySelectorAll('.boutique-card');
      
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        
        // Skip if outside viewport
        if (rect.bottom < 0 || rect.top > containerHeight) return;
        
        // Distance from center of viewport (- means above center, + means below)
        const centerOffset = (rect.top + rect.height / 2) - (containerHeight / 2);
        
        // Layer 1: Icon (moves faster)
        const icon = card.querySelector('.boutique-card-icon');
        // Layer 2: Text (moves slower)
        const info = card.querySelector('.boutique-card-info');
        
        if (icon) {
          const yIcon = centerOffset * 0.08; 
          icon.style.transform = \`translate3d(0, \${yIcon}px, 0)\`;
          icon.style.transition = 'none'; // Perfect sync with scroll
        }
        
        if (info) {
          const yInfo = centerOffset * 0.03;
          info.style.transform = \`translate3d(0, \${yInfo}px, 0)\`;
          info.style.transition = 'none';
        }
      });
    }

    // --- PROFILE TAB PARALLAX ---
    if (scrollContainer.id === 'profile-tab') {
      
      // 1. Profile Hero Section Parallax
      const hero = scrollContainer.querySelector('.profile-hero-card');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const avatarCol = hero.querySelector('.phc-avatar-col');
        const infoCol = hero.querySelector('.phc-info-col');
        
        // Only apply if visible and scrolling up (rect.top < 0)
        if (rect.bottom > 0) {
          // Push down as it scrolls up (negative rect.top)
          const offset = Math.max(0, -rect.top); 
          
          if (avatarCol) {
            avatarCol.style.transform = \`translate3d(0, \${offset * 0.15}px, 0)\`;
            avatarCol.style.transition = 'none';
          }
          if (infoCol) {
            infoCol.style.transform = \`translate3d(0, \${offset * 0.06}px, 0)\`;
            infoCol.style.transition = 'none';
          }
        }
      }
      
      // 2. Profile Collection Grid Parallax
      const collectionCards = scrollContainer.querySelectorAll('#profileCollectionGrid .pcs-item-card');
      collectionCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > containerHeight) return;
        
        const centerOffset = (rect.top + rect.height / 2) - (containerHeight / 2);
        
        const icon = card.querySelector('.boutique-card-icon');
        const info = card.querySelector('.pcs-item-info');
        
        if (icon) {
          const yIcon = centerOffset * 0.06;
          icon.style.transform = \`translate3d(0, \${yIcon}px, 0)\`;
          icon.style.transition = 'none';
        }
        if (info) {
          const yInfo = centerOffset * 0.02;
          info.style.transform = \`translate3d(0, \${yInfo}px, 0)\`;
          info.style.transition = 'none';
        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.parallaxController = new ParallaxController();
});`;

if (code.match(parallaxRegex)) {
    code = code.replace(parallaxRegex, newParallax);
    fs.writeFileSync('app.js', code);
    console.log("Patched ParallaxController in app.js successfully");
} else {
    console.log("Could not match ParallaxController regex");
}

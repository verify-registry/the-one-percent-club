const fs = require('fs');

// --- APP.JS PATCHING ---
let appCode = fs.readFileSync('app.js', 'utf8');

// 1. Boutique Skeleton
const boutiqueSkeletonFunc = `
function generateBoutiqueSkeleton() {
  let html = '<div class="boutique-grid">';
  for (let i = 0; i < 6; i++) {
    html += \`
      <div class="boutique-card boutique-skeleton">
        <span class="skeleton-shimmer-el skeleton-badge"></span>
        <span class="skeleton-shimmer-el skeleton-icon"></span>
        <span class="skeleton-shimmer-el skeleton-name"></span>
        <span class="skeleton-shimmer-el skeleton-price"></span>
        <div class="skeleton-shimmer-el skeleton-progress"></div>
        <div class="skeleton-shimmer-el skeleton-button"></div>
      </div>
    \`;
  }
  html += '</div>';
  return html;
}
`;
appCode = appCode.replace(/function generateSkeletonGrid[\s\S]*?return html;\n\}/, boutiqueSkeletonFunc);

// Update renderBoutique to use generateBoutiqueSkeleton()
appCode = appCode.replace(/root\.innerHTML = generateSkeletonGrid\(\);/, 'root.innerHTML = generateBoutiqueSkeleton();');
// Add fade-in to the sections
appCode = appCode.replace(/<section class="boutique-section"/g, '<section class="boutique-section skeleton-fade-in"');


// 2. Profile Collection Skeleton
const profileCollectionSkeletonFunc = `
function generateProfileCollectionSkeleton() {
  let html = '';
  for (let i = 0; i < 4; i++) {
    html += \`
      <div class="pcs-item-card profile-collection-skeleton">
        <span class="skeleton-shimmer-el skeleton-icon-round"></span>
        <div class="pcs-item-info">
          <div class="skeleton-shimmer-el skeleton-name"></div>
          <div class="skeleton-shimmer-el skeleton-price-small"></div>
        </div>
      </div>
    \`;
  }
  return html;
}
`;
appCode = appCode.replace(/function renderProfileCollection/, profileCollectionSkeletonFunc + '\nfunction renderProfileCollection');

appCode = appCode.replace(/container\.innerHTML = generateSkeletonGrid\(4, false\);/, 'container.innerHTML = generateProfileCollectionSkeleton();');

// Add fade in to pcs-item-card
appCode = appCode.replace(/<div class="pcs-item-card gyro-element"/g, '<div class="pcs-item-card gyro-element skeleton-fade-in"');


// 3. Profile Achievements Skeleton
const profileAchievementsSkeletonFunc = `
function generateProfileAchievementSkeleton() {
  let html = '';
  for (let i = 0; i < 4; i++) {
    html += \`
      <div class="honor-card profile-achievement-skeleton">
        <div class="skeleton-shimmer-el skeleton-icon-small"></div>
        <div class="skeleton-shimmer-el skeleton-name"></div>
        <div class="skeleton-shimmer-el skeleton-badge"></div>
        <div class="skeleton-shimmer-el skeleton-progress-wrap"></div>
      </div>
    \`;
  }
  return html;
}
`;
appCode = appCode.replace(/function renderProfileAchievements/, profileAchievementsSkeletonFunc + '\nfunction renderProfileAchievements');

appCode = appCode.replace(/let skeletonHtml = generateSkeletonGrid\(4, false\);/, 'let skeletonHtml = generateProfileAchievementSkeleton();');

// Add fade in to honor-card
appCode = appCode.replace(/<div class="honor-card is-locked gyro-element"/g, '<div class="honor-card is-locked gyro-element skeleton-fade-in"');
appCode = appCode.replace(/<div class="honor-card gyro-element"/g, '<div class="honor-card gyro-element skeleton-fade-in"');


// 4. Profile Stats Skeleton
const renderStatsRegex = /function renderProfileStatsBar\(\) \{[\s\S]*?container\.innerHTML = `[\s\S]*?<\/div>\n\s+`;\n\}/;
const statsMatch = appCode.match(renderStatsRegex);
if(statsMatch) {
  const originalStatsBody = statsMatch[0].replace('function renderProfileStatsBar() {', '').replace(/}\s*$/, '');
  
  const newStatsFunc = `function renderProfileStatsBar() {
  const container = document.getElementById("profileStatsBar");
  if (!container) return;

  if (!container.dataset.skeletonShown) {
    let html = '';
    for(let i=0; i<4; i++) {
      html += \`
        <div class="psb-col profile-stats-skeleton">
          <div class="skeleton-shimmer-el skeleton-icon-tiny"></div>
          <div class="skeleton-shimmer-el skeleton-name"></div>
          <div class="skeleton-shimmer-el skeleton-badge"></div>
        </div>
      \`;
    }
    container.innerHTML = html;
    container.dataset.skeletonShown = "true";
    setTimeout(() => renderProfileStatsBar(), 450);
    return;
  }
  container.dataset.skeletonShown = "";

  ${originalStatsBody.replace('container.innerHTML = `', 'container.innerHTML = `<div class="skeleton-fade-in" style="display:flex; width:100%; justify-content:space-evenly; align-items:center;">').replace('`;', '</div>`;')}
}`;

  appCode = appCode.replace(statsMatch[0], newStatsFunc);
}

fs.writeFileSync('app.js', appCode);

// --- STYLE.CSS PATCHING ---
let styleCode = fs.readFileSync('style.css', 'utf8');

// Replace luxury-skeleton-card with new CSS
const oldSkeletonCSSRegex = /\/\* ==========================================================================\s*LUXURY SKELETONS \(GOLDEN SHIMMER\)\s*========================================================================== \*\/[\s\S]*?@keyframes luxuryBloomOpenLight/g;

const newSkeletonCSS = `/* ==========================================================================
   LUXURY SKELETONS (GOLDEN SHIMMER / MATCHING LAYOUTS)
   ========================================================================== */

/* Shimmer Animation & Base Shape */
.skeleton-shimmer-el {
  position: relative;
  background: rgba(15, 12, 10, 0.4);
  border-radius: 4px;
  overflow: hidden;
}

body.light-mode .skeleton-shimmer-el {
  background: rgba(156, 109, 35, 0.08);
}

.skeleton-shimmer-el::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(212, 175, 55, 0.08) 30%,
    rgba(255, 235, 160, 0.15) 50%,
    rgba(212, 175, 55, 0.08) 70%,
    transparent 100%
  );
  transform: skewX(-20deg);
  animation: skeletonShimmer 2s infinite ease-in-out;
}

body.light-mode .skeleton-shimmer-el::after {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(156, 109, 35, 0.05) 30%,
    rgba(212, 175, 55, 0.12) 50%,
    rgba(156, 109, 35, 0.05) 70%,
    transparent 100%
  );
}

@keyframes skeletonShimmer {
  0% { left: -150%; }
  100% { left: 200%; }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton-shimmer-el::after {
    animation: none;
    display: none;
  }
}

/* Specific Placeholder Sizes */
.boutique-skeleton .skeleton-badge { width: 40px; height: 16px; align-self: flex-start; }
.boutique-skeleton .skeleton-icon { width: 60px; height: 60px; border-radius: 50%; margin: 10px 0 6px; }
.boutique-skeleton .skeleton-name { width: 70%; height: 14px; margin-bottom: 2px; }
.boutique-skeleton .skeleton-price { width: 40%; height: 16px; margin-bottom: 4px; }
.boutique-skeleton .skeleton-progress { width: 100%; height: 4px; border-radius: 2px; margin-bottom: 8px; }
.boutique-skeleton .skeleton-button { width: 100%; height: 32px; border-radius: 8px; }

.profile-collection-skeleton .skeleton-icon-round { width: 60px; height: 60px; border-radius: 50%; margin: 10px 0 6px; }
.profile-collection-skeleton .skeleton-name { width: 70%; height: 12px; margin: 0 auto 4px; }
.profile-collection-skeleton .skeleton-price-small { width: 50%; height: 12px; margin: 0 auto; }

.profile-achievement-skeleton .skeleton-icon-small { width: 40px; height: 40px; border-radius: 50%; margin-bottom: 8px; }
.profile-achievement-skeleton .skeleton-name { width: 80%; height: 12px; margin-bottom: 4px; }
.profile-achievement-skeleton .skeleton-badge { width: 60%; height: 10px; margin-bottom: 12px; }
.profile-achievement-skeleton .skeleton-progress-wrap { width: 100%; height: 16px; border-radius: 4px; }

.profile-stats-skeleton { 
  display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1;
}
.profile-stats-skeleton .skeleton-icon-tiny { width: 24px; height: 24px; border-radius: 4px; }
.profile-stats-skeleton .skeleton-name { width: 60%; height: 16px; }
.profile-stats-skeleton .skeleton-badge { width: 80%; height: 10px; }


/* Wrapper containers that hide borders/shadows for skeletons but keep dimensions */
.boutique-card.boutique-skeleton {
  border-color: transparent !important;
  background: transparent !important;
  box-shadow: none !important;
}
.pcs-item-card.profile-collection-skeleton {
  border-color: transparent !important;
  background: transparent !important;
  box-shadow: none !important;
}
.honor-card.profile-achievement-skeleton {
  border-color: transparent !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* Fade In transition for real content */
.skeleton-fade-in {
  animation: skeletonFadeIn 0.3s ease forwards;
}

@keyframes skeletonFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes luxuryBloomOpenLight`;

styleCode = styleCode.replace(oldSkeletonCSSRegex, newSkeletonCSS);

fs.writeFileSync('style.css', styleCode);
console.log("Patched skeletons");

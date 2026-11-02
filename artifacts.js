/**
 * THE 1% CLUB — Sovereign Boutique Artifacts Engine
 * Dual-Mode Authentic Haute Joaillerie & Haute Horlogerie Studio Photography
 * Light Mode: Luminous daylight editorial on warm Carrara marble, champagne silk & alabaster
 * Dark Mode: Deep obsidian & black velvet studio photography
 */

function isLightModeActive() {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('light-mode') ||
         (document.body && document.body.classList.contains('light-mode')) ||
         document.documentElement.getAttribute('data-theme') === 'light' ||
         (typeof localStorage !== 'undefined' && localStorage.getItem('app_theme') === 'light');
}

const aliasMap = {
  // Stars
  'star1': 'star1',
  'star2': 'star1',
  'star3': 'star1',
  'star4': 'star4',
  'star_sovereign': 'star1',
  'star_grand_cross': 'star1',
  'star_constellation': 'star1',
  'star_zenith': 'star4',
  'star': 'star1',
  'badge1': 'star1',

  // Crowns
  'crown1': 'crown1',
  'crown2': 'crown1',
  'crown3': 'crown1',
  'crown4': 'crown4',
  'crown_imperial': 'crown1',
  'crown_sol': 'crown1',
  'crown_solaris': 'crown1',
  'crown_moritz': 'crown1',
  'crown_zenith': 'crown4',
  'apex_crown': 'crown4',
  'crown': 'crown1',

  // Auras
  'aura1': 'aura1',
  'aura2': 'aura1',
  'aura3': 'aura4',
  'aura4': 'aura4',
  'aura_radial': 'aura1',
  'aura_champagne': 'aura1',
  'aura_guilloche': 'aura1',
  'aura_eclipse': 'aura4',
  'aura_celestial': 'aura4',
  'aura': 'aura1',
  'frame1': 'aura1',
  'frame2': 'aura1',
  'frame3': 'aura1',
  'frame4': 'aura4',

  // Rings & Signets
  'ring1': 'ring1',
  'ring2': 'ring2',
  'ring3': 'ring3',
  'ring4': 'ring3',
  'ring_monogram': 'ring1',
  'ring_onyx': 'ring2',
  'ring_falcon': 'ring3',
  'ring_emerald': 'ring3',
  'ring_chrono': 'ring3',
  'sovereign_signet': 'ring1',
  'ring': 'ring1',
  'jewelry': 'ring1',

  // Artifacts & Horology
  'art1': 'art1',
  'art2': 'art2',
  'art3': 'art2',
  'art4': 'art4',
  'art_horology': 'art1',
  'art_tourbillon': 'art1',
  'art_seal': 'art2',
  'art_falcon_medallion': 'art2',
  'art_scepter': 'art4',
  'art': 'art1',

  // Widgets
  'wid1': 'wid1',
  'wid_mastercard': 'wid1',

  // Legacy circle tokens mapped to master pieces
  'Jet': 'art1',
  'Yacht': 'art2',
  'Estate': 'ring2',
  'Watch': 'art1',
  'Car': 'ring3',
  'Art': 'star4',
  'Horse': 'crown1',
  'Island': 'aura4'
};

window.getSovereignArtifact = function(idOrType) {
  const uid = 'sov-' + Math.random().toString(36).substring(2, 9);
  const key = (idOrType && aliasMap[idOrType]) ? aliasMap[idOrType] : idOrType;
  const isLight = isLightModeActive();

  // Real Photorealistic Physical High-Jewelry & Horology Piece
  if (key && key !== 'wid1' && key !== 'wid_mastercard') {
    const activeSrc = isLight ? `/artifacts/${key}_light.webp` : `/artifacts/${key}.webp`;
    return `<img 
      src="${activeSrc}" 
      data-artifact-key="${key}"
      data-dark="/artifacts/${key}.webp" 
      data-dark-fallback="/artifacts/${key}.jpg" 
      data-light="/artifacts/${key}_light.webp" 
      data-light-fallback="/artifacts/${key}_light.jpg" 
      alt="${key}" 
      class="sovereign-real-artifact-img" 
      decoding="async" 
      onerror="
        this.onerror = null;
        const l = document.documentElement.classList.contains('light-mode') || (document.body && document.body.classList.contains('light-mode'));
        this.src = l ? (this.dataset.lightFallback || this.dataset.light) : (this.dataset.darkFallback || this.dataset.dark);
      " />`;
  }

  // Sovereign Master Card Widget (wid1)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%" class="sovereign-artifact-svg">
      <defs>
        <linearGradient id="${uid}-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF6D6" />
          <stop offset="35%" stop-color="#D4AF37" />
          <stop offset="70%" stop-color="#9A7220" />
          <stop offset="100%" stop-color="#5C3E09" />
        </linearGradient>
        <linearGradient id="${uid}-obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2D2B35" />
          <stop offset="50%" stop-color="#141318" />
          <stop offset="100%" stop-color="#08070A" />
        </linearGradient>
      </defs>
      <g transform="translate(20, 52)">
        <rect x="0" y="0" width="200" height="126" rx="12" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold)" stroke-width="2"/>
        <rect x="6" y="6" width="188" height="114" rx="8" fill="none" stroke="url(#${uid}-gold)" stroke-width="0.8" opacity="0.5"/>
        <path d="M 100 32 L 88 18 L 95 22 L 100 12 L 105 22 L 112 18 Z" fill="url(#${uid}-gold)"/>
        <text x="100" y="64" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="14" font-weight="700" fill="url(#${uid}-gold)" letter-spacing="2">THE 1% CLUB</text>
        <text x="100" y="80" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="7" fill="#C59B27" letter-spacing="3">SOVEREIGN MASTER WIDGET</text>
        <polygon points="150,126 200,126 200,86" fill="url(#${uid}-gold)"/>
        <text x="182" y="118" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="13" font-weight="700" fill="#0A0805">1%</text>
      </g>
    </svg>
  `;
};

// Window-level vitrine compatibility helper for app.js callers
window.renderClocheVitrine = function(innerContent, isObsidianBaseOrUid, uid) {
  if (typeof innerContent === "string" && (innerContent.includes("<img") || innerContent.includes("<picture") || innerContent.includes("<svg") || innerContent.includes("<g") || innerContent.includes("<image"))) {
    return `<div class="cloche-vitrine-chamber sovereign-artifact-showcase">${innerContent}</div>`;
  }
  const fallbackKey =
    (typeof uid === "string" && uid) ||
    (typeof isObsidianBaseOrUid === "string" && isObsidianBaseOrUid) ||
    "star1";
  const valid = window.getSovereignArtifact(fallbackKey);
  return `<div class="cloche-vitrine-chamber sovereign-artifact-showcase">${valid}</div>`;
};

// Dynamic theme switcher for live toggle without full page re-render
window.updateSovereignArtifactThemes = function() {
  const isLight = isLightModeActive();
  const imgs = document.querySelectorAll('.sovereign-real-artifact-img');
  imgs.forEach((img) => {
    const key = img.dataset.artifactKey;
    if (!key) return;
    const targetSrc = isLight ? `/artifacts/${key}_light.webp` : `/artifacts/${key}.webp`;
    if (!img.src.endsWith(targetSrc)) {
      img.src = targetSrc;
    }
  });
};

// Listen to theme switches in DOM & storage
if (typeof window !== 'undefined') {
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      window.updateSovereignArtifactThemes();
    });
    if (document.documentElement) {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    }
    const attachBodyObserver = () => {
      if (document.body) {
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachBodyObserver);
    } else {
      attachBodyObserver();
    }
  }

  window.addEventListener('themeChanged', () => {
    window.updateSovereignArtifactThemes();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === 'app_theme') window.updateSovereignArtifactThemes();
  });
}

// Dynamic Proxy for window.SOVEREIGN_ARTIFACTS so current theme is always rendered
window.SOVEREIGN_ARTIFACTS = new Proxy({}, {
  get(target, prop) {
    if (typeof prop === "string" && prop !== "toJSON" && prop !== "constructor") {
      return window.getSovereignArtifact(prop);
    }
    return target[prop];
  },
});

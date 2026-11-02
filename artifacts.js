/**
 * THE 1% CLUB — Sovereign Boutique Artifacts Engine
 * Real Physical Haute Joaillerie & Haute Horlogerie Studio Photography
 */

window.getSovereignArtifact = function(idOrType) {
  const uid = 'sov-' + Math.random().toString(36).substring(2, 9);

  const aliasMap = {
    'star1': 'star1',
    'star2': 'star1',
    'star3': 'star1',
    'star4': 'star4',
    'star_sovereign': 'star1',
    'star_zenith': 'star4',
    'crown1': 'crown1',
    'crown2': 'crown1',
    'crown3': 'crown1',
    'crown4': 'crown4',
    'crown_imperial': 'crown1',
    'crown_zenith': 'crown4',
    'aura1': 'aura1',
    'aura2': 'aura1',
    'aura3': 'aura1',
    'aura4': 'aura4',
    'aura_champagne': 'aura1',
    'aura_celestial': 'aura4',
    'ring1': 'ring1',
    'ring2': 'ring2',
    'ring3': 'ring3',
    'ring4': 'ring3',
    'ring_monogram': 'ring1',
    'ring_onyx': 'ring2',
    'ring_emerald': 'ring3',
    'art1': 'art1',
    'art2': 'art2',
    'art3': 'art2',
    'art4': 'art4',
    'art_horology': 'art1',
    'art_seal': 'art2',
    'art_scepter': 'art4',
    'wid1': 'wid1',
    'wid_mastercard': 'wid1',
    'frame1': 'aura1',
    'frame2': 'aura1',
    'frame3': 'aura1',
    'frame4': 'aura4',
    'badge1': 'star1',
    'Jet': 'art1',
    'Yacht': 'art2',
    'Estate': 'ring2',
    'Watch': 'art1',
    'Car': 'ring3',
    'Art': 'star4',
    'Horse': 'crown1',
    'Island': 'aura4'
  };

  const key = aliasMap[idOrType] || idOrType;

  // Real Photorealistic Physical High-Jewelry & Horology Piece
  if (key && key !== 'wid1' && key !== 'wid_mastercard') {
    return `<img src="/artifacts/${key}.webp" alt="${key}" class="sovereign-real-artifact-img" decoding="async" onerror="this.onerror=null;this.src='/artifacts/${key}.jpg';" />`;
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
  if (typeof innerContent === "string" && (innerContent.includes("<svg") || innerContent.includes("<img") || innerContent.includes("<g") || innerContent.includes("<image"))) {
    return `<div class="cloche-vitrine-chamber sovereign-artifact-showcase">${innerContent}</div>`;
  }
  const fallbackKey =
    (typeof uid === "string" && uid) ||
    (typeof isObsidianBaseOrUid === "string" && isObsidianBaseOrUid) ||
    "star1";
  const valid = window.getSovereignArtifact(fallbackKey);
  return `<div class="cloche-vitrine-chamber sovereign-artifact-showcase">${valid}</div>`;
};

// Pre-populate registry and bridge to window.SOVEREIGN_ARTIFACTS
const registry = {};
const KNOWN_KEYS = [
  "star1", "star2", "star3", "star4", "star_sovereign", "star_zenith", "star", "star_grand_cross", "star_constellation",
  "crown1", "crown2", "crown3", "crown4", "crown_imperial", "crown_zenith", "crown", "apex_crown", "crown_sol", "crown_solaris", "crown_moritz",
  "aura1", "aura2", "aura3", "aura4", "aura_champagne", "aura_radial", "aura_celestial", "aura", "aura_guilloche", "aura_eclipse",
  "ring1", "ring2", "ring3", "ring4", "ring_monogram", "ring_onyx", "ring_emerald", "ring_falcon", "ring", "sovereign_signet", "ring_chrono", "jewelry",
  "art1", "art2", "art3", "art4", "art_horology", "art_tourbillon", "art_seal", "art_scepter", "art", "art_falcon_medallion",
  "wid1", "wid_mastercard",
  "frame1", "frame2", "frame3", "frame4", "badge1",
  "Jet", "Yacht", "Estate", "Watch", "Car", "Art", "Horse", "Island"
];

KNOWN_KEYS.forEach((k) => {
  registry[k] = window.getSovereignArtifact(k);
});

window.SOVEREIGN_ARTIFACTS = new Proxy(registry, {
  get(target, prop) {
    if (typeof prop === "string" && !(prop in target) && prop !== "toJSON" && prop !== "constructor") {
      const generated = window.getSovereignArtifact(prop);
      target[prop] = generated;
      return generated;
    }
    return target[prop];
  },
});

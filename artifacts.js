/**
 * THE 1% CLUB — Sovereign Boutique Artifacts Engine
 * Style: 3D Photorealistic Haute Horlogerie & High-Jewelry Architecture
 */

function renderClocheVitrine(innerContent, uid) {
  return `<g>${innerContent}</g>`;
}

window.getSovereignArtifact = function(idOrType) {
  const localRenderVitrine = (innerContent, uid) => `<g>${innerContent}</g>`;
  const uid = 'sov-' + Math.random().toString(36).substring(2, 9);

  const aliasMap = {
    'star1': 'star_sovereign',
    'star2': 'star_sovereign',
    'star3': 'star_sovereign',
    'star4': 'star_zenith',
    'crown1': 'crown_imperial',
    'crown2': 'crown_imperial',
    'crown3': 'crown_imperial',
    'crown4': 'crown_zenith',
    'aura1': 'aura_champagne',
    'aura2': 'aura_champagne',
    'aura3': 'aura_champagne',
    'aura4': 'aura_celestial',
    'ring1': 'ring_monogram',
    'ring2': 'ring_onyx',
    'ring3': 'ring_emerald',
    'ring4': 'ring_emerald',
    'art1': 'art_horology',
    'art2': 'art_seal',
    'art3': 'art_seal',
    'art4': 'art_scepter',
    'wid1': 'wid_mastercard',
    'frame1': 'aura_champagne',
    'frame2': 'aura_champagne',
    'frame3': 'aura_champagne',
    'frame4': 'aura_celestial',
    'badge1': 'star_sovereign',
    'Jet': 'art_horology',
    'Yacht': 'art_seal',
    'Estate': 'ring_onyx',
    'Watch': 'art_horology',
    'Car': 'ring_emerald',
    'Art': 'star_zenith',
    'Horse': 'crown_imperial',
    'Island': 'aura_celestial'
  };

  const type = aliasMap[idOrType] || idOrType;

  // 12 Photorealistic 3D Collectible Artifact Mappings
  const artifactImageMap = {
    'star_sovereign': 'star1',
    'aura_champagne': 'aura1',
    'ring_monogram': 'ring1',
    'crown_imperial': 'crown1',
    'ring_onyx': 'ring2',
    'art_horology': 'art1',
    'ring_emerald': 'ring3',
    'aura_celestial': 'aura4',
    'art_seal': 'art2',
    'star_zenith': 'star4',
    'crown_zenith': 'crown4',
    'art_scepter': 'art4',
    'star1': 'star1',
    'aura1': 'aura1',
    'ring1': 'ring1',
    'crown1': 'crown1',
    'ring2': 'ring2',
    'art1': 'art1',
    'ring3': 'ring3',
    'aura4': 'aura4',
    'art2': 'art2',
    'star4': 'star4',
    'crown4': 'crown4',
    'art4': 'art4'
  };

  const sharedDefs = `
    <defs>
      <!-- Master 24K Imperial Gold -->
      <linearGradient id="${uid}-gold-imperial" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF6D6" />
        <stop offset="18%" stop-color="#F5D37E" />
        <stop offset="45%" stop-color="#D4AF37" />
        <stop offset="72%" stop-color="#9A7220" />
        <stop offset="92%" stop-color="#5C3E09" />
        <stop offset="100%" stop-color="#8C6518" />
      </linearGradient>

      <!-- Champagne Specular Gold -->
      <linearGradient id="${uid}-gold-champagne" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#7A5818" />
        <stop offset="28%" stop-color="#C9A030" />
        <stop offset="55%" stop-color="#FBE8B2" />
        <stop offset="78%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#E2BA58" />
      </linearGradient>

      <!-- Linear Chiseled Obsidian Facet -->
      <linearGradient id="${uid}-obsidian-facet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3E424E" />
        <stop offset="25%" stop-color="#1B1D24" />
        <stop offset="68%" stop-color="#08090C" />
        <stop offset="100%" stop-color="#22252E" />
      </linearGradient>

      <!-- Crisp Contact Shadow Filter -->
      <filter id="${uid}-drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="#000000" flood-opacity="0.24" />
      </filter>
    </defs>
  `;

  // Render 3D photorealistic jewelry piece if available in artifactImageMap
  const imageKey = artifactImageMap[type];
  if (imageKey) {
    const content = `
      <g filter="url(#${uid}-drop-shadow)" class="sovereign-3d-artifact">
        <image href="artifacts/${imageKey}.webp" xlink:href="artifacts/${imageKey}.webp" x="0" y="0" width="240" height="240" preserveAspectRatio="xMidYMid meet" />
      </g>
    `;
    const innerSvg = localRenderVitrine(content, uid);
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: transparent;" viewBox="0 0 240 240" width="100%" height="100%" class="sovereign-artifact-svg">${sharedDefs}${innerSvg}</svg>`;
  }

  // Fallback for Sovereign Master Card Widget (wid1)
  const widgetContent = `
    <g filter="url(#${uid}-drop-shadow)" transform="translate(20, 52)">
      <rect x="0" y="0" width="200" height="126" rx="12" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="2"/>
      <rect x="6" y="6" width="188" height="114" rx="8" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="0.8" opacity="0.5"/>
      <path d="M 100 32 L 88 18 L 95 22 L 100 12 L 105 22 L 112 18 Z" fill="url(#${uid}-gold-champagne)"/>
      <text x="100" y="64" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="14" font-weight="700" fill="url(#${uid}-gold-champagne)" letter-spacing="2">THE 1% CLUB</text>
      <text x="100" y="80" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="7" fill="#C59B27" letter-spacing="3">SOVEREIGN MASTER WIDGET</text>
      <polygon points="150,126 200,126 200,86" fill="url(#${uid}-gold-imperial)"/>
      <text x="182" y="118" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="13" font-weight="700" fill="#0A0805">1%</text>
    </g>
  `;
  const innerSvg = localRenderVitrine(widgetContent, uid);
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background: transparent;" viewBox="0 0 240 240" width="100%" height="100%" class="sovereign-artifact-svg">${sharedDefs}${innerSvg}</svg>`;
};

// Window-level vitrine compatibility helper for app.js callers
window.renderClocheVitrine = function(innerContent, isObsidianBaseOrUid, uid) {
  if (typeof innerContent === "string" && (innerContent.includes("<svg") || innerContent.includes("<g") || innerContent.includes("<image"))) {
    return `<div class="cloche-vitrine-chamber sovereign-artifact-showcase">${innerContent}</div>`;
  }
  const fallbackKey =
    (typeof uid === "string" && uid) ||
    (typeof isObsidianBaseOrUid === "string" && isObsidianBaseOrUid) ||
    "star1";
  const validSvg = window.getSovereignArtifact(fallbackKey);
  return `<div class="cloche-vitrine-chamber sovereign-artifact-showcase">${validSvg}</div>`;
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

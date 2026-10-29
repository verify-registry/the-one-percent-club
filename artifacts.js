/**
 * THE 1% CLUB — Sovereign Boutique Artifacts Engine
 * Haute Joaillerie & Horology Edition — Authentic Photorealistic 3D Architecture
 */

const SOVEREIGN_3D_COLLECTIBLES = {
  star1: {
    id: "star1",
    name: "Order of the Sovereign Star",
    file: "/public/artifacts/star1.webp",
  },
  aura1: {
    id: "aura1",
    name: "Champagne Radial Halo",
    file: "/public/artifacts/aura1.webp",
  },
  ring1: {
    id: "ring1",
    name: "Sovereign Monogram Signet",
    file: "/public/artifacts/ring1.webp",
  },
  crown1: {
    id: "crown1",
    name: "Imperial Obsidian Crown",
    file: "/public/artifacts/crown1.webp",
  },
  ring2: {
    id: "ring2",
    name: "Black Onyx Intaglio Signet",
    file: "/public/artifacts/ring2.webp",
  },
  art1: {
    id: "art1",
    name: "Haute Horlogerie Pocket Relic",
    file: "/public/artifacts/art1.webp",
  },
  ring3: {
    id: "ring3",
    name: "Falcon Emerald Sovereign Signet",
    file: "/public/artifacts/ring3.webp",
  },
  aura4: {
    id: "aura4",
    name: "Celestial Apex Radiance",
    file: "/public/artifacts/aura4.webp",
  },
  art2: {
    id: "art2",
    name: "The Sovereign Gold Seal",
    file: "/public/artifacts/art2.webp",
  },
  star4: {
    id: "star4",
    name: "Zenith Diamond Star",
    file: "/public/artifacts/star4.webp",
  },
  crown4: {
    id: "crown4",
    name: "Celestial Zenith Imperial Crown",
    file: "/public/artifacts/crown4.webp",
  },
  art4: {
    id: "art4",
    name: "Sovereign Scepter",
    file: "/public/artifacts/art4.webp",
  },
};

const ALIAS_MAP = {
  // 12 Active Boutique Items (Mapped by Catalog ID and Icon Key)
  star1: "star1",
  star_sovereign: "star1",
  aura1: "aura1",
  aura_radial: "aura1",
  aura_champagne: "aura1",
  ring1: "ring1",
  ring_monogram: "ring1",
  sovereign_signet: "ring1",
  crown1: "crown1",
  crown_imperial: "crown1",
  ring2: "ring2",
  ring_onyx: "ring2",
  art1: "art1",
  art_tourbillon: "art1",
  art_horology: "art1",
  ring3: "ring3",
  ring_falcon: "ring3",
  ring_emerald: "ring3",
  aura4: "aura4",
  aura_celestial: "aura4",
  art2: "art2",
  art_seal: "art2",
  star4: "star4",
  star_zenith: "star4",
  crown4: "crown4",
  crown_zenith: "crown4",
  apex_crown: "crown4",
  art4: "art4",
  art_scepter: "art4",

  // Generic Category Fallbacks (Safely map to authentic item graphics, never wid1)
  star: "star1",
  crown: "crown1",
  aura: "aura1",
  ring: "ring1",
  jewelry: "ring1",
  art: "art1",

  // Retired Collectibles & Legacy Aliases
  star2: "star1",
  star_grand_cross: "star1",
  star3: "star4",
  star_constellation: "star4",
  crown2: "crown1",
  crown_sol: "crown1",
  crown_solaris: "crown1",
  crown3: "crown1",
  crown_moritz: "crown1",
  ring4: "ring3",
  ring_chrono: "ring3",
  aura2: "aura1",
  aura_guilloche: "aura1",
  aura3: "aura4",
  aura_eclipse: "aura4",
  art3: "art2",
  art_falcon_medallion: "art2",

  // Master Card Widget (Strictly separated from collectible items)
  wid1: "wid_mastercard",
  wid_mastercard: "wid_mastercard",

  // Luxury Assets & Frames
  frame1: "aura1",
  frame2: "aura1",
  frame3: "aura1",
  frame4: "aura4",
  badge1: "star1",
  Jet: "art1",
  Yacht: "art2",
  Estate: "ring2",
  Watch: "art1",
  Car: "ring3",
  Art: "star4",
  Horse: "crown1",
  Island: "aura4",
};

function renderPhotorealisticVitrine(item, uid) {
  return `
    <defs>
      <!-- Ambient Spotlight -->
      <radialGradient id="${uid}-ambient" cx="50%" cy="48%" r="52%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.14"/>
        <stop offset="60%" stop-color="#8A6418" stop-opacity="0.03"/>
        <stop offset="100%" stop-color="#050507" stop-opacity="0"/>
      </radialGradient>
      <!-- Grounded Contact Shadow -->
      <radialGradient id="${uid}-floor-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.9"/>
        <stop offset="65%" stop-color="#000000" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
      <!-- Plinth Rim Horizon -->
      <linearGradient id="${uid}-plinth-rim" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0"/>
        <stop offset="30%" stop-color="#D4AF37" stop-opacity="0.4"/>
        <stop offset="50%" stop-color="#FFF3D1" stop-opacity="0.7"/>
        <stop offset="70%" stop-color="#D4AF37" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- Subtle Ambient Spotlight -->
    <circle cx="120" cy="116" r="105" fill="url(#${uid}-ambient)" />

    <!-- Grounded Contact Shadow & Plinth Rim -->
    <ellipse cx="120" cy="216" rx="78" ry="10" fill="url(#${uid}-floor-shadow)" />
    <path d="M 55 216 L 185 216" stroke="url(#${uid}-plinth-rim)" stroke-width="0.75" opacity="0.65" />

    <!-- 3D Photorealistic High Jewelry Masterpiece -->
    <image href="${item.file}" xlink:href="${item.file}" x="8" y="8" width="224" height="224" preserveAspectRatio="xMidYMid meet" />
  `;
}

function renderMasterCardWidget(uid) {
  return `
    <defs>
      <!-- Master 24K Imperial Gold -->
      <linearGradient id="${uid}-gold-imperial" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF5D6" />
        <stop offset="25%" stop-color="#E5C158" />
        <stop offset="60%" stop-color="#B88A28" />
        <stop offset="85%" stop-color="#805A10" />
        <stop offset="100%" stop-color="#422D04" />
      </linearGradient>
      <!-- Champagne Gold Highlight -->
      <linearGradient id="${uid}-gold-champagne" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="35%" stop-color="#FDF3CD" />
        <stop offset="70%" stop-color="#D8B150" />
        <stop offset="100%" stop-color="#936F1C" />
      </linearGradient>
      <!-- Deep Obsidian Facet -->
      <linearGradient id="${uid}-obsidian-facet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1A181C" />
        <stop offset="50%" stop-color="#0E0D10" />
        <stop offset="100%" stop-color="#050506" />
      </linearGradient>
      <filter id="${uid}-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.8"/>
      </filter>
    </defs>
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
}

// Window-level vitrine compatibility helper for app.js callers
window.renderClocheVitrine = function(innerContent, isObsidianBaseOrUid, uid) {
  if (typeof innerContent === "string" && innerContent.includes("<svg")) {
    return `<div class="cloche-vitrine-chamber sovereign-artifact-showcase">${innerContent}</div>`;
  }
  const fallbackKey =
    (typeof uid === "string" && uid) ||
    (typeof isObsidianBaseOrUid === "string" && isObsidianBaseOrUid) ||
    "star1";
  const validSvg = generateSovereignArtifact(fallbackKey);
  return `<div class="cloche-vitrine-chamber sovereign-artifact-showcase">${validSvg}</div>`;
};

function generateSovereignArtifact(idOrType) {
  const uid = "sov-" + Math.random().toString(36).substring(2, 9);
  const targetKey = ALIAS_MAP[idOrType] || idOrType || "star1";

  // Item 13: Sovereign Master Card Widget
  if (targetKey === "wid1" || targetKey === "wid_mastercard") {
    const cardContent = renderMasterCardWidget(uid);
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 240 240" width="100%" height="100%" class="sovereign-artifact-svg sovereign-widget-svg">${cardContent}</svg>`;
  }

  // 12 Photorealistic 3D Collectibles
  const item = SOVEREIGN_3D_COLLECTIBLES[targetKey] || SOVEREIGN_3D_COLLECTIBLES.star1;
  const innerSvg = renderPhotorealisticVitrine(item, uid);

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 240 240" width="100%" height="100%" class="sovereign-artifact-svg" data-artifact-id="${item.id}" aria-label="${item.name}">${innerSvg}</svg>`;
}

// Export canonical generator
window.getSovereignArtifact = generateSovereignArtifact;

// Pre-populate registry with concrete SVGs for all known keys so lookups are instant
const registry = {};

const KNOWN_KEYS = [
  "star1", "star2", "star3", "star4", "star_sovereign", "star_zenith", "star", "star_grand_cross", "star_constellation",
  "crown1", "crown2", "crown3", "crown4", "crown_imperial", "crown_zenith", "crown", "apex_crown", "crown_sol", "crown_solaris", "crown_moritz",
  "aura1", "aura2", "aura3", "aura4", "aura_champagne", "aura_radial", "aura_celestial", "aura", "aura_guilloche", "aura_eclipse",
  "ring1", "ring2", "ring3", "ring4", "ring_monogram", "ring_onyx", "ring_emerald", "ring_falcon", "ring", "sovereign_signet", "ring_chrono",
  "art1", "art2", "art3", "art4", "art_horology", "art_tourbillon", "art_seal", "art_scepter", "art", "art_falcon_medallion",
  "wid1", "wid_mastercard",
  "frame1", "frame2", "frame3", "frame4", "badge1",
  "Jet", "Yacht", "Estate", "Watch", "Car", "Art", "Horse", "Island"
];

KNOWN_KEYS.forEach((k) => {
  registry[k] = generateSovereignArtifact(k);
});

// Bridge to window.SOVEREIGN_ARTIFACTS with safe local fallback
window.SOVEREIGN_ARTIFACTS = new Proxy(registry, {
  get(target, prop) {
    if (typeof prop === "string" && !(prop in target) && prop !== "toJSON" && prop !== "constructor") {
      const generated = generateSovereignArtifact(prop);
      target[prop] = generated;
      return generated;
    }
    return target[prop];
  },
});

// =========================================================
// THE 1% CLUB — SOVEREIGN COLLECTIBLES ARTIFACTS
// Ultra-realistic 3D metallic vector rendering for all 21 collectibles
// Real metal gradients, faceted gemstones, reflections, depth
// =========================================================

window.SOVEREIGN_ARTIFACTS = window.SOVEREIGN_ARTIFACTS || {};

// 1. CROWNS
window.SOVEREIGN_ARTIFACTS.crown_imperial = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="cr1_shadow" cx="50%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Vitrine Ground Ambient Shadow -->
  <ellipse cx="50" cy="84" rx="36" ry="7" fill="url(#sov_shadow)"/>
  <!-- Velvet Inner Dome Cap -->
  <path d="M22 66 Q50 32 78 66 Z" fill="#181120" stroke="url(#sov_gold_24k)" stroke-width="0.8"/>
  <!-- Back Arches (Titanium & Gold Edging) -->
  <path d="M30 66 Q50 36 50 25" stroke="url(#sov_titanium)" stroke-width="5" stroke-linecap="round"/>
  <path d="M70 66 Q50 36 50 25" stroke="url(#sov_titanium)" stroke-width="5" stroke-linecap="round"/>
  <path d="M30 66 Q50 36 50 25" stroke="url(#sov_gold_24k)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  <path d="M70 66 Q50 36 50 25" stroke="url(#sov_gold_24k)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  <!-- Front Arches -->
  <path d="M18 66 Q30 38 50 24" stroke="url(#sov_titanium)" stroke-width="6" stroke-linecap="round"/>
  <path d="M82 66 Q70 38 50 24" stroke="url(#sov_titanium)" stroke-width="6" stroke-linecap="round"/>
  <path d="M50 66 L50 24" stroke="url(#sov_titanium)" stroke-width="6" stroke-linecap="round"/>
  <path d="M18 66 Q30 38 50 24" stroke="url(#sov_gold_24k)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <path d="M82 66 Q70 38 50 24" stroke="url(#sov_gold_24k)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <path d="M50 66 L50 24" stroke="url(#sov_gold_24k)" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <!-- Crown Base Circlet Band -->
  <rect x="14" y="66" width="72" height="13" rx="4" fill="url(#sov_gold_24k)"/>
  <rect x="16" y="68" width="68" height="9" rx="2" fill="url(#sov_titanium)"/>
  <!-- Base Filigree & Beaded Jewels -->
  <circle cx="26" cy="72.5" r="3" fill="url(#sov_gold_24k)"/>
  <circle cx="26" cy="72.5" r="1.8" fill="url(#sov_onyx)"/>
  <circle cx="50" cy="72.5" r="4.2" fill="url(#sov_gold_24k)"/>
  <circle cx="50" cy="72.5" r="2.8" fill="url(#sov_onyx)"/>
  <circle cx="74" cy="72.5" r="3" fill="url(#sov_gold_24k)"/>
  <circle cx="74" cy="72.5" r="1.8" fill="url(#sov_onyx)"/>
  <!-- Fleur-de-lis Pinnacles -->
  <path d="M50 56 L53 66 H47 Z" fill="url(#sov_gold_24k)"/>
  <circle cx="50" cy="55" r="2" fill="#fff" opacity="0.95"/>
  <path d="M30 58 L32 66 H28 Z" fill="url(#sov_gold_24k)"/>
  <circle cx="30" cy="57" r="1.5" fill="#fff" opacity="0.9"/>
  <path d="M70 58 L72 66 H68 Z" fill="url(#sov_gold_24k)"/>
  <circle cx="70" cy="57" r="1.5" fill="#fff" opacity="0.9"/>
  <!-- Sovereign Finial Cross & Pearl -->
  <circle cx="50" cy="22" r="3.5" fill="url(#sov_gold_24k)"/>
  <path d="M47 16 H53 M50 13 V19" stroke="url(#sov_gold_24k)" stroke-width="2.2" stroke-linecap="square"/>
  <circle cx="50" cy="12" r="1.8" fill="#ffffff"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.crown_sol = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="cr2_shadow" cx="50%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cr2_lightGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fff8dc"/>
      <stop offset="50%" stop-color="#f5d77f"/>
      <stop offset="100%" stop-color="#d4af37"/>
    </linearGradient>
    <linearGradient id="cr2_darkGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a87922"/>
      <stop offset="50%" stop-color="#6d4c11"/>
      <stop offset="100%" stop-color="#3d2805"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="85" rx="38" ry="7" fill="url(#cr2_shadow)"/>
  <!-- 9 Solar Faceted Rays with 3D Center Ridge -->
  <!-- Ray 1 -->
  <polygon points="18,68 12,38 18,36" fill="url(#cr2_lightGold)"/>
  <polygon points="18,68 24,40 18,36" fill="url(#cr2_darkGold)"/>
  <!-- Ray 2 -->
  <polygon points="26,68 22,26 27,24" fill="url(#cr2_lightGold)"/>
  <polygon points="26,68 32,28 27,24" fill="url(#cr2_darkGold)"/>
  <!-- Ray 3 -->
  <polygon points="34,68 32,18 37,16" fill="url(#cr2_lightGold)"/>
  <polygon points="34,68 41,20 37,16" fill="url(#cr2_darkGold)"/>
  <!-- Ray 4 (Center Left) -->
  <polygon points="42,68 43,12 47,10" fill="url(#cr2_lightGold)"/>
  <polygon points="42,68 49,14 47,10" fill="url(#cr2_darkGold)"/>
  <!-- Center Apex Sun Ray -->
  <polygon points="50,68 47,8 50,6" fill="url(#cr2_lightGold)"/>
  <polygon points="50,68 53,8 50,6" fill="url(#cr2_darkGold)"/>
  <!-- Ray 6 (Center Right) -->
  <polygon points="58,68 53,10 57,12" fill="url(#cr2_lightGold)"/>
  <polygon points="58,68 59,14 57,12" fill="url(#cr2_darkGold)"/>
  <!-- Ray 7 -->
  <polygon points="66,68 63,16 68,18" fill="url(#cr2_lightGold)"/>
  <polygon points="66,68 69,20 68,18" fill="url(#cr2_darkGold)"/>
  <!-- Ray 8 -->
  <polygon points="74,68 73,24 78,26" fill="url(#cr2_lightGold)"/>
  <polygon points="74,68 79,28 78,26" fill="url(#cr2_darkGold)"/>
  <!-- Ray 9 -->
  <polygon points="82,68 82,36 88,38" fill="url(#cr2_lightGold)"/>
  <polygon points="82,68 87,40 88,38" fill="url(#cr2_darkGold)"/>
  <!-- Fluted Headband Base -->
  <path d="M12 68 Q50 60 88 68 L86 78 Q50 71 14 78 Z" fill="url(#cr2_lightGold)" stroke="url(#cr2_darkGold)" stroke-width="0.8"/>
  <!-- Pavé Diamond Band -->
  <circle cx="20" cy="73" r="1.5" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="28" cy="72" r="1.5" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="36" cy="71" r="1.6" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="44" cy="70" r="1.8" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="50" cy="69.5" r="2.4" fill="#ffffff" filter="drop-shadow(0 0 4px #fff)"/>
  <circle cx="56" cy="70" r="1.8" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="64" cy="71" r="1.6" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="72" cy="72" r="1.5" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="80" cy="73" r="1.5" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.crown_moritz = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="cr3_shadow" cx="50%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cr3_platLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <linearGradient id="cr3_platDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="50%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="85" rx="36" ry="6" fill="url(#cr3_shadow)"/>
  <!-- Frosted Platinum Geometric Crystals -->
  <polygon points="20,68 28,34 32,46" fill="url(#cr3_platLight)"/>
  <polygon points="32,46 28,34 36,68" fill="url(#cr3_platDark)"/>
  <polygon points="36,68 42,22 46,38" fill="url(#cr3_platLight)"/>
  <polygon points="46,38 42,22 50,68" fill="url(#cr3_platDark)"/>
  <polygon points="50,68 50,14 54,34" fill="url(#cr3_platLight)"/>
  <polygon points="54,34 50,14 58,68" fill="url(#cr3_platDark)"/>
  <polygon points="58,68 58,22 64,38" fill="url(#cr3_platLight)"/>
  <polygon points="64,38 58,22 68,68" fill="url(#cr3_platDark)"/>
  <polygon points="68,68 72,34 76,46" fill="url(#cr3_platLight)"/>
  <polygon points="76,46 72,34 80,68" fill="url(#cr3_platDark)"/>
  <!-- Baguette Diamonds on Peaks -->
  <polygon points="49,12 51,12 52,16 48,16" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)"/>
  <polygon points="41,20 43,20 44,24 40,24" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <polygon points="57,20 59,20 60,24 56,24" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <!-- Circlet Platinum Mirror Base -->
  <rect x="16" y="68" width="68" height="11" rx="3" fill="url(#cr3_platLight)" stroke="url(#cr3_platDark)" stroke-width="0.8"/>
  <rect x="20" y="71" width="60" height="5" rx="1.5" fill="url(#cr3_platDark)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.crown_zenith = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="cr4_shadow" cx="50%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cr4_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="45%" stop-color="#dcae4a"/>
      <stop offset="70%" stop-color="#9a6e1f"/>
      <stop offset="90%" stop-color="#5a3d0e"/>
      <stop offset="100%" stop-color="#2a1a05"/>
    </linearGradient>
    <linearGradient id="cr4_emTable" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7"/>
      <stop offset="50%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
    <linearGradient id="cr4_emFacet" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#065f46"/>
      <stop offset="100%" stop-color="#022c22"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="85" rx="38" ry="7" fill="url(#cr4_shadow)"/>
  <!-- Velvet Cap Inner -->
  <path d="M22 66 Q50 30 78 66 Z" fill="#0f2619" stroke="rgba(16,185,129,0.2)" stroke-width="0.8"/>
  <!-- Sculpted Baroque Gold Arches -->
  <path d="M18 66 C28 36, 42 22, 50 18 C58 22, 72 36, 82 66" stroke="url(#cr4_gold)" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M18 66 C28 36, 42 22, 50 18 C58 22, 72 36, 82 66" stroke="#fff" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.75"/>
  <path d="M50 66 L50 18" stroke="url(#cr4_gold)" stroke-width="7" stroke-linecap="round"/>
  <!-- Chiseled 24k Gold Base -->
  <rect x="14" y="66" width="72" height="13" rx="3" fill="url(#cr4_gold)"/>
  <!-- Beaded Rim Pearls -->
  <line x1="16" y1="68" x2="84" y2="68" stroke="#fff" stroke-width="1" stroke-dasharray="2 2"/>
  <line x1="16" y1="77" x2="84" y2="77" stroke="#fff" stroke-width="1" stroke-dasharray="2 2"/>
  <!-- Center Masterpiece Octagonal Colombian Emerald -->
  <!-- Emerald Prongs Basket -->
  <rect x="42" y="60" width="16" height="15" rx="3" fill="url(#cr4_gold)"/>
  <!-- Emerald Facets -->
  <polygon points="44,62 56,62 59,65 59,71 56,74 44,74 41,71 41,65" fill="url(#cr4_emFacet)"/>
  <polygon points="45,64 55,64 57,66 57,70 55,72 45,72 43,70 43,66" fill="url(#cr4_emTable)"/>
  <polygon points="45,64 55,64 54,66 46,66" fill="#a7f3d0" opacity="0.8"/>
  <!-- Flanking Emeralds -->
  <circle cx="26" cy="72.5" r="3.2" fill="url(#cr4_emTable)" stroke="url(#cr4_gold)" stroke-width="1"/>
  <circle cx="74" cy="72.5" r="3.2" fill="url(#cr4_emTable)" stroke="url(#cr4_gold)" stroke-width="1"/>
  <!-- Top Sovereign Cross with Emerald Center -->
  <circle cx="50" cy="16" r="3" fill="url(#cr4_gold)"/>
  <path d="M46 11 H54 M50 7 V15" stroke="url(#cr4_gold)" stroke-width="2.5" stroke-linecap="square"/>
  <circle cx="50" cy="11" r="1.5" fill="#a7f3d0" filter="drop-shadow(0 0 2px #fff)"/>
</svg>`;

// 2. RINGS
window.SOVEREIGN_ARTIFACTS.ring_monogram = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="rg1_shadow" cx="50%" cy="86%" r="40%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rg1_goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="85%" stop-color="#9a6e1f"/>
      <stop offset="100%" stop-color="#4a3206"/>
    </linearGradient>
    <linearGradient id="rg1_goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="60%" stop-color="#4e3308"/>
      <stop offset="100%" stop-color="#1f1402"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="86" rx="28" ry="6" fill="url(#rg1_shadow)"/>
  <!-- Solid 18k Gold Ring Shank (Lower Arc) -->
  <path d="M26 44 C26 72, 74 72, 74 44" stroke="url(#rg1_goldDark)" stroke-width="14" stroke-linecap="round"/>
  <path d="M26 44 C26 72, 74 72, 74 44" stroke="url(#rg1_goldLight)" stroke-width="10" stroke-linecap="round"/>
  <path d="M30 46 C30 68, 70 68, 70 46" stroke="#120c03" stroke-width="3" stroke-linecap="round"/>
  <!-- Stepped Shoulders -->
  <polygon points="22,42 34,26 34,46 22,50" fill="url(#rg1_goldLight)"/>
  <polygon points="78,42 66,26 66,46 78,50" fill="url(#rg1_goldDark)"/>
  <!-- Broad Octagonal Mirror-Polished Signet Face -->
  <polygon points="34,22 66,22 74,32 74,48 66,58 34,58 26,48 26,32" fill="url(#rg1_goldLight)" stroke="url(#rg1_goldDark)" stroke-width="1"/>
  <!-- Recessed Intaglio Center Bevel -->
  <polygon points="37,26 63,26 69,34 69,46 63,54 37,54 31,46 31,34" fill="url(#rg1_goldDark)"/>
  <polygon points="38,27 62,27 68,34 68,45 62,53 38,53 32,45 32,34" fill="url(#rg1_goldLight)"/>
  <!-- Deeply Engraved 1% Monogram -->
  <text x="50" y="44" font-family="'Cinzel', serif" font-size="14" font-weight="900" fill="#2b1a03" text-anchor="middle" letter-spacing="1">1%</text>
  <text x="50.5" y="44.5" font-family="'Cinzel', serif" font-size="14" font-weight="900" fill="#fff" text-anchor="middle" letter-spacing="1" opacity="0.3">1%</text>
</svg>`;

window.SOVEREIGN_ARTIFACTS.ring_onyx = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="rg2_shadow" cx="50%" cy="86%" r="40%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rg2_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#f5d77f"/>
      <stop offset="60%" stop-color="#b8860b"/>
      <stop offset="100%" stop-color="#4a3206"/>
    </linearGradient>
    <radialGradient id="rg2_onyx" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#3d3a38"/>
      <stop offset="45%" stop-color="#181514"/>
      <stop offset="100%" stop-color="#030303"/>
    </radialGradient>
  </defs>
  <ellipse cx="50" cy="86" rx="28" ry="6" fill="url(#rg2_shadow)"/>
  <!-- Gold Shank -->
  <path d="M26 44 C26 74, 74 74, 74 44" stroke="url(#rg2_gold)" stroke-width="12" stroke-linecap="round"/>
  <!-- Fluted Heavy Gallery -->
  <rect x="24" y="24" width="52" height="36" rx="8" fill="url(#rg2_gold)"/>
  <!-- Cushion-Cut Jet-Black Brazilian Onyx -->
  <rect x="28" y="28" width="44" height="28" rx="5" fill="url(#rg2_onyx)"/>
  <!-- Diagonal Crisp Specular Light Reflection Streak -->
  <polygon points="34,29 44,29 32,55 28,51" fill="#ffffff" opacity="0.35"/>
  <polygon points="46,29 50,29 42,55 38,55" fill="#ffffff" opacity="0.15"/>
  <!-- 4 Heavy 24k Gold Corner Prongs -->
  <circle cx="28" cy="28" r="3" fill="url(#rg2_gold)"/>
  <circle cx="72" cy="28" r="3" fill="url(#rg2_gold)"/>
  <circle cx="28" cy="56" r="3" fill="url(#rg2_gold)"/>
  <circle cx="72" cy="56" r="3" fill="url(#rg2_gold)"/>
  <!-- Micro Diamond Pins on Prongs -->
  <circle cx="28" cy="28" r="1.2" fill="#fff"/>
  <circle cx="72" cy="28" r="1.2" fill="#fff"/>
  <circle cx="28" cy="56" r="1.2" fill="#fff"/>
  <circle cx="72" cy="56" r="1.2" fill="#fff"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.ring_falcon = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="rg3_shadow" cx="50%" cy="86%" r="40%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rg3_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="85%" stop-color="#9a6e1f"/>
      <stop offset="100%" stop-color="#3a2205"/>
    </linearGradient>
    <linearGradient id="rg3_emerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6ee7b7"/>
      <stop offset="45%" stop-color="#10b981"/>
      <stop offset="85%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#022c22"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="86" rx="28" ry="6" fill="url(#rg3_shadow)"/>
  <!-- Ring Shank -->
  <path d="M26 44 C26 74, 74 74, 74 44" stroke="url(#rg3_gold)" stroke-width="12" stroke-linecap="round"/>
  <!-- Sculpted Gold Falcon Wings Wrapping the Center -->
  <path d="M16 48 C20 32, 28 24, 38 24 L36 36 C30 38, 24 44, 22 52 Z" fill="url(#rg3_gold)"/>
  <path d="M84 48 C80 32, 72 24, 62 24 L64 36 C70 38, 76 44, 78 52 Z" fill="url(#rg3_gold)"/>
  <!-- Wing Feather Engravings -->
  <path d="M18 42 L32 32 M20 48 L34 38 M22 54 L36 44" stroke="#5a3d0e" stroke-width="1"/>
  <path d="M82 42 L68 32 M80 48 L66 38 M78 54 L64 44" stroke="#5a3d0e" stroke-width="1"/>
  <!-- Center Octagonal Colombian Emerald Setting -->
  <rect x="34" y="24" width="32" height="36" rx="4" fill="url(#rg3_gold)"/>
  <polygon points="38,28 62,28 64,32 64,52 62,56 38,56 36,52 36,32" fill="url(#rg3_emerald)"/>
  <polygon points="40,30 60,30 61,33 61,51 60,54 40,54 39,51 39,33" fill="#047857"/>
  <polygon points="41,31 59,31 56,36 44,36" fill="#a7f3d0" opacity="0.8"/>
  <!-- Falcon Talons Gold Claws Holding the Stone -->
  <circle cx="36" cy="28" r="2.2" fill="url(#rg3_gold)"/>
  <circle cx="64" cy="28" r="2.2" fill="url(#rg3_gold)"/>
  <circle cx="36" cy="56" r="2.2" fill="url(#rg3_gold)"/>
  <circle cx="64" cy="56" r="2.2" fill="url(#rg3_gold)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.ring_chrono = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="rg4_shadow" cx="50%" cy="86%" r="40%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rg4_roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff2ea"/>
      <stop offset="25%" stop-color="#fad2c0"/>
      <stop offset="55%" stop-color="#e89f80"/>
      <stop offset="85%" stop-color="#b96a4c"/>
      <stop offset="100%" stop-color="#5a2918"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="86" rx="28" ry="6" fill="url(#rg4_shadow)"/>
  <!-- Rose Gold Ring Shank -->
  <path d="M26 44 C26 74, 74 74, 74 44" stroke="url(#rg4_roseGold)" stroke-width="12" stroke-linecap="round"/>
  <!-- Knurled Coin-Edge Outer Bezel -->
  <circle cx="50" cy="42" r="26" fill="url(#rg4_roseGold)"/>
  <circle cx="50" cy="42" r="26" stroke="#4a1e0f" stroke-width="1.2" stroke-dasharray="2 1.5"/>
  <!-- Inner Recessed Obsidian Dial -->
  <circle cx="50" cy="42" r="21" fill="#141110"/>
  <circle cx="50" cy="42" r="18" stroke="url(#rg4_roseGold)" stroke-width="0.8" opacity="0.6"/>
  <!-- 4 Horological Gold Screws at 12, 3, 6, 9 -->
  <circle cx="50" cy="27" r="2" fill="url(#rg4_roseGold)"/>
  <line x1="49" y1="27" x2="51" y2="27" stroke="#33140a" stroke-width="0.7"/>
  <circle cx="65" cy="42" r="2" fill="url(#rg4_roseGold)"/>
  <line x1="65" y1="41" x2="65" y2="43" stroke="#33140a" stroke-width="0.7"/>
  <circle cx="50" cy="57" r="2" fill="url(#rg4_roseGold)"/>
  <line x1="49" y1="57" x2="51" y2="57" stroke="#33140a" stroke-width="0.7"/>
  <circle cx="35" cy="42" r="2" fill="url(#rg4_roseGold)"/>
  <line x1="35" y1="41" x2="35" y2="43" stroke="#33140a" stroke-width="0.7"/>
  <!-- Central Exposed Balance Bridge & Ruby Bearing -->
  <rect x="44" y="38" width="12" height="8" rx="2" fill="url(#rg4_roseGold)"/>
  <circle cx="50" cy="42" r="2.8" fill="#e11d48" filter="drop-shadow(0 0 2px #f43f5e)"/>
  <circle cx="50" cy="42" r="1" fill="#fff" opacity="0.8"/>
</svg>`;

// 3. AURAS
window.SOVEREIGN_ARTIFACTS.aura_radial = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="au1_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8e0" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#f5d77f" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#b8860b" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#b8860b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="au1_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#f5d77f"/>
      <stop offset="70%" stop-color="#b8860b"/>
      <stop offset="100%" stop-color="#593c08"/>
    </linearGradient>
  </defs>
  <!-- Diffuse Glow Core -->
  <circle cx="50" cy="50" r="46" fill="url(#au1_glow)"/>
  <!-- 16 Beveled Metallic Radiance Spikes -->
  <g stroke="url(#au1_gold)" stroke-width="2.5" stroke-linecap="round">
    <line x1="50" y1="6" x2="50" y2="20"/>
    <line x1="50" y1="80" x2="50" y2="94"/>
    <line x1="6" y1="50" x2="20" y2="50"/>
    <line x1="80" y1="50" x2="94" y2="50"/>
    <line x1="19" y1="19" x2="29" y2="29"/>
    <line x1="71" y1="71" x2="81" y2="81"/>
    <line x1="81" y1="19" x2="71" y2="29"/>
    <line x1="19" y1="81" x2="29" y2="71"/>
  </g>
  <g stroke="url(#au1_gold)" stroke-width="1.4" stroke-linecap="round" opacity="0.75">
    <line x1="50" y1="12" x2="50" y2="22" transform="rotate(22.5 50 50)"/>
    <line x1="50" y1="12" x2="50" y2="22" transform="rotate(67.5 50 50)"/>
    <line x1="50" y1="12" x2="50" y2="22" transform="rotate(112.5 50 50)"/>
    <line x1="50" y1="12" x2="50" y2="22" transform="rotate(157.5 50 50)"/>
    <line x1="50" y1="12" x2="50" y2="22" transform="rotate(202.5 50 50)"/>
    <line x1="50" y1="12" x2="50" y2="22" transform="rotate(247.5 50 50)"/>
    <line x1="50" y1="12" x2="50" y2="22" transform="rotate(292.5 50 50)"/>
    <line x1="50" y1="12" x2="50" y2="22" transform="rotate(337.5 50 50)"/>
  </g>
  <!-- Concentric Lathe Guilloché Rings -->
  <circle cx="50" cy="50" r="32" stroke="url(#au1_gold)" stroke-width="1.8" fill="none"/>
  <circle cx="50" cy="50" r="28" stroke="#fff" stroke-width="0.8" stroke-dasharray="2 1.5" fill="none" opacity="0.8"/>
  <circle cx="50" cy="50" r="22" stroke="url(#au1_gold)" stroke-width="2.5" fill="none"/>
  <circle cx="50" cy="50" r="14" fill="url(#au1_gold)" filter="drop-shadow(0 0 6px #faecc5)"/>
  <circle cx="50" cy="50" r="8" fill="#ffffff"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.aura_guilloche = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="au2_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8e0" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#d4af37" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="au2_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f5d77f"/>
      <stop offset="70%" stop-color="#b8860b"/>
      <stop offset="100%" stop-color="#6d4c11"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="url(#au2_glow)"/>
  <!-- Overlapping Hypocycloid Guilloché Wave Petals -->
  <g fill="none" stroke="url(#au2_gold)" stroke-width="1.2" opacity="0.9">
    <ellipse cx="50" cy="50" rx="38" ry="14"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(15 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(30 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(45 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(60 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(75 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(90 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(105 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(120 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(135 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(150 50 50)"/>
    <ellipse cx="50" cy="50" rx="38" ry="14" transform="rotate(165 50 50)"/>
  </g>
  <!-- Outer Milled Bezel -->
  <circle cx="50" cy="50" r="41" stroke="url(#au2_gold)" stroke-width="2.5" fill="none"/>
  <circle cx="50" cy="50" r="43.5" stroke="#fff" stroke-width="0.8" stroke-dasharray="1.5 1.5" fill="none" opacity="0.7"/>
  <!-- Central Hub Medallion -->
  <circle cx="50" cy="50" r="10" fill="url(#au2_gold)"/>
  <circle cx="50" cy="50" r="6" fill="#140f06"/>
  <circle cx="50" cy="50" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.aura_eclipse = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="au3_corona" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8e0" stop-opacity="0"/>
      <stop offset="55%" stop-color="#f5d77f" stop-opacity="0.8"/>
      <stop offset="75%" stop-color="#d4af37" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#d4af37" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="au3_obsidian" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#2a2420"/>
      <stop offset="60%" stop-color="#120e0c"/>
      <stop offset="100%" stop-color="#020202"/>
    </radialGradient>
  </defs>
  <!-- Blazing Solar Corona -->
  <circle cx="50" cy="50" r="46" fill="url(#au3_corona)"/>
  <!-- Coronal Flare Spikes -->
  <g stroke="#f5d77f" stroke-width="1.5" opacity="0.6">
    <line x1="50" y1="8" x2="50" y2="2"/>
    <line x1="82" y1="18" x2="88" y2="12"/>
    <line x1="92" y1="50" x2="98" y2="50"/>
    <line x1="18" y1="82" x2="12" y2="88"/>
  </g>
  <!-- Obsidian Eclipse Disc -->
  <circle cx="50" cy="50" r="28" fill="url(#au3_obsidian)" stroke="#3a2e20" stroke-width="1.5"/>
  <!-- Specular Crescent Molten Gold Rim -->
  <path d="M24 50 A26 26 0 0 1 76 50" stroke="#ffffff" stroke-width="3" stroke-linecap="round" filter="drop-shadow(0 0 6px #fff)"/>
  <path d="M22 50 A28 28 0 0 1 78 50" stroke="#f5d77f" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Diamond Ring Flare at 1 o'clock -->
  <circle cx="68" cy="32" r="5" fill="#ffffff" filter="drop-shadow(0 0 8px #fff)"/>
  <polygon points="68,22 70,32 68,42 66,32" fill="#ffffff"/>
  <polygon points="58,32 68,34 78,32 68,30" fill="#ffffff"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.aura_celestial = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="au4_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fffdf5" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#faecc5" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#dcae4a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="au4_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#f5d77f"/>
      <stop offset="70%" stop-color="#b8860b"/>
      <stop offset="100%" stop-color="#593c08"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="url(#au4_glow)"/>
  <!-- Armillary Gyroscope Gimbal Rings -->
  <ellipse cx="50" cy="50" rx="42" ry="18" stroke="url(#au4_gold)" stroke-width="2.5" fill="none" transform="rotate(35 50 50)"/>
  <ellipse cx="50" cy="50" rx="42" ry="18" stroke="url(#au4_gold)" stroke-width="2.5" fill="none" transform="rotate(-35 50 50)"/>
  <circle cx="50" cy="50" r="32" stroke="url(#au4_gold)" stroke-width="2" fill="none"/>
  <circle cx="50" cy="50" r="34" stroke="#fff" stroke-width="0.8" stroke-dasharray="2 2" fill="none" opacity="0.8"/>
  <!-- Floating Stardust Nodes -->
  <circle cx="26" cy="32" r="2.2" fill="#fff" filter="drop-shadow(0 0 3px #fff)"/>
  <circle cx="74" cy="28" r="1.8" fill="#fff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="80" cy="62" r="2.5" fill="#fff" filter="drop-shadow(0 0 4px #fff)"/>
  <circle cx="28" cy="70" r="1.8" fill="#fff" filter="drop-shadow(0 0 2px #fff)"/>
  <circle cx="50" cy="14" r="2.2" fill="#fff" filter="drop-shadow(0 0 3px #fff)"/>
  <!-- Blazing Core -->
  <circle cx="50" cy="50" r="12" fill="url(#au4_gold)"/>
  <circle cx="50" cy="50" r="6" fill="#ffffff" filter="drop-shadow(0 0 6px #fff)"/>
</svg>`;

// 4. STARS
window.SOVEREIGN_ARTIFACTS.star_sovereign = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="st1_shadow" cx="50%" cy="86%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="st1_light" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#faecc5"/>
      <stop offset="70%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#9a6e1f"/>
    </linearGradient>
    <linearGradient id="st1_dark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7a5210"/>
      <stop offset="60%" stop-color="#4a3206"/>
      <stop offset="100%" stop-color="#231702"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#st1_shadow)"/>
  <!-- 8 Primary Faceted 3D Rays (Light facet on one side, dark facet on other) -->
  <!-- Top Ray -->
  <polygon points="50,50 43,26 50,8" fill="url(#st1_light)"/>
  <polygon points="50,50 50,8 57,26" fill="url(#st1_dark)"/>
  <!-- Top-Right Ray -->
  <polygon points="50,50 63,33 80,20" fill="url(#st1_light)"/>
  <polygon points="50,50 80,20 67,43" fill="url(#st1_dark)"/>
  <!-- Right Ray -->
  <polygon points="50,50 74,43 92,50" fill="url(#st1_light)"/>
  <polygon points="50,50 92,50 74,57" fill="url(#st1_dark)"/>
  <!-- Bottom-Right Ray -->
  <polygon points="50,50 67,57 80,80" fill="url(#st1_light)"/>
  <polygon points="50,50 80,80 57,67" fill="url(#st1_dark)"/>
  <!-- Bottom Ray -->
  <polygon points="50,50 57,74 50,92" fill="url(#st1_light)"/>
  <polygon points="50,50 50,92 43,74" fill="url(#st1_dark)"/>
  <!-- Bottom-Left Ray -->
  <polygon points="50,50 37,67 20,80" fill="url(#st1_light)"/>
  <polygon points="50,50 20,80 33,57" fill="url(#st1_dark)"/>
  <!-- Left Ray -->
  <polygon points="50,50 26,57 8,50" fill="url(#st1_light)"/>
  <polygon points="50,50 8,50 26,43" fill="url(#st1_dark)"/>
  <!-- Top-Left Ray -->
  <polygon points="50,50 33,43 20,20" fill="url(#st1_light)"/>
  <polygon points="50,50 20,20 43,33" fill="url(#st1_dark)"/>
  <!-- Central Sovereign Medallion -->
  <circle cx="50" cy="50" r="18" fill="url(#st1_dark)"/>
  <circle cx="50" cy="50" r="16" fill="url(#st1_light)"/>
  <circle cx="50" cy="50" r="14" stroke="#fff" stroke-width="1.2" stroke-dasharray="2 1.5" fill="none"/>
  <!-- Raised Intaglio Center Monogram -->
  <circle cx="50" cy="50" r="10" fill="#140f04" stroke="url(#st1_light)" stroke-width="1"/>
  <text x="50" y="54" font-family="'Cinzel', serif" font-size="9" font-weight="900" fill="url(#st1_light)" text-anchor="middle">1%</text>
</svg>`;

window.SOVEREIGN_ARTIFACTS.star_grand_cross = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="st2_shadow" cx="50%" cy="86%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="st2_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="85%" stop-color="#8f6211"/>
      <stop offset="100%" stop-color="#311c03"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#st2_shadow)"/>
  <!-- Diamond-Cut Sunburst Background Rays -->
  <g fill="url(#st2_gold)">
    <polygon points="50,50 25,25 22,20 28,24"/>
    <polygon points="50,50 75,25 78,20 72,24"/>
    <polygon points="50,50 75,75 78,80 72,76"/>
    <polygon points="50,50 25,75 22,80 28,76"/>
    <polygon points="50,50 35,16 38,12 40,18"/>
    <polygon points="50,50 65,16 62,12 60,18"/>
    <polygon points="50,50 84,35 88,38 82,40"/>
    <polygon points="50,50 84,65 88,62 82,60"/>
    <polygon points="50,50 65,84 62,88 60,82"/>
    <polygon points="50,50 35,84 38,88 40,82"/>
    <polygon points="50,50 16,65 12,62 18,60"/>
    <polygon points="50,50 16,35 12,38 18,40"/>
  </g>
  <!-- Grand Cross 4 Flared Arms with 3D Bevels -->
  <!-- Top Arm -->
  <polygon points="42,50 38,14 62,14 58,50" fill="url(#st2_gold)"/>
  <polygon points="42,50 38,14 50,14 50,50" fill="#ffffff" opacity="0.3"/>
  <!-- Bottom Arm -->
  <polygon points="42,50 38,86 62,86 58,50" fill="url(#st2_gold)"/>
  <polygon points="50,50 50,86 62,86 58,50" fill="#2b1a03" opacity="0.4"/>
  <!-- Left Arm -->
  <polygon points="50,42 14,38 14,62 50,58" fill="url(#st2_gold)"/>
  <polygon points="50,42 14,38 14,50 50,50" fill="#ffffff" opacity="0.3"/>
  <!-- Right Arm -->
  <polygon points="50,42 86,38 86,62 50,58" fill="url(#st2_gold)"/>
  <polygon points="50,50 86,50 86,62 50,58" fill="#2b1a03" opacity="0.4"/>
  <!-- Center Heraldic Medallion with Crown Crest -->
  <circle cx="50" cy="50" r="16" fill="url(#st2_gold)" stroke="#fff" stroke-width="1.2"/>
  <circle cx="50" cy="50" r="12" fill="#140f06"/>
  <!-- Crown Finial in Center -->
  <path d="M42 54 L44 46 L47 50 L50 44 L53 50 L56 46 L58 54 Z" fill="url(#st2_gold)"/>
  <circle cx="50" cy="43" r="1.2" fill="#fff"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.star_constellation = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="st3_shadow" cx="50%" cy="86%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="st3_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="60%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#593c08"/>
    </linearGradient>
    <radialGradient id="st3_sapphire" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="35%" stop-color="#0284c7"/>
      <stop offset="70%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </radialGradient>
  </defs>
  <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#st3_shadow)"/>
  <!-- 16 Chiseled Gold Rays -->
  <!-- 4 Cardinal Rays -->
  <polygon points="50,50 44,28 50,10 56,28" fill="url(#st3_gold)"/>
  <polygon points="50,50 44,72 50,90 56,72" fill="url(#st3_gold)"/>
  <polygon points="50,50 28,44 10,50 28,56" fill="url(#st3_gold)"/>
  <polygon points="50,50 72,44 90,50 72,56" fill="url(#st3_gold)"/>
  <!-- 4 Diagonal Rays -->
  <polygon points="50,50 40,32 22,22 32,40" fill="url(#st3_gold)"/>
  <polygon points="50,50 68,32 78,22 60,40" fill="url(#st3_gold)"/>
  <polygon points="50,50 68,68 78,78 60,60" fill="url(#st3_gold)"/>
  <polygon points="50,50 32,60 22,78 40,68" fill="url(#st3_gold)"/>
  <!-- 8 Intermediary Diamond-Cut Rays -->
  <polygon points="50,50 46,24 50,18" fill="#fff" opacity="0.6"/>
  <polygon points="50,50 54,24 50,18" fill="#000" opacity="0.3"/>
  <polygon points="50,50 76,46 82,50" fill="#fff" opacity="0.6"/>
  <polygon points="50,50 76,54 82,50" fill="#000" opacity="0.3"/>
  <!-- Center Brilliant Round-Cut Ceylon Royal Blue Sapphire -->
  <circle cx="50" cy="50" r="18" fill="url(#st3_gold)"/>
  <!-- Pavé Diamond Halo (12 Diamonds) -->
  <circle cx="50" cy="35" r="1.5" fill="#fff"/>
  <circle cx="58" cy="37" r="1.5" fill="#fff"/>
  <circle cx="63" cy="42" r="1.5" fill="#fff"/>
  <circle cx="65" cy="50" r="1.5" fill="#fff"/>
  <circle cx="63" cy="58" r="1.5" fill="#fff"/>
  <circle cx="58" cy="63" r="1.5" fill="#fff"/>
  <circle cx="50" cy="65" r="1.5" fill="#fff"/>
  <circle cx="42" cy="63" r="1.5" fill="#fff"/>
  <circle cx="37" cy="58" r="1.5" fill="#fff"/>
  <circle cx="35" cy="50" r="1.5" fill="#fff"/>
  <circle cx="37" cy="42" r="1.5" fill="#fff"/>
  <circle cx="42" cy="37" r="1.5" fill="#fff"/>
  <!-- Sapphire Gemstone -->
  <circle cx="50" cy="50" r="12" fill="url(#st3_sapphire)" stroke="url(#st3_gold)" stroke-width="1.2"/>
  <polygon points="46,44 54,44 58,50 54,56 46,56 42,50" fill="#38bdf8" opacity="0.4"/>
  <circle cx="48" cy="47" r="2.5" fill="#ffffff" opacity="0.8" filter="drop-shadow(0 0 2px #fff)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.star_zenith = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="st4_shadow" cx="50%" cy="86%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="st4_platLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <linearGradient id="st4_platDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="60%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="st4_champagne" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8e7"/>
      <stop offset="50%" stop-color="#f5d77f"/>
      <stop offset="100%" stop-color="#c49436"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#st4_shadow)"/>
  <!-- 8 Platinum Razor-Faceted Star Rays -->
  <!-- Top -->
  <polygon points="50,50 42,24 50,6" fill="url(#st4_platLight)"/>
  <polygon points="50,50 50,6 58,24" fill="url(#st4_platDark)"/>
  <!-- Top Right -->
  <polygon points="50,50 66,30 81,19" fill="url(#st4_platLight)"/>
  <polygon points="50,50 81,19 70,44" fill="url(#st4_platDark)"/>
  <!-- Right -->
  <polygon points="50,50 76,42 94,50" fill="url(#st4_platLight)"/>
  <polygon points="50,50 94,50 76,58" fill="url(#st4_platDark)"/>
  <!-- Bottom Right -->
  <polygon points="50,50 70,56 81,81" fill="url(#st4_platLight)"/>
  <polygon points="50,50 81,81 56,70" fill="url(#st4_platDark)"/>
  <!-- Bottom -->
  <polygon points="50,50 58,76 50,94" fill="url(#st4_platLight)"/>
  <polygon points="50,50 50,94 42,76" fill="url(#st4_platDark)"/>
  <!-- Bottom Left -->
  <polygon points="50,50 34,70 19,81" fill="url(#st4_platLight)"/>
  <polygon points="50,50 19,81 30,56" fill="url(#st4_platDark)"/>
  <!-- Left -->
  <polygon points="50,50 24,58 6,50" fill="url(#st4_platLight)"/>
  <polygon points="50,50 6,50 24,42" fill="url(#st4_platDark)"/>
  <!-- Top Left -->
  <polygon points="50,50 30,44 19,19" fill="url(#st4_platLight)"/>
  <polygon points="50,50 19,19 44,30" fill="url(#st4_platDark)"/>
  <!-- Inset Champagne Gold Chevrons -->
  <polygon points="50,22 47,32 53,32" fill="url(#st4_champagne)"/>
  <polygon points="78,50 68,47 68,53" fill="url(#st4_champagne)"/>
  <polygon points="50,78 47,68 53,68" fill="url(#st4_champagne)"/>
  <polygon points="22,50 32,47 32,53" fill="url(#st4_champagne)"/>
  <!-- Center Mirror Dome Platinum & Star Diamond -->
  <circle cx="50" cy="50" r="16" fill="url(#st4_platLight)" stroke="url(#st4_platDark)" stroke-width="1.5"/>
  <polygon points="50,40 53,47 60,50 53,53 50,60 47,53 40,50 47,47" fill="#ffffff" filter="drop-shadow(0 0 6px #fff)"/>
</svg>`;

// 5. RARE ARTIFACTS
window.SOVEREIGN_ARTIFACTS.art_tourbillon = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="ar1_shadow" cx="50%" cy="86%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ar1_roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff4ee"/>
      <stop offset="25%" stop-color="#fad2c0"/>
      <stop offset="55%" stop-color="#e89f80"/>
      <stop offset="85%" stop-color="#b96a4c"/>
      <stop offset="100%" stop-color="#5a2918"/>
    </linearGradient>
    <linearGradient id="ar1_brass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff8dc"/>
      <stop offset="50%" stop-color="#d4af37"/>
      <stop offset="100%" stop-color="#7a5210"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#ar1_shadow)"/>
  <!-- Top Winding Crown & Bow Ring at 12 o'clock -->
  <circle cx="50" cy="12" r="6" stroke="url(#ar1_roseGold)" stroke-width="2.5" fill="none"/>
  <rect x="47" y="16" width="6" height="6" rx="1.5" fill="url(#ar1_roseGold)"/>
  <circle cx="50" cy="12" r="2.2" fill="#1d4ed8"/>
  <!-- 18k Rose Gold Fluted Watch Case -->
  <circle cx="50" cy="54" r="34" fill="url(#ar1_roseGold)"/>
  <circle cx="50" cy="54" r="34" stroke="#4a1e0f" stroke-width="1.2" stroke-dasharray="2 1.5"/>
  <!-- Chapter Ring Dial (Ivory Enamel) -->
  <circle cx="50" cy="54" r="28" fill="#141110"/>
  <circle cx="50" cy="54" r="26" stroke="url(#ar1_roseGold)" stroke-width="1" opacity="0.6"/>
  <!-- Exposed Mechanical Gear Train -->
  <circle cx="42" cy="46" r="10" stroke="url(#ar1_brass)" stroke-width="1.8" stroke-dasharray="2 1" fill="none"/>
  <circle cx="58" cy="44" r="8" stroke="url(#ar1_brass)" stroke-width="1.8" stroke-dasharray="2 1" fill="none"/>
  <!-- Visible Rotating Flying Tourbillon Cage at 6 o'clock -->
  <circle cx="50" cy="62" r="10" stroke="url(#ar1_roseGold)" stroke-width="1.5" fill="#0a0807"/>
  <circle cx="50" cy="62" r="8" stroke="url(#ar1_brass)" stroke-width="1.2" fill="none"/>
  <!-- Tourbillon Balance Bridge (3-Spoke) -->
  <line x1="50" y1="54" x2="50" y2="70" stroke="url(#ar1_roseGold)" stroke-width="1.5"/>
  <line x1="42" y1="62" x2="58" y2="62" stroke="url(#ar1_roseGold)" stroke-width="1.5"/>
  <circle cx="50" cy="62" r="2" fill="#e11d48"/>
  <!-- Blued Steel Breguet Hands -->
  <line x1="50" y1="54" x2="50" y2="38" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" filter="drop-shadow(0 0 2px #0284c7)"/>
  <circle cx="50" cy="42" r="1.5" fill="#38bdf8"/>
  <line x1="50" y1="54" x2="62" y2="50" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round" filter="drop-shadow(0 0 2px #0284c7)"/>
  <circle cx="50" cy="54" r="2.5" fill="url(#ar1_roseGold)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.art_seal = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="ar2_shadow" cx="50%" cy="86%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.65"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ar2_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="85%" stop-color="#8f6211"/>
      <stop offset="100%" stop-color="#311c03"/>
    </linearGradient>
    <linearGradient id="ar2_obsidian" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38332e"/>
      <stop offset="45%" stop-color="#181513"/>
      <stop offset="70%" stop-color="#2a2420"/>
      <stop offset="100%" stop-color="#080706"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#ar2_shadow)"/>
  <!-- Octagonal Hand-Carved Black Obsidian Grip Handle -->
  <polygon points="44,14 56,14 62,24 62,48 56,58 44,58 38,48 38,24" fill="url(#ar2_obsidian)" stroke="#4a3e35" stroke-width="1"/>
  <!-- Specular Reflection on Obsidian Facet -->
  <polygon points="46,16 54,16 58,24 58,46 54,56 48,56" fill="#ffffff" opacity="0.18"/>
  <!-- Top 24k Gold Finial Crown on Handle -->
  <circle cx="50" cy="14" r="4.5" fill="url(#ar2_gold)"/>
  <circle cx="50" cy="13" r="1.5" fill="#fff"/>
  <!-- Fluted 24k Gold Transition Collar -->
  <rect x="36" y="58" width="28" height="6" rx="2" fill="url(#ar2_gold)"/>
  <line x1="40" y1="58" x2="40" y2="64" stroke="#5a3d0e" stroke-width="1"/>
  <line x1="50" y1="58" x2="50" y2="64" stroke="#5a3d0e" stroke-width="1"/>
  <line x1="60" y1="58" x2="60" y2="64" stroke="#5a3d0e" stroke-width="1"/>
  <!-- Heavy Solid Cast Brass Seal Matrix Base -->
  <rect x="22" y="64" width="56" height="12" rx="3" fill="url(#ar2_gold)"/>
  <rect x="20" y="74" width="60" height="7" rx="2" fill="url(#ar2_gold)" stroke="#3d2605" stroke-width="0.8"/>
  <!-- Reverse-Engraved Sovereign Seal Groove on Base -->
  <circle cx="50" cy="77.5" r="2.8" fill="#1f1402"/>
  <circle cx="50" cy="77.5" r="1.5" fill="url(#ar2_gold)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.art_falcon_medallion = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="ar3_shadow" cx="50%" cy="88%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ar3_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="85%" stop-color="#8f6211"/>
      <stop offset="100%" stop-color="#311c03"/>
    </linearGradient>
    <linearGradient id="ar3_ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7f1d1d"/>
      <stop offset="35%" stop-color="#b91c1c"/>
      <stop offset="50%" stop-color="#dcae4a"/>
      <stop offset="65%" stop-color="#b91c1c"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#ar3_shadow)"/>
  <!-- Crimson & Gold Moiré Silk Ribbon -->
  <polygon points="36,6 64,6 68,32 32,32" fill="url(#ar3_ribbon)"/>
  <line x1="50" y1="6" x2="50" y2="32" stroke="#faecc5" stroke-width="2"/>
  <!-- Heavy Gold Suspension Ring & Ribbon Mount -->
  <rect x="44" y="28" width="12" height="6" rx="2" fill="url(#ar3_gold)"/>
  <circle cx="50" cy="34" r="5" stroke="url(#ar3_gold)" stroke-width="2.5" fill="none"/>
  <!-- Heavy 24k Gold Cast Medallion -->
  <circle cx="50" cy="62" r="26" fill="url(#ar3_gold)"/>
  <!-- Open-work Laurel Wreath Border -->
  <circle cx="50" cy="62" r="23" stroke="#2b1a03" stroke-width="1.2" stroke-dasharray="3 2" fill="none"/>
  <!-- Recessed Inner Field -->
  <circle cx="50" cy="62" r="20" fill="#140f06"/>
  <!-- Bas-Relief Sculpted Sovereign Falcon -->
  <path d="M50 48 C52 50, 56 50, 57 53 C55 54, 53 54, 50 56 C47 54, 45 54, 43 53 C44 50, 48 50, 50 48 Z" fill="url(#ar3_gold)"/>
  <!-- Wings Spread in Gold Relief -->
  <path d="M50 54 Q34 50 32 64 Q42 62 48 60 Z" fill="url(#ar3_gold)"/>
  <path d="M50 54 Q66 50 68 64 Q58 62 52 60 Z" fill="url(#ar3_gold)"/>
  <!-- Emerald Eye on Falcon -->
  <circle cx="51" cy="51" r="1" fill="#10b981" filter="drop-shadow(0 0 1px #fff)"/>
  <!-- Tail & Talons -->
  <polygon points="47,60 53,60 54,72 50,75 46,72" fill="url(#ar3_gold)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.art_scepter = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="ar4_shadow" cx="50%" cy="88%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ar4_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="85%" stop-color="#8f6211"/>
      <stop offset="100%" stop-color="#311c03"/>
    </linearGradient>
    <linearGradient id="ar4_obsidian" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38332e"/>
      <stop offset="50%" stop-color="#14110f"/>
      <stop offset="100%" stop-color="#030302"/>
    </linearGradient>
    <radialGradient id="ar4_ruby" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fecdd3"/>
      <stop offset="35%" stop-color="#f43f5e"/>
      <stop offset="75%" stop-color="#9f1239"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </radialGradient>
  </defs>
  <ellipse cx="50" cy="88" rx="26" ry="5" fill="url(#ar4_shadow)"/>
  <!-- Fluted Obsidian Scepter Shaft -->
  <rect x="46" y="38" width="8" height="48" rx="4" fill="url(#ar4_obsidian)" stroke="#4a3e35" stroke-width="0.8"/>
  <!-- Gold Spiral Filigree Ring Collars on Shaft -->
  <line x1="46" y1="46" x2="54" y2="48" stroke="url(#ar4_gold)" stroke-width="2"/>
  <line x1="46" y1="56" x2="54" y2="58" stroke="url(#ar4_gold)" stroke-width="2"/>
  <line x1="46" y1="66" x2="54" y2="68" stroke="url(#ar4_gold)" stroke-width="2"/>
  <line x1="46" y1="76" x2="54" y2="78" stroke="url(#ar4_gold)" stroke-width="2"/>
  <rect x="45" y="82" width="10" height="4" rx="2" fill="url(#ar4_gold)"/>
  <!-- Acanthus Leaf Gold Capital Supporting the Orb -->
  <path d="M42 38 L58 38 L54 32 L46 32 Z" fill="url(#ar4_gold)"/>
  <circle cx="50" cy="24" r="14" fill="url(#ar4_gold)"/>
  <!-- Equatorial & Polar Jeweled Bands on Orb -->
  <ellipse cx="50" cy="24" rx="14" ry="4" stroke="#fff" stroke-width="1.2" fill="none"/>
  <ellipse cx="50" cy="24" rx="4" ry="14" stroke="#fff" stroke-width="1.2" fill="none"/>
  <!-- Top Imperial Cross with Faceted Ruby -->
  <path d="M44 8 H56 M50 2 V14" stroke="url(#ar4_gold)" stroke-width="3" stroke-linecap="square"/>
  <circle cx="50" cy="8" r="2.8" fill="url(#ar4_ruby)" filter="drop-shadow(0 0 3px #f43f5e)"/>
</svg>`;

// 6. WIDGET MASTERCARD & FALLBACKS
window.SOVEREIGN_ARTIFACTS.wid_mastercard = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg">
  <defs>
    <radialGradient id="wm_shadow" cx="50%" cy="86%" r="42%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wm_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="50%" stop-color="#dcae4a"/>
      <stop offset="80%" stop-color="#9a6e1f"/>
      <stop offset="100%" stop-color="#3a2205"/>
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="86" rx="36" ry="6" fill="url(#wm_shadow)"/>
  <!-- Obsidian Card Slab -->
  <rect x="14" y="24" width="72" height="52" rx="6" fill="#0d0b09" stroke="url(#wm_gold)" stroke-width="2"/>
  <!-- Guilloché Inner Border -->
  <rect x="18" y="28" width="64" height="44" rx="4" fill="none" stroke="url(#wm_gold)" stroke-width="0.8" stroke-dasharray="3 1.5" opacity="0.7"/>
  <!-- Mini Portrait Medallion with Gold Ring -->
  <circle cx="34" cy="48" r="11" fill="#1a140d" stroke="url(#wm_gold)" stroke-width="1.8"/>
  <circle cx="34" cy="48" r="9" fill="#0d0a07"/>
  <circle cx="34" cy="45" r="4" fill="url(#wm_gold)"/>
  <path d="M26 56 Q34 52 42 56 Z" fill="url(#wm_gold)"/>
  <!-- Sovereign Engraved Identity Bars -->
  <rect x="50" y="42" width="26" height="3" rx="1.5" fill="url(#wm_gold)"/>
  <rect x="50" y="49" width="18" height="2.5" rx="1" fill="#8c806a"/>
  <rect x="50" y="55" width="22" height="2.5" rx="1" fill="url(#wm_gold)" opacity="0.8"/>
  <!-- Sovereign Crown Hallmark -->
  <path d="M74 34 L76 38 L80 34 L78 40 L72 40 Z" fill="url(#wm_gold)"/>
</svg>`;

window.SOVEREIGN_ARTIFACTS.star = window.SOVEREIGN_ARTIFACTS.star_sovereign;
window.SOVEREIGN_ARTIFACTS.crown = window.SOVEREIGN_ARTIFACTS.crown_zenith;
window.SOVEREIGN_ARTIFACTS.aura = window.SOVEREIGN_ARTIFACTS.aura_radial;
window.SOVEREIGN_ARTIFACTS.ring = window.SOVEREIGN_ARTIFACTS.ring_falcon;
window.SOVEREIGN_ARTIFACTS.pendant = window.SOVEREIGN_ARTIFACTS.art_falcon_medallion;

// =========================================================
// 7. SOVEREIGN CRYSTAL CLOCHE VITRINE DOME RENDERER
// As specified in the master approved reference image
// =========================================================
window.renderClocheVitrine = function(artifactSvg, isObsidianBase = false, uid = "1") {
  const baseFill = isObsidianBase 
    ? `url(#cloche_obsidian_${uid})` 
    : `url(#cloche_marble_${uid})`;

  return `
<div class="cloche-vitrine-chamber">
  <svg class="cloche-vitrine-svg" viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Sunburst Guilloché Gradient -->
      <radialGradient id="cloche_sunburst_${uid}" cx="50%" cy="42%" r="58%">
        <stop offset="0%" stop-color="#fff8e4" stop-opacity="0.95"/>
        <stop offset="45%" stop-color="#faedd0" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#faedd0" stop-opacity="0"/>
      </radialGradient>
      <!-- 24K Gold Pedestal Ring Gradient -->
      <linearGradient id="cloche_gold_${uid}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="15%" stop-color="#fdf5d6"/>
        <stop offset="40%" stop-color="#d4af37"/>
        <stop offset="65%" stop-color="#9a6e1f"/>
        <stop offset="85%" stop-color="#d4af37"/>
        <stop offset="100%" stop-color="#5a3d0e"/>
      </linearGradient>
      <!-- Ivory Fluted Marble Gradient -->
      <linearGradient id="cloche_marble_${uid}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="25%" stop-color="#f7f2e7"/>
        <stop offset="50%" stop-color="#e8dcbe"/>
        <stop offset="75%" stop-color="#f3ebd9"/>
        <stop offset="100%" stop-color="#cfbca0"/>
      </linearGradient>
      <!-- Black Obsidian Marble Gradient -->
      <linearGradient id="cloche_obsidian_${uid}" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3c3630"/>
        <stop offset="25%" stop-color="#1c1815"/>
        <stop offset="50%" stop-color="#0a0807"/>
        <stop offset="75%" stop-color="#241e1a"/>
        <stop offset="100%" stop-color="#080706"/>
      </linearGradient>
      <!-- Crystal Glass Dome Surface Gradient -->
      <radialGradient id="cloche_glass_${uid}" cx="42%" cy="30%" r="68%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
        <stop offset="40%" stop-color="#fdfbf5" stop-opacity="0.22"/>
        <stop offset="75%" stop-color="#edd9b4" stop-opacity="0.14"/>
        <stop offset="96%" stop-color="#c5a059" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.75"/>
      </radialGradient>
      <!-- Contact Shadow beneath Pedestal -->
      <radialGradient id="cloche_shadow_${uid}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.35"/>
        <stop offset="55%" stop-color="#000000" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- 1. Background Guilloché Sunburst Etchings -->
    <circle cx="80" cy="68" r="62" fill="url(#cloche_sunburst_${uid})"/>
    <g stroke="#dcc89e" stroke-width="0.6" opacity="0.5">
      <line x1="80" y1="8" x2="80" y2="128"/>
      <line x1="20" y1="68" x2="140" y2="68"/>
      <line x1="37" y1="25" x2="123" y2="111"/>
      <line x1="123" y1="25" x2="37" y2="111"/>
      <line x1="24" y1="44" x2="136" y2="92"/>
      <line x1="136" y1="44" x2="24" y2="92"/>
      <line x1="44" y1="24" x2="116" y2="112"/>
      <line x1="116" y1="24" x2="44" y2="112"/>
    </g>
    <circle cx="80" cy="68" r="54" stroke="#dcc89e" stroke-width="0.5" stroke-dasharray="2 2" fill="none" opacity="0.45"/>

    <!-- 2. Floor Ambient Contact Shadow -->
    <ellipse cx="80" cy="146" rx="52" ry="8" fill="url(#cloche_shadow_${uid})"/>

    <!-- 3. Crystal Glass Dome Body -->
    <circle cx="80" cy="68" r="48" fill="url(#cloche_glass_${uid})"/>
    <circle cx="80" cy="68" r="48" stroke="url(#cloche_gold_${uid})" stroke-width="1.2" opacity="0.85"/>

    <!-- 4. The 3D Sovereign Artifact Suspended Inside -->
    <g transform="translate(32, 20) scale(0.96)">
      ${artifactSvg}
    </g>

    <!-- 5. Glass Curved Highlights & Specular Reflections -->
    <!-- Top-Left Curved Crystal Highlight -->
    <path d="M48 34 C58 26, 74 24, 90 26 C76 25, 58 28, 48 34 Z" fill="#ffffff" opacity="0.9"/>
    <ellipse cx="56" cy="38" rx="6" ry="12" fill="#ffffff" opacity="0.3" transform="rotate(-30 56 38)"/>
    <!-- Right rim thin specular arc -->
    <path d="M124 50 A 46 46 0 0 1 124 86" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.75"/>

    <!-- 6. Stepped Circular Pedestal (Plinth) -->
    <!-- Plinth Upper Ring (Polished 24k Gold) -->
    <ellipse cx="80" cy="122" rx="42" ry="7" fill="url(#cloche_gold_${uid})" stroke="#7a5210" stroke-width="0.8"/>
    <!-- Plinth Column Body (Fluted Ivory Marble / Black Obsidian) -->
    <path d="M38 122 L38 134 C38 140, 122 140, 122 134 L122 122 Z" fill="${baseFill}" stroke="#7a5210" stroke-width="0.8"/>
    <!-- Fluting Lines on Pedestal Body -->
    <g stroke="rgba(212,175,106,0.4)" stroke-width="0.8">
      <line x1="52" y1="124" x2="52" y2="136"/>
      <line x1="66" y1="125.5" x2="66" y2="138"/>
      <line x1="80" y1="126" x2="80" y2="138.5"/>
      <line x1="94" y1="125.5" x2="94" y2="138"/>
      <line x1="108" y1="124" x2="108" y2="136"/>
    </g>
    <!-- Plinth Lower Base Step (Heavy 24k Gold Rim) -->
    <path d="M34 134 L34 141 C34 147, 126 147, 126 141 L126 134 Z" fill="url(#cloche_gold_${uid})" stroke="#4a3206" stroke-width="0.8"/>
    <ellipse cx="80" cy="141" rx="44" ry="5.5" fill="none" stroke="#ffffff" stroke-width="0.8" opacity="0.7"/>
  </svg>
</div>`;
};




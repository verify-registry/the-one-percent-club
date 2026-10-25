// =========================================================
// THE 1% CLUB — SOVEREIGN COLLECTIBLES ARTIFACTS
// Master Collection · Haute Horlogerie & High Jewelry Standards
// Ultra-realistic 3D metallic vector rendering for all 21 collectibles
// Real metal gradients, faceted gemstones, reflections, physical depth
// =========================================================

window.SOVEREIGN_ARTIFACTS = window.SOVEREIGN_ARTIFACTS || {};

// =========================================================
// 1. CROWNS
// =========================================================

// (1) crown1 — Imperial Geometric Obsidian Diadem
window.SOVEREIGN_ARTIFACTS.crown_imperial = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cr1_shadow" cx="50%" cy="88%" r="46%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cr1_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="65%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="cr1_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="45%" stop-color="#55380b"/>
      <stop offset="85%" stop-color="#321e04"/>
      <stop offset="100%" stop-color="#180d01"/>
    </linearGradient>
    <linearGradient id="cr1_obsidianLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4a423a"/>
      <stop offset="50%" stop-color="#2a241f"/>
      <stop offset="100%" stop-color="#120f0d"/>
    </linearGradient>
    <linearGradient id="cr1_obsidianShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1c1815"/>
      <stop offset="60%" stop-color="#090807"/>
      <stop offset="100%" stop-color="#020202"/>
    </linearGradient>
    <linearGradient id="cr1_emTable" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="45%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="cr1_emFacet" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#166534"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <ellipse cx="50" cy="88" rx="38" ry="6" fill="url(#cr1_shadow)"/>

  <!-- Velvet/Obsidian Inner Cap (Faceted Origami Polyhedron) -->
  <polygon points="26,66 38,40 50,32 62,40 74,66 50,62" fill="url(#cr1_obsidianShd)"/>
  <polygon points="50,32 38,40 50,62" fill="url(#cr1_obsidianLit)" opacity="0.6"/>
  <polygon points="50,32 62,40 50,62" fill="url(#cr1_obsidianShd)"/>

  <!-- Rear Geometric Spires (Dark Gold & Obsidian) -->
  <polygon points="32,64 36,24 40,64" fill="url(#cr1_goldShd)"/>
  <polygon points="60,64 64,24 68,64" fill="url(#cr1_goldShd)"/>
  <polygon points="46,62 50,14 54,62" fill="url(#cr1_goldShd)"/>

  <!-- Main Front Architectural Polygonal Spires (Split Lit/Shadow Facets) -->
  <!-- Center Monarch Spire (Peak at y=12) -->
  <polygon points="50,12 43,62 50,58" fill="url(#cr1_goldLit)"/>
  <polygon points="50,12 57,62 50,58" fill="url(#cr1_goldShd)"/>
  <line x1="50" y1="12" x2="50" y2="58" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>
  <!-- Center Apex Rhombus Diamond -->
  <polygon points="50,8 52.5,12 50,16 47.5,12" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>

  <!-- Left Inner Spire (Peak at y=20) -->
  <polygon points="36,20 30,64 36,60" fill="url(#cr1_goldLit)"/>
  <polygon points="36,20 42,63 36,60" fill="url(#cr1_goldShd)"/>
  <line x1="36" y1="20" x2="36" y2="60" stroke="#ffffff" stroke-width="0.7" opacity="0.9"/>
  <polygon points="36,17 38,20 36,23 34,20" fill="#ffffff"/>

  <!-- Right Inner Spire (Peak at y=20) -->
  <polygon points="64,20 58,63 64,60" fill="url(#cr1_goldLit)"/>
  <polygon points="64,20 70,64 64,60" fill="url(#cr1_goldShd)"/>
  <line x1="64" y1="20" x2="64" y2="60" stroke="#ffffff" stroke-width="0.7" opacity="0.9"/>
  <polygon points="64,17 66,20 64,23 62,20" fill="#ffffff"/>

  <!-- Left Outer Spire (Peak at y=32) -->
  <polygon points="22,32 17,66 23,62" fill="url(#cr1_goldLit)"/>
  <polygon points="22,32 28,65 23,62" fill="url(#cr1_goldShd)"/>
  <line x1="22" y1="32" x2="23" y2="62" stroke="#ffffff" stroke-width="0.6" opacity="0.8"/>
  <polygon points="22,29 24,32 22,35 20,32" fill="#ffffff"/>

  <!-- Right Outer Spire (Peak at y=32) -->
  <polygon points="78,32 72,65 77,62" fill="url(#cr1_goldLit)"/>
  <polygon points="78,32 83,66 77,62" fill="url(#cr1_goldShd)"/>
  <line x1="78" y1="32" x2="77" y2="62" stroke="#ffffff" stroke-width="0.6" opacity="0.8"/>
  <polygon points="78,29 80,32 78,35 76,32" fill="#ffffff"/>

  <!-- Far Edge Mini Spires -->
  <polygon points="12,46 10,68 15,66" fill="url(#cr1_goldLit)"/>
  <polygon points="88,46 85,66 90,68" fill="url(#cr1_goldShd)"/>

  <!-- Stepped Geometric Ziggurat Base Band -->
  <!-- Upper Chamfer Ridge (Lit) -->
  <polygon points="11,66 89,66 86,70 14,70" fill="url(#cr1_goldLit)"/>
  <!-- Middle Obsidian Channel with Laser Inset -->
  <polygon points="14,70 86,70 85,78 15,78" fill="url(#cr1_obsidianShd)"/>
  <!-- Laser Guilloché Rhombus Line -->
  <g stroke="url(#cr1_goldLit)" stroke-width="0.6" fill="none" opacity="0.75">
    <polygon points="20,74 24,71 28,74 24,77"/>
    <polygon points="34,74 38,71 42,74 38,77"/>
    <polygon points="58,74 62,71 66,74 62,77"/>
    <polygon points="72,74 76,71 80,74 76,77"/>
  </g>
  <!-- Lower Stepped Base Plinth (Chiseled Gold) -->
  <polygon points="12,78 88,78 85,83 15,83" fill="url(#cr1_goldLit)"/>
  <polygon points="15,83 85,83 83,86 17,86" fill="url(#cr1_goldShd)"/>
  <line x1="12" y1="78" x2="88" y2="78" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- Centerpiece: Octagonal Stepped Colombian Emerald -->
  <!-- Beveled Gold Octagonal Bezel -->
  <polygon points="45,67 55,67 60,72 60,78 55,83 45,83 40,78 40,72" fill="url(#cr1_goldLit)" stroke="#321e04" stroke-width="0.6"/>
  <!-- Emerald Outer Step Facets -->
  <polygon points="46,68 54,68 58,72 58,78 54,82 46,82 42,78 42,72" fill="url(#cr1_emFacet)"/>
  <!-- Emerald Center Table -->
  <polygon points="47.5,70 52.5,70 55.5,73 55.5,77 52.5,80 47.5,80 44.5,77 44.5,73" fill="url(#cr1_emTable)"/>
  <!-- Geometric Table Glint -->
  <polygon points="47.5,70 52.5,70 51,72 49,72" fill="#ffffff" opacity="0.8"/>

  <!-- Flanking Geometric Rhombus Diamonds -->
  <polygon points="28,74 31,71 34,74 31,77" fill="#ffffff" stroke="url(#cr1_goldLit)" stroke-width="0.5"/>
  <polygon points="66,74 69,71 72,74 69,77" fill="#ffffff" stroke="url(#cr1_goldLit)" stroke-width="0.5"/>
</svg>`;

// (2) crown2 — Diadem of the Sovereign Sol (Geometric Solar Coronet)
window.SOVEREIGN_ARTIFACTS.crown_sol = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cr2_shadow" cx="50%" cy="88%" r="46%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cr2_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#f5d061"/>
      <stop offset="100%" stop-color="#d4af37"/>
    </linearGradient>
    <linearGradient id="cr2_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9a6e1f"/>
      <stop offset="50%" stop-color="#6a450a"/>
      <stop offset="100%" stop-color="#2a1802"/>
    </linearGradient>
    <linearGradient id="cr2_canary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <ellipse cx="50" cy="88" rx="38" ry="6" fill="url(#cr2_shadow)"/>

  <!-- 13 Chiseled 3D Geometric Rhombus Solar Blades (Arranged at precise angular symmetry) -->
  <!-- Ray 1 (Center High Monarch Ray, Peak at y=6) -->
  <polygon points="50,6 47,56 50,54" fill="url(#cr2_goldLit)"/>
  <polygon points="50,6 53,56 50,54" fill="url(#cr2_goldShd)"/>
  <line x1="50" y1="6" x2="50" y2="54" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>
  <polygon points="50,3 52,6 50,9 48,6" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>

  <!-- Ray 2 (Left 1, Peak at y=11) -->
  <polygon points="43,11 39,58 43,56" fill="url(#cr2_goldLit)"/>
  <polygon points="43,11 47,57 43,56" fill="url(#cr2_goldShd)"/>
  <line x1="43" y1="11" x2="43" y2="56" stroke="#ffffff" stroke-width="0.75" opacity="0.9"/>
  <polygon points="43,8 45,11 43,14 41,11" fill="#ffffff"/>

  <!-- Ray 3 (Right 1, Peak at y=11) -->
  <polygon points="57,11 53,57 57,56" fill="url(#cr2_goldLit)"/>
  <polygon points="57,11 61,58 57,56" fill="url(#cr2_goldShd)"/>
  <line x1="57" y1="11" x2="57" y2="56" stroke="#ffffff" stroke-width="0.75" opacity="0.9"/>
  <polygon points="57,8 59,11 57,14 55,11" fill="#ffffff"/>

  <!-- Ray 4 (Left 2, Peak at y=18) -->
  <polygon points="36,18 31,60 36,58" fill="url(#cr2_goldLit)"/>
  <polygon points="36,18 40,59 36,58" fill="url(#cr2_goldShd)"/>
  <line x1="36" y1="18" x2="36" y2="58" stroke="#ffffff" stroke-width="0.7" opacity="0.85"/>
  <polygon points="36,15 38,18 36,21 34,18" fill="#ffffff"/>

  <!-- Ray 5 (Right 2, Peak at y=18) -->
  <polygon points="64,18 60,59 64,58" fill="url(#cr2_goldLit)"/>
  <polygon points="64,18 69,60 64,58" fill="url(#cr2_goldShd)"/>
  <line x1="64" y1="18" x2="64" y2="58" stroke="#ffffff" stroke-width="0.7" opacity="0.85"/>
  <polygon points="64,15 66,18 64,21 62,18" fill="#ffffff"/>

  <!-- Ray 6 (Left 3, Peak at y=26) -->
  <polygon points="29,26 24,62 29,60" fill="url(#cr2_goldLit)"/>
  <polygon points="29,26 33,61 29,60" fill="url(#cr2_goldShd)"/>
  <polygon points="29,23 31,26 29,29 27,26" fill="#ffffff"/>

  <!-- Ray 7 (Right 3, Peak at y=26) -->
  <polygon points="71,26 67,61 71,60" fill="url(#cr2_goldLit)"/>
  <polygon points="71,26 76,62 71,60" fill="url(#cr2_goldShd)"/>
  <polygon points="71,23 73,26 71,29 69,26" fill="#ffffff"/>

  <!-- Ray 8 (Left 4, Peak at y=35) -->
  <polygon points="22,35 18,65 22,63" fill="url(#cr2_goldLit)"/>
  <polygon points="22,35 26,63 22,63" fill="url(#cr2_goldShd)"/>
  <polygon points="22,32 24,35 22,38 20,35" fill="#ffffff"/>

  <!-- Ray 9 (Right 4, Peak at y=35) -->
  <polygon points="78,35 74,63 78,63" fill="url(#cr2_goldLit)"/>
  <polygon points="78,35 82,65 78,63" fill="url(#cr2_goldShd)"/>
  <polygon points="78,32 80,35 78,38 76,35" fill="#ffffff"/>

  <!-- Ray 10 (Far Left, Peak at y=45) -->
  <polygon points="15,45 12,68 16,66" fill="url(#cr2_goldLit)"/>
  <polygon points="15,45 19,66 16,66" fill="url(#cr2_goldShd)"/>

  <!-- Ray 11 (Far Right, Peak at y=45) -->
  <polygon points="85,45 81,66 84,66" fill="url(#cr2_goldLit)"/>
  <polygon points="85,45 88,68 84,66" fill="url(#cr2_goldShd)"/>

  <!-- Interlocking Secondary Geometric Prisms -->
  <g fill="#ffffff" opacity="0.9">
    <polygon points="40,56 41.5,42 43,56"/>
    <polygon points="47,54 48.5,38 50,54"/>
    <polygon points="50,54 51.5,38 53,54"/>
    <polygon points="57,56 58.5,42 60,56"/>
    <polygon points="33,58 34.5,46 36,58"/>
    <polygon points="64,58 65.5,46 67,58"/>
    <polygon points="26,60 27.5,50 29,60"/>
    <polygon points="71,60 72.5,50 74,60"/>
  </g>

  <!-- Architectural Hexagonal Stepped Tiara Base -->
  <polygon points="10,66 90,66 86,72 14,72" fill="url(#cr2_goldLit)"/>
  <line x1="10" y1="66" x2="90" y2="66" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>
  <polygon points="14,72 86,72 84,80 16,80" fill="url(#cr2_goldShd)"/>
  <polygon points="13,80 87,80 84,85 16,85" fill="url(#cr2_goldLit)"/>

  <!-- Central Octagonal Canary Solitaire Diamond in Beveled Prongs -->
  <polygon points="46,65 54,65 58,72 58,78 54,85 46,85 42,78 42,72" fill="url(#cr2_goldLit)" stroke="#2a1802" stroke-width="0.6"/>
  <polygon points="47,66.5 53,66.5 56.5,72 56.5,78 53,83.5 47,83.5 43.5,78 43.5,72" fill="url(#cr2_canary)"/>
  <polygon points="48,68 52,68 54,72 54,76 52,80 48,80 46,76 46,72" fill="#ffffff" opacity="0.75"/>
  <polygon points="48,68 52,68 50,71" fill="#ffffff"/>

  <!-- Pavé Diamond Rhombuses Along Base Band -->
  <polygon points="22,76 24,74 26,76 24,78" fill="#ffffff"/>
  <polygon points="30,76 32,74 34,76 32,78" fill="#ffffff"/>
  <polygon points="38,76 40,74 42,76 40,78" fill="#ffffff"/>
  <polygon points="58,76 60,74 62,76 60,78" fill="#ffffff"/>
  <polygon points="66,76 68,74 70,76 68,78" fill="#ffffff"/>
  <polygon points="74,76 76,74 78,76 76,78" fill="#ffffff"/>
</svg>`;

// (3) crown3 — Apex St. Moritz Coronet (Geometric Crystalline Platinum)
window.SOVEREIGN_ARTIFACTS.crown_moritz = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cr3_shadow" cx="50%" cy="88%" r="46%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cr3_platLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f1f5f9"/>
      <stop offset="70%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <linearGradient id="cr3_platShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="55%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="cr3_iceSapphire" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#7dd3fc"/>
      <stop offset="70%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0c4a6e"/>
    </linearGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <ellipse cx="50" cy="88" rx="38" ry="6" fill="url(#cr3_shadow)"/>

  <!-- High-Alpine Geometric Crystalline Spires (Platinum Split-Facet Prisms) -->
  <!-- Monarch Spire (Center Peak at y=10) -->
  <polygon points="50,10 44,64 50,58" fill="url(#cr3_platLit)"/>
  <polygon points="50,10 56,64 50,58" fill="url(#cr3_platShd)"/>
  <line x1="50" y1="10" x2="50" y2="58" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>
  <polygon points="50,6 52.5,10 50,14 47.5,10" fill="url(#cr3_iceSapphire)" stroke="#ffffff" stroke-width="0.5"/>

  <!-- Left Inner Spire (Peak at y=18) -->
  <polygon points="38,18 32,65 38,60" fill="url(#cr3_platLit)"/>
  <polygon points="38,18 44,64 38,60" fill="url(#cr3_platShd)"/>
  <line x1="38" y1="18" x2="38" y2="60" stroke="#ffffff" stroke-width="0.75" opacity="0.9"/>
  <polygon points="38,15 40,18 38,21 36,18" fill="url(#cr3_iceSapphire)"/>

  <!-- Right Inner Spire (Peak at y=18) -->
  <polygon points="62,18 56,64 62,60" fill="url(#cr3_platLit)"/>
  <polygon points="62,18 68,65 62,60" fill="url(#cr3_platShd)"/>
  <line x1="62" y1="18" x2="62" y2="60" stroke="#ffffff" stroke-width="0.75" opacity="0.9"/>
  <polygon points="62,15 64,18 62,21 60,18" fill="url(#cr3_iceSapphire)"/>

  <!-- Left Outer Spire (Peak at y=28) -->
  <polygon points="26,28 20,67 26,62" fill="url(#cr3_platLit)"/>
  <polygon points="26,28 32,65 26,62" fill="url(#cr3_platShd)"/>
  <line x1="26" y1="28" x2="26" y2="62" stroke="#ffffff" stroke-width="0.7" opacity="0.85"/>
  <polygon points="26,25 28,28 26,31 24,28" fill="url(#cr3_iceSapphire)"/>

  <!-- Right Outer Spire (Peak at y=28) -->
  <polygon points="74,28 68,65 74,62" fill="url(#cr3_platLit)"/>
  <polygon points="74,28 80,67 74,62" fill="url(#cr3_platShd)"/>
  <line x1="74" y1="28" x2="74" y2="62" stroke="#ffffff" stroke-width="0.7" opacity="0.85"/>
  <polygon points="74,25 76,28 74,31 72,28" fill="url(#cr3_iceSapphire)"/>

  <!-- Flanking Edge Crystalline Needles -->
  <polygon points="14,40 10,68 16,66" fill="url(#cr3_platLit)"/>
  <polygon points="86,40 84,66 90,68" fill="url(#cr3_platShd)"/>

  <!-- Interlocking Chevron Battlement Web -->
  <g fill="none" stroke="#ffffff" stroke-width="0.7" opacity="0.8">
    <polyline points="20,66 26,54 32,65 38,52 44,64 50,48 56,64 62,52 68,65 74,54 80,66"/>
  </g>

  <!-- Step-Cut Baguette Sapphires Set in Spire Centers -->
  <polygon points="48,34 52,34 53,46 47,46" fill="url(#cr3_iceSapphire)" stroke="#ffffff" stroke-width="0.5"/>
  <polygon points="36,40 40,40 41,50 35,50" fill="url(#cr3_iceSapphire)" stroke="#ffffff" stroke-width="0.5"/>
  <polygon points="60,40 64,40 65,50 59,50" fill="url(#cr3_iceSapphire)" stroke="#ffffff" stroke-width="0.5"/>

  <!-- Stepped Platinum Architectural Base -->
  <polygon points="11,66 89,66 86,71 14,71" fill="url(#cr3_platLit)"/>
  <line x1="11" y1="66" x2="89" y2="66" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>
  <polygon points="14,71 86,71 84,80 16,80" fill="url(#cr3_platShd)"/>
  
  <!-- Calibré-Cut Sapphire Inset Line in Channel -->
  <polygon points="17,73 83,73 82,78 18,78" fill="#0f172a"/>
  <g fill="url(#cr3_iceSapphire)">
    <polygon points="20,74 26,74 25.5,77 20.5,77"/>
    <polygon points="29,74 35,74 34.5,77 29.5,77"/>
    <polygon points="38,74 44,74 43.5,77 38.5,77"/>
    <polygon points="47,74 53,74 52.5,77 47.5,77"/>
    <polygon points="56,74 62,74 61.5,77 56.5,77"/>
    <polygon points="65,74 71,74 70.5,77 65.5,77"/>
    <polygon points="74,74 80,74 79.5,77 74.5,77"/>
  </g>
  <polygon points="13,80 87,80 84,85 16,85" fill="url(#cr3_platLit)"/>
</svg>`;

// (4) crown4 — Celestial Zenith Imperial Crown (Elevated Architectural Geometry)
window.SOVEREIGN_ARTIFACTS.crown_zenith = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cr4_shadow" cx="50%" cy="88%" r="46%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="cr4_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="22%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#ad8228"/>
    </linearGradient>
    <linearGradient id="cr4_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="50%" stop-color="#55380b"/>
      <stop offset="100%" stop-color="#231502"/>
    </linearGradient>
    <linearGradient id="cr4_velvetFacet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14532d"/>
      <stop offset="45%" stop-color="#052e16"/>
      <stop offset="100%" stop-color="#02140a"/>
    </linearGradient>
    <linearGradient id="cr4_emTable" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="45%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="cr4_emFacet" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#166534"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
  </defs>

  <!-- Ground Ambient Contact Shadow -->
  <ellipse cx="50" cy="88" rx="38" ry="6" fill="url(#cr4_shadow)"/>

  <!-- Inner Velvet Cap (Faceted Origami Polyhedron Architecture) -->
  <polygon points="24,66 36,36 50,26 64,36 76,66 50,62" fill="#02140a"/>
  <polygon points="50,26 36,36 50,62" fill="url(#cr4_velvetFacet)" opacity="0.85"/>
  <polygon points="50,26 64,36 50,62" fill="#031f0e"/>

  <!-- Rear Imperial Arches (3D Chiseled Vault Ribs) -->
  <polygon points="24,66 48,22 52,22 28,66" fill="url(#cr4_goldShd)"/>
  <polygon points="76,66 52,22 48,22 72,66" fill="url(#cr4_goldShd)"/>

  <!-- Front Vaulted Imperial Ribs (Chiseled Beveled Polygonal Struts) -->
  <!-- Left Main Arch Strut -->
  <polygon points="17,66 28,34 46,20 50,22 32,38 21,66" fill="url(#cr4_goldLit)"/>
  <polygon points="21,66 32,38 50,22 50,24 33,40 23,66" fill="url(#cr4_goldShd)"/>
  <line x1="17" y1="66" x2="46" y2="20" stroke="#ffffff" stroke-width="0.9" opacity="0.9"/>

  <!-- Right Main Arch Strut -->
  <polygon points="83,66 72,34 54,20 50,22 68,38 79,66" fill="url(#cr4_goldLit)"/>
  <polygon points="79,66 68,38 50,22 50,24 67,40 77,66" fill="url(#cr4_goldShd)"/>
  <line x1="83" y1="66" x2="54" y2="20" stroke="#ffffff" stroke-width="0.9" opacity="0.9"/>

  <!-- Center Monarch Vertical Strut -->
  <polygon points="48,64 48,22 50,20 50,64" fill="url(#cr4_goldLit)"/>
  <polygon points="52,64 52,22 50,20 50,64" fill="url(#cr4_goldShd)"/>
  <line x1="50" y1="20" x2="50" y2="64" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>

  <!-- Stepped Geometric Crown Base Band -->
  <polygon points="12,66 88,66 85,71 15,71" fill="url(#cr4_goldLit)"/>
  <line x1="12" y1="66" x2="88" y2="66" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>
  <polygon points="15,71 85,71 83,81 17,81" fill="url(#cr4_goldShd)"/>
  <polygon points="14,81 86,81 83,86 17,86" fill="url(#cr4_goldLit)"/>

  <!-- Geometric Alternating Fleur-de-lis Spire Battlement -->
  <polygon points="20,66 22,55 25,58 27,51 29,58 32,55 34,66" fill="url(#cr4_goldLit)"/>
  <polygon points="66,66 68,55 71,58 73,51 75,58 78,55 80,66" fill="url(#cr4_goldLit)"/>

  <!-- Centerpiece Master Colombian Octagonal Emerald (High-Precision Geometry) -->
  <!-- Outer Gold Bevel Basket -->
  <polygon points="43,62 57,62 62,68 62,76 57,82 43,82 38,76 38,68" fill="url(#cr4_goldLit)" stroke="#231502" stroke-width="0.7"/>
  <!-- Emerald Facet Ring -->
  <polygon points="44,63.5 56,63.5 60.5,68.5 60.5,75.5 56,80.5 44,80.5 39.5,75.5 39.5,68.5" fill="url(#cr4_emFacet)"/>
  <!-- Emerald Center Table -->
  <polygon points="46,65.5 54,65.5 57.5,69.5 57.5,74.5 54,78.5 46,78.5 42.5,74.5 42.5,69.5" fill="url(#cr4_emTable)"/>
  <!-- Sharp Table Specular Flare -->
  <polygon points="46,65.5 54,65.5 52,68 48,68" fill="#ffffff" opacity="0.8"/>

  <!-- Flanking Emerald Solitaires in Octagonal Gold Bezels -->
  <polygon points="24,73 28,73 30,76 28,79 24,79 22,76" fill="url(#cr4_emTable)" stroke="url(#cr4_goldLit)" stroke-width="0.6"/>
  <polygon points="72,73 76,73 78,76 76,79 72,79 70,76" fill="url(#cr4_emTable)" stroke="url(#cr4_goldLit)" stroke-width="0.6"/>

  <!-- Top Imperial Geometric Maltese Cross Finial -->
  <polygon points="49,19 51,19 52,22 48,22" fill="url(#cr4_goldLit)"/>
  <!-- Top Cross Arms (Chiseled Split Facets) -->
  <polygon points="50,7 48,13 50,15 50,7" fill="url(#cr4_goldLit)"/>
  <polygon points="50,7 52,13 50,15 50,7" fill="url(#cr4_goldShd)"/>
  <polygon points="43,11 49,13 47,15 43,11" fill="url(#cr4_goldLit)"/>
  <polygon points="57,11 51,13 53,15 57,11" fill="url(#cr4_goldShd)"/>
  <!-- Center Finial Emerald Rhombus -->
  <polygon points="50,10 52,13 50,16 48,13" fill="#86efac" filter="drop-shadow(0 0 2px #fff)"/>
</svg>`;


// =========================================================
// 2. RINGS & JEWELRY
// =========================================================

// // (5) ring1 — Sovereign Octagonal Geometric Monogram Signet
window.SOVEREIGN_ARTIFACTS.ring_monogram = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="rg1_shadow" cx="50%" cy="88%" r="44%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rg1_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="rg1_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="50%" stop-color="#55380b"/>
      <stop offset="100%" stop-color="#231502"/>
    </linearGradient>
    <linearGradient id="rg1_obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#26211c"/>
      <stop offset="50%" stop-color="#120f0d"/>
      <stop offset="100%" stop-color="#040303"/>
    </linearGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <ellipse cx="50" cy="88" rx="32" ry="6" fill="url(#rg1_shadow)"/>

  <!-- Geometric Polygonal Ring Shank (Faceted Lower Hexagonal Arc) -->
  <polygon points="26,46 18,58 26,76 50,84 74,76 82,58 74,46 64,54 50,60 36,54" fill="url(#rg1_goldShd)"/>
  <polygon points="26,46 18,58 26,76 50,84 50,78 30,72 24,58 30,48" fill="url(#rg1_goldLit)"/>
  <!-- Hollow Inner Finger Aperture (Octagonal Inset) -->
  <polygon points="32,48 50,54 68,48 72,56 66,70 50,76 34,70 28,56" fill="#0c0803"/>

  <!-- Chiseled Geometric Shoulder Facets -->
  <polygon points="18,34 32,18 34,48 18,48" fill="url(#rg1_goldLit)"/>
  <polygon points="82,34 68,18 66,48 82,48" fill="url(#rg1_goldShd)"/>
  <line x1="18" y1="34" x2="34" y2="48" stroke="#ffffff" stroke-width="0.8" opacity="0.8"/>
  <line x1="82" y1="34" x2="66" y2="48" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>

  <!-- Massive Octagonal Signet Platform (Outer Chamfered Bezel) -->
  <polygon points="34,16 66,16 80,30 80,56 66,70 34,70 20,56 20,30" fill="url(#rg1_goldLit)" stroke="#231502" stroke-width="0.8"/>
  <polygon points="34,18 66,18 78,30 78,56 66,68 34,68 22,56 22,30" fill="url(#rg1_goldShd)"/>
  
  <!-- Specular Chamfer Rim Edge (Top & Left Razor Light) -->
  <polygon points="34,16 66,16 64,19 36,19 23,32 20,30" fill="#ffffff" opacity="0.9"/>
  <polygon points="20,30 23,32 23,54 20,56" fill="#ffffff" opacity="0.7"/>

  <!-- Sunken Octagonal Obsidian Table Plate -->
  <polygon points="36,22 64,22 74,32 74,54 64,64 36,64 26,54 26,32" fill="url(#rg1_obsidian)"/>
  <!-- Beaded Inner Gold Perimeter -->
  <polygon points="37,23 63,23 73,33 73,53 63,63 37,63 27,53 27,33" fill="none" stroke="url(#rg1_goldLit)" stroke-width="0.6" stroke-dasharray="1.5 1.5"/>

  <!-- Pure Geometric Chiseled "1%" Sovereign Monogram Vectors -->
  <!-- Numeral '1' (Faceted Gold Blade) -->
  <polygon points="40,36 44,32 46,32 46,54 42,54 42,37" fill="url(#rg1_goldLit)"/>
  <polygon points="44,32 46,32 46,54 44,54" fill="url(#rg1_goldShd)"/>
  <line x1="44" y1="32" x2="44" y2="54" stroke="#ffffff" stroke-width="0.6" opacity="0.95"/>
  <polygon points="39,54 49,54 47,56 41,56" fill="url(#rg1_goldLit)"/>

  <!-- Percent '%' Geometric Elements -->
  <!-- Slash Bar (Chiseled Diagonal Blade) -->
  <polygon points="58,32 62,32 50,54 46,54" fill="url(#rg1_goldLit)"/>
  <polygon points="60,32 62,32 50,54 48,54" fill="url(#rg1_goldShd)"/>
  <line x1="60" y1="32" x2="48" y2="54" stroke="#ffffff" stroke-width="0.6" opacity="0.9"/>
  <!-- Top Rhombus Pip -->
  <polygon points="50,34 53,37 50,40 47,37" fill="url(#rg1_goldLit)"/>
  <circle cx="50" cy="37" r="0.8" fill="#ffffff"/>
  <!-- Bottom Rhombus Pip -->
  <polygon points="58,46 61,49 58,52 55,49" fill="url(#rg1_goldLit)"/>
  <circle cx="58" cy="49" r="0.8" fill="#ffffff"/>
</svg>`;

// (6) ring2 — Black Onyx Emerald-Cut Architectural Signet
window.SOVEREIGN_ARTIFACTS.ring_onyx = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="rg2_shadow" cx="50%" cy="88%" r="44%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rg2_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#ad8228"/>
    </linearGradient>
    <linearGradient id="rg2_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="50%" stop-color="#55380b"/>
      <stop offset="100%" stop-color="#231502"/>
    </linearGradient>
    <linearGradient id="rg2_onyxTable" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2c2825"/>
      <stop offset="50%" stop-color="#14110f"/>
      <stop offset="100%" stop-color="#040303"/>
    </linearGradient>
    <linearGradient id="rg2_onyxFacet" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#453e39"/>
      <stop offset="100%" stop-color="#080706"/>
    </linearGradient>
  </defs>

  <!-- Ground Ambient Contact Shadow -->
  <ellipse cx="50" cy="88" rx="32" ry="6" fill="url(#rg2_shadow)"/>

  <!-- Stepped Geometric Ring Shank -->
  <polygon points="24,46 16,58 24,78 50,86 76,78 84,58 76,46 64,54 50,60 36,54" fill="url(#rg2_goldShd)"/>
  <polygon points="24,46 16,58 24,78 50,86 50,80 30,74 22,58 28,48" fill="url(#rg2_goldLit)"/>
  <polygon points="30,48 50,54 70,48 74,56 68,72 50,78 32,72 26,56" fill="#090602"/>

  <!-- Art-Deco Stepped Ziggurat Shoulders -->
  <!-- Left Stepped Chevrons -->
  <polygon points="16,36 28,22 30,50 16,50" fill="url(#rg2_goldLit)"/>
  <polygon points="12,42 20,32 22,52 12,52" fill="url(#rg2_goldLit)"/>
  <!-- Right Stepped Chevrons -->
  <polygon points="84,36 72,22 70,50 84,50" fill="url(#rg2_goldShd)"/>
  <polygon points="88,42 80,32 78,52 88,52" fill="url(#rg2_goldShd)"/>

  <!-- Four-Tier Stepped Gold Pyramid Bezel Base -->
  <polygon points="24,18 76,18 84,26 84,60 76,68 24,68 16,60 16,26" fill="url(#rg2_goldLit)" stroke="#231502" stroke-width="0.7"/>
  <polygon points="26,20 74,20 81,27 81,59 74,66 26,66 19,59 19,27" fill="url(#rg2_goldShd)"/>

  <!-- Masterpiece Emerald-Cut Black Onyx (3 Concentric Stepped Geometric Facet Tiers) -->
  <!-- Tier 1: Outer Step Chamfers -->
  <polygon points="27,22 73,22 79,28 79,58 73,64 27,64 21,58 21,28" fill="url(#rg2_onyxFacet)"/>
  <!-- Tier 2: Intermediate Step Facets -->
  <polygon points="30,25 70,25 75,30 75,56 70,61 30,61 25,56 25,30" fill="#0a0807"/>
  <!-- Tier 3: Center Emerald-Cut Table -->
  <polygon points="34,29 66,29 70,33 70,53 66,57 34,57 30,53 30,33" fill="url(#rg2_onyxTable)"/>

  <!-- Diagonal Geometric Crystalline Specular Flares across Table -->
  <polygon points="34,29 44,29 32,57 30,53" fill="#ffffff" opacity="0.4"/>
  <polygon points="46,29 52,29 38,57 34,57" fill="#ffffff" opacity="0.18"/>
  <line x1="27" y1="22" x2="73" y2="22" stroke="#ffffff" stroke-width="0.7" opacity="0.6"/>

  <!-- 4 Corner Faceted Gold Claw Prongs (Double-Chamfered Diamonds) -->
  <!-- Top Left -->
  <polygon points="22,23 26,20 28,24 24,27" fill="url(#rg2_goldLit)"/>
  <circle cx="25" cy="23.5" r="0.8" fill="#ffffff"/>
  <!-- Top Right -->
  <polygon points="78,23 74,20 72,24 76,27" fill="url(#rg2_goldLit)"/>
  <circle cx="75" cy="23.5" r="0.8" fill="#ffffff"/>
  <!-- Bottom Left -->
  <polygon points="22,63 26,66 28,62 24,59" fill="url(#rg2_goldLit)"/>
  <circle cx="25" cy="62.5" r="0.8" fill="#ffffff"/>
  <!-- Bottom Right -->
  <polygon points="78,63 74,66 72,62 76,59" fill="url(#rg2_goldLit)"/>
  <circle cx="75" cy="62.5" r="0.8" fill="#ffffff"/>
</svg>`;

// (7) ring3 — Falcon Emerald Low-Poly Crystalline Signet
window.SOVEREIGN_ARTIFACTS.ring_falcon = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="rg3_shadow" cx="50%" cy="88%" r="44%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rg3_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="rg3_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="50%" stop-color="#55380b"/>
      <stop offset="100%" stop-color="#231502"/>
    </linearGradient>
    <linearGradient id="rg3_emTable" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="45%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="rg3_emFacet" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#166534"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <ellipse cx="50" cy="88" rx="32" ry="6" fill="url(#rg3_shadow)"/>

  <!-- Geometric Ring Shank -->
  <polygon points="24,46 16,58 24,78 50,86 76,78 84,58 76,46 64,54 50,60 36,54" fill="url(#rg3_goldShd)"/>
  <polygon points="24,46 16,58 24,78 50,86 50,80 30,74 22,58 28,48" fill="url(#rg3_goldLit)"/>
  <polygon points="30,48 50,54 70,48 74,56 68,72 50,78 32,72 26,56" fill="#090602"/>

  <!-- Low-Poly High-Jewelry Faceted Falcon Head (Sculpted in 3D Polygons) -->
  <!-- Falcon Cranium / Crown Feathers (Split Lit/Shadow Facets) -->
  <polygon points="50,14 43,22 50,26" fill="url(#rg3_goldLit)"/>
  <polygon points="50,14 57,22 50,26" fill="url(#rg3_goldShd)"/>
  <line x1="50" y1="14" x2="50" y2="26" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>

  <!-- Left Brow & Temple Facets -->
  <polygon points="43,22 32,24 38,32 50,26" fill="url(#rg3_goldLit)"/>
  <polygon points="32,24 22,34 34,38 38,32" fill="url(#rg3_goldLit)"/>
  <polygon points="22,34 16,46 30,44 34,38" fill="url(#rg3_goldLit)"/>

  <!-- Right Brow & Temple Facets -->
  <polygon points="57,22 68,24 62,32 50,26" fill="url(#rg3_goldShd)"/>
  <polygon points="68,24 78,34 66,38 62,32" fill="url(#rg3_goldShd)"/>
  <polygon points="78,34 84,46 70,44 66,38" fill="url(#rg3_goldShd)"/>

  <!-- Sharp Hooked Beak (Chiseled Obsidian & Gold Polygons) -->
  <polygon points="50,26 44,34 50,42" fill="#2d1c04"/>
  <polygon points="50,26 56,34 50,42" fill="#120c02"/>
  <polygon points="50,42 46,38 50,48" fill="url(#rg3_goldLit)"/>
  <polygon points="50,42 54,38 50,48" fill="url(#rg3_goldShd)"/>
  <line x1="50" y1="26" x2="50" y2="48" stroke="#ffffff" stroke-width="0.7" opacity="0.9"/>

  <!-- Falcon Piercing Geometric Rhombus Eyes -->
  <!-- Left Eye: Faceted Emerald Rhombus -->
  <polygon points="38,28 42,26 44,30 40,32" fill="url(#rg3_emTable)" stroke="#231502" stroke-width="0.5"/>
  <circle cx="41" cy="28.5" r="0.8" fill="#ffffff" filter="drop-shadow(0 0 1.5px #fff)"/>
  <!-- Right Eye: Faceted Emerald Rhombus -->
  <polygon points="62,28 58,26 56,30 60,32" fill="url(#rg3_emTable)" stroke="#231502" stroke-width="0.5"/>
  <circle cx="59" cy="28.5" r="0.8" fill="#ffffff" filter="drop-shadow(0 0 1.5px #fff)"/>

  <!-- Center Collet: Master Octagonal Colombian Emerald Held by Falcon Talons -->
  <!-- Octagonal Gold Basket -->
  <polygon points="40,50 60,50 68,58 68,72 60,80 40,80 32,72 32,58" fill="url(#rg3_goldLit)" stroke="#231502" stroke-width="0.7"/>
  <!-- Emerald Outer Step -->
  <polygon points="41,51.5 59,51.5 66.5,58.5 66.5,71.5 59,78.5 41,78.5 33.5,71.5 33.5,58.5" fill="url(#rg3_emFacet)"/>
  <!-- Emerald Center Table -->
  <polygon points="43,54 57,54 62.5,59.5 62.5,70.5 57,76 43,76 37.5,70.5 37.5,59.5" fill="url(#rg3_emTable)"/>
  <!-- Table Specular Flare -->
  <polygon points="43,54 57,54 54,57 46,57" fill="#ffffff" opacity="0.8"/>

  <!-- Low-Poly Golden Falcon Talons Gripping Emerald Corners -->
  <polygon points="32,56 36,52 38,56 34,60" fill="url(#rg3_goldLit)"/>
  <polygon points="68,56 64,52 62,56 66,60" fill="url(#rg3_goldLit)"/>
  <polygon points="32,74 36,78 38,74 34,70" fill="url(#rg3_goldLit)"/>
  <polygon points="68,74 64,78 62,74 66,70" fill="url(#rg3_goldLit)"/>
</svg>`;

// (8) ring4 — Apex Chrono Octagonal Horology Band
window.SOVEREIGN_ARTIFACTS.ring_chrono = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="rg4_shadow" cx="50%" cy="88%" r="44%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rg4_roseLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fcd5c7"/>
      <stop offset="60%" stop-color="#e28c70"/>
      <stop offset="100%" stop-color="#b85838"/>
    </linearGradient>
    <linearGradient id="rg4_roseShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8f3e26"/>
      <stop offset="55%" stop-color="#551e10"/>
      <stop offset="100%" stop-color="#230a04"/>
    </linearGradient>
    <linearGradient id="rg4_dial" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#251b18"/>
      <stop offset="50%" stop-color="#120c0a"/>
      <stop offset="100%" stop-color="#050302"/>
    </linearGradient>
    <radialGradient id="rg4_ruby" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffe4e6"/>
      <stop offset="35%" stop-color="#f43f5e"/>
      <stop offset="75%" stop-color="#9f1239"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </radialGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <ellipse cx="50" cy="88" rx="32" ry="6" fill="url(#rg4_shadow)"/>

  <!-- Geometric Ring Shank with Integrated Bracelet Links -->
  <polygon points="24,46 16,58 24,78 50,86 76,78 84,58 76,46 64,54 50,60 36,54" fill="url(#rg4_roseShd)"/>
  <polygon points="24,46 16,58 24,78 50,86 50,80 30,74 22,58 28,48" fill="url(#rg4_roseLit)"/>
  <polygon points="30,48 50,54 70,48 74,56 68,72 50,78 32,72 26,56" fill="#090302"/>

  <!-- Master Haute Horlogerie Octagonal Bezel (Royal Oak / Octo Architecture) -->
  <polygon points="34,15 66,15 82,31 82,61 66,77 34,77 18,61 18,31" fill="url(#rg4_roseLit)" stroke="#230a04" stroke-width="0.8"/>
  <polygon points="35,17 65,17 79,31 79,61 65,75 35,75 21,61 21,31" fill="url(#rg4_roseShd)"/>

  <!-- Beveled Chamfer Mirror Highlights on Octagonal Vertices -->
  <polygon points="34,15 66,15 64,18 36,18" fill="#ffffff" opacity="0.95"/>
  <polygon points="18,31 34,15 36,18 21,33" fill="#ffffff" opacity="0.8"/>
  <polygon points="18,31 18,61 21,59 21,33" fill="#ffffff" opacity="0.6"/>

  <!-- 8 Inset Hexagonal Titanium Screws at All 8 Octagonal Vertices -->
  <!-- Top Left Angle -->
  <polygon points="30,22 34,20 37,23 35,27 31,27 28,24" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
  <!-- Top Right Angle -->
  <polygon points="63,22 67,20 70,23 68,27 64,27 61,24" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
  <!-- Right Top Angle -->
  <polygon points="74,36 78,34 80,37 79,41 75,41 73,38" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
  <!-- Right Bottom Angle -->
  <polygon points="74,55 78,53 80,56 79,60 75,60 73,57" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
  <!-- Bottom Right Angle -->
  <polygon points="63,69 67,67 70,70 68,74 64,74 61,71" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
  <!-- Bottom Left Angle -->
  <polygon points="30,69 34,67 37,70 35,74 31,74 28,71" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
  <!-- Left Bottom Angle -->
  <polygon points="20,55 24,53 26,56 25,60 21,60 19,57" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>
  <!-- Left Top Angle -->
  <polygon points="20,36 24,34 26,37 25,41 21,41 19,38" fill="#cbd5e1" stroke="#334155" stroke-width="0.5"/>

  <!-- Inner Octagonal Dial with Concentric Stepped Tachymeter -->
  <polygon points="36,22 64,22 75,33 75,59 64,70 36,70 25,59 25,33" fill="url(#rg4_dial)"/>
  <polygon points="37,24 63,24 73,34 73,58 63,68 37,68 27,58 27,34" fill="none" stroke="url(#rg4_roseLit)" stroke-width="0.6" opacity="0.6"/>

  <!-- Skeletonized Geometric Tourbillon Carriage Bridge -->
  <polygon points="40,43 60,43 63,46 60,49 40,49 37,46" fill="url(#rg4_roseLit)" stroke="#230a04" stroke-width="0.6"/>
  <line x1="40" y1="44" x2="60" y2="44" stroke="#ffffff" stroke-width="0.6" opacity="0.9"/>

  <!-- Luminous Synthetic Ruby Pivot Jewel in Hexagonal Gold Chaton -->
  <polygon points="47,43 53,43 56,46 53,49 47,49 44,46" fill="url(#rg4_roseLit)"/>
  <circle cx="50" cy="46" r="3" fill="url(#rg4_ruby)" filter="drop-shadow(0 0 2.5px #f43f5e)"/>
  <circle cx="49" cy="45" r="0.8" fill="#ffffff" opacity="0.9"/>

  <!-- Faceted Flame-Blued Geometric Hands -->
  <polygon points="50,46 48,32 50,30 52,32" fill="#38bdf8" filter="drop-shadow(0 0 2px #0284c7)"/>
  <polygon points="50,46 61,42 62,44 50,47" fill="#38bdf8" filter="drop-shadow(0 0 2px #0284c7)"/>
</svg>`;


// =========================================================
// 3. AURAS
// =========================================================

// (9) aura1 — Octagram Sacred Geometry Mandala
window.SOVEREIGN_ARTIFACTS.aura_radial = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="au1_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8e0" stop-opacity="0.95"/>
      <stop offset="30%" stop-color="#faecc5" stop-opacity="0.45"/>
      <stop offset="70%" stop-color="#dcae4a" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="au1_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="au1_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="50%" stop-color="#55380b"/>
      <stop offset="100%" stop-color="#231502"/>
    </linearGradient>
  </defs>

  <!-- Diffuse Glow Base -->
  <circle cx="50" cy="50" r="47" fill="url(#au1_glow)"/>

  <!-- 16 Chiseled 3D Geometric Diamond Blades (Split Light/Shadow Facets) -->
  <!-- 4 Cardinal Rays (North, South, East, West) -->
  <polygon points="50,6 47,38 50,42" fill="url(#au1_goldLit)"/>
  <polygon points="50,6 53,38 50,42" fill="url(#au1_goldShd)"/>
  <polygon points="50,94 53,62 50,58" fill="url(#au1_goldLit)"/>
  <polygon points="50,94 47,62 50,58" fill="url(#au1_goldShd)"/>
  <polygon points="94,50 62,47 58,50" fill="url(#au1_goldLit)"/>
  <polygon points="94,50 62,53 58,50" fill="url(#au1_goldShd)"/>
  <polygon points="6,50 38,53 42,50" fill="url(#au1_goldLit)"/>
  <polygon points="6,50 38,47 42,50" fill="url(#au1_goldShd)"/>

  <!-- 4 Primary Diagonal Rays (45 deg) -->
  <polygon points="19,19 42,38 45,43" fill="url(#au1_goldLit)"/>
  <polygon points="19,19 45,43 38,42" fill="url(#au1_goldShd)"/>
  <polygon points="81,19 55,43 58,38" fill="url(#au1_goldLit)"/>
  <polygon points="81,19 62,42 55,43" fill="url(#au1_goldShd)"/>
  <polygon points="81,81 58,62 55,57" fill="url(#au1_goldLit)"/>
  <polygon points="81,81 55,57 62,58" fill="url(#au1_goldShd)"/>
  <polygon points="19,81 38,58 45,57" fill="url(#au1_goldLit)"/>
  <polygon points="19,81 45,57 42,62" fill="url(#au1_goldShd)"/>

  <!-- 8 Secondary Intermediate Prisms -->
  <polygon points="35,11 46,36 48,40" fill="url(#au1_goldLit)"/>
  <polygon points="65,11 54,36 52,40" fill="url(#au1_goldShd)"/>
  <polygon points="89,35 64,46 60,48" fill="url(#au1_goldLit)"/>
  <polygon points="89,65 64,54 60,52" fill="url(#au1_goldShd)"/>
  <polygon points="65,89 54,64 52,60" fill="url(#au1_goldLit)"/>
  <polygon points="35,89 46,64 48,60" fill="url(#au1_goldShd)"/>
  <polygon points="11,65 36,54 40,52" fill="url(#au1_goldLit)"/>
  <polygon points="11,35 36,46 40,48" fill="url(#au1_goldShd)"/>

  <!-- Outer Concentric Regular Octagons (Sacred Geometry Frames) -->
  <polygon points="36,14 64,14 86,36 86,64 64,86 36,86 14,64 14,36" fill="none" stroke="url(#au1_goldLit)" stroke-width="1.6"/>
  <polygon points="38,16 62,16 84,38 84,62 62,84 38,84 16,62 16,38" fill="none" stroke="#ffffff" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.8"/>
  <polygon points="40,22 60,22 78,40 78,60 60,78 40,78 22,60 22,40" fill="none" stroke="url(#au1_goldShd)" stroke-width="1.2"/>

  <!-- Interlaced 8-Pointed Star Polygons (Two 45-degree Rotated Squares) -->
  <polygon points="26,26 74,26 74,74 26,74" fill="none" stroke="url(#au1_goldLit)" stroke-width="0.9" opacity="0.85"/>
  <polygon points="50,16 84,50 50,84 16,50" fill="none" stroke="url(#au1_goldLit)" stroke-width="0.9" opacity="0.85"/>

  <!-- Central Faceted Octagonal Rosette & Brilliant Core -->
  <polygon points="42,32 58,32 68,42 68,58 58,68 42,68 32,58 32,42" fill="url(#au1_goldLit)" stroke="#231502" stroke-width="0.8"/>
  <polygon points="44,34 56,34 66,44 66,56 56,66 44,66 34,56 34,44" fill="url(#au1_goldShd)"/>
  <!-- Inner Octagonal Diamond Core -->
  <polygon points="46,38 54,38 62,46 62,54 54,62 46,62 38,54 38,46" fill="#ffffff" filter="drop-shadow(0 0 4px #faecc5)"/>
  <polygon points="48,40 52,40 50,45" fill="#fef08a"/>
</svg>`;

// (10) aura2 — Geometric Guilloché Crystal Corona
window.SOVEREIGN_ARTIFACTS.aura_guilloche = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="au2_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8e0" stop-opacity="0.9"/>
      <stop offset="40%" stop-color="#f5d77f" stop-opacity="0.4"/>
      <stop offset="75%" stop-color="#d4af37" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="au2_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="60%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#a16e1a"/>
    </linearGradient>
    <linearGradient id="au2_sapphire" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7dd3fc"/>
      <stop offset="40%" stop-color="#0284c7"/>
      <stop offset="80%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <circle cx="50" cy="50" r="47" fill="url(#au2_glow)"/>

  <!-- Sacred Geometry Matrix: Nested Rotating Regular Polygons (15°, 30°, 45°, 60°, 75°) -->
  <g fill="none" stroke="url(#au2_goldLit)" stroke-width="0.8" opacity="0.85">
    <!-- Square 0 deg -->
    <polygon points="18,18 82,18 82,82 18,82"/>
    <!-- Square 45 deg (Octagram Star) -->
    <polygon points="50,5 95,50 50,95 5,50"/>
    <!-- Square 15 deg -->
    <polygon points="26,10 90,26 74,90 10,74"/>
    <!-- Square 30 deg -->
    <polygon points="35,6 94,35 65,94 6,65"/>
    <!-- Square 60 deg -->
    <polygon points="65,6 94,65 35,94 6,35"/>
    <!-- Square 75 deg -->
    <polygon points="74,10 90,74 26,90 10,26"/>
  </g>

  <!-- Milled Coin-Edge Geometric Octagonal Perimeter -->
  <polygon points="36,10 64,10 90,36 90,64 64,90 36,90 10,64 10,36" fill="none" stroke="url(#au2_goldLit)" stroke-width="2.4"/>
  <polygon points="37,12 63,12 88,37 88,63 63,88 37,88 12,63 12,37" fill="none" stroke="#ffffff" stroke-width="0.7" stroke-dasharray="2 1.5"/>

  <!-- 16 Crystalline Vertex Rhombuses Along Rim -->
  <g fill="#ffffff">
    <polygon points="50,5 52,10 50,15 48,10"/>
    <polygon points="50,85 52,90 50,95 48,90"/>
    <polygon points="5,50 10,52 15,50 10,48"/>
    <polygon points="85,50 90,52 95,50 90,48"/>
    <polygon points="18,18 23,20 20,25 15,23"/>
    <polygon points="82,18 85,23 80,25 77,20"/>
    <polygon points="82,82 77,80 80,75 85,77"/>
    <polygon points="18,82 15,77 20,75 23,80"/>
  </g>

  <!-- Central Stepped Octagonal Hub with Royal Sapphire Crystal -->
  <polygon points="42,32 58,32 68,42 68,58 58,68 42,68 32,58 32,42" fill="url(#au2_goldLit)" stroke="#231502" stroke-width="0.8"/>
  <!-- Octagonal Sapphire Bezel -->
  <polygon points="44,36 56,36 64,44 64,56 56,64 44,64 36,56 36,44" fill="url(#au2_sapphire)"/>
  <!-- Table Specular Glint -->
  <polygon points="46,38 54,38 58,42 58,50 54,54 46,54 42,50 42,42" fill="#38bdf8" opacity="0.6"/>
  <polygon points="46,38 52,38 50,42 44,42" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
</svg>`;

// (11) aura3 — Faceted Obsidian Geometric Eclipse
window.SOVEREIGN_ARTIFACTS.aura_eclipse = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="au3_corona" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fff8e0" stop-opacity="0"/>
      <stop offset="45%" stop-color="#faecc5" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#dcae4a" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="au3_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fef08a"/>
      <stop offset="60%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="au3_obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#302a26"/>
      <stop offset="50%" stop-color="#14110f"/>
      <stop offset="100%" stop-color="#020202"/>
    </linearGradient>
  </defs>

  <!-- Radiant Solar Corona Glow -->
  <circle cx="50" cy="50" r="47" fill="url(#au3_corona)"/>

  <!-- 16 Sharp Geometric Diamond Solar Flare Prisms Radiating Outward -->
  <!-- Cardinal Long Spikes -->
  <polygon points="50,2 48,22 50,24 52,22" fill="url(#au3_goldLit)"/>
  <polygon points="50,98 52,78 50,76 48,78" fill="url(#au3_goldLit)"/>
  <polygon points="98,50 78,48 76,50 78,52" fill="url(#au3_goldLit)"/>
  <polygon points="2,50 22,52 24,50 22,48" fill="url(#au3_goldLit)"/>

  <!-- Diagonal Spikes -->
  <polygon points="16,16 30,28 32,32 28,30" fill="url(#au3_goldLit)"/>
  <polygon points="84,16 70,28 68,32 72,30" fill="url(#au3_goldLit)"/>
  <polygon points="84,84 70,72 68,68 72,70" fill="url(#au3_goldLit)"/>
  <polygon points="16,84 30,72 32,68 28,70" fill="url(#au3_goldLit)"/>

  <!-- Intermediary Geometric Flare Blades -->
  <g fill="url(#au3_goldLit)" opacity="0.85">
    <polygon points="34,8 42,24 44,22"/>
    <polygon points="66,8 58,24 56,22"/>
    <polygon points="92,34 76,42 78,44"/>
    <polygon points="92,66 76,58 78,56"/>
    <polygon points="66,92 58,76 56,78"/>
    <polygon points="34,92 42,76 44,78"/>
    <polygon points="8,66 24,58 22,56"/>
    <polygon points="8,34 24,42 22,44"/>
  </g>

  <!-- 16-Sided Regular Polygon Obsidian Eclipse Monolith -->
  <polygon points="50,20 61,22 71,29 78,39 80,50 78,61 71,71 61,78 50,80 39,78 29,71 22,61 20,50 22,39 29,29 39,22" fill="url(#au3_obsidian)" stroke="#4a3e35" stroke-width="1.2"/>

  <!-- Beveled Molten Gold Polygonal Rim Segment (Top-Right Crescent Facets) -->
  <polygon points="50,20 61,22 71,29 78,39 80,50 76,48 68,38 58,28 48,24" fill="#ffffff" filter="drop-shadow(0 0 6px #fff)"/>
  <polygon points="50,20 61,22 71,29 78,39 80,50 78,54 69,43 59,33 49,27" fill="url(#au3_goldLit)"/>

  <!-- Diamond Ring Flare at 1:30 (Faceted 8-Point Geometric Brilliant) -->
  <!-- Center Glint -->
  <polygon points="71,29 73,33 71,37 69,33" fill="#ffffff" filter="drop-shadow(0 0 8px #fff)"/>
  <!-- Primary Cross Spikes -->
  <polygon points="71,15 72.5,29 71,43 69.5,29" fill="#ffffff"/>
  <polygon points="57,29 71,30.5 85,29 71,27.5" fill="#ffffff"/>
  <!-- Diagonal Spikes -->
  <polygon points="61,19 72,28 81,39 70,30" fill="#ffffff" opacity="0.8"/>
  <polygon points="81,19 70,28 61,39 72,30" fill="#ffffff" opacity="0.8"/>
</svg>`;

// (12) aura4 — Dodecahedral Celestial Apex Radiance
window.SOVEREIGN_ARTIFACTS.aura_celestial = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="au4_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fffdf5" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#faecc5" stop-opacity="0.55"/>
      <stop offset="70%" stop-color="#dcae4a" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="au4_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="60%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="au4_platLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
  </defs>

  <circle cx="50" cy="50" r="47" fill="url(#au4_glow)"/>

  <!-- 12-Pointed Stellated Polyhedron Celestial Star (Outer Faceted Spikes) -->
  <g fill="url(#au4_goldLit)">
    <polygon points="50,6 47,26 50,30 53,26"/>
    <polygon points="72,12 60,30 64,33 64,28"/>
    <polygon points="88,28 68,36 71,40 73,36"/>
    <polygon points="94,50 74,47 70,50 74,53"/>
    <polygon points="88,72 68,64 71,60 73,64"/>
    <polygon points="72,88 60,70 64,67 64,72"/>
    <polygon points="50,94 47,74 50,70 53,74"/>
    <polygon points="28,88 40,70 36,67 36,72"/>
    <polygon points="12,72 32,64 29,60 27,64"/>
    <polygon points="6,50 26,47 30,50 26,53"/>
    <polygon points="12,28 32,36 29,40 27,36"/>
    <polygon points="28,12 40,30 36,33 36,28"/>
  </g>

  <!-- Concentric Dodecagram & Hexagram Sacred Geometry Rings -->
  <!-- Outer Dodecagonal Gold Track -->
  <polygon points="50,14 68,19 81,32 86,50 81,68 68,81 50,86 32,81 19,68 14,50 19,32 32,19" fill="none" stroke="url(#au4_goldLit)" stroke-width="2"/>
  <polygon points="50,17 66,21 79,34 83,50 79,66 66,79 50,83 34,79 21,66 17,50 21,34 34,21" fill="none" stroke="#ffffff" stroke-width="0.7" stroke-dasharray="2 2" opacity="0.8"/>

  <!-- 8 Diamond Rhombus Orbital Nodes at Vertex Mounts -->
  <polygon points="50,11 53,14 50,17 47,14" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)"/>
  <polygon points="86,50 89,53 86,56 83,53" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)"/>
  <polygon points="50,83 53,86 50,89 47,86" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)"/>
  <polygon points="14,50 17,53 14,56 11,53" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)"/>

  <!-- Inner Octagonal Chassis with Brilliant Diamond Solitaire Center -->
  <polygon points="40,30 60,30 70,40 70,60 60,70 40,70 30,60 30,40" fill="url(#au4_goldLit)" stroke="#231502" stroke-width="0.8"/>
  <polygon points="42,33 58,33 67,42 67,58 58,67 42,67 33,58 33,42" fill="#0d0905"/>
  
  <!-- 8-Point Brilliant Platinum Faceted Diamond Solitaire -->
  <polygon points="50,38 53,46 62,50 53,54 50,62 47,54 38,50 47,46" fill="url(#au4_platLit)" filter="drop-shadow(0 0 6px #fff)"/>
  <circle cx="50" cy="50" r="2.5" fill="#ffffff"/>
</svg>`;


// =========================================================
// 4. STARS & ORDERS
// =========================================================

// (13) star1 — Sovereign Geometric Octagonal Order Star
window.SOVEREIGN_ARTIFACTS.star_sovereign = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="st1_shadow" cx="50%" cy="88%" r="46%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="st1_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="st1_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="50%" stop-color="#55380b"/>
      <stop offset="100%" stop-color="#231502"/>
    </linearGradient>
    <linearGradient id="st1_obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2c2622"/>
      <stop offset="50%" stop-color="#14110f"/>
      <stop offset="100%" stop-color="#040303"/>
    </linearGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <ellipse cx="50" cy="88" rx="36" ry="6" fill="url(#st1_shadow)"/>

  <!-- 8 Secondary Geometric Knife-Edge Diamond Rays -->
  <g fill="url(#st1_goldShd)">
    <polygon points="50,50 40,22 43,14 47,22"/>
    <polygon points="50,50 53,22 57,14 60,22"/>
    <polygon points="50,50 78,40 86,43 78,47"/>
    <polygon points="50,50 78,53 86,57 78,60"/>
    <polygon points="50,50 60,78 57,86 53,78"/>
    <polygon points="50,50 47,78 43,86 40,78"/>
    <polygon points="50,50 22,60 14,57 22,53"/>
    <polygon points="50,50 22,47 14,43 22,40"/>
  </g>

  <!-- 8 Primary 3D Chiseled Sovereign Star Rays (Razor Split-Facet Planes) -->
  <!-- North (Peak at y=4) -->
  <polygon points="50,4 42,28 50,44" fill="url(#st1_goldLit)"/>
  <polygon points="50,4 58,28 50,44" fill="url(#st1_goldShd)"/>
  <line x1="50" y1="4" x2="50" y2="44" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>
  <polygon points="50,2 52,4 50,6 48,4" fill="#ffffff"/>

  <!-- North-East (Peak at x=83, y=17) -->
  <polygon points="83,17 56,36 50,50" fill="url(#st1_goldLit)"/>
  <polygon points="83,17 64,44 50,50" fill="url(#st1_goldShd)"/>
  <line x1="83" y1="17" x2="50" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- East (Peak at x=96, y=50) -->
  <polygon points="96,50 72,42 56,50" fill="url(#st1_goldLit)"/>
  <polygon points="96,50 72,58 56,50" fill="url(#st1_goldShd)"/>
  <line x1="96" y1="50" x2="56" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>

  <!-- South-East (Peak at x=83, y=83) -->
  <polygon points="83,83 64,56 50,50" fill="url(#st1_goldLit)"/>
  <polygon points="83,83 56,64 50,50" fill="url(#st1_goldShd)"/>
  <line x1="83" y1="83" x2="50" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- South (Peak at y=96) -->
  <polygon points="50,96 58,72 50,56" fill="url(#st1_goldLit)"/>
  <polygon points="50,96 42,72 50,56" fill="url(#st1_goldShd)"/>
  <line x1="50" y1="96" x2="50" y2="56" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>

  <!-- South-West (Peak at x=17, y=83) -->
  <polygon points="17,83 44,64 50,50" fill="url(#st1_goldLit)"/>
  <polygon points="17,83 36,56 50,50" fill="url(#st1_goldShd)"/>
  <line x1="17" y1="83" x2="50" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- West (Peak at x=4, y=50) -->
  <polygon points="4,50 28,58 44,50" fill="url(#st1_goldLit)"/>
  <polygon points="4,50 28,42 44,50" fill="url(#st1_goldShd)"/>
  <line x1="4" y1="50" x2="44" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>

  <!-- North-West (Peak at x=17, y=17) -->
  <polygon points="17,17 36,44 50,50" fill="url(#st1_goldLit)"/>
  <polygon points="17,17 44,36 50,50" fill="url(#st1_goldShd)"/>
  <line x1="17" y1="17" x2="50" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- Central Multi-Tier Stepped Octagonal Medallion -->
  <!-- Outer Gold Octagon -->
  <polygon points="38,24 62,24 76,38 76,62 62,76 38,76 24,62 24,38" fill="url(#st1_goldLit)" stroke="#231502" stroke-width="0.8"/>
  <polygon points="40,26 60,26 74,40 74,60 60,74 40,74 26,60 26,40" fill="url(#st1_goldShd)"/>
  <!-- Stepped Inner Bevel -->
  <polygon points="42,29 58,29 71,42 71,58 58,71 42,71 29,58 29,42" fill="url(#st1_goldLit)"/>

  <!-- Recessed Obsidian Core Table -->
  <polygon points="44,32 56,32 68,44 68,56 56,68 44,68 32,56 32,44" fill="url(#st1_obsidian)"/>
  <!-- Beaded Gold Perimeter -->
  <polygon points="45,33 55,33 67,45 67,55 55,67 45,67 33,55 33,45" fill="none" stroke="url(#st1_goldLit)" stroke-width="0.5" stroke-dasharray="1.5 1.5"/>

  <!-- Vector Geometric Chiseled "1%" Monogram in Center -->
  <!-- Numeral '1' -->
  <polygon points="44,38 47,35 48.5,35 48.5,58 45.5,58 45.5,39" fill="url(#st1_goldLit)"/>
  <polygon points="47,35 48.5,35 48.5,58 47,58" fill="url(#st1_goldShd)"/>
  <line x1="47" y1="35" x2="47" y2="58" stroke="#ffffff" stroke-width="0.5" opacity="0.9"/>
  <!-- Percent '%' Slash & Pips -->
  <polygon points="56,36 58.5,36 50,56 47.5,56" fill="url(#st1_goldLit)"/>
  <polygon points="50,38 52,40 50,42 48,40" fill="#ffffff"/>
  <polygon points="56,50 58,52 56,54 54,52" fill="#ffffff"/>
</svg>`;

// (14) star2 — Faceted Maltese Grand Cross
window.SOVEREIGN_ARTIFACTS.star_grand_cross = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="st2_shadow" cx="50%" cy="88%" r="46%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="st2_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="st2_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="50%" stop-color="#55380b"/>
      <stop offset="100%" stop-color="#231502"/>
    </linearGradient>
    <linearGradient id="st2_crimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f87171"/>
      <stop offset="40%" stop-color="#dc2626"/>
      <stop offset="80%" stop-color="#991b1b"/>
      <stop offset="100%" stop-color="#450a0a"/>
    </linearGradient>
  </defs>

  <!-- Ground Ambient Contact Shadow -->
  <ellipse cx="50" cy="88" rx="36" ry="6" fill="url(#st2_shadow)"/>

  <!-- Diagonal Secondary Fleur-de-lis Spire Clusters -->
  <g fill="url(#st2_goldLit)">
    <polygon points="50,50 26,26 22,20 29,25"/>
    <polygon points="50,50 74,26 78,20 71,25"/>
    <polygon points="50,50 74,74 78,80 71,75"/>
    <polygon points="50,50 26,74 22,80 29,75"/>
    <!-- Intermediary Needles -->
    <polygon points="50,50 36,18 39,12 42,18"/>
    <polygon points="50,50 64,18 61,12 58,18"/>
    <polygon points="50,50 82,36 88,39 82,42"/>
    <polygon points="50,50 82,64 88,61 82,58"/>
    <polygon points="50,50 64,82 61,88 58,82"/>
    <polygon points="50,50 36,82 39,88 42,82"/>
    <polygon points="50,50 18,64 12,61 18,58"/>
    <polygon points="50,50 18,36 12,39 18,42"/>
  </g>

  <!-- 4 Flared Maltese Cross Arms (Pure Geometric Split-Facet Polygons) -->
  <!-- Top Arm (Peaks at y=8) -->
  <polygon points="50,50 35,20 42,8 50,18" fill="url(#st2_goldLit)"/>
  <polygon points="50,50 50,18 58,8 65,20" fill="url(#st2_goldShd)"/>
  <!-- Top Arm Crimson Facet Inlays -->
  <polygon points="48,46 38,22 43,12 48,20" fill="url(#st2_crimson)"/>
  <polygon points="52,46 52,20 57,12 62,22" fill="url(#st2_crimson)"/>
  <line x1="50" y1="18" x2="50" y2="48" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- Bottom Arm (Peaks at y=92) -->
  <polygon points="50,50 35,80 42,92 50,82" fill="url(#st2_goldLit)"/>
  <polygon points="50,50 50,82 58,92 65,80" fill="url(#st2_goldShd)"/>
  <polygon points="48,54 38,78 43,88 48,80" fill="url(#st2_crimson)"/>
  <polygon points="52,54 52,80 57,88 62,78" fill="url(#st2_crimson)"/>
  <line x1="50" y1="52" x2="50" y2="82" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- Left Arm (Peaks at x=8) -->
  <polygon points="50,50 20,35 8,42 18,50" fill="url(#st2_goldLit)"/>
  <polygon points="50,50 18,50 8,58 20,65" fill="url(#st2_goldShd)"/>
  <polygon points="46,48 22,38 12,43 20,48" fill="url(#st2_crimson)"/>
  <polygon points="46,52 20,52 12,57 22,62" fill="url(#st2_crimson)"/>
  <line x1="18" y1="50" x2="48" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- Right Arm (Peaks at x=92) -->
  <polygon points="50,50 80,35 92,42 82,50" fill="url(#st2_goldLit)"/>
  <polygon points="50,50 82,50 92,58 80,65" fill="url(#st2_goldShd)"/>
  <polygon points="54,48 78,38 88,43 80,48" fill="url(#st2_crimson)"/>
  <polygon points="54,52 80,52 88,57 78,62" fill="url(#st2_crimson)"/>
  <line x1="52" y1="50" x2="82" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

  <!-- Diamond Rhombus Finials on All 8 Tips -->
  <polygon points="42,8 44,6 42,4 40,6" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <polygon points="58,8 60,6 58,4 56,6" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <polygon points="42,92 44,94 42,96 40,94" fill="#ffffff"/>
  <polygon points="58,92 60,94 58,96 56,94" fill="#ffffff"/>
  <polygon points="8,42 6,44 4,42 6,40" fill="#ffffff"/>
  <polygon points="8,58 6,60 4,58 6,56" fill="#ffffff"/>
  <polygon points="92,42 94,44 96,42 94,40" fill="#ffffff"/>
  <polygon points="92,58 94,60 96,58 94,56" fill="#ffffff"/>

  <!-- Central Heraldic Octagonal Medallion with Sovereign Coronet Crest -->
  <polygon points="40,30 60,30 70,40 70,60 60,70 40,70 30,60 30,40" fill="url(#st2_goldLit)" stroke="#231502" stroke-width="0.8"/>
  <polygon points="42,32 58,32 68,42 68,58 58,68 42,68 32,58 32,42" fill="#140f06"/>

  <!-- Geometric Crown Emblem in Relief -->
  <polygon points="40,56 42,46 46,52 50,42 54,52 58,46 60,56" fill="url(#st2_goldLit)"/>
  <polygon points="50,42 51,44 50,46 49,44" fill="#ffffff"/>
  <polygon points="42,46 43,48 42,50 41,48" fill="#ffffff"/>
  <polygon points="58,46 59,48 58,50 57,48" fill="#ffffff"/>
  <line x1="40" y1="57" x2="60" y2="57" stroke="url(#st2_goldLit)" stroke-width="1.2"/>
</svg>`;

// (15) star3 — Polyhedral Astral Constellation
window.SOVEREIGN_ARTIFACTS.star_constellation = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="st3_shadow" cx="50%" cy="88%" r="46%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="st3_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#faecc5"/>
      <stop offset="55%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="st3_goldShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8a6117"/>
      <stop offset="50%" stop-color="#55380b"/>
      <stop offset="100%" stop-color="#231502"/>
    </linearGradient>
    <linearGradient id="st3_sapphire" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#93c5fd"/>
      <stop offset="35%" stop-color="#2563eb"/>
      <stop offset="70%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <ellipse cx="50" cy="88" rx="36" ry="6" fill="url(#st3_shadow)"/>

  <!-- 3D Stellated Polyhedral Astral Star Lattice -->
  <!-- 4 Cardinal Long Polyhedral Spires -->
  <polygon points="50,6 43,30 50,42" fill="url(#st3_goldLit)"/>
  <polygon points="50,6 57,30 50,42" fill="url(#st3_goldShd)"/>
  <line x1="50" y1="6" x2="50" y2="42" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>

  <polygon points="50,94 57,70 50,58" fill="url(#st3_goldLit)"/>
  <polygon points="50,94 43,70 50,58" fill="url(#st3_goldShd)"/>
  <line x1="50" y1="94" x2="50" y2="58" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>

  <polygon points="94,50 70,43 58,50" fill="url(#st3_goldLit)"/>
  <polygon points="94,50 70,57 58,50" fill="url(#st3_goldShd)"/>
  <line x1="94" y1="50" x2="58" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>

  <polygon points="6,50 30,57 42,50" fill="url(#st3_goldLit)"/>
  <polygon points="6,50 30,43 42,50" fill="url(#st3_goldShd)"/>
  <line x1="6" y1="50" x2="42" y2="50" stroke="#ffffff" stroke-width="0.8" opacity="0.95"/>

  <!-- 4 Diagonal Polyhedral Spires -->
  <polygon points="19,19 40,32 50,50" fill="url(#st3_goldLit)"/>
  <polygon points="19,19 32,40 50,50" fill="url(#st3_goldShd)"/>
  <polygon points="81,19 60,32 50,50" fill="url(#st3_goldLit)"/>
  <polygon points="81,19 68,40 50,50" fill="url(#st3_goldShd)"/>
  <polygon points="81,81 60,68 50,50" fill="url(#st3_goldLit)"/>
  <polygon points="81,81 68,60 50,50" fill="url(#st3_goldShd)"/>
  <polygon points="19,81 32,68 50,50" fill="url(#st3_goldLit)"/>
  <polygon points="19,81 40,60 50,50" fill="url(#st3_goldShd)"/>

  <!-- Crystalline Struts Forming Icosahedron Lattice Frame -->
  <g fill="none" stroke="url(#st3_goldLit)" stroke-width="1.2" opacity="0.85">
    <polygon points="50,6 81,19 94,50 81,81 50,94 19,81 6,50 19,19"/>
  </g>

  <!-- 8 Node Vertices with Diamond Pips -->
  <polygon points="50,6 52,9 50,12 48,9" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <polygon points="94,50 97,52 94,54 91,52" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)"/>
  <polygon points="50,94 52,97 50,100 48,97" fill="#ffffff"/>
  <polygon points="6,50 9,52 6,54 3,52" fill="#ffffff"/>

  <!-- Center Cushion-Cut Ceylon Sapphire in Octagonal Gold Setting -->
  <polygon points="38,28 62,28 72,38 72,62 62,72 38,72 28,62 28,38" fill="url(#st3_goldLit)" stroke="#231502" stroke-width="0.8"/>
  <polygon points="40,30 60,30 70,40 70,60 60,70 40,70 30,60 30,40" fill="url(#st3_goldShd)"/>

  <!-- Sapphire Faceted Gemstone (Step-Cut Octagonal Crystal) -->
  <polygon points="42,32 58,32 68,42 68,58 58,68 42,68 32,58 32,42" fill="url(#st3_sapphire)"/>
  <polygon points="44,35 56,35 64,43 64,57 56,65 44,65 36,57 36,43" fill="#1e40af" opacity="0.7"/>
  <!-- Specular Table Flare -->
  <polygon points="44,35 52,35 50,42 42,42" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)"/>

  <!-- 8 Gold Claws Gripping Gemstone Corners -->
  <polygon points="32,40 35,38 37,42 34,44" fill="url(#st3_goldLit)"/>
  <polygon points="68,40 65,38 63,42 66,44" fill="url(#st3_goldLit)"/>
  <polygon points="68,60 65,62 63,58 66,56" fill="url(#st3_goldLit)"/>
  <polygon points="32,60 35,62 37,58 34,56" fill="url(#st3_goldLit)"/>
</svg>`;

// (16) star4 — Zenith 16-Point Platinum Diamond Star
window.SOVEREIGN_ARTIFACTS.star_zenith = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="st4_shadow" cx="50%" cy="88%" r="46%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="st4_platLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#f1f5f9"/>
      <stop offset="70%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <linearGradient id="st4_platShd" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="55%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="st4_goldLit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#faecc5"/>
      <stop offset="60%" stop-color="#dcae4a"/>
      <stop offset="100%" stop-color="#b08427"/>
    </linearGradient>
    <linearGradient id="st4_diaFacet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="45%" stop-color="#e0f2fe"/>
      <stop offset="100%" stop-color="#bae6fd"/>
    </linearGradient>
  </defs>

  <!-- Ground Ambient Contact Shadow -->
  <ellipse cx="50" cy="88" rx="36" ry="6" fill="url(#st4_shadow)"/>

  <!-- 16 Platinum Razor-Faceted Star Rays with Knife-Edge Center Spines -->
  <!-- 4 Primary Cardinal Rays -->
  <!-- Top (Peak at y=4) -->
  <polygon points="50,4 42,26 50,44" fill="url(#st4_platLit)"/>
  <polygon points="50,4 58,26 50,44" fill="url(#st4_platShd)"/>
  <line x1="50" y1="4" x2="50" y2="44" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>

  <!-- Right (Peak at x=96) -->
  <polygon points="96,50 74,42 56,50" fill="url(#st4_platLit)"/>
  <polygon points="96,50 74,58 56,50" fill="url(#st4_platShd)"/>
  <line x1="96" y1="50" x2="56" y2="50" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>

  <!-- Bottom (Peak at y=96) -->
  <polygon points="50,96 58,74 50,56" fill="url(#st4_platLit)"/>
  <polygon points="50,96 42,74 50,56" fill="url(#st4_platShd)"/>
  <line x1="50" y1="96" x2="50" y2="56" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>

  <!-- Left (Peak at x=4) -->
  <polygon points="4,50 26,58 44,50" fill="url(#st4_platLit)"/>
  <polygon points="4,50 26,42 44,50" fill="url(#st4_platShd)"/>
  <line x1="4" y1="50" x2="44" y2="50" stroke="#ffffff" stroke-width="0.9" opacity="0.95"/>

  <!-- 4 Diagonal Medium Rays (45 deg) -->
  <polygon points="17,17 38,30 50,50" fill="url(#st4_platLit)"/>
  <polygon points="17,17 30,38 50,50" fill="url(#st4_platShd)"/>
  <polygon points="83,17 62,30 50,50" fill="url(#st4_platLit)"/>
  <polygon points="83,17 70,38 50,50" fill="url(#st4_platShd)"/>
  <polygon points="83,83 62,70 50,50" fill="url(#st4_platLit)"/>
  <polygon points="83,83 70,62 50,50" fill="url(#st4_platShd)"/>
  <polygon points="17,83 30,62 50,50" fill="url(#st4_platLit)"/>
  <polygon points="17,83 38,70 50,50" fill="url(#st4_platShd)"/>

  <!-- 8 Inset 24K Gold Chevrons on Primary Axes -->
  <polygon points="50,18 46,28 54,28" fill="url(#st4_goldLit)"/>
  <polygon points="82,50 72,46 72,54" fill="url(#st4_goldLit)"/>
  <polygon points="50,82 46,72 54,72" fill="url(#st4_goldLit)"/>
  <polygon points="18,50 28,46 28,54" fill="url(#st4_goldLit)"/>

  <!-- Center Colossal Solitaire Diamond in Raised Octagonal Platinum Basket -->
  <polygon points="38,28 62,28 72,38 72,62 62,72 38,72 28,62 28,38" fill="url(#st4_platLit)" stroke="#0f172a" stroke-width="0.8"/>
  <polygon points="40,30 60,30 70,40 70,60 60,70 40,70 30,60 30,40" fill="url(#st4_platShd)"/>

  <!-- Brilliant-Cut Diamond Facets (Octagonal Table & 8 Triangular Pavilion Facets) -->
  <polygon points="42,32 58,32 68,42 68,58 58,68 42,68 32,58 32,42" fill="url(#st4_diaFacet)"/>
  <!-- Inner Table Octagon -->
  <polygon points="45,36 55,36 62,43 62,57 55,64 45,64 38,57 38,43" fill="#ffffff"/>
  <!-- Specular Flare Core -->
  <polygon points="45,36 55,36 50,44" fill="#ffffff" filter="drop-shadow(0 0 5px #fff)"/>
  <circle cx="50" cy="50" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #fff)"/>

  <!-- 8 Platinum Corner Prongs -->
  <polygon points="31,39 34,36 36,40 33,42" fill="url(#st4_platLit)"/>
  <polygon points="69,39 66,36 64,40 67,42" fill="url(#st4_platLit)"/>
  <polygon points="69,61 66,64 64,60 67,58" fill="url(#st4_platLit)"/>
  <polygon points="31,61 34,64 36,60 33,58" fill="url(#st4_platLit)"/>
</svg>`;


// =========================================================
// 5. RARE ARTIFACTS
// =========================================================

// // (17) art1 — Haute Horlogerie Geometric Pocket Relic
window.SOVEREIGN_ARTIFACTS.art_tourbillon = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Contact Ambient Shadow on Pedestal -->
    <radialGradient id="ar1_shadow" cx="50%" cy="88%" r="42%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="55%" stop-color="#000000" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Master 24K Sovereign Gold Gradient -->
    <linearGradient id="ar1_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="18%" stop-color="#faecc5"/>
      <stop offset="45%" stop-color="#dcae4a"/>
      <stop offset="72%" stop-color="#9a6e1f"/>
      <stop offset="90%" stop-color="#5a3d0e"/>
      <stop offset="100%" stop-color="#231702"/>
    </linearGradient>

    <!-- Rose Gold / Copper Metallic Gradient -->
    <linearGradient id="ar1_rose" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff5f0"/>
      <stop offset="25%" stop-color="#fad5c3"/>
      <stop offset="55%" stop-color="#e89f80"/>
      <stop offset="85%" stop-color="#b26344"/>
      <stop offset="100%" stop-color="#4e2112"/>
    </linearGradient>

    <!-- Titanium / Platinum Bezel Gradient -->
    <linearGradient id="ar1_ti" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#cbd5e1"/>
      <stop offset="70%" stop-color="#64748b"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>

    <!-- Anthracite Grand Feu Enamel Dial Gradient -->
    <radialGradient id="ar1_dial" cx="50%" cy="56%" r="35%">
      <stop offset="0%" stop-color="#221e1a"/>
      <stop offset="55%" stop-color="#120f0d"/>
      <stop offset="100%" stop-color="#050404"/>
    </radialGradient>

    <!-- Royal Ceylon Sapphire Cabochon Gradient -->
    <radialGradient id="ar1_sapphire" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#93c5fd"/>
      <stop offset="25%" stop-color="#3b82f6"/>
      <stop offset="60%" stop-color="#1d4ed8"/>
      <stop offset="85%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </radialGradient>

    <!-- Synthetic Pigeon-Blood Ruby Pivot Jewel Gradient -->
    <radialGradient id="ar1_ruby" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#ffe4e6"/>
      <stop offset="30%" stop-color="#fb7185"/>
      <stop offset="65%" stop-color="#e11d48"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </radialGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal Surface -->
  <polygon points="18,88 50,84 82,88 50,93" fill="url(#ar1_shadow)"/>

  <!-- 1. Top Winding Crown & Geometric Suspension Bow at 12 o'clock -->
  <!-- Octagonal Bow Ring with Faceted 3D Gold Planes -->
  <polygon points="34,10 66,10 70,18 64,22 58,16 42,16 36,22 30,18" fill="url(#ar1_gold)" stroke="#5a3d0e" stroke-width="0.7"/>
  <polygon points="36,12 64,12 67,17 62,20 57,15 43,15 38,20 33,17" fill="#ffffff" opacity="0.35"/>
  
  <!-- Stepped Octagonal Winding Crown Stem & Bezel -->
  <polygon points="44,22 56,22 58,18 56,15 44,15 42,18" fill="url(#ar1_gold)" stroke="#5a3d0e" stroke-width="0.6"/>
  <!-- Faceted Emerald-Cut Sapphire Cabochon set in Crown -->
  <polygon points="46,18 54,18 56,15 54,12 46,12 44,15" fill="url(#ar1_sapphire)" stroke="url(#ar1_gold)" stroke-width="0.5"/>
  <polygon points="47,14 53,14 54,15 46,15" fill="#ffffff" opacity="0.8"/>

  <!-- 2. Master Octagonal Watch Case (Bulgari Octo / Audemars Piguet Architecture) -->
  <!-- Outer Octagonal Case Body: Center cx=50, cy=56, span 68x68 -->
  <polygon points="31,25 69,25 84,40 84,72 69,87 31,87 16,72 16,40" fill="url(#ar1_rose)" stroke="#5a2918" stroke-width="1.2"/>
  
  <!-- Outer Faceted Bevel Ring (Split-Facet Reflections) -->
  <!-- Top Bevel Plane -->
  <polygon points="31,25 69,25 67,28 33,28" fill="#ffffff" opacity="0.6"/>
  <!-- Top-Right Bevel Plane -->
  <polygon points="69,25 84,40 81,42 67,28" fill="#dcae4a" opacity="0.5"/>
  <!-- Right Bevel Plane -->
  <polygon points="84,40 84,72 81,70 81,42" fill="#5a3d0e" opacity="0.6"/>
  <!-- Bottom-Right Bevel Plane -->
  <polygon points="84,72 69,87 67,84 81,70" fill="#231702" opacity="0.8"/>
  <!-- Bottom Bevel Plane -->
  <polygon points="69,87 31,87 33,84 67,84" fill="#3b2608" opacity="0.7"/>
  <!-- Left Bevel Plane -->
  <polygon points="16,40 16,72 19,70 19,42" fill="#ffffff" opacity="0.4"/>
  <!-- Top-Left Bevel Plane -->
  <polygon points="31,25 16,40 19,42 33,28" fill="#ffffff" opacity="0.75"/>

  <!-- Stepped Inner 24K Gold Octagonal Bezel -->
  <polygon points="33,28 67,28 81,42 81,70 67,84 33,84 19,70 19,42" fill="url(#ar1_gold)" stroke="#5a3d0e" stroke-width="0.8"/>
  
  <!-- 8 Inset Hexagonal Titanium Screws at the 8 Vertices -->
  <!-- Top-Left (33,28) -->
  <polygon points="32,27 34,27 35,28 34,29 32,29 31,28" fill="url(#ar1_ti)"/>
  <!-- Top-Right (67,28) -->
  <polygon points="66,27 68,27 69,28 68,29 66,29 65,28" fill="url(#ar1_ti)"/>
  <!-- Right-Top (81,42) -->
  <polygon points="80,41 82,41 83,42 82,43 80,43 79,42" fill="url(#ar1_ti)"/>
  <!-- Right-Bottom (81,70) -->
  <polygon points="80,69 82,69 83,70 82,71 80,71 79,70" fill="url(#ar1_ti)"/>
  <!-- Bottom-Right (67,84) -->
  <polygon points="66,83 68,83 69,84 68,85 66,85 65,84" fill="url(#ar1_ti)"/>
  <!-- Bottom-Left (33,84) -->
  <polygon points="32,83 34,83 35,84 34,85 32,85 31,84" fill="url(#ar1_ti)"/>
  <!-- Left-Bottom (19,70) -->
  <polygon points="18,69 20,69 21,70 20,71 18,71 17,70" fill="url(#ar1_ti)"/>
  <!-- Left-Top (19,42) -->
  <polygon points="18,41 20,41 21,42 20,43 18,43 17,42" fill="url(#ar1_ti)"/>

  <!-- 3. Anthracite Grand Feu Enamel Octagonal Chapter Dial -->
  <polygon points="35,31 65,31 77,43 77,69 65,81 35,81 23,69 23,43" fill="url(#ar1_dial)" stroke="#5a3d0e" stroke-width="0.8"/>
  <polygon points="36,33 64,33 75,44 75,68 64,79 36,79 25,68 25,44" fill="none" stroke="url(#ar1_gold)" stroke-width="0.5" stroke-dasharray="1.5 1"/>

  <!-- 12 Faceted Geometric Diamond Baton Hour Indices -->
  <!-- 12 o'clock (50,33) -->
  <polygon points="49,32 51,32 50.5,37 49.5,37" fill="#ffffff"/>
  <!-- 1 o'clock (60,36) -->
  <polygon points="59,35 61,36 58,39 57,38" fill="url(#ar1_gold)"/>
  <!-- 2 o'clock (68,43) -->
  <polygon points="67,42 69,44 65,46 64,45" fill="url(#ar1_gold)"/>
  <!-- 3 o'clock (74,56) -->
  <polygon points="75,55 75,57 70,56.5 70,55.5" fill="#ffffff"/>
  <!-- 4 o'clock (68,69) -->
  <polygon points="69,68 67,70 64,67 65,66" fill="url(#ar1_gold)"/>
  <!-- 5 o'clock (60,76) -->
  <polygon points="61,76 59,77 57,74 58,73" fill="url(#ar1_gold)"/>
  <!-- 6 o'clock (50,79) -->
  <polygon points="49,80 51,80 50.5,75 49.5,75" fill="#ffffff"/>
  <!-- 7 o'clock (40,76) -->
  <polygon points="39,77 41,76 42,73 43,74" fill="url(#ar1_gold)"/>
  <!-- 8 o'clock (32,69) -->
  <polygon points="31,70 33,68 36,66 35,67" fill="url(#ar1_gold)"/>
  <!-- 9 o'clock (26,56) -->
  <polygon points="25,55 25,57 30,56.5 30,55.5" fill="#ffffff"/>
  <!-- 10 o'clock (32,43) -->
  <polygon points="33,42 31,44 35,46 36,45" fill="url(#ar1_gold)"/>
  <!-- 11 o'clock (40,36) -->
  <polygon points="41,35 39,36 42,39 43,38" fill="url(#ar1_gold)"/>

  <!-- 4. Exposed Geometric Skeleton Train & Bridges (Center-Left) -->
  <!-- Stepped Hexagonal Mainplate Openings -->
  <polygon points="40,40 48,37 54,42 50,49 42,48 37,44" fill="#090807" stroke="url(#ar1_gold)" stroke-width="0.7"/>
  <!-- Milled Gear Wheels with Crisp Triangular Teeth -->
  <polygon points="46,40 48,42 47,45 44,46 42,44 43,41" fill="url(#ar1_gold)" stroke="#5a3d0e" stroke-width="0.4"/>
  <!-- Center Pinion & Heat-Blued Screws -->
  <polygon points="44.5,42.5 45.5,42.5 46,43.5 45.5,44.5 44.5,44.5 44,43.5" fill="#38bdf8"/>

  <!-- 5. Flying Geometric Tourbillon Carriage at 6 o'clock (cx=50, cy=66) -->
  <!-- Outer Hexagonal Tourbillon Aperture -->
  <polygon points="43,58 57,58 64,65 64,69 57,75 43,75 36,69 36,65" fill="#030303" stroke="url(#ar1_gold)" stroke-width="1"/>
  
  <!-- 3-Spoke Faceted Triangular Tourbillon Cage Bridge -->
  <polygon points="50,60 52,66 61,71 58,72 50,67 42,72 39,71 48,66" fill="url(#ar1_gold)" stroke="#5a3d0e" stroke-width="0.4"/>
  <line x1="50" y1="60" x2="50" y2="67" stroke="#ffffff" stroke-width="0.6"/>
  <line x1="50" y1="67" x2="61" y2="71" stroke="#ffffff" stroke-width="0.5"/>
  <line x1="50" y1="67" x2="39" y2="71" stroke="#ffffff" stroke-width="0.5"/>

  <!-- Synthetic Pigeon-Blood Ruby Pivot Jewel in Hexagonal Gold Chaton -->
  <polygon points="48,64 52,64 54,66 52,68 48,68 46,66" fill="url(#ar1_gold)"/>
  <polygon points="48.5,64.8 51.5,64.8 53,66 51.5,67.2 48.5,67.2 47,66" fill="url(#ar1_ruby)"/>
  <polygon points="49.5,65.2 51,65.2 51.5,66 50,66" fill="#ffffff" opacity="0.9"/>

  <!-- 6. Faceted Geometric Dauphine Hands in Flame-Blued Steel -->
  <!-- Minute Hand pointing to 12 o'clock: Split-Facet 3D Geometry -->
  <polygon points="50,56 48.5,54 49.5,36 50,34 50,56" fill="#38bdf8" filter="drop-shadow(0 0 1.5px #0284c7)"/>
  <polygon points="50,56 51.5,54 50.5,36 50,34 50,56" fill="#1d4ed8"/>
  <line x1="50" y1="56" x2="50" y2="34" stroke="#ffffff" stroke-width="0.5" opacity="0.9"/>

  <!-- Hour Hand pointing to 2 o'clock: Split-Facet 3D Geometry -->
  <polygon points="50,56 50.5,54 62,45 64,44 50,56" fill="#38bdf8" filter="drop-shadow(0 0 1.5px #0284c7)"/>
  <polygon points="50,56 52,56.5 63,46 64,44 50,56" fill="#1e3a8a"/>

  <!-- Center Cannon Pinion Cap: Faceted 24K Gold Octagram -->
  <polygon points="48.5,54.5 51.5,54.5 53,56 51.5,57.5 48.5,57.5 47,56" fill="url(#ar1_gold)" stroke="#5a3d0e" stroke-width="0.4"/>
  <polygon points="49.2,55.2 50.8,55.2 51.5,56 50,56" fill="#ffffff"/>
</svg>`;

// (18) art2 — The Sovereign Golden Seal
window.SOVEREIGN_ARTIFACTS.art_seal = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Contact Ambient Shadow on Pedestal -->
    <radialGradient id="ar2_shadow" cx="50%" cy="88%" r="42%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="55%" stop-color="#000000" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Master 24K Sovereign Gold Gradient -->
    <linearGradient id="ar2_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="18%" stop-color="#faecc5"/>
      <stop offset="45%" stop-color="#dcae4a"/>
      <stop offset="72%" stop-color="#9a6e1f"/>
      <stop offset="90%" stop-color="#5a3d0e"/>
      <stop offset="100%" stop-color="#231702"/>
    </linearGradient>

    <!-- Deep Antique Shadow Gold Gradient -->
    <linearGradient id="ar2_goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7a5210"/>
      <stop offset="55%" stop-color="#4a3206"/>
      <stop offset="100%" stop-color="#180e02"/>
    </linearGradient>

    <!-- Chiseled Black Obsidian Crystalline Gradient -->
    <linearGradient id="ar2_obsidianLit" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#5a524a"/>
      <stop offset="40%" stop-color="#2e2722"/>
      <stop offset="80%" stop-color="#181412"/>
      <stop offset="100%" stop-color="#0a0807"/>
    </linearGradient>
    <linearGradient id="ar2_obsidianShad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1c1815"/>
      <stop offset="50%" stop-color="#0e0c0a"/>
      <stop offset="100%" stop-color="#040303"/>
    </linearGradient>

    <!-- Faceted Intaglio Emerald Inlay Gradient -->
    <radialGradient id="ar2_gem" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="35%" stop-color="#10b981"/>
      <stop offset="70%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </radialGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <polygon points="16,88 50,84 84,88 50,93" fill="url(#ar2_shadow)"/>

  <!-- 1. Top Finial: Faceted 24k Gold Stepped Pyramid Coronet -->
  <!-- Top Point (50,5) to Pyramid Base (44,13 to 56,13) -->
  <polygon points="50,5 44,13 50,15 50,5" fill="#ffffff" opacity="0.9"/>
  <polygon points="50,5 50,15 56,13 50,5" fill="url(#ar2_goldDark)"/>
  <polygon points="44,13 50,15 56,13 50,11" fill="url(#ar2_gold)"/>
  <!-- Brilliant Solitaire Diamond atop Finial -->
  <polygon points="50,3.5 51.5,5 50,6.5 48.5,5" fill="#ffffff"/>

  <!-- 2. Monolithic 8-Faceted Black Obsidian Grip Handle (y=13 to y=55) -->
  <!-- Left Shadow Facet -->
  <polygon points="44,13 36,22 35,46 41,55 45,55 39,46 40,22" fill="url(#ar2_obsidianShad)" stroke="#382e26" stroke-width="0.5"/>
  <!-- Center-Left Specular Lit Facet -->
  <polygon points="44,13 50,15 50,55 45,55 39,46 40,22" fill="url(#ar2_obsidianLit)" stroke="#52453a" stroke-width="0.5"/>
  <!-- Specular Reflection Blade on Center-Left Facet -->
  <polygon points="46,14 49,15 48,54 45,54" fill="#ffffff" opacity="0.25"/>
  <!-- Center-Right Shadow Facet -->
  <polygon points="50,15 56,13 60,22 61,46 55,55 50,55" fill="url(#ar2_obsidianShad)" stroke="#2a221b" stroke-width="0.5"/>
  <!-- Right Shadow Facet -->
  <polygon points="56,13 64,22 65,46 59,55 55,55 61,46 60,22" fill="#0a0807" stroke="#221b15" stroke-width="0.5"/>
  
  <!-- Razor White Center Ridge Line -->
  <line x1="50" y1="15" x2="50" y2="55" stroke="#ffffff" stroke-width="0.7" opacity="0.65"/>
  <line x1="44" y1="13" x2="41" y2="55" stroke="#ffffff" stroke-width="0.5" opacity="0.4"/>

  <!-- 3. Stepped 24K Gold Fluted Collar (y=55 to y=64) -->
  <!-- Tier 1: Upper Chamfered Octagonal Ring -->
  <polygon points="41,55 59,55 61,58 39,58" fill="url(#ar2_gold)" stroke="#5a3d0e" stroke-width="0.6"/>
  <line x1="41" y1="56" x2="59" y2="56" stroke="#ffffff" stroke-width="0.6" opacity="0.8"/>
  
  <!-- Tier 2: Fluted Acanthus Geometric Collar Plinth -->
  <polygon points="37,58 63,58 65,63 35,63" fill="url(#ar2_goldDark)" stroke="#3b2608" stroke-width="0.6"/>
  <!-- 5 Crisp Geometric Vertical Fluting Teeth -->
  <polygon points="38,58.5 40,58.5 41,62.5 39,62.5" fill="url(#ar2_gold)"/>
  <polygon points="43,58.5 45,58.5 46,62.5 44,62.5" fill="url(#ar2_gold)"/>
  <polygon points="49,58.5 51,58.5 51.5,62.5 49.5,62.5" fill="#ffffff" opacity="0.9"/>
  <polygon points="55,58.5 57,58.5 56,62.5 54,62.5" fill="url(#ar2_gold)"/>
  <polygon points="60,58.5 62,58.5 61,62.5 59,62.5" fill="url(#ar2_gold)"/>

  <!-- 4. Heavy Stepped Octagonal Plinth Base (y=63 to y=73) -->
  <polygon points="27,63 73,63 78,71 22,71" fill="url(#ar2_gold)" stroke="#5a3d0e" stroke-width="0.8"/>
  <!-- Specular Chamfer Highlight on Plinth -->
  <polygon points="28,64 72,64 71,65 29,65" fill="#ffffff" opacity="0.9"/>
  <!-- Engraved Geometric Guilloché Fretwork on Plinth Edge -->
  <line x1="24" y1="69" x2="76" y2="69" stroke="#ffffff" stroke-width="0.6" stroke-dasharray="2 1.5" opacity="0.85"/>

  <!-- 5. Lower Solid Ingot Seal Matrix Block (y=71 to y=84) -->
  <polygon points="18,71 82,71 85,83 15,83" fill="url(#ar2_gold)" stroke="#3b2608" stroke-width="1"/>
  <!-- Split-Facet Chamfer Lighting on Matrix Block Face -->
  <polygon points="18,71 50,71 50,83 15,83" fill="#ffffff" opacity="0.18"/>
  <polygon points="50,71 82,71 85,83 50,83" fill="#180e02" opacity="0.25"/>

  <!-- 6. Deeply Reverse-Engraved Sovereign Intaglio Seal on Matrix Face -->
  <!-- Sunken Octagonal Cartouche Frame -->
  <polygon points="34,73 66,73 70,81 30,81" fill="#180e02" stroke="url(#ar2_gold)" stroke-width="0.8"/>
  
  <!-- Intaglio Sovereign Emblem: Geometric "1%" Monogram in High Relief -->
  <!-- Digit '1' in Sharp Polygons -->
  <polygon points="39,78 41,75 43,75 43,79.5 41,79.5 41,77 40,78" fill="url(#ar2_gold)"/>
  <!-- Slash in Sharp Diamond Polygon -->
  <polygon points="48,74.5 49.5,74.5 45.5,80 44,80" fill="#ffffff"/>
  <!-- Top-Right Percent Inset Gem -->
  <polygon points="52,75 54,75 55,76 54,77 52,77 51,76" fill="url(#ar2_gem)"/>
  <!-- Bottom-Left Percent Inset Gem -->
  <polygon points="46,78 48,78 49,79 48,80 46,80 45,79" fill="url(#ar2_gem)"/>
  <!-- Masterpiece Octagonal Flank Diamonds -->
  <polygon points="31,77 32.5,75.5 34,77 32.5,78.5" fill="#ffffff"/>
  <polygon points="69,77 67.5,75.5 66,77 67.5,78.5" fill="#ffffff"/>
</svg>`;

// (19) art3 — Imperial Geometric Falcon Medallion
window.SOVEREIGN_ARTIFACTS.art_falcon_medallion = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Contact Ambient Shadow on Pedestal -->
    <radialGradient id="ar3_shadow" cx="50%" cy="88%" r="42%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="55%" stop-color="#000000" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Master 24K Sovereign Gold Gradient -->
    <linearGradient id="ar3_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="18%" stop-color="#faecc5"/>
      <stop offset="45%" stop-color="#dcae4a"/>
      <stop offset="72%" stop-color="#9a6e1f"/>
      <stop offset="90%" stop-color="#5a3d0e"/>
      <stop offset="100%" stop-color="#231702"/>
    </linearGradient>

    <!-- Deep Antique Shadow Gold Gradient -->
    <linearGradient id="ar3_goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7a5210"/>
      <stop offset="55%" stop-color="#4a3206"/>
      <stop offset="100%" stop-color="#180e02"/>
    </linearGradient>

    <!-- Crimson Moiré Silk Ribbon Gradient -->
    <linearGradient id="ar3_ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#450a0a"/>
      <stop offset="25%" stop-color="#991b1b"/>
      <stop offset="50%" stop-color="#ef4444"/>
      <stop offset="75%" stop-color="#991b1b"/>
      <stop offset="100%" stop-color="#450a0a"/>
    </linearGradient>

    <!-- Colombian Emerald Gemstone Gradient -->
    <radialGradient id="ar3_emerald" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="25%" stop-color="#34d399"/>
      <stop offset="60%" stop-color="#059669"/>
      <stop offset="85%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </radialGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal -->
  <polygon points="16,88 50,84 84,88 50,93" fill="url(#ar3_shadow)"/>

  <!-- 1. Geometric Silk Moiré Neck Ribbon Mount (Chevron Fold) -->
  <polygon points="34,6 66,6 72,26 50,32 28,26" fill="url(#ar3_ribbon)" stroke="#2b0505" stroke-width="0.8"/>
  <!-- Gold Pinstripe Brocade Ribbons -->
  <polygon points="48,6 52,6 51,32 49,32" fill="url(#ar3_gold)"/>
  <line x1="38" y1="6" x2="35" y2="26" stroke="url(#ar3_gold)" stroke-width="0.8"/>
  <line x1="62" y1="6" x2="65" y2="26" stroke="url(#ar3_gold)" stroke-width="0.8"/>

  <!-- 2. Stepped Octagonal Gold Suspension Clasp & Bail Ring -->
  <!-- Gold Clasp Bar -->
  <polygon points="42,27 58,27 60,32 40,32" fill="url(#ar3_gold)" stroke="#5a3d0e" stroke-width="0.6"/>
  <line x1="43" y1="28" x2="57" y2="28" stroke="#ffffff" stroke-width="0.6"/>
  <!-- Octagonal Suspension Bail Ring -->
  <polygon points="46,31 54,31 57,34 57,38 54,41 46,41 43,38 43,34" fill="url(#ar3_gold)" stroke="#5a3d0e" stroke-width="0.8"/>
  <polygon points="48,33 52,33 54,35 54,37 52,39 48,39 46,37 46,35" fill="#000000"/>

  <!-- 3. Heavy Octagonal Medallion Frame (Center cx=50, cy=63, span 56x56) -->
  <!-- Outer Octagon Frame with Split Chamfer Facets -->
  <polygon points="32,43 68,43 80,55 80,71 68,83 32,83 20,71 20,55" fill="url(#ar3_gold)" stroke="#5a3d0e" stroke-width="1.2"/>
  
  <!-- Outer Chamfer Specular Edge Facets -->
  <polygon points="32,43 68,43 66,45 34,45" fill="#ffffff" opacity="0.8"/>
  <polygon points="68,43 80,55 77,56 66,45" fill="#dcae4a" opacity="0.5"/>
  <polygon points="80,55 80,71 77,69 77,56" fill="#5a3d0e" opacity="0.6"/>
  <polygon points="80,71 68,83 66,81 77,69" fill="#231702" opacity="0.8"/>
  <polygon points="68,83 32,83 34,81 66,81" fill="#3b2608" opacity="0.7"/>
  <polygon points="32,83 20,71 23,69 34,81" fill="#ffffff" opacity="0.3"/>
  <polygon points="20,71 20,55 23,56 23,69" fill="#ffffff" opacity="0.5"/>
  <polygon points="20,55 32,43 34,45 23,56" fill="#ffffff" opacity="0.85"/>

  <!-- Stepped Inner Obsidian Octagonal Table -->
  <polygon points="34,45 66,45 77,56 77,70 66,81 34,81 23,70 23,56" fill="#120f0d" stroke="url(#ar3_gold)" stroke-width="0.8"/>
  <polygon points="36,47 64,47 74,57 74,69 64,79 36,79 26,69 26,57" fill="#080605"/>

  <!-- 4. Low-Poly 3D Geometric Sovereign Falcon in Bas-Relief -->
  <!-- Falcon Head & Crest in Chiseled Polygons -->
  <polygon points="48,46 52,46 54,49 53,53 50,55 47,53 46,49" fill="url(#ar3_gold)"/>
  <polygon points="48,46 50,46 50,55 47,53 46,49" fill="#ffffff" opacity="0.35"/>
  <!-- Sharp Geometric Beak -->
  <polygon points="52,49 56,51 52,52" fill="#231702"/>
  <!-- Hexagonal Colombian Emerald Eye -->
  <polygon points="48.5,49 50.5,49 51.5,50 50.5,51 48.5,51 47.5,50" fill="url(#ar3_emerald)" stroke="url(#ar3_gold)" stroke-width="0.3"/>
  <polygon points="49,49.3 50,49.3 50.5,50 49,50" fill="#ffffff"/>

  <!-- Left Spread Wing: 3 Tiered Geometric Flight Blades -->
  <!-- Upper Blade (Lit Specular Plane) -->
  <polygon points="50,53 42,48 30,53 42,57" fill="#ffffff" opacity="0.85"/>
  <polygon points="42,48 30,53 42,57 50,53" fill="url(#ar3_gold)"/>
  <!-- Middle Blade -->
  <polygon points="42,57 28,57 24,63 40,63" fill="url(#ar3_gold)" stroke="#5a3d0e" stroke-width="0.4"/>
  <polygon points="42,57 28,57 40,63" fill="#ffffff" opacity="0.25"/>
  <!-- Primary Lower Flight Blade -->
  <polygon points="40,63 23,66 26,72 43,67" fill="url(#ar3_goldDark)" stroke="#3b2608" stroke-width="0.4"/>

  <!-- Right Spread Wing: 3 Tiered Geometric Flight Blades -->
  <!-- Upper Blade -->
  <polygon points="50,53 58,48 70,53 58,57" fill="url(#ar3_gold)" stroke="#5a3d0e" stroke-width="0.4"/>
  <polygon points="58,48 70,53 58,57" fill="url(#ar3_goldDark)"/>
  <!-- Middle Blade -->
  <polygon points="58,57 72,57 76,63 60,63" fill="url(#ar3_goldDark)" stroke="#3b2608" stroke-width="0.4"/>
  <!-- Primary Lower Flight Blade -->
  <polygon points="60,63 77,66 74,72 57,67" fill="#231702" stroke="#180e02" stroke-width="0.4"/>

  <!-- Falcon Chiseled Chest Breastplate -->
  <polygon points="50,54 46,59 50,67 50,54" fill="#ffffff" opacity="0.4"/>
  <polygon points="50,54 54,59 50,67 50,54" fill="url(#ar3_goldDark)"/>
  <line x1="50" y1="54" x2="50" y2="67" stroke="#ffffff" stroke-width="0.6"/>

  <!-- Faceted Tail Feathers Fan -->
  <polygon points="46,67 54,67 57,75 50,78 43,75" fill="url(#ar3_gold)" stroke="#5a3d0e" stroke-width="0.5"/>
  <polygon points="46,67 50,67 50,78 43,75" fill="#ffffff" opacity="0.3"/>

  <!-- Stepped Octagonal Perch Ingot & Talons -->
  <polygon points="36,73 64,73 66,76 34,76" fill="url(#ar3_gold)" stroke="#5a3d0e" stroke-width="0.6"/>
  <!-- Left Talon -->
  <polygon points="43,72 46,72 45,75 42,75" fill="#ffffff"/>
  <!-- Right Talon -->
  <polygon points="54,72 57,72 58,75 55,75" fill="#ffffff"/>
</svg>`;

// (20) art4 — Sovereign Geometric Scepter of Authority
window.SOVEREIGN_ARTIFACTS.art_scepter = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Contact Ambient Shadow on Pedestal -->
    <radialGradient id="ar4_shadow" cx="50%" cy="92%" r="48%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.8"/>
      <stop offset="55%" stop-color="#000000" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Master 24K Sovereign Gold Gradient -->
    <linearGradient id="ar4_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="18%" stop-color="#faecc5"/>
      <stop offset="45%" stop-color="#dcae4a"/>
      <stop offset="72%" stop-color="#9a6e1f"/>
      <stop offset="90%" stop-color="#5a3d0e"/>
      <stop offset="100%" stop-color="#231702"/>
    </linearGradient>

    <!-- Deep Antique Shadow Gold Gradient -->
    <linearGradient id="ar4_goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7a5210"/>
      <stop offset="55%" stop-color="#4a3206"/>
      <stop offset="100%" stop-color="#180e02"/>
    </linearGradient>

    <!-- Fluted Hexagonal Obsidian Column Gradients -->
    <linearGradient id="ar4_obsLit" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4a423a"/>
      <stop offset="50%" stop-color="#241e1a"/>
      <stop offset="100%" stop-color="#120f0d"/>
    </linearGradient>
    <linearGradient id="ar4_obsShad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#181412"/>
      <stop offset="50%" stop-color="#0a0807"/>
      <stop offset="100%" stop-color="#020202"/>
    </linearGradient>

    <!-- Faceted Royal Pigeon-Blood Ruby Gradient -->
    <radialGradient id="ar4_ruby" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#ffe4e6"/>
      <stop offset="25%" stop-color="#fb7185"/>
      <stop offset="60%" stop-color="#e11d48"/>
      <stop offset="85%" stop-color="#881337"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </radialGradient>
  </defs>

  <!-- Ambient Contact Shadow on Pedestal Surface -->
  <polygon points="26,92 50,88 74,92 50,96" fill="url(#ar4_shadow)"/>

  <!-- 1. Scepter Pommel Base: Multi-Tiered Beveled Gold Pyramid Finial -->
  <polygon points="43,87 57,87 55,92 50,95 45,92" fill="url(#ar4_gold)" stroke="#5a3d0e" stroke-width="0.6"/>
  <!-- Stepped Octagonal Pommel Collar -->
  <polygon points="41,85 59,85 57,87 43,87" fill="#ffffff" opacity="0.75"/>
  <!-- Faceted Rhombus Base Ruby -->
  <polygon points="48,89 52,89 50,93.5" fill="url(#ar4_ruby)"/>
  <polygon points="49,89.5 51,89.5 50,91" fill="#ffffff" opacity="0.9"/>

  <!-- 2. Hexagonal Fluted Obsidian Column Shaft (y=36 to y=85) -->
  <!-- Left Shadow Column Plane -->
  <polygon points="44,36 47,36 47,85 44,85" fill="url(#ar4_obsShad)" stroke="#221b15" stroke-width="0.4"/>
  <!-- Center-Left Specular Highlight Column Plane -->
  <polygon points="47,36 50,36 50,85 47,85" fill="url(#ar4_obsLit)" stroke="#382e26" stroke-width="0.4"/>
  <line x1="48.5" y1="36" x2="48.5" y2="85" stroke="#ffffff" stroke-width="0.6" opacity="0.6"/>
  <!-- Center-Right Midtone Column Plane -->
  <polygon points="50,36 53,36 53,85 50,85" fill="url(#ar4_obsLit)" stroke="#382e26" stroke-width="0.4"/>
  <!-- Right Deep Shadow Column Plane -->
  <polygon points="53,36 56,36 56,85 53,85" fill="url(#ar4_obsShad)" stroke="#1a1511" stroke-width="0.4"/>
  <!-- Razor Center Spine -->
  <line x1="50" y1="36" x2="50" y2="85" stroke="#ffffff" stroke-width="0.7" opacity="0.8"/>

  <!-- 3. Interlocking Geometric Gold Spiral Ribbons Wrapping Shaft -->
  <polygon points="44,43 50,45 56,47 56,49 50,47 44,45" fill="url(#ar4_gold)"/>
  <polygon points="44,53 50,55 56,57 56,59 50,57 44,55" fill="url(#ar4_gold)"/>
  <polygon points="44,63 50,65 56,67 56,69 50,67 44,65" fill="url(#ar4_gold)"/>
  <polygon points="44,73 50,75 56,77 56,79 50,77 44,75" fill="url(#ar4_gold)"/>
  <!-- Gold Knurled Intermediate Ring Bands -->
  <polygon points="42,50 58,50 57,52 43,52" fill="url(#ar4_gold)" stroke="#5a3d0e" stroke-width="0.4"/>
  <polygon points="42,70 58,70 57,72 43,72" fill="url(#ar4_gold)" stroke="#5a3d0e" stroke-width="0.4"/>

  <!-- 4. Upper Capital: Stepped Geometric Corinthian Pedestal (y=29 to y=36) -->
  <polygon points="41,36 59,36 61,33 39,33" fill="url(#ar4_goldDark)" stroke="#3b2608" stroke-width="0.6"/>
  <polygon points="38,33 62,33 64,30 36,30" fill="url(#ar4_gold)" stroke="#5a3d0e" stroke-width="0.6"/>
  <line x1="37" y1="31" x2="63" y2="31" stroke="#ffffff" stroke-width="0.6" opacity="0.85"/>
  <!-- Angular Bracket Spires supporting Orb -->
  <polygon points="36,30 40,26 44,30" fill="url(#ar4_gold)"/>
  <polygon points="64,30 60,26 56,30" fill="url(#ar4_gold)"/>

  <!-- 5. Master 3D Faceted Icosahedral Sovereign Celestial Orb (cx=50, cy=19, span 24x24) -->
  <!-- Top Center Facet (Lit Specular) -->
  <polygon points="50,7 43,14 50,17" fill="#ffffff" opacity="0.95"/>
  <polygon points="50,7 50,17 57,14" fill="#faecc5"/>
  <!-- Upper Left Facet -->
  <polygon points="50,7 38,14 43,14" fill="#faecc5"/>
  <polygon points="38,14 36,20 43,21 43,14" fill="#dcae4a"/>
  <!-- Upper Right Facet -->
  <polygon points="50,7 57,14 62,14" fill="#dcae4a"/>
  <polygon points="62,14 64,20 57,21 57,14" fill="#9a6e1f"/>
  <!-- Center Front Facets -->
  <polygon points="43,14 50,17 43,21" fill="#ffffff" opacity="0.75"/>
  <polygon points="50,17 57,14 57,21" fill="#dcae4a"/>
  <!-- Lower Front Facets -->
  <polygon points="43,21 50,17 50,28" fill="#dcae4a"/>
  <polygon points="50,17 57,21 50,28" fill="#9a6e1f"/>
  <!-- Lower Left Facet -->
  <polygon points="36,20 43,21 50,28 42,28" fill="#5a3d0e"/>
  <!-- Lower Right Facet -->
  <polygon points="64,20 57,21 50,28 58,28" fill="#231702"/>

  <!-- Stepped Octagonal Equatorial Belt with Princess-Cut Gemstones -->
  <polygon points="36,19 64,19 62,22 38,22" fill="url(#ar4_gold)" stroke="#5a3d0e" stroke-width="0.5"/>
  <line x1="37" y1="19.5" x2="63" y2="19.5" stroke="#ffffff" stroke-width="0.6"/>
  <!-- Inset Princess-Cut Rubies & Baguette Diamonds on Belt -->
  <polygon points="41,20 43,20 43,21.5 41,21.5" fill="url(#ar4_ruby)"/>
  <polygon points="45,20 47,20 47,21.5 45,21.5" fill="#ffffff"/>
  <polygon points="49,19.5 51,19.5 51.5,22 48.5,22" fill="url(#ar4_ruby)"/>
  <polygon points="53,20 55,20 55,21.5 53,21.5" fill="#ffffff"/>
  <polygon points="57,20 59,20 59,21.5 57,21.5" fill="url(#ar4_ruby)"/>

  <!-- 6. Imperial Geometric Maltese Cross Finial -->
  <!-- Cross Base Pedestal -->
  <polygon points="47,8 53,8 54,6.5 46,6.5" fill="url(#ar4_gold)"/>
  
  <!-- 4 Flared Geometric Maltese Cross Arms with Chamfered Tips -->
  <!-- Top Arm (y=1 to y=6.5) -->
  <polygon points="46,6.5 48,6.5 46,1 48,2 50,1 50,6.5" fill="#ffffff" opacity="0.9"/>
  <polygon points="50,6.5 50,1 52,2 54,1 52,6.5 50,6.5" fill="url(#ar4_goldDark)"/>
  <!-- Left Arm (x=41 to x=47) -->
  <polygon points="47,5.5 42,3 43,5 42,7 47,6.5" fill="url(#ar4_gold)"/>
  <!-- Right Arm (x=53 to x=59) -->
  <polygon points="53,5.5 58,3 57,5 58,7 53,6.5" fill="url(#ar4_goldDark)"/>

  <!-- Masterpiece Stepped Rhombus Pigeon-Blood Ruby Solitaire Center -->
  <polygon points="50,3.5 52.5,5.5 50,7.5 47.5,5.5" fill="url(#ar4_ruby)" stroke="url(#ar4_gold)" stroke-width="0.5"/>
  <polygon points="50,4.2 51.5,5.5 50,6.8 48.5,5.5" fill="#ffffff" opacity="0.85"/>
  <!-- 3 Diamond Tips on Cross Terminals -->
  <polygon points="50,0 50.8,0.8 50,1.6 49.2,0.8" fill="#ffffff"/>
  <polygon points="41,5 41.8,4.2 42.6,5 41.8,5.8" fill="#ffffff"/>
  <polygon points="59,5 58.2,4.2 57.4,5 58.2,5.8" fill="#ffffff"/>
</svg>`;


// =========================================================
// 6. WIDGET MASTERCARD & DICTIONARY RESOLUTION
// =========================================================

// (21) wid1 — Sovereign Master Card Widget
window.SOVEREIGN_ARTIFACTS.wid_mastercard = `
<svg viewBox="0 0 100 100" fill="none" class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Deep Contact Ambient Shadow on Pedestal -->
    <radialGradient id="wm_shadow" cx="50%" cy="86%" r="44%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#000000" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Master 24K Sovereign Gold Gradient -->
    <linearGradient id="wm_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="18%" stop-color="#faecc5"/>
      <stop offset="45%" stop-color="#dcae4a"/>
      <stop offset="72%" stop-color="#9a6e1f"/>
      <stop offset="90%" stop-color="#5a3d0e"/>
      <stop offset="100%" stop-color="#231702"/>
    </linearGradient>

    <!-- Chamfered Edge Specular Gradient -->
    <linearGradient id="wm_bevel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#fdf4db" stop-opacity="0.75"/>
      <stop offset="70%" stop-color="#c59a3c" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.85"/>
    </linearGradient>

    <!-- Heavy Obsidian Ingot Body Gradient -->
    <linearGradient id="wm_obsidian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#26201b"/>
      <stop offset="30%" stop-color="#15120f"/>
      <stop offset="65%" stop-color="#0d0a08"/>
      <stop offset="100%" stop-color="#040303"/>
    </linearGradient>

    <!-- EMV Gold Smart Chip Gradient -->
    <linearGradient id="wm_chip" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff2ce"/>
      <stop offset="40%" stop-color="#d8a73f"/>
      <stop offset="75%" stop-color="#926315"/>
      <stop offset="100%" stop-color="#462c07"/>
    </linearGradient>

    <!-- Security Hologram Subtle Sheen -->
    <linearGradient id="wm_holo" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c59a3c" stop-opacity="0.25"/>
      <stop offset="30%" stop-color="#ffffff" stop-opacity="0.45"/>
      <stop offset="70%" stop-color="#dcae4a" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#9a6e1f" stop-opacity="0.2"/>
    </linearGradient>
  </defs>

  <!-- Ambient Contact Shadow beneath Card on Pedestal -->
  <polygon points="10,86 50,81 90,86 50,92" fill="url(#wm_shadow)"/>

  <!-- 1. The Obsidian Ingot Slab: Chamfered Octagonal Bullion Profile -->
  <!-- Outer Chamfered Octagon Ingot (span 76x54) -->
  <polygon points="18,21 82,21 88,27 88,69 82,75 18,75 12,69 12,27" fill="url(#wm_obsidian)" stroke="url(#wm_gold)" stroke-width="1.8"/>

  <!-- Top-Left Chamfered Specular Gold Rim Highlights -->
  <polyline points="12,30 12,27 18,21 82,21" stroke="url(#wm_bevel)" stroke-width="0.9" fill="none"/>
  
  <!-- Recessed Inner Gold Framing Channel (Chamfered Geometry) -->
  <polygon points="19.5,23.5 80.5,23.5 86,29 86,67 80.5,72.5 19.5,72.5 14,67 14,29" fill="none" stroke="#5a3d0e" stroke-width="0.7"/>

  <!-- 2. Fine-Line Laser Guilloché Engraved Security Matrix (Concentric Octagons) -->
  <g stroke="url(#wm_gold)" stroke-width="0.4" opacity="0.25" fill="none">
    <polygon points="21,25 79,25 84,30 84,66 79,71 21,71 16,66 16,30"/>
    <polygon points="23,27 77,27 82,32 82,64 77,69 23,69 18,64 18,32"/>
    <polygon points="25,29 75,29 80,34 80,62 75,67 25,67 20,62 20,34"/>
    <!-- Diagonal Security Crossbeams -->
    <line x1="16" y1="30" x2="84" y2="66"/>
    <line x1="16" y1="66" x2="84" y2="30"/>
  </g>

  <!-- 3. Sovereign Member Portrait Medallion (Center-Left: cx=31, cy=48) -->
  <!-- Stepped Octagonal 24K Gold Bezel -->
  <polygon points="26,36 36,36 44,44 44,52 36,60 26,60 18,52 18,44" fill="#14110e" stroke="url(#wm_gold)" stroke-width="1.6"/>
  <polygon points="27,38 35,38 42,45 42,51 35,58 27,58 20,51 20,45" fill="#070605" stroke="#5a3d0e" stroke-width="0.6"/>

  <!-- Silhouette Portrait of Sovereign Member (Chiseled Geometry) -->
  <!-- Suit Shoulders & Lapels -->
  <polygon points="22,58 40,58 37,52 33,52 31,54 29,52 25,52" fill="url(#wm_gold)"/>
  <polygon points="31,54 29,58 33,58" fill="#14110e"/>
  <!-- Member Head & Coiffure (Geometric Octagon) -->
  <polygon points="29,42 33,42 35,44 35,47 33,49 29,49 27,47 27,44" fill="url(#ar1_gold)"/>
  <polygon points="29,42 32,42 33,44 30,44" fill="#ffffff" opacity="0.8"/>

  <!-- Sovereign Diadem Poised Atop Medallion -->
  <polygon points="28,37 34,37 35,35 33,36 31,33.5 29,36 27,35" fill="url(#wm_gold)"/>
  <polygon points="31,33.5 31.5,34.5 30.5,34.5" fill="#ffffff"/>

  <!-- 4. Sovereign EMV Smart Microchip (Center-Right: 48,43 to 60,53) -->
  <polygon points="48,44 50,42 58,42 60,44 60,52 58,54 50,54 48,52" fill="url(#wm_chip)" stroke="#5a3d0e" stroke-width="0.6"/>
  <!-- Geometric Chip Contact Divisions -->
  <line x1="48" y1="48" x2="60" y2="48" stroke="#3a2307" stroke-width="0.5"/>
  <line x1="53" y1="42" x2="53" y2="54" stroke="#3a2307" stroke-width="0.5"/>
  <line x1="56" y1="42" x2="56" y2="54" stroke="#3a2307" stroke-width="0.5"/>
  <polygon points="53.5,46.5 55.5,46.5 56,48 55.5,49.5 53.5,49.5 53,48" fill="url(#wm_gold)"/>

  <!-- 5. Wordmark & Identity Ingot Bars -->
  <!-- "THE 1% CLUB" Embossed Gold Wordmark Banner -->
  <polygon points="48,27 78,27 80,30 46,30" fill="url(#wm_gold)"/>
  <line x1="48" y1="28" x2="78" y2="28" stroke="#ffffff" stroke-width="0.7" opacity="0.7"/>
  <!-- Sub-Tier Classification Bar -->
  <polygon points="48,32 64,32 65,34 47,34" fill="#9a8668" opacity="0.85"/>

  <!-- Member Code & Tier Indicator Diamond Pips -->
  <polygon points="48,56 70,56 71,58 47,58" fill="url(#wm_gold)" opacity="0.9"/>
  <polygon points="73,57 74.5,55.5 76,57 74.5,58.5" fill="url(#wm_gold)"/>
  <polygon points="77.5,57 79,55.5 80.5,57 79,58.5" fill="#ffffff"/>

  <!-- Sovereign Royal Crest / Hallmark at Top Right -->
  <g transform="translate(81, 28) scale(0.85)">
    <polygon points="0,-1 2,3 5,0 4,6 -4,6 -5,0 -2,3" fill="url(#wm_gold)"/>
    <polygon points="0,-1 0.7,0 0,1 -0.7,0" fill="#ffffff"/>
  </g>

  <!-- 6. Bottom Security Hologram Strip with Stepped Geometry -->
  <polygon points="15,67 85,67 84,71 16,71" fill="url(#wm_holo)"/>
  <line x1="17" y1="69" x2="83" y2="69" stroke="url(#wm_gold)" stroke-width="0.5" stroke-dasharray="2 1.5"/>
  <polygon points="50,67.5 51.5,69 50,70.5 48.5,69" fill="url(#wm_gold)"/>
  <polygon points="44,69 45,68 46,69 45,70" fill="#ffffff" opacity="0.9"/>
  <polygon points="56,69 57,68 58,69 57,70" fill="#ffffff" opacity="0.9"/>
</svg>`;

// Complete Aliases by Item ID to ensure 100% resolution across all access patterns
window.SOVEREIGN_ARTIFACTS.crown1 = window.SOVEREIGN_ARTIFACTS.crown_imperial;
window.SOVEREIGN_ARTIFACTS.crown2 = window.SOVEREIGN_ARTIFACTS.crown_sol;
window.SOVEREIGN_ARTIFACTS.crown3 = window.SOVEREIGN_ARTIFACTS.crown_moritz;
window.SOVEREIGN_ARTIFACTS.crown4 = window.SOVEREIGN_ARTIFACTS.crown_zenith;

window.SOVEREIGN_ARTIFACTS.ring1 = window.SOVEREIGN_ARTIFACTS.ring_monogram;
window.SOVEREIGN_ARTIFACTS.ring2 = window.SOVEREIGN_ARTIFACTS.ring_onyx;
window.SOVEREIGN_ARTIFACTS.ring3 = window.SOVEREIGN_ARTIFACTS.ring_falcon;
window.SOVEREIGN_ARTIFACTS.ring4 = window.SOVEREIGN_ARTIFACTS.ring_chrono;

window.SOVEREIGN_ARTIFACTS.aura1 = window.SOVEREIGN_ARTIFACTS.aura_radial;
window.SOVEREIGN_ARTIFACTS.aura2 = window.SOVEREIGN_ARTIFACTS.aura_guilloche;
window.SOVEREIGN_ARTIFACTS.aura3 = window.SOVEREIGN_ARTIFACTS.aura_eclipse;
window.SOVEREIGN_ARTIFACTS.aura4 = window.SOVEREIGN_ARTIFACTS.aura_celestial;

window.SOVEREIGN_ARTIFACTS.star1 = window.SOVEREIGN_ARTIFACTS.star_sovereign;
window.SOVEREIGN_ARTIFACTS.star2 = window.SOVEREIGN_ARTIFACTS.star_grand_cross;
window.SOVEREIGN_ARTIFACTS.star3 = window.SOVEREIGN_ARTIFACTS.star_constellation;
window.SOVEREIGN_ARTIFACTS.star4 = window.SOVEREIGN_ARTIFACTS.star_zenith;

window.SOVEREIGN_ARTIFACTS.art1 = window.SOVEREIGN_ARTIFACTS.art_tourbillon;
window.SOVEREIGN_ARTIFACTS.art2 = window.SOVEREIGN_ARTIFACTS.art_seal;
window.SOVEREIGN_ARTIFACTS.art3 = window.SOVEREIGN_ARTIFACTS.art_falcon_medallion;
window.SOVEREIGN_ARTIFACTS.art4 = window.SOVEREIGN_ARTIFACTS.art_scepter;

window.SOVEREIGN_ARTIFACTS.wid1 = window.SOVEREIGN_ARTIFACTS.wid_mastercard;

// Generic fallback aliases
window.SOVEREIGN_ARTIFACTS.crown = window.SOVEREIGN_ARTIFACTS.crown_zenith;
window.SOVEREIGN_ARTIFACTS.ring = window.SOVEREIGN_ARTIFACTS.ring_falcon;
window.SOVEREIGN_ARTIFACTS.aura = window.SOVEREIGN_ARTIFACTS.aura_radial;
window.SOVEREIGN_ARTIFACTS.star = window.SOVEREIGN_ARTIFACTS.star_sovereign;
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

    <!-- 4. The 3D Sovereign Artifact Suspended Inside (Centered in 96px dome) -->
    <g class="cloche-artifact-wrap" transform="translate(32, 20)">
      ${artifactSvg ? artifactSvg.replace(/<svg\b([^>]*)>/, '<svg width="96" height="96" $1>') : ""}
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


/* =========================================================
   THE 1% CLUB — HANDCRAFTED COLLECTIBLE ARTWORK V2
   Append after the existing artifact definitions.
   Preserves crown_zenith and the native membership card.
   ========================================================= */
(function installTPCArtworkV2() {
  const A = window.SOVEREIGN_ARTIFACTS =
    window.SOVEREIGN_ARTIFACTS || {};

  function makeTPCArtwork(key, body) {
    const p = "tpc_" + key;
    const refs = {
      "__G__":  `url(#${p}_gold)`,
      "__GL__": `url(#${p}_goldLight)`,
      "__GD__": `url(#${p}_goldDark)`,
      "__O__":  `url(#${p}_obsidian)`,
      "__S__":  `url(#${p}_silver)`,
      "__E__":  `url(#${p}_emerald)`,
      "__B__":  `url(#${p}_sapphire)`,
      "__R__":  `url(#${p}_ruby)`,
      "__P__":  `url(#${p}_pearl)`,
      "__SH__": `url(#${p}_shadow)`
    };

    let art = body;
    for (const [token, value] of Object.entries(refs)) {
      art = art.replaceAll(token, value);
    }

    return `
<svg viewBox="0 0 100 100" fill="none"
     class="artifact-svg" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${p}_gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff9df"/>
      <stop offset=".12" stop-color="#fff0ac"/>
      <stop offset=".28" stop-color="#c18a2c"/>
      <stop offset=".43" stop-color="#fff5c9"/>
      <stop offset=".62" stop-color="#906018"/>
      <stop offset=".79" stop-color="#f6d16b"/>
      <stop offset="1" stop-color="#392006"/>
    </linearGradient>
    <linearGradient id="${p}_goldLight" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#765016"/>
      <stop offset=".22" stop-color="#fffbe0"/>
      <stop offset=".45" stop-color="#d2a344"/>
      <stop offset=".64" stop-color="#fff5be"/>
      <stop offset=".84" stop-color="#b77e23"/>
      <stop offset="1" stop-color="#fff0aa"/>
    </linearGradient>
    <linearGradient id="${p}_goldDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe8a0"/>
      <stop offset=".28" stop-color="#8d5d15"/>
      <stop offset=".58" stop-color="#271906"/>
      <stop offset=".78" stop-color="#bb852a"/>
      <stop offset="1" stop-color="#fff0bb"/>
    </linearGradient>
    <linearGradient id="${p}_obsidian" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#777062"/>
      <stop offset=".18" stop-color="#25231e"/>
      <stop offset=".48" stop-color="#040505"/>
      <stop offset=".74" stop-color="#191814"/>
      <stop offset="1" stop-color="#020303"/>
    </linearGradient>
    <linearGradient id="${p}_silver" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset=".2" stop-color="#e4edf1"/>
      <stop offset=".42" stop-color="#778995"/>
      <stop offset=".58" stop-color="#ffffff"/>
      <stop offset=".78" stop-color="#aab4bc"/>
      <stop offset="1" stop-color="#303943"/>
    </linearGradient>
    <linearGradient id="${p}_emerald" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d7ffe8"/>
      <stop offset=".2" stop-color="#35d39a"/>
      <stop offset=".5" stop-color="#08754d"/>
      <stop offset=".75" stop-color="#03442d"/>
      <stop offset="1" stop-color="#62e3ac"/>
    </linearGradient>
    <linearGradient id="${p}_sapphire" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e5f8ff"/>
      <stop offset=".18" stop-color="#6ad5ff"/>
      <stop offset=".44" stop-color="#1269d1"/>
      <stop offset=".72" stop-color="#05285e"/>
      <stop offset="1" stop-color="#5ca6f0"/>
    </linearGradient>
    <linearGradient id="${p}_ruby" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff0dc"/>
      <stop offset=".2" stop-color="#e95861"/>
      <stop offset=".52" stop-color="#8e1027"/>
      <stop offset=".78" stop-color="#430714"/>
      <stop offset="1" stop-color="#fa9c76"/>
    </linearGradient>
    <radialGradient id="${p}_pearl" cx=".28" cy=".18" r=".86">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset=".34" stop-color="#fff2d0"/>
      <stop offset=".69" stop-color="#b4a17b"/>
      <stop offset="1" stop-color="#655038"/>
    </radialGradient>
    <radialGradient id="${p}_shadow">
      <stop offset="0" stop-color="#000" stop-opacity=".64"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  ${art}
</svg>`;
  }

  const TPC_ARTWORK_V2 = {

    /* ==================== CROWNS ==================== */

    crown_imperial: `
      <ellipse cx="50" cy="82" rx="34" ry="5" fill="__SH__"/>
      <path d="M22 68Q22 47 34 36Q43 27 50 24Q57 27 66 36Q78 47 78 68Z"
        fill="__O__" stroke="__G__" stroke-width="2"/>
      <path d="M26 66Q30 43 50 29Q70 43 74 66"
        stroke="__GL__" stroke-width="4" fill="none"/>
      <path d="M29 65Q36 40 50 29Q64 40 71 65"
        stroke="__G__" stroke-width="1.1" fill="none"/>
      <path d="M38 66Q39 42 50 29Q61 42 62 66"
        stroke="__GD__" stroke-width="2.1" fill="none"/>
      <path d="M17 64L22 55L29 64L35 56L42 65L50 60L58 65L65 56L71 64L78 55L83 64L80 73Q50 82 20 73Z"
        fill="__G__" stroke="#fff2bf" stroke-width=".8"/>
      <path d="M21 68Q50 76 79 68M24 72Q50 79 76 72"
        stroke="#57380e" stroke-width="1.2"/>
      <path d="M34 61L38 55L42 61M58 61L62 55L66 61"
        stroke="__GL__" stroke-width="1.1"/>
      <g fill="__O__" stroke="__GL__" stroke-width="1">
        <circle cx="29" cy="68" r="2.2"/><circle cx="40" cy="71" r="1.8"/>
        <circle cx="50" cy="72" r="2.8"/><circle cx="60" cy="71" r="1.8"/>
        <circle cx="71" cy="68" r="2.2"/>
      </g>
      <path d="M47 23L50 16L53 23Z" fill="__G__"/>
      <circle cx="50" cy="14" r="3" fill="__P__" stroke="__G__" stroke-width="1"/>
      <path d="M47 9H53M50 6V12" stroke="__GL__" stroke-width="2"/>
      <g fill="__P__" stroke="__G__" stroke-width=".7">
        <circle cx="23" cy="54" r="2"/><circle cx="77" cy="54" r="2"/>
        <circle cx="36" cy="39" r="1.6"/><circle cx="64" cy="39" r="1.6"/>
      </g>
      <path d="M27 46L31 43L34 47M66 47L69 43L73 46"
        stroke="#fff0b6" stroke-width=".8"/>`,

    crown_sol: `
      <ellipse cx="50" cy="82" rx="35" ry="5" fill="__SH__"/>
      <path d="M13 67L18 40L26 67L28 29L38 67L43 18L50 67L57 18L62 67L72 29L74 67L82 40L87 67Z"
        fill="__G__" stroke="#fff1bd" stroke-width=".65"/>
      <path d="M18 42L26 64L27 32L36 64L43 21L48 64"
        fill="none" stroke="#fff8d7" stroke-width="1.1"/>
      <path d="M50 67L57 21L62 64L73 32L74 64L82 42"
        fill="none" stroke="#765016" stroke-width="1"/>
      <path d="M18 66Q50 75 82 66L79 76Q50 83 21 76Z"
        fill="__GD__" stroke="__GL__" stroke-width="1"/>
      <path d="M22 69Q50 77 78 69" stroke="#fff4c6" stroke-width="1.1"/>
      <path d="M29 70L29 75M36 72L36 77M43 73L43 78M50 73L50 79M57 73L57 78M64 72L64 77M71 70L71 75"
        stroke="#56380f" stroke-width=".8"/>
      <g fill="__P__" stroke="__G__" stroke-width=".55">
        <circle cx="25" cy="67" r="1.7"/><circle cx="34" cy="69" r="1.7"/>
        <circle cx="42" cy="71" r="1.7"/><circle cx="50" cy="72" r="2.2"/>
        <circle cx="58" cy="71" r="1.7"/><circle cx="66" cy="69" r="1.7"/>
        <circle cx="75" cy="67" r="1.7"/>
      </g>
      <path d="M50 12L52 17L57 18L53 22L54 27L50 24L46 27L47 22L43 18L48 17Z"
        fill="__GL__" stroke="__G__" stroke-width=".6"/>
      <circle cx="50" cy="20" r="2" fill="__R__"/>`,

    crown_moritz: `
      <ellipse cx="50" cy="82" rx="35" ry="5" fill="__SH__"/>
      <path d="M18 67L24 45L32 60L40 29L47 59L53 20L59 59L68 29L72 60L80 45L82 67Z"
        fill="__S__" stroke="#fff" stroke-width="1"/>
      <path d="M24 47L30 61L40 31L44 59L53 22L54 61L68 31L64 60L80 47"
        fill="none" stroke="#62717b" stroke-width=".85"/>
      <path d="M18 66Q50 72 82 66L79 75Q50 82 21 75Z"
        fill="__GD__" stroke="__GL__" stroke-width="1"/>
      <path d="M21 69Q50 76 79 69" stroke="#fff" stroke-width="1.2"/>
      <path d="M28 67L34 62L39 67L45 60L50 67L55 60L61 67L66 62L72 67"
        stroke="__S__" stroke-width="1.5" fill="none"/>
      <g fill="__B__" stroke="#e8f9ff" stroke-width=".5">
        <path d="M31 54L34 49L37 54L34 59Z"/>
        <path d="M47 50L50 44L53 50L50 56Z"/>
        <path d="M64 54L67 49L70 54L67 59Z"/>
      </g>
      <g fill="#fff" stroke="#9caeb9" stroke-width=".5">
        <path d="M39 28L42 23L45 28L42 33Z"/>
        <path d="M50 19L53 14L56 19L53 24Z"/>
        <path d="M65 28L68 23L71 28L68 33Z"/>
      </g>
      <path d="M29 72L32 70L35 72M65 72L68 70L71 72"
        stroke="#303c44" stroke-width="1"/>`,

    /* ==================== RINGS ==================== */

    ring_monogram: `
      <ellipse cx="50" cy="84" rx="29" ry="5" fill="__SH__"/>
      <path d="M24 48Q20 69 34 79Q50 89 66 79Q80 69 76 48L67 43Q71 67 60 73Q50 79 40 73Q29 67 33 43Z"
        fill="__GD__" stroke="__GL__" stroke-width="1"/>
      <path d="M29 49Q26 68 39 76Q50 81 61 76Q74 68 71 49"
        stroke="#fff3bc" stroke-width="1.2" fill="none"/>
      <path d="M26 48L34 38L43 43L50 38L57 43L66 38L74 48L68 63L50 70L32 63Z"
        fill="__G__" stroke="#57380e" stroke-width="1.6"/>
      <path d="M30 48L36 42L44 46L50 42L56 46L64 42L70 48L65 60L50 66L35 60Z"
        fill="__O__" stroke="#fff2b8" stroke-width="1"/>
      <path d="M41 47L46 42H54L59 47L56 60H44Z"
        fill="__G__" stroke="#fff6ce" stroke-width=".8"/>
      <text x="50" y="55" text-anchor="middle" font-size="8.5"
        font-family="Georgia,serif" font-weight="bold" fill="#fff4c4">1%</text>
      <path d="M34 49L38 46M62 46L66 49M39 63L43 65M57 65L61 63"
        stroke="#fff2bf" stroke-width=".7"/>
      <g fill="__E__" stroke="__GL__" stroke-width=".7">
        <path d="M32 57L35 53L38 57L35 61Z"/>
        <path d="M62 57L65 53L68 57L65 61Z"/>
      </g>`,

    ring_onyx: `
      <ellipse cx="50" cy="85" rx="28" ry="5" fill="__SH__"/>
      <path d="M25 51Q20 68 34 79Q50 89 66 79Q80 68 75 51L67 46Q70 68 60 74Q50 79 40 74Q30 68 33 46Z"
        fill="__GD__" stroke="__GL__" stroke-width=".9"/>
      <path d="M28 51L36 39L42 42L50 39L58 42L64 39L72 51L68 64L59 71H41L32 64Z"
        fill="__G__" stroke="#53390e" stroke-width="1.5"/>
      <path d="M33 50L39 43H61L67 50L63 62L56 67H44L37 62Z"
        fill="__O__" stroke="#fff0b4" stroke-width="1.1"/>
      <path d="M37 49L42 45H58L63 49L60 60L55 64H45L40 60Z"
        fill="__O__" stroke="#9a814f" stroke-width=".7"/>
      <path d="M39 48L45 46H55L61 48L54 50H43Z" fill="#fff" opacity=".65"/>
      <path d="M41 49L44 48L41 57" stroke="#fff" stroke-width="1" opacity=".8"/>
      <g fill="__P__" stroke="__GL__" stroke-width=".8">
        <circle cx="35" cy="47" r="2"/><circle cx="65" cy="47" r="2"/>
        <circle cx="35" cy="62" r="2"/><circle cx="65" cy="62" r="2"/>
      </g>
      <path d="M37 70Q50 76 63 70" stroke="#3d260a" stroke-width="1"/>`,

    ring_falcon: `
      <ellipse cx="50" cy="85" rx="29" ry="5" fill="__SH__"/>
      <path d="M24 49Q20 68 35 80Q50 89 65 80Q80 68 76 49L68 45Q70 68 60 74Q50 79 40 74Q30 68 32 45Z"
        fill="__GD__" stroke="__GL__" stroke-width="1"/>
      <path d="M25 52Q33 39 44 49L49 57L43 61L30 60Z"
        fill="__G__" stroke="#53350b" stroke-width="1"/>
      <path d="M75 52Q67 39 56 49L51 57L57 61L70 60Z"
        fill="__G__" stroke="#53350b" stroke-width="1"/>
      <path d="M28 52L36 47L43 52L38 54L33 58M72 52L64 47L57 52L62 54L67 58"
        stroke="#fff2bd" stroke-width=".8" fill="none"/>
      <path d="M41 47L46 41H54L59 47L62 59L56 67H44L38 59Z"
        fill="__G__" stroke="#fff0b0" stroke-width="1.3"/>
      <path d="M43 48L48 45H52L57 48L59 58L54 63H46L41 58Z"
        fill="__E__" stroke="#042f22" stroke-width="1"/>
      <path d="M44 48L49 46H51L55 48L50 51Z" fill="#d4ffe9" opacity=".8"/>
      <g stroke="__GL__" stroke-width=".8">
        <path d="M31 55L37 57L40 55M33 59L38 60M69 55L63 57L60 55M67 59L62 60"/>
      </g>
      <path d="M42 66L46 70L50 67L54 70L58 66" stroke="#4b310e" stroke-width="1.2"/>`,

    ring_chrono: `
      <ellipse cx="50" cy="85" rx="29" ry="5" fill="__SH__"/>
      <path d="M24 49Q20 69 35 80Q50 88 65 80Q80 69 76 49L68 45Q70 67 60 73Q50 78 40 73Q30 67 32 45Z"
        fill="__G__" stroke="#fff1b5" stroke-width="1"/>
      <path d="M29 51Q28 66 40 74M71 51Q72 66 60 74" stroke="#57380e" stroke-width="1.4"/>
      <path d="M30 46L36 39H64L70 46L66 62H34Z"
        fill="__GD__" stroke="__GL__" stroke-width="1.4"/>
      <path d="M35 46L40 42H60L65 46L62 59H38Z"
        fill="__O__" stroke="#f3d78d" stroke-width=".8"/>
      <circle cx="50" cy="51" r="9" fill="__O__" stroke="__G__" stroke-width="1.1"/>
      <circle cx="50" cy="51" r="6.5" stroke="#d4b36b" stroke-width=".65"/>
      <path d="M50 51L53 46L56 48L54 52L50 51L47 56L44 54L46 50Z"
        fill="__S__" stroke="#6b5330" stroke-width=".55"/>
      <circle cx="50" cy="51" r="1.8" fill="__R__" stroke="#fff" stroke-width=".4"/>
      <g fill="__P__" stroke="__G__" stroke-width=".65">
        <circle cx="36" cy="44" r="1.7"/><circle cx="64" cy="44" r="1.7"/>
        <circle cx="37" cy="59" r="1.7"/><circle cx="63" cy="59" r="1.7"/>
      </g>
      <path d="M40 63L44 67M60 63L56 67" stroke="#fff1b5" stroke-width=".8"/>`,

    /* ==================== AURAS ==================== */

    aura_radial: `
      <circle cx="50" cy="50" r="34" fill="__SH__"/>
      <g stroke="__G__" stroke-width="1.4" fill="none">
        <circle cx="50" cy="50" r="30"/>
        <circle cx="50" cy="50" r="25" stroke-dasharray="1.4 1.4"/>
        <circle cx="50" cy="50" r="20" stroke-width=".8"/>
      </g>
      <g fill="__G__" stroke="__GL__" stroke-width=".55">
        <path d="M50 7L53 22L50 27L47 22Z"/>
        <path d="M50 93L53 78L50 73L47 78Z"/>
        <path d="M7 50L22 47L27 50L22 53Z"/>
        <path d="M93 50L78 47L73 50L78 53Z"/>
        <path d="M20 20L33 30L34 34L30 33Z"/>
        <path d="M80 20L70 33L66 34L67 30Z"/>
        <path d="M20 80L33 70L34 66L30 67Z"/>
        <path d="M80 80L70 67L66 66L67 70Z"/>
      </g>
      <circle cx="50" cy="50" r="17" fill="__O__" stroke="__G__" stroke-width="2"/>
      <circle cx="50" cy="50" r="13.5" stroke="__GL__" stroke-width=".8"/>
      <path d="M50 34L53 46L66 50L53 54L50 66L47 54L34 50L47 46Z"
        fill="__G__" stroke="#fff2c3" stroke-width=".7"/>
      <circle cx="50" cy="50" r="4" fill="__P__" stroke="__G__" stroke-width=".8"/>`,

    aura_guilloche: `
      <circle cx="50" cy="50" r="34" fill="__SH__"/>
      <g stroke="__G__" fill="none">
        <circle cx="50" cy="50" r="32" stroke-width="1.5"/>
        <circle cx="50" cy="50" r="29" stroke-width=".65"/>
        <circle cx="50" cy="50" r="23" stroke-width=".85" stroke-dasharray="1 1.5"/>
        <circle cx="50" cy="50" r="18" stroke-width="1"/>
      </g>
      <g fill="__GD__" stroke="__GL__" stroke-width=".65">
        <path d="M50 17C59 25 59 31 50 37C41 31 41 25 50 17Z"/>
        <path d="M83 50C75 59 69 59 63 50C69 41 75 41 83 50Z"/>
        <path d="M50 83C41 75 41 69 50 63C59 69 59 75 50 83Z"/>
        <path d="M17 50C25 41 31 41 37 50C31 59 25 59 17 50Z"/>
        <path d="M27 27Q43 30 39 39Q30 43 27 27Z"/>
        <path d="M73 27Q70 43 61 39Q57 30 73 27Z"/>
        <path d="M73 73Q57 70 61 61Q70 57 73 73Z"/>
        <path d="M27 73Q30 57 39 61Q43 70 27 73Z"/>
      </g>
      <circle cx="50" cy="50" r="14" fill="__G__" stroke="#fff2ba" stroke-width="1"/>
      <circle cx="50" cy="50" r="10" fill="__O__" stroke="#8e6728" stroke-width=".8"/>
      <circle cx="50" cy="50" r="6" fill="none" stroke="__GL__" stroke-width=".7"/>
      <path d="M50 43L52 48L57 50L52 52L50 57L48 52L43 50L48 48Z"
        fill="__P__"/>`,

    aura_eclipse: `
      <circle cx="50" cy="50" r="34" fill="__SH__"/>
      <circle cx="50" cy="50" r="30" stroke="__G__" stroke-width="1" fill="none"/>
      <g fill="__GD__" stroke="__GL__" stroke-width=".55">
        <path d="M50 8L53 21L50 26L47 21Z"/>
        <path d="M50 92L53 79L50 74L47 79Z"/>
        <path d="M8 50L21 47L26 50L21 53Z"/>
        <path d="M92 50L79 47L74 50L79 53Z"/>
        <path d="M20 20L31 29L34 34L29 31Z"/>
        <path d="M80 20L71 31L66 34L69 29Z"/>
        <path d="M20 80L29 69L34 66L31 71Z"/>
        <path d="M80 80L69 71L66 66L71 69Z"/>
      </g>
      <circle cx="50" cy="50" r="21" fill="__GD__" stroke="__G__" stroke-width="2"/>
      <circle cx="46" cy="46" r="17" fill="__O__" stroke="#3d2a0c" stroke-width="1"/>
      <path d="M59 31A22 22 0 1 1 40 69A18 18 0 0 0 59 31Z"
        fill="__G__" stroke="#fff0b4" stroke-width=".8"/>
      <path d="M61 34A19 19 0 0 1 65 57" stroke="#fff" stroke-width="1.2" opacity=".75"/>
      <path d="M69 25L71 31L77 33L71 35L69 41L67 35L61 33L67 31Z"
        fill="__P__" stroke="__G__" stroke-width=".6"/>`,

    aura_celestial: `
      <circle cx="50" cy="50" r="33" fill="__SH__"/>
      <g fill="none" stroke="__G__" stroke-width="1.5">
        <ellipse cx="50" cy="50" rx="30" ry="12" transform="rotate(-35 50 50)"/>
        <ellipse cx="50" cy="50" rx="30" ry="12" transform="rotate(35 50 50)"/>
        <ellipse cx="50" cy="50" rx="12" ry="30"/>
      </g>
      <g stroke="__GL__" stroke-width=".65" fill="none">
        <ellipse cx="50" cy="50" rx="26" ry="9" transform="rotate(-35 50 50)"/>
        <ellipse cx="50" cy="50" rx="26" ry="9" transform="rotate(35 50 50)"/>
      </g>
      <circle cx="50" cy="50" r="14" fill="__G__" stroke="#fff0b7" stroke-width="1"/>
      <circle cx="50" cy="50" r="10" fill="__O__" stroke="#9a6e22" stroke-width=".75"/>
      <path d="M50 35L53 46L65 50L53 54L50 65L47 54L35 50L47 46Z"
        fill="__GL__" stroke="__G__" stroke-width=".7"/>
      <circle cx="50" cy="50" r="4.5" fill="__P__"/>
      <g fill="__B__" stroke="#fff" stroke-width=".4">
        <path d="M24 34L26 29L28 34L26 39Z"/>
        <path d="M72 31L74 26L76 31L74 36Z"/>
        <path d="M29 72L31 67L33 72L31 77Z"/>
        <path d="M68 70L70 65L72 70L70 75Z"/>
      </g>`,

    /* ==================== STARS & ORDERS ==================== */

    star_sovereign: `
      <ellipse cx="50" cy="84" rx="29" ry="4" fill="__SH__"/>
      <path d="M50 9L57 33L81 25L66 44L90 50L66 56L81 75L57 67L50 91L43 67L19 75L34 56L10 50L34 44L19 25L43 33Z"
        fill="__GD__" stroke="__GL__" stroke-width="1.3"/>
      <path d="M50 14L55 36L74 29L62 45L83 50L62 55L74 70L55 64L50 86L45 64L26 70L38 55L17 50L38 45L26 29L45 36Z"
        fill="__G__" stroke="#fff0b4" stroke-width=".65"/>
      <path d="M50 18L50 40L58 35L62 44L78 50L61 54L66 67L54 62L50 82L46 62L34 67L39 54L22 50L38 44L42 35L50 40Z"
        fill="#60400f" opacity=".42"/>
      <circle cx="50" cy="50" r="17" fill="__G__" stroke="#fff0b9" stroke-width="1"/>
      <circle cx="50" cy="50" r="13.3" fill="__O__" stroke="#8d692a" stroke-width=".8"/>
      <text x="50" y="54" text-anchor="middle" fill="#fff0ba"
        font-size="8.5" font-weight="bold" font-family="Georgia,serif">1%</text>
      <circle cx="50" cy="50" r="16" stroke="__GL__" stroke-width=".55" fill="none"/>`,

    star_grand_cross: `
      <ellipse cx="50" cy="84" rx="29" ry="4" fill="__SH__"/>
      <path d="M42 10H58L62 28L76 19L84 32L69 43L90 50L69 57L84 68L76 81L62 72L58 90H42L38 72L24 81L16 68L31 57L10 50L31 43L16 32L24 19L38 28Z"
        fill="__G__" stroke="#fff3c0" stroke-width="1"/>
      <path d="M45 16H55L58 32L72 25L78 34L62 46L80 50L62 54L78 66L72 75L58 68L55 84H45L42 68L28 75L22 66L38 54L20 50L38 46L22 34L28 25L42 32Z"
        fill="__R__" stroke="#6e1218" stroke-width=".8"/>
      <path d="M50 22L56 40L74 34L61 47L79 50L61 53L74 66L56 60L50 78L44 60L26 66L39 53L21 50L39 47L26 34L44 40Z"
        fill="__GD__" stroke="__GL__" stroke-width=".9"/>
      <circle cx="50" cy="50" r="15" fill="__G__" stroke="#fff3c6" stroke-width="1"/>
      <circle cx="50" cy="50" r="11.5" fill="__O__" stroke="#8a5a18" stroke-width=".8"/>
      <path d="M41 49L44 44L48 47L50 40L52 47L56 44L59 49L56 53L44 53Z"
        fill="__GL__" stroke="#fff1b6" stroke-width=".55"/>
      <path d="M44 55H56" stroke="#fff0bb" stroke-width=".7"/>`,

    star_constellation: `
      <ellipse cx="50" cy="84" rx="28" ry="4" fill="__SH__"/>
      <path d="M50 8L55 35L76 18L64 41L91 50L64 57L76 82L55 65L50 92L45 65L24 82L36 57L9 50L36 41L24 18L45 35Z"
        fill="__G__" stroke="#fff1bb" stroke-width="1.1"/>
      <path d="M50 15L53 38L70 25L60 43L82 50L60 56L70 75L53 62L50 85L47 62L30 75L40 56L18 50L40 43L30 25L47 38Z"
        fill="__GD__" stroke="#fff5cb" stroke-width=".75"/>
      <path d="M35 50L41 38L55 35L64 45L62 59L51 66L38 61Z"
        fill="__G__" stroke="#5c3a0c" stroke-width="1.2"/>
      <path d="M39 48L44 41L54 39L60 46L59 57L50 62L41 58Z"
        fill="__B__" stroke="#e4f6ff" stroke-width=".7"/>
      <path d="M42 45L47 42L52 42L47 49Z" fill="#fff" opacity=".75"/>
      <g fill="__P__" stroke="__G__" stroke-width=".5">
        <circle cx="50" cy="30" r="2"/><circle cx="68" cy="39" r="2"/>
        <circle cx="69" cy="59" r="2"/><circle cx="50" cy="70" r="2"/>
        <circle cx="31" cy="59" r="2"/><circle cx="31" cy="39" r="2"/>
      </g>`,

    star_zenith: `
      <ellipse cx="50" cy="84" rx="28" ry="4" fill="__SH__"/>
      <path d="M50 7L57 34L77 21L65 42L91 50L65 58L77 79L57 66L50 93L43 66L23 79L35 58L9 50L35 42L23 21L43 34Z"
        fill="__S__" stroke="#fff" stroke-width="1.3"/>
      <path d="M50 14L54 36L70 27L61 44L82 50L61 56L70 73L54 64L50 86L46 64L30 73L39 56L18 50L39 44L30 27L46 36Z"
        fill="__GD__" stroke="#f5e5ad" stroke-width=".8"/>
      <path d="M50 18L57 42L77 50L57 58L50 82L43 58L23 50L43 42Z"
        fill="__S__" stroke="#fff" stroke-width=".8"/>
      <path d="M50 29L54 43L67 50L54 57L50 71L46 57L33 50L46 43Z"
        fill="__GL__" stroke="#fff" stroke-width=".75"/>
      <path d="M50 39L58 46L58 54L50 61L42 54L42 46Z"
        fill="__S__" stroke="#fff" stroke-width="1.1"/>
      <path d="M50 41L55 46L55 52L50 57L45 52L45 46Z"
        fill="#eef7ff" stroke="#7895a3" stroke-width=".65"/>
      <path d="M47 45L50 43L52 45L50 48Z" fill="#fff"/>`,

    /* ==================== RARE ARTIFACTS ==================== */

    art_tourbillon: `
      <ellipse cx="50" cy="85" rx="25" ry="4" fill="__SH__"/>
      <path d="M50 21C45 21 43 25 43 29H57C57 25 55 21 50 21Z"
        fill="__G__" stroke="#fff0be" stroke-width=".8"/>
      <path d="M43 29H57L60 35V66Q50 76 40 66V35Z"
        fill="__GD__" stroke="__GL__" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="22" fill="__G__" stroke="#fff0ba" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="18" fill="__O__" stroke="#9e7128" stroke-width=".8"/>
      <circle cx="50" cy="50" r="14" fill="none" stroke="__GL__" stroke-width=".8"/>
      <g fill="none" stroke="__G__" stroke-width="1.4">
        <circle cx="50" cy="50" r="9"/>
        <circle cx="50" cy="50" r="4"/>
        <path d="M50 41L55 46L50 50L45 46Z"/>
        <path d="M50 59L55 54L50 50L45 54Z"/>
        <path d="M41 50L46 45L50 50L46 55Z"/>
        <path d="M59 50L54 45L50 50L54 55Z"/>
      </g>
      <path d="M50 38V45M50 55V62M38 50H45M55 50H62"
        stroke="__S__" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="2.6" fill="__R__" stroke="#fff" stroke-width=".6"/>
      <path d="M45 34L50 31L55 34M45 66L50 69L55 66"
        stroke="__GL__" stroke-width=".9"/>`,

    art_seal: `
      <ellipse cx="50" cy="84" rx="26" ry="4" fill="__SH__"/>
      <path d="M43 21L57 21L59 28L56 32H44L41 28Z"
        fill="__G__" stroke="#fff2bd" stroke-width=".8"/>
      <path d="M40 29L60 29L65 38L61 48H39L35 38Z"
        fill="__O__" stroke="__GL__" stroke-width="1.4"/>
      <path d="M42 32L58 32L61 38L58 45H42L39 38Z"
        fill="__O__" stroke="#73511c" stroke-width=".8"/>
      <path d="M50 31L53 36L59 36L54 40L56 45L50 42L44 45L46 40L41 36L47 36Z"
        fill="__G__" stroke="#fff0b8" stroke-width=".6"/>
      <path d="M40 48H60L63 53H37Z" fill="__GD__" stroke="__GL__" stroke-width=".8"/>
      <path d="M36 53H64L70 65L66 72H34L30 65Z"
        fill="__G__" stroke="#fff1b7" stroke-width="1"/>
      <path d="M39 56H61L65 64L62 68H38L35 64Z"
        fill="__O__" stroke="#9d752e" stroke-width=".8"/>
      <path d="M43 59L47 62L50 57L53 62L57 59L55 66H45Z"
        fill="__GL__" stroke="#3d2709" stroke-width=".5"/>
      <path d="M39 70H61" stroke="#fff3bd" stroke-width=".9"/>`,

    art_falcon_medallion: `
      <ellipse cx="50" cy="85" rx="26" ry="4" fill="__SH__"/>
      <path d="M44 11L50 16L56 11L56 23L50 27L44 23Z"
        fill="__R__" stroke="__G__" stroke-width="1"/>
      <path d="M47 22L53 22L56 31L44 31Z"
        fill="__G__" stroke="#fff2bf" stroke-width=".8"/>
      <circle cx="50" cy="54" r="28" fill="__GD__" stroke="__GL__" stroke-width="1.4"/>
      <circle cx="50" cy="54" r="24" fill="__G__" stroke="#fff0b7" stroke-width=".8"/>
      <circle cx="50" cy="54" r="20" fill="__O__" stroke="#806020" stroke-width=".7"/>
      <g fill="none" stroke="__GL__" stroke-width="1">
        <path d="M34 69Q26 54 37 39M66 69Q74 54 63 39"/>
        <path d="M36 70Q50 78 64 70"/>
      </g>
      <path d="M27 46Q37 34 49 45L54 52L47 57L34 54Z"
        fill="__G__" stroke="#fff0b5" stroke-width=".6"/>
      <path d="M73 46Q63 34 51 45L46 52L53 57L66 54Z"
        fill="__GD__" stroke="#fff0b5" stroke-width=".6"/>
      <path d="M38 47L47 43L51 49L61 45L58 55L51 61L43 56Z"
        fill="__G__" stroke="#55370c" stroke-width=".8"/>
      <path d="M47 47L52 49L49 53L44 51Z" fill="__O__"/>
      <path d="M52 49L60 48L54 53Z" fill="__GL__"/>
      <circle cx="53" cy="47" r="1.4" fill="__E__" stroke="#fff" stroke-width=".35"/>
      <path d="M44 58L50 63L57 57" stroke="#fff0b7" stroke-width=".8"/>`,

    art_scepter: `
      <ellipse cx="50" cy="85" rx="18" ry="4" fill="__SH__"/>
      <path d="M45 32L55 32L58 72L55 79H45L42 72Z"
        fill="__O__" stroke="__G__" stroke-width="1.2"/>
      <path d="M47 35L50 36L50 75L47 73Z" fill="__GL__" opacity=".9"/>
      <path d="M44 39L56 39M43 44L57 44M43 67L57 67M44 72L56 72"
        stroke="__G__" stroke-width="1.4"/>
      <path d="M43 42L57 48L43 54L57 60"
        stroke="__GL__" stroke-width="1.3" fill="none"/>
      <path d="M40 31H60L63 36L60 40H40L37 36Z"
        fill="__GD__" stroke="__GL__" stroke-width="1"/>
      <path d="M41 28L45 21H55L59 28L55 32H45Z"
        fill="__G__" stroke="#fff1bd" stroke-width=".8"/>
      <circle cx="50" cy="19" r="9" fill="__G__" stroke="#fff2c2" stroke-width="1"/>
      <circle cx="50" cy="19" r="6.4" fill="__GD__" stroke="#745019" stroke-width=".7"/>
      <path d="M50 10V28M41 19H59" stroke="__GL__" stroke-width="1.1"/>
      <path d="M47 13H53M47 25H53" stroke="#fff5d0" stroke-width=".7"/>
      <path d="M45 10L50 4L55 10Z" fill="__G__" stroke="#fff5cc" stroke-width=".7"/>
      <path d="M46 79H54L52 84H48Z" fill="__G__" stroke="#fff2b8" stroke-width=".7"/>`
  };

  for (const [key, body] of Object.entries(TPC_ARTWORK_V2)) {
    A[key] = makeTPCArtwork(key, body);
  }

  // Keep all catalog ID aliases pointing to the corresponding artwork.
  const aliases = {
    crown1: "crown_imperial",
    crown2: "crown_sol",
    crown3: "crown_moritz",
    crown4: "crown_zenith",
    ring1: "ring_monogram",
    ring2: "ring_onyx",
    ring3: "ring_falcon",
    ring4: "ring_chrono",
    aura1: "aura_radial",
    aura2: "aura_guilloche",
    aura3: "aura_eclipse",
    aura4: "aura_celestial",
    star1: "star_sovereign",
    star2: "star_grand_cross",
    star3: "star_constellation",
    star4: "star_zenith",
    art1: "art_tourbillon",
    art2: "art_seal",
    art3: "art_falcon_medallion",
    art4: "art_scepter",
    wid1: "wid_mastercard"
  };

  for (const [id, iconKey] of Object.entries(aliases)) {
    A[id] = A[iconKey];
  }

  // Preserve the approved benchmark and legacy fallbacks.
  A.crown = A.crown_zenith;
  A.ring = A.ring_falcon;
  A.aura = A.aura_radial;
  A.star = A.star_sovereign;
  A.pendant = A.art_falcon_medallion;

  console.info("[THE 1% CLUB] Handcrafted SVG artwork V2 installed.");
})();

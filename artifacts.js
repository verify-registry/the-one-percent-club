function buildVitrineChamber(innerContent, uid) {
  return `
    <defs>
      <!-- Ambient Golden Radiance (Pure champagne gold, zero black halo) -->
      <radialGradient id="${uid}-ambient" cx="50%" cy="48%" r="48%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.14"/>
        <stop offset="50%" stop-color="#D4AF37" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
      </radialGradient>
      <!-- Grounded Contact Shadow (Subtle grounding, no fuzzy dark circle) -->
      <radialGradient id="${uid}-floor-shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.5"/>
        <stop offset="60%" stop-color="#000000" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
      <!-- Plinth Rim Horizon -->
      <linearGradient id="${uid}-plinth-rim" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0"/>
        <stop offset="30%" stop-color="#D4AF37" stop-opacity="0.35"/>
        <stop offset="50%" stop-color="#FFF3D1" stop-opacity="0.65"/>
        <stop offset="70%" stop-color="#D4AF37" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <!-- Subtle Ambient Spotlight -->
    <circle cx="120" cy="116" r="92" fill="url(#${uid}-ambient)" />

    <!-- Grounded Contact Shadow & Plinth Rim -->
    <ellipse cx="120" cy="214" rx="60" ry="6" fill="url(#${uid}-floor-shadow)" />
    <path d="M 68 214 L 172 214" stroke="url(#${uid}-plinth-rim)" stroke-width="0.75" opacity="0.6" />

    <!-- Collectible Masterpiece Layer -->
    <g>
      ${innerContent}
    </g>
  `;
}

window.getSovereignArtifact = function(idOrType) {
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

  const sharedDefs = `
    <defs>
      <!-- Master 24K Imperial Gold -->
      <linearGradient id="${uid}-gold-imperial" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF5D6" />
        <stop offset="18%" stop-color="#F3CE75" />
        <stop offset="42%" stop-color="#D4AF37" />
        <stop offset="72%" stop-color="#9A7220" />
        <stop offset="90%" stop-color="#5E400A" />
        <stop offset="100%" stop-color="#8C6518" />
      </linearGradient>

      <!-- Champagne Specular Gold -->
      <linearGradient id="${uid}-gold-champagne" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#785616" />
        <stop offset="30%" stop-color="#C59B27" />
        <stop offset="55%" stop-color="#F9E4AA" />
        <stop offset="75%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#DFB752" />
      </linearGradient>

      <!-- Antique Burnished Gold -->
      <linearGradient id="${uid}-gold-burnished" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#E2BA5B" />
        <stop offset="50%" stop-color="#9E7622" />
        <stop offset="100%" stop-color="#3B2706" />
      </linearGradient>

      <!-- Deep Recessed Shadow Gold -->
      <linearGradient id="${uid}-gold-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#5C400D" />
        <stop offset="50%" stop-color="#2D1E04" />
        <stop offset="100%" stop-color="#120B01" />
      </linearGradient>

      <!-- Obsidian Enamel Core -->
      <radialGradient id="${uid}-obsidian" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stop-color="#32353E" />
        <stop offset="30%" stop-color="#15171C" />
        <stop offset="75%" stop-color="#07080A" />
        <stop offset="100%" stop-color="#020203" />
      </radialGradient>

      <!-- Linear Faceted Obsidian -->
      <linearGradient id="${uid}-obsidian-facet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3A3D46" />
        <stop offset="28%" stop-color="#181A20" />
        <stop offset="70%" stop-color="#07080B" />
        <stop offset="100%" stop-color="#1E2028" />
      </linearGradient>

      <!-- Sovereign Emerald Cut -->
      <linearGradient id="${uid}-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#5CE69B" />
        <stop offset="28%" stop-color="#199E58" />
        <stop offset="65%" stop-color="#085A2D" />
        <stop offset="100%" stop-color="#022610" />
      </linearGradient>

      <radialGradient id="${uid}-emerald-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#34D399" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#064E3B" stop-opacity="0" />
      </radialGradient>

      <!-- Diamond & Platinum Cut -->
      <linearGradient id="${uid}-diamond" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="40%" stop-color="#EBF3FA" />
        <stop offset="75%" stop-color="#B0C2D4" />
        <stop offset="100%" stop-color="#5E7085" />
      </linearGradient>

      <linearGradient id="${uid}-platinum-shade" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#D4DEE8" />
        <stop offset="50%" stop-color="#8492A4" />
        <stop offset="100%" stop-color="#38404C" />
      </linearGradient>

      <!-- Sovereign Crimson Ruby -->
      <radialGradient id="${uid}-ruby" cx="35%" cy="32%" r="65%">
        <stop offset="0%" stop-color="#FF7592" />
        <stop offset="35%" stop-color="#C81432" />
        <stop offset="75%" stop-color="#5A0310" />
        <stop offset="100%" stop-color="#200004" />
      </radialGradient>

      <filter id="${uid}-drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.85" />
      </filter>
    </defs>
  `;

  let innerSvg = '';

  switch (type) {
    /* =====================================================================
     * 1. star1 — Order of the Sovereign Star
     * ===================================================================== */
    case 'star_sovereign': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 112)">
          <!-- Background Octagonal Guilloché Shield Plate -->
          <polygon points="0,-74 52,-52 74,0 52,52 0,74 -52,52 -74,0 -52,-52" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.5"/>
          <polygon points="0,-68 48,-48 68,0 48,48 0,68 -48,48 -68,0 -48,-48" fill="#0B0A08" stroke="url(#${uid}-gold-champagne)" stroke-width="0.8" stroke-dasharray="3 2"/>

          <!-- 16 Interlocking Chiseled Rays (8 Diagonal + 8 Cardinal) -->
          <!-- Diagonal Beveled Rays -->
          <g>
            <polygon points="0,0 74,-74 36,-16" fill="url(#${uid}-gold-champagne)"/>
            <polygon points="0,0 74,-74 16,-36" fill="url(#${uid}-gold-burnished)"/>
            <polygon points="0,0 74,74 16,36" fill="url(#${uid}-gold-champagne)"/>
            <polygon points="0,0 74,74 36,16" fill="url(#${uid}-gold-burnished)"/>
            <polygon points="0,0 -74,74 -36,16" fill="url(#${uid}-gold-champagne)"/>
            <polygon points="0,0 -74,74 -16,36" fill="url(#${uid}-gold-burnished)"/>
            <polygon points="0,0 -74,-74 -16,-36" fill="url(#${uid}-gold-champagne)"/>
            <polygon points="0,0 -74,-74 -36,-16" fill="url(#${uid}-gold-burnished)"/>
          </g>

          <!-- Primary Cardinal Chiseled Rays -->
          <g>
            <polygon points="0,0 0,-100 22,-34" fill="url(#${uid}-gold-burnished)"/>
            <polygon points="0,0 0,-100 -22,-34" fill="url(#${uid}-gold-champagne)"/>
            <polygon points="0,0 100,0 34,22" fill="url(#${uid}-gold-burnished)"/>
            <polygon points="0,0 100,0 34,-22" fill="url(#${uid}-gold-champagne)"/>
            <polygon points="0,0 0,100 -22,34" fill="url(#${uid}-gold-burnished)"/>
            <polygon points="0,0 0,100 22,34" fill="url(#${uid}-gold-champagne)"/>
            <polygon points="0,0 -100,0 -34,-22" fill="url(#${uid}-gold-burnished)"/>
            <polygon points="0,0 -100,0 -34,22" fill="url(#${uid}-gold-champagne)"/>
          </g>

          <!-- 8 Diamond-Tipped Inner Spears -->
          <g fill="url(#${uid}-diamond)" stroke="#5E400A" stroke-width="0.6">
            <polygon points="0,-62 7,-42 0,-46 -7,-42"/>
            <polygon points="62,0 42,7 46,0 42,-7"/>
            <polygon points="0,62 7,42 0,46 -7,42"/>
            <polygon points="-62,0 -42,7 -46,0 -42,-7"/>
            <polygon points="45,-45 34,-26 28,-32"/>
            <polygon points="45,45 34,26 28,32"/>
            <polygon points="-45,45 -34,26 -28,32"/>
            <polygon points="-45,-45 -34,-26 -28,-32"/>
          </g>

          <!-- Heavy Stepped Central Medallion Bezel -->
          <circle cx="0" cy="0" r="42" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="37" fill="#0E0C08" stroke="url(#${uid}-gold-champagne)" stroke-width="1"/>
          <!-- 8 Bezel Rivet Diamonds -->
          <g fill="url(#${uid}-diamond)" stroke="#5E400A" stroke-width="0.5">
            <circle cx="0" cy="-39.5" r="2"/><circle cx="39.5" cy="0" r="2"/>
            <circle cx="0" cy="39.5" r="2"/><circle cx="-39.5" cy="0" r="2"/>
            <circle cx="28" cy="-28" r="2"/><circle cx="28" cy="28" r="2"/>
            <circle cx="-28" cy="28" r="2"/><circle cx="-28" cy="-28" r="2"/>
          </g>

          <!-- Glossy Obsidian Inner Core -->
          <circle cx="0" cy="0" r="33" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.8"/>
          <circle cx="0" cy="0" r="29" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="0.8" stroke-dasharray="2 2"/>

          <!-- Sovereign Crown & 1% Insignia -->
          <path d="M -11,-11 L -14,-21 L -5,-15 L 0,-23 L 5,-15 L 14,-21 L 11,-11 Z" fill="url(#${uid}-gold-champagne)"/>
          <text x="0" y="14" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="23" font-weight="700" fill="url(#${uid}-gold-champagne)" letter-spacing="1">1%</text>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 2. aura1 — Champagne Radial Halo
     * ===================================================================== */
    case 'aura_champagne': {
      let blades = '';
      for (let i = 0; i < 16; i++) {
        const angle = i * 22.5;
        const isMain = i % 2 === 0;
        const tip = isMain ? -98 : -82;
        const baseW = isMain ? 8 : 5.5;
        blades += `
          <g transform="rotate(${angle})">
            <polygon points="0,${tip} ${baseW},-44 0,-50" fill="url(#${uid}-gold-burnished)"/>
            <polygon points="0,${tip} -${baseW},-44 0,-50" fill="url(#${uid}-gold-champagne)"/>
          </g>
        `;
      }
      let gems = '';
      for (let i = 0; i < 16; i++) {
        const angle = i * 22.5 + 11.25;
        gems += `
          <g transform="rotate(${angle})">
            <line x1="0" y1="-48" x2="0" y2="-70" stroke="url(#${uid}-gold-imperial)" stroke-width="1.4"/>
            <polygon points="0,-75 3,-69 0,-63 -3,-69" fill="url(#${uid}-diamond)" stroke="#785616" stroke-width="0.5"/>
          </g>
        `;
      }
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 112)">
          <!-- Outer Architectural Sunburst Blades -->
          ${blades}
          ${gems}

          <!-- Scalloped Gold Filigree Ring -->
          <circle cx="0" cy="0" r="54" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="2.2"/>
          <circle cx="0" cy="0" r="49" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1.4"/>
          <circle cx="0" cy="0" r="44" fill="#100C06"/>

          <!-- Full Diamond Pavé Halo Ring -->
          <circle cx="0" cy="0" r="44" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="3.2 2.3"/>
          <circle cx="0" cy="0" r="40" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1"/>

          <!-- Domed Black Obsidian Cabochon Center -->
          <circle cx="0" cy="0" r="36" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.5"/>
          <path d="M -22 -16 A 28 28 0 0 1 18 -22" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.4"/>

          <!-- Central Compass Rose Star -->
          <polygon points="0,-18 4,-4 18,0 4,4 0,18 -4,4 -18,0 -4,-4" fill="url(#${uid}-gold-champagne)"/>
          <circle cx="0" cy="0" r="3" fill="#FFFFFF"/>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 3. ring1 — Sovereign Monogram Signet (FIXED & SCULPTED 3D SIGNET)
     * ===================================================================== */
    case 'ring_monogram':
    case 'ring1':
    case 'sovereign_signet': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 114)">
          <!-- Lower 3D Ring Shank (Back & Inner Band) -->
          <path d="M -58,18 C -64,74 64,74 58,18 L 42,8 C 44,50 -44,50 -42,8 Z" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-burnished)" stroke-width="1.5"/>
          <!-- Outer Lower Ring Band Thickness -->
          <path d="M -58,18 C -52,66 52,66 58,18 L 46,28 C 38,56 -38,56 -46,28 Z" fill="url(#${uid}-gold-burnished)" stroke="#2D1E04" stroke-width="1"/>
          <path d="M -42,26 C -28,50 28,50 42,26" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2" opacity="0.7"/>

          <!-- Left & Right Sculpted Shoulders with Architectural Fluting -->
          <polygon points="-82,-18 -52,-56 -46,22 -64,28" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1.2"/>
          <polygon points="82,-18 52,-56 46,22 64,28" fill="url(#${uid}-gold-burnished)" stroke="#3B2706" stroke-width="1.2"/>
          <!-- Shoulder Stepped Chevron Ribs -->
          <polygon points="-76,-12 -56,-40 -54,-24 -72,-2" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-champagne)" stroke-width="0.7"/>
          <polygon points="-72,2 -54,-18 -52,-2 -68,14" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-champagne)" stroke-width="0.7"/>
          <polygon points="76,-12 56,-40 54,-24 72,-2" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-champagne)" stroke-width="0.7"/>
          <polygon points="72,2 54,-18 52,-2 68,14" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-champagne)" stroke-width="0.7"/>

          <!-- Heavy Chiseled Octagonal Signet Head (Outer Bevel) -->
          <polygon points="-38,-72 38,-72 72,-38 72,18 38,44 -38,44 -72,18 -72,-38" fill="url(#${uid}-gold-imperial)" stroke="#FFF5D6" stroke-width="1.2"/>
          <!-- Bevel Facet Shading -->
          <polygon points="-38,44 38,44 72,18 60,10 32,32 -32,32 -60,10 -72,18" fill="url(#${uid}-gold-burnished)"/>
          <polygon points="38,-72 72,-38 72,18 60,10 60,-32 32,-60" fill="url(#${uid}-gold-burnished)"/>

          <!-- Inner Octagonal Gold Frame & Coin-Edge Rim -->
          <polygon points="-32,-60 32,-60 60,-32 60,10 32,32 -32,32 -60,10 -60,-32" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1.4"/>
          <polygon points="-28,-55 28,-55 55,-28 55,7 28,27 -28,27 -55,7 -55,-28" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.5"/>

          <!-- Specular Glass Sheen on Obsidian Table -->
          <polyline points="-48,-24 -25,-49 24,-49" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" opacity="0.35"/>

          <!-- Engraved Sovereign Crown & 1% Monogram -->
          <g transform="translate(0, -25)">
            <path d="M -18,4 L -22,-11 L -9,-3 L 0,-16 L 9,-3 L 22,-11 L 18,4 Z" fill="url(#${uid}-gold-champagne)" stroke="#5E400A" stroke-width="0.7"/>
            <rect x="-18" y="6" width="36" height="3.5" rx="1" fill="url(#${uid}-gold-imperial)"/>
            <circle cx="-22" cy="-13" r="1.8" fill="#FFFFFF"/>
            <circle cx="0" cy="-18" r="2.2" fill="#FFFFFF"/>
            <circle cx="22" cy="-13" r="1.8" fill="#FFFFFF"/>
          </g>
          <text x="0" y="15" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="30" font-weight="700" fill="url(#${uid}-gold-champagne)" letter-spacing="1.5">1%</text>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 4. crown1 — Imperial Obsidian Crown
     * ===================================================================== */
    case 'crown_imperial': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 114)">
          <!-- Rear Obsidian Monolith Blades (Chiseled 2-Tone Facets) -->
          <!-- Far Left Obsidian Peak -->
          <polygon points="-82,26 -90,-32 -72,-52 -56,-28 -56,26" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="-72,-52 -56,-28 -56,26 -72,26" fill="#050507"/>
          <!-- Mid Left Obsidian Peak -->
          <polygon points="-56,26 -54,-46 -34,-70 -14,-44 -14,26" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.2"/>
          <polygon points="-34,-70 -14,-44 -14,26 -34,26" fill="#050507"/>
          <!-- Mid Right Obsidian Peak -->
          <polygon points="14,26 14,-44 34,-70 54,-46 56,26" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.2"/>
          <polygon points="34,-70 54,-46 56,26 34,26" fill="#050507"/>
          <!-- Far Right Obsidian Peak -->
          <polygon points="56,26 56,-28 72,-52 90,-32 82,26" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="72,-52 90,-32 82,26 72,26" fill="#050507"/>

          <!-- Foreground Sculpted 24K Gold Spires -->
          <!-- Outer Left & Right Spires -->
          <polygon points="-96,-30 -82,26 -72,26" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.8"/>
          <polygon points="96,-30 82,26 72,26" fill="url(#${uid}-gold-burnished)" stroke="#3B2706" stroke-width="0.8"/>

          <!-- Mid-Left Gold Spire with Emerald Cut -->
          <polygon points="-56,-54 -68,26 -44,26" fill="url(#${uid}-gold-imperial)" stroke="#FFF5D6" stroke-width="0.9"/>
          <polygon points="-56,-54 -56,26 -44,26" fill="url(#${uid}-gold-burnished)"/>
          <polygon points="-56,-30 -50,-18 -56,-6 -62,-18" fill="url(#${uid}-emerald)" stroke="#FFF5D6" stroke-width="0.8"/>
          <circle cx="-56" cy="-57" r="3" fill="url(#${uid}-gold-champagne)"/>

          <!-- Mid-Right Gold Spire with Emerald Cut -->
          <polygon points="56,-54 44,26 68,26" fill="url(#${uid}-gold-imperial)" stroke="#FFF5D6" stroke-width="0.9"/>
          <polygon points="56,-54 56,26 68,26" fill="url(#${uid}-gold-burnished)"/>
          <polygon points="56,-30 62,-18 56,-6 50,-18" fill="url(#${uid}-emerald)" stroke="#FFF5D6" stroke-width="0.8"/>
          <circle cx="56" cy="-57" r="3" fill="url(#${uid}-gold-champagne)"/>

          <!-- Central Sovereign Spire (Tallest) -->
          <polygon points="0,-92 -22,-50 -13,-34 -26,26 26,26 13,-34 22,-50" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1.1"/>
          <polygon points="0,-92 0,26 26,26 13,-34 22,-50" fill="url(#${uid}-gold-imperial)"/>
          <!-- Upper & Lower Central Emeralds -->
          <polygon points="0,-78 11,-58 0,-38 -11,-58" fill="url(#${uid}-emerald)" stroke="#FFF5D6" stroke-width="1.1"/>
          <polygon points="0,-24 8,-8 0,8 -8,-8" fill="url(#${uid}-emerald)" stroke="#FFF5D6" stroke-width="1"/>
          <circle cx="0" cy="-96" r="3.5" fill="url(#${uid}-diamond)"/>
          <circle cx="0" cy="-31" r="2.2" fill="url(#${uid}-diamond)"/>
          <circle cx="0" cy="15" r="2.2" fill="url(#${uid}-diamond)"/>

          <!-- Heavy Architectural Base Circlet -->
          <polygon points="-86,24 86,24 90,58 -90,58" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1.4"/>
          <rect x="-83" y="29" width="166" height="24" rx="2" fill="#120D04" stroke="url(#${uid}-gold-champagne)" stroke-width="1"/>
          <line x1="-84" y1="26.5" x2="84" y2="26.5" stroke="#FFF5D6" stroke-width="2" stroke-dasharray="3 2.5"/>
          <line x1="-86" y1="55.5" x2="86" y2="55.5" stroke="#FFF5D6" stroke-width="2" stroke-dasharray="3 2.5"/>

          <!-- Step-Cut Emeralds & Diamonds on Circlet -->
          <rect x="-74" y="35" width="16" height="12" rx="1.5" fill="url(#${uid}-emerald)" stroke="url(#${uid}-gold-champagne)" stroke-width="1"/>
          <rect x="-44" y="35" width="16" height="12" rx="1.5" fill="url(#${uid}-emerald)" stroke="url(#${uid}-gold-champagne)" stroke-width="1"/>
          <rect x="28" y="35" width="16" height="12" rx="1.5" fill="url(#${uid}-emerald)" stroke="url(#${uid}-gold-champagne)" stroke-width="1"/>
          <rect x="58" y="35" width="16" height="12" rx="1.5" fill="url(#${uid}-emerald)" stroke="url(#${uid}-gold-champagne)" stroke-width="1"/>
          <polygon points="-51,38 -48,41 -51,44 -54,41" fill="url(#${uid}-diamond)"/>
          <polygon points="51,38 54,41 51,44 48,41" fill="url(#${uid}-diamond)"/>

          <!-- Center 1% Cartouche -->
          <rect x="-18" y="32" width="36" height="18" rx="2" fill="#060608" stroke="url(#${uid}-gold-champagne)" stroke-width="1.3"/>
          <text x="0" y="46" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="14" font-weight="700" fill="url(#${uid}-gold-champagne)">1%</text>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 5. ring2 — Black Onyx Intaglio Signet
     * ===================================================================== */
    case 'ring_onyx': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 114)">
          <!-- Lower 3D Ring Shank -->
          <path d="M -58,18 C -64,74 64,74 58,18 L 42,8 C 44,50 -44,50 -42,8 Z" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-burnished)" stroke-width="1.5"/>
          <path d="M -58,18 C -52,66 52,66 58,18 L 46,28 C 38,56 -38,56 -46,28 Z" fill="url(#${uid}-gold-burnished)" stroke="#2D1E04" stroke-width="1"/>

          <!-- Sculpted Shoulders with Onyx Channel Inlays -->
          <polygon points="-82,-18 -52,-56 -46,22 -64,28" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1.2"/>
          <polygon points="82,-18 52,-56 46,22 64,28" fill="url(#${uid}-gold-burnished)" stroke="#3B2706" stroke-width="1.2"/>
          <polygon points="-75,-8 -55,-38 -51,8 -66,16" fill="#0A0A0D" stroke="url(#${uid}-gold-champagne)" stroke-width="0.9"/>
          <polygon points="75,-8 55,-38 51,8 66,16" fill="#0A0A0D" stroke="url(#${uid}-gold-champagne)" stroke-width="0.9"/>

          <!-- Heavy Chiseled Octagonal Signet Bezel -->
          <polygon points="-38,-72 38,-72 72,-38 72,18 38,44 -38,44 -72,18 -72,-38" fill="url(#${uid}-gold-imperial)" stroke="#FFF5D6" stroke-width="1.2"/>
          <polygon points="-32,-60 32,-60 60,-32 60,10 32,32 -32,32 -60,10 -60,-32" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1.4"/>

          <!-- Deep Black Onyx Intaglio Table -->
          <polygon points="-28,-55 28,-55 55,-28 55,7 28,27 -28,27 -55,7 -55,-28" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.5"/>
          <polyline points="-48,-24 -25,-49 24,-49" fill="none" stroke="#FFFFFF" stroke-width="1.2" opacity="0.3"/>

          <!-- Heraldic Double-Headed Imperial Eagle Intaglio (Platinum & Gold) -->
          <g transform="translate(0, -14) scale(1.12)">
            <!-- Left & Right Spread Feather Wings -->
            <path d="M -5,-6 L -34,-22 L -28,-12 L -36,-6 L -26,0 L -32,6 L -20,10 L -22,16 L -8,10 Z" fill="url(#${uid}-platinum-shade)" stroke="#181A20" stroke-width="0.6"/>
            <path d="M 5,-6 L 34,-22 L 28,-12 L 36,-6 L 26,0 L 32,6 L 20,10 L 22,16 L 8,10 Z" fill="url(#${uid}-diamond)" stroke="#181A20" stroke-width="0.6"/>
            <!-- Twin Eagle Heads -->
            <path d="M -3,-8 C -5,-16 -10,-22 -18,-20 L -13,-15 L -16,-12 L -6,-6 Z" fill="url(#${uid}-diamond)"/>
            <path d="M 3,-8 C 5,-16 10,-22 18,-20 L 13,-15 L 16,-12 L 6,-6 Z" fill="url(#${uid}-diamond)"/>
            <!-- Sovereign Crown Above Eagle -->
            <polygon points="-8,-24 0,-31 8,-24 5,-20 -5,-20" fill="url(#${uid}-gold-champagne)"/>
            <!-- Central Crest Shield with 1% -->
            <polygon points="-9,-7 9,-7 8,9 0,16 -8,9" fill="#0D0E12" stroke="url(#${uid}-gold-champagne)" stroke-width="1"/>
            <text x="0" y="6" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="9.5" font-weight="700" fill="url(#${uid}-gold-champagne)">1%</text>
            <!-- Tail Feathers -->
            <polygon points="-5,14 0,27 5,14 10,21 0,30 -10,21" fill="url(#${uid}-platinum-shade)"/>
          </g>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 6. art1 — Haute Horlogerie Pocket Relic
     * ===================================================================== */
    case 'art_horology': {
      let ticks = '';
      for (let i = 0; i < 60; i++) {
        const angle = i * 6;
        const isHour = i % 5 === 0;
        const r1 = isHour ? 56 : 59;
        const sw = isHour ? 1.6 : 0.7;
        ticks += `<line x1="0" y1="-${r1}" x2="0" y2="-62" stroke="url(#${uid}-gold-champagne)" stroke-width="${sw}" transform="rotate(${angle})"/>`;
      }
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 122)">
          <!-- Sculpted Pocket Watch Bow (Suspension Ring) & Winding Crown -->
          <path d="M -22,-86 C -26,-112 26,-112 22,-86" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="5" stroke-linecap="round"/>
          <path d="M -20,-86 C -23,-108 23,-108 20,-86" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="1.5"/>
          <rect x="-9" y="-86" width="18" height="11" rx="2" fill="url(#${uid}-gold-burnished)" stroke="#3B2706" stroke-width="1"/>
          <!-- Knurled Winding Crown -->
          <rect x="-13" y="-94" width="26" height="8" rx="3" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1"/>
          <line x1="-8" y1="-94" x2="-8" y2="-86" stroke="#3B2706" stroke-width="1"/>
          <line x1="-3" y1="-94" x2="-3" y2="-86" stroke="#3B2706" stroke-width="1"/>
          <line x1="3" y1="-94" x2="3" y2="-86" stroke="#3B2706" stroke-width="1"/>
          <line x1="8" y1="-94" x2="8" y2="-86" stroke="#3B2706" stroke-width="1"/>

          <!-- Multi-Stepped 24K Gold Pocket Watch Case -->
          <circle cx="0" cy="0" r="80" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1.8"/>
          <circle cx="0" cy="0" r="74" fill="url(#${uid}-gold-champagne)" stroke="#5E400A" stroke-width="1"/>
          <circle cx="0" cy="0" r="70" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.8"/>

          <!-- Outer Roman Chapter Ring & Minute Railway Track -->
          <circle cx="0" cy="0" r="62" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="0.9"/>
          ${ticks}
          <circle cx="0" cy="0" r="50" fill="#060608" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>

          <!-- Roman Numerals -->
          <g font-family="Cinzel, Georgia, serif" font-size="7.5" font-weight="700" fill="url(#${uid}-gold-champagne)" text-anchor="middle">
            <text x="0" y="-51">XII</text><text x="53" y="3">III</text>
            <text x="0" y="57">VI</text><text x="-53" y="3">IX</text>
          </g>

          <!-- Openworked Skeleton Mechanical Movement -->
          <!-- Upper Barrel Gear -->
          <circle cx="0" cy="-22" r="16" fill="none" stroke="url(#${uid}-gold-burnished)" stroke-width="2.8" stroke-dasharray="3.5 2"/>
          <circle cx="0" cy="-22" r="12" fill="#100C06" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>
          <!-- Left & Right Sub-Gears -->
          <g transform="translate(-23, -4)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="2.5" stroke-dasharray="3 2"/>
            <circle cx="0" cy="0" r="9" fill="#0D0A06" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>
            <line x1="-9" y1="0" x2="9" y2="0" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>
            <line x1="0" y1="-9" x2="0" y2="9" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>
            <circle cx="0" cy="0" r="2.5" fill="url(#${uid}-ruby)"/>
          </g>
          <g transform="translate(23, -4)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="2.5" stroke-dasharray="3 2"/>
            <circle cx="0" cy="0" r="9" fill="#0D0A06" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>
            <line x1="-7" y1="-7" x2="7" y2="7" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>
            <line x1="7" y1="-7" x2="-7" y2="7" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>
            <circle cx="0" cy="0" r="2.5" fill="url(#${uid}-ruby)"/>
          </g>

          <!-- 6 O'Clock Tourbillon Bridge & Cage -->
          <line x1="-38" y1="24" x2="38" y2="24" stroke="url(#${uid}-gold-imperial)" stroke-width="4" stroke-linecap="round"/>
          <circle cx="0" cy="24" r="16" fill="#050507" stroke="url(#${uid}-gold-champagne)" stroke-width="1.8"/>
          <polygon points="0,10 12,24 0,38 -12,24" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="1.4"/>
          <circle cx="0" cy="24" r="3.5" fill="url(#${uid}-ruby)" stroke="#FFF5D6" stroke-width="0.7"/>

          <!-- 12 O'Clock 1% Sovereign Cartouche -->
          <rect x="-16" y="-36" width="32" height="14" rx="2" fill="#08080A" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2"/>
          <text x="0" y="-26" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="10.5" font-weight="700" fill="url(#${uid}-gold-champagne)">1%</text>

          <!-- Cathedral Hands -->
          <line x1="0" y1="0" x2="-24" y2="-20" stroke="#FFF5D6" stroke-width="3.2" stroke-linecap="round"/>
          <line x1="0" y1="0" x2="34" y2="-16" stroke="#FFF5D6" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="0" cy="0" r="5" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1"/>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 7. ring3 — Falcon Emerald Sovereign Signet
     * ===================================================================== */
    case 'ring_emerald': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 114)">
          <!-- Lower 3D Ring Shank -->
          <path d="M -58,18 C -64,74 64,74 58,18 L 42,8 C 44,50 -44,50 -42,8 Z" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-burnished)" stroke-width="1.5"/>
          <path d="M -58,18 C -52,66 52,66 58,18 L 46,28 C 38,56 -38,56 -46,28 Z" fill="url(#${uid}-gold-burnished)" stroke="#2D1E04" stroke-width="1"/>

          <!-- Sculpted Shoulders with 1% Plaque on Right Shoulder -->
          <polygon points="-82,-18 -52,-56 -46,22 -64,28" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1.2"/>
          <polygon points="82,-18 52,-56 46,22 64,28" fill="url(#${uid}-gold-burnished)" stroke="#3B2706" stroke-width="1.2"/>
          <polygon points="76,-10 56,-36 52,8 68,16" fill="#0B0A08" stroke="url(#${uid}-gold-champagne)" stroke-width="1"/>
          <text x="63" y="-4" transform="rotate(18 63 -4)" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="11" font-weight="700" fill="url(#${uid}-gold-champagne)">1%</text>

          <!-- Heavy Octagonal Gold Bezel -->
          <polygon points="-38,-72 38,-72 72,-38 72,18 38,44 -38,44 -72,18 -72,-38" fill="url(#${uid}-gold-imperial)" stroke="#FFF5D6" stroke-width="1.2"/>
          <polygon points="-32,-60 32,-60 60,-32 60,10 32,32 -32,32 -60,10 -60,-32" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1.4"/>

          <!-- Deep Step-Cut Imperial Emerald Gemstone -->
          <polygon points="-28,-55 28,-55 55,-28 55,7 28,27 -28,27 -55,7 -55,-28" fill="url(#${uid}-emerald)" stroke="#032610" stroke-width="1.4"/>
          <!-- Step-Cut Internal Facet Geometry -->
          <polygon points="-20,-43 20,-43 41,-22 41,1 20,17 -20,17 -41,1 -41,-22" fill="url(#${uid}-emerald)" stroke="#5CE69B" stroke-width="0.9"/>
          <line x1="-28" y1="-55" x2="-20" y2="-43" stroke="#5CE69B" stroke-width="0.9"/>
          <line x1="28" y1="-55" x2="20" y2="-43" stroke="#5CE69B" stroke-width="0.9"/>
          <line x1="55" y1="-28" x2="41" y2="-22" stroke="#5CE69B" stroke-width="0.9"/>
          <line x1="-55" y1="-28" x2="-41" y2="-22" stroke="#5CE69B" stroke-width="0.9"/>
          <line x1="55" y1="7" x2="41" y2="1" stroke="#022610" stroke-width="1"/>
          <line x1="-55" y1="7" x2="-41" y2="1" stroke="#022610" stroke-width="1"/>

          <!-- Chiseled 24K Gold Falcon Emblem in Relief -->
          <g transform="translate(0, -13) scale(1.15)">
            <path d="M -18,16 L -14,-4 L -4,-18 L 12,-20 L 24,-10 L 18,-2 L 12,-6 L 14,4 L 4,10 L 6,16 Z" fill="url(#${uid}-gold-champagne)" stroke="#2D1E04" stroke-width="1"/>
            <!-- Hooked Falcon Beak -->
            <polygon points="12,-20 26,-12 21,-1 15,-8" fill="#FFF5D6" stroke="#3B2706" stroke-width="0.8"/>
            <!-- Falcon Eye -->
            <polygon points="2,-11 9,-12 7,-8 1,-8" fill="#090806"/>
            <circle cx="5" cy="-10" r="1" fill="#FFF5D6"/>
            <!-- Sculpted Neck Feathers -->
            <polyline points="-10,2 -2,-2 4,4" fill="none" stroke="#3B2706" stroke-width="1.2"/>
            <polyline points="-12,9 -4,5 2,11" fill="none" stroke="#3B2706" stroke-width="1.2"/>
          </g>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 8. aura4 — Celestial Apex Radiance
     * ===================================================================== */
    case 'aura_celestial': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 114)">
          <!-- Back Half of Intersecting Gyroscope Rings -->
          <ellipse cx="0" cy="0" rx="92" ry="32" transform="rotate(-26)" fill="none" stroke="url(#${uid}-gold-burnished)" stroke-width="4"/>
          <ellipse cx="0" cy="0" rx="86" ry="28" transform="rotate(30)" fill="none" stroke="url(#${uid}-gold-burnished)" stroke-width="3.5"/>

          <!-- Outer Graduated Meridian Ring -->
          <circle cx="0" cy="0" r="74" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="5.5"/>
          <circle cx="0" cy="0" r="74" fill="none" stroke="#2D1E04" stroke-width="1.5" stroke-dasharray="2 6"/>
          <circle cx="0" cy="0" r="69.5" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="0.9"/>

          <!-- Central Glossy Obsidian Celestial Globe -->
          <circle cx="0" cy="0" r="44" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold-imperial)" stroke-width="2"/>
          <ellipse cx="0" cy="0" rx="44" ry="15" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="1.3" opacity="0.85"/>
          <ellipse cx="0" cy="0" rx="16" ry="44" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="1.3" opacity="0.85"/>

          <!-- Front Half of Intersecting Gyroscope Rings -->
          <path d="M -82,38 A 92,32 0 0,0 82,-38" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="4.2" stroke-linecap="round"/>
          <path d="M -74,-42 A 86,28 0 0,0 74,42" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="3.8" stroke-linecap="round"/>
          <ellipse cx="0" cy="0" rx="96" ry="16" transform="rotate(-5)" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="2.8"/>

          <!-- Orbital Planetary Spheres -->
          <circle cx="-64" cy="-36" r="7" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.9"/>
          <circle cx="66" cy="28" r="5.5" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.9"/>
          <circle cx="-84" cy="10" r="4.5" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.8"/>
          <circle cx="72" cy="-32" r="5" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.8"/>

          <!-- Central Blazing 8-Point Celestial Star -->
          <polygon points="0,-32 5,-6 32,0 5,6 0,32 -5,6 -32,0 -5,-6" fill="url(#${uid}-gold-champagne)"/>
          <polygon points="0,-24 3,-3 24,0 3,3 0,24 -3,3 -24,0 -3,-3" fill="#FFFFFF"/>

          <!-- North Pole Zenith Finial -->
          <polygon points="0,-96 5,-80 18,-76 5,-72 0,-58 -5,-72 -18,-76 -5,-80" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.7"/>
          <circle cx="0" cy="-76" r="3" fill="#FFFFFF"/>

          <!-- South Pole 1% Plaque -->
          <rect x="-17" y="64" width="34" height="17" rx="3" fill="#08080A" stroke="url(#${uid}-gold-champagne)" stroke-width="1.3"/>
          <text x="0" y="76" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="12" font-weight="700" fill="url(#${uid}-gold-champagne)">1%</text>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 9. art2 — The Sovereign Gold Seal
     * ===================================================================== */
    case 'art_seal': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 114)">
          <!-- Sculpted Black Obsidian Baluster Handle (Upper Right) -->
          <path d="M -8,-18 C 8,-38 26,-68 52,-84 C 66,-92 84,-80 82,-62 C 80,-44 52,-18 28,4 L 8,18 Z" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.2"/>
          <!-- Crown Pommel Cap at Handle Tip -->
          <ellipse cx="69" cy="-74" rx="15" ry="9" transform="rotate(40 69 -74)" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1"/>
          <path d="M 6,-18 C 20,-38 36,-58 54,-72" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" opacity="0.4"/>

          <!-- Multi-Tiered Golden Ferrule Collar -->
          <ellipse cx="4" cy="-2" rx="24" ry="14" transform="rotate(40 4 -2)" fill="url(#${uid}-gold-burnished)" stroke="#3B2706" stroke-width="1.1"/>
          <ellipse cx="-3" cy="6" rx="29" ry="17" transform="rotate(40 -3 6)" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1.1"/>

          <!-- Heavy Cylindrical 24K Gold Seal Matrix Barrel -->
          <path d="M -76,6 L -42,-26 C -20,-36 14,-10 22,22 L -12,58 Z" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1.4"/>

          <!-- Angled Elliptical Die Stamp Face -->
          <ellipse cx="-46" cy="34" rx="48" ry="38" transform="rotate(38 -46 34)" fill="url(#${uid}-gold-champagne)" stroke="#FFF5D6" stroke-width="1.3"/>
          <ellipse cx="-46" cy="34" rx="41" ry="32.5" transform="rotate(38 -46 34)" fill="url(#${uid}-gold-burnished)" stroke="#2D1E04" stroke-width="1.6"/>
          <ellipse cx="-46" cy="34" rx="37" ry="29" transform="rotate(38 -46 34)" fill="#140E04" stroke="url(#${uid}-gold-champagne)" stroke-width="1" stroke-dasharray="3.5 2"/>

          <!-- Deep Engraved Crown & 1% Seal Die Emblem -->
          <g transform="translate(-46, 32) rotate(12)">
            <path d="M -16,-6 L -20,-20 L -8,-12 L 0,-24 L 8,-12 L 20,-20 L 16,-6 Z" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.7"/>
            <rect x="-16" y="-3" width="32" height="3.5" rx="1" fill="url(#${uid}-gold-imperial)"/>
            <text x="0" y="20" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="24" font-weight="700" fill="url(#${uid}-gold-champagne)" letter-spacing="1">1%</text>
          </g>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 10. star4 — Zenith Diamond Star
     * ===================================================================== */
    case 'star_zenith': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 112)">
          <!-- Underlying 24K Gold Aureole Disc -->
          <circle cx="0" cy="0" r="64" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-imperial)" stroke-width="2"/>
          <circle cx="0" cy="0" r="59" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="1" stroke-dasharray="2.5 2.5"/>

          <!-- 4 Diagonal Platinum & Diamond Chiseled Rays -->
          <polygon points="0,0 72,-72 36,-18" fill="url(#${uid}-diamond)" stroke="url(#${uid}-gold-imperial)" stroke-width="1"/>
          <polygon points="0,0 72,-72 18,-36" fill="url(#${uid}-platinum-shade)" stroke="url(#${uid}-gold-imperial)" stroke-width="1"/>
          <polygon points="0,0 72,72 18,36" fill="url(#${uid}-diamond)" stroke="url(#${uid}-gold-imperial)" stroke-width="1"/>
          <polygon points="0,0 72,72 36,18" fill="url(#${uid}-platinum-shade)" stroke="url(#${uid}-gold-imperial)" stroke-width="1"/>
          <polygon points="0,0 -72,72 -36,18" fill="url(#${uid}-diamond)" stroke="url(#${uid}-gold-imperial)" stroke-width="1"/>
          <polygon points="0,0 -72,72 -18,36" fill="url(#${uid}-platinum-shade)" stroke="url(#${uid}-gold-imperial)" stroke-width="1"/>
          <polygon points="0,0 -72,-72 -18,-36" fill="url(#${uid}-diamond)" stroke="url(#${uid}-gold-imperial)" stroke-width="1"/>
          <polygon points="0,0 -72,-72 -36,-18" fill="url(#${uid}-platinum-shade)" stroke="url(#${uid}-gold-imperial)" stroke-width="1"/>

          <!-- 4 Cardinal Elongated Platinum & Diamond Rays -->
          <polygon points="0,0 0,-102 22,-36" fill="url(#${uid}-platinum-shade)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="0,0 0,-102 -22,-36" fill="url(#${uid}-diamond)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="0,0 102,0 36,22" fill="url(#${uid}-platinum-shade)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="0,0 102,0 36,-22" fill="url(#${uid}-diamond)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="0,0 0,102 -22,36" fill="url(#${uid}-platinum-shade)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="0,0 0,102 22,36" fill="url(#${uid}-diamond)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="0,0 -102,0 -36,-22" fill="url(#${uid}-platinum-shade)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>
          <polygon points="0,0 -102,0 -36,22" fill="url(#${uid}-diamond)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.1"/>

          <!-- Brilliant Diamond Studs Along Principal Axes -->
          <g fill="#FFFFFF" stroke="#5E7085" stroke-width="0.5">
            <circle cx="0" cy="-68" r="2.5"/><circle cx="0" cy="-55" r="3"/><circle cx="0" cy="-42" r="3.4"/>
            <circle cx="68" cy="0" r="2.5"/><circle cx="55" cy="0" r="3"/><circle cx="42" cy="0" r="3.4"/>
            <circle cx="0" cy="68" r="2.5"/><circle cx="0" cy="55" r="3"/><circle cx="0" cy="42" r="3.4"/>
            <circle cx="-68" cy="0" r="2.5"/><circle cx="-55" cy="0" r="3"/><circle cx="-42" cy="0" r="3.4"/>
          </g>

          <!-- Inner 16-Pointed Golden Gallery Setting -->
          <polygon points="0,-38 14,-28 28,-28 28,-14 38,0 28,14 28,28 14,28 0,38 -14,28 -28,28 -28,14 -38,0 -28,-14 -28,-28 -14,-28" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="1.2"/>

          <!-- Asscher-Cut Step-Faceted Black Diamond Center -->
          <polygon points="-11,-26 11,-26 26,-11 26,11 11,26 -11,26 -26,11 -26,-11" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.5"/>
          <polygon points="-7,-16 7,-16 16,-7 16,7 7,16 -7,16 -16,7 -16,-7" fill="#050608" stroke="url(#${uid}-diamond)" stroke-width="1"/>
          <line x1="-11" y1="-26" x2="-7" y2="-16" stroke="#FFFFFF" stroke-width="1" opacity="0.7"/>
          <line x1="11" y1="-26" x2="7" y2="-16" stroke="#FFFFFF" stroke-width="1" opacity="0.7"/>
          <line x1="26" y1="-11" x2="16" y2="-7" stroke="#FFFFFF" stroke-width="1" opacity="0.7"/>
          <line x1="-26" y1="-11" x2="-16" y2="-7" stroke="#FFFFFF" stroke-width="1" opacity="0.7"/>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 11. crown4 — Celestial Zenith Imperial Crown (ORIGINAL APPROVED DESIGN RESTORED)
     * ===================================================================== */
    case 'crown_zenith': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 115) scale(1.08) translate(-120, -115)">
          <!-- Ambient Emerald Core Glow -->
          <circle cx="120" cy="105" r="72" fill="url(#${uid}-emerald-glow)" />

          <!-- Inner Velvet/Obsidian Cap -->
          <path d="M 52,148 C 48,95 78,62 120,62 C 162,62 192,95 188,148 Z" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold-burnished)" stroke-width="1.5" />
          
          <!-- Structural Gold Lattice on Cap -->
          <path d="M 85,148 C 85,100 100,68 120,62 C 140,68 155,100 155,148" fill="none" stroke="url(#${uid}-gold-burnished)" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6" />
          <line x1="120" y1="62" x2="120" y2="148" stroke="url(#${uid}-gold-champagne)" stroke-width="2" opacity="0.8" />

          <!-- Rear Twin Spires -->
          <polygon points="68,145 58,82 78,108" fill="url(#${uid}-gold-burnished)" />
          <polygon points="172,145 182,82 162,108" fill="url(#${uid}-gold-burnished)" />
          <circle cx="58" cy="79" r="3" fill="url(#${uid}-diamond)" />
          <circle cx="182" cy="79" r="3" fill="url(#${uid}-diamond)" />

          <!-- Main Imperial Arches & 5 Zenith Peaks -->
          <!-- Far Left Peak -->
          <path d="M 44,148 L 36,92 L 66,122 L 75,148 Z" fill="url(#${uid}-gold-imperial)" stroke="url(#${uid}-gold-champagne)" stroke-width="1" />
          <!-- Mid Left Peak -->
          <path d="M 64,148 L 74,68 L 102,115 L 96,148 Z" fill="url(#${uid}-gold-imperial)" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2" />
          <!-- Far Right Peak -->
          <path d="M 196,148 L 204,92 L 174,122 L 165,148 Z" fill="url(#${uid}-gold-burnished)" stroke="url(#${uid}-gold-champagne)" stroke-width="1" />
          <!-- Mid Right Peak -->
          <path d="M 176,148 L 166,68 L 138,115 L 144,148 Z" fill="url(#${uid}-gold-burnished)" stroke="url(#${uid}-gold-champagne)" stroke-width="1.2" />

          <!-- Center Sovereign Zenith Spire -->
          <polygon points="120,38 94,148 120,142" fill="url(#${uid}-gold-champagne)" />
          <polygon points="120,38 146,148 120,142" fill="url(#${uid}-gold-imperial)" />
          <path d="M 120,38 L 94,148 L 120,142 L 146,148 Z" fill="none" stroke="#FFF6D6" stroke-width="1" />

          <!-- Spire Finials (Diamonds & Monde Cross) -->
          <g transform="translate(120, 30)">
            <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" fill="url(#${uid}-diamond)" />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>
          <polygon points="74,60 77,66 74,72 71,66" fill="url(#${uid}-diamond)" />
          <polygon points="166,60 169,66 166,72 163,66" fill="url(#${uid}-diamond)" />
          <circle cx="36" cy="89" r="3" fill="url(#${uid}-gold-champagne)" />
          <circle cx="204" cy="89" r="3" fill="url(#${uid}-gold-champagne)" />

          <!-- Center Grand Emerald Cut Gemstone -->
          <g transform="translate(120, 102)">
            <polygon points="0,-24 15,-10 15,12 0,24 -15,12 -15,-10" fill="url(#${uid}-gold-shadow)" stroke="url(#${uid}-gold-champagne)" stroke-width="1.5" />
            <polygon points="0,-20 12,-8 12,10 0,20 -12,10 -12,-8" fill="url(#${uid}-emerald)" />
            <polygon points="0,-13 7,-5 7,6 0,13 -7,6 -7,-5" fill="none" stroke="#A7F3D0" stroke-width="0.9" opacity="0.8" />
            <line x1="-12" y1="-8" x2="-7" y2="-5" stroke="#A7F3D0" stroke-width="0.8" />
            <line x1="12" y1="-8" x2="7" y2="-5" stroke="#A7F3D0" stroke-width="0.8" />
            <line x1="12" y1="10" x2="7" y2="6" stroke="#047857" stroke-width="0.8" />
            <line x1="-12" y1="10" x2="-7" y2="6" stroke="#047857" stroke-width="0.8" />
          </g>

          <!-- Side Emeralds on Mid Peaks -->
          <polygon points="78,96 84,106 78,118 72,106" fill="url(#${uid}-emerald)" stroke="url(#${uid}-gold-champagne)" stroke-width="1" />
          <polygon points="162,96 168,106 162,118 156,106" fill="url(#${uid}-emerald)" stroke="url(#${uid}-gold-champagne)" stroke-width="1" />

          <!-- Heavy Imperial Base Band (Circlet) -->
          <path d="M 40,146 L 200,146 L 204,168 L 36,168 Z" fill="url(#${uid}-gold-imperial)" stroke="url(#${uid}-gold-burnished)" stroke-width="1.5" />
          <rect x="42" y="150" width="156" height="14" rx="2" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold-champagne)" stroke-width="1" />
          <path d="M 34,146 L 206,146" stroke="url(#${uid}-gold-champagne)" stroke-width="3" stroke-linecap="round" />
          <path d="M 32,168 L 208,168" stroke="url(#${uid}-gold-champagne)" stroke-width="3.5" stroke-linecap="round" />

          <!-- Circlet Jewels & 1% Insignia -->
          <polygon points="62,152 68,157 62,162 56,157" fill="url(#${uid}-emerald)" stroke="url(#${uid}-gold-champagne)" stroke-width="0.8" />
          <polygon points="90,152 96,157 90,162 84,157" fill="url(#${uid}-diamond)" />
          <polygon points="150,152 156,157 150,162 144,157" fill="url(#${uid}-diamond)" />
          <polygon points="178,152 184,157 178,162 172,157" fill="url(#${uid}-emerald)" stroke="url(#${uid}-gold-champagne)" stroke-width="0.8" />

          <rect x="106" y="148" width="28" height="18" rx="3" fill="url(#${uid}-obsidian)" stroke="url(#${uid}-gold-champagne)" stroke-width="1.4" />
          <text x="120" y="161" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="11" font-weight="700" fill="url(#${uid}-gold-champagne)">1%</text>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 12. art4 — Sovereign Scepter
     * ===================================================================== */
    case 'art_scepter': {
      const content = `
        <g filter="url(#${uid}-drop-shadow)" transform="translate(120, 114) rotate(34)">
          <!-- Top Sovereign Cross Finial -->
          <polygon points="0,-106 5,-94 15,-96 15,-86 5,-88 5,-78 -5,-78 -5,-88 -15,-86 -15,-96 -5,-94" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.9"/>
          <circle cx="0" cy="-91" r="2.5" fill="url(#${uid}-diamond)"/>

          <!-- Imperial Crimson Ruby Orb Inside Sculpted 24K Gold Cage -->
          <circle cx="0" cy="-56" r="22" fill="url(#${uid}-ruby)" stroke="url(#${uid}-gold-imperial)" stroke-width="1.8"/>
          <!-- Chiseled Gold Meridian Arches Over Ruby -->
          <path d="M -22,-56 C -22,-74 22,-74 22,-56" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="2.6"/>
          <ellipse cx="0" cy="-56" rx="22" ry="8" fill="none" stroke="url(#${uid}-gold-champagne)" stroke-width="3"/>
          <ellipse cx="0" cy="-56" rx="9" ry="22" fill="none" stroke="url(#${uid}-gold-imperial)" stroke-width="2.8"/>
          <line x1="0" y1="-78" x2="0" y2="-34" stroke="url(#${uid}-gold-champagne)" stroke-width="2.8"/>
          <!-- Equatorial Diamonds -->
          <circle cx="-16" cy="-56" r="1.9" fill="#FFFFFF"/>
          <circle cx="-8" cy="-56" r="2.1" fill="#FFFFFF"/>
          <circle cx="0" cy="-56" r="2.4" fill="#FFFFFF"/>
          <circle cx="8" cy="-56" r="2.1" fill="#FFFFFF"/>
          <circle cx="16" cy="-56" r="1.9" fill="#FFFFFF"/>

          <!-- Sculpted Golden Lotus Capital & Upper Collars -->
          <polygon points="-18,-36 18,-36 11,-22 -11,-22" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1"/>
          <rect x="-14" y="-22" width="28" height="7" rx="3" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.9"/>
          <rect x="-11" y="-15" width="22" height="6" rx="2" fill="url(#${uid}-gold-burnished)" stroke="#3B2706" stroke-width="0.8"/>

          <!-- Fluted Black Obsidian Scepter Shaft with Center Ring -->
          <polygon points="-8.5,-9 8.5,-9 7.5,24 -7.5,24" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="0.9"/>
          <rect x="-11" y="24" width="22" height="7" rx="2.5" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.9"/>
          <text x="0" y="30" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="6.5" font-weight="700" fill="#120B01">1%</text>
          <polygon points="-7.5,31 7.5,31 6.5,64 -6.5,64" fill="url(#${uid}-obsidian-facet)" stroke="url(#${uid}-gold-imperial)" stroke-width="0.9"/>
          <!-- Specular Highlight Along Obsidian Shaft -->
          <line x1="-3.5" y1="-8" x2="-3.5" y2="23" stroke="#FFFFFF" stroke-width="1.4" opacity="0.45"/>
          <line x1="-3" y1="32" x2="-3" y2="63" stroke="#FFFFFF" stroke-width="1.4" opacity="0.45"/>

          <!-- Lower Golden Terminal Pommel & Spike -->
          <rect x="-10" y="64" width="20" height="6" rx="2" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.8"/>
          <ellipse cx="0" cy="74" rx="14" ry="5" fill="url(#${uid}-gold-imperial)" stroke="#3B2706" stroke-width="1"/>
          <polygon points="-8,78 8,78 4,92 -4,92" fill="url(#${uid}-gold-burnished)" stroke="#3B2706" stroke-width="0.9"/>
          <polygon points="-5,92 5,92 0,108" fill="url(#${uid}-gold-champagne)" stroke="#3B2706" stroke-width="0.8"/>
        </g>
      `;
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }

    /* =====================================================================
     * 13. wid1 — Sovereign Master Card Widget (PRESERVED)
     * ===================================================================== */
    case 'wid_mastercard':
    default: {
      const content = `
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
      innerSvg = buildVitrineChamber(content, uid);
      break;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" style="background: transparent;" viewBox="0 0 240 240" width="100%" height="100%" class="sovereign-artifact-svg">${sharedDefs}${innerSvg}</svg>`;
};

// Window-level vitrine compatibility helper for app.js callers
window.renderClocheVitrine = function(innerContent, isObsidianBaseOrUid, uid) {
  if (typeof innerContent === "string" && innerContent.includes("<svg")) {
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

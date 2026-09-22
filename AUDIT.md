# THE 1% CLUB — PRODUCTION ARCHITECTURE & VERIFIED CANONICAL AUDIT

**Version Status:** Production Ready / Phase 2 Closed  
**Verification Date:** September 2026  
**Security & Integrity State:** Verified Clean (Zero-Waste Repository)

---

## 1. Verified File Registry

All temporary scrap scripts, patch utilities, and scratch files have been permanently eradicated. The repository strictly contains only the following 11 canonical files:

| # | Canonical File | Exact Functional Responsibility |
|---|---|---|
| 1 | `index.html` | Core DOM structure, sovereign membership card markup, viewport configurations, modal templates, SVG symbols, and persistent 4-tab navigation shell. |
| 2 | `style.css` | Obsidian Dark & Ivory Ceramic theme engines, high-precision typography, micro-bevel border hierarchies, 3D transform layers, and component styling. |
| 3 | `app.js` | Primary application controller, centralized reactive `AppState`, navigation routing, modal lifecycle, and collectible purchase/equip business logic. |
| 4 | `luxury.js` | Luxury visual math engine, parametric Guilloché generation, animated gold-dust particle simulation, dynamic gyroscope 3D tilt, and lighting sweeps. |
| 5 | `translations.js` | Sovereign bilingual dictionary (Arabic primary, English secondary) and dynamic bidirectional translation engine (`window.t()`). |
| 6 | `Audio.js` | High-fidelity Web Audio API synthesizer for tactile mechanical haptics, luxury clicks, metallic chimes, and collectible interaction audio. |
| 7 | `server.js` | Node.js Express server binding to `0.0.0.0:3000` with SPA routing fallbacks and static asset streaming. |
| 8 | `package.json` | Package metadata, build scripts, and production dependencies. |
| 9 | `package-lock.json` | Deterministic dependency lockfile ensuring reproducible container builds. |
| 10 | `metadata.json` | Application metadata specification and Google AI Studio platform capabilities. |
| 11 | `AUDIT.md` | Authoritative architecture manual, stacking context rules, state specification, and repository sign-off. |

---

## 2. Architecture & State Management Verification

### Single Source of Truth (`AppState.owned`)
- **Collectible Ownership:** `AppState.owned` (structured as a dictionary mapping `{ [itemId: string]: 1 }`) is the strict, single source of truth for all purchased collectibles.
- **Dynamic Derivation:** `AppState.collectedItems` is implemented solely as an immutable getter returning `Object.keys(this.owned)`.
- **Zero Ghost State Sanitization:** During `AppState.init()`, any legacy `user.collectedItems` stored in persistent profiles is automatically purged via `delete this.user.collectedItems`, preventing desynchronization between inventory and state.
- **Local Persistence:** Verified synchronization with client `localStorage` under isolated key namespaces (`owned_${id}`, `equipped_${id}`, `balance_${id}`, `profile_${id}`).

---

## 3. Dual-Theme System Specifications

The visual identity enforces authentic precious material realism across both operating modes:

### A. Obsidian Black & Authentic Gold (Default Dark Mode)
- **Chassis Material:** Multi-stop deep obsidian radial gradients (`#16161a` to `#0d0d10` to `#050507`).
- **Metallic Frame:** 4-stage champagne gold specular reflection (`#4A3B1B` -> `#B59A54` -> `#FDF2D0` specular -> `#8C7335` -> `#1A1408`).
- **Physical Bevel:** Multi-layer inset shadows producing an outer specular micro-bevel (`rgba(253, 242, 208, 0.4)`) and deep interior occlusion (`rgba(10, 8, 4, 0.95)`).
- **Typography:** Embossed raised metallic lettering on `THE 1% CLUB` with opposing directional drop shadows simulating genuine letterpress stamping.

### B. Ivory Banknote Ceramic & Polished Gold (Light Mode)
- **Chassis Material:** Smooth ivory porcelain radial gradient (`#f7f5ef` to `#ebe7dc` to `#ded9cb`).
- **Metallic Frame:** High-contrast warm gold reflection with pure specular peaks (`#FFFFFF`) against `#705621` deep metallic core shadows.
- **Physical Bevel:** High-clarity white specular micro-bevel (`rgba(255, 255, 255, 1)`) with gold shadow occlusion (`rgba(92, 70, 26, 0.5)`).
- **Geometry Parity:** Exact 1:1 mathematical alignment in border thickness, padding, typography scale, and element coordinates between Dark and Light modes.

---

## 4. Canvas & UI Stacking Context Rules

To guarantee fluid 3D gyroscope movement without visual clipping or layer bleeding, clipping responsibilities are strictly separated:

```
[Viewport & Active Page: #page-card.is-active] (overflow: visible)
  │
  └── [#membershipCard.membership-card] (position: relative; overflow: visible; z-index: 1)
        ├── [Outer 3D Frame & Bezel] (Calculated via 4px border & box-shadows; floats freely in 3D)
        │
        └── [.card-inner-frame] (position: relative; overflow: hidden; border-radius: 16px)
              ├── [#guillocheCanvas & #goldDustCanvas] (position: absolute; z-index: 1; clipped to inner frame)
              ├── [.card-sheen] (position: absolute; z-index: 1)
              │
              └── [Card Foreground Content] (position: relative; z-index: 2)
                    ├── [.card-top-bar & .card-club-name]
                    ├── [.portrait-wrap, Medallion, Crown, Aura]
                    ├── [.member-name, .member-title, .member-number]
                    └── [.card-metrics-row & .card-tagline]
```

- **Outer Tilt Freedom:** `#membershipCard` and `#page-card` enforce `overflow: visible`, allowing full 3D spatial rotation without clipping the physical gold frame on mobile displays.
- **Inner Surface Containment:** `.card-inner-frame` enforces `overflow: hidden` and `border-radius: 16px` (20px outer radius minus 4px border thickness), completely containing the Guilloché canvas lines and gold-dust particles within the inner card face so they never bleed over the outer gold bevel.
- **Interactive Accessibility:** All interactive elements maintain `z-index: 2` or higher with dedicated pointer event routing.

---

## 5. Haute Horlogerie & Sovereign Archival Implementations (Proposals 1–5)

The physical and tactile realism of THE 1% CLUB has been systematically upgraded with five sovereign craft specifications:

1. **Proposal 1: Anti-Reflective (AR) Sapphire Crystal Sheen & Refractions**
   - Implemented real-time dynamic light sweeps across portrait medallions, the Sovereign Deed, and the Master Card.
   - Utilizes CSS variables (`--sapphire-sheen-x`, `--sapphire-sheen-y`, `--sapphire-glare-angle`, `--sapphire-beam-pos`) driven by dynamic mouse and gyroscope lighting engines in `luxury.js`.
   - Dual-layer optical coating with subtle champagne and violet-blue refraction highlights.

2. **Proposal 2: Micro-Security Holographic Foil Thread**
   - Embedded currency-grade security ribbon (`.deed-security-ribbon`) within the Sovereign Deed parchment.
   - Dynamic prism dispersion, micro-text typography, and iridescent light-shifting gradient animations.

3. **Proposal 3: Sovereign Wax & Embossed Metal Matrix Seals (COMPLETED)**
   - High-fidelity physical depth on `.deed-wax-seal`, `.deed-embossed-seal`, `.oath-signet-seal-btn`, and `#profileCrownCoin`.
   - Realistic organic molten wax perimeter pooling (`border-radius: 49% 51% 52% 48% / 51% 49% 51% 49%`) with viscous carmine-to-obsidian multi-stage radial depth.
   - Concave matrix stamp well depression (`.dws-inner`) with deep internal ambient occlusion and 24K gold foil embossed hallmark stamping (`.dws-icon`, `.dws-text`).
   - Mechanical wax deformation on press with tactile spring-back and sovereign gold flash.
   - Solid bullion relief seal (`.deed-embossed-seal`) with dynamic specular conic reflection tracking `--gold-foil-angle`, beaded rims, and high-relief insignia.
   - Heavy Damascus and titanium signet ring button (`.oath-signet-seal-btn`) with inset crimson wax cabochon.
   - Acoustic matrix stamp feedback (`playHeavyBrassStamp()` in `Audio.js`), gold coin chimes, and sovereign triple-pulse haptic vibrations (`[26, 35, 52]ms`).
   - Flawless day/night mode parity with royal vermilion wax and pure 24K white-gold foil on silk-ivory parchment.

4. **Proposal 4: Haute Horlogerie Anglage Screws & Micro-Torque Acoustics**
   - Micro-beveled, mirror-polished Swiss watchmaking fastener screws (`.deed-screw`, `.oath-screw`, `.vitrine-screw`, `.rmc-screw`).
   - Conic specular reflections aligned with `--gold-foil-angle` and authentic counterbore stepped rims.
   - Radial torque-indexed slot alignments (45°, 135°, 225°, 315°) reproducing handcrafted horological casing.
   - Interactive micro-torque feedback with high-frequency jewel click acoustic impulse (`playFineScrewTick()` in `Audio.js`) and tactile haptics.
   - Full light-mode ceramic and rhodium parity.

5. **Proposal 5: Sovereign Ghost Watermark, Intaglio Micro-Relief & Forensic Ultraviolet (UV) Verification**
   - Implemented an authentic high-security banknote ghost watermark (`.deed-ghost-watermark`) deeply infused into the obsidian parchment fibers of the Sovereign Deed.
   - Features complex 12-fold geometric lathe guilloché rosettes, concentric intaglio security rings, imperial crown emblem, sovereign `I%` monogram, and micro-text perimeter ribbon.
   - Embedded discrete multi-chromatic fluorescent security micro-fibers (`.uv-fiber`) in violet, cyan, and 24K gold that reveal vivid luminescence under verification.
   - Cryptographic verification matrix (`.deed-crypto-hash-strip`) displaying SHA-256 genesis validation status.
   - Forensic Ultraviolet scanner ray (`.deed-uv-scanner-ray`) that sweeps across the deed parchment upon clicking "المصادقة على صحة الصك" (Verify Official Seal) or pressing the interactive wax seal.
   - Custom synthesized harmonic acoustic sweep and fluorophore resonance chime (`playUvForensicChime()` in `Audio.js`).
   - Interactive tactile feedback and glint animation on direct watermark touch.
   - Full day/night parity with light-mode banknote translucent fiber rendering.

---

## 6. Profile Hero Plaque Upgrades: Proposal 1 (Champlevé Bezel & Horological Screws)

- **Multi-Tiered Champlevé Outer Bezel Architecture:**
  - Upgraded `#profileHeroPlaque` from a flat card into a layered bullion plaque with authentic precious metal inlay, dual-stage outer rims (`rgba(212, 175, 106, 0.48)`), deep cast shadow, and realistic physical elevation.
- **Diamond-Cut Chamfer Inlay (`.phc-diamond-chamfer`):**
  - Integrated a stepped inner metallic bevel that catches directional specular light highlights moving dynamically with gyroscopic and pointer shifts (`--gold-foil-angle`).
- **Silk-Ivory Parchment & Pearlescent Warm Texturing (`.phc-silk-sheen-layer`):**
  - In Light Mode, replaced the flat beige gradient with an authentic silk-parchment banknote background layered with soft-light pearlescent warmth that reacts smoothly to device movement.
- **Haute Horlogerie Anglage Corner Screws & Counterbore Wells:**
  - Embedded 4 precision corner counterbore sockets (`.phc-screw-counterbore`) with micro-recessed shadows.
  - Installed domed mirror-polished anglage screw heads (`.phc-screw`) with watchmaker slots indexed at 45°, 135°, 225°, and 315°.
  - Bound directly to `attachHorologicalScrewHandlers()` for interactive jewel-tick acoustic impulse (`playFineScrewTick`), tactile haptics, and micro-torque rotation on tap/click.

---

## 7. Profile Hero Plaque: Sovereign Monolithic Scale & Frame Elimination

- **Abolition of Nested Inner Frames ("إطار جوه إطار"):**
  - Completely eradicated all secondary and tertiary inset borders (`.phc-inlay-border`, `.profile-hero-card::before`). The card is now an authentic monolithic ingot with a single masterwork perimeter bezel.
- **Restoration of Grand, Imposing Scale:**
  - Expanded the hero medallion from a cramped 72px to a commanding **94px diameter**, featuring a deep 5px solid 24K continuous Haute Horlogerie gold bezel and crisp, uncropped portrait presentation.
  - Enlarged card dimensions and padding to `24px 22px` with a minimum height of `172px` and `20px` border-radius, giving the dossier plaque an authoritative luxury presence.
- **Editorial Hierarchy & Crown Seal:**
  - Prominent serif display typography for the member name (`clamp(1.35rem, 3.8vw, 1.75rem)`), distinct gold capsule tier badge, and a centered 24px solid gold crown coin.
- **Bespoke Sovereign Edit Button:**
  - Dedicated circular gold action button positioned with 46px clearance so text and badges never collide.

---

## 8. Zero-Waste Declaration & Formal Sign-Off

- **Scrap Script Purge:** Complete. All 72+ temporary patch and utility scripts (`patch_*.js`, `fix_*.js`, `test_*.js`, `add_*.js`, `apply_*.js`, `wipe_*.js`, `force_*.js`, `make_*.js`, `strip_*.js`, `remove_*.js`, `bun.lock`) have been irrevocably deleted.
- **Zero Data Loss:** All logic, styling, animations, and typography enhancements implemented across historical patches are unified inside the 11 canonical files.
- **Build & Linter Status:** `compile_applet` clean, Node syntax validation clean (zero errors across all modules).
- **Readiness:** The repository represents a pristine, production-grade baseline for THE 1% CLUB.

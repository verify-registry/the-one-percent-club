# AUDIT.md — THE 1% CLUB: MASTER ARCHITECTURAL BLUEPRINT

<!--
  ═════════════════════════════════════════════════════════════════════════════╗
  ║  CRITICAL: DO NOT DELETE THIS FILE                                        ║
  ║  This file is the DEFINITIVE Master Architectural Blueprint and           ║
  ║  implementation map for THE 1% CLUB.                                      ║
  ║  Any developer or AI coding agent working on this repository must consult  ║
  ║  and uphold the guardrails, registries, and patterns defined herein.      ║
  ╚═════════════════════════════════════════════════════════════════════════════╝
-->

---

## 1. PROJECT OVERVIEW & VISUAL IDENTITY

### 1.1 The Product Brief
THE 1% CLUB is a fictional, satirical, ultra-exclusive digital private social club conceived for the sovereign elite. It is **not** a fintech app, crypto exchange, banking portal, video-game inventory, or generic SaaS dashboard. It functions as a digital luxury institution, crafted with the restraint, precision, and material realism of haute horlogerie, sovereign state credentials, and fine jewelry guilds.

- **Brand:** `THE 1% CLUB`
- **Motto / Tagline:** `PRIVATE WEALTH. PRIVATE SOCIETY.`
- **Primary Viewport:** Mobile-first responsive application, optimized for modern high-DPI viewports: `360×800`, `375×812`, `390×844`, `412×915`, and `430×932`.
- **Localization Architecture:** English-Only (LTR). The application runs with `<html lang="en" dir="ltr">`, ensuring consistent editorial typography, typographic balance, and luxury magazine hierarchy.

### 1.2 The Obsidian & 24K Molten Gold Aesthetic
The design system derives its luxury strictly from craftsmanship, material depth, and controlled lighting:
- **Base Surfaces:** Deep Obsidian Black (`#08080a`, `#0e0d10`, `#141217`), brushed titanium, and warm antique bronze undertones.
- **Precious Metals:** Multi-layered 24K Molten Gold, Polished Champagne Gold, and Antique Gold gradients (`#FFFDF2`, `#FDE895`, `#E2AE33`, `#C58F20`, `#231604`) designed to mimic physical metal with specular highlights and shadow bevels.
- **Glassmorphism:** VisionOS-inspired Liquid Glass layers with optical backdrop blur (`blur(20px)` to `blur(24px)`), gradient edge bevels, and subtle saturation enhancements.
- **Strict Anti-Patterns:** Strictly zero neon colors, no cheap cartoon yellow gradients, no gaming power-ups, no generic card bloat, and no intrusive popups.

---

## 2. CLEAN FILE & DIRECTORY MAP

The repository follows a clean, decoupled full-stack architecture where frontend presentation, canvas physics, vector graphics, acoustic feedback, and server APIs reside in dedicated files:

```
├── .env.example                 # Documented environment variable definitions (no secrets)
├── .gitignore                   # Standard git exclusions (node_modules, build artifacts)
├── AUDIT.md                     # Master Architectural Blueprint (this file)
├── Audio.js                     # Synthesized WebAudio horological sound engine
├── README.md                    # Repository documentation and orientation
├── app.js                       # Core application state, tabs, commerce & club engine
├── artifacts.js                 # Pure inline SVG vector catalog for all collectibles
├── firebase-applet-config.json  # Provisioned AI Studio Firebase Firestore & Auth client config
├── firebase-blueprint.json      # Firestore schemas, collections, and security specifications
├── firestore.rules              # Deployed Firestore security and authorization rules
├── index.html                   # Master single-page HTML entry point & SVG gradient defs
├── luxury.js                    # Haute horlogerie canvas physics engine for Master Card
├── metadata.json                # AI Studio platform capabilities and metadata
├── package.json                 # Project dependencies, scripts (dev, start, build, lint)
├── server.ts                    # Production Express server (Gzip, market proxy, SPA routing)
├── src/
│   └── main.tsx                 # Non-intrusive TypeScript shield entry point
├── style.css                    # Unified master stylesheet (Liquid Glass, dock, modals)
├── translations.js              # Standardized English localization dictionary
├── tsconfig.json                # TypeScript compiler configuration (ES2022, bundler)
└── vite.config.ts               # Vite configuration for AI Studio dev server (port 3000)
```

### Exact File Roles

| File | Exact Architectural Role |
|---|---|
| `index.html` | HTML entry point. Hosts all semantic tab containers (`#membership-tab`, `#club-tab`, `#profile-tab`, `#boutique-tab`), modal overlays (Settings, Account, Support, Dossier, Inspection, Auth, Recovery), and global SVG gradient definitions (`#ringGoldGrad`, `#bezelGrad`, `#sov_gold_24k`). Zero inline `<style>` tags. |
| `style.css` | Consolidated master stylesheet. Contains the seamless Liquid Glass header, VisionOS crystal bottom dock, typography hierarchy, responsive breakpoints (360px–430px), modal card systems, and Dark/Light mode color schemes. |
| `app.js` | Primary application logic controller. Manages reactive state (`AppState`), boutique commerce and vault persistence, club chat with room switching and daily message reserves, live market ticker client consumption, metric ring complications (Wealth Index and Privileges Index with D3), and authentication state (`AuthBoundary`). |
| `luxury.js` | Mathematical canvas rendering engine for the Master Identity Card. Computes layered guilloché geometry, dynamic gold dust particle dynamics, specular metallic sheen passes, and high-DPI card image exports. |
| `artifacts.js` | Vector asset registry (`window.SOVEREIGN_ARTIFACTS`). Stores 100% pure inline SVG vector blueprints for all 12 boutique collectibles and widgets. No raster image URLs. |
| `translations.js` | English dictionary (`window.TRANSLATIONS.en`) and localization helper `window.t(key)`. |
| `Audio.js` | WebAudio synthesized horological acoustic engine (`window.AudioEngine`). Synthesizes physical mechanical clicks, minute-repeater chimes, and transaction success sounds directly from oscillators with zero audio file downloads. |
| `server.ts` | Full-stack Node.js 22 + Express server. Handles gzip compression middleware, immutable static file caching, SPA fallback to `index.html`, and the server-side `/api/market-ticker` proxy with 60-second caching for Twelve Data + Biquote spot prices. |
| `src/main.tsx` | Passthrough shield entry point ensuring platform compatibility with TypeScript build and lint tooling without overriding the native HTML/CSS/JS runtime. |

---

## 3. UI & NAVIGATION ARCHITECTURE

There are **EXACTLY 4 main navigation tabs**:
1. **Membership (`#membership-tab`)**
2. **Club (`#club-tab`)**
3. **Profile (`#profile-tab`)**
4. **Boutique (`#boutique-tab`)**

*(Note: There is no Vault tab, no More tab, and no external primary tabs. Collectibles and vault archives remain integrated inside Profile).*

```
┌─────────────────────────────────────────────────────────────┐
│  [appHeader]  FIXED SEAMLESS LIQUID GLASS HEADER (84px)     │
│   Crown Finial · THE 1% CLUB · "PRIVATE WEALTH ◆ SOCIETY"   │
│   [Verified Shield Button]                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ACTIVE TAB VIEWPORT (One of 4 Primary Views):              │
│                                                             │
│  [1. Membership]  [2. Club]      [3. Profile]  [4. Boutique]│
│  • Master Card    • Chamber      • Dossier     • Vitrine    │
│  • Photo Medallion• Ticker       • Hero Plaque • 12 Artifacts
│  • Wealth Complic.• 5 Salons     • Exhibits    • Purchases  │
│  • Priv. Complic. • Dispatches   • Settings Row• Details    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  [bottom-nav] FLOATING VISIONOS CRYSTAL DOCK (64px)         │
│   [Membership]       [Club]       [Profile]      [Boutique] │
│      (👑)             (🏛️)           (👤)           (💎)    │
│   24K Gold Pill on Active Tab · Safe Area Pinned Bottom     │
└─────────────────────────────────────────────────────────────┘
```

### 3.1 Top Fixed Seamless Liquid Glass Header (`#appHeader` / `.app-header`)
- **Structure:** Absolute/fixed positioning, stationing the header at `top: 0` with an exact height of `84px` plus safe-area top padding (`env(safe-area-inset-top)`).
- **Glass Optics:** `backdrop-filter: blur(24px) saturate(190%) contrast(108%)`, masked with a vertical linear gradient so the glass seamlessly dissolves downward into page content without a harsh dividing line.
- **Centerpiece:** Centered geometric lockup with Haute Horlogerie 3D Crown SVG (`.brand-crown`), serif brand wordmark "THE 1% CLUB" (`Cinzel`), and diamond-separated tagline "PRIVATE WEALTH ◆ PRIVATE SOCIETY".
- **Right Seal:** High-relief Sovereign Verification Seal (`#headerVerifiedShieldBtn`) with 24K chiseled bevel and checkmark.

### 3.2 Bottom VisionOS Floating Crystal Dock (`.bottom-nav`)
- **Structure:** Pinned to screen bottom with `position: fixed; bottom: 0; z-index: 100;` and safe-area inset bottom compensation.
- **Glass Treatment:** Obsidian Champagne liquid glass gradient, `backdrop-filter: blur(20px) saturate(180%)`, and seamless vertical dissolve mask.
- **Active Navigation Pill:** Active tab item receives a 24K polished gold highlight (`#d4af6a`), micro-lift (`translateY(-2px)`), drop-shadow luster, and bold label styling.
- **Keyboard Resilience:** Smooth translate transition (`translate3d(0, 105%, 0)`) when the mobile software keyboard is active, keeping the Club message composer unobscured.

### 3.3 The 4 Primary Tabs

#### 1. Membership Tab (`#membership-tab`) — Sovereign Identity
- **The Master Card:** The central visual artifact of the entire product. A physical obsidian slab with multi-layered gold borders, four precision corner brackets, guilloché engine-turned canvas, and gold particle physics.
- **Hero Portrait Medallion:** Precision circular watch-bezel with minute ticks (`#bezelTicks`), customizable avatar upload (`#photoUploadBtn`), and equipped aura/crown slots.
- **Complications:** Twin horological complications flanking the Living Core star:
  - **Wealth Index Complication (`#wealthRingWrap`):** Interactive dial (base 60.0% + economic collectible valuation).
  - **Privileges Index Complication (`#privRingWrap`):** Interactive dial (base 60.0% + tier standing & collectible rarity).
- **Public Sharing:** Public Share Card modal (`#shareModal`) renders verified public identity credentials without exposing private balance data.

#### 2. Club Tab (`#club-tab`) — Private Society
- **Sovereign Salon Ticker:** Live financial ticker displaying precious metals (`XAU/USD`, `XAG/USD`, `XPT/USD`, `XPD/USD`), energy (`UKOIL`, `USOIL`), stock indices (`US500`, `USTEC`, `US30`), and forex (`EUR/USD`, `GBP/USD`, `USD/CHF`).
- **Private Chambers:** 5 curated salons:
  1. *General Lounge* (Council deliberations and introductions)
  2. *Wealth & Capital* (Allocation, private equity, and real assets)
  3. *Global Relocations* (Monaco, Geneva, Zurich, Dubai passports)
  4. *Private Aviation* (Fleet charters and nautical berths)
  5. *Sovereign Tech* (AI architectures and cryptography)
- **Dispatches & Accolades:** Threaded member dispatches with high-status accolades:
  - *Endorse* (Sovereign Endorsement Seal)
  - *Concord* (Ring of Concord & Honor)
  - *Toast* (Prestige Toast of Excellence)
- **Message Reserves:** Daily allowance of sovereign message credits with intuitive reserve top-up options.

#### 3. Profile Tab (`#profile-tab`) — Digital Identity Dossier
- **Profile Hero Plaque (`#profileHeroPlaque`):** Obsidian and gold identification plaque displaying member portrait, rank title, accredited cities, and motto.
- **Sovereign Domains & Circles:** Verified domain chips (Finance, Horology, Diplomacy, Aviation, Art).
- **Conservatory Reliquary (Vault Exhibits):** Displays all acquired boutique artifacts preserved with immutable accession numbers, metallurgy certificates, and provenance details.
- **Profile Menu List:** Dedicated rows for Account Credentials (`#openAccountInfoRow`), Sovereign Concierge (`#openHelpSupportRow`), and System Settings (`#openSettingsRow`).

#### 4. Boutique Tab (`#boutique-tab`) — Luxury Collection
- **The Haute Vitrine:** Clean showcase of high-jewelry pieces and sovereign artifacts arranged by category filters: All, Crowns, Jewelry, Auras, Stars, Rare Artifacts, and Widgets.
- **Economic Mechanics:** Real-time purchasing power calculation against member liquid balance (`$50,000` starting allowance).
- **Inspection Modal:** Interactive artifact examination displaying alloy metallurgy, sovereign standard weight, lore provenance, and one-tap Equip / Vault action.

### 3.4 System Settings Modal (`#settingsModal`)
Triggered via `#openSettingsRow` in the Profile menu list (and secondary button `#openSettingsBtn`):
- Pinned top-left modal close button (`#closeSettingsModal`).
- **Tactile Switches:**
  1. **Theme Mode (`#themeToggle`):** Toggles between Obsidian Dark and Imperial Light with instant CSS variable updates.
  2. **Private Notifications (`#vipNotifToggle`):** Controls exclusive club push toasts.
  3. **Horological Soundscape (`#soundscapeToggle`):** Toggles synthesized WebAudio acoustic feedback.
  4. **Tactile Haptics (`#audioHapticToggle`):** Enables/disables vibration impulses on supported devices.
  5. **Gyroscope 3D Tilt (`#gyroscopeToggle`):** Controls physical parallax card tilt response.
  6. **Stealth Mode (`#stealthModeToggle`):** Conceals public registry ID in public dispatches.
- **Reset to Defaults (`#btnResetSettings`):** One-tap restoration of sovereign default preferences.
- **Session Logout (`#btnSettingsLogout`):** Securely opens confirmation modal to clear session and return to Auth Gate.

---

## 4. BOUTIQUE & COLLECTIBLES REGISTRY

All 12 boutique collectibles and the Master Card Widget are rendered using **100% pure inline SVG vector code** stored in `artifacts.js`. Zero external image files or placeholder PNGs.

| ID | Artifact Name | Category | Required Tier | Price (USD) | Specification & Metallurgy |
|---|---|---|---|---|---|
| `star1` | Sovereign Star of Genesis | `stars` | Sovereign Member | **$1,000** | 8-Point Beveled 24k Gold Ingot (18g) |
| `aura1` | Radiance of Concord | `auras` | Sovereign Member | **$1,500** | Engine-Turned Champagne Luster |
| `ring1` | Sovereign Monogram Signet | `jewelry` | Sovereign Member | **$2,000** | Solid 18k Yellow Gold (28g Fine) |
| `crown1` | Imperial Obsidian Diadem | `crowns` | Sovereign Member | **$2,500** | Blackened Titanium & 24k Gold (142g Solid) |
| `ring2` | Black Onyx Signet Ring | `jewelry` | Sovereign Member | **$3,000** | Brazilian Onyx & Fluted Gold (34g Fine) |
| `art1` | Skeletonized Tourbillon | `artifacts` | Sovereign Member | **$4,000** | Skeletonized 18k Rose Gold Case (128g Horology) |
| `ring3` | Emerald Falcon Sovereign Ring | `jewelry` | Sovereign Luminary | **$5,000** | Hand-Carved Gold & Octagonal Emerald (42g Solid) |
| `aura4` | Celestial Singularity Corona | `auras` | Sovereign Exarch | **$6,000** | Golden Stardust & Dual Ion Rings (Atmospheric) |
| `art2` | Imperial Chancellery Seal | `artifacts` | Sovereign Luminary | **$7,500** | Solid Cast Brass & Black Obsidian (380g Desk Artifact) |
| `star4` | Zenith Octagram of Sovereign Apex | `stars` | Sovereign Exarch | **$8,000** | Faceted Platinum & Champagne Accents (45g Ingot) |
| `crown4` | Crown of Zenith Authority | `crowns` | Sovereign Exarch | **$9,000** | Chiseled 24k Gold & Colombian Emeralds (290g Sovereign) |
| `art4` | Sovereign Scepter of Sovereignty | `artifacts` | Sovereign Exarch | **$10,000** | Obsidian Shaft & 24k Gold Finial (450g Regalia) |
| `wid1` | Sovereign Master Card Widget | `widgets` | Sovereign Member | **FREE ($0)**| Digital Horological Obsidian Frame (Native Widget) |

*Historical Registry Note: Archival assets (`crown2`, `crown3`, `ring4`, `aura2`, `aura3`, `star2`, `star3`, `art3`) remain registered in `artifacts.js` to preserve historical user inventories, dossier inspection badges, and equipped states without breaking legacy saves.*

---

## 5. CORE ARCHITECTURAL GUARDRAILS

To preserve 100% stability, zero visual regressions, and platform compliance in future iterations, all developers and AI agents must strictly observe these non-negotiable rules:

1. **Preserve `crown4` Unconditionally:**
   `crown4` ("Crown of Zenith Authority", icon: `crown_zenith`, $9,000) is the pinnacle crown collectible. Never remove, replace, or rename its ID or metadata.
2. **Pure Inline SVG Mandate:**
   Never introduce external image URLs (`http://`, `https://`) or raster image files (`.png`, `.jpg`, `.webp`) for collectibles, hallmarks, or seals. All graphics must be resolution-independent SVG elements with self-contained gradient definitions.
3. **Strict English-Only (LTR) Rule:**
   Do not introduce dual-language toggles that flip layout direction or corrupt English editorial typography. All primary copy must resolve cleanly to English strings.
4. **No Inline HTML `<style>` Bloat:**
   All style rules belong exclusively in `style.css`. Never add `<style>` blocks in `index.html`.
5. **Master Card as Single Source of Truth:**
   The Master Card component on the Membership tab is the single design authority for Public Sharing and Primary Widgets. Never build independent, divergent card layouts.
6. **Server-Side Market Data Protection:**
   Live market ticker quotes must be queried and cached via `/api/market-ticker` in `server.ts`. Never expose Twelve Data or Biquote API keys in client-side code, and never fabricate financial prices.
7. **Clean Environment & Dependency Hygiene:**
   Maintain npm package integrity. Never commit `bun.lock`, `yarn.lock`, or temporary cleanup scripts (`.py`, `.sh`). Verify `tsc --noEmit` on every change sequence.

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
├── .gitignore                   # Standard git exclusions (node_modules, dist, lockfiles, backups, uploaded media)
├── AUDIT.md                     # Master Architectural Blueprint (this file)
├── Audio.js                     # Synthesized WebAudio horological sound engine (945 lines)
├── README.md                    # Repository documentation and orientation
├── app.js                       # Core application state, tabs, commerce & club engine (10,597 lines)
├── artifacts/                   # Single authoritative collectible asset directory (24 optimized dual-mode .webp files, 0.92 MiB)
├── artifacts.js                 # Collectible asset catalog & dual-mode Dark/Light renderer (213 lines)
├── assets/
│   └── portraits/               # Active curated sovereign studio portraits (5 .jpg files, 2.93 MiB, served from root by server.ts)
├── firebase-applet-config.json  # Provisioned AI Studio Firebase Firestore & Auth client config
├── firebase-blueprint.json      # Firestore schemas, collections, and security specifications
├── firestore.rules              # Deployed Firestore security and authorization rules
├── index.html                   # Master single-page HTML entry point & SVG gradient defs (4,527 lines)
├── luxury.js                    # Haute horlogerie canvas physics engine for Master Card (2,500 lines)
├── metadata.json                # AI Studio platform capabilities and metadata
├── package.json                 # Project dependencies, scripts (dev, start, build, lint)
├── server.ts                    # Production Express server (Gzip, static root & /artifacts, market proxy, SPA routing; 427 lines)
├── src/
│   └── main.tsx                 # Non-intrusive TypeScript shield entry point (15 lines)
├── style.css                    # Unified master stylesheet (Liquid Glass, dock, modals, Atelier; 42,904 lines)
├── translations.js              # Standardized English localization dictionary (1,843 lines)
├── tsconfig.json                # TypeScript compiler configuration (ES2022, bundler)
└── vite.config.ts               # Vite configuration for AI Studio dev server (port 3000)
```

*(Total core source footprint: **63,971 lines** across 9 files; total workspace footprint excluding `node_modules`/`.git`/`dist`: **48 files / ~6.01 MiB**, including the 0.92 MiB `/artifacts/` studio collection and 2.93 MiB `/assets/portraits/` curated portrait library.)*

### Exact File Roles

| File | Exact Architectural Role |
|---|---|
| `index.html` | HTML entry point (4,527 lines). Hosts all semantic tab containers (`#membership-tab`, `#club-tab`, `#profile-tab`, `#boutique-tab`), modal overlays (Settings, Account, Support, 3-Chapter Edit Profile Atelier, Dossier, Inspection, Auth, Recovery), and global SVG gradient definitions (`#ringGoldGrad`, `#bezelGrad`, `#sov_gold_24k`). Zero inline `<style>` tags; modal backdrop dismissal is centrally handled by `initUnifiedModalBackdrops()` in `app.js`. |
| `style.css` | Consolidated master stylesheet (42,904 lines). Contains the seamless Liquid Glass header, VisionOS crystal bottom dock, typography hierarchy, responsive breakpoints (360px–430px), modal card systems, Edit Profile Atelier chapters, and Dark/Light mode color schemes. |
| `app.js` | Primary application logic controller (10,597 lines). Manages reactive state (`AppState`), boutique commerce and vault persistence, club chat with room switching and daily message reserves, live market ticker client consumption, metric ring complications (Wealth Index and Privileges Index with D3), unified modal backdrop management, consolidated capture-scroll/rAF-resize/boot dispatchers, and authentication state (`AuthBoundary`). |
| `luxury.js` | Mathematical canvas rendering engine for the Master Identity Card (2,500 lines). Computes layered guilloché geometry, dynamic gold dust particle dynamics, specular metallic sheen passes, high-DPI metallic gold card image exports, a single consolidated `DOMContentLoaded` initializer (`initLuxuryEngine`), and a unified visibility/tab/resize lifecycle hub. |
| `artifacts.js` | Collectible asset registry (`window.SOVEREIGN_ARTIFACTS`, 213 lines). Renders all 12 boutique collectibles from the single authoritative `/artifacts/` directory using theme-aware dual-mode `.webp` studio assets (Obsidian Dark & Imperial Light, reacting to both `themechange` and `themeChanged` events), plus pure inline SVG for `wid1` and legacy `aliasMap` compatibility. |
| `artifacts/` | Single authoritative directory of 24 optimized dual-mode studio collectible images (12 active artifacts × Dark/Light in 512×512 lossy WebP, ~0.92 MiB total) served statically by `server.ts`. |
| `assets/portraits/` | Curated sovereign studio portrait library (5 `.jpg` files, ~2.93 MiB total) served directly from root by `server.ts` and referenced by `PRESET_AVATARS` in `app.js` and `index.html`. |
| `translations.js` | English dictionary (`window.TRANSLATIONS.en`, 1,843 lines) and authoritative localization helpers (`window.getNestedValue`, `window.t`, `window.getTranslation`). |
| `Audio.js` | WebAudio synthesized horological acoustic engine (`window.AudioEngine`, 945 lines). Synthesizes physical mechanical clicks, minute-repeater chimes, and transaction success sounds directly from oscillators with zero audio file downloads. |
| `server.ts` | Full-stack Node.js 22 + Express server (427 lines). Handles gzip compression middleware, immutable static file caching (serving root `/artifacts/` and `/assets/portraits/`), SPA fallback to `index.html`, and the server-side `/api/market-ticker` proxy with 60-second caching for Twelve Data + Biquote spot prices. |
| `src/main.tsx` | Passthrough shield entry point (15 lines) ensuring platform compatibility with TypeScript build and lint tooling without overriding the native HTML/CSS/JS runtime. |

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

All 12 boutique collectibles are rendered via `artifacts.js` from the single authoritative local `/artifacts/` directory using theme-aware dual-mode studio assets (optimized 512×512 `.webp` for both Obsidian Dark and Imperial Light), while the Master Card Widget (`wid1`) renders as pure inline SVG. Zero external remote image URLs or placeholder PNGs.

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
2. **Single Authoritative Asset Policy (`/artifacts/` + Inline SVG):**
   Never introduce external remote image URLs (`http://`, `https://`) or duplicate asset directories. All 12 boutique collectibles resolve exclusively to local dual-mode `.webp` assets inside `/artifacts/` via `artifacts.js`, while `wid1`, hallmarks, bezels, and sovereign seals render as resolution-independent inline SVG elements.
3. **Strict English-Only (LTR) Rule:**
   Do not introduce dual-language toggles that flip layout direction or corrupt English editorial typography. All primary copy must resolve cleanly to English strings.
4. **No Inline HTML `<style>` Bloat:**
   All style rules belong exclusively in `style.css`. Never add `<style>` blocks in `index.html`.
5. **Master Card as Single Source of Truth:**
   The Master Card component on the Membership tab is the single design authority for Public Sharing and Primary Widgets. Never build independent, divergent card layouts.
6. **Server-Side Market Data Protection:**
   Live market ticker quotes must be queried and cached via `/api/market-ticker` in `server.ts`. Never expose Twelve Data or Biquote API keys in client-side code, and never fabricate financial prices.
7. **Clean Environment, Anti-Bloat & Dependency Hygiene (Permanent Rule):**
   - Maintain npm package integrity. Never commit `bun.lock`, `yarn.lock`, transient audit reports (`CODEBASE_AUDIT_REPORT.md`, `CHECKPOINT_MANIFEST.txt`), or temporary cleanup scripts (`.py`, `.sh`). Verify `tsc --noEmit` on every change sequence.
   - **ZERO `.zip` Backups:** Never create `.zip` checkpoint archives in the repository (rely on Git and AI Studio checkpoints). If a user explicitly requests a `.zip` export, overwrite a single temporary file only and never accumulate multiple `.zip` files. `*.zip` must remain permanently excluded in `.gitignore`.
   - **ZERO Chat Screenshot Retention:** Never reference, commit, or retain uploaded chat screenshots in `public/assets/aistudio/` or duplicate image folders (`public/assets/portraits/`, `src/assets/images/`); purge `public/assets/aistudio/` during any cleanup pass. `public/assets/aistudio/` must remain permanently excluded in `.gitignore`.

---

## 6. SURGICAL REFACTORING & OPTIMIZATION LOG

### Batch 1 — Runtime Bug Fixes, Handler Deduplication & State Integrity
- **Purchase & UI Pipeline Deduplication (`app.js`):** Removed redundant manual `_subscribers["change"]` iteration and direct `updateUI()` invocation inside `AppState.purchase()` so `this.notify()` drives a single reactive render cycle; removed duplicate `HapticEngine.boutiquePurchase()` call in `window.purchase()`.
- **Complication Ring Animation Fix (`app.js`):** Removed redundant direct `renderRing()` invocation in `ClubState.on("change")` since `updateMasterCard()` already invokes `renderRing()`.
- **Dossier & Modal Listener Hygiene (`app.js`):** Removed duplicate `.onclick = handleAction` assignments in `initMemberDossierActionButtons()`; removed dynamic `window.closeMemberMiniDossierModal` overwrite and repeated `modal.onclick` assignment in `openMemberMiniDossier()`.
- **State Accessor & Helper Cleanup (`app.js`):** Removed two shadowed duplicate `get/set member` accessor definitions on `AppState`; reused top-level `getHeader()` in `HeaderScrollController` and `HeaderAutoDismissController`; removed empty `renderProfileCollection` dead stub.
- **Theme Event Alignment (`app.js` & `artifacts.js`):** Dispatched both `"themechange"` and `"themeChanged"` in `ThemeManager.setTheme()` and subscribed `artifacts.js` to both events for instant Dark/Light artifact transitions.
- **Canvas 2D Export Fix (`luxury.js`):** Replaced invalid SVG paint string `ctx.fillStyle = "url(#ringGoldGrad)"` in `renderMasterCardToBlob()` with a proper Canvas 2D linear gold gradient (`makeGoldGrad(...)`) so exported `MEMBER ID` metadata renders in authentic metallic gold.
- **HTML Attribute Fix (`index.html`):** Fixed unclosed `placeholder="Interests"` quote inside `#page-edit-account`.
- **English-Only Localization Reconciliation (`app.js` & `translations.js`):** Unified `window.t`, `window.getTranslation`, `window.getNestedValue`, `window.setLanguage`, and `window.currentLang` on a single English-only LTR contract while preserving `window.syncClubInputDirection()`.

### Batch 2 — Asset Deduplication, Dead Code Removal & Cascade-Safe CSS Cleanup
- **Asset Deduplication (~22.69 MB Saved):** Verified zero code references and removed byte-for-byte duplicate `/public/artifacts/` (48 files, 4.90 MB) and unreferenced intermediate `/src/assets/images/` (24 files, 17.79 MB). Preserved the single authoritative `/artifacts/` (48 files, 4.90 MB) served by `server.ts` and `/public/assets/aistudio/` (41 archival screenshots).
- **Verified Dead Code Removal (`app.js`):** Removed zero-caller `Router.navigateContext` and `window.triggerGaugeHorologicalShimmer`.
- **Active Utility Retention (`app.js`):** Pre-deletion verification confirmed `window.DeferredQueue` is actively called during Club Chamber initialization (`initSovereignSalonTicker()`), so it was intentionally retained.
- **Unified Modal Backdrop Consolidation (`index.html`):** Removed 12 duplicate inline backdrop `onclick="if (event.target === this) ..."` attributes across all `UNIFIED_MODALS`, making `initUnifiedModalBackdrops()` in `app.js` the single backdrop dismissal path while preserving all explicit close-button handlers.
- **Cascade-Safe CSS Cleanup (`style.css`):** Removed 2 shadowed earlier duplicate `@keyframes` (`luxuryFadeSlide`, `continuousTickerScroll`), 9 zero-reference `@keyframes` (`halo-breathe`, `dispatchArrivalIncomingRTL`, `dispatchArrivalPersonalRTL`, `sovereignSealStampFadeRtl`, `sovereignGoldBreathingGlow`, `clubRoomsChevronNudgeRTL`, `luxuryPulse`, `luxuryPulseLight`, `securityRibbonGlideRtl`), and the dead `#settingsModal .lang-selector-group` rule without reordering any active visual cascade blocks.

### Batch 3 — Deep Safe Compaction, Listener Unification & Workspace Purge
- **Workspace Asset Cleanup (~29.89 MiB Saved):** Deleted `/public/assets/aistudio/` (41 unreferenced archival screenshots/logs), reducing total non-`node_modules` workspace footprint to **~7.0 MB** while preserving `/artifacts/` (48 active dual-mode studio files) 100% untouched.
- **Cascade-Safe `style.css` Compaction (-4,222 Lines: `42,114` → `37,892`):** Removed 346 fully-dead rules (from verified 0-reference classes) and pruned 1,713 in-place shadowed declarations + 182 fully-shadowed blocks **without reordering any surviving cascade rules**. Strictly preserved all 26 dynamically constructed JS classes (`tier-*`, `rarity-*`, `is-*`, `hrr-ribbon-*`, `ribbon-*`, `medal-*`) and all 27 substring-overlap classes.
- **In-Place `app.js`, `translations.js` & `index.html` Cleanup (Zero TDZ Risk):** Kept all 53 top-level `const`/`let` declarations in their exact initialization order; removed redundant `window.t` fallback (`app.js`), dead `langEnBtn`/`langArBtn` refs (`app.js`), unused `window.applyTranslations` (`translations.js`), orphaned `#page-edit-account` (`index.html`) + `#editAccountForm` listener (`app.js`), and disabled `HeaderAutoDismissController` (`app.js`, preserving boot `header-hidden` reset & `updateHeaderHeightVar()` inside `HeaderScrollController.init()`). Consolidated 3 `window.resize` listeners into 1 rAF-throttled dispatcher (keeping `visualViewport` keyboard handler separate) and merged 2 capture-phase `document.scroll` listeners into 1.
- **`luxury.js` Unified Lifecycle Hub:** Consolidated 3 `document.visibilitychange` listeners into 1 dispatcher, 2 `#membership-tab` `MutationObserver` instances into 1 shared observer, and 2 `window.resize` listeners into 1 debounced (150ms) handler while keeping per-canvas `ResizeObserver` instances intact.

### Batch 4 — Asset Optimization, Bug Fixes & Security Hardening
- **Studio Asset Optimization (`/artifacts/` & `artifacts.js`, -4.18 MB / -81.2%):** Deleted all 24 legacy `.jpg` fallback files and re-encoded all 24 `.webp` files via Lanczos resize to `512×512` (lossy WebP, `quality=84`, `method=6`, alpha preserved), shrinking `/artifacts/` from **5,142,669 bytes (4.90 MiB, 48 files)** to **966,278 bytes (0.92 MiB, 24 files)**. Removed `data-dark-fallback`, `data-light-fallback`, and the `.jpg` `onerror` handler from `artifacts.js`.
- **Double Deposit Bug Fix (`app.js`):** Removed duplicate `ClubState.balance += amount;` and `ClubState.save();` calls inside the `.deposit-pkg` click handler (`ClubState === AppState`).
- **Stylesheet & Font Hygiene (`style.css` & `index.html`):** Removed the duplicate render-blocking Google Fonts `@import` at the top of `style.css`; fixed the 4 unclosed/broken RTL comment blocks (`Arrow Orientation`, `RTL Arrow Direction`, `In RTL, text flows right-to-left`, `ARABIC / RTL`) so no valid CSS rules are swallowed; trimmed unused Arabic font families (`Amiri`, `Cairo`, `Readex Pro`) from the `index.html` Google Fonts `<link>`.
- **Firestore Security Hardening (`firestore.rules`):** Added `tier` update immutability validation inside `isValidUser(userId)` (`resource == null || !('tier' in incoming()) || ('tier' in existing() && incoming().tier == existing().tier)`) to prevent client-side tier self-escalation on profile updates.
- **Repository Hygiene (`README.md` & Workspace):** Updated `server.js` reference to `server.ts` in `README.md` and removed stray `bun.lock` lockfile, bringing total non-`node_modules` workspace size from **7,236,023 bytes (6.90 MiB)** down to **~2.84 MiB**.

### Batch 5 — Surgical Workspace Purge, Cascade-Safe CSS Pruning & JS Lifecycle Consolidation
- **Workspace Storage Purge (-110.67 MiB / -94.8%):** Deleted `194` stray, duplicate, and unreferenced files — `/public/` (`113` AI Studio screenshot attachments + `5` duplicate portraits), `68` root `THE_1_PERCENT_CLUB_*.zip` backup archives, `/src/assets/images/` (`5` duplicate raw portrait sources), `bun.lock`, `CODEBASE_AUDIT_REPORT.md`, and `CHECKPOINT_MANIFEST.txt` — while keeping active `/assets/portraits/` (`5` files, `2.93 MiB`) and `/artifacts/` (`24` `.webp` files, `0.92 MiB`) completely untouched. Permanently locked down `.gitignore` (`*.zip`, `public/assets/aistudio/`, `bun.lock`, `yarn.lock`, `CODEBASE_AUDIT_REPORT.md`, `CHECKPOINT_MANIFEST.txt`) and codified **ZERO `.zip` Backups** and **ZERO Chat Screenshot Retention** in Guardrail #7.
- **Cascade-Safe `style.css` In-Place Pruning (-1,608 Lines / -40.8 KB: `44,512` → `42,904`):** Removed `105` verified 100%-shadowed earlier exact-selector blocks and `129` verified shadowed declarations strictly in-place with zero cascade reordering, preserving identical Dark & Light mode computed styles across all tabs and modals.
- **JS Hygiene & Listener Consolidation (`app.js` & `luxury.js`):** Removed dead `#leaderboardList` fallback/selector refs and 2 write-only `window.*` exports (`window.boutiqueCatalog`, `window.updateClubTicker`); merged duplicate `"input"` listeners on `#editProfileNameInput`, `#editProfileLocationInput`, and `#editProfileQuoteInput` into single handlers per input; consolidated `app.js` `DOMContentLoaded` listeners into `initApp()` and `luxury.js`'s 3 `DOMContentLoaded` listeners into a single TDZ-safe `initLuxuryEngine()` at file end.
- **Documentation Alignment (`AUDIT.md`):** Reconciled Section 2 File Map (including `/assets/portraits/`), exact workspace footprint (**48 files / ~6.01 MiB**), and core source line counts (**63,971 lines** across 9 files).

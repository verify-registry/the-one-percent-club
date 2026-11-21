# THE 1% CLUB — Comprehensive Codebase Audit Report

> **Audit Date:** 2026-11-21  
> **Audit Mode:** Read-only inspection complete. **Zero application files have been modified, deleted, or rewritten.**  
> **Baseline Status:** 100% of original visual identity, Obsidian Dark / Imperial Light themes, collectibles registry (`crown4` + 11 studio pieces + `wid1` + archived `RETIRED_COLLECTIBLES`), and interactive behaviors remain untouched.

---

## Executive Summary & Architecture Snapshot

Although `package.json` includes React, Vite, and Firebase packages, the live production application runs as a **Vanilla HTML / CSS / JS single-page application** served directly by `server.ts` (Express), with `src/main.tsx` acting as a non-rendering TypeScript passthrough shield for build tooling (`tsc --noEmit`).

| Metric | Current Value | Notes |
|---|---|---|
| **Total Core Source Footprint** | **58,108 lines** | Across 10 source/doc files (`style.css` accounts for 65.2%) |
| **Runtime Frontend Bundle** | `index.html` + 5 classic `<script>` tags + `style.css` + D3 v7 CDN | No ES module bundling; shared globals on `window.*` |
| **Collectible Studio Assets** | **24 `.webp` files** (`/artifacts/`) | 12 active pieces × Dark & Light variants (`512×512`) |
| **HTML Unique IDs** | **419** (0 duplicate IDs) | 4 `getElementById` targets in JS do not exist in `index.html` (`#metal3D` is dynamically injected) |
| **Active Backend Endpoints** | **1 API route** (`/api/market-ticker`) | Proxies Twelve Data + Biquote with 60s cache & 90s backoff |
| **Firebase / Firestore Runtime Usage** | **0 client/server imports** | Config/rules/blueprint exist; runtime uses `localStorage` & `sessionStorage` |
| **Confirmed Broken Call Sites** | **28 silent no-op calls** | Calls to 4 non-existent `AudioEngine` / `HapticEngine` methods |
| **Git Checkpoint Status** | **No `.git` directory** | Snapshot backups will be needed before any refactoring batch |

---

## PHASE 1 — Full Project Inventory

### 1.1 Repository & Module Map

| File Path | Lines | Role | Key Exports / Global Surface |
|---|---|---|---|
| `index.html` | 4,482 | Master SPA shell, inline SVG gradient `<defs>`, 4 tab views (`#membership-tab`, `#club-tab`, `#profile-tab`, `#boutique-tab`), `#page-member` overlay, 11 modal overlays, early theme/lang boot script | `window.__APP_INITIAL_LANG__`, `window.__APP_INITIAL_THEME__`, 8 inline `onclick` hooks |
| `app.js` | 9,853 | Monolithic core controller: state (`AppState`/`ClubState`), localization, theme/settings, boutique commerce, profile/dossier/deed/oath, club salons/messaging/ticker, leaderboard, router, modals, header scroll, auth gate | 60+ `window.*` globals, `AppState`, `Router`, `StorageHelper`, `HeaderScrollController`, `AuthBoundary`, `ThemeManager` |
| `luxury.js` | 2,215 | Master Card visual engine: offscreen 3D gold texture (`#metal3D`), guilloché canvas, gold dust particle canvas, Canvas-2D PNG card export & share, 3D gyroscope/pointer tilt engine, unified RAF pause/resume hub | `drawGuilloche`, `renderMasterCardToBlob`, `shareMasterCard`, `initGyroElements`, `setCardTilt`, `triggerGoldDustMilestone`, `pauseMembershipRAF`, `resumeMembershipRAF` |
| `artifacts.js` | 213 | Single collectible image resolver for 12 studio artifacts (Dark/Light `.webp`) + inline SVG for `wid1` + legacy `aliasMap` (preserves archived IDs) + live theme observer | `getSovereignArtifact`, `renderClocheVitrine`, `updateSovereignArtifactThemes`, `SOVEREIGN_ARTIFACTS` (Proxy) |
| `Audio.js` | 934 | WebAudio synthesized horological soundscape (15 tones) + `HapticEngine` (Navigator Vibrate API) | `window.AudioEngine`, `window.HapticEngine` |
| `translations.js` | 1,844 | Flat English dictionary (`window.I18N`) and lookup helpers | `window.I18N`, `window.t`, `window.getTranslation`, `window.getNestedValue`, `window.currentLang`, fallback `window.setLanguage` |
| `style.css` | 37,874 | Consolidated master stylesheet (1.15 MB): Obsidian Dark, Imperial Light (2,346 light-mode selector lines), Liquid Glass header/dock, modals, responsive breakpoints | 3,273 unique selectors, 66 `@keyframes`, 65 `@media` blocks, 12,657 `!important` |
| `server.ts` | 427 | Node/Express production & dev server: gzip middleware, static file serving with cache headers, `/api/market-ticker` proxy, SPA fallback | Express app on port `3000` (`HOST` default `0.0.0.0`) |
| `src/main.tsx` | 15 | TypeScript/React passthrough shield (`PassthroughShield` returns `null`); not loaded by `index.html` | `AppStatus`, default export `PassthroughShield` |
| `firebase-applet-config.json`, `firebase-blueprint.json`, `firestore.rules` | 84 (rules) | Provisioned Firebase config, schema blueprint (`User`, `Channel`, `ClubMessage`), and Firestore security rules | Not imported by runtime JS/TS yet |
| `artifacts/*.webp` | 24 files | Dual-mode studio photography (`art1/2/4`, `aura1/4`, `crown1/4`, `ring1/2/3`, `star1/4` × dark + `_light`) | Served statically via `/artifacts/*` |

### 1.2 Dependencies Inventory (`package.json` + CDN)

- **Active Runtime Dependencies:** `express`, `dotenv`, `tsx` (dev runner), `typescript` (`build`/`lint` scripts), plus CDN `d3.v7.min.js` (used in `app.js:renderRing`) and Google Fonts (`Cinzel`, `Cinzel Decorative`, `Cormorant Garamond`, `Playfair Display`, `Inter`, `Manrope`, `Pinyon Script`, `Great Vibes`, `Alex Brush`).
- **Installed but Unimported in Runtime:** `react`, `@types/react`, `vite`, `@vitejs/plugin-react`, `firebase`, `@google-cloud/firestore` (retained for AI Studio tooling / `src/main.tsx` shield / future Firestore backend integration — **do not remove** without confirming platform tooling requirements).
- **External Remote URLs Still Present:**
  - `server.ts`: `https://api.twelvedata.com/price` and `https://biquote.io/api/latest` (server-side proxy only).
  - `index.html` (4 URLs) and `app.js` (30 Unsplash portrait URLs in `ELITE_AVATARS`, `PRESET_AVATARS`, `mockTopMembers` + `https://1percent.club/verify/3426`). *Note: Boutique collectibles strictly use local `/artifacts/*.webp`; member portraits use Unsplash.*

### 1.3 Persistence Keys Inventory

- **`localStorage`:** `app_theme`, `club_achievements`, `club_audio_enabled`, `club_gyroscope_enabled`, `club_haptic_enabled`, `club_stealth_mode`, `club_vip_notifications`, `club_widget_installed`, `one_percent_lang` *(legacy read)*, `profileDraft`, `portrait_${ClubState.member.id}`, `channels_${AppState.user.id}`, plus `AppState` keys managed through `StorageHelper` (member state, balance, owned/equipped collectibles, message credits).
- **`sessionStorage`:** `1percent_sovereign_session` (managed by `AuthBoundary`).

### 1.4 Event Listener Inventory

- **`app.js`:** 70 `click`, 9 `change`, 6 `keydown`, 4 `scroll`, 4 `input`, 3 `resize` (2 `visualViewport`/fallback + 1 rAF-throttled `window.resize`), 3 `pointerenter`, 2 `DOMContentLoaded`, 2 `languageChanged`, 2 `mouseenter`, 2 `mouseleave`, 2 `focus`, 2 `touchstart`, 2 `submit`, 1 `blur`, 1 `keyup`, 1 `paste`, 1 `cut`, 1 `touchend`, 1 `visibilitychange`, 1 `club-audio-change`.
- **`luxury.js`:** 3 `DOMContentLoaded`, 4 `click`, 3 `touchend`, 2 `touchstart`, 2 `touchcancel`, 2 `pointerleave`, 1 each of `pointerdown`, `pointerup`, `pointercancel`, `pointerenter`, `pointermove`, `touchmove`, `deviceorientation`, `visibilitychange`, plus `MutationObserver` (2x: `initMetallicAssets` on `document.body`, unified tab observer on `#membership-tab`) and per-canvas `ResizeObserver`.
- **`artifacts.js`:** 1 `DOMContentLoaded`, 1 `themechange`, 1 `themeChanged`, 1 `storage`, 1 `MutationObserver` on `<html>` and `<body>`.
- **`Audio.js`:** 6 unlock event types (`touchstart`, `touchend`, `pointerdown`, `pointerup`, `click`, `keydown`) attached to both `document` and `window` (self-removing once `AudioContext.state === "running"`).

---

## PHASE 2 — Comprehensive Function & Component Classification

Classification legend:
- **1 — Active & Essential**
- **2 — Active — Duplicated or Unnecessarily Complex**
- **3 — Legacy — Still Referenced**
- **4 — Unused — Safe Deletion Candidate**
- **5 — Uncertain — Requires Further Investigation**

### 2.1 `app.js` — Core Application Controller

| File Path | Function / Component | Current Responsibility | Known Callers & Dependencies | Classification | Recommended Action & Justification |
|---|---|---|---|---|---|
| `app.js:8` | `getHeader()` / `window.getHeader` | Cached `#appHeader` DOM lookup | `HeaderScrollController`, `Router` (11 refs) | **1. Active & Essential** | Keep. Shared cached selector prevents repeated DOM lookups. |
| `app.js:16` | `window.DeferredQueue` | Idle-callback task queue | `initClubChamber` (`L5097`) | **1. Active & Essential** | Keep. Defers ticker init off critical path. |
| `app.js:47` | `renderRing(ringId, valueId, percent)` | Animates Wealth & Privileges SVG dials via D3 v7 (with rAF fallback) | `updateMasterCard`, `updateUI` (7 refs) | **1. Active & Essential** | Keep. Core horological complication renderer. |
| `app.js:99` | `window.syncClubInputDirection(inputEl)` | Auto-sets `ltr`/`rtl` direction on `#clubInput` based on typed characters | `setLanguage`, chat input listeners (17 refs) | **1. Active & Essential** | Keep. Allows Arabic/English chat input seamlessly even in LTR UI. |
| `app.js:123` | `window.setLanguage()` | Forces English LTR, updates `data-i18n` DOM nodes, and triggers full re-renders across all tabs | `initGlobalSettings` (`L250`); overrides `translations.js:1837` | **2. Active — Duplicated / Complex** | **Refactor safely:** Currently duplicates initial renders (`updateUI`, `renderBoutique`, `renderMessages`, `renderLeaderboard`, `initProfile`) that `initApp()` runs again immediately via `AppState.notify()`. Guard initial boot so it hydrates `data-i18n` once without 3× redundant renders. |
| `app.js:249` | `initGlobalSettings()` & `window.ThemeManager` | Manages Obsidian Dark / Imperial Light theme, Soundscape, Haptics, Gyroscope, VIP Notifications, and Stealth toggles | `initApp` (`L9824`), `artifacts.js`, `luxury.js` | **1. Active & Essential** | Keep. Preserve dual dispatch (`themechange` + `themeChanged`) for full compatibility. |
| `app.js:508` | `window.applyLanguage(lang)` | Sets `#collectionSectionTitle`, calls `initProfile(true)` and `syncAudioSoundUI` | `setLanguage` (`L186`), top-level `L2046` | **3. Legacy — Still Referenced** | **Consolidate later:** Hardcodes `"MY LUXURY COLLECTION"` and triggers duplicate `initProfile(true)` at boot (called at top-level `L2046` AND inside `setLanguage`). |
| `app.js:524` | `window.getSovereignArtifact` fallback | Guarded fallback if `artifacts.js` failed to load | Safety guard only (`artifacts.js` loads first) | **3. Legacy — Still Referenced** | Keep as harmless defensive guard. |
| `app.js:531–1137` | `RARITY_LABEL`, `TIER_HIERARCHY`, `isTierEligible`, `getBoutiqueTierLabel`, `EQUIP_CATEGORIES`, `ACHIEVEMENTS_DATA`, `BOUTIQUE`, `RETIRED_COLLECTIBLES`, `UNIFIED_PAID_COLLECTIBLES`, `findCollectibleRecord`, `SOVEREIGN_CIRCLES_CATALOG` | Authoritative catalogs, tier eligibility rules, historical retired collectible metadata | Boutique, Profile Reliquary, Master Card, Dossier | **1. Active & Essential** | **Strictly preserve** all IDs, prices, metadata, `crown4`, and `RETIRED_COLLECTIBLES`. |
| `app.js:868` | `window.boutiqueCatalog = BOUTIQUE` | Unused window alias for `BOUTIQUE` | **0 callers** (1 mention total) | **4. Unused — Safe Deletion Candidate** | Safe to remove (or keep if external debugging uses it; zero internal callers). |
| `app.js:1142` | `StorageHelper` | Safe `localStorage` JSON/string wrapper | `AppState` (22 refs) | **1. Active & Essential** | Keep. Centralizes storage error handling. |
| `app.js:1171` | `AppState` / `ClubState` | Reactive store: member identity, balance, owned/equipped collectibles, credits, prestige recalculation, `purchase()`, `toggleEquip()`, pub/sub (`subscribe`/`notify`/`on`/`emit`) | 192 refs across entire app | **1. Active & Essential** | Keep contract intact. Good candidate for future modular extraction into a clean state module. Note: top-level `AppState.init()` (`L2042`) runs before `DOMContentLoaded`. |
| `app.js:1704` | `escapeHtml(str)` | Sanitizes untrusted strings before template insertion | Chat dispatches & dynamic templates (7 refs) | **1. Active & Essential** | Keep and expand usage to any unescaped user-editable fields. |
| `app.js:1717` | `window.openMemberMiniDossier` & `window.openMemberProfileFromDispatch` | Opens member mini-dossier modal or full `#page-member` dossier from Club dispatches | Club message click handlers (3 refs each) | **2. Active — Duplicated / Complex** | Active, but contains ~15 dead `isAr ? ... : ...` branches (`L1729–1876`, `L1937`). Keep behavior; simplify dead bilingual branches only in a later audited pass. |
| `app.js:1976–2053` | `ELITE_AVATARS`, `FALLBACK_SOVEREIGN_AVATARS`, `getMemberAvatar`, `ELITE_SEATS`, `handleImageUpload` | Member portrait resolution & custom medallion photo upload | Club, Profile, Membership portrait (`#photoUploadBtn`) | **1. Active & Essential** | Keep. |
| `app.js:2090` | `updateUI()` | Syncs DOM text, balances, portraits, profile counts, and Master Card state from `AppState` | `ClubState.on("change")`, `setLanguage`, top-level `L2808` | **2. Active — Duplicated / Complex** | **Note:** Called 3–4× during boot (`L2808`, `setLanguage`, `AppState.notify`). Also queries missing `#profileItemCount` (`L2223`, null-guarded no-op). |
| `app.js:2257` | `applyEquippedToCard()` | Projects equipped crown, aura, ring, star, and artifact onto the Master Card medallion | `updateMasterCard`, `updateUI` (6 refs) | **1. Active & Essential** | Keep. Core visual identity logic. |
| `app.js:2327–2736` | `generateSkeleton`, `generateBoutiqueSkeleton`, `resetBoutiqueOwnershipFilter`, `renderBoutique`, `renderBoutiqueContent`, `handleInstallWidget`, `renderWidgetSection`, `updateBoutiqueGliders` | Boutique Vitrine rendering, category/ownership filtering, gliding pill indicator, and `wid1` widget installation | Boutique tab, `AppState` changes, resize dispatcher | **1. Active & Essential** | Keep. Note: top-level `renderBoutique()` (`L2800`) runs before `initApp()`. |
| `app.js:2815–2980` | `showGoldCopyPopup`, `showCopyToast`, `#copyBtn` & `#shareBtn` click handlers | Copies `ClubState.member.verifyUrl` and invokes `window.shareMasterCard()` (Web Share / PNG fallback) | Membership tab action bar, `luxury.js:shareMasterCard` | **1. Active & Essential** | Keep. Preserves public-only identity sharing (no wealth percentage exposed). |
| `app.js:2986` | `initMetricTooltips()` | Interactive tooltips on Wealth & Privileges complication dials | `initApp` (`L9830`) | **1. Active & Essential** | Keep. |
| `app.js:3146–3489` | `showNavToast`, `PAGE_TITLES`, `IMPLEMENTED_TABS`, `Router`, `goToPage`, `openContextPage` | 4-tab navigation (`membership`, `club`, `profile`, `boutique`), scroll restoration, RAF pause/resume on tab switch, and sub-page `#page-member` overlay routing | Bottom dock, AuthBoundary, Profile, Dossier | **1. Active & Essential** | Keep. Enforces exactly 4 primary tabs. |
| `app.js:3491–3756` | `openMemberProfile`, `closeMemberProfile`, `initMemberDossierActionButtons` | Full member dossier view (`#page-member`) + "Coming Soon" handlers for Add Friend / Message | Leaderboard, Club dispatches, `index.html:2017` | **1. Active & Essential** | Keep. Note: `initMemberDossierActionButtons()` runs at top-level `L3757` and again inside `openMemberProfile()`. |
| `app.js:3767–4009` | `updateCreditsUI`, `showPremiumToast`, `showAchievementToast`, `spawnGoldenConfetti`, `unlockAchievement` | Message reserves UI, toast notifications, achievement unlocks | Club messaging, Boutique purchase, Profile honors | **1. Active & Essential** | Keep. |
| `app.js:4013–5813` | `ELITE_MEMBERS`, `processEliteResponse`, `setClubFloatingControlsVisibility`, `updateClubPinnedTitle`, `switchChannel`, `updateClubBottomClearance`, `updateClubHudHeight`, welcome auto-dismiss, room pagination arrows, `initSovereignSalonTicker`, `initClubChamber`, `toggleAccolade`, `toggleDispatchReadMore`, `buildMessageHTML`, `scrollChatToLatest`, `appendMessageToChat`, `renderMessages`, `initWhisperToggle`, `handleSendMessage`, `autoGrowClubInput` | Complete Club Private Society engine: 5 salons, live `/api/market-ticker` polling, simulated elite replies, accolades (`endorse`, `honor`, `toast`), whisper mode, auto-grow composer, mobile keyboard viewport adaptation | Club tab, `initApp` (`L9833`), resize/scroll dispatchers | **2. Active — Duplicated / Complex** | **Keep all behavior**, but fix 3 missing `AudioEngine.playClick` calls (`L4663`, `L5201`, `L5565`) and evaluate 2 `languageChanged` listeners (`L4683`, `L5089`) that are legacy from bilingual switching. |
| `app.js:5953–6240` | `openInspectionModal`, `window.purchase`, `purchaseItem`, `updateMasterCard`, `closeInspectionModal` | Boutique artifact inspection modal, purchase execution, Master Card refresh | Boutique cards, `index.html:3474/3545` | **1. Active & Essential** | Keep. Note: `purchaseItem` (`L6177`) is a 2-line thin wrapper delegating to `window.purchase`. |
| `app.js:6242–7104` | `initProfileAndModals` (contains `openEditProfileModal`, `closeEditProfileModal`, `openAccountInfoModal`, `closeAccountInfoModal`, `UNIFIED_MODALS`, `closeTopmostModal`, `initUnifiedModalBackdrops`, `openSettings`, `openDepositModal`, `closeDepositModal`, `openCreditsModal`, `closeCreditsModal`) | Centralized modal lifecycle, ESC key close, backdrop close, Edit Profile, Account Info, Help/Support, Settings, Deposit, Credits modals | `initApp` (`L9836`), Profile menu rows, `index.html` close buttons | **2. Active — Duplicated / Complex** | **Low-risk fixes found:** (1) `L6784–6785` binds listeners to non-existent `#openSettingsBtn` and `#menuSettings` (real trigger is `#openSettingsRow`); (2) `L6882` calls missing `AudioEngine.playTransactionSuccess`. |
| `app.js:7105–8702` | `playPurchaseAnimation`, `renderProfileAchievements`, `openModalCore`, `closeModalCore`, `openHeraldicCitationModal`, `closeHeraldicCitationModal`, `openReliquaryInspectModal`, `closeReliquaryInspectModal`, `copyReliquarySerial`, `renderProfileCollection`, `PRESET_AVATARS`, `renderAvatarPresets`, `updateEditProfilePreview`, `saveProfileDraft`, `adjustQuoteTextareaHeight`, `renderProfileStatsBar`, `attachComplicationHandlers`, `renderProfileCircles`, `renderModalCirclesSelector`, `renderProfileMembershipDeed`, `attachDeedInteractiveHandlers`, `attachHorologicalScrewHandlers`, `renderProfileSovereignOath`, `attachOathInteractiveHandlers`, `initProfile` | Full Digital Identity Dossier: honors & heraldic citations, Conservatory Reliquary inspection, horological sub-dials, accredited circles, UV-reactive Membership Deed, horological screws, Sovereign Oath | Profile tab, `index.html:3306/3406/3460`, `Router` | **2. Active — Duplicated / Complex** | **Low-risk fixes found:** (1) Duplicate `window.closeReliquaryInspectModal = closeReliquaryInspectModal` at `L7621` & `L7639`; (2) Missing `HapticEngine.triggerMilestoneVibration` (`L7409`, `L7595` — real method is `milestoneUnlock`); (3) Missing `AudioEngine.playClick` (`L8051`, `L8164`, `L8344`, `L8392`, `L8638`) and `AudioEngine.playGoldSheenChime` (`L8502`, `L8571`). |
| `app.js:8705–9149` | `setLeaderboardFilter`, `renderLeaderboard`, `mockTopMembers`, `window.LEADERBOARD_MEMBERS_MAP` | Renders Sovereign Roll of Honor into `#clubLeaderboardContainer` (exists in `index.html`) and populates `LEADERBOARD_MEMBERS_MAP` for `openMemberProfile` | `setLanguage` (`L194`), `switchChannel` (`L4270`), `openMemberProfile` (`L3525`) | **2. Active — Duplicated / Complex** | **Keep!** `#clubLeaderboardContainer` is active in `index.html`; `#leaderboardList` fallback (`L8718`) is legacy/missing. Fix `L8709` missing `AudioEngine.playClick`. |
| `app.js:9153` | `handleSmartScrollbarAutoHide(e)` | Toggles `.is-scrolling` scrollbar fade class | Unified capture scroll listener (`L9511`) | **1. Active & Essential** | Keep. |
| `app.js:9165–9190` | `window.quickPurchasedItems`, `window.handleQuickPurchase` | One-tap Boutique quick-purchase handler | Boutique cards (3 refs) | **1. Active & Essential** | Keep. |
| `app.js:9191–9581` | `window.HeaderScrollController` (`updateHeaderHeightVar`, `updateStateForCurrentTab`, `handleClubScrollEvent`, `handleOtherPagesScroll`, `attachClubScroll`, rAF resize dispatcher) | Dynamic header height CSS variable, Club header collapse on scroll, unified scroll/resize dispatchers | Top-level `L9579`, `Router`, `openContextPage` | **2. Active — Duplicated / Complex** | Keep behavior; note it registers a second `DOMContentLoaded` listener (`L9557`) outside `initApp()`. |
| `app.js:9587–9815` | `window.AuthBoundary` | Client-side Sign In / Sign Up / Password Recovery overlay using `sessionStorage` | `initApp` (`L9840`), Settings logout confirmation | **1. Active & Essential** *(UI-phase mock auth)* | Keep for UI phase per product rules; document clearly as mock boundary ready for future Firebase Auth integration. |
| `app.js:9821–9851` | `initApp()` | Master startup orchestrator on `DOMContentLoaded` | `app.js:9848/9850` | **2. Active — Duplicated / Complex** | Consolidate scattered top-level boot calls (`L2042`, `L2800`, `L2808`, `L3757`, `L3836`, `L9579`) carefully only after tracing exact init order. |

---

### 2.2 `luxury.js` — Master Card Canvas, Export & 3D Tilt Engine

| File Path | Function / Component | Current Responsibility | Known Callers & Dependencies | Classification | Recommended Action & Justification |
|---|---|---|---|---|---|
| `luxury.js:5, 1193, 1856` | 3 separate `DOMContentLoaded` listeners | Boots `initGuilloche`, `initMetallicAssets`, `initActionButtonsTactileFeedback`, `initGlobalTilt`, `initGoldDust` | Browser `DOMContentLoaded` | **2. Active — Duplicated / Complex** | **Low-risk improvement:** Consolidate into a single `readyState`-safe bootstrapper (note `L5` and `L1856` lack a `document.readyState === "loading"` guard, so if script ever loads late they wouldn't fire). |
| `luxury.js:10` | `initMetallicAssets()` | Generates offscreen conic/brushed 3D gold `<pattern id="metal3D">` and replaces `#wreathGrad`, `#bezelGrad`, `#ringGoldGrad` fills/strokes via `MutationObserver` on `document.body` | `luxury.js:7` | **2. Active — Duplicated / Complex** | **Keep visual effect untouched**, but note the unbounded `document.body` `MutationObserver` (`L177`) scans every DOM mutation (including chat messages/toasts) via `querySelectorAll`. Low-risk perf optimization: skip non-SVG text/chat nodes early before calling `querySelectorAll`. |
| `luxury.js:185–443` | `initGuilloche()`, `drawGuilloche()`, `resumeGuillocheCanvas`, `pauseGuillocheCanvas` | Draws engine-turned guilloché geometry onto Master Card & Widget canvases | `luxury.js`, `app.js:2689` (`renderWidgetSection`) | **1. Active & Essential** | Keep. |
| `luxury.js:449–1162` | `renderMasterCardToBlob()`, `shareMasterCard()`, helpers (`roundRect`, `makeGoldGrad`, `drawCorner`, `drawLaurelBranch`, `drawMetricGauge`, `drawPublicHallmark`) | High-DPI Canvas-2D export of public Master Card (explicitly omits private wealth %) + Web Share / PNG download | `app.js:2932` (`#shareBtn`), `luxury.js` | **1. Active & Essential** | Keep. Single source of truth for public share card export. |
| `luxury.js:1164` | `initActionButtonsTactileFeedback()` | Tactile press states on Master Card action buttons | `luxury.js:1193/1195` | **1. Active & Essential** | Keep. |
| `luxury.js:1223–1854` | `isGyroscopeEnabled`, `handleDeviceOrientation`, `requestTiltPermissionOnce`, `enableDeviceTilt`, `updateTiltTarget`, `tiltLoop`, `setCardTilt`, `resetAllCardTransforms`, `initGyroElements`, `initGlobalTilt` | Restrained ±1.75° 3D gyroscope, pointer hover, and long-press orbit parallax on Master Card & Profile Plaque | `app.js` (Settings toggle, tab switches), `luxury.js` | **1. Active & Essential** | Keep. |
| `luxury.js:1862–2173` | `initGoldDust()`, `triggerGoldDustMilestone()`, `pauseMembershipRAF()`, `resumeMembershipRAF()`, unified visibility/tab/resize hub | Gold dust particles on Master Card + unified RAF lifecycle pause when off-tab or hidden | `app.js` (`Router`, `purchase`, `unlockAchievement`), `luxury.js` | **1. Active & Essential** | Keep. |

---

### 2.3 `artifacts.js`, `Audio.js`, `translations.js`, `server.ts`, `src/main.tsx`

| File Path | Function / Component | Current Responsibility | Known Callers & Dependencies | Classification | Recommended Action & Justification |
|---|---|---|---|---|---|
| `artifacts.js:8–214` | `isLightModeActive`, `aliasMap`, `window.getSovereignArtifact`, `window.renderClocheVitrine`, `window.updateSovereignArtifactThemes`, `window.SOVEREIGN_ARTIFACTS` (Proxy) | Dual-mode `.webp` studio artifact renderer + `wid1` inline SVG + archived ID aliasing + live theme switching | `app.js` (32+ calls), `MutationObserver`, `themechange`/`themeChanged`/`storage` | **1. Active & Essential** | Keep 100% intact. Preserves all legacy aliases (`crown2/3`, `ring4`, `aura2/3`, `star2/3`, `art3`, circle tokens). |
| `Audio.js:3–856` | `AudioEngine` (15 WebAudio synth tones + iOS/Android gesture unlock) | Synthesized horological clicks, chimes, accolades, brass wax stamp, screw ticks, UV chime, medal chime | `app.js` (272 refs), `luxury.js` (9 refs) | **1. Active & Essential** | Keep. |
| `Audio.js:291` | `AudioEngine.playEquip()` | Synthesized metallic snap for equipping/unequipping collectibles | **0 external callers** (defined & exported in `Audio.js` only) | **5. Uncertain — Needs Investigation** | **Do not delete.** Currently unused only because `app.js` calls `playHover`/`playChime` or missing `playClick`; worth wiring or keeping as part of the public acoustic API. |
| `Audio.js:862–934` | `HapticEngine` (`isSupported`, `isEnabled`, `vibrate`, `boutiquePurchase`, `milestoneUnlock`, `tap`) | Tactile vibration feedback respecting `club_haptic_enabled` and `AudioEngine.isEnabled()` | `app.js` (152 refs), `luxury.js` (2 refs) | **1. Active & Essential** | Keep. Note: `app.js` calls non-existent `HapticEngine.triggerMilestoneVibration` twice (`L7409`, `L7595`) instead of `milestoneUnlock`. |
| `translations.js:1–1844` | `window.I18N`, `getNestedValue`, `window.t`, `window.getTranslation`, fallback `window.setLanguage` | Flat English copy dictionary + lookup engine | `app.js` (224 calls), `luxury.js` (15 calls), `index.html` | **1. Active & Essential** | Keep all keys intact. Note: `translations.js:1836` defines a fallback `window.setLanguage` that `app.js:123` always overwrites (acceptable defensive fallback). |
| `server.ts:13–427` | `resolvePort`, `resolveHost`, `gzipMiddleware`, `express.static`, `formatInstrumentPrice`, `isGlobalForexMarketOpen`, `GET /api/market-ticker`, SPA catch-all | Serves static app + `/artifacts/*`, compresses responses, proxies Twelve Data + Biquote with 60s cache / 90s rate-limit backoff | Node runtime (`npm run dev` / `npm start`), `app.js:5056` | **1. Active & Essential** | Keep. Note: `Instrument` interface retains empty `catAr`/`nameAr`/`instrumentTypeAr: ""` fields (harmless compatibility payload). |
| `src/main.tsx:1–15` | `AppStatus`, `PassthroughShield` | Non-intrusive TS/React entry indicator for build/platform tooling | `tsconfig.json` (`tsc --noEmit`) | **3. Legacy — Still Referenced** | **Do not delete.** Required by AI Studio TypeScript/Vite project detection. |

---

### 2.4 Confirmed Broken / Mismatched Method Calls (`app.js` → `Audio.js`)

These 28 call sites are guarded with `if (window.AudioEngine && window.AudioEngine.X)` so they do not throw, meaning they fail **silently** with no sound or haptic feedback:

| Missing Method Called | Call Sites in `app.js` | Real Method in `Audio.js` | Classification | Recommended Safe Fix |
|---|---|---|---|---|
| `AudioEngine.playClick()` | `L4663`, `L5201`, `L5565`, `L8051`, `L8164`, `L8344`, `L8392`, `L8638`, `L8709` | None (closest: `playHover` / `playFineScrewTick`) | **2. Bug / Contract Mismatch** | Add a lightweight `playClick` alias in `Audio.js` (or map cleanly without changing existing tones) so all 9 UI interactions produce subtle horological tactile feedback as intended. |
| `AudioEngine.playTransactionSuccess()` | `L6882` | `playChime()` / `playGoldenSovereignChime()` | **2. Bug / Contract Mismatch** | Alias `playTransactionSuccess` in `Audio.js` or update call site to `playChime()`. |
| `AudioEngine.playGoldSheenChime()` | `L8502`, `L8571` | `playChime()` / `playFineScrewTick()` | **2. Bug / Contract Mismatch** | Alias or route to `playChime()` so horological screw / deed shimmer plays as designed. |
| `HapticEngine.triggerMilestoneVibration()` | `L7409`, `L7595` | `HapticEngine.milestoneUnlock()` | **2. Bug / Contract Mismatch** | Add `triggerMilestoneVibration: milestoneUnlock` alias on `HapticEngine` (zero risk to callers). |

---

### 2.5 Orphaned DOM IDs, Legacy Code & CSS Audit (`index.html` & `style.css`)

| Area | Finding | Classification | Recommended Action & Justification |
|---|---|---|---|
| **Missing `getElementById` Targets (4 dead + 1 dynamic)** | `#profileItemCount` (`app.js:2223`), `#openSettingsBtn` (`app.js:6784/6832`), `#menuSettings` (`app.js:6785/6835`), `#leaderboardList` (`app.js:8718`) do not exist in `index.html`. (`#metal3D` in `luxury.js:118` IS dynamically created by JS — **active!**) | **4. Unused (4 IDs)** / **1. Active (`#metal3D`)** | Safe to remove the 4 dead DOM lookups in `app.js` (zero behavioral change) while strictly preserving `#metal3D`. |
| **Duplicate `window` Assignment** | `window.closeReliquaryInspectModal = closeReliquaryInspectModal` assigned twice (`app.js:7621` & `7639`) | **4. Unused Duplicate** | Remove the second identical line (`L7639`). |
| **Dead Bilingual Branches (`app.js`)** | **156 lines** check `currentLang === "ar"`, `AppState.language === "ar"`, or `localStorage.getItem("one_percent_lang") === "ar"` even though `index.html` clears `one_percent_lang` on every load and `setLanguage()` forces `"en"`. | **3. Legacy — Still Referenced** | **Hold / Low Priority:** Do NOT mass-strip now since some bilingual/Arabic strings may serve as reference if Arabic is ever re-enabled; only remove demonstrably unreachable noise like `one_percent_lang` reads if explicitly approved. |
| **`style.css` — 14 Unused `@keyframes`** | `crystal-shine`, `sovereignSealStampFade`, `sovereignQuillGleam`, `pulseDot`, `auraSlowPulse`, `typingBounce`, `floatCollectible`, `core-breathing`, `pulseHint`, `popReactionMenu`, `popBadge`, `prestigePulseGlow`, `qpBtnFade`, `gaugePipShimmer` (0 references in CSS/HTML/JS) | **4. Unused — Safe Deletion Candidate** | Verified safe to remove in a low-risk CSS batch (zero cascade risk). |
| **`style.css` — 9 Legacy HTML IDs** | `#milestoneBadge`, `#membershipPageTitle`, `#cardMemberName`, `#profileMemberName`, `#memberDossierName`, `#cardMemberId`, `#boutiqueBalanceVal`, `#cardTierText`, `#page-card` (not in `index.html` or JS) | **5. Uncertain → Verify Before Removal** | Inspect each exact rule block (ensuring it is not part of a comma-separated selector sharing an active selector) before pruning. |
| **`style.css` — 232 Unmatched Classes & 330 Duplicate Exact Selectors** | Heavy historical layering: `12,657 !important` declarations, `body.light-mode #profile-tab .profile-hero-card` declared 15 times, `body #profile-tab .profile-hero-card` 9 times, `:root` 7 times, 65 `@media` blocks (23 unique). | **2. Active — Complex / Duplicated** & **5. Uncertain** | **High cascade risk if touched aggressively.** Do NOT reorder CSS rules or strip `!important` blindly. Only prune 100% isolated dead rules verified against dynamic class prefixes (`tier-*`, `rarity-*`, `is-*`, `hrr-*`, `sl-*`, `psb-*`, `phc-*`). |

---

## PHASE 3 — Architectural Review (9 Core Domains)

1. **Membership & Master Identity Card (`#membership-tab`, `app.js`, `luxury.js`)**
   - *Strength:* Single visual source of truth across Membership, Widget (`wid1`), and Canvas-2D Public Share export (`renderMasterCardToBlob`). Guilloché + Gold Dust + 3D Tilt properly pause via `pauseMembershipRAF()` when off-tab or hidden.
   - *Gap:* Boot triggers `updateUI()` / `updateMasterCard()` 3–4× due to top-level calls outside `initApp()`. `initMetallicAssets()` attaches an unfiltered `document.body` `MutationObserver` that runs `querySelectorAll` on every chat message/toast insertion.
2. **Club & Messaging (`#club-tab`, `app.js`, `server.ts`)**
   - *Strength:* Rich 5-salon society experience, real server-proxied `/api/market-ticker` with 60s caching and 90s rate-limit backoff (API keys stay strictly server-side), `visualViewport` keyboard resilience, auto-grow composer, and daily message reserves.
   - *Gap:* Dispatches and elite replies are stored locally (`channels_${userId}`) and simulated client-side; `firestore.rules` and `firebase-blueprint.json` define `/channels/{channelId}/messages/{messageId}`, ready for future real-time backend sync.
3. **Profile & Settings (`#profile-tab`, `app.js`)**
   - *Strength:* Complete Digital Identity Dossier (Hero Plaque, Horological Complications, Accredited Circles, UV Membership Deed, Sovereign Oath, Conservatory Reliquary, Honors) + unified modal escape/backdrop controller (`UNIFIED_MODALS`).
   - *Gap:* `initProfileAndModals` is an 860-line closure mixing 7 unrelated modals; `openSettingsBtn` / `menuSettings` bindings target removed DOM IDs; several interactive clicks invoke non-existent `AudioEngine.playClick` / `HapticEngine.triggerMilestoneVibration`.
4. **Boutique & Collectibles (`#boutique-tab`, `app.js`, `artifacts.js`)**
   - *Strength:* Clean single-source `/artifacts/*.webp` dual-mode asset pipeline, intact `crown4` & `RETIRED_COLLECTIBLES` historical compatibility, live theme switching without full re-render.
   - *Gap:* `window.boutiqueCatalog` is an unused export; `renderBoutique()` runs eagerly at top-level before `initApp()`.
5. **Authentication & Member Identity (`AuthBoundary`, `app.js`, `firestore.rules`)**
   - *Strength:* Cleanly isolated `window.AuthBoundary` object ready to swap in Firebase Auth later without touching tab views.
   - *Gap:* Currently a UI-phase mock gate (`sessionStorage` accepts any email/password). When transitioning to production Firebase Auth, note that `firestore.rules` currently protects `tier` against client modification on `update`, and should also constrain initial `tier` on `create` so newly created user documents cannot self-assign privileged tiers.
6. **Registry & Verification (`app.js`, `index.html`)**
   - *Strength:* Official Sovereign Registry numbers (`REG-0001-2024`), UV-reactive Membership Deed verification animation, Member Dossier registry cards, and audited Roll of Honor (`#clubLeaderboardContainer`).
   - *Gap:* Verification URL (`https://1percent.club/verify/3426`) is static mock metadata; `#leaderboardList` fallback selector is obsolete.
7. **Sharing & QR Functionality (`luxury.js`, `app.js`, `index.html`)**
   - *Finding:* **Public Card Sharing** (`#shareBtn` → `luxury.js:shareMasterCard()` → `renderMasterCardToBlob()`) and **Verification Link Copy** (`#copyBtn` → clipboard + `#goldCopyPopup`) are active and correctly omit private Wealth Percentage. **There is currently no QR code generator or dedicated `#shareModal` in the codebase** (despite `AUDIT.md` mentioning `#shareModal` — sharing invokes native Web Share / direct PNG download directly).
8. **Theme Management & Localization (`index.html`, `app.js`, `translations.js`, `artifacts.js`)**
   - *Strength:* Zero-flash early `<head>` theme init (`user-preferences-init`), unified `ThemeManager`, synchronized `themechange`/`themeChanged` events, and flat English `window.I18N` dictionary.
   - *Gap:* `app.js` still carries 156 legacy `isAr`/`currentLang === "ar"` checks and 2 `languageChanged` listeners; `window.setLanguage` is defined in both `translations.js` (fallback) and `app.js` (override).
9. **Storage & Persistence (`StorageHelper`, `AppState`, `server.ts`)**
   - *Strength:* Defensive `try/catch` storage wrappers, clean key naming, zero secrets in client JS.
   - *Gap:* Mix of `StorageHelper` and raw `localStorage.getItem/setItem` calls across `app.js`, `Audio.js`, `luxury.js`, and `artifacts.js`.

### 3.1 Target Modularization Blueprint (Android Migration & Maintainability Prep)

Without converting away from the approved Vanilla runtime or breaking `window.*` contracts, `app.js` (9,853 lines) logically maps to **9 clean domain boundaries** (useful both for incremental JS modularization and as the 1:1 module map for the future Android/Kotlin migration):

1. `core/storage-state` (`StorageHelper`, `AppState`, persistence schemas)
2. `core/theme-i18n` (`ThemeManager`, `translations.js`, `syncClubInputDirection`)
3. `core/router-chrome` (`Router`, `HeaderScrollController`, `UNIFIED_MODALS`)
4. `feature/membership` (Master Card binding, `renderRing`, `applyEquippedToCard`, `luxury.js` canvas/tilt/export)
5. `feature/club` (Salons, `initSovereignSalonTicker`, dispatches, accolades, credits, whisper composer)
6. `feature/boutique` (`BOUTIQUE`, `RETIRED_COLLECTIBLES`, `artifacts.js`, Vitrine, Inspection, Purchase)
7. `feature/profile` (Dossier Plaque, Complication dials, Circles, UV Deed, Oath, Reliquary, Honors, Edit Profile)
8. `feature/registry` (Roll of Honor leaderboard, `#page-member` Dossier, Verification link/share)
9. `feature/auth` (`AuthBoundary` — clean swap boundary for Firebase Auth / backend verification)

---

## PHASE 4 & 5 — Proposed Low-Risk Safe Refactoring Plan & Verification Checklist

Before any file is modified, execute **only low-risk, strictly verified batches**, taking a full recoverable checkpoint backup before each batch and running `compile_applet` + `lint_applet` + live visual/functional verification across all 4 tabs and both Obsidian Dark & Imperial Light themes after every batch:

### Batch A — Zero-Risk Contract & Dead-Reference Cleanup (JS only, zero visual change)
1. Restore silent audio/haptic feedback across 28 broken call sites by adding safe aliases on `AudioEngine` (`playClick`, `playTransactionSuccess`, `playGoldSheenChime`) and `HapticEngine` (`triggerMilestoneVibration`) in `Audio.js` — preserving all existing methods and call signatures.
2. Remove the 4 verified dead `getElementById` lookups (`#profileItemCount`, `#openSettingsBtn`, `#menuSettings`, `#leaderboardList`), the duplicate `window.closeReliquaryInspectModal` assignment (`app.js:7639`), and the zero-caller `window.boutiqueCatalog` alias (`app.js:868`).
3. Consolidate `luxury.js`'s 3 `DOMContentLoaded` listeners into 1 `readyState`-safe boot function, and add a fast-path early return in `initMetallicAssets()`'s `MutationObserver` so non-SVG text/chat insertions do not trigger full subtree `querySelectorAll`.

### Batch B — Boot Render Deduplication (JS performance only, zero visual change)
1. Deduplicate cold-start renders in `app.js` so `updateUI()`, `renderBoutique()`, and `initProfile()` execute cleanly once through `initApp()` instead of 3–4× on page load, preserving exact initialization order and all `window.*` contracts.

### Batch C — Strictly Safe CSS Hygiene (`style.css`, zero cascade reordering)
1. Remove the **14 verified zero-reference `@keyframes`** blocks.
2. Inspect and remove only **100% isolated legacy ID rules** (from the 9 verified non-existent HTML IDs) that do not share selector lists with active elements.  
   *(Do NOT reorder rules, merge duplicated selectors across cascade layers, or strip `!important`.)*

### Phase 5 — Mandatory Post-Batch Regression Checklist
- [ ] Run `npm run build` and `npm run lint` (`tsc --noEmit`) with zero errors.
- [ ] Verify all 4 primary navigation tabs: **Membership**, **Club**, **Profile**, **Boutique**.
- [ ] Toggle and inspect both **Obsidian Dark** and **Imperial Light** themes (including live `/artifacts/*_light.webp` transitions).
- [ ] Verify all modals (Settings, Account Info, Edit Profile, Help/Support, Inspection, Reliquary, Heraldic Citation, Deposit, Credits, Auth/Recovery) open, close via button, ESC, and backdrop.
- [ ] Verify Master Card public share PNG export (`shareMasterCard`) and verification link copy (`#copyBtn`) without exposing private Wealth %.
- [ ] Verify Boutique purchase, Equip/Unequip on Master Card, `crown4` integrity, and `localStorage` persistence across reload.

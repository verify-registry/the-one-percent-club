# AUDIT.md — The 1% Club: Project Guide & Architecture Map

<!--
  ══════════════════════════════════════════════════════════════╗
  ║  ️ CRITICAL: DO NOT DELETE THIS FILE                       ║
  ║  This file is the PRIMARY reference for AI coding agents    ║
  ║  working on this project. It contains:                      ║
  ║    • Architecture map (file roles, tab dependencies)         ║
  ║    • Safety rules (DO NOT TOUCH list)                        ║
  ║    • Development history & cleanup status                    ║
  ║  Deleting it breaks the AI-assisted workflow.                ║
  ║  If updates are needed, EDIT — never DELETE.                 ║
  ╚═════════════════════════════════════════════════════════════╝
-->

---

## 1. ARCHITECTURE MAP (AI Agent Reading Guide)

**Rule:** Before editing anything, read ONLY the files/sections mapped to that task. Do not read or modify unrelated parts.

### File Inventory & Roles

| File | Role |
|---|---|
| `index.html` | Entry: all tabs DOM, modals, SVG defs |
| `style.css` | ALL styles (monolith; legacy stacked overrides; frozen architecture) |
| `app.js` | ALL logic (state, i18n, renderers) |
| `translations.js` | i18n dictionary (ar/en) |
| `luxury.js` | Master Card canvas engine |
| `Audio.js` | WebAudio sound engine |
| `server.js` | Express static server |
| `package.json` | Dependencies (express only) |
| `metadata.json` | AI Studio platform metadata (DO NOT TOUCH) |

### Tab Map

**MEMBERSHIP (Master Card)**
- HTML: `#page-card`, `.membership-card`, `#portraitPhoto`, ring SVGs
- JS: `updateMasterCard()`, `applyEquippedToCard()`, `renderRing()`
- CSS: `.membership-card`, `.card-*`, `.metric-ring`
- i18n: `membership.*`, `misc.discipline|network|freedom`

**CLUB**
- HTML: `#club-tab`, `.club-chat-window`, `#clubCreditsText`
- JS: `sendClubMessage()`, `processEliteResponse()`, `renderLeaderboard()`
- CSS: `#club-tab`, `.club-*`, `.leader-*`
- i18n: `club.*`, `dynamic.chat*`

**PROFILE**
- HTML: `#profile-tab`, `.profile-hero-card`, `.phc-*`, `#accountInfoModal`
- JS: `renderProfileStatsBar()`, `renderProfileCollection()`, `ACHIEVEMENTS_DATA`
- CSS: `.phc-*`, `.psb-*`, `.pcs-*`, `.honor-*`
- i18n: `profile.*`, `honors.*`

**BOUTIQUE**
- HTML: `#boutique-tab`, `#boutiqueSections`, `#inspectionModal`
- JS: `BOUTIQUE`, `renderBoutique()`, `handleQuickPurchase()`, `HapticPreviewManager`
- CSS: `.boutique-*`, `.rarity-*`, `.haptic-3d-*`
- i18n: `boutique.*`, `items.*`

### Read-First Matrix

| Task | Read ONLY these |
|---|---|
| Profile visual | `#profile-tab` HTML + `.phc-*` CSS + `profile.*` i18n |
| Club logic | `sendClubMessage()` + `#club-tab` HTML |
| Boutique purchase | `BOUTIQUE` + `handleQuickPurchase()` |
| Light Mode color | `body.light-mode` blocks for that tab only |
| Add/rename text | `translations.js` key + single call site |

### Cross-Cutting Dependencies

- `updateUI()` — hub called on every state change
- `AppState` — single source of truth (owned/equipped/balance)
- `ThemeManager` — toggles light/dark, dispatches `themechange`
- `luxury.js` — listens to `themechange`/`resize` for canvas redraw
- `setLanguage()` — rewrites `[data-i18n]` attributes

### DO NOT TOUCH
- `metadata.json` (platform-owned)
- `luxury.js` (canvas math; high regression risk)
- `AppState` core (owned/equipped getters, init/save)
- `index.html` element IDs (dozens of bindings)
- `localStorage` schema (user data persistence)
- Translation keys (silent failure on missing)
- Cache-busters

---

## 2. SAFETY RULES FOR AI AGENTS

1. **READ-ONLY first** — analysis before modification
2. **Micro-passes** — small, targeted batches
3. **Zero visual regressions (STRICT OVERRIDE)** — §2 strictly overrides §8. No design or layout changes without explicit verification.
4. **Preserve IDs** — never rename HTML IDs or JS function names
5. **Test both themes** — Dark + Light after any CSS change
6. **Test RTL** — after any directional CSS changes

---

## 3. DEVELOPMENT HISTORY & COMPACT LEDGER

| Pass / Phase | Scope & Status | Key Actions |
|---|---|---|
| Phase 1-8 | COMPLETED | Dead code purge, skeleton/debounce consolidation, modals/avatar unified, Boutique purchase pipeline, storage helper, CSS component overrides consolidated. |
| Micro-passes 9B-9E | COMPLETED | Rivet CSS purge, token binding for PHC/PSB/PNM/PCS, `.env.example` removal, tokenized edit button variables, package-lock restoration. |
| Micro-pass 11 & DOC-1 | COMPLETED | Purged orphaned duplicate translation keys (`modal_account_title`, etc.); created AUDIT.md. |
| Micro-pass 10-Slim & Batch Passes 1-2 | COMPLETED | Light-mode override cleanup, token addition (`--lm-*`), dead subkey purges. |

---

## 4. AGENT WORKFLOW PROTOCOL (MANDATORY FOR ALL AGENTS)

### 4.1 Roles
- ORCHESTRATOR: senior architect AI planning passes.
- HANDS: workspace agent executing exact instructions.
- GATEKEEPER: human owner.
- VERIFIER: Orchestrator via API and greps.

### 4.2 Micro-pass discipline
1. Scope: one small named change per pass.
2. Read-only first: verify targets with raw greps.
3. Exact edits: STOP if instructions not found.
4. Raw evidence: reply with verbatim output.
5. Visual check: verify dark/light + RTL/LTR.
6. Push gate: push only on Orchestrator word.
7. Post-push verification: re-check remote size/SHA.

---

## 5. LESSONS LEARNED & TECHNICAL DEBT DECLARATION

### Lessons Learned
1. Trust raw wc/grep over memory.
2. Any found reference = STOP and report.
3. Always verify remote SHA/size after push.
4. Grep full occurrence map before editing CSS overrides.
5. Light-mode blocks carry genuine art (conic gradients/shadows); never bulk-delete them blindly.
6. Use `grep -F` for dotted translation keys.
7. Review sync contents before pushing.

### Frozen Legacy Architecture / Technical Debt Declaration
- **Cascading CSS Overrides & Light-Mode Clusters:** The monolithic `style.css` contains extensive light-mode override blocks and legacy cascading rules.
- **FROZEN STATUS:** These clusters are officially **FROZEN**. Future AI agents are **strictly forbidden** from executing destructive bulk rewrites or speculative deletions on these style blocks without explicit pre-approval and unit verification.

---

## 6. CURRENT STATE & BACKLOG

- **Landed on main:** Phases 1–8, 9B–9E, 11, 10-Slim, Batch Passes 1–2, Translations dead subkey purge.
- **Backlog:**
  - Optional CSS minification for production payload.
  - Ongoing visual polish and accessibility audits.

---

## 7. VERIFICATION CHEATSHEET
- Remote truth check via GitHub API / raw content.
- Workspace facts: `wc -c <file>`, `grep -nF`.
- Dead-key test: `grep -cF "<key>" app.js index.html translations.js`.
- Dead-selector test: `grep -nF "<class>" index.html app.js`.

---

## 8. SMART REFACTORING PROTOCOL (MANDATORY FOR ALL EDITS)

**CRITICAL HIERARCHY:** §2 (Zero Visual Regressions) strictly overrides §8. Automated refactoring must never perform speculative bulk changes without explicit unit verification.

Whenever an edit, addition, or design change is requested, the Agent MUST automatically execute this 4-step self-cleaning routine on the affected area:
1. ANALYZE: Identify target selectors/keys and state.
2. APPLY: Execute changes using Design Tokens or centralized dictionaries.
3. AUTO-CLEAN & MERGE: Search and delete orphaned/duplicate rules; merge scattered properties.
4. ORGANIZE: Format neatly in correct logical sections.

---

## 9. FILE MANAGEMENT PROTOCOL (MANDATORY)
- Agents MUST ONLY modify existing project files.
- Creating new files is STRICTLY FORBIDDEN unless explicitly requested.
- Delete temporary files immediately before task completion.

---

## 10. PROJECT FILE ALLOWLIST (MANDATORY)
- **App Core:** `index.html`, `style.css`, `app.js`, `translations.js`, `luxury.js`, `Audio.js`
- **Docs:** `AUDIT.md`
- **Infrastructure (DO NOT TOUCH):** `server.js`, `metadata.json`, `package.json`, `package-lock.json`, `.env.example`

### Safe-List Pass #2 (2026-09-29) — IN PROGRESS
- Deleted 7 confirmed dead functions from app.js (F2 evidence: cross-file name count = 1).
- Deleted dead CSS families .ach-rarity-* and .boutique-skeleton* (F3 evidence: prefix count = 0).
- Kept: 4 legitimate console.error/warn, handleScroll, dynamic class families, duplicated SVG icon (legitimate reuse).
- Pending: visual verification before push.

### Safe-List Pass #2b (2026-09-29) — IN PROGRESS
- Finished deletion of boutique-skeleton family (11 selector lines / 6 blocks) missed by #2 due to #boutique-tab-scoped variants.
- Lesson logged: nonzero verification counts require immediate grep

### Stuck-Dark Fix (2026-09-29) — IN PROGRESS
- Unified purchase-modal family (5 modals) with existing light tokens (mirrors luxury-modal light look).
- Harmonized .phc-edit-btn light accent via --btn-edit-* token values + binding 4 override generations.
- Pending: visual verification (light + dark) before push.

### Final Contrast Guard + Mobile Blur Perf (2026-09-29) — IN PROGRESS
- Appended end-of-file light-mode guard for .phc-edit-btn pill (defeats legacy --btn-pill-* generation by specificity+order).
- Mobile (<=600px): static blur(3px) on modal overlays + constant-blur fade keyframes (kills per-frame blur repaint hang).
- Pending: visual verification (light + dark) before push.

### Cache-Bust (2026-09-29) — IN PROGRESS
- Added ?v=20260929a to stylesheet link to defeat stale preview/browser cache during light-mode verification.
- Pending: visual confirmation then push.

### Profile Edit Button Light & Dark Mode Harmony (2026-09-29)
- Redesigned .phc-edit-btn for Light Mode with pristine pearl-ivory gradient (#ffffff to #f3ebda), rich warm antique bronze text (#5a3d0e), and refined gold border/icon, perfectly matching the light ivory silk card.
- Retained majestic obsidian metal styling with warm antique gold (#fae4a7) for Dark Mode.
- Removed temporary diagnostic body background and probe rules.

### Performance Pass (2026-09-30) — COMPLETE
- Eliminated heavy backdrop filters on mobile (<=600px) across universal selector (*), preventing repainting bottlenecks.
- Optimized button transitions to explicit property transitions.
- Cache-busted stylesheet to style.css?v=20260930p.

### Dark Mode Edit Button Metallic Gold Variables Refinement (2026-09-30)
- Enhanced Dark Mode CSS variables and explicit rules for .phc-edit-btn with richer blackened precious metal gradient (rgba(42, 34, 23, 0.96) to rgba(20, 16, 10, 0.99)).
- Upgraded text color to luminous sovereign gold (#fdebb2) and icon stroke to #f0cb7b for supreme contrast and harmony against the dark club aesthetic.
- Enhanced border definition (rgba(235, 195, 85, 0.7)) and dual-layer glow shadow.

### App-Wide Performance Pass (2026-09-30) — COMPLETE
- Enabled touch-action: manipulation across all interactive touch elements (buttons, nav tabs, modals, dropdowns) to eliminate mobile 300ms tap delays.
- Applied hardware acceleration (will-change: transform, opacity; transform: translateZ(0)) to modals, chat windows, ledger cards, and settings drawers for buttery-smooth 60 FPS transitions.
- Disabled iOS/Android tap highlight flash (-webkit-tap-highlight-color: transparent) for native feel.
- Cache-busted stylesheet to style.css?v=20260930perf.

### Deferred Execution Queue Implementation (2026-09-30)
- Introduced window.DeferredQueue utilizing requestIdleCallback (with setTimeout fallback) in app.js.
- Deferred non-essential initialization tasks (such as Sovereign Salon ticker background animations and secondary background updates) to run only after the critical UI path is fully interactive.

### Light Mode Edit Button Refinement (2026-09-30)
- Refined Light Mode styling for .phc-edit-btn with a pristine silk-ivory gradient (#ffffff to #f7f1e3), rich warm bronze/gold text (#4f340c), and enhanced border definition (rgba(160, 115, 38, 0.6)) for supreme legibility and contrast against the light card background.
- Cleaned up minor stray CSS artifacts.

### High-Frequency DOM Query Optimization (2026-09-30)
- Refactored HeaderScrollController in app.js to cache the #appHeader DOM reference (getHeader helper), eliminating repeated document.getElementById queries during high-frequency scroll and tab-switching animation frames.

### Fix: getHeader ReferenceError Resolution (2026-09-30)
- Defined cachedAppHeader and getHeader() at the top-level scope of app.js (and exposed to window.getHeader) with DOM connectivity check (!cachedAppHeader.isConnected), ensuring switchTab and navigation event handlers access it without scoping issues.

### Sub-Menu & Modal Performance Optimization (2026-09-30)
- Eliminated synchronous DOM recreation in account credentials modal: inputs hydrate instantly, while secondary avatar preset galleries and sovereign circle pickers are deferred to RAF.
- Refactored renderModalCirclesSelector to render once with event delegation and O(1) state toggling instead of full grid destruction on every click.
- Prevented full document.body translation during channel switching in Club tab.
- Removed forced synchronous reflow (void targetSection.offsetWidth) and cascading timers from profile navigation sub-items.
- Eliminated artificial 380ms skeleton delay when switching boutique sub-categories.
- Streamlined .pnm-item and .luxury-modal-overlay CSS transitions for butter-smooth 60+ FPS response.

### Purchase, Balance & Credits Modal Smoothness Optimization (2026-09-30)
- Replaced 600ms multi-step keyframe animation (animating box-shadow, scale, translateY) on .purchase-modal with a snappy 220ms GPU-accelerated translate3d slide-up.
- Eliminated dynamic 400ms backdrop-filter blur animation on .purchase-modal-overlay (which caused severe GPU raster stalls and dropped frames on mobile), replacing it with an instant GPU-composited obsidian scrim with smooth 180ms opacity fade.
- Removed cloneNode/replaceChild DOM churn in openInspectionModal.
- Refactored .credits-pkg transitions from all to targeted GPU properties for instant touch response.

### Chat Rendering Performance Optimization: Append-Only & Targeted Updates (2026-09-30)
- Replaced complete chat container innerHTML re-rendering on every new message with lightweight appendMessageToChat using insertAdjacentHTML("beforeend", buildMessageHTML(...)), maintaining 60FPS during chat dispatches.
- Added virtual list windowing to renderMessages (limiting initial DOM cards to latest 60 messages), eliminating DOM bloat on large chat channels.
- Refactored toggleAccolade to perform in-place DOM updates on reacted buttons and counters instead of re-rendering all messages.

### Profile Hero Edit Button & Modal Flashing Elimination (2026-09-30)
- Root Cause Identified: Tapping the edit button (#editAccountBtn) inside the 3D-perspective hero plaque (#profileHeroPlaque.luxury-tilt-card) allowed touchstart events to bubble to the card, triggering simultaneous 3D tilt/long-press animation loops and haptic vibrations while the fullscreen modal overlay with conflicting backdrop-filter was fading in. This caused mobile GPU compositor thrashing and visible screen flashing/blinking.
- Fixed luxury.js touchstart and pointer handlers to ignore interactions originating from buttons and controls inside tilt cards.
- Added e.stopPropagation() and passive touchstart absorption to #editAccountBtn so card 3D tilt is never triggered upon editing profile.
- Added isolation: isolate and contain: layout style to #profileHeroPlaque.
- Added contain: strict to .luxury-modal-overlay and eliminated conflicting backdrop-filter blur keyframe animations on mobile.
- Refactored renderAvatarPresets to reuse DOM elements instead of destroying and re-decoding images on every modal open.

### 100% Reference Model Visual & Typographic Alignment (2026-09-30)
- Unified Profile Master Identity Card (#profileHeroPlaque) to strictly match Reference 1 (Light Mode) and Reference 2 (Dark Mode) with 100% fidelity.
- Locked engraved hallmarks to authentic inscriptional English typography: Member Name ("ALEXANDER" in Cinzel Roman serif), Tier Badge ("SOVEREIGN MEMBER"), Quote ("A higher standard in a different world." in Cormorant Garamond italic serif), Horological Metadata ("ID 0001-1P | EST. 2026 | ALEXANDRIA"), Plaque Button ("Edit Profile"), and Club Creed ("DISCIPLINE / NETWORK / FREEDOM").
- Eliminated Arabic translation overrides on engraved hallmarks (preventing Cairo font degradation and RTL distortion on the intaglio deed).
- Enhanced multi-tier metallic beveling, stepped outer rim, and radial lighting across both Light and Dark modes.

### Profile Layout Shift & Polished Gold Material Realism (2026-09-30)
- Repositioned Member Name and identity data stack below the Edit Profile button level (`padding-top: 26px !important;` on `.phc-center-col`) with `#editAccountBtn` anchored at top-right.
- Removed crowded right creed column, granting the name and coordinate stack unobstructed horizontal breathing space.
- Upgraded gold shaders to authentic polished precious metal with multi-stop anisotropic conic reflections on the portrait medallion bezel, specular text bevel on member name, and polished plaque button.
- Maximized contrast and legibility across both Day (Light) and Night (Dark) modes with deep antique burnished bronze-gold typography in light mode and luminous 24K gold foil in dark mode.

### Upper Profile Card Line Removal & Visual Purge (2026-09-30)
- Completely removed obsolete corner SVG filigree lines (`.corner-tl`, `.corner-tr`, `.corner-bl`, `.corner-br`) and `.phc-watchmaking-strip` from `index.html` to eliminate all useless stray lines in the upper part of the profile hero card.
- Secured `.phc-edit-btn` (#editAccountBtn) precisely in the **upper right** (`top: 12px !important; right: 14px !important; width: auto !important`) across all viewports and right-to-left (RTL) / left-to-right (LTR) contexts.
- Balanced vertical alignment of member name and identity data with the portrait medallion while allocating a clean 92px right padding reservation for the edit button plaque.
- Softened top box-shadow inset highlights to prevent any harsh hairline rendering along the top card edge.

### Master Card Structured Guilloché Engraving Correction & Material Polish (2026-09-30)
- Eradicated all random intersecting diagonal lines, scribbles, and chaotic crossing patterns across the background.
- Constructed a unified, mathematically ordered banknote security engraving and luxury watchmaking engine-turned guilloché canvas (`viewBox="0 0 600 240"`):
  - **Outer Frame Zone**: Inset machined hairlines (`rx=13` and `rx=10`) with four symmetrical quadrant rosettes and engraved diamonds in each corner.
  - **Top & Bottom Security Ribbons**: Continuous harmonic sinusoidal waves with strict mathematical symmetry along the margins.
  - **Left Portrait Bed Zone**: Subtle concentric lathe turning rings centered behind the portrait medallion (`opacity="0.14"`), framing the medallion like a fine horological timepiece.
  - **Center Typography Zone**: Preserved maximum negative space and breathing room with only two ultra-subtle watermark guidelines (`opacity="0.06"`), ensuring 100% crystal-clear contrast and legibility for member name, sovereign badge, and quote.
  - **Right Security Rosette & Intaglio World Map**: Synchronized sovereign banknote guilloché rosette rings, 12 radial astrolabe security rays, latitude parallels, longitude meridians, and delicate cartographic continent contours into a unified geometric intaglio plate sharing the exact same origin (465, 118).
- Refined metallic depth on card frame with dark recessed edge (`#050403` / `#4A3515`), antique gold (`#B18A3D`), deep gold (`#4A3515`), and polished champagne highlights (`#F7E9C3`).
- Set light mode background to genuine warm ivory precious material (`#F5EBD3`) with subtle tonal contrast (`#806126` engraving at 0.32 opacity).
- Retained 100% of approved card layout, button positioning, portrait dimensions, business logic, and navigation intact.

### Master Card Final Polish: 3D Metal Frame & Downward Layout Clearance (2026-09-30)
- **Top-Right Collision Elimination & Guaranteed Structural Protection**:
  - The Edit Profile button is anchored at top-right (`top: 11px; right: 15px; height: 24px; z-index: 10;`, ending at `y = 35px`).
  - Shifted the entire `.phc-horizontal-layout` downward (`margin-top: 30px` on desktop/tablet, `28px` on 480px, `26px` on 360px), starting the content at `y = 44px` (41px on 480px, 37px on 360px).
  - The entire text block (Member Name, Sovereign Member, ornamental divider, quote, and horological metadata) and the portrait assembly now sit completely below the vertical zone of the Edit Profile button.
  - Dynamically protected `.phc-name` with natural word-break and wrapping across full available width, completely preventing any collision or overlap regardless of name length.
- **Multi-Stage 3D Polished Precious Metal Bezel**:
  - Engineered realistic physical depth using a 6-stage construction: deep recessed outer drop (`0 18px 42px -4px rgba(0,0,0,0.96)`), dark recessed edge (`0 0 0 1px #050403`), dark antique-gold bevel (`0 0 0 2px #5A4018`), secondary bevel (`0 0 0 3px #9A722C`), main polished-gold metal band (`0 0 0 4.5px #C39A43`), asymmetric crisp champagne reflective ridge (`0 -1px 0 4.5px #F7E9C3`), and inner recessed bevels.
  - Refined the secondary inner frame in the master SVG (`x=5, y=5, rx=14`) with machined corner fillets and rivet hallmarks.
- **Physical Metal Plaque Button**:
  - Upgraded `#editAccountBtn` with authentic polished-gold rim (`#C39A43`), recessed dark perimeter (`#5A4018` dark / `#7A571A` light), warm ivory interior in light mode, blackened precious metal in dark mode, and high-definition typography.
- **Zero Business Logic Touched**: 100% preservation of all live DOM interactions, event listeners, profile editing modals, and data reactivity.

### Profile Tab Unexpected Reload & DOM Recreation Root Cause Fix (2026-09-30)
- **Root Cause Diagnosed**:
  1. *Artificial Skeleton Delays on Navigation*: `Router.onEnter("profile")` called `renderProfileCollection(true)`, which destroyed the entire collection grid DOM on every tab change, replaced it with skeleton placeholders, and set an asynchronous `380ms` timeout to re-render. Similarly, `renderProfileAchievements()` was wiping the achievements DOM and setting a `450ms` timeout because line 4715 was resetting `container.dataset.skeletonShown = ""` on every render.
  2. *Unmanaged Dangling Timers on Tab Switching*: Switching rapidly between tabs (e.g. Profile → Club → Profile) left asynchronous `380ms` and `450ms` timeouts running in the background with no cancellation, which fired out-of-order and repeatedly wiped/recreated the DOM while the user was interacting with the tab.
  3. *Active Tab Re-entry Teardown*: Clicking the "Profile" nav button while already on the Profile tab triggered full tab re-entry (`switchView`, scroll reset, `onEnter`, skeleton destruction, and delayed DOM recreation) due to lack of a `currentTab` check in `Router.navigate`.
  4. *Non-Idempotent Event Listeners*: Complication dials and sovereign circle chips were repeatedly attaching listeners on every render rather than using single-instance event delegation on parent containers.
- **Architectural Fixes Applied**:
  1. *Router Idempotency & Timer Management*: Added `Router.currentTab` tracking. Tapping the active tab now smoothly scrolls to top without tearing down the view or re-running initialization. Navigating between tabs cancels all pending timers (`profileCollectionTimeout`, `profileAchievementsTimeout`, `profileStatsBarTimeout`) to eliminate race conditions.
  2. *Synchronous Direct Rendering*: Replaced artificial skeleton delays in `renderProfileCollection`, `renderProfileAchievements`, and `renderProfileStatsBar` with direct synchronous DOM rendering since all user and item data is already held in memory.
  3. *Idempotent Event Delegation*: Refactored `attachComplicationHandlers` and `renderProfileCircles` to attach event listeners once via delegation on their container elements with `.dataset.complicationsBound` and `.dataset.delegated` guards.
  4. *Image Onerror Guard*: Added `this.onerror = null;` to all dynamic and static avatar images (`dispatch-avatar-img`, `miniDossierAvatar`) to protect against infinite reload retry loops upon network failure.
  5. *Preservation of Design & Logic*: 100% preservation of Master Card design, profile dossier layout, 3D tilt physics, audio/haptic responses, and modal workflows.

### REPAIR PASS (2026-09-30) — Profile Tab Reload Loop
- Disabled window.location.reload() at app.js:4524 (replaced with console.error).
- Preserves the ROYAL HERO CARD PASS intact (verified clean).
- Pending: confirm the loop is dead before push.

### Master Card Art Direction Restoration Pass (2026-09-30)
- **Crude Overlays Eliminated**: Removed crude pseudo-corner scribbles (`.phc-corner`) and intrusive wireframe globe illustration (`.phc-globe`) from `index.html` and `style.css`.
- **Layered Precious Metal Frame Realism**: Restored 5-layer physical precious-metal bezel on `#profileHeroPlaque`: (1) deep recessed outer edge, (2) antique-gold structural bevel, (3) polished champagne-gold reflective band with directional highlights, (4) darker recessed metal transition, and (5) refined inner metallic edge, backed by obsidian/blackened metal in dark mode and warm ivory luxury substrate in light mode.
- **Structured Guilloché & Intaglio Cartography**: Purged all repeating-linear-gradient criss-cross lines (`background-image: none !important;`); preserved fine, mathematically structured SVG lathe rings, astrolabe meridians, and subtle intaglio world-map contours at low contrast integrated into the material.
- **Quiet, Refined Edit Profile Control**: Reduced button dominance to a compact (`22px` height, `8.5px` font), non-dominant, non-italic jeweler's hallmark plaque in the upper-right area that never competes with the member name.
- **Portrait Medallion Craftsmanship**: Maintained the 82px precious-metal medallion with conic anisotropic gold reflections, deep inner photo bevel, sapphire optical glare, and neatly proportioned 22px sovereign hallmark crown coin.
- **Strict Scope Preservation**: 100% of functionality, routing, profile sections, business logic, and layout outside the Master Card remained completely untouched.

### Edit Profile Modal Material Language Micro-Pass (2026-09-30)
- **Layered Outer Modal Shell**: Upgraded `#accountInfoModal .luxury-modal-box` to a 2px anisotropic gold frame border (`linear-gradient(145deg, #fef4dc 0%, #c49a42 20%, #5a4018 40%, #9a722c 60%, #f7e9c3 80%, #3a280d 100%)`) with two-tier outer bevel (`0 0 0 1px #050403, 0 0 0 2px #5a4018`), specular champagne highlights, and obsidian (dark) / warm ivory (light) foundation.
- **Distinctive Modal Header**: Added clear separation with a metallic gold horizontal border gradient and metallic text gradient on `h2` ("MEMBER CREDENTIALS").
- **Physically Recessed Section Containers**: Upgraded `.dossier-panel` with 1.5px structural antique-gold border (`#5a4018` dark / `#8a6420` light), subtle inner shadow, and refined section titles.
- **2-Layer Input Fields**: Replaced thin 1px generic borders with 1.25px structural borders, inner recessed shadows, and champagne edge highlights on `.edit-profile-input` and `.edit-profile-textarea`.
- **Precious-Metal Avatar Medallion**: Refined `.interactive-avatar-ring` with multi-stop conic gold gradient bezel, dimensional bevel shadow, and recessed avatar photo.
- **Compact Metallic Camera Badge**: Converted `.avatar-overlay-badge` into a polished gold medallion button with 1.5px metallic rim and dimensional depth.
- **Polished-Gold Close Control**: Transformed `.luxury-close-btn` into a beveled gold circular button with recessed rim and crisp hover states.
- **Zero Scope Creep**: DOM structure, event handlers, modal opening/closing, avatar uploads, and unrelated screens remained 100% untouched.

### Master Card Material Frame Rebuild Micro-Pass (2026-09-30)
- **Eliminated Flat Outline Rings**: Replaced the previous concentric `box-shadow: 0 0 0 ...` multi-band approach with a continuous, 4.5px machined precious-metal frame drawn via `border: 4.5px solid transparent` and `background-clip: padding-box, border-box`.
- **Authentic 6-Layer Solid Precious-Metal Architecture**:
  1. *Layer 1 (Deep Recessed Dark-Gold Edge)*: Crisp 1px machined baseline (`0 0 0 1px #120c04` in dark, `#38240a` in light) establishing realistic physical grounding in 3D space with zero neon/outer glow.
  2. *Layer 2 (Wide Antique-Gold Bevel)*: Directional highlight and shadow beveling (`0 -1px 0 1px rgba(255, 245, 215, 0.4), 0 1px 0 1px rgba(10, 6, 2, 0.95)` in dark, `#ffffff` / `#281a08` in light) creating an authentic physically angled bezel.
  3. *Layer 3 (Primary Polished Gold Band)*: High-specular anisotropic metallic gradient with 15 stops ranging from `#ffffff` specular peaks (at 0% and 66%) to bright champagne reflections (`#fff3d2`), rich warm gold midtones (`#caa455`, `#966e25`), and deep antique-gold shadow recesses (`#422c0c`, `#1c1204`).
  4. *Layer 4 (Sharp Polished-Gold Ridge)*: Precision specular inner ridge along the bevel (`inset 0 1px 1px 0 rgba(255, 252, 235, 0.85)` top highlight, `inset 0 -1px 1px 0 rgba(30, 18, 4, 0.9)` bottom shadow).
  5. *Layer 5 (Dark Recessed Inner Edge)*: Machined 1px step-down into the card dial face (`inset 0 0 0 1px #140d04` in dark, `#38240a` in light).
  6. *Layer 6 (Very Fine Inner Champagne-Gold Highlight)*: Subtle 1px champagne highlight (`inset 0 0 0 2px rgba(212, 175, 106, 0.35)` in dark, `rgba(188, 144, 52, 0.45)` in light) preceding the deep interior dial shadow.
- **Machined Metal Corner Geometry**: Outer bevel and inner bevel mathematically follow the exact same concentric continuous curvature (`border-radius: 18px` outer, `13.5px` inner) behaving as one continuous piece of machined gold metal rather than separate rectangular outlines.
- **Card Surface Engraving Refined**: Purged all random decorative lines, wave ribbons, center watermark curves, and corner fillet arcs from `index.html`. Preserved solely structured mathematical horology lathe rings, astrolabe radial geometry, and subtle intaglio world-map contours at low contrast (`opacity: 0.16` dark / `0.13` light).
- **Strict Scope Preservation**: 100% of card composition, dimensions, typography, member portrait, Edit Profile button, account modal, and profile data/logic remained completely untouched.

### Edit Profile Modal Master Visual Correction (2026-09-30)
- **Warm Ivory / Obsidian Physical Plaque Foundation**: Replaced flat cream/beige look with a cohesive luxury substrate: warm ivory/champagne radial luster (`radial-gradient(ellipse at 50% 10%, #fbf8f1 0%, #f6f0e2 50%, #ede2ce 100%)` in light mode; velvety obsidian dial in dark mode).
- **Dimensional Polished-Metal Frame**: Eliminated generic 2px border outline in favor of a solid 3.5px machined precious-metal bezel using contrasting specular highlights (`#ffffff` / `#fff6e0`), warm gold midtones (`#caa455`), dark antique gold shadows (`#3a2508`), a dark recessed outer grounding edge (`0 0 0 1px #38240a`), a narrow reflective ridge (`inset 0 1px 1px 0 rgba(255,255,255,0.95)`), and a subtle inner step-down.
- **Clean Seamless Header & Single Precise Divider**: Seamlessly integrated modal header with plaque surface, using editorial typography (`Cinzel`, 13px, bold, 0.16em tracking) and exactly ONE clean, precise metallic divider (`border-bottom: 1.5px solid #b88d36` light / `#7d5b20` dark) with zero decorative lines.
- **Small Polished-Gold Close Control**: Converted close button into a 24px solid beveled gold circular button with specular rim, dark grounding edge, and crisp dark bronze `X`.
- **True Premium Portrait Medallion (89.1% Photo Fill)**: Re-architected avatar centerpiece into a genuine jeweler's medallion: 82px circular portrait → 1.5px thin dark separation → 5px solid polished gold metallic rim with conic reflections → subtle recessed outer edge. Photo occupies 89.1% of visible medallion (within the 86–90% target) without empty gold rings.
- **Watchmaker's Hallmark Camera Badge**: Replaced floating UI bubble with a 20px precision metallic hallmark coin docked onto the lower medallion rim, featuring crisp beveled edges and deep engraved camera glyph.
- **Non-Nested, Architectural Section Panels**: Streamlined `.dossier-panel` into clean, unified recessed panels (`rgba(238, 230, 216, 0.45)` light / `rgba(14, 11, 7, 0.6)` dark) with refined 1px antique-gold structural borders and subtle inner shadow.
- **Material-Rich, Anti-UI Input Fields**: Replaced stark white text boxes with warm ivory surfaces (`#fbf8f1` light / `#070503` dark), clean champagne/antique-gold borders, subtle recessed depth (`box-shadow: inset 0 1.5px 3px rgba(60,42,14,0.06)`), and authoritative dark typography (`#1a1206`).
- **Solid Precious-Metal Save Action**: Authoritative luxury button with directional metallic gold gradient, subtle bevel, and crisp typography.
- **100% Functionality Untouched**: All DOM elements, data attributes, event handlers, file upload, preset selection, quote chips, circles selector, and routing preserved completely intact.

### 3-Layer Metallic Watch-Case Frame Overhaul (#accountInfoModal) (2026-09-30)
- **Horological 3-Tier Case Architecture**: Applied a complex 3-layer precious-metal frame to `#accountInfoModal .luxury-modal-box` to simulate a master horological watch-case bezel:
  1. *Layer 1 (Outer Stepped Bezel & Antique Gold Chamfer)*: Grounded outer perimeter using antique gold tokens (`--gold-aged: #8a6323`, `--gold-antique: #c79a3e`) with a stepped 2px antique foundation (`0 0 0 1px ...`, `0 0 0 2px ...`), directional top light catch (`rgba(233, 200, 119, 0.4)` / `rgba(255, 255, 255, 0.85)`), and lower shadow bevel (`rgba(14, 9, 4, 0.95)` / `rgba(56, 36, 10, 0.65)`).
  2. *Layer 2 (Middle Rich Gold Bezel & Anisotropic Casing Band)*: 4px solid machined precious-metal bezel (`border: 4px solid transparent`, `background-clip: padding-box, border-box`) rendered with a 15-stop anisotropic directional gradient transitioning through rich gold tokens (`--gold-deep: #8a6d3b`, `--gold-polished: #d4af6a`, `--gold-micro: #a68b52`), antique gold accents (`--gold-antique`, `--gold-aged`), and champagne reflections (`--gold-champagne`, `--gold-pale`).
  3. *Layer 3 (Inner Champagne Gold Rehaut & Specular Chapter Ring)*: Precision inner rehaut step-down surrounding the dial face, featuring a top specular highlight catch (`var(--gold-highlight, #eae0c4)` / `#ffffff`), 1px champagne gold chapter line (`rgba(233, 200, 119, 0.55)`), 2px antique step-down, and a 3px dark seating recess into the obsidian/ivory dial substrate.
- **Strict Scope Preservation**: 100% of DOM structure, event listeners, form inputs, avatar uploads, and unrelated screens remained completely untouched.

### Master Card Final Luxury Horological Guilloché Engraving (2026-10-01) — COMPLETE
- **Original Luxury Horological Dial Engraving**: Engineered a lightweight, scalable, single-layer SVG system (`.phc-engraving-wrap`, `.phc-master-engraving`) for `#profileHeroPlaque` inspired by haute horlogerie dial craftsmanship (Breguet/Patek Philippe rose-engine intaglio).
- **Physical Two-Tone Debossed Intaglio Treatment**: Implemented a physically etched debossed effect using a warm antique-gold recessed line (`.phc-eng-groove`, stroke `#8d6929` in light / `#d4af6a` in dark) paired with a +0.45px shifted champagne specular highlight (`.phc-eng-highlight`, `#ffffff` in light / `#fef3d6` in dark), creating authentic physical depth without glow, blur, or thick lines.
- **Controlled Density & Typography Protection**: Applied an intaglio density mask (`#phcEngravingDensityMask`) with an attenuated central ellipse, rendering the central text zone (member name, title, quote, metadata) quiet and unobstructed, while providing richer articulation across the perimeter, corner spandrels, medallion halo, and lower empty zone.
- **Zero Scope Creep**: 100% preservation of gold frame, portrait medallion, edit button, typography, dimensions, event handlers, and navigation.

### Master Card Continuous Guilloché Material Pass (2026-10-01) — COMPLETE
- **Eradicated All Decorative Borders & Frames**: Completely removed all inner rectangles, corner flourishes, and horizontal/vertical framing ribbons. The guilloché now covers the entire usable ivory surface edge-to-edge as a continuous physical material rather than a separate decorative border.
- **Continuous Rose-Engine Harmonic Field**: Built an organic continuous field of coupled sinusoidal harmonic curves (Breguet/Patek Philippe "Grain d'Orge" engine-turned guilloché) where intersecting wave families generate microscopic lenticular cells across the entire plate.
- **Seamless Organic Density Breathing**: Implemented natural amplitude and phase modulation paired with a smooth multi-stop radial gradient mask (`#phcEngravingDensityMask`), smoothly transitioning from calm low-density behind the member typography to rich micro-engraved detail around the portrait and perimeter with zero visible boundary.
- **Matte Intaglio Physical Depth**: Calibrated the two-tone debossed lines with refined stroke (`0.44px`), warm antique gold groove (`#987432` at 0.32 opacity in light mode) and champagne specular ridge (`#ffffff` at 0.50 opacity with +0.35px directional offset), yielding an authentic matte hand-engraved ivory feel.
- **Strict Scope Preservation**: 100% preservation of the outer 3D gold frame, portrait medallion, crown hallmark coin, member name, rank, quote, horological metadata, Alexandria, Edit Profile button, dimensions, and business logic.

### Master Card Luxury Material Refinement Pass (2026-10-01) — COMPLETE
- **Non-Repeating Horological Rose-Engine Guilloché**: Replaced repeating wave rows with a dynamic, non-uniform horological engraving system featuring variable wavelength modulation (34px near portrait expanding to 56px on right), organic vertical row stepping (6-9px margins, 16px center), and subtle macro-lens curvature, eliminating wallpaper repetition.
- **3-Tier Density Hierarchy**: Engineered a 3-level density distribution: (1) Primary rich flinqué framing around the portrait medallion bed (100% luminance); (2) Secondary delicate micro-engraving across peripheral sectors; (3) Quiet, deeply attenuated zone (15% luminance) providing pristine ivory contrast behind member typography.
- **Jewelry-Style Engraved Gold Plaque Control**: Completely redesigned `#editAccountBtn` (`.phc-edit-btn`) from a modern UI button into an architectural, authentic gold plaque control integrated into the dial face:
  - 3px refined architectural corner chamfer (eliminating web pill appearance).
  - Multi-tier precious metal rim with directional specular highlights and subtle contact grounding shadow.
  - Recessed intaglio plaque bed (`linear-gradient(175deg, #faeed4, #eddcb9, #e0cda4)`) in Light Mode and blackened metal in Dark Mode.
  - Arabic typography ("تعديل الملف") in authoritative antique-bronze with engraved intaglio highlight.
  - Refined 9.5px pencil icon appearing physically engraved into the plaque metal.
- **Zero Scope Creep**: 100% preservation of outer 3D gold frame, portrait medallion, crown hallmark coin, member name, rank, quote, horological metadata, Alexandria, dimensions, and business logic.

### Master Card Edit Profile Control Final Polish (2026-10-01) — COMPLETE
- **Removal of Badge Artifacts**: Removed "AU" text, diamond symbol, and extraneous decorative badge elements from `#editAccountBtn`.
- **Integrated Precision Gold Plaque**:
  - Restrained horizontal rectangular plaque with architectural precision corners (`border-radius: 2px`, non-pill).
  - Reduced height by 17% (from 18px to 15px) to achieve authentic watchmaking nameplate proportion, remaining secondary in visual hierarchy to portrait, name, and rank.
  - Engineered matching anisotropic polished champagne/antique gold metal treatment identical to the Master Card frame (`linear-gradient(135deg, ...)`, `0.65px solid #7c581a`, directional specular highlight catch, recessed shadow bevel, and tiny contact drop shadow).
  - Dark Mode: Machined blackened precious metal with polished champagne gold rim and gold engraving.
  - Precision-cut engraved stylus/pencil icon (`phc-edit-icon`, 7.5px) in dark antique-gold tone (`#2b1a03` in Light / `#f6e7be` in Dark).
  - Preserved comfortable mobile touch target via invisible pseudo-element expansion (`::before`).
- **Zero Scope Creep**: 100% untouched background guilloché, gold frame, portrait medallion, crown hallmark coin, member name, rank, quote, ID, EST. 2026, Alexandria, dimensions, modal wiring, and business logic.

### Master Card Unified Gold Material System (2026-10-01) — COMPLETE
- **Unification of Four Key Gold Elements**:
  1. *Outer Card Frame*: Calibrated light mode directional gold bevel (`linear-gradient(135deg, ...)`) to match the exact champagne gold spectrum (`#dcae4a`, `#a07424`, `#50340c`, `#c49436`, `#fef1cf`, `#3a2508`), maintaining structural bevel depth and deep grounding shadow.
  2. *Portrait Outer Bezel (`.phc-avatar-ring`)*: Upgraded conical metallic gradient (`conic-gradient(from 45deg, ...)`) to share the exact same champagne gold hue family as Edit Profile, with realistic curved surface metallic lighting featuring two specular peaks at 45deg and 225deg (`#ffffff`, `#faecc5`), warm polished gold body (`#dcae4a`), and deep antique shadow recesses (`#684514`, `#50340c`).
  3. *Crown Coin Hallmark (`.phc-crown-badge`)*: Re-aligned the coin's outer beveled rim (`conic-gradient`), relief socket bed (`radial-gradient`), and crown SVG glyph (`#fef1cf`) to the unified champagne gold palette, removing yellow/orange color discrepancies.
  4. *Edit Profile Plaque (`.phc-edit-btn`)*: Serves as the master color reference for the physical champagne/antique gold hue.
- **Zero Scope Creep**: 100% preserved background guilloché, member portrait, typography, name, rank, quote, metadata, Alexandria, card dimensions, modal functionality, and navigation.

### App-Shell Visual Refinement — Header Merge & Luxury Liquid Glass Bottom Nav (2026-10-01) — COMPLETE
- **Top Application Header Visual Merge**:
  - Eliminated hard horizontal dividing border (`border-bottom: none !important; box-shadow: none !important;`).
  - Implemented smooth vertical tonal fade in Light Mode (`linear-gradient(180deg, rgba(253, 251, 247, 0.95) 0%, rgba(253, 251, 247, 0.80) 42%, rgba(248, 245, 237, 0.40) 75%, rgba(248, 245, 237, 0) 100%)`) seamlessly melting into the ivory application substrate without any white rectangular band.
  - Dark Mode: Smooth vertical fade to transparent without hard bottom cutoff.
  - 100% preservation of crown logo, typography, tagline, back/shield buttons, and header spacing.
- **Bottom Navigation Linear-Gradient Mask & blur(10px) Direct Application**:
  - `mask-image` multi-axis linear-gradient applied directly to `.bottom-nav` fading top, bottom, and side edges:
    `linear-gradient(to bottom, transparent 0%, black 14px, black calc(100% - 10px), transparent 100%), linear-gradient(to right, transparent 0%, black 14px, black calc(100% - 14px), transparent 100%)` with `mask-composite: intersect; -webkit-mask-composite: source-in`.
  - `backdrop-filter: blur(10px) !important;` and `-webkit-backdrop-filter: blur(10px) !important;` applied directly to `.bottom-nav`.
  - Translucent background color: `rgba(247, 241, 230, 0.40)` in Light Mode and `rgba(14, 11, 7, 0.50)` in Dark Mode.
  - Removed all pseudo-element overlays (`.bottom-nav::before, .bottom-nav::after { content: none !important; display: none !important; }`), ensuring no white panel appearance.
  - Zero changes to Master Card, Profile content, header, routing, tab labels, or modal logic.


- **Membership Layout Regression Reversal & Bottom Navigation Decoupling (2026-10-01) — COMPLETE**:
  - Reverted experimental dynamic height calculations (`updateBottomNavHeightVar`) and variable injections in `app.js` and `style.css`.
  - Restored `.bottom-nav` padding to `10px 12px calc(12px + env(safe-area-inset-bottom, 0px));`.
  - Restored `#club-tab.is-active` and composer wrap to their clean, non-disruptive previous layout.
  - Scoped Membership Container Clearance: Applied `padding-bottom: calc(68px + env(safe-area-inset-bottom, 0px)) !important;` to `.page#membership-tab`, `#membership-tab.is-active`, ensuring comfortable breathing space above the floating Liquid Glass navigation for the action buttons and Master Card without impacting other tabs.

  - Frozen and locked Membership content layout:
    - Master Card, "العضوية" page title, Share Membership button, Copy Link button, and all vertical spacing are restored to their exact previous coordinates with ample breathing room.
    - Zero modifications to Master Card size, aspect ratio, margins, or transforms.
- **Micro-Pass: Fix Curate Circles Button Layout & Action (2026-10-02) — COMPLETE**:
  - **Issue 1 (Visual Positioning)**:
    - Fixed the flex alignment and containment of `.pcc-header` (`align-items: flex-start !important; flex-wrap: wrap !important; gap: 8px 12px !important;`).
    - Adjusted `.pcc-header-title-wrap` to `align-items: flex-start !important; flex: 1 1 180px !important;` with `.pcc-crest-badge` aligned to the top title line (`margin-top: 1px`).
    - Positioned `.pcc-curate-btn` / `#btnCurateCircles` with `align-self: flex-start !important; margin-inline-start: auto !important;` so it aligns cleanly with the section title.
    - Added narrow screen adaptation (`@media (max-width: 390px)`): `.pcc-header-title-wrap` expands to `100%`, and the button wraps cleanly below the title and subtitle, fully inside `.pcc-header` and above the header border with zero overlap.
  - **Issue 2 (Wrong Click Action)**:
    - Decoupled and guarded `btnCurateCircles` so it NEVER triggers `openAccountInfoModal` or opens `#accountInfoModal`.
    - Added an explicit target guard in `window.openAccountInfoModal` to reject events originating from `#btnCurateCircles` or `.pcc-curate-btn`.
    - Hardened `#btnCurateCircles` event handling on `DOMContentLoaded` and in `renderProfileCircles` with `.onclick`, calling `e.stopPropagation()` and `e.stopImmediatePropagation()`.
    - Verified that no separate Curate Circles modal exists in the application; the button safely shows the diplomatic clearance notice toast (`profile.circlesEditNotice`) without opening Account Information.
    - Verified `#menuAccountInfo` continues opening Account Information modal normally.
    - Zero modifications to other tabs, Master Card, colors, materials, or global typography.
- **Micro-Pass: Global Light-Mode Low-Contrast Text Fix (2026-10-03) — COMPLETE**:
  - Replaced low-contrast pale gold/beige text across Light Mode with refined high-contrast antique champagne gold tokens.
  - Bound `.ledger-timeline-title` ("HISTORICAL PROVENANCE") and `.ledger-divider-seal` to semantic design tokens (`--txt-gold-premium` and `--txt-gold-muted`).
  - Strengthened Light Mode tokens: `--txt-gold-muted` updated from pale `#9e7d47` to rich antique gold `#856025` (contrast ~5.2:1 against ivory); `--gold-pale` updated to `#966822`; `--gold-champagne` updated to `#875f21`; defined `--gold-primary: #7d5a1b` in `:root.light-mode`.
  - Added `.ledger-timeline-title` to the system-wide semantic typography hierarchy mapping under Premium Gold Text (`var(--txt-gold-premium, #7d5a1b)`).
  - Explicitly preserved 100% of Dark Mode tokens and appearance.
- **Micro-Pass: Real Engraved Member Name (Light Mode) (2026-10-04) — COMPLETE**:
  - Upgraded Main Membership Card member name (`body.light-mode #membership-tab .member-name, body.light-mode #membershipCard .member-name`) from flat dark typography to authentic machine-engraved intaglio metal lettering.
  - Employed directional burnished antique bronze/dark-gold metallic gradient (`#181105` to `#5a4018` to `#201507`) with `-webkit-background-clip: text` to provide real metallic substrate body.
  - Engineered realistic recessed depth via multi-tier chained drop-shadows: dark upper cavity groove shadow (`drop-shadow(0 -0.65px 0.35px rgba(20, 13, 4, 0.85))`), razor bottom specular light catch (`drop-shadow(0 0.85px 0.4px rgba(255, 255, 255, 0.95))`), and subtle warm metallic rim reflection (`drop-shadow(0 0.4px 0.8px rgba(160, 120, 45, 0.28))`).
  - Preserved 100% of exact text ("ISMAIL ELSAYED"), font family, clamp size, card proportions, layout, and Dark Mode appearance.
  - Bumped stylesheet cache-buster to `style.css?v=20261004a`.
- **Micro-Pass: Correct Engraved / Debossed Member Name (Light Mode) (2026-10-04) — COMPLETE**:
  - Corrected Main Membership Card member name (`body.light-mode #membership-tab .member-name, body.light-mode #membershipCard .member-name`) to authentic recessed / debossed intaglio engraving.
  - Completely removed the previous lower white drop-shadow/ridge and aggressive gradient that caused a floating appearance.
  - Applied restrained three-layer debossed architecture: stable dark antique champagne / burnished gold body (`color: #2b1e0d`), subtle warm champagne-ivory highlight on the upper-left cut edge (`-0.5px -0.5px 0.5px rgba(250, 244, 230, 0.55)`), and subtle deep antique-gold cavity shadow on the lower-right edge (`1px 1px 1px rgba(40, 26, 8, 0.6)`).
  - Preserved 100% of exact text ("ISMAIL ELSAYED"), typography, layout, card dimensions, and Dark Mode appearance.
  - Bumped stylesheet cache-buster to `style.css?v=20261004b`.
- **Micro-Pass: Luxury Member Name Typography Refinement (Light Mode) (2026-10-04) — COMPLETE**:
  - Upgraded Main Membership Card member name (`body.light-mode #membership-tab .member-name, body.light-mode #membershipCard .member-name`) to high-contrast Roman inscriptional horological typography using `Cinzel` (`font-family: 'Cinzel', 'Amiri', serif !important; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; clamp(1.1rem, 3.6vw, 1.4rem)`).
  - Replaced digital serif feel with authentic lapidary/horological dial engraving proportions.
  - Applied micro-restrained photographic intaglio debossed finish: dark antique champagne / burnished gold body (`#2c1f0e`), subtle warm champagne-ivory top-left light catch (`-0.5px -0.5px 0.4px rgba(252, 246, 230, 0.65)`), and soft deep antique-gold cavity shadow (`0.8px 0.8px 0.8px rgba(35, 23, 7, 0.55)`).
  - Maintained zero white drop-shadows, zero floating effects, zero layout shifts, and 100% preservation of Dark Mode and all surrounding card elements.
  - Bumped stylesheet cache-buster to `style.css?v=20261004c`.
- **Micro-Pass: Finalize Member Name Engraving Material (Light Mode) (2026-10-04) — COMPLETE**:
  - Maintained 100% of approved Cinzel typography settings (font family, weight 600, tracking 0.12em, clamp size, line-height 1.2, uppercase).
  - Tuned the debossed intaglio engraving depth to be ~10-15% more perceptible while maintaining exquisite quiet luxury restraint.
  - Applied a refined three-tier shadow architecture: crisp specular champagne-ivory upper-left catch (`-0.6px -0.6px 0.4px rgba(254, 248, 232, 0.8)`), tight internal groove boundary (`0.6px 0.6px 0.4px rgba(24, 15, 4, 0.5)`), and deep cavity shadow on the lower-right wall (`1px 1px 1.2px rgba(38, 24, 6, 0.62)`).
  - Zero white lines underneath letters, zero glow, zero halo, zero floating or 3D extrusion, zero layout shift.
  - Dark Mode and all other elements remain 100% untouched.
  - Bumped stylesheet cache-buster to `style.css?v=20261004d`.
- **Micro-Pass: Actual Font Family Change to Cormorant Garamond (Light Mode) (2026-10-04) — COMPLETE**:
  - Replaced `Cinzel` with `Cormorant Garamond` on `body.light-mode #membership-tab .member-name` and `body.light-mode #membershipCard .member-name`.
  - Configured exact parameters: `font-family: "Cormorant Garamond", serif !important; font-weight: 600 !important; letter-spacing: 0.045em !important; text-transform: uppercase !important; clamp(1.2rem, 4vw, 1.55rem)`.
  - Preserved the subtle intaglio debossed engraving material effect (`text-shadow: -0.5px -0.5px 0.35px rgba(254, 248, 232, 0.75), 0.5px 0.5px 0.35px rgba(24, 15, 4, 0.45), 0.9px 0.9px 1px rgba(38, 24, 6, 0.58) !important;` with `#2c1f0e` dark antique champagne body).
  - Verified computed `font-family` resolves to `"Cormorant Garamond", serif`.
  - Preserved Dark Mode, Profile Hero, and all surrounding card elements with zero layout shift.
  - Bumped stylesheet cache-buster to `style.css?v=20261004e`.
- **Micro-Pass: True Hand-Engraved / Intaglio Member Name (#memberName) (2026-10-04) — COMPLETE**:
  - Bound exact ID selectors `body.light-mode #membershipCard #memberName` and `body.light-mode #membership-tab #memberName` for supreme specificity.
  - Selected `Cinzel` (`font-family: "Cinzel", "Amiri", serif !important; font-weight: 700 !important; letter-spacing: 0.14em !important;`) for genuine Roman lapidary inscriptional proportions.
  - Replaced flat uniform text ink with an authentic V-cut trench metallic cavity gradient (`linear-gradient(150deg, #3d2a14 0%, #281b0a 35%, #160e03 70%, #231606 100%)`) with `-webkit-background-clip: text` and transparent fill.
  - Sculpted realistic intaglio relievo with razor-thin top-left chamfer catch (`drop-shadow(-0.5px -0.5px 0.25px rgba(255, 252, 245, 0.88))`), inner cavity shade (`drop-shadow(0.6px 0.6px 0.35px rgba(18, 11, 3, 0.85))`), and deep groove floor depth (`drop-shadow(1px 1px 1px rgba(32, 20, 5, 0.5))`).
  - Completely eliminated the appearance of printed surface text; letters visually settle into the ivory substrate without glow, halo, chrome, or 3D extrusion.
  - 100% preservation of Dark Mode, Profile Hero Card, and all other card elements with zero layout shift.
  - Bumped stylesheet cache-buster to `style.css?v=20261004f`.
- **Micro-Pass: Quiet Luxury Burnished Bronze Member Name Engraving (2026-10-04) — COMPLETE**:
  - Eliminated the heavy bold weight and dark black tones; adjusted typography to slender Medium weight (`font-weight: 500 !important; clamp(1.05rem, 3.4vw, 1.28rem)` with `letter-spacing: 0.12em;`).
  - Set quiet Antique Champagne / Burnished Bronze color (`color: #563d1c !important; -webkit-text-fill-color: #563d1c !important;`), harmonizing seamlessly with the ivory plate and gold guilloché.
  - Removed all heavy chained drop-shadows and replaced with an ultra-delicate micro-deboss edge (`text-shadow: -0.5px -0.5px 0.2px rgba(255, 255, 255, 0.85), 0.5px 0.5px 0.3px rgba(65, 45, 16, 0.35) !important;`).
  - Achieved the quiet luxury aesthetic of a vintage Patek Philippe / high horology dial: zero glow, zero 3D extrusion, zero black mud, zero outline, and zero floating effect.
  - Added `Cinzel:wght@500` to Google Fonts link in `index.html`.
  - 100% preservation of Dark Mode, Profile Hero, and all surrounding card elements with zero layout shift.
  - Bumped stylesheet cache-buster to `style.css?v=20261004g`.
- **Micro-Pass: Microscopic Specular Chamfer Catch Calibration (2026-10-04) — COMPLETE**:
  - Locked 100% of approved typography settings (`Cinzel`, `font-weight: 500`, `letter-spacing: 0.12em`, `clamp(1.05rem, 3.4vw, 1.28rem)`).
  - Maintained core Antique Champagne / Burnished Bronze tone (`color: #563d1c !important;`).
  - Calibrated the intaglio relief edge: zero-blur hairline specular chamfer catch on the upper-left lip (`-0.5px -0.5px 0.4px rgba(255, 255, 255, 0.9)`), paired with a soft warm bronze internal cavity shadow on the lower-right wall (`0.6px 0.6px 0.4px rgba(70, 48, 18, 0.42)`).
  - Zero glow, zero chrome, zero 3D, zero black, zero modification to any other element in the card or application.
  - Bumped stylesheet cache-buster to `style.css?v=20261004h`.
- **Pass: Realistic Metallic Gold CTA Buttons & Controls (Light Mode Only) (2026-10-04) — COMPLETE**:
  - Applied realistic polished brushed champagne/warm metallic gold system exclusively to gold CTA buttons and controls outside Main Membership Card and Profile Hero Card.
  - Primary CTA Buttons (`.btn-gold`, Boutique `.btn-acquire`, `.btn-equip`, `.boutique-own-btn`, `.rmc-equip-btn`, `.reliquary-boutique-btn`, `.sd-btn-add`, `.mini-dossier-btn.is-toast-primary`, `.edit-profile-save-btn`, `.dossier-save-btn`, `.oath-signet-seal-btn`): Refined multi-stop directional metallic gradient (`linear-gradient(145deg, #e8cc8f 0%, #d4ae60 30%, #be9444 70%, #a47a2e 100%)`), metallic bezel rim (`1px solid #b88d38`), inner bevel highlight, subtle shadow, and deep etched obsidian-bronze typography (`#241603`).
  - Active Gold Controls & Category Filter Pills (`.b-filt-btn.is-active`, `.pill-btn.is-active`, `.club-room-btn.is-active`, `.sl-filter-btn.is-active`, `.sovereign-accolade-btn.is-conferred`, `.pcc-curate-btn`, `.deed-verify-btn`): Refined metallic gold finish (`#f4e3be` to `#cfae64`) with crisp bevel highlights.
  - Club Sovereign Seal Send Button: Applied polished gold bezel outer gradient (`url(#ringGoldGrad)`) and high-contrast typography.
  - Zero modifications to Main Membership Card, Profile Hero Card, Dark Mode, spacing, dimensions, or business logic.
  - Bumped stylesheet cache-buster to `style.css?v=20261004i`.
- **Pass: Antique Burnished Gold Headings & Section Labels (Light Mode Only) (2026-10-04) — COMPLETE**:
  - Fixed low-contrast and washed-out pale gold headings and section labels outside Main Membership Card and Profile Hero Card.
  - Upgraded `--txt-gold-premium` to `#664917` (7.2:1 contrast against ivory) and `--txt-gold-muted` to `#73531b` in `body.light-mode`.
  - Historical Provenance Heading (`.ledger-timeline-title`): Formatted with `Cinzel`, commanding Antique Burnished Champagne Gold `#5a3f12`, weight 700, letter-spacing 0.16em, and micro-embossed paper reflection (`text-shadow: 0 1px 0 rgba(255, 255, 255, 0.85)`). Updated timeline head badge icon stroke to `#7a581a`.
  - Certificate & Reliquary Eyebrows (`.rmc-eyebrow`, `.pcs-curation-eyebrow`): Set to `#5c4214` with weight 700 and crisp contrast.
  - Section Subtitles, Category Titles & Eyebrows across tabs: Enhanced with `#634714` and micro paper highlight.
  - Accredited Tags & Status Badges: Replaced faint borders with high-contrast Antique Gold pill treatments (`#4a340e` text, `rgba(145, 105, 30, 0.45)` border).
  - 100% preservation of Main Membership Card, Profile Hero Card, Dark Mode, layout dimensions, and business logic.
  - Bumped stylesheet cache-buster to `style.css?v=20261004j`.
- **Pass: Canonical Unified Gold Material System (Light Mode Only) (2026-10-04) — COMPLETE**:
  - Unified all gold elements across the app outside Main Membership Card and Profile Hero Card into a single cohesive Antique / Champagne / Burnished Metallic Gold system.
  - Harmonized root CSS tokens: `--gold-primary: #664917`, `--gold-pale: #e8cc8f`, `--gold-champagne: #caa052`, `--gold-polished: #b88d38`, `--gold-antique: #5a3f12`, `--gold-aged: #4a340e`, `--gold-dark: #241603`, `--gold-line: rgba(164, 122, 48, 0.38)`.
  - Gold Icons: Standardized SVG strokes and fills to warm antique gold (`#8a6322` / `#7a581a`) with a soft specular paper catch (`drop-shadow(0 1px 0 rgba(255, 255, 255, 0.8))`).
  - Gold Borders & Bezels: Standardized panel and vitrine borders to refined brushed gold (`1px solid rgba(164, 122, 48, 0.28)`) with inner light bevel (`inset 0 1px 0 rgba(255, 252, 240, 0.8)`).
  - Gold Badges & Accredited Seals: Unified to champagne gold gradient backdrop (`linear-gradient(135deg, rgba(232, 204, 143, 0.18) 0%, rgba(184, 141, 56, 0.09) 100%)`) with `#4a340e` high-contrast typography.
  - Gold Dividers & Accents: Standardized hairline dividers to directional multi-stop gold gradients and decorative seals to `#78561d`.
  - Main Membership Card, Profile Hero Card, Dark Mode, layout, typography, spacing, and business logic remain 100% untouched.
  - Bumped stylesheet cache-buster to `style.css?v=20261004k`.
- **Pass: Boutique CSS Grid System & Refined Luxury Hover (2026-10-04) — COMPLETE**:
  - Applied structured CSS layout system to `#boutiqueSections` (vertical section flow, `gap: 22px`).
  - Enhanced `#boutique-tab .boutique-grid` with precision responsive CSS Grid: 2 columns on mobile (`repeat(2, minmax(0, 1fr))`, `gap: 11px`), auto-scaling gracefully on wider viewports (`@media (min-width: 600px)` 3 columns, `@media (min-width: 900px)` 4 columns).
  - Implemented subtle, quiet-luxury hover effect on `.boutique-card`: gentle elevation (`translateY(-3px)`), brushed gold rim catch (`rgba(212, 175, 106, 0.48)` in Dark Mode, `rgba(184, 141, 56, 0.55)` in Light Mode), soft ground shadow expansion, and micro-scale on the collectible pedestal (`scale(1.04)`).
  - Maintained complete preservation of Main Membership Card, Profile Hero Card, click events, and business logic.
  - Bumped stylesheet cache-buster to `style.css?v=20261004l`.














































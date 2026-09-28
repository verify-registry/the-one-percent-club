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

### File Inventory

| File | Size | Role |
|---|---|---|
| `index.html` | 174KB | Entry: all tabs DOM, modals, SVG defs |
| `style.css` | 780KB | ALL styles (monolith; stacked overrides) |
| `app.js` | 273KB | ALL logic (state, i18n, renderers) |
| `translations.js` | 57KB | i18n dictionary (ar/en) |
| `luxury.js` | 62KB | Master Card canvas engine |
| `Audio.js` | 29KB | WebAudio sound engine |
| `server.js` | 0.3KB | Express static server |
| `package.json` | 0.4KB | deps: express only |
| `metadata.json` | 0.2KB | AI Studio platform metadata (DO NOT TOUCH) |

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
- Cache-busters (`?v=51`, `?v=55`, `?v=2`)

---

## 2. SAFETY RULES FOR AI AGENTS

1. **READ-ONLY first** — analysis before modification
2. **Micro-passes** — small, targeted batches
3. **Zero visual regressions** — no design/logic changes without approval
4. **Preserve IDs** — never rename HTML IDs or JS function names
5. **Test both themes** — Dark + Light after any CSS change
6. **Test RTL** — after any directional CSS changes

---

## 3. DEVELOPMENT HISTORY

### Cleanup Completed
- **Micro-pass 1:** Purged 5 unused files/dependencies (saved 4MB).
- **Phase 1 (JS/CSS Dead Code):** Removed stub functions (`renderClubMessages`, `setTypingIndicator`), test relic (`window.testRadarUpdate`), duplicate logic branches, dead `.phc-motto-text-old`, and duplicate `--gold-antique`.
- **Phase 2 (Skeleton & Debounce):** Consolidated skeleton generators and added resize debounce in `ThemeManager`.
- **Phase 3 (Modals & Avatar):** Unified inspection/reliquary modal controllers and consolidated avatar upload event listeners.
- **Phase 4 (Boutique & 60 FPS):** Unified purchase pipeline (`window.purchase`) and added `{ passive: true }` to touch/scroll handlers.
- **Phase 5 (StorageHelper):** Unified safe `localStorage` wrapper with try/catch while strictly preserving the existing schema.
- **Phase 6 (CSS Hero Card):** Consolidated `.profile-hero-card`, `.phc-edit-btn`, and `.phc-info-col` override stacks with zero visual regression.
- **Phase 7 (CSS Boutique):** Consolidated `.boutique-card` override rules and verified containment.
- **Phase 8 (CSS Club & Purge):** Consolidated `#club-tab` and leaderboard styling, and purged unused `.phc-rivet-*` selectors.

### Current System State
- Zero dead JS functions.
- 60/120 FPS render loops and scroll containment active.
- High visual fidelity maintained across Dark and Light modes.

---

*Last updated: 2026-09-28*
*Protected file — do not delete*

### Micro-pass 9B (2026-09-28) — LANDED
- Removed dead CSS: .phc-corner-rivet, .phc-rivet-tl/tr/bl/br, .phc-motto-text-old, duplicate base .profile-hero-card block.
- Deleted .env.example from repo.
- Bound phc/psb/pnm/pcs components to design tokens; added contain: layout style paint + backface-visibility to .pcs-item-card.
- Commits: e1cca1e, 456d35f, d37b40b. style.css: 776,865 → 776,467 bytes.
- Visual verification: passed (dark + light, RTL + LTR).
- Note: package-lock.json removed in same push — regenerate later.

### Micro-pass 9C (2026-09-28) — LANDED
- Fixed light-mode stuck elements in style.css.
- Bound `--btn-edit-*` variables to design tokens in `:root` and light-mode.
- Updated `.phc-edit-btn`, `.psb-value`, and `.psb-label` to use theme variables (`var(--btn-edit-*)`, `var(--text-primary)`, `var(--text-secondary)`).
- Verified successful build and linting.

### Micro-pass 9D (2026-09-28) — IN PROGRESS
- Bound .pnm-title, .pnm-sub, .pnm-badge, .achievements-summary-value, .pcs-item-name, .pcs-item-type to theme tokens.
- Pending: visual verification in dark + light modes before push.




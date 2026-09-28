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

### Micro-pass 9D (2026-09-28) — LANDED
- Bound .pnm-title, .pnm-sub, .pnm-badge, .achievements-summary-value, .pcs-item-name, .pcs-item-type to theme tokens.
- Pending: visual verification in dark + light modes before push.

### Micro-pass 9E (2026-09-28) — LANDED
- Regenerated package-lock.json from package.json (restored after accidental deletion in prior push).
- No changes to package.json, app code, or assets.
- Pending: push authorization.

### Micro-pass 11 (2026-09-28) — LANDED
- Removed orphaned duplicate translation keys: modal_account_title, profile.passPlaceholder, profile.accountInfoTitleModal.
- Canonical survivor: leave_blank (active in index.html).
- node --check passed; zero call-sites affected.
- Pending: push authorization.



---

## 4. AGENT WORKFLOW PROTOCOL (MANDATORY FOR ALL AGENTS)

### 4.1 Roles
- ORCHESTRATOR: the senior architect AI in the planning chat. Designs passes, writes exact instructions, verifies remotely.
- HANDS: the workspace agent (Gemini Flash-Lite). Executes ONLY exact instructions; never improvises.
- GATEKEEPER: the human owner. The only person who presses sync/push, and only on the Orchestrator's explicit word.
- VERIFIER: the Orchestrator via GitHub API and raw greps after each push.

### 4.2 Micro-pass discipline
1. Scope: one small named change per pass (e.g. "Micro-pass 9C").
2. Read-only first: verify targets with raw greps before any write.
3. Exact edits: instructions carry exact FIND/REPLACE or DELETE blocks; Hands must STOP if a block is not found verbatim.
4. Raw evidence: Hands replies with verbatim terminal output (grep -n / wc -c / sed -n), never summaries.
5. Visual check: human checks dark + light + RTL/LTR in preview before push.
6. Push gate: push ONLY when the Orchestrator says the word; commit message names the pass.
7. Post-push verification: Orchestrator re-checks remote size/SHA/greps; the pass closes only then.
8. Ledger: every pass appends a ledger entry to this file.

### 4.3 Workspace & platform facts
- The AI Studio workspace is NOT a git repository (git commands fail with "not a git repository").
- Publishing happens via the platform sync button; commits are authored by verify-registry.
- GitHub API (contents/commits) can serve STALE cached data; cross-check with GitHub UI or raw.githubusercontent, or add a cachebust query param.
- The workspace can be reset or reverted by the platform; never assume unpushed work survives. Push promptly after verification.





## 5. LESSONS LEARNED (INCIDENT LOG — READ BEFORE EVERY PASS)
1. "Already purged" confabulation: Hands claimed targets were already deleted while byte counts proved otherwise. Trust raw wc/grep only. (9B)
2. STOP-rule violation: Hands proceeded with a deletion after finding a JS reference. Any found reference = STOP and report. (9B)
3. Push silence: sync can appear to succeed while remote is unchanged; always verify remote SHA/size after push. (9C)
4. Override generations: style.css contains stacked override generations; a base edit can be a NO-OP when a later higher-specificity block wins. Always grep the selector's full occurrence map before editing. (9D)
5. Light-mode blocks are DESIGN, not bloat: most body.light-mode blocks carry genuine light-only art (conic gradients, emboss shadows). Never bulk-delete them. Delete only blocks whose every property is already provided by a token-bound base. (Pass 10 re-scope)
6. grep dot wildcard: "club.leaderboard" also matches "club-leaderboard". Use grep -F for dotted keys. (11A)
7. Nested dictionaries: translations.js is nested objects; dotted keys are invisible to plain grep. Count usages with -F and inspect definitions with sed. (11A)
8. Accidental file loss: a push removed package-lock.json unintentionally. Review what a sync includes before pushing; restore via npm install when lost. (9B/9E)
9. Summaries are not evidence: Flash-Lite answers with prose when asked for output. Force "reply with ONLY the raw output" and one command per message.
10. Append loss: an APPENDED reply does not guarantee the append landed. Remote verification after push is the only truth. (DOC-1)

### Micro-pass 10-Slim-A (2026-09-28) — LANDED
- Deleted redundant body.light-mode #profile-tab .phc-edit-btn block (masked 9C tokens in light mode).
- Kept :hover block (hover tokens not yet built).
- Verified successful build and linting.

### Micro-pass 10-Slim-A2 (2026-09-28) — IN PROGRESS
- Deleted 5 redundant body.light-mode #profile-tab .phc-edit-btn blocks (lines 11754, 11888, 12613, 12805, 13493).
- Kept block 3 (line 12274) which has color: #aa771c (differs from 9C token).
- Pending: visual verification in light mode before push.

### Batch Pass 1 (2026-09-28) — IN PROGRESS
- Resolved leaderboardSub/Subtitle duplication (kept the active one).
- Added --btn-edit-hover-* tokens and bound base .phc-edit-btn:hover to them.
- Deleted redundant body.light-mode #profile-tab .phc-edit-btn:hover override.
- Pending: visual verification before push.

## 6. CURRENT STATE & BACKLOG (update every pass)
Landed on main: 9B, 9C, 9D, 9E, 11, DOC-1, 10-Slim-A. In progress: 10-Slim-A2.
Backlog:
- 10-Slim-B onward: per-cluster redundancy hunt (only blocks fully covered by a token-bound base).
- 11-followup: leaderboardSub vs leaderboardSubtitle disambiguation; optional removal of dead nav.profile.* subkeys (the nav.profile leaf is ALIVE at app.js line 2526).
- Optional: CSS minification for production payload (separate decision).
Known intentional: body.light-mode override blocks; stacked override generations; duplicate gradient tokens.

## 7. VERIFICATION CHEATSHEET
- Remote truth: https://api.github.com/repos/verify-registry/the-one-percent-club/contents/<file>?cachebust=<n>
- Commit list: https://api.github.com/repos/verify-registry/the-one-percent-club/commits?sha=main&per_page=5
- Workspace facts: wc -c <file> | grep -nF "<token>" <file> | sed -n 'A,Bp' <file>
- Dead-key test: grep -cF "<key>" app.js index.html translations.js → usage = app.js + index.html counts.
- Dead-selector test: grep -nF "<class>" index.html app.js → must be zero AND no dynamic class construction.

---

## 8. SMART REFACTORING PROTOCOL (MANDATORY FOR ALL EDITS)

Whenever an edit, addition, or design change is requested, the Agent MUST automatically execute this 4-step self-cleaning routine on the affected area:

1. ANALYZE: Identify the target selectors/keys and their current state before modification.
2. APPLY: Execute the requested change using Design Tokens (CSS variables) or centralized dictionaries (translations.js) whenever possible. Never introduce new hardcoded values if a token exists.
3. AUTO-CLEAN & MERGE: 
   - Immediately search for and DELETE any orphaned, dead, or duplicate CSS rules / translation keys that became redundant due to this change.
   - MERGE any scattered properties of the same selector into a single, clean, logically ordered block.
4. ORGANIZE: Ensure the modified section is neatly formatted, properly commented, and placed in its correct logical section within the file.

STRICT CONSTRAINTS:
- Zero visual regression (preserve the exact intended design).
- No dead code, unused variables, or duplicate blocks shall be left behind after any edit.
- The Agent must report in its response: [What was changed] + [What was auto-deleted/merged] + [Raw verification output].

### Batch Pass 2 (2026-09-28) — IN PROGRESS
- Added 5 light-mode tokens (--lm-*).
- Replaced ~150 hardcoded values with tokens.
- Auto-cleaned and merged duplicate blocks.
- Pending: visual verification before push.

---

## 9. FILE MANAGEMENT PROTOCOL (MANDATORY)

- Agents MUST ONLY modify existing project files (style.css, app.js, index.html, translations.js, AUDIT.md, etc.).
- Creating new files (like refactor.js, temp.js, helper.js, etc.) is STRICTLY FORBIDDEN unless explicitly requested by the owner.
- Any temporary file created during execution must be deleted immediately before the task is considered complete.
- If an agent needs to test logic, it must do so within the existing files or in the terminal directly, not by creating new scripts.


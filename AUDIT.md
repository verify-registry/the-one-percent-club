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

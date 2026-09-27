# 🏛️ AUDIT.md — MASTER ARCHITECTURE MAP & REPOSITORY AUDIT
> **CORE AGENT RULE:** Before modifying any component, consult this map to identify targeted files and slices only. Do NOT read or modify unrelated files or downstream overrides.
---
## 1. REPO ARCHITECTURE & READ-FIRST MATRIX

| Component / Task | Read FIRST (Targeted Slices Only) |
| :--- | :--- |
| **Master Card (Tab)** | `index.html` (#page-card); `style.css` (.membership-card*); `luxury.js` (Canvas engine ONLY if pattern changes) |
| **Card Metrics / Rings** | `app.js` (renderRing, recalculatePrestige, updateMasterCard); `style.css` (.metric-ring, .ring-*) |
| **Club (Tab & Logic)** | `index.html` (#club-tab, #creditsModal); `app.js` (sendClubMessage, processEliteResponse, updateCreditsUI); `style.css` (#club-tab, .club-*) |
| **Profile (Tab & Dossier)** | `index.html` (#profile-tab, #accountInfoModal); `app.js` (renderProfile*, ACHIEVEMENTS_DATA); `style.css` (.phc-*, .psb-*, .pcs-*, .honor-*) |
| **Boutique (Tab & Logic)** | `index.html` (#boutique-tab, #inspectionModal); `app.js` (BOUTIQUE, renderBoutique*, purchase, toggleEquip); `style.css` (.boutique-*) |
| **Theming & Colors** | `style.css` (body.light-mode blocks of that specific tab + :root variables) |
| **Internationalization** | `translations.js` (keys only); never change translation key names. |

---
## 2. STRICT INVARIANTS (DO NOT TOUCH)
1. **AppState / ClubState Core:** State getters and localStorage schema must remain intact.
2. **DOM Element IDs:** Dozens of active bindings in `app.js` rely on exact element IDs; never rename.
3. **luxury.js:** Canvas mathematical engine; high visual-regression risk.
4. **translations.js Key Names:** Deleting/renaming keys silently breaks the UI.
5. **Platform Meta:** `metadata.json`, `server.js`, and `package.json` must be preserved.
---
## 3. AUDIT ROADMAP & SAFE PURGE TARGETS
### Phase 1: Zero-Risk Dead Code Purge (Ready to Execute)
- **app.js:**
  * Delete stub `renderClubMessages()`
  * Delete stub `setTypingIndicator()`
  * Delete test relic `window.testRadarUpdate`
  * Streamline redundant `isArabic` branch in `processEliteResponse`
  * Simplify redundant ternary in `renderProfileCollection`
- **style.css:**
  * Purge unused selector `.phc-motto-text-old`
  * Deduplicate `--gold-antique` in `:root` (keep `#c79a3e`)
### Phase 2: Performance & Containment (60 FPS)
- Add `contain: layout style paint;` to `.boutique-card` and `.pcs-item-card`.
- Debounce `resize` dispatch in `ThemeManager`.

# THE 1% CLUB — COMPREHENSIVE POST-FIX ARCHITECTURE & AUDIT REPORT

This document represents the current, verified state of THE 1% CLUB application following the successful completion of the repo consolidation and harmonization.

==================================================
1. EXECUTIVE SUMMARY & ARCHITECTURE OVERVIEW
==================================================

- **Type:** Vanilla HTML / CSS / JS Single Page Application (SPA).
- **Frameworks:** None (Zero dependencies).
- **Bootstrap Flow:** `document.addEventListener("DOMContentLoaded", ...)` triggers the initial render logic. This initializes `AppState`, binds translation strings, sets up the router, renders the initial views (Boutique, Profile, Club), and initializes `luxury.js`.
- **State & Rendering Flow:** The application relies on reactive-style manual updates. Changes to `AppState` trigger `AppState.save()` followed by explicit DOM updates (e.g., `updateUI()`, `renderBoutique()`).
- **Dependency Mapping:** `app.js` is globally dependent on `window.t()` (from `translations.js`), and `index.html` relies heavily on `style.css` for both layout and the specific `.light-mode` cascade.

==================================================
2. VERIFIED FILE TREE
==================================================

All temporary patch scripts and auxiliary artifacts have been permanently purged. The repository is strictly limited to these core canonical files:

```text
THE 1% CLUB
│
├── index.html       (DOM Structure, Modals, Navigation)
├── style.css        (Obsidian Dark & Ivory Light Modes, Z-Index Stack)
├── app.js           (State Management, Routing, Business Logic)
├── luxury.js        (Canvas Geometry, Guilloché, Gold Dust)
├── translations.js  (i18n Dictionary)
├── Audio.js         (Sound Effects)
├── server.js        (Node.js Server Entry Point)
├── package.json     (Dependencies)
├── metadata.json    (App Configuration)
└── AUDIT.md         (This Document)
```

==================================================
3. STATE MANAGEMENT & OWNERSHIP SINGLE SOURCE OF TRUTH
==================================================

**Current AppState Structure:**
The application uses a globally accessible `ClubState` (aliased as `AppState`).

- **Canonical Ownership Source:** `AppState.owned` (Object map: `{ "item_id": 1 }`) is the single source of truth for all purchased collectibles.
- **Derived Getter:** `AppState.collectedItems` is a read-only getter (`return Object.keys(this.owned);`).
- **Ghost State Sanitization:** In `AppState.init()`, if a legacy `user.collectedItems` array is loaded from the `profile_{id}` object via `Object.assign`, it is immediately sanitized (`delete this.user.collectedItems;`).
- **Persistence:** LocalStorage is the primary database for the client side.

==================================================
4. DUAL-THEME ARCHITECTURE
==================================================

- **Obsidian & Authentic Gold (Dark Mode):** The default theme utilizing deeply layered radial gradients, dark gold typography, and heavy drop shadows to emulate physical cards.
- **Ivory & Ceramic (Light Mode):** Handled entirely via the `body.light-mode` CSS class. High-fidelity contrast overrides (`color: #1a1510`, `#666 !important`, `#8f6820 !important`) are injected dynamically to shift the Obsidian base into a premium bright ceramic.

==================================================
5. CANVAS & STACKING CONTEXT SPECIFICATIONS
==================================================

- **Guilloché Isolation:**
  - `guilloche-canvas` is strictly set to `z-index: 1`, `position: absolute`, and `background: transparent`.
  - `gold-dust-canvas` shares `z-index: 1`, `position: absolute`.
- **Card Content Protection:**
  - All standard `.card-inner-frame` text and UI children are safely pushed above the canvas elements using `position: relative` and `z-index: 2`, completely eliminating overlap or unclickable UI elements.
- **Clean Single-Line Member Name:**
  - `.member-name` now strictly enforces `white-space: nowrap;` and `clamp()` dynamic typography sizing, preventing text clipping and awkward ellipses.

==================================================
6. SECURITY, LOCALSTORAGE SCHEMA, AND VERIFICATION STATUS
==================================================

**LocalStorage Keys in Use:**
- `avatar_{id}`: User's profile image string.
- `balance_{id}`: Virtual currency balance.
- `spent_{id}`: Lifetime currency spent.
- `chatCredits_{id}`: Daily messaging allowance.
- `owned_{id}`: Stringified `AppState.owned` object.
- `equipped_{id}`: Stringified `AppState.equipped` object.
- `channels_{id}`: Club chat room histories.
- `profile_{id}`: Stringified `AppState.user` object (name, location, tier, etc.).
- `one_percent_lang`: Current UI language (ar/en).
- `app_theme`: Current theme (dark/light).

**Security Posture:** 
100% Client-Side for prototyping phase. All balances, owned items, and user tiers are stored in unencrypted `localStorage`. Production rollout will require migrating to an authoritative backend database.

**Verification Status:**
- UI look and functionality remain 100% stable and unregressed after the purge.
- Navigation router preserves state correctly.
- Localization accurately switches languages without destroying DOM structures.
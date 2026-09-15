==================================================
1. PROJECT INVENTORY
==================================================
**ACTIVE FILES:**
- `index.html` (HTML): The primary entry point. Contains the complete DOM structure for all tabs, modals, bottom navigation, and layout wrappers.
- `style.css` (CSS): The global stylesheet. Contains all visual styling, layout definitions, responsive rules, and theming (both dark and light modes).
- `app.js` (JavaScript): The core logic engine. Contains state management (`AppState`), initialization, rendering functions for Club, Boutique, and Profile, DOM listeners, and the navigation Router.
- `luxury.js` (JavaScript): A specialized visual/graphics engine responsible for rendering hardware-accelerated offscreen metallic textures, generating Guilloché patterns for the Master Identity Card, and handling the device-orientation (gyroscope) tilt effects.
- `translations.js` (JavaScript): The localized dictionary (`window.I18N`) mapping keys to English and Arabic translations.
- `Audio.js` (JavaScript): A synthesized audio engine for providing premium interaction sounds (e.g., rustling, chimes).
- `package.json`, `server.js`, `metadata.json`: Standard Node.js entry point and AI Studio metadata.

**OBSOLETE / LEGACY / PATCH FILES (DO NOT DELETE, REPORT ONLY):**
- `append-light.js`, `append-light-club.js`, `append-light-composer.js`, `append-light-empty.js`, `append-light-final.js`, `append-light-fixes.js`, `append-light-headers.js`, `append-light-labels.js`, `append-light-menu.js`, `append-light-nav.js`, `append-light-pcs-price.js`, `append-light-pill.js`, `append-light-shadow.js`, `append-light-svg.js`: These appear to be iterative patch scripts executed previously to append CSS rules to `style.css` during the development of Light Mode.
- `fix-pnm-title.js`, `fix-pnm-title2.js`: Past patch scripts.
- `update-app.js`, `update-app-tier.js`, `update-dust.js`, `update-dust2.js`, `update-trans.js`: Previously used deployment scripts for injecting specific features or updates.

==================================================
2. APPLICATION ARCHITECTURE
==================================================
**Architecture Type:** Vanilla HTML / CSS / JS (No framework like React or Vue).

**Bootstrap Flow:**
1. The browser loads `index.html`.
2. Scripts (`d3.v7.min.js`, `Audio.js`, `luxury.js`, `translations.js`, `app.js`) are parsed.
3. `AppState.init()` runs on load to hydrate state from `localStorage`.
4. `DOMContentLoaded` fires in `app.js` and `luxury.js`.
5. Event listeners are bound to static DOM elements.
6. The `Router` sets the initial active tab (`membership` by default).

**State & Rendering Flow (Example: Boutique Purchase):**
User Action (Click "Acquire") → Event Handler (`buyItem`) → State Update (`ClubState.purchase`) → Persistence (`localStorage.setItem`) → Reactivity (`AppState.notify()` / `updateUI()`) → Render Function (`renderProfileCollection()`, `renderBoutique()`) → DOM is overwritten via `innerHTML`.

**Dependency Mapping:**
- All tabs share the `AppState` (aliased as `ClubState`) singleton.
- Navigation is handled by a central `Router` object.
- The UI heavily relies on `innerHTML` string interpolation for lists (Boutique grids, Profile collections, Club messages), meaning state changes often destroy and recreate entire DOM subtrees.

==================================================
3. MAIN APPLICATION TABS
==================================================
The tabs are structured as sibling `<section class="page">` elements inside `<main class="app-main">`.

1. **Membership** (`id="membership-tab"`)
2. **Club** (`id="club-tab"`)
3. **Profile** (`id="profile-tab"`)
4. **Boutique** (`id="boutique-tab"`)

**Isolation Status:**
- HTML is well-isolated (separate wrapper IDs).
- CSS is moderately isolated (many rules are scoped like `#profile-tab .selector`, but some are global).
- JavaScript logic is tightly coupled; a state change in Boutique directly triggers rendering functions for Profile (e.g., `renderProfileCollection`).

==================================================
4. MEMBERSHIP
==================================================
- **DOM Root:** `<section id="membership-tab">`
- **Core Features:** Master Identity Card, portrait ring, wealth/privileges SVG dials, dynamic tier badge, member quotes.
- **JavaScript:** `updateUI()`, `renderRing()` (D3.js integration).
- **State Dependencies:** `AppState.user.wealthIndexValue`, `AppState.user.privilegesValue`, `AppState.user.tier`.
- **Interference Risk:** The Master Card relies heavily on generic-sounding classes like `.membership-card`, `.portrait-ring`, and `.metric-ring`. If Boutique or Profile uses similar class names, the Master Card will break visually. `luxury.js` blindly targets `.membership-card .card-inner` to draw the Guilloché canvas.

==================================================
5. CLUB
==================================================
- **DOM Root:** `<section id="club-tab">`
- **Core Features:** Pinned welcome banner, message scroll area, chat composer, chat credits UI, leaderboard.
- **JavaScript:** `renderClubMessages()`, `processEliteResponse()`, `sendMessage()`, `renderLeaderboard()`.
- **State Dependencies:** `ClubState.chatCredits` (decrements on send), `ClubState.channels` (stores message history).
- **Mechanics:** The Club detects the user's tier and name from `ClubState.member` and injects it into outgoing message headers. A naive AI responder (`processEliteResponse`) generates random replies based on hardcoded arrays.
- **Interference Risk:** Chat bubbles use `.chat-bubble.is-incoming`. This is global CSS, but currently isolated functionally because it only renders inside `#club-tab`.

==================================================
6. PROFILE
==================================================
- **DOM Root:** `<section id="profile-tab">`
- **Core Features:** Hero dossier (avatar, tier, quote), Achievements summary (Prestige & Honors), Collection grid.
- **JavaScript:** `renderProfileCollection()`, `renderProfileAchievements()`, `renderProfileStatsBar()`.
- **State Dependencies:** Reads from `AppState.owned`, `AppState.equipped`, `AppState.user` (bio, location, interests).
- **DOM Duplication Risks:** Profile renders its own representation of items using `.pcs-item-card`. It uses `innerHTML` appending in a loop, which destroys existing listeners on those cards on every re-render.
- **CSS Conflicts:** There are redundant Light Mode fixes for `#profile-tab .prestige-honors .achievements-summary` that exist in multiple places in `style.css`, overriding each other based on cascading order.
- **Bugs/Stale Selectors:** `renderProfileEquipped()` exists in `app.js` but searches for `id="profileEquippedGrid"`, which may or may not map correctly to the newest HTML structure. 

==================================================
7. BOUTIQUE + COLLECTION SYSTEM
==================================================
- **Source of Truth:** A hardcoded constant `const BOUTIQUE = { stars: {...}, crowns: {...} ... }` acts as the product catalog.
- **Ownership State:** `AppState.owned` (Object dictionary mapping item IDs to booleans, e.g., `{"crown1": true}`).
- **Equip State:** `AppState.equipped` (Object mapping category keys to item IDs, e.g., `{"crowns": "crown1"}`).
- **Data Flow:** 
  1. User clicks Buy.
  2. `AppState.purchase(item)` deducts `balance`, sets `owned[item.id] = true`, and pushes to a secondary array `user.collectedItems`.
  3. `AppState.save()` writes to `localStorage`.
  4. `updateUI()` triggers `renderProfileCollection()` and `renderBoutique()`.
- **Conflict Warning:** The system maintains both `AppState.owned` (dictionary) AND `AppState.user.collectedItems` (array). This is a dual-source-of-truth risk. If they fall out of sync, Profile might show different items than Boutique.

==================================================
8. STATE MANAGEMENT
==================================================
**Architecture:** Singleton object with naive pub/sub. `ClubState` is a literal reference (`const ClubState = AppState;`) to `AppState`.
**Important Magic/Alias:** `AppState` defines a getter/setter for `member` (`get member() { return this.user; }`). Thus, `ClubState.member` and `AppState.user` are identical.

| DATA | SOURCE OF TRUTH | WRITERS | READERS | PERSISTENCE | RISK |
|---|---|---|---|---|---|
| Profile Info (Name, Bio) | `AppState.user` | Edit Profile Form | Membership, Club, Profile | `localStorage: profile_{id}` | LOW |
| Ownership | `AppState.owned` | `purchase()` | Boutique, Profile | `localStorage: owned_{id}` | MED (Duplicates `collectedItems`) |
| Equipped | `AppState.equipped` | `toggleEquip()` | Profile, Master Card | `localStorage: equipped_{id}` | LOW |
| Balances & Credits | `AppState.balance`, `chatCredits` | `purchase()`, Chat UI | Boutique, Club | `localStorage: balance_{id}`, etc. | LOW |
| Achievements | `club_achievements` | `ach.isUnlocked()` | Profile | `localStorage: club_achievements` | MED (Polled continuously) |
| Language | `currentLang` | `setLanguage()` | Translations, UI | `localStorage: one_percent_lang` | MED (Also uses `appLang`) |
| Theme | DOM `classList` | Theme Toggle | CSS | `localStorage: app_theme` | LOW |

==================================================
9. LANGUAGE / LOCALIZATION
==================================================
- **System:** `window.I18N` object in `translations.js` maps keys (e.g. `nav.membership`) to `{en: "...", ar: "..."}`.
- **Implementation:** `window.t("key")` fetches the translation. Static HTML uses `data-i18n="key"` which is parsed on load and on switch by `window.setLanguage()`.
- **Dynamic Content:** Injected HTML (e.g., Boutique cards, Chat messages) uses inline `${window.t('key')}` during `innerHTML` generation.
- **Risks:** 
  - Some hardcoded English remains in fallback texts.
  - Changing language invokes `renderProfileCollection()` and `renderProfileStatsBar()` explicitly, forcing DOM rebuilds to translate dynamic text.
  - `localStorage` stores both `"one_percent_lang"` and `"appLang"`.

==================================================
10. DARK MODE / THEME SYSTEM
==================================================
- **Mechanism:** Toggled by adding/removing the `.light-mode` class on `document.body`.
- **CSS Architecture:** Uses a massive cascade of `body.light-mode .selector { ... !important; }` overrides rather than CSS variables (`var(--bg-color)`).
- **Risks:** Because it relies on `!important` class overrides appended to the end of the file, any new UI component added must explicitly have a `body.light-mode .new-component` rule written for it, otherwise it will remain dark.

==================================================
11. DESIGN SYSTEM
==================================================
- **Typography:** Uses CSS Custom Properties updated by JS. `var(--font-display)` toggles between "Cormorant Garamond" (EN) and "Amiri" (AR). `var(--font-ui)` toggles between "Inter" and "Readex Pro".
- **Colors:** heavily relies on raw hex codes (`#d4af37`, `#1a1a1a`) scattered throughout `style.css` rather than a unified token system.
- **Safety:** Most selectors are component-specific (e.g., `.boutique-card`, `.honor-pill`), minimizing collateral damage.

==================================================
12. CSS ISOLATION AUDIT
==================================================
**SAFE (Scoped):**
- `#profile-tab .prestige-honors`
- `#club-tab .club-pinned`
- `.membership-card` (as long as it only exists on one tab)

**RISKY (Unscoped Globals):**
- `.btn`, `.btn-outline`, `.btn-gold`: Modifying these will impact every button across all 4 tabs.
- `.page`, `.app-main`, `.bottom-nav`: Structural globals.
- `.chat-bubble`, `.boutique-card`, `.pcs-item-card`: While specific, they are not prefixed with `#parent-tab`. If a `.boutique-card` is rendered inside Profile, it will inherit Boutique styling.

==================================================
13. JAVASCRIPT ISOLATION AUDIT
==================================================
- **Cross-Tab Risks:** High. `app.js` is a monolithic file. Functions like `updateUI()` reach out and mutate DOM across multiple tabs simultaneously (e.g., `document.getElementById("profileItemCount")` and `document.getElementById("boutiqueBalanceDisplay")` in the same function).
- **Listener Leaks:** Re-rendering grids via `innerHTML += ...` requires recreating DOM event listeners. The current code uses inline `<div onclick="...">` or attaches event listeners in loops post-render, which can lead to memory leaks or broken bindings if not careful.

==================================================
14. NAVIGATION AUDIT
==================================================
- **System:** `Router.navigate(tab)` and `goToPage(tab)`.
- **Mechanism:** Adds `.is-active` class and removes `hidden` attribute on the target `<section>`, and hides the others.
- **Triggers:** Calls `Router.triggerEnter(tab)`. For the `club` tab, it fires `updateCreditsUI()` and forces a scroll-to-bottom.
- **State Preservation:** Excellent. Because hidden tabs remain in the DOM, scrolling positions and state are intrinsically preserved by the browser (unless explicitly reset by `scrollTop = 0`).

==================================================
15. RESPONSIVE / MOBILE AUDIT
==================================================
- **General Form:** Optimized well for `360x800` to `430x932`. 
- **Overflow Risks:** The Boutique grid uses specific column fractions. The Profile's Honors section (`.pcs-grid`) uses `display: grid`, which may squeeze horizontally on extremely narrow devices (e.g. iPhone SE) if padding is too generous.
- **Bottom Nav:** Consumes fixed bottom space. `padding-bottom` on `.app-main` correctly prevents content hiding.

==================================================
16. VISUAL QUALITY AUDIT
==================================================
- **Strong Areas:** The Master Identity Card has excellent material presence (`luxury.js` Guilloché, SVG rings, good typography).
- **Weak Areas:** Profile's nested cards occasionally feel slightly generic (borders and simple gradients) rather than deeply physical objects. The Light Mode requires heavy overrides, meaning subtle lighting effects (like specular highlights) get flattened into pure white backgrounds.
- **Overall:** Adheres well to the "Luxury private society" prompt, avoiding generic SaaS / NFT tropes.

==================================================
17. CURRENT PROFILE TARGET
==================================================
(Acknowledged — Analysis only, no implementation done. Profile target aims for a unified dossier hero card, four metric summary, premium information panel, collection, and bottom navigation).

==================================================
18. BUG / REGRESSION AUDIT
==================================================
- **[MEDIUM] Multiple State Truths:** `AppState.owned` vs `AppState.user.collectedItems`. If these diverge, UI components relying on one vs. the other will break.
- **[MEDIUM] `innerHTML` Event Dropping:** Re-rendering `.boutique-grid` or `.profileCollectionGrid` via strings destroys all attached child event listeners.
- **[LOW] CSS Specificity Wars:** Light mode uses hundreds of `!important` flags. Any future styling must also use `!important` or high-specificity `#id` targeting to override it.
- **[LOW] `ClubState.member` Confusion:** An undocumented aliased getter mapping `member` to `user` exists in `AppState`. Future developers (or agents) may assume `member` is undefined.

==================================================
19. CHANGE HISTORY / CURRENT ARCHITECTURE
==================================================
**Inferred History:**
1. Started as a dark-mode only, single/dual-page app with `AppState`.
2. Expanded to four tabs (Membership, Club, Profile, Boutique) using a simple `Router`.
3. Integrated `luxury.js` to elevate the visual fidelity of the primary Master Card.
4. Added Localization (`translations.js`) post-development, evidenced by the mix of `data-i18n` tags and inline JS translation calls.
5. Added Light Mode post-development, evidenced by the 15+ `append-light*.js` scripts that were run to iteratively append `body.light-mode` overrides to the bottom of `style.css`.

==================================================
20. SAFE DEVELOPMENT STRATEGY
==================================================
- **Protected Systems (Do Not Touch Casually):** `AppState`, `luxury.js`, `translations.js`, and `.membership-card` CSS.
- **Modification Strategy:** Work on ONE tab at a time. Do not modify global `.btn` or `.card` classes; instead, prefix all new CSS with `#profile-tab` or `#boutique-tab`.
- **State Modifications:** When modifying collections, update BOTH `AppState.owned` and `AppState.user.collectedItems` to prevent desync, or refactor one to be a computed property of the other.
- **Post-Change Testing:** After any change to HTML strings in `app.js`, verify that Light Mode hasn't regressed (since Light Mode relies on specific class names).

==================================================
21. MASTER APPLICATION MAP
==================================================
```text
APPLICATION
│
├── GLOBAL
│   ├── index.html (Main Layout, Modals, 4-Tab DOM)
│   ├── style.css (All Dark/Light Styles)
│   ├── app.js (Business Logic & Rendering)
│   ├── luxury.js (Canvas Graphics Engine)
│   ├── translations.js (I18N Dictionary)
│   └── Audio.js (Sound Effects)
│
├── STATE
│   └── AppState (aliased as ClubState)
│       ├── user / member
│       ├── owned / equipped / collectedItems
│       └── balance / chatCredits
│
├── NAVIGATION
│   └── Router (navigate, switchView, onEnter hooks)
│
├── MEMBERSHIP (#membership-tab)
│   └── Master Identity Card (Rings, Tiers, Guilloché)
│
├── CLUB (#club-tab)
│   └── Chat Interface (Rooms, Credits, Elite Responses)
│
├── PROFILE (#profile-tab)
│   └── Hero Dossier, Achievements, Equipped Showcase
│
└── BOUTIQUE (#boutique-tab)
    └── Product Catalog (BOUTIQUE constant), Purchase Logic
```

**CURRENT ARCHITECTURE STATUS:**
PARTIALLY STABLE (Monolithic JS makes it fragile to large edits).

**HIGHEST-RISK AREAS:**
1. `style.css` (Light mode overrides are highly dependent on exact class names).
2. `AppState.init()` and `localStorage` schema.
3. String-based DOM rendering in `app.js` (`innerHTML`).
4. Dual ownership tracking (`owned` object vs `collectedItems` array).
5. `luxury.js` canvas targeting.

**SAFE AREAS FOR FUTURE MODIFICATION:**
1. Adding new static objects to `BOUTIQUE` constant.
2. Appending new localized keys to `translations.js`.
3. Creating isolated CSS rules prefixed with specific `#tab-id`.
4. Modifying internal layout of `#profile-tab` (if properly isolated).
5. Modifying static modal content in `index.html`.

**MOST IMPORTANT SOURCE-OF-TRUTH OBJECTS:**
1. `AppState.user` (or `ClubState.member`)
2. `AppState.owned`
3. `AppState.equipped`
4. `window.I18N`
5. `localStorage`

FULL APPLICATION FORENSIC AUDIT COMPLETE — NO FILES MODIFIED.

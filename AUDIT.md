# THE 1% CLUB — PRODUCTION ARCHITECTURE & VERIFIED CANONICAL AUDIT

**Version Status:** Production Ready / Sanitized & Performance Optimized  
**Verification Date:** September 2026  
**Security & Integrity State:** Verified Clean (Zero-Waste Repository)

---

## 1. Verified File Registry

All temporary scrap scripts, patch utilities, raw asset bloat (`master-card-ultra-hd.png`), backend test scripts (`capture-card.js`), and legacy mapping notes (`ARCHITECTURE-MAP.md`) have been permanently eradicated. The repository strictly contains only the canonical set:

| # | Canonical File | Exact Functional Responsibility |
|---|---|---|
| 1 | `index.html` | Core DOM structure, sovereign membership card markup, viewport configurations, modal templates, SVG symbols, and persistent 4-tab navigation shell. |
| 2 | `style.css` | Obsidian Dark & Ivory Ceramic theme engines, high-precision typography, micro-bevel border hierarchies, hardware-accelerated 3D transform layers, and component styling. |
| 3 | `app.js` | Primary application controller, centralized reactive `AppState`, navigation routing, modal lifecycle, and collectible purchase/equip business logic. |
| 4 | `luxury.js` | Luxury visual math engine, parametric Guilloché generation, animated gold-dust particle simulation, dynamic gyroscope 3D tilt, canvas DPR capping (max 1.5), visibility tab pausing, and lighting sweeps. |
| 5 | `translations.js` | Sovereign bilingual dictionary (Arabic primary, English secondary) and dynamic bidirectional translation engine (`window.t()`). |
| 6 | `Audio.js` | High-fidelity Web Audio API synthesizer for tactile mechanical haptics, luxury clicks, metallic chimes, and collectible interaction audio. |
| 7 | `server.js` | Node.js Express server binding to `0.0.0.0:3000` with SPA routing fallbacks and static asset streaming. |
| 8 | `package.json` | Package metadata, build scripts, and production dependencies. |
| 9 | `package-lock.json` | Deterministic dependency lockfile ensuring reproducible container builds. |
| 10 | `metadata.json` | Application metadata specification and Google AI Studio platform capabilities. |
| 11 | `AUDIT.md` | Authoritative architecture manual, stacking context rules, state specification, and repository sign-off. |

---

## 2. Architecture & State Management Verification

### Single Source of Truth (`AppState.owned`)
- **Collectible Ownership:** `AppState.owned` (structured as a dictionary mapping `{ [itemId: string]: 1 }`) is the strict, single source of truth for all purchased collectibles.
- **Dynamic Derivation:** `AppState.collectedItems` is implemented solely as an immutable getter returning `Object.keys(this.owned)`.
- **Zero Ghost State Sanitization:** During `AppState.init()`, any legacy `user.collectedItems` stored in persistent profiles is automatically purged via `delete this.user.collectedItems`, preventing desynchronization between inventory and state.
- **Local Persistence:** Verified synchronization with client `localStorage` under isolated key namespaces (`owned_${id}`, `equipped_${id}`, `balance_${id}`, `profile_${id}`).

---

## 3. Performance & Compositor Optimizations

- **Canvas DPR Capping:** Limited maximum device pixel ratio scaling in `luxury.js` to `1.5` (`Math.min(window.devicePixelRatio || 1, 1.5)`).
- **Visibility & Tab Pausing:** The canvas animation loop and Guilloché rendering now automatically pause when switching away from the Membership tab or when `document.hidden` is true, eliminating background CPU overhead.
- **Passive Listeners:** All scroll, gyroscope, and touch movement listeners registered with `{ passive: true }` and throttled via `requestAnimationFrame`.
- **Compositor Efficiency:** Cleaned excessive `will-change` declarations and restricted hardware acceleration layers (`transform: translate3d(0, 0, 0)`) strictly to primary animated containers (`.app-header`, `.bottom-nav`, `#membershipCard`).

---

## 4. Live Master Card Share Flow (`luxury.js`)

- **DOM-Based In-Memory Capture:** When clicking "Share Membership" (`#shareCardBtn`), `captureLiveMasterCardBlob()` targets the live DOM element `#membershipCard` directly using `html-to-image`.
- **Neutralization & Fidelity:** Temporarily flattens 3D tilt/gyroscope transforms (`transform: none !important; transition: none !important;`) during capture at high resolution (`pixelRatio: Math.min(window.devicePixelRatio || 2, 3)`), restoring state immediately in a `finally` block.
- **In-Memory Web Share Payload:** Generates an in-memory `File` named `The-1-Percent-Club-MasterCard.png` containing the exact motto `"PRIVATE WEALTH. PRIVATE SOCIETY."` (with zero verification URLs or link strings) for Web Share API or automatic download fallback.

---

## 5. Zero-Waste Declaration & Formal Sign-Off

- **Bloat Asset & Scrap Purge:** Complete. `master-card-ultra-hd.png`, `capture-card.js`, `ARCHITECTURE-MAP.md`, `bun.lock`, and all temporary scratch files have been permanently deleted.
- **Build & Linter Status:** `compile_applet` clean, Node syntax validation clean (zero errors across all modules).
- **Readiness:** The repository represents a pristine, highly performant, production-grade baseline for THE 1% CLUB.

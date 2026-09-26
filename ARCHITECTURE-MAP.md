# ARCHITECTURE-MAP.md — Agent Reading Map

> **قاعدة عامة:** قبل تعديل أي جزء، اقرأ فقط الملفات والأجزاء المرتبطة بهذا الجزء حسب الخريطة، ولا تقم بقراءة أو تعديل أجزاء غير مرتبطة إلا إذا أثبتت dependency مباشرة الحاجة إليها.
> (EN) Before changing anything, read only the files/sections mapped to that area. Do not read or modify unrelated parts unless a direct dependency proves the need.

---

## 0. REPO SNAPSHOT (read-cost awareness)

| File | ~Size | Role |
|---|---|---|
| index.html | 71KB | Entry: all tabs DOM, all modals, SVG gradient defs |
| style.css | 278KB | ALL styles (monolith; stacked override generations) |
| app.js | 104KB | ALL logic (monolith: state, i18n runtime, renderers, controllers) |
| translations.js | 29KB | window.I18N dictionary (ar/en) |
| luxury.js | 44KB | Master Card canvas engine (guilloché + gold dust) |
| Audio.js | 4KB | WebAudio sound engine |
| server.js | 0.3KB | Express static server |
| package.json | — | deps: express only |
| metadata.json | — | AI Studio platform metadata (NOT loaded by app) |
| AUDIT.md | 5KB | Human documentation |

External CDN (not in repo): d3 v7 (radar chart), Google Fonts.

---

## 1. GLOBAL AGENT RULES

1. Read this map first, then read ONLY the mapped slices for your task.
2. Never rename IDs, function names, or translation keys.
3. CSS: winning rules are often in LATER appended blocks (PHASE 7–15).
   Search ALL occurrences of a selector before editing it.
4. JS: `window.t(key)` returns the KEY STRING when the key is missing
   (silent UI bug). Verify key existence in translations.js.
5. BOUTIQUE stores translation KEYS resolved via window.t at render time.
   Keep that pattern; never store resolved strings in data constants.
6. Theme classes live on BOTH <html> and <body>; CSS mostly targets
   `body.light-mode`. Directional CSS must use logical properties.

---

## 2. TAB MAP

### TAB: MEMBERSHIP (Master Card)
- **index.html:** section#page-card; .membership-card; #portraitPhoto;
  .guilloche-canvas / .gold-dust-canvas; #wealthRing #privRing (SVG circles)
  + #wealthValue #privValue; equip slots #equippedStarsSlot
  #equippedCrownSlot #equippedAuraSlot #equippedRingSlot;
  #memberName #tierName #memberTierBadge; #shareBtn #copyBtn;
  #photoUploadBtn #photoInput.
- **app.js:** updateMasterCard(); applyEquippedToCard(); renderRing();
  recalculatePrestige(); updateUI() card slice; ThemeManager → themechange.
- **style.css:** .membership-card, .card-inner-frame,
  .card-identity-section, .card-metrics-footer, .metric-ring, .ring-value,
  .ring-label, .portrait-photo, .portrait-wrap, .corner-*,
  .hallmark-layer, body.light-mode .membership-card *.
- **translations:** membership.*, misc.discipline|network|freedom,
  profile.quoteText, dynamic.wealth, dynamic.connections.

### TAB: CLUB
- **index.html:** section#club-tab; room pills row; .club-chat-window;
  #clubComposerWrap + composer input; #clubCreditsText #clubCreditsBuyBtn;
  #creditsModal; #leaderboardList / #clubLeaderboardContainer.
- **app.js:** room render/switch; sendClubMessage(); processEliteResponse();
  ELITE_MEMBERS; updateCreditsUI(); renderLeaderboard(); mockTopMembers.
  (Dead stubs: renderClubMessages(), setTypingIndicator().)
- **style.css:** #club-tab, .club-room, .club-pinned*, .club-composer,
  .club-chat-window, chat bubble classes, .leader-*,
  body.light-mode #club-tab *.
- **translations:** club.*, dynamic.chat*, misc.sovereign|elite|member.

### TAB: PROFILE
- **index.html:** section#profile-tab; .profile-hero-card + .phc-* nodes
  (phc-inner, phc-avatar-col, phc-avatar-ring, phc-crown-badge,
  phc-info-col, phc-name, phc-tier, phc-quote, phc-meta, phc-edit-btn);
  #profileStatsBar; #profileCollectionGrid; #profileAchievementsGrid;
  #achievementsSummary; #profileRadarChart; #profileProgressChart;
  unified dossier modal #accountInfoModal with #editProfileNameInput,
  #editProfileQuoteInput, #editProfileAvatarUrl, #editProfileAvatarFile,
  #avatarPresetsGallery, #editProfileAvatarPreview; #editAccountBtn;
  #menuAccountInfo; profile nav menu (#menuMyCollection, #menuMembership,
  #menuSettings, #menuHelp, #menuAddFriend).
- **app.js:** renderProfileStatsBar(); renderProfileCollection();
  renderProfileAchievements(); skeleton generators; renderAvatarPresets();
  updateEditProfilePreview(); saveProfileDraft(); renderRadarChart();
  renderProgressChart(); ACHIEVEMENTS_DATA;
  redirect: editAccountBtn → menuAccountInfo.click().
- **style.css:** #profile-tab, .profile-hero-card, .phc-*, .psb-*, .pcs-*,
  .honor-*, .prestige-honors, .achievements-summary-*,
  .profile-nav-menu, .pnm-*, appended PHASE 7–15 blocks (winning hero-card
  rules), body.light-mode #profile-tab *.
- **translations:** profile.*, honors.*, nav.profile.*, membership.level,
  membership.memberSince, dynamic.sovereign, items.* (collection names).

### TAB: BOUTIQUE
- **index.html:** section#boutique-tab; #boutiqueBalanceDisplay;
  .boutique-ownership-toggle; .boutique-tabs / .boutique-tab;
  #boutiqueSections; #inspectionModal; #premiumToast.
  (#haptic3DOverlay is created at runtime by HapticPreviewManager.)
- **app.js:** BOUTIQUE; ICONS; RARITY_LABEL; EQUIP_CATEGORIES;
  renderBoutique(); renderBoutiqueContent(); renderWidgetSection();
  openInspectionModal(); AppState.purchase()/toggleEquip();
  handleQuickPurchase(); HapticPreviewManager; ParallaxController
  (boutique branch); generateSkeletonGrid().
- **style.css:** #boutique-tab, .boutique-card, .boutique-card-icon,
  .boutique-card-name, .boutique-card-price, .boutique-card-fallback,
  .boutique-own-btn, .boutique-grid, .boutique-section-head,
  .boutique-section-sub, .rarity-badge, .rarity-1..4,
  .purchase-progress-*, .haptic-3d-*, skeleton styles,
  body.light-mode #boutique-tab *.
- **translations:** boutique.*, items.*, misc.rarity1..4.

---

## 3. READ-FIRST MATRIX

| If the task is… | Read FIRST (only these) |
|---|---|
| Profile visual change | index.html #profile-tab slice; style.css .phc-*/.psb-*/.pcs-*/.honor-* + PHASE 7–15 + light overrides; translations profile.*/honors.* |
| Profile logic/state | app.js renderProfile* + ACHIEVEMENTS_DATA + AppState.user slice; index.html #profile-tab + #accountInfoModal |
| Master Card visual | index.html #page-card slice; style.css .membership-card*; luxury.js ONLY if canvas pattern changes |
| Card metrics/rings | app.js renderRing/recalculatePrestige/updateMasterCard; index.html ring IDs; style.css .metric-ring/.ring-* |
| Club visual | index.html #club-tab slice; style.css #club-tab/.club-*/.leader-*; translations club.* |
| Club logic/credits | app.js sendClubMessage/processEliteResponse/updateCreditsUI + credits handlers; index.html #creditsModal |
| Leaderboard | app.js renderLeaderboard + mockTopMembers; style.css .leader-*; translations club.leaderboard* |
| Boutique visual | index.html #boutique-tab slice; style.css .boutique-*/.rarity-*; translations boutique.* |
| Boutique logic | app.js BOUTIQUE/renderBoutique*/openInspectionModal/purchase/toggleEquip/handleQuickPurchase |
| Inspection / haptic preview | app.js HapticPreviewManager + openInspectionModal; style.css .haptic-3d-* + .purchase-modal-overlay |
| Light Mode color | style.css body.light-mode blocks of THAT tab only (+ :root vars if token change) |
| RTL/LTR | style.css directional rules of that tab (logical properties); setLanguage dir handling in app.js |
| Add/rename text | translations.js key + the single call site (window.t or data-i18n); check duplicate keys first |
| Dossier modal | index.html #accountInfoModal slice; app.js preview/preset/draft handlers; style.css modal classes |
| Honors/achievements | app.js ACHIEVEMENTS_DATA + renderProfileAchievements; translations honors.*; style.css .honor-* |
| Skeletons/loading | app.js generate*Skeleton + dataset.skeletonShown pattern; style.css .skeleton-* |
| Sound/haptics | Audio.js + guarded call sites (window.AudioEngine / window.HapticEngine) |
| Server/deploy | server.js + package.json only |

---

## 4. CROSS-CUTTING DEPENDENCIES

- **updateUI()** — hub called on every state change; re-renders Profile
  collection/achievements, rings, equipped slots, active Boutique tab,
  Master Card, avatars, balance, name/quote. Any state-shape change must
  survive updateUI().
- **AppState (alias ClubState)** — single source of truth: owned{},
  equipped{}, balance, totalSpent, chatCredits, user{}, channels{};
  getter collectedItems = Object.keys(owned); init()/save() own the
  localStorage schema.
- **ThemeManager** — setTheme() toggles light-mode/dark-mode on <html> AND
  <body>, sets data-theme, dispatches `themechange` + `resize`.
- **luxury.js** — listens to `themechange`/`resize` to redraw canvases;
  breaking the event breaks card repaint on theme switch.
- **setLanguage()/applyLanguage()** — rewrites [data-i18n] text and
  [data-i18n-placeholder|title|aria-label|data-tooltip] attributes, flips
  html dir/lang + font vars, then re-renders stats bar, collection,
  boutique, leaderboard.
- **window.t(key, lang)** — nested lookup in window.I18N; returns key
  string if missing.
- **ParallaxController / HapticPreviewManager** — query .boutique-card and
  .profile-hero-card nodes at runtime; DOM structure changes in those tabs
  affect them.

---

## 5. DO NOT TOUCH UNLESS REQUIRED

- **metadata.json** — AI Studio platform metadata; platform-owned.
- **luxury.js** — canvas math engine; high visual-regression risk.
- **AppState core** — owned/equipped/collectedItems getter, init()/save();
  Phase-2 invariant.
- **index.html element IDs** — dozens of getElementById bindings in
  app.js; renaming = silent breakage.
- **Cache-busters** — style.css?v=51, app.js?v=55, luxury.js?v=2 in
  index.html; Build Mode does not bump them; change only to force cache
  invalidation knowingly.
- **localStorage schema** — balance_{id}, spent_{id}, chatCredits_{id},
  owned_{id}, equipped_{id}, channels_{id}, profile_{id}, avatar_{id},
  app_theme, one_percent_lang, profileDraft, club_achievements;
  legacy one_percent_collection has a migration in init() — keep or
  migrate, never drop silently.
- **translations.js key contract** — deleting/renaming keys silently
  renders raw keys via window.t fallback.
- **External CDN tags** — d3 v7 + Google Fonts in index.html head.
- **Public signatures** — window.t, window.setLanguage, ThemeManager API.

---

## 6. AWARENESS NOTES (do not rely on; do not "fix" silently)

- Dead stubs: renderClubMessages(), setTypingIndicator();
  window.testRadarUpdate mutates state randomly (test leftover).
- Duplicated listener: #editProfileAvatarFile has TWO change handlers.
- Dead branches: processEliteResponse isArabic/else arrays identical;
  renderProfileCollection nameText ternary has identical branches.
- style.css holds stacked override generations (PHASE 7–15) and a
  duplicated PHASE 10 glint block; last declaration wins — search all
  occurrences before editing any hero-card property.
- profileDraft localStorage draft mechanism still wired to dossier inputs.

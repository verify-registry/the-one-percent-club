
function renderRing(ringId, valueId, percent) {
  const ring = document.getElementById(ringId);
  const valEl = document.getElementById(valueId);
  if (!ring || !valEl) return;
  const radius = ring.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  ring.style.strokeDasharray = `${circumference} ${circumference}`;
  const offset = circumference - (percent / 100) * circumference;
  ring.style.strokeDashoffset = circumference;
  
  // Set value immediately
  valEl.textContent = parseFloat(percent).toFixed(1) + "%";
  
  // Animate with a tiny delay to ensure transition triggers
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = offset;
    });
  });
}

/* === 1. CONFIG & GLOBAL STATE === */
// ==========================================
// CENTRAL LOCALIZATION SYSTEM
// ==========================================

const savedLang = localStorage.getItem("one_percent_lang");
let currentLang = (savedLang === "ar" || savedLang === "en") ? savedLang : "ar";
var boutiqueLoadingTimeout = null;
var profileCollectionTimeout = null;

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

window.t = function (key, lang = currentLang) {
  const item = getNestedValue(window.I18N, key);
  if (item && item[lang]) return item[lang];
  return key; // fallback
};

window.syncClubInputDirection = function (inputEl) {
  const input = inputEl || document.getElementById("clubInput");
  if (!input) return;
  const val = input.value;
  // Match first strong character (Arabic/Hebrew vs Latin)
  const firstStrong = val.match(/[\u0590-\u08FF\uFB1D-\uFDFD\uFE70-\uFEFC]|[A-Za-z]/);
  if (firstStrong) {
    const isArabic = /[\u0590-\u08FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(firstStrong[0]);
    input.setAttribute("dir", isArabic ? "rtl" : "ltr");
    input.style.direction = isArabic ? "rtl" : "ltr";
    input.style.textAlign = isArabic ? "right" : "left";
    input.classList.toggle("is-rtl", isArabic);
    input.classList.toggle("is-ltr", !isArabic);
  } else {
    // If empty or neutral (numbers/symbols), match current active interface language
    const isAr = (currentLang === "ar") || (document.documentElement.dir === "rtl");
    input.setAttribute("dir", isAr ? "rtl" : "ltr");
    input.style.direction = isAr ? "rtl" : "ltr";
    input.style.textAlign = isAr ? "right" : "left";
    input.classList.toggle("is-rtl", isAr);
    input.classList.toggle("is-ltr", !isAr);
  }
};

window.setLanguage = function (lang) {
  if (lang !== "en" && lang !== "ar") return;
  currentLang = lang;
  localStorage.setItem("one_percent_lang", lang);
  if (typeof AppState !== "undefined") AppState.language = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  if (typeof window.syncClubInputDirection === "function") {
    window.syncClubInputDirection();
  }
  // Update typography
  const root = document.documentElement;
  if (lang === "en") {
    root.style.setProperty("--font-display", '"Cormorant Garamond", serif');
    root.style.setProperty("--font-ui", '"Inter", -apple-system, sans-serif');
    root.style.fontFamily = "var(--font-ui)";
  } else {
    root.style.setProperty(
      "--font-display",
      '"Amiri", "Cormorant Garamond", serif',
    );
    root.style.setProperty(
      "--font-ui",
      '"Readex Pro", "Cairo", "Inter", sans-serif',
    );
    root.style.fontFamily = "var(--font-ui)";
  }

  // Apply translations to data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translated = window.t(key, lang);
    if (translated !== key) {
      if (el.children.length === 0) {
        el.textContent = translated;
      } else {
        // We have elements like SVGs inside. Find the span or text node.
        // Cleanest way: If it's a button with an SVG, just find the span inside it and we don't need to do anything here if the span itself has data-i18n.
        // However, if the parent has data-i18n, we should probably just replace the first text node.
        let textReplaced = false;
        for (const child of el.childNodes) {
          if (child.nodeType === 3 && child.nodeValue.trim().length > 0) {
            child.nodeValue = translated;
            textReplaced = true;
            break;
          }
        }
        // Do NOT append/prepend new text nodes here to prevent duplication bugs!
      }
    }
  });

  // Apply translations to attributes
  const attrTypes = ["placeholder", "title", "aria-label", "data-tooltip"];
  attrTypes.forEach((attr) => {
    document.querySelectorAll(`[data-i18n-${attr}]`).forEach((el) => {
      const key = el.getAttribute(`data-i18n-${attr}`);
      const translated = window.t(key, lang);
      if (translated !== key) {
        el.setAttribute(attr, translated);
      }
    });
  });

  // Update Settings Toggles
  const btnEn = document.getElementById("langEnBtn");
  const btnAr = document.getElementById("langArBtn");
  if (btnEn && btnAr) {
    btnEn.classList.toggle("is-active", lang === "en");
    btnAr.classList.toggle("is-active", lang === "ar");
    btnEn.style.background = "";
    btnEn.style.color = "";
    btnEn.style.borderColor = "";
    btnAr.style.background = "";
    btnAr.style.color = "";
    btnAr.style.borderColor = "";
  }

  // Update specific UI states if needed
  if (typeof window.applyLanguage === "function") window.applyLanguage(lang);
  if (typeof window.updateUI === "function") {
    window.updateUI();
  }
  if (typeof window.renderBoutique === "function") window.renderBoutique();
  if (typeof window.renderMessages === "function") window.renderMessages();
  if (typeof window.renderLeaderboard === "function")
    window.renderLeaderboard();

  // Update Profile strings if they rely on UI text
  const profileLevel = document.getElementById("profileMembershipLevel");
  const profileHeroTier = document.getElementById("profileTierName");
  if (typeof AppState !== "undefined") {
    const tier = AppState.user.tier;
    let tierTrans = window.t("misc.member");
    let heroTierTrans = window.t("profile.heroSovereignTier");
    if (tier === "Sovereign" || tier === "سيادي") {
      tierTrans = window.t("misc.sovereign");
      heroTierTrans = window.t("profile.heroSovereignTier");
    } else if (tier === "Elite" || tier === "نخبة") {
      tierTrans = window.t("misc.elite");
      heroTierTrans = window.t("profile.heroEliteTier");
    }
    if (profileLevel) profileLevel.textContent = tierTrans;
    if (profileHeroTier) profileHeroTier.textContent = heroTierTrans;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const btnEn = document.getElementById("langEnBtn");
  const btnAr = document.getElementById("langArBtn");

  if (btnEn) btnEn.addEventListener("click", () => window.setLanguage("en"));
  if (btnAr) btnAr.addEventListener("click", () => window.setLanguage("ar"));

  window.setLanguage(currentLang);

  // --- Theme Mode State Manager ---
  window.ThemeManager = {
    getTheme() {
      try {
        return localStorage.getItem("app_theme") || "dark";
      } catch {
        return "dark";
      }
    },
    isLight() {
      return this.getTheme() === "light";
    },
    setTheme(theme, save = true) {
      const isLight = theme === "light";
      const root = document.documentElement;
      const body = document.body;

      // Apply temporary smooth transition class for silky 120Hz morphing
      root.classList.add("theme-transitioning");
      if (this._themeTransitionTimer) clearTimeout(this._themeTransitionTimer);
      this._themeTransitionTimer = setTimeout(() => {
        root.classList.remove("theme-transitioning");
      }, 280);

      // Toggle dark-mode / light-mode classes on document root element (<html>)
      root.classList.toggle("light-mode", isLight);
      root.classList.toggle("dark-mode", !isLight);
      root.setAttribute("data-theme", theme);

      // Keep body synchronized for backwards compatibility
      if (body) {
        body.classList.toggle("light-mode", isLight);
        body.classList.toggle("dark-mode", !isLight);
        body.setAttribute("data-theme", theme);
      }

      if (save) {
        try {
          localStorage.setItem("app_theme", theme);
        } catch (e) {}
      }

      if (typeof AppState !== "undefined" && AppState) {
        AppState.theme = theme;
      }

      // Sync settings toggle input
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle && themeToggle.checked !== isLight) {
        themeToggle.checked = isLight;
      }

      // Sync settings description text
      const themeDesc = document.getElementById("themeDesc");
      if (themeDesc) {
        const key = isLight ? "settings.theme_light" : "settings.theme_dark";
        themeDesc.setAttribute("data-i18n", key);
        themeDesc.textContent = window.t
          ? window.t(key, currentLang)
          : isLight
            ? "الفاتح الملكي"
            : "الداكن الملكي (الافتراضي)";
      }

      // Trigger redraws for dynamic luxury elements (Guilloche canvas)
      window.dispatchEvent(
        new CustomEvent("themechange", { detail: { theme, isLight } }),
      );
      window.dispatchEvent(new Event("resize"));
    },
    toggle() {
      const next = this.isLight() ? "dark" : "light";
      this.setTheme(next);
      return next;
    },
    init() {
      const initial = this.getTheme();
      this.setTheme(initial, false);

      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.checked = initial === "light";
        themeToggle.addEventListener("change", (e) => {
          const next = e.target.checked ? "light" : "dark";
          this.setTheme(next);
          if (window.AudioEngine && window.AudioEngine.playHover) {
            window.AudioEngine.playHover();
          }
        });
      }
    },
  };

  window.ThemeManager.init();

  // --- Horological Soundscape Global Controller (Settings Modal) ---
  function syncAudioSoundUI(enabled) {
    const isAudioOn = Boolean(enabled);
    const soundscapeToggle = document.getElementById("soundscapeToggle");

    if (soundscapeToggle && soundscapeToggle.checked !== isAudioOn) {
      soundscapeToggle.checked = isAudioOn;
    }
  }
  window.syncAudioSoundUI = syncAudioSoundUI;

  // Initialize UI state from AudioEngine
  const initialAudioState = window.AudioEngine ? window.AudioEngine.isEnabled() : true;
  syncAudioSoundUI(initialAudioState);

  // Listen to AudioEngine state change events
  window.addEventListener("club-audio-change", (e) => {
    syncAudioSoundUI(e.detail ? e.detail.enabled : (window.AudioEngine ? window.AudioEngine.isEnabled() : true));
  });

  // Settings Modal Soundscape Toggle Handler
  const soundscapeToggle = document.getElementById("soundscapeToggle");
  if (soundscapeToggle) {
    soundscapeToggle.checked = initialAudioState;
    soundscapeToggle.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      if (window.AudioEngine) {
        window.AudioEngine.setEnabled(isChecked);
      }
      if (window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap(15);
      }
      if (isChecked && window.AudioEngine && window.AudioEngine.playHover) {
        window.AudioEngine.playHover();
      }
      syncAudioSoundUI(isChecked);

      const toastMsg = isChecked
        ? (window.t ? window.t("settings.soundUnmutedToast") : "تم تشغيل المؤثرات الصوتية الساعاتية")
        : (window.t ? window.t("settings.soundMutedToast") : "تم كتم المؤثرات الصوتية الساعاتية");
      if (typeof showNavToast === "function") {
        showNavToast(toastMsg);
      }
    });
  }

  // --- Tactile Haptics Setting Toggle ---
  const audioHapticToggle = document.getElementById("audioHapticToggle");
  if (audioHapticToggle) {
    const savedHaptic = localStorage.getItem("club_haptic_enabled");
    audioHapticToggle.checked = savedHaptic !== "false";
    audioHapticToggle.addEventListener("change", (e) => {
      localStorage.setItem("club_haptic_enabled", e.target.checked ? "true" : "false");
      if (e.target.checked && window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap(25);
      }
    });
  }

  // --- VIP Notifications Toggle ---
  const vipNotifToggle = document.getElementById("vipNotifToggle");
  if (vipNotifToggle) {
    const savedNotif = localStorage.getItem("club_vip_notifications");
    vipNotifToggle.checked = savedNotif !== "false";
    vipNotifToggle.addEventListener("change", (e) => {
      localStorage.setItem("club_vip_notifications", e.target.checked ? "true" : "false");
      if (window.AudioEngine && window.AudioEngine.playHover) window.AudioEngine.playHover();
      if (window.HapticEngine && window.HapticEngine.tap) window.HapticEngine.tap();
      const msg = e.target.checked
        ? window.t("settings.notifActiveToast")
        : window.t("settings.notifDisabledToast");
      if (typeof showNavToast === "function") showNavToast(msg);
    });
  }

  // --- Stealth Mode Toggle ---
  const stealthModeToggle = document.getElementById("stealthModeToggle");
  if (stealthModeToggle) {
    const savedStealth = localStorage.getItem("club_stealth_mode") === "true";
    stealthModeToggle.checked = savedStealth;
    if (savedStealth) {
      document.body.classList.add("stealth-mode-active");
    }
    stealthModeToggle.addEventListener("change", (e) => {
      const isStealth = e.target.checked;
      localStorage.setItem("club_stealth_mode", isStealth ? "true" : "false");
      if (isStealth) {
        document.body.classList.add("stealth-mode-active");
      } else {
        document.body.classList.remove("stealth-mode-active");
      }
      if (window.AudioEngine && window.AudioEngine.playHover) window.AudioEngine.playHover();
      if (window.HapticEngine && window.HapticEngine.tap) window.HapticEngine.tap();
      const msg = isStealth
        ? window.t("settings.stealthActiveToast")
        : window.t("settings.stealthDisabledToast");
      if (typeof showNavToast === "function") showNavToast(msg);
      if (typeof updateUI === "function") updateUI();
      if (typeof updateMasterCard === "function") updateMasterCard();
    });
  }

});

// Intercept dynamic DOM additions (MutationObserver)
// Since we are moving to data-i18n, we just need to ensure dynamically created components
// have the data-i18n attribute and we can just call setLanguage on them, but for now
// they will be created with window.t() in JS.
window.applyLanguage = function (lang) {
  const colTitle = document.getElementById("collectionSectionTitle");
  if (colTitle)
    colTitle.textContent =
      lang === "ar" ? "خزينة المقتنيات النادرة" : "MY LUXURY COLLECTION";
  if (typeof renderProfileStatsBar === "function") renderProfileStatsBar();
  if (typeof renderProfileCircles === "function") renderProfileCircles();
  if (typeof renderProfileMembershipDeed === "function") renderProfileMembershipDeed();
  if (typeof renderProfileSovereignOath === "function") renderProfileSovereignOath();
  if (typeof renderProfileCollection === "function") renderProfileCollection();
  if (typeof renderProfileAchievements === "function") renderProfileAchievements();
  if (typeof window.syncAudioSoundUI === "function" && window.AudioEngine) {
    window.syncAudioSoundUI(window.AudioEngine.isEnabled());
  }
};
let currentOwnershipFilter = "all";
const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 16.9 6.2 20l1.1-6.5L2.5 8.9l6.6-.9L12 2z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20l1-9 4 3 3-7 3 7 4-3 1 9z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  aura: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#C79A3E" stroke-width="1.8"/><circle cx="12" cy="12" r="4.5" stroke="#C79A3E" stroke-width="0.6" opacity="0.5"/></svg>`,
  ring: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="6" stroke="#C79A3E" stroke-width="1.8"/><path d="M9 8l3-5 3 5-3 2z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  pendant: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v6" stroke="#C79A3E" stroke-width="1.6"/><path d="M8 9h8l-4 12z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
};
const RARITY_LABEL = {
  1: () => window.t("misc.rarity1"),
  2: () => window.t("misc.rarity2"),
  3: () => window.t("misc.rarity3"),
  4: () => window.t("misc.rarity4"),
};
const EQUIP_CATEGORIES = {
  stars: "equippedStarsSlot",
  crowns: "equippedCrownSlot",
  auras: "equippedAuraSlot",
  jewelry: "equippedRingSlot",
};

const ACHIEVEMENTS_DATA = {
  initiate: {
    name: "THE INITIATE",
    title: "FIRST STEP",
    desc: "Boutique threshold: 1 Artifact or $5,000 spent.",
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C9.24 2 7 4.24 7 7C7 9.38 8.67 11.37 10.9 11.87L10 22H14L13.1 11.87C15.33 11.37 17 9.38 17 7C17 4.24 14.76 2 12 2ZM12 8.5C11.17 8.5 10.5 7.83 10.5 7C10.5 6.17 11.17 5.5 12 5.5C12.83 5.5 13.5 6.17 13.5 7C13.5 7.83 12.83 8.5 12 8.5Z" fill="currentColor"/></svg>',
    isUnlocked: () =>
      Object.keys(ClubState.owned).length >= 1 ||
      (ClubState.totalSpent || 0) >= 5000,
    target: 5000,
    progress: () =>
      Math.max(
        Object.keys(ClubState.owned).length ? 5000 : 0,
        ClubState.totalSpent || 0,
      ),
  },
  connoisseur: {
    name: "THE CONNOISSEUR",
    title: "COLLECTOR",
    desc: "Boutique threshold: 3 Artifacts or $25,000 spent.",
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 9L12 22L22 9L12 2ZM12 5.82L17.18 9L12 18.02L6.82 9L12 5.82Z" fill="currentColor"/></svg>',
    isUnlocked: () =>
      Object.keys(ClubState.owned).length >= 3 ||
      (ClubState.totalSpent || 0) >= 25000,
    target: 25000,
    progress: () =>
      Math.max(
        Object.keys(ClubState.owned).length >= 3 ? 25000 : 0,
        ClubState.totalSpent || 0,
      ),
  },
  high_sovereign: {
    name: "HIGH SOVEREIGN",
    title: "ELITE STATUS",
    desc: "Boutique threshold: $50,000 cumulative spend.",
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.5 2 5 4 5 9C5 12.5 7 16 12 21C17 16 19 12.5 19 9C19 4 15.5 2 12 2ZM12 17.5C8.5 13.5 7 11 7 9C7 5.5 9.5 4 12 4C14.5 4 17 5.5 17 9C17 11 15.5 13.5 12 17.5Z" fill="currentColor"/><circle cx="12" cy="9" r="3" fill="currentColor"/></svg>',
    isUnlocked: () => (ClubState.totalSpent || 0) >= 50000,
    target: 50000,
    progress: () => ClubState.totalSpent || 0,
  },
  apex_titan: {
    name: "THE APEX TITAN",
    title: "MAXIMUM PRESTIGE",
    desc: "Boutique threshold: $100,000 cumulative spend.",
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M2 17l2-10 4 4 4-7 4 7 4-4 2 10z" fill="currentColor"/><rect x="3" y="19" width="18" height="2" fill="currentColor"/></svg>',
    isUnlocked: () => (ClubState.totalSpent || 0) >= 100000,
    target: 100000,
    progress: () => ClubState.totalSpent || 0,
  },
};

const BOUTIQUE = {
  stars: {
    title: "boutique.stars",
    items: [
      {
        id: "star1",
        name: "items.star1",
        icon: "star",
        rarity: 1,
        price: 1000,
        lore: "items.star2",
      },
      {
        id: "star2",
        name: "items.star3",
        icon: "star",
        rarity: 2,
        price: 2500,
        lore: "items.star4",
      },
    ],
  },
  crowns: {
    title: "boutique.crowns",
    items: [
      {
        id: "crown1",
        name: "items.crown1",
        icon: "crown",
        rarity: 3,
        price: 5000,
        lore: "items.crown2",
      },
      {
        id: "crown2",
        name: "items.crown3",
        icon: "crown",
        rarity: 4,
        price: 15000,
        lore: "items.crown4",
      },
    ],
  },
  auras: {
    title: "boutique.auras",
    items: [
      {
        id: "aura1",
        name: "items.aura1",
        icon: "aura",
        rarity: 2,
        price: 2000,
        lore: "items.aura2",
      },
      {
        id: "aura2",
        name: "items.aura3",
        icon: "aura",
        rarity: 3,
        price: 8000,
        lore: "items.aura4",
      },
    ],
  },
  jewelry: {
    title: "boutique.jewelry",
    items: [
      {
        id: "ring1",
        name: "items.ring1",
        icon: "ring",
        rarity: 2,
        price: 3000,
        lore: "items.ring2",
      },
      {
        id: "ring2",
        name: "items.ring3",
        icon: "ring",
        rarity: 3,
        price: 7500,
        lore: "items.ring4",
      },
    ],
  },
  artifacts: {
    title: "boutique.rare",
    items: [
      {
        id: "art1",
        name: "items.rare1",
        icon: "pendant",
        rarity: 3,
        price: 10000,
        lore: "items.rare2",
      },
      {
        id: "art2",
        name: "items.rare3",
        icon: "pendant",
        rarity: 4,
        price: 25000,
        lore: "items.rare4",
      },
    ],
  },
  widgets: {
    title: "boutique.widgets",
    items: [
      {
        id: "wid1",
        name: "items.widget1",
        icon: "star",
        rarity: 1,
        price: 0,
        free: true,
        lore: "items.widget2",
      },
    ],
  },
};

// ==========================================
// 2.5 SOVEREIGN CIRCLES & DOMAINS CATALOG
// ==========================================
const SOVEREIGN_CIRCLES_CATALOG = [
  {
    id: "pe_venture",
    nameKey: "profile.circle_pe_venture",
    enName: "Private Equity & Venture",
    arName: "الاستثمار ورأس المال الجريء",
    badge: "ALPHA • VENTURE",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="7" y1="12" x2="17" y2="12"></line><line x1="7" y1="8" x2="13" y2="8"></line><line x1="7" y1="16" x2="11" y2="16"></line><circle cx="16" cy="15" r="2"></circle></svg>`
  },
  {
    id: "haute_horlogerie",
    nameKey: "profile.circle_haute_horlogerie",
    enName: "Haute Horlogerie & Rarities",
    arName: "الساعات الفاخرة والمقتنيات",
    badge: "HOROLOGY • RARITY",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 14.5 13.5"></polyline><path d="M9 2h6M9 22h6M12 2v3M12 19v3"></path></svg>`
  },
  {
    id: "sovereign_ai",
    nameKey: "profile.circle_sovereign_ai",
    enName: "Sovereign AI & Deep Tech",
    arName: "الذكاء الاصطناعي والتكنولوجيا",
    badge: "DEEP TECH • AI",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="3"></rect><circle cx="9" cy="9" r="1.5" fill="currentColor"></circle><circle cx="15" cy="9" r="1.5" fill="currentColor"></circle><path d="M8 15h8M12 4V2M12 22v-2M2 12h2M20 12h2"></path></svg>`
  },
  {
    id: "aviation_yachts",
    nameKey: "profile.circle_aviation_yachts",
    enName: "Private Aviation & Superyachts",
    arName: "الطيران الخاص واليخوت",
    badge: "FLEET • AERONAUTICS",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>`
  },
  {
    id: "prime_estates",
    nameKey: "profile.circle_prime_estates",
    enName: "Prime Architectural Estates",
    arName: "العقارات والقصور الفاخرة",
    badge: "ESTATE • ASSETS",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h2M13 10h2M9 14h2M13 14h2M10 21v-4h4v4"></path></svg>`
  },
  {
    id: "fine_art",
    nameKey: "profile.circle_fine_art",
    enName: "High Art & Historic Curations",
    arName: "الفنون والمقتنيات التاريخية",
    badge: "FINE ART • CURATION",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
  },
  {
    id: "macro_strategy",
    nameKey: "profile.circle_macro_strategy",
    enName: "Global Macro & Sovereign Strategy",
    arName: "الاستراتيجية والاقتصاد الكلي",
    badge: "SOVEREIGN MACRO",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
  },
  {
    id: "royal_equestrian",
    nameKey: "profile.circle_royal_equestrian",
    enName: "Thoroughbred & Purebred Equine",
    arName: "الخيول والفروسية الملكية",
    badge: "EQUINE • ROYAL",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 19h16M19 19a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4M12 3l3 4 5 1-4 4 1 5-5-3-5 3 1-5-4-4 5-1 3-4z"></path></svg>`
  }
];
window.SOVEREIGN_CIRCLES_CATALOG = SOVEREIGN_CIRCLES_CATALOG;

// ==========================================
// ==========================================
const AppState = {
  user: {
    id: "3426",
    name: "ISMAIL ELSAYED",
    username: "ISMAIL ELSAYED",
    tier: "SOVEREIGN MEMBER",
    quote: "Not everyone understands wealth. That's why we have this Club.",
    joined: "AUG 2026",
    est: "EST. 2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    wealthIndex: "98%",
    location: "ALEXANDRIA",
    email: "ism6il.x@gmail.com",
    phone: "+20 12 345 6789",
    interests: "DESIGN · CRAFT · TECHNOLOGY",
    status: "ACTIVE",
    wealthIndexValue: 92,
    privilegesValue: 84,
    connectionsValue: 75,
    verifyUrl: "https://1percent.club/verify/3426",
  },
  get member() {
    return this.user;
  },
  set member(v) {
    this.user = v;
  },
  balance: 24750,
  totalSpent: 0,
  owned: {},
  equipped: {},
  chatCredits: 10,
  theme: localStorage.getItem("app_theme") || "dark",
  activeChannelId: "global-lounge",
  channels: {
    "global-lounge": { name: window.t("club.lounge"), messages: [] },
    wealth: { name: window.t("club.wealth"), messages: [] },
    business: { name: window.t("club.business"), messages: [] },
    lifestyle: { name: window.t("club.lifestyle"), messages: [] },
    ideas: { name: window.t("club.ideas"), messages: [] },
    tech: { name: window.t("club.tech"), messages: [] },
  },

  listeners: [],
  isNotifying: false,
  subscribe(fn) {
    this.listeners.push(fn);
  },
  notify() {
    if (this.isNotifying) return;
    this.isNotifying = true;
    try {
      this.listeners.forEach((fn) => fn(this));
      this.emit("change", this);
    } finally {
      this.isNotifying = false;
    }
  },

  _subscribers: {},
  on(event, callback) {
    if (!this._subscribers[event]) this._subscribers[event] = [];
    this._subscribers[event].push(callback);
  },
  emit(event, data) {
    if (!this._subscribers[event]) return;
    this._subscribers[event].forEach((cb) => cb(data));
  },

  get member() {
    return this.user;
  },
  set member(val) {
    this.user = val;
  },
  get collectedItems() {
    return Object.keys(this.owned);
  },

  init() {
    const savedAvatar = localStorage.getItem("avatar_" + this.user.id);
    if (savedAvatar) this.user.avatarUrl = savedAvatar;

    const savedBalance = localStorage.getItem(`balance_${this.user.id}`);
    this.balance = savedBalance !== null ? parseInt(savedBalance, 10) : 24750;
    const savedSpent = localStorage.getItem(`spent_${this.user.id}`);
    this.totalSpent = savedSpent !== null ? parseInt(savedSpent, 10) : 0;
    const savedCredits = localStorage.getItem(`chatCredits_${this.user.id}`);
    this.chatCredits = savedCredits !== null ? parseInt(savedCredits, 10) : 10;
    try {
      this.owned =
        JSON.parse(localStorage.getItem(`owned_${this.user.id}`)) || {};
    } catch {
      this.owned = {};
    }
    try {
      this.equipped =
        JSON.parse(localStorage.getItem(`equipped_${this.user.id}`)) || {};
    } catch {
      this.equipped = {};
    }

    try {
      const legacyCol = localStorage.getItem("one_percent_collection");
      if (legacyCol) {
        const parsedLegacy = JSON.parse(legacyCol);
        if (Array.isArray(parsedLegacy)) {
          parsedLegacy.forEach((item) => {
            let id = null;
            if (typeof item === "string") id = item;
            else if (item && typeof item === "object" && item.id) id = item.id;
            
            if (id) {
              let found = false;
              for (const cat in BOUTIQUE) {
                if (BOUTIQUE[cat].items.some(i => i.id === id)) {
                  found = true;
                  break;
                }
              }
              if (found) {
                this.owned[id] = true;
              }
            }
          });
        }
      }
    } catch {}
    try {
      const savedChannels = JSON.parse(
        localStorage.getItem(`channels_${this.user.id}`),
      );
      if (savedChannels) {
        for (const k in savedChannels) {
          if (this.channels[k])
            this.channels[k].messages = savedChannels[k].messages;
        }
      }
    } catch {}

    // Seed authentic sovereign messages for any empty channels
    const defaultMessages = {
      "global-lounge": [
        {
          senderId: "001",
          senderName: "Lord Julian",
          senderTier: "FOUNDER",
          senderColor: "#e6c27a",
          senderWealth: "99.9%",
          text: "The Sovereign Gala in Zurich has been ratified. Discreet biometric travel credentials will be dispatched tomorrow.",
          timestamp: Date.now() - 3600000 * 2,
        },
        {
          senderId: "084",
          senderName: "Elena Rostova",
          senderTier: "SOVEREIGN",
          senderColor: "#d4af37",
          senderWealth: "99.7%",
          text: "Splendid. Our flight team has cleared private airspace protocols through Geneva. Looking forward to meeting the circle.",
          timestamp: Date.now() - 3600000,
        },
      ],
      wealth: [
        {
          senderId: "112",
          senderName: "Marcus Sterling",
          senderTier: "TITAN",
          senderColor: "#f3e5ab",
          senderWealth: "99.8%",
          text: "Private placement in sovereign rare earth reserves concluded with 28.4% net yield. Rebalancing liquidity into physical bullion vaults.",
          timestamp: Date.now() - 3600000 * 3,
        },
        {
          senderId: "001",
          senderName: "Lord Julian",
          senderTier: "FOUNDER",
          senderColor: "#e6c27a",
          senderWealth: "99.9%",
          text: "Wise capital preservation. Zurich custodian vaults have recorded the allocation.",
          timestamp: Date.now() - 3600000 * 1.5,
        },
      ],
      business: [
        {
          senderId: "1001",
          senderName: "W. Alexander",
          senderTier: "SOVEREIGN EXARCH",
          senderColor: "#d4af37",
          senderWealth: "99.6%",
          text: "The cross-border clean energy sovereign consortium in Riyadh and Abu Dhabi has ratified the primary term sheet.",
          timestamp: Date.now() - 3600000 * 4,
        },
        {
          senderId: "112",
          senderName: "Marcus Sterling",
          senderTier: "TITAN",
          senderColor: "#f3e5ab",
          senderWealth: "99.8%",
          text: "Syndicate terms look impeccable. Multi-family office capital is fully committed.",
          timestamp: Date.now() - 3600000 * 2,
        },
      ],
      lifestyle: [
        {
          senderId: "084",
          senderName: "Elena Rostova",
          senderTier: "SOVEREIGN",
          senderColor: "#d4af37",
          senderWealth: "99.7%",
          text: "Currently berthed at Port Hercule, Monaco. The regatta atmosphere this season is remarkably tranquil.",
          timestamp: Date.now() - 3600000 * 5,
        },
        {
          senderId: "001",
          senderName: "Lord Julian",
          senderTier: "FOUNDER",
          senderColor: "#e6c27a",
          senderWealth: "99.9%",
          text: "The private sanctuary villa in Kyoto has opened its autumn doors for circle members seeking seclusion.",
          timestamp: Date.now() - 3600000 * 2.5,
        },
      ],
      ideas: [
        {
          senderId: "001",
          senderName: "Lord Julian",
          senderTier: "FOUNDER",
          senderColor: "#e6c27a",
          senderWealth: "99.9%",
          text: "Circulating a confidential thesis on sovereign orbital compute nodes and unregulatable data havens.",
          timestamp: Date.now() - 3600000 * 6,
        },
        {
          senderId: "1001",
          senderName: "W. Alexander",
          senderTier: "SOVEREIGN EXARCH",
          senderColor: "#d4af37",
          senderWealth: "99.6%",
          text: "Physical DePIN infrastructure directly backed by sovereign treasury assets is undoubtedly the vanguard.",
          timestamp: Date.now() - 3600000 * 3,
        },
      ],
      tech: [
        {
          senderId: "084",
          senderName: "Elena Rostova",
          senderTier: "SOVEREIGN",
          senderColor: "#d4af37",
          senderWealth: "99.7%",
          text: "Deploying private air-gapped sovereign neural models calibrated for real-time multi-jurisdiction arbitrage.",
          timestamp: Date.now() - 3600000 * 4,
        },
        {
          senderId: "112",
          senderName: "Marcus Sterling",
          senderTier: "TITAN",
          senderColor: "#f3e5ab",
          senderWealth: "99.8%",
          text: "Zero telemetry leakage and dedicated hardware security modules have verified complete sovereign autonomy.",
          timestamp: Date.now() - 3600000 * 1,
        },
      ],
    };

    for (const chId in this.channels) {
      if (!this.channels[chId].messages || this.channels[chId].messages.length === 0) {
        if (defaultMessages[chId]) {
          this.channels[chId].messages = [...defaultMessages[chId]];
        }
      }
    }

    try {
      const savedProfile = JSON.parse(
        localStorage.getItem(`profile_${this.user.id}`),
      );
      this.user.bio =
        this.user.bio || window.t("items.activeMember") || "Active Member";
      this.user.interests =
        this.user.interests ||
        window.t("items.designTech") ||
        "Design · Technology";
      this.user.location =
        this.user.location || window.t("items.dubai") || "Dubai, UAE";
      this.user.username = this.user.username || "MEMBER";
      if (savedProfile) {
        Object.assign(this.user, savedProfile);
        if (this.user.collectedItems) delete this.user.collectedItems;
      }
      if (!Array.isArray(this.user.circles) || this.user.circles.length === 0) {
        this.user.circles = ["pe_venture", "haute_horlogerie", "sovereign_ai", "aviation_yachts"];
      }
    } catch {}

    this.recalculatePrestige();
  },

  save() {
    localStorage.setItem(`balance_${this.user.id}`, this.balance);
    localStorage.setItem(`spent_${this.user.id}`, this.totalSpent);
    localStorage.setItem(`chatCredits_${this.user.id}`, this.chatCredits);
    localStorage.setItem(`owned_${this.user.id}`, JSON.stringify(this.owned));
    localStorage.setItem(
      `equipped_${this.user.id}`,
      JSON.stringify(this.equipped),
    );
    localStorage.setItem(`channels_${this.user.id}`, JSON.stringify(this.channels));
    localStorage.setItem(`profile_${this.user.id}`, JSON.stringify(this.user));
    localStorage.setItem("app_theme", this.theme || "dark");
    if (typeof window.updateRadarChart === "function")
      window.updateRadarChart();
  },

  recalculatePrestige() {
    let totalItems = 0;
    let addedWealth = 0;
    let addedPrivilege = 0;
    let maxRarity = 0;

    for (const catKey in BOUTIQUE) {
      for (const item of BOUTIQUE[catKey].items) {
        if (this.owned[item.id]) {
          totalItems++;
          addedWealth += item.wealthImpact || item.rarity * 2;
          addedPrivilege += item.privilegeImpact || item.rarity * 1.5;
          if (item.rarity > maxRarity) maxRarity = item.rarity;
        }
      }
    }

    this.member.wealthIndexValue = Math.min(99, Math.floor(82 + addedWealth));
    this.member.privilegesValue = Math.min(99, Math.floor(70 + addedPrivilege));
    this.member.connectionsValue = Math.min(
      99,
      Math.floor(65 + totalItems * 2),
    );
    
    const oldTier = this.member.tier;

    if (totalItems >= 5 && maxRarity >= 3) {
      this.member.tier = "SOVEREIGN EXARCH";
    } else if (totalItems >= 2) {
      this.member.tier = "SOVEREIGN LUMINARY";
    } else {
      this.member.tier = "SOVEREIGN MEMBER";
    }
    
    const tierNameEl = document.getElementById("tierName");
    if (tierNameEl) tierNameEl.textContent = this.member.tier;

    // Update Milestone Badges
    const badgeIds = ["memberTierBadge"];
    badgeIds.forEach((id) => {
      const badgeEl = document.getElementById(id);
      if (badgeEl) {
        if (this.member.tier === "SOVEREIGN EXARCH") {
          badgeEl.className = "milestone-badge active tier-exarch";
        } else if (this.member.tier === "SOVEREIGN LUMINARY") {
          badgeEl.className = "milestone-badge active tier-luminary";
        } else {
          badgeEl.className = "milestone-badge";
        }
      }
    });
    
    if (oldTier && oldTier !== this.member.tier) {
      if (window.HapticEngine) {
        window.HapticEngine.milestoneUnlock();
      } else if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([30, 40, 45, 60, 25]);
      }
      if (typeof window.triggerGoldDustMilestone === "function") {
        window.triggerGoldDustMilestone();
      }
    }
  },

  purchase(item) {
    if (this.balance >= item.price && !this.owned[item.id]) {
      this.balance -= item.price;
      this.totalSpent = (this.totalSpent || 0) + item.price;
      this.owned[item.id] = true;
      this.recalculatePrestige();
      this.save();
      this.notify();

      // Subtle tactile haptic impulse for successful Boutique transaction
      if (window.HapticEngine) {
        window.HapticEngine.boutiquePurchase();
      } else if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([35, 50, 20]);
      }

      // Check milestones/achievements unlocked by this transaction
      Object.keys(ACHIEVEMENTS_DATA).forEach((key) => {
        const ach = ACHIEVEMENTS_DATA[key];
        if (ach.isUnlocked()) {
          if (window.unlockAchievement) {
            window.unlockAchievement(key, ach.name, ach.title);
          }
        }
      });

      if (this._subscribers["change"]) {
        this._subscribers["change"].forEach((cb) => cb());
      }

      if (typeof updateUI === "function") updateUI();
      return true;
    }
    return false;
  },

  toggleEquip(catKey, itemId) {
    if (this.equipped[catKey] === itemId) {
      delete this.equipped[catKey];
    } else {
      this.equipped[catKey] = itemId;
    }
    this.save();
    if (typeof updateUI === "function") updateUI();
  },
};
const ClubState = AppState;
Object.defineProperty(ClubState, "member", {
  get: () => AppState.user,
  set: (v) => {
    AppState.user = v;
  },
  configurable: true,
  enumerable: true,
});

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
if (typeof window !== "undefined") {
  window.escapeHtml = escapeHtml;
}

window.openMemberMiniDossier = function (member) {
  if (!member) return;
  const modal = document.getElementById("memberMiniDossierModal");
  if (!modal) return;

  if (window.AudioEngine && window.AudioEngine.playModalOpen) {
    window.AudioEngine.playModalOpen();
  }
  if (window.HapticEngine && window.HapticEngine.tap) {
    window.HapticEngine.tap(14);
  }

  const isAr = AppState.language === "ar" || document.documentElement.lang === "ar";
  let memberName = member.name || "MEMBER";
  if (memberName === "Alexander W.") memberName = "W. Alexander";
  if (memberName === "ALEXANDER W.") memberName = "W. ALEXANDER";

  // Name
  const nameEl = document.getElementById("miniDossierName");
  if (nameEl) nameEl.innerHTML = `<bdi dir="auto">${memberName}</bdi>`;

  // Avatar
  const avatarEl = document.getElementById("miniDossierAvatar");
  if (avatarEl) {
    avatarEl.src = member.avatar || "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=240&auto=format&fit=crop";
    avatarEl.alt = memberName;
  }

  // Status Pip
  const statusPip = document.getElementById("miniDossierStatusPip");
  if (statusPip) {
    statusPip.style.display = member.isOnline !== false ? "block" : "none";
  }

  // Tier
  const tierEl = document.getElementById("miniDossierTier");
  const rawTier = (member.tier || "SOVEREIGN").toUpperCase();
  let tierText = rawTier;
  if (isAr) {
    if (/FOUNDER/.test(rawTier)) tierText = "مؤسس المجلس السيادي • FOUNDER";
    else if (/EXARCH/.test(rawTier)) tierText = "حاكم سيادي تنفيذي • SOVEREIGN EXARCH";
    else if (/ARCHON/.test(rawTier)) tierText = "أركون سيادي أول • SOVEREIGN ARCHON";
    else if (/TITAN/.test(rawTier)) tierText = "تيتان رأس المال • CAPITAL TITAN";
    else tierText = "عضو سيادي معتمد • SOVEREIGN MEMBER";
  } else {
    tierText = `${rawTier} MEMBER`;
  }
  if (tierEl) tierEl.textContent = tierText;

  // Seat / Jurisdiction
  const seatEl = document.getElementById("miniDossierSeat");
  if (seatEl) {
    const rawSeat = (member.seat || member.city || "GENEVA").toUpperCase();
    let seatText = rawSeat;
    if (isAr) {
      if (/GENEVA/.test(rawSeat)) seatText = "المقر الدبلوماسي • جنيف (Geneva)";
      else if (/ZURICH/.test(rawSeat)) seatText = "المقر المصرفي • زيورخ (Zurich)";
      else if (/MONACO/.test(rawSeat)) seatText = "الملاذ السيادي • موناكو (Monaco)";
      else if (/LONDON/.test(rawSeat)) seatText = "حي النخبة المالي • لندن (London)";
      else if (/DUBAI/.test(rawSeat)) seatText = "برج السيادة • دبي (Dubai)";
      else if (/PARIS/.test(rawSeat)) seatText = "حي الفخامة التراثي • باريس (Paris)";
    } else {
      seatText = `${rawSeat} JURISDICTION`;
    }
    seatEl.textContent = seatText;
  }

  // Wealth & Priv
  const wealthEl = document.getElementById("miniDossierWealth");
  if (wealthEl) wealthEl.textContent = member.wealth || "99.8%";

  const privEl = document.getElementById("miniDossierPriv");
  if (privEl) privEl.textContent = member.priv || "98.5%";

  const charterEl = document.getElementById("miniDossierCharter");
  if (charterEl) {
    charterEl.textContent = isAr ? "ميثاق سيادي مُعتمد" : "Sovereign Charter";
  }

  // Motto / Creed
  const mottoEl = document.getElementById("miniDossierMotto");
  if (mottoEl) {
    const defaultMotto = isAr
      ? "السيادة ليست مجرد مكانة، بل هي معيار الوجود والريادة."
      : "Discipline, exclusivity, and sovereign governance.";
    mottoEl.textContent = `"${member.quote || defaultMotto}"`;
  }

  // Regalia Chips
  const regaliaEl = document.getElementById("miniDossierRegalia");
  if (regaliaEl) {
    let chips = [];
    if (/FOUNDER/.test(rawTier)) {
      chips = isAr
        ? ["👑 تاج المؤسس الذهبي", "💍 خاتم العرش الزيورخي", "⚜️ وسام السيادة الأول"]
        : ["👑 Founder's Imperial Crown", "💍 Zurich Signet Ring", "⚜️ Sovereign First Medal"];
    } else if (/EXARCH/.test(rawTier) || /alexander/i.test(memberName)) {
      chips = isAr
        ? ["👑 إكليل السيادة المطلقة", "💍 خاتم الوفاق السويسري", "⚜️ وسام المعمار الرقمي"]
        : ["👑 Absolute Sovereign Diadem", "💍 Swiss Accord Signet", "⚜️ Digital Architecture Medal"];
    } else if (/MONACO/i.test(member.seat || "") || /ROSTOVA/i.test(memberName)) {
      chips = isAr
        ? ["👑 تاج موناكو السيادي", "💎 قلادة الزمرد الملكية", "💍 خاتم السلالة"]
        : ["👑 Monaco Sovereign Crown", "💎 Royal Emerald Choker", "💍 Lineage Signet"];
    } else if (/LONDON/i.test(member.seat || "") || /TITAN/i.test(rawTier)) {
      chips = isAr
        ? ["⚡ صولجان رأس المال", "💍 خاتم تيتان لندن", "⚜️ وسام السيولة العابرة"]
        : ["⚡ Capital Sceptre", "💍 London Titan Ring", "⚜️ Global Liquidity Medal"];
    } else {
      chips = isAr
        ? ["👑 تاج السيادة المعتمد", "💍 خاتم الوفاق والمصادقة", "⚜️ وسام النخبة الدبلوماسي"]
        : ["👑 Sovereign Crown", "💍 Ring of Accord", "⚜️ Diplomatic Medal"];
    }
    regaliaEl.innerHTML = chips
      .map((c) => `<span class="mini-regalia-chip">${c}</span>`)
      .join("");
  }

  // Toast Action
  const toastBtn = document.getElementById("miniDossierToastBtn");
  if (toastBtn) {
    toastBtn.onclick = () => {
      if (window.AudioEngine && window.AudioEngine.playAccoladeStamp) {
        window.AudioEngine.playAccoladeStamp("toast");
      }
      if (window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap(24);
      }
      const title = isAr ? "نخب الامتياز السيادي" : "Prestige Toast Conferred";
      const sentMsg = isAr
        ? `تم تقديم نخب الامتياز بنجاح إلى ${memberName}`
        : `Prestige toast conferred successfully to ${memberName}`;
      if (typeof showPremiumToast === "function") {
        showPremiumToast(title, sentMsg);
      }
    };
  }

  // Private Chat Action
  const msgBtn = document.getElementById("miniDossierMsgBtn");
  if (msgBtn) {
    msgBtn.onclick = () => {
      if (window.AudioEngine && window.AudioEngine.playRustle) window.AudioEngine.playRustle();
      if (window.HapticEngine && window.HapticEngine.tap) window.HapticEngine.tap(15);
      const title = isAr ? "المراسلات الثنائية" : "Private Channel";
      const notice = isAr
        ? "قريبًا • المراسلات الثنائية المشفرة قيد الاعتماد الدبلوماسي"
        : "Coming soon • Encrypted bilateral channels in diplomatic accreditation";
      if (typeof showPremiumToast === "function") showPremiumToast(title, notice);
    };
  }

  // Add Member Action
  const addBtn = document.getElementById("miniDossierAddBtn");
  if (addBtn) {
    addBtn.onclick = () => {
      if (window.AudioEngine && window.AudioEngine.playRustle) window.AudioEngine.playRustle();
      if (window.HapticEngine && window.HapticEngine.tap) window.HapticEngine.tap(15);
      const title = isAr ? "الدائرة السيادية" : "Sovereign Circle";
      const notice = isAr
        ? "قريبًا • توسيع الدوائر بانتظار اعتماد المجلس"
        : "Coming soon • Circle expansions pending council clearance";
      if (typeof showPremiumToast === "function") showPremiumToast(title, notice);
    };
  }

  // Full Profile Action
  const fullProfileBtn = document.getElementById("miniDossierFullProfileBtn");
  if (fullProfileBtn) {
    fullProfileBtn.onclick = () => {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      if (typeof openMemberProfile === "function") {
        openMemberProfile(member);
      }
    };
  }

  // Close handlers
  const closeBtn = document.getElementById("closeMiniDossierBtn");
  const closeModal = () => {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    if (window.AudioEngine && window.AudioEngine.playModalClose) {
      window.AudioEngine.playModalClose();
    }
  };
  if (closeBtn) closeBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
};

window.openMemberProfileFromDispatch = function (senderId) {
  try {
    if (window.AudioEngine && window.AudioEngine.playRustle) {
      window.AudioEngine.playRustle();
    }
    if (window.HapticEngine && window.HapticEngine.tap) {
      window.HapticEngine.tap(12);
    }
    if (senderId === AppState.user.id) {
      if (typeof goToPage === "function") {
        goToPage("profile");
        return;
      }
    }

    const elite = typeof ELITE_MEMBERS !== "undefined"
      ? ELITE_MEMBERS.find((m) => m.id === senderId)
      : null;
    const isMe = senderId === AppState.user.id;
    const avatarUrl = typeof getMemberAvatar === "function"
      ? getMemberAvatar(senderId, elite?.name, isMe)
      : ((typeof ELITE_AVATARS !== "undefined" && ELITE_AVATARS[senderId]) ||
         "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=240&auto=format&fit=crop");

    let rawName = elite ? elite.name : (senderId === AppState.user.id ? AppState.user.name : "MEMBER");
    if (rawName === "Alexander W.") rawName = "W. Alexander";
    if (rawName === "ALEXANDER W.") rawName = "W. ALEXANDER";

    const memberData = {
      id: senderId,
      name: rawName,
      tier: elite ? elite.tier : (senderId === AppState.user.id ? AppState.user.tier : "SOVEREIGN MEMBER"),
      seat: elite ? (elite.seat || "GENEVA") : "GENEVA",
      wealth: senderId === AppState.user.id ? (AppState.user.wealthIndex || "98%") : (elite?.wealth || "99.8%"),
      priv: elite?.priv || "98.5%",
      quote: elite && elite.motto ? elite.motto : "Discipline, exclusivity, sovereignty.",
      avatar: avatarUrl,
      isOnline: true,
    };

    if (typeof openMemberMiniDossier === "function") {
      openMemberMiniDossier(memberData);
    } else if (typeof openMemberProfile === "function") {
      openMemberProfile(memberData);
    }
  } catch (err) {
    console.error("openMemberProfileFromDispatch error:", err);
  }
};
Object.defineProperty(AppState.user, "balance", {
  get: () => AppState.balance,
  set: (v) => (AppState.balance = v),
});
Object.defineProperty(AppState.user, "totalSpent", {
  get: () => AppState.totalSpent,
  set: (v) => (AppState.totalSpent = v),
});
Object.defineProperty(AppState.user, "memberSince", {
  get: () => AppState.user.joined,
});
Object.defineProperty(AppState.user, "connections", {
  get: () => AppState.user.connectionsValue,
});

const ELITE_AVATARS = {
  "001": "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=240&auto=format&fit=crop", // Lord Julian (Founder / Zurich)
  "084": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240&auto=format&fit=crop", // Elena Rostova (Sovereign / Monaco)
  "112": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240&auto=format&fit=crop", // Marcus Sterling (Titan / London)
  "1001": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=240&auto=format&fit=crop", // W. Alexander (Sovereign Exarch / Geneva)
  "777": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=240&auto=format&fit=crop", // Sheikh Tariq Al-Mansoor (Sovereign / Dubai)
  "205": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240&auto=format&fit=crop", // Baroness Charlotte (Sovereign / Paris)
  "000": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=240&auto=format&fit=crop", // Concierge Desk (System / Geneva)
};

const FALLBACK_SOVEREIGN_AVATARS = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=240&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=240&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=240&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=240&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=240&auto=format&fit=crop",
];

function getMemberAvatar(senderId, senderName, isMe) {
  if (isMe) {
    return (
      AppState.user.avatarUrl ||
      AppState.user.avatar ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop"
    );
  }
  const sId = String(senderId || "").trim();
  if (sId && ELITE_AVATARS[sId]) {
    return ELITE_AVATARS[sId];
  }
  if (senderName) {
    const sName = String(senderName).toLowerCase();
    if (sName.includes("julian")) return ELITE_AVATARS["001"];
    if (sName.includes("elena") || sName.includes("rostova")) return ELITE_AVATARS["084"];
    if (sName.includes("marcus") || sName.includes("sterling")) return ELITE_AVATARS["112"];
    if (sName.includes("alexander")) return ELITE_AVATARS["1001"];
    if (sName.includes("tariq") || sName.includes("mansoor")) return ELITE_AVATARS["777"];
    if (sName.includes("charlotte")) return ELITE_AVATARS["205"];
    if (sName.includes("concierge")) return ELITE_AVATARS["000"];
  }
  const key = String(senderId || senderName || "sovereign-member");
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return FALLBACK_SOVEREIGN_AVATARS[hash % FALLBACK_SOVEREIGN_AVATARS.length];
}

const ELITE_SEATS = {
  "001": "ZURICH",
  "084": "MONACO",
  "112": "LONDON",
  "1001": "GENEVA",
  "777": "DUBAI",
  "205": "PARIS",
  "000": "GENEVA",
};

if (typeof window !== "undefined") {
  window.ELITE_AVATARS = ELITE_AVATARS;
  window.ELITE_SEATS = ELITE_SEATS;
  window.getMemberAvatar = getMemberAvatar;
}

AppState.init();
const savedAppLang = localStorage.getItem("one_percent_lang");
const initialLang = savedAppLang === "ar" ? "ar" : "en";
AppState.language = initialLang;
if (typeof window.applyLanguage === "function")
  window.applyLanguage(initialLang);

document.getElementById("photoUploadBtn")?.addEventListener("click", () => {
  document.getElementById("photoInput")?.click();
});

function handleImageUpload(e, callback) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    callback(event.target.result);
  };
  reader.readAsDataURL(file);
}

document.getElementById("photoInput")?.addEventListener("change", (e) => {
  handleImageUpload(e, (dataUrl) => {
    AppState.user.avatarUrl = dataUrl;
    AppState.save();
    updateUI();
  });
});

document
  .getElementById("editProfileAvatarFile")
  ?.addEventListener("change", (e) => {
    handleImageUpload(e, (dataUrl) => {
      const urlInput = document.getElementById("editProfileAvatarUrl");
      if (urlInput) {
        urlInput.value = dataUrl;
        urlInput.dispatchEvent(new Event("input"));
      }
    });
  });

document.addEventListener("DOMContentLoaded", () => AppState.notify());

function updateUI() {
  AppState.notify();
}

// ---------------------------------------------------------
// ---------------------------------------------------------
ClubState.on("change", () => {
  const avatarElements = document.querySelectorAll(
    "#portraitPhoto, #profilePortraitPhoto, #widgetAvatarPhoto, .membership-avatar",
  );
  avatarElements.forEach((el) => {
    if (AppState.user.avatarUrl) {
      if (el.tagName.toLowerCase() === "img") {
        el.src = AppState.user.avatarUrl;
      } else {
        el.style.backgroundImage = `url('${AppState.user.avatarUrl}')`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
      }
    }
  });

  const photoUploadBtn = document.getElementById("photoUploadBtn");
  if (photoUploadBtn) {
    photoUploadBtn.style.display = AppState.user.avatarUrl ? "none" : "flex";
  }
  const idElements = document.querySelectorAll(
    ".membership-id, #profileIdValue",
  );
  idElements.forEach((el) => {
    if (el.id === "profileIdValue") {
      el.textContent = AppState.user.id;
    } else {
      el.textContent = "ID: " + AppState.user.id;
    }
  });

  const estElements = document.querySelectorAll(".membership-est");
  estElements.forEach((el) => {
    el.textContent = AppState.user.est;
  });

  const isStealth = localStorage.getItem("club_stealth_mode") === "true";
  const stealthMoniker = window.currentLang === "ar" ? "عضو متخفٍ #8492" : "ANONYMOUS MEMBER #8492";

  const pName = document.getElementById("profileName");
  if (pName) {
    pName.textContent = isStealth ? stealthMoniker : (AppState.user.username || AppState.user.name);
  }

  const pTier = document.getElementById("profileTierName");
  if (pTier) {
    const tier = AppState.user.tier;
    let heroTierTrans = window.t("profile.heroSovereignTier");
    if (tier === "Elite" || tier === "نخبة") {
      heroTierTrans = window.t("profile.heroEliteTier");
    }
    pTier.textContent = heroTierTrans;
  }

  const pBio = document.getElementById("profileBioValue");
  if (pBio && AppState.user.bio) pBio.textContent = AppState.user.bio;

  const pInt = document.getElementById("profileInterestsValue");
  if (pInt && AppState.user.interests)
    pInt.textContent = AppState.user.interests;

  const pLoc = document.getElementById("profileLocationValue");
  if (pLoc && AppState.user.location) pLoc.textContent = AppState.user.location;

  // Profile Sovereign Hero Card Dynamic Elements
  const pCardId = document.getElementById("profileCardMemberId");
  if (pCardId) {
    const rawId = AppState.user.id || "3426";
    pCardId.textContent = `ID #${rawId} · 1P`;
  }

  const pCardLoc = document.getElementById("profileCardLocation");
  if (pCardLoc) {
    pCardLoc.textContent = (AppState.user.location || "ALEXANDRIA").toUpperCase();
  }

  const pCardEst = document.getElementById("profileCardEst");
  if (pCardEst) {
    pCardEst.textContent = AppState.user.est || "EST. 2026";
  }

  const pCardStanding = document.getElementById("profileCardStanding");
  if (pCardStanding) {
    pCardStanding.textContent = window.t("profile.statusStanding") || "SOVEREIGN";
  }

  const pCardWealth = document.getElementById("profileCardWealthVal");
  if (pCardWealth) {
    pCardWealth.textContent = AppState.user.wealthIndex || "98%";
  }

  const pCardWealthFill = document.getElementById("profileCardWealthFill");
  if (pCardWealthFill) {
    pCardWealthFill.style.width = AppState.user.wealthIndex || "98%";
  }

  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none">
      <path d="M12 4v12M8 8l4-4 4 4M5 15v3a2 2 0 002 2h10a2 2 0 002-2v-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
    <span>${window.t("membership.shareMembership")}</span>`;
  }

  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.4"></rect>
      <path d="M5 15V5a1 1 0 011-1h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path>
    </svg>
    <span>${window.t("membership.copyLink")}</span>`;
  }

  const pQuote = document.getElementById("profileQuote");
  if (pQuote) {
    if (
      AppState.user.quote ===
      "Not everyone understands wealth. That's why we have this Club."
    ) {
      pQuote.textContent = '"' + window.t("profile.quoteText") + '"';
    } else {
      pQuote.textContent =
        '"' + (AppState.user.quote || AppState.user.bio) + '"';
    }
  }

  const wealthLabel = document.querySelector(
    '[data-i18n="membership.wealthIndex"]',
  );
  if (wealthLabel && !wealthLabel.querySelector("span"))
    wealthLabel.textContent = window.t("membership.wealthIndex");

  const privLabel = document.querySelector(
    '[data-i18n="membership.privileges"]',
  );
  if (privLabel && !privLabel.querySelector("span"))
    privLabel.textContent = window.t("membership.privileges");

  const mName = document.getElementById("memberName");
  if (mName) {
    mName.textContent = isStealth ? stealthMoniker : AppState.user.name;
  }

  const balEl = document.getElementById("boutiqueBalanceDisplay");
  if (balEl) balEl.textContent = AppState.balance.toLocaleString("en-US");

  const countEl = document.getElementById("profileItemCount");
  if (countEl) countEl.textContent = AppState.collectedItems.length;

  if (typeof renderProfileStatsBar === "function") renderProfileStatsBar();
  if (typeof renderProfileCircles === "function") renderProfileCircles();
  if (typeof renderProfileMembershipDeed === "function") renderProfileMembershipDeed();
  if (typeof renderProfileSovereignOath === "function") renderProfileSovereignOath();
  if (typeof renderProfileCollection === "function") renderProfileCollection();
  if (typeof renderProfileAchievements === "function")
    renderProfileAchievements();

  if (typeof renderRing === "function") {
    renderRing("wealthRing", "wealthValue", AppState.user.wealthIndexValue);
    renderRing("privRing", "privValue", AppState.user.privilegesValue);
  }

  if (typeof applyEquippedToCard === "function")
    applyEquippedToCard(AppState.equipped);

  const activeBoutiqueTab = document.querySelector(".boutique-tab.is-active");
  if (activeBoutiqueTab && typeof renderBoutique === "function") {
    renderBoutique(activeBoutiqueTab.dataset.cat);
  }

  if (typeof updateMasterCard === "function") updateMasterCard();

  let minPrice = Infinity;
  for (const catKey in BOUTIQUE) {
    for (const item of BOUTIQUE[catKey].items) {
      if (!item.free && item.price < minPrice) minPrice = item.price;
    }
  }
  const addBtn = document.getElementById("boutiqueAddBalanceBtn");
  if (addBtn) {
    if (ClubState.balance < minPrice) addBtn.classList.add("needs-balance");
    else addBtn.classList.remove("needs-balance");
  }
});

function applyEquippedToCard(equipped) {
  for (const catKey in EQUIP_CATEGORIES) {
    const slotId = EQUIP_CATEGORIES[catKey];
    const slotEl = document.getElementById(slotId);
    if (!slotEl) continue;
    const itemId = equipped[catKey];
    if (itemId) {
      const itemDef = BOUTIQUE[catKey].items.find((i) => i.id === itemId);
      if (itemDef) {
        slotEl.innerHTML = ICONS[itemDef.icon] || ICONS["star"];
        slotEl.style.display = "flex";
      } else {
        slotEl.style.display = "none";
      }
    } else {
      slotEl.style.display = "none";
    }
  }

  // Synchronize equipped luxury assets on Profile Hero Plaque
  const profileEquipMap = {
    crowns: "profileEquippedCrownSlot",
    auras: "profileEquippedAuraSlot",
    rings: "profileEquippedRingSlot",
  };
  for (const catKey in profileEquipMap) {
    const pSlotId = profileEquipMap[catKey];
    const pSlotEl = document.getElementById(pSlotId);
    if (!pSlotEl) continue;
    const itemId = equipped[catKey];
    if (itemId) {
      const itemDef = BOUTIQUE[catKey]?.items?.find((i) => i.id === itemId);
      if (itemDef) {
        pSlotEl.innerHTML = ICONS[itemDef.icon] || ICONS["star"];
        pSlotEl.style.display = "flex";
      } else {
        pSlotEl.style.display = "none";
      }
    } else {
      pSlotEl.style.display = "none";
    }
  }
}

// Sovereign Hallmark Coin Tactile Verification
(function setupProfileHallmarkInteraction() {
  function attachCoinHandler() {
    const coin = document.getElementById("profileCrownCoin");
    if (!coin || coin.dataset.bound === "true") return;
    coin.dataset.bound = "true";
    coin.addEventListener("click", () => {
      coin.classList.remove("is-coin-mint-active");
      void coin.offsetWidth;
      coin.classList.add("is-coin-mint-active");
      if (window.AudioEngine && window.AudioEngine.playChime) {
        window.AudioEngine.playChime();
      }
      if (window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap(25);
      }
      if (typeof showPremiumToast === "function") {
        const isAr = (typeof AppState !== "undefined" && AppState.language === "ar") || document.documentElement.lang === "ar";
        showPremiumToast(
          isAr ? "ختم السيادة الذهبي" : "Sovereign Hallmark AU 999.9",
          isAr ? "تم التحقق من مطابقة عيار الذهب السيادي والمواصفات الرسمية." : "Verified 24K solid hallmark & official calibre specification."
        );
      }
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachCoinHandler);
  } else {
    attachCoinHandler();
  }
})();

// Sovereign Dossier Hero Card Quick Actions & Medallion Interactions
(function setupProfileHeroInteractions() {
  function attachHeroActions() {
    // 1. Portrait Medallion Tap -> Open Edit Dossier Modal
    const avatarRing = document.getElementById("profileAvatarRing");
    if (avatarRing && avatarRing.dataset.bound !== "true") {
      avatarRing.dataset.bound = "true";
      avatarRing.addEventListener("click", () => {
        if (window.AudioEngine && window.AudioEngine.playClick) {
          window.AudioEngine.playClick();
        }
        document.getElementById("editAccountBtn")?.click();
      });
    }

    // 2. Add Member Button -> Tactile Feedback & Prompt
    const btnAdd = document.getElementById("btnProfileAddFriend");
    if (btnAdd && btnAdd.dataset.bound !== "true") {
      btnAdd.dataset.bound = "true";
      btnAdd.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.AudioEngine && window.AudioEngine.playClick) {
          window.AudioEngine.playClick();
        }
        if (window.HapticEngine && window.HapticEngine.tap) {
          window.HapticEngine.tap(15);
        }
        const isAr = (typeof AppState !== "undefined" && AppState.language === "ar") || document.documentElement.lang === "ar";
        const msg = isAr ? "إضافة عضو موثق — قريباً" : "Accredited Member Connection — Coming Soon";
        if (typeof showNavToast === "function") {
          showNavToast(msg);
        } else if (typeof showCopyToast === "function") {
          showCopyToast(msg);
        }
      });
    }

    // 3. Send Message Button -> Tactile Feedback & Prompt
    const btnMsg = document.getElementById("btnProfileSendMessage");
    if (btnMsg && btnMsg.dataset.bound !== "true") {
      btnMsg.dataset.bound = "true";
      btnMsg.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.AudioEngine && window.AudioEngine.playClick) {
          window.AudioEngine.playClick();
        }
        if (window.HapticEngine && window.HapticEngine.tap) {
          window.HapticEngine.tap(15);
        }
        const isAr = (typeof AppState !== "undefined" && AppState.language === "ar") || document.documentElement.lang === "ar";
        const msg = isAr ? "المراسلة الدبلوماسية المشفرة — قريباً" : "Encrypted Diplomatic Dispatch — Coming Soon";
        if (typeof showNavToast === "function") {
          showNavToast(msg);
        } else if (typeof showCopyToast === "function") {
          showCopyToast(msg);
        }
      });
    }

    // 4. Share Dossier Button -> Copy Verification Link & Haptic Chime
    const btnShare = document.getElementById("btnProfileShareDossier");
    if (btnShare && btnShare.dataset.bound !== "true") {
      btnShare.dataset.bound = "true";
      btnShare.addEventListener("click", async (e) => {
        e.preventDefault();
        if (window.AudioEngine && window.AudioEngine.playChime) {
          window.AudioEngine.playChime();
        }
        if (window.HapticEngine && window.HapticEngine.tap) {
          window.HapticEngine.tap(25);
        }
        const memberId = AppState.user?.id || "3426";
        const shareUrl = `${window.location.origin}${window.location.pathname}?ref=dossier-${memberId}#profile`;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareUrl);
          }
        } catch (err) {}
        const isAr = (typeof AppState !== "undefined" && AppState.language === "ar") || document.documentElement.lang === "ar";
        const msg = isAr ? "تم نسخ رابط الملف السيادي المعتمد بنجاح" : "Official Sovereign Dossier Link Copied";
        if (typeof showCopyToast === "function") {
          showCopyToast(msg);
        } else if (typeof showNavToast === "function") {
          showNavToast(msg);
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachHeroActions);
  } else {
    attachHeroActions();
  }
})();

/* =========================================================
   THE 1% CLUB — app.js Phase 2
   Master Card · Club Chat · Credits · Boutique · Equip · Widget 1
========================================================= */


function generateBoutiqueSkeleton(categories = ["crowns"]) {
  const catsToShow = categories.length > 0 ? categories : Object.keys(BOUTIQUE);
  let html = "";
  catsToShow.forEach((catKey) => {
    if (catKey === "widgets") return;
    html += `
      <section class="boutique-section boutique-skeleton-section" data-skeleton="true">
        <div class="boutique-section-head">
          <div class="skeleton-shimmer-el skeleton-section-title"></div>
          <div class="skeleton-shimmer-el skeleton-section-subtitle"></div>
        </div>
        <div class="boutique-grid">
          ${Array(4).fill(0).map(() => `
            <div class="boutique-card boutique-skeleton">
              <span class="skeleton-shimmer-el skeleton-badge"></span>
              <span class="skeleton-shimmer-el skeleton-icon"></span>
              <span class="skeleton-shimmer-el skeleton-name"></span>
              <span class="skeleton-shimmer-el skeleton-price"></span>
              <div class="skeleton-shimmer-el skeleton-progress"></div>
              <div class="skeleton-shimmer-el skeleton-button"></div>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  });
  return html;
}

// boutiqueLoadingTimeout hoisted at top-level

/* === 3. BOUTIQUE & STORE RENDERING === */
function renderBoutique(filter = "all", showSkeleton = false) {
  const root = document.getElementById("boutiqueSections");
  if (!root) return;
  const owned = ClubState.owned;
  const equipped = ClubState.equipped;
  const categories = filter === "all" ? Object.keys(BOUTIQUE) : [filter];

  if (showSkeleton || !root.dataset.skeletonShown) {
    if (boutiqueLoadingTimeout) clearTimeout(boutiqueLoadingTimeout);
    root.innerHTML = generateBoutiqueSkeleton(categories);
    root.dataset.skeletonShown = "true";
    boutiqueLoadingTimeout = setTimeout(() => {
      renderBoutiqueContent(filter, root, owned, equipped, categories);
    }, 380);
    return;
  }

  renderBoutiqueContent(filter, root, owned, equipped, categories);
}

function renderBoutiqueContent(filter, root, owned, equipped, categories) {
  root.innerHTML = categories
    .map((catKey) => {
      const cat = BOUTIQUE[catKey];

      if (catKey === "widgets") {
        return renderWidgetSection();
      }

      const currentBalance = ClubState.balance;

      const filteredItems = cat.items.filter((item) => {
        const isOwned = ClubState.owned[item.id];
        if (currentOwnershipFilter === "owned") return isOwned;
        if (currentOwnershipFilter === "unowned") return !isOwned;
        return true;
      });

      if (filteredItems.length === 0) return ""; // Skip category if empty due to filter

      const cards = filteredItems
        .map((item) => {
          const isOwned = ClubState.owned[item.id];
          const isEquipped = ClubState.equipped[catKey] === item.id;
          const canEquip = EQUIP_CATEGORIES[catKey] !== undefined;

          let btnText = "";
          let btnClass = "";
          let btnOnClick = "";
          let btnPointerEvents = "pointer-events: none;";
          let extraCardClass = "";
          
          if (item.free) {
            btnText = window.t("boutique.ownedCheck");
            btnClass = "btn-free";
          } else if (isEquipped) {
            btnText = window.t("boutique.equip");
            btnClass = "btn-equip";
          } else if (isOwned) {
            if (window.quickPurchasedItems && window.quickPurchasedItems.has(item.id)) {
              btnText = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-inline-end: 4px; vertical-align: middle;"><polyline points="20 6 9 17 4 12"></polyline></svg> ` + window.t("boutique.owned");
              btnClass = "btn-owned qp-success-btn";
              extraCardClass = " qp-shimmer-active";
            } else {
              btnText = window.t("boutique.owned");
              btnClass = "btn-owned";
            }
          } else {
            btnText = window.t("boutique.acquire");
            btnClass = "";
            btnPointerEvents = "pointer-events: auto;";
            btnOnClick = `onclick='handleQuickPurchase(event, ${JSON.stringify(item)}, "${catKey}")'`;
          }

          const cardClass = `boutique-card${isOwned ? " is-owned" : ""}${isEquipped ? " is-equipped" : ""}${extraCardClass}`;
          const priceHtml = item.free
            ? `<span class="boutique-card-price is-free">مجاني</span>`
            : `<span class="boutique-card-price">$${item.price.toLocaleString("en-US")}</span>`;

          let progressHtml = "";
          if (!isOwned && !item.free) {
            const pct = Math.min((currentBalance / item.price) * 100, 100);
            const isReady = pct >= 100;
            progressHtml = `
          <div class="purchase-progress-wrap" aria-label=window.t("dynamic.affordability") title="${Math.floor(pct)}%">
            <div class="purchase-progress-fill ${isReady ? "is-ready" : ""}" style="width: ${pct}%"></div>
          </div>
        `;
          } else {
            progressHtml = `<div class="purchase-progress-wrap is-transparent"></div>`;
          }

          let iconHtml = "";
        if (item.image) {
          iconHtml = `<img src="${item.image}" alt="${window.t(item.name)}" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
                      <span class="boutique-card-fallback" style="display:none">${ICONS[item.icon] || ICONS["star"]}</span>`;
        } else if (item.icon && (item.icon.startsWith("http") || item.icon.startsWith("data:"))) {
          iconHtml = `<img src="${item.icon}" alt="${window.t(item.name)}" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
                      <span class="boutique-card-fallback" style="display:none">${ICONS["star"]}</span>`;
        } else {
          iconHtml = `<span class="boutique-card-fallback" style="display:flex">${ICONS[item.icon] || ICONS["star"]}</span>`;
        }

        return `
        <div class="${cardClass}" data-item-id="${item.id}" data-cat="${catKey}" data-owned="${isOwned ? 1 : 0}" data-equipped="${isEquipped ? 1 : 0}" onclick='openInspectionModal(${JSON.stringify(item)}, "${catKey}", ${isOwned}, ${isEquipped})' style="cursor: pointer;">
          <span class="rarity-badge rarity-${item.rarity}">${RARITY_LABEL[item.rarity]()}</span>
          <span class="boutique-card-icon">
            ${iconHtml}
          </span>
          <span class="boutique-card-name">${window.t(item.name)}</span>
          ${priceHtml}
          ${progressHtml}
          <button class="boutique-own-btn ${btnClass}" type="button" style="${btnPointerEvents}" ${btnOnClick}>
            ${btnText}
          </button>
        </div>
      `;
        })
        .join("");

      return `
      <section class="boutique-section skeleton-fade-in" data-category="${catKey}">
        <div class="boutique-section-head">
          <h3>${window.t(cat.title)}</h3>
          ${typeof cat.sub !== "undefined" && cat.sub && String(cat.sub) !== "undefined" ? `<span class="boutique-section-sub">${cat.sub}</span>` : ""}
        </div>
        <div class="boutique-grid">${cards}</div>
      </section>
    `;
    })
    .filter((html) => html !== "")
    .join("");

  if (root.innerHTML.trim() === "") {
    root.innerHTML = `
      <div class="luxury-empty-state" style="margin-top: 40px; padding: 60px 20px;">
        <div class="empty-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" class="empty-icon"><path d="M4 8h16l-1.3 10.2A2 2 0 0116.7 20H7.3a2 2 0 01-2-1.8L4 8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M8 8V6a4 4 0 018 0v2" stroke="currentColor" stroke-width="1.2"/></svg>
        </div>
        <p>${window.t("boutique.noItems")}</p>
        <span style="max-width: 280px; margin-bottom: 0;">${window.t("boutique.noFilterMatch")}</span>
      </div>
    `;
  }

  root.querySelectorAll(".boutique-card").forEach((card) => {
    let pressTimer;
    let isLongPress = false;

    const itemId = card.dataset.itemId;
    const catKey = card.dataset.cat;
    const isOwned = card.dataset.owned === "1";
    const isEquipped = card.dataset.equipped === "1";
    const cat = BOUTIQUE[catKey];
    if (!cat) return;
    const item = cat.items.find((i) => i.id === itemId);
    if (!item) return;

    const startPress = (e) => {
      isLongPress = false;
      pressTimer = setTimeout(() => {
        isLongPress = true;

        const currentEquipped = ClubState.equipped;
        let wasAutoEquipped = false;
        if (
          isOwned &&
          !isEquipped &&
          !currentEquipped[catKey] &&
          EQUIP_CATEGORIES[catKey]
        ) {
          equipItem(item, catKey);
          wasAutoEquipped = true;
        }

        if (!isOwned) {
          if (window.hapticPreviewMgr) window.hapticPreviewMgr.open(item, e);
        } else {
          showQuickPreview(item, wasAutoEquipped);
          if (navigator.vibrate) navigator.vibrate(50);
          if (window.AudioEngine) window.AudioEngine.playRustle();
        }
      }, 400); // 400ms for long press
    };

    const endPress = (e) => {
      clearTimeout(pressTimer);
      if (isLongPress) {
        if (!isOwned && window.hapticPreviewMgr) {
          // Handled by manager's own events, but safe to call
        } else {
          hideQuickPreview();
        }
      }
    };

    card.addEventListener("touchstart", startPress, { passive: true });
    card.addEventListener("touchend", endPress);
    card.addEventListener("touchcancel", endPress);
    card.addEventListener("touchmove", () => {
      clearTimeout(pressTimer);
    });

    card.addEventListener("mousedown", startPress);
    card.addEventListener("mouseup", endPress);
    card.addEventListener("mouseleave", endPress);

    card.addEventListener("click", (e) => {
      if (isLongPress) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      openInspectionModal(item, catKey, isOwned, isEquipped);
    });
  });
}

/* === 4. VAULT & USER ASSET SYNC === */
function syncWidgetState() {
  const masterCard = document.getElementById("membershipCard");
  const preview = document.querySelector(".widget-card-preview");
  if (masterCard && preview) {
    preview.innerHTML = masterCard.innerHTML;
  }
}

window.handleInstallWidget = function handleInstallWidget(event) {
  if (event) event.stopPropagation();
  if (window.AudioEngine && window.AudioEngine.playChime) window.AudioEngine.playChime();
  if (window.HapticEngine && window.HapticEngine.boutiquePurchase) window.HapticEngine.boutiquePurchase();
  localStorage.setItem("club_widget_installed", "true");

  const btn = event?.currentTarget || document.querySelector(".widget-add-btn");
  if (btn) {
    btn.innerHTML = `✓ ${window.t("boutique.freeActivated") || "مفعل ومثبت"}`;
    btn.classList.add("is-installed");
  }

  showNavToast(window.t("misc.widgetInstalledToast") || "تم تثبيت ودجت الهوية السيادية بنجاح على الشاشة الرئيسية!");
};

function renderWidgetSection() {
  const masterCard = document.getElementById("membershipCard");
  const cardHTML = masterCard ? masterCard.innerHTML : "";
  const isInstalled = localStorage.getItem("club_widget_installed") === "true";
  const btnLabel = isInstalled
    ? `✓ ${window.t("boutique.freeActivated") || "مفعل ومثبت"}`
    : `+ ${window.t("boutique.id_widget_status") || "تثبيت الودجت"}`;

  return `
    <section class="boutique-section widget-section" data-category="widgets">
      <div class="boutique-section-head">
        <h3>${window.t(BOUTIQUE.widgets.title)}</h3>
        ${typeof BOUTIQUE.widgets.sub !== "undefined" && BOUTIQUE.widgets.sub && String(BOUTIQUE.widgets.sub) !== "undefined" ? `<span class="boutique-section-sub">${BOUTIQUE.widgets.sub}</span>` : ""}
      </div>
      <p class="widget-preview-label">${window.t("boutique.id_widget_title")}</p>

      <div class="id-widget-container">
        <div class="membership-card widget-card-preview" style="transform: scale(0.9); transform-origin: top center; margin-bottom: -10%;">
          ${cardHTML}
        </div>
      </div>

      <button class="widget-add-btn ${isInstalled ? "is-installed" : ""}" type="button" onclick="handleInstallWidget(event)">
        ${btnLabel}
      </button>
    </section>
  `;
}

document.querySelectorAll(".boutique-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".boutique-tab")
      .forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderBoutique(tab.dataset.cat, true);
  });
});

renderBoutique();

const balanceDisplay = document.getElementById("boutiqueBalanceDisplay");
if (balanceDisplay) {
  balanceDisplay.textContent = ClubState.balance.toLocaleString("en-US");
}

updateUI();

// ---------------------------------------------------------
// ---------------------------------------------------------
const copyToast = document.getElementById("copyToast");
let goldCopyPopupTimer = null;

function showGoldCopyPopup(title = "Link Copied to Clipboard", subtitle = "") {
  const popup = document.getElementById("goldCopyPopup");
  const titleEl = document.getElementById("goldCopyPopupTitle");
  const subEl = document.getElementById("goldCopyPopupSubtitle");

  if (titleEl) {
    titleEl.textContent = title || "Link Copied to Clipboard";
  }
  if (subEl) {
    if (subtitle) {
      subEl.textContent = subtitle;
      subEl.style.display = "block";
    } else {
      const url = (typeof ClubState !== "undefined" && ClubState?.member?.verifyUrl)
        ? ClubState.member.verifyUrl
        : "https://1percent.club/verify/3426";
      subEl.textContent = url.replace(/^https?:\/\//, "");
      subEl.style.display = "block";
    }
  }

  // Also update original copyToast for accessibility & fallback
  if (copyToast) {
    copyToast.textContent = title;
    copyToast.classList.add("is-visible");
    setTimeout(() => copyToast.classList.remove("is-visible"), 2500);
  }

  if (popup) {
    // Re-trigger shimmer animation
    const shimmer = popup.querySelector(".gold-copy-popup-shimmer");
    if (shimmer) {
      shimmer.style.animation = "none";
      void shimmer.offsetWidth;
      shimmer.style.animation = "";
    }

    popup.classList.add("is-visible");
    popup.setAttribute("aria-hidden", "false");

    clearTimeout(goldCopyPopupTimer);
    goldCopyPopupTimer = setTimeout(() => {
      popup.classList.remove("is-visible");
      popup.setAttribute("aria-hidden", "true");
    }, 2800);
  }
}

window.showGoldCopyPopup = showGoldCopyPopup;

function showCopyToast(msg) {
  if (!msg || msg === window.t("misc.linkCopied") || String(msg).includes("نسخ") || String(msg).includes("Copied") || String(msg).includes("Link")) {
    const url = (typeof ClubState !== "undefined" && ClubState?.member?.verifyUrl) ? ClubState.member.verifyUrl : "";
    showGoldCopyPopup("Link Copied to Clipboard", url);
  } else {
    showGoldCopyPopup(msg, "");
  }
}

const copyBtn = document.getElementById("copyBtn");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    if (window.AudioEngine && window.AudioEngine.playChime) {
      window.AudioEngine.playChime();
    } else if (window.AudioEngine && window.AudioEngine.playSend) {
      window.AudioEngine.playSend();
    }

    copyBtn.classList.add("copied");
    setTimeout(() => copyBtn.classList.remove("copied"), 1500);

    const verifyUrl = (typeof ClubState !== "undefined" && ClubState?.member?.verifyUrl)
      ? ClubState.member.verifyUrl
      : "https://1percent.club/verify/3426";

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(verifyUrl);
      } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = verifyUrl;
        tempInput.style.position = "fixed";
        tempInput.style.opacity = "0";
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      showGoldCopyPopup("Link Copied to Clipboard", verifyUrl);
    } catch {
      showGoldCopyPopup("Link Copied to Clipboard", verifyUrl);
    }
  });
}

const goldPopup = document.getElementById("goldCopyPopup");
if (goldPopup) {
  goldPopup.addEventListener("click", () => {
    goldPopup.classList.remove("is-visible");
    goldPopup.setAttribute("aria-hidden", "true");
    clearTimeout(goldCopyPopupTimer);
  });
}

// ---------------------------------------------------------
// CARD METRIC TOOLTIPS (WEALTH INDEX & PRIVILEGES)
// ---------------------------------------------------------
function initMetricTooltips() {
  const metricRings = document.querySelectorAll(".membership-card .metric-ring");
  if (!metricRings.length) return;

  let autoDismissTimer = null;

  function clearAutoDismissTimer() {
    if (autoDismissTimer) {
      clearTimeout(autoDismissTimer);
      autoDismissTimer = null;
    }
  }

  function closeAllTooltips(suppressHover = false) {
    clearAutoDismissTimer();
    document.querySelectorAll(".membership-card.has-open-tooltip").forEach((c) => {
      c.classList.remove("has-open-tooltip");
    });
    metricRings.forEach((ring) => {
      ring.classList.remove("is-tooltip-open");
      if (suppressHover) {
        ring.classList.add("tooltip-dismissed");
      }
      ring.setAttribute("aria-expanded", "false");
      const tt = ring.querySelector(".metric-tooltip");
      if (tt) tt.setAttribute("aria-hidden", "true");
    });
  }

  window.closeMetricTooltips = closeAllTooltips;

  metricRings.forEach((ring) => {
    const tooltip = ring.querySelector(".metric-tooltip");
    if (!tooltip) return;

    let hoverTimeout = null;

    function openTooltip() {
      clearAutoDismissTimer();
      metricRings.forEach((r) => {
        r.classList.remove("is-tooltip-open");
        r.setAttribute("aria-expanded", "false");
        const tt = r.querySelector(".metric-tooltip");
        if (tt) tt.setAttribute("aria-hidden", "true");
      });

      ring.classList.remove("tooltip-dismissed");
      ring.classList.add("is-tooltip-open");
      const card = ring.closest(".membership-card");
      if (card) card.classList.add("has-open-tooltip");
      ring.setAttribute("aria-expanded", "true");
      tooltip.setAttribute("aria-hidden", "false");

      if (window.AudioEngine && window.AudioEngine.playChime) {
        window.AudioEngine.playChime();
      }
      if (window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap(18);
      }

      // Automatically disappear after 15 seconds (15000 ms)
      autoDismissTimer = setTimeout(() => {
        closeAllTooltips(true);
      }, 15000);
    }

    function toggleRingTooltip(e) {
      if (e) {
        if (e.target.closest(".metric-tooltip")) return;
        e.stopPropagation();
      }

      const isOpen = ring.classList.contains("is-tooltip-open");
      if (isOpen) {
        closeAllTooltips();
      } else {
        openTooltip();
      }
    }

    // Hover interactions for desktop with generous bridge timeout
    ring.addEventListener("mouseenter", () => {
      ring.classList.remove("tooltip-dismissed");
      if (window.matchMedia("(hover: hover)").matches) {
        clearTimeout(hoverTimeout);
        openTooltip();
      }
    });

    function scheduleTooltipClose() {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        ring.classList.remove("is-tooltip-open");
        ring.setAttribute("aria-expanded", "false");
        tooltip.setAttribute("aria-hidden", "true");
        const anyOpen = Array.from(metricRings).some((r) => r.classList.contains("is-tooltip-open"));
        if (!anyOpen) {
          document.querySelectorAll(".membership-card.has-open-tooltip").forEach((c) => c.classList.remove("has-open-tooltip"));
        }
        clearAutoDismissTimer();
      }, 150);
    }

    ring.addEventListener("mouseleave", () => {
      ring.classList.remove("tooltip-dismissed");
      if (window.matchMedia("(hover: hover)").matches) {
        scheduleTooltipClose();
      }
    });

    tooltip.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
    });

    tooltip.addEventListener("mouseleave", () => {
      if (window.matchMedia("(hover: hover)").matches) {
        scheduleTooltipClose();
      }
    });

    // Support click on desktop & touch tap on mobile
    ring.addEventListener("click", toggleRingTooltip);

    ring.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleRingTooltip(e);
      } else if (e.key === "Escape") {
        closeAllTooltips();
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".membership-card .metric-ring")) {
      closeAllTooltips();
    }
  });

  document.addEventListener("touchend", (e) => {
    if (!e.target.closest(".membership-card .metric-ring")) {
      closeAllTooltips();
    }
  }, { passive: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMetricTooltips);
} else {
  initMetricTooltips();
}

// ---------------------------------------------------------
// ---------------------------------------------------------
/* === 2. NAVIGATION & TAB SWITCHING === */
const navToast = document.getElementById("navToast");
const sectionName = document.getElementById("sectionName");
let navToastTimer = null;

// ==========================================
// ==========================================

function showNavToast(msg) {
  navToast.textContent = msg;
  navToast.classList.add("is-visible");
  clearTimeout(navToastTimer);
  navToastTimer = setTimeout(
    () => navToast.classList.remove("is-visible"),
    1800,
  );
}

const PAGE_TITLES = {
  membership: window.t("nav.membership"),
  club: window.t("nav.club"),
  profile: window.t("nav.profile"),
  boutique: window.t("nav.boutique"),
};
const IMPLEMENTED_TABS = ["membership", "profile", "club", "boutique"];

// ==========================================
// ==========================================
const Router = {
  navigate(tab) {
    if (typeof window.closeMetricTooltips === "function") window.closeMetricTooltips();
    if (window.AudioEngine) AudioEngine.playRustle();
    this.switchView(tab);
    this.updateHeader(tab);
    this.triggerEnter(tab);
  },

  switchView(tab) {
    if (window.HeaderScrollController) {
      window.HeaderScrollController.onTabChangeStart();
    }

    document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("is-active");
      p.setAttribute("aria-hidden", "true");
      p.setAttribute("hidden", "");
    });

    const activePage = document.getElementById(`${tab}-tab`);
    if (activePage) {
      activePage.removeAttribute("hidden");
      activePage.setAttribute("aria-hidden", "false");
      activePage.classList.add("is-active");
      activePage.scrollTop = 0;
    }

    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("is-active"));
    const activeNav = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    if (activeNav) activeNav.classList.add("is-active");

    const main = document.querySelector(".app-main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);

    const header = document.getElementById("appHeader");
    if (header) {
      header.classList.remove("header-hidden");
    }
    if (window.HeaderScrollController) {
      window.HeaderScrollController.onTabChangeComplete();
    } else {
      if (typeof window.resetHeaderScrollTracking === "function") {
        window.resetHeaderScrollTracking();
      }
      if (typeof window.updateHeaderHeightVar === "function") {
        window.updateHeaderHeightVar();
      }
    }

    if (tab === "membership" && typeof window.resumeGoldDustCanvas === "function") {
      window.resumeGoldDustCanvas();
    }
  },

  updateHeader(tab) {
    const sectionName = document.getElementById("sectionName");
    if (sectionName) sectionName.textContent = PAGE_TITLES[tab] || tab;

    const backBtn = document.getElementById("backBtn");
    if (backBtn) backBtn.hidden = true;

    const header = document.getElementById("appHeader");
    if (header) {
      header.classList.remove("header-hidden");
      header.classList.toggle("header-compact", tab === "club");
      if (typeof window.updateHeaderHeightVar === "function") window.updateHeaderHeightVar();
    }
  },

  triggerEnter(tab) {
    this.onEnter(tab);
  },

  navigateContext(pageId, title, returnTab) {
    if (window.AudioEngine) AudioEngine.playRustle();
    if (window.HeaderScrollController) {
      window.HeaderScrollController.onTabChangeStart();
    }
    contextReturnTab = returnTab;
    document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("is-active");
      p.setAttribute("aria-hidden", "true");
      p.setAttribute("hidden", "");
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
      activePage.removeAttribute("hidden");
      activePage.setAttribute("aria-hidden", "false");
      activePage.classList.add("is-active");
      activePage.scrollTop = 0;
    }
    document.getElementById("sectionName").textContent = title;
    const header = document.getElementById("appHeader");
    if (header) {
      header.classList.remove("header-hidden");
      header.classList.remove("header-compact");
      if (typeof window.updateHeaderHeightVar === "function") window.updateHeaderHeightVar();
    }
    document.getElementById("backBtn").hidden = false;
    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("is-active"));

    const main = document.querySelector(".app-main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
    if (window.HeaderScrollController) {
      window.HeaderScrollController.onTabChangeComplete();
    }
  },

  onEnter(tab) {
    if (tab === "club") {
      if (typeof updateCreditsUI === "function") updateCreditsUI();
      requestAnimationFrame(() => {
        const msgs = document.getElementById("clubMessages");
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
      });
      if (typeof startClubWelcomeAutoDismiss === "function") {
        startClubWelcomeAutoDismiss(5000);
      }
    } else if (tab === "profile") {
      if (typeof renderProfileStatsBar === "function") renderProfileStatsBar();
      if (typeof renderProfileCircles === "function") renderProfileCircles();
      if (typeof renderProfileMembershipDeed === "function") renderProfileMembershipDeed();
      if (typeof renderProfileSovereignOath === "function") renderProfileSovereignOath();
      if (typeof renderProfileCollection === "function") renderProfileCollection(true);
      if (typeof renderProfileAchievements === "function") renderProfileAchievements();
      if (typeof attachHorologicalScrewHandlers === "function") attachHorologicalScrewHandlers();
      if (typeof cancelClubWelcomeAutoDismiss === "function") {
        cancelClubWelcomeAutoDismiss();
      }
    } else if (tab === "boutique") {
      const activeBoutiqueTab = document.querySelector(".boutique-tab.is-active");
      const activeCat = activeBoutiqueTab ? activeBoutiqueTab.dataset.cat : "all";
      renderBoutique(activeCat, true);
      if (typeof cancelClubWelcomeAutoDismiss === "function") {
        cancelClubWelcomeAutoDismiss();
      }
    } else {
      if (typeof cancelClubWelcomeAutoDismiss === "function") {
        cancelClubWelcomeAutoDismiss();
      }
    }
  },
};

window.switchTab = function switchTab(tabId) {
  Router.navigate(tabId);
};

function goToPage(tab) {
  Router.navigate(tab);
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    const tab = item.dataset.tab;
    if (IMPLEMENTED_TABS.includes(tab)) {
      goToPage(tab);
      return;
    }
    const prev =
      document.querySelector(".nav-item.is-active")?.dataset.tab || "card";
    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("is-active"));
    item.classList.add("is-active");
    showNavToast(`${item.querySelector("span").textContent} — قريبًا`);
    clearTimeout(navToastTimer);
    navToastTimer = setTimeout(() => {
      navToast.classList.remove("is-visible");
      item.classList.remove("is-active");
      document
        .querySelector(`.nav-item[data-tab="${prev}"]`)
        ?.classList.add("is-active");
    }, 1800);
  });
});

document
  .getElementById("goToShopBtn")
  ?.addEventListener("click", () => goToPage("shop"));

// ---------------------------------------------------------
// LUXURY SWIPE NAVIGATION BETWEEN MAIN TABS
// ---------------------------------------------------------
(function initTabSwipeNavigation() {
  const ORDERED_TABS = ["membership", "club", "profile", "boutique"];
  const appMain = document.querySelector(".app-main");
  if (!appMain) return;

  let startX = 0;
  let startY = 0;
  let isSwiping = false;
  let isHorizontalGesture = null;

  appMain.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      // Do not initiate tab swipe if user is interacting with an open modal or horizontal scroll container
      if (document.querySelector(".luxury-modal-overlay.is-open")) return;
      if (e.target.closest(".pcs-scroll-container, .horizontal-scroll, input, textarea, select, button, .chat-messages-container")) {
        return;
      }

      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
      isHorizontalGesture = null;
    },
    { passive: true }
  );

  appMain.addEventListener(
    "touchmove",
    (e) => {
      if (!isSwiping || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;

      if (isHorizontalGesture === null) {
        if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
          isHorizontalGesture = Math.abs(diffX) > Math.abs(diffY) * 1.5;
        }
      }

      if (isHorizontalGesture === false) {
        isSwiping = false;
      }
    },
    { passive: true }
  );

  appMain.addEventListener(
    "touchend",
    (e) => {
      if (!isSwiping || isHorizontalGesture !== true) {
        isSwiping = false;
        isHorizontalGesture = null;
        return;
      }

      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;
      const SWIPE_THRESHOLD = 50;

      if (Math.abs(diffX) >= SWIPE_THRESHOLD) {
        const isRtl = document.documentElement.dir === "rtl" || document.documentElement.lang === "ar";
        const currentActiveNav = document.querySelector(".nav-item.is-active");
        const currentTab = currentActiveNav?.dataset?.tab || "membership";
        const currentIndex = ORDERED_TABS.indexOf(currentTab);

        if (currentIndex !== -1) {
          let nextIndex = currentIndex;
          if (diffX < -SWIPE_THRESHOLD) {
            // Dragged left
            nextIndex = isRtl ? currentIndex - 1 : currentIndex + 1;
          } else if (diffX > SWIPE_THRESHOLD) {
            // Dragged right
            nextIndex = isRtl ? currentIndex + 1 : currentIndex - 1;
          }

          if (nextIndex >= 0 && nextIndex < ORDERED_TABS.length && nextIndex !== currentIndex) {
            if (window.HapticEngine && window.HapticEngine.tap) {
              window.HapticEngine.tap(12);
            }
            goToPage(ORDERED_TABS[nextIndex]);
          }
        }
      }

      isSwiping = false;
      isHorizontalGesture = null;
    },
    { passive: true }
  );
})();

// ---------------------------------------------------------
// ---------------------------------------------------------
let contextReturnTab = "club";

function openContextPage(pageId, title, returnTab) {
  if (window.AudioEngine) AudioEngine.playRustle();
  contextReturnTab = returnTab;
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("is-active");
    p.hidden = true;
  });
  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add("is-active");
    activePage.hidden = false;
    activePage.scrollTop = 0;
  }
  document.getElementById("sectionName").textContent = title;
  const header = document.getElementById("appHeader");
  if (header) {
    header.classList.remove("header-hidden");
    header.classList.remove("header-compact");
    if (typeof window.updateHeaderHeightVar === "function") window.updateHeaderHeightVar();
  }
  if (typeof window.resetHeaderScrollTracking === "function") {
    window.resetHeaderScrollTracking();
  }
  document.getElementById("backBtn").hidden = false;
  document.querySelector(".app-main").scrollTop = 0;
  window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resize"));
}

function openMemberProfile(member) {
  if (!member) return;
  if (window.AudioEngine && window.AudioEngine.playRustle) window.AudioEngine.playRustle();
  if (window.HapticEngine && window.HapticEngine.tap) window.HapticEngine.tap(15);

  const isAr = AppState.language === "ar" || document.documentElement.lang === "ar";
  const memberName = isAr ? (member.nameAr || member.name) : (member.nameEn || member.name || "MEMBER");

  // Name
  const nameEl = document.getElementById("memberProfileName");
  if (nameEl) nameEl.textContent = memberName || "MEMBER";

  // Tier Text & Formatting
  const tierEl = document.getElementById("memberProfileTier");
  const tierPill = document.getElementById("memberTierPill");
  const rawTier = member.tier || "Sovereign";
  let tierText = rawTier;
  if (isAr) {
    if (rawTier === "Sovereign") tierText = "فئة السيادة المطلقة";
    else if (rawTier === "Elite") tierText = "فئة النخبة المعتمدة";
    else tierText = "عضو معتمد بالمجلس";
  } else {
    tierText = `${rawTier.toUpperCase()} MEMBER`;
  }
  if (tierEl) tierEl.textContent = tierText;
  if (tierPill) {
    tierPill.className = `sd-tier-capsule tier-${rawTier.toLowerCase()}`;
  }

  // Quote / Sovereign Creed
  const quoteEl = document.getElementById("memberProfileQuote");
  if (quoteEl) {
    quoteEl.textContent = member.quote || member.text || (isAr ? "السيادة ليست مجرد مكانة، بل هي معيار الوجود والريادة." : "A higher standard in a different world.");
  }

  // Wealth & Privileges
  const wealthEl = document.getElementById("memberProfileWealth");
  if (wealthEl) wealthEl.textContent = member.wealth || "99.4%";

  const privEl = document.getElementById("memberProfilePriv");
  if (privEl) privEl.textContent = member.priv || "98.2%";

  // Sovereign ID
  const idEl = document.getElementById("memberDossierId");
  if (idEl) idEl.textContent = member.id ? `ID: ${member.id}` : "ID: SV-0001";

  // City / Sovereign Jurisdiction
  const locEl = document.getElementById("memberDossierLocationText");
  if (locEl) {
    const city = isAr ? (member.city || member.cityAr || "المقر الدبلوماسي • جنيف") : (member.cityEn || member.city || "Geneva • Switzerland");
    locEl.textContent = city;
  }

  // Council Rank
  const rankChip = document.getElementById("memberDossierRankText");
  const rankStat = document.getElementById("memberDossierRankStat");
  if (rankChip) rankChip.textContent = member.rank ? `#${member.rank}` : "#1";
  if (rankStat) rankStat.textContent = member.rank ? `#${member.rank}` : "#1";

  // Status Stat & Jewel
  const statusStat = document.getElementById("memberDossierStatusStat");
  if (statusStat) {
    statusStat.textContent = isAr ? (member.isOnline !== false ? "نشط • معتمد" : "سجل موثق") : (member.isOnline !== false ? "Active" : "Verified");
  }
  const statusJewel = document.getElementById("memberDossierStatusJewel");
  if (statusJewel) {
    statusJewel.style.display = member.isOnline !== false ? "block" : "none";
  }

  // Dossier Charter & Access
  const charterEl = document.getElementById("memberDossierCharter");
  if (charterEl) {
    charterEl.textContent = isAr 
      ? (rawTier === "Sovereign" ? "ميثاق سيادي أول • غير قابل للإلغاء" : "ميثاق النخبة المعتمد • دائم")
      : (rawTier === "Sovereign" ? "Tier I Sovereign Charter • Irrevocable" : "Elite Council Charter • Permanent");
  }
  const accessEl = document.getElementById("memberDossierAccess");
  if (accessEl) {
    accessEl.textContent = isAr ? "وصول كامل للصالونات الخاصة والمفاوضات" : "Unrestricted Access to Private Lounges";
  }

  // Portrait Image
  const avatarUrl = member.avatar || "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=240&auto=format&fit=crop";
  const imgEl = document.getElementById("memberDossierImg");
  const fallbackEl = document.getElementById("memberDossierFallback");
  if (imgEl) {
    imgEl.src = avatarUrl;
    imgEl.style.display = "block";
    if (fallbackEl) fallbackEl.style.display = "none";
  }
  const oldPhotoEl = document.getElementById("memberPortraitPhoto");
  if (oldPhotoEl) {
    oldPhotoEl.style.backgroundImage = `url('${avatarUrl}')`;
  }

  openContextPage("page-member", memberName || (isAr ? "ملف العضو السيادي" : "Member Dossier"), "club");
}
window.openMemberProfile = openMemberProfile;

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("backBtn").hidden = true;
  goToPage(contextReturnTab);
});

document.querySelectorAll("#page-member .card-actions .btn, #page-member .sd-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (window.AudioEngine && window.AudioEngine.playChime) window.AudioEngine.playChime();
    if (window.HapticEngine && window.HapticEngine.tap) window.HapticEngine.tap(20);
    showNavToast(window.t("profile.comingSoon") || "قريباً");
  });
});

document.getElementById("editAccountForm").addEventListener("submit", (e) => {
  e.preventDefault();

  ClubState.member.name = document.getElementById("editName").value;
  ClubState.member.username = document.getElementById("editUsername").value;
  ClubState.member.bio = document.getElementById("editBio").value;
  ClubState.member.interests = document.getElementById("editInterests").value;
  ClubState.member.location = document.getElementById("editLocation").value;
  ClubState.save();

  ClubState.emit("change");

  document.getElementById("backBtn").hidden = true;
  Router.navigate("profile");
  showPremiumToast(
    window.t("profile.profileUpdated"),
    window.t("misc.changesSaved"),
  );
  if (window.unlockAchievement) {
    window.unlockAchievement(
      "profile_updated",
      "THE DOSSIER",
      "Your personal identity dossier has been updated.",
    );
  }
});

// ---------------------------------------------------------
// ---------------------------------------------------------
let lastRecordedCredits = null;
let gaugeShimmerTimeout = null;
let gaugeTallyTimeout = null;

function updateCreditsUI(forceAnimate = false) {
  const creditsText = document.getElementById("clubCreditsText");
  const buyBtn = document.getElementById("clubCreditsBuyBtn");
  const pipsContainer = document.getElementById("gaugePipsStrip");

  const currentCredits =
    typeof ClubState !== "undefined" && ClubState && ClubState.chatCredits !== undefined
      ? ClubState.chatCredits
      : 10;
  const maxCredits = 10;

  const shouldAnimate =
    Boolean(forceAnimate) ||
    (lastRecordedCredits !== null && lastRecordedCredits !== currentCredits);
  lastRecordedCredits = currentCredits;

  if (creditsText) {
    const isAr = typeof window !== "undefined" && window.currentLang === "ar";
    if (currentCredits > 10) {
      creditsText.innerHTML = `<bdi>${currentCredits}</bdi> <span style="font-size:9px;opacity:0.85;font-weight:600;">${isAr ? "رصيد" : "credits"}</span>`;
    } else {
      creditsText.innerHTML = `<bdi>${currentCredits}</bdi><span style="margin:0 2px;opacity:0.6;">/</span><bdi>${maxCredits}</bdi>`;
    }
    if (currentCredits <= 0) {
      creditsText.style.color = "#d9534f";
    } else {
      creditsText.style.color = "";
    }

    if (shouldAnimate) {
      creditsText.classList.remove("is-ticked");
      void creditsText.offsetWidth; // Force reflow to retrigger animation
      creditsText.classList.add("is-ticked");
      if (gaugeTallyTimeout) clearTimeout(gaugeTallyTimeout);
      gaugeTallyTimeout = setTimeout(() => {
        creditsText.classList.remove("is-ticked");
      }, 650);
    }
  }

  if (pipsContainer) {
    const pips = pipsContainer.querySelectorAll(".gauge-pip");
    pips.forEach((pip, index) => {
      if (index < currentCredits) {
        pip.className = "gauge-pip is-filled";
      } else {
        pip.className = "gauge-pip is-spent";
      }
    });

    if (shouldAnimate) {
      pipsContainer.classList.remove("is-shimmering");
      void pipsContainer.offsetWidth; // Force reflow to retrigger shimmer
      pipsContainer.classList.add("is-shimmering");
      if (gaugeShimmerTimeout) clearTimeout(gaugeShimmerTimeout);
      gaugeShimmerTimeout = setTimeout(() => {
        pipsContainer.classList.remove("is-shimmering");
      }, 850);
    }
  }

  if (buyBtn) {
    if (currentCredits <= 0) {
      buyBtn.classList.add("is-depleted-pulse");
    } else {
      buyBtn.classList.remove("is-depleted-pulse");
    }
  }
}

if (typeof window !== "undefined") {
  window.updateCreditsUI = updateCreditsUI;
  window.triggerGaugeHorologicalShimmer = () => updateCreditsUI(true);
}

updateCreditsUI();

// ---------------------------------------------------------
// ---------------------------------------------------------
let premiumToastTimer = null;
function showPremiumToast(title, msg) {
  const toast = document.getElementById("premiumToast");
  document.getElementById("premiumToastTitle").textContent = title;
  document.getElementById("premiumToastMsg").textContent = msg;
  toast.classList.add("is-visible");
  if (window.AudioEngine) AudioEngine.playChime();
  clearTimeout(premiumToastTimer);
  premiumToastTimer = setTimeout(
    () => toast.classList.remove("is-visible"),
    3000,
  );
}

// ---------------------------------------------------------
// ---------------------------------------------------------
let achievementToastTimer = null;
window.showAchievementToast = function (title, msg) {
  const toast = document.getElementById("achievementToast");
  if (!toast) return;
  document.getElementById("achToastTitle").textContent = title;
  document.getElementById("achToastMsg").textContent = msg;
  toast.classList.add("is-visible");
  if (window.AudioEngine) AudioEngine.playChime();
  clearTimeout(achievementToastTimer);
  achievementToastTimer = setTimeout(
    () => toast.classList.remove("is-visible"),
    5000,
  );
};

function spawnGoldenConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "100000"; // high z-index to be on top of everything
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const leaves = [];
  const particleCount = 80;

  const colors = ["#d4af37", "#f3e5ab", "#c5a017", "#e6c762"];

  for (let i = 0; i < particleCount; i++) {
    leaves.push({
      x: Math.random() * width,
      y: -Math.random() * height - 50,
      w: Math.random() * 5 + 4,
      h: Math.random() * 8 + 8,
      speedY: Math.random() * 2.5 + 1.5,
      speedX: Math.random() * 2 - 1,
      angle: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.15,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.04 + 0.01,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.5,
      flip: 0,
      flipSpeed: Math.random() * 0.1 + 0.05
    });
  }

  let animationFrame;
  let startTime = Date.now();
  const duration = 6000;

  function render() {
    ctx.clearRect(0, 0, width, height);
    
    let allDead = true;

    leaves.forEach(leaf => {
      leaf.y += leaf.speedY;
      leaf.x += leaf.speedX + Math.sin(leaf.sway) * 1.5;
      leaf.sway += leaf.swaySpeed;
      leaf.angle += leaf.spinSpeed;
      leaf.flip += leaf.flipSpeed;

      if (leaf.y < height + 50) {
        allDead = false;
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);
        
        // 3D flip effect by scaling Y
        ctx.scale(1, Math.sin(leaf.flip));
        
        ctx.fillStyle = leaf.color;
        ctx.globalAlpha = leaf.opacity;
        
        // slight shadow for depth
        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;
        
        ctx.beginPath();
        ctx.moveTo(0, -leaf.h);
        ctx.quadraticCurveTo(leaf.w, 0, 0, leaf.h);
        ctx.quadraticCurveTo(-leaf.w, 0, 0, -leaf.h);
        ctx.fill();
        
        // inner shine
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -leaf.h + 2);
        ctx.lineTo(0, leaf.h - 2);
        ctx.stroke();

        ctx.restore();
      }
    });

    if (Date.now() - startTime < duration && !allDead) {
      animationFrame = requestAnimationFrame(render);
    } else {
      canvas.remove();
    }
  }

  render();
}

window.unlockAchievement = function (id, title, desc) {
  let unlocked = [];
  try {
    unlocked = JSON.parse(localStorage.getItem("club_achievements")) || [];
  } catch (e) {}

  if (!unlocked.includes(id)) {
    unlocked.push(id);
    localStorage.setItem("club_achievements", JSON.stringify(unlocked));

    // Sovereign harmonic haptic feedback for unlocking milestone
    if (window.HapticEngine) {
      window.HapticEngine.milestoneUnlock();
    } else if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([30, 40, 45, 60, 25]);
    }

    setTimeout(() => {
      if (window.AudioEngine) window.AudioEngine.playChime();
      window.showAchievementToast(title, desc);
      spawnGoldenConfetti();
      if (typeof renderProfileAchievements === "function") {
        renderProfileAchievements();
      }
    }, 500);
  }
};

// ==========================================
// ==========================================

const ELITE_MEMBERS = [
  { name: "Lord Julian", tier: "FOUNDER", id: "001", color: "#e6c27a", seat: "ZURICH", motto: "Honor, lineage, and sovereign discretion." },
  { name: "Elena Rostova", tier: "SOVEREIGN", id: "084", color: "#d4af37", seat: "MONACO", motto: "Elegance is the ultimate sovereign currency." },
  { name: "Marcus Sterling", tier: "TITAN", id: "112", color: "#f3e5ab", seat: "LONDON", motto: "Capital in motion, unencumbered by borders." },
  { name: "W. Alexander", tier: "SOVEREIGN EXARCH", id: "1001", color: "#e6c27a", seat: "GENEVA", motto: "Pioneering the architecture of digital sovereignty." },
  { name: "Sheikh Tariq Al-Mansoor", tier: "SOVEREIGN", id: "777", color: "#f5d77f", seat: "DUBAI", motto: "Legacy built upon vision, precision, and steel." },
  { name: "Baroness Charlotte", tier: "SOVEREIGN", id: "205", color: "#e2b872", seat: "PARIS", motto: "True luxury whispers through heritage and rarity." },
  { name: "Concierge Desk", tier: "SYSTEM", id: "000", color: "#a39b8b", seat: "GENEVA", motto: "At the sovereign service of the Circle." },
];

function processEliteResponse(text) {
  const lower = text.toLowerCase();
  const isArabic = /[\u0600-\u06FF]/.test(text);
  const userName = AppState.user.name
    ? AppState.user.name.split(" ")[0]
    : "Member";

  const lordJulian = ELITE_MEMBERS.find((m) => m.id === "001");
  const elena = ELITE_MEMBERS.find((m) => m.id === "084");
  const marcus = ELITE_MEMBERS.find((m) => m.id === "112");
  const alexander = ELITE_MEMBERS.find((m) => m.id === "1001");
  const tariq = ELITE_MEMBERS.find((m) => m.id === "777");
  const charlotte = ELITE_MEMBERS.find((m) => m.id === "205");
  const concierge = ELITE_MEMBERS.find((m) => m.id === "000");

  const others = [lordJulian, elena, marcus, alexander, tariq, charlotte];

  if (
    lower.includes("help") ||
    lower.includes("support") ||
    lower.includes("rule") ||
    lower.includes("app") ||
    lower.includes("concierge") ||
    lower.includes("مساعدة") ||
    lower.includes("دعم") ||
    lower.includes("قوانين")
  ) {
    const responses = [
      window.t("dynamic.chatHelp1").replace("{0}", userName),
      window.t("dynamic.chatHelp2"),
    ];
    return {
      member: concierge,
      text: responses[Math.floor(Math.random() * responses.length)],
    };
  }

  if (
    lower.includes("is anyone here") ||
    lower.includes("anyone online") ||
    lower.includes("hello") ||
    lower.includes("hi") ||
    lower.includes("حد هنا") ||
    lower.includes("مين موجود") ||
    lower.includes("مساء الخير") ||
    lower.includes("سلام") ||
    lower.includes("مرحبا") ||
    lower.includes("أهلا")
  ) {
    const responses = [
      window.t("dynamic.chatGreet1").replace("{0}", userName),
      window.t("dynamic.chatGreet2"),
      window.t("dynamic.chatGreet3").replace("{0}", userName),
    ];
    return {
      member: others[Math.floor(Math.random() * others.length)],
      text: responses[Math.floor(Math.random() * responses.length)],
    };
  }

  if (
    lower.includes("invest") ||
    lower.includes("market") ||
    lower.includes("stock") ||
    lower.includes("crypto") ||
    lower.includes("real estate") ||
    lower.includes("deal") ||
    lower.includes("استثمار") ||
    lower.includes("سوق") ||
    lower.includes("أعمال") ||
    lower.includes("صفق") ||
    lower.includes("عقار")
  ) {
    const responses = [
      window.t("dynamic.chatInvest1"),
      window.t("dynamic.chatInvest2"),
      window.t("dynamic.chatInvest3").replace("{0}", userName),
    ];
    const investPool = [marcus, alexander, tariq, lordJulian];
    return {
      member: investPool[Math.floor(Math.random() * investPool.length)],
      text: responses[Math.floor(Math.random() * responses.length)],
    };
  }

  if (
    lower.includes("boutique") ||
    lower.includes("watch") ||
    lower.includes("car") ||
    lower.includes("gold") ||
    lower.includes("art") ||
    lower.includes("rare") ||
    lower.includes("مقتنيات") ||
    lower.includes("ساعة") ||
    lower.includes("قطعة") ||
    lower.includes(window.t("misc.rarity1")) ||
    lower.includes("فخامة") ||
    lower.includes("بوتيك")
  ) {
    const responses = [
      window.t("dynamic.chatBoutique1"),
      window.t("dynamic.chatBoutique2").replace("{0}", userName),
      window.t("dynamic.chatBoutique3"),
    ];
    const boutiquePool = [lordJulian, elena, charlotte, tariq];
    return {
      member: boutiquePool[Math.floor(Math.random() * boutiquePool.length)],
      text: responses[Math.floor(Math.random() * responses.length)],
    };
  }

  const responses = [
    window.t("dynamic.chatDefault1").replace("{0}", userName),
    window.t("dynamic.chatDefault2"),
    window.t("dynamic.chatDefault3"),
  ];
  return {
    member: others[Math.floor(Math.random() * others.length)],
    text: responses[Math.floor(Math.random() * responses.length)],
  };
}
function switchChannel(channelId) {
  AppState.activeChannelId = channelId;
  const channelData = AppState.channels[channelId] || {
    name: window.t("club.lounge"),
    messages: [],
  };

  document.querySelectorAll(".club-room-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.channel === channelId);
  });

  const pinnedTitle = document.getElementById("clubPinnedTitle");
  const pinnedSub = document.getElementById("clubPinnedSub");
  const pinnedSvg = document.getElementById("clubPinnedSvg");
  const chatViewport = document.getElementById("clubChatViewport");
  const messagesContainer = document.getElementById("clubMessages");
  const composerWrap = document.getElementById("clubComposerWrap");
  const leaderboardContainer = document.getElementById(
    "clubLeaderboardContainer",
  );

  const chamberSvgs = {
    "global-lounge": '<path d="M4 19h16M7 19V11m5 8V7m5 12V11M5 7l3.5 2L12 4l3.5 5L19 7v2H5V7z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>',
    wealth: '<path d="M12 3v18M6 8l-3 6h6L6 8zm12 0l-3 6h6l-3-6zM3 8h18" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="3" r="1.5" fill="currentColor"/>',
    business: '<rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.3"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
    lifestyle: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.3"/><polygon points="12 6 14.5 11 12 10 9.5 11" fill="currentColor"/><polygon points="12 18 14.5 13 12 14 9.5 13" stroke="currentColor" stroke-width="0.8"/>',
    ideas: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.3"/>',
    tech: '<rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.3"/><path d="M9 9h6v6H9zM9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3M19 9h3m-3 6h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    leaderboard: '<path d="M7 11.5a5.5 5.5 0 0110 0c0 4-3 6.5-5 8-2-1.5-5-4-5-8z" stroke="currentColor" stroke-width="1.3"/><path d="M12 6l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L12 6z" fill="currentColor"/>',
  };
  if (pinnedSvg && chamberSvgs[channelId]) {
    pinnedSvg.innerHTML = chamberSvgs[channelId];
  }

  if (channelId === "leaderboard") {
    if (pinnedTitle) {
      pinnedTitle.textContent = "قائمة المتصدرين";
      pinnedTitle.setAttribute("data-i18n", "leaderboardTitle");
    }
    if (pinnedSub) {
      pinnedSub.textContent = "النخبة العالمية لأصحاب الثروة السيادية";
      pinnedSub.setAttribute("data-i18n", "leaderboardSub");
    }

    if (chatViewport) chatViewport.style.display = "none";
    if (messagesContainer) messagesContainer.style.display = "none";
    if (composerWrap) composerWrap.style.display = "none";
    if (leaderboardContainer) {
      leaderboardContainer.style.display = "block";
      renderLeaderboard();
    }
  } else {
    if (pinnedTitle) {
      const prefix = window.t("club.welcomePrefix") || (AppState.language === "ar" ? "أهلًا بك في " : "Welcome to ");
      const tKey = "club." + (channelId === "global-lounge" ? "lounge" : channelId);
      let locName = channelData.name;
      if (window.I18N && window.I18N.club && window.I18N.club[tKey.split('.')[1]]) {
        locName = window.t(tKey);
      }
      pinnedTitle.textContent = `${prefix}${locName}`;
      pinnedTitle.removeAttribute("data-i18n");
    }
    if (pinnedSub) {
      const subKey = channelId === "global-lounge" ? "club.welcomeSub" : ("club." + channelId + "Sub");
      pinnedSub.textContent = window.t(subKey) || window.t("club.welcomeSub");
      pinnedSub.setAttribute("data-i18n", subKey);
    }

    if (chatViewport) chatViewport.style.display = "flex";
    if (messagesContainer) messagesContainer.style.display = "";
    if (composerWrap) composerWrap.style.display = "";
    if (leaderboardContainer) leaderboardContainer.style.display = "none";

    renderMessages();
  }

  if (window.AudioEngine) window.AudioEngine.playRustle();
  if (window.translateDOM && document.body) {
    const lang = localStorage.getItem("appLang") || "ar";
    if (lang === "en") window.translateDOM(document.body, lang);
  }

  const activeTab = document.querySelector(".page.is-active");
  if (activeTab && activeTab.id === "club-tab") {
    startClubWelcomeAutoDismiss(5000);
  }
}

let clubWelcomeDismissTimer = null;

function startClubWelcomeAutoDismiss(duration = 5000) {
  const plaque = document.getElementById("clubPinnedInfo");
  if (!plaque) return;

  if (clubWelcomeDismissTimer) {
    clearTimeout(clubWelcomeDismissTimer);
    clubWelcomeDismissTimer = null;
  }

  plaque.classList.remove("is-collapsed");

  clubWelcomeDismissTimer = setTimeout(() => {
    dismissClubWelcomePlaque();
  }, duration);
}

function cancelClubWelcomeAutoDismiss() {
  if (clubWelcomeDismissTimer) {
    clearTimeout(clubWelcomeDismissTimer);
    clubWelcomeDismissTimer = null;
  }
}

function dismissClubWelcomePlaque() {
  const plaque = document.getElementById("clubPinnedInfo");
  if (!plaque) return;
  plaque.classList.add("is-collapsed");
  if (clubWelcomeDismissTimer) {
    clearTimeout(clubWelcomeDismissTimer);
    clubWelcomeDismissTimer = null;
  }
}

window.startClubWelcomeAutoDismiss = startClubWelcomeAutoDismiss;
window.cancelClubWelcomeAutoDismiss = cancelClubWelcomeAutoDismiss;
window.dismissClubWelcomePlaque = dismissClubWelcomePlaque;

document.querySelectorAll(".club-room-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const badge = btn.querySelector(".room-badge");
    if (badge) badge.remove();
    if (window.HapticEngine && window.HapticEngine.tap) {
      window.HapticEngine.tap(10);
    }
    switchChannel(btn.dataset.channel);
  });
});

function initSovereignSalonTicker() {
  const tickerEl = document.getElementById("sovereignSalonTicker");
  if (!tickerEl) return;

  function updateTicker() {
    const now = new Date();
    const utcHours = now.getUTCHours();
    
    // Zurich/Geneva (UTC+1/+2): Prime during EU hours (7 - 16 UTC)
    const zurichState = (utcHours >= 7 && utcHours <= 16) ? "LIVE" : "CLOSED";
    // London (UTC+0/+1): Active (8 - 16:30 UTC)
    const londonState = (utcHours >= 8 && utcHours <= 16) ? "OPEN" : "SETTLED";
    // Riyadh (UTC+3): Session (7 - 15 UTC)
    const riyadhState = (utcHours >= 7 && utcHours <= 15) ? "PRIME" : "SECURED";
    // New York (UTC-5/-4): Monitor (13:30 - 20 UTC)
    const nyState = (utcHours >= 13 && utcHours <= 20) ? "ACTIVE" : "MONITOR";

    const hubsRow = tickerEl.querySelector(".ticker-hubs-row");
    if (hubsRow) {
      hubsRow.innerHTML = `
        <span class="ticker-hub-item"><span class="ticker-city">ZURICH</span> <span class="ticker-status-tag ${zurichState === "LIVE" ? "live" : "monitor"}">${zurichState}</span></span>
        <span class="ticker-dot-sep">•</span>
        <span class="ticker-hub-item"><span class="ticker-city">LONDON</span> <span class="ticker-status-tag ${londonState === "OPEN" ? "live" : "monitor"}">${londonState}</span></span>
        <span class="ticker-dot-sep">•</span>
        <span class="ticker-hub-item"><span class="ticker-city">RIYADH</span> <span class="ticker-status-tag ${riyadhState === "PRIME" ? "live" : "monitor"}">${riyadhState}</span></span>
        <span class="ticker-dot-sep">•</span>
        <span class="ticker-hub-item"><span class="ticker-city">NEW YORK</span> <span class="ticker-status-tag ${nyState === "ACTIVE" ? "live" : "monitor"}">${nyState}</span></span>
      `;
    }
  }

  updateTicker();
  setInterval(updateTicker, 30000);
}

document.addEventListener("DOMContentLoaded", () => {
  switchChannel("global-lounge");
  initSovereignSalonTicker();
  initWhisperToggle();
  updateCreditsUI();

  const dismissBtn = document.getElementById("clubPinnedDismissBtn");
  if (dismissBtn) {
    dismissBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.AudioEngine && window.AudioEngine.playRustle) {
        window.AudioEngine.playRustle();
      }
      if (window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap(8);
      }
      dismissClubWelcomePlaque();
    });
  }

  if (document.getElementById("club-tab")?.classList.contains("is-active")) {
    startClubWelcomeAutoDismiss(5000);
  }
});

window.toggleAccolade = function (channelId, messageIndex, type) {
  const channel = AppState.channels[channelId];
  if (!channel || !channel.messages[messageIndex]) return;
  const msg = channel.messages[messageIndex];
  if (!msg.accolades) msg.accolades = { endorse: 0, honor: 0, toast: 0 };
  if (!msg.userReacted) msg.userReacted = {};

  const hasReacted = msg.userReacted[type];
  if (hasReacted) {
    msg.accolades[type] = Math.max(0, (msg.accolades[type] || 1) - 1);
    delete msg.userReacted[type];
    if (window.AudioEngine && window.AudioEngine.playRustle) {
      window.AudioEngine.playRustle();
    }
    if (window.HapticEngine && window.HapticEngine.tap) {
      window.HapticEngine.tap(8);
    }
  } else {
    msg.accolades[type] = (msg.accolades[type] || 0) + 1;
    msg.userReacted[type] = true;
    if (window.AudioEngine && window.AudioEngine.playAccoladeStamp) {
      window.AudioEngine.playAccoladeStamp(type);
    } else if (window.AudioEngine && window.AudioEngine.playChime) {
      window.AudioEngine.playChime();
    }
    if (window.HapticEngine && window.HapticEngine.tap) {
      window.HapticEngine.tap(type === "toast" ? 22 : type === "honor" ? 18 : 14);
    }
  }

  try {
    localStorage.setItem(
      `channels_${AppState.user.id}`,
      JSON.stringify(AppState.channels),
    );
  } catch (e) {}

  renderMessages();
};

window.toggleDispatchReadMore = function (channelId, messageIndex) {
  const channel = AppState.channels[channelId];
  if (!channel || !channel.messages || !channel.messages[messageIndex]) return;
  const msg = channel.messages[messageIndex];
  msg.isExpanded = !msg.isExpanded;

  const textEl = document.getElementById(`dispatch-text-${channelId}-${messageIndex}`);
  const btnEl = document.getElementById(`dispatch-btn-${channelId}-${messageIndex}`);
  if (textEl && btnEl) {
    if (msg.isExpanded) {
      textEl.classList.remove("is-truncated");
      textEl.classList.add("is-expanded");
      btnEl.classList.add("is-expanded");
      btnEl.setAttribute("aria-expanded", "true");
      const label = btnEl.querySelector(".read-more-label");
      if (label) label.textContent = window.currentLang === "en" ? "Show Less" : "عرض أقل";
    } else {
      textEl.classList.remove("is-expanded");
      textEl.classList.add("is-truncated");
      btnEl.classList.remove("is-expanded");
      btnEl.setAttribute("aria-expanded", "false");
      const label = btnEl.querySelector(".read-more-label");
      if (label) label.textContent = window.currentLang === "en" ? "Show More" : "عرض المزيد";
    }
  } else {
    renderMessages();
  }

  if (window.AudioEngine && window.AudioEngine.playClick) {
    try {
      window.AudioEngine.playClick();
    } catch (e) {}
  }
  if (window.HapticEngine && window.HapticEngine.tap) {
    try {
      window.HapticEngine.tap(10);
    } catch (e) {}
  }
};

function renderMessages() {
  const container = document.getElementById("clubMessages");
  if (!container) return;

  const channelId = AppState.activeChannelId;
  const messages = AppState.channels[channelId]?.messages || [];

  container.innerHTML = messages
    .map((msg, idx) => {
      const isMe = Boolean(
        msg.senderId === AppState.user.id ||
        msg.isMe === true ||
        (AppState.user.id && msg.senderId && String(msg.senderId) === String(AppState.user.id)) ||
        (AppState.user.name && msg.senderName === AppState.user.name)
      );

      // Dynamic positioning & styling determined strictly by sender identity:
      // Current user (Me) -> Appears on the RIGHT with special sovereign personal formatting
      // Other members -> Appears on the LEFT with distinct elite guest formatting
      const senderPositionClass = isMe
        ? "dispatch-align-right dispatch-sender-me is-personal-dispatch"
        : "dispatch-align-left dispatch-sender-other is-incoming-dispatch";

      const senderPositionStyle = isMe
        ? "margin-left: auto !important; margin-right: 0 !important; align-self: flex-end !important;"
        : "margin-right: auto !important; margin-left: 0 !important; align-self: flex-start !important;";

      const elapsed = Date.now() - (msg.timestamp || 0);
      const isNewArrival = Boolean(msg.justDispatched || elapsed < 3200);
      const isFreshBloom = isMe && (msg.justDispatched || elapsed < 3800);
      const inkDelayMs = isFreshBloom ? Math.max(0, elapsed) : 0;
      if (msg.justDispatched) {
        setTimeout(() => {
          msg.justDispatched = false;
        }, 4000);
      }
      const msgDate = new Date(msg.timestamp || Date.now());
      const hours = String(msgDate.getHours()).padStart(2, "0");
      const minutes = String(msgDate.getMinutes()).padStart(2, "0");
      const seconds = String(msgDate.getSeconds()).padStart(2, "0");
      const preciseTimeStr = `${hours}:${minutes}:${seconds}`;
      const fullDateIso = msgDate.toLocaleString();
      const timeStr = `${hours}:${minutes}`;

      const senderName = isMe
        ? AppState.user.name || "Member"
        : msg.senderName || "Member";
      const senderTier = isMe
        ? AppState.user.tier || "SOVEREIGN"
        : msg.senderTier || "MEMBER";
      const displayTier = senderTier.replace(/\s+MEMBER$/i, "").trim() || senderTier;
      const senderWealth = isMe
        ? AppState.user.wealthIndex || AppState.user.wealth || "98%"
        : msg.senderWealth || "99.4%";
      const senderSeat = isMe
        ? "SANCTUM"
        : ((typeof ELITE_SEATS !== "undefined" && ELITE_SEATS[msg.senderId]) ||
           (typeof window !== "undefined" && window.ELITE_SEATS && window.ELITE_SEATS[msg.senderId]) ||
           "SOVEREIGN SEAT");
      const avatarUrl = typeof getMemberAvatar === "function"
        ? getMemberAvatar(msg.senderId, senderName, isMe)
        : (isMe
            ? (AppState.user.avatarUrl || AppState.user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240&auto=format&fit=crop")
            : ((typeof ELITE_AVATARS !== "undefined" && ELITE_AVATARS[msg.senderId]) ||
               "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=240&auto=format&fit=crop"));

      const defaultAccolades = isMe
        ? { endorse: 0, honor: 0, toast: 0 }
        : {
            endorse: 8 + ((idx * 3) % 12),
            honor: 5 + ((idx * 2) % 9),
            toast: 3 + ((idx * 4) % 7),
          };
      const accolades = msg.accolades || defaultAccolades;
      if (!msg.accolades) msg.accolades = accolades;
      const userReacted = msg.userReacted || {};
      const totalAccolades = (accolades.endorse || 0) + (accolades.honor || 0) + (accolades.toast || 0);
      const hasAccolades = totalAccolades > 0;
      const isWhisper = Boolean(msg.isWhisper);
      const safeText = typeof escapeHtml === "function" ? escapeHtml(msg.text) : String(msg.text || "");
      const rawSenderName = typeof escapeHtml === "function" ? escapeHtml(senderName) : String(senderName || "Member");
      const safeSenderName =
        rawSenderName === "Alexander W."
          ? "W. Alexander"
          : rawSenderName === "ALEXANDER W."
            ? "W. ALEXANDER"
            : rawSenderName;
      const isLongText = Boolean(safeText && (safeText.length > 150 || (safeText.match(/\n/g) || []).length >= 3));
      const isExpanded = Boolean(msg.isExpanded);

      return `
      <div class="sovereign-dispatch-card ${senderPositionClass} ${isWhisper ? "is-whisper-dispatch" : ""} ${isFreshBloom ? "has-golden-ink-bloom" : ""} ${isNewArrival ? "is-new-dispatch dispatch-just-arrived" : ""}" data-msg-idx="${idx}" data-sender-role="${isMe ? "me" : "other"}" style="${senderPositionStyle} ${isFreshBloom ? `--ink-delay: -${inkDelayMs}ms;` : ""}">
        ${
          isMe
            ? `<div class="dispatch-golden-ink-layer" aria-hidden="true">
                 <div class="golden-ink-wash"></div>
                 <div class="golden-seal-watermark">
                   <svg viewBox="0 0 100 100" class="golden-seal-watermark-svg" fill="none">
                     <circle cx="50" cy="50" r="46" stroke="currentColor" stroke-width="1" stroke-dasharray="2.5 1.5" opacity="0.6"/>
                     <circle cx="50" cy="50" r="42" stroke="currentColor" stroke-width="0.8" opacity="0.8"/>
                     <circle cx="50" cy="50" r="39" stroke="currentColor" stroke-width="1.2"/>
                     <path d="M40 45 L38 36 L43 40 L50 32 L57 40 L62 36 L60 45 Z" fill="currentColor" opacity="0.9"/>
                     <circle cx="50" cy="31" r="1.5" fill="currentColor"/>
                     <circle cx="38" cy="35" r="1.2" fill="currentColor"/>
                     <circle cx="62" cy="35" r="1.2" fill="currentColor"/>
                     <text x="50" y="56" text-anchor="middle" font-family="'Cormorant Garamond', 'Amiri', serif" font-size="7.5" font-weight="700" fill="currentColor" letter-spacing="1">THE 1% CLUB</text>
                     <text x="50" y="63" text-anchor="middle" font-family="'Inter', 'Cairo', sans-serif" font-size="3.8" font-weight="700" fill="currentColor" letter-spacing="0.6">DECREE</text>
                     <path d="M34 68 C 40 74, 45 76, 50 76 C 55 76, 60 74, 66 68" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" fill="none" opacity="0.75"/>
                     <circle cx="50" cy="76" r="1" fill="currentColor" opacity="0.8"/>
                   </svg>
                 </div>
                 <div class="golden-ink-quill-trace"></div>
               </div>`
            : ""
        }
        <div class="dispatch-header">
          <div class="dispatch-profile-group" onclick="openMemberProfileFromDispatch('${msg.senderId}')">
            <div class="dispatch-medallion-rim">
              <img src="${avatarUrl}" alt="${safeSenderName}" class="dispatch-avatar-img" onerror="this.src='https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=240&auto=format&fit=crop'" />
              <span class="dispatch-online-pip"></span>
            </div>
            <div class="dispatch-credentials">
              <div class="dispatch-primary-row">
                <span class="dispatch-name" style="color: ${msg.senderColor || "#e6c27a"}"><bdi dir="auto">${safeSenderName}</bdi></span>
                <span class="dispatch-sovereign-timestamp" title="${fullDateIso}">
                  <svg class="sovereign-time-icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="0.95" opacity="0.85"/>
                    <path d="M6 3.2v2.8l1.6 1" stroke="currentColor" stroke-width="0.95" stroke-linecap="round"/>
                  </svg>
                  <span class="timestamp-precise-val">${preciseTimeStr}</span>
                </span>
                <span class="dispatch-tier-hallmark">${displayTier}</span>
              </div>
              <div class="dispatch-secondary-row">
                <span class="dispatch-seat-tag">${senderSeat}</span>
                <span class="dispatch-mid-dot">•</span>
                <span class="dispatch-wealth-tag">${senderWealth}</span>
              </div>
            </div>
          </div>
          <div class="dispatch-chronometer">
            ${
              isMe
                ? `<span class="dispatch-seal-mark is-official-decree" title="${window.t("club.sealedDecree") || "وثيقة مختومة"}">
                    <svg class="decree-seal-icon" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.1" stroke-dasharray="2.2 1.2"/>
                      <path d="M4.5 7.2l1.8 1.8 3.5-3.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>`
                : ""
            }
          </div>
        </div>

        ${
          isWhisper
            ? `<div class="dispatch-whisper-tag-row">
                 <span class="dispatch-whisper-pill">
                   <svg class="whisper-pill-icon" viewBox="0 0 16 16" fill="none">
                     <rect x="2.5" y="6.5" width="11" height="8" rx="1.5" stroke="currentColor" stroke-width="1.1" />
                     <path d="M5 6.5V4.5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
                     <circle cx="8" cy="10.5" r="1.1" fill="currentColor"/>
                   </svg>
                   <span class="whisper-text-label" data-i18n="club.whisperBadge">${window.t("club.whisperBadge") || "همس سيادي مشفر • سرية سويسرية"}</span>
                 </span>
                 <span class="dispatch-whisper-discretion-mark">DISCRETION SECURED</span>
               </div>`
            : ""
        }

        <div class="dispatch-manuscript-body ${isWhisper ? "is-whisper-content" : ""}">
          ${
            isLongText
              ? `<div class="dispatch-text-content ${isExpanded ? "is-expanded" : "is-truncated"}" id="dispatch-text-${channelId}-${idx}" dir="auto">
                   ${safeText}
                 </div>
                 <button
                   type="button"
                   class="dispatch-read-more-btn ${isExpanded ? "is-expanded" : ""}"
                   onclick="toggleDispatchReadMore('${channelId}', ${idx})"
                   id="dispatch-btn-${channelId}-${idx}"
                   aria-expanded="${isExpanded ? "true" : "false"}"
                 >
                   <span class="read-more-label">${isExpanded ? (window.currentLang === "en" ? "Show Less" : "عرض أقل") : (window.currentLang === "en" ? "Show More" : "عرض المزيد")}</span>
                   <svg class="read-more-chevron" viewBox="0 0 12 12" fill="none">
                     <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                   </svg>
                 </button>`
              : `<div class="dispatch-text-content" dir="auto">${safeText}</div>`
          }
        </div>

        ${
          (!isMe || hasAccolades)
            ? `<div class="dispatch-accolades-bar">
                 <div class="dispatch-accolades-actions">
                   <button
                     type="button"
                     class="sovereign-accolade-btn is-endorse ${userReacted.endorse ? "is-conferred" : ""}"
                     onclick="toggleAccolade('${channelId}', ${idx}, 'endorse')"
                     title="${window.t("club.endorseDesc") || "ختم التأييد السيادي"}"
                   >
                     <span class="accolade-seal-wrap">
                       <svg class="accolade-svg-seal" viewBox="0 0 16 16" fill="none">
                         <circle cx="8" cy="8" r="6.8" stroke="currentColor" stroke-width="0.9" stroke-dasharray="1.6 1"/>
                         <path d="M8 3.2L9.2 6.3L12.5 7L10 9.2L10.8 12.5L8 10.7L5.2 12.5L6 9.2L3.5 7L6.8 6.3Z" fill="currentColor"/>
                       </svg>
                     </span>
                     <span class="accolade-title" data-i18n="club.endorse">${window.t("club.endorse") || "تأييد"}</span>
                     <span class="accolade-tally">${accolades.endorse || 0}</span>
                   </button>

                   <button
                     type="button"
                     class="sovereign-accolade-btn is-honor ${userReacted.honor ? "is-conferred" : ""}"
                     onclick="toggleAccolade('${channelId}', ${idx}, 'honor')"
                     title="${window.t("club.honorDesc") || "خاتم الوفاق والمصادقة"}"
                   >
                     <span class="accolade-seal-wrap">
                       <svg class="accolade-svg-seal" viewBox="0 0 16 16" fill="none">
                         <circle cx="8" cy="8" r="6.8" stroke="currentColor" stroke-width="0.9"/>
                         <circle cx="8" cy="8" r="4.8" stroke="currentColor" stroke-width="0.6" stroke-dasharray="1 1"/>
                         <circle cx="8" cy="8" r="2.2" stroke="currentColor" stroke-width="1.1"/>
                         <circle cx="8" cy="8" r="0.9" fill="currentColor"/>
                       </svg>
                     </span>
                     <span class="accolade-title" data-i18n="club.honor">${window.t("club.honor") || "وفاق"}</span>
                     <span class="accolade-tally">${accolades.honor || 0}</span>
                   </button>

                   <button
                     type="button"
                     class="sovereign-accolade-btn is-toast ${userReacted.toast ? "is-conferred" : ""}"
                     onclick="toggleAccolade('${channelId}', ${idx}, 'toast')"
                     title="${window.t("club.toastDesc") || "نخب الامتياز والريادة"}"
                   >
                     <span class="accolade-seal-wrap">
                       <svg class="accolade-svg-seal" viewBox="0 0 16 16" fill="none">
                         <path d="M4.5 3.5H11.5L10.2 8.2C9.8 9.2 9 10 8 10C7 10 6.2 9.2 5.8 8.2L4.5 3.5Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                         <line x1="8" y1="10" x2="8" y2="13.2" stroke="currentColor" stroke-width="1"/>
                         <line x1="5.5" y1="13.2" x2="10.5" y2="13.2" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
                         <circle cx="8" cy="6.2" r="1" fill="currentColor"/>
                       </svg>
                     </span>
                     <span class="accolade-title" data-i18n="club.toast">${window.t("club.toast") || "نخب"}</span>
                     <span class="accolade-tally">${accolades.toast || 0}</span>
                   </button>
                 </div>
               </div>`
            : ""
        }
      </div>
      `;
    })
    .join("");

  const hasNewArrival = messages.some((m) => m.justDispatched || (Date.now() - (m.timestamp || 0) < 1800));
  if (hasNewArrival && typeof container.scrollTo === "function") {
    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  } else {
    container.scrollTop = container.scrollHeight;
  }
}

window.isWhisperMode = false;
function initWhisperToggle() {
  const toggleBtn = document.getElementById("whisperCipherToggle");
  const composer = document.getElementById("obsidianDispatchComposer");
  const banner = document.getElementById("whisperActiveBanner");
  const input = document.getElementById("clubInput");

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    window.isWhisperMode = !window.isWhisperMode;
    toggleBtn.setAttribute("aria-pressed", window.isWhisperMode ? "true" : "false");
    toggleBtn.classList.toggle("is-active", window.isWhisperMode);
    
    if (composer) {
      composer.classList.toggle("is-whisper-mode", window.isWhisperMode);
    }
    if (banner) {
      banner.style.display = window.isWhisperMode ? "flex" : "none";
    }
    if (input) {
      if (window.isWhisperMode) {
        input.setAttribute("placeholder", window.t("club.whisperPlaceholder") || "صياغة برقية سيادية مشفرة ومحمية…");
      } else {
        input.setAttribute("placeholder", window.t("club.typeMessage") || "اكتب رسالة للنادي…");
      }
      input.focus();
    }

    if (window.AudioEngine && window.AudioEngine.playClick) {
      window.AudioEngine.playClick();
    }
  });
}

let typingTimeout;
function handleSendMessage() {
  try {
    const input = document.getElementById("clubInput");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const currentCredits =
      typeof ClubState !== "undefined" && ClubState && ClubState.chatCredits !== undefined
        ? ClubState.chatCredits
        : 10;
    if (currentCredits <= 0) {
      if (typeof window.openCreditsModal === "function") {
        window.openCreditsModal(true);
      }
      return;
    }

    ClubState.chatCredits = Math.max(0, currentCredits - 1);
    try {
      ClubState.save();
    } catch (e) {
      console.warn("Could not save ClubState:", e);
    }
    if (typeof updateCreditsUI === "function") {
      updateCreditsUI(true);
    }

    const isWhisper = Boolean(window.isWhisperMode);
    const channelId = AppState.activeChannelId || "global-lounge";
    if (!AppState.channels[channelId]) {
      AppState.channels[channelId] = { messages: [] };
    }

    const newMsg = {
      senderId: AppState.user.id,
      text: text,
      isWhisper: isWhisper,
      timestamp: Date.now(),
      justDispatched: true,
      accolades: { endorse: 0, honor: 0, toast: 0 },
    };

    AppState.channels[channelId].messages.push(newMsg);
    input.value = "";
    if (typeof window.syncClubInputDirection === "function") {
      window.syncClubInputDirection(input);
    }

    if (window.AudioEngine && window.AudioEngine.playSend) {
      try {
        window.AudioEngine.playSend();
      } catch (e) {}
    }
    if (window.HapticEngine && window.HapticEngine.tap) {
      try {
        window.HapticEngine.tap(10);
      } catch (e) {}
    }

    try {
      AppState.save();
    } catch (e) {
      console.warn("Could not save AppState:", e);
    }

    renderMessages();

    const container = document.getElementById("clubMessages");
    if (container) {
      container.scrollTop = container.scrollHeight;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 50);
    }

    clearTimeout(typingTimeout);

    const indicator = document.getElementById("typingIndicator");
    const typingName = document.getElementById("typingName");

    setTimeout(() => {
      if (AppState.activeChannelId !== channelId) return;

      const { member: elite, text: replyText } = processEliteResponse(text);
      if (typingName) typingName.textContent = elite.name;
      if (indicator) indicator.style.display = "flex";

      typingTimeout = setTimeout(
        () => {
          if (indicator) indicator.style.display = "none";
          if (!AppState.channels[channelId]) return;

          AppState.channels[channelId].messages.push({
            senderId: elite.id,
            senderName: elite.name,
            senderTier: elite.tier,
            senderColor: elite.color,
            avatarUrl: typeof getMemberAvatar === "function" ? getMemberAvatar(elite.id, elite.name, false) : (ELITE_AVATARS[elite.id] || ""),
            text: replyText,
            timestamp: Date.now(),
            justDispatched: true,
            accolades: {
              endorse: 1 + Math.floor(Math.random() * 4),
              honor: Math.floor(Math.random() * 3),
              toast: Math.floor(Math.random() * 2),
            },
          });

          if (window.AudioEngine && window.AudioEngine.playReceive) {
            try {
              window.AudioEngine.playReceive(elite.tier);
            } catch (e) {}
          }
          try {
            AppState.save();
          } catch (e) {}

          if (AppState.activeChannelId === channelId) {
            renderMessages();
          }
        },
        1400 + Math.random() * 800,
      );
    }, 900);
  } catch (err) {
    console.error("handleSendMessage encountered error:", err);
  }
}

document
  .getElementById("clubSendBtn")
  ?.addEventListener("click", handleSendMessage);

const clubInputEl = document.getElementById("clubInput");
if (clubInputEl) {
  clubInputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage();
  });
  clubInputEl.addEventListener("input", () => {
    if (typeof window.syncClubInputDirection === "function") {
      window.syncClubInputDirection(clubInputEl);
    }
  });
  clubInputEl.addEventListener("keyup", () => {
    if (typeof window.syncClubInputDirection === "function") {
      window.syncClubInputDirection(clubInputEl);
    }
  });
  clubInputEl.addEventListener("change", () => {
    if (typeof window.syncClubInputDirection === "function") {
      window.syncClubInputDirection(clubInputEl);
    }
  });
}

/* === 6. MODALS & SETTINGS LOGIC === */
function openInspectionModal(item, catKey, isOwned, isEquipped) {
  const modal = document.getElementById("inspectionModal");
  if (!modal) return;

  modal.hidden = false;
  if (window.AudioEngine && window.AudioEngine.playModalOpen) {
    window.AudioEngine.playModalOpen();
  }

  document.getElementById("inspectionTitle").textContent = window.t(item.name);
  document.getElementById("inspectionRarity").textContent =
    RARITY_LABEL[item.rarity]();
  document.getElementById("inspectionLore").textContent =
    (item.lore ? window.t(item.lore) : window.t("dynamic.loreDefault"));

  let mediaContent = "";
  if (item.image) {
    mediaContent = `<img src="${item.image}" alt="${window.t(item.name)}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='block';" />
                    <div style="display:none; width:100%; height:100%; justify-content:center; align-items:center;">${ICONS[item.icon] || ICONS["crown"]}</div>`;
  } else if (item.icon && (item.icon.startsWith("http") || item.icon.startsWith("data:"))) {
    mediaContent = `<img src="${item.icon}" alt="${window.t(item.name)}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='block';" />
                    <div style="display:none; width:100%; height:100%; justify-content:center; align-items:center;">${ICONS["crown"]}</div>`;
  } else {
    mediaContent = ICONS[item.icon] || ICONS["crown"];
  }
  document.getElementById("inspectionImage").innerHTML = mediaContent;

  const equipBtn = document.getElementById("inspectionEquipBtn");

  const newBtn = equipBtn.cloneNode(true);
  equipBtn.parentNode.replaceChild(newBtn, equipBtn);

  if (item.free) {
    newBtn.textContent = window.t("boutique.freeActivated");
    newBtn.disabled = true;
  } else if (isOwned) {
    newBtn.textContent = isEquipped
      ? window.t("boutique.unequip")
      : window.t("dynamic.equipIdentity");
    newBtn.disabled = false;
    newBtn.onclick = () => equipItem(item, catKey);
  } else {
    newBtn.textContent = `${window.t("dynamic.buy")} — ${item.price.toLocaleString("en-US")}`;
    newBtn.disabled = false;
    newBtn.onclick = () => purchaseItem(item, catKey);
  }
}

document.getElementById("inspectionCloseBtn")?.addEventListener("click", () => {
  closeInspectionModal();
});

document.getElementById("reliquaryModalCloseBtn")?.addEventListener("click", () => {
  if (typeof closeReliquaryInspectModal === "function") closeReliquaryInspectModal();
});

document.getElementById("reliquaryInspectModal")?.addEventListener("click", (e) => {
  if (e.target.id === "reliquaryInspectModal") {
    if (typeof closeReliquaryInspectModal === "function") closeReliquaryInspectModal();
  }
});

function processPurchase(item) {
  return ClubState.purchase(item);
}

function purchaseItem(item, catKey) {
  if (processPurchase(item)) {
    closeInspectionModal();
    playPurchaseAnimation();
    if (window.HapticEngine) {
      window.HapticEngine.boutiquePurchase();
    } else if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([35, 50, 20]);
    }
    if (window.AudioEngine) {
      window.AudioEngine.playChime();
    }
  }
}
function equipItem(item, catKey) {
  ClubState.toggleEquip(catKey, item.id);
  closeInspectionModal();
  if (window.AudioEngine && window.AudioEngine.playEquip) {
    window.AudioEngine.playEquip();
  }
}
function updateMasterCard() {
  const pmItems = document.getElementById("pmItemsCollected");
  if (pmItems) {
    pmItems.textContent = AppState.collectedItems.length;
  }

  const wealthValueEl = document.getElementById("wealthValue");
  const privValueEl = document.getElementById("privValue");
  if (wealthValueEl && privValueEl) {
    const totalSpent = AppState.user.totalSpent || 0;
    const itemsCount = AppState.collectedItems.length;

    let wealth = 90.0 + (totalSpent / 1000) * 0.1;
    if (wealth > 99.9) wealth = 99.9;

    let priv = 80 + itemsCount * 5;
    if (priv > 100) priv = 100;

    wealthValueEl.textContent = wealth.toFixed(1) + "%";
    privValueEl.textContent = priv + "%";
  }

  if (window.renderMembershipTab) window.renderMembershipTab();
  if (window.renderWidgetSection) {
    const widgetHTML = renderWidgetSection();
    const widgetContainer = document.querySelector(".widget-section");
    if (widgetContainer) {
      widgetContainer.outerHTML = widgetHTML;
    }
  }
}

function closeInspectionModal() {
  const modal = document.getElementById("inspectionModal");
  if (modal) {
    modal.hidden = true;
    modal.classList.remove("is-active");
    if (window.AudioEngine && window.AudioEngine.playModalClose) {
      window.AudioEngine.playModalClose();
    }
  }
}

// ---------------------------------------------------------
// ---------------------------------------------------------
function showQuickPreview(item, wasAutoEquipped = false) {
  let tooltip = document.getElementById("quickPreviewTooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "quickPreviewTooltip";
    tooltip.className = "quick-preview-tooltip";
    tooltip.innerHTML = `
      <div class="qp-content">
        <div id="qpIcon" class="qp-icon-wrapper"></div>
        <h4 id="qpName"></h4>
        <span id="qpRarity" class="rarity-badge"></span>
        <p id="qpLore"></p>
        <div id="qpAutoEquipMsg" class="qp-auto-equip-msg" style="display:none; color: var(--gold-champagne); font-size: 11px; margin-top: 10px; font-weight: 600;">✨ تم التجهيز تلقائياً</div>
        <div class="qp-hint">أفلت للإغلاق</div>
      </div>
    `;
    document.body.appendChild(tooltip);
  }

  document.getElementById("qpName").textContent = window.t(item.name);

  const autoEquipMsg = document.getElementById("qpAutoEquipMsg");
  if (autoEquipMsg) {
    autoEquipMsg.style.display = wasAutoEquipped ? "block" : "none";
  }

  const rarityEl = document.getElementById("qpRarity");
  rarityEl.textContent = RARITY_LABEL[item.rarity]();
  rarityEl.className = `rarity-badge rarity-${item.rarity}`;

  let lore = item.lore;
  if (!lore) {
    if (item.icon === "crown") lore = window.t("dynamic.loreCrown");
    else if (item.icon === "aura") lore = window.t("dynamic.loreAura");
    else if (item.icon === "ring") lore = window.t("dynamic.loreRing");
    else if (item.icon === "pendant") lore = window.t("dynamic.lorePendant");
    else if (item.icon === "artifact") lore = window.t("dynamic.loreArtifact");
    else if (item.icon === "star") lore = window.t("dynamic.loreStar");
    else lore = window.t("dynamic.loreDefault");
  }
  document.getElementById("qpLore").textContent = (item.lore ? window.t(lore) : lore);

  const iconSvg = ICONS[item.icon] || ICONS["star"];
  document.getElementById("qpIcon").innerHTML = iconSvg;

  tooltip.classList.add("is-visible");
}

function hideQuickPreview() {
  const tooltip = document.getElementById("quickPreviewTooltip");
  if (tooltip) {
    tooltip.classList.remove("is-visible");
  }
}

document.querySelectorAll(".b-filt-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".b-filt-btn")
      .forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    currentOwnershipFilter = btn.dataset.filter;
    const activeCat =
      document.querySelector(".boutique-tab.is-active")?.dataset.cat || "all";
    renderBoutique(activeCat, true);
  });
});

applyEquippedToCard(ClubState.equipped);
const activeBoutiqueTab = document.querySelector(".boutique-tab.is-active");
if (activeBoutiqueTab && typeof renderBoutique === "function") {
  renderBoutique(activeBoutiqueTab.dataset.cat);
}
if (typeof updateMasterCard === "function") {
  updateMasterCard();
}
if (typeof renderProfileCollection === "function") {
}

document.addEventListener("DOMContentLoaded", () => {
  const savedPortrait = localStorage.getItem(`portrait_${ClubState.member.id}`);
  if (savedPortrait) {
    const portraitPhoto = document.getElementById("portraitPhoto");
    const photoUploadBtn = document.getElementById("photoUploadBtn");
    if (portraitPhoto) {
      portraitPhoto.style.backgroundImage = `url(${savedPortrait})`;
      if (photoUploadBtn) photoUploadBtn.style.display = "none";
    }
    const profilePhoto = document.getElementById("profilePortraitPhoto");
    if (profilePhoto)
      profilePhoto.style.backgroundImage = `url(${savedPortrait})`;
  }


  const menuAddFriend = document.getElementById("menuAddFriend");
  if (menuAddFriend) {
    menuAddFriend.addEventListener("click", () => {
      showNavToast(window.t("dynamic.addFriendSoon"));
    });
  }
  const menuMyCollection = document.getElementById("menuMyCollection");
  if (menuMyCollection) {
    menuMyCollection.addEventListener("click", () => {
      const targetSection = document.getElementById("profileCollectionSection") || document.querySelector(
        "#profile-tab .profile-collection-section",
      );
      if (targetSection) {
        if (window.AudioEngine && window.AudioEngine.playHover) {
          window.AudioEngine.playHover();
        }
        if (window.HapticEngine && window.HapticEngine.tap) {
          window.HapticEngine.tap(18);
        }

        targetSection.scrollIntoView({ behavior: "smooth", block: "center" });

        // Auto-Expansion effect
        targetSection.classList.remove("profile-section-expanded");
        void targetSection.offsetWidth;
        targetSection.classList.add("profile-section-expanded");
        setTimeout(() => targetSection.classList.remove("profile-section-expanded"), 1300);

        setTimeout(() => {
          const cards = targetSection.querySelectorAll(".pcs-item-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("is-expanded-card");
              setTimeout(() => {
                card.classList.remove("is-expanded-card");
              }, 750);
            }, index * 90);
          });
        }, 350);
      }
    });
  }


  const editIconFloating = document.querySelector(".edit-icon-floating");
  if (editIconFloating) {
    editIconFloating.addEventListener("click", () => {
      document.getElementById("editAccountBtn")?.click();
    });
  }

  const menuAccountInfo = document.getElementById("menuAccountInfo");
  const accountInfoModal = document.getElementById("accountInfoModal");
  if (menuAccountInfo && accountInfoModal) {
    menuAccountInfo.addEventListener("click", () => {
      let draft = null;
      try {
        draft = JSON.parse(localStorage.getItem("profileDraft"));
      } catch (e) {}
        
      let currentAvatarUrl = "";
      const locInput = document.getElementById("editProfileLocationInput");
      if (draft) {
        document.getElementById("editProfileNameInput").value = draft.name || "";
        document.getElementById("editProfileQuoteInput").value = draft.quote || "";
        if (locInput) locInput.value = draft.location || "";
        currentAvatarUrl = draft.avatarUrl || "";
        document.getElementById("editProfileAvatarUrl").value = currentAvatarUrl;
      } else {
        document.getElementById("editProfileNameInput").value = AppState.user.name || "";
        document.getElementById("editProfileQuoteInput").value = AppState.user.quote || AppState.user.bio || "";
        if (locInput) locInput.value = AppState.user.location || "";
        currentAvatarUrl = AppState.user.avatarUrl || "";
        document.getElementById("editProfileAvatarUrl").value = currentAvatarUrl;
      }
        
      if (typeof renderAvatarPresets === "function") { renderAvatarPresets(currentAvatarUrl); }
      if (typeof updateEditProfilePreview === "function") {
        updateEditProfilePreview(currentAvatarUrl);
      }

      document.getElementById("accEmailInput").value =
        AppState.user.email || "";
      document.getElementById("accPhoneInput").value =
        AppState.user.phone || "";

      if (typeof renderModalCirclesSelector === "function") {
        renderModalCirclesSelector(AppState.user.circles || ["pe_venture", "haute_horlogerie", "sovereign_ai", "aviation_yachts"]);
      }

      accountInfoModal.classList.add("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalOpen) {
        window.AudioEngine.playModalOpen();
      }
    });
  }
  document
    .getElementById("closeAccountInfoModal")
    ?.addEventListener("click", () => {
      accountInfoModal?.classList.remove("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalClose) {
        window.AudioEngine.playModalClose();
      }
    });
  document.querySelectorAll(".quote-preset-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const quoteInput = document.getElementById("editProfileQuoteInput");
      if (quoteInput) {
        quoteInput.value = chip.dataset.quote;
        quoteInput.dispatchEvent(new Event("input"));
        saveProfileDraft();
      }
    });
  });

  document
    .getElementById("saveAccountInfoBtn")
    ?.addEventListener("click", () => {
      const nameInput = document.getElementById("editProfileNameInput").value.trim();
      const quoteInput = document.getElementById("editProfileQuoteInput").value.trim();
      const locInput = document.getElementById("editProfileLocationInput")?.value.trim();
      const avatarUrl = document.getElementById("editProfileAvatarUrl").value.trim();
        
      if (nameInput) {
        AppState.user.name = nameInput;
        AppState.user.username = nameInput;
      }
      if (quoteInput) {
        AppState.user.quote = quoteInput;
        AppState.user.bio = quoteInput;
      }
      if (locInput) {
        AppState.user.location = locInput.toUpperCase();
      }
      if (avatarUrl) {
        AppState.user.avatarUrl = avatarUrl;
      }

      AppState.user.email = document
        .getElementById("accEmailInput")
        .value.trim();
      AppState.user.phone = document
        .getElementById("accPhoneInput")
        .value.trim();

      if (window.modalSelectedCircles && Array.isArray(window.modalSelectedCircles) && window.modalSelectedCircles.length > 0) {
        AppState.user.circles = [...window.modalSelectedCircles];
        const isAr = window.currentLang === "ar" || document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";
        const circleNames = AppState.user.circles.map(id => {
          const item = (typeof SOVEREIGN_CIRCLES_CATALOG !== "undefined") ? SOVEREIGN_CIRCLES_CATALOG.find(c => c.id === id) : null;
          return item ? (isAr ? item.arName : item.enName) : id;
        });
        AppState.user.interests = circleNames.join(" · ");
      }
          
      AppState.save();
      updateUI();
      if (typeof renderProfileCircles === "function") {
        renderProfileCircles();
      }
      localStorage.removeItem("profileDraft");
      accountInfoModal?.classList.remove("is-open");
    });

  const menuHelp = document.getElementById("menuHelp");
  const helpSupportModal = document.getElementById("helpSupportModal");
  if (menuHelp && helpSupportModal) {
    menuHelp.addEventListener("click", () => {
      helpSupportModal.classList.add("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalOpen) {
        window.AudioEngine.playModalOpen();
      }
    });
  }
  document
    .getElementById("closeHelpSupportModal")
    ?.addEventListener("click", () => {
      helpSupportModal?.classList.remove("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalClose) {
        window.AudioEngine.playModalClose();
      }
    });

  const contactConciergeBtn = document.getElementById("contactConciergeBtn");
  if (contactConciergeBtn) {
    contactConciergeBtn.addEventListener("click", () => {
      if (window.AudioEngine && window.AudioEngine.playChime) {
        window.AudioEngine.playChime();
      }
      if (window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap(25);
      }
      helpSupportModal?.classList.remove("is-open");
      showNavToast(window.t("misc.conciergeSuccess") || "تم إرسال طلب الكونسيرج بنجاح. سيتواصل معك المساعد الخاص قريباً.");
    });
  }

  const menuMembership = document.getElementById("menuMembership");
  if (menuMembership) {
    menuMembership.addEventListener("click", () => {
      const membershipTabBtn = document.querySelector(
        '[data-tab="membership"]',
      );
      if (membershipTabBtn) membershipTabBtn.click();
    });
  }

  const menuMembershipHistory = document.getElementById("menuMembershipHistory");
  if (menuMembershipHistory) {
    menuMembershipHistory.addEventListener("click", () => {
      if (window.AudioEngine && window.AudioEngine.playRustle) {
        window.AudioEngine.playRustle();
      }
      if (window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap(15);
      }
      const ledgerSec = document.getElementById("profileHistorySection");
      if (ledgerSec) {
        ledgerSec.scrollIntoView({ behavior: "smooth", block: "center" });
        ledgerSec.classList.add("ledger-highlight");
        setTimeout(() => ledgerSec.classList.remove("ledger-highlight"), 1600);
      }
    });
  }

  const menuSettings = document.getElementById("menuSettings");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettingsModal = document.getElementById("closeSettingsModal");
  if (menuSettings && settingsModal) {
    menuSettings.addEventListener("click", () => {
      settingsModal.classList.add("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalOpen) {
        window.AudioEngine.playModalOpen();
      }
    });
  }
  if (closeSettingsModal && settingsModal) {
    closeSettingsModal.addEventListener("click", () => {
      settingsModal.classList.remove("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalClose) {
        window.AudioEngine.playModalClose();
      }
    });
  }


  const btnSettingsLogout = document.getElementById("btnSettingsLogout");
  const logoutConfirmModal = document.getElementById("logoutConfirmModal");
  const closeLogoutConfirmModal = document.getElementById(
    "closeLogoutConfirmModal",
  );
  const btnCancelLogout = document.getElementById("btnCancelLogout");
  const btnConfirmLogout = document.getElementById("btnConfirmLogout");

  if (btnSettingsLogout && logoutConfirmModal) {
    btnSettingsLogout.addEventListener("click", () => {
      logoutConfirmModal.classList.add("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalOpen) {
        window.AudioEngine.playModalOpen();
      }
    });
  }

  if (closeLogoutConfirmModal && logoutConfirmModal) {
    closeLogoutConfirmModal.addEventListener("click", () => {
      logoutConfirmModal.classList.remove("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalClose) {
        window.AudioEngine.playModalClose();
      }
    });
  }

  if (btnCancelLogout && logoutConfirmModal) {
    btnCancelLogout.addEventListener("click", () => {
      logoutConfirmModal.classList.remove("is-open");
      if (window.AudioEngine && window.AudioEngine.playModalClose) {
        window.AudioEngine.playModalClose();
      }
    });
  }

  if (btnConfirmLogout) {
    btnConfirmLogout.addEventListener("click", () => {
      // Simulate logout
      window.location.reload();
    });
  }
  // --- Verified Membership Shield Medallion in Header ---
  const headerVerifiedShieldBtn = document.getElementById("headerVerifiedShieldBtn");
  if (headerVerifiedShieldBtn) {
    headerVerifiedShieldBtn.addEventListener("click", () => {
      if (window.AudioEngine && window.AudioEngine.playChime) {
        window.AudioEngine.playChime();
      }
      if (window.HapticEngine && window.HapticEngine.tap) {
        window.HapticEngine.tap();
      }
      const title = window.currentLang === "ar" ? "اعتماد العضوية السيادية" : "SOVEREIGN CREDENTIAL VERIFIED";
      const desc = window.currentLang === "ar"
        ? `العضوية موثقة ومعتمدة برقم #${AppState.user.id}`
        : `Membership verified & authenticated under ID #${AppState.user.id}`;
      if (typeof showNavToast === "function") {
        showNavToast(`${title}: ${desc}`);
      }
    });
  }

  // --- Boutique Sovereign Balance Deposit Modal ---
  const boutiqueAddBalanceBtn = document.getElementById("boutiqueAddBalanceBtn");
  const depositModal = document.getElementById("depositModal");
  const depositCancelBtn = document.getElementById("depositCancelBtn");

  window.openDepositModal = function() {
    if (!depositModal) return;
    depositModal.hidden = false;
    const msgEl = document.getElementById("depositModalMsg");
    if (msgEl) msgEl.textContent = "";
    if (window.AudioEngine && window.AudioEngine.playModalOpen) {
      window.AudioEngine.playModalOpen();
    }
  };

  window.closeDepositModal = function() {
    if (!depositModal) return;
    depositModal.hidden = true;
    if (window.AudioEngine && window.AudioEngine.playModalClose) {
      window.AudioEngine.playModalClose();
    }
  };

  if (boutiqueAddBalanceBtn) {
    boutiqueAddBalanceBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      window.openDepositModal();
    });
  }

  if (depositCancelBtn) {
    depositCancelBtn.addEventListener("click", window.closeDepositModal);
  }

  if (depositModal) {
    depositModal.addEventListener("click", (e) => {
      if (e.target === depositModal) {
        window.closeDepositModal();
      }
    });
  }

  document.querySelectorAll(".deposit-pkg").forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = parseInt(btn.dataset.amount, 10) || 10000;
      AppState.balance += amount;
      ClubState.balance += amount;
      AppState.save();
      ClubState.save();
      updateUI();

      if (window.AudioEngine && window.AudioEngine.playChime) {
        window.AudioEngine.playChime();
      }
      if (window.HapticEngine && window.HapticEngine.boutiquePurchase) {
        window.HapticEngine.boutiquePurchase();
      }
      if (typeof triggerGoldDustMilestone === "function") {
        triggerGoldDustMilestone();
      }

      const toastMsg = window.currentLang === "ar"
        ? `تم إيداع $${amount.toLocaleString()} في رصيدك السيادي بنجاح!`
        : `Successfully deposited $${amount.toLocaleString()} into your sovereign balance!`;
      if (typeof showNavToast === "function") {
        showNavToast(toastMsg);
      }
      window.closeDepositModal();
    });
  });

  // --- Club Messaging Credits Modal ---
  const clubCreditsBuyBtn = document.getElementById("clubCreditsBuyBtn");
  const creditsModal = document.getElementById("creditsModal");
  const creditsCancelBtn = document.getElementById("creditsCancelBtn");

  window.openCreditsModal = function(showExhaustedMsg = false) {
    if (!creditsModal) return;
    creditsModal.hidden = false;
    const msgEl = document.getElementById("creditsModalMsg");
    if (msgEl) {
      if (showExhaustedMsg) {
        msgEl.textContent = window.currentLang === "ar"
          ? "لقد استنفدت رصيد رسائلك اليومي. يرجى اختيار باقة للمتابعة."
          : "You have exhausted your daily message allowance. Select a package to continue.";
        msgEl.style.color = "#d9534f";
      } else {
        msgEl.textContent = "";
      }
    }
    if (window.AudioEngine && window.AudioEngine.playModalOpen) {
      window.AudioEngine.playModalOpen();
    }
  };

  window.closeCreditsModal = function() {
    if (!creditsModal) return;
    creditsModal.hidden = true;
    if (window.AudioEngine && window.AudioEngine.playModalClose) {
      window.AudioEngine.playModalClose();
    }
  };

  if (clubCreditsBuyBtn) {
    clubCreditsBuyBtn.addEventListener("click", () => {
      window.openCreditsModal(false);
    });
  }

  if (creditsCancelBtn) {
    creditsCancelBtn.addEventListener("click", window.closeCreditsModal);
  }

  if (creditsModal) {
    creditsModal.addEventListener("click", (e) => {
      if (e.target === creditsModal) {
        window.closeCreditsModal();
      }
    });
  }

  document.querySelectorAll("#creditsModal .credits-pkg").forEach((btn) => {
    btn.addEventListener("click", () => {
      const credits = parseInt(btn.dataset.credits, 10) || 10;
      const price = parseInt(btn.dataset.price, 10) || 10;

      if (AppState.balance >= price) {
        AppState.balance -= price;
        ClubState.balance = AppState.balance;
        AppState.user.totalSpent = (AppState.user.totalSpent || 0) + price;
        ClubState.totalSpent = AppState.user.totalSpent;
      }
      ClubState.chatCredits = (ClubState.chatCredits !== undefined ? ClubState.chatCredits : 10) + credits;
      AppState.save();
      ClubState.save();
      updateCreditsUI(true);
      updateUI();

      if (window.AudioEngine && window.AudioEngine.playChime) {
        window.AudioEngine.playChime();
      }
      if (window.HapticEngine && window.HapticEngine.boutiquePurchase) {
        window.HapticEngine.boutiquePurchase();
      }

      const msg = window.currentLang === "ar"
        ? `تم شحن ${credits} رسالة بنجاح!`
        : `Successfully added ${credits} message credits!`;
      if (typeof showNavToast === "function") {
        showNavToast(msg);
      }
      window.closeCreditsModal();
    });
  });
});

function playPurchaseAnimation() {
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background =
    "radial-gradient(circle at center, rgba(212,175,106,0.25), transparent)";
  flash.style.pointerEvents = "none";
  flash.style.zIndex = "9999";
  flash.style.transition = "opacity 0.8s ease-out";
  document.body.appendChild(flash);
  setTimeout(() => {
    flash.style.opacity = "0";
  }, 50);
  setTimeout(() => {
    flash.remove();
  }, 850);
}

// ---------------------------------------------------------
// ---------------------------------------------------------

function generateProfileAchievementSkeleton() {
  let html = '';
  for (let i = 0; i < 4; i++) {
    html += `
      <div class="honor-card profile-achievement-skeleton">
        <div class="skeleton-shimmer-el skeleton-icon-small"></div>
        <div class="skeleton-shimmer-el skeleton-name"></div>
        <div class="skeleton-shimmer-el skeleton-badge"></div>
        <div class="skeleton-shimmer-el skeleton-progress-wrap"></div>
      </div>
    `;
  }
  return html;
}

function renderProfileAchievements() {
  const container = document.getElementById("profileAchievementsGrid");
  const summaryContainer = document.getElementById("achievementsSummary");
  const ribbonRack = document.getElementById("heraldicRibbonRack");
  if (!container) return;

  if (!container.dataset.skeletonShown) {
    let skeletonHtml = generateProfileAchievementSkeleton();
    
    container.innerHTML = skeletonHtml;
    container.dataset.skeletonShown = "true";
    setTimeout(() => renderProfileAchievements(), 450);
    return;
  }
  container.dataset.skeletonShown = "";

  let unlocked = [];
  try {
    unlocked = JSON.parse(localStorage.getItem("club_achievements")) || [];
  } catch (e) {}

  let html = "";
  const totalAchievements = Object.keys(ACHIEVEMENTS_DATA).length;
  let earnedCount = 0;

  // 1. Render Sovereign Diplomatic Ribbon Rack
  if (ribbonRack) {
    let rackHtml = "";
    Object.keys(ACHIEVEMENTS_DATA).forEach((id) => {
      const ach = ACHIEVEMENTS_DATA[id];
      const isUnlocked = ach.isUnlocked();
      const nameText = window.t("honors." + id);
      const orderTag = window.t("honors.ord_" + id) || id.toUpperCase();
      rackHtml += `
        <div class="hrr-ribbon-unit ${isUnlocked ? 'is-unlocked' : 'is-locked'} hrr-ribbon-${id}" 
             role="button" 
             tabindex="0" 
             title="${nameText} • ${isUnlocked ? window.t("honors.bestowed") : window.t("honors.pendingConferral")}"
             onclick="window.openHeraldicCitationModal('${id}')">
          <div class="hrr-ribbon-silk">
            <div class="hrr-moire-texture" aria-hidden="true"></div>
            <div class="hrr-ribbon-stripes"></div>
          </div>
          <div class="hrr-ribbon-bezel" aria-hidden="true"></div>
          ${isUnlocked 
            ? '<div class="hrr-rosette-device" aria-hidden="true"><span class="hrr-rosette-core">✦</span></div>' 
            : '<div class="hrr-lock-device" aria-hidden="true">🔒</div>'}
        </div>
      `;
    });
    ribbonRack.innerHTML = rackHtml;
  }

  // 2. Render Heraldic Medals with Moiré Ribbons and Cloisonné Enamel
  Object.keys(ACHIEVEMENTS_DATA).forEach((id) => {
    const ach = ACHIEVEMENTS_DATA[id];
    const isUnlocked = ach.isUnlocked();
    if (isUnlocked) earnedCount++;

    const nameText = window.t("honors." + id);
    const titleText = window.t("honors.title_" + id);
    const orderTag = window.t("honors.ord_" + id) || id.toUpperCase();
    const descText = window.t("honors.desc_" + id);

    if (isUnlocked) {
      html += `
        <div class="honor-card heraldic-order-card is-unlocked gyro-element" 
             data-tilt 
             data-honor-id="${id}"
             onclick="window.openHeraldicCitationModal('${id}')"
             role="button" 
             tabindex="0" 
             title="${window.t("honors.inspectCitation")}">
          <div class="honor-card-bezel"></div>
          <div class="honor-card-specular" aria-hidden="true"></div>
          
          <!-- Top Gilded Brooch Suspension Assembly -->
          <div class="honor-suspension-assembly">
            <div class="honor-brooch-bar">
              <span class="brooch-rivet brooch-rivet-l" aria-hidden="true"></span>
              <span class="brooch-hallmark">ORD • 24K</span>
              <span class="brooch-rivet brooch-rivet-r" aria-hidden="true"></span>
            </div>
            
            <!-- Draped Moiré Silk Ribbon -->
            <div class="honor-moire-ribbon ribbon-${id}">
              <div class="ribbon-watermark" aria-hidden="true"></div>
              <div class="ribbon-stripes-weave"></div>
              <div class="ribbon-crease-v" aria-hidden="true"></div>
            </div>
            
            <!-- Solid Gold Suspension Ring -->
            <div class="honor-suspension-ring" aria-hidden="true"></div>
          </div>

          <!-- Cloisonné Enamel & High-Relief Medallion -->
          <div class="honor-insignia-pedestal honor-cloisonne-medal medal-${id}">
            <div class="cloisonne-enamel-base" aria-hidden="true"></div>
            <div class="cloisonne-beaded-rim" aria-hidden="true"></div>
            <div class="honor-icon">${ach.icon}</div>
            <div class="cloisonne-specular-glint" aria-hidden="true"></div>
          </div>

          <div class="honor-order-badge">${orderTag}</div>
          <div class="honor-name">${nameText}</div>
          <div class="honor-title">${titleText}</div>
          <div class="honor-pill honor-bestowed-pill">
            <span class="pill-sparkle">✦</span>
            <span>${window.t("honors.bestowed")}</span>
          </div>

          <div class="honor-citation-hint">
            <span>${window.t("honors.inspectCitation")}</span>
          </div>
        </div>
      `;
    } else {
      let current = ach.progress();
      if (current > ach.target) current = ach.target;
      const percent = Math.min(100, Math.max(0, (current / ach.target) * 100));

      const remainingFormatted = (ach.target - current).toLocaleString();
      let remainingText = window
        .t("honors.remaining")
        .replace("{0}", remainingFormatted);

      html += `
        <div class="honor-card heraldic-order-card is-locked gyro-element skeleton-fade-in" 
             data-tilt 
             data-honor-id="${id}"
             onclick="window.openHeraldicCitationModal('${id}')"
             role="button" 
             tabindex="0" 
             title="${window.t("honors.inspectCitation")}">
          <div class="honor-card-bezel"></div>
          
          <!-- Top Muted Brooch Suspension Assembly -->
          <div class="honor-suspension-assembly">
            <div class="honor-brooch-bar is-muted">
              <span class="brooch-rivet brooch-rivet-l" aria-hidden="true"></span>
              <span class="brooch-hallmark">CHANCELLERIE</span>
              <span class="brooch-rivet brooch-rivet-r" aria-hidden="true"></span>
            </div>
            
            <!-- Draped Moiré Silk Ribbon (Subdued / Inactive) -->
            <div class="honor-moire-ribbon ribbon-${id} is-muted">
              <div class="ribbon-watermark" aria-hidden="true"></div>
              <div class="ribbon-stripes-weave"></div>
              <div class="ribbon-crease-v" aria-hidden="true"></div>
            </div>
            
            <!-- Suspension Ring -->
            <div class="honor-suspension-ring is-muted" aria-hidden="true"></div>
          </div>

          <!-- Antique Bronze Medallion -->
          <div class="honor-insignia-pedestal honor-cloisonne-medal medal-${id} is-muted">
            <div class="cloisonne-enamel-base" aria-hidden="true"></div>
            <div class="cloisonne-beaded-rim" aria-hidden="true"></div>
            <div class="honor-icon">${ach.icon}</div>
          </div>

          <div class="honor-order-badge">${orderTag}</div>
          <div class="honor-name">${nameText}</div>
          <div class="honor-title">${window.t("honors.pendingConferral")}</div>
          <div class="honor-progress-wrap">
            <div class="honor-progress-bar">
              <div class="honor-progress-fill" style="width: ${percent}%;"></div>
            </div>
            <div class="honor-progress-text">${remainingText}</div>
          </div>

          <div class="honor-citation-hint">
            <span>${window.t("honors.inspectCitation")}</span>
          </div>
        </div>
      `;
    }
  });

  container.innerHTML = html;
  if (window.initGyroElements) window.initGyroElements();

  if (summaryContainer) {
    const completionPercent = Math.round(
      (earnedCount / totalAchievements) * 100,
    );
    summaryContainer.innerHTML = `
      <div class="achievements-summary-col">
        <span class="achievements-summary-label">${window.t("honors.unlocked")}</span>
        <span class="achievements-summary-value">${earnedCount} / ${totalAchievements}</span>
      </div>
      <div class="achievements-summary-divider"></div>
      <div class="achievements-summary-col" style="align-items: flex-end;">
        <span class="achievements-summary-label">${window.t("honors.tierProgress")}</span>
        <span class="achievements-summary-value" style="color: ${completionPercent === 100 ? "#e6c27a" : "#d4af6a"};">${completionPercent}%</span>
      </div>
    `;
  }
}

// Sovereign Heraldic Citation Patent Modal Handlers
window.openHeraldicCitationModal = function(id) {
  const ach = ACHIEVEMENTS_DATA[id];
  if (!ach) return;
  const modal = document.getElementById("heraldicCitationModal");
  if (!modal) return;

  if (window.AudioEngine) {
    if (typeof window.AudioEngine.playHeraldicMedalChime === "function") {
      window.AudioEngine.playHeraldicMedalChime();
    } else if (typeof window.AudioEngine.playGoldenSovereignChime === "function") {
      window.AudioEngine.playGoldenSovereignChime();
    }
  }

  if (window.HapticEngine && typeof window.HapticEngine.triggerMilestoneVibration === "function") {
    window.HapticEngine.triggerMilestoneVibration();
  } else if (navigator.vibrate) {
    try { navigator.vibrate([15, 30, 45]); } catch (e) {}
  }

  // Physical Medal Sway Interaction
  const clickedCard = document.querySelector(`.heraldic-order-card[data-honor-id="${id}"]`);
  if (clickedCard) {
    clickedCard.classList.remove("is-medal-swaying");
    void clickedCard.offsetWidth;
    clickedCard.classList.add("is-medal-swaying");
  }

  const isUnlocked = ach.isUnlocked();
  const nameEl = document.getElementById("citationMedalName");
  const orderClassEl = document.getElementById("citationOrderClass");
  const quoteEl = document.getElementById("citationQuoteText");
  const statusEl = document.getElementById("citationConferralStatus");
  const criteriaEl = document.getElementById("citationCriteriaVal");
  const emblemEl = document.getElementById("citationSealEmblem");
  const ribbonPreviewEl = document.getElementById("citationRibbonPreview");

  if (nameEl) nameEl.textContent = window.t("honors." + id);
  if (orderClassEl) orderClassEl.textContent = window.t("honors.ord_" + id);
  if (quoteEl) quoteEl.textContent = window.t("honors.chancelleryCitation_" + id) || window.t("honors.desc_" + id);
  
  if (statusEl) {
    if (isUnlocked) {
      statusEl.innerHTML = `<span class="hcc-status-bestowed">${window.t("honors.bestowed")}</span>`;
    } else {
      statusEl.innerHTML = `<span class="hcc-status-pending">${window.t("honors.pendingConferral")}</span>`;
    }
  }

  if (criteriaEl) {
    criteriaEl.textContent = `$${(ach.target || 5000).toLocaleString()}`;
  }

  if (emblemEl) {
    emblemEl.innerHTML = ach.icon || '⚜️';
  }

  if (ribbonPreviewEl) {
    ribbonPreviewEl.innerHTML = `
      <div class="hcc-ribbon-sample ribbon-${id} ${isUnlocked ? 'is-unlocked' : 'is-locked'}">
        <div class="ribbon-watermark" aria-hidden="true"></div>
        <div class="ribbon-stripes-weave"></div>
        <div class="hcc-ribbon-seal">${isUnlocked ? '✦ 24K' : 'PENDING'}</div>
      </div>
    `;
  }

  modal.hidden = false;
  modal.setAttribute("aria-hidden", "false");
  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
};

window.closeHeraldicCitationModal = function() {
  const modal = document.getElementById("heraldicCitationModal");
  if (!modal) return;
  if (window.AudioEngine && window.AudioEngine.playModalClose) {
    window.AudioEngine.playModalClose();
  }
  modal.classList.remove("is-open");
  modal.hidden = true;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

document.getElementById("closeCitationModalBtn")?.addEventListener("click", window.closeHeraldicCitationModal);
document.getElementById("citationDismissBtn")?.addEventListener("click", window.closeHeraldicCitationModal);
document.getElementById("heraldicCitationModal")?.addEventListener("click", (e) => {
  if (e.target.id === "heraldicCitationModal") {
    window.closeHeraldicCitationModal();
  }
});


function generateProfileCollectionSkeleton() {
  let html = '';
  for (let i = 0; i < 4; i++) {
    html += `
      <div class="pcs-item-card reliquary-pedestal-card reliquary-skeleton">
        <div class="skeleton-shimmer-el skeleton-reliquary-status"></div>
        <div class="reliquary-pedestal-cradle">
          <div class="pcs-artifact-pedestal">
            <span class="skeleton-shimmer-el skeleton-reliquary-icon"></span>
          </div>
        </div>
        <div class="pcs-item-info">
          <div class="skeleton-shimmer-el skeleton-reliquary-name"></div>
          <div class="skeleton-shimmer-el skeleton-reliquary-meta"></div>
          <div class="skeleton-shimmer-el skeleton-reliquary-chip"></div>
        </div>
      </div>
    `;
  }
  return html;
}

function findItemCategory(itemId) {
  for (const cat in BOUTIQUE) {
    if (BOUTIQUE[cat].items.some((i) => i.id === itemId)) {
      return cat;
    }
  }
  return "crowns";
}

function openReliquaryInspectModal(itemId) {
  let item = null;
  let catKey = "crowns";
  for (const cat in BOUTIQUE) {
    const found = BOUTIQUE[cat].items.find((i) => i.id === itemId);
    if (found) {
      item = found;
      catKey = cat;
      break;
    }
  }
  if (!item) return;

  const modal = document.getElementById("reliquaryInspectModal");
  if (!modal) return;

  const isAr = AppState.language === "ar" || document.documentElement.lang === "ar";
  const isEquipped = AppState.equipped && AppState.equipped[catKey] === item.id;

  // Title & Serial
  const titleEl = document.getElementById("reliquaryItemTitle");
  if (titleEl) {
    titleEl.textContent = window.t("items." + item.id) || item.name;
  }

  const serialEl = document.getElementById("reliquaryItemSerial");
  if (serialEl) {
    serialEl.textContent = `SER: ARC-0001-${item.id.toUpperCase()}-${item.rarity || 1}`;
  }

  // Visual
  const visualEl = document.getElementById("reliquaryItemVisual");
  if (visualEl) {
    let iconHtml = "";
    if (item.image) {
      iconHtml = `<img src="${item.image}" alt="${item.id}" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
                  <span class="boutique-card-fallback" style="display:none;font-size:32px;">${ICONS[item.icon] || ICONS["crown"]}</span>`;
    } else if (item.icon && (item.icon.startsWith("http") || item.icon.startsWith("data:"))) {
      iconHtml = `<img src="${item.icon}" alt="${item.id}" style="width:100%;height:100%;object-fit:contain;" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
                  <span class="boutique-card-fallback" style="display:none;font-size:32px;">${ICONS["crown"]}</span>`;
    } else {
      iconHtml = `<span class="boutique-card-fallback" style="display:flex;font-size:34px;color:#d4af37;">${ICONS[item.icon] || ICONS["crown"]}</span>`;
    }
    visualEl.innerHTML = iconHtml;
  }

  // Status Badge
  const statusBadge = document.getElementById("reliquaryItemStatusBadge");
  const statusText = document.getElementById("reliquaryItemStatusText");
  if (statusBadge && statusText) {
    statusBadge.className = "rmc-status-badge " + (isEquipped ? "is-equipped" : "is-vaulted");
    statusText.textContent = isEquipped 
      ? (window.t("profile.equippedBadge") || (isAr ? "مُقَلَّد بالهوية السيادية" : "EQUIPPED ON IDENTITY"))
      : (window.t("profile.vaultedBadge") || (isAr ? "محفوظ بالخزانة الخاصة" : "SAFELY IN VAULT"));
  }

  // Specs
  const alloyEl = document.getElementById("reliquaryItemAlloy");
  if (alloyEl) {
    alloyEl.textContent = (item.rarity >= 3)
      ? (window.t("profile.solidGoldAlloy") || (isAr ? "Au 999.9 ذهب خالص" : "Au 999.9 Solid Gold"))
      : (window.t("profile.obsidianTitaniumAlloy") || (isAr ? "تيتانيوم أسود وأوبسيديان" : "Black Titanium & Obsidian"));
  }

  const foundryEl = document.getElementById("reliquaryItemFoundry");
  if (foundryEl) {
    foundryEl.textContent = (item.rarity >= 3)
      ? (window.t("profile.stMoritzFoundry") || (isAr ? "دار الصك • سانت موريتز" : "St. Moritz Master Foundry"))
      : (window.t("profile.genevaGuild") || (isAr ? "نقابة الصياغة • جنيف" : "Geneva Guild of Horology"));
  }

  const rarityEl = document.getElementById("reliquaryItemRarity");
  if (rarityEl) {
    rarityEl.textContent = (typeof RARITY_LABEL !== 'undefined' && RARITY_LABEL[item.rarity]) ? RARITY_LABEL[item.rarity]() : (isAr ? "نادر سيادي" : "SOVEREIGN");
  }

  const priceEl = document.getElementById("reliquaryItemPrice");
  if (priceEl) {
    priceEl.textContent = item.price ? "$" + item.price.toLocaleString() : "$10,000";
  }

  // Lore
  const loreEl = document.getElementById("reliquaryItemLore");
  if (loreEl) {
    loreEl.textContent = item.lore ? window.t(item.lore) : (window.t("dynamic.loreDefault") || (isAr ? "تحفة ملكية مسبوكة يدوياً من الذهب السيادي الخالص، معتمدة من المجلس التأسيسي الأعلى." : "Handcrafted sovereign artifact forged from solid gold and obsidian."));
  }

  // Toggle Equip Button
  const toggleBtn = document.getElementById("reliquaryToggleEquipBtn");
  const toggleText = document.getElementById("reliquaryToggleEquipBtnText");
  if (toggleBtn && toggleText) {
    toggleBtn.className = "rmc-equip-btn " + (isEquipped ? "is-unequip" : "is-equip");
    toggleText.textContent = isEquipped
      ? (window.t("profile.unequipAction") || (isAr ? "إعادة وحفظ في الخزانة" : "Return to Sovereign Vault"))
      : (window.t("profile.equipAction") || (isAr ? "تقليد على بطاقة الماستر كارد" : "Equip to Master Card"));

    toggleBtn.onclick = () => {
      ClubState.toggleEquip(catKey, item.id);
      if (window.AudioEngine && window.AudioEngine.playEquip) {
        window.AudioEngine.playEquip();
      }
      if (window.HapticEngine && window.HapticEngine.boutiquePurchase) {
        window.HapticEngine.boutiquePurchase();
      } else if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([25, 40, 15]);
      }
      renderProfileCollection();
      if (typeof updateMasterCard === "function") updateMasterCard();
      openReliquaryInspectModal(item.id);
    };
  }

  modal.hidden = false;
  modal.classList.add("is-active");
  if (typeof attachHorologicalScrewHandlers === "function") {
    attachHorologicalScrewHandlers();
  }
  if (window.AudioEngine && window.AudioEngine.playModalOpen) {
    window.AudioEngine.playModalOpen();
  }
}

function closeReliquaryInspectModal() {
  const modal = document.getElementById("reliquaryInspectModal");
  if (modal) {
    modal.classList.remove("is-active");
    setTimeout(() => {
      modal.hidden = true;
    }, 200);
    if (window.AudioEngine && window.AudioEngine.playModalClose) {
      window.AudioEngine.playModalClose();
    }
  }
}

window.openReliquaryInspectModal = openReliquaryInspectModal;
window.closeReliquaryInspectModal = closeReliquaryInspectModal;

// profileCollectionTimeout hoisted at top-level

function renderProfileCollection(forceSkeleton = false) {
  const container = document.getElementById("profileCollectionGrid");
  if (!container) return;

  if (forceSkeleton || !container.dataset.skeletonShown) {
    if (profileCollectionTimeout) clearTimeout(profileCollectionTimeout);
    container.innerHTML = generateProfileCollectionSkeleton();
    container.dataset.skeletonShown = "true";
    profileCollectionTimeout = setTimeout(() => {
      container.dataset.skeletonShown = "done";
      renderProfileCollection(false);
    }, 380);
    return;
  }
  container.dataset.skeletonShown = "done";

  const collectedItems = AppState.collectedItems
    .map((id) => {
      if (typeof id === "object") return id;
      let found = null;
      for (const cat in BOUTIQUE) {
        const it = BOUTIQUE[cat].items.find((i) => i.id === id);
        if (it) found = it;
      }
      return found;
    })
    .filter((i) => i);

  let itemCount = collectedItems.length;
  const isAr = AppState.language === "ar" || document.documentElement.lang === "ar";

  // Update header count badge
  const countPill = document.getElementById("reliquaryCountPill");
  if (countPill) {
    countPill.textContent = isAr ? `${itemCount} تحف سيادية` : `${itemCount} Artifacts`;
  }

  if (itemCount === 0) {
    const emptyText = window.t("profile.emptyVault") || (isAr ? "الخزينة فارغة حالياً. تفضل باقتناء أولى قطعك من البوتيك." : "Your vault is empty. Acquire your first asset from the Boutique.");
    const btnText = window.t("explore_boutique") || (isAr ? "استكشاف البوتيك" : "Explore Boutique");

    container.innerHTML = `
      <div class="empty-reliquary-cushion" onclick="goToPage('boutique')" role="button" tabindex="0">
        <div class="reliquary-empty-icon-wrap">
          <div class="reliquary-empty-pedestal-ring"></div>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.3">
            <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z" fill="rgba(212,175,106,0.08)" stroke="#d4af37"/>
            <circle cx="12" cy="12" r="4" stroke="#d4af37" stroke-dasharray="2 2" stroke-width="1"/>
          </svg>
        </div>
        <div class="reliquary-empty-title">${window.t("profile.reliquaryTitle") || "خزانة المقتنيات والتحف السيادية"}</div>
        <p class="reliquary-empty-desc">${emptyText}</p>
        <button type="button" class="reliquary-empty-action-btn">${btnText}</button>
      </div>
    `;
  } else {
    let html = "";
    for (const item of collectedItems) {
      if (!item) continue;
      const nameText = isAr
        ? (window.t("items." + item.id) || item.name)
        : (window.t("items." + item.id) || item.name);
      const isEquipped = AppState.equipped && Object.values(AppState.equipped).includes(item.id);
      const rarityText = item.rarity ? (typeof RARITY_LABELS !== 'undefined' && RARITY_LABELS[item.rarity] ? RARITY_LABELS[item.rarity]() : item.rarity) : '';

      let iconHtml = "";
      if (item.image) {
        iconHtml = `<img src="${item.image}" alt="${nameText}" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
                    <span class="boutique-card-fallback" style="display:none">${ICONS[item.icon] || ICONS["star"]}</span>`;
      } else if (item.icon && (item.icon.startsWith("http") || item.icon.startsWith("data:"))) {
        iconHtml = `<img src="${item.icon}" alt="${nameText}" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
                    <span class="boutique-card-fallback" style="display:none">${ICONS["star"]}</span>`;
      } else {
        iconHtml = `<span class="boutique-card-fallback" style="display:flex">${ICONS[item.icon] || ICONS["star"]}</span>`;
      }

      const statusTag = isEquipped
        ? `<div class="reliquary-card-status is-active"><span class="rcs-dot"></span><span>${isAr ? 'مُقَلَّد' : 'EQUIPPED'}</span></div>`
        : `<div class="reliquary-card-status is-vaulted"><span class="rcs-dot"></span><span>${isAr ? 'بالخزانة' : 'VAULTED'}</span></div>`;

      html += `
        <div class="pcs-item-card reliquary-pedestal-card gyro-element skeleton-fade-in ${isEquipped ? 'is-equipped' : ''}" 
             data-tilt
             data-item-id="${item.id}"
             onclick="openReliquaryInspectModal('${item.id}')"
             role="button"
             tabindex="0"
             title="${isAr ? 'انقر لفحص شهادة وتوثيق التحفة' : 'Tap to inspect provenance certificate'}">
          ${statusTag}
          <div class="reliquary-pedestal-cradle">
            <div class="reliquary-spotlight-halo"></div>
            <div class="pcs-artifact-pedestal">
              <span class="boutique-card-icon">
                ${iconHtml}
              </span>
            </div>
          </div>
          <div class="pcs-item-info">
            <div class="pcs-item-name">${nameText}</div>
            <div class="pcs-item-meta">
              ${rarityText ? `<span class="pcs-item-rarity">${rarityText}</span>` : ''}
              <span class="pcs-item-price">${item.price ? "$" + item.price.toLocaleString() : ''}</span>
            </div>
            <div class="reliquary-inspect-chip">
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor">
                <circle cx="8" cy="8" r="6" stroke="#d4af37" stroke-width="1.2"></circle>
                <path d="M8 5v3l2 1" stroke="#d4af37" stroke-width="1.2" stroke-linecap="round"></path>
              </svg>
              <span>${isAr ? 'فحص الشهادة' : 'Inspect'}</span>
            </div>
          </div>
        </div>
      `;
    }
    container.innerHTML = html;
    if (window.initGyroElements) window.initGyroElements();
  }
}


const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
];

function renderAvatarPresets(currentUrl) {
  const gallery = document.getElementById("avatarPresetsGallery");
  if (!gallery) return;
  
  gallery.innerHTML = "";
  PRESET_AVATARS.forEach((url) => {
    const thumb = document.createElement("div");
    thumb.className = "avatar-preset-thumbnail" + (url === currentUrl ? " active" : "");
    thumb.style.backgroundImage = `url('${url}')`;
    thumb.dataset.url = url;
    thumb.addEventListener("click", () => {
      // update hidden input
      const urlInput = document.getElementById("editProfileAvatarUrl");
      if (urlInput) {
        urlInput.value = url;
        urlInput.dispatchEvent(new Event("input"));
      }
      
      // update active state in gallery
      document.querySelectorAll(".avatar-preset-thumbnail").forEach(el => el.classList.remove("active"));
      thumb.classList.add("active");
    });
    gallery.appendChild(thumb);
  });
}

function updateEditProfilePreview(url) {
  const preview = document.getElementById("editProfileAvatarPreview");
  if (preview) {
    if (!url) url = PRESET_AVATARS[0];
    preview.style.backgroundImage = `url('${url}')`;
    document.querySelectorAll(".avatar-preset-thumbnail").forEach(el => {
      if (el.dataset.url === url || el.style.backgroundImage.includes(url)) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }
}

function saveProfileDraft() {
  const draft = {
    name: document.getElementById("editProfileNameInput")?.value || "",
    quote: document.getElementById("editProfileQuoteInput")?.value || "",
    location: document.getElementById("editProfileLocationInput")?.value || "",
    avatarUrl: document.getElementById("editProfileAvatarUrl")?.value || "",
  };
  localStorage.setItem("profileDraft", JSON.stringify(draft));
}

document
  .getElementById("editProfileNameInput")
  ?.addEventListener("input", saveProfileDraft);
document
  .getElementById("editProfileQuoteInput")
  ?.addEventListener("input", saveProfileDraft);
document
  .getElementById("editProfileLocationInput")
  ?.addEventListener("input", saveProfileDraft);
document
  .getElementById("editProfileAvatarUrl")
  ?.addEventListener("input", (e) => {
    saveProfileDraft();
    updateEditProfilePreview(e.target.value);
  });
document
  .getElementById("editProfileAvatarFile")
  ?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        const urlInput = document.getElementById("editProfileAvatarUrl");
        if (urlInput) urlInput.value = dataUrl;
        updateEditProfilePreview(dataUrl);
        saveProfileDraft();
      };
      reader.readAsDataURL(file);
    }
  });

document.getElementById("editAccountBtn")?.addEventListener("click", () => {
  if (window.AudioEngine && typeof window.AudioEngine.playClick === "function") {
    window.AudioEngine.playClick();
  }
  document.getElementById("menuAccountInfo")?.click();
});

document.querySelector(".phc-medallion-case")?.addEventListener("click", () => {
  if (window.AudioEngine && typeof window.AudioEngine.playClick === "function") {
    window.AudioEngine.playClick();
  }
  document.getElementById("menuAccountInfo")?.click();
});

function renderProfileStatsBar() {
  const container = document.getElementById("profileStatsBar");
  if (!container) return;

  if (!container.dataset.renderedOnce) {
    let html = `
      <div class="horo-chassis-header" style="opacity:0.4;">
        <span class="horo-hallmark-txt">MANUFACTURE D'HORLOGERIE • CALIBRE 1%</span>
      </div>
      <div class="horo-dials-row">
    `;
    for(let i=0; i<4; i++) {
      html += `
        <div class="psb-col horo-subdial profile-stats-skeleton">
          <div class="skeleton-shimmer-el" style="width:38px; height:38px; border-radius:50%; margin:0 auto 4px auto;"></div>
          <div class="skeleton-shimmer-el skeleton-name" style="width:32px; height:10px; margin:2px auto;"></div>
          <div class="skeleton-shimmer-el skeleton-badge" style="width:24px; height:6px; margin:2px auto;"></div>
        </div>
      `;
      if (i < 3) html += '<div class="psb-divider horo-divider"></div>';
    }
    html += '</div>';
    container.innerHTML = html;
    container.dataset.renderedOnce = "true";
    setTimeout(() => renderProfileStatsBar(), 180);
    return;
  }

  const isAr = document.documentElement.dir === "rtl" || document.body.dir === "rtl";
  const isElite = AppState.user.tier === "Elite" || AppState.user.tier === "نخبة";
  const tierVal = isElite ? window.t("profile.compTierElite") : window.t("profile.compTierSovereign");
  const tierLabel = window.t("profile.compTierLabel");
  const tierSubCalibre = window.t("profile.horoSubdialTier") || (isAr ? "عيار السيادة" : "Apex Calibre");

  const itemsVal = AppState.collectedItems.length;
  const itemsLabel = window.t("profile.compVaultLabel");
  const vaultSubCalibre = window.t("profile.horoSubdialVault") || (isAr ? "عداد الخزانة" : "Vault Chrono");

  // Calculate actual earned honors
  let earnedHonors = 0;
  if (typeof ACHIEVEMENTS_DATA !== "undefined") {
    Object.keys(ACHIEVEMENTS_DATA).forEach((id) => {
      try {
        if (ACHIEVEMENTS_DATA[id].isUnlocked && ACHIEVEMENTS_DATA[id].isUnlocked()) {
          earnedHonors++;
        }
      } catch(e) {}
    });
  }
  const honorsVal = `${earnedHonors} / 4`;
  const honorsLabel = window.t("profile.compHonorsLabel");
  const honorsSubCalibre = window.t("profile.horoSubdialHonors") || (isAr ? "ميزان الأوسمة" : "Honors Quad");

  const sinceVal = window.t("profile.compRegistryVal") || (isAr ? "2024" : "EST. 2024");
  const sinceLabel = window.t("profile.compRegistryLabel");
  const registrySubCalibre = window.t("profile.horoSubdialRegistry") || (isAr ? "ميناء الانتساب" : "Genesis Dial");

  // Needle Rotations (Horological Degrees)
  const tierNeedleDeg = isElite ? 45 : 0;
  const vaultNeedleDeg = Math.min((itemsVal || 0) * 36, 360);
  const honorsNeedleDeg = earnedHonors === 0 ? -45 : earnedHonors === 1 ? 45 : earnedHonors === 2 ? 135 : earnedHonors === 3 ? 225 : 315;

  container.innerHTML = `
    <!-- Precision Screws -->
    <div class="horo-chassis-screw horo-screw-tl" aria-hidden="true"><div class="horo-screw-slot"></div></div>
    <div class="horo-chassis-screw horo-screw-tr" aria-hidden="true"><div class="horo-screw-slot"></div></div>
    <div class="horo-chassis-screw horo-screw-bl" aria-hidden="true"><div class="horo-screw-slot"></div></div>
    <div class="horo-chassis-screw horo-screw-br" aria-hidden="true"><div class="horo-screw-slot"></div></div>

    <!-- Sapphire Crystal Bevel Glare -->
    <div class="horo-crystal-glare" aria-hidden="true"></div>

    <!-- Calibre Hallmark Header -->
    <div class="horo-chassis-header">
      <span class="horo-hallmark-txt">MANUFACTURE D'HORLOGERIE • CALIBRE 1% • 28,800 VPH</span>
    </div>

    <div class="horo-dials-row">
      <!-- 1. SOVEREIGN TIER SUB-DIAL -->
      <div class="psb-col psb-complication-pod horo-subdial skeleton-fade-in" id="compTierPod" role="button" tabindex="0" title="${tierLabel}: ${tierVal}">
        <div class="horo-bezel-rim">
          <div class="horo-dial-face horo-face-tier">
            <div class="horo-azure-rings" aria-hidden="true"></div>
            <svg viewBox="0 0 44 44" class="horo-subdial-svg" aria-hidden="true">
              <circle cx="22" cy="22" r="20" stroke="rgba(212,175,106,0.28)" stroke-width="0.75" fill="none" />
              <circle cx="22" cy="22" r="16.5" stroke="rgba(212,175,106,0.18)" stroke-dasharray="1 3.2" stroke-width="1.2" fill="none" />
              <!-- Imperial Crown at Apex -->
              <path d="M19 7l3-3.2 3 3.2 1.5-1.8 1.5 5h-12l1.5-5z" fill="#f4d38c" stroke="#8a6924" stroke-width="0.35"/>
              <!-- Sector Graduations -->
              <line x1="22" y1="4" x2="22" y2="7" stroke="#d4af6a" stroke-width="0.8"/>
              <line x1="34" y1="10" x2="31.5" y2="12" stroke="#d4af6a" stroke-width="0.6"/>
              <line x1="10" y1="10" x2="12.5" y2="12" stroke="#d4af6a" stroke-width="0.6"/>
            </svg>
            <!-- Hand / Needle -->
            <div class="horo-needle-pivot" style="--target-rot: ${tierNeedleDeg}deg; transform: rotate(${tierNeedleDeg}deg);">
              <div class="horo-needle horo-needle-gold"></div>
            </div>
            <!-- Central Ruby Pivot Jewel -->
            <div class="horo-ruby-cap" aria-hidden="true"><div class="horo-ruby-core"></div></div>
          </div>
        </div>
        <div class="psb-value horo-dial-val">${tierVal}</div>
        <div class="psb-label horo-dial-lbl">${tierLabel}</div>
      </div>

      <div class="psb-divider horo-divider" aria-hidden="true"></div>

      <!-- 2. RARE ASSETS / RELIQUARY SUB-DIAL -->
      <div class="psb-col psb-complication-pod horo-subdial skeleton-fade-in" id="compVaultPod" role="button" tabindex="0" title="${itemsLabel}: ${itemsVal}">
        <div class="horo-bezel-rim">
          <div class="horo-dial-face horo-face-vault">
            <div class="horo-azure-rings" aria-hidden="true"></div>
            <svg viewBox="0 0 44 44" class="horo-subdial-svg" aria-hidden="true">
              <circle cx="22" cy="22" r="20" stroke="rgba(212,175,106,0.28)" stroke-width="0.75" fill="none" />
              <!-- 12-Hour Chrono Graduations -->
              <circle cx="22" cy="22" r="16.5" stroke="rgba(212,175,106,0.22)" stroke-dasharray="0.9 2.25" stroke-width="1.1" fill="none" />
              <circle cx="22" cy="5.5" r="0.9" fill="#d4af6a" />
              <circle cx="38.5" cy="22" r="0.9" fill="#d4af6a" />
              <circle cx="22" cy="38.5" r="0.9" fill="#d4af6a" />
              <circle cx="5.5" cy="22" r="0.9" fill="#d4af6a" />
            </svg>
            <div class="horo-needle-pivot" style="--target-rot: ${vaultNeedleDeg}deg; transform: rotate(${vaultNeedleDeg}deg);">
              <div class="horo-needle horo-needle-blued"></div>
            </div>
            <div class="horo-ruby-cap" aria-hidden="true"><div class="horo-ruby-core"></div></div>
          </div>
        </div>
        <div class="psb-value horo-dial-val" id="pmItemsCollected">${itemsVal}</div>
        <div class="psb-label horo-dial-lbl">${itemsLabel}</div>
      </div>

      <div class="psb-divider horo-divider" aria-hidden="true"></div>

      <!-- 3. PRESTIGE HONORS QUADRANT SUB-DIAL -->
      <div class="psb-col psb-complication-pod horo-subdial skeleton-fade-in" id="compHonorsPod" role="button" tabindex="0" title="${honorsLabel}: ${honorsVal}">
        <div class="horo-bezel-rim">
          <div class="horo-dial-face horo-face-honors">
            <div class="horo-azure-rings" aria-hidden="true"></div>
            <svg viewBox="0 0 44 44" class="horo-subdial-svg" aria-hidden="true">
              <circle cx="22" cy="22" r="20" stroke="rgba(212,175,106,0.28)" stroke-width="0.75" fill="none" />
              <!-- 4 Quadrants Crosshairs -->
              <line x1="22" y1="4.5" x2="22" y2="39.5" stroke="rgba(212,175,106,0.22)" stroke-width="0.65" stroke-dasharray="2 2"/>
              <line x1="4.5" y1="22" x2="39.5" y2="22" stroke="rgba(212,175,106,0.22)" stroke-width="0.65" stroke-dasharray="2 2"/>
              <!-- Quadrant Honors Pips (Illuminated if earned) -->
              <circle cx="31" cy="13" r="2" class="horo-sector-pip ${earnedHonors >= 1 ? 'is-lit' : ''}" />
              <circle cx="31" cy="31" r="2" class="horo-sector-pip ${earnedHonors >= 2 ? 'is-lit' : ''}" />
              <circle cx="13" cy="31" r="2" class="horo-sector-pip ${earnedHonors >= 3 ? 'is-lit' : ''}" />
              <circle cx="13" cy="13" r="2" class="horo-sector-pip ${earnedHonors >= 4 ? 'is-lit' : ''}" />
            </svg>
            <div class="horo-needle-pivot" style="--target-rot: ${honorsNeedleDeg}deg; transform: rotate(${honorsNeedleDeg}deg);">
              <div class="horo-needle horo-needle-gold"></div>
            </div>
            <div class="horo-ruby-cap" aria-hidden="true"><div class="horo-ruby-core"></div></div>
          </div>
        </div>
        <div class="psb-value horo-dial-val">${honorsVal}</div>
        <div class="psb-label horo-dial-lbl">${honorsLabel}</div>
      </div>

      <div class="psb-divider horo-divider" aria-hidden="true"></div>

      <!-- 4. OFFICIAL REGISTRY CHRONOMETER SUB-DIAL -->
      <div class="psb-col psb-complication-pod horo-subdial skeleton-fade-in" id="compRegistryPod" role="button" tabindex="0" title="${sinceLabel}: ${sinceVal}">
        <div class="horo-bezel-rim">
          <div class="horo-dial-face horo-face-registry">
            <div class="horo-azure-rings" aria-hidden="true"></div>
            <svg viewBox="0 0 44 44" class="horo-subdial-svg" aria-hidden="true">
              <circle cx="22" cy="22" r="20" stroke="rgba(212,175,106,0.28)" stroke-width="0.75" fill="none" />
              <circle cx="22" cy="22" r="16.5" stroke="rgba(212,175,106,0.18)" stroke-dasharray="1 5.2" stroke-width="1.3" fill="none" />
              <!-- Cardinal Hour Batons -->
              <line x1="22" y1="3.5" x2="22" y2="7.5" stroke="#f4d38c" stroke-width="1.1"/>
              <line x1="40.5" y1="22" x2="36.5" y2="22" stroke="#f4d38c" stroke-width="1.1"/>
              <line x1="22" y1="40.5" x2="22" y2="36.5" stroke="#f4d38c" stroke-width="1.1"/>
              <line x1="3.5" y1="22" x2="7.5" y2="22" stroke="#f4d38c" stroke-width="1.1"/>
            </svg>
            <div class="horo-needle-pivot horo-needle-sweeping">
              <div class="horo-needle horo-needle-blued"></div>
            </div>
            <div class="horo-ruby-cap" aria-hidden="true"><div class="horo-ruby-core"></div></div>
          </div>
        </div>
        <div class="psb-value horo-dial-val">${sinceVal}</div>
        <div class="psb-label horo-dial-lbl">${sinceLabel}</div>
      </div>
    </div>
  `;

  attachComplicationHandlers();
}

function attachComplicationHandlers() {
  const playTactileFeedback = () => {
    if (window.AudioEngine && typeof window.AudioEngine.playClick === "function") {
      window.AudioEngine.playClick();
    }
    if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
      window.HapticEngine.tap(12);
    }
  };

  const playClockworkHover = () => {
    if (window.AudioEngine && typeof window.AudioEngine.playHover === "function") {
      window.AudioEngine.playHover();
    }
  };

  const pods = [
    { id: "compTierPod", action: () => {
      const hero = document.getElementById("profileHeroPlaque") || document.querySelector(".profile-hero-card");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth", block: "center" });
        hero.classList.add("is-highlighted-sheen");
        setTimeout(() => hero.classList.remove("is-highlighted-sheen"), 1200);
      }
    }},
    { id: "compVaultPod", action: () => {
      const sec = document.getElementById("profileCollectionSection") || document.querySelector(".profile-collection-section");
      if (sec) {
        sec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }},
    { id: "compHonorsPod", action: () => {
      const sec = document.getElementById("profileHonorsSection") || document.querySelector(".profile-achievements-section");
      if (sec) {
        sec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }},
    { id: "compRegistryPod", action: () => {
      const sec = document.getElementById("profileHistorySection") || document.querySelector(".profile-history-section");
      if (sec) {
        sec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }}
  ];

  pods.forEach(({ id, action }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("mouseenter", playClockworkHover);

    const trigger = (e) => {
      e.preventDefault();
      playTactileFeedback();
      action();
    };

    el.addEventListener("click", trigger);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        trigger(e);
      }
    });
  });
}

// -------------------------------------------------------------
// 2.5 SOVEREIGN CIRCLES & DOMAINS (الدوائر والمجالات السيادية)
// -------------------------------------------------------------
window.modalSelectedCircles = null;

function renderProfileCircles() {
  const container = document.getElementById("profileCirclesGrid");
  if (!container) return;

  const isAr = window.currentLang === "ar" || document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";
  
  if (!Array.isArray(AppState.user.circles) || AppState.user.circles.length === 0) {
    AppState.user.circles = ["pe_venture", "haute_horlogerie", "sovereign_ai", "aviation_yachts"];
  }

  const activeIds = AppState.user.circles;
  const items = activeIds
    .map(id => SOVEREIGN_CIRCLES_CATALOG.find(c => c.id === id))
    .filter(Boolean);

  let html = "";
  items.forEach(item => {
    const localizedName = (window.t && window.t(item.nameKey)) || (isAr ? item.arName : item.enName);
    const statusText = isAr ? "معتمد" : "ACCREDITED";
    html += `
      <div class="pcc-chip" data-circle-id="${item.id}" role="button" tabindex="0" title="${localizedName}">
        <div style="display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1 1 auto;">
          <div class="pcc-chip-icon-box" aria-hidden="true">
            ${item.icon}
          </div>
          <div class="pcc-chip-text-group">
            <span class="pcc-chip-name">${localizedName}</span>
            <span class="pcc-chip-domain">${item.badge}</span>
          </div>
        </div>
        <div class="pcc-chip-seal-dot" aria-hidden="true">
          <span>${statusText}</span>
          <span style="color: #d4af37; font-size: 8.5px;">✦</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  const openCirclesEditor = () => {
    if (window.AudioEngine && typeof window.AudioEngine.playClick === "function") {
      window.AudioEngine.playClick();
    }
    if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
      window.HapticEngine.tap(12);
    }
    const menuAcc = document.getElementById("menuAccountInfo");
    if (menuAcc) {
      menuAcc.click();
      setTimeout(() => {
        const panel = document.getElementById("modalCirclesPanel");
        if (panel) {
          panel.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    } else {
      const accModal = document.getElementById("accountInfoModal");
      if (accModal) accModal.classList.add("is-open");
    }
  };

  const curateBtn = document.getElementById("btnCurateCircles");
  if (curateBtn) {
    curateBtn.onclick = (e) => {
      e.preventDefault();
      openCirclesEditor();
    };
  }

  container.querySelectorAll(".pcc-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      openCirclesEditor();
    });
    chip.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCirclesEditor();
      }
    });
  });
}

function renderModalCirclesSelector(currentSelected) {
  const grid = document.getElementById("modalCirclesSelectorGrid");
  const countBadge = document.getElementById("modalCirclesCountBadge");
  if (!grid) return;

  const isAr = window.currentLang === "ar" || document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";
  window.modalSelectedCircles = Array.isArray(currentSelected) && currentSelected.length > 0
    ? [...currentSelected]
    : ["pe_venture", "haute_horlogerie", "sovereign_ai", "aviation_yachts"];

  const updateGridUI = () => {
    if (countBadge) {
      countBadge.textContent = `${window.modalSelectedCircles.length} / 5`;
    }

    grid.innerHTML = SOVEREIGN_CIRCLES_CATALOG.map(item => {
      const isSelected = window.modalSelectedCircles.includes(item.id);
      const localizedName = (window.t && window.t(item.nameKey)) || (isAr ? item.arName : item.enName);
      return `
        <div class="modal-circle-item ${isSelected ? "is-selected" : ""}" data-id="${item.id}" role="checkbox" aria-checked="${isSelected}">
          <div style="display: flex; align-items: center; gap: 9px; min-width: 0; flex: 1 1 auto;">
            <div class="mci-icon-box" aria-hidden="true">${item.icon}</div>
            <div style="display: flex; flex-direction: column; min-width: 0; gap: 2px; text-align: start;">
              <span class="mci-name">${localizedName}</span>
              <span style="font-size: 7.5px; color: rgba(212, 175, 106, 0.7); letter-spacing: 0.08em; text-transform: uppercase;">${item.badge}</span>
            </div>
          </div>
          <span class="mci-check">✓</span>
        </div>
      `;
    }).join("");

    grid.querySelectorAll(".modal-circle-item").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.dataset.id;
        const idx = window.modalSelectedCircles.indexOf(id);

        if (idx > -1) {
          if (window.modalSelectedCircles.length <= 1) {
            if (typeof showNavToast === "function") {
              showNavToast(isAr ? "يجب الإبقاء على مجال سيادي واحد على الأقل" : "Please keep at least one circle");
            }
            return;
          }
          window.modalSelectedCircles.splice(idx, 1);
        } else {
          if (window.modalSelectedCircles.length >= 5) {
            if (typeof showNavToast === "function") {
              showNavToast(isAr ? "الحد الأقصى هو ٥ مجالات سيادية معتمدة" : "Maximum 5 accredited circles allowed");
            }
            return;
          }
          window.modalSelectedCircles.push(id);
        }

        if (window.AudioEngine && typeof window.AudioEngine.playClick === "function") {
          window.AudioEngine.playClick();
        }
        if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
          window.HapticEngine.tap(10);
        }

        updateGridUI();
      });
    });
  };

  updateGridUI();
}

function renderProfileMembershipDeed() {
  const nameEl = document.getElementById("profileLedgerMemberName");
  if (nameEl) {
    const isStealth = localStorage.getItem("club_stealth_mode") === "true";
    const stealthMoniker = (window.t && window.t("profile.stealthMoniker")) || "SOVEREIGN SHADOW • 001";
    nameEl.textContent = isStealth ? stealthMoniker : (AppState.user?.name || "MEMBER NAME");
  }

  const regNoEl = document.getElementById("profileLedgerRegistryNo");
  if (regNoEl) {
    const rawId = AppState.user?.id ? String(AppState.user.id).replace("SV-", "") : "0001";
    regNoEl.textContent = `REG-${rawId.padStart(4, "0")}-2024`;
  }

  const tierEl = document.getElementById("profileLedgerTier");
  if (tierEl) {
    const isElite = AppState.user?.tier === "Elite" || AppState.user?.tier === "نخبة";
    tierEl.textContent = isElite ? window.t("profile.compTierElite") : window.t("profile.compTierSovereign");
  }

  const dateEl = document.getElementById("profileInductionDateDisplay");
  if (dateEl) {
    dateEl.textContent = window.t("profile.inductionDateValue");
  }

  attachDeedInteractiveHandlers();
}

function attachDeedInteractiveHandlers() {
  const verifyBtn = document.getElementById("btnVerifyDeed");
  const waxSeal = document.getElementById("deedInteractiveWaxSeal");
  const deedCard = document.getElementById("sovereignDeedCard");
  const ghostWatermark = document.getElementById("deedGhostWatermark");

  const triggerVerification = () => {
    if (window.AudioEngine && typeof window.AudioEngine.playHeavyBrassStamp === "function") {
      window.AudioEngine.playHeavyBrassStamp();
    } else if (window.AudioEngine && typeof window.AudioEngine.playClick === "function") {
      window.AudioEngine.playClick();
    }

    // Trigger UV forensic sweep chime as ultraviolet beam traverses the parchment
    setTimeout(() => {
      if (window.AudioEngine && typeof window.AudioEngine.playUvForensicChime === "function") {
        window.AudioEngine.playUvForensicChime();
      }
    }, 180);

    if (window.HapticEngine && typeof window.HapticEngine.vibrate === "function") {
      window.HapticEngine.vibrate([26, 35, 52]);
    } else if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
      window.HapticEngine.tap(35);
    }

    if (deedCard) {
      deedCard.classList.remove("is-deed-verified-flash");
      deedCard.classList.remove("is-uv-scanning");
      void deedCard.offsetWidth; // trigger reflow
      deedCard.classList.add("is-deed-verified-flash");
      deedCard.classList.add("is-uv-scanning");
      setTimeout(() => {
        deedCard.classList.remove("is-uv-scanning");
      }, 1750);
    }

    if (waxSeal) {
      waxSeal.classList.add("is-wax-pressed");
      setTimeout(() => waxSeal.classList.remove("is-wax-pressed"), 650);
    }

    const title = window.t("profile.authenticatedSeal") || "AUTHENTICATED ARCHIVE";
    const toastMsg = window.t("profile.deedVerifiedToast") || "Sovereign Deed verified against immutable Club Ledger.";
    if (typeof showPremiumToast === "function") {
      showPremiumToast(title, toastMsg);
    } else if (typeof showCopyToast === "function") {
      showCopyToast(toastMsg);
    }
  };

  if (verifyBtn && !verifyBtn.dataset.bound) {
    verifyBtn.dataset.bound = "true";
    verifyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      triggerVerification();
    });
  }

  if (waxSeal && !waxSeal.dataset.bound) {
    waxSeal.dataset.bound = "true";
    waxSeal.addEventListener("click", (e) => {
      e.stopPropagation();
      triggerVerification();
    });
  }

  if (ghostWatermark && !ghostWatermark.dataset.bound) {
    ghostWatermark.dataset.bound = "true";
    ghostWatermark.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.AudioEngine && typeof window.AudioEngine.playUvForensicChime === "function") {
        window.AudioEngine.playUvForensicChime();
      } else if (window.AudioEngine && typeof window.AudioEngine.playFineScrewTick === "function") {
        window.AudioEngine.playFineScrewTick();
      }
      if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
        window.HapticEngine.tap(24);
      }
      ghostWatermark.classList.remove("deed-watermark-glint");
      void ghostWatermark.offsetWidth;
      ghostWatermark.classList.add("deed-watermark-glint");
      setTimeout(() => ghostWatermark.classList.remove("deed-watermark-glint"), 650);
    });
  }

  const embossedSeal = deedCard ? deedCard.querySelector(".deed-embossed-seal") : null;
  if (embossedSeal && !embossedSeal.dataset.bound) {
    embossedSeal.dataset.bound = "true";
    embossedSeal.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.AudioEngine && typeof window.AudioEngine.playGoldSheenChime === "function") {
        window.AudioEngine.playGoldSheenChime();
      } else if (window.AudioEngine && typeof window.AudioEngine.playHeavyBrassStamp === "function") {
        window.AudioEngine.playHeavyBrassStamp();
      }
      if (window.HapticEngine && typeof window.HapticEngine.vibrate === "function") {
        window.HapticEngine.vibrate([18, 30]);
      } else if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
        window.HapticEngine.tap(25);
      }
      embossedSeal.classList.remove("is-seal-active-spin");
      void embossedSeal.offsetWidth;
      embossedSeal.classList.add("is-seal-active-spin");
      setTimeout(() => embossedSeal.classList.remove("is-seal-active-spin"), 600);
    });
  }

  const cryptoHashStrip = deedCard ? deedCard.querySelector(".deed-crypto-hash-strip") : null;
  if (cryptoHashStrip && !cryptoHashStrip.dataset.bound) {
    cryptoHashStrip.dataset.bound = "true";
    cryptoHashStrip.style.cursor = "pointer";
    cryptoHashStrip.addEventListener("click", (e) => {
      e.stopPropagation();
      triggerVerification();
    });
  }

  attachHorologicalScrewHandlers();
}

function attachHorologicalScrewHandlers() {
  const screws = document.querySelectorAll(
    ".deed-screw, .oath-screw, .vitrine-screw, .rmc-screw, .phc-screw, .phc-corner-rivet"
  );
  screws.forEach((screw) => {
    if (screw.dataset.screwBound) return;
    screw.dataset.screwBound = "true";

    screw.addEventListener("pointerenter", () => {
      if (window.AudioEngine && typeof window.AudioEngine.playFineScrewTick === "function") {
        window.AudioEngine.playFineScrewTick();
      }
    });

    screw.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.AudioEngine && typeof window.AudioEngine.playFineScrewTick === "function") {
        window.AudioEngine.playFineScrewTick();
      }
      if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
        window.HapticEngine.tap(16);
      }
      screw.classList.remove("is-screw-torqued");
      void screw.offsetWidth;
      screw.classList.add("is-screw-torqued");
      setTimeout(() => screw.classList.remove("is-screw-torqued"), 400);
    });
  });

  const crownCoin = document.getElementById("profileCrownCoin");
  if (crownCoin && !crownCoin.dataset.bound) {
    crownCoin.dataset.bound = "true";
    crownCoin.addEventListener("pointerenter", () => {
      if (window.AudioEngine && typeof window.AudioEngine.playHover === "function") {
        window.AudioEngine.playHover();
      }
    });
    crownCoin.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.AudioEngine && typeof window.AudioEngine.playGoldSheenChime === "function") {
        window.AudioEngine.playGoldSheenChime();
      } else if (window.AudioEngine && typeof window.AudioEngine.playFineScrewTick === "function") {
        window.AudioEngine.playFineScrewTick();
      }
      if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
        window.HapticEngine.tap(20);
      }
      crownCoin.classList.remove("is-coin-mint-active");
      void crownCoin.offsetWidth;
      crownCoin.classList.add("is-coin-mint-active");
      setTimeout(() => crownCoin.classList.remove("is-coin-mint-active"), 500);
    });
  }
}

function renderProfileSovereignOath() {
  const sigEl = document.getElementById("oathMemberSignature");
  if (sigEl) {
    const isStealth = localStorage.getItem("club_stealth_mode") === "true";
    const stealthMoniker = (window.t && window.t("profile.stealthMoniker")) || "SOVEREIGN SHADOW • 001";
    const rawName = isStealth ? stealthMoniker : (AppState.user?.name || "MEMBER");
    const isElite = AppState.user?.tier === "Elite" || AppState.user?.tier === "نخبة";
    const tierName = isElite ? (window.t("profile.compTierElite") || "Elite") : (window.t("profile.compTierSovereign") || "Sovereign");
    sigEl.textContent = `${rawName} • ${tierName}`;
  }

  const cryptEl = document.getElementById("oathCryptographicCode");
  if (cryptEl) {
    const rawId = AppState.user?.id ? String(AppState.user.id).replace("SV-", "") : "0001";
    cryptEl.textContent = `HASH: 8F${rawId.padStart(2, "0")} • IMMUTABLE COVENANT • ARCHIVED`;
  }

  attachOathInteractiveHandlers();
}

function attachOathInteractiveHandlers() {
  const signetBtn = document.getElementById("oathInteractiveSignetBtn");
  const oathCard = document.getElementById("sovereignOathCard");

  if (signetBtn && !signetBtn.dataset.bound) {
    signetBtn.dataset.bound = "true";
    signetBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (window.AudioEngine && typeof window.AudioEngine.playHeavyBrassStamp === "function") {
        window.AudioEngine.playHeavyBrassStamp();
      } else if (window.AudioEngine && typeof window.AudioEngine.playClick === "function") {
        window.AudioEngine.playClick();
      }
      if (window.HapticEngine && typeof window.HapticEngine.vibrate === "function") {
        window.HapticEngine.vibrate([26, 35, 52]);
      } else if (window.HapticEngine && typeof window.HapticEngine.tap === "function") {
        window.HapticEngine.tap(35);
      }

      if (oathCard) {
        oathCard.classList.remove("is-oath-ratified-flash");
        void oathCard.offsetWidth; // trigger reflow
        oathCard.classList.add("is-oath-ratified-flash");
      }

      signetBtn.classList.add("is-signet-pressed");
      setTimeout(() => signetBtn.classList.remove("is-signet-pressed"), 600);

      const title = (window.t && window.t("profile.oathSectionTitle")) || "SOVEREIGN DECREE";
      const toastMsg = (window.t && window.t("profile.oathReaffirmedToast")) || "The Sovereign Oath of Discretion has been solemnly reaffirmed in the Club Archives.";

      if (typeof showPremiumToast === "function") {
        showPremiumToast(title, toastMsg);
      } else if (typeof showCopyToast === "function") {
        showCopyToast(toastMsg);
      }
    });
  }

  attachHorologicalScrewHandlers();
}

/* === 5. PRESTIGE, HONORS & METRICS - SOVEREIGN LEADERBOARD === */
window.leaderboardActiveFilter = window.leaderboardActiveFilter || "all";

function setLeaderboardFilter(filter) {
  window.leaderboardActiveFilter = filter;
  if (window.AudioEngine && window.AudioEngine.playClick) window.AudioEngine.playClick();
  if (window.HapticEngine && window.HapticEngine.tap) window.HapticEngine.tap(12);
  renderLeaderboard();
}
window.setLeaderboardFilter = setLeaderboardFilter;

function renderLeaderboard() {
  const container =
    document.getElementById("clubLeaderboardContainer") ||
    document.getElementById("leaderboardList");
  if (!container) return;

  const isAr =
    AppState.language === "ar" || document.documentElement.lang === "ar";

  // 10 UNIQUE, DIVERSE, PRESTIGIOUS SOVEREIGN TITANS
  const mockTopMembers = [
    {
      rank: 1,
      id: "SV-0001",
      name: "A. Al Maktoum",
      nameAr: "أ. آل مكتوم",
      wealth: "99.9%",
      priv: "99.8%",
      tier: "Sovereign",
      city: "دبي • الإمارات",
      cityEn: "Dubai • UAE",
      quote: "السيادة ليست مجرد مكانة، بل هي معيار الوجود والريادة التاريخية.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=260&auto=format&fit=crop",
      isOnline: true,
    },
    {
      rank: 2,
      id: "SV-0822",
      name: "E. Rothschild",
      nameAr: "إ. روتشيلد",
      wealth: "99.7%",
      priv: "99.5%",
      tier: "Sovereign",
      city: "جنيف • سويسرا",
      cityEn: "Geneva • Switzerland",
      quote: "الذهب الحقيقي هو الثقة والسرية المتوارثة عبر الأجيال.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=260&auto=format&fit=crop",
      isOnline: true,
    },
    {
      rank: 3,
      id: "SV-1105",
      name: "M. Windsor",
      nameAr: "م. ويندسور",
      wealth: "99.5%",
      priv: "99.2%",
      tier: "Elite",
      city: "لندن • المملكة المتحدة",
      cityEn: "London • UK",
      quote: "التقاليد العريقة هي الحصن المنيع للمكانة والجاه الرفيع.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=260&auto=format&fit=crop",
      isOnline: true,
    },
    {
      rank: 4,
      id: "SV-0344",
      name: "J. Rockefeller",
      nameAr: "ج. روكفلر",
      wealth: "99.2%",
      priv: "98.9%",
      tier: "Elite",
      city: "نيويورك • الولايات المتحدة",
      cityEn: "New York • USA",
      quote: "القوة تكمن في البصيرة الهادئة وراء كل قرار استراتيجي.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=260&auto=format&fit=crop",
      isOnline: false,
    },
    {
      rank: 5,
      id: "SV-2211",
      name: "K. Arnault",
      nameAr: "ك. أرنو",
      wealth: "98.9%",
      priv: "98.6%",
      tier: "Elite",
      city: "باريس • فرنسا",
      cityEn: "Paris • France",
      quote: "الفخامة المطلقة هي الجمع بين الفن والخلود المادي.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=260&auto=format&fit=crop",
      isOnline: true,
    },
    {
      rank: 6,
      id: "SV-3091",
      name: "L. Bettencourt",
      nameAr: "ل. بيتنكور",
      wealth: "98.5%",
      priv: "98.2%",
      tier: "Member",
      city: "باريس • فرنسا",
      cityEn: "Paris • France",
      quote: "الجمال والرفعة إرث يتجاوز حدود الزمن والحدود.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=260&auto=format&fit=crop",
      isOnline: false,
    },
    {
      rank: 7,
      id: "SV-4402",
      name: "F. Pinault",
      nameAr: "ف. بينو",
      wealth: "98.1%",
      priv: "97.9%",
      tier: "Member",
      city: "موناكو • فرنسا",
      cityEn: "Monaco • France",
      quote: "اقتناء النوادر هو الشغف الذي يميز النخبة الحقيقية.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=260&auto=format&fit=crop",
      isOnline: false,
    },
    {
      rank: 8,
      id: "SV-5510",
      name: "D. Wertheimer",
      nameAr: "د. ويرثايمر",
      wealth: "97.8%",
      priv: "97.5%",
      tier: "Member",
      city: "زيورخ • سويسرا",
      cityEn: "Zurich • Switzerland",
      quote: "الوقت أغلى من أي مقتنى، والكمال في كل تفصيلة متناهية.",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=260&auto=format&fit=crop",
      isOnline: true,
    },
    {
      rank: 9,
      id: "SV-6623",
      name: "G. Armani",
      nameAr: "ج. أرماني",
      wealth: "97.5%",
      priv: "97.2%",
      tier: "Member",
      city: "ميلانو • إيطاليا",
      cityEn: "Milan • Italy",
      quote: "الأناقة ليست لفت الأنظار، بل البقاء في الذاكرة الحية.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=260&auto=format&fit=crop",
      isOnline: false,
    },
    {
      rank: 10,
      id: "SV-7734",
      name: "S. Ortega",
      nameAr: "س. أورتيغا",
      wealth: "97.0%",
      priv: "96.8%",
      tier: "Member",
      city: "مدريد • إسبانيا",
      cityEn: "Madrid • Spain",
      quote: "الامبراطوريات تُبنى بالصمت والعمل والإنجاز المتواصل.",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=260&auto=format&fit=crop",
      isOnline: false,
    },
  ];

  const currentFilter = window.leaderboardActiveFilter || "all";

  // Filter members according to active tab
  let filteredMembers = mockTopMembers;
  if (currentFilter === "sovereign") {
    filteredMembers = mockTopMembers.filter((m) => m.tier === "Sovereign");
  } else if (currentFilter === "elite") {
    filteredMembers = mockTopMembers.filter((m) => m.tier === "Elite");
  }

  // Top 3 (Podium) and remaining (Ledger)
  const podiumMembers = mockTopMembers.slice(0, 3);
  const ledgerMembers = currentFilter === "all" ? mockTopMembers.slice(3) : filteredMembers;

  let html = `
    <!-- SOVEREIGN HONOR BOARD METALLIC HEADER -->
    <div class="sl-honor-board-header">
      <div class="sl-honor-rivets-row">
        <span class="sl-plaque-rivet" title="Sovereign Seal Rivet"></span>
        <div class="sl-honor-crest-title">
          <span class="sl-crest-fleur">⚜️</span>
          <span class="sl-crest-text">${isAr ? "لوحة الشرف السيادية للمجلس" : "SOVEREIGN ROLL OF HONOR"}</span>
          <span class="sl-crest-fleur">⚜️</span>
        </div>
        <span class="sl-plaque-rivet" title="Sovereign Seal Rivet"></span>
      </div>
      <div class="sl-honor-motto">${isAr ? "مجلس النخبة • السجل المعتمد لأصحاب الأصول السيادية" : "ACCREDITED TITANS OF SOVEREIGN WEALTH & EMINENCE"}</div>
    </div>

    <!-- AUDIT PLAQUE -->
    <div class="sl-audit-plaque">
      <div class="sl-audit-info">
        <div class="sl-audit-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke-linecap="round" stroke-linejoin="round" fill="rgba(212,175,55,0.2)"/>
          </svg>
          <span>${isAr ? "السجل السيادي العام للأعضاء" : "SOVEREIGN BENCHMARK LEDGER"}</span>
        </div>
        <div class="sl-audit-sub">
          ${isAr ? "تصنيف النخبة العالمية لأصحاب الثروة والأصول السيادية المعتمدة" : "Global ranking of accredited sovereign wealth holdings"}
        </div>
      </div>
      <div class="sl-audit-badge">
        <span class="sl-audit-dot"></span>
        <span>${isAr ? "تدقيق محكم" : "AUDITED"}</span>
      </div>
    </div>

    <!-- FILTER BAR -->
    <div class="sl-filter-bar">
      <button class="sl-filter-btn ${currentFilter === 'all' ? 'is-active' : ''}" onclick="window.setLeaderboardFilter('all')">
        <span>${isAr ? "الترتيب العام (10)" : "All Titans (10)"}</span>
      </button>
      <button class="sl-filter-btn ${currentFilter === 'sovereign' ? 'is-active' : ''}" onclick="window.setLeaderboardFilter('sovereign')">
        <span>${isAr ? "فئة السيادة" : "Sovereign Tier"}</span>
      </button>
      <button class="sl-filter-btn ${currentFilter === 'elite' ? 'is-active' : ''}" onclick="window.setLeaderboardFilter('elite')">
        <span>${isAr ? "فئة النخبة" : "Elite Tier"}</span>
      </button>
    </div>
  `;

  // RENDER PODIUM (Only in 'all' view or if sovereign tier is selected)
  if (currentFilter === "all" || currentFilter === "sovereign") {
    const rank1 = podiumMembers[0];
    const rank2 = podiumMembers[1];
    const rank3 = podiumMembers[2];

    const p1Payload = JSON.stringify({
      id: rank1.id,
      rank: 1,
      name: isAr ? rank1.nameAr : rank1.name,
      nameAr: rank1.nameAr,
      nameEn: rank1.name,
      tier: rank1.tier,
      wealth: rank1.wealth,
      priv: rank1.priv,
      city: isAr ? rank1.city : rank1.cityEn,
      cityEn: rank1.cityEn,
      quote: rank1.quote,
      avatar: rank1.avatar,
      isOnline: rank1.isOnline,
    }).replace(/"/g, "&quot;");

    const p2Payload = JSON.stringify({
      id: rank2.id,
      rank: 2,
      name: isAr ? rank2.nameAr : rank2.name,
      nameAr: rank2.nameAr,
      nameEn: rank2.name,
      tier: rank2.tier,
      wealth: rank2.wealth,
      priv: rank2.priv,
      city: isAr ? rank2.city : rank2.cityEn,
      cityEn: rank2.cityEn,
      quote: rank2.quote,
      avatar: rank2.avatar,
      isOnline: rank2.isOnline,
    }).replace(/"/g, "&quot;");

    const p3Payload = JSON.stringify({
      id: rank3.id,
      rank: 3,
      name: isAr ? rank3.nameAr : rank3.name,
      nameAr: rank3.nameAr,
      nameEn: rank3.name,
      tier: rank3.tier,
      wealth: rank3.wealth,
      priv: rank3.priv,
      city: isAr ? rank3.city : rank3.cityEn,
      cityEn: rank3.cityEn,
      quote: rank3.quote,
      avatar: rank3.avatar,
      isOnline: rank3.isOnline,
    }).replace(/"/g, "&quot;");

    html += `
      <!-- SOVEREIGN TRIUMVIRATE PODIUM -->
      <div class="sl-podium">
        <!-- RANK 2 (SILVER / PLATINUM) -->
        <div class="sl-podium-col rank-2" onclick="openMemberProfile(${p2Payload})" title="${isAr ? rank2.nameAr : rank2.name}">
          <div class="sl-podium-avatar-wrap">
            <img src="${rank2.avatar}" alt="${rank2.name}" class="sl-podium-avatar" />
            <span class="sl-podium-rank-tag"><bdi>2</bdi></span>
          </div>
          <div class="sl-podium-name">${isAr ? rank2.nameAr : rank2.name}</div>
          <div class="sl-podium-city">${isAr ? rank2.city : rank2.cityEn}</div>
          <div class="sl-podium-score">
            <bdi class="sl-podium-score-num">${rank2.wealth}</bdi>
          </div>
          <div class="sl-pedestal-base">
            <span class="sl-pedestal-roman">II</span>
          </div>
        </div>

        <!-- RANK 1 (SOVEREIGN CHAMPION - GOLD) -->
        <div class="sl-podium-col rank-1" onclick="openMemberProfile(${p1Payload})" title="${isAr ? rank1.nameAr : rank1.name}">
          <div class="sl-podium-avatar-wrap">
            <div class="sl-crown-floating">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M4 18h16M5 15l2-8 5 5 5-5 2 8H5z" stroke="#f5df8b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="rgba(212, 175, 55, 0.35)"/>
              </svg>
            </div>
            <img src="${rank1.avatar}" alt="${rank1.name}" class="sl-podium-avatar" />
            <span class="sl-podium-rank-tag"><bdi>1</bdi></span>
          </div>
          <div class="sl-podium-name">${isAr ? rank1.nameAr : rank1.name}</div>
          <div class="sl-podium-city">${isAr ? rank1.city : rank1.cityEn}</div>
          <div class="sl-podium-score">
            <bdi class="sl-podium-score-num">${rank1.wealth}</bdi>
            <span class="sl-score-symbol">⚜️</span>
          </div>
          <div class="sl-pedestal-base">
            <span class="sl-pedestal-roman">I</span>
          </div>
        </div>

        <!-- RANK 3 (ANTIQUE BRONZE) -->
        <div class="sl-podium-col rank-3" onclick="openMemberProfile(${p3Payload})" title="${isAr ? rank3.nameAr : rank3.name}">
          <div class="sl-podium-avatar-wrap">
            <img src="${rank3.avatar}" alt="${rank3.name}" class="sl-podium-avatar" />
            <span class="sl-podium-rank-tag"><bdi>3</bdi></span>
          </div>
          <div class="sl-podium-name">${isAr ? rank3.nameAr : rank3.name}</div>
          <div class="sl-podium-city">${isAr ? rank3.city : rank3.cityEn}</div>
          <div class="sl-podium-score">
            <bdi class="sl-podium-score-num">${rank3.wealth}</bdi>
          </div>
          <div class="sl-pedestal-base">
            <span class="sl-pedestal-roman">III</span>
          </div>
        </div>
      </div>
    `;
  }

  // RENDER SOVEREIGN LEDGER SECTION
  html += `
    <div class="sl-ledger-header">
      <div class="sl-ledger-title">
        ${isAr ? "سجل مراتب النخبة" : "SOVEREIGN LEDGER"}
      </div>
      <div class="sl-ledger-count">
        ${isAr ? `${ledgerMembers.length} أعضاء مصنفين` : `${ledgerMembers.length} Ranked Members`}
      </div>
    </div>
    <div class="sl-ledger-list">
  `;

  ledgerMembers.forEach((member) => {
    const memberName = isAr ? member.nameAr : member.name;
    const memberCity = isAr ? member.city : member.cityEn;
    const tierClass = `tier-${member.tier.toLowerCase()}`;
    let tierText = member.tier;
    if (isAr) {
      if (member.tier === "Sovereign") tierText = "سيادة";
      else if (member.tier === "Elite") tierText = "نخبة";
      else tierText = "معتمد";
    }

    const payload = JSON.stringify({
      id: member.id,
      rank: member.rank,
      name: memberName,
      nameAr: member.nameAr,
      nameEn: member.name,
      tier: member.tier,
      wealth: member.wealth,
      priv: member.priv,
      city: memberCity,
      cityEn: member.cityEn,
      quote: member.quote,
      avatar: member.avatar,
      isOnline: member.isOnline,
    }).replace(/"/g, "&quot;");

    html += `
      <div class="sl-ledger-card ${tierClass}" onclick="openMemberProfile(${payload})" title="${memberName}">
        <div class="sl-card-rank">
          <bdi>#${member.rank}</bdi>
        </div>
        <div class="sl-card-avatar-wrap">
          <img src="${member.avatar}" alt="${memberName}" class="sl-card-avatar" onerror="this.style.display='none'; if (this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
          <span class="avatar-fallback" style="display:none;">${memberName.charAt(0)}</span>
          ${member.isOnline ? '<span class="sl-card-status-jewel" title="Active"></span>' : ""}
        </div>
        <div class="sl-card-info">
          <div class="sl-card-name-row">
            <span class="sl-card-name">${memberName}</span>
            <span class="sl-tier-pill ${tierClass}">${tierText}</span>
          </div>
          <div class="sl-card-meta">
            <bdi class="sl-card-id">${member.id}</bdi>
            <span class="sl-meta-sep">•</span>
            <span class="sl-card-city" title="${memberCity}">${memberCity}</span>
          </div>
        </div>
        <div class="sl-card-wealth">
          <bdi class="sl-wealth-number">${member.wealth}</bdi>
          <span class="sl-wealth-label">${isAr ? "تخصيص" : "ALLOCATION"}</span>
        </div>
        <div class="sl-card-chevron">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <path d="${isAr ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    `;
  });

  html += `
    </div>

    <!-- PERSONAL SOVEREIGN STANDING CARD -->
    <div class="sl-self-card" onclick="goToPage('profile')" title="${isAr ? 'الانتقال إلى ملفك التعريفي' : 'Open your profile dossier'}">
      <div class="sl-self-info">
        <div class="sl-self-rank-row">
          <span class="sl-self-star">✦</span>
          <span class="sl-self-title">${isAr ? "ترتيبك في المجلس: المرتبة <bdi>#11</bdi>" : "Council Standing: Rank <bdi>#11</bdi>"}</span>
        </div>
        <div class="sl-self-desc">
          ${isAr ? "أنت تتقدم على <bdi>99.8%</bdi> من نخبة العالم • استمر في المداولات" : "Surpassing 99.8% of global elite • Maintain sovereign status"}
        </div>
      </div>
      <div class="sl-self-cta">
        <span>${isAr ? "عرض ملفك" : "View Dossier"}</span>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
          <path d="${isAr ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/* ==========================================================================
   PARALLAX CONTROLLER (LUXURY DEPTH)
   ========================================================================== */
class ParallaxController {
  constructor() {
    this.ticking = false;
  }

  init() {
    // Parallax disabled to guarantee locked 120 FPS buttery-smooth native scrolling with zero layout thrashing
  }

  updateParallax() {
    // Zero-overhead no-op for stutter-free scrolling stability
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.parallaxController = new ParallaxController();
});

/* ==========================================================================
   HAPTIC 3D PREVIEW MANAGER
   ========================================================================== */
class HapticPreviewManager {
  constructor() {
    this.isActive = false;
    this.imgSrc = null;
    this.animationFrame = null;
    this.tiltX = 0;
    this.tiltY = 0;
    this.targetTiltX = 0;
    this.targetTiltY = 0;
    this.startX = 0;
    this.startY = 0;
    this.initDOM();
    this.bindEvents();
  }

  initDOM() {
    if (document.getElementById('haptic3DOverlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'haptic3DOverlay';
    overlay.className = 'haptic-3d-overlay';
    overlay.innerHTML = `
      <div class="haptic-3d-canvas-container">
        <canvas id="haptic3DCanvas" width="600" height="600"></canvas>
      </div>
      <div class="haptic-3d-info">
        <h3 id="haptic3DName"></h3>
        <p id="haptic3DRarity" class="rarity-badge" style="margin: 0 auto; display: inline-block;"></p>
        <div class="haptic-hint" data-i18n="boutique.hapticHint">حرّك إصبعك للمعاينة • أفلت للإغلاق</div>
      </div>
    `;
    document.body.appendChild(overlay);
    
    this.overlay = overlay;
    this.canvas = document.getElementById('haptic3DCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.nameEl = document.getElementById('haptic3DName');
    this.rarityEl = document.getElementById('haptic3DRarity');
  }

  bindEvents() {
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
  }

  open(item, startEvent) {
    if (this.isActive) return;
    this.isActive = true;
    
    if (navigator.vibrate) navigator.vibrate([15, 40, 15]);
    if (window.AudioEngine) window.AudioEngine.playRustle();

    this.nameEl.textContent = window.t(item.name);
    this.rarityEl.className = `rarity-badge rarity-${item.rarity}`;
    this.rarityEl.textContent = RARITY_LABEL[item.rarity]();

    this.overlay.classList.add('is-active');

    // Extract start coordinates
    const touch = startEvent.touches ? startEvent.touches[0] : startEvent;
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.targetTiltX = 0;
    this.targetTiltY = 0;
    this.tiltX = 0;
    this.tiltY = 0;

    window.addEventListener('touchmove', this.handleMove, { passive: false });
    window.addEventListener('touchend', this.handleEnd);
    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.handleEnd);

    this.prepareCanvas(item);
    this.renderLoop();
  }

  close() {
    if (!this.isActive) return;
    this.isActive = false;
    this.overlay.classList.remove('is-active');
    
    window.removeEventListener('touchmove', this.handleMove);
    window.removeEventListener('touchend', this.handleEnd);
    window.removeEventListener('mousemove', this.handleMove);
    window.removeEventListener('mouseup', this.handleEnd);
    
    cancelAnimationFrame(this.animationFrame);
    if (navigator.vibrate) navigator.vibrate(10);
  }

  handleMove(e) {
    if (!this.isActive) return;
    e.preventDefault(); // Prevent scrolling while previewing
    
    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - this.startX;
    const deltaY = touch.clientY - this.startY;
    
    // Convert drag distance to tilt angles (max 40 degrees)
    this.targetTiltY = Math.max(-40, Math.min(40, deltaX * 0.2));
    this.targetTiltX = Math.max(-40, Math.min(40, -deltaY * 0.2));
  }

  handleEnd() {
    this.close();
  }

  prepareCanvas(item) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cachedImage = new Image();
    
    let svgString = "";
    if (item.image) {
       this.cachedImage.src = item.image;
    } else if (item.icon && (item.icon.startsWith("http") || item.icon.startsWith("data:"))) {
       this.cachedImage.src = item.icon;
    } else {
       svgString = ICONS[item.icon] || ICONS["star"];
       // Convert SVG to data URL to draw on canvas
       const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
       const url = URL.createObjectURL(svgBlob);
       this.cachedImage.src = url;
    }
  }

  renderLoop() {
    if (!this.isActive) return;

    // Smooth interpolation (lerp)
    this.tiltX += (this.targetTiltX - this.tiltX) * 0.1;
    this.tiltY += (this.targetTiltY - this.tiltY) * 0.1;

    // Apply 3D CSS transform to the canvas
    this.canvas.style.transform = `scale(1.1) rotateX(${this.tiltX}deg) rotateY(${this.tiltY}deg)`;

    // Draw frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.cachedImage.complete && this.cachedImage.naturalWidth > 0) {
      const padding = 100;
      const drawSize = this.canvas.width - (padding * 2);
      
      // Draw Base Image
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.drawImage(this.cachedImage, padding, padding, drawSize, drawSize);

      // Create Dynamic Metallic Reflection Mask
      this.ctx.globalCompositeOperation = 'source-atop';
      
      const gradX = this.canvas.width / 2 + (this.tiltY * 5);
      const gradY = this.canvas.height / 2 - (this.tiltX * 5);
      
      const gradient = this.ctx.createRadialGradient(
        gradX, gradY, 0,
        this.canvas.width / 2, this.canvas.height / 2, this.canvas.width
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      gradient.addColorStop(0.3, 'rgba(212, 175, 55, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.animationFrame = requestAnimationFrame(this.renderLoop);
  }
}

window.hapticPreviewMgr = new HapticPreviewManager();

/* ==========================================================================
   SMART SCROLLBAR AUTO-HIDE
   ========================================================================== */
let globalScrollTimeout;
document.addEventListener("scroll", (e) => {
  const el = e.target;
  if (!el || !el.classList) return;
  
  el.classList.add('is-scrolling');
  
  clearTimeout(el._scrollTimeout);
  
  el._scrollTimeout = setTimeout(() => {
    el.classList.remove('is-scrolling');
  }, 800);
}, true); // Use capture phase to catch all scroll events



window.quickPurchasedItems = new Set();
window.handleQuickPurchase = function(event, item, catKey) {
  event.stopPropagation();
  event.preventDefault();
  
  const btn = event.currentTarget;
  if (btn.disabled || btn.dataset.processing === "true") return;
  btn.dataset.processing = "true";
  
  if (ClubState.purchase(item)) {
    window.quickPurchasedItems.add(item.id);
    if (window.HapticEngine) {
      window.HapticEngine.boutiquePurchase();
    } else if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([35, 50, 20]);
    }
    if (window.AudioEngine) window.AudioEngine.playChime();
    
    setTimeout(() => {
      window.quickPurchasedItems.delete(item.id);
      const b = document.querySelector(`.boutique-card[data-item-id="${item.id}"] .boutique-own-btn`);
      if(b) b.innerHTML = window.t("boutique.owned");
      const c = document.querySelector(`.boutique-card[data-item-id="${item.id}"]`);
      if(c) c.classList.remove("qp-shimmer-active");
    }, 1500);
  } else {
    btn.dataset.processing = "";
    btn.classList.add("shake-animation");
    setTimeout(() => btn.classList.remove("shake-animation"), 400);
  }
};

/* ==========================================================================
   CENTRALIZED HEADER SCROLL CONTROLLER
   - Detects actual content scrollability dynamically rather than hardcoded IDs
   - Enforces permanent header visibility on non-scrollable pages
   - Decouples navigation transitions from scrolling
   - Delivers stable, zero-flicker 120Hz smooth scrolling
   ========================================================================== */
window.HeaderScrollController = (function() {
  let isLockedVisible = false;
  let isNavigating = false;
  let activeScrollEl = null;
  let lastScrollTop = 0;
  let ticking = false;
  let lastActionTime = 0;

  function getActivePageEl() {
    return document.querySelector(".page.is-active");
  }

  function isPageScrollable(pageEl) {
    if (!pageEl) return false;
    const scrollHeight = pageEl.scrollHeight || 0;
    const clientHeight = pageEl.clientHeight || 0;
    // Consider scrollable only if actual content overflows significantly (> 35px)
    return (scrollHeight - clientHeight) > 35;
  }

  function updateHeaderHeightVar() {
    const header = document.getElementById("appHeader");
    if (header && !header.classList.contains("header-hidden")) {
      const h = header.offsetHeight;
      if (h > 0) {
        document.documentElement.style.setProperty("--header-actual-height", h + "px");
      }
    }
  }

  function updateStateForCurrentTab() {
    const header = document.getElementById("appHeader");
    if (!header) return;

    const pageEl = getActivePageEl();
    activeScrollEl = pageEl;
    lastScrollTop = Math.max(0, pageEl ? pageEl.scrollTop : 0);

    // If page is not scrollable, header MUST remain permanently visible
    if (!isPageScrollable(pageEl)) {
      isLockedVisible = true;
      if (header.classList.contains("header-hidden")) {
        header.classList.remove("header-hidden");
      }
    } else {
      isLockedVisible = false;
      // If page is currently scrolled near the top, reveal header
      if (lastScrollTop <= 25) {
        if (header.classList.contains("header-hidden")) {
          header.classList.remove("header-hidden");
        }
      }
    }
  }

  function onTabChangeStart() {
    isNavigating = true;
    const header = document.getElementById("appHeader");
    if (header) {
      header.classList.remove("header-hidden");
    }
  }

  function onTabChangeComplete() {
    updateStateForCurrentTab();
    // Guard against synthetic scroll events during DOM transitions
    requestAnimationFrame(() => {
      updateStateForCurrentTab();
      updateHeaderHeightVar();
      setTimeout(() => {
        isNavigating = false;
        updateStateForCurrentTab();
      }, 50);
    });
  }

  function processScroll(pageEl, currentScroll) {
    if (isNavigating || isLockedVisible) return;
    const header = document.getElementById("appHeader");
    if (!header) return;

    if (!isPageScrollable(pageEl)) {
      if (header.classList.contains("header-hidden")) {
        header.classList.remove("header-hidden");
      }
      return;
    }

    const delta = currentScroll - lastScrollTop;
    const now = Date.now();

    // 1. Near the top (scrollTop <= 25): ALWAYS show header
    if (currentScroll <= 25) {
      if (header.classList.contains("header-hidden")) {
        header.classList.remove("header-hidden");
      }
      lastScrollTop = currentScroll;
      return;
    }

    // 2. Prevent rubber-band bounce near bottom
    const maxScroll = pageEl.scrollHeight - pageEl.clientHeight;
    if (maxScroll > 0 && currentScroll >= maxScroll - 15) {
      lastScrollTop = currentScroll;
      return;
    }

    // 3. Scrolling DOWN past 40px: hide header smoothly
    if (delta > 8 && currentScroll > 40) {
      if (!header.classList.contains("header-hidden")) {
        header.classList.add("header-hidden");
        lastActionTime = now;
      }
    }
    // 4. Scrolling UP by more than 8px: reveal header smoothly
    else if (delta < -8 && (now - lastActionTime > 180)) {
      if (header.classList.contains("header-hidden")) {
        header.classList.remove("header-hidden");
        lastActionTime = now;
      }
    }

    lastScrollTop = currentScroll;
  }

  function handleScroll(e) {
    if (isNavigating || isLockedVisible) return;

    const target = e.target;
    const activePage = getActivePageEl();
    if (!activePage) return;

    // Filter: ignore modals, overlays, dropdowns
    if (target.closest && target.closest(".luxury-modal, .purchase-modal, .gold-modal, .custom-confirm-modal, .bottom-sheet, .modal-content, .dossier-modal-body")) {
      return;
    }

    // Verify event comes from active page or its content
    if (target !== activePage && !activePage.contains(target) && target !== document && target !== window) {
      return;
    }

    const currentScroll = Math.max(0, activePage.scrollTop || 0);

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        processScroll(activePage, currentScroll);
        ticking = false;
      });
    }
  }

  return {
    init() {
      document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
      window.addEventListener("resize", () => {
        updateStateForCurrentTab();
        updateHeaderHeightVar();
      }, { passive: true });

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          updateHeaderHeightVar();
          updateStateForCurrentTab();
        });
      } else {
        updateHeaderHeightVar();
        updateStateForCurrentTab();
      }
    },
    onTabChangeStart,
    onTabChangeComplete,
    updateStateForCurrentTab,
    updateHeaderHeightVar,
    forceShow() {
      const header = document.getElementById("appHeader");
      if (header) header.classList.remove("header-hidden");
    }
  };
})();

// Initialize controller & expose legacy aliases
window.HeaderScrollController.init();
window.updateHeaderHeightVar = window.HeaderScrollController.updateHeaderHeightVar;
window.resetHeaderScrollTracking = window.HeaderScrollController.updateStateForCurrentTab;



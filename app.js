
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
let currentLang = (savedLang === "ar" || savedLang === "en") ? savedLang : "en";

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

window.t = function (key, lang = currentLang) {
  const item = getNestedValue(window.I18N, key);
  if (item && item[lang]) return item[lang];
  return key; // fallback
};

window.setLanguage = function (lang) {
  if (lang !== "en" && lang !== "ar") return;
  currentLang = lang;
  localStorage.setItem("one_percent_lang", lang);
  if (typeof AppState !== "undefined") AppState.language = lang;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
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
    if (lang === "en") {
      btnEn.classList.add("is-active");
      btnEn.style.background = "rgba(212,175,55,0.1)";
      btnEn.style.color = "#d4af37";
      btnEn.style.borderColor = "#d4af37";
      btnAr.classList.remove("is-active");
      btnAr.style.background = "transparent";
      btnAr.style.color = "";
      btnAr.style.borderColor = "";
    } else {
      btnAr.classList.add("is-active");
      btnAr.style.background = "rgba(212,175,55,0.1)";
      btnAr.style.color = "#d4af37";
      btnAr.style.borderColor = "#d4af37";
      btnEn.classList.remove("is-active");
      btnEn.style.background = "transparent";
      btnEn.style.color = "";
      btnEn.style.borderColor = "";
    }
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
  if (profileLevel && typeof AppState !== "undefined") {
    const tier = AppState.user.tier;
    let tierTrans = window.t("misc.member");
    if (tier === "Sovereign" || tier === "سيادي")
      tierTrans = window.t("misc.sovereign");
    else if (tier === "Elite" || tier === "نخبة")
      tierTrans = window.t("misc.elite");
    profileLevel.textContent = tierTrans;
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

  // --- Audio & Tactile Setting Toggle ---
  const audioHapticToggle = document.getElementById("audioHapticToggle");
  if (audioHapticToggle) {
    audioHapticToggle.checked = window.AudioEngine ? window.AudioEngine.isEnabled() : true;
    audioHapticToggle.addEventListener("change", (e) => {
      if (window.AudioEngine) {
        window.AudioEngine.setEnabled(e.target.checked);
        if (e.target.checked) {
          window.AudioEngine.playHover();
        }
      }
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
  if (typeof renderProfileCollection === "function") renderProfileCollection();
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

  const pName = document.getElementById("profileName");
  if (pName) pName.textContent = AppState.user.username || AppState.user.name;

  const pBio = document.getElementById("profileBioValue");
  if (pBio && AppState.user.bio) pBio.textContent = AppState.user.bio;

  const pInt = document.getElementById("profileInterestsValue");
  if (pInt && AppState.user.interests)
    pInt.textContent = AppState.user.interests;

  const pLoc = document.getElementById("profileLocationValue");
  if (pLoc && AppState.user.location) pLoc.textContent = AppState.user.location;

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
  if (mName) mName.textContent = AppState.user.name;

  const balEl = document.getElementById("boutiqueBalanceDisplay");
  if (balEl) balEl.textContent = AppState.balance.toLocaleString("en-US");

  const countEl = document.getElementById("profileItemCount");
  if (countEl) countEl.textContent = AppState.collectedItems.length;

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
}

/* =========================================================
   THE 1% CLUB — app.js Phase 2
   Master Card · Club Chat · Credits · Boutique · Equip · Widget 1
========================================================= */


function generateBoutiqueSkeleton() {
  let html = '<div class="boutique-grid">';
  for (let i = 0; i < 6; i++) {
    html += `
      <div class="boutique-card boutique-skeleton">
        <span class="skeleton-shimmer-el skeleton-badge"></span>
        <span class="skeleton-shimmer-el skeleton-icon"></span>
        <span class="skeleton-shimmer-el skeleton-name"></span>
        <span class="skeleton-shimmer-el skeleton-price"></span>
        <div class="skeleton-shimmer-el skeleton-progress"></div>
        <div class="skeleton-shimmer-el skeleton-button"></div>
      </div>
    `;
  }
  html += '</div>';
  return html;
}


/* === 3. BOUTIQUE & STORE RENDERING === */
function renderBoutique(filter = "all") {
  const root = document.getElementById("boutiqueSections");
  const owned = ClubState.owned;
  const equipped = ClubState.equipped;
  const categories = filter === "all" ? Object.keys(BOUTIQUE) : [filter];

  if (!root.dataset.skeletonShown) {
    root.innerHTML = generateBoutiqueSkeleton();
    root.dataset.skeletonShown = "true";
    setTimeout(
      () => renderBoutiqueContent(filter, root, owned, equipped, categories),
      450,
    );
    return;
  }

  root.dataset.skeletonShown = "";
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
          iconHtml = `<img src="${item.image}" alt="${window.t(item.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                      <span class="boutique-card-fallback" style="display:none">${ICONS[item.icon] || ICONS["star"]}</span>`;
        } else if (item.icon && (item.icon.startsWith("http") || item.icon.startsWith("data:"))) {
          iconHtml = `<img src="${item.icon}" alt="${window.t(item.name)}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
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

function renderWidgetSection() {
  const masterCard = document.getElementById("membershipCard");
  const cardHTML = masterCard ? masterCard.innerHTML : "";

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

      <button class="widget-add-btn" type="button" onclick="alert('Widget Added')">
        ✓ ${window.t("boutique.id_widget_status")}
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
    renderBoutique(tab.dataset.cat);
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

function showCopyToast(msg) {
  copyToast.textContent = msg;
  copyToast.classList.add("is-visible");
  setTimeout(() => copyToast.classList.remove("is-visible"), 2000);
}

document.getElementById("copyBtn").addEventListener("click", async () => {
  if (window.AudioEngine && window.AudioEngine.playSend) {
    window.AudioEngine.playSend();
  }
  try {
    await navigator.clipboard.writeText(ClubState.member.verifyUrl);
    showCopyToast(window.t("misc.linkCopied"));
  } catch {
    showCopyToast(ClubState.member.verifyUrl);
  }
});

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
    if (window.AudioEngine) AudioEngine.playRustle();
    this.switchView(tab);
    this.updateHeader(tab);
    this.triggerEnter(tab);
  },

  switchView(tab) {
    document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("is-active");
    });

    const activePage = document.getElementById(`${tab}-tab`);
    if (activePage) {
      activePage.classList.add("is-active");
    }

    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("is-active"));
    const activeNav = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    if (activeNav) activeNav.classList.add("is-active");

    const main = document.querySelector(".app-main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resize"));
  },

  updateHeader(tab) {
    const sectionName = document.getElementById("sectionName");
    if (sectionName) sectionName.textContent = PAGE_TITLES[tab] || tab;

    const backBtn = document.getElementById("backBtn");
    if (backBtn) backBtn.hidden = true;

    const header = document.getElementById("appHeader");
    if (header) header.classList.toggle("header-compact", tab === "club");
  },

  triggerEnter(tab) {
    this.onEnter(tab);
  },

  navigateContext(pageId, title, returnTab) {
    if (window.AudioEngine) AudioEngine.playRustle();
    contextReturnTab = returnTab;
    document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("is-active");
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
      activePage.classList.add("is-active");
    }
    document.getElementById("sectionName").textContent = title;
    document.getElementById("appHeader").classList.remove("header-compact");
    document.getElementById("backBtn").hidden = false;
    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("is-active"));

    const main = document.querySelector(".app-main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resize"));
  },

  onEnter(tab) {
    if (tab === "club") {
      if (typeof updateCreditsUI === "function") updateCreditsUI();
      requestAnimationFrame(() => {
        const msgs = document.getElementById("clubMessages");
        if (msgs) window.scrollTo(0, document.body.scrollHeight);
      });
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
  }
  document.getElementById("sectionName").textContent = title;
  document.getElementById("appHeader").classList.remove("header-compact");
  document.getElementById("backBtn").hidden = false;
  document.querySelector(".app-main").scrollTop = 0;
  window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resize"));
}

function openMemberProfile(member) {
  document.getElementById("memberProfileName").textContent = member.name;
  document.getElementById("memberProfileTier").textContent =
    `${window.t("misc.member")} ${member.tier}`;
  document.getElementById("memberProfileQuote").textContent =
    `"${member.text}"`;
  document.getElementById("memberProfileWealth").textContent = member.wealth;
  document.getElementById("memberProfilePriv").textContent = member.priv;
  openContextPage("page-member", "ملف العضو", "club");
}

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("backBtn").hidden = true;
  goToPage(contextReturnTab);
});

document.querySelectorAll("#page-member .card-actions .btn").forEach((btn) => {
  btn.addEventListener("click", () =>
    showNavToast(window.t("profile.comingSoon")),
  );
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
  { name: "Lord Julian", tier: "FOUNDER", id: "001", color: "#e6c27a" },
  { name: "Elena Rostova", tier: "SOVEREIGN", id: "084", color: "#d4af37" },
  { name: "Marcus Sterling", tier: "TITAN", id: "112", color: "#f3e5ab" },
  { name: "Concierge Desk", tier: "SYSTEM", id: "000", color: "#a39b8b" },
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
  const concierge = ELITE_MEMBERS.find((m) => m.id === "000");

  const others = [lordJulian, elena, marcus];

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
    const responses = isArabic
      ? [
          window.t("dynamic.chatHelp1").replace("{0}", userName),
          window.t("dynamic.chatHelp2"),
        ]
      : [
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
    if (isArabic) {
      const responses = [
        window.t("dynamic.chatGreet1").replace("{0}", userName),
        window.t("dynamic.chatGreet2"),
        window.t("dynamic.chatGreet3").replace("{0}", userName),
      ];
      return {
        member: others[Math.floor(Math.random() * others.length)],
        text: responses[Math.floor(Math.random() * responses.length)],
      };
    } else {
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
    if (isArabic) {
      const responses = [
        window.t("dynamic.chatInvest1"),
        window.t("dynamic.chatInvest2"),
        window.t("dynamic.chatInvest3").replace("{0}", userName),
      ];
      return {
        member: [lordJulian, marcus][Math.floor(Math.random() * 2)],
        text: responses[Math.floor(Math.random() * responses.length)],
      };
    } else {
      const responses = [
        window.t("dynamic.chatInvest1"),
        window.t("dynamic.chatInvest2"),
        window.t("dynamic.chatInvest3").replace("{0}", userName),
      ];
      return {
        member: [lordJulian, marcus][Math.floor(Math.random() * 2)],
        text: responses[Math.floor(Math.random() * responses.length)],
      };
    }
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
    if (isArabic) {
      const responses = [
        window.t("dynamic.chatBoutique1"),
        window.t("dynamic.chatBoutique2").replace("{0}", userName),
        window.t("dynamic.chatBoutique3"),
      ];
      return {
        member: [lordJulian, elena][Math.floor(Math.random() * 2)],
        text: responses[Math.floor(Math.random() * responses.length)],
      };
    } else {
      const responses = [
        window.t("dynamic.chatBoutique1"),
        window.t("dynamic.chatBoutique2").replace("{0}", userName),
        window.t("dynamic.chatBoutique3"),
      ];
      return {
        member: [lordJulian, elena][Math.floor(Math.random() * 2)],
        text: responses[Math.floor(Math.random() * responses.length)],
      };
    }
  }

  if (isArabic) {
    const responses = [
      window.t("dynamic.chatDefault1").replace("{0}", userName),
      window.t("dynamic.chatDefault2"),
      window.t("dynamic.chatDefault3"),
    ];
    return {
      member: others[Math.floor(Math.random() * others.length)],
      text: responses[Math.floor(Math.random() * responses.length)],
    };
  } else {
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
  const messagesContainer = document.getElementById("clubMessages");
  const composerWrap = document.getElementById("clubComposerWrap");
  const leaderboardContainer = document.getElementById(
    "clubLeaderboardContainer",
  );

  if (channelId === "leaderboard") {
    if (pinnedTitle) {
      pinnedTitle.textContent = "قائمة المتصدرين";
      pinnedTitle.setAttribute("data-i18n", "leaderboardTitle");
    }
    if (pinnedSub) {
      pinnedSub.textContent = "النخبة العالمية لأصحاب الثروة السيادية";
      pinnedSub.setAttribute("data-i18n", "leaderboardSub");
    }

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
      pinnedSub.textContent = window.t("club.welcomeSub");
      pinnedSub.setAttribute("data-i18n", "club.welcomeSub");
    }

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
}

document.querySelectorAll(".club-room-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const badge = btn.querySelector(".room-badge");
    if (badge) badge.remove();
    switchChannel(btn.dataset.channel);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  switchChannel("global-lounge");
});

function renderMessages() {
  const container = document.getElementById("clubMessages");
  if (!container) return;

  const channelId = AppState.activeChannelId;
  const messages = AppState.channels[channelId]?.messages || [];

  container.innerHTML = messages
    .map((msg) => {
      const isMe = msg.senderId === AppState.user.id;
      const timeStr = new Date(msg.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (isMe) {
        return `
        <div class="chat-row is-outgoing">
          <div class="chat-bubble is-outgoing">
            <div class="chat-text">${msg.text}</div>
            <div class="chat-meta">
              <span class="chat-time">${timeStr}</span>
              <span class="chat-ticks">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
            </div>
          </div>
        </div>
      `;
      } else {
        return `
        <div class="chat-row is-incoming">
          <button class="chat-avatar-btn is-online" type="button">
            <div class="chat-avatar-rim">
              <div class="chat-avatar-initials">${msg.senderName.charAt(0)}</div>
            </div>
          </button>
          <div class="chat-bubble is-incoming">
            <div class="chat-sender-header">
              <span style="font-size: 10px; color: ${msg.senderColor || "#d4af37"}; font-weight: bold; font-family: 'Cinzel', serif;">${msg.senderName}</span>
              <span style="font-size: 8px; color: #8a7a5a; background: rgba(212,175,55,0.1); padding: 2px 6px; border-radius: 4px;">${msg.senderTier || "MEMBER"}</span>
            </div>
            <div class="chat-text">${msg.text}</div>
            <div class="chat-meta">
              <span class="chat-time">${timeStr}</span>
            </div>
          </div>
        </div>
      `;
      }
    })
    .join("");

  container.scrollTop = container.scrollHeight;
}

let typingTimeout;
function handleSendMessage() {
  const input = document.getElementById("clubInput");
  const text = input.value.trim();
  if (!text) return;

  const channelId = AppState.activeChannelId;
  if (!AppState.channels[channelId])
    AppState.channels[channelId] = { messages: [] };

  AppState.channels[channelId].messages.push({
    senderId: AppState.user.id,
    text: text,
    timestamp: Date.now(),
  });

  input.value = "";
  if (window.AudioEngine) window.AudioEngine.playSend(); // Assuming playSend exists or will fallback
  AppState.save();
  renderMessages();

  clearTimeout(typingTimeout);

  const indicator = document.getElementById("typingIndicator");
  const typingName = document.getElementById("typingName");

  setTimeout(() => {
    const { member: elite, text: replyText } = processEliteResponse(text);
    if (typingName) typingName.textContent = elite.name;
    if (indicator) indicator.style.display = "flex";

    typingTimeout = setTimeout(
      () => {
        if (indicator) indicator.style.display = "none";

        AppState.channels[channelId].messages.push({
          senderId: elite.id,
          senderName: elite.name,
          senderTier: elite.tier,
          senderColor: elite.color,
          text: replyText,
          timestamp: Date.now(),
        });

        if (window.AudioEngine) window.AudioEngine.playReceive();
        AppState.save();
        renderMessages();
      },
      1500 + Math.random() * 1000,
    );
  }, 1000);
}

document
  .getElementById("clubSendBtn")
  ?.addEventListener("click", handleSendMessage);
document.getElementById("clubInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSendMessage();
});

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
    mediaContent = `<img src="${item.image}" alt="${window.t(item.name)}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
                    <div style="display:none; width:100%; height:100%; justify-content:center; align-items:center;">${ICONS[item.icon] || ICONS["crown"]}</div>`;
  } else if (item.icon && (item.icon.startsWith("http") || item.icon.startsWith("data:"))) {
    mediaContent = `<img src="${item.icon}" alt="${window.t(item.name)}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
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

// ---------------------------------------------------------
// ---------------------------------------------------------
function renderProfileEquipped() {
  const grid = document.getElementById("profileEquippedGrid");
  if (!grid) return;

  const equipped = ClubState.equipped;
  let itemsHtml = "";

  for (const catKey in BOUTIQUE) {
    if (!EQUIP_CATEGORIES[catKey]) continue; // Only equipable categories

    const equippedName = equipped[catKey];
    if (equippedName) {
      const itemDef = BOUTIQUE[catKey].items.find(
        (i) => i.name === equippedName,
      );
      if (itemDef) {
        const iconSvg = ICONS[itemDef.icon] || ICONS["star"];
        itemsHtml += `
          <div class="profile-equipped-item">
            <div class="profile-eq-icon">${iconSvg}</div>
            <div class="profile-eq-name">${window.t(itemDef.name)}</div>
          </div>
        `;
      }
    }
  }

  if (itemsHtml) {
    grid.innerHTML = itemsHtml;
    grid.style.display = "grid";
  } else {
    grid.innerHTML = `
      <div class="profile-empty-collection luxury-empty-state" style="grid-column: 1 / -1; padding: 30px;">
        <p style="margin: 0;">لم يتم تجهيز أي مقتنيات</p>
      </div>
    `;
    grid.style.display = "block";
  }
}
// ---------------------------------------------------------
// ---------------------------------------------------------

function showReactionMenu(anchorEl, msgId) {
  let existing = document.getElementById("reactionMenuBox");
  if (existing) existing.remove();

  const menu = document.createElement("div");
  menu.id = "reactionMenuBox";
  menu.className = "chat-reaction-menu";

  const emojis = ["💎", "🏆", "👑", "✨", "🔥"];

  emojis.forEach((emoji) => {
    const btn = document.createElement("button");
    btn.className = "reaction-emoji-btn";
    btn.textContent = emoji;
    btn.onclick = () => {
      addReactionToMessage(msgId, emoji);
      menu.remove();
    };
    menu.appendChild(btn);
  });

  document.body.appendChild(menu);

  const rect = anchorEl.getBoundingClientRect();
  menu.style.top = rect.top - 40 + "px";
  let leftPos = rect.left + rect.width / 2 - menu.offsetWidth / 2;
  leftPos = Math.max(
    10,
    Math.min(leftPos, window.innerWidth - menu.offsetWidth - 10),
  );
  menu.style.left = leftPos + "px";

  setTimeout(() => {
    const closeMenu = (e) => {
      if (!menu.contains(e.target) && e.target !== anchorEl) {
        menu.remove();
        document.removeEventListener("click", closeMenu);
      }
    };
    document.addEventListener("click", closeMenu);
  }, 10);
}

function addReactionToMessage(msgId, emoji) {
  const msg = CLUB_MEMBERS.find((m) => m.msgId === msgId);
  if (msg) {
    if (!msg.reactions) msg.reactions = [];
    if (!msg.reactions.includes(emoji)) {
      msg.reactions.push(emoji);
      if (window.AudioEngine) window.AudioEngine.playChime();
      renderClubMessages();
    }
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
    renderBoutique(activeCat);
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
  const menuMyCollectionNav = document.getElementById("menuMyCollectionNav");
  if (menuMyCollectionNav) {
    menuMyCollectionNav.addEventListener("click", () => {
      document.querySelector('[data-tab="shop"]').click();
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
      if (draft) {
        document.getElementById("editProfileNameInput").value = draft.name || "";
        document.getElementById("editProfileQuoteInput").value = draft.quote || "";
        currentAvatarUrl = draft.avatarUrl || "";
        document.getElementById("editProfileAvatarUrl").value = currentAvatarUrl;
      } else {
        document.getElementById("editProfileNameInput").value = AppState.user.name || "";
        document.getElementById("editProfileQuoteInput").value = AppState.user.quote || AppState.user.bio || "";
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
      const avatarUrl = document.getElementById("editProfileAvatarUrl").value.trim();
        
      if (nameInput) {
        AppState.user.name = nameInput;
        AppState.user.username = nameInput;
      }
      if (quoteInput) {
        AppState.user.quote = quoteInput;
        AppState.user.bio = quoteInput;
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
          
      AppState.save();
      updateUI();
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

  const menuMembership = document.getElementById("menuMembership");
  if (menuMembership) {
    menuMembership.addEventListener("click", () => {
      const membershipTabBtn = document.querySelector(
        '[data-tab="membership"]',
      );
      if (membershipTabBtn) membershipTabBtn.click();
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
  const menuMyCollection = document.getElementById("menuMyCollection");
  if (menuMyCollection) {
    menuMyCollection.addEventListener("click", () => {
      const targetSection = document.querySelector(
        "#profile-tab .profile-collection-section",
      );
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          const cards = targetSection.querySelectorAll(".pcs-item-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.transition = "box-shadow 0.4s ease";
              card.style.boxShadow =
                "0 0 20px rgba(212, 175, 55, 0.8), inset 0 0 15px rgba(212, 175, 55, 0.4)";
              setTimeout(() => {
                card.style.boxShadow = "";
              }, 600);
            }, index * 100);
          });
        }, 500); // wait for scroll
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuMembership = document.getElementById("menuMembership");
  if (menuMembership) {
    menuMembership.addEventListener("click", () => {
      document.querySelector('[data-tab="card"]')?.click();
    });
  }
});

var d3RadarSvg = null;

function renderRadarChart() {
  if (typeof d3 === "undefined") {
    setTimeout(renderRadarChart, 100);
    return;
  }
  const container = d3.select("#profileRadarChart");
  if (container.empty()) return;

  const w = 100;
  const h = 100;
  const cx = w / 2;
  const cy = h / 2;
  const radius = 35;

  const metrics = [
    {
      name: window.t("dynamic.wealth"),
      value: ClubState.member.wealthIndexValue || 92,
    },
    {
      name: window.t("dynamic.privileges") || window.t("membership.privileges"),
      value: ClubState.member.privilegesValue || 84,
    },
    {
      name: window.t("dynamic.connections"),
      value: ClubState.member.connectionsValue || 75,
    },
  ];

  if (!d3RadarSvg) {
    container.html(""); // clear vanilla SVG

    d3.select("#profileRadarChart")
      .style("position", "relative")
      .append("div")
      .attr("class", "radar-tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("z-index", "20");

    d3RadarSvg = container
      .append("svg")
      .attr("class", "radar-svg")
      .attr("viewBox", `-20 -20 ${w + 40} ${h + 40}`);

    const angles = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6];

    const gridLevels = [0.33, 0.66, 1];
    gridLevels.forEach((level) => {
      const r = radius * level;
      const pts = angles
        .map((a) => `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`)
        .join(" ");
      d3RadarSvg
        .append("polygon")
        .attr("points", pts)
        .attr("class", "radar-grid");
    });

    angles.forEach((a) => {
      d3RadarSvg
        .append("line")
        .attr("x1", cx)
        .attr("y1", cy)
        .attr("x2", cx + radius * Math.cos(a))
        .attr("y2", cy + radius * Math.sin(a))
        .attr("class", "radar-axis");
    });

    metrics.forEach((m, i) => {
      const a = angles[i];
      const labelR = radius + 14;
      const lx = cx + labelR * Math.cos(a);
      const ly = cy + labelR * Math.sin(a);

      let anchor = "middle";
      if (Math.cos(a) > 0.1) anchor = "start";
      else if (Math.cos(a) < -0.1) anchor = "end";

      let dy = Math.sin(a) > 0.1 ? 2 : Math.sin(a) < -0.1 ? 0 : 3;

      d3RadarSvg
        .append("text")
        .attr("x", lx)
        .attr("y", ly)
        .attr("class", "radar-label")
        .attr("text-anchor", anchor)
        .attr("dy", dy)
        .text(m.name);
    });
  }

  const angles = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6];
  const lineGen = d3
    .line()
    .x((d) => d.x)
    .y((d) => d.y);

  const dataPtsArr = metrics.map((m, i) => {
    let val = Math.max(0, Math.min(100, m.value)) / 100;
    let r = radius * val;
    return {
      x: cx + r * Math.cos(angles[i]),
      y: cy + r * Math.sin(angles[i]),
      val: m.value,
      name: m.name,
    };
  });

  const polyPtsArr = [...dataPtsArr, dataPtsArr[0]];

  const polygon = d3RadarSvg.selectAll(".radar-polygon-d3").data([polyPtsArr]);

  polygon
    .enter()
    .append("path")
    .attr("class", "radar-polygon-d3")
    .merge(polygon)
    .transition()
    .duration(500)
    .ease(d3.easeCubicOut)
    .attr("d", lineGen);

  const circles = d3RadarSvg.selectAll(".radar-point-d3").data(dataPtsArr);

  circles
    .enter()
    .append("circle")
    .attr("class", "radar-point-d3")
    .attr("r", 2.5)
    .on("mouseover", function (event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 4)
        .style("fill", "#D4AF6A");

      const tooltip = d3
        .select(this.parentNode.parentNode)
        .select(".radar-tooltip");
      const [mx, my] = d3.pointer(event, this.parentNode.parentNode);

      tooltip
        .html(`<strong>${d.name}</strong><br/>${d.val}%`)
        .style("left", mx + 10 + "px")
        .style("top", my - 10 + "px")
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseout", function () {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("r", 2.5)
        .style("fill", "#fff");

      d3.select(this.parentNode.parentNode)
        .select(".radar-tooltip")
        .transition()
        .duration(200)
        .style("opacity", 0);
    })
    .merge(circles)
    .transition()
    .duration(500)
    .ease(d3.easeCubicOut)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);
}

window.updateRadarChart = renderRadarChart;

/* === 7. INITIALIZATION & LISTENERS === */
document.addEventListener("DOMContentLoaded", () => {
  renderRadarChart();
  renderProgressChart();
});

// ---------------------------------------------------------
// ---------------------------------------------------------
function renderProgressChart() {
  const wrapper = document.getElementById("profileProgressChart");
  if (!wrapper) return;

  const data = [
    { week: window.t("dynamic.week1"), wealth: 60, priv: 50, conn: 40 },
    { week: window.t("dynamic.week2"), wealth: 72, priv: 62, conn: 55 },
    { week: window.t("dynamic.week3"), wealth: 85, priv: 76, conn: 65 },
    {
      week: window.t("dynamic.current"),
      wealth: ClubState.member.wealthIndexValue || 92,
      priv: ClubState.member.privilegesValue || 84,
      conn: ClubState.member.connectionsValue || 75,
    },
  ];

  const w = 300;
  const h = 120;
  const padX = 25;
  const padYTop = 15;
  const padYBot = 25;
  const usableW = w - padX * 2;
  const usableH = h - padYTop - padYBot;

  const getX = (i) => padX + (i * usableW) / (data.length - 1);
  const getY = (val) => padYTop + usableH - (val / 100) * usableH;

  const colors = { wealth: "#D4AF6A", priv: "#EAE5D9", conn: "#8C877A" };

  let svg = `<svg class="progress-svg" viewBox="0 0 ${w} ${h}">`;

  [0, 25, 50, 75, 100].forEach((val) => {
    let y = getY(val);
    svg += `<line x1="${padX}" y1="${y}" x2="${w - padX}" y2="${y}" class="progress-grid-line" />`;
  });

  svg += `<line id="progressActiveLine" x1="0" y1="${padYTop}" x2="0" y2="${h - padYBot}" class="progress-active-line" />`;

  ["wealth", "priv", "conn"].forEach((key) => {
    let pts = data.map((d, i) => `${getX(i)},${getY(d[key])}`).join(" L ");
    svg += `<path d="M ${pts}" class="progress-line" stroke="${colors[key]}" />`;
  });

  data.forEach((d, i) => {
    let x = getX(i);
    svg += `<text x="${x}" y="${h - 5}" class="progress-axis-text">${d.week}</text>`;

    ["wealth", "priv", "conn"].forEach((key) => {
      let y = getY(d[key]);
      svg += `<circle cx="${x}" cy="${y}" r="2.5" class="progress-point" fill="#0F0F0F" stroke="${colors[key]}" />`;
    });

    let zoneW = usableW / (data.length - 1);
    let zoneX = x - zoneW / 2;
    svg += `<rect x="${zoneX}" y="0" width="${zoneW}" height="${h}" class="hover-zone" data-idx="${i}" />`;
  });

  svg += `</svg>`;

  const tooltip = document.createElement("div");
  tooltip.className = "progress-tooltip";
  tooltip.id = "progressTooltip";

  wrapper.innerHTML = svg;
  wrapper.appendChild(tooltip);

  const zones = wrapper.querySelectorAll(".hover-zone");
  const activeLine = wrapper.querySelector("#progressActiveLine");

  zones.forEach((zone) => {
    zone.addEventListener("mouseenter", (e) => handleHover(e.target));
    zone.addEventListener(
      "touchstart",
      (e) => {
        handleHover(e.target);
      },
      { passive: true },
    );
  });

  wrapper.addEventListener("mouseleave", () => {
    tooltip.style.opacity = 0;
    activeLine.style.opacity = 0;
  });

  function handleHover(target) {
    const idx = parseInt(target.getAttribute("data-idx"));
    const d = data[idx];
    const x = getX(idx);

    activeLine.setAttribute("x1", x);
    activeLine.setAttribute("x2", x);
    activeLine.style.opacity = 1;

    tooltip.innerHTML = `
      <div class="tooltip-week">${d.week}</div>
      <div class="tooltip-row"><span style="color:${colors.wealth}">${window.t("dynamic.wealth")}</span> <span>${d.wealth}%</span></div>
      <div class="tooltip-row"><span style="color:${colors.priv}">${window.t("membership.privileges")}</span> <span>${d.priv}%</span></div>
      <div class="tooltip-row"><span style="color:${colors.conn}">${window.t("dynamic.connections")}</span> <span>${d.conn}%</span></div>
    `;

    let percX = (x / w) * 100;
    if (idx === 0) percX += 15;
    if (idx === data.length - 1) percX -= 15;

    tooltip.style.left = `calc(${percX}%)`;
    tooltip.style.top = `10px`;
    tooltip.style.opacity = 1;
  }
}

window.testRadarUpdate = () => {
  ClubState.member.wealthIndexValue = Math.floor(Math.random() * 100);
  ClubState.member.privilegesValue = Math.floor(Math.random() * 100);
  ClubState.member.connectionsValue = Math.floor(Math.random() * 100);
};
function updateCreditsUI() {
  const creditsText = document.getElementById("clubCreditsText");
  const buyBtn = document.getElementById("clubCreditsBuyBtn");
  if (!creditsText) return;

  const currentCredits =
    ClubState.chatCredits !== undefined ? ClubState.chatCredits : 10;
  const maxCredits = 10;

  if (currentCredits <= 0) {
    creditsText.textContent = `${window.t("dynamic.msgsLeft")}${currentCredits} / ${maxCredits}`;
    creditsText.style.color = "#d9534f";
    if (buyBtn) buyBtn.style.display = "inline-block";
  } else {
    creditsText.textContent = `${window.t("dynamic.msgsLeft")}${currentCredits} / ${maxCredits}`;
    creditsText.style.color = "inherit";
    if (buyBtn) buyBtn.style.display = "inline-block";
  }
}
function renderClubMessages() {}
const CLUB_MEMBERS = [
  {
    id: "1001",
    name: "ALEXANDER W.",
    tier: "SOVEREIGN EXARCH",
    msgId: "msg-1",
    content: "Great investment opportunity in the new fund.",
  },
  {
    id: "1002",
    name: "SARAH V.",
    tier: "SOVEREIGN LUMINARY",
    msgId: "msg-2",
    content: "I agree, looking into the details now.",
  },
  {
    id: "1003",
    name: "MICHAEL T.",
    tier: "SOVEREIGN MEMBER",
    msgId: "msg-3",
    content: "When is the next global meetup?",
  },
];

let typingTimeout2 = null;
function setTypingIndicator(member) {}

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

  Object.keys(ACHIEVEMENTS_DATA).forEach((id) => {
    const ach = ACHIEVEMENTS_DATA[id];
    const isUnlocked = ach.isUnlocked();
    if (isUnlocked) earnedCount++;

    const nameText = window.t("honors." + id);
    const titleText = window.t("honors.title_" + id);

    if (isUnlocked) {
      html += `
        <div class="honor-card is-unlocked gyro-element" data-tilt data-tooltip="${window.t("honors.desc_" + id).replace(/"/g, "&quot;")}">
          <div class="honor-icon">${ach.icon}</div>
          <div class="honor-name">${nameText}</div>
          <div class="honor-title">${titleText}</div>
          <div class="honor-pill">${window.t("honors.earned")}</div>
        </div>
      `;
    } else {
      let current = ach.progress();
      if (current > ach.target) current = ach.target;
      const percent = Math.min(100, Math.max(0, (current / ach.target) * 100));

      const remainingFormatted = "$" + (ach.target - current).toLocaleString();
      let remainingText = window
        .t("honors.remaining")
        .replace("{0}", remainingFormatted);

      html += `
        <div class="honor-card is-locked gyro-element skeleton-fade-in" data-tilt data-tooltip="${window.t("honors.desc_" + id).replace(/"/g, "&quot;")}">
          <div class="honor-icon">${ach.icon}</div>
          <div class="honor-name">${nameText}</div>
          <div class="honor-title">${window.t("honors.locked")}</div>
          <div class="honor-progress-wrap">
            <div class="honor-progress-bar">
              <div class="honor-progress-fill" style="width: ${percent}%;"></div>
            </div>
            <div class="honor-progress-text">${remainingText}</div>
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


function generateProfileCollectionSkeleton() {
  let html = '';
  for (let i = 0; i < 4; i++) {
    html += `
      <div class="pcs-item-card profile-collection-skeleton">
        <span class="skeleton-shimmer-el skeleton-icon-round"></span>
        <div class="pcs-item-info">
          <div class="skeleton-shimmer-el skeleton-name"></div>
          <div class="skeleton-shimmer-el skeleton-price-small"></div>
        </div>
      </div>
    `;
  }
  return html;
}

function renderProfileCollection() {
  const container = document.getElementById("profileCollectionGrid");
  if (!container) return;

  if (!container.dataset.skeletonShown) {
    container.innerHTML = generateProfileCollectionSkeleton();
    container.dataset.skeletonShown = "true";
    setTimeout(() => renderProfileCollection(), 450);
    return;
  }
  container.dataset.skeletonShown = "";

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

  if (itemCount === 0) {
    const emptyText = window.t("profile.emptyVault");
    const btnText = window.t("explore_boutique");

    container.innerHTML = `
      <div class="empty-vault-card" onclick="goToPage('boutique')">
        <div class="vault-empty-icon">+</div>
        <p class="vault-empty-text">${emptyText}</p>
        <span class="vault-empty-btn">${btnText}</span>
      </div>
    `;
  } else {
    let html = "";
    for (const item of collectedItems) {
      if (!item) continue;
      const isAr =
        AppState.language === "ar" || document.documentElement.lang === "ar";
      const nameText = isAr
        ? window.t("items." + item.id)
        : window.t("items." + item.id);

      let iconHtml = "";
      if (item.image) {
        iconHtml = `<img src="${item.image}" alt="${nameText}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                    <span class="boutique-card-fallback" style="display:none">${ICONS[item.icon] || ICONS["star"]}</span>`;
      } else if (item.icon && (item.icon.startsWith("http") || item.icon.startsWith("data:"))) {
        iconHtml = `<img src="${item.icon}" alt="${nameText}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                    <span class="boutique-card-fallback" style="display:none">${ICONS["star"]}</span>`;
      } else {
        iconHtml = `<span class="boutique-card-fallback" style="display:flex">${ICONS[item.icon] || ICONS["star"]}</span>`;
      }

      html += `
        <div class="pcs-item-card gyro-element skeleton-fade-in" data-tilt>
          <span class="boutique-card-icon">
            ${iconHtml}
          </span>
          <div class="pcs-item-info">
            <div class="pcs-item-name">${nameText}</div>
            <div class="pcs-item-price">${item.price ? "$" + item.price.toLocaleString() : item.rarity}</div>
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
  document.getElementById("menuAccountInfo")?.click();
});

function renderProfileStatsBar() {
  const container = document.getElementById("profileStatsBar");
  if (!container) return;

  if (!container.dataset.skeletonShown) {
    let html = '';
    for(let i=0; i<4; i++) {
      html += `
        <div class="psb-col profile-stats-skeleton">
          <div class="skeleton-shimmer-el skeleton-icon-tiny"></div>
          <div class="skeleton-shimmer-el skeleton-name"></div>
          <div class="skeleton-shimmer-el skeleton-badge"></div>
        </div>
      `;
      if (i < 3) html += '<div class="psb-divider"></div>';
    }
    container.innerHTML = html;
    container.dataset.skeletonShown = "true";
    setTimeout(() => renderProfileStatsBar(), 450);
    return;
  }
  container.dataset.skeletonShown = "";

  const levelVal = window.t("dynamic.sovereign");
  const levelLabel = window.t("membership.level");

  const itemsVal = AppState.collectedItems.length;
  const itemsLabel = window.t("profile.itemsCollected");

  const connectionsVal = "248";
  const connectionsLabel = window.t("profile.connections");

  const sinceVal = window.t("profile.sinceDate");
  const sinceLabel = window.t("membership.memberSince");

  container.innerHTML = `
    <div class="psb-col skeleton-fade-in">
      <svg class="psb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 17l2-10 4 4 4-7 4 7 4-4 2 10z"></path></svg>
      <div class="psb-value">${levelVal}</div>
      <div class="psb-label">${levelLabel}</div>
    </div>
    <div class="psb-divider"></div>
    <div class="psb-col skeleton-fade-in">
      <svg class="psb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <div class="psb-value" id="pmItemsCollected">${itemsVal}</div>
      <div class="psb-label">${itemsLabel}</div>
    </div>
    <div class="psb-divider"></div>
    <div class="psb-col skeleton-fade-in">
      <svg class="psb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      <div class="psb-value">${connectionsVal}</div>
      <div class="psb-label">${connectionsLabel}</div>
    </div>
    <div class="psb-divider"></div>
    <div class="psb-col skeleton-fade-in">
      <svg class="psb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      <div class="psb-value">${sinceVal}</div>
      <div class="psb-label">${sinceLabel}</div>
    </div>
  `;

}

/* === 5. PRESTIGE, HONORS & METRICS === */
function renderLeaderboard() {
  const container =
    document.getElementById("leaderboardList") ||
    document.getElementById("clubLeaderboardContainer");
  if (!container) return;
  const mockTopMembers = [
    {
      id: "SV-0001",
      name: "A. Al Maktoum",
      wealth: "99.9%",
      tier: "Sovereign",
    },
    {
      id: "SV-0822",
      name: "E. Rothschild",
      wealth: "99.7%",
      tier: "Sovereign",
    },
    { id: "SV-1105", name: "M. Windsor", wealth: "99.5%", tier: "Elite" },
    { id: "SV-0344", name: "J. Rockefeller", wealth: "99.2%", tier: "Elite" },
    { id: "SV-2211", name: "K. Arnault", wealth: "98.9%", tier: "Elite" },
    { id: "SV-3091", name: "L. Bettencourt", wealth: "98.5%", tier: "Member" },
    { id: "SV-4402", name: "F. Pinault", wealth: "98.1%", tier: "Member" },
    { id: "SV-5510", name: "D. Wertheimer", wealth: "97.8%", tier: "Member" },
    { id: "SV-6623", name: "G. Armani", wealth: "97.5%", tier: "Member" },
    { id: "SV-7734", name: "S. Ortega", wealth: "97.0%", tier: "Member" },
  ];

  let html = '<div class="leaderboard-list">';
  mockTopMembers.forEach((member, index) => {
    const rank = index + 1;
    const isAr =
      AppState.language === "ar" || document.documentElement.lang === "ar";
    const name = member.name;
    const score = member.wealth;

    let tagText = member.tier;
    if (isAr) {
      if (member.tier.includes("Sovereign"))
        tagText = window.t("misc.sovereign");
      else if (member.tier.includes("Elite")) tagText = window.t("misc.elite");
      else tagText = window.t("misc.member");
    } else {
      if (member.tier.includes("Sovereign")) tagText = "Sovereign";
      else if (member.tier.includes("Elite")) tagText = "Elite";
      else tagText = "Member";
    }

    const isOnline = index < 2 ? "is-online" : "";
    html += `
    <div class="leader-item">
      <div class="leader-rank">${rank}</div>
      <div class="leader-avatar ${isOnline}">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="${name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="avatar-fallback" style="display:none;">${name.charAt(0)}</span>
      </div>
      <div class="leader-info">
        <div class="leader-name">${name}</div>
        <div class="leader-tag">${tagText}</div>
      </div>
      <div class="leader-score">${score}</div>
    </div>
    `;
  });
  html += "</div>";
  container.innerHTML = html;
}

/* ==========================================================================
   PARALLAX CONTROLLER (LUXURY DEPTH)
   ========================================================================== */
class ParallaxController {
  constructor() {
    this.ticking = false;
    this.init();
  }

  init() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      // Use passive listener for butter-smooth scrolling
      page.addEventListener('scroll', () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.updateParallax(page);
            this.ticking = false;
          });
          this.ticking = true;
        }
      }, { passive: true });
    });
    
    // Initial trigger
    setTimeout(() => {
        const activePage = document.querySelector('.page.is-active');
        if (activePage) this.updateParallax(activePage);
    }, 100);
  }

  updateParallax(scrollContainer) {
    const containerHeight = scrollContainer.clientHeight;
    
    // --- BOUTIQUE TAB PARALLAX ---
    if (scrollContainer.id === 'boutique-tab') {
      const cards = scrollContainer.querySelectorAll('.boutique-card');
      
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        
        // Skip if outside viewport
        if (rect.bottom < 0 || rect.top > containerHeight) return;
        
        // Distance from center of viewport (- means above center, + means below)
        const centerOffset = (rect.top + rect.height / 2) - (containerHeight / 2);
        
        // Layer 1: Icon (moves faster)
        // Layer 2: Text (moves slower)
        
        const icon = card.querySelector('.boutique-card-icon');
        const text1 = card.querySelector('.boutique-card-name');
        const text2 = card.querySelector('.boutique-card-price');
        const btn = card.querySelector('.boutique-own-btn');
        const progress = card.querySelector('.purchase-progress-wrap');
        
        if (icon) {
          icon.style.transform = `translate3d(0, ${centerOffset * 0.05}px, 0)`;
          icon.style.transition = 'none'; 
        }
        
        [text1, text2, btn, progress].forEach(el => {
          if (el) {
            el.style.transform = `translate3d(0, ${centerOffset * 0.015}px, 0)`;
            el.style.transition = 'none';
          }
        });
      });
    }

    // --- PROFILE TAB PARALLAX ---
    if (scrollContainer.id === 'profile-tab') {
      
      // 1. Profile Hero Section Parallax
      const hero = scrollContainer.querySelector('.profile-hero-card');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const avatarCol = hero.querySelector('.phc-avatar-col');
        const infoCol = hero.querySelector('.phc-info-col');
        
        // Only apply if visible and scrolling up (rect.top < 0)
        if (rect.bottom > 0) {
          // Push down as it scrolls up (negative rect.top)
          
          // Base offset is roughly where it starts (116px), so it parallaxes immediately
          const offset = 116 - rect.top; 
 
          
          if (avatarCol) {
            avatarCol.style.transform = `translate3d(0, ${offset * 0.15}px, 0)`;
            avatarCol.style.transition = 'none';
          }
          if (infoCol) {
            infoCol.style.transform = `translate3d(0, ${offset * 0.06}px, 0)`;
            infoCol.style.transition = 'none';
          }
        }
      }
      
      // 2. Profile Collection Grid Parallax
      const collectionCards = scrollContainer.querySelectorAll('#profileCollectionGrid .pcs-item-card');
      collectionCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > containerHeight) return;
        
        const centerOffset = (rect.top + rect.height / 2) - (containerHeight / 2);
        
        const icon = card.querySelector('.boutique-card-icon');
        const info = card.querySelector('.pcs-item-info');
        
        if (icon) {
          const yIcon = centerOffset * 0.04;
          icon.style.transform = `translate3d(0, ${yIcon}px, 0)`;
          icon.style.transition = 'none';
        }
        if (info) {
          const yInfo = centerOffset * 0.01;
          info.style.transform = `translate3d(0, ${yInfo}px, 0)`;
          info.style.transition = 'none';
        }
      });
    }
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

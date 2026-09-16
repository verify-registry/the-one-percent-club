/* === 1. CONFIG & GLOBAL STATE === */
// ==========================================
// CENTRAL LOCALIZATION SYSTEM
// ==========================================

const savedLang = localStorage.getItem("one_percent_lang");
let currentLang = savedLang === "ar" ? "ar" : "en";

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

  // --- Theme Mode Logic ---
  const savedTheme = localStorage.getItem("app_theme") || "dark";
  const themeToggle = document.getElementById("themeToggle");
  const themeDesc = document.getElementById("themeDesc");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeToggle) themeToggle.checked = true;
    if (themeDesc) {
      themeDesc.setAttribute("data-i18n", "settings.theme_light");
      themeDesc.textContent = window.t("settings.theme_light", currentLang);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", (e) => {
      const isLight = e.target.checked;
      if (isLight) {
        document.body.classList.add("light-mode");
        localStorage.setItem("app_theme", "light");
        if (themeDesc) {
          themeDesc.setAttribute("data-i18n", "settings.theme_light");
          themeDesc.textContent = window.t("settings.theme_light", currentLang);
        }
      } else {
        document.body.classList.remove("light-mode");
        localStorage.setItem("app_theme", "dark");
        if (themeDesc) {
          themeDesc.setAttribute("data-i18n", "settings.theme_dark");
          themeDesc.textContent = window.t("settings.theme_dark", currentLang);
        }
      }
      
      // trigger resize event so that Guilloche canvas redraws if needed
      window.dispatchEvent(new Event("resize"));
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
    title: window.t("boutique.stars"),
    items: [
      {
        id: "star1",
        name: window.t("items.star1"),
        icon: "star",
        rarity: 1,
        price: 1000,
        lore: window.t("items.star2"),
      },
      {
        id: "star2",
        name: window.t("items.star3"),
        icon: "star",
        rarity: 2,
        price: 2500,
        lore: window.t("items.star4"),
      },
    ],
  },
  crowns: {
    title: window.t("boutique.crowns"),
    items: [
      {
        id: "crown1",
        name: window.t("items.crown1"),
        icon: "crown",
        rarity: 3,
        price: 5000,
        lore: window.t("items.crown2"),
      },
      {
        id: "crown2",
        name: window.t("items.crown3"),
        icon: "crown",
        rarity: 4,
        price: 15000,
        lore: window.t("items.crown4"),
      },
    ],
  },
  auras: {
    title: window.t("boutique.auras"),
    items: [
      {
        id: "aura1",
        name: window.t("items.aura1"),
        icon: "aura",
        rarity: 2,
        price: 2000,
        lore: window.t("items.aura2"),
      },
      {
        id: "aura2",
        name: window.t("items.aura3"),
        icon: "aura",
        rarity: 3,
        price: 8000,
        lore: window.t("items.aura4"),
      },
    ],
  },
  jewelry: {
    title: window.t("boutique.jewelry"),
    items: [
      {
        id: "ring1",
        name: window.t("items.ring1"),
        icon: "ring",
        rarity: 2,
        price: 3000,
        lore: window.t("items.ring2"),
      },
      {
        id: "ring2",
        name: window.t("items.ring3"),
        icon: "ring",
        rarity: 3,
        price: 7500,
        lore: window.t("items.ring4"),
      },
    ],
  },
  artifacts: {
    title: window.t("boutique.rare"),
    items: [
      {
        id: "art1",
        name: window.t("items.rare1"),
        icon: "pendant",
        rarity: 3,
        price: 10000,
        lore: window.t("items.rare2"),
      },
      {
        id: "art2",
        name: window.t("items.rare3"),
        icon: "pendant",
        rarity: 4,
        price: 25000,
        lore: window.t("items.rare4"),
      },
    ],
  },
  widgets: {
    title: window.t("boutique.widgets"),
    items: [
      {
        id: "wid1",
        name: window.t("items.widget1"),
        icon: "star",
        rarity: 1,
        price: 0,
        free: true,
        lore: window.t("items.widget2"),
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
      if (savedProfile) Object.assign(this.user, savedProfile);
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
    localStorage.setItem(
      `channels_${this.user.id}`,
      JSON.stringify(this.channels),
    );
    localStorage.setItem(`profile_${this.user.id}`, JSON.stringify(this.user));
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
    
    if (oldTier && oldTier !== this.member.tier) {
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
      if (!this.user.collectedItems) this.user.collectedItems = [];
      this.user.collectedItems.push(item);
      localStorage.setItem(
        "one_percent_collection",
        JSON.stringify(this.user.collectedItems),
      );
      this.recalculatePrestige();
      this.save();
      this.notify();
      return true;

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

function generateSkeletonGrid() {
  let html = '<div class="boutique-grid">';
  for (let i = 0; i < 6; i++) {
    html += `
      <div class="boutique-card is-skeleton" style="pointer-events: none; opacity: 0.6; animation: pulse 1.5s infinite ease-in-out;">
        <span class="rarity-badge" style="background: #2a2a2a; color: transparent; width: 40px; height: 16px;"></span>
        <span class="boutique-card-icon">
          <span class="boutique-card-fallback" style="background: #222; border-radius: 50%; width: 40px; height: 40px; display: block;"></span>
        </span>
        <span class="boutique-card-name" style="background: #222; width: 60%; height: 12px; margin: 8px auto; border-radius: 4px;"></span>
        <span class="boutique-card-price" style="background: #222; width: 40%; height: 12px; margin: 0 auto; border-radius: 4px;"></span>
      </div>
    `;
  }
  html += "</div>";
  return html;
}

/* === 3. BOUTIQUE & STORE RENDERING === */
function renderBoutique(filter = "all") {
  const root = document.getElementById("boutiqueSections");
  const owned = ClubState.owned;
  const equipped = ClubState.equipped;
  const categories = filter === "all" ? Object.keys(BOUTIQUE) : [filter];

  if (!root.dataset.skeletonShown) {
    root.innerHTML = generateSkeletonGrid();
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

          let btnText, btnClass;
          if (item.free) {
            btnText = window.t("boutique.ownedCheck");
            btnClass = "btn-free";
          } else if (isEquipped) {
            btnText = window.t("boutique.equippedCheck");
            btnClass = "btn-equipped";
          } else if (isOwned && canEquip) {
            btnText = window.t("boutique.equip");
            btnClass = "btn-equip";
          } else if (isOwned) {
            btnText = window.t("boutique.owned");
            btnClass = "btn-owned";
          } else {
            btnText = window.t("boutique.acquire");
            btnClass = "";
          }

          const cardClass = `boutique-card${isOwned ? " is-owned" : ""}${isEquipped ? " is-equipped" : ""}`;
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

          return `
        <div class="${cardClass}" onclick='openInspectionModal(${JSON.stringify(item)}, "${catKey}", ${isOwned}, ${isEquipped})' style="cursor: pointer;">
          <span class="rarity-badge rarity-${item.rarity}">${RARITY_LABEL[item.rarity]()}</span>
          <span class="boutique-card-icon">
            <span class="boutique-card-fallback" style="display:flex">${ICONS[item.icon] || ICONS["star"]}</span>
          </span>
          <span class="boutique-card-name">${item.name}</span>
          ${priceHtml}
          ${progressHtml}
          <button class="boutique-own-btn ${btnClass}" type="button" style="pointer-events: none;">
            ${btnText}
          </button>
        </div>
      `;
        })
        .join("");

      return `
      <section class="boutique-section" data-category="${catKey}">
        <div class="boutique-section-head">
          <h3>${cat.title}</h3>
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
        <p>لا توجد مقتنيات</p>
        <span style="max-width: 280px; margin-bottom: 0;">لا توجد أي قطع تتوافق مع التصنيف الحالي.</span>
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

        showQuickPreview(item, wasAutoEquipped);
        if (navigator.vibrate) navigator.vibrate(50);
        if (window.AudioEngine) window.AudioEngine.playRustle();
      }, 400); // 400ms for long press
    };

    const endPress = (e) => {
      clearTimeout(pressTimer);
      if (isLongPress) {
        hideQuickPreview();
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
        <h3>${BOUTIQUE.widgets.title}</h3>
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
      p.hidden = true;
    });

    const activePage = document.getElementById(`${tab}-tab`);
    if (activePage) {
      activePage.classList.add("is-active");
      activePage.hidden = false;
    }

    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("is-active"));
    const activeNav = document.querySelector(`.nav-item[data-tab="${tab}"]`);
    if (activeNav) activeNav.classList.add("is-active");

    const main = document.querySelector(".app-main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
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
    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("is-active"));

    const main = document.querySelector(".app-main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
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
  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "gold-confetti-particle";

    particle.style.left = Math.random() * 100 + "vw";

    const duration = Math.random() * 2 + 1.5;
    particle.style.animationDuration = duration + "s";

    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    particle.style.animationDelay = Math.random() * 0.5 + "s";

    const scale = Math.random() * 0.5 + 0.5;
    particle.style.width = 6 * scale + "px";
    particle.style.height = 12 * scale + "px";

    document.body.appendChild(particle);

    setTimeout(
      () => {
        particle.remove();
      },
      (duration + 0.5) * 1000,
    );
  }
}

window.unlockAchievement = function (id, title, desc) {
  let unlocked = [];
  try {
    unlocked = JSON.parse(localStorage.getItem("club_achievements")) || [];
  } catch (e) {}

  if (!unlocked.includes(id)) {
    unlocked.push(id);
    localStorage.setItem("club_achievements", JSON.stringify(unlocked));
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
          `Good evening, ${userName}. How may the Concierge Desk assist you today?`,
          "Please let me know if you require any private arrangements or technical support.",
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
        {
          member: lordJulian,
          text: `Good evening, ${userName}. Lord Julian here, currently reviewing the London exchange.`,
        },
        {
          member: marcus,
          text: `Present, sir. Marcus Sterling at your disposal. What's on your mind?`,
        },
        {
          member: others[Math.floor(Math.random() * others.length)],
          text: `Welcome to the lounge, ${userName}. A few of us are here observing the latest market movements.`,
        },
      ];
      return responses[Math.floor(Math.random() * responses.length)];
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
        "The London and Dubai markets are showing interesting divergence today.",
        "Private equity acquisitions in the tech sector are currently undervalued.",
        `We are exploring a new hedge fund opportunity. Happy to discuss it privately, ${userName}.`,
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
        "Just acquired a vintage Patek. The craftsmanship is unparalleled.",
        `Sotheby's has an interesting auction next week. Are you attending, ${userName}?`,
        "True luxury is about absolute scarcity and historical significance.",
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
      `Fascinating perspective, ${userName}. Let us discuss this further.`,
      "Indeed. The current environment rewards patience and precise execution.",
      "I see your point. Quality always reveals itself over time.",
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

  document.getElementById("inspectionTitle").textContent = item.name;
  document.getElementById("inspectionRarity").textContent =
    RARITY_LABEL[item.rarity]();
  document.getElementById("inspectionLore").textContent =
    item.lore || window.t("dynamic.loreDefault");

  const svgContent = ICONS[item.icon] || ICONS["crown"];
  document.getElementById("inspectionImage").innerHTML = svgContent;

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
  document.getElementById("inspectionModal").hidden = true;
});

function processPurchase(item) {
  return ClubState.purchase(item);
}

function purchaseItem(item, catKey) {
  if (processPurchase(item)) {
    closeInspectionModal();
    playPurchaseAnimation();
    if (window.AudioEngine) {
      window.AudioEngine.playChime();
    }
  }
}
function equipItem(item, catKey) {
  ClubState.toggleEquip(catKey, item.id);
  closeInspectionModal();
}
function updateMasterCard() {
  const pmItems = document.getElementById("pmItemsCollected");
  if (pmItems) {
    pmItems.textContent = (AppState.user.collectedItems || []).length;
  }

  const wealthValueEl = document.getElementById("wealthValue");
  const privValueEl = document.getElementById("privValue");
  if (wealthValueEl && privValueEl) {
    const totalSpent = AppState.user.totalSpent || 0;
    const itemsCount = (AppState.user.collectedItems || []).length;

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

  document.getElementById("qpName").textContent = item.name;

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
  document.getElementById("qpLore").textContent = lore;

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
            <div class="profile-eq-name">${itemDef.name}</div>
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
      document.getElementById("accEmailInput").value =
        AppState.user.email || "";
      document.getElementById("accPhoneInput").value =
        AppState.user.phone || "";
      accountInfoModal.classList.add("is-open");
    });
  }
  document
    .getElementById("closeAccountInfoModal")
    ?.addEventListener("click", () => {
      accountInfoModal?.classList.remove("is-open");
    });
  document
    .getElementById("saveAccountInfoBtn")
    ?.addEventListener("click", () => {
      AppState.user.email = document
        .getElementById("accEmailInput")
        .value.trim();
      AppState.user.phone = document
        .getElementById("accPhoneInput")
        .value.trim();
      AppState.save();
      accountInfoModal?.classList.remove("is-open");
    });

  const menuHelp = document.getElementById("menuHelp");
  const helpSupportModal = document.getElementById("helpSupportModal");
  if (menuHelp && helpSupportModal) {
    menuHelp.addEventListener("click", () => {
      helpSupportModal.classList.add("is-open");
    });
  }
  document
    .getElementById("closeHelpSupportModal")
    ?.addEventListener("click", () => {
      helpSupportModal?.classList.remove("is-open");
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
    });
  }
  if (closeSettingsModal && settingsModal) {
    closeSettingsModal.addEventListener("click", () => {
      settingsModal.classList.remove("is-open");
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
    });
  }
  if (closeLogoutConfirmModal && logoutConfirmModal) {
    closeLogoutConfirmModal.addEventListener("click", () => {
      logoutConfirmModal.classList.remove("is-open");
    });
  }
  if (btnCancelLogout && logoutConfirmModal) {
    btnCancelLogout.addEventListener("click", () => {
      logoutConfirmModal.classList.remove("is-open");
    });
  }
  if (btnConfirmLogout) {
    btnConfirmLogout.addEventListener("click", () => {
      localStorage.clear();
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
      <div class="tooltip-row"><span style="color:${colors.wealth}">الثروة</span> <span>${d.wealth}%</span></div>
      <div class="tooltip-row"><span style="color:${colors.priv}">الامتيازات</span> <span>${d.priv}%</span></div>
      <div class="tooltip-row"><span style="color:${colors.conn}">الاتصالات</span> <span>${d.conn}%</span></div>
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
function renderProfileAchievements() {
  const container = document.getElementById("profileAchievementsGrid");
  const summaryContainer = document.getElementById("achievementsSummary");
  if (!container) return;

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
        <div class="honor-card is-locked gyro-element" data-tilt data-tooltip="${window.t("honors.desc_" + id).replace(/"/g, "&quot;")}">
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

function renderProfileCollection() {
  const container = document.getElementById("profileCollectionGrid");
  if (!container) return;

  const collectedItems = (AppState.user.collectedItems || [])
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
    const isAr =
      AppState.language === "ar" || document.documentElement.lang === "ar";
    const emptyText = isAr
      ? "الخزينة فارغة حالياً. تفضل باقتناء أولى قطعك من البوتيك."
      : "Your vault is empty. Acquire your first asset from the Boutique.";
    const btnText = isAr ? "استكشاف البوتيك" : "Explore Boutique";

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

      html += `
        <div class="pcs-item-card gyro-element" data-tilt>
          <div class="pcs-item-image">
            <span class="boutique-card-fallback" style="display:flex; font-size: 24px; color: #d4af37;">${ICONS[item.icon] || ICONS["star"]}</span>
          </div>
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

function initEditProfileModal() {
  const photoGrid = document.getElementById("editProfilePhotoGrid");
  if (photoGrid) {
    photoGrid.innerHTML = profilePhotos
      .map(
        (url, i) => `
      <div class="edit-profile-photo-opt ${url === selectedProfilePhoto ? "selected" : ""}"
           style="background-image: url('${url}')"
           data-url="${url}">
      </div>
    `,
      )
      .join("");

    const opts = photoGrid.querySelectorAll(".edit-profile-photo-opt");
    opts.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        opts.forEach((o) => o.classList.remove("selected"));
        e.target.classList.add("selected");
        selectedProfilePhoto = e.target.dataset.url;
      });
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
  ?.addEventListener("input", saveProfileDraft);

document.getElementById("editAccountBtn")?.addEventListener("click", () => {
  const modal = document.getElementById("editProfileModal");
  if (modal) {
    let draft = null;
    try {
      draft = JSON.parse(localStorage.getItem("profileDraft"));
    } catch (e) {}

    if (draft) {
      document.getElementById("editProfileNameInput").value = draft.name || "";
      document.getElementById("editProfileQuoteInput").value =
        draft.quote || "";
      document.getElementById("editProfileAvatarUrl").value =
        draft.avatarUrl || "";
    } else {
      document.getElementById("editProfileNameInput").value =
        AppState.user.name || "";
      document.getElementById("editProfileQuoteInput").value =
        AppState.user.quote || AppState.user.bio || "";
      document.getElementById("editProfileAvatarUrl").value =
        AppState.user.avatarUrl || "";
    }

    initEditProfileModal();
    modal.classList.add("is-open");
  }
});

document
  .getElementById("closeEditProfileModal")
  ?.addEventListener("click", () => {
    document.getElementById("editProfileModal")?.classList.remove("is-open");
  });

document.getElementById("saveEditProfileBtn")?.addEventListener("click", () => {
  const nameInput = document
    .getElementById("editProfileNameInput")
    .value.trim();
  const quoteInput = document
    .getElementById("editProfileQuoteInput")
    .value.trim();
  let avatarUrl = document.getElementById("editProfileAvatarUrl").value.trim();

  if (nameInput) AppState.user.name = nameInput;
  if (nameInput) AppState.user.username = nameInput; // Sync username
  if (quoteInput) AppState.user.quote = quoteInput;
  if (quoteInput) AppState.user.bio = quoteInput;
  if (avatarUrl) AppState.user.avatarUrl = avatarUrl;

  if (!avatarUrl && typeof selectedProfilePhoto !== "undefined") {
    AppState.user.avatarUrl = selectedProfilePhoto;
  }

  AppState.save();
  updateUI();
  localStorage.removeItem("profileDraft"); // Clear draft on successful save
  document.getElementById("editProfileModal")?.classList.remove("is-open");
});

function renderProfileStatsBar() {
  const container = document.getElementById("profileStatsBar");
  if (!container) return;

  const lang = document.documentElement.lang || "en";

  const levelVal = lang === "ar" ? "سيادي" : "SOVEREIGN";
  const levelLabel = lang === "ar" ? "رتبة العضوية" : "MEMBERSHIP LEVEL";

  const itemsVal = AppState.user.collectedItems
    ? AppState.user.collectedItems.length
    : 0;
  const itemsLabel = lang === "ar" ? "المقتنيات" : "ITEMS COLLECTED";

  const connectionsVal = "248";
  const connectionsLabel = lang === "ar" ? "شبكة المعارف" : "CONNECTIONS";

  const sinceVal = lang === "ar" ? "يناير 2024" : "Jan 2024";
  const sinceLabel = lang === "ar" ? "عضو منذ" : "MEMBER SINCE";

  container.innerHTML = `
    <div class="psb-col">
      <svg class="psb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 17l2-10 4 4 4-7 4 7 4-4 2 10z"></path></svg>
      <div class="psb-value">${levelVal}</div>
      <div class="psb-label">${levelLabel}</div>
    </div>
    <div class="psb-divider"></div>
    <div class="psb-col">
      <svg class="psb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      <div class="psb-value" id="pmItemsCollected">${itemsVal}</div>
      <div class="psb-label">${itemsLabel}</div>
    </div>
    <div class="psb-divider"></div>
    <div class="psb-col">
      <svg class="psb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      <div class="psb-value">${connectionsVal}</div>
      <div class="psb-label">${connectionsLabel}</div>
    </div>
    <div class="psb-divider"></div>
    <div class="psb-col">
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

    html += `
    <div class="leader-item">
      <div class="leader-rank">${rank}</div>
      <div class="leader-avatar">
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

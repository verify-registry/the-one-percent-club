let currentOwnershipFilter = 'all';
const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 16.9 6.2 20l1.1-6.5L2.5 8.9l6.6-.9L12 2z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20l1-9 4 3 3-7 3 7 4-3 1 9z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  aura: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#C79A3E" stroke-width="1.8"/><circle cx="12" cy="12" r="4.5" stroke="#C79A3E" stroke-width="0.6" opacity="0.5"/></svg>`,
  ring: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="6" stroke="#C79A3E" stroke-width="1.8"/><path d="M9 8l3-5 3 5-3 2z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  pendant: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v6" stroke="#C79A3E" stroke-width="1.6"/><path d="M8 9h8l-4 12z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
};
const RARITY_LABEL = { 1: "نادر", 2: "ملحمي", 3: "أسطوري", 4: "سيادي" };
const EQUIP_CATEGORIES = {
  stars: "equippedStarsSlot",
  crowns: "equippedCrownSlot",
  auras: "equippedAuraSlot",
  jewelry: "equippedRingSlot"
};

const ACHIEVEMENTS_DATA = {
  'initiate': {
    name: 'THE INITIATE',
    title: 'FIRST STEP',
    desc: 'Boutique threshold: 1 Artifact or $5,000 spent.',
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C9.24 2 7 4.24 7 7C7 9.38 8.67 11.37 10.9 11.87L10 22H14L13.1 11.87C15.33 11.37 17 9.38 17 7C17 4.24 14.76 2 12 2ZM12 8.5C11.17 8.5 10.5 7.83 10.5 7C10.5 6.17 11.17 5.5 12 5.5C12.83 5.5 13.5 6.17 13.5 7C13.5 7.83 12.83 8.5 12 8.5Z" fill="currentColor"/></svg>',
    isUnlocked: () => Object.keys(ClubState.owned).length >= 1 || (ClubState.totalSpent || 0) >= 5000,
    target: 5000,
    progress: () => Math.max(Object.keys(ClubState.owned).length ? 5000 : 0, ClubState.totalSpent || 0)
  },
  'connoisseur': {
    name: 'THE CONNOISSEUR',
    title: 'COLLECTOR',
    desc: 'Boutique threshold: 3 Artifacts or $25,000 spent.',
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 9L12 22L22 9L12 2ZM12 5.82L17.18 9L12 18.02L6.82 9L12 5.82Z" fill="currentColor"/></svg>',
    isUnlocked: () => Object.keys(ClubState.owned).length >= 3 || (ClubState.totalSpent || 0) >= 25000,
    target: 25000,
    progress: () => Math.max(Object.keys(ClubState.owned).length >= 3 ? 25000 : 0, ClubState.totalSpent || 0)
  },
  'high_sovereign': {
    name: 'HIGH SOVEREIGN',
    title: 'ELITE STATUS',
    desc: 'Boutique threshold: $50,000 cumulative spend.',
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.5 2 5 4 5 9C5 12.5 7 16 12 21C17 16 19 12.5 19 9C19 4 15.5 2 12 2ZM12 17.5C8.5 13.5 7 11 7 9C7 5.5 9.5 4 12 4C14.5 4 17 5.5 17 9C17 11 15.5 13.5 12 17.5Z" fill="currentColor"/><circle cx="12" cy="9" r="3" fill="currentColor"/></svg>',
    isUnlocked: () => (ClubState.totalSpent || 0) >= 50000,
    target: 50000,
    progress: () => ClubState.totalSpent || 0
  },
  'apex_titan': {
    name: 'THE APEX TITAN',
    title: 'MAXIMUM PRESTIGE',
    desc: 'Boutique threshold: $100,000 cumulative spend.',
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M2 17l2-10 4 4 4-7 4 7 4-4 2 10z" fill="currentColor"/><rect x="3" y="19" width="18" height="2" fill="currentColor"/></svg>',
    isUnlocked: () => (ClubState.totalSpent || 0) >= 100000,
    target: 100000,
    progress: () => ClubState.totalSpent || 0
  }
};

const BOUTIQUE = {
  stars: { title: "النجوم", items: [
    { id: "star1", name: "نجمة النخبة", icon: "star", rarity: 1, price: 1000, lore: "نجمة ماسية" },
    { id: "star2", name: "نجمة السيادة", icon: "star", rarity: 2, price: 2500, lore: "نجمة ذهبية" }
  ]},
  crowns: { title: "التيجان", items: [
    { id: "crown1", name: "تاج سيادي", icon: "crown", rarity: 3, price: 5000, lore: "تاج الملك" },
    { id: "crown2", name: "تاج الإمبراطور", icon: "crown", rarity: 4, price: 15000, lore: "تاج فريد" }
  ]},
  auras: { title: "الهالات", items: [
    { id: "aura1", name: "هالة ملكية", icon: "aura", rarity: 2, price: 2000, lore: "هالة القوة" },
    { id: "aura2", name: "هالة النخبة", icon: "aura", rarity: 3, price: 8000, lore: "هالة غامضة" }
  ]},
  jewelry: { title: "المجوهرات", items: [
    { id: "ring1", name: "خاتم السلطة", icon: "ring", rarity: 2, price: 3000, lore: "خاتم ثمين" },
    { id: "ring2", name: "خاتم النخبة", icon: "ring", rarity: 3, price: 7500, lore: "خاتم أسطوري" }
  ]},
  artifacts: { title: "المقتنيات النادرة", items: [
    { id: "art1", name: "تحفة نادرة", icon: "pendant", rarity: 3, price: 10000, lore: "قطعة نادرة" },
    { id: "art2", name: "قلادة السيادة", icon: "pendant", rarity: 4, price: 25000, lore: "قلادة فريدة" }
  ]},
  widgets: { title: "الودجت", items: [
    { id: "wid1", name: "الودجت الذهبي", icon: "star", rarity: 1, price: 0, free: true, lore: "ودجت مجاني" }
  ]}
};

// ==========================================
// ECONOMY & STATE LOGIC (CENTRALIZED REACTIVE STATE)
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
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
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
  activeChannelId: 'global-lounge',
  channels: {
    'global-lounge': { name: 'صالة الأعضاء', messages: [] },
    'wealth': { name: 'الثروة والاستثمار', messages: [] },
    'business': { name: 'الأعمال والفرص', messages: [] },
    'lifestyle': { name: 'أسلوب الحياة', messages: [] }
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
      this.listeners.forEach(fn => fn(this));
      this.emit('change', this);
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
    this._subscribers[event].forEach(cb => cb(data));
  },
  
  // Backwards compatibility for app.js references to ClubState.member
  get member() { return this.user; },
  set member(val) { this.user = val; },
  get collectedItems() { return Object.keys(this.owned); },
  
  init() {
    const savedAvatar = localStorage.getItem('avatar_' + this.user.id);
    if (savedAvatar) this.user.avatarUrl = savedAvatar;

    const savedBalance = localStorage.getItem(`balance_${this.user.id}`);
    this.balance = savedBalance !== null ? parseInt(savedBalance, 10) : 24750;
    const savedSpent = localStorage.getItem(`spent_${this.user.id}`);
    this.totalSpent = savedSpent !== null ? parseInt(savedSpent, 10) : 0;
    const savedCredits = localStorage.getItem(`chatCredits_${this.user.id}`);
    this.chatCredits = savedCredits !== null ? parseInt(savedCredits, 10) : 10;
    try { this.owned = JSON.parse(localStorage.getItem(`owned_${this.user.id}`)) || {}; } catch { this.owned = {}; }
    try { this.equipped = JSON.parse(localStorage.getItem(`equipped_${this.user.id}`)) || {}; } catch { this.equipped = {}; }
    try { 
      const savedChannels = JSON.parse(localStorage.getItem(`channels_${this.user.id}`));
      if (savedChannels) {
        for (const k in savedChannels) {
          if (this.channels[k]) this.channels[k].messages = savedChannels[k].messages;
        }
      }
    } catch {}
    
    try { 
      const savedProfile = JSON.parse(localStorage.getItem(`profile_${this.user.id}`));
      this.user.bio = this.user.bio || "عضو نشط في النادي";
      this.user.interests = this.user.interests || "التصميم · التكنولوجيا";
      this.user.location = this.user.location || "دبي، الإمارات";
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
    localStorage.setItem(`equipped_${this.user.id}`, JSON.stringify(this.equipped));
    localStorage.setItem(`channels_${this.user.id}`, JSON.stringify(this.channels));
    localStorage.setItem(`profile_${this.user.id}`, JSON.stringify(this.user));
    if (typeof window.updateRadarChart === "function") window.updateRadarChart();
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
          addedWealth += (item.wealthImpact || item.rarity * 2);
          addedPrivilege += (item.privilegeImpact || item.rarity * 1.5);
          if (item.rarity > maxRarity) maxRarity = item.rarity;
        }
      }
    }
      
    this.member.wealthIndexValue = Math.min(99, Math.floor(82 + addedWealth));
    this.member.privilegesValue = Math.min(99, Math.floor(70 + addedPrivilege));
    this.member.connectionsValue = Math.min(99, Math.floor(65 + totalItems * 2));
      
    if (totalItems >= 5 && maxRarity >= 3) {
      this.member.tier = "SOVEREIGN EXARCH";
    } else if (totalItems >= 2) {
      this.member.tier = "SOVEREIGN LUMINARY";
    } else {
      this.member.tier = "SOVEREIGN MEMBER";
    }
    
    const tierNameEl = document.getElementById("tierName");
    if (tierNameEl) tierNameEl.textContent = this.member.tier;
  },

  purchase(item) {
    if (this.balance >= item.price && !this.owned[item.id]) {
      this.balance -= item.price;
      this.totalSpent = (this.totalSpent || 0) + item.price;
      this.owned[item.id] = true;
      this.recalculatePrestige();
      this.save();
      
      // Check for newly unlocked honors
      Object.keys(ACHIEVEMENTS_DATA).forEach(key => {
        const ach = ACHIEVEMENTS_DATA[key];
        if (ach.isUnlocked()) {
           if (window.unlockAchievement) {
             window.unlockAchievement(key, ach.name, ach.title);
           }
        }
      });
      
      // Emit change event for UI updates
      if (this._subscribers['change']) {
        this._subscribers['change'].forEach(cb => cb());
      }
      
      if (typeof updateUI === 'function') updateUI();
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
    if (typeof updateUI === 'function') updateUI();
  }
};
const ClubState = AppState;
Object.defineProperty(AppState.user, "balance", { get: () => AppState.balance, set: (v) => AppState.balance = v });
Object.defineProperty(AppState.user, "totalSpent", { get: () => AppState.totalSpent, set: (v) => AppState.totalSpent = v });
Object.defineProperty(AppState.user, "memberSince", { get: () => AppState.user.joined });
Object.defineProperty(AppState.user, "connections", { get: () => AppState.user.connectionsValue });
Object.defineProperty(AppState.user, "collectedItems", { get: () => Object.keys(AppState.owned) });
AppState.init();
document.addEventListener('DOMContentLoaded', () => AppState.notify());

function updateUI() {
  AppState.notify();
}

// ---------------------------------------------------------
// UI SUBSCRIBERS
// ---------------------------------------------------------
ClubState.on('change', () => {

  // Sync Avatars Globally (Master Card, Profile Card, Widgets, etc.)
  const avatarElements = document.querySelectorAll("#profilePortraitPhoto, #widgetAvatarPhoto, .membership-avatar");
  avatarElements.forEach(el => {
    if (AppState.user.avatarUrl) {
      if (el.tagName.toLowerCase() === 'img') {
        el.src = AppState.user.avatarUrl;
      } else {
        el.style.backgroundImage = `url('${AppState.user.avatarUrl}')`;
      }
    }
  });

  // Sync Global IDs
  const idElements = document.querySelectorAll(".membership-id, #profileIdValue");
  idElements.forEach(el => {
    if (el.id === "profileIdValue") {
      el.textContent = AppState.user.id;
    } else {
      el.textContent = "ID: " + AppState.user.id;
    }
  });
  
  const estElements = document.querySelectorAll(".membership-est");
  estElements.forEach(el => {
    el.textContent = AppState.user.est;
  });

  // Sync Profile Text
  const pName = document.getElementById("profileName");
  if (pName) pName.textContent = AppState.user.username || AppState.user.name;
  
  const pBio = document.getElementById("profileBioValue");
  if (pBio && AppState.user.bio) pBio.textContent = AppState.user.bio;
  
  const pInt = document.getElementById("profileInterestsValue");
  if (pInt && AppState.user.interests) pInt.textContent = AppState.user.interests;
  
  const pLoc = document.getElementById("profileLocationValue");
  if (pLoc && AppState.user.location) pLoc.textContent = AppState.user.location;
  
  const pQuote = document.getElementById("profileQuote");
  if (pQuote) pQuote.textContent = '"' + (AppState.user.quote || AppState.user.bio) + '"';

  const mName = document.getElementById("memberName");
  if (mName) mName.textContent = AppState.user.name;

  const balEl = document.getElementById("boutiqueBalanceDisplay");
  if (balEl) balEl.textContent = AppState.balance.toLocaleString("en-US");
  
  // Sync Profile summary counts
  const countEl = document.getElementById("profileItemCount");
  if (countEl) countEl.textContent = AppState.collectedItems.length;

  if (typeof renderProfileCollection === "function") renderProfileCollection();
  if (typeof renderProfileAchievements === "function") renderProfileAchievements();
  
  if (typeof renderRing === "function") {
    renderRing("wealthRing", "wealthValue", AppState.user.wealthIndexValue);
    renderRing("privRing", "privValue", AppState.user.privilegesValue);
  }
  
  if (typeof applyEquippedToCard === "function") applyEquippedToCard(AppState.equipped);
  
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
      const itemDef = BOUTIQUE[catKey].items.find(i => i.id === itemId);
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
  for(let i=0; i<6; i++) {
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
  html += '</div>';
  return html;
}

function renderBoutique(filter = "all") {

  const root = document.getElementById("boutiqueSections");
  const owned = ClubState.owned;
  const equipped = ClubState.equipped;
  const categories = filter === "all" ? Object.keys(BOUTIQUE) : [filter];

  // Show Skeleton First
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

      // Widget 1 special rendering
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
            btnText = "تم الامتلاك ✓";
            btnClass = "btn-free";
          } else if (isEquipped) {
            btnText = "✓ مجهّز — فك التجهيز";
            btnClass = "btn-equipped";
          } else if (isOwned && canEquip) {
            btnText = "تجهيز";
            btnClass = "btn-equip";
          } else if (isOwned) {
            btnText = "مملوك";
            btnClass = "btn-owned";
          } else {
            btnText = "امتلك";
            btnClass = "";
          }

          const cardClass = `boutique-card${isOwned ? " is-owned" : ""}${isEquipped ? " is-equipped" : ""}`;
          const priceHtml = item.free
            ? `<span class="boutique-card-price is-free">مجاني</span>`
            : `<span class="boutique-card-price">${item.price.toLocaleString("en-US")}</span>`;

          let progressHtml = "";
          if (!isOwned && !item.free) {
            const pct = Math.min((currentBalance / item.price) * 100, 100);
            const isReady = pct >= 100;
            progressHtml = `
          <div class="purchase-progress-wrap" aria-label="مدى القدرة على الشراء" title="${Math.floor(pct)}%">
            <div class="purchase-progress-fill ${isReady ? "is-ready" : ""}" style="width: ${pct}%"></div>
          </div>
        `;
          } else {
            // Space filler to keep card heights consistent
            progressHtml = `<div class="purchase-progress-wrap is-transparent"></div>`;
          }

          return `
        <div class="${cardClass}" onclick='openInspectionModal(${JSON.stringify(item)}, "${catKey}", ${isOwned}, ${isEquipped})' style="cursor: pointer;">
          <span class="rarity-badge rarity-${item.rarity}">${RARITY_LABEL[item.rarity]}</span>
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
          <span class="boutique-section-sub">${cat.sub}</span>
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

  // Wire up cards to open inspection modal and handle long press
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

        // Auto-equip check: If owned, and nothing is currently equipped in this category
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
          // Refresh our local flags for the preview
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

    // Touch events for mobile
    card.addEventListener("touchstart", startPress, { passive: true });
    card.addEventListener("touchend", endPress);
    card.addEventListener("touchcancel", endPress);
    card.addEventListener("touchmove", () => {
      clearTimeout(pressTimer);
    });

    // Mouse events for desktop testing
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
        <span class="boutique-section-sub">${BOUTIQUE.widgets.sub}</span>
      </div>
      <p class="widget-preview-label">الودجت — بطاقة الهوية الأساسية</p>
      
      <div class="membership-card widget-card-preview" style="transform: scale(0.9); transform-origin: top center; margin-bottom: -10%;">
        ${cardHTML}
      </div>
      
      <button class="widget-add-btn" type="button" onclick="alert('تم إضافة الودجت لشاشة هاتفك بنجاح')">
        ✓ مجاني — مُفعَّل
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

// Init balance display
const balanceDisplay = document.getElementById("boutiqueBalanceDisplay");
if (balanceDisplay) {
  balanceDisplay.textContent = ClubState.balance.toLocaleString("en-US");
}


updateUI();

// ---------------------------------------------------------
// 15. SHARE / COPY
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
    showCopyToast("تم نسخ الرابط");
  } catch {
    showCopyToast(ClubState.member.verifyUrl);
  }
});

// ---------------------------------------------------------
// 17. BOTTOM NAV
// ---------------------------------------------------------
const navToast = document.getElementById("navToast");
const sectionName = document.getElementById("sectionName");
let navToastTimer = null;

// ==========================================
// UI EFFECTS & ANIMATIONS
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

const PAGE_TITLES = { membership: "العضوية", club: "النادي", profile: "الملف", boutique: "البوتيك" };
const IMPLEMENTED_TABS = ["membership", "profile", "club", "boutique"];

// ==========================================
// NAVIGATION & ROUTER
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
    
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("is-active"));
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
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("is-active"));
    
    const main = document.querySelector(".app-main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  },

  onEnter(tab) {
    if (tab === "club") {
      if (typeof updateCreditsUI === 'function') updateCreditsUI();
      requestAnimationFrame(() => {
        const msgs = document.getElementById("clubMessages");
        if (msgs) window.scrollTo(0, document.body.scrollHeight);
      });
    }
  }
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

// Profile → Shop shortcut
document
  .getElementById("goToShopBtn")
  ?.addEventListener("click", () => goToPage("shop"));

// ---------------------------------------------------------
// 18. CONTEXTUAL NAV (back button)
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
    `عضو ${member.tier}`;
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
  btn.addEventListener("click", () => showNavToast("قريبًا"));
});



document.getElementById("editAccountForm").addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Update State
  ClubState.member.name = document.getElementById("editName").value;
  ClubState.member.username = document.getElementById("editUsername").value;
  ClubState.member.bio = document.getElementById("editBio").value;
  ClubState.member.interests = document.getElementById("editInterests").value;
  ClubState.member.location = document.getElementById("editLocation").value;
  ClubState.save();
  
  ClubState.emit('change');

  document.getElementById("backBtn").hidden = true;
  Router.navigate("profile");
  showPremiumToast("تحديث الملف", "تم حفظ التعديلات بنجاح");
  if (window.unlockAchievement) {
    window.unlockAchievement('profile_updated', 'THE DOSSIER', 'Your personal identity dossier has been updated.');
  }
});

// ---------------------------------------------------------
// INIT
// ---------------------------------------------------------
updateCreditsUI();

// ---------------------------------------------------------
// PREMIUM TOAST
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
// ACHIEVEMENT TOAST & LOGIC
// ---------------------------------------------------------
let achievementToastTimer = null;
window.showAchievementToast = function(title, msg) {
  const toast = document.getElementById("achievementToast");
  if (!toast) return;
  document.getElementById("achToastTitle").textContent = title;
  document.getElementById("achToastMsg").textContent = msg;
  toast.classList.add("is-visible");
  if (window.AudioEngine) AudioEngine.playChime();
  clearTimeout(achievementToastTimer);
  achievementToastTimer = setTimeout(
    () => toast.classList.remove("is-visible"),
    5000
  );
};

function spawnGoldenConfetti() {
  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "gold-confetti-particle";
    
    // Randomize starting position across the top of the screen
    particle.style.left = Math.random() * 100 + "vw";
    
    // Randomize animation duration between 1.5s and 3.5s
    const duration = Math.random() * 2 + 1.5;
    particle.style.animationDuration = duration + "s";
    
    // Randomize starting rotation
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Add varying delay so they don't all fall at exactly the same time
    particle.style.animationDelay = Math.random() * 0.5 + "s";
    
    // Optional: randomly size them slightly differently
    const scale = Math.random() * 0.5 + 0.5;
    particle.style.width = (6 * scale) + "px";
    particle.style.height = (12 * scale) + "px";

    document.body.appendChild(particle);

    // Clean up after animation finishes
    setTimeout(() => {
      particle.remove();
    }, (duration + 0.5) * 1000);
  }
}

window.unlockAchievement = function(id, title, desc) {
  let unlocked = [];
  try {
    unlocked = JSON.parse(localStorage.getItem('club_achievements')) || [];
  } catch (e) {}

  if (!unlocked.includes(id)) {
    unlocked.push(id);
    localStorage.setItem('club_achievements', JSON.stringify(unlocked));
    // Small delay for better UX if triggered by a modal close
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
// ELITE MEMBERS BOT SIMULATOR & CHAT ENGINE
// ==========================================

const ELITE_MEMBERS = [
  { name: 'Lord Julian', tier: 'FOUNDER', id: '001', color: '#e6c27a' },
  { name: 'Elena Rostova', tier: 'SOVEREIGN', id: '084', color: '#d4af37' },
  { name: 'Marcus Sterling', tier: 'TITAN', id: '112', color: '#f3e5ab' },
  { name: 'Concierge Desk', tier: 'SYSTEM', id: '000', color: '#a39b8b' }
];

function processEliteResponse(text) {
  const lower = text.toLowerCase();
  const isArabic = /[\u0600-\u06FF]/.test(text);
  const userName = AppState.user.name ? AppState.user.name.split(' ')[0] : 'Member';

  const lordJulian = ELITE_MEMBERS.find(m => m.id === '001');
  const elena = ELITE_MEMBERS.find(m => m.id === '084');
  const marcus = ELITE_MEMBERS.find(m => m.id === '112');
  const concierge = ELITE_MEMBERS.find(m => m.id === '000');
  
  const others = [lordJulian, elena, marcus];

  // 1. Support & Concierge
  if (lower.includes('help') || lower.includes('support') || lower.includes('rule') || lower.includes('app') || lower.includes('concierge') || lower.includes('مساعدة') || lower.includes('دعم') || lower.includes('قوانين')) {
    const responses = isArabic ? [
      `أهلاً بك يا ${userName}. مكتب الكونسيرج تحت تصرفك، كيف يمكنني مساعدتك؟`,
      "نحن هنا لضمان تجربة سيادية خالية من المتاعب. تفضل بطلبك."
    ] : [
      `Good evening, ${userName}. How may the Concierge Desk assist you today?`,
      "Please let me know if you require any private arrangements or technical support."
    ];
    return { member: concierge, text: responses[Math.floor(Math.random() * responses.length)] };
  }

  // 2. Presence & Greetings
  if (lower.includes('is anyone here') || lower.includes('anyone online') || lower.includes('hello') || lower.includes('hi') || lower.includes('حد هنا') || lower.includes('مين موجود') || lower.includes('مساء الخير') || lower.includes('سلام') || lower.includes('مرحبا') || lower.includes('أهلا')) {
    if (isArabic) {
      const responses = [
        `مساء الخير يا ${userName}. متواجدون لمتابعة مستجدات السوق وأحدث التطورات.`,
        "أهلاً بك في الصالة. نناقش حالياً بعض الفرص الاستثمارية المغلقة.",
        `تحياتي. نحن هنا، تفضل يا ${userName}.`
      ];
      return { member: others[Math.floor(Math.random() * others.length)], text: responses[Math.floor(Math.random() * responses.length)] };
    } else {
      const responses = [
        { member: lordJulian, text: `Good evening, ${userName}. Lord Julian here, currently reviewing the London exchange.` },
        { member: marcus, text: `Present, sir. Marcus Sterling at your disposal. What's on your mind?` },
        { member: others[Math.floor(Math.random() * others.length)], text: `Welcome to the lounge, ${userName}. A few of us are here observing the latest market movements.` }
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }

  // 3. Investment, Wealth & Markets
  if (lower.includes('invest') || lower.includes('market') || lower.includes('stock') || lower.includes('crypto') || lower.includes('real estate') || lower.includes('deal') || lower.includes('استثمار') || lower.includes('سوق') || lower.includes('أعمال') || lower.includes('صفق') || lower.includes('عقار')) {
    if (isArabic) {
      const responses = [
        "السوق العقاري في دبي يقدم فرصاً سيادية ممتازة في الوقت الحالي.",
        "الأسواق تشهد تحركات غير مسبوقة. يجب التركيز على الأصول الصلبة.",
        `نحن ندرس حالياً صندوق تحوط جديد. يسعدني مناقشة التفاصيل معك لاحقاً يا ${userName}.`
      ];
      return { member: [lordJulian, marcus][Math.floor(Math.random() * 2)], text: responses[Math.floor(Math.random() * responses.length)] };
    } else {
      const responses = [
        "The London and Dubai markets are showing interesting divergence today.",
        "Private equity acquisitions in the tech sector are currently undervalued.",
        `We are exploring a new hedge fund opportunity. Happy to discuss it privately, ${userName}.`
      ];
      return { member: [lordJulian, marcus][Math.floor(Math.random() * 2)], text: responses[Math.floor(Math.random() * responses.length)] };
    }
  }

  // 4. Collectibles & Luxury
  if (lower.includes('boutique') || lower.includes('watch') || lower.includes('car') || lower.includes('gold') || lower.includes('art') || lower.includes('rare') || lower.includes('مقتنيات') || lower.includes('ساعة') || lower.includes('قطعة') || lower.includes('نادر') || lower.includes('فخامة') || lower.includes('بوتيك')) {
    if (isArabic) {
      const responses = [
        "الساعات النادرة والقطع الفنية تمثل الملاذ الآمن الحقيقي للأصول.",
        `البوتيك يعرض قطعاً سيادية تستحق الاهتمام. لا تفوت الفرصة يا ${userName}.`,
        "الندرة المطلقة هي ما يحدد القيمة الحقيقية لأي قطعة."
      ];
      return { member: [lordJulian, elena][Math.floor(Math.random() * 2)], text: responses[Math.floor(Math.random() * responses.length)] };
    } else {
      const responses = [
        "Just acquired a vintage Patek. The craftsmanship is unparalleled.",
        `Sotheby's has an interesting auction next week. Are you attending, ${userName}?`,
        "True luxury is about absolute scarcity and historical significance."
      ];
      return { member: [lordJulian, elena][Math.floor(Math.random() * 2)], text: responses[Math.floor(Math.random() * responses.length)] };
    }
  }

  // 5. Fallback
  if (isArabic) {
    const responses = [
      `وجهة نظر مثيرة للاهتمام يا ${userName}. نتفق في هذا التوجه.`,
      "بالتأكيد. القرارات المدروسة هي ما يميز أعضاء هذا النادي.",
      "أتفق معك تماماً. الجودة والأصالة دائماً ما تثبت نفسها مع الوقت."
    ];
    return { member: others[Math.floor(Math.random() * others.length)], text: responses[Math.floor(Math.random() * responses.length)] };
  } else {
    const responses = [
      `Fascinating perspective, ${userName}. Let us discuss this further.`,
      "Indeed. The current environment rewards patience and precise execution.",
      "I see your point. Quality always reveals itself over time."
    ];
    return { member: others[Math.floor(Math.random() * others.length)], text: responses[Math.floor(Math.random() * responses.length)] };
  }
}
function switchChannel(channelId) {
  AppState.activeChannelId = channelId;
  const channelData = AppState.channels[channelId] || { name: 'صالة الأعضاء', messages: [] };
  
  document.querySelectorAll(".club-room-btn").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.channel === channelId);
  });
  
  const pinnedTitle = document.getElementById("clubPinnedTitle");
  if (pinnedTitle) pinnedTitle.textContent = `أهلًا بك في ${channelData.name}`;
  
  if (window.AudioEngine) window.AudioEngine.playRustle();
  renderMessages();
}

document.querySelectorAll(".club-room-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const badge = btn.querySelector(".room-badge");
    if (badge) badge.remove();
    switchChannel(btn.dataset.channel);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  switchChannel('global-lounge');
});

function renderMessages() {
  const container = document.getElementById("clubMessages");
  if (!container) return;
  
  const channelId = AppState.activeChannelId;
  const messages = AppState.channels[channelId]?.messages || [];
  
  container.innerHTML = messages.map(msg => {
    const isMe = msg.senderId === AppState.user.id;
    const timeStr = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
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
              <span style="font-size: 10px; color: ${msg.senderColor || '#d4af37'}; font-weight: bold; font-family: 'Cinzel', serif;">${msg.senderName}</span>
              <span style="font-size: 8px; color: #8a7a5a; background: rgba(212,175,55,0.1); padding: 2px 6px; border-radius: 4px;">${msg.senderTier || 'MEMBER'}</span>
            </div>
            <div class="chat-text">${msg.text}</div>
            <div class="chat-meta">
              <span class="chat-time">${timeStr}</span>
            </div>
          </div>
        </div>
      `;
    }
  }).join('');
  
  container.scrollTop = container.scrollHeight;
}

let typingTimeout;
function handleSendMessage() {
  const input = document.getElementById("clubInput");
  const text = input.value.trim();
  if (!text) return;
  
  const channelId = AppState.activeChannelId;
  if (!AppState.channels[channelId]) AppState.channels[channelId] = { messages: [] };
  
  AppState.channels[channelId].messages.push({
    senderId: AppState.user.id,
    text: text,
    timestamp: Date.now()
  });
  
  input.value = "";
  if (window.AudioEngine) window.AudioEngine.playSend(); // Assuming playSend exists or will fallback
  AppState.save();
  renderMessages();
  
  // Trigger Elite Bot Simulator
  clearTimeout(typingTimeout);
  
  const indicator = document.getElementById("typingIndicator");
  const typingName = document.getElementById("typingName");
  
  setTimeout(() => {
    const { member: elite, text: replyText } = processEliteResponse(text);
    if (typingName) typingName.textContent = elite.name;
    if (indicator) indicator.style.display = "flex";
    
    // Typing delay between 1.5 and 2.5 seconds
    typingTimeout = setTimeout(() => {
      if (indicator) indicator.style.display = "none";
      
      AppState.channels[channelId].messages.push({
        senderId: elite.id,
        senderName: elite.name,
        senderTier: elite.tier,
        senderColor: elite.color,
        text: replyText,
        timestamp: Date.now()
      });
      
      if (window.AudioEngine) window.AudioEngine.playReceive();
      AppState.save();
      renderMessages();
    }, 1500 + Math.random() * 1000);
  }, 1000);
}

document.getElementById("clubSendBtn")?.addEventListener("click", handleSendMessage);
document.getElementById("clubInput")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSendMessage();
});

function openInspectionModal(item, catKey, isOwned, isEquipped) {
  const modal = document.getElementById("inspectionModal");
  if (!modal) return;

  modal.hidden = false;

  document.getElementById("inspectionTitle").textContent = item.name;
  document.getElementById("inspectionRarity").textContent =
    RARITY_LABEL[item.rarity];
  document.getElementById("inspectionLore").textContent =
    item.lore ||
    "قطعة صُنعت بحرفية نادرة، تنبض بتاريخ من القوة والسيادة. من يمتلكها يكتب إرثه الخاص.";

  const svgContent = ICONS[item.icon] || ICONS["crown"];
  document.getElementById("inspectionImage").innerHTML = svgContent;

  const equipBtn = document.getElementById("inspectionEquipBtn");

  // Clone button to remove old listeners
  const newBtn = equipBtn.cloneNode(true);
  equipBtn.parentNode.replaceChild(newBtn, equipBtn);

  if (item.free) {
    newBtn.textContent = "مجاني — مُفعَّل";
    newBtn.disabled = true;
  } else if (isOwned) {
    newBtn.textContent = isEquipped ? "فك التجهيز" : "تجهيز الهوية";
    newBtn.disabled = false;
    newBtn.onclick = () => equipItem(item, catKey);
  } else {
    newBtn.textContent = `شراء — ${item.price.toLocaleString("en-US")}`;
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
}function updateMasterCard() {
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
// QUICK PREVIEW (Long Press)
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
  rarityEl.textContent = RARITY_LABEL[item.rarity];
  rarityEl.className = `rarity-badge rarity-${item.rarity}`;

  // Try to use a more context-aware default lore based on the icon/type
  let lore = item.lore;
  if (!lore) {
    if (item.icon === "crown")
      lore =
        "تاج سيادي يرمز لقمة الهرم. صُنع ليكون علامة مميزة لأولئك الذين يقودون ولا يتبعون.";
    else if (item.icon === "aura")
      lore =
        "هالة نادرة تشع بقوة خفية. تمنح حضورك في النادي وزناً لا يمكن تجاهله.";
    else if (item.icon === "ring")
      lore =
        "خاتم نُحت بدقة متناهية من معادن نفيسة. يحمل ختم الـ 1% ويمثل الولاء المطلق للنجاح.";
    else if (item.icon === "pendant")
      lore =
        "قلادة فريدة تتوارثها النخب. ترمز للتفرد والثروة التي لا تُرى بل تُحس.";
    else if (item.icon === "artifact")
      lore =
        "قطعة أثرية أسطورية لا يملكها سوى القلة. من يقتنيها يكتب إرثه في سجلات النادي للأبد.";
    else if (item.icon === "star")
      lore =
        "نجمة امتياز لامعة تبرز مكانتك بين الأعضاء. دليل قاطع على تفوقك وإنجازاتك.";
    else
      lore =
        "قطعة صُنعت بحرفية نادرة، تنبض بتاريخ من القوة والسيادة. من يمتلكها يكتب إرثه الخاص.";
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
// RENDER PROFILE EQUIPPED
// ---------------------------------------------------------
function renderProfileEquipped() {
  const grid = document.getElementById("profileEquippedGrid");
  if (!grid) return;

  const equipped = ClubState.equipped;
  let itemsHtml = "";

  // We'll iterate through all boutique categories and display the equipped ones
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
// RENDER PROFILE COLLECTION
// ---------------------------------------------------------


function showReactionMenu(anchorEl, msgId) {
  // Remove existing menu if any
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

  // Position it right above the add reaction button
  const rect = anchorEl.getBoundingClientRect();
  menu.style.top = rect.top - 40 + "px";
  // Attempt to center it above the button, but cap it so it doesn't overflow screen
  let leftPos = rect.left + rect.width / 2 - menu.offsetWidth / 2;
  leftPos = Math.max(
    10,
    Math.min(leftPos, window.innerWidth - menu.offsetWidth - 10),
  );
  menu.style.left = leftPos + "px";

  // Click outside to close
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
    // Only allow one of each emoji per user theoretically, but we'll just push for now
    if (!msg.reactions.includes(emoji)) {
      msg.reactions.push(emoji);
      if (window.AudioEngine) window.AudioEngine.playChime();
      renderClubMessages();
    }
  }
}

// Setup Ownership Filter Toggles
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

// Initialize card state on load

  // Update Boutique UI and Card Equipment
  applyEquippedToCard(ClubState.equipped);
  const activeBoutiqueTab = document.querySelector(".boutique-tab.is-active");
  if (activeBoutiqueTab && typeof renderBoutique === "function") {
    renderBoutique(activeBoutiqueTab.dataset.cat);
  }
  if (typeof updateMasterCard === "function") {
    updateMasterCard();
  }
    if (typeof renderProfileCollection === "function") {
    // Actually our updateUI handles profile collection, but let's call the original just in case.
    // wait, we handled it.
  }


document.addEventListener("DOMContentLoaded", () => {
  // Load custom portrait if exists
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
      showNavToast("إضافة صديق — قريباً");
    });
  }

  const menuMyCollectionNav = document.getElementById("menuMyCollectionNav");
  if (menuMyCollectionNav) {
    menuMyCollectionNav.addEventListener("click", () => {
      document.querySelector('[data-tab="shop"]').click();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuAddFriend = document.getElementById("menuAddFriend");
  if (menuAddFriend) {
    menuAddFriend.addEventListener("click", () => {
      showNavToast("إضافة صديق — قريباً");
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

  // --- Profile Menu: Account Info ---
  const menuAccountInfo = document.getElementById("menuAccountInfo");
  const accountInfoModal = document.getElementById("accountInfoModal");
  if (menuAccountInfo && accountInfoModal) {
    menuAccountInfo.addEventListener("click", () => {
      document.getElementById("accEmailInput").value = AppState.user.email || "";
      document.getElementById("accPhoneInput").value = AppState.user.phone || "";
      accountInfoModal.classList.add("is-open");
    });
  }
  document.getElementById("closeAccountInfoModal")?.addEventListener("click", () => {
    accountInfoModal?.classList.remove("is-open");
  });
  document.getElementById("saveAccountInfoBtn")?.addEventListener("click", () => {
    AppState.user.email = document.getElementById("accEmailInput").value.trim();
    AppState.user.phone = document.getElementById("accPhoneInput").value.trim();
    AppState.save();
    // AppState.notify() removed to prevent loop
    accountInfoModal?.classList.remove("is-open");
  });

  // --- Profile Menu: Help Support ---
  const menuHelp = document.getElementById("menuHelp");
  const helpSupportModal = document.getElementById("helpSupportModal");
  if (menuHelp && helpSupportModal) {
    menuHelp.addEventListener("click", () => {
      helpSupportModal.classList.add("is-open");
    });
  }
  document.getElementById("closeHelpSupportModal")?.addEventListener("click", () => {
    helpSupportModal?.classList.remove("is-open");
  });

  // --- Profile Menu: Membership Tab ---
  const menuMembership = document.getElementById("menuMembership");
  if (menuMembership) {
    menuMembership.addEventListener("click", () => {
      const membershipTabBtn = document.querySelector('[data-tab="membership"]');
      if (membershipTabBtn) membershipTabBtn.click();
    });
  }

  // --- Profile Menu: Settings Modal ---
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

  // --- Profile Menu: My Collection ---
  const menuMyCollection = document.getElementById("menuMyCollection");
  if (menuMyCollection) {
    menuMyCollection.addEventListener("click", () => {
      // Find the target section
      const targetSection = document.querySelector("#profile-tab .profile-collection-section");
      if (targetSection) {
        // Smooth scroll to it
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add a gold flash to the cards for attention
        setTimeout(() => {
          const cards = targetSection.querySelectorAll(".pcs-item-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.transition = "box-shadow 0.4s ease";
              card.style.boxShadow = "0 0 20px rgba(212, 175, 55, 0.8), inset 0 0 15px rgba(212, 175, 55, 0.4)";
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
    console.warn("D3 is not loaded yet. Waiting...");
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
    { name: "الثروة", value: ClubState.member.wealthIndexValue || 92 },
    { name: "الامتيازات", value: ClubState.member.privilegesValue || 84 },
    { name: "الاتصالات", value: ClubState.member.connectionsValue || 75 },
  ];

  // Set up SVG only once
  if (!d3RadarSvg) {
    container.html(""); // clear vanilla SVG

    // Add tooltip container
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

    // Draw Grid (Levels)
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

    // Draw Axes
    angles.forEach((a) => {
      d3RadarSvg
        .append("line")
        .attr("x1", cx)
        .attr("y1", cy)
        .attr("x2", cx + radius * Math.cos(a))
        .attr("y2", cy + radius * Math.sin(a))
        .attr("class", "radar-axis");
    });

    // Draw Labels
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

  // Calculate positions
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

  // To close the polygon
  const polyPtsArr = [...dataPtsArr, dataPtsArr[0]];

  // Data binding: Radar Polygon
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

  // Data binding: Points
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

document.addEventListener("DOMContentLoaded", () => {
  renderRadarChart();
  renderProgressChart();
});

// ---------------------------------------------------------
// PROGRESS CHART (WEEKLY EVOLUTION)
// ---------------------------------------------------------
function renderProgressChart() {
  const wrapper = document.getElementById("profileProgressChart");
  if (!wrapper) return;

  // Mock data mimicking growth
  const data = [
    { week: "الأسبوع ١", wealth: 60, priv: 50, conn: 40 },
    { week: "الأسبوع ٢", wealth: 72, priv: 62, conn: 55 },
    { week: "الأسبوع ٣", wealth: 85, priv: 76, conn: 65 },
    {
      week: "الحالي",
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

  // Draw Grid lines
  [0, 25, 50, 75, 100].forEach((val) => {
    let y = getY(val);
    svg += `<line x1="${padX}" y1="${y}" x2="${w - padX}" y2="${y}" class="progress-grid-line" />`;
  });

  // Vertical Active Line
  svg += `<line id="progressActiveLine" x1="0" y1="${padYTop}" x2="0" y2="${h - padYBot}" class="progress-active-line" />`;

  // Draw Paths (Lines)
  ["wealth", "priv", "conn"].forEach((key) => {
    let pts = data.map((d, i) => `${getX(i)},${getY(d[key])}`).join(" L ");
    svg += `<path d="M ${pts}" class="progress-line" stroke="${colors[key]}" />`;
  });

  // Draw Points and X-axis Labels
  data.forEach((d, i) => {
    let x = getX(i);
    // Label
    svg += `<text x="${x}" y="${h - 5}" class="progress-axis-text">${d.week}</text>`;

    // Points
    ["wealth", "priv", "conn"].forEach((key) => {
      let y = getY(d[key]);
      svg += `<circle cx="${x}" cy="${y}" r="2.5" class="progress-point" fill="#0F0F0F" stroke="${colors[key]}" />`;
    });

    // Hover Interaction Zones
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

  // Bind Interactions
  const zones = wrapper.querySelectorAll(".hover-zone");
  const activeLine = wrapper.querySelector("#progressActiveLine");

  zones.forEach((zone) => {
    zone.addEventListener("mouseenter", (e) => handleHover(e.target));
    zone.addEventListener(
      "touchstart",
      (e) => {
        // Only prevent default if we want to stop scroll, but let's just trigger hover
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
    // Keep tooltip within bounds for edges
    if (idx === 0) percX += 15;
    if (idx === data.length - 1) percX -= 15;

    tooltip.style.left = `calc(${percX}%)`;
    tooltip.style.top = `10px`;
    tooltip.style.opacity = 1;
  }
}

// FOR TESTING REAL-TIME D3 UPDATES
window.testRadarUpdate = () => {
  ClubState.member.wealthIndexValue = Math.floor(Math.random() * 100);
  ClubState.member.privilegesValue = Math.floor(Math.random() * 100);
  ClubState.member.connectionsValue = Math.floor(Math.random() * 100);
};
function updateCreditsUI() {
  const creditsText = document.getElementById("clubCreditsText");
  const buyBtn = document.getElementById("clubCreditsBuyBtn");
  if (!creditsText) return;

  const currentCredits = ClubState.chatCredits !== undefined ? ClubState.chatCredits : 10;
  const maxCredits = 10;
  
  if (currentCredits <= 0) {
    creditsText.textContent = `الرسائل المتبقية اليوم: ${currentCredits} / ${maxCredits}`;
    creditsText.style.color = "#d9534f";
    if (buyBtn) buyBtn.style.display = "inline-block";
  } else {
    creditsText.textContent = `الرسائل المتبقية اليوم: ${currentCredits} / ${maxCredits}`;
    creditsText.style.color = "inherit";
    if (buyBtn) buyBtn.style.display = "inline-block";
  }
}
function renderClubMessages() {
  console.log("renderClubMessages placeholder called");
}
const CLUB_MEMBERS = [
  { id: "1001", name: "ALEXANDER W.", tier: "SOVEREIGN EXARCH", msgId: "msg-1", content: "Great investment opportunity in the new fund." },
  { id: "1002", name: "SARAH V.", tier: "SOVEREIGN LUMINARY", msgId: "msg-2", content: "I agree, looking into the details now." },
  { id: "1003", name: "MICHAEL T.", tier: "SOVEREIGN MEMBER", msgId: "msg-3", content: "When is the next global meetup?" }
];

let typingTimeout2 = null;
function setTypingIndicator(member) {
  console.log("Typing indicator for:", member.name);
}


function playPurchaseAnimation() {
  const flash = document.createElement("div");
  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background = "radial-gradient(circle at center, rgba(212,175,106,0.25), transparent)";
  flash.style.pointerEvents = "none";
  flash.style.zIndex = "9999";
  flash.style.transition = "opacity 0.8s ease-out";
  document.body.appendChild(flash);
  setTimeout(() => { flash.style.opacity = "0"; }, 50);
  setTimeout(() => { flash.remove(); }, 850);
}

// ---------------------------------------------------------
// PROFILE ACHIEVEMENTS
// ---------------------------------------------------------
function renderProfileAchievements() {
  const container = document.getElementById("profileAchievementsGrid");
  const summaryContainer = document.getElementById("achievementsSummary");
  if (!container) return;

  let unlocked = [];
  try {
    unlocked = JSON.parse(localStorage.getItem('club_achievements')) || [];
  } catch (e) {}

  let html = "";
  const totalAchievements = Object.keys(ACHIEVEMENTS_DATA).length;
  let earnedCount = 0;
  
  // Render honors
  Object.keys(ACHIEVEMENTS_DATA).forEach(id => {
    const ach = ACHIEVEMENTS_DATA[id];
    const isUnlocked = ach.isUnlocked();
    if (isUnlocked) earnedCount++;

    if (isUnlocked) {
      html += `
        <div class="honor-card is-unlocked gyro-element" data-tilt data-tooltip="${ach.desc.replace(/"/g, '&quot;')}">
          <div class="honor-icon">${ach.icon}</div>
          <div class="honor-name">${ach.name}</div>
          <div class="honor-title">${ach.title}</div>
          <div class="honor-pill">EARNED</div>
        </div>
      `;
    } else {
      let current = ach.progress();
      if (current > ach.target) current = ach.target;
      const percent = Math.min(100, Math.max(0, (current / ach.target) * 100));

      html += `
        <div class="honor-card is-locked gyro-element" data-tilt data-tooltip="${ach.desc.replace(/"/g, '&quot;')}">
          <div class="honor-icon">${ach.icon}</div>
          <div class="honor-name">${ach.name}</div>
          <div class="honor-title">LOCKED</div>
          <div class="honor-progress-wrap">
            <div class="honor-progress-bar">
              <div class="honor-progress-fill" style="width: ${percent}%;"></div>
            </div>
            <div class="honor-progress-text">$${(ach.target - current).toLocaleString()} REMAINING</div>
          </div>
        </div>
      `;
    }
  });

  container.innerHTML = html;
  if (window.initGyroElements) window.initGyroElements();

  if (summaryContainer) {
    const completionPercent = Math.round((earnedCount / totalAchievements) * 100);
    summaryContainer.innerHTML = `
      <div class="achievements-summary-col">
        <span class="achievements-summary-label">HONORS UNLOCKED</span>
        <span class="achievements-summary-value">${earnedCount} / ${totalAchievements}</span>
      </div>
      <div class="achievements-summary-divider"></div>
      <div class="achievements-summary-col" style="align-items: flex-end;">
        <span class="achievements-summary-label">TIER PROGRESS</span>
        <span class="achievements-summary-value" style="color: ${completionPercent === 100 ? '#e6c27a' : '#d4af6a'};">${completionPercent}%</span>
      </div>
    `;
  }
}

function renderProfileCollection() {
  const container = document.getElementById("profileCollectionGrid");
  if (!container) return;

  const owned = ClubState.owned;
  const equipped = ClubState.equipped;
  let hasItems = false;
  let itemsHtml = "";
  let itemCount = 0;

  for (const catKey in BOUTIQUE) {
    for (const item of BOUTIQUE[catKey].items) {
      if (owned[item.id] && !item.free) {
        hasItems = true;
        itemCount++;
        const iconSvg = ICONS[item.icon] || ICONS["star"];
        const isActive = equipped[catKey] === item.name || equipped[catKey] === item.id;
        
        itemsHtml += `
          <div class="pcs-item-card gyro-element" data-tilt onclick='openInspectionModal(${JSON.stringify(item)}, "${catKey}", true, ${isActive})'>
            <div class="pcs-item-icon">${iconSvg}</div>
            <div class="pcs-item-name">${item.name}</div>
            <div class="pcs-item-type">${BOUTIQUE[catKey].title}</div>
            ${isActive ? '<span class="item-status-badge">ACTIVE</span>' : ''}
          </div>
        `;
      }
    }
  }

  // Always add the explore card at the end
  itemsHtml += `
    <div class="pcs-explore-card" onclick="document.querySelector('[data-tab=\\'boutique\\']').click()">
      <div class="pcs-explore-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
      </div>
      <div class="pcs-explore-text">Explore More<br/>Items</div>
    </div>
  `;

  // Use innerHTML to overwrite the container precisely, removing any chance of duplication
  container.innerHTML = itemsHtml;

  const metricsItems = document.getElementById("pmItemsCollected");
  if (metricsItems) metricsItems.textContent = itemCount;
  
  if (typeof initProfileGyro === "function") initProfileGyro();
}
// ---------------------------------------------------------
// EDIT PROFILE MODAL LOGIC
// ---------------------------------------------------------
const profilePhotos = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560086820-bba7dc1f274a?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595085610896-cba5ee370002?q=80&w=200&auto=format&fit=crop"
];

let selectedProfilePhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop";

function initEditProfileModal() {
  const photoGrid = document.getElementById("editProfilePhotoGrid");
  if (photoGrid) {
    photoGrid.innerHTML = profilePhotos.map((url, i) => `
      <div class="edit-profile-photo-opt ${url === selectedProfilePhoto ? 'selected' : ''}" 
           style="background-image: url('${url}')" 
           data-url="${url}">
      </div>
    `).join('');

    const opts = photoGrid.querySelectorAll('.edit-profile-photo-opt');
    opts.forEach(opt => {
      opt.addEventListener('click', (e) => {
        opts.forEach(o => o.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedProfilePhoto = e.target.dataset.url;
      });
    });
  }
}

document.getElementById("editAccountBtn")?.addEventListener("click", () => {
  const modal = document.getElementById("editProfileModal");
  if (modal) {
    document.getElementById("editProfileNameInput").value = AppState.user.name || "";
    document.getElementById("editProfileQuoteInput").value = AppState.user.quote || AppState.user.bio || "";
    document.getElementById("editProfileAvatarUrl").value = AppState.user.avatarUrl || "";
    initEditProfileModal();
    modal.classList.add("is-open");
  }
});

document.getElementById("closeEditProfileModal")?.addEventListener("click", () => {
  document.getElementById("editProfileModal")?.classList.remove("is-open");
});

document.getElementById("saveEditProfileBtn")?.addEventListener("click", () => {
  const nameInput = document.getElementById("editProfileNameInput").value.trim();
  const quoteInput = document.getElementById("editProfileQuoteInput").value.trim();
  let avatarUrl = document.getElementById("editProfileAvatarUrl").value.trim();

  if (nameInput) AppState.user.name = nameInput;
  if (nameInput) AppState.user.username = nameInput; // Sync username
  if (quoteInput) AppState.user.quote = quoteInput;
  if (quoteInput) AppState.user.bio = quoteInput;
  if (avatarUrl) AppState.user.avatarUrl = avatarUrl;
  
  // Use selected fallback photo if no text input URL
  if (!avatarUrl && typeof selectedProfilePhoto !== "undefined") {
    AppState.user.avatarUrl = selectedProfilePhoto;
  }
  
  AppState.save();
  updateUI();
  document.getElementById("editProfileModal")?.classList.remove("is-open");
});

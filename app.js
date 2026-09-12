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
// ECONOMY & STATE LOGIC
// ==========================================
const ClubState = {
  member: {
  id: "3426",
  name: "ISMAIL ELSAYED",
  tier: "SOVEREIGN MEMBER",
  quote: "Not everyone understands wealth. That's why we have this Club.",
  joined: "AUG 2026",
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
  owned: {},
  equipped: {},
  chatCredits: 10,

  _subscribers: {},
  on(event, callback) {
    if (!this._subscribers[event]) this._subscribers[event] = [];
    this._subscribers[event].push(callback);
  },
  emit(event, data) {
    if (!this._subscribers[event]) return;
    this._subscribers[event].forEach(cb => cb(data));
  },
  
  init() {
    const savedBalance = localStorage.getItem(`balance_${this.member.id}`);
    this.balance = savedBalance !== null ? parseInt(savedBalance, 10) : 24750;
    const savedCredits = localStorage.getItem(`chatCredits_${this.member.id}`);
    this.chatCredits = savedCredits !== null ? parseInt(savedCredits, 10) : 10;
    try { this.owned = JSON.parse(localStorage.getItem(`owned_${this.member.id}`)) || {}; } catch { this.owned = {}; }
    try { this.equipped = JSON.parse(localStorage.getItem(`equipped_${this.member.id}`)) || {}; } catch { this.equipped = {}; }
    
    try { 
      const savedProfile = JSON.parse(localStorage.getItem(`profile_${this.member.id}`));
      this.member.bio = this.member.bio || "عضو نشط في النادي";
  this.member.interests = this.member.interests || "التصميم · التكنولوجيا";
  this.member.location = this.member.location || "دبي، الإمارات";
  this.member.username = this.member.username || "MEMBER";
      if (savedProfile) Object.assign(this.member, savedProfile);
    } catch {}
    
    this.recalculatePrestige();
  },
  
  save() {
    localStorage.setItem(`balance_${this.member.id}`, this.balance);
    localStorage.setItem(`chatCredits_${this.member.id}`, this.chatCredits);
    localStorage.setItem(`owned_${this.member.id}`, JSON.stringify(this.owned));
    localStorage.setItem(`equipped_${this.member.id}`, JSON.stringify(this.equipped));
    localStorage.setItem(`profile_${this.member.id}`, JSON.stringify(this.member));
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
      this.owned[item.id] = true;
      this.recalculatePrestige();
      this.save();
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
ClubState.init();
document.addEventListener('DOMContentLoaded', () => ClubState.emit('change'));

function updateUI() {
  ClubState.emit('change');
}

// ---------------------------------------------------------
// UI SUBSCRIBERS
// ---------------------------------------------------------
ClubState.on('change', () => {

  // Sync Profile Text
  const pName = document.getElementById("profileName");
  if (pName) pName.textContent = ClubState.member.username || ClubState.member.name;
  
  const pBio = document.getElementById("profileBioValue");
  if (pBio && ClubState.member.bio) pBio.textContent = ClubState.member.bio;
  
  const pInt = document.getElementById("profileInterestsValue");
  if (pInt && ClubState.member.interests) pInt.textContent = ClubState.member.interests;
  
  const pLoc = document.getElementById("profileLocationValue");
  if (pLoc && ClubState.member.location) pLoc.textContent = ClubState.member.location;
  
  const pQuote = document.getElementById("profileQuote");
  if (pQuote && ClubState.member.bio) pQuote.textContent = '"' + ClubState.member.bio + '"';

  const mName = document.getElementById("memberName");
  if (mName) mName.textContent = ClubState.member.name;

  const balEl = document.getElementById("boutiqueBalanceDisplay");
  if (balEl) balEl.textContent = ClubState.balance.toLocaleString("en-US");
  
  if (typeof renderProfileCollection === "function") renderProfileCollection();
  
  if (typeof renderRing === "function") {
    renderRing("wealthRing", "wealthValue", ClubState.member.wealthIndexValue);
    renderRing("privRing", "privValue", ClubState.member.privilegesValue);
  }
  
  if (typeof applyEquippedToCard === "function") applyEquippedToCard(ClubState.equipped);
  
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
// 16. SHARE — HIGH-RES MASTER MEMBERSHIP CARD (CANVAS 2D PNG)
// ---------------------------------------------------------

async function renderMasterCardToBlob() {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch (_) {}
  }

  const canvas = document.createElement("canvas");
  const w = 900;
  const h = 1350;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Get live member data
  const memberName = (
    document.getElementById("memberName")?.textContent || ClubState.member.name
  ).trim();
  const memberId = (
    document.getElementById("memberNumber")?.textContent || ClubState.member.id
  ).trim();
  const tierName = (
    document.getElementById("tierName")?.textContent || ClubState.member.tier
  ).trim();
  const memberQuote = (
    document.getElementById("memberQuote")?.textContent || `"${ClubState.member.quote}"`
  ).trim();
  const wealthText = (
    document.getElementById("wealthValue")?.textContent ||
    `${ClubState.member.wealthIndexValue}%`
  )
    .replace("%", "")
    .trim();
  const privText = (
    document.getElementById("privValue")?.textContent ||
    `${ClubState.member.privilegesValue}%`
  )
    .replace("%", "")
    .trim();
  const wealthVal = parseInt(wealthText, 10) || 92;
  const privVal = parseInt(privText, 10) || 84;
  const equipped = typeof getEquipped === "function" ? ClubState.equipped : {};

  // Check if user uploaded a portrait photo
  let photoImg = null;
  const portraitPhotoEl = document.getElementById("portraitPhoto");
  if (portraitPhotoEl && portraitPhotoEl.style.backgroundImage) {
    const match = portraitPhotoEl.style.backgroundImage.match(
      /url\(["']?([^"']+)["']?\)/,
    );
    if (match && match[1]) {
      photoImg = await new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = match[1];
      });
    }
  }

  // Rounded rectangle helper
  function roundRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
  }

  // 1. Full Canvas Background (Deep OLED Black)
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 0, w, h);

  // Card geometry inside canvas
  const cx = w / 2;
  const cardX = 40;
  const cardY = 40;
  const cardW = 820;
  const cardH = 1270;
  const cardR = 40;

  // 2. Card Outer Glow & Deep Drop Shadow
  ctx.save();
  ctx.shadowColor = "rgba(212, 175, 106, 0.25)";
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 18;
  roundRect(cardX, cardY, cardW, cardH, cardR);
  ctx.fillStyle = "#0D0C0A";
  ctx.fill();
  ctx.restore();

  // 3. Clip Card Interior
  ctx.save();
  roundRect(cardX, cardY, cardW, cardH, cardR);
  ctx.clip();

  // Obsidian metallic surface gradient
  const cardBg = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardH);
  cardBg.addColorStop(0, "#1A1815");
  cardBg.addColorStop(0.25, "#12110E");
  cardBg.addColorStop(0.65, "#0A0908");
  cardBg.addColorStop(1, "#14120D");
  ctx.fillStyle = cardBg;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // Warm gold radial glow from top
  const topGlow = ctx.createRadialGradient(
    cx,
    cardY + 60,
    20,
    cx,
    cardY + 380,
    520,
  );
  topGlow.addColorStop(0, "rgba(212, 175, 106, 0.18)");
  topGlow.addColorStop(0.5, "rgba(180, 135, 45, 0.06)");
  topGlow.addColorStop(1, "transparent");
  ctx.fillStyle = topGlow;
  ctx.fillRect(cardX, cardY, cardW, cardH);

  // 4. Spirograph Hallmark Watermark (Banknote Rosette)
  ctx.save();
  const hallmarkY = cardY + 355;
  ctx.translate(cx, hallmarkY);
  ctx.strokeStyle = "rgba(212, 175, 106, 0.14)";
  ctx.lineWidth = 1;
  const petals = 36;
  for (let i = 0; i < petals; i++) {
    ctx.rotate((Math.PI * 2) / petals);
    ctx.beginPath();
    ctx.ellipse(0, 75, 20, 125, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // Reusable Gold Linear Gradient
  function makeGoldGrad(x1, y1, x2, y2) {
    const g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0, "#FCF3D6");
    g.addColorStop(0.18, "#EBCD84");
    g.addColorStop(0.38, "#B8863A");
    g.addColorStop(0.55, "#8A6323");
    g.addColorStop(0.72, "#D9AF62");
    g.addColorStop(0.88, "#F7E7B9");
    g.addColorStop(1, "#7A5A22");
    return g;
  }

  const primaryGold = makeGoldGrad(cardX, cardY, cardX + cardW, cardY + cardH);

  // 5. Multi-Layer Bezel Borders
  // Outer Gold Edge Border
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = primaryGold;
  roundRect(cardX + 2, cardY + 2, cardW - 4, cardH - 4, cardR - 2);
  ctx.stroke();

  // Inset Hairline Frame
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = "rgba(212, 175, 106, 0.42)";
  roundRect(cardX + 16, cardY + 16, cardW - 32, cardH - 32, cardR - 12);
  ctx.stroke();

  // Fine Inner Pinstripe
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = "rgba(212, 175, 106, 0.22)";
  roundRect(cardX + 22, cardY + 22, cardW - 44, cardH - 44, cardR - 16);
  ctx.stroke();

  // 6. Guilloche Corner Ornaments (TL, TR, BL, BR)
  function drawCorner(ox, oy, rot) {
    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate(rot);
    ctx.strokeStyle = primaryGold;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(4, 38);
    ctx.lineTo(4, 12);
    ctx.arcTo(4, 4, 12, 4, 8);
    ctx.lineTo(38, 4);
    ctx.stroke();

    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(4, 4, 22, 0, Math.PI / 2);
    ctx.stroke();

    ctx.fillStyle = primaryGold;
    ctx.beginPath();
    ctx.arc(4, 4, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawCorner(cardX + 28, cardY + 28, 0); // TL
  drawCorner(cardX + cardW - 28, cardY + 28, Math.PI / 2); // TR
  drawCorner(cardX + cardW - 28, cardY + cardH - 28, Math.PI); // BR
  drawCorner(cardX + 28, cardY + cardH - 28, -Math.PI / 2); // BL

  // 7. Card Top Bar
  // Mini Sovereign Crown
  ctx.save();
  ctx.translate(cx, cardY + 54);
  ctx.fillStyle = primaryGold;
  ctx.beginPath();
  ctx.moveTo(-16, 12);
  ctx.lineTo(-20, -2);
  ctx.lineTo(-10, 4);
  ctx.lineTo(0, -8);
  ctx.lineTo(10, 4);
  ctx.lineTo(20, -2);
  ctx.lineTo(16, 12);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, -8, 2, 0, Math.PI * 2);
  ctx.arc(-20, -2, 1.8, 0, Math.PI * 2);
  ctx.arc(20, -2, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // "THE 1% CLUB"
  ctx.font = "600 24px 'Cormorant Garamond', Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillStyle = makeGoldGrad(cx - 120, cardY + 84, cx + 120, cardY + 84);
  ctx.fillText("T H E   1 %   C L U B", cx, cardY + 86);

  ctx.font = "500 10px Inter, sans-serif";
  ctx.fillStyle = "rgba(199, 154, 62, 0.65)";
  ctx.fillText("SOVEREIGN PRIVATE VAULT · 2026", cx, cardY + 104);

  // 8. Portrait Medallion
  const medY = cardY + 310;
  const medR = 110;

  // Aura (if equipped)
  if (equipped.auras) {
    const auraGlow = ctx.createRadialGradient(
      cx,
      medY,
      medR * 0.8,
      cx,
      medY,
      medR * 1.5,
    );
    auraGlow.addColorStop(0, "rgba(235, 205, 132, 0.45)");
    auraGlow.addColorStop(0.5, "rgba(184, 134, 58, 0.2)");
    auraGlow.addColorStop(1, "transparent");
    ctx.fillStyle = auraGlow;
    ctx.beginPath();
    ctx.arc(cx, medY, medR * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Laurel Wreaths (left & right branches)
  function drawLaurelBranch(side) {
    ctx.save();
    ctx.translate(cx, medY);
    ctx.scale(side, 1);
    ctx.strokeStyle = primaryGold;
    ctx.fillStyle = primaryGold;
    ctx.lineWidth = 1.4;

    ctx.beginPath();
    ctx.arc(0, 0, medR + 24, Math.PI * 0.25, Math.PI * 0.85);
    ctx.stroke();

    for (let a = 0.32; a <= 0.8; a += 0.08) {
      const angle = Math.PI * a;
      const lx = Math.cos(angle) * (medR + 24);
      const ly = Math.sin(angle) * (medR + 24);

      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(angle + Math.PI / 2 + 0.3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 4, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
  drawLaurelBranch(1);
  drawLaurelBranch(-1);

  // Bezel Minute Ticks (60 ticks around ring)
  ctx.save();
  ctx.translate(cx, medY);
  for (let i = 0; i < 60; i++) {
    const angle = (i * Math.PI * 2) / 60;
    const isHour = i % 5 === 0;
    const rStart = medR + 6;
    const rEnd = isHour ? medR + 15 : medR + 10;
    ctx.strokeStyle = isHour ? primaryGold : "rgba(212, 175, 106, 0.45)";
    ctx.lineWidth = isHour ? 1.5 : 0.8;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * rStart, Math.sin(angle) * rStart);
    ctx.lineTo(Math.cos(angle) * rEnd, Math.sin(angle) * rEnd);
    ctx.stroke();
  }
  ctx.restore();

  // Concentric Bezel Rings
  ctx.lineWidth = 3;
  ctx.strokeStyle = primaryGold;
  ctx.beginPath();
  ctx.arc(cx, medY, medR + 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = makeGoldGrad(
    cx - medR,
    medY - medR,
    cx + medR,
    medY + medR,
  );
  ctx.beginPath();
  ctx.arc(cx, medY, medR, 0, Math.PI * 2);
  ctx.stroke();

  // Photo / Sovereign Silhouette
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, medY, medR - 2, 0, Math.PI * 2);
  ctx.clip();

  if (photoImg) {
    const nw = photoImg.naturalWidth || photoImg.width;
    const nh = photoImg.naturalHeight || photoImg.height;
    const size = Math.min(nw, nh);
    const sx = (nw - size) / 2;
    const sy = (nh - size) / 2;
    ctx.drawImage(
      photoImg,
      sx,
      sy,
      size,
      size,
      cx - medR + 2,
      medY - medR + 2,
      (medR - 2) * 2,
      (medR - 2) * 2,
    );
  } else {
    const silBg = ctx.createRadialGradient(cx, medY - 20, 10, cx, medY, medR);
    silBg.addColorStop(0, "#262218");
    silBg.addColorStop(1, "#0A0907");
    ctx.fillStyle = silBg;
    ctx.fill();

    ctx.fillStyle = primaryGold;
    ctx.beginPath();
    ctx.arc(cx, medY - 18, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx, medY + 68, 62, 45, 0, Math.PI, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Equipped Crown atop Medallion (if equipped)
  if (equipped.crowns) {
    ctx.save();
    ctx.translate(cx, medY - medR - 8);
    ctx.fillStyle = primaryGold;
    ctx.strokeStyle = "#4A340F";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-30, 20);
    ctx.lineTo(-38, -4);
    ctx.lineTo(-18, 6);
    ctx.lineTo(0, -18);
    ctx.lineTo(18, 6);
    ctx.lineTo(38, -4);
    ctx.lineTo(30, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, -18, 3.5, 0, Math.PI * 2);
    ctx.arc(-38, -4, 3, 0, Math.PI * 2);
    ctx.arc(38, -4, 3, 0, Math.PI * 2);
    ctx.arc(-18, 6, 2.5, 0, Math.PI * 2);
    ctx.arc(18, 6, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 9. Member Identity Information
  // Member Nº
  ctx.font = "600 15px 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = "url(#ringGoldGrad)";
  ctx.textAlign = "center";
  ctx.fillText(`MEMBER  Nº  ${memberId}`, cx, cardY + 475);

  // Member Name (Large Prominent Gold Serif)
  ctx.font = "bold 38px 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = makeGoldGrad(cx - 200, cardY + 520, cx + 200, cardY + 520);
  ctx.shadowColor = "rgba(0,0,0,0.8)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 2;
  ctx.fillText(memberName.toUpperCase(), cx, cardY + 522);
  ctx.shadowColor = "transparent";

  // Tier Pill
  const pillW = 240;
  const pillH = 34;
  const pillY = cardY + 546;
  ctx.fillStyle = "rgba(16, 13, 6, 0.85)";
  roundRect(cx - pillW / 2, pillY, pillW, pillH, pillH / 2);
  ctx.fill();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = primaryGold;
  ctx.stroke();

  ctx.font = "600 12px 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = primaryGold;
  ctx.fillText(`★  ★  ★   ${tierName.toUpperCase()}   ★  ★  ★`, cx, pillY + 22);

  // Equipped Signet Ring (if equipped)
  if (equipped.jewelry) {
    ctx.font = "500 10px 'Cormorant Garamond', Georgia, serif";
    ctx.fillStyle = "#D4AF6A";
    ctx.fillText("◈  IMPERIAL SIGNET RING  ◈", cx, pillY + 46);
  }

  // Member Quote
  ctx.font = "italic 16px 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = "#D9D2C3";
  ctx.textAlign = "center";
  const cleanQuote = memberQuote.replace(/^"|"$/g, "");
  const quoteWords = cleanQuote.split(" ");
  let quoteLine1 = "";
  let quoteLine2 = "";
  for (const qw of quoteWords) {
    if ((quoteLine1 + " " + qw).length <= 48)
      quoteLine1 += (quoteLine1 ? " " : "") + qw;
    else quoteLine2 += (quoteLine2 ? " " : "") + qw;
  }
  const quoteBaseY = equipped.jewelry ? cardY + 625 : cardY + 615;
  if (quoteLine2) {
    ctx.fillText(`"${quoteLine1}`, cx, quoteBaseY);
    ctx.fillText(`${quoteLine2}"`, cx, quoteBaseY + 22);
  } else {
    ctx.fillText(`"${quoteLine1}"`, cx, quoteBaseY);
  }

  // 10. Identity Metrics (Wealth & Privileges Gauges)
  const metricsY = cardY + 775;

  function drawMetricGauge(gx, gy, label, percent) {
    const gr = 48;
    ctx.lineWidth = 4.5;
    ctx.strokeStyle = "rgba(212, 175, 106, 0.15)";
    ctx.beginPath();
    ctx.arc(gx, gy, gr, 0, Math.PI * 2);
    ctx.stroke();

    const startAngle = -Math.PI / 2;
    const sweep = Math.PI * 2 * (percent / 100);
    ctx.lineWidth = 5.5;
    ctx.strokeStyle = makeGoldGrad(gx - gr, gy - gr, gx + gr, gy + gr);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(gx, gy, gr, startAngle, startAngle + sweep);
    ctx.stroke();
    ctx.lineCap = "butt";

    ctx.font = "bold 24px 'Cormorant Garamond', Georgia, serif";
    ctx.fillStyle = primaryGold;
    ctx.textAlign = "center";
    ctx.fillText(`${percent}%`, gx, gy + 8);

    ctx.font = "500 13px 'Inter', sans-serif";
    ctx.fillStyle = "#A39B8A";
    ctx.fillText(label, gx, gy + gr + 26);
  }

  drawMetricGauge(cardX + 175, metricsY, "مؤشر الثروة", wealthVal);
  drawMetricGauge(cardX + cardW - 175, metricsY, "الامتيازات", privVal);

  // Center: The Living Core (Pulsing Star Emblem)
  ctx.save();
  ctx.translate(cx, metricsY);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(212, 175, 106, 0.35)";
  ctx.beginPath();
  ctx.arc(0, 0, 24, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = primaryGold;
  ctx.beginPath();
  const starR1 = 18;
  const starR2 = 6;
  for (let i = 0; i < 8; i++) {
    const a1 = (i * Math.PI) / 4;
    const a2 = a1 + Math.PI / 8;
    if (i === 0) ctx.moveTo(Math.cos(a1) * starR1, Math.sin(a1) * starR1);
    else ctx.lineTo(Math.cos(a1) * starR1, Math.sin(a1) * starR1);
    ctx.lineTo(Math.cos(a2) * starR2, Math.sin(a2) * starR2);
  }
  ctx.closePath();
  ctx.fill();

  const coreHue =
    getComputedStyle(document.documentElement).getPropertyValue("--core-hue") ||
    "45";
  ctx.fillStyle = `hsl(${coreHue}, 90%, 65%)`;
  ctx.shadowColor = `hsl(${coreHue}, 95%, 60%)`;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 11. Hallmark Divider with 1% Sovereign Shield
  const hallmarkLineY = cardY + 950;
  const hLineGradL = ctx.createLinearGradient(
    cardX + 80,
    hallmarkLineY,
    cx - 40,
    hallmarkLineY,
  );
  hLineGradL.addColorStop(0, "transparent");
  hLineGradL.addColorStop(1, primaryGold);
  ctx.strokeStyle = hLineGradL;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cardX + 80, hallmarkLineY);
  ctx.lineTo(cx - 40, hallmarkLineY);
  ctx.stroke();

  const hLineGradR = ctx.createLinearGradient(
    cx + 40,
    hallmarkLineY,
    cardX + cardW - 80,
    hallmarkLineY,
  );
  hLineGradR.addColorStop(0, primaryGold);
  hLineGradR.addColorStop(1, "transparent");
  ctx.strokeStyle = hLineGradR;
  ctx.beginPath();
  ctx.moveTo(cx + 40, hallmarkLineY);
  ctx.lineTo(cardX + cardW - 80, hallmarkLineY);
  ctx.stroke();

  // 1% Shield Badge in Center
  ctx.save();
  ctx.translate(cx, hallmarkLineY);
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(18, -10);
  ctx.lineTo(18, 4);
  ctx.bezierCurveTo(18, 14, 10, 22, 0, 24);
  ctx.bezierCurveTo(-10, 22, -18, 14, -18, 4);
  ctx.lineTo(-18, -10);
  ctx.closePath();
  ctx.fillStyle = "#0A0908";
  ctx.fill();
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = primaryGold;
  ctx.stroke();

  ctx.font = "bold 15px 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = primaryGold;
  ctx.textAlign = "center";
  ctx.fillText("1%", 0, 8);
  ctx.restore();

  // 12. Card Tagline & Sovereign Verification Seal
  ctx.font = "600 16px 'Cormorant Garamond', Georgia, serif";
  ctx.fillStyle = "#EAE3D2";
  ctx.textAlign = "center";
  ctx.fillText("PRIVATE WEALTH", cx, cardY + 1010);

  ctx.font = "500 10px Inter, sans-serif";
  ctx.fillStyle = "#877C6A";
  ctx.fillText("FICTIONAL · SATIRICAL · MEMBERSHIP", cx, cardY + 1032);

  ctx.font = "500 11px monospace";
  ctx.fillStyle = "rgba(212, 175, 106, 0.65)";
  ctx.fillText(`THE1CLUB.COM / VERIFY / ${memberId}`, cx, cardY + 1065);

  ctx.restore();

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas toBlob failed"));
    }, "image/png");
  });
}

async function shareMasterCard() {
  showCopyToast("جارٍ تصدير الماستر كارد الملكي…");

  try {
    const blob = await renderMasterCardToBlob();
    const fname = `1percent-mastercard-${ClubState.member.id}.png`;
    const file = new File([blob], fname, { type: "image/png" });

    // Try Web Share API with image file (supported on iOS 15+, Android Chrome)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "THE 1% CLUB — MASTER MEMBERSHIP CARD",
          text: `${ClubState.member.name} — Member Nº${ClubState.member.id} — ${ClubState.member.tier}`,
        });
        return;
      } catch (shareErr) {
        if (shareErr.name === "AbortError") return; // User cancelled — do nothing
      }
    }

    // Fallback: download the image
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fname;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    showCopyToast("✓ تم حفظ الماستر كارد كصورة PNG فائقة الدقة");
  } catch (err) {
    // Final fallback: share URL text
    const shareData = {
      title: "THE 1% CLUB",
      text: `${ClubState.member.name} — Member Nº${ClubState.member.id} — ${ClubState.member.tier}`,
      url: ClubState.member.verifyUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        /* cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(ClubState.member.verifyUrl);
      showCopyToast("تم نسخ الرابط السيادي");
    } catch {
      showCopyToast(ClubState.member.verifyUrl);
    }
  }
}

document.getElementById("shareBtn").addEventListener("click", shareMasterCard);
document
  .getElementById("profileShareBtn")
  .addEventListener("click", shareMasterCard);

// ---------------------------------------------------------
// 17. BOTTOM NAV
// ---------------------------------------------------------
const navToast = document.getElementById("navToast");
const sectionName = document.getElementById("sectionName");
let navToastTimer = null;

// ==========================================
// UI EFFECTS & ANIMATIONS
// ==========================================

// ---------------------------------------------------------
// PROFILE GYROSCOPE & PARALLAX
// ---------------------------------------------------------
function initProfileGyro() {
  const wrap = document.querySelector('#profile-tab .profile-portrait-wrap');
  if (!wrap) return;

  const handleMove = (x, y, w, h) => {
    const rx = ((y / h) - 0.5) * -15; // rotateX
    const ry = ((x / w) - 0.5) * 15;  // rotateY
    wrap.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
    wrap.style.transition = 'none';
  };

  const handleReset = () => {
    wrap.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    wrap.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
  };

  // Mouse fallback
  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    handleMove(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height);
  });
  wrap.addEventListener('mouseleave', handleReset);

  // Gyroscope
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      // Only active if profile tab is active
      const profileTab = document.getElementById('profile-tab');
      if (!profileTab || profileTab.hidden) return;

      const beta = e.beta || 0; // -180 to 180 (front/back tilt)
      const gamma = e.gamma || 0; // -90 to 90 (left/right tilt)
      
      // Clamp values
      const rx = Math.max(-15, Math.min(15, (beta - 45) * 0.5)); // Assume 45deg is neutral holding pos
      const ry = Math.max(-15, Math.min(15, gamma * 0.5));

      wrap.style.transform = `perspective(800px) rotateX(${-rx}deg) rotateY(${ry}deg)`;
      wrap.style.transition = 'transform 0.1s ease-out';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initProfileGyro();
});

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

document.getElementById("editAccountBtn").addEventListener("click", () => {
  document.getElementById("editName").value =
    document.getElementById("memberName").textContent;
  document.getElementById("editUsername").value =
    document.getElementById("profileName").textContent;
  document.getElementById("editBio").value =
    document.getElementById("profileBioValue").textContent;
  document.getElementById("editInterests").value = document.getElementById(
    "profileInterestsValue",
  ).textContent;
  document.getElementById("editLocation").value = document.getElementById(
    "profileLocationValue",
  ).textContent;
  openContextPage("page-edit-account", "تعديل الحساب", "profile");
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
});

// ---------------------------------------------------------
// 19. 3D TILT
// ---------------------------------------------------------
const TILT_MAX_DEG = 12;

function setCardTilt(x, y) {
  const clX = Math.max(-1, Math.min(1, x));
  const clY = Math.max(-1, Math.min(1, y));
  document.documentElement.style.setProperty(
    "--tiltX",
    (clX * TILT_MAX_DEG).toFixed(2),
  );
  document.documentElement.style.setProperty(
    "--tiltY",
    (clY * TILT_MAX_DEG).toFixed(2),
  );
}

let pendingTilt = null;
let tiltTicking = false;

function updateDeviceTilt() {
  if (!pendingTilt) {
    tiltTicking = false;
    return;
  }
  const { beta, gamma } = pendingTilt;

  const x = Math.max(-1, Math.min(1, gamma / 28));
  const y = Math.max(-1, Math.min(1, (beta - 45) / 28));
  setCardTilt(x, y);

  const profileWraps = document.querySelectorAll(".profile-portrait-wrap");
  profileWraps.forEach((wrap) => {
    let rotX = Math.max(-15, Math.min(15, beta - 45));
    let rotY = Math.max(-15, Math.min(15, gamma));
    wrap.style.setProperty("--rot-x", rotX + "deg");
    wrap.style.setProperty("--rot-y", rotY + "deg");
  });

  tiltTicking = false;
}

function handleDeviceOrientation(e) {
  if (e.beta === null || e.gamma === null) return;
  pendingTilt = { beta: e.beta, gamma: e.gamma };
  if (!tiltTicking) {
    tiltTicking = true;
    requestAnimationFrame(updateDeviceTilt);
  }
}

function enableDeviceTilt() {
  window.addEventListener("deviceorientation", handleDeviceOrientation);
}

const cardEl = document.getElementById("membershipCard");
let tiltEnabled = false;

function requestTiltPermissionOnce() {
  if (tiltEnabled) return;
  tiltEnabled = true;
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((state) => {
        if (state === "granted") enableDeviceTilt();
      })
      .catch(() => {});
  } else if (typeof DeviceOrientationEvent !== "undefined") {
    enableDeviceTilt();
  }
}

// Ensure any interaction on the page attempts to enable tilt (vital for iOS Safari)
document.body.addEventListener("click", requestTiltPermissionOnce, {
  once: true,
});
document.body.addEventListener("touchstart", requestTiltPermissionOnce, {
  once: true,
  passive: true,
});

if (cardEl) {
  let pointerTicking = false;
  cardEl.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const rect = cardEl.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (!pointerTicking) {
      pointerTicking = true;
      requestAnimationFrame(() => {
        setCardTilt(nx, ny);
        pointerTicking = false;
      });
    }
  });
  cardEl.addEventListener("pointerleave", () => setCardTilt(0, 0));
}

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

// Room selection visuals
document.querySelectorAll(".club-room-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".club-room-btn")
      .forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    if (window.AudioEngine) AudioEngine.playRustle();

    // Remove unread badge text when clicking to "read" it, but keep the badge structure if it's a dot
    const badge = btn.querySelector(".room-badge");
    if (badge) badge.remove();

    const roomName = btn.childNodes[0].nodeValue.trim(); // Get text without child elements
    document.querySelector(".club-pinned-title").textContent =
      `أهلًا بك في ${roomName}`;

    // Simulate someone typing in the room
    clearTimeout(typingTimeout);

    // Pick a random member from CLUB_MEMBERS
    const otherMembers = CLUB_MEMBERS.filter((m) => m.id !== ClubState.member.id);
    if (otherMembers.length > 0) {
      const randomMember =
        otherMembers[Math.floor(Math.random() * otherMembers.length)];

      // Delay before typing starts
      setTimeout(
        () => {
          setTypingIndicator(randomMember);

          // Stop typing after a few seconds
          typingTimeout = setTimeout(
            () => {
              setTypingIndicator(null);
            },
            3500 + Math.random() * 2000,
          );
        },
        500 + Math.random() * 1000,
      );
    } else {
      setTypingIndicator(null);
    }
  });
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
  }
}function equipItem(item, catKey) {
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
function renderProfileCollection() {
  const container = document.getElementById("profileCollectionList");
  if (!container) return;
  const owned = ClubState.owned;
  let hasItems = false;
  let itemsHtml = "";
  
  for (const catKey in BOUTIQUE) {
    for (const item of BOUTIQUE[catKey].items) {
      if (owned[item.id] && !item.free) {
        hasItems = true;
        const iconSvg = ICONS[item.icon] || ICONS["star"];
        itemsHtml += `
          <div class="profile-col-item rarity-${item.rarity}" onclick='openInspectionModal(${JSON.stringify(item)}, "${catKey}", true, ClubState.equipped["${catKey}"] === "${item.id}")'>
            <div class="profile-col-item-icon">${iconSvg}</div>
            <div class="profile-col-item-name">${item.name}</div>
            <div class="pci-rarity" style="font-size:9px;opacity:0.7;">${RARITY_LABEL[item.rarity]}</div>
          </div>
        `;
      }
    }
  }
  
  if (!hasItems) {
    itemsHtml = `<div class="empty-dossier" id="emptyDossier">المحفظة فارغة حالياً.</div>`;
  }
  container.innerHTML = itemsHtml;
}

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

  const menuAccountInfo = document.getElementById("menuAccountInfo");
  if (menuAccountInfo) {
    menuAccountInfo.addEventListener("click", () => {
      document.getElementById("editAccountBtn")?.click();
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

let typingTimeout = null;
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

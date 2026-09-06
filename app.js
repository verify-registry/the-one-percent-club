/* =========================================================
   THE 1% CLUB — app.js Phase 2
   Master Card · Club Chat · Credits · Boutique · Equip · Widget 1
========================================================= */

// ---------------------------------------------------------
// 1. MEMBER DATA
// ---------------------------------------------------------
const MEMBER = {
  id: "3426",
  name: "ISMAIL ELSAYED",
  tier: "SOVEREIGN MEMBER",
  quote: "Not everyone understands wealth. That's why we have this Club.",
  joined: "AUG 2026",
  wealthIndex: "98%",
  location: "ALEXANDRIA",
  interests: "DESIGN · CRAFT · TECHNOLOGY",
  status: "ACTIVE",
  wealthIndexValue: 92,
  privilegesValue: 84,
  verifyUrl: "https://1percent.club/verify/3426"
};

// ---------------------------------------------------------
// 2. DETERMINISTIC SEED
// ---------------------------------------------------------
function seedFromId(id) {
  let hash = 0;
  const str = String(id);
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------
// 3. LIVING CORE
// ---------------------------------------------------------
function livingCoreProfile(id) {
  const rand = mulberry32(seedFromId(id));
  const hue = 34 + rand() * 26;
  const duration = 2.2 + rand() * 1.2;
  return { hue, duration };
}

// ---------------------------------------------------------
// 4. HALLMARK — procedural guilloché SVG
// ---------------------------------------------------------
function generateHallmarkSVG(id) {
  const rand = mulberry32(seedFromId(id) + 7);
  const cx = 200, cy = 260;
  const rings = 5 + Math.floor(rand() * 3);
  const petals = 8 + Math.floor(rand() * 5) * 2;
  const rotation = rand() * 360;
  const jitter = 0.85 + rand() * 0.15;

  let paths = "";
  for (let i = 0; i < rings; i++) {
    const r = 40 + i * (36 * jitter);
    paths += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#hallmarkStroke)" stroke-width="0.5" opacity="${0.5 - i * 0.06}"/>`;
  }
  for (let i = 0; i < petals; i++) {
    const angle = (360 / petals) * i + rotation;
    const rad = (angle * Math.PI) / 180;
    const rOuter = 40 + (rings - 1) * (36 * jitter);
    const x2 = cx + Math.cos(rad) * rOuter;
    const y2 = cy + Math.sin(rad) * rOuter;
    const cRad = ((angle + 14) * Math.PI) / 180;
    const cxMid = cx + Math.cos(cRad) * (rOuter * 0.55);
    const cyMid = cy + Math.sin(cRad) * (rOuter * 0.55);
    paths += `<path d="M${cx},${cy} Q${cxMid},${cyMid} ${x2},${y2}" fill="none" stroke="url(#hallmarkStroke)" stroke-width="0.4" opacity="0.4"/>`;
  }
  return `
    <svg viewBox="0 0 400 520" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hallmarkStroke" x1="0" y1="0" x2="400" y2="520" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#8A6323"/>
          <stop offset="0.5" stop-color="#E9C877"/>
          <stop offset="1" stop-color="#8A6323"/>
        </linearGradient>
      </defs>
      ${paths}
    </svg>
  `;
}

// ---------------------------------------------------------
// 4b. BEZEL TICKS — luxury multi-ring medallion
// ---------------------------------------------------------
function generateBezelTicksSVG() {
  const size = 172, cx = 86, cy = 86;

  // Concentric rings (outermost → innermost)
  const ringDefs = [
    { r: 82, sw: 0.6, op: 0.45 },
    { r: 78, sw: 1.4, op: 0.65 },
    { r: 74, sw: 0.4, op: 0.35 },
    { r: 69, sw: 1.8, op: 0.75 },
    { r: 65, sw: 0.5, op: 0.3 },
  ];

  let svg = '';

  ringDefs.forEach(ring => {
    svg += `<circle cx="${cx}" cy="${cy}" r="${ring.r}" fill="none" stroke="url(#ringGoldGrad)" stroke-width="${ring.sw}" opacity="${ring.op}"/>`;
  });

  // Tick marks between outermost two rings
  const count = 60, rOuter = 82, rMinor = 77, rMajor = 74;
  for (let i = 0; i < count; i++) {
    const angle = (360 / count) * i - 90;
    const rad = (angle * Math.PI) / 180;
    const major = i % 5 === 0;
    const rInner = major ? rMajor : rMinor;
    const x1 = cx + Math.cos(rad) * rOuter;
    const y1 = cy + Math.sin(rad) * rOuter;
    const x2 = cx + Math.cos(rad) * rInner;
    const y2 = cy + Math.sin(rad) * rInner;
    svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="url(#ringGoldGrad)" stroke-width="${major ? 1.5 : 0.6}" opacity="${major ? 0.9 : 0.5}"/>`;
  }

  // Crown detail at 12 o'clock
  const crownScale = 0.55;
  const crownX = cx - 13 * crownScale;
  const crownY = cy - 82 - 14;
  svg += `<g transform="translate(${crownX.toFixed(1)},${crownY.toFixed(1)}) scale(${crownScale})">
    <path d="M2 18 L0 5 L8 11 L14 0 L20 11 L28 5 L26 18 Z" fill="url(#ringGoldGrad)" opacity="0.82" stroke="#3A2808" stroke-width="0.6"/>
    <circle cx="14" cy="0" r="1.6" fill="url(#ringGoldGrad)" opacity="0.9"/>
    <circle cx="0" cy="5" r="1.4" fill="url(#ringGoldGrad)" opacity="0.8"/>
    <circle cx="28" cy="5" r="1.4" fill="url(#ringGoldGrad)" opacity="0.8"/>
  </g>`;

  // Diamond ornaments at 3, 6, 9 o'clock positions
  [0, 90, 180].forEach(deg => {
    const rad = ((deg - 90) * Math.PI) / 180;
    const r = 71;
    const dx = cx + Math.cos(rad) * r;
    const dy = cy + Math.sin(rad) * r;
    svg += `<rect x="${(dx - 2).toFixed(1)}" y="${(dy - 2).toFixed(1)}" width="4" height="4" transform="rotate(45 ${dx.toFixed(1)} ${dy.toFixed(1)})" fill="url(#ringGoldGrad)" opacity="0.65"/>`;
  });

  // Fine inner engraving lines (rosette style)
  const innerLines = 24;
  const rStart = 63, rEnd = 67;
  for (let i = 0; i < innerLines; i++) {
    const angle = (360 / innerLines) * i;
    const rad = (angle * Math.PI) / 180;
    const x1 = cx + Math.cos(rad) * rStart;
    const y1 = cy + Math.sin(rad) * rStart;
    const x2 = cx + Math.cos(rad) * rEnd;
    const y2 = cy + Math.sin(rad) * rEnd;
    svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="url(#ringGoldGrad)" stroke-width="0.5" opacity="0.35"/>`;
  }

  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
}

// ---------------------------------------------------------
// 5. RENDER MEMBER
// ---------------------------------------------------------
const RING_CIRCUMFERENCE = 2 * Math.PI * 52;

function renderRing(ringId, valueId, percent) {
  const ring = document.getElementById(ringId);
  const value = document.getElementById(valueId);
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = RING_CIRCUMFERENCE * (1 - clamped / 100);
  value.textContent = `${clamped}%`;
  ring.style.strokeDashoffset = RING_CIRCUMFERENCE;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    ring.style.strokeDashoffset = offset;
  }));
}

function renderMember(member) {
  document.getElementById("memberNumber").textContent = member.id;
  document.getElementById("memberName").textContent = member.name;
  document.getElementById("tierName").textContent = member.tier;
  document.getElementById("memberQuote").textContent = `"${member.quote}"`;
  renderRing("wealthRing", "wealthValue", member.wealthIndexValue);
  renderRing("privRing", "privValue", member.privilegesValue);
  document.getElementById("hallmarkLayer").innerHTML = generateHallmarkSVG(member.id);
  const bezelEl = document.getElementById("bezelTicks");
  if (bezelEl) bezelEl.innerHTML = generateBezelTicksSVG();
  const core = livingCoreProfile(member.id);
  const root = document.documentElement;
  root.style.setProperty("--core-hue", core.hue.toFixed(1));
  document.getElementById("livingCore").style.animationDuration = `${core.duration.toFixed(2)}s`;
  document.getElementById("portraitRing").style.animationDuration = `${(core.duration * 1.7).toFixed(2)}s`;
}

renderMember(MEMBER);

// ---------------------------------------------------------
// 6. PHOTO UPLOAD
// ---------------------------------------------------------
const photoInput = document.getElementById("photoInput");
const photoUploadBtn = document.getElementById("photoUploadBtn");
const portraitPhoto = document.getElementById("portraitPhoto");

photoUploadBtn.addEventListener("click", () => photoInput.click());
photoInput.addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const url = ev.target.result;
    portraitPhoto.style.backgroundImage = `url(${url})`;
    photoUploadBtn.style.display = "none";
    const profilePhoto = document.getElementById("profilePortraitPhoto");
    if (profilePhoto) profilePhoto.style.backgroundImage = `url(${url})`;
    // Sync widget — re-render widget section if it's visible
    const widgetSection = document.querySelector(".boutique-section[data-category='widgets']");
    if (widgetSection) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = renderWidgetSection();
      widgetSection.replaceWith(tempDiv.firstElementChild);
      syncWidgetState();
    }
  };
  reader.readAsDataURL(file);
});

// ---------------------------------------------------------
// 7. MESSAGE CREDITS SYSTEM
// ---------------------------------------------------------
const DAILY_LIMITS = { 1: 2, 2: 5, 3: 10, 4: 25, 5: 50 };

function getMemberLevel() {
  const t = MEMBER.tier.toUpperCase();
  if (t.includes("SOVEREIGN")) return 5;
  if (t.includes("PRESTIGE")) return 4;
  if (t.includes("ELITE") || t.includes("ASSOCIATE")) return 3;
  if (t.includes("AFFILIATE")) return 2;
  return 1;
}

function getCreditKey() {
  const today = new Date().toISOString().slice(0, 10);
  return `credits_${MEMBER.id}_${today}`;
}

function getCredits() {
  const level = getMemberLevel();
  const limit = DAILY_LIMITS[level];
  const key = getCreditKey();
  const stored = localStorage.getItem(key);
  if (stored === null) {
    localStorage.setItem(key, limit);
    return { remaining: limit, limit };
  }
  return { remaining: parseInt(stored, 10), limit };
}

function deductCredit() {
  const { remaining } = getCredits();
  if (remaining <= 0) return false;
  localStorage.setItem(getCreditKey(), remaining - 1);
  return true;
}

function addBonusCredits(amount) {
  const { remaining } = getCredits();
  localStorage.setItem(getCreditKey(), remaining + amount);
}

function updateCreditsUI() {
  const { remaining, limit } = getCredits();
  const creditsText = document.getElementById("clubCreditsText");
  const input = document.getElementById("clubInput");
  const sendBtn = document.getElementById("clubSendBtn");
  if (!creditsText) return;

  if (remaining <= 0) {
    creditsText.innerHTML = "انتهى رصيد رسائلك اليومي.<br>يمكنك شراء رصيد إضافي.";
    creditsText.style.color = "#C97766";
    if (input) { input.disabled = true; input.placeholder = "انتهى الرصيد…"; }
    if (sendBtn) sendBtn.disabled = true;
  } else {
    creditsText.textContent = `الرسائل المتبقية اليوم: ${remaining} / ${limit}`;
    creditsText.style.color = "";
    if (input) { input.disabled = false; input.placeholder = "اكتب رسالة للنادي…"; }
    if (sendBtn) sendBtn.disabled = false;
  }
}

// Credits purchase modal
document.getElementById("clubCreditsBuyBtn").addEventListener("click", () => {
  document.getElementById("creditsModal").hidden = false;
});
document.getElementById("creditsCancelBtn").addEventListener("click", () => {
  document.getElementById("creditsModal").hidden = true;
  document.getElementById("creditsModalMsg").textContent = "";
});

document.querySelectorAll(".credits-pkg").forEach(btn => {
  btn.addEventListener("click", () => {
    const credits = parseInt(btn.dataset.credits, 10);
    const price = btn.dataset.price;
    addBonusCredits(credits);
    document.getElementById("creditsModalMsg").textContent = `✓ تمت إضافة ${credits} رسائل — $${price} (محاكاة)`;
    updateCreditsUI();
    setTimeout(() => {
      document.getElementById("creditsModal").hidden = true;
      document.getElementById("creditsModalMsg").textContent = "";
    }, 1800);
  });
});

// ---------------------------------------------------------
// 8. CLUB CHAT
// ---------------------------------------------------------
const CLUB_MEMBERS = [
  { id: "8172", name: "LUXOR_VOYAGER", tier: "سيادي", wealth: "92%", priv: "84%", text: "ممتن للطاقة في هذه الغرفة. نبني في صمت ونترك النجاح يتحدث.", time: "11:45 ص" },
  { id: "5510", name: "MILLIONAIRE_MIND", tier: "سيادي", wealth: "88%", priv: "76%", text: "الانضباط اليوم، الحرية غدًا.", time: "11:47 ص" },
  { id: "2290", name: "ELEVATED_LIFE", tier: "بلاتيني", wealth: "71%", priv: "63%", text: "الأشخاص المناسبون يرفعون كل شيء.", time: "11:48 ص" },
  { id: "6640", name: "GLOBAL_INVESTOR", tier: "سيادي", wealth: "95%", priv: "80%", text: "فرص جديدة كل يوم.", time: "11:50 ص" },
  { id: "3901", name: "CROWN_COLLECTOR", tier: "ذهبي", wealth: "58%", priv: "49%", text: "الإرث يُبنى، لا يُشترى.", time: "11:55 ص" }
];

function renderClubMessages() {
  const container = document.getElementById("clubMessages");
  // oldest → newest (array order)
  container.innerHTML = CLUB_MEMBERS.map((m) => {
    const isCurrentUser = m.id === MEMBER.id;
    return `
      <button class="club-message${isCurrentUser ? " is-current-user" : ""}" data-member-id="${m.id}" type="button">
        <span class="club-avatar"><span class="club-avatar-photo"></span></span>
        <span class="club-message-body">
          <span class="club-message-top">
            <span class="club-message-name">${m.name}</span>
            <span class="club-message-tier">${m.tier}</span>
            <span class="club-message-time">${m.time}</span>
          </span>
          <span class="club-message-text">${m.text}</span>
        </span>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".club-message").forEach((row) => {
    row.addEventListener("click", () => {
      const member = CLUB_MEMBERS.find((m) => m.id === row.dataset.memberId);
      if (member && member.id !== MEMBER.id) openMemberProfile(member);
    });
  });

  // Scroll to bottom (newest at bottom)
  requestAnimationFrame(() => {
    container.scrollTop = container.scrollHeight;
  });
}

function sendClubMessage() {
  const { remaining } = getCredits();
  if (remaining <= 0) {
    document.getElementById("creditsModal").hidden = false;
    return;
  }
  const input = document.getElementById("clubInput");
  const text = input.value.trim();
  if (!text) return;

  // Add to END of array (newest at bottom)
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const mins = now.getMinutes().toString().padStart(2, "0");
  const timeStr = `${hours}:${mins}`;

  CLUB_MEMBERS.push({
    id: MEMBER.id,
    name: MEMBER.name,
    tier: MEMBER.tier.replace(" MEMBER", ""),
    wealth: `${MEMBER.wealthIndexValue}%`,
    priv: `${MEMBER.privilegesValue}%`,
    text,
    time: timeStr
  });

  deductCredit();
  renderClubMessages();
  updateCreditsUI();
  input.value = "";
}

document.getElementById("clubSendBtn").addEventListener("click", sendClubMessage);
document.getElementById("clubInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendClubMessage();
});

renderClubMessages();

// ---------------------------------------------------------
// 9. MOCK BALANCE (localStorage)
// ---------------------------------------------------------
const BALANCE_KEY = `balance_${MEMBER.id}`;
const DEFAULT_BALANCE = 24750;

function getBalance() {
  const v = localStorage.getItem(BALANCE_KEY);
  return v === null ? DEFAULT_BALANCE : parseInt(v, 10);
}
function setBalance(val) {
  localStorage.setItem(BALANCE_KEY, val);
  const display = document.getElementById("boutiqueBalanceDisplay");
  if (display) display.textContent = val.toLocaleString("ar");
}
// Init display
document.getElementById("boutiqueBalanceDisplay").textContent = getBalance().toLocaleString("ar");

document.getElementById("boutiqueAddBalanceBtn").addEventListener("click", () => {
  setBalance(getBalance() + 10000);
  showNavToast("تمت إضافة ١٠,٠٠٠ — (محاكاة)");
});

// ---------------------------------------------------------
// 10. OWNED / EQUIPPED (localStorage)
// ---------------------------------------------------------
const OWNED_KEY = `owned_${MEMBER.id}`;
const EQUIPPED_KEY = `equipped_${MEMBER.id}`;

function getOwned() {
  try { return JSON.parse(localStorage.getItem(OWNED_KEY)) || {}; } catch { return {}; }
}
function setOwned(data) { localStorage.setItem(OWNED_KEY, JSON.stringify(data)); }

function getEquipped() {
  try { return JSON.parse(localStorage.getItem(EQUIPPED_KEY)) || {}; } catch { return {}; }
}
function setEquipped(data) {
  localStorage.setItem(EQUIPPED_KEY, JSON.stringify(data));
  applyEquippedToCard(data);
}

// Equip-category slot mapping
const EQUIP_CATEGORIES = {
  crowns: "crown",
  auras: "aura",
  stars: "stars",
  jewelry: "ring"
};

function applyEquippedToCard(equipped) {
  // --- CROWN ---
  const crownSlot = document.getElementById("equippedCrownSlot");
  if (crownSlot) {
    if (equipped.crowns) {
      crownSlot.innerHTML = `<svg viewBox="0 0 48 28" fill="none">
        <path d="M4 24 L2 9 L12 16 L24 4 L36 16 L46 9 L44 24 Z" fill="url(#bezelGrad)" stroke="var(--gold-line)" stroke-width="0.8"/>
        <circle cx="24" cy="4" r="2.4" fill="url(#bezelGrad)"/>
        <circle cx="2" cy="9" r="2" fill="url(#bezelGrad)"/>
        <circle cx="46" cy="9" r="2" fill="url(#bezelGrad)"/>
      </svg>`;
    } else {
      crownSlot.innerHTML = "";
    }
  }

  // --- AURA ---
  const auraSlot = document.getElementById("equippedAuraSlot");
  if (auraSlot) {
    auraSlot.className = "equipped-aura-slot";
    if (equipped.auras) {
      const auraKey = equipped.auras.replace(/\s+/g, "-").toLowerCase();
      let auraClass = "active-aura-golden";
      if (auraKey.includes("radiant")) auraClass = "active-aura-radiant";
      else if (auraKey.includes("royal")) auraClass = "active-aura-royal";
      else if (auraKey.includes("legendary") || auraKey.includes("mythic")) auraClass = "active-aura-legendary";
      auraSlot.classList.add(auraClass);
    }
  }

  // --- STARS ---
  const starsSlot = document.getElementById("equippedStarsSlot");
  if (starsSlot) {
    if (equipped.stars) {
      const count = parseInt(equipped.stars.match(/\d+/)?.[0] || "1", 10);
      const starsSvg = Array.from({ length: Math.min(count, 5) }).map(() =>
        `<svg viewBox="0 0 10 10" fill="none"><path d="M5 1l.9 2.7H9l-2.3 1.7.9 2.6L5 6.6 2.4 8l.9-2.6L1 3.7h3.1z" fill="url(#ringGoldGrad)"/></svg>`
      ).join("");
      starsSlot.innerHTML = starsSvg;
    } else {
      starsSlot.innerHTML = "";
    }
  }

  // --- RING / SIGNET (jewelry) ---
  // Shows beneath member name as a precision signet marker
  const ringSlot = document.getElementById("equippedRingSlot");
  const ringLabel = document.getElementById("equippedRingLabel");
  if (ringSlot && ringLabel) {
    if (equipped.jewelry) {
      ringLabel.textContent = equipped.jewelry.toUpperCase();
      ringSlot.classList.add("active");
    } else {
      ringSlot.classList.remove("active");
    }
  }

  // Sync widget state after any equip change
  syncWidgetState(equipped);
}

// Sync Widget 1 with current card state
function syncWidgetState(equipped) {
  equipped = equipped || getEquipped();
  // Living core animation duration
  const wlc = document.querySelector(".widget-living-core");
  if (wlc) {
    const core = livingCoreProfile(MEMBER.id);
    wlc.style.animationDuration = `${core.duration.toFixed(2)}s`;
  }
  // Portrait
  const portraitBg = document.getElementById("portraitPhoto")?.style.backgroundImage || "";
  const widgetPhoto = document.querySelector(".widget-portrait-photo");
  if (widgetPhoto) {
    if (portraitBg) {
      widgetPhoto.style.backgroundImage = portraitBg;
      widgetPhoto.innerHTML = "";
    }
  }
  // Crown on widget
  const widgetCrown = document.querySelector(".widget-crown-slot");
  if (widgetCrown) {
    widgetCrown.innerHTML = equipped.crowns
      ? `<svg viewBox="0 0 32 18" fill="none" style="width:32px;height:18px"><path d="M2 16L1 6l7 5 8-9 8 9 7-5-1 10z" fill="url(#bezelGrad)" stroke="var(--gold-line)" stroke-width="0.6"/></svg>`
      : "";
  }
  // Aura on widget
  const widgetRing = document.querySelector(".widget-portrait-ring");
  if (widgetRing) {
    widgetRing.style.filter = equipped.auras
      ? "drop-shadow(0 0 8px rgba(212,175,106,0.6))"
      : "";
  }
}

// Init card from stored equipped
applyEquippedToCard(getEquipped());

// ---------------------------------------------------------
// 11. BOUTIQUE CATALOG
// ---------------------------------------------------------
const RARITY_LABEL = {
  rare: "نادر", epic: "استثنائي", legendary: "أسطوري",
  mythic: "خرافي", unique: "فريد — 1/1", free: "مجاني"
};

const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 16.9 6.2 20l1.1-6.5L2.5 8.9l6.6-.9L12 2z" fill="url(#ringGoldGrad)" stroke="#5C430F" stroke-width="0.4"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20l1-9 4 3 3-7 3 7 4-3 1 9z" fill="url(#ringGoldGrad)" stroke="#5C430F" stroke-width="0.4"/></svg>`,
  aura: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="url(#ringGoldGrad)" stroke-width="1.8"/><circle cx="12" cy="12" r="4.5" stroke="url(#ringGoldGrad)" stroke-width="0.6" opacity="0.5"/></svg>`,
  ring: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="6" stroke="url(#ringGoldGrad)" stroke-width="1.8"/><path d="M9 8l3-5 3 5-3 2z" fill="url(#ringGoldGrad)" stroke="#5C430F" stroke-width="0.4"/></svg>`,
  pendant: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v6" stroke="url(#ringGoldGrad)" stroke-width="1.6"/><path d="M8 9h8l-4 12z" fill="url(#ringGoldGrad)" stroke="#5C430F" stroke-width="0.4"/></svg>`,
  artifact: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill="url(#ringGoldGrad)"/><circle cx="12" cy="12" r="9" stroke="url(#ringGoldGrad)" stroke-width="1"/><circle cx="12" cy="12" r="9" stroke="url(#ringGoldGrad)" stroke-width="1" transform="rotate(45 12 12)"/></svg>`,
  widget: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2" stroke="url(#ringGoldGrad)" stroke-width="1.4"/></svg>`
};

const BOUTIQUE = {
  stars: {
    title: "النجوم", sub: "ارتقِ بمكانتك. اكسب الاحترام.",
    cat: "stars",
    items: [
      { id: "star-1", name: "نجمة ذهبية", rarity: "rare", price: 200, icon: "star" },
      { id: "star-3", name: "٣ نجوم ذهبية", rarity: "rare", price: 500, icon: "star" },
      { id: "star-5", name: "٥ نجوم", rarity: "epic", price: 800, icon: "star" },
      { id: "star-10", name: "١٠ نجوم إمبراطورية", rarity: "legendary", price: 1500, icon: "star" }
    ]
  },
  crowns: {
    title: "التيجان", sub: "ارتدِ التاج. تصدّر الـ1%.",
    cat: "crowns",
    items: [
      { id: "crown-sovereign", name: "التاج السيادي", rarity: "rare", price: 750, icon: "crown" },
      { id: "crown-royal", name: "التاج الملكي", rarity: "epic", price: 1500, icon: "crown" },
      { id: "crown-imperial", name: "التاج الإمبراطوري", rarity: "legendary", price: 3000, icon: "crown" },
      { id: "crown-legend", name: "تاج الأسطورة", rarity: "mythic", price: 6000, icon: "crown" }
    ]
  },
  auras: {
    title: "الهالات", sub: "هالتك. طاقتك.",
    cat: "auras",
    items: [
      { id: "aura-golden", name: "الهالة الذهبية", rarity: "rare", price: 500, icon: "aura" },
      { id: "aura-radiant", name: "الهالة المشعة", rarity: "epic", price: 1000, icon: "aura" },
      { id: "aura-royal", name: "الهالة الملكية", rarity: "legendary", price: 1800, icon: "aura" },
      { id: "aura-legendary", name: "الهالة الخرافية", rarity: "mythic", price: 3500, icon: "aura" }
    ]
  },
  jewelry: {
    title: "المجوهرات", sub: "قطع تُصنع لا تُشترى.",
    cat: "jewelry",
    items: [
      { id: "ring-sovereign", name: "الخاتم السيادي", rarity: "rare", price: 900, icon: "ring" },
      { id: "ring-diamond", name: "خاتم الماس", rarity: "epic", price: 1800, icon: "ring" },
      { id: "pendant-gold", name: "قلادة ذهبية", rarity: "epic", price: 1600, icon: "pendant" },
      { id: "pendant-diamond", name: "قلادة الماس", rarity: "legendary", price: 2600, icon: "pendant" }
    ]
  },
  artifacts: {
    title: "المقتنيات النادرة", sub: "محدودة. أسطورية. لا مثيل لها.",
    cat: "artifacts",
    items: [
      { id: "artifact-medallion", name: "الميدالية السيادية", rarity: "legendary", price: 25000, icon: "artifact" },
      { id: "artifact-seal", name: "ختم الماس الأسود", rarity: "mythic", price: 40000, icon: "artifact" },
      { id: "artifact-orb", name: "الكرة الأزلية", rarity: "mythic", price: 75000, icon: "artifact" },
      { id: "artifact-legacy", name: "إرث الـ1%", rarity: "unique", price: 100000, icon: "artifact" }
    ]
  },
  widgets: {
    title: "الودجت", sub: "ارتدِ مكانتك على شاشتك الرئيسية.",
    cat: "widgets",
    items: [
      { id: "widget-1", name: "بطاقة العضوية الفاخرة", rarity: "free", price: 0, icon: "widget", free: true }
    ]
  }
};

// ---------------------------------------------------------
// 12. PURCHASE MODAL
// ---------------------------------------------------------
let pendingPurchase = null;

function openPurchaseModal(item, catKey) {
  pendingPurchase = { item, catKey };
  const owned = getOwned();
  const balance = getBalance();

  document.getElementById("purchaseModalIcon").innerHTML = ICONS[item.icon] || "";
  document.getElementById("purchaseModalName").textContent = item.name;
  document.getElementById("purchaseModalRarity").textContent = RARITY_LABEL[item.rarity] || item.rarity;
  document.getElementById("purchaseModalPrice").textContent = item.price.toLocaleString("ar") + " ◈";
  document.getElementById("purchaseModalBalance").textContent = balance.toLocaleString("ar") + " ◈";
  document.getElementById("purchaseModalMsg").textContent = "";
  document.getElementById("purchaseModal").hidden = false;
}

document.getElementById("purchaseCancelBtn").addEventListener("click", () => {
  document.getElementById("purchaseModal").hidden = true;
  pendingPurchase = null;
});

document.getElementById("purchaseConfirmBtn").addEventListener("click", () => {
  if (!pendingPurchase) return;
  const { item, catKey } = pendingPurchase;
  const balance = getBalance();
  const msg = document.getElementById("purchaseModalMsg");

  if (balance < item.price) {
    msg.className = "purchase-modal-msg has-action";
    msg.innerHTML = `<span style="color:#C97766">الرصيد غير كافٍ.</span>
      <button class="btn-add-balance" type="button" id="modalAddBalanceBtn">إضافة رصيد +١٠,٠٠٠</button>`;
    document.getElementById("modalAddBalanceBtn")?.addEventListener("click", () => {
      setBalance(getBalance() + 10000);
      // Update balance row
      document.getElementById("purchaseModalBalance").textContent =
        getBalance().toLocaleString("ar") + " ◈";
      msg.className = "purchase-modal-msg";
      msg.innerHTML = "";
    });
    return;
  }

  setBalance(balance - item.price);
  // Update balance display in open modal immediately
  document.getElementById("purchaseModalBalance").textContent =
    getBalance().toLocaleString("ar") + " ◈";

  const owned = getOwned();
  if (!owned[catKey]) owned[catKey] = [];
  if (!owned[catKey].includes(item.id)) owned[catKey].push(item.id);
  setOwned(owned);

  msg.className = "purchase-modal-msg";
  msg.style.color = "#7FBE8C";
  msg.textContent = `✓ تمت عملية الشراء — ${item.name}`;

  setTimeout(() => {
    document.getElementById("purchaseModal").hidden = true;
    pendingPurchase = null;
    renderBoutique(document.querySelector(".boutique-tab.is-active")?.dataset.cat || "all");
  }, 1200);
});

// ---------------------------------------------------------
// 13. EQUIP SYSTEM
// ---------------------------------------------------------
function toggleEquip(item, catKey) {
  const equipped = getEquipped();
  const equipSlot = EQUIP_CATEGORIES[catKey];
  if (!equipSlot) return;

  if (equipped[catKey] === item.name) {
    // Unequip
    delete equipped[catKey];
    setEquipped(equipped);
    showNavToast(`تم فك تجهيز: ${item.name}`);
  } else {
    // Equip (replaces previous in same slot)
    equipped[catKey] = item.name;
    setEquipped(equipped);
    showNavToast(`تم تجهيز: ${item.name}`);
  }
  renderBoutique(document.querySelector(".boutique-tab.is-active")?.dataset.cat || "all");
}

// ---------------------------------------------------------
// 14. BOUTIQUE RENDER
// ---------------------------------------------------------
function renderBoutique(filter = "all") {
  const root = document.getElementById("boutiqueSections");
  const owned = getOwned();
  const equipped = getEquipped();
  const categories = filter === "all" ? Object.keys(BOUTIQUE) : [filter];

  root.innerHTML = categories.map((catKey) => {
    const cat = BOUTIQUE[catKey];

    // Widget 1 special rendering
    if (catKey === "widgets") {
      return renderWidgetSection();
    }

    const cards = cat.items.map((item) => {
      const isOwned = owned[catKey] && owned[catKey].includes(item.id);
      const isEquipped = equipped[catKey] === item.name;
      const canEquip = EQUIP_CATEGORIES[catKey] !== undefined;

      let btnText, btnClass;
      if (item.free) {
        btnText = "مجاني — مُفعَّل"; btnClass = "btn-free";
      } else if (isEquipped) {
        btnText = "✓ مجهّز — فك التجهيز"; btnClass = "btn-equipped";
      } else if (isOwned && canEquip) {
        btnText = "تجهيز"; btnClass = "btn-equip";
      } else if (isOwned) {
        btnText = "مملوك"; btnClass = "btn-owned";
      } else {
        btnText = "امتلك"; btnClass = "";
      }

      const cardClass = `boutique-card${isOwned ? " is-owned" : ""}${isEquipped ? " is-equipped" : ""}`;
      const priceHtml = item.free
        ? `<span class="boutique-card-price is-free">مجاني</span>`
        : `<span class="boutique-card-price"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="url(#ringGoldGrad)" stroke-width="1.4"/></svg>${item.price.toLocaleString("ar")}</span>`;

      return `
        <div class="${cardClass}" data-item-id="${item.id}" data-cat="${catKey}">
          <span class="rarity-badge rarity-${item.rarity}">${RARITY_LABEL[item.rarity]}</span>
          <span class="boutique-card-icon">
            <span class="boutique-card-fallback" style="display:flex">${ICONS[item.icon]}</span>
          </span>
          <span class="boutique-card-name">${item.name}</span>
          ${priceHtml}
          <button class="boutique-own-btn ${btnClass}" type="button"
            data-item-id="${item.id}" data-cat="${catKey}"
            data-owned="${isOwned ? "1" : "0"}"
            data-equipped="${isEquipped ? "1" : "0"}"
            data-free="${item.free ? "1" : "0"}">
            ${btnText}
          </button>
        </div>
      `;
    }).join("");

    return `
      <section class="boutique-section" data-category="${catKey}">
        <div class="boutique-section-head">
          <h3>${cat.title}</h3>
          <span class="boutique-section-sub">${cat.sub}</span>
        </div>
        <div class="boutique-grid">${cards}</div>
      </section>
    `;
  }).join("");

  // Wire up buttons
  root.querySelectorAll(".boutique-own-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.dataset.itemId;
      const catKey = btn.dataset.cat;
      const isOwned = btn.dataset.owned === "1";
      const isEquipped = btn.dataset.equipped === "1";
      const isFree = btn.dataset.free === "1";
      const cat = BOUTIQUE[catKey];
      if (!cat) return;
      const item = cat.items.find(i => i.id === itemId);
      if (!item) return;

      if (isFree) return; // widgets are always free / active
      if (isOwned && EQUIP_CATEGORIES[catKey]) {
        toggleEquip(item, catKey);
      } else if (!isOwned) {
        openPurchaseModal(item, catKey);
      }
    });
  });

  syncWidgetState();
}

function renderWidgetSection() {
  const equipped = getEquipped();
  // Portrait sync
  const portraitBg = document.getElementById("portraitPhoto")?.style.backgroundImage || "";
  const widgetPhotoStyle = portraitBg ? `background-image:${portraitBg};` : "";
  // Crown sync
  const crownHTML = equipped.crowns
    ? `<div class="widget-crown-slot" style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);width:32px;height:18px;display:flex;align-items:center;justify-content:center;">
        <svg viewBox="0 0 48 28" fill="none" style="width:100%;height:100%">
          <path d="M4 24 L2 9 L12 16 L24 4 L36 16 L46 9 L44 24 Z" fill="url(#bezelGrad)" stroke="var(--gold-line)" stroke-width="0.8"/>
          <circle cx="24" cy="4" r="2" fill="url(#bezelGrad)"/>
        </svg>
      </div>`
    : `<div class="widget-crown-slot" style="display:none"></div>`;
  // Aura filter
  const auraFilter = equipped.auras
    ? `filter:drop-shadow(0 0 8px rgba(212,175,106,0.55));`
    : "";
  // Member data — Single Source of Truth from MEMBER
  const displayName = document.getElementById("memberName")?.textContent || MEMBER.name;
  const displayId = document.getElementById("memberNumber")?.textContent || MEMBER.id;
  const displayTier = document.getElementById("tierName")?.textContent || MEMBER.tier;

  return `
    <section class="boutique-section widget-section" data-category="widgets">
      <div class="boutique-section-head">
        <h3>${BOUTIQUE.widgets.title}</h3>
        <span class="boutique-section-sub">${BOUTIQUE.widgets.sub}</span>
      </div>
      <p class="widget-preview-label">WIDGET 1 — MASTER MEMBERSHIP CARD</p>

      <div class="widget-card-preview">
        <div class="card-top-bar" style="margin-bottom:8px;">
          <svg style="width:22px;height:13px;" viewBox="0 0 48 28" fill="none">
            <path d="M4 24 L2 9 L12 16 L24 4 L36 16 L46 9 L44 24 Z" fill="url(#bezelGrad)" stroke="var(--gold-line)" stroke-width="0.8"/>
            <circle cx="24" cy="4" r="2" fill="url(#bezelGrad)"/>
          </svg>
          <span style="font-size:7px;letter-spacing:0.18em;font-family:var(--font-display);background:var(--gold-text);-webkit-background-clip:text;background-clip:text;color:transparent;font-weight:600;">THE 1% CLUB</span>
          <span style="font-size:6px;letter-spacing:0.12em;color:rgba(160,130,60,0.65);">2026</span>
        </div>

        <div style="position:relative;display:inline-block;">
          ${crownHTML}
          <div class="widget-portrait-ring" style="${auraFilter}">
            <div class="widget-portrait-photo" style="${widgetPhotoStyle}">
              ${!widgetPhotoStyle ? `<svg viewBox="0 0 24 24" fill="none" style="width:20px;height:20px;opacity:0.35"><circle cx="12" cy="9" r="3.5" stroke="url(#ringGoldGrad)" stroke-width="1.2"/><path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" stroke="url(#ringGoldGrad)" stroke-width="1.2" stroke-linecap="round"/></svg>` : ""}
            </div>
          </div>
        </div>

        <p class="widget-member-number">${displayId}</p>
        <p class="widget-member-name">${displayName}</p>
        <p class="widget-tier">${displayTier}</p>
        <div class="widget-living-core">
          <svg viewBox="0 0 40 40"><path d="M20 2 L23 17 L38 20 L23 23 L20 38 L17 23 L2 20 L17 17 Z"/></svg>
        </div>
      </div>

      <button class="widget-add-btn" type="button">
        ✓ مجاني — مُفعَّل
      </button>
    </section>
  `;
}

document.querySelectorAll(".boutique-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".boutique-tab").forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    renderBoutique(tab.dataset.cat);
  });
});

renderBoutique();

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
    await navigator.clipboard.writeText(MEMBER.verifyUrl);
    showCopyToast("تم نسخ الرابط");
  } catch {
    showCopyToast(MEMBER.verifyUrl);
  }
});

// ---------------------------------------------------------
// 16. SHARE — MASTER CARD IMAGE (html2canvas)
// ---------------------------------------------------------

// Dynamically load html2canvas once when needed
let html2canvasPromise = null;
function loadHtml2Canvas() {
  if (window.html2canvas) return Promise.resolve(window.html2canvas);
  if (html2canvasPromise) return html2canvasPromise;
  html2canvasPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s.onload = () => resolve(window.html2canvas);
    s.onerror = () => reject(new Error("html2canvas load failed"));
    document.head.appendChild(s);
  });
  return html2canvasPromise;
}

async function renderMasterCardToBlob() {
  const card = document.getElementById("membershipCard");

  // Load html2canvas
  const h2c = await loadHtml2Canvas();

  // Temporarily patch: disable tilt transform for clean capture
  const prevTX = getComputedStyle(document.documentElement).getPropertyValue("--tiltX");
  const prevTY = getComputedStyle(document.documentElement).getPropertyValue("--tiltY");
  document.documentElement.style.setProperty("--tiltX", "0");
  document.documentElement.style.setProperty("--tiltY", "0");

  // Wait a frame for transform to settle
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  const canvas = await h2c(card, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#050505",
    logging: false,
    removeContainer: true,
    // Ignore canvas taint errors gracefully
    onclone: (doc) => {
      // Strip transform so card renders flat
      const clonedCard = doc.getElementById("membershipCard");
      if (clonedCard) {
        clonedCard.style.transform = "none";
        clonedCard.style.transition = "none";
      }
    }
  });

  // Restore tilt
  document.documentElement.style.setProperty("--tiltX", prevTX);
  document.documentElement.style.setProperty("--tiltY", prevTY);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("toBlob failed")), "image/png");
  });
}

async function shareMasterCard() {
  showCopyToast("جارٍ تحضير الصورة…");

  try {
    const blob = await renderMasterCardToBlob();
    const fname = `1percent-club-${MEMBER.id}.png`;
    const file = new File([blob], fname, { type: "image/png" });

    // Try Web Share API with image file (supported on iOS 15+, Android Chrome)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "THE 1% CLUB",
          text: `${MEMBER.name} — Member Nº${MEMBER.id} — ${MEMBER.tier}`
        });
        return;
      } catch (shareErr) {
        if (shareErr.name === "AbortError") return; // User cancelled — do nothing
        // Otherwise fall through to download
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
    showCopyToast("✓ تم تحميل صورة البطاقة");

  } catch (err) {
    // Final fallback: share URL text
    const shareData = {
      title: "THE 1% CLUB",
      text: `${MEMBER.name} — Member Nº${MEMBER.id} — ${MEMBER.tier}`,
      url: MEMBER.verifyUrl
    };
    if (navigator.share) {
      try { await navigator.share(shareData); return; } catch { /* cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(MEMBER.verifyUrl);
      showCopyToast("تم نسخ الرابط السيادي");
    } catch {
      showCopyToast(MEMBER.verifyUrl);
    }
  }
}

document.getElementById("shareBtn").addEventListener("click", shareMasterCard);
document.getElementById("profileShareBtn").addEventListener("click", shareMasterCard);

// ---------------------------------------------------------
// 17. BOTTOM NAV
// ---------------------------------------------------------
const navToast = document.getElementById("navToast");
const sectionName = document.getElementById("sectionName");
let navToastTimer = null;

function showNavToast(msg) {
  navToast.textContent = msg;
  navToast.classList.add("is-visible");
  clearTimeout(navToastTimer);
  navToastTimer = setTimeout(() => navToast.classList.remove("is-visible"), 1800);
}

const PAGE_TITLES = { card: "العضوية", profile: "الملف", club: "النادي", shop: "البوتيك" };
const IMPLEMENTED_TABS = ["card", "profile", "club", "shop"];

function goToPage(tab) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("is-active"));
  document.getElementById(`page-${tab}`)?.classList.add("is-active");
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("is-active"));
  document.querySelector(`.nav-item[data-tab="${tab}"]`)?.classList.add("is-active");
  sectionName.textContent = PAGE_TITLES[tab] || tab;
  document.getElementById("backBtn").hidden = true;
  document.getElementById("appHeader").classList.toggle("header-compact", tab === "club");
  document.querySelector(".app-main").scrollTop = 0;
  window.scrollTo(0, 0);

  // When opening club, scroll chat to bottom and update credits
  if (tab === "club") {
    updateCreditsUI();
    requestAnimationFrame(() => {
      const msgs = document.getElementById("clubMessages");
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    });
  }
}

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    const tab = item.dataset.tab;
    if (IMPLEMENTED_TABS.includes(tab)) { goToPage(tab); return; }
    const prev = document.querySelector(".nav-item.is-active")?.dataset.tab || "card";
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("is-active"));
    item.classList.add("is-active");
    showNavToast(`${item.querySelector("span").textContent} — قريبًا`);
    clearTimeout(navToastTimer);
    navToastTimer = setTimeout(() => {
      navToast.classList.remove("is-visible");
      item.classList.remove("is-active");
      document.querySelector(`.nav-item[data-tab="${prev}"]`)?.classList.add("is-active");
    }, 1800);
  });
});

// Profile → Shop shortcut
document.getElementById("goToShopBtn")?.addEventListener("click", () => goToPage("shop"));

// ---------------------------------------------------------
// 18. CONTEXTUAL NAV (back button)
// ---------------------------------------------------------
let contextReturnTab = "club";

function openContextPage(pageId, title, returnTab) {
  contextReturnTab = returnTab;
  document.querySelectorAll(".page").forEach(p => p.classList.remove("is-active"));
  document.getElementById(pageId)?.classList.add("is-active");
  document.getElementById("sectionName").textContent = title;
  document.getElementById("appHeader").classList.remove("header-compact");
  document.getElementById("backBtn").hidden = false;
  document.querySelector(".app-main").scrollTop = 0;
  window.scrollTo(0, 0);
}

function openMemberProfile(member) {
  document.getElementById("memberProfileName").textContent = member.name;
  document.getElementById("memberProfileTier").textContent = `عضو ${member.tier}`;
  document.getElementById("memberProfileQuote").textContent = `"${member.text}"`;
  document.getElementById("memberProfileWealth").textContent = member.wealth;
  document.getElementById("memberProfilePriv").textContent = member.priv;
  openContextPage("page-member", "ملف العضو", "club");
}

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("backBtn").hidden = true;
  goToPage(contextReturnTab);
});

document.querySelectorAll("#page-member .card-actions .btn").forEach(btn => {
  btn.addEventListener("click", () => showNavToast("قريبًا"));
});

document.getElementById("editAccountBtn").addEventListener("click", () => {
  document.getElementById("editName").value = document.getElementById("memberName").textContent;
  document.getElementById("editUsername").value = document.getElementById("profileName").textContent;
  document.getElementById("editBio").value = document.getElementById("profileBioValue").textContent;
  document.getElementById("editInterests").value = document.getElementById("profileInterestsValue").textContent;
  document.getElementById("editLocation").value = document.getElementById("profileLocationValue").textContent;
  openContextPage("page-edit-account", "تعديل الحساب", "profile");
});

document.getElementById("editAccountForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("memberName").textContent = document.getElementById("editName").value;
  document.getElementById("profileName").textContent = document.getElementById("editUsername").value;
  document.getElementById("profileBioValue").textContent = document.getElementById("editBio").value;
  document.getElementById("profileInterestsValue").textContent = document.getElementById("editInterests").value;
  document.getElementById("profileLocationValue").textContent = document.getElementById("editLocation").value;
  document.getElementById("backBtn").hidden = true;
  goToPage("profile");
});

// ---------------------------------------------------------
// 19. 3D TILT
// ---------------------------------------------------------
const TILT_MAX_DEG = 7;

function setCardTilt(x, y) {
  const clX = Math.max(-1, Math.min(1, x));
  const clY = Math.max(-1, Math.min(1, y));
  document.documentElement.style.setProperty("--tiltX", (clX * TILT_MAX_DEG).toFixed(2));
  document.documentElement.style.setProperty("--tiltY", (clY * TILT_MAX_DEG).toFixed(2));
}

function handleDeviceOrientation(e) {
  if (e.beta === null || e.gamma === null) return;
  setCardTilt(Math.max(-1, Math.min(1, e.gamma / 28)), Math.max(-1, Math.min(1, (e.beta - 45) / 28)));
}

function enableDeviceTilt() {
  window.addEventListener("deviceorientation", handleDeviceOrientation);
}

const cardEl = document.getElementById("membershipCard");
let tiltEnabled = false;

function requestTiltPermissionOnce() {
  if (tiltEnabled) return;
  tiltEnabled = true;
  if (typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission()
      .then(state => { if (state === "granted") enableDeviceTilt(); })
      .catch(() => {});
  } else if (typeof DeviceOrientationEvent !== "undefined") {
    enableDeviceTilt();
  }
}

if (cardEl) {
  cardEl.addEventListener("touchstart", requestTiltPermissionOnce, { once: true, passive: true });
  cardEl.addEventListener("pointermove", e => {
    if (e.pointerType === "touch") return;
    const rect = cardEl.getBoundingClientRect();
    setCardTilt(((e.clientX - rect.left) / rect.width - 0.5) * 2, ((e.clientY - rect.top) / rect.height - 0.5) * 2);
  });
  cardEl.addEventListener("pointerleave", () => setCardTilt(0, 0));
}

// ---------------------------------------------------------
// INIT
// ---------------------------------------------------------
updateCreditsUI();

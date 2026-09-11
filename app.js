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
  verifyUrl: "https://1percent.club/verify/3426",
};

const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 16.9 6.2 20l1.1-6.5L2.5 8.9l6.6-.9L12 2z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20l1-9 4 3 3-7 3 7 4-3 1 9z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  aura: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="#C79A3E" stroke-width="1.8"/><circle cx="12" cy="12" r="4.5" stroke="#C79A3E" stroke-width="0.6" opacity="0.5"/></svg>`,
  ring: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="6" stroke="#C79A3E" stroke-width="1.8"/><path d="M9 8l3-5 3 5-3 2z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  pendant: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v6" stroke="#C79A3E" stroke-width="1.6"/><path d="M8 9h8l-4 12z" fill="#C79A3E" stroke="#8F6B2B" stroke-width="1.2"/></svg>`,
  artifact: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill="#C79A3E"/><circle cx="12" cy="12" r="9" stroke="#C79A3E" stroke-width="1"/><circle cx="12" cy="12" r="9" stroke="#C79A3E" stroke-width="1" transform="rotate(45 12 12)"/></svg>`,
  widget: `<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="14" rx="2" stroke="#C79A3E" stroke-width="1.4"/></svg>`,
};

const EQUIP_CATEGORIES = {
  crowns: "crown",
  auras: "aura",
  stars: "stars",
  jewelry: "ring",
};

const BOUTIQUE = {
  stars: {
    title: "النجوم",
    sub: "ارتقِ بمكانتك. اكسب الاحترام.",
    cat: "stars",
    items: [
      {
        id: "star-1",
        name: "نجمة ذهبية",
        rarity: "rare",
        price: 200,
        icon: "star",
      },
      {
        id: "star-3",
        name: "٣ نجوم ذهبية",
        rarity: "rare",
        price: 500,
        icon: "star",
      },
      {
        id: "star-5",
        name: "٥ نجوم",
        rarity: "epic",
        price: 800,
        icon: "star",
      },
      {
        id: "star-10",
        name: "١٠ نجوم إمبراطورية",
        rarity: "legendary",
        price: 1500,
        icon: "star",
      },
    ],
  },
  crowns: {
    title: "التيجان",
    sub: "ارتدِ التاج. تصدّر الـ1%.",
    cat: "crowns",
    items: [
      {
        id: "crown-sovereign",
        name: "التاج السيادي",
        rarity: "rare",
        price: 750,
        icon: "crown",
      },
      {
        id: "crown-royal",
        name: "التاج الملكي",
        rarity: "epic",
        price: 1500,
        icon: "crown",
      },
      {
        id: "crown-imperial",
        name: "التاج الإمبراطوري",
        rarity: "legendary",
        price: 3000,
        icon: "crown",
      },
      {
        id: "crown-legend",
        name: "تاج الأسطورة",
        rarity: "mythic",
        price: 6000,
        icon: "crown",
      },
    ],
  },
  auras: {
    title: "الهالات",
    sub: "هالتك. طاقتك.",
    cat: "auras",
    items: [
      {
        id: "aura-golden",
        name: "الهالة الذهبية",
        rarity: "rare",
        price: 500,
        icon: "aura",
      },
      {
        id: "aura-radiant",
        name: "الهالة المشعة",
        rarity: "epic",
        price: 1000,
        icon: "aura",
      },
      {
        id: "aura-royal",
        name: "الهالة الملكية",
        rarity: "legendary",
        price: 1800,
        icon: "aura",
      },
      {
        id: "aura-legendary",
        name: "الهالة الخرافية",
        rarity: "mythic",
        price: 3500,
        icon: "aura",
      },
    ],
  },
  jewelry: {
    title: "المجوهرات",
    sub: "قطع تُصنع لا تُشترى.",
    cat: "jewelry",
    items: [
      {
        id: "ring-sovereign",
        name: "الخاتم السيادي",
        rarity: "rare",
        price: 900,
        icon: "ring",
      },
      {
        id: "ring-diamond",
        name: "خاتم الماس",
        rarity: "epic",
        price: 1800,
        icon: "ring",
      },
      {
        id: "pendant-gold",
        name: "قلادة ذهبية",
        rarity: "epic",
        price: 1600,
        icon: "pendant",
      },
      {
        id: "pendant-diamond",
        name: "قلادة الماس",
        rarity: "legendary",
        price: 2600,
        icon: "pendant",
      },
    ],
  },
  artifacts: {
    title: "المقتنيات النادرة",
    sub: "محدودة. أسطورية. لا مثيل لها.",
    cat: "artifacts",
    items: [
      {
        id: "artifact-medallion",
        name: "الميدالية السيادية",
        rarity: "legendary",
        price: 25000,
        icon: "artifact",
      },
      {
        id: "artifact-seal",
        name: "ختم الماس الأسود",
        rarity: "mythic",
        price: 40000,
        icon: "artifact",
      },
      {
        id: "artifact-orb",
        name: "الكرة الأزلية",
        rarity: "mythic",
        price: 75000,
        icon: "artifact",
      },
      {
        id: "artifact-legacy",
        name: "إرث الـ1%",
        rarity: "unique",
        price: 100000,
        icon: "artifact",
      },
    ],
  },
  widgets: {
    title: "الودجت",
    sub: "ارتدِ مكانتك على شاشتك الرئيسية.",
    cat: "widgets",
    items: [
      {
        id: "widget-1",
        name: "بطاقة العضوية الفاخرة",
        rarity: "free",
        price: 0,
        icon: "widget",
        free: true,
      },
    ],
  },
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
  const cx = 200,
    cy = 260;

  // More intricate guilloche generator
  const rMin = 20;
  const rMax = 180;
  const lobes = 12 + Math.floor(rand() * 12) * 2;
  const cycles = 3 + Math.floor(rand() * 4);
  const rotationOffset = rand() * Math.PI * 2;

  let paths = "";
  let d = "";

  for (let c = 0; c < cycles; c++) {
    const scale = 1 - c * 0.25;
    const cMin = rMin * scale;
    const cMax = rMax * scale;
    d += `M${cx + Math.cos(rotationOffset) * cMax},${cy + Math.sin(rotationOffset) * cMax} `;

    for (let i = 1; i <= 360; i++) {
      const theta = (i * Math.PI) / 180;
      const rad = cMin + (cMax - cMin) * 0.5 * (1 + Math.sin(lobes * theta));
      const x = cx + Math.cos(theta + rotationOffset) * rad;
      const y = cy + Math.sin(theta + rotationOffset) * rad;
      d += `L${x},${y} `;
    }
  }

  paths += `<path d="${d}" fill="none" stroke="url(#hallmarkStroke)" stroke-width="0.3" opacity="0.6"/>`;

  const outerRings = 3;
  for (let i = 0; i < outerRings; i++) {
    paths += `<circle cx="${cx}" cy="${cy}" r="${rMax + 5 + i * 4}" fill="none" stroke="url(#hallmarkStroke)" stroke-width="0.25" opacity="0.4"/>`;
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
  const size = 172,
    cx = 86,
    cy = 86;

  // Concentric rings (outermost → innermost)
  const ringDefs = [
    { r: 82, sw: 0.6, op: 0.45 },
    { r: 78, sw: 1.4, op: 0.65 },
    { r: 74, sw: 0.4, op: 0.35 },
    { r: 69, sw: 1.8, op: 0.75 },
    { r: 65, sw: 0.5, op: 0.3 },
  ];

  let svg = "";

  ringDefs.forEach((ring) => {
    svg += `<circle cx="${cx}" cy="${cy}" r="${ring.r}" fill="none" stroke="#C79A3E" stroke-width="${ring.sw}" opacity="${ring.op}"/>`;
  });

  // Tick marks between outermost two rings
  const count = 60,
    rOuter = 82,
    rMinor = 77,
    rMajor = 74;
  for (let i = 0; i < count; i++) {
    const angle = (360 / count) * i - 90;
    const rad = (angle * Math.PI) / 180;
    const major = i % 5 === 0;
    const rInner = major ? rMajor : rMinor;
    const x1 = cx + Math.cos(rad) * rOuter;
    const y1 = cy + Math.sin(rad) * rOuter;
    const x2 = cx + Math.cos(rad) * rInner;
    const y2 = cy + Math.sin(rad) * rInner;
    svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#C79A3E" stroke-width="${major ? 1.5 : 0.6}" opacity="${major ? 0.9 : 0.5}"/>`;
  }

  // Crown detail at 12 o'clock
  const crownScale = 0.55;
  const crownX = cx - 13 * crownScale;
  const crownY = cy - 82 - 14;
  svg += `<g transform="translate(${crownX.toFixed(1)},${crownY.toFixed(1)}) scale(${crownScale})">
    <path d="M2 18 L0 5 L8 11 L14 0 L20 11 L28 5 L26 18 Z" fill="#C79A3E" opacity="0.82" stroke="#3A2808" stroke-width="0.6"/>
    <circle cx="14" cy="0" r="1.6" fill="#C79A3E" opacity="0.9"/>
    <circle cx="0" cy="5" r="1.4" fill="#C79A3E" opacity="0.8"/>
    <circle cx="28" cy="5" r="1.4" fill="#C79A3E" opacity="0.8"/>
  </g>`;

  // Diamond ornaments at 3, 6, 9 o'clock positions
  [0, 90, 180].forEach((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    const r = 71;
    const dx = cx + Math.cos(rad) * r;
    const dy = cy + Math.sin(rad) * r;
    svg += `<rect x="${(dx - 2).toFixed(1)}" y="${(dy - 2).toFixed(1)}" width="4" height="4" transform="rotate(45 ${dx.toFixed(1)} ${dy.toFixed(1)})" fill="#C79A3E" opacity="0.65"/>`;
  });

  // Fine inner engraving lines (rosette style)
  const innerLines = 24;
  const rStart = 63,
    rEnd = 67;
  for (let i = 0; i < innerLines; i++) {
    const angle = (360 / innerLines) * i;
    const rad = (angle * Math.PI) / 180;
    const x1 = cx + Math.cos(rad) * rStart;
    const y1 = cy + Math.sin(rad) * rStart;
    const x2 = cx + Math.cos(rad) * rEnd;
    const y2 = cy + Math.sin(rad) * rEnd;
    svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#C79A3E" stroke-width="0.5" opacity="0.35"/>`;
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
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = offset;
    }),
  );
}

function renderMember(member) {
  document.getElementById("memberNumber").textContent = member.id;
  document.getElementById("memberName").textContent = member.name;
  document.getElementById("tierName").textContent = member.tier;
  document.getElementById("memberQuote").textContent = `"${member.quote}"`;
  renderRing("wealthRing", "wealthValue", member.wealthIndexValue);
  renderRing("privRing", "privValue", member.privilegesValue);
  document.getElementById("hallmarkLayer").innerHTML = generateHallmarkSVG(
    member.id,
  );
  const bezelEl = document.getElementById("bezelTicks");
  if (bezelEl) bezelEl.innerHTML = generateBezelTicksSVG();
  const core = livingCoreProfile(member.id);
  const root = document.documentElement;
  root.style.setProperty("--core-hue", core.hue.toFixed(1));
  document.getElementById("livingCore").style.animationDuration =
    `${core.duration.toFixed(2)}s`;
  document.getElementById("portraitRing").style.animationDuration =
    `${(core.duration * 1.7).toFixed(2)}s`;
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
    const widgetSection = document.querySelector(
      ".boutique-section[data-category='widgets']",
    );
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
    creditsText.innerHTML =
      "انتهى رصيد رسائلك اليومي.<br>يمكنك شراء رصيد إضافي.";
    creditsText.style.color = "#C97766";
    if (input) {
      input.disabled = true;
      input.placeholder = "انتهى الرصيد…";
    }
    if (sendBtn) sendBtn.disabled = true;
  } else {
    creditsText.textContent = `الرسائل المتبقية اليوم: ${remaining} / ${limit}`;
    creditsText.style.color = "";
    if (input) {
      input.disabled = false;
      input.placeholder = "اكتب رسالة للنادي…";
    }
    if (sendBtn) sendBtn.disabled = false;
  }
}

// Credits purchase modal
document.getElementById("clubCreditsBuyBtn").addEventListener("click", () => {
  if (window.AudioEngine) AudioEngine.playRustle();
  document.getElementById("creditsModal").hidden = false;
});
document.getElementById("creditsCancelBtn").addEventListener("click", () => {
  document.getElementById("creditsModal").hidden = true;
  document.getElementById("creditsModalMsg").textContent = "";
});

document.querySelectorAll(".credits-pkg").forEach((btn) => {
  btn.addEventListener("click", () => {
    const credits = parseInt(btn.dataset.credits, 10);
    const price = btn.dataset.price;
    addBonusCredits(credits);
    updateCreditsUI();
    document.getElementById("creditsModal").hidden = true;
    document.getElementById("creditsModalMsg").textContent = "";
    showPremiumToast("عملية ناجحة", `تمت إضافة ${credits} رسائل بنجاح`);
  });
});

// ---------------------------------------------------------
// 8. CLUB CHAT
// ---------------------------------------------------------
const CLUB_MEMBERS = [
  {
    id: "8172",
    msgId: "msg-1",
    name: "LUXOR_VOYAGER",
    tier: "سيادي",
    wealth: "92%",
    priv: "84%",
    text: "ممتن للطاقة في هذه الغرفة. نبني في صمت ونترك النجاح يتحدث.",
    time: "11:45 ص",
    reactions: [],
  },
  {
    id: "5510",
    msgId: "msg-2",
    name: "MILLIONAIRE_MIND",
    tier: "سيادي",
    wealth: "88%",
    priv: "76%",
    text: "الانضباط اليوم، الحرية غدًا.",
    time: "11:47 ص",
    reactions: [],
  },
  {
    id: "2290",
    msgId: "msg-3",
    name: "ELEVATED_LIFE",
    tier: "بلاتيني",
    wealth: "71%",
    priv: "63%",
    text: "الأشخاص المناسبون يرفعون كل شيء.",
    time: "11:48 ص",
    reactions: [],
  },
  {
    id: "6640",
    msgId: "msg-4",
    name: "GLOBAL_INVESTOR",
    tier: "سيادي",
    wealth: "95%",
    priv: "80%",
    text: "تم تأكيد صفقة الاستحواذ على 4.5% من الأصول. التوقيع غداً في جنيف.",
    time: "11:50 ص",
    isWhisper: true,
    reactions: [],
  },
  {
    id: "3901",
    msgId: "msg-5",
    name: "CROWN_COLLECTOR",
    tier: "ذهبي",
    wealth: "58%",
    priv: "49%",
    text: "الإرث يُبنى، لا يُشترى.",
    time: "11:55 ص",
    reactions: [],
  },
];

let currentTypingMember = null;
let typingTimeout = null;

function setTypingIndicator(memberInfo) {
  currentTypingMember = memberInfo;
  renderClubMessages();
}

function renderClubMessages() {
  const container = document.getElementById("clubMessages");
  if (!container) return;
  // oldest → newest (array order)
  let html = CLUB_MEMBERS.map((m) => {
    const isCurrentUser = m.id === MEMBER.id;
    if (isCurrentUser) {
      // OUTGOING (المرسل / المستخدم الحالي) — on the FAR RIGHT
      return `
        <div class="chat-row is-outgoing">
          <div class="chat-bubble is-outgoing">
            <div class="chat-text">${escapeHtml(m.text)}</div>
            <div class="chat-meta">
              <span class="chat-time">${m.time}</span>
              <span class="chat-ticks" aria-label="تم التسليم">
                <svg viewBox="0 0 16 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 6.5l3.2 3.2L10.5 2.5"/>
                  <path d="M5.5 6.5l3.2 3.2L15 2.5"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      `;
    } else {
      // INCOMING (المستقبل / الأعضاء الآخرون) — on the FAR LEFT
      const initials = (m.name || "MB").substring(0, 2).toUpperCase();
      const whisperClass = m.isWhisper ? " chat-whisper" : "";
      return `
        <div class="chat-row is-incoming" data-member-id="${m.id}">
          <button class="chat-avatar-btn" type="button" title="${escapeHtml(m.name)}" aria-label="${escapeHtml(m.name)}">
            <span class="chat-avatar-rim">
              <span class="chat-avatar-initials">${initials}</span>
            </span>
          </button>
          <div class="chat-bubble is-incoming${whisperClass}">
            <div class="chat-sender-header" title="عرض الملف الشخصي">
              <span class="chat-sender-name">${escapeHtml(m.name)}</span>
              <span class="chat-sender-tier">${escapeHtml(m.tier)}</span>
            </div>
            <div class="chat-text">${escapeHtml(m.text)}</div>
            <div class="chat-meta">
              <span class="chat-time">${m.time}</span>
            </div>
          </div>
        </div>
      `;
    }
  }).join("");

  if (currentTypingMember) {
    const initials = (currentTypingMember.name || "MB")
      .substring(0, 2)
      .toUpperCase();
    html += `
      <div class="chat-row is-incoming typing-indicator-row">
        <button class="chat-avatar-btn" type="button" title="${escapeHtml(currentTypingMember.name)}" aria-label="${escapeHtml(currentTypingMember.name)}">
          <span class="chat-avatar-rim">
            <span class="chat-avatar-initials">${initials}</span>
          </span>
        </button>
        <div class="chat-bubble is-incoming typing-bubble">
          <div class="typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;

  // Member profile click handlers for incoming messages
  container.querySelectorAll(".chat-row.is-incoming").forEach((row) => {
    const memberId = row.dataset.memberId;
    const member = CLUB_MEMBERS.find((m) => m.id === memberId);
    if (!member) return;
    const avatarBtn = row.querySelector(".chat-avatar-btn");
    const senderHeader = row.querySelector(".chat-sender-header");
    if (avatarBtn) {
      avatarBtn.addEventListener("click", () => openMemberProfile(member));
    }
    if (senderHeader) {
      senderHeader.addEventListener("click", () => openMemberProfile(member));
    }

    // Whisper logic
    const whisperBubble = row.querySelector(".chat-whisper");
    if (whisperBubble) {
      const revealWhisper = (e) => whisperBubble.classList.add("is-revealed");
      const hideWhisper = (e) => whisperBubble.classList.remove("is-revealed");

      whisperBubble.addEventListener("pointerdown", revealWhisper);
      whisperBubble.addEventListener("pointerup", hideWhisper);
      whisperBubble.addEventListener("pointerleave", hideWhisper);
      whisperBubble.addEventListener("pointercancel", hideWhisper);
    }

    // Reaction Logic
    const msgId = row.dataset.msgId;
    const reactBtn = row.querySelector(".chat-add-reaction-btn");
    if (reactBtn && msgId) {
      reactBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showReactionMenu(reactBtn, msgId);
      });
    }
  });

  // Scroll to bottom (newest at bottom)
  requestAnimationFrame(() => {
    container.scrollTop = container.scrollHeight;
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
    msgId: "msg-" + Date.now(),
    name: MEMBER.name,
    tier: MEMBER.tier.replace(" MEMBER", ""),
    wealth: `${MEMBER.wealthIndexValue}%`,
    priv: `${MEMBER.privilegesValue}%`,
    text,
    time: timeStr,
    reactions: [],
  });

  deductCredit();
  renderClubMessages();
  updateCreditsUI();
  input.value = "";

  // Simulate someone typing a reply
  clearTimeout(typingTimeout);
  const otherMembers = CLUB_MEMBERS.filter((m) => m.id !== MEMBER.id);
  if (otherMembers.length > 0) {
    const randomMember =
      otherMembers[Math.floor(Math.random() * otherMembers.length)];
    setTimeout(
      () => {
        setTypingIndicator(randomMember);
        typingTimeout = setTimeout(
          () => {
            setTypingIndicator(null);
          },
          4000 + Math.random() * 2000,
        );
      },
      1500 + Math.random() * 1500,
    );
  }
}

document
  .getElementById("clubSendBtn")
  .addEventListener("click", sendClubMessage);
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

function checkBalanceIndicator() {
  const currentBalance = getBalance();
  let minPrice = Infinity;
  for (const catKey in BOUTIQUE) {
    for (const item of BOUTIQUE[catKey].items) {
      if (!item.free && item.price < minPrice) {
        minPrice = item.price;
      }
    }
  }
  const addBtn = document.getElementById("boutiqueAddBalanceBtn");
  if (addBtn) {
    if (currentBalance < minPrice) {
      addBtn.classList.add("needs-balance");
    } else {
      addBtn.classList.remove("needs-balance");
    }
  }
}

function setBalance(val) {
  localStorage.setItem(BALANCE_KEY, val);
  const display = document.getElementById("boutiqueBalanceDisplay");
  if (display) display.textContent = val.toLocaleString("en-US");
  checkBalanceIndicator();
}
// Balance init moved to bottom
renderProfileCollection();

document
  .getElementById("boutiqueAddBalanceBtn")
  .addEventListener("click", () => {
    setBalance(getBalance() + 10000);
    showPremiumToast("إيداع مكتمل", "تمت إضافة ١٠,٠٠٠ ◈ لرصيدك بنجاح");
  });

// ---------------------------------------------------------
// 10. OWNED / EQUIPPED (localStorage)
// ---------------------------------------------------------
const OWNED_KEY = `owned_${MEMBER.id}`;
const EQUIPPED_KEY = `equipped_${MEMBER.id}`;

function getOwned() {
  try {
    return JSON.parse(localStorage.getItem(OWNED_KEY)) || {};
  } catch {
    return {};
  }
}
function setOwned(data) {
  localStorage.setItem(OWNED_KEY, JSON.stringify(data));
}

function getEquipped() {
  try {
    return JSON.parse(localStorage.getItem(EQUIPPED_KEY)) || {};
  } catch {
    return {};
  }
}
function setEquipped(data) {
  localStorage.setItem(EQUIPPED_KEY, JSON.stringify(data));
  applyEquippedToCard(data);
}

// Equip-category slot mapping

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
      else if (auraKey.includes("legendary") || auraKey.includes("mythic"))
        auraClass = "active-aura-legendary";
      auraSlot.classList.add(auraClass);
    }
  }

  // --- STARS ---
  const starsSlot = document.getElementById("equippedStarsSlot");
  if (starsSlot) {
    if (equipped.stars) {
      const count = parseInt(equipped.stars.match(/\d+/)?.[0] || "1", 10);
      const starsSvg = Array.from({ length: Math.min(count, 5) })
        .map(
          () =>
            `<svg viewBox="0 0 10 10" fill="none"><path d="M5 1l.9 2.7H9l-2.3 1.7.9 2.6L5 6.6 2.4 8l.9-2.6L1 3.7h3.1z" fill="#C79A3E"/></svg>`,
        )
        .join("");
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
  const portraitBg =
    document.getElementById("portraitPhoto")?.style.backgroundImage || "";
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
// Moved applyEquippedToCard down

// ---------------------------------------------------------
// 11. BOUTIQUE CATALOG
// ---------------------------------------------------------
const RARITY_LABEL = {
  rare: "نادر",
  epic: "استثنائي",
  legendary: "أسطوري",
  mythic: "خرافي",
  unique: "فريد — 1/1",
  free: "مجاني",
};

// ---------------------------------------------------------
// 12. PURCHASE MODAL
// (Removed)

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
    if (window.AudioEngine) AudioEngine.playRustle();
    showNavToast(`تم فك تجهيز: ${item.name}`);
  } else {
    // Equip (replaces previous in same slot)
    equipped[catKey] = item.name;
    setEquipped(equipped);
    if (window.AudioEngine) AudioEngine.playChime();
    showNavToast(`تم تجهيز: ${item.name}`);
  }
  renderBoutique(
    document.querySelector(".boutique-tab.is-active")?.dataset.cat || "all",
  );
}

// ---------------------------------------------------------
// 14. BOUTIQUE RENDER
// ---------------------------------------------------------
let currentOwnershipFilter = "all";
// ---------------------------------------------------------

function generateSkeletonGrid() {
  const cards = Array(6)
    .fill(
      `
    <div class="boutique-skeleton-card">
      <div class="skeleton-icon"></div>
      <div class="skeleton-text name"></div>
      <div class="skeleton-text price"></div>
      <div class="skeleton-text button"></div>
    </div>
  `,
    )
    .join("");
  return `<div class="boutique-skeleton-grid">${cards}</div>`;
}

function renderBoutique(filter = "all") {
  const root = document.getElementById("boutiqueSections");
  const owned = getOwned();
  const equipped = getEquipped();
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

      const currentBalance = getBalance();

      const filteredItems = cat.items.filter((item) => {
        const isOwned = owned[catKey] && owned[catKey].includes(item.id);
        if (currentOwnershipFilter === "owned") return isOwned;
        if (currentOwnershipFilter === "unowned") return !isOwned;
        return true;
      });

      if (filteredItems.length === 0) return ""; // Skip category if empty due to filter

      const cards = filteredItems
        .map((item) => {
          const isOwned = owned[catKey] && owned[catKey].includes(item.id);
          const isEquipped = equipped[catKey] === item.name;
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
        const currentEquipped = getEquipped();
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

  syncWidgetState();
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
  balanceDisplay.textContent = getBalance().toLocaleString("en-US");
}
// checkBalanceIndicator needs BOUTIQUE to be defined.
// BOUTIQUE is defined above this point now.
checkBalanceIndicator();

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
    document.getElementById("memberName")?.textContent || MEMBER.name
  ).trim();
  const memberId = (
    document.getElementById("memberNumber")?.textContent || MEMBER.id
  ).trim();
  const tierName = (
    document.getElementById("tierName")?.textContent || MEMBER.tier
  ).trim();
  const memberQuote = (
    document.getElementById("memberQuote")?.textContent || `"${MEMBER.quote}"`
  ).trim();
  const wealthText = (
    document.getElementById("wealthValue")?.textContent ||
    `${MEMBER.wealthIndexValue}%`
  )
    .replace("%", "")
    .trim();
  const privText = (
    document.getElementById("privValue")?.textContent ||
    `${MEMBER.privilegesValue}%`
  )
    .replace("%", "")
    .trim();
  const wealthVal = parseInt(wealthText, 10) || 92;
  const privVal = parseInt(privText, 10) || 84;
  const equipped = typeof getEquipped === "function" ? getEquipped() : {};

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
    const fname = `1percent-mastercard-${MEMBER.id}.png`;
    const file = new File([blob], fname, { type: "image/png" });

    // Try Web Share API with image file (supported on iOS 15+, Android Chrome)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "THE 1% CLUB — MASTER MEMBERSHIP CARD",
          text: `${MEMBER.name} — Member Nº${MEMBER.id} — ${MEMBER.tier}`,
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
      text: `${MEMBER.name} — Member Nº${MEMBER.id} — ${MEMBER.tier}`,
      url: MEMBER.verifyUrl,
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
      await navigator.clipboard.writeText(MEMBER.verifyUrl);
      showCopyToast("تم نسخ الرابط السيادي");
    } catch {
      showCopyToast(MEMBER.verifyUrl);
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
  card: "العضوية",
  profile: "الملف",
  club: "النادي",
  shop: "البوتيك",
};
const IMPLEMENTED_TABS = ["card", "profile", "club", "shop"];

function goToPage(tab) {
  if (window.AudioEngine) AudioEngine.playRustle();
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("is-active");
    p.hidden = true;
  });
  const activePage = document.getElementById(`page-${tab}`);
  if (activePage) {
    activePage.classList.add("is-active");
    activePage.hidden = false;
  }
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("is-active"));
  document
    .querySelector(`.nav-item[data-tab="${tab}"]`)
    ?.classList.add("is-active");
  sectionName.textContent = PAGE_TITLES[tab] || tab;
  document.getElementById("backBtn").hidden = true;
  document
    .getElementById("appHeader")
    .classList.toggle("header-compact", tab === "club");
  document.querySelector(".app-main").scrollTop = 0;
  window.scrollTo(0, 0);

  // When opening club, scroll chat to bottom and update credits
  if (tab === "club") {
    updateCreditsUI();
    requestAnimationFrame(() => {
      const msgs = document.getElementById("clubMessages");
      if (msgs) window.scrollTo(0, document.body.scrollHeight);
    });
  }
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
  document.getElementById("memberName").textContent =
    document.getElementById("editName").value;
  document.getElementById("profileName").textContent =
    document.getElementById("editUsername").value;
  document.getElementById("profileBioValue").textContent =
    document.getElementById("editBio").value;
  document.getElementById("profileInterestsValue").textContent =
    document.getElementById("editInterests").value;
  document.getElementById("profileLocationValue").textContent =
    document.getElementById("editLocation").value;
  document.getElementById("backBtn").hidden = true;
  goToPage("profile");
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

function handleDeviceOrientation(e) {
  if (e.beta === null || e.gamma === null) return;
  setCardTilt(
    Math.max(-1, Math.min(1, e.gamma / 28)),
    Math.max(-1, Math.min(1, (e.beta - 45) / 28)),
  );
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
  cardEl.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const rect = cardEl.getBoundingClientRect();
    setCardTilt(
      ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    );
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
    const otherMembers = CLUB_MEMBERS.filter((m) => m.id !== MEMBER.id);
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

function purchaseItem(item, catKey) {
  if (getBalance() >= item.price) {
    setBalance(getBalance() - item.price);
    const owned = getOwned();
    if (!owned[catKey]) owned[catKey] = [];
    if (!owned[catKey].includes(item.id)) owned[catKey].push(item.id);
    setOwned(owned);
    renderBoutique(
      document.querySelector(".boutique-tab.is-active").dataset.cat,
    );
    closeInspectionModal();

    // Premium animation
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
  } else {
    alert("رصيد غير كافٍ");
  }
}

function equipItem(item, catKey) {
  const isCurrentlyEquipped = MEMBER.equipped[catKey] === item.id;
  if (isCurrentlyEquipped) {
    MEMBER.equipped[catKey] = null;
  } else {
    MEMBER.equipped[catKey] = item.id;
  }
  renderBoutique(document.querySelector(".boutique-tab.is-active").dataset.cat);
  closeInspectionModal();
  updateMasterCard();
}

function updateMasterCard() {
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

  const equipped = getEquipped();
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
  renderProfileEquipped();
  const grid = document.getElementById("profileCollectionGrid");
  if (!grid) return;

  const owned = getOwned();
  let hasItems = false;
  let itemsHtml = "";

  for (const catKey in owned) {
    const ownedIds = owned[catKey] || [];
    if (!BOUTIQUE[catKey]) continue;

    for (const itemId of ownedIds) {
      const itemDef = BOUTIQUE[catKey].items.find((i) => i.id === itemId);
      if (itemDef) {
        hasItems = true;
        const iconSvg = ICONS[itemDef.icon] || ICONS["star"];
        itemsHtml += `
          <div class="profile-col-item">
            <div class="profile-col-item-icon">${iconSvg}</div>
            <div class="profile-col-item-name">${itemDef.name}</div>
          </div>
        `;
      }
    }
  }

  if (hasItems) {
    grid.innerHTML = itemsHtml;
    grid.classList.remove("is-empty");
  } else {
    grid.innerHTML = `
      <div class="profile-empty-collection luxury-empty-state" onclick="document.querySelector('[data-tab=\'shop\']').click()">
        <div class="empty-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" class="empty-icon"><path d="M4 8h16l-1.3 10.2A2 2 0 0116.7 20H7.3a2 2 0 01-2-1.8L4 8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M8 8V6a4 4 0 018 0v2" stroke="currentColor" stroke-width="1.2"/><circle cx="12" cy="14" r="1.5" fill="currentColor"/></svg>
        </div>
        <p>إرثك يبدأ من هنا</p>
        <span>المحفظة فارغة. استكشف البوتيك واقتنِ أولى قطعك النادرة لتبني هويتك السيادية.</span>
        <button class="empty-explore-btn">استكشاف البوتيك</button>
      </div>
    `;
    grid.classList.add("is-empty");
  }
}

// ---------------------------------------------------------
// REACTIONS MENU
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
applyEquippedToCard(getEquipped());

var gyroListenerAdded = false;
// luxury.js
// Handles the drawing of a complex geometric Guilloché pattern for the membership card background.
// Also generates offscreen metallic textures for 3D bezels and wreaths.

document.addEventListener("DOMContentLoaded", () => {
  initGuilloche();
  initMetallicAssets();
});

function initMetallicAssets() {
  // 1. Use native OffscreenCanvas API if supported for hardware acceleration
  const size = 256; // Optimal size for detail vs memory
  let offscreen, ctx;

  if (typeof OffscreenCanvas !== "undefined") {
    offscreen = new OffscreenCanvas(size, size);
    ctx = offscreen.getContext("2d", { alpha: false });
  } else {
    offscreen = document.createElement("canvas");
    offscreen.width = size;
    offscreen.height = size;
    ctx = offscreen.getContext("2d", { alpha: false });
  }

  // Multi-layered specular gold gradient
  const cx = size / 2,
    cy = size / 2;
  const conical = ctx.createConicGradient
    ? ctx.createConicGradient(Math.PI / 4, cx, cy)
    : null;

  let grad;
  if (conical) {
    grad = conical;
    grad.addColorStop(0, "#FFF6D6");
    grad.addColorStop(0.15, "#D8AE5E");
    grad.addColorStop(0.3, "#3A2408");
    grad.addColorStop(0.45, "#8F6826");
    grad.addColorStop(0.55, "#FFF6D6"); // Specular highlight
    grad.addColorStop(0.7, "#D8AE5E");
    grad.addColorStop(0.85, "#3A2408");
    grad.addColorStop(1, "#FFF6D6");
  } else {
    // Fallback to linear if conic is unsupported
    grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, "#FFF6D6");
    grad.addColorStop(0.2, "#D8AE5E");
    grad.addColorStop(0.5, "#3A2408");
    grad.addColorStop(0.8, "#D8AE5E");
    grad.addColorStop(1, "#FFF6D6");
  }

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // Apply micro-brushed texture for realistic 3D metal look
  ctx.globalCompositeOperation = "overlay";
  ctx.lineWidth = 1;
  for (let i = 0; i < size; i += 2) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.08})`;
    ctx.beginPath();
    // Circular brushing
    ctx.arc(cx, cy, i, 0, Math.PI * 2);
    ctx.stroke();
  }

  // MULTI-LAYERED SPECULAR HIGHLIGHT LOOP
  // Creates soft, radial glints to enhance the realistic 3D volume of the metal
  ctx.globalCompositeOperation = "screen";
  const glints = [
    { x: size * 0.25, y: size * 0.25, r: size * 0.45, alpha: 0.8 }, // Top-left primary light
    { x: size * 0.75, y: size * 0.75, r: size * 0.35, alpha: 0.5 }, // Bottom-right secondary bounce
    { x: size * 0.5, y: size * 0.1, r: size * 0.5, alpha: 0.6 }, // Top edge wash
    { x: size * 0.1, y: size * 0.85, r: size * 0.3, alpha: 0.4 }, // Bottom-left soft glow
  ];

  glints.forEach((g) => {
    const radGrad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
    radGrad.addColorStop(0, `rgba(255, 255, 255, ${g.alpha})`);
    radGrad.addColorStop(0.2, `rgba(255, 246, 214, ${g.alpha * 0.8})`);
    radGrad.addColorStop(0.6, `rgba(216, 174, 94, ${g.alpha * 0.3})`);
    radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalCompositeOperation = "source-over"; // Reset blend mode

  // Export to data URL (need canvas if using OffscreenCanvas fallback)
  let textureUrl;
  if (offscreen.toDataURL) {
    textureUrl = offscreen.toDataURL("image/png");
  } else {
    // Fallback for OffscreenCanvas in some browsers
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = size;
    tempCanvas.height = size;
    tempCanvas.getContext("2d").drawImage(offscreen, 0, 0);
    textureUrl = tempCanvas.toDataURL("image/png");
  }

  // Inject as SVG pattern into document <defs> so SVGs can use it
  let defs = document.querySelector("svg defs");
  if (!defs) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.pointerEvents = "none";
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.appendChild(defs);
    document.body.appendChild(svg);
  }

  // Pattern for Bezels & Wreaths
  let pattern = document.getElementById("metal3D");
  if (!pattern) {
    pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
    pattern.setAttribute("id", "metal3D");
    // CRITICAL FIX: use objectBoundingBox so the 512x512 texture stretches
    // to fit the exact dimensions of whichever SVG shape uses it,
    // regardless of the element's viewBox.
    pattern.setAttribute("patternUnits", "objectBoundingBox");
    pattern.setAttribute("width", "1");
    pattern.setAttribute("height", "1");

    const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
    img.setAttribute("href", textureUrl);
    img.setAttribute("width", "100%");
    img.setAttribute("height", "100%");
    img.setAttribute("preserveAspectRatio", "none"); // Stretch to fit the bounding box

    pattern.appendChild(img);
    defs.appendChild(pattern);
  }

  // Function to apply the 3D metal texture to specific elements
  const applyMetal = (node) => {
    if (node.nodeType === 1) {
      // Element node
      const targetGradients = [
        "url(#wreathGrad)",
        "url(#bezelGrad)",
        "url(#ringGoldGrad)",
      ];

      const processEl = (el) => {
        const fill = el.getAttribute("fill");
        if (fill && targetGradients.includes(fill.replace(/\s/g, ""))) {
          el.setAttribute("fill", "url(#metal3D)");
        }
        const stroke = el.getAttribute("stroke");
        if (stroke && targetGradients.includes(stroke.replace(/\s/g, ""))) {
          el.setAttribute("stroke", "url(#metal3D)");
        }
      };

      if (
        node.hasAttribute &&
        (node.hasAttribute("fill") || node.hasAttribute("stroke"))
      ) {
        processEl(node);
      }

      node
        .querySelectorAll('[fill*="url(#"], [stroke*="url(#"]')
        .forEach(processEl);
    }
  };

  // 1. Apply to elements already in the DOM
  applyMetal(document.body);

  // 2. Observe DOM mutations so dynamically added components (like bezelTicks in app.js) get the texture too
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach(applyMetal);
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function initGuilloche() {
  const canvas = document.getElementById("guillocheCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: false }); // Optimize by disabling alpha channel on base canvas

  // Performance optimization: track current dimensions to prevent redundant redraws
  let currentWidth = 0;
  let currentHeight = 0;
  let currentDpr = 1;
  let resizeTimeout;
  let isDirty = false;

  const drawFrame = () => {
    if (!isDirty) return;
    isDirty = false;
    drawGuilloche(ctx, currentWidth, currentHeight);
  };

  const resizeCanvas = () => {
    const parent = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) return; // Not visible yet

    // Only redraw if dimensions actually changed
    if (
      currentWidth === rect.width &&
      currentHeight === rect.height &&
      currentDpr === dpr
    ) {
      return;
    }

    currentWidth = rect.width;
    currentHeight = rect.height;
    currentDpr = dpr;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    isDirty = true;
    window.requestAnimationFrame(drawFrame);
  };

  // Debounce the resize event to prevent CPU spikes during window drag/orientation change
  window.addEventListener(
    "resize",
    () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150); // Wait 150ms after resizing stops
    },
    { passive: true },
  );

  // Initial draw with a slight delay to ensure layout is computed
  setTimeout(resizeCanvas, 100);
}

function drawGuilloche(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height / 2;

  // 1. Deep Obsidian Base with Brushed Metal Spotlight
  const bgGradient = ctx.createRadialGradient(
    cx,
    cy * 0.4,
    0,
    cx,
    cy * 0.4,
    height * 0.85,
  );
  bgGradient.addColorStop(0, "#1c160c"); // Subtle warm gold/brown inner glow
  bgGradient.addColorStop(0.35, "#0a0806"); // Deep transition
  bgGradient.addColorStop(1, "#000000"); // Pure black edges

  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, width, height);

  // Subtle brushed texture
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgba(255, 230, 150, 0.015)";
  // Optimize texture drawing by using larger steps if possible
  for (let i = 0; i < width; i += 3) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
  ctx.restore();

  // 2. Guilloché Security Lines
  ctx.lineWidth = 0.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Central dense rosette (more visible)
  ctx.strokeStyle = "rgba(215, 180, 80, 0.15)";
  drawHypotrochoid(ctx, cx, cy, width * 0.45, width * 0.12, width * 0.18, 150);

  // Secondary outer web (fainter)
  ctx.strokeStyle = "rgba(215, 180, 80, 0.08)";
  drawHypotrochoid(ctx, cx, cy, width * 0.6, width * 0.05, width * 0.1, 250);

  // Inner delicate weave
  ctx.strokeStyle = "rgba(215, 180, 80, 0.12)";
  drawHypotrochoid(ctx, cx, cy, width * 0.3, width * 0.11, width * 0.08, 100);
}

function drawHypotrochoid(ctx, cx, cy, R, r, d, loops) {
  ctx.beginPath();
  // Optimize step size to render faster without losing noticeable quality on mobile
  const step = 0.08;
  const maxTheta = Math.PI * 2 * loops;

  for (let theta = 0; theta <= maxTheta; theta += step) {
    // Parametric equations for a hypotrochoid
    const x = (R - r) * Math.cos(theta) + d * Math.cos(((R - r) / r) * theta);
    const y = (R - r) * Math.sin(theta) - d * Math.sin(((R - r) / r) * theta);

    if (theta === 0) {
      ctx.moveTo(cx + x, cy + y);
    } else {
      ctx.lineTo(cx + x, cy + y);
    }
  }
  ctx.stroke();
}

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
    document.getElementById("memberQuote")?.textContent ||
    `"${ClubState.member.quote}"`
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

document.getElementById("shareBtn")?.addEventListener("click", shareMasterCard);
document
  .getElementById("profileShareBtn")
  ?.addEventListener("click", shareMasterCard);

// ---------------------------------------------------------
// 19. UNIFIED 3D TILT ENGINE
// ---------------------------------------------------------
const TILT_MAX_DEG = 6;
let globalTiltEnabled = false;

// LERP Physics Variables
let targetRotX = 0;
let targetRotY = 0;
let currentRotX = 0;
let currentRotY = 0;
const lerpFactor = 0.08;
let tiltLoopActive = false;
const DEADZONE = 1.5;

function applyTiltToCards(rx, ry) {
  document.querySelectorAll(".luxury-tilt-card").forEach((card) => {
    card.style.transform = `perspective(1500px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.transition = "none";
  });
}

function resetTiltForCard(card) {
  targetRotX = 0;
  targetRotY = 0;
  card.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg)`;
  card.style.transition = "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)";
}

function tiltLoop() {
  const dx = targetRotX - currentRotX;
  const dy = targetRotY - currentRotY;

  if (
    Math.abs(dx) < 0.01 &&
    Math.abs(dy) < 0.01 &&
    targetRotX === 0 &&
    targetRotY === 0
  ) {
    currentRotX = 0;
    currentRotY = 0;
    applyTiltToCards(0, 0);
    tiltLoopActive = false;
    return;
  }

  currentRotX += dx * lerpFactor;
  currentRotY += dy * lerpFactor;

  applyTiltToCards(currentRotX, currentRotY);
  requestAnimationFrame(tiltLoop);
}

function updateTiltTarget(rx, ry) {
  // Strict Angle Clamping
  targetRotX = Math.max(-TILT_MAX_DEG, Math.min(TILT_MAX_DEG, rx));
  targetRotY = Math.max(-TILT_MAX_DEG, Math.min(TILT_MAX_DEG, ry));

  if (!tiltLoopActive) {
    tiltLoopActive = true;
    requestAnimationFrame(tiltLoop);
  }
}

function handleGlobalDeviceOrientation(e) {
  if (e.beta === null || e.gamma === null) return;

  let betaDev = e.beta - 45; // Assume 45deg is normal reading angle

  // Bed / Flat Mode Normalization
  // If phone is flat (beta close to 0) or upside down, shrink the effect
  if (e.beta < 15 || e.beta > 165 || e.beta < -165) {
    betaDev *= 0.15; // Suppress gimbal lock jumpiness
  }

  let rx = -betaDev * 0.3;
  let ry = e.gamma * 0.3;

  // Apply Deadzone
  if (Math.abs(rx) < DEADZONE) rx = 0;
  if (Math.abs(ry) < DEADZONE) ry = 0;

  updateTiltTarget(rx, ry);
}

function initGlobalTilt() {
  // Device Orientation Setup
  const requestTiltPermissionOnce = () => {
    if (globalTiltEnabled) return;
    globalTiltEnabled = true;
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === "granted")
            window.addEventListener(
              "deviceorientation",
              handleGlobalDeviceOrientation,
            );
        })
        .catch(() => {});
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      window.addEventListener(
        "deviceorientation",
        handleGlobalDeviceOrientation,
      );
    }
  };

  document.body.addEventListener("click", requestTiltPermissionOnce, {
    once: true,
  });
  document.body.addEventListener("touchstart", requestTiltPermissionOnce, {
    once: true,
    passive: true,
  });

  // Mouse Move Setup
  document.querySelectorAll(".luxury-tilt-card").forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "true";

    card.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return; // Touch is handled by device orientation
      const rect = card.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const rx = -ny * TILT_MAX_DEG;
      const ry = nx * TILT_MAX_DEG;
      updateTiltTarget(rx, ry);
    });

    card.addEventListener("pointerleave", () => resetTiltForCard(card));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initGlobalTilt();
  initGoldDust();
});

// GOLD DUST PARTICLES
function initGoldDust() {
  const canvas = document.getElementById("goldDustCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  let particles = [];
  const PARTICLE_COUNT = 40;

  let width, height;

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    // Scale for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initParticles();
  };

  const initParticles = () => {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.8 + 0.2, // very small
        speedX: (Math.random() - 0.5) * 0.2, // slow drift
        speedY: (Math.random() - 0.5) * 0.2 - 0.1, // slightly drifting upwards
        opacity: Math.random() * 0.5 + 0.1,
        blinkSpeed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2,
        flare: 0, // Sparkle state
      });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      // Move
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Randomly trigger a bright twinkle (flare)
      if (p.flare <= 0 && Math.random() < 0.0015) {
        p.flare = 1;
      } else if (p.flare > 0) {
        p.flare -= 0.015; // Fade out the sparkle
      }

      // Blink (normal ambient oscillation)
      p.angle += p.blinkSpeed;
      const currentOpacity = p.opacity + Math.sin(p.angle) * 0.3;
      // Add flare intensity if active
      const finalOpacity = Math.max(
        0,
        Math.min(1, currentOpacity + (p.flare > 0 ? p.flare * 0.6 : 0)),
      );

      const currentRadius = p.radius * (1 + (p.flare > 0 ? p.flare * 1.2 : 0));

      // Add subtle glow to larger particles or flaring particles
      if (currentRadius > 0.6 || p.flare > 0) {
        ctx.shadowBlur = p.flare > 0 ? 6 : 2;
        ctx.shadowColor =
          p.flare > 0 ? "rgba(255, 245, 210, 0.9)" : "rgba(212, 175, 106, 0.8)";
      } else {
        ctx.shadowBlur = 0;
      }

      // Draw base ambient particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 106, ${finalOpacity})`; // Gold Champagne
      ctx.fill();

      // Draw 4-point bezier star glint if flaring
      if (p.flare > 0.05) {
        const size = p.radius * 7 * p.flare + 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - size); // Top
        ctx.quadraticCurveTo(p.x, p.y, p.x + size, p.y); // Right
        ctx.quadraticCurveTo(p.x, p.y, p.x, p.y + size); // Bottom
        ctx.quadraticCurveTo(p.x, p.y, p.x - size, p.y); // Left
        ctx.quadraticCurveTo(p.x, p.y, p.x, p.y - size); // Top
        ctx.fillStyle = `rgba(255, 248, 220, ${p.flare * 0.9})`;
        ctx.fill();

        // Add a tiny white-hot core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.flare})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);

  // Initial setup
  // Wait a bit for layout to settle
  setTimeout(() => {
    resize();
    draw();
  }, 100);
}

function initProfileGyro() {
  const handleMove = (wrap, x, y, w, h) => {
    const rx = (y / h - 0.5) * -15;
    const ry = (x / w - 0.5) * 15;
    wrap.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
    wrap.style.transition = "none";
  };

  const handleReset = (wrap) => {
    wrap.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    wrap.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
  };

  document
    .querySelectorAll("#profile-tab .gyro-element:not(.gyro-bound)")
    .forEach((wrap) => {
      wrap.classList.add("gyro-bound");
      wrap.addEventListener("mousemove", (e) => {
        const rect = wrap.getBoundingClientRect();
        handleMove(
          wrap,
          e.clientX - rect.left,
          e.clientY - rect.top,
          rect.width,
          rect.height,
        );
      });
      wrap.addEventListener("mouseleave", () => handleReset(wrap));
    });

  if (window.DeviceOrientationEvent && !gyroListenerAdded) {
    gyroListenerAdded = true;
    window.addEventListener("deviceorientation", (e) => {
      const profileTab = document.getElementById("profile-tab");
      if (!profileTab || profileTab.hidden) return;

      const beta = e.beta || 0;
      const gamma = e.gamma || 0;

      const rx = Math.max(-15, Math.min(15, (beta - 45) * 0.5));
      const ry = Math.max(-15, Math.min(15, gamma * 0.5));

      document
        .querySelectorAll("#profile-tab .gyro-element")
        .forEach((wrap) => {
          wrap.style.transform = `perspective(800px) rotateX(${-rx}deg) rotateY(${ry}deg)`;
          wrap.style.transition = "transform 0.1s ease-out";
        });
    });
  }
}

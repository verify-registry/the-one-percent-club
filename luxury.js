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
    ctx = offscreen.getContext("2d", { alpha: true });
  } else {
    offscreen = document.createElement("canvas");
    offscreen.width = size;
    offscreen.height = size;
    ctx = offscreen.getContext("2d", { alpha: true });
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
  const ctx = canvas.getContext("2d", { alpha: true }); // Optimize by disabling alpha channel on base canvas

  // Performance optimization: track current dimensions to prevent redundant redraws
  let currentWidth = 0;
  let currentHeight = 0;
  let currentDpr = 1;
  let currentIsLight = document.body.classList.contains("light-mode");
  let resizeTimeout;
  let isDirty = false;

  const drawFrame = () => {
    if (!isDirty) return;
    isDirty = false;
    drawGuilloche(ctx, currentWidth, currentHeight);
  };

  const forceRedraw = () => {
    const isLight = document.body.classList.contains("light-mode");
    if (currentIsLight !== isLight) {
      currentIsLight = isLight;
      isDirty = true;
      window.requestAnimationFrame(drawFrame);
    }
  };

  // Watch for theme changes specifically
  const themeObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'class') {
        forceRedraw();
      }
    }
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  const resizeCanvas = () => {
    const parent = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) return; // Not visible yet

    // Only redraw if dimensions actually changed
    const isLight = document.body.classList.contains("light-mode");
    if (
      currentWidth === rect.width &&
      currentHeight === rect.height &&
      currentDpr === dpr &&
      currentIsLight === isLight
    ) {
      return;
    }

    currentWidth = rect.width;
    currentHeight = rect.height;
    currentDpr = dpr;
    currentIsLight = document.body.classList.contains("light-mode");

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
  if (!width || !height) return;
  const isLight = document.body.classList.contains("light-mode");

  ctx.clearRect(0, 0, width, height);

  // --- 1. PURE TOPOGRAPHIC GEOMETRY (NO CROSSHATCH) ---
  // We use a single bundle of non-intersecting, diverging S-curves.
  const paths = new Path2D();
  const numLines = 300; 

  for (let i = 0; i <= numLines; i++) {
    let t = i / numLines;
    let nt = t * 2 - 1; // Ranges from -1 to 1

    // Density distribution: pushes lines tightly to the edges, leaving the center quiet
    let yBase = Math.sign(nt) * Math.pow(Math.abs(nt), 1.2) * (height * 1.5);

    // Amplitude of the curve increases as we move to the edges.
    // This breaks the "repetitive parallel" look, creating gracefully expanding sweeps.
    let amplitude = Math.pow(Math.abs(nt), 0.8) * height * 0.7;

    let startX = -width * 1.5;
    let endX = width * 1.5;

    // Control points to create the sweeping S-curve
    let cp1X = -width * 0.5;
    let cp1Y = yBase - amplitude;

    let cp2X = width * 0.5;
    let cp2Y = yBase + amplitude;

    paths.moveTo(startX, yBase);
    paths.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, yBase);
  }

  ctx.save();
  // Rotate the entire majestic bundle so it flows diagonally across the card
  ctx.translate(width * 0.5, height * 0.5);
  ctx.rotate(-Math.PI / 7); // ~ -25 degrees tilt

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // --- 2. PHYSICAL TRENCH (SHADOW) ---
  // Deepens the existing CSS surface as a true intaglio engraving
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.translate(0.5, 0.5); // Sub-pixel shift for physical depth
  ctx.lineWidth = isLight ? 1.0 : 1.1;
  ctx.strokeStyle = isLight ? "rgba(95, 68, 35, 0.28)" : "rgba(0, 0, 0, 0.85)";
  ctx.stroke(paths);
  ctx.restore();

  // --- 3. ANISOTROPIC SPECULAR HIGHLIGHT (THE REAL METAL SECRET) ---
  // Catches the grooves with controlled specular metallic highlights
  ctx.save();
  ctx.globalCompositeOperation = isLight ? "screen" : "color-dodge";
  ctx.translate(-0.5, -0.5); // Opposing sub-pixel shift
  ctx.lineWidth = 0.75; // Razor-crisp intaglio bevel catch

  // Directional Light Band relative to the rotated canvas
  const specGrad = ctx.createLinearGradient(-width, -height, width, height);

  if (isLight) {
    specGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.0)");
    specGrad.addColorStop(0.28, "rgba(255, 255, 255, 0.0)");
    specGrad.addColorStop(0.38, "rgba(255, 250, 235, 0.85)"); // Crisp champagne light catch
    specGrad.addColorStop(0.44, "rgba(255, 255, 255, 0.05)"); // Falls back into shadow
    specGrad.addColorStop(0.56, "rgba(255, 255, 255, 0.0)"); 
    specGrad.addColorStop(0.66, "rgba(255, 248, 225, 0.65)"); // Secondary ambient catch
    specGrad.addColorStop(0.72, "rgba(255, 255, 255, 0.0)");
    specGrad.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");
  } else {
    specGrad.addColorStop(0.0, "rgba(201, 168, 106, 0.0)");
    specGrad.addColorStop(0.28, "rgba(201, 168, 106, 0.0)");
    specGrad.addColorStop(0.40, "rgba(245, 225, 165, 0.82)"); // Authentic Champagne gold catch
    specGrad.addColorStop(0.46, "rgba(201, 168, 106, 0.08)");
    specGrad.addColorStop(0.55, "rgba(201, 168, 106, 0.0)");
    specGrad.addColorStop(0.65, "rgba(225, 190, 120, 0.55)"); // Secondary metallic glint
    specGrad.addColorStop(0.72, "rgba(201, 168, 106, 0.0)");
    specGrad.addColorStop(1.0, "rgba(201, 168, 106, 0.0)");
  }

  ctx.strokeStyle = specGrad;
  ctx.stroke(paths);
  ctx.restore();

  ctx.restore(); // End Rotation

  // --- 4. ORGANIC CENTER PROTECTION ---
  // Ensure the primary identity elements read cleanly while preserving crisp engraving in all other regions.
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  const fadeGrad = ctx.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.45, Math.max(width, height) * 0.52);
  fadeGrad.addColorStop(0.0, "rgba(0, 0, 0, 0.92)");
  fadeGrad.addColorStop(0.42, "rgba(0, 0, 0, 0.25)");
  fadeGrad.addColorStop(0.85, "rgba(0, 0, 0, 0.0)");
  fadeGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
  ctx.fillStyle = fadeGrad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
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

async function captureLiveMasterCardBlob() {
  const card = document.getElementById("membershipCard");
  if (!card || !window.htmlToImage) return null;

  const prevTransform = card.style.transform;
  const prevTransition = card.style.transition;
  card.style.transform = "none";
  card.style.transition = "none";

  try {
    await new Promise((r) => requestAnimationFrame(r));
    const dpr = Math.max(3, (window.devicePixelRatio || 2) * 1.5);
    const blob = await window.htmlToImage.toBlob(card, {
      pixelRatio: dpr,
      cacheBust: true,
      skipFonts: true,
      fontEmbedCSS: "",
      style: {
        transform: "none",
        transition: "none",
        margin: "0",
      },
      filter: (node) => {
        if (
          node.classList &&
          (node.classList.contains("metric-tooltip") ||
            node.classList.contains("is-tooltip-open"))
        ) {
          return false;
        }
        return true;
      },
    });
    return blob;
  } catch (err) {
    console.warn("Live client-side capture error:", err);
    return null;
  } finally {
    card.style.transform = prevTransform;
    card.style.transition = prevTransition;
  }
}

async function shareMasterCard() {
  const shareBtn = document.getElementById("shareBtn");
  shareBtn?.blur();
  shareBtn?.classList.remove("is-pressed");

  if (window.AudioEngine && window.AudioEngine.playSend) {
    window.AudioEngine.playSend();
  }
  showCopyToast("جارٍ تصدير الماستر كارد الملكي فائق الدقة…");

  try {
    let blob = await captureLiveMasterCardBlob();
    if (!blob) {
      try {
        const res = await fetch("/master-card-ultra-hd.png?v=" + Date.now());
        if (res.ok) {
          blob = await res.blob();
        }
      } catch (fetchErr) {
        console.warn("Could not fetch pre-rendered ultra-HD asset, falling back:", fetchErr);
      }
    }

    if (!blob) {
      blob = await renderMasterCardToBlob();
    }

    const fname = `THE-1-PERCENT-CLUB-MASTER-CARD.png`;
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

    // Fallback: download the image directly
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
      if (window.showGoldCopyPopup) {
        window.showGoldCopyPopup("Link Copied to Clipboard", ClubState.member.verifyUrl);
      } else {
        showCopyToast("Link Copied to Clipboard");
      }
    } catch {
      if (window.showGoldCopyPopup) {
        window.showGoldCopyPopup("Link Copied to Clipboard", ClubState.member.verifyUrl);
      } else {
        showCopyToast(ClubState.member.verifyUrl);
      }
    }
  }
}

document.getElementById("shareBtn")?.addEventListener("click", shareMasterCard);
document
  .getElementById("profileShareBtn")
  ?.addEventListener("click", shareMasterCard);

function initActionButtonsTactileFeedback() {
  const buttons = document.querySelectorAll(
    "#membership-tab .card-actions .btn, #shareBtn, #copyBtn, #profileShareBtn"
  );
  buttons.forEach((btn) => {
    const handleDown = () => {
      btn.classList.add("is-pressed");
    };
    const handleUp = () => {
      btn.classList.remove("is-pressed");
      btn.blur();
    };

    btn.addEventListener("touchstart", handleDown, { passive: true });
    btn.addEventListener("touchend", () => {
      setTimeout(handleUp, 80);
    }, { passive: true });
    btn.addEventListener("touchcancel", handleUp, { passive: true });
    btn.addEventListener("pointerdown", handleDown);
    btn.addEventListener("pointerup", handleUp);
    btn.addEventListener("pointercancel", handleUp);
    btn.addEventListener("pointerleave", handleUp);
    btn.addEventListener("click", () => {
      setTimeout(handleUp, 100);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initActionButtonsTactileFeedback);
} else {
  initActionButtonsTactileFeedback();
}

// ---------------------------------------------------------
// 19. UNIFIED 3D TILT ENGINE
// ---------------------------------------------------------
const TILT_MAX_DEG = 5;
let globalTiltEnabled = false;
let isLongPressActive = false;

// LERP Physics Variables
let targetRotX = 0;
let targetRotY = 0;
let currentRotX = 0;
let currentRotY = 0;
const lerpFactor = 0.14; // High-refresh 120Hz responsive physics
let tiltLoopActive = false;
const DEADZONE = 1.5;

function applyTiltToCards(rx, ry) {
  const activeInteracting = document.querySelectorAll(".luxury-tilt-card.is-hovered, .luxury-tilt-card.is-long-press-active");
  const hasActiveCard = activeInteracting.length > 0;

  document.querySelectorAll(".luxury-tilt-card").forEach((card) => {
    const isMembership = card.id === "membershipCard";
    const isProfileHero = card.id === "profileHeroPlaque";
    const isHovered = card.classList.contains("is-hovered");
    const isLongPressed = card.classList.contains("is-long-press-active");

    // If an interaction is actively happening on a specific card, non-interacted cards stay at rest
    if (hasActiveCard && !isHovered && !isLongPressed) {
      return;
    }

    const elevation = isLongPressed ? 22 : (isHovered ? (isMembership || isProfileHero ? 14 : 10) : 0);
    const translateY = isLongPressed ? -8 : (isHovered ? (isMembership || isProfileHero ? -5 : -4) : 0);
    const scale = isLongPressed ? 1.025 : (isHovered ? (isMembership || isProfileHero ? 1.015 : 1.008) : 1);

    card.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`);
    card.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`);
    card.style.setProperty('--tilt-tz', `${elevation}px`);
    card.style.setProperty('--tilt-ty', `${translateY}px`);
    card.style.setProperty('--tilt-scale', `${scale}`);

    if (isMembership || isProfileHero) {
      // MASTER IDENTITY CARD & PROFILE HERO CARD: Rotates circularly and smoothly from its exact center in 3D
      card.style.transform = `perspective(1200px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(${elevation}px) translateY(${translateY}px) scale3d(${scale}, ${scale}, ${scale})`;
      
      // PROFILE HERO CARD: MULTI-LAYER 3D GYROSCOPE PARALLAX
      // The portrait photo and its outer golden frame are locked together as ONE unit
      // moving in coordinated 3D elevation and subtle parallax above the card surface
      if (isProfileHero) {
        const medallion = document.getElementById("profileMedallionCase");
        if (medallion) {
          const medParallaxX = (ry * 0.42).toFixed(2);
          const medParallaxY = (-rx * 0.42).toFixed(2);
          const medTiltRx = (rx * 1.12).toFixed(2);
          const medTiltRy = (ry * 1.12).toFixed(2);
          const medElevation = 18 + (isLongPressed ? 10 : (isHovered ? 4 : 0));
          medallion.style.transform = `translateZ(${medElevation}px) translate3d(${medParallaxX}px, ${medParallaxY}px, 0px) rotateX(${medTiltRx}deg) rotateY(${medTiltRy}deg)`;
          medallion.style.transition = "none";
        }
      }
    } else {
      card.style.transform = `perspective(1200px) translateY(${translateY}px) translateZ(${elevation}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
    }
    card.style.transition = "none";
    
    // Depth-mapping edge glow
    const glowX = 50 + (ry * 2); // Shift horizontal highlight
    const glowY = 0 - (rx * 2);  // Shift vertical highlight (starts at 0% top)
    const angle = 160 + ry + (rx * 0.5);
    
    card.style.setProperty('--glow-x', `${glowX}%`);
    card.style.setProperty('--glow-y', `${glowY}%`);
    card.style.setProperty('--metal-angle', `${angle}deg`);

    // Dynamic specular sheen reflection on card face
    const normX = Math.max(-1, Math.min(1, ry / TILT_MAX_DEG));
    const normY = Math.max(-1, Math.min(1, -rx / TILT_MAX_DEG));
    card.style.setProperty('--tiltX', normX.toFixed(3));
    card.style.setProperty('--tiltY', normY.toFixed(3));

    // Dynamic gold foil shimmer coordinates (shifting metallic sheen across micro-textures)
    const foilAngle = Math.round(135 + ry * 2.5 + rx * 1.5);
    const foilPosX = Math.round(50 + normX * 35);
    const foilPosY = Math.round(50 + normY * 35);
    card.style.setProperty('--gold-foil-angle', `${foilAngle}deg`);
    card.style.setProperty('--gold-foil-pos', `${foilPosX}% ${foilPosY}%`);
    card.style.setProperty('--foil-shift-x', `${(normX * 12).toFixed(2)}px`);
    card.style.setProperty('--foil-shift-y', `${(normY * 12).toFixed(2)}px`);

    // Horological AR Sapphire Crystal Glare & Sheen (Double-AR Coating Optic Beam)
    const sapphireAngle = Math.round(128 + ry * 3.2 + rx * 2.0);
    const sapphireSheenX = Math.round(50 + normX * 45);
    const sapphireSheenY = Math.round(45 + normY * 45);
    const sapphireBeamPos = Math.round(40 + normX * 50);
    const sapphireOpacity = Math.min(1, 0.45 + (Math.abs(normX) + Math.abs(normY)) * 0.35);

    card.style.setProperty('--sapphire-glare-angle', `${sapphireAngle}deg`);
    card.style.setProperty('--sapphire-sheen-x', `${sapphireSheenX}%`);
    card.style.setProperty('--sapphire-sheen-y', `${sapphireSheenY}%`);
    card.style.setProperty('--sapphire-beam-pos', `${sapphireBeamPos}%`);
    card.style.setProperty('--sapphire-opacity', sapphireOpacity.toFixed(2));
  });
}

function resetTiltForCard(card) {
  targetRotX = 0;
  targetRotY = 0;
  card.style.setProperty('--tilt-rx', '0deg');
  card.style.setProperty('--tilt-ry', '0deg');
  card.style.setProperty('--tilt-tz', '0px');
  card.style.setProperty('--tilt-ty', '0px');
  card.style.setProperty('--tilt-scale', '1');
  const isMembership = card.id === "membershipCard";
  const isProfileHero = card.id === "profileHeroPlaque";
  if (isMembership || isProfileHero) {
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px) scale3d(1, 1, 1)`;
    if (isProfileHero) {
      const medallion = document.getElementById("profileMedallionCase");
      if (medallion) {
        medallion.style.transform = `translateZ(18px) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)`;
        medallion.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
      }
    }
  } else {
    card.style.transform = `perspective(1200px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }
  card.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease";
  
  card.style.setProperty('--glow-x', '50%');
  card.style.setProperty('--glow-y', '0%');
  card.style.setProperty('--metal-angle', '160deg');
  card.style.setProperty('--tiltX', '0');
  card.style.setProperty('--tiltY', '0');
  card.style.setProperty('--gold-foil-angle', '135deg');
  card.style.setProperty('--gold-foil-pos', '50% 50%');
  card.style.setProperty('--foil-shift-x', '0px');
  card.style.setProperty('--foil-shift-y', '0px');
  card.style.setProperty('--sapphire-glare-angle', '128deg');
  card.style.setProperty('--sapphire-sheen-x', '50%');
  card.style.setProperty('--sapphire-sheen-y', '45%');
  card.style.setProperty('--sapphire-beam-pos', '40%');
  card.style.setProperty('--sapphire-opacity', '0.45');
}

function tiltLoop() {
  const dx = targetRotX - currentRotX;
  const dy = targetRotY - currentRotY;

  // Once settled within threshold, snap precisely and stop the loop
  if (Math.abs(dx) < 0.005 && Math.abs(dy) < 0.005) {
    currentRotX = targetRotX;
    currentRotY = targetRotY;
    applyTiltToCards(currentRotX, currentRotY);
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
  const nextX = Math.max(-TILT_MAX_DEG, Math.min(TILT_MAX_DEG, rx));
  const nextY = Math.max(-TILT_MAX_DEG, Math.min(TILT_MAX_DEG, ry));

  // Skip if target hasn't meaningfully changed and loop is idle
  if (Math.abs(nextX - targetRotX) < 0.005 && Math.abs(nextY - targetRotY) < 0.005 && !tiltLoopActive) {
    return;
  }

  targetRotX = nextX;
  targetRotY = nextY;

  if (!tiltLoopActive) {
    tiltLoopActive = true;
    requestAnimationFrame(tiltLoop);
  }
}

function handleGlobalDeviceOrientation(e) {
  if (isLongPressActive) return; // Prioritize tactile long-press inspection
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

  // Setup all tilt cards
  document.querySelectorAll(".luxury-tilt-card").forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "true";

    const isMembership = card.id === "membershipCard";

    // 1. DESKTOP HOVER INTERACTIONS
    let hoverAmbientFrame = null;
    let isHovered = false;
    let lastPointerMoveTime = 0;

    const startHoverAmbient = () => {
      cancelAnimationFrame(hoverAmbientFrame);
      const loop = () => {
        if (!isHovered) return;
        const now = performance.now();
        // If cursor pauses for >200ms, introduce a gentle living micro-tilt breath (~0.75deg)
        if (now - lastPointerMoveTime > 200) {
          const t = (now - lastPointerMoveTime) * 0.0016;
          const microRx = Math.sin(t) * 0.75;
          const microRy = Math.cos(t * 0.85) * 0.75;
          targetRotX = Math.max(-TILT_MAX_DEG, Math.min(TILT_MAX_DEG, targetRotX * 0.96 + microRx * 0.04));
          targetRotY = Math.max(-TILT_MAX_DEG, Math.min(TILT_MAX_DEG, targetRotY * 0.96 + microRy * 0.04));
          if (!tiltLoopActive) {
            tiltLoopActive = true;
            requestAnimationFrame(tiltLoop);
          }
        }
        hoverAmbientFrame = requestAnimationFrame(loop);
      };
      hoverAmbientFrame = requestAnimationFrame(loop);
    };

    let cachedRect = null;

    card.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "touch") return; // Touch is handled separately
      isHovered = true;
      card.classList.add("is-hovered");
      cachedRect = card.getBoundingClientRect();

      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(6); // subtle tick on hover enter
      }

      if (window.AudioEngine && window.AudioEngine.playHover) {
        window.AudioEngine.playHover();
      }

      // Initial tactile tilt based on entry point
      const rect = cachedRect;
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
      lastPointerMoveTime = performance.now();
      updateTiltTarget(-ny * TILT_MAX_DEG, nx * TILT_MAX_DEG);
      startHoverAmbient();
    });

    card.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      lastPointerMoveTime = performance.now();
      if (!cachedRect) cachedRect = card.getBoundingClientRect();
      const rect = cachedRect;
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));

      const rx = -ny * TILT_MAX_DEG;
      const ry = nx * TILT_MAX_DEG;
      updateTiltTarget(rx, ry);
    });

    card.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "touch") return;
      isHovered = false;
      cachedRect = null;
      card.classList.remove("is-hovered");
      cancelAnimationFrame(hoverAmbientFrame);
      resetTiltForCard(card);
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(4); // subtle tick on hover leave
      }
    });

    // 2. MOBILE LONG-PRESS TACTILE INSPECTION
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouching = false;
    let longPressTimer = null;
    let longPressAnimFrame = null;
    let wasLongPress = false;

    const startLongPressTiltOrbit = () => {
      const startTime = performance.now();
      cancelAnimationFrame(longPressAnimFrame);
      const loop = () => {
        if (!isLongPressActive) return;
        const elapsed = (performance.now() - startTime) * 0.0016;
        // Restrained, continuous luxury 3D tilt orbit while held
        const orbitRx = Math.sin(elapsed) * 3.2;
        const orbitRy = Math.cos(elapsed * 0.85) * 3.6;
        updateTiltTarget(orbitRx, orbitRy);
        longPressAnimFrame = requestAnimationFrame(loop);
      };
      longPressAnimFrame = requestAnimationFrame(loop);
    };

    card.addEventListener("touchstart", (e) => {
      if (!e.touches || e.touches.length === 0) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isTouching = true;
      wasLongPress = false;

      clearTimeout(longPressTimer);
      cancelAnimationFrame(longPressAnimFrame);

      // Light tactile touch feedback
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(8);
      }

      // Start long-press detection timer (350ms)
      longPressTimer = setTimeout(() => {
        if (!isTouching) return;
        isLongPressActive = true;
        wasLongPress = true;
        card.classList.add("is-long-press-active");

        // Enhanced tactile haptics on long-press engagement
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate([22, 35, 20]);
        }
        // Soft luxury rustle sound
        if (window.AudioEngine && window.AudioEngine.playRustle) {
          window.AudioEngine.playRustle();
        }

        // Start dynamic 3D inspection tilt animation
        startLongPressTiltOrbit();
      }, 350);
    }, { passive: true });

    card.addEventListener("touchmove", (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const curX = e.touches[0].clientX;
      const curY = e.touches[0].clientY;

      if (!isLongPressActive) {
        // If user moves finger >8px before long-press activates, cancel timer (it is a scroll)
        const dist = Math.hypot(curX - touchStartX, curY - touchStartY);
        if (dist > 8) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      } else {
        // Long-press active: allow finger to interactively steer the 3D tilt!
        if (e.cancelable) e.preventDefault();
        cancelAnimationFrame(longPressAnimFrame); // Direct touch overrides idle orbit

        const rect = card.getBoundingClientRect();
        const nx = ((curX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((curY - rect.top) / rect.height - 0.5) * 2;
        updateTiltTarget(-ny * (TILT_MAX_DEG + 1), nx * (TILT_MAX_DEG + 1));
      }
    }, { passive: false });

    const endTouch = () => {
      isTouching = false;
      clearTimeout(longPressTimer);
      longPressTimer = null;
      cancelAnimationFrame(longPressAnimFrame);

      if (isLongPressActive) {
        isLongPressActive = false;
        card.classList.remove("is-long-press-active");
        if (window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate(10); // subtle release tick
        }
        resetTiltForCard(card);
      }
    };

    card.addEventListener("touchend", endTouch, { passive: true });
    card.addEventListener("touchcancel", endTouch, { passive: true });

    // Prevent accidental click triggering when finishing a long-press
    card.addEventListener("click", (e) => {
      if (wasLongPress) {
        e.preventDefault();
        e.stopPropagation();
        wasLongPress = false;
      }
    }, true);
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
  const PARTICLE_COUNT = 52;

  let width = 0;
  let height = 0;
  let animId = null;

  // Sovereign Authentic Gold Palette
  const darkGoldPalette = [
    { r: 245, g: 232, b: 195 }, // Pale champagne highlight
    { r: 232, g: 200, b: 110 }, // Radiant sovereign gold
    { r: 212, g: 175, b: 55 },  // Authentic 24k gold
    { r: 195, g: 155, b: 75 },  // Warm bronze gold
    { r: 255, g: 245, b: 220 }  // Starlight gold
  ];

  const lightGoldPalette = [
    { r: 175, g: 130, b: 45 },  // Deep antique gold
    { r: 195, g: 148, b: 58 },  // Sovereign warm amber gold
    { r: 155, g: 110, b: 35 },  // Rich bronze
    { r: 210, g: 165, b: 70 }   // Polished brass highlight
  ];

  const createParticle = (isBurst = false, customX, customY) => {
    const isLight = document.body.classList.contains("light-mode");
    const palette = isLight ? lightGoldPalette : darkGoldPalette;
    const color = palette[Math.floor(Math.random() * palette.length)];

    // Type distribution: 60% fine motes, 28% medium shimmering flecks, 12% radiant glints
    const typeRand = Math.random();
    let type = "mote";
    let radius = Math.random() * 0.7 + 0.65; // 0.65px - 1.35px

    if (typeRand > 0.88) {
      type = "glint";
      radius = Math.random() * 0.8 + 1.8; // 1.8px - 2.6px
    } else if (typeRand > 0.60) {
      type = "fleck";
      radius = Math.random() * 0.6 + 1.2; // 1.2px - 1.8px
    }

    if (isBurst) {
      radius *= 1.35;
    }

    return {
      x: customX !== undefined ? customX : Math.random() * (width || 360),
      y: customY !== undefined ? customY : Math.random() * (height || 500),
      radius,
      type,
      color,
      // Suspended thermal buoyancy drift
      speedX: isBurst ? (Math.random() - 0.5) * 1.4 : (Math.random() - 0.5) * 0.16,
      speedY: isBurst ? -(Math.random() * 2.2 + 1.0) : -(Math.random() * 0.2 + 0.07),
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleAngle: Math.random() * Math.PI * 2,
      baseOpacity: type === "glint" ? Math.random() * 0.35 + 0.45 : Math.random() * 0.35 + 0.28,
      pulseSpeed: Math.random() * 0.025 + 0.008,
      pulseAngle: Math.random() * Math.PI * 2,
      flare: type === "glint" && Math.random() > 0.5 ? Math.random() * 0.6 + 0.2 : 0,
      flareDecay: Math.random() * 0.014 + 0.008,
      flareInterval: Math.floor(Math.random() * 240 + 120),
      flareTimer: Math.floor(Math.random() * 180),
      depth: Math.random() * 0.8 + 0.2, // Parallax depth factor (0.2 to 1.0)
      isBurst,
      life: isBurst ? 1.0 : Infinity
    };
  };

  const initParticles = () => {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(false));
    }
  };

  const resize = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    width = rect.width;
    height = rect.height;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    if (particles.length === 0) {
      initParticles();
    }
  };

  // Expose milestone burst trigger
  window.triggerGoldDustMilestone = () => {
    if (window.HapticEngine) {
      window.HapticEngine.milestoneUnlock();
    } else if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([30, 40, 45, 60, 25]);
    }
    if (!width || !height) return;
    for (let i = 0; i < 45; i++) {
      const startX = width * 0.5 + (Math.random() - 0.5) * (width * 0.6);
      const startY = height * 0.75 + Math.random() * (height * 0.2);
      particles.push(createParticle(true, startX, startY));
    }
  };

  const isCardActive = () => {
    if (document.hidden) return false;
    const tab = document.getElementById("membership-tab");
    return Boolean(tab && tab.classList.contains("is-active"));
  };

  const draw = () => {
    if (!isCardActive()) {
      animId = null;
      return;
    }

    if (!width || !height) {
      resize();
      animId = requestAnimationFrame(draw);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const isLight = document.body.classList.contains("light-mode");

    // Clean up dead burst particles
    particles = particles.filter((p) => !p.isBurst || p.life > 0);

    // Maintain base particle population
    while (particles.filter(p => !p.isBurst).length < PARTICLE_COUNT) {
      particles.push(createParticle(false, Math.random() * width, height + 6));
    }

    // Parallax tilt shift from 3D tilt engine
    const rotX = typeof currentRotX !== "undefined" ? currentRotX : 0;
    const rotY = typeof currentRotY !== "undefined" ? currentRotY : 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Physical drift motion
      p.wobbleAngle += p.wobbleSpeed;
      const wobbleX = Math.sin(p.wobbleAngle) * 0.12;

      p.x += p.speedX + wobbleX;
      p.y += p.speedY;

      if (p.isBurst) {
        p.life -= 0.005;
        p.speedX *= 0.985;
        p.speedY *= 0.99;
      } else {
        // Wrap smoothly around card boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.y > height + 10) p.y = -10;
      }

      // Parallax position based on 3D tilt
      const parallaxX = rotY * p.depth * 1.5;
      const parallaxY = -rotX * p.depth * 1.5;
      const drawX = p.x + parallaxX;
      const drawY = p.y + parallaxY;

      // Pulse breathing
      p.pulseAngle += p.pulseSpeed;
      const pulse = Math.sin(p.pulseAngle);
      let opacity = p.baseOpacity + pulse * 0.18;

      // Handle glint twinkle
      p.flareTimer++;
      if (p.type === "glint" && p.flareTimer >= p.flareInterval && p.flare <= 0) {
        p.flare = 1.0;
        p.flareTimer = 0;
        p.flareInterval = Math.floor(Math.random() * 260 + 140);
      } else if (p.flare > 0) {
        p.flare -= p.flareDecay;
        if (p.flare < 0) p.flare = 0;
      }

      if (p.isBurst) {
        opacity *= Math.min(1, p.life * 2.5);
      }

      // Final composite opacity
      const finalOpacity = Math.max(
        0,
        Math.min(1, opacity + p.flare * 0.5)
      );

      const radius = p.radius * (1 + p.flare * 0.35);
      const { r, g, b } = p.color;

      // Draw particle base mote
      ctx.beginPath();
      ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);

      if (p.flare > 0.15 || p.type === "glint") {
        ctx.shadowColor = isLight ? `rgba(180, 138, 52, ${finalOpacity * 0.7})` : `rgba(255, 235, 170, ${finalOpacity * 0.8})`;
        ctx.shadowBlur = isLight ? 3 : 5 * (1 + p.flare);
      } else if (p.type === "fleck") {
        ctx.shadowColor = isLight ? `rgba(165, 125, 45, 0.4)` : `rgba(212, 175, 55, 0.4)`;
        ctx.shadowBlur = 2;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
      ctx.fill();

      // Soft 4-point glint flare for starlet particles
      if (p.flare > 0.08) {
        const f = p.flare;
        const flareSpan = (p.radius * 3.5 + 2) * f;

        ctx.save();
        ctx.translate(drawX, drawY);

        ctx.beginPath();
        ctx.moveTo(0, -flareSpan);
        ctx.quadraticCurveTo(0, 0, flareSpan, 0);
        ctx.quadraticCurveTo(0, 0, 0, flareSpan);
        ctx.quadraticCurveTo(0, 0, -flareSpan, 0);
        ctx.quadraticCurveTo(0, 0, 0, -flareSpan);

        ctx.shadowColor = isLight ? "rgba(200, 150, 60, 0.8)" : "rgba(255, 245, 210, 0.9)";
        ctx.shadowBlur = 6 * f;
        ctx.fillStyle = isLight ? `rgba(210, 165, 70, ${f * 0.75})` : `rgba(255, 248, 220, ${f * 0.85})`;
        ctx.fill();

        // White-gold pinpoint center
        ctx.beginPath();
        ctx.arc(0, 0, p.radius * 0.7 * f, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? `rgba(255, 255, 255, ${f * 0.9})` : `rgba(255, 255, 255, ${f})`;
        ctx.fill();

        ctx.restore();
      }
    }

    ctx.restore();
    animId = requestAnimationFrame(draw);
  };

  // ResizeObserver for reliable dimension tracking
  if (window.ResizeObserver && canvas.parentElement) {
    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas.parentElement);
  }

  window.addEventListener("resize", resize);

  window.resumeGoldDustCanvas = () => {
    if (!animId && isCardActive()) {
      draw();
    }
  };

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    } else if (isCardActive() && !animId) {
      draw();
    }
  });

  // Initialize after layout settles
  setTimeout(() => {
    resize();
    if (!animId && isCardActive()) {
      draw();
    }
  }, 80);
}

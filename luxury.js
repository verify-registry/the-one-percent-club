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
    
    if (typeof OffscreenCanvas !== 'undefined') {
        offscreen = new OffscreenCanvas(size, size);
        ctx = offscreen.getContext('2d', { alpha: false });
    } else {
        offscreen = document.createElement('canvas');
        offscreen.width = size;
        offscreen.height = size;
        ctx = offscreen.getContext('2d', { alpha: false });
    }

    // Multi-layered specular gold gradient
    const cx = size / 2, cy = size / 2;
    const conical = ctx.createConicGradient ? ctx.createConicGradient(Math.PI / 4, cx, cy) : null;
    
    let grad;
    if (conical) {
        grad = conical;
        grad.addColorStop(0, '#FFF6D6');
        grad.addColorStop(0.15, '#D8AE5E');
        grad.addColorStop(0.3, '#3A2408');
        grad.addColorStop(0.45, '#8F6826');
        grad.addColorStop(0.55, '#FFF6D6'); // Specular highlight
        grad.addColorStop(0.7, '#D8AE5E');
        grad.addColorStop(0.85, '#3A2408');
        grad.addColorStop(1, '#FFF6D6');
    } else {
        // Fallback to linear if conic is unsupported
        grad = ctx.createLinearGradient(0, 0, size, size);
        grad.addColorStop(0, '#FFF6D6');
        grad.addColorStop(0.2, '#D8AE5E');
        grad.addColorStop(0.5, '#3A2408');
        grad.addColorStop(0.8, '#D8AE5E');
        grad.addColorStop(1, '#FFF6D6');
    }
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Apply micro-brushed texture for realistic 3D metal look
    ctx.globalCompositeOperation = 'overlay';
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
    ctx.globalCompositeOperation = 'screen';
    const glints = [
        { x: size * 0.25, y: size * 0.25, r: size * 0.45, alpha: 0.8 },  // Top-left primary light
        { x: size * 0.75, y: size * 0.75, r: size * 0.35, alpha: 0.5 },  // Bottom-right secondary bounce
        { x: size * 0.5,  y: size * 0.1,  r: size * 0.5,  alpha: 0.6 },  // Top edge wash
        { x: size * 0.1,  y: size * 0.85, r: size * 0.3,  alpha: 0.4 }   // Bottom-left soft glow
    ];

    glints.forEach(g => {
        const radGrad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        radGrad.addColorStop(0, `rgba(255, 255, 255, ${g.alpha})`);
        radGrad.addColorStop(0.2, `rgba(255, 246, 214, ${g.alpha * 0.8})`);
        radGrad.addColorStop(0.6, `rgba(216, 174, 94, ${g.alpha * 0.3})`);
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalCompositeOperation = 'source-over'; // Reset blend mode

    // Export to data URL (need canvas if using OffscreenCanvas fallback)
    let textureUrl;
    if (offscreen.toDataURL) {
        textureUrl = offscreen.toDataURL('image/png');
    } else {
        // Fallback for OffscreenCanvas in some browsers
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = size;
        tempCanvas.height = size;
        tempCanvas.getContext('2d').drawImage(offscreen, 0, 0);
        textureUrl = tempCanvas.toDataURL('image/png');
    }

    // Inject as SVG pattern into document <defs> so SVGs can use it
    let defs = document.querySelector('svg defs');
    if (!defs) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');
        svg.style.position = 'absolute';
        svg.style.pointerEvents = 'none';
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svg.appendChild(defs);
        document.body.appendChild(svg);
    }

    // Pattern for Bezels & Wreaths
    let pattern = document.getElementById('metal3D');
    if (!pattern) {
        pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        pattern.setAttribute('id', 'metal3D');
        // CRITICAL FIX: use objectBoundingBox so the 512x512 texture stretches 
        // to fit the exact dimensions of whichever SVG shape uses it, 
        // regardless of the element's viewBox.
        pattern.setAttribute('patternUnits', 'objectBoundingBox');
        pattern.setAttribute('width', '1');
        pattern.setAttribute('height', '1');
        
        const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttribute('href', textureUrl);
        img.setAttribute('width', '100%');
        img.setAttribute('height', '100%');
        img.setAttribute('preserveAspectRatio', 'none'); // Stretch to fit the bounding box
        
        pattern.appendChild(img);
        defs.appendChild(pattern);
    }

    // Function to apply the 3D metal texture to specific elements
    const applyMetal = (node) => {
        if (node.nodeType === 1) { // Element node
            const targetGradients = ['url(#wreathGrad)', 'url(#bezelGrad)', 'url(#ringGoldGrad)'];
            
            const processEl = (el) => {
                const fill = el.getAttribute('fill');
                if (fill && targetGradients.includes(fill.replace(/\s/g, ''))) {
                    el.setAttribute('fill', 'url(#metal3D)');
                }
                const stroke = el.getAttribute('stroke');
                if (stroke && targetGradients.includes(stroke.replace(/\s/g, ''))) {
                    el.setAttribute('stroke', 'url(#metal3D)');
                }
            };
            
            if (node.hasAttribute && (node.hasAttribute('fill') || node.hasAttribute('stroke'))) {
                processEl(node);
            }
            
            node.querySelectorAll('[fill*="url(#"], [stroke*="url(#"]').forEach(processEl);
        }
    };

    // 1. Apply to elements already in the DOM
    applyMetal(document.body);

    // 2. Observe DOM mutations so dynamically added components (like bezelTicks in app.js) get the texture too
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(applyMetal);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

function initGuilloche() {
    const canvas = document.getElementById('guillocheCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize by disabling alpha channel on base canvas
    
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
        if (currentWidth === rect.width && currentHeight === rect.height && currentDpr === dpr) {
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
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 150); // Wait 150ms after resizing stops
    }, { passive: true });
    
    // Initial draw with a slight delay to ensure layout is computed
    setTimeout(resizeCanvas, 100);
}

function drawGuilloche(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
    
    const cx = width / 2;
    const cy = height / 2;

    // 1. Deep Obsidian Base with Brushed Metal Spotlight
    const bgGradient = ctx.createRadialGradient(cx, cy * 0.4, 0, cx, cy * 0.4, height * 0.85);
    bgGradient.addColorStop(0, '#1c160c'); // Subtle warm gold/brown inner glow
    bgGradient.addColorStop(0.35, '#0a0806'); // Deep transition
    bgGradient.addColorStop(1, '#000000'); // Pure black edges
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle brushed texture
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(255, 230, 150, 0.015)';
    // Optimize texture drawing by using larger steps if possible
    for(let i = 0; i < width; i += 3) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
    }
    ctx.restore();

    // 2. Guilloché Security Lines
    ctx.lineWidth = 0.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Central dense rosette (more visible)
    ctx.strokeStyle = 'rgba(215, 180, 80, 0.15)'; 
    drawHypotrochoid(ctx, cx, cy, width * 0.45, width * 0.12, width * 0.18, 150);
    
    // Secondary outer web (fainter)
    ctx.strokeStyle = 'rgba(215, 180, 80, 0.08)'; 
    drawHypotrochoid(ctx, cx, cy, width * 0.6, width * 0.05, width * 0.1, 250);
    
    // Inner delicate weave
    ctx.strokeStyle = 'rgba(215, 180, 80, 0.12)';
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

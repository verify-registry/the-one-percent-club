// Subtle, luxury-inspired sound effects using Web Audio API

const AudioEngine = (function () {
  let ctx = null;
  let unlocked = false;
  let enabled = true;
  let lastTickTime = 0;

  try {
    const saved = localStorage.getItem("club_audio_enabled");
    if (saved !== null) {
      enabled = saved === "true";
    }
  } catch {}

  function getAudioContext() {
    if (!ctx && typeof window !== "undefined") {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        try {
          ctx = new AudioCtxClass();
        } catch (e) {}
      }
    }
    return ctx;
  }

  function init() {
    const context = getAudioContext();
    if (context && context.state === "suspended") {
      try {
        context.resume().catch(() => {});
      } catch (e) {}
    }
    unlocked = true;
  }

  function ensureContextReady() {
    const context = getAudioContext();
    if (!context) return null;
    if (context.state === "suspended") {
      try {
        context.resume().catch(() => {});
      } catch (e) {}
    }
    return context;
  }

  // Multi-gesture mobile unblock listener for iOS WebKit & Android Chrome
  const unlockEvents = ["touchstart", "touchend", "pointerdown", "pointerup", "click", "keydown"];
  function handleUnlock() {
    init();
    // Play a 0-volume 1-sample silent buffer on iOS to unlock the audio hardware immediately
    try {
      const c = getAudioContext();
      if (c) {
        const buffer = c.createBuffer(1, 1, 22050);
        const source = c.createBufferSource();
        source.buffer = buffer;
        source.connect(c.destination);
        source.start(0);
      }
    } catch (e) {}
    if (ctx && ctx.state === "running") {
      unlockEvents.forEach((e) => {
        document.removeEventListener(e, handleUnlock, true);
        window.removeEventListener(e, handleUnlock, true);
      });
    }
  }
  if (typeof document !== "undefined") {
    unlockEvents.forEach((e) => {
      document.addEventListener(e, handleUnlock, { capture: true, passive: true });
      window.addEventListener(e, handleUnlock, { capture: true, passive: true });
    });
  }

  function isEnabled() {
    return enabled;
  }

  function setEnabled(val) {
    enabled = Boolean(val);
    try {
      localStorage.setItem("club_audio_enabled", enabled ? "true" : "false");
    } catch {}
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("club-audio-change", { detail: { enabled } })
        );
      } catch (e) {}
    }
  }

  // Ultra-subtle tactile tick for cards (damped mechanical impulse)
  function playHover() {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastTickTime < 140) return; // Debounce rapid movements
    lastTickTime = now;

    const c = ensureContextReady();
    if (!c) return;

    try {
      const t = c.currentTime;
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2200, t);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.025);

      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2800;

      const gain = c.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {}
  }

  // A subtle, resonant chime for premium successful actions (e.g., purchase, copy, metric inspect)
  function playChime() {
    if (!enabled) return;
    const c = ensureContextReady();
    if (!c) return;

    try {
      const t = c.currentTime;

      // Base tone (C6)
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1046.5, t);

      const gain = c.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

      // Harmonic overtone (G6)
      const osc2 = c.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1567.98, t);

      const gain2 = c.createGain();
      gain2.gain.setValueAtTime(0, t);
      gain2.gain.linearRampToValueAtTime(0.08, t + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 2.0);

      // Subtle low-pass filter for warmth
      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 3200;

      osc.connect(gain);
      gain.connect(filter);

      osc2.connect(gain2);
      gain2.connect(filter);

      filter.connect(c.destination);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + 2.6);
      osc2.stop(t + 2.1);
    } catch {}
  }

  // Soft paper/fabric rustle for tactile inspection (e.g. card tilt, long-press)
  function playRustle() {
    if (!enabled) return;
    const c = ensureContextReady();
    if (!c) return;

    try {
      const t = c.currentTime;
      const duration = 0.22;
      const bufferSize = Math.floor(c.sampleRate * duration);
      const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
      const data = buffer.getChannelData(0);

      // Filtered white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noiseSource = c.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.exponentialRampToValueAtTime(320, t + duration);

      const gain = c.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);

      noiseSource.start(t);
    } catch {}
  }

  // Elegant warm chord when opening a modal (like a luxury velvet case sliding open)
  function playModalOpen() {
    if (!enabled) return;
    const c = ensureContextReady();
    if (!c) return;

    try {
      const t = c.currentTime;

      // Dual harmonic tones (F5 and C6)
      const osc1 = c.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(698.46, t);
      osc1.frequency.exponentialRampToValueAtTime(740, t + 0.15);

      const osc2 = c.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1046.5, t);

      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2400;

      const gain = c.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);
      filter.connect(c.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.38);
      osc2.stop(t + 0.38);
    } catch {}
  }

  // Soft, muted latch tone when closing a modal
  function playModalClose() {
    if (!enabled) return;
    const c = ensureContextReady();
    if (!c) return;

    try {
      const t = c.currentTime;
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(360, t + 0.1);

      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1800;

      const gain = c.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);

      osc.start(t);
      osc.stop(t + 0.15);
    } catch {}
  }

  // Precision metallic snap when equipping or unequipping an artifact
  function playEquip() {
    if (!enabled) return;
    const c = ensureContextReady();
    if (!c) return;

    try {
      const t = c.currentTime;

      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1480, t);
      osc.frequency.exponentialRampToValueAtTime(2100, t + 0.04);

      const gain = c.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      const filter = c.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800;
      filter.Q.value = 3;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);

      osc.start(t);
      osc.stop(t + 0.15);
    } catch {}
  }

  function playSend() {
    if (!enabled) return;
    try {
      const c = ensureContextReady ? ensureContextReady() : ctx;
      if (!c) return;
      const t = c.currentTime;
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
      const gain = c.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    } catch (e) {}
  }

  // --- RANK-BASED SOVEREIGN NOTIFICATION SYSTEM ---
  // Highest Sovereign ranks (FOUNDER, SOVEREIGN, ARCHON, EXARCH):
  // Produces a rich, resonant, multi-harmonic "Golden Chime" reminiscent of solid 24k gold horology minute-repeater
  function playGoldenSovereignChime() {
    if (!enabled) return;
    const c = ensureContextReady ? ensureContextReady() : ctx;
    if (!c) return;

    try {
      const t = c.currentTime;

      // 1. Primary fundamental bell tone (1174.66 Hz - D6)
      const osc1 = c.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1174.66, t);

      // 2. Harmonic golden ratio overtone (~1900.6 Hz)
      const osc2 = c.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1900.6, t);

      // 3. High-frequency crystalline golden shimmer (2349.32 Hz - D7)
      const osc3 = c.createOscillator();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(2349.32, t);

      // Warmth & Acoustic Luster Filter
      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(4600, t);
      filter.frequency.exponentialRampToValueAtTime(2200, t + 2.0);

      // Master Gain with exquisite bell envelope (crisp attack, singing exponential decay)
      const masterGain = c.createGain();
      masterGain.gain.setValueAtTime(0, t);
      masterGain.gain.linearRampToValueAtTime(0.16, t + 0.012);
      masterGain.gain.exponentialRampToValueAtTime(0.045, t + 0.35);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);

      // Individual gain balances
      const gain1 = c.createGain();
      gain1.gain.setValueAtTime(0.12, t);
      gain1.gain.exponentialRampToValueAtTime(0.0001, t + 2.1);

      const gain2 = c.createGain();
      gain2.gain.setValueAtTime(0.08, t);
      gain2.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);

      const gain3 = c.createGain();
      gain3.gain.setValueAtTime(0.04, t);
      gain3.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(masterGain);
      gain2.connect(masterGain);
      gain3.connect(masterGain);

      masterGain.connect(filter);
      filter.connect(c.destination);

      osc1.start(t);
      osc2.start(t);
      osc3.start(t);

      osc1.stop(t + 2.15);
      osc2.stop(t + 1.65);
      osc3.stop(t + 1.25);
    } catch (e) {}
  }

  // Mid-High Ranks (TITAN, PATRON, MAGNATE):
  // Authoritative, polished bronze dual-chime resonance
  function playTitanResonance() {
    if (!enabled) return;
    const c = ensureContextReady ? ensureContextReady() : ctx;
    if (!c) return;

    try {
      const t = c.currentTime;

      const osc1 = c.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, t); // A5

      const osc2 = c.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1318.5, t); // E6

      const filter = c.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3200, t);

      const gain = c.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0002, t + 1.15);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);
      filter.connect(c.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 1.2);
      osc2.stop(t + 1.2);
    } catch (e) {}
  }

  // Standard/Member Rank: Soft, velvet-damped mechanical impulse
  function playStandardReceive() {
    if (!enabled) return;
    try {
      const c = ensureContextReady ? ensureContextReady() : ctx;
      if (!c) return;
      const t = c.currentTime;
      const osc = c.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(740, t);
      osc.frequency.exponentialRampToValueAtTime(580, t + 0.16);
      const gain = c.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.22);
    } catch (e) {}
  }

  // Master Tier-Aware Dispatcher
  function playReceive(tier) {
    if (!enabled) return;
    const rawTier = String(tier || "").toUpperCase().trim();

    // 1. Highest Sovereign Ranks -> Distinctive Golden Chime
    if (
      rawTier.includes("FOUNDER") ||
      rawTier.includes("SOVEREIGN") ||
      rawTier.includes("ARCHON") ||
      rawTier.includes("EXARCH") ||
      rawTier.includes("المؤسس") ||
      rawTier.includes("السيادي") ||
      rawTier.includes("سيادي")
    ) {
      playGoldenSovereignChime();
      if (typeof window !== "undefined" && window.HapticEngine && window.HapticEngine.vibrate) {
        window.HapticEngine.vibrate([22, 55, 35]); // Sovereign tactile pulse
      }
      return "golden_sovereign";
    }

    // 2. Mid-High Ranks -> Authoritative Titan Resonance
    if (
      rawTier.includes("TITAN") ||
      rawTier.includes("PATRON") ||
      rawTier.includes("MAGNATE") ||
      rawTier.includes("عملاق") ||
      rawTier.includes("الراعي")
    ) {
      playTitanResonance();
      if (typeof window !== "undefined" && window.HapticEngine && window.HapticEngine.vibrate) {
        window.HapticEngine.vibrate([18, 40, 18]);
      }
      return "titan_resonance";
    }

    // 3. Standard Members -> Discreet mechanical receive
    playStandardReceive();
    if (typeof window !== "undefined" && window.HapticEngine && window.HapticEngine.vibrate) {
      window.HapticEngine.vibrate(15);
    }
    return "standard";
  }

  // --- SOVEREIGN SEALS & ACCOLADES HAPTIC AUDIO SYSTEM ---
  function playAccoladeStamp(type = "endorse") {
    if (!enabled) return;
    const c = ensureContextReady ? ensureContextReady() : ctx;
    if (!c) return;

    try {
      const t = c.currentTime;

      if (type === "toast") {
        // Crystalline champagne coupe clink
        const osc1 = c.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(2489.02, t);
        osc1.frequency.exponentialRampToValueAtTime(2450, t + 0.35);

        const osc2 = c.createOscillator();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(3729.31, t);

        const gain1 = c.createGain();
        gain1.gain.setValueAtTime(0.0001, t);
        gain1.gain.linearRampToValueAtTime(0.08, t + 0.004);
        gain1.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);

        const gain2 = c.createGain();
        gain2.gain.setValueAtTime(0.0001, t);
        gain2.gain.linearRampToValueAtTime(0.035, t + 0.003);
        gain2.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);

        osc1.connect(gain1);
        gain1.connect(c.destination);
        osc2.connect(gain2);
        gain2.connect(c.destination);

        osc1.start(t);
        osc1.stop(t + 0.4);
        osc2.start(t);
        osc2.stop(t + 0.22);
      } else if (type === "honor") {
        // Signet ring accord stamp (crisp metallic click + resonant decay)
        const oscMetal = c.createOscillator();
        oscMetal.type = "triangle";
        oscMetal.frequency.setValueAtTime(1480, t);
        oscMetal.frequency.exponentialRampToValueAtTime(880, t + 0.07);

        const oscChime = c.createOscillator();
        oscChime.type = "sine";
        oscChime.frequency.setValueAtTime(1760, t);
        oscChime.frequency.exponentialRampToValueAtTime(1750, t + 0.28);

        const gainMetal = c.createGain();
        gainMetal.gain.setValueAtTime(0.0001, t);
        gainMetal.gain.linearRampToValueAtTime(0.07, t + 0.004);
        gainMetal.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

        const gainChime = c.createGain();
        gainChime.gain.setValueAtTime(0.0001, t);
        gainChime.gain.linearRampToValueAtTime(0.045, t + 0.01);
        gainChime.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);

        oscMetal.connect(gainMetal);
        gainMetal.connect(c.destination);
        oscChime.connect(gainChime);
        gainChime.connect(c.destination);

        oscMetal.start(t);
        oscMetal.stop(t + 0.1);
        oscChime.start(t);
        oscChime.stop(t + 0.32);
      } else {
        // Sovereign wax endorsement stamp (warm velvet thump + soft gold shimmer)
        const oscThump = c.createOscillator();
        oscThump.type = "sine";
        oscThump.frequency.setValueAtTime(190, t);
        oscThump.frequency.exponentialRampToValueAtTime(65, t + 0.14);

        const oscShimmer = c.createOscillator();
        oscShimmer.type = "sine";
        oscShimmer.frequency.setValueAtTime(1174.66, t);
        oscShimmer.frequency.exponentialRampToValueAtTime(1160, t + 0.25);

        const gainThump = c.createGain();
        gainThump.gain.setValueAtTime(0.0001, t);
        gainThump.gain.linearRampToValueAtTime(0.1, t + 0.005);
        gainThump.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);

        const gainShimmer = c.createGain();
        gainShimmer.gain.setValueAtTime(0.0001, t);
        gainShimmer.gain.linearRampToValueAtTime(0.04, t + 0.012);
        gainShimmer.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);

        oscThump.connect(gainThump);
        gainThump.connect(c.destination);
        oscShimmer.connect(gainShimmer);
        gainShimmer.connect(c.destination);

        oscThump.start(t);
        oscThump.stop(t + 0.16);
        oscShimmer.start(t);
        oscShimmer.stop(t + 0.3);
      }
    } catch (e) {}
  }

  return {
    init,
    isEnabled,
    setEnabled,
    playHover,
    playChime,
    playRustle,
    playModalOpen,
    playModalClose,
    playEquip,
    playSend,
    playReceive,
    playGoldenSovereignChime,
    playTitanResonance,
    playStandardReceive,
    playAccoladeStamp,
  };
})();

// =========================================================
// HapticEngine: Subtle, luxury-grade tactile impulse feedback
// utilizing the Navigator Vibrate API
// =========================================================
const HapticEngine = (function () {
  let lastMilestoneVibeTime = 0;
  let lastBoutiqueVibeTime = 0;

  function isSupported() {
    return (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined" &&
      typeof window.navigator.vibrate === "function"
    );
  }

  function isEnabled() {
    try {
      const hapticSaved = localStorage.getItem("club_haptic_enabled");
      if (hapticSaved === "false") return false;
    } catch {}
    // Respect the global Audio & Tactile user preference
    return window.AudioEngine ? window.AudioEngine.isEnabled() : true;
  }

  function vibrate(pattern) {
    if (!isSupported() || !isEnabled()) return false;
    try {
      return window.navigator.vibrate(pattern);
    } catch (e) {
      return false;
    }
  }

  // Subtle mechanical pulse when completing a Boutique transaction
  // A calibrated dual-impulse reminiscent of a precision vault or chronometer latching
  function boutiquePurchase() {
    const now = performance.now();
    if (now - lastBoutiqueVibeTime < 300) return false;
    lastBoutiqueVibeTime = now;
    // 35ms pulse, 50ms pause, 20ms mechanical confirmation tick
    return vibrate([35, 50, 20]);
  }

  // Sovereign harmonic cadence when unlocking a milestone
  // (Tier ascension or prestige milestone honor)
  function milestoneUnlock() {
    const now = performance.now();
    if (now - lastMilestoneVibeTime < 600) return false;
    lastMilestoneVibeTime = now;
    // 30ms announcement pulse, 40ms pause, 45ms resonance pulse, 60ms pause, 25ms sovereign crown tick
    return vibrate([30, 40, 45, 60, 25]);
  }

  // Ultra-subtle single tick for tactile interactions
  function tap(duration = 12) {
    return vibrate(duration);
  }

  return {
    isSupported,
    isEnabled,
    vibrate,
    boutiquePurchase,
    milestoneUnlock,
    tap,
  };
})();

if (typeof window !== "undefined") {
  window.AudioEngine = AudioEngine;
  window.HapticEngine = HapticEngine;
  if (window.AudioEngine) {
    window.AudioEngine.vibrateBoutiquePurchase = HapticEngine.boutiquePurchase;
    window.AudioEngine.vibrateMilestoneUnlock = HapticEngine.milestoneUnlock;
  }
}

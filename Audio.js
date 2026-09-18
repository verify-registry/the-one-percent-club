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

  function init() {
    if (!ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        ctx = new AudioContext();
      }
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    unlocked = true;
  }

  function isEnabled() {
    return enabled;
  }

  function setEnabled(val) {
    enabled = Boolean(val);
    try {
      localStorage.setItem("club_audio_enabled", enabled ? "true" : "false");
    } catch {}
  }

  // Ultra-subtle tactile hover tick for cards (damped mechanical impulse)
  function playHover() {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastTickTime < 180) return; // Debounce rapid movements
    lastTickTime = now;

    if (!ctx) init();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(2200, t);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.02);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2600;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.022, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + 0.022);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.025);
    } catch {}
  }

  // A subtle, resonant chime for premium successful actions (e.g., purchase)
  function playChime() {
    if (!enabled) return;
    if (!ctx) init();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      // Base tone
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1046.5, t); // C6

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.065, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

      // Harmonic overtone
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1567.98, t); // G6

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0, t);
      gain2.gain.linearRampToValueAtTime(0.035, t + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 2.0);

      // Subtle low-pass filter for warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 3000;

      osc.connect(gain);
      gain.connect(filter);

      osc2.connect(gain2);
      gain2.connect(filter);

      filter.connect(ctx.destination);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + 2.6);
      osc2.stop(t + 2.1);
    } catch {}
  }

  // Soft paper/fabric rustle for tactile inspection (e.g. card tilt, long-press)
  function playRustle() {
    if (!enabled) return;
    if (!ctx) init();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const duration = 0.22;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Filtered white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.35;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1100, t);
      filter.frequency.exponentialRampToValueAtTime(280, t + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.035, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noiseSource.start(t);
    } catch {}
  }

  // Elegant warm chord when opening a modal (like a luxury velvet case sliding open)
  function playModalOpen() {
    if (!enabled) return;
    if (!ctx) init();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      // Dual harmonic tones (F5 and C6)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(698.46, t); // F5
      osc1.frequency.exponentialRampToValueAtTime(740, t + 0.15);

      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1046.5, t); // C6

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 2200;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.035, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.32);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);
      filter.connect(ctx.destination);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.35);
      osc2.stop(t + 0.35);
    } catch {}
  }

  // Soft, muted latch tone when closing a modal
  function playModalClose() {
    if (!enabled) return;
    if (!ctx) init();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(360, t + 0.1);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 1600;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.025, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.13);
    } catch {}
  }

  // Precision metallic snap when equipping or unequipping an artifact
  function playEquip() {
    if (!enabled) return;
    if (!ctx) init();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1480, t);
      osc.frequency.exponentialRampToValueAtTime(2100, t + 0.04);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.04, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800;
      filter.Q.value = 3;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.13);
    } catch {}
  }

  // Unlock audio context on user interaction
  const unlockEvents = ["pointerdown", "touchstart", "keydown", "click"];
  const unlock = () => {
    init();
    unlockEvents.forEach((e) => document.removeEventListener(e, unlock));
  };
  unlockEvents.forEach((e) =>
    document.addEventListener(e, unlock, { once: true }),
  );

  function playSend() {
    if (!enabled) return;
    if (!ctx) init();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  function playReceive() {
    if (!enabled) return;
    if (!ctx) init();
    if (!ctx) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.15);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.2);
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

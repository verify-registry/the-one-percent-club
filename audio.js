// Subtle, luxury-inspired sound effects using Web Audio API

const AudioEngine = (function() {
  let ctx = null;
  let unlocked = false;

  function init() {
    if (!ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        ctx = new AudioContext();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    unlocked = true;
  }

  // A subtle, resonant chime for premium successful actions (e.g., purchase)
  function playChime() {
    if (!ctx) init();
    if (!ctx) return;
    
    const t = ctx.currentTime;
    
    // Base tone
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1046.50, t); // C6
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
    
    // Harmonic overtone
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1567.98, t); // G6
    
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0, t);
    gain2.gain.linearRampToValueAtTime(0.04, t + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 2.0);

    // Subtle low-pass filter for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
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
  }

  // Soft paper/fabric rustle for navigation (e.g., profile opening)
  function playRustle() {
    if (!ctx) init();
    if (!ctx) return;

    const t = ctx.currentTime;
    const duration = 0.25;
    const bufferSize = ctx.sampleRate * duration; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate filtered white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Muffle into a soft rustle/cloth sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.frequency.exponentialRampToValueAtTime(300, t + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.04, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noiseSource.start(t);
  }

  // Unlock audio context on user interaction
  const unlockEvents = ['pointerdown', 'touchstart', 'keydown', 'click'];
  const unlock = () => {
    init();
    unlockEvents.forEach(e => document.removeEventListener(e, unlock));
  };
  unlockEvents.forEach(e => document.addEventListener(e, unlock, { once: true }));

  return {
    playChime,
    playRustle
  };
})();

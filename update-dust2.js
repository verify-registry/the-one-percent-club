const fs = require('fs');
let code = fs.readFileSync('luxury.js', 'utf8');

const regex = /const draw = \(\) => \{[\s\S]*?\/\/ Add flare intensity if active\s*const finalOpacity = Math\.max\(\s*0,\s*Math\.min\(1, currentOpacity \+ \(p\.flare > 0 \? p\.flare \* 0\.6 : 0\)\),\s*\);/;

const replacement = `const draw = () => {
    ctx.clearRect(0, 0, width, height);

    // Filter out dead burst particles
    particles = particles.filter((p) => !p.isBurst || p.life > 0);

    particles.forEach((p) => {
      // Move
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.isBurst) {
        p.life -= 0.004; // ~4 seconds lifetime
        p.speedX *= 0.98; // drift slowly to a stop horizontally
        p.speedY *= 0.99; // slow down vertical rise
      } else {
        // Wrap around normal particles
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      }

      // Randomly trigger a bright twinkle (flare)
      if (p.flare <= 0 && !p.isBurst && Math.random() < 0.0015) {
        p.flare = 1;
      } else if (p.flare > 0) {
        p.flare -= 0.015; // Fade out the sparkle
      }

      // Blink (normal ambient oscillation)
      p.angle += p.blinkSpeed;
      let currentOpacity = p.opacity + Math.sin(p.angle) * 0.3;
      
      if (p.isBurst) {
        currentOpacity *= Math.min(1, p.life * 2); // fade out nicely
      }

      // Add flare intensity if active
      const finalOpacity = Math.max(
        0,
        Math.min(1, currentOpacity + (p.flare > 0 ? p.flare * 0.6 : 0)),
      );`;

if (regex.test(code)) {
  fs.writeFileSync('luxury.js', code.replace(regex, replacement));
  console.log("Success");
} else {
  console.log("Failed to find target with regex");
}

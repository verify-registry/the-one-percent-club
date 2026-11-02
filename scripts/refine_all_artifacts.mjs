import fs from "fs";
import path from "path";
import sharp from "sharp";

const ARTIFACT_DEFS = {
  star1: () => {
    const points = [
      [180, 14], [217, 90], [282, 78], [274, 141],
      [327, 180], [262, 214], [276, 276], [214, 261],
      [180, 332], [148, 258], [81, 279], [100, 213],
      [34, 180], [89, 142], [83, 83], [142, 89]
    ];
    const pts = points.map(p => p.join(",")).join(" ");
    return `
      <polygon points="${pts}" />
      <circle cx="180" cy="180" r="62" />
    `;
  },

  aura1: (data) => {
    const cx = 168.5, cy = 185;
    const pts = [];
    for (let a = 0; a < 360; a += 3) {
      const angle = a * Math.PI / 180;
      let maxR = 60;
      for (let r = 60; r < 172; r++) {
        const x = Math.round(cx + r * Math.cos(angle));
        const y = Math.round(cy + r * Math.sin(angle));
        const maxLimitY = x > 185 ? 294 : 312;
        if (x < 18 || x > 320 || y < 15 || y > maxLimitY) continue; // eliminate floor/border lines
        const idx = (y * 360 + x) * 4;
        if (data[idx] > 75 && data[idx+1] > 55 && data[idx] > data[idx+2] + 15) {
          maxR = r;
        }
      }
      const x = Math.round(cx + (maxR + 2) * Math.cos(angle));
      const y = Math.round(cy + (maxR + 2) * Math.sin(angle));
      pts.push([x, y]);
    }
    const ptsStr = pts.map(p => p.join(",")).join(" ");
    return `
      <polygon points="${ptsStr}" />
      <circle cx="168.5" cy="185" r="62" />
    `;
  },

  ring1: () => {
    return `
      <!-- Smooth bezel and ring contour, tightly fitted to shank (zero floor reflection) -->
      <path d="
        M 120 28
        L 238 28
        C 260 40, 278 62, 296 90
        C 316 118, 336 150, 338 186
        C 340 215, 332 242, 312 260
        C 292 264, 238 270, 185 270
        C 135 270, 88 264, 68 252
        C 45 238, 28 215, 22 176
        C 18 140, 32 108, 48 78
        C 65 52, 90 35, 120 28
        Z
      " />
      <!-- Solid black onyx table interior -->
      <polygon points="124,36 234,36 270,75 225,205 95,205 45,75" />
    `;
  },

  crown1: () => {
    return `
      <polygon points="
        175,36
        195,125
        260,92
        296,88
        336,128
        328,230
        316,290
        312,304
        48,304
        44,290
        32,230
        24,128
        64,88
        100,92
        155,125
      " />
      <rect x="46" y="255" width="268" height="49" rx="4" />
      <!-- Solid obsidian crystal centers -->
      <polygon points="80,100 135,100 145,250 70,250" />
      <polygon points="215,100 270,100 280,250 205,250" />
    `;
  },

  ring2: () => {
    return `
      <path d="
        M 120 28
        L 238 28
        C 260 40, 278 62, 296 90
        C 316 118, 336 150, 338 186
        C 340 215, 332 242, 312 260
        C 292 264, 238 270, 185 270
        C 135 270, 88 264, 68 252
        C 45 238, 28 215, 22 176
        C 18 140, 32 108, 48 78
        C 65 52, 90 35, 120 28
        Z
      " />
      <polygon points="124,36 234,36 270,75 225,205 95,205 45,75" />
    `;
  },

  art1: () => {
    return `
      <!-- Exact circular watch case (capped at x <= 292, zero right border line) -->
      <ellipse cx="165" cy="202" rx="127" ry="126" />
      <!-- Top winding crown & bow -->
      <path d="M 144 76 C 140 50, 142 20, 168 16 C 194 20, 196 50, 192 76 Z" />
      <!-- Full solid dial interior -->
      <circle cx="165" cy="202" r="120" />
    `;
  },

  ring3: () => {
    return `
      <path d="
        M 120 28
        L 238 28
        C 260 40, 278 62, 296 90
        C 316 118, 336 150, 338 186
        C 340 215, 332 242, 312 260
        C 292 264, 238 270, 185 270
        C 135 270, 88 264, 68 252
        C 45 238, 28 215, 22 176
        C 18 140, 32 108, 48 78
        C 65 52, 90 35, 120 28
        Z
      " />
      <!-- Solid emerald table and falcon center -->
      <polygon points="124,36 234,36 270,75 225,205 95,205 45,75" />
    `;
  },

  aura4: () => {
    return `
      <!-- Top star finial (x capped at 295 to eliminate right line) -->
      <polygon points="177,16 186,48 177,54 168,48" />
      <!-- Symmetrical armillary rings and celestial starburst -->
      <circle cx="177" cy="175" r="130" />
      <!-- Tightly fitted tilted orbital armillary band -->
      <ellipse cx="177" cy="177" rx="156" ry="46" transform="rotate(-13, 177, 177)" />
      <!-- Solid central black celestial sphere -->
      <circle cx="177" cy="175" r="86" />
    `;
  },

  art2: () => {
    return `
      <!-- Circular gold matrix die face -->
      <circle cx="106" cy="215" r="88" />
      <!-- Ferrule and black obsidian handle (100% solid, shadow sliced away) -->
      <path d="
        M 148 142
        C 165 125, 185 105, 212 48
        C 224 24, 256 18, 276 44
        C 292 64, 278 106, 242 136
        C 220 155, 198 170, 180 185
        Z
      " />
    `;
  },

  star4: () => {
    const points = [
      [153, 26], [179, 113], [238, 90], [219, 148],
      [296, 175], [221, 203], [236, 258], [177, 234],
      [153, 318], [121, 252], [64, 264], [80, 205],
      [8, 175], [73, 142], [66, 88], [120, 96]
    ];
    const pts = points.map(p => p.join(",")).join(" ");
    return `
      <!-- Tight 8-pointed star polygon (x capped at 296, zero right border line) -->
      <polygon points="${pts}" />
      <!-- Solid central black diamond gem -->
      <circle cx="153" cy="175" r="44" />
    `;
  },

  crown4: () => {
    return `
      <!-- Symmetrical crown peaks, spires, and shoulders -->
      <polygon points="
        175,36
        185,80
        205,120
        248,88
        272,120
        296,88
        332,128
        326,230
        316,290
        312,304
        48,304
        44,290
        32,230
        24,128
        64,88
        88,120
        105,88
        145,120
        165,80
      " />
      <!-- Solid base band -->
      <rect x="44" y="250" width="272" height="54" rx="4" />
      <!-- Solid obsidian crystal centers -->
      <polygon points="95,115 160,115 165,245 90,245" />
      <polygon points="185,115 255,115 260,245 185,245" />
    `;
  },

  art4: () => {
    return `
      <!-- Top cross finial (capped at x <= 265 to eliminate right line) -->
      <path d="
        M 242 66
        L 230 46
        L 238 40
        L 248 46
        L 254 26
        L 262 28
        L 260 48
        L 268 54
        L 264 62
        L 252 56
        L 248 68
        Z
      " />
      <!-- Ruby orb head -->
      <circle cx="221" cy="110" r="44" />
      <!-- Tight collar below ruby head -->
      <polygon points="
        168,136
        222,142
        210,166
        160,162
      " />
      <!-- Solid black obsidian shaft -->
      <polygon points="
        164,152
        198,174
        122,274
        88,252
      " />
      <!-- Lower gold ferrule & pommel tip -->
      <polygon points="
        88,252
        122,274
        96,324
        60,302
      " />
      <circle cx="76" cy="312" r="16" />
    `;
  }
};

async function processArtifact(id) {
  const srcPath = path.resolve(`public/artifacts/${id}.webp`);
  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    return;
  }

  const { data, info } = await sharp(srcPath).raw().toBuffer({ resolveWithObject: true });
  const maskFn = ARTIFACT_DEFS[id];
  if (!maskFn) {
    console.error(`No mask definition for ${id}`);
    return;
  }

  const innerSvg = maskFn(data);
  const maskSvg = `
    <svg width="360" height="360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="feather">
          <feGaussianBlur stdDeviation="0.75" />
        </filter>
      </defs>
      <g filter="url(#feather)" fill="white">
        ${innerSvg}
      </g>
    </svg>
  `;

  const maskBuffer = await sharp(Buffer.from(maskSvg))
    .resize(360, 360)
    .toColourspace("b-w")
    .raw()
    .toBuffer();

  const out = Buffer.alloc(360 * 360 * 4);
  for (let i = 0; i < 360 * 360; i++) {
    const m = maskBuffer[i]; // 0 to 255 with 1.5px anti-aliased edge
    out[i*4 + 0] = data[i*4 + 0];
    out[i*4 + 1] = data[i*4 + 1];
    out[i*4 + 2] = data[i*4 + 2];
    out[i*4 + 3] = m;
  }

  // Save to public/artifacts/{id}.webp and artifacts/{id}.webp
  const targetPublic = path.resolve(`public/artifacts/${id}.webp`);
  const targetRoot = path.resolve(`artifacts/${id}.webp`);

  const webpBuffer = await sharp(out, { raw: { width: 360, height: 360, channels: 4 } })
    .webp({ quality: 95, lossless: true })
    .toBuffer();

  fs.writeFileSync(targetPublic, webpBuffer);
  fs.writeFileSync(targetRoot, webpBuffer);

  console.log(`Refined & masked: ${id}.webp (public & root)`);
}

async function main() {
  const ids = [
    "star1", "aura1", "ring1", "crown1",
    "ring2", "art1", "ring3", "aura4",
    "art2", "star4", "crown4", "art4"
  ];

  for (const id of ids) {
    await processArtifact(id);
  }
  console.log("All 12 WebP collectibles successfully refined!");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

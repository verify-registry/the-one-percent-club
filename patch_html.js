const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newBtn = `        <button class="icon-btn shield-btn luxury-medallion-btn" type="button" aria-label="Registry">
          <div class="medallion-rim">
            <div class="medallion-core">
              <svg viewBox="0 0 24 24" class="medallion-symbol">
                <defs>
                  <linearGradient id="medShieldDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#E6C27A" />
                    <stop offset="50%" stop-color="#8F6826" />
                    <stop offset="100%" stop-color="#3A2408" />
                  </linearGradient>
                  <linearGradient id="medShieldEdgeDark" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#FFF8E7" />
                    <stop offset="50%" stop-color="#8F6826" />
                    <stop offset="100%" stop-color="#3A2408" />
                  </linearGradient>
                  <linearGradient id="medShieldLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#D4AF37" />
                    <stop offset="50%" stop-color="#A67C33" />
                    <stop offset="100%" stop-color="#5A4012" />
                  </linearGradient>
                  <linearGradient id="medShieldEdgeLight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="50%" stop-color="#A67C33" />
                    <stop offset="100%" stop-color="#3A2408" />
                  </linearGradient>
                </defs>
                <path d="M12 2.5L18.5 5.5V11.5C18.5 15.5 16 19 12 20.5C8 19 5.5 15.5 5.5 11.5V5.5L12 2.5Z" class="medallion-shield-base" />
                <path d="M9.5 11L11.5 13L15 9" class="medallion-shield-check" />
              </svg>
            </div>
          </div>
        </button>`;

// Replace the old button block
const regex = /<button class="icon-btn shield-btn".*?<\/button>/s;
html = html.replace(regex, newBtn);

fs.writeFileSync('index.html', html);

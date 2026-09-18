const fs = require('fs');
let code = fs.readFileSync('style.css', 'utf8');

code = code.replace('.profile-collection-skeleton .skeleton-icon-round { width: 60px; height: 60px; border-radius: 50%; margin: 10px 0 6px; }', 
'.profile-collection-skeleton .skeleton-icon-round { width: 70px; height: 70px; border-radius: 50%; margin: 10px auto 6px; }');

code = code.replace('.profile-achievement-skeleton .skeleton-icon-small { width: 40px; height: 40px; border-radius: 50%; margin-bottom: 8px; }', 
'.profile-achievement-skeleton .skeleton-icon-small { width: 42px; height: 42px; border-radius: 50%; margin-bottom: 12px; }');

code = code.replace('.profile-achievement-skeleton .skeleton-progress-wrap { width: 100%; height: 16px; border-radius: 4px; }', 
'.profile-achievement-skeleton .skeleton-progress-wrap { width: 100%; height: 16px; border-radius: 4px; margin-top: auto; }');

code = code.replace('.boutique-skeleton .skeleton-button { width: 100%; height: 32px; border-radius: 8px; }', 
'.boutique-skeleton .skeleton-button { width: 100%; height: 26px; border-radius: 8px; margin-top: 6px; }');

code = code.replace('.boutique-skeleton .skeleton-progress { width: 100%; height: 4px; border-radius: 2px; margin-bottom: 8px; }', 
'.boutique-skeleton .skeleton-progress { width: 90%; height: 2.5px; border-radius: 2px; margin: 8px auto 12px; }');

fs.writeFileSync('style.css', code);

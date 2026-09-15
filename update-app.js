const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const themeLogic = `
  // --- Theme Mode Logic ---
  const savedTheme = localStorage.getItem("app_theme") || "dark";
  const themeToggle = document.getElementById("themeToggle");
  const themeDesc = document.getElementById("themeDesc");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeToggle) themeToggle.checked = true;
    if (themeDesc) {
      themeDesc.setAttribute("data-i18n", "settings.theme_light");
      themeDesc.textContent = window.t("settings.theme_light", currentLang);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", (e) => {
      const isLight = e.target.checked;
      if (isLight) {
        document.body.classList.add("light-mode");
        localStorage.setItem("app_theme", "light");
        if (themeDesc) {
          themeDesc.setAttribute("data-i18n", "settings.theme_light");
          themeDesc.textContent = window.t("settings.theme_light", currentLang);
        }
      } else {
        document.body.classList.remove("light-mode");
        localStorage.setItem("app_theme", "dark");
        if (themeDesc) {
          themeDesc.setAttribute("data-i18n", "settings.theme_dark");
          themeDesc.textContent = window.t("settings.theme_dark", currentLang);
        }
      }
      
      // trigger resize event so that Guilloche canvas redraws if needed
      window.dispatchEvent(new Event("resize"));
    });
  }
`;

// Insert it right after the language logic
code = code.replace(/window\.setLanguage\(currentLang\);/, 'window.setLanguage(currentLang);\n' + themeLogic);
fs.writeFileSync('app.js', code);

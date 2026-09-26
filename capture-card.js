// puppeteer stripped per AI Studio migration constraints (no headless chrome container)
// const puppeteer = require("puppeteer-core");
const fs = require("fs");

async function capture() {
  console.log("Capture card utility: puppeteer is stripped in this environment.");
}

capture().catch(err => {
  console.error("Error capturing card:", err);
  process.exit(1);
});

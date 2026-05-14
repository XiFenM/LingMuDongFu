import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3001/";
const out = process.argv[3] ?? "/tmp/snap.png";
const viewportW = parseInt(process.argv[4] ?? "1440", 10);
const viewportH = parseInt(process.argv[5] ?? "900", 10);
const fullPage = (process.argv[6] ?? "1") === "1";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: viewportW, height: viewportH },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
// suppress Next.js dev indicator
await page.addInitScript(() => {
  const style = document.createElement("style");
  style.textContent = `nextjs-portal, [data-nextjs-toast], #__next-build-watcher{display:none!important}`;
  (document.head ?? document.documentElement).appendChild(style);
});
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts ? document.fonts.ready : null);
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage });
await browser.close();
console.log("saved", out);

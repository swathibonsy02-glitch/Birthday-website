const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) =>
    console.log("BROWSER_CONSOLE:", msg.type(), msg.text())
  );
  page.on("pageerror", (err) => console.log("PAGE_ERROR:", err.toString()));

  await page.goto("http://127.0.0.1:4175/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(5000);

  const title = await page.title();
  const bodyText = await page.locator("body").innerText();
  const rootText = await page.locator("#root").innerText();

  console.log("TITLE:", title);
  console.log("BODY_TEXT_LEN:", bodyText.length);
  console.log("ROOT_TEXT_SNIPPET:", rootText.slice(0, 500));

  await browser.close();
})();

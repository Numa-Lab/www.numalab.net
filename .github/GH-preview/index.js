const { chromium } = require('playwright');
console.log(__dirname);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + __dirname + "/index.html");//GitHub actionsのときファイル移動するから注意！ "/../../_site/index.html""/_site/index.html"
  await page.setViewportSize({
    width: 1920,
    height: 1080
  })
  await page.evaluate(async () => {
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i);
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(5000);
  await page.screenshot({ path: __dirname + '/result.jpg', fullPage: true });
  await browser.close();
})()

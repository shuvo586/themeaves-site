// Screenshots a design file or a running route at every gate width, both themes.
//   node tools/shot.cjs design/home.html [slug]
//   node tools/shot.cjs http://localhost:3000/_dev/brand brand
const { chromium } = require('./pw');
const path = require('path');
const fs = require('fs');

const FILE = process.argv[2] || 'design/home.html';
const IS_URL = /^https?:\/\//.test(FILE);
const SLUG = process.argv[3] || path.basename(FILE, path.extname(FILE)) || 'route';
const WIDTHS = [1440, 1024, 768, 390];
const OUT = path.join(__dirname, '..', 'shots');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const url = IS_URL ? FILE : 'file://' + path.resolve(FILE);

  for (const theme of ['light', 'dark']) {
    for (const w of WIDTHS) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      await page.goto(url);
      if (theme === 'dark') {
        await page.evaluate(() => document.documentElement.classList.add('dark'));
      }
      await page.waitForTimeout(1200);
      const h = await page.evaluate(() => document.body.scrollHeight);

      // tile into viewport-height slices so nothing is scaled away
      let i = 0;
      for (let y = 0; y < h; y += 900) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(250);
        await page.screenshot({ path: `${OUT}/${SLUG}-${theme}-${w}-${String(i).padStart(2, '0')}.png` });
        if (++i > 14) break;
      }
      console.log(`${SLUG} ${theme} ${w}px  height ${h}  slices ${i}`);
      await page.close();
    }
  }
  await browser.close();
})();

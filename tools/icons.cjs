// Rasterises the brand SVGs into the shipped icon set, then packs favicon.ico.
//
//   node tools/icons.cjs
//
// Source of truth is site/public/brand/favicon.svg. Never edit a PNG by hand:
// re-run this and the whole set moves together. Rendering happens in the same
// engine that will render the site, at the exact target size rather than by
// downscaling a large bitmap, so 16px gets the browser's own hinting instead
// of a blurred 512.
const { chromium } = require('./pw');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const BRAND = path.join(ROOT, 'site', 'public', 'brand');

// [source svg, output name, size]
const TARGETS = [
  ['favicon.svg', 'favicon-16.png', 16],
  ['favicon.svg', 'favicon-32.png', 32],
  ['favicon.svg', 'favicon-48.png', 48],
  ['favicon.svg', 'apple-touch-icon.png', 180],
  ['favicon.svg', 'icon-192.png', 192],
  ['favicon.svg', 'icon-512.png', 512],
  ['icon-maskable.svg', 'icon-maskable-512.png', 512],
];

// The .ico carries these three. Windows still reaches for it, and Safari uses
// it for pinned tabs, so it is not dead weight yet.
const ICO_SIZES = [16, 32, 48];

function packIco(pngs) {
  // ICONDIR, then one ICONDIRENTRY per image, then the PNG payloads whole.
  // PNG-in-ICO is understood by every browser and by Windows from Vista on,
  // which is well below anything this site targets.
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);          // reserved
  header.writeUInt16LE(1, 2);          // 1 = icon
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + pngs.length * 16;

  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);                      // palette count, 0 for truecolour
    e.writeUInt8(0, 3);                      // reserved
    e.writeUInt16LE(1, 4);                   // colour planes
    e.writeUInt16LE(32, 6);                  // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

(async () => {
  const browser = await chromium.launch();
  const written = [];

  for (const [src, out, size] of TARGETS) {
    const svg = fs.readFileSync(path.join(BRAND, src), 'utf8');
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<!doctype html><meta charset="utf-8">` +
      `<style>html,body{margin:0;padding:0;background:transparent}` +
      `svg{display:block;width:${size}px;height:${size}px}</style>` +
      svg,
    );
    await page.waitForTimeout(120);
    const data = await page.screenshot({ omitBackground: true });
    fs.writeFileSync(path.join(BRAND, out), data);
    written.push({ out, size, bytes: data.length });
    if (ICO_SIZES.includes(size) && src === 'favicon.svg') {
      written.ico = written.ico || [];
      written.ico.push({ size, data });
    }
    await page.close();
  }

  const ico = packIco(written.ico);
  fs.writeFileSync(path.join(BRAND, 'favicon.ico'), ico);

  for (const w of written) {
    console.log(`${String(w.size).padStart(3)}px  ${w.out.padEnd(24)} ${String(w.bytes).padStart(7)} bytes`);
  }
  console.log(`     favicon.ico              ${String(ico.length).padStart(7)} bytes  (${ICO_SIZES.join(', ')})`);

  await browser.close();
})();

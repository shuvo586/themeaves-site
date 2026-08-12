// Gates the homepage against the measurable rules in docs/CORRECTION-V2.md.
// Exits non-zero on any failure.
//   node tools/verify-home.cjs [design/home.html]
const { chromium } = require('./pw');
const path = require('path');

const FILE = process.argv[2] || 'design/home.html';

const HUE = {
  '251,209,1': 'sun', '255,222,61': 'sun', '122,99,0': 'sun',
  '51,191,179': 'tide', '71,214,201': 'tide', '20,131,123': 'tide',
  '253,71,23': 'flare', '255,106,61': 'flare', '213,53,12': 'flare',
};
const PLANES = ['251,209,1', '51,191,179', '253,71,23', '213,53,12'];
const CTA_BG = '213,53,12'; // --flare-deep
const INK = '36,61,89';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('file://' + path.resolve(FILE));
  await page.waitForTimeout(1500);

  const r = await page.evaluate(({ HUE, PLANES, CTA_BG, INK }) => {
    const rgb = (c) => (c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/) || []).slice(1).join(',');
    const lum = (s) => {
      const v = s.split(',').map((n) => +n / 255)
        .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
      return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
    };
    const ratio = (a, b) => {
      const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
      return +(((x + 0.05) / (y + 0.05)).toFixed(2));
    };

    // B6 is "15% of the VIEWPORT at 1440x900", measured on the single biggest
    // plane element - not a share of the whole scroll height.
    const viewport = 1440 * 900;
    let biggestPlane = 0, flareBleed = 0, centred = 0;
    const centredEls = [];
    let ctaH = 0, ctaFill = 0, ctaGlow = 0;

    for (const el of document.querySelectorAll('*')) {
      const bx = el.getBoundingClientRect(), st = getComputedStyle(el);
      if (!bx.width || !bx.height) continue;
      const bg = rgb(st.backgroundColor);
      if (PLANES.includes(bg)) biggestPlane = Math.max(biggestPlane, bx.width * bx.height);
      if (st.textAlign === 'center' && el.textContent.trim().length > 3) {
        centred++;
        if (centredEls.length < 6) {
          centredEls.push(`<${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 40)}"`);
        }
      }

      if (bg === CTA_BG && bx.width >= window.innerWidth * 0.98) {
        flareBleed++;
        ctaH = Math.round(bx.height);
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (const c of el.querySelectorAll('*')) {
          const r2 = c.getBoundingClientRect();
          if (!r2.width || !r2.height) continue;
          x0 = Math.min(x0, r2.left); y0 = Math.min(y0, r2.top);
          x1 = Math.max(x1, r2.right); y1 = Math.max(y1, r2.bottom);
        }
        if (x1 > x0) ctaFill = +((((x1 - x0) * (y1 - y0)) / (bx.width * bx.height)) * 100).toFixed(1);
        for (const c of [el, ...el.querySelectorAll('*')]) {
          const s2 = getComputedStyle(c);
          if (/blur|radial-gradient/.test(s2.backgroundImage) || /blur/.test(s2.filter || '')) ctaGlow++;
        }
      }
    }

    // B11 - colour events and hue variety per section
    const secs = [...document.querySelectorAll('section')];
    let events = 0, triHue = 0;
    const perSection = [];
    for (const s of secs) {
      const hues = new Set();
      let n = 0;
      for (const el of s.querySelectorAll('*')) {
        const bx = el.getBoundingClientRect(), st = getComputedStyle(el);
        if (!bx.width || !bx.height) continue;
        for (const prop of ['backgroundColor', 'borderTopColor', 'borderLeftColor', 'color']) {
          if (prop === 'color' && el.children.length) continue;
          const h = HUE[rgb(st[prop])];
          if (h) { n++; hues.add(h); break; }
        }
      }
      events += n;
      if (hues.size >= 3) triHue++;
      perSection.push({ events: n, hues: [...hues].join('+') || '-' });
    }

    // contrast of text sitting on the CTA plane
    let worstCta = 21;
    const band = secs.find((s) => rgb(getComputedStyle(s).backgroundColor) === CTA_BG);
    if (band) {
      for (const el of band.querySelectorAll('*')) {
        if (el.children.length || !el.textContent.trim()) continue;
        worstCta = Math.min(worstCta, ratio(rgb(getComputedStyle(el).color), CTA_BG));
      }
    }

    const last = secs[secs.length - 1];
    return {
      biggestPlaneVsViewportPct: +((biggestPlane / viewport) * 100).toFixed(1),
      flareBleed, centred, centredEls, events, triHue, perSection,
      ctaHeight: ctaH, ctaFillPct: ctaFill, ctaGlow,
      ctaWorstContrast: worstCta === 21 ? null : worstCta,
      inkAboveFooter: last ? rgb(getComputedStyle(last).backgroundColor) === INK : false,
      sections: secs.length,
    };
  }, { HUE, PLANES, CTA_BG, INK });

  const fail = [];
  const check = (cond, msg) => { if (cond) fail.push(msg); };

  check(r.biggestPlaneVsViewportPct < 15,
    `B6  biggest plane = ${r.biggestPlaneVsViewportPct}% of a 1440x900 viewport (need >=15%)`);
  check(r.flareBleed !== 1, `B2  full-bleed --flare-deep planes = ${r.flareBleed} (need exactly 1)`);
  check(r.centred > 0, `B7  centred elements = ${r.centred} (need 0)`);
  check(r.inkAboveFooter, 'B2  section above footer is --ink');
  check(r.sections !== 8, `C   section count = ${r.sections} (need 8)`);
  check(r.events > 6, `B11 colour events = ${r.events} (need <=6)`);
  check(r.triHue > 0, `B11 sections showing 3 hues = ${r.triHue} (need 0)`);
  check(r.ctaHeight && (r.ctaHeight < 320 || r.ctaHeight > 460),
    `CTA band height ${r.ctaHeight}px (need 380-440, hard 320-460)`);
  // The height cap is the real guard against the 660px-void failure; this is only a
  // sanity floor, so it must not push the layout into filling space it does not need.
  check(r.ctaFillPct && r.ctaFillPct < 25,
    `CTA content fills ${r.ctaFillPct}% of its band (need >=25%, no giant void)`);
  check(r.ctaGlow > 0, `CTA plane has ${r.ctaGlow} blurred/glow layers (need 0)`);
  check(r.ctaWorstContrast !== null && r.ctaWorstContrast < 4.5,
    `CTA text contrast ${r.ctaWorstContrast}:1 (need >=4.5, white on --flare-deep)`);

  console.log(JSON.stringify(r, null, 2));
  console.log('');
  console.log(fail.length ? 'FAIL\n- ' + fail.join('\n- ') : 'PASS');
  await browser.close();
  process.exit(fail.length ? 1 : 0);
})();

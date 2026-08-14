#!/usr/bin/env node
/**
 * Contrast audit.
 *
 * Loads every route in both themes and measures the pairs the design system
 * actually holds, from the RESOLVED custom properties on the element that owns
 * them. It reads the page, not the stylesheet, so a product theme that
 * reassigns a role is measured in its own scope.
 *
 * It exists because of a bug it would have caught on the day it was written:
 * `.theme-slotdesk` pinned `--color-code-plane` to spruce and named
 * `var(--sd-canvas)` as its text partner. `--sd-canvas` flips in dark and
 * spruce does not, so every command block in every SlotDesk chapter rendered at
 * 1.24:1 in dark and nobody saw it for weeks. Screenshots did not catch it
 * because the page looked deliberate; the build did not catch it because
 * nothing was invalid.
 *
 * THE RULE IT ENFORCES: a pinned pair may only name primitives that never flip,
 * or literals. If one half of a pair flips with the theme and the other does
 * not, the pair is broken in exactly one theme.
 *
 *   node tools/contrast.cjs [baseUrl]
 *
 * Exits non-zero if any held pair fails, so it can gate a release.
 */

const { chromium } = require('./pw.js');

const BASE = process.argv[2] || 'http://localhost:3210';

const ROUTES = [
  '/',
  '/products',
  '/products/slotdesk-ai',
  '/products/aonomy',
  '/demos',
  '/docs',
  '/docs/slotdesk',
  '/docs/slotdesk/before-you-start',
  '/docs/slotdesk/install',
  '/docs/slotdesk/cron-and-queue',
  '/docs/slotdesk/panels',
  '/docs/slotdesk/whatsapp-cloud-api',
  '/docs/slotdesk/templates-and-the-24-hour-window',
  '/docs/slotdesk/ai-receptionist',
  '/docs/slotdesk/guardrails-and-knowledge',
  '/docs/slotdesk/payments',
  '/support',
  '/license',
  '/licenses',
];

/* Pairs the system holds, as [text role, background role, minimum].
   4.5 is AA for body text. 3.0 is 1.4.11 for anything bounding a control. */
const PAIRS = [
  ['--color-ink', '--color-bg', 4.5],
  ['--color-ink', '--color-surface', 4.5],
  ['--color-muted', '--color-bg', 4.5],
  ['--color-muted', '--color-surface', 4.5],
  ['--color-accent', '--color-bg', 4.5],
  ['--color-accent', '--color-surface', 4.5],
  ['--color-on-accent', '--color-accent-plane', 4.5],
  ['--color-ring-on-accent', '--color-accent-plane', 3.0],
  ['--color-on-code', '--color-code-plane', 4.5],
  ['--color-line-strong', '--color-bg', 3.0],
  ['--color-line-strong', '--color-surface', 3.0],
  ['--color-ring', '--color-bg', 3.0],
];

/* Scopes to measure in. A product theme reassigns the roles, so it has to be
   measured on its own element rather than on :root. */
const SCOPES = [
  ['page', ':root'],
  ['theme-slotdesk', '.theme-slotdesk'],
];

async function audit(page, theme) {
  return page.evaluate(
    ({ pairs, scopes }) => {
      const probe = document.createElement('div');
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      document.body.appendChild(probe);

      const used = (host, expr) => {
        host.appendChild(probe);
        probe.style.color = '';
        probe.style.color = expr;
        return getComputedStyle(probe).color;
      };

      const lum = (c) => {
        const m = c.match(/[\d.]+/g);
        if (!m) return null;
        const [r, g, b] = m.slice(0, 3).map(Number).map((v) => {
          const s = v / 255;
          return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };

      const out = [];
      for (const [scopeName, sel] of scopes) {
        const host = document.querySelector(sel);
        if (!host || host === document.documentElement) {
          if (sel !== ':root') continue;
        }
        const el = sel === ':root' ? document.body : host;
        if (!el) continue;

        for (const [fg, bg, min] of pairs) {
          const a = lum(used(el, `var(${fg})`));
          const b = lum(used(el, `var(${bg})`));
          if (a === null || b === null) continue;
          const [hi, lo] = a > b ? [a, b] : [b, a];
          const ratio = (hi + 0.05) / (lo + 0.05);
          out.push({ scope: scopeName, fg, bg, min, ratio: Number(ratio.toFixed(2)) });
        }
      }
      probe.remove();
      return out;
    },
    { pairs: PAIRS, scopes: SCOPES },
  );
}

(async () => {
  const browser = await chromium.launch();
  const failures = [];
  let checked = 0;

  for (const route of ROUTES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    let ok = true;
    try {
      const res = await page.goto(BASE + route, { waitUntil: 'load' });
      if (!res || res.status() >= 400) ok = false;
    } catch {
      ok = false;
    }
    if (!ok) {
      console.log(`  SKIP  ${route} (did not load)`);
      await page.close();
      continue;
    }

    for (const theme of ['light', 'dark']) {
      await page.evaluate((t) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(t);
      }, theme);
      await page.waitForTimeout(120);

      for (const row of await audit(page, theme)) {
        checked++;
        if (row.ratio < row.min) {
          failures.push({ route, theme, ...row });
        }
      }
    }
    await page.close();
  }

  await browser.close();

  console.log(`\n${checked} held pairs measured across ${ROUTES.length} routes, both themes.`);

  if (failures.length === 0) {
    console.log('All pass.\n');
    process.exit(0);
  }

  console.log(`\n${failures.length} FAILING:\n`);
  for (const f of failures) {
    console.log(
      `  ${String(f.ratio).padStart(6)} : 1  (needs ${f.min})  ${f.theme.padEnd(5)} ` +
        `${f.scope.padEnd(15)} ${f.fg} on ${f.bg}   ${f.route}`,
    );
  }
  console.log('');
  process.exit(1);
})();

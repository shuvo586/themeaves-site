#!/usr/bin/env node
/**
 * Internal link and image audit.
 *
 * Crawls every route, collects every internal href and every <img>, and checks
 * each one actually resolves. Reports dead links, broken images, and empty
 * hrefs.
 *
 * It exists because prose links are not type-checked. `typedRoutes` turns a
 * bad <Link> into a compile error, but a markdown chapter is rendered to plain
 * <a> tags at build time, so a link to a chapter that is listed-but-unpublished
 * compiles cleanly and 404s for the reader. That shipped once, in the panels
 * chapter, pointing at /docs/slotdesk/staff-and-team.
 *
 * Same for figures: a chapter can reference /docs/slotdesk/foo.png that was
 * never captured, and nothing fails until someone loads the page.
 *
 *   node tools/links.cjs [baseUrl]
 *
 * Exits non-zero if anything is dead, so it can gate a release.
 */

const { chromium } = require('./pw.js');

const BASE = process.argv[2] || 'http://localhost:3210';

const ROUTES = [
  '/',
  '/products',
  '/products/slotdesk',
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
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const checked = new Map(); // url -> status
  const dead = [];
  const brokenImages = [];
  const emptyHrefs = [];
  let linkCount = 0;
  let imageCount = 0;

  const statusOf = async (url) => {
    if (checked.has(url)) return checked.get(url);
    let status = 0;
    try {
      const res = await page.request.fetch(url, { failOnStatusCode: false });
      status = res.status();
    } catch {
      status = 0;
    }
    checked.set(url, status);
    return status;
  };

  for (const route of ROUTES) {
    let res;
    try {
      // networkidle, not load: /products renders its facet list client-side, so
      // sampling at `load` caught a different DOM on each run and the counts
      // drifted. An audit whose numbers move on their own teaches nothing.
      res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
    } catch {
      res = null;
    }
    if (!res || res.status() >= 400) {
      dead.push({ from: '(route list)', href: route, status: res ? res.status() : 0 });
      continue;
    }

    const found = await page.evaluate(() => {
      const links = [...document.querySelectorAll('a[href]')]
        .map((a) => ({ href: a.getAttribute('href'), text: a.textContent.trim().slice(0, 40) }));
      // Collect srcs only. Whether the browser had finished decoding them by
      // the time we looked is a race, and an audit that reports 8 failures on
      // one run and 0 on the next is worse than no audit. Each src is fetched
      // below instead, which is deterministic.
      const imgs = [...document.images].map((i) => i.getAttribute('src')).filter(Boolean);
      return { links, imgs };
    });

    for (const src of found.imgs) {
      imageCount++;
      if (/^(https?:|data:)/i.test(src)) continue;
      const target = src.startsWith('/') ? BASE + src : `${BASE}${route}/${src}`;
      const status = await statusOf(target);
      if (status >= 400 || status === 0) {
        brokenImages.push({ from: route, src, status });
      }
    }

    for (const link of found.links) {
      const href = link.href;
      if (href === null || href.trim() === '') {
        emptyHrefs.push({ from: route, text: link.text });
        continue;
      }
      // Skip anything that leaves the site or is not a navigation.
      if (/^(https?:|mailto:|tel:|#)/i.test(href)) continue;
      if (!href.startsWith('/')) continue;

      linkCount++;
      const target = BASE + href.split('#')[0];
      const status = await statusOf(target);
      if (status >= 400 || status === 0) {
        dead.push({ from: route, href, text: link.text, status });
      }
    }
  }

  await browser.close();

  console.log(
    `\n${linkCount} internal links and ${imageCount} images checked across ${ROUTES.length} routes.`,
  );

  const problems = dead.length + brokenImages.length + emptyHrefs.length;
  if (problems === 0) {
    console.log('All resolve.\n');
    process.exit(0);
  }

  if (dead.length) {
    console.log(`\n${dead.length} DEAD LINK(S):\n`);
    for (const d of dead) {
      console.log(`  ${String(d.status).padStart(3)}  ${d.href}   on ${d.from}   "${d.text ?? ''}"`);
    }
  }
  if (brokenImages.length) {
    console.log(`\n${brokenImages.length} BROKEN IMAGE(S):\n`);
    for (const b of brokenImages) {
      console.log(`  ${String(b.status).padStart(3)}  ${b.src}   on ${b.from}`);
    }
  }
  if (emptyHrefs.length) {
    console.log(`\n${emptyHrefs.length} EMPTY HREF(S):\n`);
    for (const e of emptyHrefs) console.log(`  "${e.text}"   on ${e.from}`);
  }
  console.log('');
  process.exit(1);
})();

// Gates /changelog and /changelog/<slug> against the measurable rules of the
// handoff prototype (_dev/handoff/directions-preference/project/ThemeAves
// Changelog.dc.html), in both themes at the widest and narrowest gates.
// Exits non-zero on any failure.
//   node tools/verify-changelog.cjs http://localhost:3210
const { chromium } = require('./pw');

const BASE = process.argv[2] || 'http://localhost:3210';
const ROUTES = ['/changelog', '/changelog/aonomy', '/changelog/slotdesk'];
const WIDTHS = [1440, 390];

// resolved token values, keyed by theme
const THEMES = {
  light: {
    accent: '36,61,89',      // --bp-signal
    accentPlane: '36,61,89', // pinned
    muted: '90,100,114',     // --bp-slate
    ink: '20,24,31',         // --bp-ink
    surface: '255,255,255',  // --bp-white
    bg: '244,245,247',       // --bp-paper
    lineFaint: '230,231,234', // --bp-line-light-0
    lineStrong: '118,125,137',
    onAccent: '255,255,255',
  },
  dark: {
    accent: '117,156,199',   // --bp-signal-lift
    accentPlane: '36,61,89', // pinned, same in both themes
    muted: '151,160,174',    // --bp-ash
    ink: '232,235,240',      // --bp-chalk
    surface: '20,25,34',     // --bp-panel
    bg: '12,15,20',          // --bp-void
    lineFaint: '28,34,44',   // --bp-line-dark-0
    lineStrong: '96,106,121',
    onAccent: '255,255,255',
  },
};

const NUM = (c) => (c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/) || []).slice(1).join(',');

(async () => {
  const browser = await chromium.launch();
  const fail = [];
  const check = (cond, msg) => { if (!cond) fail.push(msg); };

  for (const theme of ['light', 'dark']) {
    const T = THEMES[theme];
    for (const width of WIDTHS) {
      for (const route of ROUTES) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        await page.goto(BASE + route);
        if (theme === 'dark') {
          await page.evaluate(() => document.documentElement.classList.add('dark'));
        }
        await page.waitForTimeout(1400);

        const r = await page.evaluate(() => {
          const num = (c) => (c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/) || []).slice(1).join(',');
          const g = (el, p) => getComputedStyle(el)[p];
          const bg = (el) => num(g(el, 'backgroundColor'));
          const fg = (el) => num(g(el, 'color'));
          const lum = (s) => {
            const v = s.split(',').map((n) => +n / 255)
              .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
            return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
          };
          const ratio = (a, b) => {
            const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
            return +(((x + 0.05) / (y + 0.05)).toFixed(2));
          };
          const out = {
            noScroll:
              document.documentElement.scrollWidth <= document.documentElement.clientWidth,
            h1: document.querySelectorAll('h1').length,
          };

          const railLeft = document.querySelector('.rail > :first-child');
          if (railLeft) out.railLeft = railLeft.textContent.trim();

          const entry = document.querySelector('article');
          if (entry) {
            const first = entry.firstElementChild;
            out.versionFont = `${g(first.firstElementChild, 'fontFamily').split(',')[0].replace(/['"]/g, '')}|${g(first.firstElementChild, 'fontSize')}|${g(first.firstElementChild, 'fontWeight')}`;
            out.versionColor = fg(first.firstElementChild);
            out.dateColor = fg(first.firstElementChild.nextElementSibling);
            out.chipFont = `${g(first.lastElementChild, 'fontFamily').split(',')[0].replace(/['"]/g, '')}|${g(first.lastElementChild, 'fontSize')}|${g(first.lastElementChild, 'textTransform')}`;
            out.chipColor = fg(first.lastElementChild);
            out.chipBorder = num(g(first.lastElementChild, 'borderTopColor'));
            out.gridCols = g(entry, 'gridTemplateColumns').split(' ')[0];
            out.entryPadTop = g(entry.parentElement, 'paddingTop');
            const li = document.querySelector('article ul li');
            if (li) out.changesCols = g(li, 'gridTemplateColumns').split(' ')[0];
            out.entryCount = document.querySelectorAll('article').length;
          }
          const lis = [...document.querySelectorAll('article')].map((a) => a.parentElement);
          if (lis.length > 1) {
            out.sepWidth = g(lis[1], 'borderTopWidth');
            out.sepColor = num(g(lis[1], 'borderTopColor'));
            out.firstSepWidth = g(lis[0], 'borderTopWidth');
            out.lastPadBottom = g(lis[lis.length - 1], 'paddingBottom');
          }
          const h1 = document.querySelector('h1');
          if (h1) {
            out.h1MarginTop = g(h1, 'marginTop');
            const lead = h1.nextElementSibling;
            if (lead) out.leadMarginTop = g(lead, 'marginTop');
            const chipsRow = [...document.querySelectorAll('button')].find(
              (b) => b.textContent.trim() === 'All',
            )?.parentElement;
            if (chipsRow && lead) {
              out.chipsGap = Math.round(
                chipsRow.getBoundingClientRect().top - lead.getBoundingClientRect().bottom,
              );
            }
          }
          const band = document.querySelector('section.border-y');
          if (band) out.bandBg = bg(band);

          const chipAll = [...document.querySelectorAll('button')].find(
            (b) => b.textContent.trim() === 'All',
          );
          if (chipAll) {
            out.chipAllBg = bg(chipAll);
            out.chipAllColor = fg(chipAll);
            out.chipFontSize = g(chipAll, 'fontSize');
          }

          const countLabel = document.querySelector('button + p.label');
          if (countLabel) out.count = countLabel.textContent.replace(/\s+/g, ' ').trim();

          const plane = document.querySelector('[data-on-accent]');
          if (plane) {
            out.ctaBg = bg(plane);
            out.ctaH2 = g(plane.querySelector('h2'), 'fontSize');
            let worst = 21;
            for (const el of [...plane.querySelectorAll('*')]) {
              if (el.children.length || !el.textContent.trim()) continue;
              worst = Math.min(worst, ratio(fg(el), bg(plane)));
            }
            out.ctaWorst = worst === 21 ? null : worst;
            const btn = plane.querySelector('a');
            if (btn) out.ctaBtn = `${bg(btn)}|${fg(btn)}`;
          }
          return out;
        });

        const tag = `${route} ${theme} ${width}px`;

        check(r.noScroll, `${tag} horizontal scroll`);
        check(r.h1 === 1, `${tag} h1 count = ${r.h1}`);

        if (route === '/changelog/aonomy') {
          check(r.railLeft && r.railLeft.toUpperCase().includes('CHANGELOG · AONOMY'),
            `${tag} rail left = "${r.railLeft}"`);
          check(r.gridCols === (width === 1440 ? '220px' : '342px'),
            `${tag} entry grid first col = ${r.gridCols} (need ${width === 1440 ? '220px' : 'single stacked track'})`);
          check(r.versionColor === T.accent, `${tag} version colour = ${r.versionColor} (need accent)`);
          check(r.dateColor === T.muted, `${tag} date colour = ${r.dateColor} (need muted)`);
          check(r.chipBorder === T.accent, `${tag} FEATURE chip border = ${r.chipBorder} (need accent)`);
          check(r.chipColor === T.accent, `${tag} FEATURE chip text = ${r.chipColor}`);
          check(r.chipFont === 'IBM Plex Mono|11px|uppercase',
            `${tag} FEATURE chip font = ${r.chipFont} (need mono 11px uppercase)`);
          check(r.entryPadTop === '40px',
            `${tag} first entry top padding = ${r.entryPadTop} (need 40px + the 8px ul lead-in)`);
          check(r.sepWidth === '1px' && r.sepColor === T.lineFaint,
            `${tag} entry separator = ${r.sepWidth} ${r.sepColor} (need 1px faint)`);
          check(r.firstSepWidth === '0px',
            `${tag} first entry has no top border = ${r.firstSepWidth}`);
          check(r.changesCols === '74px', `${tag} change row grid first col = ${r.changesCols} (need 74px)`);
          check(r.entryCount === 3, `${tag} entries = ${r.entryCount} (need 3)`);
          check(r.bandBg === T.surface, `${tag} band bg = ${r.bandBg} (need surface)`);
          if (width === 1440) {
            check(r.h1MarginTop === '18px', `${tag} h1 gap = ${r.h1MarginTop} (need 18px)`);
            check(r.leadMarginTop === '20px', `${tag} lead gap = ${r.leadMarginTop} (need 20px)`);
            check(r.chipsGap === 40, `${tag} chips row gap = ${r.chipsGap} (need 40px)`);
            check(r.chipAllBg === T.ink && r.chipAllColor === T.bg,
              `${tag} ALL chip = ${r.chipAllBg}/${r.chipAllColor} (need ink fill)`);
            check(r.chipFontSize === '12px', `${tag} chip font = ${r.chipFontSize}`);
            check(r.count && r.count.includes('3 of 3'), `${tag} count = "${r.count}"`);
          }
        } else if (route === '/changelog/slotdesk') {
          const panel = await page.evaluate(() =>
            [...document.querySelectorAll('h2')].some((h) => h.textContent === 'No releases to date.'));
          check(panel, `${tag} empty-state panel present`);
        } else {
          const rails = await page.evaluate(() =>
            [...document.querySelectorAll('.rail > :first-child')].map((el) => el.textContent.trim()));
          check(rails.some((t) => t.toUpperCase().includes('AONOMY')) &&
            rails.some((t) => t.toUpperCase().includes('SLOTDESK AI')),
            `${tag} rails = ${JSON.stringify(rails)}`);
          const linkOk = await page.evaluate(() => {
            const a = document.querySelector('.rail a[href="/changelog/aonomy"]');
            return !!a && a.textContent.includes('Aonomy');
          });
          check(linkOk, `${tag} rail links to /changelog/aonomy`);
        }

        if (r.ctaBg !== undefined) {
          check(r.ctaBg === T.accentPlane, `${tag} CTA plane = ${r.ctaBg} (need ${T.accentPlane})`);
          check(r.ctaWorst !== null && r.ctaWorst >= 4.5,
            `${tag} CTA text contrast = ${r.ctaWorst}:1 (need >=4.5)`);
          check(r.ctaH2 === (width === 1440 ? '36px' : '28px'),
            `${tag} CTA h2 = ${r.ctaH2} (need ${width === 1440 ? 36 : 28}px)`);
        }

        await page.close();
      }
    }
  }

  // the filter chips actually filter: FEATURE leaves 2 of 3, and the URL is linkable
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + '/changelog/aonomy?kind=feature');
    await page.waitForTimeout(1400);
    const n = await page.evaluate(() => document.querySelectorAll('article').length);
    const count = await page.evaluate(
      () => document.querySelector('button + p.label')?.textContent.replace(/\s+/g, ' ').trim());
    const pressed = await page.evaluate(() =>
      [...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-pressed') === 'true')?.textContent);
    check(n === 2, `?kind=feature shows ${n} entries (need 2)`);
    check(count && count.includes('2 of 3'), `?kind=feature count = "${count}" (need 2 of 3)`);
    check(pressed === 'Feature', `pressed chip = "${pressed}" (need Feature)`);
    await page.close();
  }

  await browser.close();
  console.log(fail.length ? 'FAIL\n- ' + fail.join('\n- ') : 'PASS');
  process.exit(fail.length ? 1 : 0);
})();
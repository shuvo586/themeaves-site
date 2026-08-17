# CLAUDE.md - ThemeAves

The ThemeAves brand site. **Read `site/docs/` first**: it is the reference manual for what is
actually built. `site/BUILD.md` is the chronological record of why, and is history rather than
current state.

**Not the SlotDesk repo.** ThemeAves is the author brand; SlotDesk is a product sold on it.

## Environment

- Lives at `/var/www/html/themeaves` in WSL. From Windows tooling reach it as
  `\\wsl.localhost\Ubuntu\var\www\html\themeaves`. The Git Bash tool cannot see WSL paths at all,
  so run node through `wsl -e bash -lc '...'` or use PowerShell against the UNC path.
- `site/` is a Next.js 16 app with its own `node_modules`. `npm install` there is expected.
- `tools/` runs on Playwright resolved out of `/var/www/html/codecanyon/node_modules` via
  `tools/pw.js`. Do not install Playwright at the project root; fix the resolve path instead.

## ⚠️ Treat every file here as irreplaceable

The originals were deleted from the codecanyon repo on 2026-08-11. Nothing in `docs/`, `_dev/` or
`brand/_source/` has a second copy. **Never delete, never `rm -rf` to "clean up", and never
overwrite one of those files in place.** Generated output under `site/public/brand/` and `shots/` is
the exception: it is reproducible and is meant to be overwritten by its tool.

## The one rule that matters

**Never call a UI change done without rendering it and looking at the image.**

```bash
cd site && npm run build
npx next start -p 3210                                  # the port the tooling assumes
node tools/shot.cjs http://localhost:3210/ home         # then OPEN shots/*.png and LOOK
```

`tools/shot.cjs` takes a file path or an http URL and shoots 1440 / 1024 / 768 / 390 in both themes.
`tools/icons.cjs` regenerates the icon set after any edit to `favicon.svg`.

Scripts catch what is countable. They cannot tell you a band is 660px tall with a void in it, that a
composition is dead, or that a label on a saturated plane is invisible **in one theme only**. Three
design rounds satisfied every written rule and were unusable on sight. A fourth shipped a 1.3:1
label that the build was happy with. Render it, open the PNG, judge it, in both themes.

## Source of truth, in order

1. **`site/src/`** - the code. If a document disagrees with it, the document is stale; fix the
   document.
2. **`site/docs/`** - the reference manual. Architecture, design system, components, recipes.
3. **`site/BUILD.md`** - why each decision was made, and what was tried and rejected.
4. `_dev/brainstorm/themeaves-site-design-prompt-v2-2026-08-11.md` - the brief. Still governs voice,
   the fact rules and accessibility. Its section 0 claim that no logo or brand identity exists is
   **false**, and the rest of it survives that correction intact.
5. `_dev/handoff/directions-preference/` - the round 4 design proposal. Direction **1a Blueprint**
   was chosen 2026-08-12. Read its `INDEX.md` before the bundle's own README, which is boilerplate
   and wrong in two specific ways.

### ⚠️ Superseded. Do not build from these

`docs/CORRECTION-V2.md` and `_dev/handoff/kit-icon-sizing/` are the **retired page system**, kept
only as history. Familjen Grotesk, the `--flare-deep` contrast law, the `<PlaneStripe>` rule and the
B1-B11 rules all belong to it. Do not apply them and do not import them into anything new.

**The mark's four hexes are not retired.** Prompt v2 put the visual system back on the table, and
what came out of that is a page palette of cool neutrals plus one accent **derived from the mark's
own navy**. The bird still ships in navy, sun, tide and flare, unchanged, in the chrome of every
page. What was retired is navy/sun/tide/flare as a *page* palette, not as the logo.

## Design system, direction 1a "Blueprint"

A precision engineering document you happen to buy software from. Structure is carried by a visible
grid and hairline rules. **No cards, no shadows, no gradients, no glow, nothing floating.**

- **Tokens live in `site/src/styles/tokens.css`** and are the contract. Never invent a hex, a radius
  or a shadow. There are no shadow tokens and that is deliberate: depth is a 1px line and a one-step
  surface tint. A component that seems to need a shadow is wrong.
- **Palette:** cool neutrals plus a single accent, `--bp-signal`, which is the mark's navy `#243D59`.
  In dark it lifts to `#759CC7`, because the navy itself is 1.72:1 on `--bp-void`. A green pass on
  2026-08-13 was tried and reverted the same day: it collided with SlotDesk's own green and the
  product theme stopped reading as a deliberate switch. **Do not make the page accent green again
  without also solving `.theme-slotdesk`.**
- **Two line weights, and the split is not cosmetic.** `--color-line` is decorative only, at 1.31:1.
  Anything that bounds a control takes `--color-line-strong`, which clears 3:1.
- **Pinned versus flipping.** A surface whose job is to carry text is pinned in both themes and its
  text partner is pinned with it. On a pinned plane a literal `#FFFFFF` is correct, not a token
  violation. `--color-accent-plane` and `--color-on-accent` are the pinned pair.
- **Secondary inverts.** `--color-secondary` is tide. On a light ground it is 2.08:1 and is **fill
  only, never text**. On a dark ground it is 8.45:1 and may set type. The site uses it as a fill in
  exactly one place, the `.eyebrow` tick.
- **Contrast is computed, never eyeballed.** `site/_dev/tokens.html` recomputes every ratio live
  from the resolved custom properties. A saturated colour that passes as text on paper does not
  automatically pass as a background under text; those are two different tests.
- **Type:** Archivo for everything that speaks, IBM Plex Sans for body copy, IBM Plex Mono for
  everything that measures. **Four font files against a ceiling of four**, so the budget is full:
  adding a family or a weight means removing one. Never Poppins, Montserrat, DM Sans, Plus Jakarta
  Sans, Manrope, Nunito or Raleway.
- **Container is 1280**, with 24px gutters rising to 48 from `md`. Measured off the handoff
  prototypes; every rail, divider and column edge derives from it.
- **Signature devices:** the measurement rule `.rule`, the section rail `.rail`, and the eyebrow
  tick `.eyebrow`. All three are classes in `globals.css`.
- Money, versions, dates, counts: always `tabular-nums`.

### Colour discipline

1a publishes its own, and the build is held to it: **at most two colour moments per page**, with
**one band committing at least 30% of its height**. Everywhere else is quiet.

The two failure modes are the boundaries, and both were paid for already. Twenty-four tiny colour
events painting 0.08% of the page is one wall. A single 660px plane that is 55% empty is the other.

**The budget is currently spent.** The homepage runs the closing accent plane plus the eyebrow tick,
and the chrome carries the four-hex mark at both ends of every page. Nothing else should reach for
colour without removing something.

## The mark

The ThemeAves bird, geometry unchanged from `brand/mark.svg` coordinate for coordinate. Both
variants face **right**, matching the live ThemeForest identity; the master is drawn facing left and
every shipping surface mirrors it rather than re-drawing it.

**Two variants:**

- **`BirdMark` / `bird-compact.svg`** - a reduced drawing: the silhouette plus the three wing bars,
  no outline. For anything **below 64px**, which in practice means the generated icon set.
- **`BirdMarkDetail` / `bird.svg`** - `brand/mark.svg` in full: the outline, the eye, the fold
  shadows, the upper wing ring. **This is what the header and footer ship**, at 46px, with the
  header bar sized to 78px around it. Decided 2026-08-13; a pass that used the reduced drawing was
  rejected. Do not revert it.

**Two colour modes.** Single colour is the default and inherits `currentColor`, so it cannot be
wrong on an unknown ground. `data-colour` opts into the published four hexes, and is what the chrome
uses. The `data-colour` block must stay last in `brand.css`: every rule touching `--ta-mark-field`
has the same specificity, so order decides, and moving it up puts a dark body on the mark in dark
while looking fine in light.

`brand/mark.svg` is the good master, and `brand/_source/78.jpg` is the published lockup. **Never
source the mark from `uploads/`** in the old handoff archive; that copy has its `<defs><style>`
emptied, so every hex is gone and it renders flat black.

## The wordmark

**THEME AVES**: all capitals, one weight at 800, tracked at 0.08em, with a word space between the
halves, matching the published banner. Colour is `--color-ink`, not the banner's navy, because navy
is 1.72:1 on `--bp-void`.

The brand name stays `ThemeAves` in prose, in `site.name`, in metadata and in JSON-LD. The lockup is
the one place it is drawn as two words.

## Conventions

- Component CSS goes in `@layer components`. Unlayered CSS beats every Tailwind layer, which has
  already shipped three contrast failures here, two of them invisible in dark.
- Logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start`/`end`) so RTL is free.
- Lucide icons only. Never hand-draw an SVG icon. The brand mark is not an icon.
- Wide content (tables, code, rails) scrolls inside its own `overflow-x: auto`; the body never
  scrolls horizontally, at any width.
- Exactly one `h1` per route.
- Every button is a link element. Nothing on this site is a checkout.
- A fact that is not known is `PENDING` and renders as a visible placeholder. Never a plausible
  guess. The blanks are tracked in `docs/FACTS.md`.
- Both themes, every change, at 1440 / 1024 / 768 / 390.
- `/_dev` routes need a `%5Fdev` directory; Next will not route a leading underscore.

## Copy

No tenure signalling anywhere: no founding year, "since 2018", member-since badge or years figure,
including OG images and JSON-LD. No invented numbers, prices, versions or dates. Headings are claims,
not labels. Buttons say what happens. No em dashes, no exclamation marks, and none of: revolutionary,
cutting-edge, seamless, empower, unlock, game-changing, solution.

## Git

**Never run git in this repo.** The user performs all git operations themselves.

✅ Two repositories now, split 2026-08-16. `site/` is its own repo (the one Vercel deploys, root
directory `/`); this outer repo holds everything else, with no root `.gitignore`, so `_dev/`,
`docs/`, `brand/` and `shots/` are inside it and stageable. The outer repo sees `site/` as an
embedded repo and no longer tracks its contents. Flag anything that contradicts this.

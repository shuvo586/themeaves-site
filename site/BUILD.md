# Build tracking

The running record for the ThemeAves site build. One file, updated as each step lands.
If this file and the code disagree, the code is right and this file is stale, so fix it.

- **Direction:** `1a` Blueprint, confirmed 2026-08-12.
- **Brief:** `../_dev/brainstorm/themeaves-site-design-prompt-v2-2026-08-11.md`, section 10 is the
  build order this file tracks. It supersedes `CORRECTION-V2.md` and the old navy palette.
- **Design reference:** `../_dev/handoff/directions-preference/`, read its `INDEX.md` first.
- **Stack:** Next.js 16 App Router, TypeScript, Tailwind v4, scaffolded 2026-08-12.

---

## Build order

| # | Step | Status | Landed |
|---|---|---|---|
| 1 | Design proposal, three directions, pick one | done | 2026-08-12 |
| 2 | Token layer + `/_dev/tokens` proving every token with measured ratios | done | 2026-08-12 |
| 3 | Mark, wordmark and favicon set, verified at 16px | done | 2026-08-12 |
| 4 | Component kit on `/_dev/kit` | **skipped, deliberately** | |
| 5 | Global chrome, then the homepage | done | 2026-08-12 |
| 6 | Product template, type and presentation aware | done for 2 of 3 types | 2026-08-12 |
| 7 | Docs shell plus SlotDesk's tree | shell done, content blocked | 2026-08-13 |
| 8 | Changelog and feeds | blocked | |
| 9 | `/demos`, support, licences, licence explainer | done | 2026-08-12 |
| 9b | About, terms, privacy, refunds | blocked on content | |
| 10 | Verify: screenshots at 4 widths x 2 themes for every route, Lighthouse, axe | partial | |

**Step 4 was skipped on the user's instruction**, 2026-08-12: *"leave it now as it is, we will
redesign it later, lets build the site first."* The brief makes the kit a hard stop, so this is a
deliberate deviation, not an oversight. The cost is that component decisions were made inside pages
rather than argued in isolation first, and a later redesign pass will have to touch every route
instead of one gallery. `/_dev/brand` still exists and still proves the mark.

### What is still blocked, and on what

Not design and not the stack. The ❌ rows in `../docs/FACTS.md`.

| Blocked | Needs |
|---|---|
| `/docs` | Built, but eight technical values are unconfirmed and it is off the nav until they land. Also a homepage claim, see below. |
| `/changelog` | SlotDesk to have shipped a version. Also a homepage claim. |
| `/about` | A real name and public handle. |
| `/terms`, `/privacy`, `/refunds` | Legal text, to be written rather than generated. |
| Licence verification | An Envato API token as a server secret. The page says so plainly. |
| The third product type | A stubbed `cms-theme` product, to prove the template holds. |

⚠️ **Two homepage trust claims are not yet true.** The band claims the documentation is public and
that every release is dated. Neither has a destination, so both render without a link and with a
"not published yet" marker. That is honest today, but **`/docs` and `/changelog` are launch
blockers, not nice-to-haves**: shipping that band while the claims cannot be checked is exactly the
credibility problem the band exists to solve.

---

## Done so far

### Step 2, the token layer

- `src/styles/tokens.css` holds the whole system: primitives, semantic roles that flip, pinned
  tokens that do not, type, space, shape, motion, and a minimal base layer.
- `_dev/tokens.html` is the proof page. It reads the **resolved** value of every custom property and
  recomputes each contrast ratio on load and on every theme change, so a token edited without a
  recheck fails on this page instead of in production.

Verified 2026-08-12, both themes at 1440 / 1024 / 768 / 390: **13 of 13 held pairs clear AA**, no
horizontal scroll at any width, screenshots rendered and reviewed by eye.

Tightest margins, worth knowing before anything is retuned:

| Pair | Ratio | Needs |
|---|---|---|
| the plane against bg, dark | 3.25 | 3.0 |
| line-strong on surface, dark | 3.22 | 3.0 |
| line-strong on bg, dark | 3.51 | 3.0 |
| on-accent on the plane, both themes | 5.91 | 4.5 |

### Step 3, the mark, the wordmark and the icons

**The open question about the mark is closed: the bird stays.** It is the existing ThemeAves bird
from `../brand/mark.svg`, retoned for 1a rather than redrawn. Geometry is unchanged coordinate for
coordinate; only the colour roles moved, because the four hexes it was drawn in belong to the
retired palette.

Two variants, and the split is not cosmetic:

| File | Use | Why |
|---|---|---|
| `public/brand/bird-compact.svg` | below 64px | Keeps the three wing bars, drops the outline. The stroke, eye, fold shadows and upper wing ring are all thin and close up at lockup size. |
| `public/brand/bird.svg` | above 64px | Keeps the eye, the outline strokes and the upper wing ring. |

The small variant is not a redrawing. It is the same four shapes (wing, body, head, tail) unioned by
a single fill, so the outline the original drew with an 18px stroke is now the edge of the shape
itself, with the three bars cut back out of it. The upper wing is gone: filled solid it notches
against the lower wing, and left as a ring it is a hairline that disappears by 32px.

**It keeps the bars, and that ordering was paid for.** See "The silhouette that deleted the brand"
below. Both variants face right, matching the live ThemeForest identity, and both run two colour
modes off one geometry.

**The three wing bars were sun, tide and flare and are now one role.** 1a runs a single accent, and
three hues in a mark that appears in the header of every route is exactly the confetti that got
rounds 1 and 2 rejected. `--ta-mark-accent` defaults to `--color-muted`, so the mark is monochrome
out of the box and spends none of the page's colour budget. Opt into the accent per placement.

**The favicon is the bird reversed out of the pinned accent plane**, not drawn in ink. The plane is
identical in both themes, so one file is correct against a light tab strip, a dark tab strip, a
bookmark bar and a home screen. An ink mark on a transparent field disappears into dark browser
chrome, which is the failure most hand-built favicons ship with.

The fit was measured, not nudged: the bird is 1.275:1, so a square field cannot carry equal padding
on all four sides. 25, 27 and 29 of 32 units were rendered at 16, 32 and 128px and compared. 29
crowded the corners, 25 gave away presence at 16, **27 held both**.

The wordmark set **Theme at 500 and Aves at 800**. ⚠️ **Superseded 2026-08-13**: it is now THEME
AVES, all capitals at 800, tracked, matching the published banner. See "The wordmark is set to the
banner" below. The mixed-case split was invented here and the banner has no such split.

Verified 2026-08-12 on `/_dev/brand`, both themes at 1440 / 1024 / 768 / 390: no horizontal scroll,
screenshots opened and reviewed by eye, the mark checked at 16, 20, 24, 32, 48 and 64px and against
simulated light and dark tab strips.

**One contrast bug was caught by looking and not by the build.** A mono label on the accent plane
rendered `--color-muted` on `#1B4DFF`, roughly 1.3:1, in light theme only. Cause: `.label` was
unlayered CSS, and unlayered CSS beats every Tailwind layer, so `text-on-accent` lost to it. Fixed
by putting the component classes into `@layer components`. Dark theme hid it, because muted is light
enough there to look deliberate. **Check saturated planes in both themes; one of them will lie.**

---

### Step 5 and after, the routes

Eleven routes prerender: `/`, `/products`, `/products/slotdesk`, `/products/aonomy`, `/demos`,
`/support`, `/license`, `/licenses`, `/_dev/brand`, `/manifest.webmanifest`, `404`. (This said
twelve and listed eleven.)

Verified 2026-08-12, every route at 1440 / 1024 / 768 / 390 in both themes: **no horizontal scroll
anywhere, exactly one `h1` per route**, screenshots opened and reviewed by eye.

**Three contrast failures were caught by looking, and none by the build.** All three were the same
root cause, which is worth stating once: **unlayered CSS beats every Tailwind layer.**

1. `tokens.css` sets `:where(a) { color: accent }` and was imported unlayered, so it beat every
   component class. Ink buttons rendered blue text on near-black, and a product card's price came
   out blue inside a card that had asked for ink. Fixed by importing it with `layer(base)`.
2. `.label` on the accent plane rendered `--color-muted` on `#1B4DFF`, roughly 1.3:1. Fixed by
   `@layer components` plus a `[data-on-accent]` block that restates every muted default.
3. The same again for the pending marker's dashed border and text.

**Dark theme hid two of the three**, because `--color-muted` is light enough there to look
deliberate. Check saturated planes in both themes; one of them will lie.

### To go live

Everything below is content, not code. Fill these in and the site ships.

1. **`src/data/site.ts`** - support email, timezone, working days, response window. The demo
   instance URL, reset note, simulated subsystems and logins. The author name and handle.
2. **`src/data/products.ts`** - SlotDesk's CodeCanyon URL, item id, price, version. Aonomy's live
   demo URL, but **confirm the ThemeForest preview still resolves first**, and its docs URL.
3. **Screenshots.** Every product image is a reserved, correctly proportioned placeholder. The list
   of captures to take is in `../docs/FACTS.md`.
4. **`/docs` and `/changelog`**, per the warning above.
5. **`/terms`, `/privacy`, `/refunds`, `/about`.**
6. Flip the `live` flags in `src/data/site.ts` and `Footer.tsx` as each route lands. `typedRoutes`
   in `next.config.ts` makes a link to a route that does not exist a compile error, so a forgotten
   flag fails the build rather than shipping a 404.

**Known cosmetic issue.** Aonomy's thumbnails are real screenshots of the product, and the product
is a 2018 template with saturated photographic backgrounds. They sit awkwardly against Blueprint's
cool neutrals. Kept anyway: substituting something calmer would misrepresent what a buyer receives,
and the brief is explicit that the only images on this site are real product screenshots.

---

## Matching the handoff prototypes

Instruction, 2026-08-12: *"honor all the handoff for all design"* and *"match all pixel perfect
design."* The six prototypes in `../_dev/handoff/directions-preference/project/` are the design,
not a reference.

Measurements taken from the prototype source rather than eyeballed from a render:

| Thing | Value | Was |
|---|---|---|
| Container | 1280 wide, 48px gutters | 1200 / 24 |
| Display h1 | 56px / 1.04 / -0.025em | same |
| Section h2 | 34px / 1.12 / -0.02em | 44px |
| Product h2 | 38px / 1.06 / -0.02em | 44px |
| Body copy | IBM Plex Sans 400, 15 to 18px | Archivo |
| Buttons | 14 by 22 at 15px, Archivo 600 | 16px, token padding |
| Rail | mono 11px, 0.14em, 14px block, dashed | 12px, 0.12em |
| Hero divider | dotted 6 on 6, at calc(50% - 24px) | solid border |
| Hatch | 135deg, 11px on 11px | 45deg, 7px |
| Browser well | 248px fixed | 16:10 ratio |
| Phone | 150px wide, 214px well, radius 14 | 26% of column |
| Phone overlap | top at calc(100% - 60px) | none |

Second pass, 2026-08-13, after the first was called out as not matching. The chrome and the
last three bands had been built to the prototype's composition but never measured against it.

| Thing | Value | Was |
|---|---|---|
| Mono label sizes | two: 12px speaks, 11px files | one, 12px |
| Mono label weight | 400 | 500, invented |
| Header bar | 16px around a 29px control cluster | 8px around 44px |
| Header action order | theme control, then licence | licence, then theme |
| Footer surface | page colour with a hairline above | `--color-surface` |
| Footer tick rail | 8px, decorative line colour | 10px, line-strong |
| Footer grid | 1.6fr 1fr 1fr 1fr, 32px gap | four equal, 40px |
| Footer link list | 14px on a 9px gap, 14px below the head | 14px on 8px, 16px below |
| Footer closing bar | mono 11px at .06em | mono 12px at .12em |
| Numeral | IBM Plex Mono 34px | Archivo 56px at 800 |
| Spec panel | 11px header row, then mono 13px rows at 12 by 20 | a first data row, 12/14px |
| Trust band | ruled top and bottom, h3 19px, body 15px | open padding, 20px, 16px |
| Studio card | label 11px at .1em, h3 20px, body 14.5px | 12px at .12em, 24px, 16px |
| Closing plane | 1.3fr 1fr, 72px padding, h2 fixed at 44px | 12-col 7/5, 80/96, the clamp |
| Closing licence line | a plain mono note | a dashed rail |

**The phone frame overhang was a real bug, not a measurement.** It reserved its 168px only below
lg, so from 1024 up the frame centred itself and the phone crossed the band boundary into
how-it-works. Reserved at every width now. It is visible in the render and invisible to the build,
which is the whole argument for opening the PNG.

**IBM Plex Sans came back.** It was dropped earlier to save a font file. Every paragraph in the
prototypes is set in it, and the body face changes the colour of every block of text, so matching
them means loading it. Archivo variable + Plex Mono 400/500 + Plex Sans 400 is **exactly 4 files**,
which is the ceiling in brief section 9, not over it.

**The phone frame is positioned, not flowed.** The prototype uses `margin-top:-60px` on a flex
sibling. That did not produce the overlap here and cost two rebuilds to spot; anchoring it at
`top: calc(100% - 60px)` against the browser frame is deterministic and renders identically.

### What is deliberately not copied

Three things, each a rule in the brief rather than a preference. Overrule any of them and say so.

1. **Invented facts.** `$59`, `$295`, `v1.0.0` through `v1.4.0`, five release dates,
   `demo.slotdesk.app` and `support@themeaves.com`. SlotDesk is not listed, so `$59` is not its
   price. These render as placeholders in the same position and weight, so the composition is
   unchanged.
2. **Three products that do not exist.** DeskLedger, QueueMate and FormAtlas fill the prototype's
   catalogue row. The real catalogue is two.
3. **The support ticket form.** Brief section 6.11 is explicit: triage only, no form, no ticket UI,
   because a form emailing an unwatched mailbox implies a queue that does not exist.

Also fixed rather than copied: the prototypes' mono rails are `#8a8f98`, which measures 2.98:1 on
paper. They use `--color-muted` at 5.50:1.

### Still to port

**The homepage and the global chrome are measured against their source, every band.** The one
omission is the changelog teaser, which is gated on real release data.

Not yet pixel-ported: `/products`, `/products/[slug]`, `/demos`, `/licenses`, `/license`, and the
Pricing, Docs, Changelog and Components prototypes. `/support` has the prototype's composition and
grammar but has not been measured against its source line by line. These now inherit the corrected
label sizes and chrome, so what remains on each is its own layout, not the shared grammar. The shared grammar now lives in
`components/ui/primitives.tsx` as `Rail`, `PageHero`, `Cols`, `Col` and `Band`, so the remaining
ports are layout work, not new decisions.

---

## Decisions, and why

Deviations from what direction 1a published, plus the ones this build made. Each exists because the
published system did not survive contact with a requirement in brief section 9.

1. **Split the line token in two.** 1a publishes one `line` at `#D3D8E0`, which is 1.31:1 against
   the page. Fine for a divider, and WCAG 1.4.11 does not govern decoration. Not fine for anything
   that bounds a control, which needs 3:1. So `--color-line` stays decorative and
   `--color-line-strong` (`#767D89` light, `#606A79` dark) carries input borders, the secondary
   button and checkbox edges. Without this every form field on the site would have shipped at
   1.31:1.

2. ~~**Dropped IBM Plex Sans.**~~ **Reversed.** Plex Sans is loaded and carries body copy. The
   reasoning that Archivo could stand in for it was wrong on the only test that counts, which is
   the render: every paragraph in the prototypes is Plex Sans, and the body face sets the colour
   and rhythm of every block of text on the page. Archivo variable + Plex Mono 400/500 + Plex Sans
   400 is **exactly 4 files**, which is the ceiling in section 9, not over it. See "IBM Plex Sans
   came back" above.

2b. **Mono labels carry two sizes and weigh 400.** 12px for a label that speaks (hero eyebrow,
   step marker, nav), 11px for one that files (rail, panel header, footer column head, legal
   line). The prototypes use both consistently across all six files. The old single 12px at
   weight 500 was invented rather than measured, and at this size the extra weight closes the
   counters. `--text-label-sm` is the new token; `--text-label-ws` moved 500 to 400.

3. **Display type is fluid.** 1a publishes a single 56px display size. Correct at 1440, unusable at
   390 where one sentence cost six lines. Now `clamp(2rem, 1.2rem + 3.4vw, 3.5rem)`: 32px at 390,
   45px at 768, the published 56px from about 1100 up.

4. **Section rhythm tightens under 768.** 96 and 128 read as dead air on a phone.

5. **The focus ring inverts on the accent plane.** A blue ring on a blue fill is not a ring.
   `--color-ring-on-accent` is pinned white and applies inside `[data-on-accent]`.

6. **No shadow tokens exist.** Not an omission. Depth is a 1px line and a one-step surface tint.
   A component that seems to need a shadow is wrong.

7. **Theme switches on a `.dark` class on `<html>`**, applied pre-paint by an inline script in
   `layout.tsx`, with `prefers-color-scheme` setting only the first-paint default. The class is what
   `tools/shot.cjs` drives from outside the page, so it has to be the source of truth.

8. **Component CSS goes in `@layer components`.** Unlayered CSS wins over every Tailwind layer, so
   an unlayered component class silently beats the utility meant to override it. This is not style
   preference; it shipped a 1.3:1 contrast failure once already. `brand.css` is imported with
   `layer(components)` so the file stays usable standalone.

9. **Tailwind's default colour palette is dropped** with `--color-*: initial`. Nothing here may
   reach for `bg-blue-500`, the brief bans the look that palette produces, and dropping it keeps the
   generated CSS to tokens that were actually contrast-checked.

10. **`/_dev` routes use a `%5Fdev` directory.** Next treats a leading underscore as a private
    folder and will not route it. `%5F` is the documented opt-back-in and it keeps the URL the brief
    names. Verified: the route builds and serves at `/_dev/brand`.

11. **`typedRoutes` stays on.** It makes a link to a route that does not exist a compile error,
    which is the mechanical version of the rule that a nav or footer entry must never lead to an
    empty page. It cost some `as Route` casts at the router and Button boundaries; worth it.

    ⚠️ **It also has a stale-cache failure.** After adding a route, `next build` can report
    `Type '"/demos"' is not assignable to RouteImpl<"/demos">` for a route that plainly exists,
    because its typecheck runs against the previous build's generated types. `npx tsc --noEmit` is
    the authority and will disagree. **`rm -rf .next` and rebuild** clears it. Do not start
    weakening types to chase this.

12. **The pending marker is not a disabled button.** A disabled control implies it will work once
    you satisfy something. These will not work until a fact exists, so they render as a dashed note
    that is not focusable and not in the tab order.

### Known duplication, and the condition for removing it

`globals.css` restates the semantic colour mapping inside `@theme` because Tailwind must see a
declaration there to generate a utility and cannot read an imported stylesheet. The values are
`var(--bp-*)` references, the same ones `tokens.css` writes, so the two cannot drift to different
colours, but the mapping line exists twice.

**Remove it when `_dev/tokens.html` becomes the `/_dev/tokens` route.** At that point `tokens.css`
moves into `@theme` wholesale. The duplication exists only because a static HTML page still links
`tokens.css` directly and cannot parse `@theme`.

### The wing hairline the retone inverted, removed 2026-08-13

The detailed mark carried a stray light slash across the middle of the wing, visible on the about
page, the OG image and the 512px app icon. It was the last path in `bird.svg` and the last element
in `BirdMarkDetail`:

```
d="M294.42,275.74 L382.92,252.03"   stroke: var(--ta-mark-field)   width 18.26
```

It is in the master, at `brand/mark.svg:44`, as `<line class="cls-7">`. But `.cls-7` strokes
**`#243d59`**, the navy structure colour, and the line sits inside the opening `<g>`, which paints
before the body and before the wing knockout. In the master it is therefore covered and never
visible at all.

The retone changed it twice: the stroke moved from structure to field, and the path moved to the end
of the file, after the knockout and the bars. Either change alone would have been survivable.
Together they put a field-coloured line on top of everything. Its sibling hairline on
`brand/mark.svg:43` (`.cls-6`, same navy) *was* mapped correctly, to `currentColor` in `bird.svg`.
So one of the two hairlines was retoned right and this one was not.

Removed from `public/brand/bird.svg` and `BirdMark.tsx` rather than reordered, because burying it
again would preserve a path that renders nothing in either system. The geometry is otherwise
untouched, coordinate for coordinate. `brand/mark.svg` is the master and was **not** edited.

Caught by importing the mark into Figma next to the master and comparing the two renders.

### The grouped-list rhythm and the arrow are shared now, 2026-08-13

The sidebar spacing was fixed on `/docs` and stayed broken on the docs rail and in the footer,
because all three hardcoded their own copy of the same three numbers. The docs rail also shipped a
"Contact support" link with no arrow while two other hand-rolled copies of the same link had one.
Both are the same failure: **a repeated value with no single owner.**

Now owned in one place each:

| Was | Is |
|---|---|
| `9px` / `14px` / `28px` retyped in `DocShell`, `/docs`, `Footer` x2 | `--nav-y-item` / `--nav-y-label` / `--nav-y-group` in `tokens.css` |
| `flex flex-col gap-[9px] mt-[14px]` x4 | `.navlist` and `.navgroup + .navgroup` |
| `<ArrowUpRight>` hand-placed in 5 files at 3 sizes | `<ArrowLink>` in `primitives.tsx` |

Verified across all four surfaces after the change: `9px` item gap, `9px` under the label, `40px`
between groups, everywhere, and both "Contact support" links on every docs route carry the arrow.

Two things the refactor taught, both worth keeping:

- **`.navgroup + .navgroup` needs the first item to be a group as well.** The manual title in
  `DocShell` was a bare `<p>`, so it was not a sibling the rule could space against and the first
  part heading landed straight underneath it. Caught by rendering, not by the build.
- **The sweep found a bug that was not reported.** The `DocClose` button said "Contact support" with
  no arrow while the `/docs` band one click away had one. Fixing only what is pointed at leaves the
  next one to be found by the user.

### The SlotDesk docs plane inverts, and /docs covers both products, 2026-08-13

**The plane.** `.theme-slotdesk` ran the closing band as leaf `#17B890` carrying spruce text. It
measured 5.76:1 and passed every check, and it read wrong on sight: a saturated mid-green band with
near-black type, and a near-black button with green type inside it. The pair is inverted, so the
plane is spruce `#0E2E28` carrying white at 14.58:1, and `[data-on-accent] .btn-ink` inverts with it
to a white button with spruce type, also 14.58:1. Identical in both themes, because both halves are
pinned. Leaf keeps `--color-secondary`, the eyebrow tick and every fill in the manual.

That is the second time on this page that a pair which passed its ratio still had to change. The
ratio is a floor, not a verdict.

**Both products.** `/docs` is a demo page for the catalogue, not a manual, so it now covers SlotDesk
and Aonomy rather than SlotDesk alone. The prototype's layout, grammar and measurements are
unchanged; what changed is that the sidebar carries a group per product and the numbered sections run
across both. Sections 01-04 are the prototype's own SlotDesk copy verbatim; 05-07 are Aonomy's,
written in the same grammar and just as much demo copy as the prototype's are. The real SlotDesk
manual is `/docs/slotdesk` and is untouched.

**The sidebar rhythm departs from the prototype.** The prototype sets 9px between links, 14px from a
heading to its list and 28px between groups, which renders as 28 / 31 / 44: three gaps close enough
that a heading reads as one more list item. With one group it gets away with it; with one per product
it does not. The label now binds to its own list and the groups carry the separation, so the
whitespace is 9 inside a list, 9 from the label to it, 40 between groups. Rendered: 23 / 28 / 59.

### /docs is built to its handoff prototype, 2026-08-13

`ThemeAves Docs.dc.html` is the spec for that route and the page is now measured against it rather
than interpreted from it. Copy, order, structure and every measurement come from the prototype. The
one substitution is the standing site decision, `#1B4DFF` to the signal green, and the two blues that
hang off it move with it: `#6E92FF` on the code plane becomes `--bp-signal-lift`, and the `#C8D4FF`
eyebrow tint on the band becomes `#C8FFE5`, which is that same colour rotated to the green hue with
saturation and lightness held.

The prototype's four off-token greys are carried across unchanged, `#8a8f98`, `#4a4f58`, `#E6E7EA`
and `#2b2f37`, including the rail grey that is 2.98:1 on paper. The handoff is the spec for this
page.

Verified by loading the prototype and the route side by side and diffing computed style and
geometry, not by eye. Every element matches on x, width, height, offset, family, size, weight,
tracking and colour. Three bugs surfaced doing it:

1. **The class namespace collided.** `DocShell` already owns `.doc-rail`, `.doc-side`, `.doc-body`
   and most of the rest of that vocabulary, so the new page inherited a `border-inline-end` the
   prototype does not have and drew a stray vertical rule at the end of the rail. The prototype page
   is namespaced `.dcp-` and touches nothing the shell uses.
2. **Line-height.** The prototype declares none on `body`, so everything it does not set one on
   renders at the browser default. This site sets 1.6, which inherited into the rails, markers, h2s
   and spec rows and ran the page 144px long by `#backups`. `.dcp` resets to `normal`.
3. See the font bug below, which is not scoped to this page.

Marked ADDED in the CSS, because the prototype does not answer them: a dark theme, behaviour below
1024, and its `changelog` link, which points at a route this site does not have. The word stays and
the link does not.

### Every route was rendering in the fallback font, fixed 2026-08-13

`next/font` put `--font-archivo`, `--font-plex-mono` and `--font-plex-sans` on `<body>`, while
`globals.css` redefines `--font-display`, `--font-body` and `--font-mono` on `:root`, which is
`<html>`. Those three referenced the next/font variables **one level above where they were defined**,
resolved to nothing, and every route on the site silently fell back to `-apple-system`. Archivo, IBM
Plex Sans and IBM Plex Mono were downloaded on every page load and used on none of them.

Fixed by moving the three classes to `<html>`. The theme script and both toggles use
`classList.toggle`/`add`, and `tools/shot.cjs` uses `classList.add`, so nothing overwrites them.

Not caught by three rounds of screenshots, because a page set in a system grotesque at the right
sizes and colours looks deliberate. It was caught by diffing computed styles against the prototype:
the mono rails were not monospaced. **Screenshots prove a layout, not a typeface.**

### The green accent was tried and reverted the same day, 2026-08-13

`#00733D` shipped for part of a day and went back to navy. It is worth recording why, because the
green was not wrong by any measure the build checks.

It measured correctly everywhere: 5.47 on paper, 5.97 under white, a derived lift at 6.81 on void and
6.25 on panel, and it was a drop-in for the handoff blue to within 0.06 on both tests. Every ratio
was computed from the live page and every route was rendered in both themes at four widths.

**It failed on a relationship no ratio can see.** `.theme-slotdesk` is already green, so with a green
site accent `/docs/slotdesk` read as one green inside another. The product theme exists to make a
manual obviously the product's, and against a green frame it stopped doing that. Navy against leaf is
the contrast that carries the switch.

Two rules out of it:

- **A colour is not only a contrast ratio, it is a relationship to every other colour already in the
  system.** The two greens never met on one surface, so nothing measured wrong and nothing rendered
  wrong. It was still the wrong colour.
- **Check the product themes in section 4b before touching `--bp-signal`.** That is the surface the
  page accent has to stay distinct from, and it is not visible on the homepage where accent changes
  get judged.

The revert is a straight restore of the block below, plus `favicon.svg`, `icon-maskable.svg`,
`layout.tsx` `themeColor` and `manifest.ts` `theme_color`. Icons regenerated.

### The accent is the mark's navy, changed 2026-08-13

**Reverted on instruction:** sourcing the page accent from the mark was the wrong call. The handoff
is the design, and the only colour that departs from it is the signal, which is now green. Navy goes
back to being the mark's colour and nothing else.

| token | handoff | navy pass | now | notes |
|---|---|---|---|---|
| `--bp-signal` | `#1B4DFF` | `#243D59` | `#00733D` | 5.47 on paper · 5.97 under white |
| `--bp-signal-lift` | `#6E92FF` | `#759CC7` | `#00B15E` | 6.81 on void · 6.25 on panel |

Green was chosen to be a drop-in for the handoff blue in contrast terms, and it is: 5.42 → 5.47 on
paper, 5.91 → 5.97 under white. That is why nothing downstream needed re-tuning. `--bp-signal-lift`
is derived, not given, on the same rule as before: hue held at 152deg, saturation held at 100%,
lightness raised until it clears AA on both dark grounds, because `#00733D` on `--bp-void` is 3.22:1.

The same four files had to be changed by hand for the same reason as last time: `favicon.svg`,
`icon-maskable.svg`, `layout.tsx` `themeColor`, `manifest.ts` `theme_color`. Icons regenerated.

Two numbers moved and were checked at 6x rather than assumed:

- **The eyebrow tick on the accent plane.** Tide against the navy plane was 4.90:1; against green it
  is 2.63:1. It is a decorative tick and not text, so 1.4.11 does not govern it, and it still reads
  as a distinct bar in both themes. Rendered, magnified and judged before it was left alone.
- **The plane against `--bp-void`.** Navy was 1.72:1 there, green is 3.22:1, so the closing band now
  separates from the dark page more, not less. Still not a text test.

**`.theme-slotdesk` is now a second green.** The docs routes wrap in `theme-${manual.slug}` and
re-skin to SlotDesk's leaf, so a manual reads in `#108064` / `#17B890` while the site frame around it
reads in `#00733D`. Navy against leaf made the product switch obvious at a glance; green against
green does not. Nothing measures wrong and nothing overlaps on one surface, so it is left as is, but
it is the thing to look at first if the product theming ever stops reading as deliberate.

### The accent is the mark's navy · the original decision, restored above

`#1B4DFF` is gone. The page accent is `#243D59`, the navy the bird is drawn in, and `#33BFB3` joins
as a secondary. Decided after building the mark and a hero in Figma and looking at them together:
1a's invented signal blue only ever existed because the brief asserted there was no brand colour to
inherit, and there was one, in continuous use on ThemeForest.

| token | was | now | on paper | on surface |
|---|---|---|---|---|
| `--bp-signal` | `#1B4DFF` | `var(--bp-mark-navy)` `#243D59` | 10.20 | 11.13 |
| `--bp-signal-lift` | `#6E92FF` | `#759CC7` | 6.71 on void | 6.16 on panel |
| `--bp-secondary` | none | `var(--bp-mark-tide)` `#33BFB3` | 2.08 FILL ONLY | 8.45 on void |

Everything downstream followed for free, because `--color-accent`, `--color-ring` and
`--color-accent-plane` all name `--bp-signal` and nothing hardcoded the hex. What did not follow, and
had to be changed by hand: `favicon.svg`, `icon-maskable.svg`, `layout.tsx` `themeColor` and
`manifest.ts` `theme_color`. Icons regenerated.

**`--bp-signal-lift` is derived, not given.** Navy is 1.72:1 on `--bp-void`, so dark cannot use it.
The lift holds the hue at 212deg and the saturation, and raises lightness until it clears AA on both
dark grounds. Same rule the old palette followed.

**Tide inverts with the theme and this is the easy mistake.** On a light ground it is a fill and
never text, at 2.08:1. On a dark ground it is a good text colour at 8.45:1. A tide plane takes navy
text at 4.90:1 and white text at 2.27:1, so the pairing is navy-on-tide, never white-on-tide, which
is how the mark uses it: a tide bar against navy structure.

Sun and flare were deliberately **not** promoted. They stay mark-only.

The plane against void measures 1.72:1 and that reads as a failure on paper. It is the wrong test. A
large surface transition is not text, and rendered in both themes at all four widths the closing
band separates cleanly. It is quieter in dark than the old blue was, which is the intent.

### The bird faces right, changed 2026-08-13

The live ThemeAves identity, as published on the ThemeForest profile avatar and banner, faces
**right**. `brand/mark.svg` is drawn facing **left**. Nobody had noticed, so every shipping file and
every generated icon carried the mirrored version.

All shipping art now mirrors the master rather than re-drawing it: `bird.svg`, `bird-compact.svg`,
`favicon.svg`, `icon-maskable.svg` and `BirdMark.tsx`. Each is an exact reflection about the
horizontal centre of its own viewBox, so path data stays identical to the master coordinate for
coordinate and every bbox is unchanged. Icons regenerated.

`brand/mark.svg`, `brand/mark.png` and `brand/_source/` are **not** flipped. They are the historical
master and the record of how the mark was drawn.

### The silhouette that deleted the brand, changed 2026-08-13

`bird-compact.svg` was a bare silhouette: the four shapes unioned into one fill with the wing bars
removed along with the eye, the hairlines, the fold shadows, the outline strokes and the upper wing
ring. It was rejected on sight, and correctly.

A bird silhouette is generic. The three wing bars are the mark. Dropping them to survive a small
size drops the reason the mark is worth showing, and it kept the 18px outline, which is the part
that dies first anyway. The ordering was backwards.

Rendered at 48 / 32 / 24 / 16 and compared, three ways: silhouette, bars knocked out in one colour,
bars in the brand hues. **Thin dies first, solid colour dies last.** The bars still read at 24, and
in colour the hues still separate at 16 where a single-colour knockout has already merged. That is
why the marketplace avatar reads small and the silhouette did not.

So the outline is not drawn at all, the shape's own edge is the outline, and the bars are cut back
out of it. Two modes off one geometry:

- **B, single colour, the default.** Silhouette takes `currentColor`, bars knock out to
  `--ta-mark-field`. It inherits, so it cannot be wrong: ink on paper, chalk in dark, white on the
  plane.
- **C, multicolour, opt in with `data-colour`.** `--ta-mark-ink` plus `--ta-bar-1/2/3`, each hue
  used twice exactly as `brand/mark.svg` assigns them: sun on head and bar 1, tide on tail and
  bar 2, flare on the upper flash and bar 3.

C is a light-ground mode. Its knockouts are a literal `#FFFFFF` rather than a theme colour, so the
white body carries the shape on either theme, but the navy outline has little to say against a dark
page. Prefer B on dark surfaces.

**The `data-colour` block is last in `brand.css` on purpose.** Every rule that touches
`--ta-mark-field` is a class plus one attribute, the same specificity, so order decides. Declared
higher up it lost to `[data-on-surface]` and put a dark body on the mark in dark, and looked
perfectly fine in light because `--color-surface` is `#FFFFFF` there. Caught by rendering both
themes, not by the build.

⚠️ **This contradicts `CLAUDE.md` and the brief, which both still need updating.** `CLAUDE.md` says
the navy/sun/tide/flare palette is retired and must not be applied; prompt v2 section 0 opens "There
is no logo. There is no existing brand identity." That premise is false: the mark has been in use on
ThemeForest since 2017. Until both documents are rewritten, the next session will read them and
revert this on sight. The mark palette lives in `tokens.css` as `--bp-mark-*` and is deliberately
kept out of the page's semantic roles, which are a separate and still-open decision.

### The chrome carries brand/mark.svg in full, and the closing plane carries no mark

Requested 2026-08-13. **This is the decision, not a starting position.** A first pass shipped the
reduced drawing in colour and was rejected; the ask was the full mark and the full mark is what
ships. Do not "correct" it back to `BirdMark`.

**Header and footer run `variant="detail"` with `colour`.** `Lockup` grew both props, each off by
default, and `Header.tsx` and `Footer.tsx` set them. That is `brand/mark.svg` as drawn: the navy
outline, the eye, the three fold shadows, the upper wing ring, the tail ticks, and all four hexes,
mirrored to face right like every other shipping surface. `BirdMarkDetail` is that file coordinate
for coordinate, so nothing was redrawn to get here.

**The mark clears the 64px rule by being given room, not by being reduced.**
`.ta-lockup[data-variant="detail"]` sets `--ta-mark-h: 2.4em`, which is 46px at the header's 19px.
That is the size where the outline, the eye and the three fold shadows still separate. The header
bar grew from 60px to 78px to hold it, and that is the cost of the full drawing, paid deliberately.
Rendered at 4x in both themes at 1440 / 1024 / 768 / 390.

**In dark the navy outline goes quiet and the white body carries the shape.** That is not a defect
to fix: it is what the master file does on a dark ground, the mode is documented in `brand.css` as
light-ground, and the mark still reads with all three bars. Checked, not assumed.

**The 88px `BirdMarkDetail` came out of the closing plane.** With the full logo at both ends of the
document, a third statement of the same mark on one page was one too many, and it was pushing the
message down a band whose only job is to carry it. The band lost 120px and reads denser for it.

The reduced `BirdMark` is still the right answer below 64px and still what the favicon pipeline and
the 16px test use. It is simply not what the chrome uses any more.

### `/docs`, built to the prototype with the values held back

Landed 2026-08-13, to the composition in
`../_dev/handoff/directions-preference/project/ThemeAves Docs.dc.html`: crumb rail with the version
at the end, accent eyebrow, display heading, then a ruled band carrying a sticky 240px sidebar
against a 760px content column, and the closing accent plane. Seven sections in two nav groups.

**The prose is written; the values are not.** The prototype fills every technical blank: PHP 8.1,
MySQL 8 / MariaDB 10.4+, a four-extension list, `php artisan migrate --seed`, a webhook path, "live
in under twenty minutes" and `v1.4.0` in the rail. Not one is verified against SlotDesk.

Docs are the worst possible place to guess. A buyer provisions a server against a requirements
table, and support inherits every wrong line in it. So each section carries honest prose about what
it covers, which is knowable now, and every value a reader would act on is `PENDING` in
`src/data/docs.ts` and renders as "not confirmed". The eight of them are tracked in
`../docs/FACTS.md`.

**It is deliberately off the nav.** `nav` in `src/data/site.ts` keeps Docs at `live: false`, and the
footer does not list it. The site's own rule is that a nav slot leading to a page of placeholders
costs more trust than the missing slot does, and the homepage claim that the documentation is public
becomes checkable the moment this is linked. Flipping it is one line once the values are real.

**Two structural notes.**

- **A new pinned pair.** `--color-code-plane` / `--color-on-code`, the ink plane with chalk on it,
  14.89:1. Pinned for the same reason the accent plane is: its job is to carry text. A terminal that
  inverted with the theme would stop being a terminal in light, and the pair would need measuring
  twice instead of once. The prompt glyph is `--color-line-strong`, not the accent: the accent is
  2.4:1 on this plane and would be the least readable thing in the block.
- **The sidebar rule is on the column, not on the sticky element.** A sticky box is only as tall as
  its content, so the border stopped two thirds of the way down the band and left the rest of the
  document undivided. Caught by looking, not by the build. `.doc-rail` stretches and carries the
  hairline; `.doc-rail-inner` sticks.

The shell collapses to a stack under **lg**, not md. At 768 a 240px rail leaves about 44ch for
prose, and a documentation column that narrow is worse than no rail at all.

### A manual reads in the colours of the product it documents

Decided 2026-08-13. `.theme-slotdesk` in `tokens.css` section 4b reassigns the semantic roles inside
the docs band: SlotDesk's warm canvas `#FAF7F2`, its spruce ink, its leaf green. **The header and
the footer sit outside the wrapper and stay ThemeAves**, so the site frame is constant and the band
between it belongs to the product.

It costs nothing structurally, which is the point of the token layer: a component names a role and
never a colour, so re-skinning a whole section is a block of custom properties and no component
change at all.

The unexpected benefit is the figures. Every screenshot in the manual is a SlotDesk screen, and they
sat awkwardly against Blueprint's cool neutrals in exactly the way Aonomy's thumbnails still do. On
SlotDesk's own canvas they belong.

**Three of SlotDesk's own values failed our contrast law and were replaced.** Each replacement is
derived from the original at fixed hue and saturation, the same way `--bp-signal-lift` is, and each
ratio was computed:

| Theirs | Measured | Replaced with | Now |
|---|---|---|---|
| `--fg-muted` `#6B7A73` | 4.22 on their canvas | `#66756E` | 4.53 canvas · 4.84 surface |
| `--field-bd` `#DFE3E0` | 1.21 on canvas, and it bounds controls | `#849387` | 3.02 canvas · 3.23 surface |
| `--leaf` `#17B890` as text | 2.37 on canvas | `#108064` in light only | 4.58 canvas · 4.89 surface |

**Leaf inverts exactly as tide does.** It is 2.37:1 as text on their light canvas and 9.96:1 on
their dark one, so light gets the darkened leaf for type and keeps the real leaf for the plane;
dark uses leaf directly. This is the same law as `--color-secondary`, and it caught us the same way.

**White on the leaf plane would have been the obvious wrong answer** at 2.53:1. The plane takes
SlotDesk's spruce at 5.76:1, which is how the product pairs them.

**One bug found by rendering.** On the plane, `--color-secondary` IS the plane, so the eyebrow tick
was leaf on leaf and vanished. Fixed by reassigning secondary to the text partner inside
`[data-on-accent]`, scoped to the product theme: ThemeAves must not get that rule, because there the
plane is navy and the tick is tide, which is the mark's own pairing and is deliberate.

Audited on the rendered page in both themes: body 4.84 / 6.44, current chapter 4.89 / 9.12, plane
5.76 / 8.05, headings 16.09 / 14.21. Everything clears AA.

Adding a second product manual is a second block in section 4b plus `theme-<slug>` resolving from
the manual slug, which the route already does.

### The wordmark is set to the banner: THEME AVES

Source is the lockup on <https://themeforest.net/user/themeaves> and in `brand/_source/78.jpg`.
Both set the name the same way, so it is not a guess.

- **All capitals, one weight at 800.** The mixed-case "Theme" at 500 against "Aves" at 800 was
  invented here. The banner has no weight split, so `.ta-wordmark-stress` is deleted rather than
  neutered, and `Lockup.tsx` renders one span.
- **Tracked at 0.08em.** Not decoration. At the -0.01em the mixed case used, 800-weight capitals
  close up and the word reads as one dark bar. A negative `margin-inline-end` cancels the trailing
  track so the lockup measures to the S, not to the space after it.
- **Two words.** The banner sets `THEME AVES`. The brand name stays `ThemeAves` in prose, in
  `site.name`, in metadata and in JSON-LD; the lockup is the one place it is drawn.
- **Colour stays `--color-ink`, not the banner's navy.** Navy is 1.72:1 on `--bp-void`, so a
  literal match would need the lifted accent in dark, and a powder-blue wordmark is further from
  the banner than a near-black one is. Ink is #14181F, a cool near-black, next to the mark's navy
  outline. Change this only with a dark render in hand.

**It cost a breakpoint.** Tracked capitals are about 40px wider than the mixed-case wordmark, and
with the full mark beside them the header outran a 320px viewport and put a horizontal scroll on
the body, which section 9 forbids. `@media (max-width: 389px)` steps `--ta-size` down to 15px. 390,
the width the design is drawn at, keeps the full size; only narrower widths pay. Verified with
`scrollWidth` at 320 / 360 / 390 / 768 / 1024 / 1440.

### The eyebrow tick, and the one place tide appears

`.eyebrow` in `globals.css`: a 36 by 3 tide stripe on a 12px gap, before the mono sub heading that
opens a section. It was written inline in the hero; it is a class now so the device is one decision
and so the amount of tide on a page stays countable.

**Tide is a fill here and never a word.** `--color-secondary` is 2.08:1 on paper, so it can mark a
heading and can never set one. The sub heading itself keeps `--color-accent` or `--color-on-accent`.
On the pinned plane the stripe is the mark's own pairing, a tide bar against navy, which is how
`brand/mark.svg` uses the two together.

Placement is one tick per sub heading that opens a subject: three on home (hero, flagship, closing
plane) and one on each of `/products`, `/license`, `/licenses`, `/demos`. Not on the interior
section rules, not on the three step markers, not on the product detail breadcrumb. Same hue at the
same size in the same position reads as one recurring device rather than as seven colour events.

---

## Do not copy these from the handoff prototypes

The six page prototypes in `../_dev/handoff/directions-preference/project/` are useful for layout
and section order. Three things in them must not survive the trip:

1. **`#8a8f98`.** Used 20 to 44 times per page for the section rails, panel headers and image
   captions at 9.5 to 12px. It measures **2.98:1** on paper and is not in 1a's token table at all.
   The correct token is `--color-muted` at 5.50:1.
2. **Invented facts.** `$59` and `$295`, `v1.0.0` through `v1.4.0`, and five release dates. Every
   one is an open blank in `../docs/FACTS.md` and forbidden by brief section 12. Ship a visible
   placeholder instead.
3. **Em dashes.** In all seven files. Banned by brief section 11 and by the global style rule.

---

## The verification loop

Run both, every time, before calling any step done.

```bash
# from /var/www/html/themeaves/site
npm run build

# from /var/www/html/themeaves, with the site served
node tools/shot.cjs http://localhost:3210/_dev/brand brand   # then OPEN shots/*.png and LOOK
node tools/icons.cjs                                          # after any favicon.svg edit
```

`tools/shot.cjs` takes a file path or an http URL and shoots 1440 / 1024 / 768 / 390 in both themes.

The script cannot tell you a band is 660px tall with a void in it, or that a composition is dead, or
that a label on a saturated plane is invisible in one theme only. Three design rounds satisfied
every written rule and were rejected on sight because nothing in the loop ever looked at the output.
Render it, open the image, judge it.

A dedicated gate script for the site does not exist yet. It lands with step 10.

---

## Open questions

- **The old `mark.svg` and `mark.png` in `public/brand/`.** Loose copies of the master, unreferenced
  by any component: `BirdMark.tsx` carries the path data inline and the icon pipeline reads
  `favicon.svg`. Left in place rather than deleted, because deleting is the user's call. Remove them
  before the repo goes public.
- **The page grammar is applied to one route.** `PageHero`, `Rail`, `Cols`, `Col` and `Band` in
  `primitives.tsx` are used by `/support` only; every other route hand-rolls the equivalent markup.
  A consequence of skipping step 4. Worth a pass.
- **`cms-theme` has never been rendered.** The product template branches on `type` and the third
  branch is unproven. Stub one and screenshot it before trusting it.

Corrected 2026-08-13 rather than left open: `--container` and `--container-page` both said 1200 and
now say 1280, matching `<Container>`; the `check:facts` script referenced in `src/data/site.ts` did
not exist and the docblock now points at `FACTS.md` and `docs/RECIPES.md`; the font-budget comment
in `tokens.css` claimed three files with Archivo body copy and now states the four that load.
- **Analytics vendor.** Section 9 wants privacy-friendly and `afterInteractive`. Not chosen.
- **`next lint`** has no config yet. It lands with the kit.

---

## `/docs` became the index it always claimed to be, 2026-08-14

`ARCHITECTURE.md` has described `/docs` as "Manual index. One row per manual" since the routes were
drawn. The page did not do that. It was the handoff prototype's own single-product demo, kept
verbatim, and by the time the SlotDesk manual was finished it contradicted the manual it linked to
on every fact it stated:

| The prototype page said | The manual, and the code, say |
|---|---|
| PHP 8.1 or newer | 8.3.0+, from `Installer::MIN_PHP_VERSION` |
| MySQL 8 / MariaDB 10.4+ | MariaDB 10.6+ |
| cURL, mbstring, PDO, OpenSSL | seven: pdo_mysql, mbstring, openssl, curl, gd, zip, intl |
| WhatsApp Business API number | the Cloud API |
| `https://your-server/webhooks/whatsapp` | `/webhooks/whatsapp/cloud` |
| Paste your token into Settings → Channels | WhatsApp → Setup wizard |
| A five-command console install | a browser wizard that does all five itself |

The docs plan had already ruled on the last one: **replace the console block, do not fill it.** A
product that ships an installer should not be documented with `php artisan migrate --seed`.

So the page is now generated from `docs.ts` and `products.ts` rather than typed: every product, its
type and marketplace, its manual's chapter count, the five part titles with their own counts, and
three links. Aonomy has no manual and says so in the same words the manual uses for an unwritten
chapter. **Nothing on the page is a second copy of a fact held somewhere else**, which is the only
reason the old page was able to go stale without anyone noticing.

**The 307-line `.dcp-*` block came out of `globals.css` with it.** It was the prototype's pixel spec,
including four deliberately off-token greys and a rail grey at 2.98:1 that only survived review
because the handoff was the spec for that page. Nothing else used it and it was shipping to every
visitor. The page it described no longer exists, so the CSS describing it should not either. The
entry above about namespacing `.dcp-` against `DocShell` is history now, and stands as history.

One thing was deliberately not changed: **`nav` in `site.ts` still has `Docs` at `live: false`.** It
was set false because a two-chapter manual behind a nav slot costs more trust than a missing slot.
That reason has gone. Turning it on is the user's call, not a side effect of this pass.

---

## The hero stopped being a hatch pattern, 2026-08-14

Both frames in the homepage hero had been holding placeholders since the page was built: a 248px
hatch captioned "SlotDesk dashboard · screenshot" and a 150px phone captioned "WhatsApp booking
9:19.5". They now carry real screens of the running app, captured by
`codecanyon/_dev/tools/_shot-marketing-hero.cjs`:

- **The browser frame** takes `dashboard.png`, the operator's dashboard.
- **The phone frame** takes `booking-mobile.png`, the customer's public booking page at 390.

The pair was chosen over the two dashboards or two phones the placeholders implied, because it is the
product's actual shape: one screen belongs to the business, the other to the person booking.

**The dashboard is shot at 1120, not the 1440 the figure rules ask for.** The frame is 568 CSS px
wide, so a 1440 capture is downscaled to 0.39 and every label in it turns to grey mush; at 1120 the
shell still draws its full sidebar, the stat cards wrap to two rows, and the crop lands with all four
of them and the greeting legible. That is a marketing image, not a manual figure, and legibility at
the size it is actually drawn wins over matching the capture width.

Two things worth knowing for the next person who touches these:

1. **`next/image` cached the old file for a minute.** `minimumCacheTTL` defaults to 60s, so the first
   re-shoot after replacing a PNG showed the previous crop and looked like the change had not landed.
   `rm -rf .next/cache/images` before re-rendering, or wait it out.
2. **The booking page was behind maintenance mode.** The demo install has platform maintenance on,
   which closes the public booking page and nothing else, so the first capture came back as the
   maintenance notice. It was toggled off for the capture and **back on afterwards**, which is the
   state the install was found in. Incidentally the cleanest possible proof of what that setting does.

This is the first use of `next/image` on the site. Nothing else needed it, and the hero does: both
images are above the fold, and the dashboard carries `priority`.

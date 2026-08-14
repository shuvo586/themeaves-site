# Architecture

How the site is put together. For colour and type see [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md); for
the parts you compose with see [`COMPONENTS.md`](COMPONENTS.md).

## Stack

| Piece | Choice | Note |
|---|---|---|
| Framework | Next.js 16, App Router | `typedRoutes: true`, so a `<Link>` to a route that does not exist is a compile error |
| Language | TypeScript | `npm run typecheck` runs `tsc --noEmit` |
| CSS | Tailwind v4 via `@tailwindcss/postcss` | No `tailwind.config`; theme lives in `@theme` inside `globals.css` |
| Icons | `lucide-react` | The only icon source. Never hand-draw an SVG icon. The brand mark is not an icon. |
| Rendering | Static | Every route prerenders. Nothing opts out. |
| Content | Typed TS modules in `src/data/` | Shaped so MDX frontmatter can replace them as a loader change, not a rewrite |

`poweredByHeader` is off. `reactStrictMode` is on.

## Routes

Thirteen artefacts prerender.

| Route | Source | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Six sections. The only page with an accent plane. |
| `/products` | `app/products/page.tsx` → `ProductsIndex.tsx` | Client-side facet filtering over `products` |
| `/products/[slug]` | `app/products/[slug]/page.tsx` | `generateStaticParams` over `products`; `generateMetadata` per product |
| `/demos` | `app/demos/page.tsx` | |
| `/docs` | `app/docs/page.tsx` | Manual index. One row per manual. |
| `/docs/[manual]` | `app/docs/[manual]/page.tsx` | Contents: every chapter with its summary |
| `/docs/[manual]/[chapter]` | `app/docs/[manual]/[chapter]/page.tsx` | A chapter, rendered from markdown at build time |
| `/support` | `app/support/page.tsx` | The only page built entirely from the `primitives.tsx` page grammar |
| `/license` | `app/license/page.tsx` | Regular against Extended, plus three concrete cases |
| `/licenses` | `app/licenses/page.tsx` → `LicenceField.tsx` | Purchase-code field; verification needs an Envato token and says so |
| `/_dev/brand` | `app/%5Fdev/brand/page.tsx` | `robots: noindex`. Proof page for the mark and icon set. |
| `404` | `app/not-found.tsx` | |
| `/manifest.webmanifest` | `app/manifest.ts` | |

`/_dev` routes need the `%5Fdev` directory name. Next will not route a leading underscore.

### Not built, and why

`/changelog`, `/about`, `/terms`, `/privacy`, `/refunds`. All blocked on content, none on design.
See `../../docs/FACTS.md`.

`/docs` **was** a third case and is no longer. The SlotDesk manual is complete, 20 chapters of 20,
and `/docs` is a real index built from `docs.ts` and `products.ts`: one row per product, linking the
manual where one exists and saying "no manual yet" where one does not, which is Aonomy's state.

**`nav` in `site.ts` still has `Docs` at `live: false`.** That was the right call while the manual was
two chapters of placeholders, and it is now the only thing keeping a finished manual out of the
header. Flipping it is a decision, not a fix, so it is left alone here and flagged: the reason it was
false has gone away.

Two homepage trust claims currently have no destination: that the documentation is public and that
every release is dated. They render without a link and with a "not published yet" marker. That is
honest today, but real documentation and a changelog are launch blockers rather than nice-to-haves,
because shipping a credibility band whose claims cannot be checked is the exact problem the band
exists to solve.

## The data layer

Two modules, both plain typed TS.

### `src/data/site.ts`

Everything a page must not hardcode: the brand name, domain, positioning line, marketplace links,
the Envato attribution, support details, the demo instance, the author.

The important export is the pending machinery:

```ts
export const PENDING = 'PENDING' as const;
export type Maybe<T> = T | Pending;

isPending(value)   // type guard
known(value)       // narrows to T | undefined, keeps JSX free of comparisons
```

**A fact that is not known is `PENDING`, and `PENDING` renders as a visible placeholder.** Never a
plausible guess. A wrong price in a public repo is a wrong price a buyer can quote back at you.
`<Fact>` and `<Price>` in `primitives.tsx` do the rendering.

`nav` carries a `live` flag per entry and `liveNav` filters it. A route with no content gets no nav
slot, because a nav entry leading to an empty page costs more trust than the missing entry does.
`typedRoutes` turns a forgotten flag into a build failure rather than a shipped 404.

### `src/data/docs.ts`

The documentation **registry**: which manuals exist, their parts, chapter order, slugs and
publication state. The prose is not here. Each chapter is a markdown file at
`content/docs/<manual>/<chapter>.md`, read with `fs` at build time and rendered with `marked`.
Figures live in `public/docs/<manual>/`.

Two rules the registry enforces:

- **`published: false` means listed but not routed.** An unwritten chapter shows in the sidebar
  and on the contents page marked "soon", and `generateStaticParams` skips it, so a link to a
  page that does not exist cannot be made by accident.
- **No reference codes.** Chapters are named, never numbered, and figures are captioned rather
  than numbered. Ordering lives in the registry, so a code would be a second source of truth that
  goes stale the moment a chapter is inserted.

The chapter plan, including which figures each still needs, is
`../../docs/SLOTDESK-DOCS-PLAN.md`.

### `src/data/products.ts`

The catalogue, typed as the shape `content/products/<slug>.mdx` frontmatter will take.

Two fields drive the template:

- **`type`**: `php-script` | `html-template` | `cms-theme`. Reorders and adds sections.
- **`presentation`**: `full` | `demo`. Sets how much page an item gets.

Both live at `/products/<slug>`, so promoting Aonomy from `demo` to `full` later is a data change,
not a route change. `cms-theme` has no product yet, so the third branch of the template is unproven.

## Theming

Three states: system, light, dark. The **class on `<html>` is the source of truth**, because that is
what `tools/shot.cjs` drives from outside the page.

1. `layout.tsx` inlines `THEME_SCRIPT` in `<head>`. It reads `localStorage['ta-theme']`, falls back
   to `prefers-color-scheme`, and toggles `.dark` / `.light` **before first paint**, so there is no
   flash of the wrong theme.
2. `components/chrome/ThemeToggle.tsx` cycles system → light → dark and persists the choice.
   `system` removes the key rather than storing a third value.
3. `tokens.css` reassigns the same custom properties under `.dark`. Utilities compile to
   `var(--color-…)`, so a theme flip moves every utility with it. **There is no `dark:` variant to
   write for colour.**
4. The `@media (prefers-color-scheme: dark)` block in `tokens.css` only sets the first-paint default
   for `:root:not(.light):not(.dark)`.

The toggle is never colour-only: it carries an icon and the mode as a word.

## Fonts

Four files, against a ceiling of four.

| Family | Weights | Carries | CSS var |
|---|---|---|---|
| Archivo | variable 400..800 | display, headings, buttons, the wordmark | `--font-display` |
| IBM Plex Sans | 400 | body copy | `--font-body` |
| IBM Plex Mono | 400, 500 | labels, rails, spec values, prices, versions | `--font-mono` |

Loaded through `next/font/google` in `layout.tsx`, which hashes the family name into a custom
property. `globals.css` then repoints `--font-display` / `--font-body` / `--font-mono` at the real
loaded faces, after the `tokens.css` import so it wins.

Body copy is Plex Sans, not Archivo. The handoff prototypes set every paragraph in it, and swapping
the body face changes the colour and rhythm of every block of text on the page.

**The budget is full at four of four.** Adding a family or a weight means removing one.

Banned families, per the brief: Poppins, Montserrat, DM Sans, Plus Jakarta Sans, Manrope, Nunito,
Raleway.

## CSS layering, and the bug that keeps coming back

`globals.css` imports both stylesheets **into layers**:

```css
@import '../styles/tokens.css' layer(base);
@import '../styles/brand.css'  layer(components);
```

**Unlayered CSS beats every Tailwind layer**, and that one fact has produced every contrast failure
this project has shipped. `tokens.css` sets `:where(a) { color: accent }`; left unlayered it beat
every component class, so ink buttons rendered blue on near-black. `.label` on the accent plane lost
to `text-on-accent` and rendered muted-on-navy at roughly 1.3:1. Dark theme hid two of the three,
because `--color-muted` is light enough there to look deliberate.

Rules, therefore:

- Component CSS goes in `@layer components`.
- Anything reaching for `--color-muted` needs a `[data-on-accent]` counterpart. `globals.css` has a
  block that restates those defaults so a call site does not have to remember.
- A saturated plane must be checked in **both** themes. One of them will lie.

## The icon pipeline

`site/public/brand/favicon.svg` and `icon-maskable.svg` are the sources. Everything else is
generated:

```bash
npm run icons        # == node ../tools/icons.cjs
```

It rasterises through Chromium **at the target size**, not by downscaling a large bitmap, so 16px
gets the browser's own hinting. It also packs `favicon.ico` at 16 / 32 / 48. Never edit a PNG by
hand; re-run this and the whole set moves together.

The favicon is the bird reversed out of the **pinned** accent plane rather than drawn in ink. The
plane is identical in both themes, so one file is correct against a light tab strip, a dark tab
strip, a bookmark bar and a home screen. An ink mark on a transparent field disappears into dark
browser chrome, which is the failure most hand-built favicons ship with.

`theme_color` in the manifest, `themeColor` in the viewport export and the favicon plane are all
`#243D59`, the same pinned value, for the same reason.

## Tooling

`tools/` resolves Playwright out of `/var/www/html/codecanyon/node_modules` via `tools/pw.js`. Do
not install Playwright at the repo root; fix the resolve path instead.

| Tool | Does |
|---|---|
| `tools/shot.cjs <file-or-url> [slug]` | Shoots 1440 / 1024 / 768 / 390 in both themes, tiled into viewport-height slices so nothing is scaled away. Output to `shots/`. |
| `tools/icons.cjs` | Regenerates the icon set. Run after any `favicon.svg` edit. |
| `tools/verify-home.cjs` | Homepage checks. |
| `site/_dev/tokens.html` | Recomputes every contrast ratio live from the resolved custom properties. Open it after touching a colour token. |

`shots/` is reproducible output and is meant to be overwritten. Everything in `docs/`, `_dev/` and
`brand/_source/` is irreplaceable and has no second copy.

## Environment

The repo lives at `/var/www/html/themeaves` in WSL. From Windows tooling reach it as
`\\wsl.localhost\Ubuntu\var\www\html\themeaves`. The Git Bash tool cannot see WSL paths at all, so
run node through `wsl -e bash -lc '…'` or use PowerShell against the UNC path.

`site/` has its own `node_modules`; `npm install` there is expected.

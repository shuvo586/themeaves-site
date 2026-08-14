# Components and CSS classes

Everything that already exists, so a new route inherits the grammar instead of reinventing it.

Two kinds of part, and the split matters:

- **React components** in `src/components/` compose structure.
- **CSS classes** in `@layer components` inside `globals.css` carry the recurring visual devices.

A device that recurs on every route is a class, not a component, so markup stays readable and a
utility can still override it.

---

## Brand

### `<BirdMark>` and `<BirdMarkDetail>` · `components/brand/BirdMark.tsx`

The two mark variants. Both take `title?: string` on top of standard SVG props: decorative when it
sits next to a wordmark that already says the name, labelled when it stands alone.

```tsx
<BirdMark className="ta-mark" data-colour />                       // below 64px
<BirdMarkDetail className="ta-mark-detail h-32 w-auto" title="ThemeAves" />  // above 64px
```

Path strings must stay in sync with `public/brand/bird*.svg`, which is what the favicon pipeline
reads. See [`DESIGN-SYSTEM.md` §6](DESIGN-SYSTEM.md#6-the-mark) for the variant threshold and the
colour modes.

### `<Lockup>` · `components/brand/Lockup.tsx`

Mark plus wordmark. The only thing the chrome uses.

| Prop | Default | Does |
|---|---|---|
| `size` | `'md'` | `sm` 15px, `md` 19px, `lg` 24px. Sets `--ta-size`; everything else scales from it. |
| `variant` | `'compact'` | `detail` swaps in `BirdMarkDetail` and steps `--ta-mark-h` to 2.4em |
| `mark` | `'bird'` | `none` runs the wordmark alone. Not a placeholder state: a wordmark on its own is a finished lockup. |
| `colour` | `false` | Opts into the published four-hex mode |
| `asLink` | `true` | Links to home. Pass `false` on home itself, where a link to the current page is noise for a screen reader. |

```tsx
<Lockup asLink={!onHome} size="md" variant="detail" colour />   // what header and footer ship
```

**Set `size`, not the parts.** `--ta-size` drives the wordmark, and `--ta-mark-h` is expressed in
`em` against it.

---

## Layout

### `<Container>`

1280 max width, 24px gutters rising to 48 from `md`. Every rail, divider and column edge is measured
off this. Changing it moves the whole page off the design.

### `<Band tint>`

A section band. `tint` puts it on `--color-surface`, which is how the prototypes alternate one
section against the next.

### `<Section index label>`

A section that opens on the measurement rule. Sections do not open on a centred eyebrow, and nothing
here is a card.

```tsx
<Section index="01" label="Side by side"> … </Section>
```

Note: `/_dev/brand` defines its own local `Section` with `label` / `title` props. It is a proof page
and is not held to the page grammar.

### `<Rail left right>`

The dashed section header. `right` is optional and drops out below 640.

### `<Cols>` and `<Col label title index>`

Three columns split by vertical hairlines, each opening on an accent mono label. Collapses to a
stack under `md`, where the dividers would be horizontal rules pretending to be columns. Pass
`index` so the first column loses its leading border.

### `<PageHero crumb meta eyebrow title lead>`

The page opener: breadcrumb rail, mono eyebrow, display heading, lead. Sits on `--color-bg`, and the
section after it goes on `--color-surface`.

> **Consistency gap worth knowing.** Only `/support` is built from `PageHero` / `Rail` / `Cols` /
> `Band`. Every other route hand-rolls the equivalent markup with raw `.rule` and `.rail` divs,
> because step 4, the component kit, was deliberately skipped. The grammar is correct; it is just
> not applied everywhere yet. Prefer these components in new work.

---

## Headings and text

| Component | Renders |
|---|---|
| `<Display as="h1">` | `--text-display`, 1.04, 800, -0.025em. The page's one display heading. |
| `<Heading as="h2">` | 26px, 1.15, 700, -0.01em |
| `<Lead>` | 20px, 1.5, muted, capped at `--measure`. Every heading is followed by a lead before body copy. |

---

## Actions

### `<Button href variant external>`

**Every button on this site is a link element.** Nothing here is a checkout, so there is no submit
button in the purchase path at all.

| `variant` | Use |
|---|---|
| `ink` (default) | The normal primary. Ink, not accent: the accent is spent on the one band that commits a plane, and a page with an accent button in every section is the confetti this system exists to avoid. |
| `accent` | The single committed action |
| `outline` | Secondary. Takes `--color-line-strong`, never `--color-line`. |

`external` adds `target="_blank" rel="noopener"`, an arrow glyph and an "(opens in a new tab)"
screen-reader note.

On `[data-on-accent]` the ink button inverts to a white fill with the plane's blue as its text. Both
are pinned, so the pair measures 5.91:1 in either theme.

### `<PendingAction>` · `.pending`

A destination that does not exist yet. **Not a disabled button:** a disabled control implies it will
work once you satisfy something, and this will not work until a fact lands. It reads as a note and
is not focusable.

### `<ExternalLink>`

Inline external link with the arrow and the same screen-reader note.

### `<ArrowLink href size>`

An **internal** link that carries the corner arrow. Use it for every "go to" link in a rail,
sidebar or footer column.

It exists because the arrow has to be a property of the component rather than something each call
site remembers to type. The docs rail shipped without one while two other hand-rolled copies of the
same link had it, and nothing in the build could catch that.

---

## Grouped lists · `.navgroup` and `.navlist`

One label over one list, repeated on three surfaces: the docs rail, the `/docs` sidebar and the
footer columns.

```html
<div class="navgroup">
  <h2 class="label label-sm">Get it running</h2>
  <ul class="navlist"> … </ul>
</div>
<div class="navgroup"> … </div>
```

`.navlist` sets the gap between items and the gap under the label. `.navgroup + .navgroup` sets the
gap between groups. Both read the `--nav-y-*` tokens in `tokens.css`, so **the rhythm changes in one
place and all three surfaces move together.**

**Two values, not three.** The handoff prototypes set 9px between items, 14px under a label and 28px
between groups. Once line boxes are added that renders as roughly 28 / 31 / 44, close enough that a
label reads as one more list item and the groups run into each other. The label binds to its own list
at the same 9px and the separation is carried entirely by the 40px between groups.

Each surface had its own hardcoded copy of those numbers before, which is why fixing the spacing on
`/docs` left the docs rail and the footer wrong. **A repeated measurement belongs in a token, not in
three files.**

The first item in a rail has to be a `.navgroup` too, even when it is a lone title: the adjacent
sibling selector has nothing to space against otherwise, and the first heading lands on top of it.

---

## Unknown values

### `<Fact value format fallback>` and `<Price value currency>`

Render a `Maybe<T>`. When the value is `PENDING` they emit a visible placeholder (`not announced`,
`$--`) rather than a guess. See [`ARCHITECTURE.md`](ARCHITECTURE.md#the-data-layer).

### `<ImageSlot caption ratio>` · `.slot`

A dimensioned empty box that reserves its own aspect ratio, which is what keeps CLS under 0.05. The
page has to look finished with every one of them empty.

### `<BrowserFrame url caption>` and `<PhoneFrame caption>`

Wrap a desktop or 9:19.5 mobile capture. `BrowserFrame` shows the real demo URL, or
`demo url not announced` when it is still `PENDING`.

### `<Tag>`

A bordered mono chip. Marketplace, type, category.

---

## Chrome

| Component | Notes |
|---|---|
| `<Header>` | Sticky, `min-h-[78px]`, sized around the 46px detail mark. Mobile is a disclosure rather than a full-screen drawer: five nav items do not need a modal. Esc closes it, focus returns to the trigger, and the trigger reports its own state. |
| `<Footer>` | Four groups: brand, Products, Resources, Company. A group only lists routes that exist. The brand block carries a positioning line, never a tenure line. |
| `<ThemeToggle>` | system → light → dark, persisted. Never colour-only: icon plus the mode as a word. `components/dev/ThemeToggle.tsx` is a separate, simpler one for `/_dev`. |

---

## CSS classes

All in `@layer components` in `globals.css` unless noted.

| Class | Is |
|---|---|
| `.rule` | The measurement rule: hairline, ticked at both ends via pseudo-elements |
| `.label` / `.label-sm` | Mono label, uppercase, tabular, 400. 12px speaks, 11px files. |
| `.eyebrow` | The tide tick before a subject-opening sub heading |
| `.rail` | Dashed section header with a mono label at each end |
| `.hatch` / `.hatch-fine` | 45 degree hatching for an unfilled image box. 11px and 9px stripes. |
| `.hero-divider` | The hero's dotted vertical column, 6 on 6 |
| `.spec` / `.spec-head` / `.spec-row` | The specification plate: bordered term/value table, mono throughout, one hairline per row |
| `.numeral` | The ghosted ordinal, mono 34px in the line colour |
| `.ticks` | The footer's opening scale, 8px of ticks on a 24px pitch |
| `.slot` | The reserved image box |
| `.doc-shell` / `.doc-rail` / `.doc-rail-inner` / `.doc-body` | The `/docs` sidebar-and-content split. The hairline is on the column so it spans the band; the inner list sticks. Collapses to a stack under **lg**. |
| `.doc-section` | Anchor target with `scroll-margin` clearing the sticky header |
| `.code` / `.code .prompt` | Console transcript on the pinned code plane, scrolling inside itself |
| `.btn` / `.btn-ink` / `.btn-accent` / `.btn-outline` | Buttons |
| `.pending` | The not-yet-real marker |
| `.tabular` | `font-variant-numeric: tabular-nums` |
| `.ta-lockup` / `.ta-mark` / `.ta-mark-detail` / `.ta-wordmark` | The lockup, in `brand.css` |

### The `[data-on-accent]` contract

Anything muted is unreadable on the accent plane. Rather than relying on each call site to remember,
`globals.css` restates the defaults for everything carrying a muted colour:

```css
[data-on-accent] .label,
[data-on-accent] .pending,
[data-on-accent] .rail > *,
[data-on-accent] .spec-row dt { color: var(--color-on-accent); }
```

**Put `data-on-accent` on the section, not on each child.** Utilities still win over this block,
because utilities are a later layer.

---

## Conventions for new work

- Component CSS goes in `@layer components`. Unlayered CSS beats every Tailwind layer, which has
  already shipped a contrast failure here three times.
- Logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start`/`end`) so RTL is free.
- Lucide icons only. Never hand-draw an SVG icon. The brand mark is not an icon.
- Wide content scrolls inside its own `overflow-x: auto`; the body never scrolls horizontally.
- Money, versions, dates and counts are always `tabular-nums`.
- Both themes, every change, at 1440 / 1024 / 768 / 390.
- Exactly one `h1` per route.

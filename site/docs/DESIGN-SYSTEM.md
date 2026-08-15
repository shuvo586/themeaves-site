# Design system, direction 1a "Blueprint"

A precision engineering document you happen to buy software from. Structure is carried by a visible
grid and hairline rules.

**No cards, no shadows, no gradients, no glow, nothing floating.** There are no shadow tokens and
that is deliberate: depth here is a 1px line and a one-step surface tint. A component that seems to
need a shadow is wrong.

`src/styles/tokens.css` is the contract. Never invent a hex, a radius or a shadow.

---

## 1. Colour

### Primitives

Raw values. **Never reference these from a component.** They exist so the semantic layer has
something to point at and so a hue can be retuned in one place.

```
Light                     Dark                      The mark
--bp-paper        #F4F5F7 --bp-void        #0C0F14  --bp-mark-navy   #243D59
--bp-white        #FFFFFF --bp-panel       #141922  --bp-mark-sun    #FBD101
--bp-ink          #14181F --bp-chalk       #E8EBF0  --bp-mark-tide   #33BFB3
--bp-slate        #5A6472 --bp-ash         #97A0AE  --bp-mark-flare  #FD4717
--bp-line-light   #D3D8E0 --bp-line-dark   #232A35
--bp-line-light-2 #767D89 --bp-line-dark-2 #606A79
```

The four mark hexes are what the ThemeAves bird is drawn in, as published. **The page accent is
derived from them rather than invented alongside them:** `--bp-signal` *is* the mark's navy, so the
page and the logo agree.

`--bp-signal-lift: #759CC7` is derived, not given: navy at the same hue and saturation, lifted in
lightness until it clears AA on both dark grounds. `#243D59` as text on `#0C0F14` is 1.72:1, so dark
cannot use the navy itself.

**A green accent was tried and reverted on 2026-08-13.** `#00733D` measured correctly everywhere and
still failed, for a reason no ratio catches: SlotDesk's product theme is already green, so
`/docs/slotdesk` and the site frame around it became two greens and the product switch stopped
reading as deliberate. Navy against leaf is what makes a manual obviously the product's. Do not
revisit the green without also solving `.theme-slotdesk`.

Contrast of the mark hexes on `--bp-paper`, computed:

| | Ratio | Usable as |
|---|---|---|
| navy | 10.20 | text, and the page accent |
| flare | 3.32 | large text and UI edges only |
| tide | 2.08 | **fill only** on a light ground |
| sun | 1.48 | **fill only** on a light ground |

Which is exactly how the mark uses them: solid bars on a navy body.

### Semantic roles

A component may only ever name a role. These flip with the theme.

| Token | Light | Dark | Job |
|---|---|---|---|
| `--color-bg` | paper | void | the page |
| `--color-surface` | white | panel | the one-step tint that makes a band |
| `--color-ink` | ink | chalk | text |
| `--color-muted` | slate | ash | secondary text |
| `--color-accent` | signal | signal-lift | the single accent |
| `--color-secondary` | tide | tide | fill in light, text in dark. See below. |
| `--color-on-secondary` | navy | navy | the only text colour a tide plane takes |
| `--color-line` | line-light | line-dark | **decorative only** |
| `--color-line-strong` | line-light-2 | line-dark-2 | anything bounding a control |
| `--color-ring` | signal | signal-lift | focus |

### Two line weights, and the split is not cosmetic

- **`--color-line`** is decorative: dividers, hairlines, section edges. It is 1.31:1 against
  the page and that is correct, because WCAG 1.4.11 does not govern decoration.
- **`--color-line-strong`** bounds controls: input borders, the outline button, checkbox and radio
  edges. Those do need 3:1, so they get their own token.

Using `--color-line` on a control is a real accessibility failure, not a style preference. 1a's
published table has only one line value, which would have put form borders at 1.31:1.

### Pinned tokens

Declared outside the flipping blocks, deliberately.

```
--color-accent-plane   #243D59   identical in both themes
--color-on-accent      #FFFFFF   11.13:1 on the plane
--color-ring-on-accent #FFFFFF   the accent ring is invisible on the accent plane
```

**The rule: a surface whose job is to carry text is pinned, and its text partner is pinned with
it.** On a pinned plane a literal `#FFFFFF` is correct, not a token violation.

The plane is 1.72:1 against `--bp-void`. That number looks alarming and is the wrong test: 1.72
would fail for text, but this is a large surface transition, which 1.4.11 does not govern and which
the eye reads from area rather than ratio. Rendered and checked in both themes; the closing band
separates cleanly in dark. **Do not "fix" it with a border.**

### Secondary, and the inversion that is easy to get wrong

Tide is `--color-secondary` in both themes and behaves oppositely in each:

- On a **light** ground it is 2.08:1. **Fill only. Never text.**
- On a **dark** ground it is 8.45:1, a perfectly good text colour.

A tide plane takes navy text at 4.90:1 and white text at 2.27:1, so the pairing is navy-on-tide,
never white-on-tide. That is how the mark uses it too: a tide bar against navy structure.

The site uses tide in exactly one form, as a fill: the `.eyebrow` tick.

### Colour discipline

1a publishes its own and the build is held to it: **at most two colour moments per page**, with
**one band committing at least 30% of its height**. Everywhere else is quiet.

The two failure modes are the boundaries, and both were paid for already:

- Twenty-four tiny colour events painting 0.08% of the page is one wall.
- A single 660px plane that is 55% empty is the other.

**The budget is currently full.** The homepage spends it on the closing accent plane and the eyebrow
tick, and the chrome carries the four-hex mark at both ends of every page. Nothing else should reach
for colour without removing something.

### Product themes

A manual reads in the colours of the product it documents. `.theme-slotdesk` in `tokens.css`
section 4b reassigns the semantic roles for everything inside it: SlotDesk's canvas `#FAF7F2`,
spruce ink, leaf green `#17B890`.

**The header and footer sit outside the wrapper and stay ThemeAves.** The frame is constant; the
band between it belongs to the product. The route applies it as `theme-${manual.slug}`, so a second
manual is a second block of custom properties and nothing else.

Nothing in a component changes, because a component names a role and never a colour.

Two rules carried over from the main palette, and both bit:

- **Leaf inverts like tide.** 2.37:1 as text on SlotDesk's light canvas, 9.96:1 on its dark one. So
  light uses a darkened `#108064` for type and dark uses leaf directly.
- **The plane is spruce carrying white**, at 14.58:1, pinned in both themes.

  It was leaf carrying spruce. That measured 5.76:1 and passed, and it still read wrong: a saturated
  mid-green band with near-black type on it, and a near-black button with green type inside that.
  Changed 2026-08-13 after looking at the rendered band rather than the number.

  **White is what a closing band wants, and leaf is 2.53:1 under white**, so the plane was the half
  that had to move. Leaf keeps every other job: `--color-secondary`, the eyebrow tick, and every fill
  in the manual. It is still the product's colour, it is just not the plane.

Three of SlotDesk's own values failed our law and were derived up: their muted (4.22 on their own
canvas), their control border (1.21, and it bounds controls so it needs 3.0), and leaf as text. All
three replacements hold hue and saturation and are recorded with their ratios in `tokens.css`.

Inside a product theme, `--color-secondary` on the accent plane becomes the text partner, because
there the plane *is* secondary and a tick filled with it disappears. ThemeAves is deliberately
excluded: its plane is navy and its tick is tide, which is the mark's own pairing.

### Contrast is computed, never eyeballed

`site/_dev/tokens.html` recomputes every ratio live from the resolved custom properties, on load and
on every theme change. Open it after touching a colour token.

A saturated colour that passes as text on paper does **not** automatically pass as a background
under text. Those are two different tests.

Tightest margins currently held, worth knowing before anything is retuned:

| Pair | Ratio | Needs |
|---|---|---|
| the plane against bg, dark | 3.25 | 3.0 |
| line-strong on surface, dark | 3.22 | 3.0 |
| line-strong on bg, dark | 3.51 | 3.0 |
| on-accent on the plane, both themes | 5.91 | 4.5 |

---

## 2. Type

| Family | Weights | Carries | Token |
|---|---|---|---|
| Archivo | variable 400..800 | display, headings, buttons, the wordmark | `--font-display` |
| IBM Plex Sans | 400 | body copy | `--font-body` |
| IBM Plex Mono | 400, 500 | labels, rails, spec values, prices, versions | `--font-mono` |

**Four font files against a ceiling of four.** The budget is full: adding a family or a weight means
removing one.

| Token | Value | Notes |
|---|---|---|
| `--text-display` | `clamp(2rem, 1.2rem + 3.4vw, 3.5rem)` | 32 at 390, 45 at 768, the published 56 from ~1100 |
| `--text-h2` | 26 / 1.15 / 700 / -0.01em | |
| `--text-h3` | 20 / 1.25 / 700 / -0.005em | |
| `--text-body` | 16 / 1.6 / 400 | |
| `--text-small` | 14 / 1.55 | |
| `--text-label` | 12 | a label that **speaks**: hero eyebrow, step marker, nav |
| `--text-label-sm` | 11 | a label that **files**: rail, panel header, footer column head, legal line |
| `--measure` | 68ch | maximum line length for prose |

Mono labels are always uppercase, always tabular, always weight 400. At this size extra weight
closes the counters.

1a publishes a single 56px display size, which is right at 1440 and unusable at 390 where it costs
six lines for one sentence. Hence the clamp.

**Money, versions, dates and counts are always `tabular-nums`**, everywhere. `:where(time, data,
.tabular)` handles it.

Banned families: Poppins, Montserrat, DM Sans, Plus Jakarta Sans, Manrope, Nunito, Raleway.

---

## 3. Space and grid

8px base. The grid is not an invisible helper here; it is the signature device.

```
--spacing-1..9    4  8  16  24  32  48  64  96  128
--section-y       96    standard section rhythm         (48 under 768)
--section-y-major 128   a section that opens a subject  (64 under 768)
--gutter-x        24 at 390
--gutter-x-wide   48 from 768 up
```

96 and 128 are correct at 1440 and read as dead air at 390, which is one half of the failure mode
the brief calls the tall empty plane. Hence the max-width query.

**Container width is 1280.** `<Container>` is `max-w-[80rem]` with `px-6 md:px-12`, measured off the
handoff prototypes: every rail, divider and column edge in those files derives from it, so changing
it moves the whole page off the design.

Use **logical properties** (`ms-`, `me-`, `ps-`, `pe-`, `start`/`end`) so RTL is free.

Wide content (tables, code, rails) scrolls inside its own `overflow-x: auto`. **The body never
scrolls horizontally**, at any width. Verify with `document.documentElement.scrollWidth`.

---

## 4. Shape and motion

```
--radius        2px      near square, everything
--radius-full   9999px
--border        1px
--border-strong 1.5px    the wordmark lockup
--ring-width    2px
--ring-offset   2px
--duration      160ms    0ms under prefers-reduced-motion
--ease          linear   a drawing instrument does not ease
```

No shadow tokens, deliberately.

---

## 5. The signature devices

All are classes in `@layer components` in `globals.css`.

### The section rail, `.rail`

What makes the page read as a specification rather than a landing page: a dashed rule spanning the
container with a mono label at each end. The left names the section, the right states a fact about
it. The right label drops out below 640, where two mono strings on one line wrap into an unreadable
stack.

### The eyebrow tick, `.eyebrow`

A 36 by 3 tide stripe on a 12px gap, before the mono sub heading that opens a subject.

**Tide is a fill here and never a word.** The sub heading itself keeps `--color-accent` or
`--color-on-accent`. On the pinned plane the stripe is the mark's own pairing, a tide bar against
navy, which is how `brand/mark.svg` uses the two together.

One tick per subject-opening sub heading: three on home (hero, flagship, closing plane) and one on
each of `/products`, `/license`, `/licenses`, `/demos`. **Not** on interior rails, not on
the three step markers, not on the product breadcrumb. Same hue at the same size in the same
position reads as one recurring device rather than as seven colour events.

### The hatch, `.hatch` / `.hatch-fine`

45 degree hatching filling every screenshot box that has no capture yet, 11px and 9px stripes. It is
what stops the page reading as broken while the real images are missing, and it is on concept: in a
technical drawing, a reserved area is drawn, labelled and left blank.

### The tick rail, `.ticks`

8px of 1px ticks on a 24px pitch, opening the footer. A scale, not a border.

### The ghosted ordinal, `.numeral`

Mono at 34px in the line colour, so it reads as a printed register mark rather than as content.

---

## 6. The mark

The ThemeAves bird. Geometry is `brand/mark.svg` coordinate for coordinate. `BirdMarkDetail` is that
file; `BirdMark` is a reduced drawing of the same four shapes.

**`brand/mark.svg` is the good master.** Never source the mark from `uploads/` in the old handoff
archive; that copy has its `<defs><style>` emptied, so every hex is gone and it renders flat black.

### Two variants

| Variant | Use | Keeps |
|---|---|---|
| `BirdMark` / `bird-compact.svg` | below 64px, which in practice means the generated icon set | The three wing bars, no outline. Four shapes unioned by one fill, so the shape's edge **is** the outline and the bars are cut back out of it. |
| `BirdMarkDetail` / `bird.svg` | above 64px, and the chrome | The eye, the outline strokes, the fold shadows, the upper wing ring. |

Thin things die first at a small size and solid colour dies last. That ordering is why the reduced
variant drops the 18px stroke and keeps the bars. **It keeps the bars deliberately:** a bird
silhouette on its own is generic, and the bars are what make the mark ours.

Both variants face **right**, matching the live ThemeForest identity. `brand/mark.svg` is drawn
facing left, so every shipping surface mirrors it rather than re-drawing it: the path data stays
identical and only the reflection differs.

### Two colour modes

| Mode | How | When |
|---|---|---|
| **Single colour** | default, inherits `currentColor` | Anything on an unknown ground. It cannot be wrong. |
| **Multicolour** | opt in with `data-colour` | The published logo: navy carrying sun, tide and flare, each hue used twice exactly as the master assigns them. |

Multicolour pins four literal hexes and is therefore only correct on a surface those four were drawn
against. It is a **light-ground** mode: the knockouts are a literal white, so the white body carries
the shape on either theme, but the navy outline has little to say against a dark page.

**The `data-colour` block is last in `brand.css` on purpose.** Every rule touching
`--ta-mark-field` is a class plus one attribute, the same specificity, so order decides. Declared
higher up it loses to `[data-on-surface]` and puts a dark body on the mark in dark, while looking
perfectly fine in light because `--color-surface` is `#FFFFFF` there.

Custom properties, so a placement can retune without a second file:

```
--ta-mark-ink      structure, eye, fold shadows      defaults to currentColor
--ta-mark-field    the knockouts, matching the ground behind
--ta-mark-accent   single-colour fallback            --color-muted on the detail variant
--ta-bar-1/2/3     sun / tide / flare, when multicolour
```

`--ta-mark-accent` is not `currentColor` on the detail variant: the three bars sit directly on their
own fold shadows, which are structure and therefore `currentColor`, and setting both to the same
value merges them into a solid blob with hairline gaps.

### What the chrome ships

Header and footer run **`variant="detail"` with `colour`**: `brand/mark.svg` in full, in its
published colours, at 46px. `.ta-lockup[data-variant="detail"]` sets `--ta-mark-h: 2.4em`, which is
where the outline, the eye and the fold shadows still separate. The header bar is 78px to hold it.

---

## 7. The wordmark

**THEME AVES**: all capitals, one weight at 800, tracked at 0.08em, with a word space between the
halves. Set to the published lockup on the ThemeForest profile banner and in `brand/_source/78.jpg`.

- **Tracking is not decoration.** Without it, 800-weight capitals close up and the word reads as one
  dark bar. A negative `margin-inline-end` cancels the trailing track so the lockup measures to the
  S rather than to the space after it.
- **Two words on the drawing only.** The brand name stays `ThemeAves` in prose, in `site.name`, in
  metadata and in JSON-LD.
- **Colour is `--color-ink`, not the banner's navy.** Navy is 1.72:1 on `--bp-void`, so a literal
  match would need the lifted accent in dark, and a powder-blue wordmark is further from the banner
  than a near-black one. Change this only with a dark render in hand.

Sizes are `sm` 15px, `md` 19px, `lg` 24px, set with `--ta-size`; everything else scales from it.
Below 390 the whole lockup steps down to 15px, because tracked capitals beside the full mark
otherwise outrun a 320px viewport and put a horizontal scroll on the body.

---

## 8. Copy rules

Brief rules, not preferences, and enforced in review.

- **No tenure signalling anywhere.** No founding year, "since 2018", member-since badge or
  years-of-experience figure, including OG images and JSON-LD.
- **No invented numbers, prices, versions or dates.** The blanks are tracked in
  `../../docs/FACTS.md` and ship as visible placeholders.
- **Headings are claims, not labels.** Buttons say what happens; never "Learn more" alone, never
  "Click here".
- **No em dashes and no exclamation marks.**
- None of: revolutionary, cutting-edge, seamless, empower, unlock, game-changing, solution.
- Marketplace names appear as plain text links. No Envato logos, no badges, no layout implying
  partnership.

# ThemeAves - Design Correction Pack (v1.1)

**Status:** ⬜ Not yet re-run in Claude Design
**Applies to:** `themeaves-brand-website-design-prompt-2026-08-11.md` (v1.0, still the base brief)
**Triggered by:** first design handoff (`Themeaves kit icon sizing`, 2026-08-11) rejected on visual quality
**Scope:** homepage composition + kit gaps. The logo is out of scope and stays as shipped.

---

## 0. What this document is

v1.0 is not being replaced. It was a good brief and most of it was ignored. This pack does three things:

1. **Part A** records exactly where the first attempt drifted from v1.0, so the same drift is not repeated.
2. **Part B** adds the rule class v1.0 was missing: **section composition**. v1.0 specifies 24 components in detail but never says how sections combine, so the agent used one layout five times and was technically compliant.
3. **Part C** rewrites §7.2 (Home) as a countable spec, and **Part D** gives an acceptance checklist that can actually be failed.

**The governing change in this pack:** v1.0 described personality (*"editorial confidence"*, *"asymmetry"*, *"restraint"*) and personality does not survive contact with a generator. Every rule below is a number, a count, or a ban. If a rule cannot be checked by measuring the rendered page, it does not belong in this document.

---

## Part A - Drift audit (what went wrong)

Measured from `ThemeAves Home.dc.html` rendered at 1440x1000.

| # | v1.0 said | The mockup did | Severity |
|---|---|---|---|
| A1 | §4: Display = **Familjen Grotesk**, body = **Inter** | **Space Grotesk** + **IBM Plex Sans** | **Critical** |
| A2 | §2: WingEdge shear **2-4°** | one shear, `polygon(0 22px, ...)` = **0.87°** at 1440, reads as flat | **Critical** |
| A3 | §2: "The crease is our signature" | **1** crease on the entire page (the browser frame) | **Critical** |
| A4 | §2 banned list: "Centered-everything layouts" | FAQ head and closing CTA are `text-align:center` | High |
| A5 | §7.2.1: art column "bleeding off the inline-end edge" | art fully contained inside the 1180 container | High |
| A6 | §7.2.8: closing CTA is a **`--flare` plane** | rendered `--ink` → **zero coral plane anywhere on the page** | High |
| A7 | §4: section rhythm **144px** desktop | 88 / 96 / 104 / 112, improvised per section | Medium |
| A8 | §7.2.2: proof band "must not read as a nav row" | three cards titled *Read the docs* / *See what changed* / *How support works* - literally nav labels | Medium |
| A9 | §6.2: PlaneStripe is "the most reusable brand cue" | used **7+ times** including above every bullet; repetition read as filler | Medium |
| A10 | §6.1: FoldCard has `crease` + `accent` | homepage cards use neither crease nor the FoldCard hover contract | Medium |
| A11 | §7.2.6: Reviews x2 | omitted (permitted by v1.0) but nothing replaced it, so the page has no human element at all | Low |

**Net effect:** five consecutive sections share one layout (eyebrow → display heading → 3 columns), stacked as hard-edged full-bleed bands in cream / beige / navy / cream / navy, with the three brand colours appearing only as 4px decorative dashes. The result reads as navy + beige + grey. It is the kit's *fallback state*, not the kit.

### What was actually good and must be preserved

Do not regenerate these from scratch:

- **The colour token model.** Splitting fill-only planes (`sun` / `tide` / `flare`) from text-safe deeps (`tide-deep` / `flare-deep` / `sun-deep`), with `--on-solid` / `--on-warm` pinned so they do not flip with theme, plus "paper, never pure white". This is the strongest part of the handoff. Keep it verbatim.
- **The spacing scale, radii ladder and `--crease: 18px`.**
- **The copy.** "A small studio that folds things carefully", "The things a competitor with an abandoned item can't fake", "We fold one thing at a time". This is on-voice per §5 and better than most of the design around it. Keep the copy and rebuild the composition under it.
- **The `/_dev/kit` page itself** as an artifact. It is a legitimate design-system document. Its problem is not quality, it is that the homepage does not consume it.

---

## Part B - Section composition system (new; v1.0 had no equivalent)

This is the missing rule class. It is inserted as **§2.5** of the base brief.

### B1. Archetype rotation

Every homepage section is one of these six archetypes. **No two adjacent sections may use the same archetype, and no archetype may be used more than twice on the page.**

| Key | Archetype | Shape |
|---|---|---|
| `SPLIT` | Asymmetric split | 7/5 or 5/7 text + art, art bleeds past the container on one side |
| `GRID` | Card grid | 2-up or 3-up cards, left-aligned head |
| `BAND` | Full-bleed plane | ink or flare fill, edge to edge, content inset to container |
| `LEDGER` | Hairline rows | stacked full-width rows with hairline dividers, no cards |
| `STACK` | Editorial stack | one wide column at 62-70ch offset from the container start, no columns |
| `RAIL` | Horizontal rail | overflowing horizontal strip of tiles, container-start aligned |

**The `eyebrow → display heading → 3 equal columns` pattern is `GRID` and may appear at most once.** The first attempt used it five times consecutively.

### B2. Band budget

Counted per page:

- Full-bleed **`--ink` bands: maximum 2**, and they may not be adjacent, and not both in the final third of the page.
- Full-bleed **`--flare` plane: exactly 1**, and it is the closing CTA. Non-negotiable, this is the only saturated colour moment on the page.
- **`--fold` sections: maximum 2.**
- Everything else is `--paper`. Paper is the default state, not a section type.
- The footer's `--ink-deep` does not count against the ink budget, but **the section immediately above the footer may not be `--ink`.** (v1.0 attempt ended navy band → navy-deep footer, which is why the bottom third of the page has no structure.)

### B3. Shear is measured in degrees, not pixels

`<WingEdge>` shear angle is **2.5° to 4.0°, measured at 1440px wide**. At 1440 that is a **63px to 100px rise across the full width**. A 22px rise is 0.87° and is a bug, not a subtle choice.

Two per page maximum (unchanged from v1.0). They must be on *non-adjacent* boundaries, and the two shears must lean in **opposite directions** so the page reads as folded rather than tilted.

Flatten to 0° below 640px (unchanged).

### B4. Crease budget

**Minimum 3, maximum 6 creased corners per page.** v1.0 said "used with restraint, one per composition" and the agent read that as one per *page*. Restate: one per *composition*, and the homepage has at least three compositions that warrant one (hero art frame, the flagship phone frame, and at least one card group).

Rotate the corner: not every crease is `tr`. The kit already ships `tr` / `tl` / `br` / `bl`.

### B5. The stripe is rationed

`<PlaneStripe>` appears at most **3 times per page**:

1. The eyebrow of the single most important section.
2. The eyebrow of one other section.
3. The footer divider.

**Banned uses:** above bullet points, above the closing CTA, as a card ornament, more than once inside one section. It is a brand cue and it stops being one at the seventh repetition.

### B6. Colour presence floor

At least **one section where a plane colour (`sun` / `tide` / `flare`) occupies 15% or more of the viewport at 1440x900.** A 4px rule is decoration and does not count.

This is what the closing `--flare` plane (B2) is for. If the flare plane is present and full-bleed, this rule is satisfied. If it is dropped again, the page fails.

### B7. Alignment axis is locked

**Zero `text-align: center` on the homepage above 768px.** No exceptions, including the FAQ head and the closing CTA. The closing CTA takes its emphasis from the plane fill and type scale, not from centring.

Below 768px, centring is still discouraged but not banned.

### B8. Vertical rhythm is fixed

- Section rhythm: **144px desktop / 96px mobile.** Not 88, not 104, not 112. A section may double to 288 for deliberate breathing room, but may never improvise an intermediate value.
- **No section may end with more than 64px of empty space before its boundary.** The first attempt left roughly 300px of dead space at the bottom of "How we build" because the band height was set independently of its content.
- Content in a full-bleed band is vertically centred within that band.

### B9. The lead is mandatory

Every section heading is followed by a **`lead` (19-21px)** paragraph before any 17px body copy. The first attempt jumped display-lg straight to 17px, which is why the type scale reads compressed despite being correctly specced in §4.

### B10. One memorable thing

The page must contain **exactly one element a visitor could describe from memory afterwards.** Not a gimmick and not motion for its own sake. The default choice, unless the design finds something better:

> The hero's `<BrowserFrame>` and `<PhoneFrame>` are arranged as two folded wing planes at complementary angles (roughly +3° and -5°), overlapping, with the browser frame **clipped by the viewport edge, not by the container**. The crease on the browser frame's top-right aligns visually with the shear angle of the first `<WingEdge>` below it.

If the design proposes a different memorable element, it must state what it is in one sentence. "Clean and minimal" is not an answer.

---

## Part C - §7.2 Home, rewritten

Replaces §7.2 of v1.0 entirely. Eight sections, archetypes assigned, budgets pre-allocated.

| # | Section | Archetype | Background | Notes |
|---|---|---|---|---|
| 1 | Hero | `SPLIT` | `--paper` | art bleeds off inline-end past the container |
| 2 | Proof band | `LEDGER` | `--fold` | **shear 1** on its top boundary, leaning down-to-end |
| 3 | Products | `GRID` | `--paper` | the page's one permitted GRID |
| 4 | Flagship: SlotDesk | `BAND` | `--ink` | **ink band 1**, crease 2 on the phone frame |
| 5 | How we build | `STACK` | `--paper` | **not three columns** - see C5 |
| 6 | Demos rail | `RAIL` | `--fold` | **shear 2** on its bottom boundary, opposite lean |
| 7 | FAQ | `LEDGER` | `--paper` | left-aligned, `<details>`, no cards |
| 8 | Closing CTA | `BAND` | `--flare` | **the flare plane**, ink text, one action |

Adjacency check: SPLIT, LEDGER, GRID, BAND, STACK, RAIL, LEDGER, BAND. No repeats adjacent. LEDGER x2 and BAND x2, both within the cap of two. One GRID. Two shears, opposite leans, non-adjacent boundaries. One ink band, one flare plane. Section 7 (`--paper`) sits above the flare CTA, so B2's "no ink directly above the footer" holds.

### C1. Hero - `SPLIT`, `--paper`

- 7/5 asymmetric. Text column starts at the container start; **art column extends past the container to the viewport edge and is clipped by the viewport.**
- Eyebrow: mono small-caps + `<PlaneStripe>` (**stripe use 1 of 3**). States what we make, never tenure.
- display-xl headline, 9 words maximum. Keep "A small studio that folds things carefully."
- `lead` paragraph, 2 lines, 19-21px (B9).
- Two CTAs: `Browse products` (ink) and `Read the docs` (outline). Equal height, same vertical padding, same radius. The first attempt shipped two buttons at visibly different heights.
- Art: `<BrowserFrame>` (SlotDesk dashboard, light 2x) and `<PhoneFrame>` (WhatsApp booking, 390x844) per B10. **Crease 1** on the browser frame, `tr`.
- No mark watermark. The nav carries it.

### C2. Proof band - `LEDGER`, `--fold`

`<WingEdge>` **shear 1** on the top boundary, 3°, leaning down toward the inline-end.

**This is the section that failed hardest and the fix is copy, not layout.** Three cards titled with nav labels read as a nav row. Convert to three **hairline full-width rows**, each with:

- A claim as the title, meaning a sentence with a verb. Not a link label.
- One line of evidence, 17px.
- A `<PlaneStripe orientation="vertical">` marker in `sun` / `tide` / `flare` respectively at the row start. **This is the exception to B5** and is permitted because it is one component instance rendered three times as a list marker, which is its specced role in §6.2. It is not three decorative dashes.
- The link is the whole row, with a trailing arrow at the row end.

Copy direction, to be drafted for approval:

| Bad (v1.0 attempt) | Shape to aim for |
|---|---|
| "Read the docs" | "The full documentation is public before you buy." |
| "See what changed" | "Every release is dated and on the record." |
| "How support works" | "Support scope is written down, in plain words." |

Rows, not cards, also solves the "3 identical icon cards" banned pattern in §2 that the first attempt walked straight into.

### C3. Products - `GRID`, `--paper`

- 2-up desktop, must hold 12 across three types.
- **Image well capped at 46% of card height.** The first attempt gave it roughly 60%, which cramped the title, pitch and price into the remainder.
- Price is **tabular text at the card end**, not a grey pill. The pill treatment made $16 look like a disabled chip.
- Marketplace tag + type tag only. Two chips maximum per card.
- **Crease 3** on the card image well, `br`, on the flagship card only, so the flagship reads as primary without a different card component.
- A `demo`-depth card is not visually demoted (unchanged from v1.0).

### C4. Flagship band - `BAND`, `--ink`

- **Ink band 1 of 2.** Full bleed, content inset to 1180, vertically centred (B8).
- display-lg claim, then a `lead` (B9), then three points as an inline row - **not three bordered columns**, the GRID budget is spent.
- `<PhoneFrame>` with a real booking conversation. **Crease 2**, `bl`.
- Product accent slot active.
- One CTA to the product page.
- On ink, body text uses `--on-solid` at full opacity. Do not fake hierarchy by dropping opacity below 0.75.

### C5. How we build - `STACK`, `--paper`

Deliberately **not** three columns. This is where the first attempt's fifth consecutive 3-column block sat, and it is also where 300px of dead space accumulated.

- One column, 62-70ch, offset from the container start (roughly 2 of 12 columns in), leaving the end margin open. Asymmetry via offset, not via a second column.
- Three points as numbered editorial paragraphs with a mono ordinal, not icon cards. Lucide icon inline at 20px if one earns its place.
- Copy stays specific per §5. "Every release ships a changelog entry and a one-click updater" is right; values filler is not.
- No `<PlaneStripe>` here (B5 budget is spent on hero and footer).

### C6. Demos rail - `RAIL`, `--fold`

New section, not in v1.0. It exists because §7.2 has no section carrying the actual conversion lever, and because the archetype rotation needs a break between STACK and LEDGER.

- Horizontal rail of demo tiles, container-start aligned, **overflowing past the inline-end edge** to signal scrollability without a scrollbar.
- Aonomy has 8 demos; SlotDesk has 1 live app demo. Tiles show a thumbnail, name, and an external-link glyph.
- Scrolls inside its own `overflow-x: auto` wrapper. No arrows, no autoplay, no marquee.
- `<WingEdge>` **shear 2** on the bottom boundary, 3°, leaning **opposite** to shear 1.

### C7. FAQ - `LEDGER`, `--paper`

- 5-6 entries on `<details>` / `<summary>`, hairline dividers, ink chevron, no cards. Unchanged from v1.0 §6.13.
- **Left-aligned head and rows** (B7). The first attempt centred the head over left-aligned rows inside a wide beige band, which is why it looked adrift.
- Constrain the rows to roughly 8 of 12 columns from the container start. Do not centre the column.

### C8. Closing CTA - `BAND`, `--flare`

- **The flare plane.** Full bleed `--flare`, `--on-warm` ink text. This satisfies B6 and it is the only place raw coral appears at scale.
- Left-aligned (B7), not centred.
- One action. The button on flare is **ink fill with `--on-solid` text**. The first attempt's earlier revision put a navy button on a raw coral rectangle with both centred, which was the weakest element in the deck; the fix is left alignment, a real type hierarchy above the button, and generous plane space, not a different colour.
- No `<PlaneStripe>` above it (B5).

---

## Part D - Composition acceptance checklist

Add to §13 of the base brief. Every item is measurable on the rendered page. **These are pass/fail, not guidance.**

**Type**
- [ ] Display face is **Familjen Grotesk**. Body is **Inter**. Mono is **JetBrains Mono**.
- [ ] **Space Grotesk, Poppins, Montserrat, DM Sans, Plus Jakarta Sans and Manrope appear nowhere.** Space Grotesk is banned by name because the first attempt substituted it and it is the single most over-exposed display face in this market.
- [ ] Every section heading is followed by a 19-21px `lead` before any 17px body (B9).
- [ ] Prices, versions and dates are `tabular-nums`.

**Composition**
- [ ] No two adjacent sections share an archetype (B1).
- [ ] The `eyebrow + heading + 3 equal columns` block appears **at most once** (B1).
- [ ] Ink bands ≤ 2, non-adjacent, not both in the final third (B2).
- [ ] Exactly **one** `--flare` plane, and it is the closing CTA (B2).
- [ ] The section directly above the footer is not `--ink` (B2).
- [ ] `--fold` sections ≤ 2 (B2).

**The signature grammar**
- [ ] Both `<WingEdge>` shears measure **2.5-4.0°** at 1440 (63-100px rise). Measure it (B3).
- [ ] The two shears lean in **opposite** directions and sit on non-adjacent boundaries (B3).
- [ ] Creased corners: **3 to 6** on the page, and not all `tr` (B4).
- [ ] `<PlaneStripe>` instances ≤ 3, excluding the proof band's vertical row markers (B5).
- [ ] No `<PlaneStripe>` above a bullet, above the closing CTA, or as a card ornament (B5).
- [ ] At least one section where a plane colour covers ≥15% of a 1440x900 viewport (B6).

**Layout discipline**
- [ ] Zero `text-align: center` above 768px (B7).
- [ ] Hero art column is clipped by the **viewport**, not the container (C1, B10).
- [ ] All section padding is 144px desktop / 96px mobile, or exactly double (B8).
- [ ] No section ends with >64px of dead space before its boundary (B8).
- [ ] Content in every full-bleed band is vertically centred (B8).

**Content**
- [ ] Every proof-band row title is a claim containing a verb, not a nav label (C2).
- [ ] Product card image wells are ≤46% of card height; price is tabular text, not a pill (C3).
- [ ] The page contains one nameable memorable element, and the handoff says in one sentence what it is (B10).

**Regression guard**
- [ ] Re-read Part A. Confirm each of A1-A11 is resolved, item by item.

---

## Part E - Paste-ready prompt for Claude Design

> This is a **revision**, not a new project. The existing token layer, the `/_dev/kit` page and the copy are approved and stay. Only the homepage composition changes.
>
> Read `themeaves-brand-website-design-prompt-2026-08-11.md` (the base brief) and `themeaves-design-correction-2026-08-11.md` (this correction pack). **Part A of the correction pack is an audit of your previous output. Read it first and treat every row as a defect to close.**
>
> **Keep, do not regenerate:** the colour token model including the fill-only / text-safe-deep split and the pinned `--on-solid` / `--on-warm`; the spacing and radii scales; `--crease: 18px`; the `/_dev/kit` page; all homepage copy.
>
> **Fix, in priority order:**
>
> 1. **Fonts.** Display is Familjen Grotesk, body is Inter, mono is JetBrains Mono. Space Grotesk and IBM Plex Sans were substituted last time. Remove them.
> 2. **Rebuild the homepage against Part C.** Eight sections, archetypes as assigned in the table. Every section is a different shape from the one above it. The previous version used one layout five times consecutively and that is the main reason it was rejected.
> 3. **Make the signature grammar visible.** The shears must be 2.5-4° and there must be two of them leaning opposite ways. There must be 3 to 6 creased corners. Last time there was one crease and a 0.87° shear that nobody can see.
> 4. **Restore the flare plane.** The closing CTA is a full-bleed `--flare` section with ink text, left aligned. Last time it was rendered navy, which left the page with no saturated colour at all and three navy surfaces stacked at the bottom.
> 5. **Left-align everything above 768px.** No centred headings, no centred CTA.
> 6. **Ration the stripe.** Three instances maximum, per B5.
>
> Then **self-check against Part D before handing off** and state your measured values for: shear angles in degrees, crease count, PlaneStripe count, and the archetype of each of the eight sections. If any value is out of range, fix it before handing off rather than noting it as a known issue.
>
> Design light and dark, at 375 / 768 / 1280 / 1600.

---

## Open items

- [ ] Confirm Familjen Grotesk is available in the design environment. If it is not, propose two alternatives that are **not** on the Part D ban list, and note that the base brief chose it specifically so the house brand does not read as Bricolage, which is SlotDesk's face.
- [ ] Section 6 (Demos rail) is new. Confirm it is wanted before the re-run, or drop it and promote FAQ to `RAIL`-adjacent spacing. If dropped, re-verify the B1 adjacency chain.
- [ ] Proof-band copy per C2 needs three claim-shaped lines. Draft three options each for approval per §5.
- [ ] The logo is out of scope by decision. Known constraint, recorded not actioned: the striped mark degrades below roughly 32px and the mono silhouette reads closer to a paper plane than a bird. Design around it, use mono below 48px, do not attempt a full-colour favicon.

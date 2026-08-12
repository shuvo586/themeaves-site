# ThemeAves homepage - correction v2 (self-contained build sheet)

**Status:** open - issued 2026-08-11 after attempt 2 (`Themeaves kit icon sizing-handoff.zip`)
**Scope:** `ThemeAves Home.dc.html` only. Nothing else on the site changes.

**This document is self-sufficient. Give the design agent this file and nothing else.**
It absorbs everything from correction v1 that still applies, and resolves the three places
where v1 now contradicts itself. `themeaves-design-correction-2026-08-11.md` (v1) and the
base brief are kept as the historical record - do not hand them over alongside this, and do
not ask the agent to reconcile three documents. That is how attempt 2 happened.

---

## 0. Read this first

**v1 was not implemented.** v1 specified eight homepage sections by name, archetype and
background. Six of eight were built wrong or not built at all. This is not a new direction,
a new palette or a revised brief - it is a request to build the table in §3.

**Do not touch these. They are approved and correct:**

- The token layer. Every hex matches the logo exactly (`#243D59` / `#FBD101` / `#33BFB3` / `#FD4717`).
- The fill-only vs `-deep` split, `--on-solid` / `--on-warm` pinning, "paper, never pure white".
- The `/_dev/kit` gallery. It is the best artifact in the bundle.
- All homepage copy.
- The type ramp (Familjen Grotesk display / Inter body / JetBrains Mono), radii ladder, `--crease: 18px`.

The tokens were never the problem. The page does not spend them.

---

## 1. What was measured

Rendered at 1440x900. Full page 4913px tall.

| Metric | Measured | Required | |
|---|---|---|---|
| Plane colour (`sun`+`tide`+`flare`) as share of page | **0.08%** | >=15% in one section (B6) | ❌ off by ~200x |
| Discrete colour events | **24** | <=6 (B11) | ❌ |
| Sections showing all 3 hues at once | **4** | 0 (B11) | ❌ |
| Full-bleed `--flare` planes | **0** | exactly 1 (B2) | ❌ |
| Centred elements >768px | **5** | 0 (B7) | ❌ |
| Section directly above footer | `--ink` | may not be `--ink` (B2) | ❌ |
| Nav mark rendered size | **34x26px** | 24-48px band must use the **compact** variant | ❌ full mark used |
| `GRID` archetype uses | **3** | max 2 (B1) | ❌ |
| "eyebrow + heading + 3 equal columns" | **2** | max 1 (B1) | ❌ |
| Adjacent sections sharing an archetype | sections 2-3 | none allowed (B1) | ❌ |

**The two numbers that matter are 0.08% and 24.** The three brand colours appear in
twenty-four separate places and still paint almost nothing, because every appearance is a
3-4px edge or hairline. That is confetti: busy and colourless simultaneously. It is why the
logo reads as belonging to a different brand - the bird ends up the single most colourful
object on a 4,913px page. **The mark's colours are not wrong. The page abandoned them.**

---

## 2. The rules

B1-B10 are carried over from v1 unchanged. **B11 is new** and where it conflicts with v1,
B11 wins - the three conflicts are called out in §3.

| | Rule |
|---|---|
| **B1** | Every section is one of `SPLIT` / `LEDGER` / `GRID` / `BAND` / `STACK` / `RAIL`. No two adjacent sections share an archetype. No archetype more than twice. The `eyebrow + heading + 3 equal columns` block is `GRID` and appears **at most once**. |
| **B2** | Full-bleed `--ink` bands: max 2, non-adjacent, not both in the final third. Full-bleed `--flare`: **exactly 1**, and it is the closing CTA. `--fold` sections: max 2. Everything else is `--paper`. **The section directly above the footer may not be `--ink`.** |
| **B3** | Two `<WingEdge>` shears per page, 3°, opposite lean. Never crop text, flatten to 0° below 640px. |
| **B4** | Three creases per page maximum, one per composition. |
| **B5** | `<PlaneStripe>`: see B11 - now once per page. |
| **B6** | At least one section where a plane colour occupies **>=15% of the viewport** at 1440x900. A 4px rule is decoration and does not count. |
| **B7** | **Zero `text-align: center` above 768px.** No exceptions, including the FAQ head and the closing CTA. |
| **B8** | Full-bleed bands inset their content to 1180 and centre it vertically. |
| **B9** | Every section heading is followed by a **19-21px `lead`** before any 17px body. |
| **B10** | One memorable thing: the hero's `<BrowserFrame>` + `<PhoneFrame>` pairing. |
| **B11** | **The colour budget. NEW.** See below. |

### B11 - concentrate, do not sprinkle

Added after the user's own read of attempt 2: *"overcrowded with colors."* That reaction and
the 0.08% measurement are both correct and describe the same defect.

- [ ] **Maximum 6 colour events on the page** (currently 24). A colour event is any element
      painting `sun`/`tide`/`flare` or a `-deep` variant as background, border or text.
- [ ] **One hue per section, maximum. Zero is valid and should be the common case.**
- [ ] **All three hues appear together in exactly one place: the logo.** Nowhere else.
- [ ] **`<PlaneStripe>` appears once on the entire page** - in the hero eyebrow. It shipped
      7 times, three of them inside one section.
- [ ] **No multi-hue rows.** Three sibling cards must not take three different accent edges.
      Give them one hue or none. Prefer none.
- [ ] `flare` carries most of the colour load; it is already the primary CTA colour.
      `sun` and `tide` become rare, large, structural moments.

**Do not resolve this by going monochrome.** The mark is three coloured stripes; a
navy-plus-one-accent page orphans it, which is the complaint that started this.

**B6 and B11 are complementary, not opposed.** B6: one section commits a full plane.
B11: everywhere else goes quiet. Together they read as a disciplined single-accent design
that still owns its mark.

---

## 3. The eight sections - build this table

Delivered rotation was `SPLIT · GRID · GRID · SPLIT · GRID · STACK · BAND`.
Required rotation is `SPLIT · LEDGER · GRID · BAND · STACK · RAIL · LEDGER · BAND`.

### 1. Hero - `SPLIT`, `--paper` ✅ *keep, minor fixes*

- 7/5 asymmetric. Text at container start; **art column extends past the container to the viewport edge** and is clipped by it. Attempt 2 kept the art inside the container.
- Eyebrow: mono small-caps + `<PlaneStripe>`. **This is the page's only stripe (B11).**
- display-xl headline, 9 words max. Keep "A small studio that folds things carefully."
- `lead`, 2 lines, 19-21px (B9).
- Two CTAs, `Browse products` (ink) + `Read the docs` (outline), **equal height and radius** - attempt 1 shipped visibly different heights.
- Art: `<BrowserFrame>` (SlotDesk dashboard, light 2x) + `<PhoneFrame>` (WhatsApp, 390x844). **Crease 1**, `tr`, on the browser frame.
- No mark watermark; the nav carries it.

### 2. Proof band - `LEDGER`, `--fold` ❌ *shipped as 3-col GRID*

`<WingEdge>` **shear 1** on the top boundary, 3°, leaning down toward the inline-end.

**The fix here is copy, not layout.** Three cards titled with nav labels read as a nav row.
Convert to three **hairline full-width rows**, each with a claim as its title (a sentence
with a verb, not a link label), one line of 17px evidence, and the whole row as the link
with a trailing arrow.

| Attempt 2 shipped | Aim for |
|---|---|
| "Read the docs" | "The full documentation is public before you buy." |
| "See what changed" | "Every release is dated and on the record." |
| "How support works" | "Support scope is written down, in plain words." |

> ⚠️ **Conflict resolved.** v1 gave these three rows `sun`/`tide`/`flare` vertical stripe
> markers respectively. **B11 overrides that** - three hues in one section is exactly the
> confetti being removed. Use **hairline `--line` dividers and no colour**, or one single
> hue for all three. Rows not cards also avoids the banned "3 identical icon cards" pattern.

### 3. Products - `GRID`, `--paper` ✅ *archetype correct, content wrong*

- 2-up desktop. The page's **one permitted GRID** (B1).
- **Image well capped at 46% of card height** - attempt 2 gave it ~60%, cramping title, pitch and price.
- **Price is tabular text at the card end, not a grey pill.** v1 said this; the pill shipped anyway, and `$--` in a grey pill reads as a disabled control. `$--` itself is correct - the price is genuinely unknown (`FACTS.md`).
- **Delete the Aonomy bokeh night photo.** It is off-palette (orange/gold/purple) and the only large saturated object on the page, so it fights both the logo and the tokens. Use a real Aonomy screenshot in a `<BrowserFrame>`, or the neutral placeholder. A placeholder beats an off-brand photo.
- Both cards must be in the **same state** - one real photo beside one dashed placeholder reads as unfinished.
- Two chips max per card (marketplace + type). **Crease 3**, `br`, on the flagship card's image well only.
- A `demo`-depth card is not visually demoted.

### 4. Flagship: SlotDesk - `BAND`, `--ink` ❌ *shipped as 2-col SPLIT*

- **Ink band 1 of 2.** Full bleed, content inset to 1180, vertically centred (B8).
- display-lg claim → `lead` (B9) → three points as an **inline row, not three bordered columns**. The GRID budget is spent on §3.
- `<PhoneFrame>` with a real booking conversation. **Crease 2**, `bl`.
- Product accent slot active (SlotDesk's leaf) - this is one hue and satisfies B11.
- One CTA to the product page.
- On ink, body text is `--on-solid` at full opacity. Do not fake hierarchy by dropping below 0.75.

### 5. How we build - `STACK`, `--paper` ❌ *shipped as 3-col GRID*

**Deliberately not three columns.** v1 said this in bold and it shipped as three columns anyway.

- One column, 62-70ch, **offset from the container start** (~2 of 12 columns in), leaving the end margin open. Asymmetry via offset, not a second column.
- Three points as numbered editorial paragraphs with a mono ordinal - not icon cards. One 20px Lucide icon inline only if it earns its place.
- No `<PlaneStripe>` (B11 - the budget is the hero).
- Copy stays specific. "Every release ships a changelog entry and a one-click updater" is right; values filler is not.

### 6. Demos rail - `RAIL`, `--fold` ❌ *never built*

Carries the actual conversion lever, and breaks the STACK→LEDGER adjacency.

- Horizontal rail of demo tiles, container-start aligned, **overflowing past the inline-end edge** to signal scroll without a scrollbar.
- Aonomy has 8 demos; SlotDesk has 1 live app demo. Tiles: thumbnail, name, external-link glyph.
- Scrolls inside its own `overflow-x: auto` wrapper. No arrows, no autoplay, no marquee.
- `<WingEdge>` **shear 2** on the bottom boundary, 3°, leaning **opposite** to shear 1.

### 7. FAQ - `LEDGER`, `--paper` ❌ *shipped centred on `--fold`*

- 5-6 entries on `<details>` / `<summary>`, hairline dividers, ink chevron, **no cards**.
- **Left-aligned head and rows** (B7). Attempt 2 centred the head over left-aligned rows in a wide beige band, which is why it looked adrift.
- Rows constrained to ~8 of 12 columns from the container start. **Do not centre the column.**
- Background is `--paper`, not `--fold` - the fold budget is spent on §2 and §6.

### 8. Closing CTA - `BAND`, `--flare-deep` ❌ *rebuilt 2026-08-11 PM and still wrong - see the corrections below*

**Two things were wrong in the 2:46 PM export. Read both before rebuilding.**

> ⚠️ **Correction 1 - the plane colour and text colour were wrong in this document.**
> An earlier revision of this file said "full-bleed `--flare`, `--on-warm` ink text". That was
> carried over from correction v1 and it is wrong twice over. Measured WCAG contrast:
>
> | Combination | Ratio | AA body (4.5:1) |
> |---|---|---|
> | `--on-warm` navy on raw `--flare` | **3.23:1** | ❌ what shipped |
> | `--on-solid` white on raw `--flare` | **3.45:1** | ❌ still fails |
> | **`--on-solid` white on `--flare-deep`** | **4.83:1** | ✅ **use this** |
> | `--on-warm` navy on `--flare-deep` | 2.30:1 | ❌ never |
>
> **Raw `--flare` cannot carry body text at any text colour.** The brief's contrast law tested
> the plane colours as text *on paper* and never tested text *on the plane*. So:
> **the plane is `--flare-deep` `#D5350C` and all text on it is `--on-solid` white.**
> Raw `--flare` stays fill-only for shapes that carry no text.

> ⚠️ **Correction 2 - the band was 660px tall with 55% of it empty.**
> Content sat in the left 45% of a very tall saturated rectangle, floating, with a void to the
> inline-end. "Left-aligned" does not mean "content in the left third of a tall box", and
> "generous plane space" does not mean "leave half the plane blank".

- **Band height 380-440px at 1440x900.** Not 660. A short full-bleed strip reads deliberate; a tall one with a void reads like a section that failed to load.
- Content inset to 1180 (B8), **left-aligned** (B7), vertically centred within the band.
- Type ramp does the work: eyebrow → display-lg claim → `lead` (B9) → one button. Nothing on the inline-end half; that emptiness is fine **only** because the band is short.
- One action. Button is **ink fill with `--on-solid` white text** (11.13:1).
- **No glow, no soft halo, no blurred shadow on the plane.** The 2:46 PM export had a light bloom at the bottom-start corner. The brief bans it: nothing blurred, nothing glowing, nothing floating. A crisp `--shadow-sheet` on the button only, or no shadow at all.
- **No `<PlaneStripe>` above it** (B11).
- Because this section is coral, the footer's `--ink-deep` no longer sits under an ink band, which clears B2 as a side effect.

---

## 4. Build order - stop after each for review

1. **§8 closing CTA alone.** It clears B2, B5, B6 and B7 at once and takes plane colour from 0.08% to roughly 12-15% by itself. Confirm before touching anything else.
2. **§2, §4, §5, §6, §7** - the five wrong or missing sections, to the archetypes above.
3. **§3 products + the nav mark.**

**The mark:** it renders at 34x26px, inside the 24-48px band, so it must use the **compact**
variant - interior navy bars and eye dropped, silhouette plus three solid stripes kept. It
currently uses the full detail mark, so the wing stripes collapse into a smudge. Verify the
micro variant at favicon size on both paper and ink.

---

## 5. Self-verify before handing back

Save as `verify-home.cjs`, run it, and paste the output with the deliverable. **Do not hand
back a page that fails.** Nine of the rules are mechanical; a human should not be the one
finding them.

```js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('file://' + process.argv[2]);
  await p.waitForTimeout(2000);
  const r = await p.evaluate(() => {
    const rgb = c => (c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/) || []).slice(1).join(',');
    const HUE = {
      '251,209,1': 'sun', '255,222,61': 'sun', '122,99,0': 'sun',
      '51,191,179': 'tide', '71,214,201': 'tide', '20,131,123': 'tide',
      '253,71,23': 'flare', '255,106,61': 'flare', '213,53,12': 'flare',
    };
    const PLANES = ['251,209,1', '51,191,179', '253,71,23', '213,53,12'];
    const CTA_BG = '213,53,12';                 // --flare-deep, the closing CTA plane
    const area = document.body.scrollWidth * document.body.scrollHeight;
    let plane = 0, flareBleed = 0, centred = 0;
    let ctaH = 0, ctaFill = 0, ctaGlow = 0;
    for (const el of document.querySelectorAll('*')) {
      const bx = el.getBoundingClientRect(), st = getComputedStyle(el);
      if (!bx.width || !bx.height) continue;
      const bg = rgb(st.backgroundColor);
      if (PLANES.includes(bg)) plane += bx.width * bx.height;
      if (st.textAlign === 'center' && el.textContent.trim().length > 3) centred++;
      if (bg === CTA_BG && bx.width >= window.innerWidth * 0.98) {
        flareBleed++;
        ctaH = Math.round(bx.height);
        // how much of the band its content actually occupies
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (const c of el.querySelectorAll('*')) {
          const r2 = c.getBoundingClientRect();
          if (!r2.width || !r2.height) continue;
          x0 = Math.min(x0, r2.left); y0 = Math.min(y0, r2.top);
          x1 = Math.max(x1, r2.right); y1 = Math.max(y1, r2.bottom);
        }
        if (x1 > x0) ctaFill = +(((x1 - x0) * (y1 - y0)) / (bx.width * bx.height) * 100).toFixed(1);
        // any blurred halo on the plane or its children
        for (const c of [el, ...el.querySelectorAll('*')]) {
          const s2 = getComputedStyle(c);
          if (/blur|radial-gradient/.test(s2.backgroundImage) || /\d{2,}px/.test(s2.filter || '')) ctaGlow++;
        }
      }
    }
    const secs = [...document.querySelectorAll('section')];
    let events = 0, triHue = 0;
    for (const s of secs) {
      const hues = new Set();
      for (const el of s.querySelectorAll('*')) {
        const bx = el.getBoundingClientRect(), st = getComputedStyle(el);
        if (!bx.width || !bx.height) continue;
        for (const prop of ['backgroundColor', 'borderTopColor', 'borderLeftColor', 'color']) {
          if (prop === 'color' && el.children.length) continue;
          const h = HUE[rgb(st[prop])];
          if (h) { events++; hues.add(h); break; }
        }
      }
      if (hues.size >= 3) triHue++;
    }
    // contrast of every text node sitting on the CTA plane
    const lum = (s) => {
      const v = s.split(',').map(n => +n / 255)
        .map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
      return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
    };
    let worstCta = 21;
    const band = [...secs].find(s => rgb(getComputedStyle(s).backgroundColor) === CTA_BG);
    if (band) {
      for (const el of band.querySelectorAll('*')) {
        if (el.children.length || !el.textContent.trim()) continue;
        const [a, b] = [lum(rgb(getComputedStyle(el).color)), lum(CTA_BG)].sort((m, n) => n - m);
        worstCta = Math.min(worstCta, +(((a + 0.05) / (b + 0.05)).toFixed(2)));
      }
    }
    const last = secs[secs.length - 1];
    return {
      planePct: +((plane / area) * 100).toFixed(2),
      flareBleed, centred, events, triHue,
      ctaHeight: ctaH, ctaFillPct: ctaFill, ctaGlow, ctaWorstContrast: worstCta,
      inkAboveFooter: rgb(getComputedStyle(last).backgroundColor) === '36,61,89',
      sections: secs.length,
    };
  });
  const fail = [];
  if (r.planePct < 15) fail.push(`B6 plane colour ${r.planePct}% (need >=15%)`);
  if (r.flareBleed !== 1) fail.push(`B2 full-bleed --flare-deep planes = ${r.flareBleed} (need exactly 1)`);
  if (r.centred > 0) fail.push(`B7 centred elements = ${r.centred} (need 0)`);
  if (r.inkAboveFooter) fail.push('B2 section above footer is --ink');
  if (r.sections !== 8) fail.push(`section count = ${r.sections} (need 8)`);
  if (r.events > 6) fail.push(`B11 colour events = ${r.events} (need <=6)`);
  if (r.triHue > 0) fail.push(`B11 sections with 3 hues = ${r.triHue} (need 0)`);
  if (r.ctaHeight < 320 || r.ctaHeight > 460) fail.push(`CTA band height ${r.ctaHeight}px (need 380-440, hard 320-460)`);
  if (r.ctaFillPct < 35) fail.push(`CTA content fills ${r.ctaFillPct}% of its band (need >=35% - no giant void)`);
  if (r.ctaGlow > 0) fail.push(`CTA plane has ${r.ctaGlow} blurred/glow layers (need 0)`);
  if (r.ctaWorstContrast < 4.5) fail.push(`CTA text contrast ${r.ctaWorstContrast}:1 (need >=4.5 - use white on --flare-deep)`);
  console.log(JSON.stringify(r, null, 2));
  console.log(fail.length ? 'FAIL\n- ' + fail.join('\n- ') : 'PASS');
  await b.close(); process.exit(fail.length ? 1 : 0);
})();
```

---

## 6. Definition of done

- [ ] `verify-home.cjs` prints `PASS`.
- [ ] Eight sections, archetypes per §3, no two adjacent alike, `GRID` used once.
- [ ] Closing CTA is a full-bleed **`--flare-deep`** plane, left-aligned, **380-440px tall**, white text at **>=4.5:1**, no glow.
- [ ] <=6 colour events, one hue per section, three hues together only in the logo (B11).
- [ ] `<PlaneStripe>` appears exactly once, in the hero.
- [ ] Rendered in **both themes** at **1440 / 1024 / 768 / 390**, no horizontal body scroll.
- [ ] No off-palette photography anywhere.
- [ ] Nav mark uses the compact variant.
- [ ] Every section heading followed by a 19-21px `lead` (B9).

---

## 7. Prompt to open with

> Read this document in full before writing any code. It is self-contained - do not go
> looking for the earlier correction pack or the base brief, and do not reconcile them
> against this. Everything that still applies is in here.
>
> Correction v1 specified eight homepage sections; six were built wrong or omitted. Do not
> redesign anything: the tokens, kit, copy and type ramp are approved and must not change.
> Build the eight sections in §3.
>
> Work in the order in §4 and stop after each step for review: (1) the closing CTA alone, as
> a full-bleed `--flare` plane, left-aligned, ink button; (2) the five wrong or missing
> sections; (3) products and the nav mark.
>
> The colour direction is the part most likely to be misread, so state it back to me before
> you start. The page currently has **24 tiny colour events totalling 0.08% of its area, with
> all three hues appearing in four different sections**. That is confetti - busy and
> colourless at the same time. The target is the opposite: **at most 6 colour events, one hue
> per section, one section committing a full flare plane, and all three hues together only in
> the logo.** Do not resolve this by going monochrome - the mark is three coloured stripes and
> a navy-only page orphans it, which is the complaint that started this.
>
> Before handing back, run `verify-home.cjs` (§5) and paste its output. If it prints FAIL,
> it is not done.

# ThemeAves site documentation

Reference for the site as it is built today, 2026-08-13. Written by reading `src/`.

## Which file answers which question

| Question | File |
|---|---|
| What is the stack, what routes exist, how does data reach a page | [`ARCHITECTURE.md`](ARCHITECTURE.md) |
| What colour, type, space and shape may I use | [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md) |
| What component or CSS class already exists for this | [`COMPONENTS.md`](COMPONENTS.md) |
| How do I add a page, add a product, change the mark, ship | [`RECIPES.md`](RECIPES.md) |
| Why is it like this, what was tried and rejected | [`../BUILD.md`](../BUILD.md) |
| What real-world facts are still missing | [`../../docs/FACTS.md`](../../docs/FACTS.md) |

These four files describe the current state. `BUILD.md` is the chronological record of decisions and
the failures that produced them, and is history rather than a lookup.

**When any document disagrees with the code, the code is right.** Fix the document.

## The one rule

**Never call a UI change done without rendering it and looking at the image.**

```bash
cd site && npm run build && npx next start -p 3210
node tools/shot.cjs http://localhost:3210/ home      # then OPEN shots/*.png and LOOK
```

Scripts catch what is countable. They cannot tell you a band is 660px tall with a void in it, that a
composition is dead, or that a label is invisible **in one theme only**. Two of the three contrast
failures this project has shipped were invisible in dark and obvious in light.

## What is built

Thirteen artefacts prerender, all reviewed in both themes at 1440 / 1024 / 768 / 390:

`/` · `/products` · `/products/slotdesk` · `/products/aonomy` · `/demos` · `/docs` ·
`/docs/slotdesk` · `/docs/slotdesk/before-you-start` · `/docs/slotdesk/install` · `/support` ·
`/_dev/brand` · `404` · `/manifest.webmanifest`

**The documentation is live but deliberately unlinked.** Two manuals are public: SlotDesk AI with
its 20 chapters, and Aonomy with its 12. Both are reachable from `/docs`, which is the deliberate
entry point; the nav and the footer stay off the manuals until the site has more than one product
family of documentation worth surfacing. Flipping the nav slot on is one line, in
[`RECIPES.md`](RECIPES.md#publish-the-documentation).

## What is not built, and why

Blocked on content, never on design or the stack. Every blocker is a ❌ row in
[`../../docs/FACTS.md`](../../docs/FACTS.md).

| Route | Needs |
|---|---|
| `/changelog` | SlotDesk to have shipped a version |
| `/about` | A real name and public handle |
| `/terms`, `/privacy`, `/refunds` | Legal text, to be written rather than generated |

Real documentation and a changelog are **launch blockers**, not nice-to-haves. The homepage claims
the documentation is public and that every release is dated. Both currently render without a link
and with a "not published yet" marker, which is honest, but shipping a credibility band whose claims
cannot be checked is the exact problem that band exists to solve.

Two further gaps worth knowing:

- **`cms-theme` has never been rendered.** The product template branches on `type`, and the third
  branch is unproven. Stub one and screenshot it before trusting it.
- **The page grammar is applied to one route.** `PageHero`, `Rail`, `Cols`, `Col` and `Band` in
  `primitives.tsx` are used by `/support` only; every other route hand-rolls the equivalent markup.
  This is fallout from skipping the component kit step. Prefer the components in new work.

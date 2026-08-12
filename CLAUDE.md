# CLAUDE.md - ThemeAves

Design-stage working directory for the ThemeAves brand site. Read `README.md` for layout
and `docs/CORRECTION-V2.md` for the actual build sheet.

**Not the SlotDesk repo.** ThemeAves is the author brand; SlotDesk is a product sold on it.
Separate palettes, separate tokens, separate directories. Never import SlotDesk's
spruce/leaf tokens or its `.sd-*` CSS layers here.

## Environment

- Lives at `/var/www/html/themeaves` in WSL. From Windows tooling reach it as
  `\\wsl.localhost\Ubuntu\var\www\html\themeaves` - the Git Bash tool has no `/mnt/c`.
- **No `npm install` here and no `node_modules`.** `tools/pw.js` resolves Playwright out of
  `/var/www/html/codecanyon/node_modules`. If a tool fails to find a module, fix the resolve
  path; do not install into this directory.
- Static HTML only. Do **not** scaffold Next.js yet - that is blocked on the ❌ rows in
  `docs/FACTS.md`, not on design.

## ⚠️ This directory is the only copy

The originals were deleted from the codecanyon repo on 2026-08-11 and **no git repo has been
initialised here** (the user's call). Nothing in `docs/` or `brand/_source/` is backed by a
second copy or by history. Treat every file as irreplaceable: never delete or overwrite in
place, and never `rm -rf` a directory here to "clean up".

## The one rule that matters

**Never call a UI change done without doing both of these:**

```bash
node tools/verify-home.cjs             # must print PASS
node tools/shot.cjs design/home.html   # then open shots/*.png and LOOK
```

The script catches what is countable. It cannot tell you a band is 660px tall with a void
in it, or that a photo is off-palette. Three design rounds failed exactly there: every
written rule satisfied, the result unusable on sight. Render it, open the PNG, judge it.

## Source of truth, in order

1. `docs/CORRECTION-V2.md` - the build sheet. Wins every conflict.
2. `design/kit.html` - approved tokens and components. The contract.
3. `_dev/brainstorm/themeaves-brand-website-design-prompt-2026-08-11.md` - the brief;
   background and copy. Loses to CORRECTION-V2.
4. `_dev/handoff/kit-icon-sizing/` - the raw Claude Design export, archive only.

⚠️ **The archive's own `README.md` is boilerplate and is wrong twice**: it calls
`ThemeAves Home.dc.html` "the primary design they want built" (it is **attempt 2, rejected**)
and it says not to render or screenshot the files (the exact opposite of the rule above).
Read `_dev/handoff/kit-icon-sizing/INDEX.md` before touching that folder.

⚠️ **The `mark.svg` inside that archive has its colours stripped** - empty `<defs><style>`,
so every brand hex and stroke is gone and the bird renders flat black. The good logo is
`brand/mark.svg`. Never source the mark from `uploads/`.

## Design system

- **Tokens are approved and frozen.** `design/kit.html` is the contract. Never invent a hex,
  radius or shadow; never "improve" the palette.
- Logo hexes are the token hexes: navy `#243D59`, sun `#FBD101`, tide `#33BFB3`, flare `#FD4717`.
- **Contrast law, corrected 2026-08-11:** `--sun` / `--tide` / `--flare` are **fill-only** and
  fail AA as text on paper. They also fail as *backgrounds under text* - white on raw
  `--flare` is only 3.45:1. Text on a coral plane requires **`--flare-deep` `#D5350C` +
  white = 4.83:1**. `--sun` and `--tide` as text-bearing fills are **untested** - compute the
  ratio before using them that way.
- `--on-solid` (white) and `--on-warm` (navy) **do not flip with theme**. A literal `#fff`
  there is correct, not a token violation.
- Type: Familjen Grotesk display / Inter body / JetBrains Mono. Never Space Grotesk, Poppins,
  Montserrat, DM Sans, Plus Jakarta Sans or Manrope.
- Money, versions, dates, counts: always `tabular-nums`.

## Colour budget (rule B11)

The recurring failure is confetti - many tiny colour moments, none committed.

- Max **6 colour events** on the page; **one hue per section**, zero is the common case.
- All three hues together **only in the logo**.
- `<PlaneStripe>` **once per page**, in the hero.
- One section commits a full plane (the closing CTA). Everywhere else stays quiet.
- Do **not** fix this by going monochrome - the mark is three coloured stripes and a
  navy-only page orphans it.

## Conventions

- Logical properties (`ms-`, `me-`, `ps-`, `pe-`, `start`/`end`) so RTL is free.
- Lucide icons only. Never hand-draw an SVG icon.
- Wide content (tables, code, rails) scrolls inside its own `overflow-x: auto`; the body
  never scrolls horizontally.
- No blur, no glow, no floating. Hard edges and flat planes.
- Both themes, every change, at 1440 / 1024 / 768 / 390.

## Copy

No tenure signalling anywhere - no founding year, "since 2018", member-since badge or years
figure, including OG images and JSON-LD. Headings are claims, not labels. No em dashes, no
exclamation marks, none of: revolutionary, cutting-edge, seamless, empower, unlock,
game-changing, solution.

## Git

Never run git in this repo. The user performs all git operations themselves.

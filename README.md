# ThemeAves

The Envato author brand site. Read `CLAUDE.md` for the working rules and **`site/docs/` for the
reference manual**.

## What this is right now

The site is built in `site/`, a Next.js 16 + Tailwind v4 app, against direction **1a "Blueprint"**
chosen 2026-08-12. Eleven artefacts prerender and are reviewed in both themes at four widths: the
homepage, the product index and template, `/demos`, `/support`, `/license`, `/licenses`, the brand
proof page, 404 and the manifest.

What is left is blocked on content, not on design: `/docs`, `/changelog`, `/about` and the legal
pages. Every blocker is a ❌ row in `docs/FACTS.md`.

Everything outside `site/` is private working material: the brief, the research, the design
commissions, the rejected attempts and the tooling.

## Layout

```text
site/                 the deployable site  <- the work
  docs/               the reference manual <- START HERE
  src/                app, components, data, styles
  public/brand/       the mark and the generated icon set
  BUILD.md            build order, status, every decision and why
_dev/brainstorm/      themeaves-site-design-prompt-v2 <- the brief
_dev/handoff/         the design commissions. directions-preference is round 4 and
                      carries direction 1a. Read each INDEX.md before its README.
docs/FACTS.md         the real-world data blanks; ❌ rows block the unbuilt pages
docs/CORRECTION-V2.md the retired page system, history only
brand/                mark.svg + mark.png, the good master; _source/ holds the
                      originals, including the published lockup in 78.jpg
assets/aonomy/        8 demo thumbnails + banner
tools/shot.cjs        screenshots a file or a URL at 4 widths, both themes
tools/icons.cjs       regenerates the icon set from site/public/brand/favicon.svg
shots/                rendered output, reproducible, safe to overwrite
```

## The loop

```bash
cd site && npm run build && npx next start -p 3210
node tools/shot.cjs http://localhost:3210/ home   # then LOOK at shots/*.png
```

**Both steps, every time.** Four rounds satisfied the letter of their spec and failed on sight,
because nothing in the loop ever looked at the output. Scripts catch what is countable; they do not
catch a dead composition or a label that is invisible in one theme only.

## The brand

The bird is the published ThemeAves identity and it is unchanged: `brand/mark.svg` is the master,
`brand/_source/78.jpg` is the published lockup, and the header and footer render the master in full,
in its original four hexes.

The **page** palette is a separate thing: cool neutrals plus a single accent, and that accent is
derived from the mark's own navy rather than invented alongside it.

## Superseded

`docs/CORRECTION-V2.md` and `_dev/handoff/kit-icon-sizing/` describe the retired navy/sun/tide/flare
**page** system, along with Familjen Grotesk, the `--flare-deep` law, the `<PlaneStripe>` rule and
B1-B11. They are history. Do not build from them and do not reconcile them against the brief;
reconciling documents is how three attempts failed.

The mark's four hexes are **not** part of what was retired. See the brand note above.

Prompt v2 section 0 opens "There is no logo. There is no existing brand identity." That claim is
false and always was. Everything else in the brief survives the correction intact and still governs
voice, the fact rules and accessibility.

## ✅ Git

The user runs all git operations. Two repositories since 2026-08-16: `site/` is its own repo (the
one Vercel deploys, root `/`), and this repo holds everything else with no root `.gitignore`, so
the private directories above are inside it and stageable.

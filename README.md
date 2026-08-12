# ThemeAves

The Envato author brand site. **Design stage** - this is not the shipping site yet.

## What this is right now

A working directory for correcting the homepage design before any real site code exists.
`design/home.html` is the current homepage mockup (imported from the Claude Design export
of 2026-08-11 12:51 PM, "attempt 2"). It fails the design gates and is being fixed here,
section by section, against `docs/CORRECTION-V2.md`.

## Layout

```text
design/home.html      the homepage being corrected  <- the work
design/kit.html       the component + token gallery (APPROVED, do not change)
docs/CORRECTION-V2.md the build sheet - 8 sections, rules B1-B11, done criteria
docs/FACTS.md         the real-world data blanks; ❌ rows block the real site build
_dev/brainstorm/      themeaves-site-design-prompt-v2 <- the live brief for the new design;
                      the v1 brief and CORRECTION-V1 sit beside it as history
_dev/handoff/         HANDOFF.md, and the raw Claude Design export - read its INDEX.md first
_dev/reference/       attempt 2 and 3 renders, kept for diffing
brand/                mark.svg + mark.png (licensed); _source/ holds the originals
assets/aonomy/        8 demo thumbnails + banner
tools/verify-home.cjs the gate - exits non-zero on any measurable rule failure
tools/shot.cjs        screenshots both themes at 1440/1024/768/390
```

## The loop

```bash
node tools/verify-home.cjs        # measurable rules, exits 1 on failure
node tools/shot.cjs design/home.html   # then LOOK at shots/*.png
```

**Both steps, every time.** Three previous rounds passed the letter of the spec and failed
on sight, because nothing in the loop ever looked at the output. The script cannot judge
composition; it only catches what is countable.

## Status

Baseline (attempt 2, unmodified) was **7 gate failures**. Now **0** - `verify-home.cjs`
prints `PASS`, and every slice was opened and looked at in both themes.

Build order (from `docs/CORRECTION-V2.md` §4), all three steps done 2026-08-11:

- [x] **§8 closing CTA.** `--flare-deep` plane, 410px, left-aligned, white text at 4.83:1,
      no glow.
- [x] **§2, §4, §5, §6, §7** - the five wrong or missing sections, rebuilt to the §3 table.
      Rotation is now `SPLIT · LEDGER · GRID · BAND · STACK · RAIL · LEDGER · BAND`.
- [x] **§3 products + the nav mark.** Both cards in the same placeholder state, price as
      tabular text, off-palette Aonomy banner deleted. The mark uses a real micro variant.

Gate reading at 1440x900:

```text
biggest plane 45.6% of viewport   flare-deep planes 1   centred 0   sections 8
colour events 5 (flare 3 · tide 1 · sun 1)             sections with 3 hues 0
CTA 410px · fills 69.9% · glow 0 · worst contrast 4.83:1
```

### Fixed globally along the way

- **Fonts.** The page shipped `Space Grotesk` (banned by name) x18 and `IBM Plex Sans` for
  body. Now `Familjen Grotesk` + `Inter` + `JetBrains Mono`, verified loading.
- **Pinned band fills.** `--ink` was doing two incompatible jobs - heading text (must flip
  with theme) and dark band fill (must not), so the flagship band turned near-white in dark.
  Added `--band-ink` / `--band-flare`, pinned in both themes, and re-pinned `--on-solid` to
  white (attempt 2 had it flipping to `#0E141C`, which the brief forbids).
- **`--on-solid` on a flipping fill.** `.tav-btn-ink` was white-on-`--ink`, which is 1.05:1
  in dark theme because `--ink` inverts and `--on-solid` does not. An `--ink` fill takes
  `--paper`; only a *pinned* plane takes `--on-solid`. The band CTA uses `--on-solid` fill
  with `--on-warm` text, both pinned.
- **Responsive layer finished.** The file had **zero** media queries. Every section now
  carries its own rules at 1100 / 900 / 820 / 640, and the footer's 4-column grid - the last
  thing forcing horizontal scroll at 390 - collapses.
- **The nav mark.** `#tav-compact` was the full detail mark under a misleading name, so the
  wing stripes smudged at 34x26. Replaced with `#tav-micro`: ink silhouette plus the three
  solid stripes, no interior bars, no outline stroke, no eye.

## Not yet decided

The real site is **Next.js + Tailwind v4 + MDX** per the brief, but it is blocked on the ❌
rows in `docs/FACTS.md` - SlotDesk is not listed on CodeCanyon yet, so there is no URL,
price, item id or launch version, and no demo instance or support details. Do not scaffold
the app until those exist. This directory stays static HTML until then.

No git repo has been initialised here. That is the user's call.

# Claude Design handoff - "Themeaves kit icon sizing"

Exported 2026-08-11 12:51 PM from claude.ai/design, unpacked here **verbatim**. Nothing in
`README.md` or `project/` has been edited, renamed or pruned. This is the archive of what
the design tool was given and what it returned, kept because three design rounds failed and
the inputs are evidence.

## Read this before you follow the bundle's own README

`README.md` is boilerplate written by Claude Design, and **two of its instructions are wrong
for this project**:

1. *"Read `ThemeAves Home.dc.html` ... it's almost certainly the primary design they want
   built."* It is not. That file is **attempt 2, which the user rejected**. The build sheet
   is `docs/CORRECTION-V2.md`.
2. *"Don't render these files in a browser or take screenshots."* Do the opposite. Rendering
   and looking is the one non-negotiable step here - see `CLAUDE.md`. Every failed round
   satisfied the written spec and failed on sight precisely because nothing looked.

The one thing it gets right: `ThemeAves Kit.dc.html` and its imports are the approved
contract for tokens and components.

## What is already live elsewhere in this repo

Verified byte-identical by SHA-256 on 2026-08-11. Use the working copy, not the archive:

| Archive file | Working copy |
|---|---|
| `project/ThemeAves Kit.dc.html` | `design/kit.html` |
| `project/support.js` | `design/support.js` |
| `project/image-slot.js` | `design/image-slot.js` |
| `project/ThemeAves Home.dc.html` | `_dev/reference/home-attempt2.html` (pristine attempt 2) |
| `project/uploads/Themeaves-kit-icon-sizing-08-11-2026_12_51_PM.png` | `_dev/reference/attempt2-full.png` |
| `project/uploads/themeaves-brand-website-design-prompt-2026-08-11.md` | `_dev/brainstorm/themeaves-brand-website-design-prompt-2026-08-11.md` |
| `project/uploads/themeaves-website/FACTS.md` | `docs/FACTS.md` |
| `project/uploads/themeaves-website/README.md` | `_dev/handoff/HANDOFF.md` |
| `project/uploads/themeaves-website/brand/mark.png` | `brand/mark.png` |
| `project/uploads/themeaves-website/aonomy/*` | `assets/aonomy/*` |
| `project/assets/aonomy-banner.jpg` | `assets/aonomy/banner.jpg` |

`design/home.html` intentionally **differs** from the archived Home - it is attempt 2 with
the §8 rebuild and the global font/token/responsive fixes on top.

## ⚠️ The uploaded mark.svg had its colours stripped

`project/uploads/themeaves-website/brand/mark.svg` (2,640 B) is **not** the same file as
`brand/mark.svg` (3,012 B). The uploaded copy has an **empty `<defs><style>` block**: every
`.cls-1` … `.cls-7` rule - all four brand hexes and both stroke definitions - is gone, so
the mark renders as flat default black with no strokes.

That is the file the design tool actually received. Keep it here as evidence and **never
use it as the logo**; `brand/mark.svg` is the good one and its hexes match the tokens
exactly.

## Contents not duplicated anywhere else

- `project/scraps/{01..04}-tokens.png`, `project/scraps/brand.png` - crops of the Kit page
  (section headings, the ink/surface swatch rows) used to point the tool at specific spots.
- `project/uploads/pasted-*.png` - screenshots pasted into the design conversation: a
  usage-limit "Paused" card showing the tool's own remaining checklist, and two Kit renders
  (form controls / nav / feedback, and the ThemeToggle three-state row) in dark theme.
- `project/.thumbnail` - the tool's project thumbnail.

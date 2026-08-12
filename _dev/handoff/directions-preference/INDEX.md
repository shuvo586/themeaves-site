# Claude Design handoff - "Themeaves directions preference"

Exported 2026-08-12 from claude.ai/design, unpacked here **verbatim**. Nothing in `README.md`
or `project/` has been edited, renamed or pruned. This is round 4: the response to
`_dev/brainstorm/themeaves-site-design-prompt-v2-2026-08-11.md`, which threw out the whole
inherited brand system and asked for fresh directions.

## Read this before you follow the bundle's own README

`README.md` is the same Claude Design boilerplate as the previous bundle, and **it is wrong in
the same two ways**:

1. *"Read `ThemeAves Support.dc.html` ... it's almost certainly the primary design they want
   built."* It is not. Support is one of six equally-weighted page prototypes, and the only
   file that carries a decision is **`ThemeAves Directions.dc.html`**.
2. *"Don't render these files in a browser or take screenshots."* Do the opposite. See
   `CLAUDE.md` - rendering and looking is the one non-negotiable step in this project.

## ⚠️ The frozen tokens are no longer frozen

`CLAUDE.md` and `docs/CORRECTION-V2.md` describe navy `#243D59` / sun `#FBD101` / tide
`#33BFB3` / flare `#FD4717` and Familjen Grotesk as approved and frozen. **Prompt v2 supersedes
both**, and it is the newest document in the repo:

| When | What |
|---|---|
| 2026-08-11 14:50 | `docs/CORRECTION-V2.md` - build sheet for the logo-derived system |
| 2026-08-11 18:01 | `design/home.html` - attempt 3, rejected |
| 2026-08-11 18:34 | `_dev/brainstorm/themeaves-site-design-prompt-v2-2026-08-11.md` |
| 2026-08-12 | **this bundle** |

Prompt v2 §0 opens: *"There is no logo. There is no existing brand identity. There is no palette
to inherit... A mark will be designed later, after this system exists."* It puts the entire
visual system back on the table and explicitly says the earlier warm paper, folded corner,
three-stripe motif and navy headline are *"not precedent, it is just what happened before."*

So the colour-budget rule B11, the `--flare-deep` contrast law and the `<PlaneStripe>` rule in
`CLAUDE.md` all belong to the retired system. **Do not apply them to anything in this bundle,
and do not import them into whatever gets built next.** `design/kit.html` is now archive.

## What is in here

### `ThemeAves Directions.dc.html` - the deliverable, and the pending decision

The prompt v2 §5 proposal: three distinct systems, each with concept, full light/dark token
table with printed contrast ratios, type ramp, grid, shape, signature device, motion, and the
home hero rendered at 1440 in both themes. Reference them by id in chat.

| id | Name | Palette | Type | Signature device |
|---|---|---|---|---|
| `1a` | **Blueprint** | cool neutral + signal blue `#1B4DFF`, light-first | Archivo + IBM Plex Mono | the measurement rule - ticked lines with coordinate labels |
| `1b` | **Console** | near-black + phosphor amber `#F2A93B`, dark-first | JetBrains Mono + IBM Plex Sans | line-number gutter rail and a blinking block caret |
| `1c` | **Press** | warm paper + one clay band `#B23A1E`, light-first | Newsreader + Public Sans | oversized outlined margin numeral and running index |

Each publishes its own colour discipline as §5.3 requires: 1a two moments per page with one
band committing >=30% of its height, 1b at most three amber moments with one committing >=25%
of a band, 1c two moments with a single full-bleed clay band.

**All 29 printed contrast ratios were recomputed here on 2026-08-12 and every one is correct
to the decimal.** The claim "measured, not eyeballed" holds. Two unlisted hero colours do not:
1b light's amber eyebrow `#b5791a` on `#FAFAF9` is 3.52:1 and 1c's band eyebrow `#F6C9BC` on
clay is 3.98:1, both set at 12-13px, so both fail AA body. Neither is in a token table; they
are hero-only and cheap to fix.

### The six page prototypes - all of them are `1a` Blueprint, and they overshot

`Home`, `Pricing`, `Docs`, `Changelog`, `Support`, `Components`. Interlinked with relative
hrefs, so opening `ThemeAves Home.dc.html` walks the whole set. Every one uses Archivo + IBM
Plex Mono, `#1B4DFF` on `#F4F5F7`, `#14181F` ink.

Prompt v2 §5 ends *"Then stop and wait. Do not build the kit, do not build a page"*, and §0
makes it the one process requirement. These six exist anyway. Treat them as an unrequested
preview of 1a, not as an approved build - **and note that if you have not actually chosen 1a,
the choice is still open.** Three things to know before reading them as finished:

- **They are light theme only.** No dark counterpart exists for any of the six; only the
  `Directions` heroes render both. Dark is unbuilt, not merely unshown.
- **They fill the blanks prompt v2 §12 forbids filling.** `$59` (11 times) and `$295` (3
  times) for prices, `v1.0.0` through `v1.4.0`, and five release dates from `2026-02-04` to
  `2026-07-28`. Every one is a ❌ row in `docs/FACTS.md`. The `Directions` heroes get this
  right, showing `$—` and `v—`. Strip the invented figures back to placeholders before any of
  this copy is reused.
- **`#8a8f98` is off-token and fails AA.** It appears 20-44 times per page at 9.5-12px,
  carrying the section rails (`HOME · SELF-HOSTED SOFTWARE`), panel headers (`SPECIFICATION`)
  and image-slot captions. On paper `#F4F5F7` it measures **2.98:1**. 1a's own token table
  never lists it - its muted is `#5A6472` at 5.50:1. So the failure lands on 1a's signature
  device, which is the exact class of bug prompt v2 §5.2 was written to prevent.

Em dashes run through all seven files (44 in `Directions`, 10 in `Home`). They violate the
global no-em-dash rule and need sweeping out of any copy carried forward.

## Already live elsewhere in this repo

Verified byte-identical by SHA-256 on 2026-08-12. Use the working copy, not the archive:

| Archive file | Working copy |
|---|---|
| `project/support.js` | `design/support.js` |
| `project/uploads/themeaves-site-design-prompt-v2-2026-08-11.md` | `_dev/brainstorm/themeaves-site-design-prompt-v2-2026-08-11.md` |

Nothing else in the bundle is duplicated. There are no assets, no `image-slot.js` and no
uploaded images this round - `project/.thumbnail` is the tool's own project thumbnail.

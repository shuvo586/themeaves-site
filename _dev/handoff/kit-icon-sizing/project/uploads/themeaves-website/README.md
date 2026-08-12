# ThemeAves Website - Handoff Bundle

Everything the design agent needs to start. Created Aug 11, 2026.

## What's in here

```text
_dev/handoff/themeaves-website/
  README.md          # this file - hand-off instructions
  FACTS.md           # the data blanks to fill; becomes data/site.ts
  brand/
    mark.svg         # the logo, renamed from "Artboard 3.svg" -> public/brand/mark.svg
    mark.png         # raster fallback
  aonomy/
    *-thumbnail.jpg  # the 8 demo thumbnails, 800x377 (variant gallery rail)
    banner.jpg       # 2000x1331, the only large Aonomy asset
```

**The brief itself lives at `_dev/brainstorm/themeaves-brand-website-design-prompt-2026-08-11.md`** - one canonical copy, deliberately not duplicated here. Move it to the site repo root as `DESIGN_BRIEF.md` once that repo exists, and delete the original so it can't drift.

## Reference: the SlotDesk UI design project

**https://claude.ai/design/p/0748ea3b-c190-4f42-9fe5-bf59042a452b?via=share**

The source design for the SlotDesk app screens. Open it in Claude Design for screen references and SlotDesk's own visual language when building its product page, docs and `--product` accent.

- **Accessible from Claude Design**, in a logged-in claude.ai session.
- **Not retrievable programmatically** - it returns 403 to CLI/API fetches, so no build step may depend on fetching it.
- **The shipped app wins over the design file** wherever they differ. Marketing screenshots come from the running app, not from design exports - a buyer comparing your screenshots against `demo.themeaves.com` will notice any drift.
- SlotDesk's accent colours are already known and need no lookup: ink `#0E2E28`, leaf `#17B890` (from `resources/css/brand.css`).

## Not in here, and why

- **`78.eps` / `78.jpg`** from the logo download - 5.5MB, nothing uses them. Keep them in your own archive.
- **The logo licence PDF** - keep it with your records, outside any deployed folder.
- **`logo.png`** from the Aonomy zip - that's the old *Aonomy product* logo, not the ThemeAves mark. Easy to confuse; left out on purpose.
- **The 26 Aonomy documentation screenshots** - only needed if Aonomy is ever promoted to a full product page.
- **The Aonomy demo HTML files** - not in the zips you have. They come from the original item package, and they go to the host as-is (brief §9.4), not through the design agent.
- **SlotDesk screenshots** - not captured yet. See the checklist in `FACTS.md`; the hero cannot be built without them.

## How to hand it over

1. **Create the site repo** (open decision #1 - separate repo recommended; different stack, different deploy cadence).
2. Copy `DESIGN_BRIEF.md` to its root, `brand/*` to `public/brand/`, `aonomy/*` to wherever the product content lives.
3. Fill the ❌ rows in `FACTS.md`. Anything still blank becomes a placeholder that ships.
4. Start the agent on **build order §12 steps 1-3 only**: tokens → brand assets → the `/_dev/kit` component gallery. Stop there.
5. **Review the kit yourself before any page exists.** It's the visual contract - if the crease, the three-stripe motif and `<FoldCard>` are wrong there, every one of the 14 routes inherits it. Cheapest possible place to catch a wrong direction.
6. Then §12 steps 4-10, one route at a time, each finished in both themes at all four widths before the next.

## Prompt to open with

> Read `DESIGN_BRIEF.md` in full before writing any code. Then execute build-order steps 1-3 only (Section 12): the token layer, the brand asset size ladder, and the `/_dev/kit` component gallery showing every state of every component in both themes. Stop after the kit and show me. Do not build any page yet.
>
> Hard constraints from the brief that are easy to violate by reflex: no hardcoded hex, px radius or ad-hoc shadow anywhere (Section 4); `--sun`/`--tide`/`--flare` are fill-only and fail AA as text on paper; no tenure signalling of any kind (Section 0 rule 1); no blog and no contact form (Section 1.3); Lucide icons only, never hand-drawn SVG.

## Three things to verify yourself, independent of the build

1. **Does your ThemeForest Live Preview URL currently resolve?** `themeaves.com` isn't live, so it may be 404ing on an item that's still selling. Fix this first - it's costing money right now and has nothing to do with the new site.
2. **Does the Aonomy demo's contact form work?** Determines open decision #4. It very likely doesn't, which makes the answer easy.
3. **Can your PHP host run cron and a queue worker?** The SlotDesk demo's nightly reset needs both. If it can't, that's a VPS, and it's worth knowing before the demo work starts rather than after.

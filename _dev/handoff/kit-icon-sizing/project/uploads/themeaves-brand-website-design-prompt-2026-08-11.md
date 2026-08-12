# ThemeAves - Brand Website Design Brief (Claude Design) (v1.0)

**Created:** August 11, 2026
**Status:** ⬜ Not started - this doc is the design + build source of truth
**For:** the design/implementation agent (`frontend-design` skill). Output = **runnable Next.js + Tailwind code**, not a design file.

**What this is:** the company website for **ThemeAves**, our Envato author brand. It is *not* the SlotDesk AI app UI and it does not share SlotDesk's spruce/leaf palette. SlotDesk AI is one **product** on this site; the ThemeForest item *Aonomy* is another.

**Companions:**
- `_dev/handoff/slotdesk-ai-brand-visual-system/` - the **product** design system. Read it to understand our craft bar and token discipline; do **not** copy its palette here.
- **SlotDesk UI design project (Claude Design):** https://claude.ai/design/p/0748ea3b-c190-4f42-9fe5-bf59042a452b?via=share - the source design for the SlotDesk app screens. Open it for screen references and the product's own visual language when building SlotDesk's product page, docs and `--product` accent. *Accessible from Claude Design; it is authenticated to the owner's claude.ai account and returns 403 to CLI/API fetches, so don't plan a build step around retrieving it programmatically.* Where it and the shipped app disagree, **the shipped app wins** - marketing screenshots come from the running app (§14 note), not from the design file.
- `slotdesk-ai-build-spec.md` - the app. This site links to it, documents it, and feeds its updater.
- **Section 15** - verified Aonomy inventory read from the shipped files. It supersedes the marketplace description wherever they disagree.

**Handoff bundle:** `_dev/handoff/themeaves-website/` - logo, Aonomy assets, and `FACTS.md` (the data blanks that must be filled or they ship as placeholders).

---

## 0. Brand Facts (verified - never invent numbers, never signal tenure)

| Fact | Value |
|---|---|
| Brand / Envato author | **ThemeAves** |
| Marketplaces | **ThemeForest** (HTML templates, CMS themes) + **CodeCanyon** (PHP scripts) |
| Launch catalogue | **SlotDesk AI** (CodeCanyon, new - self-hosted Laravel WhatsApp AI booking receptionist) as the flagship, plus **Aonomy** on a lightweight demo page (Section 9.2) |
| Aonomy | *Aonomy - App Landing Page*, $16, Site Templates › Technology, Bootstrap 4 + Sass, 77 sales, 2 reviews. **8 demos** (7 background effects + a slider), **13 landing sections**, 24+ HTML files. Full inventory in Section 15. **Shipped as-is on a demo page; refresh deferred** (Section 9.2) |
| Domain | `themeaves.com` - **not live yet**; this site is what launches on it |

### Three hard content rules

1. **No tenure signalling** *(decided Aug 11, 2026)*. Nowhere on this site: "since 2017", a founding year, "N years of experience", an Envato member-since badge, follower counts, or a years figure in any stat band. The account existed from 2018 with a single item and was then dormant, so tenure invites arithmetic that works against us. **We earn trust with verifiable present-tense things** - shipped docs, dated changelogs, stated support scope, visible craft - not with longevity. This rule binds copy, OG images, JSON-LD (`foundingDate` omitted) and the footer.
2. **Sales counts are opt-in per product** via a `showSales` frontmatter flag, default `false`. Ratings may display when real. **No site-wide aggregate stat band** - no "2 products · 77 sales" strip anywhere. Product pages show *facts that age well*: current version, last updated, requirements, licence.
3. **No invented numbers, full stop.** Every figure reads from `data/site.ts` or product frontmatter. No "10,000+ happy customers", no rounded-up sales, no invented review quotes, no stock team photos. Real review counts are small, so any section that only works with 12 testimonials is the wrong section for this site.

**The name is the concept:** *Aves* is Latin for **birds**. The logo is a bird. That is the whole brand story and the site should land it in one line, not explain it in a paragraph.

---

## 1. The Assignment

Build the complete ThemeAves website as **Next.js (App Router) + TypeScript + Tailwind CSS v4**, MDX-driven content, statically rendered wherever possible. Deliverables:

1. A **token layer** (Section 4) - CSS-first Tailwind v4 `@theme`, light + dark. No hardcoded hex in components, ever.
2. The **signature component set** (Section 6) - these carry the brand.
3. **All in-scope routes** in Section 7 - marketing, SlotDesk docs, changelog, licence portal, legal, thin support, error pages. **Scope is fixed by Section 1.3; the blog is cut.**
4. **Content pipeline** (Section 8) - MDX + frontmatter schemas so adding product #3 is a file, not a refactor, and so all **three product types** (Section 1.1) share one template.
5. **Brand asset set** (Section 3) - logo variants, favicon, OG image route.
6. The **SlotDesk update feed** endpoints (Section 9) - this site is the updater's server side.

**Audiences, in priority order:**
1. **Envato buyers mid-decision.** Landed from a CodeCanyon/ThemeForest item page or a Google search, deciding whether we're a real studio worth trusting with $16-$59 and a production deploy. They want: does it look built by someone competent, is support real, is it maintained. **Note what is *not* on that list: how long we've been around.** See Section 0, rule 1.
2. **Existing customers with a problem.** Need docs, changelog, or a license/support-window answer in under 30 seconds. If they have to email us, the site failed.
3. **Us.** Publishing a new product or release must be adding MDX files, not touching layout code.

### 1.1 Three product types - one template, three variants

The catalogue will span **both marketplaces and three kinds of item**. This is an architecture requirement, not a future nice-to-have: build the product template type-aware from day one, driven by a `type` frontmatter field, or the third item forces a rewrite.

| `type` | Marketplace | Examples | What the product page must do differently |
|---|---|---|---|
| `php-script` | CodeCanyon | SlotDesk AI | **Deepest treatment.** Full docs tree, dated changelog, updater feed, server-requirements `<SpecTable>` (PHP / Laravel / MySQL / extensions), install summary, licence verification, admin screenshots, **plus published demo logins** (Section 9.5). Buyer's fear is "will this run on my host and will it be maintained" - answer both above the fold. |
| `html-template` | ThemeForest | Aonomy | **Preview-first.** The live demo is the primary CTA, above the buy button. Needs a `<VariantGallery>` (Aonomy has 8), a page/section inventory, build-tooling notes, browser support, and lighter docs (customise / build / deploy). Buyer's fear is "how much of this do I have to rewrite". |
| `cms-theme` | ThemeForest | future WP / Shopify themes | **Compatibility-first.** Preview + a `<CompatTable>` (platform version, page builder, WooCommerce/plugin bundle), a demo-importer explainer, child-theme guidance, and a plugin-dependency list with honest licensing notes. Buyer's fear is "will this break on update and what does it bundle". |

Shared by all three: hero, screenshot gallery, features, what's-included, FAQ, support box, changelog link, related products. Type only ever *adds or reorders* sections - it never forks the layout, and never introduces a second visual language.

**One CTA rule, all types:** **whenever a live demo exists, it is the primary action and the buy button is secondary.** Both products have one, so this is universal at launch - it replaces the earlier per-type ordering. The reasoning holds across marketplaces: nobody buys a $16 template or a $59 script they haven't seen running, and the demo is the only asset that answers "is this real" in five seconds. A product with no `demoUrl` falls back to buy-first.

### 1.2 Two presentation depths - `full` and `demo`

Type says *what kind of item* it is. A second frontmatter field, **`presentation: "full" | "demo"`**, says *how much page it gets*. This exists because not every item deserves - or has the content for - the full treatment on day one, and faking that content is worse than not having the page.

- **`full`** - everything in Section 7.4. Features, specs, docs, changelog, FAQ, related. For items we're actively building and maintaining. SlotDesk AI.
- **`demo`** - the lightweight page in Section 7.4b: show the thing, link to the demo, link to the item, state the facts, stop. No features grid, no docs tree, no changelog, no FAQ. **Aonomy.**

Both live under `/products/<slug>`, so promoting a product from `demo` to `full` later is a frontmatter change - no new route, no redirect, no lost SEO. The nav, sitemap, docs switcher and changelog index all derive from these flags, so a `demo` product must never produce a link to an empty docs or changelog page.

**Do not build a "Legacy" or "Unmaintained" badge.** `demo` is a presentation depth, not a quality label, and the page must read as quiet and factual - never apologetic, never puffed up.

### 1.3 Minimal launch scope - five properties, three hosts

*Decided Aug 11, 2026.* The launch is **five things**, not one site. They live on different hosting because they are different kinds of software, and the marketing site's job is to route between them cleanly.

**One subdomain, not four.** Only the SlotDesk demo genuinely cannot share the domain - it's a Laravel app needing PHP, MySQL, cron and a queue worker, which Vercel cannot run. Everything else is static files or Next routes and stays on the apex domain.

| # | Property | Where | What it is |
|---|---|---|---|
| 1 | **themeaves.com** | Vercel (Next.js) | The site in this brief: marketing, SlotDesk docs, changelog, licence portal, legal, thin support page, `/demos` hub |
| 2 | **themeaves.com/aonomy/** | same, static passthrough from `public/` | The 8 Aonomy demos, byte-identical (Section 9.4) |
| 3 | **themeaves.com/aonomy/documentation/** | same | The **existing 2018 documentation, hosted as-is.** Not rebuilt (Section 9.4) |
| 4 | **demo.themeaves.com** | PHP host | **Live SlotDesk AI instance** - real app, published logins, nightly reset, simulated WhatsApp/AI/payments (Section 9.5). The only subdomain |
| 5 | *(SlotDesk docs)* | part of property 1 | Authored in MDX, rendered in `<DocsShell>`, static-exported for the item bundle |

**Do not** proxy the Laravel demo through a Next/Vercel rewrite to fake `themeaves.com/demo`. Laravel emits absolute URLs, sets domain cookies and redirects on login; proxying a stateful app breaks all three. The subdomain is the honest boundary, and one external link is cheaper than debugging that.

**In scope on themeaves.com:** home · products index · 2 product pages · about · thin support · legal (privacy / terms / licence explainer) · SlotDesk docs · SlotDesk changelog · licence portal + updater feed.

**Cut from this build:**
- **Blog.** Removed entirely - no route, no nav entry, no MDX pipeline, no `Article` JSON-LD. Section 7.9 is retained as a stub only so the numbering doesn't shift; **do not build it.**
- **A support system.** `support.themeaves.com` used to exist and is gone. It comes back later; until then the thin page in Section 7.6 is the whole support surface. **No ticket UI, no live chat, no knowledge base** - but design the page so a ticket system can slot in without a redesign.

Everything else in Sections 6-13 stands.

---

## 2. Design Direction & Personality

### Concept: **"Folded, not sprayed."**

The logo is origami - flat planes of colour meeting at hard creases, held together by one confident navy outline. The entire site is built from that grammar: **crisp geometric planes, hard diagonal creases, generous warm-paper space, and one heavy ink line doing the structural work.** Nothing blurred, nothing glowing, nothing floating.

The feeling: **a small precise studio that folds things carefully.** Editorial confidence, not startup hype. It should look like the studio that *made* the templates, not like one of the templates.

### The trap to avoid (this is the whole brief in one paragraph)

We sell HTML templates. The single worst outcome is a site that looks like a free Bootstrap template shop. **Banned outright:**

- Purple→blue gradients, glassmorphism, glow/neon, mesh blobs, animated gradient text.
- The three-stacked-wave SVG section divider. Any wave divider.
- Auto-playing hero carousels, spinning odometer counters, "Awesome Features" / "Our Amazing Team" / "What We Do" headings.
- Generic 3D isometric illustrations, stock office photography, robot mascots, AI sparkle emoji.
- Centered-everything layouts, 3 identical icon-circle cards, `text-center` for everything.
- Floating WhatsApp bubbles, exit-intent popups, cookie walls, "Trusted by" rows of grayed-out logos we don't have.

### Visual anchors

- **Paper, not screen.** The canvas is a warm off-white with a barely-there paper tone. Cards sit *on* it like sheets, with low warm shadows offset as if lit from above-left. Dark mode is deep navy-black - the same paper at night, not a different brand.
- **The crease is our signature.** A 45° cut corner (`clip-path`) on cards, badges and image frames, echoing a folded corner. Used with restraint - one per composition, not on every element.
- **Hard diagonals for section transitions.** Section boundaries can shear at a shallow angle (2-4°) taken from the bird's wing edge. Two per page maximum, and they must never crop text or break at mobile.
- **Three colour planes.** Yellow, teal, coral appear as **flat fills** - stripe rules, plane accents, category tags, chart bars, callout edges. Never as gradients between each other, never as text on paper, never all three inside one small component.
- **Navy does the typography.** All headings and body text are ink. Colour is structure and wayfinding, never decoration on words.
- **Asymmetry.** Editorial grid with deliberate offset - hero text left at 7 columns, art at 5 and bleeding off the right edge. Confidence reads as off-centre.

### Motion

Restrained and mechanical, like paper being placed. 160-220ms, `cubic-bezier(.2,.7,.3,1)`. Entrances = 8px rise + fade, staggered 40ms. Hover = 1px lift + shadow step + border to ink. Creases can "unfold" once on scroll-in (clip-path reveal) - once, not looping. Respect `prefers-reduced-motion: reduce` by dropping to opacity-only. **No parallax, no scroll-jacking, no marquees, no Lottie.**

---

## 3. Logo & Brand Assets

### Source

`C:\Users\Shuvo\Downloads\Colorful-origami-outline-bird-logo\Artboard 3.svg` (also `.png`, `.eps`, `.jpg`). **Licensed** - the personalised premium licence certificate is held with the asset. Copy the SVG + PNG into `public/brand/` and treat that as the site's copy; do not reference the Downloads path from code. Keep the licence PDF with the brand assets, outside the deployed bundle.

Geometry: `viewBox="0 0 721.23 543.79"` (ratio ≈ 1.33:1), no intrinsic width/height. An origami bird in outline: navy stroke (18.26px at that scale ≈ 2.5% of width), yellow head, white body, three-stripe wing (yellow / teal / coral) crossed by navy bars, teal tail feathers.

### Keep the mark swappable (architecture, not licensing)

The identity is carried by the palette, the crease motif, the three-stripe rule and the typography - not by the bird's path data. Replacing `public/brand/mark.svg` must not break a single layout, because the mark will change size, gain a wordmark variant, and get white-labelled into OG images. So: never trace the bird's silhouette into a background pattern, a section shape or a CSS mask, and never derive a layout dimension from it.

### Practical SVG traps

1. **Class collisions.** The source uses a `<defs><style>` block with generic `.cls-1` … `.cls-7` selectors. Inlining two copies (nav + footer) on one page makes them fight, and the stroke classes will leak into unrelated SVG icons. Convert to **presentation attributes** (`fill=`, `stroke=`) or namespace to `.tav-*` before inlining. Prefer one `<Mark/>` React component with an `<svg>` using presentation attributes only.
2. **It does not survive 16px.** The interior white hairlines, the three wing stripes and the eye dot all collapse below ~48px. Ship a **size ladder**:
   - **Full mark** - ≥64px. All stripes, all detail.
   - **Compact mark** - 24-48px. Drop the interior navy bars and the eye; keep silhouette + three solid stripes.
   - **Micro mark** - ≤24px / favicon. Navy silhouette only, one yellow head plane. No stripes.
   Verify each at its actual size on both paper and navy backgrounds before calling it done.
3. **Mono variants** - solid navy, solid white (for navy/photo backgrounds), and single-flat-colour for one-colour contexts.

### Wordmark & lockups

- Wordmark: **"ThemeAves"**, one word, display face, tight tracking (`-0.02em`). "Theme" at weight 500, "Aves" at 700 - the emphasis is by **weight, not colour**, so the wordmark stays mono-safe. Never split it across two lines, never letterspace it wide.
- Lockups: **horizontal** (compact mark + wordmark, mark height = cap-height × 1.6, gap = 0.4× mark width) for nav/footer; **stacked** for OG/social; **mark-only** for favicon/avatar.
- Clear space = 50% of mark height on all sides. Minimum lockup width 120px.
- Don'ts: no stretching, no rotating, no drop shadows on the mark, no recolouring outside the shipped variants, no placing the full-colour mark on yellow/teal/coral fills (use mono-white or mono-navy there), no outline/stroke added to the wordmark.

### Asset deliverables

`public/brand/`: `mark.svg` (full), `mark-compact.svg`, `mark-micro.svg`, `mark-mono-navy.svg`, `mark-mono-white.svg`, `lockup-h.svg`, `lockup-stacked.svg`, `favicon.ico` (16/32/48), `icon.svg`, `apple-icon.png` (180), `icon-512.png`, plus a dynamic **OG image route** (Section 7.13).

---

## 4. Design Tokens (single source of truth)

Tailwind v4, CSS-first. Mirror the pattern already proven in `resources/css/brand.css`: a `:root` block of raw values, a `.dark` override block, and one `@theme inline` mapping them to utility names. **No `tailwind.config.js`.**

### Palette - derived from the logo

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ink` | `#243D59` | `#E8EDF4` | Brand navy. Headings, primary button fill, the structural line. Flips in dark. |
| `--ink-deep` | `#16283A` | `#F5F8FC` | Hover/pressed ink, footer fill, high-emphasis text |
| `--paper` | `#FBFAF7` | `#10161F` | Page background - warm paper, never pure white or gray |
| `--surface` | `#FFFFFF` | `#17202C` | Cards, sheets, popovers |
| `--fold` | `#F1EEE7` | `#1D2837` | Insets, wells, code blocks, table stripes, docs sidebar |
| `--line` | `#E4E2DB` | `#26313F` | Hairlines, card borders (warm in light, cool in dark) |
| `--fg` | `#1F2E3F` | `#E8EDF4` | Body text |
| `--fg-muted` | `#5F6F80` | `#93A2B4` | Secondary text, captions, nav rest state |
| `--sun` | `#FBD101` | `#FFDE3D` | Plane accent 1 - fills only |
| `--tide` | `#33BFB3` | `#47D6C9` | Plane accent 2 - fills only |
| `--flare` | `#FD4717` | `#FF6A3D` | Plane accent 3 - fills, primary CTA |
| `--tide-deep` | `#14837B` | `#5FE0D3` | The **text/link-safe** teal |
| `--flare-deep` | `#D5350C` | `#FF8A63` | The **text-safe** coral (errors, destructive) |
| `--sun-deep` | `#7A6300` | `#FFE97A` | The **text-safe** yellow (rare - warning text) |
| `--on-solid` | `#FFFFFF` | `#FFFFFF` | Text on ink / flare / flare-deep fills |
| `--on-warm` | `#243D59` | `#243D59` | Text on sun / tide fills |

**Contrast law - non-negotiable.** `--sun`, `--tide`, `--flare` are **fill-only**. They fail WCAG AA as text on paper (yellow ≈ 1.4:1, teal ≈ 2.3:1, coral ≈ 3.5:1). Coloured text uses the `-deep` variants. Text on a coloured fill uses `--on-solid` / `--on-warm` and **does not flip with the theme** - a fill colour is a fill colour in both themes (same rationale as SlotDesk's `--on-solid`; a literal `#fff` there is correct, not a token violation).

**Semantics:** success `--tide-deep`, warning `--sun` fill + `--on-warm` text, danger `--flare-deep`, info `--ink`. Status tints via `color-mix(in srgb, var(--tide) 14%, transparent)` - never invent tint hexes.

**Product accent slot.** Product pages, docs and changelogs set `--product` on their root wrapper (SlotDesk = its spruce `#0E2E28` / leaf `#17B890`; Aonomy = its own). Product-scoped accents, screenshot frames and CTA buttons consume `var(--product)`. This keeps the house brand neutral while each product keeps its identity - and it is how product #3 ships without a redesign.

### Type

- **Display** (hero, section heads, product names): **Familjen Grotesk**, weights 500/700, tracking `-0.02em` at ≥32px, `-0.03em` at ≥56px. Deliberately *not* Bricolage - the house brand must not read as the SlotDesk product.
- **UI / body:** **Inter**, 400/500/600. 17px base on marketing pages, 16px in docs, 15px in the portal and tables. Body measure 62-70ch, never wider.
- **Mono** (code, purchase codes, version numbers, cron lines): **JetBrains Mono** 400/500.
- **Numbers** (prices, sales counts, versions, dates): `font-variant-numeric: tabular-nums`. Always.
- Load via `next/font` with `display: 'swap'` and self-host the subsets. Marketing pages get **≤4 font files**; no FOIT.
- Scale (fluid via `clamp`): display-xl 56→84 / display-lg 40→56 / display-md 30→38 / h3 22→24 / lead 19→21 / body 17 / small 15 / caption 13. Headings `leading-[1.05]`, body `leading-[1.65]`.

### Shape, depth, spacing

- **Radii - crisper than the app** (origami is hard-edged): `sm 4 / md 8 / lg 14 / xl 20`, pills 999px. Add a `--crease: 18px` value driving the signature cut corner via `clip-path: polygon(...)`.
- **Shadows - paper on paper**, warm and offset down-right, never centred blur:
  `--shadow-sheet: 0 1px 2px rgba(36,61,89,.05), 0 2px 6px rgba(36,61,89,.05)`
  `--shadow-lift: 0 6px 18px rgba(36,61,89,.09), 0 2px 5px rgba(36,61,89,.05)`
  `--shadow-pop: 0 20px 50px rgba(36,61,89,.16), 0 6px 14px rgba(36,61,89,.08)`
  Dark mode: same geometry, `rgba(0,0,0,.45/.55/.7)`.
- Container `1180px` max (matches the admin frame width we standardised on), gutters 20px mobile / 40px desktop. Section rhythm 96px mobile / 144px desktop. 8px spacing base.
- **Logical properties only** (`ms-`, `me-`, `ps-`, `pe-`, `start/end`). The site ships English-only, but the app is RTL-capable and the habit costs nothing.

---

## 5. Voice & Copy

Direct, specific, slightly dry. We are builders talking to builders and to shop owners who bought from builders.

- **Do:** "77 sales, 2 reviews, zero support tickets left unanswered." · "Self-hosted. Your server, your data, your WhatsApp number." · "Six months of support included, per Envato's terms."
- **Don't:** "revolutionary", "cutting-edge", "seamless", "empower", "unlock", "game-changing", "solution". No exclamation marks. No em dashes.
- Buttons say what happens: "Get SlotDesk AI on CodeCanyon", "Read the docs", "Check my licence", "See the changelog". Never "Learn more" alone, never "Click here".
- Headings are claims, not labels: "We fold one thing at a time" beats "About Us".
- Numbers over adjectives. Where we're small, say the number and move on.

---

## 6. Signature Components

Build these first, after tokens. Everything else composes them. Location `components/`, all typed, all server components unless they need state.

| # | Component | Spec |
|---|---|---|
| 1 | `<FoldCard>` | The workhorse surface. `--surface` fill, 1px `--line`, `--shadow-sheet`, `lg` radius with one **creased corner** (`clip-path`, corner prop: `tr` default). Hover: `--shadow-lift` + border→`--ink` + 1px rise. Props: `crease`, `accent` (paints a 3px `--sun`/`--tide`/`--flare` edge on the inline-start), `as`, `interactive`. |
| 2 | `<PlaneStripe>` | The logo's wing motif abstracted: three stacked bars (sun / tide / flare), each 4px tall, staggered widths (100% / 72% / 48%). Serves as section eyebrow rule, list-group marker and footer divider. Props: `orientation`, `size`, `align`. **The most reusable brand cue on the site - use it instead of inventing decoration.** |
| 3 | `<WingEdge>` | Shallow-angle section transition (2-4° shear) between two backgrounds. Pure CSS `clip-path`, no SVG asset. Auto-flattens to 0° below 640px. Hard cap: two per page. |
| 4 | `<Eyebrow>` | Small-caps mono label + `<PlaneStripe size="sm">`. Every section head above the display heading. |
| 5 | `<BrowserFrame>` | Product screenshot frame: minimal chrome (three dots, a `--fold` URL pill showing the real demo URL), creased top-right corner, `--shadow-pop`. Wraps `next/image`. Props: `url`, `theme` (light/dark shot), `zoom` (opens lightbox). |
| 6 | `<PhoneFrame>` | Neutral device frame for mobile shots (SlotDesk's WhatsApp conversation, Aonomy mobile). Notch-less, 9:19.5, ink bezel. |
| 7 | `<ProductCard>` | Thumbnail (16:10) + name (display) + one-line pitch + **marketplace tag + type tag** + price (tabular) + `<StarRating>` when a real rating exists. Sales count only when `showSales` is true. Whole card is one link. Must read correctly with 2 products and with 12, and with mixed types side by side. |
| 8 | `<BuyButton>` | Ink fill / `--on-solid` text (variant `flare` for the flagship). Copy pattern: **"Get {product} on {marketplace}"**, `rel="noopener"`, external-link glyph, price as a trailing tabular pill. **Secondary to the demo CTA wherever a demo exists** (§1.1), which is everywhere at launch. **Never a checkout** - Section 10. |
| 9 | `<ProductFacts>` | Replaces the site-wide stat band, which Section 0 rule 2 forbids. A hairline fact strip on product pages only: **current version · last updated · licence · rating** (all tabular, mono labels), separated by `<PlaneStripe orientation="vertical">`. Facts that age well and prove maintenance - never tenure, never aggregate totals. **No count-up animation.** |
| 10 | `<ReviewCard>` | Real Envato review only: stars, quote (max 3 lines then clamp), buyer handle, item, date. Design for **two** cards - a 2-up asymmetric layout, not a 3-column grid with a hole. |
| 11 | `<FeatureRow>` | Alternating text/art band for product pages. Lucide icon in a `--fold` square with a creased corner, h3, 2-line body, optional screenshot. Alternates side; stacks art-first on mobile. |
| 12 | `<SpecTable>` | Definition table for requirements (PHP/Laravel/browsers/license/version). `--fold` stripes, mono values, hairline rows, horizontal scroll inside its own `overflow-x:auto` wrapper. |
| 13 | `<Faq>` | Accordion on `<details>`/`<summary>` (works without JS), ink chevron, one open at a time optional, `--line` dividers, no cards. |
| 14 | `<Callout>` | Docs note/tip/warning/danger. 3px inline-start edge in `--tide`/`--sun`/`--flare-deep`, tinted fill via `color-mix`, Lucide icon, no emoji. |
| 15 | `<CodeBlock>` | Mono, `--fold` fill, tab-size 2, filename header bar, copy button with "Copied" state, wrap-off + horizontal scroll, optional line highlight. Shiki at build time - **no client-side highlighter**. |
| 16 | `<DocsShell>` | Docs layout: product switcher → sidebar tree (collapsible, current-page ink marker) → content (68ch) → right TOC (scroll-spy). Mobile: sidebar becomes a drawer, TOC becomes a collapsible bar under the title. |
| 17 | `<ChangelogEntry>` | Version pill (mono, semver, `--ink` fill) + date (tabular) + change-type tags (Added `--tide` / Fixed `--sun` / Changed `--ink` / Removed `--flare`) + body. Anchored `#v1-2-0` and deep-linkable. |
| 18 | `<LicenseField>` | Envato purchase-code input: mono, auto-chunks to `8-4-4-4-12` as typed, paste-tolerant (strips spaces), `inputmode` set, masked-on-blur toggle, states rest/focus/checking/valid/invalid/rate-limited. |
| 19 | `<StatusBadge>` | Portal + changelog states: Active, Expired, Invalid, Latest, Deprecated. Pill, tinted fill, dot marker. |
| 20 | `<ThemeToggle>` | Sun/moon Lucide, 3-state (system/light/dark), persisted, applied **pre-paint** via an inline script in `<head>` so there is no flash. `.dark` class on `<html>` - same mechanism as the app. |
| 21 | `<VariantGallery>` | For `html-template` / `cms-theme`: a switcher across a product's demo variants (Aonomy has 8) previewing each in a `<BrowserFrame>` with an "Open this demo" link. Thumbnail rail on desktop, swipeable chip row on mobile. Lazy-loads images; the first variant is the only eager one. Must hold 8 tiles without the rail becoming a scrolling mess - 4×2 on desktop. |
| 22 | `<PageInventory>` | For `html-template`: **two groups behind one component** - *Pages* (included HTML files, name + thumbnail + demo link) and *Sections* (the composable blocks a one-page template ships, as a dense tag list). For a single-page template like Aonomy the section list is the more meaningful number, so don't force everything through the page grid. Collapsed past 12 items with a "Show all" toggle. |
| 23 | `<CompatTable>` | For `cms-theme`: platform + version compatibility matrix (WP / WooCommerce / PHP / builder), with a `<StatusBadge>` per row (Supported / Tested / Not supported). Honest bundled-plugin list with licensing notes underneath. Scrolls inside its own `overflow-x:auto` wrapper. |
| 24 | `<DemoCredentials>` | For a product with a live app demo: one card per role (Business owner / Super admin) showing the demo URL, email and password in mono with **copy buttons on each field**, plus a plain "Data resets nightly - book anything you like" line and a note that WhatsApp, AI and payments run in simulated mode. Must be scannable in three seconds and copy-pasteable on mobile. **Never render real credentials** - these come from `data/site.ts`, and the demo account is disposable by design. |

Primitives on top of these: `Button` (ink/outline/ghost/flare), `Input`, `Textarea`, `Select`, `Badge`, `Tabs`, `Breadcrumbs`, `Pagination`, `Lightbox`, `Toast`, `EmptyState`, `Skeleton`, `Prose`.

Components 21-24 are **conditional** - 21-23 render only for the product types in Section 1.1 that need them, 24 only where a live app demo exists. Code-split them so a `php-script` page never ships the template-gallery JS and vice versa.

**Icons: Lucide only** (`lucide-react`), 1.5px stroke, 20px default. Never hand-draw an SVG icon.

---

## 7. Routes & Screen Specs

Design **light + dark** for every route, and at **375 / 768 / 1280 / 1600**. Every data surface needs empty, loading and error states.

### 7.1 Global chrome

**Header** - 72px, sticky, `--paper` at 92% + `backdrop-blur(8px)` after 24px scroll (before that: transparent, no border), 1px `--line` bottom once stuck. Left: horizontal lockup. Centre-end: **Products · Demos · Docs · Changelog · Support** (no Blog - §1.3). "Demos" earns its nav slot because the demos are the conversion lever and they live on other subdomains, so they need a findable route from here; it points at `/demos` (Section 7.14). End: `<ThemeToggle>` + "My licence" ghost button. Active link = ink text + 2px `--flare` underline. Mobile: full-height drawer sliding from the inline-end, links at display-md, ink scrim.

**Footer** - `--ink-deep` fill, `--on-solid` text. Four columns: brand (mono-white lockup + one-line positioning - **positioning, not tenure**), Products, Resources (Demos, Docs, Changelog, Licence explainer), Company (About, Support, Terms, Privacy, Refunds). `<PlaneStripe>` as the top divider. Bottom bar: copyright, "Built by ThemeAves", and the truthful Envato attribution line from Section 10. **Outbound links to the demo subdomains carry an external-link glyph** so nobody is surprised to leave the site.

### 7.2 Home `/`

1. **Hero** - asymmetric 7/5. Eyebrow states *what we make*, not how long we've made it ("Templates and scripts for ThemeForest and CodeCanyon"); display-xl headline (the studio positioning, ≤9 words); lead paragraph (2 lines, what we make and who for); two CTAs (`Browse products` ink, `Read the docs` outline). Art column: **a `<BrowserFrame>` (SlotDesk dashboard) and a `<PhoneFrame>` (the WhatsApp booking conversation) overlapped at complementary angles like folded wings**, bleeding off the inline-end edge. Both planes come from the flagship - it keeps the folded-wing composition while telling one coherent story (message arrives → booking appears), and it keeps an unrefreshed 2018 template out of the first thing a buyer sees. Mark watermark: none - the nav already carries it.
2. **Proof band, not a stat band** - Section 0 rule 2 kills the numbers strip, so this slot earns trust differently: **three links that a competitor with an abandoned item cannot fake** - "Read the docs" (real docs tree), "See what changed" (dated changelog entries, newest date shown live), "How support works" (scope stated plainly). Each a `<FoldCard>` with `accent`, on `--fold` between `<WingEdge>`s. This band is doing the job tenure used to do, so it must not read as a nav row - give it real copy.
3. **Products** - `<ProductCard>` grid, 2-up desktop, built to scale to 12 across three types. Both presentation depths sit in the same grid with the same card treatment - a `demo` card is not visually demoted, it just links to a shorter page. A third "In the workshop" `<FoldCard>` only if truthful and only if it names something real.
4. **Flagship band: SlotDesk AI** - full-width `--ink` fill, product accent active. Display-lg claim, three `<FeatureRow>`-lite columns (AI books on WhatsApp / self-hosted / multi-tenant), one `<PhoneFrame>` showing a real booking conversation, CTA to the product page. This is the band that justifies the site.
5. **How we build** - three points on craft, support and updates, each with `<PlaneStripe>` + a Lucide icon. Copy is specific ("Every release ships a changelog entry and a one-click updater"), not values-page filler.
6. **Reviews** - `<ReviewCard>` × 2, asymmetric, plus a link to the Envato item's review page. If a quote is unavailable, the section is omitted, not filled.
7. **Support promise + FAQ** - 5-6 `<Faq>` entries (support scope, what "self-hosted" means, updates, refunds, licence types).
8. **Closing CTA** - `--flare` plane, ink text, single action.

### 7.3 Products index `/products`

Page header (display-lg + lede), then **two-axis faceting** as client state with URL search-param sync: **marketplace** (All / CodeCanyon / ThemeForest) × **type** (Scripts / HTML templates / CMS themes, from Section 1.1), plus category as a secondary chip row once there are enough items to warrant it. Result count is live and tabular. `<ProductCard>` grid 2-up/3-up, sort by newest. Combined-filter empty state uses `<EmptyState>` with a mono-white micro mark and a "clear filters" action. No pagination until >12 items. The facet UI must not look empty or absurd with 2 products - render only facets that have matches.

### 7.4 Product detail `/products/[slug]` - `presentation: full`

**One template, three type variants** (Section 1.1), driven by frontmatter. Sets `--product`.

1. **Hero** - breadcrumbs; marketplace + type + category tags; display-lg name; one-line pitch; `<ProductFacts>` (version · last updated · licence · rating); **"Try the live demo" primary + `<BuyButton>` secondary** (§1.1 CTA rule), plus text links to Docs and Changelog. Large `<BrowserFrame>`. Price as a pill, never a giant number.
2. **Screenshot gallery** - 5-8 shots, first full-bleed inside a `<BrowserFrame>`, rest a 3-up grid opening a `<Lightbox>` (keyboard arrows, Esc, focus trap). Mobile shots use `<PhoneFrame>`.
3. **Type block** *(the one section that varies)* - `php-script`: **`<DemoCredentials>` first**, then server requirements + install summary. `html-template`: `<VariantGallery>` + `<PageInventory>` + build tooling. `cms-theme`: `<CompatTable>` + demo-importer explainer + bundled-plugin list.
4. **Features** - `<FeatureRow>` × 5-7, alternating.
5. **What's included** - two-column checklist (files, docs, updates, support window).
6. **`<SpecTable>`** - requirements, tested browsers, licence, version; stack row reads PHP/Laravel/MySQL, or build tooling, or platform versions per type.
7. **Latest changes** - three `<ChangelogEntry>`s + "Full changelog".
8. **Product FAQ** + support box.
9. **Related products** - `<ProductCard>` row, preferring same type then same marketplace.
10. **Sticky mobile CTA bar** - after the hero scrolls out: name, price, and the type's *primary* CTA. Desktop gets no sticky bar.

### 7.4b Demo page `/products/[slug]` - `presentation: demo`

Same route, same template file, far fewer sections. **Aonomy is the one that ships this at launch.** The page's entire job: let someone see the thing working, then hand them to ThemeForest. It must feel like a deliberate short page, not a full page with holes in it - which means fewer, larger, more confident sections rather than the same sections half-filled.

1. **Hero** - breadcrumbs; marketplace + type + category tags; display-lg name; one-line pitch; **"View live demo" as the primary CTA**, `<BuyButton>` secondary, price pill, and a plain text link to **"Documentation"** (external - the 2018 doc on the Aonomy subdomain, §9.4, opens in a new tab with an external glyph). A trimmed `<ProductFacts>`: only the facts that exist and age well - **tooling and section count, not version and last-updated** (a stale "last updated" date is exactly the signal we don't want to broadcast, and there is no version story without a changelog). No changelog link, because there is none.
2. **`<VariantGallery>`** - the centrepiece, immediately below the hero. **All 8 demos** (Video, Particles, Snow, Star, Bubble, Slider, Wave, Parallax - exact labels and URLs in Section 15), each opening its own live demo in a new tab. This is what the page is *for*, so give it the full container width and let it breathe. 4×2 on desktop, 2-up tablet, swipe row on mobile.
3. **`<PageInventory>`** - both groups: the included HTML files, and **the 13 landing sections** as a dense tag list. For a one-page template the sections are what a buyer is actually shopping for, so lead with them and keep the file list secondary.
4. **Facts strip** - a compact `<SpecTable>`: build tooling (Bootstrap 4 + Sass), browser support, what's in the download, licence. Stated plainly, no framing.
5. **Where to get it** - one `<FoldCard>` with `<BuyButton>`, the price, and a link to the item's ThemeForest page for reviews and full details. This page does not try to replace the item page; it feeds it.
6. **Related products** - `<ProductCard>` row pointing at the flagship, so a visitor who landed here doesn't dead-end.

**Explicitly absent** (do not build, do not stub): features grid, changelog, updater mention, product FAQ, support-window block, sticky mobile CTA bar, in-site docs route. **No "legacy", "v1", "unmaintained" or "coming soon - v2" labelling** anywhere on it. If the refresh happens later, this page becomes `presentation: full` at the same URL.

**On the external documentation link:** it points at a 2018 Bootstrap 2 page that looks nothing like this site. That is acceptable and honest - it documents the item accurately, and the item hasn't changed. Do **not** iframe it, do not restyle it, and do not apologise for it in the link label. Just "Documentation", external glyph, new tab.

### 7.5 About `/about`

Editorial single column at 68ch with full-bleed interruptions. Sections: **what we make** (one honest paragraph - small studio, two marketplaces, three kinds of item; **no founding year, no history, no comeback narrative** - Section 0 rule 1 applies here hardest, because this is the page that wants to tell a story); **why a bird** (the *Aves* line - one sentence, one compact mark, then move on); how we work (three folds: design in the open, ship changelogs, answer support); what we won't do (no abandoned items, no fake numbers); who's behind it (real name/handle, no stock portrait); a closing contact CTA. **No timeline component, no "our journey", no "our mission", no team grid of one person.**

### 7.6 Support `/support` - triage only, no ticket system

**No ticket system** (§1.3). `support.themeaves.com` is gone and returns later; this page is the entire support surface until then. **Build no form** - a contact form that emails into a mailbox nobody has committed to watching is worse than an address, because it implies a queue that doesn't exist.

Triage-only, four blocks:

1. **Three route cards** (`<FoldCard>` with `accent`): **Item support** (bug/how-to → the Envato item's comments tab, which is where Envato expects it and where buyers already are; list what to include: item, version, PHP/Laravel version, steps) · **Licence or download** (→ `/licenses`) · **Pre-sale question** (→ the email address, stated in full, mono, with a copy button - not obfuscated, not a `mailto:` only).
2. **Docs shortcut row** - links straight to the top 5 support-driving docs pages. This is the block that actually reduces contact volume, so give it real weight, not a footnote.
3. **Scope, stated plainly** - two columns, "included" vs "not included" (customisation, third-party integrations, server admin). Six months per Envato item support terms, renewals through Envato.
4. **Response expectations** - timezone, working days, and an honest window. **Do not promise 24/7, do not promise same-day.** Under-promise here; it's the cheapest trust you will ever buy.

**Forward-compatibility:** when the ticket system returns, it replaces the *Item support* and *Pre-sale* cards' destinations - nothing else on the page changes. Build those two destinations as single values in `data/site.ts`, not inline hrefs scattered through the markup.

### 7.7 Docs `/docs` · `/docs/[product]` · `/docs/[product]/[...slug]`

`<DocsShell>`. `/docs` = product chooser. Each product's index = a getting-started card grid (Install, Configure, Deploy, Troubleshoot). Article page: breadcrumbs, h1, "Updated {date}", prose, `<Callout>`, `<CodeBlock>`, zoomable screenshots, copy-link anchors on hover, prev/next footer, "Was this helpful?" (two buttons, fire-and-forget), "Edit this page" only if the content repo is public.

**Search:** build-time JSON index (title + headings + first 200 chars per page), client filter in a `Cmd+K` dialog. No Algolia, no third-party script.

**At launch there is exactly one documented product.** `presentation: demo` items have no docs, so the product switcher and `/docs` chooser must look deliberate with a single entry - **collapse the switcher to a static product label when only one product has docs**, rather than rendering a one-option dropdown, and let `/docs` redirect straight to `/docs/slotdesk-ai`. The multi-product chooser stays in the codebase behind that count check, not deleted.

**Docs depth follows product type** (Section 1.1), and the shell must look right at all three depths: a `php-script` gets a full multi-group tree (install / configure / integrate / deploy / troubleshoot); an `html-template` gets 4-6 pages (customise, build, deploy, FAQ); a `cms-theme` sits between (install, demo import, customise, plugins, update). The sidebar must not look broken when a product has five pages and no nesting.

SlotDesk's doc tree should mirror the HTML docs still outstanding on its Phase 7 list - **write these once, here, and let the item's bundled docs be a static export of this tree** rather than maintaining two copies.

### 7.8 Changelog `/changelog` · `/changelog/[product]`

`/changelog` = latest 3 entries per product, newest first, with product tags. Per-product page: version list as `<ChangelogEntry>`s, sticky year rail on desktop, `<StatusBadge>Latest</StatusBadge>` on the newest, an "How to update" `<Callout>` at the top linking the in-app updater, and **RSS + JSON feeds** (`/changelog/[product]/rss.xml`).

**Only `presentation: full` products have changelogs**, so at launch this is SlotDesk alone. Consequences: `/changelog` renders as a single product's history without product tags or a multi-product index (add those back when a second product earns them); the sticky year rail must look right with one year; a `demo` product never appears here and never gets a feed URL. The changelog is doing real trust work now that tenure is off the table (Section 0 rule 1) - **one product's honestly dated history beats two products' thin ones**, so don't pad it.

### 7.9 Blog - ❌ CUT FROM THIS BUILD

**Do not build.** No `/blog` route, no nav or footer entry, no `content/blog/`, no `Article` JSON-LD, no reading-time utility, no category taxonomy. Retained as a numbered stub only so later section references don't shift. If it comes back, it comes back as its own decision with real posts in hand (§1.3).

### 7.10 Customer portal `/licenses` (+ `/licenses/[code]` result view)

Code-based, **no accounts** - matches how Envato works and keeps us out of password management.

1. **Verify** - `<LicenseField>` + "Check licence". Explain where to find a purchase code (Envato → Downloads → Licence certificate) with a small annotated screenshot.
2. **Valid result** - `<FoldCard>`: item name + thumbnail, licence type (Regular/Extended) with a plain-English line, purchase date, buyer handle, **support window** as `<StatusBadge>` + expiry date, and a **downloads list** (latest version + previous two, size, date, `<CodeBlock>`-style checksum). Secondary actions: docs, changelog, renew support (→ Envato).
3. **Support expired** - valid licence, `<StatusBadge>Expired</StatusBadge>`, updates still downloadable, support renewal explained and linked to Envato. Must not read as punishment.
4. **Invalid** - `<Callout type="danger">` with the three likely causes (typo, wrong marketplace account, not our item) and a link to `/support`.
5. **Rate-limited** - calm, states the wait, no CAPTCHA wall.
6. **Loading** - inline spinner in the button + skeleton result card. Never a full-page loader.

**Security requirements (design must not fight these):** verification runs **server-side only** in a route handler with our Envato personal token - the token never reaches the client bundle and never appears in a `NEXT_PUBLIC_` var. Rate-limit by IP + code. **Never log a full purchase code** (log last 6 chars max). No purchase code in a URL query string or in analytics; the `/licenses/[code]` view is client-state or a POST-then-render, not a shareable GET. Downloads are signed, short-TTL URLs - the item zip is never publicly listable.

### 7.11 Legal `/terms` · `/privacy` · `/refunds` · `/license`

Shared prose layout, "Last updated" line, in-page TOC for anything over 800 words. `/privacy` states plainly what the licence form stores and for how long, and names every third party (host, analytics, form/email, Envato API). `/refunds` states our position and links Envato's authoritative policy - **Envato handles the transaction, so we describe, we do not override.** `/license` is the highest-value page here: Regular vs Extended in plain English with a two-column comparison and three concrete examples ("one client site", "SaaS you charge for"). It answers the single most common pre-sale question.

### 7.12 Error & utility

`404` (compact mark, one dry line, links to Products/Docs/Support - no giant "404" numeral), `500`, `/search`, `/thanks`. `robots.ts`, `sitemap.ts`, `manifest.ts`.

### 7.13 Metadata & OG

Next Metadata API per route. Dynamic OG image route (`app/og/route.tsx`, `next/og`) rendering: `--ink` field, mono-white stacked lockup, display title, an optional product accent bar and the three-stripe motif. One route, driven by search params, covering products, docs, blog and changelog. JSON-LD: `Organization` (site-wide, **`foundingDate` omitted** per Section 0 rule 1), `SoftwareApplication` + `Offer` (products), `Article` (blog), `BreadcrumbList`, `FAQPage`. `aggregateRating` only when a real rating exists - never a synthesised one, which is both dishonest and a Google penalty. No `Article` schema - the blog is cut (§1.3).

### 7.14 Demos hub `/demos`

One short page, because the demos are the conversion lever and they all live on other subdomains (§1.3) - this is the only place on the site that gathers them.

- **SlotDesk AI** - a wide `<FoldCard>`: `<BrowserFrame>` still, "Open the live demo" primary, and `<DemoCredentials>` inline so a buyer can see the logins *before* deciding to click. The nightly-reset and simulated-mode notes live here too.
- **Aonomy** - a `<FoldCard>` with the 8-tile `<VariantGallery>` at reduced size, each tile deep-linking to its own demo, plus a link to the external documentation.
- Nothing else. No hero, no marketing copy beyond one line each, no FAQ. This page exists to get people out of it quickly; the product pages already do the selling.

Every outbound link: new tab, `rel="noopener"`, external glyph.

---

## 8. Content Pipeline

```text
content/
  products/<slug>.mdx     # frontmatter - shared by all types:
                          #   name, slug, tagline, marketplace ("CodeCanyon"|"ThemeForest"),
                          #   type ("php-script"|"html-template"|"cms-theme"),   <- drives which sections
                          #   presentation ("full"|"demo"),                      <- drives how many sections
                          #   envatoItemId, envatoUrl, demoUrl, externalDocsUrl, category, price, currency,
                          #   accent (hex), thumbnail, screenshots[{src,alt,frame,theme}], featured
                          #   rating, reviews            (rendered only when real)
                          #   sales, showSales:boolean   (hidden unless showSales === true)
                          # presentation: "full" additionally REQUIRES:
                          #   version, releasedAt, updatedAt, docsSlug, hasChangelog,
                          #   requirements[{k,v}], includes[], features[{icon,title,body,image}], faq[{q,a}]
                          # presentation: "demo" FORBIDS version/releasedAt/updatedAt/docsSlug/hasChangelog
                          #   (absent, not null - see 9.2) and needs only the type-scoped demo content
                          # type-scoped, validated conditionally by the Zod discriminated union:
                          #   php-script:    stack{php,laravel,mysql,extensions[]}, hasUpdater, installSummary[]
                          #   html-template: variants[{name,thumb,previewUrl}], pages[{name,thumb,previewUrl}],
                          #                  tooling{css,build,jsDeps[]}, browsers[]
                          #   cms-theme:     platform, compat[{k,v,status}], bundledPlugins[{name,licence}],
                          #                  demoImporter:boolean, childTheme:boolean
  docs/<product>/<...>.mdx  # title, description, order, updatedAt, group
  changelog/<product>.mdx   # entries[{version,date,changes:[{type,body}]}]  (or one file per version)
  legal/<slug>.mdx
data/site.ts                # brand facts (Section 0), nav, footer, subdomain URLs (§1.3),
                            # support destinations (§7.6), demo credentials (§6 #24),
                            # response-time promise.  NO content/blog/ - the blog is cut (§1.3)
```

Rules: frontmatter validated at build with a **Zod discriminated union on `type`, intersected with a second one on `presentation`** - a missing `envatoUrl`, an unknown `marketplace`, an `html-template` with no `variants[]`, a `full` product with no `version`, or a `demo` product carrying an `updatedAt` all fail the build rather than rendering half a page. That last one is deliberate: it makes Section 9.2's stale-date rule impossible to violate by accident. MDX components come from one `mdx-components.tsx` mapping to Section 6 primitives, so authors write markdown, never divs. Reading time and TOCs are computed, never hand-written. Screenshots are committed at 2× and served through `next/image` (AVIF/WebP). **All product numbers live in frontmatter only** - no number is typed into a component, and nothing renders a tenure figure because none exists in the schema.

---

## 9. Launch Dependencies

### 9.1 SlotDesk updater integration (this site is the server side)

SlotDesk's updater already assumes a **self-hosted version feed + zip delivery**, because Envato's API only verifies purchase codes. This site provides both. Design and build the surfaces, keep the endpoints thin:

- `GET /api/updates/[product]?current=1.2.0` → JSON: `latest`, `releasedAt`, `notesUrl`, `minPhp`, `download` (signed URL, short TTL), `checksum`. Requires a valid purchase code; responds `403` with a machine-readable reason when the support/update entitlement fails.
- `POST /api/licenses/verify` → the Section 7.10 verifier. Server-only token, rate-limited, redacted logs.
- `GET /changelog/[product]/rss.xml` → the human-readable counterpart, one source of truth with the changelog MDX.

Keep the response contract in a shared `types/updates.ts` and mirror the exact field names the app's updater expects. **Cross-check against the app before shipping** - a field-name drift here shows up as a silent "no updates available" in every customer's install.

### 9.2 Aonomy: demo page now, refresh later

*Decided Aug 11, 2026 (revised):* **no refresh before launch.** Aonomy ships as-is on the lightweight demo page in Section 7.4b (`type: html-template`, `presentation: demo`), pointing at its existing ThemeForest item. The rebuild is a later project and **is not a launch blocker**.

What this brief owns:

- Frontmatter describes the item **as it actually is today** - Bootstrap 4 + Sass, jQuery, 8 demos, 13 sections (Section 15 has the verified inventory and dependency list). State the tooling plainly; don't dress it up and don't apologise for it.
- **Omit `version`, `releasedAt` and `updatedAt`** from Aonomy's frontmatter entirely. There is no changelog, so a version number means nothing, and a "last updated" date from 2018 is the one piece of data on this site that would actively contradict Section 0 rule 1. The schema must allow their absence for `presentation: demo` - that's a Zod branch, not a nullable field rendered as "—".
- **No labelling in either direction.** No "legacy", "v1", "unmaintained", "maintained for bugs only", and equally no "refresh coming soon" or "v2 in progress". `<StatusBadge>` needs no "Legacy" variant - don't build one.
- The page is quiet and factual. Its value is the 7 live demos and the page inventory; that content is genuinely good and doesn't need a maintenance story to justify it.
- **When the refresh lands:** flip `presentation` to `full`, add the version and changelog starting at **v2.0.0** with an honest "rebuilt from the ground up" entry, and do not fabricate entries for the intervening years. Same URL throughout.

### 9.3 Launch timing

*Decided Aug 11, 2026:* **the site and SlotDesk AI's CodeCanyon listing go live together.** Aonomy's demo page ships day one too, since its item is already live on ThemeForest and needs nothing from us. Design consequences, all of them subtractive - build none of these:

- **No pre-launch states.** No "coming soon" product cards, no countdown, no waitlist, no "Notify me" email capture, no disabled buy buttons. Every `<BuyButton>` resolves to a real live item page on day one; a product whose listing is not live is simply not in `content/products/`.
- **No launch banner** or announcement bar. The site opens as a finished catalogue, not an event.
- The **blog may launch empty-ish but not empty** - see Section 14. If there are no posts, cut the route from the nav rather than shipping an empty index.
- **Launch shape is one full product + one demo page.** Every multi-product surface (docs switcher, changelog index, products facets, related-products rows) must therefore be verified in its *one-and-a-bit* state, not just its imagined full state. This is the single most likely source of "looks unfinished" bugs.

### 9.4 Aonomy's demos and documentation (blocking for the demo page)

The Section 7.4b page is, functionally, **eight links plus a documentation link**. If those don't resolve, the page is worthless and so is the item's ThemeForest listing. Per §1.3 these are **static passthrough on the apex domain**, served from the Next app's `public/` - no subdomain, no PHP:

- **8 demos** at `themeaves.com/aonomy/index-<variant>.html` (exact filenames in §15.1).
- **Documentation** at `themeaves.com/aonomy/documentation/` - the existing 2018 Bootstrap 2 doc, **served as-is**. Not rebuilt, not restyled, not ported into `<DocsShell>`.

Four rules:

1. **Leave the files byte-identical.** They are a frozen 2018 artefact: no CSP, no Next image pipeline, no theme script, no asset-path rewrites, no injected analytics, no "quick fixes" to the jQuery. Touching them is the refresh project, not this one.
2. **⚠️ Delete every `.php` file before deploying.** Static hosts serve unknown extensions as plain text, so the template's PHPMailer contact script would become **publicly readable source, including any SMTP credentials configured in it.** The form is worthless in a demo, so removal costs nothing - this is the one permitted deviation from rule 1, and it is a deletion, never an edit. *If the working contact form matters more, Aonomy moves into the demo box's `public/aonomy/` instead, where PHP executes and source stays protected - still one subdomain total.*
3. **The existing ThemeForest preview URL must keep resolving.** Whatever URL the live item points at is baked into the listing, and buyers arrive from ThemeForest, not from us. **Verify it works today** - `themeaves.com` is not live, so the item's preview may well be broken right now, quietly costing sales. Changing an item's Live Preview URL is an item edit that goes through Envato review, so **choose the final URL once** and add a permanent redirect from the old path rather than moving the demos twice.
4. **Same domain, but still a hand-off.** These pages share the domain and nothing else - no shared nav, theme, session or fonts. A visitor clicking through is crossing into a 2018 artefact and the seam will show. That's why every demo link carries an external glyph and opens in a new tab: the site should read as having *handed them off*, not as having broken.

### 9.5 The SlotDesk live demo (blocking for the product page)

*Decided Aug 11, 2026:* a **real Laravel instance** at `demo.themeaves.com` on PHP hosting, with published logins and a nightly reset. For a $59-class CodeCanyon script this is the single highest-leverage sales asset - a buyer who books an appointment in the demo has already decided.

This brief owns the **surfaces** (`<DemoCredentials>`, the product-page block, `/demos`). The instance itself is app-side work; what it must guarantee:

- **Two published logins**, business owner and super admin, so both panels are reachable. Publish them openly - no gate, no email capture, no "request a demo".
- **Simulated mode everywhere the outside world would be touched.** WhatsApp sends nothing real (the built-in simulator carries it), AI runs against a cheap capped model or canned replies, payments use the fake gateway, no outbound email leaves the box. **A demo that can spend money or message strangers is a liability, not a sales asset.**
- **Nightly reset** to a seeded snapshot, with the reset time stated on the page so a visitor who finds it mangled at 23:00 knows why.
- **Seeded with data that looks real** - a salon with staff, services, a week of bookings, and a completed AI conversation in the inbox. An empty demo sells nothing; this is the same reason the app's empty states exist, inverted.
- **Rate-limit and cap it.** Assume it will be scraped, spammed and probed. No real credentials or keys in its `.env` beyond what simulated mode needs, and nothing in it that matters if it is destroyed.

**On the marketing site side, the only hard requirement is honesty:** state that it resets, state that WhatsApp/AI/payments are simulated, and never imply the demo proves live WhatsApp delivery. That claim belongs to the docs and the changelog, not to a sandbox.

---

## 10. Envato Compliance (blocking - design the site around these)

1. **We sell nothing here.** If we're an exclusive Envato author, items may not be sold outside the marketplace. Every purchase path is a deep link to the item page. **No cart, no checkout, no Stripe, no "Buy direct - cheaper".** `<BuyButton>` is a link element, always.
2. **Their marks are theirs.** "Envato", "CodeCanyon", "ThemeForest" appear as **plain text links**. No Envato logos, no badge lockups, no layout implying partnership or endorsement. Approved phrasing: "Available on CodeCanyon", "Get it on ThemeForest". **Not** approved: any member-since or author-tenure phrasing (Section 0 rule 1). Footer carries a plain line noting the marks belong to Envato Pty Ltd and we are an independent author.
3. **No inflated or invented metrics.** Ratings and review quotes reflect the marketplace, sourced from frontmatter, updated when they change. Attribute reviews to the handle that wrote them. Sales figures are opt-in per product and absent by default.
4. **Support scope stated honestly.** Six months included per Envato item support terms, renewals through Envato only, scope (bugs and included-feature help) vs out-of-scope (customisation, third-party integrations, server admin) written plainly on `/support`.
5. **Don't leak the product.** The item zip is never publicly downloadable; demos are hosted previews. The docs may be public - that helps sales - but licensed source must not be.
6. **The site must not be one of our own templates re-skinned.** It's the studio's shopfront; if a buyer recognises the layout from Aonomy, the credibility argument collapses.

---

## 11. Accessibility, Performance & Quality Bar

**A11y (AA minimum):** semantic landmarks and one `<h1>` per page; visible `focus-visible` ring (2px `--ink`, offset 2, `--sun` on ink fills); full keyboard paths through nav drawer, docs sidebar, lightbox, accordion and `Cmd+K` (focus trap + Esc + restore); every image has real alt text (decorative art `aria-hidden`); form errors tied via `aria-describedby` and announced; `prefers-reduced-motion` honoured everywhere; **both themes** contrast-checked - the fill-only colour law in Section 4 is the main failure mode; never colour-only status (always a dot, icon or label too); target size ≥44px on mobile.

**Performance budgets:** LCP < 2.0s on 4G mobile; CLS < 0.05 (reserve every image box); client JS ≤ 120KB gzipped on marketing routes, ≤ 180KB on docs; ≤ 4 font files; no client-side syntax highlighter, no icon font, no jQuery, no UI kit (Bootstrap/MUI/shadcn wholesale - build from tokens); marketing and docs statically rendered; images `next/image` with explicit sizes; third-party scripts: **analytics only** (privacy-friendly, no cookie banner needed), loaded `afterInteractive`.

**Responsive:** 375 / 768 / 1280 / 1600 verified per route. No horizontal page scroll ever - wide tables, code blocks and spec tables scroll inside their own `overflow-x:auto` container. `<WingEdge>` flattens under 640px. Long product names, versions and buyer handles must truncate gracefully, not reflow the layout.

---

## 12. Build Order (for the design agent)

1. **Tokens + theme** - `app/globals.css` (`:root`, `.dark`, `@theme inline`), fonts via `next/font`, pre-paint theme script. Ship a `/_dev/tokens` swatch page proving every token in both themes, then keep it out of the sitemap.
2. **Brand assets** - the size ladder + mono variants + favicon set + OG route. Verify the micro mark at real 16px before continuing.
3. **Signature components** (Section 6, in order) on a `/_dev/kit` gallery page showing every state of every component in both themes. This is the visual contract; review it before any page exists.
4. **Global chrome** - header, drawer, footer, container, prose.
5. **Home** - the hardest page; it sets the compositional language the rest inherits. The proof band (7.2 §2) is the piece to get right, since it carries the trust load.
6. **Product detail template, type- and presentation-aware from the start** → wire SlotDesk AI (`php-script` / `full`) first, then Aonomy (`html-template` / `demo`, Section 7.4b), then **stub a fake `cms-theme` + `full` product locally** to prove the remaining combination renders before you claim the template is done. Products index and its two-axis faceting fall out of this.
7. **Docs shell** + SlotDesk's tree (doubles as the item's bundled HTML docs). Verify it in its **single-product** launch state (collapsed switcher) *and* at 5-page depth with the multi-product switcher forced on.
8. **Changelog + feeds**, then the **`/demos` hub** (it needs `<DemoCredentials>` and the gallery, both already built by then).
9. **Portal** (`/licenses` + route handlers + updater endpoints), then **legal**, **thin support**, **about**, error pages. **No blog** (§1.3).
10. **Verify** - Playwright screenshots at all four widths × both themes for every route; read them yourself and diff against this brief until the delta list is empty. Then Lighthouse, then axe.

**Working rules:** one route at a time, finished (all states, both themes, all widths) before the next. Never hardcode a hex, a px radius or an ad-hoc shadow. Never invent an unspecced screen. If something in this brief is wrong once built, fix the brief in the same pass.

---

## 13. Acceptance Checklist

**Brand & tokens**
- [ ] Token layer in `globals.css` (light + dark, `@theme inline`); zero hardcoded hex in components; `/_dev/tokens` proves both themes
- [ ] Fill-only colour law respected - no `--sun`/`--tide`/`--flare` used as text on paper; `-deep` variants used for coloured text; AA passes in both themes
- [ ] `--product` accent slot works; SlotDesk and Aonomy pages differ in accent without any layout fork
- [ ] Logo size ladder shipped (full / compact / micro) and each verified at its real size; mono-navy + mono-white variants exist
- [ ] Mark is swappable: replacing `public/brand/mark.svg` breaks nothing; no layout derives geometry from the bird's paths
- [ ] Inlined SVG uses presentation attributes or namespaced classes - no `.cls-*` collisions
- [ ] Favicon, apple-icon, 512 icon, manifest, dynamic OG route all present
- [ ] Logo licence certificate archived with the brand assets and excluded from the deployed bundle

**Components & pages**
- [ ] All 23 signature components built, on a `/_dev/kit` gallery with every state, both themes; 21-23 code-split so `php-script` pages don't ship them
- [ ] Lucide icons only; no hand-drawn icon SVG; no UI kit dependency
- [ ] Every route in Section 7 exists, with empty / loading / error states
- [ ] All routes verified at 375 / 768 / 1280 / 1600 in light and dark; no horizontal page scroll anywhere
- [ ] Reviews section looks deliberate with exactly 2 reviews; products grid and facets look deliberate with exactly 2 products
- [ ] Zero banned patterns (Section 2): no wave dividers, gradients, glass, carousels, counters, stock 3D, fake logos
- [ ] Site does not resemble any of our own templates

**Product types & presentation depths (Sections 1.1, 1.2)**
- [ ] All three `type` variants render from the one template - verified with a stub `cms-theme` product, not just the two real ones
- [ ] Both `presentation` depths render from the same template and the same URL shape; `full` → `demo` is a frontmatter change with no route change
- [ ] CTA order flips correctly by type: buy-first for `php-script`, demo-first for `html-template` / `cms-theme`
- [ ] `<VariantGallery>`, `<PageInventory>`, `<CompatTable>` each work and are absent from types that don't use them
- [ ] Products index facets on marketplace × type, syncs to URL, and hides facets with no matches
- [ ] Docs shell verified in single-product state (switcher collapsed, `/docs` redirects) and multi-product state

**The Aonomy demo page (Sections 7.4b, 9.2)**
- [ ] Reads as a deliberate short page, not a full page with holes; `<VariantGallery>` gets full width and **all 8 demos open working live URLs** (click every one)
- [ ] Nothing ported from the old demo page that Section 9.2 forbids: no "v 1.0" pill, no "© 2018" line
- [ ] No `version`, no `releasedAt`, no `updatedAt` rendered or present in frontmatter - and the build fails if one is added
- [ ] No docs link, changelog link, updater mention, features grid, FAQ, support-window block or sticky CTA bar on it
- [ ] No labelling in either direction: no legacy/v1/unmaintained, and no "v2 coming soon"
- [ ] A `demo` product produces no docs route, no changelog route, no feed URL, and no sitemap entry for either

**Tenure & numbers (Section 0)**
- [ ] Grep the built output: no "since 2017", no "since 2018", no founding year, no member-since, no follower count, no years-of-experience figure, anywhere including OG images and JSON-LD
- [ ] No site-wide aggregate stat band exists; the home proof band carries trust via docs/changelog/support links instead
- [ ] Sales counts hidden unless `showSales` is explicitly true; `aggregateRating` emitted only when a real rating exists
- [ ] `/about` tells no history and no comeback story

**Content & data**
- [ ] All product numbers come from frontmatter; Zod discriminated union fails the build on bad or type-incomplete frontmatter
- [ ] Every figure on the site matches Section 0; no invented metrics, no placeholder testimonials
- [ ] MDX authoring path works: a new product is one file, a new doc page is one file
- [ ] Docs search index built at build time; `Cmd+K` works keyboard-only
- [ ] Changelog RSS + JSON feeds valid; changelog and docs surfaces verified in their single-product launch state

**Portal & integration**
- [ ] Purchase-code verification is server-side only; Envato token absent from the client bundle; rate-limited; codes never fully logged and never in a URL or analytics payload
- [ ] All six portal states designed (valid / expired / invalid / rate-limited / loading / empty)
- [ ] Download URLs signed and short-lived; item zip not publicly listable
- [ ] `/api/updates/[product]` field names cross-checked against SlotDesk's updater client

- [ ] Aonomy's 8 demos + the 2018 documentation resolve at `themeaves.com/aonomy/**` - all 9 links clicked (Section 9.4); the ThemeForest preview URL resolves, with a permanent redirect if the path changed
- [ ] **No `.php` file is deployed to the static host** - grep the deployed output; the contact script and any SMTP credentials in it are gone
- [ ] Demo files otherwise byte-identical - no CSP, image-pipeline, analytics or asset-path changes applied to them

**Scope discipline (Section 1.3)**
- [ ] No `/blog` route, nav entry, `content/blog/`, reading-time util or `Article` JSON-LD anywhere in the build
- [ ] No contact form, ticket UI, live chat or knowledge base; `/support` is triage-only and its two destinations are single values in `data/site.ts`
- [ ] `/demos` hub exists and every outbound demo link is new-tab + `rel="noopener"` + external glyph
- [ ] Demo CTA is primary and `<BuyButton>` secondary on both product pages

**SlotDesk live demo (Section 9.5)**
- [ ] `<DemoCredentials>` shows both logins with per-field copy buttons and works on mobile
- [ ] Reset cadence, and the fact that WhatsApp / AI / payments are simulated, stated on both the product page and `/demos`
- [ ] Nothing on the site implies the demo proves live WhatsApp delivery
- [ ] Credentials come from `data/site.ts`, not hardcoded in markup

**Launch (Section 9.3)**
- [ ] No pre-launch states exist: no coming-soon cards, countdown, waitlist, notify-me capture, disabled buy buttons, or launch banner
- [ ] Every `<BuyButton>` resolves to a live Envato item page
- [ ] Every multi-product surface verified in the launch shape (one `full` + one `demo`): docs switcher, changelog index, products facets, related-products rows - none of them look unfinished

**Compliance & quality**
- [ ] No checkout anywhere; every purchase path is an external link to the Envato item
- [ ] Envato marks used as plain text only; independent-author footer line present
- [ ] Support scope, support window and refund routing stated honestly on `/support` and `/refunds`
- [ ] `/license` explains Regular vs Extended in plain English with concrete examples
- [ ] LCP < 2.0s mobile, CLS < 0.05, marketing JS ≤ 120KB gz, ≤ 4 font files
- [ ] axe clean; full keyboard path through nav, docs sidebar, lightbox, accordion, Cmd+K; `prefers-reduced-motion` honoured
- [ ] JSON-LD (Organization, SoftwareApplication, Article, BreadcrumbList, FAQPage), sitemap, robots present

---

## 14. Open Decisions

**Settled Aug 11, 2026:** brand name = ThemeAves · stack = Next.js + Tailwind v4 + MDX · **no tenure signalling** (§0.1) · **three product types, one template** (§1.1) · **two presentation depths** (§1.2) · **five properties, two hosts, ONE subdomain; blog and ticket system cut** (§1.3) · **Aonomy ships as a demo page, refresh deferred** (§9.2) · **site + SlotDesk listing launch together** (§9.3) · **Aonomy demos + 2018 docs hosted as-is on a subdomain** (§9.4) · **live auto-reset SlotDesk demo instance** (§9.5) · **hosting: Vercel for the site, PHP host for both demos**.

Deferred, not open: **the Aonomy refresh** (§9.2 - absorbed by flipping one frontmatter field; pick its stack then). **The blog** (§1.3 - returns with real posts in hand, as its own decision). **`support.themeaves.com`** (§1.3, §7.6 - returns as a ticket system; swapping two `data/site.ts` values is the entire integration).

Still open:

| # | Decision | Note |
|---|---|---|
| 1 | Repo location | Separate repo (recommended - different stack, different deploy cadence, and the demo instance is a third thing again) vs a folder in this one |
| 2 | Docs single-sourcing | Confirm SlotDesk's bundled HTML docs are generated from `content/docs/slotdesk-ai/**` rather than authored twice |
| 3 | Which PHP host for `demo.` | The SlotDesk demo needs cron for the nightly reset plus a queue worker, so shared hosting may not be enough - a small VPS likely is. (Alternative worth a look: put *everything* on that one VPS - nginx serving the Next app under Node, `/aonomy/` static, `/demo/` the Laravel app - and have **zero** subdomains. Costs you Vercel's CDN and preview deploys in exchange for owning Node, nginx and certs.) |
| 4 | Aonomy's contact form | Delete the `.php` and let the form be inert (default, §9.4 rule 2), or move Aonomy onto the demo box so PHP runs it. 30-second check: does the form actually work in the current demo? It very likely doesn't |
| 5 | Analytics vendor | Privacy-friendly and cookie-banner-free (Plausible/Umami self-hosted), so `/privacy` stays short. Decide whether `demo.` gets it too |
| 6 | Which `cms-theme` first | Not needed to build the site, but the third type's real content shapes how much of `<CompatTable>` is speculative. WordPress is the safe first bet |

---

## 15. Aonomy Reference Inventory (verified from the shipped files, Aug 11, 2026)

Read from the author's own archives, not from the marketplace description - **where the two disagree, this section wins.** Source zips: `aonomy doc (1).zip` (the 2018 demo/variant page) and `documentation-20260811T015132Z-1-001.zip` (the bundled item documentation). Both currently live in `C:\Users\Shuvo\Downloads\`; **copy what's reused into the site repo** rather than referencing Downloads from code, and archive the originals somewhere durable.

### 15.1 The 8 demos - exact labels and files

The ThemeForest description says "7 different background templates". The shipped demo page has **8 tiles**, and the documentation resolves it: there are **7 background *effects*** plus a **slider** demo, which isn't an effect. Use 8 on the site, with these exact labels:

| Label | File | Effect? |
|---|---|---|
| Video Background | `index-video.html` | ✅ |
| Particles Background | `index-particles.html` | ✅ |
| Snow Background | `index-snow.html` | ✅ |
| Star Background | `index-star.html` | ✅ |
| Bubble Background | `index-bubble.html` | ✅ |
| Wave Background | `index-wave.html` | ✅ |
| Parallax Background | `index-parallax.html` | ✅ |
| Slider Background | `index-slider.html` | slider, not an effect |

### 15.2 The 13 landing sections

Work · Feature · Video · App Screen · Download · App Prices · Testimonial · Team · Statistics · News · Subscribe · Contact · Footer.

*(The shipped docs misspell this as "Downlaod Section" - **fix the typo** if any of that copy is ported; don't carry it forward.)*

### 15.3 Real dependency list (for the tooling row - state it plainly)

Bootstrap 4 + Sass · jQuery + jquery-migrate · particles.js (config in `assets/json/particles.json`) · jQuery Stellar (parallax) · Icofont · Chivo (Google Fonts) · a cube-grid preloader.

Two honest notes for the facts strip: the template **loads Chivo from Google Fonts at runtime**, and `jquery-migrate` is present, which tells a developer something real about its age. State both; don't hide them and don't editorialise.

### 15.4 Reusable assets

- **8 variant thumbnails**, `800×377` JPEG (≈2.12:1), in `demo/img/*-thumbnail.jpg`. Good enough for `<VariantGallery>`'s **thumbnail rail**, too soft for a full-width preview pane - **re-capture the main previews at 2×** from the live demos, which is trivial once Section 9.4 is done. Note the 2.12:1 ratio doesn't match the 16:10 `<ProductCard>` thumbnail; crop deliberately rather than letting it stretch.
- `banner.jpg` at `2000×1331` - the only large asset, usable for the product card or OG image after re-crop.
- `logo.png` - the **old Aonomy product logo, not the ThemeAves brand mark.** Don't confuse the two, and don't put it in `public/brand/`.
- 26 documentation screenshots (`image_1`…`image_26`, one gap), mostly `1366×678`. Only relevant if Aonomy is promoted to `presentation: full`.

### 15.5 The old demo page - what to take and what to drop

Its structure is actually close to Section 7.4b, which is a good sign: header with logo, **Purchase + Demos buttons** (already demo-forward, matching our CTA order), a 2-up thumbnail grid, thin footer.

**Do not port:** the **"v 1.0" pill** and the **"© 2018 ThemeAves"** footer line. Those are precisely the two data points Sections 0.1 and 9.2 exclude, and they're the most likely things to be copied across by reflex. Also drop the preloader, the smooth-scroll hijack (its `$('a').click()` handler intercepts *every* link on the page - a real bug, not a style choice), and the particles background in the header.

### 15.6 If Aonomy is promoted to `full` later

The bundled documentation already has a usable tree, and it maps onto the `html-template` docs depth in Section 7.7: **Getting Started · File Structure** (HTML / CSS / JS / JSON) **· Header Customization** (the 7 effects) **· Sections Customization** (the 13 sections) **· Help & Support**. Port the content, not the container - the existing doc is a Bootstrap 2 "Documenter" template running jQuery, prettify and scrollTo, and it would be rebuilt in `<DocsShell>` (Section 7.7) rather than iframed or copied.

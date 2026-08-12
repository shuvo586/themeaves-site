# ThemeAves - Site Design Commission (Claude Design)

**Issued:** 2026-08-11 · **Status:** open · **Supersedes:** every earlier brief and correction pack
**Scope:** the complete visual system and the full page set, designed from zero.

**Give the design agent this file and nothing else.** It is self-contained. The earlier brief and
the two correction packs in `_dev/brainstorm/` and `docs/` are historical record. Do not hand them
over alongside this and do not reconcile them against it. Reconciling three documents is how the
last three attempts failed.

---

## 0. What is open, and what is fixed

**There is no logo. There is no existing brand identity. There is no palette to inherit.**

**A mark will be designed later, after this system exists**, and it will be drawn to fit the
palette and type you choose here. That order is deliberate: the previous attempt derived the whole
system from a logo and inherited its four hexes as the entire palette. So design the system first,
leave a slot for a mark in the header lockup and the favicon set, and **do not let the absence of a
mark shape any other decision.** The site must look finished with a wordmark alone.

### Open. These are yours to decide

The **entire visual system**, and you are expected to have a point of view about it:

- The design concept and what the site should feel like.
- The colour system. Every hue, every neutral, the cast, the number of accents, how colour is spent.
- Typography. Faces, pairing, ramp, weights, tracking, measure.
- Spacing and the grid. The scale, the rhythm, the container, the column count.
- Shape language. Radii, borders, elevation, whether cards or rules or planes carry the structure.
- Composition. How a section is built, how a page is paced, what the signature device is.
- Motion.

Nothing in the repository's history binds any of this. If a previous attempt used a warm paper, a
folded corner, a three-colour stripe or a navy headline, that is not precedent, it is just what
happened before.

### Fixed. These are not design decisions

- **Who the site is for** and what it has to do (Section 1).
- **Content honesty and Envato compliance** (Section 2). These are legal and reputational, not
  stylistic.
- **The page set and what each page must contain** (Section 6). The information architecture is
  settled. How any of it looks is not.
- **The functional component inventory** (Section 7). What each component must do and hold. Not what
  it looks like.
- **The accessibility, performance and responsive bar** (Section 9).
- **Voice and copy rules** (Section 11).

### The one process requirement

**Do not build the site first and show it to me.** Section 5 asks for design directions as
proposals, with the reasoning visible, before anything is implemented. Three previous rounds were
built end to end and rejected on sight, which is expensive for both of us.

---

## 1. The assignment

Design and build the ThemeAves website: **Next.js (App Router) + TypeScript + Tailwind CSS v4**,
MDX-driven content, statically rendered wherever possible.

ThemeAves is a small independent studio selling on **ThemeForest** (HTML templates, CMS themes) and
**CodeCanyon** (PHP scripts). This site is the shopfront. It sells nothing directly; every purchase
path is a deep link to the marketplace item.

**Audiences, in priority order:**

1. **An Envato buyer mid-decision.** Arrived from an item page or a search, deciding whether this is
   a real studio worth trusting with $16 to $59 and a production deploy. They want to know: does
   this look built by someone competent, is support real, is it maintained. **Note what is not on
   that list: how long the studio has existed.**
2. **An existing customer with a problem.** Needs docs, a changelog entry, or a licence answer in
   under 30 seconds. If they have to email, the site failed.
3. **The studio.** Publishing a product or a release must mean adding MDX files, not touching layout
   code.

**The launch catalogue is two items.** Design for two and make sure the same components hold at
twelve. A layout that only works with six product cards or twelve testimonials is the wrong layout
for this site.

| Item | Marketplace | `type` | `presentation` |
|---|---|---|---|
| **SlotDesk AI** | CodeCanyon | `php-script` | `full` - the flagship, deepest treatment |
| **Aonomy** | ThemeForest | `html-template` | `demo` - short, preview-first page |

Two frontmatter fields drive the product template. **`type`** (`php-script` / `html-template` /
`cms-theme`) reorders and adds sections. **`presentation`** (`full` / `demo`) sets how much page an
item gets. Both live at `/products/<slug>`, so promoting Aonomy later is a frontmatter change, not a
new route. Build all three types from day one or the third item forces a rewrite.

**One CTA rule, every type:** wherever a live demo exists, **the demo is the primary action and the
buy button is secondary**. Nobody buys a $16 template or a $59 script they have not seen running.

---

## 2. Hard rules

### 2.1 Content honesty

1. **No tenure signalling, anywhere.** No founding year, no "since 2018", no "N years of
   experience", no member-since badge, no follower count. This binds copy, OG images, JSON-LD
   (`foundingDate` omitted) and the footer. The account existed from 2018 with a single item and was
   then dormant, so tenure invites arithmetic that works against us. Trust is earned here with
   present-tense verifiable things: shipped docs, dated changelogs, stated support scope, visible
   craft.
2. **No invented numbers, ever.** Every figure reads from `data/site.ts` or product frontmatter. No
   "10,000+ customers", no rounded sales, no invented review quotes, no stock team photos. Sales
   counts are opt-in per product via `showSales`, default `false`. There is **no site-wide stat
   band**.
3. **No filled holes.** If a section needs content that does not exist, omit the section. Two real
   reviews beat a three-column grid with a placeholder in it.

### 2.2 Envato compliance

1. **Nothing is sold here.** No cart, no checkout, no payment provider. Every buy path is a link to
   the item page.
2. **Envato's marks are theirs.** "Envato", "CodeCanyon", "ThemeForest" appear as plain text links.
   No Envato logos, no badges, no layout implying partnership. Approved: "Available on CodeCanyon".
   The footer carries a plain line noting the marks belong to Envato Pty Ltd and ThemeAves is an
   independent author.
3. **Support scope stated honestly.** Six months included per Envato item support terms, renewals
   through Envato, scope and out-of-scope written plainly.
4. **The product is not leaked.** Item zips are never publicly downloadable. Docs may be public;
   licensed source may not.

---

## 3. The one aesthetic constraint

This studio sells HTML templates. **The site must not look like one.**

If a buyer recognises this layout from a marketplace preview, the credibility argument collapses
entirely: the whole pitch is that this is the studio that *made* the templates, not one of them.
This is a commercial requirement, not a taste preference, and it is the only thing in this document
that constrains how the site looks.

What that rules out, concretely, because these are the tells:

- Purple-to-blue gradients, glassmorphism, glow, neon, mesh blobs, animated gradient text.
- Wave section dividers. Any wave. Any blob.
- Auto-playing hero carousels, counting-up odometer stats, parallax, scroll-jacking, marquees.
- "Awesome Features", "Our Amazing Team", "What We Do", "Why Choose Us" as headings.
- Generic 3D isometric illustrations, stock office photography, robot mascots, AI sparkle emoji.
- Three identical icon-circle cards.
- Floating chat bubbles, exit-intent popups, "Trusted by" rows of grey logos that do not exist.
- Fonts that read as the marketplace default: Poppins, Montserrat, DM Sans, Plus Jakarta Sans,
  Manrope, Nunito, Raleway.

**Everything not on that list is available to you**, including approaches that would be wrong for a
different client. Be opinionated. A safe, generic system fails this brief just as surely as a
gaudy one.

**Imagery:** the only images this site will ever have are real product screenshots. There is no
photography budget, no illustration, no mascot. Design a system that is strong without imagery,
because for the first weeks the screenshots will be placeholders.

---

## 4. What went wrong three times

Not rules. Evidence, so you can avoid paying for the same lessons. Each of these was a full build
that was rejected.

**Round 1 and 2: confetti.** The accent colours appeared in **24 separate places** on the homepage
and painted **0.08% of its area**, because every appearance was a 3px edge or a hairline. All three
accents showed up inside four different sections. The result was busy and colourless at the same
time, and it read as a template rather than a system. *The lesson: a colour system is judged by how
much area it commits and how consistently, not by how many elements it touches.*

**Round 3: the void.** The fix for confetti was one full-bleed accent band. It shipped **660px tall
with content in the left 45% and nothing in the rest**. Generous space is not blank space, and a
tall empty saturated rectangle reads as a section that failed to load. *The lesson: committing to a
plane means filling it or making it short.*

**Every round: nobody looked.** Each build satisfied its written spec and was unusable on sight,
because the checks were all countable ones. *The lesson in Section 10: render it, open the image,
and judge it with your eyes before you hand it over.*

**Every round: contrast was assumed, not computed.** The palette was defined by picking hues that
looked right, then text was placed on them. Three separate AA failures shipped, including white text
on a saturated plane at 3.45:1 and a button that was white-on-near-white in dark mode because its
fill inverted with the theme and its text did not. *The lesson in Section 5.2.*

---

## 5. The design proposal

**This is the first deliverable, and the build stops here until one direction is chosen.**

### 5.1 What to produce

**Two or three genuinely distinct directions.** Distinct means different concepts, not the same
layout in three colourways. If two of them could share a stylesheet, you have one direction.

For each, one page containing:

1. **The concept in one sentence**, and one paragraph on why it suits a studio selling developer
   products to Envato buyers.
2. **The full colour system**, every token, light and dark, with **measured contrast ratios printed
   next to each pair** (Section 5.2). Say how many accents there are and why that number.
3. **The type system.** Faces named, with a sentence on why that pairing and not the obvious one.
   The full ramp with sizes, line heights, weights and tracking. Show it set, not as a specimen
   list.
4. **The spacing and grid system.** The scale, the container, the column count, the section rhythm.
   Say what the system is, not just what the numbers are.
5. **Shape and depth.** Radii, borders, elevation. What carries structure: rules, borders, fills,
   shadows or space.
6. **The signature device.** The one recurring element that makes the site recognisable. Every
   system needs one and it should not be decoration for its own sake.
7. **Motion**, in two or three lines.
8. **The homepage hero, rendered**, at 1440 in both themes. Not a description of it.

Then **stop and wait.** Do not build the kit, do not build a page.

### 5.2 The contrast law, which applies to whatever you choose

This is maths, not taste, and it is where three rounds broke.

- **Every text and background pair clears AA**, 4.5:1 for body, 3:1 for large text, in **both
  themes**. Compute the ratios. Print them on the proposal. Do not eyeball them.
- **A saturated colour that passes as text on paper does not automatically pass as a background
  under text.** These are different tests. Run both for any hue you intend to use as a plane.
- **Any token whose job is "a surface that carries text" must be pinned in both themes, and its text
  partner pinned with it.** A fill that inverts under text that does not is the exact bug that
  shipped: `--ink` flipped light in dark mode, `--on-solid` stayed white, and the primary button
  landed at 1.05:1. If you pin a plane, a literal `#FFFFFF` on it is correct, not a token violation.
- **Status is never colour-only.** Every state also carries a dot, an icon or a word.

### 5.3 The colour discipline, which you define

Do not let me pick your number, but **do pick one and publish it.**

State, as part of the proposal, how your system spends colour: how many distinct colour moments a
page may carry, how much area at least one of them commits, and what "quiet" means for the sections
that carry none. Then hold the build to it and be prepared for it to be measured.

The two failure modes in Section 4 are the boundaries. Twenty-four tiny events is one wall. A tall
empty plane is the other. Where the right answer sits between them is your call, and a
well-argued four is as valid as a well-argued twelve. **What is not acceptable is having no stated
discipline**, which is how the page ended up with twenty-four.

Going fully monochrome is available to you, but it is a choice you should have to defend rather than
default into.

---

## 6. Pages

The information architecture is settled. Everything below is what each page must contain and do. How
it looks, how it is composed and what it is built from is yours.

Design **light and dark for every route**, at **390 / 768 / 1024 / 1440**. Every data surface needs
empty, loading and error states.

### 6.1 Global chrome

**Header.** Sticky. Start: the wordmark, with a reserved slot ahead of it for a mark that does not
exist yet. Nav: **Products · Demos · Docs · Changelog · Support**. End: theme toggle and a "My
licence" action. Needs a resolved mobile pattern. "Demos" earns a nav slot because the demos are the
conversion lever and they live on other hosts, so they need a findable route.

**Footer.** Four groups: brand (wordmark plus a one-line positioning statement, **positioning, not
tenure**), Products, Resources (Demos, Docs, Changelog, Licence explainer), Company (About, Support,
Terms, Privacy, Refunds). Plus copyright and the Envato attribution line from Section 2.2.
**Outbound links to the demo hosts carry an external-link indicator** so nobody is surprised to
leave the site.

### 6.2 `/` Home

The hardest page. It sets the compositional language everything else inherits. Eight jobs, in this
order. Whether each is a section, a band, a rail or something you invent is up to you.

1. **Hero.** What the studio makes, stated in a headline of nine words or fewer, plus a two-line
   lead and two actions. The art is a SlotDesk dashboard screenshot and a WhatsApp booking
   conversation on a phone. Both come from the flagship so the art tells one story: a message
   arrives, a booking appears.
2. **The trust band.** Section 2.1 forbids the stat strip that would normally sit here, so this slot
   has to earn trust differently: **three things a competitor with an abandoned item cannot fake** -
   public documentation, a dated changelog, a written support scope. **Each title must be a claim
   with a verb, not a nav label.** "The full documentation is public before you buy" does the job;
   "Read the docs" reads as a nav row and does not.
3. **Products.** Both items. A `demo`-depth item is not visually demoted; it just links to a shorter
   page.
4. **The flagship.** SlotDesk AI gets the page's biggest single moment: a claim, three supporting
   points, a real booking conversation, one action to the product page. This is the band that
   justifies the site existing.
5. **How we build.** Three points on craft, updates and support. Copy is specific ("every release
   ships a changelog entry and a one-click updater"), never values-page filler.
6. **Demos.** Aonomy's 8 demo variants plus the SlotDesk app demo, in something that makes clear
   there is more than fits. Wide content scrolls inside its own container, never the page.
7. **FAQ.** Five or six entries: support scope, what self-hosted means, updates, refunds, licence
   types.
8. **Closing CTA.** One action.

### 6.3 `/products`

Page header, then **two-axis faceting** as client state with URL search-param sync: marketplace (All
/ CodeCanyon / ThemeForest) crossed with type (Scripts / HTML templates / CMS themes). Live result
count. Product grid, newest first. **Render only facets that have matches**, so the UI does not look
absurd with two products. Combined-filter empty state with a clear-filters action. No pagination
under 12 items.

### 6.4 `/products/[slug]` where `presentation: full`

SlotDesk AI ships this. One template, three type variants, driven by frontmatter.

1. **Hero.** Breadcrumbs, marketplace and type and category tags, name, one-line pitch,
   `<ProductFacts>`, **"Try the live demo" primary with the buy button secondary**, text links to
   Docs and Changelog, a large screenshot.
2. **Screenshot gallery.** Five to eight shots, opening a lightbox with keyboard arrows, Esc and a
   focus trap. Mobile shots use the phone frame.
3. **Type block**, the one section that varies. `php-script`: **demo credentials first**, then
   server requirements and an install summary. `html-template`: variant gallery, page inventory,
   build tooling. `cms-theme`: compatibility table, demo-importer explainer, bundled-plugin list.
4. **Features.** Five to seven.
5. **What's included.** Files, docs, updates, support window.
6. **Spec table.** Requirements, tested browsers, licence, version. The stack row reads
   PHP/Laravel/MySQL, or build tooling, or platform versions, per type.
7. **Latest changes.** Three entries plus a link to the full changelog.
8. **Product FAQ** and a support box.
9. **Related products**, preferring same type then same marketplace.
10. **Sticky mobile CTA** once the hero scrolls out: name, price, primary action. **Desktop gets no
    sticky bar.**

### 6.5 `/products/[slug]` where `presentation: demo`

Aonomy ships this. Same route, same template file, far fewer sections. **It must read as a
deliberately short page, not a full page with holes**, which means fewer and larger sections rather
than the same sections half filled.

1. **Hero.** Breadcrumbs, tags, name, one-line pitch, **"View live demo" primary**, buy button
   secondary, price, and a plain link to **"Documentation"** (external, new tab). Trimmed facts:
   **tooling and section count, not version and last updated.** A stale "last updated" date is
   exactly the signal to avoid, and there is no version story without a changelog. No changelog
   link, because there is none.
2. **Variant gallery.** The centrepiece, immediately below the hero. All 8 demos: Video, Particles,
   Snow, Star, Bubble, Slider, Wave, Parallax. Each opens its own live demo in a new tab.
3. **Page inventory.** Lead with the 13 landing sections; the file list is secondary. For a one-page
   template the sections are what a buyer is actually shopping for.
4. **Facts strip.** Build tooling (Bootstrap 4 and Sass), browser support, what is in the download,
   licence. Stated plainly, no framing.
5. **Where to get it.** The buy action, the price, and a link to the ThemeForest item page for
   reviews and full details. This page feeds the item page, it does not replace it.
6. **Related products**, pointing at the flagship so a visitor does not dead-end.

**Explicitly absent, do not build and do not stub:** features grid, changelog, updater mention,
product FAQ, support-window block, sticky mobile CTA, in-site docs route. **No "legacy", "v1",
"unmaintained" or "coming soon" labelling anywhere on it.** The external documentation link points
at a 2018 page that looks nothing like this site. That is honest and acceptable. Do not iframe it,
do not restyle it, and do not apologise for it in the link label.

### 6.6 `/demos`

One short page. The demos live on other hosts, so this is the only place that gathers them.

- **SlotDesk AI**: a screenshot, "Open the live demo", and **the demo credentials inline** so a
  buyer sees the logins before deciding to click. Nightly-reset and simulated-mode notes here.
- **Aonomy**: the 8 variants at reduced size, plus the external documentation link.
- Nothing else. No hero, no marketing copy beyond one line each, no FAQ. This page exists to get
  people out of it quickly; the product pages do the selling.

Every outbound link: new tab, `rel="noopener"`, external indicator.

### 6.7 `/docs`, `/docs/[product]`, `/docs/[product]/[...slug]`

Docs shell: product switcher, sidebar tree, content column, right-hand TOC with scroll-spy. Mobile
needs a resolved pattern for both the sidebar and the TOC. Article page: breadcrumbs, h1, "Updated
{date}", prose, callouts, code blocks, zoomable screenshots, copy-link anchors, prev/next footer, a
two-button "Was this helpful?".

**Search:** build-time JSON index (title, headings, first 200 characters), client filter in a
`Cmd+K` dialog. No Algolia, no third-party script.

**At launch exactly one product has docs.** Collapse the switcher to a static label rather than
rendering a one-option dropdown, and let `/docs` redirect to `/docs/slotdesk-ai`. Keep the
multi-product chooser behind that count check. Verify the shell in its single-product launch state
**and** at five-page depth with the switcher forced on. The sidebar must not look broken with five
pages and no nesting.

### 6.8 `/changelog`, `/changelog/[product]`

Version list, newest first, "Latest" state on the newest, a "how to update" note at the top, and
**RSS plus JSON feeds**.

**Only `presentation: full` products have changelogs**, so at launch this is SlotDesk alone. Render
as a single product's history without product tags. Anything that groups by year must look right
with one year. A `demo` product never appears here and never gets a feed URL. The changelog does
real trust work now that tenure is off the table, so **one product's honestly dated history beats
two products' thin ones. Do not pad it.**

### 6.9 `/licenses` and the result view

Code-based, **no accounts**, matching how Envato works. Six states, all designed:

1. **Verify.** The purchase-code field plus a check action, and an explanation of where to find a
   purchase code with a small annotated screenshot.
2. **Valid.** Item name and thumbnail, licence type with a plain-English line, purchase date, buyer
   handle, support window with an expiry date, and a downloads list (latest plus previous two, with
   size, date and checksum). Secondary actions: docs, changelog, renew.
3. **Support expired.** Valid licence, expired state, updates still downloadable, renewal explained
   and linked to Envato. **Must not read as punishment.**
4. **Invalid.** The three likely causes and a link to `/support`.
5. **Rate-limited.** Calm, states the wait, no CAPTCHA wall.
6. **Loading.** Inline, in the button, plus a skeleton result. Never a full-page loader.

**Security the design must not fight:** verification runs server-side only, the Envato token never
reaches the client bundle, rate-limit by IP and code, **never log a full purchase code** (last six
characters maximum), no code in a URL query string or in analytics, downloads are signed short-TTL
URLs.

### 6.10 `/about`

Editorial single column with full-bleed interruptions. What the studio makes (one honest paragraph,
**no founding year, no history, no comeback narrative** - this is the page that most wants to tell a
story, so the rule bites hardest here), how it works (design in the open, ship changelogs, answer
support), what it will not do (no abandoned items, no fake numbers), who is behind it (real name and
handle, no stock portrait), a closing contact action. **No timeline, no "our journey", no "our
mission", no team grid of one person.**

### 6.11 `/support`

**Triage only. Build no form and no ticket UI.** A contact form emailing a mailbox nobody has
committed to watching is worse than a plain address, because it implies a queue that does not exist.

Four blocks: **three route cards** (item support goes to the Envato item's comments tab, with a list
of what to include; licence or download goes to `/licenses`; pre-sale goes to the email address
stated in full, copyable, not obfuscated) · **a docs shortcut row** to the top five support-driving
pages, given real weight because it is the block that actually reduces contact volume · **scope
stated plainly**, included versus not included · **response expectations**: timezone, working days,
and an honest window. **Do not promise 24/7 or same-day.**

Build the two destinations as single values in `data/site.ts` so a ticket system can replace them
later without a redesign.

### 6.12 Legal and utility

`/terms`, `/privacy`, `/refunds`, `/license` share a prose layout with a "Last updated" line and an
in-page TOC over 800 words. `/privacy` names every third party. `/refunds` describes the position
and links Envato's authoritative policy; **Envato handles the transaction, so describe, do not
override.** **`/license` is the highest-value page here**: Regular versus Extended in plain English,
a two-column comparison, and three concrete examples. It answers the most common pre-sale question.

`404` (one dry line, links to Products, Docs and Support, **no giant numeral**), `500`, `/search`,
`/thanks`, plus `robots.ts`, `sitemap.ts`, `manifest.ts`.

### 6.13 Metadata and OG

Next Metadata API per route. One dynamic OG image route driven by search params. JSON-LD:
`Organization` (**`foundingDate` omitted**), `SoftwareApplication` plus `Offer`, `BreadcrumbList`,
`FAQPage`. `aggregateRating` only when a real rating exists; a synthesised one is both dishonest and
a Google penalty.

### 6.14 Cut from this build

**No blog.** No route, no nav entry, no `content/blog/`, no `Article` JSON-LD, no reading-time
utility, no category taxonomy. If it returns, it returns as its own decision with real posts in
hand.

**No ticket system.** Section 6.11 is the whole support surface.

---

## 7. Component inventory

What each must **do and hold**. Naming, styling and composition are yours, and if your direction
makes one of these unnecessary, say so and drop it rather than building it out of obligation.

| Component | Must do |
|---|---|
| Surface / card | The recurring content container. Interactive and static variants. |
| Section wrapper | Full-bleed sections with content inset to the container, including a variant that carries a saturated fill with text on it. |
| Eyebrow / section label | Small label above a heading. |
| Browser frame | Wraps a desktop screenshot and shows the real demo URL. Optional zoom to lightbox. |
| Phone frame | Wraps a 9:19.5 mobile screenshot. |
| Product card | Thumbnail, name, one-line pitch, marketplace tag, type tag, price, and a star rating only when a real one exists. Sales count only when `showSales`. Whole card is one link. Must read correctly at 2 items and at 12, with mixed types side by side. |
| Buy button | **A link element, always, never a checkout.** Copy pattern "Get {product} on {marketplace}", `rel="noopener"`, external indicator, price alongside. Secondary to the demo action wherever a demo exists. |
| Product facts | Version, last updated, licence, rating. Facts that age well and prove maintenance. **No count-up animation, no tenure, no aggregate totals.** |
| Feature row | Text plus screenshot, repeated down a product page. |
| Spec table | Definition table for requirements. Scrolls inside its own container. |
| FAQ | Built on `<details>` / `<summary>` so it works without JS. |
| Callout | Docs note / tip / warning / danger. Icon, no emoji. |
| Code block | Filename header, copy button with a copied state, horizontal scroll. **Shiki at build time, no client-side highlighter.** |
| Docs shell | Switcher, sidebar tree, content, TOC. Must survive one product and five pages. |
| Changelog entry | Semver, date, change-type tags, body. Anchored and deep-linkable. |
| Licence field | Auto-chunks to `8-4-4-4-12` as typed, paste-tolerant, `inputmode` set, masked-on-blur toggle. States: rest, focus, checking, valid, invalid, rate-limited. |
| Status badge | Active, Expired, Invalid, Latest, Deprecated. Never colour-only. |
| Theme toggle | Three-state (system / light / dark), persisted, applied **pre-paint** via an inline script in `<head>` so there is no flash. `.dark` on `<html>`. |
| Variant gallery | A product's demo variants. Aonomy has 8, each opening its own live demo in a new tab. Must hold 8 without becoming a scrolling mess. Lazy-loads all but the first. |
| Page inventory | Two groups: included HTML files, and the 13 composable sections as a dense list. Collapses past 12 items. |
| Compatibility table | Platform and version matrix with a per-row state, plus an honest bundled-plugin list with licensing notes. |
| Demo credentials | One card per role: URL, email and password, each individually copyable, plus a "data resets nightly" line and a note that WhatsApp, AI and payments run in simulated mode. Scannable in three seconds. **Never real credentials.** |
| Empty state | One dry line and one action. |

Plus the usual primitives: button variants, inputs, select, tags, tabs, breadcrumbs, lightbox,
toast, skeleton, prose.

The last four are **conditional**: they render only for the product types that need them, so
code-split them. A `php-script` page must never ship the template-gallery JS.

**Icons: Lucide only** (`lucide-react`). Never hand-draw an SVG icon.

**Logical properties throughout** (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end`) so RTL is free later.

**Numbers are `tabular-nums`**: money, versions, dates, counts, purchase codes, result counts.

---

## 8. Content model

MDX plus frontmatter, so adding product three is a file and not a refactor.

`content/products/<slug>.mdx` frontmatter: `name`, `slug`, `type`, `presentation`, `marketplace`,
`category`, `pitch`, `itemUrl`, `demoUrl`, `docsUrl`, `price`, `currency`, `version`, `lastUpdated`,
`rating`, `reviewCount`, `showSales`, `salesCount`, `thumbnail`, `screenshots[]`, `tooling[]`,
`requirements{}`, `variants[]`, `sections[]`, `files[]`.

`data/site.ts` holds everything a page must not hardcode: support email, pre-sale destination,
item-support destination, timezone, working days, response window, demo URLs, demo credentials,
marketplace URLs.

Nav, sitemap, docs switcher and changelog index all derive from these flags. **A `demo` product must
never produce a link to an empty docs or changelog page.**

---

## 9. Quality bar

**Accessibility, AA minimum.** Semantic landmarks, one `<h1>` per page. A visible `focus-visible`
ring that works on every background in your system, including saturated fills. Full keyboard paths
through the nav drawer, docs sidebar, lightbox, accordion and `Cmd+K`, each with a focus trap, Esc
and focus restore. Real alt text on every image, `aria-hidden` on decorative art. Form errors tied
via `aria-describedby`. `prefers-reduced-motion` honoured everywhere. **Both themes contrast-checked
by computation** (Section 5.2). Never colour-only status. Target size 44px minimum on mobile.

**Performance.** LCP under 2.0s on 4G mobile. CLS under 0.05, so reserve every image box. Client JS
at most 120KB gzipped on marketing routes and 180KB on docs. **At most four font files**, which is a
real constraint on how many faces and weights your type system can spend. No client-side
highlighter, no icon font, no jQuery, no wholesale UI kit; build from your own tokens. Marketing and
docs statically rendered. Analytics only, privacy-friendly, loaded `afterInteractive`.

**Responsive.** 390 / 768 / 1024 / 1440 verified per route, both themes. **No horizontal page
scroll, ever.** Wide tables, code blocks and rails scroll inside their own container. Long product
names, versions and buyer handles truncate gracefully rather than reflowing the layout.

---

## 10. Build order

1. **Design proposal** (Section 5). Two or three distinct directions, each with tokens, type,
   spacing, shape, motion and a rendered homepage hero at 1440 in both themes. **Stop.**
2. **The chosen token layer**, as CSS-first Tailwind v4 `@theme`, plus a `/_dev/tokens` page proving
   every token in both themes with measured contrast ratios printed on it. Keep it out of the
   sitemap. **No hardcoded hex in components, ever, from this point on.**
3. **Wordmark and favicon set**, plus the reserved slot for a future mark. Verify at 16px.
4. **The component kit** on a `/_dev/kit` page: every component, every state, both themes. **Stop.**
   This page is the visual contract and is cheaper to argue about than a built page.
5. **Global chrome**, then **the homepage**. It sets the compositional language everything else
   inherits, and the trust band carries the load. **Stop.**
6. **The product template**, type-aware and presentation-aware from the start. Wire SlotDesk
   (`php-script` / `full`), then Aonomy (`html-template` / `demo`), then **stub a fake `cms-theme` /
   `full` product locally** to prove the third combination renders before claiming the template is
   done. The products index falls out of this.
7. **Docs shell** plus SlotDesk's tree, which doubles as the item's bundled HTML docs. Write it once
   here rather than maintaining two copies.
8. **Changelog and feeds**, then `/demos`.
9. **Portal**, then legal, support, about, error pages.
10. **Verify.** Playwright screenshots at all four widths across both themes for every route.
    **Open the images and look at them.** Then Lighthouse, then axe.

**Working rules.** One route at a time, finished in all states, both themes and all widths, before
the next. Never hardcode a hex, a radius or an ad-hoc shadow once the tokens exist. Never invent an
unspecced screen. If something in this document turns out to be wrong once built, fix this document
in the same pass.

---

## 11. Voice

Direct, specific, slightly dry. Builders talking to builders, and to shop owners who bought from
builders.

- **Do:** "Self-hosted. Your server, your data, your WhatsApp number." · "Six months of support
  included, per Envato's terms." · "Every release is dated and on the record."
- **Do not** use: revolutionary, cutting-edge, seamless, empower, unlock, game-changing, solution.
  **No exclamation marks. No em dashes.**
- **Buttons say what happens.** "Get SlotDesk AI on CodeCanyon", "Read the docs", "Check my licence".
  Never "Learn more" alone, never "Click here".
- **Headings are claims, not labels.** "We fold one thing at a time" beats "About Us".
- Numbers over adjectives. Where the studio is small, say the number and move on.

---

## 12. Facts, and the blanks you must not fill

**Verified. Use these, do not re-look them up.**

| Field | Value |
|---|---|
| Brand | ThemeAves |
| Domain | `themeaves.com`, not live yet |
| Aonomy item | `https://themeforest.net/item/aonomy-app-landing-page/21460999`, id `21460999` |
| Aonomy price | $16 USD |
| Aonomy sales / reviews | 77 / 2 |
| Aonomy category | Site Templates, Technology |
| Aonomy tooling | Bootstrap 4 and Sass, jQuery with jquery-migrate, particles.js, jQuery Stellar, Icofont |
| Aonomy demos | 8: Video, Particles, Snow, Star, Bubble, Slider, Wave, Parallax |
| Aonomy sections | 13: Work, Feature, Video, App Screen, Download, App Prices, Testimonial, Team, Statistics, News, Subscribe, Contact, Footer |

**Unknown. Render as a visible placeholder, never as a guess.** SlotDesk's CodeCanyon URL, price,
Envato item id and launch version. The Aonomy live demo URL. The SlotDesk demo instance URL, logins
and reset time. The support email, timezone, working days and response window. The real name and
public handle for `/about`.

**No product screenshots exist yet.** Every product image is a reserved, correctly proportioned
placeholder until the real captures land, which means **your system has to look finished while every
image slot is empty.** Do not substitute stock imagery, do not generate illustrations, and **never
present a design mockup as a screenshot of a shipping product**, because the live demo is one click
away and the difference will be noticed.

---

## 13. Acceptance checklist

Outcome-based. None of it constrains what the design looks like.

- [ ] Every token resolves in both themes, and `/_dev/tokens` prints measured contrast ratios.
- [ ] Every text and background pair clears AA in **both** themes, including text on any saturated
      fill, and every pinned-versus-flipping decision is deliberate.
- [ ] The stated colour discipline from Section 5.3 is published, and the built pages hold to it.
- [ ] Every route rendered in **both themes** at **390 / 768 / 1024 / 1440**, screenshots opened and
      reviewed by eye, with **no horizontal page scroll anywhere**.
- [ ] Every data surface has empty, loading and error states.
- [ ] The page looks finished with every image slot showing a placeholder.
- [ ] No tenure signalling in copy, OG images, JSON-LD or the footer.
- [ ] No invented number, review, rating or logo anywhere.
- [ ] No cart, no checkout, no Envato logo, no partnership implication. The buy button is a link
      element on every instance.
- [ ] A `demo` product produces no docs link, no changelog link and no feed URL.
- [ ] The product template renders correctly for all three `type` values, including the stubbed
      `cms-theme`.
- [ ] Purchase codes never appear in a URL, a log line or analytics.
- [ ] Four font files or fewer. Lucide only, no hand-drawn icon SVG. Numbers are tabular.
- [ ] Copy passes Section 11.
- [ ] Nothing on the site reads as a marketplace template (Section 3).

---

## 14. Open with this

> Read this document in full before writing any code.
>
> **The visual system is yours to design.** There is no logo, no existing brand, no palette, no type
> pairing and no spacing scale to inherit, and nothing in the project's history binds you. Colour,
> typography, spacing, shape, composition and motion are all open, and I want you to have a real
> point of view rather than a safe one.
>
> What is fixed is in Sections 1, 2, 6, 7, 9 and 11: who this is for, what must be true, what pages
> exist and what they contain, and the quality bar. Those are settled and are not design questions.
>
> Section 3 is the single aesthetic constraint and it is commercial, not a matter of taste: this
> studio sells HTML templates on ThemeForest and CodeCanyon, so **the site cannot look like one**.
> If a buyer recognises the layout from a marketplace preview, the whole pitch collapses. Everything
> not named there is available to you.
>
> Start with **Section 5 only**: two or three genuinely distinct directions, each with a full token
> system carrying **measured** contrast ratios, a type system with the reasoning shown, a spacing and
> grid system, a shape language, a signature device, and **a rendered homepage hero at 1440 in both
> themes.** Then stop and wait for me to pick one. Do not build the kit and do not build a page.
>
> Read Section 4 before you propose anything. Three previous builds were rejected, and the two
> failure modes were opposite: twenty-four tiny colour moments painting 0.08% of the page, and then
> a single 660px plane that was 55% empty. Section 5.3 asks you to state your own colour discipline
> and defend it. I would rather see an argued position than a cautious one.
>
> Before handing anything back, render it, open the image, and look at it. Every previous round
> satisfied its written spec and was unusable on sight.

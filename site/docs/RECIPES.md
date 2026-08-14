# Recipes

How to do the things this project actually asks for.

---

## Run it

```bash
cd site
npm install
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
npm run typecheck
npm run icons                  # regenerate the icon set
```

`npm run lint` exists but has no config yet.

From Windows, the repo is at `\\wsl.localhost\Ubuntu\var\www\html\themeaves`. Git Bash cannot see
WSL paths, so run node through `wsl -e bash -lc '…'`.

To serve on the port the screenshot tooling assumes:

```bash
cd site && npx next start -p 3210
```

---

## The verification loop

**Run both halves, every time, before calling any UI change done.**

```bash
cd site && npm run build
node tools/shot.cjs http://localhost:3210/ home      # then OPEN shots/*.png and LOOK
```

`shot.cjs` shoots 1440 / 1024 / 768 / 390 in both themes, tiled into viewport-height slices so
nothing is scaled away. `shots/` is reproducible and safe to overwrite.

Checks the script cannot do for you, so do them by eye:

- Is the composition alive, or is it a tall plane with a void in it
- Is any label invisible **in one theme only**
- Does a saturated plane still read in dark

And one it can, worth automating into your check:

```js
// no horizontal scroll at any width
document.documentElement.scrollWidth <= document.documentElement.clientWidth
```

After touching a colour token, open `site/_dev/tokens.html`. It recomputes every ratio live from the
resolved custom properties, so a token edited without a recheck fails there rather than in
production.

---

## Add a page

1. Create `src/app/<route>/page.tsx` and export `metadata`.
2. Open with `<PageHero>`, or the raw `.rule` plus `<Display as="h1">` pattern the other routes use.
   Prefer `PageHero`.
3. Give the opening sub heading the `.eyebrow` class. **One tick per page**, on the sub heading that
   opens the subject, not on interior rules.
4. Alternate bands: page colour, then `<Band tint>` on `--color-surface`, then page colour. That
   alternation is what stops the document reading as one slab.
5. Add it to `nav` in `src/data/site.ts` with `live: true`, or to `RESOURCES` / `COMPANY` in
   `Footer.tsx`.
6. Build, screenshot, look, both themes, four widths.

`typedRoutes` means a `<Link>` to a route that does not exist is a compile error, so a forgotten
`live` flag fails the build rather than shipping a 404.

For a `/_dev` route the directory must be named `%5Fdev`; Next will not route a leading underscore.
Give it `robots: { index: false, follow: false }`.

---

## Add a product

Append to `products` in `src/data/products.ts`. Every field you do not actually know is `PENDING`,
never a guess.

```ts
{
  name: 'Thing',
  slug: 'thing',
  type: 'cms-theme',        // reorders and adds template sections
  presentation: 'full',     // how much page it gets
  marketplace: 'codecanyon',
  price: PENDING,
  itemUrl: PENDING,
  // …
}
```

`generateStaticParams` picks it up, the index facets pick it up, and `/products/<slug>` prerenders.
Nothing else to register.

**`cms-theme` has never been rendered.** The third branch of the template is unproven, so stub one
and screenshot it before trusting it.

Product images go in `public/products/<slug>/`. Until real captures exist, `<ImageSlot>` reserves
the right aspect ratio and the page looks finished empty.

The product's app icon goes in the same folder and is pointed at by the `icon` field in
`src/data/products.ts` (e.g. `icon: '/products/slotdesk-ai/icon.svg'`). The homepage catalogue
cards render it at 40px when the field is known and skip it entirely while it is `PENDING`.

---

## Publish the documentation

`/docs` is built and reachable but is not linked from anywhere, because eight technical values in it
are still unconfirmed. To publish it:

1. **Fill `requirements` and `webhookPath` in `src/data/docs.ts`.** The values are already verified
   and written down in `../../docs/FACTS.md` under "SlotDesk documentation", read out of the app at
   `/var/www/html/codecanyon`.
   **Do not fill `installSteps`.** It is a console block and SlotDesk ships an eight-screen browser
   wizard, so that figure is wrong in kind. Replace it with the wizard steps.
   The chapter plan for the full manual is `../../docs/SLOTDESK-DOCS-PLAN.md`.
2. Set SlotDesk's `version` in `src/data/products.ts`, so the rail prints it instead of
   "version not announced".
3. Flip Docs to `live: true` in `nav`, `src/data/site.ts`.
4. Add it to `RESOURCES` in `components/chrome/Footer.tsx`.
5. Link the `/support` page's Docs column at it, replacing its "Not published yet" line.
6. Revisit the homepage trust band: the claim that documentation is public becomes checkable the
   moment this is linked.
7. Build, screenshot, look, both themes, four widths.

Section prose lives in `docGroups` and does not need to change. Adding a section is an entry in that
array plus nothing else; the sidebar, the anchors and the ordinals all derive from it.

## Fill in a fact

1. Replace the `PENDING` in `src/data/site.ts` or `src/data/products.ts`.
2. Tick the row in `../../docs/FACTS.md`.
3. Rebuild. Placeholders turn into values with no component change, because `<Fact>` and `<Price>`
   branch on `isPending`.

Never write a plausible value to make a page look finished. A wrong price in a public repo is a
wrong price a buyer can quote back at you.

---

## Change a colour

1. Edit the primitive in `src/styles/tokens.css`. Only ever the primitive; the semantic role points
   at it.
2. Mirror the name into the `@theme` block in `globals.css` if it is new. Tailwind cannot read an
   imported stylesheet, so a token needs a declaration inside `@theme` before a utility exists for
   it.
3. Open `site/_dev/tokens.html` and read the recomputed ratios.
4. Check the accent plane in **both** themes.

Remember which test applies. A colour that passes as text on paper does not automatically pass as a
background under text.

Do not add a shadow token. If a component seems to need a shadow, the component is wrong.

---

## Change the mark or the icons

1. `brand/mark.svg` is the master and is irreplaceable. Do not edit it in place.
2. `BirdMark.tsx` carries the same path strings. Keep them in sync with `public/brand/bird*.svg`,
   which is what the icon pipeline reads.
3. After any `favicon.svg` edit: `npm run icons`. Never edit a generated PNG or the `.ico` by hand.
4. Screenshot `/_dev/brand` and check the mark at 16, 20, 24, 32, 48 and 64px in both themes. **16px
   is the one that decides whether a mark works.**

Never source the mark from `uploads/` in the old handoff archive. That copy has its `<defs><style>`
emptied, so every hex is gone and it renders flat black.

---

## Go live

Everything here is content, not code.

- [ ] **`src/data/site.ts`** · support email, timezone, working days, response window; the demo
      instance URL, reset note, simulated subsystems and logins; the author name and handle
- [ ] **`src/data/products.ts`** · SlotDesk's CodeCanyon URL, item id, price, version. Aonomy's live
      demo URL, but **confirm the ThemeForest preview still resolves first**, and its docs URL
- [ ] **Screenshots** · every product image is a reserved placeholder. The capture list is in
      `../../docs/FACTS.md`, and the source of truth is the running app, never a design mockup
- [ ] **`/docs`** · built and waiting on eight values. See "Publish the documentation" above
- [ ] **`/changelog`** · a launch blocker. The homepage claims every release is dated, and that
      claim cannot be checked yet
- [ ] **`/terms`, `/privacy`, `/refunds`, `/about`** · legal text to be written, not generated
- [ ] Flip the `live` flags in `src/data/site.ts` and `Footer.tsx` as each route lands
- [ ] Licence verification needs an Envato API token as a server secret
- [ ] Choose an analytics vendor, privacy-friendly and `afterInteractive`
- [ ] Remove `public/brand/mark.svg` and `mark.png`, the loose copies of the master
- [ ] Resolve the repository separation, below

**Known cosmetic issue, kept deliberately.** Aonomy's thumbnails are real screenshots of a 2018
template with saturated photographic backgrounds, and they sit awkwardly against Blueprint's cool
neutrals. Substituting something calmer would misrepresent what a buyer receives.

---

## ⚠️ Repository separation

There is **one** git repository and its root is `/var/www/html/themeaves`, with an `origin` remote.
There is no `.git` in `site/` and **no `.gitignore` at the repository root**, so `_dev/`, `docs/`,
`brand/` and `shots/` are all inside it and stageable.

`site/README.md` and `site/.gitignore` previously claimed the separation was structural. It is not.
The two ways to resolve it are to make `site/` its own repository, or to add a root `.gitignore` and
confirm nothing private is already in the history.

**Flag this rather than acting on it.** The user runs every git operation in this repo.

## What must never land in `site/`

- Unresolved facts written as if they were real
- Design mockups presented as product screenshots. The live demo is one click away and the
  difference gets noticed.
- The brainstorm, the research, the design commissions, the rejected attempts, the correction notes
  and the screenshot tooling. That work is candid about what failed and what is still unknown, which
  is useful internally and unhelpful in public.

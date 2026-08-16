# ThemeAves Website - Facts File

**Fill the ❌ rows before the design agent needs them.** The brief forbids inventing numbers, URLs and claims (§0 rule 3), so every blank here is something that will otherwise become a placeholder that ships. This file becomes `data/site.ts` in the site repo.

Order matters: the ✅ rows unblock the whole build, the ❌ rows in **Blocking** stop specific pages, and **Copy** can be drafted by the agent for your approval.

---

## ✅ Already verified - use these, don't re-look-them-up

| Field | Value |
|---|---|
| Brand | ThemeAves |
| Domain | themeaves.com (not live yet) |
| Aonomy item URL | `https://themeforest.net/item/aonomy-app-landing-page/21460999` |
| Aonomy Envato item id | `21460999` |
| Aonomy price | $16 USD |
| SlotDesk price | $59 USD |
| Aonomy sales | 77 |
| Aonomy reviews | 2 |
| Aonomy category | Site Templates › Technology |
| Aonomy tooling | Bootstrap 4 + Sass, jQuery + jquery-migrate, particles.js, jQuery Stellar, Icofont, Chivo (Google Fonts) |
| Aonomy demos | 8 - Video, Particles, Snow, Star, Bubble, Slider, Wave, Parallax (`index-<name>.html`) |
| Aonomy sections | 13 - Work, Feature, Video, App Screen, Download, App Prices, Testimonial, Team, Statistics, News, Subscribe, Contact, Footer |
| Palette | ink `#243D59` · yellow `#FBD101` · teal `#33BFB3` · coral `#FD4717` |

**Do not put on the site:** any founding year, "since 2017/2018", member-since, follower count, or years-of-experience figure. See brief §0 rule 1. `showSales` defaults to `false` - decide per product whether 77 helps or hurts.

---

## ❌ Blocking - a page is fiction without these

### Product data

| Field | Needed for | Value |
|---|---|---|
| SlotDesk CodeCanyon URL | every buy button | *(item not listed yet - seed as `PENDING`, fail the production build if still `PENDING`)* |
| SlotDesk Envato item id | licence verification | *(assigned at listing time)* |
| SlotDesk version at launch | `<ProductFacts>` | *(`codecanyon/CHANGELOG.md` says **1.0.0**, dated 2026-08-08, "first public release". Confirm whether that is real or aspirational, then fill it.)* |
| Aonomy live demo URL | the demo page's whole reason to exist | `https://aonomy.themeaves.com` (decided 2026-08-15; serves the eight variant pages) |

### SlotDesk demo instance (brief §9.5)

| Field | Value |
|---|---|
| Demo URL | `slotdesk.themeaves.com` |
| Business-owner login | email / password |
| Super-admin login | email / password |
| Reset time + timezone | e.g. "03:00 UTC nightly" |
| Simulated subsystems | WhatsApp, AI, payments *(confirm all three before publishing)* |

### ✅ SlotDesk documentation (`/docs`) - answered 2026-08-13 by reading the app

These were blanks until the SlotDesk source at `/var/www/html/codecanyon` was scanned. **Verified,
with the source in brackets. Use these, do not re-look-them-up.**

| Field | Value |
|---|---|
| Minimum PHP | **8.3.0+** [`composer.json`, installer requirements screen] |
| Database | **MySQL 8.0+ or MariaDB 10.6+** [`README.md`] |
| PHP extensions | **pdo_mysql, mbstring, openssl, curl, gd, zip, intl** [installer requirements screen] |
| Writable paths | `storage/`, `bootstrap/cache/` [installer requirements screen] |
| Web server | Document root pointed at **`public/`** [`README.md`] |
| WhatsApp side | **WhatsApp Cloud API** number, not the on-premises Business API [`config/slotdesk.php`, `config/whatsapp.php`] |
| Install sequence | **A browser wizard, not a console sequence.** Eight screens: welcome, requirements, database, settings, admin, business, services, team [`routes/installer.php`] |
| WhatsApp webhook path | **`/webhooks/whatsapp/cloud`** [`routes/webhooks.php`] |
| Stripe webhook path | **`/webhooks/payments/stripe`** [`routes/webhooks.php`] |
| Cron | required: `* * * * * cd /path/to/slotdesk && php artisan schedule:run` [`README.md`] |
| Queue worker | required: `php artisan queue:work --tries=3`. Without it the app looks fine and does nothing. [`README.md`] |

⚠️ **The site's console block is wrong in kind, not just in detail.** `site/src/data/docs.ts` has an
`installSteps` slot built for a command-line install and SlotDesk ships a browser wizard. Replace
that figure rather than filling it.

Still open: **is v1.0.0 actually released?** `codecanyon/CHANGELOG.md` dates it 2026-08-08 as "first
public release" but the item is not listed. If the changelog is real, the version blank above is
also answered.

`/docs` stays off the nav until these are written into `docs.ts` and the version question is
settled. The chapter plan is `SLOTDESK-DOCS-PLAN.md`.

### Support (brief §7.6) - answered 2026-08-16

Decided from the handoff Support prototype (`_dev/handoff/directions-preference/project/ThemeAves Support.dc.html`).

| Field | Value |
|---|---|
| Support email | `support@themeaves.com` |
| Your timezone | `GMT+5:30` |
| Working days | `Mon-Fri · 09:00-18:00` |
| Honest response window | `within one business day` |
| Pre-sale destination | email for now; `support.themeaves.com` later |

### About page (brief §7.5)

| Field | Value |
|---|---|
| Real name | |
| Public handle | |
| One-paragraph "what we make" | *(no history, no founding year, no comeback story)* |

---

## 📸 Screenshots to capture - the hero cannot be built without these

From the running SlotDesk app, **both light and dark**, at 1440 wide (2× DPR) unless noted. The repo already has a Playwright helper (`_shot.cjs`) and dev credentials.

- [x] Dashboard - the homepage hero's browser frame. Done 2026-08-14:
      `site/public/products/slotdesk/dashboard.png`, shot at **1120** rather than 1440, because the
      frame is 568 CSS px wide and a 1440 capture scales to 0.39 and turns every label to mush.
- [x] The hero's phone frame. Done 2026-08-14: `site/public/products/slotdesk/booking-mobile.png`,
      which is the **public booking page** at 390, not the WhatsApp thread this line originally asked
      for. The pair now reads as the two sides of the product: the operator's dashboard and the
      customer's booking screen. Both by `codecanyon/_dev/tools/_shot-marketing-hero.cjs`.
- [ ] WhatsApp booking conversation in a phone viewport (390×844). Still wanted, now for the product
      page and the manual rather than the hero. The plan calls it the one figure the whole product
      rests on and it is still missing.
- [ ] Calendar (week view, some AI-booked appointments)
- [ ] Team Inbox with a handoff
- [ ] Payments screen with the transaction drawer open *(note: with an overlay open, use a locator screenshot - full-page shots render light even in dark mode)*
- [ ] AI Agent Settings
- [ ] Cost dashboard
- [ ] WhatsApp setup wizard
- [ ] Public booking flow at 375 wide

Seed realistic data first - a salon with staff, services, a week of bookings, and one completed AI conversation. Empty states make terrible marketing shots.

**Source of truth:** the **running app**, not the design file. If a screen you want for marketing exists only in the [SlotDesk UI design project](https://claude.ai/design/p/0748ea3b-c190-4f42-9fe5-bf59042a452b?via=share) and was never shipped, export that frame as a PNG into this folder - but never present a design mockup as a screenshot of the product, because `slotdesk.themeaves.com` is one click away and the difference will be noticed.

---

## ✍️ Copy the agent can draft for your approval

Don't write these from scratch; let the agent propose 3 options each against the brief's voice rules (§5), then pick.

- [ ] Homepage headline - ≤9 words, studio positioning
- [ ] Homepage lead paragraph - 2 lines
- [ ] Hero eyebrow - what you make, not how long
- [ ] One-line pitch per product
- [ ] Footer positioning line
- [ ] The 5-6 homepage FAQ entries
- [ ] "How we build" - three specific claims, not values filler

---

## Decisions still open (brief §14)

1. Repo location for the site
2. Docs single-sourcing - SlotDesk's bundled HTML docs generated from `content/docs/slotdesk/**`
3. PHP host for `slotdesk.themeaves.com` - needs cron + a queue worker, so likely a small VPS
4. Aonomy's contact form - delete the `.php` (default) or host Aonomy on the demo box so PHP runs
5. Analytics vendor
6. Which `cms-theme` comes first

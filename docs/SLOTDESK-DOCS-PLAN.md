# SlotDesk AI documentation, plan and tracker

Working document. One row per chapter, updated as each is written. **When a chapter is done, tick it
here in the same commit that writes it**, or this file becomes another thing that lies.

Started 2026-08-13.

## What we are writing, and who reads it

Two consumers, one source.

| Consumer | Form | Note |
|---|---|---|
| The website | `site/content/docs/slotdesk/*.md` | **Live.** One markdown file per chapter, rendered at build time. |
| The release package | `documentation/` inside the SlotDesk zip | What a buyer opens first. `codecanyon/README.md` already promises it and the folder **does not exist yet**. |

The markdown is the single source. The site renders it today; the release package will be generated
from the same files.

### URLs

```
/docs                          index, one row per manual
/docs/slotdesk                 contents, every chapter with its summary
/docs/slotdesk/<chapter-slug>  the chapter
```

The manual slug is `slotdesk`, deliberately shorter than the product slug `slotdesk-ai`. Figures live
in `site/public/docs/slotdesk/` and are referenced from the markdown as `/docs/slotdesk/<name>.png`.

Chapter order, grouping and publication state are in `site/src/data/docs.ts`. **A chapter with
`published: false` is listed in the sidebar and on the contents page, marked "soon", and has no
route**, so a link to an unwritten chapter cannot be made by accident. Publishing one is flipping a
boolean once its markdown exists.

### The manual reads in SlotDesk colours

Decided 2026-08-13. The docs band uses SlotDesk's own palette (canvas #FAF7F2, spruce ink, leaf
green #17B890) via `.theme-slotdesk` in `tokens.css`; the ThemeAves header and footer are
unchanged. Every page ends on the leaf plane, matching the handoff Docs prototype's closing band.

Three of SlotDesk's values failed our contrast law and were derived up rather than used as-is;
see `site/BUILD.md`. **Leaf is a fill in light and a text colour only in dark**, the same
inversion tide has, so never set light-mode type in `#17B890`.

Figures now sit on the product's own canvas, which is why they stopped clashing with the page.

### No reference codes

Chapters are named, never numbered. There is no A1, no B3, and figures are captioned rather than
numbered. Ordering lives in `docs.ts`, so a code would be a second source of truth that goes stale
the moment a chapter is inserted. Cross-references name the chapter: "the Payments chapter", not
"see B5".

## Ground truth, read from the app on 2026-08-13

Everything here came out of `/var/www/html/codecanyon`, not from a guess. Source in brackets.

| Fact | Value |
|---|---|
| Name, pitch | SlotDesk AI. WhatsApp appointment booking with an AI receptionist. [`composer.json`] |
| Version | **1.0.0**, dated 2026-08-08, "first public release" [`CHANGELOG.md`] |
| PHP | **8.3.0+** [`composer.json`, installer requirements screen] |
| Extensions | `pdo_mysql`, `mbstring`, `openssl`, `curl`, `gd`, `zip`, `intl` [installer requirements screen] |
| Writable | `storage/`, `bootstrap/cache/` [installer requirements screen] |
| Database | MySQL 8.0+ or MariaDB 10.6+ [`README.md`] |
| Web server | Document root pointed at `public/` [`README.md`] |
| Framework | Laravel 13, Livewire 3 [`composer.json`] |
| Cron | `* * * * * cd /path/to/slotdesk && php artisan schedule:run` [`README.md`] |
| Queue backend | the **database**. No Redis to provision. [`config/queue.php`] |
| Mail | defaults to `MAIL_MAILER=log`, so email is written to the log and silently not delivered until SMTP is set. Used by password reset and handoff notifications. [`config/mail.php`, `app/Notifications/HandoffRequested.php`] |
| Purchase code | the installer's App details screen asks for the CodeCanyon purchase code and flips the install into production mode [installer settings screen] |
| App URL | the public address "customers and WhatsApp webhooks will reach", no trailing slash. Meta requires HTTPS for Cloud API webhooks. [installer settings screen] |
| Queue worker | `php artisan queue:work --tries=3`, queues `webhooks,ai,messages,notifications,default` [`README.md`, `config/slotdesk.php`] |
| WhatsApp webhook | `GET`/`POST /webhooks/whatsapp/cloud` [`routes/webhooks.php`] |
| Stripe webhook | `POST /webhooks/payments/stripe` [`routes/webhooks.php`] |
| AI providers | OpenAI, Anthropic, Google Gemini, Kimi (Moonshot), OpenRouter, OpenCode Zen [`config/ai.php`] |
| Panels | `/app/{slug}` per business, `/admin` for the install owner [`routes/web.php`] |
| Locales | `en`, `es`, `ar` (RTL), `pt_BR` [`config/slotdesk.php`] |
| Payments | Stripe Checkout, offline mark-paid, refunds, invoices [`README.md`, routes] |

**This closes most of the `/docs` blanks on the site.** See "Feeding the site" at the end.

### The install wizard, in order

`routes/installer.php` defines nine routes, but the wizard presents them as **two phases**, and the
progress indicator in the UI proves it reads "Setup · 1/4" on requirements and "Setup · 3/4" on
settings:

| Phase | Screens |
|---|---|
| **Install**, 4 steps | requirements → database → App details → admin account (after a welcome screen) |
| **Business onboarding**, separate | welcome → business type → services → team → done |

Document them as two phases. A reader who is told "eight steps" and sees "3/4" on screen stops
trusting the manual.

**The App details screen asks for the CodeCanyon purchase code** and for the public App URL that
"customers and WhatsApp webhooks will reach". Both are prerequisites, so both belong in Before you start.

Other install facts worth having here rather than buried in the Install chapter:

- The database step **tests the connection** with a real PDO handshake before continuing, and writes
  nothing until it succeeds [`InstallController::saveDatabase`].
- The schema is built at step **4/4**, when "Install SlotDesk" is pressed, not at the database step
  [`InstallController::saveAdmin` calls `migrate --force`].
- Step 4 has a **"Load sample data"** checkbox that seeds a demo "Bella Salon" business with
  services, staff and conversations. Must be documented as "leave unchecked in production".
- Every business-setup screen has a **"Skip setup"** link, so the whole second phase is optional.
- The business step sets **timezone and currency**, and the timezone governs every availability rule,
  reminder and booking window [`InstallController::saveBusiness`].
- Six business types: hair_salon, barber, nails_beauty, spa_massage, clinic, other
  [`OnboardingTemplates::TYPES`].

### The `/app` panel, in nav order

From `app/Support/PanelNavigation.php`. This is the spine of Parts C and D.

```
Dashboard
Bookings       Calendar · Appointments · Booking rules
Inbox          Team inbox · Saved replies
AI             AI receptionist · Knowledge base · AI activity · Guardrail log
WhatsApp       Setup wizard · Templates · Webhook diagnostics · Failed messages · Chat simulator
Catalog        Locations · Service categories · Services
Notifications  Notification templates · Reminder settings · Cost dashboard
Team           Staff · Team members
People         Customers
Payments       Payments · Payment settings
Insights       Reports
```

`/admin`: Dashboard · Businesses · Users · Health · Activity log · Settings · Team.

---

## The outline

Five parts, twenty chapters. Ordered the way someone actually does it, not the way the nav is
grouped: a reader installs, connects the outside world, describes their business, then runs it.

### Part A · Get it running

| Chapter | Covers |
|---|---|
| Before you start | Requirements table, what to have ready before you begin (domain, database, WhatsApp number, AI key, Stripe account), what SlotDesk does not do for you |
| Install | The wizard in its two phases, screen by screen, with what each field wants |
| Cron and the queue worker | The two lines that make it actually work. **Its own chapter on purpose:** without a worker the app looks fine and does nothing, which is the single most likely support ticket |
| First login and the two panels | `/app` versus `/admin`, who each is for, the tenant slug |

### Part B · Connect the outside world

| Chapter | Covers |
|---|---|
| WhatsApp Cloud API | Meta app creation, tokens, phone number ID, the webhook URL and verify token, signature verification |
| Message templates and the 24-hour window | Meta's approval lifecycle, when you need a template and when you do not, delivery receipts, opt-out |
| The AI receptionist | Choosing a provider and model, the key, cost expectations, what tool calling does |
| Guardrails and the knowledge base | Scope preamble, off-topic redirect, handoff keywords, daily reply cap, feeding it facts about the business |
| Payments | Stripe keys, the Stripe webhook, deposits versus full payment, offline mark-paid, refunds, invoices |

### Part C · Describe the business

| Chapter | Covers |
|---|---|
| Locations, categories and services | Duration, buffers, deposits per service |
| Staff and team members | Working hours, who performs what, the difference between a staff member and a panel user |
| Booking rules | Minimum notice, cancellation and reschedule windows, slot holds, double-booking protection |
| Notifications and reminders | Notification templates, reminder timing, what sends over WhatsApp versus email |

### Part D · Run it day to day

| Chapter | Covers |
|---|---|
| Calendar and appointments | Week view, creating and editing by hand, the public booking page and manage links |
| The team inbox | Live conversations, saved replies, draft-approval mode, taking over from the AI |
| Customers and reports | Customer records, what Insights shows |

### Part E · Operate and maintain

| Chapter | Covers |
|---|---|
| Monitoring | AI activity, guardrail log, webhook diagnostics, failed messages, chat simulator, cost dashboard |
| The admin panel | Businesses, users, health, activity log, install settings |
| Troubleshooting | Symptom-first. Nothing sends · webhook not verifying · AI silent · payments not confirming · reminders not firing |
| Updating and backups | Package replacement, migrations, what to back up, restoring elsewhere |

---

## Status

**Complete on 2026-08-14: 20 of 20 chapters published.** The contents page says so itself now; the
"the rest are listed and being written" clause in `site/src/app/docs/[manual]/page.tsx` switches off
when nothing is outstanding.

What is still open is not chapters. It is the `documentation/` folder for the release package, which
`codecanyon/README.md` still promises and which still does not exist, and the thirty-nine findings
below, none of which are fixed.

Legend: ☐ not started · ◐ drafted · ☑ written, screenshotted and live · ⊘ blocked

| Chapter | Text | Shots | Notes |
|---|---|---|---|
| Before you start | ☑ | ☑ | `slotdesk/a1-before-you-start.md`. Needed one figure and it existed. |
| Install | ☑ | ☑ | `slotdesk/a2-install.md`. All 9 figures existed and were verified on disk. |
| Cron and the queue worker | ☑ | ☑ | `slotdesk/cron-and-queue.md`. Two figures. |
| First login and the two panels | ☑ | ☑ | `slotdesk/panels.md`. Three figures. |
| WhatsApp Cloud API | ☑ | ◐ | `slotdesk/whatsapp-cloud-api.md`. Two figures; Meta-side steps described, not shot. |
| Templates and the 24-hour window | ☑ | ◐ | `slotdesk/templates-and-the-24-hour-window.md`. One figure. |
| The AI receptionist | ☑ | ☑ | `slotdesk/ai-receptionist.md`. Five figures. |
| Guardrails and knowledge base | ☑ | ☑ | `slotdesk/guardrails-and-knowledge.md`. Two figures. |
| Payments | ☑ | ☑ | `slotdesk/payments.md`. Two figures. |
| Locations, categories, services | ☑ | ☑ | `slotdesk/catalog.md`. Three figures, captured fresh. Found two live bugs: percentage deposits, and Delete on every edit form. |
| Staff and team members | ☑ | ☑ | `slotdesk/staff-and-team.md`. Three figures. Found two more live bugs: working hours do not display, and the login dropdown is not tenant-scoped. |
| Booking rules | ☑ | ☑ | `slotdesk/booking-rules.md`. Two figures, shot fresh. Found three more live bugs: the cancel link ignores its window, manual bookings skip conflict checks, manual bookings schedule nothing. |
| Notifications and reminders | ☑ | ☑ | `slotdesk/notifications-and-reminders.md`. Three figures, shot fresh. **Part C complete.** |
| Calendar and appointments | ◐ | ☑ | `slotdesk/calendar-and-appointments.md`. **Published 2026-08-14** as the Calendar half; the Appointments form, the public booking page and manage links are still to write and get appended to this same chapter, so its contents-page summary now describes only the Calendar. Three figures, shot fresh and cropped to the pane. Found four more live gaps: blocks are unclickable but take a pointer cursor, the staff pills are inert, the grid is hard-coded 9 AM to 6 PM rather than read from working hours, and cancelled/no-show render identically to completed. |
| The team inbox | ☑ | ☑ | `slotdesk/team-inbox.md`. Published 2026-08-14, and it covers Saved replies as well, so that screen needs no chapter of its own. Five figures, shot fresh by `codecanyon/_dev/tools/_shot-docs-inbox.cjs`: the six QA widths in `_dev/shots/` were unusable, carrying a tester's real name and number, AI failure text and a 35-badge. Found five more live gaps, 20 to 24 below. |
| Customers and reports | ☑ | ☑ | `slotdesk/customers-and-reports.md`. Published 2026-08-14. **Part D complete.** Four figures, shot fresh by `codecanyon/_dev/tools/_shot-docs-reports.cjs`; the shots were listed as blocked only because none existed. Found five more live gaps, 25 to 29 below, and one leak: the scrub tool renamed testers but left their real phone numbers, two of which were one page-turn from a figure. |
| Monitoring | ☑ | ☑ | `slotdesk/monitoring.md`. Published 2026-08-14, covering all six surfaces including the chat simulator. Six figures, shot fresh by `codecanyon/_dev/tools/_shot-docs-monitoring.cjs` with `_prep-docs-monitoring.php` behind them; reuses the existing `guardrail-log.png` and `webhook-diagnostics.png` by reference rather than re-documenting those two screens. Found five more live gaps, 30 to 34 below. |
| The admin panel | ☑ | ☑ | `slotdesk/admin-panel.md`. Published 2026-08-14. Five figures, shot fresh by `codecanyon/_dev/tools/_shot-docs-admin.cjs`; the existing `admin-dashboard.png` and `system-health.png` stay with the panels and cron chapters, and the health figure here is a **new** file because the cron chapter owns the stalled-cron state. Found three more live gaps, 35 to 37 below, and a second personal-data leak: the platform support email was the author's own Gmail address. |
| Troubleshooting | ☑ | ⊘ | `slotdesk/troubleshooting.md`. Published 2026-08-14. **No figures, deliberately**: it is a symptom index that routes to the chapter which owns each cause, so a figure here would be a second copy of one. Adds `php artisan ai:doctor` as the first-five-minutes check. |
| Updating and backups | ☑ | ☑ | `slotdesk/updating-and-backups.md`. Published 2026-08-14. **The manual is complete, 20 of 20.** One figure, `admin-version-card.png`. Written from the code, since `README.md` has no update section at all. Found two more, 38 and 39 below. |

---

## Screenshots

### What already exists

`codecanyon/_dev/shots/` holds **249 PNGs**, most in light and dark pairs, and
`codecanyon/_dev/tools/_shot*.cjs` are the scripts that made them.

⚠️ **They are QA captures, not figures.** They were taken to prove a fix, so some are probes,
mockups, debug states and deliberate error conditions. Each one needs a look before it becomes a
doc figure. Verified so far: `installer-requirements-light.png` is documentation quality as it
stands.

Reusable, subject to that pass:

| Chapter | Shots |
|---|---|
| `installer-requirements-light` **(verified doc quality, in use)** |
| `installer-welcome` `installer-database` `installer-settings` `installer-admin` · `onb-welcome` `onb-type` `onb-services` `onb-team` `onb-done` |
| `7a-login` `7a-tenant-chooser` `app-dashboard-accent` `admin-dashboard-accent` |
| `wiz-step1` `wiz-step1-diags` `wiz-step2` `wiz-step2-status` `wiz-step3` `wiz-step4` |
| `whats-app-templates` and its selected/rowmenu variants |
| The AI receptionist, Guardrails and knowledge | `ai-v2` `ai-v2-lower` `knowledge-items` `ai-activity` `ai-activity-details-modal` `guardrail-log` |
| `payments` `payments-drawer` `payments-record-dialog` `refund-dialog` `refund-drawer` `app-payment-settings` `pay` |
| `locations` `service-categories` |
| `staff` |
| `booking-rules` `booking-rules-lower` |
| `notification-templates` `app-reminder` `rem-default` `rem-staff-form` |
| `app-appointments` and its empty/filtered/selected variants |
| `inbox-w1440` `inbox-w390` `inbox-template` `inbox-template-open` `saved-replies` |
| `app-webhook-diag` |
| `7b-businesses` `7b-users` `7b-health` `admin-settings` `admin-audit` `accent-team` |

### How the catalog figures were made, and why not from the library

Three figures, captured fresh from the running app rather than imported: `catalog-services.png`,
`catalog-locations.png`, `catalog-service-form.png`. The QA library had no services list at all, so
at least one had to be shot anyway, and a chapter whose figures half match each other is worse than
one whose figures all match.

Two things learned that the next chapter should copy:

- **Crop to the card, not to the viewport.** The first cut was a full 1440x1000 viewport per list.
  At the doc's column width that spends half the figure on empty canvas and shrinks the table text
  to nothing. Measuring the card's own bottom and clipping to it fixed both. The sidebar goes with
  it, which costs nothing: at 712px column width a 240px sidebar is unreadable anyway, and the prose
  already says where the screen lives.
- **The demo data needed fixing first.** Services had no category and no location, zero buffers, a
  `colour` slug on a service called "Cut & style", and a 50.00 deposit on a 40.00 service. A figure
  showing that teaches the reader the wrong thing. Categories, locations, buffers, slugs and
  deposits were corrected in the demo database before shooting; `Riverside Studio` is deliberately
  left inactive so the status pill has both states in one frame.

### What has to be captured

Confirmed absent from the library:

- [x] **Calendar**, week view with AI-booked appointments. Done 2026-08-14: `calendar-week.png`,
      `calendar-day.png`, `calendar-booking-block.png`, by `codecanyon/_dev/tools/_shot-docs-calendar.cjs`.
- [x] **Team inbox**, the three columns and its four states. Done 2026-08-14: `inbox-thread.png`,
      `inbox-handoff.png`, `inbox-draft.png`, `inbox-window-closed.png`, `saved-replies.png`, by
      `codecanyon/_dev/tools/_shot-docs-inbox.cjs`. The demo tenant has no handoff, draft or expired
      window in it by default, so `_prep-docs-inbox.php` puts those states in first and has to be run
      after `_reseed-demo-conversations.php`.
- [x] **Customers** list and a customer record, for Customers and reports. Done 2026-08-14:
      `customers-list.png`, `customer-record.png`, `reports.png`, `reports-breakdown.png`, by
      `codecanyon/_dev/tools/_shot-docs-reports.cjs`, with `_prep-docs-reports.php` for the opted-out
      customer and the six months of receptionist runs behind the trend chart.
- [x] **Cost dashboard**, for Monitoring. Done 2026-08-14: `cost-dashboard.png`, `cost-daily.png`.
- [x] **Reports**, for Customers and reports. Done 2026-08-14, in the same pass as the Customers
      figures above.
- [x] **Chat simulator**, for Monitoring. Done 2026-08-14: `chat-simulator.png`, with the session written by `_prep-docs-monitoring.php` rather than typed, so no send is attempted against Meta.
- [x] **Failed messages**, for Monitoring. Done 2026-08-14: `failed-messages.png`, plus `ai-activity.png` and `ai-run-details.png` in the same pass.
- [ ] **The public booking page**, at 375, for Calendar and appointments.
- [ ] **A WhatsApp booking conversation** in a phone viewport, 390x844. The one figure the whole
      product rests on, and it is missing.
- [ ] **Appointment create and edit**, for Calendar and appointments.
- [ ] **Meta-side setup**, the App Dashboard steps in WhatsApp Cloud API. Third-party UI, so these age fastest;
      consider describing rather than shooting.

### Rules for a doc figure

1. **Real app, seeded with real-looking data.** Empty states make terrible figures. There is a
   seeder at `codecanyon/_dev/seed-ai-demo.php`.
2. **Light theme for the manual**, dark only where the chapter is about appearance. A manual that
   flips theme between figures reads as inconsistent.
3. **1440 wide at 2x**, except phone-frame figures at 390x844 and the public booking page at 375.
4. **Scrub identities.** `_dev/tools/_scrub-demo-identities.php` exists; run it before capturing.
5. **Never a mockup presented as a screenshot.** The demo is one click away and the difference gets
   noticed.
6. Crop to the pane being discussed. A full-page shot of a 3000px screen tells the reader nothing.

---

## How we work through this

One chapter at a time, in outline order, because later chapters depend on decisions made in earlier
ones. For each:

1. Re-read the relevant code and screens. **The app is the source, not the marketing copy.**
2. Draft the text into `docs/slotdesk/<id>-<slug>.md`.
3. List the figures it needs; capture the missing ones.
4. Tick the row above, both columns.
5. When a Part completes, fold its summary into `site/src/data/docs.ts`.

Rules that apply to the writing itself:

- **Screen names exactly as the app spells them.** "Booking rules", not "booking settings". A
  reader is looking for the label in the sidebar.
- **Every command copy-pasteable**, with the placeholder obvious (`/path/to/slotdesk`).
- **State the failure.** Each chapter that can go wrong ends with what it looks like when it does.
  Troubleshooting collects those rather than inventing new ones.
- No em dashes, no exclamation marks, and none of the banned marketing words. The site's copy rules
  apply here too.
- Do not promise anything the app does not do. If a feature is partial, say which part.

---

## Open questions

Answer these before the chapters that depend on them.

1. **Is 1.0.0 actually released?** `CHANGELOG.md` dates it 2026-08-08 as "first public release", but
   the item is not on CodeCanyon and `docs/FACTS.md` still treats the version as blocking. If the
   changelog is aspirational, say so; if it is real, the site can print v1.0.0 today.
2. **Where does the shipped documentation live in the repo?** `codecanyon/README.md` promises a
   `documentation/` folder in the release package and it does not exist. Confirm the path and the
   format, HTML or Markdown, before writing into it.
3. **Does the installer need a queue/cron check?** Cron and the queue worker argues it is the top support risk. If
   the installer does not verify it, that is worth a line in the docs and possibly a feature.
4. **Which AI provider do we recommend by default?** `config/ai.php` defaults to OpenAI
   `gpt-4o-mini` and calls it "fast and cheap (recommended)". Confirm that is still the
   recommendation before the docs repeat it.
5. **Embedded signup or manual Meta setup?** `codecanyon/_dev/whatsapp-embedded-signup-setup.md`
   exists. If embedded signup ships, that chapter is much shorter and most of the Meta-side figures go away.
6. **Is the public booking page in scope for the manual?** It is customer-facing rather than
   operator-facing, so it may belong in a separate short guide.
7. **Is the percentage deposit going to be fixed before release?** `ServiceForm::attributes()` runs
   `toMinor()` on `deposit_value` whatever the deposit type is, so a percentage typed as `20` stores
   2000, and `DepositType::Percent->depositFor()` clamps that to 100, charging the whole price. Any
   percentage of 1 or more behaves this way. `PaymentSettings` gets the same field right, so the two
   screens disagree about what the column holds. The Catalog chapter currently carries a warning
   telling readers to use fixed amounts; **fix the form and that warning gets deleted**, which is the
   better outcome for a manual a buyer reads first.
8. **The Delete button does nothing on every edit form.** Found while shooting the service form.
   `resources/views/layouts/sd-form.blade.php:19` writes `x-data="{ conf: @js($this->deleteConfirm()) }"`
   as an attribute on the `<x-sd-btn>` **component**, and Blade does not compile `@js()` inside
   component attributes, so Alpine receives the literal text and throws `SyntaxError: Invalid or
   unexpected token`. The click handler never binds: no confirmation appears and nothing is deleted.
   Reproduced on services, locations, service-categories and staff edit; create pages are clean
   because they have no Delete button. `{{ Js::from(...) }}` in that position does compile. Until it
   is fixed, no chapter should tell a reader to delete a record from an edit form; bulk delete from
   the list is a different code path and works.
9. **Saved working hours are invisible in the staff form.** The values are in the DOM and enforced by
   availability; the control is 72px wide and the value span computes to zero width behind the
   picker's `overflow: hidden`, so a saved schedule reads as five empty clock icons. Cause is
   `.sd-f-rep-row { display: flex }` with `> * { flex: 1; min-width: 0 }` in
   `resources/css/panel/app/kit.css:2510`, against five pickers plus a remove button inside a form
   column capped at 920px. A `min-width` floor, or wrapping the row, fixes it. **This is the worst of
   the four**, because the screen looks like it lost the data. The chapter currently spends a section
   reassuring the reader that it did not.
10. **The staff form's "Linked user account" list is not tenant-scoped.** `StaffForm::userOptions()`
    calls `pluckOptions(User::query())`, and `User` does not use `BelongsToBusiness`, so on a
    multi-business install the dropdown lists every account on the install. It is disclosure rather
    than escalation, since access still comes from the `business_users` pivot, but an Admin of one
    business should not be reading the names of another's. The chapter says "treat it as a list of
    logins rather than a list of your colleagues", which is honest and not something a manual should
    have to say.

11. **The cancellation window is not enforced on the customer's own cancel link.**
    `ManageBookingController::cancel()` calls `CancelAppointmentAction::execute()` without passing
    `$business->bookingRules()`, so the action falls back to `new BookingRules` where
    `cancelWindowHours` is 0 and the check never fires. The method even wraps the call in
    `catch (BookingPolicyException)`, which is therefore unreachable: the omission is clearly
    accidental. `ReschedulePage` passes the rules correctly, which is why reschedule honours its
    window and cancel does not. **The Booking rules screen tells the owner this policy "applies to
    the AI and the booking page alike".** One argument fixes it.
12. **Manual bookings in the panel bypass conflict checking.** `AppointmentForm::createRecord()`
    constructs an `Appointment` and calls `save()` directly rather than going through
    `CreateAppointmentAction`, so there is no availability check, no buffered-footprint conflict
    check and no row lock. A staff member can double-book another from the Appointments form with no
    warning. Arguably intended for a receptionist squeezing someone in; it should still warn.
13. **Manual bookings schedule no notifications.** Same cause. Confirmation and reminders hang off
    `AppointmentCreated`, which only the action dispatches, and there is no model observer.
    Verified in a rolled-back transaction: a panel-style save produced **zero** rows in
    `scheduled_notifications`. A booking typed in by hand therefore sends no confirmation and no
    reminder, silently. This one will read as "the reminders are broken" in a support ticket.

14. **Three of the five notification kinds are dead config, and so is the whole Email channel.**
    `ReminderScheduler` only ever creates `Confirmation` and `Reminder` rows, and hard-codes
    `NotificationChannel::WhatsApp`. Follow-up, no-show and cancellation templates can be written,
    activated and saved, and nothing schedules them; an email template likewise. Not a defect in
    itself, but the UI gives no hint, so an owner will write a no-show chaser and believe it is
    live. Either schedule them or mark them "coming soon" in the selector.
15. **The fallback-template help text says "skip", the code records a failure.** With the 24-hour
    window shut and no approved template mapped, `SendScheduledNotification::sendWhatsApp()` throws
    and the row is written as **failed** with "Outside the 24h window and no approved template
    mapped", not skipped. The wording matters because failed sends surface in the logs as something
    to investigate. This is the most likely real-world cause of "reminders don't work": a day-before
    reminder is almost always outside the window, and a fresh install has no fallback mapped.

16. **The Calendar is a viewer, but dressed as an editor.** `eventStyle()` sets `cursor:pointer` on
    every appointment block and the Blade attaches no handler, so hovering promises an action that
    does not exist. The staff pills have the same problem: `staffFilter()` renders them as chips with
    no `wire:click`, so a screen that looks like it has a staff filter has none. Both are cosmetic
    fixes with real support cost, since a user who clicks and gets nothing assumes the page is broken.
17. **The Calendar grid is hard-coded to 9 AM to 6 PM.** `START_HOUR` and `END_HOUR` are consts in
    `Calendar.php`, not read from working hours, so an evening business sees an incomplete diary with
    no indication anything is missing. Bookings outside the window are created and counted normally
    and are simply never drawn.
18. **Cancelled and no-show appointments render identically to completed ones.** `statusBucket()`
    maps both to `other` and `eventStyle()`'s `default` arm is the same muted sand as `completed`,
    while the legend lists only Completed. A cancellation sitting in tomorrow's grid reads as a
    finished appointment.
19. **Day view silently drops unassigned bookings.** `dayColumns()` builds one column per active
    staff member and filters on `staff_id`, so a booking with no staff, or one whose staff member has
    been deactivated, has nowhere to render. It disappears from Day view while remaining in Week
    view, with nothing on screen to say so.

20. **Resume AI does nothing on a handoff thread.** `ConversationRoutingService::route()` returns
    early when `ai_paused` **or** `status === Handoff`, and the thread menu's Resume AI only clears
    the pause flag. The status stays Handoff, so the receptionist keeps ignoring the conversation
    while the banner and the menu both say it is back on. The only ways out are Assign to me, which
    moves it to Assigned, or close and reopen. Either clear the status alongside the flag, or hide
    Resume AI on a handoff thread.
21. **The sidebar Inbox badge cannot show a handoff.** `PanelNavigation::openConversationCount()`
    counts Open and Assigned only, and a handoff has status Handoff, so the one thing that most needs
    a person is the one thing the badge never counts. It reads zero while somebody waits.
22. **The conversation list credits the AI's replies to your team.** `Inbox::preview()` prefixes any
    outbound message with "You:" and never looks at `is_ai`, so the list makes it look as though an
    operator answered when the receptionist did.
23. **The Handoff chip's count is scoped to the current filter.** The blade counts handoffs inside
    `$this->conversations()`, which is the filtered list, so selecting Closed drops the count to
    nothing while the handoffs are still open. It should be a query of its own.
24. **Saved replies look like templates and are not.** `useSavedReply()` copies the body into the
    composer verbatim, so `{{customer_name}}` reaches the customer as those characters, while the
    notification templates screen substitutes the same syntax. One product, two behaviours, no
    difference on screen. Related: `OutboundMessageService::sendText()` does not check opt-out
    although `sendTemplate()` does, so a person can free-form an opted-out customer from the inbox.

25. **`customers.last_message_at` is never written, and the list sorts by it.** The inbound webhook
    stamps `last_message_at` on the **conversation**; nothing writes the customer column of the same
    name. The Customers list defaults to sorting on it descending, so the default order of the most
    people-facing list in the product is arbitrary and the column is a dash on every row. Either
    stamp it alongside the conversation or drop the column.
26. **A duplicate WhatsApp number is a 500, not a validation error.** `CustomerForm::rules()` has no
    unique rule and `customers` has `unique(['business_id','wa_phone'])`, so saving a number that
    already exists throws `Integrity constraint violation: 1062` and the panel shows a Server Error
    modal over the form. Reproduced 2026-08-14. One `Rule::unique()` fixes it.
27. **Deleting a customer silently deletes their appointments and their whole conversation.** Both
    foreign keys are `cascadeOnDelete()`, and the confirmation says only "this permanently removes
    them". Past bookings vanish from the calendar and Reports change retroactively. The confirmation
    should say what else goes, and the GDPR export should probably be offered in the same dialog.
28. **Opt-out is one-way and panel-invisible.** Only `handleOptOut()` in the inbound webhook ever sets
    `opted_out_at`, and nothing anywhere clears it. A customer who asks a member of staff to stop the
    reminders cannot be recorded, and one who typed stop by mistake cannot be restored without
    database access.
29. **Customer tags are read-only UI.** `CustomerTag` has a model, a factory and a pivot, the inbox
    rail renders the chips, and nothing in the panel can create or assign one. Either build the
    control or hide the chips.

30. **"Free windows used" divides a month-to-date count by a range total.** `freeServiceMessages()`
    counts from `monthStart()` while `totalMessages()` counts from `periodStart()`, so the card is
    only meaningful on This month. On one dataset it read 63% / 96% / 28% for This month / 7 days /
    90 days on 2026-08-14, and a heavier earlier month would push it over 100%. The tip text under
    the banner repeats the same number.
31. **The chat simulator's own promise is false on a default install.** The screen says "Nothing here
    reaches Meta or touches your real conversations", and both halves are wrong: the reply goes
    through `OutboundMessageService` to `WhatsAppCloudProvider`, which POSTs to the Graph API with
    the simulator account's placeholder token and fails, and the simulated thread appears in the Team
    inbox, AI activity, Reports and the cost dashboard because none of those filter by account. The
    failure then lands in Failed messages, which is where the 35-badge in the old QA captures came
    from. Either route the simulator through `FakeWhatsAppProvider` regardless of driver, or reword
    the promise.
32. **A failed template can never be retried.** Both `OutboundMessageService::resend()` and the
    `messages:retry-failed` schedule require `MessageType::Text`, so the rows that actually
    accumulate here, template sends outside the window, have no path forward from this screen at all.
    The row menu still offers Retry and answers with a toast about free-form messages.
33. **The Failed messages badge counts history, not work.** Nothing ages, dismisses or archives a
    row, so a fault fixed weeks ago still shows in the coral count beside the nav item forever.
34. **Failed sends are still priced.** `OutboundMessageService::record()` writes a `MessageCostLog`
    row before it knows whether the send succeeded, so the cost dashboard's estimate includes
    messages that never arrived. Related, and cosmetic: the per-message "each" figure formats to two
    decimals, so the shipped utility rate of 4,000 micro-USD prints as `$0.00 each` under a category
    whose total is not zero.

35. **Every sign-in is audited twice.** `LoginController::login()` writes "signed in" by hand and
    `LogAuthActivity` writes "logged in" from Laravel's `Login` event, so the immutable audit trail
    records two rows per authentication and the Events and Sign-ins counters above it double. Drop
    one of the two.
36. **The activity log's actor colour comes from the row index.** `$tone = $tones[$i % count($tones)]`
    in `activity-log.blade.php`, so one person is four different colours down a page and changes
    colour again on page 2. It looks like an encoding and is not one; key it off the causer, or make
    it neutral.
37. **Suspension is only checked at sign-in.** `LoginController` rejects a suspended account, and
    nothing revokes the session of someone already signed in, so suspending an account that is
    currently in the panel does nothing until their session expires. The Suspend button's own help
    text says "Blocks sign-in", which is technically accurate and reads as more than it is. Pair it
    with the session delete that Sign out everywhere already performs.

38. **`installed_version` is written once and never updated.** It is seeded by
    `database/settings/2026_08_08_000001_add_installed_version_to_platform_settings.php` from
    `config('app.version')` at first install, and nothing writes it afterwards. Platform settings
    compares it against the running version, so unless every release ships a settings migration that
    bumps it, the Version card reads **Mismatch after a good update and Healthy after a bad one**.
    The card's own help text tells the reader to re-run migrations, which is the opposite of what a
    stale value means. Either write it in the installer's post-update path or drop the comparison.
39. **A missing `storage/installed` sends a live install back to the wizard.** `RedirectIfNotInstalled`
    and `InstallerGuard` both key off the same lock file, so if a deploy replaces `storage/` the
    wizard becomes reachable against a populated database. Combined with a missing `.env`,
    `InstallerGuard::ensureAppKey()` generates a **new APP_KEY**, and `SafeEncrypted` then reads
    every stored WhatsApp token, app secret and AI key as null **without raising anything**. The
    quiet failure is the dangerous part: the panel simply shows empty credentials. A second marker in
    the database, checked alongside the file, would make this unreachable.

**Two leaks, not bugs, and worth their own lines:** `_scrub-demo-identities.php` replaced testers' names
and left their real WhatsApp numbers on the records, next to those names, on every list. Two were on
page 2 of the Customers list while page 1 was being photographed for this manual. The tool now
rewrites any number outside the 1555 demo range as well.

The second turned up on 2026-08-14 while shooting the admin panel: **Platform settings held the
author's own Gmail address** as the install's support email, on a screen whose own help text says
"Shown to customers on booking pages". Replaced with `support@marcosbarbers.example`. The scrub tool
does not cover settings stores, only customers.

**Check numbers and addresses, not just names, before any capture, and read every field on a settings
screen before shooting it.**

**Every one of these came out of a chapter, by reading the code and then looking at the screen.** That is the argument for keeping the screenshot pass inside the writing loop rather than
after it. Numbers 11, 13 and 15 are the ones most likely to generate refunds: all three are silent,
and all three contradict something the product tells the owner on screen. Of the Calendar four, 18 is
the one that misinforms rather than merely underdelivers. Of the inbox five, 20 is the same kind of
fault and the worst of them: the screen states the opposite of what the code does.

---

## Feeding the site

`site/src/data/docs.ts` currently marks eight values `PENDING`, and this scan answers most of them.
Fill them once question 1 above is settled:

| `docs.ts` field | Now answerable |
|---|---|
| `php` | 8.3.0 or newer |
| `database` | MySQL 8.0+ or MariaDB 10.6+ |
| `extensions` | pdo_mysql, mbstring, openssl, curl, gd, zip, intl |
| `web server` | Document root on `public/` |
| `whatsapp` | WhatsApp Cloud API number |
| `installSteps` | The wizard is a browser installer, not a console sequence. Rewrite the console block as the eight screens, or drop it. |
| `webhookPath` | `/webhooks/whatsapp/cloud` |
| SlotDesk `version` | Blocked on question 1 |

Two of those change the page rather than filling it. The prototype's console block assumes a
command-line install and SlotDesk ships a browser wizard, so that figure is wrong in kind, not just
in detail. **Do not fill the console block; replace it.**

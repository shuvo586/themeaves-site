# Troubleshooting

Symptom first. Find what you are seeing, and the entry names the usual cause and the chapter that
covers it properly.

Most of what goes wrong here is one of three things: **the queue worker is not running**, **the
24-hour window has closed**, or **a credential is missing**. Check those before anything clever.

---

## The first five minutes

Three checks, in this order, before you start reading.

| Check | Where | Tells you |
|---|---|---|
| **System health** | `/admin` → System health | Cron, queue depth, storage, PHP, database, cache |
| **Webhook diagnostics** | WhatsApp → Webhook diagnostics | Whether Meta's messages are arriving at all |
| **`php artisan ai:doctor`** | The server, from the project root | Whether each AI provider key authenticates, calls a tool and accepts the reply |

`ai:doctor` prints the provider's own error text, so a failure there is the vendor telling you what is
wrong rather than SlotDesk guessing.

---

## Nothing happens at all

**Customers message and nothing comes back. AI activity is empty.**
Start at Webhook diagnostics. If deliveries are arriving and verified, the queue worker is not
running. See [Cron and the queue worker](/docs/slotdesk/cron-and-queue).

**Everything works except reminders, sends and AI replies.**
That is the exact shape of a missing queue worker: the panels are fine because the panels do not
use the queue.

**System health says the queue is stuck.**
Jobs are waiting and nothing is consuming them. Start the worker, and set it to restart on boot.

**System health cannot tell me whether a worker is running.**
`exec()` is disabled on your host, so the check cannot look. Check from the server directly.

**Everything is empty and the scheduled tasks all say "never run".**
The cron entry is missing. One line, in [Cron and the queue worker](/docs/slotdesk/cron-and-queue).

---

## Messages do not arrive

**The webhook will not verify in Meta.**
The verify token in the Meta dashboard and the one saved in the setup wizard must match exactly, and
the callback URL must be HTTPS. See [WhatsApp Cloud API](/docs/slotdesk/whatsapp-cloud-api).

**Webhook diagnostics says the signature check failed.**
The App Secret saved in SlotDesk is not your Meta app's. Re-copy it and save.

**Webhook diagnostics says "no matching WhatsApp account".**
The Phone number ID does not match the one Meta is delivering for.

**Confirmations arrive, reminders do not.**
The 24-hour window. A day-before reminder is almost always outside it, so it needs an approved
fallback template mapped on the reminder template, and without one the send is recorded as failed.
See [Notifications and reminders](/docs/slotdesk/notifications-and-reminders).

**Nothing is sent for bookings the team typed in.**
Manual bookings schedule no notifications at all in this release. Neither a confirmation nor a
reminder. See [Booking rules](/docs/slotdesk/booking-rules).

**A customer was never told their appointment was cancelled.**
Cancelling sends nothing. It only clears the pending reminders.

**Failed messages is filling up and Retry does nothing.**
Those rows are templates. Retry, and the automatic five-minute retry, only handle free-form text
inside the window. See [Monitoring](/docs/slotdesk/monitoring).

**A customer says they get nothing at all, ever.**
Check their record: an opted-out customer is skipped everywhere, and nothing in the panel can undo
that. See [Customers and reports](/docs/slotdesk/customers-and-reports).

**No email arrives from SlotDesk, including password resets.**
A fresh install writes mail to the log file instead of sending it. Configure SMTP. See
[Before you start](/docs/slotdesk/before-you-start).

---

## The AI receptionist

**The AI is silent on one conversation only.**
It is paused there, or the thread is in Handoff. Both are shown in the thread's banner. See
[The team inbox](/docs/slotdesk/team-inbox).

**Resume AI did nothing.**
On a handoff thread the status also has to change. Take the thread over, or close and reopen it,
then resume.

**The AI is silent everywhere.**
In order: the agent is switched off, the provider key is missing or rejected, the answer window is
set to outside opening hours only, or the queue is not running. `ai:doctor` settles the middle one.

**The AI answers in the chat simulator but not on WhatsApp.**
The simulator runs the pipeline synchronously and bypasses the queue. This is the clearest possible
evidence that your worker is stopped.

**The simulator filled Failed messages with rubbish.**
Its replies go out through the real transport unless `SLOTDESK_WHATSAPP_DRIVER=fake` is set. See
[Monitoring](/docs/slotdesk/monitoring).

**Runs in AI activity say Pending and never finish.**
The worker stopped mid-run, or the provider is not answering.

**The AI answers off-topic questions, or refuses reasonable ones.**
Guardrails, and the knowledge base behind them. See
[Guardrails and the knowledge base](/docs/slotdesk/guardrails-and-knowledge).

**The AI booked something wrong.**
Open the run in AI activity and read its tool calls. That drawer records what it checked, held and
booked.

---

## Bookings and the calendar

**A booking exists but is not on the Calendar.**
The grid is fixed at 9 AM to 6 PM and does not read your opening hours. Evening bookings are real and
simply not drawn. See [Calendar and appointments](/docs/slotdesk/calendar-and-appointments).

**A booking disappears when I switch to Day view.**
It has no staff member assigned, or the one it has is deactivated.

**Clicking a booking on the Calendar does nothing.**
Correct. The Calendar is a viewer; changes happen on Appointments.

**Two bookings landed on the same staff member at the same time.**
A booking typed in by hand skips the conflict check. The booking page and the receptionist do not.

**A staff member's working hours look empty although they were saved.**
A display defect: the values are stored and enforced. See
[Staff and team members](/docs/slotdesk/staff-and-team).

**Customers cannot book online, but the panel works.**
The business is marked inactive, or platform maintenance mode is on. Both close only the public
booking page. See [The admin panel](/docs/slotdesk/admin-panel).

---

## Money

**A percentage deposit charged the whole price.**
A known defect in this release. Use a fixed deposit amount until it is fixed. See
[Locations, categories and services](/docs/slotdesk/catalog).

**The cost dashboard does not match my Meta invoice.**
It never will exactly. SlotDesk estimates per message from a rate table in the files; Meta bills per
conversation from its own. See [Monitoring](/docs/slotdesk/monitoring).

**Booked revenue on Reports does not match Payments.**
Different questions. Reports counts what bookings are worth, including unpaid deposits; Payments
counts money that moved. See [Customers and reports](/docs/slotdesk/customers-and-reports).

**"Free windows used" is over 100%, or looks wrong.**
It is only correct on the This month range.

---

## Screens, accounts and permissions

**A screen I was told about is not in my sidebar.**
Your role. Owner sees everything, Admin sees configuration, Staff sees the day. See
[First login and the two panels](/docs/slotdesk/panels).

**`/admin` returns 404.**
The account is not a super admin.

**The Delete button on an edit form does nothing.**
A known defect on every edit form. Delete from the list instead.

**Saving a customer returned a server error.**
That WhatsApp number already exists on another record.

**A suspended user is still working in the panel.**
Suspension is checked at sign-in. Sign them out everywhere as well.

**Two Team screens, and I cannot tell which is which.**
`/admin` → Team is everyone on the install. Team inside a business is that business's logins. Staff
is who performs services.

---

## After an update

**Every page redirects to the install wizard.**
`storage/installed` is missing. See **Updating and backups**.

**The WhatsApp token and AI key look empty and nothing sends.**
The `APP_KEY` in `.env` is not the one they were encrypted with.

**A 500 on every page.**
Migrations did not run, or a cache is stale. `php artisan migrate --force`, then
`php artisan optimize:clear`.

**Reminders stopped the day of the update.**
The queue worker was not restarted and is still running the old code.

**Service images are broken and nothing else is.**
`php artisan storage:link`.

---

## When none of this helps

Have these ready before you contact support, because they are the first four things anybody will ask
for.

1. **The version**, from `/admin` → Settings.
2. **The System health verdict**, and which checks are failing.
3. **The exact screen and what you did**, with the wording of any message.
4. **The last error in `storage/logs/laravel.log`**, which is usually the answer on its own.

If it is an AI problem, add the output of `php artisan ai:doctor`. If it is a message that did not
arrive, add the row from Failed messages with its error code, and whether the customer had messaged
you in the previous 24 hours.

---

*Previous: [The admin panel](/docs/slotdesk/admin-panel)*
*Next: **Updating and backups**, taking a new release safely and what to keep a copy of.*

# Notifications and reminders

What SlotDesk sends on its own, when it sends it, and the two screens that control it.

All of it depends on the queue worker and the cron entry. If those are not running, everything in
this chapter is configuration that never fires. See
[Cron and the queue worker](/docs/slotdesk/cron-and-queue).

---

## Only two of the five notifications are ever sent

The template list offers five kinds. This release schedules two of them.

| Notification | When it goes out |
|---|---|
| **Confirmation** | Immediately, when a booking is made |
| **Reminder** | Once for each reminder offset you have set |
| **Follow-up** | **Never in this release** |
| **No-show** | **Never in this release** |
| **Cancellation** | **Never in this release** |

⚠️ The last three can be written, activated and saved, and nothing will send them. Nothing schedules
them. Treat them as placeholders for a later version rather than features you can build on. In
particular, **cancelling an appointment tells the customer nothing**: it cancels their pending
reminders and sends no message.

**Every scheduled notification goes out over WhatsApp.** The channel selector offers Email, and an
email template can be saved and marked active, but nothing ever schedules an email notification.
Email in this product is for password resets and handoff alerts to your own team, not for customers.

---

## Which bookings get notifications at all

| How the booking was made | Confirmation and reminders |
|---|---|
| The public booking page | Yes |
| The AI receptionist | Yes |
| **Typed into the panel by hand** | **No** |

⚠️ A booking created on the Appointments screen schedules nothing, silently. No confirmation, no
reminder. If your team books people in by hand and customers say they never hear anything, this is
why, and it is not a configuration mistake on your part.

Two more lifecycle rules worth knowing:

- **Rescheduling re-sends.** Moving an appointment clears its pending notifications and schedules a
  fresh confirmation immediately, plus new reminders measured from the new time.
- **Cancelling sends nothing.** Pending reminders are cancelled so they cannot fire for an
  appointment that is no longer happening. The customer is not told by SlotDesk.

---

## Reminder settings

**Notifications → Reminder settings**, Owner only. Each row is an amount and a unit, and each row
produces one reminder that many minutes before the appointment starts.

![Reminder settings: a timeline preview above two reminder rows.](/docs/slotdesk/reminder-settings.png)
*The preview is anchored to a sample Friday at 15:00, and says so. It is not a real booking.*

| Rule | Detail |
|---|---|
| **Default** | 1 day and 2 hours before, until you change it |
| **Minimum** | 1 of whichever unit you pick |
| **Maximum** | Two weeks. Further out is refused |
| **Duplicates** | Collapsed. Two rows meaning the same offset become one reminder |
| **Order** | Stored earliest first, whatever order you type them in |

**Only reminders still in the future are scheduled.** A customer booking a slot two hours from now
never gets the one-day reminder, because that moment has already passed. Nothing is queued and
nothing fails; the reminder simply does not exist for that booking.

The preview strip is anchored to a sample appointment on the next Friday at 15:00 in your business
timezone. It exists to sanity-check the offsets, not to describe a real booking.

---

## Notification templates

**Notifications → Notification templates**, Admin or Owner. One template per notification per
channel, so there is exactly one WhatsApp reminder for the business.

![The notification templates list: a confirmation and a reminder, both WhatsApp, neither with a fallback template.](/docs/slotdesk/notification-templates.png)
*A dash in Fallback template is the setting that stops reminders. The next section is about that
column.*

**An empty list is not a problem.** A fresh install has no templates at all, and SlotDesk sends
built-in default text for confirmations and reminders. The same happens if a template exists but is
switched inactive. You write a template to change the wording, not to turn sending on.

### Placeholders

These are substituted when the message is sent, not when you save it.

| Placeholder | Becomes |
|---|---|
| `{{customer_name}}` | The customer's name, or `there` if you do not have one |
| `{{service}}` | The service name |
| `{{date}}` | The date, in the appointment's own timezone |
| `{{time}}` | The start time, in the appointment's own timezone |
| `{{staff}}` | The staff member's name |
| `{{location}}` | The location name, or nothing at all if the service has no location |
| `{{manage_link}}` | A signed link to view, reschedule or cancel, valid for 7 days |

Write around the two that can come out empty. "Your appointment at {{location}}" reads badly as
"Your appointment at " when the service has no location set.

---

## The 24-hour window is what actually breaks reminders

This is the part that catches people, and it is a Meta rule rather than a SlotDesk one.

Free-form WhatsApp messages can only be sent within **24 hours of the customer's last message**.
Outside that window, only an approved template can be delivered. See
[Templates and the 24-hour window](/docs/slotdesk/templates-and-the-24-hour-window).

Now look at what a reminder usually is. Somebody books on Monday for an appointment on Friday. The
day-before reminder fires on Thursday, three days after they last typed anything. **The window is
shut, and the reminder is not a free-form message any more.**

![The reminder template, with Fallback WhatsApp template set to "No fallback".](/docs/slotdesk/notification-template-form.png)
*This is the state a fresh install is in. The help text under the field is the whole problem in one
sentence.*

So, on the reminder template:

1. Set **Fallback WhatsApp template** to an approved template.
2. Without one, the send **fails**. The screen's help text says it will "skip sending", but what
   actually happens is a failed send recorded against the appointment, with the reason
   "Outside the 24h window and no approved template mapped."

Confirmations are usually fine, because a customer who just booked through the receptionist messaged
seconds ago. **It is the reminders that need the template**, which is the opposite of where most
people put their attention.

---

## Opt-out is honoured before anything else

If a customer has opted out, the notification is not sent, and is recorded as skipped with the reason
rather than as a failure. Nothing you can configure overrides that, which is the correct behaviour
and keeps your number out of trouble.

---

## Every attempt is written down

Sent, skipped or failed, each notification records the outcome and a reason against the appointment.
When a customer says they were never told, that log answers whether SlotDesk tried, and what happened
when it did.

---

## If something went wrong

**Nothing sends at all, ever.**
The queue worker. It is the single most common cause, and everything else in this chapter is
downstream of it.

**Confirmations arrive and reminders do not.**
The 24-hour window. Map an approved template on the reminder template.

**Nothing is sent for bookings your team typed in.**
Manual bookings schedule no notifications in this release.

**A customer got two identical reminders.**
Not from duplicate rows, which are collapsed. Check whether the appointment was rescheduled, which
rebuilds the schedule.

**A reminder never fired for a same-day booking.**
The offset was already in the past when the booking was made. Add a shorter offset if you want
same-day cover.

**The message arrived with a blank in it.**
A placeholder resolved to nothing, usually `{{location}}` on a service with no location.

**Editing the follow-up or no-show template changes nothing.**
Correct. Nothing schedules those.

**A customer says they never got a cancellation message.**
None is sent. SlotDesk cancels the reminders and stays quiet.

---

*Previous: [Booking rules](/docs/slotdesk/booking-rules)*
*Next: **Calendar and appointments**, the screens you will live in day to day.*

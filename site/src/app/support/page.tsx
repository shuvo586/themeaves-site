import type { Metadata } from 'next';
import { ArrowDown } from 'lucide-react';
import {
  ArrowLink,
  Band,
  Col,
  Cols,
  PageHero,
  Rail,
} from '@/components/ui/primitives';
import { site } from '@/data/site';
import { TicketForm } from './TicketForm';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Tickets, docs and email. How to reach the people who wrote the product, and what to expect back.',
};

/* Built to the handoff Support prototype
   (_dev/handoff/directions-preference/project/ThemeAves Support.dc.html),
   section for section: hero with the crumb and meta rail, three channels,
   the ticket form beside the "what to expect" plate, then the FAQ.

   Two things are deliberate departures from that drawing.

   1. The form submits to /api/ticket, which forwards by email through the
      Resend API. Until RESEND_API_KEY is set the form says the desk is not
      connected, in words, rather than pretending a ticket was filed.
   2. The prototype's four product footer links were the invented products;
      the real catalogue is two, so the footer columns come from data, not
      from this file. */
export default function SupportPage() {
  const { email, timezone, workingDays, responseWindow } = site.support;

  return (
    <>
      <PageHero
        crumb="Support · ThemeAves"
        meta={`${workingDays} · ${timezone}`}
        eyebrow="We answer our own code"
        title="Help from the people who built it."
        lead={
          <>
            Every licence includes six months of support, answered by whoever wrote the product,
            not a first-line script. Most tickets get a reply {responseWindow.toLowerCase()}.
          </>
        }
      />

      {/* The three channels: ticket, docs, email. Each opens on a mono label
          and carries one way in, exactly as the prototype draws it. */}
      <Band tint>
        <Rail left="Ways to reach us" right="Three channels" />
        <div className="mt-12">
          <Cols>
            <Col index={0} label="Ticket" title="Open a support ticket">
              <p>
                Best for install issues and bugs. Include your version and server details for the
                fastest reply.
              </p>
              <p className="mt-4">
                <a href="#ticket" className="label text-accent underline-offset-4 hover:underline">
                  Start a ticket
                  <ArrowDown size={13} className="ms-1 inline" aria-hidden />
                </a>
              </p>
            </Col>

            <Col index={1} label="Docs" title="Check the documentation">
              <p>
                Setup, the WhatsApp connection and configuration are covered end to end, kept
                current with each release.
              </p>
              <p className="mt-4">
                <ArrowLink href="/docs" className="label text-accent">
                  Read the docs
                </ArrowLink>
              </p>
            </Col>

            <Col index={2} label="Email" title="Email the studio">
              <p>For licensing, invoices and pre-sales questions.</p>
              <p className="mt-4">
                <a
                  href={`mailto:${email}`}
                  className="label text-accent underline underline-offset-4"
                >
                  {email}
                </a>
              </p>
            </Col>
          </Cols>
        </div>
      </Band>

      {/* The ticket form and the expectation plate beside it. The form is a
          real control: it posts to /api/ticket and says what happened. */}
      <Band id="ticket" className="scroll-mt-20">
        <Rail left="Open a ticket" right={`Reply ${responseWindow}`} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <TicketForm />
            <p className="mt-8 max-w-[52ch] text-muted">{site.support.itemSupportNote}</p>
          </div>

          <dl className="spec self-start">
            <div className="spec-head">
              <span className="label label-sm">What to expect</span>
            </div>
            <div className="spec-row">
              <dt>first reply</dt>
              <dd>{responseWindow}</dd>
            </div>
            <div className="spec-row">
              <dt>hours</dt>
              <dd>{workingDays}</dd>
            </div>
            <div className="spec-row">
              <dt>included</dt>
              <dd>6 months / licence</dd>
            </div>
            <div className="spec-row">
              <dt>handled by</dt>
              <dd>The dev team</dd>
            </div>
          </dl>
        </div>
      </Band>

      {/* Three questions with the answer on the right, divided by hairlines,
          the prototype's exact layout for the FAQ. */}
      <Band tint>
        <Rail left="Common questions" right="Before you write in" />
        <div className="mt-4 pb-8">
          <div className="grid gap-8 border-b border-line-faint py-6 md:grid-cols-[1fr_2fr]">
            <h3 className="font-display text-[1.125rem] leading-[1.3] font-bold tracking-[-0.01em]">
              Is support really included?
            </h3>
            <p className="max-w-[56ch] text-muted">
              Yes. Six months from purchase, on every licence. You can extend it on CodeCanyon
              when it runs out.
            </p>
          </div>
          <div className="grid gap-8 border-b border-line-faint py-6 md:grid-cols-[1fr_2fr]">
            <h3 className="font-display text-[1.125rem] leading-[1.3] font-bold tracking-[-0.01em]">
              Do you access my server?
            </h3>
            <p className="max-w-[56ch] text-muted">
              No. We help you fix things on your own install. We never need, or want, access to
              your database.
            </p>
          </div>
          <div className="grid gap-8 py-6 md:grid-cols-[1fr_2fr]">
            <h3 className="font-display text-[1.125rem] leading-[1.3] font-bold tracking-[-0.01em]">
              Something broke after an update?
            </h3>
            <p className="max-w-[56ch] text-muted">
              Check the{' '}
              <ArrowLink href="/changelog" className="text-accent">
                changelog
              </ArrowLink>{' '}
              for what changed, then open a ticket with your previous and current versions.
            </p>
          </div>
        </div>
      </Band>
    </>
  );
}
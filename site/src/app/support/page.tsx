import type { Metadata } from 'next';
import Link from 'next/link';
import { Band, Col, Cols, ExternalLink, PageHero, Rail } from '@/components/ui/primitives';
import { getProduct } from '@/data/products';
import { isPending, known, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Where to send a question about a ThemeAves product, and what to expect back.',
};

/* Built to the composition in the handoff Support prototype: crumb rail, blue
   eyebrow, display heading, then "ways to reach us" as three divided columns.

   Two things in that prototype are not carried over.

   1. It ships a ticket form. Brief section 6.11 is explicit: triage only, no
      form and no ticket UI, because a form emailing a mailbox nobody has
      committed to watching implies a queue that does not exist. The fourth
      block is the scope and response table instead.
   2. It states "reply within 1 business day", "MON-FRI 09:00-18:00 GMT+5:30"
      and support@themeaves.com. All three are ❌ rows in docs/FACTS.md. They
      render as placeholders until they are decided. */
export default function SupportPage() {
  const aonomy = getProduct('aonomy')!;
  const email = known(site.support.email);
  const hours = known(site.support.workingDays);
  const timezone = known(site.support.timezone);
  const responseWindow = known(site.support.responseWindow);

  return (
    <>
      <PageHero
        crumb="Support · ThemeAves"
        meta={hours && timezone ? `${hours} · ${timezone}` : undefined}
        eyebrow="We answer our own code"
        title="Help from the people who built it."
        lead={
          <>
            {site.support.includedTerm} It is answered by whoever wrote the code, not a first-line
            script reading from a card.
          </>
        }
      />

      <Band tint>
        <Rail left="Ways to reach us" right="Three channels" />
        <div className="mt-12">
          <Cols>
            <Col index={0} label="Item comments" title="Report a bug where it is recorded.">
              <p>
                Envato records item support on the item&apos;s comments tab, so a bug reported there
                is on the record. Include your PHP and database versions, the exact error copied not
                described, and whether it happens on a clean install.
              </p>
              {!isPending(aonomy.itemUrl) ? (
                <p className="mt-4">
                  <ExternalLink href={aonomy.itemUrl} className="label text-accent">
                    Aonomy item page
                  </ExternalLink>
                </p>
              ) : null}
            </Col>

            <Col index={1} label="Docs" title="Check the documentation first.">
              <p>
                Setup, the WhatsApp connection and configuration are covered end to end, and the
                docs move with each release rather than after it.
              </p>
              <p className="label mt-4">Not published yet</p>
            </Col>

            <Col index={2} label="Email" title="Email the studio before you buy.">
              <p>
                Licensing, invoices and pre-sale questions do not need a purchase code, so they go
                straight to email.
              </p>
              <p className="mt-4">
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="label text-accent underline underline-offset-4"
                  >
                    {email}
                  </a>
                ) : (
                  <span className="label">Address not published yet</span>
                )}
              </p>
            </Col>
          </Cols>
        </div>
      </Band>

      <Band>
        <Rail left="What is covered" right="Included and not" />
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-[1.5rem] leading-[1.2] font-bold tracking-[-0.01em]">
              Included
            </h2>
            <ul className="mt-4 space-y-2 text-muted">
              <li>Bugs in the item, on a supported stack</li>
              <li>Questions about features that ship with it</li>
              <li>Help with the documented install</li>
              <li>Updates, free for the life of the item</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[1.5rem] leading-[1.2] font-bold tracking-[-0.01em]">
              Not included
            </h2>
            <p className="mt-4 text-muted">
              Written down so nobody finds the line by crossing it.
            </p>
            <ul className="mt-4 space-y-2 text-muted">
              <li>Customisation, or code written to your spec</li>
              <li>Third-party plugins, themes and APIs</li>
              <li>Server administration and hosting problems</li>
              <li>Installing it on your server for you</li>
            </ul>
          </div>
        </div>
      </Band>

      <Band tint>
        <Rail left="What to expect" right="Response" />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="max-w-[18ch] font-display text-[2rem] leading-[1.1] font-extrabold tracking-[-0.025em]">
              A slower promise that holds beats a fast one that does not.
            </h2>
            <p className="mt-6 max-w-[52ch] text-muted">
              This is one person, not a rota. There is no 24/7 line and no same-day guarantee, and
              the figures below will say so plainly once they are set.
            </p>
            <p className="mt-6">
              <Link href="/licenses" className="label text-accent underline underline-offset-4">
                Check a licence instead
              </Link>
            </p>
          </div>

          <dl className="spec self-start">
            <div className="spec-row">
              <dt>Response</dt>
              <dd className="text-muted">support</dd>
            </div>
            <div className="spec-row">
              <dt>working days</dt>
              <dd className={hours ? '' : 'text-muted'}>{hours ?? 'not published'}</dd>
            </div>
            <div className="spec-row">
              <dt>timezone</dt>
              <dd className={timezone ? '' : 'text-muted'}>{timezone ?? 'not published'}</dd>
            </div>
            <div className="spec-row">
              <dt>usual reply</dt>
              <dd className={responseWindow ? '' : 'text-muted'}>
                {responseWindow ?? 'not published'}
              </dd>
            </div>
            <div className="spec-row">
              <dt>included</dt>
              <dd>6 months</dd>
            </div>
            <div className="spec-row">
              <dt>renewals</dt>
              <dd>Through Envato</dd>
            </div>
          </dl>
        </div>
      </Band>
    </>
  );
}

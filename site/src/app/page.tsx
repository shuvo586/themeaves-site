import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button, Container, Display, Price } from '@/components/ui/primitives';
import { products, TYPE_LABEL } from '@/data/products';
import { isPending, known, site } from '@/data/site';

/* The homepage, built to the composition in
   _dev/handoff/directions-preference/project/ThemeAves Home.dc.html.

   Three things in that prototype are not carried over, and each is a rule in
   the brief rather than a preference:

   1. It ships three products that do not exist (DeskLedger, QueueMate,
      FormAtlas). The catalogue here is the real one, which is two.
   2. It fills every blank the brief forbids filling: $59, v1.2.0 through
      v1.4.0, five release dates and demo.slotdesk.app. Those are placeholders.
   3. Its mono rails are #8a8f98, which is 2.98:1 on paper. They use
      --color-muted at 5.50:1.

   The releases section is gated on real changelog data and therefore does not
   render yet. Omitting a section beats filling it. */

const flagship = products.find((p) => p.slug === 'slotdesk')!;
const aonomy = products.find((p) => p.slug === 'aonomy')!;

const STEPS = [
  {
    step: 'Message',
    title: 'A customer texts your number.',
    body: 'They message the same WhatsApp number you already publish. No app to install, no portal to log into.',
  },
  {
    step: 'Parse',
    title: 'SlotDesk reads intent and offers slots.',
    body: 'It checks the request against your live availability, proposes open times, and confirms in the same thread.',
  },
  {
    step: 'Booked',
    title: 'It lands in your calendar.',
    body: 'The booking writes straight to your database and calendar. You own the record from the first message on.',
  },
];

const TRUST = [
  {
    n: '01',
    title: 'Your data stays in your database.',
    body: 'Bookings, numbers and conversation history live on your server. Nothing routes through a third-party queue you do not control.',
  },
  {
    n: '02',
    title: 'One licence, not a rising monthly bill.',
    body: 'A one-time marketplace licence with six months of support. Add staff and locations without the price moving.',
  },
  {
    n: '03',
    title: 'Every change ships with a dated entry.',
    body: 'You always know what is running and what moved, because the changelog is public and the version is visible in the admin.',
  },
];

export default function Home() {
  const hasDemo = !isPending(site.demo.url);

  return (
    <>
      {/* 1. Hero. Measurements are the prototype's: 1fr 1fr, 48px gap,
             56/64 padding, a dotted divider inset 44px top and bottom, a
             248px hatch, and a 150px phone pulled up 60px. ---------------- */}
      <Container>
        <div className="rail" style={{ paddingBlock: '14px 6px' }}>
          <span>Home · Envato marketplace author</span>
        </div>

        <div className="relative grid gap-12 pt-14 pb-16 lg:grid-cols-2">
          <div
            aria-hidden
            className="hero-divider absolute bottom-11 top-11 hidden w-px lg:block"
            style={{ insetInlineStart: 'calc(50% - 24px)' }}
          />

          <div>
            {/* Tide, as a stripe rather than as type: it is 2.08:1 on paper,
                so it can be a mark but never a word on a light ground. The
                stripe is `.eyebrow` in globals.css, shared with every other
                sub heading on the site. */}
            <p className="eyebrow label text-accent">ThemeForest · CodeCanyon</p>
            <Display as="h1" className="mt-5">
              We build software and document every change.
            </Display>
            <p className="mt-[22px] max-w-[46ch] text-[18px] leading-[1.6] text-muted">
              ThemeAves is an independent Envato author. We ship templates and self-hosted software
              on ThemeForest and CodeCanyon, with every release dated and on the record.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button href="/products" variant="accent">
                See what we build
              </Button>
              <Button href="/demos" variant="outline">
                Try a live demo
              </Button>
            </div>

            <p className="label mt-[34px] border-t border-line pt-3.5 tracking-[0.06em]">
              ThemeForest · CodeCanyon · One licence, kept
            </p>
          </div>

          {/* The Aonomy frame overlaps the SlotDesk frame by 60px and is
              pinned to the column's foot: top 226px is the 286px dashboard
              frame less the 60px overlap, bottom 0 is the column's bottom
              edge. The pb reserve sizes the art to the text column's natural
              height (466 at 1440), so both columns end on the same line and
              the art does not stretch the hero taller than the copy. */}
          {/* The reserve is needed at every width, not only below lg: without
              it the art column is only as tall as its content and the Aonomy
              frame crosses the band boundary into how-it-works. */}
          <div className="relative flex flex-col pb-[180px]">
            <div className="w-full">
              <figure className="w-full border border-line-strong bg-surface">
              <div className="flex items-center gap-2 border-b border-line-strong px-3 py-[9px]">
                <span aria-hidden className="block h-[9px] w-[9px] border border-line-strong" />
                <span aria-hidden className="block h-[9px] w-[9px] border border-line-strong" />
                <span className="label ms-2 truncate normal-case tracking-normal">
                  {known(site.demo.url) ?? 'demo url not announced'}
                </span>
              </div>
              {/* The real dashboard, shot at 1440 against the running app.
                  Top-aligned rather than centred: the crop has to keep the
                  navigation and the stat row, which is what makes it read as
                  an application rather than a chart. */}
              <div className="relative h-[248px] w-full overflow-hidden">
                <Image
                  src="/products/slotdesk/dashboard.png"
                  alt="The SlotDesk dashboard: today's appointments, estimated WhatsApp cost for the month, AI bookings this week, and a list of items needing attention."
                  fill
                  sizes="(max-width: 1023px) 100vw, 568px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </figure>

              <figure
                style={{
                  top: '226px',
                  bottom: 0,
                  insetInlineEnd: 12,
                  width: 'min(400px, calc(100% - 12px))',
                }}
                className="absolute flex flex-col border border-line-strong bg-surface"
              >
                {/* The template half of the same studio: Aonomy, from the item
                    banner, in the same browser chrome as the flagship frame
                    above it. Wider than the phone it replaced: a landing page
                    needs width to read as a landing page. */}
                <div className="flex items-center gap-2 border-b border-line-strong px-3 py-[9px]">
                  <span aria-hidden className="block h-[9px] w-[9px] border border-line-strong" />
                  <span aria-hidden className="block h-[9px] w-[9px] border border-line-strong" />
                  <span className="label ms-2 truncate normal-case tracking-normal">
                    {known(aonomy.itemUrl)}
                  </span>
                </div>
                <div className="relative w-full flex-1 overflow-hidden">
                  <Image
                    src="/products/aonomy/particles-thumbnail.jpg"
                    alt="The Aonomy landing page template, an app landing page in eight background treatments."
                    fill
                    sizes="400px"
                    className="object-cover object-top"
                  />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </Container>

      {/* 2. How it works. Ruled top and bottom, which is what separates the
             white band from the paper either side of it. ----------------- */}
      <section className="border-y border-line bg-surface">
        <Container>
          <div className="rail">
            <span>How SlotDesk works</span>
            <span>3 steps · no third-party queue</span>
          </div>

          <div className="pt-14 pb-16">
            <h2 className="max-w-[24ch] font-display text-[34px] leading-[1.12] font-bold tracking-[-0.02em] max-sm:text-[26px]">
              A message arrives, a booking appears, nothing sits in someone else&apos;s cloud.
            </h2>

            <ol className="mt-11 grid border-t border-line md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li
                  key={s.step}
                  className={`py-7 md:px-7 ${i === 0 ? 'md:ps-0' : ''} ${
                    i === STEPS.length - 1 ? 'md:pe-0' : 'md:border-e md:border-line'
                  }`}
                >
                  <p className="font-mono text-[12px] text-accent">
                    Step {String(i + 1).padStart(2, '0')} · {s.step.toUpperCase()}
                  </p>
                  <h3 className="mt-3 font-display text-[20px] leading-[1.25] font-bold tracking-[-0.01em]">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 3. Flagship, with the spec sheet --------------------------------- */}
      <section id="products">
        <Container>
          <div className="rail">
            <span>Flagship · SlotDesk AI</span>
            <span>Spec sheet</span>
          </div>

          <div className="grid gap-12 pt-14 pb-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow font-mono text-[12px] tracking-[0.12em] text-accent uppercase">
                CodeCanyon · PHP-script
              </p>
              <h2 className="mt-3.5 font-display text-[38px] leading-[1.06] font-extrabold tracking-[-0.02em] max-sm:text-[30px]">
                {flagship.name}
              </h2>
              <p className="mt-4 max-w-[52ch] text-[16px] leading-[1.62] text-muted">
                A self-hosted WhatsApp booking agent for salons, clinics and studios. Install it on
                your own server, connect your number, and hand off scheduling without giving up your
                data or paying per seat.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Button href={`/products/${flagship.slug}`} variant="accent">
                  See the full spec
                </Button>
                {hasDemo ? (
                  <Button href={site.demo.url as string} variant="outline" external>
                    Live demo
                  </Button>
                ) : null}
              </div>
            </div>

            <dl className="spec self-start">
              {/* The prototype names the plate in an 11px header above the
                  rows, not in a term/value pair. As a row it read as a fact
                  whose value happened to be the slug. */}
              <p className="spec-head label label-sm">Specification</p>
              <div className="spec-row">
                <dt>stack</dt>
                <dd>{flagship.tooling.join(' · ')}</dd>
              </div>
              <div className="spec-row">
                <dt>licence</dt>
                <dd>
                  Regular · <Price value={flagship.price} currency={flagship.currency} />
                </dd>
              </div>
              <div className="spec-row">
                <dt>hosting</dt>
                <dd>Self-hosted</dd>
              </div>
              <div className="spec-row">
                <dt>data</dt>
                <dd>Stays on your server</dd>
              </div>
              <div className="spec-row">
                <dt>support</dt>
                <dd>6 months included</dd>
              </div>
              <div className="spec-row">
                <dt>version</dt>
                <dd className={isPending(flagship.version) ? 'text-muted' : ''}>
                  {known(flagship.version) ?? 'not announced'}
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* 4. Why self-hosted. Ruled top and bottom on the surface, the same
             band treatment as how-it-works. It was running on open padding
             with no rules, so the plane had no edges and the section read as
             loose page rather than as a band. ---------------------------- */}
      <section className="border-y border-line bg-surface">
        <Container>
          <div className="rail">
            <span>Why self-hosted</span>
            <span>The trust argument</span>
          </div>

          <ul className="grid border-t border-line pt-14 pb-16 md:grid-cols-3">
            {TRUST.map((t, i) => (
              <li
                key={t.n}
                className={`py-2 md:px-8 ${i === 0 ? 'md:ps-0' : ''} ${
                  i === TRUST.length - 1 ? 'md:pe-0' : 'md:border-e md:border-line'
                }`}
              >
                <p className="numeral">{t.n}</p>
                <h3 className="mt-[14px] font-display text-[19px] leading-[1.3] font-bold tracking-[-0.01em]">
                  {t.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-muted">{t.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 5. The catalogue. The prototype's three invented products replaced
             by the two that exist, so this runs two columns rather than its
             three. A third column standing empty is the void the colour
             discipline exists to prevent.

             It also stays on the page colour rather than taking the
             prototype's white plane. The prototype alternates bg / white /
             bg / white / bg / white before the blue, and the band it puts
             between this one and the trust band is the changelog teaser,
             which is omitted. On page colour the alternation survives the
             omission; on white the two surfaces would fuse into one slab
             with a double hairline down the middle. ------------------- */}
      <section>
        <Container>
          <div className="rail">
            <span>The studio</span>
            <span>What we maintain</span>
          </div>

          <ul className="grid gap-6 pt-14 pb-16 md:grid-cols-2">
            {products.map((p) => {
              const icon = known(p.icon);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex h-full flex-col border border-line-strong p-6 text-ink no-underline"
                  >
                    {icon ? (
                      <Image
                        src={icon}
                        alt={`${p.name} icon`}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    ) : null}
                    <p
                      className={`label label-sm tracking-[0.1em] ${
                        icon ? 'mt-4' : ''
                      }`}
                    >
                      {TYPE_LABEL[p.type]} ·{' '}
                      {p.marketplace === 'codecanyon' ? 'CodeCanyon' : 'ThemeForest'}
                    </p>
                    <h3 className="mt-3 font-display text-[20px] leading-[1.2] font-bold tracking-[-0.01em]">
                      {p.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[14.5px] leading-[1.58] text-muted">{p.pitch}</p>
                    <p className="mt-6 flex items-center justify-between">
                      <Price value={p.price} currency={p.currency} />
                      <span className="label label-sm inline-flex items-center gap-1 group-hover:underline">
                        Open <ArrowUpRight size={13} aria-hidden />
                      </span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* 6. Closing plane. 1.3fr against 1fr, 72px of padding, and a heading
             fixed at 44px rather than the display clamp's 56: this h2 sits
             beside a button stack, not alone at the top of a page, and at 56
             it pushed the stack out of alignment with it.

             The close is the studio's, one action pointing at the catalogue.
             The licence line and the second button moved out, and a plane
             whose only job is to carry one message carries one call. -------- */}
      <section data-on-accent className="bg-accent-plane text-on-accent">
        <Container>
          <div className="grid items-center gap-12 py-[72px] lg:grid-cols-[1.3fr_1fr]">
            <div>
              {/* No mark here. The chrome now carries the logo in colour at
                  both ends of the document, so an 88px bird on the closing
                  plane was the third statement of the same thing on one page
                  and it pushed the message down the band. */}
              <p className="eyebrow label text-on-accent tracking-[0.14em]">The studio</p>
              <h2 className="mt-4 max-w-[20ch] font-display text-[44px] leading-[1.05] font-extrabold tracking-[-0.025em] max-sm:text-[32px]">
                Built to be owned.
              </h2>
              <p className="mt-[18px] max-w-[48ch] text-[17px] leading-[1.6]">
                Templates on ThemeForest, software on CodeCanyon. One licence, no subscription, and
                every release dated and on the record.
              </p>
            </div>

            <div className="flex flex-col items-start gap-[14px]">
              <Button href="/products">See everything we make</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

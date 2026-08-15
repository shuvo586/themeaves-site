import type { Metadata } from 'next';
import {
  ArrowLink,
  Container,
  Display,
  ExternalLink,
  Heading,
  ImageSlot,
  Lead,
  PendingAction,
  Button,
  Section,
} from '@/components/ui/primitives';
import { getProduct } from '@/data/products';
import { isPending, known, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Demos',
  description: 'Every live demo for ThemeAves products, in one place.',
};

/* One short page. The demos live on other hosts, so this is the only place
   that gathers them, and it exists to get people out of it quickly. No hero
   beyond one line, no marketing copy, no FAQ. The product pages do the
   selling. */
export default function DemosPage() {
  const slotdesk = getProduct('slotdesk-ai')!;
  const aonomy = getProduct('aonomy')!;
  const logins = known(site.demo.logins);

  return (
    <>
      <Container>
        <div className="py-16 md:py-24">
          <div className="rule">
            <span className="eyebrow label">Demos</span>
          </div>
          <Display as="h1" className="mt-8 max-w-[18ch]">
            Everything running, before you spend anything.
          </Display>
          <Lead className="mt-6">
            These open on other hosts, in a new tab. Nothing here needs an account.
          </Lead>
        </div>
      </Container>

      <Section index="01" label="SlotDesk AI">
        <div className="grid gap-8 lg:grid-cols-2">
          <ImageSlot caption="SlotDesk dashboard · screenshot pending" ratio="16 / 10" />
          <div>
            <Heading as="h2">The full app, with data already in it.</Heading>
            <Lead className="mt-4">{slotdesk.pitch}</Lead>

            {/* Credentials inline, so a buyer sees the logins before deciding
                to click. Never real credentials. */}
            <div className="mt-8 border border-line-strong">
              <p className="label border-b border-line-strong px-4 py-3">Sign in as</p>
              {logins ? (
                <ul>
                  {logins.map((l) => (
                    <li key={l.role} className="border-b border-line px-4 py-3 last:border-b-0">
                      <p className="label">{l.role}</p>
                      <p className="mt-1 font-mono text-sm">{l.email}</p>
                      <p className="font-mono text-sm">{l.password}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-6 text-muted">
                  The demo instance is not up yet, so there are no logins to publish. They will
                  appear here rather than by email.
                </p>
              )}
            </div>

            {!isPending(site.demo.resetNote) ? (
              <p className="mt-4 text-sm text-muted">{site.demo.resetNote}</p>
            ) : null}

            <div className="mt-8">
              {isPending(site.demo.url) ? (
                <PendingAction>Demo instance not up yet</PendingAction>
              ) : (
                <Button href={site.demo.url} external>
                  Open the live demo
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section index="02" label="Aonomy">
        <Heading as="h2">Eight variants of the same template.</Heading>
        <Lead className="mt-4">
          Each one opens its own demo. They ship together in the download.
        </Lead>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aonomy.variants.map((v, i) => (
            <li key={v.name} className="border border-line-strong">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.thumbnail}
                alt={`Aonomy ${v.name} variant`}
                width={800}
                height={377}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="aspect-[800/377] w-full object-cover"
              />
              <div className="flex items-center justify-between gap-2 border-t border-line-strong p-3">
                <span className="text-sm">{v.name}</span>
                {isPending(aonomy.demoUrl) ? (
                  <span className="label">soon</span>
                ) : (
                  <ExternalLink href={`${aonomy.demoUrl}/${v.file}`} className="label">
                    Open
                  </ExternalLink>
                )}
              </div>
            </li>
          ))}
        </ul>

        {!isPending(aonomy.docsUrl) ? (
          <p className="mt-8">
            {/* Internal docs path: a normal link, not a new tab. */}
            {aonomy.docsUrl.startsWith('/') ? (
              <ArrowLink href={aonomy.docsUrl}>Documentation</ArrowLink>
            ) : (
              <ExternalLink href={aonomy.docsUrl}>Documentation</ExternalLink>
            )}
          </p>
        ) : null}
      </Section>
    </>
  );
}

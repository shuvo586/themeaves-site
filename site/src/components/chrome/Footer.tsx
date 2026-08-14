import Link from 'next/link';
import type { Route } from 'next';
import { Lockup } from '@/components/brand/Lockup';
import { Container, ExternalLink } from '@/components/ui/primitives';
import { site } from '@/data/site';
import { products } from '@/data/products';

/* Four groups: brand, Products, Resources, Company. The brand block carries a
   positioning line, not a tenure line: no founding year, no "since", no
   years-of-experience figure anywhere in here (brief section 2.1).

   A group only lists routes that exist. A footer link to an empty page costs
   more trust than the missing link does. */

/* Only routes that exist are listed, and `typedRoutes` in next.config makes
   that a compile error rather than a discipline. Still to come, each blocked
   on content rather than on design:
     /docs and /changelog   need SlotDesk to be listed
     /about                 needs a real name and handle
     /terms /privacy /refunds  legal text, to be written not generated */
type FooterLink = { label: string; href: Route; live: boolean };

const RESOURCES: FooterLink[] = [
  { label: 'Demos', href: '/demos', live: true },
  { label: 'Which licence do I need', href: '/license', live: true },
];

const COMPANY: FooterLink[] = [
  { label: 'Support', href: '/support', live: true },
  { label: 'Check my licence', href: '/licenses', live: true },
];

/* Measured off the prototype footer rather than set in round numbers: an 11px
   mono column head, then links on the shared .navlist rhythm. */
function Group({ title, links }: { title: string; links: FooterLink[] }) {
  const live = links.filter((l) => l.live);
  if (!live.length) return null;

  return (
    <div>
      <h2 className="label label-sm">{title}</h2>
      <ul className="navlist">
        {live.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[14px] text-muted underline-offset-4 hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    /* The prototype closes on the page colour with a hairline above it, not on
       a white plane. Rendered on --color-surface it read as a fifth band and
       the document never ended. Padding is its 48 / 48 / 40. */
    <footer className="border-t border-line bg-bg">
      <Container>
        <div className="pt-12 pb-10">
          {/* The tick rail. A measurement scale opening the footer, which is
              the prototype's way of closing the document rather than the
              page: 8px of ticks on a 24px pitch. */}
          <div className="ticks mb-8" aria-hidden />

          {/* 1.6fr for the brand column against three equal link columns. Four
              equal columns left the positioning line breaking at 20 characters
              and the three link lists floating in space. */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              {/* The same full mark as the header, so the document opens and
                  closes on the same drawing. */}
              <Lockup asLink={false} variant="detail" colour />
              <p className="mt-[14px] max-w-[34ch] text-[14px] leading-[1.6] text-muted">
                {site.positioning}
              </p>
            </div>

            <div>
              <h2 className="label label-sm">Products</h2>
              <ul className="navlist">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-[14px] text-muted underline-offset-4 hover:underline"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Group title="Resources" links={RESOURCES} />
            <Group title="Company" links={COMPANY} />
          </div>

          {/* The Envato trademark line is required by brief section 2.2 and the
              prototype has no slot for it, so it sits above the closing bar
              rather than inside it, leaving that bar exactly as drawn. */}
          <p className="mt-10 max-w-[var(--measure)] text-[13px] leading-[1.6] text-muted">
            {site.attribution} Items are sold on{' '}
            <ExternalLink href={site.marketplaces.codecanyon.url}>
              {site.marketplaces.codecanyon.name}
            </ExternalLink>{' '}
            and{' '}
            <ExternalLink href={site.marketplaces.themeforest.url}>
              {site.marketplaces.themeforest.name}
            </ExternalLink>
            .
          </p>

          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-[18px]">
            <p className="label label-sm tracking-[0.06em]">
              <span className="tabular">© {new Date().getFullYear()}</span> {site.name} · All rights
              reserved
            </p>
            <p className="label label-sm tracking-[0.06em]">PHP / Laravel / MySQL · Self-hosted</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

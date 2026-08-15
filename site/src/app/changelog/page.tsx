import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLink, Container, Display, Lead } from '@/components/ui/primitives';
import { NoReleases, ReleaseEntry } from '@/components/changelog/ReleaseEntry';
import { releasesOf } from '@/data/changelog';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Every ThemeAves release, dated and on the record: Aonomy on ThemeForest, SlotDesk on CodeCanyon.',
};

/* Built to _dev/handoff/directions-preference/project/ThemeAves Changelog.dc.html
   with two corrections, both from the brief rather than preference:

   1. The prototype records five SlotDesk releases (v1.0.0 through v1.4.0).
      SlotDesk is not listed on CodeCanyon, so those are placeholder fiction
      and none of them render. Its group says so in words instead.
   2. The prototype filters by FEATURE / FIX / SECURITY, which with three
      released Aonomy versions would be dead buttons. Per the products index
      rule, only facets with matches render, so there are no filter chips on
      the index at all; the kind chip on each entry stays, and /changelog/<slug>
      carries the live subset of the filter row.

   Each product rail links to its own timeline at /changelog/<slug>, which is
   the prototype's layout applied to a single product.

   The version column is the one sanctioned place for mono above 400, and the
   entry rows are the one place the prototypes put a mono <b>; see tokens.css
   section 5. */

export default function ChangelogPage() {
  const withReleases = products.filter((p) => releasesOf(p).length > 0);
  const releaseCount = withReleases.reduce((n, p) => n + releasesOf(p).length, 0);

  return (
    <>
      <Container>
        <div className="pt-14 pb-10">
          <div className="rail">
            <span className="eyebrow label">Changelog</span>
            <span className="label ms-auto text-muted">
              <span className="tabular">{withReleases.length}</span> product
              {withReleases.length === 1 ? '' : 's'} with releases ·{' '}
              <span className="tabular">{releaseCount}</span> on the record
            </span>
          </div>
          <Display as="h1" className="mt-[18px] max-w-[20ch]">
            Every release is dated and on the record.
          </Display>
          <Lead className="mt-5">
            Nothing ships silently. Each release carries a date, a version and a line on exactly
            what moved, so you always know what you are running.
          </Lead>
        </div>
      </Container>

      <section className="border-y border-line bg-surface">
        <Container>
          {products.map((product) => {
            const releases = releasesOf(product);
            const latest = releases[0];

            return (
              <div
                key={product.slug}
                className={releases.length > 0 ? 'pb-6' : 'pb-14'}
              >
                <div className="rail">
                  <Link
                    href={`/changelog/${product.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    Changelog · {product.name}
                  </Link>
                  <span>
                    {releases.length > 0
                      ? `${releases.length} releases · last ${latest.date}`
                      : 'Not released yet'}
                  </span>
                </div>

                {releases.length > 0 ? (
                  <ul className="pt-2">
                    {releases.map((release) => (
                      <ReleaseEntry key={release.version} release={release} />
                    ))}
                  </ul>
                ) : (
                  <NoReleases product={product} />
                )}
              </div>
            );
          })}
        </Container>
      </section>

      {/* The closing plane. The prototype's own CTA promised "Get SlotDesk AI,
          $59", which is an invented price for an unreleased item, so the band
          keeps its claim and points at the catalogue instead. */}
      <section data-on-accent className="bg-accent-plane text-on-accent">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-10 py-16">
            <div>
              <p className="eyebrow label text-on-accent tracking-[0.14em]">Stay current</p>
              <h2 className="mt-3.5 max-w-[22ch] font-display text-[36px] leading-[1.08] font-extrabold tracking-[-0.02em] max-sm:text-[28px]">
                Own the licence, get every documented update.
              </h2>
            </div>
            <ArrowLink href="/products" className="btn btn-ink">
              See the products
            </ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}
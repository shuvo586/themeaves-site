import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLink, Container, Rail } from '@/components/ui/primitives';
import { releasesOf } from '@/data/changelog';
import { getProduct, products } from '@/data/products';
import { ChangelogEntries } from '../ChangelogEntries';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} changelog`,
    description: `Every ${product.name} release, dated and on the record.`,
  };
}

/* One product's timeline, drawn off the handoff Changelog prototype exactly:
   the "CHANGELOG · PRODUCT" rail, the ON THE RECORD eyebrow, the display
   claim, the filter row, then the surface band of dated entries and the
   closing accent plane. The prototype's five SlotDesk entries are placeholder
   fiction and none of them render here; an unlisted product gets the same
   "No releases to date" panel the index gives it. */

export default async function ChangelogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const releases = releasesOf(product);

  return (
    <>
      <Container>
        <div className="pt-6">
          <Rail
            left={`Changelog · ${product.name}`}
            right={
              releases.length > 0
                ? `${releases.length} releases · last ${releases[0].date}`
                : 'Nothing recorded yet'
            }
          />
        </div>
        <div className="pt-14 pb-10">
          <p className="label text-accent tracking-[0.14em]">On the record</p>
          <h1 className="mt-[18px] max-w-[20ch] font-display text-[length:var(--text-display)] leading-[1.04] font-extrabold tracking-[-0.025em]">
            Every release is dated and on the record.
          </h1>
          <p className="mt-5 max-w-[56ch] text-[18px] leading-[1.6] text-muted">
            Nothing ships silently. Each {product.name} release carries a date, a version and a
            line on exactly what moved, so you always know what you are running.
          </p>
        </div>
      </Container>

      {/* useSearchParams needs a Suspense boundary for static rendering. */}
      <Suspense fallback={<div className="border-y border-line bg-surface py-12" />}>
        <ChangelogEntries product={product} releases={releases} />
      </Suspense>

      {/* The closing plane, kept from the prototype's own band: the claim
          survives, the "Get SlotDesk AI, $59" button does not, because that
          price and that listing do not exist yet. The action points at the
          product's own page instead. */}
      <section data-on-accent className="bg-accent-plane text-on-accent">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-10 py-16">
            <div>
              <p className="eyebrow label text-on-accent tracking-[0.14em]">Stay current</p>
              <h2 className="mt-3.5 max-w-[22ch] font-display text-[36px] leading-[1.08] font-extrabold tracking-[-0.02em] max-sm:text-[28px]">
                Own the licence, get every documented update.
              </h2>
            </div>
            <ArrowLink href={`/products/${product.slug}`} className="btn btn-ink">
              See {product.name}
            </ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}
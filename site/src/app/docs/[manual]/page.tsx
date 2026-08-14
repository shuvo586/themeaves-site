import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { DocClose } from '@/components/docs/DocClose';
import { DocShell } from '@/components/docs/DocShell';
import { Container } from '@/components/ui/primitives';
import { getManual, manuals, publishedCount } from '@/data/docs';
import { getProduct } from '@/data/products';
import { known } from '@/data/site';

type Params = { manual: string };

export function generateStaticParams(): Params[] {
  return manuals.map((m) => ({ manual: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { manual: slug } = await params;
  const manual = getManual(slug);
  if (!manual) return {};

  return {
    title: `${manual.title} documentation`,
    description: manual.lead,
  };
}

/* The contents page. Built to the handoff Docs prototype's opener: crumb rail
   with the version at the end, accent eyebrow, display heading, then the band.
   The chapter list is the body rather than a single long article, because a
   sixteen-chapter manual on one page is one very long scroll. */
export default async function ManualPage({ params }: { params: Promise<Params> }) {
  const { manual: slug } = await params;
  const manual = getManual(slug);
  if (!manual) notFound();

  const product = getProduct(manual.productSlug);
  const version = product ? known(product.version) : undefined;
  const { written, total } = publishedCount(manual);

  return (
    <div className={`theme-${manual.slug}`}>
      <Container>
        <div className="rail" style={{ paddingBlock: '14px 6px' }}>
          <span>Documentation · {manual.title}</span>
          <span>{version ? `v${version}` : 'version not announced'}</span>
        </div>

        <div className="max-w-[760px] pt-14 pb-11">
          <p className="eyebrow label text-accent">Setup and usage</p>
          <h1 className="mt-[18px] font-display text-[length:var(--text-display)] leading-[1.05] font-extrabold tracking-[-0.025em]">
            Everything needed to run {manual.title}.
          </h1>
          <p className="mt-5 max-w-[56ch] text-[18px] leading-[1.6] text-muted">{manual.lead}</p>
          <p className="label mt-8 border-t border-line pt-3.5 tracking-[0.06em]">
            <span className="tabular">
              {written} of {total}
            </span>{' '}
            {/* The trailing clause has to go once nothing is outstanding, or a
                finished manual advertises chapters that do not exist. */}
            chapters published
            {written < total ? ' · the rest are listed and being written' : ' · the manual is complete'}
          </p>
        </div>
      </Container>

      <DocShell manual={manual}>
        {manual.parts.map((part, i) => (
          <section key={part.title} className={i === 0 ? '' : 'mt-12 border-t border-line pt-11'}>
            <p className="label text-accent tracking-[0.1em]">
              {String(i + 1).padStart(2, '0')} · {part.title}
            </p>
            <p className="mt-3 max-w-[52ch] text-[16px] leading-[1.62] text-muted">{part.blurb}</p>

            <ul className="mt-6 border-t border-line">
              {part.chapters.map((c) => (
                <li
                  key={c.slug}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line py-4"
                >
                  <span className="min-w-0 flex-1">
                    {c.published ? (
                      <Link
                        href={`/docs/${manual.slug}/${c.slug}` as Route}
                        className="font-display text-[17px] font-bold tracking-[-0.01em] text-ink no-underline hover:underline"
                      >
                        {c.title}
                      </Link>
                    ) : (
                      <span className="font-display text-[17px] font-bold tracking-[-0.01em] text-muted">
                        {c.title}
                      </span>
                    )}
                    <span className="mt-1 block text-[14.5px] leading-[1.55] text-muted">
                      {c.summary}
                    </span>
                  </span>
                  {!c.published ? <span className="label label-sm shrink-0">Being written</span> : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </DocShell>

      <DocClose />
    </div>
  );
}

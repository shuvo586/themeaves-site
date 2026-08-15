import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { DocClose } from '@/components/docs/DocClose';
import { ArrowLink, Container, Display, Lead } from '@/components/ui/primitives';
import { chaptersOf, manuals, publishedCount } from '@/data/docs';
import { TYPE_LABEL, products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'Setup and operation manuals for ThemeAves products. Public, with no login required.',
};

/* The documentation index: one row per product, linking the manual where one
   exists and saying so plainly where one does not.

   It replaced the handoff prototype's own `/docs`, which was a single-product
   demo page carrying invented requirements (PHP 8.1, four extensions, a
   console install for a product that ships a browser wizard) and a webhook
   path that was never real. Every one of those contradicted the SlotDesk
   manual sitting one click away, so the page is now built from `docs.ts` and
   `products.ts` instead of from copy. Nothing here is typed twice. */

export default function DocsPage() {
  const manualFor = (productSlug: string) => manuals.find((m) => m.productSlug === productSlug);
  const written = manuals.length;

  return (
    <>
      <Container>
        <div className="py-16 md:py-24">
          <div className="rail">
            <span className="eyebrow label">Documentation</span>
            <span className="label ms-auto text-muted">
              <span className="tabular">{products.length}</span> products ·{' '}
              <span className="tabular">{written}</span> {written === 1 ? 'manual' : 'manuals'}
            </span>
          </div>
          <Display as="h1" className="mt-8 max-w-[20ch]">
            Everything needed to run what you bought.
          </Display>
          <Lead className="mt-6">
            One manual per product, written against the running application rather than the sales
            page, and public with no login required.
          </Lead>
        </div>
      </Container>

      <section className="border-y border-line bg-surface">
        <Container>
          <ul>
            {products.map((product) => {
              const manual = manualFor(product.slug);
              const counts = manual ? publishedCount(manual) : undefined;
              const first = manual
                ? chaptersOf(manual).find(({ chapter }) => chapter.published)?.chapter
                : undefined;

              return (
                <li
                  key={product.slug}
                  className="border-t border-line py-12 first:border-t-0 first:pt-14 md:py-14"
                >
                  {/* One meta line, not two labels side by side: two of them
                      with a gap between read as a single run-on string. */}
                  <p className="label label-sm">
                    {TYPE_LABEL[product.type]} · {product.marketplace} ·{' '}
                    {counts ? (
                      <span className="text-muted">
                        <span className="tabular">
                          {counts.written} of {counts.total}
                        </span>{' '}
                        chapters
                      </span>
                    ) : (
                      <span className="text-muted">No manual yet</span>
                    )}
                  </p>

                  {/* The manual's own title is the heading when there is one:
                      the product is the thing you bought, the manual is the
                      thing you are here to read. */}
                  <h2 className="mt-3 font-display text-[1.625rem] leading-[1.15] font-bold tracking-[-0.01em]">
                    {manual ? (
                      <Link
                        href={`/docs/${manual.slug}` as Route}
                        className="text-ink no-underline hover:underline"
                      >
                        {product.name}
                      </Link>
                    ) : (
                      product.name
                    )}
                  </h2>

                  <p className="mt-3 max-w-[62ch] text-[17px] leading-[1.6] text-muted">
                    {manual ? manual.lead : product.pitch}
                  </p>

                  {manual ? (
                    <>
                      <ol className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                        {manual.parts.map((part, i) => (
                          <li key={part.title} className="flex gap-3 text-[15px]">
                            <span className="label label-sm shrink-0 pt-[3px] text-muted tabular">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span>
                              <span className="block">{part.title}</span>
                              <span className="block text-[13.5px] text-muted">
                                {part.chapters.length} chapters
                              </span>
                            </span>
                          </li>
                        ))}
                      </ol>

                      <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
                        <ArrowLink href={`/docs/${manual.slug}`} className="text-accent">
                          Read the {product.name} manual
                        </ArrowLink>
                        {first ? (
                          <ArrowLink href={`/docs/${manual.slug}/${first.slug}`}>
                            Start at {first.title}
                          </ArrowLink>
                        ) : null}
                        <ArrowLink href={`/products/${product.slug}`}>Product page</ArrowLink>
                      </p>
                    </>
                  ) : (
                    <p className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
                      <ArrowLink href={`/products/${product.slug}`}>Product page</ArrowLink>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <DocClose />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLink,
  BrowserFrame,
  Button,
  Container,
  Display,
  ExternalLink,
  Heading,
  ImageSlot,
  Lead,
  PendingAction,
  Price,
  Section,
  Tag,
} from '@/components/ui/primitives';
import { getProduct, products, TYPE_LABEL } from '@/data/products';
import { isPending, site } from '@/data/site';

const MARKETPLACE = { codecanyon: 'CodeCanyon', themeforest: 'ThemeForest' } as const;

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
  return { title: product.name, description: product.pitch };
}

/* One template, driven by two frontmatter fields.
   `presentation` decides how much page an item gets. A demo-depth item must
   read as a deliberately short page, not a full page with holes, which means
   fewer and larger sections rather than the same sections half filled.
   `type` reorders and adds the one section that varies. */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug);
  const hasDemo = !isPending(product.demoUrl);
  const hasItem = !isPending(product.itemUrl);

  return (
    <>
      {/* Hero ------------------------------------------------------------- */}
      <Container>
        <div className="py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="label">
            <Link href="/products" className="underline-offset-4 hover:underline">
              Products
            </Link>
            <span aria-hidden> / </span>
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap gap-2">
                <Tag>{MARKETPLACE[product.marketplace]}</Tag>
                <Tag>{TYPE_LABEL[product.type]}</Tag>
                <Tag>{product.category}</Tag>
              </div>
              <Display as="h1" className="mt-6">
                {product.name}
              </Display>
              <Lead className="mt-6">{product.pitch}</Lead>

              {/* Facts that age well and prove maintenance. A demo-depth item
                  trims these: tooling and section count, not version and last
                  updated. A stale "last updated" is the signal to avoid, and
                  there is no version story without a changelog. */}
              <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-line py-4 sm:grid-cols-3">
                {product.presentation === 'demo' ? (
                  <>
                    <Fact term="Built with" value={product.tooling.slice(0, 2).join(', ')} />
                    <Fact term="Sections" value={String(product.sections.length)} />
                    <Fact term="Demos" value={String(product.variants.length)} />
                  </>
                ) : (
                  <>
                    <Fact term="Version" value={isPending(product.version) ? null : product.version} />
                    <Fact term="Licence" value="Regular or Extended" />
                    <Fact term="Stack" value={product.tooling.join(', ')} />
                  </>
                )}
              </dl>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {/* Wherever a live demo exists it is the primary action and
                    the buy button is secondary. Nobody buys a script they
                    have not seen running. */}
                {hasDemo ? (
                  <Button href={product.demoUrl as string} external>
                    {product.presentation === 'demo' ? 'View the live demo' : 'Try the live demo'}
                  </Button>
                ) : (
                  <PendingAction>Live demo not published yet</PendingAction>
                )}

                {/* The buy button is secondary only where a demo exists to be
                    primary. With no demo it is the only action on the page, so
                    demoting it would leave the hero with no primary at all. */}
                {hasItem ? (
                  <Button
                    href={product.itemUrl as string}
                    variant={hasDemo ? 'outline' : 'ink'}
                    external
                  >
                    Get {product.name} on {MARKETPLACE[product.marketplace]}
                  </Button>
                ) : (
                  <PendingAction>Not listed on {MARKETPLACE[product.marketplace]} yet</PendingAction>
                )}

                <span className="ms-1">
                  <Price value={product.price} currency={product.currency} />
                </span>
              </div>

              {!isPending(product.docsUrl) ? (
                <p className="mt-4">
                  {/* The docs live on this site, so an internal path is a
                      normal link; only an off-site URL opens a new tab. */}
                  {product.docsUrl.startsWith('/') ? (
                    <ArrowLink href={product.docsUrl} className="text-accent">
                      Documentation
                    </ArrowLink>
                  ) : (
                    <ExternalLink href={product.docsUrl}>Documentation</ExternalLink>
                  )}
                </p>
              ) : null}
            </div>

            <div className="lg:col-span-6">
              <BrowserFrame
                url={isPending(product.demoUrl) ? undefined : product.demoUrl}
                caption={`${product.name} · screenshot pending`}
                image={
                  !isPending(product.heroImage)
                    ? {
                        src: product.heroImage as string,
                        alt:
                          product.slug === 'slotdesk'
                            ? 'The SlotDesk dashboard: today\'s appointments, estimated WhatsApp cost for the month, AI bookings this week, and a list of items needing attention.'
                            : `The ${product.name} item banner.`,
                      }
                    : undefined
                }
                sizes="(max-width: 1023px) 100vw, 568px"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* The centrepiece of a demo-depth page ----------------------------- */}
      {product.presentation === 'demo' && product.variants.length > 0 ? (
        <Section index="01" label="Every variant">
          <Heading as="h2">
            {product.variants.length} background treatments, one template.
          </Heading>
          <Lead className="mt-4">
            Each one is the same page with a different hero. They ship together in the download.
          </Lead>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.variants.map((v, i) => (
              <li key={v.name} className="border border-line-strong">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.thumbnail}
                  alt={`${product.name} ${v.name} variant`}
                  width={800}
                  height={377}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="aspect-[800/377] w-full object-cover"
                />
                <div className="flex items-center justify-between gap-2 border-t border-line-strong p-3">
                  <span className="text-sm">{v.name}</span>
                  {hasDemo ? (
                    <ExternalLink href={`${product.demoUrl}/${v.file}`} className="label">
                      Open
                    </ExternalLink>
                  ) : (
                    <span className="label">soon</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Page inventory. The sections are what a buyer is shopping for. --- */}
      {product.presentation === 'demo' && product.sections.length > 0 ? (
        <Section index="02" label="What is in it">
          <Heading as="h2">{product.sections.length} composable sections.</Heading>
          <Lead className="mt-4">
            Delete the ones you do not need. Nothing depends on the section above it.
          </Lead>
          <ul className="mt-8 flex flex-wrap gap-2">
            {product.sections.map((s) => (
              <li key={s}>
                <Tag>{s}</Tag>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Facts strip ------------------------------------------------------ */}
      <Section index={product.presentation === 'demo' ? '03' : '01'} label="The specifics">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <Row term="Built with" value={product.tooling.join(', ')} />
              <Row term="Marketplace" value={MARKETPLACE[product.marketplace]} />
              <Row term="Category" value={product.category} />
              <Row term="Licence" value="Envato Regular or Extended" />
              <Row term="Support" value={site.support.includedTerm} />
              <Row
                term="Browsers"
                value="Current versions of Chrome, Firefox, Safari and Edge"
              />
            </tbody>
          </table>
        </div>
      </Section>

      {/* Where to get it -------------------------------------------------- */}
      <Section index={product.presentation === 'demo' ? '04' : '02'} label="Where to get it">
        <Heading as="h2">
          {hasItem ? `Buy it on ${MARKETPLACE[product.marketplace]}.` : 'Not on sale yet.'}
        </Heading>
        <Lead className="mt-4">
          {hasItem
            ? 'The item page carries the reviews, the full description and the licence you are buying. This page feeds it rather than replacing it.'
            : `${product.name} has not been listed yet, so there is no price and no purchase link. Nothing here is a pre-order.`}
        </Lead>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {hasItem ? (
            <Button href={product.itemUrl as string} external>
              Get {product.name} on {MARKETPLACE[product.marketplace]}
            </Button>
          ) : (
            <PendingAction>Listing pending</PendingAction>
          )}
          <Price value={product.price} currency={product.currency} />
        </div>
      </Section>

      {/* Related. Never dead-end a visitor. ------------------------------- */}
      {related.length > 0 ? (
        <Section index={product.presentation === 'demo' ? '05' : '03'} label="Also here">
          <ul className="grid gap-6 md:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex flex-col border border-line-strong p-6 text-ink no-underline"
                >
                  <div className="flex flex-wrap gap-2">
                    <Tag>{MARKETPLACE[p.marketplace]}</Tag>
                    <Tag>{TYPE_LABEL[p.type]}</Tag>
                  </div>
                  <Heading className="mt-4">{p.name}</Heading>
                  <p className="mt-2 text-muted">{p.pitch}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}

function Fact({ term, value }: { term: string; value: string | null }) {
  return (
    <div>
      <dt className="label">{term}</dt>
      <dd className={`mt-1 text-sm ${value ? 'tabular' : 'text-muted'}`}>
        {value ?? 'not announced'}
      </dd>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <tr>
      <th scope="row" className="label border-b border-line py-3 pe-6 text-start align-top">
        {term}
      </th>
      <td className="border-b border-line py-3">{value}</td>
    </tr>
  );
}

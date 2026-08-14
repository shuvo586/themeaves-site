'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Route } from 'next';
import { ImageSlot, Price, Tag, Heading } from '@/components/ui/primitives';
import { products, TYPE_LABEL, type Product } from '@/data/products';
import { isPending } from '@/data/site';

/* Two-axis faceting as client state with URL search-param sync, so a filtered
   view is linkable and survives a reload.

   Only facets with matches are rendered. With two products a full matrix of
   marketplaces crossed with three types would show four dead buttons, which
   makes the catalogue look emptier than it is. */

const MARKETPLACE_LABEL = { codecanyon: 'CodeCanyon', themeforest: 'ThemeForest' } as const;

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

export function ProductsIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const marketplace = params.get('marketplace') ?? 'all';
  const type = params.get('type') ?? 'all';

  const marketplaces = useMemo(() => unique(products.map((p) => p.marketplace)), []);
  const types = useMemo(() => unique(products.map((p) => p.type)), []);

  const results = products.filter(
    (p) =>
      (marketplace === 'all' || p.marketplace === marketplace) &&
      (type === 'all' || p.type === type),
  );

  function setFacet(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === 'all') next.delete(key);
    else next.set(key, value);
    const query = next.toString();
    /* pathname is always /products here, but useRouter types it as a plain
       string, so the cast is at the boundary rather than sprinkled around. */
    router.replace((query ? `${pathname}?${query}` : pathname) as Route, { scroll: false });
  }

  const clear = () => router.replace(pathname as Route, { scroll: false });

  const filtered = marketplace !== 'all' || type !== 'all';

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-line py-4">
        <FacetGroup
          legend="Marketplace"
          value={marketplace}
          options={marketplaces.map((m) => [m, MARKETPLACE_LABEL[m]] as const)}
          onChange={(v) => setFacet('marketplace', v)}
        />
        {types.length > 1 ? (
          <FacetGroup
            legend="Type"
            value={type}
            options={types.map((t) => [t, TYPE_LABEL[t]] as const)}
            onChange={(v) => setFacet('type', v)}
          />
        ) : null}
        <p className="label ms-auto tabular">
          {results.length} of {products.length}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="mt-12 border border-dashed border-line-strong p-12">
          <p className="font-display text-[1.25rem] font-bold">
            Nothing matches those two filters together.
          </p>
          <button
            type="button"
            onClick={clear}
            className="btn btn-outline mt-6"
          >
            Clear the filters
          </button>
        </div>
      ) : (
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {results.map((p) => (
            <li key={p.slug} className="contents">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}

      {filtered ? (
        <button
          type="button"
          onClick={clear}
          className="label mt-8 underline underline-offset-4"
        >
          Clear the filters
        </button>
      ) : null}
    </>
  );
}

function FacetGroup({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: string;
  options: readonly (readonly [string, string])[];
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="label float-start me-3">{legend}</legend>
      {[['all', 'All'] as const, ...options].map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={`label rounded-[var(--radius)] border px-3 py-2 ${
            value === v ? 'border-ink bg-ink text-bg' : 'border-line-strong text-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </fieldset>
  );
}

/** The whole card is one link. Must read correctly at 2 items and at 12. */
export function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group flex flex-col border border-line-strong text-ink no-underline"
    >
      {p.thumbnail && !isPending(p.thumbnail) ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={p.thumbnail}
          alt={`${p.name} preview`}
          width={800}
          height={377}
          className="aspect-[800/377] w-full object-cover"
        />
      ) : (
        <ImageSlot
          caption={`${p.name} · screenshot pending`}
          ratio="800 / 377"
          className="border-0 border-b"
        />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          <Tag>{MARKETPLACE_LABEL[p.marketplace]}</Tag>
          <Tag>{TYPE_LABEL[p.type]}</Tag>
        </div>
        <Heading className="mt-4">{p.name}</Heading>
        <p className="mt-2 flex-1 text-muted">{p.pitch}</p>
        <p className="mt-6 flex items-center justify-between">
          <Price value={p.price} currency={p.currency} />
          <span className="label group-hover:underline">View the product</span>
        </p>
      </div>
    </Link>
  );
}

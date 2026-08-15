'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Route } from 'next';
import { Container } from '@/components/ui/primitives';
import {
  KIND_LABEL,
  NoReleases,
  ReleaseEntry,
} from '@/components/changelog/ReleaseEntry';
import type { Release } from '@/data/changelog';
import type { Product } from '@/data/products';

/* The handoff prototype's filter row, carried over with the products index
   rule: only chips with matches render, so with three released Aonomy
   versions there is no FIX chip and no SECURITY chip to click. The chip set
   is the prototype's own (ALL / FEATURE / FIX / SECURITY); RELEASE is a
   first-release marker there, never a filter, so it never gets a chip.

   The right end of the row carried "SUBSCRIBE TO RSS" in the prototype.
   There is no feed to subscribe to yet, and a label that promises one is a
   lie, so it is the live count instead, which is what the products index
   puts at the end of its own facet row. */

const CHIP_ORDER = ['feature', 'fix', 'security'] as const;

export function ChangelogEntries({
  product,
  releases,
}: {
  product: Product;
  releases: Release[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const kind = params.get('kind') ?? 'all';

  const chips = useMemo(
    () => CHIP_ORDER.filter((k) => releases.some((r) => r.kind === k)),
    [releases],
  );

  const visible = kind === 'all' ? releases : releases.filter((r) => r.kind === kind);

  function setKind(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value === 'all') next.delete('kind');
    else next.set('kind', value);
    const query = next.toString();
    router.replace((query ? `${pathname}?${query}` : pathname) as Route, { scroll: false });
  }

  if (releases.length === 0) {
    return (
      <section className="border-y border-line bg-surface">
        <Container>
          <div className="pb-6">
            <NoReleases product={product} />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <Container>
        <div className="flex flex-wrap items-center gap-3 pb-10">
          {[['all', 'All'] as const, ...chips.map((k) => [k, KIND_LABEL[k]] as const)].map(
            ([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setKind(value)}
                aria-pressed={kind === value}
                className={`label rounded-[var(--radius)] border px-3 py-[7px] ${
                  kind === value ? 'border-ink bg-ink text-bg' : 'border-line-strong text-ink'
                }`}
              >
                {label}
              </button>
            ),
          )}
          <p className="label ms-auto tabular">
            {visible.length} of {releases.length}
          </p>
        </div>
      </Container>

      <section className="border-y border-line bg-surface">
        <Container className="pb-6">
          {visible.length > 0 ? (
            /* pt-2 plus the li's own first:pt-10 makes the 48px the
               prototype gives the first entry, measured from the band edge. */
            <ul className="flex flex-col pt-2">
              {visible.map((release) => (
                <ReleaseEntry key={release.version} release={release} />
              ))}
            </ul>
          ) : (
            /* Reachable only by hand-editing the ?kind= URL: every chip that
               renders has at least one match by construction. */
            <div className="mt-12 border border-dashed border-line-strong p-12">
              <p className="font-display text-[1.25rem] font-bold">
                Nothing recorded under that filter.
              </p>
              <button type="button" onClick={() => setKind('all')} className="btn btn-outline mt-6">
                Show all releases
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
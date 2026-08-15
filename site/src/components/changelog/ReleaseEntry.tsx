import { ArrowLink } from '@/components/ui/primitives';
import type { ChangeLine, Release } from '@/data/changelog';
import type { Product } from '@/data/products';

/* The changelog entry row, shared by /changelog and /changelog/<slug>, drawn
   off _dev/handoff/directions-preference/project/ThemeAves Changelog.dc.html:
   220px version column against the content, mono 26/600 version, mono 13 date,
   an 11px kind chip, and the change list as mono verb labels in a 74px column.

   The version column is the one sanctioned place for mono above 400 and the
   entry rows are the one place the prototypes put a mono <b>; see tokens.css
   section 5.

   The li carries the separator, padding and the first: variants, not the
   article. Each li holds exactly one article, so on the article every entry
   is its own :first-child and the first: gate would open for all of them. */

export const KIND_LABEL: Record<Release['kind'], string> = {
  feature: 'Feature',
  fix: 'Fix',
  security: 'Security',
  release: 'Release',
};

/* Same labels as the prototype's rows, plus UPD because "Updated Bootstrap
   4.1.1" is neither an addition nor a fix. Everything here is a label on a
   light ground, so all of them are muted except the accent ADD. */
export const CHANGE_LABEL: Record<ChangeLine['kind'], string> = {
  add: 'ADD',
  fix: 'FIX',
  sec: 'SEC',
  upd: 'UPD',
};

export function ReleaseEntry({ release }: { release: Release }) {
  return (
    <li className="border-t border-line-faint py-12 first:border-t-0 first:pt-10">
      <article className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
      <div>
        <p className="font-mono text-[26px] font-semibold tracking-[-0.01em] text-accent tabular">
          {release.version}
        </p>
        <p className="mt-2 font-mono text-[13px] text-muted tabular">
          <time dateTime={release.date}>{release.date}</time>
        </p>
        <span
          className={`label label-sm mt-3.5 inline-block border px-2 py-1 ${
            release.kind === 'release' ? 'border-ink text-ink' : 'border-accent text-accent'
          }`}
        >
          {KIND_LABEL[release.kind]}
        </span>
      </div>

      <div>
        <h3 className="max-w-[28ch] font-display text-[1.5rem] leading-[1.2] font-bold tracking-[-0.01em]">
          {release.title}
        </h3>
        {release.description ? (
          <p className="mt-3 max-w-[64ch] text-[16px] leading-[1.62] text-muted">
            {release.description}
          </p>
        ) : null}
        {release.changes.length > 0 ? (
          <ul className="mt-[18px] flex flex-col gap-2.5">
            {release.changes.map((change) => (
              <li
                key={change.text}
                className="grid grid-cols-[74px_1fr] gap-3.5 text-[15px] leading-[1.55]"
              >
                <span
                  className={`font-mono text-[12px] tabular ${
                    change.kind === 'add' ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {CHANGE_LABEL[change.kind]}
                </span>
                <span>{change.text}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      </article>
    </li>
  );
}

/** An empty changelog is a fact, not a defect: the item is not listed, so
 *  there are no versions and no dates. The same rule as every PENDING on the
 *  site: say so in words. */
export function NoReleases({ product }: { product: Product }) {
  return (
    <div className="mt-10 border border-line-strong p-8 md:p-12">
      <p className="label label-sm text-muted">Nothing recorded yet</p>
      <h2 className="mt-3 max-w-[24ch] font-display text-[1.5rem] leading-[1.2] font-bold tracking-[-0.01em]">
        No releases to date.
      </h2>
      <p className="mt-3 max-w-[56ch] text-[15.5px] leading-[1.6] text-muted">
        {product.name} is not listed on{' '}
        {product.marketplace === 'codecanyon' ? 'CodeCanyon' : 'ThemeForest'} yet, so there are no
        versions and no dates to record. The first release will be dated and listed here the day it
        ships.
      </p>
      <p className="mt-6 text-[15px]">
        <ArrowLink href={`/products/${product.slug}`}>{product.name} product page</ArrowLink>
      </p>
    </div>
  );
}
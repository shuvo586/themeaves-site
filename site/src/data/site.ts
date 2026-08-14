/**
 * Everything a page must not hardcode.
 *
 * Brief section 12 forbids inventing a number, a URL, a date or a response
 * window. Anything not yet known is PENDING, and PENDING renders as a visible
 * placeholder rather than a plausible guess. A wrong price in a public repo is
 * a wrong price a buyer can quote back at you.
 *
 * To go live: replace every PENDING in this file and in data/products.ts.
 * The outstanding list is the ❌ rows in ../../../docs/FACTS.md, and the
 * checklist is in ../../docs/RECIPES.md.
 */

export const PENDING = 'PENDING' as const;
export type Pending = typeof PENDING;
export type Maybe<T> = T | Pending;

export function isPending<T>(value: Maybe<T>): value is Pending {
  return value === PENDING;
}

/** Narrow a Maybe to its value, or undefined. Keeps JSX free of comparisons. */
export function known<T>(value: Maybe<T>): T | undefined {
  return value === PENDING ? undefined : value;
}

export const site = {
  name: 'ThemeAves',
  domain: 'themeaves.com',
  url: 'https://themeaves.com',

  /* Positioning, not tenure. Brief section 2.1 rule 1: no founding year, no
     "since", no years-of-experience figure, anywhere, including the footer. */
  positioning: "Web products on Envato's marketplaces, sold under a licence you keep.",

  /* Marketplace names appear as plain text links. No Envato logos, no badges,
     no layout implying partnership. Brief section 2.2. */
  marketplaces: {
    codecanyon: { name: 'CodeCanyon', url: 'https://codecanyon.net' },
    themeforest: { name: 'ThemeForest', url: 'https://themeforest.net' },
  },

  attribution:
    'Envato, CodeCanyon and ThemeForest are trademarks of Envato Pty Ltd. ThemeAves is an independent author and is not affiliated with Envato.',

  support: {
    /* Pre-sale destination. Stated in full and copyable, never obfuscated. */
    email: PENDING as Maybe<string>,
    timezone: PENDING as Maybe<string>,
    workingDays: PENDING as Maybe<string>,
    /* Under-promise. No 24/7, no same-day. Brief section 6.11. */
    responseWindow: PENDING as Maybe<string>,
    /* Item support goes to the Envato item's comments tab. */
    itemSupportNote:
      'Item support runs through the comments tab on the marketplace item, because that is where Envato records it.',
    includedTerm: 'Six months of support is included, per Envato item support terms.',
  },

  demo: {
    /* The SlotDesk demo instance. Brief section 9.5 and FACTS.md. */
    url: PENDING as Maybe<string>,
    resetNote: PENDING as Maybe<string>,
    simulatedSubsystems: PENDING as Maybe<string[]>,
    logins: PENDING as Maybe<{ role: string; email: string; password: string }[]>,
  },

  author: {
    name: PENDING as Maybe<string>,
    handle: PENDING as Maybe<string>,
  },
} as const;

/**
 * Nav derives from what exists. A route that has no content yet does not get a
 * nav slot, because a nav entry that leads to an empty page costs more trust
 * than the missing entry does. Flip `live` as each route lands.
 */
export const nav = [
  { label: 'Products', href: '/products', live: true },
  { label: 'Demos', href: '/demos', live: true },
  { label: 'Docs', href: '/docs', live: false },
  { label: 'Changelog', href: '/changelog', live: false },
  { label: 'Support', href: '/support', live: true },
] as const;

export const liveNav = nav.filter((item) => item.live);

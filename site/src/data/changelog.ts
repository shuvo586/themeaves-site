import type { Product } from './products';

/**
 * The changelog, one list per product, newest first.
 *
 * This is the data the handoff Changelog prototype was drawn against. The
 * prototype's own SlotDesk entries (v1.0.0 through v1.4.0, dated 2026-02-04
 * to 2026-07-28) are placeholder fiction: SlotDesk is not listed on
 * CodeCanyon, so there are no releases to record. Aonomy's three entries
 * are its real ThemeForest changelog, verbatim in fact and reworded only
 * into this site's sentence style.
 *
 * The one rule: an entry that is not real does not exist here. When SlotDesk
 * ships, its releases get appended with the version and date of the actual
 * item, and the page's empty state disappears on its own.
 */

export type ChangeKind = 'add' | 'fix' | 'sec' | 'upd';
export type ReleaseKind = 'feature' | 'fix' | 'security' | 'release';

export type ChangeLine = {
  kind: ChangeKind;
  /** A fragment, because the label is the verb: "ADD MailChimp subscription form." */
  text: string;
};

export type Release = {
  version: string;
  /** ISO. Rendered as-is in mono, matching the prototype's 2026-07-28. */
  date: string;
  kind: ReleaseKind;
  title: string;
  /** One or two sentences, a summary of the recorded changes, never a claim
   *  that is not in them. The handoff prototype draws a paragraph between the
   *  title and the change list, and this is it. */
  description: string;
  changes: ChangeLine[];
};

export const changelogs: Record<string, Release[]> = {
  aonomy: [
    {
      version: 'v1.2',
      date: '2018-06-04',
      kind: 'feature',
      title: 'Coming-soon, blog and single-post templates',
      description:
        'Seven coming-soon templates, seven blog layouts and three single-post pages ship in this release, on Bootstrap 4.1.1.',
      changes: [
        { kind: 'add', text: '7 new coming soon templates.' },
        { kind: 'add', text: '7 new blog page templates.' },
        { kind: 'add', text: '3 new blog single page templates.' },
        { kind: 'upd', text: 'Bootstrap updated to 4.1.1.' },
      ],
    },
    {
      version: 'v1.1',
      date: '2018-04-13',
      kind: 'feature',
      title: 'MailChimp subscription and contact form',
      description:
        'A MailChimp subscription form and a PHPMailer contact form are added, and the shipped CSS and JS files are fixed.',
      changes: [
        { kind: 'add', text: 'MailChimp subscription form.' },
        { kind: 'add', text: 'PHPMailer contact form.' },
        { kind: 'fix', text: 'CSS and JS files.' },
      ],
    },
    {
      version: 'v1.0',
      date: '2018-03-22',
      kind: 'release',
      title: 'Initial release',
      description: 'The first public release of Aonomy on ThemeForest.',
      changes: [],
    },
  ],

  /* Not listed yet, so nothing to record. Nothing goes in here until the
     item is on CodeCanyon and the version and date are real. */
  'slotdesk': [],
};

export function releasesOf(product: Product): Release[] {
  return changelogs[product.slug] ?? [];
}
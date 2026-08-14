import fs from 'node:fs';
import path from 'node:path';

/**
 * The documentation tree.
 *
 * Chapters are markdown in `content/docs/<product>/<slug>.md`, read at build
 * time. This registry is the order, the grouping and the publication state;
 * the prose lives in the files.
 *
 * The plan behind it, including which chapters exist and which figures each
 * still needs, is `../../../docs/SLOTDESK-DOCS-PLAN.md`.
 */

export type Chapter = {
  /** URL segment, and the markdown filename. */
  slug: string;
  title: string;
  /** Sidebar text. Shorter than the title. */
  nav: string;
  /** One line for the contents page. */
  summary: string;
  /**
   * Written and ready to read. A chapter that is planned but unwritten stays
   * listed on the contents page and is not linked, which is honest and stops
   * the nav growing before the prose does.
   */
  published: boolean;
};

export type Part = {
  title: string;
  /** The one-line reason this part exists, on the contents page. */
  blurb: string;
  chapters: Chapter[];
};

export type Manual = {
  /** URL segment. Deliberately shorter than the product slug. */
  slug: string;
  /** The product it documents, by `products.ts` slug. */
  productSlug: string;
  title: string;
  lead: string;
  parts: Part[];
};

const slotdesk: Manual = {
  slug: 'slotdesk',
  productSlug: 'slotdesk-ai',
  title: 'SlotDesk AI',
  lead: 'From server requirements to the first WhatsApp booking. Written against the running application, and public with no login required.',
  parts: [
    {
      title: 'Get it running',
      blurb: 'Install it and make the background work actually run.',
      chapters: [
        {
          slug: 'before-you-start',
          title: 'Before you start',
          nav: 'Before you start',
          summary: 'Server requirements, what to have ready, and the one hosting requirement that stops the product dead.',
          published: true,
        },
        {
          slug: 'install',
          title: 'Install',
          nav: 'Install',
          summary: 'The browser wizard, screen by screen, and what is still not working when it finishes.',
          published: true,
        },
        {
          slug: 'cron-and-queue',
          title: 'Cron and the queue worker',
          nav: 'Cron and the queue',
          summary: 'The two lines that make reminders, WhatsApp sends and AI replies actually happen.',
          published: true,
        },
        {
          slug: 'panels',
          title: 'First login and the two panels',
          nav: 'The two panels',
          summary: 'What /app is for, what /admin is for, and who should have each.',
          published: true,
        },
      ],
    },
    {
      title: 'Connect the outside world',
      blurb: 'WhatsApp, the AI provider and payments are all yours, and all connect here.',
      chapters: [
        {
          slug: 'whatsapp-cloud-api',
          title: 'WhatsApp Cloud API',
          nav: 'WhatsApp Cloud API',
          summary: 'The Meta app, tokens, the webhook and the verification handshake.',
          published: true,
        },
        {
          slug: 'templates-and-the-24-hour-window',
          title: 'Templates and the 24-hour window',
          nav: 'Templates and the window',
          summary: 'When you need an approved template, when you do not, and what Meta checks.',
          published: true,
        },
        {
          slug: 'ai-receptionist',
          title: 'The AI receptionist',
          nav: 'The AI receptionist',
          summary: 'Choosing a provider and model, the key, and what it is likely to cost.',
          published: true,
        },
        {
          slug: 'guardrails-and-knowledge',
          title: 'Guardrails and the knowledge base',
          nav: 'Guardrails and knowledge',
          summary: 'Keeping the receptionist on topic, and teaching it about your business.',
          published: true,
        },
        {
          slug: 'payments',
          title: 'Payments',
          nav: 'Payments',
          summary: 'Stripe, deposits, refunds and invoices, or running without payments at all.',
          published: true,
        },
      ],
    },
    {
      title: 'Describe the business',
      blurb: 'What you sell, who performs it, and the rules a booking has to satisfy.',
      chapters: [
        {
          slug: 'catalog',
          title: 'Locations, categories and services',
          nav: 'Catalog',
          summary: 'Durations, buffers and deposits, per service.',
          published: true,
        },
        {
          slug: 'staff-and-team',
          title: 'Staff and team members',
          nav: 'Staff and team',
          summary: 'Working hours, who performs what, and why a staff member is not a login.',
          published: true,
        },
        {
          slug: 'booking-rules',
          title: 'Booking rules',
          nav: 'Booking rules',
          summary: 'Minimum notice, cancellation windows, slot holds and double-booking protection.',
          published: true,
        },
        {
          slug: 'notifications-and-reminders',
          title: 'Notifications and reminders',
          nav: 'Notifications',
          summary: 'What gets sent, when, and over which channel.',
          published: true,
        },
      ],
    },
    {
      title: 'Run it day to day',
      blurb: 'The screens you will actually live in.',
      chapters: [
        {
          slug: 'calendar-and-appointments',
          title: 'Calendar and appointments',
          nav: 'Calendar',
          summary: 'The week and day grids, what the status colours mean, and why every change happens on Appointments.',
          published: true,
        },
        {
          slug: 'team-inbox',
          title: 'The team inbox',
          nav: 'Team inbox',
          summary: 'Live conversations, saved replies, and taking over from the AI.',
          published: true,
        },
        {
          slug: 'customers-and-reports',
          title: 'Customers and reports',
          nav: 'Customers and reports',
          summary: 'Customer records, consent and data export, and what the numbers on Reports are counting.',
          published: true,
        },
      ],
    },
    {
      title: 'Operate and maintain',
      blurb: 'Watching it, fixing it, and moving it forward.',
      chapters: [
        {
          slug: 'monitoring',
          title: 'Monitoring',
          nav: 'Monitoring',
          summary: 'AI activity, failed messages, the chat simulator and what WhatsApp is costing.',
          published: true,
        },
        {
          slug: 'admin-panel',
          title: 'The admin panel',
          nav: 'The admin panel',
          summary: 'Businesses, accounts, system health, the audit trail and the install-wide defaults.',
          published: true,
        },
        {
          slug: 'troubleshooting',
          title: 'Troubleshooting',
          nav: 'Troubleshooting',
          summary: 'Symptom first, with the cause and the chapter that covers it properly.',
          published: true,
        },
        {
          slug: 'updating-and-backups',
          title: 'Updating and backups',
          nav: 'Updating and backups',
          summary: 'Taking a new release safely, and the three things a backup has to include.',
          published: true,
        },
      ],
    },
  ],
};

export const manuals: Manual[] = [slotdesk];

export function getManual(slug: string): Manual | undefined {
  return manuals.find((m) => m.slug === slug);
}

/** Every chapter in reading order, with its part. */
export function chaptersOf(manual: Manual): { part: Part; chapter: Chapter }[] {
  return manual.parts.flatMap((part) => part.chapters.map((chapter) => ({ part, chapter })));
}

export function getChapter(manual: Manual, slug: string): Chapter | undefined {
  return chaptersOf(manual).find((c) => c.chapter.slug === slug)?.chapter;
}

/** Previous and next published chapter, for the footer pager. */
export function neighbours(manual: Manual, slug: string) {
  const live = chaptersOf(manual).filter(({ chapter }) => chapter.published);
  const i = live.findIndex(({ chapter }) => chapter.slug === slug);
  return {
    previous: i > 0 ? live[i - 1].chapter : undefined,
    next: i >= 0 && i < live.length - 1 ? live[i + 1].chapter : undefined,
  };
}

export function publishedCount(manual: Manual) {
  const all = chaptersOf(manual);
  return { written: all.filter((c) => c.chapter.published).length, total: all.length };
}

/**
 * The chapter body, read from disk at build time. Every route that calls this
 * is statically rendered, so this never runs on a request.
 */
export function readChapterMarkdown(manualSlug: string, chapterSlug: string): string {
  const file = path.join(process.cwd(), 'content', 'docs', manualSlug, `${chapterSlug}.md`);
  return fs.readFileSync(file, 'utf8');
}

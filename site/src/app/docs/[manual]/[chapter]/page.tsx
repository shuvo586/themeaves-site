import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { DocClose } from '@/components/docs/DocClose';
import { DocShell } from '@/components/docs/DocShell';
import {
  chaptersOf,
  getChapter,
  getManual,
  manuals,
  neighbours,
  readChapterMarkdown,
} from '@/data/docs';

type Params = { manual: string; chapter: string };

/* Every published chapter of every manual prerenders. An unpublished one is
   listed in the sidebar and has no route, so a link to it cannot be made by
   accident. */
export function generateStaticParams(): Params[] {
  return manuals.flatMap((m) =>
    chaptersOf(m)
      .filter(({ chapter }) => chapter.published)
      .map(({ chapter }) => ({ manual: m.slug, chapter: chapter.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { manual: manualSlug, chapter: chapterSlug } = await params;
  const manual = getManual(manualSlug);
  const chapter = manual ? getChapter(manual, chapterSlug) : undefined;

  if (!manual || !chapter) return {};

  return {
    title: `${chapter.title} · ${manual.title} docs`,
    description: chapter.summary,
  };
}

export default async function ChapterPage({ params }: { params: Promise<Params> }) {
  const { manual: manualSlug, chapter: chapterSlug } = await params;
  const manual = getManual(manualSlug);
  const chapter = manual ? getChapter(manual, chapterSlug) : undefined;

  if (!manual || !chapter || !chapter.published) notFound();

  /* The markdown carries its own H1, so the page does not add one and there is
     exactly one per route. Read at build time; this never runs on a request. */
  const html = await marked.parse(readChapterMarkdown(manual.slug, chapter.slug), {
    gfm: true,
  });

  const { previous, next } = neighbours(manual, chapter.slug);
  const part = manual.parts.find((p) => p.chapters.some((c) => c.slug === chapter.slug));

  return (
    /* The manual reads in the product's own colours; the header and footer sit
       outside this and stay ThemeAves. See tokens.css section 4b. */
    <div className={`theme-${manual.slug}`}>
      <div className="border-b border-line">
        <div className="mx-auto w-full max-w-[80rem] px-6 md:px-12">
          <div className="rail" style={{ borderBlockEnd: 0, paddingBlock: '14px' }}>
            <span>
              <Link href="/docs" className="underline-offset-4 hover:underline">
                Documentation
              </Link>{' '}
              · {manual.title}
            </span>
            <span>{part?.title}</span>
          </div>
        </div>
      </div>

      <DocShell manual={manual} current={chapter.slug}>
        <article className="doc-prose" dangerouslySetInnerHTML={{ __html: html }} />

        {/* The pager only walks published chapters, so it never offers a link
            to a page that does not exist. */}
        {previous || next ? (
          <nav
            aria-label="Chapter"
            className="mt-12 flex flex-wrap justify-between gap-6 border-t border-line pt-6"
          >
            {previous ? (
              <Link
                href={`/docs/${manual.slug}/${previous.slug}` as Route}
                className="max-w-[24ch] no-underline"
              >
                <span className="label label-sm block">Previous</span>
                <span className="mt-1 block text-[15px] text-accent underline-offset-4 hover:underline">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/docs/${manual.slug}/${next.slug}` as Route}
                className="max-w-[24ch] text-end no-underline"
              >
                <span className="label label-sm block">Next</span>
                <span className="mt-1 block text-[15px] text-accent underline-offset-4 hover:underline">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        ) : null}
      </DocShell>

      <DocClose />
    </div>
  );
}

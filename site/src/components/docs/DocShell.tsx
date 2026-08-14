import Link from 'next/link';
import type { Route } from 'next';
import { ArrowLink, Container } from '@/components/ui/primitives';
import { type Manual } from '@/data/docs';

/**
 * The sidebar the whole manual sits in, built to the handoff Docs prototype:
 * a 240px rail against the content, split by one hairline, inside a band ruled
 * top and bottom.
 *
 * The rail lists every chapter, published or not. An unwritten one is shown
 * and not linked, which is the same honesty the rest of the site uses for a
 * fact it does not have: the reader can see the manual's shape and can also
 * see what is missing.
 */
export function DocShell({
  manual,
  current,
  children,
}: {
  manual: Manual;
  /** Slug of the chapter being read, or undefined on the contents page. */
  current?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-y border-line bg-surface">
      <Container>
        <div className="doc-shell">
          <nav aria-label="Documentation" className="doc-rail max-lg:pt-8">
            <div className="doc-rail-inner">
              {/* The manual title is a .navgroup too. Without that it is not a
                  sibling the `.navgroup + .navgroup` rule can space against,
                  and the first part heading sits straight underneath it. */}
              <div className="navgroup">
                <p className="label label-sm">
                  <Link
                    href={`/docs/${manual.slug}` as Route}
                    className="underline-offset-4 hover:underline"
                  >
                    {manual.title}
                  </Link>
                </p>
              </div>

              {/* Spacing comes from .navgroup / .navlist and the --nav-y-*
                  tokens, shared with the /docs sidebar and the footer columns.
                  It used to be hardcoded here, which is why it stayed wrong
                  after the same bug was fixed on /docs. */}
              {manual.parts.map((part) => (
                <div key={part.title} className="navgroup">
                  <h2 className="label label-sm">{part.title}</h2>
                  <ul className="navlist">
                    {part.chapters.map((c) => {
                      const active = c.slug === current;

                      if (!c.published) {
                        /* The badge is inline, not a flex sibling. As a flex
                           item it stayed pinned right on the first line while
                           the title wrapped beneath it, so "Templates and the
                           window" read as a title, a gap, then an unattached
                           SOON. It now flows after the last word. */
                        return (
                          <li key={c.slug} className="text-[14.5px] text-muted">
                            {c.nav}{' '}
                            <span className="label label-sm whitespace-nowrap">soon</span>
                          </li>
                        );
                      }

                      return (
                        <li key={c.slug}>
                          <Link
                            href={`/docs/${manual.slug}/${c.slug}` as Route}
                            aria-current={active ? 'page' : undefined}
                            className={`text-[14.5px] underline-offset-4 hover:underline ${
                              active ? 'text-accent' : 'text-muted'
                            }`}
                          >
                            {c.nav}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              <div className="navgroup border-t border-line pt-5">
                <h2 className="label label-sm">Stuck?</h2>
                <p className="mt-[var(--nav-y-label)]">
                  <ArrowLink href="/support" className="text-[14px] text-accent">
                    Contact support
                  </ArrowLink>
                </p>
              </div>
            </div>
          </nav>

          <div className="doc-body max-w-[760px] max-lg:pb-12">{children}</div>
        </div>
      </Container>
    </section>
  );
}

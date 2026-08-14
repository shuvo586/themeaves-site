import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * The closing plane the handoff Docs prototype ends on: an accent band with a
 * mono eyebrow, one claim, and a single action.
 *
 * Inside `.theme-slotdesk` the plane is SlotDesk's spruce carrying white, at
 * 14.58:1. Both are pinned, so the pair is the same in either theme; see
 * tokens.css section 4b.
 */
export function DocClose() {
  return (
    <section data-on-accent className="bg-accent-plane text-on-accent">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-10 py-16">
          <div>
            <p className="eyebrow label text-on-accent tracking-[0.14em]">Cannot find it</p>
            <h2 className="mt-3.5 max-w-[22ch] font-display text-[36px] leading-[1.08] font-extrabold tracking-[-0.02em] max-sm:text-[28px]">
              The person who wrote the code answers the questions.
            </h2>
          </div>
          {/* The arrow matches the /docs closing band, which carries the
              prototype's own. The two bands say the same thing and sit one
              click apart, so they cannot differ. */}
          <Link href="/support" className="btn btn-ink">
            Contact support
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}

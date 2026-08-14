'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Lockup } from '@/components/brand/Lockup';
import { ThemeToggle } from './ThemeToggle';
import { Container } from '@/components/ui/primitives';
import { liveNav } from '@/data/site';

/* Sticky. Start: the lockup. Nav: whatever is live. End: the theme toggle and
   the licence action.

   The mobile pattern is a disclosure rather than a full-screen drawer, because
   five nav items do not need a modal. It still has to satisfy the keyboard
   requirements in brief section 9: Esc closes it, focus returns to the trigger,
   and the trigger reports its own state. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* Route change closes it. Without this, tapping a nav item leaves the panel
     open over the page it just navigated to. */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const onHome = pathname === '/';

  return (
    /* Sticky, on --color-surface with a hairline under it, exactly as the
       prototypes have it. Nav is mono at 12.5px with .04em tracking; the
       current route takes the accent. */
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <Container>
        {/* The bar is sized by the mark now, not by the control cluster: the
            full drawing runs at 46px, so 16 above and below gives 78. It was
            60 around a 26px reduced mark. */}
        <div className="flex min-h-[78px] items-center justify-between gap-4 py-2 lg:min-h-0 lg:py-4">
          {/* brand/mark.svg in full, in its published colours: the outline,
              the eye, the fold shadows and the upper wing ring, not the
              reduced drawing. It runs at 46px, which is what the bar height
              below is sized around. */}
          <Lockup asLink={!onHome} size="md" variant="detail" colour />

          <nav
            aria-label="Main"
            className="hidden items-center gap-[26px] font-mono text-[12.5px] tracking-[0.04em] lg:flex"
          >
            {liveNav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`${active ? 'text-accent' : 'text-muted'} hover:underline hover:underline-offset-4`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Prototype order: the theme control first, the licence action
              last. Both sit at 6 by 10/12 there, roughly 29px tall. That is
              kept from lg up, where the design was drawn; below lg they stay
              at a 44px touch target, which the prototype never had to solve
              because it has no small width. 29px still clears the 24px
              minimum in WCAG 2.2 target size. */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/licenses"
              className="hidden min-h-[44px] items-center border border-ink px-3 font-mono text-[12px] text-ink sm:inline-flex lg:min-h-0 lg:py-1.5"
            >
              My licence
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[var(--radius)] border border-line-strong text-ink lg:hidden"
            >
              {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-line lg:hidden">
          <Container>
            <nav aria-label="Main" className="flex flex-col py-2">
              {liveNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-line py-4 text-ink last:border-b-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/licenses" className="py-4 text-ink sm:hidden">
                My licence
              </Link>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

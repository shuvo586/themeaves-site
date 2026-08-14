'use client';

import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

type Mode = 'system' | 'light' | 'dark';
const ORDER: Mode[] = ['system', 'light', 'dark'];

const ICON = {
  system: Monitor,
  light: Sun,
  dark: Moon,
} as const;

/* Three states, persisted, applied pre-paint by the inline script in
   layout.tsx so there is no flash. The class on <html> is the source of truth
   because it is what the screenshot tool drives from outside the page.

   Never colour-only: the control carries an icon and a word, not a hue. */
export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('system');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ta-theme');
      if (stored === 'light' || stored === 'dark') setMode(stored);
    } catch {
      /* private mode; the pre-paint script already applied the default */
    }
  }, []);

  function apply(next: Mode) {
    const dark =
      next === 'dark' ||
      (next === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const list = document.documentElement.classList;
    list.toggle('dark', dark);
    list.toggle('light', !dark);
    try {
      if (next === 'system') localStorage.removeItem('ta-theme');
      else localStorage.setItem('ta-theme', next);
    } catch {
      /* the class is applied either way */
    }
    setMode(next);
  }

  const Icon = ICON[mode];

  return (
    <button
      type="button"
      onClick={() => apply(ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length])}
      className="inline-flex min-h-[44px] items-center gap-2 border border-line-strong px-2.5 font-mono text-[12px] text-muted lg:min-h-0 lg:py-1.5"
    >
      <Icon size={14} aria-hidden />
      <span className="hidden sm:inline">{mode}</span>
      <span className="sr-only">Theme: {mode}. Activate to change.</span>
    </button>
  );
}

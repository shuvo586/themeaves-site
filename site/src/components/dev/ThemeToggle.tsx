'use client';

import { useState } from 'react';

/* The proof pages need to flip theme by hand. The real three-state toggle is a
   kit component and lands with step 4; this is the dev affordance only. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  function flip() {
    const list = document.documentElement.classList;
    const next = !list.contains('dark');
    list.toggle('dark', next);
    list.toggle('light', !next);
    try {
      localStorage.setItem('ta-theme', next ? 'dark' : 'light');
    } catch {
      /* private mode, and the class is already applied */
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={flip}
      aria-pressed={dark}
      className="label rounded-[var(--radius)] border border-line-strong bg-surface px-3 py-2 text-ink"
    >
      Toggle theme
    </button>
  );
}

'use client';

import { useId, useState } from 'react';
import { Info } from 'lucide-react';

/* Auto-chunks to 8-4-4-4-12 as typed, paste tolerant. States: rest, focus,
   too short, and the honest one below.

   There is no verification endpoint yet, and there cannot be one until the
   Envato token exists as a server secret. Rather than render a field that
   looks live and quietly does nothing, the action says what is actually true.
   A purchase code never goes into a URL, a log line or analytics, which is
   also why this never becomes a GET form. */

const GROUPS = [8, 4, 4, 4, 12];
const MAX = GROUPS.reduce((a, b) => a + b, 0);

function chunk(raw: string) {
  const clean = raw.replace(/[^a-zA-Z0-9]/g, '').slice(0, MAX).toLowerCase();
  const out: string[] = [];
  let i = 0;
  for (const size of GROUPS) {
    if (i >= clean.length) break;
    out.push(clean.slice(i, i + size));
    i += size;
  }
  return { display: out.join('-'), length: clean.length };
}

export function LicenceField() {
  const id = useId();
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { length } = chunk(value);
  const complete = length === MAX;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor={id} className="label">
        Purchase code
      </label>
      <input
        id={id}
        name="code"
        value={value}
        onChange={(e) => setValue(chunk(e.target.value).display)}
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        aria-describedby={`${id}-help`}
        className="mt-2 block w-full rounded-[var(--radius)] border border-line-strong bg-surface px-4 py-3 font-mono text-sm tabular-nums text-ink placeholder:text-muted"
      />
      <p id={`${id}-help`} className="label mt-2">
        <span className="tabular">
          {length} of {MAX}
        </span>{' '}
        characters
      </p>

      <button type="submit" disabled={!complete} className="btn btn-ink mt-4 disabled:opacity-50">
        Check this code
      </button>

      {submitted ? (
        <p className="mt-4 flex items-start gap-2 border border-line-strong p-4 text-sm text-muted">
          <Info size={16} aria-hidden className="mt-0.5 shrink-0" />
          <span>
            Verification is not connected yet. It needs an Envato API token held as a server secret,
            and that lands with the first listed product. Until then the support page is the right
            destination.
          </span>
        </p>
      ) : null}
    </form>
  );
}

'use client';

import { useState } from 'react';
import { products } from '@/data/products';

/* The ticket form from the handoff Support prototype. Submits to /api/ticket,
   which forwards by email through the Resend API when the key is configured.

   Three honest states: sending, sent, and an error that says what went wrong.
   A control that looks live and is not is worse than an honest gap, so the
   "desk not connected" case is a sentence, not a spinner. */

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'done' }
  | { kind: 'error'; message: string };

const inputClasses =
  'mt-[7px] w-full border border-line-strong bg-surface px-[14px] py-3 text-[15px] text-ink placeholder:text-muted outline-none focus:border-ink';

export function TicketForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: 'sending' });

    const res = await fetch('/api/ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        product: data.get('product'),
        version: data.get('version'),
        message: data.get('message'),
      }),
    });

    if (res.ok) {
      setStatus({ kind: 'done' });
      return;
    }

    const payload = (await res.json().catch(() => null)) as { error?: string } | null;
    setStatus({ kind: 'error', message: payload?.error ?? 'It did not go through.' });
  }

  if (status.kind === 'done') {
    return (
      <div className="border border-line-strong p-8">
        <h3 className="font-display text-[1.375rem] font-bold tracking-[-0.01em]">
          Ticket sent.
        </h3>
        <p className="mt-3 max-w-[52ch] text-muted">
          It is in the inbox. A reply comes within one business day, and you will hear from a
          person who wrote the code.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ticket-name" className="label">
            Your name
          </label>
          <input
            id="ticket-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="ticket-email" className="label">
            Email
          </label>
          <input
            id="ticket-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@studio.com"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="ticket-product" className="label">
            Product
          </label>
          <select id="ticket-product" name="product" defaultValue={products[0].name} className={inputClasses}>
            {products.map((p) => (
              <option key={p.slug} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="ticket-version" className="label">
            Version
          </label>
          <input
            id="ticket-version"
            name="version"
            type="text"
            placeholder="e.g. 1.4.0"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="ticket-message" className="label">
          How can we help?
        </label>
        <textarea
          id="ticket-message"
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder="Describe what you expected, what happened, and any error text..."
          className={`${inputClasses} min-h-[120px] resize-y`}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === 'sending'}
          className="bg-accent-plane px-6 py-[14px] font-sans text-[15px] font-semibold text-on-accent disabled:opacity-60"
        >
          {status.kind === 'sending' ? 'Sending...' : 'Submit ticket'}
        </button>
        <span className="label">We never see your server data</span>
      </div>

      {status.kind === 'error' ? (
        <p className="mt-4 max-w-[52ch] text-muted" role="alert">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
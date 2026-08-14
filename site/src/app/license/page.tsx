import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';
import { Container, Display, ExternalLink, Heading, Lead, Section } from '@/components/ui/primitives';

export const metadata: Metadata = {
  title: 'Which licence do I need',
  description:
    'Regular versus Extended in plain English, with three concrete cases.',
};

/* The highest-value page in the legal group: it answers the most common
   pre-sale question. Envato writes the licence, so this describes it and links
   the authoritative text rather than restating it as if it were ours. */

const ROWS: [string, boolean, boolean][] = [
  ['One end product', true, true],
  ['Use it for a client project', true, true],
  ['Charge your client for the work', true, true],
  ['Let your end users use it for free', true, true],
  ['Charge your end users to access it', false, true],
  ['Redistribute the files as-is', false, false],
  ['Resell it inside another template', false, false],
];

const CASES = [
  {
    title: 'A salon runs its own bookings on it.',
    verdict: 'Regular',
    body: 'Customers book appointments and pay for haircuts, not for access to the software. Nobody is charged to use the product itself, so Regular covers it.',
  },
  {
    title: 'You build it for a client and invoice them.',
    verdict: 'Regular',
    body: 'The client pays you for the work. Their end users are not charged to access the thing you built. Buy one licence per end product, not per developer.',
  },
  {
    title: 'You run it as a subscription service.',
    verdict: 'Extended',
    body: 'Shop owners pay you a monthly fee to use it. Your end users are being charged for access, which is exactly the line Extended exists for.',
  },
];

export default function LicensePage() {
  return (
    <>
      <Container>
        <div className="py-16 md:py-24">
          <div className="rule">
            <span className="eyebrow label">Licensing</span>
          </div>
          <Display as="h1" className="mt-8 max-w-[20ch]">
            One question decides it: are your users being charged?
          </Display>
          <Lead className="mt-6">
            Envato writes these licences and their text is the one that counts. This page is the
            plain English version, so you can pick correctly in about a minute.
          </Lead>
        </div>
      </Container>

      <Section index="01" label="Side by side">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr>
                <th className="label border-b border-line py-3 pe-6 text-start">&nbsp;</th>
                <th className="label border-b border-line px-4 py-3 text-start">Regular</th>
                <th className="label border-b border-line px-4 py-3 text-start">Extended</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, regular, extended]) => (
                <tr key={label}>
                  <th scope="row" className="border-b border-line py-3 pe-6 text-start font-normal">
                    {label}
                  </th>
                  <Cell yes={regular} />
                  <Cell yes={extended} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-[var(--measure)] text-muted">
          One licence covers one end product. Two sites means two licences, whichever type you pick.
        </p>
      </Section>

      <Section index="02" label="Three concrete cases">
        <ul className="grid gap-6 lg:grid-cols-3">
          {CASES.map((c) => (
            <li key={c.title} className="border border-line-strong p-6">
              <span className="label">{c.verdict}</span>
              <Heading className="mt-3">{c.title}</Heading>
              <p className="mt-3 text-muted">{c.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section index="03" label="The authoritative text">
        <p className="max-w-[var(--measure)] text-muted">
          If this page and Envato disagree, Envato is right. Their licence text governs every
          purchase and it is the one to read before a commercial deployment.
        </p>
        <p className="mt-6">
          <ExternalLink href="https://codecanyon.net/licenses/standard">
            Envato standard licence terms
          </ExternalLink>
        </p>
      </Section>
    </>
  );
}

/* Never colour-only: each cell carries an icon and a word. */
function Cell({ yes }: { yes: boolean }) {
  return (
    <td className="border-b border-line px-4 py-3">
      <span className="inline-flex items-center gap-2">
        {yes ? <Check size={16} aria-hidden /> : <X size={16} aria-hidden />}
        {yes ? 'Yes' : 'No'}
      </span>
    </td>
  );
}

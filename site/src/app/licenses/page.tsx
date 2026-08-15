import type { Metadata } from 'next';
import Link from 'next/link';
import { Container, Display, ImageSlot, Lead, Section, Heading } from '@/components/ui/primitives';
import { LicenceField } from './LicenceField';

export const metadata: Metadata = {
  title: 'Check my licence',
  description: 'Look up a purchase code to see licence type, support window and downloads.',
};

/* Code-based, no accounts, matching how Envato works.

   Verification runs server-side only and the Envato token never reaches the
   client bundle, so this page cannot verify anything until that route exists.
   It says so plainly rather than rendering a field that silently does nothing,
   because a control that looks live and is not is worse than an honest gap. */
export default function LicensesPage() {
  return (
    <>
      <Container>
        <div className="py-16 md:py-24">
          <div className="rail">
            <span className="eyebrow label">Licences</span>
          </div>
          <Display as="h1" className="mt-8 max-w-[18ch]">
            Your purchase code is the whole account.
          </Display>
          <Lead className="mt-6">
            No sign up, no password. The code on your Envato receipt is what proves the licence, so
            it is the only thing this asks for.
          </Lead>
        </div>
      </Container>

      <Section index="01" label="Check a code">
        <div className="grid gap-12 lg:grid-cols-2">
          <LicenceField />
          <div>
            <Heading as="h2">Where to find it</Heading>
            <ol className="mt-4 list-decimal space-y-2 ps-5 text-muted">
              <li>Open your Envato account and go to Downloads.</li>
              <li>Find the item, then open the Download menu beside it.</li>
              <li>Choose Licence certificate and purchase code, as PDF or text.</li>
              <li>The code is the 36 character line at the bottom.</li>
            </ol>
            <ImageSlot
              caption="Envato downloads screen, annotated · screenshot pending"
              ratio="16 / 10"
              className="mt-6"
            />
          </div>
        </div>
      </Section>

      <Section index="02" label="If it does not work">
        <p className="max-w-[var(--measure)] text-muted">
          A code that will not verify is usually one of three things: it belongs to a different
          author&apos;s item, it was copied with the surrounding text still attached, or the
          purchase was refunded. If none of those fit, the support page has the right destination.
        </p>
        <p className="mt-6">
          <Link href="/support" className="underline underline-offset-4">
            Go to support
          </Link>
        </p>
      </Section>
    </>
  );
}

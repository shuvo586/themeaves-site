import Link from 'next/link';
import { Container, Display, Lead } from '@/components/ui/primitives';

/* One dry line and the three places people were probably heading. No giant
   numeral, no apology, no illustration. */
export default function NotFound() {
  return (
    <Container>
      <div className="py-24 md:py-32">
        <span className="label">Error 404</span>
        <Display as="h1" className="mt-6 max-w-[18ch]">
          That page is not here.
        </Display>
        <Lead className="mt-6">
          Either it moved or the link was wrong. These three cover most of what people are looking
          for.
        </Lead>
        <ul className="mt-8 space-y-3">
          <li>
            <Link href="/products" className="underline underline-offset-4">
              Products
            </Link>
          </li>
          <li>
            <Link href="/demos" className="underline underline-offset-4">
              Demos
            </Link>
          </li>
          <li>
            <Link href="/support" className="underline underline-offset-4">
              Support
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}

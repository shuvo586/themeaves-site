import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container, Display, Lead } from '@/components/ui/primitives';
import { ProductsIndex } from './ProductsIndex';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Web products from ThemeAves, sold on CodeCanyon and ThemeForest.',
};

export default function ProductsPage() {
  return (
    <Container>
      <div className="py-16 md:py-24">
        <div className="rail">
          <span className="eyebrow label">Products</span>
        </div>
        <Display as="h1" className="mt-8 max-w-[18ch]">
          Two things, both finished, both yours to run.
        </Display>
        <Lead className="mt-6">
          Nothing is sold on this site. Every buy action is a link to the marketplace item, because
          that is where the licence and the payment live.
        </Lead>

        {/* useSearchParams needs a Suspense boundary for static rendering. */}
        <Suspense fallback={<div className="mt-8 h-16 border-y border-line" />}>
          <ProductsIndex />
        </Suspense>
      </div>
    </Container>
  );
}

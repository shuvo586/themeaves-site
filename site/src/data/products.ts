import { PENDING, type Maybe } from './site';

/**
 * The product catalogue.
 *
 * This is the shape `content/products/<slug>.mdx` frontmatter will take when
 * MDX lands (brief section 8). Keeping it typed here first means the product
 * template is written against the real shape, and swapping the source later is
 * a loader change rather than a rewrite.
 *
 * Two frontmatter fields drive the template. `type` reorders and adds
 * sections. `presentation` sets how much page an item gets. Both live at
 * /products/<slug>, so promoting Aonomy later is a data change, not a route.
 */

export type ProductType = 'php-script' | 'html-template' | 'cms-theme';
export type Presentation = 'full' | 'demo';
export type Marketplace = 'codecanyon' | 'themeforest';

export type Variant = {
  name: string;
  /** The file inside the item, so the URL can be derived once the demo host is known. */
  file: string;
  thumbnail: string;
};

export type Product = {
  name: string;
  slug: string;
  type: ProductType;
  presentation: Presentation;
  marketplace: Marketplace;
  category: string;
  /** One line. What it does, not how it feels. */
  pitch: string;
  /** The product's own app icon. File lives in public/products/<slug>/. */
  icon: Maybe<string>;
  /** The hero screenshot or item banner, in public/products/<slug>/. */
  heroImage: Maybe<string>;
  itemUrl: Maybe<string>;
  itemId: Maybe<string>;
  demoUrl: Maybe<string>;
  docsUrl: Maybe<string>;
  price: Maybe<number>;
  currency: string;
  version: Maybe<string>;
  lastUpdated: Maybe<string>;
  rating: Maybe<number>;
  reviewCount: Maybe<number>;
  /** Opt in per product. Default false: a number can hurt as easily as help. */
  showSales: boolean;
  salesCount: Maybe<number>;
  thumbnail: Maybe<string>;
  tooling: string[];
  /** The composable sections a buyer is actually shopping for. */
  sections: string[];
  variants: Variant[];
};

const AONOMY_DEMOS = [
  'Video',
  'Particles',
  'Snow',
  'Star',
  'Bubble',
  'Slider',
  'Wave',
  'Parallax',
] as const;

export const products: Product[] = [
  {
    name: 'SlotDesk AI',
    slug: 'slotdesk',
    type: 'php-script',
    presentation: 'full',
    marketplace: 'codecanyon',
    category: 'PHP Scripts',
    pitch:
      'Bookings that arrive over WhatsApp and land on your calendar, running on your own server.',
    /* Not listed yet. Every one of these is a ❌ row in docs/FACTS.md and each
       renders as a visible placeholder until it is real. */
    icon: '/products/slotdesk/icon.svg',
    heroImage: '/products/slotdesk/dashboard.png',
    itemUrl: PENDING,
    itemId: PENDING,
    demoUrl: PENDING,
    docsUrl: PENDING,
    price: 59,
    currency: 'USD',
    version: PENDING,
    lastUpdated: PENDING,
    rating: PENDING,
    reviewCount: PENDING,
    showSales: false,
    salesCount: PENDING,
    thumbnail: PENDING,
    tooling: ['PHP', 'Laravel', 'MySQL'],
    sections: [],
    variants: [],
  },
  {
    name: 'Aonomy',
    slug: 'aonomy',
    type: 'html-template',
    presentation: 'demo',
    marketplace: 'themeforest',
    category: 'Site Templates, Technology',
    pitch: 'An app landing page in eight background treatments, built on Bootstrap 4 and Sass.',
    icon: '/products/aonomy/icon.svg',
    heroImage: '/products/aonomy/particles-thumbnail.jpg',
    itemUrl: 'https://themeforest.net/item/aonomy-app-landing-page/21460999',
    itemId: '21460999',
    /* FACTS.md flags this: the ThemeForest preview URL may no longer resolve.
       Confirm it before filling it in, rather than assuming. */
    demoUrl: PENDING,
    docsUrl: '/docs/aonomy',
    price: 16,
    currency: 'USD',
    version: PENDING,
    lastUpdated: PENDING,
    rating: PENDING,
    reviewCount: 2,
    showSales: false,
    salesCount: 77,
    thumbnail: '/products/aonomy/video-thumbnail.jpg',
    tooling: [
      'Bootstrap 4',
      'Sass',
      'jQuery',
      'particles.js',
      'jQuery Stellar',
      'Icofont',
    ],
    sections: [
      'Work',
      'Feature',
      'Video',
      'App Screen',
      'Download',
      'App Prices',
      'Testimonial',
      'Team',
      'Statistics',
      'News',
      'Subscribe',
      'Contact',
      'Footer',
    ],
    variants: AONOMY_DEMOS.map((name) => ({
      name,
      file: `index-${name.toLowerCase()}.html`,
      thumbnail: `/products/aonomy/${name.toLowerCase()}-thumbnail.jpg`,
    })),
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const TYPE_LABEL: Record<ProductType, string> = {
  'php-script': 'PHP script',
  'html-template': 'HTML template',
  'cms-theme': 'CMS theme',
};

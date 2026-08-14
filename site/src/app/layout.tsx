import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { Header } from '@/components/chrome/Header';
import { Footer } from '@/components/chrome/Footer';
import './globals.css';

/* Exactly four font files, which is the ceiling in brief section 9:
     Archivo variable 400..800   1   display, headings, buttons
     IBM Plex Mono 400, 500      2   labels, rails, spec values
     IBM Plex Sans 400           1   body copy

   Plex Sans was dropped earlier to save a file, on the reasoning that Archivo
   could carry body copy. The handoff prototypes set every paragraph in Plex
   Sans, and swapping the body face changes the colour and rhythm of every
   block of text on the page, so matching them means loading it. One weight
   only: the prototypes never set body copy above 400. */
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-plex-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://themeaves.com'),
  title: {
    default: 'ThemeAves',
    template: '%s · ThemeAves',
  },
  description:
    "ThemeAves ships web products on Envato's marketplaces, documented before you buy.",
  icons: {
    icon: [
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/brand/favicon.ico',
    apple: '/brand/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  /* The browser chrome takes the pinned accent plane in both themes, which is
     the same decision the favicon makes and for the same reason: the plane
     does not flip, so one value is correct against light and dark chrome. */
  themeColor: '#243D59',
};

/* Applied before first paint, so there is no flash of the wrong theme. Three
   states: an explicit choice wins, otherwise the system preference decides.
   The class on <html> is the source of truth, because it is what tools/shot.cjs
   drives from outside the page. */
const THEME_SCRIPT = `
try {
  var stored = localStorage.getItem('ta-theme');
  var dark = stored === 'dark' ||
    (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var list = document.documentElement.classList;
  list.toggle('dark', dark);
  list.toggle('light', !dark);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* The next/font variables go on <html>, not <body>, and the distinction is
       not cosmetic. globals.css redefines --font-display, --font-body and
       --font-mono on :root, which IS <html>. With the classes on <body> those
       three referenced --font-archivo etc. one level above where they were
       defined, resolved to nothing, and every route on the site silently
       rendered in the -apple-system fallback instead of Archivo, Plex Sans and
       Plex Mono. Caught 2026-08-13 by measuring the docs page against its
       handoff prototype: the mono rails were not monospaced. */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable} ${plexSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-100 focus:rounded-[var(--radius)] focus:border focus:border-line-strong focus:bg-surface focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

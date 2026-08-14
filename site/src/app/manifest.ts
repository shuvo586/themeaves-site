import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ThemeAves',
    short_name: 'ThemeAves',
    description:
      'ThemeAves builds self-hosted software. Your server, your data, documented before you buy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F5F7',
    /* The pinned accent plane, the same value the favicon and the browser
       chrome take. It does not flip with the theme, so one value is right. */
    theme_color: '#243D59',
    icons: [
      { src: '/brand/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/brand/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/brand/icon-512.png', type: 'image/png', sizes: '512x512' },
      {
        src: '/brand/icon-maskable-512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
  };
}

import { NextResponse } from 'next/server';

// Serves GOOGLE_MAPS_API_KEY from the server environment to the template
// pages' maps loader (assets/js/maps-loader.js). The key never appears in
// source, in the built HTML or in git; it exists only in the deployment's
// .env. The key is meant to be public in the browser (a JS API key), so
// serving it over the site's own endpoint adds nothing over the old inline
// tag except keeping the secret out of the repository. Restrict it in the
// Google Cloud Console by HTTP referrer to the real domains.

export function GET() {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return NextResponse.json({ key: null });
  return NextResponse.json({
    key,
    version: process.env.GOOGLE_MAPS_API_VERSION || '',
  });
}

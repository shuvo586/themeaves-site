import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Marketing and docs are statically rendered (brief section 9). Nothing here
  // opts a route out of that; a route that needs to be dynamic says so itself.
  poweredByHeader: false,

  typedRoutes: true,
};

export default nextConfig;

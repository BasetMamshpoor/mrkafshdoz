/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/s',
        destination: '/',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/setting',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/category-:slug-apparel',
        destination: '/category/:slug/apparel',
      },
      {
        source: '/category-:slug',
        destination: '/category/:slug'
      },
    ]
  },
};

export default nextConfig;

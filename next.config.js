/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/pagination',
        destination: '/',
        permanent: true,
      },
      {
        source: '/infinite-scroll',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products/:id',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

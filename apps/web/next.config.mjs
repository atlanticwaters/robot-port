/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
      {
        protocol: 'https',
        hostname: 'robot-port.cdn.prismic.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/work/:uid',
        destination: '/projects/:uid',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

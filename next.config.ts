// next.config.ts
const nextConfig = {
  images: {
    domains: ['randomuser.me'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
    unoptimized: true, //  disables optimization for remote images
  },
};

export default nextConfig;

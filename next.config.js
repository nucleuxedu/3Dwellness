/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local assets served from /public/assets
    unoptimized: false,
  },
};

module.exports = nextConfig;

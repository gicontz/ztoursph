/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },  
  compiler: {
    emotion: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
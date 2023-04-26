/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
  fallbacks: {
    image: "/images/offline.webp",
    font: "/fonts/IRANSansX-Regular.woff",
  },
});

const nextConfig = withPWA({
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // env: {
  // },
  // swcMinify: true,
  // images: {
  //   domains: ["*************"],
  // },
});

module.exports = nextConfig;

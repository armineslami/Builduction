/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  env: {
    AIRTABLE_KEY: process.env.AIRTABLE_KEY,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "pbs.twimg.com",
      "s3.amazonaws.com",
      "img.youtube.com",
      "v5.airtableusercontent.com",
      "media.graphassets.com"
    ],
  },
};

module.exports = nextConfig;

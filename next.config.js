/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mintyplex-api.onrender.com", "localhost:3000"],
  },
  env: {
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
  },
};

module.exports = nextConfig;

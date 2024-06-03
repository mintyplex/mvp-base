/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mintyplex-api.onrender.com", "localhost:3000", "as1.ftcdn.net"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "crests.football-data.org",
      "upload.wikimedia.org",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;

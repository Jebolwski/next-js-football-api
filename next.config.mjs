/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["crests.football-data.org", "upload.wikimedia.org"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://https://api.football-data.org/v4/:path*",
      },
    ];
  },
};

export default nextConfig;

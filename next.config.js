/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Check if the environment is development
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/auth/:path*", // Match all paths starting with /user
          destination: "http://127.0.0.1:8080/auth/:path*", // API URL for development environment (local)
        },
      ];
    }

    // Configuration for production environment
    return [
      {
        source: "/auth/:path*", // Match all paths starting with /user
        destination: "https://your-production-api.com/auth/:path*", // API URL for production environment (live)
      },
    ];
  },
};

module.exports = nextConfig;

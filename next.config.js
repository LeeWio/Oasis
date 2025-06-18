/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://127.0.0.1:8080/:path*",
            },
        ];
    },
};

export default nextConfig;

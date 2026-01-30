/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@louvor-serafico/ui"],
    output: 'export',
    images: {
        unoptimized: true
    }
};

module.exports = nextConfig;

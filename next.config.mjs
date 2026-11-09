/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

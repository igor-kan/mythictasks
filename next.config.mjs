/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mythictasks',
  assetPrefix: '/mythictasks',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

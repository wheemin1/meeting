/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'standalone', // Netlify Next.js Runtime을 위해 standalone 모드 사용
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
}

export default nextConfig

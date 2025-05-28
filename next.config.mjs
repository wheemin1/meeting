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
  // Netlify에서 SSR 지원하므로 output: 'export' 제거
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
}

export default nextConfig

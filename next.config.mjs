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
  output: 'export', // 정적 HTML로 완전히 내보내기
  distDir: 'out',   // 출력 디렉토리를 'out'으로 설정
}

export default nextConfig

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
  experimental: {
    // Désactiver l'Edge Runtime pour les fonctions serverless
    serverActions: {
      runtime: 'nodejs',
    }
  },
}

export default nextConfig

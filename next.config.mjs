/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['openweathermap.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.openweathermap.org',
      },
      {
        protocol: 'http',
        hostname: 'openweathermap.org',
      }
    ]
  }
};

export default nextConfig;

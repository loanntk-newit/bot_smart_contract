/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
])

const nextConfig = withTM({
  reactStrictMode: false,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
})

module.exports = nextConfig

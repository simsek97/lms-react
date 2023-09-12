/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  optimizeFonts: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['localhost', 'lmsreact64da822f761047479e756ffe4668e630200027-dev.s3.us-east-1.amazonaws.com']
  },
  env: {
    PORTAL_URL: process.env.PORTAL_URL,
    DEPLOYMENT_REGION: process.env.DEPLOYMENT_REGION,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    GRAPHQL_API_KEY: process.env.GRAPHQL_API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOKS_SECRET: process.env.STRIPE_WEBHOOKS_SECRET
  }
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['cdn.shopify.com'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/shopify/:path*",
          destination: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/:path*`,
        },
      ],
    };
  },
};
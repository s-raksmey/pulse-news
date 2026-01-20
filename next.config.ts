/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "km"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.yoursite.com",
      },
    ],
  },
};

module.exports = nextConfig;

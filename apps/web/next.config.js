const { composePlugins, withNx } = require("@nx/next");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      // TODO: remove after tests
      {
        hostname: "**",
        pathname: "**",
        port: "",
        protocol: "https",
      },
    ],
  },
  nx: {
    svgr: false,
  },
  reactStrictMode: true,
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);

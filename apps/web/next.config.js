const { composePlugins, withNx } = require("@nx/next");
const createNextIntlPlugin = require("next-intl/plugin");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  nx: {
    svgr: false,
  },
};

const plugins = [createNextIntlPlugin("./src/utils/i18n/i18n.ts"), withNx];

module.exports = composePlugins(...plugins)(nextConfig);

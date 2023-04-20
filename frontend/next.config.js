// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = {
//   nextConfig,
// };

module.exports = {
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";
    const plugins = [...config.plugins];

    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins,
    };
  },
};

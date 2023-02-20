/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpackDevMiddleware: config => {
    config.devtool = 'cheap-module-eval-source-map';
    config.watchOptions = {
      poll: 100,
      aggregateTimeout: 300,
    }
    return config
  },
}
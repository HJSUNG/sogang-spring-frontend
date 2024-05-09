const path = require('path');

module.exports = {
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_SERVER_PORT,
    https: false,
    overlay: false,
    compress: true,
    disableHostCheck: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@@': path.resolve(__dirname, 'src/app'),
      },
    },
    devtool: 'cheap-source-map',
  },
  css: {
    // extract: true,
    extract: { ignoreOrder: true },
    sourceMap: true,
  },
  runtimeCompiler: true,
  productionSourceMap: false,
};
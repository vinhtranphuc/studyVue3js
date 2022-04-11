const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: config => {
  //   config.module
  //     .rule('raw')
  //     .test(/\.pem$/)
  //     .use('raw-loader')
  //     .loader('raw-loader')
  //     .end()
  // },
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       Buffer: ['buffer', 'Buffer'],
  //     }),
  //     new webpack.ProvidePlugin({
  //       process: 'process/browser',
  //     }),
  //   ]
  // }

})

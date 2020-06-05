
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const common = require('./common')

const chunks = { bundle: './index' }

const config = {
  cache: true,
  context: common.appEntry,
  entry: chunks,
  output: {
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js',
    path: common.outputPath,
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    modules: [
      common.appNodeModules,
      path.join(common.appEntry),
    ],
  },
  module: {
    // see common.js for rules
    rules: [],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      cache: true,
      favicon: path.join(common.staticPath, 'favicon.ico'),
      filename: 'index.html',
      template: path.join(common.staticPath, 'index.html'),
    }),
  ],
  optimization: {
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
  },
  stats: {
    assets: true,
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    errorDetails: true,
    errors: true,
    env: false,
    excludeAssets: /icons.svg$/i,
    hash: false,
    modules: false,
    moduleTrace: true,
  },
  performance: {
    maxEntrypointSize: 3.465 * 1024 * 1024,
    maxAssetSize: 1.835 * 1024 * 1024,
  },
}

module.exports = config

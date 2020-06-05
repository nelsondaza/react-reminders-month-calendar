
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const common = require('./common')

const publicPath = '/'
const envName = 'production'
const fixedChunks = [
  'core-js',
  'react',
  'react-dom',
  'react-router-dom',
]

const config = {
  mode: envName,
  output: {
    chunkFilename: 'js/[name].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js',
    publicPath,
  },
  module: {
    rules: common.getRules(publicPath, envName),
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: (() => {
            // eslint-disable-next-line no-console
            console.log(`ENV: ${envName}`)
            return JSON.stringify(envName)
          })(),
        },
      },
    }),
    new MiniCssExtractPlugin({
      allChunks: true,
      chunkFilename: 'css/[name].[contenthash].css',
      filename: 'css/[name].[contenthash].css',
      ignoreOrder: true,
    }),
    new DuplicatePackageCheckerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        discardDuplicates: { removeAll: true },
      },
    }),
    new HtmlWebpackPlugin({
      cache: true,
      filename: 'scripts.txt',
      templateContent: '',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: common.staticPath, to: '' }],
    }),
  ],
  devtool: 'source-map',
  optimization: {
    chunkIds: 'named',
    minimize: true,
    moduleIds: 'hashed',
    nodeEnv: envName,
    noEmitOnErrors: true,
    splitChunks: {
      automaticNameDelimiter: '-',
      chunks: 'all',
      cacheGroups: {
        clip: {
          chunks: 'all',
          enforce: true,
          name: 'clip',
          priority: 2,
          reuseExistingChunk: false,
          test: ({ context }) => (
            /[/\\]src[/\\]packages[/\\]app[/\\]src[/\\]App/.test(context)
            || /[/\\]@sentry/.test(context)
          ),
        },
        vendors: {
          chunks: 'all',
          enforce: true,
          name: ({ context }) => `vendors-${fixedChunks.find(chunk => (
            context.includes(`/${chunk}`)
            || context.includes(`\\${chunk}`)
          ))}`,
          priority: 1,
          reuseExistingChunk: false,
          test: ({ context }) => fixedChunks.some(chunk => (
            context.includes(`/${chunk}`)
            || context.includes(`\\${chunk}`)
          )),
        },
        common: {
          chunks: 'async',
          minChunks: 2,
          name: 'common',
          priority: 0,
          reuseExistingChunk: true,
          test: ({ context }, chunk) => {
            if (chunk && chunk[0]) {
              // eslint-disable-next-line no-console
              console.log(`${chunk[0].name} -> ${context}`)
            }
            return true
          },
        },
      },
    },
  },
  stats: {
    optimizationBailout: false,
  },
}

module.exports = config

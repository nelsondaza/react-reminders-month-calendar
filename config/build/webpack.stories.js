
const webpack = require('webpack')

const common = require('./common')
const commonConfig = require('./webpack.common')

const isProd = process.env.NODE_ENV === 'production'
const publicPath = isProd ? '/style-guide/' : '/'
const envName = isProd ? 'production' : 'development'

const config = {
  mode: envName,
  resolve: {
    ...commonConfig.resolve,
    alias: {
      ...(commonConfig.resolve.alias || {}),
    },
  },
  module: {
    rules: common.getRules(publicPath, 'stories'),
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
    ...commonConfig.plugins.splice(0, 1), // remove HtmlWebpackPlugin
  ],
  optimization: {
    nodeEnv: envName,
    noEmitOnErrors: true,
  },
  devtool: 'cheap-module-eval-source-map',
  stats: {
    optimizationBailout: false,
  },
}

module.exports = config


const webpack = require('webpack')

const common = require('./common')
const commonConfig = require('./webpack.common')

const publicPath = '/'
const envName = 'development'

const config = {
  mode: envName,
  output: {
    publicPath,
  },
  resolve: {
    ...commonConfig.resolve,
    alias: {
      ...(commonConfig.resolve.alias || {}),
    },
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
    ...commonConfig.plugins.splice(0, 1), // remove HtmlWebpackPlugin
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    nodeEnv: envName,
    noEmitOnErrors: true,
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'info',
    contentBase: common.staticPath,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    hotOnly: true,
    inline: true,
    liveReload: true,
    noInfo: false,
    port: 7070,
    progress: false,
    publicPath,
    watchContentBase: true,
    stats: {
      assets: false,
      children: false,
      performance: true,
      reasons: false,
      excludeModules: () => true,
    },
  },
}

module.exports = config

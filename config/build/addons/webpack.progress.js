
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProgressPlugin({
      activeModules: true,
      entries: true,
      modules: true,
      modulesCount: 1,
      profile: true,
    }),
  ],
}

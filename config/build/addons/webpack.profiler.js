
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProgressPlugin({ profile: true }),
  ],
}

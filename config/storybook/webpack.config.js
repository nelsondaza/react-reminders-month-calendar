
const storiesConfig = require('../build/webpack.stories')

module.exports = baseConfig /* , env, defaultConfig */ => ({
  ...baseConfig.config,
  ...storiesConfig,
  bail: true,
  plugins: [
    ...baseConfig.config.plugins,
    ...storiesConfig.plugins,
  ],
})

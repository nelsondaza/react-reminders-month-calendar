
const webpackMerge = require('webpack-merge')

const validations = require('./config/build/validations')
const commonConfig = require('./config/build/webpack.common')

const addons = (addonsArg) => {
  const addonsList = [...[addonsArg]].filter(Boolean)
  // eslint-disable-next-line global-require,import/no-dynamic-require
  return addonsList.map(addonName => require(`./config/build/addons/webpack.${addonName}.js`))
}

module.exports = (env) => {
  if (!env) {
    throw new Error(validations.ERR_NO_ENV_FLAG)
  }
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const envConfig = require(`./config/build/webpack.${env.env}.js`)
  return webpackMerge(
    commonConfig,
    envConfig,
    ...addons(env.addons),
  )
}

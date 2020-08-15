
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const projectRoot = path.resolve(__dirname, '../../')
const appEntry = path.join(projectRoot, 'src')
const appConfig = path.join(projectRoot, 'config')
const appNodeModules = path.join(projectRoot, 'node_modules')

const capitalize = (result, word) => result + word.charAt(0).toUpperCase() + word.slice(1)

const globalCSSLoaders = prod => [
  { loader: 'postcss-loader', options: { sourceMap: !prod } },
  { loader: 'sass-loader', options: { sourceMap: !prod } },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: path.join(appConfig, 'assets', 'scss', '**/*.scss'),
      sourceMap: !prod,
    },
  },
]

const getRules = (publicPath, environment) => {
  const prod = environment === 'production'
  const stories = environment === 'stories'
  return [
    {
      exclude: appNodeModules,
      include: [
        appConfig,
        appEntry,
        // stupid gsap uses `const` in strict mode
        path.join(appNodeModules, 'gsap'),
      ],
      loaders: ['babel-loader', !stories && 'eslint-loader'].filter(Boolean),
      test: /\.jsx?$/,
    },
    {
      exclude: [appEntry],
      include: [appConfig, appNodeModules],
      test: /\.s?[ac]ss$/i,
      use: [
        (prod
          ? MiniCssExtractPlugin.loader
          : 'style-loader'
        ),
        { loader: 'css-loader', options: { importLoaders: 3, sourceMap: !prod } },
        ...globalCSSLoaders(prod),
      ],
    },
    {
      include: [appEntry],
      test: /\.s?[ac]ss$/i,
      use: [
        (prod
          ? MiniCssExtractPlugin.loader
          : 'style-loader'
        ),
        {
          loader: 'css-loader',
          options: {
            importLoaders: 3,
            modules: {
              getLocalIdent: (context, localIdentName, localName) => {
                if (localName.match(/^(GLOBAL_|KEEP_|_)/g)) {
                  return localName.replace(/^(GLOBAL_|KEEP_|_)/g, '')
                }
                const local = context.resourcePath.substring(context.context.length).split('.')[0]
                let localPath = context.context.substring(context.rootContext.length)
                  .replace(/([/\\]+)/g, '/')
                  .replace(/(\/?)(src|components)(\/)/ig, '$1')
                if (local !== '/index') {
                  localPath += local.replace(/[^A-Za-z0-9_]+/ig, '_')
                }

                const localScope = localPath
                  .replace(/[^A-Za-z0-9_]+/ig, ' ')
                  .split(' ')
                  .reduce(capitalize)

                return `${localScope}_${localName}`
              },
              localIdentName: '[folder]_[local]_[hash:base64:5]',
            },
            sourceMap: !prod,
          },
        },
        ...globalCSSLoaders(prod),
      ],
    },
    {
      loader: 'html-loader',
      test: /\.md$/,
    },
    {
      query: {
        name: 'img/[name].[ext]',
        publicPath,
      },
      loader: 'file-loader',
      test: /\.(jpe?g|png|gif|svg)$/i,
    },
    {
      loader: 'file-loader',
      query: {
        name: 'fonts/[name].[ext]',
        publicPath,
      },
      test: /\.(eot|woff|woff2|ttf)$/i,
    },
  ]
}

// eslint-disable-next-line no-extend-native
RegExp.prototype.toJSON = () => `!!js/regexp ${this.toString()}`

module.exports = {
  appEntry,
  appNodeModules,
  getRules,
  globalCSSLoaders,
  outputBasePath: path.join(projectRoot, 'dist', 'public'),
  outputPath: path.join(projectRoot, 'dist', 'public'),
  projectRoot,
  staticPath: path.join(projectRoot, 'static'),
}


module.exports = {
  babelrcRoots: [
    '.',
  ],
  presets: [
    ['@babel/preset-env', {
      corejs: '3',
      modules: false,
      targets: {
        browsers: 'last 3 versions, not ie < 11, not ie_mob < 11',
      },
      useBuiltIns: 'usage',
    }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-react-jsx-source',
    ['module-resolver', { root: ['./src'] }],
  ],
}

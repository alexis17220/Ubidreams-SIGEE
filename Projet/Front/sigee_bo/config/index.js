const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra')

// Configuration Webpack de resolve alias
const { resolve: resolveConfig } = require('./webpack.resolve.config.js')

module.exports = override(
  addWebpackAlias(resolveConfig.alias),
  fixBabelImports('import', {
    libraryName: 'antd',
    style: true,
  }),
  addLessLoader({
    modifyVars: {
      '@primary-color': process.env.REACT_APP_MAIN_COLOR,
    },
    javascriptEnabled: true,
  })
)

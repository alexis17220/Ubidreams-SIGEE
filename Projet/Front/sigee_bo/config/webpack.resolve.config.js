const path = require('path')
const src = '../src'
const nodeModules = '../node_modules'

module.exports = {
  resolve: {
    alias: {
      Views: path.resolve(__dirname, `${src}/Views/`),
      Navigation: path.resolve(__dirname, `${src}/Navigation/`),
      Redux: path.resolve(__dirname, `${src}/Redux/`),
      Resources: path.resolve(__dirname, `${src}/Resources/`),
      Sagas: path.resolve(__dirname, `${src}/Sagas/`),
      Services: path.resolve(__dirname, `${src}/Services/`),
      Theme: path.resolve(__dirname, `${src}/Theme/`),
      Variables: path.resolve(__dirname, `${src}/Theme/Variables`),
      Fonts: path.resolve(__dirname, `${src}/Theme/Fonts`),
      Images: path.resolve(__dirname, `${src}/Images/`),
      Data: path.resolve(__dirname, `${src}/Data/`),
      Config: path.resolve(__dirname, `${src}/Config/`),
      I18n: path.resolve(__dirname, `${src}/I18n/`),
      Components: path.resolve(__dirname, `${src}/Components/`),
      Helpers: path.resolve(__dirname, `${src}/Helpers/`),
    },
  },
}

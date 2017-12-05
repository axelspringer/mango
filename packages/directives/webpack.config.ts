// config & helpers
import Configs, { ENV } from './config/configs'
const { devConfig, prodConfig } = Configs

// webpack
switch (ENV) {
  case 'prod':
  case 'production':
    module.exports = prodConfig
    break
  case 'dev':
  case 'development':
  default:
    module.exports = devConfig
}

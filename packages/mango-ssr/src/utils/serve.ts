import { IConfig } from '../config'
import * as KoaStatic from 'koa-static'

export default (config: IConfig) => KoaStatic(config.serve,
  {
    maxage: config.cache && !config.dev ? 60 * 60 * 24 * 30 : 0,
    gzip: true,
    br: true
  },
)

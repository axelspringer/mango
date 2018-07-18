// use dns cache
import DiscoveryStrategy from './strategy'
import * as URL from 'url-parse'
import { promisify } from 'util'
import { resolveSrv } from 'dns'
import { log, error } from '../utils/log'

const resolve = promisify(resolveSrv)

export default class RandomDiscoveryStrategy extends DiscoveryStrategy {

  constructor() {
    super() // call to
  }

  public async resolve(from) {
    const resolveCache = promisify(this.dnsCache.resolveSrv)

    const url = new URL(from)
    const to = await resolveCache(url.hostname)
      .then(records => {
        if (records.length === 0) {
          return url
        }

        const record = records[RandomDiscoveryStrategy.getRandomInt(0, records.length)]

        if (!record) {
          return url
        }

        url.set('hostname', record.name || url.hostname)
        url.set('port', record.port || url.port)

        return url
      })
      .catch(err => {
        log(error(err))

        return url
      })

    return to.toString()
  }

  public static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

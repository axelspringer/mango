// use dns cache
import DiscoveryStrategy from './strategy'
import * as URL from 'url-parse'
import { log, error } from '../utils/log'
import { DiscoveryStrategyConfig } from './strategy'

export default class RandomDiscoveryStrategy extends DiscoveryStrategy {

  constructor(config: DiscoveryStrategyConfig) {
    super(config) // call to
  }

  public async resolve(from) {
    const url = new URL(from)
    const to = await this.resolveSrv(url)
      .then(records => {
        let cache, ns
        [cache, ns] = records

        records = Array.isArray(ns) ? ns : Array.isArray(cache) ? cache : []
        if (records.length === 0) {
          return url
        }

        const record = records[RandomDiscoveryStrategy.getRandomInt(0, records.length)]

        url.set('hostname', record.name || url.hostname)
        url.set('port', record.port || url.port)

        return url
      })

    return to.toString()
  }

  public static getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
}

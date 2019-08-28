// use dns cache
import DiscoveryStrategy from './strategy'
import * as URL from 'url-parse'
import { log, error } from '../utils/log'
import { DiscoveryStrategyConfig } from './strategy'

export default class SimpleRoundRobin extends DiscoveryStrategy {

  /**
   * Record last selected record
   */
  public lastRecord = 0

  constructor(config: DiscoveryStrategyConfig) {
    super(config) // call to
  }

  public async resolve(from) {
    const url = new URL(from)
    const to = await this.resolveSrv(url)
      .then(records => {
        let cache, ns
        [cache, ns] = records

        // filter records
        records = Array.isArray(cache) ? cache : Array.isArray(ns) ? ns : []
        if (records.length === 0) {
          return url
        }

        const record = this.record(records)

        url.set('hostname', record.name || url.hostname)
        url.set('port', record.port || url.port)

        return url
      })

    return to.toString()
  }

  public record(records) {
    if (this.lastRecord >= records.length - 1 || this.lastRecord < 0) {
      this.lastRecord = 0
      return records[0]
    }

    this.lastRecord += 1 // increase index for selection

    return records[this.lastRecord]
  }
}

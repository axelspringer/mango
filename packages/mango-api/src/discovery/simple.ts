// use dns cache
import DiscoveryStrategy from './strategy'
import * as URL from 'url-parse'
import { promisify } from 'util'
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
    const to = await promisify(this.dnsCache.resolveSrv)(url.hostname)
      .then(records => {
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

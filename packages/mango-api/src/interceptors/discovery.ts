import * as DNSCache from 'dnscache'
import { URL } from 'url'

export class DiscoveryStrategy {

  public static getSrvURI(record) {
    return `${record.name}:${record.port}`
  }

  constructor() { }
}

export class RandomDiscoveryStrategy extends DiscoveryStrategy {

  constructor() {
    super()
  }

  public async resolve(config, wp, dnsCache) {
    return new Promise(function (resolve, _) {
      const url = new URL(wp)
      dnsCache.resolveSrv(url.hostname, function (err, records) {
        if (err || !records) {
          return resolve(config)
        }
        url.host = DiscoveryStrategy.getSrvURI(records[RandomDiscoveryStrategy.getRandomInt(0, records.length)])
        config.baseURL = url.toString()
        return resolve(config)
      })
    })
  }

  public static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

export class Discovery {

  public dnsCache
  public defaults = {
    enable: true,
    ttl: 60,
    cachesize: 100
  }

  constructor(public wp, public strategy, settings = {}) {
    this.defaults = Object.assign(this.defaults, settings)
    this.dnsCache = DNSCache(this.defaults)
    this.config = this.config.bind(this)
  }

  public use() {
    return [this.config, this.error]
  }

  public async config(config) {
    try {
      return await this.strategy.resolve(config, this.wp, this.dnsCache)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public error(error) {
    // Do something with request error
    return Promise.reject(error)
  }
}

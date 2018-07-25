import '../utils/almost'
import * as DNSCache from 'dnscache'

export interface DiscoveryRecord {
  priority?: number,
  weight?: number,
  port?: number,
  name?: string
}

export interface DiscoveryStrategyConfig {
  dnsCacheConfig?: any
}

export default class DiscoveryStrategy {
  public dnsCache

  constructor(public config: DiscoveryStrategyConfig = {}) {
    // init the dns cache
    this.dnsCache = DNSCache(config.dnsCacheConfig)
  }
}

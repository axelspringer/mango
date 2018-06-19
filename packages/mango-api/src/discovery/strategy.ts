import * as DNSCache from 'dnscache'
import Defaults from './defaults'

export default class DiscoveryStrategy {

  public dnsCacheConfig
  public dnsCache

  constructor() {
    this.dnsCacheConfig = Defaults.DNSCache

    // init the dns cache
    this.dnsCache = DNSCache(this.dnsCacheConfig)
  }
}

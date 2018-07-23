import { promisify } from 'util'
import { resolveSrv } from 'dns'
import '../utils/almost'
import * as DNSCache from 'dnscache'
import Defaults from './defaults'

const resolve = promisify(resolveSrv)

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
    this.dnsCache = DNSCache(config.dnsCacheConfig || Defaults.DNSCache)
  }

  public resolveSrv(url): Promise<any[]> {
    // map to promise
    const resolveCache = promisify(this.dnsCache.resolveSrv)

    // get back from dns
    return Promise.almost([resolveCache(url.hostname), resolve(url.hostname)])
  }
}

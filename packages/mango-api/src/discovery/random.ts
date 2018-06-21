// use dns cache
import DiscoveryStrategy from './strategy'
import * as URL from 'url-parse'

export default class RandomDiscoveryStrategy extends DiscoveryStrategy {

  constructor() {
    super() // call to
  }

  public async resolve(from) {
    const url = new URL(from)
    const to = await new Promise((resolve, _) => {
      this.dnsCache.resolveSrv(url.hostname, (err, records) => {
        if (err || !records || records.length === 0) {
          return resolve(url)
        }

        const record = records[RandomDiscoveryStrategy.getRandomInt(0, records.length)]

        if (!record) {
          return resolve(url)
        }

        url.set('hostname', record.name || url.hostname)
        url.set('port', record.port || url.port)

        resolve(url)
      })
    })

    return to.toString()
  }

  public static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

import axios from 'axios'
import hashing from './hashing'
import Defaults from './defaults'
import Hashable from './hashable'
import Cachable from './cachable'
import { log, error } from '../utils/log'
import * as LRU from 'lru-cache'

export default function (config: any = {}) {
  // we should do asseration here

  // create discovery
  const discovery = new config.discovery(config)

  //  create LRU
  const cache = new LRU({
    max: 500,
    maxAge: config.cache ? 60 * 1000 : 0
  })

  // axios adapter. receives the axios request config as only parameter
  async function adapter(req) {
    // make discovery
    req.url = await discovery.resolve(req.url)

    // if not is an allows cache method
    if (Defaults.AllowedCacheMethods.indexOf(req.method) === -1
      || !config.cache // do not cache
      || (req.params.preview && req.params.preview == true) // do not filter on preview
      || (req.params.cache && req.params.cache == false)) { // do not filter on cache ignore
      return axios.defaults.adapter(req)
    }

    // create hashable
    const hashable = new Hashable(req)

    // a hash that represents the query
    const hash = hashing(hashable)

    // try to get object from cache
    const cachable = cache.get(hash)

    // if there should be nothing in the cache
    if (!cachable) {
      const res: any = await axios.defaults.adapter(req)

      try { // try to cache
        if (res.status === 200) {
          cache.set(hash, JSON.stringify(new Cachable(res)))
        }
      } catch (e) {
        log(error(e))
      }

      // indicate non hit
      res.hit = false

      return res
    }

    // try to
    return new Cachable(JSON.parse(cachable))
  }

  return {
    adapter,
    config
  }
}

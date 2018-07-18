import axios from 'axios'
// import serialize from './serialize'
import hashing from './hashing'
import levelup from 'levelup'
import memdown from 'memdown'
import encode from 'encoding-down'
import Defaults from './defaults'
import Hashable from './hashable'
import Cachable from './cachable'
import * as ttl from 'level-ttl'

export default function (config: any = {}) {
  // we should do asseration here

  // create discovery
  const discovery = new config.discovery(config)

  // create db
  let db = levelup(encode(memdown(), { valueEncoding: 'json' })) // create database

  // set time to live
  db = ttl(db, { defaultTTL: 60 * 1000 }) // one minute

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

    // try to get cashable
    const hashable = new Hashable(req)
    const hash = hashing(hashable)

    // return promise to cache
    const res = await db.get(hash, { asBuffer: false })
      .then(cache => new Cachable(cache))
      .then(cache => {
        cache.hit = true
        cache.request = req
        return cache
      })
      .catch(async () => { // err could also be update
        const res: any = await axios.defaults.adapter(req)

        if (res.status !== 200) {
          return res
        }

        try {
          await db.put(hash, new Cachable(res))
        } catch (e) {
          console.log(e)
        }

        res.hit = false
        return res
      })

    return res
  }

  return {
    adapter,
    config
  }
}

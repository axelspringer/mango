import axios from 'axios'
// import serialize from './serialize'
import hashing from './hashing'
import levelup from 'levelup'
import memdown from 'memdown'
import encode from 'encoding-down'
import Defaults from './defaults'
import Hashable from './hashable'
import Cachable from './cachable'

export default function (config: any = {}) {
  // we should do asseration here

  // create discovery
  const discovery = new config.discovery(config)

  // create db
  const db = levelup(encode(memdown(), { valueEncoding: 'json' })) // create database

  // axios adapter. receives the axios request config as only parameter
  async function adapter(req) {
    // make discovery
    req.url = await discovery.resolve(req.url)

    // nothing in the cache, so use the default adapter
    const res = await axios.defaults.adapter(req)

    // return if not cache
    if (!config.cache) {
      return res as any
    }

    // if not is an allows cache method
    if (Defaults.AllowedCacheMethods.indexOf(req.method) === -1
      || res.status !== 200) {
      return res // just return res
    }

    // try to get cashable
    const hashable = new Hashable(req)
    const hash = hashing(hashable)

    // try to get from db, otherwise
    db.get(hash, { asBuffer: false }, (err, value) => { // try to get from store
      const cachable = new Cachable(res.data, Date.now()) // cache date with timestamp
      let cache

      if (err && err.notFound) {
        db.put(hash, cachable, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }

      if (err || !value) {
        return res // just return
      }

      cache = new Cachable(value.data, value.timestamp)
      if ((Date.now() - cache.timestamp) >= Defaults.Time) {
        db.put(hash, cachable, (err) => {
          if (err) {
            console.log(err)
          }
          console.log('updated')
        })
      }

      res.data = value // set cache value
    })

    return res as any
  }

  return {
    adapter,
    config
  }
}

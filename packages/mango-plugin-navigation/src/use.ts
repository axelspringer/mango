import Loader from './loader'
import Query from './query'

// apply
export default (loader, query) => {
  const plugin = Query()

  for (const prop in Loader) { // attach loaders
    if (Loader.hasOwnProperty(prop)) {
      // code here
      loader.addResolver(prop, Loader[prop])
    }
  }

  for (const prop in plugin) {
    if (plugin.hasOwnProperty(prop)) {
      query[prop] = plugin[prop]
    }
  }
}

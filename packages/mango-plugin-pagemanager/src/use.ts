import Loader from './loader'
import Query from './query'

// apply
export default (loader, query) => {
  for (const prop in Loader) { // attach loaders
    if (Loader.hasOwnProperty(prop)) {
      // code here
      loader.addResolver(prop, Loader[prop])
    }
  }

  for (const prop in Query) {
    if (Query.hasOwnProperty(prop)) {
      query[prop] = Query[prop]
    }
  }
}

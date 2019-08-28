import Loader from './loader'
import Query from './query'
import Mutation from './mutation'

// apply
export default (loader, query, mutation) => {
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

  for (const prop in Mutation) {
    if (Mutation.hasOwnProperty(prop)) {
      mutation[prop] = Mutation[prop]
    }
  }
}

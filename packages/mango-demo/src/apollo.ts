import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { Config } from './config'
import 'isomorphic-fetch'

// Install the vue plugin
// Vue.use(VueApollo)

// Create the apollo client
export function createApolloClient(isSSR = false) {
  const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: Config.MangoUrl
  })

  const cache = new InMemoryCache()

  // If on the client, recover the injected state
  if (!isSSR) {
    // If on the client, recover the injected state
    if (typeof window !== 'undefined') {
      const state = window.__APOLLO_STATE__
      if (state) {
        // If you have multiple clients, use `state.<client_id>`
        cache.restore(state.defaultClient)
      }
    }
  }

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
    connectToDevTools: true,
    ...(isSSR ? {
      // Set this on the server to optimize queries when SSR
      ssrMode: true,
    } : {
        // This will temporary disable query force-fetching
        ssrForceFetchDelay: 100,
      }),
  })

  return apolloClient
}

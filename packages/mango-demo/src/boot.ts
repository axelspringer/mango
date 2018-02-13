import { App } from './components/app'
import { pagemanager, mango } from './mango'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient } from './apollo'

// create function
export default function (ctx) {
  // apollo
  const apolloClient = createApolloClient(ctx || false)
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })

  if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }

  // route state store
  sync(store, router)

  // constructing app
  const app = new Vue({
    router,
    store,
    pagemanager,
    provide: apolloProvider.provide(),
    mango,
    render: (h) => h(App)
  })

  return { app, router, store, apolloProvider }
}

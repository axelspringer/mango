import { App } from './components/app'
import { pagemanager, mango } from './mango'
import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'
import Vue from 'vue'

// create function
export default function () {
  // route state store
  sync(store, router)

  // constructing app
  const app = new Vue({
    router,
    store,
    pagemanager,
    mango,
    render: (h) => h(App)
  })

  return { app, router, store }
}

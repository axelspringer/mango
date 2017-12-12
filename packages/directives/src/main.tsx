/* tslint:disable:max-classes-per-file */
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Vue } from 'vue-property-decorator'
import VueApollo from 'vue-apollo'
import Mango from './index'
import Root from './root.vue'
import MyPosts from './posts.vue'

// Use new Apollo Client, connect to devs
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql' // use Mango Api  dev
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true, // this is for easying development
})

// Install Plugin + Mixins
Vue.use(VueApollo)
Vue.use(Mango)
Vue.component('my-posts', MyPosts)

// create apollo provider
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

// bootstrap testing app
const boostrap = new Vue({
  apolloProvider,
  render: (h) => h(Root)
} as any)

// mount app in dom (index.html)
boostrap.$mount('#app')

import Vue from 'vue'
import Component from 'vue-class-component'
import Mango from './index'
import Posts from './components/posts'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8080'
})

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

@Component
class Root extends Vue {
  public render(h) {
    // mounting test provider
    return (
      <Mango client={apolloClient}>
        <Posts />
      </Mango>
    )
  }
}

const boostrap = new Vue({
  render: (h) => h(Root)
})

boostrap.$mount('#app')

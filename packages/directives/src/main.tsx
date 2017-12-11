/* tslint:disable:max-classes-per-file */

import Mango from './index'
import Posts from './components/posts'
import gql from 'graphql-tag'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Component, Inject, Prop, Provide, Watch, Vue } from 'vue-property-decorator'
import VueApollo from 'vue-apollo'
import { willPrefetch } from 'vue-apollo'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8080/graphql'
})

// client and caching
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo)

// create apollo provider
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

@Component({
  apollo: {
    posts: {
      query: gql`
        query Query {
          posts {
            title
          }
        }
      `,
      prefetch: true
    }
  },
  data() {
    return {
      posts: []
    }
  }
} as any)
class TPosts extends Vue {

  public render(h) {
    // mounting test provider
    return <div>{this.posts.map(post => <h2>{post.title}</h2>)}</div>
  }
}

const Posts = willPrefetch(TPosts)

@Component
class Root extends Vue {

  public render(h) {
    // mounting test provider
    return <Posts />
  }
}

const boostrap = new Vue({
  apolloProvider,
  render: (h) => h(Root)
} as any)

boostrap.$mount('#app')

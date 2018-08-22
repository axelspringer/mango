const { GraphQLObjectType, GraphQLList, GraphQLInt } = require('graphql')
import SearchResultItemType from './searchResultItemType'

export default new GraphQLObjectType({
  name: 'SearchResult',
  fields: () => ({
    result: {
      type: new GraphQLList(SearchResultItemType),
      resolve: search => search.result
    },
    perPage: {
      type: GraphQLInt,
      resolve: search => search.per_page
    },
    page: {
      type: GraphQLInt,
      resolve: search => search.page
    }
  })
})

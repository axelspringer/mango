const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
import PageManagerType from './pageManagerType'

export default new GraphQLObjectType({
  name: 'WPTag',
  description: 'Wordpress tag object https://developer.wordpress.org/rest-api/reference/tags/',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    count: {
      type: GraphQLInt
    },
    description: {
      type: GraphQLString
    },
    link: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    taxonomy: {
      type: GraphQLString
    },
    meta: {
      type: GraphQLString
    },
    pagemanager: {
      type: PageManagerType,
      resolve: page => page.pagemanager
    },
  })
})

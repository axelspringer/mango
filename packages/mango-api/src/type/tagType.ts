const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
import EmbeddedType from './embeddedType'

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
      type: EmbeddedType,
      resolve: tag => tag.pagemanager
    },
    embedded: {
      type: EmbeddedType,
      resolve: tag => tag._embedded
    }
  })
})

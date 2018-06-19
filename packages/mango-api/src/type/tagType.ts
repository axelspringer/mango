const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
import EmbeddedType from './embeddedType'
import PolylangTranslationType from './polylangTranslationType'

export default new GraphQLObjectType({
  name: 'WPTag',
  description: 'Wordpress tag object https://developer.wordpress.org/rest-api/reference/tags/',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: tag => tag.id
    },
    count: {
      type: GraphQLInt,
      resolve: tag => tag.count
    },
    description: {
      type: GraphQLString,
      resolve: tag => tag.description
    },
    link: {
      type: GraphQLString,
      resolve: tag => tag.link
    },
    name: {
      type: GraphQLString,
      resolve: tag => tag.name
    },
    slug: {
      type: GraphQLString,
      resolve: tag => tag.slug
    },
    taxonomy: {
      type: GraphQLString,
      resolve: tag => tag.taxonomy
    },
    meta: {
      type: new GraphQLList(GraphQLString),
      resolve: tag => tag.meta
    },
    lang: {
      type: GraphQLString,
      resolve: tag => tag.lang
    },
    acf: {
      type: EmbeddedType,
      resolve: tag => tag.acf
    },
    translations: {
      type: PolylangTranslationType,
      resolve: (tag, args, ctx) => ctx.loader.getPolylangTags(ctx, tag.translations, args)
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

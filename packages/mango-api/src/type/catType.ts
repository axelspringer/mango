const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
import EmbeddedType from './embeddedType'
import PolylangTranslationType from './polylangTranslationType'

const CategoryType = new GraphQLObjectType({
  name: 'WPCategory',
  description: 'Wordpress category object',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: cat => cat.id
    },
    count: {
      type: GraphQLInt,
      resolve: cat => cat.count
    },
    description: {
      type: GraphQLString,
      resolve: cat => cat.description
    },
    link: {
      type: GraphQLString,
      resolve: cat => cat.link
    },
    name: {
      type: GraphQLString,
      resolve: cat => cat.name
    },
    slug: {
      type: GraphQLString,
      resolve: cat => cat.slug
    },
    taxonomy: {
      type: GraphQLString,
      resolve: cat => cat.taxonomy
    },
    lang: {
      type: GraphQLString,
      resolve: cat => cat.lang
    },
    translations: {
      type: PolylangTranslationType,
      resolve: (cat, args, ctx) => ctx.loader.getPolylangCategories(ctx, cat, args)
    },
    parent: {
      type: CategoryType,
      resolve: (cat, args, ctx) => ctx.loader.getCategory(ctx, cat.parent, args)
    },
    meta: {
      type: new GraphQLList(GraphQLString),
      resolve: cat => cat.meta
    },
    pagemanager: {
      type: EmbeddedType,
      resolve: cat => cat.pagemanager
    },
    acf: {
      type: EmbeddedType,
      resolve: cat => cat.acf
    },
    embedded: {
      type: EmbeddedType,
      resolve: cat => cat._embedded
    }
  })
})

export default CategoryType

import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
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
    parent: {
      type: CategoryType,
      resolve: (cat, args, ctx) => ctx.loader.getCategory(ctx, cat.parent, args)
    },
    meta: {
      type: new GraphQLList(GraphQLString),
      resolve: cat => cat.meta
    }
  })
})

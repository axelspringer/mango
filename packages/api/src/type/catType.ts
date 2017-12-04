import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

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
    }
  })
})

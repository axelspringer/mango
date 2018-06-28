import { GraphQLObjectType } from 'graphql'

export const createQuery = query => new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all WordPress queries.',
  fields: () => query
})

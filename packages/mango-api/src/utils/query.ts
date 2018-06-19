import { GraphQLObjectType } from 'graphql'

export const createQuery = query => new GraphQLObjectType({
  name: 'WP',
  description: 'The root of all WordPress queries',
  fields: () => query
})

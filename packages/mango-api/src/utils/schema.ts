const { GraphQLSchema } = require('graphql')

export const createSchema = (query) => new GraphQLSchema({
  query
})

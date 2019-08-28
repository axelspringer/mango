const { GraphQLSchema } = require('graphql')

export const createSchema = (query, mutation) => {
  const schema: any = { query }

  if (mutation) { // this should be undefined in any other case
    schema.mutation = mutation
  }

  return new GraphQLSchema({ query, mutation })
}

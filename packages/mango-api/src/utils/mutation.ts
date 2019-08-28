import { GraphQLObjectType } from 'graphql'

export const createMutation = mutation => {
  if (mutation && Object.keys(mutation).length === 0) {
    return
  }

  return new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root of all WordPress mutations',
    fields: () => mutation
  })
}


const { GraphQLUnionInputType, GraphQLList, GraphQLInt } = require('graphql')

export const QueryIdType = new GraphQLUnionInputType({
  name: 'QueryIdType',
  types: [GraphQLList(GraphQLInt), GraphQLInt],
  resolveType(value) {
    if (typeof value === 'string') {
      return GraphQLInt
    }

    if (typeof value === 'object' && Array.isArray(value)) {
      return GraphQLList(GraphQLInt)
    }
  }
})

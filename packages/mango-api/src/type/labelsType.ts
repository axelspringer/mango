const { GraphQLScalarType } = require('graphql')

export default new GraphQLScalarType({
  name: 'Labels',
  description: 'Contains a label object',
  parseValue: value => value, // not yet send anything from the client
  serialize: labels => !Array.isArray(labels) ? labels : {},
  parseLiteral: ast => ast.value
})

const { GraphQLScalarType } = require('graphql')

export default new GraphQLScalarType({
  name: 'ACFFields',
  description: 'Contains ACF fields attached content',
  parseValue: value => value, // not yet send anything from the client
  serialize: acf => !Array.isArray(acf) ? acf : {},
  parseLiteral: ast => ast.value
})

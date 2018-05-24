const { GraphQLScalarType } = require('graphql')

export default new GraphQLScalarType({
  name: 'PageManagerFields',
  description: 'Contains the Page Manager Settings',
  parseValue: value => value, // not yet send anything from the client
  serialize: pm => !Array.isArray(pm) ? pm : {},
  parseLiteral: ast => ast.value
})

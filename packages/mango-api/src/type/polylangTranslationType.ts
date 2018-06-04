const { GraphQLScalarType } = require('graphql')

export default new GraphQLScalarType({
  name: 'PolylangTranslation',
  description: 'Contains related Polylang translations',
  parseValue: value => value, // not yet send anything from the client
  serialize: translations => translations.reduce((trans, data) => ({ ...trans, [data.lang]: data }), {}),
  parseLiteral: ast => ast.value
})

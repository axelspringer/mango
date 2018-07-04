const { GraphQLScalarType } = require('graphql')

export default new GraphQLScalarType({
  name: 'PolylangTranslation',
  description: 'Contains related Polylang translations',
  parseValue: value => value, // not yet send anything from the client
  serialize: translations => translations !== null ?
    translations.reduce((trans, data) => data === null ? ({ ...trans }) : ({ ...trans, [data.lang]: data }), {}) : translations,
  parseLiteral: ast => ast.value
})

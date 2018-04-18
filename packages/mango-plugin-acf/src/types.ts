const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')

export const WidgetTypeACF = new GraphQLObjectType({
  name: 'WidgetTypeACF',
  description: 'name-value paring of result',
  fields: {
    subline: { type: GraphQLString },
    active_from: { type: GraphQLString },
    active_till: { type: GraphQLString }
  }
})

export const ACF = new GraphQLObjectType({
  name: 'ACF',
  description: 'Common ACF interface',
  fields: () => ({
    acf: {
      type: WidgetTypeACF
    }
  })
})

const {
  GraphQLObjectType,
  GraphQLString,
  // GraphQLList,
} = require('graphql')

export const WidgetTypeACF = new GraphQLObjectType({
  name: 'WidgetTypeACF',
  description: 'name-value paring of result',
  fields: {
    subline: {
      type: GraphQLString,
      resolve: acf => acf.subline
    },
    active_from: {
      type: GraphQLString,
      resolve: acf => acf.active_from
    },
    active_till: {
      type: GraphQLString,
      resolve: acf => acf.active_till
    }
  }
})

export const ACFPostFields = new GraphQLObjectType({
  name: 'ACFPostFields',
  description: 'Common ACF interface',
  fields: () => ({
    acf: {
      type: WidgetTypeACF,
      resolve: acf => acf.acf
    }
  })
})

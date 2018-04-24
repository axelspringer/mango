const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = require('graphql')

export const PostTypeACF = new GraphQLObjectType({
  name: 'PostTypeACF',
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
      type: new GraphQLList(PostTypeACF),
      resolve: acf => acf
    }
  })
})

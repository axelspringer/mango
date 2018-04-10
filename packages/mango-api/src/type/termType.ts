import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

export const TermType = new GraphQLObjectType({
  name: 'WPTerm',
  description: 'Wordpress Terms object',
  fields: () => ({
    term_id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    term_group: {
      type: GraphQLInt
    },
    term_taxonomy_id: {
      type: GraphQLInt
    },
    taxonomy: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    parent: {
      type: GraphQLInt
    },
    count: {
      type: GraphQLInt
    },
    filter: {
      type: GraphQLString
    }
  })
})

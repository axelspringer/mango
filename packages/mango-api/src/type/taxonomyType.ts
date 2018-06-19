const { GraphQLObjectType, GraphQLBoolean, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
import LabelsType from './labelsType'

export default new GraphQLObjectType({
  name: 'WPTaxonomy',
  description: 'Wordpress Taxonomy',
  fields: () => ({
    description: {
      type: GraphQLString
    },
    hierarchical: {
      type: GraphQLBoolean
    },
    labels: {
      type: LabelsType
    },
    name: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    show_cloud: {
      type: GraphQLBoolean
    },
    type: {
      type: new GraphQLList(GraphQLString)
    },
    rest_base: {
      type: GraphQLString
    }
  })
})

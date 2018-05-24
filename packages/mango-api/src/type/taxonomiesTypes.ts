const { GraphQLObjectType } = require('graphql')
import TaxonomyType from './taxonomyType'

export default new GraphQLObjectType({
  name: 'WPTaxonomies',
  description: 'Wordpress term object',
  fields: () => ({
    category: {
      type: TaxonomyType,
      resolve: taxonomies => taxonomies.category
    },
    postTag: {
      type: TaxonomyType,
      resolve: taxonomies => taxonomies.post_tag
    }
  })
})

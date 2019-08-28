const { GraphQLUnionType } = require('graphql')
import PageType from './pageType'
import PostType from './postType'

export default new GraphQLUnionType({
  name: 'SlugType',
  types: [PageType, PostType],
  resolveType: (data) => {
    if (data.type === 'page') {
      return PageType
    }

    if (data.type === 'post') {
      return PostType
    }
  }
})

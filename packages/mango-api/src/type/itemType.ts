const { GraphQLUnionType } = require('graphql')
import PageType from './pageType'
import PostType from './postType'

export default new GraphQLUnionType({
  name: 'ItemType',
  types: [PageType, PostType],
  resolveType: (data) => {
    if (!data.type) {
      return
    }

    if (data.type === 'page') {
      return PageType
    }

    return PostType
  }
})

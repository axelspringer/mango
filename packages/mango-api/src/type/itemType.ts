const { GraphQLUnionType } = require('graphql')
import PageType from './pageType'
import PostType from './postType'
import CategoryType from './catType'

export default new GraphQLUnionType({
  name: 'ItemType',
  types: [PageType, PostType, CategoryType],
  resolveType: (data) => {
    if (data.type === 'page') {
      return PageType
    }

    if (data.taxonomy === 'category') {
      return CategoryType
    }

    return PostType // do nothing if not matched
  }
})

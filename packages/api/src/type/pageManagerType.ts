import { GraphQLUnionType } from 'graphql'
import { SelectedArticles } from './pageManagerBlockType'

enum BlockTypes {
  SelectedArticles = 'selected_articles'
}

export const PageManagerBlock = new GraphQLUnionType({
  name: 'PageManagerBlock',
  types: [SelectedArticles],
  resolveType(value) {
    if (value.page_block === BlockTypes.SelectedArticles) {
      return SelectedArticles
    }
  }
})

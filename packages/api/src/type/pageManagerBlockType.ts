import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import { PostType } from './postType'

export const SelectedArticlesSettings = new GraphQLObjectType({
  name: 'SelectedArticlesSettings',
  description: 'Selected articles settings',
  fields: () => ({
    formats: {
      type: new GraphQLList(GraphQLString),
      resolve: settings => settings.formats
    }
  })
})

export const SelectedArticlesWidget = new GraphQLObjectType({
  name: 'SelectedArticlesWidget',
  description: 'This contains the selected articles widget settings',
  fields: () => ({
    type: {
      type: GraphQLString,
      resolve: widget => widget.type
    },
    name: {
      type: GraphQLString,
      resolve: widget => widget.name
    },
    value: {
      type: new GraphQLList(GraphQLInt),
      resolve: widget => widget.value
    },
    settings: {
      type: SelectedArticlesSettings,
      resolve: widget => widget.settings
    }
  })
})

export const SelectedArticles = new GraphQLObjectType({
  name: 'SelectedArticles',
  description: 'This is a Page Manager Block which contains selected articles',
  fields: () => ({
    pageBlock: {
      type: GraphQLString,
      resolve: block => block.page_block
    },
    widgetSettings: {
      type: new GraphQLList(SelectedArticlesWidget),
      resolve: block => block.widget_settings
    },
    language: {
      type: GraphQLString,
      resolve: block => block.language
    },
    result: {
      type: new GraphQLList(PostType),
      resolve: block => block.result
    }
  })
})

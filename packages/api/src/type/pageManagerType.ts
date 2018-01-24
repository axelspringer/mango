import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'
import { PostType } from './postType'

export const PageManagerBlock = new GraphQLObjectType({
  name: 'PageManagerBlock',
  description: 'Contains a Page Manager block',
  fields: () => ({
    pageBlock: {
      type: GraphQLString,
      resolve: block => block.page_block
    },
    language: {
      type: GraphQLString,
      resolve: block => block.language
    },
    widgetSettings: {
      type: new GraphQLList(PageManagerWidgetSettings),
      resolve: block => block.widget_settings
    },
    result: {
      type: new GraphQLList(PostType),
      resolve: block => block.result
    }
  })
})

export const PageManagerWidgetSettings = new GraphQLObjectType({
  name: 'PageManagerWidgetSetting',
  description: 'Contains a Widget Settings',
  fields: () => ({
    type: {
      type: GraphQLString,
      resolve: setting => setting.type
    },
    name: {
      type: GraphQLString,
      resolve: setting => setting.name
    },
    value: {
      type: new GraphQLList(GraphQLInt),
      resolve: setting => setting.value
    }
  })
})

export const PageManagerCategoryType = new GraphQLObjectType({
  name: 'PageManagerCategory',
  description: 'Displays a managed category',
  fields: () => ({
    pageBlocks: {
      type: new GraphQLList(PageManagerBlock),
      resolve: blocks => blocks
    }
  })
})

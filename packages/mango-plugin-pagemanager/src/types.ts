const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLScalarType,
  GraphQLNonNull
} = require('graphql')

//const { PostType } = require('@axelspringer/mango-api')

export const PageManagerMeta = new GraphQLObjectType({
  name: 'PageManagerMeta',
  fields: {
    language: { type: new GraphQLNonNull(GraphQLString) },
    scope: { type: GraphQLString },
    type: { type: GraphQLString }
  }
})

export const WidgetValueType = new GraphQLScalarType({
  name: 'WidgetValueType',
  parseValue: value => value,
  serialize: value => value,
  parseLiteral: ast => ast.value
})

export const WidgetTypePageManager = new GraphQLObjectType({
  name: 'WidgetTypePageManager',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: WidgetValueType }
  }
})

export const PageManagerBlock = new GraphQLObjectType({
  name: 'PageManagerBlock',
  fields: {
    page_block: { type: new GraphQLNonNull(GraphQLString) },
    result: { type: GraphQLList(WidgetTypePageManager) }
  }
})

export const PageManager = new GraphQLObjectType({
  name: 'PageManager',
  description: 'Common PageManager interface',
  fields: () => ({
    meta: { type: PageManagerMeta },
    data: { type: GraphQLList(PageManagerBlock) }
  })
})

export const PageManagerLanguage = new GraphQLObjectType({
  name: 'PageManagerLanguage',
  fields: {
    locale: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    }
  }
})

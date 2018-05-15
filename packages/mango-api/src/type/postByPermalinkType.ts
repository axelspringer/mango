// import { PageManager } from '../../../mango-plugin-pagemanager/src/types';
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql'
import { CategoryType } from './catType'
import { TagType } from './tagType'
import { Language } from './languageType'

const { PageManager } = require('@axelspringer/mango-plugin-pagemanager')

export const PostByPermalinkResult = new GraphQLObjectType({
  name: 'PostByPermalink',
  description: 'Retrieves a post by a given permalink',
  fields: () => ({
    ID: {
      type: GraphQLInt
    },
    author: {
      type: GraphQLString
    },
    date: {
      type: GraphQLString
    },
    date_gmt: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    excerpt: {
      type: GraphQLString
    },
    status: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    modified: {
      type: GraphQLString
    },
    modified_gmt: {
      type: GraphQLString
    },
    content_filtered: {
      type: GraphQLString
    },
    parent: {
      type: GraphQLInt
    },
    guid: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    language: {
      type: Language
    },
    categories: {
      type: new GraphQLList(CategoryType)
    },
    tags: {
      type: new GraphQLList(TagType)
    },
    pagemanager: {
      type: PageManager
    }
  })
})

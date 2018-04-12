const { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLString, GraphQLInt } = require('graphql')
import { GraphQLDateTime } from 'graphql-iso-date'
import { CategoryType } from './catType'
import { UserType } from './userType'
import { TagType } from './tagType'

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Contains a Post from WordPress',
  fields: () => ({
    date: {
      type: GraphQLDateTime,
      resolve: post => post.date
    },
    dateGmt: {
      type: GraphQLDateTime,
      resolve: post => post.date_gmt.rendered
    },
    id: {
      type: GraphQLString,
      resolve: post => post.id
    },
    link: {
      type: GraphQLString,
      resolve: post => post.link
    },
    modified: {
      type: GraphQLDateTime,
      resolve: post => post.modified
    },
    modifiedGmt: {
      type: GraphQLDateTime,
      resolve: post => post.modified_gmt
    },
    status: {
      type: GraphQLString,
      resolve: post => post.status
    },
    type: {
      type: GraphQLString,
      resolve: post => post.type
    },
    password: {
      type: GraphQLString,
      resolve: post => post.password
    },
    excerpt: {
      type: GraphQLString,
      resolve: post => post.excerpt.rendered
    },
    featuredMedia: {
      type: GraphQLInt,
      resolve: post => post.featured_media
    },
    commentStatus: {
      type: GraphQLString,
      resolve: post => post.comment_status
    },
    pingStatus: {
      type: GraphQLString,
      resolve: post => post.ping_status
    },
    title: {
      type: GraphQLString,
      resolve: post => post.title.rendered
    },
    sticky: {
      type: GraphQLBoolean,
      resolve: post => post.sticky
    },
    meta: {
      type: new GraphQLList(GraphQLString),
      resolve: post => post.meta
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: (root, args, ctx) => ctx.loader.getCategories(ctx, root.categories, args)
    },
    template: {
      type: GraphQLString,
      resolve: post => post.template
    },
    content: {
      type: GraphQLString,
      resolve: post => post.content.rendered
    },
    slug: {
      type: GraphQLString,
      resolve: post => post.slug
    },
    author: {
      type: UserType,
      resolve: (root, args, ctx) => ctx.loader.getUser(ctx, root.author, args)
    },
    format: {
      type: GraphQLString,
      resolve: post => post.format
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve: (root, args, ctx) => ctx.loader.getTags(ctx, root.tags, args)
    },
    img: {
      type: GraphQLString,
      resolve: post => post._links['wp:attachment'][0].href
    }
  }),
})

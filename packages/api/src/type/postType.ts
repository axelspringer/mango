import { GraphQLObjectType, GraphQLList, GraphQLBoolean, GraphQLString, GraphQLInt } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'
import { CategoryType } from './catType'

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Contains a Post from WordPress',
  fields: () => ({
    date: {
      type: GraphQLDateTime,
      resolve: post => post.date
    },
    date_gmt: {
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
    modified_gmt: {
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
    featured_media: {
      type: GraphQLInt,
      resolve: post => post.featured_media
    },
    comment_status: {
      type: GraphQLString,
      resolve: post => post.comment_status
    },
    ping_status: {
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
      type: GraphQLInt,
      resolve: post => post.author
    },
    format: {
      type: GraphQLString,
      resolve: post => post.format
    }
  }),
})

import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Contains a Post from WordPress',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: post => post.id
    },
    title: {
      type: GraphQLString,
      resolve: post => post.title.rendered
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

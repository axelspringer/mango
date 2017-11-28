import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } from 'graphql'
import { fetchPosts, fetchPost } from './resolvers'

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

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: (_, args) => fetchPosts(args),
    },
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (_, args) => fetchPost(args.id, args)
    }
  }),
})

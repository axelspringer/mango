import { GraphQLObjectType, GraphQLList } from 'graphql'
import { PostType } from './postType'

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all WordPress queries',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: (_, args, ctx) => ctx.loader.getPosts(ctx, args)
    }
  }),
})

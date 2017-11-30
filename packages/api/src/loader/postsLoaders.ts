import { GraphQLContext } from 'graphql'

export const fetchPosts = async (ctx: GraphQLContext, args) => {
  let data
  try {
    data = await ctx.loaders.fetchWp('/posts', args)
  } catch (err) {
    return null
  }
  return data
}

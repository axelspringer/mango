import { GraphQLContext } from 'graphql'

export default class Loader {

  public addResolver(name, func) {
    this[name] = func.bind(this)
  }

  public async _fetcher(ctx: GraphQLContext, url, params = {}) {
    let data
    try {
      data = await ctx.axios.get(url, { params }).then(res => res.data)
    } catch (err) {
      return null
    }
    return data
  }
}

import axios from 'axios'
import { GraphQLContext } from 'graphql'

export class Loader {
  protected async _fetcher(ctx: GraphQLContext, url, params = {}) {
    let data
    try {
      data = await axios.get(ctx.config.endpoint + url, { params }).then(res => res.data)
    } catch (err) {
      return null
    }
    return data
  }
}

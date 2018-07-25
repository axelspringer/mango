import { log, error } from '../utils/log'

export default class Loader {
  public async _fetcher(ctx, url, params = {}) {
    let data
    try {
      data = await ctx.axios.get(url, { params }).then(res => res.data)
    } catch (err) {
      log(error(err))
      return null
    }
    return data
  }
}

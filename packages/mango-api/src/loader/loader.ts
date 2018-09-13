import { log, error } from '../utils/log'

export default class Loader {
  public addResolver(name, func) {
    this[name] = func.bind(this)
  }

  public async _fetcher(ctx, url, params = {}, isGet: boolean = true) {
    let data
    try {
      if (!isGet) {
        data = await ctx.axios.post(url, { params }).then(res => res.data)
      }
      
      if (isGet) {
        data = await ctx.axios.get(url, { params }).then(res => res.data)
      }
    } catch (err) {
      log(error(err))
      return null
    }
    return data
  }
}

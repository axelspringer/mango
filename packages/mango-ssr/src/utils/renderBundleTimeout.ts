import cacheControl from './cacheControl'
import timeout from './timeoutPromise'
import { promisify } from 'util'

export default function (renderer, ctx, context) {
  const { config } = ctx.state
  const render = promisify(renderer.renderToString)(context)
    .then(html => {
      // set headers on success
      cacheControl(ctx, config.maxAge)

      return html
    })

  return timeout(60 * 1000, render)
    .then(html => html)
    .catch(err => {
      const { code, url } = err

      if (code === 404) {
        ctx.throw(code, 'Not Found')
      }

      if ((code === 301 || code === 302) && url) {
        ctx.status = code
        ctx.redirect(url)
        // set headers on success
        cacheControl(ctx, config.maxAge)
        ctx.body = `Redirecting to ${url}`
        ctx.res.end()
      }

      ctx.throw(500, err)
    })
}

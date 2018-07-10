import SSRContext from '../context'
import setHeaders from './setHeaders'
import * as LRU from 'lru-cache'
import renderBundleTimeout from './renderBundleTimeout'

const microCache = LRU({
  max: 100,
  maxAge: 1 * 1000 // 1s
})

const isCacheable = req => req.method === 'GET'

export default async (ctx, next) => {
  const { renderer } = ctx.state
  const context = new SSRContext(ctx)

  if (!renderer) {
    ctx.body = 'waiting for compilation... refresh in a moment.'

    return next()
  }

  await next() // wait for downstream

  const cacheable = isCacheable(ctx.req)
  if (cacheable) {
    const hit = microCache.get(ctx.req.url)
    if (hit) {
      ctx.body = hit
    }

    if (!hit) {
      const status = ctx.status
      ctx.body = await renderBundleTimeout(renderer, ctx, context) // wait for render
      ctx.status = ctx.status !== 200 ? status : ctx.status
      if (ctx.status === 200) { // checking implicit for explicit status
        microCache.set(ctx.req.url, ctx.body)
      }
    }
  }

  if (!cacheable) {
    await renderBundleTimeout(renderer, ctx, context) // wait for render
  }

  setHeaders(ctx, { 'Content-Type': 'text/html' })
}

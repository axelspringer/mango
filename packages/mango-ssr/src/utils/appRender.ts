import SSRContext from '../context'
import setHeaders from './setHeaders'
import * as LRU from 'lru-cache'

const microCache = LRU({
  max: 100,
  maxAge: 1 * 1000 // 1s
})

const isCacheable = req => req.method === 'GET'

function render(renderer, ctx, context) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(function () { // set a timeout for render
      reject('Render Timeout')
    }, 60 * 1000) // this is artifical

    renderer.renderToString(context, (err, html) => {
      clearTimeout(timeout) // clean-up
      if (err) {
        reject(err)
      }
      resolve(html)
    }) // wait to render string
  })
    .then(html => html) //
    .catch(err => ctx.throw(500, err))
}

export default async (ctx, next) => {
  const { renderer } = ctx.state
  const context = new SSRContext(ctx.req)

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
      ctx.body = await render(renderer, ctx, context) // wait for render
      microCache.set(ctx.req.url, ctx.body)
    }
  }

  if (!cacheable) {
    await render(renderer, ctx, context) // wait for render
  }

  setHeaders(ctx, { 'Content-Type': 'text/html' })
}

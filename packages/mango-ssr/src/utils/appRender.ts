import SSRContext from '../context'
import setHeaders from './setHeaders'

function render(renderer, ctx, context) {
  return new Promise(async (resolve, reject) => {

    const timeout = setTimeout(() => { // set a timeout for render
      reject('Render Timeout')
    }, 30 * 1000) // this is artifical

    await renderer.renderToString(context) // wait to render string
      .then(html => resolve(html))
      .catch(err => reject(err))
      .finally(() => {
        clearTimeout(timeout) // finally clear timeout
      })
  })
    .then(html => ctx.body = html) //
    .catch(err => ctx.throw(500, err))
}

export default async (ctx, next) => {
  const { renderer } = ctx.state
  const context = new SSRContext(ctx.req)

  await next()

  if (!renderer) {
    ctx.body = 'waiting for compilation... refresh in a moment.'

    return next()
  }

  await render(renderer, ctx, context) // wait for render

  setHeaders(ctx, { 'Content-Type': 'text/html' })

  return next() // allow to pass along
}

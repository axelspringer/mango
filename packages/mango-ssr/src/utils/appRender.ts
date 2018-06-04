import SSRContext from '../context'
import setHeaders from './setHeaders'

export default async (ctx, next) => {
  const { renderer } = ctx.state
  const context = new SSRContext(ctx.req)

  if (!renderer) {
    ctx.body = 'waiting for compilation... refresh in a moment.'

    return next()
  }

  await next()

  // use rendered string
  try {
    ctx.body = await renderer.renderToString(context)
  } catch (err) {
    // should do 500
    ctx.throw(500, err)
  }

  setHeaders(ctx, { 'Content-Type': 'text/html' })
}

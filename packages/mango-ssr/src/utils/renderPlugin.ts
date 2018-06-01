// import errorHandler from './errorHandler'
import renderToString from './renderToString'
import setHeaders from './setHeaders'

export default async (ctx, next) => {
  const { plugin, renderer } = ctx.state

  try {
    ctx.body = await renderToString(renderer, plugin.context, plugin.template, ctx) // pass full req to render context
  } catch (err) {
    ctx.throw(500, err)
  }

  await next()
  setHeaders(ctx, plugin.headers)
}

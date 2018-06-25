// import errorHandler from './errorHandler'
import renderToString from './renderToString'
import setHeaders from './setHeaders'


export default async (ctx, next) => {
  const { plugin, renderer } = ctx.state

  await next()

  try {
    ctx.body = await renderToString(renderer, plugin.context, plugin.template, ctx) // pass full req to render context
    if (plugin.stripSSRAttr && ctx.body) { // strip server tag
      ctx.body = ctx.body.replace(/data-server-rendered=\"true\"/, "")
    }
  } catch (err) {
    ctx.throw(500, err)
  }

  setHeaders(ctx, plugin.headers)
}

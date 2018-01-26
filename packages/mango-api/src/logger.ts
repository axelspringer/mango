import * as pinoHttp from 'pino-http'

const GeneratorFunction = function* nogen() { }.constructor

export default function () {
  const wrap = pinoHttp()
  const logger = (ctx, next) => {
    wrap(ctx.req, ctx.res)
    ctx.log = ctx.request.log = ctx.response.log = ctx.req.log
    ctx.onerror = catchErr(ctx, ctx.onerror)
    return next()
  }
  logger.constructor = GeneratorFunction
  logger['logger'] = wrap
  return logger
}

// overriding `onerror` is much faster that using try/catch
function catchErr(ctx, handler) {
  return (e) => {
    ctx.log.error(ctx.response.body) // log the response body on error
    if (!e) { return handler(e) }
    ctx.log.error({
      res: ctx.res,
      err: {
        type: e.constructor.name,
        message: e.message,
        stack: e.stack
      },
      responseTime: ctx.res.responseTime
    }, 'request errored')
    return handler(e)
  }
}

export default function ignore(opts = []) {
  return async (ctx, next) => {
    if (opts.indexOf(ctx.path) !== -1) { // search in ignore
      ctx.throw(404, 'Not Found')

      return next()
    }

    await next()
  }
}

import cacheControl from './cacheControl'

export default function (renderer, ctx, context) {
  return new Promise((resolve, reject) => {
    const { config } = ctx.state
    const timeout = setTimeout(function () { // set a timeout for render
      reject('Render Timeout')
    }, 60 * 1000) // this is artifical

    renderer.renderToString(context, (err, html) => {
      clearTimeout(timeout) // clean-up

      if (err) { // parse error
        const { code, url } = err

        if (code === 404) {
          ctx.throw(code, 'Not Found')
        }

        if ((code === 301 || code === 302) && url) {
          ctx.status = code
          ctx.redirect(url)
          ctx.body = `Redirecting to ${url}`
          ctx.res.end()
        }

        reject(err)
      }

      // set headers on success
      cacheControl(ctx, config.maxAge)

      // resolve with rendered content
      resolve(html)
    }) // wait to render string
  })
    .then(html => html) //
    .catch(err => ctx.throw(500, err))
}

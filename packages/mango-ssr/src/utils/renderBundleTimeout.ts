import cacheControl from './cacheControl'

export default function (renderer, ctx, context) {
  return new Promise((resolve, reject) => {
    const { config } = ctx.state
    const timeout = setTimeout(function () { // set a timeout for render
      reject('Render Timeout')
    }, 60 * 1000) // this is artifical

    renderer.renderToString(context, (err, html) => {
      clearTimeout(timeout) // clean-up
      if (err) {
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

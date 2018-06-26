export default function (renderer, ctx, context) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(function () { // set a timeout for render
      reject('Render Timeout')
    }, 60 * 1000) // this is artifical

    renderer.renderToString(context, (err, html) => {
      clearTimeout(timeout) // clean-up
      if (err) {
        reject(err)
      }
      // wrap status codes to put html
      if (context.code && (context.code >= 400 && context.code <= 499)) {
        reject({ code: context.code, html })
      }

      resolve(html)
    }) // wait to render string
  })
    .then(html => html) //
    .catch(err => {
      if (err && err.code) {
        ctx.throw(err.code, err.html)
        return
      }
      ctx.throw(500, err)
    })
}

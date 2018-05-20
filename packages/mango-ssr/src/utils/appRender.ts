import SSRContext from '../context'
import errorHandler from './errorHandler'

export default async function (req, res) {
  if (res.finished) {
    return // noop
  }

  if (this.config.renderer && !this.renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  !this.config.renderer || res.setHeader('Content-Type', 'text/html')

  // construct context
  const context = new SSRContext(req)

  // use streaming...
  if (this.config.stream) {
    // register on stream
    this.renderer.renderToStream(context)
      .on('error', errorHandler.bind({ req, res }))
      .pipe(res)

    return
  }

  // use rendered string
  try {
    // should do 404
    const html = await this.renderer.renderToString(context, )
    res.send(html).end()
  } catch (err) {
    // should do 404
    errorHandler.call({ req, res }, err)
  }
}

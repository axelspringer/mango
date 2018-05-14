import errorHandler from './errorHandler'

export default async function (req, res) {
  const { plugin } = this

  for (const header in plugin.header) { // set headers for res
    if (plugin.header.hasOwnProperty(header)) {
      res.setHeader(header, plugin.header[header])
    }
  }

  try {
    const html = await this.renderPluginToString(plugin.render, plugin.template, req) // pass full req to render context
    res.send(html).end()
  } catch (err) {
    // renderer error
    errorHandler.call({ req, res }, err) // could be mapped to template
  }
}

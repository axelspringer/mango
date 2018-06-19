import { error } from './log'

export const loadPlugins = (plugins = [], loader, query = {}) => {
  plugins.forEach(plugin => {
    const { main } = require(`../../../mango-plugin-${plugin}/package.json`)
    const { use } = require(`../../../mango-plugin-${plugin}/${main}`)
    // inject graphql, loader, query
    try {
      // just in case
      use(loader, query)
    } catch (e) {
      error(`Could not load ${plugin}: ${e}`)
    }
  })
}

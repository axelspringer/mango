import { error } from './log'

export const loadPlugins = (plugins = [], loader, query = {}, mutation = {}) => {
  plugins.forEach(plugin => {
    const { main } = require(`../../../mango-plugin-${plugin}/package.json`)
    const { use } = require(`../../../mango-plugin-${plugin}/${main}`)
    // inject graphql, loader, query
    try {
      // just in case
      use(loader, query, mutation)
    } catch (e) {
      error(`Could not load ${plugin}: ${e}`)
    }
  })
}

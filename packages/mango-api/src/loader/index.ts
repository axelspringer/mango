import { WP } from './wp'

export * from './loader'
export * from './wp'

export const createLoader = plugins => {
  let loader = new WP()
  plugins.forEach(plugin => {
    for (const prop in plugin.loader) {
      loader.addResolver(prop, plugin.loader[prop])
    }
  })

  return loader
}

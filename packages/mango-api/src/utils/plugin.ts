export const loadPlugin = plugin => {
  const { main } = require(`../../../mango-plugin-${plugin}/package.json`)
  return require(`../../../mango-plugin-${plugin}/${main}`)
}

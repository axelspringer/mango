import { defaultQuery } from './queryType'
const { GraphQLObjectType } = require('graphql')

export * from './postType'
export * from './queryType'
export * from './settingsType'
export * from './userType'
export * from './termType'
export * from './catType'
export * from './mediaType'
export * from './tagType'

export const createQuery = plugins => {
  const pluginQuery = plugins.reduce((query, plugin) => Object.assign(query, plugin.query), {})
  return new GraphQLObjectType({
    name: 'WP',
    description: 'The root of all WordPress queries',
    fields: () => ({ ...defaultQuery, ...pluginQuery })
  })
}

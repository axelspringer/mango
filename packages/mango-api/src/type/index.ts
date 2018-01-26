import { defaultQuery } from './queryType'
import { GraphQLObjectType } from 'graphql'

export * from './postType'
export * from './queryType'
export * from './navType'
export * from './settingsType'
export * from './userType'

export const createQuery = plugins => {
  const pluginQuery = plugins.reduce((query, plugin) => Object.assign(query, plugin.query), {})
  return new GraphQLObjectType({
    name: 'WP',
    description: 'The root of all WordPress queries',
    fields: () => ({ ...defaultQuery, ...pluginQuery })
  })
}

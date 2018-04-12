import { defaultQuery } from './queryType'
import { createContext } from 'vm';
const { GraphQLObjectType } = require('graphql')

export * from './postType'
export * from './tagType'
export * from './queryType'
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

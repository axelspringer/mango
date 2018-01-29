const { GraphQLSchema } = require('graphql')
import { createQuery } from './type'

export default function (plugins) {
  return new GraphQLSchema({
    query: createQuery(plugins)
  })
}

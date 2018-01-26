import { GraphQLSchema } from 'graphql';
import { createQueryType } from './type'

export default function (plugins) {
  return new GraphQLSchema({
    query: createQueryType(plugins)
  })
}

import { GraphQLSchema } from 'graphql';
import { QueryType } from './type'

export default new GraphQLSchema({
  query: QueryType,
})

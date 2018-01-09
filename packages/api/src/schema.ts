import { GraphQLSchema } from 'graphql';
import { WPQueryType } from './type'

export default new GraphQLSchema({
  query: WPQueryType,
})

import {
  GraphQLSchema
} from 'graphql';

import { QueryType } from './types'

export default new GraphQLSchema({
  query: QueryType,
})
